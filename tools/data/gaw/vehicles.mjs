// Galaxy at War — veículos e naves (Cap. 2, p.62-67). Mesmo formato de tools/data/vehicles.mjs.
const notes = o => `<p><em>Galaxy at War</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
const v = (name, folder, o) => ({ name, folder, source: "Galaxy at War", ...o });

export default [
  v("Freeco Speeder (CK-6)", "Speeders", {
    cl: 6, cat: "speeder", type: "Veículo terrestre (speeder)", size: "huge", ab: [33, 22, 16], armor: 3,
    def: [17, 21], hp: 55, dr: 5, dt: 31, speed: [12, 0], maxv: "550 km/h", bab: 2, crew: "skilled",
    sk: { initiative: 10, mechanics: 6, perception: 6, pilot: 10, useComputer: 6 },
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "30 kg", cons: "1 semana",
    avail: "Militar", cost: "14.700 (7.400 usado)", space: "3×3", cover: "Total (tripulação)",
    w: [{ n: "Dual Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "5d10", x: 1, auto: true }],
    notes: notes({ Descrição: "Speeder bike fechada da República para ambientes gelados; ótima em terreno liso, ruim em terreno irregular." })
  }),
  v("Shelter Speeder (SoroSuub S-130)", "Airspeeders", {
    cl: 4, cat: "airspeeder", type: "Veículo aéreo", size: "huge", ab: [34, 12, 14], armor: 3,
    def: [12, 22], hp: 60, dr: 5, dt: 32, speed: [8, 2], maxv: "280 km/h", bab: 0, crew: "normal",
    sk: { initiative: 4, mechanics: 5, perception: 5, pilot: 4, useComputer: 4 },
    crewText: "2 (normal)", passengers: "4 + 2 pacientes", cargo: "10 toneladas", cons: "1 semana", craft: "1 speeder bike",
    avail: "Licenciado", cost: "41.000 (26.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)", w: [],
    notes: notes({ "Airspeeder médico": "ocupantes imunes a perigos transportados pelo ar e a radiação externa; +5 de equipamento na Fortitude contra ataques de doenças e venenos aéreos que ainda não os afetaram" })
  }),
  v("WLO-5 Speeder Tank", "Speeders", {
    cl: 6, cat: "speeder", type: "Veículo terrestre (speeder)", size: "gargantuan", ab: [46, 14, 14], armor: 8,
    def: [15, 28], hp: 150, dr: 5, dt: 48, speed: [8, 3], maxv: "110 km/h", bab: 2, crew: "skilled",
    sk: { initiative: 3, mechanics: 6, perception: 6, pilot: 3, useComputer: 6 },
    crewText: "3 (skilled)", passengers: "4", cargo: "150 kg", cons: "2 semanas",
    avail: "Militar", cost: "115.000 (65.000 usado)", space: "4×4", cover: "Total (tripulação), +5 (artilheiro)",
    w: [{ n: "Heavy Laser Cannon", t: "laser", st: "gunner", atk: 6, dmg: "6d10", x: 2, area: "Splash 2 quadrados", special: "2 artilheiros" }],
    notes: notes({ Manutenção: "+5 de equipamento em Mechanics para reparar ou modificar", Descrição: "Tanque de Ubrikkian favorito de piratas; o canhão principal fica exposto, com um segundo artilheiro auxiliando de dentro." })
  }),
  v("Drop Pod", "Transportes", {
    cl: 2, cat: "airspeeder", type: "Veículo aéreo", size: "gargantuan", ab: [34, 10, 12], armor: 6,
    def: [11, 22], hp: 60, dr: 10, dt: 42, speed: [12, 3], maxv: "600 km/h", bab: 0, crew: "normal",
    sk: { initiative: 0, mechanics: 5, perception: 5, pilot: 0, useComputer: 5 },
    crewText: "0 (cérebro droide)", passengers: "Nenhum", cargo: "2 toneladas", cons: "Nenhum", craft: "1 veículo Gigantesco (ou menor)",
    avail: "Licenciado", cost: "17.000", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total", w: [],
    notes: notes({ Descrição: "Casca protetora lançada de órbita; parafusos explosivos abrem o casco ao pousar e liberam o veículo transportado." })
  }),
  v("Imperial Landing Craft (IF-120)", "Transportes", {
    cl: 13, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [44, 14, 16], armor: 12,
    def: [14, 27], hp: 140, dr: 15, sr: 40, dt: 77, speed: [12, 4], maxv: "800 km/h", bab: 5, crew: "expert",
    sk: { initiative: 0, mechanics: 8, perception: 8, pilot: 0, useComputer: 8 },
    crewText: "8 (expert)", passengers: "120 soldados", cargo: "130 toneladas", cons: "6 meses",
    craft: "12 speeder bikes, 2 LAVr QH-7 Chariot, 1 base de comando móvel PX-4", hyper: "×1, navicomputador",
    avail: "Militar", cost: "290.000", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Double Medium Laser Cannons", t: "laser", st: "pilot", atk: 10, dmg: "5d10", x: 2, auto: true },
      { n: "Antipersonnel Heavy Blaster Cannons", t: "blaster", st: "gunner", atk: 8, dmg: "5d10", x: 2, auto: true, count: 4 }
    ],
    notes: notes({ Descrição: "Baseado nas lançadeiras Lambda e Sentinel; depois de pousar vira uma base de comando móvel." })
  }),
  v("Penumbra-class Attack Shuttle", "Transportes", {
    cl: 9, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [40, 20, 14], armor: 12,
    def: [17, 25], hp: 110, dr: 15, sr: 20, dt: 75, speed: [16, 4], maxv: "1.175 km/h", bab: 2, crew: "skilled",
    sk: { initiative: 1, mechanics: 6, perception: 6, pilot: 1, useComputer: 6 },
    crewText: "3 (skilled)", passengers: "10", cargo: "20 toneladas", cons: "1 mês", payload: "12 mísseis de concussão",
    avail: "Restrito", cost: "250.000 (135.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Medium Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "5d10", x: 2, auto: true, special: "fire-link" },
      { n: "Medium Concussion Missiles", t: "missile", st: "copilot", atk: 4, dmg: "10d10", x: 2, ammo: 12, special: "fire-link" }
    ],
    notes: notes({ Descrição: "Lançadeira de ataque da Haor Chall usada pela Confederação e por piratas weequay." })
  }),
  v("YU-410 Light Freighter", "Transportes", {
    cl: 7, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [42, 10, 14], armor: 12,
    def: [12, 26], hp: 120, dr: 15, sr: 20, dt: 76, speed: [12, 2], maxv: "800 km/h", bab: 0, crew: "normal",
    sk: { initiative: -5, mechanics: 5, perception: 5, pilot: -5, useComputer: 5 },
    crewText: "4 (normal)", passengers: "12", cargo: "250 toneladas", cons: "2 meses", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Licenciado", cost: "110.000 (30.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Double Laser Cannons", t: "laser", st: "gunner", atk: 2, dmg: "5d10", x: 2, auto: true }],
    notes: notes({ Contrabando: "+5 em Stealth para esconder itens a bordo" })
  }),
  v("Wayfarer-class Medium Transport", "Transportes", {
    cl: 5, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [44, 10, 14], armor: 12,
    def: [12, 27], hp: 140, dr: 15, sr: 20, dt: 77, speed: [12, 2], maxv: "800 km/h", bab: 0, crew: "normal",
    sk: { initiative: -5, mechanics: 5, perception: 5, pilot: -5, useComputer: 5 },
    crewText: "10 (normal)", passengers: "6", cargo: "220 toneladas", cons: "3 meses", craft: "2 caças estelares Gigantescos", hyper: "×2 (reserva ×14), navicomputador",
    avail: "Licenciado", cost: "140.000 (50.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Quad Laser Cannon", t: "laser", st: "gunner", atk: 2, dmg: "6d10", x: 2, auto: true },
      { n: "Laser Cannon", t: "laser", st: "gunner", atk: 2, dmg: "4d10", x: 2 }
    ],
    notes: notes({ Módulo: "módulo destacável (passageiros, hangar ou carga); pode ser pilotado só por piloto e mais um tripulante" })
  }),
  v("Corona-class Armed Frigate", "Naves Capitais", {
    cl: 17, cat: "capital", type: "Nave capital (fragata)", size: "colossalFrigate", ab: [60, 18, 14], armor: 11,
    def: [15, 35], hp: 750, dr: 15, sr: 60, dt: 135, speed: [0, 3], bab: 2, crew: "skilled",
    sk: { initiative: 0, mechanics: 6, perception: 6, pilot: 0, useComputer: 6 },
    crewText: "64 (skilled)", passengers: "200", cargo: "450 toneladas", cons: "1 ano", craft: "6 lançadeiras de ataque, 12 speeder tanks", hyper: "×1, navicomputador",
    avail: "Restrito", cost: "3,7 milhões (2,0 milhões usado)", space: "1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Medium Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 10, dmg: "5d10", x: 5, count: 2, special: "4 artilheiros; −20 contra alvos menores que Colossal" },
      { n: "Heavy Ion Cannon Battery", t: "ion", st: "gunner", atk: 10, dmg: "4d10", x: 5, ion: true, count: 4, special: "4 artilheiros; −20 contra alvos menores que Colossal" },
      { n: "Point-Defense Medium Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 6, dmg: "4d10", x: 2, count: 4, special: "2 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 10, dmg: "0", x: 1, grp: 47, special: "4 artilheiros; −20 contra alvos menores que Colossal" }
    ],
    notes: notes({ Descrição: "Fragata da Haor Chall vendida a investidores privados; usada por Hondo Ohnaka." })
  })
];
