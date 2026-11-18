// Classes heroicas (Cap. 3), de prestígio (Cap. 12) e não heroica. Com erratas aplicadas.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, ...o
});
const KNOW = ["knowledgeBureaucracy", "knowledgeGalacticLore", "knowledgeLifeSciences", "knowledgePhysicalSciences", "knowledgeSocialSciences", "knowledgeTactics", "knowledgeTechnology"];
const ALL_SKILLS = ["acrobatics", "climb", "deception", "endurance", "gatherInformation", "initiative", "jump", ...KNOW, "mechanics", "perception", "persuasion", "pilot", "ride", "stealth", "survival", "swim", "treatInjury", "useComputer", "useTheForce"];
const cls = (name, key, o) => ({
  name, type: "class", img: o.img ?? "icons/sundries/books/book-embossed-blue.webp",
  system: {
    key, classType: "base", levels: 1, isStartingClass: false, bab: "full", hitDie: 8, startingHP: 0, hpRolls: [],
    defenses: { reflex: 0, fortitude: 0, will: 0 }, trainedSkills: 0, classSkills: [], startingFeats: [], bonusFeats: [],
    talentTrees: [], talentLevels: "odd", bonusFeatLevels: "even", forcePointsBase: 5, techniqueLevels: "", secretLevels: "",
    maxLevel: 20, modifiers: [], credits: "", features: [], description: "", ...o, prerequisites: P(o.prerequisites)
  }
});
const f = (level, name, text) => ({ level, name, text });
const mod = (target, value, type = "untyped") => ({ target, value: String(value), type, label: "", disabled: false });

