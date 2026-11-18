// Armas (Tabelas 8-3/8-4/8-6), armaduras (8-7) e equipamentos (8-8). Erratas aplicadas
// (armas precisas/imprecisas; stun = "sim" com dano igual ao normal; familiaridades).
const W = (name, key, o) => ({
  name, type: "weapon", img: o.img ?? "icons/weapons/guns/gun-pistol-flintlock-white.webp",
  system: {
    key, group: "simple", size: "medium", rangeType: "melee", damage: "1d4", damage2: "", damageType: "energy",
    stun: false, stunDamage: "", ion: false, rateOfFire: "S", area: "", accurate: false, inaccurate: false, thrown: false,
    reach: false, double: false, strDamage: false, noStrDamage: false, ignoresDR: false, attackBonus: 0, damageBonus: 0,
    critRange: 20, critMultiplier: 2, ammo: { value: 0, max: 0 }, special: "", cost: 0, weight: 0, quantity: 1,
    availability: "", equipped: false, modifiers: [], ...o, description: o.description ? `<p>${o.description}</p>` : ""
  }
});
const AR = (name, key, o) => ({
  name, type: "armor", img: o.img ?? "icons/equipment/chest/breastplate-banded-steel.webp",
  system: { key, category: "light", reflexBonus: 0, fortBonus: 0, maxDex: 5, special: "", cost: 0, weight: 0, quantity: 1, availability: "", equipped: false, modifiers: [], ...o, description: o.description ? `<p>${o.description}</p>` : "" }
});
const EQ = (name, key, category, cost, weight, description = "", o = {}) => ({
  name, type: "equipment", img: o.img ?? "icons/containers/bags/pack-leather-brown.webp",
  system: { key, category, cost, weight, quantity: 1, availability: o.availability ?? "", equipped: false, special: "", modifiers: o.modifiers ?? [], description: description ? `<p>${description}</p>` : "" }
});
const IMG = {
  blade: "icons/weapons/swords/sword-guard-blue.webp",
  dagger: "icons/weapons/daggers/dagger-straight-blue.webp",
  staff: "icons/weapons/staves/staff-simple-carved.webp",
  club: "icons/weapons/clubs/club-simple-barbed-brown.webp",
  mace: "icons/weapons/maces/mace-round-steel.webp",
  spear: "icons/weapons/polearms/spear-simple-engraved.webp",
  axe: "icons/weapons/axes/axe-broad-black.webp",
  saber: "icons/weapons/swords/sword-runed-glowing.webp",
  fist: "icons/skills/melee/unarmed-punch-fist.webp",
  pistol: "icons/weapons/guns/gun-pistol-flintlock-white.webp",
  rifle: "icons/weapons/guns/rifle-brown.webp",
  heavy: "icons/weapons/guns/gun-blunderbuss-gold.webp",
  grenade: "icons/weapons/thrown/bomb-fuse-black-pink.webp",
  bow: "icons/weapons/bows/shortbow-recurve.webp",
  sling: "icons/weapons/slings/slingshot-wood.webp",
  net: "icons/tools/fishing/net-gold.webp",
  flame: "icons/magic/fire/beam-jet-stream-embers.webp",
  explosive: "icons/weapons/thrown/grenade-round.webp"
};

