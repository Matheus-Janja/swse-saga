// Starships of the Galaxy — Cap. 1: talentos e feats novos. Textos resumidos.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
let TREE = "";
let CAT = "talent";
const tree = (n, c = "talent") => { TREE = n; CAT = c; };
const t = (name, key, text, pre = {}, o = {}) => ({
  name, type: "talent", img: CAT === "forceTalent" ? "icons/magic/control/silhouette-aura-energy.webp" : "icons/magic/symbols/star-yellow.webp",
  system: {
    key, tree: TREE, category: CAT, classes: [], source: "Starships of the Galaxy",
    description: `<p>${text}</p>`, prerequisites: P(pre),
    choice: { type: o.choice ?? "", value: "", options: [] }, repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], rerolls: o.rerolls ?? []
  }
});
const pre = (text, o = {}) => ({ text, ...o });
const out = [];
const push = (...x) => out.push(...x);
const CHA = pre("Car 13", { abilities: { cha: 13 } });

tree("Sense", "forceTalent");
push(t("Force Reflexes", "force-reflexes", "Ao ativar uma manobra de nave, pode gastar um Ponto da Força para rerrolar o teste de Pilot, ficando com o melhor.", pre("Force Sensitivity, Starship Tactics, Force Pilot", { feats: ["force-sensitivity", "starship-tactics"], talents: ["force-pilot"] })));
tree("Lineage");
push(t("Engineer", "engineer", "É treinado em Mechanics; ao instalar sistemas novos num veículo, o tempo de instalação cai 25%.", pre("Educated, treinado em Knowledge (technology)", { talents: ["educated"], trained: ["knowledgeTechnology"] })));
tree("Outlaw Tech");
push(
  t("Fast Repairs", "fast-repairs", "Ao improvisar (jury-rig) um objeto ou veículo, ele ganha PV temporários iguais ao resultado do teste de Mechanics (perdidos ao fim do encontro).", pre("Treinado em Mechanics", { trained: ["mechanics"] })),
  t("Hot Wire", "hot-wire", "Usa Mechanics no lugar de Use Computer para melhorar o acesso a um computador; conta como treinado em Use Computer para isso, e rerrolagens de Use Computer podem usar Mechanics.", pre("Treinado em Mechanics", { trained: ["mechanics"] })),
  t("Quick Fix", "quick-fix", "1/encontro, improvisa (jury-rig) um objeto ou veículo que não esteja desativado, com os benefícios e penalidades normais.", pre("Treinado em Mechanics", { trained: ["mechanics"] })),
  t("Personalized Modifications", "personalized-modifications", "Ação padrão: ajusta uma arma energizada que empunha; até o fim do encontro, +1 de equipamento no ataque e +2 no dano com ela. (Botão ⚡.)", pre("Treinado em Mechanics", { trained: ["mechanics"] }))
);
tree("Expert Pilot");
push(
  t("Blind Spot", "blind-spot", "Pilotando um veículo pelo menos dois tamanhos menor que o alvo e adjacente a ele, ação rápida: Pilot resistido; se vencer, entra no espaço dele e o acompanha (Pilot resistido a cada rodada). No ponto cego, +2 nos ataques contra ele e ele sofre −2 contra você."),
  t("Close Scrape", "close-scrape", "Pilotando um veículo Colossal ou menor, reação a um crítico: Pilot contra o resultado do ataque; se superar, o crítico vira acerto normal."),
  t("Improved Attack Run", "improved-attack-run", "Não precisa se mover em linha reta ao usar a corrida de ataque (attack run)."),
  t("Vehicle Focus", "vehicle-focus", "Escolha um tipo de veículo (airspeeder, nave capital, transporte, speeder, caça ou walker): pilotando ou artilhando esse tipo, +2 em todos os ataques com armas veiculares e pode escolher 10 em Pilot mesmo sob pressão.", pre("Sab 13", { abilities: { wis: 13 } }), { choice: "text" }),
  t("Wingman", "wingman", "Ação rápida, Pilot CD 15: ajuda um caça ou airspeeder aliado a até 2 quadrados; o piloto dele recebe +5 nos Pilot resistidos de dogfight até o início do seu próximo turno.", pre("Sab 13", { abilities: { wis: 13 } }))
);
tree("Gunner");
push(
  t("Crippling Hit", "crippling-hit", "Quando seu ataque faz um veículo descer −1 passo ou mais, também desativa um sistema: hiperpropulsor, uma arma ou bateria, ou comunicações, até ele recuperar todos os passos.", pre("Expert Gunner, System Hit", { talents: ["expert-gunner", "system-hit"] })),
  t("Great Shot", "great-shot", "Com armas veiculares, trata a distância como uma categoria menor para penalidades e bônus (curto conta como queima-roupa etc.). (Automático no ataque veicular.)"),
  t("Synchronized Fire", "synchronized-fire", "1/encontro, prepara um disparo junto com a arma de um aliado no mesmo alvo; se ambos acertarem, some os danos antes do SR/RD e trate como um único ataque para exceder o Limiar.", pre("Expert Gunner", { talents: ["expert-gunner"] }))
);
tree("Squadron Leader");
const SQ = "Esquadrão: os airspeeders, caças e transportes que você designa no início do seu primeiro turno (máx. nível de Ace Pilot + mod. de Carisma, mín. 1), em comunicação com você.";
push(
  t("Begin Attack Run", "begin-attack-run", `Ação rápida: designa um alvo; veículos do esquadrão em corrida de ataque contra ele recebem +5 (em vez de +2) no ataque. Um alvo por vez. ${SQ}`, CHA),
  t("Regroup", "regroup", `1/encontro, ação padrão: todos os veículos do esquadrão sobem +1 passo na trilha de condição. ${SQ}`, CHA),
  t("Squadron Maneuvers", "squadron-maneuvers", `Escolha um talento seu de Expert Pilot ou Gunner: 1/encontro, ação padrão, concede seus benefícios a todo o esquadrão até o fim do encontro. ${SQ}`, pre("Car 13 e outro talento de Ace Pilot", { abilities: { cha: 13 } })),
  t("Squadron Tactics", "squadron-tactics", `1/encontro, ao usar uma manobra de nave, todo o esquadrão pode usá-la uma vez no próximo turno (cada piloto faz o próprio teste). ${SQ}`, pre("Car 13, Sab 13, outro talento de Ace Pilot, Squadron Maneuvers, Starship Tactics", { abilities: { cha: 13, wis: 13 }, talents: ["squadron-maneuvers"], feats: ["starship-tactics"] }))
);
tree("Naval Officer");
push(
  t("Combined Fire", "combined-fire", "Ação rápida: designa um alvo para fogo combinado; baterias de armas que o atacam causam +1 dado a cada 2 pontos (em vez de 3) que o ataque supera a Reflexos. Com tiro tático (tactical fire) de nave capital, pode designar uma bateria para um único ataque."),
  t("Fleet Deployment", "fleet-deployment", "Rodada completa: designa veículos em linha de visão (até seu nível de classe); eles movem imediatamente até o deslocamento.", CHA),
  t("Fleet Tactics", "fleet-tactics", "Ação padrão: Knowledge (tactics) CD 15 contra um alvo de ataque em larga escala; até o início do seu próximo turno, todos os artilheiros aliados em linha de visão causam +1 dado de dano contra ele (afeta a mente). (Botão ⚡.)", pre("Car 13, Fleet Deployment", { abilities: { cha: 13 }, talents: ["fleet-deployment"] })),
  t("It's a Trap!", "its-a-trap", "1/encontro, reação: concede ao piloto de um veículo em linha de visão (inclusive o seu) uma ação de movimento imediata."),
  t("Legendary Commander", "legendary-commander", "Comandando uma nave capital, a Reflexos dela usa seu nível heroico + metade do bônus de armadura, ou o nível do piloto ou a armadura, o que for maior; os artilheiros somam ao dano o maior entre seu nível heroico e metade do nível deles; trata a tripulação genérica como um grau melhor.", pre("Car 13, Int 13, Born Leader", { abilities: { cha: 13, int: 13 }, talents: ["born-leader"] }))
);

