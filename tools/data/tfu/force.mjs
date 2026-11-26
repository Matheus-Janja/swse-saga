// The Force Unleashed Campaign Guide — Cap. 5: poderes, talentos, técnicas, segredos, tradições e Force Unleashed. Efeitos resumidos.
// (Force storm, kinetic combat, Illusion e Improved Force Storm já vêm de outros livros.)
const SRC = "The Force Unleashed Campaign Guide";
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
const fp = (name, key, o) => ({
  name, type: "forcePower", img: o.img ?? "icons/magic/lightning/bolt-strike-blue.webp",
  system: { key, descriptors: [], time: "", target: "", defense: "", dcs: [], special: "", uses: 1, spent: 0, damage: "", source: SRC, ...o, description: `<p>${o.description}</p>` },
  folder: "Poderes da Força"
});
const dc = (n, text) => ({ dc: n, text });
const SIZE_STR = "O alvo soma ao teste de Força o BBA e o modificador de tamanho (Colossal +20, Gargantuan +15, Huge +10, Large +5, Small −5, Tiny −10, Diminutive −15, Fine −20) e +5 de estabilidade se tiver mais de duas pernas ou for excepcionalmente estável.";

export const powers = [
  fp("Corruption", "corruption", { descriptors: ["darkSide"], time: "Ação padrão", target: "Um alvo a até 12 quadrados em linha de visão", defense: "fortitude", damage: "tier", img: "icons/magic/unholy/orb-glowing-purple.webp",
    description: "Você lança um jato de pura vileza do lado sombrio contra o inimigo.",
    dcs: [dc(15, "2d6 de dano da Força agora e de novo no início do turno do alvo; se o teste também igualar ou superar a Fortitude, metade desse dano de novo na rodada seguinte."), dc(20, "3d6."), dc(25, "4d6."), dc(30, "5d6.")],
    special: "O alvo soma à Fortitude o modificador de tamanho (Colossal +50, Gargantuan +20, Huge +10, Large +5). Ponto da Força ao causar dano: criaturas adjacentes ao alvo também sofrem metade desse dano se o teste superar a Fortitude delas (sem dano adicional na rodada seguinte)." }),
  fp("Force Blast", "force-blast", { time: "Ação padrão", target: "Um inimigo a até 12 quadrados em linha de visão", defense: "reflex", damage: "tier", img: "icons/magic/air/wind-swirl-gray-blue.webp",
    description: "Você arremessa uma bola de ar comprimido e detritos contra o inimigo.",
    dcs: [dc(15, "2d6 de dano."), dc(20, "3d6."), dc(25, "4d6."), dc(30, "5d6.")],
    special: "Precisa superar a Reflexos. Ponto da Força: soma o nível heroico como bônus de dano, como numa arma comum." }),
  fp("Force Shield", "force-shield", { descriptors: ["telekinetic"], time: "Reação", target: "Você", img: "icons/magic/defensive/shield-barrier-glowing-blue.webp",
    description: "Uma bolha de energia telecinética o protege.",
    dcs: [dc(15, "Escudo (SR) 5 até o início do seu próximo turno."), dc(20, "SR 10."), dc(25, "SR 15."), dc(30, "SR 20.")],
    special: "Não pode ser recarregado. Ponto da Força ao ativar: SR +5. Manter é ação padrão; termina se o SR cair a 0." }),
  fp("Repulse", "repulse", { descriptors: ["telekinetic"], time: "Ação padrão", target: "Todos os alvos adjacentes", defense: "", img: "icons/magic/air/wind-weather-sailing-ship.webp",
    description: "Você limpa a área ao seu redor com uma onda de Força.",
    dcs: [dc(0, "Os alvos fazem testes de Força; quem tiver o teste superado é empurrado 1 quadrado +1 por 5 pontos de diferença. Se bater num objeto maior, sofre 1d6 de dano.")],
    special: `${SIZE_STR} Ponto da Força: −5 no teste de Força dos alvos e +2d6 de dano se baterem num objeto maior.` })
];

