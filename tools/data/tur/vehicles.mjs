// The Unknown Regions — Cap. 2: veículos e naves de exploração. Mesmo formato de tools/data/vehicles.mjs.
const notes = o => `<p><em>The Unknown Regions</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
const v = (name, folder, o) => ({ name, folder, source: "The Unknown Regions", ...o });
const SK = (i, m, p, pi, u) => ({ initiative: i, mechanics: m, perception: p, pilot: pi, ...(u === undefined ? {} : { useComputer: u }) });
const CAP20 = "−20 contra alvos menores que Colossal";
const GROUND = "Veículo terrestre";

export default [
  /* ---------------- Terrestres ---------------- */
  v("Gallis-Tech 48 Roller Wheel Bike", "Speeders", {
    cl: 1, cat: "speeder", type: `${GROUND} (rodas)`, size: "large", ab: [18, 18, 12], armor: 2,
    def: [15, 14], hp: 40, dr: 5, dt: 19, speed: [10, 0], maxv: "330 km/h", bab: 0, crew: "normal", sk: SK(8, 5, 5, 8),
    crewText: "1 (normal)", passengers: "1", cargo: "20 kg", cons: "1 dia", avail: "Licenciado", cost: "8.000 (1.500 usado)", space: "2×2", cover: "+5", w: [],
    notes: notes({ Descrição: "Monociclo a jato de reconhecimento e corrida; estável em terreno áspero. Grupos de resistência às vezes o armam com blasters leves." })
  }),
  v("All-Terrain Roller", "Speeders", {
    cl: 1, cat: "speeder", type: `${GROUND} (rodas)`, size: "medium", ab: [14, 20, 12], armor: 1,
    def: [16, 12], hp: 20, dr: 0, dt: 12, speed: [10, 0], maxv: "120 km/h", bab: 0, crew: "normal", sk: SK(10, 5, 5, 10),
    crewText: "1 (normal)", passengers: "1", cargo: "Nenhuma", cons: "1 dia", avail: "Licenciado", cost: "3.500 (500 usado)", space: "1 quadrado", cover: "Nenhuma", w: [],
    notes: notes({ Descrição: "Veículo de 3 ou 4 rodas, lento porém seguro, fácil de manter onde faltam peças de repulsor." })
  }),
  v("Compact Assault Vehicle PX-10", "Speeders", {
    cl: 7, cat: "speeder", type: `${GROUND} (esteiras)`, size: "large", ab: [32, 14, 14], armor: 5,
    def: [16, 21], hp: 110, dr: 5, dt: 26, speed: [8, 0], maxv: "260 km/h", bab: 5, crew: "expert", sk: SK(9, 8, 8, 9),
    crewText: "1 (expert)", passengers: "Nenhum", cargo: "100 kg", cons: "2 semanas", avail: "Militar", cost: "Não está à venda (25.000 no mercado negro)", space: "2×2", cover: "Total",
    w: [{ n: "Medium Blaster Cannon", t: "blaster", st: "pilot", atk: 9, dmg: "5d10", x: 1 }],
    notes: notes({ Descrição: "Veículo de vigilância imperial de um tripulante; ágil mas vulnerável a interferência de sensores." })
  }),
  v("Groundcar", "Speeders", {
    cl: 0, cat: "speeder", type: `${GROUND} (rodas)`, size: "huge", ab: [20, 14, 12], armor: 3,
    def: [13, 15], hp: 50, dr: 5, dt: 25, speed: [8, 0], maxv: "160 km/h", bab: 0, crew: "normal", sk: SK(5, 5, 5, 5),
    crewText: "1 (normal)", passengers: "4", cargo: "300 kg", cons: "1 semana", avail: "Licenciado", cost: "4.000 (1.000 usado)", space: "3×3", cover: "Total", w: [],
    notes: notes({ Descrição: "Carro de 4 ou 6 rodas, mais lento e menos confiável que um landspeeder; modificações comuns permitem sair da estrada." })
  }),
  v("Land Crawler", "Speeders", {
    cl: 1, cat: "speeder", type: `${GROUND} (esteiras)`, size: "huge", ab: [30, 10, 12], armor: 4,
    def: [12, 20], hp: 100, dr: 5, dt: 30, speed: [6, 0], maxv: "95 km/h", bab: 0, crew: "normal", sk: SK(3, 5, 5, 3),
    crewText: "1 (normal)", passengers: "6", cargo: "5 toneladas", cons: "1 semana", avail: "Licenciado", cost: "7.500 (3.000 usado)", space: "3×3", cover: "Total", w: []
  }),
  v("ARK-II Series Landmaster", "Speeders", {
    cl: 8, cat: "speeder", type: `${GROUND} (esteiras, anfíbio)`, size: "gargantuan", ab: [42, 14, 14], armor: 9,
    def: [16, 26], hp: 240, dr: 10, dt: 46, speed: [8, 0], maxv: "240 km/h", bab: 0, crew: "normal", sk: SK(2, 5, 5, 2),
    crewText: "3 (normal)", passengers: "10", cargo: "800 kg", cons: "1 mês", avail: "Restrito", cost: "120.000 (30.000 usado)", space: "4×4", cover: "Total",
    w: [{ n: "Medium Blaster Cannons", t: "blaster", st: "gunner", atk: 2, dmg: "5d10", x: 1, count: 2 }],
    notes: notes({ Descrição: "Anfíbio de quatro conjuntos de três rodas e blindagem tripla de duranium; peças de reposição fáceis de achar." })
  }),
  v("Mobile Recon/Research Vehicle (MR/RV)", "Speeders", {
    cl: 0, cat: "speeder", type: `${GROUND} (speeder)`, size: "colossal", ab: [38, 14, 16], armor: 13,
    def: [15, 24], hp: 200, dr: 15, dt: 74, speed: [8, 0], maxv: "200 km/h", bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2),
    crewText: "6 (skilled)", passengers: "4", cargo: "2 toneladas", cons: "2 meses", craft: "2 speeder bikes", avail: "Licenciado", cost: "220.000 (90.000 usado)", space: "12×12", cover: "Total",
    w: [{ n: "Light Quad Blaster Cannon", t: "blaster", st: "gunner", atk: 5, dmg: "5d10", x: 1 }],
    notes: notes({ Descrição: "Base móvel de pesquisa da Science and Culture Administration (fim da Antiga República)." })
  }),
  v("Ikas-Adno 22-B Nightfalcon Speeder Bike", "Speeders", {
    cl: 2, cat: "speeder", type: `${GROUND} (speeder)`, size: "large", ab: [16, 23, 14], armor: 1,
    def: [16, 13], hp: 32, dr: 5, dt: 18, speed: [12, 0], maxv: "400 km/h", bab: 0, crew: "normal", sk: SK(15, 5, 5, 15),
    crewText: "1 (normal)", passengers: "1", cargo: "4 kg", cons: "1 dia", avail: "Licenciado", cost: "6.250 (1.000 usado)", space: "2×2", cover: "Nenhuma",
    w: [{ n: "Laser Cannon", t: "laser", st: "pilot", atk: 2, dmg: "4d10", x: 1, auto: true }]
  }),
  v("SRV-1 Scout and Retrieval Vehicle", "Speeders", {
    cl: 6, cat: "speeder", type: `${GROUND} (esteiras)`, size: "huge", ab: [38, 14, 12], armor: 4,
    def: [14, 24], hp: 140, dr: 5, dt: 34, speed: [8, 0], maxv: "275 km/h", bab: 2, crew: "skilled", sk: SK(6, 6, 6, 6),
    crewText: "3 (skilled)", passengers: "8", cargo: "3 toneladas", cons: "1 semana", avail: "Restrito", cost: "7.500 (3.000 usado)", space: "3×3", cover: "Total",
    w: [{ n: "Medium Blaster Cannon", t: "blaster", st: "gunner", atk: 3, dmg: "4d10", x: 1, count: 2 }],
    notes: notes({ Descrição: "Transporte de tropas e reconhecimento da Nova República; a versão civil é desarmada." })
  }),
  v("Tangan Aerosled Mark III", "Airspeeders", {
    cl: 5, cat: "airspeeder", type: "Veículo aéreo (airspeeder)", size: "large", ab: [18, 22, 16], armor: 1,
    def: [16, 14], hp: 32, dr: 5, dt: 19, speed: [12, 3], maxv: "780 km/h", bab: 2, crew: "skilled", sk: SK(11, 6, 6, 11),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "24 kg", cons: "1 dia", avail: "Militar", cost: "22.000 (12.000 usado)", space: "2×2 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Laser Cannon", t: "laser", st: "pilot", atk: 7, dmg: "4d10", x: 1, auto: true }],
    notes: notes({ Descrição: "Um dos menores airspeeders; a versão civil é desarmada." })
  }),
  v("Landing Sphere", "Airspeeders", {
    cl: 2, cat: "airspeeder", type: "Veículo aéreo (airspeeder)", size: "huge", ab: [30, 10, 10], armor: 4,
    def: [12, 20], hp: 100, dr: 5, dt: 30, speed: [12, 3], maxv: "650 km/h", bab: 0, crew: "normal", sk: SK(3, 5, 5, 3, 5),
    crewText: "1 (normal)", passengers: "7", cargo: "5 toneladas", cons: "1 semana", avail: "Licenciado", cost: "Incluída na SkyBlind", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)", w: [],
    notes: notes({ Descrição: "Esfera auxiliar da SkyBlind para descer à superfície; sem ela, a carga da SkyBlind dobra." })
  }),

  /* ---------------- Naves ---------------- */
  v("Deep-X Explorer", "Caças Estelares", {
    cl: 5, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [34, 18, 16], armor: 6,
    def: [15, 22], hp: 60, dr: 10, dt: 42, speed: [12, 3], maxv: "1.000 km/h", bab: 0, crew: "normal", sk: SK(4, 5, 5, 4, 5),
    crewText: "3 (normal)", passengers: "3", cargo: "50 toneladas", cons: "6 meses", hyper: "×1 (reserva ×8), navicomputador",
    avail: "Licenciado", cost: "135.000 (55.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Light Blaster Cannon", t: "blaster", st: "gunner", atk: 3, dmg: "2d10", x: 2, count: 2 }],
    notes: notes({ Descrição: "Iate DPx convertido para exploração, com hiperpropulsor duplo." })
  }),
  v("Drexl-class Starfighter", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [46, 20, 14], armor: 8,
    def: [18, 28], hp: 150, dr: 10, sr: 10, dt: 48, speed: [16, 4], maxv: "1.050 km/h", bab: 2, crew: "skilled", sk: SK(6, 6, 6, 6, 6),
    crewText: "2 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "70 kg", cons: "2 dias", payload: "12 mísseis de concussão",
    avail: "Militar", cost: "165.000 (100.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [
      { n: "Dual Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "5d10", x: 2, auto: true },
      { n: "Concussion Missiles", t: "missile", st: "pilot", atk: 6, dmg: "8d10", x: 2, area: "Splash 4", ammo: 12 }
    ],
    notes: notes({ Astromecânico: "Mechanics e Use Computer +13 com o droide", Descrição: "Caça de defesa planetária da SoroSuub, protótipo do Preybird." })
  }),
  v("JumpMaster 5000 Scout Ship", "Transportes", {
    cl: 8, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [42, 16, 14], armor: 12,
    def: [15, 26], hp: 120, dr: 15, sr: 15, dt: 76, speed: [16, 4], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(-1, 6, 6, -1, 6),
    crewText: "1 (skilled)", passengers: "1", cargo: "50 toneladas", cons: "4 meses", hyper: "×3 (reserva ×15), navicomputador",
    avail: "Restrito", cost: "110.000 (40.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "4d10", x: 2 }],
    notes: notes({ Descrição: "JM-5K de longo alcance para um tripulante; hiperpropulsor lento e propenso a falhas (a Punishing One de Dengar é um exemplo famoso)." })
  }),
  v("MRX-BR Pacifier Combat/Contact Vessel", "Transportes", {
    cl: 9, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [34, 14, 16], armor: 11,
    def: [13, 22], hp: 60, dr: 15, sr: 30, dt: 72, speed: [16, 5], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "2 (skilled)", passengers: "3", cargo: "25 toneladas", cons: "1 ano", payload: "8 torpedos de prótons", hyper: "×1 (reserva ×8)",
    avail: "Licenciado", cost: "170.000 (100.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "gunner", atk: 5, dmg: "4d10", x: 2, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "gunner", atk: 5, dmg: "9d10", x: 2, area: "Splash 4", ammo: 8 }
    ],
    notes: notes({ Descrição: "Nave de primeiro contato do Corpo de Batedores Imperial, com sensores poderosos." })
  }),
  v("Mu-2 Model 2 Shuttle", "Transportes", {
    cl: 8, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [42, 14, 14], armor: 12,
    def: [14, 26], hp: 120, dr: 15, sr: 25, dt: 76, speed: [12, 4], maxv: "850 km/h", bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "2 (skilled)", passengers: "14", cargo: "100 toneladas", cons: "6 meses", hyper: "×2 (reserva ×20), navicomputador",
    avail: "Restrito", cost: "160.000 (110.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Laser Cannons", t: "laser", st: "copilot", atk: 4, dmg: "5d10", x: 2, auto: true }],
    notes: notes({ Sensores: "+5 de equipamento em Perception e Use Computer para operar os sensores da nave", Descrição: "Modelo 1: até 24 passageiros com pouco espaço; Modelo 2 (este): cabines fechadas para batedores." })
  }),
  v("Preybird-class Starfighter", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [36, 24, 18], armor: 6,
    def: [18, 23], hp: 75, dr: 10, sr: 20, dt: 43, speed: [16, 4], maxv: "1.150 km/h", bab: 2, crew: "skilled", sk: SK(8, 6, 6, 8, 6),
    crewText: "2 (skilled)", passengers: "Nenhum", cargo: "15 kg", cons: "4 dias", payload: "10 mísseis de concussão", hyper: "×3, navicomputador (5 saltos)",
    avail: "Raro, Militar", cost: "84.000 (50.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "gunner", atk: 6, dmg: "5d10", x: 2, auto: true },
      { n: "Concussion Missiles", t: "missile", st: "gunner", atk: 6, dmg: "8d10", x: 2, ammo: 10 }
    ]
  }),
  v("Mesens SCT Scout Craft", "Naves Capitais", {
    cl: 12, cat: "capital", type: "Transporte espacial (fragata)", size: "colossalFrigate", ab: [58, 10, 18], armor: 11,
    def: [11, 34], hp: 660, dr: 15, sr: 60, dt: 134, speed: [12, 3], maxv: "820 km/h", bab: 0, crew: "normal", sk: SK(-5, 5, 5, -5, 5),
    crewText: "2 (normal)", passengers: "8", cargo: "275 toneladas", cons: "3 meses", hyper: "×3 (reserva ×12)",
    avail: "Licenciado", cost: "1.200.000 (720.000 usado)", space: "1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Dual Turbolaser Turret", t: "turbolaser", st: "gunner", atk: 4, dmg: "6d10", x: 5, special: CAP20 },
      { n: "Point-Defense Dual Laser Cannon", t: "pointDefense", st: "gunner", atk: 4, dmg: "5d10", x: 2, auto: true }
    ],
    notes: notes({ Descrição: "Batedor de longo alcance com defesas pesadas e sensores superiores, mas pouca autonomia." })
  }),
  v("SkyBlind Recon Ship", "Transportes", {
    cl: 8, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [50, 10, 10], armor: 13,
    def: [13, 30], hp: 180, dr: 15, sr: 45, dt: 80, speed: [12, 3], maxv: "650 km/h", bab: 0, crew: "normal", sk: SK(-5, 5, 5, -5, 5),
    crewText: "1 (normal)", passengers: "7", cargo: "50 toneladas", cons: "6 meses", craft: "1 esfera de pouso", payload: "6 torpedos de prótons", hyper: "×3 (reserva ×20)",
    avail: "Licenciado", cost: "650.000 (400.000 usado)", space: "10×10 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 2, dmg: "9d10", x: 2, area: "Splash 4", ammo: 6 }],
    notes: notes({ Furtividade: "casco esférico e defletores de sensores: a nave é praticamente invisível a sensores", Descrição: "Nave de reconhecimento da Loronar; ver a Landing Sphere." })
  }),
  v("Star Seeder-class Colony Ship", "Naves Capitais", {
    cl: 9, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [55, 14, 12], armor: 10,
    def: [12, 32], hp: 400, dr: 15, sr: 45, dt: 132, speed: [12, 2], maxv: "800 km/h", bab: 0, crew: "normal", sk: SK(-3, 5, 5, -3, 5),
    crewText: "169 (normal)", passengers: "800", cargo: "7.500 toneladas", cons: "5 anos", craft: "1 shuttle", hyper: "×3 (reserva ×15), navicomputador",
    avail: "Licenciado", cost: "3.000.000 (1.000.000 usado)", space: "1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 5, dmg: "3d10", x: 5, count: 6, special: `2 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 5, dmg: "0", x: 1, grp: 42, special: `2 artilheiros; ${CAP20}` }
    ],
    notes: notes({ Descrição: "Nave colonial reconfigurável da Kuat Drive Yards, capaz de entrar em atmosfera." })
  }),
  v("Vaya-class Scout Ship", "Transportes", {
    cl: 9, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [38, 22, 16], armor: 11,
    def: [17, 24], hp: 90, dr: 15, sr: 35, dt: 74, speed: [12, 3], maxv: "700 km/h", bab: 0, crew: "normal", sk: SK(1, 5, 5, 1, 5),
    crewText: "3 (normal)", passengers: "4", cargo: "60 toneladas", cons: "1 mês", payload: "4 projéteis de concussão", hyper: "×4 (reserva ×15), navicomputador",
    avail: "Licenciado", cost: "45.000 (15.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Light Laser Cannon", t: "laser", st: "gunner", atk: 3, dmg: "3d10", x: 2, auto: true },
      { n: "Concussion Projectiles", t: "missile", st: "gunner", atk: 3, dmg: "5d10", x: 2, ammo: 4 }
    ],
    notes: notes({ Falha: "sempre que descer na trilha de condição por dano, o piloto faz Pilot CD 20 ou a nave não se move até o fim do próximo turno do piloto (os motores iônicos de bombordo desligam)" })
  }),
  /* ---------------- Ameaças (Cap. 5) ---------------- */
  v("Killik Dartship", "Caças Estelares", {
    cl: 9, cat: "starfighter", type: "Caça estelar (Killik)", size: "huge", ab: [39, 20, 14], armor: 4,
    def: [17, 24], hp: 100, dr: 10, dt: 34, speed: [16, 5], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(9, 6, 6, 9, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "70 kg", cons: "2 dias", avail: "Militar", cost: "Não está à venda", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannon", t: "laser", st: "pilot", atk: 6, dmg: "4d10", x: 2, auto: true }],
    notes: notes({ "Dartship Ram": "ao abalroar com sucesso uma nave inimiga, causa 6d6+14 em vez do dano normal de colisão; cada dartship que colidir com a mesma nave na rodada causa +1 dado", Descrição: "caça de spitcrete com um único piloto Killik; a Colônia usa táticas suicidas de abalroamento" })
  }),
  v("Royal Fortune Light Clipper", "Naves Capitais", {
    cl: 15, cat: "capital", type: "Nave capital (Tof)", size: "colossalFrigate", ab: [46, 14, 14], armor: 11,
    def: [13, 28], hp: 700, dr: 15, sr: 80, dt: 128, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "480 (skilled)", passengers: "200", cargo: "8.000 toneladas", cons: "1 ano", craft: "14 caças, 4 escaleres (40 tripulantes cada)", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannon Battery", t: "laser", st: "gunner", atk: 12, dmg: "4d10", x: 2, auto: true, count: 8, special: "5 artilheiros" },
      { n: "Quad Laser Cannon Battery", t: "laser", st: "gunner", atk: 6, dmg: "5d10", x: 2, auto: true, count: 2, special: "2 artilheiros" },
      { n: "Fotia's Fire Cannon", t: "missile", st: "gunner", atk: 4, dmg: "7d10", x: 2, special: "gosma superaquecida: mais 2d10×2 nas duas rodadas seguintes" }
    ],
    notes: notes({ Velas: "tiros nas velas de energia podem causar surtos que desativam redes de bordo", Descrição: "galeão a vela de energia da armada Tof, com 38 canhões laser nos costados" })
  }),
  v("Surfeik Cruiser", "Naves Capitais", {
    cl: 16, cat: "capital", type: "Nave capital (Vagaari)", size: "colossalCruiser", ab: [91, 14, 16], armor: 12,
    def: [14, 50], hp: 1300, dr: 20, sr: 110, dt: 250, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "500 (skilled)", passengers: "1.500 (prisioneiros)", cargo: "10.000 toneladas", cons: "1 ano", craft: "18 caças, 2 shuttles", hyper: "×2 (reserva ×15), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannon Battery", t: "laser", st: "gunner", atk: 9, dmg: "5d10", x: 2, count: 11, special: "3 artilheiros" },
      { n: "Projectile Launcher", t: "missile", st: "gunner", atk: 5, dmg: "8d10", x: 5, area: "Splash 1", count: 7, special: `${CAP20}; perfura o casco e explode` },
      { n: "Pseudograv Projector", t: "tractor", st: "gunner", atk: 5, dmg: "0", x: 1, area: "2×2 ou 3×3 (escala de nave)", special: "ataque de área contra Reflexos 10: naves que começam o turno na área não ativam o hiperpropulsor; naves no hiperespaço que passam pela área voltam ao espaço normal" }
    ],
    notes: notes({ "Escudos vivos": "bolhas com prisioneiros no casco: −10 no ataque para evitar acertá-las (baterias, área e splash não conseguem evitar)" })
  }),
  v("Wind Skiff", "Speeders", {
    cl: 6, cat: "speeder", type: "Veículo terrestre (speeder a vela)", size: "huge", ab: [31, 18, 10], armor: 2,
    def: [14, 20], hp: 40, dr: 5, dt: 30, speed: [12, 0], maxv: "300 km/h", bab: 0, crew: "normal", sk: SK(7, 5, 5, 7, 5),
    crewText: "1 (normal)", passengers: "4", cargo: "900 kg", cons: "1 dia", avail: "Licenciado", cost: "13.000 (3.500 usado)", space: "3×3", cover: "Nenhuma",
    w: [{ n: "Debris Clearing Laser Cannon", t: "laser", st: "pilot", atk: 0, dmg: "3d10", x: 1 }],
    notes: notes({ Origem: "Volik", Descrição: "veleiro de pradaria movido pelo vento: silencioso e difícil de detectar por não ter célula de energia. Versões com rodas são veículos terrestres com deslocamento no chão em vez de voo." })
  })
];
