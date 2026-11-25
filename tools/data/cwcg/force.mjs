// The Clone Wars Campaign Guide — Cap. 4: poderes, talentos, técnicas, segredos e tradições da Força. Efeitos resumidos.
const SRC = "The Clone Wars Campaign Guide";
const fp = (name, key, o) => ({
  name, type: "forcePower", img: o.img ?? "icons/magic/lightning/bolt-strike-blue.webp",
  system: {
    key, descriptors: [], time: "", target: "", defense: "", dcs: [], special: "", uses: 1, spent: 0, damage: "", source: SRC,
    ...o, description: `<p>${o.description}</p>`
  },
  folder: "Poderes da Força"
});
const dc = (n, text) => ({ dc: n, text });
const MAINTAIN = "Pode manter o poder de rodada a rodada (novo teste a cada rodada); se sofrer dano enquanto o mantém, Use the Force CD 15 + dano para continuar.";

export const powers = [
  fp("Cloak", "cloak", { time: "Ação padrão", target: "Você", description: "Você curva a luz ao seu redor e fica invisível para quem olha na sua direção.",
    dcs: [dc(15, "Camuflagem total contra todos os alvos até o início do seu próximo turno."), dc(20, "Como CD 15, e +2 da Força em Stealth."), dc(25, "+3 em Stealth."), dc(30, "+5 em Stealth.")],
    special: `Manter é ação padrão. ${MAINTAIN} Ponto da Força: +5 adicional em Stealth.` }),
  fp("Levitate", "levitate", { descriptors: ["telekinetic"], time: "Ação de movimento", target: "Você", description: "Você flutua para cima ou para baixo sem apoio.",
    dcs: [dc(15, "Deslocamento de voo 2 só na vertical; terminando adjacente a uma superfície horizontal, move 1 quadrado para ela como ação livre. Sem apoio no início do seu próximo turno, cai."), dc(20, "Voo 4 quadrados."), dc(25, "Voo 6 quadrados.")],
    special: `Ponto da Força (reação ao cair): reduz a queda em quadrados iguais ao voo; a 0, aterrissa ileso. Manter é ação de movimento. ${MAINTAIN}` }),
  fp("Malacia", "malacia", { descriptors: ["lightSide"], time: "Ação padrão", target: "Uma criatura viva a até 6 quadrados em linha de visão", defense: "fortitude",
    description: "Você perturba o equilíbrio do inimigo, causando tontura e náusea.",
    special: `Se igualar ou superar a Fortitude, o alvo desce −1 passo e sofre −5 no Limiar de Dano até o fim do próximo turno dele. Ponto da Força: −10 no Limiar. Manter é ação padrão. ${MAINTAIN}` }),
  fp("Morichro", "morichro", { time: "Ação padrão", target: "Uma criatura viva agarrada ou presa por você", defense: "fortitude",
    description: "Você desacelera as funções vitais do alvo, levando-o a sono profundo ou à morte.",
    special: `Se superar a Fortitude, o alvo desce −1 passo; mantendo (ação padrão, novo teste a cada rodada), desce mais um passo por sucesso. No fim da trilha, pode matá-lo ou colocá-lo em transe da Força mesmo involuntário. ${MAINTAIN} Se o alvo escapar do agarrão, não pode manter.` }),
  fp("Phase", "phase", { time: "Ação de movimento", target: "Você", description: "Você atravessa objetos sólidos como paredes e portas.",
    dcs: [dc(25, "Deslocamento de fase 2 quadrados (nunca acima do normal): atravessa inimigos, paredes, veículos e obstáculos, terminando em espaço livre e válido."), dc(30, "4 quadrados."), dc(35, "6 quadrados."), dc(40, "8 quadrados.")],
    special: `Ponto da Força: +2 quadrados. Manter é ação de movimento. ${MAINTAIN}` }),
  fp("Rend", "rend", { descriptors: ["darkSide"], time: "Ação padrão", target: "Um alvo a até 6 quadrados em linha de visão", defense: "reflex", damage: "3d6",
    description: "Você puxa o alvo em duas direções ao mesmo tempo.",
    special: "Se igualar ou superar a Reflexos, 3d6 de dano; um 20 natural conta como crítico (dano dobrado). Se o reduzir a 0 PV, dilacera o alvo (seres vivos morrem). Ponto da Força: +2d6 de dano." }),
  fp("Shatterpoint", "shatterpoint", { time: "Ação rápida", target: "Você", description: "Você enxerga o ponto crítico de algo: onde um golpe certeiro o despedaça.",
    dcs: [dc(25, "Se o seu próximo ataque antes do fim do encontro acertar, trate o Limiar do alvo como 5 menor."), dc(30, "10 menor."), dc(35, "15 menor."), dc(40, "20 menor.")],
    special: "Ponto da Força: também ignora a RD do alvo." }),
  fp("Technometry", "technometry", { time: "Ação padrão", target: "Um droide ou aparelho eletrônico tocado", defense: "will",
    description: "Você lê e controla dispositivos tecnológicos.",
    special: "Se igualar ou superar a Vontade, descobre uma informação da memória do alvo (tabela Access Information de Use Computer), +1 a cada 5 pontos acima. Contra droides, em vez disso: sentidos bloqueados (você faz Stealth contra ele mesmo se perceber você), ou ele perde a Destreza na Reflexos contra seu próximo ataque, ou nos próximos dois turnos só se afasta de você em velocidade máxima. Ponto da Força: duas informações extras ou estende o efeito por uma rodada." })
];

