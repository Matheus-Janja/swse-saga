import { SWSE, SYSTEM_ID } from "../config.mjs";
import { checkPrereqs } from "../helpers/prereqs.mjs";
import { abilityMod, babFor } from "../rules/calc.mjs";

let CACHE = null;

/** Carrega os documentos dos compêndios do sistema (uma vez por sessão). */
export async function loadCompendia() {
  if (CACHE) return CACHE;
  const get = async name => (await game.packs.get(`${SYSTEM_ID}.${name}`)?.getDocuments()) ?? [];
  const [species, classes, feats, talentsAll, force, weapons, armor, equipment] = await Promise.all(
    ["species", "classes", "feats", "talents", "force-powers", "weapons", "armor", "equipment"].map(get));
  const droidSystems = await get("droid-systems");
  CACHE = {
    species: species.sort(byName),
    classes: classes.sort(byName),
    feats: feats.sort(byName),
    talents: talentsAll.sort(byName),
    powers: force.filter(i => i.type === "forcePower").sort(byName),
    techniques: force.filter(i => i.type === "talent" && i.system.category === "forceTechnique").sort(byName),
    secrets: force.filter(i => i.type === "talent" && i.system.category === "forceSecret").sort(byName),
    weapons: weapons.sort(byName),
    armor: armor.sort(byName),
    equipment: equipment.sort(byName),
    droidSystems: droidSystems.sort(byName)
  };
  return CACHE;
}
const byName = (a, b) => a.name.localeCompare(b.name);

export const FORCE_TREES = ["Alter", "Control", "Dark Side", "Sense"];
export const enforcePrereqs = () => game.settings.get(SYSTEM_ID, "enforcePrereqs");

/** Lista de itens com status de pré-requisito para exibir num assistente. */
export function annotate(items, profile, { selected = [], owned = [] } = {}) {
  return items.map(i => {
    const res = checkPrereqs(profile, i.system.prerequisites);
    const ownedAlready = owned.includes(i.system.key) && !i.system.repeatable;
    return {
      id: i.id, uuid: i.uuid, name: i.name, img: i.img, key: i.system.key, tree: i.system.tree,
      prereqText: i.system.prerequisites?.text ?? "",
      description: i.system.description,
      ok: res.ok && !ownedAlready, missing: ownedAlready ? [game.i18n.localize("SWSE.AlreadyOwned")] : res.missing,
      selected: selected.includes(i.id),
      choiceType: i.system.choice?.type ?? ""
    };
  });
}

/** Dados prontos para criar um item no ator a partir de um doc do compêndio. */
export function itemData(doc, overrides = {}) {
  const data = doc.toObject();
  delete data._id;
  delete data.folder;
  delete data._stats;
  delete data.sort;
  delete data.ownership;
  foundry.utils.mergeObject(data, overrides);
  foundry.utils.setProperty(data, "flags.core.sourceId", doc.uuid);
  return data;
}

export function babAt(progression, level) { return babFor(progression, level); }
export { abilityMod };

/** Valor de PV ao subir de nível conforme a configuração. */
export async function rollHitPoints(hitDie) {
  const method = game.settings.get(SYSTEM_ID, "hpMethod");
  if (method === "max") return { value: hitDie, roll: null };
  if (method === "average") return { value: Math.floor(hitDie / 2) + 1, roll: null };
  const roll = await new Roll(`1d${hitDie}`).evaluate();
  return { value: roll.total, roll };
}

export function skillLabel(k) { return game.i18n.localize(SWSE.skills[k]?.label ?? k); }
