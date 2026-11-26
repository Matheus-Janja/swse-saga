// Knights of the Old Republic Campaign Guide — Cap. 5: armas, armaduras, equipamentos, acessórios e modelos de equipamento.
// (Os cristais alternativos e o lightfoil já vêm do Jedi Academy Training Manual.)
const SRC = "Knights of the Old Republic Campaign Guide";
const mod = (target, value, type = "equipment") => ({ target, value: String(value), type, label: "", disabled: false });
const IMG = {
  blade: "icons/weapons/swords/sword-guard-blue.webp", staff: "icons/weapons/staves/staff-simple-carved.webp", axe: "icons/weapons/axes/axe-broad-black.webp",
  pistol: "icons/weapons/guns/gun-pistol-flintlock-white.webp", rifle: "icons/weapons/guns/rifle-brown.webp", heavy: "icons/weapons/guns/gun-blunderbuss-gold.webp",
  grenade: "icons/weapons/thrown/bomb-fuse-black.webp", disc: "icons/weapons/thrown/shuriken-blue.webp", tech: "icons/commodities/tech/circuit-board.webp",
  implant: "icons/commodities/tech/cog-steel-grey.webp", tpl: "icons/sundries/documents/blueprint-recipe-alchemical.webp", shield: "icons/magic/defensive/shield-barrier-blue.webp"
};
const W = (name, key, o) => ({
  name, type: "weapon", img: o.img ?? IMG.pistol,
  system: {
    key, group: "simple", size: "medium", rangeType: "melee", damage: "1d4", damage2: "", damageType: "energy",
    stun: false, stunDamage: "", ion: false, rateOfFire: "S", area: "", accurate: false, inaccurate: false, thrown: false,
    reach: false, double: false, strDamage: false, noStrDamage: false, ignoresDR: false, attackBonus: 0, damageBonus: 0,
    critRange: 20, critMultiplier: 2, ammo: { value: 0, max: 0 }, special: "", cost: 0, weight: 0, quantity: 1,
    availability: "", equipped: false, modifiers: [], settings: "", upgradeSlots: 1, upgrades: [], source: SRC, ...o,
    description: o.description ? `<p>${o.description}</p>` : ""
  }
});
const AR = (name, key, o) => ({
  name, type: "armor", img: "icons/equipment/chest/breastplate-banded-steel.webp",
  system: { key, category: "light", reflexBonus: 0, fortBonus: 0, maxDex: 5, special: "", cost: 0, weight: 0, quantity: 1, availability: "", equipped: false, modifiers: [], upgradeSlots: 1, upgrades: [], source: SRC, ...o, description: o.description ? `<p>${o.description}</p>` : "" }
});
const EQ = (name, key, category, cost, weight, description, o = {}) => ({
  name, type: "equipment", img: o.img ?? IMG.tech,
  system: { key, category, cost, weight, quantity: 1, availability: o.availability ?? "", equipped: false, special: "", modifiers: o.modifiers ?? [], source: SRC, description: `<p>${description}</p>` }
});

