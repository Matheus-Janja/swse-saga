/**
 * Talentos e feats ativáveis: cada entrada recebe (actor, item) e executa o efeito do talento
 * (criar efeito temporário, mover na trilha de condição, rolar perícia contra defesa etc.).
 * Aliados = tokens marcados (T). Duração "encontro" = até o fim do combate (ou permanente fora de combate).
 */
import { SYSTEM_ID } from "../config.mjs";
import { requestEffect, requestUpdate } from "../rolls/damage.mjs";

const L = k => game.i18n.localize(k);
const F = (k, d) => game.i18n.format(k, d);
const ICON = n => `systems/${SYSTEM_ID}/assets/icons/status/${n}.svg`;
const mod = (target, value, type = "untyped") => ({ target, value: String(value), type, label: "", disabled: false });
const ENCOUNTER = () => (game.combat ? 999 : null);

const targetsActors = () => Array.from(game.user.targets).map(t => t.actor).filter(Boolean);
const chat = (actor, html) => ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content: `<div class="swse-card talent-card">${html}</div>` });

async function needFP(actor) {
  if (await actor.spendForcePoint()) return true;
  return false;
}

/** Aplica um efeito em uma lista de atores (self e/ou aliados). */
async function applyTo(actors, effect) {
  for (const a of actors) await requestEffect(a, effect);
  return actors.map(a => a.name).join(", ");
}

async function choose(title, options) {
  return foundry.applications.api.DialogV2.wait({
    window: { title },
    content: `<div class="swse-dialog"><div class="form-group"><select name="c">${Object.entries(options).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select></div></div>`,
    buttons: [{ action: "ok", label: "OK", default: true, callback: (e, b) => b.form.elements.c.value }],
    rejectClose: false
  });
}

const DEFENSES = () => ({ reflex: L("SWSE.Defense.reflex"), fortitude: L("SWSE.Defense.fortitude"), will: L("SWSE.Defense.will") });

/** Teste de perícia contra a defesa de cada alvo marcado; retorna os alvos que falharam a defesa. */
async function skillVsDefense(actor, skill, defense, label) {
  const targets = targetsActors();
  if (!targets.length) { ui.notifications.warn(L("SWSE.Talent.NeedTarget")); return null; }
  const roll = await new Roll(`1d20 + ${actor.system.skills[skill].total}`).evaluate();
  const hits = targets.filter(t => roll.total >= (t.system.defenses?.[defense]?.total ?? 10));
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }), rolls: [roll],
    content: `<div class="swse-card talent-card"><h3>${label}</h3>${await roll.render()}
      <ul class="target-results">${targets.map(t => `<li class="${hits.includes(t) ? "hit" : "miss"}"><span class="tname">${t.name}</span>
        <span class="tdef">${L(`SWSE.Defense.${defense}`)} ${game.user.isGM ? t.system.defenses?.[defense]?.total : "—"}</span>
        <span class="tstatus">${hits.includes(t) ? L("SWSE.Success") : L("SWSE.Failure")}</span></li>`).join("")}</ul></div>`
  });
  return hits;
}

async function shiftTarget(actor, steps) {
  const step = Math.clamp(actor.system.condition.step + steps, 0, 5);
  return requestUpdate(actor, { "system.condition.step": step });
}

