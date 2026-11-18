// Galaxy of Intrigue — Cap. 1: feats (Tabela 1-4). Benefícios resumidos.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, ...o
});
const feat = (name, key, benefit, pre = {}, o = {}) => ({
  name, type: "feat", img: o.img ?? "icons/skills/targeting/crosshair-pointed-orange.webp",
  system: {
    key, description: `<p>${benefit}</p>`, source: "Galaxy of Intrigue",
    prerequisites: P(pre), choice: { type: o.choice ?? "", value: o.value ?? "", options: [] },
    repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], grantedBy: ""
  },
  folder: o.folder ?? "Galaxy of Intrigue"
});
const SC = { folder: "Galaxy of Intrigue — Desafios de Perícia", img: "icons/sundries/gaming/dice-runed-brown.webp" };
const SC_NOTE = "Só em campanhas que usam as regras de desafios de perícia (Cap. 2).";

export default [
  feat("Adaptable Talent", "adaptable-talent", "Escolha um talento de uma classe que você possui e cujos pré-requisitos cumpre. 1/dia, após 6 horas de descanso, pode trocar um dos seus talentos por ele (não pode trocar um talento que seja pré-requisito de outro); depois de outras 6 horas pode destrocar."),
  feat("Bone Crusher", "bone-crusher", "Ao causar dano a um oponente agarrado por você, ele também desce −1 passo na trilha de condição. (Opção \"Alvo agarrado\" no diálogo de ataque.)", { text: "Crush, Pin", feats: ["crush", "pin"] }),
  feat("Brilliant Defense", "brilliant-defense", "1/encontro, reação: soma o bônus de Inteligência à Defesa de Reflexos até o início do seu próximo turno. (Botão ⚡.)", { text: "Int 13", abilities: { int: 13 } }),
  feat("Channel Rage", "channel-rage", "1/dia, em vez de entrar em fúria, recebe +5 na Defesa de Vontade até o fim do encontro (conta como o uso da fúria). (Botão ⚡.)", { text: "Traço Rage", species: ["wookiee"] }),
  feat("Cut the Red Tape", "cut-the-red-tape", "Usa o modificador de Knowledge (bureaucracy) no lugar de Gather Information e conta como treinado em Gather Information para isso (rerrolagens também podem usá-lo). (Automático.)", { text: "Treinado em Knowledge (bureaucracy)", trained: ["knowledgeBureaucracy"] }),
  feat("Demoralizing Strike", "demoralizing-strike", "Ao causar dano com um ataque de oportunidade, pode fazer imediatamente um teste de Persuasion para intimidar o oponente (ação livre).", { text: "Car 13", abilities: { cha: 13 } }),
  feat("Disturbing Presence", "disturbing-presence", "Com Deception CD 15, atravessa a área ameaçada ou o espaço de um inimigo durante o movimento sem provocar ataques de oportunidade; cada quadrado assim conta como 2.", { text: "Treinado em Deception", trained: ["deception"] }),
  feat("Expert Briber", "expert-briber", "Ao subornar (Haggle de Persuasion), a CD cai 10 e o preço diminui.", { text: "Car 13", abilities: { cha: 13 } }),
  feat("Flèche", "fleche", "1/encontro, ao fazer uma investida, qualquer 17 natural ou mais no ataque é um acerto crítico. (Opção no diálogo de ataque.)", { text: "BBA +1", bab: 1 }),
  feat("Forceful Recovery", "forceful-recovery", "Ao usar o second wind, recupera um poder da Força gasto à sua escolha. (Automático.)", { text: "Force Sensitivity, Force Training", feats: ["force-sensitivity", "force-training"] }),
  feat("Grazing Shot", "grazing-shot", "Ao acertar um ataque à distância contra um único alvo, pode fazer outra jogada de ataque contra um segundo alvo em linha de visão a até 6 quadrados do primeiro: se acertar, role o dano uma vez e divida-o entre os dois; se errar, nenhum dos dois sofre dano. (Opção no diálogo de ataque: marque os dois alvos.)", { text: "Point Blank Shot", feats: ["point-blank-shot"] }),
  feat("Hobbling Strike", "hobbling-strike", "Quando causaria dano extra com Sneak Attack, Rapid Shot ou Rapid Strike, pode em vez disso reduzir o deslocamento do alvo em 1 quadrado até o fim do encontro.", { text: "Sneak Attack, Rapid Shot ou Rapid Strike" }),
  feat("Improved Opportunistic Trickery", "improved-opportunistic-trickery", "1/turno, ao abrir mão de um ataque de oportunidade, o alvo sofre −5 na Reflexos até o fim do próximo turno dele (em vez de −2). (Botão ⚡.)", { text: "Combat Reflexes, Opportunistic Trickery", feats: ["combat-reflexes", "opportunistic-trickery"] }),
  feat("Indomitable Personality", "indomitable-personality", "1/encontro, reação: soma o bônus de Carisma à Defesa de Vontade até o fim do seu próximo turno. (Botão ⚡.)", { text: "Car 13", abilities: { cha: 13 } }),
  feat("Master of Disguise", "master-of-disguise", "+5 de intuição em Deception para criar disfarces ou documentos falsos; apressar a criação impõe só −2 (em vez de −10).", { text: "Treinado em Deception, Car 13", trained: ["deception"], abilities: { cha: 13 } }),
  feat("Meat Shield", "meat-shield", "Quando um oponente o ataca enquanto você tem cobertura dada por outra criatura, personagem ou droide, você conta como em cobertura contra os ataques desse oponente.", { text: "Point Blank Shot, Precise Shot, BBA +4", feats: ["point-blank-shot", "precise-shot"], bab: 4 }),
  feat("Opportunistic Trickery", "opportunistic-trickery", "1/turno, quando um oponente provoca um ataque de oportunidade seu, pode abrir mão do ataque para impor −2 na Reflexos dele pela rodada seguinte. (Botão ⚡.)", { text: "Combat Reflexes, Sneak Attack", feats: ["combat-reflexes"], talents: ["sneak-attack"] }),
  feat("Recurring Success", "recurring-success", "Escolha um talento ou feat de uso 1/encontro: pode usá-lo uma vez adicional por encontro. Repetível (outro talento/feat a cada vez).", {}, { repeatable: true }),
  feat("Resolute Stance", "resolute-stance", "Ao lutar defensivamente, recebe +2 de moral na Vontade (+5 se não atacar até o próximo turno) em vez do bônus de esquiva na Reflexos. (Automático com as condições Lutando defensivamente / Defesa total.)", { text: "BBA +1", bab: 1 }),
  feat("Sadistic Strike", "sadistic-strike", "Ao dar um golpe de misericórdia (coup de grace) numa criatura indefesa, todos os oponentes em linha de visão descem −1 passo na trilha de condição até o fim do encontro."),
  feat("Silver Tongue", "silver-tongue", "Pode intimidar ou mudar a atitude de uma criatura como ação padrão (normalmente rodada completa).", { text: "Treinado em Persuasion", trained: ["persuasion"] }),
  feat("Skill Challenge: Catastrophic Avoidance", "skill-challenge-catastrophic-avoidance", `1/desafio com falha catastrófica: ela só ocorre se você falhar por 15 ou mais, e conta uma falha em vez de duas. ${SC_NOTE}`, {}, SC),
  feat("Skill Challenge: Last Resort", "skill-challenge-last-resort", `1/desafio, quando você ou um aliado acumula a terceira falha (que encerraria o desafio), pode rerrolar o teste e ficar com o melhor resultado. ${SC_NOTE}`, {}, SC),
  feat("Skill Challenge: Recovery", "skill-challenge-recovery", `1/desafio, trata o desafio como se tivesse o efeito Recovery, mesmo que não tenha. ${SC_NOTE}`, {}, SC),
  feat("Stand Tall", "stand-tall", "1/encontro, quando sofre dano, todos os aliados a até 6 quadrados e em linha de visão podem, como reação, fazer um único ataque contra quem o feriu."),
  feat("Wookiee Grip", "wookiee-grip", "Empunha com uma mão uma arma de duas mãos em que é proficiente, com −2 nas jogadas de ataque com ela.", { text: "For 13", abilities: { str: 13 } })
];

/** Feats adicionais nas listas de feats bônus das classes base (p.29). */
export const CLASS_BONUS_FEATS = {
  jedi: ["brilliant-defense", "resolute-stance", "stand-tall"],
  noble: ["brilliant-defense", "cut-the-red-tape", "demoralizing-strike", "disturbing-presence", "expert-briber", "fleche", "indomitable-personality", "master-of-disguise", "sadistic-strike", "silver-tongue", "stand-tall"],
  scoundrel: ["disturbing-presence", "expert-briber", "hobbling-strike", "improved-opportunistic-trickery", "indomitable-personality", "master-of-disguise", "opportunistic-trickery", "sadistic-strike", "silver-tongue", "stand-tall"],
  scout: ["grazing-shot", "hobbling-strike", "meat-shield", "stand-tall"],
  soldier: ["bone-crusher", "fleche", "grazing-shot", "hobbling-strike", "meat-shield", "resolute-stance", "sadistic-strike", "wookiee-grip"]
};
