// Jedi Academy Training Manual — Cap. 6: vilões do lado sombrio (p.114-130).
// lenient: talentos/feats de outros livros que ainda não estão no compêndio vão para as notas em vez de falhar o build.
const wp = (...g) => g.map(x => `weapon-proficiency-${x}`);
const ap = (...g) => g.map(x => `armor-proficiency-${x}`);
const sf = (...s) => s.map(x => `skill-focus:${x}`);
const st = (...s) => s.map(x => `skill-training:${x}`);
const notes = o => `<p><em>Jedi Academy Training Manual</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
export const F = { darksiders: "Jedi Academy — Lado Sombrio" };
const n = (name, o) => ({ name, folder: F.darksiders, lenient: true, ...o });
const NOT_JEDI = "os níveis de Jedi representam treinamento especial; não pertence à Ordem Jedi";

export default [
  n("Azrakel, the Dark Warrior", {
    cl: 6, sp: "human", fp: 4, ds: 9, cls: [["jedi", 6]], ab: [15, 13, 14, 10, 12, 12], def: [18, 19, 18], hp: 68, dt: 19, bab: 6,
    sk: { acrobatics: 9, initiative: 9, perception: 4, useTheForce: 9 },
    feats: ["acrobatic-strike", ...ap("light", "medium"), "dual-weapon-mastery-i", "force-sensitivity", "force-training", "force-training", ...wp("lightsabers", "pistols", "simple")],
    tal: ["block", "clear-mind", "weapon-specialization:lightsabers"],
    pow: { "battle-strike": 1, "dark-rage": 1, rebuke: 1, "vital-transfer": 1 },
    wpn: [["lightsaber-double", 8, "2d8+7"], ["blaster-pistol", 7, "3d6+3"]],
    notes: notes({ Tipo: NOT_JEDI, "Ataques múltiplos": "sabre duplo +3/+3 (2d8+7) com Dual Weapon Mastery I", Posses: "sabre de luz de lâmina dupla, blaster pistol, combat jumpsuit" })
  }),
  n("Blackguard Minion", {
    cl: 1, sp: "human", ds: 4, cls: [["nonheroic", 3]], ab: [13, 12, 10, 11, 13, 12], def: [19, 12, 11], hp: 7, dt: 12, bab: 2, speed: 4,
    sk: { endurance: 6, initiative: 2, perception: 7, survival: 7 },
    feats: [...ap("light", "medium"), ...st("endurance"), ...wp("pistols", "rifles", "simple")],
    armor: "battle-armor",
    wpn: [["unarmed", 3, "1d4+1"], ["blaster-rifle", 3, "3d8"]],
    notes: notes({ Posses: "blaster rifle, armadura de batalha", Seita: "o Blackguard, culto do lado sombrio de Mustafar" })
  }),
  n("Blackguard Wilder", {
    cl: 4, sp: "human", fp: 3, ds: 8, cls: [["nonheroic", 3], ["jedi", 3]], ab: [12, 13, 10, 12, 13, 14], def: [15, 14, 15], hp: 28, dt: 14, bab: 5,
    sk: { acrobatics: 9, endurance: 7, perception: 9, survival: 9, useTheForce: 10 },
    feats: [...ap("light"), "force-sensitivity", "force-training", ...st("endurance", "useTheForce"), "weapon-focus:lightsabers", ...wp("lightsabers", "pistols", "simple")],
    tal: ["block", "power-of-the-dark-side"],
    pow: { "battle-strike": 1, "dark-rage": 1 },
    wpn: [["lightsaber", 7, "2d8+2"]],
    notes: notes({ Tipo: NOT_JEDI, Posses: "sabre de luz, túnica negra" })
  }),
  n("Brakiss", {
    cl: 11, sp: "human", fp: 7, ds: 10, cls: [["noble", 1], ["jedi", 7], ["force-adept", 3]], ab: [12, 13, 12, 13, 13, 16], def: [24, 24, 26], hp: 77, dt: 24, bab: 9,
    sk: { deception: 13, gatherInformation: 13, initiative: 6, knowledgeGalacticLore: 11, persuasion: 18, stealth: 11, useTheForce: 18 },
    feats: ["double-attack:lightsabers", "force-sensitivity", "force-training", "force-training", "force-training", ...sf("persuasion", "useTheForce"), "weapon-focus:lightsabers", ...wp("lightsabers", "pistols", "simple")],
    tal: ["channel-aggression", "channel-anger", "deflect", "elusive-target", "force-perception", "presence", "resilience", "improved-sense-force"],
    pow: { "force-lightning": 1, "mind-trick": 1, "move-object": 1, rebuke: 2, "vital-transfer": 1 },
    wpn: [["lightsaber", 12, "2d8+6"]],
    notes: notes({ "Ataques múltiplos": "sabre +7/+7 (2d8+6) com Double Attack", Posses: "sabre de luz (feito por ele), túnica prateada", Papel: "fundador da Academia das Sombras do Segundo Império" })
  }),
  n("Carnor Jax", {
    cl: 16, sp: "human", fp: 9, dest: 1, ds: 14, speed: 4, cls: [["soldier", 6], ["elite-trooper", 6], ["force-adept", 4]], ab: [14, 16, 13, 11, 15, 12], def: [33, 31, 32], hp: 154, dt: 33, bab: 15,
    sk: { initiative: 21, mechanics: 13, perception: 15, useTheForce: 14 },
    feats: [...ap("light", "medium"), "dual-weapon-mastery-i", "follow-through", "force-sensitivity", "force-training", "force-training", "martial-arts-i", "point-blank-shot", ...sf("initiative"), "weapon-focus:advancedMelee", ...wp("advanced-melee", "pistols", "rifles", "simple")],
    tal: ["armored-defense", "channel-aggression", "crippling-strike", "devastating-attack:advancedMelee", "greater-weapon-focus:advancedMelee", "harms-way", "improved-armored-defense", "weapon-specialization:advancedMelee", "force-point-recovery"],
    pow: { "battle-strike": 1, "force-slam": 1, "mind-trick": 1, "move-object": 1, rebuke: 1, "vital-transfer": 1 },
    armor: "ceremonial-armor",
    wpn: [["unarmed", 17, "1d6+10"], [{ base: "vibroblade", name: "Double Vibroblade" }, 19, "2d6+12"], ["heavy-blaster-pistol", 18, "3d8+8"]],
    notes: notes({ "Ataques múltiplos": "vibrolâmina dupla +14/+14 (2d6+12) com Dual Weapon Mastery I", "Ações especiais": "Delay Damage, Follow Through, Harm's Way, Quick Draw; RD 3 (Elite Trooper)", Posses: "vibrolâmina dupla, heavy blaster pistol, armadura da Guarda Real (+7; armadura cerimonial com pacote de capacete), comlink criptografado, cinto com medpac" })
  }),
  n("Freedon Nadd, Dark Side Spirit", {
    cl: 15, fp: 8, ds: 14, cls: [["jedi", 7], ["sith-apprentice", 5], ["sith-lord", 3]], ab: [14, 13, null, 14, 14, 19], def: [30, 33, 31], hp: 98, dt: 33, bab: 15,
    sk: { endurance: 16, initiative: 13, knowledgeGalacticLore: 14, perception: 14, useTheForce: 21 },
    feats: [...ap("light"), "double-attack:lightsabers", "dual-weapon-mastery-i", "force-sensitivity", "force-training", "force-training", "improved-defenses", "power-attack", ...sf("useTheForce"), "triple-crit:lightsabers", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["adept-negotiator", "dark-presence", "dark-side-adept", "dark-side-master", "deflect", "force-deception", "force-persuasion", "lightsaber-defense", "power-of-the-dark-side", "devastating-power", "quicken-power", "force-point-recovery", "improved-sense-force"],
    pow: { "battle-strike": 1, "dark-rage": 1, "force-grip": 1, "mind-trick": 1, "move-object": 1, rebuke: 1 },
    wpn: [],
    notes: notes({ Tipo: "espírito do lado sombrio (modelo): sem Constituição; imune a medo, a ataques corpo a corpo e à distância e a poderes [telekinetic]; não ataca fisicamente", Deslocamento: "6; atravessa terreno difícil, paredes e objetos", "Ações especiais": "Adept Negotiator, Dark Presence, viagem espiritual sombria, manifestação, possessão (ação padrão, uma criatura voluntária adjacente com Dark Side Score 1+), tentação", "Modelo Dark Side Spirit": "Car +4; perícias de Con usam Car; não usa talentos/feats com pré-requisito de Con", "Destruir o espírito": "destruir sua âncora; ou Use the Force (−Dark Side Score dele) contra a Vontade, 2d6 da Força; ou com um amuleto Sith (2d6, mas +1 DSS e −2 nas Defesas contra [dark side])" })
  }),
  n("Hethrir", {
    cl: 7, fp: 4, ds: 13, cls: [["noble", 2], ["jedi", 5]], ab: [13, 13, 14, 14, 14, 15], def: [19, 20, 21], hp: 61, dt: 20, bab: 6,
    sk: { deception: 10, gatherInformation: 10, initiative: 4, knowledgeGalacticLore: 10, knowledgeSocialSciences: 10, knowledgeTechnology: 10, perception: 15, persuasion: 15, useComputer: 10, useTheForce: 10 },
    feats: ["dodge", "force-sensitivity", "force-training", "melee-defense", ...sf("perception", "persuasion"), ...wp("lightsabers", "pistols", "simple")],
    tal: ["adept-negotiator", "force-persuasion", "inspire-confidence", "suppress-force"],
    pow: { "force-grip": 1, "mind-trick": 1, "move-object": 1 },
    wpn: [["lightsaber", 7, "2d8+4"]],
    notes: notes({ Tipo: `quase-humano Firrerreo; ${NOT_JEDI}`, Idiomas: "Basic, Firrerreo", Posses: "sabre de luz" })
  }),
  n("Irek Ismaren (Lord Nyax)", {
    cl: 12, size: "large", fp: 9, ds: 13, cls: [["scoundrel", 1], ["jedi", 6], ["force-adept", 5]], ab: [12, 13, 13, 7, 12, 12], def: [25, 25, 27], hp: 90, dt: 30, bab: 9,
    sk: { initiative: 7, knowledgeGalacticLore: 9, mechanics: 14, persuasion: 12, useComputer: 11, useTheForce: 12 },
    feats: ["double-attack:lightsabers", "force-sensitivity", "force-training", "force-training", "point-blank-shot", "power-attack", ...sf("mechanics"), "triple-attack:lightsabers", "weapon-focus:lightsabers", ...wp("lightsabers", "pistols", "simple")],
    tal: ["channel-aggression", "deflect", "disruptive", "force-perception", "force-power-adept:mind-trick", "lightsaber-defense", "weapon-specialization:lightsabers", "force-point-recovery", "force-power-mastery:mind-trick", "improved-sense-surroundings"],
    pow: { "battle-strike": 1, "mind-trick": 1, "move-object": 1, surge: 1 },
    wpn: [["lightsaber", 11, "2d8+9"]],
    notes: notes({ Tipo: `humano mutante (Grande, espaço 2×2, alcance 2); ${NOT_JEDI}`, Imunidades: "tentativas de desarmar", "Ataques múltiplos": "sabre +6/+6 com Double Attack ou +1/+1/+1 com Triple Attack (2d8+9)", "Subelectronic Converter": "usa poderes de afetar a mente em droides", Posses: "6 sabres de luz implantados (pulsos, cotovelos e joelhos), conversor subeletrônico" })
  }),
  n("Kueller", {
    cl: 9, sp: "human", fp: 6, dest: 1, ds: 12, speed: 4, cls: [["jedi", 9]], ab: [13, 13, 14, 12, 12, 14], def: [22, 26, 21], hp: 90, dt: 26, bab: 9,
    sk: { endurance: 11, mechanics: 10, perception: 10, useTheForce: 11 },
    feats: [...ap("light", "medium", "heavy"), "double-attack:lightsabers", "force-sensitivity", "force-training", "force-training", "martial-arts-i", "relentless-attack:lightsabers", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["block", "deflect", "force-intuition", "power-of-the-dark-side", "swift-power"],
    pow: { "battle-strike": 1, "dark-rage": 1, "force-thrust": 1, "move-object": 1 },
    armor: "heavy-battle-armor",
    wpn: [["unarmed", 10, "1d6+5"], ["lightsaber", 12, "2d8+5"]],
    notes: notes({ "Ataques múltiplos": "sabre +7/+7 (2d8+5) com Double Attack", Posses: "sabre de luz (feito por ele), armadura de batalha pesada, máscara mortuária Hendanyn, detonador remoto" })
  }),
  n("Massassi Abomination", {
    cl: 10, fp: 3, ds: 10, cls: [["soldier", 7], ["force-adept", 3]], ab: [22, 20, 20, 8, 12, 10], def: [24, 24, 22], hp: 127, dt: 24, bab: 9,
    sk: { endurance: 15, initiative: 15, jump: 16, perception: 6, useTheForce: 10 },
    feats: [...ap("light", "medium"), "cleave", "follow-through", "force-sensitivity", "force-training", "power-attack", ...st("useTheForce"), "weapon-focus:simple", ...wp("simple")],
    tal: ["channel-aggression", "damage-reduction-10", "embrace-the-dark-side", "devastating-attack:simple", "power-of-the-dark-side", "weapon-specialization:simple", "improved-sense-force"],
    pow: { "dark-rage": 2 },
    wpn: [[{ base: "spear", name: "Massassi Lanvarok" }, 11, "1d8+23", 4]],
    notes: notes({ Tipo: "Massassi mutado; visão na penumbra", Ataques: "lanvarok corpo a corpo +11 (1d8+23, inclui 4 de Power Attack); à distância +15 (3d4+7)", "Terrifying Presence": "inimigos que começam o turno a até 6 quadrados sofrem −2 nos ataques (medo)", "Duty Bound": "1/encontro, ao receber bônus de moral, ganha 40 PV temporários", "Warrior's Awareness": "1/encontro, reação: Uncanny Dodge I e II até o início do próximo turno", "Ações especiais": "Damage Reduction 10, Power of the Dark Side" })
  }),
  n("Nightsister of Dathomir", {
    cl: 12, fp: 6, ds: 16, cls: [["scout", 7], ["force-adept", 5]], ab: [8, 14, 13, 10, 16, 16], def: [27, 26, 30], hp: 86, dt: 26, bab: 8,
    sk: { endurance: 12, initiative: 8, perception: 19, ride: 13, stealth: 13, survival: 14, useTheForce: 19 },
    feats: ["force-sensitivity", "force-training", "force-training", "improved-defenses", "running-attack", ...sf("perception", "useTheForce"), "weapon-finesse", "weapon-focus:simple", ...wp("pistols", "rifles", "simple")],
    tal: ["attune-weapon", "charm-beast", "command-beast", "damage-reduction-10", "dark-side-savant", "empower-weapon", "wild-sense", "improved-move-light-object", "improved-sense-surroundings"],
    pow: { "battle-strike": 1, "dark-rage": 1, "force-grip": 1, "force-lightning": 1, "force-slam": 1, "move-object": 1, rebuke: 1, surge: 1 },
    wpn: [[{ base: "knife", name: "Whip (attuned, empowered)" }, 12, "2d4+5"]],
    notes: notes({ Ataques: "chicote +12 (2d4+5), alcance 2", "Ações especiais": "Charm Beast, Damage Reduction 10, Dark Side Savant, Shake It Off", Posses: "chicote (sintonizado e fortalecido), vestes de Nightsister" })
  }),
  n("Prophet of the Dark Side", {
    cl: 9, sp: "human", fp: 4, ds: 16, cls: [["noble", 9]], ab: [8, 12, 10, 14, 16, 16], def: [21, 19, 24], hp: 46, dt: 19, bab: 6,
    sk: { deception: 17, gatherInformation: 12, initiative: 10, knowledgeBureaucracy: 11, knowledgeGalacticLore: 16, perception: 17, persuasion: 12, pilot: 10, useComputer: 11, useTheForce: 17 },
    feats: ["force-sensitivity", "force-training", "force-training", "linguist", "melee-defense", ...sf("deception", "knowledgeGalacticLore", "useTheForce"), "weapon-finesse", ...wp("lightsabers", "pistols", "simple")],
    tal: ["force-perception", "motion-of-the-future", "power-of-the-dark-side", "swift-power", "visions"],
    pow: { farseeing: 2, "force-storm": 2, "mind-trick": 1, "move-object": 1, rebuke: 2 },
    wpn: [["lightsaber", 7, "2d8+3"]],
    notes: notes({ Idiomas: "Basic, Bocce, High Galactic, Huttese e mais 2", Posses: "sabre de luz, vestes escuras" })
  }),
  n("Sedriss", {
    cl: 14, sp: "human", fp: 6, dest: 1, ds: 14, cls: [["soldier", 6], ["jedi", 2], ["force-adept", 6]], ab: [14, 12, 14, 13, 12, 13], def: [28, 29, 30], hp: 126, dt: 29, bab: 12,
    sk: { knowledgeGalacticLore: 13, mechanics: 13, perception: 8, pilot: 13, useComputer: 13, useTheForce: 13 },
    feats: [...ap("light", "medium", "heavy"), "cleave", "force-sensitivity", "force-training", "force-training", "force-training", "improved-defenses", "power-attack", "unswerving-loyalty", "weapon-focus:lightsabers", ...wp("lightsabers", "pistols", "rifles", "simple")],
    tal: ["armored-defense", "channel-aggression", "channel-anger", "deflect", "embrace-the-dark-side", "improved-armored-defense", "weapon-specialization:lightsabers", "force-point-recovery", "force-point-recovery", "improved-sense-force"],
    pow: { "battle-strike": 1, "dark-rage": 1, "force-grip": 1, "force-slam": 1, "mind-trick": 1, "move-object": 1 },
    wpn: [["lightsaber", 15, "2d8+11"]],
    notes: notes({ Tipo: NOT_JEDI, "Ações especiais": "Channel Anger, Embrace the Dark Side, Unswerving Loyalty", Posses: "sabre de luz" })
  }),
  n("Junior Student of the Shadow Academy", {
    cl: 2, sp: "human", fp: 3, ds: 4, cls: [["jedi", 2]], ab: [11, 12, 12, 10, 10, 12], def: [14, 14, 13], hp: 38, dt: 14, bab: 2,
    sk: { acrobatics: 7, endurance: 7, initiative: 2, perception: 1, useTheForce: 7 },
    feats: ["force-sensitivity", "force-training", "quick-draw", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["deflect"],
    pow: { "battle-strike": 1 },
    wpn: [["lightsaber", 3, "2d8+1"]],
    notes: notes({ Posses: "sabre de luz, túnica Jedi escura" })
  }),
  n("Senior Student of the Shadow Academy", {
    cl: 6, sp: "human", fp: 4, ds: 6, cls: [["jedi", 6]], ab: [12, 12, 12, 10, 10, 13], def: [18, 18, 17], hp: 62, dt: 18, bab: 6,
    sk: { acrobatics: 9, endurance: 9, initiative: 9, perception: 3, useTheForce: 9 },
    feats: ["force-sensitivity", "force-training", "force-training", "force-training", "quick-draw", "weapon-focus:lightsabers", ...wp("lightsabers", "simple")],
    tal: ["deflect", "force-intuition", "weapon-specialization:lightsabers"],
    pow: { "battle-strike": 1, "dark-rage": 1, "force-thrust": 1 },
    wpn: [["lightsaber", 8, "2d8+6"]],
    notes: notes({ Posses: "sabre de luz, túnica Jedi escura", Observação: "Weapon Specialization (lightsabers) aparece entre os feats no livro; aqui é o talento" })
  }),
  n("Sorcerer of Tund", {
    cl: 11, size: "diminutive", speed: 4, fp: 4, ds: 10, cls: [["noble", 7], ["force-adept", 4]], ab: [2, 6, 6, 16, 16, 18], def: [27, 21, 29], hp: 35, dt: 21, bab: 8,
    sk: { deception: 19, gatherInformation: 14, knowledgeGalacticLore: 18, knowledgeLifeSciences: 13, knowledgePhysicalSciences: 13, knowledgeSocialSciences: 13, persuasion: 14, useTheForce: 19 },
    feats: ["force-sensitivity", "force-training", "force-training", "force-training", "improved-defenses", "melee-defense", ...sf("deception", "knowledgeGalacticLore", "useTheForce"), "linguist", ...wp("pistols", "simple")],
    tal: ["equilibrium", "force-perception", "force-power-adept:mind-trick", "force-talisman", "telekinetic-power", "visions", "improved-move-light-object", "improved-telepathy"],
    pow: { farseeing: 1, "force-slam": 1, "force-stun": 2, "force-thrust": 1, "mind-trick": 3, "move-object": 3, rebuke: 1 },
    wpn: [],
    notes: notes({ Tipo: "Croke (Diminuto)", Imunidades: "vácuo", "Illusory Form": "ação rápida: aparece como criatura Pequena ou Média por tempo indefinido; só pode ser desmascarado (Perception ou Use the Force contra a Vontade, ação padrão) enquanto atordoado ou inconsciente", Idiomas: "Basic, Croke e mais 7", Posses: "talismã da Força", Observação: "o livro não informa o alvo do Force Power Adept; usamos mind trick" })
  }),
  n("Tamith Kai", {
    cl: 10, sp: "human", fp: 5, dest: 1, ds: 10, speed: 8, cls: [["scout", 7], ["force-adept", 3]], ab: [14, 14, 15, 10, 12, 12], def: [25, 24, 25], hp: 71, dt: 24, bab: 7,
    sk: { climb: 12, initiative: 7, jump: 12, knowledgeLifeSciences: 10, perception: 6, ride: 12, survival: 11, useTheForce: 11 },
    feats: ["dodge", "force-sensitivity", "force-training", "force-training", "force-training", "martial-arts-i", ...sf("climb", "ride"), ...wp("pistols", "rifles", "simple")],
    tal: ["adept-spellcaster", "charm-beast", "evasion", "extreme-effort", "long-stride", "surefooted", "force-power-mastery:move-object"],
    pow: { "dark-rage": 1, "force-grip": 1, "force-slam": 1, "force-storm": 1, "mind-trick": 1, "move-object": 1 },
    wpn: [["unarmed", 9, "1d6+7"], [{ base: "knife", name: "Whip" }, 9, "2d4+7"], ["blaster-pistol", 9, "3d6+5"]],
    notes: notes({ Ataques: "chicote alcance 2 (sem proficiência no livro)", Idiomas: "Basic, Paecian", "Ações especiais": "Adept Spellcaster, Charm Beast, Extreme Effort", Posses: "blaster pistol, chicote" })
  }),
  n("Xanatos", {
    cl: 9, sp: "human", fp: 5, ds: 8, cls: [["noble", 4], ["jedi", 3], ["crime-lord", 2]], ab: [12, 11, 10, 17, 13, 16], def: [21, 20, 24], hp: 56, dt: 20, bab: 7,
    sk: { deception: 12, gatherInformation: 12, knowledgeBureaucracy: 12, initiative: 9, perception: 10, persuasion: 12, pilot: 9, ride: 9, treatInjury: 10, useComputer: 12, useTheForce: 12 },
    feats: ["force-boon", "force-sensitivity", "force-training", "linguist", "quick-draw", ...st("useTheForce"), "strong-in-the-force", ...wp("pistols", "simple", "lightsabers")],
    tal: ["adept-negotiator", "attract-minion", "connections", "educated", "impel-ally-i", "master-negotiator"],
    pow: { "mind-trick": 1, "move-object": 1 },
    wpn: [["lightsaber", 8, "2d8+5"], ["hold-out-blaster", 8, "3d4+4"]],
    notes: notes({ Idiomas: "Basic, Binary, Huttese, Mon Calamarian, Quarrenese, Rodese, Ryl, Shyriiwook (entende)", Posses: "sabre de luz, blaster hold-out, roupas finas" })
  })
];