export const TALENT_ACTIONS = {
  /* ---------------- Jedi ---------------- */
  "lightsaber-defense": async actor => {
    const sabers = actor.items.filter(i => i.type === "weapon" && i.system.equipped && i.system.group === "lightsabers").length;
    if (!sabers) return ui.notifications.warn(L("SWSE.Talent.NeedSaber"));
    let bonus = Math.min(actor.countFeature("lightsaber-defense"), 3);
    if (sabers === 1 && actor.hasFeature("makashi")) bonus = Math.min(bonus + 2, 5);
    if (sabers >= 2 && actor.hasFeature("jar-kai")) bonus *= 2;
    await actor.addEffect({ name: `Lightsaber Defense (+${bonus})`, img: ICON("defensive"), rounds: 0, modifiers: [mod("defenses.reflex", bonus, "deflection")] });
  },
  "battle-meditation": async actor => {
    if (!(await needFP(actor))) return;
    const names = await applyTo([actor, ...targetsActors()], { name: "Battle Meditation", img: ICON("buff"), rounds: ENCOUNTER(), modifiers: [mod("attack.all", 1, "insight")] });
    chat(actor, `<h3>Battle Meditation</h3><p>${F("SWSE.Talent.AppliedTo", { names })}</p>`);
  },
  resilience: async actor => { await actor.shiftCondition(-2); chat(actor, `<p>Resilience: +2 ${L("SWSE.Talent.Steps")}</p>`); },
  "skilled-advisor": async actor => {
    const fp = actor.system.forcePoints.value > 0 && (await foundry.applications.api.DialogV2.confirm({ window: { title: "Skilled Advisor" }, content: `<p>${L("SWSE.Talent.SpendFPFor10")}</p>` }));
    if (fp && !(await needFP(actor))) return;
    const n = fp ? 10 : 5;
    const names = await applyTo(targetsActors(), { name: `Skilled Advisor (+${n})`, img: ICON("buff"), rounds: 1, modifiers: [mod("skills.all", n, "untyped")] });
    chat(actor, `<h3>Skilled Advisor</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })} ${L("SWSE.Talent.NextCheck")}</p>`);
  },
  "adept-negotiator": async actor => {
    const hits = await skillVsDefense(actor, "persuasion", "will", "Adept Negotiator");
    for (const t of hits ?? []) await shiftTarget(t, actor.hasFeature("master-negotiator") ? 2 : 1);
  },
  "force-haze": async actor => { if (await needFP(actor)) chat(actor, `<h3>Force Haze</h3><p>${L("SWSE.Talent.ForceHazeNote")}</p>`); },

  block: actor => negate(actor, "Block"),
  deflect: actor => negate(actor, "Deflect"),
  "extreme-effort": async actor => {
    await actor.addEffect({ name: "Extreme Effort", img: ICON("buff"), rounds: 0, modifiers: ["climb", "jump", "swim"].map(s => mod(`skills.${s}`, 5)) });
    chat(actor, `<p>${L("SWSE.Talent.ExtremeEffortNote")}</p>`);
  },

  /* ---------------- Noble ---------------- */
  "born-leader": async actor => {
    const names = await applyTo([actor, ...targetsActors()], { name: "Born Leader", img: ICON("buff"), rounds: ENCOUNTER(), modifiers: [mod("attack.all", 1, "insight")] });
    chat(actor, `<h3>Born Leader</h3><p>${F("SWSE.Talent.AppliedTo", { names })}</p>`);
  },
  "inspire-confidence": async actor => {
    const names = await applyTo(targetsActors(), { name: "Inspire Confidence", img: ICON("buff"), rounds: ENCOUNTER(), modifiers: [mod("attack.all", 1, "morale"), mod("skills.all", 1, "morale")] });
    chat(actor, `<h3>Inspire Confidence</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })}</p>`);
  },
  "bolster-ally": async actor => {
    const allies = targetsActors();
    if (!allies.length) return ui.notifications.warn(L("SWSE.Talent.NeedTarget"));
    for (const a of allies) {
      const upd = { "system.condition.step": Math.max(0, a.system.condition.step - 1) };
      if (a.system.hp.value <= a.system.hp.max / 2) upd["system.hp.temp"] = Math.max(a.system.hp.temp, a.system.level || 1);
      await requestUpdate(a, upd);
    }
    chat(actor, `<h3>Bolster Ally</h3><p>${F("SWSE.Talent.AppliedTo", { names: allies.map(a => a.name).join(", ") })}</p>`);
  },
  rally: async actor => {
    const allies = [actor, ...targetsActors()].filter(a => a.system.hp.value < a.system.hp.max / 2);
    const names = await applyTo(allies, { name: "Rally", img: ICON("buff"), rounds: ENCOUNTER(), modifiers: [mod("defenses.reflex", 2, "morale"), mod("defenses.will", 2, "morale"), mod("damage.all", 2, "morale")] });
    chat(actor, `<h3>Rally</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })}</p>`);
  },
  "fearless-leader": async actor => {
    const names = await applyTo(targetsActors(), { name: "Fearless Leader", img: ICON("buff"), rounds: ENCOUNTER(), modifiers: [] });
    chat(actor, `<h3>Fearless Leader</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })} (+5 ${L("SWSE.Talent.VsFear")})</p>`);
  },
  presence: async actor => { await skillVsDefense(actor, "persuasion", "will", `Presence (${L("SWSE.Talent.Intimidate")})`); },
  "demand-surrender": async actor => { await skillVsDefense(actor, "persuasion", "will", "Demand Surrender"); },

  /* ---------------- Scoundrel ---------------- */
  "fools-luck": async actor => {
    const c = await choose("Fool's Luck", { attack: "+1 ataque", skills: "+5 perícias", defense: "+1 Defesas" });
    if (!c || !(await needFP(actor))) return;
    const mods = { attack: [mod("attack.all", 1, "competence")], skills: [mod("skills.all", 5, "competence")], defense: [mod("defenses.all", 1, "competence")] }[c];
    await actor.addEffect({ name: "Fool's Luck", img: ICON("buff"), rounds: ENCOUNTER(), modifiers: mods });
  },
  "walk-the-line": async actor => {
    const names = await applyTo(targetsActors(), { name: "Walk the Line", img: ICON("concealment"), rounds: 0, modifiers: [mod("defenses.all", -2)] });
    chat(actor, `<h3>Walk the Line</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })}</p>`);
  },

  /* ---------------- Soldier ---------------- */
  indomitable: async actor => { await actor.shiftCondition(-5); chat(actor, `<p>Indomitable: +5 ${L("SWSE.Talent.Steps")}</p>`); },
  "cover-fire": async actor => {
    const names = await applyTo(targetsActors(), { name: "Cover Fire", img: ICON("cover"), rounds: 0, modifiers: [mod("defenses.reflex", 1)] });
    chat(actor, `<h3>Cover Fire</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })}</p>`);
  },
  "battle-analysis": async actor => { await actor.rollSkill("knowledgeTactics", { dc: 15, label: "Battle Analysis (CD 15)" }); },
  "draw-fire": async actor => { await skillVsDefense(actor, "persuasion", "will", "Draw Fire"); },

  /* ---------------- Força ---------------- */
  "damage-reduction-10": async actor => {
    if (await needFP(actor)) await actor.addEffect({ name: "Damage Reduction 10", img: ICON("total-defense"), rounds: 10, modifiers: [mod("damageReduction", 10)] });
  },
  equilibrium: async actor => {
    if (!(await needFP(actor))) return;
    await actor.update({ "system.condition.step": 0, "system.condition.persistent": false });
    chat(actor, `<p>Equilibrium: ${L("SWSE.Talent.ConditionCleared")}</p>`);
  },
  "force-focus": async actor => {
    const roll = await actor.rollSkill("useTheForce", { dc: 15, label: "Force Focus (CD 15)" });
    if (!roll || roll.total < 15) return;
    const spent = actor.items.filter(i => i.type === "forcePower" && i.system.spent > 0);
    if (!spent.length) return;
    const id = await choose("Force Focus", Object.fromEntries(spent.map(p => [p.id, p.name])));
    const p = actor.items.get(id);
    if (p) await p.update({ "system.spent": p.system.spent - 1 });
  },
  "telekinetic-savant": async actor => {
    const spent = actor.items.filter(i => i.type === "forcePower" && i.system.spent > 0 && i.system.descriptors.includes("telekinetic"));
    if (!spent.length) return ui.notifications.info(L("SWSE.Talent.NothingToRecover"));
    const id = await choose("Telekinetic Savant", Object.fromEntries(spent.map(p => [p.id, p.name])));
    const p = actor.items.get(id);
    if (p) await p.update({ "system.spent": p.system.spent - 1 });
  },
  "dark-presence": async actor => {
    const names = await applyTo([actor, ...targetsActors()], { name: "Dark Presence", img: ICON("rage"), rounds: ENCOUNTER(), modifiers: [mod("defenses.all", 1, "force")] });
    chat(actor, `<h3>Dark Presence</h3><p>${F("SWSE.Talent.AppliedTo", { names })}</p>`);
  },
  revenge: async actor => { await actor.addEffect({ name: "Revenge", img: ICON("rage"), rounds: ENCOUNTER(), modifiers: [mod("attack.all", 2, "force"), mod("damage.all", 2, "force")] }); },
  "channel-anger": async actor => {
    if (!(await needFP(actor))) return;
    const rounds = 5 + Math.max(0, actor.system.abilities.con.mod);
    await actor.addEffect({ name: "Channel Anger", img: ICON("rage"), rounds, statuses: ["rage"] });
    chat(actor, `<h3>Channel Anger</h3><p>${F("SWSE.Talent.RageNote", { n: rounds })}</p>`);
  },
  "force-talisman": async actor => {
    const c = await choose("Force Talisman", DEFENSES());
    if (!c || !(await needFP(actor))) return;
    const greater = actor.hasFeature("greater-force-talisman");
    await actor.addEffect({ name: greater ? "Greater Force Talisman" : "Force Talisman", img: ICON("total-defense"), modifiers: [mod(greater ? "defenses.all" : `defenses.${c}`, 1, "force")] });
  },
  "gauge-force-potential": async actor => { await skillVsDefense(actor, "useTheForce", "will", "Gauge Force Potential"); },

  /* ---------------- Prestígio ---------------- */
  "inspire-fear-i": async actor => chat(actor, `<p>${L("SWSE.Talent.InspireFearNote")}</p>`),
  "deceptive-shot": async actor => {
    const hits = await skillVsDefense(actor, "deception", "will", "Deceptive Shot");
    for (const t of hits ?? []) await requestEffect(t, { name: `Deceptive Shot (${actor.name})`, img: ICON("flat-footed"), rounds: 0, statuses: ["flatFooted"] });
  },
  "deployment-tactics": async actor => {
    const roll = await actor.rollSkill("knowledgeTactics", { dc: 15, label: "Deployment Tactics (CD 15)" });
    if (!roll || roll.total < 15) return;
    const b = actor.hasFeature("born-leader") || actor.hasFeature("battle-analysis") ? 2 : 1;
    const c = await choose("Deployment Tactics", { flank: `+${b} ataque contra flanqueados`, aoo: `+${b} esquiva contra ataques de oportunidade` });
    const effect = c === "flank"
      ? { name: `Deployment Tactics (+${b} vs flanqueados)`, img: ICON("buff"), rounds: 0, modifiers: [] }
      : { name: `Deployment Tactics (+${b} esquiva vs AdO)`, img: ICON("buff"), rounds: 0, modifiers: [] };
    const names = await applyTo([actor, ...targetsActors()], effect);
    chat(actor, `<h3>Deployment Tactics</h3><p>${F("SWSE.Talent.AppliedTo", { names })} ${L("SWSE.Talent.SituationalNote")}</p>`);
  },
  "field-tactics": async actor => {
    const roll = await actor.rollSkill("knowledgeTactics", { dc: 15, label: "Field Tactics (CD 15)" });
    if (roll?.total >= 15) chat(actor, `<p>${L("SWSE.Talent.FieldTacticsNote")}</p>`);
  },
  "assault-tactics": async actor => {
    const roll = await actor.rollSkill("knowledgeTactics", { dc: 15, label: "Assault Tactics (CD 15)" });
    if (roll?.total >= 15) chat(actor, `<p>${L("SWSE.Talent.AssaultTacticsNote")}</p>`);
  },
  outmaneuver: async actor => {
    const roll = await actor.rollSkill("knowledgeTactics", { dc: 15, label: "Outmaneuver (CD 15)" });
    if (roll?.total >= 15) chat(actor, `<p>${L("SWSE.Talent.OutmaneuverNote")}</p>`);
  },
  "shift-defense-i": actor => shiftDefense(actor, 1, -2, "Shift Defense I"),
  "shift-defense-ii": actor => shiftDefense(actor, 2, -5, "Shift Defense II"),
  "shift-defense-iii": async actor => {
    const c = await choose("Shift Defense III", DEFENSES());
    if (!c) return;
    const mods = Object.keys(DEFENSES()).map(k => mod(`defenses.${k}`, k === c ? 5 : -5, k === c ? "competence" : "untyped"));
    await actor.addEffect({ name: "Shift Defense III", img: ICON("defensive"), rounds: 0, modifiers: mods });
  },
  "attune-weapon": async actor => { if (await needFP(actor)) weaponBuff(actor, "Attune Weapon", "attackBonus", 1); },
  "empower-weapon": async actor => { if (await needFP(actor)) weaponBuff(actor, "Empower Weapon", "dice", 1); },
  "dark-healing": async actor => darkHealing(actor),

  /* ---------------- Feats ---------------- */
  "shake-it-off": async actor => {
    if (actor.system.condition.persistent) return ui.notifications.warn(L("SWSE.Warn.Persistent"));
    await actor.shiftCondition(-1);
    chat(actor, `<p>Shake It Off: +1 ${L("SWSE.Talent.Steps")}</p>`);
  },
  dodge: async actor => { await actor.addEffect({ name: "Dodge", img: ICON("defensive"), rounds: 0, modifiers: [mod("defenses.reflex", 1, "dodge")] }); }
};

