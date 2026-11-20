import { SWSE, SYSTEM_ID } from "../config.mjs";
import { targetAdjustment } from "../rules/effects.mjs";
import { weaponProfileFrom, isProficientCtx, effectiveGroup as groupCtx, unarmedDamageCtx } from "../rules/weapon.mjs";

const signed = n => (n >= 0 ? `+${n}` : `${n}`);

/** Adiciona n dados ao primeiro termo XdY de uma fórmula. */
export function addDice(formula, n) {
  if (!n) return formula;
  return formula.replace(/(d+)d(d+)/, (_, x, y) => `${Number(x) + n}d${y}`);
}

/** Contexto puro (rules/weapon.mjs) a partir de um ator do Foundry. */
export function weaponCtx(actor) {
  const sys = actor.system;
  return {
    abilities: sys.abilities, bab: sys.bab, halfLevel: sys.halfLevel, damageHalfLevel: actor.derived.damageHalfLevel, conditionPenalty: sys.conditionPenalty,
    size: actor.derived.size ?? "medium", species: actor.species?.system.key ?? "",
    modifiers: actor.derived.modifiers ?? {}, armorPenalty: actor.derived.armor?.penalty ?? 0,
    features: actor.items.filter(i => ["feat", "talent"].includes(i.type)).map(i => ({ key: i.system.key, choice: i.system.choice?.value })),
    classLevels: actor.derived.classLevels ?? {},
    droidAppendage: actor.derived.droidAppendage ?? null,
    naturalWeapon: actor.derived.naturalWeapon || "",
    grabbed: !!actor.derived.status?.grabbed
  };
}

export const unarmedDamage = (actor, weapon) => unarmedDamageCtx(weaponCtx(actor), weapon);
export const effectiveGroup = (actor, weapon) => groupCtx(weaponCtx(actor), weapon);
export const isProficient = (actor, weapon) => isProficientCtx(weaponCtx(actor), weapon);

/** Informações estáticas do ataque com uma arma (sem opções situacionais). */
export function weaponProfile(actor, weapon) {
  return weaponProfileFrom(weaponCtx(actor), weapon);
}

/** Ajustes de potência (ex.: "3d4:1|3d6:5|3d8:10" → [{damage, shots}]). */
export function parseSettings(str) {
  return String(str || "").split("|").map(x => x.trim()).filter(Boolean).map(x => {
    const [damage, shots] = x.split(":");
    return { damage: damage.trim(), shots: Math.max(1, Number(shots) || 1) };
  });
}

