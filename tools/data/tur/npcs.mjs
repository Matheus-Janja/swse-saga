// The Unknown Regions — droides de exploração, montarias e companheiros animais (Cap. 2). Mesmo formato de tools/data/npcs.mjs.
const wp = (...g) => g.map(x => `weapon-proficiency-${x}`);
const sf = (...s) => s.map(x => `skill-focus:${x}`);
const st = (...s) => s.map(x => `skill-training:${x}`);
const notes = o => `<p><em>The Unknown Regions</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
export const F = { droids: "Unknown Regions — Droides de Exploração", mounts: "Unknown Regions — Montarias e Companheiros", threats: "Unknown Regions — Ameaças" };
const d = (name, o) => ({ name, folder: F.droids, droid: true, lenient: true, ...o });
const b = (name, o) => ({ name, folder: F.mounts, lenient: true, ...o });
const t = (name, o) => ({ name, folder: F.threats, lenient: true, ...o });
const HERO = "pode ser jogado como herói droide";
const TRAMPLE = "ação padrão: ataque corpo a corpo contra a Reflexos de um alvo adjacente pelo menos um tamanho menor; se acertar, dano normal; se errar, metade";
const SPRINT = "ao correr (run), move até 5 vezes o deslocamento";

export default [
  /* ---------------- Droides ---------------- */
  d("AS23 Aerial Survey Droid", {
    cl: 0, size: "small", speed: 9, cls: [["nonheroic", 1]], ab: [8, 18, null, 12, 14, 7], def: [15, 9, 12], hp: 3, dt: 9, bab: 0,
    sk: { initiative: 4, perception: 14, pilot: 14, survival: 12 },
    feats: [...sf("perception", "pilot", "survival"), ...st("pilot")],
    wpn: [],
    notes: notes({ Tipo: "droide de 3º grau (Arakyd); não pode ser herói", Deslocamento: "9 (voo)", Sentidos: "darkvision, visão na penumbra", Spotter: "em voo, localiza inimigos e repassa ao mestre: ataques contra esses alvos ignoram camuflagem e reduzem a cobertura em um passo", Sistemas: "processador básico, voo, automapa, darkvision, pacote sensorial aprimorado, comlink interno", Disponibilidade: "Licenciado; 23.500 créditos" })
  }),
  d("DSH-3 Probe Droid", {
    cl: 1, size: "small", speed: 6, cls: [["nonheroic", 3]], ab: [6, 18, null, 12, 14, 9], def: [15, 8, 12], hp: 8, dt: 8, bab: 2,
    sk: { initiative: 5, perception: 15, stealth: 20, survival: 13 },
    feats: ["dodge", ...sf("perception", "stealth", "survival"), ...st("stealth")],
    wpn: [],
    notes: notes({ Tipo: "droide de 4º grau (Arakyd); não pode ser herói", Deslocamento: "6 (flutuando)", Sentidos: "darkvision, visão na penumbra", "Easily Hidden": "pode escolher 10 em Stealth mesmo distraído ou ameaçado", Sistemas: "processador heurístico, flutuação, darkvision, pacote sensorial aprimorado, comlink interno, acesso trancado, bateria secundária", Posses: "gravador de áudio e de vídeo", Disponibilidade: "Licenciado; 13.000 créditos" })
  }),
  d("F1 Exploration Droid", {
    cl: 3, size: "small", speed: 4, fp: 3, cls: [["scout", 3]], ab: [13, 13, null, 8, 14, 10], def: [17, 15, 15], hp: 33, dt: 15, bab: 2,
    sk: { initiative: 7, jump: 7, perception: 15, stealth: 17, survival: 8 },
    feats: ["running-attack", ...sf("perception", "stealth"), ...wp("pistols", "rifles", "simple")],
    tal: ["acute-senses", "improved-stealth"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 3, dmg: "1d3+2" }],
    notes: notes({ Tipo: `droide de 5º grau; ${HERO}`, Deslocamento: "4 (andando)", Sentidos: "darkvision, visão na penumbra; rerrola Perception (fica com o melhor)", "Motion Sensors": "rerrola Perception ficando com o melhor; o mestre também rerrola Perception para achar o mesmo alvo", Sistemas: "processador básico, andando (2 pernas extras), 1 garra (mandíbula), darkvision, pacote sensorial aprimorado, comlink interno", Disponibilidade: "Licenciado; 12.500 créditos" })
  }),
  d("MULE Droid", {
    cl: 0, speed: 4, cls: [["nonheroic", 2]], ab: [20, 10, null, 7, 12, 6], def: [10, 15, 11], hp: 9, dt: 15, bab: 1,
    sk: { initiative: 1, mechanics: 9, perception: 12 },
    feats: [...sf("mechanics", "perception"), ...st("mechanics"), "toughness"],
    wpn: [{ nat: "claw", name: "Garra", atk: 6, dmg: "1d4+5" }],
    notes: notes({ Tipo: `droide de 5º grau (mechanical universal labor eliminating); ${HERO}`, Deslocamento: "4 (flutuando, até 1 m de altura)", "Self-Diagnostic": "Mechanics (+11) para saber os próprios reparos; dá +4 ao Mechanics do mestre para consertá-lo", Carga: "10 kg internos e 40 kg externos", Sistemas: "processador básico, flutuação, 1 garra, pacote de diagnóstico, armazenamento interno (10 kg)", Disponibilidade: "Licenciado; 9.000 créditos" })
  }),
  d("Wanderer Scout Surveyor Droid", {
    cl: 1, fp: 2, cls: [["scout", 1]], ab: [14, 16, null, 8, 13, 3], def: [16, 14, 12], hp: 26, dt: 14, bab: 0,
    sk: { climb: 7, jump: 7, perception: 6, survival: 6, treatInjury: 6 },
    feats: ["surgical-expertise", ...wp("pistols", "rifles", "simple")],
    tal: ["expert-tracker"],
    wpn: [{ nat: "claw", name: "Garra", atk: 2, dmg: "1d4" }, [{ base: "blaster-pistol", name: "Stun Blaster" }, 3, "3d6"]],
    notes: notes({ Tipo: "droide de 5º grau (SoroSuub); não pode ser herói", Deslocamento: "6 (andando, pernas extras)", "Visão 360°": "mantém a Destreza na Reflexos mesmo surpreso ou atacado por alguém escondido; não pode ser flanqueado", "Stun Blaster": "pistola blaster no modo atordoar (3d6)", Sistemas: "processador básico, andando (pernas extras), 4 ferramentas, 1 garra", Posses: "stun blaster, sensor pack, kit cirúrgico", Disponibilidade: "Licenciado; 9.400 créditos" })
  }),
  d("WED-20 Treadwell", {
    cl: 0, size: "small", speed: 4, cls: [["nonheroic", 2]], ab: [8, 14, null, 16, 15, 10], def: [13, 9, 12], hp: 5, dt: 9, bab: 1,
    sk: { initiative: 3, knowledgeLifeSciences: 14, knowledgePhysicalSciences: 14, perception: 13, survival: 8 },
    feats: ["melee-defense", ...sf("knowledgeLifeSciences", "knowledgePhysicalSciences", "perception")],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 0, dmg: "1d6-1" }],
    notes: notes({ Tipo: `droide de 1º grau (Cybot Galactica); ${HERO}`, Deslocamento: "4 (esteiras)", "Scientific Focus": "+2 de equipamento em Knowledge (life sciences) e (physical sciences) (incluído); dá +2 ao mestre num desses testes", Sistemas: "processador básico, esteiras, 2 garras, 5 ferramentas, pacote de diagnóstico, comlink interno, vocabulador", Posses: "kit de pesquisa de campo, microlab, gravador de vídeo", Disponibilidade: "Licenciado; 8.300 créditos" })
  }),

  /* ---------------- Montarias ---------------- */
  b("Aiwha", {
    cl: 4, size: "gargantuan", speed: 12, cls: [["beast", 5]], ab: [25, 10, 20, 2, 11, 8], def: [6, 16, 11], hp: 47, dt: 35, bab: 3,
    sk: { initiative: 2, perception: 2, survival: 7, swim: 14 },
    feats: ["improved-defenses", ...st("swim")],
    wpn: [{ nat: "slam", name: "Pancada", atk: 10, dmg: "2d6+9" }],
    notes: notes({ Tipo: "fera aquática", Deslocamento: "12 (voo), 12 (natação)", "Espaço/alcance": "4×4; alcance 2", Descrição: "Criatura voadora e nadadora de Kamino e Naboo, montaria de patrulha e bombardeio." })
  }),
  b("Bantha", {
    cl: 2, size: "huge", speed: 4, cls: [["beast", 3]], ab: [28, 10, 26, 2, 11, 4], def: [8, 18, 10], hp: 37, dt: 28, bab: 2,
    sk: { initiative: 1, endurance: 14, perception: 1, survival: 6 },
    feats: ["bantha-rush", ...st("endurance")],
    wpn: [{ nat: "gore", name: "Chifrada", atk: 11, dmg: "2d6+10" }, { nat: "slam", name: "Pisotear (trample)", atk: 11, dmg: "1d8+10" }],
    notes: notes({ "Espaço/alcance": "3×3; alcance 1", Trample: TRAMPLE, Variantes: "banthas de Tatooine (traço desértico), de Nelvaan (ártico) ou escaladores de Kashyyyk (troque Trample por escalada especializada)" })
  }),
  b("Bergruutfa", {
    cl: 5, size: "huge", speed: 10, dr: 5, cls: [["beast", 6]], ab: [26, 6, 27, 2, 12, 5], def: [4, 18, 11], hp: 81, dt: 33, bab: 4,
    sk: { initiative: 1, perception: 9 },
    feats: ["improved-damage-threshold", "power-attack", "toughness"],
    wpn: [{ nat: "slam", name: "Pancada (Power Attack 3)", atk: 9, dmg: "1d8+14" }],
    notes: notes({ "Espaço/alcance": "3×3; alcance 1", "Head Butt": "após acertar, teste de agarrar imediato: o alvo é empurrado 1 quadrado a cada 5 pontos de diferença (sem ataque de oportunidade); +5 no agarrar se investiu", RD: "5" })
  }),
  b("Eopie", {
    cl: 1, size: "large", speed: 4, cls: [["beast", 2]], ab: [17, 9, 18, 1, 8, 4], def: [8, 14, 9], hp: 17, dt: 19, bab: 1,
    sk: { initiative: 0, endurance: 10, perception: 0, survival: 5 },
    feats: [...st("survival")],
    wpn: [{ nat: "bite", name: "Mordida", atk: 4, dmg: "1d8+4" }],
    notes: notes({ Tipo: "fera do deserto", Imperturbable: "+5 de espécie na Vontade contra efeitos que afetam a mente; o cavaleiro não precisa de Ride para controlá-la em combate" })
  }),
  b("Fenwolf", {
    cl: 3, size: "large", speed: 8, cls: [["beast", 4]], ab: [18, 14, 17, 2, 13, 6], def: [11, 13, 11], hp: 30, dt: 18, bab: 3,
    sk: { initiative: 4, perception: 8, survival: 8 },
    feats: [...st("survival"), "trip"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 7, dmg: "1d8+6" }],
    notes: notes({ Faro: "a até 10 quadrados ignora camuflagem e cobertura em Perception; rastreia sem penalidade de visibilidade" })
  }),
  b("Kaadu", {
    cl: 1, size: "large", speed: 12, cls: [["beast", 2]], ab: [16, 14, 16, 2, 9, 10], def: [11, 13, 9], hp: 15, dt: 18, bab: 1,
    sk: { initiative: 3, perception: 5, swim: 9 },
    feats: [...st("perception")],
    wpn: [{ nat: "slam", name: "Coice", atk: 4, dmg: "1d6+4" }],
    notes: notes({ Tipo: "fera aquática", Deslocamento: "12; natação 8", Sentidos: "visão na penumbra", Sprint: SPRINT })
  }),
  b("Kalak", {
    cl: 1, size: "large", speed: 12, cls: [["beast", 2]], ab: [16, 13, 18, 2, 8, 6], def: [10, 14, 9], hp: 17, dt: 19, bab: 1,
    sk: { initiative: 2, perception: 5, survival: 5 },
    feats: [...st("survival")],
    wpn: [{ nat: "bite", name: "Mordida", atk: 4, dmg: "1d8+4" }]
  }),
  b("Maru", {
    cl: 2, size: "large", speed: 10, cls: [["beast", 2]], ab: [15, 16, 14, 2, 9, 5], def: [12, 12, 9], hp: 13, dt: 17, bab: 1,
    sk: { initiative: 9, perception: 5 },
    feats: [...st("initiative")],
    wpn: [{ nat: "slam", name: "Cauda", atk: 3, dmg: "1d6+3" }],
    notes: notes({ Sprint: SPRINT })
  }),
  b("Orray", {
    cl: 3, size: "large", speed: 8, cls: [["beast", 4]], ab: [17, 12, 15, 2, 8, 6], def: [10, 12, 9], hp: 19, dt: 17, bab: 3,
    sk: { initiative: 8, perception: 1, survival: 6 },
    feats: ["power-attack", ...st("initiative")],
    wpn: [{ nat: "bite", name: "Mordida (Power Attack 2)", atk: 4, dmg: "1d8+7" }],
    notes: notes({ Tipo: "fera do deserto (Geonosis)" })
  }),
  b("Rakazzak Beast", {
    cl: 2, size: "huge", speed: 10, cls: [["beast", 3]], ab: [14, 20, 15, 1, 14, 4], def: [13, 12, 12], hp: 19, dt: 22, bab: 2,
    sk: { initiative: 11, perception: 3 },
    feats: ["pin", "weapon-finesse"],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 7, dmg: "1d8+3" }],
    notes: notes({ "Espaço/alcance": "3×3; alcance 2", Descrição: "Aracnídeo de Endor montado pelos Yuzzum." })
  }),
  b("Rockhopper", {
    cl: 2, size: "large", speed: 8, cls: [["beast", 3]], ab: [13, 15, 14, 2, 10, 7], def: [11, 12, 10], hp: 19, dt: 17, bab: 2,
    sk: { initiative: 3, endurance: 8, perception: 6 },
    feats: ["running-attack", ...st("endurance")],
    wpn: [{ nat: "bite", name: "Mordida", atk: 3, dmg: "1d8+2" }, { nat: "slam", name: "Cauda", atk: 3, dmg: "1d6+2" }],
    notes: notes({ Sprint: SPRINT, Ataques: "mordida e cauda" })
  }),
  b("Ukian Torbull", {
    cl: 1, size: "huge", speed: 12, cls: [["beast", 1]], ab: [19, 9, 22, 1, 8, 3], def: [11, 17, 10], hp: 10, dt: 27, bab: 0,
    sk: { initiative: -1, perception: -1, survival: 4 },
    feats: ["improved-defenses"],
    wpn: [{ nat: "gore", name: "Chifrada", atk: 4, dmg: "2d6+4" }, { nat: "slam", name: "Cauda", atk: 4, dmg: "1d8+4" }],
    notes: notes({ "Espaço/alcance": "3×3; alcance 2", Tame: "+5 de circunstância no Ride do cavaleiro", "Thick Hide": "+3 de armadura natural na Reflexos", Voracious: "−5 em Endurance contra fome" })
  }),
  b("Ycaqt", {
    cl: 1, size: "large", speed: 12, cls: [["beast", 2]], ab: [19, 12, 18, 1, 10, 4], def: [10, 14, 10], hp: 17, dt: 19, bab: 1,
    sk: { initiative: 2, jump: 10, perception: 1, survival: 6 },
    feats: [...st("survival")],
    wpn: [{ nat: "slam", name: "Cauda", atk: 5, dmg: "1d6+5" }, { nat: "slam", name: "Pisotear (trample)", atk: 5, dmg: "1d6+5" }],
    notes: notes({ Trample: TRAMPLE })
  }),

  /* ---------------- Companheiros animais ---------------- */
  b("Dark Wolf", {
    cl: 3, speed: 10, cls: [["beast", 4]], ab: [18, 18, 16, 2, 15, 8], def: [14, 13, 12], hp: 30, dt: 13, bab: 3,
    sk: { initiative: 11, perception: 9, survival: 9 },
    feats: [...st("initiative", "survival")],
    wpn: [{ nat: "bite", name: "Mordida", atk: 7, dmg: "1d6+6" }, { nat: "claw", name: "Garra (2, veneno)", atk: 7, dmg: "1d4+6" }, { nat: "slam", name: "Ferrão da cauda (veneno)", atk: 7, dmg: "1d3+6" }],
    notes: notes({ Tipo: "fera do deserto (Sriluur)", Sentidos: "darkvision, faro", Veneno: "garras ou ferrão que ferem: 1d20+10 contra a Fortitude, −1 passo; no último passo fica imobilizado (não inconsciente); repete a cada rodada até Treat Injury CD 10", Faro: "a até 10 quadrados ignora camuflagem e cobertura em Perception" })
  }),
  b("Saber Cat", {
    cl: 5, speed: 8, cls: [["beast", 6]], ab: [14, 18, 13, 2, 12, 7], def: [14, 11, 11], hp: 33, dt: 11, bab: 4,
    sk: { jump: 10, perception: 9, stealth: 12 },
    feats: [...st("jump", "stealth"), "weapon-finesse"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 8, dmg: "1d6+5" }, { nat: "claw", name: "Garra (2)", atk: 8, dmg: "1d4+5" }, { nat: "gore", name: "Chifre", atk: 8, dmg: "1d6+5" }],
    notes: notes({ Ataques: "mordida e 2 garras, ou chifre e 2 garras", Pounce: "saltos de até 4 quadrados sem corrida e sem dobrar a CD; ao cair no quadrado ou adjacente a um inimigo, ataca na hora e, se acertar, tenta derrubá-lo (como Trip) como ação livre" })
  }),
  b("Strill", {
    cl: 4, size: "small", speed: 4, cls: [["beast", 5]], ab: [22, 14, 14, 2, 12, 3], def: [14, 13, 12], hp: 39, dt: 13, bab: 3,
    sk: { initiative: 4, perception: 13 },
    feats: ["improved-defenses", ...sf("perception")],
    wpn: [{ nat: "bite", name: "Mordida", atk: 9, dmg: "1d4+8" }],
    notes: notes({ "Carrying Capacity": "carrega como criatura Média", Gliding: "ação de movimento: plana como um Jump com corrida, com +10 de espécie", Descrição: "Caçador mandaloriano de seis patas; passa de geração em geração." })
  }),
  /* ---------------- Ameaças (Cap. 5) ---------------- */
  t("Captain Ness", {
    cl: 10, sp: "ebruchi", fp: 5, dest: 1, ds: 8, cls: [["noble", 5], ["soldier", 2], ["officer", 3]], ab: [14, 13, 13, 12, 14, 16], def: [24, 23, 28], hp: 67, dt: 28, bab: 8,
    sk: { initiative: 6, deception: 13, knowledgeGalacticLore: 11, knowledgeTactics: 11, perception: 12, persuasion: 18, pilot: 11, useComputer: 11 },
    feats: ["armor-proficiency-light", "armor-proficiency-medium", "improved-damage-threshold", "martial-arts-i", "point-blank-shot", "precise-shot", "quick-draw", ...sf("persuasion"), ...wp("pistols", "simple"), "vehicular-combat"],
    tal: ["assault-tactics", "born-leader", "deployment-tactics", "indomitable", "presence", "weaken-resolve"],
    wpn: [["unarmed", 10, "1d6+7"], [{ base: "slugthrower-pistol", name: "Shrapnel Pistol" }, 7, "2d6+5"]],
    notes: notes({ Papel: "líder Ebruchi da flotilha pirata Burning Gear; vaidoso, adora enigmas e histórias; pode ser aplacado com bugigangas", Qualidades: "command cover, share talent (Indomitable), unsettling", Posses: "pistola de estilhaços (como slugthrower pistol), roupas caras, datapad" })
  }),
  t("Lorgrombo", {
    cl: 8, sp: "lugubraa", fp: 4, dest: 1, ds: 6, cls: [["nonheroic", 15], ["noble", 3]], ab: [10, 8, 16, 18, 17, 14], def: [14, 17, 19], hp: 102, dt: 22, bab: 13,
    sk: { initiative: 8, deception: 16, gatherInformation: 16, knowledgeSocialSciences: 23, perception: 22, persuasion: 21, useComputer: 18 },
    feats: ["armor-proficiency-light", "elders-knowledge", "improved-defenses", "linguist", "pin", ...sf("knowledgeSocialSciences", "perception", "persuasion"), ...st("useComputer"), ...wp("pistols", "rifles", "simple")],
    tal: ["born-leader", "inspire-confidence"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 13, dmg: "1d4+1" }, { nat: "slam", name: "Tentáculo farpado", atk: 13, dmg: "1d6+1" }],
    notes: notes({ Papel: "ancião Lugubraa de 150 anos, corretor de mercenários da sua horda; paga bem por quem resgatar Lugubraa inteligentes", Sentidos: "darkvision", Qualidades: "lockbite" })
  }),
  t("Mnggal-Mnggal", {
    cl: 8, speed: 6, dr: 5, cls: [["beast", 8]], ab: [10, 15, 14, 10, 14, 6], def: [15, 12, 12], hp: 52, dt: 12, bab: 6,
    sk: { initiative: 6, perception: 11, useTheForce: 2 },
    feats: ["force-sensitivity", "running-attack", "trip"],
    wpn: [{ nat: "slam", name: "Pseudópode", atk: 6, dmg: "1d4+4" }],
    notes: notes({
      Tipo: "fera amorfa (Miúda a Colossal; aplique os modificadores de tamanho)", Sentidos: "darkvision", RD: "5; imune a armas cortantes e de impacto; blasters causam pouco dano; morre com fogo, ácido, veneno ou químicos em área",
      Amorphous: "muda de forma à vontade (pseudópodes, tentáculos); não imita outras criaturas",
      "Flying Fragment": "ação rápida: solta um fragmento que voa como ataque à distância (+8, 1d6+4) e fica no ar até o fim do encontro; ação de movimento: divide-se em duas formas um tamanho menores (ou une duas)",
      "Mnggal-Mnggal Seed": "a cada 4 horas, 1d20+6 contra a Fortitude de quem engoliu uma semente (1d20+10 após 12 h); se acertar, 1d12 de dano por hora e −1 passo; a 0 PV ou no fim da trilha vira zumbi"
    })
  }),
  t("Mnggal-Mnggal Zombie", {
    cl: 8, speed: 6, dr: 5, cls: [["beast", 8]], ab: [10, 8, 14, 10, 14, 8], def: [12, 12, 12], hp: 52, dt: 12, bab: 6,
    sk: { initiative: 3, perception: 11, useTheForce: 2 },
    feats: ["force-sensitivity", "running-attack", "trip"],
    wpn: [{ nat: "slam", name: "Desarmado", atk: 6, dmg: "1d4+4" }],
    notes: notes({ Tipo: "fera (casca do hospedeiro; tamanho igual ao da vítima)", Sentidos: "darkvision", "À distância": "usa armas (+5)", Descrição: "corpo esvaziado e animado por Mnggal-Mnggal; voz zumbida, movimentos rígidos e coordenados; apodrece em uma semana" })
  }),
  t("Elder Ruthic", {
    cl: 7, fp: 6, dest: 1, ds: 2, cls: [["noble", 4], ["soldier", 3]], ab: [12, 13, 13, 15, 16, 16], def: [20, 20, 22], hp: 61, dt: 20, bab: 6,
    sk: { deception: 11, gatherInformation: 11, initiative: 9, knowledgeLifeSciences: 10, knowledgeSocialSciences: 10, perception: 16, persuasion: 16, treatInjury: 11, useTheForce: 6 },
    feats: ["armor-proficiency-light", "dual-weapon-mastery-i", "force-sensitivity", "instinctive-attack", "linguist", "martial-arts-i", ...sf("perception", "persuasion"), "weapon-focus:simple", ...wp("simple")],
    tal: ["born-leader", "inspire-confidence", "melee-smash", "stunning-strike"],
    wpn: [["combat-gloves", 8, "1d6+6"], ["quarterstaff", 8, "1d6+6"]],
    notes: notes({ Espécie: "Rakata (Knights of the Old Republic Campaign Guide)", Papel: "sacerdotisa-guerreira, líder da tribo Tulpaa; constrói uma nova Forja Estelar; protegida por dois Gengh-Noghri", "Ataques múltiplos": "bastão +3/+3 (1d6+6)", Qualidades: "conhecimento ancestral, fúria", Posses: "traje e bastão cerimoniais, luvas cerimoniais (como combat gloves)" })
  }),
  t("Blessed Toxmalb", {
    cl: 16, sp: "sorcerer-of-rhand", fp: 9, dest: 3, ds: 16, cls: [["noble", 7], ["force-adept", 5], ["force-disciple", 4]], ab: [8, 10, 11, 18, 16, 6], def: [30, 30, 36], hp: 80, dt: 35, bab: 11,
    sk: { initiative: 8, deception: 11, gatherInformation: 11, knowledgeBureaucracy: 17, knowledgeGalacticLore: 17, knowledgeLifeSciences: 17, knowledgePhysicalSciences: 17, knowledgeSocialSciences: 17, perception: 21, persuasion: 11, useComputer: 17, useTheForce: 16 },
    feats: ["force-boon", "force-training", "force-training", "improved-damage-threshold", "improved-defenses", "linguist", ...sf("knowledgeGalacticLore", "perception"), ...st("knowledgeLifeSciences"), "strong-in-the-force", ...wp("pistols", "simple")],
    tal: ["channel-aggression", "channel-anger", "embrace-the-dark-side", "force-perception", "power-of-the-dark-side", "presence", "telekinetic-savant", "weaken-resolve", "visions",
      "devastating-power", "multitarget-power", "shaped-power", "force-point-recovery", "improved-telepathy"],
    pow: { "dark-rage": 1, farseeing: 1, "force-disarm": 1, "force-grip": 1, "force-lightning": 1, "force-slam": 1, "force-thrust": 1, "mind-trick": 1, "move-object": 2, rebuke: 2 },
    wpn: [["unarmed", 10, "1d4+7"]],
    notes: notes({ Papel: "Guardião do Saber de Rhand, na Torre Alta do observatório; controla até cem Peões com a coroa de sombras", Imune: "efeitos que afetam a mente", Sentidos: "visão na penumbra",
      Darkflies: "um enxame (deslocamento 8) ataca um ser vivo a até 12 quadrados: 1d20+10 contra a Fortitude; 1d8 e −1 passo se acertar, metade se errar (trate como criaturas Minúsculas de 15º nível)",
      "Shadow Crown": "coroa de pedra-fumaça: ação rápida para receber os sentidos dos Peões (+2 em Perception por Peão a até 12 quadrados, máx. +10) e dar ordens de uma palavra", Posses: "túnica em decomposição, coroa de sombras" })
  }),
  t("Vagaari Infiltrator", {
    cl: 5, sp: "vagaari", fp: 1, ds: 6, cls: [["nonheroic", 6], ["scoundrel", 3]], ab: [16, 10, 10, 12, 12, 16], def: [15, 13, 15], hp: 26, dt: 13, bab: 6,
    sk: { initiative: 4, deception: 17, knowledgeGalacticLore: 10, perception: 10, persuasion: 17, stealth: 14 },
    feats: ["combat-trickery", ...sf("deception", "persuasion", "stealth"), ...st("deception", "persuasion", "stealth"), "weapon-focus:pistols", ...wp("pistols", "simple")],
    tal: ["sneak-attack", "sneak-attack"],
    wpn: [["stun-baton", 9, "2d6+4"], ["blaster-pistol", 7, "3d6+1"], ["hold-out-blaster", 7, "3d4+1"]],
    notes: notes({ Papel: "batedor disfarçado de mercador que prepara a chegada da frota escravista", "Stun baton": "dano de atordoamento", Posses: "pistola blaster, hold-out, stun baton, comlink, datapad, roupas de espaçonauta" })
  }),

  /* ---------------- Feras dos planetas (Cap. 6) ---------------- */
  b("Brintak", {
    cl: 15, size: "huge", speed: 6, cls: [["beast", 15]], ab: [26, 13, 26, 2, 10, 13], def: [25, 18, 10], hp: 188, dt: 28, bab: 11,
    sk: { initiative: 8, perception: 12, stealth: -2 },
    feats: ["crush", "dodge", "improved-charge", "mobility", "pin"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 19, dmg: "2d6+7" }, { nat: "claw", name: "Garra (2)", atk: 19, dmg: "1d8+7" }, { nat: "slam", name: "Tentáculo (veneno)", atk: 19, dmg: "1d8+7" }],
    notes: notes({ Origem: "Giaca", Sentidos: "visão na penumbra", Ataques: "mordida e 2 garras, ou tentáculo", Veneno: "tentáculo que acerta: 1d20+10 contra a Fortitude; 1d12 de dano extra se acertar, metade se errar",
      Pounce: "salto longo sem corrida e sem dobrar a CD; ao cair junto do alvo, ataca na hora e, se acertar, tenta derrubá-lo (como Trip) como ação livre",
      Roar: "ação de movimento: Persuasion para intimidar um inimigo a até 6 quadrados; se vencer, ele se afasta no próximo turno e desce −1 passo (afeta a mente)", "Grapple (tentáculos)": "+29" })
  }),
  b("Reyko", {
    cl: 5, size: "large", speed: 6, dr: 15, cls: [["beast", 6]], ab: [24, 10, 22, 2, 14, 8], def: [16, 17, 13], hp: 69, dt: 22, bab: 4,
    sk: { initiative: 2, endurance: 13, perception: 4 },
    feats: ["improved-defenses", "powerful-charge", "toughness"],
    wpn: [{ nat: "gore", name: "Chifrada", atk: 11, dmg: "1d8+7" }],
    notes: notes({ Origem: "Volik", Sentidos: "faro", RD: "15", "Na investida": "+13 (1d8+10); contra veículo, 1d8+10×2", "Battering Bantha Rush": "investida contra veículo Grande ou maior: se acertar, dano ×2 e empurra o veículo 1 quadrado" })
  })
];
