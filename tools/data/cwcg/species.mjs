// The Clone Wars Campaign Guide — Cap. 1: espécies. Descrições resumidas.
const SRC = "The Clone Wars Campaign Guide";
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
const reroll = (skill, label, keep = "second") => ({ skill, keep, label });
const cond = skill => ({ skill, feat: "skill-focus" });
const mod = (target, value, type = "species") => ({ target, value: String(value), type, label: "", disabled: false });
const lowLight = { name: "Low-Light Vision", text: "Ignora camuflagem (mas não camuflagem total) causada por escuridão." };
const breathe = { name: "Breathe Underwater", text: "Anfíbio: não se afoga na água." };
const expertSwimmer = { name: "Expert Swimmer", text: "Pode rerrolar Swim (fica com o novo resultado) e escolher 10 em Swim mesmo distraído ou ameaçado." };

export default [
  sp("Dug", "dug", {
    abilityMods: { dex: 2, cha: -2 }, size: "small", speed: 6, languages: "Dug",
    rerolls: [reroll("climb", "Athletic"), reroll("jump", "Athletic")],
    description: "<p>Arborícolas agressivos de Malastare que andam com os braços e manipulam com os pés; pilotos de pod e brigões notórios.</p>",
    traits: [
      { name: "Small Size", text: "+1 de tamanho na Reflexos e +5 em Stealth; carga 3/4 do normal. Deslocamento 6 quadrados." },
      { name: "Athletic", text: "Rerrola Climb e Jump (fica com o novo resultado) e pode escolher 10 neles mesmo distraído ou ameaçado." }
    ]
  }),
  sp("Gen'Dai", "gendai", {
    abilityMods: { con: 4, wis: -2, cha: -2 }, size: "large", speed: 8, languages: "Basic, Gen'Dai",
    description: "<p>Nômades quase imortais, sem órgãos vitais centralizados, capazes de sobreviver a ferimentos fatais (como Durge).</p>",
    traits: [
      { name: "Large Size", text: "−1 na Reflexos, −5 em Stealth, +5 no Limiar; carga o dobro do normal." },
      { name: "Gen'Dai Surge", text: "Ao usar o second wind, recupera 5 PV por rodada no fim de cada turno até o fim do encontro ou até chegar à metade dos PV (o que vier primeiro)." },
      { name: "Hibernation", text: "Usa Force Trance (Use the Force) sem treino nem Force Sensitivity e pode hibernar indefinidamente, sem envelhecer nem precisar de comida, água ou ar." },
      { name: "Mental Instability", text: "A cada categoria de idade após Adulto, perde 1 de Sabedoria; não aumenta Sabedoria ao subir de nível." },
      { name: "Regeneration", text: "Regenera partes do corpo perdidas (até membros) em 1d10 minutos; as penalidades persistentes da perda somem." },
      { name: "Resilient Physiology", text: "O Limiar de Dano conta em dobro (depois dos bônus de feats e tamanho) só para decidir se um ataque o mata." }
    ]
  }),
  sp("Iktotchi", "iktotchi", {
    abilityMods: { con: 2, cha: -2 }, languages: "Basic, Iktotchese",
    modifiers: [mod("defenses.reflex", 1, "natural")], rerolls: [reroll("pilot", "Expert Pilot")],
    description: "<p>Humanoides de chifres de Iktotch, precognitivos e estoicos; famosos pilotos.</p>",
    traits: [
      { name: "Natural Armor", text: "+1 de armadura natural na Reflexos." },
      { name: "Limited Precognition", text: "1/encontro, reação: +2 de espécie na Reflexos dele ou de um veículo que pilota contra um ataque." },
      { name: "Expert Pilot", text: "Rerrola Pilot (fica com o novo resultado)." }
    ]
  }),
  sp("Kaleesh", "kaleesh", {
    abilityMods: { dex: -2, con: 2, int: -2, cha: 2 }, languages: "Basic, Kaleesh", conditionalFeats: [cond("survival")],
    rerolls: [reroll("endurance", "Persistent")],
    description: "<p>Reptilianos nômades e guerreiros de Kalee, que cultuam os ancestrais (o povo do General Grievous).</p>",
    traits: [
      { name: "Conditional Bonus Feat", text: "Se treinado em Survival, recebe Skill Focus (Survival)." },
      { name: "Darkvision", text: "Ignora camuflagem (inclusive total) causada por escuridão; não distingue cores na escuridão total." },
      { name: "Driven", text: "+5 de espécie na Vontade contra efeitos que afetam a mente." },
      { name: "Persistent", text: "Rerrola Endurance (fica com o novo resultado)." }
    ]
  }),
  sp("Kaminoan", "kaminoan", {
    abilityMods: { int: 2, wis: -2 }, languages: "Basic, Kaminoan", conditionalFeats: [cond("treatInjury")],
    modifiers: [mod("defenses.fortitude", 2)],
    description: "<p>Clonadores altos e esguios de Kamino, perfeccionistas e discretamente xenófobos.</p>",
    traits: [
      { name: "Conditional Bonus Feat", text: "Se treinado em Treat Injury, recebe Skill Focus (Treat Injury)." },
      { name: "Resistant", text: "+2 de espécie na Fortitude (venenos, doenças, radiação e perigos)." }
    ]
  }),
  sp("Kerkoiden", "kerkoiden", {
    abilityMods: { con: -2, wis: 2 }, languages: "Basic, Kerkoidese",
    description: "<p>Predadores sociais de Kerkoidia, políticos e comandantes ardilosos e arrogantes.</p>",
    traits: [
      { name: "Predator's Heritage", text: "+2 de espécie no dano contra um alvo que já sofreu dano desde o início do último turno do Kerkoiden." },
      { name: "Social Cunning", text: "Usa o mod. de Sabedoria no lugar do de Carisma em Deception e Persuasion." }
    ]
  }),
  sp("Nautolan", "nautolan", {
    abilityMods: { con: 2, int: -2, wis: -2 }, swimSpeed: 4, languages: "Basic, Nautila", modifiers: [mod("damageReduction", 2)],
    rerolls: [reroll("swim", "Expert Swimmer"), reroll("perception", "Pheromonal Sensor (sentir engano ou influência)")],
    description: "<p>Anfíbios de Glee Anselm com tentáculos sensíveis a feromônios (como Kit Fisto).</p>",
    traits: [
      breathe, expertSwimmer, lowLight,
      { name: "Natural Damage Reduction", text: "Pele borrachuda: RD 2." },
      { name: "Pheromonal Sensor", text: "Rerrola Perception para sentir engano ou influência (fica com o novo resultado); debaixo d'água, fica com o melhor." }
    ]
  }),
  sp("Nelvaanian", "nelvaanian", {
    abilityMods: { int: -2, wis: 2 }, primitive: true, languages: "Nelvaanese",
    description: "<p>Tribais caninos de Nelvaan; muitos machos foram mutilados geneticamente pela Techno Union durante a guerra.</p>",
    traits: [
      lowLight,
      { name: "Primitive", text: "Não ganha Weapon Proficiency (pistolas, rifles, armas pesadas) como feats iniciais." },
      { name: "Scent", text: "A até 10 quadrados ignora camuflagem e cobertura em Perception; rastreia sem penalidade de visibilidade." },
      { name: "Shadow Swiftness", text: "Se começar o turno com camuflagem contra um alvo, ou o alvo não souber dele, não provoca ataques de oportunidade dele ao se mover pela área ameaçada até o fim do turno." }
    ]
  }),
  sp("Vurk", "vurk", {
    abilityMods: { dex: -2, con: 2, cha: 2 }, swimSpeed: 4, languages: "Basic, Semblan",
    rerolls: [reroll("swim", "Expert Swimmer"), reroll("survival", "Nomads")],
    description: "<p>Anfíbios nômades e serenos de Sembla, diplomatas íntegros (como o Mestre Coleman Trebor).</p>",
    traits: [
      breathe, expertSwimmer,
      { name: "Placid", text: "1/encontro, ação livre: remove um efeito de medo que o afete." },
      { name: "Nomads", text: "Rerrola Survival (fica com o novo resultado)." }
    ]
  }),
  sp("Republic Clone", "republic-clone", {
    bonusFeatChoices: 1, bonusTrainedSkills: 1,
    description: "<p>Clones humanos de Jango Fett criados pelos Kaminoanos (ARC troopers, comandos). Atributos fixos: For 15, Des 13, Con 10, Int 12, Sab 10, Car 8; no 1º nível, +2 em um atributo à escolha (ajuste manualmente na criação).</p>",
    traits: [
      { name: "Ability Scores", text: "Valores fixos For 15, Des 13, Con 10, Int 12, Sab 10, Car 8 (em vez de rolar ou comprar), e +2 em um atributo à escolha." },
      { name: "Bonus Trained Skill", text: "Uma perícia treinada adicional (da lista de classe)." },
      { name: "Bonus Feat", text: "Um feat bônus no 1º nível." }
    ]
  }),
  sp("Chagrian", "chagrian", {
    abilityMods: { str: 2, dex: -2 }, swimSpeed: 0, languages: "Basic, Chagri",
    description: "<p>Anfíbios de pele azul e chifres carnudos (lethorns) de Champala, estoicos e apegados a procedimentos.</p>",
    traits: [breathe, { name: "Radiation Resistance", text: "+5 de espécie na Fortitude contra dano de radiação." }, lowLight]
  }),
  sp("Geonosian", "geonosian", {
    abilityMods: { str: 2, int: -2, cha: -2 }, languages: "Basic, Geonosian",
    description: "<p>Insetoides de colmeia de Geonosis, com exoesqueleto e asas; vivem sob um rígido sistema de castas.</p>",
    traits: [
      { name: "Flight", text: "Deslocamento 6 quadrados; voo 6 quadrados." },
      { name: "Radiation Resistance", text: "+5 de espécie na Fortitude contra dano de radiação." },
      lowLight
    ]
  })
];
