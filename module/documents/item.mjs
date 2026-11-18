import { attackWithWeapon } from "../rolls/attack.mjs";
import { useForcePower } from "../rolls/force.mjs";

const DEFAULT_ICONS = {
  species: "icons/environment/people/group.webp",
  class: "icons/sundries/books/book-embossed-blue.webp",
  feat: "icons/skills/targeting/crosshair-pointed-orange.webp",
  talent: "icons/magic/symbols/star-yellow.webp",
  forcePower: "icons/magic/lightning/bolt-strike-blue.webp",
  weapon: "icons/weapons/guns/gun-pistol-flintlock-white.webp",
  armor: "icons/equipment/chest/breastplate-banded-steel.webp",
  equipment: "icons/containers/bags/pack-leather-brown.webp"
};

export class SWSEItem extends Item {
  static getDefaultArtwork(data) {
    return { img: DEFAULT_ICONS[data.type] ?? super.getDefaultArtwork(data).img };
  }

  /** Ação principal do item: atacar, usar poder, ou mostrar no chat. */
  async use(options = {}) {
    const actor = this.actor;
    if (!actor) return this.toChat();
    if (this.type === "weapon") return attackWithWeapon(actor, this, options);
    if (this.type === "forcePower") return useForcePower(actor, this);
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
