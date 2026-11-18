// Galaxy at War — talentos novos (Cap. 1: classes base, classes de prestígio e Martial Arts Master). Textos resumidos.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, ...o
});
const ICON = "icons/magic/symbols/star-yellow.webp";
let TREE = "";
const tree = name => { TREE = name; };
const t = (name, key, text, pre = {}, o = {}) => ({
  name, type: "talent", img: ICON,
  system: {
    key, tree: o.tree ?? TREE, category: "talent", classes: [], source: "Galaxy at War",
    description: `<p>${text}</p>`, prerequisites: P(pre),
    choice: { type: o.choice ?? "", value: o.value ?? "", options: [] },
    repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], rerolls: o.rerolls ?? []
  }
});
const pre = (text, o = {}) => ({ text, ...o });
const out = [];
const push = (...x) => out.push(...x);
const LIGHT = "Só com armadura leve ou sem armadura.";

/* ---------------- JEDI ---------------- */
tree("Jedi Guardian");
push(t("Cover Escape", "cover-escape", "Quando gasta um Ponto da Força para negar, com Block ou Deflect, um ataque corpo a corpo contra um aliado adjacente, esse aliado pode mover 2 quadrados (ação livre, sem provocar ataques de oportunidade).", pre("Block ou Deflect", { talentsAny: ["block", "deflect"] })));
tree("Jedi Sentinel");
push(t("Prime Targets", "prime-targets", "Ao acertar com sabre de luz um alvo que não foi atacado por você desde o fim do seu último turno, causa +1 dado de dano. (Opção no diálogo de ataque.)"));

/* ---------------- NOBRE ---------------- */
tree("Anticipation");
push(
  t("Anticipate Movement", "anticipate-movement", "1/rodada, reação: quando um inimigo na sua linha de visão se move, um aliado na sua linha de visão pode mover até o próprio deslocamento (ação livre)."),
  t("Forewarn Allies", "forewarn-allies", "Aliados a até 12 quadrados recebem +2 de intuição nas jogadas de ataque e de dano dos ataques de oportunidade."),
  t("Get Down", "get-down", "Reação: quando um aliado é alvo de um ataque à distância, ele pode se jogar no chão (ação livre). (Botão: deixa os aliados marcados caídos.)"),
  t("Heavy Fire Zone", "heavy-fire-zone", "1/turno, ação rápida: escolha uma área 3×3 na linha de visão; até o fim do seu próximo turno, um inimigo que entrar nela provoca um ataque de oportunidade de um aliado armado (conta no limite do aliado).", pre("Forewarn Allies", { talents: ["forewarn-allies"] })),
  t("Summon Aid", "summon-aid", "1/rodada, reação: quando um inimigo se move para um quadrado adjacente a você, um aliado na linha de visão pode fazer uma investida contra ele.", pre("Get Down", { talents: ["get-down"] }))
);
tree("Leadership");
push(
  t("Commanding Presence", "commanding-presence", "Cada opção 1/encontro, ação padrão (um ataque): Hold the Line! — se acertar, aliados a até 6 quadrados recebem +2 de moral nas Defesas até o fim do seu próximo turno; Lead the Assault — se acertar, aliados a até 6 quadrados recebem +2 de moral em ataque e dano até o fim do seu próximo turno; Turn the Tide — se causar dano, um número de aliados igual ao seu mod. de Carisma (mín. 1) move metade do deslocamento (ação livre). (Botão: aplica nos aliados marcados.)", pre("Born Leader, Tactical Savvy", { talents: ["born-leader", "tactical-savvy"] })),
  t("Tactical Savvy", "tactical-savvy", "Quando um aliado que você pode ver gasta um Ponto da Força num ataque, ele soma o seu modificador de Inteligência ao resultado do Ponto da Força.", pre("Born Leader", { talents: ["born-leader"] }))
);

