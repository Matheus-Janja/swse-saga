/**
 * Testes dos cálculos de regras (module/rules/calc.mjs) com personagens de exemplo.
 * Uso: npm test
 */
import assert from "node:assert/strict";
import { computeActor, babFor, aggregateModifiers, evalModifierValue } from "../module/rules/calc.mjs";
import { species, classes, feats, talents, armor, weapons, forcePowers, equipment } from "./data/all.mjs";
const armor_ = key => armor.find(a => a.system.key === key);
import { buildNpcs } from "./build-npcs.mjs";
import { buildVehicles } from "./build-vehicles.mjs";
import { computeVehicle, vehicleWeaponProfile } from "../module/rules/vehicle.mjs";

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

t("Veículos do livro batem com os blocos de estatística", () => {
  let i = 0;
  const { actors, report } = buildVehicles(() => `v${i++}`.padEnd(16, "x"), {});
  assert.deepEqual(report, []);
  assert.equal(actors.length, 230); // 18 Básico + 9 GaW + 7 GoI + 97 SotG + 25 TUR + 5 Threats + 69 Clone Wars CG
});

t("Clone Wars Campaign Guide: seguidores, esquadrões, classes, poderes e feats", async () => {
  const { FOLLOWER_TEMPLATES } = await import("../module/rules/calc.mjs");
  const { squadChanges, attritionNumbers } = await import("../module/helpers/squads.mjs");
  // Gamma-383 "Trench": seguidor defensivo de nível 7, Des 12, armadura de clone (+6)
  const sys = { isNPC: true, npcLevel: 7, follower: { template: "defensive", level: 7 },
    abilities: { str: { base: 10 }, dex: { base: 12 }, con: { base: 10 }, int: { base: 10 }, wis: { base: 10 }, cha: { base: 10 } },
    skills: {}, hp: { base: 0, misc: 0 }, defenses: {}, damageThreshold: {}, condition: { step: 0 }, size: "medium" };
  const d = computeActor(sys, []);
  assert.equal(d.bab, 5);
  assert.equal(d.defenses.reflex.total, 20); // 10 + 7 + 1 (Des) + 2 (modelo)
  assert.equal(d.defenses.will.total, 17);
  assert.equal(d.hpMax, 17);
  assert.equal(FOLLOWER_TEMPLATES.aggressive.bab, "full");
  // Unidade: PV ×4, Limiar = Fortitude + 50, RD 15, atrito
  const u = squadChanges({ size: "medium", hpMax: 22, fort: 13, dt: 13 }, "unit");
  assert.equal(u.hp, 88);
  assert.deepEqual(attritionNumbers(82), [62, 42, 22]);
  assert.ok(u.modifiers.some(m => m.target === "damageThreshold" && m.value === "50"));
  const sq = squadChanges({ size: "medium", hpMax: 10, fort: 11, dt: 11 }, "squad");
  assert.equal(sq.newSize, "large");
  for (const k of ["droid-commander", "military-engineer", "vanguard"]) assert.ok(classes.some(c => c.system.key === k), k);
  for (const k of ["cloak", "levitate", "malacia", "morichro", "phase", "rend", "shatterpoint", "technometry"]) assert.ok(forcePowers.some(p => p.system.key === k), k);
  for (const k of ["droid-hunter", "grand-army-of-the-republic-training", "wary-defender"]) assert.ok(feats.some(x => x.system.key === k), k);
  assert.ok(classes.find(c => c.system.key === "soldier").system.bonusFeats.includes("flood-of-fire"));
  for (const k of ["dug", "gendai", "kaminoan", "nautolan", "geonosian", "chagrian", "republic-clone"]) assert.ok(species.some(x => x.system.key === k), k);
  assert.ok(talents.some(t => t.system.tree === "Korunnai Adept" && t.system.category === "forceTalent"));
});

t("Threats of the Galaxy: PdMs, espécies, árvores, feats e equipamento", async () => {
  const { default: totgNpcs } = await import("./data/totg/npcs.mjs");
  const { shipWeapons } = await import("./data/all.mjs");
  assert.equal(totgNpcs.length, 153);
  for (const k of ["chistori", "miraluka", "mantellian-savrip", "utai"]) assert.ok(species.some(s => s.system.key === k), k);
  const cls = key => classes.find(c => c.system.key === key).system;
  assert.ok(cls("scoundrel").talentTrees.includes("Malkite Poisoner"));
  assert.ok(cls("soldier").talentTrees.includes("Mercenary"));
  assert.ok(cls("elite-trooper").talentTrees.includes("Master of Teräs Käsi"));
  for (const k of ["drain-knowledge", "stolen-form", "hard-target", "vehicle-evasion", "combined-fire-mercenary"]) assert.ok(talents.some(t => t.system.key === k), k);
  for (const k of ["suppression-fire", "a-few-maneuvers", "momentum-strike", "mounted-defense"]) assert.ok(feats.some(x => x.system.key === k), k);
  for (const k of ["datadagger", "sith-sword", "sonic-stunner", "riot-shield"]) assert.ok(weapons.some(w => w.system.key === k), k);
  assert.ok(shipWeapons.some(w => w.system.key === "discord-missile-launcher"));
});

