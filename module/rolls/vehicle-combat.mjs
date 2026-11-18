/**
 * Ações de combate veicular (Cap. 10): dogfight, abalroar, colisões, aumentar velocidade, evitar colisão.
 */
import { SYSTEM_ID } from "../config.mjs";
import { COLLISION, collisionFormula } from "../rules/vehicle.mjs";
import { requestUpdate, requestEffect } from "./damage.mjs";
import { vehicleAttack } from "./vehicle.mjs";

const L = k => game.i18n.localize(k);
const F = (k, d) => game.i18n.format(k, d);
const signed = n => (n >= 0 ? `+${n}` : `${n}`);
const STATUS = n => `systems/${SYSTEM_ID}/assets/icons/status/${n}.svg`;

const pilotOf = v => v.system.derived?.crew?.pilot ?? null;
const pilotHas = (v, key) => !!pilotOf(v)?.features?.includes(key);

/** Rola um teste de Pilot do veículo (com penalidade e opção de rolar duas vezes ficando com o melhor). */
async function pilotRoll(v, { penalty = 0, twice = false } = {}) {
  const total = v.system.skills.pilot.total + penalty;
  return new Roll(`${twice ? "2d20kh" : "1d20"} ${signed(total)}`).evaluate();
}

/** Veículo-alvo: o único token marcado, ou o único oponente de dogfight. */
function targetVehicle(v, { fromDogfight = false } = {}) {
  const t = Array.from(game.user.targets).map(t => t.actor).filter(a => a?.type === "vehicle" && a.uuid !== v.uuid);
  if (t.length === 1) return t[0];
  if (fromDogfight && v.system.dogfight.length === 1) return fromUuidSync(v.system.dogfight[0]);
  ui.notifications.warn(L("SWSE.VC.TargetOne"));
  return null;
}

/** Teste oposto de Pilot entre dois veículos; mostra o resultado no chat. */
async function opposed(v, o, title, { penalty = 0, twice = false } = {}) {
  const a = await pilotRoll(v, { penalty, twice });
  const b = await pilotRoll(o);
  const win = a.total >= b.total;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: v }), rolls: [a, b],
    content: `<div class="swse-card vc-card"><h3>${title}</h3>
      <p><strong>${v.name}</strong>${penalty ? ` (${signed(penalty)})` : ""}${twice ? " (Relentless Pursuit)" : ""}</p>${await a.render()}
      <p><strong>${o.name}</strong></p>${await b.render()}
      <p class="${win ? "success" : "failure"}">${win ? F("SWSE.VC.Wins", { name: v.name }) : F("SWSE.VC.Wins", { name: o.name })}</p></div>`
  });
  return win;
}

async function gunnerPenalty(v) {
  return requestEffect(v, {
    name: L("SWSE.VC.GunnerPenalty"), img: STATUS("total-concealment"), rounds: 0,
    modifiers: [{ target: "vehicle.attack.gunner", value: "-5", type: "untyped", label: "", disabled: false }]
  });
}

/* ---------------- Dogfight ---------------- */

export async function initiateDogfight(v) {
  const o = targetVehicle(v);
  if (!o) return;
  const win = await opposed(v, o, `${L("SWSE.VC.Dogfight")}: ${v.name} × ${o.name}`, { penalty: -5, twice: pilotHas(v, "relentless-pursuit") });
  if (!win) return;
  await requestUpdate(v, { "system.dogfight": [...new Set([...v.system.dogfight, o.uuid])] });
  await requestUpdate(o, { "system.dogfight": [...new Set([...o.system.dogfight, v.uuid])] });
  ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: v }), content: `<div class="swse-card"><p>${F("SWSE.VC.Engaged", { a: v.name, b: o.name })}</p></div>` });
}

export async function dogfightAttack(v) {
  const o = targetVehicle(v, { fromDogfight: true });
  if (!o) return;
  if (!v.system.dogfight.includes(o.uuid)) return ui.notifications.warn(F("SWSE.VC.NotInDogfight", { name: o.name }));
  const win = await opposed(v, o, `${L("SWSE.VC.DogfightAttack")}: ${v.name} × ${o.name}`);
  if (!win) return gunnerPenalty(v);
  // Elusive Dogfighter: os pilotos inimigos no dogfight sofrem −10 nos ataques
  if (pilotHas(v, "elusive-dogfighter")) {
    await requestEffect(o, {
      name: "Elusive Dogfighter", img: STATUS("concealment"), rounds: 0,
      modifiers: [{ target: "vehicle.attack.all", value: "-10", type: "untyped", label: "", disabled: false }]
    });
  }
  const weapons = v.items.filter(i => i.type === "vehicleWeapon" && i.system.weaponType !== "tractor");
  if (!weapons.length) return;
  let weapon = weapons[0];
  if (weapons.length > 1) {
    const id = await foundry.applications.api.DialogV2.wait({
      window: { title: L("SWSE.VC.ChooseWeapon") },
      content: `<div class="swse-dialog"><div class="form-group"><select name="w">${weapons.map(w => `<option value="${w.id}">${w.name}</option>`).join("")}</select></div></div>`,
      buttons: [{ action: "ok", label: "OK", default: true, callback: (e, b) => b.form.elements.w.value }],
      rejectClose: false
    });
    if (!id) return;
    weapon = v.items.get(id);
  }
  return vehicleAttack(v, weapon);
}