export default [
  /* ---------------- BASE ---------------- */
  cls("Jedi", "jedi", {
    description: "<p>Guardiões da paz que combinam treinamento físico e domínio da Força; sua arma é o sabre de luz.</p>",
    bab: "full", hitDie: 10, startingHP: 30, defenses: { reflex: 1, fortitude: 1, will: 1 }, trainedSkills: 2,
    classSkills: ["acrobatics", "endurance", "initiative", "jump", ...KNOW, "mechanics", "perception", "pilot", "useTheForce"],
    startingFeats: ["force-sensitivity", "weapon-proficiency-lightsabers", "weapon-proficiency-simple"],
    bonusFeats: ["acrobatic-strike", "cleave", "combat-reflexes", "dodge", "double-attack", "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "dual-weapon-mastery-iii", "great-cleave", "improved-charge", "improved-disarm", "martial-arts-i", "martial-arts-ii", "martial-arts-iii", "melee-defense", "mobility", "quick-draw", "power-attack", "powerful-charge", "rapid-strike", "running-attack", "skill-focus", "skill-training", "strong-in-the-force", "triple-attack", "triple-crit", "weapon-finesse", "weapon-focus"],
    talentTrees: ["Jedi Consular", "Jedi Guardian", "Jedi Sentinel", "Lightsaber Combat"],
    credits: "3d4*100",
    features: [
      f(1, "Lightsaber", "Começa com um sabre de luz fornecido pelo Mestre."),
      f(7, "Build Lightsaber", "A partir do 7º nível heroico pode construir o próprio sabre (1.500 cr, 24 h, Use the Force CD 20; +1 no ataque após sintonizá-lo com um Ponto da Força).")
    ]
  }),
  cls("Noble", "noble", {
    description: "<p>Negociadores e líderes astutos que inspiram confiança.</p>",
    bab: "threeQuarter", hitDie: 6, startingHP: 18, defenses: { reflex: 1, fortitude: 0, will: 2 }, trainedSkills: 6,
    classSkills: ["deception", "gatherInformation", "initiative", ...KNOW, "perception", "persuasion", "pilot", "ride", "treatInjury", "useComputer"],
    startingFeats: ["linguist", "weapon-proficiency-pistols", "weapon-proficiency-simple"],
    bonusFeats: ["armor-proficiency-light", "cybernetic-surgery", "exotic-weapon-proficiency", "linguist", "melee-defense", "skill-focus", "skill-training", "surgical-expertise", "weapon-finesse", "weapon-proficiency-advanced-melee", "weapon-proficiency-rifles"],
    talentTrees: ["Influence", "Inspiration", "Leadership", "Lineage"],
    credits: "3d4*400",
    features: [f(1, "Linguist", "Precisa cumprir o pré-requisito (Int 13) para receber Linguist.")]
  }),
  cls("Scoundrel", "scoundrel", {
    description: "<p>Malandros que vencem pela astúcia, lábia e trapaça.</p>",
    bab: "threeQuarter", hitDie: 6, startingHP: 18, defenses: { reflex: 2, fortitude: 0, will: 1 }, trainedSkills: 4,
    classSkills: ["acrobatics", "deception", "gatherInformation", "initiative", ...KNOW, "mechanics", "perception", "persuasion", "pilot", "stealth", "useComputer"],
    startingFeats: ["point-blank-shot", "weapon-proficiency-pistols", "weapon-proficiency-simple"],
    bonusFeats: ["deadeye", "dodge", "melee-defense", "mobility", "precise-shot", "quick-draw", "rapid-shot", "running-attack", "skill-focus", "skill-training", "vehicular-combat", "weapon-proficiency-advanced-melee"],
    talentTrees: ["Fortune", "Misfortune", "Slicer", "Spacer"],
    credits: "3d4*250"
  }),
  cls("Scout", "scout", {
    description: "<p>Exploradores treinados para regiões remotas do espaço e mundos selvagens.</p>",
    bab: "threeQuarter", hitDie: 8, startingHP: 24, defenses: { reflex: 2, fortitude: 1, will: 0 }, trainedSkills: 5,
    classSkills: ["climb", "endurance", "initiative", "jump", ...KNOW, "mechanics", "perception", "pilot", "ride", "stealth", "survival", "swim"],
    startingFeats: ["shake-it-off", "weapon-proficiency-pistols", "weapon-proficiency-rifles", "weapon-proficiency-simple"],
    bonusFeats: ["armor-proficiency-light", "armor-proficiency-medium", "armor-proficiency-heavy", "careful-shot", "deadeye", "dodge", "far-shot", "linguist", "mobility", "point-blank-shot", "precise-shot", "rapid-shot", "running-attack", "skill-focus", "skill-training", "sniper", "vehicular-combat", "weapon-proficiency-advanced-melee"],
    talentTrees: ["Awareness", "Camouflage", "Fringer", "Survivor"],
    credits: "3d4*250",
    features: [f(1, "Shake It Off", "Precisa cumprir os pré-requisitos (Con 13, treinado em Endurance) para receber Shake It Off.")]
  }),
  cls("Soldier", "soldier", {
    description: "<p>Guerreiros com capacidade de combate e perícia com armas inigualáveis.</p>",
    bab: "full", hitDie: 10, startingHP: 30, defenses: { reflex: 1, fortitude: 2, will: 0 }, trainedSkills: 3,
    classSkills: ["climb", "endurance", "initiative", "jump", "knowledgeTactics", "mechanics", "perception", "pilot", "swim", "treatInjury", "useComputer"],
    startingFeats: ["armor-proficiency-light", "armor-proficiency-medium", "weapon-proficiency-pistols", "weapon-proficiency-rifles", "weapon-proficiency-simple"],
    bonusFeats: ["armor-proficiency-heavy", "bantha-rush", "careful-shot", "charging-fire", "cleave", "combat-reflexes", "coordinated-attack", "crush", "deadeye", "double-attack", "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "dual-weapon-mastery-iii", "exotic-weapon-proficiency", "far-shot", "great-cleave", "improved-charge", "improved-disarm", "martial-arts-i", "martial-arts-ii", "martial-arts-iii", "melee-defense", "mighty-swing", "pin", "point-blank-shot", "power-attack", "precise-shot", "quick-draw", "rapid-shot", "rapid-strike", "running-attack", "shake-it-off", "skill-focus", "skill-training", "sniper", "throw", "toughness", "trip", "triple-attack", "triple-crit", "vehicular-combat", "weapon-focus", "weapon-proficiency-advanced-melee", "weapon-proficiency-heavy"],
    talentTrees: ["Armor Specialist", "Brawler", "Commando", "Weapon Specialist"],
    credits: "3d4*250"
  }),

  /* ---------------- PRESTIGE ---------------- */
  cls("Ace Pilot", "ace-pilot", {
    classType: "prestige", bab: "threeQuarter", hitDie: 8, defenses: { reflex: 4, fortitude: 2, will: 0 }, forcePointsBase: 6, maxLevel: 10,
    description: "<p>Piloto extraordinário de veículos e naves.</p>",
    talentTrees: ["Expert Pilot", "Gunner", "Spacer"], bonusFeatLevels: "",
    prerequisites: { text: "Nível 7; treinado em Pilot; Vehicular Combat", level: 7, trained: ["pilot"], feats: ["vehicular-combat"] },
    features: [f(2, "Vehicle Dodge", "A partir do 2º nível, o veículo que você pilota recebe bônus de esquiva na Defesa de Reflexos igual a metade do nível de classe.")]
  }),
  cls("Bounty Hunter", "bounty-hunter", {
    classType: "prestige", bab: "full", hitDie: 10, defenses: { reflex: 4, fortitude: 2, will: 0 }, forcePointsBase: 6, maxLevel: 10,
    description: "<p>Especialista em localizar e capturar fugitivos.</p>",
    talentTrees: ["Bounty Hunter", "Misfortune", "Awareness"], bonusFeatLevels: "",
    prerequisites: { text: "Nível 7; treinado em Survival; 2 talentos da árvore Awareness", level: 7, trained: ["survival"], talentTrees: { trees: ["Awareness"], count: 2 } },
    features: [f(2, "Familiar Foe", "Após observar um oponente por uma rodada completa, recebe bônus no ataque contra ele e na Reflexos contra os ataques dele igual a metade do nível de classe. (Opção no ataque.)")]
  }),
  cls("Crime Lord", "crime-lord", {
    classType: "prestige", bab: "threeQuarter", hitDie: 8, defenses: { reflex: 2, fortitude: 0, will: 4 }, forcePointsBase: 6, maxLevel: 10,
    description: "<p>Líder de uma organização criminosa.</p>",
    talentTrees: ["Infamy", "Mastermind", "Influence"], talentLevels: "every", bonusFeatLevels: "",
    prerequisites: { text: "Nível 7; treinado em Deception e Persuasion; 1 talento de Fortune, Lineage ou Misfortune", level: 7, trained: ["deception", "persuasion"], talentTrees: { trees: ["Fortune", "Lineage", "Misfortune"], count: 1 } },
    features: [f(2, "Command Cover", "+1 de cobertura na Reflexos por aliado adjacente, até metade do nível de classe (máx. +5).")]
  }),
  cls("Elite Trooper", "elite-trooper", {
    classType: "prestige", bab: "full", hitDie: 12, defenses: { reflex: 2, fortitude: 4, will: 0 }, forcePointsBase: 6, maxLevel: 10,
    description: "<p>Soldado ou guarda-costas de treinamento avançado.</p>",
    talentTrees: ["Weapon Master", "Commando", "Camouflage"], bonusFeatLevels: "",
    modifiers: [mod("damageReduction", "@classLevel.elite_trooper/2", "untyped")],
    prerequisites: { text: "BBA +7; Armor Proficiency (light e medium), Martial Arts I, Point Blank Shot; 1 talento de Armor Specialist, Commando ou Weapon Specialist", bab: 7, feats: ["armor-proficiency-light", "armor-proficiency-medium", "martial-arts-i", "point-blank-shot"], talentTrees: { trees: ["Armor Specialist", "Commando", "Weapon Specialist"], count: 1 } },
    features: [
      f(1, "Delay Damage", "1/encontro, reação: adia o efeito de um ataque/efeito até o fim do seu próximo turno."),
      f(2, "Damage Reduction", "RD 1 no 2º nível, +1 a cada nível par (RD 5 no 10º). (Automático.)")
    ]
  }),
  cls("Force Adept", "force-adept", {
    classType: "prestige", bab: "threeQuarter", hitDie: 8, defenses: { reflex: 2, fortitude: 2, will: 4 }, forcePointsBase: 6, maxLevel: 10,
    description: "<p>Membro de uma tradição da Força menos conhecida.</p>",
    talentTrees: ["Dark Side Devotee", "Force Adept", "Force Item", "Alter", "Control", "Dark Side", "Sense"], bonusFeatLevels: "", techniqueLevels: "even",
    prerequisites: { text: "Nível 7; treinado em Use the Force; Force Sensitivity; 3 talentos da Força", level: 7, trained: ["useTheForce"], feats: ["force-sensitivity"], forceTalents: 3 },
    features: [f(2, "Force Technique", "Uma técnica da Força a cada nível par.")]
  }),
  cls("Force Disciple", "force-disciple", {
    classType: "prestige", bab: "threeQuarter", hitDie: 8, defenses: { reflex: 3, fortitude: 3, will: 6 }, forcePointsBase: 7, maxLevel: 5,
    description: "<p>Mestre dos mistérios mais profundos da Força.</p>",
    talentTrees: ["Force Adept", "Alter", "Control", "Dark Side", "Sense"], bonusFeatLevels: "", secretLevels: "2plus",
    prerequisites: { text: "Nível 12; treinado em Use the Force; Force Sensitivity; 2 talentos de Dark Side Devotee, Force Adept ou Force Item; poder farseeing; 1 técnica da Força", level: 12, trained: ["useTheForce"], feats: ["force-sensitivity"], talentTrees: { trees: ["Dark Side Devotee", "Force Adept", "Force Item"], count: 2 }, forcePowers: ["farseeing"], forceTechniques: 1 },
    features: [
      f(1, "Indomitable", "Imune a efeitos de afetar a mente."),
      f(1, "Prophet", "Recebe dois Pontos de Destino por nível nesta classe (pode trocar o extra por uma visão profética)."),
      f(2, "Force Secret", "Um segredo da Força a cada nível a partir do 2º.")
    ]
  }),
  cls("Gunslinger", "gunslinger", {
    classType: "prestige", bab: "full", hitDie: 8, defenses: { reflex: 4, fortitude: 0, will: 2 }, forcePointsBase: 6, maxLevel: 10,
    description: "<p>Pistoleiro de aluguel ou solucionador de problemas.</p>",
    talentTrees: ["Gunslinger", "Fortune", "Awareness"], bonusFeatLevels: "",
    prerequisites: { text: "Nível 7; Point Blank Shot, Precise Shot, Quick Draw, Weapon Proficiency (pistols)", level: 7, feats: ["point-blank-shot", "precise-shot", "quick-draw", "weapon-proficiency-pistols"] },
    features: [f(2, "Trusty Sidearm", "Bônus de dano com pistolas igual a metade do nível de classe (dobrado no crítico). (Automático.)")]
  }),
  cls("Jedi Knight", "jedi-knight", {
    classType: "prestige", bab: "full", hitDie: 10, defenses: { reflex: 2, fortitude: 2, will: 2 }, forcePointsBase: 6, maxLevel: 10,
    description: "<p>Defensor galáctico que segue o Código Jedi.</p>",
    talentTrees: ["Armor Specialist", "Lightsaber Combat", "Duelist", "Lightsaber Forms", "Alter", "Control", "Sense"], bonusFeatLevels: "", techniqueLevels: "even",
    prerequisites: { text: "BBA +7; treinado em Use the Force; Force Sensitivity, Weapon Proficiency (lightsabers); ter construído o próprio sabre; tradição Jedi", bab: 7, trained: ["useTheForce"], feats: ["force-sensitivity", "weapon-proficiency-lightsabers"] },
    features: [f(2, "Force Technique", "Uma técnica da Força a cada nível par.")]
  }),
  cls("Jedi Master", "jedi-master", {
    classType: "prestige", bab: "full", hitDie: 10, defenses: { reflex: 3, fortitude: 3, will: 3 }, forcePointsBase: 7, maxLevel: 5,
    description: "<p>Guardião galáctico e instrutor Jedi.</p>",
    talentTrees: ["Duelist", "Alter", "Control", "Sense"], bonusFeatLevels: "", secretLevels: "2plus",
    prerequisites: { text: "Nível 12; treinado em Use the Force; Force Sensitivity, Weapon Proficiency (lightsabers); 1 técnica da Força; tradição Jedi", level: 12, trained: ["useTheForce"], feats: ["force-sensitivity", "weapon-proficiency-lightsabers"], forceTechniques: 1 },
    features: [
      f(1, "Fearless", "Imune a efeitos de medo."),
      f(1, "Serenity", "Transe meditativo (rodada completa); ao sair (ação rápida), o primeiro ataque ou teste de Use the Force na rodada seguinte conta como 20 natural."),
      f(2, "Force Secret", "Um segredo da Força a cada nível a partir do 2º.")
    ]
  }),
  cls("Officer", "officer", {
    classType: "prestige", bab: "full", hitDie: 8, defenses: { reflex: 2, fortitude: 0, will: 4 }, forcePointsBase: 6, maxLevel: 10,
    description: "<p>Líder de uma força-tarefa militar ou grupo.</p>",
    talentTrees: ["Military Tactics", "Leadership", "Commando"], bonusFeatLevels: "",
    prerequisites: { text: "Nível 7; treinado em Knowledge (tactics); 1 talento de Leadership ou Commando; pertencer a organização militar", level: 7, trained: ["knowledgeTactics"], talentTrees: { trees: ["Leadership", "Commando"], count: 1 } },
    features: [
      f(2, "Command Cover", "+1 de cobertura na Reflexos por aliado adjacente, até metade do nível de classe (máx. +5)."),
      f(2, "Share Talent", "A cada nível par, escolhe um talento seu (Influence, Inspiration, Commando ou Military Tactics) para compartilhar 1/dia com aliados.")
    ]
  }),
  cls("Sith Apprentice", "sith-apprentice", {
    classType: "prestige", bab: "full", hitDie: 10, defenses: { reflex: 2, fortitude: 2, will: 2 }, forcePointsBase: 6, maxLevel: 10,
    description: "<p>Aluno escolhido a dedo por um Lorde Sith.</p>",
    talentTrees: ["Armor Specialist", "Duelist", "Lightsaber Combat", "Sith", "Alter", "Control", "Dark Side", "Sense"], bonusFeatLevels: "", techniqueLevels: "even",
    prerequisites: { text: "Nível 7; treinado em Use the Force; Force Sensitivity, Weapon Proficiency (lightsabers); Pontuação do Lado Sombrio = Sabedoria; tradição Sith", level: 7, trained: ["useTheForce"], feats: ["force-sensitivity", "weapon-proficiency-lightsabers"], darkSide: "equalsWis" },
    features: [f(2, "Force Technique", "Uma técnica da Força a cada nível par.")]
  }),
  cls("Sith Lord", "sith-lord", {
    classType: "prestige", bab: "full", hitDie: 10, defenses: { reflex: 3, fortitude: 3, will: 3 }, forcePointsBase: 7, maxLevel: 5,
    description: "<p>Mestre poderoso do lado sombrio.</p>",
    talentTrees: ["Sith", "Alter", "Control", "Dark Side", "Sense"], bonusFeatLevels: "", secretLevels: "2plus",
    prerequisites: { text: "Nível 12; treinado em Use the Force; Force Sensitivity, Weapon Proficiency (lightsabers); 1 técnica da Força; Lado Sombrio = Sabedoria; tradição Sith", level: 12, trained: ["useTheForce"], feats: ["force-sensitivity", "weapon-proficiency-lightsabers"], forceTechniques: 1, darkSide: "equalsWis" },
    features: [
      f(1, "Fearless", "Imune a efeitos de medo."),
      f(1, "Temptation", "Ação padrão: Persuasion contra a Vontade de um oponente para tentá-lo ao lado sombrio."),
      f(2, "Force Secret", "Um segredo da Força a cada nível a partir do 2º.")
    ]
  }),

  /* ---------------- NÃO HEROICA ---------------- */
  cls("Beast", "beast", {
    classType: "nonheroic", bab: "threeQuarter", hitDie: 8, startingHP: 0, trainedSkills: 1, defenses: { reflex: 0, fortitude: 0, will: 0 },
    description: "<p>Animais e formas de vida não sencientes (Int 1–2). Não somam nível às Defesas, não ganham talentos, Pontos da Força nem de Destino. Armas naturais causam ½ nível de dano extra.</p>",
    classSkills: ["acrobatics", "climb", "endurance", "initiative", "jump", "perception", "stealth", "survival", "swim"],
    talentLevels: "", bonusFeatLevels: "", forcePointsBase: 0
  }),
  cls("Nonheroic", "nonheroic", {
    classType: "nonheroic", bab: "threeQuarter", hitDie: 4, startingHP: 0, trainedSkills: 1, defenses: { reflex: 0, fortitude: 0, will: 0 },
    description: "<p>Personagens coadjuvantes. Não somam nível às Defesas, não ganham talentos nem Pontos da Força.</p>",
    classSkills: ALL_SKILLS.filter(s => s !== "useTheForce"), talentLevels: "", bonusFeatLevels: "", forcePointsBase: 0
  })
];
