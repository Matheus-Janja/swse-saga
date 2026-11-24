/**
 * Monta os atores de veículo (tools/data/vehicles.mjs), calcula com module/rules/vehicle.mjs
 * e ajusta os campos "Outros" para bater com os blocos de estatística do livro.
 */
import { computeVehicle, vehicleWeaponProfile, VEHICLE_SKILLS } from "../module/rules/vehicle.mjs";
import coreVehicles, { FOLDERS } from "./data/vehicles.mjs";
import gawVehicles from "./data/gaw/vehicles.mjs";
import goiVehicles from "./data/goi/vehicles.mjs";
import sotgVehicles from "./data/sotg/vehicles.mjs";
import turVehicles from "./data/tur/vehicles.mjs";
import totgVehicles from "./data/totg/vehicles.mjs";
const vehicles = [...coreVehicles, ...gawVehicles, ...goiVehicles, ...sotgVehicles, ...turVehicles, ...totgVehicles];
import { ICON } from "./build-packs-icons.mjs";

const TOKEN = { large: 2, huge: 3, gargantuan: 4, colossal: 6, colossalFrigate: 8, colossalCruiser: 10, colossalStation: 12 };
const CAT_ICON = { walker: "walker", speeder: "speeder", airspeeder: "speeder", starfighter: "starfighter", transport: "transport", capital: "capital", station: "capital" };
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function buildVehicles(makeId, stats) {
  const folders = FOLDERS.map((name, i) => {
    const _id = makeId(`vehicles:folder:${name}`);
    return { _id, _key: `!folders!${_id}`, name, type: "Actor", sorting: "m", folder: null, sort: (i + 1) * 1000, color: null, flags: {}, description: "" };
  });
  const report = [];
  const actors = [];
  for (const v of vehicles) {
    const problems = [];
    const sys = {
      category: v.cat, vehicleType: v.type, size: v.size, challengeLevel: v.cl,
      abilities: { str: v.ab[0], dex: v.ab[1], int: v.ab[2] }, armor: v.armor,
      defenses: { reflex: { misc: 0 }, fortitude: { misc: 0 } }, damageThreshold: { misc: 0 },
      damageReduction: v.dr ?? 0, shieldRating: v.sr ?? 0, shieldMax: v.sr ?? 0, ionVulnerable: !!v.ionVuln,
      hp: { value: v.hp, max: v.hp, temp: 0 }, condition: { step: 0, persistent: false },
      maneuver: "none", stationary: false, crewBab: v.bab, crewQuality: v.crew,
      skills: Object.fromEntries(VEHICLE_SKILLS.map(k => [k, { misc: 0 }])),
      crew: { pilot: "", copilot: "", commander: "", systemOperator: "", engineer: "", gunners: [] },
      speed: { character: v.speed[0], starship: v.speed[1], maxVelocity: v.maxv ?? "", notes: "" },
      fightingSpace: v.space ?? "", cover: v.cover ?? "", crewText: v.crewText ?? "", passengers: v.passengers ?? "",
      cargo: v.cargo ?? "", consumables: v.cons ?? "", carriedCraft: v.craft ?? "Nenhuma", payload: v.payload ?? "",
      hyperdrive: v.hyper ?? "", availability: v.avail ?? "", cost: v.cost ?? "", notes: v.notes ?? "", source: v.source ?? "Saga Edition Core Rulebook"
    };
    // Defesas e Limiar
    let d = computeVehicle(sys, {});
    sys.defenses.reflex.misc = v.def[0] - d.defenses.reflex.total;
    sys.defenses.fortitude.misc = v.def[1] - d.defenses.fortitude.total;
    d = computeVehicle(sys, {});
    sys.damageThreshold.misc = v.dt - d.damageThreshold;
    for (const [k, target] of Object.entries(v.sk)) sys.skills[k].misc = target - d.skills[k].total;
    d = computeVehicle(sys, {});

    // Armas
    let gunnerN = 0;
    const weapons = v.w.map(w => {
      const station = w.st;
      const gunner = station === "gunner" ? ++gunnerN : 1;
      const item = {
        name: w.n, type: "vehicleWeapon",
        system: {
          key: slug(w.n), description: "", source: v.source ?? "Saga Edition Core Rulebook",
          weaponType: w.t, station, gunner, damage: w.dmg, multiplier: w.x ?? 1, ion: !!w.ion, autofire: !!w.auto,
          area: w.area ?? "", penetration: w.pen ?? 0, grapple: w.grp ?? 0, attackBonus: 0, damageBonus: 0,
          count: w.count ?? 1, ammo: { value: w.ammo ?? 0, max: w.ammo ?? 0 }, special: w.special ?? ""
        }
      };
      const p = vehicleWeaponProfile(d, item, null);
      item.system.attackBonus = w.atk - p.attackBonus;
      return { item, atk: w.atk };
    });

    // Verificação
    d = computeVehicle(sys, {});
    const check = (label, got, want) => { if (got !== want) problems.push(`${label}: ${got} ≠ ${want}`); };
    check("Ref", d.defenses.reflex.total, v.def[0]);
    check("Fort", d.defenses.fortitude.total, v.def[1]);
    check("Limiar", d.damageThreshold, v.dt);
    for (const [k, target] of Object.entries(v.sk)) check(k, d.skills[k].total, target);
    for (const w of weapons) check(w.item.name, vehicleWeaponProfile(d, w.item, null).attackBonus, w.atk);
    if (problems.length) report.push(`${v.name}: ${problems.join("; ")}`);

    const actorId = makeId(`vehicles:actor:${v.name}`);
    const img = ICON(v.icon ?? CAT_ICON[v.cat] ?? "starfighter");
    const tsize = TOKEN[v.size] ?? 2;
    actors.push({
      _id: actorId, _key: `!actors!${actorId}`, name: v.name, type: "vehicle", img, system: sys,
      items: weapons.map((w, i) => {
        const _id = makeId(`vehicles:${v.name}:w:${i}`);
        return { _id, _key: `!actors.items!${actorId}.${_id}`, name: w.item.name, type: "vehicleWeapon", img: ICON("vehicle-weapon"), system: w.item.system, effects: [], folder: null, sort: i * 100, flags: {}, ownership: { default: 0 }, _stats: stats };
      }),
      effects: [], folder: folders.find(f => f.name === v.folder)._id, sort: 0, flags: {}, ownership: { default: 0 }, _stats: stats,
      prototypeToken: {
        name: v.name, displayName: 20, actorLink: false, width: tsize, height: tsize, texture: { src: img }, disposition: 0,
        displayBars: 20, bar1: { attribute: "hp" }, bar2: { attribute: v.sr ? "shieldRating" : null }
      }
    });
  }
  return { folders, actors, report };
}
