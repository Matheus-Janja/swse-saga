// Jedi Academy Training Manual — Cap. 3: armas (Tabelas 3-1 e 3-4), armaduras (3-5), equipamentos (3-6),
// cristais de sabre (3-3), acessórios de sabre e artefatos Sith. Descrições resumidas.
const SRC = "Jedi Academy Training Manual";
const W = (name, key, o) => ({
  name, type: "weapon", img: o.img ?? "icons/weapons/swords/sword-runed-glowing.webp",
  system: {
    key, group: "lightsabers", size: "medium", rangeType: "melee", damage: "2d8", damage2: "", damageType: "energy",
    stun: false, stunDamage: "", ion: false, rateOfFire: "S", area: "", accurate: false, inaccurate: false, thrown: false,
    reach: false, double: false, strDamage: false, noStrDamage: false, ignoresDR: true, attackBonus: 0, damageBonus: 0,
    critRange: 20, critMultiplier: 2, ammo: { value: 0, max: 0 }, special: "", cost: 0, weight: 0, quantity: 1,
    availability: "rare", equipped: false, modifiers: [], settings: "", source: SRC, ...o, description: o.description ? `<p>${o.description}</p>` : ""
  }
});
const AR = (name, key, o) => ({
  name, type: "armor", img: o.img ?? "icons/equipment/chest/breastplate-banded-steel.webp",
  system: { key, category: "light", reflexBonus: 0, fortBonus: 0, maxDex: 5, special: "", cost: 0, weight: 0, quantity: 1, availability: "rare", equipped: false, modifiers: [], source: SRC, ...o, description: o.description ? `<p>${o.description}</p>` : "" }
});
const EQ = (name, key, category, cost, weight, description = "", o = {}) => ({
  name, type: "equipment", img: o.img ?? "icons/containers/bags/pack-leather-brown.webp",
  system: { key, category, cost, weight, quantity: 1, availability: o.availability ?? "", equipped: false, special: o.special ?? "", modifiers: o.modifiers ?? [], source: SRC, description: description ? `<p>${description}</p>` : "" }
});
const mod = (target, value, type = "untyped") => ({ target, value: String(value), type, label: "", disabled: false });
const BUILD = dc => ` Construção: Use the Force CD ${dc}.`;