/** Monta o HTML do diálogo de ataque com apenas as opções que o personagem pode usar. */
function dialogContent(actor, weapon, p) {
  const has = k => actor.hasFeature(k);
  const row = (html, show = true) => (show ? `<div class="form-group">${html}</div>` : "");
  const check = (name, label, show = true, checked = false) => row(`<label>${label}</label><input type="checkbox" name="${name}" ${checked ? "checked" : ""}>`, show);
  const L = k => game.i18n.localize(k);
  const ranged = !p.melee;
  const bab = actor.system.bab;
  const rangeOpts = Object.entries(SWSE.rangeBands).map(([k, v]) => `<option value="${k}">${L(v.label)}</option>`).join("");
  const sneak = actor.countFeature("sneak-attack");
  const rageAvailable = actor.species?.system.key === "wookiee" || has("channel-anger");
  const settings = parseSettings(weapon.system.settings);
  const stunOnly = weapon.system.special === "stunOnly";
  return `<div class="swse-dialog attack-dialog">
    <p class="summary">${weapon.name}: ${signed(p.attackBonus)} · ${weapon.system.damage}${signed(p.damageBonus)}
      ${p.proficient ? "" : `<br><strong class="warn">${L("SWSE.Attack.NotProficient")}</strong>`}</p>
    ${row(`<label>${L("SWSE.Attack.Mode")}</label><select name="mode">
        <option value="single">${L("SWSE.Attack.ModeSingle")}</option>
        ${p.canDouble ? `<option value="double">${L("SWSE.Attack.ModeDouble")}</option>` : ""}
        ${p.canTriple ? `<option value="triple">${L("SWSE.Attack.ModeTriple")}</option>` : ""}
      </select>`)}
    ${check("twoWeapon", L("SWSE.Attack.TwoWeapon"))}
    ${settings.length ? row(`<label>${L("SWSE.Attack.PowerSetting")}</label><select name="setting">${settings.map((o, i) => `<option value="${i}">${o.damage} (${o.shots} ${L("SWSE.Attack.Shots")})</option>`).join("")}</select>`) : ""}
    ${ranged ? row(`<label>${L("SWSE.Attack.Range")}</label><select name="range">${rangeOpts}</select>`) : ""}
    ${ranged && p.autofire ? row(`<label>${L("SWSE.Attack.FireMode")}</label><select name="fire">
        ${p.autofireOnly ? "" : `<option value="single">${L("SWSE.Attack.FireSingle")}</option>`}
        <option value="autofire">${L("SWSE.Attack.FireAutofire")}</option>
        ${has("burst-fire") ? `<option value="burst">${L("SWSE.Attack.FireBurst")}</option>` : ""}
      </select>`) : ""}
    ${check("braced", L("SWSE.Attack.Braced"), ranged && p.autofire)}
    ${check("drawABead", "Draw a Bead (+Des no dano)", ranged && has("draw-a-bead"))}
    ${check("bullseye", "Bullseye (alvo sem Des; mirando, fora da queima-roupa)", ranged && has("bullseye"))}
    ${check("aim", L("SWSE.Attack.Aim") + (has("careful-shot") ? " (+1)" : "") + (has("deadeye") ? " (+1 dado)" : ""), ranged, !!actor.derived.status?.list?.includes("aiming"))}
    ${check("intoMelee", L("SWSE.Attack.IntoMelee") + (has("precise-shot") ? " (Precise Shot)" : ""), ranged)}
    ${check("rapidShot", L("SWSE.Attack.RapidShot"), ranged && has("rapid-shot"))}
    ${check("rapidStrike", L("SWSE.Attack.RapidStrike"), p.melee && has("rapid-strike"))}
    ${check("mightySwing", L("SWSE.Attack.MightySwing"), p.melee && has("mighty-swing"))}
    ${p.melee && has("power-attack") ? row(`<label>${L("SWSE.Attack.PowerAttack")} (0–${bab})</label><input type="number" name="powerAttack" value="0" min="0" max="${bab}">`) : ""}
    ${check("charge", L("SWSE.Attack.Charge") + (p.melee && has("powerful-charge") ? " + Powerful Charge" : "") + (ranged ? " (Charging Fire)" : ""), p.melee || has("charging-fire"))}
    ${check("disarm", L("SWSE.Attack.Disarm") + (has("improved-disarm") ? " (Improved Disarm +5)" : ""), p.melee || has("ranged-disarm"))}
    ${check("acrobaticStrike", "Acrobatic Strike (+2)", has("acrobatic-strike"))}
    ${check("skirmisher", "Skirmisher (+1)", has("skirmisher"))}
    ${p.melee && has("staggering-attack") ? row(`<label>Staggering Attack</label><select name="staggering"><option value="0">—</option><option value="2">−2 ataque / −2 perícias</option><option value="5">−5 ataque / −5 perícias</option></select>`) : ""}
    ${check("primeTarget", "Prime Targets (+1 dado)", p.lightsaber && has("prime-targets"))}
    ${check("aimingAccuracy", "Aiming Accuracy (mirou com rodada completa: +5)" + (has("pinpoint-accuracy") ? " + Pinpoint Accuracy" : ""), ranged && has("aiming-accuracy"))}
    ${check("slammer", "Slammer (For ×2 no dano)", p.unarmed && has("slammer"))}
    ${check("cantinaBrawler", "Cantina Brawler (flanqueado: +2 ataque e dano)", p.unarmed && has("cantina-brawler"))}
    ${check("greatHunt", "Master of the Great Hunt (fera do lado sombrio: +1, +1 dado)", p.lightsaber && has("master-of-the-great-hunt"))}
    ${check("aoo", "Ataque de oportunidade" + (String(weapon.system.special).includes("dueling") ? " (dueling lightsaber +1)" : ""), p.melee)}
    ${check("fleche", "Flèche (investida: 17+ natural é crítico)", p.melee && has("fleche"))}
    ${check("endGame", "End Game (Pistol Duelist: Limiar do alvo ÷2)", p.group === "pistols" && !p.melee && has("pistol-duelist"))}
    ${check("grazing", "Grazing Shot (marque 2 alvos: dano dividido)", !p.melee && has("grazing-shot"))}
    ${check("echani", "Echani Training (único ataque desarmado: For ×2 no dano)", p.unarmed && has("echani-training"))}
    ${check("terasKasi", "Teräs Käsi Training (−5 no Limiar do alvo)", p.unarmed && has("teras-kasi-training"))}
    ${p.melee && has("melee-defense") ? row(`<label>Melee Defense (0–${bab})</label><input type="number" name="meleeDefense" value="0" min="0" max="${bab}">`) : ""}
    ${check("flanking", L("SWSE.Attack.Flanking"), p.melee)}
    ${check("flatFooted", L("SWSE.Attack.FlatFooted") + (sneak ? ` (Sneak Attack +${Math.min(sneak, 10)}d6)` : ""), true)}
    ${check("huntersTarget", L("SWSE.Attack.HuntersTarget"), has("hunters-target"))}
    ${check("familiarFoe", L("SWSE.Attack.FamiliarFoe"), actor.classLevel("bounty-hunter") >= 2)}
    ${check("rage", L("SWSE.Attack.Rage"), p.melee && rageAvailable && !actor.derived.status?.list?.includes("rage"))}
    ${check("stun", L("SWSE.Attack.Stun") + (stunOnly ? " (sempre)" : ""), weapon.system.stun, stunOnly)}
    ${check("forcePoint", `${L("SWSE.SpendForcePoint")} (${actor.system.forcePoints.value})`, actor.system.forcePoints.value > 0)}
    ${row(`<label>${L("SWSE.Attack.MiscAttack")}</label><input type="text" name="miscAttack" value="" placeholder="+1">`)}
    ${row(`<label>${L("SWSE.Attack.MiscDamage")}</label><input type="text" name="miscDamage" value="" placeholder="+1d6">`)}
  </div>`;
}