t("The Unknown Regions: espécies, feats bônus de classe, árvores, perigos e veículo Médio", async () => {
  const { default: hazards } = await import("./data/tur/hazards.mjs");
  const { parsePoisonEffect } = await import("../module/rolls/poison.mjs");
  for (const k of ["anzati", "chadra-fan", "chiss", "killik", "ssi-ruuk", "tof", "vagaari", "near-human"]) assert.ok(species.some(s => s.system.key === k), k);
  const cls = key => classes.find(c => c.system.key === key).system;
  assert.ok(cls("scout").bonusFeats.includes("hyperblazer"));
  assert.ok(cls("soldier").talentTrees.includes("Warrior"));
  assert.ok(cls("noble").talentTrees.includes("Exile"));
  assert.ok(talents.some(t => t.system.tree === "Blazing Chain" && t.system.category === "forceTalent"));
  assert.equal(hazards.length, 81);
  assert.ok(hazards.every(h => /^poison|(1d20+d+|99)|(reflex|fortitude|will)|/.test(h.system.special)));
  assert.deepEqual(parsePoisonEffect("dmg2d12+1-step1p-half"), { damage: "2d12+1", steps: 1, persistent: true, half: true, missSteps: 0, skills: 0 });
  assert.ok(weapons.some(w => w.system.key === "verpine-shatter-gun"));
  const { VEHICLE_SIZES } = await import("../module/rules/vehicle.mjs");
  assert.equal(VEHICLE_SIZES.medium.mod, 0);
});

t("Starships of the Galaxy: manobras, talentos, feats e árvores de classe", async () => {
  const { shipWeapons } = await import("./data/all.mjs");
  const man = forcePowers.filter(p => p.system.descriptors.includes("maneuver"));
  assert.equal(man.length, 27);
  assert.ok(man.every(p => ["pilot", "attack", "useTheForce"].includes(p.system.checkSkill) && p.system.dcs.length));
  for (const k of ["starship-tactics", "tactical-genius", "tech-specialist", "starship-designer"]) assert.ok(feats.some(f => f.system.key === k), k);
  for (const k of ["fast-repairs", "vehicle-focus", "great-shot", "begin-attack-run", "fleet-tactics", "force-reflexes", "engineer"]) assert.ok(talents.some(x => x.system.key === k), k);
  const tree = key => classes.find(c => c.system.key === key).system.talentTrees;
  assert.ok(tree("scoundrel").includes("Outlaw Tech"));
  assert.ok(tree("ace-pilot").includes("Squadron Leader"));
  assert.ok(tree("officer").includes("Naval Officer"));
  assert.ok(equipment.filter(e => e.system.category === "starship").length > 30);
  assert.ok(shipWeapons.length > 10 && shipWeapons.every(w => w.type === "vehicleWeapon"));
  // chaves novas não colidem com as de outros livros
  for (const list of [talents, feats, forcePowers]) {
    const mine = list.filter(x => x.system.source === "Starships of the Galaxy").map(x => x.system.key);
    assert.deepEqual(mine.filter(k => list.filter(x => x.system.key === k).length > 1), []);
  }
});

t("Veículo: piloto heroico substitui armadura; artilheiro usa BBA próprio e ½ nível no dano", () => {
  const sys = { size: "gargantuan", abilities: { str: 42, dex: 22, int: 16 }, armor: 7, defenses: { reflex: { misc: 0 }, fortitude: { misc: 0 } },
    damageThreshold: { misc: 0 }, condition: { step: 0 }, crewQuality: "skilled", crewBab: 2, skills: {}, maneuver: "defensive" };
  const pilot = { heroicLevel: 10, bab: 10, pilotTrained: true, skills: { pilot: 15, initiative: 12 } };
  const d = computeVehicle(sys, { pilot });
  // 10 + 6 (Des) − 5 (tamanho) + 10 (nível > armadura 7) + 5 (luta defensiva, piloto treinado)
  assert.equal(d.defenses.reflex.total, 26);
  assert.equal(d.defenses.fortitude.total, 26);
  assert.equal(d.damageThreshold, 46);
  assert.equal(d.skills.pilot.total, 15 + 6 - 5);
  const p = vehicleWeaponProfile(d, { system: { station: "pilot", attackBonus: 0, damageBonus: 0, multiplier: 2 } }, pilot);
  assert.equal(p.attackBonus, 10 + 3 + 2 - 5); // luta defensiva: −5 em todos os artilheiros
  assert.equal(p.damageBonus, 5);
});

