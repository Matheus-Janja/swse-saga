// Starships of the Galaxy — Cap. 4: Codex de naves. Mesmo formato de tools/data/vehicles.mjs.
const notes = o => `<p><em>Starships of the Galaxy</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
const v = (name, folder, o) => ({ name, folder, source: "Starships of the Galaxy", ...o });
const SK = (i, m, p, pi, u) => ({ initiative: i, mechanics: m, perception: p, pilot: pi, useComputer: u });
const CAP20 = "−20 contra alvos menores que Colossal";

export default [
  v("Acclamator-class Assault Ship", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [86, 14, 16], armor: 12,
    def: [14, 48], hp: 960, dr: 20, sr: 120, dt: 248, speed: [12, 4], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "20.141 (skilled)", passengers: "16.000 (clones)", cargo: "11.250 toneladas", cons: "2 anos", craft: "320 speeder bikes, 48 AT-TE, 80 LAAT, 36 artilharias autopropulsadas",
    payload: "100 torpedos de prótons", hyper: "×0,75, navicomputador avançado", avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Quad Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "6d10", x: 5, count: 2, special: `6 artilheiros; ${CAP20}` },
      { n: "Point-Defense Light Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 15, dmg: "2d10", x: 2, auto: true, count: 4, special: "6 artilheiros" },
      { n: "Proton Torpedoes", t: "missile", st: "gunner", atk: 5, dmg: "9d10", x: 2, area: "Splash 4", count: 4, ammo: 100 }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas num raio de 2 quadrados recebem +2 na Reflexos" })
  }),
  v("Acclamator II-class Assault Ship", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [86, 14, 16], armor: 12,
    def: [14, 48], hp: 960, dr: 20, sr: 120, dt: 248, speed: [12, 4], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "20.141 (skilled)", passengers: "3.200 (clones)", cargo: "10.000 toneladas", cons: "2 anos", craft: "64 speeder bikes, 10 AT-TE, 16 LAAT, 8 artilharias",
    payload: "60 torpedos de prótons pesados", hyper: "×0,75, navicomputador avançado", avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 11, dmg: "6d10", x: 5, count: 4, special: `4 artilheiros; ${CAP20}` },
      { n: "Heavy Proton Torpedoes", t: "missile", st: "gunner", atk: -5, dmg: "9d10", x: 5, area: "Splash 4", count: 2, ammo: 60, special: `${CAP20}; +10 contra escudos planetários` }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: tiro em todos os quadrados num raio de 2; nave reduzida a 0 PV ali é destruída mesmo sem exceder o Limiar" })
  }),
  v("Action VI Transport", "Naves Capitais", {
    cl: 7, cat: "capital", type: "Nave capital (transporte de carga)", size: "colossalFrigate", ab: [62, 10, 12], armor: 12,
    def: [12, 36], hp: 600, dr: 15, dt: 136, speed: [12, 1], maxv: "650 km/h", bab: 0, crew: "normal", sk: SK(-5, 5, 5, -5, 5),
    crewText: "8 (normal)", passengers: "Nenhum", cargo: "90.000 toneladas", cons: "3 meses", hyper: "×3", avail: "Licenciado", cost: "1.000.000 (500.000 usado)", space: "1 quadrado (escala de nave)", cover: "Total", w: []
  }),
  v("Advanced V-19 Torrent Starfighter", "Caças Estelares", {
    cl: 12, cat: "starfighter", type: "Caça estelar (modelo avançado)", size: "gargantuan", ab: [45, 33, 20], armor: 7,
    def: [23, 27], hp: 125, dr: 10, sr: 30, dt: 47, speed: [16, 4], maxv: "1.150 km/h", bab: 2, crew: "skilled", sk: SK(8, 6, 6, 12, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "70 kg", cons: "1 semana", payload: "6 mísseis de concussão médios", hyper: "×1 ou ×1 com anel, navicomputador limitado (2 saltos)",
    avail: "Militar", cost: "Não está à venda", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 9, dmg: "6d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 9, dmg: "9d10", x: 2, area: "Splash 4", ammo: 6, special: "fire-link" }
    ],
    notes: notes({ "Modelo Advanced Ship": "ND ×1,25; SR +10/+20...; +25% PV; For e Des maiores; Int +4; armas +1 dado; manutenção semanal (Mechanics CD 30) ou −1 passo persistente" })
  }),
  v("Delta-7 Aethersprite Light Interceptor", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [34, 24, 14], armor: 3,
    def: [18, 22], hp: 65, dr: 10, sr: 15, dt: 32, speed: [16, 5], maxv: "1.150 km/h", bab: 5, crew: "expert", sk: SK(13, 6, 8, 13, 6),
    crewText: "1 + droide astromecânico (expert)", passengers: "Nenhum", cargo: "Nenhuma", cons: "Nenhum (1 semana com anel)", hyper: "×1 (com anel), memória de 10 saltos (astromecânico)",
    avail: "Militar (só Jedi)", cost: "180.000 (145.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 9, dmg: "6d10", x: 2, auto: true }],
    notes: notes({ Astromecânico: "com o R4-P, Mechanics e Use Computer +11; sem ele, −2 no piloto" })
  }),
  v("ARC-170 Starfighter (SotG)", "Caças Estelares", {
    cl: 11, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [46, 18, 14], armor: 8,
    def: [17, 28], hp: 150, dr: 10, sr: 25, dt: 48, speed: [16, 4], maxv: "1.050 km/h", bab: 2, crew: "skilled", sk: SK(5, 6, 6, 5, 6),
    crewText: "3 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "110 kg", cons: "5 dias", payload: "6 torpedos de prótons", hyper: "×1,5, memória de 10 saltos",
    avail: "Militar", cost: "155.000 (70.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "gunner", atk: 4, dmg: "6d10", x: 2, auto: true },
      { n: "Medium Laser Cannons", t: "laser", st: "gunner", atk: 4, dmg: "5d10", x: 2, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 6, dmg: "9d10", x: 2, area: "Splash 4", ammo: 6, special: "fire-link" }
    ],
    notes: notes({ Astromecânico: "Mechanics e Use Computer +13 com o droide" })
  }),
  v("Archaic Heavy Cruiser", "Naves Capitais", {
    cl: 12, cat: "capital", type: "Nave capital (modelo arcaico)", size: "colossalCruiser", ab: [96, 10, 16], armor: 13,
    def: [13, 53], hp: 1680, dr: 20, sr: 115, dt: 126, speed: [0, 1], bab: 2, crew: "skilled", sk: SK(-4, 6, 6, -4, 6),
    crewText: "16.210 (skilled)", passengers: "3.000", cargo: "9.000 toneladas", cons: "2 anos", craft: "12 caças", hyper: "×2 (reserva ×18), navicomputador",
    avail: "Militar", cost: "Não está à venda (mercado negro 17.777.500 usado)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 11, dmg: "7d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Light Quad Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 11, dmg: "4d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Light Turbolasers", t: "turbolaser", st: "gunner", atk: 3, dmg: "2d10", x: 5, count: 2, special: CAP20 }
    ],
    notes: notes({ "Modelo Archaic Ship": "Limiar à metade (já aplicado: 126 em vez de 253); se o SR for excedido, 50% de chance de falhar; não causa críticos em naves não arcaicas; −2 nos ataques contra naves modernas" })
  }),
  v("A-wing Starfighter", "Caças Estelares", {
    cl: 9, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [36, 26, 16], armor: 3,
    def: [19, 23], hp: 80, dr: 10, sr: 15, dt: 33, speed: [16, 6], maxv: "1.300 km/h", bab: 2, crew: "skilled", sk: SK(12, 6, 6, 12, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "40 kg", cons: "1 semana", payload: "12 mísseis de concussão médios", hyper: "×1, navicomputador limitado (2 saltos)",
    avail: "Militar", cost: "175.000 (70.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "5d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 7, dmg: "7d10", x: 2, area: "Splash 4", ammo: 12, special: "fire-link" }
    ],
    notes: notes({ Jammer: "naves Colossais ou menores adjacentes sofrem penalidade na Inteligência (−5 caças, −2 transportes)" })
  }),
  v("Munificent-class Frigate (Banking Clan)", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [88, 12, 20], armor: 12,
    def: [13, 49], hp: 1080, dr: 20, sr: 165, dt: 249, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "200 (skilled)", passengers: "150.000 droides de batalha compactados", cargo: "40.000 toneladas", cons: "2 anos", craft: "12 naves de desembarque", hyper: "×1 (reserva ×10), navicomputador",
    avail: "Restrito", cost: "57.000.000 (40.000.000 usado)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Turbolasers", t: "turbolaser", st: "gunner", atk: 7, dmg: "11d10", x: 5, special: CAP20 },
      { n: "Medium Ion Cannons", t: "ion", st: "gunner", atk: 7, dmg: "9d10", x: 2, special: CAP20 },
      { n: "Twin Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "4d10", x: 5, count: 5, special: `5 artilheiros; ${CAP20}` },
      { n: "Light Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "3d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Point-Defense Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 17, dmg: "3d10", x: 2, count: 3, special: "6 artilheiros" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves inimigas num raio de 2 quadrados perdem bônus de moral e de intuição em ataques, defesas e perícias" })
  }),
  v("Baudo-class Star Yacht", "Transportes", {
    cl: 6, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [34, 14, 14], armor: 11,
    def: [13, 22], hp: 60, dr: 15, sr: 15, dt: 72, speed: [12, 5], maxv: "1.200 km/h", bab: 0, crew: "normal", sk: SK(-3, 5, 5, -3, 5),
    crewText: "1 (normal)", passengers: "8", cargo: "35 toneladas", cons: "1 mês", hyper: "×2 (reserva ×7), navicomputador",
    avail: "Licenciado", cost: "400.000 (250.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Light Laser Cannons", t: "laser", st: "gunner", atk: 2, dmg: "2d10", x: 2 }]
  }),
  v("B-wing Starfighter", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [38, 15, 18], armor: 6,
    def: [13, 24], hp: 90, dr: 10, sr: 30, dt: 44, speed: [12, 3], maxv: "950 km/h", bab: 2, crew: "skilled", sk: SK(3, 6, 6, 3, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "45 kg", cons: "1 semana", payload: "12 torpedos de prótons", hyper: "×2, navicomputador limitado (2 saltos)",
    avail: "Restrito", cost: "220.000 (120.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Autoblasters", t: "blaster", st: "pilot", atk: 8, dmg: "4d10", x: 2, auto: true },
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 8, dmg: "7d10", x: 2 },
      { n: "Light Ion Cannons", t: "ion", st: "pilot", atk: 8, dmg: "4d10", x: 2, ion: true, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 8, dmg: "9d10", x: 2, area: "Splash 4", ammo: 12, special: "fire-link" }
    ]
  }),
  v("B-wing/E2 Starfighter", "Caças Estelares", {
    cl: 12, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [46, 15, 18], armor: 8,
    def: [15, 28], hp: 150, dr: 10, sr: 50, dt: 48, speed: [12, 3], maxv: "950 km/h", bab: 2, crew: "skilled", sk: SK(3, 6, 6, 3, 6),
    crewText: "2 (skilled)", passengers: "Nenhum", cargo: "50 kg", cons: "1 semana", payload: "8 torpedos de prótons", hyper: "×2, navicomputador limitado (2 saltos)",
    avail: "Restrito", cost: "250.000 (135.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 8, dmg: "8d10", x: 2, auto: true },
      { n: "Light Ion Cannons", t: "ion", st: "gunner", atk: 6, dmg: "4d10", x: 2, ion: true, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "gunner", atk: 6, dmg: "9d10", x: 2, area: "Splash 4", ammo: 8, special: "fire-link" }
    ]
  }),
  v("B-wing Shuttle", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [38, 15, 14], armor: 6,
    def: [13, 24], hp: 90, dr: 10, sr: 20, dt: 44, speed: [12, 3], maxv: "950 km/h", bab: 2, crew: "skilled", sk: SK(3, 6, 6, 3, 6),
    crewText: "1 (skilled)", passengers: "2", cargo: "45 kg", cons: "1 semana", hyper: "×2, navicomputador limitado (5 saltos)",
    avail: "Restrito", cost: "220.000 (120.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "6d10", x: 2 },
      { n: "Light Ion Cannons", t: "ion", st: "pilot", atk: 6, dmg: "4d10", x: 2, ion: true, auto: true }
    ]
  }),
  v("Carrack-class Light Cruiser", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [70, 18, 16], armor: 13,
    def: [17, 40], hp: 1000, dr: 15, sr: 130, dt: 140, speed: [0, 4], bab: 2, crew: "skilled", sk: SK(0, 6, 6, 0, 6),
    crewText: "1.092 (skilled)", passengers: "142 (tropas)", cargo: "3.500 toneladas", cons: "1 ano", craft: "4 caças TIE em suportes externos", hyper: "×1 (reserva ×12), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 13, dmg: "7d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Point-Defense Light Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 13, dmg: "2d10", x: 2, count: 4, special: "5 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 5, dmg: "0", x: 1, grp: 52, count: 5, special: `5 artilheiros; ${CAP20}` }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: aliados que atacam alvos nos quadrados adjacentes causam +1 dado de dano ao acertar" })
  }),
  v("Chiss Nssis-class Clawcraft", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [38, 26, 18], armor: 4,
    def: [20, 24], hp: 90, dr: 10, sr: 25, dt: 34, speed: [16, 5], maxv: "1.000 km/h", bab: 5, crew: "expert", sk: SK(14, 8, 8, 14, 8),
    crewText: "1 (expert)", passengers: "Nenhum", cargo: "25 kg", cons: "1 semana", hyper: "×1,5",
    avail: "Militar", cost: "Não está à venda", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 11, dmg: "6d10", x: 2, auto: true }]
  }),
  v("Citadel-class Cruiser", "Transportes", {
    cl: 7, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [42, 12, 12], armor: 14,
    def: [15, 26], hp: 120, dr: 15, sr: 30, dt: 76, speed: [12, 3], maxv: "830 km/h", bab: 0, crew: "normal", sk: SK(-4, 5, 5, -4, 5),
    crewText: "3 (normal)", passengers: "14", cargo: "50 toneladas", cons: "6 meses", craft: "2 caças (presilhas externas)", payload: "12 mísseis de concussão médios", hyper: "×2, navicomputador",
    avail: "Licenciado", cost: "205.000 (120.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "gunner", atk: 1, dmg: "5d10", x: 2, auto: true },
      { n: "Ion Cannons", t: "ion", st: "gunner", atk: 1, dmg: "5d10", x: 2, ion: true, count: 2 },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 3, dmg: "8d10", x: 2, area: "Splash 4", ammo: 12, special: "alternativo ao raio trator" },
      { n: "Tractor Beam", t: "tractor", st: "pilot", atk: 3, dmg: "0", x: 1, grp: 36 }
    ]
  }),
  v("CloakShape Fighter", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [44, 15, 14], armor: 7,
    def: [14, 27], hp: 140, dr: 10, dt: 47, speed: [15, 4], maxv: "950 km/h", bab: 0, crew: "normal", sk: SK(2, 5, 5, 2, 5),
    crewText: "1 (normal)", passengers: "Nenhum", cargo: "40 kg", cons: "1 dia", payload: "16 mísseis de concussão médios", hyper: "Nenhum",
    avail: "Restrito", cost: "60.000 (15.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 4, dmg: "4d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 4, dmg: "7d10", x: 2, area: "Splash 4", ammo: 16, special: "fire-link" }
    ],
    notes: notes({ "Modificações": "jatos de manobra (Iniciativa e Pilot +3, Reflexos 15, Des 17; +4.800 cr); trenó de hiperpropulsor com soquete de astromecânico (×3, memória de 10 saltos, Mechanics/Use Computer +13; +19.500 cr)" })
  }),
  v("Recusant-class Light Destroyer", "Naves Capitais", {
    cl: 19, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [91, 14, 18], armor: 12,
    def: [14, 50], hp: 1290, dr: 20, sr: 150, dt: 250, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "300 (skilled)", passengers: "40.000 (droides de batalha)", cargo: "10.000 toneladas", cons: "2 anos", craft: "Nenhuma", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Turbolasers", t: "turbolaser", st: "gunner", atk: 6, dmg: "10d10", x: 5, special: CAP20 },
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "7d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Point-Defense Double Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 14, dmg: "5d10", x: 2, count: 3, special: "5 artilheiros" },
      { n: "Point-Defense Light Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 16, dmg: "3d10", x: 2, count: 5, special: "5 artilheiros" },
      { n: "Point-Defense Double Light Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 12, dmg: "5d10", x: 2, count: 2, special: "4 artilheiros" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves Gargantuas ou menores que começam o turno ou entram num raio de 2 quadrados fazem Pilot CD 20 como reação ou sofrem 4d10×2 de dano" })
  }),
  v("Coralskipper", "Caças Estelares", {
    cl: 12, cat: "starfighter", type: "Caça estelar vivo (Yuuzhan Vong)", size: "gargantuan", ab: [39, 22, 18], armor: 7,
    def: [18, 24], hp: 100, dr: 10, sr: 25, dt: 44, speed: [8, 4], maxv: "400 km/h", bab: 5, crew: "expert", sk: SK(9, 8, 8, 9, 8),
    crewText: "1 (expert)", passengers: "Nenhum", cargo: "1,3 toneladas", cons: "1 dia", hyper: "Nenhum",
    avail: "Militar", cost: "Não está à venda", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Volcano Cannons", t: "blaster", st: "pilot", atk: 11, dmg: "6d10", x: 2 },
      { n: "Dovin Basal", t: "tractor", st: "pilot", atk: 11, dmg: "7d10", x: 2, special: "dano só nos escudos (SR −10 em vez de −5)" }
    ],
    notes: notes({
      "Nave viva": "Con 39; computadores a registram como asteroide (atacantes não somam a Int da nave ao ataque; reprogramar: 1 minuto, Use Computer CD 15)",
      "Dovin basal": "o SR não cai com um único tiro mesmo excedido; um ataque em autofire contra ele reduz o SR normalmente (tiro estilhaçado). Ação rápida do piloto: +2 quadrados de deslocamento (escala de nave), +5 SR ou +1 dado no dovin basal"
    })
  }),
  v("CR90 Corvette (SotG)", "Naves Capitais", {
    cl: 16, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [66, 18, 18], armor: 12,
    def: [16, 38], hp: 800, dr: 15, sr: 100, dt: 138, speed: [12, 3], maxv: "950 km/h", bab: 2, crew: "skilled", sk: SK(0, 6, 6, 0, 6),
    crewText: "30 a 165 (skilled; típico 48)", passengers: "Até 600 (típico 150)", cargo: "Até 3.000 toneladas", cons: "1 ano", craft: "Nenhuma", hyper: "×2, navicomputador",
    avail: "Licenciado", cost: "3.500.000 (1.500.000 usado)", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 10, dmg: "5d10", x: 5, count: 2, special: `3 artilheiros; ${CAP20}` }],
    notes: notes({
      "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas nos quadrados adjacentes não entram em dogfight ao passar ao lado de caças inimigos",
      "Retrofit Vanguard c20": "500.000 cr e 2-3 semanas: transforma uma CR70 numa CR90 (não muda a qualidade da tripulação)"
    })
  }),
  v("CR70 Corvette", "Naves Capitais", {
    cl: 8, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [66, 18, 18], armor: 12,
    def: [16, 38], hp: 800, dr: 15, sr: 90, dt: 138, speed: [12, 3], maxv: "950 km/h", bab: 0, crew: "normal", sk: SK(-1, 5, 5, -1, 5),
    crewText: "18 a 150 (normal; típico 30)", passengers: "Até 600 (típico 250)", cargo: "Até 5.000 toneladas", cons: "1 ano", craft: "Nenhuma", hyper: "×2, navicomputador",
    avail: "Licenciado", cost: "2.900.000 (1.000.000 usado)", space: "1 quadrado (escala de nave)", cover: "Total", w: []
  }),
  v("Dreadnaught-class Heavy Cruiser", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [96, 10, 16], armor: 13,
    def: [13, 53], hp: 1680, dr: 20, sr: 115, dt: 253, speed: [0, 1], bab: 2, crew: "skilled", sk: SK(-4, 6, 6, -4, 6),
    crewText: "16.210 (skilled)", passengers: "3.000", cargo: "9.000 toneladas", cons: "2 anos", craft: "12 caças", hyper: "×2 (reserva ×18), navicomputador",
    avail: "Militar", cost: "Não está à venda (mercado negro 35.555.000 usado)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 13, dmg: "7d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Light Quad Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 13, dmg: "5d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Light Turbolasers", t: "turbolaser", st: "gunner", atk: 5, dmg: "2d10", x: 5, count: 2, special: CAP20 }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: ataques contra naves aliadas Colossais (fragata) ou maiores num raio de 2 quadrados são redirecionados a este cruzador" })
  }),
  v("Outbound Flight", "Naves Capitais", {
    cl: 22, cat: "capital", type: "Nave capital (única)", size: "colossalStation", ab: [218, 6, 16], armor: 13,
    def: [11, 114], hp: 9000, dr: 20, sr: 165, dt: 514, speed: [0, 1], bab: 2, crew: "skilled", sk: SK(-6, 6, 6, -6, 6),
    crewText: "5.000 (skilled)", passengers: "46.000", cargo: "19.000 toneladas", cons: "10 anos", craft: "Diversas naves auxiliares", hyper: "×2 (reserva ×18), navicomputador",
    avail: "Militar", cost: "Não está à venda (única)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "9d10", x: 5, count: 15, special: `6 artilheiros; ${CAP20}` },
      { n: "Laser Cannon Battery", t: "laser", st: "gunner", atk: 13, dmg: "6d10", x: 5, count: 3, special: `5 artilheiros; ${CAP20}` },
      { n: "Quad Laser Cannon Battery", t: "laser", st: "gunner", atk: 15, dmg: "7d10", x: 2, auto: true, count: 5, special: "6 artilheiros" }
    ],
    notes: notes({ "Estrutura": "seis cruzadores Dreadnaught em anel ao redor de uma fuselagem central; cada cruzador pode se destacar" })
  }),
  v("Vulture-class Droid Starfighter", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar / veículo terrestre (walker)", size: "huge", ab: [34, 16, 14], armor: 3,
    def: [14, 22], hp: 60, dr: 10, dt: 32, speed: [16, 4], maxv: "1.180 km/h", bab: 5, crew: "expert", sk: SK(9, 8, 8, 9, 9),
    crewText: "0 (droide, expert)", passengers: "Nenhum", cargo: "Nenhuma", cons: "2 dias", payload: "6 mísseis de concussão médios", hyper: "Nenhum",
    avail: "Restrito", cost: "19.000", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Nenhuma",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "4d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 7, dmg: "8d10", x: 2, area: "Splash 4", ammo: 6, special: "fire-link" }
    ],
    notes: notes({ "Caça droide": "imune como droide (efeitos mentais etc.); ataca com todas as armas como se cada uma tivesse artilheiro próprio. Modo walker: deslocamento 6 quadrados" })
  }),
  v("Scarab-class Droid Starfighter", "Caças Estelares", {
    cl: 6, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [36, 14, 14], armor: 3,
    def: [13, 23], hp: 80, dr: 10, sr: 20, dt: 43, speed: [12, 3], maxv: "900 km/h", bab: 2, crew: "skilled", sk: SK(6, 6, 6, 6, 6),
    crewText: "0 (droide, skilled)", passengers: "Nenhum", cargo: "Nenhuma", cons: "2 dias", hyper: "Nenhum",
    avail: "Restrito", cost: "17.000", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Nenhuma",
    w: [{ n: "Blaster Cannons", t: "blaster", st: "pilot", atk: 4, dmg: "5d10", x: 2, auto: true }],
    notes: notes({ "Caça droide": "imune como droide; ataca com todas as armas como se cada uma tivesse artilheiro próprio" })
  }),
  v("Dynamic-class Freighter", "Transportes", {
    cl: 6, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [40, 10, 16], armor: 12,
    def: [12, 25], hp: 110, dr: 15, dt: 75, speed: [12, 2], maxv: "800 km/h", bab: 0, crew: "normal", sk: SK(-5, 5, 5, -5, 5),
    crewText: "2 (normal)", passengers: "6", cargo: "60 toneladas", cons: "2 meses", craft: "Nenhuma", hyper: "×3, navicomputador",
    avail: "Licenciado", cost: "80.000 (30.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Double Laser Cannons", t: "laser", st: "gunner", atk: 3, dmg: "4d10", x: 2, auto: true }],
    notes: notes({ "Fácil de modificar": "+2 de circunstância em Mechanics para reparar ou modificar esta nave" })
  }),
  v("E-wing Starfighter, Type B", "Caças Estelares", {
    cl: 12, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [46, 23, 17], armor: 8,
    def: [19, 28], hp: 150, dr: 10, sr: 15, dt: 48, speed: [16, 6], maxv: "1.300 km/h", bab: 5, crew: "expert", sk: SK(9, 8, 8, 9, 8),
    crewText: "1 + droide astromecânico (expert)", passengers: "Nenhum", cargo: "110 kg", cons: "1 semana", payload: "16 torpedos de prótons", hyper: "×2, memória de 10 saltos (astromecânico)",
    avail: "Militar/Restrito/Licenciado", cost: "200.000 (80.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação e astromecânico)",
    w: [
      { n: "Triple Heavy Blaster Cannons", t: "blaster", st: "pilot", atk: 10, dmg: "6d10", x: 2, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 10, dmg: "9d10", x: 2, area: "Splash 4", ammo: 16, special: "fire-link" }
    ],
    notes: notes({ "Astromecânico R7": "Mechanics e Use Computer +13 com o droide; só aceita R7 (ou um adaptado por 10.000 cr); com ele, +2 de equipamento em Pilot" })
  }),
  v("Firespray-31 Patrol Craft", "Transportes", {
    cl: 9, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [46, 14, 14], armor: 13,
    def: [15, 28], hp: 150, dr: 15, sr: 30, dt: 78, speed: [12, 3], maxv: "850 km/h", bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "1 (skilled)", passengers: "6", cargo: "70 toneladas", cons: "1 mês", craft: "Nenhuma", hyper: "×3 (reserva ×15), navicomputador",
    avail: "Licenciado", cost: "120.000", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Blaster Cannons", t: "blaster", st: "pilot", atk: 6, dmg: "5d10", x: 2, auto: true },
      { n: "Tractor Beam", t: "tractor", st: "pilot", atk: 6, dmg: "0", x: 1, grp: 40 }
    ],
    notes: notes({
      "Pontos de emplacement": "3 livres para sistemas adicionais",
      "Protótipos originais": "plantas no mercado negro (Gather Information CD 30, uma semana, 12.000 cr); variantes com mais motor, escudos ou jatos de manobra a critério do Mestre"
    })
  }),
  v("Slave I", "Transportes", {
    cl: 17, cat: "transport", type: "Transporte espacial (único)", size: "colossal", ab: [46, 14, 14], armor: 13,
    def: [17, 28], hp: 150, dr: 15, sr: 45, dt: 78, speed: [16, 4], maxv: "1.000 km/h", bab: 14, crew: "ace", sk: SK(8, 9, 16, 8, 9),
    crewText: "1 (único; Boba Fett)", passengers: "6", cargo: "70 toneladas", cons: "1 mês", craft: "Nenhuma", payload: "16 minas de concussão, 8 mísseis de concussão, 4 balizas rastreadoras de prótons", hyper: "×1 (reserva ×8), navicomputador",
    avail: "Única", cost: "Não está à venda", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Blaster Cannons", t: "blaster", st: "pilot", atk: 18, dmg: "5d10", x: 2, auto: true },
      { n: "Concussion Mines", t: "missile", st: "pilot", atk: 18, dmg: "8d10", x: 2, ammo: 16 },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 18, dmg: "8d10", x: 2, area: "Splash 4", ammo: 8 },
      { n: "Ion Cannons", t: "ion", st: "pilot", atk: 18, dmg: "5d10", x: 2, ion: true, auto: true },
      { n: "Proton Torpedoes (baliza)", t: "missile", st: "pilot", atk: 18, dmg: "0", x: 1, ammo: 4, special: "baliza rastreadora: +5 em Use Computer para reencontrar o alvo" },
      { n: "Tractor Beam", t: "tractor", st: "pilot", atk: 18, dmg: "0", x: 1, grp: 52 }
    ],
    notes: notes({ "Propulsores de combate": "conta como caça estelar Gargantua para ser alvo de armas de nave capital, dogfight e manobras de nave. Double Attack (canhões blaster e iônicos)" })
  }),
  v("Nantex-class Territorial Defense Starfighter", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar (geonosiano)", size: "huge", ab: [39, 22, 14], armor: 4,
    def: [18, 24], hp: 100, dr: 10, dt: 34, speed: [16, 5], maxv: "1.250 km/h", bab: 2, crew: "skilled", sk: SK(10, 6, 6, 10, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "50 kg", cons: "2 dias", craft: "Nenhuma", hyper: "Nenhum",
    avail: "Militar", cost: "Não está à venda", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "3d10", x: 2, auto: true }],
    notes: notes({ "Emissores de mira": "+1 de equipamento nos ataques contra alvos a até 2 quadrados. Aviônica feita para geonosianos (outras espécies não conseguem pilotar)" })
  }),
  v("Ginivex-class Starfighter", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [36, 24, 18], armor: 3,
    def: [18, 23], hp: 80, dr: 10, sr: 30, dt: 33, speed: [16, 5], maxv: "1.250 km/h", bab: 5, crew: "expert", sk: SK(13, 8, 8, 13, 8),
    crewText: "1 (expert)", passengers: "Nenhum", cargo: "50 kg", cons: "1 semana", craft: "Nenhuma", hyper: "×1, navicomputador limitado (5 saltos)",
    avail: "Militar", cost: "Não está à venda", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Double Laser Cannons", t: "laser", st: "pilot", atk: 11, dmg: "6d10", x: 2, auto: true }],
    notes: notes({ "Vela solar": "aberta, SR 45 (os 15 extras se esgotam primeiro e somem ao recolher); serve de propulsão se os motores falharem" })
  }),
  v("Ghtroc 720 Freighter", "Transportes", {
    cl: 6, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [40, 14, 13], armor: 12,
    def: [14, 25], hp: 110, dr: 15, sr: 15, dt: 75, speed: [12, 2], maxv: "750 km/h", bab: 0, crew: "normal", sk: SK(-3, 5, 5, -3, 5),
    crewText: "2 (normal)", passengers: "10", cargo: "135 toneladas", cons: "2 meses", craft: "Nenhuma", hyper: "×2 (reserva ×15), navicomputador",
    avail: "Licenciado", cost: "98.500 (23.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Double Laser Cannons", t: "laser", st: "gunner", atk: 1, dmg: "4d10", x: 2, auto: true }]
  }),
  v("Gozanti Cruiser", "Transportes", {
    cl: 8, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [48, 14, 14], armor: 14,
    def: [16, 29], hp: 180, dr: 15, sr: 15, dt: 79, speed: [6, 1], maxv: "400 km/h", bab: 0, crew: "normal", sk: SK(-3, 5, 5, -3, 5),
    crewText: "12 (normal)", passengers: "12", cargo: "75 toneladas", cons: "1 mês", craft: "Nenhuma", payload: "8 torpedos de prótons", hyper: "×3 (reserva ×12), navicomputador",
    avail: "Licenciado", cost: "150.000 (50.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 4, dmg: "9d10", x: 2, area: "Splash 4", ammo: 8 },
      { n: "Laser Cannon Battery", t: "laser", st: "gunner", atk: 8, dmg: "4d10", x: 2, count: 2, special: "4 artilheiros" },
      { n: "Quad Laser Cannon Battery", t: "laser", st: "gunner", atk: 4, dmg: "5d10", x: 2, auto: true, count: 2, special: "2 artilheiros" }
    ]
  }),
  v("Krayt's Honor", "Transportes", {
    cl: 11, cat: "transport", type: "Transporte espacial (Gozanti modificado, único)", size: "colossal", ab: [54, 14, 18], armor: 18,
    def: [20, 32], hp: 180, dr: 20, sr: 50, dt: 82, speed: [6, 1], maxv: "400 km/h", bab: 5, crew: "expert", sk: SK(0, 8, 8, 0, 8),
    crewText: "6 (expert)", passengers: "12", cargo: "65 toneladas", cons: "1 mês", craft: "Nenhuma", payload: "24 torpedos de prótons", hyper: "×3 (reserva ×12), navicomputador",
    avail: "Licenciado", cost: "150.000 (50.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 13, dmg: "10d10", x: 2, area: "Splash 4", ammo: 24, special: "fire-link" },
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 13, dmg: "5d10", x: 5, special: "3 artilheiros" },
      { n: "Laser Cannon Battery", t: "laser", st: "gunner", atk: 15, dmg: "5d10", x: 2, count: 2, special: "4 artilheiros" },
      { n: "Quad Laser Cannon Battery", t: "laser", st: "gunner", atk: 11, dmg: "5d10", x: 2, auto: true, special: "2 artilheiros" }
    ],
    notes: notes({ "Capitão": "Siqo Vass (Kel Dor); +2 nos torpedos de prótons como piloto treinado (já incluído)" })
  }),
  v("Corellian Gunship", "Naves Capitais", {
    cl: 17, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [68, 19, 16], armor: 12,
    def: [16, 39], hp: 920, dr: 20, sr: 115, dt: 139, speed: [12, 3], maxv: "1.000 km/h", bab: 2, crew: "skilled", sk: SK(0, 6, 6, 0, 6),
    crewText: "91 (skilled)", passengers: "Nenhum", cargo: "300 toneladas", cons: "8 meses", craft: "Nenhuma", payload: "120 mísseis de concussão pesados", hyper: "×2 (reserva ×16), navicomputador",
    avail: "Restrito", cost: "4.800.000 (2.400.000 usado)", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Double Turbolasers", t: "turbolaser", st: "gunner", atk: 5, dmg: "5d10", x: 5, auto: true, count: 8, special: CAP20 },
      { n: "Point-Defense Quad Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 15, dmg: "6d10", x: 2, auto: true, special: "6 artilheiros" },
      { n: "Heavy Concussion Missiles", t: "missile", st: "gunner", atk: 5, dmg: "9d10", x: 5, area: "Splash 4", count: 4, ammo: 120, special: CAP20 }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas nos quadrados adjacentes recebem +1 na Reflexos e inimigas ali sofrem −1. Os turbolasers não podem ser disparados em bateria" })
  }),
  v("Hapan Battle Dragon", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [104, 14, 14], armor: 15,
    def: [17, 57], hp: 2280, dr: 20, sr: 150, dt: 257, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "12.190 (skilled)", passengers: "500 (tropas)", cargo: "6.000 toneladas", cons: "1 ano", craft: "36 caças Miy'til ou X-wing, veículos de apoio", payload: "200 torpedos de prótons, 16 minas de pulso de massa", hyper: "×2 (reserva ×14), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 12, dmg: "7d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Ion Cannon Battery", t: "ion", st: "gunner", atk: 12, dmg: "7d10", x: 5, ion: true, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Proton Torpedo Battery", t: "missile", st: "gunner", atk: 12, dmg: "9d10", x: 2, area: "Splash 4", count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Triple Ion Cannons", t: "ion", st: "gunner", atk: 4, dmg: "5d10", x: 5, ion: true, count: 2 },
      { n: "Tractor Beam", t: "tractor", st: "gunner", atk: 4, dmg: "0", x: 1, grp: 69, special: CAP20 }
    ],
    notes: notes({
      "Minas de pulso de massa": "4 tubos (sem jogada de ataque): impedem naves num raio de 4 quadrados de entrar no hiperespaço por 10 minutos",
      "Tiro tático": "ação padrão, abre mão dos ataques: naves inimigas num raio de 2 quadrados têm −1 quadrado de deslocamento em escala de nave (mín. 1)",
      "Modelos antigos": "atacar mais de um alvo na rodada dá −10 em todos os ataques; turbolasers só disparam a cada 3 rodadas"
    })
  }),
  v("Hapes Nova Cruiser", "Naves Capitais", {
    cl: 17, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [94, 20, 16], armor: 13,
    def: [18, 52], hp: 1000, dr: 20, sr: 100, dt: 152, speed: [0, 4], bab: 2, crew: "skilled", sk: SK(1, 6, 6, 1, 6),
    crewText: "1.790 (skilled)", passengers: "600 (tropas e apoio)", cargo: "600 toneladas", cons: "1 mês", craft: "24 caças, 6 bombardeiros de assalto, veículos de apoio", hyper: "×1,5, navicomputador",
    avail: "Militar", cost: "Não está à venda (mercado negro 20.000.000 usado)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 13, dmg: "7d10", x: 5, count: 5, special: `5 artilheiros; ${CAP20}` },
      { n: "Point-Defense Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 13, dmg: "5d10", x: 2, auto: true, count: 2, special: "5 artilheiros" },
      { n: "Ion Cannon Battery", t: "ion", st: "gunner", atk: 13, dmg: "5d10", x: 5, ion: true, count: 2, special: `5 artilheiros; ${CAP20}` }
    ],
    notes: notes({
      "Tiro tático": "ação padrão, abre mão dos ataques: ataque bem-sucedido contra caça inimigo num raio de 2 quadrados que iguale ou exceda o Limiar faz o alvo descer −1 passo adicional",
      "Reforma": "turbolasers em cadência normal, provisões de 1 ano, defletores regenerativos (+10 SR ao recarregar escudos), 12 caças; ND 19"
    })
  }),
  v("Gamma-class Assault Shuttle", "Transportes", {
    cl: 15, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [74, 18, 18], armor: 13,
    def: [17, 28], hp: 360, dr: 15, sr: 230, dt: 78, speed: [16, 4], maxv: "1.050 km/h", bab: 2, crew: "skilled", sk: SK(0, 6, 6, 0, 6),
    crewText: "5 (skilled)", passengers: "40 (tropas)", cargo: "5 toneladas", cons: "1 semana", craft: "Nenhuma", payload: "15 mísseis de concussão", hyper: "×2 (reserva ×18), navicomputador limitado (3 saltos)",
    avail: "Militar", cost: "850.000 (340.000 usado)", space: "15×15 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolasers", t: "turbolaser", st: "gunner", atk: 6, dmg: "2d10", x: 5, count: 4, special: CAP20 },
      { n: "Tractor Beam", t: "tractor", st: "gunner", atk: 6, dmg: "0", x: 1, grp: 54, special: CAP20 },
      { n: "Medium Concussion Missiles", t: "missile", st: "gunner", atk: 6, dmg: "8d10", x: 2, area: "Splash 4", ammo: 15 }
    ],
    notes: notes({ "Escudos sobrecarregados": "perde 5 pontos de SR a cada ataque bem-sucedido; o SR cai a 0 se um ataque causar dano maior que o SR atual" })
  }),
  v("Imperial II-class Star Destroyer", "Naves Capitais", {
    cl: 20, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [103, 14, 20], armor: 16,
    def: [18, 56], hp: 2100, dr: 20, sr: 125, dt: 256, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "37.085 (skilled)", passengers: "9.700", cargo: "36.000 toneladas", cons: "6 anos", craft: "72 caças TIE, 8 shuttles Lambda, 20 AT-AT, 20 AT-ST, veículos de apoio", hyper: "×2 (reserva ×8), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "11d10", x: 5, count: 5, special: `5 artilheiros; ${CAP20}` },
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "8d10", x: 5, count: 5, special: `5 artilheiros; ${CAP20}` },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 15, dmg: "3d10", x: 5, ion: true, count: 4, special: `5 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 15, dmg: "0", x: 1, grp: 68, count: 2, special: `5 artilheiros; ${CAP20}` }
    ],
    notes: notes({
      "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas que atacam alvos num raio de 2 quadrados recebem +2 nos ataques",
      "Usando o Destróier": "como desafio, só para heróis de nível alto; como cenário, use o tiro tático e deixe o combate com os caças TIE (sem XP a menos que seja destruído)"
    })
  }),
  v("Victory II-class Star Destroyer", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [92, 14, 18], armor: 12,
    def: [14, 51], hp: 1380, dr: 20, sr: 150, dt: 251, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "5.200 (skilled)", passengers: "2.040 (tropas)", cargo: "6.107 toneladas", cons: "4 anos", craft: "24 caças TIE, 5 shuttles Lambda, 10 AT-AT, 15 AT-ST, 10 Juggernauts, veículos de apoio", hyper: "×1 (reserva ×15), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "7d10", x: 5, count: 4, special: `5 artilheiros; ${CAP20}` },
      { n: "Double Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "4d10", x: 5, count: 4, special: `5 artilheiros; ${CAP20}` },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 14, dmg: "4d10", x: 5, ion: true, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 14, dmg: "0", x: 1, grp: 63, count: 2, special: `5 artilheiros; ${CAP20}` }
    ]
  }),
  v("Pellaeon-class Star Destroyer", "Naves Capitais", {
    cl: 28, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [105, 14, 22], armor: 14,
    def: [16, 57], hp: 2350, dr: 20, sr: 140, dt: 257, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "8.450 (skilled)", passengers: "2.700 (tropas)", cargo: "11.000 toneladas", cons: "6 meses", craft: "48 caças Predator, 6 shuttles", payload: "200 torpedos de prótons", hyper: "×0,75, navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 16, dmg: "12d10", x: 5, count: 5, special: `5 artilheiros; ${CAP20}` },
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 16, dmg: "8d10", x: 5, count: 5, special: `5 artilheiros; ${CAP20}` },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 16, dmg: "6d10", x: 5, ion: true, count: 4, special: `5 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 16, dmg: "0", x: 1, grp: 69, count: 3, special: `5 artilheiros; ${CAP20}` },
      { n: "Proton Torpedo Battery", t: "missile", st: "gunner", atk: 16, dmg: "10d10", x: 5, area: "Splash 4", count: 5, ammo: 200, special: `5 artilheiros; ${CAP20}` }
    ]
  }),
  v("Immobilizer 418 Interdictor-class Heavy Cruiser", "Naves Capitais", {
    cl: 17, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [94, 14, 18], armor: 15,
    def: [17, 52], hp: 1500, dr: 20, sr: 150, dt: 252, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "2.807 (skilled)", passengers: "80 (tropas)", cargo: "5.500 toneladas", cons: "1,2 ano", craft: "24 caças", hyper: "×2 (reserva ×8), navicomputador",
    avail: "Militar", cost: "Não está à venda (mercado negro 52.240.000)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Light Quad Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 12, dmg: "4d10", x: 5, count: 5, special: `4 artilheiros; ${CAP20}` },
      { n: "Gravity Well Projector", t: "tractor", st: "gunner", atk: 12, dmg: "0", x: 1, count: 4, area: "4×4 quadrados (escala de nave)", special: "campo de interdição (ver notas)" }
    ],
    notes: notes({
      "Projetor de poço gravitacional": "ataque de área contra Reflexos 10 numa área de 3×3 quadrados (escala de nave) ao alcance; sem dano, cria um campo de interdição: nave que começa o turno num quadrado afetado não pode ativar o hiperpropulsor",
      "Tiro tático": "ação padrão, abre mão dos ataques: naves inimigas que entram ou param num raio de 2 quadrados fazem Pilot CD 20; se falharem, ficam presas até o fim da rodada"
    })
  }),
  v("Vindicator-class Heavy Cruiser", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [98, 14, 18], armor: 15,
    def: [17, 54], hp: 1800, dr: 20, sr: 150, dt: 254, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "2.551 (skilled)", passengers: "400 (tropas)", cargo: "8.000 toneladas", cons: "1,5 ano", craft: "24 caças", hyper: "×2 (reserva ×8), navicomputador",
    avail: "Militar", cost: "Não está à venda (mercado negro 43.000.000)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Light Quad Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 12, dmg: "4d10", x: 5, count: 5, special: `4 artilheiros; ${CAP20}` },
      { n: "Light Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "4d10", x: 5, count: 5, special: `5 artilheiros; ${CAP20}` },
      { n: "Point-Defense Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 14, dmg: "4d10", x: 2, count: 4, special: "5 artilheiros" },
      { n: "Point-Defense Ion Cannon Battery", t: "ion", st: "gunner", atk: 14, dmg: "4d10", x: 2, ion: true, count: 4, special: "5 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 16, dmg: "0", x: 1, grp: 66, special: `6 artilheiros; ${CAP20}` }
    ],
    notes: notes({ "Tiro tático": "igual ao Immobilizer 418: naves inimigas que entram ou param num raio de 2 quadrados fazem Pilot CD 20 ou ficam presas até o fim da rodada" })
  }),
  v("Imperial Customs Corvette", "Naves Capitais", {
    cl: 14, cat: "capital", type: "Transporte espacial (fragata)", size: "colossalFrigate", ab: [56, 18, 14], armor: 13,
    def: [17, 33], hp: 320, dr: 15, sr: 45, dt: 133, speed: [16, 4], maxv: "1.050 km/h", bab: 2, crew: "skilled", sk: SK(0, 6, 6, 0, 6),
    crewText: "58 (skilled)", passengers: "20 (tropas)", cargo: "500 toneladas", cons: "2 meses", craft: "Nenhuma", hyper: "×2 (reserva ×8), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Double Laser Cannon Battery", t: "laser", st: "gunner", atk: 14, dmg: "4d10", x: 2, special: "6 artilheiros" }]
  }),
  v("J-Type Star Skiff", "Transportes", {
    cl: 14, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [48, 22, 18], armor: 14,
    def: [20, 29], hp: 200, dr: 15, sr: 50, dt: 79, speed: [16, 4], maxv: "1.050 km/h", bab: 10, crew: "ace", sk: SK(8, 12, 12, 8, 12),
    crewText: "3 (ace)", passengers: "3", cargo: "10 toneladas", cons: "1 mês", craft: "Nenhuma", hyper: "×0,5, navicomputador",
    avail: "Restrito", cost: "Não está à venda (mercado negro 5.000.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "gunner", atk: 14, dmg: "7d10", x: 2, auto: true }],
    notes: notes({ "Ágil": "conta como caça estelar Gargantua para ser alvo de armas de nave capital, dogfight e manobras de nave. Duas camas médicas" })
  }),
  v("Junker TYE-wing", "Caças Estelares", {
    cl: 5, cat: "starfighter", type: "Caça estelar (modelo junker)", size: "huge", ab: [30, 16, 12], armor: 3,
    def: [14, 20], hp: 60, dr: 10, dt: 30, speed: [16, 5], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(2, 6, 6, 7, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "65 kg", cons: "2 dias", craft: "Nenhuma", hyper: "Nenhum",
    avail: "Militar", cost: "60.000 (25.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 5, dmg: "4d10", x: 2, auto: true }],
    notes: notes({
      "Modelo Junker": "ND −20%; Iniciativa −5; For −4, Des −2, Int −2 (mín. 10). Remendos: −2 na CD de Mechanics. Falha de sistema: cada vez que desce −1 passo, um sistema falha até voltar a subir (d%: 01-30 hiperpropulsor; 31-60 motores, −1 quadrado em escala de nave e mesma proporção no deslocamento de personagem; 61-85 uma arma ou bateria; 86-95 núcleo do computador, −5 em Perception e Use Computer; 96-100 escudos)",
      "TYE-wing": "cabine de TIE com motores de Y-wing"
    })
  }),
  v("K-wing (BTL-S8)", "Caças Estelares", {
    cl: 12, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [46, 20, 20], armor: 8,
    def: [18, 28], hp: 160, dr: 10, sr: 30, dt: 48, speed: [16, 4], maxv: "1.000 km/h", bab: 2, crew: "skilled", sk: SK(10, 6, 6, 6, 6),
    crewText: "4 (skilled)", passengers: "Nenhum", cargo: "440 kg", cons: "1 dia", craft: "Nenhuma", payload: "18 torpedos de prótons, 4 mísseis de concussão, 6 torpedos de plasma", hyper: "Nenhum",
    avail: "Militar", cost: "250.000 (120.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "gunner", atk: 7, dmg: "4d10", x: 2, auto: true },
      { n: "Quad Laser Cannon", t: "laser", st: "gunner", atk: 7, dmg: "6d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "gunner", atk: 7, dmg: "8d10", x: 2, auto: true, area: "Splash 4", ammo: 4, special: "um tipo de munição por vez" },
      { n: "Proton Torpedoes", t: "missile", st: "gunner", atk: 7, dmg: "9d10", x: 2, auto: true, area: "Splash 4", ammo: 18, special: "um tipo de munição por vez" },
      { n: "Shieldbuster Torpedoes", t: "missile", st: "gunner", atk: 7, dmg: "8d10", x: 2, auto: true, area: "Splash 4", special: "um tipo de munição por vez" }
    ],
    notes: notes({ "Carga modular": "pode trocar qualquer carga por outro míssil ou mina com custo de emplacement 0 ou menos (Mechanics CD 10, 5 minutos). Possui SLAM; a cabine se destaca como cápsula de fuga" })
  }),
  v("Lambda-class Shuttle", "Transportes", {
    cl: 12, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [42, 14, 14], armor: 12,
    def: [14, 26], hp: 120, dr: 10, sr: 25, dt: 76, speed: [12, 4], maxv: "850 km/h", bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "6 (skilled)", passengers: "20", cargo: "80 toneladas", cons: "2 meses", craft: "Nenhuma", hyper: "×1 (reserva ×10), navicomputador",
    avail: "Militar", cost: "Não está à venda (valor estimado 240.000)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Blaster Cannon Battery", t: "blaster", st: "gunner", atk: 6, dmg: "5d10", x: 2, auto: true, special: "2 artilheiros" },
      { n: "Blaster Cannon", t: "blaster", st: "copilot", atk: 4, dmg: "5d10", x: 2, auto: true },
      { n: "Twin Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "2d10", x: 2, auto: true }
    ]
  }),
  v("Lancer-class Frigate", "Naves Capitais", {
    cl: 14, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [66, 14, 18], armor: 12,
    def: [14, 38], hp: 800, dr: 15, sr: 125, dt: 138, speed: [0, 3], bab: 0, crew: "normal", sk: SK(-3, 5, 5, -3, 5),
    crewText: "850 (normal)", passengers: "40 (tropas)", cargo: "300 toneladas", cons: "1 semana", craft: "Nenhuma", hyper: "×2 (reserva ×15), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Point-Defense Quad Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 12, dmg: "4d10", x: 2, auto: true, count: 4, special: "5 artilheiros" }],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves inimigas Gargantuas ou menores nos quadrados adjacentes têm o SR reduzido à metade enquanto estiverem ali" })
  }),
  v("Mankvim-814 Light Interceptor", "Caças Estelares", {
    cl: 5, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [32, 17, 14], armor: 6,
    def: [14, 21], hp: 50, dr: 10, sr: 15, dt: 41, speed: [16, 6], maxv: "1.450 km/h", bab: 0, crew: "normal", sk: SK(3, 5, 5, 3, 5),
    crewText: "1 droide (normal)", passengers: "Nenhum", cargo: "Nenhuma", cons: "2 horas", craft: "Nenhuma", hyper: "Nenhum",
    avail: "Licenciado", cost: "15.000 (6.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Light Laser Cannons", t: "laser", st: "pilot", atk: 4, dmg: "2d10", x: 2, auto: true }],
    notes: notes({ "Cabine": "tem controles normais, então um piloto vivo também pode voá-lo" })
  }),
  v("Marauder Corvette", "Naves Capitais", {
    cl: 14, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [64, 15, 18], armor: 12,
    def: [14, 37], hp: 720, dr: 20, sr: 115, dt: 137, speed: [0, 3], bab: 0, crew: "normal", sk: SK(-3, 5, 5, -3, 5),
    crewText: "177 (normal)", passengers: "80 (tropas)", cargo: "300 toneladas", cons: "3 meses", craft: "12 caças, 2 barcaças de desembarque, 4 shuttles", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Militar", cost: "2.400.000 (1.450.000 usado)", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Double Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 10, dmg: "4d10", x: 5, auto: true, count: 2, special: `4 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 8, dmg: "0", x: 1, grp: 47, special: `3 artilheiros; ${CAP20}` }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas Gargantuas ou menores nos quadrados adjacentes recebem +2 nos ataques. Variante porta-caças da Aliança: sem turbolasers, 4 lançadores de mísseis de concussão e até 36 caças" })
  }),
  v("Gallofree GR-75 Medium Transport", "Naves Capitais", {
    cl: 8, cat: "capital", type: "Nave capital (transporte)", size: "colossalFrigate", ab: [58, 10, 12], armor: 14,
    def: [14, 34], hp: 400, dr: 15, sr: 45, dt: 134, speed: [12, 2], maxv: "650 km/h", bab: 0, crew: "normal", sk: SK(-5, 5, 5, -5, 5),
    crewText: "6 (normal)", passengers: "40", cargo: "19.000 toneladas", cons: "6 meses", craft: "Nenhuma", hyper: "×4, navicomputador",
    avail: "Licenciado", cost: "350.000 (125.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Point-Defense Double Laser Cannons", t: "pointDefense", st: "gunner", atk: 1, dmg: "4d10", x: 2, auto: true, count: 4 }]
  }),
  v("Miy'til Fighter", "Caças Estelares", {
    cl: 9, cat: "starfighter", type: "Caça estelar (hapano)", size: "huge", ab: [38, 22, 16], armor: 3,
    def: [17, 24], hp: 90, dr: 10, sr: 20, dt: 34, speed: [16, 4], maxv: "1.150 km/h", bab: 2, crew: "skilled", sk: SK(10, 6, 6, 10, 6),
    crewText: "1 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "25 kg", cons: "1 semana", craft: "Nenhuma", payload: "6 mísseis de concussão médios", hyper: "×1,5 (reserva ×12), memória de 5 saltos (astromecânico)",
    avail: "Militar", cost: "210.000 (85.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (piloto), +5 ou total (astromecânico)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "5d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 7, dmg: "8d10", x: 2, area: "Splash 4", ammo: 6 }
    ],
    notes: notes({ "Astromecânico": "Mechanics e Use Computer +13 com o droide. Versões de comando: terceiro canhão laser, dois canhões iônicos e um segundo lançador" })
  }),
  v("Miy'til Assault Bomber", "Caças Estelares", {
    cl: 11, cat: "starfighter", type: "Caça estelar (hapano)", size: "gargantuan", ab: [44, 18, 16], armor: 8,
    def: [17, 27], hp: 120, dr: 10, sr: 30, dt: 47, speed: [16, 4], maxv: "1.000 km/h", bab: 2, crew: "skilled", sk: SK(5, 6, 6, 5, 6),
    crewText: "2 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "400 kg", cons: "2 dias", craft: "Nenhuma", payload: "32 mísseis de concussão médios", hyper: "×2 (reserva ×12), memória de 5 saltos (astromecânico)",
    avail: "Militar", cost: "Não está à venda (mercado negro 150.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "5d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "gunner", atk: 7, dmg: "9d10", x: 2, area: "Splash 4", ammo: 32 }
    ],
    notes: notes({ "Astromecânico": "Mechanics e Use Computer +13 com o droide" })
  }),
  v("Mon Calamari MC80 Star Cruiser", "Naves Capitais", {
    cl: 19, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [98, 16, 16], armor: 13,
    def: [16, 54], hp: 1800, dr: 20, sr: 150, dt: 254, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-1, 6, 6, -1, 6),
    crewText: "5.402 (skilled)", passengers: "1.200 (tropas)", cargo: "20.000 toneladas", cons: "2 anos", craft: "36 caças A-, B-, X- e/ou Y-wing, 2 cargueiros leves", hyper: "×1 (reserva ×9), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "5d10", x: 5, count: 4, special: `6 artilheiros; ${CAP20}` },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 11, dmg: "3d10", x: 5, ion: true, count: 5, special: `4 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 15, dmg: "0", x: 1, grp: 66, special: `6 artilheiros; ${CAP20}` }
    ],
    notes: notes({
      "Escudos reserva": "ao recarregar escudos, recupera 10 pontos de SR em vez de 5",
      "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas num raio de 2 quadrados recebem +10 SR enquanto o SR delas for maior que 0"
    })
  }),
  v("Home One", "Naves Capitais", {
    cl: 19, cat: "capital", type: "Nave capital (MC80 variante)", size: "colossalCruiser", ab: [98, 16, 16], armor: 13,
    def: [16, 54], hp: 1950, dr: 20, sr: 150, dt: 254, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-1, 6, 6, -1, 6),
    crewText: "5.402 (skilled)", passengers: "1.200 (tropas)", cargo: "20.000 toneladas", cons: "2 anos", craft: "120 caças A-, B-, X- e/ou Y-wing", hyper: "×1 (reserva ×9), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "5d10", x: 5, count: 6, special: `6 artilheiros; ${CAP20}` },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 15, dmg: "3d10", x: 5, ion: true, count: 6, special: `6 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 15, dmg: "0", x: 1, grp: 66, special: `6 artilheiros; ${CAP20}` }
    ],
    notes: notes({ "Escudos reserva e tiro tático": "como o MC80 padrão" })
  }),
  v("Viscount-class Star Defender", "Naves Capitais", {
    cl: 45, cat: "capital", type: "Estação espacial (Mon Calamari)", size: "colossalStation", ab: [134, 12, 24], armor: 19,
    def: [20, 72], hp: 2700, dr: 20, sr: 400, dt: 572, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "68.174 (skilled)", passengers: "12.500 (tropas), 200.000 (apoio/refugiados)", cargo: "200.000 toneladas", cons: "6 anos", craft: "168 caças, 48 caças pesados, até 1.000 outras naves pequenas", payload: "6.000 mísseis de concussão médios", hyper: "×1 (reserva ×12), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 17, dmg: "11d10", x: 5, count: 25, special: `5 artilheiros; ${CAP20}` },
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 17, dmg: "8d10", x: 5, count: 25, special: `5 artilheiros; ${CAP20}` },
      { n: "Point-Defense Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 17, dmg: "4d10", x: 2, count: 25, special: "5 artilheiros" },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 19, dmg: "4d10", x: 5, ion: true, count: 25, special: `6 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 17, dmg: "0", x: 1, grp: 84, count: 8, special: `5 artilheiros; ${CAP20}` },
      { n: "Heavy Concussion Missile Battery", t: "missile", st: "gunner", atk: 17, dmg: "12d10", x: 5, area: "Splash 4", count: 5, special: `5 artilheiros; ${CAP20}` }
    ],
    notes: notes({
      "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas num raio de 3 quadrados recebem +20 SR e +1 na Reflexos",
      "Concentre o fogo": "naves gigantes acertam críticos com frequência; limite os ataques contra PJs e PdMs importantes e dê a elas alvos grandes"
    })
  }),
  v("Naboo Royal N-1 Starfighter", "Caças Estelares", {
    cl: 8, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [34, 18, 14], armor: 6,
    def: [15, 22], hp: 60, dr: 10, sr: 15, dt: 42, speed: [16, 4], maxv: "1.100 km/h", bab: 2, crew: "skilled", sk: SK(5, 6, 6, 5, 6),
    crewText: "1 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "65 kg", cons: "1 semana", craft: "Nenhuma", payload: "10 torpedos de prótons", hyper: "×1, memória de 10 saltos (astromecânico)",
    avail: "Restrito", cost: "Não está à venda", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "5d10", x: 2, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 6, dmg: "10d10", x: 2, area: "Splash 4", ammo: 10, special: "fire-link" }
    ],
    notes: notes({ "Astromecânico": "Mechanics e Use Computer +13 com o droide" })
  }),
  v("Nebula-class Star Destroyer", "Naves Capitais", {
    cl: 26, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [102, 16, 22], armor: 16,
    def: [19, 56], hp: 2100, dr: 20, sr: 250, dt: 256, speed: [0, 3], bab: 5, crew: "expert", sk: SK(1, 8, 8, 1, 8),
    crewText: "7.039 (expert)", passengers: "1.600 (tropas)", cargo: "15.000 toneladas", cons: "6 meses", craft: "60 caças, 12 transportes espaciais", payload: "240 mísseis de concussão pesados", hyper: "×1 (reserva ×10), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 18, dmg: "11d10", x: 5, count: 4, special: `5 artilheiros; ${CAP20}` },
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 18, dmg: "8d10", x: 5, count: 4, special: `5 artilheiros; ${CAP20}` },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 18, dmg: "3d10", x: 5, ion: true, count: 4, special: `5 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 16, dmg: "0", x: 1, grp: 81, count: 2, special: `4 artilheiros; ${CAP20}` },
      { n: "Heavy Concussion Missile Battery", t: "missile", st: "gunner", atk: 16, dmg: "9d10", x: 5, area: "Splash 4", count: 2, ammo: 240, special: `5 artilheiros; ${CAP20}` }
    ],
    notes: notes({
      "Tiro tático": "ação padrão, abre mão dos ataques: ataques contra naves Colossais (fragata) ou maiores num raio de 2 quadrados causam dano triplo no crítico (quádruplo se já causariam triplo)",
      "Variante Endurance (porta-frota)": "troca os turbolasers pesados, todas menos duas baterias de turbolaser, metade dos raios tratores, os canhões iônicos e 1 mês de provisões por duas alas extras de caças pesados e quatro baterias de laser de defesa"
    })
  }),
  v("Nebulon-B Frigate", "Naves Capitais", {
    cl: 16, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [64, 14, 14], armor: 12,
    def: [14, 37], hp: 720, dr: 15, sr: 100, dt: 137, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "920 (skilled)", passengers: "75 (tropas)", cargo: "6.000 toneladas", cons: "2 anos", craft: "24 caças", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "4d10", x: 5, count: 2, special: `6 artilheiros; ${CAP20}` },
      { n: "Point-Defense Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 14, dmg: "2d10", x: 2, auto: true, count: 2, special: "6 artilheiros" },
      { n: "Tractor Beam", t: "tractor", st: "gunner", atk: 4, dmg: "0", x: 1, grp: 49, count: 2, special: CAP20 }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas nos quadrados adjacentes recebem +5 de intuição em Pilot. Versão hospitalar (como a Redemption): atende até 700 feridos" })
  }),
  v("Porax-38 Starfighter", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [38, 20, 14], armor: 6,
    def: [16, 24], hp: 90, dr: 10, sr: 25, dt: 44, speed: [16, 5], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(6, 6, 6, 6, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "65 kg", cons: "2 dias", craft: "Nenhuma", hyper: "×1, navicomputador limitado (4 saltos)",
    avail: "Militar", cost: "120.000 (50.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "5d10", x: 2, auto: true }],
    notes: notes({
      "Sensores": "+2 de equipamento em Use Computer com os sensores; feito para pilotos utai (adaptar para Médios é caro)",
      "Bloqueadores": "ativos, +2 de equipamento nos ataques contra naves controladas por droides num raio de 5 quadrados",
      "Variante Jenta": "6 bombas iônicas guiadas, só em atmosfera (−4 no ataque): 5d10 de dano iônico num raio de 20 quadrados (escala de personagem)"
    })
  }),
  v("Predator-class Starfighter", "Caças Estelares", {
    cl: 11, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [39, 28, 14], armor: 7,
    def: [21, 24], hp: 100, dr: 10, sr: 15, dt: 44, speed: [16, 6], maxv: "1.500 km/h", bab: 2, crew: "skilled", sk: SK(10, 6, 6, 10, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "70 kg", cons: "1 semana", craft: "Nenhuma", hyper: "×1, navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "5d10", x: 2, auto: true }]
  }),
  v("Rebel Assault Frigate Prototype", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital (modelo protótipo)", size: "colossalCruiser", ab: [98, 12, 18], armor: 13,
    def: [14, 54], hp: 1440, dr: 20, sr: 115, dt: 244, speed: [0, 1], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "1.459 (skilled)", passengers: "3.000", cargo: "9.000 toneladas", cons: "2 anos", craft: "3 shuttles", hyper: "×2 (reserva ×18), navicomputador",
    avail: "Militar", cost: "Não está à venda (mercado negro 40.250.000 usado)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "7d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Light Quad Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "4d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "2d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` }
    ],
    notes: notes({ "Modelo Prototype": "Limiar −(mod. de tamanho); For, Des e Int +2; +1 quadrado em escala de nave; um benefício e uma desvantagem aleatórios (armadura, PV, SR, deslocamento, tripulação, passageiros, carga, naves, armas). Manutenção: 8 horas por mês e Mechanics CD 20, ou perde os bônus e desce −1 passo. Custo base 50.000 cr × modificador de tamanho, 1 dia por 5.000 cr" })
  }),
  v("Rebel Assault Frigate Mk I", "Naves Capitais", {
    cl: 16, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [94, 16, 16], armor: 13,
    def: [16, 52], hp: 1500, dr: 20, sr: 150, dt: 252, speed: [0, 3], bab: 0, crew: "normal", sk: SK(-2, 5, 5, -2, 5),
    crewText: "5.000 (normal)", passengers: "100 (tropas)", cargo: "7.500 toneladas", cons: "1,5 ano", craft: "1 shuttle de assalto imperial", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Light Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 11, dmg: "2d10", x: 5, count: 3, special: `5 artilheiros; ${CAP20}` },
      { n: "Quad Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 11, dmg: "4d10", x: 5, count: 4, special: `5 artilheiros; ${CAP20}` },
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 11, dmg: "7d10", x: 5, count: 3, special: `5 artilheiros; ${CAP20}` }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves inimigas num raio de 2 quadrados sofrem −2 nos ataques. 20 acoplamentos umbilicais externos (6 para transportes); naves acopladas não entram no hiperespaço" })
  }),
  v("Rebel Assault Frigate Mk II", "Naves Capitais", {
    cl: 17, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [94, 16, 16], armor: 13,
    def: [16, 52], hp: 1500, dr: 20, sr: 150, dt: 252, speed: [0, 3], bab: 0, crew: "normal", sk: SK(-2, 5, 5, -2, 5),
    crewText: "4.820 (normal)", passengers: "100 (tropas)", cargo: "7.500 toneladas", cons: "1,5 ano", craft: "1 shuttle de assalto imperial", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Light Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 11, dmg: "3d10", x: 5, count: 3, special: `5 artilheiros; ${CAP20}` },
      { n: "Quad Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 11, dmg: "4d10", x: 5, count: 3, special: `5 artilheiros; ${CAP20}` },
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 11, dmg: "7d10", x: 5, count: 3, special: `5 artilheiros; ${CAP20}` }
    ],
    notes: notes({ "Escudos regenerativos": "ao recarregar escudos, recupera 10 pontos de SR em vez de 5. Tiro tático igual ao Mk I (−2 nos ataques inimigos num raio de 2)" })
  }),
  v("Consular-class Cruiser", "Naves Capitais", {
    cl: 8, cat: "capital", type: "Transporte espacial (fragata)", size: "colossalFrigate", ab: [69, 18, 14], armor: 14,
    def: [18, 39], hp: 960, dr: 15, sr: 100, dt: 139, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(0, 6, 6, 0, 6),
    crewText: "8 (skilled)", passengers: "16", cargo: "1.000 toneladas", cons: "6 meses", craft: "Nenhuma", hyper: "×2, navicomputador",
    avail: "Licenciado", cost: "1.250.000 (400.000 usado)", space: "1 quadrado (escala de nave)", cover: "Total", w: [],
    notes: notes({ "Módulo de salão": "trocável em minutos (luxo, mísseis, tanques de bacta, sensores...; até 20 pontos de emplacement); serve de cápsula de fuga. 5 pontos de emplacement livres" })
  }),
  v("Scimitar Assault Bomber", "Caças Estelares", {
    cl: 11, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [46, 19, 18], armor: 8,
    def: [17, 28], hp: 150, dr: 10, sr: 25, dt: 48, speed: [16, 4], maxv: "1.150 km/h", bab: 2, crew: "skilled", sk: SK(5, 6, 6, 5, 6),
    crewText: "2 (skilled)", passengers: "Nenhum", cargo: "200 kg", cons: "2 dias", craft: "Nenhuma", payload: "16 mísseis de concussão médios", hyper: "Nenhum",
    avail: "Militar", cost: "120.000 (45.000 usado)", space: "8×8 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Medium Concussion Missiles", t: "missile", st: "copilot", atk: 6, dmg: "9d10", x: 2, area: "Splash 4", count: 2, ammo: 16 },
      { n: "Light Laser Cannons", t: "laser", st: "pilot", atk: 8, dmg: "4d10", x: 2, auto: true }
    ],
    notes: notes({ "Cabine destacável": "a seção dianteira funciona como cápsula de fuga" })
  }),
  v("Sith Infiltrator (Scimitar)", "Transportes", {
    cl: 16, cat: "transport", type: "Transporte espacial (protótipo único)", size: "colossal", ab: [38, 20, 16], armor: 11,
    def: [16, 24], hp: 90, dr: 15, sr: 30, dt: 74, speed: [16, 4], maxv: "1.180 km/h", bab: 10, crew: "ace", sk: SK(7, 12, 12, 7, 12),
    crewText: "1 (ace)", passengers: "6", cargo: "2,5 toneladas", cons: "1 mês", craft: "1 speeder Sith", hyper: "×1,5 (reserva ×12), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 15, dmg: "3d10", x: 5, auto: true }],
    notes: notes({
      "Ágil": "conta como caça estelar Gargantua para ser alvo de armas de nave capital, dogfight e manobras de nave",
      "Furtividade": "dispositivo de camuflagem de cristal estígio; sensores dão +5 de equipamento em Use Computer para detectar naves. Carrega droides sonda Dark Eye, bombas, venenos e afins"
    })
  }),
  v("Sith Interceptor", "Caças Estelares", {
    cl: 5, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [32, 22, 14], armor: 3,
    def: [17, 21], hp: 50, dr: 10, dt: 31, speed: [16, 5], maxv: "1.250 km/h", bab: 0, crew: "normal", sk: SK(9, 5, 5, 9, 5),
    crewText: "1 (normal)", passengers: "Nenhum", cargo: "40 kg", cons: "1 dia", craft: "Nenhuma", hyper: "Nenhum",
    avail: "Militar", cost: "Não está à venda", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannon", t: "laser", st: "pilot", atk: 4, dmg: "3d10", x: 2, auto: true }]
  }),
  v("Skipray Blastboat (GAT-12h)", "Transportes", {
    cl: 15, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [56, 16, 16], armor: 14,
    def: [17, 33], hp: 230, dr: 15, sr: 100, dt: 83, speed: [16, 4], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(-1, 6, 6, -1, 6),
    crewText: "4 (skilled)", passengers: "Nenhum", cargo: "20 toneladas", cons: "1 mês", craft: "Nenhuma", payload: "4 torpedos de prótons pesados, 8 mísseis de concussão pesados", hyper: "×2, navicomputador limitado (4 saltos)",
    avail: "Militar/Restrito/Licenciado", cost: "624.000 (250.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "gunner", atk: 5, dmg: "5d10", x: 2 },
      { n: "Heavy Ion Cannons", t: "ion", st: "gunner", atk: 5, dmg: "4d10", x: 5, ion: true, special: `${CAP20}; alternativo aos torpedos e mísseis` },
      { n: "Heavy Proton Torpedoes", t: "missile", st: "gunner", atk: 5, dmg: "10d10", x: 2, area: "Splash 4", ammo: 4 },
      { n: "Heavy Concussion Missiles", t: "missile", st: "gunner", atk: 5, dmg: "9d10", x: 2, area: "Splash 4", ammo: 8 }
    ],
    notes: notes({ "Ágil": "conta como caça estelar Gargantua para ser alvo de armas de nave capital, dogfight e manobras de nave; em atmosfera, Des +2" })
  }),
  v("Cutlass-9 Patrol Fighter", "Caças Estelares", {
    cl: 5, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [42, 14, 14], armor: 6,
    def: [13, 26], hp: 80, dr: 10, sr: 10, dt: 46, speed: [12, 4], maxv: "800 km/h", bab: 0, crew: "normal", sk: SK(2, 5, 5, 2, 5),
    crewText: "1 (normal)", passengers: "Nenhum", cargo: "110 kg", cons: "2 semanas", craft: "Nenhuma", payload: "8 mísseis de concussão médios", hyper: "×2, navicomputador",
    avail: "Licenciado", cost: "140.000 (65.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 4, dmg: "4d10", x: 2, auto: true },
      { n: "Medium Concussion Missile", t: "missile", st: "pilot", atk: 4, dmg: "8d10", x: 2, area: "Splash 4", ammo: 8 }
    ],
    notes: notes({ "Emplacement": "3 pontos livres" })
  }),
  v("Star Galleon-class Frigate", "Naves Capitais", {
    cl: 16, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [72, 14, 18], armor: 13,
    def: [15, 41], hp: 1120, dr: 15, sr: 100, dt: 141, speed: [0, 2], bab: 0, crew: "normal", sk: SK(-3, 5, 5, -3, 5),
    crewText: "150 (normal)", passengers: "300 (tropas)", cargo: "100.000 toneladas", cons: "6 meses", craft: "Porão de carga destacável (com hiperpropulsor próprio)", payload: "16 mísseis de concussão pesados", hyper: "×2 (reserva ×15), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 12, dmg: "4d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Heavy Concussion Missiles", t: "missile", st: "gunner", atk: 4, dmg: "9d10", x: 2, area: "Splash 4", ammo: 16 }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves inimigas nos quadrados adjacentes causam −1 dado de dano nos ataques bem-sucedidos" })
  }),
  v("StarViper Assault Fighter", "Caças Estelares", {
    cl: 12, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [44, 24, 14], armor: 7,
    def: [19, 27], hp: 140, dr: 15, sr: 40, dt: 47, speed: [16, 5], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(3, 6, 6, 3, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "1 tonelada", cons: "2 meses", craft: "Nenhuma", payload: "6 torpedos de prótons", hyper: "×1 (reserva ×10), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "10×10 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Double Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "7d10", x: 2, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 6, dmg: "9d10", x: 2, area: "Splash 4", ammo: 6, special: "fire-link" }
    ],
    notes: notes({ "Virago": "a nave do Príncipe Xizor; os modelos de produção posteriores têm Des 20 e SR 20" })
  }),
  v("Strike-class Medium Cruiser", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [98, 12, 16], armor: 14,
    def: [15, 54], hp: 1200, dr: 20, sr: 125, dt: 154, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "2.112 (skilled)", passengers: "1.020 (tropas)", cargo: "9.000 toneladas", cons: "2 anos", craft: "18 caças, 2 AT-ST e 4 AT-ST ou 2 AT-AT, naves de desembarque e apoio", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Militar", cost: "Não está à venda (mercado negro 17.000.000 usado)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 13, dmg: "7d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Light Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 13, dmg: "2d10", x: 5, count: 4, special: `5 artilheiros; ${CAP20}` },
      { n: "Ion Cannon Battery", t: "ion", st: "gunner", atk: 13, dmg: "3d10", x: 5, ion: true, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 13, dmg: "0", x: 1, grp: 66, count: 2, special: `5 artilheiros; ${CAP20}` }
    ],
    notes: notes({
      "Modular": "pode dobrar tropas, caças ou walkers reduzindo outra categoria em 50%",
      "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas num raio de 2 quadrados recebem +1 na Reflexos ou +1 nos ataques (à escolha do comandante)"
    })
  }),
  v("Super Star Destroyer (Executor)", "Naves Capitais", {
    cl: 40, cat: "capital", type: "Estação espacial", size: "colossalStation", ab: [138, 10, 20], armor: 18,
    def: [18, 74], hp: 3000, dr: 20, sr: 400, dt: 574, speed: [0, 1], bab: 2, crew: "skilled", sk: SK(-4, 6, 6, -4, 6),
    crewText: "280.734 (skilled)", passengers: "38.000 (tropas)", cargo: "250.000 toneladas", cons: "6 anos", craft: "144 caças, naves de apoio diversas", payload: "50.000 mísseis de concussão pesados", hyper: "×2 (reserva ×10), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "11d10", x: 5, count: 25, special: `5 artilheiros; ${CAP20}` },
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "8d10", x: 5, count: 25, special: `5 artilheiros; ${CAP20}` },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 15, dmg: "5d10", x: 5, ion: true, count: 25, special: `5 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 15, dmg: "0", x: 1, grp: 86, count: 8, special: `5 artilheiros; ${CAP20}` },
      { n: "Heavy Concussion Missile Battery", t: "missile", st: "gunner", atk: 15, dmg: "10d10", x: 5, area: "Splash 4", count: 25, special: `5 artilheiros; ${CAP20}` }
    ],
    notes: notes({
      "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas num raio de 3 quadrados recebem +1 nos ataques e +1 dado de dano ao acertar",
      "Executor e Vengeance": "a nave de Vader e a de Jerec usam estas estatísticas. Sem armas de defesa: vulnerável a ataques em massa de caças"
    })
  }),
  v("Lusankya", "Naves Capitais", {
    cl: 36, cat: "capital", type: "Estação espacial (Super Star Destroyer)", size: "colossalStation", ab: [138, 10, 20], armor: 17,
    def: [17, 74], hp: 3000, dr: 20, sr: 350, dt: 574, speed: [0, 1], bab: 2, crew: "skilled", sk: SK(-4, 6, 6, -4, 6),
    crewText: "207.381 (skilled)", passengers: "57.000 (tropas), 115.000 (prisioneiros)", cargo: "250.000 toneladas", cons: "6 anos", craft: "72 caças, até 1.000 outras naves pequenas", payload: "10.000 mísseis de concussão pesados", hyper: "×1 (reserva ×8), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "11d10", x: 5, count: 15, special: `5 artilheiros; ${CAP20}` },
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "8d10", x: 5, count: 25, special: `5 artilheiros; ${CAP20}` },
      { n: "Point-Defense Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 15, dmg: "7d10", x: 2, count: 25, special: "5 artilheiros" },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 15, dmg: "4d10", x: 5, ion: true, count: 10, special: `5 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 15, dmg: "0", x: 1, grp: 86, count: 8, special: `5 artilheiros; ${CAP20}` },
      { n: "Heavy Concussion Missile Battery", t: "missile", st: "gunner", atk: 15, dmg: "10d10", x: 5, area: "Splash 4", count: 10, special: `5 artilheiros; ${CAP20}` }
    ],
    notes: notes({ "Tiro tático": "como o Super Star Destroyer: aliados num raio de 3 quadrados recebem +1 nos ataques e +1 dado de dano" })
  }),
  v("Eclipse-class Super Star Destroyer", "Naves Capitais", {
    cl: 50, cat: "capital", type: "Estação espacial", size: "colossalStation", ab: [354, 10, 20], armor: 20,
    def: [20, 182], hp: 6000, dr: 20, sr: 500, dt: 682, speed: [0, 1], bab: 2, crew: "skilled", sk: SK(-4, 6, 6, -4, 6),
    crewText: "712.645 (skilled)", passengers: "150.000 (tropas)", cargo: "600.000 toneladas", cons: "10 anos", craft: "600 caças, 96 caças-bombardeiros, naves de apoio", hyper: "×2 (reserva ×6), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Superlaser", t: "turbolaser", st: "gunner", atk: 7, dmg: "8d10", x: 50, special: "−20 contra alvos menores que Colossal (cruzador)" },
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "10d10", x: 5, count: 25, special: `5 artilheiros; ${CAP20}` },
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "7d10", x: 5, count: 25, special: `5 artilheiros; ${CAP20}` },
      { n: "Point-Defense Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 15, dmg: "6d10", x: 2, count: 25, special: "5 artilheiros" },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 15, dmg: "3d10", x: 5, ion: true, count: 15, special: `5 artilheiros; ${CAP20}` },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 15, dmg: "0", x: 1, grp: 194, count: 20, special: `5 artilheiros; ${CAP20}` }
    ],
    notes: notes({ "Superlaser axial": "dois terços do poder de um projetor da Estrela da Morte: não destrói um planeta, mas atravessa escudos de cidades e torna um mundo inabitável" })
  }),
  v("IPV-1 System Patrol Craft", "Naves Capitais", {
    cl: 13, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [63, 20, 14], armor: 12,
    def: [17, 36], hp: 660, dr: 15, sr: 165, dt: 136, speed: [0, 4], bab: 0, crew: "normal", sk: SK(0, 5, 5, 0, 5),
    crewText: "12 (normal)", passengers: "10 (tropas ou prisioneiros)", cargo: "200 toneladas", cons: "1 mês", craft: "2 shuttles", payload: "24 mísseis de concussão médios", hyper: "Nenhum",
    avail: "Militar", cost: "Não está à venda (mercado negro 3.000.000 usado)", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Point-Defense Light Turbolasers", t: "pointDefense", st: "gunner", atk: 2, dmg: "5d10", x: 5 },
      { n: "Medium Concussion Missiles", t: "missile", st: "gunner", atk: 2, dmg: "8d10", x: 2, area: "Splash 4", ammo: 24, special: CAP20 }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: ataques contra naves inimigas Colossais ou menores nos quadrados adjacentes ameaçam crítico com 19 ou 20 (o 19 ainda precisa acertar a Reflexos)" })
  }),
  v("Theta-class Shuttle", "Transportes", {
    cl: 11, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [42, 16, 14], armor: 12,
    def: [15, 26], hp: 120, dr: 10, sr: 20, dt: 76, speed: [12, 3], maxv: "825 km/h", bab: 2, crew: "skilled", sk: SK(5, 6, 6, 5, 6),
    crewText: "5 (skilled)", passengers: "16", cargo: "50 toneladas", cons: "2 meses", craft: "Nenhuma", hyper: "×1 (reserva ×15), navicomputador",
    avail: "Restrito", cost: "1.000.000 (210.000 sem o luxo)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Quad Laser Cannon", t: "laser", st: "gunner", atk: 4, dmg: "6d10", x: 2, auto: true },
      { n: "Laser Cannons", t: "laser", st: "gunner", atk: 4, dmg: "4d10", x: 2 }
    ],
    notes: notes({ "Senatorial": "versão típica com melhoria de luxo extrema, transceptor HoloNet, cama médica e circuito de escravo" })
  }),
  v("TIE Bomber", "Caças Estelares", {
    cl: 9, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [43, 16, 17], armor: 7,
    def: [15, 26], hp: 130, dr: 10, dt: 46, speed: [12, 3], maxv: "850 km/h", bab: 2, crew: "skilled", sk: SK(4, 6, 6, 4, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "15 toneladas (compartimento de bombas)", cons: "2 dias", craft: "Nenhuma", payload: "16 mísseis de concussão médios", hyper: "Nenhum",
    avail: "Militar", cost: "150.000 (60.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "3d10", x: 2 },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 7, dmg: "9d10", x: 2, area: "Splash 4", ammo: 16 }
    ],
    notes: notes({ "Cargas alternativas": "até 8 torpedos de prótons; ou metade dos mísseis mais 8 bombas de prótons ou 6 minas orbitais; até 64 detonadores térmicos para bombardeio de infantaria" })
  }),
  v("TIE Advanced x1", "Caças Estelares", {
    cl: 9, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [38, 16, 16], armor: 3,
    def: [14, 24], hp: 90, dr: 10, sr: 20, dt: 34, speed: [16, 5], maxv: "1.200 km/h", bab: 5, crew: "expert", sk: SK(9, 8, 8, 9, 8),
    crewText: "1 (expert)", passengers: "Nenhum", cargo: "150 kg", cons: "5 dias", craft: "Nenhuma", hyper: "×4, navicomputador limitado (10 saltos)",
    avail: "Militar", cost: "160.000 (65.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Heavy Blaster Cannons", t: "blaster", st: "pilot", atk: 10, dmg: "6d10", x: 2, auto: true }]
  }),
  v("TIE Defender", "Caças Estelares", {
    cl: 11, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [39, 28, 16], armor: 4,
    def: [21, 24], hp: 100, dr: 10, sr: 30, dt: 34, speed: [16, 8], maxv: "1.680 km/h", bab: 5, crew: "expert", sk: SK(15, 8, 8, 15, 8),
    crewText: "1 (expert)", passengers: "Nenhum", cargo: "65 kg", cons: "2 dias", craft: "Nenhuma", payload: "8 torpedos de prótons", hyper: "×2, navicomputador limitado (10 saltos)",
    avail: "Militar", cost: "200.000 (80.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 10, dmg: "6d10", x: 2, auto: true },
      { n: "Medium Ion Cannons", t: "ion", st: "pilot", atk: 10, dmg: "4d10", x: 2, ion: true, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 10, dmg: "9d10", x: 2, area: "Splash 4", ammo: 8, special: "fire-link" }
    ]
  }),
  v("Lucrehulk-class Battleship", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [98, 13, 18], armor: 13,
    def: [14, 54], hp: 1800, dr: 20, sr: 150, dt: 254, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "150-300 (skilled)", passengers: "100.000+", cargo: "5 milhões de toneladas", cons: "1,5 ano", craft: "1.500 caças droides, 6.250 AAT, 1.500 transportes de tropas, apoio diverso", hyper: "×2 (reserva ×10), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 16, dmg: "5d10", x: 5, count: 5, special: `6 artilheiros; ${CAP20}` },
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "8d10", x: 5, count: 5, special: `5 artilheiros; ${CAP20}` },
      { n: "Point-Defense Quad Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 14, dmg: "3d10", x: 2, auto: true, count: 5, special: "5 artilheiros" }
    ],
    notes: notes({
      "Tiro tático": "ação padrão, abre mão dos ataques: naves inimigas Colossais ou menores num raio de 2 quadrados sofrem −1 na Reflexos e −1 nos ataques",
      "Reatores voláteis": "um ataque de dentro de um porão de carga pode destruir a nave inteira"
    })
  }),
  v("Lucrehulk-class Droid Control Ship", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [98, 13, 18], armor: 13,
    def: [14, 54], hp: 1800, dr: 20, sr: 150, dt: 254, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "150-300 (skilled)", passengers: "150.000+", cargo: "4,3 milhões de toneladas", cons: "1,5 ano", craft: "1.500 caças droides, 6.250 AAT, 1.500 transportes de tropas, apoio diverso", hyper: "×2 (reserva ×10), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [{ n: "Quad Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 16, dmg: "7d10", x: 5, count: 7, special: `6 artilheiros; ${CAP20}` }],
    notes: notes({ "Controle droide": "transmite os comandos às tropas e caças droides próximos; sem ela, eles param. Tiro tático igual ao encouraçado" })
  }),
  v("Lucrehulk Core Ship", "Naves Capitais", {
    cl: 17, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [94, 13, 18], armor: 13,
    def: [13, 52], hp: 1500, dr: 20, sr: 130, dt: 252, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "150-300 (skilled)", passengers: "30.000 droides de tropa", cargo: "75.000 kg", cons: "1 ano", craft: "10 shuttles", hyper: "Nenhum",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 16, dmg: "5d10", x: 5, special: `6 artilheiros; ${CAP20}` },
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "8d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Point-Defense Quad Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 14, dmg: "3d10", x: 2, auto: true, count: 2, special: "5 artilheiros" }
    ],
    notes: notes({ "Nave núcleo": "a esfera central se destaca do anel de carga, pousa e serve de fortaleza móvel; é mais fácil de derrubar sozinha" })
  }),
  v("Venator-class Star Destroyer", "Naves Capitais", {
    cl: 19, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [95, 12, 16], armor: 13,
    def: [14, 52], hp: 1590, dr: 20, sr: 200, dt: 252, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "7.400 (skilled)", passengers: "2.000 (tropas)", cargo: "20.000 toneladas", cons: "2 anos", craft: "192 V-wing ou V-19, 192 Eta-2, 36 ARC-170, 40 airspeeders pesados, 24 walkers pesados, apoio", payload: "64 torpedos de prótons", hyper: "×1 (reserva ×12), navicomputador",
    avail: "Militar", cost: "Não está à venda (mercado negro 50.000.000 usado)", space: "2×2 (escala de nave)", cover: "Total (tripulação), +5 (naves no convés com as placas abertas)",
    w: [
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 11, dmg: "8d10", x: 5, count: 2, special: `4 artilheiros; ${CAP20}` },
      { n: "Medium Double Turbolasers", t: "turbolaser", st: "gunner", atk: 5, dmg: "6d10", x: 5, count: 2, special: CAP20 },
      { n: "Point-Defense Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 13, dmg: "4d10", x: 2, count: 4, special: "5 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 9, dmg: "0", x: 1, grp: 64, count: 2, special: `3 artilheiros; ${CAP20}` },
      { n: "Proton Torpedoes", t: "missile", st: "gunner", atk: 5, dmg: "9d10", x: 2, area: "Splash 4", count: 4, ammo: 64, special: CAP20 }
    ],
    notes: notes({
      "Convés de voo": "com as portas dorsais abertas, bônus de armadura −2 (Reflexos 11, desprevenido 10)",
      "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas Gargantuas ou menores num raio de 2 quadrados recebem +2 nos ataques e sobem um passo no dado de dano (ex.: 4d10×2 vira 4d12×2)"
    })
  }),
  v("V-19 Torrent Starfighter", "Caças Estelares", {
    cl: 9, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [39, 24, 16], armor: 7,
    def: [19, 24], hp: 100, dr: 10, dt: 44, speed: [16, 4], maxv: "1.150 km/h", bab: 2, crew: "skilled", sk: SK(8, 6, 6, 8, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "70 kg", cons: "1 semana", craft: "Nenhuma", payload: "6 mísseis de concussão médios", hyper: "×1 ou ×1 com anel, navicomputador limitado (2 saltos)",
    avail: "Militar", cost: "135.000 (70.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "5d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 7, dmg: "8d10", x: 2, area: "Splash 4", ammo: 6, special: "fire-link" }
    ]
  }),
  v("V-wing Starfighter (Alpha-3 Nimbus)", "Caças Estelares", {
    cl: 8, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [36, 18, 14], armor: 3,
    def: [15, 23], hp: 80, dr: 10, sr: 15, dt: 33, speed: [16, 6], maxv: "1.450 km/h", bab: 2, crew: "skilled", sk: SK(8, 6, 6, 8, 6),
    crewText: "1 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "60 kg", cons: "15 horas", craft: "Nenhuma", hyper: "×1 (com anel), memória de 10 saltos (astromecânico)",
    avail: "Militar", cost: "102.500 (45.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [{ n: "Light Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "3d10", x: 2, auto: true }],
    notes: notes({ "Astromecânico": "Mechanics e Use Computer +13 com o droide" })
  }),
  v("X-83 TwinTail Starfighter", "Caças Estelares", {
    cl: 12, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [48, 24, 16], armor: 8,
    def: [20, 29], hp: 170, dr: 10, sr: 30, dt: 49, speed: [16, 5], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(8, 6, 6, 8, 6),
    crewText: "1 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "70 kg", cons: "6 dias", craft: "Nenhuma", hyper: "×1, navicomputador",
    avail: "Licenciado", cost: "160.000 (75.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "8d10", x: 2, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 7, dmg: "10d10", x: 2, area: "Splash 4" }
    ],
    notes: notes({ "Astromecânico": "Mechanics, Perception e Use Computer melhores com o droide (+13/+3/+13); o droide embutido desenvolve personalidade sem limpezas de memória" })
  }),
  v("T-65XJ3 X-wing Starfighter", "Caças Estelares", {
    cl: 11, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [46, 26, 18], armor: 8,
    def: [21, 28], hp: 150, dr: 10, sr: 30, dt: 48, speed: [16, 4], maxv: "1.100 km/h", bab: 2, crew: "skilled", sk: SK(9, 6, 6, 9, 6),
    crewText: "1 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "35 kg", cons: "3 dias", craft: "Nenhuma", payload: "12 torpedos de prótons", hyper: "×1, memória de 10 saltos (astromecânico)",
    avail: "Militar", cost: "315.000 (220.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [
      { n: "Heavy Laser Cannons", t: "laser", st: "pilot", atk: 8, dmg: "7d10", x: 2, auto: true, special: "stutter-fire: contra dovin basal yuuzhan vong, o SR conta pela metade" },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 8, dmg: "10d10", x: 2, area: "Splash 4", ammo: 12, special: "fire-link" }
    ],
    notes: notes({ "Escudos reserva": "ao recarregar escudos, recupera 10 pontos de SR (até o máximo de 30). Astromecânico: Mechanics e Use Computer +13, Perception +3" })
  }),
  v("T-65BR Recon X-wing", "Caças Estelares", {
    cl: 9, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [42, 22, 14], armor: 7,
    def: [18, 26], hp: 120, dr: 10, sr: 15, dt: 46, speed: [16, 5], maxv: "1.150 km/h", bab: 2, crew: "skilled", sk: SK(7, 6, 6, 7, 6),
    crewText: "1 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "110 kg", cons: "1 semana", craft: "Nenhuma", hyper: "×1, memória de 10 saltos (astromecânico)",
    avail: "Militar", cost: "150.000 (95.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "6d10", x: 2, auto: true }],
    notes: notes({
      "Sensores de reconhecimento": "+10 de equipamento em Use Computer para operar sensores, mas −10 em Stealth para esconder a nave; transmite dados em tempo real",
      "Autodestruição": "apaga a memória, destrói o astromecânico e envenena o piloto; uma chave de homem-morto detona carga de baradium. Com astromecânico: Initiative +9, Pilot +9, Mechanics/Use Computer +13, Perception +3"
    })
  }),
  v("Corellian YT-2000 Transport", "Transportes", {
    cl: 8, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [44, 16, 14], armor: 15,
    def: [18, 27], hp: 180, dr: 15, sr: 30, dt: 77, speed: [12, 3], maxv: "800 km/h", bab: 0, crew: "normal", sk: SK(-2, 5, 5, -2, 5),
    crewText: "4 (normal)", passengers: "7", cargo: "115 toneladas", cons: "3 meses", craft: "Nenhuma", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Licenciado", cost: "150.000 (45.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Double Laser Cannons", t: "laser", st: "gunner", atk: 2, dmg: "5d10", x: 2, auto: true, count: 2 }],
    notes: notes({ "Temperamental": "−2 em Mechanics para modificar ou reparar. Série YT: 10 pontos de emplacement livres" })
  }),
  v("Corellian YT-2400 Transport", "Transportes", {
    cl: 10, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [42, 18, 14], armor: 15,
    def: [19, 27], hp: 120, dr: 15, sr: 30, dt: 77, speed: [12, 3], maxv: "800 km/h", bab: 0, crew: "normal", sk: SK(-1, 5, 5, -1, 5),
    crewText: "3 (normal)", passengers: "6", cargo: "150 toneladas", cons: "2 meses", craft: "Nenhuma", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Licenciado", cost: "130.000 (32.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "gunner", atk: 2, dmg: "5d10", x: 2, count: 2 }],
    notes: notes({ "Cápsula de fuga": "embutida na cabine (+5 em Acrobatics para chegar a ela se a nave for destruída). Exemplo famoso: a Outrider, de Dash Rendar" })
  }),
  v("Millennium Falcon", "Transportes", {
    cl: 12, cat: "transport", type: "Transporte espacial (YT-1300 modificado, único)", size: "colossal", ab: [42, 18, 16], armor: 14,
    def: [18, 26], hp: 180, dr: 15, sr: 45, dt: 76, speed: [16, 6], maxv: "1.050 km/h", bab: 10, crew: "ace", sk: SK(6, 12, 12, 6, 12),
    crewText: "4 (ace)", passengers: "6", cargo: "100 toneladas", cons: "2 meses", craft: "Nenhuma", payload: "8 mísseis de concussão médios", hyper: "×0,5 (reserva ×10), navicomputador",
    avail: "Única", cost: "Não está à venda", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Quad Laser Cannon", t: "laser", st: "gunner", atk: 13, dmg: "6d10", x: 2, auto: true, count: 2 },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 15, dmg: "9d10", x: 2, area: "Splash 4", ammo: 8, special: "fire-link" },
      { n: "Docking Gun (blaster cannon)", t: "blaster", st: "pilot", atk: 15, dmg: "3d12", x: 1, special: "só em escala de personagem" }
    ],
    notes: notes({
      "Ágil": "conta como caça estelar Gargantua para ser alvo de armas de nave capital, dogfight e manobras de nave",
      "Equipamento": "compartimentos de contrabando, ejeção de carga, cama médica, presilha de atracação, hipertransceptor, computador de sensores (+2 já incluído). Use as perícias de Han, Lando ou Chewbacca se forem eles a pilotar"
    })
  }),
  v("Y-wing Longprobe (BTL-A4 LP)", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [42, 18, 20], armor: 7,
    def: [16, 26], hp: 120, dr: 10, sr: 10, dt: 46, speed: [16, 4], maxv: "1.000 km/h", bab: 2, crew: "skilled", sk: SK(5, 6, 11, 5, 6),
    crewText: "1 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "220 kg", cons: "1 mês", craft: "Nenhuma", payload: "8 torpedos de prótons", hyper: "×1 (reserva ×12), navicomputador",
    avail: "Militar", cost: "185.000 (90.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 9, dmg: "4d10", x: 2, auto: true },
      { n: "Ion Cannons", t: "ion", st: "pilot", atk: 9, dmg: "4d10", x: 2, ion: true, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 9, dmg: "9d10", x: 2, area: "Splash 4", ammo: 8, special: "fire-link" }
    ],
    notes: notes({ "Sensores": "Use Computer +11 para operar sensores (+18 com astromecânico); Mechanics e Use Computer +13 com o droide. Batedores costumam sair em grupos de 6 a 12" })
  }),
  v("Y-wing Courier (BTL-S3)", "Caças Estelares", {
    cl: 8, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [42, 16, 16], armor: 7,
    def: [15, 26], hp: 120, dr: 10, sr: 10, dt: 46, speed: [16, 4], maxv: "1.000 km/h", bab: 2, crew: "skilled", sk: SK(4, 6, 6, 4, 6),
    crewText: "2 + droide astromecânico (skilled)", passengers: "3", cargo: "800 kg", cons: "1 mês", craft: "Nenhuma", payload: "4 torpedos de prótons", hyper: "×1 (reserva ×12), memória de 10 saltos (astromecânico)",
    avail: "Militar", cost: "210.000 (90.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "4d10", x: 2, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "gunner", atk: 5, dmg: "9d10", x: 2, area: "Splash 4", ammo: 4 }
    ],
    notes: notes({ "Cabine ejetável": "a cabine se separa como cápsula de fuga (sem teste de Acrobatics). Mechanics e Use Computer +13 com o astromecânico" })
  }),
  v("Z-95 Headhunter", "Caças Estelares", {
    cl: 9, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [42, 14, 12], armor: 7,
    def: [14, 26], hp: 120, dr: 10, sr: 15, dt: 46, speed: [16, 4], maxv: "1.150 km/h", bab: 2, crew: "skilled", sk: SK(3, 6, 6, 3, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "85 kg", cons: "1 dia", craft: "Nenhuma", payload: "6 mísseis de concussão médios", hyper: "Nenhum (variantes da Aliança têm)",
    avail: "Restrito", cost: "80.000 (45.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Triple Light Blaster Cannons", t: "blaster", st: "pilot", atk: 5, dmg: "3d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 5, dmg: "7d10", x: 2, area: "Splash 4", ammo: 6, special: "fire-link" }
    ],
    notes: notes({ "Robusto": "peças de reposição fáceis de achar mesmo em mundos remotos" })
  }),
];
