// Galaxy at War — droides (Cap. 2), feras de guerra (Cap. 2) e a sentinela automática (Cap. 3).
// Mesmo formato de tools/data/npcs.mjs; o build ajusta os campos "Outros" para bater com o bloco do livro.
const wp = (...g) => g.map(x => `weapon-proficiency-${x}`);
const ap = (...g) => g.map(x => `armor-proficiency-${x}`);
const sf = (...s) => s.map(x => `skill-focus:${x}`);
const st = (...s) => s.map(x => `skill-training:${x}`);
const notes = o => `<p><em>Galaxy at War</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");

export const F = {
  droids: "Galaxy at War — Droides",
  beasts: "Galaxy at War — Feras de Guerra",
  defenses: "Galaxy at War — Defesas"
};
const n = (name, folder, o) => ({ name, folder, ...o });

export default [
  /* ---------------- DROIDES ---------------- */
  n("A-Series Medical Droid", F.droids, {
    cl: 1, droid: true, size: "small", speed: 4, fp: 2, cls: [["noble", 1]], ab: [8, 10, null, 14, 15, 12], def: [13, 10, 15], hp: 18, dt: 10, bab: 0,
    sk: { initiative: 5, perception: 7, knowledgeGalacticLore: 7, knowledgeLifeSciences: 12, knowledgeTechnology: 7, persuasion: 6, treatInjury: 12, useComputer: 7 },
    feats: ["cybernetic-surgery", ...sf("knowledgeLifeSciences", "treatInjury"), "surgical-expertise"],
    wpn: [["unarmed", -1, "1d2-1"]],
    notes: notes({ Tipo: "droide de 1º grau (pode ser herói droide)", Imunidades: "traços de droide", Talento: "Medical Droid — primeiros socorros com medpac curam +2 PV por ponto acima da CD (em vez de +1)", Sistemas: "locomoção andando, processador heurístico, 2 mãos, 3 apêndices de ferramenta, pacote de diagnóstico, vocabulador", Posses: "medical kit, 5 medpacs, surgery kit", Disponibilidade: "Licenciado; 9.740 créditos" })
  }),
  n("KDY-4 Tech Droid", F.droids, {
    cl: 1, droid: true, speed: 6, cls: [["nonheroic", 2]], ab: [16, 10, null, 15, 10, 10], def: [10, 13, 10], hp: 4, dt: 13, bab: 1,
    sk: { initiative: 1, perception: 1, knowledgeTechnology: 13, mechanics: 13, useComputer: 13 },
    feats: sf("knowledgeTechnology", "mechanics", "useComputer"),
    wpn: [["unarmed", 4, "1d3+3"]],
    notes: notes({ Tipo: "droide de 2º grau (pode ser herói droide)", Imunidades: "traços de droide", Alcance: "2 quadrados", Estabilidade: "+5 contra ser derrubado", Sistemas: "locomoção andando (perna extra), processador heurístico, 2 mãos, 2 apêndices de ferramenta (telescópicos), pés magnéticos, serra circular, soldador de arco, extintor, holofote (alcance 10), compartimento (2 kg)", Disponibilidade: "Licenciado; 4.400 créditos" })
  }),
  n("Chiba DR-10 Protocol Droid", F.droids, {
    cl: 1, droid: true, size: "small", speed: 6, cls: [["nonheroic", 3]], ab: [8, 16, null, 14, 14, 15], def: [14, 9, 12], hp: 7, dt: 9, bab: 2,
    sk: { initiative: 4, perception: 3, deception: 7, knowledgeBureaucracy: 7, knowledgeGalacticLore: 7, persuasion: 12 },
    feats: ["linguist", ...sf("persuasion"), ...st("deception"), ...wp("pistols")],
    wpn: [["unarmed", 1, "1d3-1"], ["blaster-pistol", 5, "3d6"]],
    notes: notes({ Tipo: "droide de 3º grau (pode ser herói droide)", Imunidades: "traços de droide", Deslocamento: "6 (flutuando)", Sistemas: "flutuação, processador básico, tradutor (CD 5), apêndice sonda, comlink interno, vocabulador", Posses: "blaster pistol (oculta)", Disponibilidade: "Restrito; 9.500 créditos" })
  }),
  n("B2-AA Air Assault Super Battle Droid", F.droids, {
    cl: 4, droid: true, speed: 6, fp: 3, cls: [["nonheroic", 6], ["soldier", 2]], ab: [13, 15, null, 10, 10, 7], def: [21, 15, 12], hp: 26, dt: 15, bab: 6,
    sk: { initiative: 6, perception: 4, pilot: 11 },
    feats: [...ap("light", "medium"), "charging-fire", "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "rapid-shot", ...wp("pistols", "rifles")],
    tal: ["penetrating-attack:rifles"],
    wpn: [["unarmed", 7, "1d3+2"], [{ base: "blaster-rifle", name: "Wrist Blasters" }, 8, "3d8+1"]],
    notes: notes({ Tipo: "droide de 4º grau", Imunidades: "traços de droide", Deslocamento: "6 (andando), 6 (voo, jet pack)", "Opções de ataque": "autofire (wrist blasters), Charging Fire, Dual Weapon Mastery II, Penetrating Attack (rifles), Rapid Shot (+6, 4d8+1)", Sistemas: "andando, receptor remoto, processador reserva, circuitos de fogo sincronizado, 2 mãos, comlink integrado, autodestruição (5d6), armadura de batalha de durasteel, vocabulador", "Jet pack integrado": "100 cargas (combustível volátil)", Disponibilidade: "Militar; 16.225 créditos" })
  }),
  n("Eradicator-Series Battle Droid", F.droids, {
    cl: 2, droid: true, size: "large", speed: 8, sr: 5, cls: [["nonheroic", 8]], ab: [18, 15, null, 9, 10, 6], def: [16, 14, 10], hp: 29, dt: 19, bab: 6,
    sk: { initiative: 6, perception: 9 },
    feats: [...ap("light"), "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "weapon-focus:rifles", ...wp("rifles")],
    wpn: [["unarmed", 10, "1d6+4"], ["light-repeating-blaster", 9, "3d8"], ["ion-rifle", 9, "3d8"]],
    notes: notes({ Tipo: "droide de 4º grau", Imunidades: "traços de droide", "Espaço/alcance": "2×2; alcance 1", Escudo: "SR 5", "Opções de ataque": "Dual Weapon Mastery II (2 blasters de repetição leves e 2 rifles iônicos)", Sistemas: "andando, processador básico, 2 garras (retráteis), comlink interno, gerador de escudo (SR 5), carapaça de bronzium (+5)", Disponibilidade: "Militar; 21.500 créditos" })
  }),
  n("Purge Trooper", F.droids, {
    cl: 8, droid: true, size: "large", speed: 8, fp: 5, cls: [["nonheroic", 6], ["soldier", 6]], ab: [26, 14, null, 10, 13, 8], def: [20, 26, 17], hp: 78, dt: 31, bab: 10,
    sk: { initiative: 13, perception: 9 },
    feats: [...ap("light", "medium"), "bantha-rush", "battering-attack", "staggering-attack", "trip", "triple-crit:advancedMelee", "weapon-focus:advancedMelee", "weapon-focus:heavy", ...wp("advanced-melee", "heavy", "simple")],
    tal: ["indomitable", "melee-smash", "weapon-specialization:advancedMelee"],
    wpn: [[{ base: "vibro-ax", name: "Purge Blade" }, 19, "2d10+14"], ["missile-launcher", 13, "6d6+3"]],
    dr: 10,
    notes: notes({ Tipo: "droide de 4º grau", Sentidos: "visão na penumbra", Imunidades: "traços de droide; +5 nas defesas contra efeitos que forçam movimento", RD: "10 (cortosis: sabres de luz não ignoram)", "Opções de ataque": "Bantha Rush, Staggering Attack (+17 / +14)", "Ações especiais": "Indomitable", Sistemas: "andando, processador básico, 2 mãos, 2 ferramentas, sistemas endurecidos ×3, pacote sensorial aprimorado, botas magnéticas, placas de duranium com cortosis", Disponibilidade: "Militar; 31.900 créditos" })
  }),
  n("Sniper Droideka", F.droids, {
    cl: 7, droid: true, size: "large", speed: 2, sr: 20, fp: 5, cls: [["nonheroic", 9], ["scout", 4]], ab: [15, 16, null, 8, 16, 7], def: [19, 17, 17], hp: 41, dt: 22, bab: 9,
    sk: { initiative: 9, perception: 21, stealth: 14 },
    feats: [...ap("light"), "careful-shot", "deadeye", "far-shot", "point-blank-shot", "precise-shot", "rapid-shot", ...sf("perception"), ...st("stealth"), "sniper", ...wp("rifles")],
    tal: ["acute-senses", "keen-shot"],
    wpn: [["unarmed", 11, "1d4+4"], ["heavy-blaster-rifle", 12, "3d8+2"]],
    notes: notes({ Tipo: "droide de 4º grau", Sentidos: "visão na penumbra; rerrola Perception", Imunidades: "traços de droide", Deslocamento: "2 (andando), 10 (rodas)", Escudo: "SR 20", "Opções de ataque": "Careful Shot, Deadeye, Far Shot, Keen Shot, Point Blank Shot, Precise Shot, Rapid Shot, Sniper (mirando +13, 4d8+2)", Sistemas: "andando, rodas (exclusivo), receptor remoto, 1 ferramenta, gerador de escudo (SR 20), pacote sensorial aprimorado, comlink integrado, carapaça de bronzium (+5)", Disponibilidade: "Militar; 30.565 créditos" })
  }),
  n("Tactical Droid (T-Series)", F.droids, {
    cl: 1, droid: true, speed: 6, fp: 2, cls: [["soldier", 1]], ab: [10, 12, null, 14, 14, 12], def: [18, 13, 13], hp: 30, dt: 13, bab: 1,
    sk: { initiative: 6, perception: 7, knowledgeTactics: 7, pilot: 6, useComputer: 7 },
    feats: [...ap("light", "medium"), "vehicular-combat", ...wp("pistols", "rifles", "simple")],
    tal: ["battle-analysis"],
    wpn: [["unarmed", 1, "1d3"], ["blaster-carbine", 2, "3d8"]],
    notes: notes({ Tipo: "droide de 4º grau (pode ser herói droide)", Imunidades: "traços de droide", "Ações especiais": "Battle Analysis, Vehicular Combat", Sistemas: "andando, processador heurístico, 2 mãos, comlink interno, circuitos de fogo sincronizado, placas de durasteel, vocabulador", Posses: "blaster carbine, electrobinoculars", Disponibilidade: "Militar; 14.005 créditos" })
  }),
  n("Vigilant 2X Picket Droid", F.droids, {
    cl: 3, droid: true, speed: 6, cls: [["nonheroic", 9]], ab: [13, 14, null, 10, 16, 8], def: [20, 11, 13], hp: 22, dt: 11, bab: 6,
    sk: { initiative: 11, perception: 19 },
    feats: [...ap("light", "medium"), "burst-fire", "point-blank-shot", ...sf("perception"), ...st("initiative"), ...wp("heavy")],
    wpn: [["unarmed", 7, "1d4+1"], ["heavy-repeating-blaster", 8, "3d10"], ["grenade-launcher", 8, "4d6"]],
    notes: notes({ Tipo: "droide de 4º grau", Sentidos: "darkvision", Imunidades: "traços de droide", Deslocamento: "6 (esteiras)", "Opções de ataque": "autofire (heavy repeating blaster), Burst Fire (+3, 5d10), Point Blank Shot", Sistemas: "esteiras, darkvision, pacote sensorial aprimorado, 1 garra, comlink interno, acesso travado, autodestruição (6d6), gerador de energia, vocabulador, placas de duranium", Disponibilidade: "Militar; 32.500 créditos" })
  }),
  n("CLL-M2 Ordnance Lifter Droid", F.droids, {
    cl: 1, droid: true, size: "large", speed: 8, cls: [["nonheroic", 3]], ab: [30, 11, null, 6, 10, 8], def: [18, 20, 10], hp: 17, dt: 25, bab: 2,
    sk: { initiative: 1, perception: 6, climb: 16, mechanics: 9 },
    feats: [...ap("light", "medium"), ...sf("mechanics"), ...st("mechanics")],
    wpn: [["unarmed", 12, "1d4+10"]],
    notes: notes({ Tipo: "droide de 5º grau", Imunidades: "traços de droide", "Espaço/alcance": "2×2; alcance 1", Sistemas: "andando, processador básico, 2 ferramentas, compartimento (5 kg), pés magnéticos, bateria secundária, armadura de batalha de durasteel", Disponibilidade: "Restrito; 15.000 créditos" })
  }),
  n("MR-200 Series Minesweeper Droid", F.droids, {
    cl: 1, droid: true, size: "large", speed: 6, cls: [["nonheroic", 3]], ab: [20, 10, null, 10, 14, 10], def: [14, 15, 12], hp: 36, dt: 25, bab: 2,
    sk: { initiative: 1, perception: 14, mechanics: 5 },
    feats: [...ap("light"), ...sf("perception"), ...st("mechanics")],
    wpn: [{ nat: "slam", name: "Chain Roller", atk: 5, dmg: "3d6+5" }],
    notes: notes({ Tipo: "droide de 5º grau", Sentidos: "visão na penumbra; +19 em Perception para localizar explosivos", Imunidades: "traços de droide", Deslocamento: "6 (flutuando)", "Espaço/alcance": "2×2; alcance 1", Sistemas: "flutuação, sensor de demolição, sistemas endurecidos ×2, pacote sensorial aprimorado, comlink integrado, acesso travado, receptor remoto, autodestruição (4d6), 2 ferramentas, placas de quadanium", Disponibilidade: "Militar; 15.000 créditos" })
  }),

  /* ---------------- FERAS DE GUERRA ---------------- */
  n("Carrier Butterfly", F.beasts, {
    cl: 0, size: "diminutive", speed: 8, cls: [["beast", 1]], ab: [2, 18, 6, 2, 13, 16], def: [19, 8, 11], hp: 2, dt: 8, bab: 0,
    sk: { initiative: 4, perception: 1, deception: 8, stealth: 24 },
    feats: st("deception"),
    wpn: [],
    notes: notes({ Sentidos: "visão na penumbra", Deslocamento: "8 (voo)", Mimetismo: "reproduz com perfeição longas sequências de sons (sem teste de Deception, mas só exatamente como ouviu)" })
  }),
  n("Bolotaur", F.beasts, {
    cl: 5, size: "large", speed: 8, cls: [["beast", 6]], ab: [22, 14, 22, 2, 12, 10], def: [17, 16, 11], hp: 63, dt: 21, bab: 4,
    sk: { initiative: 5, perception: 4, climb: 19, endurance: 14 },
    feats: ["bantha-rush", ...sf("climb"), ...st("endurance")],
    wpn: [{ nat: "claw", name: "Garra", atk: 10, dmg: "1d6+9" }, { nat: "bite", name: "Mordida", atk: 10, dmg: "1d8+9" }],
    notes: notes({ Sentidos: "visão na penumbra", "Espaço/alcance": "2×2; alcance 1", Ataques: "2 garras e mordida", "Climbing Mount": "ao cair, pode fazer Climb para se segurar sem o +20 na CD; com cavaleiro treinado em Ride, sempre segura o cavaleiro também" })
  }),
  n("Gelagrub", F.beasts, {
    cl: 3, size: "large", speed: 6, cls: [["beast", 4]], ab: [22, 8, 24, 2, 14, 12], def: [13, 18, 13], hp: 50, dt: 23, bab: 3,
    sk: { initiative: 1, perception: 4, endurance: 14 },
    feats: ["improved-defenses", "toughness"],
    wpn: [{ nat: "slam", name: "Pancada", atk: 9, dmg: "1d6+8" }],
    notes: notes({ "Espaço/alcance": "2×2; alcance 1", "Hazard Resistance": "+5 em todas as defesas contra perigos naturais; o cavaleiro treinado em Ride também recebe esse bônus" })
  }),
  n("Gutkurr", F.beasts, {
    cl: 8, size: "huge", speed: 8, cls: [["beast", 9]], ab: [32, 10, 28, 2, 16, 10], def: [17, 19, 13], hp: 122, dt: 29, bab: 6,
    sk: { initiative: 4, perception: 17, survival: 12 },
    feats: ["crush", "pin", ...sf("perception"), ...st("survival")],
    wpn: [{ nat: "claw", name: "Garra", atk: 17, dmg: "1d8+15" }, { nat: "bite", name: "Mordida", atk: 17, dmg: "2d6+15" }],
    notes: notes({ Sentidos: "darkvision", "Espaço/alcance": "3×3; alcance 1", "Opções de ataque": "Crush, Pin", "Savage Maul": "ao imobilizar com agarrão, causa o dano da mordida (em vez da garra) com Crush", "Uncanny Tracker": "sem penalidade em Survival ao rastrear em deslocamento total" })
  }),
  n("Mastif Phalone", F.beasts, {
    cl: 6, size: "large", speed: 8, cls: [["beast", 7]], ab: [21, 14, 20, 2, 15, 10], def: [18, 15, 12], hp: 67, dt: 20, bab: 5,
    sk: { initiative: 5, perception: 5, stealth: 10 },
    feats: ["powerful-charge", ...sf("stealth"), "trip"],
    wpn: [{ nat: "claw", name: "Garra", atk: 10, dmg: "1d6+8" }, { nat: "bite", name: "Bico", atk: 10, dmg: "1d8+8" }],
    notes: notes({ Sentidos: "visão na penumbra", "Espaço/alcance": "2×2; alcance 1", "Opções de ataque": "Powerful Charge, Trip", "Savage Frenzy": "com menos da metade dos PV, +2 em todos os ataques e +1 dado de dano", "Savannah Hunter": "com camuflagem contra um alvo que não o percebeu, pode escolher 20 em Stealth sem gastar mais tempo" })
  }),
  n("Nek (Battle Dog)", F.beasts, {
    cl: 5, speed: 8, cls: [["beast", 6]], ab: [22, 13, 24, 2, 10, 8], def: [15, 17, 10], hp: 69, dt: 17, bab: 4,
    sk: { initiative: 4, perception: 3, endurance: 15 },
    feats: [...ap("light"), "improved-defenses", "power-attack", "powerful-charge"],
    wpn: [{ nat: "claw", name: "Garra", atk: 6, dmg: "1d4+10", pa: 4 }, { nat: "bite", name: "Mordida", atk: 6, dmg: "1d6+10", pa: 4 }],
    notes: notes({ Sentidos: "visão na penumbra", Observação: "ataques incluem 4 pontos de Power Attack; com Powerful Charge +8 (2d4+13 / 2d6+13)", Posses: "armadura cibernética (armadura +4), comlink", "Feat bônus condicional": "com implantes e armadura cibernética recebe Armor Proficiency (light)" })
  }),
  n("Roggwart", F.beasts, {
    cl: 12, size: "huge", speed: 8, cls: [["beast", 13]], ab: [30, 14, 28, 1, 16, 10], def: [23, 20, 14], hp: 176, dt: 30, bab: 9,
    sk: { initiative: 13, perception: 9 },
    feats: ["bantha-rush", "battering-attack", "improved-defenses", "power-attack", "trip"],
    wpn: [{ nat: "gore", name: "Chifrada", atk: 15, dmg: "2d6+20", pa: 4 }, { nat: "bite", name: "Mordida", atk: 15, dmg: "2d6+20", pa: 4 }, { nat: "claw", name: "Garra", atk: 15, dmg: "1d8+20", pa: 4 }, { nat: "slam", name: "Cauda", atk: 15, dmg: "1d8+20", pa: 4 }],
    notes: notes({ Sentidos: "visão na penumbra", "Espaço/alcance": "3×3; alcance 1", Ataques: "chifrada, mordida, 2 garras e cauda (incluem 4 pontos de Power Attack)", "Enemy Slinger": "1/rodada, ao acertar e empurrar com Bantha Rush, move o alvo 3 quadrados em qualquer direção", "Pack Resistant": "1/rodada, reação quando é atacado: ataque de cauda contra uma criatura ao alcance" })
  }),
  n("Watch-Beast", F.beasts, {
    cl: 9, size: "huge", speed: 8, cls: [["beast", 10]], ab: [30, 10, 25, 2, 18, 6], def: [14, 17, 14], hp: 115, dt: 27, bab: 7,
    sk: { initiative: 2, perception: 16, survival: 11 },
    feats: ["cleave", "power-attack", "powerful-charge", ...sf("perception"), ...st("survival")],
    wpn: [{ nat: "slam", name: "Pancada", atk: 12, dmg: "1d8+15", pa: 5 }, { nat: "claw", name: "Garra", atk: 12, dmg: "1d8+15", pa: 5 }],
    notes: notes({ Sentidos: "visão na penumbra, faro", "Espaço/alcance": "3×3; alcance 1", Observação: "ataques incluem 5 pontos de Power Attack; com Powerful Charge +14 (1d8+20). O livro lista 15 PV (erro de impressão; usamos 115)", "Defensive Awareness": "não pode ser flanqueado", Faro: "ignora camuflagem e cobertura para notar inimigos a até 10 quadrados; sem penalidade de visibilidade ao rastrear" })
  }),

  /* ---------------- DEFESAS ---------------- */
  n("Automated Sentry Gun", F.defenses, {
    cl: 2, droid: true, size: "small", speed: 0, cls: [["nonheroic", 3], ["soldier", 1]], ab: [4, 12, null, 6, 14, 8], def: [15, 10, 13], hp: 13, dt: 10, bab: 3,
    sk: { initiative: 8, perception: 16 },
    feats: [...ap("light"), "point-blank-shot", ...sf("perception"), ...st("initiative"), "weapon-focus:rifles", ...wp("rifles")],
    tal: ["weapon-specialization:rifles"],
    wpn: [["light-repeating-blaster", 3, "3d8+2"]],
    notes: notes({ Tipo: "droide de 4º grau", Sentidos: "darkvision", Imunidades: "traços de droide", "Opções de ataque": "fogo automático apoiado (alojamento da arma), Point Blank Shot", Sistemas: "processador básico, darkvision, pacote sensorial aprimorado, acesso travado, carapaça de plasteel, alojamento de arma (conta como apoiada)", Posses: "light repeating blaster, pacote de energia pesado (150 tiros)", Disponibilidade: "Militar; 2.500 créditos (1.000 usado)" })
  })
];