t("Combate veicular: movimento total, Vehicle Dodge, efeitos de dogfight e Dogfight Gunner", async () => {
  const { collisionFormula } = await import("../module/rules/vehicle.mjs");
  const base = { size: "huge", abilities: { str: 34, dex: 18, int: 14 }, armor: 3, defenses: { reflex: { misc: 0 }, fortitude: { misc: 0 } },
    damageThreshold: { misc: 0 }, condition: { step: 0 }, crewQuality: "skilled", crewBab: 2, skills: {}, maneuver: "none" };
  const ace = { heroicLevel: 9, bab: 9, pilotTrained: true, acePilotLevel: 4, features: [], skills: {} };
  const n = computeVehicle(base, { pilot: ace });
  assert.equal(n.defenses.reflex.total, 10 + 4 - 2 + 9 + 2); // Vehicle Dodge +2
  const ao = computeVehicle({ ...base, maneuver: "allOut" }, { pilot: ace });
  assert.equal(ao.defenses.reflex.total, 10 + 0 - 2 + 9);
  const fx = [{ name: "Dogfight", modifiers: [{ target: "vehicle.attack.gunner", value: "-5" }] }];
  const d = computeVehicle(base, {}, { effects: fx });
  const gun = { system: { station: "gunner", attackBonus: 0, multiplier: 2 } };
  assert.equal(vehicleWeaponProfile(d, gun, null).attackBonus, 2 + 2 - 5);
  assert.equal(vehicleWeaponProfile(d, gun, { bab: 2, features: ["dogfight-gunner", "expert-gunner"] }).attackBonus, 2 + 2 + 1);
  assert.equal(vehicleWeaponProfile(d, { system: { station: "pilot", attackBonus: 0 } }, null).attackBonus, 2 + 2);
  assert.equal(collisionFormula("gargantuan", 16, true), "(6d6 + 16) * 2");
});

{
  const { droidSpecies, droidSystems } = await import("./data/droids.mjs");
  const { systemCost, droidUnarmedDamage } = await import("../module/rules/droid.mjs");
  const ds = key => structuredClone(droidSystems.find(s => s.system.key === key));
  t("Droide herói: cálculo da ficha", () => {
    const sp = structuredClone(droidSpecies.find(s => s.system.key === "droid-4-medium"));
    const so = find(classes, "soldier"); so.system.hpRolls = [30];
    const shell = ds("durasteel-shell"); shell.system.equipped = true;
    const items = [sp, so, ds("walking-locomotion"), ds("wheeled-locomotion"), ds("improved-sensor-package"), ds("heuristic-processor"), shell,
      find(feats, "armor-proficiency-light")];
    const d = computeActor(sys({ str: 14, dex: 14, con: 8, int: 12, wis: 10, cha: 10 }), items);
    assert.equal(d.isDroid, true);
    assert.equal(d.abilities.dex.total, 16);
    assert.equal(d.abilities.con.mod, 0);
    assert.equal(d.hpMax, 30);
    assert.equal(d.defenses.fortitude.total, 10 + 1 + 2 + 2); // For 14 (+2)
    assert.equal(d.speed, 8); // rodas 8 > andando 6; armadura embutida não reduz
    assert.equal(d.defenses.reflex.parts.level, 4); // max(nível 1, armadura 4)
    assert.equal(d.skills.perception.parts.mods, 2);
    assert.equal(d.skills.useTheForce.usable, false);
  });
  t("Droide Pequeno soma modificadores de grau e de tamanho", () => {
    const sp = droidSpecies.find(s => s.system.key === "droid-2-small").system.abilityMods;
    assert.deepEqual([sp.str, sp.dex, sp.int, sp.cha], [-2, 2, 2, -2]);
  });
  t("Droide: processador básico restringe perícias sem treino", () => {
    const sp = structuredClone(droidSpecies.find(s => s.system.key === "droid-5-small"));
    const d = computeActor(sys({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }), [sp, ds("basic-processor")]);
    assert.equal(d.skills.mechanics.usable, false);
    assert.equal(d.skills.climb.usable, true);
    assert.equal(d.speed, 4);
  });
  t("Droide: custos e dano desarmado (Tabelas 11-3/11-4/11-5)", () => {
    assert.equal(systemCost(ds("wheeled-locomotion").system, "medium", { locomotionIndex: 1 }), 5 * 64 + 500);
    assert.equal(systemCost(ds("flying-locomotion").system, "small", { locomotionIndex: 1 }), 200 * 2 * 81 + 1000);
    assert.equal(systemCost(ds("hand-appendage").system, "small"), 100);
    assert.equal(systemCost(ds("self-destruct").system, "medium"), 720);
    assert.equal(droidUnarmedDamage("medium", "claw", 1), "1d6");
    assert.equal(droidUnarmedDamage("small", "hand"), "1d2");
  });
}