export const weapons = [
  // Desarmado
  W("Unarmed", "unarmed", { group: "simple", size: "small", damage: "1d4", damageType: "bludgeoning", img: IMG.fist, description: "Ataque desarmado (todos são proficientes). Dano 1d4 para Médio, 1d3 para Pequeno; aumenta com Martial Arts. Considerada arma leve." }),
  W("Combat Gloves", "combat-gloves", { group: "simple", size: "tiny", damage: "1d4", damageBonus: 1, damageType: "bludgeoning", cost: 250, weight: 0.5, img: IMG.fist, description: "+1 de dano em ataques desarmados; não podem ser desarmadas. (Use no lugar do Unarmed.)" }),
  // Simples corpo a corpo
  W("Knife", "knife", { group: "simple", size: "tiny", damage: "1d4", damageType: "slashing", thrown: true, cost: 25, weight: 1, img: IMG.dagger, description: "Pode ser arremessada." }),
  W("Club/Baton", "club", { group: "simple", size: "small", damage: "1d6", damageType: "bludgeoning", cost: 15, weight: 0.5, img: IMG.club }),
  W("Stun Baton", "stun-baton", { group: "simple", size: "small", damage: "1d6", damageType: "bludgeoning", stun: true, stunDamage: "2d6", cost: 15, weight: 0.5, img: IMG.club, description: "Pode ser ativado para causar 2d6 de dano de atordoamento. Requer célula de energia." }),
  W("Mace", "mace", { group: "simple", size: "medium", damage: "1d8", damageType: "bludgeoning", cost: 50, weight: 2.5, img: IMG.mace }),
  W("Spear", "spear", { group: "simple", size: "medium", damage: "1d8", damageType: "piercing", thrown: true, cost: 60, weight: 1.5, img: IMG.spear, description: "Pode ser arremessada." }),
  W("Bayonet", "bayonet", { group: "simple", size: "medium", damage: "1d8", damageType: "piercing", cost: 50, weight: 1, availability: "licensed", img: IMG.dagger, description: "Montada num rifle, permite usá-lo como lança (duas mãos)." }),
  W("Quarterstaff", "quarterstaff", { group: "simple", size: "large", damage: "1d6", damage2: "1d6", double: true, damageType: "bludgeoning", cost: 65, weight: 1.8, img: IMG.staff, description: "Arma dupla: atacar com as duas pontas (rodada completa) impõe −10 a ambos os ataques." }),
  // Corpo a corpo avançadas
  W("Vibrodagger", "vibrodagger", { group: "advancedMelee", size: "tiny", damage: "2d4", damageType: "slashing", thrown: true, cost: 200, weight: 1, img: IMG.dagger, description: "Requer célula de energia. Pode ser arremessada." }),
  W("Vibroblade", "vibroblade", { group: "advancedMelee", size: "small", damage: "2d6", damageType: "slashing", cost: 250, weight: 1.8, availability: "licensed", img: IMG.blade, description: "Requer célula de energia." }),
  W("Vibrobayonet", "vibrobayonet", { group: "advancedMelee", size: "medium", damage: "2d6", damageType: "piercing", cost: 350, weight: 1, availability: "licensed", img: IMG.dagger }),
  W("Force Pike", "force-pike", { group: "advancedMelee", size: "medium", damage: "2d8", damageType: "piercing", stun: true, cost: 500, weight: 2, availability: "restricted", img: IMG.spear, description: "Dano perfurante e de energia; pode ser ajustada para atordoar. Requer duas células de energia." }),
  W("Electrostaff", "electrostaff", { group: "advancedMelee", size: "large", damage: "2d6", damage2: "2d6", double: true, stun: true, damageType: "bludgeoning", cost: 3000, weight: 2, availability: "restricted", img: IMG.staff, description: "Arma dupla; o bastão tem RD 20 inclusive contra sabres." }),
  W("Vibro-ax", "vibro-ax", { group: "advancedMelee", size: "large", damage: "2d10", damageType: "slashing", cost: 500, weight: 6, availability: "restricted", img: IMG.axe }),
  // Exóticas corpo a corpo
  W("Atlatl", "atlatl", { group: "exotic", size: "medium", damage: "2d4", damageType: "bludgeoning", cost: 50, weight: 1.5, availability: "rare", img: IMG.staff, description: "Arma gungan; arremessa bolas de energia. Gungans a tratam como arma simples (errata)." }),
  W("Amphistaff", "amphistaff", { group: "exotic", size: "large", damage: "1d6", damage2: "1d6", double: true, damageType: "bludgeoning", weight: 2, availability: "rare", img: IMG.staff, description: "Criatura-arma Yuuzhan Vong: bastão, lança venenosa ou chicote (alcance 2, 1d4). Pode cuspir veneno 1/24 h." }),
  W("Cesta", "cesta", { group: "exotic", size: "large", damage: "2d4", damageType: "bludgeoning", reach: true, cost: 100, weight: 1.8, availability: "rare", img: IMG.staff, description: "Arma gungan de alcance; arremessa bolas de energia. Gungans a tratam como arma simples (errata)." }),
  // Sabres de luz
  W("Lightsaber, Short", "lightsaber-short", { group: "lightsabers", size: "small", damage: "2d6", damageType: "energy", ignoresDR: true, cost: 2500, weight: 0.5, availability: "rare", img: IMG.saber, description: "Ignora redução de dano. Requer célula especial." }),
  W("Lightsaber", "lightsaber", { group: "lightsabers", size: "medium", damage: "2d8", damageType: "energy", ignoresDR: true, cost: 3000, weight: 1, availability: "rare", img: IMG.saber, description: "A arma tradicional dos Jedi. Ignora redução de dano (escudos ainda reduzem)." }),
  W("Lightsaber, Double-Bladed", "lightsaber-double", { group: "lightsabers", size: "large", damage: "2d8", damage2: "2d8", double: true, damageType: "energy", ignoresDR: true, cost: 7000, weight: 2, availability: "rare", img: IMG.saber, description: "Arma dupla: atacar com ambas as lâminas impõe −10 (reduzido por Dual Weapon Mastery)." }),
  // Pistolas
  W("Blaster Pistol, Hold-Out", "hold-out-blaster", { group: "pistols", size: "tiny", rangeType: "pistol", damage: "3d4", inaccurate: true, cost: 300, weight: 0.5, availability: "illegal", ammo: { value: 6, max: 6 }, description: "+5 de equipamento em Stealth para ocultá-la. 6 tiros por célula." }),
  W("Blaster Pistol", "blaster-pistol", { group: "pistols", size: "small", rangeType: "pistol", damage: "3d6", stun: true, cost: 500, weight: 1, availability: "restricted", ammo: { value: 100, max: 100 }, description: "O blaster mais comum da galáxia. 100 tiros por pacote." }),
  W("Blaster Pistol, Sporting", "sporting-blaster-pistol", { group: "pistols", size: "small", rangeType: "pistol", damage: "3d4", stun: true, accurate: true, cost: 300, weight: 1, availability: "licensed", ammo: { value: 6, max: 6 }, description: "Precisa. 6 tiros por célula (100 com pacote)." }),
  W("Ion Pistol", "ion-pistol", { group: "pistols", size: "small", rangeType: "pistol", damage: "3d6", ion: true, damageType: "ion", cost: 250, weight: 1, availability: "licensed", ammo: { value: 30, max: 30 }, description: "Dano iônico: efetivo contra droides, veículos e eletrônicos." }),
  W("Slugthrower Pistol", "slugthrower-pistol", { group: "pistols", size: "small", rangeType: "pistol", damage: "2d6", damageType: "piercing", cost: 250, weight: 1.4, availability: "licensed", ammo: { value: 10, max: 10 }, img: IMG.pistol }),
  W("Blaster Pistol, Heavy", "heavy-blaster-pistol", { group: "pistols", size: "medium", rangeType: "pistol", damage: "3d8", stun: true, inaccurate: true, cost: 750, weight: 1.3, availability: "military", ammo: { value: 50, max: 50 } }),
  // Rifles
  W("Blaster Carbine", "blaster-carbine", { group: "rifles", size: "medium", rangeType: "rifle", damage: "3d8", stun: true, rateOfFire: "S, A", inaccurate: true, cost: 900, weight: 2.2, availability: "restricted", ammo: { value: 50, max: 50 }, img: IMG.rifle, description: "Coronha retrátil: dobrada funciona como pistola." }),
  W("Blaster Rifle", "blaster-rifle", { group: "rifles", size: "medium", rangeType: "rifle", damage: "3d8", stun: true, rateOfFire: "S, A", cost: 1000, weight: 4.5, availability: "restricted", ammo: { value: 50, max: 50 }, img: IMG.rifle }),
  W("Blaster Rifle, Sporting", "sporting-blaster-rifle", { group: "rifles", size: "medium", rangeType: "rifle", damage: "3d6", stun: true, accurate: true, cost: 800, weight: 4, availability: "licensed", ammo: { value: 100, max: 100 }, img: IMG.rifle }),
  W("Ion Rifle", "ion-rifle", { group: "rifles", size: "medium", rangeType: "rifle", damage: "3d8", ion: true, damageType: "ion", cost: 800, weight: 3.1, availability: "restricted", ammo: { value: 20, max: 20 }, img: IMG.rifle }),
  W("Slugthrower Rifle", "slugthrower-rifle", { group: "rifles", size: "medium", rangeType: "rifle", damage: "2d8", damageType: "piercing", rateOfFire: "S, A", cost: 300, weight: 4, availability: "restricted", ammo: { value: 20, max: 20 }, img: IMG.rifle }),
  W("Blaster, Light Repeating", "light-repeating-blaster", { group: "rifles", size: "large", rangeType: "rifle", damage: "3d8", rateOfFire: "A", cost: 1200, weight: 6, availability: "military", ammo: { value: 30, max: 30 }, img: IMG.rifle, description: "Somente fogo automático." }),
  W("Blaster Rifle, Heavy", "heavy-blaster-rifle", { group: "rifles", size: "large", rangeType: "rifle", damage: "3d10", stun: true, rateOfFire: "S, A", inaccurate: true, cost: 2000, weight: 6, availability: "military", ammo: { value: 30, max: 30 }, img: IMG.rifle }),
  // Exóticas à distância
  W("Bowcaster", "bowcaster", { group: "exotic", size: "large", rangeType: "rifle", damage: "3d10", damageType: "energy", accurate: true, cost: 1500, weight: 8, availability: "rare", img: IMG.bow, description: "Wookiees a tratam como rifle (errata). Usa alcance de rifle." }),
  W("Flamethrower", "flamethrower", { group: "exotic", size: "medium", rangeType: "pistol", damage: "3d6", damageType: "fire", area: "Cone 6", noStrDamage: true, cost: 1000, weight: 7, availability: "military", ammo: { value: 5, max: 5 }, img: IMG.flame, description: "Cone de 6 quadrados: um ataque contra a Reflexos de todos; metade do dano em quem errar. Recarregar: rodada completa." }),
  // Pesadas
  W("Grenade Launcher", "grenade-launcher", { group: "heavy", size: "medium", rangeType: "heavy", damage: "4d6", damageType: "slashing", area: "Raio 2", inaccurate: true, cost: 500, weight: 5, availability: "military", ammo: { value: 4, max: 4 }, img: IMG.heavy, description: "Dano/tipo conforme a granada (padrão: frag 4d6). 4 granadas; recarga em rodada completa." }),
  W("Blaster, Heavy Repeating", "heavy-repeating-blaster", { group: "heavy", size: "large", rangeType: "heavy", damage: "3d10", rateOfFire: "A", cost: 4000, weight: 12, availability: "military", ammo: { value: 20, max: 20 }, img: IMG.heavy, description: "Somente fogo automático. Sem tripé não pode ser apoiado." }),
  W("Blaster Cannon", "blaster-cannon", { group: "heavy", size: "large", rangeType: "heavy", damage: "3d12", inaccurate: true, cost: 3000, weight: 18, availability: "military", ammo: { value: 10, max: 10 }, img: IMG.heavy, description: "Ataque em área: dano total no alvo se acertar (metade se errar); adjacentes sofrem metade se acertar." }),
  W("Missile Launcher", "missile-launcher", { group: "heavy", size: "large", rangeType: "heavy", damage: "6d6", damageType: "slashing", area: "Raio 2", cost: 1500, weight: 10, availability: "military", ammo: { value: 4, max: 4 }, img: IMG.heavy, description: "Área de raio 2: metade do dano se errar." }),
  W("Blaster, E-Web Repeating", "e-web", { group: "heavy", size: "huge", rangeType: "heavy", damage: "3d12", rateOfFire: "A", cost: 8000, weight: 38, availability: "military", img: IMG.heavy, description: "Somente automático; no tripé conta como Grande. Requer gerador e um segundo operador (senão −2 nos ataques)." }),
  // Simples à distância / arremessadas
  W("Energy Ball", "energy-ball", { group: "simple", size: "tiny", rangeType: "thrown", damage: "2d8", thrown: true, noStrDamage: true, cost: 20, weight: 0.25, availability: "licensed", img: IMG.grenade, description: "Arremessada à mão, ou com atlatl (alcance simples) ou cesta (simples, precisa)." }),
  W("Grenade, Frag", "frag-grenade", { group: "simple", size: "tiny", rangeType: "thrown", damage: "4d6", damageType: "slashing", area: "Raio 2", thrown: true, noStrDamage: true, cost: 200, weight: 0.5, availability: "military", img: IMG.grenade, description: "Explosão de raio 2: metade do dano em quem errar." }),
  W("Grenade, Ion", "ion-grenade", { group: "simple", size: "tiny", rangeType: "thrown", damage: "4d6", ion: true, damageType: "ion", area: "Raio 2", thrown: true, noStrDamage: true, cost: 250, weight: 0.5, availability: "restricted", img: IMG.grenade }),
  W("Grenade, Stun", "stun-grenade", { group: "simple", size: "tiny", rangeType: "thrown", damage: "4d6", stun: true, area: "Raio 2", thrown: true, noStrDamage: true, cost: 250, weight: 0.5, availability: "restricted", img: IMG.grenade, description: "Apenas dano de atordoamento (marque Atordoar). Droides são imunes." }),
  W("Thermal Detonator", "thermal-detonator", { group: "simple", size: "tiny", rangeType: "thrown", damage: "8d6", area: "Raio 4", thrown: true, noStrDamage: true, inaccurate: true, cost: 2000, weight: 1, availability: "illegal", img: IMG.grenade, description: "Explosão de raio 4: metade do dano em quem errar." }),
  W("Sling", "sling", { group: "simple", size: "small", rangeType: "simple", damage: "1d4", damageType: "bludgeoning", strDamage: true, cost: 35, weight: 0.3, img: IMG.sling, description: "Soma Força ao dano." }),
  W("Bow", "bow", { group: "simple", size: "medium", rangeType: "simple", damage: "1d6", damageType: "piercing", strDamage: true, cost: 300, weight: 1.4, img: IMG.bow, description: "Soma Força ao dano. Aljava com 10 flechas: 20 cr." }),
  W("Net", "net", { group: "simple", size: "large", rangeType: "thrown", damage: "0", inaccurate: true, noStrDamage: true, cost: 25, weight: 4.5, img: IMG.net, description: "Permite agarrar à distância. Escapar: Acrobatics CD 15 ou Força CD 20." }),
  // Explosivos
  W("Explosive Charge", "explosive-charge", { group: "simple", size: "tiny", rangeType: "thrown", damage: "10d6", area: "Raio 1", noStrDamage: true, cost: 1500, weight: 0.5, availability: "restricted", img: IMG.explosive, description: "Colocada com Mechanics; ignora RD do objeto ao qual for fixada." }),
  W("Detonite", "detonite", { group: "simple", size: "tiny", rangeType: "thrown", damage: "5d6", area: "Raio 1", noStrDamage: true, cost: 500, weight: 0.1, availability: "restricted", img: IMG.explosive, description: "Explosivo de contato moldável; requer timer." })
];

