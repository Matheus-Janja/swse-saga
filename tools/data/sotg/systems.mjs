// Starships of the Galaxy — Cap. 3: sistemas de nave (Tabelas 3-3 a 3-7). Itens de referência (equipamento, categoria
// "starship") e armas de nave (vehicleWeapon) que podem ser arrastadas para a ficha de um veículo.
const SRC = "Starships of the Galaxy";
const AV = { C: "", L: "licensed", R: "restricted", M: "military", I: "illegal" };
const sys = (name, key, ep, av, size, cost, desc = "") => ({
  name, type: "equipment", img: "icons/commodities/tech/cog-steel-grey.webp",
  system: {
    key, category: "starship", cost: 0, weight: 0, quantity: 1, availability: AV[av] ?? "", equipped: false, special: "", modifiers: [], source: SRC,
    description: `<p><strong>Pontos de instalação (emplacement):</strong> ${ep} · <strong>Tamanho:</strong> ${size || "qualquer"} · <strong>Custo:</strong> ${cost}</p>${desc ? `<p>${desc}</p>` : ""}`
  }
});
const RULES = "Custo \"base\" × modificador de tamanho da nave (Enorme ×1, Gigantesco ×2, Colossal ×5, fragata ×50, cruzador ×500, estação ×5.000). Instalação: dias = pontos × modificador ÷ trabalhadores; Mechanics CD 20 +1 por ponto. Sem pontos livres: +2 dias e +5 na CD por ponto faltante, +20% no custo, e a nave conta como usada.";

