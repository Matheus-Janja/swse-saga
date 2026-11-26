// Junta o conteúdo do Livro Básico com o dos suplementos (usado pelo build dos compêndios e pelos testes).
import coreSpecies from "./species.mjs";
import coreClasses from "./classes.mjs";
import coreFeats from "./feats.mjs";
import coreTalents from "./talents.mjs";
import corePowers from "./force-powers.mjs";
import * as coreGear from "./gear.mjs";
// Galaxy at War
import gawSpecies from "./gaw/species.mjs";
import gawClasses, { patchCoreClasses } from "./gaw/classes.mjs";
import gawFeats from "./gaw/feats.mjs";
import gawTalents from "./gaw/talents.mjs";
import * as gawGear from "./gaw/gear.mjs";
// Galaxy of Intrigue
import goiSpecies from "./goi/species.mjs";
import { patchClassesGoI } from "./goi/classes.mjs";
import goiFeats from "./goi/feats.mjs";
import goiTalents from "./goi/talents.mjs";
import * as goiGear from "./goi/gear.mjs";
// Jedi Academy Training Manual
import jatmSpecies from "./jatm/species.mjs";
import { patchClassesJATM } from "./jatm/classes.mjs";
import jatmFeats from "./jatm/feats.mjs";
import jatmTalents from "./jatm/talents.mjs";
import jatmPowers from "./jatm/force-powers.mjs";
import * as jatmGear from "./jatm/gear.mjs";
// Scavenger's Guide to Droids
import sgdSpecies from "./sgd/species.mjs";
import sgdFeats from "./sgd/feats.mjs";
import sgdTalents from "./sgd/talents.mjs";
import * as sgdSystems from "./sgd/systems.mjs";
// Scum and Villainy
import snvSpecies from "./snv/species.mjs";
import snvClasses from "./snv/classes.mjs";
import snvFeats from "./snv/feats.mjs";
import snvTalents, { CLASS_TREES as SNV_TREES } from "./snv/talents.mjs";
import * as snvGear from "./snv/gear.mjs";
// Starships of the Galaxy
import sotgTalents, { CLASS_TREES as SOTG_TREES, feats as sotgFeats } from "./sotg/talents.mjs";
import sotgManeuvers from "./sotg/maneuvers.mjs";
import * as sotgSystems from "./sotg/systems.mjs";
// The Unknown Regions
import turSpecies from "./tur/species.mjs";
import turTalents, { CLASS_TREES as TUR_TREES, feats as turFeats, CLASS_BONUS_FEATS as TUR_BONUS } from "./tur/talents.mjs";
import * as turGear from "./tur/gear.mjs";
// Threats of the Galaxy
import totgSpecies from "./totg/species.mjs";
import * as totgGear from "./totg/gear.mjs";
import totgTalents, { CLASS_TREES as TOTG_TREES, feats as totgFeats } from "./totg/talents.mjs";
// The Clone Wars Campaign Guide
import cwcgSpecies from "./cwcg/species.mjs";
import cwcgClasses from "./cwcg/classes.mjs";
import cwcgTalents, { CLASS_TREES as CWCG_TREES } from "./cwcg/talents.mjs";
import cwcgFeats, { CLASS_BONUS_FEATS as CWCG_BONUS } from "./cwcg/feats.mjs";
import * as cwcgForce from "./cwcg/force.mjs";
import * as cwcgGear from "./cwcg/gear.mjs";
// Knights of the Old Republic Campaign Guide
import kotorSpecies from "./kotor/species.mjs";
import kotorClasses from "./kotor/classes.mjs";
import kotorTalents, { CLASS_TREES as KOTOR_TREES } from "./kotor/talents.mjs";
import kotorFeats, { CLASS_BONUS_FEATS as KOTOR_BONUS } from "./kotor/feats.mjs";
import * as kotorForce from "./kotor/force.mjs";
import * as kotorGear from "./kotor/gear.mjs";
export const extraDroidSystems = [...sgdSystems.systems, ...sgdSystems.armor];

