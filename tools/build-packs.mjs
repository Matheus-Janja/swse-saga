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

import { species, classes, feats, talents, forcePowers, weapons, armor, equipment, extraDroidSystems } from "./data/all.mjs";
import macros from "./data/macros.mjs";
import { droidSpecies, droidSystems, DROID_FOLDERS } from "./data/droids.mjs";
import { buildNpcs } from "./build-npcs.mjs";
import { buildVehicles } from "./build-vehicles.mjs";
import { iconFor, ICON } from "./build-packs-icons.mjs";
import { TALENT_ACTIONS } from "../module/helpers/talent-actions.mjs";
const TALENT_ACTION_KEYS = new Set(Object.keys(TALENT_ACTIONS));
const CORE = "Livro Básico";
const sourceFolder = d => d.folder ?? (d.system.source && d.system.source !== "Saga Edition Core Rulebook" ? d.system.source : CORE);
/** Distribui documentos em pastas por fonte (Livro Básico primeiro). */
function bySource(pack, list, extraFolders = []) {
  const folders = new Map([[CORE, folderDoc(pack, CORE, "Item", 0)]]);
  for (const f of extraFolders) folders.set(f.name, f);
  const docs = list.map(d => {
    const name = sourceFolder(d);
    if (!folders.has(name)) folders.set(name, folderDoc(pack, name, "Item", folders.size + 1));
    return itemDoc(pack, d, folders.get(name)._id);
  });
  return [...folders.values(), ...docs];
}

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
/** Marca na descrição se o feat/talento é automatizado (passivo ou com botão de uso na ficha). */
const PASSIVE_AUTO = new Set(["force-intuition", "force-perception", "force-pilot", "force-persuasion", "force-deception", "force-treatment", "niman",
  "dark-scourge", "dark-side-scourge", "uncanny-dodge-ii", "knockdown-shot", "powerful-charge", "melee-defense", "charging-fire", "acrobatic-strike",
  "skirmisher", "knack", "force-power-mastery", "force-power-adept", "dark-side-master", "devastating-power", "resist-the-dark-side",
  "force-point-recovery", "telekinetic-power", "makashi", "jar-kai", "elusive-dogfighter", "relentless-pursuit", "dogfight-gunner", "expert-gunner", "vehicular-evasion", "full-throttle", "improved-disarm", "ranged-disarm", "elusive-target", "shii-cho", "soresu", "redirect-shot",
  // Galaxy at War (opções no diálogo de ataque / automáticos)
  "staggering-attack", "echani-training", "teras-kasi-training", "ktara-training", "wrruushi-training", "prime-targets", "bullseye", "draw-a-bead",
  "hijkata-expertise", "backstabber", "reckless", "aquatic-specialists", "ascension-specialists", "covert-operatives", "medical-team", "mounted-regiment",
  "nimble-team", "slicer-team", "technical-experts", "tireless-squad", "unhindered-approach", "unified-squadron", "wary-sentries", "wilderness-specialists",
  // Galaxy of Intrigue
  "cut-the-red-tape", "resolute-stance", "forceful-recovery", "fleche", "grazing-shot", "bone-crusher", "damaging-disarm", "make-an-example",
  "assured-skill", "exceptional-skill", "reliable-boon", "skill-boon", "skill-confidence", "critical-skill-success", "skillful-recovery",
  "guaranteed-boon", "leading-skill", "learn-from-mistakes", "try-your-luck", "skill-challenge-catastrophic-avoidance",
  // Jedi Academy Training Manual
  "body-control", "knowledge-and-defense", "white-current-adept", "fluidity", "psychic-citadel", "shoto-focus", "master-of-the-great-hunt",
  "brutal-unarmed-strike", "long-haft-strike", "relentless-attack", "regimen-aptitude", "lightsaber-specialist",
  // Scavenger's Guide to Droids
  "aiming-accuracy", "pinpoint-accuracy", "slammer", "mechanical-martial-arts", "ion-shielding", "science-analyzer", "heavy-duty-actuators"]);
function markAutomation(data) {
  const key = data.system.key;
  const d = data.system.description ?? "";
  if (/Automático|botão ⚡/.test(d)) return;
  if (TALENT_ACTION_KEYS.has(key)) data.system.description = `${d}<p><em>Automático: use o botão ⚡ na ficha (ou arraste para a barra de macros).</em></p>`;
  else if (PASSIVE_AUTO.has(key)) data.system.description = `${d}<p><em>Automático.</em></p>`;
}
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const stats = { coreVersion: "14.370", systemId: "swse-saga", systemVersion: "0.1.0" };

function itemDoc(pack, data, folder = null) {
  delete data.system.img;
  delete data.folder;
  if (["feat", "talent"].includes(data.type)) markAutomation(data);
  const _id = makeId(`${pack}:${data.type}:${data.system.tree ?? ""}:${data.name}`);
  return {
    _id, _key: `!items!${_id}`, name: data.name, type: data.type, img: iconFor(data.type, data.system),
    system: data.system, effects: [], folder, sort: 0, flags: {}, ownership: { default: 0 }, _stats: stats
  };
}
function folderDoc(pack, name, type = "Item", sort = 0) {
  const _id = makeId(`${pack}:folder:${name}`);
  return { _id, _key: `!folders!${_id}`, name, type, sorting: "a", folder: null, sort, color: null, flags: {}, description: "" };
}