/* ---------------- Talentos, técnicas, segredos ---------------- */
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
const IMG = { forceTalent: "icons/magic/control/silhouette-aura-energy.webp", forceTechnique: "icons/magic/perception/eye-ringed-glow-angry-small-teal.webp", forceSecret: "icons/magic/symbols/runes-star-pentagon-blue.webp" };
let TREE = "";
let CAT = "forceTalent";
const tree = (n, c = "forceTalent") => { TREE = n; CAT = c; };
const t = (name, key, text, pre = {}, o = {}) => ({
  name, type: "talent", img: IMG[CAT],
  system: { key, tree: TREE, category: CAT, classes: [], source: SRC, description: `<p>${text}</p>`, prerequisites: P(pre),
    choice: { type: "", value: "", options: [] }, repeatable: !!o.repeatable, modifiers: [], rerolls: [] }
});
const pre = (text, o = {}) => ({ text, ...o });
const FS = { feats: ["force-sensitivity"] };
const out = [];
const push = (...x) => out.push(...x);

tree("Alter");
push(t("Aversion", "aversion", "Ação rápida, um Ponto da Força: até o fim do encontro, todos os quadrados a até 2 quadrados de você contam como terreno difícil para os inimigos. Afeta a mente."));
tree("Control");
push(t("The Will to Resist", "the-will-to-resist", "1/turno, reação ao ser alvo de um poder ou habilidade contra sua Vontade: faz Use the Force e usa o resultado como Vontade; depois, −5 em Use the Force até o fim do seu próximo turno."));
tree("Dark Side");
push(t("Consumed by Darkness", "consumed-by-darkness", "Ação rápida: −5 na Vontade e +2 da Força nas jogadas de ataque até o início do seu próximo turno. Exige Dark Side Score 1+. (Botão ⚡.)", pre("Dark Side Score 1+", { darkSide: "atLeast1" })));
tree("Light Side");
const DS0 = "Exige Dark Side Score 0; se ele subir, perde acesso aos talentos desta árvore até voltar a 0.";
push(
  t("At Peace", "at-peace", `Gasta um Ponto da Força: +2 da Força em todas as Defesas até o fim do encontro ou até você atacar. ${DS0} (Botão ⚡.)`),
  t("Attuned", "attuned", `Ao tirar 20 natural num ataque contra uma criatura com Dark Side Score 1+, ativa imediatamente, como ação livre, um poder [light side]. ${DS0}`, pre("Focused Attack", { talents: ["focused-attack"] })),
  t("Focused Attack", "focused-attack", `Gasta um Ponto da Força para rerrolar um ataque contra uma criatura com Dark Side Score 1+, ficando com o melhor. ${DS0}`),
  t("Surge of Light", "surge-of-light", `1/encontro, ação rápida: devolve ao conjunto um poder [light side] sem gastar Ponto da Força. Repetível (um uso extra por vez). ${DS0}`, {}, { repeatable: true })
);
tree("Sense");
push(
  t("Heightened Awareness", "heightened-awareness", "Gasta um Ponto da Força para somar o mod. de Carisma a um teste de Perception. Repetível (soma o Carisma mais uma vez).", {}, { repeatable: true }),
  t("Psychometry", "psychometry", "Com farseeing, pode visar um objeto que segura: vê o passado dele (até 5 anos por nível de personagem), pensamentos e emoções de quem o segurou.", pre("Force Perception, farseeing", { talents: ["force-perception"], forcePowers: ["farseeing"] })),
  t("Shift Sense", "shift-sense", "Gasta um Ponto da Força: ganha visão na penumbra por 1 minuto ou até o fim do encontro (o que for maior).")
);

