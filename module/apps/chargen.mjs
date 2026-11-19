import { SWSE, SYSTEM_ID } from "../config.mjs";
import { pointBuySpent } from "../rules/calc.mjs";
import { systemCost, sizeAllowed, locomotionSpeed, BASE_LOCOMOTION, FREE_SYSTEMS, DROID_BUDGET, DROID_POINT_BUY, DROID_ARRAY, COST_FACTOR } from "../rules/droid.mjs";
import { checkPrereqs } from "../helpers/prereqs.mjs";
import { promptChoice } from "../helpers/choices.mjs";
import { loadCompendia, annotate, itemData, abilityMod, babAt, FORCE_TREES, extraTrees, enforcePrereqs, skillLabel } from "./common.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const ABIL = ["str", "dex", "con", "int", "wis", "cha"];
const STEPS = ["abilities", "species", "class", "skills", "feats", "talent", "force", "systems", "equipment", "review"];
const L = k => game.i18n.localize(k);

/**
 * Assistente de criação de personagem (1º nível), seguindo o passo a passo do Cap. 1 do livro.
 */
export class CharacterCreator extends HandlebarsApplicationMixin(ApplicationV2) {
  constructor(options = {}) {
    super(options);
    this.actor = options.actor ?? null;
    const methods = game.settings.get(SYSTEM_ID, "abilityMethods");
    this.wiz = {
      step: "abilities",
      method: methods === "all" ? "pointBuy" : methods,
      pb: Object.fromEntries(ABIL.map(a => [a, 8])),
      pool: [...SWSE.standardArray],
      assign: Object.fromEntries(ABIL.map(a => [a, ""])),
      rolledDetail: [],
      speciesId: null,
      classId: null,
      trained: [],
      feats: [],        // [{id, choice}]
      speciesFeats: [], // escolhidos pelo bônus de espécie (humano)
      talent: null,     // {id, choice}
      powers: {},       // id -> quantidade
      name: this.actor?.name ?? "",
      credits: null,
      creditsRoll: "",
      purchases: [],    // uuids
      featFilter: true,
      talentFilter: true,
      droid: false,
      droidBuys: []     // ids de sistemas de droide comprados (em ordem)
    };
  }

