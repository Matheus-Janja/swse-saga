// Galaxy of Intrigue — Cap. 1: espécies. Descrições resumidas/parafraseadas.
const SRC = "Galaxy of Intrigue";
const A = (o = {}) => ({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0, ...o });
const sp = (name, key, o) => ({
  name, type: "species", img: "icons/environment/people/group.webp",
  system: {
    key, size: "medium", speed: 6, swimSpeed: 0, droid: false, primitive: false,
    bonusFeats: [], bonusFeatChoices: 0, bonusTrainedSkills: 0, conditionalFeats: [], rerolls: [],
    modifiers: [], languages: "Basic", traits: [], description: "", naturalWeapon: "", source: SRC,
    ...o, abilityMods: A(o.abilityMods)
  }
});
const reroll = (skill, label, keep = "second") => ({ skill, keep, label });
const cond = skill => ({ skill, feat: "skill-focus" });
const mod = (target, value, type = "species") => ({ target, value: String(value), type, label: "", disabled: false });
const KNOW = ["knowledgeBureaucracy", "knowledgeGalacticLore", "knowledgeLifeSciences", "knowledgePhysicalSciences", "knowledgeSocialSciences", "knowledgeTactics", "knowledgeTechnology"];
const darkvision = { name: "Darkvision", text: "Ignora camuflagem, inclusive total, causada por escuridão; não distingue cores na escuridão total." };
const lowLight = { name: "Low-Light Vision", text: "Ignora camuflagem (mas não camuflagem total) causada por escuridão." };
const scent = { name: "Scent", text: "A até 10 quadrados ignora camuflagem e cobertura para Perception e não sofre penalidade de visibilidade ao rastrear." };
const small = { name: "Small Size", text: "+1 de tamanho na Defesa de Reflexos e +5 em Stealth; carga 3/4 do normal." };

