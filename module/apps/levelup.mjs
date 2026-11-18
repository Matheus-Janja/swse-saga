import { SWSE, SYSTEM_ID } from "../config.mjs";
import { checkPrereqs, profileFromActor } from "../helpers/prereqs.mjs";
import { promptChoice } from "../helpers/choices.mjs";
import { loadCompendia, annotate, itemData, abilityMod, babAt, FORCE_TREES, enforcePrereqs, rollHitPoints, skillLabel } from "./common.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const ABIL = ["str", "dex", "con", "int", "wis", "cha"];
const L = k => game.i18n.localize(k);

/**
 * Assistente de subida de nível: escolhe a classe, rola PV e guia talentos, feats, aumentos de atributo,
 * técnicas/segredos da Força e poderes, conforme a Tabela 3-1 e as tabelas de classe.
 */
export class LevelUpApp extends HandlebarsApplicationMixin(ApplicationV2) {
  constructor(options = {}) {
    super(options);
    this.actor = options.actor;
    this.state = {
      step: "class",
      classId: null,       // id do doc no compêndio (classe nova) ou "owned:<itemId>"
      hp: null, hpRoll: "",
      increases: [],
      multiclassFeat: null,
      levelFeat: null, bonusFeat: null,
      talent: null, technique: null, secret: null,
      newSkill: null,
      powers: {},
      filter: true
    };
    this._classUuid = options.classUuid ?? null;
  }