export const species = [...coreSpecies, ...gawSpecies, ...goiSpecies, ...jatmSpecies, ...sgdSpecies, ...snvSpecies, ...turSpecies, ...totgSpecies, ...cwcgSpecies, ...kotorSpecies];
export const classes = [...patchClassesJATM(patchClassesGoI(patchCoreClasses(coreClasses))), ...gawClasses, ...snvClasses, ...cwcgClasses, ...kotorClasses].map(c => {
  const t = SNV_TREES[c.system.key];
  if (t && c.system.source !== "Scum and Villainy") c.system.talentTrees = [...new Set([...c.system.talentTrees, ...t])];
  const s = SOTG_TREES[c.system.key];
  if (s) c.system.talentTrees = [...new Set([...c.system.talentTrees, ...s])];
  const u = TUR_TREES[c.system.key];
  if (u) c.system.talentTrees = [...new Set([...c.system.talentTrees, ...u])];
  const tt = TOTG_TREES[c.system.key];
  if (tt) c.system.talentTrees = [...new Set([...c.system.talentTrees, ...tt])];
  const kt = KOTOR_TREES[c.system.key];
  if (kt) c.system.talentTrees = [...new Set([...c.system.talentTrees, ...kt])];
  const kb = KOTOR_BONUS[c.system.key];
  if (kb) c.system.bonusFeats = [...new Set([...c.system.bonusFeats, ...kb])];
  const cw = CWCG_TREES[c.system.key];
  if (cw) c.system.talentTrees = [...new Set([...c.system.talentTrees, ...cw])];
  const cwb = CWCG_BONUS[c.system.key];
  if (cwb) c.system.bonusFeats = [...new Set([...c.system.bonusFeats, ...cwb])];
  const bf = TUR_BONUS[c.system.key];
  if (bf) c.system.bonusFeats = [...new Set([...c.system.bonusFeats, ...bf])];
  return c;
});
export const feats = [...coreFeats, ...gawFeats, ...goiFeats, ...jatmFeats, ...sgdFeats, ...snvFeats, ...sotgFeats, ...turFeats, ...totgFeats, ...cwcgFeats, ...kotorFeats];
export const talents = [...coreTalents, ...gawTalents, ...goiTalents, ...jatmTalents, ...sgdTalents, ...snvTalents, ...sotgTalents, ...turTalents, ...totgTalents, ...cwcgTalents, ...cwcgForce.talents, ...kotorTalents, ...kotorForce.talents];
export const forcePowers = [...corePowers, ...jatmPowers, ...sotgManeuvers, ...cwcgForce.powers, ...kotorForce.powers];
export const weapons = [...coreGear.weapons, ...gawGear.weapons, ...goiGear.weapons, ...jatmGear.weapons, ...snvGear.weapons, ...turGear.weapons, ...totgGear.weapons, ...cwcgGear.weapons, ...kotorGear.weapons];
export const armor = [...coreGear.armor, ...gawGear.armor, ...jatmGear.armor, ...snvGear.armor, ...cwcgGear.armor, ...kotorGear.armor];
export const equipment = [...coreGear.equipment, ...gawGear.equipment, ...gawGear.cybernetics, ...goiGear.equipment, ...goiGear.poisons, ...goiGear.misc,
  ...jatmGear.equipment, ...jatmGear.poisons, ...jatmGear.crystals, ...jatmGear.accessories, ...snvGear.equipment, ...sotgSystems.systems, ...turGear.equipment, ...totgGear.equipment, ...cwcgGear.equipment, ...kotorGear.equipment, ...kotorGear.templates];
// Armas de nave (Starships of the Galaxy, Tabela 3-5): itens vehicleWeapon para arrastar à ficha de veículos
export const shipWeapons = [...sotgSystems.shipWeapons, ...totgGear.shipWeapons];