/* ---------------- SCOUNDREL ---------------- */
tree("Brigand");
push(
  t("Cheap Trick", "cheap-trick", "Ao fintar (Deception) um inimigo a até 6 quadrados, rola dois dados e fica com o melhor.", pre("Treinado em Deception", { trained: ["deception"] })),
  t("Easy Prey", "easy-prey", "Ao acertar um ataque padrão, pode reduzir o dano à metade: o alvo fica sem Destreza contra os seus ataques até o fim do seu próximo turno. (Botão: marca os alvos como surpresos por 1 rodada.)", pre("Cheap Trick", { talents: ["cheap-trick"] })),
  t("Quick Strike", "quick-strike", "Na primeira rodada de combate, ao causar dano a um inimigo que ainda não agiu, faz imediatamente um ataque livre contra outro alvo a até 6 quadrados.", pre("Cheap Trick", { talents: ["cheap-trick"] })),
  t("Sly Combatant", "sly-combatant", "Cada opção 1/encontro, ação padrão (um ataque): Distracting Injury — se acertar, o alvo sofre −2 em ataque e dano até o fim do encontro; Make Them Bleed — se ferir um alvo vivo, ele recebe uma condição persistente (exige cirurgia, Treat Injury CD 25); Strength in Numbers — contra inimigo adjacente a aliados, se acertar, +2 de dano por aliado adjacente a ele. (Botão: aplica nos alvos marcados.)", pre("Cheap Trick, Easy Prey", { talents: ["cheap-trick", "easy-prey"] }))
);
tree("Misfortune");
push(
  t("Backstabber", "backstabber", "Ao flanquear, trata o alvo como surpreso para um ataque por turno (Sneak Attack se aplica). (Automático com a opção Flanqueando.)", pre("Sneak Attack", { talents: ["sneak-attack"] })),
  t("Improved Sneak Attack", "improved-sneak-attack", "Sneak Attack funciona contra alvos a até 12 quadrados (em vez de 6).", pre("Point Blank Shot, Sneak Attack", { feats: ["point-blank-shot"], talents: ["sneak-attack"] }))
);

/* ---------------- SCOUT ---------------- */
tree("Camouflage");
push(
  t("Dig In", "dig-in", "Caído, ação rápida: recebe camuflagem até o início do seu próximo turno; perde-a se levantar ou se mover. (Botão.)"),
  t("Ghost Assailant", "ghost-assailant", "Se começa o turno com camuflagem total ou cobertura total contra um alvo, ação rápida: Stealth contra a Perception dele; se vencer, ele fica surpreso contra você até o fim do turno. (Botão.)"),
  t("Slip By", "slip-by", "Quando se mover para fora de um quadrado ameaçado provocaria ataque de oportunidade, pode usar o resultado de Stealth no lugar da Defesa de Reflexos, se for maior.")
);
tree("Advance Patrol");
push(
  t("Forward Patrol", "forward-patrol", "Numa rodada de surpresa em que não esteja surpreso, um aliado a até 6 quadrados mantém o bônus de Destreza na Reflexos.", pre("Watchful Step", { talents: ["watchful-step"] })),
  t("Mobile Combatant", "mobile-combatant", "Cada opção 1/encontro: Evasive Assault (ataque padrão; se causar dano, +5 de esquiva na Reflexos até o fim do próximo turno); Expeditious Attack (após atacar, move metade do deslocamento sem provocar); Yielding Assault (reação ao ser ferido: move metade do deslocamento sem provocar e tem circunstância favorável no primeiro ataque contra esse inimigo no próximo turno). (Botão.)", pre("Forward Patrol, Watchful Step", { talents: ["forward-patrol", "watchful-step"] })),
  t("Trailblazer", "trailblazer", "Ação rápida: aliados a até 6 quadrados tratam o primeiro quadrado de terreno difícil em que entrarem como terreno normal.", pre("Treinado em Survival", { trained: ["survival"] })),
  t("Watchful Step", "watchful-step", "Usa o modificador de Perception no lugar do de Initiative, se for maior. (Automático.)", pre("Treinado em Initiative", { trained: ["initiative"] }))
);

