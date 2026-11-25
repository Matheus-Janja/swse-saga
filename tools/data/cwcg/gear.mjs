// The Clone Wars Campaign Guide — Cap. 5: armas (Tabelas 5-1 a 5-3), armaduras (5-4) e equipamentos (5-5). Descrições resumidas.
const SRC = "The Clone Wars Campaign Guide";
const mod = (target, value, type = "equipment") => ({ target, value: String(value), type, label: "", disabled: false });
const IMG = {
  blade: "icons/weapons/swords/sword-guard-blue.webp", club: "icons/weapons/clubs/club-simple-barbed-brown.webp",
  fist: "icons/skills/melee/unarmed-punch-fist.webp", pistol: "icons/weapons/guns/gun-pistol-flintlock-white.webp",
  rifle: "icons/weapons/guns/rifle-brown.webp", grenade: "icons/weapons/thrown/bomb-fuse-black.webp", heavy: "icons/weapons/guns/gun-blunderbuss-gold.webp"
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
  name, type: "equipment", img: o.img ?? "icons/commodities/tech/circuit-board.webp",
  system: { key, category, cost, weight, quantity: 1, availability: o.availability ?? "", equipped: false, special: "", modifiers: o.modifiers ?? [], source: SRC, description: `<p>${description}</p>` }
});

