// Galaxy at War — Cap. 1: espécies. Descrições resumidas/parafraseadas.
const A = (o = {}) => ({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0, ...o });
const sp = (name, key, o) => ({
  name, type: "species", img: "icons/environment/people/group.webp",
  system: {
    key, size: "medium", speed: 6, swimSpeed: 0, droid: false, primitive: false,
    bonusFeats: [], bonusFeatChoices: 0, bonusTrainedSkills: 0, conditionalFeats: [], rerolls: [],
    modifiers: [], languages: "Basic", traits: [], description: "", naturalWeapon: "", source: "Galaxy at War",
    ...o, abilityMods: A(o.abilityMods)
  }
});
const reroll = (skill, label, keep = "second") => ({ skill, keep, label });
const mod = (target, value, type = "species") => ({ target, value: String(value), type, label: "", disabled: false });
const darkvision = { name: "Darkvision", text: "Ignora camuflagem, inclusive total, causada por escuridão; não distingue cores na escuridão total." };
const primitive = { name: "Primitive", text: "Não recebe Weapon Proficiency (pistols, rifles ou heavy weapons) como feat inicial." };
const natural = (die, kinds) => ({ name: "Natural Weapons", text: `Sempre armado com armas naturais (${kinds}) de ${die}; use o ataque desarmado (Unarmed), que passa a causar ${die} (+1 passo por Martial Arts). Não é considerado desarmado.` });