export const weapons = [
  W("San-Ni Staff", "san-ni-staff", { group: "advancedMelee", size: "large", damage: "2d6", damage2: "2d6", double: true, stun: true, ignoresDR: false, damageType: "bludgeoning", cost: 4500, weight: 2.2, img: "icons/weapons/staves/staff-simple-carved.webp", special: "lightsaberBlock", description: "Bastão de três hastes unidas por acoplamentos de energia (imunes a sabres). Arma dupla (−10 nas duas pontas, reduzível por feats). Pode ser usado com Block como se fosse um sabre; o portador escolhe se causa dano de atordoamento. Requer duas células." }),
  W("Shoto, Guard", "guard-shoto", { size: "small", damage: "2d4", cost: 7000, weight: 1, special: "shoto block+2 deflect+2 phrik", description: `Shoto com segunda empunhadura (tonfa) e cabo de phrik: +2 de equipamento no Use the Force para Block e Deflect (automático); sabres não ignoram a RD do cabo.${BUILD(20)}` }),
  W("Lightfoil, Archaic", "lightfoil-archaic", { damage: "2d8", cost: 4500, weight: 0.5, special: "lightOption", description: `Sabre delicado dos duelistas de Tapani: pode ser tratado como arma Pequena (leve) quando for vantajoso (automático); não pode ser empunhado com duas mãos.${BUILD(20)}` }),
  W("Lightfoil, Modern", "lightfoil-modern", { damage: "2d6", cost: 2500, weight: 0.5, special: "lightOption", description: `Versão moderna e menos potente, construída até por quem não é sensível à Força: pode ser tratada como arma Pequena (leve); não pode ser empunhada com duas mãos.${BUILD(15)}` }),
  W("Lightsaber, Archaic", "lightsaber-archaic", { damage: "2d6", cost: 2000, weight: 1, description: `Sabre antigo ligado a um pacote de energia no cinto (600 cr). Uma força aplicada ao cabo (ex.: desarmar) desconecta a lâmina. Retrosaber: CD 25, 2d8; ação rápida para 2d10 até o fim do próximo turno, depois 2d4 por uma rodada.${BUILD(15)}` }),
  W("Lightsaber, Crossguard", "lightsaber-crossguard", { damage: "2d8", cost: 4000, weight: 0.7, special: "crossguard deflect-2", description: `Duas lâminas laterais protegem a mão: com Block, a penalidade cumulativa é só −2 (em vez de −5); −2 no Use the Force para Deflect (automáticos).${BUILD(25)}` }),
  W("Lightsaber, Dual-Phase", "lightsaber-dual-phase", { damage: "2d8", cost: 6000, weight: 0.5, description: `Ação rápida: lâmina estendida (alcance +1 quadrado, −2 na Reflexos contra atacantes adjacentes). Pode ter dois cristais diferentes, alternados com ação rápida.${BUILD(25)}` }),
  W("Lightsaber, Dueling", "lightsaber-dueling", { damage: "2d8", cost: 3000, weight: 0.3, special: "dueling", description: `Cabo curvo para duelos: empunhado com uma mão, +1 de equipamento nos ataques de oportunidade (opção no diálogo de ataque).${BUILD(25)}` }),
  W("Lightwhip", "lightwhip", { damage: "2d4", cost: 5000, weight: 1, reach: true, img: "icons/weapons/misc/whip-red-yellow.webp", description: `Lâmina flexível de alcance 2: ao acertar, pode iniciar um agarrar/agarrão. Escapar: Acrobatics CD 15. Funciona com Pin e Trip, não com Crush ou Throw. Quem termina o turno preso sofre o dano base.${BUILD(25)}` }),
  W("Lightsaber, Great", "lightsaber-great", { size: "large", damage: "2d10", cost: 5000, weight: 5, description: `Sabre enorme para espécies Grandes; só criaturas Grandes ou maiores o usam com feats de armas leves.${BUILD(20)}` }),
  W("Lightsaber, Long-Handle", "lightsaber-long-handle", { size: "large", damage: "2d8", damage2: "1d6", cost: 4500, weight: 2, special: "longHaft", description: `Cabo longo: com as duas mãos, pode abrir mão do dobro da Força no dano para usar 2d10. Com Long Haft Strike vira arma dupla (a outra ponta 1d6).${BUILD(20)}` }),
  W("Lightsaber Pike", "lightsaber-pike", { size: "large", damage: "2d8", damage2: "1d6", reach: true, cost: 4000, weight: 2, special: "longHaft deflect-2 block-2 phrik", description: `Arma da Guarda Imperial: cabo de phrik (sabres não ignoram a RD), alcance +1 quadrado, −2 no Use the Force para Block e Deflect. Com Long Haft Strike vira arma dupla (a outra ponta 1d6).${BUILD(20)}` }),
  W("Wan-Shen", "wan-shen", { group: "simple", size: "large", damage: "2d6", damage2: "2d6", double: true, reach: true, ignoresDR: false, damageType: "slashing", cost: 1000, weight: 2, img: "icons/weapons/polearms/glaive-hooked-steel.webp", description: "Arma de haste dos Matukai: alcance +1 quadrado; arma dupla (−10 nas duas pontas); desmonta em 4 partes Pequenas (rodada completa)." }),
  W("Discblade", "discblade", { group: "exotic", size: "small", rangeType: "thrown", damage: "2d8", thrown: true, ignoresDR: false, damageType: "slashing", cost: 2000, weight: 1.25, img: "icons/weapons/thrown/shuriken-blue.webp", description: "Anel com lâminas curvas dos Zeison Sha; arremessado voa em linha reta; um guerreiro Zeison Sha pode trazê-lo de volta com a Força." }),
  W("R-9 Flash Canister", "r9-flash-canister", { group: "simple", size: "tiny", rangeType: "thrown", damage: "0", thrown: true, noStrDamage: true, ignoresDR: false, area: "Raio 3", cost: 100, weight: 0.5, availability: "restricted", img: "icons/weapons/thrown/grenade-round.webp", description: "Granada de treino: explosão de raio 3 sem dano; quem for atingido dá camuflagem total a todos os outros contra ele até o início do próximo turno do atacante. Cegos são imunes." })
];

