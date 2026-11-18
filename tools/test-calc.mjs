/**
 * Testes dos cálculos de regras (module/rules/calc.mjs) com personagens de exemplo.
 * Uso: npm test
 */
import assert from "node:assert/strict";
import { computeActor, babFor, aggregateModifiers, evalModifierValue } from "../module/rules/calc.mjs";
import species from "./data/species.mjs";
import classes from "./data/classes.mjs";
import feats from "./data/feats.mjs";
import talents from "./data/talents.mjs";
import { armor, weapons } from "./data/gear.mjs";
import forcePowers from "./data/force-powers.mjs";
import { buildNpcs } from "./build-npcs.mjs";

const find = (list, key) => structuredClone(list.find(i => i.system.key === key));
const clone = x => structuredClone(x);
const sys = (abil, extra = {}) => ({
  abilities: Object.fromEntries(Object.entries(abil).map(([k, v]) => [k, { base: v, increase: 0, misc: 0 }])),
  skills: {}, condition: { step: 0 }, defenses: {}, hp: {}, ...extra
});
let n = 0;
const t = (name, fn) => { fn(); n++; console.log(`✓ ${name}`); };

t("BBA por progressão", () => {
  assert.equal(babFor("full", 1), 1);
  assert.deepEqual([1, 2, 3, 4, 5, 9, 10, 20].map(l => babFor("threeQuarter", l)), [0, 1, 2, 3, 3, 6, 7, 15]);
});

t("Empilhamento de modificadores", () => {
  const a = aggregateModifiers([
    { target: "x", value: 2, type: "species" }, { target: "x", value: 1, type: "species" },
    { target: "x", value: 1, type: "dodge" }, { target: "x", value: 1, type: "dodge" }, { target: "x", value: 1, type: "untyped" }
  ]);
  assert.equal(a.x.total, 2 + 1 + 1 + 1);
  assert.equal(evalModifierValue("@level", { level: 7 }), 7);
  assert.equal(evalModifierValue("@classLevel.elite_trooper/2", { classLevel: { elite_trooper: 5 } }), 2);
});

t("Jedi humano nível 1", () => {
  const jedi = find(classes, "jedi"); jedi.system.hpRolls = [30]; jedi.system.isStartingClass = true;
  const items = [find(species, "human"), jedi, find(feats, "force-sensitivity"), find(feats, "weapon-proficiency-lightsabers")];
  const s = sys({ str: 12, dex: 14, con: 12, int: 10, wis: 13, cha: 14 });
  s.skills = { useTheForce: { trained: true }, perception: { trained: true } };
  const d = computeActor(s, items);
  assert.equal(d.level, 1);
  assert.equal(d.bab, 1);
  assert.equal(d.defenses.reflex.total, 10 + 1 + 2 + 1); // 14
  assert.equal(d.defenses.fortitude.total, 10 + 1 + 1 + 1); // 13
  assert.equal(d.defenses.will.total, 10 + 1 + 1 + 1); // 13
  assert.equal(d.hpMax, 31);
  assert.equal(d.damageThreshold, 13);
  assert.equal(d.skills.useTheForce.total, 0 + 2 + 5);
  assert.equal(d.skills.useTheForce.usable, true);
  assert.equal(d.forcePointsMax, 5);
  assert.equal(d.trainedSkillsAllowed, 2 + 0 + 1);
  assert.equal(d.secondWind.heal, 12); // max(31/4=7, Con 12)
});

t("Soldado Wookiee nível 4 com armadura de batalha e talentos", () => {
  const sol = find(classes, "soldier"); sol.system.levels = 4; sol.system.hpRolls = [30, 6, 7, 8];
  const items = [
    find(species, "wookiee"), sol,
    find(feats, "armor-proficiency-light"), find(feats, "armor-proficiency-medium"), find(feats, "toughness"),
    find(talents, "armored-defense"),
    { ...find(armor, "battle-armor"), system: { ...find(armor, "battle-armor").system, equipped: true } }
  ];
  const s = sys({ str: 14, dex: 12, con: 14, int: 10, wis: 10, cha: 8 });
  const d = computeActor(s, items);
  // Atributos com espécie: For 18, Des 10, Con 16, Sab 8, Car 6
  assert.equal(d.abilities.str.total, 18);
  assert.equal(d.abilities.dex.mod, 0);
  assert.equal(d.bab, 4);
  // Reflexos: 10 + max(4, 8) + min(0, 2) + 1 (classe) = 19
  assert.equal(d.defenses.reflex.total, 19);
  // Fortitude: 10 + 4 + 3 + 2 + 2 (equip.) = 21
  assert.equal(d.defenses.fortitude.total, 21);
  // PV: (30+3)+(6+3)+(7+3)+(8+3) + Toughness 4 = 67
  assert.equal(d.hpMax, 67);
  // Armadura média reduz deslocamento 6 -> 4
  assert.equal(d.speed, 4);
  assert.equal(d.armor.proficient, true);
});

