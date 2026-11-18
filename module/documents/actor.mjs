import { SWSE, SYSTEM_ID } from "../config.mjs";
import { rollCheck } from "../rolls/checks.mjs";

export class SWSEActor extends Actor {
  /* -------------------------------------------- */
  /*  Consultas                                   */
  /* -------------------------------------------- */

  get species() { return this.items.find(i => i.type === "species") ?? null; }
  get classes() { return this.items.filter(i => i.type === "class"); }
  get derived() { return this.system.derived ?? {}; }

  /** Possui feat/talento com a chave (e, opcionalmente, a escolha)? */
  hasFeature(key, choice) {
    return this.items.some(i => ["feat", "talent"].includes(i.type) && i.system.key === key
      && (choice === undefined || i.system.choice?.value === choice));
  }

  countFeature(key, choice) {
    return this.items.filter(i => ["feat", "talent"].includes(i.type) && i.system.key === key
      && (choice === undefined || i.system.choice?.value === choice)).length;
  }

  featureChoices(key) {
    return this.items.filter(i => ["feat", "talent"].includes(i.type) && i.system.key === key)
      .map(i => i.system.choice?.value).filter(Boolean);
  }

  classLevel(key) {
    return this.classes.filter(c => c.system.key === key).reduce((a, c) => a + (c.system.levels || 0), 0);
  }

  /** Rerrolagens concedidas (espécie e talentos) para uma perícia. */
  getRerolls(skill) {
    const out = [];
    const sources = [this.species, ...this.items.filter(i => i.type === "talent")].filter(Boolean);
    for (const s of sources) {
      for (const r of s.system.rerolls ?? []) {
        if (r.skill === skill || r.skill === "all") out.push({ ...r, source: s.name });
      }
    }
    return out;
  }

  getRollData() {
    return { ...super.getRollData(), ...(this.system.getRollData?.() ?? {}) };
  }

  /* -------------------------------------------- */
  /*  Criação                                     */
  /* -------------------------------------------- */

  async _preCreate(data, options, user) {
    if ((await super._preCreate(data, options, user)) === false) return false;
    const prototypeToken = { bar1: { attribute: "hp" }, bar2: { attribute: "forcePoints" } };
    if (this.type === "character") Object.assign(prototypeToken, { actorLink: true, disposition: CONST.TOKEN_DISPOSITIONS.FRIENDLY });
    this.updateSource({ prototypeToken });
  }

  /* -------------------------------------------- */
  /*  Testes                                      */
  /* -------------------------------------------- */

  async rollSkill(key, options = {}) {
    const skill = this.system.skills[key];
    const cfg = SWSE.skills[key];
    if (!skill || !cfg) return;
    if (!skill.usable) {
      ui.notifications.warn(game.i18n.localize("SWSE.Warn.NeedForceSensitivity"));
      return;
    }
    const label = game.i18n.localize(cfg.label);
    return rollCheck(this, {
      bonus: skill.total,
      label: `${game.i18n.localize("SWSE.SkillCheck")}: ${label}`,
      flavorParts: skill.parts,
      skill: key,
      rerolls: this.getRerolls(key),
      ...options
    });
  }

  async rollAbility(key, options = {}) {
    const ab = this.system.abilities[key];
    return rollCheck(this, {
      bonus: ab.mod + this.system.conditionPenalty,
      label: `${game.i18n.localize("SWSE.AbilityCheck")}: ${game.i18n.localize(SWSE.abilities[key])}`,
      ...options
    });
  }

  async rollInitiative(options = {}) {
    if (!game.combat) return this.rollSkill("initiative", options);
    return super.rollInitiative({ createCombatants: true, ...options });
  }

  /* -------------------------------------------- */
  /*  Recursos                                    */
  /* -------------------------------------------- */

  async spendForcePoint() {
    const fp = this.system.forcePoints.value;
    if (fp <= 0) {
      ui.notifications.warn(game.i18n.localize("SWSE.Warn.NoForcePoints"));
      return false;
    }
    await this.update({ "system.forcePoints.value": fp - 1 });
    return true;
  }

