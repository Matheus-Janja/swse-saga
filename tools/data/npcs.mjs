// PdMs do Livro Básico: Cap. 15 (personagens principais e coadjuvantes), Cap. 16 (feras e arquétipos)
// e Cap. 11 (droides de exemplo), com a errata de 2008 aplicada.
// Os valores-alvo (defesas, PV, limiar, perícias, ataques) vêm do bloco de estatísticas; o build monta a ficha
// com classes/feats/talentos reais e ajusta os campos "Outros" para bater com o livro.
//
// Formato:
//   cls: [[chaveDaClasse, níveis], ...]   ab: [For, Des, Con, Int, Sab, Car] (valores finais; Con null p/ droides)
//   def: [Ref, Fort, Von]  sk: { perícia: total }  feats/tal: chaves ("chave:escolha" quando houver escolha)
//   pow: { poder: usos }   wpn: [chaveDaArma, ataque, "dano"] | { nat|custom..., atk, dmg, pa }
const wp = (...g) => g.map(x => `weapon-proficiency-${x}`);
const ap = (...g) => g.map(x => `armor-proficiency-${x}`);
const sf = (...s) => s.map(x => `skill-focus:${x}`);
const st = (...s) => s.map(x => `skill-training:${x}`);
const times = (k, n) => Array(n).fill(k);
const notes = o => Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");

const F = {
  main: "Personagens Principais",
  support: "Coadjuvantes",
  empire: "Império Galáctico",
  rebel: "Aliança Rebelde",
  republic: "República Galáctica",
  fringe: "Fringe",
  beasts: "Feras",
  droids: "Droides"
};
export const FOLDERS = Object.values(F);

const n = (name, folder, o) => ({ name, folder, ...o });

