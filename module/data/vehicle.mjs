import { computeVehicle, VEHICLE_ROLES, VEHICLE_SKILLS } from "../rules/vehicle.mjs";
import { collectEffects } from "./actor.mjs";

const fields = foundry.data.fields;
const num = (initial = 0, opts = {}) => new fields.NumberField({ required: true, nullable: false, integer: true, initial, ...opts });
const str = (initial = "") => new fields.StringField({ required: true, blank: true, initial });

/** Perfil simples de um tripulante (ator do mundo) para as regras de veículo. */
export function crewProfile(actor) {
  if (!actor?.system?.skills) return null;
  const s = actor.system;
  return {
    name: actor.name,
    heroicLevel: s.heroicLevel ?? 0,
    bab: s.bab ?? 0,
    pilotTrained: !!(s.skills.pilot?.isTrained ?? s.skills.pilot?.trained),
    uuid: actor.uuid,
    features: actor.items.filter(i => ["feat", "talent"].includes(i.type)).map(i => i.system.key),
    acePilotLevel: actor.items.filter(i => i.type === "class" && i.system.key === "ace-pilot").reduce((a, i) => a + (i.system.levels || 0), 0),
    skills: Object.fromEntries(VEHICLE_SKILLS.map(k => [k, s.skills[k]?.total ?? 0]))
  };
}

export class VehicleData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      category: str("starfighter"),
      vehicleType: str(""),
      size: str("gargantuan"),
      challengeLevel: num(1, { min: 0 }),
      abilities: new fields.SchemaField({ str: num(10), dex: num(10), int: num(10) }),
      armor: num(0),
      defenses: new fields.SchemaField({
        reflex: new fields.SchemaField({ misc: num(0) }),
        fortitude: new fields.SchemaField({ misc: num(0) })
      }),
      damageThreshold: new fields.SchemaField({ misc: num(0) }),
      damageReduction: num(0),
      shieldRating: num(0, { min: 0 }),
      shieldMax: num(0, { min: 0 }),
      ionVulnerable: new fields.BooleanField({ initial: false }),
      hp: new fields.SchemaField({ value: num(10), max: num(10), temp: num(0, { min: 0 }) }),
      condition: new fields.SchemaField({ step: num(0, { min: 0, max: 5 }), persistent: new fields.BooleanField({ initial: false }) }),
      maneuver: str("none"),
      dogfight: new fields.ArrayField(new fields.StringField({ blank: false })),
      shieldsUp: new fields.BooleanField({ initial: true }),
      stationary: new fields.BooleanField({ initial: false }),
      crewBab: num(0),
      crewQuality: str("normal"),
      skills: new fields.SchemaField(Object.fromEntries(VEHICLE_SKILLS.map(k => [k, new fields.SchemaField({ misc: num(0) })]))),
      crew: new fields.SchemaField({
        ...Object.fromEntries(VEHICLE_ROLES.map(r => [r, str("")])),
        gunners: new fields.ArrayField(new fields.StringField({ blank: true }))
      }),
      speed: new fields.SchemaField({ character: num(0), starship: num(0), maxVelocity: str(""), notes: str("") }),
      fightingSpace: str(""),
      cover: str(""),
      crewText: str(""),
      passengers: str(""),
      cargo: str(""),
      consumables: str(""),
      carriedCraft: str(""),
      payload: str(""),
      hyperdrive: str(""),
      availability: str(""),
      cost: str(""),
      notes: new fields.HTMLField({ blank: true, initial: "" })
    };
  }

  /** Atores tripulantes (somente atores do mundo; UUIDs inválidos são ignorados). */
  get crewActors() {
    const out = {};
    const get = uuid => {
      if (!uuid) return null;
      try { return fromUuidSync(uuid); } catch { return null; }
    };
    for (const r of VEHICLE_ROLES) out[r] = get(this.crew[r]);
    out.gunners = this.crew.gunners.map(get);
    return out;
  }

  prepareDerivedData() {
    const actors = this.crewActors;
    const crew = Object.fromEntries(VEHICLE_ROLES.map(r => [r, crewProfile(actors[r])]));
    const { statuses, effects } = collectEffects(this.parent);
    const d = computeVehicle(this, crew, { statuses, effects });
    d.crew = crew;
    d.gunners = actors.gunners.map(crewProfile);
    this.derived = d;
    this.defenses.reflex.total = d.defenses.reflex.total;
    this.defenses.reflex.flatFooted = d.defenses.reflex.flatFooted;
    this.defenses.reflex.parts = d.defenses.reflex.parts;
    this.defenses.fortitude.total = d.defenses.fortitude.total;
    this.defenses.fortitude.parts = d.defenses.fortitude.parts;
    // Vontade: veículos não têm; poderes de mente não os afetam (valor alto para comparações)
    this.defenses.will = { total: 99, misc: 0 };
    this.damageThreshold.total = d.damageThreshold;
    for (const k of VEHICLE_SKILLS) Object.assign(this.skills[k], d.skills[k]);
    this.conditionPenalty = d.conditionPenalty;
    this.heroicLevel = 0;
    this.level = 0;
    this.bab = d.crewBab;
  }

  getRollData() {
    return {
      skills: Object.fromEntries(VEHICLE_SKILLS.map(k => [k, { total: this.skills[k].total }])),
      defenses: { reflex: { total: this.defenses.reflex.total }, fortitude: { total: this.defenses.fortitude.total } },
      dt: this.damageThreshold.total,
      hp: { value: this.hp.value, max: this.hp.max }
    };
  }
}
