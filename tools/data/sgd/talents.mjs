// Scavenger's Guide to Droids — talentos de droide por grau (p.26-28) e das classes de prestígio de droide.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: true, locomotion: [], appendage: false, ...o
});
let TREE = "";
const tree = n => { TREE = n; };
const t = (name, key, text, pre = {}, o = {}) => ({
  name, type: "talent", img: "icons/commodities/tech/cog-steel-grey.webp",
  system: {
    key, tree: TREE, category: "talent", classes: [], source: "Scavenger's Guide to Droids",
    description: `<p>${text}</p>`, prerequisites: P(pre),
    choice: { type: o.choice ?? "", value: "", options: [] }, repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], rerolls: o.rerolls ?? []
  }
});
const pre = (text, o = {}) => ({ text, ...o });
const out = [];
const push = (...x) => out.push(...x);
const NOTE = "Talento de droide: um droide herói pode escolhê-lo no lugar de um talento de classe nos níveis em que ganharia talento (o assistente mostra a árvore do grau do droide).";

tree("1st-Degree Droid");
push(
  t("Known Vulnerability", "known-vulnerability", `Ação livre: Knowledge (life sciences) CD 15 (25 para espécies raras, 35 para desconhecidas); até o fim do encontro, quando ferir um alvo dessa espécie com ataque corpo a corpo ou desarmado, ele sofre −2 nos ataques até o fim do seu próximo turno. ${NOTE}`, pre("Treinado em Knowledge (life sciences)", { trained: ["knowledgeLifeSciences"] })),
  t("Medical Analyzer", "medical-analyzer", `Em Treat Injury para tratar doença, veneno ou radiação, soma também o mod. de Inteligência. ${NOTE}`, pre("Treinado em Knowledge (life sciences), droide médico", { trained: ["knowledgeLifeSciences"] })),
  t("Science Analyzer", "science-analyzer", `Soma o dobro do mod. de Inteligência em Knowledge (life sciences) e (physical sciences). (Automático.) ${NOTE}`, pre("Treinado em Knowledge (life sciences) e (physical sciences)", { trained: ["knowledgeLifeSciences", "knowledgePhysicalSciences"] })),
  t("Triage Scan", "triage-scan", `Ação padrão, Treat Injury CD 20: sabe se os seres orgânicos a até 6 quadrados em linha de visão estão abaixo da metade dos PV e em que passo da trilha estão. ${NOTE}`, pre("Treinado em Treat Injury, droide médico", { trained: ["treatInjury"] }))
);
tree("2nd-Degree Droid");
push(
  t("Burst Transfer", "burst-transfer", `Dobra a quantidade de dados transmitidos em Binary numa rodada; com outros droides com Burst Transfer, reduz à metade o tempo de Use Computer para acessar informações. ${NOTE}`),
  t("On-Board System Link", "on-board-system-link", `A bordo de uma nave e conectado (scomp link, soquete ou porta de dados), redireciona energia ou recarrega escudos com duas ações rápidas em vez de três. ${NOTE}`),
  t("Quick Astrogation", "quick-astrogation", `Calcula rotas na metade do tempo; o Use Computer para astrogação pode ser ação padrão em vez de rodada completa. ${NOTE}`, pre("Treinado em Use Computer", { trained: ["useComputer"] })),
  t("Scomp Link Slicer", "scomp-link-slicer", `Conectado fisicamente a um sistema, cada uma 1/encontro: Eradicate (desabilita ou apaga um programa em computador amistoso em 5 minutos com Use Computer CD 15); Lockout (ao vencer um Use Computer resistido, tranca o outro programador para fora; ele precisa vencê-lo para voltar); Untraceable (reação: ao falhar num Use Computer, impede o computador hostil de rastreá-lo, se falhar por 10 ou menos). ${NOTE}`, pre("Dois talentos da árvore Slicer (Burst Transfer pode contar como um)"))
);
tree("3rd-Degree Droid");
push(
  t("Nuanced", "nuanced", `1/encontro, soma o bônus de Sabedoria a um teste de Persuasion, além do de Carisma. ${NOTE}`),
  t("Observant", "observant", `Quando falharia num teste de Persuasion, pode fazer Perception (ação livre) com CD igual à de Persuasion; se passar, +5 no resultado original de Persuasion. ${NOTE}`),
  t("Supervising Droid", "supervising-droid", `Cada uma 1/encontro: Combat Support (ação padrão: ajuda automaticamente o ataque de um droide aliado; com Weapon Focus na arma, +3 em vez de +2); Director (ação padrão: ajuda automaticamente um droide numa perícia em que é treinado; com Skill Focus, +5); Instant Action (ação rápida: um aliado ganha uma ação rápida para usar como ação livre imediatamente). ${NOTE}`, pre("Observant e um talento de Influence, Inspiration ou Leadership", { talents: ["observant"], talentTrees: { trees: ["Influence", "Inspiration", "Leadership"], count: 1 } })),
  t("Talkdroid", "talkdroid", `Quando traduz para um aliado que tenta mudar a atitude de uma criatura que não o entende, o aliado recebe +2 em Persuasion. ${NOTE}`, pre("Treinado em Persuasion", { trained: ["persuasion"] }))
);
tree("4th-Degree Droid");
push(
  t("Just a Scratch", "just-a-scratch", `1/encontro, reação: reduz o dano de um ataque contra sua Reflexos em um valor igual à sua Fortitude. (Botão ⚡ aplica como RD temporária.) ${NOTE}`, pre("Armadura média ou melhor, proficiente com ela")),
  t("Target Acquisition", "target-acquisition", `1/encontro, ação rápida: designa um inimigo em linha de visão; +1 de circunstância em ataques e dano contra ele até o fim do encontro, enquanto estiver na linha de visão. (Botão ⚡.) ${NOTE}`),
  t("Target Lock", "target-lock", `Se o alvo do Target Acquisition sair da linha de visão, recupera a mira como reação quando ele voltar; +5 em Perception contra o Stealth dele. ${NOTE}`, pre("Target Acquisition", { talents: ["target-acquisition"] })),
  t("Weapons Power Surge", "weapons-power-surge", `1/encontro, ação livre: aumenta em 1 ou 2 dados o dano de uma arma montada no chassi (que use a energia interna), descendo −1 passo na trilha por dado. (Botão ⚡.) ${NOTE}`)
);
tree("5th-Degree Droid");
push(
  t("Durable", "durable", `Na primeira vez no encontro em que seria levado ao fim da trilha de condição, para em −10. Quando um ataque o faria descer vários passos, gasta um Ponto da Força (reação) para descer só −1. ${NOTE}`),
  t("Heavy-Duty Actuators", "heavy-duty-actuators", `Dobra o bônus de Força nas jogadas de dano corpo a corpo e desarmado. (Automático.) ${NOTE}`, pre("Médio ou maior", { sizes: ["medium", "large", "huge", "gargantuan", "colossal"] })),
  t("Load Launcher", "load-launcher", `É proficiente com armas arremessadas improvisadas: arremessa objetos de até uma categoria maior que você a 2 × bônus de Força quadrados (mín. 1) e soma o bônus de Força ao dano. ${NOTE}`),
  t("Task Optimization", "task-optimization", `Escolha uma perícia treinada: 1/encontro, uma aplicação dela leva uma ação a menos (mín. rápida). Repetível. ${NOTE}`, {}, { choice: "skill", repeatable: true })
);

