// Jedi Academy Training Manual — árvores novas nas classes de prestígio.
import { CLASS_TREES } from "./talents.mjs";
export function patchClassesJATM(classes) {
  for (const c of classes) {
    const k = c.system.key;
    if (CLASS_TREES[k]) c.system.talentTrees = [...new Set([...c.system.talentTrees, ...CLASS_TREES[k]])];
  }
  return classes;
}
