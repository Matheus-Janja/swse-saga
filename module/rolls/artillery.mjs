/**
 * Ataques de artilharia (Galaxy at War, p.100-101) e ordens especiais de bombardeio (p.73).
 * Observador avançado: Knowledge (tactics) CD 15 (ação padrão). Sucesso: após o atraso da arma, ataque +5
 * (+1 a cada 2 pontos acima de 15) contra a Reflexos de quem está no quadrado-alvo (dano total; metade se errar);
 * o mesmo ataque contra quem está no raio de splash (metade se acertar; nada se errar).
 * Falha: o ataque cai a tantos quadrados do alvo quanto a margem de falha.
 */
import { SYSTEM_ID } from "../config.mjs";

/** Tabela 3-3 (munição de fogo indireto). x = multiplicador (escala de veículo). */
export const ARTILLERY = {
  cannonHeavy: { name: "Cannon, heavy", dice: "10d10", x: 2, splash: 6, delay: 6, cost: 2000 },
  cannonLight: { name: "Cannon, light", dice: "8d10", x: 2, splash: 4, delay: 4, cost: 1000 },
  fieldGun: { name: "Field gun", dice: "4d10", x: 2, splash: 2, delay: 2, cost: 500 },
  howitzer: { name: "Howitzer", dice: "6d10", x: 2, splash: 3, delay: 3, cost: 750 },
  mortarFrag: { name: "Mortar, frag", dice: "4d6", x: 1, splash: 2, delay: 2, cost: 300 },
  mortarIon: { name: "Mortar, ion", dice: "4d6", x: 1, splash: 2, delay: 2, cost: 450, type: "ion" },
  mortarStun: { name: "Mortar, stun", dice: "4d6", x: 1, splash: 2, delay: 2, cost: 450, type: "stun" },
  mortarThermal: { name: "Mortar, thermal", dice: "8d6", x: 1, splash: 4, delay: 2, cost: 3000 },
  orbital: { name: "Turbolaser, orbital", dice: "5d10", x: 5, splash: 8, delay: 10, cost: 0, penalty: -10 },
  // Ordens especiais (Rank and Privilege): ataque fixo
  orderMortar: { name: "Ordem menor: mortar strike", dice: "4d6", x: 1, splash: 2, delay: 0, fixed: 10, every: "1d2" },
  orderAir: { name: "Ordem maior: air strike", dice: "10d6", x: 2, splash: 4, delay: 0, fixed: 15, every: "1d2", note: "por 10 rodadas" },
  orderOrbital: { name: "Ordem de comando: orbital bombardment", dice: "5d6", x: 5, splash: 4, delay: 0, fixed: 20, every: "1d2", note: "por 10 rodadas" }
};

