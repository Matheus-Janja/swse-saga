/**
 * Gera os compêndios a partir de tools/data/*.mjs.
 *   1. Escreve um JSON por documento em packs-src/<pack>/
 *   2. Compila cada pasta para LevelDB em packs/<pack> com @foundryvtt/foundryvtt-cli
 * Uso: npm run build:packs
 */
import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compilePack } from "@foundryvtt/foundryvtt-cli";

import species from "./data/species.mjs";
import classes from "./data/classes.mjs";
import feats from "./data/feats.mjs";
import talents from "./data/talents.mjs";
import forcePowers from "./data/force-powers.mjs";
import { weapons, armor, equipment } from "./data/gear.mjs";
import macros from "./data/macros.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "packs-src");
const OUT = path.join(ROOT, "packs");

const ALNUM = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function makeId(seed) {
  const h = createHash("sha256").update(seed).digest();
  let id = "";
  for (let i = 0; i < 16; i++) id += ALNUM[h[i] % ALNUM.length];
  return id;
}
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const stats = { coreVersion: "14.370", systemId: "swse-saga", systemVersion: "0.1.0" };

function itemDoc(pack, data, folder = null) {
  const _id = makeId(`${pack}:${data.type}:${data.system.tree ?? ""}:${data.name}`);
  return {
    _id, _key: `!items!${_id}`, name: data.name, type: data.type, img: data.img,
    system: data.system, effects: [], folder, sort: 0, flags: {}, ownership: { default: 0 }, _stats: stats
  };
}
function folderDoc(pack, name, type = "Item", sort = 0) {
  const _id = makeId(`${pack}:folder:${name}`);
  return { _id, _key: `!folders!${_id}`, name, type, sorting: "a", folder: null, sort, color: null, flags: {}, description: "" };
}

const packs = {};
packs.species = species.map(d => itemDoc("species", d));

// Classes em pastas: Base / Prestígio / Não heroica
{
  const fBase = folderDoc("classes", "Classes Heroicas", "Item", 1);
  const fPrest = folderDoc("classes", "Classes de Prestígio", "Item", 2);
  const fNon = folderDoc("classes", "Não Heroica", "Item", 3);
  packs.classes = [fBase, fPrest, fNon, ...classes.map(d => itemDoc("classes", d,
    d.system.classType === "prestige" ? fPrest._id : d.system.classType === "nonheroic" ? fNon._id : fBase._id))];
}
packs.feats = feats.map(d => itemDoc("feats", d));

// Talentos em pastas por árvore (técnicas e segredos ficam no pack de poderes)
{
  const docs = [];
  const folders = new Map();
  for (const t of talents.filter(t => !["forceTechnique", "forceSecret"].includes(t.system.category))) {
    if (!folders.has(t.system.tree)) folders.set(t.system.tree, folderDoc("talents", t.system.tree));
    docs.push(itemDoc("talents", t, folders.get(t.system.tree)._id));
  }
  packs.talents = [...folders.values(), ...docs];
}
{
  const fPow = folderDoc("force-powers", "Poderes da Força", "Item", 1);
  const fTech = folderDoc("force-powers", "Técnicas da Força", "Item", 2);
  const fSec = folderDoc("force-powers", "Segredos da Força", "Item", 3);
  packs["force-powers"] = [fPow, fTech, fSec,
    ...forcePowers.map(d => itemDoc("force-powers", d, fPow._id)),
    ...talents.filter(t => t.system.category === "forceTechnique").map(d => itemDoc("force-powers", d, fTech._id)),
    ...talents.filter(t => t.system.category === "forceSecret").map(d => itemDoc("force-powers", d, fSec._id))];
}
{
  const groups = { simple: "Simples", pistols: "Pistolas", rifles: "Rifles", heavy: "Pesadas", lightsabers: "Sabres de Luz", advancedMelee: "Corpo a Corpo Avançadas", exotic: "Exóticas" };
  const folders = Object.fromEntries(Object.entries(groups).map(([k, n], i) => [k, folderDoc("weapons", n, "Item", i)]));
  packs.weapons = [...Object.values(folders), ...weapons.map(d => itemDoc("weapons", d, folders[d.system.group]._id))];
}
packs.armor = armor.map(d => itemDoc("armor", d));
{
  const cats = { communication: "Comunicação", computer: "Computadores", detection: "Detecção", lifeSupport: "Suporte de Vida", medical: "Médico", survival: "Sobrevivência", tools: "Ferramentas", accessory: "Acessórios" };
  const folders = Object.fromEntries(Object.entries(cats).map(([k, n], i) => [k, folderDoc("equipment", n, "Item", i)]));
  packs.equipment = [...Object.values(folders), ...equipment.map(d => itemDoc("equipment", d, folders[d.system.category]._id))];
}
packs.macros = macros.map(m => {
  const _id = makeId(`macros:${m.name}`);
  return { _id, _key: `!macros!${_id}`, ...m, folder: null, sort: 0, flags: {}, ownership: { default: 0 }, _stats: stats };
});

// Checagem de IDs duplicados
for (const [name, docs] of Object.entries(packs)) {
  const ids = new Set();
  for (const d of docs) {
    if (ids.has(d._id)) throw new Error(`ID duplicado em ${name}: ${d.name}`);
    ids.add(d._id);
  }
}

await rm(SRC, { recursive: true, force: true });
await rm(OUT, { recursive: true, force: true });
for (const [name, docs] of Object.entries(packs)) {
  const dir = path.join(SRC, name);
  await mkdir(dir, { recursive: true });
  for (const d of docs) {
    const prefix = d._key.startsWith("!folders!") ? "_folder_" : "";
    await writeFile(path.join(dir, `${prefix}${slug(d.name)}_${d._id}.json`), JSON.stringify(d, null, 2));
  }
  await compilePack(dir, path.join(OUT, name), { log: false });
  console.log(`${name}: ${docs.length} documentos`);
}
