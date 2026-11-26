// Knights of the Old Republic Campaign Guide — veículos e naves. Mesmo formato de tools/data/vehicles.mjs.
const notes = o => `<p><em>Knights of the Old Republic Campaign Guide</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
const v = (name, folder, o) => ({ name, folder, source: "Knights of the Old Republic Campaign Guide", ...o });
const SK = (i, m, p, pi, u) => ({ initiative: i, mechanics: m, perception: p, pilot: pi, useComputer: u });
const CAP20 = "−20 contra alvos menores que Colossal";

export default [
  /* ---------------- Cap. 6 ---------------- */
  v("Lhosan AeroChaser Speeder Bike", "Speeders", {
    cl: 1, cat: "speeder", type: "Veículo terrestre (speeder)", size: "large", ab: [16, 20, 10], armor: 1,
    def: [15, 13], hp: 30, dr: 5, dt: 18, speed: [12, 0], maxv: "400 km/h", bab: 0, crew: "normal", sk: SK(9, 5, 5, 9, 5),
    crewText: "1 (normal)", passengers: "Nenhum", cargo: "4 kg", cons: "1 dia", avail: "Licenciado", cost: "5.800 (1.000 usado)", space: "2×2", cover: "Nenhuma", w: [],
    notes: notes({ Descrição: "speeder bike barata e modular; as pontas dianteiras podem esconder armas ou carga" })
  }),
  v("Lhosan Swoop Racer", "Speeders", {
    cl: 2, cat: "speeder", type: "Veículo terrestre (speeder)", size: "large", ab: [18, 16, 12], armor: 1,
    def: [13, 14], hp: 40, dr: 5, dt: 19, speed: [12, 0], maxv: "850 km/h", bab: 2, crew: "skilled", sk: SK(8, 6, 6, 8, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "2 kg", cons: "1 dia", avail: "Restrito", cost: "18.700 (14.300 usado)", space: "3×3", cover: "+5", w: [],
    notes: notes({ Descrição: "swoop de corrida de Taris, muito rápida mas pouco manobrável" })
  }),
  v("Aratech Urban Navigator Speeder Bike", "Airspeeders", {
    cl: 1, cat: "airspeeder", type: "Veículo aéreo (speeder bike com sidecar)", size: "large", ab: [17, 22, 14], armor: 1,
    def: [16, 13], hp: 35, dr: 5, dt: 18, speed: [12, 0], maxv: "500 km/h", bab: 0, crew: "normal", sk: SK(10, 5, 5, 10, 5),
    crewText: "1 (normal)", passengers: "1", cargo: "10 kg", cons: "1 dia", avail: "Licenciado", cost: "9.600 (3.500 usado)", space: "2×2", cover: "+5", w: []
  }),
  v("SoroSuub TT-6 Landspeeder", "Speeders", {
    cl: 1, cat: "speeder", type: "Veículo terrestre (speeder)", size: "large", ab: [19, 18, 12], armor: 1,
    def: [14, 14], hp: 45, dr: 5, dt: 19, speed: [12, 0], maxv: "400 km/h", bab: 0, crew: "normal", sk: SK(8, 5, 5, 8, 5),
    crewText: "1", passengers: "1", cargo: "40 kg", cons: "1 dia", avail: "Licenciado", cost: "12.000 (3.800 usado)", space: "2×2", cover: "+5", w: [],
    notes: notes({ Manutenção: "+2 de equipamento em Mechanics para repará-lo" })
  }),
  v("Ubrikkian PL-90 Luxury Speeder", "Speeders", {
    cl: 2, cat: "speeder", type: "Veículo terrestre (speeder)", size: "huge", ab: [24, 18, 16], armor: 3,
    def: [15, 17], hp: 70, dr: 5, dt: 27, speed: [8, 0], maxv: "280 km/h", bab: 2, crew: "skilled", sk: SK(8, 6, 6, 8, 6),
    crewText: "1 (skilled)", passengers: "7", cargo: "30 kg", cons: "1 dia", avail: "Licenciado", cost: "48.000 (29.000 usado)", space: "3×3", cover: "+5", w: []
  }),
  v("SoroSuub Twin-228 Airspeeder", "Airspeeders", {
    cl: 2, cat: "airspeeder", type: "Veículo aéreo (airspeeder)", size: "huge", ab: [22, 20, 12], armor: 3,
    def: [16, 16], hp: 60, dr: 5, dt: 26, speed: [12, 0], maxv: "800 km/h", bab: 2, crew: "skilled", sk: SK(9, 6, 6, 9, 6),
    crewText: "1 (skilled)", passengers: "1", cargo: "60 kg (460 kg com cápsula de carga)", cons: "1 dia", avail: "Licenciado", cost: "22.000 (13.500 usado); cápsula 1.000", space: "3×3", cover: "+5", w: []
  }),
  v("S-100 Stinger-class Starfighter", "Caças Estelares", {
    cl: 9, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [38, 24, 14], armor: 3,
    def: [18, 24], hp: 90, dr: 5, sr: 30, dt: 34, speed: [16, 4], maxv: "1.150 km/h", bab: 2, crew: "skilled", sk: SK(11, 6, 6, 11, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "30 kg", cons: "1 mês", payload: "8 torpedos de prótons", hyper: "×2, memória de 10 saltos (droide utilitário)",
    avail: "Restrito", cost: "150.000 (90.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 4, dmg: "5d10", x: 2, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 4, dmg: "8d10", x: 2, ammo: 8 }
    ]
  }),
  v("Star Saber XC-01 Starfighter", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [42, 18, 12], armor: 7,
    def: [16, 26], hp: 120, dr: 10, sr: 35, dt: 46, speed: [16, 5], maxv: "1.280 km/h", bab: 2, crew: "skilled", sk: SK(5, 6, 6, 5, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "45 kg", cons: "1 semana", hyper: "×2, memória de 10 saltos (droide utilitário)",
    avail: "Restrito", cost: "145.000 (75.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Heavy Laser Cannons", t: "laser", st: "pilot", atk: 4, dmg: "7d10", x: 2, auto: true }]
  }),
  v("578-R Space Transport", "Transportes", {
    cl: 6, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [39, 10, 12], armor: 12,
    def: [12, 24], hp: 100, dr: 15, dt: 76, speed: [12, 3], maxv: "800 km/h", bab: 0, crew: "normal", sk: SK(-5, 5, 5, -5, 5),
    crewText: "2 (normal)", passengers: "10", cargo: "40 toneladas", cons: "4 meses", hyper: "×3, navicomputador",
    avail: "Licenciado", cost: "75.000 (28.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Laser Cannon", t: "laser", st: "gunner", atk: 1, dmg: "4d10", x: 2, auto: true }],
    notes: notes({ Instalação: "4 pontos de instalação livres (Starships of the Galaxy)", Descrição: "transporte modular da Amalgamated Hyperdyne, cheio de defeitos de fábrica (a Last Resort, de \"Camper\")" })
  }),
  v("G-Type Light Shuttle", "Transportes", {
    cl: 8, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [39, 18, 16], armor: 12,
    def: [16, 24], hp: 100, dr: 15, sr: 30, dt: 74, speed: [12, 3], maxv: "950 km/h", bab: 2, crew: "skilled", sk: SK(0, 6, 6, 0, 6),
    crewText: "1 (skilled)", passengers: "3", cargo: "10 toneladas", cons: "1 semana", hyper: "Nenhum",
    avail: "Restrito", cost: "200.000 (95.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Double Laser Cannons", t: "laser", st: "pilot", atk: 5, dmg: "5d10", x: 2, auto: true }],
    notes: notes({ "Assistência de pilotagem": "pilotos não treinados em Pilot recebem +2 de equipamento em Pilot", Variante: "cápsula de fuga G-Type: só piloto, com hiperpropulsor e suprimentos para vários dias" })
  }),
  v("Lethisk-class Armed Freighter", "Transportes", {
    cl: 10, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [46, 12, 16], armor: 13,
    def: [14, 28], hp: 150, dr: 15, sr: 30, dt: 78, speed: [12, 3], maxv: "900 km/h", bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "3 (skilled)", passengers: "8", cargo: "60 toneladas", cons: "2 meses", payload: "12 mísseis de concussão leves", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Restrito", cost: "470.000 (225.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Double Laser Cannons", t: "laser", st: "gunner", atk: 5, dmg: "6d10", x: 2, auto: true },
      { n: "Light Concussion Missiles", t: "missile", st: "pilot", atk: 5, dmg: "8d10", x: 2, ammo: 12 }
    ],
    notes: notes({ Instalação: "3 pontos de instalação livres" })
  }),
  v("Pelagia Duplex Command Assault Gunship", "Transportes", {
    cl: 12, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [43, 14, 16], armor: 12,
    def: [14, 26], hp: 130, dr: 15, sr: 20, dt: 76, speed: [12, 3], maxv: "870 km/h", bab: 5, crew: "expert", sk: SK(0, 8, 8, 0, 8),
    crewText: "5 (expert)", passengers: "6", cargo: "10 toneladas", cons: "1 semana",
    avail: "Restrito", cost: "525.000 (310.000 usado)", space: "8×8 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Heavy Laser Cannons", t: "laser", st: "gunner", atk: 8, dmg: "6d10", x: 2, auto: true, count: 2 },
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 8, dmg: "4d10", x: 2, auto: true },
      { n: "Laser Cannons (copiloto)", t: "laser", st: "copilot", atk: 8, dmg: "4d10", x: 2, auto: true }
    ],
    notes: notes({ Descrição: "\"Orphanmaker\" do Setor Tapani; +5 de equipamento em Mechanics para instalar armas (ex.: Moomo Williwaw)" })
  }),
  v("Quartermaster-class Supply Carrier", "Transportes", {
    cl: 6, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [52, 10, 14], armor: 14,
    def: [14, 31], hp: 200, dr: 20, sr: 50, dt: 81, speed: [12, 2], maxv: "350 km/h", bab: 2, crew: "skilled", sk: SK(-4, 6, 6, -4, 6),
    crewText: "2 (skilled)", passengers: "10 (configuração padrão)", cargo: "120 toneladas", cons: "6 meses", craft: "Varia por missão", hyper: "×3 (reserva ×12), navicomputador",
    avail: "Licenciado", cost: "300.000 (110.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)", w: [],
    notes: notes({ Instalação: "2 pontos de instalação livres", Descrição: "cargueiro modular de reconstrução (o Little Bivoli)" })
  }),
  v("Praetorian-class Frigate", "Naves Capitais", {
    cl: 14, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [61, 10, 20], armor: 12,
    def: [12, 35], hp: 850, dr: 15, sr: 100, dt: 135, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-4, 6, 6, -4, 6),
    crewText: "1.470 (skilled)", passengers: "2.700", cargo: "10.000 toneladas", cons: "2 anos", craft: "12 caças, 6 shuttles", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Restrito", cost: "12 milhões (6 milhões usado)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Light Turbolaser Cannon Battery", t: "turbolaser", st: "gunner", atk: 13, dmg: "2d10", x: 5, count: 2, special: `4 artilheiros; ${CAP20}` },
      { n: "Point-Defense Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 11, dmg: "4d10", x: 2, auto: true, count: 2, special: "3 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 11, dmg: "0", x: 1, grp: 63, count: 2, special: `3 artilheiros; ${CAP20}` }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas num raio de 2 quadrados recebem +1 na Reflexos e +10 na Fortitude e no Limiar" })
  }),  v("Eleaor Propulsion Baronial-class Yacht", "Transportes", {
    cl: 6, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [41, 14, 16], armor: 12,
    def: [14, 25], hp: 115, dr: 15, sr: 10, dt: 75, speed: [12, 3], maxv: "900 km/h", bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "1 (skilled)", passengers: "4", cargo: "30 toneladas", cons: "1 mês", hyper: "×3",
    avail: "Restrito", cost: "200.000 (120.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Double Light Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "4d10", x: 2, auto: true }
    ],
    notes: notes({ Descrição: "iate de luxo usado pelos WatchCircles do Covenant Jedi; discreto e manobrável" })
  }),  v("Star Forge Manufacture Interdictor-class Warship", "Naves Capitais", {
    cl: 16, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [90, 14, 18], armor: 12,
    def: [14, 50], hp: 1250, dr: 20, sr: 110, dt: 250, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "5.224 (skilled)", passengers: "3.600 (tropas)", cargo: "11.000 toneladas", cons: "3 anos", craft: "48 interceptadores Sith, veículos de apoio", hyper: "×2 (reserva ×9), navicomputador",
    avail: "Militar", cost: "não está à venda", space: "2×2 (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Medium Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "5d10", x: 5, count: 5, special: "5 artilheiros; −6 contra alvos menores que Colossal" },
      { n: "Point-Defense Light Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 10, dmg: "3d10", x: 2, auto: true, count: 6, special: "3 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 10, dmg: "0", x: 1, grp: 61, count: 3, special: "3 artilheiros; −10 contra alvos menores que Colossal" },
      { n: "Gravity Well Projector", t: "tractor", st: "gunner", atk: 8, dmg: "0", x: 1, count: 4, area: "3×3 quadrados (escala de nave)", special: "2 artilheiros; campo de interdição (Starships of the Galaxy)" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves inimigas num raio de 2 quadrados sofrem −1 na Reflexos e têm o deslocamento reduzido em 2 quadrados (mínimo 1)", Descrição: "o protótipo Leviathan foi entregue aos Sith por Saul Karath" })
  }),
  v("Star Forge Manufacture Centurion-class Battlecruiser", "Naves Capitais", {
    cl: 20, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [100, 16, 20], armor: 14,
    def: [17, 55], hp: 1950, dr: 20, sr: 140, dt: 255, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-1, 6, 6, -1, 6),
    crewText: "31.452 (skilled)", passengers: "7.400 (tropas)", cargo: "32.000 toneladas", cons: "5 anos", craft: "96 interceptadores Sith, veículos de apoio", hyper: "×2 (reserva ×8), navicomputador",
    avail: "Militar", cost: "não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Medium Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 17, dmg: "5d10", x: 5, count: 6, special: "6 artilheiros; −3 contra alvos menores que Colossal" },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 17, dmg: "3d10", x: 5, ion: true, count: 6, special: "6 artilheiros; iônico; −3 contra alvos menores que Colossal" },
      { n: "Point-Defense Light Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 11, dmg: "2d10", x: 2, auto: true, count: 6, special: "3 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 11, dmg: "0", x: 1, grp: 67, count: 3, special: "3 artilheiros; −9 contra alvos menores que Colossal" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas Colossal (fragata) ou maiores num raio de 2 quadrados causam +1 dado de dano com armas de veículo contra naves inimigas Colossal (fragata) ou maiores", Descrição: "o Ravager de Darth Nihilus é um Centurion recuperado de Malachor V" })
  }),
  v("Star Forge Manufacture Derriphan-class Battleship", "Naves Capitais", {
    cl: 14, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [61, 10, 13], armor: 13,
    def: [13, 35], hp: 840, dr: 30, sr: 0, dt: 135, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-4, 6, 6, -4, 6),
    crewText: "25 (skilled)", passengers: "850", cargo: "5.000 toneladas", cons: "1 ano", craft: "6 caças, 2 shuttles", payload: "60 mísseis de concussão", hyper: "×4 (reserva ×12), navicomputador",
    avail: "Militar", cost: "não está à venda", space: "1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Point-Defense Medium Blaster Cannon Battery", t: "pointDefense", st: "gunner", atk: 7, dmg: "4d10", x: 2, auto: true, special: "3 artilheiros" },
      { n: "Heavy Concussion Missile Battery", t: "missile", st: "gunner", atk: 7, dmg: "8d10", x: 5, ammo: 60, special: "3 artilheiros; −13 contra alvos menores que Colossal" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: ataques de míssil ou torpedo contra inimigos nos quadrados adjacentes causam +1 dado de dano", Descrição: "encouraçado sem escudos de mil anos antes da Grande Guerra Sith, replicado pela Star Forge" })
  }),
  v("Star Forge Manufacture Herald-class Shuttle", "Transportes", {
    cl: 11, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [43, 12, 16], armor: 12,
    def: [15, 20], hp: 130, dr: 15, sr: 20, dt: 76, speed: [12, 3], maxv: "600 km/h", bab: 2, crew: "skilled", sk: SK(-1, 6, 6, -1, 6),
    crewText: "2 (skilled)", passengers: "5 (10 nos modelos só de transporte)", cargo: "70 toneladas (15 nos modelos só de transporte)", cons: "1 mês", craft: "1 landspeeder, 2 speeder bikes", hyper: "×2",
    avail: "Militar", cost: "não está à venda (estimado 120.000; 222.500 o modelo só de transporte)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Light Turbolaser Cannons", t: "turbolaser", st: "pilot", atk: 7, dmg: "3d10", x: 5, special: "−13 contra alvos menores que Colossal" },
      { n: "Point-Defense Double Laser Cannons", t: "pointDefense", st: "copilot", atk: 5, dmg: "4d10", x: 2, auto: true }
    ],
    notes: notes({ Descrição: "lançadeira multiuso do Império Sith (tropas, carga ou transporte pessoal de Lordes Sith)" })
  }),
  v("Star Forge Manufacture Sith Interceptor", "Caças Estelares", {
    cl: 5, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [32, 22, 14], armor: 3,
    def: [17, 21], hp: 50, dr: 10, sr: 0, dt: 31, speed: [16, 5], maxv: "1.250 km/h", bab: 0, crew: "normal", sk: SK(9, 5, 5, 9, 5),
    crewText: "1 (normal)", passengers: "nenhum", cargo: "40 kg", cons: "1 dia",
    avail: "Militar", cost: "não está à venda", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Laser Cannon", t: "laser", st: "pilot", atk: 4, dmg: "3d10", x: 2, auto: true }
    ],
    notes: notes({ Descrição: "caça descartável e frágil; os pilotos usam traje ambiental para ejetar" })
  }),  v("Republic Fleet Systems Aurek Tactical Strikefighter", "Caças Estelares", {
    cl: 11, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [43, 25, 14], armor: 4,
    def: [18, 25], hp: 110, dr: 5, sr: 15, dt: 32, speed: [16, 5], maxv: "1.400 km/h", bab: 2, crew: "skilled", sk: SK(10, 6, 6, 10, 6),
    crewText: "1 (skilled)", passengers: "nenhum", cargo: "20 kg", cons: "1 semana", payload: "6 torpedos de prótons", hyper: "×2, navicomputador",
    avail: "Militar", cost: "não está à venda (valor estimado 360.000)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Heavy Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "6d10", x: 2, auto: true, special: "fire-link" },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 6, dmg: "9d10", x: 2, area: "Splash 4", ammo: 6 }
    ],
    notes: notes({ Descrição: "caça vencedor do concurso \"Generation Tomorrow\" da Marinha, fácil de reabastecer e rearmar; asas reconfiguráveis" })
  }),
  v("Corellian Engineering Corporation S-250 Chela-class Starfighter", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [42, 20, 14], armor: 7,
    def: [17, 26], hp: 120, dr: 10, sr: 20, dt: 46, speed: [16, 4], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(6, 6, 6, 6, 6),
    crewText: "1 (skilled)", passengers: "nenhum", cargo: "30 kg", cons: "1 semana", payload: "12 mísseis de concussão", hyper: "×2, navicomputador",
    avail: "Militar", cost: "não está à venda (valor estimado 420.000)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Medium Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "5d10", x: 2, auto: true },
      { n: "Concussion Missiles", t: "missile", st: "pilot", atk: 6, dmg: "10d10", x: 2, area: "Splash 4", ammo: 12, special: "fire-link" }
    ],
    notes: notes({ Descrição: "sucessor do S-100 Stinger, preferido por guardas de honra e comandantes veteranos" })
  }),
  v("Republic Fleet Systems Conductor-class Short-haul Landing Craft", "Transportes", {
    cl: 7, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [42, 11, 13], armor: 12,
    def: [12, 26], hp: 120, dr: 15, sr: 0, dt: 76, speed: [12, 2], maxv: "500 km/h", bab: 2, crew: "skilled", sk: SK(-4, 6, 6, -4, 6),
    crewText: "1 (skilled)", passengers: "5 (mais 2 droides carregadores)", cargo: "80 toneladas", cons: "2 semanas", hyper: "×3, navicomputador",
    avail: "Restrito", cost: "250.000 (100.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Light Laser Cannons", t: "laser", st: "pilot", atk: 5, dmg: "4d10", x: 2, auto: true, special: "fire-link" }
    ],
    notes: notes({ Descrição: "linha CX (ponto a ponto) e CXB (embarcada em naves capitais); o CXB-560 \"Deadweight\" de Carth Onasi é um deles" })
  }),
  v("Zentine Dynamics Ministry-class Orbital Shuttle", "Transportes", {
    cl: 6, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [40, 16, 17], armor: 12,
    def: [15, 25], hp: 110, dr: 15, sr: 30, dt: 75, speed: [12, 3], maxv: "750 km/h", bab: 2, crew: "skilled", sk: SK(0, 6, 6, 0, 6),
    crewText: "2 (skilled)", passengers: "36", cargo: "1.500 kg", cons: "1 semana",
    avail: "Licenciado", cost: "160.000 (80.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Double Laser Cannons", t: "laser", st: "copilot", atk: 5, dmg: "5d10", x: 2, auto: true }
    ],
    notes: notes({ Descrição: "lançadeira orbital sem hiperpropulsor (\"mini\"), usada por naves capitais e cientistas da República" })
  }),
  v("Republic Fleet Systems KT-400 Military Droid Carrier", "Transportes", {
    cl: 6, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [43, 10, 12], armor: 14,
    def: [14, 26], hp: 130, dr: 15, sr: 30, dt: 76, speed: [12, 3], maxv: "800 km/h", bab: 2, crew: "skilled", sk: SK(-4, 6, 6, -6, 6),
    crewText: "8 (skilled)", passengers: "400 droides bípedes", cargo: "40 toneladas", cons: "2 semanas", hyper: "×2, navicomputador",
    avail: "Restrito", cost: "280.000 (150.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Double Medium Laser Cannon", t: "laser", st: "gunner", atk: 3, dmg: "6d10", x: 2, auto: true }
    ],
    notes: notes({ Descrição: "transporte compacto que desembarca até 400 droides de guerra em menos de cinco minutos" })
  }),
  v("Republic Fleet Systems Foray-class Blockade Runner", "Naves Capitais", {
    cl: 15, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [60, 18, 17], armor: 11,
    def: [15, 35], hp: 750, dr: 15, sr: 80, dt: 135, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(0, 6, 6, 0, 6),
    crewText: "40 a 100 (skilled)", passengers: "300", cargo: "2.800 toneladas", cons: "9 meses", hyper: "×2, navicomputador",
    avail: "Militar", cost: "não está à venda (valor estimado 3 milhões)", space: "1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Medium Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 13, dmg: "5d10", x: 5, count: 2, special: "5 artilheiros; −7 contra alvos menores que Colossal" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas nos quadrados adjacentes recebem +5 em Pilot para resistir a dogfight ou escapar de um", Descrição: "furador de bloqueio de 155 m usado contra os Mandalorianos" })
  }),
  v("Rendili Hyperworks Hammerhead-class Cruiser", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [63, 15, 15], armor: 12,
    def: [14, 36], hp: 1000, dr: 20, sr: 125, dt: 136, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "300 (skilled)", passengers: "400", cargo: "4.000 toneladas", cons: "8 meses", craft: "12 Aurek Tactical Strikefighters, 2 Ministry-class Orbital Shuttles, naves de apoio", hyper: "×2, navicomputador",
    avail: "Militar", cost: "não está à venda (valor estimado 10 milhões)", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Double Light Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 12, dmg: "4d10", x: 5, count: 4, special: "5 artilheiros; −8 contra alvos menores que Colossal" },
      { n: "Medium Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 12, dmg: "5d10", x: 5, count: 2, special: "5 artilheiros; −8 contra alvos menores que Colossal" },
      { n: "Point-Defense Light Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 12, dmg: "3d10", x: 2, auto: true, count: 2, special: "5 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 8, dmg: "0", x: 1, grp: 48, special: "3 artilheiros; −12 contra alvos menores que Colossal" }
    ],
    notes: notes({ "Sistemas sincronizados": "com um Inexpugnable a até 10 quadrados (ambos sem descer na trilha), o operador de sistemas pode, como ação padrão, ligar-se a ele e usar o Use Computer da nave de comando (+12)", "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas num raio de 2 quadrados recebem +2 nos ataques, na Reflexos ou na Fortitude (o comandante escolhe ao ativar)", Descrição: "o cruzeiro mais comum da frota da República" })
  }),
  v("Rendili Hyperworks Inexpugnable-class Tactical Command Vessel", "Naves Capitais", {
    cl: 19, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [101, 13, 21], armor: 14,
    def: [15, 55], hp: 2050, dr: 20, sr: 150, dt: 255, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 12),
    crewText: "4.300 (skilled)", passengers: "2.000 (tropas)", cargo: "50.000 toneladas", cons: "2 anos", craft: "144 Aurek Tactical Strikefighters, 24 Chela-class Starfighters, 24 Conductor-class Landing Craft, 6 Ministry-class Orbital Shuttles, naves de apoio", hyper: "×2 (reserva ×10), navicomputador",
    avail: "Militar", cost: "não está à venda (valor estimado 70 milhões)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Double Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "6d10", x: 5, count: 5, special: "5 artilheiros; −5 contra alvos menores que Colossal" },
      { n: "Light Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "3d10", x: 5, count: 5, special: "5 artilheiros; −5 contra alvos menores que Colossal" },
      { n: "Point-Defense Light Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 15, dmg: "3d10", x: 2, count: 2, special: "5 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 11, dmg: "0", x: 1, grp: 67, count: 2, special: "3 artilheiros; −9 contra alvos menores que Colossal" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas num raio de 2 quadrados podem mover 1 quadrado em qualquer direção no início do seu turno", Iniciativa: "o livro imprime −32 (provável erro; usado −3)", Descrição: "nave de comando tático que coordena até 64 cruzadores Hammerhead" })
  }),  v("Basilisk War Droid", "Airspeeders", {
    cl: 6, cat: "airspeeder", type: "Veículo aéreo (droide)", size: "huge", ab: [28, 15, 14], armor: 3,
    def: [13, 19], hp: 70, dr: 5, sr: 0, dt: 29, speed: [12, 3], maxv: "550 km/h", bab: 2, crew: "skilled", sk: SK(6, 6, 11, 6, 11),
    crewText: "1 (skilled, cérebro droide)", passengers: "1", cargo: "100 kg", cons: "1 dia", payload: "4 mísseis de concussão, 2 minas espaciais",
    avail: "Militar, Raro", cost: "não está à venda (valor estimado 70.000)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "+5",
    w: [
      { n: "Claws", t: "blaster", st: "pilot", atk: 11, dmg: "2d6", x: 1, special: "corpo a corpo (garras do droide)" },
      { n: "Light Laser Cannons", t: "laser", st: "pilot", atk: 4, dmg: "3d10", x: 2, auto: true },
      { n: "Light Concussion Missiles", t: "missile", st: "pilot", atk: 4, dmg: "7d10", x: 2, ammo: 4 },
      { n: "Pulse-Wave Cannons", t: "blaster", st: "pilot", atk: 4, dmg: "3d8", x: 1, special: "tratados como rifles de pulso (pulse-wave rifles)" },
      { n: "Space Mines", t: "missile", st: "pilot", atk: 5, dmg: "7d10", x: 2, ammo: 2 }
    ],
    notes: notes({ Garras: "o livro dá +11 e não imprime o dano (usado 2d6)", Montaria: "se levar um passageiro, ele pode usar o próprio bônus de ataque e perícias no lugar dos do cérebro droide; o droide sempre obedece a quem está autorizado", Descrição: "droide de guerra quadrúpede basiliskano, montaria pessoal dos guerreiros mandalorianos" })
  }),
  v("Davaab-type Starfighter", "Caças Estelares", {
    cl: 8, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [39, 20, 15], armor: 4,
    def: [17, 24], hp: 100, dr: 5, sr: 25, dt: 34, speed: [16, 5], maxv: "1.100 km/h", bab: 2, crew: "skilled", sk: SK(9, 6, 6, 9, 6),
    crewText: "1 (skilled)", passengers: "nenhum", cargo: "40 kg", cons: "1 semana", payload: "3 mísseis de concussão médios", hyper: "×2, navicomputador limitado (5 saltos)",
    avail: "Restrito", cost: "150.000 (80.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Light Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "4d10", x: 2, auto: true, special: "fire-link" },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 6, dmg: "8d10", x: 2, area: "Splash 4", ammo: 3 }
    ],
    notes: notes({ Descrição: "caça padrão das Forjas de Guerra mandalorianas, feito para ser customizado como uma armadura" })
  }),
  v("Shaadlar-type Troopship", "Naves Capitais", {
    cl: 15, cat: "capital", type: "Transporte espacial", size: "colossalFrigate", ab: [60, 15, 18], armor: 12,
    def: [14, 35], hp: 750, dr: 15, sr: 150, dt: 135, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "30 (skilled)", passengers: "800", cargo: "2.500 toneladas", cons: "1 ano", payload: "50 mísseis de concussão médios", hyper: "×2, navicomputador",
    avail: "Restrito", cost: "3 milhões (1,2 milhão usado)", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Medium Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "5d10", x: 5, count: 2, special: "5 artilheiros; −6 contra alvos menores que Colossal" },
      { n: "Point-Defense Medium Ion Cannon Battery", t: "pointDefense", st: "gunner", atk: 10, dmg: "5d10", x: 2, ion: true, auto: true, count: 2, special: "3 artilheiros; iônico" },
      { n: "Point-Defense Light Concussion Missile Battery", t: "missile", st: "gunner", atk: 10, dmg: "7d10", x: 2, count: 2, special: "5 artilheiros" }
    ],
    notes: notes({ Descrição: "nave de tropas de 130 m de aparência orgânica, derivada da tecnologia basiliskana" })
  }),
  v("Teroch-type Fast Attack Gunship", "Transportes", {
    cl: 10, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [40, 19, 15], armor: 12,
    def: [16, 25], hp: 110, dr: 10, sr: 25, dt: 75, speed: [14, 3], maxv: "1.000 km/h", bab: 2, crew: "skilled", sk: SK(0, 6, 6, 0, 6),
    crewText: "8 (skilled)", passengers: "6", cargo: "8 toneladas", cons: "3 semanas", hyper: "×2, navicomputador",
    avail: "Restrito", cost: "400.000 (200.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Double Laser Cannons", t: "laser", st: "gunner", atk: 4, dmg: "6d10", x: 2, auto: true }
    ],
    notes: notes({ Descrição: "canhoneira veloz (\"Impiedosa\") de 18 m, especializada em interceptações rápidas" })
  }),
  v("Jehavey'ir-type Assault Ship", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [62, 18, 16], armor: 11,
    def: [15, 36], hp: 900, dr: 15, sr: 75, dt: 136, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(0, 6, 6, 0, 6),
    crewText: "200 (skilled)", passengers: "500", cargo: "3.500 toneladas", cons: "6 meses", payload: "36 mísseis de concussão superpesados", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Restrito", cost: "10 milhões (4 milhões usado)", space: "1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Medium Double Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 13, dmg: "6d10", x: 5, special: "5 artilheiros; −7 contra alvos menores que Colossal" },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 9, dmg: "4d10", x: 5, ion: true, special: "3 artilheiros; iônico; −11 contra alvos menores que Colossal" },
      { n: "Super-Heavy Concussion Missile Battery", t: "missile", st: "gunner", atk: 15, dmg: "11d10", x: 5, ammo: 36, special: "6 artilheiros; −5 contra alvos menores que Colossal" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves inimigas nos quadrados adjacentes sofrem −1 na Reflexos e na Fortitude", Abordagem: "eclusas especiais para lançar tropas de abordagem (sem hangar)", Descrição: "nave de emboscada de 188 m que chega do hiperespaço já atirando" })
  }),
  v("Kyramud-type Battleship", "Naves Capitais", {
    cl: 20, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [90, 15, 16], armor: 14,
    def: [16, 50], hp: 1250, dr: 20, sr: 90, dt: 250, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "1.200 (skilled)", passengers: "2.000", cargo: "8.000 toneladas", cons: "1 ano", craft: "3 Shaadlar-type Troopships, 36 Davaab-type Starfighters, naves de apoio", payload: "80 mísseis de concussão pesados", hyper: "×2 (reserva ×15), navicomputador",
    avail: "Restrito", cost: "40 milhões (22 milhões usado)", space: "2×2 (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Point-Defense Medium Ion Cannon Battery", t: "pointDefense", st: "gunner", atk: 9, dmg: "4d10", x: 2, ion: true, auto: true, count: 4, special: "3 artilheiros; iônico" },
      { n: "Double Medium Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 13, dmg: "6d10", x: 5, count: 5, special: "5 artilheiros; −7 contra alvos menores que Colossal" },
      { n: "Heavy Concussion Missile Battery", t: "missile", st: "gunner", atk: 13, dmg: "9d10", x: 5, ammo: 80, count: 2, special: "5 artilheiros; −7 contra alvos menores que Colossal" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 9, dmg: "0", x: 1, grp: 62, count: 2, special: "3 artilheiros; −11 contra alvos menores que Colossal" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas que façam um ataque de passagem (attack run) contra alvos num raio de 2 quadrados recebem +2 de circunstância no ataque", Descrição: "encouraçado \"Assassino\" de 752 m com hangar e tropas para invasões planetárias" })
  }),
  v("Kandosii-type Dreadnaught", "Naves Capitais", {
    cl: 20, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [102, 13, 20], armor: 15,
    def: [16, 56], hp: 2100, dr: 20, sr: 125, dt: 256, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "10.000 (skilled)", passengers: "30.000 (tropas)", cargo: "45.000 toneladas", cons: "5 anos", craft: "8 Shaadlar-type Troopships, 128 Davaab-type Starfighters, naves de apoio", payload: "120 mísseis de concussão superpesados", hyper: "×2 (reserva ×8), navicomputador",
    avail: "Restrito", cost: "200 milhões (120 milhões usado)", space: "2×2 (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Double Medium Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 17, dmg: "6d10", x: 5, count: 5, special: "6 artilheiros; −3 contra alvos menores que Colossal" },
      { n: "Point-Defense Triple Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 17, dmg: "6d10", x: 2, auto: true, count: 2, special: "6 artilheiros" },
      { n: "Super-Heavy Concussion Missile Battery", t: "missile", st: "gunner", atk: 17, dmg: "11d10", x: 5, ammo: 120, count: 2, special: "6 artilheiros; −3 contra alvos menores que Colossal" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 11, dmg: "0", x: 1, grp: 68, count: 2, special: "3 artilheiros; −9 contra alvos menores que Colossal" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas que acertem um míssil ou torpedo num alvo num raio de 2 quadrados recebem +1 de circunstância no ataque e não sofrem penalidade em ataques secundários de mísseis travados no alvo", Descrição: "o \"Implacável\", encouraçado de 1.360 m montado com tecnologia apropriada; seus mísseis podem levar ogivas de fissão" })
  }),  v("Ebon Hawk", "Transportes", {
    cl: 8, cat: "transport", type: "Transporte espacial (tratado como caça Gargantuesco)", size: "colossal", ab: [44, 16, 16], armor: 12,
    def: [15, 27], hp: 140, dr: 15, sr: 40, dt: 77, speed: [16, 4], maxv: "1.000 km/h", bab: 2, crew: "skilled", sk: SK(-1, 6, 6, -1, 6),
    crewText: "3 (skilled)", passengers: "8", cargo: "40 toneladas", cons: "2 meses", hyper: "×1, navicomputador",
    avail: "Única", cost: "não está à venda (valor estimado 154.000)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Double Laser Cannon", t: "laser", st: "pilot", atk: 7, dmg: "4d10", x: 2, auto: true },
      { n: "Double Heavy Laser Cannon", t: "laser", st: "gunner", atk: 5, dmg: "6d10", x: 2, auto: true },
      { n: "Docking Gun (Blaster Cannon)", t: "blaster", st: "copilot", atk: 5, dmg: "3d12", x: 1, special: "escala de personagem" }
    ],
    notes: notes({ "Tamanho efetivo": "conta como caça Gargantuesco para ser alvo de armas de naves capitais, dogfights e manobras", Descrição: "cargueiro Dynamic modificado do chefe do Exchange Davik Kang, levado por Revan" })
  }),
  v("Koros Spaceworks CX-133 Chaos Fighter", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [36, 18, 14], armor: 3,
    def: [15, 23], hp: 60, dr: 10, sr: 0, dt: 33, speed: [16, 4], maxv: "1.100 km/h", bab: 2, crew: "skilled", sk: SK(8, 6, 6, 8, 6),
    crewText: "1 (skilled)", passengers: "nenhum", cargo: "40 kg", cons: "2 dias",
    avail: "Militar", cost: "não está à venda (valor estimado 65.000)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Light Laser Cannons", t: "laser", st: "pilot", atk: 4, dmg: "5d10", x: 2, auto: true, special: "fire-link" }
    ],
    notes: notes({ Abalroamento: "carregado de material volátil: ao colidir com uma nave causa 8d6 de dano em vez dos 4d6 normais", Descrição: "caça barato produzido aos milhares pelos Krath, usado em ataques de abalroamento" })
  }),
  v("Koros Spaceworks Supremacy-class Attack Ship", "Naves Capitais", {
    cl: 17, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [94, 12, 20], armor: 13,
    def: [14, 52], hp: 1500, dr: 20, sr: 120, dt: 252, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "1.800 (skilled)", passengers: "3.000 (tropas)", cargo: "6.000 toneladas", cons: "2 anos", craft: "144 Chaos Fighters, 8 shuttles", hyper: "×2 (reserva ×8)",
    avail: "Militar", cost: "não está à venda (valor estimado 16 milhões)", space: "2 quadrados (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Light Double Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 17, dmg: "4d10", x: 5, count: 3, special: "6 artilheiros; −3 contra alvos menores que Colossal" },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 17, dmg: "3d10", x: 5, ion: true, count: 3, special: "6 artilheiros; iônico; −3 contra alvos menores que Colossal" },
      { n: "Point-Defense Medium Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 9, dmg: "4d10", x: 2, auto: true, count: 5, special: "2 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 9, dmg: "0", x: 1, grp: 64, count: 3, special: "2 artilheiros; −11 contra alvos menores que Colossal" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: engenheiros de naves aliadas num raio de 2 quadrados podem redirecionar energia com uma única ação rápida (em vez de 3); não acumula com outros efeitos semelhantes", Descrição: "nave de comando Krath de 550 m; lança droides de guerra Krath em cápsulas" })
  }),
  v("Eleaor Propulsion Starscape-class Yacht (Visionary)", "Transportes", {
    cl: 13, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [42, 12, 12], armor: 12,
    def: [13, 26], hp: 120, dr: 15, sr: 30, dt: 76, speed: [12, 2], maxv: "800 km/h", bab: 5, crew: "expert", sk: SK(-1, 8, 8, -1, 8),
    crewText: "14 (expert)", passengers: "12", cargo: "50 toneladas", cons: "6 meses", hyper: "×1, navicomputador",
    avail: "Única", cost: "não está à venda", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Medium Laser Cannon Battery", t: "laser", st: "gunner", atk: 10, dmg: "5d10", x: 2, auto: true, count: 2, special: "3 artilheiros" },
      { n: "Light Laser Cannon Battery", t: "laser", st: "gunner", atk: 8, dmg: "3d10", x: 2, auto: true, count: 2, special: "2 artilheiros" }
    ],
    notes: notes({ "Camuflagem (cristal de stygium)": "a nave camuflada tem camuflagem total e pode usar Stealth para se esgueirar (−10 em quem tenta notá-la); quem a nota ainda sofre a penalidade normal de camuflagem para atacá-la", "Bateria leve": "o livro dá +8 (+3 autofire)", Descrição: "o protótipo Visionary, iate de GO-TO, com torres e campo minado" })
  })
];
