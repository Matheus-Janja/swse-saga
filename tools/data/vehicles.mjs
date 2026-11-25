// Veículos e naves do Livro Básico (Cap. 10). Valores-alvo do bloco de estatísticas; o build
// ajusta os campos "Outros" para que Defesas, Limiar, perícias e ataques fiquem iguais ao livro.
// w: { n: nome, t: tipo (laser|blaster|ion|missile|turbolaser|pointDefense|tractor), st: estação (pilot|copilot|gunner),
//      atk, dmg, x: multiplicador, area, auto: autofire, ion, pen: penetração, grp: agarrar, count, ammo }
const notes = o => Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");

export const FOLDERS = ["Walkers", "Speeders", "Airspeeders", "Caças Estelares", "Transportes", "Naves Capitais", "Armas Fixas (Emplacements)"];

const v = (name, folder, o) => ({ name, folder, ...o });

export default [
  /* ---------------- WALKERS ---------------- */
  v("AT-AT (All-Terrain Armored Transport)", "Walkers", {
    cl: 14, cat: "walker", type: "Veículo terrestre (walker)", size: "colossal", ab: [48, 10, 14], armor: 16,
    def: [16, 29], hp: 300, dr: 20, dt: 79, speed: [4, 0], maxv: "60 km/h", bab: 5, crew: "expert",
    sk: { initiative: -2, mechanics: 8, perception: 8, pilot: -2, useComputer: 8 },
    crewText: "5 (expert)", passengers: "40", cargo: "1 tonelada", cons: "1 semana", craft: "5 speeder bikes ou 2 AT-STs",
    avail: "Militar", cost: "Não está à venda", space: "6×12", cover: "Total",
    w: [
      { n: "Heavy Laser Cannons", t: "laser", st: "gunner", atk: 7, dmg: "6d10", x: 2, area: "Splash 2 quadrados" },
      { n: "Medium Blaster Cannons", t: "blaster", st: "gunner", atk: 7, dmg: "3d10", x: 2, auto: true }
    ]
  }),
  v("AT-ST (All-Terrain Scout Transport)", "Walkers", {
    cl: 8, cat: "walker", type: "Veículo terrestre (walker)", size: "huge", ab: [30, 14, 12], armor: 4,
    def: [14, 20], hp: 120, dr: 10, dt: 30, speed: [6, 0], maxv: "90 km/h", bab: 5, crew: "expert",
    sk: { initiative: 8, mechanics: 8, perception: 8, pilot: 8, useComputer: 8 },
    crewText: "2 (expert)", passengers: "Nenhum", cargo: "Nenhuma", cons: "2 dias", payload: "12 granadas de fragmentação",
    avail: "Militar", cost: "Não está à venda", space: "3×3", cover: "Total",
    w: [
      { n: "Twin Blaster Cannons", t: "blaster", st: "pilot", atk: 6, dmg: "4d10", x: 2 },
      { n: "Twin Light Blaster Cannon", t: "blaster", st: "copilot", atk: 6, dmg: "3d10", x: 2, auto: true },
      { n: "Grenade Launcher", t: "missile", st: "copilot", atk: 6, dmg: "4d6", x: 1, area: "Explosão 2 quadrados", ammo: 12 }
    ]
  }),

  /* ---------------- SPEEDERS ---------------- */
  v("SoroSuub X-34 Landspeeder", "Speeders", {
    cl: 1, cat: "speeder", type: "Veículo terrestre (speeder)", size: "large", ab: [18, 18, 12], armor: 1,
    def: [14, 14], hp: 40, dr: 5, dt: 19, speed: [12, 0], maxv: "330 km/h", bab: 0, crew: "normal",
    sk: { initiative: 8, mechanics: 5, perception: 5, pilot: 8, useComputer: 5 },
    crewText: "1 (normal)", passengers: "1", cargo: "30 kg", cons: "1 dia",
    avail: "Licenciado", cost: "10.550 (2.500 usado)", space: "2×2", cover: "+5", w: []
  }),
  v("Aratech 74-Z Speeder Bike", "Speeders", {
    cl: 4, cat: "speeder", type: "Veículo terrestre (speeder)", size: "large", ab: [18, 24, 14], armor: 1,
    def: [16, 14], hp: 40, dr: 5, dt: 19, speed: [12, 0], maxv: "500 km/h", bab: 5, crew: "expert",
    sk: { initiative: 14, mechanics: 8, perception: 8, pilot: 14, useComputer: 8 },
    crewText: "1 (expert)", passengers: "1", cargo: "3 kg", cons: "1 dia",
    avail: "Restrito", cost: "6.750 (1.200 usado)", space: "2×2", cover: "Nenhuma",
    w: [{ n: "Laser Cannon", t: "laser", st: "pilot", atk: 7, dmg: "4d10", x: 1, auto: true }]
  }),
  v("AAT-1 (Armored Assault Tank)", "Speeders", {
    cl: 8, cat: "speeder", type: "Veículo terrestre (speeder)", size: "huge", ab: [36, 16, 14], armor: 5,
    def: [16, 23], hp: 180, dr: 15, dt: 33, speed: [6, 0], maxv: "55 km/h", bab: 2, crew: "skilled", ionVuln: true,
    sk: { initiative: 7, mechanics: 6, perception: 6, pilot: 7, useComputer: 6 },
    crewText: "4 (skilled)", passengers: "6 (externos)", cargo: "500 kg", cons: "1 semana", payload: "12 mísseis",
    avail: "Militar", cost: "Não está à venda", space: "3×3", cover: "Total (tripulação), nenhuma (passageiros)",
    notes: notes({ "Vulnerabilidade a íon": "por uma falha de projeto, sofre dano dobrado de armas iônicas (automático)." }),
    w: [
      { n: "Heavy Laser Cannon", t: "laser", st: "gunner", atk: 4, dmg: "6d10", x: 2, area: "Splash 2 quadrados" },
      { n: "Light Blaster Cannons", t: "blaster", st: "gunner", atk: 4, dmg: "2d10", x: 2 },
      { n: "Repeating Blaster Cannons", t: "blaster", st: "pilot", atk: 4, dmg: "3d10", x: 2, auto: true },
      { n: "Missile Launcher", t: "missile", st: "pilot", atk: 4, dmg: "6d6", x: 1, area: "Splash 2 quadrados", ammo: 12 }
    ]
  }),

  /* ---------------- AIRSPEEDERS ---------------- */
  v("Incom T-47 Airspeeder (modificado)", "Airspeeders", {
    cl: 6, cat: "airspeeder", type: "Veículo aéreo (airspeeder)", size: "huge", ab: [22, 22, 14], armor: 2,
    def: [16, 16], hp: 60, dr: 10, dt: 26, speed: [16, 4], maxv: "1.100 km/h", bab: 2, crew: "skilled",
    sk: { initiative: 10, mechanics: 6, perception: 6, pilot: 10, useComputer: 6 },
    crewText: "2 (skilled)", passengers: "Nenhum", cargo: "50 kg", cons: "1 dia",
    avail: "Militar", cost: "50.000 (usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    notes: notes({ "Arpão": "o artilheiro faz um teste de agarrar contra um walker inimigo; se acertar, o piloto faz um teste de agarrar oposto. Se vencer, o walker não pode se mover sem antes passar num teste de Pilot (CD = resultado do agarrar do arpão); se falhar, tomba sofrendo o dobro do dano de colisão." }),
    w: [
      { n: "Double Laser Cannon", t: "laser", st: "pilot", atk: 4, dmg: "5d10", x: 1, auto: true },
      { n: "Blaster Cannon", t: "blaster", st: "gunner", atk: 4, dmg: "3d10", x: 1, auto: true },
      { n: "Harpoon Gun", t: "tractor", st: "gunner", atk: 4, dmg: "0", x: 1, grp: 27 }
    ]
  }),
  v("LAAT/i Gunship", "Airspeeders", {
    cl: 12, cat: "airspeeder", type: "Veículo aéreo (airspeeder)", size: "colossal", ab: [42, 14, 14], armor: 13,
    def: [15, 26], hp: 160, dr: 15, sr: 15, dt: 76, speed: [12, 3], maxv: "620 km/h", bab: 5, crew: "expert",
    sk: { initiative: 0, mechanics: 8, perception: 8, pilot: 0, useComputer: 8 },
    crewText: "6 (expert)", passengers: "30", cargo: "2 toneladas", cons: "2 dias", payload: "24 mísseis, 6 foguetes",
    avail: "Militar", cost: "65.000 (40.000 usado)", space: "6×6 ou 1 quadrado (escala de nave)", cover: "Total (nenhuma para passageiros com as portas abertas)",
    w: [
      { n: "Mass Driver Missile Launchers", t: "missile", st: "pilot", atk: 7, dmg: "6d10", x: 2, area: "Splash 2 quadrados", ammo: 24 },
      { n: "Rocket Launcher", t: "missile", st: "pilot", atk: 7, dmg: "5d10", x: 2, area: "Explosão 2 quadrados", ammo: 6 },
      { n: "Anti-Personnel Laser Cannons", t: "laser", st: "copilot", atk: 7, dmg: "4d10", x: 1, auto: true },
      { n: "Composite-Beam Lasers", t: "laser", st: "gunner", atk: 7, dmg: "3d10", x: 1, pen: 10, count: 4 }
    ]
  }),

  /* ---------------- CAÇAS ---------------- */
  v("Incom T-65B X-wing", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [42, 22, 16], armor: 7,
    def: [18, 26], hp: 120, dr: 10, sr: 15, dt: 46, speed: [16, 4], maxv: "1.050 km/h", bab: 2, crew: "skilled",
    sk: { initiative: 7, mechanics: 6, perception: 6, pilot: 7, useComputer: 6 },
    crewText: "1 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "110 kg", cons: "1 semana", payload: "6 torpedos de prótons",
    hyper: "×1, memória de 10 saltos (astromecânico)", avail: "Militar", cost: "150.000 (65.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (piloto), +5 (astromecânico)",
    notes: notes({ "Com droide astromecânico": "Mechanics +13, Perception +3, Use Computer +13." }),
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 5, dmg: "6d10", x: 2, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 5, dmg: "9d10", x: 2, area: "Splash 4 quadrados", ammo: 6 }
    ]
  }),
  v("Koensayr Y-wing", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [42, 18, 16], armor: 7,
    def: [16, 26], hp: 120, dr: 10, sr: 25, dt: 46, speed: [16, 4], maxv: "1.000 km/h", bab: 2, crew: "skilled",
    sk: { initiative: 5, mechanics: 6, perception: 6, pilot: 5, useComputer: 6 },
    crewText: "2 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "110 kg", cons: "1 semana", payload: "8 torpedos de prótons",
    hyper: "×1, memória de 10 saltos (astromecânico)", avail: "Militar", cost: "135.000 (60.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    notes: notes({ "Com droide astromecânico": "Mechanics +13, Use Computer +13." }),
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 5, dmg: "4d10", x: 2, auto: true },
      { n: "Ion Cannons", t: "ion", st: "gunner", atk: 5, dmg: "4d10", x: 2, auto: true, ion: true },
      { n: "Proton Torpedoes", t: "missile", st: "gunner", atk: 5, dmg: "9d10", x: 2, area: "Splash 4 quadrados", ammo: 8 }
    ]
  }),
  v("TIE Fighter", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [34, 18, 14], armor: 3, icon: "tie",
    def: [15, 22], hp: 60, dr: 10, dt: 32, speed: [16, 5], maxv: "1.200 km/h", bab: 2, crew: "skilled",
    sk: { initiative: 8, mechanics: 6, perception: 6, pilot: 8, useComputer: 6 },
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "65 kg", cons: "2 dias",
    avail: "Militar", cost: "60.000 (25.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    notes: notes({ Observação: "Sem escudos, hiperpropulsor ou suporte de vida." }),
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 4, dmg: "4d10", x: 2, auto: true }]
  }),
  v("TIE Interceptor", "Caças Estelares", {
    cl: 8, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [38, 24, 16], armor: 3, icon: "tie",
    def: [18, 24], hp: 90, dr: 10, dt: 34, speed: [16, 5], maxv: "1.250 km/h", bab: 2, crew: "skilled",
    sk: { initiative: 11, mechanics: 6, perception: 6, pilot: 11, useComputer: 6 },
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "75 kg", cons: "2 dias",
    avail: "Militar", cost: "120.000 (50.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 5, dmg: "6d10", x: 2, auto: true }]
  }),
  v("Eta-2 Actis Interceptor", "Caças Estelares", {
    cl: 11, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [34, 26, 14], armor: 3,
    def: [19, 22], hp: 70, dr: 10, dt: 32, speed: [16, 6], maxv: "1.500 km/h", bab: 10, crew: "ace",
    sk: { initiative: 18, mechanics: 12, perception: 12, pilot: 18, useComputer: 12 },
    crewText: "1 + droide astromecânico (ace)", passengers: "Nenhum", cargo: "60 kg", cons: "2 dias (1 semana com anel de reforço)",
    hyper: "×1 (com anel de reforço), memória de 10 saltos (astromecânico)", avail: "Militar", cost: "140.000 (usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (piloto), +5 (astromecânico)",
    notes: notes({ "Com droide astromecânico": "Mechanics +13, Use Computer +13.", Observação: "Sem escudos." }),
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 12, dmg: "4d10", x: 2, auto: true },
      { n: "Ion Cannons", t: "ion", st: "pilot", atk: 12, dmg: "4d10", x: 2, auto: true, ion: true }
    ]
  }),
  v("ARC-170 Starfighter", "Caças Estelares", {
    cl: 12, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [46, 16, 14], armor: 8,
    def: [16, 28], hp: 150, dr: 10, sr: 25, dt: 48, speed: [16, 4], maxv: "1.050 km/h", bab: 5, crew: "expert",
    sk: { initiative: 6, mechanics: 8, perception: 8, pilot: 6, useComputer: 8 },
    crewText: "3 + droide astromecânico (expert)", passengers: "Nenhum", cargo: "110 kg", cons: "1 semana", payload: "8 torpedos de prótons",
    hyper: "×1,5, memória de 10 saltos (astromecânico)", avail: "Militar", cost: "155.000 (70.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    notes: notes({ "Com droide astromecânico": "Mechanics +13, Use Computer +13." }),
    w: [
      { n: "Heavy Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "6d10", x: 2, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "copilot", atk: 7, dmg: "9d10", x: 2, area: "Splash 4 quadrados", ammo: 8 },
      { n: "Laser Cannons (traseiros)", t: "laser", st: "gunner", atk: 7, dmg: "4d10", x: 2, auto: true }
    ]
  }),
  v("\"Vulture\" Droid Starfighter", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar / veículo terrestre (walker)", size: "huge", ab: [34, 16, 14], armor: 3,
    def: [14, 22], hp: 60, dr: 10, dt: 32, speed: [16, 4], maxv: "1.180 km/h", bab: 5, crew: "expert",
    sk: { initiative: 9, mechanics: 8, perception: 8, pilot: 9, useComputer: 8 },
    crewText: "0 (cérebro droide, expert)", passengers: "Nenhum", cargo: "Nenhuma", cons: "2 dias", payload: "6 mísseis de concussão",
    avail: "Restrito", cost: "19.000", space: "3×3 ou 1 quadrado (escala de nave)", cover: "—",
    notes: notes({ Imunidades: "traços de droide", "Modo caminhada": "deslocamento 6 andando; trocar entre voo e caminhada é ação padrão." }),
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "4d10", x: 2, auto: true },
      { n: "Concussion Missiles", t: "missile", st: "pilot", atk: 7, dmg: "8d10", x: 2, area: "Splash 4 quadrados", ammo: 6 }
    ]
  }),
  v("Droid Tri-Fighter", "Caças Estelares", {
    cl: 9, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [38, 18, 14], armor: 4,
    def: [16, 24], hp: 100, dr: 10, dt: 34, speed: [16, 4], maxv: "1.050 km/h", bab: 5, crew: "expert",
    sk: { initiative: 10, mechanics: 8, perception: 8, pilot: 10, useComputer: 8 },
    crewText: "0 (cérebro droide, expert)", passengers: "Nenhum", cargo: "Nenhuma", cons: "2 dias", payload: "6 mísseis de concussão",
    avail: "Restrito", cost: "40.000", space: "3×3 ou 1 quadrado (escala de nave)", cover: "—",
    notes: notes({ Imunidades: "traços de droide", Observação: "as armas podem disparar no mesmo alvo ou em alvos diferentes." }),
    w: [
      { n: "Laser Cannon", t: "laser", st: "pilot", atk: 7, dmg: "4d10", x: 2, auto: true },
      { n: "Light Laser Cannons (3)", t: "laser", st: "pilot", atk: 7, dmg: "3d10", x: 2, auto: true, count: 3 },
      { n: "Concussion Missiles", t: "missile", st: "pilot", atk: 7, dmg: "8d10", x: 2, area: "Splash 4 quadrados", ammo: 6 }
    ]
  }),

  /* ---------------- TRANSPORTES ---------------- */
  v("Corellian YT-1300 Transport", "Transportes", {
    cl: 6, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [42, 10, 14], armor: 12,
    def: [12, 26], hp: 120, dr: 15, dt: 76, speed: [12, 2], maxv: "800 km/h", bab: 0, crew: "normal",
    sk: { initiative: -5, mechanics: 5, perception: 5, pilot: -5, useComputer: 5 },
    crewText: "2 (normal)", passengers: "6", cargo: "100 toneladas", cons: "2 meses",
    hyper: "×2 (reserva ×12), computador de navegação", avail: "Licenciado", cost: "100.000 (25.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannon", t: "laser", st: "gunner", atk: 2, dmg: "4d10", x: 2 }]
  }),

  /* ---------------- CAPITAIS ---------------- */
  v("Corellian Corvette", "Naves Capitais", {
    cl: 16, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [66, 18, 18], armor: 12,
    def: [16, 38], hp: 1200, dr: 15, sr: 100, dt: 138, speed: [0, 3], maxv: "", bab: 2, crew: "skilled",
    sk: { initiative: 0, mechanics: 10, perception: 6, pilot: 0, useComputer: 10 },
    crewText: "30 a 165 (skilled)", passengers: "600", cargo: "3.000 toneladas", cons: "1 ano",
    hyper: "×2, computador de navegação (+3)", avail: "Licenciado", cost: "3,5 milhões (1,5 milhão usado)", space: "1 quadrado (escala de nave)", cover: "Total",
    notes: notes({ Armas: "3 baterias de turbolaser (4 artilheiros cada)." }),
    w: [{ n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 12, dmg: "5d10", x: 5, count: 3, special: "Bateria: −20 contra alvos menores que Colossal (fragata)." }]
  }),
  v("Imperial I-class Star Destroyer", "Naves Capitais", {
    cl: 20, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [102, 14, 20], armor: 16,
    def: [18, 56], hp: 2100, dr: 20, sr: 150, dt: 256, speed: [0, 3], maxv: "", bab: 2, crew: "skilled",
    sk: { initiative: -2, mechanics: 6, perception: 6, pilot: -2, useComputer: 6 },
    crewText: "37.085 (skilled)", passengers: "9.700 (tropas)", cargo: "36.000 toneladas", cons: "6 anos",
    craft: "72 TIE fighters (qualquer variante), 8 shuttles classe Lambda, 20 AT-ATs, 30 AT-STs, veículos de apoio",
    hyper: "×2 (reserva ×8), computador de navegação", avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    notes: notes({ Armas: "5 baterias de turbolaser, 5 baterias de canhões iônicos, 10 baterias de defesa de ponto e 10 raios tratores." }),
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 17, dmg: "5d10", x: 5, count: 5 },
      { n: "Ion Cannon Battery", t: "ion", st: "gunner", atk: 17, dmg: "3d10", x: 5, ion: true, count: 5 },
      { n: "Point-Defense Laser Battery", t: "pointDefense", st: "gunner", atk: 13, dmg: "2d10", x: 2, count: 10 },
      { n: "Tractor Beam", t: "tractor", st: "gunner", atk: 7, dmg: "0", x: 1, grp: 68, count: 10 }
    ]
  })
];
