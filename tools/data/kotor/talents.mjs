// Knights of the Old Republic Campaign Guide — talentos novos (Caps. 2-4). Textos resumidos.
const SRC = "Knights of the Old Republic Campaign Guide";
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
const IMG = { talent: "icons/magic/symbols/star-yellow.webp", forceTalent: "icons/magic/control/silhouette-aura-energy.webp", forceTechnique: "icons/magic/perception/eye-ringed-glow-angry-small-teal.webp", forceSecret: "icons/magic/symbols/runes-star-pentagon-blue.webp" };
let TREE = "";
let CAT = "talent";
const tree = (n, c = "talent") => { TREE = n; CAT = c; };
const t = (name, key, text, pre = {}, o = {}) => ({
  name, type: "talent", img: IMG[CAT],
  system: { key, tree: TREE, category: CAT, classes: [], source: SRC, description: `<p>${text}</p>`, prerequisites: P(pre),
    choice: { type: o.choice ?? "", value: "", options: [] }, repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], rerolls: o.rerolls ?? [] }
});
const pre = (text, o = {}) => ({ text, ...o });
const T = (...k) => ({ talents: k });
const out = [];
const push = (...x) => out.push(...x);
const FARSEE = { forcePowers: ["farseeing"] };

/* ---------------- Jedi ---------------- */
tree("Jedi Consular");
push(
  t("Collective Visions", "collective-visions", "Ao usar farseeing (ou poder/talento que o exige), outros usuários da Força com farseeing a até 6 quadrados podem ajudar seu teste de Use the Force como reação.", pre("farseeing", FARSEE)),
  t("Visionary Attack", "visionary-attack", "Reação quando você ou um aliado a até 12 quadrados erra um ataque corpo a corpo ou à distância: gasta um uso de farseeing e faz Use the Force contra a Vontade do alvo; se igualar ou superar, o atacante rerrola o ataque. −5 cumulativo em Use the Force até seu próximo turno.", pre("farseeing, WatchCircle Initiate", { forcePowers: ["farseeing"], talents: ["watchcircle-initiate"] })),
  t("Visionary Defense", "visionary-defense", "Reação quando você ou um aliado a até 12 quadrados é alvo de um ataque: gasta um uso de farseeing e faz Use the Force contra a Vontade do atacante; se igualar ou superar, o alvo recebe +5 da Força na Reflexos contra esse ataque. −5 cumulativo em Use the Force até seu próximo turno.", pre("farseeing, WatchCircle Initiate", { forcePowers: ["farseeing"], talents: ["watchcircle-initiate"] })),
  t("Renew Vision", "renew-vision", "1/encontro, ação rápida: recupera todos os usos gastos de farseeing.", pre("farseeing", FARSEE)),
  t("WatchCircle Initiate", "watchcircle-initiate", "Reação: Use the Force CD 15 e gasta um uso de farseeing para subtrair 1 dos seus Pontos da Força (não temporários) e dar +1 Ponto da Força a todos os aliados em linha de visão (não conta como gastar Ponto da Força).", pre("farseeing", FARSEE))
);
tree("Jedi Guardian");
push(t("Improved Battle Meditation", "improved-battle-meditation", "Ativa Battle Meditation como ação rápida (em vez de rodada completa); o alcance sobe para 12 quadrados e inimigos no raio sofrem −1 nas jogadas de ataque.", pre("Battle Meditation", T("battle-meditation"))));
tree("Jedi Sentinel");
push(
  t("Dark Retaliation", "dark-retaliation", "1/encontro, gasta um Ponto da Força para ativar um poder da Força como reação a ser alvo de um poder [dark side].", pre("Sentinel Strike", T("sentinel-strike"))),
  t("Sentinel Strike", "sentinel-strike", "Ao atacar um oponente desprevenido (ou sem Destreza na Reflexos) com poder da Força que cause dano ou com sabre de luz, +1d6 de dano (não vale para poderes [dark side]). Repetível, +1d6 por vez (máx. +5d6).", {}, { repeatable: true }),
  t("Sentinel's Gambit", "sentinels-gambit", "1/encontro, ação rápida: um inimigo adjacente com Dark Side Score 1+ perde o bônus de Destreza na Reflexos contra seus ataques até o fim do seu próximo turno.")
);
tree("Lightsaber Combat");
push(t("Riposte", "riposte", "1/encontro, reação: após negar um ataque corpo a corpo com Block, faz um ataque de sabre contra quem atacou (não vale contra ataques de área).", pre("Block, BBA +5", { talents: ["block"], bab: 5 })));