export default [
  /* ======================= CAP. 15 — PRINCIPAIS ======================= */
  n("Darth Vader (Episódio IV)", F.main, {
    cl: 19, sp: "human", cls: [["jedi", 7], ["jedi-knight", 5], ["ace-pilot", 2], ["sith-apprentice", 2], ["sith-lord", 3]],
    dest: 3, fp: 8, ds: 14, ab: [16, 16, 17, 14, 14, 15], def: [39, 36, 33], hp: 181, dt: 36, bab: 17,
    sk: { initiative: 17, perception: 11, mechanics: 16, pilot: 17, useTheForce: 17 },
    feats: [...ap("light"), "double-attack:lightsabers", "force-sensitivity", ...times("force-training", 3), "rapid-strike", ...sf("useTheForce"), "strong-in-the-force", "vehicular-combat", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["armored-defense", "block", "dark-side-adept", "deflect", "djem-so", "force-pilot", "improved-armored-defense", "redirect-shot", "severing-strike", "vehicular-evasion", "weapon-specialization:lightsabers", "distant-power", "multitarget-power", "force-point-recovery", "improved-move-light-object", "improved-sense-force"],
    pow: { farseeing: 1, "force-disarm": 1, "force-grip": 1, "force-slam": 1, "force-thrust": 1, "move-object": 1, "negate-energy": 1, rebuke: 1, surge: 1 },
    wpn: [["lightsaber", 22, "2d8+17"]], armor: "flight-suit-armored",
    notes: notes({ Sentidos: "visão na penumbra", Idiomas: "Basic, Binary, Huttese", Imunidades: "medo; venenos inalados e riscos atmosféricos", Fraqueza: "suporte de vida — sem a armadura começa a sufocar", "Ações especiais": "Djem So, Redirect Shot, temptation", Posses: "armadura customizada (como armored flight suit com helmet package; +8 de armadura), sabre de luz próprio, próteses cibernéticas (4), robes Sith, cinto de utilidades com medpac" })
  }),
  n("Obi-Wan Kenobi (Episódio III)", F.main, {
    cl: 14, sp: "human", cls: [["jedi", 7], ["jedi-knight", 5], ["jedi-master", 2]],
    dest: 2, fp: 7, ab: [15, 16, 14, 13, 14, 15], def: [30, 29, 29], hp: 129, dt: 29, bab: 14,
    sk: { initiative: 15, perception: 9, acrobatics: 15, useTheForce: 19 },
    feats: [...ap("light"), "combat-reflexes", "double-attack:lightsabers", "force-sensitivity", ...times("force-training", 3), ...sf("useTheForce"), "weapon-finesse", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["block", "deflect", "equilibrium", "greater-weapon-focus:lightsabers", "redirect-shot", "severing-strike", "soresu", "weapon-specialization:lightsabers", "quicken-power", "force-point-recovery", "force-point-recovery", "improved-move-light-object"],
    pow: { farseeing: 1, "force-slam": 2, "mind-trick": 2, "move-object": 1, rebuke: 1, surge: 1, "vital-transfer": 1 },
    wpn: [["lightsaber", 20, "2d8+13"]],
    notes: notes({ Idiomas: "Basic, Shyriiwook", Imunidades: "medo (Fearless)", "Ações especiais": "Combat Reflexes, Equilibrium, Redirect Shot, serenity", Posses: "sabre de luz próprio, comlink (criptografado), robes Jedi, cinto de utilidades com medpac" })
  }),
  n("Senadora Padmé Amidala (Episódio III)", F.main, {
    cl: 10, sp: "human", cls: [["noble", 10]],
    dest: 2, fp: 5, ab: [10, 15, 12, 15, 16, 18], def: [24, 22, 26], hp: 59, dt: 22, bab: 7,
    sk: { initiative: 12, perception: 18, deception: 19, gatherInformation: 19, knowledgeBureaucracy: 17, knowledgeGalacticLore: 12, knowledgeSocialSciences: 12, persuasion: 19 },
    feats: ["double-attack:pistols", "improved-defenses", "linguist", "point-blank-shot", "precise-shot", ...sf("deception", "gatherInformation", "knowledgeBureaucracy", "perception", "persuasion"), "strong-in-the-force", ...wp("pistols", "simple")],
    tal: ["born-leader", "coordinate", "trust", "wealth"],
    wpn: [["unarmed", 7, "1d4+5"], ["sporting-blaster-pistol", 9, "3d4+5"]],
    notes: notes({ Idiomas: "Basic, Gran, Gungan, High Galactic, Mon Calamarian, Rodese", "Ações especiais": "Born Leader, Coordinate +1", "Talento não incluído": "Wanted Alive (de outro suplemento)", Posses: "sporting blaster pistol, comlink, guarda-roupa senatorial, droide astromecânico (R2-D2)" })
  }),
  n("Luke Skywalker (Episódio VI)", F.main, {
    cl: 11, sp: "human", cls: [["scout", 1], ["jedi", 7], ["ace-pilot", 2], ["jedi-knight", 1]],
    dest: 2, fp: 5, ds: 3, ab: [14, 16, 14, 14, 14, 15], def: [26, 25, 25], hp: 99, dt: 25, bab: 9,
    sk: { initiative: 13, perception: 12, mechanics: 13, pilot: 13, ride: 13, survival: 12, useTheForce: 16 },
    feats: ["double-attack:lightsabers", "force-sensitivity", "force-training", "melee-defense", ...sf("useTheForce"), "strong-in-the-force", "vehicular-combat", "weapon-finesse", "weapon-focus:lightsabers", ...wp("lightsabers", "pistols", "rifles", "simple")],
    tal: ["block", "deflect", "evasion", "redirect-shot", "severing-strike", "weapon-specialization:lightsabers"],
    pow: { "mind-trick": 1, "move-object": 1, surge: 1 },
    wpn: [["lightsaber", 14, "2d8+11"], ["blaster-pistol", 12, "3d6"]],
    notes: notes({ Idiomas: "Basic, Huttese, Shyriiwook", "Ações especiais": "Melee Defense, Redirect Shot", Posses: "blaster pistol, sabre de luz próprio, prótese cibernética (mão direita), traje de voo, robes, cinto de utilidades com medpac" })
  }),
  n("Leia Organa (Episódio VI)", F.main, {
    cl: 10, sp: "human", cls: [["noble", 8], ["soldier", 2]],
    dest: 2, fp: 5, ab: [13, 14, 13, 15, 14, 16], def: [23, 23, 24], hp: 63, dt: 23, bab: 8,
    sk: { initiative: 12, perception: 18, deception: 18, gatherInformation: 13, knowledgeBureaucracy: 12, knowledgeGalacticLore: 12, knowledgeTactics: 17, persuasion: 18 },
    feats: ["deadeye", "double-attack:pistols", "linguist", "point-blank-shot", "precise-shot", ...sf("deception", "knowledgeTactics", "perception", "persuasion"), "strong-in-the-force", "weapon-focus:pistols", ...wp("pistols", "rifles", "simple")],
    tal: ["bolster-ally", "born-leader", "inspire-confidence", "rally", "weapon-specialization:pistols"],
    wpn: [["unarmed", 9, "1d4+6"], ["sporting-blaster-pistol", 10, "3d4+5"]],
    notes: notes({ Idiomas: "Basic, Bothan, High Galactic, Mon Calamarian, Shyriiwook, Ubese", "Ações especiais": "Bolster Ally, Born Leader, Inspire Confidence, Rally", Posses: "sporting blaster pistol, datapad, cinto de utilidades com medpac, uniforme rebelde" })
  }),
  n("Han Solo (Episódio VI)", F.main, {
    cl: 12, sp: "human", cls: [["scoundrel", 5], ["soldier", 2], ["ace-pilot", 3], ["gunslinger", 2]],
    dest: 2, fp: 6, ab: [13, 15, 13, 14, 12, 14], def: [28, 25, 24], hp: 77, dt: 25, bab: 9,
    sk: { initiative: 18, perception: 12, deception: 13, knowledgeGalacticLore: 13, mechanics: 13, pilot: 18 },
    feats: ["point-blank-shot", "precise-shot", "quick-draw", "rapid-shot", ...sf("initiative", "pilot"), "vehicular-combat", "weapon-focus:pistols", "weapon-focus:heavy", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["full-throttle", "keep-it-together", "sneak-attack", "spacehound", "stellar-warrior", "trigger-work", "weapon-specialization:pistols"],
    wpn: [["unarmed", 10, "1d4+7"], ["heavy-blaster-pistol", 14, "3d8+6"]],
    notes: notes({ Idiomas: "Basic, Huttese, Rodese, Shyriiwook", "Ações especiais": "Full Throttle, Quick Draw, Stellar Warrior", Posses: "heavy blaster pistol com targeting scope, tool kit, transporte YT-1300 modificado (Millennium Falcon)" })
  }),
  n("Darth Sidious — Imperador Palpatine (Episódio III)", F.main, {
    cl: 20, sp: "human", cls: [["noble", 6], ["jedi", 1], ["sith-apprentice", 8], ["sith-lord", 5]],
    dest: 4, fp: 8, ds: 20, ab: [10, 15, 12, 18, 20, 19], def: [35, 34, 38], hp: 132, dt: 34, bab: 18,
    sk: { initiative: 16, deception: 19, gatherInformation: 19, knowledgeBureaucracy: 19, knowledgeGalacticLore: 19, knowledgeSocialSciences: 19, knowledgeTactics: 19, persuasion: 19, useComputer: 19, useTheForce: 24 },
    feats: ["double-attack:lightsabers", "force-sensitivity", ...times("force-training", 3), "linguist", "melee-defense", ...sf("useTheForce"), "triple-attack:lightsabers", "triple-crit:lightsabers", "weapon-finesse", ...wp("lightsabers", "pistols", "simple"), "whirlwind-attack"],
    tal: ["block", "connections", "dark-scourge", "dark-side-adept", "deflect", "force-perception", "multiattack-proficiency-lightsabers", "multiattack-proficiency-lightsabers", "redirect-shot", "visions", "wealth", "devastating-power", "distant-power", "multitarget-power", "quicken-power", "force-point-recovery", "improved-move-light-object", "improved-sense-force", "improved-sense-surroundings"],
    pow: { "dark-rage": 1, farseeing: 1, "force-disarm": 1, "force-lightning": 4, "force-slam": 1, "force-thrust": 1, "move-object": 3, rebuke: 2, surge: 3, "vital-transfer": 1 },
    wpn: [["lightsaber", 21, "2d8+10"]],
    notes: notes({ Sentidos: "Improved Sense Surroundings; Use the Force +24", Idiomas: "Basic, Bothan, Geonosian, Gran, High Galactic, Neimoidian, Rodese, Ryl, Sith, Zabrak", Imunidades: "medo", "Ações especiais": "Redirect Shot, temptation", Posses: "sabre de luz próprio, robes Sith, comlink (criptografado)" })
  }),

  /* ======================= CAP. 15 — COADJUVANTES ======================= */
  n("Chewbacca (Episódio VI)", F.support, {
    cl: 10, sp: "wookiee", cls: [["scout", 6], ["scoundrel", 4]],
    dest: 2, fp: 5, ab: [19, 13, 20, 12, 10, 10], def: [24, 27, 21], hp: 110, dt: 27, bab: 7,
    sk: { initiative: 6, perception: 10, climb: 5, endurance: 10, mechanics: 10, persuasion: 5, pilot: 10, useComputer: 10 },
    feats: ["careful-shot", "crush", "deadeye", "extra-rage", "martial-arts-i", "pin", "point-blank-shot", "powerful-charge", "precise-shot", "rapid-shot", ...st("useComputer"), ...wp("pistols", "rifles", "simple")],
    tal: ["acute-senses", "extreme-effort", "jury-rigger", "spacehound", "stellar-warrior"],
    wpn: [["unarmed", 11, "1d6+9"], ["bowcaster", 8, "3d10+5"]],
    notes: notes({ Idiomas: "Basic e Huttese (só entende), Shyriiwook", "Ações especiais": "rage 2/dia", Posses: "bowcaster, bandoleira, tool kit" })
  }),
  n("Lando Calrissian (Episódio VI)", F.support, {
    cl: 8, sp: "human", cls: [["scoundrel", 8]],
    dest: 1, fp: 4, ds: 1, ab: [12, 14, 12, 14, 13, 16], def: [22, 19, 20], hp: 50, dt: 19, bab: 6,
    sk: { initiative: 6, perception: 10, deception: 17, gatherInformation: 12, mechanics: 11, persuasion: 12, pilot: 11 },
    feats: ["dodge", "double-attack:pistols", "mobility", "point-blank-shot", "running-attack", ...sf("deception"), "vehicular-combat", "weapon-focus:pistols", ...wp("heavy", "pistols", "simple")],
    tal: ["dastardly-strike", "fools-luck", "fortunes-favor", "gambler"],
    wpn: [["unarmed", 7, "1d4+5"], ["blaster-pistol", 9, "3d6+4"]],
    notes: notes({ Idiomas: "Basic, Shyriiwook, Sullustese", "Ações especiais": "Fool's Luck, Fortune's Favor, Gambler", Posses: "blaster pistol, comlink, roupas caras" })
  }),
  n("R2-D2 (Episódio VI)", F.support, {
    cl: 6, droid: true, size: "small", speed: 4, cls: [["nonheroic", 2], ["scoundrel", 6]],
    dest: 1, fp: 4, ab: [8, 16, null, 16, 10, 7], def: [23, 16, 18], hp: 34, dt: 16, bab: 5,
    sk: { initiative: 3, perception: 9, deception: 7, mechanics: 17, pilot: 12, useComputer: 15 },
    feats: ["dodge", "improved-defenses", "melee-defense", "mobility", "point-blank-shot", ...sf("mechanics", "useComputer"), ...st("perception"), "toughness", "weapon-finesse", ...wp("simple")],
    tal: ["gimmick", "master-slicer", "trace"],
    wpn: [{ custom: "probe", atk: 10, dmg: "1d8+3" }],
    notes: notes({ Tipo: "droide de 2º grau", Sentidos: "darkvision", Idiomas: "Basic, Binary, Huttese, Mon Calamarian, Shyriiwook", Imunidades: "traços de droide", Deslocamento: "4 (rodas), 1 (andando), 6 (voo)", Sistemas: "locomoção por rodas, andando e voo (limitado), pés magnéticos, processador heurístico, 6 apêndices de ferramenta, 1 garra, pacote de diagnóstico, armazenamento interno (2 kg)", Posses: "serra circular, sonda de eletrochoque, extintor, soldador de arco, holorecorder, holoprojetor" })
  }),
  n("C-3PO (Episódio VI)", F.support, {
    cl: 5, droid: true, cls: [["nonheroic", 1], ["noble", 5]],
    dest: 1, fp: 4, ab: [8, 9, null, 12, 12, 16], def: [16, 15, 19], hp: 26, dt: 15, bab: 3,
    sk: { initiative: -1, perception: 9, deception: 11, knowledgeBureaucracy: 9, knowledgeGalacticLore: 9, knowledgeSocialSciences: 9, persuasion: 16 },
    feats: ["improved-defenses", "linguist", "linguist", ...sf("persuasion"), ...st("deception", "knowledgeBureaucracy", "knowledgeGalacticLore", "perception"), "toughness"],
    tal: ["coordinate", "coordinate", "educated"],
    wpn: [["unarmed", 2, "1d3+1"]],
    notes: notes({ Tipo: "droide de 3º grau", Idiomas: "Basic, Binary, Bocce, Bothan, High Galactic, Huttese, Mon Calamarian, Shyriiwook", Imunidades: "traços de droide", "Ações especiais": "Coordinate +2", Sistemas: "locomoção andando, processador padrão, tradutor (CD 5), 2 mãos, vocabulador", Posses: "gravador de áudio" })
  }),
  n("Yoda (Episódio III)", F.support, {
    cl: 20, size: "small", speed: 4, cls: [["jedi", 8], ["jedi-knight", 7], ["jedi-master", 5]],
    dest: 4, fp: 8, ab: [8, 16, 11, 15, 21, 19], def: [37, 33, 38], hp: 174, dt: 33, bab: 20,
    sk: { initiative: 18, acrobatics: 18, knowledgeGalacticLore: 17, knowledgeTactics: 17, useTheForce: 24 },
    feats: ["acrobatic-strike", "double-attack:lightsabers", "force-sensitivity", ...times("force-training", 3), "running-attack", ...sf("useTheForce"), ...st("acrobatics"), "strong-in-the-force", "triple-attack:lightsabers", "weapon-finesse", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["ataru", "block", "deflect", "force-perception", "foresight", "multiattack-proficiency-lightsabers", "multiattack-proficiency-lightsabers", "redirect-shot", "severing-strike", "skilled-advisor", "visions", "devastating-power", "distant-power", "multitarget-power", "quicken-power", "improved-sense-force", "force-point-recovery", "force-point-recovery"],
    pow: { "battle-strike": 2, farseeing: 1, "force-disarm": 1, "force-slam": 2, "force-thrust": 1, "mind-trick": 2, "move-object": 2, "negate-energy": 2, rebuke: 3, surge: 2, "vital-transfer": 1 },
    wpn: [["lightsaber-short", 25, "2d8+16"]],
    notes: notes({ Espécie: "espécie de Yoda (Pequeno)", Sentidos: "Use the Force +24 (substitui Perception)", Idiomas: "Basic, Cerean, Shyriiwook", Imunidades: "medo", "Ações especiais": "Redirect Shot, serenity, Skilled Advisor", Posses: "sabre de luz próprio, bengala, robes Jedi" })
  }),
  n("Boba Fett (Episódio IV)", F.support, {
    cl: 15, sp: "human", cls: [["scout", 3], ["soldier", 5], ["bounty-hunter", 5], ["elite-trooper", 2]],
    dest: 3, fp: 6, ds: 7, ab: [15, 18, 15, 14, 14, 13], def: [34, 33, 27], hp: 122, dt: 33, bab: 14,
    sk: { initiative: 16, perception: 16, endurance: 14, knowledgeTactics: 14, persuasion: 8, pilot: 16, stealth: 11, survival: 14 },
    feats: [...ap("light", "medium"), "double-attack:rifles", "exotic-weapon-proficiency:flamethrower", "martial-arts-i", "point-blank-shot", "precise-shot", "quick-draw", "running-attack", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["acute-senses", "armored-defense", "hunters-mark", "hunters-target", "improved-armored-defense", "juggernaut", "keen-shot", "multiattack-proficiency-rifles", "notorious"],
    wpn: [["unarmed", 16, "1d6+9"], ["blaster-carbine", 18, "3d8+7"], ["grenade-launcher", 18, "4d6+7"], ["flamethrower", 18, "3d6+7"], ["missile-launcher", 18, "6d6+7"], ["stun-grenade", 18, "4d6+7"]],
    armor: "battle-armor",
    notes: notes({ Sentidos: "visão na penumbra", Idiomas: "Basic, Huttese, Mando'a", Deslocamento: "6; voo 6 (jetpack); Running Attack", "Ações especiais": "familiar foe +2, Hunter's Target, Quick Draw", Posses: "armadura mandaloriana (+8 armadura, +2 equipamento; como battle armor com helmet package; 4 acoplamentos de arma), blaster carbine com lança-granadas, 4 granadas de atordoamento, lança-chamas (5 disparos), lança-mísseis, 4 mísseis, whipcord (como rede), manopla blaster (como hold-out), jetpack (10 cargas), cinto de utilidades com medpac" })
  }),
  n("General Grievous", F.support, {
    cl: 14, cls: [["soldier", 8], ["elite-trooper", 3], ["officer", 3]], speed: 8,
    dest: 2, fp: 6, ds: 10, ab: [22, 19, 11, 15, 10, 14], def: [30, 28, 28], hp: 101, dt: 28, bab: 13,
    sk: { initiative: 16, perception: 14, climb: 8, endurance: 12, jump: 13, knowledgeTactics: 14, survival: 7 },
    feats: [...ap("light", "medium"), "double-attack:lightsabers", "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "martial-arts-i", "melee-defense", "point-blank-shot", "triple-attack:lightsabers", "weapon-focus:lightsabers", "weapon-focus:simple", ...wp("lightsabers", "pistols", "rifles", "simple")],
    tal: ["armored-defense", "battle-analysis", "deployment-tactics", "greater-weapon-focus:lightsabers", "improved-armored-defense", "outmaneuver", "tough-as-nails", "weapon-specialization:lightsabers"],
    wpn: [["lightsaber", 21, "2d8+21"], ["heavy-blaster-pistol", 17, "3d8+7"]],
    notes: notes({ Espécie: "Kaleesh (ciborgue)", Sentidos: "darkvision", Idiomas: "Basic, Kaleesh, Muun, Geonosian", Imunidades: "venenos inalados e riscos atmosféricos", Fraqueza: "vulnerável a dano iônico e atordoamento", Deslocamento: "8; escalada 4", "Ataques múltiplos": "até 4 sabres: +19/+19; com Double Attack +14 ×3; com Triple Attack +11 ×4", "Ações especiais": "Battle Analysis, Deployment Tactics, Outmaneuver, Tough as Nails", "Qualidades especiais": "command cover +2, share talent (Outmaneuver)", Sistemas: "locomoção andando, garras de escalada, servos de salto, 6 mãos (pernas usáveis como mãos), armadura única (+8), pacote sensorial, darkvision; híbrido ciborgue com suporte de vida", Posses: "4 sabres de luz, heavy blaster pistol, capa" })
  }),

  /* ======================= CAP. 16 — IMPÉRIO ======================= */
  n("Stormtrooper", F.empire, {
    cl: 1, sp: "human", cls: [["nonheroic", 4]], ds: 1, ab: [12, 11, 11, 10, 10, 10], def: [16, 12, 10], hp: 10, dt: 12, bab: 3,
    sk: { initiative: 2, perception: 9, endurance: 7 },
    feats: [...ap("light"), "coordinated-attack", "weapon-focus:rifles", ...wp("pistols", "rifles", "simple")],
    wpn: [["unarmed", 4, "1d4+1"], ["blaster-rifle", 4, "3d8"], ["frag-grenade", 3, "4d6"]], armor: "stormtrooper-armor",
    notes: notes({ Sentidos: "visão na penumbra", "Opções de ataque": "autofire (blaster rifle)", "Ações especiais": "Coordinated Attack", Posses: "armadura stormtrooper (+6 armadura, +2 equipamento), blaster rifle, granada de fragmentação, cinto de utilidades com medpac" })
  }),
  n("Heavy Stormtrooper", F.empire, {
    cl: 2, sp: "human", cls: [["nonheroic", 8]], ds: 1, ab: [15, 11, 10, 12, 9, 8], def: [16, 12, 9], hp: 20, dt: 12, bab: 6,
    sk: { initiative: 4, perception: 10, endurance: 9, mechanics: 10 },
    feats: [...ap("light"), "burst-fire", "point-blank-shot", "weapon-focus:rifles", ...wp("heavy", "rifles", "simple")],
    wpn: [["unarmed", 8, "1d4+2"], ["light-repeating-blaster", 7, "3d8"], ["frag-grenade", 6, "4d6"]], armor: "stormtrooper-armor",
    notes: notes({ Sentidos: "visão na penumbra", "Opções de ataque": "autofire, Burst Fire, Point Blank Shot; apoiar (brace) o light repeating blaster: +5 com autofire apoiado", Posses: "armadura stormtrooper, light repeating blaster, 3 cargas explosivas, granada de fragmentação, cinto de utilidades com medpac" })
  }),
  n("Scout Trooper", F.empire, {
    cl: 2, sp: "human", cls: [["nonheroic", 6]], ds: 1, ab: [10, 13, 12, 10, 11, 8], def: [15, 11, 10], hp: 21, dt: 11, bab: 4,
    sk: { initiative: 4, perception: 10, pilot: 9, stealth: 9 },
    feats: [...ap("light"), "point-blank-shot", ...st("stealth"), "vehicular-combat", ...wp("pistols", "rifles", "simple")],
    wpn: [["unarmed", 4, "1d4"], ["blaster-pistol", 5, "3d6"], ["blaster-rifle", 5, "3d8"], ["frag-grenade", 5, "4d6"]], armor: "combat-jumpsuit",
    notes: notes({ Sentidos: "visão na penumbra", Posses: "armadura scout trooper (+4; como combat jumpsuit com helmet package), blaster pistol, blaster rifle com targeting scope, granada de fragmentação, cinto de utilidades com medpac, speeder bike Aratech 74-Z" })
  }),
  n("Oficial Imperial", F.empire, {
    cl: 5, sp: "human", cls: [["nonheroic", 4], ["noble", 3], ["officer", 1]], fp: 2, ds: 5, ab: [10, 8, 10, 12, 12, 14], def: [15, 14, 18], hp: 33, dt: 14, bab: 6,
    sk: { initiative: 3, perception: 10, deception: 11, knowledgeTactics: 10, persuasion: 16, pilot: 8 },
    feats: [...ap("light"), "linguist", ...sf("persuasion"), ...st("deception", "pilot"), "toughness", "vehicular-combat", ...wp("pistols", "simple")],
    tal: ["born-leader", "coordinate", "trust"],
    wpn: [["unarmed", 6, "1d4+2"], ["blaster-pistol", 5, "3d6+2"]],
    notes: notes({ Idiomas: "Basic, Bocce, Durese, High Galactic", "Ações especiais": "Born Leader, Coordinate, Trust, Vehicular Combat", Posses: "blaster pistol, code cylinder, comlink (criptografado), uniforme de oficial" })
  }),

  /* ======================= CAP. 16 — REBELIÃO ======================= */
  n("Rebel Trooper", F.rebel, {
    cl: 1, sp: "human", cls: [["nonheroic", 3]], ab: [11, 13, 12, 9, 10, 8], def: [13, 11, 10], hp: 10, dt: 11, bab: 2,
    sk: { initiative: 7, perception: 6 },
    feats: [...ap("light"), "point-blank-shot", "weapon-focus:pistols", ...wp("pistols", "rifles", "simple")],
    wpn: [["unarmed", 2, "1d4"], ["blaster-pistol", 4, "3d6"], ["frag-grenade", 3, "4d6"]], armor: "blast-helmet-vest",
    notes: notes({ "Ações especiais": "Point Blank Shot", Posses: "blast helmet and vest (+2), blaster pistol, comlink (criptografado)" })
  }),
  n("Elite Rebel Trooper", F.rebel, {
    cl: 2, sp: "human", cls: [["nonheroic", 6]], ab: [12, 13, 12, 9, 10, 8], def: [13, 11, 10], hp: 21, dt: 16, bab: 4,
    sk: { initiative: 9, perception: 8 },
    feats: [...ap("light"), "improved-damage-threshold", "point-blank-shot", "weapon-focus:pistols", ...wp("pistols", "rifles", "simple")],
    wpn: [["unarmed", 5, "1d4+1"], ["blaster-pistol", 6, "3d6"], ["frag-grenade", 5, "4d6"]], armor: "blast-helmet-vest",
    notes: notes({ "Ações especiais": "Point Blank Shot", Posses: "blast helmet and vest (+2), blaster pistol, 2 granadas de fragmentação, comlink (criptografado)" })
  }),

  /* ======================= CAP. 16 — REPÚBLICA ======================= */
  n("Clone Trooper", F.republic, {
    cl: 2, sp: "human", cls: [["nonheroic", 6]], ab: [12, 13, 12, 10, 9, 8], def: [17, 13, 9], hp: 21, dt: 13, bab: 4,
    sk: { initiative: 9, perception: 4 },
    feats: [...ap("light"), "careful-shot", "point-blank-shot", ...wp("pistols", "rifles", "simple")],
    wpn: [["blaster-rifle", 5, "3d8+3"]], armor: "stormtrooper-armor",
    notes: notes({ "Opções de ataque": "Careful Shot", "Ações especiais": "Point Blank Shot", Posses: "armadura clone trooper (+6 armadura, +2 equipamento), blaster rifle, comlink" })
  }),
  n("Clone Trooper Commander", F.republic, {
    cl: 5, sp: "human", cls: [["nonheroic", 6], ["soldier", 2], ["officer", 1]], fp: 3, ds: 5, ab: [11, 10, 10, 13, 10, 12], def: [18, 17, 17], hp: 30, dt: 17, bab: 7,
    sk: { initiative: 4, perception: 11, endurance: 9, knowledgeTactics: 10, persuasion: 10, pilot: 9 },
    feats: [...ap("light"), "coordinated-attack", "point-blank-shot", ...st("perception", "pilot"), "vehicular-combat", "weapon-focus:rifles", ...wp("pistols", "rifles", "simple")],
    tal: ["assault-tactics", "battle-analysis"],
    wpn: [["unarmed", 7, "1d4+1"], ["heavy-blaster-rifle", 8, "3d10+1"], ["frag-grenade", 7, "4d6+1"], ["ion-grenade", 7, "4d6+1"]], armor: "stormtrooper-armor",
    notes: notes({ Sentidos: "visão na penumbra", Idiomas: "Basic, High Galactic", "Opções de ataque": "autofire (heavy blaster rifle)", "Ações especiais": "Assault Tactics, Battle Analysis, Coordinated Attack, Vehicular Combat", Posses: "armadura clone trooper, heavy blaster rifle, granada frag, granada iônica, comlink (criptografado, longo alcance, miniaturizado, holo), cinto de utilidades com medpac" })
  }),
  n("ARC Trooper", F.republic, {
    cl: 8, sp: "human", cls: [["nonheroic", 6], ["soldier", 3], ["elite-trooper", 3]], dest: 1, fp: 4, ds: 2, ab: [15, 13, 10, 12, 10, 8], def: [21, 24, 16], hp: 57, dt: 24, bab: 10,
    sk: { initiative: 12, perception: 13, stealth: 10 },
    feats: [...ap("light", "medium"), "burst-fire", "dual-weapon-mastery-i", "martial-arts-i", "point-blank-shot", "weapon-focus:heavy", ...wp("heavy", "pistols", "rifles", "simple")],
    tal: ["armored-defense", "controlled-burst", "improved-armored-defense", "weapon-specialization:heavy"],
    wpn: [["unarmed", 12, "1d4+5"], ["heavy-repeating-blaster", 12, "3d10+5"], ["missile-launcher", 12, "6d6+5"], ["heavy-blaster-pistol", 11, "3d8+3"], ["frag-grenade", 11, "4d6+3"], ["ion-grenade", 11, "4d6+3"]],
    armor: "stormtrooper-armor",
    notes: notes({ Sentidos: "visão na penumbra", Idiomas: "Basic, Mando'a", "Opções de ataque": "autofire, brace e Burst Fire (heavy repeating blaster); duas heavy blaster pistols +6/+6", "Ações especiais": "Point Blank Shot", Posses: "armadura ARC (+6 armadura, +2 equipamento), heavy repeating blaster, lança-mísseis, 4 mísseis, 2 heavy blaster pistols, 2 granadas frag, 2 granadas iônicas, cinto de utilidades com medpac" })
  }),

  /* ======================= CAP. 16 — FRINGE ======================= */
  n("Assassino", F.fringe, {
    cl: 5, sp: "human", cls: [["scoundrel", 5]], fp: 1, ds: 12, ab: [10, 16, 8, 14, 12, 13], def: [20, 14, 17], hp: 27, dt: 14, bab: 3,
    sk: { initiative: 10, perception: 10, acrobatics: 10, deception: 8, gatherInformation: 8, persuasion: 8, stealth: 10 },
    feats: ["careful-shot", "point-blank-shot", "precise-shot", "rapid-strike", "weapon-finesse", ...wp("advanced-melee", "pistols", "simple")],
    tal: ["dastardly-strike", "sneak-attack", "sneak-attack"],
    wpn: [["vibroblade", 6, "2d6+2"], ["blaster-rifle", 6, "3d8+2"]],
    notes: notes({ Idiomas: "Basic e mais 2", "Opções de ataque": "Careful Shot, Dastardly Strike, Rapid Strike, Sneak Attack +2d6", "Ações especiais": "Point Blank Shot, Precise Shot", Posses: "blaster rifle com targeting scope aprimorado, hold-out blaster, vibroblade, vibrodagger, comlink (criptografado), cinto de utilidades com medpac" })
  }),
  n("Caçador de Recompensas", F.fringe, {
    cl: 7, sp: "human", cls: [["nonheroic", 4], ["scout", 3], ["bounty-hunter", 3]], fp: 2, ds: 4, ab: [15, 16, 14, 8, 14, 10], def: [23, 20, 18], hp: 64, dt: 20, bab: 8,
    sk: { initiative: 13, perception: 14, endurance: 12, survival: 12 },
    feats: [...ap("light", "medium"), "mighty-swing", "point-blank-shot", "precise-shot", "rapid-shot", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["acute-senses", "expert-tracker", "hunters-mark", "hunters-target"],
    wpn: [["vibrobayonet", 10, "2d6+7"], ["blaster-carbine", 11, "3d8+3"], ["stun-grenade", 9, "4d6+3"]], armor: "corellian-powersuit",
    notes: notes({ Sentidos: "visão na penumbra", "Opções de ataque": "Hunter's Mark, Mighty Swing, Rapid Shot", "Ações especiais": "familiar foe +1, Hunter's Target, Point Blank Shot, Precise Shot", Posses: "Corellian powersuit (+7) com helmet package, blaster carbine, vibrobayonet, 2 granadas de atordoamento, cinto de utilidades com medpac, licença de caçador, datapad" })
  }),
  n("Senhor do Crime", F.fringe, {
    cl: 8, sp: "human", cls: [["scoundrel", 4], ["noble", 3], ["crime-lord", 1]], fp: 2, ds: 9, ab: [8, 14, 10, 17, 12, 15], def: [22, 18, 23], hp: 51, dt: 18, bab: 5,
    sk: { initiative: 6, perception: 10, acrobatics: 11, deception: 16, gatherInformation: 11, knowledgeBureaucracy: 12, knowledgeGalacticLore: 12, persuasion: 11, stealth: 11 },
    feats: ["acrobatic-strike", "dodge", "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "linguist", "point-blank-shot", "running-attack", ...sf("deception"), "toughness", ...wp("pistols", "simple")],
    tal: ["connections", "dastardly-strike", "attract-minion", "presence", "sneak-attack"],
    wpn: [["unarmed", 4, "1d4+3"], ["heavy-blaster-pistol", 7, "3d8+4"]],
    notes: notes({ Idiomas: "Basic, High Galactic, Huttese e mais 5", "Opções de ataque": "duas heavy blaster pistols +5/+5; Acrobatic Strike, Dastardly Strike, Sneak Attack +1d6", "Ações especiais": "Point Blank Shot, Presence", Posses: "2 heavy blaster pistols, datapad, comlink (criptografado), capangas (incluindo um asseclo de 6º nível), 1.000 créditos" })
  }),
  n("Saqueador do Lado Sombrio", F.fringe, {
    cl: 4, sp: "human", cls: [["soldier", 4]], fp: 1, ds: 14, ab: [16, 10, 13, 8, 14, 12], def: [19, 19, 16], hp: 50, dt: 24, bab: 4,
    sk: { initiative: 7, perception: 4, endurance: 8, useTheForce: 8 },
    feats: [...ap("light", "medium"), "force-sensitivity", "force-training", "improved-damage-threshold", "mighty-swing", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["indomitable", "weapon-specialization:advancedMelee"],
    pow: { "dark-rage": 2, surge: 1 },
    wpn: [["vibro-ax", 7, "2d10+10"], ["hold-out-blaster", 4, "3d4+2"]], armor: "battle-armor",
    notes: notes({ "Opções de ataque": "Mighty Swing", "Ações especiais": "Indomitable, Tough as Nails", Posses: "battle armor (+8 armadura, +2 equipamento), vibro-ax, hold-out blaster, comlink, 100 créditos" })
  }),
  n("Capanga", F.fringe, {
    cl: 1, sp: "human", cls: [["nonheroic", 2]], ds: 3, ab: [13, 11, 12, 8, 9, 10], def: [10, 11, 9], hp: 9, dt: 11, bab: 1,
    sk: { initiative: 6, perception: 5 },
    feats: ["cleave", "toughness", ...wp("advanced-melee", "pistols", "simple")],
    wpn: [["vibro-ax", 2, "2d10+2"], ["blaster-pistol", 1, "3d6"]],
    notes: notes({ "Opções de ataque": "Cleave", Posses: "blaster pistol, vibro-ax" })
  }),

  /* ======================= CAP. 16 — FERAS ======================= */
  n("Acklay", F.beasts, {
    cl: 10, size: "huge", speed: 8, cls: [["beast", 11]], ab: [27, 9, 29, 2, 11, 11], def: [15, 19, 10], hp: 148, dt: 29, bab: 8,
    sk: { initiative: 9, perception: 10, climb: 18 },
    feats: ["cleave", "power-attack", ...st("initiative", "perception")],
    wpn: [{ nat: "claw", name: "Garra", atk: 11, dmg: "1d8+18", pa: 5 }, { nat: "bite", name: "Mordida", atk: 11, dmg: "2d6+18", pa: 5 }],
    notes: notes({ Imunidades: "radiação leve, moderada e severa", Ataques: "2 garras e mordida (valores do livro incluem 5 pontos de Power Attack)", "Espaço/alcance": "3×3; alcance 2" })
  }),
  n("Dewback", F.beasts, {
    cl: 2, size: "large", speed: 6, cls: [["beast", 3]], ab: [19, 8, 26, 1, 8, 3], def: [12, 18, 9], hp: 43, dt: 28, bab: 2,
    sk: { initiative: 0, perception: 0, survival: 5 },
    feats: ["improved-damage-threshold", "toughness"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 6, dmg: "1d8+5" }],
    notes: notes({ Tipo: "fera do deserto (Desert: rerrola Survival contra calor extremo)", "Espaço/alcance": "2×2; alcance 1" })
  }),
  n("Nexu", F.beasts, {
    cl: 5, speed: 8, cls: [["beast", 6]], ab: [18, 18, 17, 2, 14, 12], def: [16, 13, 12], hp: 45, dt: 13, bab: 4,
    sk: { initiative: 12, perception: 10, stealth: 12 },
    feats: ["pin", ...st("initiative", "perception")],
    wpn: [{ nat: "claw", name: "Garra", atk: 8, dmg: "1d4+7" }, { nat: "bite", name: "Mordida", atk: 8, dmg: "1d6+7" }],
    notes: notes({ Sentidos: "visão na penumbra", Emboscada: "+2d6 de dano com armas naturais contra oponente surpreso (use a opção \"alvo surpreso\" + bônus extra 2d6)", "Opções de ataque": "Pin" })
  }),
  n("Rancor", F.beasts, {
    cl: 11, size: "huge", speed: 8, cls: [["beast", 12]], ab: [26, 9, 23, 2, 7, 15], def: [17, 16, 8], hp: 138, dt: 36, bab: 9,
    sk: { initiative: 5, perception: 9 },
    feats: ["cleave", "crush", "pin", "power-attack", "toughness"],
    wpn: [{ nat: "claw", name: "Garra", atk: 11, dmg: "1d8+20", pa: 6 }, { nat: "bite", name: "Mordida", atk: 11, dmg: "2d6+20", pa: 6 }],
    notes: notes({ Sentidos: "visão na penumbra", "Cura acelerada 5": "recupera 5 PV ao fim de cada turno até morrer", "Espaço/alcance": "3×3; alcance 2", Observação: "valores do livro incluem 6 pontos de Power Attack" })
  }),
  n("Reek", F.beasts, {
    cl: 8, size: "huge", speed: 6, cls: [["beast", 8]], ab: [27, 8, 30, 2, 8, 2], def: [15, 20, 9], hp: 124, dt: 30, bab: 6,
    sk: { initiative: 3, perception: 3, endurance: 20 },
    feats: ["power-attack", "powerful-charge", "toughness"],
    wpn: [{ nat: "gore", name: "Chifrada", atk: 10, dmg: "2d6+16", pa: 4 }],
    notes: notes({ Fúria: "na primeira vez que sofrer dano maior que sua Vontade num único ataque, entra em fúria: +2 em ataque e dano corpo a corpo por 5 + mod. Con rodadas; depois −1 passo persistente", "Espaço/alcance": "3×3; alcance 1", Observação: "valores do livro incluem 4 pontos de Power Attack" })
  }),
  n("Tauntaun", F.beasts, {
    cl: 1, size: "large", speed: 8, cls: [["beast", 2]], ab: [18, 12, 16, 2, 8, 6], def: [13, 13, 9], hp: 17, dt: 18, bab: 1,
    sk: { initiative: 2, perception: 0, survival: 5 },
    feats: ["toughness"],
    wpn: [{ nat: "claw", name: "Garra", atk: 5, dmg: "1d6+5" }, { nat: "bite", name: "Mordida", atk: 5, dmg: "1d8+5" }],
    notes: notes({ Faro: "ignora camuflagem e cobertura para notar oponentes a até 10 quadrados; sem penalidade de visibilidade ao rastrear", "Espaço/alcance": "2×2; alcance 1" })
  }),
  n("Wampa", F.beasts, {
    cl: 4, size: "large", speed: 6, cls: [["beast", 5]], ab: [20, 10, 22, 6, 15, 10], def: [15, 16, 12], hp: 52, dt: 21, bab: 3,
    sk: { initiative: 2, perception: 2, stealth: 7, survival: 9 },
    feats: ["power-attack", ...st("stealth")],
    wpn: [{ nat: "claw", name: "Garra", atk: 7, dmg: "1d6+8", pa: 1 }, { nat: "bite", name: "Mordida", atk: 7, dmg: "1d8+8", pa: 1 }],
    notes: notes({ Sentidos: "darkvision", Dilacerar: "se acertar as duas garras no mesmo turno, +2d6 de dano", Tipo: "fera ártica (rerrola Survival contra frio extremo)", "Espaço/alcance": "2×2; alcance 2" })
  }),

  /* ======================= CAP. 11 — DROIDES ======================= */
  n("Droide Médico 2-1B", F.droids, {
    cl: 0, droid: true, cls: [["nonheroic", 2]], ab: [8, 11, null, 14, 15, 9], def: [10, 9, 12], hp: 5, dt: 9, bab: 1,
    sk: { initiative: 1, perception: 5, knowledgeLifeSciences: 13, treatInjury: 13, useComputer: 8 },
    feats: ["cybernetic-surgery", ...sf("knowledgeLifeSciences", "treatInjury"), ...st("useComputer"), "surgical-expertise"],
    wpn: [["unarmed", 0, "1d3-1"]],
    notes: notes({ Tipo: "droide de 1º grau", Sentidos: "visão na penumbra", Imunidades: "traços de droide", Sistemas: "locomoção andando, processador heurístico, 2 mãos, pacote sensorial aprimorado, vocabulador", Disponibilidade: "Licenciado; 4.300 créditos" })
  }),
  n("Droide Astromecânico Série R2", F.droids, {
    cl: 0, droid: true, size: "small", speed: 6, cls: [["nonheroic", 2]], ab: [9, 14, null, 15, 10, 7], def: [13, 8, 10], hp: 7, dt: 8, bab: 1,
    sk: { initiative: 3, perception: 3, mechanics: 13, pilot: 8, stealth: 6, useComputer: 13 },
    feats: [...sf("mechanics", "useComputer"), ...st("perception"), "toughness", ...wp("simple")],
    wpn: [{ custom: "probe", atk: 0, dmg: "1d8" }],
    notes: notes({ Tipo: "droide de 2º grau", Sentidos: "darkvision", Imunidades: "traços de droide", Deslocamento: "6 (rodas), 4 (andando), 9 (voo)", Sistemas: "rodas, andando e voo (limitado), pés magnéticos, processador heurístico, 6 apêndices de ferramenta, 1 garra, pacote de diagnóstico, armazenamento interno (2 kg), pacote sensorial aprimorado, darkvision", Posses: "astrogation buffer, serra circular, sonda de eletrochoque, extintor, soldador, holorecorder, holoprojetor", Disponibilidade: "Licenciado; 4.500 créditos" })
  }),
  n("Droide de Protocolo Série 3PO", F.droids, {
    cl: 0, droid: true, cls: [["nonheroic", 1]], ab: [8, 9, null, 13, 13, 14], def: [9, 9, 11], hp: 2, dt: 9, bab: 0,
    sk: { initiative: -1, perception: 1, knowledgeBureaucracy: 6, knowledgeGalacticLore: 6, knowledgeSocialSciences: 6, persuasion: 12 },
    feats: ["linguist", ...sf("persuasion"), ...st("knowledgeBureaucracy", "knowledgeGalacticLore")],
    wpn: [["unarmed", -1, "1d3-1"]],
    notes: notes({ Tipo: "droide de 3º grau (errata: Int 13, Car 14)", Imunidades: "traços de droide", Sistemas: "locomoção andando, processador básico, tradutor (CD 5), 2 mãos, vocabulador", Posses: "gravador de áudio", Disponibilidade: "Licenciado; 3.000 créditos" })
  }),
  n("Battle Droid Série B1", F.droids, {
    cl: 1, droid: true, cls: [["nonheroic", 3]], ab: [13, 9, null, 9, 10, 10], def: [9, 11, 11], hp: 10, dt: 11, bab: 2,
    sk: { initiative: 0, perception: 6 },
    feats: ["toughness", ...wp("pistols", "rifles", "heavy", "simple")],
    wpn: [["unarmed", 3, "1d3+1"], ["blaster-carbine", 1, "3d8"]],
    notes: notes({ Tipo: "droide de 4º grau", Imunidades: "traços de droide", Sistemas: "locomoção andando, receptor remoto (errata), 2 mãos, comlink interno, vocabulador", Posses: "blaster carbine", Disponibilidade: "Militar; 1.800 créditos" })
  }),
  n("Super Battle Droid Série B2", F.droids, {
    cl: 2, droid: true, cls: [["nonheroic", 6]], ab: [14, 11, null, 10, 11, 7], def: [12, 12, 10], hp: 21, dt: 12, bab: 4,
    sk: { initiative: 3, perception: 8 },
    feats: [...ap("light"), "charging-fire", "rapid-shot", "toughness", ...wp("heavy", "rifles", "simple")],
    wpn: [["unarmed", 6, "1d3+1"], [{ base: "blaster-rifle", name: "Wrist Blasters" }, 4, "3d8"]],
    notes: notes({ Tipo: "droide de 4º grau", Imunidades: "traços de droide", "Opções de ataque": "autofire (wrist blasters), Charging Fire, Rapid Fire, aid another (+5, errata)", Sistemas: "locomoção andando, receptor remoto, processador reserva, circuitos de fogo sincronizado, 2 mãos, comlink integrado, vocabulador, carapaça de plasteel (+2 armadura)", Disponibilidade: "Militar; 3.300 créditos" })
  }),
  n("Destroyer Droid Série Droideka", F.droids, {
    cl: 4, droid: true, size: "large", speed: 2, sr: 20, cls: [["nonheroic", 12]], ab: [16, 15, null, 8, 14, 7], def: [16, 13, 12], hp: 40, dt: 18, bab: 9,
    sk: { initiative: 8, perception: 13, stealth: 3 },
    feats: [...ap("light"), "burst-fire", "rapid-shot", "dual-weapon-mastery-i", "dual-weapon-mastery-ii", "weapon-focus:rifles", ...wp("heavy", "rifles")],
    wpn: [["unarmed", 7, "1d4+3"], [{ base: "blaster-rifle", name: "Laser Cannon" }, 12, "3d8"], [{ base: "blaster-rifle", name: "Laser Cannon (2º)" }, 12, "3d8"]],
    notes: notes({ Tipo: "droide de 4º grau (bloco substituído pela errata)", Imunidades: "traços de droide", Deslocamento: "2 (andando), 10 (rodas)", Escudo: "SR 20", "Ataques múltiplos": "2 canhões +10/+10 (3d8); com Rapid Shot +8/+8 (4d8); com Burst Fire +5/+5 (5d8)", Sistemas: "andando e rodas (exclusivo), receptor remoto, 2 apêndices de ferramenta, gerador de escudo (SR 20), comlink integrado, carapaça de bronzium (+5)", Disponibilidade: "Militar; 21.000 créditos" })
  }),
  n("Dwarf Spider Droid", F.droids, {
    cl: 3, droid: true, size: "large", speed: 8, cls: [["nonheroic", 9]], ab: [22, 9, null, 10, 12, 8], def: [13, 16, 11], hp: 32, dt: 26, bab: 6,
    sk: { initiative: 3, perception: 12, climb: 6, stealth: -6 },
    feats: [...ap("light"), "far-shot", "improved-damage-threshold", "point-blank-shot", "power-attack", ...sf("perception"), ...wp("heavy", "simple")],
    wpn: [["unarmed", 8, "1d6+10", 4], [{ base: "blaster-cannon", name: "Blaster Cannon" }, 5, "6d8"]],
    notes: notes({ Tipo: "droide de 4º grau", Sentidos: "darkvision", Imunidades: "traços de droide", Estabilidade: "+5 contra ser derrubado", Sistemas: "pernas extras, garras de escalada, pés magnéticos, receptor remoto, pacote sensorial aprimorado, acesso travado, 1 apêndice de ferramenta, placas de quadanium (+5)", Disponibilidade: "Militar; 8.500 créditos" })
  }),
  n("Crab Droid Scout", F.droids, {
    cl: 4, droid: true, size: "large", speed: 6, cls: [["nonheroic", 12]], ab: [24, 9, null, 10, 14, 8], def: [18, 17, 12], hp: 80, dt: 42, bab: 9,
    sk: { initiative: 5, perception: 13, climb: 8, stealth: -6 },
    feats: [...ap("light", "medium", "heavy"), "crush", "pin", "power-attack", "powerful-charge", ...wp("rifles", "simple")],
    wpn: [{ nat: "claw", name: "Garra", atk: 16, dmg: "1d6+15", pa: 8 }, [{ base: "heavy-blaster-rifle", name: "Twin Blaster" }, 8, "3d10"]],
    notes: notes({ Tipo: "droide de 4º grau", Imunidades: "traços de droide", Estabilidade: "+5 contra ser derrubado", Deslocamento: "6; escalada 3", Sistemas: "pernas extras, garras de escalada, processador heurístico, 2 garras, sistemas endurecidos ×5, armadura de duranium (+10)", Observação: "garra inclui 8 pontos de Power Attack", Disponibilidade: "Militar; 20.000 créditos" })
  }),
  n("MagnaGuard Série IG-100", F.droids, {
    cl: 6, droid: true, cls: [["soldier", 6]], fp: 1, ab: [13, 13, null, 14, 14, 10], def: [18, 19, 18], hp: 53, dt: 19, bab: 6,
    sk: { initiative: 9, perception: 12, climb: 9, endurance: 8, jump: 9 },
    feats: [...ap("light", "medium"), "improved-disarm", "melee-defense", "toughness", "dual-weapon-mastery-i", "weapon-focus:advancedMelee", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["harms-way", "indomitable", "weapon-specialization:advancedMelee"],
    wpn: [["electrostaff", 8, "2d8+6"]],
    notes: notes({ Tipo: "droide de 4º grau (errata: Ref 18, Fort 19, Von 18)", Sentidos: "darkvision", Imunidades: "traços de droide", "Ataques múltiplos": "electrostaff +3/+3 (2d8+6)", "Ações especiais": "Harm's Way, Indomitable", Sistemas: "locomoção andando, pés magnéticos, processador heurístico, 2 mãos, apêndice telescópico, darkvision, pacote sensorial aprimorado, acesso travado, bateria secundária", Disponibilidade: "Restrito; 19.000 créditos" })
  }),
  n("Probe Droid Série Viper", F.droids, {
    cl: 1, droid: true, size: "large", speed: 6, cls: [["scout", 1]], ab: [18, 12, null, 12, 15, 11], def: [14, 14, 13], hp: 34, dt: 19, bab: 0,
    sk: { initiative: 6, perception: 9, endurance: 5, stealth: 1, survival: 7, useComputer: 6 },
    feats: [...ap("light"), ...wp("pistols", "simple")],
    tal: ["acute-senses"],
    wpn: [["unarmed", 4, "1d6+4"], ["blaster-pistol", 1, "3d6"]],
    notes: notes({ Tipo: "droide de 4º grau", Sentidos: "darkvision, visão na penumbra", Imunidades: "traços de droide", Deslocamento: "6 (flutuando)", Autodestruição: "ataque de área +5, 4d6, explosão de 2 quadrados", Sistemas: "flutuação, processador básico, 2 mãos, 2 garras, 2 ferramentas, pacote sensorial aprimorado, sistema de autodestruição (4d6), acesso travado, comlink integrado, carapaça de durasteel (+4)", Disponibilidade: "Restrito; 18.500 créditos" })
  }),
  n("Droide de Trabalho Série ASP", F.droids, {
    cl: 0, droid: true, cls: [["nonheroic", 2]], ab: [17, 12, null, 6, 11, 5], def: [15, 13, 10], hp: 5, dt: 13, bab: 1,
    sk: { initiative: 2, perception: 1, endurance: 11, mechanics: 4 },
    feats: [...ap("light"), ...sf("endurance"), ...st("mechanics")],
    wpn: [{ nat: "claw", name: "Garra", atk: 4, dmg: "1d4+3" }],
    notes: notes({ Tipo: "droide de 5º grau", Imunidades: "traços de droide", Sistemas: "locomoção andando, processador básico, 2 garras, carapaça de durasteel (+4)", Disponibilidade: "Licenciado; 1.000 créditos" })
  })
];
