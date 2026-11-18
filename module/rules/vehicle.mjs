/**
 * Regras de veículos (Cap. 10) — funções puras.
 */
import { abilityMod } from "./calc.mjs";

/** Tabela 10-1 e modificadores de Limiar de Dano por tamanho. */
export const VEHICLE_SIZES = {
  large: { label: "SWSE.Size.large", mod: -1, dt: 5, collision: "2d6" },
  huge: { label: "SWSE.Size.huge", mod: -2, dt: 10, collision: "4d6" },
  gargantuan: { label: "SWSE.Size.gargantuan", mod: -5, dt: 20, collision: "6d6" },
  colossal: { label: "SWSE.Size.colossal", mod: -10, dt: 50, collision: "8d6" },
  colossalFrigate: { label: "SWSE.VSize.colossalFrigate", mod: -10, dt: 100, collision: "10d6", capital: true },
  colossalCruiser: { label: "SWSE.VSize.colossalCruiser", mod: -10, dt: 200, collision: "15d6", capital: true },
  colossalStation: { label: "SWSE.VSize.colossalStation", mod: -10, dt: 500, collision: "20d6", capital: true }
};

/** Qualidade da tripulação (quadro "Crew Quality"). */
export const CREW_QUALITY = {
  untrained: { label: "SWSE.Crew.untrained", attack: -5, check: 0, cl: -1 },
  normal: { label: "SWSE.Crew.normal", attack: 0, check: 5, cl: 0 },
  skilled: { label: "SWSE.Crew.skilled", attack: 2, check: 6, cl: 1 },
  expert: { label: "SWSE.Crew.expert", attack: 5, check: 8, cl: 2 },
  ace: { label: "SWSE.Crew.ace", attack: 10, check: 12, cl: 4 }
};

/** Tabela 10-2: alcances [pb, curto, médio, longo] em escala de personagem e de nave. */
export const VEHICLE_WEAPON_TYPES = {
  blaster: { label: "SWSE.VWeapon.blaster", character: [120, 240, 600, 1200], starship: [1, 2, 4, 8] },
  ion: { label: "SWSE.VWeapon.ion", character: [300, 600, 1500, 3000], starship: [2, 4, 10, 20] },
  laser: { label: "SWSE.VWeapon.laser", character: [150, 300, 750, 1500], starship: [1, 2, 5, 10] },
  missile: { label: "SWSE.VWeapon.missile", character: [450, 900, 2250, 4500], starship: [3, 6, 15, 30] },
  pointDefense: { label: "SWSE.VWeapon.pointDefense", character: [150, 300, 750, 1500], starship: [1, 2, 5, 10] },
  tractor: { label: "SWSE.VWeapon.tractor", character: [150, 300, 750, 1500], starship: [1, 2, 5, 10] },
  turbolaser: { label: "SWSE.VWeapon.turbolaser", character: [600, 1200, 3000, 6000], starship: [4, 8, 20, 40] }
};

export const VEHICLE_ROLES = ["pilot", "copilot", "commander", "systemOperator", "engineer"];
export const VEHICLE_SKILLS = ["initiative", "pilot", "mechanics", "perception", "useComputer"];

/** Manobras do piloto que alteram a Defesa de Reflexos (Fight Defensively, Attack Run). */
export const MANEUVERS = {
  none: { label: "SWSE.Maneuver.none" },
  defensive: { label: "SWSE.Maneuver.defensive" },
  defensiveTotal: { label: "SWSE.Maneuver.defensiveTotal" },
  attackRun: { label: "SWSE.Maneuver.attackRun" }
};

/**
 * Calcula os valores derivados de um veículo.
 * @param {object} sys  dados do veículo
 * @param {object} crew { pilot, copilot, commander, systemOperator, engineer } — perfis simples dos tripulantes:
 *   { heroicLevel, bab, skills:{pilot,initiative,mechanics,perception,useComputer}, pilotTrained }
 */
