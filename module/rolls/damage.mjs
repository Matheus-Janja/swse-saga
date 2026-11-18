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

/** Atualiza um ator que o usuário talvez não controle (ex.: veículo inimigo num dogfight), via Mestre. */
export async function requestUpdate(actor, data) {
  if (actor.isOwner) return actor.update(data);
  const gm = game.users.activeGM;
  if (!gm) return ui.notifications.warn(game.i18n.localize("SWSE.Warn.NoGM"));
  game.socket.emit(SOCKET, { action: "update", uuid: actor.uuid, data, gm: gm.id });
}

/** Cria um efeito num ator que o usuário talvez não controle, via Mestre. */
export async function requestEffect(actor, effect) {
  if (actor.isOwner) return actor.addEffect(effect);
  const gm = game.users.activeGM;
  if (!gm) return ui.notifications.warn(game.i18n.localize("SWSE.Warn.NoGM"));
  game.socket.emit(SOCKET, { action: "effect", uuid: actor.uuid, effect, gm: gm.id });
}

export function registerSocket() {
  game.socket.on(SOCKET, async data => {
    if (game.user.id !== data.gm) return;
    const actor = await fromUuid(data.uuid);
    if (!actor) return;
    if (data.action === "applyDamage") actor.applyDamage(data.amount, data.opts);
    else if (data.action === "update") actor.update(data.data);
    else if (data.action === "effect") actor.addEffect(data.effect);
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
        for (const s of payload.statusOnHit ?? []) {
          if (target?.hit && !actor.statuses?.has(s)) await requestEffect(actor, { name: game.i18n.localize(`SWSE.Status.${s}`), img: `systems/${SYSTEM_ID}/assets/icons/status/${s}.svg`, statuses: [s] });
        }
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
