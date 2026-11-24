/**
 * Venenos e doenças (Galaxy of Intrigue): o item guarda "poison|ataque|defesa|efeito" em system.special.
 * Usar o item rola o ataque contra a Fortitude dos tokens marcados e oferece botões de dano/condição.
 */
import { SYSTEM_ID } from "../config.mjs";
import { requestUpdate, requestEffect } from "./damage.mjs";

const L = k => game.i18n.localize(k);

/** Efeito codificado: "skills-5", "step1", "dmg8d6-step1-half", "dmg10d6-step2-half1", "dmg1d8-step1p". */
export function parsePoisonEffect(code = "") {
  const out = { damage: null, steps: 0, persistent: false, half: false, missSteps: 0, skills: 0 };
  const dm = /dmg(\d+d\d+(?:[+-]\d+)?)/.exec(code); if (dm) out.damage = dm[1];
  const sm = /step(\d)(p?)/.exec(code); if (sm) { out.steps = Number(sm[1]); out.persistent = sm[2] === "p"; }
  if (/half/.test(code)) out.half = true;
  const hm = /half(\d)/.exec(code); if (hm) out.missSteps = Number(hm[1]);
  const sk = /skills-(\d+)/.exec(code); if (sk) out.skills = Number(sk[1]);
  return out;
}

export async function poisonAttack(actor, item) {
  const [, attack, defense = "fortitude", code] = String(item.system.special).split("|");
  const fx = parsePoisonEffect(code);
  const targets = Array.from(game.user.targets).map(t => t.actor).filter(Boolean);
  if (!targets.length) return ui.notifications.warn(L("SWSE.Talent.NeedTarget"));
  const atk = await new Roll(attack).evaluate();
  const dmg = fx.damage ? await new Roll(fx.damage).evaluate() : null;
  const rows = [];
  for (const t of targets) {
    const def = t.system.defenses?.[defense]?.total ?? 10;
    const hit = atk.total >= def;
    const amount = dmg ? (hit ? dmg.total : fx.half ? Math.floor(dmg.total / 2) : 0) : 0;
    const steps = hit ? fx.steps : fx.missSteps;
    rows.push({ t, hit, amount, steps });
  }
  const id = foundry.utils.randomID();
  const html = `<div class="swse-card attack-card"><header class="card-header"><img src="${item.img}" width="36" height="36"><h3>${item.name}</h3></header>
    ${await atk.render()}${dmg ? `<div class="damage-roll"><strong>${L("SWSE.Damage")}:</strong> ${await dmg.render()}</div>` : ""}
    <ul class="target-results">${rows.map(r => `<li class="${r.hit ? "hit" : "miss"}"><span class="tname">${r.t.name}</span>
      <span class="tdef">${L(`SWSE.Defense.${defense}`)} ${game.user.isGM ? r.t.system.defenses?.[defense]?.total : "—"}</span>
      <span class="tstatus">${r.hit ? L("SWSE.Attack.Hit") : L("SWSE.Attack.Miss")}</span>
      ${(r.amount || r.steps || (r.hit && fx.skills)) ? `<button type="button" data-swse-action="poison" data-target="${r.t.uuid}" data-amount="${r.amount}" data-steps="${r.steps}" data-persistent="${fx.persistent && r.hit ? 1 : 0}" data-skills="${r.hit ? fx.skills : 0}">${L("SWSE.Attack.Apply")}${r.amount ? ` ${r.amount}` : ""}${r.steps ? ` −${r.steps} ${L("SWSE.Talent.Steps")}` : ""}</button>` : ""}</li>`).join("")}</ul>
    <p class="hint">${L(item.system.category === "hazard" ? "SWSE.Poison.HazardHint" : "SWSE.Poison.Recurring")}</p></div>`;
  return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content: html, rolls: [atk, dmg].filter(Boolean), flags: { [SYSTEM_ID]: { type: "poison", id } } });
}

/** Botão "aplicar" do cartão de veneno. */
export async function applyPoison(btn) {
  const target = await fromUuid(btn.dataset.target);
  if (!target) return;
  const amount = Number(btn.dataset.amount) || 0;
  const steps = Number(btn.dataset.steps) || 0;
  if (amount) {
    const { requestDamage } = await import("./damage.mjs");
    // Dano de veneno não move na trilha pelo Limiar (os passos vêm do próprio veneno)
    await requestDamage(target, amount, { type: "normal", thresholdReduction: -9999 });
  }
  if (steps || btn.dataset.persistent === "1") {
    const upd = { "system.condition.step": Math.min(5, (target.system.condition?.step ?? 0) + steps) };
    if (btn.dataset.persistent === "1") upd["system.condition.persistent"] = true;
    await requestUpdate(target, upd);
  }
  const sk = Number(btn.dataset.skills) || 0;
  if (sk) await requestEffect(target, { name: `Veneno (−${sk} perícias)`, img: `systems/${SYSTEM_ID}/assets/icons/status/debuff.svg`, rounds: 0, modifiers: [{ target: "skills.all", value: String(-sk), type: "penalty", label: "", disabled: false }] });
}

/** Nyriaan spice: second wind instantâneo (sem gastar usos), +1 passo e +5 no Limiar por 1 hora. */
export async function nyriaanSpice(actor, item) {
  const heal = actor.derived.secondWind?.heal ?? 0;
  const hp = actor.system.hp;
  await actor.update({ "system.hp.value": Math.min(hp.max, hp.value + heal), "system.condition.step": Math.max(0, actor.system.condition.step - 1) });
  await actor.addEffect({ name: "Nyriaan Spice", img: `systems/${SYSTEM_ID}/assets/icons/status/buff.svg`, rounds: game.combat ? 600 : null,
    modifiers: [{ target: "damageThreshold", value: "5", type: "untyped", label: "", disabled: false }] });
  if (item.system.quantity > 1) await item.update({ "system.quantity": item.system.quantity - 1 });
  else await item.delete();
  ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content: `<div class="swse-card"><h3>Nyriaan Spice</h3><p>${game.i18n.format("SWSE.Poison.Spice", { heal })}</p></div>` });
}