/* ---------------- Noble ---------------- */
tree("Influence");
push(
  t("Fluster", "fluster", "1/encontro, ação padrão: Persuasion para intimidar uma criatura em linha de visão; se tiver sucesso, ela só pode fazer uma ação rápida no próximo turno (+5 na Vontade se for de nível maior). Afeta a mente.", pre("Presence, treinado em Persuasion", { talents: ["presence"], trained: ["persuasion"] })),
  t("Intimidating Defense", "intimidating-defense", "1/encontro, reação: Persuasion para intimidar quem acabou de fazer um ataque contra você; se tiver sucesso, −5 nessa jogada (+5 na Vontade se for de nível maior). Afeta a mente.", pre("Presence, treinado em Persuasion", { talents: ["presence"], trained: ["persuasion"] }))
);
tree("Leadership");
push(t("Reactionary Attack", "reactionary-attack", "1/encontro, reação a um ataque contra você ou um aliado: um aliado a até 6 quadrados faz um ataque imediato contra o atacante.", pre("Born Leader, treinado em Persuasion", { talents: ["born-leader"], trained: ["persuasion"] })));
tree("Fencing");
const NFS = pre("Noble Fencing Style", T("noble-fencing-style"));
push(
  t("Noble Fencing Style", "noble-fencing-style", "Com arma corpo a corpo leve ou sabre de luz em que é proficiente, usa o mod. de Carisma no lugar do de Força nas jogadas de ataque.", pre("Treinado em Deception e Persuasion", { trained: ["deception", "persuasion"] })),
  t("Demoralizing Defense", "demoralizing-defense", "Reação: designa um inimigo que você acabou de acertar com ataque corpo a corpo; ele causa só metade do dano no ataque, mas sofre −5 nos ataques contra você até o fim do seu próximo turno. Afeta a mente.", NFS),
  t("Leading Feint", "leading-feint", "Ao ferir com ataque corpo a corpo, ação rápida: Deception para fintar; se tiver sucesso, um aliado a até 12 quadrados trata o alvo como desprevenido no primeiro ataque antes do seu próximo turno.", NFS),
  t("Personal Affront", "personal-affront", "1/encontro, reação: um ataque corpo a corpo contra um inimigo adjacente que acabou de ferir você.", pre("Noble Fencing Style, BBA +5", { talents: ["noble-fencing-style"], bab: 5 })),
  t("Transposing Strike", "transposing-strike", "Ao acertar ataque corpo a corpo, o ataque causa metade do dano e vocês trocam de lugar (alvo até um tamanho maior; sem ataques de oportunidade).", pre("Noble Fencing Style, BBA +5", { talents: ["noble-fencing-style"], bab: 5 }))
);

