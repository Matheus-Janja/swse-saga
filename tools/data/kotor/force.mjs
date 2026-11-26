// Knights of the Old Republic Campaign Guide — Cap. 4: poderes, talentos, técnicas e tradições da Força. Efeitos resumidos.
// (O talento Illusion, da árvore Alter, já vem do Jedi Academy Training Manual.)
const SRC = "Knights of the Old Republic Campaign Guide";
const fp = (name, key, o) => ({
  name, type: "forcePower", img: o.img ?? "icons/magic/lightning/bolt-strike-blue.webp",
  system: { key, descriptors: [], time: "", target: "", defense: "", dcs: [], special: "", uses: 1, spent: 0, damage: "", source: SRC, ...o, description: `<p>${o.description}</p>` },
  folder: "Poderes da Força"
});
const dc = (n, text) => ({ dc: n, text });
const MAINTAIN = "Pode manter o poder de rodada a rodada (novo teste a cada rodada); se sofrer dano, Use the Force CD 15 + dano para continuar.";
const SIZE = "O alvo soma à Fortitude o modificador de tamanho: Colossal +50, Gargantuan +20, Huge +10, Large +5.";

export const powers = [
  fp("Energy Resistance", "energy-resistance", { time: "Ação padrão", target: "Você", description: "Você se protege de energia, som, fogo, frio e eletricidade.",
    dcs: [dc(20, "RD 5 contra dano de energia até o início do seu próximo turno."), dc(25, "RD 10."), dc(30, "RD 15."), dc(35, "RD 20.")], special: `Ponto da Força: usa como ação rápida. Manter é ação rápida. ${MAINTAIN}` }),
  fp("Fear", "fear", { descriptors: ["darkSide", "mindAffecting"], time: "Ação rápida", target: "Uma criatura a até 12 quadrados em linha de visão", defense: "will", description: "Você infunde medo no inimigo com o poder do lado sombrio.",
    dcs: [dc(15, "O alvo só pode fazer uma ação padrão no próximo turno."), dc(20, "Só uma ação de movimento."), dc(25, "Só uma ação rápida."), dc(30, "Nenhuma ação no próximo turno.")], special: "Precisa igualar ou superar a Vontade. Medo. Ponto da Força: −2 em todas as Defesas do oponente até o início do seu próximo turno." }),
  fp("Force Scream", "force-scream", { descriptors: ["darkSide"], time: "Ação padrão", target: "Todas as criaturas a até 12 quadrados que o ouçam", defense: "fortitude", damage: "tier", description: "Um grito sônico amplificado pela Força.",
    dcs: [dc(15, "1d6 de dano da Força e Limiar −5 até o fim do seu próximo turno."), dc(20, "2d6."), dc(25, "3d6."), dc(30, "4d6.")], special: `${SIZE} Ponto da Força: Limiar −10 em vez de −5.` }),
  fp("Force Whirlwind", "force-whirlwind", { descriptors: ["telekinetic"], time: "Ação padrão", target: "Uma criatura ou droide a até 12 quadrados em linha de visão", defense: "fortitude", damage: "tier", description: "Um redemoinho de Força ergue e golpeia o inimigo.",
    dcs: [dc(15, "Preso e imobilizado até o início do seu próximo turno (−5 em ataques e perícias; cai derrubado no fim); 1d6 de dano da Força no fim do seu turno."), dc(20, "2d6."), dc(25, "3d6."), dc(30, "4d6.")],
    special: `${SIZE} Ponto da Força: penalidade −10. Manter é ação de movimento. ${MAINTAIN} Se o alvo for atacado, ferido ou descer na trilha, o efeito termina.` }),
  fp("Ionize", "ionize", { time: "Ação padrão", target: "Um alvo a até 6 quadrados em linha de visão", defense: "reflex", damage: "tier", description: "Você sobrecarrega sistemas eletrônicos e droides.",
    dcs: [dc(20, "4d6 de dano iônico."), dc(25, "5d6."), dc(30, "6d6.")], special: "Precisa igualar ou superar a Reflexos. Ponto da Força: +2d6 de dano iônico." }),
  fp("Kinetic Combat", "kinetic-combat", { descriptors: ["telekinetic"], time: "Ação padrão", target: "Você", description: "Você manipula telecineticamente sua arma, que luta sozinha.",
    dcs: [dc(20, "Move uma arma corpo a corpo de uma mão até 12 quadrados e ataca com ela (BBA + mod. de Carisma; dano normal com ½ nível heroico e Carisma no lugar da Força). A arma ameaça os quadrados adjacentes e faz ataques de oportunidade.")],
    special: `Manter é ação rápida; com ação padrão a cada rodada, move a arma até 6 quadrados e faz um ataque. ${MAINTAIN} Ponto da Força: +1 nos ataques com a arma.` }),
  fp("Resist Force", "resist-force", { time: "Ação padrão", target: "Você", description: "Você se protege dos poderes da Força inimigos.",
    dcs: [dc(15, "+1 numa Defesa à escolha contra poderes da Força até o início do seu próximo turno."), dc(20, "+2."), dc(25, "+5.")], special: `Ponto da Força: o bônus vale em duas Defesas. Manter é ação rápida; pode ter várias instâncias ativas. ${MAINTAIN}` }),
  fp("Slow", "slow", { descriptors: ["telekinetic"], time: "Ação padrão", target: "Uma criatura ou droide a até 12 quadrados em linha de visão", defense: "fortitude", description: "Você deixa o alvo lento como se estivesse sobrecarregado.",
    dcs: [dc(15, "Deslocamento −1 quadrado até o início do seu próximo turno e fica sobrecarregado (−10 em Acrobatics, Climb, Endurance, Initiative, Jump, Stealth e Swim)."), dc(20, "−2 quadrados."), dc(25, "−3 quadrados."), dc(30, "−4 quadrados.")], special: `${SIZE} Ponto da Força: −5 na Fortitude do alvo contra este poder.` }),
  fp("Valor", "valor", { descriptors: ["lightSide"], time: "Ação padrão", target: "Um aliado a até 12 quadrados em linha de visão", description: "Você compartilha a força da Força com um aliado.",
    dcs: [dc(15, "+1 na Vontade contra efeitos que afetam a mente e de medo até o início do seu próximo turno."), dc(20, "+2."), dc(25, "+5."), dc(30, "+10.")], special: `Ponto da Força: o bônus vale contra todos os efeitos que miram a Vontade. Manter é ação rápida. ${MAINTAIN}` }),
  fp("Wound", "wound", { descriptors: ["darkSide"], time: "Ação padrão", target: "Uma criatura a até 6 quadrados em linha de visão", defense: "fortitude", damage: "4d6", description: "Espasmos dolorosos nos pulmões do alvo.",
    special: `Se igualar ou superar a Fortitude, 4d6 de dano da Força. ${SIZE} Se o alvo descer na trilha, a condição fica persistente até cirurgia (Treat Injury CD 20). Ponto da Força: +2d6.` })
];

