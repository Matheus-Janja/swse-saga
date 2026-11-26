// Knights of the Old Republic Campaign Guide — Cap. 3: classes de prestígio.
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
    talentTrees: [], talentLevels: "odd", bonusFeatLevels: "", forcePointsBase: 6,
    techniqueLevels: "", secretLevels: "", maxLevel: 10, modifiers: [], credits: "", source: "Knights of the Old Republic Campaign Guide",
    ...o, prerequisites: P(o.prerequisites)
  }
});

export default [
  cls("Corporate Agent", "corporate-agent", {
    bab: "threeQuarter", hitDie: 8, defenses: { reflex: 2, fortitude: 0, will: 4 },
    talentTrees: ["Corporate Power", "Leadership", "Lineage"],
    description: "<p>Agente de uma grande corporação interestelar, com poder comparável ao de um governo (Czerka, Exchange).</p>",
    prerequisites: { text: "Nível 7; treinado em Gather Information e Knowledge (bureaucracy); Skill Focus (Knowledge [bureaucracy]); empregado por uma grande corporação", level: 7, trained: ["gatherInformation", "knowledgeBureaucracy"] },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Corporate Power, Leadership ou Lineage."),
      f(1, "Employment Required", "Precisa continuar empregado por uma grande corporação para ganhar níveis nesta classe."),
      f(2, "Executive Leadership", "Ação rápida, usos por encontro iguais a ½ nível de classe: um aliado em linha de visão recebe até o fim do turno dele +2 quadrados de deslocamento, +2 de moral nos ataques ou +2 de moral nas Defesas.")
    ]
  }),
  cls("Gladiator", "gladiator", {
    bab: "full", hitDie: 10, defenses: { reflex: 4, fortitude: 2, will: 0 },
    talentTrees: ["Gladiatorial Combat", "Awareness", "Armor Specialist"],
    description: "<p>Lutador das arenas da Orla, profissional ou cativo, perigoso dentro e fora delas.</p>",
    prerequisites: { text: "Nível 7; BBA +7; Improved Damage Threshold; Weapon Proficiency (advanced melee)", level: 7, bab: 7, feats: ["improved-damage-threshold", "weapon-proficiency-advanced-melee"] },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Gladiatorial Combat, Awareness ou Armor Specialist."),
      f(2, "Unflinching", "Usos por encontro iguais a ½ nível de classe, reação antes de saber o resultado: soma o nível de Gladiator à Fortitude (e ao Limiar) ou à Vontade até o início do seu próximo turno."),
      f(1, "Crowd Response", "Na arena, a plateia tem atitude (como Persuasion) com cada lutador: prestativa +2 de moral num ataque por rodada, amistosa +1, inamistosa −1, hostil −2. Persuasion CD 25 move a plateia um passo; derrubar um oponente também.")
    ]
  }),
  cls("Melee Duelist", "melee-duelist", {
    bab: "full", hitDie: 8, defenses: { reflex: 4, fortitude: 0, will: 2 },
    talentTrees: ["Melee Duelist", "Brawler", "Weapon Specialist"],
    description: "<p>Especialista em combate singular com uma arma de preferência (Ice, Mari, Qesya Vth'naar).</p>",
    prerequisites: { text: "Nível 7; BBA +7; Melee Defense, Rapid Strike, Weapon Focus em arma exótica corpo a corpo ou arma corpo a corpo avançada", level: 7, bab: 7, feats: ["melee-defense", "rapid-strike"] },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Melee Duelist, Brawler ou Weapon Specialist."),
      f(2, "Master of Movement", "Usos por encontro iguais a ½ nível de classe: numa ação de movimento ignora o terreno difícil ou objetos baixos, ou rerrola um teste de Jump ou Acrobatics ficando com o melhor.")
    ]
  })
];
