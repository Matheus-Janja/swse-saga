// Threats of the Galaxy — veículos e naves dos quadros do livro. Mesmo formato de tools/data/vehicles.mjs.
const notes = o => `<p><em>Threats of the Galaxy</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
const v = (name, folder, o) => ({ name, folder, source: "Threats of the Galaxy", ...o });
const SK = (i, m, p, pi, u) => ({ initiative: i, mechanics: m, perception: p, pilot: pi, useComputer: u });
const AGILE = "conta como caça estelar Gargantua para ser alvo de armas de nave capital, dogfight e manobras de nave";

export default [
  v("Hound's Tooth", "Transportes", {
    cl: 12, cat: "transport", type: "Transporte espacial (YV-929 modificado, único)", size: "colossal", ab: [50, 10, 14], armor: 10,
    def: [12, 30], hp: 180, dr: 15, sr: 60, dt: 80, speed: [16, 4], maxv: "1.200 km/h", bab: 10, crew: "ace", sk: SK(-1, 12, 12, 4, 7),
    crewText: "1 (Bossk)", passengers: "4 (prisioneiros)", cargo: "20 toneladas", cons: "6 meses", craft: "1 nave batedora", payload: "6 mísseis de concussão médios", hyper: "×1,5 (reserva ×6), navicomputador",
    avail: "Única", cost: "Não está à venda", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Quad Laser Cannon", t: "laser", st: "pilot", atk: 12, dmg: "6d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 12, dmg: "8d10", x: 2, area: "Splash 4", ammo: 6 },
      { n: "Ion Cannon", t: "ion", st: "pilot", atk: 12, dmg: "6d10", x: 2, ion: true }
    ],
    notes: notes({ Ágil: AGILE, Descrição: "a nave do caçador trandoshano Bossk, com celas para prisioneiros" })
  }),
  v("Bloodfin (Razalon FC-20 Speeder Bike)", "Speeders", {
    cl: 15, cat: "speeder", type: "Veículo terrestre (speeder bike, único)", size: "medium", ab: [17, 24, 14], armor: 0,
    def: [32, 13], hp: 36, dr: 5, sr: 0, dt: 13, speed: [8, 0], maxv: "180 km/h", bab: 15, crew: "ace", sk: SK(23, 15, 9, 18, 10),
    crewText: "1 (Darth Maul)", passengers: "Nenhum", cargo: "2 kg", cons: "—", avail: "Licenciado", cost: "4.000 (1.000 usado)", space: "1×1", cover: "Total", w: [],
    notes: notes({ Descrição: "speeder bike leve e silenciosa de Darth Maul, em U; +2 de equipamento em Pilot (incluído)" })
  }),
  v("CEC VCX-350 Light Freighter", "Transportes", {
    cl: 10, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [46, 14, 14], armor: 13,
    def: [15, 28], hp: 150, dr: 15, sr: 30, dt: 78, speed: [12, 3], maxv: "980 km/h", bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "3 (skilled)", passengers: "8", cargo: "250 toneladas", cons: "6 meses", hyper: "×1 (reserva ×11)",
    avail: "Licenciado", cost: "300.000 (175.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 4, dmg: "4d10", x: 2, auto: true }],
    notes: notes({ Descrição: "cargueiro de longo alcance da Corellian Engineering, comum entre contrabandistas (como Talon Karrde)" })
  }),
  v("Modified R-2000 Raptor Speeder Bike", "Speeders", {
    cl: 7, cat: "speeder", type: "Veículo terrestre (speeder bike)", size: "large", ab: [21, 24, 16], armor: 0,
    def: [23, 15], hp: 56, dr: 5, sr: 0, dt: 20, speed: [12, 0], maxv: "750 km/h", bab: 5, crew: "expert", sk: SK(5, 10, 8, 23, 10),
    crewText: "1", passengers: "Nenhum", cargo: "1 kg", cons: "—", avail: "Licenciado", cost: "10.000 (7.000 usado)", space: "1 quadrado", cover: "Total",
    w: [{ n: "Laser Cannon", t: "laser", st: "pilot", atk: 8, dmg: "4d8+3", x: 1 }],
    notes: notes({ Descrição: "speeder bike de corrida da Ikas-Adno, muito personalizável; a do líder de gangue de swoop" })
  }),
  v("Nebulon-Q Swoop", "Speeders", {
    cl: 2, cat: "speeder", type: "Veículo terrestre (swoop)", size: "large", ab: [16, 24, 16], armor: 0,
    def: [18, 13], hp: 20, dr: 5, sr: 0, dt: 18, speed: [12, 0], maxv: "600 km/h", bab: 3, crew: "normal", sk: SK(7, 2, 2, 7, 2),
    crewText: "1", passengers: "Nenhum", cargo: "2 kg", cons: "—", avail: "Licenciado", cost: "5.500 (1.050 usado)", space: "1 quadrado", cover: "Total", w: [],
    notes: notes({ Descrição: "swoop de corrida Mobquet, barata e veloz, favorita das gangues; difícil de controlar: −5 de equipamento em Pilot (incluído)" })
  })
];
