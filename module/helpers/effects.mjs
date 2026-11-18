/**
 * Integração dos efeitos com o Foundry: status do HUD, expiração por rodada e editor de efeitos.
 */
import { SWSE, SYSTEM_ID } from "../config.mjs";
import { STATUSES, BUFF_PRESETS } from "../rules/effects.mjs";

const L = k => game.i18n.localize(k);
const isActiveGM = () => game.users.activeGM?.id === game.user.id;

/** Substitui os status do HUD pelos do Saga Edition (mantendo "dead" como status de morte). */
export function configureStatusEffects() {
  CONFIG.statusEffects = STATUSES.map(s => ({ id: s.id, name: s.name, img: s.img }));
  if (CONFIG.specialStatusEffects) {
    CONFIG.specialStatusEffects.DEFEATED = "dead";
  }
}

/** Texto de duração de um efeito. */
export function durationLabel(effect) {
  const exp = effect.flags?.[SYSTEM_ID]?.expiry;
  if (!exp) return L("SWSE.Effect.Permanent");
  return exp.rounds > 0 ? game.i18n.format("SWSE.Effect.Rounds", { n: exp.rounds }) : L("SWSE.Effect.UntilNextTurn");
}

/** O efeito expira no início do turno do ator neste momento do combate? */
export function isExpired(effect, combat) {
  const exp = effect.flags?.[SYSTEM_ID]?.expiry;
  if (!exp) return false;
  const sameCombat = exp.combat === combat.id;
  const R = sameCombat ? exp.round : 0;
  const createdTurn = sameCombat ? (exp.turn ?? -1) : -1;
  // N rodadas = até o início do turno do personagem depois de N rodadas (0 conta como 1: "até o próximo turno").
  // Se o efeito foi criado antes do turno do personagem na rodada, o "próximo turno" dele ainda é nessa rodada.
  const k = Math.max(Number(exp.rounds) || 0, 1);
  const end = R + k - (createdTurn < combat.turn ? 1 : 0);
  return combat.round >= end;
}

export function registerEffectHooks() {
  // Início do turno de um combatente: remove os efeitos dele que expiraram
  Hooks.on("updateCombat", async (combat, changed) => {
    if (!isActiveGM() || !combat.started) return;
    if (!("turn" in changed) && !("round" in changed)) return;
    const actor = combat.combatant?.actor;
    if (!actor) return;
    const expired = actor.effects.filter(e => isExpired(e, combat)).map(e => e.id);
    if (expired.length) await actor.deleteEmbeddedDocuments("ActiveEffect", expired);
  });

  // Começo do combate: todos começam surpresos até o primeiro turno (opcional)
  Hooks.on("combatStart", async combat => {
    if (!isActiveGM() || !game.settings.get(SYSTEM_ID, "autoFlatFooted")) return;
    for (const c of combat.combatants) {
      const a = c.actor;
      if (!a || a.type === "vehicle" || a.statuses?.has("flatFooted")) continue;
      await a.createEmbeddedDocuments("ActiveEffect", [{
        name: L("SWSE.Status.flatFooted"), img: STATUSES.find(s => s.id === "flatFooted").img, statuses: ["flatFooted"],
        flags: { [SYSTEM_ID]: { modifiers: [], expiry: { rounds: 0, combat: combat.id, round: 1, turn: -1 } } }
      }]);
    }
  });

  // Fim do combate: remove os efeitos temporários ligados a ele
  Hooks.on("deleteCombat", async combat => {
    if (!isActiveGM()) return;
    for (const c of combat.combatants) {
      const a = c.actor;
      if (!a) continue;
      const ids = a.effects.filter(e => e.flags?.[SYSTEM_ID]?.expiry?.combat === combat.id).map(e => e.id);
      if (ids.length) await a.deleteEmbeddedDocuments("ActiveEffect", ids);
    }
  });
}

/**
 * Diálogo de criação/edição de efeito (buff/penalidade) com modificadores e duração.
 * @param {Actor} actor
 * @param {ActiveEffect} [effect]  efeito existente para editar
 */