tree("Force Techniques", "forceTechnique");
push(
  t("Advanced Vital Transfer", "advanced-vital-transfer", "Ao usar vital transfer, gasta um Ponto de Destino para curar todo o dano do alvo e remover todas as condições debilitantes.", pre("Vital transfer", { forcePowers: ["vital-transfer"] })),
  t("Improved Cloak", "improved-cloak", "Mantém o poder cloak como ação de movimento em vez de padrão.", pre("Cloak", { forcePowers: ["cloak"] })),
  t("Improved Levitate", "improved-levitate", "Movido à força para um buraco ou borda (Force thrust, Bantha Rush...), gasta um Ponto da Força para ativar levitate como reação e termina o movimento no último quadrado antes da beirada.", pre("Levitate", { forcePowers: ["levitate"] })),
  t("Improved Malacia", "improved-malacia", "Mantém a penalidade de Limiar do malacia como ação rápida.", pre("Malacia", { forcePowers: ["malacia"] })),
  t("Improved Phase", "improved-phase", "Com phase, pode terminar uma ação de movimento dentro de espaço ocupado (mas precisa terminar o turno em espaço livre).", pre("Phase", { forcePowers: ["phase"] })),
  t("Improved Rend", "improved-rend", "O alcance do rend sobe para 12 quadrados, e ele ignora a RD do alvo.", pre("Rend", { forcePowers: ["rend"] })),
  t("Improved Shatterpoint", "improved-shatterpoint", "Ao descer um alvo na trilha com ataque beneficiado por shatterpoint, gasta um Ponto da Força para torná-la persistente (só some com cirurgia ou reparo).", pre("Shatterpoint", { forcePowers: ["shatterpoint"] })),
  t("Improved Technometry", "improved-technometry", "Com technometry, pode levar uma rodada completa e afetar todos os droides num cone de 6 quadrados.", pre("Technometry", { forcePowers: ["technometry"] }))
);
tree("Force Secrets", "forceSecret");
push(
  t("Extend Power", "extend-power", "Poderes que se mantêm por concentração (como Force grip) podem ser mantidos como ação rápida por rodadas iguais ao mod. de Carisma."),
  t("Linked Power", "linked-power", "Gasta um Ponto da Força para ligar o poder usado nesta rodada a outro: o segundo dispara como ação livre no início do seu próximo turno (escolhidos ao ligar; não podem ser alterados)."),
  t("Unconditional Power", "unconditional-power", "Poderes que visam só você ignoram as penalidades da trilha de condição no teste de Use the Force.")
);

