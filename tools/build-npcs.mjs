/**
 * Monta os documentos de Ator dos PdMs (tools/data/npcs.mjs).
 * Cada PdM recebe espécie, classes, feats, talentos, poderes, armas e armadura do compêndio;
 * depois o motor de regras (module/rules/calc.mjs) calcula a ficha e os campos "Outros"
 * são ajustados para que os valores fiquem iguais ao bloco de estatísticas do livro.
 */
import { computeActor } from "../module/rules/calc.mjs";
import { weaponProfileFrom } from "../module/rules/weapon.mjs";
import { SWSE } from "../module/config.mjs";
import coreNpcs, { FOLDERS as CORE_FOLDERS } from "./data/npcs.mjs";
import gawNpcs, { F as GAW_F } from "./data/gaw/npcs.mjs";
import goiNpcs, { F as GOI_F } from "./data/goi/npcs.mjs";
import jatmNpcs, { F as JATM_F } from "./data/jatm/npcs.mjs";
import jatmDark, { F as JATM_D } from "./data/jatm/darksiders.mjs";
import sgdNpcs, { F as SGD_F } from "./data/sgd/npcs.mjs";
import snvNpcs, { F as SNV_F } from "./data/snv/npcs.mjs";
import turNpcs, { F as TUR_F } from "./data/tur/npcs.mjs";
import totgNpcs, { F as TOTG_F } from "./data/totg/npcs.mjs";
import cwcgNpcs, { F as CWCG_F } from "./data/cwcg/npcs.mjs";
import kotorNpcs, { F as KOTOR_F } from "./data/kotor/npcs.mjs";
const npcs = [...coreNpcs, ...gawNpcs, ...goiNpcs, ...jatmNpcs, ...jatmDark, ...sgdNpcs, ...snvNpcs, ...turNpcs, ...totgNpcs, ...cwcgNpcs, ...kotorNpcs];
const FOLDERS = [...CORE_FOLDERS, ...Object.values(GAW_F), ...Object.values(GOI_F), ...Object.values(JATM_F), ...Object.values(JATM_D), ...Object.values(SGD_F), ...Object.values(SNV_F), ...Object.values(TUR_F), ...Object.values(TOTG_F), ...Object.values(CWCG_F), ...Object.values(KOTOR_F)];
import { iconFor } from "./build-packs-icons.mjs";

const ABIL = ["str", "dex", "con", "int", "wis", "cha"];
const clone = x => structuredClone(x);

const TOKEN_SIZE = { fine: 0.5, diminutive: 0.5, tiny: 0.5, small: 1, medium: 1, large: 2, huge: 3, gargantuan: 4, colossal: 6 };
const BEAST_FOLDERS = new Set(["Feras", GAW_F.beasts, GOI_F.beasts, JATM_F.beasts]);
const HOSTILE = new Set(["Império Galáctico", "Fringe", JATM_D.darksiders, SNV_F.fringe, TUR_F.threats, TOTG_F.creatures, CWCG_F.cis, CWCG_F.beasts, KOTOR_F.sith, KOTOR_F.beasts, ...BEAST_FOLDERS]);
const A = n => `systems/swse-saga/assets/icons/${n}.svg`;
const IMG = { force: A("npc-force"), droid: A("npc-droid"), beast: A("npc-beast"), trooper: A("npc-trooper"), default: A("npc") };
const TROOPERS = /trooper|stormtrooper/i;
const NATURAL = {
  claw: { damageType: "slashing", img: "icons/creatures/claws/claw-curved-jagged-gray.webp" },
  bite: { damageType: "piercing", img: "icons/creatures/abilities/mouth-teeth-sharp.webp" },
  gore: { damageType: "piercing", img: "icons/creatures/abilities/horn-curved-blue.webp" }
};

