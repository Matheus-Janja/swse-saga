/**
 * Efeitos de campo de batalha de veículos (Galaxy at War, "Vehicle Fire Effects", p.67-69).
 * O comandante gasta uma ação padrão; o veículo não ataca até o início do próximo turno do comandante.
 * O efeito vale para personagens e veículos totalmente dentro do raio, até o fim do próximo turno do veículo.
 */
import { SYSTEM_ID } from "../config.mjs";
import { requestEffect, requestUpdate } from "./damage.mjs";

const ICON = n => `systems/${SYSTEM_ID}/assets/icons/status/${n}.svg`;
const mod = (target, value, type = "untyped") => ({ target, value: String(value), type, label: "", disabled: false });

/** who: "allies" | "enemies". */
export const BATTLEFIELD_EFFECTS = {
  antiPersonnel: { name: "Anti-Personnel", prereq: "arma de fogo automático", radius: 6, who: "allies", mods: [mod("attack.all", 2, "morale")], note: "+2 de moral no ataque e +1 dado de dano contra personagens." },
  defender: { name: "Defender", prereq: "RD 10 ou SR 5", radius: 6, who: "allies", note: "Ataques contra tropas aliadas ou veículos Gigantescos ou menores na área são redirecionados ao veículo (afeta a mente)." },
  droidHunter: { name: "Droid Hunter", prereq: "arma iônica", radius: 6, who: "allies", note: "Ataques que causam dano iônico a droides inimigos na área causam +1 dado de dano iônico." },
  groundChurner: { name: "Ground Churner", prereq: "veículo de esteiras", radius: 2, who: "allies", note: "O terreno num raio de 2 quadrados vira terreno difícil." },
  heavyAssault: { name: "Heavy Assault", prereq: "veículo terrestre Colossal", radius: 6, who: "allies", note: "Aliados que atacam alvos dentro da área causam +1 dado de dano." },
  medevac: { name: "Medevac", prereq: "Enorme ou maior", radius: 6, who: "allies", steps: 1, note: "Aliados na área sobem imediatamente +1 passo na trilha de condição." },
  minesweeper: { name: "Minesweeper", prereq: "Perception +6, RD 10", radius: 2, who: "allies", note: "+10 de equipamento em Perception para localizar minas e metade do dano de minas detonadas." },
  platoonLeader: { name: "Platoon Leader", prereq: "tripulação expert", radius: 6, who: "allies", note: "Aliados na área concedem +1 adicional ao usar ajudar outro." },
  rapidEscape: { name: "Rapid Escape", prereq: "deslocamento 12", radius: 2, who: "allies", mods: [mod("speed", 2)], note: "+2 de deslocamento." },
  recon: { name: "Recon", prereq: "deslocamento 6", radius: 2, who: "allies", mods: [mod("skills.initiative", 5, "equipment")], note: "+5 de equipamento em Initiative." },
  shockAndAwe: { name: "Shock and Awe", prereq: "fogo automático de 3d10 ou mais", radius: 6, who: "enemies", note: "Inimigos na área atingidos por ataque aliado que iguale ou supere o Limiar descem −1 passo adicional." },
  shieldBreaker: { name: "Shield Breaker", prereq: "arma iônica", radius: 6, who: "enemies", note: "Inimigos Enormes ou menores na área têm o SR reduzido à metade enquanto estiverem nela." },
  siegeBreaker: { name: "Siege Breaker", prereq: "veículo Gigantesco", radius: 6, who: "allies", note: "Ao acertar, aliados ignoram a RD de objetos e construções." },
  smoker: { name: "Smoker", prereq: "Enorme ou maior", radius: 6, who: "allies", note: "Aliados podem usar Stealth para ganhar camuflagem enquanto se movem no deslocamento normal." },
  sniperFire: { name: "Sniper Fire", prereq: "artilheiro, Int 16+", radius: 6, who: "allies", note: "Aliados na área podem mirar com uma única ação rápida." },
  spotter: { name: "Spotter", prereq: "Perception +6", radius: 6, who: "allies", note: "Aliados com armas pesadas recebem +2 de equipamento no ataque e crítico em 18–20." },
  squadLeader: { name: "Squad Leader", prereq: "tripulação skilled", radius: 6, who: "allies", note: "Aliados na área ignoram cobertura (não a cobertura total)." },
  tankKiller: { name: "Tank Killer", prereq: "arma de 6 dados ou mais", radius: 6, who: "allies", note: "Ao acertar, aliados ignoram a RD de veículos." },
  terrorizer: { name: "Terrorizer", prereq: "Colossal ou maior", radius: 6, who: "enemies", note: "Inimigos na área perdem bônus de moral e de intuição em ataques, defesas e perícias." },
  troopCarrier: { name: "Troop Carrier", prereq: "10+ passageiros", radius: 2, who: "allies", statuses: ["cover"], note: "Aliados na área têm cobertura contra atacantes fora dela." }
};