/**
 * Block / Deflect: Use the Force contra o resultado do ataque, com −5 cumulativo por uso desde o último turno
 * (−2 com Shii-Cho). Soresu: rerrola uma falha.
 */
async function negate(actor, name) {
  if (!actor.items.some(i => i.type === "weapon" && i.system.equipped && i.system.group === "lightsabers")) return ui.notifications.warn(L("SWSE.Talent.NeedSaber"));
  const counter = actor.effects.find(e => e.getFlag(SYSTEM_ID, "negateCount") !== undefined);
  const uses = counter?.getFlag(SYSTEM_ID, "negateCount") ?? 0;
  const step = actor.hasFeature("shii-cho") ? 2 : 5;
  const res = await foundry.applications.api.DialogV2.wait({
    window: { title: name },
    content: `<div class="swse-dialog"><div class="form-group"><label>${L("SWSE.Talent.AttackToNegate")}</label><input type="number" name="atk" value="" autofocus></div>
      <p class="hint">${F("SWSE.Talent.NegatePenalty", { n: uses * step, uses })}</p></div>`,
    buttons: [{ action: "ok", label: name, default: true, callback: (e, b) => Number(b.form.elements.atk.value) || 0 }],
    rejectClose: false
  });
  if (res === null || res === undefined) return;
  const bonus = actor.system.skills.useTheForce.total - uses * step;
  let roll = await new Roll(`1d20 + ${bonus}`).evaluate();
  const rolls = [roll];
  let rerolled = false;
  if (roll.total < res && actor.hasFeature("soresu")) {
    roll = await new Roll(`1d20 + ${bonus}`).evaluate();
    rolls.push(roll);
    rerolled = true;
  }
  const ok = roll.total >= res;
  if (counter) await counter.setFlag(SYSTEM_ID, "negateCount", uses + 1);
  else await actor.createEmbeddedDocuments("ActiveEffect", [{
    name: "Block/Deflect", img: ICON("defensive"),
    flags: { [SYSTEM_ID]: { negateCount: 1, modifiers: [], expiry: { rounds: 0, combat: game.combat?.id ?? null, round: game.combat?.round ?? 0, turn: game.combat?.started ? game.combat.turn : -1 } } }
  }]);
  const html = [];
  for (const r of rolls) html.push(await r.render());
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }), rolls,
    content: `<div class="swse-card talent-card"><h3>${name} (${L("SWSE.Talent.Vs")} ${res})</h3>${html.join("")}
      ${rerolled ? "<p class=\"note\">Soresu</p>" : ""}<p class="${ok ? "success" : "failure"}">${ok ? L("SWSE.Talent.Negated") : L("SWSE.Talent.NotNegated")}</p>
      ${ok && name === "Deflect" && actor.hasFeature("redirect-shot") ? `<p class="note">${L("SWSE.Talent.RedirectNote")}</p>` : ""}</div>`
  });
}