t("Armadura sem proficiência: penalidades", () => {
  const sc = find(classes, "scoundrel"); sc.system.hpRolls = [18];
  const items = [find(species, "human"), sc, { ...find(armor, "battle-armor"), system: { ...find(armor, "battle-armor").system, equipped: true } }];
  const d = computeActor(sys({ str: 10, dex: 16, con: 10, int: 10, wis: 10, cha: 10 }), items);
  assert.equal(d.armor.proficient, false);
  assert.equal(d.armor.fortBonus, 0);
  // Reflexos: 10 + 8 (armadura, sem nível) + min(3, 2) + 2 = 22
  assert.equal(d.defenses.reflex.total, 22);
  assert.equal(d.skills.stealth.parts.armor, -5);
  assert.equal(d.attack.ranged, 0 + 3 - 5);
});

t("Trilha de condição e espécie pequena", () => {
  const sc = find(classes, "scout"); sc.system.hpRolls = [24];
  const s = sys({ str: 8, dex: 16, con: 12, int: 10, wis: 12, cha: 10 }, { condition: { step: 3 } });
  const d = computeActor(s, [find(species, "ewok"), sc]);
  assert.equal(d.size, "small");
  assert.equal(d.conditionPenalty, -5);
  // Reflexos: 10+1+4(Des 18)+2+1(tamanho)-5 = 13
  assert.equal(d.defenses.reflex.total, 13);
  assert.equal(d.speed, 4);
  assert.equal(d.skills.stealth.parts.size, 5);
});

t("Classes múltiplas: melhor bônus de defesa e BBA somado", () => {
  const sc = find(classes, "scout"); sc.system.levels = 6; sc.system.hpRolls = [24, 5, 5, 5, 5, 5];
  const so = find(classes, "soldier"); so.system.levels = 2; so.system.hpRolls = [5, 5];
  const d = computeActor(sys({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }), [find(species, "human"), sc, so]);
  assert.equal(d.level, 8);
  assert.equal(d.bab, 4 + 2);
  assert.equal(d.defenses.reflex.parts.class, 2);
  assert.equal(d.defenses.fortitude.parts.class, 2);
});

t("Zabrak: +1 em todas as Defesas; Improved Defenses acumula (tipos diferentes)", () => {
  const so = find(classes, "soldier"); so.system.hpRolls = [30];
  const d = computeActor(sys({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }), [find(species, "zabrak"), so, find(feats, "improved-defenses")]);
  assert.equal(d.defenses.will.total, 10 + 1 + 0 + 0 + 2);
});

t("Dano soma ½ nível heroico (níveis não heroicos não contam)", () => {
  const nh = find(classes, "nonheroic"); nh.system.levels = 6; nh.system.hpRolls = [3, 3, 3, 3, 3, 3];
  const so = find(classes, "soldier"); so.system.levels = 3; so.system.hpRolls = [30, 6, 6];
  const d = computeActor(sys({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }), [nh, so]);
  assert.equal(d.halfLevel, 4);
  assert.equal(d.damageHalfLevel, 1);
});

t("PdMs do livro batem com os blocos de estatística", () => {
  let i = 0;
  const { actors, report } = buildNpcs({ species, classes, feats, talents, powers: forcePowers, weapons, armor }, () => `id${i++}`.padEnd(16, "x"), {});
  assert.deepEqual(report, []);
  assert.ok(actors.length >= 40);
});

console.log(`\n${n} testes passaram.`);