  static DEFAULT_OPTIONS = {
    id: "swse-chargen-{id}",
    classes: ["swse", "swse-wizard"],
    tag: "form",
    window: { title: "SWSE.CharacterCreator", icon: "fa-solid fa-wand-magic-sparkles", resizable: true },
    position: { width: 900, height: 760 },
    form: { handler: CharacterCreator.#onForm, submitOnChange: true, closeOnSubmit: false },
    actions: {
      next: CharacterCreator.#onNext,
      prev: CharacterCreator.#onPrev,
      goto: CharacterCreator.#onGoto,
      pbInc: CharacterCreator.#onPbInc,
      pbDec: CharacterCreator.#onPbDec,
      rollAbilities: CharacterCreator.#onRollAbilities,
      useArray: CharacterCreator.#onUseArray,
      selectSpecies: CharacterCreator.#onSelectSpecies,
      selectClass: CharacterCreator.#onSelectClass,
      toggleSkill: CharacterCreator.#onToggleSkill,
      toggleFeat: CharacterCreator.#onToggleFeat,
      toggleSpeciesFeat: CharacterCreator.#onToggleSpeciesFeat,
      selectTalent: CharacterCreator.#onSelectTalent,
      addPower: CharacterCreator.#onAddPower,
      removePower: CharacterCreator.#onRemovePower,
      rollCredits: CharacterCreator.#onRollCredits,
      buy: CharacterCreator.#onBuy,
      unbuy: CharacterCreator.#onUnbuy,
      showItem: CharacterCreator.#onShowItem,
      addSystem: CharacterCreator.#onAddSystem,
      removeSystem: CharacterCreator.#onRemoveSystem,
      finish: CharacterCreator.#onFinish
    }
  };

  static PARTS = {
    body: { template: `systems/${SYSTEM_ID}/templates/apps/chargen.hbs`, scrollable: [".wizard-content"] }
  };

  get title() { return `${L("SWSE.CharacterCreator")}${this.actor ? `: ${this.actor.name}` : ""}`; }

  /** Limita a altura inicial à área visível da tela. */
  _initializeApplicationOptions(options) {
    options = super._initializeApplicationOptions(options);
    if (options.position?.height && typeof options.position.height === "number") {
      options.position.height = Math.min(options.position.height, window.innerHeight - 40);
    }
    return options;
  }


  /* ------------------------------------------------------------ */
  /*  Estado derivado                                             */
  /* ------------------------------------------------------------ */

  get species() { return this._data?.species.find(s => s.id === this.wiz.speciesId) ?? null; }
  get cls() { return this._data?.classes.find(c => c.id === this.wiz.classId) ?? null; }

  /** Atributos usados (droides não têm Constituição). */
  get abil() { return this.wiz.droid ? ABIL.filter(a => a !== "con") : ABIL; }
  get pbTotal() { return this.wiz.droid ? DROID_POINT_BUY : SWSE.pointBuyTotal; }
  get stdArray() { return this.wiz.droid ? [...DROID_ARRAY] : [...SWSE.standardArray]; }

  /** Valores de atributo antes da espécie. */
  baseScores() {
    const s = this.wiz;
    if (s.method === "pointBuy") return Object.fromEntries(this.abil.map(a => [a, s.pb[a]]));
    const out = {};
    for (const a of this.abil) {
      const idx = s.assign[a];
      out[a] = idx === "" || idx === undefined ? null : s.pool[Number(idx)];
    }
    return out;
  }

  finalScores() {
    const base = this.baseScores();
    const mods = this.species?.system.abilityMods ?? {};
    return Object.fromEntries(ABIL.map(a => [a, base[a] === null || base[a] === undefined || (this.wiz.droid && a === "con") ? null : base[a] + (mods[a] || 0)]));
  }

  /** Feats automáticos: iniciais da classe (com regras de espécie primitiva e pré-requisito) + espécie + condicionais. */
  autoFeats() {
    const out = [];
    const cls = this.cls;
    const sp = this.species;
    const profile = this.profile({ includeAuto: false });
    if (cls) {
      for (const key of cls.system.startingFeats) {
        if (sp?.system.primitive && ["weapon-proficiency-pistols", "weapon-proficiency-rifles", "weapon-proficiency-heavy"].includes(key)) continue;
        const doc = this._data.feats.find(f => f.system.key === key);
        if (!doc) continue;
        const ok = checkPrereqs(profile, doc.system.prerequisites).ok;
        out.push({ doc, source: cls.name, ok });
      }
    }
    if (sp) {
      for (const key of sp.system.bonusFeats) {
        const doc = this._data.feats.find(f => f.system.key === key);
        if (doc) out.push({ doc, source: sp.name, ok: true });
      }
      for (const c of sp.system.conditionalFeats) {
        if (!this.wiz.trained.includes(c.skill)) continue;
        const doc = this._data.feats.find(f => f.system.key === c.feat);
        if (doc) out.push({ doc, source: sp.name, ok: true, choice: c.skill });
      }
    }
    return out;
  }

  featSlots() { return 1 + (this.species?.system.bonusFeatChoices ?? 0); }

  trainedAllowed() {
    const cls = this.cls;
    if (!cls) return 0;
    const int = this.finalScores().int ?? 10;
    return Math.max(1, cls.system.trainedSkills + abilityMod(int)) + (this.species?.system.bonusTrainedSkills ?? 0);
  }

  /** Perfil para checar pré-requisitos com as escolhas atuais. */
  profile({ includeAuto = true } = {}) {
    const scores = this.finalScores();
    const cls = this.cls;
    const feats = [];
    if (includeAuto && this._data) for (const f of this.autoFeats().filter(f => f.ok)) feats.push({ key: f.doc.system.key, choice: f.choice });
    for (const f of [...this.wiz.feats, ...this.wiz.speciesFeats]) {
      const doc = this._data?.feats.find(d => d.id === f.id);
      if (doc) feats.push({ key: doc.system.key, choice: f.choice });
    }
    const talents = [];
    if (this.wiz.talent) {
      const t = this._data?.talents.find(d => d.id === this.wiz.talent.id);
      if (t) talents.push({ key: t.system.key, choice: this.wiz.talent.choice, tree: t.system.tree, category: t.system.category });
    }
    return {
      abilities: Object.fromEntries(ABIL.map(a => [a, scores[a] ?? (this.wiz.droid && a === "con" ? 0 : 10)])),
      bab: cls ? babAt(cls.system.bab, 1) : 0,
      level: 1,
      trained: new Set(this.wiz.trained),
      feats, talents,
      forcePowers: new Set(Object.keys(this.wiz.powers).map(id => this._data?.powers.find(p => p.id === id)?.system.key).filter(Boolean)),
      species: this.species?.system.key ?? "",
      size: this.species?.system.size ?? "medium",
      darkSide: 0,
      droid: !!this.species?.system.droid
    };
  }

  hasFeatKey(key) { return this.profile().feats.some(f => f.key === key); }

  powersAllowed() {
    const n = this.profile().feats.filter(f => f.key === "force-training").length;
    return n * Math.max(1, 1 + abilityMod(this.finalScores().wis ?? 10));
  }

  steps() {
    return STEPS.filter(s => (s !== "force" || this.powersAllowed() > 0) && (s !== "systems" || this.wiz.droid));
  }

  /** Valida o passo atual; retorna mensagem de erro ou null. */
  validate(step = this.wiz.step) {
    const s = this.wiz;
    switch (step) {
      case "abilities": {
        const base = this.baseScores();
        if (this.abil.some(a => base[a] === null)) return L("SWSE.CG.ErrAssignAll");
        if (s.method !== "pointBuy") {
          const used = this.abil.map(a => s.assign[a]);
          if (new Set(used).size !== used.length) return L("SWSE.CG.ErrDuplicateAssign");
        } else if (pointBuySpent(base) > this.pbTotal) return L("SWSE.CG.ErrPointBuy");
        return null;
      }
      case "species": return this.species && !!this.species.system.droid === s.droid ? null : L("SWSE.CG.ErrSpecies");
      case "systems": return this.droidSpent() > DROID_BUDGET ? L("SWSE.Droid.ErrBudget") : null;
      case "class": return this.cls && !(s.droid && this.cls.system.key === "jedi") ? null : L("SWSE.CG.ErrClass");
      case "skills": return s.trained.length > this.trainedAllowed() ? L("SWSE.CG.ErrTooManySkills") : (s.trained.length < this.trainedAllowed() ? "warn" : null);
      case "feats": {
        if (s.feats.length !== 1) return L("SWSE.CG.ErrFeat");
        if (s.speciesFeats.length !== (this.species?.system.bonusFeatChoices ?? 0)) return L("SWSE.CG.ErrSpeciesFeat");
        return null;
      }
      case "talent": return s.talent ? null : L("SWSE.CG.ErrTalent");
      case "force": {
        const n = Object.values(s.powers).reduce((a, b) => a + b, 0);
        return n > this.powersAllowed() ? L("SWSE.CG.ErrTooManyPowers") : (n < this.powersAllowed() ? "warn" : null);
      }
      default: return null;
    }
  }

  /* ------------------------------------------------------------ */
  /*  Contexto                                                    */
  /* ------------------------------------------------------------ */

  async _prepareContext(options) {
    this._data ??= await loadCompendia();
    const s = this.wiz;
    const ctx = { state: s, step: s.step, isStep: { [s.step]: true } };
    const methodsSetting = game.settings.get(SYSTEM_ID, "abilityMethods");
    ctx.methods = [
      { key: "pointBuy", label: L("SWSE.Settings.MethodPointBuy") },
      { key: "array", label: L("SWSE.Settings.MethodArray") },
      { key: "roll", label: L("SWSE.Settings.MethodRoll") }
    ].filter(m => methodsSetting === "all" || m.key === methodsSetting);
    const stepList = this.steps();
    ctx.steps = stepList.map((k, i) => ({ key: k, label: L(`SWSE.CG.Step.${k}`), active: k === s.step, n: i + 1, done: stepList.indexOf(s.step) > i }));
    ctx.isFirst = stepList.indexOf(s.step) === 0;
    ctx.isLast = s.step === "review";
    const err = this.validate();
    ctx.error = err && err !== "warn" ? err : null;
    ctx.warn = err === "warn";

    const scores = this.finalScores();
    const base = this.baseScores();
    ctx.isDroid = s.droid;
    ctx.pbTotal = this.pbTotal;
    ctx.abilities = this.abil.map(a => ({
      key: a, label: L(SWSE.abilities[a]), abbr: L(SWSE.abilityAbbr[a]),
      base: base[a], species: this.species?.system.abilityMods?.[a] ?? 0, final: scores[a],
      mod: scores[a] === null ? null : abilityMod(scores[a]), pb: s.pb[a], cost: SWSE.pointBuyCost[s.pb[a]],
      assign: s.assign[a]
    }));
    ctx.pool = s.pool.map((v, i) => ({ index: String(i), value: v }));
    ctx.pbSpent = pointBuySpent(Object.fromEntries(this.abil.map(a => [a, s.pb[a]])));
    ctx.pbLeft = this.pbTotal - ctx.pbSpent;
    ctx.canReroll = s.method === "roll" && s.pool.length === this.abil.length
      && (s.pool.reduce((a, v) => a + abilityMod(v), 0) <= 0 || Math.max(...s.pool) <= 13);

    if (s.step === "species") {
      ctx.speciesList = this._data.species.filter(sp => !!sp.system.droid === s.droid).map(sp => ({
        id: sp.id, name: sp.name, img: sp.img, selected: sp.id === s.speciesId,
        mods: ABIL.filter(a => sp.system.abilityMods[a]).map(a => `${L(SWSE.abilityAbbr[a])} ${sp.system.abilityMods[a] > 0 ? "+" : ""}${sp.system.abilityMods[a]}`).join(", ") || "—",
        size: L(SWSE.sizes[sp.system.size]?.label), speed: sp.system.speed,
        traits: sp.system.traits, description: sp.system.description
      }));
      ctx.selectedSpecies = ctx.speciesList.find(x => x.selected);
    }
    if (s.step === "class") {
      ctx.classList = this._data.classes.filter(c => c.system.classType === "base" && !(s.droid && c.system.key === "jedi")).map(c => ({
        id: c.id, name: c.name, img: c.img, selected: c.id === s.classId,
        hp: c.system.startingHP, hitDie: c.system.hitDie, bab: babAt(c.system.bab, 1),
        defenses: Object.entries(c.system.defenses).filter(([, v]) => v).map(([k, v]) => `${L(SWSE.defenses[k])} +${v}`).join(", "),
        trained: c.system.trainedSkills,
        skills: c.system.classSkills.map(skillLabel).join(", "),
        feats: c.system.startingFeats.map(k => this._data.feats.find(f => f.system.key === k)?.name ?? k).join(", "),
        trees: c.system.talentTrees.join(", "), credits: c.system.credits, description: c.system.description
      }));
      ctx.selectedClass = ctx.classList.find(x => x.selected);
    }
    if (s.step === "skills") {
      const cls = this.cls;
      ctx.trainedAllowed = this.trainedAllowed();
      ctx.trainedCount = s.trained.length;
      ctx.skillList = Object.keys(SWSE.skills).map(k => ({
        key: k, label: skillLabel(k), ability: L(SWSE.abilityAbbr[SWSE.skills[k].ability]),
        classSkill: cls?.system.classSkills.includes(k), checked: s.trained.includes(k)
      })).filter(x => x.classSkill);
    }
    if (s.step === "feats") {
      const profile = this.profile();
      ctx.autoFeats = this.autoFeats().map(f => ({ name: f.doc.name + (f.choice ? ` (${skillLabel(f.choice)})` : ""), source: f.source, ok: f.ok, missing: f.ok ? "" : f.doc.system.prerequisites.text }));
      const owned = this.autoFeats().filter(f => f.ok).map(f => f.doc.system.key);
      let list = annotate(this._data.feats, profile, { selected: s.feats.map(f => f.id), owned });
      for (const f of list) {
        const st = s.feats.find(x => x.id === f.id);
        if (st?.choice) f.choiceValue = st.choice;
        if (f.selected) f.ok = true;
      }
      if (s.featFilter && enforcePrereqs()) list = list.filter(f => f.ok || f.selected);
      ctx.featList = list;
      ctx.speciesFeatSlots = this.species?.system.bonusFeatChoices ?? 0;
      if (ctx.speciesFeatSlots) {
        let list2 = annotate(this._data.feats, profile, { selected: s.speciesFeats.map(f => f.id), owned });
        for (const f of list2) {
          const st = s.speciesFeats.find(x => x.id === f.id);
          if (st?.choice) f.choiceValue = st.choice;
          if (f.selected) f.ok = true;
        }
        if (s.featFilter && enforcePrereqs()) list2 = list2.filter(f => f.ok || f.selected);
        ctx.speciesFeatList = list2;
      }
    }
    if (s.step === "talent") {
      const profile = this.profile();
      const trees = [...(this.cls?.system.talentTrees ?? [])];
      for (const t of extraTrees(this._data.talents, { force: this.hasFeatKey("force-sensitivity"), droidDegree: this.species?.system.droidDegree ?? 0 })) if (!trees.includes(t)) trees.push(t);
      const list = annotate(this._data.talents.filter(t => trees.includes(t.system.tree)), profile, { selected: s.talent ? [s.talent.id] : [] });
      const groups = {};
      for (const t of list) {
        if (t.selected) { t.ok = true; t.choiceValue = s.talent.choice; }
        if (s.talentFilter && enforcePrereqs() && !t.ok) continue;
        (groups[t.tree] ??= []).push(t);
      }
      ctx.talentGroups = trees.filter(t => groups[t]).map(t => ({ tree: t, force: FORCE_TREES.includes(t) || this._data.talents.some(x => x.system.tree === t && x.system.category === "forceTalent"), list: groups[t] }));
    }
    if (s.step === "force") {
      ctx.powersAllowed = this.powersAllowed();
      ctx.powersChosen = Object.values(s.powers).reduce((a, b) => a + b, 0);
      ctx.powerList = this._data.powers.map(p => ({
        id: p.id, name: p.name, img: p.img, count: s.powers[p.id] ?? 0, time: p.system.time,
        descriptors: p.system.descriptors.map(d => L(`SWSE.Descriptor.${d}`)).join(", "), description: p.system.description
      }));
    }
    if (s.step === "systems") Object.assign(ctx, this.systemsContext());
    if (s.step === "equipment") {
      ctx.credits = s.credits;
      ctx.creditsFormula = this.cls?.system.credits;
      ctx.spent = this.purchaseTotal();
      ctx.left = (s.credits ?? 0) - ctx.spent;
      const toRow = d => ({ uuid: d.uuid, name: d.name, img: d.img, cost: d.system.cost, affordable: d.system.cost <= ctx.left, availability: d.system.availability });
      ctx.shop = [
        { label: L("SWSE.Weapons"), list: this._data.weapons.filter(w => w.system.cost > 0).map(toRow) },
        { label: L("SWSE.ArmorLabel"), list: this._data.armor.filter(a => a.system.cost > 0).map(toRow) },
        { label: L("SWSE.Equipment"), list: this._data.equipment.map(toRow) }
      ];
      ctx.purchases = s.purchases.map((u, i) => {
        const d = this.findByUuid(u);
        return { index: i, name: d?.name, cost: d?.system.cost ?? 0 };
      });
      ctx.freeItems = this.freeItems().map(d => d.name).join(", ");
    }
    if (s.step === "review") ctx.review = this.reviewData();
    return ctx;
  }

  /* ------------------------------------------------------------ */
  /*  Sistemas de droide                                          */
  /* ------------------------------------------------------------ */

  get droidSize() { return this.species?.system.size ?? "medium"; }

  /** Sistemas instalados: gratuitos (processador heurístico, 2 mãos, locomoção básica) + comprados, com custo. */
  droidInstalled() {
    const size = this.droidSize;
    const find = key => this._data.droidSystems.find(d => d.system.key === key);
    const free = [...FREE_SYSTEMS, BASE_LOCOMOTION[size] ?? "walking-locomotion"].map(find).filter(Boolean);
    const walking = find("walking-locomotion");
    const walkingCost = walking ? systemCost(walking.system, size, { locomotionIndex: 0 }) : 0;
    let locoIndex = 1;
    const out = free.map(doc => ({ doc, cost: 0, free: true }));
    for (const id of this.wiz.droidBuys) {
      const doc = this._data.droidSystems.find(d => d.id === id);
      if (!doc) continue;
      const loco = doc.system.category === "locomotion";
      const cost = this.costOf(doc, { locomotionIndex: loco ? locoIndex : 0, walkingCost });
      if (loco) locoIndex++;
      out.push({ doc, cost, free: false });
    }
    return out;
  }

  costOf(doc, ctx = {}) {
    if (doc.type === "armor") return (doc.system.costBase || 0) * (COST_FACTOR[this.droidSize] ?? 1);
    return systemCost(doc.system, this.droidSize, ctx);
  }

  droidSpent() { return !this.wiz.droid ? 0 : this.droidInstalled().reduce((a, x) => a + x.cost, 0); }

  systemsContext() {
    const size = this.droidSize;
    const installed = this.droidInstalled();
    const spent = installed.reduce((a, x) => a + x.cost, 0);
    const left = DROID_BUDGET - spent;
    const keys = installed.map(x => x.doc.system.key);
    const hasWalking = keys.includes("walking-locomotion");
    const locoCount = installed.filter(x => x.doc.system.category === "locomotion").length;
    const walking = this._data.droidSystems.find(d => d.system.key === "walking-locomotion");
    const walkingCost = walking ? systemCost(walking.system, size, { locomotionIndex: 0 }) : 0;
    const hidden = new Set(["basic-processor", "heuristic-processor", "remote-receiver", "backup-processor", "synchronized-fire-circuits", "remote-processor-5", "remote-processor-50", "remote-processor-500", "remote-processor-5000"]);
    const groups = {};
    for (const doc of this._data.droidSystems) {
      const sys = doc.system;
      if (hidden.has(sys.key)) continue;
      const loco = sys.category === "locomotion";
      if (loco && keys.includes(sys.key)) continue;
      const cost = this.costOf(doc, { locomotionIndex: loco ? locoCount : 0, walkingCost });
      let allowed = sizeAllowed(sys, size);
      if (["climbing-claws", "jump-servos", "extra-legs"].includes(sys.key) && !hasWalking) allowed = false;
      if (doc.type === "armor" && installed.some(x => x.doc.type === "armor")) allowed = false;
      const group = doc.type === "armor" ? L("SWSE.ArmorLabel") : L(SWSE.droidSystemCategories[sys.category] ?? sys.category);
      (groups[group] ??= []).push({
        id: doc.id, uuid: doc.uuid, name: doc.name, img: doc.img, cost, allowed, affordable: cost <= left,
        speed: loco ? locomotionSpeed(sys, size) : null, note: doc.type === "armor" ? `Ref +${sys.reflexBonus}, Des máx. +${sys.maxDex}` : ""
      });
    }
    return {
      droidBudget: DROID_BUDGET, droidSpent: spent, droidLeft: left,
      droidInstalled: installed.map((x, i) => ({ name: x.doc.name, cost: x.cost, free: x.free, index: x.free ? null : this.wiz.droidBuys.indexOf(x.doc.id) })),
      droidGroups: Object.entries(groups).map(([label, list]) => ({ label, list }))
    };
  }

  findByUuid(uuid) {
    const d = this._data;
    return [...d.weapons, ...d.armor, ...d.equipment].find(x => x.uuid === uuid);
  }

  purchaseTotal() { return this.wiz.purchases.reduce((a, u) => a + (this.findByUuid(u)?.system.cost ?? 0), 0); }

  /** Itens gratuitos: ataque desarmado e, para Jedi, o sabre de luz. */
  freeItems() {
    const out = [];
    const unarmed = this._data.weapons.find(w => w.system.key === "unarmed");
    if (unarmed) out.push(unarmed);
    if (this.cls?.system.key === "jedi") {
      const saber = this._data.weapons.find(w => w.system.key === "lightsaber");
      if (saber) out.push(saber);
    }
    return out;
  }

  reviewData() {
    const s = this.wiz;
    const scores = this.finalScores();
    const feats = this.autoFeats().filter(f => f.ok).map(f => f.doc.name + (f.choice ? ` (${skillLabel(f.choice)})` : ""))
      .concat([...s.feats, ...s.speciesFeats].map(f => {
        const d = this._data.feats.find(x => x.id === f.id);
        return d ? d.name + (f.choice ? ` (${f.choice})` : "") : "";
      }));
    const talent = s.talent ? this._data.talents.find(t => t.id === s.talent.id) : null;
    return {
      name: s.name, species: this.species?.name, cls: this.cls?.name,
      abilities: this.abil.map(a => `${L(SWSE.abilityAbbr[a])} ${scores[a]} (${abilityMod(scores[a]) >= 0 ? "+" : ""}${abilityMod(scores[a])})`).join(" · "),
      hp: (this.cls?.system.startingHP ?? 0) + (this.wiz.droid ? 0 : abilityMod(scores.con ?? 10)),
      skills: s.trained.map(skillLabel).join(", "),
      feats: feats.join(", "),
      talent: talent ? talent.name + (s.talent.choice ? ` (${s.talent.choice})` : "") : "—",
      powers: Object.entries(s.powers).map(([id, n]) => `${this._data.powers.find(p => p.id === id)?.name}${n > 1 ? ` ×${n}` : ""}`).join(", ") || "—",
      credits: (s.credits ?? 0) - this.purchaseTotal(),
      items: this.freeItems().map(d => d.name).concat(s.purchases.map(u => this.findByUuid(u)?.name)).join(", "),
      droidSystems: s.droid ? this.droidInstalled().map(x => x.doc.name).join(", ") : "",
      problems: this.steps().map(st => ({ st, err: this.validate(st) })).filter(x => x.err && x.err !== "warn").map(x => `${L(`SWSE.CG.Step.${x.st}`)}: ${x.err}`)
    };
  }

  /* ------------------------------------------------------------ */
  /*  Handlers                                                    */
  /* ------------------------------------------------------------ */

  static async #onForm(event, form, formData) {
    const d = foundry.utils.expandObject(formData.object);
    const s = this.wiz;
    if ("droid" in d && !!d.droid !== s.droid) {
      s.droid = !!d.droid;
      s.pb = Object.fromEntries(ABIL.map(a => [a, 8]));
      s.assign = Object.fromEntries(ABIL.map(a => [a, ""]));
      s.pool = s.method === "array" ? this.stdArray : [];
      s.speciesId = null;
      s.classId = null;
      s.droidBuys = [];
    }
    if (d.method && d.method !== s.method) {
      s.method = d.method;
      s.assign = Object.fromEntries(ABIL.map(a => [a, ""]));
      if (s.method === "array") s.pool = this.stdArray;
      if (s.method === "roll") s.pool = [];
    }
    if (d.assign) for (const a of ABIL) if (a in d.assign) s.assign[a] = d.assign[a];
    if ("name" in d) s.name = d.name;
    if ("featFilter" in d) s.featFilter = !!d.featFilter;
    if ("talentFilter" in d) s.talentFilter = !!d.talentFilter;
    if ("credits" in d && d.credits !== "") s.credits = Number(d.credits) || 0;
    this.render();
  }