{
  const { targetAdjustment } = await import("../module/rules/effects.mjs");
  const { isExpired } = await import("../module/helpers/effects.mjs");
  const base = () => {
    const sc = find(classes, "scout"); sc.system.hpRolls = [24];
    return [find(species, "human"), sc];
  };
  const abil = { str: 10, dex: 16, con: 10, int: 10, wis: 10, cha: 10 };

  t("Condições: surpreso perde Des e esquiva; Uncanny Dodge I mantém", () => {
    const items = [...base(), find(feats, "dodge")];
    const fx = [{ name: "Dodge", modifiers: [{ target: "defenses.reflex", value: "1", type: "dodge" }] }];
    const normal = computeActor(sys(abil), items, { effects: fx });
    const ff = computeActor(sys(abil), items, { effects: fx, statuses: ["flatFooted"] });
    assert.equal(normal.defenses.reflex.total - ff.defenses.reflex.total, 3 + 1);
    const ud = computeActor(sys(abil), [...items, find(talents, "uncanny-dodge-i")], { effects: fx, statuses: ["flatFooted"] });
    assert.equal(ud.defenses.reflex.total, normal.defenses.reflex.total);
    const pinned = computeActor(sys(abil), [...items, find(talents, "uncanny-dodge-i")], { statuses: ["pinned"] });
    assert.equal(pinned.speed, 0);
    assert.ok(pinned.defenses.reflex.total < normal.defenses.reflex.total);
  });

  t("Condições: luta defensiva, defesa total, caído, cobertura e −10 na trilha", () => {
    const n0 = computeActor(sys(abil), base());
    const fd = computeActor(sys(abil), base(), { statuses: ["fightDefensive"] });
    assert.equal(fd.defenses.reflex.total, n0.defenses.reflex.total + 2);
    assert.equal(fd.attack.melee, n0.attack.melee - 5);
    const s2 = sys(abil); s2.skills = { acrobatics: { trained: true } };
    assert.equal(computeActor(s2, base(), { statuses: ["totalDefense"] }).defenses.reflex.total, n0.defenses.reflex.total + 10);
    assert.equal(computeActor(sys(abil), base(), { statuses: ["prone"] }).attack.melee, n0.attack.melee - 5);
    assert.equal(computeActor(sys(abil), base(), { statuses: ["cover", "improvedCover"] }).defenses.reflex.total, n0.defenses.reflex.total + 10);
    assert.equal(computeActor(sys(abil, { condition: { step: 4 } }), base()).speed, 3);
  });

  t("Buffs: modificadores do mesmo tipo não se acumulam", () => {
    const fx = [
      { name: "Born Leader", modifiers: [{ target: "attack.all", value: "1", type: "insight" }] },
      { name: "Battle Meditation", modifiers: [{ target: "attack.all", value: "1", type: "insight" }] },
      { name: "Inspire Confidence", modifiers: [{ target: "attack.all", value: "1", type: "morale" }] }
    ];
    const d0 = computeActor(sys(abil), base());
    assert.equal(computeActor(sys(abil), base(), { effects: fx }).attack.ranged, d0.attack.ranged + 2);
  });

  t("Ajuste por alvo: caído, cobertura com mira, camuflagem e Keen Shot", () => {
    assert.equal(targetAdjustment({ prone: true }, { melee: true }).delta, -5);
    assert.equal(targetAdjustment({ prone: true }, { melee: false }).delta, 5);
    assert.equal(targetAdjustment({ cover: 5 }, { melee: false, aim: true }).delta, -5);
    assert.equal(targetAdjustment({ concealment: 2 }, { melee: false, keenShot: true }).delta, 0);
    assert.equal(targetAdjustment({ concealment: 5 }, { melee: false, keenShot: true }).delta, 5);
  });

  t("Expiração: até o próximo turno do personagem", () => {
    const fx = exp => ({ flags: { "swse-saga": { expiry: exp } } });
    // Criado no próprio turno (rodada 2, turno 1): não expira nesse turno, expira na rodada 3
    const own = fx({ rounds: 0, combat: "c", round: 2, turn: 1 });
    assert.equal(isExpired(own, { id: "c", round: 2, turn: 1 }), false);
    assert.equal(isExpired(own, { id: "c", round: 3, turn: 1 }), true);
    // Criado por outro antes do turno do personagem na mesma rodada: expira no turno dele
    assert.equal(isExpired(fx({ rounds: 0, combat: "c", round: 2, turn: 0 }), { id: "c", round: 2, turn: 3 }), true);
    // Surpreso do início do combate: some no primeiro turno
    assert.equal(isExpired(fx({ rounds: 0, combat: "c", round: 1, turn: -1 }), { id: "c", round: 1, turn: 0 }), true);
    // 3 rodadas
    assert.equal(isExpired(fx({ rounds: 3, combat: "c", round: 1, turn: 2 }), { id: "c", round: 3, turn: 2 }), false);
    assert.equal(isExpired(fx({ rounds: 3, combat: "c", round: 1, turn: 2 }), { id: "c", round: 4, turn: 2 }), true);
    assert.equal(isExpired({ flags: {} }, { id: "c", round: 9, turn: 0 }), false);
  });
}