export const weapons = [
  // Corpo a corpo
  W("Dire Vibroblade", "dire-vibroblade", { group: "advancedMelee", damage: "2d6", damageType: "slashing", cost: 60, weight: 2, availability: "licensed", img: IMG.blade, description: "Vibrolâmina de cabo longo: pode ser usada com as duas mãos (dobro do bônus de Força no dano). Requer célula de energia." }),
  W("Double Vibroblade", "double-vibroblade", { group: "advancedMelee", size: "large", damage: "2d6", damage2: "2d6", double: true, damageType: "slashing", cost: 550, weight: 4, availability: "licensed", img: IMG.staff, description: "Arma dupla: ataca com as duas pontas como rodada completa, −10 nos dois ataques (feats reduzem). Requer duas células de energia." }),
  W("Shockstaff", "shockstaff", { group: "advancedMelee", size: "large", damage: "2d6", damage2: "2d6", double: true, damageType: "bludgeoning", stun: true, stunDamage: "2d6", cost: 3500, weight: 3, availability: "restricted", img: IMG.staff, description: "Arma dupla com liga phrik: sabres de luz não ignoram a RD dela. Modo de atordoamento (ação rápida). Requer duas células de energia." }),
  W("Shyarn", "shyarn", { group: "exotic", size: "tiny", damage: "3d4", damageType: "slashing", cost: 40, weight: 1, availability: "rare", img: IMG.blade, description: "Lâmina cereana magneticamente carregada: sem penalidade nos ataques com Rapid Strike." }),
  W("Fira", "fira", { group: "exotic", damage: "1d8", damageType: "slashing", cost: 100, weight: 2, availability: "rare", img: IMG.blade, description: "Espada da Ordem de Shasa forjada com cortosis (modelo Cortosis Weave): se o ataque igualar ou superar a Reflexos e a Fortitude de um ser vivo, ele sofre metade do dano de novo na rodada seguinte." }),
  W("Arg'garok", "arggarok", { group: "exotic", size: "large", damage: "2d12", damageType: "slashing", cost: 150, weight: 2, availability: "rare", img: IMG.axe, description: "Machado gamorreano enorme: com Força menor que 15, −5 nos ataques. Gamorreanos a tratam como arma corpo a corpo avançada." }),
  W("Zhaboka", "zhaboka", { group: "exotic", size: "large", damage: "2d6", damage2: "2d6", double: true, damageType: "slashing", cost: 165, weight: 2, availability: "rare", img: IMG.staff, description: "Lança dupla cerimonial zabrak: sem penalidade com Rapid Strike; arma dupla (−10 nas duas pontas)." }),
  W("Short Sword", "short-sword", { group: "simple", size: "small", damage: "1d6", damageType: "slashing", cost: 40, weight: 1.5, img: IMG.blade, description: "Espada antiga usada para desviar golpes, comum com duas armas." }),
  W("War Sword", "war-sword", { group: "simple", damage: "1d8", damageType: "slashing", cost: 50, weight: 2, img: IMG.blade, description: "Espada longa pesada; a maioria das espadas Sith é uma war sword." }),
  W("Dire Sword", "dire-sword", { group: "simple", size: "large", damage: "1d10", damageType: "slashing", cost: 100, weight: 4, img: IMG.blade, description: "Espada clássica de duelistas, refinamento da espada longa." }),
  W("Double-Bladed Sword", "double-bladed-sword", { group: "simple", size: "large", damage: "1d6", damage2: "1d6", double: true, damageType: "slashing", cost: 120, weight: 2, img: IMG.staff, description: "Arma dupla (rodada completa, −10 nos dois ataques)." }),
  // À distância
  W("Aurial Blaster", "aurial-blaster", { group: "exotic", rangeType: "pistol", damage: "3d6", damageType: "energy", cost: 2500, weight: 1, availability: "restricted", ammo: { value: 50, max: 50 }, description: "Pistola sônica (dano sônico não pode ser defletido). Se o ataque superar a Fortitude, o alvo sofre −5 em Perception até o fim do seu próximo turno (ensurdecido)." }),
  W("Lanvarok (Sith)", "lanvarok-sith", { group: "exotic", rangeType: "pistol", damage: "3d4", damageType: "bludgeoning", inaccurate: true, cost: 4000, weight: 5.8, availability: "rare", ammo: { value: 5, max: 5 }, img: IMG.disc, description: "Lança-discos de pulso (alcance de pistola); deixa as mãos livres e conta como segunda arma em combate com duas armas. Discos: 5 cr, 0,1 kg. Kissai e Massassi a tratam como arma simples." }),
  W("Lanvarok (Massassi)", "lanvarok-massassi", { group: "exotic", size: "large", rangeType: "thrown", damage: "3d4", damageType: "bludgeoning", inaccurate: true, cost: 250, weight: 9.8, availability: "rare", ammo: { value: 1, max: 1 }, img: IMG.disc, description: "Arma de haste que arremessa um disco (alcance de arremesso); depois funciona como arma de duas mãos (1d8 cortante). Massassi a tratam como arma corpo a corpo avançada." }),
  W("Carbonite Rifle", "carbonite-rifle", { group: "heavy", rangeType: "heavy", damage: "3d10", stun: true, stunDamage: "3d10", special: "stunOnly", cost: 1200, weight: 6, availability: "licensed", ammo: { value: 20, max: 20 }, img: IMG.heavy, description: "Jato de carbonita líquida: só atordoa; quem descer na trilha fica imobilizado até o fim do seu próximo turno. Cartucho (20 tiros): 50 cr, 1 kg." }),
  W("Needler", "needler", { group: "pistols", size: "small", rangeType: "pistol", damage: "2d4", damageType: "piercing", inaccurate: true, cost: 650, weight: 1, availability: "licensed", ammo: { value: 10, max: 10 }, description: "Dardos que atravessam escudos pessoais; a munição pode levar veneno de contato. Pente (10): 20 cr." }),
  W("Pulse-Wave Pistol", "pulse-wave-pistol", { group: "pistols", size: "small", rangeType: "pistol", damage: "2d6", inaccurate: true, cost: 200, weight: 1, availability: "licensed", ammo: { value: 100, max: 100 }, description: "Antecessora da pistola blaster: +4 de equipamento no dano à queima-roupa; inútil a longa distância." }),
  W("Ripper", "ripper", { group: "pistols", size: "small", rangeType: "pistol", damage: "2d4", damageType: "slashing", inaccurate: true, cost: 750, weight: 1, availability: "licensed", ammo: { value: 10, max: 10 }, description: "Estilhaços que ignoram escudos pessoais; se descer o alvo na trilha (dano acima do Limiar), causa mais 1d4 imediatamente." }),
  W("Sonic Disruptor", "sonic-disruptor", { group: "pistols", size: "small", rangeType: "pistol", damage: "2d6", cost: 1000, weight: 1, availability: "illegal", ammo: { value: 10, max: 10 }, description: "Disruptor sônico ilegal: trata o Limiar do alvo como 5 menor; se matar ou destruir, desintegra. Só dispara a cada outra rodada e não combina com feats de tiros múltiplos; não pode ser defletido." }),
  W("Sonic Pistol", "sonic-pistol", { group: "pistols", size: "small", rangeType: "pistol", damage: "2d6", cost: 900, weight: 1, availability: "licensed", ammo: { value: 100, max: 100 }, description: "Dano sônico: não pode ser negado com Deflect (nem talentos que exigem Deflect)." }),
  W("Heavy Sonic Pistol", "heavy-sonic-pistol", { group: "pistols", rangeType: "pistol", damage: "2d8", inaccurate: true, cost: 1250, weight: 1, availability: "licensed", ammo: { value: 50, max: 50 }, description: "Dano sônico: não pode ser negado com Deflect." }),
  W("Ion Carbine", "ion-carbine", { group: "rifles", rangeType: "rifle", damage: "3d8", ion: true, damageType: "ion", rateOfFire: "SA", inaccurate: true, cost: 800, weight: 3, availability: "restricted", ammo: { value: 30, max: 30 }, img: IMG.rifle, description: "Carabina iônica com autofire, criada contra dróides assassinos e de guerra." }),
  W("Pulse-Wave Rifle", "pulse-wave-rifle", { group: "rifles", rangeType: "rifle", damage: "2d8", rateOfFire: "SA", inaccurate: true, cost: 550, weight: 4, availability: "restricted", ammo: { value: 50, max: 50 }, img: IMG.rifle, description: "+5 de equipamento no dano à queima-roupa." }),
  W("Sonic Rifle", "sonic-rifle", { group: "rifles", rangeType: "rifle", damage: "2d8", rateOfFire: "SA", cost: 900, weight: 5, availability: "restricted", ammo: { value: 50, max: 50 }, img: IMG.rifle, description: "Dano sônico: não pode ser negado com Deflect." }),
  W("Assault Blaster Rifle", "assault-blaster-rifle", { group: "rifles", size: "large", rangeType: "rifle", damage: "3d8", stun: true, stunDamage: "3d8", rateOfFire: "SA", accurate: true, cost: 1750, weight: 5, availability: "military", ammo: { value: 50, max: 50 }, img: IMG.rifle, description: "Rifle de precisão de origem mandaloriana, aperfeiçoado pela Czerka. Preciso." }),
  W("Repeating Blaster Carbine", "repeating-blaster-carbine", { group: "rifles", size: "large", rangeType: "rifle", damage: "3d10", stun: true, stunDamage: "3d10", rateOfFire: "A", inaccurate: true, area: "Autofire", cost: 2000, weight: 6, availability: "military", ammo: { value: 30, max: 30 }, img: IMG.rifle, description: "Só autofire (ataque de área); ineficaz a longa distância." }),
  W("Adhesive Grenade", "adhesive-grenade", { group: "simple", size: "tiny", rangeType: "thrown", thrown: true, damage: "0", area: "Explosão", cost: 200, weight: 0.5, availability: "restricted", img: IMG.grenade, description: "Sem dano: alvos na explosão fazem teste de agarrar contra o ataque; quem falhar fica preso (sem mover) por 3 rodadas; quem se soltar atravessa a área livremente." }),
  W("CryoBan Grenade", "cryoban-grenade", { group: "simple", size: "tiny", rangeType: "thrown", thrown: true, damage: "3d6", area: "Explosão", cost: 500, weight: 0.5, availability: "restricted", img: IMG.grenade, description: "Químicos super-resfriados: quem tiver a Fortitude superada pelo ataque fica com deslocamento 2 até o fim do seu próximo turno." }),
  W("Commando Special Rifle", "commando-special-rifle", { group: "rifles", rangeType: "rifle", damage: "3d10", rateOfFire: "SA", cost: 1250, weight: 3.3, availability: "military", ammo: { value: 25, max: 25 }, img: IMG.rifle, description: "Rifle serrado preferido pelos comandos da República: leve e potente, mas a célula de energia acaba após 25 tiros." }),
  W("Remote Grenade", "remote-grenade", { group: "simple", size: "tiny", rangeType: "thrown", thrown: true, damage: "4d6", area: "Explosão", cost: 300, weight: 1, availability: "military", img: IMG.grenade, description: "Granada programável detonada por um detonador portátil (100 cr), que dispara as granadas lançadas a até 100 m; travas de segurança impedem detonação remota fora desse alcance." }),
  W("Mythosaur Axe", "mythosaur-axe", { group: "simple", size: "large", damage: "1d12", damageType: "slashing", cost: 1000, weight: 10, availability: "restricted", img: IMG.axe, description: "Machado cerimonial feito de ossos calcificados do extinto mitossauro. A versão de Mandalore the Ultimate, numa haste com metais modernos e célula de energia, causa o dobro de dados de dano (2d12)." })
];

