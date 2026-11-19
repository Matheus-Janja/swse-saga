import { modifierField } from "./actor.mjs";

const fields = foundry.data.fields;
const num = (initial = 0, opts = {}) => new fields.NumberField({ required: true, nullable: false, initial, ...opts });
const str = (initial = "") => new fields.StringField({ required: true, blank: true, initial });
const strArray = () => new fields.ArrayField(new fields.StringField({ blank: false }));

/** Pré-requisitos estruturados (usados pelo verificador) + texto descritivo. */
function prerequisitesField() {
  return new fields.SchemaField({
    text: str(),
    abilities: new fields.ObjectField({ initial: {} }),
    bab: num(0),
    level: num(0),
    trained: strArray(),
    feats: strArray(),
    featsAny: strArray(),
    talents: strArray(),
    talentsAny: strArray(),
    talentTrees: new fields.SchemaField({ trees: strArray(), count: num(0) }),
    forceTalents: num(0),
    forceTechniques: num(0),
    forcePowers: strArray(),
    sameChoice: str(),
    species: strArray(),
    sizes: strArray(),
    darkSide: str(),
    nonDroid: new fields.BooleanField({ initial: false }),
    droidOnly: new fields.BooleanField({ initial: false }),
    locomotion: strArray(),
    appendage: new fields.BooleanField({ initial: false })
  });
}

function choiceField() {
  return new fields.SchemaField({
    type: str(),
    value: str(),
    options: strArray()
  });
}

class BaseItemData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      key: str(),
      description: new fields.HTMLField({ blank: true, initial: "" }),
      source: str("Saga Edition Core Rulebook")
    };
  }
}

export class SpeciesData extends BaseItemData {
  static defineSchema() {
    const abil = {};
    for (const k of ["str", "dex", "con", "int", "wis", "cha"]) abil[k] = num(0);
    return {
      ...super.defineSchema(),
      abilityMods: new fields.SchemaField(abil),
      size: str("medium"),
      speed: num(6),
      swimSpeed: num(0),
      droid: new fields.BooleanField({ initial: false }),
      droidDegree: num(0),
      primitive: new fields.BooleanField({ initial: false }),
      bonusFeats: strArray(),
      bonusFeatChoices: num(0),
      bonusTrainedSkills: num(0),
      autoTrained: strArray(),
      conditionalFeats: new fields.ArrayField(new fields.SchemaField({ skill: str(), feat: str("skill-focus") })),
      rerolls: new fields.ArrayField(new fields.SchemaField({ skill: str(), keep: str("second"), label: str() })),
      languages: str(),
      traits: new fields.ArrayField(new fields.SchemaField({ name: str(), text: str() })),
      naturalWeapon: str(),
      modifiers: modifierField()
    };
  }
}

export class ClassData extends BaseItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      classType: str("base"),
      levels: num(1, { integer: true, min: 0 }),
      isStartingClass: new fields.BooleanField({ initial: false }),
      bab: str("threeQuarter"),
      hitDie: num(8, { integer: true }),
      startingHP: num(0, { integer: true }),
      hpRolls: new fields.ArrayField(new fields.NumberField({ integer: true })),
      defenses: new fields.SchemaField({ reflex: num(0), fortitude: num(0), will: num(0) }),
      trainedSkills: num(0),
      classSkills: strArray(),
      startingFeats: strArray(),
      bonusFeats: strArray(),
      talentTrees: strArray(),
      talentLevels: str("odd"),
      bonusFeatLevels: str("even"),
      forcePointsBase: num(5),
      techniqueLevels: str(""),
      secretLevels: str(""),
      maxLevel: num(20),
      modifiers: modifierField(),
      credits: str(""),
      features: new fields.ArrayField(new fields.SchemaField({ level: num(1), name: str(), text: str() })),
      prerequisites: prerequisitesField()
    };
  }
}

export class FeatData extends BaseItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      prerequisites: prerequisitesField(),
      choice: choiceField(),
      repeatable: new fields.BooleanField({ initial: false }),
      modifiers: modifierField(),
      grantedBy: str()
    };
  }
}

