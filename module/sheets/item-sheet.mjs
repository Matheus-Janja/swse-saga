import { SWSE, SYSTEM_ID } from "../config.mjs";
import { fixArrayFields } from "../helpers/form.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;

export class SWSEItemSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["swse", "sheet", "item"],
    position: { width: 600, height: 680 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      addModifier: SWSEItemSheet.#onAddModifier,
      deleteModifier: SWSEItemSheet.#onDeleteModifier,
      addDC: SWSEItemSheet.#onAddDC,
      deleteDC: SWSEItemSheet.#onDeleteDC,
      addTrait: SWSEItemSheet.#onAddTrait,
      deleteTrait: SWSEItemSheet.#onDeleteTrait,
      use: SWSEItemSheet.#onUse
    }
  };

  static PARTS = {
    sheet: { template: `systems/${SYSTEM_ID}/templates/item/item-sheet.hbs`, scrollable: [".sheet-body"] }
  };

  get title() { return `${game.i18n.localize(`TYPES.Item.${this.item.type}`)}: ${this.item.name}`; }

  /** Limita a altura inicial à área visível da tela. */
  _initializeApplicationOptions(options) {
    options = super._initializeApplicationOptions(options);
    if (options.position?.height && typeof options.position.height === "number") {
      options.position.height = Math.min(options.position.height, window.innerHeight - 40);
    }
    return options;
  }


  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const item = this.item;
    const sys = item.system;
    context.item = item;
    context.system = sys;
    context.config = SWSE;
    context.editable = this.isEditable;
    context.isType = Object.fromEntries(["species", "class", "feat", "talent", "forcePower", "weapon", "armor", "equipment", "vehicleWeapon", "droidSystem"].map(t => [t, item.type === t]));
    context.hasModifiers = "modifiers" in sys;
    context.hasChoice = "choice" in sys;
    context.hasPrereqs = "prerequisites" in sys;
    context.modifiers = (sys.modifiers ?? []).map((m, i) => ({ ...m, index: i }));
    context.modifierTargets = { ...SWSE.modifierTargets, "skills.{choice}": "SWSE.Target.skillChoice" };
    for (const [k, v] of Object.entries(SWSE.abilities)) context.modifierTargets[`abilities.${k}`] = v;
    for (const [k, v] of Object.entries(SWSE.skills)) context.modifierTargets[`skills.${k}`] = v.label;
    context.bonusTypes = SWSE.bonusTypes;
    context.abilityList = Object.entries(SWSE.abilityAbbr).map(([k, v]) => ({ key: k, label: v, value: sys.abilityMods?.[k] ?? 0 }));
    context.sizes = Object.fromEntries(Object.entries(SWSE.sizes).map(([k, v]) => [k, v.label]));
    context.listText = {
      classSkills: (sys.classSkills ?? []).join(", "),
      startingFeats: (sys.startingFeats ?? []).join(", "),
      bonusFeats: (sys.bonusFeats ?? []).join(", "),
      talentTrees: (sys.talentTrees ?? []).join(", "),
      descriptors: (sys.descriptors ?? []).join(", "),
      bonusFeatsSpecies: (sys.bonusFeats ?? []).join(", ")
    };
    const TextEditor = foundry.applications.ux.TextEditor.implementation;
    context.enrichedDescription = await TextEditor.enrichHTML(sys.description ?? "", { relativeTo: item, secrets: item.isOwner });
    context.descriptionField = sys.schema.getField("description");
    // Melhorias (Scum and Villainy)
    const ups = item.type === "weapon" ? SWSE.weaponUpgrades : item.type === "armor" ? SWSE.armorUpgrades : null;
    if (ups) {
      const have = new Set(sys.upgrades ?? []);
      context.upgradeList = Object.entries(ups).map(([k, u]) => ({ key: k, label: u.label, pts: u.pts, cost: u.cost, on: have.has(k) }));
      context.upgradeUsed = [...have].reduce((a, k) => a + (ups[k]?.pts ?? 0), 0);
      context.upgradeOver = context.upgradeUsed > (sys.upgradeSlots ?? 1);
    }
    return context;
  }

  /** Converte campos de lista escritos como texto ("a, b, c") em arrays. */
  _processFormData(event, form, formData) {
    const data = super._processFormData(event, form, formData);
    const listFields = ["classSkills", "startingFeats", "bonusFeats", "talentTrees", "descriptors"];
    for (const f of listFields) {
      const key = `_list.${f}`;
      const raw = foundry.utils.getProperty(data, key);
      if (raw !== undefined) foundry.utils.setProperty(data, `system.${f}`, String(raw).split(",").map(s => s.trim()).filter(Boolean));
    }
    delete data._list;
    // Melhorias marcadas (Scum and Villainy)
    if (data._up) { foundry.utils.setProperty(data, "system.upgrades", Object.entries(data._up).filter(([, v]) => v).map(([k]) => k)); delete data._up; }
    return fixArrayFields(data, this.item, ["system.modifiers", "system.dcs", "system.traits", "system.rerolls", "system.conditionalFeats", "system.features"]);
  }

  static #onAddModifier() {
    const mods = this.item.system.toObject().modifiers ?? [];
    mods.push({ target: "defenses.reflex", value: "1", type: "untyped", label: "", disabled: false });
    this.item.update({ "system.modifiers": mods });
  }
  static #onDeleteModifier(event, target) {
    const mods = this.item.system.toObject().modifiers ?? [];
    mods.splice(Number(target.dataset.index), 1);
    this.item.update({ "system.modifiers": mods });
  }
  static #onAddDC() {
    const dcs = this.item.system.toObject().dcs ?? [];
    dcs.push({ dc: 15, text: "" });
    this.item.update({ "system.dcs": dcs });
  }
  static #onDeleteDC(event, target) {
    const dcs = this.item.system.toObject().dcs ?? [];
    dcs.splice(Number(target.dataset.index), 1);
    this.item.update({ "system.dcs": dcs });
  }
  static #onAddTrait() {
    const traits = this.item.system.toObject().traits ?? [];
    traits.push({ name: "", text: "" });
    this.item.update({ "system.traits": traits });
  }
  static #onDeleteTrait(event, target) {
    const traits = this.item.system.toObject().traits ?? [];
    traits.splice(Number(target.dataset.index), 1);
    this.item.update({ "system.traits": traits });
  }
  static #onUse() { this.item.use(); }
}