/* ---------------- SOLDIER ---------------- */
tree("Commando");
push(t("Defensive Position", "defensive-position", "Com cobertura, gastando duas ações rápidas, passa a ter cobertura aprimorada até o início do seu próximo turno. (Botão.)", pre("Battle Analysis", { talents: ["battle-analysis"] })));
tree("Weapon Specialist");
push(t("Autofire Assault", "autofire-assault", "Pode apoiar (brace) qualquer arma de fogo automático, não só as que são somente automáticas. (Automático.)", pre("Weapon Proficiency (heavy weapons)", { feats: ["weapon-proficiency-heavy"] })));
tree("Shockboxer");
push(
  t("Defensive Jab", "defensive-jab", "Ao lutar defensivamente com ataques desarmados, faz um ataque desarmado livre contra um inimigo adjacente.", pre("Retaliation Jab", { talents: ["retaliation-jab"] })),
  t("Nimble Dodge", "nimble-dodge", "Quando um inimigo erra você com ataque corpo a corpo, reação: move 2 quadrados, terminando adjacente a ele."),
  t("Retaliation Jab", "retaliation-jab", "Quando um inimigo ao seu alcance erra você com ataque corpo a corpo, ele sofre automaticamente dano igual ao seu mod. de Força (mín. 1)."),
  t("Stinging Jab", "stinging-jab", "Ao acertar um ataque desarmado, pode reduzir o dano à metade: o inimigo causa só metade do dano com ataques corpo a corpo até o fim do seu próximo turno."),
  t("Stunning Shockboxer", "stunning-shockboxer", "Com dano desarmado de atordoamento, depois de dividir o dano soma mais um dado de dano.", pre("Stinging Jab", { talents: ["stinging-jab"] }))
);
tree("Veteran");
push(
  t("Battlefield Remedy", "battlefield-remedy", "Quando presta primeiros socorros (First Aid), o paciente também sobe +1 passo na trilha de condição.", pre("Treinado em Treat Injury", { trained: ["treatInjury"] })),
  t("Grizzled Warrior", "grizzled-warrior", "Cada opção 1/encontro, ação padrão: Defy the Odds (ataque e recebe PV temporários iguais ao valor de Constituição); Double the Pain (ajudar outro a um aliado a até 6 quadrados: +½ do seu nível no dano dele); Guarded Assault (ataque e +2 de esquiva na Reflexos até o início do próximo turno). (Botão.)", pre("Seen It All, Tested in Battle", { talents: ["seen-it-all", "tested-in-battle"] })),
  t("Reckless", "reckless", "Ao acertar uma investida, soma o bônus de Sabedoria (mín. +1) ao dano. (Automático com a opção Investida.)", pre("Tested in Battle", { talents: ["tested-in-battle"] })),
  t("Seen It All", "seen-it-all", "Quem usa efeitos de medo contra você rola duas vezes e fica com o pior resultado.", pre("Tested in Battle, treinado em Initiative", { talents: ["tested-in-battle"], trained: ["initiative"] })),
  t("Tested in Battle", "tested-in-battle", "Ao usar o second wind, também sobe +2 passos na trilha de condição. (Automático.)")
);

/* ---------------- PRESTÍGIO ---------------- */
tree("Weapon Master");
push(t("Ferocious Assault", "ferocious-assault", "1/encontro, faz um ataque de fogo automático num cone de 6 quadrados; gasta 20 tiros.", pre("BBA +12, Controlled Burst", { bab: 12, talents: ["controlled-burst"] })));
tree("Squad Leader");
const SQUAD = "Esquadrão: você e personagens de nível até o seu nível de elite trooper, em número igual ao mod. de Carisma (mín. 1), que você possa ver e com quem se comunique; designe-os (ação livre) no início do seu primeiro turno.";
push(
  t("Fall Back", "fall-back", `Ação de movimento: cada membro do esquadrão move 2 quadrados sem provocar ataques de oportunidade. ${SQUAD}`, pre("Car 13", { abilities: { cha: 13 } })),
  t("Form Up", "form-up", `Ação de movimento: membros do esquadrão a até 6 quadrados de outro membro recebem +2 de moral na Reflexos até o fim do seu próximo turno. (Botão: você e aliados marcados.) ${SQUAD}`, pre("Car 13", { abilities: { cha: 13 } })),
  t("Full Advance", "full-advance", `Ação de movimento: o esquadrão recebe +2 de moral no dano até o fim do seu próximo turno. (Botão.) ${SQUAD}`, pre("Car 13", { abilities: { cha: 13 } })),
  t("Hold Steady", "hold-steady", `1/encontro, ação padrão: todo o esquadrão sobe +1 passo na trilha de condição. (Botão.) ${SQUAD}`, pre("Car 13", { abilities: { cha: 13 } })),
  t("Search and Destroy", "search-and-destroy", `Ação de movimento: o esquadrão recebe +2 de moral em Perception até o fim do seu próximo turno. (Botão.) ${SQUAD}`, pre("Car 13", { abilities: { cha: 13 } }))
);
tree("Gunslinger");
push(t("Keep Them Honest", "keep-them-honest", "Ao usar ajudar outro para suprimir um inimigo, ele sofre −5 em todos os ataques até o fim do seu próximo turno (em vez de −2 contra um aliado). (Botão.)", pre("Careful Shot", { feats: ["careful-shot"] })));
tree("Sharpshooter");
push(
  t("Bullseye", "bullseye", "1/encontro, ao mirar num alvo fora do alcance à queima-roupa, ele perde o bônus de Destreza na Reflexos contra esse ataque. (Opção no diálogo.)", pre("Draw a Bead, Precision Shot, Sniper", { talents: ["draw-a-bead", "precision-shot"], feats: ["sniper"] })),
  t("Draw a Bead", "draw-a-bead", "1/rodada, ação rápida: designe um inimigo fora do alcance à queima-roupa; seus ataques à distância contra ele causam +bônus de Destreza (mín. +1) de dano enquanto estiver consciente e em linha de visão. Um inimigo por vez. (Opção no diálogo.)", pre("Precision Shot, BBA +10", { talents: ["precision-shot"], bab: 10 })),
  t("Harrying Shot", "harrying-shot", "Ao acertar e ferir um alvo em que mirou, ele não pode usar a ação padrão para atacar no próximo turno (efeito atordoante).", pre("Pinning Shot, Precision Shot", { talents: ["pinning-shot", "precision-shot"] })),
  t("Pinning Shot", "pinning-shot", "Ao ferir um alvo em que mirou, o deslocamento dele cai para 2 quadrados e ele não pode correr nem mover-se duas vezes até o fim do próximo turno (efeito atordoante).", pre("Precision Shot", { talents: ["precision-shot"] })),
  t("Precision Shot", "precision-shot", "Ao mirar, recebe o benefício de Point Blank Shot em qualquer alcance. (Automático.)", pre("Far Shot", { feats: ["far-shot"] }))
);