  static #onNext() {
    const err = this.validate();
    if (err && err !== "warn") return ui.notifications.warn(err);
    const steps = this.steps();
    const i = steps.indexOf(this.wiz.step);
    if (i < steps.length - 1) this.wiz.step = steps[i + 1];
    if (this.wiz.step === "equipment" && this.wiz.credits === null) CharacterCreator.#onRollCredits.call(this);
    this.render();
  }

  static #onPrev() {
    const steps = this.steps();
    const i = steps.indexOf(this.wiz.step);
    if (i > 0) this.wiz.step = steps[i - 1];
    this.render();
  }

  static #onGoto(event, target) {
    const steps = this.steps();
    const to = target.dataset.step;
    // Só permite pular para frente se os passos anteriores forem válidos
    for (const st of steps.slice(0, steps.indexOf(to))) {
      const err = this.validate(st);
      if (err && err !== "warn") { this.wiz.step = st; return this.render(); }
    }
    this.wiz.step = to;
    this.render();
  }

  static #onPbInc(event, target) {
    const a = target.dataset.ability;
    const s = this.wiz;
    if (s.pb[a] >= 18) return;
    s.pb[a]++;
    if (pointBuySpent(Object.fromEntries(this.abil.map(k => [k, s.pb[k]]))) > this.pbTotal) s.pb[a]--;
    this.render();
  }

  static #onPbDec(event, target) {
    const a = target.dataset.ability;
    if (this.wiz.pb[a] > 8) this.wiz.pb[a]--;
    this.render();
  }

  static async #onRollAbilities() {
    const s = this.wiz;
    s.pool = [];
    s.rolledDetail = [];
    for (let i = 0; i < this.abil.length; i++) {
      const r = await new Roll("4d6dl").evaluate();
      s.pool.push(r.total);
      s.rolledDetail.push(r.dice[0].results.map(x => x.result).join(", "));
    }
    s.assign = Object.fromEntries(ABIL.map(a => [a, ""]));
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: `<div class="swse-card"><h3>${L("SWSE.CG.RolledAbilities")}</h3><p>${s.pool.join(", ")}</p></div>`
    });
    this.render();
  }

  static #onUseArray() {
    this.wiz.pool = this.stdArray;
    this.render();
  }

  static #onAddSystem(event, target) {
    const doc = this._data.droidSystems.find(d => d.id === target.dataset.id);
    if (!doc) return;
    this.wiz.droidBuys.push(doc.id);
    if (this.droidSpent() > DROID_BUDGET) {
      this.wiz.droidBuys.pop();
      return ui.notifications.warn(L("SWSE.Droid.ErrBudget"));
    }
    this.render();
  }

  static #onRemoveSystem(event, target) {
    this.wiz.droidBuys.splice(Number(target.dataset.index), 1);
    this.render();
  }

  static #onSelectSpecies(event, target) {
    if (this.wiz.speciesId !== target.dataset.id) this.wiz.droidBuys = [];
    this.wiz.speciesId = target.dataset.id;
    this.wiz.speciesFeats = [];
    this.render();
  }

  static #onSelectClass(event, target) {
    if (this.wiz.classId !== target.dataset.id) {
      this.wiz.classId = target.dataset.id;
      this.wiz.trained = [];
      this.wiz.talent = null;
      this.wiz.credits = null;
    }
    this.render();
  }

  static #onToggleSkill(event, target) {
    const k = target.dataset.skill;
    const s = this.wiz;
    if (s.trained.includes(k)) s.trained = s.trained.filter(x => x !== k);
    else if (s.trained.length < this.trainedAllowed()) s.trained.push(k);
    else ui.notifications.warn(L("SWSE.CG.ErrTooManySkills"));
    this.render();
  }

  async #toggleFeatIn(listName, id, max) {
    const s = this.wiz;
    const list = s[listName];
    const idx = list.findIndex(f => f.id === id);
    if (idx >= 0) { list.splice(idx, 1); return this.render(); }
    if (list.length >= max) list.shift();
    const doc = this._data.feats.find(f => f.id === id);
    let choice = "";
    if (doc.system.choice?.type) {
      choice = await promptChoice(this.actor, doc.toObject(), this.profile());
      if (choice === null) return;
    }
    list.push({ id, choice });
    this.render();
  }

  static #onToggleFeat(event, target) { return this.#toggleFeatIn("feats", target.dataset.id, 1); }
  static #onToggleSpeciesFeat(event, target) { return this.#toggleFeatIn("speciesFeats", target.dataset.id, this.species?.system.bonusFeatChoices ?? 0); }

  static async #onSelectTalent(event, target) {
    const id = target.dataset.id;
    if (this.wiz.talent?.id === id) { this.wiz.talent = null; return this.render(); }
    const doc = this._data.talents.find(t => t.id === id);
    let choice = doc.system.choice?.value ?? "";
    if (doc.system.choice?.type && !choice) {
      choice = await promptChoice(this.actor, doc.toObject(), this.profile());
      if (choice === null) return;
    }
    this.wiz.talent = { id, choice };
    this.render();
  }

  static #onAddPower(event, target) {
    const id = target.dataset.id;
    const n = Object.values(this.wiz.powers).reduce((a, b) => a + b, 0);
    if (n >= this.powersAllowed()) return ui.notifications.warn(L("SWSE.CG.ErrTooManyPowers"));
    this.wiz.powers[id] = (this.wiz.powers[id] ?? 0) + 1;
    this.render();
  }

  static #onRemovePower(event, target) {
    const id = target.dataset.id;
    if (!this.wiz.powers[id]) return;
    this.wiz.powers[id]--;
    if (!this.wiz.powers[id]) delete this.wiz.powers[id];
    this.render();
  }

  static async #onRollCredits() {
    const formula = this.cls?.system.credits;
    if (!formula) { this.wiz.credits = 0; return this.render(); }
    const r = await new Roll(formula).evaluate();
    this.wiz.credits = r.total;
    this.wiz.creditsRoll = `${formula} = ${r.total}`;
    ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), content: `<div class="swse-card"><h3>${L("SWSE.CG.StartingCredits")}</h3><p>${formula} = <strong>${r.total}</strong></p></div>`, rolls: [r] });
    this.render();
  }

  static #onBuy(event, target) {
    const d = this.findByUuid(target.dataset.uuid);
    if (!d) return;
    if (d.system.cost > (this.wiz.credits ?? 0) - this.purchaseTotal()) return ui.notifications.warn(L("SWSE.CG.NotEnoughCredits"));
    this.wiz.purchases.push(d.uuid);
    this.render();
  }

  static #onUnbuy(event, target) {
    this.wiz.purchases.splice(Number(target.dataset.index), 1);
    this.render();
  }

  static async #onShowItem(event, target) {
    const doc = await fromUuid(target.dataset.uuid);
    doc?.sheet.render({ force: true });
  }

  /* ------------------------------------------------------------ */
  /*  Finalizar                                                   */
  /* ------------------------------------------------------------ */

  static async #onFinish() {
    const problems = this.reviewData().problems;
    if (problems.length) return ui.notifications.error(problems.join(" | "));
    const s = this.wiz;
    let actor = this.actor;
    if (!actor) actor = await Actor.implementation.create({ name: s.name || L("SWSE.CG.NewHero"), type: "character" });
    else {
      const existing = actor.items.filter(i => ["species", "class", "feat", "talent", "forcePower", "droidSystem"].includes(i.type)).map(i => i.id);
      if (existing.length) {
        const ok = await foundry.applications.api.DialogV2.confirm({ window: { title: L("SWSE.CharacterCreator") }, content: `<p>${L("SWSE.CG.ConfirmReplace")}</p>` });
        if (!ok) return;
        await actor.deleteEmbeddedDocuments("Item", existing);
      }
    }

    const base = this.baseScores();
    const updates = { "system.creationComplete": true, "system.credits": (s.credits ?? 0) - this.purchaseTotal() };
    if (s.name) updates.name = s.name;
    for (const a of ABIL) {
      updates[`system.abilities.${a}.base`] = base[a] ?? 10;
      updates[`system.abilities.${a}.increase`] = 0;
    }
    for (const k of Object.keys(SWSE.skills)) updates[`system.skills.${k}.trained`] = s.trained.includes(k);
    await actor.update(updates);

    const items = [];
    items.push(itemData(this.species));
    items.push(itemData(this.cls, { system: { levels: 1, isStartingClass: true, hpRolls: [this.cls.system.startingHP] } }));
    for (const f of this.autoFeats().filter(f => f.ok)) {
      items.push(itemData(f.doc, { system: { grantedBy: f.source, ...(f.choice ? { choice: { value: f.choice } } : {}) } }));
    }
    for (const f of [...s.feats, ...s.speciesFeats]) {
      const doc = this._data.feats.find(d => d.id === f.id);
      if (doc) items.push(itemData(doc, f.choice ? { system: { choice: { value: f.choice } } } : {}));
    }
    if (s.talent) {
      const doc = this._data.talents.find(t => t.id === s.talent.id);
      if (doc) items.push(itemData(doc, s.talent.choice ? { system: { choice: { value: s.talent.choice } } } : {}));
    }
    for (const [id, n] of Object.entries(s.powers)) {
      const doc = this._data.powers.find(p => p.id === id);
      if (doc) items.push(itemData(doc, { system: { uses: n, spent: 0 } }));
    }
    for (const d of this.freeItems()) items.push(itemData(d, { system: { equipped: true } }));
    if (s.droid) {
      for (const x of this.droidInstalled()) items.push(itemData(x.doc, { system: { cost: x.cost, equipped: true } }));
    }
    for (const u of s.purchases) {
      const d = this.findByUuid(u);
      if (d) items.push(itemData(d));
    }
    await actor.createEmbeddedDocuments("Item", items);

    // PV e Pontos da Força iniciais (após o recálculo)
    await actor.update({
      "system.hp.value": actor.system.hp.max,
      "system.forcePoints.value": actor.system.forcePoints.max,
      "system.destinyPoints.value": 1,
      "system.condition.step": 0,
      "system.secondWind.used": 0,
      ...(s.droid ? { "system.details.languages": "Binary" } : {})
    });
    ui.notifications.info(game.i18n.format("SWSE.CG.Done", { name: actor.name }));
    this.close();
    actor.sheet.render({ force: true });
  }
}
