// Galaxy of Intrigue — droides (Cap. 3) e fauna de Nyriaan (Cap. 6). Mesmo formato de tools/data/npcs.mjs.
const wp = (...g) => g.map(x => `weapon-proficiency-${x}`);
const ap = (...g) => g.map(x => `armor-proficiency-${x}`);
const sf = (...s) => s.map(x => `skill-focus:${x}`);
const st = (...s) => s.map(x => `skill-training:${x}`);
const notes = o => `<p><em>Galaxy of Intrigue</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");

export const F = {
  droids: "Galaxy of Intrigue — Droides",
  beasts: "Galaxy of Intrigue — Fauna de Nyriaan"
};
const n = (name, folder, o) => ({ name, folder, ...o });

export default [
  n("5-BT Threat Analysis Droid", F.droids, {
    cl: 1, droid: true, size: "tiny", speed: 6, cls: [["nonheroic", 3]], ab: [4, 14, null, 13, 15, 9], def: [14, 7, 12], hp: 7, dt: 7, bab: 2,
    sk: { initiative: 13, perception: 15, knowledgeTactics: 7 },
    feats: ["coordinated-attack", ...sf("initiative", "perception"), ...st("initiative"), ...wp("pistols")],
    wpn: [["unarmed", -1, "1d2"], [{ base: "hold-out-blaster", name: "Blaster (hold-out)" }, 4, "3d4"]],
    notes: notes({ Tipo: "droide de 1º grau (pode ser herói droide)", Sentidos: "darkvision, visão na penumbra", Imunidades: "traços de droide", Deslocamento: "6 (flutuando); alcance 0", Sistemas: "flutuação, processador básico, apêndice de instrumento, apêndice de ferramenta, pacote sensorial aprimorado, acesso travado, darkvision, tradutor (CD 10), vocabulador", Posses: "blaster hold-out, detector de vigilância, detector de toxinas, veridicador; pulseira de alerta para o dono", Disponibilidade: "Restrito; 17.490 créditos" })
  }),
  n("NR-1100 Slicer Droid", F.droids, {
    cl: 3, droid: true, size: "small", speed: 6, fp: 1, cls: [["scoundrel", 3]], ab: [6, 15, null, 15, 12, 10], def: [18, 11, 15], hp: 25, dt: 11, bab: 2,
    sk: { initiative: 3, perception: 7, gatherInformation: 11, knowledgeTechnology: 8, mechanics: 8, stealth: 18, useComputer: 13 },
    feats: [...sf("gatherInformation", "stealth", "useComputer"), "point-blank-shot", ...wp("pistols", "simple")],
    tal: ["gimmick", "master-slicer"],
    wpn: [["unarmed", 0, "1d2-2"], ["blaster-pistol", 4, "3d6+1"]],
    notes: notes({ Tipo: "droide de 2º grau", Sentidos: "darkvision, visão na penumbra", Imunidades: "traços de droide", Deslocamento: "6 (flutuando)", Autodestruição: "ataque de área +5, 4d6, explosão de 2 quadrados", Observação: "desarmado causa 1 ponto de dano", Sistemas: "flutuação, processador básico, 2 mãos, 1 ferramenta, darkvision, pacote sensorial aprimorado, autodestruição (4d6), acesso travado, comlink interno", Posses: "kit de segurança, pacote de sensores, gravador de vídeo, blaster pistol", Disponibilidade: "Ilegal; 16.430 créditos" })
  }),
  n("3D-4 Administrative Droid", F.droids, {
    cl: 0, droid: true, speed: 6, cls: [["nonheroic", 1]], ab: [8, 10, null, 12, 10, 12], def: [10, 9, 10], hp: 2, dt: 9, bab: 0,
    sk: { initiative: 0, perception: 0, knowledgeBureaucracy: 11, knowledgeGalacticLore: 6, persuasion: 11 },
    feats: [...sf("knowledgeBureaucracy", "persuasion"), ...st("persuasion"), ...wp("pistols")],
    wpn: [["unarmed", -1, "1d3-1"], [{ base: "hold-out-blaster", name: "Concealed Hold-Out Blaster" }, 0, "3d4"]],
    notes: notes({ Tipo: "droide de 3º grau (pode ser herói droide)", Imunidades: "traços de droide", Sistemas: "locomoção andando, processador básico, 2 mãos, tradutor (CD 10), armazenamento interno (5 kg), vocabulador, comlink interno (criptografado)", Posses: "blaster hold-out oculto (+5 em Stealth para escondê-lo), gravador de áudio e de vídeo", Disponibilidade: "Licenciado; 7.320 créditos" })
  }),
  n("M4-Series Messenger Droid", F.droids, {
    cl: 1, droid: true, size: "diminutive", speed: 9, cls: [["nonheroic", 2]], ab: [4, 16, null, 12, 14, 10], def: [18, 7, 12], hp: 4, dt: 7, bab: 1,
    sk: { initiative: 9, perception: 13, stealth: 29 },
    feats: [...sf("perception", "stealth"), ...st("initiative"), ...wp("pistols")],
    wpn: [{ nat: "claw", name: "Garra", atk: -2, dmg: "1d2-1" }, [{ base: "hold-out-blaster", name: "Blaster (hold-out)" }, 4, "3d4"]],
    notes: notes({ Tipo: "droide de 3º grau", Sentidos: "darkvision", Imunidades: "traços de droide", Deslocamento: "9 (voo); alcance 0", Observação: "a garra causa 1 ponto de dano", Sistemas: "voo, processador básico, 1 garra, comlink interno, armazenamento interno (1 kg), acesso travado, darkvision, vocabulador", Posses: "blaster hold-out, gravador de áudio, holo-gravador", Disponibilidade: "Licenciado (restrito com arma); 88.000 créditos (valor impresso no livro)" })
  }),
  n("FIII Footman Droid", F.droids, {
    cl: 9, droid: true, speed: 6, fp: 4, cls: [["scoundrel", 5], ["soldier", 4]], ab: [20, 16, null, 16, 16, 13], def: [22, 25, 23], hp: 54, dt: 25, bab: 7,
    sk: { deception: 15, initiative: 12, knowledgeGalacticLore: 12, knowledgeTactics: 12, perception: 14, treatInjury: 12, useComputer: 12 },
    feats: [...ap("light", "medium"), "combat-reflexes", "martial-arts-i", "melee-defense", "point-blank-shot", "rapid-shot", ...sf("deception"), ...st("knowledgeGalacticLore"), ...wp("pistols", "rifles", "simple"), "whirlwind-attack"],
    tal: ["dastardly-strike", "draw-fire", "harms-way", "sneak-attack", "sneak-attack"],
    wpn: [["unarmed", 12, "1d6+9"], [{ base: "blaster-cannon", name: "Miniaturized Rail Cannons" }, 10, "3d12+4"]],
    notes: notes({ Tipo: "droide de 4º grau", Sentidos: "darkvision, visão na penumbra", Imunidades: "traços de droide", "Opções de ataque": "Combat Reflexes, Dastardly Strike, Point Blank Shot, Rapid Shot (+8, 4d12), Sneak Attack +2d6, Whirlwind Attack", "Ações especiais": "Draw Fire, Harm's Way, Melee Defense; feat Logic Upgrade: Defender (de outro suplemento, não incluído)", Sistemas: "andando, processador heurístico, 2 mãos, darkvision, pacote sensorial aprimorado, pacote de diagnóstico, comlink interno (criptografado), acesso travado, vocabulador, tradutor (CD 15), placas de durasteel (+6)", Posses: "2 canhões de trilho miniaturizados (como blaster cannons)", Disponibilidade: "Militar; 35.630 créditos" })
  }),
  n("BL-Series Battle Legionnaire", F.droids, {
    cl: 3, droid: true, speed: 6, cls: [["nonheroic", 9]], ab: [14, 15, null, 13, 13, 10], def: [17, 12, 11], hp: 22, dt: 12, bab: 6,
    sk: { initiative: 16, perception: 12 },
    feats: [...ap("light"), "coordinated-attack", "rapid-shot", ...sf("initiative"), ...wp("advanced-melee", "pistols", "rifles")],
    wpn: [[{ base: "vibrodagger", name: "Finger Blades" }, 8, "2d4+2"], [{ base: "light-repeating-blaster", name: "Assault Blaster" }, 3, "3d8"]],
    notes: notes({ Tipo: "droide de 4º grau", Sentidos: "darkvision, visão na penumbra", Imunidades: "traços de droide", Ataques: "assault blaster +3 (3d8) em fogo automático, +6 apoiado, +1 (4d8) com Rapid Shot", "Gyroscopic Stabilizers": "+5 contra ser derrubado", Sistemas: "andando, processador básico, 2 mãos, estabilizadores giroscópicos, darkvision, pacote sensorial aprimorado, comlink interno, placas de quadanium (+5), armazenamento interno (1 kg), vocabulador, gerador de bolha de silêncio", Posses: "assault blaster (como light repeating blaster), lâminas nos dedos (como vibrodagger), medpac", Disponibilidade: "Militar; 15.090 créditos" })
  }),
  n("B4J4 Security Droid", F.droids, {
    cl: 2, droid: true, size: "small", speed: 9, cls: [["nonheroic", 6]], ab: [12, 12, null, 11, 11, 8], def: [14, 11, 10], hp: 14, dt: 11, bab: 4,
    sk: { initiative: 9, perception: 13 },
    feats: [...ap("light"), "rapid-shot", ...sf("perception"), ...st("initiative"), "weapon-focus:pistols", ...wp("pistols")],
    wpn: [{ nat: "claw", name: "Garra", atk: 5, dmg: "1d3+1" }, ["heavy-blaster-pistol", 6, "3d8"], ["snare-pistol", 6, "1d4"]],
    notes: notes({ Tipo: "droide de 4º grau", Imunidades: "traços de droide", Deslocamento: "9 (voo)", "Opções de ataque": "Rapid Shot (+4, 4d8)", Sistemas: "voo, processador básico, garra (oculta), comlink interno, vocabulador, carapaça de plasteel (+2)", Posses: "2 heavy blaster pistols (ajustados para atordoar), snare pistol", Disponibilidade: "Restrito; 25.340 créditos" })
  }),

  /* ---------------- NYRIAAN ---------------- */
  n("Lluma", F.beasts, {
    cl: 7, size: "large", speed: 8, cls: [["beast", 8]], ab: [24, 12, 22, 1, 14, 6], def: [14, 16, 12], hp: 84, dt: 21, bab: 6,
    sk: { perception: 11 },
    feats: ["bantha-rush", "power-attack", "powerful-charge"],
    wpn: [{ nat: "slam", name: "Pisotear", atk: 8, dmg: "1d6+16", pa: 5 }],
    notes: notes({ Sentidos: "darkvision", Observação: "ataque inclui 5 pontos de Power Attack; com Powerful Charge +10 (1d6+20)", Táticas: "foge antes de lutar, mas os machos protegem a manada com violência" })
  }),
  n("Pherin", F.beasts, {
    cl: 3, speed: 6, cls: [["beast", 4]], ab: [16, 14, 12, 2, 14, 10], def: [14, 11, 12], hp: 26, dt: 11, bab: 3,
    sk: { initiative: 4, perception: 4, acrobatics: 9 },
    feats: ["power-attack", "toughness"],
    wpn: [{ nat: "slam", name: "Pancada", atk: 3, dmg: "1d4+8", pa: 3 }, { nat: "bite", name: "Mordida", atk: 6, dmg: "1d6+5" }],
    notes: notes({ Sentidos: "darkvision", Observação: "a pancada inclui 3 pontos de Power Attack", Táticas: "ataca em bando, derrubando primeiro quem parece mais perigoso" })
  }),
  n("Chlovi Cat", F.beasts, {
    cl: 5, size: "small", speed: 8, cls: [["beast", 6]], ab: [10, 16, 13, 2, 16, 8], def: [17, 12, 14], hp: 33, dt: 12, bab: 4,
    sk: { initiative: 6, perception: 6, stealth: 16 },
    feats: ["coordinated-attack", "improved-defenses", "rapid-strike"],
    wpn: [{ nat: "claw", name: "Garra", atk: 4, dmg: "1d3+3" }, { nat: "bite", name: "Mordida", atk: 4, dmg: "1d4+3" }],
    notes: notes({ Sentidos: "darkvision", Ataques: "2 garras e mordida; ou 2 garras +2 (2d3+3) com Rapid Strike", "Ações especiais": "Coordinated Attack", Táticas: "caça em matilhas de três ou mais, comunicando-se por bioluminescência" })
  })
];