t("Talentos: Use the Force no lugar de perícias (Force Intuition, Force Pilot) e Niman", () => {
  const je = find(classes, "jedi"); je.system.hpRolls = [30];
  const saber = structuredClone(weapons.find(w => w.system.key === "lightsaber")); saber.system.equipped = true;
  const s = sys({ str: 10, dex: 12, con: 10, int: 10, wis: 10, cha: 16 });
  s.skills = { useTheForce: { trained: true } };
  const items = [find(species, "human"), je, find(feats, "force-sensitivity"), find(talents, "force-intuition"), find(talents, "force-pilot")];
  const d = computeActor(s, items);
  assert.equal(d.skills.initiative.total, d.skills.useTheForce.total);
  assert.equal(d.skills.pilot.trained, true);
  assert.equal(d.skills.perception.total < d.skills.useTheForce.total, true); // sem Force Perception
  const base = computeActor(s, [...items, saber]);
  const niman = computeActor(s, [...items, saber, find(talents, "niman")]);
  assert.equal(niman.defenses.reflex.total - base.defenses.reflex.total, 1);
  assert.equal(niman.defenses.will.total - base.defenses.will.total, 1);
});

/* ================= Galaxy at War ================= */
t("Galaxy at War: defesas com atributo alternativo, Fight Through Pain, Taung e Zygerrian", () => {
  const sol = () => { const c = find(classes, "soldier"); c.system.hpRolls = [30]; c.system.isStartingClass = true; return c; };
  const s = sys({ str: 16, dex: 10, con: 10, int: 16, wis: 8, cha: 16 });
  const base = computeActor(s, [find(species, "human"), sol()]);
  const all = computeActor(s, [find(species, "human"), sol(), find(feats, "force-of-personality"), find(feats, "predictive-defense"), find(feats, "resilient-strength")]);
  assert.equal(all.defenses.will.total - base.defenses.will.total, 3 - -1);      // Car 16 no lugar de Sab 8
  assert.equal(all.defenses.reflex.total - base.defenses.reflex.total, 3);       // Int 16 no lugar de Des 10
  assert.equal(all.defenses.fortitude.total - base.defenses.fortitude.total, 3); // For 16 no lugar de Con 10
  const ftp = computeActor(s, [find(species, "human"), sol(), find(feats, "fight-through-pain")]);
  assert.equal(ftp.damageThreshold, ftp.defenses.will.total);
  // Zygerrian: Car na Vontade (+2 de espécie); Taung: +1 em todas e +1 no máx. de Des da armadura
  const zy = computeActor(sys({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 16 }), [find(species, "zygerrian"), sol()]);
  assert.equal(zy.defenses.will.total, 10 + 1 + 3 + 2);
  const armor = structuredClone(armor_("battle-armor")); armor.system.equipped = true;
  const ta = computeActor(sys({ str: 10, dex: 18, con: 10, int: 10, wis: 10, cha: 10 }), [find(species, "taung"), sol(), find(feats, "armor-proficiency-light"), find(feats, "armor-proficiency-medium"), armor]);
  assert.equal(ta.armor.maxDex, 3);
  assert.equal(ta.defenses.reflex.parts.ability, 3);
});