export async function disengage(v) {
  const o = targetVehicle(v, { fromDogfight: true });
  if (!o) return;
  const win = await opposed(v, o, `${L("SWSE.VC.Disengage")}: ${v.name} × ${o.name}`);
  if (!win) return gunnerPenalty(v);
  await requestUpdate(v, { "system.dogfight": v.system.dogfight.filter(u => u !== o.uuid) });
  await requestUpdate(o, { "system.dogfight": o.system.dogfight.filter(u => u !== v.uuid) });
}

/* ---------------- Colisões ---------------- */

/** Tamanho/força de quem colide (veículo ou criatura). */
function collider(a) {
  if (a.type === "vehicle") return { size: a.system.size, str: a.system.derived?.abilities?.str?.mod ?? 0 };
  const size = a.system.derived?.size ?? "medium";
  return { size: COLLISION[size] ? size : null, str: a.system.abilities?.str?.mod ?? 0 };
}

/** Ocupantes (tripulantes designados) de um veículo, com o dano reduzido pelo Limiar do veículo (errata). */
function occupants(v, amount) {
  if (v.type !== "vehicle") return [];
  const c = v.system.crew;
  const uuids = [...new Set([c.pilot, c.copilot, c.commander, c.systemOperator, c.engineer, ...c.gunners].filter(Boolean))];
  const reduced = String(v.system.cover).toLowerCase().startsWith("nenhum") || String(v.system.cover).toLowerCase().startsWith("none")
    ? amount : Math.max(0, amount - v.system.damageThreshold.total);
  return uuids.map(u => fromUuidSync(u)).filter(Boolean).map(a => ({ uuid: a.uuid, name: `${a.name} (${v.name})`, amount: reduced }));
}

/** Cartão com botões "aplicar" por destinatário (reaproveita o sistema de dano do chat). */
async function collisionCard(actor, title, html, recipients, rolls) {
  const results = recipients.filter(r => r.amount > 0).map(r => ({ ...r, hit: true }));
  const payload = { type: "normal", ignoreDR: false, thresholdReduction: 0, drReduction: 0, extraSteps: 0, bonusSteps: 0, area: true, attacks: [{ base: 0, crit: 0, sneak: 0, results }] };
  const buttons = results.map(r => `<button type="button" data-swse-action="apply-damage" data-attack="0" data-target="${r.uuid}" data-amount="${r.amount}">${L("SWSE.Attack.Apply")} ${r.amount} → ${r.name}</button>`).join("");
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }), rolls,
    content: `<div class="swse-card vc-card"><h3>${title}</h3>${html}<div class="card-buttons">${buttons}</div>
      <p class="note">${L("SWSE.VC.CollisionNote")}</p></div>`,
    flags: { [SYSTEM_ID]: { type: "collision", damage: payload } }
  });
}

/** Abalroar (rodada completa): Pilot −10 contra a Reflexos do alvo. */
export async function ram(v) {
  const targets = Array.from(game.user.targets).map(t => t.actor).filter(a => a && a.uuid !== v.uuid);
  if (targets.length !== 1) return ui.notifications.warn(L("SWSE.VC.TargetOne"));
  const o = targets[0];
  const check = await pilotRoll(v, { penalty: -10 });
  const reflex = o.system.defenses?.reflex?.total ?? 10;
  const success = check.total >= reflex;
  const me = collider(v);
  const them = collider(o);
  const toTarget = await new Roll(collisionFormula(me.size, me.str, v.system.derived?.allOut)).evaluate();
  const toSelf = them.size ? await new Roll(collisionFormula(them.size, them.str)).evaluate() : null;
  const half = n => Math.floor(n / (success ? 1 : 2));
  let tgtAmount = half(Math.max(0, toTarget.total));
  // Vehicular Evasion do piloto do alvo: metade se acertar, nada se errar
  if (o.type === "vehicle" && pilotHas(o, "vehicular-evasion")) tgtAmount = success ? Math.floor(tgtAmount / 2) : 0;
  const selfAmount = toSelf ? half(Math.max(0, toSelf.total)) : 0;
  const recipients = [
    { uuid: o.uuid, name: o.name, amount: tgtAmount },
    { uuid: v.uuid, name: v.name, amount: selfAmount },
    ...occupants(o, tgtAmount), ...occupants(v, selfAmount)
  ];
  const html = `<p>${L("SWSE.VC.RamCheck")} (Pilot −10) vs Ref ${game.user.isGM ? reflex : "—"}:</p>${await check.render()}
    <p class="${success ? "success" : "failure"}">${success ? L("SWSE.VC.RamHit") : L("SWSE.VC.RamMiss")}</p>
    <p><strong>${o.name}:</strong></p>${await toTarget.render()}
    ${toSelf ? `<p><strong>${v.name}:</strong></p>${await toSelf.render()}` : ""}
    ${v.system.derived?.allOut ? `<p class="note">${L("SWSE.VC.AllOutDouble")}</p>` : ""}`;
  return collisionCard(v, `${L("SWSE.VC.Ram")}: ${v.name} → ${o.name}`, html, recipients, [check, toTarget, toSelf].filter(Boolean));
}