/* ---------------- MARTIAL ARTS MASTER ---------------- */
tree("Martial Arts Forms");
push(
  t("Echani Expertise", "echani-expertise", "Ataques desarmados têm crítico em 19–20 (o 19 não é acerto automático). (Automático.)", pre("BBA +10, Echani Training", { bab: 10, feats: ["echani-training"] })),
  t("Hijkata Expertise", "hijkata-expertise", "Ao causar dano desarmado, o alvo sofre penalidade igual ao seu bônus de Força no próximo ataque. (O efeito vai junto do botão de dano.)", pre("Hijkata Training", { feats: ["hijkata-training"] })),
  t("K'tara Expertise", "ktara-expertise", "1/turno, ao causar dano desarmado, faz uma tentativa de desarmar como ação rápida, sem a penalidade de −5 contra armas de duas mãos.", pre("K'tara Training", { feats: ["ktara-training"] })),
  t("K'thri Expertise", "kthri-expertise", `Um inimigo que comece o turno adjacente a você sofre dano igual ao seu mod. de Força (mín. 1), se você puder fazer ataques de oportunidade contra ele. ${LIGHT}`, pre("K'thri Training", { feats: ["kthri-training"] })),
  t("Stava Expertise", "stava-expertise", `Inimigos agarrados por você precisam vencer um teste resistido de agarrar para escapar; você pode rerrolar o teste para iniciar o agarrão, ficando com o segundo. ${LIGHT}`, pre("Stava Training", { feats: ["stava-training"] })),
  t("Tae-Jitsu Expertise", "tae-jitsu-expertise", "1/turno, ao causar dano desarmado, se o resultado do ataque igualar ou superar o Limiar de Dano do alvo, ele desce −1 passo na trilha de condição.", pre("Tae-Jitsu Training", { feats: ["tae-jitsu-training"] })),
  t("Wrruushi Expertise", "wrruushi-expertise", `1/turno, ao causar dano desarmado, ataque livre contra a Fortitude; se acertar, o alvo só pode fazer uma ação rápida no próximo turno. ${LIGHT}`, pre("Wrruushi Training", { feats: ["wrruushi-training"] }))
);
tree("Unarmed Mastery");
push(
  t("Flurry of Blows", "flurry-of-blows", "Reduz em 2 a penalidade de ataques múltiplos desarmados (ataque total). Repetível. (Automático.)", {}, { repeatable: true }),
  t("Hardened Strike", "hardened-strike", "Ao causar dano desarmado a um alvo com Redução de Dano, a RD dele cai 1 até o fim do encontro (não acumula pelo mesmo ataque)."),
  t("Punishing Strike", "punishing-strike", `1/turno, ao fazer um crítico desarmado, faz imediatamente outro ataque desarmado contra um alvo ao alcance. ${LIGHT}`)
);

export default out;

/** Árvores novas por classe (Galaxy at War). */
export const CLASS_TREES = {
  noble: ["Anticipation"],
  scoundrel: ["Brigand"],
  scout: ["Advance Patrol"],
  soldier: ["Shockboxer", "Veteran"],
  "elite-trooper": ["Squad Leader"],
  gunslinger: ["Sharpshooter"]
};
