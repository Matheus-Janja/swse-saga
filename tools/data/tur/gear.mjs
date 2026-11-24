// The Unknown Regions — Cap. 2: armas (Tabelas 2-1 e 2-2) e equipamentos (2-3). Descrições resumidas.
const SRC = "The Unknown Regions";
const mod = (target, value, type = "equipment") => ({ target, value: String(value), type, label: "", disabled: false });
const IMG = {
  blade: "icons/weapons/swords/sword-guard-blue.webp", dagger: "icons/weapons/daggers/dagger-straight-blue.webp",
  staff: "icons/weapons/staves/staff-simple-carved.webp", club: "icons/weapons/clubs/club-simple-barbed-brown.webp",
  axe: "icons/weapons/axes/axe-broad-black.webp", pistol: "icons/weapons/guns/gun-pistol-flintlock-white.webp",
  rifle: "icons/weapons/guns/rifle-brown.webp", bow: "icons/weapons/bows/crossbow-simple-brown.webp"
};
const W = (name, key, o) => ({
  name, type: "weapon", img: o.img ?? IMG.rifle,
  system: {
    key, group: "simple", size: "medium", rangeType: "melee", damage: "1d4", damage2: "", damageType: "energy",
    stun: false, stunDamage: "", ion: false, rateOfFire: "S", area: "", accurate: false, inaccurate: false, thrown: false,
    reach: false, double: false, strDamage: false, noStrDamage: false, ignoresDR: false, attackBonus: 0, damageBonus: 0,
    critRange: 20, critMultiplier: 2, ammo: { value: 0, max: 0 }, special: "", cost: 0, weight: 0, quantity: 1,
    availability: "", equipped: false, modifiers: [], settings: "", upgradeSlots: 1, upgrades: [], source: SRC, ...o,
    description: o.description ? `<p>${o.description}</p>` : ""
  }
});
const EQ = (name, key, category, cost, weight, description, o = {}) => ({
  name, type: "equipment", img: o.img ?? "icons/containers/bags/pack-leather-brown.webp",
  system: { key, category, cost, weight, quantity: 1, availability: o.availability ?? "", equipped: false, special: "", modifiers: o.modifiers ?? [], source: SRC, description: `<p>${description}</p>` }
});

