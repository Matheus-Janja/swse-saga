import { SWSE, SYSTEM_ID } from "../config.mjs";
import { weaponProfileFrom, isProficientCtx, effectiveGroup as groupCtx, unarmedDamageCtx } from "../rules/weapon.mjs";

const signed = n => (n >= 0 ? `+${n}` : `${n}`);

/** Adiciona n dados ao primeiro termo XdY de uma fórmula. */
export function addDice(formula, n) {
  if (!n) return formula;
  return formula.replace(/(d+)d(d+)/, (_, x, y) => `${Number(x) + n}d${y}`);
}

/** Contexto puro (rules/weapon.mjs) a partir de um ator do Foundry. */
export function weaponCtx(actor) {
  const sys = actor.system;
  return {
    abilities: sys.abilities, bab: sys.bab, halfLevel: sys.halfLevel, damageHalfLevel: actor.derived.damageHalfLevel, conditionPenalty: sys.conditionPenalty,
    size: actor.derived.size ?? "medium", species: actor.species?.system.key ?? "",
    modifiers: actor.derived.modifiers ?? {}, armorPenalty: actor.derived.armor?.penalty ?? 0,
    features: actor.items.filter(i => ["feat", "talent"].includes(i.type)).map(i => ({ key: i.system.key, choice: i.system.choice?.value })),
    classLevels: actor.derived.classLevels ?? {},
    droidAppendage: actor.derived.droidAppendage ?? null
  };
}

export const unarmedDamage = (actor, weapon) => unarmedDamageCtx(weaponCtx(actor), weapon);
export const effectiveGroup = (actor, weapon) => groupCtx(weaponCtx(actor), weapon);
export const isProficient = (actor, weapon) => isProficientCtx(weaponCtx(actor), weapon);

/** Informações estáticas do ataque com uma arma (sem opções situacionais). */
export function weaponProfile(actor, weapon) {
  return weaponProfileFrom(weaponCtx(actor), weapon);
}

/** Monta o HTML do diálogo de ataque com apenas as opções que o personagem pode usar. */
function dialogContent(actor, weapon, p) {
  const has = k => actor.hasFeature(k);
  const row = (html, show = true) => (show ? `<div class="form-group">${html}</div>` : "");
  const check = (name, label, show = true, checked = false) => row(`<label>${label}</label><input type="checkbox" name="${name}" ${checked ? "checked" : ""}>`, show);
  const L = k => game.i18n.localize(k);
  const ranged = !p.melee;
  const bab = actor.system.bab;
  const rangeOpts = Object.entries(SWSE.rangeBands).map(([k, v]) => `<option value="${k}">${L(v.label)}</option>`).join("");
  const sneak = actor.countFeature("sneak-attack");
  const rageAvailable = actor.species?.system.key === "wookiee" || has("channel-anger");
  return `<div class="swse-dialog attack-dialog">
    <p class="summary">${weapon.name}: ${signed(p.attackBonus)} · ${weapon.system.damage}${signed(p.damageBonus)}
      ${p.proficient ? "" : `<br><strong class="warn">${L("SWSE.Attack.NotProficient")}</strong>`}</p>
    ${row(`<label>${L("SWSE.Attack.Mode")}</label><select name="mode">
        <option value="single">${L("SWSE.Attack.ModeSingle")}</option>
        ${p.canDouble ? `<option value="double">${L("SWSE.Attack.ModeDouble")}</option>` : ""}
        ${p.canTriple ? `<option value="triple">${L("SWSE.Attack.ModeTriple")}</option>` : ""}
      </select>`)}
    ${check("twoWeapon", L("SWSE.Attack.TwoWeapon"))}
    ${ranged ? row(`<label>${L("SWSE.Attack.Range")}</label><select name="range">${rangeOpts}</select>`) : ""}
    ${ranged && p.autofire ? row(`<label>${L("SWSE.Attack.FireMode")}</label><select name="fire">
        ${p.autofireOnly ? "" : `<option value="single">${L("SWSE.Attack.FireSingle")}</option>`}
        <option value="autofire">${L("SWSE.Attack.FireAutofire")}</option>
        ${has("burst-fire") ? `<option value="burst">${L("SWSE.Attack.FireBurst")}</option>` : ""}
      </select>`) : ""}
    ${check("braced", L("SWSE.Attack.Braced"), ranged && p.autofire)}
    ${check("aim", L("SWSE.Attack.Aim") + (has("careful-shot") ? " (+1)" : "") + (has("deadeye") ? " (+1 dado)" : ""), ranged)}
    ${check("intoMelee", L("SWSE.Attack.IntoMelee") + (has("precise-shot") ? " (Precise Shot)" : ""), ranged)}
    ${check("rapidShot", L("SWSE.Attack.RapidShot"), ranged && has("rapid-shot"))}
    ${check("rapidStrike", L("SWSE.Attack.RapidStrike"), p.melee && has("rapid-strike"))}
    ${check("mightySwing", L("SWSE.Attack.MightySwing"), p.melee && has("mighty-swing"))}
    ${p.melee && has("power-attack") ? row(`<label>${L("SWSE.Attack.PowerAttack")} (0–${bab})</label><input type="number" name="powerAttack" value="0" min="0" max="${bab}">`) : ""}
    ${check("charge", L("SWSE.Attack.Charge"), p.melee)}
    ${check("flatFooted", L("SWSE.Attack.FlatFooted") + (sneak ? ` (Sneak Attack +${Math.min(sneak, 10)}d6)` : ""), true)}
    ${check("huntersTarget", L("SWSE.Attack.HuntersTarget"), has("hunters-target"))}
    ${check("familiarFoe", L("SWSE.Attack.FamiliarFoe"), actor.classLevel("bounty-hunter") >= 2)}
    ${check("rage", L("SWSE.Attack.Rage"), p.melee && rageAvailable)}
    ${check("stun", L("SWSE.Attack.Stun"), weapon.system.stun)}
    ${check("forcePoint", `${L("SWSE.SpendForcePoint")} (${actor.system.forcePoints.value})`, actor.system.forcePoints.value > 0)}
    ${row(`<label>${L("SWSE.Attack.MiscAttack")}</label><input type="text" name="miscAttack" value="" placeholder="+1">`)}
    ${row(`<label>${L("SWSE.Attack.MiscDamage")}</label><input type="text" name="miscDamage" value="" placeholder="+1d6">`)}
  </div>`;
}