export const armor = [
  AR("Blast Helmet and Vest", "blast-helmet-vest", { category: "light", reflexBonus: 2, fortBonus: 0, maxDex: 5, cost: 500, weight: 3 }),
  AR("Flight Suit, Padded", "flight-suit-padded", { category: "light", reflexBonus: 3, fortBonus: 1, maxDex: 4, cost: 2000, weight: 5, description: "Protege contra descompressão; 10 horas de suporte de vida." }),
  AR("Combat Jumpsuit", "combat-jumpsuit", { category: "light", reflexBonus: 4, fortBonus: 0, maxDex: 4, cost: 1500, weight: 8, availability: "licensed" }),
  AR("Flight Suit, Armored", "flight-suit-armored", { category: "light", reflexBonus: 5, fortBonus: 2, maxDex: 3, cost: 4000, weight: 10, availability: "licensed", description: "Sobrevive por tempo limitado no vácuo." }),
  AR("Vonduun Crabshell", "vonduun-crabshell", { category: "light", reflexBonus: 5, fortBonus: 5, maxDex: 4, cost: 0, weight: 5, availability: "rare", description: "Armadura viva Yuuzhan Vong." }),
  AR("Stormtrooper Armor", "stormtrooper-armor", { category: "light", reflexBonus: 6, fortBonus: 2, maxDex: 3, cost: 8000, weight: 10, availability: "military", modifiers: [{ target: "skills.perception", value: "2", type: "equipment", label: "", disabled: false }], description: "Com proficiência: +2 de equipamento em Perception e visão na penumbra; comlink integrado." }),
  AR("Ceremonial Armor", "ceremonial-armor", { category: "medium", reflexBonus: 7, fortBonus: 0, maxDex: 2, cost: 5000, weight: 13, availability: "restricted" }),
  AR("Corellian Powersuit", "corellian-powersuit", { category: "medium", reflexBonus: 7, fortBonus: 0, maxDex: 3, cost: 10000, weight: 20, availability: "restricted", description: "+2 de equipamento em Força se proficiente com armadura média." }),
  AR("Battle Armor", "battle-armor", { category: "medium", reflexBonus: 8, fortBonus: 2, maxDex: 2, cost: 7000, weight: 16, availability: "military" }),
  AR("Armored Spacesuit", "armored-spacesuit", { category: "heavy", reflexBonus: 9, fortBonus: 3, maxDex: 1, cost: 12000, weight: 35, availability: "restricted", description: "Suporte de vida por 24 horas." }),
  AR("Battle Armor, Heavy", "heavy-battle-armor", { category: "heavy", reflexBonus: 10, fortBonus: 4, maxDex: 1, cost: 15000, weight: 30, availability: "military" })
];