  static DEFAULT_OPTIONS = {
    id: "swse-levelup-{id}",
    classes: ["swse", "swse-wizard"],
    tag: "form",
    window: { title: "SWSE.LevelUp", icon: "fa-solid fa-angles-up", resizable: true },
    position: { width: 860, height: 720 },
    form: { handler: LevelUpApp.#onForm, submitOnChange: true, closeOnSubmit: false },
    actions: {
      next: LevelUpApp.#onNext,
      prev: LevelUpApp.#onPrev,
      selectClass: LevelUpApp.#onSelectClass,
      rollHP: LevelUpApp.#onRollHP,
      toggleIncrease: LevelUpApp.#onToggleIncrease,
      pickFeat: LevelUpApp.#onPickFeat,
      pickTalent: LevelUpApp.#onPickTalent,
      pickSkill: LevelUpApp.#onPickSkill,
      addPower: LevelUpApp.#onAddPower,
      removePower: LevelUpApp.#onRemovePower,
      showItem: LevelUpApp.#onShowItem,
      finish: LevelUpApp.#onFinish
    }
  };

  static PARTS = {
    body: { template: `systems/${SYSTEM_ID}/templates/apps/levelup.hbs`, scrollable: [".wizard-content"] }
  };

  get title() { return `${L("SWSE.LevelUp")}: ${this.actor.name}`; }

  /* ------------------------------------------------------------ */

  /** Documento da classe escolhida (do ator ou do compêndio) e se é nova. */
  get chosen() {
    const id = this.state.classId;
    if (!id) return null;
    if (id.startsWith("owned:")) {
      const item = this.actor.items.get(id.slice(6));
      return item ? { doc: item, owned: item, isNew: false, newLevel: item.system.levels + 1 } : null;
    }
    const doc = this._data.classes.find(c => c.id === id);
    if (!doc) return null;
    const owned = this.actor.items.find(i => i.type === "class" && i.system.key === doc.system.key);
    return owned ? { doc: owned, owned, isNew: false, newLevel: owned.system.levels + 1 } : { doc, owned: null, isNew: true, newLevel: 1 };
  }

  get newCharLevel() { return (this.actor.system.level || 0) + 1; }

  /** O que este nível concede. */
  gains() {
    const c = this.chosen;
    if (!c) return {};
    const sys = c.doc.system;
    const lvl = c.newLevel;
    const g = {};
    g.abilityIncrease = SWSE.abilityIncreaseLevels.includes(this.newCharLevel);
    g.levelFeat = SWSE.featLevels.includes(this.newCharLevel);
    g.bonusFeat = sys.bonusFeatLevels === "even" && lvl % 2 === 0 && sys.bonusFeats.length > 0;
    g.talent = sys.classType !== "nonheroic" && (sys.talentLevels === "every" || (sys.talentLevels === "odd" && lvl % 2 === 1));
    g.technique = sys.techniqueLevels === "even" && lvl % 2 === 0;
    g.secret = sys.secretLevels === "2plus" && lvl >= 2;
    g.multiclassFeat = c.isNew && sys.classType === "base" && this.actor.classes.length > 0;
    return g;
  }

  /** Perfil do personagem já no novo nível (para pré-requisitos). */
  profile() {
    const p = profileFromActor(this.actor);
    const c = this.chosen;
    if (c) {
      p.level = this.newCharLevel;
      p.bab = this.actor.system.bab + (babAt(c.doc.system.bab, c.newLevel) - babAt(c.doc.system.bab, c.newLevel - 1));
    }
    for (const a of this.state.increases) p.abilities[a] += 1;
    if (this.state.newSkill) p.trained.add(this.state.newSkill);
    const add = sel => {
      if (!sel) return;
      const doc = this.findDoc(sel.id);
      if (!doc) return;
      if (doc.type === "feat") p.feats.push({ key: doc.system.key, choice: sel.choice });
      else p.talents.push({ key: doc.system.key, choice: sel.choice, tree: doc.system.tree, category: doc.system.category });
    };
    [this.state.multiclassFeat, this.state.levelFeat, this.state.bonusFeat, this.state.talent, this.state.technique, this.state.secret].forEach(add);
    return p;
  }

  findDoc(id) {
    const d = this._data;
    return [...d.feats, ...d.talents, ...d.techniques, ...d.secrets].find(x => x.id === id);
  }

  /** Int aumentou o modificador? Concede uma perícia treinada nova. */
  intGain() {
    if (!this.state.increases.includes("int")) return false;
    const t = this.actor.system.abilities.int.total;
    return abilityMod(t + 1) > abilityMod(t);
  }

  /** Novos poderes da Força: Force Training escolhido agora, ou aumento do mod. de Sabedoria. */
  newPowers() {
    let n = 0;
    const ftOwned = this.actor.countFeature("force-training");
    const wis = this.actor.system.abilities.wis.total;
    const wisNow = Math.max(1, 1 + abilityMod(wis));
    const wisNew = Math.max(1, 1 + abilityMod(wis + (this.state.increases.includes("wis") ? 1 : 0)));
    n += ftOwned * (wisNew - wisNow);
    for (const sel of [this.state.multiclassFeat, this.state.levelFeat, this.state.bonusFeat]) {
      if (sel && this.findDoc(sel.id)?.system.key === "force-training") n += wisNew;
    }
    return n;
  }

  steps() {
    const g = this.gains();
    const out = ["class", "hp"];
    if (g.abilityIncrease) out.push("abilities");
    if (this.intGain()) out.push("skill");
    if (g.multiclassFeat) out.push("multiclass");
    if (g.levelFeat || g.bonusFeat) out.push("feats");
    if (g.talent) out.push("talent");
    if (g.technique || g.secret) out.push("forceExtras");
    if (this.newPowers() > 0) out.push("powers");
    out.push("review");
    return out;
  }

  validate(step = this.state.step) {
    const s = this.state;
    const g = this.gains();
    switch (step) {
      case "class": return this.chosen ? null : L("SWSE.CG.ErrClass");
      case "hp": return s.hp === null ? L("SWSE.LU.ErrHP") : null;
      case "abilities": return s.increases.length === 2 ? null : L("SWSE.LU.ErrIncreases");
      case "skill": return s.newSkill ? null : L("SWSE.LU.ErrSkill");
      case "multiclass": return s.multiclassFeat ? null : L("SWSE.CG.ErrFeat");
      case "feats":
        if (g.levelFeat && !s.levelFeat) return L("SWSE.CG.ErrFeat");
        if (g.bonusFeat && !s.bonusFeat) return L("SWSE.LU.ErrBonusFeat");
        return null;
      case "talent": return s.talent ? null : L("SWSE.CG.ErrTalent");
      case "forceExtras":
        if (g.technique && !s.technique) return L("SWSE.LU.ErrTechnique");
        if (g.secret && !s.secret) return L("SWSE.LU.ErrSecret");
        return null;
      case "powers": {
        const n = Object.values(s.powers).reduce((a, b) => a + b, 0);
        return n > this.newPowers() ? L("SWSE.CG.ErrTooManyPowers") : (n < this.newPowers() ? "warn" : null);
      }
      default: return null;
    }
  }

  /* ------------------------------------------------------------ */

  async _prepareContext(options) {
    this._data ??= await loadCompendia();
    if (this._classUuid && !this.state.classId) {
      const doc = this._data.classes.find(c => c.uuid === this._classUuid);
      if (doc) this.state.classId = doc.id;
      this._classUuid = null;
    }
    const s = this.state;
    const ctx = { state: s, isStep: { [s.step]: true }, actor: this.actor, newLevel: this.newCharLevel };
    const steps = this.steps();
    if (!steps.includes(s.step)) s.step = steps[0];
    ctx.isStep = { [s.step]: true };
    ctx.steps = steps.map((k, i) => ({ key: k, label: L(`SWSE.LU.Step.${k}`), active: k === s.step, n: i + 1, done: steps.indexOf(s.step) > i }));
    ctx.isFirst = steps.indexOf(s.step) === 0;
    ctx.isLast = s.step === "review";
    const err = this.validate();
    ctx.error = err && err !== "warn" ? err : null;
    const c = this.chosen;
    ctx.chosen = c ? { name: c.doc.name, level: c.newLevel, isNew: c.isNew, hitDie: c.doc.system.hitDie } : null;
    ctx.gains = this.gains();
    const profile = this.profile();
    const owned = this.actor.items.filter(i => ["feat", "talent"].includes(i.type)).map(i => i.system.key);
    const isNPC = this.actor.type === "npc";

    if (s.step === "class") {
      const ownedClasses = this.actor.classes.map(i => ({ id: `owned:${i.id}`, name: i.name, img: i.img, level: i.system.levels, ok: i.system.levels < (i.system.maxLevel || 20), selected: s.classId === `owned:${i.id}` || this.chosen?.owned?.id === i.id, missing: [] }));
      const others = this._data.classes.filter(d => !this.actor.classes.some(i => i.system.key === d.system.key))
        .filter(d => isNPC || d.system.classType !== "nonheroic")
        .map(d => {
          const res = d.system.classType === "prestige" ? checkPrereqs(profileFromActor(this.actor), d.system.prerequisites) : { ok: true, missing: [] };
          return { id: d.id, uuid: d.uuid, name: d.name, img: d.img, type: d.system.classType, ok: res.ok, missing: res.missing, prereq: d.system.prerequisites.text, selected: s.classId === d.id };
        });
      ctx.ownedClasses = ownedClasses;
      ctx.baseClasses = others.filter(o => o.type !== "prestige");
      ctx.prestigeClasses = others.filter(o => o.type === "prestige");
      ctx.enforce = enforcePrereqs();
    }
    if (s.step === "hp") {
      ctx.hp = s.hp;
      ctx.hpRoll = s.hpRoll;
      ctx.conMod = this.actor.system.abilities.con.mod;
      ctx.hpMethod = L(`SWSE.Settings.Hp${game.settings.get(SYSTEM_ID, "hpMethod").replace(/^\w/, x => x.toUpperCase())}`);
    }
    if (s.step === "abilities") {
      ctx.abilities = ABIL.map(a => ({ key: a, label: L(SWSE.abilities[a]), total: this.actor.system.abilities[a].total, selected: s.increases.includes(a) }));
    }
    if (s.step === "skill") {
      const classSkills = new Set(this.actor.classes.flatMap(i => i.system.classSkills));
      if (c?.isNew) c.doc.system.classSkills.forEach(k => classSkills.add(k));
      ctx.skillList = [...classSkills].filter(k => !this.actor.system.skills[k]?.isTrained).map(k => ({ key: k, label: skillLabel(k), selected: s.newSkill === k }));
    }
    const featList = (keys, sel) => {
      let docs = this._data.feats;
      if (keys) docs = docs.filter(d => keys.includes(d.system.key));
      let list = annotate(docs, profile, { selected: sel ? [sel.id] : [], owned });
      for (const f of list) if (f.selected) { f.ok = true; f.choiceValue = sel.choice; }
      if (s.filter && enforcePrereqs()) list = list.filter(f => f.ok || f.selected);
      return list;
    };
    if (s.step === "multiclass") ctx.multiclassList = featList(c.doc.system.startingFeats, s.multiclassFeat);
    if (s.step === "feats") {
      if (ctx.gains.levelFeat) ctx.levelFeatList = featList(null, s.levelFeat);
      if (ctx.gains.bonusFeat) ctx.bonusFeatList = featList(c.doc.system.bonusFeats, s.bonusFeat);
    }
    if (s.step === "talent") {
      const trees = [...c.doc.system.talentTrees];
      if (this.actor.derived.forceSensitive || profile.feats.some(f => f.key === "force-sensitivity")) for (const t of FORCE_TREES) if (!trees.includes(t)) trees.push(t);
      const list = annotate(this._data.talents.filter(t => trees.includes(t.system.tree)), profile, { selected: s.talent ? [s.talent.id] : [], owned });
      const groups = {};
      for (const t of list) {
        if (t.selected) { t.ok = true; t.choiceValue = s.talent.choice; }
        if (s.filter && enforcePrereqs() && !t.ok) continue;
        (groups[t.tree] ??= []).push(t);
      }
      ctx.talentGroups = trees.filter(t => groups[t]).map(t => ({ tree: t, list: groups[t] }));
    }
    if (s.step === "forceExtras") {
      if (ctx.gains.technique) {
        ctx.techniqueList = annotate(this._data.techniques, profile, { selected: s.technique ? [s.technique.id] : [], owned });
        for (const t of ctx.techniqueList) if (t.selected) { t.ok = true; t.choiceValue = s.technique.choice; }
      }
      if (ctx.gains.secret) {
        ctx.secretList = annotate(this._data.secrets, profile, { selected: s.secret ? [s.secret.id] : [], owned });
        for (const t of ctx.secretList) if (t.selected) t.ok = true;
      }
    }
    if (s.step === "powers") {
      ctx.powersAllowed = this.newPowers();
      ctx.powersChosen = Object.values(s.powers).reduce((a, b) => a + b, 0);
      ctx.powerList = this._data.powers.map(p => ({ id: p.id, name: p.name, img: p.img, count: s.powers[p.id] ?? 0, time: p.system.time }));
    }
    ctx.filter = s.filter;
    if (s.step === "review") ctx.review = this.reviewLines();
    return ctx;
  }

  reviewLines() {
    const s = this.state;
    const c = this.chosen;
    const name = sel => {
      if (!sel) return null;
      const d = this.findDoc(sel.id);
      return d ? d.name + (sel.choice ? ` (${sel.choice})` : "") : null;
    };
    const lines = [];
    if (c) lines.push(`${L("TYPES.Item.class")}: ${c.doc.name} ${c.newLevel} (${L("SWSE.Level")} ${this.newCharLevel})`);
    if (s.hp !== null) lines.push(`${L("SWSE.HP")}: +${Math.max(1, s.hp + this.actor.system.abilities.con.mod)} (d${c?.doc.system.hitDie}: ${s.hp})`);
    if (s.increases.length) lines.push(`${L("SWSE.LU.Step.abilities")}: ${s.increases.map(a => L(SWSE.abilityAbbr[a])).join(", ")} +1`);
    if (s.newSkill) lines.push(`${L("SWSE.TrainedSkills")}: ${skillLabel(s.newSkill)}`);
    for (const [k, sel] of [["multiclass", s.multiclassFeat], ["levelFeat", s.levelFeat], ["bonusFeat", s.bonusFeat], ["talent", s.talent], ["technique", s.technique], ["secret", s.secret]]) {
      const n = name(sel);
      if (n) lines.push(`${L(`SWSE.LU.Gain.${k}`)}: ${n}`);
    }
    const p = Object.entries(s.powers).map(([id, n]) => `${this._data.powers.find(x => x.id === id)?.name}${n > 1 ? ` ×${n}` : ""}`);
    if (p.length) lines.push(`${L("SWSE.ForcePowers")}: ${p.join(", ")}`);
    const babGain = c ? babAt(c.doc.system.bab, c.newLevel) - babAt(c.doc.system.bab, c.newLevel - 1) : 0;
    lines.push(`${L("SWSE.BAB")}: +${babGain}`);
    lines.push(L("SWSE.LU.FPReset"));
    if (c?.isNew && c.doc.system.classType === "prestige") lines.push(L("SWSE.LU.PrestigeDefenses"));
    return lines;
  }

  /* ------------------------------------------------------------ */

  static #onForm(event, form, formData) {
    const d = foundry.utils.expandObject(formData.object);
    if ("filter" in d) this.state.filter = !!d.filter;
    if ("hp" in d && d.hp !== "" && d.hp !== null) this.state.hp = Number(d.hp);
    this.render();
  }

