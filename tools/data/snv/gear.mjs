// Scum and Villainy — Cap. 2: armaduras (Tabela 2-6), armas (2-7) e equipamentos (2-8). Descrições resumidas.
const SRC = "Scum and Villainy";
const mod = (target, value, type = "equipment") => ({ target, value: String(value), type, label: "", disabled: false });
const W = (name, key, o) => ({
  name, type: "weapon", img: o.img ?? "icons/weapons/guns/rifle-brown.webp",
  system: {
    key, group: "simple", size: "medium", rangeType: "rifle", damage: "1d4", damage2: "", damageType: "energy",
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
  name, type: "equipment", img: "icons/containers/bags/pack-leather-brown.webp",
  system: { key, category, cost, weight, quantity: 1, availability: o.availability ?? "", equipped: false, special: "", modifiers: o.modifiers ?? [], source: SRC, description: `<p>${description}</p>` }
});
const BESKAR = "Armadura mandaloriana de beskar (ferro mandaloriano): sabres de luz não ignoram seu bônus de armadura; dá circunstância favorável em Persuasion para intimidar. Duas melhorias livres (powered). O Mestre pode reduzir o custo em 30.000 para heróis mandalorianos.";

export const armor = [
  AR("Beskar'gam (leve)", "beskargam-light", { category: "light", reflexBonus: 5, fortBonus: 2, maxDex: 3, cost: 33500, weight: 10, availability: "licensed", upgradeSlots: 2, description: BESKAR }),
  AR("Half-Vest", "half-vest", { category: "light", reflexBonus: 1, fortBonus: 0, maxDex: 5, cost: 250, weight: 2, availability: "restricted", modifiers: [], description: "Colete leve e discreto (+5 de equipamento em Stealth para ocultá-lo). 1/encontro, ação livre: nega o dano bônus de um ataque feito enquanto você está sem Destreza (como Sneak Attack)." }),
  AR("Shadowsuit", "shadowsuit", { category: "light", reflexBonus: 1, fortBonus: 1, maxDex: 5, cost: 600, weight: 2, availability: "military", description: "Malha negra de assassino: +5 de equipamento em Stealth; quem o veste tem camuflagem na escuridão e na penumbra." , modifiers: [mod("skills.stealth", 5)] }),
  AR("Beskar'gam (média)", "beskargam-medium", { category: "medium", reflexBonus: 8, fortBonus: 2, maxDex: 2, cost: 37000, weight: 17, availability: "restricted", upgradeSlots: 2, description: BESKAR }),
  AR("GTU AV-1S Scout Armor", "gtu-av1s-scout-armor", { category: "medium", reflexBonus: 7, fortBonus: 2, maxDex: 2, cost: 15000, weight: 18, availability: "military", upgradeSlots: 2, upgrades: ["helmet", "vacuum", "repulsorlift"], description: "Versão leve da AV-1C: selada contra vácuo, pacote de capacete, repulsores de voo (deslocamento de voo 4 em vez de 6) e bastão de luz. Motorizada: duas melhorias livres." }),
  AR("Krail 210 Personal Armor", "krail-210-armor", { category: "medium", reflexBonus: 7, fortBonus: 1, maxDex: 3, cost: 16300, weight: 17, availability: "military", upgradeSlots: 2, upgrades: ["helmet", "vacuum"], description: "Armadura de caçador de recompensas: pacote de capacete, jet pack, dispensador de cabo líquido, selos de vácuo e +2 de equipamento em testes de Força para erguer, arrastar ou puxar. Motorizada: duas melhorias livres." }),
  AR("Beskar'gam (pesada)", "beskargam-heavy", { category: "heavy", reflexBonus: 10, fortBonus: 4, maxDex: 1, cost: 45000, weight: 32, availability: "restricted", upgradeSlots: 2, description: BESKAR }),
  AR("GTU AV-1C Combat Armor", "gtu-av1c-combat-armor", { category: "heavy", reflexBonus: 9, fortBonus: 4, maxDex: 1, cost: 25000, weight: 25, availability: "restricted", upgradeSlots: 2, upgrades: ["helmet", "vacuum", "repulsorlift"], description: "Armadura de combate selada com pacote de capacete e jet pack de repulsores silencioso (sem ruído nem chamas). Motorizada: duas melhorias livres." })
];

export const weapons = [
  W("Neural Inhibitor", "neural-inhibitor", { group: "exotic", rangeType: "pistol", damage: "1d6", damageType: "piercing", cost: 4200, weight: 1, availability: "illegal", special: "", description: "Dardo com neurotoxina. Ao ferir um ser vivo, veneno: 1d20+5 contra a Fortitude, −1 passo; repete a cada rodada com +1 cumulativo até falhar; a condição é persistente até Treat Injury CD 20. Use também o item de veneno correspondente." }),
  W("Pulse Rifle", "pulse-rifle", { group: "exotic", damage: "2d8", area: "Cone 6", cost: 5000, weight: 2.5, availability: "illegal", ammo: { value: 5, max: 5 }, description: "Cone de 6 quadrados: um ataque contra a Reflexos de todos; metade do dano em quem errar (área)." }),
  W("Deck Sweeper", "deck-sweeper", { group: "exotic", size: "large", damage: "3d6", stun: true, stunDamage: "3d6", special: "stunOnly", area: "Cone 6", cost: 5000, weight: 4.5, availability: "restricted", ammo: { value: 5, max: 5 }, description: "Só atordoa: cone de 6 quadrados contra a Reflexos de todos (metade em quem errar). Ação rápida para preparar o disparo no mesmo turno." }),
  W("Electronet", "electronet", { group: "heavy", rangeType: "heavy", damage: "3d8", stun: true, stunDamage: "3d8", special: "stunOnly", area: "2×2", cost: 2000, weight: 5, availability: "restricted", description: "Disparada por lança-granadas numa área 2×2: quem for atingido sofre o atordoamento e fica agarrado (como rede); repete o dano no início de cada rodada enquanto preso." }),
  W("Blaster, Subrepeating", "subrepeating-blaster", { group: "pistols", rangeType: "pistol", damage: "3d6", rateOfFire: "A", cost: 750, weight: 2, availability: "military", ammo: { value: 50, max: 50 }, img: "icons/weapons/guns/gun-pistol-flintlock-white.webp", description: "Pistola só automática com coronha retrátil; com a coronha estendida pode ser apoiada (brace). 50 tiros." }),
  W("Squib Battering Ram", "squib-battering-ram", { group: "simple", size: "large", rangeType: "melee", damage: "5d10", noStrDamage: true, cost: 3500, weight: 10, availability: "military", description: "Aríete de salvagem: exige dois operadores; só causa dano normal a objetos estacionários e desguarnecidos. Quatro pacotes de energia." }),
  W("Micro Grenade Launcher", "micro-grenade-launcher", { group: "rifles", damage: "2d6", area: "Raio 2", inaccurate: true, cost: 2500, weight: 3, availability: "illegal", ammo: { value: 4, max: 4 }, description: "Lança micro granadas (−2 dados em relação à granada normal; padrão frag 2d6). 4 granadas; recarga em rodada completa. Pode ser montado num rifle (1 minuto, Mechanics CD 15)." }),
  W("Snare Rifle", "snare-rifle", { group: "rifles", damage: "1d6", stun: true, stunDamage: "1d6", special: "stunOnly", damageType: "bludgeoning", cost: 1200, weight: 5, availability: "licensed", ammo: { value: 5, max: 5 }, description: "Cabo com pesos que enrola o alvo: agarra à distância e causa o atordoamento. Escapar: Acrobatics CD 15 ou Força CD 20. Funciona com Pin e Trip. Cartucho: 5 disparos, 50 cr." }),
  W("Blaster Rifle, Sniper", "sniper-blaster-rifle", { group: "rifles", size: "large", damage: "3d10", accurate: true, cost: 2000, weight: 8, availability: "military", ammo: { value: 10, max: 10 }, description: "Rifle de precisão com bipé e mira (não incluídos no preço): −5 no ataque se não mirar antes (some no campo de ataque). Não se beneficia de rapid recycler. 10 tiros." })
];

export const equipment = [
  EQ("ABC Scrambler", "abc-scrambler", "detection", 3000, 3, "Emite sinais falsos que confundem mísseis: +5 de deflexão na Reflexos contra lança-granadas e lança-mísseis.", { availability: "restricted" }),
  EQ("Force Cage", "force-cage", "tools", 7000, 25, "Jaula Grande (2×2) de barras energizadas: quem tenta entrar ou sair sofre 3d6 de energia; montagem em 5 minutos; quebrar CD 30; desativada por controle remoto.", { availability: "restricted" }),
  EQ("Lock Breaking Kit", "lock-breaking-kit", "tools", 8000, 4, "+5 de equipamento em Mechanics e Use Computer para burlar portas e eclusas de naves.", { availability: "illegal" }),
  EQ("Man Trap", "man-trap", "tools", 8000, 19, "Campo de repulsores invertido num quadrado: quem entra fica imobilizado; escapar exige Força CD 40 (ação de movimento). Desativado por controle remoto.", { availability: "restricted" }),
  EQ("Spacer's Chest", "spacers-chest", "survival", 200, 10, "Baú de contrabandista com mantimentos para 10 dias e tranca eletrônica (Vontade 30)."),
  EQ("Cheater (sabacc)", "sabacc-cheater", "tools", 500, 0, "Melhoria universal: +2 de equipamento em Sabedoria para jogos de azar; esconder exige Stealth contra Perception.", { availability: "illegal" })
];
