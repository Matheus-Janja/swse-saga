/**
 * Condições de combate (Cap. 9) e buffs temporários — regras puras.
 * Os status vêm dos efeitos ativos do ator (HUD do token ou ficha); os modificadores de buffs ficam em
 * flags["swse-saga"].modifiers de cada ActiveEffect, no mesmo formato dos modificadores de itens.
 */
const ICON = n => `systems/swse-saga/assets/icons/status/${n}.svg`;
const mod = (target, value, type = "untyped") => ({ target, value: String(value), type, label: "", disabled: false });

/**
 * Status do sistema (substituem os status padrão do Foundry no HUD do token).
 * noDex: perde o bônus de Destreza (e de esquiva) na Defesa de Reflexos.
 */
export const STATUSES = [
  { id: "dead", name: "SWSE.Status.dead", img: ICON("dead") },
  { id: "unconscious", name: "SWSE.Status.unconscious", img: ICON("unconscious"), noDex: true, helpless: true },
  { id: "helpless", name: "SWSE.Status.helpless", img: ICON("helpless"), noDex: true, helpless: true },
  { id: "flatFooted", name: "SWSE.Status.flatFooted", img: ICON("flat-footed"), noDex: true, uncannyDodge: true },
  { id: "prone", name: "SWSE.Status.prone", img: ICON("prone"), mods: [mod("attack.melee", -5)], prone: true },
  { id: "fightDefensive", name: "SWSE.Status.fightDefensive", img: ICON("defensive") },
  { id: "totalDefense", name: "SWSE.Status.totalDefense", img: ICON("total-defense") },
  { id: "charging", name: "SWSE.Status.charging", img: ICON("charging"), mods: [mod("defenses.reflex", -2)] },
  { id: "grabbed", name: "SWSE.Status.grabbed", img: ICON("grabbed"), grabbed: true },
  { id: "pinned", name: "SWSE.Status.pinned", img: ICON("pinned"), noDex: true, grabbed: true },
  { id: "cover", name: "SWSE.Status.cover", img: ICON("cover"), cover: 5 },
  { id: "improvedCover", name: "SWSE.Status.improvedCover", img: ICON("improved-cover"), cover: 10 },
  { id: "concealment", name: "SWSE.Status.concealment", img: ICON("concealment"), concealment: 2 },
  { id: "totalConcealment", name: "SWSE.Status.totalConcealment", img: ICON("total-concealment"), concealment: 5 },
  { id: "rage", name: "SWSE.Status.rage", img: ICON("rage"), mods: [mod("attack.melee", 2, "rage"), mod("damage.melee", 2, "rage")] },
  { id: "aiming", name: "SWSE.Status.aiming", img: ICON("aiming") }
];
export const STATUS_BY_ID = Object.fromEntries(STATUSES.map(s => [s.id, s]));

/**
 * Converte status em modificadores e marcadores para o cálculo da ficha.
 * @param {Set<string>} statuses
 * @param {object} ctx { acrobaticsTrained, uncannyDodge }
 */
export function statusEffects(statuses, ctx = {}) {
  const out = { mods: [], noDex: false, helpless: false, prone: false, grabbed: false, cover: 0, concealment: 0 };
  for (const id of statuses) {
    const s = STATUS_BY_ID[id];
    if (!s) continue;
    for (const m of s.mods ?? []) out.mods.push({ ...m, source: id });
    if (s.noDex && !(s.uncannyDodge && ctx.uncannyDodge)) out.noDex = true;
    if (s.helpless) out.helpless = true;
    if (s.prone) out.prone = true;
    if (s.grabbed) out.grabbed = true;
    if (s.cover) out.cover = Math.max(out.cover, s.cover);
    if (s.concealment) out.concealment = Math.max(out.concealment, s.concealment);
  }
  // Lutar defensivamente: −5 nos ataques, +2 de esquiva (+5 treinado em Acrobatics).
  // Defesa total (sem atacar): +5 (+10 treinado).
  // Resolute Stance (Galaxy of Intrigue): +2/+5 de moral na Vontade em vez da esquiva na Reflexos
  const defTarget = ctx.resoluteStance ? "defenses.will" : "defenses.reflex";
  const defType = ctx.resoluteStance ? "morale" : "dodge";
  if (statuses.has("totalDefense")) out.mods.push({ ...mod(defTarget, ctx.resoluteStance ? 5 : (ctx.acrobaticsTrained ? 10 : 5), defType), source: "totalDefense" });
  else if (statuses.has("fightDefensive")) {
    out.mods.push({ ...mod(defTarget, ctx.resoluteStance ? 2 : (ctx.acrobaticsTrained ? 5 : 2), defType), source: "fightDefensive" });
    out.mods.push({ ...mod("attack.all", -5), source: "fightDefensive" });
  }
  if (out.cover) out.mods.push({ ...mod("defenses.reflex", out.cover, "cover"), source: "cover" });
  return out;
}

