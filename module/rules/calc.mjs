/**
 * Cálculos de regras do Saga Edition. Funções puras: recebem dados simples e devolvem dados simples.
 * Não dependem do Foundry, então podem ser testadas em Node (ver tools/test-calc.mjs).
 */
import { SWSE } from "../config.mjs";

export const abilityMod = score => Math.floor((Number(score) - 10) / 2);

/** BBA por classe conforme progressão. */
export function babFor(progression, levels) {
  levels = Number(levels) || 0;
  switch (progression) {
    case "full": return levels;
    case "half": return Math.floor(levels / 2);
    default: return Math.floor((levels * 3) / 4);
  }
}

export function pointBuySpent(scores) {
  return Object.values(scores).reduce((sum, v) => sum + (SWSE.pointBuyCost[v] ?? 999), 0);
}

export function conditionPenalty(step) {
  const s = Math.clamp ? Math.clamp(step, 0, 5) : Math.min(Math.max(step, 0), 5);
  return SWSE.conditionTrack[s]?.penalty ?? 0;
}

/** Avalia o valor de um modificador: número, ou fórmula simples com @level, @halfLevel, @classLevel.<chave> etc. */
export function evalModifierValue(value, data) {
  if (typeof value === "number") return value;
  if (value === null || value === undefined || value === "") return 0;
  const str = String(value).trim();
  if (/^[+-]?\d+(\.\d+)?$/.test(str)) return Number(str);
  const replaced = str.replace(/@([a-zA-Z0-9_.]+)/g, (_, path) => {
    const v = path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), data);
    return Number.isFinite(Number(v)) ? String(Number(v)) : "0";
  });
  if (!/^[\d\s+\-*/().]*$/.test(replaced)) return 0;
  try {
    // eslint-disable-next-line no-new-func
    const out = Function(`"use strict"; return (${replaced || 0});`)();
    return Number.isFinite(out) ? Math.floor(out) : 0;
  } catch {
    return 0;
  }
}

/**
 * Agrega modificadores por alvo seguindo a regra de empilhamento:
 * tipos em SWSE.stackingBonusTypes se somam; os demais valem apenas o maior bônus (e a pior penalidade) de cada tipo.
 * @param {{target:string, value:number, type:string, source?:string}[]} mods
 * @returns {Record<string,{total:number, parts:object[]}>}
 */
export function aggregateModifiers(mods) {
  const byTarget = {};
  for (const m of mods) {
    if (!m.target || !m.value) continue;
    (byTarget[m.target] ??= []).push(m);
  }
  const out = {};
  for (const [target, list] of Object.entries(byTarget)) {
    const byType = {};
    for (const m of list) (byType[m.type || "untyped"] ??= []).push(m);
    let total = 0;
    const parts = [];
    for (const [type, ms] of Object.entries(byType)) {
      if (SWSE.stackingBonusTypes.includes(type)) {
        for (const m of ms) { total += m.value; parts.push(m); }
      } else {
        const pos = ms.filter(m => m.value > 0).sort((a, b) => b.value - a.value)[0];
        const neg = ms.filter(m => m.value < 0).sort((a, b) => a.value - b.value)[0];
        if (pos) { total += pos.value; parts.push(pos); }
        if (neg) { total += neg.value; parts.push(neg); }
      }
    }
    out[target] = { total, parts };
  }
  return out;
}

/**
 * Calcula todos os valores derivados de um personagem.
 * @param {object} sys   Dados de sistema do ator (fonte).
 * @param {object[]} items  Itens simplificados: {type, name, system}.
 * @param {object} [opts]
 * @returns {object} valores derivados
 */