async function shiftDefense(actor, bonus, penalty, name) {
  const from = await choose(`${name}: ${L("SWSE.Talent.Penalize")}`, DEFENSES());
  if (!from) return;
  const to = await choose(`${name}: ${L("SWSE.Talent.Boost")}`, Object.fromEntries(Object.entries(DEFENSES()).filter(([k]) => k !== from)));
  if (!to) return;
  await actor.addEffect({ name, img: ICON("defensive"), rounds: 0, modifiers: [mod(`defenses.${from}`, penalty), mod(`defenses.${to}`, bonus, "competence")] });
}

/** Attune/Empower Weapon: altera permanentemente uma arma corpo a corpo escolhida. */
async function weaponBuff(actor, name, kind, n) {
  const melee = actor.items.filter(i => i.type === "weapon" && i.system.rangeType === "melee" && i.system.key !== "unarmed");
  if (!melee.length) return;
  const id = await choose(name, Object.fromEntries(melee.map(w => [w.id, w.name])));
  const w = actor.items.get(id);
  if (!w) return;
  if (kind === "attackBonus") await w.update({ "system.attackBonus": (w.system.attackBonus || 0) + n, name: `${w.name} (attuned)` });
  else await w.update({ "system.damage": w.system.damage.replace(/(\d+)d(\d+)/, (_, x, y) => `${Number(x) + n}d${y}`), name: `${w.name} (empowered)` });
  chat(actor, `<p>${name}: ${w.name}</p>`);
}