export const weapons = [
  // Corpo a corpo
  W("Vibroknucklers", "vibroknucklers", { group: "advancedMelee", size: "tiny", damage: "1d3", damageBonus: 3, damageType: "slashing", cost: 200, weight: 0.5, availability: "restricted", img: IMG.fist,
    description: "Anéis com microlâmina: +3 de dano no ataque desarmado (conta ao mesmo tempo como desarmado e como arma corpo a corpo avançada). Não pode ser desarmada. Requer célula de energia." }),
  W("Vibrorapier", "vibrorapier", { group: "advancedMelee", damage: "2d6", damageType: "slashing", cost: 500, weight: 1.4, availability: "restricted", img: IMG.blade,
    description: "Vibrolâmina longa, fina e silenciosa, preferida por duelistas. Requer duas células de energia." }),
  W("Garrote", "garrote", { group: "exotic", size: "small", damage: "1d6", damageType: "slashing", cost: 50, weight: 0.5,
    description: "Fio de durasteel de duas mãos: o ataque é um agarrão (grab), e bônus de feats/talentos da arma valem nele. No início do turno do alvo agarrado, ele sofre o dano e desce −1 passo, além dos efeitos normais do agarrão." }),
  W("Snap Baton", "snap-baton", { group: "simple", size: "small", damage: "2d4", damageType: "bludgeoning", stun: true, stunDamage: "2d4", cost: 100, weight: 1, img: IMG.club,
    description: "Bastão retrátil de 1 m; abrir ou fechar é ação rápida. Modelos com alarme ou glowrod custam o dobro." }),
  W("Stunning Gauntlet", "stunning-gauntlet", { group: "simple", size: "tiny", damage: "1d4", stun: true, stunDamage: "1d4", damageBonus: 1, special: "stunOnly", cost: 200, weight: 0.4, availability: "restricted", img: IMG.fist,
    description: "Luva isolada que eletrifica o ataque desarmado: dano de atordoamento com +1. Não pode ser desarmada." }),
  // À distância
  W("Wrist Rocket Launcher", "wrist-rocket-launcher", { group: "exotic", size: "small", rangeType: "pistol", damage: "3d8", damageType: "slashing", area: "Splash 2", cost: 2600, weight: 1, availability: "restricted", ammo: { value: 1, max: 1 }, img: IMG.heavy,
    description: "Lança-foguete de pulso de tiro único (recarregar a cada disparo). Foguetes (0,25 kg): antipessoal 400 cr (3d8, como granada de fragmentação, área); antiveículo 500 cr (3d10); flash 400 cr (cegueira 1d4 rodadas na explosão); hollow-tip vazio 200 cr (2d6), nerve toxin 600 cr (ataque secundário contra a Fortitude, −2 passos), stun gas 400 cr (3d6 de atordoamento e nuvem); ion blast 400 cr (3d6 de íons). O dano padrão aqui é o do antipessoal." }),
  W("Czerka Adjudicator", "czerka-adjudicator", { group: "pistols", size: "tiny", rangeType: "pistol", damage: "2d4", damageType: "piercing", cost: 325, weight: 0.5, availability: "licensed", ammo: { value: 4, max: 4 },
    description: "Slugthrower de bolso: 4 tiros; recarregar é ação de rodada completa." }),
  W("Gee-Tech 12 Defender", "gee-tech-12-defender", { group: "pistols", size: "tiny", rangeType: "pistol", damage: "3d4", stun: false, inaccurate: true, cost: 400, weight: 0.25, availability: "illegal", ammo: { value: 2, max: 2 },
    description: "Microblaster descartável: +5 em Stealth para escondê-lo, alcance máximo 3 quadrados, só 2 tiros (power pack integrado, não recarrega). Impreciso." }),
  W("BlasTech DH-23 \"Outback\"", "blastech-dh-23", { group: "pistols", size: "small", rangeType: "pistol", damage: "3d6", stun: true, stunDamage: "3d6", cost: 500, weight: 1, availability: "restricted", ammo: { value: 50, max: 50 },
    description: "Pistola robusta, com radiador e corpo reforçado: Força 17 e CD 20 para quebrá-la, em troca de alcance." }),
  W("BlasTech DT-12 Heavy Blaster Pistol", "blastech-dt-12", { group: "pistols", rangeType: "pistol", damage: "4d6", stun: true, stunDamage: "4d6", inaccurate: true, cost: 900, weight: 2, availability: "military", ammo: { value: 50, max: 50 },
    description: "Pistola pesada de punho largo: troca peso e precisão de longo alcance por um tiro mais forte. Imprecisa." }),
  W("Merr-Sonn Model 434 \"DeathHammer\"", "merr-sonn-434", { group: "pistols", rangeType: "pistol", damage: "3d8", stun: true, stunDamage: "3d8", cost: 650, weight: 1.2, availability: "restricted", ammo: { value: 50, max: 50 },
    description: "Pistola compacta e potente de durasteel: +2 de equipamento na RD da arma. Favorita de caçadores de recompensas." }),
  W("BlasTech 500 \"ESPO\" Riot Gun", "blastech-500-espo", { group: "rifles", rangeType: "rifle", damage: "3d8", stun: true, stunDamage: "3d8", rateOfFire: "SA", inaccurate: true, cost: 1000, weight: 4.5, availability: "military", ammo: { value: 50, max: 50 },
    description: "Rifle de controle de multidões da Corporate Sector Authority, feito para autofire: −2 nos ataques em tiro único. Impreciso." }),
  W("Czerka Adventurer", "czerka-adventurer", { group: "rifles", rangeType: "rifle", damage: "2d10", damageType: "piercing", accurate: true, cost: 360, weight: 4, availability: "restricted", ammo: { value: 10, max: 10 }, img: IMG.rifle,
    description: "Slugthrower de cano longo com oxidante: maior alcance e impacto; desmonta numa caixa pequena (montar/desmontar: ação de movimento). Preciso." }),
  W("SoroSuub Firelance Blaster Rifle", "sorosuub-firelance", { group: "rifles", rangeType: "rifle", damage: "3d8", stun: true, stunDamage: "4d6", rateOfFire: "SA", cost: 1200, weight: 2.5, availability: "restricted", ammo: { value: 50, max: 50 }, img: IMG.rifle,
    description: "Rifle leve com modo de atordoamento muito eficaz (4d6 em vez de 3d8), popular entre caçadores de recompensas e agentes da lei." }),
  W("BlasTech DLT-20A \"Longbarrel\"", "blastech-dlt-20a", { group: "rifles", size: "large", rangeType: "rifle", damage: "3d10", rateOfFire: "SA", accurate: true, cost: 1300, weight: 6.7, availability: "military", ammo: { value: 50, max: 50 }, img: IMG.rifle,
    description: "Rifle de patrulha montada da República, com telêmetro e mira eletrônica (mira padrão) e empunhadura de adesão magnética: +1 de equipamento na Reflexos contra Disarm. Preciso." }),
  W("EMP Grenade", "emp-grenade", { group: "simple", size: "small", rangeType: "thrown", thrown: true, damage: "3d6", damageType: "energy", ion: true, area: "Raio 2", cost: 500, weight: 0.5, availability: "restricted", img: IMG.grenade,
    description: "\"Droid popper\": um ataque de área contra a Reflexos de todos num raio de 2 quadrados; droides, veículos, eletrônicos e cibernéticos sofrem dano iônico normal se acertar e metade se errar; se o dano iônico os levar a 0 PV (antes de dividir), descem −5 passos e ficam desativados. Criaturas com cibernéticos sofrem metade se acertar; as demais, nada." })
];

