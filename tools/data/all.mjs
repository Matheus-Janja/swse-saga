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
export const extraDroidSystems = [...sgdSystems.systems, ...sgdSystems.armor];

export const species = [...coreSpecies, ...gawSpecies, ...goiSpecies, ...jatmSpecies, ...sgdSpecies, ...snvSpecies];
export const classes = [...patchClassesJATM(patchClassesGoI(patchCoreClasses(coreClasses))), ...gawClasses, ...snvClasses].map(c => {
  const t = SNV_TREES[c.system.key];
  if (t && c.system.source !== "Scum and Villainy") c.system.talentTrees = [...new Set([...c.system.talentTrees, ...t])];
  return c;
});
export const feats = [...coreFeats, ...gawFeats, ...goiFeats, ...jatmFeats, ...sgdFeats, ...snvFeats];
export const talents = [...coreTalents, ...gawTalents, ...goiTalents, ...jatmTalents, ...sgdTalents, ...snvTalents];
export const forcePowers = [...corePowers, ...jatmPowers];
export const weapons = [...coreGear.weapons, ...gawGear.weapons, ...goiGear.weapons, ...jatmGear.weapons, ...snvGear.weapons];
export const armor = [...coreGear.armor, ...gawGear.armor, ...jatmGear.armor, ...snvGear.armor];
export const equipment = [...coreGear.equipment, ...gawGear.equipment, ...gawGear.cybernetics, ...goiGear.equipment, ...goiGear.poisons, ...goiGear.misc,
  ...jatmGear.equipment, ...jatmGear.poisons, ...jatmGear.crystals, ...jatmGear.accessories, ...snvGear.equipment];