export const armor = [
  AR("Dark Armor, Light", "dark-armor-light", { category: "light", reflexBonus: 4, fortBonus: 3, maxDex: 3, cost: 10000, weight: 10, description: "Armadura de Lorde Sith; vem com um traço de Sith Alchemy Specialist." }),
  AR("Jedi Battle Armor, Light", "jedi-battle-armor-light", { category: "light", reflexBonus: 3, fortBonus: 3, maxDex: 4, cost: 4000, weight: 6 }),
  AR("WJ-880 Blinding Helmet", "wj-880-blinding-helmet", { category: "light", reflexBonus: 0, fortBonus: 0, maxDex: 99, cost: 200, weight: 2, description: "Capacete de treino que cobre os olhos: todos os alvos têm camuflagem total contra quem o usa." }),
  AR("Dark Armor, Medium", "dark-armor-medium", { category: "medium", reflexBonus: 7, fortBonus: 4, maxDex: 2, cost: 15000, weight: 16, description: "Vem com um traço de Sith Alchemy Specialist." }),
  AR("Jedi Battle Armor, Medium", "jedi-battle-armor-medium", { category: "medium", reflexBonus: 5, fortBonus: 5, maxDex: 3, cost: 6000, weight: 12 }),
  AR("Dark Armor, Heavy", "dark-armor-heavy", { category: "heavy", reflexBonus: 8, fortBonus: 5, maxDex: 1, cost: 25000, weight: 30, description: "Vem com um traço de Sith Alchemy Specialist." }),
  AR("Orbalisk Armor", "orbalisk-armor", { category: "heavy", reflexBonus: 10, fortBonus: 2, maxDex: 1, cost: 0, weight: 26, modifiers: [mod("damageReduction", 10)], description: "Parasitas de Dxun ligados à pele (exige Dark Side Score igual à Sabedoria): RD 10 que sabres não ignoram (automático); sem penalidade de perícia por falta de proficiência; só sai com cirurgia." })
];

export const equipment = [
  EQ("8-2A Medical Bundle", "medical-bundle-8-2a", "medical", 200, 1, "Conta como kit médico em Treat Injury, mas só em alvos em transe da Força."),
  EQ("Subelectronic Converter", "subelectronic-converter", "cybernetic", 23000, 0, "Implante que permite usar poderes de afetar a mente em droides; −2 na Vontade (automático). Instalado com Cybernetic Surgery.", { modifiers: [mod("defenses.will", -2, "penalty"), mod("skills.useTheForce", -1)], special: "cybernetic" }),
  EQ("Sith Battle Harness", "sith-battle-harness", "survival", 5000, 90, "Arreio de batalha para feras grandes: cobertura aprimorada para o cavaleiro, +2 de equipamento em Ride, a montaria recebe +4 de equipamento na Reflexos e na Fortitude; canhão blaster embutido com munição ilimitada."),
  EQ("Force Detector", "force-detector", "detection", 2000, 9, "5 rodadas e Use Computer CD 15: indica se o alvo tem Force Sensitivity."),
  EQ("Force Training Aid", "force-training-aid", "tools", 25, 1, "Quem não é treinado em Use the Force, após 1 hora de treino, pode usar uma aplicação \"só treinado\" de Use the Force por 24 horas."),
  EQ("Universal Energy Cage", "universal-energy-cage", "tools", 20000, 3000, "Jaula para usuários da Força (RD 20, 150 PV, Limiar 25): cada vez que sofre 15+ de dano, o prisioneiro leva 4d8 de atordoamento."),
  EQ("Sith Amulet", "sith-amulet", "accessory", 0, 0, "Artefato Sith: Move Light Object como projétil causa 2d6; ao ativar poder [telekinetic], +1 DSS para rerrolar o Use the Force (fica com o melhor); ação padrão e +1 DSS: alvo a até 12 quadrados, Use the Force contra a Reflexos, 3d8 de corte e da Força.", { availability: "rare", img: "icons/equipment/neck/amulet-carved-stone-purple.webp" }),
  EQ("Sith Talisman", "sith-talisman", "accessory", 0, 0, "Criado com Sith Alchemy (Ponto da Força): +1d6 no dano dos poderes da Força; +1 Dark Side Score ao usá-lo pela primeira vez; um por vez.", { availability: "rare", img: "icons/equipment/neck/pendant-faceted-red.webp" }),
  EQ("Holocron (Jedi)", "holocron-jedi", "computer", 0, 0.5, "Guarda o conhecimento de um Mestre: o bônus de Use the Force do holocron substitui Knowledge sobre a tradição Jedi; serve de mestre para Force Training e retreinamento. Guardião (ND 5): Instructive Bond (ação padrão, um aliado gasta PF: +1 ataque, +2 numa Defesa, +1 dado com sabre, +5 em Deflect ou +5 em rebuke).", { availability: "rare", img: "icons/commodities/gems/gem-faceted-trillion-blue.webp" }),
  EQ("Holocron (Sith)", "holocron-sith", "computer", 0, 0.5, "Como o Jedi, mas conta como tradição Sith para Sith Apprentice; após 1 hora de estudo, Ponto da Força (ação rápida) para adicionar um poder [dark side] ao conjunto, 1/dia. Guardião ND 6.", { availability: "rare", img: "icons/commodities/gems/gem-faceted-trillion-red.webp" })
];