const IMG = { forceTalent: "icons/magic/control/silhouette-aura-energy.webp", forceTechnique: "icons/magic/perception/eye-ringed-glow-angry-small-teal.webp", forceSecret: "icons/magic/symbols/runes-star-pentagon-blue.webp" };
let TREE = "";
let CAT = "forceTalent";
const tree = (n, c = "forceTalent") => { TREE = n; CAT = c; };
const t = (name, key, text, pre = {}, o = {}) => ({
  name, type: "talent", img: IMG[CAT],
  system: { key, tree: TREE, category: CAT, classes: [], source: SRC, description: `<p>${text}</p>`, prerequisites: P(pre), choice: { type: o.choice ?? "", value: "", options: [] }, repeatable: !!o.repeatable, modifiers: [], rerolls: [] }
});
const pre = (text, o = {}) => ({ text, ...o });
const FPW = (k, n) => pre(n, { forcePowers: [k] });
const out = [];
const push = (...x) => out.push(...x);

tree("Alter");
push(t("Telekinetic Prodigy", "telekinetic-prodigy", "Ao pegar Force Training e escolher move object, ganha também um poder extra afetado por Telekinetic Savant (um extra por Force Training, não importa quantas vezes escolha move object).", pre("Telekinetic Savant", { talents: ["telekinetic-savant"] })));
tree("Control");
push(
  t("Force Exertion", "force-exertion", "Escolha um poder do seu conjunto: reação para remover um poder do conjunto ativo e ganhar um uso extra do poder escolhido; desce −1 passo persistente (removido com 1 minuto de descanso). Pode ser escolhido várias vezes (outro poder).", pre("Force Training", { feats: ["force-training"] }), { repeatable: true, choice: "forcePower" }),
  t("Indomitable Will", "indomitable-will", "Ação padrão, 1 Ponto da Força: imune a efeitos mentais por 1 minuto.")
);
tree("Dark Side");
push(t("Wrath of the Dark Side", "wrath-of-the-dark-side", "Ao tirar 20 natural em Use the Force para ativar um poder que causa dano direto, pode abrir mão de recuperar os poderes: os alvos atingidos sofrem metade do dano de novo no início do próximo turno deles (corruption, Force blast, Force grip, Force lightning, Force slam, Force storm, Force thrust com Ponto da Força, repulse com Ponto da Força).", pre("Power of the Dark Side", { talents: ["power-of-the-dark-side"] })));
tree("Sense");
push(t("Feel the Force", "feel-the-force", "Ação padrão, 1 Ponto da Força: ignora toda camuflagem por 1 minuto."));

tree("Force Techniques", "forceTechnique");
push(
  t("Improved Battle Strike", "improved-battle-strike", "O bônus de battle strike vale para todos os ataques de um ataque total.", FPW("battle-strike", "battle strike")),
  t("Improved Dark Rage", "improved-dark-rage", "Com dark rage, ignora a restrição a perícias e tarefas de paciência e concentração, e pode ativá-lo na rodada surpresa mesmo surpreso.", FPW("dark-rage", "dark rage")),
  t("Improved Force Disarm", "improved-force-disarm", "Pode usar Force disarm como rodada completa; nesse caso o oponente não recebe o +10 na Reflexos normal contra desarme.", FPW("force-disarm", "Force disarm")),
  t("Improved Force Thrust", "improved-force-thrust", "Pode usar Force thrust como rodada completa e 1 Ponto da Força para atingir todas as criaturas num cone de 6 quadrados.", FPW("force-thrust", "Force thrust")),
  t("Improved Force Grip", "improved-force-grip", "Ponto da Força (ação livre): mantém o Force grip por uma rodada extra sem concentração; depois disso não pode voltar a se concentrar nele.", FPW("force-grip", "Force grip")),
  t("Improved Force Lightning", "improved-force-lightning", "Usando Force lightning como rodada completa, o alvo faz um teste de Força; se o seu Use the Force superar, é empurrado 1 quadrado +1 por 5 pontos de diferença e sofre 1d6 se bater num objeto maior (soma BBA, tamanho e estabilidade como em repulse).", FPW("force-lightning", "Force lightning")),
  t("Improved Mind Trick", "improved-mind-trick", "Pode usar mind trick como rodada completa contra todas as criaturas num cone de 6 quadrados; Ponto da Força: cone de 12.", FPW("mind-trick", "mind trick")),
  t("Improved Rebuke", "improved-rebuke", "Quando um aliado a até 12 quadrados em linha de visão é alvo de um poder da Força, pode usar rebuke como se você fosse o alvo.", FPW("rebuke", "rebuke")),
  t("Improved Repulse", "improved-repulse", "Pode usar repulse como rodada completa num raio de 2 quadrados a partir do seu quadrado; Ponto da Força: raio de 4.", FPW("repulse", "repulse"))
);

