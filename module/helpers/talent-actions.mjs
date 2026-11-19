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
  dodge: async actor => { await actor.addEffect({ name: "Dodge", img: ICON("defensive"), rounds: 0, modifiers: [mod("defenses.reflex", 1, "dodge")] }); },

  /* ================= Galaxy at War ================= */
  // Squad Leader (Elite Trooper): você + aliados marcados
  "form-up": actor => squad(actor, "Form Up", [mod("defenses.reflex", 2, "morale")]),
  "full-advance": actor => squad(actor, "Full Advance", [mod("damage.all", 2, "morale")]),
  "search-and-destroy": actor => squad(actor, "Search and Destroy", [mod("skills.perception", 2, "morale")]),
  "hold-steady": async actor => {
    const all = [actor, ...targetsActors()];
    for (const a of all) await shiftTarget(a, -1);
    chat(actor, `<h3>Hold Steady</h3><p>+1 ${L("SWSE.Talent.Steps")}: ${all.map(a => a.name).join(", ")}</p>`);
  },
  "fall-back": async actor => chat(actor, `<h3>Fall Back</h3><p>Cada membro do esquadrão move 2 quadrados sem provocar ataques de oportunidade.</p>`),
  // Noble
  "commanding-presence": async actor => {
    const c = await choose("Commanding Presence", { hold: "Hold the Line! (+2 Defesas)", lead: "Lead the Assault (+2 ataque e dano)", tide: "Turn the Tide (mover)" });
    if (!c) return;
    if (c === "tide") return chat(actor, `<h3>Commanding Presence: Turn the Tide</h3><p>Se o ataque causou dano, até ${Math.max(1, actor.system.abilities.cha.mod)} aliado(s) movem metade do deslocamento (ação livre).</p>`);
    const mods = c === "hold" ? [mod("defenses.all", 2, "morale")] : [mod("attack.all", 2, "morale"), mod("damage.all", 2, "morale")];
    const name = c === "hold" ? "Hold the Line!" : "Lead the Assault";
    const names = await applyTo(targetsActors(), { name, img: ICON("buff"), rounds: 1, modifiers: mods });
    chat(actor, `<h3>Commanding Presence: ${name}</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })} ${L("SWSE.Talent.GaWAfterHit")}</p>`);
  },
  "get-down": async actor => {
    const names = await applyTo(targetsActors(), { name: L("SWSE.Status.prone"), img: ICON("prone"), statuses: ["prone"] });
    chat(actor, `<h3>Get Down!</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })}</p>`);
  },
  // Scoundrel
  "easy-prey": async actor => {
    const names = await applyTo(targetsActors(), { name: `Easy Prey (${actor.name})`, img: ICON("flat-footed"), rounds: 1, statuses: ["flatFooted"] });
    chat(actor, `<h3>Easy Prey</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })} Use metade do dano deste ataque.</p>`);
  },
  "sly-combatant": async actor => {
    const c = await choose("Sly Combatant", { injury: "Distracting Injury (−2 ataque e dano)", bleed: "Make Them Bleed (condição persistente)", numbers: "Strength in Numbers (+2 dano por aliado adjacente)" });
    if (!c) return;
    const targets = targetsActors();
    if (c === "numbers") return chat(actor, `<h3>Sly Combatant: Strength in Numbers</h3><p>Some +2 de dano por aliado adjacente ao alvo (campo de dano extra).</p>`);
    if (!targets.length) return ui.notifications.warn(L("SWSE.Talent.NeedTarget"));
    if (c === "injury") {
      const names = await applyTo(targets, { name: `Distracting Injury (${actor.name})`, img: ICON("debuff"), rounds: ENCOUNTER(), modifiers: [mod("attack.all", -2, "penalty"), mod("damage.all", -2, "penalty")] });
      return chat(actor, `<h3>Distracting Injury</h3><p>${F("SWSE.Talent.AppliedTo", { names })}</p>`);
    }
    for (const t of targets) await requestUpdate(t, { "system.condition.persistent": true });
    chat(actor, `<h3>Make Them Bleed</h3><p>${targets.map(t => t.name).join(", ")}: condição persistente (cirurgia, Treat Injury CD 25).</p>`);
  },
  // Scout
  "dig-in": async actor => {
    if (!actor.statuses?.has("prone")) return ui.notifications.warn(L("SWSE.Talent.NeedProne"));
    await actor.addEffect({ name: "Dig In", img: ICON("concealment"), rounds: 0, statuses: ["concealment"] });
  },
  "ghost-assailant": async actor => {
    const targets = targetsActors();
    if (!targets.length) return ui.notifications.warn(L("SWSE.Talent.NeedTarget"));
    const roll = await new Roll(`1d20 + ${actor.system.skills.stealth.total}`).evaluate();
    const rows = [];
    for (const t of targets) {
      const per = await new Roll(`1d20 + ${t.system.skills?.perception?.total ?? 0}`).evaluate();
      const ok = roll.total > per.total;
      if (ok) await requestEffect(t, { name: `Ghost Assailant (${actor.name})`, img: ICON("flat-footed"), rounds: 0, statuses: ["flatFooted"] });
      rows.push(`<li class="${ok ? "hit" : "miss"}"><span class="tname">${t.name}</span><span class="tdef">Perception ${game.user.isGM ? per.total : "—"}</span><span class="tstatus">${ok ? L("SWSE.Success") : L("SWSE.Failure")}</span></li>`);
    }
    ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), rolls: [roll], content: `<div class="swse-card talent-card"><h3>Ghost Assailant (Stealth)</h3>${await roll.render()}<ul class="target-results">${rows.join("")}</ul></div>` });
  },
  "mobile-combatant": async actor => {
    const c = await choose("Mobile Combatant", { evasive: "Evasive Assault (+5 esquiva)", expeditious: "Expeditious Attack (mover ½)", yielding: "Yielding Assault (reação)" });
    if (c === "evasive") return actor.addEffect({ name: "Evasive Assault", img: ICON("defensive"), rounds: 1, modifiers: [mod("defenses.reflex", 5, "dodge")] });
    if (c === "expeditious") return chat(actor, `<h3>Expeditious Attack</h3><p>Após o ataque, move metade do deslocamento sem provocar ataques de oportunidade.</p>`);
    if (c === "yielding") return chat(actor, `<h3>Yielding Assault</h3><p>Move metade do deslocamento sem provocar; no próximo turno, circunstância favorável no primeiro ataque contra esse inimigo.</p>`);
  },
  // Soldier
  "defensive-position": async actor => {
    if (!actor.statuses?.has("cover") && !actor.statuses?.has("improvedCover")) return ui.notifications.warn(L("SWSE.Talent.NeedCover"));
    await actor.addEffect({ name: "Defensive Position", img: ICON("improved-cover"), rounds: 0, statuses: ["improvedCover"] });
  },
  "grizzled-warrior": async actor => {
    const c = await choose("Grizzled Warrior", { defy: "Defy the Odds (PV temporários)", pain: "Double the Pain (aliado +½ nível no dano)", guarded: "Guarded Assault (+2 esquiva)" });
    if (c === "defy") {
      const n = actor.system.abilities.con.total || actor.system.abilities.str.total;
      await actor.gainTempHP(n);
      return chat(actor, `<h3>Defy the Odds</h3><p>+${n} PV temporários.</p>`);
    }
    if (c === "pain") {
      const n = Math.floor((actor.system.level || 0) / 2);
      const names = await applyTo(targetsActors(), { name: `Double the Pain (+${n})`, img: ICON("buff"), rounds: 0, modifiers: [mod("damage.all", n)] });
      return chat(actor, `<h3>Double the Pain</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })}</p>`);
    }
    if (c === "guarded") return actor.addEffect({ name: "Guarded Assault", img: ICON("defensive"), rounds: 0, modifiers: [mod("defenses.reflex", 2, "dodge")] });
  },
  // Gunslinger
  /* ================= Scavenger's Guide to Droids ================= */
  "distracting-droid": async actor => {
    const hits = await skillVsDefense(actor, "persuasion", "will", "Distracting Droid");
    for (const t of hits ?? []) await requestEffect(t, { name: `Distracting Droid (${actor.name}): perde uma ação de movimento`, img: ICON("debuff"), rounds: 1 });
  },
  "erratic-target": async actor => {
    const n = Number(await choose("Erratic Target", { 1: "−1 quadrado: +1 esquiva", 2: "−2 quadrados: +2 esquiva" }));
    if (n) await actor.addEffect({ name: `Erratic Target (+${n})`, img: ICON("defensive"), rounds: 0, modifiers: [mod("defenses.reflex", n, "dodge"), mod("speed", -n)] });
  },
  "tool-frenzy": async actor => { await actor.addEffect({ name: "Tool Frenzy (−2 Reflexos)", img: ICON("debuff"), rounds: 1, modifiers: [mod("defenses.reflex", -2, "penalty")] }); chat(actor, "<h3>Tool Frenzy</h3><p>Faça o ataque desarmado com +2 (campo de bônus) usando o dado do maior apêndice.</p>"); },
  "target-acquisition": async actor => {
    const t = targetsActors()[0];
    if (!t) return ui.notifications.warn(L("SWSE.Talent.NeedTarget"));
    await actor.addEffect({ name: `Target Acquisition: ${t.name} (+1 ataque e dano contra ele)`, img: ICON("aiming"), rounds: ENCOUNTER() });
  },
  "weapons-power-surge": async actor => {
    const n = Number(await choose("Weapons Power Surge", { 1: "+1 dado (−1 passo)", 2: "+2 dados (−2 passos)" }));
    if (!n) return;
    await actor.shiftCondition(n);
    chat(actor, `<h3>Weapons Power Surge</h3><p>+${n} dado(s) no próximo dano com a arma montada (some no campo de dano extra, ex.: +${n}d8).</p>`);
  },
  "just-a-scratch": async actor => {
    const n = actor.system.defenses.fortitude.total;
    await actor.addEffect({ name: `Just a Scratch (RD ${n} contra um ataque)`, img: ICON("total-defense"), rounds: 0, modifiers: [mod("damageReduction", n)] });
  },

  /* ================= Jedi Academy Training Manual ================= */
  "adversary-lore": async actor => {
    const hits = await skillVsDefense(actor, "useTheForce", "will", "Adversary Lore");
    const kw = actor.hasFeature("know-weakness");
    for (const t of hits ?? []) await requestEffect(t, { name: `Adversary Lore (${actor.name})${kw ? " + Know Weakness (+1d6 de dano recebido)" : ""}`, img: ICON("debuff"), rounds: 1, modifiers: [mod("defenses.reflex", -2, "penalty")] });
  },
  "influence-savant": actor => recoverPower(actor, "mindAffecting", "Influence Savant"),
  "dark-side-savant": actor => recoverPower(actor, "darkSide", "Dark Side Savant"),
  "lightsaber-form-savant": actor => recoverPower(actor, "lightsaberForm", "Lightsaber Form Savant"),
  "telekinetic-vigilance": async actor => {
    const p = actor.items.find(i => i.type === "forcePower" && i.system.key === "intercept" && i.system.spent > 0);
    if (!p) return ui.notifications.info(L("SWSE.Talent.NothingToRecover"));
    await p.update({ "system.spent": p.system.spent - 1 });
    chat(actor, `<p>Telekinetic Vigilance: ${p.name}</p>`);
  },
  "manifest-guardian-spirit": async actor => {
    if (!(await needFP(actor))) return;
    await actor.addEffect({ name: "Guardian Spirit", img: ICON("buff"), rounds: ENCOUNTER(), modifiers: [mod("attack.all", 1, "morale"), mod("skills.useTheForce", 2, "morale"), mod("defenses.will", 2, "morale")] });
    chat(actor, `<h3>Manifest Guardian Spirit</h3><p>${L("SWSE.Talent.GuardianSpiritNote")}</p>`);
  },
  "vital-encouragement": async actor => {
    const n = 10 + Math.floor((actor.system.heroicLevel || 0) / 2);
    await actor.gainTempHP(n);
    chat(actor, `<h3>Vital Encouragement</h3><p>+${n} PV temporários.</p>`);
  },
  "dark-side-talisman": async actor => {
    const c = actor.hasFeature("greater-dark-side-talisman") ? "all" : await choose("Dark Side Talisman", DEFENSES());
    if (!c || !(await needFP(actor))) return;
    await actor.addEffect({ name: `Dark Side Talisman (+2 ${c === "all" ? "Defesas" : L(`SWSE.Defense.${c}`)} vs [light side])`, img: ICON("total-defense") });
  },
  "channel-vitality": async actor => {
    await actor.shiftCondition(1);
    chat(actor, `<h3>Channel Vitality</h3><p>${L("SWSE.Talent.ChannelVitalityNote")}</p>`);
  },
  "jedi-quarry": async actor => {
    const t = targetsActors()[0];
    if (!t) return ui.notifications.warn(L("SWSE.Talent.NeedTarget"));
    await actor.addEffect({ name: `Jedi Quarry: ${t.name} (+2 de deslocamento ao se aproximar)`, img: ICON("aiming"), rounds: ENCOUNTER() });
  },
  "rapid-alchemy": async actor => { await actor.addEffect({ name: "Rapid Alchemy (+2 corpo a corpo)", img: ICON("buff"), rounds: ENCOUNTER(), modifiers: [mod("attack.melee", 2, "equipment")] }); },
  "ride-the-current": async actor => {
    if (!(await needFP(actor))) return;
    await actor.addEffect({ name: "Ride the Current", img: ICON("total-concealment"), rounds: 1, statuses: ["totalConcealment"] });
    if ((actor.system.secondWind.used || 0) === 0) await actor.secondWind();
  },
  "soft-to-solid": async actor => { if (await needFP(actor)) await actor.addEffect({ name: "Soft to Solid (RD 10)", img: ICON("total-defense"), rounds: 1, modifiers: [mod("damageReduction", 10)] }); },
  "wan-shen-defense": async actor => {
    const n = Math.min(3, actor.countFeature("wan-shen-defense"));
    await actor.addEffect({ name: `Wan-Shen Defense (+${n} contra corpo a corpo)`, img: ICON("defensive"), rounds: 0, modifiers: [mod("defenses.reflex", n, "deflection")] });
  },
  "wind-vortex": async actor => {
    if (!(await needFP(actor))) return;
    await actor.addEffect({ name: "Wind Vortex (+2 Reflexos vs arremessos)", img: ICON("concealment"), rounds: ENCOUNTER(), statuses: ["concealment"] });
  },
  "unswerving-resolve": async actor => chat(actor, `<h3>Unswerving Resolve</h3><p>${L("SWSE.Talent.UnswervingResolveNote")}</p>`),

  /* ================= Galaxy of Intrigue ================= */
  "advanced-planning": async actor => {
    const ally = targetsActors()[0];
    const c = game.combat;
    const me = c?.combatants.find(x => x.actor?.id === actor.id);
    const them = ally && c?.combatants.find(x => x.actor?.id === ally.id);
    if (!me || !them || me.initiative === null || them.initiative === null) return ui.notifications.warn(L("SWSE.Talent.NeedInitiative"));
    const a = me.initiative, b = them.initiative;
    await c.updateEmbeddedDocuments("Combatant", [{ _id: me.id, initiative: b }, { _id: them.id, initiative: a }]);
    chat(actor, `<h3>Advanced Planning</h3><p>${actor.name} ⇄ ${ally.name}</p>`);
  },
  "blend-in": async actor => { await actor.addEffect({ name: "Blend In", img: ICON("total-concealment"), rounds: 0, statuses: ["totalConcealment"] }); },
  "master-manipulator": async actor => {
    const c = await choose("Master Manipulator", { recovery: "Demand Recovery (+5 passos, +2 moral)", control: "Exceptional Control (d20 reserva)", warning: "Word of Warning" });
    if (c === "recovery") {
      const allies = targetsActors();
      if (!allies.length) return ui.notifications.warn(L("SWSE.Talent.NeedTarget"));
      for (const a of allies) await shiftTarget(a, -5);
      const names = await applyTo(allies, { name: "Demand Recovery", img: ICON("buff"), rounds: 1, modifiers: [mod("attack.all", 2, "morale"), mod("skills.all", 2, "morale")] });
      return chat(actor, `<h3>Demand Recovery</h3><p>${F("SWSE.Talent.AppliedTo", { names })} (+5 ${L("SWSE.Talent.Steps")})</p>`);
    }
    if (c === "control") {
      const r = await new Roll("1d20").evaluate();
      return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), rolls: [r], content: `<div class="swse-card talent-card"><h3>Exceptional Control</h3>${await r.render()}<p>${L("SWSE.Talent.ExceptionalControlNote")}</p></div>` });
    }
    if (c === "warning") return chat(actor, `<h3>Word of Warning</h3><p>${L("SWSE.Talent.WordOfWarningNote")}</p>`);
  },
  "revolutionary-rhetoric": async actor => {
    const hits = await skillVsDefense(actor, "persuasion", "will", "Revolutionary Rhetoric");
    for (const t of hits ?? []) await requestEffect(t, { name: `Revolutionary Rhetoric (${actor.name}): só movimento e ações rápidas`, img: ICON("debuff"), rounds: 1 });
  },
  "for-the-cause": async actor => {
    const names = await applyTo([actor, ...targetsActors()], { name: "For the Cause", img: ICON("buff"), rounds: 1, modifiers: [mod("attack.all", 2), mod("damage.all", 2)] });
    chat(actor, `<h3>For the Cause</h3><p>${F("SWSE.Talent.AppliedTo", { names })}</p>`);
  },
  "sizing-up": async actor => {
    const hits = await skillVsDefense(actor, "perception", "will", "Sizing Up");
    if (hits?.length) await actor.addEffect({ name: `Sizing Up: +2 intuição contra ${hits.map(h => h.name).join(", ")}`, img: ICON("aiming"), rounds: ENCOUNTER() });
  },
  "dedicated-protector": async actor => {
    const names = await applyTo(targetsActors().slice(0, 1), { name: `Dedicated Protector (${actor.name}; adjacente)`, img: ICON("defensive"), rounds: ENCOUNTER(), modifiers: [mod("defenses.reflex", 1, "morale")] });
    chat(actor, `<h3>Dedicated Protector</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })}</p>`);
  },
  "dedicated-guardian": async actor => {
    const c = await choose("Dedicated Guardian", { blast: "Blast Shield (Evasion)", pain: "Take the Pain", team: "Team Effort (flanqueados)" });
    if (c === "blast") {
      const names = await applyTo(targetsActors().slice(0, 1), { name: `Blast Shield (${actor.name}): Evasion contra área`, img: ICON("defensive"), rounds: 1 });
      return chat(actor, `<h3>Blast Shield</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })}</p>`);
    }
    if (c === "pain") return chat(actor, `<h3>Take the Pain</h3><p>${L("SWSE.Talent.TakeThePainNote")}</p>`);
    if (c === "team") return chat(actor, `<h3>Team Effort</h3><p>${L("SWSE.Talent.TeamEffortNote")}</p>`);
  },
  "pistol-duelist": async actor => {
    const c = await choose("Pistol Duelist", { endGame: "End Game (Limiar ÷2)", snap: "Snap Aiming (mirar)", steady: "Stand Steady (+4 Reflexos)" });
    if (!c) return;
    if (c === "steady") await actor.addEffect({ name: "Stand Steady", img: ICON("defensive"), rounds: 1, modifiers: [mod("defenses.reflex", 4)] });
    if (c === "snap" && !actor.statuses?.has("aiming")) await actor.toggleStatusEffect("aiming", { active: true });
    const pistols = actor.items.filter(i => i.type === "weapon" && i.system.group === "pistols");
    const w = pistols.find(i => i.system.equipped) ?? pistols[0];
    if (!w) return ui.notifications.warn(L("SWSE.Warn.NoWeapons"));
    if (c === "endGame") chat(actor, `<h3>End Game</h3><p>${L("SWSE.Talent.EndGameNote")}</p>`);
    const { attackWithWeapon } = await import("../rolls/attack.mjs");
    return attackWithWeapon(actor, w);
  },
  "brilliant-defense": async actor => {
    const n = Math.max(0, actor.system.abilities.int.mod);
    await actor.addEffect({ name: `Brilliant Defense (+${n})`, img: ICON("defensive"), rounds: 0, modifiers: [mod("defenses.reflex", n)] });
  },
  "indomitable-personality": async actor => {
    const n = Math.max(0, actor.system.abilities.cha.mod);
    await actor.addEffect({ name: `Indomitable Personality (+${n})`, img: ICON("defensive"), rounds: 1, modifiers: [mod("defenses.will", n)] });
  },
  "channel-rage": async actor => { await actor.addEffect({ name: "Channel Rage (+5 Vontade)", img: ICON("rage"), rounds: ENCOUNTER(), modifiers: [mod("defenses.will", 5)] }); },
  "opportunistic-trickery": actor => trickery(actor, 2, 1),
  "improved-opportunistic-trickery": actor => trickery(actor, 5, 1),

  "keep-them-honest": async actor => {
    const names = await applyTo(targetsActors(), { name: `Keep Them Honest (${actor.name})`, img: ICON("debuff"), rounds: 1, modifiers: [mod("attack.all", -5, "penalty")] });
    chat(actor, `<h3>Keep Them Honest</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })}</p>`);
  }
};

