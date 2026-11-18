// Galaxy of Intrigue — naves e veículos (Cap. 3, p.68-71).
const notes = o => `<p><em>Galaxy of Intrigue</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
const v = (name, folder, o) => ({ name, folder, source: "Galaxy of Intrigue", ...o });

export default [
  v("PTV-2100 Incarcerator", "Naves Capitais", {
    cl: 16, cat: "capital", type: "Transporte espacial (fragata)", size: "colossalFrigate", ab: [71, 10, 18], armor: 13,
    def: [13, 40], hp: 1600, dr: 15, dt: 140, speed: [0, 1], bab: 2, crew: "skilled",
    sk: { initiative: -4, mechanics: 6, perception: 6, pilot: -4, useComputer: 6 },
    crewText: "250 (skilled)", passengers: "1.500 (prisioneiros)", cargo: "5.500 toneladas", cons: "1 ano", craft: "2 lançadeiras", hyper: "×3 (reserva ×12), navicomputador",
    avail: "Militar", cost: "4,5 milhões (1,8 milhão usado)", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 12, dmg: "5d10", x: 5, count: 2, special: "4 artilheiros; −20 contra alvos menores que Colossal" },
      { n: "Point-Defense Laser Battery", t: "pointDefense", st: "gunner", atk: 8, dmg: "2d10", x: 2, count: 2, special: "2 artilheiros" }
    ],
    notes: notes({ "Repelir abordagem": "a nave e os aliados em quadrados adjacentes causam +1 dado de dano em naves que entram no quadrado dela para atracar ou abordá-la" })
  }),
  v("Modified Incom A-24 Sleuth", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [40, 18, 16], armor: 7,
    def: [16, 25], hp: 110, dr: 10, sr: 15, dt: 45, speed: [16, 4], maxv: "1.000 km/h", bab: 2, crew: "skilled",
    sk: { initiative: 5, mechanics: 6, perception: 6, pilot: 5, useComputer: 6 },
    crewText: "1 + droide astromecânico (skilled)", passengers: "1", cargo: "3 toneladas", cons: "3 meses", hyper: "×1 (reserva ×10), navicomputador, memória de 10 saltos (astromecânico)",
    avail: "Militar", cost: "Não está à venda", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "4d10", x: 2 }],
    notes: notes({ Astromecânico: "com droide astromecânico, Mechanics e Use Computer passam a +13", Transmissor: "transmissor de feixe estreito quase indetectável" })
  }),
  v("Ferret-class Reconnaissance Vessel", "Caças Estelares", {
    cl: 12, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [42, 16, 18], armor: 7,
    def: [15, 26], hp: 120, dr: 10, dt: 46, speed: [16, 4], maxv: "1.050 km/h", bab: 5, crew: "expert",
    sk: { initiative: 6, mechanics: 8, perception: 8, pilot: 6, useComputer: 8 },
    crewText: "3 (expert)", passengers: "Nenhum", cargo: "2 toneladas", cons: "3 meses", payload: "6 mísseis de concussão médios", hyper: "×1 (reserva ×8), navicomputador",
    avail: "Militar", cost: "890.000 (não há usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 11, dmg: "9d10", x: 2, ammo: 6 }],
    notes: notes({ Furtividade: "+5 de tecnologia em Stealth para esconder a nave; com o motor abafado (1 hora) move-se à metade e ganha mais +5", "Iscas de sensor": "rerrola Stealth 1/encontro (2 usos)", Observação: "o livro lista o ataque dos mísseis como +9 na linha de ataque e +11 no quadro da arma; usamos +11" })
  }),
  v("Prowler-class Reconnaissance Vessel", "Caças Estelares", {
    cl: 12, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [46, 16, 16], armor: 8,
    def: [16, 28], hp: 150, dr: 10, dt: 48, speed: [12, 3], maxv: "650 km/h", bab: 5, crew: "expert",
    sk: { initiative: 6, mechanics: 8, perception: 8, pilot: 6, useComputer: 8 },
    crewText: "6 (expert)", passengers: "Nenhum", cargo: "3 toneladas", cons: "5 meses", payload: "10 mísseis de concussão médios", hyper: "×1 (reserva ×10), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 10, dmg: "9d10", x: 2, ammo: 10 }],
    notes: notes({ Furtividade: "+4 de tecnologia em Stealth; com o motor abafado (3 horas) move-se à metade e ganha mais +4", "Iscas de sensor": "rerrola Stealth 1/encontro (4 usos)" })
  }),
  v("Sabaoth Frigate Spy Ship", "Naves Capitais", {
    cl: 11, cat: "capital", type: "Nave capital (fragata)", size: "colossalFrigate", ab: [58, 16, 18], armor: 11,
    def: [14, 34], hp: 650, dr: 15, sr: 105, dt: 134, speed: [0, 3], bab: 5, crew: "expert",
    sk: { initiative: 1, mechanics: 8, perception: 8, pilot: 1, useComputer: 8 },
    crewText: "100 (expert)", passengers: "450", cargo: "1.200 toneladas", cons: "1 ano", hyper: "×3 (reserva ×18), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 quadrados (escala de nave)", cover: "Total",
    w: [{ n: "Heavy Laser Cannon", t: "laser", st: "gunner", atk: 9, dmg: "6d10", x: 2, count: 4 }],
    notes: notes({ Sensores: "Perception +13 com o pacote de sensores; furtividade de sensores e interceptação de comunicações" })
  }),
  v("Corona Limited Luxury Groundspeeder", "Speeders", {
    cl: 4, cat: "speeder", type: "Veículo terrestre (speeder)", size: "huge", ab: [38, 16, 14], armor: 3,
    def: [14, 24], hp: 90, dr: 5, dt: 34, speed: [12, 0], maxv: "300 km/h", bab: 2, crew: "skilled",
    sk: { initiative: 7, mechanics: 6, perception: 6, pilot: 7, useComputer: 6 },
    crewText: "1 (skilled)", passengers: "6", cargo: "300 kg", cons: "2 dias",
    avail: "Licenciado", cost: "70.000 (20.000 usado)", space: "3×3", cover: "Total", w: []
  }),
  v("SoroSuub JG-8 Luxury Landspeeder", "Speeders", {
    cl: 2, cat: "speeder", type: "Veículo terrestre (speeder)", size: "large", ab: [21, 16, 14], armor: 2,
    def: [14, 15], hp: 55, dr: 5, dt: 20, speed: [12, 0], maxv: "450 km/h", bab: 2, crew: "skilled",
    sk: { initiative: 8, mechanics: 6, perception: 6, pilot: 8, useComputer: 6 },
    crewText: "1 (skilled)", passengers: "1", cargo: "50 kg", cons: "1 dia",
    avail: "Licenciado", cost: "45.000 (12.500 usado)", space: "2×2", cover: "+5", w: []
  })
];