tree("Force Secrets", "forceSecret");
push(
  t("Corrupted Power", "corrupted-power", "Ponto da Força: o poder ganha o descritor [dark side] e oponentes com Pontuação do Lado Sombrio menor que a sua sofrem −2 em todas as Defesas contra ele; Ponto de Destino: −5. Só se sua Pontuação do Lado Sombrio for igual à Sabedoria; não vale para poderes [light side]."),
  t("Debilitating Power", "debilitating-power", "Ponto da Força: um poder que causa dano também move o alvo −1 passo na trilha (além de qualquer outro) se o Use the Force igualar ou superar o Limiar dele; Ponto de Destino: −3 passos."),
  t("Enlarged Power", "enlarged-power", "Ponto da Força: dobra a área de um poder de raio ou cone (cone de 6 vira 12); Ponto de Destino: multiplica por 5 (cone de 6 vira 30)."),
  t("Pure Power", "pure-power", "Ponto da Força: o poder ganha o descritor [light side] e oponentes com Pontuação do Lado Sombrio 1+ não somam o bônus de equipamento às Defesas contra ele e sofrem −2 nelas; Ponto de Destino: −5. Não pode usar com Pontuação do Lado Sombrio 1+ nem em poderes [dark side]."),
  t("Remote Power", "remote-power", "Ponto da Força: um poder de cone, linha ou raio que sai do seu quadrado sai de um quadrado a até 6 quadrados; Ponto de Destino: de qualquer quadrado em linha de visão (a direção é escolhida como se você estivesse lá).")
);

tree("Agent of Ossus");
push(
  t("Buried Presence", "buried-presence", "Ação padrão, 1 Ponto da Força: imune à detecção pela Força por 1 hora (sense force e farseeing não o encontram). Pode usar como reação a quem tenta localizá-lo com Sense Force, mas o efeito termina se você fizer Use the Force."),
  t("Conceal Other", "conceal-other", "Buried Presence ou Vanish afetam também um aliado adjacente que concorde (+1 por escolha adicional).", pre("Buried Presence", { talents: ["buried-presence"] }), { repeatable: true }),
  t("Insightful Aim", "insightful-aim", "Ação rápida, 1 Ponto da Força: usa o modificador de Use the Force no lugar do bônus de ataque à distância até o início do seu próximo turno.", pre("Weapon Proficiency (pistols ou rifles)", { featsAny: ["weapon-proficiency-pistols", "weapon-proficiency-rifles"] })),
  t("Vanish", "vanish", "Ação rápida: Use the Force contra a Vontade de um alvo em linha de visão; se superar, tem camuflagem total contra ele até o início do seu próximo turno ou até atacar ou fazer um teste de perícia contra ele.")
);
tree("Felucian Shaman");
push(
  t("Detonate", "detonate", "Ao usar Force blast, 1 Ponto da Força: compara o Use the Force à Reflexos de todos a até 2 quadrados do alvo; quem for superado também sofre o dano (metade quem não for). Ataque de área contra os alvos secundários.", FPW("force-blast", "Force blast")),
  t("Hive Mind", "hive-mind", "Usa a aplicação telepatia de Use the Force como ação rápida, com sucesso automático, se o alvo concordar e estiver no mesmo planeta."),
  t("Infuse Weapon", "infuse-weapon", "Ponto da Força, rodada completa: infunde uma arma corpo a corpo sem célula de energia; ao usá-la, a RD dela dobra, sabres de luz não ignoram essa RD, e ao gastar Ponto da Força num ataque com ela soma 2 × o resultado do Ponto da Força ao dano se acertar."),
  t("Sickening Blast", "sickening-blast", "Se o Force blast superar a Fortitude do alvo, pode movê-lo −1 passo na trilha; sua Pontuação do Lado Sombrio aumenta em 1.", FPW("force-blast", "Force blast"))
);

export const talents = out;