export const systems = [
  // Movimento (Tabela 3-3)
  sys("Atmospheric Thruster", "atmo-thruster", 2, "C", "Colossal ou menor", "2.000 base", "+10% de velocidade máxima e deslocamento de voo em atmosfera."),
  sys("Atmospheric Thruster, Advanced", "atmo-thruster-adv", 5, "C", "Gigantesco ou menor", "5.000 base", "+25% de velocidade e deslocamento de voo em atmosfera."),
  sys("Combat Thruster", "combat-thruster", 1, "C", "Colossal", "2.000 base", "Transporte espacial é tratado como uma categoria menor para ser alvejado por armas capitais e como caça para dogfights e manobras."),
  ...[[".75", 4, "M", "Colossal (cruzador) ou menor", "5.000"], ["1", 3, "L", "Colossal (cruzador) ou menor", "3.000"], ["1.5", 3, "L", "Colossal (cruzador) ou menor", "2.500"], ["2", 3, "C", "", "2.000"], ["3", 2, "C", "", "1.500"], ["4", 2, "C", "", "1.000"], ["5", 2, "C", "", "500"], ["6", 2, "C", "", "400"], ["8", 1, "C", "", "300"], ["10", 1, "C", "", "200"], ["15", 1, "C", "", "100"]]
    .map(([c, ep, av, size, cost]) => sys(`Hyperdrive, classe ${c}`, `hyperdrive-${c.replace(".", "-")}`, ep, av, size, `${cost} base`, "Hiperpropulsores em caças são sempre modificações não padrão (pontos ×2, custo ×5); alternativas: trenó (sled, −2 Des) e anel (ring, −4 Des, ação padrão e Pilot CD 10 para acoplar).")),
  sys("Maneuvering Jets +2", "maneuvering-jets-2", 2, "C", "", "2.000 base", "+2 de equipamento na Destreza da nave."),
  sys("Maneuvering Jets +4", "maneuvering-jets-4", 3, "C", "Colossal ou menor", "5.000 base", "+4 de equipamento na Destreza da nave."),
  sys("Maneuvering Jets +6", "maneuvering-jets-6", 4, "L", "Gigantesco ou menor", "10.000 base", "+6 de equipamento na Destreza da nave."),
  sys("Navicomputer, Limited", "navicomputer-limited", 0, "C", "", "500", "Guarda só dois saltos (caças)."),
  sys("Navicomputer", "navicomputer", 1, "L", "", "2.000", "+5 em Use Computer para astrogação; permite astrogar sem treino."),
  sys("Navicomputer, Advanced", "navicomputer-advanced", 2, "L", "", "20.000", "+10 em Use Computer para astrogação."),
  sys("SubLight Accelerator Motor (SLAM)", "slam", 2, "M", "Gigantesco ou menor", "25.000 base", "+5 em Pilot para aumentar a velocidade (+10 em movimento total)."),
  ...[[1, 2, "C", "", "1.000"], [2, 3, "C", "", "2.000"], [3, 4, "L", "Colossal (cruzador) ou menor", "5.000"], [4, 5, "R", "Colossal (cruzador) ou menor", "10.000"], [5, 6, "M", "Colossal ou menor", "20.000"], [6, 7, "M", "Gigantesco ou menor", "100.000"]]
    .map(([sp, ep, av, size, cost]) => sys(`Sublight Drive (deslocamento ${sp})`, `sublight-${sp}`, ep, av, size, `${cost} base`, `Deslocamento em escala de nave ${sp}.`)),
  // Defesa (Tabela 3-4)
  sys("Armor +1", "ship-armor-1", 2, "L", "", "2.000 base", "+1 de equipamento no bônus de armadura da nave."),
  sys("Armor +2", "ship-armor-2", 5, "R", "Colossal ou maior", "5.000 base"),
  sys("Armor +3", "ship-armor-3", 10, "M", "Colossal (fragata) ou maior", "10.000 base"),
  sys("Armor +4", "ship-armor-4", 20, "M", "Colossal (cruzador) ou maior", "20.000 base"),
  sys("Jamming Suite", "jamming-suite", 1, "C", "", "5.000 base", "Ação rápida contra um alvo a até 6 quadrados: −4 (caças), −2 (transportes) em Use Computer de comunicação e sensores e no controle de tiro (Int do alvo não abaixo de +0). Superar: Use Computer resistido (ação rápida)."),
  sys("Jamming Array", "jamming-array", 5, "C", "Colossal ou maior", "20.000 base", "Como o suite, mas afeta todas as naves inimigas a até 6 quadrados (−6 caças, −4 transportes, −2 capitais)."),
  sys("Regenerating Shields", "regenerating-shields", 2, "R", "", "5.000 base", "Recarregar escudos restaura 10 (em vez de 5) até o máximo."),
  sys("Reinforced Bulkheads +10%", "bulkheads-10", 2, "C", "", "2.000 base", "+10% de PV (não acumulam entre si)."),
  sys("Reinforced Bulkheads +20%", "bulkheads-20", 5, "L", "", "5.000 base", "+20% de PV."),
  sys("Reinforced Bulkheads +30%", "bulkheads-30", 10, "R", "", "10.000 base", "+30% de PV."),
  ...[[10, 1, "", "750"], [15, 1, "", "1.000"], [20, 1, "Gigantesco ou maior", "1.250"], [25, 1, "Gigantesco ou maior", "1.500"], [30, 2, "Gigantesco ou maior", "2.000"], [35, 2, "Gigantesco ou maior", "2.500"], [40, 2, "Colossal ou maior", "3.000"], [45, 2, "Colossal ou maior", "4.000"], [50, 3, "Colossal ou maior", "5.000"], [55, 3, "Colossal ou maior", "6.000"], [60, 3, "Colossal (fragata) ou maior", "8.000"], [70, 3, "Colossal (fragata) ou maior", "10.000"], [80, 4, "Colossal (fragata) ou maior", "12.500"], [90, 4, "Colossal (fragata) ou maior", "15.000"], [100, 5, "Colossal (fragata) ou maior", "20.000"], [125, 6, "Colossal (fragata) ou maior", "25.000"], [150, 7, "Colossal (cruzador) ou maior", "30.000"], [175, 8, "Colossal (cruzador) ou maior", "40.000"], [200, 10, "Colossal (cruzador) ou maior", "50.000"]]
    .map(([sr, ep, size, cost]) => sys(`Shields, SR ${sr}`, `shields-sr${sr}`, ep, "C", size, `${cost} base`, `Escudo defletor SR ${sr} (ajuste o SR na ficha do veículo).`)),
  // Acessórios (Tabela 3-7)
  sys("Cargo Jettison System", "cargo-jettison", 1, "L", "", "1.000 base", "Ação rápida: descarta parte ou toda a carga em movimento; notar exige Perception ou Use Computer CD 30."),
  sys("Cargo Pod, Light", "cargo-pod-light", 0, "C", "Gigantesco ou maior", "500 base", "+ (modificador) toneladas de carga; −2 na Destreza (mín. 1). Destacável (cápsula de fuga) por 5× o custo."),
  sys("Cargo Pod, Medium", "cargo-pod-medium", 1, "C", "Colossal ou maior", "1.000 base", "+ (modificador × 5) toneladas; −2 Des."),
  sys("Cargo Pod, Heavy", "cargo-pod-heavy", 2, "C", "Colossal (fragata) ou maior", "1.500 base", "+ (modificador × 10) toneladas; −2 Des."),
  sys("Cloaking Device, Hibridium", "cloak-hibridium", 3, "M", "Colossal ou maior", "50.000 base", "Camuflagem total e Stealth para se esgueirar; a nave também trata todos os outros como em camuflagem total (cegueira dupla)."),
  sys("Cloaking Device, Stygium", "cloak-stygium", 1, "M", "Enorme ou maior", "100.000.000 base", "Camuflagem total, sem a cegueira dupla."),
  sys("Cryogenic Chambers", "cryogenic-chambers", 2, "C", "Colossal ou maior", "500 base", "Carrega (modificador ÷ 5) criaturas Médias em estase."),
  sys("Docking Clamp", "docking-clamp", 1, "C", "Colossal (fragata) ou maior", "2.000 base", "Acopla naves menores, que viajam juntas no hiperespaço; dano ≥ Limiar as solta."),
  sys("Droid Repair Team", "droid-repair-team", 1, "C", "Colossal ou maior", "5.000 base", "Quando a nave desce na trilha, a equipe improvisa reparos sozinha (Mechanics +13), subindo +1 passo."),
  sys("Escape Pod, Small Lifeboat", "escape-pod-small", 1, "C", "Colossal ou maior", "400 base"),
  sys("Escape Pod, Large Lifeboat", "escape-pod-large", 2, "C", "Colossal (fragata) ou maior", "800 base"),
  sys("Extended Range", "extended-range", 2, "C", "", "100 base", "Aumenta a autonomia (suprimentos)."),
  sys("Hangar Bay", "hangar-bay", 8, "C", "Colossal (fragata) ou maior", "10 base"),
  sys("Hangar Bay, Concealed", "hangar-bay-concealed", 40, "R", "Colossal (fragata) ou maior", "1.000 base"),
  sys("HoloNet Transceiver", "holonet-transceiver", 4, "R", "Colossal ou maior", "50.000 base"),
  sys("Hypertransceiver", "hypertransceiver", 1, "L", "", "2.000 base", "Comunicação entre sistemas estelares."),
  sys("Luxury Upgrade, Basic", "luxury-basic", 1, "C", "", "10.000 base"),
  sys("Luxury Upgrade, Advanced", "luxury-advanced", 1, "C", "", "20.000 base"),
  sys("Luxury Upgrade, Extreme", "luxury-extreme", 1, "C", "", "50.000 base"),
  sys("Medical Suite", "medical-suite", 1, "C", "Colossal ou maior", "3.000 base", "Conta como kit médico e de cirurgia; tanque de bacta."),
  sys("Passenger Seating", "passenger-seating", 1, "C", "", "200 base"),
  sys("Passenger Quarters", "passenger-quarters", 10, "C", "Colossal ou maior", "500 base"),
  sys("Sensor Array Computer +2", "sensor-array-2", 1, "C", "", "5.000 base", "+2 de equipamento em Use Computer com sensores."),
  sys("Sensor Array Computer +4", "sensor-array-4", 2, "C", "", "25.000 base"),
  sys("Sensor Array Computer +6", "sensor-array-6", 3, "L", "", "50.000 base"),
  sys("Sensor Enhancement Package", "sensor-enhancement", 1, "C", "", "15.000 base"),
  sys("Slave Circuits, Basic", "slave-circuits-basic", 1, "C", "", "1.000 base", "A nave voa até um ponto ou segue ordens simples sozinha."),
  sys("Slave Circuits, Advanced", "slave-circuits-advanced", 1, "C", "", "4.000 base"),
  sys("Slave Circuits, Recall", "slave-circuits-recall", 0, "M", "Colossal ou menor", "6.000 base"),
  sys("Smuggler's Compartments", "smuggler-compartments", 1, "I", "", "200 base", "Compartimentos ocultos (Perception para achar)."),
  sys("Transponder, IFF", "transponder-iff", 0, "M", "", "1.000"),
  sys("Transponder, Masked", "transponder-masked", 0, "I", "", "200 base"),
  sys("Transponder, Disguised (1)", "transponder-disguised-1", 0, "I", "", "500 base"),
  sys("Transponder, Disguised (2)", "transponder-disguised-2", 0, "I", "", "1.000 base"),
  sys("Transponder, Disguised (3)", "transponder-disguised-3", 0, "I", "", "2.000 base")
].map(s => { s.system.description += `<p class="hint">${RULES}</p>`; return s; });