/**
 * Abre o diálogo e executa o ataque.
 * @param {Actor} actor
 * @param {Item} weapon
 * @param {object} [options]  {skipDialog:boolean}
 */
export async function attackWithWeapon(actor, weapon, options = {}) {
  const p = weaponProfile(actor, weapon);
  let form = { mode: "single", range: "pointBlank", fire: p.autofireOnly ? "autofire" : "single", powerAttack: 0 };
  if (!options.skipDialog) {
    const res = await foundry.applications.api.DialogV2.wait({
      window: { title: `${game.i18n.localize("SWSE.Attack.Title")}: ${weapon.name}` },
      position: { width: 420 },
      content: dialogContent(actor, weapon, p),
      buttons: [{
        action: "attack", label: game.i18n.localize("SWSE.Attack.Roll"), default: true,
        callback: (event, button) => new foundry.applications.ux.FormDataExtended(button.form).object
      }],
      rejectClose: false
    });
    if (!res) return null;
    form = { ...form, ...res };
  }
  return resolveAttack(actor, weapon, p, form);
}

/** Calcula penalidades/bônus situacionais e rola. */
export async function resolveAttack(actor, weapon, p, f) {
  const L = k => game.i18n.localize(k);
  const has = k => actor.hasFeature(k);
  const abil = actor.system.abilities;
  const atk = [];   // [label, valor]
  const dmg = [];
  let extraDice = 0;
  let area = !!weapon.system.area;
  let shots = 1;
  const notes = [];
  const bonusSteps = [];
  const effectsOnHit = [];
  let thresholdExtra = 0;
  let denyDex = false;
  let damageOverride = null;
  let shotMult = 1;
  const settings = parseSettings(weapon.system.settings);
  if (settings.length) {
    const opt = settings[Number(f.setting) || 0] ?? settings[0];
    damageOverride = opt.damage;
    shotMult = opt.shots;
  }
  if (weapon.system.special === "stunOnly") f.stun = true;
  for (const n of p.traitNotes ?? []) notes.push(n);
  if ((p.upgrades ?? []).includes("ionCharger") && p.melee) notes.push("Ion Charger: +2d6 de dano iônico (role à parte contra droides/veículos).");

  // Modo de ataque múltiplo
  const nAttacks = (f.mode === "triple" ? 3 : f.mode === "double" ? 2 : 1) + (f.twoWeapon ? 1 : 0);
  if (f.mode === "double") atk.push(["Double Attack", Math.min(0, -5 + p.multiattackReduction)]);
  if (f.mode === "triple") atk.push(["Triple Attack", Math.min(0, -10 + p.multiattackReduction)]);
  if (f.twoWeapon) {
    const pen = has("dual-weapon-mastery-iii") ? 0 : has("dual-weapon-mastery-ii") ? -2 : has("dual-weapon-mastery-i") ? -5 : -10;
    if (pen) atk.push([L("SWSE.Attack.TwoWeapon"), pen]);
  }

  if (!p.melee) {
    const band = SWSE.rangeBands[f.range] ?? SWSE.rangeBands.pointBlank;
    const rangePen = has("far-shot") ? band.farShot : band.penalty;
    if (rangePen) atk.push([L(band.label), rangePen]);
    if (f.range === "pointBlank" && has("point-blank-shot")) { atk.push(["Point Blank Shot", 1]); dmg.push(["Point Blank Shot", 1]); }
    // Precision Shot (Galaxy at War): mirando, benefício de Point Blank Shot em qualquer alcance
    else if (f.aim && has("precision-shot")) { atk.push(["Precision Shot", 1]); dmg.push(["Precision Shot", 1]); }
    // Arma precisa: sem penalidade em alcance curto. Arma imprecisa: não pode atacar em alcance longo.
    if (p.accurate && f.range === "short" && rangePen) atk.push([L("SWSE.Weapon.accurate"), -rangePen]);
    if (p.inaccurate && f.range === "long") notes.push(L("SWSE.Attack.InaccurateLong"));
    // Scatter gun: 3d8 à queima-roupa, 2d8 em alcance curto, nada além
    if (weapon.system.key === "scatter-gun") {
      if (f.range === "short") damageOverride = "2d8";
      else if (f.range !== "pointBlank") notes.push("Scatter gun: sem dano em alcance médio ou longo.");
    }
    if (f.aimingAccuracy) {
      atk.push(["Aiming Accuracy", 5]);
      if (has("pinpoint-accuracy")) bonusSteps.push("Pinpoint Accuracy");
    }
    // Sniping Assassin (Scum and Villainy): +½ nível de classe fora da queima-roupa
    if (has("sniping-assassin") && f.range !== "pointBlank") dmg.push(["Sniping Assassin", Math.floor(actor.classLevel("assassin") / 2)]);
    // Twin Shot: +2 no dano com Rapid Shot empunhando duas pistolas
    if (f.rapidShot && has("twin-shot") && actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.system.group === "pistols").length >= 2) dmg.push(["Twin Shot", 2]);
    if (f.drawABead && f.range !== "pointBlank") dmg.push(["Draw a Bead", Math.max(1, abil.dex.mod)]);
    if (f.bullseye && f.aim && f.range !== "pointBlank") { denyDex = true; notes.push("Bullseye"); }
    if (f.aim && has("steadying-position") && actor.derived.status?.list?.includes("prone")) { denyDex = true; notes.push("Steadying Position"); }
    // Sport Hunter (Galaxy at War)
    if (has("sport-hunter")) {
      if (weapon.system.key === "slugthrower-pistol" && f.range === "pointBlank") extraDice += 1;
      if (weapon.system.key === "sporting-blaster-rifle" && f.aim) atk.push(["Sport Hunter", 1]);
    }
    if (f.intoMelee && !has("precise-shot")) atk.push([L("SWSE.Attack.IntoMelee"), -5]);
    if (f.aim) {
      if (actor.isOwner && actor.statuses?.has("aiming")) await actor.toggleStatusEffect("aiming", { active: false });
      if (has("careful-shot")) atk.push(["Careful Shot", (p.upgrades ?? []).includes("doubleTrigger") ? 2 : 1]);
      if (has("deadeye")) extraDice += 1;
      if (has("debilitating-shot") || has("hunters-mark")) bonusSteps.push(has("hunters-mark") ? "Hunter's Mark" : "Debilitating Shot");
      notes.push(L("SWSE.Attack.AimNote"));
    }
    if (f.rapidShot) {
      const pen = has("trigger-work") ? 0 : abil.str.total >= 13 ? -2 : -5;
      if (pen) atk.push(["Rapid Shot", pen]);
      extraDice += 1;
      shots = Math.max(shots, 2);
    }
    if (f.fire === "autofire") {
      area = true;
      let pen = -5;
      // Apoiar: só armas somente-automáticas (Autofire Assault e Riflemaster permitem outras)
      const braceOK = f.braced && (p.autofireOnly || has("autofire-assault") || p.canBrace);
      if (has("controlled-burst")) pen = braceOK ? 0 : -2;
      else if (braceOK) pen = -2;
      if (pen) atk.push(["Autofire", pen]);
      shots = 10;
      notes.push(L("SWSE.Attack.AutofireNote"));
    } else if (f.fire === "burst") {
      let pen = abil.str.total >= 13 ? -5 : -10;
      if (has("controlled-burst")) pen = -2;
      atk.push(["Burst Fire", pen]);
      extraDice += 2;
      shots = 10;
    }
  } else {
    if (f.rapidStrike) {
      const pen = abil.dex.total >= 13 || p.light ? -2 : -5;
      atk.push(["Rapid Strike", pen]);
      extraDice += 1;
    }
    if (f.mightySwing) extraDice += 1;
    const pa = Math.clamp(Number(f.powerAttack) || 0, 0, actor.system.bab);
    if (pa) {
      atk.push(["Power Attack", -pa]);
      dmg.push(["Power Attack", p.twoHanded ? pa * 2 : pa]);
    }
    if (f.charge && has("powerful-charge") && ["medium", "large", "huge", "gargantuan", "colossal"].includes(actor.derived.size)) {
      atk.push(["Powerful Charge", 2]);
      dmg.push(["Powerful Charge", Math.floor((actor.system.heroicLevel || 0) / 2)]);
    }
    const md = Math.clamp(Number(f.meleeDefense) || 0, 0, actor.system.bab);
    if (md) {
      atk.push(["Melee Defense", -md]);
      if (actor.isOwner) await actor.addEffect({ name: `Melee Defense (+${md})`, rounds: 0, modifiers: [{ target: "defenses.reflex", value: String(md), type: "dodge", label: "", disabled: false }] });
    }
    if (f.flanking) atk.push([L("SWSE.Attack.Flanking"), 2]);
    const stag = Number(f.staggering) || 0;
    if (stag) {
      atk.push(["Staggering Attack", -stag]);
      effectsOnHit.push({ name: `Staggering Attack (−${stag} perícias)`, img: "systems/swse-saga/assets/icons/status/debuff.svg", rounds: 1, modifiers: [{ target: "skills.all", value: String(-stag), type: "penalty", label: "", disabled: false }] });
    }
    if (f.charge && has("reckless")) dmg.push(["Reckless", Math.max(1, abil.wis.mod)]);
    if (f.primeTarget) extraDice += 1;
    if (f.slammer) { dmg.push(["Slammer", Math.max(0, abil.str.mod * 2) - (p.damageParts.ability || 0)]); if (has("crush")) extraDice += 1; }
    if (p.unarmed && has("mechanical-martial-arts")) effectsOnHit.push({ name: `Mechanical Martial Arts (−5 ataque e dano corpo a corpo)`, img: "systems/swse-saga/assets/icons/status/debuff.svg", rounds: 1, modifiers: [{ target: "attack.melee", value: "-5", type: "penalty", label: "", disabled: false }, { target: "damage.melee", value: "-5", type: "penalty", label: "", disabled: false }] });
    if (f.cantinaBrawler) { atk.push(["Cantina Brawler", 2]); dmg.push(["Cantina Brawler", 2]); }
    if (f.greatHunt) { atk.push(["Master of the Great Hunt", 1]); extraDice += 1; }
    if (f.aoo && String(weapon.system.special).includes("dueling")) atk.push(["Dueling Lightsaber", 1]);
    // Shoto Focus: +2 com o shoto empunhando também um sabre de uma mão
    if (String(weapon.system.special).includes("shoto") && has("shoto-focus")
      && actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.system.group === "lightsabers").length >= 2) atk.push(["Shoto Focus", 2]);
    if (f.echani) dmg.push(["Echani Training", Math.max(1, 2 * abil.str.mod) - (p.damageParts.ability || 0)]);
    if (f.terasKasi) thresholdExtra += 5;
    if (p.unarmed && has("hijkata-expertise") && abil.str.mod > 0) {
      effectsOnHit.push({ name: `Hijkata Expertise (−${abil.str.mod} no próximo ataque)`, img: "systems/swse-saga/assets/icons/status/debuff.svg", rounds: 1, modifiers: [{ target: "attack.all", value: String(-abil.str.mod), type: "penalty", label: "", disabled: false }] });
    }
    if (f.rage) {
      const r = has("dreadful-rage") ? 4 : 2;
      atk.push([L("SWSE.Attack.Rage"), r]); dmg.push([L("SWSE.Attack.Rage"), r]);
    }
  }
  if (f.charge) {
    if (p.melee) atk.push([L("SWSE.Attack.Charge"), 2]);
    notes.push(L("SWSE.Attack.ChargeNote"));
    if (actor.isOwner && !actor.derived.status?.list?.includes("charging")) {
      await actor.addEffect({ name: L("SWSE.Status.charging"), img: "systems/swse-saga/assets/icons/status/charging.svg", statuses: ["charging"], rounds: 0 });
    }
  }
  if (f.acrobaticStrike) atk.push(["Acrobatic Strike", 2]);
  if (f.disarm) {
    if (p.melee && has("improved-disarm")) atk.push(["Improved Disarm", 5]);
    notes.push(L(p.melee && !has("improved-disarm") ? "SWSE.Attack.DisarmNote" : "SWSE.Attack.DisarmNoteSafe"));
  }
  if (f.skirmisher) atk.push(["Skirmisher", 1]);
  let critRange = p.critRange;
  if (f.fleche && f.charge) { critRange = Math.min(critRange, 17); notes.push("Flèche"); }
  if (f.endGame) notes.push("End Game: Limiar do alvo à metade");
  // Make an Example (Galaxy of Intrigue): dano ≥ Limiar → −5 nos ataques contra você
  if (has("make-an-example")) effectsOnHit.push({ name: `Make an Example (−5 contra ${actor.name})`, img: "systems/swse-saga/assets/icons/status/debuff.svg", rounds: 1, minDT: true, modifiers: [] });
  const statusOnHit = [];
  if (!p.melee && f.aim && has("knockdown-shot")) { statusOnHit.push("prone"); notes.push(L("SWSE.Talent.KnockdownNote")); }
  if (f.familiarFoe) atk.push(["Familiar Foe", Math.floor(actor.classLevel("bounty-hunter") / 2)]);
  if (f.huntersTarget) dmg.push(["Hunter's Target", actor.classLevel("bounty-hunter")]);
  let sneakDice = 0;
  // Backstabber (Galaxy at War): flanqueando, o alvo conta como surpreso
  const backstab = (p.melee && f.flanking && has("backstabber")) || (f.flanking && has("advantageous-positioning"));
  // Deathstrike (Blood Carver): +1 dado corpo a corpo contra alvo sem Destreza
  if (p.melee && f.flatFooted && actor.species?.system.key === "blood-carver") { extraDice += 1; notes.push("Deathstrike"); }
  // Scavenger (Jawa): arma iônica soma ½ nível ao dano contra droides e veículos
  if (weapon.system.ion && actor.species?.system.key === "jawa") notes.push(`Scavenger: +${Math.floor((actor.system.level || 0) / 2)} de dano iônico contra droides e veículos (some no campo de dano)`);
  if (backstab) { denyDex = true; notes.push("Backstabber"); }
  if (f.flatFooted || backstab) {
    sneakDice = Math.min(actor.countFeature("sneak-attack"), 10);
    if (has("dastardly-strike")) bonusSteps.push("Dastardly Strike");
    if (p.unarmed && has("ktara-training")) extraDice += 1;
  }

  // Munição
  const ammo = weapon.system.ammo;
  if (ammo?.max > 0) {
    shots *= shotMult;
    if (ammo.value < shots) {
      ui.notifications.warn(game.i18n.format("SWSE.Warn.NoAmmo", { name: weapon.name }));
      return null;
    }
    await weapon.update({ "system.ammo.value": ammo.value - shots });
  }

  // Ponto da Força no ataque
  let fpTerm = "";
  if (f.forcePoint && (await actor.spendForcePoint())) fpTerm = ` + ${actor.forcePointFormula}`;

  const situational = atk.reduce((a, [, v]) => a + v, 0);
  const atkTotalBonus = p.attackBonus + situational;
  const miscAtk = f.miscAttack ? ` ${/^[+-]/.test(f.miscAttack) ? f.miscAttack : "+" + f.miscAttack}` : "";
  const dmgBonus = p.damageBonus + dmg.reduce((a, [, v]) => a + v, 0);
  const miscDmg = f.miscDamage ? ` ${/^[+-]/.test(f.miscDamage) ? f.miscDamage : "+" + f.miscDamage}` : "";

  const targets = Array.from(game.user.targets).map(t => t.actor ? { token: t, actor: t.actor } : null).filter(Boolean);
  const damageType = f.stun ? "stun" : weapon.system.ion ? "ion" : "normal";

  const attacks = [];
  for (let i = 0; i < nAttacks; i++) {
    // Long Haft Strike (Jedi Academy): pike e long-handle viram armas duplas
    const isDouble = weapon.system.double || (String(weapon.system.special).includes("longHaft") && has("long-haft-strike"));
    const useSecondHead = f.twoWeapon && i === nAttacks - 1 && isDouble && weapon.system.damage2;
    let baseDice = addDice(useSecondHead ? weapon.system.damage2 : (damageOverride ?? unarmedDamage(actor, weapon)), extraDice);
    // Brutal Unarmed Strike (Warden of the Sky): rerrola 1s no dano desarmado
    if (p.unarmed && has("brutal-unarmed-strike")) baseDice = baseDice.replace(/^(\d+d\d+)/, "$1r1");
    // Sport Hunter: sporting blaster pistol rerrola 1s no dano
    if (weapon.system.key === "sporting-blaster-pistol" && has("sport-hunter")) baseDice = baseDice.replace(/^(\d+d\d+)/, "$1r1");
    const atkRoll = await new Roll(`1d20 ${signed(atkTotalBonus)}${miscAtk}${i === 0 ? fpTerm : ""}`).evaluate();
    const nat = atkRoll.dice[0].total;
    const dmgFormula = `${baseDice} ${signed(dmgBonus)}${miscDmg}`;
    const dmgRoll = await new Roll(dmgFormula).evaluate();
    let sneakRoll = null;
    if (sneakDice) sneakRoll = await new Roll(`${sneakDice}d6`).evaluate();
    const crit = nat >= critRange;
    const autoHit = nat === 20;
    const autoMiss = nat === 1;
    const baseDamage = Math.max(1, dmgRoll.total);
    const critDamage = baseDamage * p.critMultiplier;
    const results = targets.map(({ token, actor: ta }) => {
      const tStatus = ta.system.derived?.status ?? {};
      const adj = targetAdjustment(tStatus, { melee: p.melee, aim: !!f.aim, keenShot: !p.melee && has("keen-shot") });
      // Desarmar: o alvo recebe +10 na Reflexos
      if (f.disarm) { adj.delta += 10; adj.notes.push("disarm"); }
      // Elusive Target: atirar contra quem está em corpo a corpo fica −5 mais difícil
      if (!p.melee && f.intoMelee && ta.hasFeature?.("elusive-target")) { adj.delta += 5; adj.notes.push("elusive-target"); }
      // Uncanny Dodge II: não pode ser flanqueado
      if (f.flanking && ta.hasFeature?.("uncanny-dodge-ii")) { adj.delta += 2; adj.notes.push("no-flank"); }
      // Dark Scourge: +1 no ataque contra Jedi
      if (has("dark-scourge") && (ta.classLevel?.("jedi") || ta.classLevel?.("jedi-knight") || ta.classLevel?.("jedi-master"))) { adj.delta -= 1; adj.notes.push("dark-scourge"); }
      const baseRef = denyDex ? (ta.system.defenses?.reflex?.flatFooted ?? ta.system.defenses?.reflex?.total ?? 10) : (ta.system.defenses?.reflex?.total ?? 10);
      if (denyDex) adj.notes.push("no-dex");
      const reflex = baseRef + adj.delta;
      // Dark Side Scourge: +Car (mín. 1) no dano corpo a corpo contra quem tem Lado Sombrio 1+
      let scourge = 0;
      if (p.melee && has("dark-side-scourge") && (ta.system.darkSide?.value ?? 0) > 0) { scourge = Math.max(1, actor.system.abilities.cha.mod); adj.notes.push("dark-side-scourge"); }
      let hit = !autoMiss && (autoHit || atkRoll.total >= reflex);
      if (area && !autoMiss && atkRoll.total < 10) hit = false;
      const isCrit = hit && crit && !area && (nat === 20 || atkRoll.total >= reflex);
      let amount = isCrit ? critDamage : baseDamage;
      if (hit && sneakRoll) amount += sneakRoll.total;
      if (hit) amount += scourge;
      // Desarmar não causa dano; Damaging Disarm (à distância): metade do dano
      if (f.disarm) amount = (!p.melee && has("damaging-disarm") && hit) ? Math.floor(amount / 2) : 0;
      const evasion = ta.hasFeature?.("evasion");
      let mult = 1;
      if (area) mult = hit ? (evasion ? 0.5 : 1) : (evasion ? 0 : 0.5);
      else if (!hit) mult = 0;
      // Bone Crusher: oponente agarrado desce −1 passo ao sofrer dano
      const extraStep = has("bone-crusher") && (tStatus.grabbed) ? 1 : 0;
      if (extraStep) adj.notes.push("bone-crusher");
      return {
        uuid: ta.uuid, name: token.name, reflex, hit, crit: isCrit, adjNotes: adj.notes,
        amount: Math.floor(amount * mult), evasion, extraStep
      };
    });
    // Grazing Shot: se acertou o 1º alvo, rola contra o 2º; acertando, o dano é dividido; errando, ninguém sofre dano
    let grazeRoll = null;
    if (f.grazing && results.length === 2 && results[0].hit) {
      grazeRoll = await new Roll(`1d20 ${signed(atkTotalBonus)}${miscAtk}`).evaluate();
      const second = results[1];
      second.hit = grazeRoll.total >= second.reflex;
      const half = Math.floor(results[0].amount / 2);
      for (const r of results) { r.amount = second.hit ? half : 0; r.adjNotes.push("grazing"); }
    }
    attacks.push({ atkRoll, dmgRoll, sneakRoll, nat, crit: crit && !autoMiss, results, baseDamage, critDamage, formula: dmgFormula, grazeRoll });
  }

  // Tough as Durasteel (Martial Arts Master 2+) e Wrruushi Training: PV temporários ao acertar desarmado (armadura leve/nenhuma)
  const anyHit = attacks.some(a => a.results.some(r => r.hit && r.amount > 0));
  if (p.unarmed && anyHit && actor.isOwner && (!actor.derived.armor || actor.derived.armor.category === "light")) {
    const mam = actor.classLevel("martial-arts-master");
    const temp = Math.max(mam >= 2 ? mam : 0, has("wrruushi-training") ? Math.max(0, abil.con.mod) : 0);
    if (temp) { await actor.gainTempHP(temp); notes.push(`${mam >= 2 ? "Tough as Durasteel" : "Wrruushi Training"}: +${temp} PV temporários`); }
  }
  // Relentless Attack (Jedi Academy): ao errar com o grupo escolhido, +2 no próximo ataque contra o alvo
  if (actor.isOwner && actor.featureChoices("relentless-attack").some(c => c === p.group || c === weapon.system.key)) {
    const missed = attacks.flatMap(a => a.results).filter(r => !r.hit).map(r => r.name);
    if (missed.length) {
      await actor.addEffect({ name: `Relentless Attack (+2 vs ${[...new Set(missed)].join(", ")})`, img: "systems/swse-saga/assets/icons/status/buff.svg", rounds: 1, modifiers: [] });
      notes.push(`Relentless Attack: +2 de competência no próximo ataque contra ${[...new Set(missed)].join(", ")} (some no campo de ataque).`);
    }
  }

  // --- Cartão de chat ---
  const partsLine = Object.entries(p.attackParts).filter(([, v]) => v).map(([k, v]) => `${L(`SWSE.Part.${k}`)} ${signed(v)}`)
    .concat(atk.map(([l, v]) => `${l} ${signed(v)}`)).join(", ");
  const dmgLine = Object.entries(p.damageParts).filter(([, v]) => v).map(([k, v]) => `${L(`SWSE.Part.${k}`)} ${signed(v)}`)
    .concat(dmg.map(([l, v]) => `${l} ${signed(v)}`)).concat(extraDice ? [`+${extraDice} ${L("SWSE.Attack.Dice")}`] : []).join(", ");

  const payload = {
    type: damageType,
    ignoreDR: !!weapon.system.ignoresDR,
    thresholdReduction: p.thresholdReduction + thresholdExtra,
    drReduction: p.drReduction,
    extraSteps: p.melee && has("stunning-strike") ? 1 : 0,
    bonusSteps: bonusSteps.length,
    statusOnHit,
    effectsOnHit,
    halveThreshold: !!f.endGame,
    area,
    attacks: attacks.map(a => ({ base: a.baseDamage, crit: a.critDamage, sneak: a.sneakRoll?.total ?? 0, results: a.results }))
  };

  let html = `<div class="swse-card attack-card">
    <header class="card-header"><img src="${weapon.img}" width="36" height="36"><h3>${weapon.name}</h3></header>
    <p class="parts"><strong>${L("SWSE.Attack.Label")}:</strong> ${partsLine}</p>
    <p class="parts"><strong>${L("SWSE.Damage")}:</strong> ${dmgLine || "—"}${damageType !== "normal" ? ` (${L(`SWSE.DamageKind.${damageType}`)})` : ""}</p>`;
  for (const [i, a] of attacks.entries()) {
    html += `<section class="attack-entry">
      ${nAttacks > 1 ? `<h4>${L("SWSE.Attack.Label")} ${i + 1}</h4>` : ""}
      ${await a.atkRoll.render()}
      ${a.nat === 20 ? `<p class="crit">${L("SWSE.Natural20")}${a.crit && !area ? " — " + L("SWSE.Attack.Critical") : ""}</p>` : a.crit && !area ? `<p class="crit">${L("SWSE.Attack.CriticalThreat")}</p>` : ""}
      ${a.nat === 1 ? `<p class="fumble">${L("SWSE.Natural1")}</p>` : ""}
      ${a.grazeRoll ? `<p><strong>Grazing Shot</strong></p>${await a.grazeRoll.render()}` : ""}
      <div class="damage-roll"><strong>${L("SWSE.Damage")}:</strong> ${await a.dmgRoll.render()}
        ${a.sneakRoll ? `<p>Sneak Attack: +${a.sneakRoll.total}</p>` : ""}
        ${a.crit && !area ? `<p class="crit">${L("SWSE.Attack.CriticalDamage")}: ${a.critDamage} (×${p.critMultiplier})</p>` : ""}
      </div>`;
    if (a.results.length) {
      html += `<ul class="target-results">`;
      for (const r of a.results) {
        const status = r.crit ? L("SWSE.Attack.Critical") : r.hit ? L("SWSE.Attack.Hit") : L("SWSE.Attack.Miss");
        html += `<li class="${r.hit ? "hit" : "miss"}"><span class="tname">${r.name}</span>
          <span class="tdef">${L("SWSE.Defense.reflexAbbr")} ${game.user.isGM ? r.reflex : "—"}</span>
          <span class="tstatus">${status}${r.evasion && area ? " (Evasion)" : ""}</span>
          ${r.adjNotes?.length ? `<span class="tnotes">${r.adjNotes.map(n => L(`SWSE.TargetNote.${n}`)).join(" · ")}</span>` : ""}
          ${r.amount > 0 ? `<button type="button" data-swse-action="apply-damage" data-attack="${i}" data-target="${r.uuid}" data-amount="${r.amount}">${L("SWSE.Attack.Apply")} ${r.amount}</button>` : ""}
        </li>`;
      }
      html += `</ul>`;
    }
    html += `<div class="card-buttons">
      <button type="button" data-swse-action="apply-selected" data-attack="${i}" data-mult="1">${L("SWSE.Attack.ApplySelected")} (${a.baseDamage + (a.sneakRoll?.total ?? 0)})</button>
      ${a.crit && !area ? `<button type="button" data-swse-action="apply-selected" data-attack="${i}" data-crit="1">${L("SWSE.Attack.ApplySelectedCrit")} (${a.critDamage + (a.sneakRoll?.total ?? 0)})</button>` : ""}
      <button type="button" data-swse-action="apply-selected" data-attack="${i}" data-mult="0.5">${L("SWSE.Attack.ApplySelectedHalf")}</button>
    </div></section>`;
  }
  if (bonusSteps.length) notes.push(game.i18n.format("SWSE.Attack.BonusStepsNote", { list: bonusSteps.join(", ") }));
  if (p.thresholdReduction) notes.push(game.i18n.format("SWSE.Attack.DevastatingNote", { n: p.thresholdReduction }));
  if (payload.extraSteps) notes.push(L("SWSE.Attack.StunningStrikeNote"));
  if (notes.length) html += `<ul class="notes">${notes.map(n => `<li>${n}</li>`).join("")}</ul>`;
  html += `</div>`;

  const rolls = attacks.flatMap(a => [a.atkRoll, a.dmgRoll, a.sneakRoll, a.grazeRoll].filter(Boolean));
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: html,
    rolls,
    flags: { [SYSTEM_ID]: { type: "attack", actorUuid: actor.uuid, itemUuid: weapon.uuid, damage: payload } }
  });
}
