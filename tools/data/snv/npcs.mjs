// Scum and Villainy — Cap. 4: personagens notórios (Fringe Elements). Mesmo formato de tools/data/npcs.mjs.
const wp = (...g) => g.map(x => `weapon-proficiency-${x}`);
const ap = (...g) => g.map(x => `armor-proficiency-${x}`);
const sf = (...s) => s.map(x => `skill-focus:${x}`);
const st = (...s) => s.map(x => `skill-training:${x}`);
const notes = o => `<p><em>Scum and Villainy</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
export const F = { fringe: "Scum and Villainy — Personagens Notórios" };
const n = (name, o) => ({ name, folder: F.fringe, lenient: true, ...o });

export default [
  n("BoShek", {
    cl: 8, sp: "human", fp: 4, dest: 1, cls: [["soldier", 7], ["ace-pilot", 1]], ab: [13, 17, 14, 12, 10, 10], def: [25, 22, 18], hp: 83, dt: 22, bab: 7,
    sk: { initiative: 12, perception: 4, knowledgeTactics: 10, mechanics: 10, pilot: 17, useComputer: 10 },
    feats: [...ap("light", "medium"), "burst-fire", "force-sensitivity", "point-blank-shot", ...sf("pilot"), "vehicular-combat", "weapon-focus:heavy", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["devastating-attack:heavy", "draw-fire", "full-throttle", "penetrating-attack:heavy", "weapon-specialization:heavy"],
    wpn: [["unarmed", 8, "1d4+5"], ["blaster-pistol", 10, "3d6+4"]],
    notes: notes({ "Opções de ataque": "Burst Fire, Devastating Attack, Penetrating Attack", "Ações especiais": "Full Throttle, Point Blank Shot, Vehicular Combat", Idiomas: "Basic, Shyriiwook", Posses: "blaster pistol, comlink, detonador térmico" })
  }),
  n("Booster Terrik", {
    cl: 12, sp: "human", fp: 6, dest: 2, ds: 3, cls: [["scoundrel", 5], ["soldier", 5], ["crime-lord", 2]], ab: [17, 10, 14, 14, 12, 10], def: [26, 26, 27], hp: 96, dt: 31, bab: 9,
    sk: { deception: 11, gatherInformation: 11, knowledgeBureaucracy: 13, knowledgeGalacticLore: 12, perception: 12, persuasion: 11, pilot: 11 },
    feats: ["crush", "improved-damage-threshold", "improved-defenses", "martial-arts-i", "martial-arts-ii", "melee-defense", "mighty-swing", "pin", "point-blank-shot", "trip", "vehicular-combat", ...wp("pistols", "rifles", "simple")],
    tal: ["better-lucky-than-dead", "cantina-brawler", "fools-luck", "inspire-fear-i", "notorious", "pick-a-fight", "sucker-punch", "uncanny-luck"],
    wpn: [["unarmed", 12, "1d8+9"], ["blaster-pistol", 9, "3d6+6"]],
    notes: notes({ "Opções de ataque": "Cantina Brawler, Crush, Melee Defense, Mighty Swing (+12, 2d8+9), Pin, Point Blank Shot, Sucker Punch, Trip", "Ações especiais": "Better Lucky than Dead, Uncanny Luck, Vehicular Combat; cobertura de comando +1", Perícias: "pode rerrolar Persuasion para intimidar, ficando com o resultado", Idiomas: "Basic, Bothese, Huttese", Posses: "blaster pistol, comlink, chip de crédito, datapad, o Star Destroyer Errant Venture" })
  }),
  n("Boushh", {
    cl: 10, sp: "ubese", fp: 5, dest: 2, ds: 3, cls: [["scout", 5], ["soldier", 2], ["bounty-hunter", 3]], ab: [8, 18, 10, 14, 14, 11], def: [28, 24, 22], hp: 69, dt: 24, bab: 8,
    sk: { endurance: 10, initiative: 14, knowledgeTactics: 12, mechanics: 12, perception: 17, stealth: 14, survival: 12 },
    feats: [...ap("light"), "dodge", "improved-disarm", "mobility", "rapid-strike", "shake-it-off", ...sf("perception"), "weapon-focus:advancedMelee", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["acute-senses", "armored-defense", "hunters-mark", "hunters-target", "improved-initiative", "uncanny-dodge-i"],
    wpn: [["force-pike", 8, "2d8+4"], ["blaster-pistol", 12, "3d6+5"], ["thermal-detonator", 12, "8d6+5"]],
    notes: notes({ "Opções de ataque": "agressivo (Ubese), Hunter's Mark, Improved Disarm, Melee Defense, Point Blank Shot, Rapid Strike (+6, 3d8+4)", "Ações especiais": "Familiar Foe +1, Hunter's Target, Shake It Off", Idiomas: "Basic, Dosh, Rodese, Ubeninal, Ubese", Posses: "force pike, luvas de combate, blaster pistol, 2 detonadores térmicos, comlink, máscara respiratória Ubese, traje ambiental (+3 armadura, +2 de equipamento na Fortitude) com modulador de voz e telêmetro, bandoleira" })
  }),
  n("Jodo Kast", {
    cl: 10, sp: "human", fp: 5, dest: 2, ds: 2, speed: 4, cls: [["soldier", 3], ["scout", 4], ["gunslinger", 3]], ab: [14, 16, 14, 12, 12, 8], def: [32, 26, 23], hp: 92, dt: 26, bab: 9,
    sk: { climb: 12, endurance: 12, knowledgeGalacticLore: 11, mechanics: 11, perception: 11 },
    feats: [...ap("light", "medium"), "collateral-damage", "martial-arts-i", "point-blank-shot", "precise-shot", "quick-draw", "rapid-shot", "shake-it-off", "weapon-focus:pistols", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["armored-defense", "evasion", "improved-armored-defense", "improved-quick-draw", "surefooted", "trigger-work"],
    armor: "battle-armor",
    wpn: [["unarmed", 11, "1d6+7"], ["heavy-blaster-pistol", 13, "3d8+6"], ["thermal-detonator", 12, "8d6+5"]],
    notes: notes({ Deslocamento: "4; voo 6 (jet pack)", "Opções de ataque": "Collateral Damage, Point Blank Shot, Precise Shot, Rapid Shot (+13, 4d8+6 com Trigger Work)", "Ações especiais": "Improved Quick Draw, Shake It Off; Trusty Sidearm +1", Idiomas: "Basic, Huttese, Rodese", Posses: "armadura de batalha, heavy blaster pistol, detonador térmico, code cylinder, comlink, jet pack (10 cargas), pocket scrambler" })
  }),
  n("Jorj Car'das", {
    cl: 12, sp: "human", fp: 6, dest: 2, ds: 5, cls: [["noble", 7], ["crime-lord", 5]], ab: [12, 13, 10, 14, 11, 18], def: [26, 23, 27], hp: 91, dt: 23, bab: 8,
    sk: { deception: 15, gatherInformation: 20, initiative: 12, knowledgeBureaucracy: 13, knowledgeGalacticLore: 18, perception: 11, persuasion: 20, pilot: 12, useComputer: 13 },
    feats: ["force-sensitivity", "friends-in-low-places", "improved-defenses", "linguist", "point-blank-shot", "precise-shot", ...sf("gatherInformation", "knowledgeGalacticLore", "persuasion"), "vehicular-combat", ...wp("pistols", "simple")],
    tal: ["ambush", "attract-minion", "attract-minion", "born-leader", "connections", "dirty-tactics", "impel-ally-i", "inspire-fear-i", "inspire-fear-ii"],
    wpn: [["unarmed", 9, "1d4+7"], ["blaster-pistol", 9, "3d6+6"]],
    notes: notes({ "Ações especiais": "Ambush, Attract Minion ×2, Born Leader, Dirty Tactics, Impel Ally I, Vehicular Combat; cobertura de comando +2, Inspire Fear II", Idiomas: "Basic, Bothese, Cheunh, Durese, Huttese, Rodese", Posses: "blaster pistol, code cylinder, comlink criptografado de longo alcance, chip de crédito, datapad", Observação: "estatísticas do auge da carreira criminosa, após a cura por Yoda" })
  }),
  n("Mirax Terrik Horn", {
    cl: 10, sp: "human", fp: 5, dest: 2, cls: [["scoundrel", 7], ["master-privateer", 3]], ab: [8, 15, 12, 10, 14, 17], def: [24, 21, 26], hp: 65, dt: 21, bab: 8,
    sk: { initiative: 4, perception: 5, deception: 13, knowledgeGalacticLore: 10, mechanics: 10, persuasion: 18, pilot: 17 },
    feats: ["fleet-footed", "point-blank-shot", "precise-shot", "running-attack", ...sf("persuasion", "pilot"), "vehicular-combat", "weapon-finesse", ...wp("advanced-melee", "pistols", "simple")],
    tal: ["cunning-strategist", "disruptive", "raiders-frenzy", "spacehound", "take-them-alive", "walk-the-line"],
    wpn: [["vibroblade", 10, "2d6+4"], ["blaster-pistol", 10, "3d6+5"]],
    notes: notes({ "Opções de ataque": "Crippling Shot e Dirty Fighting (de outros livros), Point Blank Shot, Precise Shot", "Ações especiais": "Cunning Strategist, Disruptive, Raider's Frenzy, Take Them Alive, Vehicular Combat, Veteran Privateer 1/encontro, Walk the Line", Posses: "blaster pistol, vibroblade, code cylinder, comlink de longo alcance, kit de ferramentas, cinto de utilidades, medpac, transporte espacial" })
  }),
  n("Moxin Tark", {
    cl: 11, sp: "human", fp: 5, dest: 1, ds: 15, cls: [["soldier", 3], ["scout", 3], ["scoundrel", 1], ["bounty-hunter", 4]], ab: [10, 14, 13, 12, 15, 8], def: [31, 24, 24], hp: 85, dt: 24, bab: 8,
    sk: { endurance: 11, initiative: 12, mechanics: 12, perception: 14, persuasion: 14, pilot: 12, survival: 12, useComputer: 11 },
    feats: [...ap("light", "medium", "heavy"), "point-blank-shot", "shake-it-off", ...sf("persuasion"), ...st("persuasion", "survival", "useComputer"), "tech-specialist", ...wp("advanced-melee", "heavy", "pistols", "rifles", "simple")],
    tal: ["acute-senses", "armored-defense", "fools-luck", "hunters-mark", "hunters-target", "improved-armored-defense", "keen-shot"],
    armor: "ceremonial-armor",
    wpn: [["force-pike", 8, "2d8+7"], ["heavy-blaster-pistol", 11, "3d8+5"], ["blaster-rifle", 11, "3d8+5"]],
    notes: notes({ Sentidos: "visão na penumbra", "Opções de ataque": "autofire (blaster rifle), Hunter's Mark, Keen Shot, Point Blank Shot", "Ações especiais": "Fool's Luck, Hunter's Target, Shake It Off; Familiar Foe +2", Idiomas: "Basic, Huttese", Posses: "blaster rifle, force pike e heavy blaster pistol modificados, armadura cerimonial (+8) com pacote de capacete, binders, medpac (4), comlink, macrobinóculos", Observação: "Tech Specialist é do Starships of the Galaxy (ainda não incluído)" })
  }),
  n("Prince Xizor", {
    cl: 16, sp: "falleen", fp: 6, dest: 2, ds: 14, cls: [["noble", 7], ["crime-lord", 9]], ab: [13, 12, 10, 17, 14, 16], def: [32, 26, 32], hp: 80, dt: 26, bab: 12,
    sk: { deception: 21, gatherInformation: 16, initiative: 14, knowledgeBureaucracy: 16, knowledgeGalacticLore: 16, knowledgeSocialSciences: 16, perception: 20, persuasion: 21, pilot: 14 },
    feats: ["linguist", "martial-arts-i", "martial-arts-ii", "martial-arts-iii", "point-blank-shot", "precise-shot", ...sf("deception", "perception", "persuasion"), "sniper", ...wp("pistols", "simple")],
    tal: ["impel-ally-i", "impel-ally-ii", "impel-ally-iii", "improved-weaken-resolve", "inspire-fear-i", "inspire-fear-ii", "notorious", "presence", "terrify", "unsavory-reputation", "weaken-resolve", "wealth"],
    wpn: [["unarmed", 13, "1d10+9"], ["blaster-pistol", 13, "3d6+8"]],
    notes: notes({ "Ações especiais": "Impel Ally I, II e III, Improved Weaken Resolve, Inspire Fear II, feromônios (botão da espécie Falleen), Presence", "Qualidades especiais": "cobertura de comando, prender a respiração, feromônios, aclimatação a feromônios (+5 na Fortitude)", Perícias: "pode rerrolar Persuasion para intimidar, ficando com o melhor", Idiomas: "Basic, Bocce, Bothese, Falleen, High Galactic, Huttese, Rodese, Ryl, Sullustese", Posses: "blaster pistol, comlink, roupas finas, droide réplica humana (Guri), StarViper Virago" })
  }),
  n("Snoova", {
    cl: 10, sp: "wookiee", fp: 5, dest: 1, ds: 10, cls: [["soldier", 4], ["scout", 3], ["bounty-hunter", 3]], ab: [20, 12, 16, 10, 10, 6], def: [25, 25, 20], hp: 115, dt: 25, bab: 9,
    sk: { climb: 10, endurance: 13, perception: 12 },
    feats: [...ap("light", "medium"), "point-blank-shot", "power-attack", "shake-it-off", ...st("survival"), "weapon-focus:advancedMelee", "weapon-focus:rifles", ...wp("advanced-melee", "heavy", "pistols", "rifles", "simple")],
    tal: ["acute-senses", "devastating-attack:advancedMelee", "hunters-mark", "hunters-target", "improved-initiative", "sucker-punch"],
    wpn: [["vibro-ax", 15, "2d10+10"], ["heavy-blaster-rifle", 11, "3d10+5"]],
    notes: notes({ Sentidos: "visão na penumbra; rerrola Initiative e Perception (fica com o segundo)", Ataques: "vibro-ax +15 (2d10+10) ou +10 (2d10+20) com 5 pontos de Power Attack", "Opções de ataque": "autofire (heavy blaster rifle), Devastating Attack, Hunter's Mark, Point Blank Shot, Sucker Punch", "Ações especiais": "Hunter's Target, Shake It Off, fúria", Idiomas: "Basic (não fala), Shyriiwook", Posses: "blaster rifle, vibro-ax, binders, comlink, olho cibernético, pertences pessoais", Observação: "Iniciativa +11 no topo do bloco; o texto das perícias não está legível no PDF" })
  }),
  n("Tyber Zann", {
    cl: 13, sp: "human", fp: 6, dest: 2, ds: 16, cls: [["scoundrel", 5], ["soldier", 4], ["crime-lord", 4]], ab: [10, 14, 12, 16, 16, 10], def: [28, 27, 31], hp: 85, dt: 27, bab: 10,
    sk: { deception: 16, gatherInformation: 11, initiative: 13, knowledgeBureaucracy: 14, knowledgeGalacticLore: 14, perception: 14, persuasion: 16, stealth: 13, useComputer: 14 },
    feats: ["double-attack:rifles", "friends-in-low-places", "improved-defenses", "point-blank-shot", "precise-shot", "quick-draw", ...sf("deception", "persuasion"), ...st("useComputer"), "weapon-focus:pistols", ...wp("pistols", "rifles", "simple")],
    tal: ["battle-analysis", "disruptive", "gambler", "indomitable", "inspire-fear-i", "inspire-fear-ii", "inspire-fear-iii", "notorious", "walk-the-line"],
    wpn: [["unarmed", 10, "1d4+6"], ["blaster-carbine", 13, "3d8+6"], ["blaster-pistol", 13, "3d6+6"], ["hold-out-blaster", 13, "3d4+6"]],
    notes: notes({ "Opções de ataque": "Double Attack (rifles: +8/+8), Point Blank Shot, Precise Shot", "Ações especiais": "Battle Analysis, Disruptive, Indomitable, Inspire Fear III, Quick Draw, Walk the Line; cobertura de comando", Idiomas: "Basic, Bocce, High Galactic, Huttese", Posses: "blaster carbine, blaster pistol, blaster hold-out, comlink, datapad, pertences pessoais" })
  }),
  n("Zam Wesell", {
    cl: 10, sp: "clawdite", fp: 4, dest: 2, ds: 10, cls: [["soldier", 4], ["scoundrel", 3], ["assassin", 3]], ab: [10, 17, 10, 14, 15, 12], def: [29, 23, 22], hp: 73, dt: 23, bab: 8,
    sk: { climb: 10, pilot: 13, stealth: 13, useComputer: 12 },
    feats: [...ap("light", "medium"), "careful-shot", "deadeye", "deadly-sniper", "point-blank-shot", "precise-shot", ...sf("perception"), ...st("stealth"), ...wp("pistols", "rifles", "simple")],
    tal: ["armored-defense", "dastardly-strike", "improved-armored-defense", "murderous-arts-i", "sneak-attack", "sniping-assassin"],
    wpn: [["unarmed", 8, "1d4+5"], ["sniper-blaster-rifle", 11, "3d10+5"], ["blaster-pistol", 11, "3d6+5"]],
    notes: notes({ Sentidos: "Perception +16; Initiative +11 (o bloco de perícias imprime +12/+13)", "Opções de ataque": "Dastardly Strike, Deadly Sniper, Murderous Arts I, Point Blank Shot, Precise Shot, Sneak Attack +1d6, Sniping Assassin; rifle com Careful Shot e Deadeye +12 (4d10+5)", "Ações especiais": "Mark +1, metamorfose (shapeshift), startle", Perícias: "pode escolher 20 em Deception como rodada completa para se disfarçar", Idiomas: "Basic, Clawdite, High Galactic, Huttese", Posses: "Mabari armorweave (como combat jumpsuit aprimorado), sniper blaster rifle com mira, blaster pistol, medpacs, comlink, chip de crédito, eletrobinóculos, kit de campo, cinto de utilidades" })
  }),
  n("Zardra", {
    cl: 8, sp: "human", fp: 4, dest: 1, ds: 8, cls: [["scout", 5], ["scoundrel", 2], ["bounty-hunter", 1]], ab: [14, 16, 10, 14, 14, 14], def: [25, 20, 21], hp: 54, dt: 20, bab: 5,
    sk: { endurance: 9, gatherInformation: 11, knowledgeGalacticLore: 11, mechanics: 11, perception: 11, pilot: 12, stealth: 12, survival: 11 },
    feats: [...ap("light"), "dodge", "mobility", "running-attack", "shake-it-off", ...sf("initiative"), ...st("mechanics"), "weapon-focus:advancedMelee", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["acute-senses", "dastardly-strike", "expert-tracker", "improved-initiative", "nowhere-to-hide"],
    wpn: [["force-pike", 7, "2d8+10"], ["blaster-pistol", 8, "3d6+4"], ["thermal-detonator", 8, "8d6+4"]],
    notes: notes({ Sentidos: "rerrola Initiative e Perception; Initiative +16 (+17 no bloco de perícias)", "Opções de ataque": "Dastardly Strike, Hunter's Mark, Running Attack", "Ações especiais": "Expert Tracker, Shake It Off", Idiomas: "Basic, Huttese, Rodian", Posses: "blaster pistol, force pike, 4 detonadores térmicos, datapad, comlink" })
  }),
  n("Zuckuss", {
    cl: 11, sp: "gand", fp: 6, dest: 2, cls: [["scout", 7], ["bounty-hunter", 4]], ab: [10, 12, 8, 14, 20, 15], def: [25, 26, 26], hp: 62, dt: 26, bab: 9,
    sk: { endurance: 9, initiative: 11, knowledgeGalacticLore: 12, mechanics: 12, pilot: 11, stealth: 11, survival: 15, useTheForce: 12 },
    feats: [...ap("light", "medium", "heavy"), "force-sensitivity", "force-training", "point-blank-shot", "shake-it-off", ...st("useTheForce"), ...wp("pistols", "rifles", "simple")],
    tal: ["acute-senses", "expert-tracker", "force-perception", "hunters-mark", "nowhere-to-hide", "visions"],
    pow: { farseeing: 6 },
    armor: "heavy-battle-armor",
    wpn: [["unarmed", 11, "1d4+5"], ["blaster-rifle", 10, "3d8+5"], ["snare-rifle", 10, "2d8+5"]],
    notes: notes({ Sentidos: "darkvision; Perception via Force Perception (Use the Force +12)", "Opções de ataque": "autofire (blaster rifle), Hunter's Mark, Point Blank Shot", "Ações especiais": "Expert Tracker, Familiar Foe +2, Nowhere to Hide, Shake It Off", "Qualidades especiais": "regeneração de membros, equipamento especial (respirador), resistente (hardy)", Idiomas: "Basic, Binary, Gand, Huttese", Posses: "armadura de batalha pesada, heavy blaster pistol, snare rifle, 2 cartuchos, comlink, computador portátil, respirador, vocoder" })
  }),
  n("Blockade Runner (arquétipo)", {
    cl: 8, sp: "human", fp: 5, ds: 2, cls: [["scoundrel", 7], ["master-privateer", 1]], ab: [8, 14, 12, 10, 14, 16], def: [22, 19, 24], hp: 52, dt: 19, bab: 6,
    sk: { initiative: 4, perception: 5, deception: 17, knowledgeGalacticLore: 9, persuasion: 12, pilot: 11, useComputer: 9 },
    feats: ["combat-reflexes", "cornered", "point-blank-shot", "precise-shot", ...sf("deception"), "vehicular-combat", "weapon-finesse", ...wp("advanced-melee", "pistols", "simple")],
    tal: ["cunning-strategist", "disruptive", "raiders-frenzy", "spacehound", "walk-the-line"],
    wpn: [["vibroblade", 8, "2d6+3"], ["blaster-pistol", 8, "3d6+4"]],
    notes: notes({ Arquétipo: "corredor de bloqueio/corsário (troque a espécie à vontade)", "Ações especiais": "Cunning Strategist, Disruptive, Raider's Frenzy", Posses: "blaster pistol, vibroblade, code cylinder, comlink de longo alcance, kit de ferramentas, cinto de utilidades, transporte espacial; medpac" })
  }),
  n("Brawler (arquétipo)", {
    cl: 5, sp: "human", fp: 4, cls: [["soldier", 5]], ab: [16, 14, 14, 8, 12, 10], def: [20, 19, 16], hp: 62, dt: 19, bab: 5,
    sk: { endurance: 9, initiative: 9, jump: 10, perception: 3 },
    feats: [...ap("light", "medium"), "desperate-gambit", "martial-arts-i", "martial-arts-ii", "mighty-swing", "weapon-focus:simple", ...wp("pistols", "rifles", "simple")],
    tal: ["experienced-brawler", "melee-smash", "stunning-strike"],
    wpn: [[{ base: "combat-gloves", name: "Combat Gloves" }, 9, "1d8+7"], ["hold-out-blaster", 7, "3d4+2"]],
    notes: notes({ Arquétipo: "lutador de cantina", Ataques: "desarmado +9 (1d8+7) ou com Mighty Swing (2d8+7)", "Ações especiais": "Experienced Brawler, Desperate Gambit", Posses: "luvas de combate, blaster hold-out, comlink" })
  }),
  n("Charlatan (arquétipo)", {
    cl: 8, sp: "human", fp: 4, ds: 4, cls: [["noble", 7], ["charlatan", 1]], ab: [8, 14, 10, 14, 14, 16], def: [22, 18, 24], hp: 49, dt: 18, bab: 5,
    sk: { deception: 17, gatherInformation: 12, initiative: 11, knowledgeBureaucracy: 11, knowledgeGalacticLore: 11, perception: 11, persuasion: 17, pilot: 11, useComputer: 11 },
    feats: ["combat-reflexes", "dodge", "linguist", "melee-defense", "opportunistic-retreat", ...sf("deception", "persuasion"), "slippery-maneuver", ...wp("pistols", "simple")],
    tal: ["dirty-tactics", "innocuous", "misplaced-loyalty", "two-faced", "unreadable"],
    wpn: [["unarmed", 4, "1d4+3"], ["hold-out-blaster", 7, "3d4+4"]],
    notes: notes({ Arquétipo: "vigarista", "Ações especiais": "Dirty Tactics, Innocuous, Misplaced Loyalty, Opportunistic Retreat, Two-Faced", Idiomas: "Basic, Bothese, High Galactic, Huttese, Ryl, Sullustese", Posses: "blaster hold-out, comlink de longo alcance, chip de crédito, datapad (cheater), holo-gravador, pocket scrambler" })
  }),
  n("Data Slicer (arquétipo)", {
    cl: 7, sp: "human", fp: 3, cls: [["scoundrel", 7]], ab: [10, 13, 12, 16, 14, 9], def: [20, 18, 20], hp: 46, dt: 18, bab: 5,
    sk: { initiative: 4, perception: 5, gatherInformation: 7, knowledgeBureaucracy: 11, knowledgeGalacticLore: 11, knowledgePhysicalSciences: 11, knowledgeTechnology: 11, mechanics: 16, stealth: 9, useComputer: 16 },
    feats: ["careful-shot", "deadeye", "dodge", "linguist", "point-blank-shot", "precise-shot", ...sf("mechanics", "useComputer"), ...wp("pistols", "simple")],
    tal: ["electronic-sabotage", "gimmick", "master-slicer", "trace"],
    wpn: [["unarmed", 5, "1d4+3"], ["blaster-pistol", 6, "3d6+3"]],
    notes: notes({ Arquétipo: "slicer de dados", Ataques: "blaster pistol +7 (4d6+3) com Careful Shot e Deadeye", "Ações especiais": "Electronic Sabotage (talento de outro livro), Gimmick", Idiomas: "Basic, Bocce, Binary, Bothese, Durese, Huttese, Ryl, Sullustese", Posses: "blaster pistol, code cylinder, comlink de longo alcance, chip de crédito, 10 datacards, datapad (memória aprimorada), medpac, célula e pacote de energia, holo-gravador, pocket scrambler, computador portátil, kit de segurança, kit de ferramentas, cinto de utilidades" })
  }),
  n("Enforcer (arquétipo)", {
    cl: 5, sp: "human", fp: 3, cls: [["soldier", 5]], ab: [16, 14, 14, 8, 12, 10], def: [21, 21, 16], hp: 62, dt: 21, bab: 5,
    sk: { initiative: 9, perception: 8, knowledgeBureaucracy: 6 },
    feats: [...ap("light", "medium"), "burst-fire", "combat-reflexes", "point-blank-shot", "precise-shot", "weapon-focus:rifles", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["counterpunch", "gun-club", "tough-as-nails"],
    armor: "battle-armor",
    wpn: [["heavy-blaster-rifle", 8, "3d10+2"]],
    notes: notes({ Arquétipo: "segurança/capanga corporativo", Ataques: "baioneta +8 (1d6+8) ou baioneta +3 (1d6+5) e coronhada +3 (1d6+5); heavy blaster rifle +8 (3d10+2), +3 (5d10+2) com Burst Fire", "Ações especiais": "Tough as Nails; Gun Club é de outro livro", Posses: "armadura de batalha, heavy blaster rifle com baioneta, blaster pistol, comlink" })
  }),
  n("Expert Assassin (arquétipo)", {
    cl: 8, sp: "human", fp: 4, ds: 14, cls: [["soldier", 4], ["scoundrel", 3], ["assassin", 1]], ab: [14, 16, 10, 10, 14, 12], def: [25, 20, 21], hp: 62, dt: 20, bab: 6,
    sk: { climb: 11, initiative: 12, perception: 11, stealth: 12 },
    feats: [...ap("light", "medium"), "deadeye", "deadly-sniper", "point-blank-shot", "precise-shot", ...st("stealth"), "sniper", "weapon-focus:rifles", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["dastardly-strike", "devastating-attack:rifles", "ruthless", "sneak-attack", "weapon-specialization:rifles"],
    wpn: [["vibroblade", 9, "2d6+6"], ["sniper-blaster-rifle", 10, "3d10+6"]],
    notes: notes({ Arquétipo: "assassino profissional", Ataques: "sniper blaster rifle +10 (3d10+6), +11 (4d10+6) com Deadeye (Devastating Attack)", "Opções de ataque": "Dastardly Strike, Deadly Sniper, Point Blank Shot, Precise Shot, Sneak Attack +1d6", "Ações especiais": "Ruthless", Posses: "sniper blaster rifle com mira (low-light), blaster hold-out, vibroblade, comlink, chip de crédito, eletrobinóculos, kit de campo, cinto de utilidades, 2 medpacs" })
  }),
  n("Fixer (arquétipo)", {
    cl: 7, sp: "human", fp: 3, cls: [["scoundrel", 4], ["noble", 3]], ab: [10, 9, 12, 16, 14, 13], def: [18, 18, 21], hp: 46, dt: 18, bab: 5,
    sk: { gatherInformation: 14, initiative: 7, knowledgeBureaucracy: 11, knowledgeGalacticLore: 11, knowledgeTechnology: 11, perception: 10, persuasion: 9, stealth: 7, useComputer: 11 },
    feats: ["careful-shot", "deadeye", "dodge", "friends-in-low-places", "linguist", "point-blank-shot", "precise-shot", ...sf("gatherInformation"), ...wp("pistols", "simple")],
    tal: ["blackmail", "connections", "hesitate", "fools-luck"],
    wpn: [["unarmed", 5, "1d4+3"], ["blaster-pistol", 4, "3d6+3"]],
    notes: notes({ Arquétipo: "contato/arranjador do mercado negro", Ataques: "blaster pistol +5 (4d6+3) com Careful Shot e Deadeye", "Ações especiais": "Hesitate, Fool's Luck", Idiomas: "Basic, Bocce, Bothese, Durese, High Galactic, Huttese, Ryl, Sullustese", Posses: "blaster pistol, code cylinder, comlink de longo alcance, chip de crédito, 10 datacards, datapad, holo-gravador, pocket scrambler" })
  }),
  n("Notorious Outlaw (arquétipo)", {
    cl: 8, sp: "human", fp: 4, ds: 4, cls: [["scoundrel", 3], ["scout", 4], ["gunslinger", 1]], ab: [14, 17, 13, 14, 8, 10], def: [25, 21, 19], hp: 55, dt: 21, bab: 6,
    sk: { acrobatics: 11, deception: 8, gatherInformation: 8, initiative: 11, knowledgeGalacticLore: 10, perception: 7, stealth: 11, survival: 7 },
    feats: ["point-blank-shot", "precise-shot", "quick-draw", "rapid-shot", "rapid-strike", ...st("survival"), "weapon-finesse", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["dastardly-strike", "evasion", "fringe-savant", "skirmisher", "trigger-work"],
    wpn: [["vibroblade", 9, "2d6+4"], ["blaster-pistol", 9, "3d6+4"]],
    notes: notes({ Arquétipo: "fora da lei famoso", Ataques: "vibroblade +7 (3d6+6) com Rapid Strike; blaster pistol +9 (4d6+4) com Rapid Shot (Trigger Work)", "Ações especiais": "Fringe Savant, Quick Draw", Idiomas: "Basic, Rodese, Ryl", Posses: "blaster pistol, vibroblade, medpac, comlink, chip de crédito, cinto de utilidades" })
  }),
  n("Space Transport Pilot (arquétipo)", {
    cl: 7, sp: "human", fp: 3, cls: [["scoundrel", 7]], ab: [10, 16, 12, 10, 14, 14], def: [21, 19, 21], hp: 46, dt: 19, bab: 5,
    sk: { initiative: 6, knowledgeGalacticLore: 8, mechanics: 8, perception: 10, pilot: 16, useComputer: 8 },
    feats: ["friends-in-low-places", "improved-defenses", "point-blank-shot", "precise-shot", ...sf("pilot"), "tech-specialist", "vehicular-combat", "weapon-focus:pistols", ...wp("pistols", "simple")],
    tal: ["hyperdriven", "spacehound", "starship-raider", "stellar-warrior"],
    wpn: [["knife", 5, "1d4+3"], ["heavy-blaster-pistol", 9, "3d8+3"]],
    notes: notes({ Arquétipo: "piloto de transporte espacial", "Ações especiais": "Vehicular Combat; Tech Specialist é do Starships of the Galaxy", Posses: "heavy blaster pistol, comlink, kit de ferramentas, pertences pessoais" })
  }),
  n("Security Officer (arquétipo)", {
    cl: 1, sp: "human", cls: [["nonheroic", 4]], ab: [12, 13, 11, 10, 10, 8], def: [14, 10, 10], hp: 10, dt: 10, bab: 3,
    sk: { initiative: 8, perception: 7, knowledgeBureaucracy: 7, pilot: 8 },
    feats: [...ap("light"), "point-blank-shot", ...st("perception", "pilot"), ...wp("pistols", "simple")],
    armor: "combat-jumpsuit",
    wpn: [["stun-baton", 4, "2d6+1"], ["blaster-pistol", 4, "3d6"]],
    notes: notes({ Arquétipo: "guarda de segurança", Posses: "combat jumpsuit, blaster pistol, bastão de atordoamento, algemas, comlink, datapad" })
  }),
  n("Security Specialist (arquétipo)", {
    cl: 5, sp: "human", fp: 3, cls: [["soldier", 5]], ab: [16, 14, 14, 8, 12, 10], def: [18, 21, 16], hp: 62, dt: 21, bab: 5,
    sk: { initiative: 9, perception: 8, treatInjury: 8 },
    feats: [...ap("light", "medium"), "combat-reflexes", "hitch-a-ride", "point-blank-shot", "rapid-shot", "tactical-advantage", ...wp("pistols", "rifles", "simple")],
    tal: ["battle-analysis", "cover-fire", "harms-way"],
    armor: "flight-suit-armored",
    wpn: [["stun-baton", 8, "2d6+5"], ["blaster-carbine", 7, "3d8+2"], ["stun-grenade", 7, "4d6"]],
    notes: notes({ Arquétipo: "especialista de segurança/resposta a crises", Ataques: "blaster carbine +5 (4d8+2) com Rapid Shot", "Ações especiais": "Battle Analysis, Cover Fire, Harm's Way, Hitch a Ride (feat de outro livro), Tactical Advantage", Posses: "traje de voo blindado, blaster carbine, 3 granadas de atordoamento, bandoleira, medpac, algemas, comlink criptografado, cinto de utilidades" })
  })
];