export class TalentData extends BaseItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      category: str("talent"),
      tree: str(),
      classes: strArray(),
      prerequisites: prerequisitesField(),
      choice: choiceField(),
      repeatable: new fields.BooleanField({ initial: false }),
      modifiers: modifierField(),
      rerolls: new fields.ArrayField(new fields.SchemaField({ skill: str(), keep: str("second"), label: str() }))
    };
  }
}

export class ForcePowerData extends BaseItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      descriptors: strArray(),
      time: str(),
      target: str(),
      defense: str(),
      dcs: new fields.ArrayField(new fields.SchemaField({ dc: num(15), text: str() })),
      special: str(),
      uses: num(1, { integer: true, min: 0 }),
      spent: num(0, { integer: true, min: 0 }),
      damage: str()
    };
  }
}

class PhysicalItemData extends BaseItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      cost: num(0),
      weight: num(0),
      quantity: num(1, { integer: true, min: 0 }),
      availability: str(),
      equipped: new fields.BooleanField({ initial: false }),
      modifiers: modifierField()
    };
  }
}

export class WeaponData extends PhysicalItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      group: str("simple"),
      size: str("medium"),
      rangeType: str("melee"),
      damage: str("1d4"),
      damage2: str(),
      damageType: str("energy"),
      stun: new fields.BooleanField({ initial: false }),
      stunDamage: str(),
      ion: new fields.BooleanField({ initial: false }),
      rateOfFire: str("S"),
      area: str(),
      accurate: new fields.BooleanField({ initial: false }),
      inaccurate: new fields.BooleanField({ initial: false }),
      thrown: new fields.BooleanField({ initial: false }),
      reach: new fields.BooleanField({ initial: false }),
      double: new fields.BooleanField({ initial: false }),
      strDamage: new fields.BooleanField({ initial: false }),
      noStrDamage: new fields.BooleanField({ initial: false }),
      ignoresDR: new fields.BooleanField({ initial: false }),
      attackBonus: num(0),
      damageBonus: num(0),
      critRange: num(20),
      critMultiplier: num(2),
      ammo: new fields.SchemaField({ value: num(0), max: num(0) }),
      special: str(),
      settings: str()
    };
  }
}

export class ArmorData extends PhysicalItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      category: str("light"),
      reflexBonus: num(0),
      fortBonus: num(0),
      maxDex: num(5),
      droid: new fields.BooleanField({ initial: false }),
      costBase: num(0),
      special: str()
    };
  }
}

/** Sistema de droide (Cap. 11): locomoção, apêndice, processador, sensores, acessórios. */
export class DroidSystemData extends PhysicalItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      category: str("accessory"),
      costMode: str("flat"),
      costBase: num(0),
      minSize: str(),
      locomotion: new fields.SchemaField({ type: str(), small: num(0), medium: num(0), large: num(0), mult: num(0) }),
      appendage: str(),
      shieldRating: num(0),
      rerolls: new fields.ArrayField(new fields.SchemaField({ skill: str(), keep: str("best"), label: str() })),
      special: str()
    };
  }
}

/** Arma montada em veículo (Cap. 10). */
export class VehicleWeaponData extends BaseItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      weaponType: str("laser"),
      station: str("pilot"),
      gunner: num(1, { integer: true, min: 1 }),
      damage: str("4d10"),
      multiplier: num(2, { integer: true, min: 1 }),
      ion: new fields.BooleanField({ initial: false }),
      autofire: new fields.BooleanField({ initial: false }),
      area: str(),
      penetration: num(0),
      grapple: num(0),
      attackBonus: num(0),
      damageBonus: num(0),
      count: num(1, { integer: true, min: 1 }),
      ammo: new fields.SchemaField({ value: num(0), max: num(0) }),
      special: str()
    };
  }
}

export class EquipmentData extends PhysicalItemData {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      category: str("general"),
      special: str()
    };
  }
}