t("Galaxy at War: armas naturais, feats de arma, Watchful Step, cibernéticos e Patente", async () => {
  const { unarmedDamageCtx, weaponProfileFrom } = await import("../module/rules/weapon.mjs");
  const ctx = (features, extra = {}) => ({ abilities: { str: { mod: 0 }, dex: { mod: 0 } }, bab: 0, features: features.map(key => ({ key })), size: "medium", ...extra });
  const unarmed = weapons.find(w => w.system.key === "unarmed");
  assert.equal(unarmedDamageCtx(ctx([], { naturalWeapon: "1d6" }), unarmed), "1d6");
  assert.equal(unarmedDamageCtx(ctx(["martial-arts-i"], { naturalWeapon: "1d6" }), unarmed), "1d8");
  assert.equal(unarmedDamageCtx(ctx([], { naturalWeapon: "1d8", size: "large" }), unarmed), "1d8");
  const hbr = weapons.find(w => w.system.key === "heavy-blaster-rifle");
  assert.equal(unarmedDamageCtx(ctx(["riflemaster"]), hbr), "3d12");
  assert.equal(weaponProfileFrom(ctx(["pistoleer"]), weapons.find(w => w.system.key === "blaster-pistol")).accurate, true);
  assert.equal(weaponProfileFrom(ctx(["pistoleer"]), weapons.find(w => w.system.key === "heavy-blaster-pistol")).inaccurate, false);
  assert.equal(weaponProfileFrom(ctx(["echani-expertise"]), unarmed).critRange, 19);
  assert.equal(weaponProfileFrom(ctx(["flurry-of-blows", "flurry-of-blows"]), unarmed).multiattackReduction, 4);
  // Watchful Step
  const sc = find(classes, "scout"); sc.system.hpRolls = [24]; sc.system.isStartingClass = true;
  const s = sys({ str: 10, dex: 10, con: 10, int: 10, wis: 18, cha: 10 });
  s.skills = { perception: { trained: true }, initiative: { trained: true } };
  const ws = computeActor(s, [find(species, "human"), sc, find(talents, "watchful-step")]);
  assert.equal(ws.skills.initiative.total, ws.skills.perception.total);
  // Cibernéticos: −1 em Use the Force; íons como droide até ter blindagem iônica
  const eq = k => { const e = structuredClone(equipment.find(x => x.system.key === k)); e.system.equipped = true; return e; };
  const cy = computeActor(s, [find(species, "human"), sc, eq("skeletal-reinforcement")]);
  assert.equal(cy.cybernetic, true);
  assert.equal(cy.damageThreshold - ws.damageThreshold, 2);
  assert.equal(computeActor(s, [find(species, "human"), sc, eq("skeletal-reinforcement"), eq("ion-shielding")]).cybernetic, false);
  // Patente: soldado 7 (BBA +7) treinado em Knowledge (tactics) com Officer Candidacy Training
  const so = find(classes, "soldier"); so.system.levels = 7; so.system.hpRolls = [30, 6, 6, 6, 6, 6, 6]; so.system.isStartingClass = true;
  const s2 = sys({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 });
  s2.skills = { knowledgeTactics: { trained: true } };
  s2.military = { score: 2, nco: false };
  const r = computeActor(s2, [find(species, "human"), so, find(feats, "officer-candidacy-training")]).military;
  assert.equal(r.score, 1 + 3 + 1 + 1 + 2 + 2); // BBA, ½ nível, Soldier, K(tactics), OCT, manual
  assert.equal(r.title, "Chief Warrant Officer");
  assert.equal(r.bonus, 2);
});

/* ================= Galaxy of Intrigue ================= */
t("Galaxy of Intrigue: Givin, Herglic, Cut the Red Tape e Resolute Stance", () => {
  const nob = () => { const c = find(classes, "noble"); c.system.hpRolls = [18]; c.system.isStartingClass = true; return c; };
  const s = sys({ str: 10, dex: 10, con: 10, int: 14, wis: 10, cha: 10 });
  const hu = computeActor(s, [find(species, "human"), nob()]);
  const gi = computeActor(s, [find(species, "givin"), nob()]);
  assert.equal(gi.damageReduction, 2);
  assert.equal(gi.defenses.fortitude.total - hu.defenses.fortitude.total, 2);
  const he = computeActor(sys({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }), [find(species, "herglic"), nob()]);
  assert.equal(he.secondWind.heal, Math.max(Math.floor(he.hpMax / 4), 10) + 5 + 0);
  const s2 = sys({ str: 10, dex: 10, con: 10, int: 18, wis: 10, cha: 8 });
  s2.skills = { knowledgeBureaucracy: { trained: true } };
  const ct = computeActor(s2, [find(species, "human"), nob(), find(feats, "cut-the-red-tape")]);
  assert.equal(ct.skills.gatherInformation.total, ct.skills.knowledgeBureaucracy.total);
  assert.equal(ct.skills.gatherInformation.trained, true);
  const def = computeActor(s, [find(species, "human"), nob()], { statuses: ["fightDefensive"] });
  const rs = computeActor(s, [find(species, "human"), nob(), find(feats, "resolute-stance")], { statuses: ["fightDefensive"] });
  assert.equal(def.defenses.reflex.total - rs.defenses.reflex.total, 2);
  assert.equal(rs.defenses.will.total - def.defenses.will.total, 2);
});

