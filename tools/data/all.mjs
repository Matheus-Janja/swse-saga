// Junta o conteúdo do Livro Básico com o dos suplementos (usado pelo build dos compêndios e pelos testes).
import coreSpecies from "./species.mjs";
import coreClasses from "./classes.mjs";
import coreFeats from "./feats.mjs";
import coreTalents from "./talents.mjs";
import forcePowers from "./force-powers.mjs";
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

export const species = [...coreSpecies, ...gawSpecies, ...goiSpecies];
export const classes = [...patchClassesGoI(patchCoreClasses(coreClasses)), ...gawClasses];
export const feats = [...coreFeats, ...gawFeats, ...goiFeats];
export const talents = [...coreTalents, ...gawTalents, ...goiTalents];
export { forcePowers };
export const weapons = [...coreGear.weapons, ...gawGear.weapons, ...goiGear.weapons];
export const armor = [...coreGear.armor, ...gawGear.armor];
export const equipment = [...coreGear.equipment, ...gawGear.equipment, ...gawGear.cybernetics, ...goiGear.equipment, ...goiGear.poisons, ...goiGear.misc];
