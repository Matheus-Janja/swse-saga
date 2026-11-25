// The Clone Wars Campaign Guide — naves e veículos. Mesmo formato de tools/data/vehicles.mjs.
const notes = o => `<p><em>The Clone Wars Campaign Guide</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
const v = (name, folder, o) => ({ name, folder, source: "The Clone Wars Campaign Guide", ...o });
const SK = (i, m, p, pi, u) => ({ initiative: i, mechanics: m, perception: p, pilot: pi, useComputer: u });
const CAP20 = "−20 contra alvos menores que Colossal";
const AGILE = "conta como caça estelar Gargantua para ser alvo de armas de nave capital, dogfight e manobras de nave";

export default [
  /* ---------------- Transportes (Cap. 6) ---------------- */
  v("Barloz-class Freighter", "Transportes", {
    cl: 7, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [50, 14, 12], armor: 13,
    def: [15, 30], hp: 180, dr: 15, sr: 15, dt: 80, speed: [12, 3], maxv: "850 km/h", bab: 0, crew: "normal", sk: SK(-3, 5, 5, -3, 5),
    crewText: "2 (normal)", passengers: "4", cargo: "85 toneladas", cons: "2 meses", craft: "Nenhuma", hyper: "×2 (reserva ×12)",
    avail: "Licenciado", cost: "120.000 (17.500 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Laser Cannon", t: "laser", st: "copilot", atk: 1, dmg: "4d10", x: 2 }],
    notes: notes({ Descrição: "cargueiro corelliano robusto e fácil de adaptar; a variante Justifier troca carga por motores, escudos e mais armas" })
  }),
  v("G9 Rigger", "Transportes", {
    cl: 6, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [39, 10, 12], armor: 11,
    def: [11, 24], hp: 100, dr: 15, sr: 0, dt: 74, speed: [12, 2], maxv: "700 km/h", bab: 0, crew: "normal", sk: SK(-5, 5, 5, -5, 5),
    crewText: "2 (normal)", passengers: "6", cargo: "70 toneladas", cons: "1 mês", craft: "Nenhuma", hyper: "×3",
    avail: "Licenciado", cost: "85.000 (45.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Double Light Laser Cannons", t: "laser", st: "pilot", atk: 3, dmg: "4d10", x: 2, auto: true },
      { n: "Light Laser Cannons", t: "laser", st: "copilot", atk: 1, dmg: "3d10", x: 2 }
    ],
    notes: notes({ Descrição: "transporte barato e lento, comum entre contrabandistas de especiarias (a Twilight, de Anakin Skywalker)" })
  }),
  v("GS-100 Salvage Ship", "Transportes", {
    cl: 8, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [51, 12, 14], armor: 13,
    def: [14, 30], hp: 190, dr: 15, sr: 0, dt: 80, speed: [12, 2], maxv: "400 km/h", bab: 0, crew: "normal", sk: SK(-4, 5, 5, -4, 5),
    crewText: "3 (normal)", passengers: "20 (droides)", cargo: "140 toneladas", cons: "1 mês", craft: "Nenhuma", hyper: "×3",
    avail: "Licenciado", cost: "190.000 (95.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Medium Laser Cannons", t: "laser", st: "gunner", atk: 2, dmg: "4d10", x: 2, count: 2 }],
    notes: notes({ Descrição: "nave de sucata da Gallofree Yards, feita para campos de destroços (a Vulture's Claw, de Gha Nachkt)" })
  }),
  v("KR-TB Doomtreader", "Transportes", {
    cl: 8, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [50, 12, 14], armor: 13,
    def: [14, 30], hp: 180, dr: 15, sr: 30, dt: 80, speed: [12, 3], maxv: "900 km/h", bab: 0, crew: "skilled", sk: SK(-4, 5, 5, -4, 5),
    crewText: "2 + droide astromecânico (skilled)", passengers: "6", cargo: "100 toneladas", cons: "1 mês", craft: "Nenhuma", hyper: "×2 (reserva ×15)",
    avail: "Licenciado", cost: "350.000 (70.000 usado)", space: "20×10 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), total (astromecânico)",
    w: [{ n: "Dual Laser Cannons", t: "laser", st: "pilot", atk: 4, dmg: "6d10", x: 2 }],
    notes: notes({ Astromecânico: "com o droide, Mechanics e Use Computer +13", Descrição: "cargueiro corelliano de carga enorme e escudos pesados (a Hell's Anvil, de Montross)" })
  }),
  v("Pursuer-class Enforcement Ship", "Transportes", {
    cl: 7, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [42, 14, 14], armor: 12,
    def: [14, 26], hp: 120, dr: 15, sr: 15, dt: 76, speed: [16, 4], maxv: "1.000 km/h", bab: 1, crew: "normal", sk: SK(-3, 5, 5, -3, 5),
    crewText: "1", passengers: "7 (2 passageiros, 5 prisioneiros)", cargo: "35 toneladas", cons: "5 semanas", craft: "Nenhuma", hyper: "×1 (reserva ×16)",
    avail: "Restrito", cost: "200.000 (40.000 usado)", space: "10×20 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Twin Blaster Cannons", t: "blaster", st: "pilot", atk: 5, dmg: "5d10", x: 2, auto: true },
      { n: "Ion Cannons", t: "ion", st: "pilot", atk: 5, dmg: "4d10", x: 2, ion: true }
    ],
    notes: notes({ Descrição: "patrulheira da MandalMotors para os Protetores Mandalorianos (Boba Fett usou uma como Slave II)" })
  }),
  v("Ubrikkian Seltiss-2 Caravel", "Transportes", {
    cl: 9, cat: "transport", type: "Transporte espacial (Hutt)", size: "colossal", ab: [52, 10, 14], armor: 14,
    def: [14, 31], hp: 200, dr: 15, sr: 30, dt: 81, speed: [12, 3], maxv: "850 km/h", bab: 0, crew: "normal", sk: SK(-5, 5, 5, -5, 5),
    crewText: "4 (1 piloto, 1 copiloto, 2 artilheiros)", passengers: "12", cargo: "50 toneladas", cons: "1 mês", craft: "Cabine principal (destacável)", hyper: "Nenhum",
    avail: "Licenciado", cost: "800.000 (160.000 usado)", space: "10×20 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Laser Cannon Battery", t: "laser", st: "gunner", atk: 4, dmg: "4d10", x: 2, auto: true, special: "2 artilheiros" }],
    notes: notes({ Descrição: "iate luxuoso de curto alcance dos Hutts; a cabine com o trono se destaca e serve de cápsula de fuga" })
  }),
  v("Ubrikkian Seltiss-2 Caravel Cabin", "Transportes", {
    cl: 3, cat: "transport", type: "Transporte espacial (cabine destacável)", size: "huge", ab: [32, 12, 14], armor: 3,
    def: [12, 21], hp: 50, dr: 5, sr: 10, dt: 31, speed: [12, 3], maxv: "700 km/h", bab: 0, crew: "normal", sk: SK(4, 5, 5, 4, 5),
    crewText: "1", passengers: "6", cargo: "5 toneladas", cons: "2 semanas", craft: "Nenhuma", hyper: "Nenhum",
    avail: "Licenciado", cost: "400.000 (80.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)", w: []
  }),

  /* ---------------- Caças ---------------- */
  v("Dagger-class Starfighter", "Caças Estelares", {
    cl: 6, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [34, 18, 10], armor: 6,
    def: [15, 22], hp: 60, dr: 10, sr: 0, dt: 42, speed: [16, 4], maxv: "1.000 km/h", bab: 0, crew: "normal", sk: SK(4, 5, 5, 4, 5),
    crewText: "1", passengers: "Nenhum", cargo: "55 kg", cons: "1 semana", craft: "Nenhuma", hyper: "Sim (1 salto)",
    avail: "Restrito", cost: "35.000 (8.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 2, dmg: "6d10", x: 2, auto: true }],
    notes: notes({ Descrição: "caça barato da Republic Sienar Systems, sem escudos; usado por forças planetárias e pela Federação do Comércio" })
  }),
  v("Dianoga-class Assault Starfighter", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [36, 14, 11], armor: 6,
    def: [13, 23], hp: 80, dr: 10, sr: 15, dt: 43, speed: [12, 3], maxv: "950 km/h", bab: 0, crew: "normal", sk: SK(2, 5, 5, 2, 5),
    crewText: "1", passengers: "Nenhum", cargo: "90 kg", cons: "3 dias", craft: "Nenhuma", hyper: "×2",
    avail: "Restrito", cost: "45.000 (12.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Fire-linked Laser Cannons", t: "laser", st: "pilot", atk: 2, dmg: "6d10", x: 2, auto: true },
      { n: "Heavy Ion Cannon", t: "ion", st: "pilot", atk: 2, dmg: "5d10", x: 2, ion: true }
    ]
  }),
  v("Freefall-class Starfighter", "Caças Estelares", {
    cl: 8, cat: "starfighter", type: "Caça estelar (bombardeiro)", size: "colossal", ab: [42, 16, 12], armor: 12,
    def: [15, 26], hp: 120, dr: 15, sr: 20, dt: 76, speed: [16, 4], maxv: "1.000 km/h", bab: 0, crew: "normal", sk: SK(-2, 5, 5, -2, 5),
    crewText: "4 (piloto, artilheiro, navegador, bombardeiro)", passengers: "10", cargo: "20 toneladas", cons: "4 semanas", craft: "Nenhuma", payload: "20 bombas de prótons", hyper: "×2 (reserva ×10)",
    avail: "Restrito", cost: "70.000 (18.000 usado)", space: "30×20 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "gunner", atk: 1, dmg: "6d10", x: 2, auto: true },
      { n: "Bomb Chute", t: "missile", st: "gunner", atk: 1, dmg: "8d10", x: 5, ammo: 20, special: "bombardeiro" }
    ],
    notes: notes({ "Tripulação completa": "com os 4 tripulantes, cada um recebe +1 nos testes e jogadas da sua função; o piloto pode assumir tudo, perdendo o bônus", Descrição: "bombardeiro núbio de bombas não guiadas (o de Jinkins é o mais famoso)" })
  }),
  v("MorningStar-A Assault Starfighter", "Caças Estelares", {
    cl: 8, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [35, 14, 12], armor: 6,
    def: [13, 22], hp: 70, dr: 10, sr: 20, dt: 42, speed: [12, 3], maxv: "950 km/h", bab: 0, crew: "normal", sk: SK(2, 5, 5, 2, 5),
    crewText: "1", passengers: "Nenhum", cargo: "75 kg", cons: "3 dias", craft: "Nenhuma", payload: "4 mísseis", hyper: "×2",
    avail: "Restrito", cost: "43.000 (10.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Light Laser Cannons", t: "laser", st: "pilot", atk: 3, dmg: "5d10", x: 2, auto: true },
      { n: "Concussion Missile Launcher", t: "missile", st: "pilot", atk: 3, dmg: "8d10", x: 2, ammo: 4 }
    ],
    notes: notes({ Variantes: "B: troca o lança-mísseis por três canhões pesados (7d10×2); C: remove os canhões leves e leva três lança-mísseis com 10 mísseis cada" })
  }),
  v("S40K Phoenix Hawk-class Light Pinnace", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar (pinaça)", size: "gargantuan", ab: [48, 12, 12], armor: 8,
    def: [14, 28], hp: 150, dr: 10, sr: 30, dt: 48, speed: [12, 3], maxv: "750 km/h", bab: 0, crew: "normal", sk: SK(1, 5, 5, 1, 5),
    crewText: "1 ou 2", passengers: "4", cargo: "20 toneladas", cons: "2 meses", craft: "Nenhuma", hyper: "×2",
    avail: "Licenciado", cost: "112.000 (22.500 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Heavy Blaster Cannons", t: "blaster", st: "pilot", atk: 3, dmg: "6d10", x: 2, auto: true },
      { n: "Light Ion Cannons", t: "ion", st: "pilot", atk: 3, dmg: "3d10", x: 2, ion: true }
    ],
    notes: notes({ Descrição: "pinaça da Kuat Systems Engineering: lenta e apertada, mas com escudos e armas fortes; popular com caçadores de recompensas" })
  }),
  v("Scurrg H-6 Prototype Bomber", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar (bombardeiro protótipo)", size: "colossal", ab: [44, 16, 16], armor: 12,
    def: [15, 27], hp: 140, dr: 15, sr: 25, dt: 77, speed: [16, 4], maxv: "1.000 km/h", bab: 2, crew: "skilled", sk: SK(-1, 6, 6, -1, 6),
    crewText: "3 (piloto, artilheiro, navegador)", passengers: "3", cargo: "10 toneladas", cons: "2 semanas", craft: "Nenhuma", payload: "10 esferas de energia explosiva", hyper: "×2 (reserva ×10)",
    avail: "Militar", cost: "150.000 (não há usados)", space: "14×14 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "8d10", x: 2, auto: true },
      { n: "Laser Turret", t: "laser", st: "gunner", atk: 7, dmg: "6d10", x: 2, auto: true },
      { n: "Bomblet Generator", t: "missile", st: "pilot", atk: 7, dmg: "8d10", x: 5, ammo: 10, special: "−20 contra alvos menores que Colossal; gera uma bomba a cada 10 rodadas (máx. 10 armazenadas)" }
    ],
    notes: notes({ Descrição: "bombardeiro núbio roubado pelo pirata Nym (o Havoc, que dispensa tripulação completa graças a dois astromecânicos)" })
  }),

  /* ---------------- Armas fixas (Cap. 7) ---------------- */
  v("LR1K Sonic Antipersonnel Cannon", "Armas Fixas (Emplacements)", {
    cl: 4, cat: "walker", type: "Arma fixa (emplacement)", size: "large", ab: [21, 10, 18], armor: 1,
    def: [10, 15], hp: 30, dr: 5, sr: 0, dt: 20, speed: [0, 0], maxv: "Imóvel", bab: 2, crew: "skilled", sk: SK(5, 6, 6, 0, 6),
    crewText: "2 (skilled)", passengers: "Nenhum", cargo: "—", cons: "—", avail: "Restrito", cost: "9.000 (5.000 usado)", space: "2×2 ou 1 quadrado (escala de nave)", cover: "+5",
    w: [{ n: "Sonic Cannon", t: "blaster", st: "gunner", atk: 8, dmg: "4d10", x: 2, special: "2 artilheiros; dano sônico: não pode ser desviado por sabres de luz e conta como dano de energia" }],
    notes: notes({ Descrição: "canhão sônico geonosiano antipessoal (Gordarl Weaponsmiths), usado na Batalha de Geonosis" })
  }),
  v("AV-7 Antivehicle Cannon", "Armas Fixas (Emplacements)", {
    cl: 6, cat: "walker", type: "Arma fixa (emplacement, flutua para se mover)", size: "huge", ab: [26, 10, 18], armor: 3,
    def: [11, 18], hp: 80, dr: 5, sr: 0, dt: 28, speed: [4, 0], maxv: "Imóvel ao disparar; flutua 4 quadrados", bab: 2, crew: "skilled", sk: SK(4, 6, 6, 0, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "—", cons: "—", avail: "Militar", cost: "14.000 (8.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "+5",
    w: [{ n: "Antivehicle Cannon", t: "turbolaser", st: "gunner", atk: 6, dmg: "5d10", x: 2 }],
    notes: notes({ Descrição: "canhão semimóvel da Taim & Bak para defesa planetária da República (usado em Christophsis)" })
  }),
  /* ---------------- Naves Jedi (Cap. 9) ---------------- */
  v("Delta-7 Aethersprite (High-Speed Variant)", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar (Jedi)", size: "huge", ab: [34, 24, 14], armor: 3,
    def: [18, 22], hp: 65, dr: 10, sr: 15, dt: 32, speed: [18, 6], maxv: "1.260 km/h", bab: 5, crew: "expert", sk: SK(13, 8, 8, 13, 8),
    crewText: "1 + droide astromecânico (expert)", passengers: "Nenhum", cargo: "Nenhuma", cons: "Nenhum (1 semana com anel)", hyper: "×1 (com anel), memória de 10 saltos",
    avail: "Militar (só Jedi)", cost: "385.000 (290.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 9, dmg: "6d10", x: 2, auto: true }],
    notes: notes({ Astromecânico: "Mechanics e Use Computer +13 com o droide", Velocidade: "Pilot +20 ao aumentar a velocidade do veículo", Defesa: "Vehicular Combat do piloto já considerado na Reflexos do livro" })
  }),
  v("Delta-7 Aethersprite (High-Maneuver Variant)", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar (Jedi)", size: "huge", ab: [34, 30, 14], armor: 3,
    def: [21, 22], hp: 65, dr: 10, sr: 15, dt: 32, speed: [16, 5], maxv: "1.150 km/h", bab: 5, crew: "expert", sk: SK(16, 8, 8, 16, 8),
    crewText: "1 + droide astromecânico (expert)", passengers: "Nenhum", cargo: "Nenhuma", cons: "Nenhum (1 semana com anel)", hyper: "×1 (com anel), memória de 10 saltos",
    avail: "Militar (só Jedi)", cost: "210.000 (160.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 9, dmg: "6d10", x: 2, auto: true }],
    notes: notes({ Astromecânico: "Mechanics e Use Computer +13 com o droide" })
  }),
  v("Azure Angel", "Caças Estelares", {
    cl: 12, cat: "starfighter", type: "Caça estelar (Delta-7 modificado de Anakin Skywalker)", size: "huge", ab: [34, 28, 14], armor: 3,
    def: [20, 22], hp: 71, dr: 10, sr: 15, dt: 32, speed: [18, 6], maxv: "1.260 km/h", bab: 10, crew: "ace", sk: SK(19, 12, 12, 19, 12),
    crewText: "1 + droide astromecânico (ace)", passengers: "Nenhum", cargo: "Nenhuma", cons: "1 semana", payload: "16 torpedos de prótons", hyper: "×1, memória de 10 saltos",
    avail: "Nenhuma", cost: "Não está à venda", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 14, dmg: "7d10", x: 2, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 14, dmg: "9d10", x: 2, area: "Splash 4", ammo: 16 }
    ],
    notes: notes({ Astromecânico: "Mechanics e Use Computer +13 com o droide" })
  }),
  v("DC0052 \"Intergalactic\" Speeder", "Airspeeders", {
    cl: 1, cat: "airspeeder", type: "Veículo aéreo (airspeeder)", size: "large", ab: [16, 24, 14], armor: 1,
    def: [17, 13], hp: 30, dr: 5, sr: 0, dt: 18, speed: [12, 0], maxv: "800 km/h", bab: 0, crew: "normal", sk: SK(11, 5, 5, 11, 5),
    crewText: "1 (normal)", passengers: "0", cargo: "3 kg", cons: "Nenhum", avail: "Licenciado", cost: "10.000 (2.000 usado)", space: "1×1", cover: "Total (piloto)", w: [],
    notes: notes({ Descrição: "speeder da Daystar Craft (alcance 2.000 km, teto de 170 km); a versão Jedi tem painel de \"drop-deployment\" que lança o ocupante sem parar, deixando o speeder no piloto automático" })
  }),
  v("Eta-2 Actis (High-Maneuver Variant)", "Caças Estelares", {
    cl: 11, cat: "starfighter", type: "Caça estelar (Jedi)", size: "huge", ab: [34, 32, 14], armor: 3,
    def: [22, 22], hp: 70, dr: 10, sr: 0, dt: 32, speed: [16, 6], maxv: "1.500 km/h", bab: 10, crew: "ace", sk: SK(21, 12, 12, 21, 12),
    crewText: "1 + droide astromecânico (ace)", passengers: "Nenhum", cargo: "60 kg", cons: "2 dias (1 semana com anel)", hyper: "×1 (com anel), memória de 10 saltos",
    avail: "Militar", cost: "320.000 (240.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (piloto), +5 (astromecânico)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 14, dmg: "4d10", x: 2, auto: true },
      { n: "Ion Cannons", t: "ion", st: "pilot", atk: 14, dmg: "4d10", x: 2, ion: true, auto: true }
    ],
    notes: notes({ Astromecânico: "Mechanics e Use Computer +13 com o droide" })
  }),
  v("Eta-2 Actis (Heavy-Defense Variant)", "Caças Estelares", {
    cl: 11, cat: "starfighter", type: "Caça estelar (Jedi)", size: "huge", ab: [34, 26, 14], armor: 4,
    def: [20, 22], hp: 77, dr: 10, sr: 15, dt: 32, speed: [16, 6], maxv: "1.500 km/h", bab: 10, crew: "ace", sk: SK(18, 12, 12, 18, 12),
    crewText: "1 + droide astromecânico (ace)", passengers: "Nenhum", cargo: "60 kg", cons: "2 dias (1 semana com anel)", hyper: "×1 (com anel), memória de 10 saltos",
    avail: "Militar", cost: "310.000 (230.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (piloto), +5 (astromecânico)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 14, dmg: "4d10", x: 2, auto: true },
      { n: "Ion Cannons", t: "ion", st: "pilot", atk: 14, dmg: "4d10", x: 2, ion: true, auto: true }
    ],
    notes: notes({ Astromecânico: "Mechanics e Use Computer +13 com o droide" })
  }),
  /* ---------------- República (Cap. 10) ---------------- */
  v("All-Terrain Attack Pod (AT-AP)", "Walkers", {
    cl: 10, cat: "walker", type: "Veículo terrestre (walker)", size: "gargantuan", ab: [36, 12, 14], armor: 9,
    def: [15, 23], hp: 180, dr: 15, sr: 0, dt: 43, speed: [6, 0], maxv: "60 km/h", bab: 5, crew: "expert", sk: SK(4, 8, 8, 4, 8),
    crewText: "3 (expert)", passengers: "Nenhum", cargo: "200 kg", cons: "2 dias", payload: "50 microprojéteis", avail: "Militar", cost: "Não está à venda", space: "4×4", cover: "Total",
    w: [
      { n: "Mass-Driver Cannon", t: "turbolaser", st: "gunner", atk: 7, dmg: "6d10", x: 2, ammo: 50 },
      { n: "Heavy Blaster Cannon", t: "blaster", st: "gunner", atk: 7, dmg: "5d10", x: 2, auto: true },
      { n: "Medium Laser Cannon", t: "laser", st: "pilot", atk: 9, dmg: "3d10", x: 2, auto: true }
    ],
    notes: notes({ Descrição: "versão mais leve e rápida do AT-TE, usada em Kashyyyk" })
  }),
  v("All-Terrain Experimental Transport (AT-XT)", "Walkers", {
    cl: 6, cat: "walker", type: "Veículo terrestre (walker)", size: "large", ab: [26, 16, 12], armor: 4,
    def: [14, 18], hp: 80, dr: 5, sr: 5, dt: 22, speed: [4, 0], maxv: "25 km/h", bab: 5, crew: "expert", sk: SK(8, 8, 8, 8, 8),
    crewText: "1 (expert)", passengers: "Nenhum", cargo: "12 kg", cons: "2 dias", payload: "18 granadas de prótons", avail: "Restrito", cost: "14.700 (2.200 usado)", space: "2×2", cover: "Total",
    w: [
      { n: "Double Laser Cannon", t: "laser", st: "pilot", atk: 6, dmg: "4d10", x: 2, auto: true },
      { n: "Twin Proton Grenade Launchers", t: "missile", st: "pilot", atk: 6, dmg: "8d6", x: 1, area: "Explosão 4", ammo: 18, special: "gasta 2 granadas; ataque de área (escala de personagem)" }
    ],
    notes: notes({ Descrição: "protótipo do AT-RT com cabine blindada e gerador de escudo de plasma" })
  }),
  v("All-Terrain Recon Transport (AT-RT)", "Walkers", {
    cl: 5, cat: "walker", type: "Veículo terrestre (walker)", size: "large", ab: [22, 16, 12], armor: 4,
    def: [16, 16], hp: 60, dr: 5, sr: 0, dt: 21, speed: [8, 0], maxv: "70 km/h", bab: 2, crew: "skilled", sk: SK(8, 6, 6, 8, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "20 kg", cons: "1 dia", avail: "Militar", cost: "40.000 (24.000 usado)", space: "2×2", cover: "+2",
    w: [{ n: "Repeating Blaster Cannon", t: "blaster", st: "pilot", atk: 5, dmg: "3d10", x: 2, auto: true }],
    notes: notes({ Variante: "versão civil de controle de multidões: troca o canhão por morteiro de granadas (24 de atordoamento, iônicas ou de fragmentação); restrita, 25.000 cr (15.000 usado)" })
  }),
  v("All-Terrain Tactical Enforcer (AT-TE)", "Walkers", {
    cl: 12, cat: "walker", type: "Veículo terrestre (walker)", size: "gargantuan", ab: [42, 10, 14], armor: 9,
    def: [14, 26], hp: 240, dr: 15, sr: 0, dt: 46, speed: [4, 0], maxv: "60 km/h", bab: 5, crew: "expert", sk: SK(3, 8, 8, 3, 8),
    crewText: "7 (expert)", passengers: "38", cargo: "10 toneladas", cons: "15 dias", payload: "40 ogivas de concussão pesadas", avail: "Militar", cost: "Não está à venda", space: "6×4", cover: "Total (tripulação), +5 (artilheiro do canhão)",
    w: [
      { n: "Rail Cannon", t: "turbolaser", st: "gunner", atk: 7, dmg: "5d10", x: 5, ammo: 40, special: "ogiva de concussão pesada" },
      { n: "Medium Laser Cannons", t: "laser", st: "gunner", atk: 7, dmg: "2d10", x: 2, auto: true, count: 6 }
    ],
    notes: notes({ Descrição: "walker de seis pernas da Rothana com canhão de trilho dorsal; escala paredes com garras magnéticas; RD 30 contra dano iônico; escala 2 quadrados (climb)", "Compartimento traseiro": "leva um droide médico para estabilizar feridos" })
  }),
  v("BARC Speeder", "Speeders", {
    cl: 5, cat: "speeder", type: "Veículo terrestre (speeder bike)", size: "large", ab: [19, 18, 12], armor: 1,
    def: [14, 14], hp: 45, dr: 5, sr: 0, dt: 19, speed: [12, 0], maxv: "520 km/h", bab: 5, crew: "expert", sk: SK(11, 8, 8, 11, 8),
    crewText: "1 (expert)", passengers: "1", cargo: "5 kg", cons: "Nenhum", avail: "Militar", cost: "8.300 (1.550 usado)", space: "2×2", cover: "Nenhuma",
    w: [{ n: "Twin Light Blaster Cannons", t: "blaster", st: "pilot", atk: 8, dmg: "5d10", x: 1, auto: true }],
    notes: notes({ Descrição: "speeder bike militar da Aratech (Biker Advanced Recon Commando), alcança grandes altitudes" })
  }),
  v("CR-20 Troop Carrier", "Transportes", {
    cl: 13, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [66, 10, 16], armor: 10,
    def: [11, 38], hp: 300, dr: 15, sr: 25, dt: 88, speed: [12, 3], maxv: "850 km/h", bab: 5, crew: "expert", sk: SK(-1, 8, 8, -1, 8),
    crewText: "6 (expert)", passengers: "40", cargo: "15 toneladas", cons: "2 semanas", craft: "12 speeder bikes", hyper: "×3 (reserva ×12)",
    avail: "Restrito", cost: "680.000 (265.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Fire-linked Medium Turbolasers", t: "turbolaser", st: "pilot", atk: 10, dmg: "6d10", x: 5, auto: true },
      { n: "Fire-linked Medium Turbolasers (copiloto)", t: "turbolaser", st: "copilot", atk: 8, dmg: "6d10", x: 5, auto: true }
    ],
    notes: notes({ Descrição: "transporte de tropas corelliano comprado pela República após Geonosis" })
  }),
  v("Infantry Support Platform (ISP)", "Speeders", {
    cl: 7, cat: "speeder", type: "Veículo terrestre (speeder)", size: "huge", ab: [20, 14, 12], armor: 3,
    def: [13, 15], hp: 50, dr: 10, sr: 0, dt: 25, speed: [8, 0], maxv: "100 km/h", bab: 5, crew: "expert", sk: { initiative: 8, perception: 8, pilot: 8 },
    crewText: "2 (expert)", passengers: "Nenhum", cargo: "55 kg", cons: "1 dia", avail: "Restrito", cost: "11.600 (2.880 usado)", space: "2×2", cover: "+5",
    w: [
      { n: "Twin Blaster Cannons", t: "blaster", st: "pilot", atk: 8, dmg: "4d10", x: 2, auto: true },
      { n: "Twin Blaster Cannons (artilheiro)", t: "blaster", st: "gunner", atk: 6, dmg: "4d10", x: 2, auto: true }
    ],
    notes: notes({ Descrição: "speeder de turbofan vetorado, mais pesado que o BARC (Felucia, Kashyyyk)" })
  }),
  v("LAAT/c Carrier", "Airspeeders", {
    cl: 8, cat: "airspeeder", type: "Veículo aéreo (airspeeder)", size: "colossal", ab: [40, 12, 15], armor: 13,
    def: [14, 25], hp: 150, dr: 15, sr: 15, dt: 75, speed: [12, 3], maxv: "620 km/h", bab: 5, crew: "expert", sk: SK(-1, 8, 8, -1, 8),
    crewText: "1 (expert)", passengers: "Nenhum", cargo: "40 toneladas", cons: "3 dias", craft: "1 AT-TE, ou 4 AT-XT, ou 1 RTT, ou 1 TX-130, ou 1 centro de comando avançado",
    avail: "Militar", cost: "58.000 (42.000 usado)", space: "6×6 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Light Laser Cannons", t: "laser", st: "pilot", atk: 9, dmg: "3d10", x: 2, auto: true }],
    notes: notes({ "Forward Command Center": "centro tático portátil (4 clones): +5 de equipamento em Knowledge (tactics) e +1 de circunstância na Iniciativa para tropas comandadas de lá" })
  }),
  v("Medlifter Troop Transport", "Airspeeders", {
    cl: 4, cat: "airspeeder", type: "Veículo aéreo (airspeeder)", size: "huge", ab: [20, 14, 12], armor: 3,
    def: [13, 15], hp: 50, dr: 5, sr: 0, dt: 25, speed: [10, 0], maxv: "800 km/h", bab: 2, crew: "skilled", sk: { initiative: 6, perception: 6, pilot: 6 },
    crewText: "2 (skilled)", passengers: "4", cargo: "1 tonelada", cons: "1 dia", avail: "Licenciado", cost: "24.000 (6.100 usado)", space: "3×3", cover: "+5 (tripulação), nenhuma (passageiros)", w: [],
    notes: notes({ Descrição: "ambulância aérea (Ubrikkian Model 300) com casulos para feridos" })
  }),
  v("Republic Troop Transport (RTT)", "Airspeeders", {
    cl: 8, cat: "airspeeder", type: "Veículo aéreo (airspeeder)", size: "colossal", ab: [34, 14, 16], armor: 10,
    def: [12, 22], hp: 120, dr: 15, sr: 0, dt: 72, speed: [12, 0], maxv: "580 km/h", bab: 5, crew: "expert", sk: SK(0, 8, 8, 0, 8),
    crewText: "2 (expert)", passengers: "12", cargo: "3 toneladas", cons: "3 dias", payload: "12 mísseis", avail: "Restrito", cost: "42.000 (10.200 usado)", space: "6×6", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 10, dmg: "4d10", x: 1, auto: true },
      { n: "Missile Launcher", t: "missile", st: "gunner", atk: 8, dmg: "6d6", x: 1, area: "Splash 2", ammo: 12 }
    ]
  }),
  v("Self-Propelled Heavy Artillery (SPHA)", "Walkers", {
    cl: 16, cat: "walker", type: "Veículo terrestre (walker)", size: "colossal", ab: [54, 10, 14], armor: 15,
    def: [15, 32], hp: 360, dr: 20, sr: 0, dt: 82, speed: [4, 0], maxv: "35 km/h", bab: 5, crew: "expert", sk: { initiative: -2, perception: 8, pilot: -2 },
    crewText: "25 (expert)", passengers: "30", cargo: "500 kg", cons: "1 semana", payload: "48 mísseis de concussão (só SPHA-C)", avail: "Militar", cost: "Não está à venda", space: "12×12", cover: "Total",
    w: [
      { n: "SPHA-T Heavy Turbolaser", t: "turbolaser", st: "gunner", atk: 7, dmg: "7d10", x: 5 },
      { n: "Heavy Repeating Blaster Cannons", t: "blaster", st: "gunner", atk: 2, dmg: "3d10", x: 1, auto: true, count: 12, special: "só autofire" }
    ],
    notes: notes({ Variantes: "a arma principal define o modelo: SPHA-T turbolaser +7 (7d10×5); SPHA-I canhão iônico +7 (3d10×5 de íons); SPHA-V laser pesado +7 (5d10×2); SPHA-C lança-mísseis pesado +7 (9d10×5); SPHA-M canhão de massa +7 (7d10×2). Ficha montada como SPHA-T" })
  }),
  v("TX-130T Saber-class Fighter Tank", "Speeders", {
    cl: 7, cat: "speeder", type: "Veículo terrestre (speeder)", size: "huge", ab: [33, 18, 14], armor: 5,
    def: [17, 21], hp: 120, dr: 5, sr: 5, dt: 31, speed: [8, 0], maxv: "200 km/h", bab: 0, crew: "normal", sk: SK(7, 5, 5, 7, 5),
    crewText: "3 + droide astromecânico opcional (normal)", passengers: "2", cargo: "750 kg", cons: "1 dia", payload: "16 mísseis", avail: "Militar", cost: "Não está à venda", space: "3×3", cover: "Total (tripulação), +5 (astromecânico)",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 3, dmg: "5d10", x: 2 },
      { n: "Twin Medium Laser Cannons", t: "laser", st: "copilot", atk: 1, dmg: "5d10", x: 1, auto: true },
      { n: "Missile Launcher", t: "missile", st: "copilot", atk: 1, dmg: "8d6", x: 1, area: "Splash 4", ammo: 16 },
      { n: "Composite Beam Cannon", t: "laser", st: "gunner", atk: 1, dmg: "8d10", x: 1, special: "ignora 5 pontos de SR" }
    ],
    notes: notes({ Astromecânico: "com o droide, Mechanics e Use Computer +12", Descrição: "tanque de repulsão pilotado muitas vezes por Jedi" })
  }),
  v("Unstable Terrain Artillery Transport (UT-AT)", "Speeders", {
    cl: 6, cat: "speeder", type: "Veículo terrestre (speeder)", size: "colossal", ab: [28, 10, 12], armor: 10,
    def: [10, 19], hp: 200, dr: 15, sr: 0, dt: 69, speed: [4, 0], maxv: "45 km/h", bab: 5, crew: "expert", sk: SK(-2, 8, 8, -2, 8),
    crewText: "6 (expert)", passengers: "20", cargo: "26 toneladas", cons: "1 semana", avail: "Militar", cost: "Não está à venda", space: "8×12", cover: "Total",
    w: [
      { n: "Heavy Laser Cannon", t: "laser", st: "pilot", atk: 8, dmg: "6d10", x: 2, area: "Splash 2" },
      { n: "Medium Laser Cannons", t: "laser", st: "gunner", atk: 6, dmg: "4d10", x: 2, count: 2 },
      { n: "Heavy Repeating Blasters", t: "blaster", st: "gunner", atk: 1, dmg: "3d10", x: 1, auto: true, count: 4, special: "só autofire" },
      { n: "Bomblet Generators", t: "ion", st: "pilot", atk: 6, dmg: "4d6", x: 1, ion: true, special: "granadas iônicas; usar o gerador custa ao veículo uma rodada inteira de recarga" }
    ],
    notes: notes({ Descrição: "\"Trident\" de repulsão da Kuat Drive Yards (lento e vulnerável); escala 2 quadrados" })
  }),
  v("Consular-class Cruiser (Charger c70 Retrofit)", "Naves Capitais", {
    cl: 16, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [62, 18, 14], armor: 14,
    def: [18, 36], hp: 960, dr: 15, sr: 120, dt: 136, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(0, 6, 6, 0, 6),
    crewText: "8 (skilled)", passengers: "20 (tropas)", cargo: "6.000 toneladas", cons: "6 meses", craft: "Nenhuma", hyper: "×1,5, navicomputador avançado",
    avail: "Militar", cost: "1.650.000 (700.000 usado)", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Light Turbolaser Cannon Battery", t: "turbolaser", st: "gunner", atk: 8, dmg: "3d10", x: 5, count: 2, special: `3 artilheiros; ${CAP20}` },
      { n: "Point-Defense Medium Laser Cannon", t: "pointDefense", st: "gunner", atk: 4, dmg: "4d10", x: 2, count: 2 }
    ]
  }),
  v("Kappa-class Shuttle", "Transportes", {
    cl: 11, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [43, 14, 15], armor: 14,
    def: [16, 26], hp: 130, dr: 15, sr: 25, dt: 76, speed: [12, 4], maxv: "820 km/h", bab: 5, crew: "expert", sk: SK(0, 8, 8, 0, 8),
    crewText: "4 (expert)", passengers: "40", cargo: "50 toneladas", cons: "1 mês", craft: "2 AT-RT e 2 ISP", hyper: "×2 (reserva ×18), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Double Blaster Cannons", t: "blaster", st: "copilot", atk: 7, dmg: "5d10", x: 2 },
      { n: "Heavy Repeating Blaster Cannons", t: "blaster", st: "gunner", atk: 2, dmg: "3d10", x: 1, auto: true, count: 2, special: "escala de personagem; só autofire" }
    ]
  }),
  v("MedStar-class Frigate", "Naves Capitais", {
    cl: 15, cat: "capital", type: "Nave capital (fragata hospital)", size: "colossalFrigate", ab: [59, 12, 16], armor: 12,
    def: [13, 34], hp: 680, dr: 15, sr: 100, dt: 134, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "440 (skilled)", passengers: "655", cargo: "4.800 toneladas", cons: "3 anos", craft: "Até 12 naves Colossais", hyper: "×1 (reserva ×10)",
    avail: "Licenciado", cost: "4.875.000 (2.550.000 usado)", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 13, dmg: "4d10", x: 5, special: `5 artilheiros; ${CAP20}` },
      { n: "Point-Defense Laser Cannon Batteries", t: "pointDefense", st: "gunner", atk: 13, dmg: "2d10", x: 2, auto: true, count: 2, special: "5 artilheiros" },
      { n: "Tractor Beam", t: "tractor", st: "pilot", atk: 5, dmg: "0", x: 1, grp: 51 }
    ]
  }),
  v("Nu-class Attack Shuttle", "Transportes", {
    cl: 12, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [40, 18, 14], armor: 14,
    def: [17, 25], hp: 110, dr: 15, sr: 30, dt: 25, speed: [12, 4], maxv: "850 km/h", bab: 5, crew: "expert", sk: SK(2, 8, 8, 2, 8),
    crewText: "2 (expert)", passengers: "30", cargo: "2 toneladas", cons: "2 dias", craft: "Nenhuma", hyper: "Nenhum",
    avail: "Militar", cost: "85.000 (50.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Medium Laser Cannons", t: "laser", st: "pilot", atk: 9, dmg: "4d10", x: 2 },
      { n: "Double Light Laser Cannons", t: "laser", st: "copilot", atk: 7, dmg: "4d10", x: 2, auto: true }
    ],
    notes: notes({ "Limiar": "25 no livro (provável erro de impressão; valor mantido)", Descrição: "shuttle de assalto da Cygnus Spaceworks, transporte pessoal de generais Jedi" })
  }),
  v("Pelta-class Medical Frigate", "Naves Capitais", {
    cl: 16, cat: "capital", type: "Nave capital (fragata)", size: "colossalFrigate", ab: [60, 14, 20], armor: 11,
    def: [13, 35], hp: 760, dr: 15, sr: 100, dt: 135, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "900 (skilled)", passengers: "300 (tropas)", cargo: "275 toneladas", cons: "1 mês", craft: "Nenhuma", hyper: "×2 (reserva ×16)",
    avail: "Militar", cost: "Não está à venda", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Light Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 17, dmg: "3d10", x: 5, count: 2, special: `6 artilheiros; ${CAP20}` },
      { n: "Point-Defense Light Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 17, dmg: "4d10", x: 2, auto: true, count: 3, special: "6 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 11, dmg: "0", x: 1, grp: 47, special: `3 artilheiros; ${CAP20}` }
    ],
    notes: notes({ Descrição: "fragata modular da Kuat Drive Yards (asas auxiliares dobráveis; módulos internos trocáveis em dias)" })
  }),
  v("Koensayr BTL-S1 Y-wing", "Caças Estelares", {
    cl: 10, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [40, 16, 16], armor: 7,
    def: [15, 25], hp: 110, dr: 10, sr: 10, dt: 45, speed: [12, 3], maxv: "950 km/h", bab: 1, crew: "skilled", sk: SK(3, 6, 6, 3, 6),
    crewText: "2 + droide astromecânico (skilled)", passengers: "Nenhum", cargo: "130 kg", cons: "1 semana", payload: "10 torpedos de prótons", hyper: "×2, memória de 10 saltos (astromecânico)",
    avail: "Militar", cost: "127.000 (63.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), +5 (astromecânico)",
    w: [
      { n: "Medium Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "4d10", x: 2 },
      { n: "Double Light Ion Cannons", t: "ion", st: "gunner", atk: 5, dmg: "4d10", x: 2, ion: true, auto: true },
      { n: "Proton Torpedoes", t: "missile", st: "gunner", atk: 5, dmg: "9d10", x: 2, area: "Splash 4", ammo: 10 }
    ],
    notes: notes({ Astromecânico: "Mechanics e Use Computer +13 com o droide" })
  }),
  /* ---------------- Confederação (Cap. 11) ---------------- */
  v("Ground Armored Tank (GAT)", "Speeders", {
    cl: 10, cat: "speeder", type: "Veículo terrestre (speeder)", size: "huge", ab: [36, 17, 14], armor: 6,
    def: [17, 23], hp: 175, dr: 10, sr: 0, dt: 33, speed: [8, 0], maxv: "130 km/h", bab: 2, crew: "expert", sk: { initiative: 6, perception: 5, pilot: 6 },
    crewText: "Cérebro droide (expert)", passengers: "Nenhum", cargo: "Nenhuma", cons: "Nenhum", payload: "24 mísseis", avail: "Militar", cost: "17.500 (11.000 usado)", space: "3×3", cover: "Total",
    w: [
      { n: "Medium Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "4d10", x: 2 },
      { n: "Missile Launchers", t: "missile", st: "pilot", atk: 6, dmg: "8d6", x: 1, area: "Splash 4", ammo: 24 }
    ]
  }),
  v("IG-227 Hailfire-class Droid Tank", "Speeders", {
    cl: 12, cat: "speeder", type: "Veículo terrestre (rodas)", size: "huge", ab: [29, 15, 13], armor: 3,
    def: [13, 19], hp: 60, dr: 10, sr: 0, dt: 29, speed: [8, 0], maxv: "45 km/h", bab: 2, crew: "skilled", sk: { initiative: 5, perception: 6, pilot: 5 },
    crewText: "Cérebro droide (skilled)", passengers: "Nenhum", cargo: "Nenhuma", cons: "Nenhum", payload: "30 mísseis hailfire", avail: "Militar", cost: "60.000", space: "3×3", cover: "Total",
    w: [
      { n: "Missile Launchers", t: "missile", st: "pilot", atk: 5, dmg: "6d10", x: 2, area: "Splash 4", ammo: 30, special: "fire-link" },
      { n: "Laser Cannon", t: "laser", st: "pilot", atk: 5, dmg: "4d10", x: 2 }
    ]
  }),
  v("Manta Droid Subfighter", "Speeders", {
    cl: 9, cat: "speeder", type: "Veículo aquático (speeder)", size: "huge", ab: [25, 16, 12], armor: 3,
    def: [14, 17], hp: 75, dr: 10, sr: 0, dt: 27, speed: [12, 0], maxv: "160 km/h (natação)", bab: 0, crew: "normal", sk: { initiative: 6, perception: 5, pilot: 6 },
    crewText: "Cérebro droide (normal)", passengers: "Nenhum", cargo: "Nenhuma", cons: "Nenhum", payload: "12 torpedos", avail: "Militar", cost: "22.000", space: "3×3", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 3, dmg: "4d10", x: 2 },
      { n: "Torpedo Launchers", t: "missile", st: "pilot", atk: 3, dmg: "8d6", x: 1, area: "Explosão 4", ammo: 12, special: "fire-link" }
    ]
  }),
  v("Multi-Troop Transport (MTT)", "Speeders", {
    cl: 6, cat: "speeder", type: "Veículo terrestre (speeder)", size: "colossal", ab: [42, 10, 14], armor: 10,
    def: [10, 26], hp: 240, dr: 10, sr: 0, dt: 76, speed: [6, 0], maxv: "35 km/h", bab: 0, crew: "normal", sk: { initiative: -5, perception: 5, pilot: -5 },
    crewText: "4 dróides OOM (normal)", passengers: "112 B1 ou 20 droidekas (compactados)", cargo: "12 toneladas", cons: "Nenhum", avail: "Restrito", cost: "138.000 (80.000 usado)", space: "6×6", cover: "Total",
    w: [{ n: "Twin Blaster Cannons", t: "blaster", st: "gunner", atk: 2, dmg: "3d10", x: 2, count: 2 }]
  }),
  v("OG-9 Homing Spider Droid", "Walkers", {
    cl: 7, cat: "walker", type: "Veículo terrestre (walker)", size: "huge", ab: [24, 12, 14], armor: 5,
    def: [14, 17], hp: 70, dr: 10, sr: 0, dt: 27, speed: [8, 0], maxv: "50 km/h", bab: 2, crew: "skilled", sk: { initiative: 5, perception: 6, pilot: 5 },
    crewText: "Cérebro droide (skilled)", passengers: "Nenhum", cargo: "Nenhuma", cons: "Nenhum", avail: "Militar", cost: "70.000", space: "3×3", cover: "Total",
    w: [
      { n: "Laser Cannon", t: "laser", st: "pilot", atk: 6, dmg: "5d10", x: 1 },
      { n: "Heavy Repeating Blaster", t: "blaster", st: "pilot", atk: -1, dmg: "3d10", x: 1, auto: true, special: "só autofire" }
    ],
    notes: notes({ "Ponto fraco": "qualquer crítico, ou dano igual ou maior que o Limiar, zera o deslocamento (as pernas cedem) até o reparo; ainda pode atacar", Spotters: "com 4 dwarf spider droids DSD1 ajudando (aid another), recebe os bônus de ataque deles" })
  }),
  v("Persuader-class Droid Enforcer", "Speeders", {
    cl: 14, cat: "speeder", type: "Veículo terrestre (esteiras)", size: "huge", ab: [30, 12, 12], armor: 5,
    def: [14, 20], hp: 120, dr: 15, sr: 0, dt: 30, speed: [6, 0], maxv: "70 km/h", bab: 2, crew: "skilled", sk: { initiative: 5, perception: 6, pilot: 5 },
    crewText: "Cérebro droide (skilled)", passengers: "Nenhum", cargo: "Nenhuma", cons: "Nenhum", payload: "48 detonadores térmicos, 12 mísseis de concussão, 4 mísseis teleguiados, 2 torpedos", avail: "Militar", cost: "49.600", space: "3×3", cover: "Total",
    w: [
      { n: "Ion Cannons", t: "ion", st: "pilot", atk: 5, dmg: "4d10", x: 2, ion: true },
      { n: "Heavy Repeating Blaster", t: "blaster", st: "pilot", atk: 0, dmg: "3d10", x: 1, auto: true, special: "só autofire" },
      { n: "Missile Launchers", t: "missile", st: "pilot", atk: 3, dmg: "7d10", x: 2, special: "detonadores térmicos 8d6 (explosão 4); concussão 7d10×2; teleguiados 6d10×2; torpedos 9d10×2" }
    ],
    notes: notes({ Apelidos: "NR-N99, CAD, \"snail tank\"" })
  }),
  v("Single Trooper Aerial Platform (STAP)", "Airspeeders", {
    cl: 2, cat: "airspeeder", type: "Veículo aéreo (airspeeder)", size: "large", ab: [13, 16, 10], armor: 2,
    def: [14, 11], hp: 15, dr: 5, sr: 0, dt: 16, speed: [12, 0], maxv: "400 km/h", bab: 2, crew: "skilled", sk: { initiative: 8, perception: 6, pilot: 8 },
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "Nenhuma", cons: "Nenhum", avail: "Licenciado", cost: "2.500", space: "2×2", cover: "Nenhuma",
    w: [{ n: "Twin Blaster Cannons", t: "blaster", st: "pilot", atk: 4, dmg: "4d10", x: 1, auto: true }]
  }),
  v("Trade Federation Troop Carrier", "Speeders", {
    cl: 4, cat: "speeder", type: "Veículo terrestre (speeder)", size: "colossal", ab: [30, 12, 12], armor: 8,
    def: [9, 20], hp: 120, dr: 10, sr: 0, dt: 70, speed: [6, 0], maxv: "50 km/h", bab: 2, crew: "skilled", sk: { initiative: -3, mechanics: 6, perception: 6, pilot: -3 },
    crewText: "2 OOM pilotos (skilled)", passengers: "112 B1", cargo: "4 toneladas", cons: "Nenhum", avail: "Militar", cost: "37.000", space: "6×6", cover: "Total", w: []
  }),
  v("Tri-Droid", "Walkers", {
    cl: 9, cat: "walker", type: "Veículo terrestre (walker)", size: "gargantuan", ab: [34, 12, 14], armor: 8,
    def: [14, 22], hp: 160, dr: 15, sr: 0, dt: 32, speed: [8, 0], maxv: "50 km/h", bab: 2, crew: "skilled", sk: { initiative: 2, perception: 6, pilot: 2 },
    crewText: "Cérebro droide (skilled)", passengers: "Nenhum", cargo: "Nenhuma", cons: "Nenhum", payload: "48 projéteis pesados", avail: "Militar", cost: "100.000", space: "4×4", cover: "Total",
    w: [{ n: "Heavy Ordnance Launcher", t: "turbolaser", st: "gunner", atk: 4, dmg: "5d10", x: 5, area: "Explosão 4", count: 3, ammo: 48 }],
    notes: notes({ Deslocamento: "8; escalada 4", Descrição: "artilharia móvel gigante da Techno Union (Mygeeto)" })
  }),
  v("Tsmeu-6 Personal Wheel Bike", "Speeders", {
    cl: 3, cat: "speeder", type: "Veículo terrestre (rodas/andando)", size: "large", ab: [20, 16, 14], armor: 4,
    def: [16, 15], hp: 50, dr: 5, sr: 0, dt: 20, speed: [10, 0], maxv: "330 km/h", bab: 5, crew: "expert", sk: { initiative: 10, perception: 8, pilot: 10 },
    crewText: "1 (expert)", passengers: "1", cargo: "10 kg", cons: "Nenhum", avail: "Licenciado", cost: "15.000", space: "2×2", cover: "+5", w: [],
    notes: notes({ Deslocamento: "10 (rodas); anda 6 quadrados com as pernas retráteis", Descrição: "moto-roda de reconhecimento difícil de controlar em alta velocidade" })
  }),
  v("General Grievous's Wheel Bike", "Speeders", {
    cl: 5, cat: "speeder", type: "Veículo terrestre (rodas/andando)", size: "large", ab: [20, 16, 14], armor: 4,
    def: [16, 15], hp: 50, dr: 5, sr: 0, dt: 20, speed: [10, 0], maxv: "330 km/h", bab: 5, crew: "expert", sk: { initiative: 10, perception: 8, pilot: 10 },
    crewText: "1 (expert)", passengers: "Nenhum", cargo: "5 kg", cons: "Nenhum", avail: "Militar", cost: "Não está à venda", space: "2×2", cover: "+5",
    w: [{ n: "Double Laser Cannon", t: "laser", st: "pilot", atk: 9, dmg: "5d10", x: 1, auto: true }],
    notes: notes({ Descrição: "Tsmeu-6 modificada: o assento do passageiro deu lugar a um canhão laser duplo" })
  }),
  v("BC-714 Luxury Transport", "Transportes", {
    cl: 5, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [44, 10, 18], armor: 12,
    def: [12, 27], hp: 135, dr: 15, sr: 45, dt: 77, speed: [16, 2], maxv: "1.800 km/h", bab: 0, crew: "normal", sk: SK(-5, 5, 5, -5, 5),
    crewText: "17 (normal)", passengers: "30", cargo: "80 toneladas", cons: "6 meses", craft: "Nenhuma", hyper: "×1 (reserva ×6), navicomputador",
    avail: "Restrito", cost: "1.700.000 (980.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total", w: [],
    notes: notes({ Descrição: "iate veloz do InterGalactic Banking Clan, símbolo de status dos executivos Muun" })
  }),
  v("Belbullab-22 Heavy Starfighter", "Caças Estelares", {
    cl: 13, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [47, 14, 14], armor: 10,
    def: [17, 28], hp: 160, dr: 10, sr: 25, dt: 48, speed: [16, 4], maxv: "1.100 km/h", bab: 2, crew: "skilled", sk: SK(3, 6, 6, 3, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "140 kg", cons: "1 semana", payload: "12 mísseis de concussão (Belbullab-24)", hyper: "×6 (reserva ×15), navicomputador",
    avail: "Militar", cost: "168.000 (125.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Triple Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "5d10", x: 2, count: 2 }],
    notes: notes({ Variantes: "Belbullab-23 e -24: canhões triplos 6d10×2; Belbullab-24 também tem 2 lança-mísseis de concussão +6 (9d10×2)" })
  }),
  v("Soulless One", "Caças Estelares", {
    cl: 14, cat: "starfighter", type: "Caça estelar (Belbullab-22 modificado de Grievous)", size: "gargantuan", ab: [47, 19, 14], armor: 10,
    def: [21, 28], hp: 160, dr: 10, sr: 25, dt: 48, speed: [16, 4], maxv: "1.100 km/h", bab: 5, crew: "expert", sk: SK(7, 8, 8, 7, 8),
    crewText: "1 (expert)", passengers: "Nenhum", cargo: "160 kg", cons: "1 semana", hyper: "×2 (reserva ×5), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Triple Laser Cannons", t: "laser", st: "pilot", atk: 9, dmg: "5d10", x: 2, auto: true }],
    notes: notes({ Descrição: "nave pessoal de Grievous, com transceptor HoloNet de última geração" })
  }),
  v("C-9979 Landing Craft", "Naves Capitais", {
    cl: 10, cat: "capital", type: "Transporte espacial (fragata)", size: "colossalFrigate", ab: [58, 10, 16], armor: 11,
    def: [11, 34], hp: 600, dr: 15, sr: 60, dt: 134, speed: [12, 1], maxv: "590 km/h", bab: 0, crew: "normal", sk: SK(-5, 5, 5, -5, 5),
    crewText: "88 dróides OOM (normal)", passengers: "30 de reparo, 40 OOM comandantes, 39 OOM pilotos, 15 OOM segurança", cargo: "1.800 toneladas", cons: "1 dia", craft: "28 Troop Carriers, 114 AATs, 11 MTTs", hyper: "Nenhum",
    avail: "Militar", cost: "200.000 (75.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Fire-linked Laser Cannons", t: "laser", st: "gunner", atk: 3, dmg: "5d10", x: 2, auto: true, count: 2 },
      { n: "Fire-linked Blaster Cannons", t: "blaster", st: "gunner", atk: 3, dmg: "5d10", x: 2, auto: true, count: 2 }
    ]
  }),
  v("CIS-Advanced Starfighter", "Caças Estelares", {
    cl: 9, cat: "starfighter", type: "Caça estelar (protótipo)", size: "huge", ab: [38, 16, 16], armor: 4,
    def: [15, 24], hp: 90, dr: 10, sr: 25, dt: 34, speed: [16, 5], maxv: "1.300 km/h", bab: 2, crew: "skilled", sk: SK(7, 6, 6, 7, 6),
    crewText: "1 (skilled)", passengers: "Nenhum", cargo: "190 kg", cons: "2 dias", payload: "24 torpedos de prótons", hyper: "×6, navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Blaster Cannons", t: "blaster", st: "pilot", atk: 7, dmg: "6d10", x: 2, auto: true },
      { n: "Proton Torpedo Launchers", t: "missile", st: "pilot", atk: 7, dmg: "9d10", x: 2, area: "Splash 4", ammo: 24 }
    ],
    notes: notes({ Descrição: "protótipo roubado por Saesee Tiin; inspirou o Eta-2" })
  }),
  v("Diamond-class Cruiser", "Naves Capitais", {
    cl: 13, cat: "capital", type: "Transporte espacial (fragata)", size: "colossalFrigate", ab: [61, 12, 17], armor: 12,
    def: [13, 35], hp: 840, dr: 15, sr: 50, dt: 135, speed: [12, 1], maxv: "1.450 km/h", bab: 0, crew: "normal", sk: SK(-4, 5, 5, -4, 4),
    crewText: "148 (normal)", passengers: "45", cargo: "1.380 toneladas", cons: "3 meses", craft: "600 OG-9 homing spider droids, 2.400 dwarf spider droids", hyper: "×0,75 (reserva ×4)",
    avail: "Militar", cost: "5.000.000 (2.125.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannon Batteries", t: "laser", st: "gunner", atk: 13, dmg: "4d10", x: 2, auto: true, count: 2, special: "6 artilheiros" }],
    notes: notes({ Descrição: "nave de desembarque rápido da Commerce Guild (nau capitânia de Shu Mai)" })
  }),
  v("Droch-class Boarding Ship", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar (abordagem)", size: "huge", ab: [34, 12, 14], armor: 3,
    def: [12, 22], hp: 60, dr: 5, sr: 0, dt: 32, speed: [12, 3], maxv: "850 km/h", bab: 2, crew: "skilled", sk: SK(4, 6, 6, 4, 6),
    crewText: "1", passengers: "6 (tropas droides)", cargo: "30 kg", cons: "1 dia", hyper: "Nenhum",
    avail: "Restrito", cost: "43.000", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total (tripulação)",
    w: [
      { n: "Light Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "3d10", x: 2 },
      { n: "Boarding Drill", t: "tractor", st: "pilot", atk: 6, dmg: "0", x: 1, grp: 24, special: "prende-se a uma nave adjacente; cada rodada, dano igual ao resultado do agarrar ignorando o SR; quando o dano acumulado excede o Limiar, perfura o casco e desembarca as tropas" }
    ]
  }),
  v("Hardcell-class Transport", "Naves Capitais", {
    cl: 10, cat: "capital", type: "Transporte espacial (fragata)", size: "colossalFrigate", ab: [66, 10, 18], armor: 14,
    def: [14, 38], hp: 800, dr: 15, sr: 100, dt: 138, speed: [18, 1], maxv: "4.000 km/h", bab: 2, crew: "skilled", sk: SK(-4, 6, 6, -4, 6),
    crewText: "190 (skilled)", passengers: "1.017", cargo: "12.400 toneladas", cons: "6 meses", craft: "650 Hailfire droid tanks", hyper: "×1 (reserva ×8), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "gunner", atk: 16, dmg: "4d10", x: 2, auto: true, count: 2, special: "6 artilheiros" }],
    notes: notes({ Vulnerável: "um crítico causa dano triplo em vez de dobrado", Astromecânico: "sem astromecânico, Mechanics e Use Computer +6" })
  }),
  v("Hyena-class Bomber", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar (droide)", size: "huge", ab: [35, 14, 14], armor: 3,
    def: [13, 22], hp: 70, dr: 5, sr: 0, dt: 32, speed: [16, 4], maxv: "1.150 km/h", bab: 5, crew: "expert", sk: SK(8, 8, 8, 8, 8),
    crewText: "0 (droide, expert)", passengers: "Nenhum", cargo: "Nenhuma", cons: "2 dias", payload: "6 torpedos de prótons, 6 mísseis de concussão", hyper: "Nenhum",
    avail: "Restrito", cost: "23.000", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Nenhuma",
    w: [
      { n: "Light Laser Cannons", t: "laser", st: "pilot", atk: 7, dmg: "3d10", x: 2 },
      { n: "Proton Torpedoes", t: "missile", st: "pilot", atk: 7, dmg: "9d10", x: 2, area: "Splash 4", ammo: 6 },
      { n: "Light Concussion Missiles", t: "missile", st: "pilot", atk: 7, dmg: "7d10", x: 2, ammo: 6 }
    ],
    notes: notes({ "Caça droide": "ataca com todas as armas como se cada uma tivesse artilheiro próprio" })
  }),
  v("Providence-class Destroyer", "Naves Capitais", {
    cl: 18, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [98, 12, 22], armor: 13,
    def: [14, 54], hp: 1800, dr: 20, sr: 180, dt: 254, speed: [12, 4], maxv: "1.050 km/h", bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "22.350 (skilled)", passengers: "48.247", cargo: "29.000 toneladas", cons: "1 ano", craft: "8 naves de desembarque/shuttles", payload: "2.800 torpedos de prótons", hyper: "×1,5 (reserva ×10), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Quad Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 18, dmg: "7d10", x: 5, special: `6 artilheiros; ${CAP20}` },
      { n: "Dual Laser Cannon Battery", t: "laser", st: "gunner", atk: 16, dmg: "6d10", x: 2, count: 3, special: "5 artilheiros" },
      { n: "Heavy Ion Cannons", t: "ion", st: "gunner", atk: 8, dmg: "3d10", x: 5, ion: true, special: CAP20 },
      { n: "Point-Defense Ion Cannon Battery", t: "pointDefense", st: "gunner", atk: 18, dmg: "3d10", x: 2, ion: true, special: "6 artilheiros; iônico" },
      { n: "Proton Torpedo Launcher Battery", t: "missile", st: "gunner", atk: 18, dmg: "9d10", x: 2, area: "Splash 4", count: 8, ammo: 2800, special: "6 artilheiros" }
    ]
  }),
  v("Invisible Hand", "Naves Capitais", {
    cl: 20, cat: "capital", type: "Nave capital (Providence de Grievous)", size: "colossalCruiser", ab: [98, 12, 22], armor: 13,
    def: [14, 54], hp: 1800, dr: 20, sr: 180, dt: 254, speed: [12, 4], maxv: "1.050 km/h", bab: 5, crew: "expert", sk: SK(-1, 8, 8, -1, 8),
    crewText: "350 (expert)", passengers: "125.000", cargo: "29.000 toneladas", cons: "1 ano", craft: "16 naves de desembarque/shuttles, 24 caças", payload: "2.800 torpedos de prótons", hyper: "×1 (reserva ×10), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Quad Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 21, dmg: "7d10", x: 5, special: `6 artilheiros; ${CAP20}` },
      { n: "Dual Laser Cannon Battery", t: "laser", st: "gunner", atk: 19, dmg: "6d10", x: 2, count: 3, special: "5 artilheiros" },
      { n: "Heavy Ion Cannons", t: "ion", st: "gunner", atk: 11, dmg: "3d10", x: 5, ion: true, special: CAP20 },
      { n: "Point-Defense Ion Cannon Battery", t: "pointDefense", st: "gunner", atk: 21, dmg: "3d10", x: 2, ion: true, special: "6 artilheiros; iônico" },
      { n: "Proton Torpedo Launcher Battery", t: "missile", st: "gunner", atk: 21, dmg: "9d10", x: 2, area: "Splash 4", count: 8, ammo: 2800, special: "6 artilheiros" }
    ]
  }),
  v("Punworcca 116-class Sloop", "Transportes", {
    cl: 6, cat: "transport", type: "Transporte espacial (sloop de Dooku)", size: "gargantuan", ab: [34, 14, 16], armor: 5,
    def: [12, 22], hp: 60, dr: 10, sr: 20, dt: 42, speed: [16, 4], maxv: "1.600 km/h", bab: 2, crew: "skilled", sk: SK(3, 6, 6, 3, 6),
    crewText: "2 ou 1 droide FA-4 + copiloto opcional (skilled)", passengers: "11", cargo: "240 kg", cons: "1 semana", hyper: "×1,5, navicomputador",
    avail: "Licenciado", cost: "35.700", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Microtractor-Pressor", t: "tractor", st: "copilot", atk: 2, dmg: "0", x: 1, grp: 14, special: "pode empurrar o alvo 10 quadrados (1 em escala de nave); bônus de agarrar à metade" }],
    notes: notes({ "Piloto droide FA-4": "com ele, Initiative +13, Perception +4, Pilot +13, Use Computer +13", Descrição: "veleiro solar geonosiano de Count Dooku, quase invisível a sensores" })
  }),
  v("Sheathipede-class Shuttle", "Transportes", {
    cl: 4, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [45, 14, 10], armor: 6,
    def: [8, 27], hp: 140, dr: 15, sr: 35, dt: 77, speed: [12, 4], maxv: "880 km/h", bab: 0, crew: "normal", sk: SK(-3, 5, 5, -3, 5),
    crewText: "1 (normal)", passengers: "6", cargo: "1 tonelada", cons: "1 semana", hyper: "Nenhum",
    avail: "Licenciado", cost: "Não está à venda", space: "6×6 ou 1 quadrado (escala de nave)", cover: "Total", w: [],
    notes: notes({ Descrição: "\"Neimoidian shuttle\" de comando por voz, para viagens da superfície à órbita" })
  }),
  v("Subjugator-class Heavy Cruiser", "Naves Capitais", {
    cl: 20, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [97, 14, 20], armor: 13,
    def: [15, 53], hp: 1750, dr: 20, sr: 130, dt: 253, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "550 (skilled)", passengers: "60.000 (dróides de batalha)", cargo: "13.000 toneladas", cons: "2 anos", craft: "144 Vultures, 48 Hyena, naves de apoio", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Militar", cost: "Não está à venda", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "7d10", x: 5, count: 5, special: `5 artilheiros; ${CAP20}` },
      { n: "Medium Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 15, dmg: "5d10", x: 5, count: 2, special: `5 artilheiros; ${CAP20}` },
      { n: "Point-Defense Light Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 15, dmg: "3d10", x: 2, count: 5, special: "5 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 11, dmg: "0", x: 1, grp: 65, count: 2, special: `3 artilheiros; ${CAP20}` },
      { n: "Ion Pulse Cannon", t: "ion", st: "gunner", atk: 7, dmg: "9d10", x: 10, ion: true, count: 2, area: "Raio 5 (escala de nave)", special: "ataque de área contra todas as naves a até 5 quadrados; acerto: dano iônico e −2 passos; erro: metade e −1 passo. Depois, 3 rodadas completas de recarga; se a nave sofrer dano ≥ Limiar nesse período, o canhão sobrecarrega e é destruído" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: ataques iônicos contra naves inimigas num raio de 2 quadrados causam +2 dados ao acertar", Exemplo: "Malevolence, nau de Grievous" })
  }),
  /* ---------------- Facções da Orla (Cap. 12) ---------------- */
  v("Oevvaor Jet Catamaran", "Speeders", {
    cl: 3, cat: "speeder", type: "Veículo aquático (speeder)", size: "gargantuan", ab: [22, 14, 14], armor: 3,
    def: [13, 16], hp: 60, dr: 5, sr: 0, dt: 36, speed: [12, 3], maxv: "370 km/h sobre a água", bab: 0, crew: "normal", sk: SK(5, 5, 5, 5, 5),
    crewText: "2 (normal)", passengers: "2", cargo: "50 kg", cons: "3 dias", avail: "Licenciado", cost: "12.125 (2.700 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total (tripulação), nenhuma (passageiros)",
    w: [{ n: "Blaster Cannon", t: "blaster", st: "gunner", atk: 2, dmg: "3d10", x: 1, auto: true }]
  }),
  v("Raddaugh Gnasp Fluttercraft", "Airspeeders", {
    cl: 4, cat: "airspeeder", type: "Veículo aéreo (ornitóptero)", size: "huge", ab: [18, 18, 16], armor: 1,
    def: [14, 14], hp: 40, dr: 5, sr: 0, dt: 29, speed: [12, 3], maxv: "310 km/h", bab: 2, crew: "skilled", sk: SK(11, 8, 8, 9, 6),
    crewText: "2 (skilled)", passengers: "Nenhum", cargo: "3 kg", cons: "1 dia", avail: "Licenciado", cost: "14.750 (3.200 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "+2 (tripulação)",
    w: [{ n: "Laser Cannon Tail-Gun", t: "laser", st: "gunner", atk: 5, dmg: "4d10", x: 1, auto: true }]
  }),
  v("Sabaoth Destroyer", "Naves Capitais", {
    cl: 12, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [62, 14, 16], armor: 12,
    def: [14, 36], hp: 900, dr: 15, sr: 130, dt: 136, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "250 (skilled)", passengers: "3.000", cargo: "3.000 toneladas", cons: "1 ano", craft: "12 caças", hyper: "×3 (reserva ×18), navicomputador",
    avail: "Militar", cost: "3.500.000 (1.500.000 usado)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Point-Defense Heavy Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 9, dmg: "6d10", x: 2, count: 3, special: "3 artilheiros" },
      { n: "Light Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 9, dmg: "2d10", x: 5, count: 2, special: `3 artilheiros; ${CAP20}` }
    ],
    notes: notes({ Descrição: "destróier dos mercenários do Esquadrão Sabaoth (a Reaver, de Cavik Toth)" })
  }),
  v("Sabaoth Starfighter", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [36, 22, 16], armor: 3,
    def: [17, 23], hp: 75, dr: 5, sr: 0, dt: 33, speed: [16, 4], maxv: "1.110 km/h", bab: 5, crew: "expert", sk: SK(12, 8, 8, 9, 8),
    crewText: "1 (expert)", passengers: "Nenhum", cargo: "50 kg", cons: "1 semana", avail: "Militar", cost: "170.000 (72.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 8, dmg: "4d10", x: 2, count: 4 }]
  })
];