export default [
  sp("Barabel", "barabel", {
    abilityMods: { str: 2, dex: -2, wis: -2 }, primitive: true, naturalWeapon: "1d6", languages: "Barabel",
    description: "<p>Répteis escamosos e caçadores de Barab I, de garras afiadas e grande respeito pelos Jedi.</p>",
    modifiers: [mod("defenses.reflex", 2, "natural")], rerolls: [reroll("persuasion", "Intimidating (Persuasion)")],
    traits: [
      darkvision, primitive, natural("1d6", "garras cortantes, mordida perfurante e cauda contundente"),
      { name: "Natural Armor", text: "+2 de armadura natural na Defesa de Reflexos (acumula com armadura)." },
      { name: "Stun Resistance", text: "+5 de espécie no Limiar de Dano contra dano de atordoamento." },
      { name: "Radiation Resistance", text: "+5 na Fortitude contra radiação e não sofre condição persistente por radiação." },
      { name: "Intimidating", text: "Pode rerrolar Persuasion para intimidar, ficando com o segundo resultado." },
      { name: "Jedi Respect", text: "Atitude favorável a Jedi conhecidos (Persuasion)." }
    ]
  }),
  sp("Dashade", "dashade", {
    abilityMods: { dex: 2, wis: -2, cha: -2 }, languages: "Dashadi",
    description: "<p>Assassinos quase extintos de pele escura e escamosa, resistentes à Força.</p>",
    rerolls: [reroll("persuasion", "Fearsome Reputation (Persuasion)", "best")],
    traits: [
      { name: "Environmental Adaptation", text: "+5 de espécie na Fortitude contra calor/frio extremos e radiação." },
      { name: "Fearsome Reputation", text: "Pode rerrolar Persuasion para intimidar, ficando com o melhor resultado." },
      { name: "Force Resistance", text: "+5 de espécie na Fortitude e na Vontade contra testes de Use the Force." }
    ]
  }),
  sp("Lurmen", "lurmen", {
    abilityMods: { wis: 2, str: -2 }, size: "small", speed: 4, primitive: true, languages: "Basic, Lurmese",
    description: "<p>Pequenos mamíferos pacifistas de Mygeeto, curandeiros natos que se enrolam para rolar.</p>",
    traits: [
      primitive,
      { name: "Small Size", text: "+1 de tamanho na Defesa de Reflexos e +5 em Stealth; carga 3/4 do normal." },
      { name: "Mender", text: "Treinado em Treat Injury, reduz todas as CDs de Treat Injury pelo seu modificador de Sabedoria." },
      { name: "Roller", text: "Ação rápida: enrola-se e ganha +4 no deslocamento base (só pode mover, fazer withdraw, second wind, largar itens, recuperar-se ou correr). Ação rápida para desenrolar." },
      { name: "Climber", text: "Pode escolher 10 em Climb mesmo sob pressão." }
    ]
  }),
  sp("Taung", "taung", {
    abilityMods: { con: 2, cha: -2 }, languages: "Basic, Mando'a",
    description: "<p>Guerreiros de pele cinzenta, ancestrais culturais dos Mandalorianos.</p>",
    modifiers: [mod("defenses.all", 1)], rerolls: [reroll("knowledgeTactics", "Warrior Culture")],
    traits: [
      { name: "Armor Training", text: "+1 no bônus máximo de Destreza da armadura usada (automático)." },
      { name: "Superior Defenses", text: "+1 de bônus de espécie em todas as Defesas." },
      { name: "Warrior Culture", text: "Pode rerrolar Knowledge (tactics), ficando com o segundo resultado." }
    ]
  }),
  sp("Thakwaash", "thakwaash", {
    abilityMods: { str: 4, dex: -2, cha: -2 }, languages: "Thakwaashi",
    description: "<p>Humanoides equinos de grande força, com múltiplas personalidades.</p>",
    modifiers: [mod("defenses.reflex", 1, "natural")],
    traits: [
      { name: "Multiple Personalities", text: "1/encontro, ação livre no início do turno: anula um efeito de afetar a mente que esteja sofrendo." },
      { name: "Natural Armor", text: "+1 de armadura natural na Defesa de Reflexos." }
    ]
  }),
  sp("Trianii", "trianii", {
    abilityMods: { wis: 2 }, naturalWeapon: "1d6", languages: "Trianii",
    description: "<p>Felinos ágeis com cauda preênsil, famosos por seus Rangers.</p>",
    rerolls: [reroll("acrobatics", "Acrobatic Prowess")],
    traits: [
      natural("1d6", "garras cortantes"),
      { name: "Acrobatic Prowess", text: "Pode rerrolar Acrobatics, ficando com o segundo resultado." },
      { name: "Prehensile Tail", text: "Pode segurar (não empunhar) um objeto Pequeno ou menor com a cauda." }
    ]
  }),
  sp("Yevetha", "yevetha", {
    abilityMods: { str: 2, cha: -2 }, naturalWeapon: "1d6", languages: "Yevethan",
    description: "<p>Xenófobos esqueléticos de N'zoth, engenheiros brilhantes com garras retráteis.</p>",
    traits: [
      natural("1d6", "garras retráteis cortantes"),
      { name: "Mechanical Aptitude", text: "1/encontro, trata um teste de Mechanics como 20 natural." },
      { name: "Xenophobia", text: "+2 de espécie na Vontade contra Persuasion para melhorar a atitude, feita por outras espécies." }
    ]
  }),
  sp("Yuzzem", "yuzzem", {
    abilityMods: { str: 4, wis: -2, cha: -2 }, size: "large", speed: 6, naturalWeapon: "1d8", languages: "Yuzz",
    description: "<p>Grandes humanoides peludos de Ragna III, temperamentais e muito fortes.</p>",
    rerolls: [reroll("climb", "Climber")],
    traits: [
      natural("1d8", "mordida perfurante e garras cortantes"),
      { name: "Large Size", text: "−1 de tamanho em Reflexos, −5 em Stealth, +5 no Limiar de Dano; carga dobrada." },
      { name: "Physically Intimidating", text: "Usa o modificador de Força em vez de Carisma em Persuasion para intimidar." },
      { name: "Scent", text: "A até 10 quadrados ignora camuflagem e cobertura para Perception e não sofre penalidade de visibilidade ao rastrear." },
      { name: "Climber", text: "Pode rerrolar Climb, ficando com o segundo resultado." }
    ]
  }),
  sp("Zygerrian", "zygerrian", {
    abilityMods: { con: 2, wis: -2 }, languages: "Basic, Zygerrian", bonusFeats: ["martial-arts-i"],
    description: "<p>Felinos escravagistas de Zygerria, de vontade inabalável.</p>",
    modifiers: [mod("defenses.will", 2)],
    traits: [
      { name: "Bonus Feat", text: "Recebe Martial Arts I." },
      { name: "Iron Will", text: "+2 de bônus de espécie na Defesa de Vontade." },
      { name: "Strength of Conviction", text: "Usa o modificador de Carisma em vez do de Sabedoria na Defesa de Vontade (automático)." }
    ]
  })
];