/**
 * Ajuste da defesa do alvo para um ataque específico (aplicado no cartão de ataque).
 * Retorna { delta, notes } — delta soma à Reflexos do alvo (positivo = mais difícil de acertar).
 */
export function targetAdjustment(target, { melee, aim, keenShot = false } = {}) {
  let delta = 0;
  const notes = [];
  if (target.prone) {
    delta += melee ? -5 : 5;
    notes.push(melee ? "prone-melee" : "prone-ranged");
  }
  if (target.helpless && melee && !target.prone) { delta -= 5; notes.push("helpless"); }
  if (aim && target.cover) { delta -= target.cover; notes.push("aim-cover"); }
  if (target.concealment) {
    const pen = keenShot && target.concealment === 2 ? 0 : target.concealment;
    if (pen) { delta += pen; notes.push(target.concealment === 5 ? "total-concealment" : "concealment"); }
  }
  return { delta, notes };
}

/** Buffs prontos (talentos de aliados e poderes comuns do Livro Básico). */
export const BUFF_PRESETS = {
  battleMeditation: { name: "Battle Meditation", mods: [mod("attack.all", 1, "insight")] },
  bornLeader: { name: "Born Leader", mods: [mod("attack.all", 1, "insight")] },
  inspireConfidence: { name: "Inspire Confidence", mods: [mod("attack.all", 1, "morale"), mod("skills.all", 1, "morale")] },
  rally: { name: "Rally", mods: [mod("defenses.reflex", 2, "morale"), mod("defenses.will", 2, "morale"), mod("damage.all", 2, "morale")] },
  darkPresence: { name: "Dark Presence", mods: [mod("defenses.all", 1, "force")] },
  coverFire: { name: "Cover Fire", mods: [mod("defenses.reflex", 1)], rounds: 1 },
  foolsLuckAttack: { name: "Fool's Luck (ataque)", mods: [mod("attack.all", 1, "competence")] },
  foolsLuckSkills: { name: "Fool's Luck (perícias)", mods: [mod("skills.all", 5, "competence")] },
  foolsLuckDefense: { name: "Fool's Luck (defesas)", mods: [mod("defenses.all", 1, "competence")] },
  lightsaberDefense: { name: "Lightsaber Defense", mods: [mod("defenses.reflex", 1, "deflection")], rounds: 1 },
  dodge: { name: "Dodge", mods: [mod("defenses.reflex", 1, "dodge")], rounds: 1 },
  battleStrike: { name: "Battle Strike", mods: [mod("attack.all", 1, "force")], rounds: 1 },
  darkRage: { name: "Dark Rage", mods: [mod("attack.melee", 2, "rage"), mod("damage.melee", 2, "rage")], rounds: 1 },
  forceTalisman: { name: "Force Talisman", mods: [mod("defenses.reflex", 1, "force")] },
  greaterForceTalisman: { name: "Greater Force Talisman", mods: [mod("defenses.all", 1, "force")] },
  damageReduction10: { name: "Damage Reduction 10", mods: [mod("damageReduction", 10)], rounds: 10 },
  surge: { name: "Surge", mods: [mod("skills.jump", 10, "force"), mod("speed", 2)], rounds: 1 },
  deploymentTactics: { name: "Deployment Tactics", mods: [mod("attack.all", 1, "competence")], rounds: 1 },
  shiftDefenseI: { name: "Shift Defense I (Ref +1 / Von −2)", mods: [mod("defenses.reflex", 1, "competence"), mod("defenses.will", -2)], rounds: 1 }
};
