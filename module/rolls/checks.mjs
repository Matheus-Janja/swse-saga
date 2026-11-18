import { SYSTEM_ID } from "../config.mjs";

const signed = n => (n >= 0 ? `+${n}` : `${n}`);

/**
 * Pergunta opções de um teste (bônus situacional, gastar Ponto da Força, take 10/20).
 * @returns {Promise<object|null>}
 */
export async function checkDialog(actor, { label, allowTake = true, skill = null } = {}) {
  const fp = actor.system.forcePoints?.value ?? 0;
  const assured = skill && actor.hasFeature?.("assured-skill", skill);
  const content = `
    <div class="swse-dialog">
      <div class="form-group"><label>${game.i18n.localize("SWSE.SituationalBonus")}</label>
        <input type="text" name="bonus" value="" placeholder="+2"></div>
      <div class="form-group"><label>${game.i18n.localize("SWSE.SpendForcePoint")} (${fp})</label>
        <input type="checkbox" name="forcePoint" ${fp ? "" : "disabled"}></div>
      ${assured ? `<div class="form-group"><label>Assured Skill (2d20, sem bônus de competência)</label><input type="checkbox" name="assured"></div>` : ""}
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
    const res = await checkDialog(actor, { label: o.label, skill: o.skill });
    if (!res) return null;
    opts = { ...opts, ...res };
  }
  const has = (k, c) => !!actor.hasFeature?.(k, c);
  const sk = o.skill;
  const extraNotes = [];
  let base = "1d20";
  let bonus = o.bonus ?? 0;
  let preRoll = null;
  if (opts.take) base = String(opts.take);
  else if (opts.assured && sk) {
    // Assured Skill (Galaxy of Intrigue): 2 dados, sem bônus de competência
    base = "2d20kh";
    const comp = [actor.derived?.modifiers?.[`skills.${sk}`], actor.derived?.modifiers?.["skills.all"]]
      .flatMap(m => m?.parts ?? []).filter(x => x.type === "competence").reduce((a, x) => a + x.value, 0);
    bonus -= comp;
    extraNotes.push(`Assured Skill${comp ? ` (−${comp} de competência)` : ""}`);
  } else if (sk && has("exceptional-skill", sk)) {
    // Exceptional Skill: 2–7 no dado contam como 8
    preRoll = await new Roll("1d20").evaluate();
    const v = preRoll.total;
    base = String(v >= 2 && v <= 7 ? 8 : v);
    if (v >= 2 && v <= 7) extraNotes.push(`Exceptional Skill: ${v} → 8`);
  }
  const terms = [base, signed(bonus)];
  if (opts.bonus) terms.push(String(opts.bonus).startsWith("+") || String(opts.bonus).startsWith("-") ? opts.bonus : `+${opts.bonus}`);
  if (opts.forcePoint) {
    if (await actor.spendForcePoint()) {
      let fpf = actor.forcePointFormula;
      // Skill Boon: dado do Ponto da Força sobe um passo por talento na perícia; Reliable Boon: rerrola 1s
      const boons = sk ? actor.countFeature?.("skill-boon", sk) ?? 0 : 0;
      if (boons) fpf = fpf.replace(/d(\d+)/, (_, d) => `d${Math.min(12, Number(d) + 2 * boons)}`);
      if (sk && has("reliable-boon")) fpf = fpf.replace(/(\d+d\d+)/, "$1rr1");
      if (boons || (sk && has("reliable-boon"))) extraNotes.push([boons ? "Skill Boon" : "", sk && has("reliable-boon") ? "Reliable Boon" : ""].filter(Boolean).join(", "));
      terms.push(`+${fpf}`);
    }
  }
  const roll = await new Roll(terms.join(" ")).evaluate();
  let d20 = roll.dice[0]?.faces === 20 && roll.dice[0].number === 1 ? roll.dice[0].total : null;
  if (preRoll) d20 = preRoll.total;
  const kept = roll.dice[0]?.faces === 20 && roll.dice[0].number === 2 ? roll.dice[0].total : null;
  const natural = d20 ?? kept;
  if (sk && natural) {
    // Critical Skill Success / Skill Confidence (Galaxy of Intrigue)
    const confidence = has("skill-confidence", sk) && natural >= 19;
    if ((natural === 20 && has("critical-skill-success")) || confidence) extraNotes.push(game.i18n.localize("SWSE.Skill.CriticalSuccessNote"));
    if (confidence && actor.isOwner) {
      const n = Math.max(0, actor.system.abilities?.cha?.mod ?? 0);
      if (n) { await actor.gainTempHP?.(n); extraNotes.push(`Skill Confidence: +${n} PV temporários`); }
    }
  }
  const rerollBtns = (o.rerolls ?? []).map(r => `<button type="button" data-swse-action="reroll" data-skill="${o.skill}" data-keep="${r.keep}" data-bonus="${roll.total - (preRoll ? Number(base) : (natural ?? 0))}" data-first="${roll.total}">
      ${game.i18n.localize("SWSE.Reroll")} (${r.label || r.source}${r.keep === "best" ? ", " + game.i18n.localize("SWSE.KeepBest") : ""})</button>`).join("");
  if (sk && o.dc && roll.total < o.dc && has("skillful-recovery", sk)) extraNotes.push(game.i18n.localize("SWSE.Skill.SkillfulRecoveryNote"));
  // Rastreador de desafios de perícia: botão para o Mestre registrar o teste
  const challengeBtn = sk && game.settings.get(SYSTEM_ID, "skillChallenge")?.active
    ? `<button type="button" data-swse-action="challenge">${game.i18n.localize("SWSE.Challenge.ApplyCheck")}</button>` : "";
  const dcLine = o.dc ? `<p class="dc ${roll.total >= o.dc ? "success" : "failure"}">CD ${o.dc}: ${roll.total >= o.dc ? game.i18n.localize("SWSE.Success") : game.i18n.localize("SWSE.Failure")}</p>` : "";
  const nat = d20 === 20 ? `<p class="crit">${game.i18n.localize("SWSE.Natural20")}</p>` : d20 === 1 ? `<p class="fumble">${game.i18n.localize("SWSE.Natural1")}</p>` : "";
  const notesHtml = extraNotes.filter(Boolean).map(n => `<p class="note">${n}</p>`).join("");
  const btns = rerollBtns + challengeBtn;
  const content = `<div class="swse-card check-card"><h3>${o.label}</h3>${preRoll ? await preRoll.render() : ""}${await roll.render()}${nat}${dcLine}${notesHtml}${o.extraHtml ?? ""}${btns ? `<div class="card-buttons">${btns}</div>` : ""}</div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content,
    rolls: [preRoll, roll].filter(Boolean),
    flags: { [SYSTEM_ID]: { type: "check", skill: o.skill, actorUuid: actor.uuid, total: roll.total, fp: !!opts.forcePoint } }
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
  const skill = message.getFlag(SYSTEM_ID, "skill");
  const challengeBtn = skill && game.settings.get(SYSTEM_ID, "skillChallenge")?.active
    ? `<div class="card-buttons"><button type="button" data-swse-action="challenge">${game.i18n.localize("SWSE.Challenge.ApplyCheck")}</button></div>` : "";
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: [roll],
    content: `<div class="swse-card check-card"><h3>${game.i18n.localize("SWSE.Reroll")}</h3>${await roll.render()}
      <p>${game.i18n.format("SWSE.RerollResult", { first, second: roll.total, kept })}</p>${challengeBtn}</div>`,
    flags: { [SYSTEM_ID]: { type: "check", skill, actorUuid: actor.uuid, total: kept, reroll: true } }
  });
}
