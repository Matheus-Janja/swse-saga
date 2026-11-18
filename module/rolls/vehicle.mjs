import { SWSE, SYSTEM_ID } from "../config.mjs";
import { vehicleWeaponProfile, VEHICLE_WEAPON_TYPES } from "../rules/vehicle.mjs";

const signed = n => (n >= 0 ? `+${n}` : `${n}`);
const L = k => game.i18n.localize(k);

/** Perfil do tripulante que opera a estação da arma (ou null = tripulação padrão). */
export function stationCrew(vehicle, weapon) {
  const d = vehicle.system.derived ?? {};
  const st = weapon.system.station;
  if (st === "pilot") return d.crew?.pilot ?? null;
  if (st === "copilot") return d.crew?.copilot ?? null;
  return d.gunners?.[(weapon.system.gunner || 1) - 1] ?? null;
}

export function vehicleWeaponInfo(vehicle, weapon) {
  return vehicleWeaponProfile(vehicle.system.derived, weapon, stationCrew(vehicle, weapon));
}

/**
 * Ataque com uma arma de veículo: diálogo de opções, rolagem contra a Reflexos dos alvos e
 * cartão de chat com botões de aplicar dano (Limiar de Dano, RD, SR, íon e penetração).
 */
export async function vehicleAttack(vehicle, weapon, { skipDialog = false } = {}) {
  const w = weapon.system;
  const gunner = stationCrew(vehicle, weapon);
  const p = vehicleWeaponProfile(vehicle.system.derived, weapon, gunner);
  const capital = !!vehicle.system.derived?.capital;
  const tractor = w.weaponType === "tractor";
  if (vehicle.system.derived?.allOut) return ui.notifications.warn(L("SWSE.VC.NoAttackAllOut"));
  // Atirar num dogfight do qual não participa: −5 (exceto com Precise Shot)
  const marked = Array.from(game.user.targets).map(t => t.actor).filter(Boolean);
  const intoDogfight = marked.some(a => a.type === "vehicle" && a.system.dogfight?.length && !a.system.dogfight.includes(vehicle.uuid))
    && !gunner?.features?.includes("precise-shot");
  const outsideDogfight = vehicle.system.dogfight?.length && marked.some(a => !vehicle.system.dogfight.includes(a.uuid));
  if (outsideDogfight) ui.notifications.warn(L("SWSE.VC.OutsideDogfight"));
  let f = { range: "pointBlank", aim: false, autofire: false, attackRun: false, intoDogfight, smallTarget: false, miscAttack: "", miscDamage: "" };
  if (!skipDialog) {
    const rangeOpts = Object.entries(SWSE.rangeBands).map(([k, v]) => `<option value="${k}">${L(v.label)}</option>`).join("");
    const ranges = VEHICLE_WEAPON_TYPES[w.weaponType];
    const res = await foundry.applications.api.DialogV2.wait({
      window: { title: `${vehicle.name}: ${weapon.name}` },
      position: { width: 440 },
      content: `<div class="swse-dialog">
        <p class="summary">${weapon.name}: ${signed(p.attackBonus)} · ${tractor ? `${L("SWSE.Grapple")} ${signed(w.grapple)}` : `(${w.damage}${p.damageBonus ? signed(p.damageBonus) : ""})×${p.multiplier}`}
          <br><small>${gunner ? `${L("SWSE.Vehicle.Operator")}: ${gunner.name}` : L("SWSE.Vehicle.DefaultCrew")}
          ${ranges ? ` · ${L("SWSE.Vehicle.Ranges")}: ${ranges.character.join("/")} (${L("SWSE.Vehicle.CharScale")}), ${ranges.starship.join("/")} (${L("SWSE.Vehicle.ShipScale")})` : ""}</small></p>
        <div class="form-group"><label>${L("SWSE.Attack.Range")}</label><select name="range">${rangeOpts}</select></div>
        <div class="form-group"><label>${L("SWSE.Attack.Aim")}</label><input type="checkbox" name="aim"></div>
        ${w.autofire ? `<div class="form-group"><label>${L("SWSE.Attack.FireAutofire")} (−5)</label><input type="checkbox" name="autofire"></div>` : ""}
        ${w.station === "pilot" ? `<div class="form-group"><label>${L("SWSE.Maneuver.attackRun")} (+2)</label><input type="checkbox" name="attackRun"></div>` : ""}
        <div class="form-group"><label>${L("SWSE.Vehicle.IntoDogfight")} (−5)</label><input type="checkbox" name="intoDogfight" ${intoDogfight ? "checked" : ""}></div>
        ${capital && w.weaponType !== "pointDefense" ? `<div class="form-group"><label>${L("SWSE.Vehicle.SmallTarget")} (−20)</label><input type="checkbox" name="smallTarget"></div>` : ""}
        <div class="form-group"><label>${L("SWSE.Attack.MiscAttack")}</label><input type="text" name="miscAttack" value=""></div>
        <div class="form-group"><label>${L("SWSE.Attack.MiscDamage")}</label><input type="text" name="miscDamage" value=""></div>
      </div>`,
      buttons: [{ action: "fire", label: L("SWSE.Attack.Roll"), default: true, callback: (e, b) => new foundry.applications.ux.FormDataExtended(b.form).object }],
      rejectClose: false
    });
    if (!res) return null;
    f = { ...f, ...res };
  }

  const mods = [];
  const band = SWSE.rangeBands[f.range] ?? SWSE.rangeBands.pointBlank;
  if (band.penalty) mods.push([L(band.label), band.penalty]);
  if (f.autofire) mods.push(["Autofire", -5]);
  if (f.attackRun) {
    mods.push([L("SWSE.Maneuver.attackRun"), 2]);
    await vehicle.update({ "system.maneuver": "attackRun" });
  }
  if (f.intoDogfight) mods.push([L("SWSE.Vehicle.IntoDogfight"), -5]);
  if (f.smallTarget) mods.push([L("SWSE.Vehicle.SmallTarget"), -20]);
  const total = p.attackBonus + mods.reduce((a, [, v]) => a + v, 0);
  const miscAtk = f.miscAttack ? ` ${/^[+-]/.test(f.miscAttack) ? f.miscAttack : "+" + f.miscAttack}` : "";
  const miscDmg = f.miscDamage ? ` ${/^[+-]/.test(f.miscDamage) ? f.miscDamage : "+" + f.miscDamage}` : "";

  // Munição (mísseis, torpedos)
  if (w.ammo?.max > 0) {
    if (w.ammo.value <= 0) return ui.notifications.warn(game.i18n.format("SWSE.Warn.NoAmmo", { name: weapon.name }));
    await weapon.update({ "system.ammo.value": w.ammo.value - 1 });
  }

  const atkRoll = await new Roll(`1d20 ${signed(total)}${miscAtk}`).evaluate();
  const nat = atkRoll.dice[0].total;
  const area = !!f.autofire || !!w.area;
  const targets = Array.from(game.user.targets).filter(t => t.actor);

  let dmgRoll = null;
  let grappleRoll = null;
  if (tractor) grappleRoll = await new Roll(`1d20 ${signed(w.grapple)}`).evaluate();
  else dmgRoll = await new Roll(`(${w.damage} ${signed(p.damageBonus)}${miscDmg}) * ${p.multiplier}`).evaluate();
  const base = dmgRoll ? Math.max(0, dmgRoll.total) : 0;
  const critDamage = base * 2;
  const crit = nat === 20;

  const results = targets.map(t => {
    const reflex = t.actor.system.defenses?.reflex?.total ?? 10;
    let hit = nat !== 1 && (nat === 20 || atkRoll.total >= reflex);
    if (area && nat !== 1 && atkRoll.total < 10) hit = false;
    const isCrit = hit && crit && !area;
    const evasion = t.actor.hasFeature?.("evasion") || t.actor.hasFeature?.("vehicular-evasion");
    let amount = isCrit ? critDamage : base;
    let mult = 1;
    if (area) mult = hit ? (evasion ? 0.5 : 1) : (evasion ? 0 : 0.5);
    else if (!hit) mult = 0;
    return { uuid: t.actor.uuid, name: t.name, reflex, hit, crit: isCrit, amount: Math.floor(amount * mult) };
  });

  const payload = {
    type: w.ion ? "ion" : "normal", ignoreDR: false, thresholdReduction: 0, drReduction: w.penetration || 0,
    extraSteps: 0, bonusSteps: 0, area,
    attacks: [{ base, crit: critDamage, sneak: 0, results }]
  };
  const partsLine = Object.entries(p.parts).filter(([, v]) => v).map(([k, v]) => `${L(`SWSE.VPart.${k}`)} ${signed(v)}`)
    .concat(mods.map(([l, v]) => `${l} ${signed(v)}`)).join(", ");

  let html = `<div class="swse-card attack-card vehicle-attack">
    <header class="card-header"><img src="${vehicle.img}" width="36" height="36"><h3>${vehicle.name}: ${weapon.name}</h3></header>
    <p class="parts"><strong>${L("SWSE.Attack.Label")}:</strong> ${partsLine}</p>
    <p class="parts">${gunner ? `${L("SWSE.Vehicle.Operator")}: ${gunner.name}` : L("SWSE.Vehicle.DefaultCrew")}${w.area ? ` · ${L("SWSE.Weapon.area")}: ${w.area}` : ""}${w.penetration ? ` · ${L("SWSE.Vehicle.Penetration")} ${w.penetration}` : ""}</p>
    ${await atkRoll.render()}
    ${nat === 20 ? `<p class="crit">${L("SWSE.Natural20")}${area ? "" : " — " + L("SWSE.Attack.Critical")}</p>` : ""}
    ${nat === 1 ? `<p class="fumble">${L("SWSE.Natural1")}</p>` : ""}`;
  if (dmgRoll) html += `<div class="damage-roll"><strong>${L("SWSE.Damage")}:</strong> ${await dmgRoll.render()}${crit && !area ? `<p class="crit">${L("SWSE.Attack.CriticalDamage")}: ${critDamage}</p>` : ""}</div>`;
  if (grappleRoll) html += `<div class="damage-roll"><strong>${L("SWSE.Vehicle.TractorGrapple")}:</strong> ${await grappleRoll.render()}<p class="note">${L("SWSE.Vehicle.TractorNote")}</p></div>`;
  if (results.length) {
    html += `<ul class="target-results">`;
    for (const r of results) {
      const status = r.crit ? L("SWSE.Attack.Critical") : r.hit ? L("SWSE.Attack.Hit") : L("SWSE.Attack.Miss");
      html += `<li class="${r.hit ? "hit" : "miss"}"><span class="tname">${r.name}</span>
        <span class="tdef">${L("SWSE.Defense.reflexAbbr")} ${game.user.isGM ? r.reflex : "—"}</span><span class="tstatus">${status}</span>
        ${r.amount > 0 ? `<button type="button" data-swse-action="apply-damage" data-attack="0" data-target="${r.uuid}" data-amount="${r.amount}">${L("SWSE.Attack.Apply")} ${r.amount}</button>` : ""}</li>`;
    }
    html += `</ul>`;
  }
  if (dmgRoll) {
    html += `<div class="card-buttons">
      <button type="button" data-swse-action="apply-selected" data-attack="0" data-mult="1">${L("SWSE.Attack.ApplySelected")} (${base})</button>
      ${crit && !area ? `<button type="button" data-swse-action="apply-selected" data-attack="0" data-crit="1">${L("SWSE.Attack.ApplySelectedCrit")} (${critDamage})</button>` : ""}
      <button type="button" data-swse-action="apply-selected" data-attack="0" data-mult="0.5">${L("SWSE.Attack.ApplySelectedHalf")}</button></div>`;
  }
  const notes = [];
  if (f.aim && w.weaponType === "missile") notes.push(L("SWSE.Vehicle.MissileLock"));
  if (f.attackRun) notes.push(L("SWSE.Vehicle.AttackRunNote"));
  if (f.autofire) notes.push(L("SWSE.Attack.AutofireNote"));
  if (w.special) notes.push(w.special);
  if (notes.length) html += `<ul class="notes">${notes.map(n => `<li>${n}</li>`).join("")}</ul>`;
  html += `</div>`;

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: vehicle }),
    content: html,
    rolls: [atkRoll, dmgRoll, grappleRoll].filter(Boolean),
    flags: { [SYSTEM_ID]: { type: "vehicleAttack", actorUuid: vehicle.uuid, damage: dmgRoll ? payload : null } }
  });
}