export async function artilleryStrike(actor) {
  const L = k => game.i18n.localize(k);
  const opts = Object.entries(ARTILLERY).map(([k, a]) => `<option value="${k}">${a.name} — ${a.dice}${a.x > 1 ? `×${a.x}` : ""}, splash ${a.splash}${a.fixed ? `, ataque +${a.fixed}` : `, atraso ${a.delay}`}</option>`).join("");
  const res = await foundry.applications.api.DialogV2.wait({
    window: { title: L("SWSE.Artillery.Title") },
    content: `<div class="swse-dialog"><p class="hint">${L("SWSE.Artillery.Hint")}</p>
      <div class="form-group"><select name="w">${opts}</select></div>
      <div class="form-group"><label>${L("SWSE.Artillery.Reuse")}</label><input type="number" name="reuse" value="" placeholder="—"></div></div>`,
    buttons: [{ action: "ok", label: L("SWSE.Artillery.Fire"), default: true, callback: (e, b) => new foundry.applications.ux.FormDataExtended(b.form).object }],
    rejectClose: false
  });
  const a = ARTILLERY[res?.w];
  if (!a) return;
  const rolls = [];
  let html = `<div class="swse-card attack-card"><h3>${a.name}</h3>`;
  let attackBonus = a.fixed ?? null;
  if (attackBonus === null) {
    let check = Number(res.reuse) || 0;
    if (!check) {
      const kt = actor?.system.skills?.knowledgeTactics?.total ?? 0;
      const r = await new Roll(`1d20 + ${kt}`).evaluate();
      rolls.push(r);
      check = r.total;
      html += `<p><strong>Knowledge (tactics) CD 15</strong></p>${await r.render()}`;
    } else html += `<p>${game.i18n.format("SWSE.Artillery.Reused", { n: check })}</p>`;
    if (check < 15) {
      html += `<p class="failure">${game.i18n.format("SWSE.Artillery.OffTarget", { n: 15 - check, delay: a.delay })}</p>`;
    } else html += `<p class="success">${game.i18n.format("SWSE.Artillery.OnTarget", { delay: a.delay })}</p>`;
    attackBonus = 5 + Math.floor((check - 15) / 2) + (a.penalty ?? 0);
  } else if (a.every) html += `<p>${game.i18n.format("SWSE.Artillery.Every", { every: a.every })}${a.note ? ` ${a.note}` : ""}</p>`;

  const atk = await new Roll(`1d20 + ${attackBonus}`).evaluate();
  const dmg = await new Roll(a.x > 1 ? `(${a.dice}) * ${a.x}` : a.dice).evaluate();
  rolls.push(atk, dmg);
  // Primeiro alvo marcado = quadrado-alvo; os demais = splash
  const targets = Array.from(game.user.targets).filter(t => t.actor);
  const results = targets.map((t, i) => {
    const ref = t.actor.system.defenses?.reflex?.total ?? 10;
    const hit = atk.total >= ref;
    const evasion = t.actor.hasFeature?.("evasion");
    let mult = i === 0 ? (hit ? 1 : 0.5) : (hit ? 0.5 : 0);
    if (evasion) mult = hit ? mult / 2 : 0;
    return { uuid: t.actor.uuid, name: t.name, reflex: ref, hit, crit: false, amount: Math.floor(dmg.total * mult), adjNotes: [], center: i === 0 };
  });
  html += `<p><strong>${L("SWSE.Attack.Label")}</strong> (+${attackBonus})</p>${await atk.render()}
    <div class="damage-roll"><strong>${L("SWSE.Damage")}:</strong> ${await dmg.render()}</div>`;
  if (results.length) {
    html += `<ul class="target-results">${results.map(r => `<li class="${r.hit ? "hit" : "miss"}"><span class="tname">${r.name}${r.center ? " ◎" : ""}</span>
      <span class="tdef">${L("SWSE.Defense.reflexAbbr")} ${game.user.isGM ? r.reflex : "—"}</span>
      <span class="tstatus">${r.hit ? L("SWSE.Attack.Hit") : L("SWSE.Attack.Miss")}</span>
      ${r.amount > 0 ? `<button type="button" data-swse-action="apply-damage" data-attack="0" data-target="${r.uuid}" data-amount="${r.amount}">${L("SWSE.Attack.Apply")} ${r.amount}</button>` : ""}</li>`).join("")}</ul>`;
  }
  html += `<div class="card-buttons">
      <button type="button" data-swse-action="apply-selected" data-attack="0" data-mult="1">${L("SWSE.Attack.ApplySelected")} (${dmg.total})</button>
      <button type="button" data-swse-action="apply-selected" data-attack="0" data-mult="0.5">${L("SWSE.Attack.ApplySelectedHalf")}</button></div>
    <p class="hint">${L("SWSE.Artillery.TargetsHint")}</p></div>`;
  const payload = { type: a.type ?? "normal", area: true, ignoreDR: false, thresholdReduction: 0, drReduction: 0, extraSteps: 0, attacks: [{ base: dmg.total, crit: dmg.total, sneak: 0, results }] };
  return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content: html, rolls, flags: { [SYSTEM_ID]: { type: "attack", damage: payload } } });
}