/** Tokens a até `radius` quadrados do token do veículo (distância em quadrados pela borda mais próxima). */
function tokensInRadius(vehicleToken, radius) {
  const size = canvas.grid.size;
  const vb = vehicleToken.bounds;
  return canvas.tokens.placeables.filter(t => {
    if (t === vehicleToken || !t.actor) return false;
    const b = t.bounds;
    const dx = Math.max(0, vb.left - b.right, b.left - vb.right) / size;
    const dy = Math.max(0, vb.top - b.bottom, b.top - vb.bottom) / size;
    // folga 0 = adjacente (1 quadrado); folga de radius−1 quadrados = ainda dentro do raio
    return Math.max(dx, dy) <= radius - 1 + 0.01;
  });
}

export async function battlefieldEffect(vehicle) {
  const L = k => game.i18n.localize(k);
  const opts = Object.entries(BATTLEFIELD_EFFECTS).map(([k, e]) => `<option value="${k}">${e.name} (${e.prereq})</option>`).join("");
  const id = await foundry.applications.api.DialogV2.wait({
    window: { title: L("SWSE.VC.Battlefield") },
    content: `<div class="swse-dialog"><p class="hint">${L("SWSE.VC.BattlefieldHint")}</p><div class="form-group"><select name="e">${opts}</select></div></div>`,
    buttons: [{ action: "ok", label: L("SWSE.VC.BattlefieldActivate"), default: true, callback: (e, b) => b.form.elements.e.value }],
    rejectClose: false
  });
  const fx = BATTLEFIELD_EFFECTS[id];
  if (!fx) return;
  const vt = vehicle.getActiveTokens(true)[0];
  let affected;
  if (vt) {
    const disp = vt.document.disposition;
    affected = tokensInRadius(vt, fx.radius).filter(t => {
      const d = t.document.disposition;
      if (fx.who === "allies") return d === disp;
      return disp === 0 ? d === -1 : d === -disp;
    }).map(t => t.actor);
  } else {
    // Sem token na cena: usa os tokens marcados
    affected = Array.from(game.user.targets).map(t => t.actor).filter(Boolean);
  }
  affected = [...new Map(affected.map(a => [a.uuid, a])).values()];
  const effect = { name: `${fx.name} (${vehicle.name})`, img: ICON(fx.who === "allies" ? "buff" : "debuff"), rounds: 1, modifiers: fx.mods ?? [], statuses: fx.statuses ?? [] };
  for (const a of affected) {
    if (fx.steps) await requestUpdate(a, { "system.condition.step": Math.max(0, (a.system.condition?.step ?? 0) - fx.steps) });
    else await requestEffect(a, effect);
  }
  // O veículo não ataca até o início do próximo turno do comandante
  if (vehicle.isOwner) await vehicle.addEffect({ name: `${fx.name}: ${L("SWSE.VC.NoAttacks")}`, img: ICON("defensive"), rounds: 0 });
  ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: vehicle }),
    content: `<div class="swse-card vc-card"><h3>${L("SWSE.VC.Battlefield")}: ${fx.name}</h3>
      <p>${fx.note} (${game.i18n.format("SWSE.VC.BattlefieldRadius", { n: fx.radius })})</p>
      <p><strong>${L(fx.who === "allies" ? "SWSE.VC.Allies" : "SWSE.VC.Enemies")}:</strong> ${affected.map(a => a.name).join(", ") || "—"}</p>
      ${vt ? "" : `<p class="note">${L("SWSE.VC.BattlefieldNoToken")}</p>`}</div>`
  });
}