/**
 * Abre o diálogo e executa o ataque.
 * @param {Actor} actor
 * @param {Item} weapon
 * @param {object} [options]  {skipDialog:boolean}
 */
export async function attackWithWeapon(actor, weapon, options = {}) {
  const p = weaponProfile(actor, weapon);
  let form = { mode: "single", range: "pointBlank", fire: p.autofireOnly ? "autofire" : "single", powerAttack: 0 };
  if (!options.skipDialog) {
    const res = await foundry.applications.api.DialogV2.wait({
      window: { title: `${game.i18n.localize("SWSE.Attack.Title")}: ${weapon.name}` },
      position: { width: 420 },
      content: dialogContent(actor, weapon, p),
      buttons: [{
        action: "attack", label: game.i18n.localize("SWSE.Attack.Roll"), default: true,
        callback: (event, button) => new foundry.applications.ux.FormDataExtended(button.form).object
      }],
      rejectClose: false
    });
    if (!res) return null;
    form = { ...form, ...res };
  }
  return resolveAttack(actor, weapon, p, form);
}

/** Calcula penalidades/bônus situacionais e rola. */
export async function resolveAttack(actor, weapon, p, f) {
  const L = k => game.i18n.localize(k);
  const has = k => actor.hasFeature(k);
  const abil = actor.system.abilities;
  const atk = [];   // [label, valor]
  const dmg = [];
  let extraDice = 0;
  let area = !!weapon.system.area;
  let shots = 1;
  const notes = [];
  const bonusSteps = [];

  // Modo de ataque múltiplo
  const nAttacks = (f.mode === "triple" ? 3 : f.mode === "double" ? 2 : 1) + (f.twoWeapon ? 1 : 0);
  if (f.mode === "double") atk.push(["Double Attack", Math.min(0, -5 + p.multiattackReduction)]);
  if (f.mode === "triple") atk.push(["Triple Attack", Math.min(0, -10 + p.multiattackReduction)]);
  if (f.twoWeapon) {
    const pen = has("dual-weapon-mastery-iii") ? 0 : has("dual-weapon-mastery-ii") ? -2 : has("dual-weapon-mastery-i") ? -5 : -10;
    if (pen) atk.push([L("SWSE.Attack.TwoWeapon"), pen]);
  }

  if (!p.melee) {
    const band = SWSE.rangeBands[f.range] ?? SWSE.rangeBands.pointBlank;
    const rangePen = has("far-shot") ? band.farShot : band.penalty;
    if (rangePen) atk.push([L(band.label), rangePen]);
    if (f.range === "pointBlank" && has("point-blank-shot")) { atk.push(["Point Blank Shot", 1]); dmg.push(["Point Blank Shot", 1]); }
    // Arma precisa: sem penalidade em alcance curto. Arma imprecisa: não pode atacar em alcance longo.
    if (weapon.system.accurate && f.range === "short" && rangePen) atk.push([L("SWSE.Weapon.accurate"), -rangePen]);
    if (weapon.system.inaccurate && f.range === "long") notes.push(L("SWSE.Attack.InaccurateLong"));
    if (f.intoMelee && !has("precise-shot")) atk.push([L("SWSE.Attack.IntoMelee"), -5]);
    if (f.aim) {
      if (has("careful-shot")) atk.push(["Careful Shot", 1]);
      if (has("deadeye")) extraDice += 1;
      if (has("debilitating-shot") || has("hunters-mark")) bonusSteps.push(has("hunters-mark") ? "Hunter's Mark" : "Debilitating Shot");
      notes.push(L("SWSE.Attack.AimNote"));
    }
    if (f.rapidShot) {
      const pen = has("trigger-work") ? 0 : abil.str.total >= 13 ? -2 : -5;
      if (pen) atk.push(["Rapid Shot", pen]);
      extraDice += 1;
      shots = Math.max(shots, 2);
    }
    if (f.fire === "autofire") {
      area = true;
      let pen = -5;
      if (has("controlled-burst")) pen = f.braced && p.autofireOnly ? 0 : -2;
      else if (f.braced && p.autofireOnly) pen = -2;
      if (pen) atk.push(["Autofire", pen]);
      shots = 10;
      notes.push(L("SWSE.Attack.AutofireNote"));
    } else if (f.fire === "burst") {
      let pen = abil.str.total >= 13 ? -5 : -10;
      if (has("controlled-burst")) pen = -2;
      atk.push(["Burst Fire", pen]);
      extraDice += 2;
      shots = 10;
    }
  } else {
    if (f.rapidStrike) {
      const pen = abil.dex.total >= 13 || p.light ? -2 : -5;
      atk.push(["Rapid Strike", pen]);
      extraDice += 1;
    }
    if (f.mightySwing) extraDice += 1;
    const pa = Math.clamp(Number(f.powerAttack) || 0, 0, actor.system.bab);
    if (pa) {
      atk.push(["Power Attack", -pa]);
      dmg.push(["Power Attack", p.twoHanded ? pa * 2 : pa]);
    }
    if (f.charge) { atk.push([L("SWSE.Attack.Charge"), 2]); notes.push(L("SWSE.Attack.ChargeNote")); }
    if (f.rage) {
      const r = has("dreadful-rage") ? 4 : 2;
      atk.push([L("SWSE.Attack.Rage"), r]); dmg.push([L("SWSE.Attack.Rage"), r]);
    }
  }
  if (f.familiarFoe) atk.push(["Familiar Foe", Math.floor(actor.classLevel("bounty-hunter") / 2)]);
  if (f.huntersTarget) dmg.push(["Hunter's Target", actor.classLevel("bounty-hunter")]);
  let sneakDice = 0;
  if (f.flatFooted) {
    sneakDice = Math.min(actor.countFeature("sneak-attack"), 10);
    if (has("dastardly-strike")) bonusSteps.push("Dastardly Strike");
  }

  // Munição
  const ammo = weapon.system.ammo;
  if (ammo?.max > 0) {
    if (ammo.value < shots) {
      ui.notifications.warn(game.i18n.format("SWSE.Warn.NoAmmo", { name: weapon.name }));
      return null;
    }
    await weapon.update({ "system.ammo.value": ammo.value - shots });
  }

  // Ponto da Força no ataque
  let fpTerm = "";
  if (f.forcePoint && (await actor.spendForcePoint())) fpTerm = ` + ${actor.forcePointFormula}`;

  const situational = atk.reduce((a, [, v]) => a + v, 0);
  const atkTotalBonus = p.attackBonus + situational;
  const miscAtk = f.miscAttack ? ` ${/^[+-]/.test(f.miscAttack) ? f.miscAttack : "+" + f.miscAttack}` : "";
  const dmgBonus = p.damageBonus + dmg.reduce((a, [, v]) => a + v, 0);
  const miscDmg = f.miscDamage ? ` ${/^[+-]/.test(f.miscDamage) ? f.miscDamage : "+" + f.miscDamage}` : "";

  const targets = Array.from(game.user.targets).map(t => t.actor ? { token: t, actor: t.actor } : null).filter(Boolean);
  const damageType = f.stun ? "stun" : weapon.system.ion ? "ion" : "normal";

  const attacks = [];
  for (let i = 0; i < nAttacks; i++) {
    const useSecondHead = f.twoWeapon && i === nAttacks - 1 && weapon.system.double && weapon.system.damage2;
    const baseDice = addDice(useSecondHead ? weapon.system.damage2 : unarmedDamage(actor, weapon), extraDice);
    const atkRoll = await new Roll(`1d20 ${signed(atkTotalBonus)}${miscAtk}${i === 0 ? fpTerm : ""}`).evaluate();
    const nat = atkRoll.dice[0].total;
    const dmgFormula = `${baseDice} ${signed(dmgBonus)}${miscDmg}`;
    const dmgRoll = await new Roll(dmgFormula).evaluate();
    let sneakRoll = null;
    if (sneakDice) sneakRoll = await new Roll(`${sneakDice}d6`).evaluate();
    const crit = nat >= p.critRange;
    const autoHit = nat === 20;
    const autoMiss = nat === 1;
    const baseDamage = Math.max(1, dmgRoll.total);
    const critDamage = baseDamage * p.critMultiplier;
    const results = targets.map(({ token, actor: ta }) => {
      const reflex = ta.system.defenses?.reflex?.total ?? 10;
      let hit = !autoMiss && (autoHit || atkRoll.total >= reflex);
      if (area && !autoMiss && atkRoll.total < 10) hit = false;
      const isCrit = hit && crit && !area && (nat === 20 || atkRoll.total >= reflex);
      let amount = isCrit ? critDamage : baseDamage;
      if (hit && sneakRoll) amount += sneakRoll.total;
      const evasion = ta.hasFeature?.("evasion");
      let mult = 1;
      if (area) mult = hit ? (evasion ? 0.5 : 1) : (evasion ? 0 : 0.5);
      else if (!hit) mult = 0;
      return {
        uuid: ta.uuid, name: token.name, reflex, hit, crit: isCrit,
        amount: Math.floor(amount * mult), evasion
      };
    });
    attacks.push({ atkRoll, dmgRoll, sneakRoll, nat, crit: crit && !autoMiss, results, baseDamage, critDamage, formula: dmgFormula });
  }

  // --- Cartão de chat ---
  const partsLine = Object.entries(p.attackParts).filter(([, v]) => v).map(([k, v]) => `${L(`SWSE.Part.${k}`)} ${signed(v)}`)
    .concat(atk.map(([l, v]) => `${l} ${signed(v)}`)).join(", ");
  const dmgLine = Object.entries(p.damageParts).filter(([, v]) => v).map(([k, v]) => `${L(`SWSE.Part.${k}`)} ${signed(v)}`)
    .concat(dmg.map(([l, v]) => `${l} ${signed(v)}`)).concat(extraDice ? [`+${extraDice} ${L("SWSE.Attack.Dice")}`] : []).join(", ");

  const payload = {
    type: damageType,
    ignoreDR: !!weapon.system.ignoresDR,
    thresholdReduction: p.thresholdReduction,
    drReduction: p.drReduction,
    extraSteps: p.melee && has("stunning-strike") ? 1 : 0,
    bonusSteps: bonusSteps.length,
    area,
    attacks: attacks.map(a => ({ base: a.baseDamage, crit: a.critDamage, sneak: a.sneakRoll?.total ?? 0, results: a.results }))
  };

  let html = `<div class="swse-card attack-card">
    <header class="card-header"><img src="${weapon.img}" width="36" height="36"><h3>${weapon.name}</h3></header>
    <p class="parts"><strong>${L("SWSE.Attack.Label")}:</strong> ${partsLine}</p>
    <p class="parts"><strong>${L("SWSE.Damage")}:</strong> ${dmgLine || "—"}${damageType !== "normal" ? ` (${L(`SWSE.DamageKind.${damageType}`)})` : ""}</p>`;
  for (const [i, a] of attacks.entries()) {
    html += `<section class="attack-entry">
      ${nAttacks > 1 ? `<h4>${L("SWSE.Attack.Label")} ${i + 1}</h4>` : ""}
      ${await a.atkRoll.render()}
      ${a.nat === 20 ? `<p class="crit">${L("SWSE.Natural20")}${a.crit && !area ? " — " + L("SWSE.Attack.Critical") : ""}</p>` : a.crit && !area ? `<p class="crit">${L("SWSE.Attack.CriticalThreat")}</p>` : ""}
      ${a.nat === 1 ? `<p class="fumble">${L("SWSE.Natural1")}</p>` : ""}
      <div class="damage-roll"><strong>${L("SWSE.Damage")}:</strong> ${await a.dmgRoll.render()}
        ${a.sneakRoll ? `<p>Sneak Attack: +${a.sneakRoll.total}</p>` : ""}
        ${a.crit && !area ? `<p class="crit">${L("SWSE.Attack.CriticalDamage")}: ${a.critDamage} (×${p.critMultiplier})</p>` : ""}
      </div>`;
    if (a.results.length) {
      html += `<ul class="target-results">`;
      for (const r of a.results) {
        const status = r.crit ? L("SWSE.Attack.Critical") : r.hit ? L("SWSE.Attack.Hit") : L("SWSE.Attack.Miss");
        html += `<li class="${r.hit ? "hit" : "miss"}"><span class="tname">${r.name}</span>
          <span class="tdef">${L("SWSE.Defense.reflexAbbr")} ${game.user.isGM ? r.reflex : "—"}</span>
          <span class="tstatus">${status}${r.evasion && area ? " (Evasion)" : ""}</span>
          ${r.amount > 0 ? `<button type="button" data-swse-action="apply-damage" data-attack="${i}" data-target="${r.uuid}" data-amount="${r.amount}">${L("SWSE.Attack.Apply")} ${r.amount}</button>` : ""}
        </li>`;
      }
      html += `</ul>`;
    }
    html += `<div class="card-buttons">
      <button type="button" data-swse-action="apply-selected" data-attack="${i}" data-mult="1">${L("SWSE.Attack.ApplySelected")} (${a.baseDamage + (a.sneakRoll?.total ?? 0)})</button>
      ${a.crit && !area ? `<button type="button" data-swse-action="apply-selected" data-attack="${i}" data-crit="1">${L("SWSE.Attack.ApplySelectedCrit")} (${a.critDamage + (a.sneakRoll?.total ?? 0)})</button>` : ""}
      <button type="button" data-swse-action="apply-selected" data-attack="${i}" data-mult="0.5">${L("SWSE.Attack.ApplySelectedHalf")}</button>
    </div></section>`;
  }
  if (bonusSteps.length) notes.push(game.i18n.format("SWSE.Attack.BonusStepsNote", { list: bonusSteps.join(", ") }));
  if (p.thresholdReduction) notes.push(game.i18n.format("SWSE.Attack.DevastatingNote", { n: p.thresholdReduction }));
  if (payload.extraSteps) notes.push(L("SWSE.Attack.StunningStrikeNote"));
  if (notes.length) html += `<ul class="notes">${notes.map(n => `<li>${n}</li>`).join("")}</ul>`;
  html += `</div>`;

  const rolls = attacks.flatMap(a => [a.atkRoll, a.dmgRoll, a.sneakRoll].filter(Boolean));
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: html,
    rolls,
    flags: { [SYSTEM_ID]: { type: "attack", actorUuid: actor.uuid, itemUuid: weapon.uuid, damage: payload } }
  });
}
