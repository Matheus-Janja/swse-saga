export const ICON = n => `systems/swse-saga/assets/icons/${n}.svg`;
/** Ícone do sistema conforme tipo/categoria (os ícones ficam em assets/icons). */
export function iconFor(type, sys) {
  switch (type) {
    case "species": return ICON(sys.droid ? "npc-droid" : "species");
    case "droidSystem": return ICON("droid-system");
    case "class": return ICON("class");
    case "feat": return ICON("feat");
    case "talent": return ICON(sys.category === "forceTechnique" ? "technique" : sys.category === "forceSecret" ? "secret" : sys.category === "forceTalent" ? "force" : "talent");
    case "forcePower": return ICON(sys.descriptors?.includes("darkSide") ? "force-dark" : "force");
    case "armor": return ICON("armor");
    case "equipment": return ICON("equipment");
    case "vehicleWeapon": return ICON("vehicle-weapon");
    case "weapon": {
      const k = sys.key ?? "";
      if (k.startsWith("natural-")) return ICON(k.slice(8));
      if (k === "unarmed" || k === "combat-gloves") return ICON("unarmed");
      if (sys.group === "lightsabers") return ICON("lightsaber");
      if (["bow", "sling"].includes(k)) return ICON("bow");
      if (sys.rangeType === "thrown" && sys.area) return ICON("grenade");
      if (sys.group === "pistols") return ICON("blaster-pistol");
      if (sys.group === "rifles" || ["bowcaster"].includes(k)) return ICON("blaster-rifle");
      if (sys.group === "heavy" || k === "flamethrower") return ICON("heavy-weapon");
      if (sys.double || ["force-pike", "spear", "atlatl", "cesta"].includes(k)) return ICON("staff");
      if (sys.group === "advancedMelee" || ["knife"].includes(k)) return ICON("vibroblade");
      return ICON("melee-simple");
    }
    default: return ICON("macro");
  }
}