/* ---------------- Scoundrel ---------------- */
tree("Fortune");
push(t("Lucky Stop", "lucky-stop", "1/encontro, reação: nega o dano de um único ataque que o reduziria a 0 PV (um objeto que você carrega ou veste absorve o golpe).", pre("Knack", T("knack"))));
tree("Run and Gun");
const OS = pre("Opportunistic Strike", T("opportunistic-strike"));
push(
  t("Opportunistic Strike", "opportunistic-strike", "1/encontro, faz um ataque de oportunidade (mesmo com arma à distância) contra um oponente em alcance de queima-roupa que provoque de um aliado."),
  t("Cheap Shot", "cheap-shot", "1/encontro, ataque de oportunidade contra quem faz withdraw de um quadrado ameaçado por um aliado em alcance de queima-roupa.", OS),
  t("No Escape", "no-escape", "Quem faz withdraw de um quadrado que você ameaça fica desprevenido contra você até o fim do seu próximo turno.", OS),
  t("Strike and Run", "strike-and-run", "1/encontro, reação após ferir um oponente com ataque corpo a corpo ou à distância: move-se até o seu deslocamento."),
  t("Slippery Strike", "slippery-strike", "1/encontro, reação: designa um oponente que você acabou de ferir; ele não pode fazer ataques de oportunidade contra você até o fim do seu próximo turno (combina com Strike and Run numa só reação).", pre("Strike and Run", T("strike-and-run")))
);

/* ---------------- Scout ---------------- */
tree("Awareness");
push(t("Weak Point", "weak-point", "1/encontro, ação rápida: ignora a RD de um alvo em linha de visão pelo resto do seu turno.", pre("Acute Senses, Keen Shot", T("acute-senses", "keen-shot"))));
tree("Hyperspace Explorer");
push(
  t("Deep-Space Gambit", "deep-space-gambit", "1/encontro, quando você ou um veículo que ocupa é alvo de um ataque, obriga o atacante a rerrolar e ficar com o pior."),
  t("Guidance", "guidance", "Ação rápida: um aliado em linha de visão que o ouça ignora terreno difícil no próximo turno (não em você).", pre("Treinado em Perception", { trained: ["perception"] })),
  t("Hidden Attacker", "hidden-attacker", "Usa a aplicação de franco-atirador (snipe) de Stealth como ação rápida em vez de ação de movimento.", pre("Treinado em Stealth", { trained: ["stealth"] })),
  t("Hyperspace Savant", "hyperspace-savant", "Pilotando, usa Pilot no lugar de Use Computer para astrogar e operar sensores.", pre("Treinado em Pilot", { trained: ["pilot"] })),
  t("Vehicle Sneak", "vehicle-sneak", "Em Stealth com um veículo, ele conta como dois tamanhos menor.", pre("Treinado em Pilot", { trained: ["pilot"] }))
);

/* ---------------- Soldier ---------------- */
tree("Armor Specialist");
push(t("Shield Expert", "shield-expert", "1/encontro, ação rápida: recupera 10 pontos de SR (até o máximo) num escudo pessoal ativo.", pre("Armor Proficiency (light)", { feats: ["armor-proficiency-light"] })));
tree("Brawler");
push(t("Devastating Melee Smash", "devastating-melee-smash", "1/encontro, declara antes de atacar: se o ataque corpo a corpo acertar, soma ½ do seu nível ao dano em vez do +1 de Melee Smash (não acumula com Powerful Charge).", pre("Melee Smash", T("melee-smash"))));
tree("Weapon Specialist");
push(t("Disarming Attack", "disarming-attack", "Escolha uma arma exótica ou grupo em que é proficiente: ao desarmar com ela, ignora o bônus de armadura do alvo na Reflexos; 1/encontro, +10 na jogada de desarmar.", pre("Improved Disarm, Int 13, Weapon Specialization na arma", { feats: ["improved-disarm"], abilities: { int: 13 } }), { choice: "weaponGroup" }));

tree("Rocket Jumper");
push(
  t("Jet Pack Training", "jet-pack-training", "Ativa o jet pack como ação livre no seu turno e não precisa de Pilot para pousar com segurança."),
  t("Burning Assault", "burning-assault", "Ação padrão: gasta uma carga do jet pack para atacar com ele como lança-chamas (proficiente); não pode usar voando.", pre("Jet Pack Training", T("jet-pack-training"))),
  t("Improved Trajectory", "improved-trajectory", "Seu deslocamento de voo com jet pack aumenta em 2 quadrados.", pre("Jet Pack Training", T("jet-pack-training"))),
  t("Jet Pack Withdraw", "jet-pack-withdraw", "1/encontro, reação quando um oponente fica adjacente: gasta uma carga do jet pack para voar até o seu deslocamento ou fazer withdraw.", pre("Jet Pack Training", T("jet-pack-training")))
);

