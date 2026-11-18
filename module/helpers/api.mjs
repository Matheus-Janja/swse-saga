/**
 * Funções expostas em game.swse para macros.
 */
import { SWSE } from "../config.mjs";
import { attackWithWeapon } from "../rolls/attack.mjs";
import { useForcePower } from "../rolls/force.mjs";
import { requestDamage } from "../rolls/damage.mjs";

const L = k => game.i18n.localize(k);

async function choose(title, options) {
  if (!options.length) return null;
  const select = `<select name="choice">${options.map(o => `<option value="${o.value}">${o.label}</option>`).join("")}</select>`;
  const res = await foundry.applications.api.DialogV2.wait({
    window: { title },
    content: `<div class="swse-dialog"><div class="form-group">${select}</div></div>`,
    buttons: [{ action: "ok", label: "OK", default: true, callback: (e, b) => b.form.elements.choice.value }],
    rejectClose: false
  });
  return res ?? null;
}

/** Escolhe uma arma do ator (equipadas primeiro) e ataca. */
export async function attackPrompt(actor) {
  const weapons = actor.items.filter(i => i.type === "weapon").sort((a, b) => (b.system.equipped - a.system.equipped) || a.name.localeCompare(b.name));
  if (!weapons.length) return ui.notifications.warn(L("SWSE.Warn.NoWeapons"));
  const id = weapons.length === 1 ? weapons[0].id : await choose(L("SWSE.Attack.Choose"), weapons.map(w => ({ value: w.id, label: `${w.name}${w.system.equipped ? " ★" : ""}` })));
  if (!id) return;
  return attackWithWeapon(actor, actor.items.get(id));
}

export async function skillPrompt(actor) {
  const key = await choose(L("SWSE.SkillCheck"), Object.entries(SWSE.skills).map(([k, s]) => ({ value: k, label: `${L(s.label)} (${actor.system.skills[k].total >= 0 ? "+" : ""}${actor.system.skills[k].total})` })));
  if (key) return actor.rollSkill(key, { dialog: true });
}

export async function forcePrompt(actor) {
  const powers = actor.items.filter(i => i.type === "forcePower");
  if (!powers.length) return ui.notifications.warn(L("SWSE.Warn.NoPowers"));
  const id = await choose(L("SWSE.Force.Use"), powers.map(p => ({ value: p.id, label: `${p.name} (${p.system.uses - p.system.spent}/${p.system.uses})` })));
  if (id) return useForcePower(actor, actor.items.get(id));
}

export async function damagePrompt() {
  const tokens = canvas.tokens?.controlled ?? [];
  if (!tokens.length) return ui.notifications.warn(L("SWSE.Warn.SelectTokens"));
  const res = await foundry.applications.api.DialogV2.wait({
    window: { title: L("SWSE.ApplyDamage") },
    content: `<div class="swse-dialog">
      <div class="form-group"><label>${L("SWSE.Damage")}</label><input type="number" name="amount" value="0" min="0" autofocus></div>
      <div class="form-group"><label>${L("SWSE.DamageKind.label")}</label><select name="type">
        <option value="normal">${L("SWSE.DamageKind.normal")}</option><option value="stun">${L("SWSE.DamageKind.stun")}</option><option value="ion">${L("SWSE.DamageKind.ion")}</option></select></div>
      <div class="form-group"><label>${L("SWSE.IgnoreDR")}</label><input type="checkbox" name="ignoreDR"></div>
      <div class="form-group"><label>${L("SWSE.Healing")}</label><input type="checkbox" name="heal"></div>
    </div>`,
    buttons: [{ action: "ok", label: L("SWSE.Apply"), default: true, callback: (e, b) => new foundry.applications.ux.FormDataExtended(b.form).object }],
    rejectClose: false
  });
  if (!res) return;
  for (const t of tokens) {
    if (!t.actor) continue;
    if (res.heal) await t.actor.applyHealing(res.amount);
    else await requestDamage(t.actor, res.amount, { type: res.type, ignoreDR: res.ignoreDR });
  }
}

/** Usado pelas macros criadas ao arrastar itens para a barra. */
export async function useItemMacro(name, uuid) {
  const speaker = ChatMessage.getSpeaker();
  let actor = speaker.token ? game.actors.tokens[speaker.token] : null;
  actor ??= game.actors.get(speaker.actor);
  let item = actor?.items.find(i => i.name === name);
  if (!item) item = await fromUuid(uuid);
  if (!item) return ui.notifications.warn(game.i18n.format("SWSE.Warn.ItemNotFound", { name }));
  return item.use();
}
