import { SWSE, SYSTEM_ID } from "../config.mjs";
import { VEHICLE_SIZES, CREW_QUALITY, VEHICLE_WEAPON_TYPES, VEHICLE_ROLES, VEHICLE_SKILLS, MANEUVERS } from "../rules/vehicle.mjs";
import { vehicleWeaponInfo, stationCrew } from "../rolls/vehicle.mjs";
import * as VC from "../rolls/vehicle-combat.mjs";
import { effectDialog, durationLabel } from "../helpers/effects.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const L = k => game.i18n.localize(k);

export class SWSEVehicleSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["swse", "sheet", "actor", "vehicle"],
    position: { width: 820, height: 860 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      rollSkill: SWSEVehicleSheet.#onRollSkill,
      useItem: SWSEVehicleSheet.#onUseItem,
      editItem: SWSEVehicleSheet.#onEditItem,
      deleteItem: SWSEVehicleSheet.#onDeleteItem,
      createWeapon: SWSEVehicleSheet.#onCreateWeapon,
      setCondition: SWSEVehicleSheet.#onSetCondition,
      clearCrew: SWSEVehicleSheet.#onClearCrew,
      addGunner: SWSEVehicleSheet.#onAddGunner,
      openCrew: SWSEVehicleSheet.#onOpenCrew,
      rechargeShields: SWSEVehicleSheet.#onRechargeShields,
      reroutePower: SWSEVehicleSheet.#onReroutePower,
      resetShields: SWSEVehicleSheet.#onResetShields,
      vc: SWSEVehicleSheet.#onVehicleCombat,
      leaveDogfight: SWSEVehicleSheet.#onLeaveDogfight,
      createEffect: SWSEVehicleSheet.#onCreateEffect,
      deleteEffect: SWSEVehicleSheet.#onDeleteEffect
    }
  };

  static PARTS = {
    header: { template: `systems/${SYSTEM_ID}/templates/actor/vehicle-header.hbs` },
    tabs: { template: "templates/generic/tab-navigation.hbs" },
    main: { template: `systems/${SYSTEM_ID}/templates/actor/vehicle-main.hbs`, scrollable: [""] },
    details: { template: `systems/${SYSTEM_ID}/templates/actor/vehicle-details.hbs`, scrollable: [""] }
  };

  static TABS = {
    primary: {
      tabs: [
        { id: "main", label: "SWSE.Tab.main", icon: "fa-solid fa-jet-fighter" },
        { id: "details", label: "SWSE.Vehicle.Details", icon: "fa-solid fa-clipboard-list" }
      ],
      initial: "main"
    }
  };

  /** Limita a altura inicial à área visível da tela. */
  _initializeApplicationOptions(options) {
    options = super._initializeApplicationOptions(options);
    if (typeof options.position?.height === "number") options.position.height = Math.min(options.position.height, window.innerHeight - 40);
    return options;
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.actor;
    const sys = actor.system;
    const d = sys.derived ?? {};
    Object.assign(context, {
      actor, system: sys, derived: d, editable: this.isEditable, tabs: this._prepareTabs("primary"),
      sizes: Object.fromEntries(Object.entries(VEHICLE_SIZES).map(([k, v]) => [k, v.label])),
      crewQualities: Object.fromEntries(Object.entries(CREW_QUALITY).map(([k, v]) => [k, v.label])),
      maneuvers: Object.fromEntries(Object.entries(MANEUVERS).map(([k, v]) => [k, v.label])),
      categories: SWSE.vehicleCategories,
      hpPct: Math.clamp(Math.round((sys.hp.value / Math.max(sys.hp.max, 1)) * 100), 0, 100),
      conditionTrack: SWSE.conditionTrack.map((c, i) => ({ step: i, label: L(c.label), active: i === sys.condition.step }))
    });
    const actors = sys.crewActors;
    context.crewSlots = VEHICLE_ROLES.map(r => ({ role: r, label: L(`SWSE.Role.${r}`), actor: actors[r], uuid: sys.crew[r] }));
    context.gunnerSlots = sys.crew.gunners.map((uuid, i) => ({ index: i, label: `${L("SWSE.Role.gunner")} ${i + 1}`, actor: actors.gunners[i], uuid }));
    context.skills = VEHICLE_SKILLS.map(k => ({
      key: k, label: L(SWSE.skills[k].label), total: sys.skills[k].total, misc: sys.skills[k].misc, byCrew: sys.skills[k].byCrew,
      tooltip: Object.entries(sys.skills[k].parts ?? {}).filter(([, v]) => v).map(([p, v]) => `${L(`SWSE.VPart.${p}`)}: ${v >= 0 ? "+" : ""}${v}`).join("<br>")
    }));
    context.weapons = actor.items.filter(i => i.type === "vehicleWeapon").map(w => {
      const p = vehicleWeaponInfo(actor, w);
      const op = stationCrew(actor, w);
      return {
        item: w, attack: p.attackBonus, operator: op?.name ?? L("SWSE.Vehicle.DefaultCrew"),
        station: w.system.station === "gunner" ? `${L("SWSE.Role.gunner")} ${w.system.gunner}` : L(`SWSE.Role.${w.system.station}`),
        damage: w.system.weaponType === "tractor" ? `${L("SWSE.Grapple")} +${w.system.grapple}` : `(${w.system.damage}${p.damageBonus ? (p.damageBonus > 0 ? "+" : "") + p.damageBonus : ""})×${w.system.multiplier}${w.system.ion ? " íon" : ""}`,
        type: L(VEHICLE_WEAPON_TYPES[w.system.weaponType]?.label ?? w.system.weaponType)
      };
    });
    context.otherItems = actor.items.filter(i => i.type !== "vehicleWeapon");
    context.dogfight = sys.dogfight.map(u => ({ uuid: u, name: fromUuidSync(u)?.name ?? "?" }));
    context.vehicleEffects = actor.effects.map(e => ({ id: e.id, name: e.name, img: e.img, duration: durationLabel(e) }));
    context.allOut = !!d.allOut;
    context.refTooltip = Object.entries(d.defenses?.reflex?.parts ?? {}).filter(([, v]) => v).map(([p, v]) => `${L(`SWSE.VPart.${p}`)}: ${v >= 0 ? "+" : ""}${v}`).join("<br>");
    const TextEditor = foundry.applications.ux.TextEditor.implementation;
    context.enrichedNotes = await TextEditor.enrichHTML(sys.notes, { relativeTo: actor });
    context.notesField = sys.schema.getField("notes");
    return context;
  }

  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    if (context.tabs?.[partId]) context.tab = context.tabs[partId];
    return context;
  }

  _processFormData(event, form, formData) {
    const data = super._processFormData(event, form, formData);
    const g = foundry.utils.getProperty(data, "system.crew.gunners");
    if (g && !Array.isArray(g)) {
      const cur = [...this.actor._source.system.crew.gunners];
      for (const [i, v] of Object.entries(g)) cur[Number(i)] = v;
      foundry.utils.setProperty(data, "system.crew.gunners", cur);
    }
    return data;
  }

  /** Arrastar um personagem para um posto da tripulação. */
  async _onDropActor(event, actor) {
    if (!this.isEditable || actor.type === "vehicle") return null;
    const slot = event.target.closest("[data-crew-slot]");
    if (!slot) return ui.notifications.info(L("SWSE.Vehicle.DropOnSlot"));
    const role = slot.dataset.crewSlot;
    if (role === "gunner") {
      const gunners = [...this.actor.system.crew.gunners];
      const idx = slot.dataset.index !== undefined ? Number(slot.dataset.index) : gunners.length;
      gunners[idx] = actor.uuid;
      return this.actor.update({ "system.crew.gunners": gunners });
    }
    return this.actor.update({ [`system.crew.${role}`]: actor.uuid });
  }

  /** Só aceita armas de veículo e itens comuns como carga; personagens vão para a tripulação. */
  async _onDropItem(event, item) {
    if (!this.actor.isOwner) return null;
    if (item.parent?.uuid === this.actor.uuid) return super._onDropItem(event, item);
    const data = item.toObject();
    delete data._id;
    return Item.implementation.create(data, { parent: this.actor });
  }

  static #item(target) { return this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId); }
  static #onRollSkill(event, target) { this.actor.rollSkill(target.dataset.skill, { dialog: event.shiftKey }); }
  static #onUseItem(event, target) { SWSEVehicleSheet.#item.call(this, target)?.use({ skipDialog: event.shiftKey }); }
  static #onEditItem(event, target) { SWSEVehicleSheet.#item.call(this, target)?.sheet.render({ force: true }); }
  static async #onDeleteItem(event, target) {
    const item = SWSEVehicleSheet.#item.call(this, target);
    if (!item) return;
    const ok = await foundry.applications.api.DialogV2.confirm({ window: { title: L("SWSE.Delete") }, content: `<p>${game.i18n.format("SWSE.DeleteConfirm", { name: item.name })}</p>` });
    if (ok) item.delete();
  }
  static #onCreateWeapon() {
    Item.implementation.create({ name: L("TYPES.Item.vehicleWeapon"), type: "vehicleWeapon" }, { parent: this.actor, renderSheet: true });
  }
  static #onSetCondition(event, target) { this.actor.update({ "system.condition.step": Number(target.dataset.step) }); }
  static #onClearCrew(event, target) {
    const role = target.dataset.role;
    if (role === "gunner") {
      const gunners = [...this.actor.system.crew.gunners];
      gunners.splice(Number(target.dataset.index), 1);
      return this.actor.update({ "system.crew.gunners": gunners });
    }
    this.actor.update({ [`system.crew.${role}`]: "" });
  }
  static #onAddGunner() { this.actor.update({ "system.crew.gunners": [...this.actor.system.crew.gunners, ""] }); }
  static async #onOpenCrew(event, target) { (await fromUuid(target.dataset.uuid))?.sheet.render({ force: true }); }
  static #onRechargeShields() { this.actor.rechargeShields(); }
  static #onReroutePower() { this.actor.reroutePower(); }
  static #onVehicleCombat(event, target) {
    const fn = {
      dogfight: VC.initiateDogfight, dogfightAttack: VC.dogfightAttack, disengage: VC.disengage, ram: VC.ram,
      hazard: VC.hazardCollision, avoid: VC.avoidCollision, speed: VC.increaseSpeed, allOut: VC.allOut,
      stop: VC.fullStop, shields: VC.toggleShields
    }[target.dataset.op];
    return fn?.(this.actor);
  }
  static #onLeaveDogfight(event, target) { VC.leaveDogfight(this.actor, target.dataset.uuid); }
  static #onCreateEffect() { effectDialog(this.actor); }
  static #onDeleteEffect(event, target) { this.actor.effects.get(target.dataset.id)?.delete(); }
  static #onResetShields() { this.actor.update({ "system.shieldRating": this.actor.system.shieldMax }); }
}
