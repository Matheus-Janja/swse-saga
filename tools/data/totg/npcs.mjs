// Threats of the Galaxy — PdMs, criaturas e droides. Mesmo formato de tools/data/npcs.mjs.
const wp = (...g) => g.map(x => `weapon-proficiency-${x}`);
const ap = (...g) => g.map(x => `armor-proficiency-${x}`);
const sf = (...s) => s.map(x => `skill-focus:${x}`);
const st = (...s) => s.map(x => `skill-training:${x}`);
const notes = o => `<p><em>Threats of the Galaxy</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
export const F = { chars: "Threats — Personagens", creatures: "Threats — Criaturas", droids: "Threats — Droides" };
const c = (name, o) => ({ name, folder: F.chars, lenient: true, ...o });
const b = (name, o) => ({ name, folder: F.creatures, lenient: true, ...o });
const d = (name, o) => ({ name, folder: F.droids, droid: true, lenient: true, ...o });

export default [
  c("Force Adept", {
    cl: 8, fp: 3, cls: [["soldier", 7], ["force-adept", 1]], ab: [16, 10, 14, 10, 12, 16], def: [20, 22, 23], hp: 83, dt: 22, bab: 7,
    sk: { initiative: 9, perception: 10, useTheForce: 12 },
    feats: [...ap("light", "medium"), "cleave", "force-sensitivity", "force-training", "force-training", "power-attack", "weapon-focus:advancedMelee", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["damage-reduction-10", "devastating-attack:advancedMelee", "equilibrium", "melee-smash", "weapon-specialization:advancedMelee"],
    pow: { "battle-strike": 1, "force-slam": 1, "move-object": 1, surge: 1 },
    wpn: [["vibro-ax", 7, "2d10+20", 4]],
    notes: notes({ Papel: "adepto marcial ligado ao lado sombrio; pode cavalgar varactyls", "Power Attack": "o ataque já inclui 4 pontos de Power Attack" })
  }),
  c("Dathomiri Witch", {
    cl: 10, sp: "human", fp: 4, cls: [["scout", 7], ["force-adept", 3]], ab: [8, 12, 10, 14, 16, 18], def: [23, 23, 27], hp: 64, dt: 23, bab: 7,
    sk: { acrobatics: 11, endurance: 10, initiative: 11, perception: 19, persuasion: 9, ride: 16, survival: 18, swim: 9, stealth: 11, useTheForce: 19 },
    feats: ["extra-second-wind", "force-sensitivity", "force-training", ...sf("ride", "survival", "useTheForce"), "strong-in-the-force", ...wp("pistols", "rifles", "simple")],
    tal: ["adept-spellcaster", "charm-beast", "command-beast", "flight", "force-talisman", "force-perception"],
    pow: { "battle-strike": 1, "move-object": 1, rebuke: 1, surge: 1 },
    wpn: [["spear", 6, "1d8+4"]],
    notes: notes({ Técnicas: "Force Point Recovery, Improved Sense Surroundings", Persuasion: "+19 ao encantar feras", "À distância": "lança arremessada +8 (1d8+4)", Posses: "lança, talismã da Força, rancor de Dathomir como companheiro" })
  }),
  c("Tribal Shaman", {
    cl: 9, fp: 4, cls: [["noble", 5], ["scout", 2], ["force-adept", 2]], ab: [10, 8, 14, 12, 16, 16], def: [21, 24, 27], hp: 77, dt: 24, bab: 5,
    sk: { endurance: 11, initiative: 8, perception: 12, persuasion: 17, ride: 8, survival: 12, treatInjury: 17, useTheForce: 12 },
    feats: ["extra-second-wind", "force-sensitivity", "force-training", "improved-defenses", ...sf("persuasion", "treatInjury"), ...wp("pistols", "rifles", "simple"), "toughness"],
    tal: ["coordinate", "equilibrium", "force-focus", "force-power-adept:vital-transfer", "force-recovery"],
    pow: { farseeing: 1, "mind-trick": 1, "vital-transfer": 2 },
    wpn: [["knife", 5, "1d4+4"]],
    notes: notes({ Técnica: "Force Power Mastery (vital transfer)", "À distância": "faca arremessada +4 (1d4+4)", Posses: "faca, 4 medpacs" })
  }),
  c("Assassin", {
    cl: 10, fp: 3, ds: 12, cls: [["scoundrel", 7], ["soldier", 3]], ab: [11, 17, 8, 14, 12, 14], def: [25, 21, 22], hp: 45, dt: 11, bab: 8,
    sk: { acrobatics: 13, deception: 12, gatherInformation: 12, initiative: 13, perception: 11, persuasion: 12, pilot: 13, stealth: 13 },
    feats: ["careful-shot", "point-blank-shot", "precise-shot", "rapid-strike", ...st("gatherInformation", "pilot"), "sniper", "weapon-finesse", "weapon-focus:advancedMelee", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["dastardly-strike", "devastating-attack:advancedMelee", "sneak-attack", "sneak-attack", "sneak-attack", "weapon-specialization:advancedMelee"],
    wpn: [["vibroblade", 13, "2d6+7"], ["blaster-pistol", 11, "3d6+5"], ["blaster-rifle", 11, "3d8+5"]],
    notes: notes({ "Rapid Strike": "vibrolâmina +11 (3d6+7)", "Sneak Attack": "+3d6", Posses: "rifle blaster com mira aprimorada, pistola blaster, vibrolâmina, coldre oculto, eletrobinóculos, dispensador de cabo líquido, comlink criptografado, cinto com medpac, 200 créditos" })
  }),
  c("Malkite Poisoner", {
    cl: 13, fp: 6, ds: 12, cls: [["scoundrel", 9], ["noble", 4]], ab: [10, 16, 10, 16, 10, 14], def: [29, 25, 27], hp: 63, dt: 25, bab: 9,
    sk: { deception: 14, gatherInformation: 14, initiative: 14, knowledgeBureaucracy: 13, knowledgeLifeSciences: 13, mechanics: 13, perception: 12, persuasion: 14, stealth: 14, useComputer: 13 },
    feats: ["dodge", "improved-defenses", "mobility", "point-blank-shot", "running-attack", ...st("persuasion", "stealth", "useComputer"), "triple-crit:simple", "weapon-finesse", "weapon-focus:advancedMelee", ...wp("advanced-melee", "pistols", "simple")],
    tal: ["dastardly-strike", "knack", "malkite-techniques", "numbing-poison", "presence", "sneak-attack", "weaken-resolve"],
    wpn: [[{ base: "knife", name: "Datadagger" }, 12, "1d4+6"], ["vibroblade", 13, "2d6+6"], ["hold-out-blaster", 12, "3d4+6"]],
    notes: notes({ "Sneak Attack": "+1d6", Datadagger: "triple crit (ver o item Datadagger)", Posses: "datadagger, vibrolâmina, hold-out, 2 doses de dioxis, 2 de knockout drops, 2 de veneno paralisante, comlink criptografado, chip de crédito com 1.000, cinto, kit de segurança" })
  }),
  c("Bodyguard", {
    cl: 6, fp: 8, cls: [["soldier", 5], ["nonheroic", 3]], ab: [13, 15, 13, 12, 14, 12], def: [18, 18, 17], hp: 63, dt: 18, bab: 7,
    sk: { initiative: 11, perception: 11, persuasion: 10, treatInjury: 11 },
    feats: ["pin", "point-blank-shot", ...st("initiative", "perception"), "toughness", ...wp("pistols", "rifles", "simple")],
    tal: ["draw-fire", "harms-way", "tough-as-nails"],
    wpn: [["unarmed", 8, "1d3+3"], ["blaster-pistol", 9, "3d6+2"]],
    notes: notes({ Posses: "pistola blaster, comlink" })
  }),
  c("Captain Typho", {
    cl: 8, sp: "human", fp: 4, cls: [["soldier", 5], ["noble", 3]], ab: [15, 16, 13, 13, 14, 12], def: [25, 22, 23], hp: 70, dt: 22, bab: 7,
    sk: { gatherInformation: 10, initiative: 12, knowledgeTactics: 10, perception: 11, pilot: 12, useComputer: 10 },
    feats: [...ap("light", "medium"), "careful-shot", "deadeye", "improved-defenses", "linguist", "martial-arts-i", "point-blank-shot", "rapid-shot", ...st("gatherInformation"), ...wp("pistols", "rifles", "simple")],
    tal: ["born-leader", "distant-command", "draw-fire", "harms-way", "tough-as-nails"],
    wpn: [["unarmed", 9, "1d6+6"], ["blaster-pistol", 10, "3d6+4"]],
    notes: notes({ Papel: "chefe de segurança de Padmé Amidala, sobrinho do Capitão Panaka; perdeu o olho esquerdo em Naboo", "Rapid Shot": "pistola +8 (4d6+4)", Posses: "pistola blaster, colete de proteção, comlink" })
  }),
  c("Bounty Hunter (Threats)", {
    cl: 10, fp: 4, ds: 4, cls: [["nonheroic", 3], ["scout", 4], ["bounty-hunter", 5]], ab: [15, 17, 14, 12, 12, 8], def: [26, 24, 20], hp: 82, dt: 24, bab: 10,
    sk: { climb: 13, endurance: 13, gatherInformation: 10, knowledgeGalacticLore: 12, perception: 12, survival: 12 },
    feats: [...ap("light"), ...st("climb", "endurance", "knowledgeGalacticLore", "perception"), "pin", "trip", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["acute-senses", "expert-tracker", "hunters-mark", "hunters-target", "nowhere-to-hide"],
    wpn: [["vibroblade", 12, "2d6+6"], ["blaster-carbine", 13, "3d8+4"], ["blaster-pistol", 13, "3d6+4"], ["stun-grenade", 13, "4d6+4"]],
    notes: notes({ Qualidades: "familiar foe +2", Rerrolagens: "Gather Information (localizar alguém) e Perception, ficando com o segundo resultado", Posses: "vibrolâmina, carabina blaster, pistola blaster, 4 granadas de atordoamento, comlink criptografado, chip com 50 créditos, eletrobinóculos, bastão de luz, traje de voo, kit de campo, algemas, cinto" })
  }),
  c("Aurra Sing", {
    cl: 12, sp: "human", fp: 6, dest: 1, ds: 12, cls: [["scoundrel", 3], ["jedi", 2], ["scout", 4], ["bounty-hunter", 3]], ab: [13, 16, 14, 13, 14, 14], def: [29, 27, 25], hp: 94, dt: 27, bab: 10,
    sk: { acrobatics: 14, gatherInformation: 13, initiative: 14, knowledgeGalacticLore: 12, perception: 13, persuasion: 13, pilot: 14, stealth: 14, survival: 12, useTheForce: 13 },
    feats: ["careful-shot", "dual-weapon-mastery-i", "force-sensitivity", "force-training", "melee-defense", "point-blank-shot", "rapid-strike", "running-attack", ...st("pilot", "survival", "useTheForce"), ...wp("lightsabers", "pistols", "rifles", "simple")],
    tal: ["acute-senses", "elusive-target", "improved-initiative", "force-perception", "gauge-force-potential", "skirmisher", "sneak-attack"],
    pow: { "battle-strike": 1, "force-slam": 1, "move-object": 1 },
    wpn: [["lightsaber", 11, "2d8+7"], ["slugthrower-rifle", 13, "2d8+6"], ["blaster-pistol", 13, "3d6+6"]],
    notes: notes({ Espécie: "quase-humana (Palliduvan)", "Rapid Strike": "sabre +9 (3d8+7)", "Duas pistolas": "+8 (3d6+6) e +8 (3d6+6)", Qualidades: "familiar foe +1", Rerrolagens: "Initiative, Knowledge (galactic lore), Perception e Stealth, ficando com o segundo resultado",
      "Rhen-Orm Biocomputer": "implante na cabeça: ao rastrear com Survival, soma os Pontos da Força do alvo como bônus de equipamento (prótese cibernética)",
      Posses: "5 sabres de luz, rifle slugthrower com 4 pentes, 2 pistolas blaster, cinto, traje de voo, biocomputador Rhen-Orm, swoop, runner de bloqueio corelliano" })
  }),
  c("Bossk", {
    cl: 12, sp: "trandoshan", fp: 4, ds: 3, cls: [["scout", 5], ["soldier", 3], ["bounty-hunter", 4]], ab: [18, 17, 16, 12, 12, 13], def: [30, 28, 23], hp: 128, dt: 28, bab: 10,
    sk: { endurance: 14, initiative: 9, knowledgeGalacticLore: 12, mechanics: 12, perception: 12, pilot: 14, stealth: 14, survival: 12 },
    feats: [...ap("light"), "dodge", "exotic-weapon-proficiency:flamethrower", "point-blank-shot", "rapid-shot", "shake-it-off", ...st("endurance"), "toughness", "vehicular-combat", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["acute-senses", "armored-defense", "demolitionist", "hunters-mark", "hunters-target", "improved-initiative", "uncanny-dodge-i"],
    wpn: [["unarmed", 14, "1d4+10"], ["blaster-rifle", 13, "3d8+6"], ["flamethrower", 13, "3d6+6"], ["stun-grenade", 13, "4d6+6"], ["sporting-blaster-pistol", 13, "2d4+6"]],
    armor: "flight-suit-padded",
    notes: notes({ "Rapid Shot": "rifle +11 (4d8+6); pistola esportiva +11 (3d4+6)", Qualidades: "familiar foe +2, regeneração de membros", Rerrolagens: "Initiative e Perception (segundo resultado)", Posses: "rifle blaster, lança-chamas com 2 cartuchos, lança-granadas com 10 de atordoamento, pistola esportiva, traje de voo acolchoado (+3), algemas, cinto, a nave Hound's Tooth" })
  }),
  c("Jango Fett", {
    cl: 15, sp: "human", fp: 8, dest: 1, ds: 8, cls: [["scout", 3], ["scoundrel", 3], ["soldier", 3], ["gunslinger", 3], ["bounty-hunter", 2], ["elite-trooper", 1]], ab: [15, 18, 15, 13, 14, 13], def: [37, 33, 29], hp: 104, dt: 33, bab: 13,
    sk: { endurance: 14, initiative: 16, knowledgeTactics: 14, mechanics: 14, perception: 16, persuasion: 8, pilot: 16, stealth: 16, survival: 14 },
    feats: [...ap("light", "medium"), "careful-shot", "deadeye", "dual-weapon-mastery-i", "martial-arts-i", "point-blank-shot", "precise-shot", "quick-draw", "rapid-shot", "shake-it-off", "triple-crit:pistols", "vehicular-combat", ...wp("pistols", "rifles", "simple")],
    tal: ["acute-senses", "armored-defense", "exotic-weapon-mastery", "improved-armored-defense", "improved-initiative", "improved-quick-draw", "knack", "lucky-shot", "notorious", "trigger-work"],
    wpn: [["combat-gloves", 15, "1d6+3"], ["blaster-pistol", 17, "4d6+8"], [{ base: "flamethrower", name: "Flamethrower Gauntlet" }, 17, "3d6+7"], [{ base: "missile-launcher", name: "Jetpack Missile Launcher" }, 17, "6d6+7"]],
    notes: notes({ Sentidos: "visão na penumbra", Deslocamento: "6; voo 6 (jetpack)", "Rapid Shot": "pistola +17 (4d6+8)", "Duas pistolas": "+14 (4d6+8) e +14 (4d6+8)",
      "Outras armas": "rocket dart +17 (3d6+7); saberdart +17 (1d4+7 e veneno); whipcord +17 (agarrar)",
      Saberdart: "veneno 1d20+15 contra a Fortitude: 2d6 e −2 passos (ao errar, metade e −1 passo); no fim da trilha morre; repete a cada rodada até Treat Injury CD 25",
      "Antisecurity Blades": "+2 de equipamento em Mechanics para desativar dispositivos", Qualidades: "delay damage, familiar foe +1, trusty sidearm +1",
      Rerrolagens: "Initiative, Knowledge (tactics) e Perception (segundo resultado); Persuasion ao intimidar",
      Posses: "luvas de combate, 2 pistolas, manopla lança-chamas, lança-dardos, saberdarts, whipcord, armadura mandaloriana (+8 de armadura, +3 de equipamento), traje de voo, jetpack com lança-mísseis, lâminas antissegurança, Slave I" })
  }),
  c("Brute", {
    cl: 1, ds: 4, cls: [["nonheroic", 3]], ab: [11, 13, 12, 8, 9, 10], def: [11, 11, 9], hp: 9, dt: 11, bab: 2,
    sk: { initiative: 7, perception: 0 },
    feats: ["toughness", "weapon-focus:rifles", ...wp("pistols", "rifles", "simple")],
    wpn: [["unarmed", 2, "1d4"], ["blaster-carbine", 4, "3d6"]],
    notes: notes({ Uso: "membro de gangue, soldado do crime ou miliciano (sem Dark Side)", Posses: "carabina blaster, roupas de durão" })
  }),
  c("Bureaucrat", {
    cl: 1, cls: [["nonheroic", 3]], ab: [9, 10, 8, 12, 11, 14], def: [10, 9, 10], hp: 6, dt: 9, bab: 2,
    sk: { initiative: 1, deception: 8, knowledgeBureaucracy: 12, perception: 6, persuasion: 8, useComputer: 7 },
    feats: [...sf("knowledgeBureaucracy"), ...st("knowledgeBureaucracy", "perception", "useComputer"), ...wp("pistols")],
    wpn: [["unarmed", 1, "1d4-1"], ["blaster-pistol", 2, "3d6"]],
    notes: notes({ Posses: "pistola blaster, comlink, code cylinder, chip com 100 créditos, datapad" })
  }),
  c("Commando", {
    cl: 6, fp: 1, cls: [["nonheroic", 8], ["soldier", 4]], ab: [15, 16, 15, 12, 12, 10], def: [19, 20, 15], hp: 66, dt: 20, bab: 10,
    sk: { initiative: 14, mechanics: 12, perception: 12, stealth: 14 },
    feats: [...ap("light"), "point-blank-shot", "rapid-shot", "rapid-strike", ...st("initiative", "stealth"), ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["indomitable", "tough-as-nails"],
    wpn: [["vibrodagger", 12, "2d4+4"], ["blaster-rifle", 13, "3d8+2"], ["blaster-pistol", 13, "3d6+2"]],
    armor: "flight-suit-armored",
    notes: notes({ "Rapid Strike/Shot": "vibroadaga +10 (3d4+4); rifle +11 (4d8+2); pistola +11 (4d6+2)", Posses: "pistola e rifle blaster, armadura de comando (como traje de voo blindado, +5), comlink seguro" })
  }),
  c("Commando Squad Leader", {
    cl: 10, fp: 1, cls: [["nonheroic", 8], ["soldier", 5], ["officer", 3]], ab: [14, 16, 14, 12, 12, 12], def: [24, 24, 23], hp: 93, dt: 24, bab: 14,
    sk: { initiative: 16, knowledgeTactics: 14, perception: 14, stealth: 16 },
    feats: [...ap("light"), "burst-fire", "point-blank-shot", "rapid-shot", ...st("initiative", "stealth"), ...wp("advanced-melee", "heavy", "pistols", "rifles", "simple")],
    tal: ["armored-defense", "assault-tactics", "indomitable", "tactical-edge", "tough-as-nails"],
    wpn: [["vibrodagger", 16, "2d4+6"], ["blaster-rifle", 17, "3d8+4"], ["blaster-pistol", 17, "3d6+4"]],
    armor: "flight-suit-armored",
    notes: notes({ "Rapid Shot": "rifle +15 (4d8+4); pistola +15 (4d6+4)", "Burst Fire": "rifle +12 (5d8+4)", Qualidades: "command cover, share talent (Tough as Nails)", Posses: "pistola e rifle blaster, armadura de comando (+5), comlink seguro" })
  }),
  c("Elite Commando", {
    cl: 14, fp: 4, cls: [["soldier", 14]], ab: [12, 14, 13, 10, 11, 9], def: [31, 29, 24], hp: 129, dt: 29, bab: 14,
    sk: { endurance: 13, initiative: 14, knowledgeTactics: 12, mechanics: 12, stealth: 14 },
    feats: [...ap("light", "medium"), "burst-fire", "charging-fire", "coordinated-attack", "double-attack:pistols", "point-blank-shot", "precise-shot", ...st("stealth"), "toughness", "triple-crit:rifles", "weapon-focus:rifles", ...wp("advanced-melee", "heavy", "pistols", "rifles", "simple")],
    tal: ["armored-defense", "battle-analysis", "cover-fire", "demolitionist", "demolitionist", "improved-armored-defense", "juggernaut"],
    wpn: [["vibrobayonet", 15, "2d6+8"], ["blaster-pistol", 16, "3d6+7"], ["blaster-rifle", 17, "3d8+7"]],
    armor: "battle-armor",
    notes: notes({ "Fortitude": "+32 contra frio ou calor extremos", "Double Attack": "pistola +11/+11 (3d6+7)", "Burst Fire": "rifle +12 (5d8+7)", Posses: "pistola blaster, rifle blaster com vibrobaioneta, coronha dobrável e mira, armadura de batalha (+8, +2 de equipamento), carga explosiva, 2 blocos de detonite com timers, comlink seguro, kit de campo, bastão de luz, medpac, cinto" })
  }),
  c("Con Artist", {
    cl: 3, fp: 1, ds: 1, cls: [["nonheroic", 3], ["scoundrel", 2]], ab: [8, 12, 9, 14, 10, 12], def: [15, 11, 13], hp: 11, dt: 11, bab: 3,
    sk: { deception: 13, gatherInformation: 8, initiative: 8, perception: 8, persuasion: 13 },
    feats: ["melee-defense", "point-blank-shot", ...sf("deception", "persuasion"), ...st("initiative"), ...wp("pistols", "simple")],
    tal: ["disruptive"],
    wpn: [["knife", 2, "1d4"], ["hold-out-blaster", 4, "3d4+1"]],
    notes: notes({ Posses: "faca, hold-out, ferramentas de trapaça, code cylinder, coldre oculto, chip com 200 créditos" })
  }),
  c("Crime Lord", {
    cl: 12, fp: 2, ds: 14, cls: [["noble", 7], ["scoundrel", 2], ["crime-lord", 3]], ab: [10, 12, 8, 16, 14, 18], def: [26, 22, 29], hp: 47, dt: 29, bab: 8,
    sk: { initiative: 7, deception: 20, gatherInformation: 20, knowledgeBureaucracy: 14, knowledgeGalacticLore: 14, perception: 18, persuasion: 20, pilot: 12, ride: 12, useComputer: 14 },
    feats: ["improved-defenses", "improved-disarm", "linguist", "melee-defense", "point-blank-shot", ...sf("deception", "gatherInformation", "perception", "persuasion"), "weapon-focus:advancedMelee", ...wp("advanced-melee", "pistols", "simple")],
    tal: ["attract-minion", "born-leader", "connections", "distant-command", "educated", "inspire-fear-i", "notorious", "sneak-attack"],
    wpn: [["vibroblade", 9, "2d6+6"], ["sporting-blaster-pistol", 9, "3d4+6"]],
    notes: notes({ Qualidades: "command cover", Rerrolagem: "Persuasion ao intimidar (segundo resultado)", Posses: "blaster esportivo, vibrolâmina antiga, datapad, comlink criptografado, capangas (incluindo um subordinado de 8º nível), roupas finas, 5.000 créditos" })
  }),
  c("Black Sun Vigo", {
    cl: 14, sp: "rodian", fp: 3, ds: 10, cls: [["soldier", 6], ["scoundrel", 1], ["crime-lord", 7]], ab: [10, 16, 10, 16, 12, 12], def: [29, 29, 29], hp: 92, dt: 26, bab: 11,
    sk: { acrobatics: 15, deception: 18, gatherInformation: 18, initiative: 15, knowledgeGalacticLore: 15, perception: 13, persuasion: 13, survival: 18 },
    feats: ["acrobatic-strike", "combat-reflexes", "double-attack:pistols", "point-blank-shot", ...sf("deception", "gatherInformation", "persuasion", "survival"), ...st("gatherInformation"), "weapon-focus:pistols", ...wp("pistols", "rifles", "simple")],
    tal: ["attract-minion", "attract-minion", "gun-club", "indomitable", "inspire-fear-i", "inspire-fear-ii", "notorious", "presence", "sneak-attack", "weaken-resolve", "weapon-specialization:pistols"],
    wpn: [[{ base: "heavy-blaster-pistol", name: "Pistol Whip" }, 11, "1d6+7"], ["heavy-blaster-pistol", 14, "3d8+9"]],
    notes: notes({ "Double Attack": "pistola +9/+9 (3d8+9)", "Pistol whip": "coronhada corpo a corpo", "Sneak Attack": "+1d6", Qualidades: "command cover", Rerrolagem: "Persuasion ao intimidar (segundo resultado)", Posses: "blaster pesado, datapad, comlink criptografado, capangas (vários e 2 subordinados de 11º nível), 2.000 créditos" })
  }),
  c("Black Sun Vigo (Bith)", {
    cl: 14, sp: "bith", fp: 4, ds: 14, cls: [["scoundrel", 7], ["crime-lord", 5], ["gunslinger", 2]], ab: [9, 15, 10, 14, 14, 16], def: [30, 24, 30], hp: 65, dt: 24, bab: 11,
    sk: { acrobatics: 14, deception: 20, gatherInformation: 15, initiative: 14, perception: 14, stealth: 14 },
    feats: ["dual-weapon-mastery-i", "dual-weapon-mastery-ii", "dual-weapon-mastery-iii", "quick-draw", "point-blank-shot", "precise-shot", "running-attack", ...sf("deception"), "weapon-focus:pistols", ...wp("pistols", "simple")],
    tal: ["deceptive-shot", "fools-luck", "impel-ally-i", "impel-ally-ii", "inspire-fear-i", "inspire-fear-ii", "inspire-fear-iii", "knack", "lucky-shot", "skirmisher"],
    wpn: [["unarmed", 10, "1d4+6"], ["heavy-blaster-pistol", 14, "3d8+8"]],
    notes: notes({ Qualidades: "command cover, evolved intellect, heightened awareness, meditative trance, trusty sidearm +1", Posses: "2 pistolas blaster pesadas, comlink, roupas escuras, datapad, 500 créditos" })
  }),
  c("Hutt Crime Lord", {
    cl: 11, sp: "hutt", fp: 3, ds: 13, cls: [["noble", 5], ["scoundrel", 2], ["crime-lord", 4]], ab: [10, 6, 14, 18, 16, 18], def: [21, 24, 29], hp: 90, dt: 29, bab: 7,
    sk: { initiative: 3, deception: 19, gatherInformation: 19, knowledgeBureaucracy: 19, knowledgeGalacticLore: 19, knowledgeSocialSciences: 14, knowledgeTactics: 14, knowledgeTechnology: 14, perception: 18, persuasion: 19, useComputer: 14 },
    feats: ["improved-defenses", "linguist", "point-blank-shot", ...sf("deception", "gatherInformation", "knowledgeBureaucracy", "knowledgeGalacticLore", "perception", "persuasion"), "toughness", ...wp("pistols", "simple")],
    tal: ["attract-minion", "born-leader", "demand-surrender", "fools-luck", "inspire-fear-i", "notorious", "presence", "weaken-resolve"],
    wpn: [["stun-baton", 6, "2d6+5"], ["blaster-pistol", 4, "3d6+5"]],
    notes: notes({ Vontade: "34 contra efeitos que afetam a mente", Qualidades: "command cover, resistência à Força", Rerrolagem: "Persuasion ao intimidar (segundo resultado)", Posses: "pistola blaster, stun baton, capangas (vários e um subordinado de 8º nível)" })
  }),
  c("Dark Jedi", {
    cl: 7, fp: 8, ds: 14, cls: [["jedi", 7]], ab: [13, 14, 11, 10, 14, 15], def: [21, 18, 20], hp: 66, dt: 18, bab: 7,
    sk: { acrobatics: 10, initiative: 5, perception: 5, useTheForce: 15 },
    feats: ["cleave", "force-sensitivity", "force-training", "martial-arts-i", "rapid-strike", ...sf("useTheForce"), "weapon-finesse", ...wp("lightsabers", "simple")],
    tal: ["deflect", "lightsaber-defense", "power-of-the-dark-side", "weapon-specialization:lightsabers"],
    pow: { "battle-strike": 1, "dark-rage": 1, "force-slam": 1 },
    wpn: [["lightsaber", 9, "2d8+6"]],
    notes: notes({ "Rapid Strike": "sabre +7 (3d8+6)", Reflexos: "22 com Lightsaber Defense", Posses: "sabre de luz, túnica escura" })
  }),
  c("The Reborn", {
    cl: 2, sp: "human", ds: 12, cls: [["nonheroic", 6]], ab: [13, 12, 10, 11, 12, 9], def: [12, 12, 11], hp: 19, dt: 12, bab: 4,
    sk: { endurance: 8, initiative: 9, perception: 9, useTheForce: 7 },
    feats: ["dodge", "force-sensitivity", "force-training", ...st("useTheForce"), ...wp("lightsabers", "pistols", "simple")],
    pow: { "battle-strike": 2 },
    wpn: [["lightsaber", 5, "2d8+4"]],
    notes: notes({ Papel: "soldados do Império Renascido, imbuídos artificialmente com a Força por Desann e Hethrir", Posses: "sabre de luz, capa laranja" })
  }),
  c("Dark Jedi Master", {
    cl: 17, fp: 6, dest: 1, ds: 18, cls: [["jedi", 9], ["jedi-knight", 5], ["jedi-master", 3]], ab: [14, 13, 12, 10, 18, 14], def: [32, 30, 31], hp: 135, dt: 30, bab: 17,
    sk: { acrobatics: 14, initiative: 20, perception: 20, useTheForce: 20 },
    feats: ["acrobatic-strike", "dodge", "force-sensitivity", "force-training", "force-training", "force-training", "melee-defense", "rapid-strike", ...sf("useTheForce"), "strong-in-the-force", "triple-crit:lightsabers", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["block", "deflect", "force-intuition", "force-perception", "power-of-the-dark-side", "redirect-shot", "swift-power", "telekinetic-power", "telekinetic-savant", "weapon-specialization:lightsabers",
      "force-point-recovery", "improved-sense-force", "devastating-power", "quicken-power"],
    pow: { "battle-strike": 3, "dark-rage": 1, "force-grip": 2, "force-lightning": 2, "force-slam": 2, "force-thrust": 2, "move-object": 1, rebuke: 1, surge: 1 },
    wpn: [["lightsaber", 21, "2d8+12"]],
    notes: notes({ "Rapid Strike": "sabre +19 (3d8+12)", Imune: "medo", Qualidades: "serenity", Posses: "sabre de luz (feito por ele), túnica Jedi, cinto com medpac" })
  }),
  c("Jerec", {
    cl: 19, sp: "miraluka", fp: 7, dest: 2, ds: 16, cls: [["jedi", 10], ["jedi-knight", 2], ["jedi-master", 2], ["noble", 5]], ab: [16, 17, 15, 14, 16, 16], def: [36, 35, 36], hp: 144, dt: 35, bab: 17,
    sk: { acrobatics: 17, gatherInformation: 17, knowledgeGalacticLore: 16, initiative: 17, perception: 17, persuasion: 17, useTheForce: 17 },
    feats: ["combat-reflexes", "dodge", "double-attack:lightsabers", "force-sensitivity", "force-training", "force-training", "improved-defenses", "linguist", "melee-defense", "quick-draw", "running-attack", ...sf("persuasion"), ...st("gatherInformation"), "strong-in-the-force", ...wp("advanced-melee", "lightsabers", "simple"), "whirlwind-attack"],
    tal: ["block", "connections", "deflect", "drain-knowledge", "force-perception", "lightsaber-defense", "lightsaber-defense", "multiattack-proficiency-lightsabers", "power-of-the-dark-side", "wealth",
      "improved-telepathy", "multitarget-power"],
    pow: { "battle-strike": 1, "dark-rage": 1, farseeing: 1, "force-grip": 1, "force-lightning": 2, "force-slam": 1, "mind-trick": 1, "move-object": 1, "negate-energy": 1, rebuke: 1, surge: 1 },
    wpn: [["lightsaber", 20, "2d8+11"], ["vibroblade", 20, "2d6+11"]],
    notes: notes({ Papel: "ex-Jedi Miraluka que virou Inquisidor imperial e caçou os antigos companheiros", "Double Attack": "sabre +17/+17 (2d8+11)", Reflexos: "38 com Lightsaber Defense", Imune: "medo", Qualidades: "Force sight, serenity", Posses: "sabre de luz (feito por ele), vibrolâmina" })
  }),
  c("Dark Side Adept", {
    cl: 6, fp: 2, ds: 14, cls: [["nonheroic", 3], ["noble", 5]], ab: [8, 10, 10, 12, 14, 13], def: [16, 15, 19], hp: 26, dt: 15, bab: 5,
    sk: { initiative: 4, deception: 10, knowledgeGalacticLore: 10, perception: 11, persuasion: 10, useComputer: 10, useTheForce: 10 },
    feats: ["force-sensitivity", "force-training", "linguist", ...st("knowledgeGalacticLore", "persuasion", "useComputer", "useTheForce"), ...wp("pistols", "simple")],
    tal: ["dark-presence", "power-of-the-dark-side", "presence"],
    pow: { "dark-rage": 1, "mind-trick": 1, surge: 1 },
    wpn: [["knife", 4, "1d4+1"], ["hold-out-blaster", 5, "3d4+2"]],
    notes: notes({ Papel: "cortesão ou burocrata iniciado pelo Imperador no lado sombrio", Posses: "faca, hold-out" })
  }),
  c("Primitive Dark Side Adept", {
    cl: 9, fp: 6, ds: 15, cls: [["scout", 7], ["force-adept", 2]], ab: [9, 11, 14, 14, 15, 15], def: [21, 23, 25], hp: 76, dt: 23, bab: 6,
    sk: { climb: 8, endurance: 11, initiative: 9, jump: 8, perception: 11, stealth: 9, survival: 11, swim: 8, useTheForce: 11 },
    feats: ["dodge", "force-sensitivity", "force-training", "force-training", "mobility", "shake-it-off", ...st("useTheForce"), ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["channel-aggression", "damage-reduction-10", "evasion", "power-of-the-dark-side", "telekinetic-savant"],
    pow: { farseeing: 1, "force-grip": 1, "force-slam": 2, "force-thrust": 1, "move-object": 1 },
    wpn: [["force-pike", 5, "2d8+3"], ["slugthrower-rifle", 6, "2d8+4"]],
    notes: notes({ Técnica: "Force Power Mastery (move object)", Resistência: "Evasion", Posses: "force pike, rifle slugthrower com 3 pentes, túnica escura, fetiche" })
  }),
  c("Desann", {
    cl: 9, sp: "chistori", fp: 6, dest: 1, ds: 14, cls: [["scout", 2], ["jedi", 5], ["force-adept", 2]], ab: [16, 14, 14, 13, 14, 11], def: [23, 23, 25], hp: 65, dt: 23, bab: 7,
    sk: { endurance: 11, initiative: 11, jump: 12, knowledgeGalacticLore: 10, perception: 11, pilot: 11, survival: 11, useTheForce: 9 },
    feats: ["cleave", "force-sensitivity", "force-training", "force-training", "power-attack", "shake-it-off", ...st("initiative", "useTheForce"), ...wp("lightsabers", "pistols", "rifles", "simple")],
    tal: ["evasion", "channel-aggression", "crippling-strike", "force-focus", "power-of-the-dark-side"],
    pow: { "battle-strike": 1, "dark-rage": 1, "force-grip": 1, "force-lightning": 1, "mind-trick": 1, "move-object": 1 },
    wpn: [["lightsaber", 10, "2d8+7"]],
    notes: notes({ Papel: "ex-aluno de Luke Skywalker, líder do Império Renascido", RD: "2 (Armor Plating)", Resistência: "Evasion", Qualidades: "cold-blooded, rage", Posses: "sabre de luz, comlink criptografado, Doomgiver (como Imperial I-class Star Destroyer)" })
  }),
  c("Diplomat", {
    cl: 3, fp: 1, cls: [["nonheroic", 6], ["noble", 1]], ab: [8, 10, 10, 15, 16, 16], def: [11, 11, 16], hp: 19, dt: 11, bab: 4,
    sk: { initiative: 3, deception: 16, knowledgeGalacticLore: 10, knowledgeBureaucracy: 10, perception: 16, persuasion: 16 },
    feats: ["linguist", ...sf("deception", "perception", "persuasion"), ...st("perception"), ...wp("pistols", "simple")],
    tal: ["presence"],
    wpn: [["unarmed", 3, "1d4-1"], ["blaster-pistol", 4, "3d6"]],
    notes: notes({ Posses: "pistola blaster, comlink com holo, datapad, trajes de diplomata" })
  }),
  c("Doctor", {
    cl: 1, cls: [["nonheroic", 3]], ab: [8, 13, 10, 14, 15, 12], def: [11, 10, 12], hp: 9, dt: 10, bab: 2,
    sk: { initiative: 2, knowledgeLifeSciences: 8, perception: 8, treatInjury: 13, useComputer: 8 },
    feats: ["cybernetic-surgery", ...sf("treatInjury"), ...st("perception"), "surgical-expertise", ...wp("pistols")],
    wpn: [["unarmed", 1, "1d4-1"]],
    notes: notes({ Posses: "computador portátil, datapad, fichas de pacientes, kit médico, 2 medpacs, kit cirúrgico, medisensor MDS-50" })
  }),
  c("Emergency Crew Member", {
    cl: 1, cls: [["nonheroic", 4]], ab: [12, 11, 11, 12, 10, 8], def: [14, 11, 10], hp: 9, dt: 11, bab: 3,
    sk: { initiative: 1, perception: 1, knowledgeTechnology: 7, mechanics: 12, useComputer: 7 },
    feats: [...ap("light", "medium"), "coordinated-attack", ...sf("mechanics"), ...wp("pistols")],
    wpn: [["unarmed", 4, "1d4+1"], ["blaster-pistol", 3, "3d6"]],
    armor: "combat-jumpsuit",
    notes: notes({ Posses: "pistola blaster, macacão de combate (+4), comlink, datapad, code cylinder, extintor, sensor de calor, fita de malha, kit de ferramentas, cinto, coldre" })
  }),
  c("Engineer", {
    cl: 2, fp: 2, cls: [["nonheroic", 3], ["scoundrel", 1]], ab: [10, 12, 10, 14, 11, 10], def: [16, 12, 12], hp: 12, dt: 12, bab: 2,
    sk: { initiative: 3, perception: 2, knowledgeTechnology: 9, mechanics: 14, useComputer: 14 },
    feats: [...ap("light"), "linguist", ...sf("mechanics", "useComputer"), "tech-specialist", ...wp("simple")],
    tal: ["gimmick"],
    wpn: [["stun-baton", 2, "2d6"]],
    armor: "flight-suit-padded",
    notes: notes({ "Stun baton": "dano de atordoamento", Posses: "stun baton, traje de voo acolchoado (+3), comlink, code cylinder, datacards, datapad, lanterna de fusão, computador portátil, fita de malha, kit de ferramentas, cinto" })
  }),
  c("Gambler", {
    cl: 4, fp: 7, cls: [["scoundrel", 4]], ab: [8, 14, 10, 12, 14, 15], def: [18, 14, 17], hp: 25, dt: 14, bab: 3,
    sk: { initiative: 4, deception: 14, gatherInformation: 9, knowledgeGalacticLore: 8, perception: 14, persuasion: 9, stealth: 9 },
    feats: ["point-blank-shot", "quick-draw", ...sf("deception", "perception"), ...st("gatherInformation"), ...wp("pistols", "simple")],
    tal: ["fools-luck", "gambler"],
    wpn: [["unarmed", 2, "1d4+1"], ["hold-out-blaster", 5, "3d4+2"]],
    notes: notes({ Posses: "hold-out, comlink, roupas caras" })
  }),
  c("Infiltrator", {
    cl: 9, fp: 2, ds: 2, cls: [["scout", 5], ["scoundrel", 4]], ab: [15, 17, 10, 14, 12, 8], def: [25, 20, 21], hp: 56, dt: 20, bab: 6,
    sk: { acrobatics: 17, climb: 11, deception: 8, initiative: 7, jump: 16, mechanics: 10, perception: 10, stealth: 17, useComputer: 15 },
    feats: ["martial-arts-i", "point-blank-shot", "precise-shot", ...sf("acrobatics", "stealth", "useComputer"), ...st("acrobatics", "deception", "useComputer"), ...wp("pistols", "rifles", "simple")],
    tal: ["fools-luck", "hidden-movement", "improved-stealth", "knack", "total-concealment"],
    wpn: [["unarmed", 8, "1d6+6"], ["hold-out-blaster", 9, "3d4+4"]],
    notes: notes({ Rerrolagem: "Stealth (segundo resultado)", Posses: "hold-out, coldre oculto, kit de segurança, comlink criptografado, cinto miniaturizado, syntherope, chamador de droide" })
  }),
  c("Information Broker", {
    cl: 5, fp: 3, cls: [["nonheroic", 3], ["scoundrel", 4]], ab: [13, 13, 10, 14, 11, 13], def: [17, 14, 15], hp: 23, dt: 14, bab: 5,
    sk: { initiative: 4, deception: 9, gatherInformation: 14, perception: 8, persuasion: 9, stealth: 9, useComputer: 10 },
    feats: ["point-blank-shot", "precise-shot", "rapid-shot", ...sf("gatherInformation"), ...st("deception", "stealth", "useComputer"), ...wp("pistols", "simple")],
    tal: ["gimmick", "knack"],
    wpn: [["knife", 6, "1d4+3"], ["hold-out-blaster", 6, "3d4+2"], ["blaster-pistol", 6, "3d6+2"]],
    notes: notes({ Percepção: "+9 no cabeçalho do livro, +8 na lista de perícias (usado +8)", "Rapid Shot": "hold-out +4 (4d4+2); pistola +4 (4d6+2)", Posses: "faca, hold-out, pistola blaster, comlink, misturador de voz, code cylinder, chip com 200 créditos, 400 créditos sem registro, computador portátil, eletrobinóculos, holocâmera, cinto, coldre, coldre oculto" })
  }),
  c("Jedi Knight (Threats)", {
    cl: 12, fp: 6, cls: [["jedi", 7], ["jedi-knight", 5]], ab: [12, 14, 14, 12, 16, 10], def: [26, 26, 27], hp: 104, dt: 26, bab: 12,
    sk: { acrobatics: 13, endurance: 13, initiative: 13, perception: 9, useTheForce: 11 },
    feats: ["cleave", "double-attack:lightsabers", "force-sensitivity", "force-training", "force-training", "power-attack", "rapid-strike", ...st("endurance"), "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["battle-meditation", "deflect", "force-fortification", "lightsaber-defense", "multiattack-proficiency-lightsabers", "redirect-shot", "soresu",
      "force-point-recovery", "force-power-mastery:mind-trick"],
    pow: { "battle-strike": 2, farseeing: 1, "force-thrust": 1, "mind-trick": 1, "move-object": 1, surge: 2 },
    wpn: [["lightsaber", 15, "2d8+7"]],
    notes: notes({ "Rapid Strike": "sabre +13 (3d8+7)", "Double Attack": "sabre +12/+12 (2d8+7)", Reflexos: "27 com Lightsaber Defense", Qualidades: "build lightsaber", Posses: "sabre de luz (feito por ele), comlink criptografado, túnica Jedi" })
  }),
  c("Jedi Refugee", {
    cl: 12, fp: 5, cls: [["jedi", 7], ["scoundrel", 2], ["jedi-knight", 3]], ab: [10, 14, 10, 14, 14, 16], def: [26, 24, 26], hp: 86, dt: 24, bab: 10,
    sk: { deception: 14, initiative: 13, knowledgeGalacticLore: 13, perception: 13, useTheForce: 14 },
    feats: ["combat-reflexes", "dodge", "force-sensitivity", "force-training", "force-training", "force-training", "improved-disarm", "melee-defense", "rapid-strike", ...st("deception"), ...wp("lightsabers", "pistols", "simple")],
    tal: ["block", "clear-mind", "dastardly-strike", "deflect", "force-fortification", "force-haze", "shii-cho", "improved-sense-force"],
    pow: { "battle-strike": 1, farseeing: 1, "force-disarm": 1, "force-stun": 1, "mind-trick": 1, "move-object": 1, rebuke: 1, surge: 2 },
    wpn: [["lightsaber", 11, "2d8+6"]],
    notes: notes({ "Rapid Strike": "sabre +9 (3d8+6)", Rerrolagem: "Use the Force para evitar detecção pela Força (segundo resultado)", Qualidades: "build lightsaber", Posses: "sabre de luz (feito por ele), roupas largas, comlink" })
  }),
  c("Jedi Duelist", {
    cl: 13, fp: 6, cls: [["jedi", 7], ["jedi-knight", 6]], ab: [15, 17, 10, 10, 18, 10], def: [28, 25, 29], hp: 90, dt: 25, bab: 13,
    sk: { acrobatics: 14, initiative: 14, perception: 10, useTheForce: 11 },
    feats: ["acrobatic-strike", "double-attack:lightsabers", "force-sensitivity", "force-training", "force-training", "force-training", "mighty-swing", "rapid-strike", ...st("acrobatics"), "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["ataru", "block", "deflect", "greater-weapon-focus:lightsabers", "greater-weapon-specialization:lightsabers", "redirect-shot", "weapon-specialization:lightsabers",
      "force-point-recovery", "improved-force-trance", "improved-sense-force"],
    pow: { "battle-strike": 3, "force-disarm": 1, "force-slam": 1, "force-thrust": 1, "negate-energy": 1, rebuke: 1, surge: 2 },
    wpn: [["lightsaber", 18, "2d8+13"]],
    notes: notes({ "Rapid Strike": "sabre +16 (3d8+13)", "Mighty Swing": "sabre +18 (3d8+13)", "Double Attack": "sabre +13/+13 (2d8+13)", Qualidades: "build lightsaber; mestre de Ataru", Posses: "túnica Jedi, sabre de luz (feito por ele)" })
  }),
  c("Imperial Knight", {
    cl: 10, sp: "human", fp: 6, ds: 3, cls: [["jedi", 7], ["jedi-knight", 3]], ab: [16, 14, 16, 10, 15, 10], def: [29, 28, 24], hp: 109, dt: 28, bab: 10,
    sk: { endurance: 13, initiative: 12, useTheForce: 10 },
    feats: [...ap("light", "medium"), "force-sensitivity", "force-training", "improved-defenses", "power-attack", "powerful-charge", "rapid-strike", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["armored-defense", "battle-meditation", "deflect", "equilibrium", "improved-armored-defense", "redirect-shot", "force-point-recovery"],
    pow: { "battle-strike": 1, "force-slam": 1, rebuke: 1, surge: 1 },
    wpn: [["lightsaber", 15, "2d8+9"]],
    armor: "battle-armor",
    notes: notes({ Papel: "cavaleiro leal ao Imperador Roan Fel (era Legado), sabre prateado e armadura vermelha", "Rapid Strike": "sabre +13 (3d8+9)", "Power Attack": "+11 (2d8+17); com Powerful Charge e Rapid Strike +13 (3d8+22) — inclui 4 pontos de Power Attack", Qualidades: "build lightsaber", "Cortosis Gauntlet": "ver o item: pode desativar um sabre de luz que o ataque", Posses: "sabre de luz, armadura de batalha (+8, +2 de equipamento), comlink, manopla de cortosis" })
  }),
  c("Jedi Master (Threats)", {
    cl: 15, fp: 6, cls: [["jedi", 7], ["jedi-knight", 5], ["jedi-master", 3]], ab: [12, 14, 14, 12, 16, 10], def: [30, 30, 31], hp: 137, dt: 30, bab: 15,
    sk: { acrobatics: 14, endurance: 14, initiative: 14, perception: 10, useTheForce: 12 },
    feats: ["cleave", "double-attack:lightsabers", "force-sensitivity", "force-training", "force-training", "force-training", "power-attack", "rapid-strike", ...st("endurance"), "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["battle-meditation", "damage-reduction-10", "deflect", "force-focus", "force-fortification", "lightsaber-defense", "multiattack-proficiency-lightsabers", "redirect-shot", "soresu",
      "force-point-recovery", "force-power-mastery:mind-trick", "distant-power", "quicken-power"],
    pow: { "battle-strike": 3, farseeing: 1, "force-thrust": 1, "mind-trick": 2, "move-object": 1, rebuke: 1, surge: 2, "vital-transfer": 1 },
    wpn: [["lightsaber", 18, "2d8+8"]],
    notes: notes({ "Rapid Strike": "sabre +16 (3d8+8)", "Double Attack": "sabre +15/+15 (2d8+8)", Reflexos: "31 com Lightsaber Defense", Qualidades: "build lightsaber, fearless, serenity", Posses: "sabre de luz (feito por ele), comlink criptografado, túnica Jedi" })
  }),
  c("Jedi Sage Master", {
    cl: 15, fp: 6, dest: 1, cls: [["jedi", 7], ["jedi-knight", 5], ["jedi-master", 3]], ab: [10, 12, 8, 17, 16, 15], def: [29, 28, 32], hp: 92, dt: 28, bab: 15,
    sk: { endurance: 11, initiative: 8, knowledgeGalacticLore: 20, knowledgeLifeSciences: 20, knowledgePhysicalSciences: 15, perception: 19, persuasion: 19, useTheForce: 19 },
    feats: ["force-sensitivity", "force-training", "force-training", "force-training", "improved-disarm", "linguist", "melee-defense", ...sf("knowledgeGalacticLore", "knowledgePhysicalSciences", "useTheForce"), "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["adept-negotiator", "force-focus", "force-perception", "force-persuasion", "foresight", "gauge-force-potential", "master-negotiator", "skilled-advisor", "visions",
      "improved-sense-force", "improved-telepathy", "distant-power", "multitarget-power"],
    pow: { farseeing: 1, "force-disarm": 1, "force-stun": 1, "mind-trick": 2, "move-object": 1, "negate-energy": 1, rebuke: 2, "sever-force": 1, "vital-transfer": 1 },
    wpn: [["lightsaber", 16, "2d8+7"]],
    notes: notes({ Papel: "estudioso do Templo Jedi; as perícias de Knowledge podem ser trocadas por outras especialidades", Qualidades: "build lightsaber, fearless, serenity", Posses: "sabre de luz (feito por ele), túnica Jedi" })
  }),
  c("Jedi Battlemaster", {
    cl: 15, fp: 5, cls: [["jedi", 8], ["jedi-knight", 5], ["jedi-master", 2]], ab: [16, 14, 12, 10, 14, 14], def: [30, 29, 30], hp: 122, dt: 29, bab: 15,
    sk: { acrobatics: 14, endurance: 13, initiative: 19, useTheForce: 14 },
    feats: ["double-attack:lightsabers", "force-sensitivity", "force-training", "power-attack", "rapid-strike", ...sf("initiative"), ...st("acrobatics", "endurance"), "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["block", "deflect", "greater-weapon-focus:lightsabers", "greater-weapon-specialization:lightsabers", "juyo", "lightsaber-defense", "redirect-shot", "weapon-specialization:lightsabers",
      "force-point-recovery", "force-point-recovery", "multitarget-power"],
    pow: { "battle-strike": 3, "force-slam": 2, "move-object": 1, surge: 3 },
    wpn: [["lightsaber", 21, "2d8+14"]],
    notes: notes({ "Rapid Strike": "sabre +19 (3d8+14)", "Double Attack": "sabre +16/+16 (2d8+14)", Reflexos: "31 com Lightsaber Defense", Qualidades: "build lightsaber, fearless, serenity", Posses: "sabre de luz (feito por ele), túnica Jedi" })
  }),
  c("Jedi Sentinel Master", {
    cl: 16, fp: 6, cls: [["jedi", 7], ["jedi-knight", 5], ["jedi-master", 4]], ab: [8, 12, 10, 14, 16, 18], def: [31, 30, 33], hp: 112, dt: 30, bab: 16,
    sk: { endurance: 13, initiative: 9, knowledgeGalacticLore: 15, perception: 22, pilot: 14, useTheForce: 22 },
    feats: ["force-sensitivity", "force-training", "force-training", "force-training", "improved-defenses", "melee-defense", ...sf("useTheForce"), ...st("initiative"), "strong-in-the-force", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["clear-mind", "dark-side-sense", "dark-side-scourge", "force-focus", "force-fortification", "force-perception", "foresight", "resist-the-dark-side", "visions",
      "improved-sense-force", "improved-sense-surroundings", "devastating-power", "quicken-power"],
    pow: { "battle-strike": 1, farseeing: 1, "force-disarm": 1, "force-slam": 1, "mind-trick": 2, "move-object": 1, rebuke: 2, "sever-force": 2, surge: 1 },
    wpn: [["lightsaber", 17, "2d8+7"]],
    notes: notes({ Rerrolagens: "Use the Force para evitar detecção e para sentir oponentes com Dark Side 1+ (segundo resultado)", Qualidades: "build lightsaber, fearless, serenity", Posses: "sabre de luz (feito por ele), túnica Jedi" })
  }),
  c("Jedi Padawan", {
    cl: 5, fp: 7, cls: [["jedi", 5]], ab: [10, 14, 12, 13, 12, 12], def: [18, 17, 17], hp: 57, dt: 17, bab: 5,
    sk: { acrobatics: 9, initiative: 4, perception: 8, pilot: 9, useTheForce: 8 },
    feats: ["force-sensitivity", "force-training", "rapid-strike", ...st("pilot"), "weapon-finesse", ...wp("lightsabers", "simple")],
    tal: ["deflect", "equilibrium", "telekinetic-savant"],
    pow: { "move-object": 1, surge: 1 },
    wpn: [["lightsaber", 7, "2d8+2"]],
    notes: notes({ "Rapid Strike": "sabre +5 (3d8+2)", Posses: "sabre de luz, túnica de Padawan, comlink" })
  }),
  c("Jensaarai Defender", {
    cl: 8, fp: 5, ds: 1, cls: [["jedi", 5], ["soldier", 3]], ab: [16, 14, 14, 8, 12, 12], def: [25, 22, 20], hp: 85, dt: 22, bab: 8,
    sk: { initiative: 11, perception: 5, useTheForce: 10 },
    feats: [...ap("light", "medium"), "force-sensitivity", "force-training", "force-training", "mighty-swing", ...st("initiative"), "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["armored-defense", "attune-armor", "block", "deflect", "improved-armored-defense"],
    pow: { "battle-strike": 2, "force-slam": 1, surge: 1 },
    wpn: [["lightsaber", 13, "2d8+6"]],
    armor: "ceremonial-armor",
    notes: notes({ Papel: "guerreiro da tradição Jensaarai de Suarbi 7/5, com armadura cerimonial personalizada", Deslocamento: "4 quadrados (armadura)", "Mighty Swing": "sabre +11 (3d8+6)", Posses: "armadura cerimonial (+7), sabre de luz, comlink, 100 créditos" })
  }),
  c("Martial Artist", {
    cl: 7, fp: 2, cls: [["soldier", 7]], ab: [16, 14, 14, 13, 10, 8], def: [23, 21, 17], hp: 77, dt: 21, bab: 7,
    sk: { acrobatics: 10, endurance: 10, initiative: 10, jump: 11, perception: 8 },
    feats: [...ap("light", "medium"), "martial-arts-i", "martial-arts-ii", "martial-arts-iii", "melee-defense", ...st("acrobatics"), ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["expert-grappler", "melee-smash", "stunning-strike", "unbalance-opponent"],
    wpn: [["combat-gloves", 10, "1d10+8"], ["force-pike", 10, "2d8+7"]],
    notes: notes({ "Artes marciais": "ataques desarmados contam como armas simples para feats e talentos (luvas de combate continuam sendo ataque desarmado)", Posses: "force pike, luvas de combate, cinto com medpac" })
  }),
  c("Master of Teräs Käsi", {
    cl: 14, fp: 2, dr: 3, cls: [["soldier", 7], ["elite-trooper", 7]], ab: [18, 16, 14, 13, 10, 8], def: [32, 30, 24], hp: 129, dt: 30, bab: 14,
    sk: { acrobatics: 15, endurance: 14, initiative: 15, perception: 12 },
    feats: [...ap("light", "medium"), "double-attack:simple", "martial-arts-i", "martial-arts-ii", "martial-arts-iii", "point-blank-shot", "rapid-strike", "weapon-focus:simple", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["expert-grappler", "melee-smash", "stunning-strike", "teras-kasi-basics", "teras-kasi-mastery", "unarmed-counterstrike", "unarmed-parry", "unbalance-opponent"],
    wpn: [["combat-gloves", 19, "2d10+13"]],
    notes: notes({ "Rapid Strike": "+17 (3d10+13)", "Double Attack": "+14/+14 (2d10+13)", Qualidades: "redução de dano 3, delay damage", Posses: "luvas de combate, cinto com medpac" })
  }),
  c("Medic", {
    cl: 3, fp: 5, cls: [["nonheroic", 6], ["soldier", 1]], ab: [10, 10, 10, 12, 13, 12], def: [15, 13, 12], hp: 29, dt: 13, bab: 5,
    sk: { initiative: 8, perception: 4, knowledgeTactics: 9, treatInjury: 14 },
    feats: [...ap("light"), ...sf("treatInjury"), ...st("knowledgeTactics"), "toughness", ...wp("pistols", "rifles", "simple")],
    tal: ["battle-analysis"],
    wpn: [["knife", 5, "1d4"], ["blaster-carbine", 5, "3d8"], ["blaster-pistol", 5, "3d6"]],
    armor: "combat-jumpsuit",
    notes: notes({ Posses: "faca, pistola blaster, carabina blaster, 2 granadas de atordoamento, macacão de combate (+4), comlink, kit de campo, kit médico, 2 medpacs FastFlesh, coldre" })
  }),
  c("Mercenary Soldier", {
    cl: 3, fp: 5, ds: 1, cls: [["nonheroic", 6], ["soldier", 1]], ab: [12, 12, 11, 10, 10, 10], def: [17, 14, 12], hp: 22, dt: 14, bab: 5,
    sk: { endurance: 8, initiative: 9, perception: 3 },
    feats: [...ap("light"), "coordinated-attack", "improved-defenses", ...st("endurance"), ...wp("pistols", "rifles", "simple")],
    tal: ["combined-fire-mercenary"],
    wpn: [["combat-gloves", 6, "1d4+2"], ["blaster-rifle", 6, "3d8"], ["frag-grenade", 6, "4d6"]],
    armor: "combat-jumpsuit",
    notes: notes({ Posses: "luvas de combate, rifle blaster, granada de fragmentação, macacão de combate (+4), comlink, kit de campo, insígnia da companhia" })
  }),
  c("Mercenary Scout", {
    cl: 3, fp: 5, ds: 1, cls: [["nonheroic", 3], ["scout", 2]], ab: [11, 14, 11, 12, 12, 10], def: [18, 13, 13], hp: 18, dt: 13, bab: 3,
    sk: { initiative: 9, perception: 8, stealth: 9, survival: 8 },
    feats: ["far-shot", "point-blank-shot", ...st("initiative", "survival"), ...wp("pistols", "rifles", "simple")],
    tal: ["improved-stealth"],
    wpn: [["knife", 3, "1d4+1"], ["sporting-blaster-pistol", 5, "3d4+1"], ["sporting-blaster-rifle", 5, "3d6+1"]],
    armor: "combat-jumpsuit",
    notes: notes({ Rerrolagem: "Stealth (segundo resultado)", Posses: "faca, pistola esportiva, rifle esportivo com mira, macacão de combate (+4), comlink criptografado, eletrobinóculos, kit de campo, fita de malha, cinto" })
  }),
  c("Mercenary Heavy Infantry", {
    cl: 4, fp: 5, cls: [["soldier", 4]], ab: [14, 14, 12, 11, 13, 11], def: [21, 18, 14], hp: 50, dt: 18, bab: 4,
    sk: { endurance: 8, initiative: 9, mechanics: 7, perception: 8 },
    feats: [...ap("light", "medium"), "coordinated-attack", "rapid-shot", ...st("mechanics"), "weapon-focus:rifles", ...wp("pistols", "rifles", "simple")],
    tal: ["devastating-attack:rifles", "weapon-specialization:rifles"],
    wpn: [["combat-gloves", 6, "1d4+5"], ["heavy-blaster-pistol", 6, "3d8+2"], ["heavy-blaster-rifle", 7, "3d8+4"]],
    armor: "battle-armor",
    notes: notes({ "Rapid Shot": "pistola +4 (4d8+2); rifle +5 (4d8+4)", Posses: "luvas de combate, pistola e rifle blaster pesados, 2 cargas explosivas com timers, armadura de batalha (+8, +2 de equipamento), comlink, eletrobinóculos, kit de campo" })
  }),
  c("Mercenary Captain", {
    cl: 5, fp: 8, ds: 1, cls: [["soldier", 2], ["noble", 3]], ab: [12, 14, 12, 13, 13, 14], def: [21, 20, 18], hp: 56, dt: 20, bab: 4,
    sk: { endurance: 8, initiative: 9, knowledgeTactics: 13, perception: 10 },
    feats: [...ap("light", "medium"), "dual-weapon-mastery-i", "linguist", ...sf("knowledgeTactics"), "toughness", "weapon-focus:pistols", ...wp("pistols", "rifles", "simple")],
    tal: ["battle-analysis", "born-leader", "distant-command"],
    wpn: [["combat-gloves", 5, "1d4+3"], ["heavy-blaster-pistol", 7, "3d8+2"], ["blaster-pistol", 2, "3d6+2"]],
    armor: "battle-armor",
    notes: notes({ Sentidos: "visão na penumbra", "Duas armas": "pistola pesada +2 (3d8+2) e pistola +2 (3d6+2)", Posses: "luvas de combate, pistola blaster pesada, pistola blaster, armadura de batalha (+8, +2) com pacote de capacete, eletrobinóculos, kit de campo, cinto" })
  }),
  c("Mystic", {
    cl: 4, fp: 4, cls: [["nonheroic", 6], ["scout", 3]], ab: [8, 10, 14, 14, 14, 12], def: [13, 15, 15], hp: 45, dt: 15, bab: 5,
    sk: { endurance: 11, perception: 15, persuasion: 10, stealth: 9, survival: 11, useTheForce: 15 },
    feats: ["force-sensitivity", "force-training", "force-training", "shake-it-off", ...sf("useTheForce"), ...st("stealth", "useTheForce"), "strong-in-the-force", ...wp("simple")],
    tal: ["force-perception", "visions"],
    pow: { farseeing: 1, "mind-trick": 2, "move-object": 1, rebuke: 2 },
    wpn: [["quarterstaff", 5, "1d6+1"]],
    notes: notes({ Posses: "bastão, túnica, fetiche, bolsas de pós estranhos" })
  }),
  c("Officer (Threats)", {
    cl: 8, fp: 2, cls: [["nonheroic", 6], ["soldier", 3], ["officer", 3]], ab: [10, 14, 12, 15, 14, 16], def: [20, 20, 23], hp: 62, dt: 20, bab: 10,
    sk: { initiative: 7, knowledgeTactics: 18, perception: 13, persuasion: 19, useComputer: 13 },
    feats: [...ap("light"), "improved-defenses", "linguist", ...sf("knowledgeTactics", "persuasion"), ...st("useComputer"), "toughness", ...wp("pistols", "rifles", "simple")],
    tal: ["assault-tactics", "battle-analysis", "cover-fire", "deployment-tactics"],
    wpn: [["unarmed", 10, "1d4+3"], ["blaster-pistol", 11, "3d6+3"]],
    notes: notes({ Qualidades: "command cover, share talent (Cover Fire)", Posses: "pistola blaster, code cylinder, uniforme de oficial, comlink criptografado, cinto com medpac" })
  }),
  c("Intelligence Officer", {
    cl: 10, fp: 3, cls: [["noble", 7], ["officer", 3]], ab: [10, 12, 8, 16, 13, 17], def: [23, 20, 26], hp: 42, dt: 20, bab: 8,
    sk: { initiative: 9, deception: 18, gatherInformation: 18, knowledgeBureaucracy: 13, knowledgeGalacticLore: 13, knowledgeSocialSciences: 18, perception: 18, persuasion: 18, useComputer: 13 },
    feats: ["improved-defenses", "linguist", "point-blank-shot", ...sf("deception", "gatherInformation", "knowledgeSocialSciences", "perception", "persuasion"), ...wp("pistols", "simple")],
    tal: ["born-leader", "demand-surrender", "presence", "shift-defense-i", "shift-defense-ii", "weaken-resolve"],
    wpn: [["unarmed", 8, "1d4"], ["blaster-pistol", 9, "3d6+5"]],
    notes: notes({ Percepção: "+16 no cabeçalho do livro, +18 na lista de perícias (usado +18)", Qualidades: "command cover, share talent (Shift Defense I)", Posses: "pistola blaster, code cylinder, comlink criptografado, datapad, uniforme de oficial" })
  }),
  c("Outlaw Tech (Threats)", {
    cl: 4, fp: 4, cls: [["scoundrel", 2], ["scout", 2]], ab: [8, 14, 10, 16, 12, 14], def: [19, 16, 17], hp: 30, dt: 16, bab: 2,
    sk: { deception: 9, gatherInformation: 9, initiative: 9, knowledgeTechnology: 15, mechanics: 15, perception: 3, persuasion: 9, useComputer: 15 },
    feats: ["improved-defenses", "point-blank-shot", ...sf("knowledgeTechnology", "mechanics", "useComputer"), ...wp("pistols", "rifles", "simple")],
    tal: ["hyperdriven", "jury-rigger"],
    wpn: [["unarmed", 1, "1d4+1"], ["blaster-pistol", 4, "3d6+2"]],
    notes: notes({ Posses: "pistola blaster, coldre oculto, chip de crédito, datapad hackeado, code cylinder, kit de segurança, comlink, kit de ferramentas, cinto, 500 créditos" })
  }),
  c("Pilot (Threats)", {
    cl: 5, fp: 2, cls: [["nonheroic", 4], ["scout", 4]], ab: [9, 15, 12, 10, 12, 8], def: [17, 17, 15], hp: 35, dt: 17, bab: 6,
    sk: { initiative: 14, perception: 8, pilot: 14 },
    feats: [...ap("light"), "dodge", "mobility", ...sf("initiative", "pilot"), ...st("perception"), "vehicular-combat", ...wp("heavy", "pistols")],
    tal: ["acute-senses", "improved-initiative"],
    wpn: [["unarmed", 5, "1d4+1"], ["heavy-blaster-pistol", 8, "3d8+2"]],
    armor: "flight-suit-padded",
    notes: notes({ Rerrolagens: "Initiative e Perception (segundo resultado)", Posses: "pistola blaster pesada, traje de voo acolchoado (+3), comlink, kit de ferramentas, droide astromecânico R2, veículo ou nave" })
  }),
  c("Ace Pilot (Threats)", {
    cl: 14, fp: 8, cls: [["scoundrel", 7], ["ace-pilot", 7]], ab: [11, 17, 15, 14, 12, 12], def: [31, 29, 26], hp: 98, dt: 29, bab: 10,
    sk: { initiative: 15, knowledgeTactics: 14, mechanics: 14, perception: 13, pilot: 20, useComputer: 14 },
    feats: ["a-few-maneuvers", "dodge", "double-attack:heavy", "point-blank-shot", "precise-shot", "running-attack", ...sf("pilot"), "vehicular-combat", ...wp("heavy", "pistols", "simple")],
    tal: ["elusive-dogfighter", "hyperdriven", "keep-it-together", "relentless-pursuit", "spacehound", "starship-raider", "stellar-warrior", "vehicle-evasion"],
    wpn: [["unarmed", 10, "1d4+7"], ["blaster-pistol", 13, "3d6+7"]],
    notes: notes({ Qualidades: "vehicle dodge +3", Rerrolagem: "Pilot ao iniciar dogfight (fica com o melhor)", Posses: "pistola blaster, traje de voo, comlink, máscara respiratória, medpac, kit de campo, lanterna de fusão, caça estelar, droide astromecânico" })
  }),
  c("Elite Pilot", {
    cl: 10, fp: 5, cls: [["scoundrel", 4], ["soldier", 3], ["ace-pilot", 3]], ab: [11, 15, 13, 10, 10, 10], def: [28, 25, 21], hp: 68, dt: 25, bab: 8,
    sk: { initiative: 12, knowledgeTactics: 10, perception: 7, pilot: 17, useComputer: 10 },
    feats: [...ap("light"), "combat-reflexes", "dodge", "double-attack:heavy", "point-blank-shot", "precise-shot", ...sf("pilot"), "vehicular-combat", ...wp("heavy", "pistols", "simple")],
    tal: ["armored-defense", "improved-armored-defense", "elusive-dogfighter", "spacehound", "starship-raider", "vehicle-evasion"],
    wpn: [["unarmed", 8, "1d4+5"], ["blaster-pistol", 10, "3d6+5"]],
    armor: "flight-suit-armored",
    notes: notes({ Sentidos: "visão na penumbra", Posses: "pistola blaster, traje de voo blindado (+5) com pacote de capacete, nave" })
  }),
  c("Pirate", {
    cl: 6, fp: 2, cls: [["nonheroic", 6], ["scout", 2], ["scoundrel", 2]], ab: [13, 13, 13, 10, 10, 8], def: [17, 16, 14], hp: 42, dt: 16, bab: 6,
    sk: { deception: 9, endurance: 11, initiative: 5, mechanics: 5, perception: 5, pilot: 11 },
    feats: [...ap("light"), "dodge", "point-blank-shot", "shake-it-off", ...st("endurance", "pilot"), "weapon-focus:advancedMelee", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["jury-rigger", "sneak-attack"],
    wpn: [["vibro-ax", 8, "2d10+3"], ["heavy-blaster-pistol", 7, "3d8+2"]],
    notes: notes({ Rerrolagem: "Mechanics ao improvisar (segundo resultado)", Posses: "vibromachado, pistola blaster pesada, 2 granadas de atordoamento, cinto" })
  }),
  c("Privateer", {
    cl: 9, fp: 5, cls: [["nonheroic", 4], ["soldier", 3], ["scoundrel", 5]], ab: [15, 15, 13, 12, 12, 10], def: [24, 22, 21], hp: 55, dt: 22, bab: 9,
    sk: { deception: 11, initiative: 13, persuasion: 11, mechanics: 12, perception: 7, pilot: 13 },
    feats: [...ap("light"), "melee-defense", "point-blank-shot", "precise-shot", "rapid-shot", ...st("initiative", "mechanics", "pilot"), "vehicular-combat", "weapon-focus:pistols", ...wp("advanced-melee", "pistols", "simple")],
    tal: ["hyperdriven", "spacehound", "starship-raider", "weapon-specialization:advancedMelee", "weapon-specialization:pistols"],
    wpn: [["vibroblade", 11, "2d6+8"], ["heavy-blaster-pistol", 12, "3d8+6"]],
    notes: notes({ Fortitude: "26 contra calor ou frio extremos", "Rapid Shot": "pistola +10 (4d8+6)", Posses: "vibrolâmina, pistola blaster pesada, capa para todas as temperaturas, traje de voo" })
  }),
  c("Pirate Captain", {
    cl: 11, fp: 8, cls: [["scoundrel", 5], ["noble", 4], ["ace-pilot", 2]], ab: [10, 14, 11, 13, 13, 17], def: [27, 23, 23], hp: 66, dt: 23, bab: 6,
    sk: { deception: 13, gatherInformation: 13, initiative: 12, knowledgeTactics: 11, perception: 6, persuasion: 13, pilot: 12 },
    feats: ["double-attack:advancedMelee", "linguist", "melee-defense", "point-blank-shot", "quick-draw", ...st("persuasion"), "toughness", "weapon-finesse", "weapon-focus:advancedMelee", ...wp("advanced-melee", "pistols", "simple")],
    tal: ["demand-surrender", "hyperdriven", "presence", "spacehound", "starship-raider", "vehicle-evasion"],
    wpn: [["vibroblade", 9, "2d6+5"], ["blaster-pistol", 8, "3d6+5"], ["hold-out-blaster", 8, "3d6+5"]],
    notes: notes({ Fortitude: "28 contra calor ou frio extremos", "Duas vibrolâminas": "+4 (2d6+5) e +4 (2d6+5) com Double Attack", Qualidades: "vehicle dodge +1", Posses: "vibrolâmina, pistola blaster, hold-out em coldre oculto, comlink criptografado, capa para todas as temperaturas, cinto, nave capital" })
  }),
  c("Police Officer", {
    cl: 2, cls: [["nonheroic", 6]], ab: [13, 12, 11, 10, 9, 8], def: [15, 10, 9], hp: 14, dt: 10, bab: 4,
    sk: { endurance: 8, initiative: 4, knowledgeBureaucracy: 8, perception: 7 },
    feats: [...ap("light"), "pin", ...st("endurance", "knowledgeBureaucracy"), ...wp("pistols", "simple")],
    wpn: [["stun-baton", 5, "2d6+1"], ["blaster-pistol", 5, "3d6"]],
    armor: "combat-jumpsuit",
    notes: notes({ Uso: "também serve para seguranças e guardas privados", "Stun baton": "atordoamento", Posses: "pistola blaster, stun baton, macacão de combate (+4), comlink criptografado" })
  }),
  c("Veteran Politician", {
    cl: 11, fp: 5, cls: [["nonheroic", 6], ["noble", 9]], ab: [9, 11, 9, 12, 12, 14], def: [20, 18, 22], hp: 12, dt: 18, bab: 10,
    sk: { initiative: 7, deception: 19, gatherInformation: 19, knowledgeBureaucracy: 13, knowledgeGalacticLore: 13, perception: 8, persuasion: 19, useComputer: 13 },
    feats: ["coordinated-attack", "linguist", "linguist", "melee-defense", ...sf("deception", "gatherInformation", "persuasion"), ...st("gatherInformation", "knowledgeBureaucracy", "persuasion", "useComputer"), "weapon-focus:pistols", ...wp("pistols", "simple")],
    tal: ["born-leader", "connections", "presence", "weaken-resolve", "wealth"],
    wpn: [["unarmed", 9, "1d4+3"], ["hold-out-blaster", 11, "3d4+4"]],
    notes: notes({ PV: "12 no livro (mantido)", Posses: "hold-out, datapad com datacards, holoprojetor pessoal, holográfico, túnicas finas" })
  }),
  c("Bail Organa", {
    cl: 9, sp: "human", fp: 8, cls: [["noble", 9]], ab: [11, 13, 10, 13, 15, 14], def: [12, 14, 18], hp: 50, dt: 14, bab: 6,
    sk: { deception: 16, gatherInformation: 11, initiative: 10, knowledgeBureaucracy: 15, knowledgeGalacticLore: 10, knowledgeSocialSciences: 10, perception: 16, persuasion: 11, pilot: 10, treatInjury: 11, useComputer: 10 },
    feats: ["dodge", "linguist", "melee-defense", "quick-draw", ...sf("deception", "knowledgeBureaucracy", "perception"), ...st("initiative", "pilot", "useComputer"), ...wp("pistols", "simple")],
    tal: ["born-leader", "connections", "educated", "inspire-confidence", "presence"],
    wpn: [["unarmed", 6, "1d4+4"], ["blaster-pistol", 7, "2d6+4"]],
    notes: notes({ Papel: "senador de Alderaan, pai adotivo de Leia e um dos fundadores da Aliança Rebelde", Posses: "pistola blaster, comlink, datapad" })
  }),
  c("Saboteur", {
    cl: 8, fp: 7, cls: [["scoundrel", 4], ["soldier", 4]], ab: [13, 14, 12, 12, 12, 12], def: [22, 21, 20], hp: 58, dt: 21, bab: 7,
    sk: { deception: 10, knowledgeTechnology: 10, mechanics: 15, perception: 10, pilot: 10, stealth: 16, useComputer: 10 },
    feats: ["deadeye", "point-blank-shot", "precise-shot", "rapid-shot", ...sf("mechanics", "stealth"), ...st("knowledgeTechnology", "pilot"), ...wp("pistols", "rifles", "simple")],
    tal: ["demolitionist", "knack", "gimmick"],
    wpn: [["vibrodagger", 8, "2d4+5"], ["blaster-pistol", 9, "3d6+4"]],
    notes: notes({ "Rapid Shot": "pistola +7 (4d6+4)", Posses: "pistola blaster, vibroadaga" })
  }),
  c("Twi'lek Saboteur", {
    cl: 6, sp: "twilek", fp: 4, cls: [["scoundrel", 4], ["soldier", 2]], ab: [11, 12, 10, 14, 12, 16], def: [19, 20, 18], hp: 39, dt: 20, bab: 5,
    sk: { deception: 16, knowledgeBureaucracy: 10, knowledgeTechnology: 10, mechanics: 10, perception: 9, persuasion: 16, stealth: 14, useComputer: 10 },
    feats: ["point-blank-shot", "linguist", ...sf("deception", "persuasion", "stealth"), ...st("knowledgeBureaucracy", "knowledgeTechnology"), ...wp("pistols", "rifles", "simple")],
    tal: ["demolitionist", "knack", "gimmick"],
    wpn: [["knife", 5, "1d4+3"], ["hold-out-blaster", 6, "3d4+3"]],
    notes: notes({ Rerrolagem: "Deception (segundo resultado)", Posses: "faca, hold-out" })
  }),
  c("Sector Ranger", {
    cl: 7, fp: 2, cls: [["soldier", 4], ["scout", 2], ["scoundrel", 1]], ab: [12, 16, 13, 14, 14, 10], def: [25, 20, 20], hp: 66, dt: 20, bab: 5,
    sk: { gatherInformation: 8, initiative: 11, knowledgeBureaucracy: 10, knowledgeGalacticLore: 10, perception: 10, pilot: 11, useComputer: 10 },
    feats: [...ap("light", "medium"), "linguist", "martial-arts-i", "point-blank-shot", "precise-shot", "shake-it-off", ...st("gatherInformation", "useComputer"), "weapon-focus:pistols", ...wp("pistols", "rifles", "simple")],
    tal: ["acute-senses", "armored-defense", "evasion", "hyperdriven", "improved-armored-defense"],
    wpn: [["unarmed", 6, "1d6+4"], ["stun-baton", 6, "2d6+4"], ["heavy-blaster-pistol", 9, "3d8+3"]],
    armor: "combat-jumpsuit",
    notes: notes({ Resistência: "Evasion", Rerrolagem: "Perception (segundo resultado)", "Poderes de imposição": "+5 em Persuasion para obter ajuda de autoridades em mundos da República (não vale na Orla sem lei)", Posses: "pistola blaster pesada, stun baton, macacão de combate (+4), comlink criptografado" })
  }),
  c("Special Enforcement Officer", {
    cl: 13, fp: 3, cls: [["scout", 5], ["noble", 4], ["bounty-hunter", 4]], ab: [10, 12, 9, 16, 16, 17], def: [29, 24, 27], hp: 60, dt: 24, bab: 10,
    sk: { deception: 14, gatherInformation: 19, initiative: 12, knowledgeBureaucracy: 14, knowledgeGalacticLore: 14, perception: 18, persuasion: 19, pilot: 12, useComputer: 19 },
    feats: ["linguist", "martial-arts-i", "pin", "point-blank-shot", "precise-shot", ...sf("gatherInformation", "persuasion", "perception", "useComputer"), ...st("deception"), ...wp("pistols", "rifles", "simple")],
    tal: ["acute-senses", "demand-surrender", "expert-tracker", "hunters-mark", "keen-shot", "nowhere-to-hide", "presence"],
    wpn: [["unarmed", 10, "1d6+6"], ["heavy-blaster-pistol", 11, "3d8+6"]],
    notes: notes({ Qualidades: "familiar foe +2", Rerrolagens: "Gather Information (localizar alguém) e Perception (segundo resultado)", Posses: "pistola blaster pesada, uniforme de Sector Ranger, comlink criptografado, datapad" })
  }),
  c("Security Personnel", {
    cl: 2, cls: [["nonheroic", 6]], ab: [10, 12, 11, 10, 9, 11], def: [16, 11, 10], hp: 22, dt: 11, bab: 4,
    sk: { initiative: 4, perception: 9 },
    feats: [...ap("light"), "improved-defenses", "toughness", "weapon-focus:pistols", ...wp("pistols", "simple")],
    wpn: [["stun-baton", 4, "2d6"], ["blaster-pistol", 5, "3d6"]],
    armor: "blast-helmet-vest",
    notes: notes({ Sentidos: "visão na penumbra", Posses: "stun baton, pistola blaster com coldre, capacete e colete de proteção (+2) com pacote de capacete, passe de segurança, algemas" })
  }),
  c("Security Specialist", {
    cl: 5, fp: 4, cls: [["soldier", 5]], ab: [14, 14, 14, 10, 12, 10], def: [21, 21, 16], hp: 67, dt: 21, bab: 5,
    sk: { initiative: 4, knowledgeTactics: 7, mechanics: 7, perception: 8 },
    feats: [...ap("light", "medium"), "dodge", "point-blank-shot", "precise-shot", "toughness", ...wp("pistols", "rifles", "simple")],
    tal: ["melee-smash", "stunning-strike"],
    wpn: [["stun-baton", 7, "2d6+5"], ["blaster-rifle", 7, "3d8+2"], ["heavy-blaster-pistol", 7, "3d8+2"], ["stun-grenade", 7, "4d6+2"]],
    armor: "battle-armor",
    notes: notes({ Reflexos: "26 com o escudo antimotim (ver item Riot Shield)", Posses: "stun baton, rifle blaster, pistola blaster pesada, 2 granadas de atordoamento, armadura de batalha (+8, +2), escudo antimotim, máscara respiratória, comlink, algemas, medpac, bastão de luz" })
  }),
  c("Royal Handmaiden", {
    cl: 6, sp: "human", fp: 4, cls: [["noble", 3], ["soldier", 3]], ab: [10, 13, 10, 13, 14, 16], def: [20, 18, 20], hp: 41, dt: 18, bab: 5,
    sk: { deception: 16, initiative: 9, knowledgeTactics: 9, perception: 10, persuasion: 11, pilot: 9, treatInjury: 10, useComputer: 9 },
    feats: ["linguist", "martial-arts-i", "martial-arts-ii", "melee-defense", "point-blank-shot", "quick-draw", ...sf("deception"), ...wp("pistols", "rifles", "simple")],
    tal: ["battle-analysis", "bolster-ally", "harms-way", "inspire-confidence"],
    wpn: [["unarmed", 6, "1d8+3"], ["sporting-blaster-pistol", 6, "3d4+3"]],
    notes: notes({ Papel: "guarda-costas e sósia da Rainha/Senadora Amidala", Posses: "pistola esportiva, comlink, traje de aia" })
  }),
  c("Ship Captain", {
    cl: 13, fp: 5, cls: [["soldier", 3], ["scoundrel", 7], ["officer", 3]], ab: [10, 14, 10, 15, 11, 13], def: [27, 25, 27], hp: 71, dt: 25, bab: 10,
    sk: { initiative: 8, knowledgeTactics: 13, mechanics: 13, perception: 11, persuasion: 12, pilot: 13, useComputer: 13 },
    feats: [...ap("light", "medium"), "coordinated-attack", "double-attack:advancedMelee", "melee-defense", "point-blank-shot", ...sf("knowledgeTactics"), ...st("persuasion"), "vehicular-combat", "weapon-finesse", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["assault-tactics", "battle-analysis", "hyperdriven", "spacehound", "starship-raider", "stellar-warrior", "tactical-edge", "tough-as-nails"],
    wpn: [["vibrodagger", 12, "2d4+6"], ["blaster-pistol", 12, "3d6+6"]],
    notes: notes({ "Double Attack": "vibroadaga +7/+7 (2d4+6)", Qualidades: "command cover, share talent (Stellar Warrior)", Posses: "vibroadaga, pistola blaster com coldre, code cylinder, comlink, uniforme, insígnias, nave capital" })
  }),
  c("Ship Gunner", {
    cl: 7, fp: 3, cls: [["nonheroic", 4], ["scoundrel", 3], ["soldier", 3]], ab: [13, 15, 11, 10, 12, 10], def: [19, 20, 18], hp: 38, dt: 20, bab: 8,
    sk: { initiative: 7, knowledgeTactics: 10, perception: 8, useComputer: 10 },
    feats: [...ap("light"), "double-attack:heavy", "point-blank-shot", ...st("knowledgeTactics", "useComputer"), "vehicular-combat", "weapon-focus:heavy", ...wp("heavy", "pistols", "simple")],
    tal: ["devastating-attack:heavy", "spacehound", "starship-raider", "weapon-specialization:heavy"],
    wpn: [["unarmed", 9, "1d4+4"], ["blaster-cannon", 11, "3d12+5"], ["heavy-blaster-pistol", 10, "2d8+3"]],
    armor: "flight-suit-armored",
    notes: notes({ Sentidos: "visão na penumbra", "Double Attack": "canhão +6/+6 (3d12+5)", Posses: "canhão blaster, pistola blaster pesada, traje de voo blindado (+5) com pacote de capacete" })
  }),
  c("Sith Apprentice (Threats)", {
    cl: 13, fp: 8, ds: 15, cls: [["scoundrel", 7], ["sith-apprentice", 6]], ab: [14, 14, 14, 11, 15, 15], def: [27, 27, 27], hp: 98, dt: 27, bab: 11,
    sk: { acrobatics: 13, deception: 13, initiative: 13, perception: 13, stealth: 13, useTheForce: 13 },
    feats: ["acrobatic-strike", "dodge", "force-sensitivity", "force-training", "point-blank-shot", "running-attack", ...st("stealth", "useTheForce"), ...wp("lightsabers", "pistols", "simple")],
    tal: ["block", "deflect", "force-fortification", "force-perception", "power-of-the-dark-side", "sneak-attack", "swift-power",
      "force-point-recovery", "improved-sense-force", "improved-telepathy"],
    pow: { "battle-strike": 1, "dark-rage": 1, "force-lightning": 1 },
    wpn: [["lightsaber", 13, "2d8+8"], ["blaster-pistol", 13, "3d6+6"]],
    notes: notes({ "Sneak Attack": "+1d6", Posses: "sabre de luz, pistola blaster em coldre oculto, holoprojetor pessoal" })
  }),
  c("Darth Maul (Threats)", {
    cl: 15, sp: "zabrak", fp: 6, dest: 1, ds: 14, cls: [["jedi", 7], ["sith-apprentice", 8]], ab: [17, 19, 16, 16, 14, 12], def: [34, 31, 30], hp: 152, dt: 31, bab: 15,
    sk: { acrobatics: 16, initiative: 16, jump: 15, mechanics: 15, perception: 9, useTheForce: 13 },
    feats: ["acrobatic-strike", "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "dual-weapon-mastery-iii", "force-sensitivity", "force-training", "force-training", "martial-arts-i", "martial-arts-ii", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["block", "dark-scourge", "lightsaber-defense", "power-of-the-dark-side", "stolen-form", "jar-kai", "juyo", "niman", "weapon-specialization:lightsabers",
      "force-power-mastery:battle-strike", "improved-move-light-object", "improved-sense-force", "improved-sense-surroundings"],
    pow: { "battle-strike": 1, "dark-rage": 1, "force-grip": 1, "force-slam": 1, "mind-trick": 1, "move-object": 1 },
    wpn: [["lightsaber-double", 20, "2d8+12"], ["unarmed", 18, "1d8+10"]],
    notes: notes({ "Duas lâminas": "+20 (2d8+12) e +20 (2d8+12)", Reflexos: "35 com Lightsaber Defense", "Stolen Form": "Jar'Kai, Juyo e Niman (talento novo; aqui os talentos de forma estão incluídos diretamente)", Rerrolagem: "Perception (segundo resultado)", Posses: "sabre de luz duplo (feito por ele), 3 droides sonda Dark Eye, holoprojetor pessoal, speeder Bloodfin, Scimitar" })
  }),
  c("Sith Lord (Threats)", {
    cl: 18, fp: 7, dest: 2, ds: 16, cls: [["noble", 7], ["sith-apprentice", 8], ["sith-lord", 4]], ab: [13, 15, 11, 14, 16, 16], def: [33, 31, 34], hp: 105, dt: 31, bab: 17,
    sk: { deception: 17, initiative: 16, knowledgeGalacticLore: 16, perception: 22, persuasion: 17, pilot: 16, useComputer: 16, useTheForce: 22 },
    feats: ["double-attack:lightsabers", "force-training", "force-training", "force-training", "force-training", "linguist", "melee-defense", ...sf("useTheForce"), "triple-attack:lightsabers", "weapon-finesse", ...wp("lightsabers", "pistols", "simple")],
    tal: ["connections", "block", "damage-reduction-10", "dark-side-adept", "force-perception", "gauge-force-potential", "lightsaber-defense", "multiattack-proficiency-lightsabers", "power-of-the-dark-side", "telekinetic-power",
      "force-point-recovery", "force-power-mastery:force-lightning", "improved-sense-force", "improved-telepathy", "devastating-power", "multitarget-power", "quicken-power"],
    pow: { farseeing: 1, "force-disarm": 1, "force-grip": 2, "force-lightning": 4, "force-slam": 1, "force-thrust": 1, "mind-trick": 1, "move-object": 2, rebuke: 2, surge: 1 },
    wpn: [["lightsaber", 19, "2d8+10"]],
    notes: notes({ "Double Attack": "+16/+16 (2d8+10)", "Triple Attack": "+11/+11/+11 (2d8+10)", Reflexos: "34 com Lightsaber Defense", Imune: "medo", Qualidades: "fearless, temptation", Rerrolagem: "Use the Force com poderes [dark side] (segundo resultado)", Posses: "sabre de luz, túnica Sith" })
  }),
  c("Fallen Jedi Sith Lord", {
    cl: 18, fp: 6, dest: 2, ds: 18, cls: [["jedi", 7], ["jedi-knight", 4], ["sith-apprentice", 5], ["sith-lord", 2]], ab: [15, 17, 15, 16, 18, 18], def: [34, 33, 35], hp: 148, dt: 33, bab: 18,
    sk: { acrobatics: 17, deception: 18, initiative: 17, jump: 16, perception: 13, useTheForce: 18 },
    feats: ["acrobatic-strike", "combat-reflexes", "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "force-sensitivity", "force-training", "force-training", "force-training", "rapid-strike", "running-attack", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["block", "deflect", "djem-so", "elusive-target", "force-deception", "lightsaber-defense", "power-of-the-dark-side", "redirect-shot", "shien", "wicked-strike",
      "force-point-recovery", "force-power-mastery", "improved-move-light-object", "improved-sense-surroundings", "multitarget-power"],
    pow: { "battle-strike": 2, "dark-rage": 1, "force-disarm": 1, "force-grip": 2, "force-slam": 2, "force-lightning": 2, "move-object": 1, "negate-energy": 2, surge: 2 },
    wpn: [["lightsaber", 21, "2d8+11"], ["lightsaber-short", 19, "2d6+11"]],
    notes: notes({ "Rapid Strike": "sabre +19 (3d8+11)", "Duas armas": "sabre +19 (2d8+11) e sabre curto +19 (2d6+11)", Reflexos: "35 com Lightsaber Defense", Imune: "medo", Qualidades: "fearless, temptation", Posses: "sabre de luz (feito por ele), sabre curto, túnica Sith" })
  }),
  c("Lumiya, Dark Lady of the Sith", {
    cl: 19, sp: "human", fp: 7, dest: 2, ds: 18, cls: [["soldier", 5], ["scoundrel", 3], ["ace-pilot", 3], ["force-adept", 3], ["sith-apprentice", 3], ["sith-lord", 2]], ab: [13, 18, 12, 14, 18, 18], def: [42, 34, 38], hp: 125, dt: 34, bab: 16,
    sk: { deception: 23, endurance: 15, initiative: 18, knowledgeTactics: 16, mechanics: 15, perception: 18, pilot: 23, useTheForce: 23 },
    feats: [...ap("light", "medium"), "combat-reflexes", "force-sensitivity", "force-training", "force-training", "improved-defenses", "rapid-strike", ...sf("deception", "useTheForce"), ...st("deception"), "vehicular-combat", "weapon-finesse", ...wp("lightsabers", "pistols", "rifles", "simple")],
    tal: ["armored-defense", "channel-aggression", "channel-anger", "dark-side-adept", "dark-side-master", "equilibrium", "force-pilot", "improved-armored-defense", "power-of-the-dark-side", "spacehound", "swift-power", "vehicle-evasion",
      "improved-force-trance", "improved-telepathy", "quicken-power"],
    pow: { "battle-strike": 2, "dark-rage": 1, farseeing: 1, "force-grip": 1, "force-slam": 1, "force-stun": 1, "mind-trick": 1, "negate-energy": 2 },
    wpn: [["lightwhip", 20, "2d4+10"], [{ base: "blaster-pistol", name: "Palm Blaster" }, 20, "3d6+9"]],
    armor: "flight-suit-armored",
    notes: notes({ Papel: "ex-espiã imperial Shira Brie, reconstruída com próteses; Dama Sombria dos Sith", Sentidos: "visão na penumbra", "Rapid Strike": "chicote de luz +18 (3d4+10), alcance 2", Imune: "medo", Qualidades: "fearless, temptation, vehicle dodge +1",
      "Palm Blasters": "blasters ocultos nos braços protéticos: ação rápida para sacar e atirar como pistolas blaster",
      Rerrolagem: "Use the Force com poderes [dark side] (segundo resultado) ou gastar Ponto da Força para ficar com o melhor",
      Posses: "chicote de luz, armadura personalizada (traje de voo blindado com pacote de capacete, +8), próteses cibernéticas (os 4 membros, com blasters nas palmas), cinto com medpac, túnica Sith" })
  }),
  c("Darth Bane", {
    cl: 20, sp: "human", fp: 10, dest: 3, ds: 22, cls: [["jedi", 7], ["jedi-knight", 5], ["sith-apprentice", 3], ["sith-lord", 5]], ab: [16, 20, 17, 17, 22, 20], def: [38, 36, 39], hp: 194, dt: 36, bab: 20,
    sk: { acrobatics: 20, deception: 20, endurance: 18, initiative: 20, knowledgeGalacticLore: 18, perception: 21, useTheForce: 20 },
    feats: ["cleave", "double-attack:lightsabers", "force-sensitivity", "force-training", "force-training", "great-cleave", "melee-defense", "power-attack", "rapid-strike", "running-attack", "strong-in-the-force", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["block", "deflect", "djem-so", "equilibrium", "force-deception", "juyo", "lightsaber-throw", "power-of-the-dark-side", "severing-strike", "swift-power", "weapon-specialization:lightsabers", "wicked-strike",
      "force-point-recovery", "improved-move-light-object", "improved-sense-surroundings", "devastating-power", "distant-power", "multitarget-power", "quicken-power"],
    pow: { "battle-strike": 2, "dark-rage": 1, farseeing: 1, "force-grip": 1, "force-lightning": 3, "force-slam": 1, "mind-trick": 1, "move-object": 1, rebuke: 2, surge: 2 },
    wpn: [["lightsaber", 25, "2d8+15"]],
    armor: "orbalisk-armor",
    notes: notes({ Papel: "último Sith após Ruusan, criador da Regra de Dois; ex-membro da Irmandade das Sombras", "Rapid Strike": "+23 (3d8+15)", "Double Attack": "+20/+20 (2d8+15)", RD: "10, vale até contra sabres de luz (orbalisks)", Imune: "medo", Qualidades: "fearless, temptation", Posses: "sabre de luz (feito por ele), armadura de orbalisks (+10 de armadura e RD 10 inclusive contra sabres), túnica Sith" })
  }),
  c("Slicer", {
    cl: 5, fp: 1, cls: [["scoundrel", 5]], ab: [8, 14, 10, 16, 14, 12], def: [19, 15, 18], hp: 32, dt: 15, bab: 3,
    sk: { initiative: 4, deception: 13, gatherInformation: 8, knowledgeGalacticLore: 10, knowledgeTechnology: 15, perception: 9, persuasion: 9, mechanics: 15, useComputer: 15 },
    feats: ["point-blank-shot", ...sf("knowledgeTechnology", "deception", "mechanics", "useComputer"), ...wp("pistols", "simple")],
    tal: ["gimmick", "master-slicer", "trace"],
    wpn: [["unarmed", 2, "1d4+1"], ["hold-out-blaster", 5, "3d4+2"]],
    notes: notes({ Rerrolagem: "Use Computer para melhorar o acesso (fica com o melhor)", Posses: "hold-out, kit de segurança, code cylinder (falsificado), comlink criptografado, 10 datacards, lectroticker (+6), chip de crédito, computador portátil" })
  }),
  c("Zakarisz Ghent", {
    cl: 10, sp: "human", fp: 4, dest: 1, cls: [["scoundrel", 10]], ab: [10, 16, 12, 18, 8, 16], def: [25, 22, 21], hp: 58, dt: 22, bab: 7,
    sk: { deception: 18, gatherInformation: 19, initiative: 12, knowledgeGalacticLore: 19, knowledgeTechnology: 19, mechanics: 19, perception: 9, persuasion: 18, pilot: 12, useComputer: 19 },
    feats: ["dodge", "improved-defenses", "melee-defense", "mobility", "point-blank-shot", "precise-shot", ...sf("deception", "knowledgeGalacticLore", "knowledgeTechnology", "persuasion", "useComputer"), ...wp("pistols", "simple")],
    tal: ["fools-luck", "knack", "gimmick", "master-slicer", "trace"],
    wpn: [["unarmed", 7, "1d4+5"], ["blaster-pistol", 9, "3d6+5"]],
    notes: notes({ Papel: "slicer lendário da organização de Talon Karrde; mais tarde chefe de criptografia da Inteligência da Nova República", Percepção: "+9 no cabeçalho, +3 na lista (usado +9)", Rerrolagem: "Use Computer para melhorar o acesso (fica com o melhor)", Posses: "pistola blaster, comlink criptografado com holo, datacard, datapad, computador portátil (Int 16)" })
  }),
  c("Smuggler", {
    cl: 7, fp: 3, ds: 1, cls: [["scoundrel", 4], ["scout", 2], ["noble", 1]], ab: [8, 14, 10, 12, 14, 16], def: [22, 18, 22], hp: 41, dt: 18, bab: 4,
    sk: { deception: 16, initiative: 10, knowledgeGalacticLore: 9, persuasion: 16, pilot: 10, perception: 5 },
    feats: ["improved-defenses", "point-blank-shot", "precise-shot", ...sf("deception", "persuasion"), ...st("pilot"), "vehicular-combat", "weapon-focus:pistols", ...wp("pistols", "rifles", "simple")],
    tal: ["barter", "connections", "hyperdriven", "knack"],
    wpn: [["unarmed", 3, "1d4+2"], ["heavy-blaster-pistol", 7, "3d6+3"], ["hold-out-blaster", 7, "3d4+3"]],
    notes: notes({ Rerrolagem: "Persuasion ao pechinchar (segundo resultado)", Posses: "pistola blaster pesada, hold-out (oculto), transporte Corellian YT-1300, comlink, cinto, carga ilícita" })
  }),
  c("Talon Karrde", {
    cl: 12, sp: "human", fp: 5, cls: [["scoundrel", 7], ["crime-lord", 5]], ab: [13, 15, 12, 16, 13, 17], def: [27, 23, 27], hp: 80, dt: 23, bab: 8,
    sk: { deception: 19, gatherInformation: 19, initiative: 13, knowledgeGalacticLore: 14, mechanics: 14, perception: 17, persuasion: 19, pilot: 17 },
    feats: ["point-blank-shot", "precise-shot", "rapid-shot", ...sf("deception", "gatherInformation", "perception", "persuasion", "pilot"), "vehicular-combat", "weapon-focus:pistols", ...wp("pistols", "simple")],
    tal: ["attract-minion", "demand-surrender", "disruptive", "hyperdriven", "impel-ally-i", "impel-ally-ii", "presence", "sneak-attack", "stellar-warrior"],
    wpn: [["unarmed", 9, "1d4+7"], ["heavy-blaster-pistol", 11, "3d8+6"]],
    notes: notes({ Papel: "corretor de informações e fundador da Aliança dos Contrabandistas; dono dos vornskrs Sturm e Drang", "Rapid Shot": "pistola +9 (4d8+6)", "Sneak Attack": "+1d6", Qualidades: "command cover", Posses: "pistola blaster pesada, kit de ferramentas, transporte Action VI modificado (Wild Karrde), roupas finas" })
  }),
  c("Soldier (Threats)", {
    cl: 2, cls: [["nonheroic", 6]], ab: [11, 13, 13, 10, 10, 10], def: [15, 11, 10], hp: 22, dt: 11, bab: 4,
    sk: { endurance: 9, initiative: 4, perception: 3 },
    feats: [...ap("light"), "coordinated-attack", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    wpn: [["vibroblade", 4, "2d6"], ["blaster-rifle", 5, "3d8"], ["frag-grenade", 5, "4d6"]],
    armor: "combat-jumpsuit",
    notes: notes({ Posses: "vibrolâmina, rifle blaster, 2 granadas de fragmentação, macacão de combate (+4), comlink, datapad com mapas, kit de campo" })
  }),
  c("SpecForce Heavy Weapons Specialist", {
    cl: 5, fp: 2, cls: [["nonheroic", 6], ["soldier", 3]], ab: [15, 15, 13, 10, 10, 10], def: [20, 16, 13], hp: 42, dt: 16, bab: 7,
    sk: { initiative: 6, knowledgeTactics: 9, mechanics: 9, perception: 6 },
    feats: [...ap("light", "medium"), "burst-fire", ...st("mechanics"), "suppression-fire", "weapon-focus:heavy", ...wp("heavy", "pistols", "simple")],
    tal: ["devastating-attack:heavy", "weapon-specialization:heavy"],
    wpn: [["combat-gloves", 9, "1d4+6"], ["heavy-blaster-pistol", 9, "3d8+3"], ["heavy-repeating-blaster", 9, "3d10+5"], ["missile-launcher", 10, "6d6+5"]],
    armor: "battle-armor",
    notes: notes({ Sentidos: "visão na penumbra", "Repetidor pesado": "+7 apoiado (3d10+5), Burst Fire +4 (5d10+5)", Posses: "luvas de combate, pistola blaster pesada, repetidor pesado, lança-mísseis com 2 carregadores, armadura de batalha (+8, +2) com pacote de capacete, datapad, kit de campo" })
  }),
  c("Soldier Commander", {
    cl: 6, fp: 2, cls: [["nonheroic", 6], ["soldier", 3], ["officer", 1]], ab: [10, 14, 12, 15, 13, 15], def: [18, 17, 19], hp: 40, dt: 17, bab: 8,
    sk: { initiative: 12, knowledgeTactics: 17, perception: 11, persuasion: 12 },
    feats: [...ap("light"), "coordinated-attack", "point-blank-shot", "precise-shot", ...sf("knowledgeTactics"), ...st("initiative"), ...wp("pistols", "rifles", "simple")],
    tal: ["assault-tactics", "battle-analysis", "cover-fire"],
    wpn: [["knife", 8, "1d4+2"], ["blaster-pistol", 10, "3d6+2"], ["blaster-rifle", 10, "3d8+2"]],
    armor: "combat-jumpsuit",
    notes: notes({ Posses: "faca, pistola blaster, rifle blaster, macacão de combate (+4), kit de campo, eletrobinóculos, datapad, uniforme, insígnia" })
  }),
  c("Clone Commander CC-2224 \"Cody\"", {
    cl: 12, fp: 3, ds: 5, cls: [["soldier", 7], ["officer", 5]], ab: [15, 18, 15, 14, 14, 13], def: [31, 28, 28], hp: 97, dt: 28, bab: 12,
    sk: { endurance: 13, initiative: 15, knowledgeTactics: 13, perception: 15, pilot: 15, useComputer: 13 },
    feats: [...ap("light", "medium"), "careful-shot", "charging-fire", "coordinated-attack", "deadeye", "point-blank-shot", "precise-shot", "rapid-shot", "running-attack", "weapon-focus:rifles", ...wp("pistols", "rifles", "simple")],
    tal: ["armored-defense", "assault-tactics", "battle-analysis", "deployment-tactics", "field-tactics", "harms-way", "improved-armored-defense"],
    wpn: [["unarmed", 14, "1d4+8"], ["heavy-blaster-rifle", 17, "3d10+6"], ["frag-grenade", 16, "4d6+6"], ["ion-grenade", 16, "4d6+6"]],
    armor: "stormtrooper-armor",
    notes: notes({ Sentidos: "visão na penumbra", "Rapid Shot": "rifle +15 (4d10+6)", Qualidades: "command cover, share talent (Battle Analysis)", Armadura: "armadura de clone (+6, +2 de equipamento) com pacote de capacete e jetpack; usada a armadura de stormtrooper como base", Posses: "rifle blaster pesado, granada de fragmentação, granada iônica, armadura de clone com jetpack, comlink criptografado com holo, cinto com medpac" })
  }),
  c("Elite Soldier", {
    cl: 10, fp: 2, ds: 4, dr: 1, cls: [["soldier", 7], ["elite-trooper", 3]], ab: [14, 16, 12, 14, 10, 8], def: [24, 27, 20], hp: 93, dt: 27, bab: 12,
    sk: { endurance: 11, initiative: 13, knowledgeTactics: 12, perception: 10, useComputer: 12 },
    feats: [...ap("light", "medium"), "deadeye", "martial-arts-i", "point-blank-shot", "precise-shot", "rapid-shot", "sniper", "weapon-focus:rifles", ...wp("pistols", "rifles", "simple")],
    tal: ["armored-defense", "devastating-attack:rifles", "greater-weapon-focus:rifles", "greater-weapon-specialization:rifles", "penetrating-attack:rifles", "weapon-specialization:rifles"],
    wpn: [["unarmed", 14, "1d6+7"], ["heavy-blaster-rifle", 17, "3d10+9"], ["frag-grenade", 15, "4d6"], ["ion-grenade", 15, "4d6"]],
    armor: "battle-armor",
    notes: notes({ Sentidos: "visão na penumbra", "Rapid Shot": "rifle +15 (4d10+9)", Qualidades: "RD 1, delay damage", Posses: "rifle blaster pesado, armadura de batalha (+8, +2), 2 granadas de fragmentação, granada iônica, comlink criptografado miniaturizado, cinto com medpac" })
  }),
  c("SpecForce Elite Soldier", {
    cl: 13, fp: 3, dr: 1, speed: 8, cls: [["soldier", 7], ["scout", 3], ["elite-trooper", 3]], ab: [12, 16, 15, 12, 16, 13], def: [30, 31, 26], hp: 132, dt: 31, bab: 12,
    sk: { initiative: 14, mechanics: 12, perception: 16, stealth: 19, useComputer: 12 },
    feats: [...ap("light", "medium"), "double-attack:rifles", "extra-second-wind", "point-blank-shot", "precise-shot", "rapid-shot", "running-attack", ...sf("stealth"), ...st("stealth"), "toughness", "weapon-focus:rifles", ...wp("pistols", "rifles", "simple")],
    tal: ["armored-defense", "hard-target", "improved-stealth", "long-stride", "multiattack-proficiency-rifles", "multiattack-proficiency-rifles", "tough-as-nails", "weapon-specialization:rifles"],
    wpn: [["knife", 13, "1d4+7"], ["blaster-rifle", 16, "3d8+8"], ["blaster-pistol", 15, "3d6+6"]],
    armor: "flight-suit-armored",
    notes: notes({ Sentidos: "visão na penumbra", "Rapid Shot": "rifle +14 (4d8+8)", "Double Attack": "rifle +15/+15 (3d8+8)", Qualidades: "RD 1, delay damage", Rerrolagem: "Stealth (segundo resultado)", Posses: "pistola blaster, rifle blaster com mira padrão, faca, armadura SpecForce (traje de voo blindado, +5) com pacote de capacete, comlink criptografado" })
  }),
  c("Spy", {
    cl: 7, fp: 3, cls: [["scoundrel", 2], ["scout", 5]], ab: [12, 14, 12, 14, 12, 13], def: [21, 18, 18], hp: 50, dt: 18, bab: 6,
    sk: { acrobatics: 10, deception: 9, gatherInformation: 9, perception: 9, persuasion: 9, stealth: 10, useComputer: 9 },
    feats: ["dodge", "improved-disarm", "linguist", "melee-defense", "mobility", "point-blank-shot", ...st("acrobatics"), ...wp("pistols", "rifles", "simple")],
    tal: ["acute-senses", "hidden-movement", "improved-stealth", "gimmick"],
    wpn: [["vibrodagger", 7, "2d4+4"], ["blaster-pistol", 8, "3d6+3"]],
    notes: notes({ Rerrolagens: "Perception e Stealth (segundo resultado)", Posses: "pistola blaster, vibroadaga" })
  }),
  c("Bothan Spy", {
    cl: 8, sp: "bothan", fp: 5, cls: [["scoundrel", 2], ["scout", 6]], ab: [12, 16, 10, 14, 12, 13], def: [23, 19, 20], hp: 48, dt: 19, bab: 6,
    sk: { acrobatics: 12, deception: 15, gatherInformation: 15, initiative: 5, perception: 10, persuasion: 10, stealth: 12, useComputer: 11 },
    feats: ["combat-reflexes", "improved-disarm", "linguist", "melee-defense", "point-blank-shot", "quick-draw", ...sf("deception", "gatherInformation"), ...st("useComputer"), ...wp("pistols", "rifles", "simple")],
    tal: ["acute-senses", "hidden-movement", "improved-stealth", "gimmick"],
    wpn: [["vibrodagger", 7, "2d4+5"], ["blaster-pistol", 9, "3d6+4"]],
    notes: notes({ Rerrolagens: "Perception e Stealth (segundo resultado)",
      "Rede de espionagem Bothan": "contato com Gather Information CD 25; um agente faz Gather Information em nome do herói, com bônus +1 a cada 350 créditos pagos (+5 = 1.750 cr, +20 = 7.000 cr), sem se limitar à região",
      Posses: "vibroadaga, pistola blaster" })
  }),
  c("Swoop Gang Leader", {
    cl: 7, fp: 4, cls: [["scoundrel", 7]], ab: [12, 16, 10, 14, 10, 13], def: [23, 17, 18], hp: 39, dt: 17, bab: 5,
    sk: { deception: 9, gatherInformation: 9, initiative: 6, mechanics: 10, perception: 8, persuasion: 9, pilot: 16, useComputer: 10 },
    feats: ["martial-arts-i", "point-blank-shot", "rapid-strike", ...sf("pilot"), ...st("gatherInformation"), "vehicular-combat", ...wp("advanced-melee", "pistols", "simple")],
    tal: ["fortunes-favor", "skirmisher", "sneak-attack", "sneak-attack"],
    wpn: [["unarmed", 6, "1d6+1"], ["vibrodagger", 6, "2d4+4"], ["heavy-blaster-pistol", 8, "3d8+3"]],
    notes: notes({ "Rapid Strike": "vibroadaga +4 (3d4+4)", "Sneak Attack": "+2d6", Posses: "vibroadaga, pistola blaster pesada, speeder bike Raptor modificada" })
  }),
  c("Swoop Gang Member", {
    cl: 2, fp: 2, cls: [["nonheroic", 4], ["scoundrel", 1]], ab: [11, 13, 10, 10, 9, 10], def: [14, 11, 11], hp: 15, dt: 11, bab: 3,
    sk: { initiative: 8, perception: 2, pilot: 13 },
    feats: ["point-blank-shot", ...sf("pilot"), ...st("initiative"), ...wp("advanced-melee", "pistols", "simple")],
    tal: ["skirmisher"],
    wpn: [["vibrodagger", 3, "2d4"], ["blaster-pistol", 4, "3d6"]],
    notes: notes({ Posses: "vibroadaga, pistola blaster, swoop Nebulon-Q usada" })
  }),
  c("Technician", {
    cl: 1, fp: 2, cls: [["nonheroic", 2], ["scoundrel", 1]], ab: [11, 12, 11, 14, 10, 8], def: [14, 11, 12], hp: 10, dt: 11, bab: 1,
    sk: { initiative: 2, perception: 1, mechanics: 13, pilot: 7, useComputer: 13 },
    feats: ["point-blank-shot", ...sf("mechanics", "useComputer"), "tech-specialist", ...wp("pistols", "simple")],
    tal: ["gimmick"],
    wpn: [["unarmed", 1, "1d4"], ["blaster-pistol", 2, "3d6"]],
    notes: notes({ Posses: "pistola blaster, comlink, computador pessoal, code cylinder, kit de ferramentas" })
  }),
  c("Trader", {
    cl: 1, cls: [["nonheroic", 4]], ab: [8, 10, 9, 12, 12, 13], def: [10, 9, 11], hp: 7, dt: 9, bab: 3,
    sk: { initiative: 2, deception: 13, perception: 8, persuasion: 13 },
    feats: [...sf("deception", "persuasion"), ...st("perception"), ...wp("pistols", "simple")],
    wpn: [["unarmed", 2, "1d4-1"], ["hold-out-blaster", 3, "3d4"]],
    notes: notes({ Posses: "hold-out, datapad com inventário, mercadorias" })
  }),
  c("Elite Warrior", {
    cl: 15, fp: 5, dr: 2, cls: [["nonheroic", 3], ["soldier", 8], ["elite-trooper", 5]], ab: [17, 15, 12, 12, 12, 8], def: [28, 28, 24], hp: 116, dt: 28, bab: 15,
    sk: { endurance: 14, initiative: 15, perception: 16 },
    feats: [...ap("light", "medium"), "burst-fire", "charging-fire", "double-attack:rifles", "martial-arts-i", "point-blank-shot", "toughness", "triple-attack:rifles", "weapon-focus:rifles", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["armored-defense", "controlled-burst", "devastating-attack:rifles", "gun-club", "multiattack-proficiency-rifles", "weapon-specialization:rifles"],
    wpn: [[{ base: "heavy-blaster-rifle", name: "Gun Club" }, 18, "1d6+9"], ["combat-gloves", 18, "1d6+10"], ["heavy-blaster-pistol", 17, "3d8+6"], ["heavy-blaster-rifle", 18, "3d10+8"]],
    armor: "corellian-powersuit",
    notes: notes({ Sentidos: "visão na penumbra", "Controlled Burst": "rifle +16 (5d10+8)", "Double Attack": "rifle +15/+15 (3d8+8)", "Triple Attack": "rifle +10/+10/+10 (3d8+8)", "Gun club": "coronhada com o rifle", Qualidades: "RD 2, delay damage", Posses: "luvas de combate, rifle blaster pesado com mira de penumbra, pistola blaster pesada, powersuit corelliana (+7) com pacote de capacete, cinto" })
  }),
  c("Mandalorian Supercommando", {
    cl: 16, sp: "human", fp: 5, ds: 2, dr: 4, cls: [["soldier", 7], ["elite-trooper", 9]], ab: [16, 17, 15, 12, 14, 10], def: [37, 34, 28], hp: 144, dt: 34, bab: 16,
    sk: { endurance: 15, initiative: 16, perception: 17, pilot: 16, treatInjury: 15 },
    feats: [...ap("light", "medium"), "cleave", "combat-reflexes", "double-attack:advancedMelee", "great-cleave", "martial-arts-i", "point-blank-shot", "power-attack", "weapon-focus:advancedMelee", ...wp("advanced-melee", "heavy", "pistols", "rifles", "simple")],
    tal: ["armor-mastery", "armored-defense", "greater-weapon-focus:advancedMelee", "greater-weapon-specialization:advancedMelee", "improved-armored-defense", "indomitable", "second-skin", "tough-as-nails", "weapon-specialization:advancedMelee"],
    wpn: [["force-pike", 21, "2d8+15"], ["combat-gloves", 19, "1d6+12"], ["vibrobayonet", 21, "2d6+15"], ["blaster-carbine", 19, "3d8+8"], ["light-repeating-blaster", 14, "3d8+8"], ["frag-grenade", 19, "4d6+8"]],
    armor: "battle-armor",
    notes: notes({ Sentidos: "visão na penumbra", Percepção: "+15 no cabeçalho, +17 na lista (usado +17)", "Double Attack": "force pike +16/+16 (2d8+15); vibrobaioneta +16/+16 (2d6+15)", "Repetidor leve": "+17 quando apoiado", Qualidades: "RD 4, delay damage",
      "Armadura mandaloriana": "liga rara (beskar): bônus de equipamento na Fortitude +1 maior que o normal; a RD do usuário vale contra sabres de luz; em algumas eras dá circunstância favorável para intimidar; custa 30.000 cr a mais. Usada a armadura de batalha (+8, +3) como base",
      Posses: "force pike, luvas de combate, repetidor leve com vibrobaioneta, coronha estendida e lança-granadas, 4 granadas de fragmentação, carabina blaster, armadura de batalha mandaloriana (+8, +3) com pacote de capacete, capa, kit de campo, eletrobinóculos, cinto" })
  }),

  /* ---------------- Cap. 2: criaturas ---------------- */
  b("Corellian Banshee Bird", {
    cl: 2, size: "small", speed: 10, cls: [["beast", 3]], ab: [10, 18, 12, 2, 14, 11], def: [15, 11, 12], hp: 16, dt: 11, bab: 2,
    sk: { perception: 8 },
    feats: ["running-attack", "weapon-finesse"],
    wpn: [{ nat: "claw", name: "Garra", atk: 6, dmg: "1d3+1" }],
    notes: notes({ Deslocamento: "voo 10", Sentidos: "visão na penumbra", "Banshee's Wail": "ação padrão: 1d20+6 contra a Vontade de todos a até 12 quadrados; quem for atingido desce −1 passo (um mesmo alvo só uma vez por turno); no fim da trilha, cai e não age em vez de desmaiar. Afeta a mente" })
  }),
  b("Corellian Sand Panther", {
    cl: 7, speed: 8, cls: [["beast", 8]], ab: [18, 23, 16, 2, 14, 14], def: [17, 12, 12], hp: 52, dt: 12, bab: 5,
    sk: { perception: 7, stealth: 16, survival: 7 },
    feats: [...sf("stealth"), ...st("perception", "survival")],
    wpn: [{ nat: "claw", name: "Garra (2, veneno)", atk: 9, dmg: "1d4+8" }, { nat: "bite", name: "Mordida", atk: 9, dmg: "1d6+8" }],
    notes: notes({ Sentidos: "visão na penumbra, faro", Ambush: "+2d6 de dano com armas naturais contra oponente desprevenido", Veneno: "garras que ferem: 1d20+9 contra a Fortitude, −1 passo; ataca a cada rodada até Treat Injury CD 15" })
  }),
  b("Dragonsnake", {
    cl: 12, size: "large", speed: 6, cls: [["beast", 13]], ab: [24, 12, 20, 2, 14, 10], def: [14, 15, 12], hp: 136, dt: 20, bab: 9,
    sk: { initiative: 12, perception: 13, stealth: 7 },
    feats: ["cleave", "power-attack", ...st("perception", "stealth"), "toughness"],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 16, dmg: "1d6+13" }, { nat: "bite", name: "Mordida", atk: 16, dmg: "1d8+13" }],
    notes: notes({ Deslocamento: "6; natação 12", "Espaço/alcance": "2×2; alcance 1", Sentidos: "visão na penumbra", Ambush: "+2d6 de dano com armas naturais contra oponente desprevenido", Origem: "Dagobah" })
  }),
  b("Gundark", {
    cl: 10, cls: [["beast", 10]], ab: [27, 18, 22, 6, 15, 13], def: [19, 16, 13], hp: 105, dt: 16, bab: 7,
    sk: { acrobatics: 9, climb: 13, initiative: 9, perception: 13, stealth: 9, survival: 8 },
    feats: ["crush", "mighty-swing", "pin", "power-attack"],
    wpn: [{ nat: "claw", name: "Pancada (4)", atk: 15, dmg: "1d4+13" }, { nat: "bite", name: "Mordida", atk: 15, dmg: "1d6+13" }, ["club", 15, "1d6+16"]],
    notes: notes({ Sentidos: "visão na penumbra, faro", Ataques: "4 pancadas e mordida, ou porrete", "Porrete": "Mighty Swing +15 (2d6+16); Power Attack +11 (1d6+24)", Constrict: "ao agarrar com sucesso, usa Crush e Pin normalmente; o Crush causa 2d6+13" })
  }),
  b("Katarn", {
    cl: 8, speed: 10, dr: 5, cls: [["beast", 8]], ab: [20, 18, 15, 2, 15, 9], def: [19, 13, 13], hp: 60, dt: 13, bab: 6,
    sk: { climb: 19, initiative: 8, jump: 9, perception: 7, stealth: 8, survival: 12 },
    feats: ["power-attack", ...sf("climb"), ...st("survival")],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 11, dmg: "1d10+9" }, { nat: "bite", name: "Mordida", atk: 11, dmg: "1d4+9" }, { nat: "gore", name: "Chifres", atk: 11, dmg: "2d4+9" }],
    notes: notes({ Sentidos: "visão na penumbra", RD: "5", Origem: "Kashyyyk", "Maternal Rage": "fêmea com filhotes ameaçados: +2 nos ataques e dano corpo a corpo e +2 na Fortitude e Vontade, −2 na Reflexos, por 5 + mod. de Con rodadas; depois −1 passo persistente até descansar 10 minutos" })
  }),
  b("Kintan Strider", {
    cl: 5, size: "large", speed: 6, cls: [["beast", 6]], ab: [22, 8, 22, 2, 14, 6], def: [15, 16, 12], hp: 63, dt: 26, bab: 4,
    sk: { initiative: -1, endurance: 11, perception: 2 },
    feats: ["improved-damage-threshold", ...wp("simple")],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 10, dmg: "1d6+9" }, [{ base: "mace", name: "Tree Branch" }, 10, "1d8+12"]],
    notes: notes({ "Espaço/alcance": "2×2; alcance 2", Sentidos: "visão na penumbra", "Fast Healing 5": "recupera 5 PV no fim de cada turno até o máximo, até morrer", Posses: "galho de árvore (como maça)" })
  }),
  b("Knobby White Spider", {
    cl: 8, size: "huge", speed: 6, cls: [["beast", 9]], ab: [26, 14, 34, 2, 12, 10], def: [16, 22, 11], hp: 130, dt: 37, bab: 6,
    sk: { endurance: 21, jump: 15, perception: 5 },
    feats: ["improved-damage-threshold", "rapid-strike", ...st("endurance"), "toughness"],
    wpn: [{ nat: "claw", name: "Ferrão (veneno)", atk: 14, dmg: "1d8+12" }, { nat: "bite", name: "Mordida", atk: 14, dmg: "2d6+12" }],
    notes: notes({ "Espaço/alcance": "3×3; alcance 2", Sentidos: "darkvision", "Rapid Strike": "ferrão +12 (2d8+12) e mordida +12 (3d6+12)", Veneno: "ferrão que fere: 1d20+10 contra a Fortitude, −1 passo; no fim da trilha fica imobilizado, não inconsciente; ataca a cada rodada até Treat Injury CD 15", Origem: "raízes móveis das árvores gnarl de Dagobah" })
  }),
  b("Kouhun", {
    cl: 2, size: "diminutive", speed: 6, cls: [["beast", 3]], ab: [4, 18, 12, 1, 14, 12], def: [19, 11, 12], hp: 19, dt: 11, bab: 2,
    sk: { initiative: 10, perception: 8, stealth: 25 },
    feats: [...st("initiative", "perception")],
    wpn: [{ nat: "bite", name: "Mordida (veneno)", atk: -1, dmg: "1d4" }],
    notes: notes({ Sentidos: "darkvision", "Espaço/alcance": "1 quadrado; alcance 0", Veneno: "mordida que fere: 1d20+10 contra a Fortitude, 4d6 e −1 passo (ao errar, metade e sem passo); ataca a cada rodada até Treat Injury CD 25", Camuflagem: "com corante da cor do quarto da vítima, +3 em Stealth (+28)", Uso: "arma preferida de assassinos (como em Ataque dos Clones)" })
  }),
  b("Greater Krayt Dragon", {
    cl: 16, size: "colossal", speed: 10, dr: 15, cls: [["beast", 17]], ab: [54, 6, 48, 1, 13, 10], def: [16, 30, 12], hp: 399, dt: 80, bab: 12,
    sk: { initiative: -2, perception: 6, stealth: 8 },
    feats: ["improved-defenses", "power-attack", "powerful-charge", ...sf("stealth"), ...st("perception"), "triple-crit:natural"],
    wpn: [{ nat: "bite", name: "Mordida (×3)", atk: 24, dmg: "4d6+40", pa: 10 }, { nat: "slam", name: "Cauda", atk: 24, dmg: "3d6+40", pa: 10 }],
    notes: notes({ "Espaço/alcance": "8×8; alcance 6", Sentidos: "visão na penumbra, tremorsense", "Power Attack": "ataques incluem 10 pontos de Power Attack; Powerful Charge: mordida +28 (4d6+48, ×3)",
      Tremorsense: "percebe automaticamente tudo que toca o chão a até 100 quadrados", Camouflage: "ignora o modificador de tamanho em Stealth",
      Devour: "mordida que acerta criatura Enorme ou menor: teste de agarrar automático; se vencer, a vítima sofre 1d8+22 por rodada na boca; a 0 PV é engolida e sofre 1d6 de ácido por rodada",
      "Pérolas de dragão": "2d4+2 no estômago, cada uma valendo mais de 100.000 créditos" })
  }),
  b("Canyon Krayt Dragon", {
    cl: 14, size: "colossal", speed: 10, dr: 10, cls: [["beast", 15]], ab: [44, 8, 40, 1, 14, 6], def: [14, 25, 12], hp: 292, dt: 75, bab: 11,
    sk: { initiative: -1, climb: 22, perception: 4 },
    feats: ["power-attack", "powerful-charge", ...sf("perception"), ...st("climb"), "triple-crit:natural"],
    wpn: [{ nat: "bite", name: "Mordida (×3)", atk: 24, dmg: "4d6+28", pa: 4 }, { nat: "claw", name: "Garra (2, ×3)", atk: 24, dmg: "3d6+28", pa: 4 }],
    notes: notes({ "Espaço/alcance": "6×6; alcance 4", Sentidos: "visão na penumbra, tremorsense", Percepção: "+12 no cabeçalho, +4 na lista (usado +4)", "Power Attack": "inclui 4 pontos; Powerful Charge: mordida +28 (4d6+35, ×3)",
      Tremorsense: "percebe tudo que toca o chão a até 100 quadrados", Devour: "como o krayt maior (1d8+22 por rodada; engolido a 0 PV, 1d6 de ácido por rodada)", "Pérolas de dragão": "1d4+4 no estômago" })
  }),
  b("Mantellian Savrip", {
    cl: 6, sp: "mantellian-savrip", cls: [["beast", 6]], ab: [18, 8, 20, 6, 6, 4], def: [16, 15, 8], hp: 39, dt: 20, bab: 4,
    sk: { initiative: 2, perception: 6, stealth: 2, survival: 1 },
    feats: ["mighty-swing", "power-attack", "toughness"],
    wpn: [{ nat: "claw", name: "Garra (veneno)", atk: 8, dmg: "1d6+7" }, { nat: "bite", name: "Mordida", atk: 8, dmg: "1d8+7" }],
    notes: notes({ Idioma: "Savrip", "Mighty Swing": "garra +8 (2d6+7)", Veneno: "mordida que fere: 1d20+10 contra a Fortitude, −1 passo; no fim da trilha fica imobilizado; ataca a cada rodada até Treat Injury CD 15",
      Ferocious: "rerrola um ataque com arma natural que errou (fica com o novo resultado)", Survivor: "rerrola Perception, Stealth ou Survival (fica com o novo resultado)", Primitive: "sem proficiência em pistolas, rifles e armas pesadas" })
  }),
  b("Massiff", {
    cl: 3, cls: [["beast", 4]], ab: [18, 10, 18, 2, 14, 12], def: [14, 14, 12], hp: 42, dt: 14, bab: 3,
    sk: { initiative: 2, perception: 9 },
    feats: ["pin", "toughness"],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 7, dmg: "1d4+6" }, { nat: "bite", name: "Mordida", atk: 7, dmg: "1d6+6" }],
    notes: notes({ Tipo: "fera do deserto (Geonosis, Tatooine)", Sentidos: "darkvision, faro", Uso: "cão de guarda de geonosianos e Tusken" })
  }),
  b("Mynock", {
    cl: 1, size: "small", speed: 10, cls: [["beast", 2]], ab: [8, 20, 20, 2, 14, 10], def: [18, 15, 12], hp: 21, dt: 15, bab: 1,
    sk: { initiative: 6, perception: 8 },
    feats: ["running-attack"],
    wpn: [{ nat: "slam", name: "Asa (2)", atk: 0, dmg: "1d3" }],
    notes: notes({ Deslocamento: "voo 10 (só no espaço)", Sentidos: "darkvision", "Survive in Vacuum": "não sofre dano no vácuo, mas sofre o dano equivalente numa atmosfera planetária", "Fly through Space": "voa no vácuo sem penalidade", Comportamento: "prende-se ao casco das naves e suga energia" })
  }),
  b("Narglatch", {
    cl: 6, size: "huge", speed: 8, cls: [["beast", 7]], ab: [27, 14, 24, 2, 13, 11], def: [14, 17, 11], hp: 80, dt: 27, bab: 5,
    sk: { initiative: 7, perception: 1, stealth: 12 },
    feats: ["pin", ...sf("stealth"), ...st("initiative")],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 13, dmg: "1d8+11" }, { nat: "bite", name: "Mordida", atk: 13, dmg: "2d6+11" }],
    notes: notes({ Tipo: "fera aquática (Naboo, Orto Plutonia)", Deslocamento: "8; natação 4", "Espaço/alcance": "3×3; alcance 2", Sentidos: "visão na penumbra, faro" })
  }),
  b("Nashtah", {
    cl: 9, speed: 14, cls: [["beast", 9]], ab: [19, 15, 13, 1, 19, 7], def: [17, 11, 15], hp: 58, dt: 21, bab: 6,
    sk: { initiative: 11, jump: 8, perception: 8, survival: 8 },
    feats: ["improved-damage-threshold", "improved-damage-threshold", "rapid-strike", "toughness"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 10, dmg: "1d8+8" }, { nat: "slam", name: "Cauda farpada", atk: 10, dmg: "1d3+8" }, { nat: "claw", name: "Garra", atk: 10, dmg: "1d6+8" }],
    notes: notes({ Origem: "Dra III (\"cães dravianos\")", Sentidos: "visão na penumbra, faro", Ataques: "mordida, cauda e garra; ou com Rapid Strike: garra +8 (2d6+8), cauda +8 (2d3+8), garra +8 (2d6+8)", "Leap Attack": "rodada completa, no fim de uma investida de pelo menos 2 quadrados: seis ataques de garra contra um único alvo" })
  }),
  b("Dathomiri Rancor", {
    cl: 11, size: "huge", speed: 8, fp: 2, cls: [["beast", 9], ["scout", 3]], ab: [28, 9, 23, 5, 10, 15], def: [17, 16, 10], hp: 146, dt: 26, bab: 8,
    sk: { perception: 11, survival: 11 },
    feats: ["cleave", "crush", "pin", "power-attack", ...st("survival"), "toughness", ...wp("simple")],
    tal: ["acute-senses", "expert-tracker"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 18, dmg: "1d8+15" }, { nat: "claw", name: "Garra", atk: 18, dmg: "2d6+15" }, ["sling", 7, "1d4+15"]],
    notes: notes({ Idioma: "Paeciano (entende Basic fora de Dathomir)", "Espaço/alcance": "3×3; alcance 2", Sentidos: "visão na penumbra", "Fast Healing 5": "recupera 5 PV por rodada até morrer", Rerrolagem: "Perception (segundo resultado)", Descrição: "rancor inteligente, parceiro e montaria das Bruxas de Dathomir; usa fundas e ferramentas simples" })
  }),
  b("Tyrant Rancor", {
    cl: 15, size: "gargantuan", speed: 8, cls: [["beast", 15]], ab: [38, 9, 40, 2, 7, 15], def: [15, 25, 8], hp: 307, dt: 45, bab: 11,
    sk: { initiative: 11, perception: 5 },
    feats: ["bantha-rush", "cleave", "crush", "pin", "power-attack", "toughness"],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 20, dmg: "2d6+26", pa: 5 }, { nat: "bite", name: "Mordida", atk: 20, dmg: "3d6+26", pa: 5 }],
    notes: notes({ "Espaço/alcance": "4×4; alcance 3", Sentidos: "visão na penumbra", "Fast Healing 10": "recupera 10 PV por rodada até morrer", "Power Attack": "ataques incluem 5 pontos" })
  }),
  b("Tra'cor", {
    cl: 6, size: "large", speed: 6, cls: [["beast", 7]], ab: [22, 11, 25, 2, 10, 13], def: [13, 17, 10], hp: 81, dt: 22, bab: 5,
    sk: { initiative: 3, perception: 3, swim: 14 },
    feats: ["bantha-rush", "cleave", "power-attack"],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 9, dmg: "1d6+11", pa: 2 }, { nat: "bite", name: "Mordida", atk: 9, dmg: "1d8+11", pa: 2 }, { nat: "slam", name: "Cauda", atk: 9, dmg: "1d6+11", pa: 2 }],
    notes: notes({ Tipo: "fera aquática (subespécie de rancor de Socorro)", Deslocamento: "6; natação 8", "Espaço/alcance": "2×2; alcance 2", Sentidos: "visão na penumbra", "Fast Healing 5": "recupera 5 PV por rodada até morrer", "Power Attack": "ataques incluem 2 pontos" })
  }),
  b("Ronto", {
    cl: 3, size: "huge", speed: 8, cls: [["beast", 4]], ab: [26, 9, 28, 2, 12, 6], def: [11, 19, 11], hp: 54, dt: 29, bab: 3,
    sk: { endurance: 11, perception: 1 },
    feats: [...sf("endurance"), "toughness"],
    wpn: [{ nat: "slam", name: "Pancada", atk: 11, dmg: "1d8+10" }],
    notes: notes({ Tipo: "fera do deserto (Tatooine)", "Espaço/alcance": "3×3; alcance 2", Sentidos: "visão ruim, faro", "Poor Vision": "−5 em Perception baseada em visão; fareja um krayt a 1 km" })
  }),
  b("Sarlacc", {
    cl: 12, size: "colossal", speed: 0, dr: 10, cls: [["beast", 13]], ab: [28, 10, 44, 2, 8, 7], def: [7, 28, 10], hp: 234, dt: 83, bab: 9,
    sk: { initiative: 0, perception: 10, stealth: 11 },
    feats: ["improved-damage-threshold", "improved-defenses", "pin", ...st("stealth"), "toughness"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 18, dmg: "4d6+15" }],
    notes: notes({ "Espaço/alcance": "6×6; alcance 4", Deslocamento: "0 (imóvel)", Sentidos: "tremorsense", RD: "10", Cobertura: "cobertura melhorada já incluída na Reflexos",
      Tentáculos: "9 tentáculos +18 (especial)", "Tentacle Grab": "tentáculo que acerta criatura Enorme ou menor: agarrar automático; vencendo, puxa 1 quadrado por rodada até a boca",
      Digestão: "estômago principal: 2d6 por rodada, cumulativo (Acrobatics contra For +9 para escapar); estômagos secundários: 1d6 por dia, cumulativo (Força para escapar)",
      Camouflage: "ignora o modificador de tamanho em Stealth", Tremorsense: "percebe tudo que toca o chão a até 100 quadrados" })
  }),
  b("Varactyl", {
    cl: 4, size: "huge", speed: 10, cls: [["beast", 4]], ab: [26, 18, 32, 2, 14, 8], def: [12, 21, 12], hp: 62, dt: 31, bab: 3,
    sk: { climb: 20, endurance: 13, jump: 10, perception: 4, stealth: -4, swim: 10 },
    feats: ["running-attack", ...sf("climb")],
    wpn: [{ nat: "bite", name: "Bico", atk: 11, dmg: "1d8+10" }, { nat: "claw", name: "Garra", atk: 11, dmg: "1d6+10" }, { nat: "slam", name: "Cauda (Trip)", atk: 11, dmg: "1d4+10" }],
    notes: notes({ Origem: "Utapau", "Espaço/alcance": "3×3; alcance 1", Sentidos: "visão na penumbra", "Excellent Climber": "rerrola Climb (fica com o novo resultado)", Trip: "cauda que acerta: tenta derrubar o alvo como ação livre, sem provocar ataque de oportunidade",
      Treinamento: "selvagem começa inamistoso; indiferente permite aproximação; amistoso aceita montaria com penalidades em Ride; prestativo aceita cavaleiros sem resistência" })
  }),
  c("Varactyl Handler", {
    cl: 1, sp: "utai", cls: [["nonheroic", 2]], ab: [13, 12, 12, 8, 14, 13], def: [12, 11, 12], hp: 7, dt: 11, bab: 1,
    sk: { initiative: 2, knowledgeLifeSciences: 5, perception: 3, persuasion: 12, ride: 7 },
    feats: [...sf("persuasion"), ...st("knowledgeLifeSciences", "ride"), ...wp("simple")],
    wpn: [["stun-baton", 2, "2d6+1"]],
    notes: notes({ Sentidos: "visão na penumbra", Qualidades: "animal handler, cooperative (traços Utai)", "Stun baton": "atordoamento", Posses: "stun baton, pertences pessoais" })
  }),
  b("Vornskr", {
    cl: 7, speed: 8, cls: [["beast", 7]], ab: [16, 17, 17, 5, 14, 10], def: [18, 13, 12], hp: 52, dt: 13, bab: 5,
    sk: { perception: 8, stealth: 11, useTheForce: 8 },
    feats: ["combat-reflexes", "force-sensitivity", "rapid-strike", ...st("stealth")],
    tal: ["force-perception"],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 8, dmg: "1d6+6" }, { nat: "bite", name: "Mordida", atk: 8, dmg: "1d8+6" }, { nat: "slam", name: "Cauda (veneno)", atk: 8, dmg: "1d4+6" }],
    notes: notes({ Origem: "Myrkr", Sentidos: "visão na penumbra", "Rapid Strike": "garras +6 (2d6+6), mordida +6 (2d8+6), cauda +6 (2d4+6 e veneno)", Veneno: "cauda que fere: 1d20+8 contra a Fortitude, −1 passo; no fim da trilha fica imobilizado, não inconsciente", Comportamento: "caçam ysalamiri e atacam usuários da Força; Talon Karrde tem dois domesticados (Sturm e Drang)" })
  }),
  b("Womp Rat", {
    cl: 2, cls: [["beast", 3]], ab: [12, 10, 14, 2, 12, 8], def: [12, 12, 11], hp: 25, dt: 12, bab: 2,
    sk: { initiative: 1, endurance: 8, perception: 7 },
    feats: [...st("endurance"), "toughness"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 3, dmg: "1d6+2" }],
    notes: notes({ Tipo: "fera do deserto (Tatooine)", Sentidos: "visão na penumbra", Overwhelm: "+2 nos ataques corpo a corpo para cada outro womp rat aliado adjacente" })
  }),
  b("Womp Rat Pack", {
    cl: 4, size: "large", cls: [["beast", 3]], ab: [12, 10, 14, 2, 12, 8], def: [11, 12, 11], hp: 26, dt: 22, bab: 2,
    sk: { initiative: 1, endurance: 8, perception: 7, stealth: -4 },
    feats: [...st("endurance"), "toughness"],
    wpn: [{ nat: "bite", name: "Mordida (área)", atk: 3, dmg: "1d6+2" }],
    notes: notes({ Tipo: "matilha (3-4 womp rats agindo como uma criatura)", "Espaço/alcance": "2×2; alcance 1", Sentidos: "visão na penumbra", Overwhelm: "+2 nos ataques corpo a corpo para cada outra matilha aliada adjacente",
      "Pack Traits": "o ataque corpo a corpo é de área e atinge todos os quadrados ao alcance (exceto matilhas aliadas); ataques à distância têm splash 1; ataques de área causam +2 dados contra a matilha",
      "Criar matilhas/enxames": "a partir de qualquer fera: tamanho +1 categoria, PV ×2, Limiar +10, ataques corpo a corpo de área, à distância com splash 1, +2 dados de dano de área contra ela; ND +2" })
  }),
  b("Ysalamiri", {
    cl: 1, size: "tiny", speed: 2, cls: [["beast", 1]], ab: [3, 7, 6, 2, 6, 6], def: [10, 8, 8], hp: 2, dt: 8, bab: 0,
    sk: { climb: 1, initiative: -2, perception: -2, stealth: 13, survival: -2 },
    feats: [...sf("stealth")],
    wpn: [{ nat: "bite", name: "Mordida", atk: -3, dmg: "1d4-4" }],
    notes: notes({ Origem: "Myrkr", Deslocamento: "2; escalada 2", "Espaço/alcance": "1 quadrado; alcance 0", Sentidos: "visão na penumbra",
      "Nullify Force": "bolha de 6 quadrados de raio: ninguém dentro usa poderes, técnicas, segredos ou Use the Force; poderes de fora não entram; automático (Thrawn os usou contra Jedi)",
      "Arboreal Grip": "+20 nos testes de agarrar resistidos para ser removido da árvore; morre em 1d4 dias se removido" })
  }),
  /* ---------------- Cap. 3: droides ---------------- */
  d("VX Series Artillery Droid", {
    cl: 12, fp: 1, speed: 6, cls: [["soldier", 12]], ab: [12, 14, null, 10, 10, 8], def: [26, 26, 23], hp: 90, dt: 31, bab: 12,
    sk: { perception: 13 },
    feats: [...ap("light", "medium"), "coordinated-attack", "double-attack:heavy", "far-shot", "improved-damage-threshold", "improved-defenses", "point-blank-shot", "precise-shot", "sniper", "triple-attack:heavy", "weapon-focus:heavy", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["battle-analysis", "devastating-attack:heavy", "indomitable", "penetrating-attack:heavy", "tough-as-nails", "weapon-specialization:heavy"],
    wpn: [["missile-launcher", 15, "6d6+8"], [{ base: "missile-launcher", name: "Light Concussion Missile Launcher" }, 15, "4d10+8"]],
    notes: notes({ Tipo: "droide de 4º grau (Czerka); não pode ser herói", Deslocamento: "6 (esteiras)", Sentidos: "visão na penumbra", "Míssil de concussão leve": "dano 4d10+8 ×2, splash 2; +5 contra alvos menores que Enorme (−10 normalmente, já com Sniper/Far Shot)", Sistemas: "esteiras, 2 ferramentas, processador básico, pacote sensorial aprimorado, comlink integrado", Posses: "2 lança-mísseis com 4 carregadores, lança-mísseis de concussão leve com 2 mísseis", Disponibilidade: "Militar; 30.000 créditos" })
  }),
  d("ASN-121 Assassin Droid", {
    cl: 9, size: "small", speed: 9, cls: [["soldier", 9]], ab: [8, 16, null, 12, 14, 10], def: [26, 20, 21], hp: 74, dt: 25, bab: 9,
    sk: { initiative: 12, knowledgeTactics: 10, mechanics: 10, perception: 11, stealth: 12 },
    feats: [...ap("light", "medium"), "deadeye", "improved-damage-threshold", "point-blank-shot", "precise-shot", "running-attack", "sniper", "weapon-focus:pistols", ...wp("pistols", "rifles", "simple")],
    tal: ["battle-analysis", "cover-fire", "demolitionist", "devastating-attack:pistols", "penetrating-attack:pistols"],
    wpn: [{ nat: "claw", name: "Garra", atk: 8, dmg: "1d3+3" }, [{ base: "heavy-blaster-pistol", name: "Sniper Blaster" }, 12, "3d8+4"]],
    notes: notes({ Tipo: "droide de 4º grau; não pode ser herói", Deslocamento: "9 (voo)", Sentidos: "darkvision, visão na penumbra", "Immune to Security Scans": "sob ordem, emite feixes que o tornam invisível a observação eletrônica", Sistemas: "voo, pacote sensorial aprimorado, darkvision, armazenamento interno (2 kg), processador heurístico, carapaça de quadanium (+3), garra, 2 ferramentas, suporte estabilizado", Posses: "sniper blaster (como pistola blaster pesada)", Disponibilidade: "Militar; 5.730 créditos" })
  }),
  d("R3 Series Astromech Droid", {
    cl: 1, size: "small", speed: 6, cls: [["nonheroic", 3]], ab: [9, 16, null, 15, 10, 7], def: [14, 9, 10], hp: 10, dt: 9, bab: 2,
    sk: { initiative: 4, knowledgePhysicalSciences: 9, mechanics: 15, perception: 3, pilot: 9, stealth: 9, useComputer: 13 },
    feats: [...sf("mechanics", "useComputer"), ...st("pilot"), "toughness"],
    wpn: [{ custom: "probe", atk: 1, dmg: "1d8" }],
    notes: notes({ Tipo: "droide de 2º grau (Industrial Automaton); pode ser jogado como herói droide", Deslocamento: "6 (rodas), 4 (andando)", Sentidos: "darkvision, visão na penumbra", Sistemas: "rodas, andando, pés magnéticos, processador heurístico, 6 ferramentas, garra, apêndice telescópico, pacote de diagnóstico, comlink, armazenamento (2 kg), pacote sensorial aprimorado, darkvision", Posses: "buffer de astrogação (5 memórias), serra circular, soldador a arco, sonda de eletrochoque, extintor, holoprojetor, holográfico", Disponibilidade: "Militar; 10.000 créditos" })
  }),
  d("R4 Series Astromech Droid", {
    cl: 1, size: "small", speed: 6, cls: [["nonheroic", 2]], ab: [9, 14, null, 13, 10, 10], def: [13, 9, 10], hp: 8, dt: 9, bab: 1,
    sk: { initiative: 3, mechanics: 14, perception: 1, pilot: 8, stealth: 8, useComputer: 12 },
    feats: [...sf("mechanics", "useComputer"), ...st("pilot")],
    wpn: [{ custom: "probe", atk: 0, dmg: "1d8" }],
    notes: notes({ Tipo: "droide de 2º grau; pode ser jogado como herói droide", Deslocamento: "6 (rodas), 4 (andando)", Sentidos: "darkvision", Sistemas: "rodas, andando, processador heurístico, 6 ferramentas, garra, pacote de diagnóstico, comlink, armazenamento (8 kg), darkvision", Posses: "serra circular, soldador a arco, sonda de eletrochoque, kit de ferramentas", Disponibilidade: "Licenciado; 2.500 créditos" })
  }),
  d("R5 Series Astromech Droid", {
    cl: 1, size: "small", speed: 6, cls: [["nonheroic", 2]], ab: [9, 10, null, 10, 10, 7], def: [11, 9, 10], hp: 5, dt: 9, bab: 1,
    sk: { initiative: 1, mechanics: 13, perception: 3, stealth: 6, useComputer: 11 },
    feats: [...sf("mechanics", "useComputer"), ...st("mechanics")],
    wpn: [{ custom: "probe", atk: 0, dmg: "1d8" }],
    notes: notes({ Tipo: "droide de 2º grau; pode ser jogado como herói droide", Deslocamento: "6 (rodas), 4 (andando)", Sentidos: "darkvision, visão na penumbra", Descrição: "o fracasso da Industrial Automaton: superaquece e guarda só um conjunto de coordenadas", Sistemas: "rodas, andando, pés magnéticos, processador heurístico, 6 ferramentas, garra, apêndice telescópico, pacote de diagnóstico, comlink, armazenamento (2 kg), pacote sensorial aprimorado, darkvision", Posses: "serra circular, soldador a arco, sonda de eletrochoque, extintor, holoprojetor, holográfico", Disponibilidade: "Licenciado; 1.500 créditos" })
  }),
  d("R7 Series Astromech Droid", {
    cl: 2, size: "small", speed: 6, cls: [["nonheroic", 6]], ab: [9, 16, null, 16, 12, 10], def: [14, 9, 11], hp: 21, dt: 9, bab: 5,
    sk: { initiative: 11, knowledgePhysicalSciences: 16, mechanics: 13, perception: 6, pilot: 16, stealth: 11, useComputer: 16 },
    feats: [...sf("knowledgePhysicalSciences", "pilot", "useComputer"), ...st("initiative"), "toughness"],
    wpn: [{ custom: "probe", atk: 4, dmg: "1d8" }],
    notes: notes({ Tipo: "droide de 2º grau; pode ser jogado como herói droide", Deslocamento: "6 (rodas), 4 (andando)", Sentidos: "darkvision, visão na penumbra", Especialidade: "feito para o E-wing; em outros caças sofre −4 em todas as perícias; guarda 15 conjuntos de coordenadas", Sistemas: "rodas, andando, pés magnéticos, processador heurístico, 4 ferramentas, garra, apêndice telescópico, pacote de diagnóstico, comlink, armazenamento (1 kg), pacote sensorial aprimorado, darkvision", Posses: "soldador a arco, sonda de eletrochoque, extintor, holoprojetor, holográfico", Disponibilidade: "Militar; 8.000 créditos" })
  }),
  d("R2-R Series Reconnaissance Astromech Droid", {
    cl: 1, size: "small", speed: 6, cls: [["scoundrel", 1]], ab: [9, 14, null, 14, 12, 7], def: [16, 10, 13], hp: 24, dt: 10, bab: 0,
    sk: { initiative: 2, deception: 3, gatherInformation: 12, mechanics: 7, perception: 6, pilot: 7, stealth: 7, useComputer: 12 },
    feats: ["point-blank-shot", ...sf("useComputer"), ...wp("pistols", "simple")],
    tal: ["trace"],
    wpn: [["hold-out-blaster", 2, "3d4"]],
    notes: notes({ Tipo: "droide de 2º grau (variante R2 para o Recon-X); pode ser jogado como herói droide", Deslocamento: "6 (rodas), 4 (andando)", Sentidos: "darkvision, visão na penumbra", Sistemas: "rodas, andando, pés magnéticos, processador heurístico, 6 ferramentas, garra, darkvision, pacote de diagnóstico, pacote sensorial aprimorado, armazenamento (2 kg)", Posses: "hold-out, buffer de astrogação (10 memórias), unidade de dados (50 h de holograma), holográfico, holoprojetor" })
  }),
  d("B3 Series Ultra Battle Droid", {
    cl: 3, size: "large", speed: 8, cls: [["nonheroic", 9]], ab: [24, 13, null, 10, 12, 8], def: [17, 17, 11], hp: 42, dt: 27, bab: 6,
    sk: { initiative: 4, perception: 12 },
    feats: [...ap("light", "medium"), "burst-fire", "dual-weapon-mastery-i", ...wp("heavy", "rifles", "simple")],
    wpn: [["unarmed", 13, "1d4+8"], ["heavy-repeating-blaster", 7, "3d10+2"], ["flamethrower", 7, "3d6+1"], ["missile-launcher", 7, "6d6+2"]],
    notes: notes({ Tipo: "droide de 4º grau; não pode ser herói", "Ataques": "2 repetidores pesados +7 (3d10+2) cada; Burst Fire +2 (5d10+2) cada", Sistemas: "andando, receptor remoto, processador de reserva, armadura de quadanium (+7), sistemas reforçados (2), comlink, pacote sensorial aprimorado, 2 mãos, 4 ferramentas", Posses: "2 repetidores pesados, lança-chamas com 2 cartuchos, lança-mísseis com 2 carregadores", Disponibilidade: "Militar; 13.400 créditos" })
  }),
  d("B3-A Series Ultra Battle Droid", {
    cl: 5, size: "large", speed: 8, cls: [["soldier", 5]], ab: [24, 13, null, 12, 12, 8], def: [19, 24, 16], hp: 72, dt: 34, bab: 6,
    sk: { initiative: 8, knowledgeTactics: 8, mechanics: 8, perception: 10 },
    feats: [...ap("light", "medium"), "burst-fire", "dual-weapon-mastery-i", "point-blank-shot", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["battle-analysis", "devastating-attack:heavy", "penetrating-attack:heavy"],
    wpn: [["unarmed", 13, "1d4+9"], ["heavy-repeating-blaster", 7, "3d10+2"], ["flamethrower", 7, "3d6+2"], ["missile-launcher", 7, "6d6+2"]],
    notes: notes({ Tipo: "droide de 4º grau com processador heurístico e bateria secundária; não pode ser herói", "Ataques": "2 repetidores pesados +7 (3d10+2) cada; Burst Fire +2 (5d10+2) cada", Sistemas: "andando, processador heurístico, armadura de quadanium (+7), sistemas reforçados (2), comlink, pacote sensorial aprimorado, 2 mãos, 4 ferramentas, bateria secundária", Posses: "2 repetidores pesados, lança-chamas com 2 cartuchos, lança-mísseis com 2 carregadores", Disponibilidade: "Militar; 16.200 créditos" })
  }),
  d("IG Series Lancer Droid", {
    cl: 2, speed: 6, cls: [["nonheroic", 6]], ab: [14, 16, null, 13, 10, 8], def: [13, 12, 10], hp: 15, dt: 12, bab: 4,
    sk: { initiative: 11, pilot: 11 },
    feats: ["powerful-charge", "rapid-strike", "running-attack", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    wpn: [[{ base: "force-pike", name: "Energy Lance" }, 6, "2d8+4"]],
    notes: notes({ Tipo: "droide de 4º grau; não pode ser herói", "Rapid Strike": "lança +4 (3d8+4); com Powerful Charge +8 (3d8+7)", "Energy Lance": "como force pike, com +1 quadrado de alcance", Sistemas: "andando, processador remoto, 2 mãos, comlink, vocabulador", Disponibilidade: "Militar; 2.700 créditos" })
  }),
  d("Pistoeka Buzz Droid", {
    cl: 3, size: "tiny", speed: 8, cls: [["soldier", 3]], ab: [6, 20, null, 11, 14, 8], def: [21, 11, 15], hp: 41, dt: 11, bab: 3,
    sk: { initiative: 11, mechanics: 6, perception: 10, stealth: 16 },
    feats: [...ap("light", "medium"), "point-blank-shot", "weapon-finesse", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["devastating-attack:advancedMelee", "penetrating-attack:advancedMelee"],
    wpn: [[{ base: "vibrodagger", name: "Vibrosaw" }, 8, "2d4+1"], [{ base: "blaster-pistol", name: "Plasma Cutting Torch" }, 8, "2d6+1"]],
    notes: notes({ Tipo: "droide de 4º grau; não pode ser herói", Deslocamento: "8 (voo), 4 (andando)", "Espaço/alcance": "1 quadrado; alcance 0", Sentidos: "visão na penumbra",
      "Discord Missile": "lançado em mísseis discord (2 pontos de instalação, restrito, 4.000 cr; míssil 1.000 cr): ataque contra Reflexos 10 de um quadrado; libera 3 buzz droids; quando um veículo entra no quadrado, eles atacam como reação com +5 e se prendem ao casco",
      Sistemas: "voo, andando limitado, perna extra, pés magnéticos, processador básico, comlink, casca de durasteel (+4), pacote sensorial aprimorado, 2 ferramentas com suporte estabilizado, garra", Disponibilidade: "Militar; 11.400 créditos" })
  }),
  d("EVS Construction Droid", {
    cl: 8, size: "colossal", speed: 8, cls: [["nonheroic", 15]], ab: [50, 6, null, 8, 8, 4], def: [6, 10, 9], hp: 137, dt: 65, bab: 11,
    sk: { initiative: 5, perception: 6, climb: 32, endurance: 32 },
    feats: [...ap("light", "medium"), "crush", "improved-damage-threshold", "pin", "point-blank-shot", ...st("endurance"), "throw", "weapon-focus:simple", ...wp("simple")],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 31, dmg: "2d8+20" }, [{ base: "blaster-pistol", name: "Plasma Cutter" }, 10, "3d6"], [{ base: "grenade-launcher", name: "Implosion Wrecking Ball" }, 10, "3d10"]],
    notes: notes({ Tipo: "droide de 5º grau; não pode ser herói", "Espaço/alcance": "12×12; alcance 4", "Armas à distância": "só contra alvos dentro do alcance do droide; a bola de demolição causa dano dobrado em objetos, veículos e estruturas", Reprogramação: "3 dias e Use Computer CD 30", Sistemas: "andando, 2 garras, 2 suportes de ferramenta, processador básico, blindagem de duranium (+8)", Disponibilidade: "Restrito; 120.000 créditos" })
  }),
  d("GRZ-6B Demolitions Droid", {
    cl: 8, size: "gargantuan", speed: 8, cls: [["nonheroic", 16]], ab: [35, 10, null, 8, 12, 8], def: [11, 22, 12], hp: 106, dt: 47, bab: 12,
    sk: { initiative: 8, knowledgeTechnology: 12, mechanics: 12, perception: 14 },
    feats: [...ap("light"), "improved-damage-threshold", "pin", ...st("mechanics", "knowledgeTechnology"), "toughness", ...wp("heavy", "simple")],
    wpn: [{ nat: "claw", name: "Garra", atk: 12, dmg: "2d6+12" }, [{ base: "heavy-blaster-rifle", name: "Plasma Cannon" }, 24, "3d10+8"], [{ base: "light-repeating-blaster", name: "Laser Cutter" }, 12, "3d8+8"]],
    notes: notes({ Tipo: "droide de 5º grau; não pode ser herói", Descrição: "desmonta prédios e naves; muitos donos o usam como guarda noturno de ferro-velhos", Sistemas: "andando, blindagem de durasteel (+6), comlink, processador básico, 2 garras", Posses: "maçarico de plasma (como rifle blaster pesado), cortador a laser (como repetidor leve)", Disponibilidade: "Licenciado; 43.650 créditos" })
  }),
  d("3PX Espionage Droid", {
    cl: 6, cls: [["nonheroic", 1], ["scoundrel", 6]], ab: [12, 13, null, 14, 15, 15], def: [20, 17, 19], hp: 37, dt: 17, bab: 4,
    sk: { initiative: 4, deception: 10, knowledgeBureaucracy: 10, knowledgeGalacticLore: 10, knowledgeSocialSciences: 10, perception: 12, persuasion: 15, stealth: 9, useComputer: 10 },
    feats: ["linguist", "quick-draw", ...sf("persuasion"), ...st("deception", "knowledgeBureaucracy", "knowledgeGalacticLore", "perception", "stealth"), ...wp("pistols", "simple")],
    tal: ["dastardly-strike", "gimmick", "master-slicer"],
    wpn: [["unarmed", 4, "1d3+4"], ["hold-out-blaster", 3, "3d4+3"]],
    notes: notes({ Tipo: "droide de 4º grau disfarçado de 3PO; não pode ser herói", Sentidos: "visão na penumbra", Disfarce: "parece um droide de protocolo comum; o parafuso de contenção e o desligamento não funcionam (finge estar desligado)", Talentos: "o livro lista Master Splicer (erro de impressão de Master Slicer)", Sistemas: "andando, processador heurístico, tradutor (CD 5), 2 mãos, pacote sensorial aprimorado, armazenamento (2 kg), comlink, vocabulador", Posses: "holográfico, hold-out (compartimento interno)", Disponibilidade: "Militar; 5.550 créditos" })
  }),
  d("TO-D Interrogation Droid", {
    cl: 4, speed: 6, cls: [["nonheroic", 9], ["soldier", 1]], ab: [12, 12, null, 14, 15, 18], def: [16, 14, 13], hp: 29, dt: 14, bab: 7,
    sk: { initiative: 6, deception: 14, perception: 14, persuasion: 19, treatInjury: 14 },
    feats: [...ap("light"), "point-blank-shot", ...sf("persuasion"), ...st("deception"), "weapon-focus:pistols", ...wp("pistols", "simple")],
    tal: ["devastating-attack:pistols"],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 9, dmg: "1d4+1" }, ["stun-baton", 9, "2d6+1"], [{ base: "blaster-pistol", name: "Sonic Stunner" }, 9, "3d6"]],
    notes: notes({ Tipo: "droide de 1º grau imperial; não pode ser herói", Deslocamento: "6 (rodas)", Sentidos: "visão na penumbra", "Sonic Stunner": "pistola sônica: só atordoa (3d6), só o alvo ouve; ver o item", Sistemas: "rodas, processador básico, 2 garras, 2 suportes de ferramenta, pacote sensorial aprimorado, armazenamento (20 kg), vocabulador", Posses: "sonic stunner, stun baton, casca de durasteel (+4), kit médico", Disponibilidade: "Militar; 5.500 créditos" })
  }),
  d("GH-7 Medical Droid", {
    cl: 1, size: "small", speed: 6, cls: [["nonheroic", 3]], ab: [8, 14, null, 16, 15, 12], def: [13, 9, 12], hp: 7, dt: 9, bab: 2,
    sk: { initiative: 3, knowledgeLifeSciences: 14, perception: 10, stealth: 8, treatInjury: 14, useComputer: 14 },
    feats: ["cybernetic-surgery", ...sf("knowledgeLifeSciences", "treatInjury", "useComputer"), "surgical-expertise"],
    wpn: [["unarmed", 4, "1d3"]],
    notes: notes({ Tipo: "droide de 1º grau; pode ser jogado como herói droide", Deslocamento: "6 (flutuando)", Sentidos: "visão na penumbra", Programação: "não fere seres inteligentes; em combate só protege pacientes, com armas em modo atordoar", Sistemas: "flutuação, pacote sensorial aprimorado, comlink, armazenamento (2 kg), 3 mãos, ferramenta, processador heurístico, vocabulador", Posses: "kit médico (sem maca), holoprojetor pessoal", Disponibilidade: "Licenciado; 4.840 créditos" })
  }),
  d("EG-6 Series Power Droid", {
    cl: 1, size: "small", speed: 4, cls: [["nonheroic", 1]], ab: [14, 8, null, 4, 8, 4], def: [18, 12, 9], hp: 5, dt: 12, bab: 0,
    sk: { initiative: -1, perception: -1, mechanics: 5 },
    feats: [...ap("light", "medium"), "toughness"],
    wpn: [["unarmed", 2, "1d2+2"]],
    notes: notes({ Tipo: "droide de 5º grau (\"Gonk\"); pode ser jogado como herói droide", Sentidos: "darkvision", Sistemas: "andando, processador básico, ferramenta, darkvision, pacote de diagnóstico, blindagem de duranium (+8)", Posses: "gerador de energia", Disponibilidade: "Militar; 6.250 créditos" })
  }),
  d("DRK-1 Probe Droid", {
    cl: 1, size: "small", speed: 6, cls: [["nonheroic", 3]], ab: [8, 20, null, 16, 14, 8], def: [16, 10, 12], hp: 12, dt: 10, bab: 2,
    sk: { gatherInformation: 5, initiative: 11, perception: 15, stealth: 23, useComputer: 9 },
    feats: [...sf("perception", "stealth"), ...st("gatherInformation"), "toughness", ...wp("heavy")],
    wpn: [["unarmed", 1, "1d4-1"], ["frag-grenade", 7, "4d6"]],
    notes: notes({ Tipo: "droide de 4º grau (\"Dark Eye\" de Darth Maul); pode ser jogado como herói droide", Deslocamento: "6 (flutuando)", Sentidos: "darkvision, visão na penumbra", Idiomas: "entende Binary e Basic, não fala", Sistemas: "flutuação, processador heurístico, comlink, acesso trancado, bateria secundária, pacote sensorial aprimorado, darkvision, casca furtiva (+2 de equipamento em Stealth)", Posses: "holoprojetor, lança-granadas com 6 granadas de fragmentação" })
  }),
  d("M-3PO Series Military Protocol Droid", {
    cl: 1, cls: [["nonheroic", 2]], ab: [10, 9, null, 12, 11, 15], def: [11, 10, 10], hp: 4, dt: 10, bab: 1,
    sk: { initiative: 0, knowledgeBureaucracy: 7, knowledgeTactics: 7, perception: 1, persuasion: 8, useComputer: 7 },
    feats: [...ap("light"), ...st("knowledgeBureaucracy", "useComputer")],
    wpn: [["unarmed", 1, "1d3+1"]],
    notes: notes({ Tipo: "droide de 3º grau (Cybot Galactica); pode ser jogado como herói droide", Sentidos: "darkvision", Sistemas: "andando, processador básico, tradutor (CD 10), 2 mãos, darkvision, vocabulador, casca de plasteel (+2)", Posses: "gravador de áudio", Disponibilidade: "Militar; 3.700 créditos" })
  }),
  d("TC Series Protocol Droid", {
    cl: 1, cls: [["noble", 1]], ab: [8, 8, null, 13, 14, 14], def: [11, 10, 15], hp: 18, dt: 10, bab: 0,
    sk: { initiative: -1, deception: 7, gatherInformation: 7, knowledgeBureaucracy: 6, knowledgeGalacticLore: 6, knowledgeSocialSciences: 6, perception: 7, persuasion: 12 },
    feats: ["linguist", ...sf("persuasion"), ...wp("pistols", "simple")],
    tal: ["coordinate"],
    wpn: [["unarmed", -1, "1d3-1"]],
    notes: notes({ Tipo: "droide de 3º grau (Cybot Galactica, comunicador TranLang III); pode ser jogado como herói droide", Sistemas: "andando, processador heurístico, tradutor (CD 5), 2 mãos, vocabulador", Posses: "gravador de áudio", Disponibilidade: "Licenciado; 5.000 créditos" })
  }),
  d("Replica Droid", {
    cl: 4, fp: 2, cls: [["scout", 4]], ab: [17, 16, null, 10, 13, 10], def: [20, 19, 16], hp: 38, dt: 19, bab: 3,
    sk: { climb: 10, initiative: 5, jump: 10, mechanics: 12, perception: 10, pilot: 10 },
    feats: ["dodge", "improved-defenses", ...sf("mechanics"), "toughness", ...wp("pistols", "rifles", "simple")],
    tal: ["acute-senses", "extreme-effort"],
    wpn: [["unarmed", 6, "1d4+5"], ["blaster-pistol", 6, "3d6+2"]],
    notes: notes({ Tipo: "droide réplica (indistinguível de um ser vivo); pode ser jogado como herói droide — ver a espécie Replica Droid", Sentidos: "darkvision, visão na penumbra", Rerrolagem: "Perception (segundo resultado)", Sistemas: "andando, processador heurístico, 2 mãos, acesso trancado, darkvision, pacote sensorial aprimorado, vocabulador", Posses: "pistola blaster, comlink integrado", Disponibilidade: "Restrito; 9.000.000 créditos" })
  }),
  d("Guri", {
    cl: 10, fp: 4, cls: [["noble", 2], ["scoundrel", 4], ["soldier", 4]], ab: [22, 18, null, 18, 13, 17], def: [29, 28, 24], hp: 89, dt: 28, bab: 8,
    sk: { acrobatics: 14, deception: 13, gatherInformation: 14, initiative: 14, knowledgeBureaucracy: 14, knowledgeTactics: 14, mechanics: 14, perception: 13, persuasion: 13, pilot: 14, stealth: 14, treatInjury: 11, useComputer: 14 },
    feats: [...ap("light", "medium"), "linguist", "martial-arts-i", "point-blank-shot", ...st("acrobatics", "mechanics", "stealth"), ...wp("advanced-melee", "heavy", "pistols", "rifles", "simple")],
    tal: ["dastardly-strike", "expert-grappler", "presence", "sneak-attack", "tough-as-nails"],
    wpn: [["unarmed", 14, "1d6+11"], ["blaster-pistol", 12, "3d6+5"]],
    notes: notes({ Papel: "droide réplica humana, guarda-costas, assassina e conselheira do Príncipe Xizor (Black Sun)", Sentidos: "darkvision, visão na penumbra", "Sneak Attack": "+1d6", Sistemas: "andando, processador heurístico, 2 mãos, acesso trancado, darkvision, pacote de diagnóstico, pacote sensorial aprimorado, armazenamento (5 kg), tradutor (CD 5), vocabulador", Posses: "pistola blaster, comlink criptografado integrado, chip de crédito, gravador de áudio" })
  }),
  d("WSB-15 Sabotage Droid", {
    cl: 7, size: "small", speed: 4, cls: [["nonheroic", 3], ["scoundrel", 6]], ab: [10, 16, null, 10, 12, 10], def: [22, 16, 18], hp: 37, dt: 16, bab: 6,
    sk: { initiative: 7, deception: 14, knowledgeTechnology: 9, mechanics: 14, perception: 12, stealth: 17, useComputer: 9 },
    feats: ["deadeye", "point-blank-shot", "precise-shot", ...sf("deception", "mechanics"), ...st("deception", "knowledgeTechnology", "perception", "stealth", "useComputer"), "toughness", ...wp("pistols", "simple")],
    tal: ["gimmick", "dastardly-strike", "disruptive"],
    wpn: [{ nat: "claw", name: "Garra (2)", atk: 6, dmg: "1d3+4" }, [{ base: "hold-out-blaster", name: "Plasma Cutter" }, 9, "3d4+4"]],
    notes: notes({ Tipo: "droide de 4º grau disfarçado de WED-15; não pode ser herói", Deslocamento: "4 (esteiras)", Sentidos: "visão na penumbra", Ataques: "2 cortadores de plasma +9 (3d4+4) cada", Sistemas: "esteiras, pacote sensorial aprimorado, processador heurístico, 2 mãos, 2 instrumentos, 2 ferramentas, 2 garras, autodestruição", Posses: "2 cortadores de plasma (como hold-out)", Disponibilidade: "Militar; 13.000 créditos" })
  }),
  d("501-Z Police/Security Droid", {
    cl: 10, fp: 1, cls: [["soldier", 7], ["scout", 3]], ab: [18, 12, null, 10, 14, 13], def: [26, 26, 22], hp: 76, dt: 26, bab: 9,
    sk: { endurance: 14, initiative: 10, knowledgeTactics: 10, perception: 19, survival: 12 },
    feats: [...ap("light", "medium"), "point-blank-shot", "powerful-charge", "precise-shot", "shake-it-off", ...sf("perception"), ...st("perception", "survival"), "weapon-focus:pistols", "weapon-focus:simple", ...wp("pistols", "rifles", "simple")],
    tal: ["acute-senses", "armored-defense", "battle-analysis", "expert-tracker", "harms-way", "improved-armored-defense"],
    wpn: [["stun-baton", 14, "2d6+9"], [{ base: "blaster-pistol", name: "Stun Pistol" }, 10, "3d6+5"]],
    notes: notes({ Tipo: "droide de 4º grau (SoroSuub); não pode ser herói", Sentidos: "visão na penumbra", "Stun baton": "atordoamento; Powerful Charge +18 (2d6+14)", Rerrolagem: "Perception (segundo resultado)", Sistemas: "andando, processador básico, 2 mãos, pacote sensorial aprimorado, comlink, acesso trancado, vocabulador", Posses: "stun baton, pistola de atordoamento, blindagem de duranium (+8), holográfico, holoprojetor", Disponibilidade: "Restrito; 14.000 créditos" })
  }),
  d("Mark VII Inquisitor Seeker Droid", {
    cl: 6, size: "diminutive", speed: 6, fp: 1, cls: [["scout", 6]], ab: [5, 18, null, 13, 16, 10], def: [27, 14, 19], hp: 46, dt: 14, bab: 4,
    sk: { initiative: 12, knowledgeLifeSciences: 9, perception: 18, persuasion: 8, stealth: 32, survival: 11, useComputer: 9 },
    feats: ["dual-weapon-mastery-i", "running-attack", ...sf("perception", "stealth"), ...st("useComputer"), "toughness", ...wp("pistols", "rifles", "simple")],
    tal: ["acute-senses", "expert-tracker", "keen-shot"],
    wpn: [["blaster-pistol", 8, "3d6+3"]],
    notes: notes({ Tipo: "droide de 4º grau; não pode ser herói", Deslocamento: "6 (flutuando)", Sentidos: "darkvision, visão na penumbra", "Duas pistolas": "+3 (3d6+3) e +3 (3d6+3)", "Sonda de dados": "+2 em Use Computer ao se conectar", Rerrolagem: "Perception (segundo resultado)", Sistemas: "flutuação, processador heurístico, 2 apêndices de arma, darkvision, pacote sensorial aprimorado, acesso trancado, comlink, vocabulador", Posses: "2 pistolas blaster, gravador de áudio" })
  }),
  d("Imperial Mark IV Sentry Droid", {
    cl: 2, size: "diminutive", speed: 6, cls: [["nonheroic", 6]], ab: [6, 14, null, 11, 15, 6], def: [17, 8, 12], hp: 16, dt: 8, bab: 4,
    sk: { gatherInformation: 11, initiative: 5, perception: 17, stealth: 20 },
    feats: ["dodge", ...sf("gatherInformation", "perception"), ...st("gatherInformation"), ...wp("pistols")],
    wpn: [],
    notes: notes({ Tipo: "droide de 4º grau imperial (\"dedo-duro\"); não pode ser herói", Deslocamento: "6 (flutuando)", "Espaço/alcance": "1 quadrado; alcance 0", Sentidos: "darkvision, visão na penumbra", Descrição: "registra até infrações mínimas e as transmite à autoridade; adulterá-lo é crime grave", Sistemas: "flutuação, processador básico, 2 ferramentas, pacote sensorial aprimorado, darkvision, acesso trancado, comlink, vocabulador", Posses: "eletrobinóculos, holográfico", Disponibilidade: "Militar; não está à venda (estimado 7.000)" })
  }),
  d("SD-6 \"Hulk\" Infantry Droid", {
    cl: 14, size: "large", speed: 8, fp: 2, dr: 3, cls: [["soldier", 7], ["elite-trooper", 7]], ab: [28, 8, null, 8, 10, 8], def: [29, 27, 24], hp: 112, dt: 32, bab: 14,
    sk: { endurance: 21, initiative: 12, perception: 7 },
    feats: [...ap("light", "medium"), "burst-fire", "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "dual-weapon-mastery-iii", "martial-arts-i", "point-blank-shot", "weapon-focus:heavy", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["armored-defense", "controlled-burst", "devastating-attack:heavy", "greater-devastating-attack:heavy", "greater-weapon-focus:heavy", "greater-weapon-specialization:heavy", "improved-armored-defense", "weapon-specialization:heavy"],
    wpn: [{ nat: "claw", name: "Garra", atk: 23, dmg: "1d6+16" }, ["e-web", 13, "5d12+11"], ["ion-rifle", 13, "3d8+7"]],
    notes: notes({ Tipo: "droide de 4º grau (Balmorran Arms); não pode ser herói", Idiomas: "entende Basic, fala Binary", "E-Web": "2 repetidores E-Web +13 (5d12+11) cada, com Controlled Burst ou autofire", "Rifles iônicos": "2 × +13 (3d8+7 de íons)", Qualidades: "RD 3, delay damage", Sistemas: "andando, processador básico, 2 garras, 2 suportes de ferramenta, comlink, acesso trancado", Posses: "2 repetidores E-Web, 2 rifles iônicos, blindagem de duranium (+8)" })
  }),
  d("Sith Elite Warbot", {
    cl: 5, fp: 2, ds: 10, cls: [["nonheroic", 6], ["soldier", 3]], ab: [18, 15, null, 10, 10, 12], def: [21, 19, 13], hp: 31, dt: 19, bab: 7,
    sk: { initiative: 11, perception: 4 },
    feats: [...ap("light", "medium"), "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "point-blank-shot", "power-attack", "powerful-charge", ...wp("pistols", "simple")],
    tal: ["melee-smash", "weapon-specialization:simple"],
    wpn: [[{ base: "sith-sword", name: "Sith Sword" }, 11, "1d8+12", 4], ["blaster-pistol", 9, "3d6+1"]],
    notes: notes({ Tipo: "droide de 4º grau do Império Sith antigo (~5.000 anos antes de Yavin)", "Sith Sword": "inclui 4 pontos de Power Attack; com Powerful Charge +11 (1d8+24); ver o item Sith Sword", "Duas pistolas": "+7 (3d6+1) e +7 (3d6+1)", Sistemas: "processador básico, 2 mãos, 2 ferramentas, acesso trancado, vocabulador", Posses: "espada Sith, 2 pistolas blaster, blindagem de duranium (+8)" })
  }),
  d("PK Worker Droid", {
    cl: 2, size: "small", speed: 4, cls: [["nonheroic", 6]], ab: [14, 16, null, 9, 12, 8], def: [13, 12, 11], hp: 21, dt: 12, bab: 4,
    sk: { acrobatics: 10, initiative: 5, mechanics: 7, perception: 9 },
    feats: ["linguist", ...st("acrobatics", "mechanics"), "toughness"],
    wpn: [["unarmed", 6, "1d2+5"]],
    notes: notes({ Tipo: "droide de 5º grau; pode ser jogado como herói droide", Descrição: "o droide de carga mais barato e comum; pede desculpas o tempo todo", Sistemas: "andando, processador básico, 2 mãos, vocabulador", Disponibilidade: "Licenciado; 1.000 créditos" })
  })
];
