// The Unknown Regions — Cap. 1: espécies. Descrições resumidas.
const SRC = "The Unknown Regions";
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
const cond = (skill, feat = "skill-focus") => ({ skill, feat });
const mod = (target, value, type = "species") => ({ target, value: String(value), type, label: "", disabled: false });
const lowLight = { name: "Low-Light Vision", text: "Ignora camuflagem (mas não camuflagem total) causada por escuridão." };
const darkvision = { name: "Darkvision", text: "Ignora camuflagem (inclusive total) causada por escuridão." };
const small = { name: "Small Size", text: "+1 de tamanho na Defesa de Reflexos e +5 em Stealth; carga 3/4 do normal." };

export default [
  sp("Anzati", "anzati", {
    languages: "Anzat, Basic",
    description: "<p>Predadores quase imortais de Anzat que se alimentam da \"sopa\" (a energia vital) de suas vítimas.</p>",
    traits: [
      { name: "Presence Sense", text: "Ao rastrear uma criatura viva com Survival, soma bônus de espécie igual ao total de Pontos da Força dela." },
      { name: "Mesmerize", text: "Ação padrão: ataque especial (nível de personagem + mod. de Carisma) contra a Vontade de um alvo a até 6 quadrados; se acertar, ele perde a ação padrão no próximo turno; se falhar, fica imune por 24 h. Afeta a mente. (Botão ⚡ no item de espécie.)" },
      { name: "Soup Drinking", text: "1/rodada, ação rápida contra um alvo agarrado: ele desce −1 passo (condição persistente, removida com 8 h de descanso) e o Anzati recebe 5 + ½ nível em PV temporários. Repetível até o alvo escapar ou ficar inconsciente." },
      { name: "Hunter's Instincts", text: "Stealth e Survival são sempre perícias de classe." },
      lowLight
    ]
  }),
  sp("Chadra-Fan", "chadra-fan", {
    abilityMods: { dex: 2, wis: -2 }, size: "small", speed: 4, languages: "Basic, Chadra-Fan",
    rerolls: [reroll("perception", "Heightened Awareness")],
    description: "<p>Pequenos e alegres funileiros de Chad, com faro e audição aguçados.</p>",
    traits: [
      small,
      { name: "Heightened Awareness", text: "Pode rerrolar Perception, ficando com o segundo resultado." },
      { name: "Tinkerer", text: "Ao reparar ou improvisar (jury-rig) um droide ou aparelho com Mechanics, ele recupera +1d8 PV." },
      darkvision
    ]
  }),
  sp("Ishi Tib", "ishi-tib", {
    abilityMods: { int: 2 }, swimSpeed: 4, naturalWeapon: "1d6", languages: "Basic, Tibranese",
    rerolls: [reroll("knowledgeLifeSciences", "Ecological Awareness", "best"), reroll("swim", "Expert Swimmer")],
    description: "<p>Anfíbios de Tibrin com olhos em pedúnculos e bico, organizados em cardumes e devotos da natureza.</p>",
    traits: [
      { name: "Breathe Underwater", text: "Anfíbio: não se afoga na água." },
      { name: "Ecological Awareness", text: "Rola Knowledge (life sciences) duas vezes, ficando com o melhor." },
      { name: "Expert Swimmer", text: "Pode rerrolar Swim e escolher 10 em Swim mesmo distraído ou ameaçado." },
      { name: "Natural Weapons", text: "Bico afiado: 1d6 de dano perfurante no ataque desarmado; sempre armado." },
      lowLight
    ]
  }),
  sp("Krevaaki", "krevaaki", {
    abilityMods: { wis: 2, cha: -2 }, languages: "Basic, Dromnyr", conditionalFeats: [cond("climb")],
    modifiers: [mod("defenses.reflex", 1, "natural"), mod("defenses.fortitude", 1, "natural"), mod("skills.climb", 2), mod("grapple", 2)],
    description: "<p>Crustáceos espirituais e reservados de Krevas, envoltos em mantos que escondem seus tentáculos.</p>",
    traits: [
      { name: "Conditional Bonus Feat", text: "Se treinado em Climb, recebe Skill Focus (Climb)." },
      { name: "Carapace", text: "+1 de armadura natural na Reflexos e na Fortitude (acumula com armadura)." },
      { name: "Stoic", text: "Quem usa Sense Motive (Perception) num Krevaaki sofre −5." },
      { name: "Tentacles", text: "+2 de espécie em Climb e em grapple." }
    ]
  }),
  sp("Nikto", "nikto", {
    abilityMods: { str: 2, int: -2, cha: -2 }, languages: "Nikto, Basic ou Huttese",
    modifiers: [mod("defenses.fortitude", 2), mod("defenses.reflex", 2, "natural")],
    rerolls: [reroll("survival", "Survival Instincts")],
    description: "<p>Reptilianos de Kintan, de pele grossa, há milênios a serviço dos Hutts; têm cinco subespécies adaptadas a terrenos diferentes.</p>",
    traits: [
      { name: "Great Fortitude", text: "+2 de espécie na Fortitude." },
      { name: "Natural Armor", text: "+2 de armadura natural na Reflexos (acumula com armadura)." },
      { name: "Survival Instincts", text: "Pode rerrolar Survival, ficando com o segundo resultado. Ver o feat Nikto Survival para as subespécies." }
    ]
  }),
  sp("Shistavanen", "shistavanen", {
    abilityMods: { dex: 2, int: -2, cha: -2 }, naturalWeapon: "1d6", languages: "Shistavanen", conditionalFeats: [cond("perception")],
    rerolls: [reroll("initiative", "Quick Reflexes")],
    description: "<p>Os \"homens-lobo\" de Uvena, caçadores isolacionistas de sentidos aguçados.</p>",
    traits: [
      { name: "Natural Weapons", text: "Garras: 1d6 de dano cortante no ataque desarmado; sempre armado." },
      { name: "Quick Reflexes", text: "Pode rerrolar Initiative, ficando com o segundo resultado." },
      { name: "Conditional Bonus Feat", text: "Se treinado em Perception, recebe Skill Focus (Perception)." },
      { name: "Uncanny Tracker", text: "Survival é sempre perícia de classe." },
      lowLight
    ]
  }),
  sp("Sluissi", "sluissi", {
    abilityMods: { dex: -2, int: 2 }, languages: "Basic, Sluissese", conditionalFeats: [cond("mechanics", "tech-specialist")],
    description: "<p>Seres serpentinos de Sluis Van, construtores de naves meticulosos e sem pressa.</p>",
    traits: [
      { name: "Careful Worker", text: "Ao gastar o dobro do tempo normal num uso de Mechanics, +10 de circunstância no teste." },
      { name: "Conditional Bonus Feat", text: "Se treinado em Mechanics, recebe Tech Specialist (Starships of the Galaxy)." },
      { name: "Serpentine", text: "Sempre conta como tendo corrida para Jump; +5 de estabilidade contra o feat Trip." }
    ]
  }),
  sp("Squib", "squib", {
    abilityMods: { str: -2, dex: 2 }, size: "small", speed: 4, languages: "Basic, Squibbian",
    rerolls: [reroll("knowledgeTechnology", "Tech Savvy")],
    description: "<p>Pequenos roedores de Skor II, colecionadores compulsivos e negociadores obstinados.</p>",
    traits: [
      small,
      { name: "Natural Diplomat", text: "+5 de espécie em Persuasion para pechinchar (Haggle); Persuasion é sempre perícia de classe." },
      { name: "Tech Savvy", text: "Pode rerrolar Knowledge (technology), ficando com o segundo resultado, e não fica limitado a conhecimento comum sem treino." },
      { name: "Weapon Familiarity", text: "Com Weapon Proficiency (rifles), é proficiente com o squib tensor rifle." }
    ]
  }),
  sp("Verpine", "verpine", {
    languages: "Basic, Verpine", conditionalFeats: [cond("mechanics")],
    modifiers: [mod("defenses.reflex", 1, "natural")], rerolls: [reroll("perception", "Heightened Awareness")],
    description: "<p>Insetoides tecnófilos do campo de asteroides de Roche, que conversam por ondas de rádio.</p>",
    traits: [
      { name: "Natural Armor", text: "+1 de armadura natural na Reflexos (acumula com armadura)." },
      { name: "Heightened Awareness", text: "Pode rerrolar Perception, ficando com o segundo resultado." },
      { name: "Verpine Communication", text: "Comunica-se mentalmente com qualquer Verpine num raio de 1 km." },
      { name: "Conditional Bonus Feat", text: "Se treinado em Mechanics, recebe Skill Focus (Mechanics)." }
    ]
  }),
  sp("Near-Human", "near-human", {
    bonusFeatChoices: 1, bonusTrainedSkills: 1,
    description: `<p>Humanos com pequenas diferenças físicas. Use como Humano, trocando o feat bônus <em>ou</em> a perícia treinada bônus por um traço de near-Human (remova manualmente o que foi trocado) e escolha até três variações cosméticas.</p>
<p><strong>Traços:</strong> ajuste de atributo (+2/−2); braços extras (até 2; −2 a menos na penalidade de ataques múltiplos); bioimplante; respirar debaixo d'água; adaptação a um clima (rerrola Endurance/Survival contra ele); condutivo (arma natural 1d6 de energia); cibernético cultural; visão no escuro; empata (telepatia sem treino nem Force Sensitivity; sente emoções se o teste superar a Vontade); nadador (rerrola Swim, escolhe 10); percepção aguçada (rerrola Perception); visão na penumbra; armadura natural (+1 Reflexos); arma natural (garras 1d6); acrobata nato (treinado em Acrobatics); persistente (rerrola Endurance); rápido (+1 deslocamento); cura rápida (fim do encontro: 1d4 + Con PV); resistente (+2 Fortitude contra um perigo); faro (a 10 quadrados ignora camuflagem e cobertura para Perception); passo elástico (−2 quadrados de corrida em saltos); surto de força (1/encontro rerrola teste de For com o dobro do mod., ou +2 no dano corpo a corpo); visualmente marcante (dobra o Carisma em Persuasion com humanoides); familiaridade com arma (uma arma exótica conta como simples).</p>
<p><strong>Variações:</strong> olhos, dígitos, barbatanas, cabelo, modelado pelos Yuuzhan Vong, cor e textura da pele, dentes, muito alto, dedos palmados.</p>`,
    traits: [{ name: "Near-Human Trait", text: "Troca o feat bônus ou a perícia bônus do Humano por um traço da lista na descrição." }]
  }),
  sp("Chiss", "chiss", {
    abilityMods: { int: 2 }, bonusTrainedSkills: 1, languages: "Cheunh",
    description: "<p>Quase-humanos de pele azul e olhos vermelhos de Csilla, frios, metódicos e nunca os primeiros a atacar (Ascendência Chiss).</p>",
    traits: [
      { name: "Bonus Trained Skill", text: "Uma perícia treinada adicional no 1º nível, da lista de perícias de classe." },
      lowLight
    ]
  }),
  sp("Ebruchi", "ebruchi", {
    abilityMods: { str: 2, con: 2, wis: -2, cha: -2 }, languages: "Ebruchese",
    modifiers: [mod("defenses.will", 2)],
    description: "<p>Piratas corpulentos de cabeça tentacular que infestam as rotas entre o espaço da República e a Ascendência Chiss.</p>",
    traits: [
      { name: "Conditional Bonus Feat", text: "Com Constituição 13 ou mais, recebe Improved Damage Threshold (adicione o feat manualmente)." },
      { name: "Iron Will", text: "+2 de espécie na Vontade." },
      { name: "Unsettling", text: "1/encontro, ao intimidar com Persuasion um alvo a até 6 quadrados, pode movê-lo −1 passo na trilha em vez do efeito normal (até o fim do encontro). Afeta a mente." }
    ]
  }),
  sp("Killik", "killik", {
    abilityMods: { con: 2, int: -2 }, naturalWeapon: "1d6", languages: "Killik, Sy Bisti",
    modifiers: [mod("defenses.reflex", 1, "natural")],
    description: "<p>Insetoides de colmeia com mente coletiva, capazes de transformar outros seres em \"Joiners\". Os traços abaixo são do Killik Médio; tamanhos de Pequeno a Enorme existem.</p>",
    traits: [
      { name: "Joiners", text: "Ao levar a 0 PV ou deixar inconsciente um ser vivo com Int 3+, e com ele indefeso, em 1 minuto o transforma em Joiner: atitude amistosa com os Killiks e +10 na Vontade contra Persuasion para mudá-la. Int CD 20 por dia para se livrar. Afeta a mente." },
      lowLight,
      { name: "Hive Mind", text: "Telepatia com Killiks num raio de 1 km." },
      { name: "Multiple Limbs", text: "Quatro membros usados como braços: −2 a menos na penalidade de ataques múltiplos." },
      { name: "Natural Armor", text: "+1 de armadura natural na Reflexos." },
      { name: "Natural Weapons", text: "Garras: 1d6 de dano cortante no ataque desarmado; sempre armado." }
    ]
  }),
  sp("Lugubraa", "lugubraa", {
    abilityMods: { str: 2, dex: -2, con: 2, wis: -2 }, naturalWeapon: "1d6", languages: "Lugubraal", bonusFeats: ["improved-damage-threshold"],
    description: "<p>Mercenários cegos e vorazes, de boca circular com anéis de dentes, que se reproduzem por brotamento.</p>",
    traits: [
      { name: "Bonus Feat", text: "Improved Damage Threshold." },
      { name: "Darkvision", text: "Ecolocalização e sensores de calor dão darkvision (são cegos à luz)." },
      { name: "Natural Weapons", text: "Tentáculos farpados (1d6) e dentes (1d4); sempre armado." },
      { name: "Lockbite", text: "Após agarrar com sucesso, prende o alvo com os dentes: +5 nos testes de grapple seguintes contra ele." },
      { name: "Lugubraa Learning", text: "Até os 50 anos, Inteligência máxima 8; depois sobe 1d4+2." }
    ]
  }),
  sp("Sorcerer of Rhand", "sorcerer-of-rhand", {
    abilityMods: { str: -2, dex: -2, int: 4, wis: 2, cha: -2 }, languages: "Basic e muitas outras", bonusFeats: ["force-sensitivity", "force-training"],
    rerolls: [{ skill: "persuasion", keep: "best", label: "Repulsive Appearance (intimidar)" }],
    description: "<p>Seguidores do \"Dark\" da Nebulosa Perann, transformados além de sua espécie original. Têm de uma a três qualidades especiais (ver o Gerador de Criaturas).</p>",
    traits: [
      { name: "Bonus Feats", text: "Force Sensitivity e Force Training; metade dos poderes deste Force Training precisa ter o descritor [dark side] e nenhum pode ser [light side]." },
      { name: "Repulsive Appearance", text: "Rerrola Persuasion para intimidar (fica com o melhor); +5 na Vontade contra Persuasion de outros." },
      { name: "Speed", text: "Alguns flutuam em vez de andar." }
    ]
  }),
  sp("Ssi-ruuk", "ssi-ruuk", {
    abilityMods: { str: 2, wis: -2 }, languages: "Ssi-ruuvi", conditionalFeats: [cond("persuasion")],
    modifiers: [mod("defenses.reflex", 2, "natural")],
    description: "<p>Sáurios bípedes de Lwhekk, criadores da \"entechment\", que drena a energia vital de cativos para alimentar máquinas.</p>",
    traits: [
      { name: "Conditional Bonus Feat", text: "Se treinado em Persuasion, recebe Skill Focus (Persuasion)." },
      { name: "Force Blind", text: "Não pode pegar Force Sensitivity, usar Use the Force nem ganhar Pontos da Força (mas é afetado pela Força)." },
      { name: "Keen Smell", text: "A até 6 quadrados (ou no mesmo cômodo), rerrola Persuasion contra o alvo e fica com o melhor." },
      { name: "Natural Armor", text: "+2 de armadura natural na Reflexos." }
    ]
  }),
  sp("Tof", "tof", {
    abilityMods: { str: 2, dex: -2, wis: -2, cha: 2 }, size: "large", languages: "Tof",
    description: "<p>Quase-humanos enormes e hedonistas do halo galáctico, piratas de galeões a vela de energia.</p>",
    traits: [
      { name: "Large Size", text: "−1 na Reflexos, −5 em Stealth, +5 no Limiar; carga o dobro do normal." },
      { name: "Bonus Feat", text: "Rapid Shot ou Rapid Strike (escolha)." },
      { name: "Conditional Bonus Feat", text: "Com Martial Arts I e For 13, pode pegar Mighty Swing como feat bônus." },
      { name: "Tof Fearlessness", text: "1/encontro ignora um efeito de medo ou que afete a mente; +5 de espécie na Vontade contra intimidação." }
    ]
  }),
  sp("Vagaari", "vagaari", {
    abilityMods: { str: 2, wis: -2 }, languages: "Vagaari, Sy Bisti", conditionalFeats: [cond("deception")],
    rerolls: [{ skill: "knowledgeLifeSciences", keep: "second", label: "Bioknowledge" }, { skill: "treatInjury", keep: "second", label: "Bioknowledge" }],
    description: "<p>Nômades cruéis que usam escravos como \"escudos vivos\" nas naves e arrastam presas do hiperespaço com projetores pseudograv.</p>",
    traits: [
      { name: "Conditional Bonus Feat", text: "Se treinado em Deception, recebe Skill Focus (Deception)." },
      { name: "Frightening Visage", text: "Com máscara e trajes tradicionais, rerrola Persuasion para intimidar (fica com o melhor) e conta como treinado para isso." },
      { name: "Bioknowledge", text: "Rerrola Knowledge (life sciences) ou Treat Injury, ficando com o segundo resultado." }
    ]
  })
];