export function computeVehicle(sys, crew = {}) {
  const d = {};
  const size = VEHICLE_SIZES[sys.size] ?? VEHICLE_SIZES.large;
  const quality = CREW_QUALITY[sys.crewQuality] ?? CREW_QUALITY.normal;
  const str = abilityMod(sys.abilities?.str ?? 10);
  const dex = abilityMod(sys.abilities?.dex ?? 10);
  const int = abilityMod(sys.abilities?.int ?? 10);
  d.abilities = { str: { mod: str, total: sys.abilities.str }, dex: { mod: dex, total: sys.abilities.dex }, int: { mod: int, total: sys.abilities.int } };
  d.sizeMod = size.mod;
  d.capital = !!size.capital;
  d.isDroid = true; // veículos: imunes a atordoamento, afetados por íon como droides

  const step = Math.min(Math.max(Number(sys.condition?.step) || 0, 0), 5);
  const condPen = [0, -1, -2, -5, -10, -10][step];
  d.conditionPenalty = condPen;

  const pilot = crew.pilot;
  const pilotTrained = !!pilot?.pilotTrained;
  // Armadura ou nível heroico do piloto (o maior)
  const armorOrLevel = Math.max(Number(sys.armor) || 0, pilot?.heroicLevel ?? 0);
  // Manobras
  let dodge = 0;
  if (sys.maneuver === "defensive") dodge = pilotTrained ? 5 : 2;
  else if (sys.maneuver === "defensiveTotal") dodge = pilotTrained ? 10 : 5;
  const attackRun = sys.maneuver === "attackRun" ? -2 : 0;
  const stationary = !!sys.stationary;
  const dexToRef = stationary ? -5 : dex;
  const refParts = { base: 10, ability: dexToRef, size: size.mod, armor: armorOrLevel, dodge, attackRun, misc: Number(sys.defenses?.reflex?.misc) || 0, condition: condPen };
  const sum = o => Object.values(o).reduce((a, b) => a + (Number(b) || 0), 0);
  const fortParts = { base: 10, ability: str, misc: Number(sys.defenses?.fortitude?.misc) || 0, condition: condPen };
  d.defenses = {
    reflex: { total: sum(refParts), parts: refParts, flatFooted: sum(refParts) - Math.max(dexToRef, 0) - dodge },
    fortitude: { total: sum(fortParts), parts: fortParts }
  };
  d.damageThreshold = d.defenses.fortitude.total + size.dt + (Number(sys.damageThreshold?.misc) || 0);

  // Perícias: tripulante designado ou tripulação padrão (qualidade)
  const role = { initiative: "pilot", pilot: "pilot", mechanics: "engineer", perception: "pilot", useComputer: "systemOperator" };
  d.skills = {};
  for (const k of VEHICLE_SKILLS) {
    const who = crew[role[k]] ?? (k === "mechanics" || k === "useComputer" ? crew.pilot : null);
    const base = who ? (who.skills?.[k] ?? 0) : quality.check;
    const vehicleMods = k === "pilot" || k === "initiative" ? dex + size.mod : 0;
    const misc = who ? 0 : Number(sys.skills?.[k]?.misc) || 0;
    const parts = { crew: base, vehicle: vehicleMods, misc, condition: condPen };
    d.skills[k] = { total: sum(parts), parts, usable: true, byCrew: !!who };
  }

  d.crewBab = Number(sys.crewBab) || 0;
  d.pilotTrained = pilotTrained;
  return d;
}

/**
 * Perfil de ataque de uma arma de veículo.
 * @param {object} v  derivados do veículo (computeVehicle)
 * @param {object} weapon  {system}
 * @param {object|null} gunner  perfil do tripulante na estação (ou null = tripulação padrão)
 */
export function vehicleWeaponProfile(v, weapon, gunner) {
  const w = weapon.system;
  const bab = gunner ? gunner.bab : v.crewBab;
  const trainedPilot = w.station === "pilot" && gunner?.pilotTrained ? 2 : 0;
  const parts = { bab, int: v.abilities.int.mod, trainedPilot, weapon: Number(w.attackBonus) || 0, condition: v.conditionPenalty };
  const attackBonus = Object.values(parts).reduce((a, b) => a + b, 0);
  const halfLevel = gunner ? Math.floor((gunner.heroicLevel || 0) / 2) : 0;
  return { parts, attackBonus, halfLevel, damageBonus: halfLevel + (Number(w.damageBonus) || 0), multiplier: Number(w.multiplier) || 1 };
}