export const weapons = [
  // Corpo a corpo
  W("Electropole", "electropole", { group: "advancedMelee", damage: "2d8", damageType: "energy", stun: true, stunDamage: "2d8", thrown: true, cost: 1500, weight: 1.3, availability: "licensed", img: IMG.staff,
    description: "Lança eletrificada dos Gungans e picadores de Geonosis; pode ser arremessada como dardo. Gungans são proficientes com Weapon Proficiency (simple weapons). Dano de concussão e energia. Requer duas células de energia." }),
  W("Blastsword", "blastsword", { group: "exotic", damage: "3d6", damageType: "energy", cost: 600, weight: 2.1, availability: "rare", img: IMG.blade,
    description: "Lâmina de duelista de Adumar que descarrega um tiro de blaster ao perfurar; conta como arma leve para Weapon Finesse. Requer power pack." }),
  W("Vibro-saw", "vibro-saw", { group: "exotic", size: "large", damage: "2d10", damageType: "slashing", ignoresDR: true, cost: 400, weight: 10, availability: "licensed", img: IMG.axe,
    description: "Serra vibratória de desmatamento e abordagem: ignora a Redução de Dano do alvo. Legal onde outras vibroarmas são proibidas. Requer duas células de energia." }),
  W("Contact Stunner", "contact-stunner", { group: "simple", size: "small", damage: "1d4", damageType: "bludgeoning", stun: true, stunDamage: "2d8", cost: 700, weight: 1.1, availability: "licensed", img: IMG.club,
    modifiers: [], description: "Arma de defesa pessoal com discos de contato: +5 de equipamento em Stealth para ocultá-la. Concussão ou energia. Requer célula de energia." }),
  W("Survival Knife", "survival-knife", { group: "simple", size: "small", damage: "1d6", damageType: "slashing", thrown: true, inaccurate: true, cost: 100, weight: 1.4, img: IMG.dagger,
    description: "Faca de sobrevivência com bússola digital (sempre sabe onde fica o norte) e cabo oco para pequenos itens (fire rod, arame, célula de energia). Pode ser arremessada (imprecisa)." }),
  // À distância
  W("Magna Caster", "magna-caster", { group: "exotic", rangeType: "rifle", damage: "3d8", damageType: "piercing", accurate: true, cost: 2000, weight: 4, availability: "restricted", ammo: { value: 10, max: 10 }, modifiers: [], img: IMG.bow,
    description: "Imitação magnética da bowcaster, quase silenciosa: +5 de equipamento em Stealth para atirar de tocaia. Precisa (sem penalidade a curta distância). Caixa de 10 virotes: 50 cr, 1 kg." }),
  W("Squib Tensor Rifle", "squib-tensor-rifle", { group: "exotic", rangeType: "rifle", damage: "3d8", damageType: "energy", cost: 10000, weight: 7.2, availability: "restricted", ammo: { value: 15, max: 15 },
    description: "Raio trator comprimido, muito barulhento: o ataque é contra a <strong>Fortitude</strong> do alvo; se acertar, ele desce −1 passo além do dano. Squibs a tratam como rifle. Alcance de rifle. Power pack (15 tiros). Disponibilidade: restrita, rara." }),
  W("Verpine Shatter Gun", "verpine-shatter-gun", { group: "exotic", rangeType: "pistol", damage: "3d10", damageType: "energy", accurate: true, cost: 15000, weight: 1, availability: "illegal", ammo: { value: 50, max: 50 }, img: IMG.pistol,
    description: "Pistola de bobina magnética quase silenciosa. No crítico, +1d10 de dano (depois de multiplicar). Muito frágil: qualquer dano a desativa até ser reparada com Mechanics. Verpine a tratam como pistola. Carregador especial (50 tiros): 1.000 cr. Ilegal, rara." }),
  W("Black-Powder Pistol", "black-powder-pistol", { group: "pistols", size: "small", rangeType: "pistol", damage: "2d4", damageType: "piercing", inaccurate: true, cost: 200, weight: 1.4, availability: "rare", ammo: { value: 1, max: 1 }, img: IMG.pistol,
    description: "Arma antiga: recarregar exige rodada completa (sem feats/talentos de tiros múltiplos); imprecisa (sem alcance longo). Munição: 50 tiros por 5 cr. Mechanics: Perception CD 20 para achar materiais e 1 hora + Mechanics CD 15 fazem 5 tiros (+5 a cada 5 pontos acima)." }),
  W("Stun Pistol", "stun-pistol", { group: "pistols", size: "small", rangeType: "pistol", damage: "3d6", damageType: "energy", stun: true, stunDamage: "3d6", special: "stunOnly", cost: 550, weight: 1, availability: "licensed", ammo: { value: 50, max: 50 }, img: IMG.pistol,
    description: "Só atordoa, mas alcança até 20 quadrados (em vez de 6) no modo atordoar. Power pack (50 tiros)." }),
  W("Heavy Slugthrower Pistol", "heavy-slugthrower-pistol", { group: "pistols", rangeType: "pistol", damage: "2d8", damageType: "piercing", cost: 400, weight: 2.1, availability: "restricted", ammo: { value: 8, max: 8 }, img: IMG.pistol,
    description: "Recuo forte: −1 adicional nos ataques com Double Attack, Triple Attack ou Rapid Shot. Carregador (8 tiros): 15 cr, 0,1 kg." }),
  W("Targeting Blaster Rifle", "targeting-blaster-rifle", { group: "rifles", rangeType: "rifle", damage: "3d6", damageType: "energy", stun: true, stunDamage: "3d6", accurate: true, cost: 1000, weight: 4, availability: "restricted", ammo: { value: 50, max: 50 },
    description: "Rifle esportivo de feixe sobrefocado: se mirar antes do ataque, os dados de dano viram d8 (3d8). Sem coronha dobrável; montar/desmontar leva uma rodada completa. Precisa." }),
  W("Concussion Rifle", "concussion-rifle", { group: "rifles", size: "large", rangeType: "rifle", damage: "2d10", damageType: "energy", cost: 1800, weight: 2.1, availability: "restricted", ammo: { value: 25, max: 25 },
    description: "Onda de choque sônica: o ataque é contra a <strong>Fortitude</strong> do alvo; se acertar, ele cai derrubado além de sofrer o dano. Power pack (25 tiros). Restrita, rara." }),
  W("Crossbow", "crossbow", { group: "simple", rangeType: "simple", damage: "1d8", damageType: "piercing", inaccurate: true, cost: 300, weight: 1.8, ammo: { value: 1, max: 1 }, img: IMG.bow,
    description: "Um virote por vez, recarga com ação de movimento; silenciosa e invisível a scanners de armas. Caixa de 10 virotes: 20 cr, 0,6 kg (dá para fazer à mão). Imprecisa." })
];