export default [
  sp("Bith", "bith", {
    abilityMods: { con: -2, int: 2, cha: 2 }, languages: "Basic, Bith",
    description: "<p>Humanoides de cabeça bulbosa de Clak'dor VII, pacifistas, músicos e intelectuais.</p>",
    traits: [
      { name: "Meditative Trance", text: "Um transe de 4 horas equivale a 8 horas de descanso." },
      scent,
      { name: "Evolved Intellect", text: "Sempre que gasta um Ponto da Força, recebe um Ponto da Força temporário que só pode ser gasto num teste de perícia baseada em Inteligência até o fim do encontro (anote-o; some se não for usado)." }
    ]
  }),
  sp("Defel", "defel", {
    abilityMods: { str: -2, int: 2 }, size: "small", languages: "Basic, Defel",
    description: "<p>Os \"espectros\" de Af'El: pelagem que desvia a luz e os torna quase invisíveis.</p>",
    traits: [
      small,
      { name: "Partial Invisibility", text: "Em penumbra ou escuridão, conta como em camuflagem total (não contra darkvision). Use a condição Camuflagem total no token." },
      { name: "Special Equipment", text: "Enxerga só no ultravioleta: fora de Af'El precisa de visor UV (2.000 cr, recebido de graça no início) ou fica cego." }
    ]
  }),
  sp("Fosh", "fosh", {
    abilityMods: { dex: 2, con: -2, cha: 2 }, size: "small", languages: "Basic, Fosh",
    description: "<p>Aviários delicados de origem desconhecida, mestres da manipulação e da intriga.</p>",
    rerolls: [reroll("deception", "Deceptive")],
    traits: [
      small,
      { name: "Deceptive", text: "Pode rerrolar Deception, ficando com o segundo resultado." },
      { name: "Healing Glands", text: "Sempre conta como tendo medpac ou kit médico para Treat Injury, e pode usar as aplicações \"somente treinado\" de Treat Injury sem treino." }
    ]
  }),
  sp("Givin", "givin", {
    abilityMods: { str: -2, int: 2 }, languages: "Basic, Givin",
    description: "<p>Seres de exoesqueleto selado de Yag'Dhul, matemáticos e construtores de naves.</p>",
    modifiers: [mod("defenses.fortitude", 2), mod("damageReduction", 2)],
    rerolls: KNOW.map(k => reroll(k, "Deductive Reasoning")),
    traits: [
      { name: "Exoskeleton", text: "RD 2 e +2 de espécie na Defesa de Fortitude (automático)." },
      { name: "Deductive Reasoning", text: "Pode rerrolar qualquer teste de Knowledge, ficando com o segundo resultado." },
      { name: "Unique Physiology", text: "Imune ao vácuo e a substâncias químicas e venenos inalados." }
    ]
  }),
  sp("Gotal", "gotal", {
    languages: "Basic, Gotal",
    description: "<p>Seres peludos de Antar 4 cujos cones na cabeça percebem campos eletromagnéticos e emoções.</p>",
    traits: [
      { name: "Energy Reading", text: "Ação padrão: Perception contra a Vontade de um ser senciente a até 6 quadrados para descobrir seu estado emocional." },
      lowLight,
      { name: "Sensor Cones", text: "Pode usar Sense Force e Sense Surroundings (Use the Force) sem treino." }
    ]
  }),
  sp("Herglic", "herglic", {
    abilityMods: { str: 4, dex: -4 }, size: "large", languages: "Basic, Herglic",
    description: "<p>Bípedes enormes de Giju, descendentes de mamíferos aquáticos, comerciantes honestos e jogadores compulsivos.</p>",
    conditionalFeats: [cond("gatherInformation")],
    traits: [
      { name: "Large Size", text: "−1 de tamanho em Reflexos, −5 em Stealth, +5 no Limiar de Dano; carga dobrada." },
      { name: "Sturdy", text: "Ao usar o second wind, recupera mais 5 + ½ nível PV (automático)." },
      { name: "Conditional Bonus Feat", text: "Se treinado em Gather Information, recebe Skill Focus (Gather Information)." }
    ]
  }),
  sp("Mrlssi", "mrlssi", {
    abilityMods: { str: -2, int: 2, cha: 2 }, size: "small", speed: 4, languages: "Basic, Mrlsstese",
    bonusTrainedSkills: 1, conditionalFeats: [cond("persuasion")],
    description: "<p>Pequenos aviários eruditos de Mrlsst, cientistas, engenheiros e espiões improváveis.</p>",
    traits: [
      small,
      { name: "Mechanical Inclination", text: "Mechanics é sempre perícia de classe." },
      { name: "Scholarly Inclination", text: "No 1º nível, recebe uma perícia treinada adicional, que deve ser de Knowledge." },
      { name: "Conditional Bonus Feat", text: "Se treinado em Persuasion, recebe Skill Focus (Persuasion)." }
    ]
  }),
  sp("Neimoidian (Galaxy of Intrigue)", "neimoidian-goi", {
    abilityMods: { str: -2, cha: 2 }, languages: "Basic, Durese, Neimoidian",
    conditionalFeats: [cond("deception"), cond("persuasion")],
    description: "<p>Versão revisada para heróis: comerciantes gananciosos e ardilosos de Neimoidia.</p>",
    traits: [
      { name: "Conditional Bonus Feats", text: "Se treinado em Deception, recebe Skill Focus (Deception); se treinado em Persuasion, recebe Skill Focus (Persuasion)." }
    ]
  }),
  sp("Umbaran", "umbaran", {
    abilityMods: { con: -2, dex: 2, wis: 2 }, languages: "Basic, Umbarese",
    description: "<p>Humanoides pálidos e reservados de Umbara, observadores e coletores de segredos.</p>",
    rerolls: [reroll("stealth", "Stealthy")], conditionalFeats: [cond("gatherInformation")],
    traits: [
      darkvision,
      { name: "Stealthy", text: "Pode rerrolar Stealth, ficando com o segundo resultado." },
      { name: "Conditional Bonus Feat", text: "Se treinado em Gather Information, recebe Skill Focus (Gather Information)." }
    ]
  })
];