// Venenos e perigos do lado sombrio (mesmo formato dos venenos do Galaxy of Intrigue)
const PO = (name, key, cl, attack, defense, text, effect) => EQ(`${name} (CL ${cl})`, key, "poison", 0, 0, text,
  { special: `poison|${attack}|${defense}|${effect}`, img: "icons/consumables/potions/bottle-round-corked-purple.webp", availability: "rare" });
export const poisons = [
  PO("Sith Poison", "sith-poison", 10, "1d20+12", "fortitude", "Ferimento ou ingestão. Se vencer a Fortitude: 4d6 de dano e −1 passo persistente; se falhar, nada. Cada vez que o alvo gastar um Ponto da Força: 1d20+12 contra a Vontade; se acertar, +1 Dark Side Score. Use the Force CD 25 neutraliza; 5 falhas seguidas o neutralizam.", "dmg4d6-step1p"),
  PO("Madness of Knowledge", "madness-of-knowledge", 6, "1d20+8", "will", "Ao ler um tomo Sith pela primeira vez. Se vencer a Vontade: −2 passos persistentes e −5 na Vontade até remover a condição; paranoia (com 1 natural no ataque, o próximo ataque é contra um aliado). Treat Injury CD 25 após 8 horas de descanso.", "step2p"),
  PO("Death Seed Plague (droch)", "death-seed-plague", 1, "1d20+1", "fortitude", "Transmitida pela mordida do droch. Se vencer a Fortitude: −1 passo persistente e −5 na Fortitude; repete a cada dia sem tratamento; no fim da trilha, morte. Treat Injury CD 25 (CD 15 com tanque de bacta).", "step1p")
];

// Cristais de sabre (Tabela 3-3): o bônus vale só para o construtor sintonizado (os que mudam o tipo de dano valem para todos).
const CR = (name, key, color, dcMod, effect, o = {}) => EQ(name, key, "crystal", 0, 0,
  `Cor: ${color}. Modificador na CD de construção: ${dcMod}. ${effect} Substitui o +1 normal de construtor no ataque. (Aplique o efeito na arma ou em efeitos temporários; os que alteram o dano ficam no campo da arma.)`,
  { img: "icons/commodities/gems/gem-rough-cushion-blue.webp", availability: o.availability ?? "rare" });
