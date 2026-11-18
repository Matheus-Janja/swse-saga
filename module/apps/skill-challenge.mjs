/**
 * Rastreador de desafios de perícia (Galaxy of Intrigue, Cap. 2).
 * O Mestre monta o desafio (ND, complexidade, efeitos, perícias sugeridas) e registra os testes:
 * rolando pelo token selecionado, digitando um resultado ou pelo botão "Desafio" nos cartões de teste.
 */
import { SWSE, SYSTEM_ID } from "../config.mjs";
import { DC_CATEGORIES, dcFor, dcRow, COMPLEXITY, newChallenge, resolveCheck, evaluateOutcome, presetState, PRESETS } from "../rules/skill-challenge.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const L = k => game.i18n.localize(k);
const F = (k, d) => game.i18n.format(k, d);
const SETTING = "skillChallenge";
const EFFECTS = ["antagonist", "catastrophic", "changingObjectives", "closeCall", "containment", "degenerating", "degreesFailure", "degreesSuccess",
  "extremeSuccess", "individualEffort", "initiative", "opposedDC", "recovery", "restricted", "secondEffort", "timed"];

export const getChallenge = () => game.settings.get(SYSTEM_ID, SETTING) ?? {};
async function saveChallenge(state) {
  if (!game.user.isGM) return ui.notifications.warn(L("SWSE.Challenge.GMOnly"));
  state.outcome = evaluateOutcome(state);
  await game.settings.set(SYSTEM_ID, SETTING, state);
}
const skillLabel = k => L(SWSE.skills[k]?.label ?? k);

export function registerSkillChallenge() {
  game.settings.register(SYSTEM_ID, SETTING, {
    scope: "world", config: false, type: Object, default: { active: false },
    onChange: () => { for (const app of foundry.applications.instances.values()) if (app instanceof SkillChallengeApp) app.render(); }
  });
}