/* ---------------- Talentos, técnicas, tradições ---------------- */
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
const IMG = { forceTalent: "icons/magic/control/silhouette-aura-energy.webp", forceTechnique: "icons/magic/perception/eye-ringed-glow-angry-small-teal.webp" };
let TREE = "";
let CAT = "forceTalent";
const tree = (n, c = "forceTalent") => { TREE = n; CAT = c; };
const t = (name, key, text, pre = {}) => ({
  name, type: "talent", img: IMG[CAT],
  system: { key, tree: TREE, category: CAT, classes: [], source: SRC, description: `<p>${text}</p>`, prerequisites: P(pre), choice: { type: "", value: "", options: [] }, repeatable: false, modifiers: [], rerolls: [] }
});
const pre = (text, o = {}) => ({ text, ...o });
const out = [];
const push = (...x) => out.push(...x);
const UTF = { trained: ["useTheForce"] };

tree("Alter");
push(
  t("Force Flow", "force-flow", "Sempre que tirar 1 natural num ataque ou teste de Use the Force, ganha um Ponto da Força temporário (perdido no fim do encontro)."),
  t("Telepathic Link", "telepathic-link", "Ação rápida: liga-se telepaticamente a um aliado sensível à Força que concorde (até 1 km). 1/encontro, usa um poder do conjunto dele (com permissão) ou deixa que ele use um seu. Um elo por vez.", pre("Treinado em Use the Force", UTF)),
  t("Telepathic Influence", "telepathic-influence", "Ao tirar 20 natural num ataque ou Use the Force, em vez de recuperar os poderes pode dar um Ponto da Força temporário a um aliado a até 12 quadrados.", pre("Telepathic Link, treinado em Use the Force", { talents: ["telepathic-link"], trained: ["useTheForce"] }))
);
tree("Control");
push(
  t("Beast Trick", "beast-trick", "Pode usar mind trick em criaturas de Inteligência 2 ou menos (só ordens que elas consigam entender)."),
  t("Force Suppression", "force-suppression", "Ao falhar em negar um poder com rebuke, ainda reduz o efeito do poder inimigo em um degrau de CD (só poderes com efeitos variáveis).", pre("rebuke", { forcePowers: ["rebuke"] }))
);
tree("Force Techniques", "forceTechnique");
push(
  t("Dominate Mind", "dominate-mind", "Com mind trick, se superar a Vontade do alvo por 10 ou mais, escolhe o que ele faz com a ação padrão no próximo turno.", pre("mind trick", { forcePowers: ["mind-trick"] })),
  t("Improved Energy Resistance", "improved-energy-resistance", "Pode aplicar energy resistance a um aliado a até 6 quadrados em vez de em você.", pre("energy resistance", { forcePowers: ["energy-resistance"] })),
  t("Improved Force Stun", "improved-force-stun", "Um Force stun bem-sucedido também imobiliza o alvo por uma rodada.", pre("Force stun", { forcePowers: ["force-stun"] })),
  t("Improved Force Slam", "improved-force-slam", "Pode usar Force slam como rodada completa num raio de 2 quadrados a partir do seu quadrado; Ponto da Força: raio de 4.", pre("Force slam", { forcePowers: ["force-slam"] })),
  t("Improved Ionize", "improved-ionize", "Ponto da Força: o alvo de ionize sofre o dano iônico completo (sem dividir após comparar com o Limiar).", pre("ionize", { forcePowers: ["ionize"] })),
  t("Improved Kinetic Combat", "improved-kinetic-combat", "Maneja até três armas ao mesmo tempo com kinetic combat (mover e atacar com uma ainda é ação padrão).", pre("kinetic combat", { forcePowers: ["kinetic-combat"] })),
  t("Improved Resist Force", "improved-resist-force", "Pode aplicar resist Force a um aliado a até 6 quadrados em vez de em você.", pre("resist Force", { forcePowers: ["resist-force"] })),
  t("Improved Valor", "improved-valor", "Quando ativa valor, você também recebe os benefícios.", pre("valor", { forcePowers: ["valor"] })),
  t("Improved Vital Transfer", "improved-vital-transfer", "Pode usar vital transfer num alvo a até 6 quadrados em linha de visão.", pre("vital transfer", { forcePowers: ["vital-transfer"] })),
  t("Language Absorption", "language-absorption", "Com telepatia, aprende à força um idioma de outra criatura (involuntária: Use the Force contra a Vontade) e o fala por 24 horas.")
);

