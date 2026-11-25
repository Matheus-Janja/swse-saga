// The Clone Wars Campaign Guide — Cap. 3: classes de prestígio (Droid Commander, Military Engineer, Vanguard).
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
    techniqueLevels: "", secretLevels: "", maxLevel: 10, modifiers: [], credits: "", source: "The Clone Wars Campaign Guide",
    ...o, prerequisites: P(o.prerequisites)
  }
});

export default [
  cls("Droid Commander", "droid-commander", {
    bab: "full", hitDie: 10, defenses: { reflex: 2, fortitude: 2, will: 2 },
    talentTrees: ["Droid Commander", "Inspiration", "Leadership", "Override"],
    description: "<p>Droide de comando que lidera esquadrões de droides no campo de batalha (OOM-9, OLR-4).</p>",
    prerequisites: { text: "Nível 7; treinado em Knowledge (tactics) e Use Computer; 1 talento de Leadership ou Commando; só droides", level: 7, trained: ["knowledgeTactics", "useComputer"], talentTrees: { trees: ["Leadership", "Commando"], count: 1 }, droidOnly: true },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Droid Commander, Inspiration ou Leadership (ou Override, do Scavenger's Guide to Droids)."),
      f(2, "Networked Mind", "Designa droides aliados iguais a ½ nível de classe (1 no 2º, 2 no 4º, até 5 no 10º) como ligados em rede: recebem seus efeitos benéficos que afetam a mente (escolhidos até o fim do encontro; designar é ação livre). Você conta como tendo linha de visão de um droide da rede enquanto ambos tiverem comlink ativo.")
    ]
  }),
  cls("Military Engineer", "military-engineer", {
    bab: "threeQuarter", hitDie: 8, defenses: { reflex: 2, fortitude: 2, will: 2 },
    talentTrees: ["Military Engineer", "Outlaw Tech"],
    description: "<p>Especialista técnico que mantém o equipamento do pelotão funcionando no front (Bao-Dur, Raith Sienar).</p>",
    prerequisites: { text: "BBA +7; treinado em Mechanics e Use Computer", bab: 7, trained: ["mechanics", "useComputer"] },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Military Engineer ou Outlaw Tech (Starships of the Galaxy)."),
      f(2, "Field-Created Weapon", "1/encontro, ação padrão e Mechanics CD 20: monta com sucata uma arma corpo a corpo ou à distância (valor até 600 × nível de classe) que dá +1 de equipamento nos ataques por 2 níveis de classe (+1 no 2º até +5 no 10º); dura até o fim do encontro e precisa de célula de energia se for energizada.")
    ]
  }),
  cls("Vanguard", "vanguard", {
    bab: "full", hitDie: 10, defenses: { reflex: 2, fortitude: 4, will: 0 },
    talentTrees: ["Vanguard", "Awareness", "Survivor"],
    description: "<p>Batedor avançado que localiza o inimigo e repassa a posição aos aliados (91º Corpo de Reconhecimento, Comandante Neyo).</p>",
    prerequisites: { text: "Nível 7; treinado em Perception e Stealth; 2 talentos de Camouflage ou Commando", level: 7, trained: ["perception", "stealth"], talentTrees: { trees: ["Camouflage", "Commando"], count: 2 } },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Vanguard, Awareness ou Survivor."),
      f(2, "Surprise Attack", "Contra um alvo que não sabe de você ou está sem o bônus de Destreza na Reflexos, o primeiro ataque da rodada recebe bônus igual a ½ nível de classe (+1 no 2º até +5 no 10º).")
    ]
  })
];