/** Dark Healing: Ponto da Força; ataque à distância contra a Fortitude; 1d6 por nível de classe Sith Apprentice. */
async function darkHealing(actor) {
  const targets = targetsActors();
  if (targets.length !== 1) return ui.notifications.warn(L("SWSE.Talent.NeedTarget"));
  if (!(await needFP(actor))) return;
  const t = targets[0];
  const lv = Math.max(1, actor.classLevel("sith-apprentice") + actor.classLevel("sith-lord"));
  const atk = await new Roll(`1d20 + ${actor.system.bab + actor.system.abilities.dex.mod}`).evaluate();
  const hit = atk.total >= (t.system.defenses?.fortitude?.total ?? 10);
  const improved = actor.hasFeature("improved-dark-healing");
  const dmg = await new Roll(`${lv}d6`).evaluate();
  const amount = hit ? dmg.total : improved ? Math.floor(dmg.total / 2) : 0;
  if (amount) {
    const { requestDamage } = await import("../rolls/damage.mjs");
    await requestDamage(t, amount, { type: "normal" });
    await actor.applyHealing(amount);
  }
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }), rolls: [atk, dmg],
    content: `<div class="swse-card talent-card"><h3>Dark Healing → ${t.name}</h3>${await atk.render()}<p class="${hit ? "success" : "failure"}">${hit ? L("SWSE.Attack.Hit") : L("SWSE.Attack.Miss")}</p>${await dmg.render()}<p>${F("SWSE.Talent.DarkHealingResult", { n: amount })}</p></div>`
  });
}

/** Ativa um feat/talento, se tiver ação. Retorna true se executou. */
export async function useTalent(actor, item) {
  const fn = TALENT_ACTIONS[item.system.key];
  if (!fn) return false;
  await fn(actor, item);
  return true;
}

export const hasTalentAction = key => key in TALENT_ACTIONS;

/** Force Point Recovery: no fim do encontro, recupera 1 Ponto da Força por técnica. */
export function registerTalentHooks() {
  Hooks.on("deleteCombat", async combat => {
    if (game.users.activeGM?.id !== game.user.id) return;
    for (const c of combat.combatants) {
      const a = c.actor;
      const n = a?.countFeature?.("force-point-recovery") ?? 0;
      if (!n) continue;
      const fp = a.system.forcePoints;
      if (fp.value < fp.max) {
        await a.update({ "system.forcePoints.value": Math.min(fp.max, fp.value + n) });
        ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: a }), whisper: ChatMessage.getWhisperRecipients("GM"), content: `<div class="swse-card"><p>Force Point Recovery: +${Math.min(n, fp.max - fp.value)} FP</p></div>` });
      }
    }
  });
}
