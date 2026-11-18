import { SWSE, SYSTEM_ID } from "../config.mjs";
import { weaponProfile } from "../rolls/attack.mjs";
import { promptChoice } from "../helpers/choices.mjs";
import { fixArrayFields } from "../helpers/form.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const TPL = p => `systems/${SYSTEM_ID}/templates/actor/${p}`;

export class SWSEActorSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["swse", "sheet", "actor"],
    position: { width: 860, height: 880 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      rollSkill: SWSEActorSheet.#onRollSkill,
      rollAbility: SWSEActorSheet.#onRollAbility,
      rollDefense: SWSEActorSheet.#onRollDefense,
      useItem: SWSEActorSheet.#onUseItem,
      editItem: SWSEActorSheet.#onEditItem,
      deleteItem: SWSEActorSheet.#onDeleteItem,
      createItem: SWSEActorSheet.#onCreateItem,
      toggleEquip: SWSEActorSheet.#onToggleEquip,
      setCondition: SWSEActorSheet.#onSetCondition,
      secondWind: SWSEActorSheet.#onSecondWind,
      rest: SWSEActorSheet.#onRest,
      openCreator: SWSEActorSheet.#onOpenCreator,
      openLevelUp: SWSEActorSheet.#onOpenLevelUp,
      rollInitiative: SWSEActorSheet.#onRollInitiative,
      recoverPowers: SWSEActorSheet.#onRecoverPowers,
      togglePowerSpent: SWSEActorSheet.#onTogglePowerSpent,
      itemToChat: SWSEActorSheet.#onItemToChat,
      editChoice: SWSEActorSheet.#onEditChoice,
      addModifier: SWSEActorSheet.#onAddModifier,
      deleteModifier: SWSEActorSheet.#onDeleteModifier,
      openCompendium: SWSEActorSheet.#onOpenCompendium,
      rollForcePoint: SWSEActorSheet.#onRollForcePoint,
      grapple: SWSEActorSheet.#onGrapple
    }
  };

  static PARTS = {
    header: { template: TPL("parts/header.hbs") },
    tabs: { template: "templates/generic/tab-navigation.hbs" },
    main: { template: TPL("parts/main.hbs"), scrollable: [""] },
    skills: { template: TPL("parts/skills.hbs"), scrollable: [""] },
    combat: { template: TPL("parts/combat.hbs"), scrollable: [""] },
    talents: { template: TPL("parts/talents.hbs"), scrollable: [""] },
    force: { template: TPL("parts/force.hbs"), scrollable: [""] },
    gear: { template: TPL("parts/gear.hbs"), scrollable: [""] },
    bio: { template: TPL("parts/bio.hbs"), scrollable: [""] }
  };

  static TABS = {
    primary: {
      tabs: [
        { id: "main", label: "SWSE.Tab.main", icon: "fa-solid fa-user" },
        { id: "skills", label: "SWSE.Tab.skills", icon: "fa-solid fa-list-check" },
        { id: "combat", label: "SWSE.Tab.combat", icon: "fa-solid fa-crosshairs" },
        { id: "talents", label: "SWSE.Tab.talents", icon: "fa-solid fa-star" },
        { id: "force", label: "SWSE.Tab.force", icon: "fa-solid fa-hand-sparkles" },
        { id: "gear", label: "SWSE.Tab.gear", icon: "fa-solid fa-suitcase" },
        { id: "bio", label: "SWSE.Tab.bio", icon: "fa-solid fa-book" }
      ],
      initial: "main"
    }
  };

  get title() { return this.actor.name; }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.actor;
    const sys = actor.system;
    const d = sys.derived ?? {};
    const L = k => game.i18n.localize(k);
    context.actor = actor;
    context.system = sys;
    context.derived = d;
    context.config = SWSE;
    context.isNPC = actor.type === "npc";
    context.editable = this.isEditable;
    context.tabs = this._prepareTabs("primary");

    context.abilities = Object.entries(SWSE.abilities).map(([k, label]) => ({
      key: k, label: L(label), abbr: L(SWSE.abilityAbbr[k]), base: sys.abilities[k].base, increase: sys.abilities[k].increase,
      misc: sys.abilities[k].misc, total: sys.abilities[k].total, mod: sys.abilities[k].mod, species: d.abilities?.[k]?.speciesBonus ?? 0,
      none: d.abilities?.[k]?.none
    }));
    context.defenses = Object.entries(SWSE.defenses).map(([k, label]) => ({
      key: k, label: L(label), total: sys.defenses[k].total, misc: sys.defenses[k].misc, parts: d.defenses?.[k]?.parts ?? {},
      flatFooted: k === "reflex" ? d.defenses?.reflex?.flatFooted : null,
      tooltip: Object.entries(d.defenses?.[k]?.parts ?? {}).filter(([, v]) => v).map(([p, v]) => `${L(`SWSE.Part.${p}`)}: ${v >= 0 ? "+" : ""}${v}`).join("<br>")
    }));
    context.conditionTrack = SWSE.conditionTrack.map((c, i) => ({ step: i, label: L(c.label), penalty: c.penalty, active: i === sys.condition.step }));
    context.skills = Object.entries(SWSE.skills).map(([k, cfg]) => {
      const s = sys.skills[k];
      return {
        key: k, label: L(cfg.label), ability: L(SWSE.abilityAbbr[s.abilityUsed || cfg.ability]), total: s.total, trained: s.trained,
        trainedByFeat: s.isTrained && !s.trained, focus: s.focus, misc: s.misc,
        usable: s.usable, armor: cfg.armor,
        tooltip: Object.entries(s.parts ?? {}).filter(([, v]) => v).map(([p, v]) => `${L(`SWSE.Part.${p}`)}: ${v >= 0 ? "+" : ""}${v}`).join("<br>")
      };
    });

    // Itens
    const items = actor.items.contents.sort((a, b) => (a.sort || 0) - (b.sort || 0) || a.name.localeCompare(b.name));
    context.species = actor.species;
    context.classes = items.filter(i => i.type === "class");
    context.classSummary = context.classes.map(c => `${c.name} ${c.system.levels}`).join(" / ") || "—";
    context.feats = items.filter(i => i.type === "feat");
    const talents = items.filter(i => i.type === "talent");
    const byTree = {};
    for (const t of talents.filter(t => t.system.category === "talent" || t.system.category === "forceTalent")) (byTree[t.system.tree || "—"] ??= []).push(t);
    context.talentTrees = Object.entries(byTree).map(([tree, list]) => ({ tree, list }));
    context.techniques = talents.filter(t => t.system.category === "forceTechnique");
    context.secrets = talents.filter(t => t.system.category === "forceSecret");
    context.forcePowers = items.filter(i => i.type === "forcePower").map(p => ({
      item: p, remaining: Math.max(0, p.system.uses - p.system.spent),
      descriptors: p.system.descriptors.map(x => L(`SWSE.Descriptor.${x}`)).join(", ")
    }));
    context.weapons = items.filter(i => i.type === "weapon").map(w => {
      const p = weaponProfile(actor, w);
      return {
        item: w, attack: p.attackBonus, damage: `${w.system.damage}${p.damageBonus ? (p.damageBonus > 0 ? "+" : "") + p.damageBonus : ""}`,
        proficient: p.proficient, group: L(SWSE.weaponGroups[w.system.group] ?? w.system.group), melee: p.melee
      };
    });
    context.armors = items.filter(i => i.type === "armor");
    context.equipment = items.filter(i => i.type === "equipment");
    context.totalWeight = items.filter(i => ["weapon", "armor", "equipment"].includes(i.type))
      .reduce((a, i) => a + (Number(i.system.weight) || 0) * (Number(i.system.quantity) || 1), 0).toFixed(1);
    context.hpPct = Math.clamp(Math.round((sys.hp.value / Math.max(sys.hp.max, 1)) * 100), 0, 100);
    context.secondWind = { used: sys.secondWind.used, uses: d.secondWind?.uses ?? 0, heal: d.secondWind?.heal ?? 0 };
    context.forcePointFormula = actor.forcePointFormula;
    context.modifierTargets = { ...SWSE.modifierTargets };
    for (const [k, v] of Object.entries(SWSE.abilities)) context.modifierTargets[`abilities.${k}`] = v;
    for (const [k, v] of Object.entries(SWSE.skills)) context.modifierTargets[`skills.${k}`] = v.label;
    context.bonusTypes = SWSE.bonusTypes;
    context.customModifiers = sys.customModifiers.map((m, i) => ({ ...m, index: i }));
    context.xpNext = SWSE.xpTable[Math.min(sys.level, 19)] ?? "—";
    context.canLevelUp = sys.xp >= (SWSE.xpTable[sys.level] ?? Infinity);

    const TextEditor = foundry.applications.ux.TextEditor.implementation;
    context.enrichedBiography = await TextEditor.enrichHTML(sys.details.biography, { relativeTo: actor, secrets: actor.isOwner });
    context.biographyField = sys.schema.getField("details.biography");
    return context;
  }

  _processFormData(event, form, formData) {
    const data = super._processFormData(event, form, formData);
    return fixArrayFields(data, this.actor, ["system.customModifiers"]);
  }

  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    if (context.tabs?.[partId]) context.tab = context.tabs[partId];
    return context;
  }

  /* ------------------------------------------------------------ */

  async _onDropItem(event, item) {
    const actor = this.actor;
    if (!actor.isOwner) return null;
    if (item.parent?.uuid === actor.uuid) return super._onDropItem(event, item);
    const data = item.toObject();
    delete data._id;

    if (item.type === "species") {
      const old = actor.items.filter(i => i.type === "species").map(i => i.id);
      if (old.length) await actor.deleteEmbeddedDocuments("Item", old);
      return Item.implementation.create(data, { parent: actor });
    }
    if (item.type === "class") {
      if (!actor.classes.length) return game.swse.openCharacterCreator(actor);
      return game.swse.openLevelUp(actor, { classUuid: item.uuid });
    }
    if (item.type === "forcePower") {
      const existing = actor.items.find(i => i.type === "forcePower" && i.system.key === item.system.key);
      if (existing) return existing.update({ "system.uses": existing.system.uses + 1 });
    }
    if (["feat", "talent"].includes(item.type) && data.system.choice?.type && !data.system.choice.value) {
      const value = await promptChoice(actor, data);
      if (value === null) return null;
      data.system.choice.value = value;
    }
    return Item.implementation.create(data, { parent: actor });
  }

  /* ------------------------------------------------------------ */
  /*  Ações                                                       */
  /* ------------------------------------------------------------ */

  static #item(target) {
    const id = target.closest("[data-item-id]")?.dataset.itemId;
    return this.actor.items.get(id);
  }

  static #onRollSkill(event, target) {
    this.actor.rollSkill(target.dataset.skill, { dialog: event.shiftKey });
  }

  static #onRollAbility(event, target) {
    this.actor.rollAbility(target.dataset.ability, { dialog: event.shiftKey });
  }

  static #onRollDefense(event, target) {
    const def = this.actor.system.defenses[target.dataset.defense];
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: `<div class="swse-card"><h3>${game.i18n.localize(SWSE.defenses[target.dataset.defense])}: ${def.total}</h3></div>`
    });
  }

  static #onUseItem(event, target) {
    const item = SWSEActorSheet.#item.call(this, target);
    item?.use({ skipDialog: event.shiftKey });
  }

  static #onItemToChat(event, target) {
    SWSEActorSheet.#item.call(this, target)?.toChat();
  }

  static #onEditItem(event, target) {
    SWSEActorSheet.#item.call(this, target)?.sheet.render({ force: true });
  }

  static async #onDeleteItem(event, target) {
    const item = SWSEActorSheet.#item.call(this, target);
    if (!item) return;
    const ok = await foundry.applications.api.DialogV2.confirm({
      window: { title: game.i18n.localize("SWSE.Delete") },
      content: `<p>${game.i18n.format("SWSE.DeleteConfirm", { name: item.name })}</p>`
    });
    if (ok) item.delete();
  }

  static #onCreateItem(event, target) {
    const type = target.dataset.type;
    Item.implementation.create({ name: game.i18n.localize(`TYPES.Item.${type}`), type }, { parent: this.actor, renderSheet: true });
  }

  static #onToggleEquip(event, target) {
    const item = SWSEActorSheet.#item.call(this, target);
    if (!item) return;
    // Só uma armadura equipada por vez
    if (item.type === "armor" && !item.system.equipped) {
      const others = this.actor.items.filter(i => i.type === "armor" && i.system.equipped && i.id !== item.id).map(i => ({ _id: i.id, "system.equipped": false }));
      if (others.length) this.actor.updateEmbeddedDocuments("Item", others);
    }
    item.update({ "system.equipped": !item.system.equipped });
  }

  static #onSetCondition(event, target) {
    const step = Number(target.dataset.step);
    this.actor.update({ "system.condition.step": step });
  }

  static #onSecondWind() { this.actor.secondWind(); }
  static #onRest() { this.actor.rest(); }
  static #onOpenCreator() { game.swse.openCharacterCreator(this.actor); }
  static #onOpenLevelUp() { game.swse.openLevelUp(this.actor); }
  static #onRollInitiative(event) { this.actor.rollInitiative({ dialog: event.shiftKey }); }
  static #onRecoverPowers() { this.actor.recoverForcePowers(); }

  static #onTogglePowerSpent(event, target) {
    const item = SWSEActorSheet.#item.call(this, target);
    if (!item) return;
    const spent = Number(target.dataset.index) < item.system.spent ? Number(target.dataset.index) : Number(target.dataset.index) + 1;
    item.update({ "system.spent": Math.clamp(spent, 0, item.system.uses) });
  }

  static async #onEditChoice(event, target) {
    const item = SWSEActorSheet.#item.call(this, target);
    if (!item) return;
    const value = await promptChoice(this.actor, item.toObject());
    if (value !== null) item.update({ "system.choice.value": value });
  }

  static #onAddModifier() {
    const mods = this.actor.system.toObject().customModifiers ?? [];
    mods.push({ target: "defenses.reflex", value: "1", type: "untyped", label: "", disabled: false });
    this.actor.update({ "system.customModifiers": mods });
  }

  static #onDeleteModifier(event, target) {
    const mods = this.actor.system.toObject().customModifiers ?? [];
    mods.splice(Number(target.dataset.index), 1);
    this.actor.update({ "system.customModifiers": mods });
  }

  static #onOpenCompendium(event, target) {
    game.packs.get(`${SYSTEM_ID}.${target.dataset.pack}`)?.render(true);
  }

  static async #onRollForcePoint() {
    if (!(await this.actor.spendForcePoint())) return;
    const roll = await new Roll(this.actor.forcePointFormula).evaluate();
    roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), flavor: game.i18n.localize("SWSE.ForcePointSpent") });
  }

  static #onGrapple() {
    const g = this.actor.system.grapple;
    new Roll(`1d20 + ${g}`).evaluate().then(r => r.toMessage({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), flavor: game.i18n.localize("SWSE.Grapple") }));
  }
}