// Armas de nave (Tabela 3-5) como vehicleWeapon
const vw = (name, type, dmg, x, ep, av, cost, o = {}) => ({
  name, type: "vehicleWeapon", img: "icons/weapons/guns/gun-blunderbuss-gold.webp",
  system: {
    key: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), source: SRC, weaponType: type, station: "gunner", gunner: 1,
    damage: dmg, multiplier: x, ion: type === "ion", autofire: !!o.auto, area: o.area ?? "", penetration: o.pen ?? 0, grapple: 0, attackBonus: 0, damageBonus: 0,
    count: 1, ammo: { value: o.ammo ?? 0, max: o.ammo ?? 0 }, special: o.special ?? "",
    description: `<p><strong>Pontos de instalação:</strong> ${ep} · <strong>Disponibilidade:</strong> ${av} · <strong>Custo:</strong> ${cost}.${o.desc ? ` ${o.desc}` : ""}</p>`
  }
});
export const shipWeapons = [
  vw("Blaster Cannon, Light", "blaster", "3d10", 2, 1, "Licenciada", "1.200", { auto: true }),
  vw("Blaster Cannon, Medium", "blaster", "4d10", 2, 1, "Restrita", "2.500", { auto: true }),
  vw("Blaster Cannon, Heavy", "blaster", "5d10", 2, 2, "Militar", "5.500", { auto: true }),
  vw("Laser Cannon, Light", "laser", "3d10", 2, 1, "Licenciada", "1.500"),
  vw("Laser Cannon, Medium", "laser", "4d10", 2, 1, "Restrita", "4.000"),
  vw("Laser Cannon, Heavy", "laser", "5d10", 2, 2, "Militar", "6.000"),
  vw("Ion Cannon, Light", "ion", "3d10", 2, 1, "Licenciada", "2.000"),
  vw("Ion Cannon, Medium", "ion", "5d10", 2, 2, "Restrita", "3.000"),
  vw("Ion Cannon, Heavy", "ion", "3d10", 5, 5, "Militar", "6.000", { desc: "Só Colossal ou maior." }),
  vw("Hapan Triple Ion Cannon", "ion", "5d10", 5, 3, "Ilegal", "12.000", { auto: true, desc: "Só Colossal ou maior; funciona como arma de defesa de ponto (sem penalidade contra alvos menores que Colossal)." }),
  vw("Ion Bomb", "ion", "5d10", 1, 0, "Militar", "500", { area: "Raio 10", desc: "Só em atmosfera, −5 no ataque, contra um quadrado abaixo da nave." }),
  vw("Concussion Missile, Light", "missile", "7d10", 2, 0, "Militar", "500", { area: "Splash 4", desc: "Lançador leve: 2 pontos, 2.000 cr, 6 mísseis." }),
  vw("Concussion Missile, Medium", "missile", "9d10", 2, 0, "Militar", "750", { area: "Splash 4", desc: "Lançador médio: 5 pontos, 3.500 cr, 16 mísseis." }),
  vw("Concussion Missile, Heavy", "missile", "9d10", 5, 0, "Militar", "2.000", { area: "Splash 4", desc: "Só Colossal ou maior. Lançador pesado: 20 pontos, 30.000 cr, 30 mísseis." }),
  vw("Proton Torpedo", "missile", "9d10", 2, 0, "Militar", "800", { area: "Splash 4", desc: "Lançador: 1 ponto, 2.500 cr, 3 torpedos (+25% do custo por torpedo extra, até 16)." }),
  vw("Shieldbuster Torpedo", "missile", "10d10", 2, 0, "Militar", "1.000", { desc: "Lançador: 3 pontos, 10.000 cr, 4 torpedos. Metade do dano contra tudo menos escudos; se superar o SR, o SR cai 10." }),
  vw("Space Mine, Standard", "missile", "7d10", 2, 0, "Militar", "1.000", { desc: "Ataque +5 contra a Reflexos de quem entra no quadrado (metade se errar); Stealth +5 para notar. Lançador: 2 pontos, 5.000 cr, 6 minas." }),
  vw("Space Mine, Advanced", "missile", "9d10", 2, 0, "Militar", "5.000", { desc: "Ataque +10." }),
  vw("Space Mine, Heavy", "missile", "6d10", 5, 0, "Militar", "5.000", { desc: "Ataque +5; −20 contra alvos menores que Colossal." }),
  vw("Turbolaser, Light", "turbolaser", "3d10", 5, 2, "Militar", "5.000", { desc: "Só Colossal ou maior." }),
  vw("Turbolaser, Medium", "turbolaser", "5d10", 5, 5, "Militar", "10.000", { desc: "Só Colossal ou maior." }),
  vw("Turbolaser, Heavy", "turbolaser", "7d10", 5, 10, "Militar", "20.000", { desc: "Só Colossal ou maior." }),
  vw("Tractor Beam", "tractor", "0", 1, 10, "Licenciada", "10.000 base", { desc: "Modificação não padrão em transportes e caças." }),
  vw("Gravity Well Projector", "tractor", "0", 1, 5, "Militar", "50.000", { desc: "Só Colossal ou maior. Ataque contra Reflexos 10 numa área 4×4: naves que começam o turno nela não ativam o hiperpropulsor." })
];
export const SHIP_WEAPON_NOTES = "Modificadores de arma (Tabela 3-5): autoblaster (+0 pt, custo ×2, fogo automático), canhão duplo (+1d10, ×3), quádruplo (+2d10, +1 pt, ×5), aprimoramentos de canhão (+1d10, +1 pt, ×2; avançados +2d10, +2 pt, ×5), fire-link de 2 armas (+1d10, +1 pt, ×2) e de 4 (+2d10, +2 pt, ×4), defesa de ponto (+4.000 cr), docking gun (+1 pt, +1.000 cr), droid jammer (+2 de equipamento contra naves droides a até 5 quadrados).";
