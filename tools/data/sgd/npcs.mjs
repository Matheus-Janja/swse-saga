// Scavenger's Guide to Droids — Cap. 4: Codex de Droides. Mesmo formato de tools/data/npcs.mjs.
const wp = (...g) => g.map(x => `weapon-proficiency-${x}`);
const ap = (...g) => g.map(x => `armor-proficiency-${x}`);
const sf = (...s) => s.map(x => `skill-focus:${x}`);
const st = (...s) => s.map(x => `skill-training:${x}`);
const notes = o => `<p><em>Scavenger's Guide to Droids</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
export const F = { droids: "Scavenger's Guide — Codex de Droides" };
const n = (name, o) => ({ name, folder: F.droids, droid: true, lenient: true, ...o });
const HERO = "pode ser jogado como herói droide";

export default [
  n("8D Smelter Droid", {
    cl: 0, speed: 4, cls: [["nonheroic", 1]], ab: [18, 10, null, 8, 10, 8], def: [15, 14, 10], hp: 4, dt: 14, bab: 0,
    sk: { initiative: -2, perception: 2, endurance: 8, knowledgePhysicalSciences: 4 },
    feats: ["mighty-swing", ...sf("endurance"), ...st("endurance"), ...wp("simple")],
    wpn: [{ nat: "claw", name: "Garra", atk: 2, dmg: "1d4+4" }],
    notes: notes({ Tipo: `droide de 5º grau (Roche); ${HERO}`, Sentidos: "darkvision", "Heat Resistant": "contra calor ou fogo extremos, metade do dano se o ataque acertar e nenhum se errar; não desce na trilha (Fortitude 24 para resistir a fogo e calor)", Sistemas: "processador básico, locomoção andando, 2 garras, pacote sensorial aprimorado, darkvision, bateria secundária, vocabulador, carapaça de duravlex (+4)", Disponibilidade: "Licenciado; 7.250 créditos" })
  }),
  n("A9G-Series Archive Droid", {
    cl: 0, cls: [["nonheroic", 2]], ab: [10, 11, null, 14, 10, 12], def: [10, 10, 10], hp: 7, dt: 10, bab: 1,
    sk: { initiative: 1, perception: 1, gatherInformation: 12, knowledgeBureaucracy: 13, useComputer: 13 },
    feats: ["distracting-droid", ...sf("gatherInformation", "knowledgeBureaucracy", "useComputer")],
    wpn: [["unarmed", 1, "1d3"]],
    notes: notes({ Tipo: `droide de 1º grau (Industrial Automaton); ${HERO}`, "Archive Processor": "rodada completa conectado a uma rede: rerrola Gather Information ou Knowledge para achar dados (fica com o segundo)", Sistemas: "processador heurístico, locomoção andando, 2 mãos, tradutor (CD 10), vocabulador", Posses: "code cylinder, dispositivo de armazenamento (20 unidades)", Disponibilidade: "Licenciado; 6.880 créditos" })
  }),
  n("AD-Series Weapons Maintenance Droid", {
    cl: 1, fp: 2, cls: [["soldier", 1]], ab: [10, 15, null, 16, 15, 10], def: [16, 13, 13], hp: 30, dt: 13, bab: 1,
    sk: { climb: 5, initiative: 7, knowledgeTactics: 8, mechanics: 13, perception: 7, useComputer: 8 },
    feats: [...ap("light", "medium"), ...sf("mechanics"), ...wp("pistols", "rifles", "simple")],
    tal: ["harms-way"],
    wpn: [["unarmed", 1, "1d3"]],
    notes: notes({ Tipo: "droide de 1º grau (Arakyd)", Deslocamento: "6 (andando), 6 (flutuando)", Sistemas: "processador heurístico, andando e flutuação, 2 ferramentas, kit de ferramentas, vocabulador, carapaça de quadanium (+3)", Disponibilidade: "Militar; 13.840 créditos" })
  }),
  n("Annihilator Droid", {
    cl: 12, size: "huge", speed: 2, sr: 20, fp: 4, cls: [["nonheroic", 12], ["soldier", 8]], ab: [25, 15, null, 8, 15, 7], def: [21, 27, 20], hp: 120, dt: 42, bab: 17,
    sk: { initiative: 17, perception: 17, stealth: -2 },
    feats: [...ap("light"), "burst-fire", "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "improved-damage-threshold", "point-blank-shot", "precise-shot", "rapid-shot", "running-attack", ...st("initiative"), "sniper", "triple-crit:rifles", "weapon-focus:rifles", ...wp("heavy", "rifles")],
    tal: ["armored-defense", "devastating-attack:rifles", "improved-armored-defense", "penetrating-attack:rifles"],
    wpn: [["unarmed", 24, "1d6+11"], [{ base: "blaster-rifle", name: "Laser Cannon" }, 20, "3d8+4"]],
    notes: notes({ Tipo: "droide de 4º grau (Colicoid, \"Scorpenek\"); não pode ser herói", Deslocamento: "2 (andando), 10 (rodas)", "Espaço/alcance": "3×3; alcance 1", "Ataques múltiplos": "2 canhões +18/+18 (3d8+4); Rapid Shot +18 (4d8+4) ou +16/+16; Burst Fire +15 (5d8+4) ou +13/+13", Escudo: "SR 20", Sistemas: "andando, rodas (exclusivo), receptor remoto, 2 ferramentas, gerador de escudo (SR 20), comlink interno, vocabulador, carapaça de bronzium (+5)", Disponibilidade: "Militar; 59.275 créditos" })
  }),
  n("BLX Labor Droid", {
    cl: 0, speed: 4, cls: [["nonheroic", 1]], ab: [15, 12, null, 6, 8, 16], def: [15, 12, 9], hp: 4, dt: 12, bab: 0,
    sk: { initiative: 1, perception: -1, endurance: 10, mechanics: 3, useComputer: 3 },
    feats: [...ap("light"), ...sf("endurance"), ...st("mechanics", "useComputer")],
    wpn: [["unarmed", 2, "1d3+2"]],
    notes: notes({ Tipo: `droide de 5º grau (Serv-O-Droid); ${HERO}`, "Jack of All Trades": "1/encontro, ação padrão: faz qualquer teste de perícia como se fosse treinado", Sistemas: "processador heurístico, andando, 2 mãos, armazenamento (10 kg), pés magnéticos, vocabulador, carapaça de durasteel (+4)", Disponibilidade: "Licenciado; 8.995 créditos" })
  }),
  n("Colicoid Infiltrator-Series Droid", {
    cl: 4, sr: 20, cls: [["nonheroic", 12]], ab: [18, 15, null, 11, 14, 12], def: [17, 14, 12], hp: 40, dt: 14, bab: 9,
    sk: { initiative: 8, perception: 15, stealth: 18 },
    feats: [...ap("light"), "dual-weapon-mastery-i", "rapid-shot", ...sf("stealth"), ...st("stealth"), ...wp("advanced-melee", "rifles", "simple")],
    wpn: [["vibroblade", 13, "2d6+4"], ["blaster-rifle", 11, "3d8"]],
    notes: notes({ Tipo: "droide de 4º grau (Colicoid)", Sentidos: "darkvision", Deslocamento: "6 (andando), 3 (escalando)", "Penetrate Hull": "com as vibrolâminas, sempre causa dano máximo ao cortar cascos e paredes", Escudo: "SR 20", Sistemas: "processador heurístico, andando, 4 ferramentas, darkvision, pacote sensorial aprimorado, acesso travado, vocabulador, gerador de escudo (SR 20), carapaça de bronzium (+5)", Posses: "2 vibrolâminas, 2 blaster rifles, garras de escalada, disfarce holográfico, dispensador de cabo, gerador de bolha de silêncio", Disponibilidade: "Militar; 33.720 créditos" })
  }),
  n("CZ-Series Secretary Droid", {
    cl: 0, cls: [["nonheroic", 1]], ab: [8, 10, null, 15, 12, 14], def: [10, 9, 11], hp: 3, dt: 9, bab: 0,
    sk: { initiative: 0, perception: 6, knowledgeBureaucracy: 12, knowledgeGalacticLore: 7, useComputer: 12 },
    feats: ["linguist", ...sf("knowledgeBureaucracy", "useComputer"), ...st("perception")],
    wpn: [["unarmed", -1, "1d3-1"]],
    notes: notes({ Tipo: `droide de 3º grau; ${HERO}`, "Comlink Jammer": "ação padrão: até o fim do próximo turno, comlinks a até 12 quadrados não funcionam", "Comlink Relay": "outros podem usar seu comlink criptografado de longo alcance", Idiomas: "Basic, Binary, Bocce, Huttese e mais 3", Sistemas: "andando, processador básico, 2 mãos, comlink interno (criptografado, longo alcance), acesso travado, vocabulador", Disponibilidade: "Licenciado; 8.280 créditos" })
  }),
  n("Droideka Mark II", {
    cl: 8, size: "large", speed: 2, sr: 20, fp: 3, cls: [["nonheroic", 12], ["soldier", 4]], ab: [17, 16, null, 8, 14, 7], def: [18, 19, 16], hp: 80, dt: 29, bab: 13,
    sk: { initiative: 16, perception: 15, stealth: 6 },
    feats: [...ap("light"), "burst-fire", "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "improved-damage-threshold", "rapid-shot", "running-attack", ...st("initiative"), "triple-crit:rifles", "weapon-focus:rifles", ...wp("heavy", "rifles")],
    tal: ["devastating-attack:rifles", "penetrating-attack:rifles"],
    wpn: [["unarmed", 16, "1d4+5"], [{ base: "blaster-rifle", name: "Laser Cannon" }, 17, "3d8+2"], [{ base: "ion-rifle", name: "Ion Cannon" }, 17, "3d8+2"]],
    notes: notes({ Tipo: "droide de 4º grau", Deslocamento: "2 (andando), 10 (rodas)", "Espaço/alcance": "2×2; alcance 1", "Ataques múltiplos": "canhões +15/+15 (3d8+2); Burst Fire +12 (5d8+2) ou +10/+10", Escudo: "SR 20", Sistemas: "andando, rodas (exclusivo), receptor remoto, 2 ferramentas, gerador de escudo (SR 20), comlink interno, carapaça de bronzium (+5)", Disponibilidade: "Militar; 31.435 créditos" })
  }),
  n("DT-16 \"Destructor\" Battle Droid", {
    cl: 2, size: "large", speed: 8, cls: [["nonheroic", 6]], ab: [22, 11, null, 10, 12, 5], def: [11, 16, 11], hp: 38, dt: 21, bab: 4,
    sk: { initiative: 3, perception: 11, stealth: -2 },
    feats: [...ap("light"), "point-blank-shot", "rapid-shot", "toughness", ...wp("heavy", "rifles")],
    wpn: [["unarmed", 10, "1d4+6"], ["blaster-rifle", 4, "3d8"], ["grenade-launcher", 4, "4d6"]],
    notes: notes({ Tipo: "droide de 4º grau (Droidworks); não pode ser herói", "Espaço/alcance": "2×2; alcance 1", Barrage: "abre mão das ações da rodada para lançar granadas em três oponentes adjacentes entre si: aliados a até 3 quadrados recebem +2 de circunstância na Reflexos contra eles até o próximo turno", Sistemas: "processador básico, andando, 2 mãos com blaster rifles ocultos, 1 ferramenta, pacote sensorial aprimorado, vocabulador, armazenamento (6 kg), carapaça de plasteel (+2)", Posses: "2 blaster rifles (ocultos nos braços), lança-granadas com 12 granadas de fragmentação", Disponibilidade: "Militar; 13.725 créditos" })
  }),
  n("Duelist Elite Training Droid", {
    cl: 1, fp: 2, cls: [["soldier", 1]], ab: [15, 14, null, 11, 10, 10], def: [17, 15, 11], hp: 30, dt: 15, bab: 1,
    sk: { initiative: 7, perception: 0, treatInjury: 5, useComputer: 5 },
    feats: [...ap("light", "medium"), "weapon-focus:simple", ...wp("pistols", "rifles", "simple")],
    tal: ["weapon-specialization:simple"],
    wpn: [[{ base: "mace", name: "Rapier" }, 4, "1d8+4"]],
    notes: notes({ Tipo: `droide de 4º grau (Trang Robotics); ${HERO}`, Sistemas: "processador heurístico, andando, 2 mãos, vocabulador, carapaça de durasteel (+4)", Posses: "rapieira", Disponibilidade: "Restrito; 11.330 créditos" })
  }),
  n("E522 Assassin Droid", {
    cl: 7, fp: 4, cls: [["scout", 1], ["soldier", 6]], ab: [18, 13, null, 11, 11, 12], def: [24, 23, 17], hp: 74, dt: 23, bab: 6,
    sk: { initiative: 9, knowledgeTactics: 8, perception: 10, stealth: 9, survival: 8 },
    feats: [...ap("light", "medium", "heavy"), "point-blank-shot", "precise-shot", "rapid-shot", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["acute-senses", "battle-analysis", "cover-fire", "devastating-attack:heavy"],
    wpn: [["unarmed", 10, "1d4+7"], ["heavy-repeating-blaster", 7, "3d10+3"], ["ion-rifle", 7, "3d8+3"], ["missile-launcher", 7, "6d6+3"], [{ base: "slugthrower-rifle", name: "Needler Gun (neurotoxina)" }, 7, "2d8+3"]],
    notes: notes({ Tipo: "droide de 4º grau", Sentidos: "darkvision; rerrola Perception", Deslocamento: "6 (esteiras)", "Hunter-Seeker Missiles": "o míssil trava num alvo e ataca 1/rodada até acertar ou errar 5 rodadas seguidas", "Neurotoxin Darts": "ao acertar um ser vivo, veneno paralisante (Livro Básico, p.255)", Sistemas: "esteiras, 2 garras, 2 ferramentas com aparato multifunção, darkvision, pacote sensorial aprimorado, acesso travado, vocabulador, placas de neutronium (+11)", Disponibilidade: "Militar; 28.535 créditos" })
  }),
  n("EI-9 Network Security Droid", {
    cl: 8, fp: 3, cls: [["nonheroic", 3], ["scoundrel", 3], ["scout", 4]], ab: [10, 13, null, 16, 13, 10], def: [22, 19, 20], hp: 36, dt: 19, bab: 7,
    sk: { initiative: 11, knowledgeTechnology: 13, perception: 13, useComputer: 18 },
    feats: [...ap("light", "medium"), "improved-defenses", "point-blank-shot", "precise-shot", "quick-draw", "rapid-shot", "running-attack", "sniper", ...sf("useComputer"), ...wp("pistols", "simple")],
    tal: ["acute-senses", "gimmick", "improved-initiative", "master-slicer"],
    wpn: [["unarmed", 7, "1d3+3"], ["blaster-rifle", 8, "3d8+3"]],
    notes: notes({ Tipo: "droide de 2º grau", Sentidos: "visão na penumbra; rerrola Initiative e Perception", "Defense in Depth": "ao vencer um teste de Use Computer de um oponente para comando de rotina, a atitude do computador piora um passo para ele", "Precision Locator": "vencendo um Use Computer resistido, descobre a localização do oponente", "Quick-Load Hidden Core": "o núcleo oculto tenta se restaurar 1d12 minutos após apagarem sua memória", Sistemas: "andando, processador heurístico, 2 mãos, 2 ferramentas, scomp link, pacote sensorial aprimorado, comlink interno, link sem fio, núcleo oculto, vocabulador, placas de duranium (+8)", Disponibilidade: "Restrito; 23.840 créditos" })
  }),
  n("EV-Series Supervisor Droid", {
    cl: 3, fp: 3, cls: [["nonheroic", 1], ["noble", 3]], ab: [8, 9, null, 13, 12, 12], def: [13, 12, 16], hp: 10, dt: 12, bab: 2,
    sk: { initiative: 1, perception: 3, knowledgeTechnology: 8, mechanics: 13, persuasion: 13, useComputer: 8 },
    feats: ["coordinated-attack", "droid-focus:5", "linguist", ...sf("mechanics", "persuasion"), ...st("knowledgeTechnology", "mechanics")],
    tal: ["demand-surrender", "presence"],
    wpn: [["unarmed", 1, "1d3"]],
    notes: notes({ Tipo: "droide de 3º grau", Bully: "ao intimidar, rerrola Persuasion e fica com o melhor; ação rápida para dar +2 ao intimidar do mestre", Sistemas: "processador heurístico, andando, 2 mãos, comlink interno, vocabulador", Disponibilidade: "Licenciado; 11.380 créditos" })
  }),
  n("FLTCH-Series Battle Droid", {
    cl: 5, size: "large", fp: 3, cls: [["nonheroic", 4], ["soldier", 4]], ab: [22, 15, null, 12, 11, 8], def: [19, 22, 14], hp: 32, dt: 22, bab: 7,
    sk: { initiative: 6, perception: 11, endurance: 9, persuasion: 8 },
    feats: [...ap("light", "medium"), "point-blank-shot", "running-attack", ...st("endurance"), "weapon-focus:rifles", ...wp("heavy", "rifles", "simple")],
    tal: ["indomitable", "devastating-attack:rifles"],
    wpn: [{ nat: "claw", name: "Garra", atk: 13, dmg: "1d6+8" }, ["heavy-blaster-rifle", 10, "3d10+2"], ["blaster-rifle", 10, "3d8+2"], ["missile-launcher", 9, "6d6+2"]],
    notes: notes({ Tipo: "droide de 4º grau; não pode ser herói", Sentidos: "visão na penumbra", Deslocamento: "6 (andando), 6 (voo com jetpack)", "Espaço/alcance": "2×2; alcance 1", Nightmare: "1/encontro, ação livre ao atacar corpo a corpo: Persuasion para intimidar o mesmo alvo", "Zero-Range Attack": "ao agarrar com a garra, ataca imediatamente com o blaster do braço", Sistemas: "andando, voo (jetpack), processador básico, 2 garras, vocabulador, pacote sensorial aprimorado, armadura de batalha de quadanium (+7)", Disponibilidade: "Militar; 31.375 créditos" })
  }),
  n("G2 Repair Droid", {
    cl: 0, size: "small", speed: 4, cls: [["nonheroic", 1]], ab: [10, 13, null, 15, 11, 8], def: [12, 10, 10], hp: 3, dt: 10, bab: 0,
    sk: { initiative: 1, perception: 7, knowledgeTechnology: 12, mechanics: 14, useComputer: 12 },
    feats: sf("knowledgeTechnology", "mechanics", "useComputer"),
    wpn: [["unarmed", 0, "1d2"]],
    notes: notes({ Tipo: `droide de 2º grau (SoroSuub); ${HERO}`, Sentidos: "darkvision", "Patch Job": "reparos temporários (jury-rig) como ação padrão em vez de rodada completa", Sistemas: "processador básico, andando, 2 mãos, darkvision, pacote de diagnóstico, pacote sensorial aprimorado, vocabulador", Posses: "kit de ferramentas", Disponibilidade: "Licenciado; 5.210 créditos" })
  }),
  n("GD16-Series Pilot Droid", {
    cl: 5, fp: 3, cls: [["scout", 3], ["soldier", 2]], ab: [10, 15, null, 14, 12, 9], def: [19, 17, 16], hp: 44, dt: 17, bab: 4,
    sk: { initiative: 9, knowledgeGalacticLore: 9, knowledgeTactics: 9, mechanics: 9, perception: 10, pilot: 14, stealth: 9, useComputer: 9 },
    feats: [...ap("light"), "point-blank-shot", ...sf("pilot"), ...st("useComputer"), "vehicular-combat", ...wp("heavy", "rifles", "simple")],
    tal: ["acute-senses", "devastating-attack:heavy", "improved-initiative"],
    wpn: [["unarmed", 4, "1d3+2"]],
    notes: notes({ Tipo: "droide de 5º grau", Sentidos: "visão na penumbra; rerrola Initiative e Perception", "Sensor Crown": "ação rápida: +2 de equipamento em Perception sobre um veículo, personagem ou objeto até o fim do encontro", "Simultaneous Operation": "2/encontro, ação rápida extra para operar sistemas do veículo", "Vehicle Link": "ação padrão: comando de rotina a sistemas automáticos da nave", Sistemas: "andando, processador heurístico, 4 mãos, acesso travado, pacote sensorial aprimorado, vocabulador", Disponibilidade: "Licenciado; 17.430 créditos" })
  }),
  n("GX1-Series Battle Droid", {
    cl: 6, fp: 3, cls: [["nonheroic", 6], ["soldier", 3], ["scout", 1]], ab: [16, 16, null, 10, 8, 13], def: [24, 20, 14], hp: 35, dt: 20, bab: 7,
    sk: { initiative: 18, perception: 9 },
    feats: [...ap("light", "medium"), "improved-defenses", "point-blank-shot", "rapid-shot", ...sf("initiative"), ...st("perception"), "weapon-focus:rifles", ...wp("rifles", "simple")],
    tal: ["evasion", "harms-way", "weapon-specialization:rifles"],
    armor: "battle-armor",
    wpn: [["unarmed", 10, "1d3+5"], ["heavy-blaster-rifle", 11, "3d10+4"]],
    notes: notes({ Tipo: "droide de 4º grau (Trang Robotics); não pode ser herói", "Repositioning Routines": "quando um aliado GX1 a até 12 quadrados cai a 0 PV, move metade do deslocamento (reação, sem provocar)", "Small Appendages": "1/turno, pega um item guardado como ação livre", Sistemas: "processador básico, andando, 4 mãos, 1 ferramenta, armazenamento (20 kg), bateria secundária, vocabulador", Posses: "heavy blaster rifle, armadura de batalha de durasteel, bastão de luz", Disponibilidade: "Restrito; 23.305 créditos" })
  }),
  n("GY-I Information Analysis Droid", {
    cl: 1, fp: 2, cls: [["noble", 1]], ab: [8, 12, null, 15, 15, 16], def: [13, 10, 15], hp: 18, dt: 10, bab: 0,
    sk: { deception: 8, gatherInformation: 13, initiative: 6, knowledgeGalacticLore: 7, knowledgeLifeSciences: 7, knowledgePhysicalSciences: 7, perception: 9, useComputer: 7 },
    feats: ["linguist", ...sf("gatherInformation"), ...wp("pistols", "simple")],
    tal: ["educated"],
    wpn: [["unarmed", -1, "1d3-1"]],
    notes: notes({ Tipo: `droide de 3º grau (Cybot Galactica); ${HERO}`, Sentidos: "visão na penumbra", Sistemas: "andando, processador heurístico, pacote sensorial aprimorado, 2 mãos, vocabulador", Disponibilidade: "Licenciado; 11.855 créditos" })
  }),
  n("H-1ME Battle Mechanic Droid", {
    cl: 1, size: "small", speed: 4, fp: 2, cls: [["scout", 1]], ab: [8, 16, null, 17, 11, 11], def: [17, 11, 11], hp: 24, dt: 11, bab: 0,
    sk: { initiative: 8, jump: 4, knowledgePhysicalSciences: 8, knowledgeTechnology: 8, mechanics: 13, perception: 0, pilot: 8, stealth: 13, survival: 5 },
    feats: [...sf("mechanics"), ...wp("pistols", "rifles", "simple")],
    tal: ["jury-rigger"],
    wpn: [["unarmed", -1, "1d2-1"]],
    notes: notes({ Tipo: "droide de 2º grau", "Preventive Maintenance": "a cada 8 horas de trabalho num veículo, ele recupera PV iguais ao ND do droide", Sistemas: "processador heurístico, andando, 8 ferramentas, pés magnéticos, pernas extras, construção dobrável, vocabulador, contramedidas de comunicação", Posses: "kit de ferramentas", Disponibilidade: "Restrito; 10.565 créditos" })
  }),
  n("HK-77 Assassin Droid", {
    cl: 4, fp: 3, cls: [["soldier", 4]], ab: [14, 16, null, 13, 12, 10], def: [21, 18, 15], hp: 55, dt: 18, bab: 4,
    sk: { initiative: 10, knowledgeTactics: 8, perception: 10, useComputer: 8 },
    feats: [...ap("light", "medium"), "dual-weapon-mastery-i", "point-blank-shot", "toughness", "weapon-focus:rifles", ...wp("pistols", "rifles", "simple")],
    tal: ["indomitable", "weapon-specialization:rifles"],
    wpn: [["unarmed", 6, "1d3+4"], ["blaster-rifle", 8, "3d8+4"]],
    notes: notes({ Tipo: "droide de 4º grau", Sentidos: "darkvision", "Ataques múltiplos": "2 rifles +3/+3 (3d8+4)", "Blaster Surge": "rodada completa: um disparo de 5d8+4 que gasta 5 tiros extras; a arma não dispara na rodada seguinte", Sistemas: "processador heurístico, andando, 2 ferramentas, darkvision, pacote sensorial aprimorado, acesso travado, vocabulador, armadura de batalha de quadanium (+7)", Posses: "2 blaster rifles", Disponibilidade: "Restrito; 19.865 créditos" })
  }),
  n("HKB-3 Hunter-Killer Droid", {
    cl: 6, fp: 3, cls: [["nonheroic", 3], ["scout", 3], ["soldier", 2]], ab: [14, 13, null, 12, 10, 8], def: [18, 19, 15], hp: 32, dt: 19, bab: 6,
    sk: { initiative: 5, perception: 11, stealth: 10, survival: 9 },
    feats: [...ap("light"), "coordinated-attack", "point-blank-shot", "rapid-shot", ...st("stealth"), "weapon-focus:rifles", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["acute-senses", "expert-tracker", "weapon-specialization:rifles"],
    wpn: [["unarmed", 8, "1d3+4"], ["blaster-rifle", 8, "3d8+4"]],
    notes: notes({ Tipo: "droide de 4º grau", Sentidos: "visão na penumbra; rerrola Perception", "Coordinated Tracking": "até quatro HKB-3 rastreando o mesmo alvo usam o melhor resultado de Survival e ajudam automaticamente", "Hunting Sensor": "ignora cobertura e camuflagem (até totais) em Perception, não nos ataques", "Simultaneous Fire": "ao ajudar o ataque de outro HKB-3, se ele acertar, +1 dado a cada 5 pontos acima da Reflexos", Sistemas: "andando, processador remoto (5 km), 2 mãos, vocabulador, pacote sensorial aprimorado, comlink interno (criptografado), acesso travado, placas de quadanium (+5)", Disponibilidade: "Militar; 19.130 créditos" })
  }),
  n("KM1 Mining Droid", {
    cl: 2, size: "large", sr: 10, cls: [["nonheroic", 6]], ab: [24, 10, null, 10, 8, 8], def: [17, 17, 9], hp: 31, dt: 22, bab: 4,
    sk: { initiative: 3, perception: 2, endurance: 8, stealth: -2 },
    feats: [...ap("light", "medium"), "slammer", "toughness", ...wp("pistols", "simple")],
    wpn: [["unarmed", 11, "1d4+7"], [{ base: "heavy-blaster-pistol", name: "Laser Cutter" }, 4, "3d8"]],
    notes: notes({ Tipo: "droide de 5º grau", Sentidos: "darkvision", "Espaço/alcance": "2×2; alcance 1", "Mining Shield Generator": "SR 10 e rerrola Endurance contra danos ambientais", Stability: "+5 contra ser derrubado", "Adaptable Programming": "reprogramá-lo tem CD −5", Slammer: "ataque +10, 1d6+18; se exceder o Limiar, condição persistente", Sistemas: "andando, processador básico, 2 ferramentas, gerador de escudo de mineração, darkvision, vocabulador, placas de duranium (+8)", Posses: "2 cortadores a laser (como heavy blaster pistols; alcance máx. 12)", Disponibilidade: "Licenciado; 21.880 créditos" })
  }),
  n("M38 Explorer Droid", {
    cl: 2, fp: 3, cls: [["scout", 2]], ab: [20, 10, null, 12, 14, 8], def: [14, 18, 14], hp: 28, dt: 23, bab: 1,
    sk: { endurance: 6, knowledgeGalacticLore: 7, knowledgeLifeSciences: 7, knowledgePhysicalSciences: 7, perception: 15, survival: 8 },
    feats: ["improved-damage-threshold", ...sf("perception"), ...wp("pistols", "rifles", "simple")],
    tal: ["acute-senses"],
    wpn: [["unarmed", 6, "1d3+6"]],
    notes: notes({ Tipo: "droide de 2º grau (Les Tech)", Sentidos: "darkvision; rerrola Perception", Deslocamento: "6 (esteiras)", "Advanced Sensors": "com Perception, detecta energia, radiação e atividade sísmica a 500 m e movimento a 12 quadrados", Sistemas: "processador heurístico, esteiras, 2 mãos, darkvision, holo-gravador, pacote sensorial aprimorado, armazenamento (5 kg), vocabulador", Disponibilidade: "Licenciado; 12.285 créditos" })
  }),
  n("MEV-Series Medical Evacuation Droid", {
    cl: 1, cls: [["nonheroic", 5]], ab: [12, 15, null, 14, 13, 10], def: [18, 11, 11], hp: 18, dt: 11, bab: 3,
    sk: { initiative: 9, perception: 5, knowledgeLifeSciences: 9, treatInjury: 13, useComputer: 9 },
    feats: [...ap("light"), "cybernetic-surgery", ...sf("treatInjury"), ...st("initiative"), "surgical-expertise"],
    wpn: [["unarmed", 4, "1d3+1"]],
    notes: notes({ Tipo: "droide de 1º grau", Sentidos: "visão na penumbra", Deslocamento: "6 (flutuando)", "Folding Repulsorlift Bed": "ação de movimento para abrir a maca (espaço 1×2); carrega um passageiro Médio ou menor", "Quick Load": "ação de movimento: põe um passageiro voluntário ou inconsciente na maca", Revivify: "Treat Injury CD 20 num alvo a 0 PV: ele fica inconsciente em vez de morto", Sistemas: "flutuação, processador heurístico, 4 mãos, pacote sensorial aprimorado, vocabulador, maca de repulsores, placas de durasteel (+6)", Posses: "6 medpacs, kit médico, kit de cirurgia", Disponibilidade: "Licenciado; 13.425 créditos" })
  }),
  n("MK-Series Maintenance Droid", {
    cl: 1, fp: 1, cls: [["scout", 1]], ab: [9, 14, null, 15, 10, 13], def: [14, 12, 11], hp: 24, dt: 12, bab: 0,
    sk: { climb: -6, endurance: 5, initiative: 7, knowledgeGalacticLore: 7, knowledgeTechnology: 7, mechanics: 12, perception: 5, pilot: 7, useComputer: 12 },
    feats: ["shake-it-off", ...sf("mechanics", "useComputer"), ...st("useComputer"), ...wp("simple")],
    tal: ["jury-rigger"],
    wpn: [{ nat: "claw", name: "Garra", atk: -1, dmg: "1d3-1" }],
    notes: notes({ Tipo: "droide de 2º grau (Kalibac)", Deslocamento: "6 (esteiras)", "Lateral Thinker": "ao gastar Ponto da Força em Mechanics ou Use Computer, o dado sobe um passo", "Versatile Appendages": "sempre conta como tendo um kit de ferramentas", Sistemas: "processador heurístico, esteiras, 2 garras, pacote de diagnóstico, armazenamento (20 kg), scomp link, vocabulador", Disponibilidade: "Licenciado; 11.080 créditos" })
  }),
  n("Model 88-Series Administration Droid", {
    cl: 5, fp: 3, cls: [["nonheroic", 6], ["noble", 3]], ab: [8, 8, null, 16, 14, 12], def: [13, 12, 17], hp: 26, dt: 12, bab: 6,
    sk: { initiative: 3, deception: 10, gatherInformation: 15, knowledgeBureaucracy: 17, knowledgeGalacticLore: 17, perception: 11, persuasion: 10, stealth: 8, useComputer: 12 },
    feats: ["linguist", ...sf("gatherInformation", "knowledgeBureaucracy", "knowledgeGalacticLore"), ...st("deception", "knowledgeGalacticLore", "persuasion", "useComputer"), ...wp("simple")],
    tal: ["educated", "inspire-haste"],
    wpn: [["unarmed", 5, "1d3"]],
    notes: notes({ Tipo: "droide de 1º grau (Uhr-Vah-Vo)", "Superior Analysis": "ao falhar em Knowledge, faz Perception e soma metade ao resultado anterior", "Timely Observation": "1/encontro, ação livre: Perception CD 20 revela uma fraqueza; +1 no próximo ataque ou teste resistido contra o alvo (ou concede a um aliado)", Sistemas: "andando, processador heurístico, 2 mãos, armazenamento (5 kg), vocabulador, comlink interno", Posses: "datapad", Disponibilidade: "Licenciado; 15.000 créditos" })
  }),
  n("PG-5 Gunnery Droid", {
    cl: 0, size: "large", speed: 4, cls: [["nonheroic", 2]], ab: [20, 8, null, 14, 11, 6], def: [8, 15, 10], hp: 15, dt: 20, bab: 1,
    sk: { initiative: 0, perception: 8, mechanics: 13, useComputer: 13 },
    feats: [...sf("mechanics", "useComputer"), "toughness", ...wp("heavy")],
    wpn: [["unarmed", 6, "1d6+5"], [{ base: "heavy-blaster-pistol", name: "Laser Welder" }, 0, "3d6"]],
    notes: notes({ Tipo: "droide de 2º grau (Industrial Automaton)", Deslocamento: "4 (rodas)", "Battery Fire": "controla todas as armas de uma bateria como se fosse uma, com −1 no ataque por arma", "Superior Weapon Repair": "no primeiro encontro após ele reparar/melhorar as armas de um veículo, cada arma recebe +1 no ataque", Sistemas: "processador heurístico, rodas, 1 garra, 3 ferramentas, pacote de diagnóstico, pacote sensorial aprimorado, scomp link", Posses: "soldador a laser", Disponibilidade: "Licenciado; 7.280 créditos" })
  }),
  n("PLNK-Series Power Droid", {
    cl: 1, speed: 4, cls: [["nonheroic", 3]], ab: [14, 8, null, 8, 9, 4], def: [18, 13, 10], hp: 11, dt: 13, bab: 2,
    sk: { initiative: 0, perception: 0, mechanics: 10 },
    feats: [...ap("light", "medium"), "improved-defenses", ...sf("mechanics")],
    wpn: [["unarmed", 4, "1d3+2"]],
    notes: notes({ Tipo: "droide de 5º grau", Sentidos: "darkvision", "Failsafe Withdrawal": "na primeira vez que for atacado no encontro, move seu deslocamento (reação) após o ataque", "Power Charge": "Mechanics CD 15 recarrega um pacote de blaster à razão de 1 tiro/rodada; ao recarregar escudos, restaura 7 pontos", Sistemas: "andando, processador básico, 2 ferramentas, darkvision, pacote de diagnóstico, placas de duranium (+8)", Posses: "tanque e bomba de tibanna líquido, gerador", Disponibilidade: "Militar; 6.990 créditos" })
  }),
  n("RO-D-Series Droid", {
    cl: 3, fp: 3, cls: [["nonheroic", 1], ["scoundrel", 3]], ab: [15, 12, null, 12, 13, 11], def: [17, 15, 15], hp: 13, dt: 15, bab: 2,
    sk: { initiative: 3, perception: 15, deception: 7, mechanics: 8, stealth: 8 },
    feats: ["martial-arts-i", "pin", "quick-draw", ...sf("perception"), ...st("deception", "mechanics"), ...wp("simple")],
    tal: ["disruptive", "walk-the-line"],
    wpn: [["unarmed", 4, "1d4+3"], ["club", 4, "1d6+3"], ["stun-baton", 4, "1d6+3"]],
    notes: notes({ Tipo: "droide de 5º grau", Sentidos: "visão na penumbra", "Instant Help": "1/encontro, reação: move seu deslocamento e ajuda automaticamente um aliado num ataque ou perícia em que é treinado", "Quick Fix": "1/encontro, jury-rig como ação padrão", Sistemas: "andando, processador básico, 2 mãos, 1 ferramenta, pacote sensorial aprimorado, comlink interno, armazenamento (10 kg), vocabulador", Posses: "monitor de áudio, rack de luzes holográficas, porrete, bastão de atordoamento oculto", Disponibilidade: "Licenciado; 14.800 créditos" })
  }),
  n("R8-Series Astromech Droid", {
    cl: 0, size: "small", speed: 6, cls: [["nonheroic", 2]], ab: [9, 13, null, 14, 10, 8], def: [12, 9, 10], hp: 5, dt: 9, bab: 1,
    sk: { initiative: 2, perception: 8, mechanics: 13, pilot: 12, stealth: 6, useComputer: 13 },
    feats: [...sf("mechanics", "pilot", "useComputer"), ...st("pilot")],
    wpn: [{ custom: "probe", atk: 0, dmg: "1d8-1" }],
    notes: notes({ Tipo: "droide de 2º grau (Industrial Automaton); herói com o chassi astromecânico", Deslocamento: "6 (rodas), 4 (andando)", "Navigation Charts": "calcula rotas pelo hiperespaço como se tivesse acesso à HoloNet, sem −5, e como ação padrão quando houver pressa", Sistemas: "processador heurístico, rodas e andando (exclusivo), 1 garra, 4 ferramentas, pacote de diagnóstico, pacote sensorial aprimorado, comlink interno, scomp link, amplificador e pacote de sensores, pés magnéticos", Posses: "memória de astrogação (6 unidades), serra circular, sonda de eletrochoque, extintor, holoprojetor, holo-gravador, soldador a laser", Disponibilidade: "Licenciado; 7.990 créditos" })
  }),
  n("RWW-Series Protocol Droid", {
    cl: 0, cls: [["nonheroic", 1]], ab: [7, 8, null, 12, 10, 14], def: [9, 8, 10], hp: 3, dt: 8, bab: 0,
    sk: { initiative: -1, perception: 0, deception: 7, knowledgeBureaucracy: 6, knowledgeGalacticLore: 11, persuasion: 12 },
    feats: [...sf("knowledgeGalacticLore", "persuasion"), ...st("deception", "knowledgeBureaucracy")],
    wpn: [["unarmed", -2, "1d3-2"]],
    notes: notes({ Tipo: `droide de 3º grau (Teagan Tech); ${HERO}`, Mimic: "ação rápida: rerrola Deception para imitar alguém (fica com o segundo)", Sistemas: "processador básico, andando, 2 mãos, tradutor (CD 10), vocabulador", Disponibilidade: "Licenciado; 5.505 créditos" })
  }),
  n("RX-Series Pilot Droid", {
    cl: 1, cls: [["nonheroic", 4]], ab: [10, 15, null, 13, 8, 12], def: [12, 10, 9], hp: 10, dt: 10, bab: 3,
    sk: { initiative: 4, perception: 1, knowledgeGalacticLore: 8, mechanics: 8, pilot: 14, useComputer: 8 },
    feats: [...sf("pilot"), ...st("knowledgeGalacticLore", "mechanics"), "vehicular-combat", ...wp("heavy")],
    wpn: [{ nat: "claw", name: "Garra", atk: 3, dmg: "1d4" }],
    notes: notes({ Tipo: "droide de 2º grau (Industrial Automaton)", Deslocamento: "6 (flutuando)", "Hot-Shot Pilot": "rerrola Pilot para evitar colisão (fica com o melhor); 1/encontro, reação: Pilot contra o ataque de um míssil ou torpedo para evitá-lo", "Engage the Enemy": "no início da batalha, usa Pilot no lugar de Initiative", Sistemas: "processador heurístico, flutuação, 3 garras, vocabulador", Disponibilidade: "Licenciado; 9.855 créditos" })
  }),
  n("S19 Astromech Droid", {
    cl: 0, size: "small", speed: 4, cls: [["nonheroic", 2]], ab: [11, 10, null, 16, 14, 11], def: [11, 10, 12], hp: 4, dt: 10, bab: 1,
    sk: { initiative: 1, perception: 8, knowledgeTechnology: 14, mechanics: 14, stealth: 6, useComputer: 14 },
    feats: [...sf("knowledgeTechnology", "mechanics", "useComputer"), "toughness"],
    wpn: [["unarmed", 1, "1d3"]],
    notes: notes({ Tipo: "droide de 2º grau (Les Tech); herói com o chassi astromecânico", Deslocamento: "4 (esteiras)", "Focused Repairs": "a cada ponto acima da CD, o reparo leva 2 minutos a menos (mín. 10 minutos)", Sistemas: "processador heurístico, esteiras, 1 garra, 6 ferramentas, memória de astrogação (5 unidades), pacote de diagnóstico, comlink interno", Posses: "holo-gravador, kit de ferramentas", Disponibilidade: "Licenciado; 8.625 créditos" })
  }),
  n("SD-9-Series Battle Droid", {
    cl: 16, size: "large", fp: 5, cls: [["soldier", 8], ["elite-trooper", 8]], ab: [29, 15, null, 10, 11, 8], def: [30, 39, 26], hp: 108, dt: 44, bab: 16,
    sk: { endurance: 13, initiative: 15, knowledgeTactics: 13, perception: 15 },
    feats: [...ap("light", "medium", "heavy"), "burst-fire", "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "martial-arts-i", "point-blank-shot", "running-attack", ...st("knowledgeTactics"), "weapon-focus:heavy", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["armored-defense", "devastating-attack:heavy", "greater-devastating-attack:heavy", "greater-penetrating-attack:heavy", "greater-weapon-focus:heavy", "multiattack-proficiency-heavy", "penetrating-attack:heavy", "weapon-specialization:heavy"],
    wpn: [["unarmed", 25, "1d6+17"], ["heavy-repeating-blaster", 20, "3d10+10"], [{ base: "blaster-cannon", name: "Plasma Burst Cannon" }, 20, "3d12+10"]],
    notes: notes({ Tipo: "droide de 4º grau; não pode ser herói", Sentidos: "visão na penumbra", "Espaço/alcance": "2×2; alcance 1", Ataques: "heavy repeating blaster +15 (3d10+10) em fogo automático, ou +10 (5d10+10) com Burst Fire, junto com o plasma burst cannon +20 (3d12+10, splash 1)", "Plasma Burst Cannon": "se exceder o Limiar, +1 dado de dano pelo calor", Escudo: "SR 15 só contra íons", RD: "4 (Elite Trooper)", "Defense Mode": "1/encontro, ação rápida: designa algo a defender; reação: ataca um inimigo que o atacar", "Swift Assault Mode": "1/encontro, um ataque com −10 como ação rápida quando também faz duas ações de movimento", Sistemas: "andando, processador básico, 2 suportes de ferramenta, comlink interno, gerador de escudo iônico (SR 15), acesso travado, pacote sensorial aprimorado, vocabulador, armadura de duranium refletora (+10; +11 contra blasters e lasers)", Disponibilidade: "Militar; 51.405 créditos" })
  }),
  n("SD-X-Series Stealth Battle Droid", {
    cl: 9, fp: 4, cls: [["soldier", 3], ["scout", 6]], ab: [16, 14, null, 12, 14, 10], def: [28, 24, 21], hp: 68, dt: 24, bab: 7,
    sk: { initiative: 11, jump: 12, mechanics: 10, perception: 13, stealth: 11 },
    feats: ["aiming-accuracy", ...ap("light", "medium", "heavy"), "martial-arts-i", "martial-arts-ii", "point-blank-shot", "precise-shot", ...st("stealth"), ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["armored-defense", "harms-way", "hidden-movement", "improved-stealth", "total-concealment"],
    wpn: [["unarmed", 10, "1d6+7"], [{ base: "vibrodagger", name: "Concealed Vibrodaggers" }, 10, "4d4+7"], ["blaster-rifle", 9, "3d8+4"]],
    notes: notes({ Tipo: "droide de 4º grau", Sentidos: "darkvision; rerrola Perception e Stealth", "Stealth Coating": "+5 em Stealth na escuridão ou penumbra; contra sensores, Stealth contra o Use Computer do oponente", "Threat Scan": "rodada completa, Perception CD 20: detecta seres vivos, explosivos e ameaças a 30 m", Sistemas: "andando, processador heurístico, 2 mãos com vibroadagas ocultas, comlink interno (criptografado), acesso travado, pacote sensorial aprimorado, darkvision, vocabulador, armadura de laminanium (+12)", Posses: "blaster rifle", Disponibilidade: "Militar; 25.705 créditos" })
  }),
  n("LEP-Series Service Droid", {
    cl: 0, cls: [["nonheroic", 1]], ab: [7, 11, null, 12, 10, 14], def: [10, 8, 10], hp: 3, dt: 8, bab: 0,
    sk: { initiative: 0, perception: 5, persuasion: 12, treatInjury: 10, useComputer: 6 },
    feats: [...sf("perception", "persuasion", "treatInjury"), ...st("treatInjury")],
    wpn: [["unarmed", -2, "1d3-2"]],
    notes: notes({ Tipo: `droide de 3º grau (Coachelle Automata); ${HERO}`, Empathic: "rerrola Persuasion para mudar atitude, fica com o melhor", Sistemas: "processador básico, andando, 2 mãos, 2 sondas, armazenamento (30 kg), vocabulador", Disponibilidade: "Licenciado; 6.260 créditos" })
  }),
  n("Shadow Droid", {
    cl: 9, size: "huge", speed: 16, fp: 2, ds: 10, cls: [["soldier", 6], ["nonheroic", 9]], ab: [30, 18, null, 12, 10, 10], def: [23, 28, 16], hp: 120, dt: 38, dr: 20, bab: 12,
    sk: { initiative: 21, perception: 17, pilot: 21, stealth: 1, useComputer: 18 },
    feats: [...ap("light", "medium", "heavy"), "damage-conversion", ...sf("initiative", "perception", "pilot", "useComputer"), "turn-and-burn", "vehicular-combat", "weapon-focus:heavy", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["indomitable", "harms-way", "weapon-specialization:heavy"],
    wpn: [[{ base: "blaster-cannon", name: "Laser Cannon (×2)" }, 17, "4d10+5"], [{ base: "blaster-cannon", name: "Proton Torpedoes (×2)" }, 17, "9d10+5"]],
    notes: notes({ Tipo: "droide de 4º grau (caça com cérebro orgânico); não pode ser herói", Deslocamento: "voo 16; voo 4 (escala de nave)", "Espaço/alcance": "3×3; alcance 1", Ataques: "armas de escala de nave (dano ×2): canhão laser +17 (4d10+5), canhão iônico +17 (3d10+5 íon), canhão blaster de repetição +12 (3d10+5, área 2×2), mísseis de concussão +17 (8d10+5), torpedos de prótons +17 (9d10+5)", "Protect and Serve": "gasta um Ponto da Força do dono para ajudar um personagem adjacente", "Ramming Speed": "Pilot −10 contra a Reflexos de outra nave: ambos sofrem 4d6+10 (metade se falhar)", Sistemas: "processador básico, voo, armadura de batalha de duranium (+10)", Disponibilidade: "Militar; 123.000 créditos" })
  }),
  n("T4 Turret Droid", {
    cl: 3, size: "large", sr: 20, cls: [["nonheroic", 9]], ab: [13, 16, null, 10, 12, 6], def: [14, 11, 11], hp: 32, dt: 11, bab: 6,
    sk: { initiative: 17, perception: 5 },
    feats: [...ap("light"), "dual-weapon-mastery-i", "point-blank-shot", "rapid-shot", ...sf("initiative"), "weapon-focus:heavy", ...wp("heavy")],
    wpn: [["unarmed", 7, "1d4+1"], ["blaster-cannon", 10, "3d12"]],
    notes: notes({ Tipo: "droide de 4º grau (Colicoid)", Sentidos: "darkvision", "Espaço/alcance": "2×2; alcance 1", Ataques: "Rapid Shot +8 (4d12); 2 canhões +5/+5 (3d12) ou +3/+3 (4d12); lança-granadas modificado +9 (8d6, explosão de 4 quadrados, 4 detonadores térmicos)", "Cutting Laser": "ação padrão: 5 quadrados contíguos em alcance à queima-roupa de rifle, +9 contra a Reflexos, 3d10 de energia/fogo (metade se errar), ignora RD (área)", Stability: "+5 contra ser derrubado", Escudo: "SR 20", Sistemas: "receptor remoto, andando, 3 ferramentas, darkvision, circuitos de fogo sincronizado, carapaça de plasteel (+2), gerador de escudo (SR 20)", Disponibilidade: "Militar; 26.940 créditos" })
  }),
  n("TC-SC Infiltration Droid", {
    cl: 1, fp: 2, cls: [["scoundrel", 1]], ab: [11, 16, null, 10, 10, 13], def: [16, 11, 12], hp: 18, dt: 11, bab: 0,
    sk: { initiative: 3, perception: 5, deception: 11, gatherInformation: 6, stealth: 8 },
    feats: ["point-blank-shot", ...sf("deception"), ...wp("pistols", "simple")],
    tal: ["dastardly-strike"],
    wpn: [["knife", 0, "1d4"], ["blaster-pistol", 3, "3d6"]],
    notes: notes({ Tipo: `droide de 4º grau; ${HERO}`, Sistemas: "processador heurístico, andando, 2 mãos com armas ocultas, disfarce de imagem holográfica, vocabulador", Posses: "blaster pistol oculta, faca oculta", Disponibilidade: "Restrito; 20.380 créditos" })
  }),
  n("TT-8L Gatekeeper Droid", {
    cl: 0, size: "large", speed: 0, cls: [["nonheroic", 1]], ab: [10, 4, null, 13, 14, 16], def: [6, 10, 12], hp: 13, dt: 15, bab: 0,
    sk: { initiative: -3, perception: 14, knowledgeBureaucracy: 6, persuasion: 13 },
    feats: ["linguist", ...sf("perception", "persuasion"), ...st("knowledgeBureaucracy")],
    wpn: [["unarmed", 0, "1d4"]],
    notes: notes({ Tipo: "droide de 3º grau (Serv-O-Droid); não pode ser herói", Sentidos: "darkvision", Stubborn: "contra Persuasion, soma o bônus de Carisma à Vontade (também à Vontade do dono)", Sistemas: "receptor remoto, 1 ferramenta telescópica, pacote sensorial aprimorado, darkvision, vocabulador", Disponibilidade: "Licenciado; 5.970 créditos" })
  }),
  n("V2-Series Commando Droid", {
    cl: 1, fp: 2, cls: [["scout", 1]], ab: [11, 14, null, 13, 12, 8], def: [15, 12, 12], hp: 24, dt: 12, bab: 0,
    sk: { climb: 5, initiative: 7, knowledgeTactics: 6, mechanics: 6, perception: 6, stealth: 12 },
    feats: [...sf("stealth"), ...wp("pistols", "rifles", "simple")],
    tal: ["improved-stealth"],
    wpn: [["unarmed", 0, "1d3"], ["blaster-rifle", 2, "3d8"]],
    notes: notes({ Tipo: `droide de 4º grau; ${HERO}`, Sistemas: "processador heurístico, andando, 2 mãos, vocabulador", Posses: "blaster rifle", Disponibilidade: "Militar; 10.755 créditos" })
  }),
  n("V6-Series Pilot Droid", {
    cl: 0, size: "small", speed: 6, cls: [["nonheroic", 2]], ab: [10, 15, null, 16, 13, 9], def: [13, 10, 11], hp: 8, dt: 10, bab: 1,
    sk: { initiative: 2, perception: 6, mechanics: 8, pilot: 12, stealth: 7, useComputer: 8 },
    feats: [...sf("pilot"), ...wp("simple", "heavy")],
    wpn: [["unarmed", 1, "1d2"]],
    notes: notes({ Tipo: `droide de 2º grau; ${HERO}`, Deslocamento: "6 (rodas)", Sistemas: "processador heurístico, rodas, 2 ferramentas, vocabulador", Disponibilidade: "Licenciado; 7.950 créditos" })
  }),
  n("X-1 Viper Droid", {
    cl: 8, size: "huge", fp: 1, cls: [["nonheroic", 12], ["soldier", 4]], ab: [32, 12, null, 12, 12, 8], def: [18, 27, 15], hp: 110, dt: 42, bab: 13,
    sk: { initiative: 14, jump: 24, perception: 14, stealth: -1, survival: 14 },
    feats: [...ap("light", "medium", "heavy"), "burst-fire", "distracting-droid", "double-attack:heavy", "improved-damage-threshold", "ion-shielding", "point-blank-shot", "weapon-focus:heavy", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["devastating-attack:heavy", "penetrating-attack:heavy"],
    wpn: [["unarmed", 24, "1d6+13"], [{ base: "blaster-cannon", name: "Twin Blaster Cannon (×2)" }, 15, "4d10+2"], ["grenade-launcher", 14, "4d6+2"]],
    notes: notes({ Tipo: "droide de 4º grau (Balmorran Arms); não pode ser herói", "Espaço/alcance": "3×3; alcance 1", Ataques: "canhão duplo de escala veicular: 4d10×2+2; com fogo automático e Burst Fire +10 (6d10×2+2); com Double Attack, lança-granadas +9 e canhão +10", "Molecular Shielding": "quando um ataque de energia à distância erra, o ataque é redirecionado: resultado −10 contra a Reflexos do atacante", Sistemas: "processador básico, andando, 2 garras, 2 ferramentas, placas de duranium (+8)", Disponibilidade: "Militar; 43.000 créditos" })
  }),
  n("XLT-014 Labor Droid", {
    cl: 0, cls: [["nonheroic", 1]], ab: [14, 10, null, 8, 14, 10], def: [14, 12, 12], hp: 4, dt: 12, bab: 0,
    sk: { initiative: 0, perception: 12, useComputer: 9 },
    feats: [...ap("light"), ...sf("perception", "useComputer"), ...st("useComputer")],
    wpn: [["unarmed", 2, "1d4+2"]],
    notes: notes({ Tipo: `droide de 5º grau (Publictechnic); ${HERO}`, Deslocamento: "6 (andando), 6 (flutuando, limitado)", "Quick Scan": "Perception CD 20: detecta seres vivos e energia a 6 quadrados, reduzindo à metade as penalidades de cobertura e camuflagem; busca dados na rede na metade do tempo", Sistemas: "receptor remoto, andando e flutuação limitada, 2 garras, carapaça de durasteel (+4), vocabulador", Posses: "gravador de vídeo", Disponibilidade: "Licenciado; 9.600 créditos" })
  }),
  n("YVH-Series Battle Droid", {
    cl: 9, fp: 3, cls: [["soldier", 5], ["scout", 3], ["elite-trooper", 1]], ab: [18, 14, null, 12, 13, 12], def: [27, 27, 20], hp: 67, dt: 27, bab: 8,
    sk: { initiative: 11, jump: 13, mechanics: 10, perception: 12 },
    feats: [...ap("light", "medium", "heavy"), "martial-arts-i", "mechanical-martial-arts", "point-blank-shot", "precise-shot", ...wp("advanced-melee", "heavy", "pistols", "rifles", "simple")],
    tal: ["acute-senses", "armored-defense", "battle-analysis", "devastating-attack:heavy", "improved-initiative", "tough-as-nails"],
    wpn: [["unarmed", 12, "1d4+8"], ["vibroblade", 12, "2d6+8"], ["blaster-cannon", 10, "3d12+4"]],
    notes: notes({ Tipo: "droide de 4º grau (Cybot Galactica); caçador de Yuuzhan Vong", Sentidos: "darkvision; rerrola Initiative e Perception", "Variable-Power Weapon": "potência máxima: +1 dado (4d12+4) gastando 2 tiros", "Repulsor Leap": "ação livre: CDs de Jump à metade", "Yuuzhan Vong Scan": "rodada completa: Perception +22 contra Stealth/Deception de Yuuzhan Vong a 12 quadrados", "Yuuzhan Vong Taunt": "ação livre: Persuasion +15 para intimidar Yuuzhan Vong a 6 quadrados, forçando-os a atacá-lo", Sistemas: "andando, processador heurístico, 2 mãos, comlink interno (criptografado), acesso travado, pacote sensorial aprimorado, pacote sensor YV, darkvision, vocabulador, tradutor (CD 10), armadura de laminanium (+12), impulsor de repulsores limitado", Posses: "blaster cannon, vibrolâmina", Disponibilidade: "Militar; 28.830 créditos" })
  })
];