export const armor = [
  AR("Neo-Crusader Light Armor", "neo-crusader-light-armor", { category: "light", reflexBonus: 6, fortBonus: 2, maxDex: 3, cost: 0, weight: 42, availability: "military", upgradeSlots: 4, upgrades: ["helmet"], description: "Armadura básica das tropas mandalorianas, com capacete, botas e manoplas; comlink interno e pacote de capacete para quem tem Armor Proficiency (light). Suporte de vida no vácuo por até 10 horas e jet pack embutido. Disponibilidade: Militar, Rara. Quatro espaços de melhoria livres." }),
  AR("Mandalorian Combat Suit", "mandalorian-combat-suit", { category: "light", reflexBonus: 4, fortBonus: 1, maxDex: 5, cost: 0, weight: 8, availability: "rare", upgradeSlots: 5, upgrades: ["helmet"], description: "Traje selado ao vácuo com placas compostas, usado antes dos Neo-Crusaders. Comlink interno e pacote de capacete para quem tem Armor Proficiency (light); suporte de vida por até 10 horas; jet pack embutido. Cinco espaços de melhoria livres." }),
  AR("Mandalorian Neo-Crusader Battle Armor", "neo-crusader-battle-armor", { category: "medium", reflexBonus: 8, fortBonus: 2, maxDex: 2, cost: 0, weight: 18, availability: "rare", upgradeSlots: 6, upgrades: ["helmet"], description: "Versão mais pesada do traje de combate, usada por veteranos. Comlink interno e pacote de capacete com Armor Proficiency (medium); suporte de vida por até 10 horas; jet pack embutido. Seis espaços de melhoria livres." }),
  AR("Mandalorian Neo-Crusader Assault Armor", "neo-crusader-assault-armor", { category: "heavy", reflexBonus: 10, fortBonus: 4, maxDex: 1, cost: 0, weight: 65, availability: "military", upgradeSlots: 6, upgrades: ["helmet"], description: "Armadura dos shock troopers: placas ablativas de energia, capacete com comlink e pacote de capacete (Armor Proficiency heavy), suporte de vida por até 24 horas. O jet pack só voa até 4 quadrados por turno por causa do peso. Correndo, move só 3× o deslocamento. Disponibilidade: Militar, Rara. Seis espaços de melhoria livres." }),
  AR("Republic Light Armor", "republic-light-armor", { category: "light", reflexBonus: 4, fortBonus: 1, maxDex: 3, cost: 0, weight: 7, availability: "military", upgradeSlots: 0, description: "Armadura padrão da República com capacete e botas; o capacete dá comlink a quem tem Armor Proficiency (light). Não pode receber melhorias." }),
  AR("Republic Combat Armor", "republic-combat-armor", { category: "medium", reflexBonus: 6, fortBonus: 2, maxDex: 2, cost: 0, weight: 14, availability: "military", description: "Com capacete, botas e luvas; o capacete dá comlink interno e visão na penumbra a quem tem Armor Proficiency (medium). Pode ser melhorada para suporte de oxigênio e vácuo." }),
  AR("Republic Heavy Armor", "republic-heavy-armor", { category: "heavy", reflexBonus: 8, fortBonus: 3, maxDex: 1, cost: 0, weight: 26, availability: "military", description: "Placas que dissipam energia: −2 no dano de ataques de energia contra o usuário. Com Armor Proficiency (heavy), o capacete dá comlink interno e visão na penumbra; suporte de vida no vácuo por até 24 horas. Correndo, move só 3× o deslocamento." }),
  AR("Fiber Armor", "fiber-armor", { category: "light", reflexBonus: 4, fortBonus: 1, maxDex: 2, cost: 3000, weight: 10, availability: "licensed", description: "1/encontro, lutando defensivamente, reação: RD 10 contra um ataque à distância de energia." }),
  AR("Battle Armor, Light Powered", "battle-armor-light-powered", { category: "light", reflexBonus: 4, fortBonus: 2, maxDex: 3, cost: 6500, weight: 12, availability: "military", upgradeSlots: 2, upgrades: ["helmet"], description: "Motorizada: pacote de capacete e duas melhorias livres (regras do Scum and Villainy)." }),
  AR("Battle Armor, Light", "battle-armor-light", { category: "light", reflexBonus: 5, fortBonus: 2, maxDex: 3, cost: 3500, weight: 10, availability: "military", description: "Versão enxuta da armadura de batalha para soldados com pouco treino em armadura." }),
  AR("Mesh Armor", "mesh-armor", { category: "medium", reflexBonus: 6, fortBonus: 2, maxDex: 2, cost: 6000, weight: 13, availability: "restricted", description: "1/encontro, lutando defensivamente, reação: RD 20 contra um ataque à distância de energia." }),
  AR("Weave Armor", "weave-armor", { category: "medium", reflexBonus: 6, fortBonus: 2, maxDex: 3, cost: 5000, weight: 15, availability: "restricted", description: "Armadura civil flexível, favorita de duelistas e gladiadores." }),
  AR("Battle Armor, Powered", "battle-armor-powered", { category: "medium", reflexBonus: 7, fortBonus: 2, maxDex: 2, cost: 11000, weight: 17, availability: "military", upgradeSlots: 2, upgrades: ["helmet"], description: "Motorizada: pacote de capacete e duas melhorias livres." }),
  AR("Matrix Armor", "matrix-armor", { category: "heavy", reflexBonus: 9, fortBonus: 3, maxDex: 1, cost: 9000, weight: 25, availability: "restricted", description: "Placas de casco de nave: 1/encontro, lutando defensivamente, reação: RD 30 contra um ataque à distância de energia." }),
  AR("Battle Armor, Heavy Powered", "battle-armor-heavy-powered", { category: "heavy", reflexBonus: 9, fortBonus: 4, maxDex: 1, cost: 19000, weight: 32, availability: "military", upgradeSlots: 2, upgrades: ["helmet"], description: "Motorizada: pacote de capacete e duas melhorias livres." })
];