/**
 * @param {object} data  {species, classes, feats, talents, powers, weapons, armor} (arrays de dados-fonte)
 * @param {(seed:string)=>string} makeId
 * @param {object} stats  _stats para os documentos
 * @returns {{folders:object[], actors:object[], report:string[]}}
 */
export function buildNpcs(data, makeId, stats) {
  const bySysKey = (list, key) => list.find(i => i.system.key === key);
  const folders = FOLDERS.map((name, i) => {
    const _id = makeId(`npcs:folder:${name}`);
    return { _id, _key: `!folders!${_id}`, name, type: "Actor", sorting: "m", folder: null, sort: (i + 1) * 1000, color: null, flags: {}, description: "" };
  });
  const folderId = name => folders.find(f => f.name === name)._id;
  const report = [];
  const actors = [];

  for (const npc of npcs) {
    const problems = [];
    const items = [];
    const species = npc.sp ? bySysKey(data.species, npc.sp) : null;
    if (npc.sp && !species) problems.push(`espécie ${npc.sp}`);
    if (species) items.push(clone(species));

    // Classes
    let firstHeroic = true;
    let level = 0;
    for (const [key, lv] of npc.cls) {
      const c = bySysKey(data.classes, key);
      if (!c) { problems.push(`classe ${key}`); continue; }
      const it = clone(c);
      it.system.levels = lv;
      const avg = Math.floor(it.system.hitDie / 2) + 1;
      const rolls = Array(lv).fill(avg);
      if (firstHeroic && it.system.classType === "base" && it.system.startingHP) { rolls[0] = it.system.startingHP; firstHeroic = false; }
      it.system.hpRolls = rolls;
      it.system.isStartingClass = items.filter(i => i.type === "class").length === 0;
      items.push(it);
      level += lv;
    }

    // Feats e talentos ("chave" ou "chave:escolha")
    const features = [];
    const external = [];
    for (const spec of [...(npc.feats ?? []), ...(npc.tal ?? [])]) {
      const [key, choice] = spec.split(":");
      let doc = data.feats.find(f => f.system.key === key);
      if (!doc) {
        const cands = data.talents.filter(t => t.system.key === key);
        doc = cands.find(t => choice && t.system.choice?.value === choice) ?? cands[0];
      }
      if (!doc) {
        // PdMs "lenient": talentos/feats de suplementos ainda não incluídos vão para as notas
        if (npc.lenient) { external.push(spec.replace(/-/g, " ")); continue; }
        problems.push(`feat/talento ${spec}`); continue;
      }
      const it = clone(doc);
      if (choice) it.system.choice.value = choice;
      items.push(it);
      features.push({ key, choice: it.system.choice?.value || undefined });
    }

    // Poderes da Força
    for (const [key, uses] of Object.entries(npc.pow ?? {})) {
      const doc = bySysKey(data.powers, key);
      if (!doc) { problems.push(`poder ${key}`); continue; }
      const it = clone(doc);
      it.system.uses = uses;
      items.push(it);
    }

    // Armadura
    if (npc.armor) {
      const a = bySysKey(data.armor, npc.armor);
      if (!a) problems.push(`armadura ${npc.armor}`);
      else { const it = clone(a); it.system.equipped = true; items.push(it); }
    }

    // Armas (atributos-alvo guardados para o ajuste)
    const size = species?.system.size ?? npc.size ?? "medium";
    const unarmed = bySysKey(data.weapons, "unarmed");
    const weaponTargets = [];
    for (const w of npc.wpn ?? []) {
      let it;
      let spec;
      if (Array.isArray(w)) {
        const [ref, atk, dmg, pa] = w;
        spec = { atk, dmg, pa: pa ?? 0 };
        const key = typeof ref === "string" ? ref : ref.base;
        const base = bySysKey(data.weapons, key);
        if (!base) { problems.push(`arma ${key}`); continue; }
        it = clone(base);
        if (typeof ref === "object" && ref.name) it.name = ref.name;
      } else if (w.nat) {
        spec = { atk: w.atk, dmg: w.dmg, pa: w.pa ?? 0 };
        it = clone(unarmed);
        it.name = w.name;
        it.img = NATURAL[w.nat]?.img ?? it.img;
        Object.assign(it.system, { key: `natural-${w.nat}`, size, damageType: NATURAL[w.nat]?.damageType ?? "bludgeoning", cost: 0, weight: 0, description: "<p>Arma natural (sempre proficiente).</p>" });
      } else if (w.custom === "probe") {
        spec = { atk: w.atk, dmg: w.dmg, pa: 0 };
        it = clone(unarmed);
        it.name = "Electroshock Probe";
        it.img = "icons/magic/lightning/bolt-strike-blue.webp";
        Object.assign(it.system, { key: "electroshock-probe", size: "tiny", ion: true, damageType: "ion", description: "<p>Sonda de eletrochoque (dano iônico).</p>" });
      }
      const m = /^(\d+d\d+)\s*([+-]\s*\d+)?$/.exec(spec.dmg.replace(/\s/g, ""));
      if (!m) { problems.push(`dano ${spec.dmg}`); continue; }
      it.system.damage = m[1];
      it.system.equipped = true;
      it.system.attackBonus = 0;
      it.system.damageBonus = 0;
      items.push(it);
      weaponTargets.push({ item: it, atk: spec.atk, dmgBonus: m[2] ? Number(m[2].replace(/\s/g, "")) : 0, pa: spec.pa });
    }

    // Dados de sistema
    const sys = {
      abilities: Object.fromEntries(ABIL.map((a, i) => {
        const target = npc.ab[i];
        const spMod = species?.system.abilityMods?.[a] ?? 0;
        return [a, { base: target === null ? 10 : target - spMod, increase: 0, misc: 0 }];
      })),
      skills: Object.fromEntries(Object.keys(SWSE.skills).map(k => [k, { trained: false, misc: 0, ability: "" }])),
      hp: { value: npc.hp, max: npc.hp, temp: 0, misc: 0, base: 0 },
      condition: { step: 0, persistent: false },
      forcePoints: { value: npc.fp ?? 0, max: 0 },
      destinyPoints: { value: npc.dest ?? 0 },
      darkSide: { value: npc.ds ?? 0 },
      secondWind: { used: 0 },
      defenses: { reflex: { misc: 0 }, fortitude: { misc: 0 }, will: { misc: 0 } },
      damageThreshold: { misc: 0 },
      damageReduction: npc.dr ?? 0,
      shieldRating: npc.sr ?? 0,
      isDroid: !!npc.droid,
      speed: { base: npc.speed ?? 6, misc: 0 },
      babBonus: 0,
      size,
      credits: 0,
      xp: 0,
      customModifiers: [],
      details: { player: "", age: "", gender: "", height: "", weight: "", homeworld: "", languages: "", destiny: "", biography: (npc.notes ?? "") + (external.length ? `<p><strong>De outros suplementos (ainda não no compêndio):</strong> ${external.join(", ")}</p>` : "") },
      creationComplete: true,
      npcLevel: level,
      challengeLevel: npc.cl ?? 0
    };
    const plain = () => items.map(i => ({ type: i.type, name: i.name, system: i.system }));
    const calc = () => computeActor({ ...sys, isNPC: true }, plain());

    // 1) BBA
    let d = calc();
    sys.babBonus = npc.bab - d.bab;
    // 2) Defesas
    d = calc();
    const DEF = ["reflex", "fortitude", "will"];
    DEF.forEach((k, i) => { sys.defenses[k].misc = npc.def[i] - d.defenses[k].total; });
    // 3) Limiar, PV, deslocamento
    d = calc();
    sys.damageThreshold.misc = npc.dt - d.damageThreshold;
    sys.hp.misc = npc.hp - d.hpMax;
    if (npc.speed !== undefined) sys.speed.misc = npc.speed - d.speed;
    // 4) Perícias: treinada se o valor do livro só fecha com +5 de treino
    d = calc();
    for (const [k, target] of Object.entries(npc.sk ?? {})) {
      const s = d.skills[k];
      if (!s.trained && target >= s.total + 5) sys.skills[k].trained = true;
    }
    d = calc();
    for (const [k, target] of Object.entries(npc.sk ?? {})) sys.skills[k].misc = target - d.skills[k].total;
    // 5) Armas
    d = calc();
    const ctx = {
      abilities: d.abilities, bab: d.bab, halfLevel: d.halfLevel, damageHalfLevel: d.damageHalfLevel, conditionPenalty: 0, size: d.size,
      species: species?.system.key ?? "", modifiers: d.modifiers, armorPenalty: d.armor?.penalty ?? 0,
      features, classLevels: d.classLevels
    };
    for (const t of weaponTargets) {
      const p = weaponProfileFrom(ctx, t.item);
      t.item.system.attackBonus = (t.atk + t.pa) - p.attackBonus;
      t.item.system.damageBonus = (t.dmgBonus - t.pa * (p.twoHanded ? 2 : 1)) - p.damageBonus;
    }

    // Verificação final
    d = calc();
    const check = (label, got, want) => { if (got !== want) problems.push(`${label}: ${got} ≠ ${want}`); };
    check("BBA", d.bab, npc.bab);
    DEF.forEach((k, i) => check(k, d.defenses[k].total, npc.def[i]));
    check("Limiar", d.damageThreshold, npc.dt);
    check("PV", d.hpMax, npc.hp);
    for (const [k, target] of Object.entries(npc.sk ?? {})) check(k, d.skills[k].total, target);
    const ctx2 = { ...ctx, abilities: d.abilities, bab: d.bab, modifiers: d.modifiers };
    for (const t of weaponTargets) {
      const p = weaponProfileFrom(ctx2, t.item);
      check(`${t.item.name} ataque`, p.attackBonus, t.atk + t.pa);
    }
    if (problems.length) report.push(`${npc.name}: ${problems.join("; ")}`);

    // Documento do ator
    const actorId = makeId(`npcs:actor:${npc.name}`);
    const forceUser = (npc.feats ?? []).includes("force-sensitivity");
    const img = npc.droid ? IMG.droid : BEAST_FOLDERS.has(npc.folder) || npc.folder === TUR_F.mounts || npc.folder === TOTG_F.creatures || npc.folder === CWCG_F.beasts || npc.folder === KOTOR_F.beasts ? IMG.beast : forceUser ? IMG.force : TROOPERS.test(npc.name) ? IMG.trooper : IMG.default;
    const tsize = TOKEN_SIZE[size] ?? 1;
    for (const i of items) delete i.system.img;
    const embedded = items.map((i, idx) => {
      const _id = makeId(`npcs:${npc.name}:item:${idx}:${i.name}`);
      return {
        _id, _key: `!actors.items!${actorId}.${_id}`, name: i.name, type: i.type, img: iconFor(i.type, i.system), system: i.system,
        effects: [], folder: null, sort: idx * 100, flags: {}, ownership: { default: 0 }, _stats: stats
      };
    });
    actors.push({
      _id: actorId, _key: `!actors!${actorId}`, name: npc.name, type: "npc", img, system: sys,
      items: embedded, effects: [], folder: folderId(npc.folder), sort: 0, flags: {}, ownership: { default: 0 }, _stats: stats,
      prototypeToken: {
        name: npc.name.replace(/\s*\(.*\)$/, ""), displayName: 20, actorLink: false, width: tsize, height: tsize,
        texture: { src: img }, disposition: HOSTILE.has(npc.folder) ? -1 : 0, displayBars: 20,
        bar1: { attribute: "hp" }, bar2: { attribute: npc.fp ? "forcePoints" : null }
      }
    });
  }
  return { folders, actors, report };
}