export class SkillChallengeApp extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "swse-skill-challenge",
    classes: ["swse", "skill-challenge"],
    tag: "form",
    window: { title: "SWSE.Challenge.Title", icon: "fa-solid fa-list-check", resizable: true },
    position: { width: 620, height: 720 },
    form: { handler: SkillChallengeApp.#onForm, submitOnChange: true, closeOnSubmit: false },
    actions: {
      newChallenge: SkillChallengeApp.#onNew,
      loadPreset: SkillChallengeApp.#onPreset,
      end: SkillChallengeApp.#onEnd,
      bump: SkillChallengeApp.#onBump,
      addSkill: SkillChallengeApp.#onAddSkill,
      removeSkill: SkillChallengeApp.#onRemoveSkill,
      rollSelected: SkillChallengeApp.#onRollSelected,
      applyManual: SkillChallengeApp.#onApplyManual,
      round: SkillChallengeApp.#onRound,
      toChat: SkillChallengeApp.#onChat
    }
  };

  static PARTS = { body: { template: `systems/${SYSTEM_ID}/templates/apps/skill-challenge.hbs`, scrollable: [""] } };

  async _prepareContext() {
    const s = getChallenge();
    const gm = game.user.isGM;
    const row = s.active ? dcRow(s.cl) : null;
    const showDC = gm || s.reveal;
    return {
      s, gm, showDC,
      active: !!s.active,
      dcTable: row ? DC_CATEGORIES.map((c, i) => ({ cat: c, label: L(`SWSE.Challenge.DC.${c}`), dc: row[i + 1] })) : [],
      categories: Object.fromEntries([...DC_CATEGORIES.map(c => [c, L(`SWSE.Challenge.DC.${c}`)]), ["opposed", L("SWSE.Challenge.DC.opposed")]]),
      skillOptions: Object.fromEntries(Object.entries(SWSE.skills).map(([k, v]) => [k, L(v.label)])),
      skills: (s.skills ?? []).map((r, i) => ({ ...r, i, label: skillLabel(r.skill), isNumber: /^\d+$/.test(String(r.dc)), dcValue: dcFor(s, r.dc) })),
      effects: EFFECTS.map(k => ({ k, label: L(`SWSE.Challenge.Effect.${k}`), hint: L(`SWSE.Challenge.EffectHint.${k}`), on: !!s.effects?.[k] })),
      activeEffects: EFFECTS.filter(k => s.effects?.[k]).map(k => L(`SWSE.Challenge.Effect.${k}`)).join(", "),
      presets: Object.fromEntries(Object.entries(PRESETS).map(([k, p]) => [k, `${p.name} (ND ${p.cl})`])),
      complexities: { 1: "1 (5)", 2: "2 (8)", 3: "3 (11)", 0: L("SWSE.Challenge.Custom") },
      successPips: Array.from({ length: s.successesNeeded || 0 }, (_, i) => i < (s.successes || 0)),
      failurePips: Array.from({ length: s.maxFailures || 0 }, (_, i) => i < (s.failures || 0)),
      outcomeLabel: s.outcome ? L(`SWSE.Challenge.Outcome.${s.outcome}`) : "",
      xp: s.active ? F("SWSE.Challenge.XP", { n: s.complexity || 1, cl: s.cl }) : ""
    };
  }

  static async #onForm(event, form, formData) {
    if (!game.user.isGM) return;
    const d = foundry.utils.expandObject(formData.object);
    const s = getChallenge();
    if (!s.active) return;
    s.name = d.name ?? s.name;
    s.cl = Number(d.cl) || 1;
    s.complexity = Number(d.complexity) || 0;
    s.successesNeeded = s.complexity ? COMPLEXITY[s.complexity] : Math.max(1, Number(d.successesNeeded) || s.successesNeeded);
    s.maxFailures = Math.max(1, Number(d.maxFailures) || 3);
    s.timedRounds = Number(d.timedRounds) || 0;
    s.reveal = !!d.reveal;
    s.notes = d.notes ?? s.notes;
    s.success = d.success ?? s.success;
    s.failure = d.failure ?? s.failure;
    s.effects = Object.fromEntries(EFFECTS.map(k => [k, !!d.effects?.[k]]));
    s.skills = (s.skills ?? []).map((r, i) => {
      const x = d.skills?.[i] ?? {};
      let dc = x.dc ?? r.dc;
      if (dc === "number") dc = Number(x.dcNumber) || 15;
      else if (/^\d+$/.test(String(dc))) dc = Number(dc);
      return { skill: x.skill ?? r.skill, dc };
    });
    await saveChallenge(s);
  }

  static async #onNew() { await saveChallenge(newChallenge()); }
  static async #onPreset(event, target) {
    const key = this.element.querySelector("[name=preset]")?.value;
    if (key) await saveChallenge(presetState(key));
  }
  static async #onEnd() {
    const s = getChallenge();
    await SkillChallengeApp.#postSummary(s);
    await game.settings.set(SYSTEM_ID, SETTING, { active: false });
  }
  static async #onBump(event, target) {
    const s = getChallenge();
    const k = target.dataset.field;
    s[k] = Math.max(0, (s[k] || 0) + Number(target.dataset.delta));
    s.log = [{ actor: "Mestre", skill: "—", result: Number(target.dataset.delta) > 0 ? (k === "successes" ? "success" : "failure") : "adjust", notes: [L("SWSE.Challenge.Manual")] }, ...(s.log ?? [])].slice(0, 40);
    await saveChallenge(s);
    if (s.outcome) SkillChallengeApp.#postSummary(getChallenge());
  }
  static async #onAddSkill() {
    const s = getChallenge();
    s.skills = [...(s.skills ?? []), { skill: "perception", dc: "medium" }];
    await saveChallenge(s);
  }
  static async #onRemoveSkill(event, target) {
    const s = getChallenge();
    s.skills.splice(Number(target.dataset.index), 1);
    await saveChallenge(s);
  }
  static async #onRound(event, target) {
    const s = getChallenge();
    s.rounds = Math.max(0, (s.rounds || 0) + Number(target.dataset.delta || 1));
    await saveChallenge(s);
  }

  /** Rola a perícia escolhida para cada token selecionado e aplica ao desafio. */
  static async #onRollSelected() {
    const idx = Number(this.element.querySelector("[name=rollRow]")?.value);
    const s = getChallenge();
    const row = s.skills?.[idx];
    if (!row) return ui.notifications.warn(L("SWSE.Challenge.PickSkill"));
    const actors = (canvas.tokens?.controlled ?? []).map(t => t.actor).filter(Boolean);
    if (!actors.length) return ui.notifications.warn(L("SWSE.Warn.SelectTokens"));
    for (const a of actors) {
      const roll = await a.rollSkill(row.skill, { dialog: true });
      if (roll) await applyResult(a, row.skill, roll.total, { row });
    }
  }
  static async #onApplyManual() {
    const idx = Number(this.element.querySelector("[name=rollRow]")?.value);
    const total = Number(this.element.querySelector("[name=manualTotal]")?.value);
    const s = getChallenge();
    const row = s.skills?.[idx];
    if (!row || !Number.isFinite(total)) return ui.notifications.warn(L("SWSE.Challenge.PickSkill"));
    const actor = canvas.tokens?.controlled?.[0]?.actor ?? null;
    await applyResult(actor, row.skill, total, { row });
  }
  static async #onChat() { await SkillChallengeApp.#postSummary(getChallenge(), true); }

  static async #postSummary(s, partial = false) {
    if (!s?.active) return;
    const outcome = s.outcome ? L(`SWSE.Challenge.Outcome.${s.outcome}`) : L("SWSE.Challenge.InProgress");
    const text = s.outcome === "success" ? s.success : s.outcome === "failure" ? s.failure : "";
    await ChatMessage.create({
      content: `<div class="swse-card challenge-card"><h3>${L("SWSE.Challenge.Title")}: ${s.name}</h3>
        <p>ND ${s.cl} · ${L("SWSE.Challenge.Successes")} ${s.successes}/${s.successesNeeded} · ${L("SWSE.Challenge.Failures")} ${s.failures}/${s.maxFailures}</p>
        <p class="${s.outcome === "failure" ? "failure" : s.outcome === "success" ? "success" : ""}"><strong>${outcome}</strong>${text ? ` — ${text}` : ""}</p>
        ${!partial ? `<p class="hint">${F("SWSE.Challenge.XP", { n: s.complexity || 1, cl: s.cl })}</p>` : ""}</div>`
    });
  }
}