export const armor = [
  AR("Thinsuit", "thinsuit", { category: "light", reflexBonus: 0, fortBonus: 0, maxDex: 6, cost: 900, weight: 1, modifiers: [],
    description: "Traje justo contra pressão e temperatura extremas, com máscara (1 h de ar): +5 de equipamento na Fortitude contra temperaturas extremas; em ataques assim, metade do dano e sem passo na trilha se acertar, nenhum dano se errar. Pode ser usado sob outra armadura." }),
  AR("Tracker Utility Vest", "tracker-utility-vest", { category: "light", reflexBonus: 1, fortBonus: 0, maxDex: 5, cost: 300, weight: 0.5,
    description: "Colete de couro com bolsos para até 24 objetos pequenos (até 1 kg cada); o peso deles conta pela metade." }),
  AR("Camo Armor", "camo-armor", { category: "medium", reflexBonus: 5, fortBonus: 0, maxDex: 3, cost: 6000, weight: 6, availability: "restricted", modifiers: [mod("skills.stealth", 10)],
    description: "Armadura com fibras fotorreativas que imitam o ambiente: +10 de equipamento em Stealth para se esconder, em qualquer terreno." }),
  AR("Vacuum Pod", "vacuum-pod", { category: "heavy", reflexBonus: 4, fortBonus: 1, maxDex: 0, cost: 15000, weight: 35,
    description: "Traje EVA motorizado com cérebro de droide: comlink (100 km), suporte de vida (2 horas, protege de ambientes extremos e vácuo), lâmpada (cone de 70 quadrados), kit de reparo (+2 em Mechanics) e aumento de força (+4 For). Voo 6 em gravidade zero. Mesmo sem proficiência em armadura pesada, funciona (sem os bônus de equipamento); penalidades à metade fora de combate. Vestir leva 15 minutos; tirar, 3 rodadas." })
];

export const equipment = [
  EQ("Bioscanner", "bioscanner", "medical", 3500, 0.5, "Scanner médico portátil: +2 em Knowledge (life sciences) para identificar doenças e anomalias.", { modifiers: [] }),
  EQ("Bracer Computer", "bracer-computer", "computer", 1300, 0.5, "Datapad de antebraço com tela holográfica e teclado de uma mão (Inteligência 12)."),
  EQ("Camouflage Netting (Clone Wars)", "camouflage-netting-cw", "survival", 6000, 40, "Rede de camuflagem sobre objetos numa área de 6×6 quadrados: +5 em Stealth e camuflagem parcial a quem está sob ela; a versão energizada dá mais +5 (emula emissões do terreno). Montar: rodada completa e duas pessoas."),
  EQ("Halo Lamp", "halo-lamp", "tools", 30, 1, "Disco de bolso que ilumina um raio de 3 quadrados; frio ao toque; pode ser acoplado a uma arma."),
  EQ("Visual Wrist Comm", "visual-wrist-comm", "communication", 1300, 0.25, "Comlink de pulso com áudio, vídeo e holograma 2D, alcance de 75 km (alcança a órbita); funciona como datapad simples. Célula de energia dura 10 dias.")
];
