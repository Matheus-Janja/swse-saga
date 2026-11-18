// Galaxy of Intrigue — ajustes nas classes do Livro Básico (feats bônus e árvores de talento novas).
import { CLASS_BONUS_FEATS } from "./feats.mjs";
import { CLASS_TREES } from "./talents.mjs";

export function patchClassesGoI(classes) {
  for (const c of classes) {
    const k = c.system.key;
    if (CLASS_BONUS_FEATS[k]) c.system.bonusFeats = [...new Set([...c.system.bonusFeats, ...CLASS_BONUS_FEATS[k]])];
    if (CLASS_TREES[k]) c.system.talentTrees = [...new Set([...c.system.talentTrees, ...CLASS_TREES[k]])];
  }
  return classes;
}