/** Aplica um resultado de teste ao desafio ativo (só o Mestre). */
export async function applyResult(actor, skill, total, { row = null, fp = false } = {}) {
  if (!game.user.isGM) return ui.notifications.warn(L("SWSE.Challenge.GMOnly"));
  const s = getChallenge();
  if (!s.active) return ui.notifications.warn(L("SWSE.Challenge.None"));
  if (s.outcome) return ui.notifications.info(L("SWSE.Challenge.Over"));
  row ??= s.skills?.find(r => r.skill === skill);
  let dc = row ? dcFor(s, row.dc) : null;
  if (dc === null) {
    // CD resistida ou perícia improvisada: pergunta ao Mestre
    const opts = DC_CATEGORIES.map(c => `<option value="${dcFor(s, c)}">${L(`SWSE.Challenge.DC.${c}`)} (${dcFor(s, c)})</option>`).join("");
    dc = await foundry.applications.api.DialogV2.wait({
      window: { title: `${L("SWSE.Challenge.Title")}: ${skillLabel(skill)} (${total})` },
      content: `<div class="swse-dialog"><p class="hint">${L("SWSE.Challenge.AskDC")}</p>
        <div class="form-group"><select name="cat">${opts}</select></div>
        <div class="form-group"><label>${L("SWSE.Challenge.OrNumber")}</label><input type="number" name="num" value=""></div></div>`,
      buttons: [{ action: "ok", label: "OK", default: true, callback: (e, b) => Number(b.form.elements.num.value) || Number(b.form.elements.cat.value) }],
      rejectClose: false
    });
    if (!dc) return;
  }
  const features = new Set(actor?.items?.filter(i => ["feat", "talent"].includes(i.type)).map(i => i.system.key) ?? []);
  const margin = total - dc;
  const choices = {};
  if (s.effects?.recovery && margin >= 5 && s.failures > 0) {
    choices.recovery = await foundry.applications.api.DialogV2.confirm({ window: { title: L("SWSE.Challenge.Effect.recovery") }, content: `<p>${L("SWSE.Challenge.RecoveryAsk")}</p>` });
  }
  if (s.effects?.secondEffort && margin < 0 && !(s.effects?.closeCall && margin > -5)) {
    choices.secondEffort = await foundry.applications.api.DialogV2.confirm({ window: { title: L("SWSE.Challenge.Effect.secondEffort") }, content: `<p>${L("SWSE.Challenge.SecondEffortAsk")}</p>` });
  }
  const { state, entry, refundFP } = resolveCheck(s, { total, dc, actorId: actor?.id ?? "?", actorName: actor?.name ?? "—", skill, skillLabel: skillLabel(skill), features, fp }, choices);
  await saveChallenge(state);
  if (refundFP && actor) await actor.update({ "system.forcePoints.value": actor.system.forcePoints.value + 1 });
  if (choices.secondEffort) ui.notifications.info(L("SWSE.Challenge.SecondEffortNote"));
  const res = entry.result === "success" ? L("SWSE.Success") : L("SWSE.Failure");
  await ChatMessage.create({
    speaker: actor ? ChatMessage.getSpeaker({ actor }) : undefined,
    content: `<div class="swse-card challenge-card"><h3>${state.name}</h3>
      <p>${entry.skill}: ${entry.total} ${state.reveal ? `vs CD ${dc}` : ""} → <strong class="${entry.result}">${res}</strong>${entry.notes.length ? ` (${entry.notes.join(", ")})` : ""}</p>
      <p>${L("SWSE.Challenge.Successes")} ${state.successes}/${state.successesNeeded} · ${L("SWSE.Challenge.Failures")} ${state.failures}/${state.maxFailures}</p>
      ${state.outcome ? `<p class="${state.outcome}"><strong>${L(`SWSE.Challenge.Outcome.${state.outcome}`)}</strong> — ${state.outcome === "success" ? state.success : state.failure}</p>` : ""}</div>`
  });
}

/** Botão "Desafio" nos cartões de teste de perícia. */
export async function applyCheckToChallenge(message) {
  const f = message.flags?.[SYSTEM_ID] ?? {};
  if (!f.skill || f.total === undefined) return;
  if (message.getFlag(SYSTEM_ID, "challengeApplied")) return ui.notifications.warn(L("SWSE.Challenge.AlreadyApplied"));
  const actor = f.actorUuid ? await fromUuid(f.actorUuid) : null;
  await applyResult(actor, f.skill, f.total, { fp: !!f.fp });
  if (game.user.isGM) await message.setFlag(SYSTEM_ID, "challengeApplied", true);
}

export function openSkillChallenge() {
  const app = foundry.applications.instances.get("swse-skill-challenge") ?? new SkillChallengeApp();
  return app.render({ force: true });
}
