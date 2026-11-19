import { SWSE } from "../config.mjs";

/**
 * Perfil simplificado usado na verificação de pré-requisitos.
 * @typedef {object} Profile
 * @property {Record<string,number>} abilities  totais
 * @property {number} bab
 * @property {number} level
 * @property {Set<string>} trained
 * @property {{key:string, choice?:string}[]} feats
 * @property {{key:string, choice?:string, tree:string, category:string}[]} talents
 * @property {Set<string>} forcePowers
 * @property {string} species
 * @property {string} size
 * @property {number} darkSide
 * @property {boolean} droid
 */

export function profileFromActor(actor) {
  const s = actor.system;
  return {
    abilities: Object.fromEntries(Object.keys(SWSE.abilities).map(k => [k, s.abilities[k].total])),
    bab: s.bab,
    level: s.level,
    trained: new Set(Object.entries(s.skills).filter(([, v]) => v.isTrained ?? v.trained).map(([k]) => k)),
    feats: actor.items.filter(i => i.type === "feat").map(i => ({ key: i.system.key, choice: i.system.choice?.value })),
    talents: actor.items.filter(i => i.type === "talent").map(i => ({ key: i.system.key, choice: i.system.choice?.value, tree: i.system.tree, category: i.system.category })),
    forcePowers: new Set(actor.items.filter(i => i.type === "forcePower").map(i => i.system.key)),
    species: actor.species?.system.key ?? "",
    size: actor.derived.size ?? "medium",
    darkSide: s.darkSide.value,
    droid: !!actor.species?.system.droid || !!s.isDroid,
    locomotion: new Set(actor.items.filter(i => i.type === "droidSystem" && i.system.category === "locomotion").map(i => i.system.locomotion?.type || i.system.key))
  };
}

/** "chave" ou "chave:escolha" */
function hasKey(list, spec) {
  const [key, choice] = spec.split(":");
  return list.some(f => f.key === key && (!choice || f.choice === choice));
}

const nameOf = key => key.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

/**
 * Verifica os pré-requisitos estruturados de um item.
 * @param {Profile} p
 * @param {object} prereq  item.system.prerequisites
 * @param {object} [opts]  {choice:string} escolha pretendida (para sameChoice)
 * @returns {{ok:boolean, missing:string[]}}
 */
export function checkPrereqs(p, prereq, opts = {}) {
  const missing = [];
  if (!prereq) return { ok: true, missing };
  const L = k => (globalThis.game?.i18n ? game.i18n.localize(k) : k);
  for (const [ab, min] of Object.entries(prereq.abilities ?? {})) {
    if ((p.abilities[ab] ?? 0) < min) missing.push(`${L(SWSE.abilityAbbr[ab])} ${min}`);
  }
  if (prereq.bab && p.bab < prereq.bab) missing.push(`BBA +${prereq.bab}`);
  if (prereq.level && p.level < prereq.level) missing.push(`${L("SWSE.Level")} ${prereq.level}`);
  for (const sk of prereq.trained ?? []) {
    if (!p.trained.has(sk)) missing.push(`${L("SWSE.TrainedIn")} ${L(SWSE.skills[sk]?.label ?? sk)}`);
  }
  for (const f of prereq.feats ?? []) if (!hasKey(p.feats, f)) missing.push(nameOf(f));
  if (prereq.featsAny?.length && !prereq.featsAny.some(f => hasKey(p.feats, f))) missing.push(prereq.featsAny.map(nameOf).join(" / "));
  for (const t of prereq.talents ?? []) if (!hasKey(p.talents, t)) missing.push(nameOf(t));
  if (prereq.talentsAny?.length && !prereq.talentsAny.some(t => hasKey(p.talents, t))) missing.push(prereq.talentsAny.map(nameOf).join(" / "));
  if (prereq.talentTrees?.count) {
    const n = p.talents.filter(t => prereq.talentTrees.trees.includes(t.tree)).length;
    if (n < prereq.talentTrees.count) missing.push(`${prereq.talentTrees.count} talento(s): ${prereq.talentTrees.trees.join(", ")}`);
  }
  if (prereq.forceTalents) {
    const n = p.talents.filter(t => t.category === "forceTalent").length;
    if (n < prereq.forceTalents) missing.push(`${prereq.forceTalents} Force talent(s)`);
  }
  if (prereq.forceTechniques) {
    const n = p.talents.filter(t => t.category === "forceTechnique").length;
    if (n < prereq.forceTechniques) missing.push(`${prereq.forceTechniques} Force technique(s)`);
  }
  for (const fp of prereq.forcePowers ?? []) if (!p.forcePowers.has(fp)) missing.push(nameOf(fp));
  if (prereq.species?.length && !prereq.species.includes(p.species)) missing.push(prereq.species.map(nameOf).join(" / "));
  if (prereq.sizes?.length && !prereq.sizes.includes(p.size)) missing.push(prereq.sizes.join(" / "));
  if (prereq.nonDroid && p.droid) missing.push(L("SWSE.NonDroid"));
  if (prereq.droidOnly && !p.droid) missing.push(L("SWSE.DroidOnly"));
  if (prereq.locomotion?.length && p.locomotion && !prereq.locomotion.some(l => p.locomotion.has(l))) missing.push(prereq.locomotion.join(" / "));
  if (prereq.darkSide === "equalsWis" && p.darkSide < (p.abilities.wis ?? 0)) missing.push(L("SWSE.DarkSideEqualsWis"));
  if (prereq.darkSide === "atLeast1" && p.darkSide < 1) missing.push(L("SWSE.DarkSideAtLeast1"));
  if (prereq.sameChoice) {
    const choices = [...p.feats, ...p.talents].filter(f => f.key === prereq.sameChoice).map(f => f.choice);
    if (!choices.length) missing.push(nameOf(prereq.sameChoice));
    else if (opts.choice && !choices.includes(opts.choice)) missing.push(`${nameOf(prereq.sameChoice)} (${opts.choice})`);
  }
  return { ok: missing.length === 0, missing };
}

/** Escolhas válidas de um item com sameChoice (ex.: Weapon Specialization só nos grupos com Weapon Focus). */
export function allowedChoices(p, item) {
  const sc = item.system?.prerequisites?.sameChoice;
  if (!sc) return null;
  return [...p.feats, ...p.talents].filter(f => f.key === sc).map(f => f.choice).filter(Boolean);
}
