// Knights of the Old Republic Campaign Guide — Cap. 1: espécies. Descrições resumidas.
// (Miraluka já vem do Threats of the Galaxy, com os mesmos traços.)
const SRC = "Knights of the Old Republic Campaign Guide";
const A = (o = {}) => ({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0, ...o });
const sp = (name, key, o) => ({
  name, type: "species", img: "icons/environment/people/group.webp",
  system: {
    key, size: "medium", speed: 6, swimSpeed: 0, droid: false, primitive: false,
    bonusFeats: [], bonusFeatChoices: 0, bonusTrainedSkills: 0, conditionalFeats: [], rerolls: [], autoTrained: [],
    modifiers: [], languages: "Basic", traits: [], description: "", naturalWeapon: "", source: SRC,
    ...o, abilityMods: A(o.abilityMods)
  }
});
const mod = (target, value, type = "species") => ({ target, value: String(value), type, label: "", disabled: false });
const lowLight = { name: "Low-Light Vision", text: "Ignora camuflagem (mas não camuflagem total) causada por escuridão." };
const darkvision = { name: "Darkvision", text: "Ignora camuflagem (inclusive total) causada por escuridão; não distingue cores na escuridão total." };
const warriorsAwareness = { name: "Warrior's Awareness", text: "1/encontro, reação: recebe os benefícios de Uncanny Dodge I e II até o início do próximo turno." };
const lanvarok = { name: "Weapon Familiarity", text: "Trata o lanvarok como arma simples em vez de exótica." };

