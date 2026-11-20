// Scum and Villainy — Cap. 1: classes de prestígio (Assassin, Charlatan, Master Privateer, Outlaw).
import { CLASS_TREES } from "./talents.mjs";

const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
const f = (level, name, text) => ({ level, name, text });
const cls = (name, key, o) => ({
  name, type: "class", img: "icons/sundries/books/book-embossed-blue.webp",
  system: {
    key, classType: "prestige", levels: 1, isStartingClass: false, bab: "full", hitDie: 10, startingHP: 0, hpRolls: [],
    defenses: { reflex: 0, fortitude: 0, will: 0 }, trainedSkills: 0, classSkills: [], startingFeats: [], bonusFeats: [],
    talentTrees: CLASS_TREES[key] ?? [], talentLevels: "odd", bonusFeatLevels: "", forcePointsBase: 6,
    techniqueLevels: "", secretLevels: "", maxLevel: 10, modifiers: [], credits: "", source: "Scum and Villainy",
    ...o, prerequisites: P(o.prerequisites)
  }
});

export default [
  cls("Assassin", "assassin", {
    bab: "full", hitDie: 10, defenses: { reflex: 4, fortitude: 2, will: 0 },
    description: "<p>Mata por créditos, com discrição e métodos variados: venenos, explosivos ou o tiro perfeito.</p>",
    prerequisites: { text: "Nível 7; treinado em Stealth; Sniper; Dastardly Strike", level: 7, trained: ["stealth"], feats: ["sniper"], talents: ["dastardly-strike"] },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Assassin, GenoHaradan, Misfortune ou Malkite Poisoner (Threats of the Galaxy)."),
      f(2, "Mark", "No início do encontro, escolha um alvo em linha de visão: bônus no dano contra ele igual a ½ nível de classe (dobra em crítico). Ao derrubá-lo (0 PV ou fim da trilha), marca outro alvo como ação livre. Ação rápida: sacrifica o bônus para deixá-lo surpreso contra seu próximo ataque até o fim do turno. Bônus +1 (2º), +2 (4º), +3 (6º), +4 (8º), +5 (10º). (Use o campo de dano extra.)")
    ]
  }),
  cls("Charlatan", "charlatan", {
    bab: "threeQuarter", hitDie: 8, defenses: { reflex: 2, fortitude: 0, will: 4 },
    description: "<p>Vigarista que vive de golpes, disfarces e conversa fiada.</p>",
    prerequisites: { text: "Nível 7; treinado em Deception e Persuasion; 1 talento de Disgrace, Influence ou Lineage", level: 7, trained: ["deception", "persuasion"], talentTrees: { trees: ["Disgrace", "Influence", "Lineage"], count: 1 } },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Trickery, Disgrace ou Fortune."),
      f(2, "Score", "Com uma rodada completa observando um alvo, até o fim do encontro rerrola todos os testes de Deception contra ele, ficando com o melhor."),
      f(4, "Swindle", "Usa Deception no lugar de Stealth para bater carteiras (o alvo entrega o objeto achando que é por vontade própria). Bônus nesses testes: +1 no 6º, +2 no 8º e +5 no 10º nível.")
    ]
  }),
  cls("Master Privateer", "master-privateer", {
    bab: "full", hitDie: 10, defenses: { reflex: 2, fortitude: 0, will: 4 },
    description: "<p>Pirata de alto nível que toma naves e cargas, temido em todo o espaço.</p>",
    prerequisites: { text: "Nível 7; treinado em Deception e Pilot; Vehicular Combat; 2 talentos de Misfortune", level: 7, trained: ["deception", "pilot"], feats: ["vehicular-combat"], talentTrees: { trees: ["Misfortune"], count: 2 } },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Piracy, Infamy ou Spacer."),
      f(2, "Veteran Privateer", "Ao atacar, +2 de competência na jogada; usos por encontro iguais a ½ nível de classe (1 no 2º, até 5 no 10º). (Use o campo de bônus do ataque.)")
    ]
  }),
  cls("Outlaw", "outlaw", {
    bab: "threeQuarter", hitDie: 8, defenses: { reflex: 4, fortitude: 2, will: 0 },
    description: "<p>Fora da lei procurado pelas autoridades, sempre um passo à frente dos perseguidores.</p>",
    prerequisites: { text: "Nível 7; treinado em Stealth e Survival; 1 talento de Disgrace ou Misfortune; procurado pelas autoridades de ao menos um sistema", level: 7, trained: ["stealth", "survival"], talentTrees: { trees: ["Disgrace", "Misfortune"], count: 1 } },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Outlaw, Slicer, Fringer ou Survivor."),
      f(2, "Fugitive", "1/encontro, ao fazer withdraw, move quadrados adicionais: +1 no 2º nível, +2 no 4º, +3 no 6º, +4 no 8º e +5 no 10º.")
    ]
  })
];