  static #onNext() {
    const err = this.validate();
    if (err && err !== "warn") return ui.notifications.warn(err);
    const steps = this.steps();
    const i = steps.indexOf(this.state.step);
    if (i < steps.length - 1) this.state.step = steps[i + 1];
    this.render();
  }

  static #onPrev() {
    const steps = this.steps();
    const i = steps.indexOf(this.state.step);
    if (i > 0) this.state.step = steps[i - 1];
    this.render();
  }

  static #onSelectClass(event, target) {
    const id = target.dataset.id;
    if (target.dataset.blocked === "true" && enforcePrereqs()) return ui.notifications.warn(L("SWSE.LU.PrereqsNotMet"));
    if (this.state.classId !== id) {
      Object.assign(this.state, { classId: id, hp: null, hpRoll: "", multiclassFeat: null, bonusFeat: null, talent: null, technique: null, secret: null });
    }
    this.render();
  }

  static async #onRollHP() {
    const c = this.chosen;
    if (!c) return;
    const r = await rollHitPoints(c.doc.system.hitDie);
    this.state.hp = r.value;
    this.state.hpRoll = r.roll ? `1d${c.doc.system.hitDie} = ${r.value}` : `${r.value}`;
    if (r.roll) r.roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), flavor: `${L("SWSE.LevelUp")}: ${L("SWSE.HP")} (${c.doc.name})` });
    this.render();
  }

  static #onToggleIncrease(event, target) {
    const a = target.dataset.ability;
    const inc = this.state.increases;
    if (inc.includes(a)) this.state.increases = inc.filter(x => x !== a);
    else if (inc.length < 2) inc.push(a);
    else ui.notifications.warn(L("SWSE.LU.ErrIncreases"));
    this.render();
  }

  static #onPickSkill(event, target) {
    this.state.newSkill = target.dataset.skill;
    this.render();
  }

  async #pick(slot, id) {
    const s = this.state;
    if (s[slot]?.id === id) { s[slot] = null; return this.render(); }
    const doc = this.findDoc(id);
    let choice = doc.system.choice?.value ?? "";
    if (doc.system.choice?.type && !choice) {
      choice = await promptChoice(this.actor, doc.toObject(), this.profile());
      if (choice === null) return;
    }
    s[slot] = { id, choice };
    this.render();
  }

  static #onPickFeat(event, target) { return this.#pick(target.dataset.slot, target.dataset.id); }
  static #onPickTalent(event, target) { return this.#pick(target.dataset.slot ?? "talent", target.dataset.id); }

  static #onAddPower(event, target) {
    const n = Object.values(this.state.powers).reduce((a, b) => a + b, 0);
    if (n >= this.newPowers()) return ui.notifications.warn(L("SWSE.CG.ErrTooManyPowers"));
    this.state.powers[target.dataset.id] = (this.state.powers[target.dataset.id] ?? 0) + 1;
    this.render();
  }

  static #onRemovePower(event, target) {
    const id = target.dataset.id;
    if (!this.state.powers[id]) return;
    if (!--this.state.powers[id]) delete this.state.powers[id];
    this.render();
  }

  static async #onShowItem(event, target) {
    (await fromUuid(target.dataset.uuid))?.sheet.render({ force: true });
  }

  static async #onFinish() {
    for (const st of this.steps()) {
      const err = this.validate(st);
      if (err && err !== "warn") { this.state.step = st; this.render(); return ui.notifications.warn(err); }
    }
    const s = this.state;
    const actor = this.actor;
    const c = this.chosen;

    // Classe
    if (c.isNew) {
      await actor.createEmbeddedDocuments("Item", [itemData(c.doc, { system: { levels: 1, isStartingClass: false, hpRolls: [s.hp] } })]);
    } else {
      await c.owned.update({ "system.levels": c.owned.system.levels + 1, "system.hpRolls": [...c.owned.system.hpRolls, s.hp] });
    }

    // Atributos e perícia
    const updates = {};
    for (const a of s.increases) updates[`system.abilities.${a}.increase`] = actor.system.abilities[a].increase + 1;
    if (s.newSkill) updates[`system.skills.${s.newSkill}.trained`] = true;
    if (Object.keys(updates).length) await actor.update(updates);

    // Feats, talentos, técnicas, segredos
    const items = [];
    for (const sel of [s.multiclassFeat, s.levelFeat, s.bonusFeat, s.talent, s.technique, s.secret]) {
      if (!sel) continue;
      const doc = this.findDoc(sel.id);
      if (doc) items.push(itemData(doc, sel.choice ? { system: { choice: { value: sel.choice } } } : {}));
    }
    // Poderes
    for (const [id, n] of Object.entries(s.powers)) {
      const doc = this._data.powers.find(p => p.id === id);
      const existing = actor.items.find(i => i.type === "forcePower" && i.system.key === doc?.system.key);
      if (existing) await existing.update({ "system.uses": existing.system.uses + n });
      else if (doc) items.push(itemData(doc, { system: { uses: n, spent: 0 } }));
    }
    if (items.length) await actor.createEmbeddedDocuments("Item", items);

    // PV atuais sobem junto; Pontos da Força são renovados (sobras se perdem)
    const gain = Math.max(1, s.hp + actor.system.abilities.con.mod);
    await actor.update({
      "system.hp.value": Math.min(actor.system.hp.max, actor.system.hp.value + gain),
      "system.forcePoints.value": actor.system.forcePoints.max,
      "system.destinyPoints.value": actor.system.destinyPoints.value + (actor.type === "character" ? 1 : 0)
    });
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: `<div class="swse-card"><h3>${L("SWSE.LevelUp")}: ${actor.name}</h3><ul>${this.reviewLines().map(l => `<li>${l}</li>`).join("")}</ul></div>`
    });
    this.close();
  }
}
