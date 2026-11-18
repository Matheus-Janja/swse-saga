// Galaxy at War — classe de prestígio Martial Arts Master (p.32-33) e ajustes nas classes do Livro Básico.
import { CLASS_BONUS_FEATS } from "./feats.mjs";
import { CLASS_TREES } from "./talents.mjs";

const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, ...o
});
const f = (level, name, text) => ({ level, name, text });
const MA_FEATS = ["echani-training", "hijkata-training", "ktara-training", "kthri-training", "stava-training", "tae-jitsu-training", "teras-kasi-training", "wrruushi-training"];

export default [{
  name: "Martial Arts Master", type: "class", img: "icons/skills/melee/unarmed-punch-fist.webp",
  system: {
    key: "martial-arts-master", classType: "prestige", levels: 1, isStartingClass: false, bab: "full", hitDie: 10, startingHP: 0, hpRolls: [],
    defenses: { reflex: 2, fortitude: 4, will: 0 }, trainedSkills: 0, classSkills: [], startingFeats: [], bonusFeats: [],
    talentTrees: ["Awareness", "Martial Arts Forms", "Unarmed Mastery"], talentLevels: "odd", bonusFeatLevels: "", forcePointsBase: 6,
    techniqueLevels: "", secretLevels: "", maxLevel: 10, modifiers: [], credits: "", source: "Galaxy at War",
    description: "<p>Lutador que transformou o próprio corpo numa arma, dominando uma ou mais artes marciais da galáxia. (A árvore Master of Teräs Käsi está em <em>Threats of the Galaxy</em>.)</p>",
    prerequisites: P({
      text: "BBA +7; Martial Arts I, Martial Arts II, Melee Defense; um feat de treinamento de arte marcial; 1 talento de Brawler ou Survivor",
      bab: 7, feats: ["martial-arts-i", "martial-arts-ii", "melee-defense"], featsAny: MA_FEATS,
      talentTrees: { trees: ["Brawler", "Survivor"], count: 1 }
    }),
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Awareness, Martial Arts Forms ou Unarmed Mastery (ou Master of Teräs Käsi, de Threats of the Galaxy)."),
      f(2, "Tough as Durasteel", "A partir do 2º nível, sempre que causar dano com ataque desarmado usando armadura leve ou nenhuma, recebe PV temporários iguais ao seu nível nesta classe (não acumulam). (Automático no cartão de ataque.)")
    ]
  }
}];

/** Aplica as listas de feats bônus e as árvores de talento novas às classes do Livro Básico. */
export function patchCoreClasses(classes) {
  for (const c of classes) {
    const k = c.system.key;
    if (CLASS_BONUS_FEATS[k]) c.system.bonusFeats = [...new Set([...c.system.bonusFeats, ...CLASS_BONUS_FEATS[k]])];
    if (CLASS_TREES[k]) c.system.talentTrees = [...new Set([...c.system.talentTrees, ...CLASS_TREES[k]])];
    // Veteran (Galaxy at War) também qualifica para Officer
    if (k === "officer") {
      const pre = c.system.prerequisites;
      pre.talentTrees.trees = [...new Set([...pre.talentTrees.trees, "Veteran"])];
      pre.text = pre.text.replace("1 talento de Leadership ou Commando", "1 talento de Leadership, Commando ou Veteran");
    }
  }
  return classes;
}