const packs = {};
{
  const fDroid = folderDoc("species", "Droides (heróis)", "Item", 1);
  const nonChassis = species.filter(d => d.folder !== "Droides (heróis)");
  const chassis = species.filter(d => d.folder === "Droides (heróis)");
  packs.species = [...bySource("species", nonChassis, [fDroid]), ...[...droidSpecies, ...chassis].map(d => itemDoc("species", d, fDroid._id))];
}
{
  const all = [...droidSystems, ...extraDroidSystems];
  const names = [...new Set([...DROID_FOLDERS, ...all.map(d => d.folder)])];
  const folders = Object.fromEntries(names.map((n, i) => [n, folderDoc("droid-systems", n, "Item", i)]));
  packs["droid-systems"] = [...Object.values(folders), ...all.map(d => itemDoc("droid-systems", d, folders[d.folder]._id))];
}

// Classes em pastas: Base / Prestígio / Não heroica
{
  const fBase = folderDoc("classes", "Classes Heroicas", "Item", 1);
  const fPrest = folderDoc("classes", "Classes de Prestígio", "Item", 2);
  const fNon = folderDoc("classes", "Não Heroica", "Item", 3);
  packs.classes = [fBase, fPrest, fNon, ...classes.map(d => itemDoc("classes", d,
    d.system.classType === "prestige" ? fPrest._id : d.system.classType === "nonheroic" ? fNon._id : fBase._id))];
}
packs.feats = bySource("feats", feats);

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
  const fForm = folderDoc("force-powers", "Poderes de Forma de Sabre", "Item", 4);
  const fReg = folderDoc("force-powers", "Regimes da Força", "Item", 5);
  packs["force-powers"] = [fPow, fTech, fSec, fForm, fReg,
    ...forcePowers.filter(d => !d.folder || d.folder === "Poderes da Força").map(d => itemDoc("force-powers", d, fPow._id)),
    ...forcePowers.filter(d => d.folder === "Poderes de Forma de Sabre").map(d => itemDoc("force-powers", d, fForm._id)),
    ...forcePowers.filter(d => d.folder === "Regimes da Força").map(d => itemDoc("force-powers", d, fReg._id)),
    ...talents.filter(t => t.system.category === "forceTechnique").map(d => itemDoc("force-powers", d, fTech._id)),
    ...talents.filter(t => t.system.category === "forceSecret").map(d => itemDoc("force-powers", d, fSec._id))];
}
{
  const groups = { simple: "Simples", pistols: "Pistolas", rifles: "Rifles", heavy: "Pesadas", lightsabers: "Sabres de Luz", advancedMelee: "Corpo a Corpo Avançadas", exotic: "Exóticas" };
  const folders = Object.fromEntries(Object.entries(groups).map(([k, n], i) => [k, folderDoc("weapons", n, "Item", i)]));
  packs.weapons = [...Object.values(folders), ...weapons.map(d => itemDoc("weapons", d, folders[d.system.group]._id))];
}
packs.armor = bySource("armor", armor);
{
  const cats = { communication: "Comunicação", computer: "Computadores", detection: "Detecção", lifeSupport: "Suporte de Vida", medical: "Médico", survival: "Sobrevivência", tools: "Ferramentas", accessory: "Acessórios", cybernetic: "Cibernéticos", poison: "Venenos e Doenças", crystal: "Cristais de Sabre" };
  const folders = Object.fromEntries(Object.entries(cats).map(([k, n], i) => [k, folderDoc("equipment", n, "Item", i)]));
  packs.equipment = [...Object.values(folders), ...equipment.map(d => itemDoc("equipment", d, folders[d.system.category]._id))];
}
packs.macros = macros.map(m => {
  const _id = makeId(`macros:${m.name}`);
  return { _id, _key: `!macros!${_id}`, ...m, img: ICON("macro"), folder: null, sort: 0, flags: {}, ownership: { default: 0 }, _stats: stats };
});

// PdMs (Cap. 11, 15 e 16)
{
  const { folders, actors, report } = buildNpcs({ species, classes, feats, talents, powers: forcePowers, weapons, armor }, makeId, stats);
  if (report.length) {
    console.error(`Divergências nos PdMs:\n  ${report.join("\n  ")}`);
    process.exitCode = 1;
  }
  packs.npcs = [...folders, ...actors];
}

// Veículos (Cap. 10)
{
  const { folders, actors, report } = buildVehicles(makeId, stats);
  if (report.length) {
    console.error(`Divergências nos veículos:\n  ${report.join("\n  ")}`);
    process.exitCode = 1;
  }
  packs.vehicles = [...folders, ...actors];
}

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