export function computeActor(sys, items, opts = {}) {
  const d = {};
  const byType = t => items.filter(i => i.type === t);
  const classes = byType("class");
  const species = byType("species")[0] ?? null;
  const feats = byType("feat");
  const talents = byType("talent");
  const armors = byType("armor").filter(a => a.system.equipped);
  const armor = armors.sort((a, b) => (b.system.reflexBonus ?? 0) - (a.system.reflexBonus ?? 0))[0] ?? null;

  const has = key => feats.some(f => f.system.key === key) || talents.some(t => t.system.key === key);
  const count = key => feats.filter(f => f.system.key === key).length + talents.filter(t => t.system.key === key).length;
  const choicesOf = key => [...feats, ...talents].filter(i => i.system.key === key).map(i => i.system.choice?.value).filter(Boolean);

  // --- Níveis ---
  let heroicLevel = 0;
  let characterLevel = 0;
  const classLevels = {};
  let bab = 0;
  for (const c of classes) {
    const lv = Number(c.system.levels) || 0;
    characterLevel += lv;
    if (c.system.classType !== "nonheroic") heroicLevel += lv;
    classLevels[c.system.key || c.name] = (classLevels[c.system.key || c.name] ?? 0) + lv;
    bab += babFor(c.system.bab, lv);
  }
  if (sys.isNPC && !classes.length) {
    characterLevel = Number(sys.npcLevel) || 1;
    heroicLevel = 0;
  }
  bab += Number(sys.babBonus) || 0;
  d.heroicLevel = heroicLevel;
  d.level = characterLevel;
  d.halfLevel = Math.floor(characterLevel / 2);
  d.classLevels = classLevels;
  d.bab = bab;

  // --- Modificadores de itens ---
  const safeClassLevels = Object.fromEntries(Object.entries(classLevels).map(([k, v]) => [k.replace(/-/g, "_"), v]));
  const rollData = { level: characterLevel, heroicLevel, halfLevel: d.halfLevel, classLevel: safeClassLevels };
  const rawMods = [];
  const pushItemMods = (item, enabled = true) => {
    if (!enabled) return;
    for (const m of item.system.modifiers ?? []) {
      if (m.disabled) continue;
      let target = m.target;
      // Alvo dependente da escolha do item (ex.: Skill Focus -> skills.<escolha>)
      if (target?.includes("{choice}")) {
        const choice = item.system.choice?.value;
        if (!choice) continue;
        target = target.replace("{choice}", choice);
      }
      rawMods.push({ target, value: evalModifierValue(m.value, rollData), type: m.type || "untyped", source: item.name });
    }
  };
  if (species) pushItemMods(species);
  for (const c of classes) pushItemMods(c);
  for (const f of feats) pushItemMods(f);
  for (const t of talents) pushItemMods(t);
  for (const it of items.filter(i => ["equipment", "weapon"].includes(i.type))) pushItemMods(it, !!it.system.equipped);
  for (const a of armors) pushItemMods(a);
  for (const m of sys.customModifiers ?? []) {
    if (m.disabled) continue;
    rawMods.push({ target: m.target, value: evalModifierValue(m.value, rollData), type: m.type || "untyped", source: m.label || "Custom" });
  }
  const agg = aggregateModifiers(rawMods);
  const mod = target => agg[target]?.total ?? 0;
  d.modifiers = agg;

  // --- Atributos ---
  d.abilities = {};
  for (const key of Object.keys(SWSE.abilities)) {
    const a = sys.abilities?.[key] ?? {};
    const speciesBonus = Number(species?.system.abilityMods?.[key]) || 0;
    const total = (Number(a.base) || 10) + speciesBonus + (Number(a.increase) || 0) + (Number(a.misc) || 0) + mod(`abilities.${key}`);
    d.abilities[key] = { total, mod: abilityMod(total), speciesBonus };
  }
  const isDroid = !!species?.system.droid;
  if (isDroid) d.abilities.con = { total: 0, mod: 0, speciesBonus: 0, none: true };

  // --- Condição ---
  const condStep = Math.min(Math.max(Number(sys.condition?.step) || 0, 0), 5);
  d.conditionPenalty = conditionPenalty(condStep);
  d.conditionStep = condStep;

  // --- Tamanho ---
  const sizeKey = species?.system.size || sys.size || "medium";
  const size = SWSE.sizes[sizeKey] ?? SWSE.sizes.medium;
  d.size = sizeKey;

  // --- Armadura ---
  let armorProficient = true;
  let armorPenalty = 0;
  if (armor) {
    const cat = SWSE.armorCategories[armor.system.category] ?? SWSE.armorCategories.light;
    armorProficient = has(cat.feat);
    if (!armorProficient) armorPenalty = cat.penalty;
  }
  d.armor = armor ? {
    name: armor.name,
    category: armor.system.category,
    proficient: armorProficient,
    penalty: armorPenalty,
    reflexBonus: (Number(armor.system.reflexBonus) || 0) + (armorProficient && has("second-skin") ? 1 : 0),
    fortBonus: armorProficient ? (Number(armor.system.fortBonus) || 0) + (has("second-skin") ? 1 : 0) : 0,
    maxDex: (armor.system.maxDex ?? 99) + (armorProficient && has("armor-mastery") ? 1 : 0)
  } : null;

  // --- Bônus de classe nas defesas (o maior entre as classes) ---
  const classDef = { reflex: 0, fortitude: 0, will: 0 };
  for (const c of classes) {
    for (const k of Object.keys(classDef)) classDef[k] = Math.max(classDef[k], Number(c.system.defenses?.[k]) || 0);
  }

  // --- Defesas ---
  const dexMod = d.abilities.dex.mod;
  const dexToReflex = d.armor ? Math.min(dexMod, d.armor.maxDex) : dexMod;
  let levelOrArmor = heroicLevel;
  if (d.armor) {
    const ab = d.armor.reflexBonus;
    if (armorProficient && has("improved-armored-defense")) levelOrArmor = Math.max(heroicLevel + Math.floor(ab / 2), ab);
    else if (armorProficient && has("armored-defense")) levelOrArmor = Math.max(heroicLevel, ab);
    else levelOrArmor = ab;
  }
  const allDef = mod("defenses.all");
  const misc = k => Number(sys.defenses?.[k]?.misc) || 0;
  const reflexParts = { base: 10, level: levelOrArmor, ability: dexToReflex, class: classDef.reflex, size: size.reflex, mods: mod("defenses.reflex") + allDef, misc: misc("reflex"), condition: d.conditionPenalty };
  const fortAbility = isDroid ? d.abilities.str.mod : d.abilities.con.mod;
  const fortParts = { base: 10, level: heroicLevel, ability: fortAbility, class: classDef.fortitude, equipment: d.armor?.fortBonus ?? 0, mods: mod("defenses.fortitude") + allDef, misc: misc("fortitude"), condition: d.conditionPenalty };
  const willParts = { base: 10, level: heroicLevel, ability: d.abilities.wis.mod, class: classDef.will, mods: mod("defenses.will") + allDef, misc: misc("will"), condition: d.conditionPenalty };
  const sum = o => Object.values(o).reduce((a, b) => a + (Number(b) || 0), 0);
  const dodge = (agg["defenses.reflex"]?.parts ?? []).concat(agg["defenses.all"]?.parts ?? []).filter(p => p.type === "dodge").reduce((a, p) => a + p.value, 0);
  d.defenses = {
    reflex: { total: sum(reflexParts), parts: reflexParts, flatFooted: sum(reflexParts) - Math.max(dexToReflex, 0) - dodge },
    fortitude: { total: sum(fortParts), parts: fortParts },
    will: { total: sum(willParts), parts: willParts }
  };

  // --- Limiar de dano ---
  d.damageThreshold = d.defenses.fortitude.total + size.dt + mod("damageThreshold") + (Number(sys.damageThreshold?.misc) || 0);
  d.damageReduction = mod("damageReduction") + (Number(sys.damageReduction) || 0);

  // --- Pontos de vida ---
  const conMod = d.abilities.con.mod;
  let hpMax = 0;
  for (const c of classes) {
    for (const r of c.system.hpRolls ?? []) hpMax += Math.max(1, (Number(r) || 0) + conMod);
  }
  if (sys.isNPC && !classes.length) hpMax = Number(sys.hp?.base) || 0;
  hpMax += mod("hp.max") + (Number(sys.hp?.misc) || 0);
  d.hpMax = Math.max(hpMax, 1);

  // --- Perícias ---
  const sizeStealth = size.stealth;
  const forceSensitive = has("force-sensitivity");
  d.forceSensitive = forceSensitive;
  d.skills = {};
  const allSkills = mod("skills.all");
  const focus = new Set(choicesOf("skill-focus"));
  const training = new Set(choicesOf("skill-training"));
  for (const [key, cfg] of Object.entries(SWSE.skills)) {
    const s = sys.skills?.[key] ?? {};
    const trained = !!s.trained || training.has(key);
    const ability = s.ability || cfg.ability;
    const abil = d.abilities[ability]?.mod ?? 0;
    const parts = {
      halfLevel: d.halfLevel,
      ability: abil,
      trained: trained ? 5 : 0,
      focus: focus.has(key) ? 5 : 0,
      armor: cfg.armor ? armorPenalty : 0,
      size: key === "stealth" ? sizeStealth : 0,
      mods: mod(`skills.${key}`) + allSkills,
      misc: Number(s.misc) || 0,
      condition: d.conditionPenalty
    };
    d.skills[key] = { total: sum(parts), parts, trained, focus: focus.has(key), ability, usable: !cfg.force || forceSensitive };
  }

  // --- Ataque ---
  const strMod = d.abilities.str.mod;
  d.attack = {
    melee: bab + strMod + mod("attack.melee") + mod("attack.all") + d.conditionPenalty + armorPenalty,
    ranged: bab + dexMod + mod("attack.ranged") + mod("attack.all") + d.conditionPenalty + armorPenalty
  };
  d.grapple = bab + Math.max(strMod, dexMod) + size.grapple + mod("grapple") + d.conditionPenalty;

  // --- Deslocamento ---
  let speed = Number(species?.system.speed ?? sys.speed?.base ?? 6) || 6;
  if (d.armor && ["medium", "heavy"].includes(d.armor.category) && !(armorProficient && has("juggernaut"))) {
    speed = speed >= 6 ? speed - 2 : Math.max(speed - 1, 1);
  }
  if (has("long-stride") && (!d.armor || d.armor.category === "light")) speed += 2;
  d.speed = speed + mod("speed") + (Number(sys.speed?.misc) || 0);

  // --- Pontos da Força ---
  let fpBase = 5;
  for (const c of classes) fpBase = Math.max(fpBase, Number(c.system.forcePointsBase) || 5);
  d.forcePointsMax = sys.isNPC && !heroicLevel ? 0 : fpBase + d.halfLevel + 3 * count("force-boon") + mod("forcePoints.max");
  d.forcePointDie = has("strong-in-the-force") ? "d8" : "d6";
  d.forcePointDice = SWSE.forcePointDice(characterLevel);

  // --- Second Wind ---
  d.secondWind = {
    uses: (heroicLevel > 0 ? 1 : 0) + count("extra-second-wind") + count("tough-as-nails") + mod("secondWind.uses"),
    heal: Math.max(Math.floor(d.hpMax / 4), d.abilities.con.total)
  };

  // --- Perícias treinadas permitidas (para validação no assistente) ---
  const firstClass = classes.find(c => c.system.isStartingClass) ?? classes[0];
  d.trainedSkillsAllowed = firstClass
    ? Math.max(1, (Number(firstClass.system.trainedSkills) || 0) + d.abilities.int.mod) + (Number(species?.system.bonusTrainedSkills) || 0)
    : 0;

  // --- Poderes da Força conhecidos ---
  d.forcePowersAllowed = count("force-training") * Math.max(1, 1 + d.abilities.wis.mod);

  return d;
}
