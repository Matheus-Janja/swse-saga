import { SYSTEM_ID } from "../config.mjs";

const signed = n => (n >= 0 ? `+${n}` : `${n}`);

/**
 * Pergunta opções de um teste (bônus situacional, gastar Ponto da Força, take 10/20).
 * @returns {Promise<object|null>}
 */
export async function checkDialog(actor, { label, allowTake = true } = {}) {
  const fp = actor.system.forcePoints?.value ?? 0;
  const content = `
    <div class="swse-dialog">
      <div class="form-group"><label>${game.i18n.localize("SWSE.SituationalBonus")}</label>
        <input type="text" name="bonus" value="" placeholder="+2"></div>
      <div class="form-group"><label>${game.i18n.localize("SWSE.SpendForcePoint")} (${fp})</label>
        <input type="checkbox" name="forcePoint" ${fp ? "" : "disabled"}></div>
      ${allowTake ? `<div class="form-group"><label>${game.i18n.localize("SWSE.RollMode")}</label>
        <select name="take"><option value="">d20</option><option value="10">${game.i18n.localize("SWSE.Take10")}</option><option value="20">${game.i18n.localize("SWSE.Take20")}</option></select></div>` : ""}
    </div>`;
  return foundry.applications.api.DialogV2.wait({
    window: { title: label },
    content,
    buttons: [{
      action: "roll", label: game.i18n.localize("SWSE.Roll"), default: true,
      callback: (event, button) => new foundry.applications.ux.FormDataExtended(button.form).object
    }],
    rejectClose: false
  });
}

/**
 * Faz um teste d20 + bônus e envia ao chat.
 * @param {Actor} actor
 * @param {object} o
 * @param {number} o.bonus
 * @param {string} o.label
 * @param {string} [o.skill]     chave da perícia (para rerrolagens)
 * @param {object[]} [o.rerolls]
 * @param {boolean} [o.dialog]   abre diálogo de opções
 * @param {number} [o.dc]
 * @param {string} [o.extraHtml]
 */
export async function rollCheck(actor, o = {}) {
  let opts = { bonus: "", forcePoint: false, take: "" };
  if (o.dialog) {
    const res = await checkDialog(actor, { label: o.label });
    if (!res) return null;
    opts = { ...opts, ...res };
  }
  let base = "1d20";
  if (opts.take) base = String(opts.take);
  const terms = [base, signed(o.bonus ?? 0)];
  if (opts.bonus) terms.push(String(opts.bonus).startsWith("+") || String(opts.bonus).startsWith("-") ? opts.bonus : `+${opts.bonus}`);
  if (opts.forcePoint) {
    if (await actor.spendForcePoint()) terms.push(`+${actor.forcePointFormula}`);
  }
  const roll = await new Roll(terms.join(" ")).evaluate();
  const d20 = roll.dice[0]?.faces === 20 ? roll.dice[0].total : null;
  const rerollBtns = (o.rerolls ?? []).map(r => `<button type="button" data-swse-action="reroll" data-skill="${o.skill}" data-keep="${r.keep}" data-bonus="${roll.total - (d20 ?? 0)}" data-first="${roll.total}">
      ${game.i18n.localize("SWSE.Reroll")} (${r.label || r.source}${r.keep === "best" ? ", " + game.i18n.localize("SWSE.KeepBest") : ""})</button>`).join("");
  const dcLine = o.dc ? `<p class="dc ${roll.total >= o.dc ? "success" : "failure"}">CD ${o.dc}: ${roll.total >= o.dc ? game.i18n.localize("SWSE.Success") : game.i18n.localize("SWSE.Failure")}</p>` : "";
  const nat = d20 === 20 ? `<p class="crit">${game.i18n.localize("SWSE.Natural20")}</p>` : d20 === 1 ? `<p class="fumble">${game.i18n.localize("SWSE.Natural1")}</p>` : "";
  const content = `<div class="swse-card check-card"><h3>${o.label}</h3>${await roll.render()}${nat}${dcLine}${o.extraHtml ?? ""}${rerollBtns ? `<div class="card-buttons">${rerollBtns}</div>` : ""}</div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content,
    rolls: [roll],
    flags: { [SYSTEM_ID]: { type: "check", skill: o.skill, actorUuid: actor.uuid } }
  });
  return roll;
}

/** Rerrolagem a partir de um cartão de chat. */
export async function rerollFromCard(message, button) {
  const actor = await fromUuid(message.getFlag(SYSTEM_ID, "actorUuid"));
  if (!actor?.isOwner) return ui.notifications.warn(game.i18n.localize("SWSE.Warn.NotOwner"));
  const bonus = Number(button.dataset.bonus) || 0;
  const first = Number(button.dataset.first) || 0;
  const keep = button.dataset.keep;
  const roll = await new Roll(`1d20 + ${bonus}`).evaluate();
  const kept = keep === "best" ? Math.max(first, roll.total) : roll.total;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: [roll],
    content: `<div class="swse-card check-card"><h3>${game.i18n.localize("SWSE.Reroll")}</h3>${await roll.render()}
      <p>${game.i18n.format("SWSE.RerollResult", { first, second: roll.total, kept })}</p></div>`
  });
}
