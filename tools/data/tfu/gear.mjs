// The Force Unleashed Campaign Guide — Cap. 6: armas, explosivos e equipamentos.
// (A double vibroblade já vem do KotOR Campaign Guide e o guard shoto do Jedi Academy Training Manual.)
const SRC = "The Force Unleashed Campaign Guide";
const IMG = {
  blade: "icons/weapons/swords/sword-guard-blue.webp", hammer: "icons/weapons/hammers/hammer-war-spiked.webp",
  pistol: "icons/weapons/guns/gun-pistol-flintlock-white.webp", rifle: "icons/weapons/guns/rifle-brown.webp",
  mine: "icons/weapons/thrown/bomb-metal-brown.webp", tech: "icons/commodities/tech/circuit-board.webp"
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
const MINE = "Minas: notar uma exige Perception com −5; instalar é rodada completa sem teste de Mechanics (acoplar um detonador por tempo ou manual exige o teste normal e substitui o gatilho da mina).";
const DISRUPT = "Disruptor: trata o Limiar de Dano do alvo como 5 menor; se matar ou destruir o alvo, ele é desintegrado. Só dispara a cada duas rodadas e não pode usar feats, talentos ou habilidades que gastem mais de um disparo por rodada (Double Attack, Rapid Shot...).";
const PRIME = "Ação rápida: carrega um disparo; se não atacar com a arma antes do início do seu próximo turno, o próximo ataque no encontro causa +1 dado de dano e gasta 5 disparos. Não combina com habilidades que gastam mais de um disparo (autofire, Rapid Shot).";

export const weapons = [
  W("Power Hammer", "power-hammer", { group: "advancedMelee", size: "large", damage: "2d12", damageType: "bludgeoning", cost: 1500, weight: 10, availability: "restricted", img: IMG.hammer, description: "Martelo de durasteel com gerador de gravidade na cabeça, usado por mineradores de asteroides. O dano extra de Power Attack também se aplica contra objetos e veículos. Com Double Attack, Triple Attack ou Rapid Strike, −2 adicional nos ataques. Requer duas células de energia." }),
  W("Vibrosword", "vibrosword", { group: "advancedMelee", size: "large", damage: "2d8", damageType: "slashing", cost: 450, weight: 3, availability: "licensed", img: IMG.blade, description: "Vibrolâmina enorme de duas mãos (cortante ou perfurante). Requer célula de energia." }),
  W("Felucian Skullblade", "felucian-skullblade", { group: "exotic", size: "small", damage: "2d6", damageType: "slashing", cost: 1500, weight: 0.5, availability: "rare", img: IMG.blade, description: "Lâmina cerimonial feita do crânio de animais de Felucia, com traços de cristal sensível à Força: quando imbuída (Infuse Weapon dos xamãs felucianos), bloqueia sabres de luz. Felucianos a tratam como arma simples." }),
  W("Ryyk Blade", "ryyk-blade", { group: "exotic", damage: "2d10", damageType: "slashing", cost: 500, weight: 1.5, availability: "rare", img: IMG.blade, description: "Lâmina curva tradicional wookiee. Wookiees com Weapon Proficiency (advanced melee weapons) são proficientes nela. Quem a carrega recebe +2 em Survival para sobrevivência básica em florestas e selvas." }),
  W("Bryar Pistol", "bryar-pistol", { group: "pistols", rangeType: "pistol", damage: "3d4", accurate: true, cost: 1350, weight: 3, availability: "licensed", ammo: { value: 100, max: 100 }, description: `Versão encurtada do rifle Bryar. Precisa (sem penalidade em curta distância). ${PRIME}` }),
  W("DX-2 Disruptor Pistol", "dx-2-disruptor-pistol", { group: "pistols", rangeType: "pistol", damage: "3d6", cost: 3000, weight: 3, availability: "illegal", ammo: { value: 10, max: 10 }, description: `Disruptor do Sindicato Tenloss, proibido pelo Império. ${DISRUPT}` }),
  W("Bryar Rifle", "bryar-rifle", { group: "rifles", rangeType: "rifle", damage: "3d8", inaccurate: true, cost: 1350, weight: 3, availability: "licensed", ammo: { value: 50, max: 50 }, img: IMG.rifle, description: `Rifle blaster pesado com câmara reforçada. Impreciso (não atira a longa distância). ${PRIME}` }),
  W("DXR-6 Disruptor Rifle", "dxr-6-disruptor-rifle", { group: "rifles", rangeType: "rifle", damage: "3d8", cost: 3500, weight: 6, availability: "illegal", ammo: { value: 10, max: 10 }, img: IMG.rifle, description: `Versão rifle do DX-2. ${DISRUPT}` }),
  W("Incinerator Rifle", "incinerator-rifle", { group: "rifles", rangeType: "rifle", damage: "3d6", cost: 3500, weight: 5, availability: "military", ammo: { value: 20, max: 20 }, img: IMG.rifle, description: "Usado por espiões bothanos: quem é morto (ou objeto, veículo ou droide destruído) por ele é desintegrado sem deixar rastro." }),
  W("Stokhli Spray Stick", "stokhli-spray-stick", { group: "rifles", rangeType: "rifle", damage: "3d8", stun: true, stunDamage: "3d8", special: "stunOnly", inaccurate: true, cost: 14000, weight: 4, availability: "restricted", ammo: { value: 80, max: 80 }, img: IMG.rifle, description: "Arma de caça que dispara névoa adesiva: 3d8 de atordoamento e a teia funciona como rede, permitindo iniciar agarrar à distância. Imprecisa. Cartucho (80 disparos): 100 cr." }),
  W("Antivehicle Mine", "antivehicle-mine", { group: "simple", size: "diminutive", rangeType: "thrown", damage: "10d6", area: "Raio 2", noStrDamage: true, cost: 1500, weight: 0.5, availability: "military", img: IMG.mine, description: `Só é disparada por um veículo terrestre que entre no quadrado. Explosão de raio 2. ${MINE}` }),
  W("Flechette Mine", "flechette-mine", { group: "simple", size: "tiny", rangeType: "thrown", damage: "8d6", damageType: "piercing", area: "Raio 2", noStrDamage: true, cost: 1200, weight: 0.5, availability: "illegal", img: IMG.mine, description: `Milhares de estilhaços; disparada por qualquer personagem, criatura, droide ou veículo que entre no quadrado. Explosão de raio 2. ${MINE}` }),
  W("Land Mine", "land-mine", { group: "simple", size: "tiny", rangeType: "thrown", damage: "8d6", area: "Raio 1", noStrDamage: true, cost: 500, weight: 0.5, availability: "military", img: IMG.mine, description: `Mina antipessoal de pressão; disparada por quem entrar no quadrado. Explosão de raio 1. ${MINE}` }),
  W("Laser Trip Mine", "laser-trip-mine", { group: "simple", size: "tiny", rangeType: "thrown", damage: "6d6", area: "Raio 2", noStrDamage: true, cost: 700, weight: 0.5, availability: "military", img: IMG.mine, description: `Feixe quase invisível até uma superfície a até 6 quadrados; dispara quando algo entra num quadrado da linha. Explosão de raio 2. ${MINE}` }),
  W("Proximity Mine", "proximity-mine", { group: "simple", size: "tiny", rangeType: "thrown", damage: "6d6", area: "Raio 3", noStrDamage: true, cost: 1500, weight: 0.5, availability: "military", img: IMG.mine, description: `Dispara quando algo entra a até 3 quadrados (ativa 1 rodada após instalada). Explosão de raio 3. ${MINE}` }),
  // Cap. 10: arsenal imperial
  W("Neuronic Whip", "neuronic-whip", { group: "exotic", damage: "2d8", stun: true, stunDamage: "2d8", special: "stunOnly", reach: true, damageType: "bludgeoning", cost: 500, weight: 0.5, availability: "restricted", img: IMG.blade, description: "Chicote com cabo energizado: causa dano de atordoamento normal mais 1d4 de dano cortante, e aumenta o alcance do usuário em 1 quadrado. Requer célula de energia." }),
  W("CR-1 Blast Cannon", "cr-1-blast-cannon", { group: "exotic", size: "large", rangeType: "pistol", damage: "3d8", inaccurate: true, cost: 2000, weight: 6, availability: "military", img: IMG.rifle, description: "Dispara uma rajada de raios blaster que se espalha: alcance de pistola, mas as penalidades de distância se aplicam ao dano em vez do ataque. Contra alvos adjacentes, +1d8 de dano; contra não adjacentes, splash de 1 quadrado. Imprecisa." }),
  W("E-Web Missile Launcher", "e-web-missile-launcher", { group: "heavy", size: "huge", rangeType: "heavy", damage: "6d6", damageType: "slashing", area: "Área 2×2", cost: 9500, weight: 42, availability: "military", img: IMG.rifle, description: "Variante do E-Web que lança mísseis; montado no tripé conta como uma categoria menor (um personagem Médio usa com as duas mãos). Não precisa de gerador; só tiro único, uma vez por rodada, recarregado por um segundo tripulante (ação de movimento). Duas ações rápidas antes de atirar: trata o alcance como uma faixa mais curto (acumula com Far Shot). Míssil: 75 cr." }),
  W("Flechette Launcher", "flechette-launcher", { group: "rifles", size: "large", rangeType: "rifle", damage: "3d8", damageType: "piercing", area: "Splash 1", inaccurate: true, cost: 1100, weight: 5, availability: "military", ammo: { value: 4, max: 4 }, img: IMG.rifle, description: "Dispara cartuchos de dardos de durasteel: arma de splash (1 quadrado). Não pode usar Rapid Shot nem talentos que gastem mais de um disparo. Imprecisa. Cartucho de 4 disparos: 50 cr." }),
  W("Rail Detonator Gun", "rail-detonator-gun", { group: "rifles", size: "large", rangeType: "rifle", damage: "3d8", damageType: "piercing", area: "Splash 1", cost: 1900, weight: 5, availability: "military", ammo: { value: 10, max: 10 }, img: IMG.rifle, description: "Arma eletromagnética dos Jumptroopers que dispara cápsulas explosivas: arma de splash (1 quadrado). Carregador de 10 disparos: 50 cr." })
];

export const equipment = [
  EQ("Manual Trigger", "manual-trigger", "tools", 100, 0.1, "Detonador manual acoplável a qualquer explosivo (inclusive minas), instalado com Mechanics; dispara com ação rápida a até 30 quadrados.", { availability: "licensed" }),
  EQ("Decoy Glowrod", "decoy-glowrod", "accessory", 100, 4, "Bastão de luz funcional com cabo oco que esconde até 3 kg de objetos Diminutos ou menores: +10 de equipamento em Stealth para esconder o item."),
  EQ("Holoshroud", "holoshroud", "accessory", 25000, 0.5, "Holoprojetor que sobrepõe ao usuário uma imagem holográfica armazenada (trocar a imagem: Use Computer CD 15). +10 de equipamento em Deception para criar a aparência enganosa da imagem; ligar ou desligar é ação rápida e não conta como enganação apressada nem sofre −10 por falta de equipamento."),
  EQ("Arakyd Hush-About Personal Jetpack", "hush-about-jetpack", "survival", 3750, 30, "Jet pack leve quase silencioso: não sofre penalidade de Stealth por velocidade (pode mover o dobro ou correr voando sem penalidade). Cada célula de combustível tem só 6 cargas (em vez de 10); célula extra: 100 cr."),
  EQ("Repulsor Pad", "repulsor-pad", "tools", 200, 6, "Plataforma com quatro repulsores que ergue um objeto de até 1 quadrado (vários pads para objetos maiores); ativar é ação rápida e ela acompanha quem a puxar com ação rápida (puxões opostos: testes de Força)."),
  EQ("Sound Sponge", "sound-sponge", "accessory", 3500, 1, "Abafa todo som num raio de 6 quadrados: +10 na CD de Perception para ouvir ruídos vindos da área.")
];