t("Galaxy of Intrigue: desafios de perícia (CDs, efeitos e resultado)", async () => {
  const SC = await import("../module/rules/skill-challenge.mjs");
  assert.deepEqual(SC.dcRow(8).slice(1), [18, 23, 28, 32, 37]);
  assert.deepEqual(SC.dcRow(20).slice(1), [26, 31, 36, 41, 46]);
  let st = SC.newChallenge({ cl: 8, successesNeeded: 2, effects: { closeCall: true, extremeSuccess: true, catastrophic: true } });
  assert.equal(SC.dcFor(st, "moderate"), 28);
  const chk = (total, dc, extra = {}) => SC.resolveCheck(st, { total, dc, actorId: "a", skill: "perception", features: new Set(), ...extra }).state;
  st = chk(15, 18);            // falhou por 3: Close Call, sem falha
  assert.equal(st.failures, 0);
  st = chk(8, 18);             // falhou por 10: catastrófica → 2 falhas
  assert.equal(st.failures, 2);
  st = chk(30, 18);            // superou por 12: 2 sucessos → vitória
  assert.equal(st.successes, 2);
  assert.equal(st.outcome, "success");
  // Degenerating: falha sobe a CD; Recovery remove falha
  let dg = SC.newChallenge({ cl: 4, effects: { degenerating: true, recovery: true } });
  dg = SC.resolveCheck(dg, { total: 5, dc: 16, actorId: "a", skill: "survival", features: new Set() }).state;
  assert.equal(dg.shift, 1);
  assert.equal(SC.dcFor(dg, "easy"), 21);
  let rc = SC.newChallenge({ cl: 1, failures: 1, effects: { recovery: true } });
  rc = SC.resolveCheck(rc, { total: 25, dc: 18, actorId: "a", skill: "x", features: new Set() }, { recovery: true }).state;
  assert.equal(rc.failures, 0);
  assert.equal(rc.successes, 0);
  // Leading Skill: +2 no próximo teste com outra perícia
  let ls = SC.newChallenge({ cl: 1 });
  ls = SC.resolveCheck(ls, { total: 20, dc: 18, actorId: "a", skill: "perception", features: new Set(["leading-skill"]) }).state;
  const r = SC.resolveCheck(ls, { total: 16, dc: 18, actorId: "a", skill: "stealth", features: new Set() });
  assert.equal(r.entry.result, "success");
  assert.equal(SC.presetState("kessel").successesNeeded, 8);
});

/* ================= Jedi Academy Training Manual ================= */
t("Jedi Academy: Body Control, Knowledge and Defense, White Current Adept, Psychic Citadel, Shard e lightfoil", async () => {
  const { weaponProfileFrom } = await import("../module/rules/weapon.mjs");
  const je = () => { const c = find(classes, "jedi"); c.system.hpRolls = [30]; c.system.isStartingClass = true; return c; };
  const s = sys({ str: 10, dex: 14, con: 10, int: 10, wis: 16, cha: 16 });
  s.skills = { useTheForce: { trained: true } };
  const base = [find(species, "human"), je(), find(feats, "force-sensitivity")];
  const b = computeActor(s, base);
  const bc = computeActor(s, [...base, find(talents, "body-control")]);
  assert.equal(bc.defenses.fortitude.total - b.defenses.fortitude.total, 3);
  const ff = computeActor(s, base, { statuses: ["flatFooted"] });
  const kd = computeActor(s, [...base, find(talents, "knowledge-and-defense")], { statuses: ["flatFooted"] });
  assert.equal(kd.defenses.reflex.total - ff.defenses.reflex.total, 3);
  const wc = computeActor(s, [...base, find(talents, "white-current-adept")]);
  assert.equal(wc.skills.stealth.total, wc.skills.useTheForce.total);
  const fa = find(classes, "force-adept"); fa.system.levels = 3;
  const pc = computeActor(s, [...base, fa, find(talents, "psychic-citadel")]);
  const pc0 = computeActor(s, [...base, fa]);
  assert.equal(pc.defenses.will.total - pc0.defenses.will.total, 3);
  assert.equal(computeActor(s, [find(species, "shard"), je()]).cybernetic, true);
  const ctx = { abilities: { str: { mod: 0 }, dex: { mod: 0 } }, bab: 0, features: [], size: "medium" };
  assert.equal(weaponProfileFrom(ctx, weapons.find(w => w.system.key === "lightfoil-modern")).light, true);
  assert.equal(weaponProfileFrom(ctx, weapons.find(w => w.system.key === "lightsaber")).light, false);
});