/** Savants (Jedi Academy): devolve ao conjunto um poder gasto com o descritor. */
async function recoverPower(actor, descriptor, name) {
  const spent = actor.items.filter(i => i.type === "forcePower" && i.system.spent > 0 && i.system.descriptors.includes(descriptor));
  if (!spent.length) return ui.notifications.info(L("SWSE.Talent.NothingToRecover"));
  const id = spent.length === 1 ? spent[0].id : await choose(name, Object.fromEntries(spent.map(p => [p.id, p.name])));
  const p = actor.items.get(id);
  if (!p) return;
  await p.update({ "system.spent": p.system.spent - 1 });
  chat(actor, `<p>${name}: ${p.name}</p>`);
}

/** Opportunistic Trickery: abre mão do ataque de oportunidade para reduzir a Reflexos do alvo. */
async function trickery(actor, n, rounds) {
  const names = await applyTo(targetsActors(), { name: `Opportunistic Trickery (−${n} Reflexos)`, img: ICON("debuff"), rounds, modifiers: [mod("defenses.reflex", -n, "penalty")] });
  chat(actor, `<h3>Opportunistic Trickery</h3><p>${F("SWSE.Talent.AppliedTo", { names: names || "—" })}</p>`);
}

/** Squad Leader: efeito no líder e nos aliados marcados até o fim do próximo turno do líder. */
async function squad(actor, name, modifiers) {
  const names = await applyTo([actor, ...targetsActors()], { name, img: ICON("buff"), rounds: 1, modifiers });
  chat(actor, `<h3>${name}</h3><p>${F("SWSE.Talent.AppliedTo", { names })}</p>`);
}

