// The Force Unleashed Campaign Guide — veículos e naves. Mesmo formato de tools/data/vehicles.mjs.
const notes = o => `<p><em>The Force Unleashed Campaign Guide</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
const v = (name, folder, o) => ({ name, folder, source: "The Force Unleashed Campaign Guide", ...o });
const SK = (i, m, p, pi, u) => ({ initiative: i, mechanics: m, perception: p, pilot: pi, useComputer: u });
const CAP = n => `${n} contra alvos menores que Colossal`;

export default [
  /* ---------------- Cap. 7: terrestres e speeders ---------------- */
  v("Armored Groundcar", "Speeders", {
    cl: 5, cat: "speeder", type: "Veículo terrestre (rodas)", size: "huge", ab: [32, 14, 12], armor: 6,
    def: [17, 21], hp: 140, dr: 5, dt: 31, speed: [6, 0], maxv: "90 km/h", bab: 0, crew: "normal", sk: SK(8, 5, 5, 8, 5),
    crewText: "3 (normal)", passengers: "8", cargo: "300 kg", cons: "1 semana", avail: "Licenciado", cost: "25.000 (13.000 usado)", space: "3×3", cover: "Total",
    w: [{ n: "Blaster Cannons", t: "blaster", st: "gunner", atk: 1, dmg: "3d10", x: 2, count: 2 }],
    notes: notes({ Descrição: "carro de rodas blindado e armado depois de fábrica (\"warcrawler\"), comum em mundos da Orla", Iniciativa: "o livro dá +10 no cabeçalho e +8 nas perícias" })
  }),
  v("Arrow-23 Landspeeder (Paramilitary)", "Speeders", {
    cl: 2, cat: "speeder", type: "Veículo terrestre (speeder)", size: "huge", ab: [32, 19, 12], armor: 5,
    def: [17, 21], hp: 120, dr: 5, dt: 31, speed: [12, 0], maxv: "400 km/h", bab: 0, crew: "normal", sk: SK(7, 5, 5, 7, 5),
    crewText: "2 (normal)", passengers: "5", cargo: "800 kg", cons: "1 dia", avail: "Licenciado", cost: "10.800 (3.400 usado)", space: "3×3", cover: "Total (+5 para o artilheiro)",
    w: [
      { n: "Laser Cannon", t: "laser", st: "pilot", atk: 1, dmg: "4d10", x: 1 },
      { n: "Grenade Launcher", t: "missile", st: "gunner", atk: 1, dmg: "4d6", x: 1, area: "Explosão 2" }
    ],
    notes: notes({ Descrição: "landspeeder fechado da Aratech, rápido e resistente; o modelo civil não tem armas e custa 4.000 a menos; interior de luxo +10.000" })
  }),
  v("Flare-S Swoop", "Airspeeders", {
    cl: 3, cat: "airspeeder", type: "Veículo aéreo (speeder)", size: "large", ab: [20, 20, 14], armor: 2,
    def: [16, 15], hp: 50, dr: 5, dt: 20, speed: [12, 0], maxv: "650 km/h", bab: 2, crew: "skilled", sk: SK(10, 6, 6, 10, 6),
    crewText: "1 (skilled)", passengers: "1", cargo: "2 kg", cons: "1 dia", avail: "Licenciado", cost: "5.750 (1.500 usado)", space: "2×2", cover: "Nenhuma", w: [],
    notes: notes({ Altitude: "máx. 350 m (Mechanics CD 15 libera vários quilômetros)", Defletores: "corredores às vezes instalam defletores (SR 5) por 20.000 créditos", Descrição: "a swoop de corrida mais popular após a proibição do Podracing" })
  }),
  v("V-35 Courier", "Speeders", {
    cl: 2, cat: "speeder", type: "Veículo terrestre (speeder)", size: "large", ab: [18, 16, 12], armor: 1,
    def: [13, 14], hp: 40, dr: 5, dt: 19, speed: [8, 0], maxv: "105 km/h", bab: 0, crew: "normal", sk: SK(7, 5, 5, 7, 5),
    crewText: "1 (normal)", passengers: "2", cargo: "50 kg", cons: "1 dia", avail: "Licenciado", cost: "8.000 (2.500 usado)", space: "2×2", cover: "Total", w: [],
    notes: notes({ Descrição: "landspeeder familiar barato e durável da SoroSuub; pode receber uma pequena torreta no teto" })
  }),
  v("Zephyr-G Swoop", "Speeders", {
    cl: 2, cat: "speeder", type: "Veículo terrestre (speeder)", size: "large", ab: [24, 18, 12], armor: 2,
    def: [15, 17], hp: 50, dr: 5, dt: 22, speed: [12, 0], maxv: "350 km/h", bab: 0, crew: "normal", sk: SK(8, 5, 5, 8, 5),
    crewText: "1 (normal)", passengers: "1", cargo: "100 kg", cons: "1 dia", avail: "Licenciado", cost: "5.750 (1.500 usado)", space: "2×2", cover: "Nenhuma", w: [],
    notes: notes({ Altitude: "inibidores limitam a 6 m (Mechanics CD 15 libera quase 1 km)", Descrição: "swoop utilitária robusta; alforjes de 100 kg custam 10 créditos" })
  }),
  v("A-A5 Speeder Truck", "Speeders", {
    cl: 5, cat: "speeder", type: "Veículo terrestre (speeder)", size: "colossal", ab: [28, 14, 14], armor: 13,
    def: [15, 19], hp: 100, dr: 15, dt: 69, speed: [8, 0], maxv: "160 km/h", bab: 0, crew: "normal", sk: SK(-3, 5, 5, -3, 5),
    crewText: "3 (normal)", passengers: "25", cargo: "25 toneladas", cons: "1 semana", avail: "Licenciado", cost: "30.500 (8.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total", w: [],
    notes: notes({ Descrição: "caminhão de carga blindado da Trast; milícias o usam como transporte de tropas", Iniciativa: "o livro dá +3 no cabeçalho e −3 nas perícias" })
  }),
  v("KAAC Freerunner", "Speeders", {
    cl: 7, cat: "speeder", type: "Veículo terrestre (speeder pesado)", size: "gargantuan", ab: [42, 14, 14], armor: 8,
    def: [15, 26], hp: 160, dr: 10, dt: 46, speed: [10, 0], maxv: "300 km/h", bab: 2, crew: "skilled", sk: SK(3, 6, 6, 3, 6),
    crewText: "5 (skilled)", passengers: "6", cargo: "250 kg", cons: "1 semana", avail: "Restrito", cost: "140.000 (110.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Laser Cannons", t: "laser", st: "gunner", atk: 4, dmg: "5d10", x: 2, count: 2 },
      { n: "Blaster Cannons", t: "blaster", st: "gunner", atk: 4, dmg: "4d10", x: 1, count: 2 }
    ],
    notes: notes({ Plataforma: "até quatro armas trocáveis (Mechanics CD 15 e 1 hora); piloto e copiloto também podem disparar com −5", Cabine: "cabine aberta (fechá-la custa 1.000 créditos)" })
  }),

  /* ---------------- Cap. 7: caças ---------------- */
  v("H-60 Tempest Bomber", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [46, 14, 16], armor: 8,
    def: [15, 28], hp: 160, dr: 10, sr: 25, dt: 48, speed: [15, 4], maxv: "950 km/h", bab: 0, crew: "normal", sk: SK(4, 5, 5, 4, 5),
    crewText: "4 (normal)", passengers: "nenhum", cargo: "110 kg", cons: "2 semanas", payload: "20 mísseis de concussão médios", hyper: "nenhum",
    avail: "Restrito", cost: "175.000 (125.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 3, dmg: "5d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "gunner", atk: 3, dmg: "9d10", x: 2, area: "Splash 2", ammo: 20 }
    ],
    notes: notes({ Mísseis: "disparados em par; contra alvos frágeis pode disparar um só (8d10×2)", Descrição: "bombardeiro de asa voadora da Slayn & Korpil, precursor do B-wing" })
  }),
  v("M3-A Scyk Fighter", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [44, 18, 12], armor: 8,
    def: [17, 27], hp: 130, dr: 10, sr: 20, dt: 47, speed: [15, 4], maxv: "950 km/h", bab: 0, crew: "normal", sk: SK(4, 5, 5, 4, 5),
    crewText: "1 (normal)", passengers: "nenhum", cargo: "110 kg", cons: "2 semanas", hyper: "×2 (sem navicomputador)",
    avail: "Restrito", cost: "75.000 (35.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 1, dmg: "4d10", x: 2 }],
    notes: notes({ "Arma modular": "o canhão pode ser trocado por canhão iônico, mísseis de concussão ou lança-torpedos de prótons (até 6 cargas) de tamanho e poder equivalentes", Descrição: "caça barato da MandalMotors vendido a grupos semilegítimos" })
  }),
  v("NovaSword Space Superiority Fighter", "Caças Estelares", {
    cl: 7, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [42, 22, 16], armor: 7,
    def: [18, 26], hp: 110, dr: 10, sr: 15, dt: 46, speed: [16, 4], maxv: "1.000 km/h", bab: 2, crew: "skilled", sk: SK(7, 6, 6, 7, 6),
    crewText: "1 (skilled)", passengers: "1", cargo: "110 kg", cons: "4 semanas", payload: "3 mísseis de concussão médios", hyper: "×2, navicomputador",
    avail: "Restrito", cost: "145.000 (65.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 5, dmg: "5d10", x: 2 },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 5, dmg: "8d10", x: 2, area: "Splash 2", ammo: 3 }
    ],
    notes: notes({ Descrição: "caça versátil da Subpro, sucessor do Z-95; o segundo assento pode levar um operador de sistemas ou comandante" })
  }),
  v("R-41 Starchaser", "Caças Estelares", {
    cl: 9, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [38, 20, 18], armor: 6,
    def: [16, 24], hp: 100, dr: 10, sr: 20, dt: 44, speed: [16, 4], maxv: "1.050 km/h", bab: 2, crew: "skilled", sk: SK(6, 6, 6, 6, 6),
    crewText: "1 (skilled)", passengers: "1", cargo: "110 kg", cons: "2 semanas", payload: "2 mísseis de concussão médios", hyper: "×2, navicomputador",
    avail: "Restrito", cost: "115.000 (55.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 6, dmg: "5d10", x: 2 },
      { n: "Ion Cannon", t: "ion", st: "pilot", atk: 6, dmg: "3d10", x: 2, ion: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 6, dmg: "8d10", x: 2, area: "Splash 2", ammo: 2 }
    ],
    notes: notes({ Variante: "o R-42 tem um assento de artilheiro; de resto é idêntico", Descrição: "caça barato e confiável da Hoersch-Kessel, sem espaço para droide e com casco frágil" })
  }),
  v("Toscan 8-Q", "Caças Estelares", {
    cl: 8, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [44, 16, 14], armor: 7,
    def: [15, 27], hp: 120, dr: 10, sr: 10, dt: 47, speed: [14, 4], maxv: "850 km/h", bab: 0, crew: "normal", sk: SK(3, 5, 5, 3, 5),
    crewText: "2 (normal)", passengers: "3", cargo: "440 kg", cons: "4 semanas", payload: "12 mísseis de concussão médios", hyper: "×1, navicomputador",
    avail: "Licenciado", cost: "180.000 (40.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 2, dmg: "4d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "gunner", atk: 2, dmg: "8d10", x: 2, area: "Splash 2", ammo: 12 }
    ],
    notes: notes({ Descrição: "caça multiuso de chassi aberto da Shobquix, feito para ser customizado", Iniciativa: "o livro dá +1 no cabeçalho e +3 nas perícias" })
  }),
  v("Zebra Starfighter", "Caças Estelares", {
    cl: 6, cat: "starfighter", type: "Caça estelar", size: "gargantuan", ab: [44, 16, 12], armor: 7,
    def: [15, 27], hp: 120, dr: 10, sr: 15, dt: 47, speed: [16, 4], maxv: "1.000 km/h", bab: 0, crew: "normal", sk: SK(1, 5, 5, 1, 5),
    crewText: "1 (normal)", passengers: "nenhum", cargo: "65 kg", cons: "1 dia", hyper: "nenhum",
    avail: "Restrito", cost: "80.000 (30.000 usado)", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Heavy Laser Cannons", t: "laser", st: "pilot", atk: 1, dmg: "6d10", x: 2, auto: true }],
    notes: notes({ Destreza: "o livro imprime Des 12, mas a Reflexos 15 (desprevenido 12) corresponde a Des 16", Descrição: "caça simples da Hyrotii, lento, com dois canhões laser pesados ligados" })
  }),

  /* ---------------- Cap. 7: transportes ---------------- */
  v("CEC Hwk-290", "Transportes", {
    cl: 9, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [46, 20, 14], armor: 12,
    def: [17, 28], hp: 160, dr: 15, sr: 0, dt: 78, speed: [12, 3], maxv: "800 km/h", bab: 0, crew: "normal", sk: SK(0, 5, 5, 0, 5),
    crewText: "2 (normal)", passengers: "6", cargo: "150 toneladas", cons: "6 meses", hyper: "×2, navicomputador",
    avail: "Licenciado", cost: "135.000 (55.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Blaster Cannons (piloto)", t: "blaster", st: "pilot", atk: 4, dmg: "5d10", x: 2 },
      { n: "Blaster Cannons (artilheiro)", t: "blaster", st: "gunner", atk: 4, dmg: "5d10", x: 2 }
    ],
    notes: notes({ Armas: "o modelo de fábrica é desarmado; os dois pares de canhões blaster ligados são a modificação mais comum (o cabeçalho do livro dá +2)", Descrição: "cargueiro ágil da série Hawk (a Moldy Crow de Kyle Katarn é um deles)" })
  }),
  v("Gallofree Yards Maka-Eekai L4000 Transport", "Transportes", {
    cl: 9, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [52, 16, 18], armor: 12,
    def: [15, 31], hp: 200, dr: 15, sr: 20, dt: 81, speed: [12, 2], maxv: "800 km/h", bab: 0, crew: "normal", sk: SK(-2, 5, 5, -2, 5),
    crewText: "4 (normal)", passengers: "9", cargo: "410 toneladas", cons: "6 meses", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Licenciado", cost: "180.000 (85.000 usado)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Double Laser Cannons", t: "laser", st: "gunner", atk: 4, dmg: "4d10", x: 2, auto: true, count: 2 }],
    notes: notes({ Passageiros: "cada 10 toneladas de carga viram acomodação para mais um passageiro (até 40)", Descrição: "grande transporte independente de luxo; costuma receber uma torreta de canhões laser ligados num braço" })
  }),  v("Rendili StarDrive Neutron Star Bulk Cruiser", "Naves Capitais", {
    cl: 16, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [92, 14, 14], armor: 11,
    def: [13, 51], hp: 1400, dr: 20, sr: 100, dt: 251, speed: [0, 1], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "2.050 (skilled)", passengers: "200 (tropas)", cargo: "5.000 toneladas", cons: "1 ano", craft: "36 caças, 2 transportes espaciais", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Militar", cost: "5 milhões (2,5 milhões usado)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Quad Laser Cannon Battery", t: "laser", st: "gunner", atk: 14, dmg: "4d10", x: 5, auto: true, count: 5, special: `6 artilheiros; ${CAP("−6")}` },
      { n: "Tractor Beam", t: "tractor", st: "gunner", atk: 4, dmg: "0", x: 1, grp: 68, count: 2, special: CAP("−16") }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas Gargantuescas ou menores num raio de 2 quadrados recebem +2 na Reflexos", Descrição: "cruzador de segunda linha das Guerras Clônicas, lento e mal armado; hoje é transporte armado" })
  }),  /* ---------------- Cap. 10: veículos imperiais ---------------- */
  v("A5 Juggernaut", "Walkers", {
    cl: 11, cat: "walker", type: "Veículo terrestre (rodas)", size: "colossal", ab: [40, 10, 14], armor: 14,
    def: [14, 25], hp: 320, dr: 20, dt: 75, speed: [8, 0], maxv: "200 km/h", bab: 0, crew: "normal", sk: SK(-5, 5, 5, -5, 5),
    crewText: "8 (normal)", passengers: "50 (tropas)", cargo: "1 tonelada", cons: "1 semana", avail: "Licenciado", cost: "200.000 (120.000 usado)", space: "6×14", cover: "Total",
    w: [
      { n: "Heavy Laser Cannons", t: "laser", st: "gunner", atk: 4, dmg: "5d10", x: 2 },
      { n: "Blaster Cannon", t: "blaster", st: "gunner", atk: 4, dmg: "4d10", x: 2 },
      { n: "Grenade Launchers", t: "missile", st: "gunner", atk: 4, dmg: "4d6", x: 1, area: "Explosão 2" }
    ],
    notes: notes({ Descrição: "veículo blindado de 10 rodas das Guerras Clônicas, ainda usado pelo Império e por grupos insurgentes" })
  }),
  v("All Terrain Kashyyyk Transport (AT-KT)", "Walkers", {
    cl: 10, cat: "walker", type: "Veículo terrestre (walker)", size: "huge", ab: [30, 14, 12], armor: 4,
    def: [14, 20], hp: 120, dr: 10, dt: 40, speed: [6, 0], maxv: "90 km/h", bab: 5, crew: "expert", sk: SK(8, 4, 3, 8, 4),
    crewText: "2 (expert)", passengers: "nenhum", cargo: "nenhuma", cons: "2 dias", payload: "12 granadas de fragmentação", avail: "Militar", cost: "não está à venda", space: "3×3", cover: "Total",
    w: [
      { n: "Frag Grenade Launcher", t: "missile", st: "pilot", atk: 6, dmg: "4d6", x: 1, area: "Explosão 2", ammo: 12 },
      { n: "Stun Cannon", t: "blaster", st: "gunner", atk: 6, dmg: "2d10", x: 2, special: "dano de atordoamento" }
    ],
    notes: notes({ Descrição: "variante antipessoal do AT-ST (\"Hunter\") que atordoa insurgentes wookiees para escravizá-los" })
  }),
  v("All Terrain Construction Transport (AT-CT)", "Walkers", {
    cl: 10, cat: "walker", type: "Veículo terrestre (walker)", size: "huge", ab: [36, 14, 16], armor: 4,
    def: [14, 23], hp: 120, dr: 10, dt: 43, speed: [6, 0], maxv: "90 km/h", bab: 5, crew: "expert", sk: SK(8, 4, 3, 8, 4),
    crewText: "2 (expert)", passengers: "nenhum", cargo: "nenhuma", cons: "2 dias", avail: "Militar", cost: "não está à venda", space: "3×3", cover: "Total",
    w: [{ n: "Tractor Beam", t: "tractor", st: "gunner", atk: 8, dmg: "0", x: 1, grp: 28 }],
    notes: notes({ "Raio trator": "move o objeto agarrado até 10 quadrados em qualquer direção, ou o arremessa num alvo a até 10 quadrados (ataque à distância com o bônus do raio contra a Reflexos; dano conforme o tamanho do objeto, livro básico p. 254)", Descrição: "AT-ST de construção, desarmado, usado por engenheiros imperiais" })
  }),
  v("Uulshos LAVr QH-7 Chariot Command Speeder", "Speeders", {
    cl: 8, cat: "speeder", type: "Veículo terrestre (speeder)", size: "huge", ab: [34, 18, 12], armor: 7,
    def: [16, 22], hp: 120, dr: 5, dt: 32, speed: [12, 0], maxv: "350 km/h", bab: 2, crew: "skilled", sk: SK(7, 5, 5, 7, 5),
    crewText: "3 (skilled)", passengers: "nenhum", cargo: "200 kg", cons: "3 dias", avail: "Militar", cost: "não está à venda (valor estimado 40.000)", space: "3×3", cover: "Total",
    w: [{ n: "Laser Cannon", t: "laser", st: "gunner", atk: 3, dmg: "3d10", x: 2, auto: true }],
    notes: notes({ Descrição: "speeder de comando que leva o general à linha de frente e o retira de zonas quentes" })
  }),
  v("Nen-Carvon PX-4 Mobile Command Base", "Speeders", {
    cl: 8, cat: "speeder", type: "Veículo terrestre (lagartas)", size: "gargantuan", ab: [45, 10, 16], armor: 10,
    def: [15, 27], hp: 270, dr: 15, dt: 47, speed: [8, 0], maxv: "200 km/h", bab: 2, crew: "skilled", sk: SK(-8, 5, 5, -8, 5),
    crewText: "3 (skilled)", passengers: "7", cargo: "1 tonelada", cons: "1 semana", avail: "Militar", cost: "não está à venda (valor estimado 300.000)", space: "8×8", cover: "Total",
    w: [{ n: "Heavy Laser Cannon", t: "laser", st: "gunner", atk: 5, dmg: "4d10", x: 2, auto: true, area: "Splash 2" }],
    notes: notes({ Descrição: "quartel-general tático sobre lagartas, com displays holográficos; lançado por LAAT/c ou Sentinel" })
  }),
  v("TX-130T Fighter Tank (Imperial)", "Speeders", {
    cl: 8, cat: "speeder", type: "Veículo terrestre (speeder)", size: "huge", ab: [33, 18, 14], armor: 5,
    def: [17, 21], hp: 120, dr: 5, sr: 5, dt: 31, speed: [8, 0], maxv: "193 km/h", bab: 0, crew: "normal", sk: SK(7, 5, 5, 7, 5),
    crewText: "2 (normal)", passengers: "5", cargo: "100 kg", cons: "1 dia", payload: "8 mísseis de concussão", avail: "Militar", cost: "42.000 (34.000 usado)", space: "3×3", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "gunner", atk: 2, dmg: "5d10", x: 2 },
      { n: "Medium Concussion Missiles", t: "missile", st: "gunner", atk: 2, dmg: "6d10", x: 2, area: "Splash 2", ammo: 8 }
    ],
    notes: notes({ Descrição: "versão em serviço imperial do tanque de repulsão da Rothana, ainda fabricado em pequenos números" })
  }),
  v("Kuat Drive Yards A-7 Hunter Interceptor", "Caças Estelares", {
    cl: 6, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [34, 18, 14], armor: 4,
    def: [16, 22], hp: 60, dr: 10, sr: 0, dt: 32, speed: [16, 5], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(8, 6, 6, 8, 6),
    crewText: "1 (skilled)", passengers: "nenhum", cargo: "55 kg", cons: "1 dia", hyper: "nenhum",
    avail: "Militar", cost: "80.000 (45.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 4, dmg: "4d10", x: 2, auto: true }],
    notes: notes({ Descrição: "concorrente do TIE, sem hiperpropulsor nem escudos; acabou nas mãos de mercenários e insurgentes" })
  }),
  v("TIE Prototype", "Caças Estelares", {
    cl: 6, cat: "starfighter", type: "Caça estelar", size: "huge", ab: [34, 18, 14], armor: 4,
    def: [16, 22], hp: 60, dr: 10, sr: 10, dt: 32, speed: [16, 5], maxv: "1.200 km/h", bab: 2, crew: "skilled", sk: SK(8, 6, 6, 8, 6),
    crewText: "1 (skilled)", passengers: "nenhum", cargo: "65 kg", cons: "2 semanas", payload: "2 mísseis de concussão médios", hyper: "×2, navicomputador limitado (2 saltos)",
    avail: "Militar", cost: "130.000 (75.000 usado)", space: "3×3 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "pilot", atk: 4, dmg: "4d10", x: 2, auto: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "pilot", atk: 4, dmg: "8d10", x: 2, area: "Splash 2", ammo: 2 }
    ],
    notes: notes({ Descrição: "protótipo de Twin Ion Engine da Sienar, mais resistente que o TIE de série, com escudos e hiperpropulsor" })
  }),
  v("Sienar Guardian-class Light Cruiser", "Transportes", {
    cl: 11, cat: "transport", type: "Transporte espacial", size: "colossal", ab: [66, 16, 16], armor: 16,
    def: [19, 38], hp: 300, dr: 15, sr: 120, dt: 88, speed: [0, 3], bab: 2, crew: "skilled", sk: SK(-2, 5, 5, -2, 5),
    crewText: "8 (skilled)", passengers: "6 (prisioneiros)", cargo: "200 toneladas", cons: "3 meses", hyper: "×1 (reserva ×10), navicomputador",
    avail: "Militar", cost: "não está à venda (valor estimado 800.000)", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannon Battery", t: "laser", st: "gunner", atk: 11, dmg: "5d10", x: 2, special: "4 artilheiros" }],
    notes: notes({ Descrição: "cruzador leve de alfândega e patrulha de sistemas remotos (na prática, um transporte pesadamente armado)" })
  }),
  v("Rogue Shadow", "Transportes", {
    cl: 12, cat: "transport", type: "Transporte espacial (tratado como caça Gargantuesco)", size: "colossal", ab: [40, 22, 20], armor: 11,
    def: [17, 25], hp: 110, dr: 15, sr: 40, dt: 75, speed: [16, 6], maxv: "1.350 km/h", bab: 10, crew: "ace", sk: SK(8, 12, 12, 8, 12),
    crewText: "1 (ace)", passengers: "8", cargo: "15 toneladas", cons: "1 ano", hyper: "×0,5, navicomputador",
    avail: "Única", cost: "não está à venda", space: "12×12 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Laser Cannons", t: "laser", st: "pilot", atk: 15, dmg: "7d10", x: 2, auto: true }],
    notes: notes({ "Tamanho efetivo": "conta como caça Gargantuesco para armas de naves capitais, dogfights e manobras", "Camuflagem (cristal de stygium)": "camuflagem total quando ativada; Stealth +12 (+17 usando os sensores)", Sensores: "+5 de equipamento em Perception e Use Computer para operar os sensores", Descrição: "transporte pessoal do aprendiz secreto de Vader, baseado no Sith Infiltrator" })
  }),
  v("Sentinel-class Landing Shuttle", "Transportes", {
    cl: 10, cat: "starfighter", type: "Caça estelar (lançadeira de desembarque)", size: "gargantuan", ab: [42, 20, 14], armor: 11,
    def: [21, 26], hp: 120, dr: 10, sr: 50, dt: 49, speed: [16, 5], maxv: "1.000 km/h", bab: 2, crew: "skilled", sk: SK(5, 6, 6, 5, 6),
    crewText: "6 (skilled)", passengers: "54 (tropas)", cargo: "180 toneladas", cons: "1 mês", craft: "até 36 veículos terrestres leves", payload: "8 mísseis de concussão médios", hyper: "×1 (reserva ×10), navicomputador",
    avail: "Restrito", cost: "240.000", space: "4×4 ou 1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Laser Cannons", t: "laser", st: "gunner", atk: 4, dmg: "6d10", x: 2, auto: true, count: 4 },
      { n: "Ion Cannon", t: "ion", st: "copilot", atk: 4, dmg: "4d10", x: 2, ion: true },
      { n: "Medium Concussion Missiles", t: "missile", st: "gunner", atk: 4, dmg: "8d10", x: 2, area: "Splash 2", ammo: 8, count: 2 },
      { n: "Repeating Blaster Cannons", t: "blaster", st: "gunner", atk: -1, dmg: "3d8", x: 2, auto: true, count: 2, special: "só autofire" }
    ],
    notes: notes({ Descrição: "lançadeira blindada que leva tropas direto à batalha; presente em quase todo Star Destroyer" })
  }),
  v("Kuat Drive Yards Escort Carrier", "Naves Capitais", {
    cl: 14, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [58, 14, 16], armor: 11,
    def: [13, 34], hp: 660, dr: 15, sr: 30, dt: 134, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-3, 5, 5, -3, 5),
    crewText: "3.505 (skilled)", passengers: "800 (tropas)", cargo: "5.000 toneladas", cons: "1 ano", craft: "72 TIE fighters, 6 shuttles (Lambda, Sentinel ou Theta)", payload: "60 mísseis de concussão médios", hyper: "×1 (reserva ×8), navicomputador",
    avail: "Militar", cost: "não está à venda (valor estimado 3,5 milhões)", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Point-Defense Double Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 13, dmg: "3d10", x: 2, special: "5 artilheiros" },
      { n: "Medium Concussion Missiles", t: "missile", st: "gunner", atk: 5, dmg: "6d10", x: 2, area: "Splash 2", ammo: 60 }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: caças aliados que comecem o turno nos quadrados adjacentes recebem +1 quadrado de deslocamento até o início do próximo turno deles", Descrição: "porta-caças que lança e recolhe esquadrões de TIE rapidamente" })
  }),
  v("Gladiator-class Star Destroyer", "Naves Capitais", {
    cl: 16, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [92, 14, 16], armor: 13,
    def: [15, 51], hp: 1500, dr: 20, sr: 120, dt: 251, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "1.255 (skilled)", passengers: "1.200 (tropas)", cargo: "6.000 toneladas", cons: "2 anos", craft: "24 caças", payload: "300 mísseis de concussão médios", hyper: "×1 (reserva ×8), navicomputador",
    avail: "Militar", cost: "não está à venda (mercado negro: 34 milhões)", space: "2×2 (escala de nave)", cover: "Total",
    w: [
      { n: "Light Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "4d10", x: 5, count: 5, special: "5 artilheiros; −6 contra alvos menores que Colossal" },
      { n: "Point-Defense Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 13, dmg: "4d10", x: 2, auto: true, count: 2, special: "5 artilheiros" },
      { n: "Medium Concussion Missile Battery", t: "missile", st: "gunner", atk: 14, dmg: "8d10", x: 2, area: "Splash 2", count: 2, special: "5 artilheiros; −6 contra alvos menores que Colossal" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 8, dmg: "0", x: 1, grp: 63, count: 3, special: "2 artilheiros; −12 contra alvos menores que Colossal" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas que ataquem alvos num raio de 2 quadrados recebem +2 nos ataques", Variante: "o cruzador Broadside troca caças, lançadeiras e turbolasers por baterias de mísseis (1.200 mísseis), com Des 10 e +12 de armadura", Descrição: "patrulheiro de longo alcance da Doutrina Tarkin" })
  }),
  v("Damorian Tartan-class Patrol Cruiser", "Naves Capitais", {
    cl: 15, cat: "capital", type: "Nave capital", size: "colossalFrigate", ab: [61, 16, 18], armor: 11,
    def: [14, 35], hp: 870, dr: 15, sr: 90, dt: 135, speed: [0, 4], bab: 2, crew: "skilled", sk: SK(-2, 5, 5, -2, 5),
    crewText: "70 (skilled)", passengers: "50 (tropas)", cargo: "1.000 toneladas", cons: "1 ano", hyper: "×2 (reserva ×12), navicomputador",
    avail: "Militar", cost: "não está à venda (valor estimado 4,2 milhões)", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [{ n: "Point-Defense Laser Cannon Battery", t: "pointDefense", st: "gunner", atk: 14, dmg: "6d10", x: 2, count: 2, special: "5 artilheiros" }],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: a RD dos caças inimigos nos quadrados adjacentes cai à metade enquanto permanecerem ali", Energia: "recarregar escudos ou redirecionar energia custa uma ação rápida a menos", Descrição: "cruzador de patrulha antiacaças rápido e mortal" })
  }),
  v("Venator-class Star Destroyer (Dark Times)", "Naves Capitais", {
    cl: 19, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [95, 12, 16], armor: 13,
    def: [14, 52], hp: 1590, dr: 20, sr: 200, dt: 252, speed: [0, 2], bab: 2, crew: "skilled", sk: SK(-3, 6, 6, -3, 6),
    crewText: "7.400 (skilled)", passengers: "2.000 (tropas)", cargo: "20.000 toneladas", cons: "2 anos", craft: "192 V-wings ou V-19 Torrents, 192 Eta-2, 36 ARC-170, 40 airspeeders pesados, 24 walkers pesados, naves de apoio", payload: "64 torpedos de prótons", hyper: "×1 (reserva ×12), navicomputador",
    avail: "Militar", cost: "não está à venda (mercado negro: 50 milhões usado)", space: "2×2 (escala de nave)", cover: "Total (tripulação); +5 para naves no hangar aberto",
    w: [
      { n: "Heavy Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 11, dmg: "8d10", x: 5, count: 2, special: "4 artilheiros; −9 contra alvos menores que Colossal" },
      { n: "Medium Double Turbolasers", t: "turbolaser", st: "gunner", atk: 7, dmg: "6d10", x: 5, auto: true, count: 2, special: "−13 contra alvos menores que Colossal (autofire +2/−18)" },
      { n: "Point-Defense Laser Battery", t: "pointDefense", st: "gunner", atk: 13, dmg: "3d10", x: 2, count: 8, special: "5 artilheiros" },
      { n: "Point-Defense Flight Deck Laser Battery", t: "pointDefense", st: "gunner", atk: 15, dmg: "3d10", x: 2, count: 2, special: "6 artilheiros" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 9, dmg: "0", x: 1, grp: 74, count: 2, special: "3 artilheiros; −11 contra alvos menores que Colossal" },
      { n: "Proton Torpedoes", t: "missile", st: "gunner", atk: 5, dmg: "9d10", x: 2, area: "Splash 2", ammo: 64, count: 4, special: "−15 contra alvos menores que Colossal" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas Gargantuescas ou menores num raio de 2 quadrados recebem +2 nos ataques e um passo a mais nos dados de dano (4d10×2 vira 4d12×2)", Descrição: "porta-caças das Guerras Clônicas, retirado de serviço e vendido como sucata a Moffs e cartéis" })
  }),
  v("Victory I-class Star Destroyer", "Naves Capitais", {
    cl: 19, cat: "capital", type: "Nave capital", size: "colossalCruiser", ab: [90, 14, 18], armor: 12,
    def: [14, 45], hp: 1200, dr: 20, sr: 150, dt: 245, speed: [0, 1], bab: 2, crew: "skilled", sk: SK(-2, 6, 6, -2, 6),
    crewText: "5.200 (skilled)", passengers: "2.040 (tropas)", cargo: "8.100 toneladas", cons: "4 anos", craft: "48 caças, 20 veículos terrestres pesados, 20 médios, naves de apoio", payload: "80 mísseis de concussão pesados", hyper: "×1 (reserva ×15), navicomputador",
    avail: "Militar", cost: "não está à venda (mercado negro: 50 milhões usado)", space: "1 quadrado (escala de nave)", cover: "Total",
    w: [
      { n: "Heavy Double Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "4d10", x: 5, auto: true, count: 4, special: "5 artilheiros; −6 contra alvos menores que Colossal" },
      { n: "Light Quad Turbolaser Battery", t: "turbolaser", st: "gunner", atk: 14, dmg: "3d10", x: 5, auto: true, count: 2, special: "5 artilheiros; −6 contra alvos menores que Colossal" },
      { n: "Heavy Concussion Missile Battery", t: "missile", st: "gunner", atk: 14, dmg: "8d10", x: 5, area: "Splash 2", ammo: 80, count: 4, special: "5 artilheiros; −6 contra alvos menores que Colossal" },
      { n: "Tractor Beam Battery", t: "tractor", st: "gunner", atk: 14, dmg: "0", x: 1, grp: 67, count: 2, special: "3 artilheiros; −6 contra alvos menores que Colossal" }
    ],
    notes: notes({ "Tiro tático": "ação padrão, abre mão dos ataques: naves aliadas que ataquem alvos num raio de 2 quadrados recebem +2 nos ataques", Descrição: "Star Destroyer da Iniciativa Victor, espinha dorsal das primeiras décadas do Império" })
  })
];