const SHIELD = "Escudo de energia pessoal (acessório de armadura): ação rápida para ativar, 1/encontro, 5 cargas; dura até o fim do encontro e só protege contra dano de energia. Sem a proficiência de armadura correspondente: −5 na Reflexos e sem Destreza. Sempre aplica a penalidade de armadura enquanto ativo.";
export const equipment = [
  EQ("Stunning Gauntlet", "stunning-gauntlet", "accessory", 300, 0.5, "Luva isolada com célula de energia: os ataques desarmados do usuário causam dano de atordoamento e recebem +1 no dano de atordoamento. É duas categorias de tamanho menor que o usuário (200 cr e 0,4 kg na versão Pequena); por ser vestida, não pode ser desarmada nem largada. Arma simples; Restrita.", { availability: "restricted" }),
  EQ("Energy Shield, Light (SR 5)", "energy-shield-light-5", "accessory", 500, 1, `SR 5; Des máx. +4 quando ativo; exige Armor Proficiency (light). ${SHIELD}`, { img: IMG.shield }),
  EQ("Energy Shield, Light (SR 10)", "energy-shield-light-10", "accessory", 2000, 1, `SR 10; Des máx. +4 quando ativo; exige Armor Proficiency (light). ${SHIELD}`, { img: IMG.shield }),
  EQ("Energy Shield, Medium (SR 15)", "energy-shield-medium-15", "accessory", 4500, 1, `SR 15; Des máx. +3 quando ativo; exige Armor Proficiency (medium). ${SHIELD}`, { img: IMG.shield }),
  EQ("Energy Shield, Medium (SR 20)", "energy-shield-medium-20", "accessory", 8000, 1, `SR 20; Des máx. +3; exige Armor Proficiency (medium). ${SHIELD}`, { img: IMG.shield }),
  EQ("Energy Shield, Heavy (SR 25)", "energy-shield-heavy-25", "accessory", 12500, 1, `SR 25; Des máx. +2; exige Armor Proficiency (heavy). ${SHIELD}`, { img: IMG.shield }),
  EQ("Energy Shield, Heavy (SR 30)", "energy-shield-heavy-30", "accessory", 18000, 1, `SR 30; Des máx. +2; exige Armor Proficiency (heavy). ${SHIELD}`, { img: IMG.shield }),
  EQ("Computer Interface Visor", "computer-interface-visor", "computer", 1200, 0.5, "Usa aplicações só-treinado de Use Computer sem treino e +2 de equipamento em Use Computer. Não combina com capacete.", { modifiers: [mod("skills.useComputer", 2)] }),
  EQ("Aural Amplifier", "aural-amplifier", "detection", 2000, 0.5, "+5 de equipamento em Perception para escutar. Não combina com capacete."),
  EQ("Demolitions Sensor", "demolitions-sensor", "detection", 1000, 0.5, "+5 de equipamento em Perception para achar minas e explosivos. Não combina com capacete."),
  EQ("Motion Sensing Visor", "motion-sensing-visor", "detection", 2500, 0.5, "+5 de equipamento em Perception contra alvos que se moveram 1+ quadrado desde o seu último turno; recuperar na trilha exige 2 ações rápidas extras. Não combina com capacete."),
  EQ("Neural Band", "neural-band", "detection", 3500, 0.5, "+2 de equipamento na Vontade e −2 no Limiar. Não combina com capacete."),
  EQ("Stealth Field Generator", "stealth-field-generator", "detection", 5000, 0.2, "Ação rápida: camuflagem (não total) até o fim do encontro ou até atacar ou usar poder da Força. Power pack: 5 usos."),
  EQ("Vacuum Mask", "vacuum-mask", "lifeSupport", 650, 0.3, "10 minutos de ar respirável, ativados automaticamente na perda de atmosfera. Não combina com capacete."),
  EQ("Medical Interface Visor", "medical-interface-visor", "medical", 1500, 0.5, "Usa aplicações só-treinado de Treat Injury sem treino e +2 de equipamento em Treat Injury. Não combina com capacete.", { modifiers: [mod("skills.treatInjury", 2)] }),
  EQ("Mechanical Interface Visor", "mechanical-interface-visor", "tools", 1250, 0.5, "Usa aplicações só-treinado de Mechanics sem treino e +2 de equipamento em Mechanics. Não combina com capacete.", { modifiers: [mod("skills.mechanics", 2)] }),
  // Implantes (cibernéticos)
  ...[
    ["Bio-Stabilizer Implant", "bio-stabilizer-implant", 1750, "Imune a venenos."],
    ["Cardio Implant", "cardio-implant", 4000, "+1 PV por nível.", [mod("hp.max", "@level")]],
    ["Combat Implant", "combat-implant", 5000, "Sem penalidade de ataque por não proficiência em armas."],
    ["Memory Implant", "memory-implant", 2000, "Rerrola testes de Knowledge, ficando com o melhor."],
    ["Nerve Reinforcement Implant", "nerve-reinforcement-implant", 5000, "+5 de equipamento no Limiar contra dano de atordoamento."],
    ["Regenerative Implant", "regenerative-implant", 4250, "Recupera o dobro de PV na cura natural."],
    ["Sensory Implant", "sensory-implant", 2500, "Visão na penumbra (ou darkvision, se já tiver visão na penumbra)."]
  ].map(([n, k, c, d, m]) => EQ(n, k, "cybernetic", c, 0, `${d} Implante cerebral: só um por vez; instalado por cirurgia (Cybernetic Surgery). Conta como peça cibernética (vulnerável a íons, penalidade em Use the Force). Sem o feat Implant Training: −2 na Vontade e desce um passo extra na trilha quando descer.`, { img: IMG.implant, modifiers: m ?? [] })),
  // Acessórios de armas e armaduras (Tabela 5-6; slots do Scum and Villainy)
  ...[
    ["Armor Reinforcement", "armor-reinforcement", 3000, 1, "Armadura: RD 2 contra dano perfurante."],
    ["Beam Splitter", "beam-splitter", 1200, 2, "Armas à distância de energia: 1/encontro, com Power Blast, +2 de dano por ponto subtraído do ataque (em vez de +1)."],
    ["Durasteel Bonding", "durasteel-bonding", 2000, 2, "Armas corpo a corpo cortantes: RD da arma +5 e +1 dado de dano no crítico (após multiplicar)."],
    ["Enhanced Energy Projector", "enhanced-energy-projector", 3000, 1, "Arma corpo a corpo energizada: 1/encontro, rerrola um 1 natural no ataque."],
    ["Hair Trigger", "hair-trigger", 1200, 1, "Armas à distância de gatilho: 1/encontro, com Rapid Shot, rerrola o dano ficando com o melhor."],
    ["Improved Energy Cell", "improved-energy-cell", 4000, 2, "Armas com power pack: dobra o número de tiros; com a modificação de dano do Tech Specialist, o bônus sobe para +3."],
    ["Mesh Underlay", "mesh-underlay", 2500, 2, "Armadura: +5 de equipamento no Limiar contra atordoamento."],
    ["Tremor Cell", "tremor-cell", 1000, 1, "Arma corpo a corpo energizada (até Média): ação rápida para modo de atordoamento igual ao dano normal."]
  ].map(([n, k, c, s, d]) => EQ(n, k, "accessory", c, 0, `${d} Custo em slots de melhoria: ${s}.`))
];

