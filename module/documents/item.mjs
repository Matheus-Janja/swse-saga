import { attackWithWeapon } from "../rolls/attack.mjs";
import { useForcePower } from "../rolls/force.mjs";
import { vehicleAttack } from "../rolls/vehicle.mjs";
import { useTalent } from "../helpers/talent-actions.mjs";

const ICON = n => `systems/swse-saga/assets/icons/${n}.svg`;
const DEFAULT_ICONS = {
  species: ICON("species"), class: ICON("class"), feat: ICON("feat"), talent: ICON("talent"),
  forcePower: ICON("force"), weapon: ICON("blaster-pistol"), armor: ICON("armor"), equipment: ICON("equipment"),
  vehicleWeapon: ICON("vehicle-weapon"), droidSystem: ICON("droid-system")
};

export class SWSEItem extends Item {
  static getDefaultArtwork(data) {
    return { img: DEFAULT_ICONS[data.type] ?? super.getDefaultArtwork(data).img };
  }

  /** Ação principal do item: atacar, usar poder, ou mostrar no chat. */
  async use(options = {}) {
    const actor = this.actor;
    if (!actor) return this.toChat();
    if (this.type === "vehicleWeapon") return actor.type === "vehicle" ? vehicleAttack(actor, this, options) : this.toChat();
    if (this.type === "weapon") return attackWithWeapon(actor, this, options);
    if (this.type === "forcePower") return useForcePower(actor, this);
    if (["feat", "talent"].includes(this.type) && (await useTalent(actor, this))) return;
    // Feromônios Falleen (Scum and Villainy)
    if (this.type === "species" && this.system.key === "falleen") return (await import("../helpers/talent-actions.mjs")).TALENT_ACTIONS.pheromones(actor);
    // Mesmerize (Anzati, The Unknown Regions)
    if (this.type === "species" && this.system.key === "anzati") return (await import("../helpers/talent-actions.mjs")).TALENT_ACTIONS.mesmerize(actor);
    if (this.type === "equipment" && String(this.system.special).startsWith("poison|")) return (await import("../rolls/poison.mjs")).poisonAttack(actor, this);
    if (this.type === "equipment" && this.system.special === "nyriaanSpice") return (await import("../rolls/poison.mjs")).nyriaanSpice(actor, this);
    return this.toChat();
  }

  async toChat() {
    const TextEditor = foundry.applications.ux.TextEditor.implementation;
    const desc = await TextEditor.enrichHTML(this.system.description ?? "", { relativeTo: this });
    const prereq = this.system.prerequisites?.text ? `<p><strong>${game.i18n.localize("SWSE.Prerequisites")}:</strong> ${this.system.prerequisites.text}</p>` : "";
    const choice = this.system.choice?.value ? ` (${this.system.choice.value})` : "";
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: `<div class="swse-card item-card"><header class="card-header"><img src="${this.img}" width="36" height="36"><h3>${this.name}${choice}</h3></header>${prereq}${desc}</div>`
    });
  }

  /** Nome com escolha, ex.: "Weapon Focus (rifles)". */
  get displayName() {
    const c = this.system.choice?.value;
    return c && !this.name.includes("(") ? `${this.name} (${c})` : this.name;
  }
}