/* ================= Scavenger's Guide to Droids ================= */
t("Scavenger's Guide: chassis com perícia embutida, Science Analyzer, Heavy-Duty Actuators e árvores de droide", async () => {
  const { weaponProfileFrom } = await import("../module/rules/weapon.mjs");
  const { extraTrees } = await import("../module/apps/common.mjs");
  const { checkPrereqs } = await import("../module/helpers/prereqs.mjs");
  const sc = find(classes, "scout"); sc.system.hpRolls = [24]; sc.system.isStartingClass = true;
  const s = sys({ str: 14, dex: 12, con: 10, int: 14, wis: 10, cha: 10 });
  const med = computeActor(s, [find(species, "chassis-medical"), sc]);
  assert.equal(med.skills.treatInjury.trained, true);
  assert.equal(med.isDroid, true);
  const sci = computeActor(s, [find(species, "chassis-medical"), sc, find(talents, "science-analyzer")]);
  assert.equal(sci.skills.knowledgeLifeSciences.total - med.skills.knowledgeLifeSciences.total, med.abilities.int.mod);
  const ctx = f => ({ abilities: { str: { mod: 3 }, dex: { mod: 0 } }, bab: 0, features: f.map(key => ({ key })), size: "medium" });
  const club = weapons.find(w => w.system.key === "club");
  assert.equal(weaponProfileFrom(ctx(["heavy-duty-actuators"]), club).damageParts.ability, 6);
  const trees = extraTrees(talents, { force: true, droidDegree: 4 });
  assert.ok(trees.includes("4th-Degree Droid") && trees.includes("Guardian Spirit") && trees.includes("Alter"));
  const prof = { abilities: { dex: 14 }, bab: 1, level: 1, trained: new Set(), feats: [{ key: "dodge" }], talents: [], forcePowers: new Set(), species: "", size: "medium", darkSide: 0, droid: false, locomotion: new Set() };
  assert.equal(checkPrereqs(prof, find(feats, "erratic-target").system.prerequisites).ok, false);
  assert.equal(checkPrereqs({ ...prof, droid: true, locomotion: new Set(["hovering"]) }, find(feats, "erratic-target").system.prerequisites).ok, true);
});

/* ================= Scum and Villainy ================= */
t("Scum and Villainy: melhorias de armas/armaduras, Gand Hardy e classes de prestígio", async () => {
  const { weaponProfileFrom, unarmedDamageCtx } = await import("../module/rules/weapon.mjs");
  const ctx = { abilities: { str: { mod: 0 }, dex: { mod: 0 } }, bab: 0, features: [], size: "medium" };
  const rifle = structuredClone(weapons.find(w => w.system.key === "blaster-rifle"));
  rifle.system.upgrades = ["pulseCharger"];
  const p = weaponProfileFrom(ctx, rifle);
  assert.equal(p.attackParts.weapon, -1);
  assert.equal(p.damageParts.weapon, 3);
  const vb = structuredClone(weapons.find(w => w.system.key === "vibroblade"));
  vb.system.upgrades = ["neutronium", "miniaturized"];
  assert.equal(weaponProfileFrom(ctx, vb).critRange, 19);
  assert.equal(unarmedDamageCtx(ctx, vb), "2d4");
  const sc = find(classes, "scout"); sc.system.hpRolls = [24]; sc.system.isStartingClass = true;
  const s = sys({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 });
  const ar = structuredClone(armor_("half-vest")); ar.system.equipped = true; ar.system.upgrades = ["shadowskin", "shield5"];
  const g = computeActor(s, [find(species, "gand"), sc, ar]);
  assert.equal(g.secondWind.heal, 10 + 5 + 1);
  assert.equal(g.skills.stealth.parts.mods, 5);
  assert.equal(g.shieldRatingMax, 5);
  for (const k of ["assassin", "charlatan", "master-privateer", "outlaw"]) assert.ok(find(classes, k)?.system.talentTrees.length >= 3, k);
});

console.log(`\n${n} testes passaram.`);
