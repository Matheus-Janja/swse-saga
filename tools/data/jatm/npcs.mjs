// Jedi Academy Training Manual — feras ligadas à Força (Cap. 6, p.131-147). Mesmo formato de tools/data/npcs.mjs.
const sf = (...s) => s.map(x => `skill-focus:${x}`);
const st = (...s) => s.map(x => `skill-training:${x}`);
const notes = o => `<p><em>Jedi Academy Training Manual</em></p>` + Object.entries(o).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
export const F = { beasts: "Jedi Academy — Feras da Força" };
const n = (name, o) => ({ name, folder: F.beasts, ...o });

export default [
  n("Battle Hydra (Two-Headed)", {
    cl: 9, size: "large", speed: 6, cls: [["beast", 9]], ab: [17, 24, 16, 2, 10, 13], def: [30, 22, 19], hp: 67, dt: 27, dr: 5, bab: 6,
    sk: { initiative: 15, perception: 9 },
    feats: ["running-attack", ...st("initiative"), "weapon-finesse"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 12, dmg: "1d8+7" }, { nat: "claw", name: "Garra", atk: 12, dmg: "1d6+7" }, { nat: "slam", name: "Ferrão (veneno)", atk: 12, dmg: "1d6+7" }],
    notes: notes({ Sentidos: "visão na penumbra; rola Iniciativa duas vezes (fica com a melhor)", Deslocamento: "6; voo 10", "Espaço/alcance": "2×2; alcance 1 (2 com o ferrão)", Ataques: "2 mordidas e 2 garras, ou ferrão", "Dual Mind": "efeitos contra a Vontade rolam duas vezes e ficam com o menor", Veneno: "ferrão que fere: 1d20+9 contra a Fortitude, 3d6 e −1 passo; ataca a cada rodada até Treat Injury CD 15" })
  }),
  n("Beck-tori", {
    cl: 13, size: "huge", speed: 6, fp: 2, cls: [["beast", 13]], ab: [22, 10, 20, 2, 12, 12], def: [30, 28, 22], hp: 123, dt: 38, bab: 9,
    sk: { initiative: 12, survival: 12, useTheForce: 12 },
    feats: ["crush", "force-sensitivity", "force-training", "pin", ...st("initiative", "survival")], pow: { "battle-strike": 2 },
    wpn: [{ nat: "bite", name: "Mordida", atk: 15, dmg: "2d6+12" }],
    notes: notes({ Sentidos: "visão na penumbra", Deslocamento: "6; natação 8", "Espaço/alcance": "3×3; alcance 2", "Fast Healing 5": "recupera 5 PV no fim de cada turno até morrer", Devour: "mordida contra Grande ou menor: agarrão livre (+15); devorado sofre 1d8+12 por rodada e, a 0 PV, é engolido (1d6 de ácido por rodada)", Observação: "o bloco lista Iniciativa +11 no topo e +12 nas perícias; usamos +12" })
  }),
  n("Chrysalis Rancor", {
    cl: 13, size: "gargantuan", speed: 10, cls: [["beast", 12]], ab: [34, 13, 31, 2, 7, 15], def: [16, 20, 8], hp: 219, dt: 40, dr: 10, bab: 9,
    sk: { initiative: 7, perception: 9 },
    feats: ["cleave", "crush", "pin", "power-attack", "toughness"],
    wpn: [{ nat: "claw", name: "Garra", atk: 16, dmg: "2d8+25", pa: 6 }, { nat: "bite", name: "Mordida", atk: 16, dmg: "3d6+25", pa: 6 }],
    notes: notes({ Sentidos: "visão na penumbra", "Espaço/alcance": "4×4; alcance 3", Observação: "ataques incluem 6 pontos de Power Attack", "Fast Healing 5": "recupera 5 PV por turno", "Terrifying Presence": "inimigos que começam o turno a até 6 quadrados sofrem −2 nos ataques (medo)", Modelo: "Chrysalis Beast: +2 ND, +1 tamanho, +25% PV, RD +4 (mín. 10), +2 de deslocamento, +1 de alcance, armas naturais +1 dado" })
  }),
  n("Derriphan", {
    cl: 9, size: "tiny", speed: 8, ds: 16, cls: [["beast", 8]], ab: [6, 18, 10, 2, 16, 8], def: [17, 11, 14], hp: 36, dt: 11, bab: 6,
    sk: { initiative: 8, perception: 7, stealth: 8, useTheForce: 8 },
    feats: ["force-sensitivity", "force-training", "improved-defenses"], pow: { "force-grip": 1, "force-slam": 1, "mind-trick": 1 },
    wpn: [],
    notes: notes({ Sentidos: "darkvision; rerrola Iniciativa e Stealth (fica com o segundo)", Deslocamento: "voo 8 (flutuando)", RD: "10/Força", Imunidades: "medo, afetar a mente", "Consume Force": "alvo de poder sem [light side]: recupera um poder gasto (reação)", "Dark Backlash": "quem o alveja com [mind-affecting] sofre 3d8 de dano da Força", Possession: "ação padrão: 1d20+9 contra a Reflexos de um adjacente para entrar nele; depois, a cada rodada, 1d20+9 contra a Vontade (3d8 da Força; metade se errar); a 0 PV assume o controle do hospedeiro" })
  }),
  n("Droch", {
    cl: 1, size: "diminutive", speed: 6, cls: [["beast", 1]], ab: [2, 20, 10, 1, 9, 2], def: [18, 11, 10], hp: 4, dt: 11, bab: 0,
    sk: { perception: -1, stealth: 20 },
    feats: ["skill-focus:stealth", "weapon-finesse"],
    wpn: [{ nat: "bite", name: "Mordida (burrow)", atk: 1, dmg: "1d4" }],
    notes: notes({ Sentidos: "darkvision", "Light Susceptibility": "exposto à luz, −2 passos persistentes até sair dela", Burrow: "ao acertar, ataque livre contra a Fortitude: entra na carne e transmite a peste death seed (veja o item no compêndio de equipamentos); remover: Treat Injury CD 25" })
  }),
  n("Droch Swarm", {
    cl: 3, size: "tiny", speed: 6, cls: [["beast", 1]], ab: [2, 20, 10, 1, 9, 2], def: [18, 11, 10], hp: 8, dt: 21, bab: 0,
    sk: { perception: -1, stealth: 20 },
    feats: ["skill-focus:stealth", "weapon-finesse"],
    wpn: [{ nat: "bite", name: "Mordida (burrow)", atk: 1, dmg: "1d4" }],
    notes: notes({ Sentidos: "darkvision", Enxame: "ataques corpo a corpo afetam todos ao alcance; ataques à distância contra o enxame têm splash de 1 quadrado; ataques de área causam +2 dados", "Light Susceptibility": "exposto à luz, −2 passos persistentes", Burrow: "como o droch" })
  }),
  n("Dxun Tomb Beast", {
    cl: 8, size: "large", speed: 8, cls: [["beast", 7]], ab: [25, 12, 21, 2, 14, 13], def: [17, 15, 12], hp: 67, dt: 20, bab: 5,
    sk: { initiative: 4, perception: 5, stealth: 9 },
    feats: ["power-attack", "powerful-charge", ...sf("stealth")],
    wpn: [{ nat: "gore", name: "Chifrada (investida)", atk: 12, dmg: "1d8+17" }, { nat: "bite", name: "Mordida", atk: 12, dmg: "1d8+10" }, { nat: "claw", name: "Garra", atk: 12, dmg: "1d6+10" }],
    notes: notes({ Sentidos: "darkvision", "Espaço/alcance": "2×2; alcance 1", Ataques: "chifrada +12 (1d8+17 com Powerful Charge, inclui 4 de Power Attack) ou mordida e 2 garras", "Dark Saturation": "1/encontro, ação livre: um alvo recém-ferido é envenenado como pelo veneno Sith", "Mutant Rage": "1/encontro, ação rápida: +4 de fúria em ataque e dano corpo a corpo até o fim do turno", "Shadow Cloak": "ação padrão: camuflagem total até atacar ou até o fim do próximo turno" })
  }),
  n("Hssiss (Dark Side Dragon)", {
    cl: 5, size: "large", speed: 8, cls: [["beast", 5]], ab: [22, 14, 20, 2, 12, 10], def: [20, 19, 15], hp: 47, dt: 24, bab: 3,
    sk: { initiative: 4, perception: 3, stealth: 9 },
    feats: ["pin", "power-attack"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 6, dmg: "1d8+11", pa: 3 }, { nat: "claw", name: "Garra", atk: 6, dmg: "1d6+11", pa: 3 }],
    notes: notes({ Sentidos: "visão na penumbra", Deslocamento: "8; natação 8", "Espaço/alcance": "2×2; alcance 1", Observação: "ataques incluem 3 pontos de Power Attack", "Improved Grab": "ao acertar a mordida, o alvo fica agarrado", "Drag Away": "ao imobilizar com Pin, move-se seu deslocamento arrastando o alvo (sem provocar)" })
  }),
  n("Marsh Haunt", {
    cl: 11, size: "huge", speed: 8, fp: 3, cls: [["beast", 11]], ab: [30, 11, 25, 3, 15, 11], def: [23, 28, 23], hp: 126, dt: 38, bab: 8,
    sk: { initiative: 5, perception: 12, stealth: 15, survival: 12, useTheForce: 10 },
    feats: ["force-sensitivity", "force-training", "power-attack", ...st("perception", "survival")], pow: { "battle-strike": 1, "mind-trick": 2 },
    wpn: [{ nat: "slam", name: "Pancada", atk: 13, dmg: "1d8+20", pa: 5 }],
    notes: notes({ Sentidos: "visão na penumbra", "Espaço/alcance": "3×3; alcance 2", Observação: "inclui 5 pontos de Power Attack; mind trick só para terror; o bloco cita Mighty Swing", Camouflage: "ignora o modificador de tamanho em Stealth", "Paralyzing Fear": "quem começa o turno a até 6 quadrados e em linha de visão sofre 1d20+10 contra a Vontade; se acertar, fica imobilizado até o início do próximo turno (medo)" })
  }),
  n("Nighthunter", {
    cl: 9, speed: 8, fp: 3, cls: [["beast", 9]], ab: [15, 14, 18, 2, 17, 10], def: [22, 23, 22], hp: 76, dt: 23, bab: 6,
    sk: { initiative: 6, perception: 12, stealth: 16, survival: 7, useTheForce: 9 },
    feats: ["force-sensitivity", "force-training", "pin", ...sf("stealth"), ...st("perception")], pow: { "battle-strike": 2, "negate-energy": 1, surge: 1 },
    wpn: [{ nat: "claw", name: "Garra", atk: 8, dmg: "1d4+6" }, { nat: "bite", name: "Mordida", atk: 8, dmg: "1d6+6" }],
    notes: notes({ Sentidos: "visão na penumbra, faro", Resistências: "energia 10, fogo 10", Ataques: "2 garras e mordida", Faro: "ignora camuflagem e cobertura a até 10 quadrados para notar oponentes; sem penalidade ao rastrear" })
  }),
  n("Shyrack", {
    cl: 4, speed: 6, cls: [["beast", 4]], ab: [16, 9, 15, 2, 16, 4], def: [17, 16, 17], hp: 26, dt: 16, bab: 3,
    sk: { initiative: 1, perception: 15, survival: 10 },
    feats: [...sf("perception"), ...st("survival")],
    wpn: [{ nat: "bite", name: "Mordida", atk: 6, dmg: "1d6+3" }],
    notes: notes({ Sentidos: "faro; rerrola Perception (fica com o segundo)", Deslocamento: "voo 6", Overwhelm: "+2 no ataque corpo a corpo por shyrack aliado adjacente a ele e ao alvo" })
  }),
  n("Shyrack Swarm", {
    cl: 6, size: "large", speed: 6, cls: [["beast", 4]], ab: [16, 9, 15, 2, 16, 4], def: [17, 16, 17], hp: 52, dt: 26, bab: 3,
    sk: { initiative: 1, perception: 15, survival: 10 },
    feats: [...sf("perception"), ...st("survival")],
    wpn: [{ nat: "bite", name: "Mordida", atk: 6, dmg: "1d6+3" }],
    notes: notes({ Sentidos: "faro; rerrola Perception", Deslocamento: "voo 6", Enxame: "ataques corpo a corpo afetam todos ao alcance; ataques à distância contra ele têm splash de 1 quadrado; área +2 dados", Overwhelm: "+2 por enxame aliado adjacente a ele e ao alvo", Observação: "o livro mantém Reflexos 17 (sem ajuste de tamanho)" })
  }),
  n("Silooth", {
    cl: 13, size: "huge", speed: 8, cls: [["beast", 12]], ab: [30, 8, 28, 2, 8, 13], def: [19, 25, 15], hp: 162, dt: 35, dr: 5, bab: 9,
    sk: { initiative: 5, perception: 5, endurance: 10 },
    feats: ["bantha-rush", "crush", "pin", "powerful-charge", "power-attack"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 19, dmg: "2d6+16" }],
    notes: notes({ Sentidos: "visão na penumbra; Limited Vision (a 12+ quadrados, tudo tem camuflagem total)", "Espaço/alcance": "3×3; alcance 2", Ataques: "mordida +19 (2d6+16), ou +19 (2d6+26) com Powerful Charge e 4 pontos de Power Attack", "Acid Spray": "ataque à distância +8, cone de 6 quadrados, 1d8+6 de ácido; quem é ferido fica coberto de ácido" })
  }),
  n("Sith Warbird", {
    cl: 7, size: "huge", speed: 8, cls: [["beast", 8]], ab: [25, 13, 22, 2, 10, 8], def: [23, 24, 18], hp: 84, dt: 34, dr: 5, bab: 6,
    sk: { initiative: 5, perception: 9, endurance: 15, survival: 9 },
    feats: ["power-attack", "powerful-charge", ...st("endurance")],
    wpn: [{ nat: "gore", name: "Bicada", atk: 9, dmg: "2d6+15", pa: 4 }],
    notes: notes({ "Espaço/alcance": "3×3; alcance 2", Observação: "inclui 4 pontos de Power Attack; com Powerful Charge +11 (2d6+19)", Trample: "ação de movimento: atravessa espaços de inimigos (provoca); em cada um, +13 contra a Reflexos, 1d8+10 e derruba" })
  }),
  n("Sith Wyrm", {
    cl: 18, size: "colossal", speed: 10, cls: [["beast", 16]], ab: [44, 10, 38, 1, 8, 10], def: [26, 40, 25], hp: 296, dt: 95, dr: 15, bab: 12,
    sk: { initiative: 8, perception: 12 },
    feats: ["crush", "improved-damage-threshold", "pin", "power-attack", "powerful-charge", "weapon-focus:bite"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 27, dmg: "4d6+38", pa: 8 }],
    notes: notes({ Sentidos: "darkvision; rerrola Perception (fica com o melhor)", "Espaço/alcance": "6×6; alcance 4", Observação: "inclui 8 pontos de Power Attack; com Powerful Charge +29 (4d6+46)", Devour: "mordida contra Gigantesco ou menor: agarrão livre (+35); devorado sofre 4d6+30 por rodada e, a 0 PV, é engolido (3d6 de ácido por rodada)" })
  }),
  n("Storm Beast", {
    cl: 8, speed: 6, ds: 8, cls: [["beast", 8]], ab: [24, 12, 19, 2, 14, 13], def: [14, 14, 12], hp: 76, dt: 14, bab: 6,
    sk: { initiative: 5, perception: 6, endurance: 13 },
    feats: ["force-sensitivity", "mighty-swing", "power-attack"],
    wpn: [{ nat: "claw", name: "Garra", atk: 10, dmg: "1d4+14", pa: 3 }],
    notes: notes({ Observação: "2 garras; incluem 3 pontos de Power Attack", "Sonic Blast": "ação padrão: cone de 6 quadrados, +8 contra a Fortitude, 2d6+4 de dano sônico (metade se errar; área)" })
  }),
  n("Taozin", {
    cl: 13, size: "gargantuan", speed: 4, cls: [["beast", 13]], ab: [30, 7, 28, 2, 8, 2], def: [18, 32, 22], hp: 175, dt: 57, bab: 9,
    sk: { initiative: 4, perception: 5, climb: 21, stealth: 9, survival: 10 },
    feats: ["improved-damage-threshold", "power-attack", ...sf("stealth"), ...st("stealth", "survival")],
    wpn: [{ nat: "bite", name: "Mordida", atk: 14, dmg: "3d6+21", pa: 5 }],
    notes: notes({ Sentidos: "darkvision", "Espaço/alcance": "4×4; alcance 3", Imunidades: "poderes da Força de afetar a mente, telepatia", Resistência: "energia 15", "Invisible to the Force": "não é detectado por poderes, talentos ou Use the Force (Sense)", "Lightsaber Diffusion": "ao ser atingido por sabre, reação +10 contra a Reflexos do atacante: 2d8 de energia", Translucent: "ignora o tamanho em Stealth; camuflagem em luz normal e camuflagem total em penumbra contra quem está a mais de 6 quadrados", Web: "ação padrão: área 4×4 a até 20 quadrados, +7 contra a Reflexos de cada um, imobilizados até escapar (Força ou Acrobatics CD 20)" })
  }),
  n("Terentatek", {
    cl: 14, size: "huge", speed: 8, cls: [["beast", 15]], ab: [29, 9, 26, 2, 10, 15], def: [34, 33, 25], hp: 187, dt: 43, bab: 11,
    sk: { initiative: 11, perception: 12 },
    feats: ["cleave", "crush", "pin", "power-attack", "powerful-charge", ...st("initiative")],
    wpn: [{ nat: "claw", name: "Garra", atk: 12, dmg: "1d8+24", pa: 8 }, { nat: "bite", name: "Mordida", atk: 12, dmg: "2d6+24", pa: 8 }],
    notes: notes({ Sentidos: "darkvision; rerrola Perception (fica com o melhor)", "Espaço/alcance": "3×3; alcance 2", Observação: "inclui 8 pontos de Power Attack; mordida +14 (2d6+31) com Powerful Charge", Imunidades: "poderes da Força de afetar a mente", "Fast Healing 5": "recupera 5 PV por turno", "Force Resistance": "+5 nas Defesas contra Use the Force" })
  }),
  n("Tuk'ata Sith Hound", {
    cl: 4, speed: 7, ds: 14, cls: [["beast", 3]], ab: [17, 14, 12, 2, 14, 11], def: [16, 12, 13], hp: 17, dt: 12, bab: 2,
    sk: { initiative: 8, perception: 3 },
    feats: ["improved-defenses", "running-attack"],
    wpn: [{ nat: "bite", name: "Mordida", atk: 5, dmg: "1d6+4" }, { nat: "claw", name: "Garra", atk: 5, dmg: "1d4+4" }],
    notes: notes({ Sentidos: "faro", Ataques: "mordida e 2 garras", "Cunning Beast": "ao sofrer dano corpo a corpo, reação: move 2 quadrados sem provocar", "Pack Tactics": "adjacente a um inimigo, os aliados recebem +2 de circunstância nos ataques corpo a corpo contra ele" })
  })
];