/* Modelos de equipamento (gear templates): itens de referência para o Mestre aplicar a armas e armaduras */
const TPL = (name, key, desc) => EQ(`Modelo: ${name}`, `gear-template-${key}`, "gearTemplate", 0, 0, `${desc}<br><em>Modelo de equipamento (KotOR): aplique à arma/armadura editando o item. Só um modelo por item, exceto Prototype, Quick-Draw e Cortosis Weave/Phrik.</em>`, { img: IMG.tpl, availability: "rare" });
export const templates = [
  TPL("Arkanian Manufacture", "arkanian", "Armas causam dano de energia e fogo; armaduras dobram o bônus de equipamento na Fortitude contra frio (sem bônus contra calor). Armas que usam feats de tiros múltiplos superaquecem por uma rodada. +10% ou 1.000 cr. Só armaduras ou armas à distância de energia."),
  TPL("Cinnagaran Manufacture", "cinnagaran", "Armaduras e escudos: RD 5 contra sônico, Des máx. −1. Armas: dano de energia e concussão. +10% ou 1.000 cr. Só armaduras ou armas à distância de energia."),
  TPL("Cortosis Weave / Phrik Alloy", "cortosis", "Sabres de luz não ignoram a RD da arma ou armadura. +20%."),
  TPL("Echani Manufacture", "echani", "Armadura pesa metade; 1/encontro, move no deslocamento normal por uma rodada (Reflexos da armadura −1). Arma: 1/encontro, margem de crítico +1 (19-20) declarada após a jogada; a arma tem metade dos PV. +10% ou 1.000 cr. Só armaduras ou armas cortantes/perfurantes (não sabres)."),
  TPL("GenoHaradan Manufacture", "genoharadan", "Armadura: +2 de equipamento em Stealth para se esgueirar, bônus de Fortitude −1. Arma: +2 de equipamento no ataque do veneno de contato (corpo a corpo) ou +1 nos ataques no modo atordoar; 1 natural a desativa. +10% ou 1.000 cr."),
  TPL("Iridonian Manufacture", "iridonian", "Armaduras e escudos: RD 2 contra concussão. Armas: +2 de equipamento no dano com Power Attack ou Power Blast. Ilegal (circunstância desfavorável com autoridades). +10% ou 1.000 cr."),
  TPL("Krath Manufacture", "krath", "Armaduras e escudos: RD 2 contra energia. Armas: se o ataque também superar a Fortitude, 1d4 no início do turno seguinte do alvo. Portadores contam com Dark Side Score +1 para efeitos. Não em sabres. +10% ou 1.000 cr."),
  TPL("Mandalorian Manufacture", "mandalorian", "+5 de equipamento em Mechanics para reparar ou modificar; modificações se perdem se o item for desativado. +10% ou 1.000 cr."),
  TPL("Massassi Manufacture", "massassi", "Armadura: 1/encontro, reação, um crítico contra o usuário vira acerto normal (exige For 13/15/17 para leve/média/pesada). Arma simples de duas mãos: no crítico, triplica o bônus de Força (exige For 15/17/19). +10% ou 1.000 cr."),
  TPL("Prototype", "prototype", "Recebe duas modificações do Tech Specialist (Starships of the Galaxy). Arma: 1-4 naturais são falha automática e a desativam até reparo. Armadura: o usuário sofre +1 dado no dano de críticos."),
  TPL("Verpine Manufacture", "verpine", "Armaduras e escudos: RD 10 contra íons. Arma de energia: ação rápida para disparar íons. Exige Des 13 (armadura) ou Int 13 (arma), senão penalidades. +10% ou 1.000 cr."),
  TPL("Baragwin Weapon", "baragwin", "Arma: +1 dado de dano no crítico (após multiplicar). Ilegal. +10% ou 1.000 cr."),
  TPL("Bothan Weapon", "bothan", "Arma de atordoamento ou íons: +1 dado no modo atordoar ou com dano iônico; −1 dado com dano normal. +10% ou 1.000 cr."),
  TPL("Dashade Weapon", "dashade", "Alvo descido na trilha só usa 2 ações rápidas por turno para se recuperar até voltar ao normal; −2 no dano. Ilegal. +10% ou 1.000 cr."),
  TPL("Gand Weapon", "gand", "Arma de atordoamento: alvo descido tem deslocamento à metade até se recuperar; em −4 passos (em vez de −10) fica imobilizado. Arma exótica (exceto para Gand). +10% ou 1.000 cr."),
  TPL("Quick Draw Weapon", "quick-draw", "Com o feat Quick Draw, saca ou guarda a arma 1/rodada como ação livre. +10%."),
  TPL("Rakatan Weapon", "rakatan", "Dados de dano um passo maiores (d4→d6... máx. d12) e +1 de equipamento no ataque. Arma exótica (exceto para Rakata). +30% ou 3.000 cr."),
  TPL("Sith Alchemical Weapon", "sith-alchemical", "Sabres não ignoram a RD; proficientes a tratam como sabre para Block, Deflect e Redirect Shot. Ação rápida e Ponto da Força: soma o Dark Side Score ao dano do próximo ataque no encontro e ganha 1 Dark Side. +20% ou 2.000 cr. Só armas corpo a corpo avançadas e simples."),
  TPL("Bonadan-Alloy Armor", "bonadan", "RD 2 contra dano cortante; bônus de Fortitude −1. +10% ou 1.000 cr."),
  TPL("Bronzium Cast Armor", "bronzium", "1/encontro, redireciona o dano de um ataque para a armadura (RD, PV e Limiar de arma do mesmo tamanho); destruída, perde todos os bônus; condição da armadura vale só na Reflexos. +10% ou 1.000 cr."),
  TPL("Durasteel Cast Armor", "durasteel-cast", "RD 1; bônus de Fortitude −1. +10% ou 1.000 cr."),
  TPL("Environmental Bastion Armor", "environmental-bastion", "Traje selado com horas de ar iguais ao bônus de Fortitude da armadura. +10%."),
  TPL("Eriadun Armor", "eriadun", "RD 5 contra atordoamento; bônus de Fortitude −1. +10% ou 1.000 cr.")
];