export const equipment = [
  EQ("Antidote Synthesizer", "antidote-synthesizer", "medical", 2500, 0.8, "Analisa uma amostra de veneno ou toxina e em 1d6 rodadas cria 1d4 doses de antídoto, cada uma dando +2 em Treat Injury para tratá-lo. Novas doses exigem nova amostra."),
  EQ("Climbing Harness", "climbing-harness", "survival", 45, 0.7, "Prende você à corda: ao escalar, só cai se falhar no Climb por 10 ou mais."),
  EQ("Emergency Vacuum Seal", "emergency-vacuum-seal", "tools", 750, 0.9, "Remendo biomecânico para brechas no casco: ao improvisar (jury-rig) uma nave com casco rompido, ela sobe +1 passo adicional na trilha."),
  EQ("Fire Paste", "fire-paste", "survival", 15, 0.1, "Tubo com 5 aplicações: queima por 3d4 minutos em qualquer superfície (até gelo); 1d6 de dano por rodada em quem estiver em contato."),
  EQ("Fire Rod", "fire-rod", "survival", 25, 0.1, "Tubo de 10 cm com dois químicos que inflamam ao se misturar; queima 2d8 minutos sem combustível."),
  EQ("Hypoinjector Wristband", "hypoinjector-wristband", "medical", 350, 0.1, "Bracelete com 8 doses (vacinas, antídotos, medicamentos) e bioscanner: ao detectar substância nociva que conhece, aplica a dose certa. Recarregar: ação padrão por dose. Duas células de energia (5 dias de uso)."),
  EQ("Microlab", "microlab", "detection", 1800, 0.8, "Laboratório portátil: Knowledge (physical sciences) CD 15 identifica uma substância."),
  EQ("Personal Multitool", "personal-multitool", "tools", 100, 0.2, "Ferramentas em miniatura: vibrolâmina de 5 cm (1d4 de dano), hidroespanador, hidrogarra, palito e talheres. Célula de energia (50 horas)."),
  EQ("Personal Translator", "personal-translator", "communication", 2000, 0.1, "Tradutor de bolso: traduz falas entre o idioma do dono e até três outros, como unidade tradutora CD 10; não interpreta linguagem não verbal."),
  EQ("Plastent", "plastent", "survival", 300, 2.7, "Abrigo inflável pré-fabricado para quatro seres Médios (2 m de altura); infla em poucos minutos e aceita sensores montados."),
  EQ("Portable Beacon", "portable-beacon", "communication", 1500, 6.8, "Baliza de 1 m com tripé: sinal captado por sensores a até 10.000 km; reprogramar para aviso ou socorro exige Use Computer CD 10 com um datapad."),
  EQ("Repulsor Boots", "repulsor-boots", "accessory", 200, 2, "Flutua até 0,5 m do chão, movendo-se no máximo 2 quadrados por rodada assim; +10 de equipamento em Climb.", { modifiers: [mod("skills.climb", 10)] }),
  EQ("Repulsor Hitch", "repulsor-hitch", "tools", 100, 3, "Repulsor preso a um cabo: ergue até 200 kg (objetos mais pesados não são afetados). Alguns droides (como o MULE) têm encaixe para ele."),
  EQ("Riding Saddle", "riding-saddle", "accessory", 125, 4, "Sela feita para um tipo de criatura; vendedores de montarias normalmente a incluem no preço."),
  EQ("War Saddle", "war-saddle", "accessory", 250, 6, "Sela de combate: +2 de equipamento em Ride para controlar a montaria em batalha, guiá-la com os joelhos e ficar na sela."),
  EQ("Shipsuit", "shipsuit", "survival", 200, 1, "Macacão de muitos bolsos (até 24 objetos Pequenos de até 1 kg, com peso pela metade); serve de enviro-suit com máscara respiratória; +1 de equipamento na Fortitude contra temperaturas extremas."),
  EQ("Signal Wand", "signal-wand", "communication", 300, 0.2, "Bastão com comlink de feixe estreito de alcance orbital (interestelar se ligado a fonte maior) e luz vermelha para sinais (como o código Mon Calamari)."),
  EQ("Sonar Mapper", "sonar-mapper", "detection", 400, 1, "Sensor de ecolocalização onde sensores comuns falham; mapeia até 100 m e grava 12 horas de leituras."),
  EQ("Subsonic Field Emitter", "subsonic-field-emitter", "survival", 120, 0.2, "Pulso subsônico que afasta insetos e pragas num raio de 6 m; criaturas Minúsculas ou menores com Int 2 ou menos não entram voluntariamente."),
  EQ("Water Extractor", "water-extractor", "survival", 400, 3.2, "Cone que condensa e purifica água do ar; em Tatooine, 16 horas rendem água para um dia.")
];
