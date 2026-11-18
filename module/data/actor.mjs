import { SWSE } from "../config.mjs";
import { computeActor } from "../rules/calc.mjs";

const fields = foundry.data.fields;

/** Status e modificadores dos efeitos ativos do ator (inclusive os transferidos de itens). */
export function collectEffects(actor) {
  const statuses = new Set();
  const effects = [];
  const all = typeof actor.allApplicableEffects === "function" ? Array.from(actor.allApplicableEffects()) : Array.from(actor.effects ?? []);
  for (const e of all) {
    if (e.disabled || e.isSuppressed) continue;
    for (const s of e.statuses ?? []) statuses.add(s);
    const modifiers = e.flags?.["swse-saga"]?.modifiers;
    if (Array.isArray(modifiers) && modifiers.length) effects.push({ name: e.name, modifiers });
  }
  return { statuses, effects };
}

const num = (initial = 0, opts = {}) => new fields.NumberField({ required: true, nullable: false, integer: true, initial, ...opts });

export function modifierField() {
  return new fields.ArrayField(new fields.SchemaField({
    target: new fields.StringField({ required: true, blank: true, initial: "" }),
    value: new fields.StringField({ required: true, blank: true, initial: "0" }),
    type: new fields.StringField({ required: true, initial: "untyped" }),
    label: new fields.StringField({ required: false, blank: true, initial: "" }),
    disabled: new fields.BooleanField({ initial: false })
  }));
}

class SWSEActorData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const abilities = {};
    for (const key of Object.keys(SWSE.abilities)) {
      abilities[key] = new fields.SchemaField({
        base: num(10, { min: 0 }),
        increase: num(0),
        misc: num(0)
      });
    }
    const skills = {};
    for (const key of Object.keys(SWSE.skills)) {
      skills[key] = new fields.SchemaField({
        trained: new fields.BooleanField({ initial: false }),
        misc: num(0),
        ability: new fields.StringField({ required: false, blank: true, initial: "" })
      });
    }
    const defense = () => new fields.SchemaField({ misc: num(0) });
    return {
      abilities: new fields.SchemaField(abilities),
      skills: new fields.SchemaField(skills),
      hp: new fields.SchemaField({
        value: num(1),
        max: num(1),
        temp: num(0, { min: 0 }),
        misc: num(0),
        base: num(0)
      }),
      condition: new fields.SchemaField({
        step: num(0, { min: 0, max: 5 }),
        persistent: new fields.BooleanField({ initial: false })
      }),
      forcePoints: new fields.SchemaField({ value: num(5, { min: 0 }), max: num(5) }),
      destinyPoints: new fields.SchemaField({ value: num(1, { min: 0 }) }),
      darkSide: new fields.SchemaField({ value: num(0, { min: 0 }) }),
      secondWind: new fields.SchemaField({ used: num(0, { min: 0 }) }),
      defenses: new fields.SchemaField({ reflex: defense(), fortitude: defense(), will: defense() }),
      damageThreshold: new fields.SchemaField({ misc: num(0) }),
      damageReduction: num(0),
      shieldRating: num(0, { min: 0 }),
      isDroid: new fields.BooleanField({ initial: false }),
      speed: new fields.SchemaField({ base: num(6), misc: num(0) }),
      babBonus: num(0),
      size: new fields.StringField({ initial: "medium" }),
      credits: num(0),
      xp: num(0, { min: 0 }),
      customModifiers: modifierField(),
      details: new fields.SchemaField({
        player: new fields.StringField({ blank: true, initial: "" }),
        age: new fields.StringField({ blank: true, initial: "" }),
        gender: new fields.StringField({ blank: true, initial: "" }),
        height: new fields.StringField({ blank: true, initial: "" }),
        weight: new fields.StringField({ blank: true, initial: "" }),
        homeworld: new fields.StringField({ blank: true, initial: "" }),
        languages: new fields.StringField({ blank: true, initial: "Basic" }),
        destiny: new fields.StringField({ blank: true, initial: "" }),
        biography: new fields.HTMLField({ blank: true, initial: "" })
      }),
      military: new fields.SchemaField({
        organization: new fields.StringField({ blank: true, initial: "" }),
        score: num(0),
        nco: new fields.BooleanField({ initial: false })
      }),
      creationComplete: new fields.BooleanField({ initial: false })
    };
  }

  get isNPC() { return false; }

  prepareDerivedData() {
    const actor = this.parent;
    const items = actor.items.map(i => ({ type: i.type, name: i.name, system: i.system }));
    const src = this.toObject(false);
    src.isNPC = this.isNPC;
    const { statuses, effects } = collectEffects(actor);
    const d = computeActor(src, items, { statuses, effects });
    Object.assign(this, { derived: d });
    // Atalhos práticos para fórmulas (@abilities.str.mod, @skills.perception.total, @defenses.reflex.total ...)
    for (const [k, v] of Object.entries(d.abilities)) Object.assign(this.abilities[k], v);
    for (const [k, v] of Object.entries(d.skills)) {
      Object.assign(this.skills[k], { total: v.total, parts: v.parts, focus: v.focus, usable: v.usable, isTrained: v.trained, abilityUsed: v.ability });
    }
    for (const k of Object.keys(SWSE.defenses)) Object.assign(this.defenses[k], d.defenses[k]);
    this.level = d.level;
    this.heroicLevel = d.heroicLevel;
    this.halfLevel = d.halfLevel;
    this.bab = d.bab;
    this.hp.max = d.hpMax;
    this.forcePoints.max = d.forcePointsMax;
    this.damageThreshold.total = d.damageThreshold;
    this.damageReduction = d.damageReduction;
    this.speed.total = d.speed;
    this.grapple = d.grapple;
    this.conditionPenalty = d.conditionPenalty;
  }

  getRollData() {
    const data = {
      abilities: Object.fromEntries(Object.entries(this.abilities).map(([k, v]) => [k, { total: v.total, mod: v.mod }])),
      skills: Object.fromEntries(Object.entries(this.skills).map(([k, v]) => [k, { total: v.total }])),
      defenses: Object.fromEntries(Object.keys(SWSE.defenses).map(k => [k, { total: this.defenses[k].total }])),
      level: this.level,
      heroicLevel: this.heroicLevel,
      halfLevel: this.halfLevel,
      bab: this.bab,
      dt: this.damageThreshold.total,
      hp: { value: this.hp.value, max: this.hp.max },
      condition: this.conditionPenalty
    };
    for (const [k, v] of Object.entries(this.abilities)) data[k] = v.mod;
    return data;
  }
}

export class CharacterData extends SWSEActorData {}

export class NpcData extends SWSEActorData {
  static defineSchema() {
    const schema = super.defineSchema();
    schema.npcLevel = num(1, { min: 0 });
    schema.challengeLevel = num(1, { min: 0 });
    return schema;
  }
  get isNPC() { return true; }
}
