import { SYSTEM_ID } from "../config.mjs";

const signed = n => (n >= 0 ? `+${n}` : `${n}`);

/**
 * Usa um poder da Força: teste de Use the Force, compara com as CDs e com a defesa dos alvos,
 * rola dano do maior nível alcançado (se houver) e gasta o poder do conjunto.
 */
export async function useForcePower(actor, power) {
  const L = k => game.i18n.localize(k);
  const sys = power.system;
  if (!actor.system.skills.useTheForce.usable) return ui.notifications.warn(L("SWSE.Warn.NeedForceSensitivity"));
  if (sys.spent >= sys.uses) {
    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: power.name }, content: `<p>${L("SWSE.Force.AllSpent")}</p>`
    });
    if (!ok) return;
  }
  const dark = sys.descriptors.includes("darkSide");
  const light = sys.descriptors.includes("lightSide");
  const canFP = !dark && !(light && actor.system.darkSide.value > 0) && actor.system.forcePoints.value > 0;
  const hasFP = actor.system.forcePoints.value > 0;
  const choice = k => actor.featureChoices(k).includes(sys.key);
  // Force Power Mastery: escolher 10 com este poder. Force Power Adept / Dark Side Master: rolar duas vezes (Ponto da Força).
  const canTake10 = choice("force-power-mastery");
  const canTwice = hasFP && (choice("force-power-adept") || (dark && actor.hasFeature("dark-side-master")));
  const canDevastate = hasFP && actor.hasFeature("devastating-power") && !!sys.damage;
  const rerollNote = dark && (actor.hasFeature("dark-side-adept") || actor.hasFeature("embrace-the-dark-side"));
  const res = await foundry.applications.api.DialogV2.wait({
    window: { title: power.name },
    content: `<div class="swse-dialog">
      <p>${sys.time ? `<strong>${L("SWSE.Force.Time")}:</strong> ${sys.time}<br>` : ""}${sys.target ? `<strong>${L("SWSE.Force.Target")}:</strong> ${sys.target}` : ""}</p>
      <div class="form-group"><label>${L("SWSE.SituationalBonus")}</label><input type="text" name="bonus" value=""></div>
      <div class="form-group"><label>${L("SWSE.SpendForcePoint")}${canFP ? "" : ` (${L("SWSE.Force.FPNotAllowed")})`}</label>
        <input type="checkbox" name="forcePoint" ${canFP ? "" : "disabled"}></div>
      ${canTake10 ? `<div class="form-group"><label>Force Power Mastery: ${L("SWSE.Take10")}</label><input type="checkbox" name="take10"></div>` : ""}
      ${canTwice ? `<div class="form-group"><label>${L("SWSE.Talent.RollTwice")}</label><input type="checkbox" name="twice"></div>` : ""}
      ${canDevastate ? `<div class="form-group"><label>Devastating Power (${L("SWSE.Talent.FPCost")}, +50% ${L("SWSE.Attack.Dice")})</label><input type="checkbox" name="devastating"></div>` : ""}
    </div>`,
    buttons: [{ action: "use", label: L("SWSE.Force.Use"), default: true, callback: (e, b) => new foundry.applications.ux.FormDataExtended(b.form).object }],
    rejectClose: false
  });
  if (!res) return;

  let d20 = "1d20";
  if (res.take10 && canTake10) d20 = "10";
  else if (res.twice && canTwice && (await actor.spendForcePoint())) d20 = "2d20kh";
  let formula = `${d20} ${signed(actor.system.skills.useTheForce.total)}`;
  if (res.bonus) formula += ` ${/^[+-]/.test(res.bonus) ? res.bonus : "+" + res.bonus}`;
  if (res.forcePoint && canFP && (await actor.spendForcePoint())) formula += ` + ${actor.forcePointFormula}`;
  const roll = await new Roll(formula).evaluate();
  const nat = roll.dice[0]?.total ?? 10;
  const total = roll.total;

  // Maior CD alcançada
  const tiers = [...sys.dcs].sort((a, b) => a.dc - b.dc);
  const reached = tiers.filter(t => total >= t.dc).pop();
  const tierHtml = tiers.map(t => `<li class="${t === reached ? "reached" : total >= t.dc ? "passed" : "failed"}"><strong>CD ${t.dc}:</strong> ${t.text}</li>`).join("");

  // Alvos x defesa
  const targets = Array.from(game.user.targets).filter(t => t.actor);
  let targetHtml = "";
  const defense = sys.defense;
  const results = [];
  if (defense && targets.length) {
    targetHtml = `<ul class="target-results">`;
    for (const t of targets) {
      // Resist the Dark Side: +5 nas Defesas contra poderes [dark side]
      const resist = dark && t.actor.hasFeature?.("resist-the-dark-side") ? 5 : 0;
      const def = (t.actor.system.defenses?.[defense]?.total ?? 10) + resist;
      const success = total >= def;
      results.push({ uuid: t.actor.uuid, name: t.name, hit: success });
      targetHtml += `<li class="${success ? "hit" : "miss"}"><span class="tname">${t.name}</span><span class="tdef">${L(`SWSE.Defense.${defense}`)} ${game.user.isGM ? def : "—"}</span><span class="tstatus">${success ? L("SWSE.Success") : L("SWSE.Failure")}</span></li>`;
    }
    targetHtml += `</ul>`;
  }

  // Dano: primeiro "XdY" do nível alcançado, ou o campo damage
  let dmgRoll = null;
  let dmgFormula = "";
  if (sys.damage === "tier") dmgFormula = reached?.text.match(/\d+d\d+/)?.[0] ?? "";
  else if (sys.damage && (reached || !tiers.length)) dmgFormula = sys.damage;
  if (dmgFormula && res.devastating && canDevastate && (await actor.spendForcePoint())) {
    dmgFormula = dmgFormula.replace(/(\d+)d(\d+)/, (_, x, y) => `${Math.floor(Number(x) * 1.5)}d${y}`);
  }
  if (dmgFormula) dmgRoll = await new Roll(dmgFormula).evaluate();

  const updates = { "system.spent": Math.min(sys.uses, sys.spent + 1) };
  await power.update(updates);
  if (dark) await actor.update({ "system.darkSide.value": actor.system.darkSide.value + 1 });
  // 20 natural: recupera todos os poderes no fim do turno (aplicado já)
  if (nat === 20) await actor.recoverForcePowers();

  let payload = null;
  let buttons = "";
  if (dmgRoll) {
    payload = {
      type: "normal", ignoreDR: false, thresholdReduction: 0, drReduction: 0, extraSteps: 0, bonusSteps: 0, area: false,
      attacks: [{ base: dmgRoll.total, crit: dmgRoll.total, sneak: 0, results: results.map(r => ({ ...r, amount: r.hit ? dmgRoll.total : Math.floor(dmgRoll.total / 2) })) }]
    };
    buttons = `<div class="card-buttons">
      ${payload.attacks[0].results.map(r => `<button type="button" data-swse-action="apply-damage" data-attack="0" data-target="${r.uuid}" data-amount="${r.amount}">${L("SWSE.Attack.Apply")} ${r.amount} → ${r.name}</button>`).join("")}
      <button type="button" data-swse-action="apply-selected" data-attack="0" data-mult="1">${L("SWSE.Attack.ApplySelected")} (${dmgRoll.total})</button>
      <button type="button" data-swse-action="apply-selected" data-attack="0" data-mult="0.5">${L("SWSE.Attack.ApplySelectedHalf")}</button></div>`;
  }

  const content = `<div class="swse-card force-card">
    <header class="card-header"><img src="${power.img}" width="36" height="36"><h3>${power.name}</h3></header>
    ${sys.descriptors.length ? `<p class="descriptors">[${sys.descriptors.map(d => L(`SWSE.Descriptor.${d}`)).join(", ")}]</p>` : ""}
    ${await roll.render()}
    ${nat === 20 ? `<p class="crit">${L("SWSE.Force.Nat20")}</p>` : ""}
    <ul class="dc-tiers">${tierHtml}</ul>
    ${!reached && tiers.length ? `<p class="failure">${L("SWSE.Force.NoEffect")}</p>` : ""}
    ${targetHtml}
    ${dmgRoll ? `<div class="damage-roll"><strong>${L("SWSE.Damage")}:</strong> ${await dmgRoll.render()}</div>` : ""}
    ${buttons}
    ${sys.special ? `<p class="special"><strong>${L("SWSE.Special")}:</strong> ${sys.special}</p>` : ""}
    ${dark ? `<p class="note">${L("SWSE.Force.DarkSideIncrease")}</p>` : ""}
    ${rerollNote ? `<p class="note">${L("SWSE.Talent.DarkAdeptNote")}</p>` : ""}
    ${nat === 20 && sys.descriptors.includes("telekinetic") && actor.hasFeature("telekinetic-power") ? `<p class="note">${L("SWSE.Talent.TelekineticPowerNote")}</p>` : ""}
  </div>`;
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content,
    rolls: [roll, dmgRoll].filter(Boolean),
    flags: { [SYSTEM_ID]: { type: "force", actorUuid: actor.uuid, damage: payload } }
  });
}