export const equipment = [
  EQ("Comlink, Short-Range", "comlink-short", "communication", 25, 0.1, "Alcance de 50 km ou órbita baixa."),
  EQ("Comlink, Long-Range", "comlink-long", "communication", 250, 1, "Alcance de 200 km ou órbita alta."),
  EQ("Pocket Scrambler", "pocket-scrambler", "communication", 400, 0.5, "Codifica transmissões; decifrar exige Use Computer CD 30."),
  EQ("Vox-Box", "vox-box", "communication", 200, 0.1, "Reproduz 12 frases pré-gravadas em Basic."),
  EQ("Code Cylinder", "code-cylinder", "computer", 500, 0.1, "Credencial de acesso a sistemas restritos."),
  EQ("Credit Chip", "credit-chip", "computer", 100, 0.1, "Guarda créditos de uma conta."),
  EQ("Datacards, Blank (10)", "datacards", "computer", 10, 0.1),
  EQ("Datapad", "datapad", "computer", 1000, 0.5),
  EQ("Datapad, Basic", "datapad-basic", "computer", 100, 0.3),
  EQ("Holoprojector, Personal", "holoprojector", "computer", 1000, 0.5),
  EQ("Portable Computer", "portable-computer", "computer", 5000, 2),
  EQ("Electrobinoculars", "electrobinoculars", "detection", 1000, 1, "Visão ampliada a longas distâncias."),
  EQ("Glow Rod", "glow-rod", "detection", 10, 1),
  EQ("Fusion Lantern", "fusion-lantern", "detection", 25, 2),
  EQ("Audiorecorder", "audiorecorder", "detection", 25, 0.1),
  EQ("Holorecorder", "holorecorder", "detection", 100, 0.1),
  EQ("Videorecorder", "videorecorder", "detection", 50, 0.1),
  EQ("Sensor Pack", "sensor-pack", "detection", 1500, 9),
  EQ("Aquata Breather", "aquata-breather", "lifeSupport", 350, 0.2, "Respiração subaquática por tempo limitado."),
  EQ("Breath Mask", "breath-mask", "lifeSupport", 200, 2),
  EQ("Atmosphere Canister/Filter", "atmosphere-canister", "lifeSupport", 25, 1),
  EQ("Flight Suit", "flight-suit", "lifeSupport", 1000, 3),
  EQ("Space Suit", "space-suit", "lifeSupport", 2000, 15),
  EQ("Bacta Tank (Empty)", "bacta-tank", "medical", 100000, 500, "Requer 300 litros de bacta."),
  EQ("Bacta, 1 Liter", "bacta", "medical", 100, 2),
  EQ("Cybernetic Prosthesis", "cybernetic-prosthesis", "medical", 1500, 0, "Não inclui a cirurgia (500 cr)."),
  EQ("Medical Kit", "medical-kit", "medical", 600, 20, "Necessário para usos avançados de Treat Injury."),
  EQ("Medpac", "medpac", "medical", 100, 1, "Uso único: primeiros socorros (+2 de equipamento em Treat Injury)."),
  EQ("Surgery Kit", "surgery-kit", "medical", 1000, 10),
  EQ("All-Temperature Cloak", "all-temp-cloak", "survival", 100, 1.5),
  EQ("Chain (3 meters)", "chain", "survival", 25, 2.5),
  EQ("Field Kit", "field-kit", "survival", 1000, 10),
  EQ("Jet Pack", "jet-pack", "survival", 300, 30),
  EQ("Liquid Cable Dispenser (15 m)", "liquid-cable", "survival", 10, 0.2),
  EQ("Ration Pack", "ration-pack", "survival", 5, 0.1),
  EQ("Syntherope (45 m)", "syntherope", "survival", 20, 2.5),
  EQ("Binder Cuffs", "binder-cuffs", "tools", 50, 0.5),
  EQ("Energy Cell", "energy-cell", "tools", 10, 0),
  EQ("Fire Extinguisher", "fire-extinguisher", "tools", 50, 3),
  EQ("Mesh Tape", "mesh-tape", "tools", 5, 0.5),
  EQ("Power Generator", "power-generator", "tools", 750, 15),
  EQ("Power Pack", "power-pack", "tools", 25, 0.1),
  EQ("Power Recharger", "power-recharger", "tools", 100, 1),
  EQ("Security Kit", "security-kit", "tools", 750, 1),
  EQ("Tool Kit", "tool-kit", "tools", 250, 1),
  EQ("Utility Belt", "utility-belt", "tools", 500, 4),
  EQ("Bandolier", "bandolier", "accessory", 100, 2),
  EQ("Helmet Package", "helmet-package", "accessory", 4000, 1),
  EQ("Holster, Concealed", "holster-concealed", "accessory", 50, 0.2),
  EQ("Holster, Hip", "holster-hip", "accessory", 25, 0.5),
  EQ("Targeting Scope, Standard", "scope-standard", "accessory", 100, 0.2, "Mirando, reduz penalidades de alcance (ver livro)."),
  EQ("Targeting Scope, Enhanced Low-Light", "scope-low-light", "accessory", 1000, 1.2),
  EQ("Timer", "timer", "tools", 250, 0.1, "Para explosivos.", { availability: "licensed" })
];