export default out;

export const CLASS_TREES = { scoundrel: ["Outlaw Tech"], "ace-pilot": ["Squadron Leader"], officer: ["Naval Officer"] };

/* ---------------- FEATS ---------------- */
const feat = (name, key, benefit, pre = {}, o = {}) => ({
  name, type: "feat", img: "icons/skills/targeting/crosshair-pointed-orange.webp",
  system: { key, description: `<p>${benefit}</p>`, source: "Starships of the Galaxy", prerequisites: P(pre), choice: { type: "", value: "", options: [] }, repeatable: !!o.repeatable, modifiers: [], grantedBy: "" },
  folder: "Starships of the Galaxy"
});
export const feats = [
  feat("Starship Designer", "starship-designer", "Projeta naves do zero (mínimo 30 dias e Mechanics CD 25; +1 na CD e +1 dia a cada 100.000 cr acima dos primeiros 100.000). Ajudantes com o feat dividem o tempo.", { text: "Tech Specialist, treinado em Mechanics", feats: ["tech-specialist"], trained: ["mechanics"] }),
  feat("Starship Tactics", "starship-tactics", "Aprende manobras de nave (compêndio de poderes, pasta Manobras de Nave) em número igual a 1 + mod. de Sabedoria (mín. 1). Repetível. Usa-se como poder da Força, com teste de Pilot; um Ponto da Força recupera uma manobra gasta, e um 20 natural no teste recupera todas.", { text: "Vehicular Combat, treinado em Pilot", feats: ["vehicular-combat"], trained: ["pilot"] }, { repeatable: true }),
  feat("Tactical Genius", "tactical-genius", "Recupera todas as manobras de nave gastas ao fim de qualquer rodada em que tirar 20 natural numa jogada de ataque.", { text: "Starship Tactics, Vehicular Combat, treinado em Pilot", feats: ["starship-tactics", "vehicular-combat"], trained: ["pilot"] }),
  feat("Tech Specialist", "tech-specialist", "Faz modificações personalizadas em armaduras, armas, dispositivos, droides e veículos: custa 1/10 do item (mín. 1.000 cr), 1 dia por 1.000 cr e Mechanics CD 20. Cada item recebe um traço — armadura: Agile (+1 Des máx.), Fortifying (+1 Fortitude), Protective (+1 Reflexos); dispositivo: Enhanced Strength (+2 For), Improved Durability (+1 RD, +¼ PV), Mastercraft (+1 de equipamento); droide: +2 Des, Int ou For; veículo: +2 Des, +¼ de deslocamento, +5 SR; arma: Improved Accuracy (+1 ataque), Improved Damage (+2 dano), Selective Fire. Nobres e scoundrels podem pegá-lo como feat bônus.", { text: "Treinado em Mechanics", trained: ["mechanics"] })
];