/* Classes de prestígio de droide (Clone Wars Campaign Guide / Force Unleashed Campaign Guide) */
const PREST = "Talento para a classe de prestígio Droid Commander (The Clone Wars Campaign Guide).";
const PREST2 = "Talento para a classe de prestígio Independent Droid (The Force Unleashed Campaign Guide).";
tree("Override");
push(
  t("Directed Action", "directed-action", `Ação padrão: um droide que o ouça e entenda faz imediatamente, como ação livre, um teste de Deception, Mechanics, Persuasion, Pilot, Treat Injury ou Use Computer, podendo usar o seu mod. de Inteligência. ${PREST}`, pre("", { droidOnly: false })),
  t("Directed Movement", "directed-movement", `Ação de movimento: um droide move até o deslocamento (podendo usar seu mod. de Inteligência em Acrobatics, Climb, Jump, Stealth ou Swim). ${PREST}`, pre("", { droidOnly: false })),
  t("Full Control", "full-control", `Rodada completa: um droide faz um ataque total usando seu mod. de Inteligência nas jogadas de ataque. ${PREST}`, pre("Directed Action, Directed Movement, Remote Attack", { droidOnly: false, talents: ["directed-action", "directed-movement", "remote-attack"] })),
  t("Remote Attack", "remote-attack", `Ação padrão: um droide faz um ataque corpo a corpo ou à distância usando seu mod. de Inteligência. ${PREST}`, pre("", { droidOnly: false }))
);
tree("Specialized Droid");
push(t("Power Boost", "power-boost", `Ao iniciar um power surge, recebe um bônus na locomoção (Jump +4 quadrados; ou +4 quadrados de altura flutuando) por rodadas iguais a ½ nível; depois desce −1 passo persistente (−2 se combinado com Power Surge). ${PREST2}`, pre("Power Surge")));
tree("Autonomy");
push(t("Just a Droid", "just-a-droid", `Cada uma 1/encontro: Just Another Droid (usa Stealth para se esgueirar à vista de inimigos que não suspeitam; conta como treinado); Just a Normal Droid (rerrola Deception para parecer estar fazendo algo normal). ${PREST2}`, pre("Dois talentos de Autonomy")),
  t("Swift Droid", "swift-droid", `Reação: faz uma ação rápida após falhar num teste de Deception ou Stealth. ${PREST2}`, pre("Dois talentos de Autonomy")));
tree("Elite Droid");
push(
  t("Break Program", "break-program", `Use Computer contra a Vontade de um droide com quem tem link de dados: anula os inibidores comportamentais dele por rodadas iguais ao seu bônus de Inteligência. ${PREST2}`, pre("Treinado em Use Computer", { trained: ["useComputer"] })),
  t("Heuristic Mastery", "heuristic-mastery", `Rerrola qualquer teste de perícia sem treino (exceto Use the Force) ficando com o segundo; 1/encontro, Ponto da Força para rerrolar qualquer perícia ficando com o melhor. ${PREST2}`, pre("Sab 15", { abilities: { wis: 15 } })),
  t("Scripted Routines", "scripted-routines", `Cada uma 1/encontro: Attack Script (um feat/talento que modifica o ataque gasta uma ação a menos); Defense Script (aplica o bônus de Independent Spirit uma segunda vez); Skill Script (+½ nível de classe numa perícia treinada que exija ação padrão ou menos). ${PREST2}`, pre("BBA +5", { bab: 5 })),
  t("Ultra Resilient", "ultra-resilient", `1/encontro, reação: aumenta o Limiar de Dano em um valor igual ao seu nível de Independent Droid. ${PREST2}`)
);

export default out;
