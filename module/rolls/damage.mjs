import { SYSTEM_ID } from "../config.mjs";
import { rerollFromCard } from "./checks.mjs";

const SOCKET = `system.${SYSTEM_ID}`;

/** Aplica dano a um ator, delegando ao Mestre via socket quando o usuário não é dono. */
export async function requestDamage(actor, amount, opts) {
  if (actor.isOwner) return actor.applyDamage(amount, opts);
  const gm = game.users.activeGM;
  if (!gm) return ui.notifications.warn(game.i18n.localize("SWSE.Warn.NoGM"));
  game.socket.emit(SOCKET, { action: "applyDamage", uuid: actor.uuid, amount, opts, gm: gm.id });
}

export function registerSocket() {
  game.socket.on(SOCKET, async data => {
    if (data.action !== "applyDamage" || game.user.id !== data.gm) return;
    const actor = await fromUuid(data.uuid);
    if (actor) actor.applyDamage(data.amount, data.opts);
  });
}

function damageOpts(payload, crit = false) {
  return {
    type: payload.type,
    ignoreDR: payload.ignoreDR,
    thresholdReduction: payload.thresholdReduction,
    drReduction: payload.drReduction,
    extraSteps: payload.extraSteps,
    crit
  };
}

/** Liga os botões dos cartões de chat do sistema. Hook: renderChatMessageHTML. */
export function onRenderChatMessage(message, html) {
  const root = html instanceof HTMLElement ? html : html[0];
  if (!root) return;
  root.querySelectorAll("[data-swse-action]").forEach(btn => {
    btn.addEventListener("click", async ev => {
      ev.preventDefault();
      const action = btn.dataset.swseAction;
      if (action === "reroll") return rerollFromCard(message, btn);
      const payload = message.getFlag(SYSTEM_ID, "damage");
      if (!payload) return;
      const attack = payload.attacks[Number(btn.dataset.attack) || 0];
      if (action === "apply-damage") {
        const actor = await fromUuid(btn.dataset.target);
        const target = attack.results.find(r => r.uuid === btn.dataset.target);
        if (!actor) return;
        const amount = Number(btn.dataset.amount) || 0;
        await requestDamage(actor, amount, damageOpts(payload, target?.crit));
        if (payload.bonusSteps && target?.hit) await stepsFor(actor, payload.bonusSteps);
      } else if (action === "apply-selected") {
        const tokens = canvas.tokens?.controlled ?? [];
        if (!tokens.length) return ui.notifications.warn(game.i18n.localize("SWSE.Warn.SelectTokens"));
        const crit = !!btn.dataset.crit;
        const mult = Number(btn.dataset.mult) || 1;
        const base = crit ? attack.crit : attack.base;
        const amount = Math.floor((base + (attack.sneak || 0)) * mult);
        for (const t of tokens) if (t.actor) await requestDamage(t.actor, amount, damageOpts(payload, crit));
      }
    });
  });
}

async function stepsFor(actor, n) {
  if (!actor.isOwner) return;
  await actor.shiftCondition(n);
}
