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

export const species = [...coreSpecies, ...gawSpecies];
export const classes = [...patchCoreClasses(coreClasses), ...gawClasses];
export const feats = [...coreFeats, ...gawFeats];
export const talents = [...coreTalents, ...gawTalents];
export { forcePowers };
export const weapons = [...coreGear.weapons, ...gawGear.weapons];
export const armor = [...coreGear.armor, ...gawGear.armor];
export const equipment = [...coreGear.equipment, ...gawGear.equipment, ...gawGear.cybernetics];
