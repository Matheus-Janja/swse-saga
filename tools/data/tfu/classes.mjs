// The Force Unleashed Campaign Guide — Cap. 3: classes de prestígio.
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
    techniqueLevels: "", secretLevels: "", maxLevel: 10, modifiers: [], credits: "", source: "The Force Unleashed Campaign Guide",
    ...o, prerequisites: P(o.prerequisites)
  }
});

export default [
  cls("Enforcer", "enforcer", {
    bab: "threeQuarter", hitDie: 8, defenses: { reflex: 4, fortitude: 0, will: 2 },
    talentTrees: ["Survivor", "Enforcement"],
    description: "<p>Agente da lei de elite: patrulheiros, Sector Rangers, CorSec, agentes da ISB e da COMPNOR (Corran Horn).</p>",
    prerequisites: { text: "Nível 7; treinado em Gather Information e Perception; 1 talento de Survivor; pertencer a uma organização policial ou de segurança", level: 7, trained: ["gatherInformation", "perception"], talentTrees: { trees: ["Survivor"], count: 1 } },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Survivor ou Enforcement."),
      f(1, "Resources", "A cada nível recebe equipamento restrito ou militar (armas e veículos inclusive) no valor de nível heroico × 2.000 créditos, entregue num local civilizado à sua escolha. Pode abrir mão para somar o valor ao do próximo nível."),
      f(2, "Targeted Suspect", "Rodada completa observando um oponente em combate (depois que ele agir): bônus igual a ½ nível de classe nos ataques e em Deception, Perception e Persuasion contra ele pelo resto do encontro (+1 no 2º até +5 no 10º).")
    ]
  }),
  cls("Independent Droid", "independent-droid", {
    bab: "threeQuarter", hitDie: 12, defenses: { reflex: 2, fortitude: 0, will: 4 },
    talentTrees: ["Autonomy", "Specialized Droid", "Elite Droid"],
    description: "<p>Droide extremamente autônomo, que rompeu a própria programação (HK-47, IG-88, PROXY).</p>",
    prerequisites: { text: "Nível 3; treinado em Use Computer; processador heurístico; só droides", level: 3, trained: ["useComputer"], droidOnly: true },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Autonomy ou Specialized Droid (ou Elite Droid, do Scavenger's Guide to Droids)."),
      f(1, "Sapience", "Pode escolher que as imunidades de droide não se apliquem a efeitos mentais (para receber efeitos positivos). Inibidor comportamental desativado permanentemente: pode fazer qualquer ação. Imune a restraining bolts."),
      f(2, "Independent Spirit", "1/encontro, reação: bônus de moral igual a ½ nível de classe numa Defesa à escolha (+1 no 2º até +5 no 10º).")
    ]
  }),
  cls("Infiltrator", "infiltrator", {
    bab: "threeQuarter", hitDie: 8, defenses: { reflex: 4, fortitude: 0, will: 2 },
    talentTrees: ["Camouflage", "Spy", "Infiltration", "Bothan Spynet"],
    description: "<p>Espião, toupeira ou agente de operações especiais que penetra fortalezas inimigas (Judder Page, Sabé, a Spynet bothana).</p>",
    prerequisites: { text: "Nível 7; treinado em Perception e Stealth; Skill Focus (Stealth); 2 talentos de Camouflage ou Spy", level: 7, trained: ["perception", "stealth"], feats: ["skill-focus"], talentTrees: { trees: ["Camouflage", "Spy"], count: 2 } },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Camouflage, Spy, Infiltration ou Bothan Spynet."),
      f(2, "Unarmed Stun", "Ataques desarmados podem causar dano de atordoamento (declarado antes do ataque), com +1 dado de dano (+2 dados no 6º, +3 no 10º)."),
      f(4, "Lead Infiltrator", "Faz um teste de Stealth por aliados em linha de visão iguais ao bônus de Carisma (mín. 1), que usam o seu resultado no lugar do Stealth deles; no 8º nível, o dobro de aliados. Eles precisam ficar em linha de visão.")
    ]
  }),
  cls("Medic", "medic", {
    bab: "threeQuarter", hitDie: 8, defenses: { reflex: 0, fortitude: 4, will: 2 },
    talentTrees: ["Advanced Medicine", "Survivor"],
    description: "<p>Curandeiro de campo, médico de nave ou de beco, capaz de quase milagres (Dhagon Gent, Jos Vondar).</p>",
    prerequisites: { text: "Nível 7; treinado em Knowledge (life sciences) e Treat Injury; Surgical Expertise", level: 7, trained: ["knowledgeLifeSciences", "treatInjury"], feats: ["surgical-expertise"] },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Advanced Medicine ou Survivor."),
      f(2, "Medical Secret", "Nos níveis pares, um segredo médico (cada um uma vez): Improved First Aid (+1 PV por ponto acima da CD), Improved Heal Damage (cirurgia cura +nível de classe), Improved Long-Term Care (+nível de classe), Improved Perform Surgery (metade do tempo), Improved Revivify (ação padrão), Improved Treatment (doença/radiação em 1 hora e até o dobro de pacientes), Personal Physician (sem penalidade ao tratar a si mesmo).")
    ]
  }),
  cls("Saboteur", "saboteur", {
    bab: "threeQuarter", hitDie: 8, defenses: { reflex: 2, fortitude: 0, will: 4 },
    talentTrees: ["Slicer", "Misfortune", "Sabotage", "Turret"],
    description: "<p>Agente que destrói ou desativa os mecanismos do inimigo com explosivos, slicing e engenharia social (Kell Tainer, Kyle Katarn).</p>",
    prerequisites: { text: "Nível 7; treinado em Deception, Mechanics e Use Computer", level: 7, trained: ["deception", "mechanics", "useComputer"] },
    features: [
      f(1, "Talentos", "Nos níveis ímpares, um talento de Slicer, Misfortune, Sabotage ou Turret."),
      f(1, "Unexpected Results", "Quando um inimigo tira 1 natural num ataque com arma corpo a corpo avançada, sabre de luz, pistola, rifle ou arma pesada, a arma fica desativada até ser consertada (Mechanics)."),
      f(2, "Destructive", "Sempre causa dano dobrado a objetos sem dono e veículos."),
      f(4, "Quick Sabotage", "Desativa dispositivos com ferramentas improvisadas (sem kit de segurança). No 4º nível, dispositivos simples com ação rápida; no 6º, complicados com ação rápida; no 8º, complexos com duas ações rápidas."),
      f(10, "Master Saboteur", "Rerrola Mechanics para desativar dispositivos ou manusear explosivos, ficando com o melhor.")
    ]
  })
];