/** Colisão com um perigo móvel (asteroide, veículo desgovernado). */
export async function hazardCollision(v) {
  const sizes = Object.keys(COLLISION);
  const size = await foundry.applications.api.DialogV2.wait({
    window: { title: L("SWSE.VC.Hazard") },
    content: `<div class="swse-dialog"><div class="form-group"><label>${L("SWSE.VC.HazardSize")}</label><select name="s">${sizes.map(s => `<option value="${s}">${L(`SWSE.${s.startsWith("colossal") && s !== "colossal" ? "VSize" : "Size"}.${s}`)}</option>`).join("")}</select></div></div>`,
    buttons: [{ action: "ok", label: "OK", default: true, callback: (e, b) => b.form.elements.s.value }],
    rejectClose: false
  });
  if (!size) return;
  const atk = await new Roll(`1d20 + ${COLLISION[size].hazard}`).evaluate();
  const reflex = v.system.defenses.reflex.total;
  const hit = atk.total >= reflex;
  const dmg = await new Roll(collisionFormula(size, 0, v.system.derived?.allOut)).evaluate();
  const amount = hit ? dmg.total : Math.floor(dmg.total / 2);
  const html = `<p>${L("SWSE.VC.HazardAttack")} vs Ref ${reflex}:</p>${await atk.render()}
    <p class="${hit ? "failure" : "success"}">${hit ? L("SWSE.Attack.Hit") : L("SWSE.VC.HalfDamage")}</p>${await dmg.render()}`;
  return collisionCard(v, `${L("SWSE.VC.Hazard")}: ${v.name}`, html, [{ uuid: v.uuid, name: v.name, amount }, ...occupants(v, amount)], [atk, dmg]);
}

/* ---------------- Ações do piloto ---------------- */

/** Evitar colisão (reação): Pilot CD 15 → metade do dano (escala de nave: sem colisão). */
export async function avoidCollision(v) {
  return v.rollSkill("pilot", { dc: 15, label: `${L("SWSE.VC.AvoidCollision")} (CD 15)`, extraHtml: `<p class="note">${L("SWSE.VC.AvoidNote")}</p>` });
}

/** Aumentar velocidade (ação rápida, piloto treinado): Pilot CD 20; falha = −1 passo na trilha. */
export async function increaseSpeed(v) {
  const pilot = pilotOf(v);
  if (pilot && !pilot.pilotTrained) return ui.notifications.warn(L("SWSE.VC.NeedTrained"));
  const roll = await v.rollSkill("pilot", { dc: 20, label: `${L("SWSE.VC.IncreaseSpeed")} (CD 20)` });
  if (!roll) return;
  if (roll.total < 20) {
    await v.shiftCondition(1);
    return ui.notifications.info(L("SWSE.VC.SpeedFail"));
  }
  const extra = 1 + Math.floor((roll.total - 20) / 5);
  ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: v }), content: `<div class="swse-card"><p>${F("SWSE.VC.SpeedUp", { n: extra })}</p></div>` });
}

/** Movimento total (rodada completa): 4× (5× com Full Throttle); perde Des na Ref; artilheiros não atacam. */
export async function allOut(v) {
  const mult = pilotHas(v, "full-throttle") ? 5 : 4;
  await v.update({ "system.stationary": false });
  await v.addEffect({ name: L("SWSE.Maneuver.allOut"), img: STATUS("charging"), rounds: 0, statuses: ["allOut"] });
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: v }),
    content: `<div class="swse-card"><p>${F("SWSE.VC.AllOutMsg", { n: mult * (v.system.speed.character || 0), s: mult * (v.system.speed.starship || 0), mult })}</p></div>`
  });
}

export async function fullStop(v) {
  return v.update({ "system.stationary": !v.system.stationary, "system.maneuver": "none" });
}

/** Levantar/baixar escudos (operador de sistemas, ação rápida). */
export async function toggleShields(v) {
  const up = v.system.shieldsUp;
  if (up) return v.update({ "system.shieldsUp": false, "system.shieldRating": 0, [`flags.${SYSTEM_ID}.storedSR`]: v.system.shieldRating });
  const stored = v.getFlag(SYSTEM_ID, "storedSR");
  return v.update({ "system.shieldsUp": true, "system.shieldRating": stored ?? v.system.shieldMax });
}

export async function leaveDogfight(v, uuid) {
  const o = fromUuidSync(uuid);
  await requestUpdate(v, { "system.dogfight": v.system.dogfight.filter(u => u !== uuid) });
  if (o) await requestUpdate(o, { "system.dogfight": o.system.dogfight.filter(u => u !== v.uuid) });
}