/* Tradições */
tree("Jal Shey");
push(
  t("Force Delay", "force-delay", "1/encontro, reação: Persuasion contra a Vontade de um alvo (Int 3+) que o entenda; se vencer, ele perde a ação de movimento no próximo turno (com Ponto da Força, a ação padrão).", pre("Treinado em Persuasion", { trained: ["persuasion"] })),
  t("Action Exchange", "action-exchange", "Ao usar Force Delay com sucesso, um aliado a até 6 quadrados pode trocar uma ação de movimento por uma ação padrão no próximo turno dele.", pre("Force Delay", { talents: ["force-delay"] })),
  t("Imbue Item", "imbue-item", "Ponto da Força e rodada completa: imbui uma arma, armadura ou roupa feita para isso. Quem a usa pode, com rodada completa, guardar nela um Ponto da Força e depois gastá-lo com ação rápida (até 2 por rodada). Um item por dia; o portador só pode ter um item sintonizado."),
  t("Knowledge of the Force", "knowledge-of-the-force", "Reação, Ponto da Força: ajuda (aid another) o teste de Use the Force de um aliado.")
);
tree("Keetael");
push(
  t("Conceal Force Use", "conceal-force-use", "Ao fazer Use the Force, ação rápida: Deception para disfarçar o uso da Força."),
  t("Force Direction", "force-direction", "Ao gastar Ponto da Força num ataque à distância, soma +3 (+4 se rolar d8) em vez de rolar o dado."),
  t("Force Momentum", "force-momentum", "Ao gastar Ponto da Força num ataque corpo a corpo que acerta, também soma o resultado do Ponto ao dano."),
  t("Past Visions", "past-visions", "Usando farseeing para ver o passado, a CD cai à metade e vê tudo a até 6 quadrados do alvo sem gastar Ponto da Força.", pre("Visions", { talents: ["visions"] }))
);
tree("The Krath");
push(
  t("Dark Side Manipulation", "dark-side-manipulation", "1/encontro, ao gastar um Ponto da Força num ato que dá um Dark Side point, trata o dado do Ponto da Força como resultado máximo."),
  t("Krath Illusions", "krath-illusions", "Ação rápida: reduz à metade (mín. −1) a penalidade de ilusões grandes.", pre("Illusion", { talents: ["illusion"] })),
  t("Krath Intuition", "krath-intuition", "1/encontro, Ponto da Força: o dano de uma arma alquímica Sith conta como o máximo dos dados."),
  t("Krath Surge", "krath-surge", "1/encontro, ação rápida: um uso de poder ganha +1 dado de dano ou +6 quadrados de alcance; o poder passa a ter o descritor [dark side].")
);
tree("Luka Sene");
push(
  t("Field Detection", "field-detection", "Ação rápida, Use the Force CD 15: detecta campos eletromagnéticos e de energia a até 12 quadrados (presença, força, origem, tipo de aparelho). Contra quem tem escudo, reduz o SR do alvo em 5 contra seus ataques até o fim do seu próximo turno.", pre("Treinado em Use the Force", UTF)),
  t("Improved Force Sight", "improved-force-sight", "Usa a aplicação Search de Perception como ação rápida e sempre tem sucesso em Sense Surroundings (sem rolar).", pre("Traço Force Sight, treinado em Use the Force", UTF)),
  t("Luka Sene Master", "luka-sene-master", "1/encontro, ganha um Ponto da Força temporário para usar ao ativar talento de Sense ou Luka Sene, farseeing ou Search Your Feelings/Sense Force.", pre("Field Detection, farseeing", { talents: ["field-detection"], forcePowers: ["farseeing"] })),
  t("Quickseeing", "quickseeing", "Ação livre no seu turno: gasta um uso de farseeing e faz Use the Force contra a Vontade de um ser vivo a até 12 quadrados; se vencer, +2 de intuição nos ataques contra ele até o fim do seu turno.", pre("Treinado em Use the Force, farseeing", { trained: ["useTheForce"], forcePowers: ["farseeing"] }))
);
tree("Order of Shasa");
push(
  t("Deception Awareness", "deception-awareness", "+5 na Vontade contra Deception; usa Use the Force no lugar de Perception para perceber enganos e influência (conta como treinado; rerrolagens de Perception valem)."),
  t("Greater Weapon Focus (Fira)", "greater-weapon-focus-fira", "+1 nos ataques corpo a corpo com fira (acumula com Weapon Focus).", pre("Weapon Focus (fira)")),
  t("Progenitor's Call", "progenitors-call", "1/encontro, Use the Force contra a Vontade de um inimigo: ele desce −1 passo persistente e perde a ação padrão no próximo turno (Treat Injury CD 15 ou 8 h de descanso). Afeta a mente."),
  t("Waveform", "waveform", "Ação rápida ao usar um poder telecinético: soma o mod. de Carisma (mín. +1) ao dano.")
);

export const talents = out;