export const crystals = [
  CR("Ankarres Sapphire", "crystal-ankarres-sapphire", "azul", "+5", "Com Dark Side Score 0: +5 da Força em Treat Injury e no Use the Force para vital transfer."),
  CR("Barab Ingot", "crystal-barab-ingot", "variada", "+5", "O sabre causa dano de fogo (em vez de energia e corte) e o alvo pega fogo."),
  CR("Bondar Crystal", "crystal-bondar", "variada", "—", "O sabre causa dano de atordoamento (sabres de treino)."),
  CR("Compressed Crystal", "crystal-compressed", "vermelha ou variada", "+5", "Alvos sofrem −2 no Use the Force para bloquear (Block) seus ataques."),
  CR("Corusca Gem", "crystal-corusca", "variada", "—", "+1 dado de dano contra alvos com RD."),
  CR("Dantari Crystal", "crystal-dantari", "variada", "—", "Com 19 natural no Use the Force para ativar um poder, recupera poderes gastos ([light side] com DSS 0; [dark side] com DSS 1+)."),
  CR("Dragite Crystal", "crystal-dragite", "variada", "+5", "+1 dado de dano sônico nos críticos (somado depois de multiplicar)."),
  CR("Durindfire Crystal", "crystal-durindfire", "prateada", "—", "A lâmina ilumina como uma lanterna de fusão."),
  CR("Firkraan Crystal", "crystal-firkraan", "variada", "—", "O sabre causa dano iônico."),
  CR("Heart of the Guardian", "crystal-heart-of-the-guardian", "laranja", "+10", "+2 da Força no ataque contra alvos empunhando sabre ativo."),
  CR("Hurikane Crystal", "crystal-hurikane", "azul ou violeta", "+5", "+2 da Força no ataque contra alvos com bônus de armadura na Reflexos."),
  CR("Ilum Crystal", "crystal-ilum", "azul ou verde", "—", "+1 no ataque (padrão)."),
  CR("Jenraux Crystal", "crystal-jenraux", "variada", "—", "+2 da Força no Use the Force para Block."),
  CR("Kaiburr Crystal Shard", "crystal-kaiburr", "carmesim", "+5", "Ao gastar Ponto da Força no ataque, o dado sobe um passo (d6→d8; d8→d10 com Strong in the Force)."),
  CR("Kasha Crystal", "crystal-kasha", "variada", "—", "+2 da Força na Vontade."),
  CR("Kathracite Crystal", "crystal-kathracite", "variada", "−5", "O dado de dano desce um passo (d8→d6, d6→d4; d4 perde um dado); +1 no ataque."),
  CR("Krayt Dragon Pearl", "crystal-krayt-pearl", "variada", "+10", "+3 da Força no dano."),
  CR("Lambent Crystal", "crystal-lambent", "variada", "+10", "Ignora as penalidades para sentir os Yuuzhan Vong com Sense Force e Sense Surroundings."),
  CR("Mantle of the Force", "crystal-mantle-of-the-force", "ciano", "+10", "+2 da Força no Use the Force para poderes que têm só você como alvo."),
  CR("Mephite Crystal", "crystal-mephite", "variada", "—", "+1 no ataque (padrão)."),
  CR("Opila Crystal", "crystal-opila", "variada", "—", "+1 dado de dano nos críticos."),
  CR("Phond Crystal", "crystal-phond", "variada", "—", "+1 dado de dano contra alvos com escudo (SR)."),
  CR("Pontite Crystal", "crystal-pontite", "azul ou verde", "+5", "Sem penalidade em Persuasion para mudar a atitude de criaturas hostis ou indiferentes a até 6 quadrados."),
  CR("Rubat Crystal", "crystal-rubat", "variada", "—", "1/encontro, rerrola um dano e fica com o melhor."),
  CR("Sigil Crystal", "crystal-sigil", "variada", "—", "+2 da Força no dano."),
  CR("Solari Crystal", "crystal-solari", "variada", "—", "+2 da Força no Use the Force para Deflect."),
  CR("Standard Synthetic Crystal", "crystal-synthetic", "vermelha ou variada", "—", "+1 no ataque. Criar um: compressor geológico (licença 2.000 cr), 24 h e Use the Force CD 20."),
  CR("Unstable Crystal", "crystal-unstable", "vermelha ou variada", "+5", "+1 dado de dano nos críticos; com 1 natural no ataque, desliga até o fim do seu próximo turno.")
];

// Acessórios e modificações de sabre (um por sabre; Tech Specialist permite +1)
const AC = (name, key, text) => EQ(name, key, "accessory", 0, 0, `Acessório de sabre: ${text}`, { img: "icons/tools/hand/screwdriver-steel-grey.webp", availability: "rare" });
export const accessories = [
  AC("Beckon Call (sabre)", "saber-beckon-call", "sinal que chama uma nave com circuito escravo ao ponto seguro mais próximo."),
  AC("Blade Lock", "saber-blade-lock", "ação rápida trava a lâmina ligada (para arremessar); desligar exige duas ações rápidas."),
  AC("Concealed Compartment", "saber-concealed-compartment", "guarda um objeto Fino no cabo."),
  AC("Electrum Detail", "saber-electrum-detail", "detalhe dourado de Mestres: circunstância favorável em Persuasion com quem conhece a tradição."),
  AC("Fiber Cord", "saber-fiber-cord", "quem o desarma não pode pegar o sabre; ele fica pendurado até você recuperá-lo."),
  AC("Force-Activated", "saber-force-activated", "liga só com Use the Force CD 5 (ação rápida, pode ser ao sacar)."),
  AC("Interlocking Hilt", "saber-interlocking-hilt", "ação rápida une dois sabres numa arma dupla (uma categoria acima do maior)."),
  AC("Pressure Grip", "saber-pressure-grip", "a lâmina desliga ao soltar ou ser desarmado."),
  AC("Trapped Grip", "saber-trapped-grip", "sem a ação secreta, quem liga o sabre sofre 1d6 de energia a cada turno; Perception CD 20 revela."),
  AC("Waterproof Casing", "saber-waterproof-casing", "funciona debaixo d'água.")
];