export default [
  sp("Arkanian", "arkanian", {
    abilityMods: { int: 2, cha: -2 }, languages: "Arkanian, Basic",
    description: "<p>Humanoides de Arkania, cientistas e geneticistas brilhantes, arrogantes e distantes.</p>",
    traits: [
      darkvision,
      { name: "Intellectual Reputation", text: "Usa o mod. de Inteligência no lugar do de Carisma em Persuasion." },
      { name: "Flash of Genius", text: "1/encontro, +5 de circunstância num teste de Knowledge, Mechanics ou Use Computer." }
    ]
  }),
  sp("Arkanian Offshoot", "arkanian-offshoot", {
    abilityMods: { dex: 2, con: -2 }, languages: "Arkanian, Basic",
    description: "<p>Subespécie arkaniana criada geneticamente para trabalhos industriais; mais resistente que os Arkanian puros. Ajuste: +2 Destreza <em>ou</em> +2 Força, −2 Constituição (o item usa Destreza; troque manualmente se preferir Força).</p>",
    traits: [
      { name: "Conditional Bonus Feat", text: "Skill Focus em uma perícia treinada entre Endurance, Mechanics, Pilot, Survival ou Treat Injury." },
      { name: "Determination", text: "1/encontro, rerrola um teste falho de perícia treinada (fica com o novo resultado)." }
    ]
  }),
  sp("Cathar", "cathar", {
    abilityMods: { dex: 2, int: -2 }, speed: 8, naturalWeapon: "1d6", languages: "Catharese, Basic",
    description: "<p>Felinos bípedes de Cathar, leais e passionais, ferozes em combate.</p>",
    traits: [
      { name: "Speed", text: "Deslocamento 8 quadrados." },
      { name: "Natural Weapons", text: "Garras: 1d6 de dano cortante no ataque desarmado; sempre armado." },
      { name: "Reactive Claw", text: "1/encontro, ao causar dano com ataque corpo a corpo, faz um ataque com as garras contra o mesmo alvo como ação rápida (precisa de uma mão livre)." },
      { name: "Cathar Instincts", text: "Climb e Stealth são sempre perícias de classe." }
    ]
  }),
  sp("Draethos", "draethos", {
    abilityMods: { con: 2, cha: -2 }, languages: "Draethos (exilados: Basic)", bonusFeats: ["weapon-proficiency-advanced-melee"],
    modifiers: [mod("defenses.reflex", 1, "natural")],
    description: "<p>Humanoides longevos e telepatas de Thosa; os que vivem fora são exilados estudiosos e pacifistas.</p>",
    traits: [
      { name: "Natural Armor", text: "+1 de armadura natural na Reflexos." },
      { name: "Natural Telepath", text: "+5 de espécie em Use the Force para Telepathy e pode usar essa aplicação sem treino e sem Force Sensitivity." },
      { name: "Bonus Feat", text: "Weapon Proficiency (advanced melee weapons)." },
      lowLight
    ]
  }),
  sp("Feeorin", "feeorin", {
    abilityMods: { str: 2, dex: -2, con: 2, wis: -2, cha: -2 }, languages: "Feeorin, Basic",
    modifiers: [mod("defenses.fortitude", 2)],
    description: "<p>Humanoides massivos de Odryn que ficam mais fortes a vida toda, brutais e impessoais.</p>",
    traits: [
      { name: "Brutal", text: "1/encontro, após acertar ataque corpo a corpo, trata o Limiar do alvo como 5 menor para esse ataque." },
      { name: "Great Fortitude", text: "+2 de espécie na Fortitude." },
      { name: "Inborn Resilience", text: "Pode usar o second wind mesmo inconsciente (sem ação; só no turno normal); fazendo isso, sobe +3 passos na trilha." },
      lowLight,
      { name: "Stronger by Age", text: "Meia-idade: +1 de espécie em testes de Força e Constituição; velhice: +2. Não perde atributos físicos nem ganha mentais com a idade." }
    ]
  }),
  sp("Khil", "khil", {
    abilityMods: { con: -2, int: 2, cha: 2 }, languages: "Khilese, Basic",
    description: "<p>Colonizadores pacíficos e antigos de Belnar, com tentáculos (hullepi) no lugar da boca.</p>",
    traits: [
      { name: "Dependable Worker", text: "1/encontro, trata um teste de Climb, Endurance, Gather Information, Jump, Knowledge, Mechanics, Pilot, Ride, Survival, Swim, Treat Injury ou Use Computer como se tivesse escolhido 10 (decidir antes de rolar)." },
      { name: "Cooperative Spirit", text: "Ajuda (aid another) testes de aliados adjacentes como ação rápida, e eles podem ajudar os dele nessas perícias também como ação rápida." },
      { name: "Hullepi", text: "Absorve nutrientes de quase qualquer ambiente; não sofre fome, exceto em ambiente estéril." }
    ]
  }),
  sp("Kissai", "kissai", {
    abilityMods: { wis: -2, cha: 2 }, languages: "Basic, Sith",
    description: "<p>Casta sacerdotal da raça Sith original de Korriban.</p>",
    traits: [
      { name: "Inspired", text: "Bônus de moral ou de intuição que recebe aumentam em 1." },
      warriorsAwareness, lanvarok
    ]
  }),
  sp("Massassi", "massassi", {
    abilityMods: { str: 4, int: -2, wis: -2, cha: -2 }, primitive: true, languages: "Sith", conditionalFeats: [{ skill: "survival", feat: "skill-focus" }],
    description: "<p>Casta guerreira da raça Sith, transformada pela alquimia de Naga Sadow em soldados brutais.</p>",
    traits: [
      { name: "Conditional Bonus Feat", text: "Treinado em Survival, recebe Skill Focus (Survival)." },
      { name: "Duty Bound", text: "1/encontro, ao receber bônus de moral, ganha PV bônus iguais a 4 × nível até o fim do encontro." },
      { name: "Primitive", text: "Não ganha Weapon Proficiency (pistolas, rifles, armas pesadas) como feats iniciais." },
      warriorsAwareness, lanvarok
    ]
  }),
  sp("Rakata", "rakata", {
    abilityMods: { int: 2, wis: -2 }, primitive: true, languages: "Rakata",
    description: "<p>Antigos senhores do Império Infinito, criadores da Forja Estelar, que perderam a conexão com a Força.</p>",
    traits: [
      { name: "Ancient Knowledge", text: "Penalidade por não proficiência em armas −2 (em vez de −5); penalidade de armadura sem proficiência um passo menor (pesada −5, média −2, leve nenhuma). 1/encontro, usa uma aplicação só-treinado de Mechanics, Pilot, Treat Injury ou Use Computer mesmo sem treino." },
      { name: "Conditional Bonus Feat", text: "Com Weapon Proficiency (simple) ou proficiência numa arma exótica corpo a corpo, recebe Weapon Focus nela." },
      { name: "Force Blind", text: "Não pode pegar Force Sensitivity (mas tem Dark Side Score e é afetado pela Força)." },
      { name: "Primitive", text: "Não ganha Weapon Proficiency (pistolas, rifles, armas pesadas) como feats iniciais." },
      { name: "Rage", text: "1/dia, ação rápida: +2 de fúria nos ataques e dano corpo a corpo por 5 + mod. de Con rodadas; sem perícias de paciência. Depois, −1 passo persistente até descansar 10 minutos." }
    ]
  }),
  sp("Selkath", "selkath", {
    abilityMods: { cha: 2 }, swimSpeed: 4, languages: "Selkath",
    rerolls: [{ skill: "swim", keep: "second", label: "Expert Swimmer" }],
    description: "<p>Anfíbios de Manaan, únicos produtores de kolto; neutros e diplomáticos.</p>",
    traits: [
      { name: "Breathe Underwater", text: "Anfíbio: não se afoga na água." },
      { name: "Expert Swimmer", text: "Rerrola Swim (fica com o novo resultado) e escolhe 10 em Swim mesmo distraído ou ameaçado." },
      { name: "Able Healer", text: "Quando cura PV de alguém (ou ajuda quem cura), o alvo recupera 5 PV adicionais. 1/encontro, ação rápida: um aliado adjacente ganha PV bônus iguais a 10 + nível do Selkath até o fim do encontro." }
    ]
  }),
  sp("Snivvian", "snivvian", {
    abilityMods: { wis: 2 }, size: "small", speed: 4, languages: "Snivvian",
    description: "<p>Humanoides baixos e robustos de Cadomai Prime, artistas e escritores célebres.</p>",
    traits: [
      { name: "Small Size", text: "+1 de tamanho na Reflexos e +5 em Stealth; carga 3/4 do normal." },
      { name: "Observant", text: "1/encontro, usa o modificador de Perception no lugar do de Deception ou Persuasion." },
      { name: "Cold Resistance", text: "+5 de espécie na Fortitude contra frio extremo." }
    ]
  })
];
