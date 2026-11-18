/**
 * Perfil de ataque de uma arma — função pura, usada no Foundry (rolls/attack.mjs) e no build dos PdMs.
 *
 * ctx = {
 *   abilities: {str:{mod,total}, dex:{mod,total}, ...}, bab, halfLevel, damageHalfLevel, conditionPenalty,
 *   size, species (chave), modifiers (agregados de calc.mjs), armorPenalty,
 *   features: [{key, choice}], classLevels: {chave: níveis}
 * }
 * weapon = { name, system }
 */
import { SWSE } from "../config.mjs";
import { droidUnarmedDamage } from "./droid.mjs";

const GROUP_FEAT = {
  simple: "weapon-proficiency-simple",
  pistols: "weapon-proficiency-pistols",
  rifles: "weapon-proficiency-rifles",
  heavy: "weapon-proficiency-heavy",
  lightsabers: "weapon-proficiency-lightsabers",
  advancedMelee: "weapon-proficiency-advanced-melee"
};

export const ctxHas = (ctx, key) => ctx.features.some(f => f.key === key);
export const ctxCount = (ctx, key) => ctx.features.filter(f => f.key === key).length;
export const ctxChoices = (ctx, key) => ctx.features.filter(f => f.key === key).map(f => f.choice).filter(Boolean);

/** Arma natural (garras, mordidas) ou desarmado: sempre proficiente. */
export const isNatural = w => w.system.key === "unarmed" || String(w.system.key).startsWith("natural");

export function effectiveGroup(ctx, weapon) {
  return SWSE.weaponFamiliarity[ctx.species]?.[weapon.system.key] ?? weapon.system.group;
}

function matches(ctx, key, weapon) {
  const group = effectiveGroup(ctx, weapon);
  return ctxChoices(ctx, key).filter(c => c === group || c === weapon.system.key || c === weapon.name).length;
}

export function isProficientCtx(ctx, weapon) {
  if (isNatural(weapon)) return true;
  const group = effectiveGroup(ctx, weapon);
  if (group === "exotic") {
    return ctxHas(ctx, "exotic-weapon-mastery")
      || ctxChoices(ctx, "exotic-weapon-proficiency").some(c => c === weapon.system.key || c === weapon.name);
  }
  return ctxHas(ctx, GROUP_FEAT[group]);
}

export function weaponProfileFrom(ctx, weapon) {
  const w = weapon.system;
  const melee = w.rangeType === "melee";
  const group = effectiveGroup(ctx, weapon);
  const sizeOrder = s => SWSE.sizes[s]?.order ?? 4;
  const wielder = sizeOrder(ctx.size ?? "medium");
  const wsize = sizeOrder(w.size);
  const natural = isNatural(weapon);
  const light = wsize < wielder || w.key === "unarmed";
  const twoHanded = !natural && (wsize === wielder + 1 || !!w.twoHanded);
  const proficient = isProficientCtx(ctx, weapon);
  const str = ctx.abilities.str.mod;
  const dex = ctx.abilities.dex.mod;
  const lightsaber = group === "lightsabers";

  let atkAbility = melee ? "str" : "dex";
  if (melee && (light || lightsaber) && ctxHas(ctx, "weapon-finesse") && dex > str) atkAbility = "dex";
  const abilityMod = ctx.abilities[atkAbility].mod;

  let dmgAbilityMod = 0;
  let dmgAbilityLabel = "";
  if (!w.noStrDamage && (melee || w.thrown || w.strDamage)) {
    let base = str;
    dmgAbilityLabel = "For";
    if (lightsaber && melee && ctxHas(ctx, "ataru") && dex > str) { base = dex; dmgAbilityLabel = "Des"; }
    dmgAbilityMod = melee && twoHanded && base > 0 ? base * 2 : base;
  }

  const mods = ctx.modifiers ?? {};
  const m = t => mods[t]?.total ?? 0;

  const attackParts = {
    bab: ctx.bab,
    ability: abilityMod,
    weaponFocus: matches(ctx, "weapon-focus", weapon) ? 1 : 0,
    greaterWeaponFocus: matches(ctx, "greater-weapon-focus", weapon) ? 1 : 0,
    proficiency: proficient ? 0 : -5,
    armor: ctx.armorPenalty ?? 0,
    condition: ctx.conditionPenalty ?? 0,
    mods: m("attack.all") + m(melee ? "attack.melee" : "attack.ranged"),
    weapon: w.attackBonus || 0,
    grabbed: ctx.grabbed && !natural && !light ? -2 : 0
  };
  const damageParts = {
    halfLevel: ctx.damageHalfLevel ?? ctx.halfLevel,
    ability: dmgAbilityMod,
    specialization: matches(ctx, "weapon-specialization", weapon) ? 2 : 0,
    greaterSpecialization: matches(ctx, "greater-weapon-specialization", weapon) ? 2 : 0,
    meleeSmash: melee && ctxHas(ctx, "melee-smash") ? 1 : 0,
    trustySidearm: group === "pistols" ? Math.floor((ctx.classLevels?.gunslinger ?? 0) / 2) : 0,
    mods: m("damage.all") + m(melee ? "damage.melee" : "damage.ranged"),
    weapon: w.damageBonus || 0
  };
  const sum = o => Object.values(o).reduce((a, b) => a + b, 0);
  return {
    melee, group, light, twoHanded, proficient, lightsaber, atkAbility, dmgAbilityLabel,
    attackParts, damageParts,
    attackBonus: sum(attackParts),
    damageBonus: sum(damageParts),
    autofire: /A/.test(w.rateOfFire || ""),
    autofireOnly: (w.rateOfFire || "").trim() === "A",
    critRange: lightsaber && ctxHas(ctx, "vaapad") ? Math.min(19, w.critRange || 20) : (w.critRange || 20),
    critMultiplier: matches(ctx, "triple-crit", weapon) ? 3 : (w.critMultiplier || 2),
    thresholdReduction: matches(ctx, "greater-devastating-attack", weapon) ? 10 : matches(ctx, "devastating-attack", weapon) ? 5 : 0,
    drReduction: matches(ctx, "greater-penetrating-attack", weapon) ? 10 : matches(ctx, "penetrating-attack", weapon) ? 5 : 0,
    canDouble: matches(ctx, "double-attack", weapon) > 0,
    canTriple: matches(ctx, "triple-attack", weapon) > 0,
    multiattackReduction: 2 * ctxCount(ctx, `multiattack-proficiency-${group}`)
  };
}

/** Dano desarmado: 1d3 (Pequeno) / 1d4 (Médio), +1 passo por Martial Arts I/II/III. */
export function unarmedDamageCtx(ctx, weapon) {
  if (!["unarmed", "combat-gloves"].includes(weapon.system.key)) return weapon.system.damage;
  const martial = ["martial-arts-i", "martial-arts-ii", "martial-arts-iii"].filter(k => ctxHas(ctx, k)).length;
  if (ctx.droidAppendage) return droidUnarmedDamage(ctx.size ?? "medium", ctx.droidAppendage, martial);
  const steps = ["1d2", "1d3", "1d4", "1d6", "1d8", "1d10", "1d12", "2d8"];
  let idx = Math.max(0, (SWSE.sizes[ctx.size ?? "medium"]?.order ?? 4) - 2);
  idx += ["martial-arts-i", "martial-arts-ii", "martial-arts-iii"].filter(k => ctxHas(ctx, k)).length;
  return steps[Math.min(idx, steps.length - 1)];
}