/**
 * Block / Deflect: Use the Force contra o resultado do ataque, com −5 cumulativo por uso desde o último turno
 * (−2 com Shii-Cho). Soresu: rerrola uma falha.
 */
async function negate(actor, name) {
  if (!actor.items.some(i => i.type === "weapon" && i.system.equipped && (i.system.group === "lightsabers" || (name === "Block" && String(i.system.special).includes("lightsaberBlock"))))) return ui.notifications.warn(L("SWSE.Talent.NeedSaber"));
  const counter = actor.effects.find(e => e.getFlag(SYSTEM_ID, "negateCount") !== undefined);
  const uses = counter?.getFlag(SYSTEM_ID, "negateCount") ?? 0;
  const sabers = actor.items.filter(i => i.type === "weapon" && i.system.equipped && (i.system.group === "lightsabers" || String(i.system.special).includes("lightsaberBlock")));
  const specials = sabers.map(i => String(i.system.special));
  const isBlock = name === "Block";
  const crossguard = isBlock && specials.some(s => s.includes("crossguard"));
  const step = actor.hasFeature("shii-cho") || crossguard ? 2 : 5;
  let gear = 0;
  if (specials.some(s => s.includes(isBlock ? "block+2" : "deflect+2"))) gear += 2;
  if (specials.some(s => s.includes(isBlock ? "block-2" : "deflect-2"))) gear -= 2;
  if (actor.hasFeature("lightsaber-specialist")) gear += 2;
  const res = await foundry.applications.api.DialogV2.wait({
    window: { title: name },
    content: `<div class="swse-dialog"><div class="form-group"><label>${L("SWSE.Talent.AttackToNegate")}</label><input type="number" name="atk" value="" autofocus></div>
      <p class="hint">${F("SWSE.Talent.NegatePenalty", { n: uses * step, uses })}</p></div>`,
    buttons: [{ action: "ok", label: name, default: true, callback: (e, b) => Number(b.form.elements.atk.value) || 0 }],
    rejectClose: false
  });
  if (res === null || res === undefined) return;
  const bonus = actor.system.skills.useTheForce.total - uses * step + gear;
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