/* Tradições */
tree("Bando Gora Captain", "forceTalent");
const BG = pre("Membro do Bando Gora (Force Sensitivity e Dark Side Score 1+)", { feats: ["force-sensitivity"], darkSide: "atLeast1" });
push(
  t("Bando Gora Surge", "bando-gora-surge", "Sempre que sobe na trilha de condição, ganha PV bônus iguais a 5 + nível heroico (somem no fim do encontro; não acumulam).", BG),
  t("Force Fighter", "force-fighter", "Ao gastar um Ponto da Força num ataque que acerta, recupera PV iguais ao resultado do Ponto da Força.", BG),
  t("Resist Enervation", "resist-enervation", "Quando um efeito o desceria na trilha, gasta um Ponto da Força para anular esse passo.", BG),
  t("Victorious Force Mastery", "victorious-force-mastery", "Quando um inimigo que você feriu neste encontro cai a 0 PV, devolve ao conjunto um poder gasto como ação livre.", BG)
);
tree("Believer Disciple", "forceTalent");
const BEL = pre("Membro dos Believers (Force Sensitivity e Dark Side Score 1+)", { feats: ["force-sensitivity"], darkSide: "atLeast1" });
push(
  t("Believer Intuition", "believer-intuition", "Reação quando um oponente o acerta: Use the Force contra o resultado do ataque; se igualar ou superar, soma o mod. de Carisma à Reflexos contra esse ataque.", BEL),
  t("Defense Boost", "defense-boost", "Ação rápida, Use the Force CD 15: +1 da Força na Fortitude até o fim do seu próximo turno; +1 nas outras Defesas a cada 5 pontos acima (CD 20 para todas).", BEL),
  t("Hardiness", "hardiness", "Gasta um Ponto da Força para reduzir em um o número de ações rápidas para subir +1 passo na trilha.", BEL),
  t("High Impact", "high-impact", "Ação rápida, Use the Force CD 15: dobra o bônus de Força no próximo dano corpo a corpo antes do fim do seu turno.", BEL),
  t("Sith Reverence", "sith-reverence", "+1 de moral nos ataques a até 20 quadrados e em linha de visão de um aliado com Dark Side Score igual ou maior que o seu.", BEL)
);
tree("Korunnai Adept", "forceTalent");
const KOR = pre("Membro dos Korunnai (Force Sensitivity)", FS);
push(
  t("Akk Dog Master", "akk-dog-master", "Ganha um seguidor akk dog (modelo agressivo, defensivo ou utilitário, com os traços de akk dog e o feat Power Attack). Conta para o total de seguidores. Seus poderes que visam só você podem visar o akk dog.", KOR),
  t("Akk Dog Trainer's Actions", "akk-dog-trainers-actions", "Ações em conjunto com o akk dog: <em>Attack in Concert</em> (ação padrão, ataca um alvo adjacente ao cão; se acertar, +1d6 + For do cão de dano perfurante); <em>Fall Upon Prey</em> (ação padrão, você ataca e o cão investe contra um alvo ao alcance; ambos −5); <em>Paired Maul</em> (ação padrão, você ataca; se acertar, o cão recebe +2 de competência no próximo ataque contra o alvo).", pre("Akk Dog Master", { talents: ["akk-dog-master"] })),
  t("Akk Dog Attack Training", "akk-dog-attack-training", "Seu akk dog ganha o feat Powerful Charge.", pre("Akk Dog Master", { talents: ["akk-dog-master"] })),
  t("Protective Reaction", "protective-reaction", "Quando um inimigo adjacente ao seu akk dog o ataca, provoca ataque de oportunidade do cão.", pre("Akk Dog Master", { talents: ["akk-dog-master"] }))
);

export const talents = out;
/** Árvores de tradição para personagens sensíveis à Força (aparecem no assistente via extraTrees). */
export const TRADITION_TREES = ["Light Side", "Bando Gora Captain", "Believer Disciple", "Korunnai Adept"];
