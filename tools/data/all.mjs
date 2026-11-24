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
export const extraDroidSystems = [...sgdSystems.systems, ...sgdSystems.armor];

export const species = [...coreSpecies, ...gawSpecies, ...goiSpecies, ...jatmSpecies, ...sgdSpecies, ...snvSpecies, ...turSpecies, ...totgSpecies];
export const classes = [...patchClassesJATM(patchClassesGoI(patchCoreClasses(coreClasses))), ...gawClasses, ...snvClasses].map(c => {
  const t = SNV_TREES[c.system.key];
  if (t && c.system.source !== "Scum and Villainy") c.system.talentTrees = [...new Set([...c.system.talentTrees, ...t])];
  const s = SOTG_TREES[c.system.key];
  if (s) c.system.talentTrees = [...new Set([...c.system.talentTrees, ...s])];
  const u = TUR_TREES[c.system.key];
  if (u) c.system.talentTrees = [...new Set([...c.system.talentTrees, ...u])];
  const tt = TOTG_TREES[c.system.key];
  if (tt) c.system.talentTrees = [...new Set([...c.system.talentTrees, ...tt])];
  const bf = TUR_BONUS[c.system.key];
  if (bf) c.system.bonusFeats = [...new Set([...c.system.bonusFeats, ...bf])];
  return c;
});
export const feats = [...coreFeats, ...gawFeats, ...goiFeats, ...jatmFeats, ...sgdFeats, ...snvFeats, ...sotgFeats, ...turFeats, ...totgFeats];
export const talents = [...coreTalents, ...gawTalents, ...goiTalents, ...jatmTalents, ...sgdTalents, ...snvTalents, ...sotgTalents, ...turTalents, ...totgTalents];
export const forcePowers = [...corePowers, ...jatmPowers, ...sotgManeuvers];
export const weapons = [...coreGear.weapons, ...gawGear.weapons, ...goiGear.weapons, ...jatmGear.weapons, ...snvGear.weapons, ...turGear.weapons, ...totgGear.weapons];
export const armor = [...coreGear.armor, ...gawGear.armor, ...jatmGear.armor, ...snvGear.armor];
export const equipment = [...coreGear.equipment, ...gawGear.equipment, ...gawGear.cybernetics, ...goiGear.equipment, ...goiGear.poisons, ...goiGear.misc,
  ...jatmGear.equipment, ...jatmGear.poisons, ...jatmGear.crystals, ...jatmGear.accessories, ...snvGear.equipment, ...sotgSystems.systems, ...turGear.equipment, ...totgGear.equipment];
// Armas de nave (Starships of the Galaxy, Tabela 3-5): itens vehicleWeapon para arrastar à ficha de veículos
export const shipWeapons = [...sotgSystems.shipWeapons, ...totgGear.shipWeapons];
