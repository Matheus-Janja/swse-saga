// Threats of the Galaxy — armas e equipamentos dos quadros do livro. Descrições resumidas.
const SRC = "Threats of the Galaxy";
const IMG = {
  blade: "icons/weapons/swords/sword-guard-red.webp", dagger: "icons/weapons/daggers/dagger-straight-blue.webp",
  pistol: "icons/weapons/guns/gun-pistol-flintlock-white.webp", heavy: "icons/weapons/guns/gun-blunderbuss-gold.webp",
  shield: "icons/equipment/shield/heater-steel-boss-red.webp", tech: "icons/commodities/tech/circuit-board.webp",
  med: "icons/consumables/potions/bottle-round-corked-red.webp", glove: "icons/equipment/hand/gauntlet-armored-steel-grey.webp"
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
const EQ = (name, key, category, cost, weight, description, o = {}) => ({
  name, type: "equipment", img: o.img ?? IMG.tech,
  system: { key, category, cost, weight, quantity: 1, availability: o.availability ?? "", equipped: false, special: "", modifiers: o.modifiers ?? [], source: SRC, description: `<p>${description}</p>` }
});

export const weapons = [
  W("Datadagger", "datadagger", { group: "simple", size: "tiny", damage: "1d4", damageType: "piercing", cost: 500, weight: 0.1, availability: "illegal", img: IMG.dagger,
    description: "Lâmina oculta num code cylinder: +5 nos testes para escondê-la; quem a examina só nota a diferença se tocar quem a porta." }),
  W("Sith Sword", "sith-sword", { group: "simple", damage: "1d8", damageType: "slashing", cost: 3000, weight: 3, availability: "illegal", img: IMG.blade,
    description: "Espada alquímica do antigo Império Sith: sabres de luz não ignoram a RD dela, e proficientes podem tratá-la como sabre para Block, Deflect e Redirect Shot (e talentos que os exigem). Com um Ponto da Força (ação rápida), soma o Dark Side Score ao dano do próximo ataque antes do fim do encontro e aumenta o Dark Side Score em 1. Rara." }),
  W("Light Concussion Missile Launcher", "light-concussion-missile-launcher", { group: "heavy", size: "large", rangeType: "heavy", damage: "4d10", damageType: "slashing", area: "Splash 2", cost: 4000, weight: 18, availability: "military", img: IMG.heavy,
    description: "Lança-mísseis antiveículo: um míssil por ataque (não combina com Rapid Shot), splash de 2 quadrados, −10 contra alvos menores que Enorme. Dano ×2 (escala de veículo). Míssil: 800 cr, 10 kg." }),
  W("Sonic Stunner", "sonic-stunner", { group: "pistols", size: "tiny", rangeType: "pistol", damage: "3d6", stun: true, stunDamage: "3d6", special: "stunOnly", cost: 450, weight: 1, availability: "illegal",
    description: "Pistola sônica de interrogatório: só atordoa, e só o alvo ouve o disparo (atinge até criaturas surdas)." }),
  W("Riot Shield", "riot-shield", { group: "simple", size: "medium", damage: "1d6", damageType: "bludgeoning", stun: true, stunDamage: "2d6", cost: 500, weight: 6, availability: "military", img: IMG.shield,
    description: "Escudo de energia de 1 × 1,5 m, opaco por fora: lutando defensivamente, dá +5 de cobertura na Reflexos contra ataques à distância. Pode ser usado como stun baton. RD 5, 20 PV, CD 25 para quebrar." }),
  W("Cortosis Gauntlet", "cortosis-gauntlet", { group: "simple", size: "small", damage: "1d4", damageType: "bludgeoning", cost: 1500, weight: 1, availability: "rare", img: IMG.glove,
    description: "Manopla de minério de cortosis (Cavaleiros Imperiais): sabres de luz não ignoram o bônus de armadura de quem a usa; ao bloquear ou ser atingido por um sabre, a lâmina pode se desligar (ver as regras de cortosis do Mestre)." })
];

export const equipment = [
  EQ("MDS-50 Medisensor", "mds-50-medisensor", "medical", 75, 0.1, "Sensor médico portátil: identifica ferimentos, doenças e venenos e dá +2 de equipamento em Treat Injury para diagnosticar."),
  EQ("Heat Sensor", "heat-sensor", "detection", 250, 0.2, "Detector térmico: +2 de equipamento em Perception para localizar fontes de calor (pessoas escondidas, focos de incêndio).", { modifiers: [] }),
  EQ("FastFlesh Medpac", "fastflesh-medpac", "medical", 600, 0.5, "Medpac militar: +5 de equipamento em Treat Injury para primeiros socorros. Um alvo só se beneficia de um medpac (de qualquer tipo) a cada 24 horas.", { img: IMG.med }),
  EQ("Computer Spike", "computer-spike", "computer", 1500, 1, "Programa de uso único que se conecta a outro sistema: ação rápida, um único teste de Use Computer com +2 (ou mais, conforme o preço: 1.500 cr por +2) só para melhorar o acesso. Ilegal.", { availability: "illegal" }),
  EQ("HiBaka 2000 Mem-Stik", "hibaka-mem-stik", "computer", 50, 0, "Memória minúscula (texto, imagem, vídeo e até 1 minuto de holograma); cabe no slot de power pack de uma pistola blaster (+10 de equipamento em Stealth para escondê-la; a arma não dispara até repor o power pack)."),
  EQ("Lectroticker", "lectroticker", "tools", 1500, 1, "Placa sensora que engana fechaduras eletrônicas: ação rápida, um teste de Mechanics com +2 (ou mais: 1.500 cr por +2) para desativar uma fechadura. Ilegal.", { availability: "illegal" })
];

// Arma de nave (vai para a pasta "Armas de Nave" do compêndio de equipamentos)
export const shipWeapons = [{
  name: "Discord Missile Launcher", type: "vehicleWeapon", img: "icons/weapons/guns/gun-blunderbuss-gold.webp",
  system: {
    key: "discord-missile-launcher", source: SRC, weaponType: "missile", station: "gunner", gunner: 1, damage: "0", multiplier: 1, ion: false, autofire: false,
    area: "", penetration: 0, grapple: 0, attackBonus: 0, damageBonus: 0, count: 1, ammo: { value: 0, max: 0 },
    special: "Ataque contra um quadrado (Reflexos 10): libera 3 buzz droids",
    description: "<p><strong>Pontos de instalação:</strong> 2 · <strong>Disponibilidade:</strong> restrita · <strong>Custo:</strong> 4.000 (míssil 1.000). Para veículos Enormes ou maiores. O míssil se abre no quadrado-alvo e solta três buzz droids (em escala de nave, ocupam o quadrado). Quando um veículo entra num quadrado com buzz droids, eles atacam como reação com +5 de equipamento e se prendem ao casco (ver Pistoeka Buzz Droid).</p>"
  }
}];