export async function effectDialog(actor, effect = null) {
  const cur = effect?.flags?.[SYSTEM_ID] ?? {};
  const mods = [...(cur.modifiers ?? [])];
  while (mods.length < Math.max(4, (cur.modifiers?.length ?? 0) + 2)) mods.push({ target: "", value: "", type: "untyped" });
  const targets = { "": "—", ...SWSE.modifierTargets };
  for (const [k, v] of Object.entries(SWSE.abilities)) targets[`abilities.${k}`] = v;
  for (const [k, v] of Object.entries(SWSE.skills)) targets[`skills.${k}`] = v.label;
  const opt = (obj, sel) => Object.entries(obj).map(([k, v]) => `<option value="${k}" ${k === sel ? "selected" : ""}>${L(v)}</option>`).join("");
  const presets = `<option value="">—</option>` + Object.entries(BUFF_PRESETS).map(([k, v]) => `<option value="${k}">${v.name}</option>`).join("");
  const rounds = cur.expiry ? cur.expiry.rounds : "";
  const statusOpts = STATUSES.map(s => `<label class="status-opt"><input type="checkbox" name="status.${s.id}" ${effect?.statuses?.has(s.id) ? "checked" : ""}> ${L(s.name)}</label>`).join("");
  const res = await foundry.applications.api.DialogV2.wait({
    window: { title: effect ? `${L("SWSE.Effect.Edit")}: ${effect.name}` : L("SWSE.Effect.New") },
    position: { width: 560 },
    content: `<div class="swse-dialog effect-dialog">
      ${effect ? "" : `<div class="form-group"><label>${L("SWSE.Effect.Preset")}</label><select name="preset">${presets}</select></div>`}
      <div class="form-group"><label>${L("SWSE.Name")}</label><input type="text" name="name" value="${effect?.name ?? ""}"></div>
      <div class="form-group"><label>${L("SWSE.Effect.Duration")}</label><input type="text" name="rounds" value="${rounds}" placeholder="${L("SWSE.Effect.DurationHint")}"></div>
      <p class="hint">${L("SWSE.Effect.ModsHint")}</p>
      <table class="mod-table">${mods.map((m, i) => `<tr>
        <td><select name="mods.${i}.target">${opt(targets, m.target)}</select></td>
        <td><input type="text" name="mods.${i}.value" value="${m.value ?? ""}" style="width:4em"></td>
        <td><select name="mods.${i}.type">${opt(SWSE.bonusTypes, m.type || "untyped")}</select></td></tr>`).join("")}</table>
      <details><summary>${L("SWSE.Effect.Statuses")}</summary><div class="status-grid">${statusOpts}</div></details>
    </div>`,
    buttons: [{ action: "save", label: L("SWSE.Effect.Save"), default: true, callback: (e, b) => new foundry.applications.ux.FormDataExtended(b.form).object }],
    rejectClose: false
  });
  if (!res) return;
  const data = foundry.utils.expandObject(res);
  let modifiers = Object.values(data.mods ?? {}).filter(m => m.target && m.value !== "" && m.value !== undefined)
    .map(m => ({ target: m.target, value: String(m.value), type: m.type || "untyped", label: "", disabled: false }));
  let name = data.name;
  let r = data.rounds === "" || data.rounds === undefined ? null : Number(data.rounds);
  const preset = data.preset ? BUFF_PRESETS[data.preset] : null;
  if (preset) {
    if (!modifiers.length) modifiers = preset.mods.map(m => ({ ...m }));
    if (!name) name = preset.name;
    if (r === null && preset.rounds !== undefined) r = preset.rounds;
  }
  const statuses = Object.entries(data.status ?? {}).filter(([, v]) => v).map(([k]) => k);
  name ||= L("SWSE.Effect.Unnamed");
  if (effect) {
    const flags = { modifiers };
    if (r === null) flags["-=expiry"] = null;
    else flags.expiry = { ...(cur.expiry ?? { combat: game.combat?.id ?? null, round: game.combat?.round ?? 0, turn: game.combat?.started ? game.combat.turn : -1 }), rounds: r };
    return effect.update({ name, statuses, [`flags.${SYSTEM_ID}`]: flags });
  }
  return actor.addEffect({ name, modifiers, statuses, rounds: r });
}

/** Cria um efeito no primeiro token selecionado e copia para os demais (buffs de grupo). */
export async function effectToSelected() {
  const tokens = canvas.tokens?.controlled.filter(t => t.actor) ?? [];
  if (!tokens.length) return ui.notifications.warn(L("SWSE.Warn.SelectTokens"));
  const created = await effectDialog(tokens[0].actor);
  const eff = Array.isArray(created) ? created[0] : null;
  if (!eff) return;
  const data = eff.toObject();
  delete data._id;
  for (const t of tokens.slice(1)) await t.actor.createEmbeddedDocuments("ActiveEffect", [data]);
}

/** Pergunta uma condição e a alterna em todos os tokens selecionados. */
export async function toggleStatusPrompt() {
  const tokens = canvas.tokens?.controlled.filter(t => t.actor) ?? [];
  if (!tokens.length) return ui.notifications.warn(L("SWSE.Warn.SelectTokens"));
  const opts = STATUSES.map(s => `<option value="${s.id}">${L(s.name)}</option>`).join("");
  const id = await foundry.applications.api.DialogV2.wait({
    window: { title: L("SWSE.Effect.Conditions") },
    content: `<div class="swse-dialog"><div class="form-group"><select name="s">${opts}</select></div></div>`,
    buttons: [{ action: "ok", label: "OK", default: true, callback: (e, b) => b.form.elements.s.value }],
    rejectClose: false
  });
  if (id) for (const t of tokens) await t.actor.toggleStatusEffect(id);
}