  /** Fórmula do dado de Ponto da Força: 1dX, 2dXkh ou 3dXkh. */
  get forcePointFormula() {
    const n = this.derived.forcePointDice ?? 1;
    const die = this.derived.forcePointDie ?? "d6";
    return n > 1 ? `${n}${die}kh` : `1${die}`;
  }

  async secondWind() {
    const used = this.system.secondWind.used;
    const uses = this.derived.secondWind?.uses ?? 0;
    if (used >= uses) return ui.notifications.warn(game.i18n.localize("SWSE.Warn.NoSecondWind"));
    const hp = this.system.hp;
    if (hp.value > Math.floor(hp.max / 2)) {
      const ok = await foundry.applications.api.DialogV2.confirm({
        window: { title: game.i18n.localize("SWSE.SecondWind") },
        content: `<p>${game.i18n.localize("SWSE.SecondWindAboveHalf")}</p>`
      });
      if (!ok) return;
    }
    let heal = this.derived.secondWind.heal;
    let extra = "";
    // Force Recovery: +1d6 por Ponto da Força que possui (máx. 10d6)
    if (this.hasFeature("force-recovery") && this.system.forcePoints.value > 0) {
      const n = Math.min(this.system.forcePoints.value, 10);
      const r = await new Roll(`${n}d6`).evaluate();
      heal += r.total;
      extra = ` (+${r.total} Force Recovery)`;
    }
    const newHp = Math.min(hp.max, hp.value + heal);
    await this.update({ "system.hp.value": newHp, "system.secondWind.used": used + 1 });
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: `<div class="swse-card"><h3>${game.i18n.localize("SWSE.SecondWind")}</h3><p>${game.i18n.format("SWSE.HealedFor", { amount: heal })}${extra} → ${newHp}/${hp.max}</p></div>`
    });
  }

  async shiftCondition(delta) {
    const step = Math.clamp(this.system.condition.step + delta, 0, 5);
    await this.update({ "system.condition.step": step });
    return step;
  }

  /** Descanso prolongado: recupera second wind, Pontos da Força não (só ao subir de nível), poderes, PV naturais. */
  async rest({ natural = true } = {}) {
    const updates = { "system.secondWind.used": 0 };
    if (natural) updates["system.hp.value"] = Math.min(this.system.hp.max, this.system.hp.value + this.system.level);
    if (!this.system.condition.persistent) updates["system.condition.step"] = 0;
    await this.update(updates);
    await this.recoverForcePowers();
    ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: `<div class="swse-card"><p>${game.i18n.localize("SWSE.Rested")}</p></div>` });
  }

  async recoverForcePowers() {
    const updates = this.items.filter(i => i.type === "forcePower" && i.system.spent > 0).map(i => ({ _id: i.id, "system.spent": 0 }));
    if (updates.length) await this.updateEmbeddedDocuments("Item", updates);
  }

  /* -------------------------------------------- */
  /*  Dano                                        */
  /* -------------------------------------------- */

  /**
   * Aplica dano seguindo as regras de Limiar de Dano.
   * @param {number} amount
   * @param {object} opts
   * @param {"normal"|"stun"|"ion"} [opts.type]
   * @param {number} [opts.thresholdReduction]  Ex.: Devastating Attack (5) / Greater (10)
   * @param {number} [opts.drReduction]         Ex.: Penetrating Attack
   * @param {boolean} [opts.ignoreDR]           Ex.: Sabres de luz
   * @param {number} [opts.extraSteps]          Passos extras na trilha se exceder o limiar (Stunning Strike, etc.)
   */
  async applyDamage(amount, opts = {}) {
    amount = Math.max(0, Math.floor(Number(amount) || 0));
    const type = opts.type ?? "normal";
    const isDroid = !!this.system.derived?.isDroid;
    const dt = this.system.damageThreshold.total - (opts.thresholdReduction || 0);
    // Shield Rating: reduz o dano; dano >= SR reduz o SR em 5
    const sr = this.system.shieldRating || 0;
    let srUpdate = null;
    if (sr > 0 && amount > 0 && type !== "stun") {
      if (amount >= sr) srUpdate = Math.max(0, sr - 5);
      amount = Math.max(0, amount - sr);
    }
    let dr = opts.ignoreDR ? 0 : Math.max(0, (this.system.damageReduction || 0) - (opts.drReduction || 0));
    const hp = this.system.hp;
    let toHp = Math.max(0, amount - dr);
    let steps = 0;
    const notes = [];
    if (dr && toHp < amount) notes.push(game.i18n.format("SWSE.Chat.DRApplied", { dr }));

    if (type === "stun") {
      if (isDroid) { toHp = 0; notes.push(game.i18n.localize("SWSE.Chat.DroidImmuneStun")); }
      else {
        if (amount >= dt) steps = 2;
        toHp = Math.floor(toHp / 2);
      }
    } else if (type === "ion") {
      if (isDroid) {
        if (amount >= dt) steps = 2;
        toHp = Math.floor(toHp / 2);
      } else {
        toHp = Math.floor(toHp / 4);
      }
    } else if (amount >= dt) {
      steps = 1 + (opts.extraSteps || 0);
    }

    // PV temporários primeiro
    let temp = hp.temp;
    const absorbed = Math.min(temp, toHp);
    temp -= absorbed;
    const newHp = Math.max(0, hp.value - (toHp - absorbed));
    const updates = { "system.hp.value": newHp, "system.hp.temp": temp };
    let step = this.system.condition.step;
    if (steps) {
      step = Math.min(5, step + steps);
      updates["system.condition.step"] = step;
      notes.push(game.i18n.format("SWSE.Chat.ThresholdExceeded", { dt, steps }));
    }
    let status = "";
    if (newHp <= 0) {
      if (type === "stun" || type === "ion") status = game.i18n.localize("SWSE.Chat.Unconscious");
      else if (this.type === "npc" && !this.system.heroicLevel) status = game.i18n.localize("SWSE.Chat.Dead");
      else if (amount >= dt) status = game.i18n.localize("SWSE.Chat.Dead");
      else { status = game.i18n.localize("SWSE.Chat.Unconscious"); updates["system.condition.step"] = 5; }
    } else if (step >= 5) status = game.i18n.localize("SWSE.Chat.Helpless");
    if (srUpdate !== null) { updates["system.shieldRating"] = srUpdate; notes.push(game.i18n.format("SWSE.Chat.ShieldDown", { sr: srUpdate })); }
    await this.update(updates);

    const condLabel = game.i18n.localize(SWSE.conditionTrack[updates["system.condition.step"] ?? step].label);
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      whisper: this.hasPlayerOwner ? [] : ChatMessage.getWhisperRecipients("GM"),
      content: `<div class="swse-card damage-card"><h3>${this.name}</h3>
        <p>${game.i18n.format("SWSE.Chat.TookDamage", { amount: toHp, raw: amount, type: game.i18n.localize(`SWSE.DamageKind.${type}`) })}</p>
        <p>${game.i18n.localize("SWSE.HP")}: ${newHp}/${hp.max} · ${game.i18n.localize("SWSE.Condition.label")}: ${condLabel}</p>
        ${notes.map(n => `<p class="note">${n}</p>`).join("")}
        ${status ? `<p class="status">${status}</p>` : ""}</div>`
    });
    return { toHp, steps, newHp };
  }

  async applyHealing(amount) {
    const hp = this.system.hp;
    await this.update({ "system.hp.value": Math.min(hp.max, hp.value + Math.max(0, Math.floor(amount))) });
  }

  /* -------------------------------------------- */
  /*  Nível                                       */
  /* -------------------------------------------- */

  /** Atualiza Pontos da Força para o máximo (regra: ao ganhar nível, sobras se perdem). */
  async resetForcePoints() {
    await this.update({ "system.forcePoints.value": this.system.forcePoints.max });
  }

  static get systemId() { return SYSTEM_ID; }
}