/* ---------------- Prestígio (Cap. 3) ---------------- */
tree("Mandalorian Warrior");
push(
  t("Armored Mandalorian", "armored-mandalorian", "Soma o bônus de equipamento da armadura na Fortitude à sua RD de Elite Trooper (máx. igual à RD de base); se um sabre não ignora a RD da armadura (cortosis, phrik), também não ignora esta.", pre("Des 13, Mandalorian Glory, proficiente na armadura", { abilities: { dex: 13 }, talents: ["mandalorian-glory"] })),
  t("Mandalorian Advance", "mandalorian-advance", "1/encontro, no seu turno, move até o seu deslocamento como ação livre antes de qualquer outra ação."),
  t("Mandalorian Ferocity", "mandalorian-ferocity", "Escolha um grupo de armas ou arma exótica: 1/encontro, ao fazer mais de um ataque na rodada, soma um dado de dano a cada acerto com ela. Repetível (outro grupo).", pre("Des 13, proficiente na arma", { abilities: { dex: 13 } }), { repeatable: true, choice: "weaponGroup" }),
  t("Mandalorian Glory", "mandalorian-glory", "1/encontro, ao reduzir um oponente a 0 PV, +5 no próximo ataque no mesmo encontro.")
);
tree("Force Item", "forceTalent");
push(
  t("Primitive Block", "primitive-block", "Reação: Use the Force contra o resultado de um ataque corpo a corpo para negá-lo com uma arma imbuída (Empower Weapon) em punho; −5 cumulativo por uso desde o seu último turno. Ponto da Força: protege um aliado adjacente. Vale contra ataques de área (metade do dano se acertar, nenhum se errar).", pre("Empower Weapon", T("empower-weapon"))),
  t("Force Throw", "force-throw", "Ação padrão: arremessa uma arma simples ou corpo a corpo avançada (do seu tamanho ou menor) como arma de arremesso proficiente, até 6 quadrados. Se cortante ou perfurante, fica cravada: +1 dado no fim de cada turno do alvo e ao ser retirada (ação rápida); recupera com move object.", pre("Empower Weapon", T("empower-weapon")))
);
tree("Gunslinger");
push(t("Mobile Attack (pistols)", "mobile-attack-pistols", "Logo após um ataque total com duas pistolas, move-se até o seu deslocamento como ação livre.", pre("Multiattack Proficiency (pistols), Dual Weapon Mastery I, Weapon Focus (pistols)", { talents: ["multiattack-proficiency-pistols"], feats: ["dual-weapon-mastery-i"] })));
tree("Duelist");
push(
  t("Improved Riposte", "improved-riposte", "1/turno, ao fazer um Riposte, o Block que o originou não conta para a penalidade cumulativa de Use the Force.", pre("Block, Riposte", T("block", "riposte"))),
  t("Improved Redirect", "improved-redirect", "1/turno, ao redirecionar um ataque com Redirect Shot, o Deflect que o originou não conta para a penalidade cumulativa.", pre("Deflect, Redirect Shot", T("deflect", "redirect-shot")))
);
tree("Jedi Battlemaster", "forceTalent");
push(
  t("Defensive Circle", "defensive-circle", "Ação rápida: você e os aliados afetados por Battle Meditation recebem +2 de intuição na Reflexos enquanto ela durar; +1 em Use the Force para Block e Deflect por aliado adjacente com sabre.", pre("Battle Meditation, Block ou Deflect, Jedi Battle Commander", { talents: ["battle-meditation", "jedi-battle-commander"] })),
  t("Force Revive", "force-revive", "Quando um aliado afetado pela sua Battle Meditation cai a 0 PV, gasta um Ponto da Força como reação para ele usar o second wind imediatamente.", pre("Battle Meditation, Jedi Battle Commander", T("battle-meditation", "jedi-battle-commander"))),
  t("Jedi Battle Commander", "jedi-battle-commander", "Sua Battle Meditation dá +2 de intuição nas jogadas de ataque (em vez de +1).", pre("Battle Meditation", T("battle-meditation"))),
  t("Slashing Charge", "slashing-charge", "1/encontro, durante uma investida, sem penalidade cumulativa nos Block; o bônus da investida vale em todos os Riposte (declarar antes do primeiro).", pre("Block, Riposte, Weapon Focus e Proficiency (lightsabers)", T("block", "riposte"))),
  t("Mobile Attack (lightsabers)", "mobile-attack-lightsabers", "Logo após um ataque total com dois sabres (ou as duas pontas de um duplo), move-se até o seu deslocamento como ação livre.", pre("Multiattack Proficiency (lightsabers), Dual Weapon Mastery I, Weapon Focus (lightsabers)", { talents: ["multiattack-proficiency-lightsabers"], feats: ["dual-weapon-mastery-i"] }))
);
tree("Jedi Shadow", "forceTalent");
push(
  t("Dark Deception", "dark-deception", "Quando alguém tenta senti-lo pela Força, pode agir como se seu Dark Side Score fosse igual à sua Sabedoria. Deception vira perícia de classe."),
  t("Improved Sentinel Strike", "improved-sentinel-strike", "Os dados de dano do Sentinel Strike passam a ser d8.", pre("Sentinel Strike", T("sentinel-strike"))),
  t("Improved Sentinel's Gambit", "improved-sentinels-gambit", "Usa Sentinel's Gambit vezes adicionais por encontro iguais a ½ nível de classe (mín. 1).", pre("Sentinel's Gambit", T("sentinels-gambit"))),
  t("Rebuke the Dark", "rebuke-the-dark", "Ao usar rebuke contra um poder [dark side], rola dois dados e fica com o melhor."),
  t("Taint of the Dark Side", "taint-of-the-dark-side", "Adicione um poder [dark side] ao seu conjunto; 1/encontro pode usá-lo sem aumentar o Dark Side Score.", pre("Dark Deception", T("dark-deception")))
);
tree("Jedi Watchman", "forceTalent");
push(
  t("Force Warning", "force-warning", "Aliados a até 12 quadrados podem rerrolar a Iniciativa no início do combate (ficam com o segundo). Se aliados estão surpresos e você não, escolha até mod. de Sabedoria (mín. 1) deles: não ficam surpresos."),
  t("Improved Quick Draw (lightsabers)", "improved-quick-draw-lightsabers", "Com um sabre na mão ou no cinto, saca, acende e faz um ataque na rodada surpresa mesmo surpreso; 1/turno saca e acende o sabre como ação livre.", pre("Quick Draw, Weapon Focus (lightsabers)", { feats: ["quick-draw"] })),
  t("Sheltering Stance", "sheltering-stance", "Adjacente a um aliado, usa Block ou Deflect em ataques contra ele sem gastar Ponto da Força.", pre("Block ou Deflect, Vigilance", { talents: ["vigilance"] })),
  t("Vigilance", "vigilance", "Ação rápida: designa um aliado adjacente; ele recebe +1 de deflexão na Reflexos enquanto você permanecer adjacente."),
  t("Watchman's Advance", "watchmans-advance", "Na rodada surpresa, você e os aliados que agem nela ganham uma ação de movimento extra (só uma, mesmo com vários Jedi com o talento).", pre("Force Warning", T("force-warning")))
);
tree("Sith", "forceTalent");
push(
  t("Affliction", "affliction", "Quando um poder da Força seu causa dano a um único oponente, ele sofre mais 2d6 de dano da Força no início do próximo turno dele."),
  t("Dark Healing Field", "dark-healing-field", "1/encontro, Ponto da Força: Use the Force contra a Fortitude de até 3 criaturas a até 12 quadrados; quem for atingido sofre 1d6 por nível de classe e você cura metade do total; quem não for atingido sofre metade.", pre("Dark Healing, Improved Dark Healing", T("dark-healing", "improved-dark-healing"))),
  t("Drain Force", "drain-force", "1/encontro, reação ao causar dano a um oponente sensível à Força: recupera um poder gasto e o alvo perde um Ponto da Força.", pre("Affliction", T("affliction"))),
  t("Sith Alchemy (KotOR)", "sith-alchemy-kotor", "<em>Create Sith Talisman</em>: Ponto da Força e rodada completa; enquanto carrega o talismã, +1d6 no dano de poderes da Força (recebe 1 Dark Side ao vesti-lo; um por vez; destruído, só outro em 24 h). <em>Create Sith Weapon</em>: Ponto da Força e 1 hora para dar a uma arma o modelo de arma alquímica Sith.", pre("Dark Side Adept, Dark Side Master", T("dark-side-adept", "dark-side-master")))
);
tree("Corporate Power");
push(
  t("Competitive Drive", "competitive-drive", "1/encontro, rerrola um teste de perícia de Sabedoria, Inteligência ou Carisma (exceto Use the Force), ficando com o melhor."),
  t("Competitive Edge", "competitive-edge", "Sem estarem surpresos, você e aliados iguais ao seu mod. de Carisma (mín. 1) designados no seu primeiro turno recebem Quick Draw até o fim do encontro."),
  t("Corporate Clout", "corporate-clout", "1/encontro, ação padrão: Persuasion contra a Vontade de um inimigo em linha de visão; igual ou maior: não ataca você no encontro; +5: não ataca você nem aliados e recua; +10: fica amistoso e passa a aliado controlado pelo Mestre. Medo, afeta a mente.", pre("Impose Hesitation, Wrong Decision", T("impose-hesitation", "wrong-decision"))),
  t("Impose Confusion", "impose-confusion", "A área de Impose Hesitation vira cone de 12 quadrados; 1/encontro, em vez do efeito normal, os alvos perdem a ação padrão no próximo turno.", pre("Impose Hesitation", T("impose-hesitation"))),
  t("Impose Hesitation", "impose-hesitation", "Ação padrão: Persuasion contra a Vontade de todos num cone de 6 quadrados; afetados perdem a ação rápida no próximo turno e não fazem ações de rodada completa. Afeta a mente."),
  t("Willful Resolve", "willful-resolve", "1/encontro, nega o efeito de uma jogada de ataque ou teste de perícia contra sua Vontade."),
  t("Wrong Decision", "wrong-decision", "Quem o ataca sofre −2 de moral na Vontade até o fim do seu próximo turno (não cumulativo).")
);
tree("Gladiatorial Combat");
push(
  t("Brutal Attack", "brutal-attack", "Escolha um grupo/arma exótica: ataques com ela que excedam o Limiar do alvo causam +1 dado de dano. Repetível (outro grupo).", pre("Weapon Focus na arma"), { repeatable: true, choice: "weaponGroup" }),
  t("Call Out", "call-out", "Com Personal Vendetta, designa um alvo que sofre −5 (em vez de −2) contra alvos que não sejam você.", pre("Personal Vendetta", T("personal-vendetta"))),
  t("Distracting Attack", "distracting-attack", "Ao ferir com ataque corpo a corpo ou à distância, se a jogada também superar a Vontade do alvo, ele sofre −2 na Reflexos até o fim do seu próximo turno.", pre("Brutal Attack com a arma usada", T("brutal-attack"))),
  t("Exotic Weapons Master", "exotic-weapons-master", "Trata todas as armas exóticas como um único grupo: feats de proficiência/foco numa arma exótica valem para todas.", pre("Proficiente em ao menos uma arma exótica")),
  t("Lockdown Strike", "lockdown-strike", "Ao acertar ataque de oportunidade num oponente em movimento (até um tamanho maior), o movimento dele termina."),
  t("Multiattack Proficiency (exotic weapons)", "multiattack-proficiency-exotic", "Ataques múltiplos com armas exóticas: −2 na penalidade (cumulativo ao repetir).", pre("Exotic Weapons Master", T("exotic-weapons-master")), { repeatable: true }),
  t("Personal Vendetta", "personal-vendetta", "Ação rápida: provoca inimigos a até 12 quadrados em linha de visão; no próximo turno deles, −2 nos ataques contra alvos que não sejam você. Afeta a mente."),
  t("Unstoppable", "unstoppable", "1/encontro, ao ser atingido por algo que o desceria na trilha, reduz o número de passos em 1.")
);
tree("Melee Duelist");
push(
  t("Advantageous Strike", "advantageous-strike", "+5 nos ataques de oportunidade com armas corpo a corpo em que é proficiente."),
  t("Dirty Tricks", "dirty-tricks", "Finta (Deception) como duas ações rápidas contra um oponente que você ameaça.", pre("Treinado em Deception", { trained: ["deception"] })),
  t("Dual Weapon Flourish I", "dual-weapon-flourish-i", "Com duas armas leves ou dois sabres, ao atacar com uma como ação padrão, faz um ataque com a outra como ação livre contra o mesmo alvo (penalidades normais de duas armas).", pre("Dual Weapon Mastery I, Weapon Finesse", { feats: ["dual-weapon-mastery-i", "weapon-finesse"] })),
  t("Dual Weapon Flourish II", "dual-weapon-flourish-ii", "Com duas armas leves ou dois sabres, faz um ataque total como ação padrão, atacando com as duas.", pre("Dual Weapon Mastery I e II, Dual Weapon Flourish I, Master of Elegance, Weapon Finesse", { feats: ["dual-weapon-mastery-i", "dual-weapon-mastery-ii", "weapon-finesse"], talents: ["dual-weapon-flourish-i", "master-of-elegance"] })),
  t("Master of Elegance", "master-of-elegance", "Soma o bônus de Destreza (em vez de Força) ao dano com arma corpo a corpo leve; com duas mãos, o dobro da Destreza.", pre("Dual Weapon Flourish I ou Single Weapon Flourish I, Weapon Finesse", { feats: ["weapon-finesse"] })),
  t("Multiattack Proficiency (advanced melee weapons)", "multiattack-proficiency-advanced-melee", "Ataques múltiplos com armas corpo a corpo avançadas: −2 na penalidade (cumulativo ao repetir).", {}, { repeatable: true }),
  t("Out of Nowhere", "out-of-nowhere", "1/encontro, ação livre no seu turno: após uma finta bem-sucedida, ataca com arma leve ou sabre.", pre("Treinado em Deception, Weapon Finesse", { trained: ["deception"], feats: ["weapon-finesse"] })),
  t("Single Weapon Flourish I", "single-weapon-flourish-i", "Com uma única arma leve ou sabre, num ataque total, move-se até o seu deslocamento como ação livre a qualquer momento do turno.", pre("Double Attack, Weapon Finesse", { feats: ["weapon-finesse"] })),
  t("Single Weapon Flourish II", "single-weapon-flourish-ii", "Com uma única arma leve ou sabre, faz um ataque total como ação padrão.", pre("Double Attack, Master of Elegance, Single Weapon Flourish I, Weapon Finesse", { feats: ["weapon-finesse"], talents: ["master-of-elegance", "single-weapon-flourish-i"] }))
);

export default out;
export const CLASS_TREES = { noble: ["Fencing"], scoundrel: ["Run and Gun"], soldier: ["Rocket Jumper"], "elite-trooper": ["Mandalorian Warrior"], "jedi-knight": ["Jedi Battlemaster", "Jedi Shadow", "Jedi Watchman"] };
