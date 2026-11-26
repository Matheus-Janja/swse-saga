// The Force Unleashed Campaign Guide — Cap. 1: espécies. Descrições resumidas.
const SRC = "The Force Unleashed Campaign Guide";
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
const reroll = (skill, label, keep = "second") => ({ skill, keep, label });
const lowLight = { name: "Low-Light Vision", text: "Ignora camuflagem (mas não camuflagem total) causada por escuridão." };
const darkvision = { name: "Darkvision", text: "Ignora camuflagem (inclusive total) causada por escuridão; não distingue cores na escuridão total." };
const natural = (dmg, type) => ({ name: "Natural Weapon", text: `Ataques desarmados podem usar a arma natural (${dmg} ${type}); sempre considerado armado.` });

export default [
  sp("Aleena", "aleena", {
    abilityMods: { dex: 2, cha: -2 }, size: "small", speed: 4, languages: "Aleena, Basic",
    description: "<p>Pequenos répteis bípedes de Aleen, viajantes curiosos e corajosos, de metabolismo acelerado.</p>",
    rerolls: [reroll("acrobatics", "Nimble")],
    traits: [
      { name: "Nimble", text: "Pode rerrolar qualquer teste de Acrobatics (fica com o novo resultado)." },
      { name: "Quick Energy", text: "1/encontro, ação rápida: +2 em perícias de Destreza e deslocamento 8 por rodadas iguais ao mod. de Constituição (mín. 1). Ao fim, −1 passo persistente na trilha de condição, até descansar 10 minutos sem esforço." }
    ]
  }),
  sp("Caamasi", "caamasi", {
    abilityMods: { str: -2, con: -2, wis: 4 }, languages: "Basic, Caamasi",
    description: "<p>Pacifistas de Caamas, cobertos de penugem dourada, de grande força moral; seu mundo é devastado pelo Império.</p>",
    rerolls: [reroll("persuasion", "Adept Diplomat", "best")],
    traits: [
      { name: "Adept Diplomat", text: "Pode rerrolar Persuasion, ficando com o melhor resultado." },
      { name: "Pacifism", text: "Ação padrão: Persuasion contra a Vontade de um alvo em linha de visão; se acertar, o alvo desce −1 passo na trilha se atacar antes do início do próximo turno do Caamasi. O alvo precisa ouvir e entender. Um alvo só pode ser afetado uma vez por dia (mesmo por vários Caamasi). Efeito mental." },
      { name: "Memory Sharing", text: "Cria e compartilha memnii (memórias telepáticas) com outro Caamasi adjacente (rodada completa para iniciar, mais o tempo da lembrança). Quem recebe uma memnis tem circunstâncias favoráveis em Knowledge sobre ela. Usuários da Força recebem memnii com Use the Force CD 15 (reação)." }
    ]
  }),
  sp("Felucian", "felucian", {
    abilityMods: { con: 2, int: -2 }, primitive: true, swimSpeed: 0, languages: "Felucianese",
    bonusFeats: ["force-sensitivity"],
    description: "<p>Anfíbios das selvas fúngicas de Felucia, ligados à Força Viva e liderados por xamãs. Primitivos: só têm proficiência com armas simples.</p>",
    rerolls: [reroll("stealth", "Natural Camouflage", "best")],
    traits: [
      { name: "Breathe Underwater", text: "Anfíbio: não se afoga na água." },
      lowLight,
      { name: "Natural Camouflage", text: "Pode rerrolar Stealth para se esgueirar, ficando com o melhor resultado." },
      { name: "Force Blast", text: "1/encontro, faz um teste destreinado de Use the Force para ativar o poder Force blast. Ao pegar Force Training, ganha um uso de Force blast de graça (além dos poderes normais)." },
      { name: "Weapon Familiarity", text: "Trata a felucian skullblade como arma simples." }
    ]
  }),
  sp("Gran", "gran", {
    abilityMods: { int: -2, cha: 2 }, languages: "Basic, Gran",
    description: "<p>Gran de Kinyen, de três olhos pedunculados, sociáveis e hospitaleiros.</p>",
    traits: [
      darkvision,
      { name: "Target Awareness", text: "Sem penalidade de distância em Perception para notar alvos nos primeiros 50 quadrados." },
      { name: "Triple Vision", text: "1/encontro, pode mirar com uma única ação rápida em vez de duas." },
      { name: "Conditional Bonus Feat", text: "Com Point Blank Shot, ganha Precise Shot como feat bônus." }
    ]
  }),
  sp("Nosaurian", "nosaurian", {
    abilityMods: { dex: 2, cha: -2 }, naturalWeapon: "1d6", languages: "Basic, Nosaurian",
    description: "<p>Répteis com chifres de New Plympto, amargurados pela derrota e escravização ao fim das Guerras Clônicas.</p>",
    rerolls: [reroll("survival", "Survival Instinct")],
    traits: [
      { name: "Climber's Heritage", text: "Climb é perícia de classe." },
      natural("1d6", "perfurante (chifres)"),
      { name: "Survival Instinct", text: "Pode rerrolar Survival (fica com o novo resultado)." }
    ]
  }),
  sp("Talz", "talz", {
    abilityMods: { con: 2, int: -2 }, primitive: true, naturalWeapon: "1d6", languages: "Talz",
    description: "<p>Peludos de Alzoc III, gentis e fortes, escravizados pelo Império logo no início da Era Sombria. Aprendem tecnologia rapidamente.</p>",
    conditionalFeats: [{ skill: "mechanics", feat: "skill-focus" }],
    traits: [
      darkvision,
      natural("1d6", "cortante (garras)"),
      { name: "Conditional Bonus Feat", text: "Se treinado em Mechanics, ganha Skill Focus (Mechanics)." }
    ]
  }),
  sp("Togorian", "togorian", {
    abilityMods: { str: 4, int: -2, wis: -2 }, size: "large", languages: "Basic, Togorian",
    description: "<p>Felinos nômades e agressivos de Togoria, piratas temidos; valorizam a força acima de tudo.</p>",
    modifiers: [mod("defenses.reflex", 1, "natural")],
    traits: [
      { name: "Feline Reflexes", text: "+1 de espécie na Reflexos." },
      lowLight,
      { name: "Physical Intimidation", text: "Usa o bônus de Força no lugar do de Carisma em Persuasion para intimidar." }
    ]
  }),
  sp("Togruta", "togruta", {
    abilityMods: { dex: 2, con: -2 }, languages: "Basic, Togruti",
    description: "<p>Caçadores em bando de Shili, de pele e montrals listrados que servem de camuflagem.</p>",
    rerolls: [reroll("stealth", "Sneaky")],
    traits: [
      { name: "Pack Hunter", text: "+2 de dano em ataques corpo a corpo contra oponentes que estejam flanqueando." },
      { name: "Sneaky", text: "Pode rerrolar Stealth para se esgueirar (fica com o novo resultado)." },
      { name: "Spatial Awareness", text: "Ecolocalização passiva: ignora toda cobertura e camuflagem em Perception para notar alvos a até 10 quadrados." }
    ]
  }),
  sp("Whiphid", "whiphid", {
    abilityMods: { str: 4, int: -2, wis: -2 }, size: "large", naturalWeapon: "1d6", languages: "Whiphid",
    description: "<p>Caçadores nômades da tundra de Toola, de presas grandes e pelo grosso.</p>",
    traits: [
      { name: "Insulating Fur", text: "+5 de espécie na Fortitude para resistir a frio extremo." },
      natural("1d6", "cortante (garras)"),
      { name: "Scent", text: "A até 10 quadrados, ignora camuflagem e cobertura em Perception e não sofre penalidade por pouca visibilidade ao rastrear." }
    ]
  }),
  sp("Yarkora", "yarkora", {
    abilityMods: { dex: -2, wis: 2, cha: 2 }, languages: "Basic, Yarkora",
    description: "<p>Espécie misteriosa de mundo desconhecido; corretores de informação, vigaristas e ladrões carismáticos.</p>",
    rerolls: [reroll("deception", "Deceptive")],
    traits: [
      { name: "Confusion", text: "1/encontro, ação padrão: Deception contra a Vontade de todos os alvos a até 6 quadrados; quem for superado não ameaça quadrados até o fim do próximo turno do Yarkora. Efeito mental." },
      { name: "Deceptive", text: "Pode rerrolar Deception (fica com o novo resultado)." },
      { name: "Streetwise", text: "Gather Information é perícia de classe." }
    ]
  }),
  sp("Noghri", "noghri", {
    abilityMods: { dex: 2, wis: 2, cha: -4 }, size: "small", speed: 4, primitive: true, languages: "Honoghran",
    description: "<p>Guerreiros e assassinos pequenos e cinzentos de Honoghr, servos de Vader em troca da \"ajuda\" imperial ao seu mundo. Primitivos: não ganham proficiência com pistolas, rifles ou armas pesadas como feats iniciais.</p>",
    traits: [
      { name: "Conditional Bonus Feat", text: "Com Destreza 13 ou mais, ganha Running Attack como feat bônus." },
      { name: "Scent", text: "A até 10 quadrados, ignora camuflagem e cobertura em Perception e não sofre penalidade por pouca visibilidade ao rastrear." }
    ]
  })
];
