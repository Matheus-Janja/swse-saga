// Galaxy at War — Cap. 1: feats gerais (Tabela 1-4), de artes marciais (1-5) e de equipe (1-6). Benefícios resumidos.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, ...o
});
const mod = (target, value, type = "untyped") => ({ target, value: String(value), type, label: "", disabled: false });
const feat = (name, key, benefit, pre = {}, o = {}) => ({
  name, type: "feat", img: o.img ?? "icons/skills/targeting/crosshair-pointed-orange.webp",
  system: {
    key, description: `<p>${benefit}</p>`, source: "Galaxy at War",
    prerequisites: P(pre), choice: { type: o.choice ?? "", value: o.value ?? "", options: [] },
    repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], grantedBy: ""
  },
  folder: o.folder ?? "Galaxy at War"
});
const MA = "icons/skills/melee/unarmed-punch-fist.webp";
const TEAM = "icons/environment/people/charge.webp";
const LIGHT = "Só com armadura leve ou sem armadura.";

const general = [
  feat("Bantha Herder", "bantha-herder", "Ao causar dano com arma à distância a um alvo Grande ou menor, faça um ataque contra a Vontade dele (mesmo bônus); se acertar, empurra-o 1 quadrado para longe de você.", { text: "Proficiente com a arma, BBA +1", bab: 1 }),
  feat("Battering Attack", "battering-attack", "Quando empurra um alvo com Bantha Rush, ele também fica caído (prone).", { text: "Bantha Rush, Trip", feats: ["bantha-rush", "trip"] }),
  feat("Destructive Force", "destructive-force", "Ao causar a um objeto ou veículo dano que exceda seu Limiar e o leve a 0 PV, cada alvo adjacente sofre 1 dado do dano da arma."),
  feat("Disabler", "disabler", "Granada de íons: explosão de raio 3. Pistola de íons: usa d8 em vez de d6. Rifle de íons: é precisa (accurate). (Automático.)", { text: "Proficiente com a arma" }),
  feat("Dive for Cover", "dive-for-cover", "1/turno, reação: ao ser alvo de um ataque, faça Jump para pular até uma cobertura dentro do alcance; termina caído.", { text: "Treinado em Jump", trained: ["jump"] }),
  feat("Fight Through Pain", "fight-through-pain", "Usa a Defesa de Vontade em vez da Fortitude para determinar o Limiar de Dano. (Automático.)"),
  feat("Forceful Blast", "forceful-blast", "Ao causar dano com granada a um alvo Grande ou menor, faça um ataque contra a Fortitude dele; se acertar, empurra-o 1 quadrado para longe do centro da explosão.", { text: "Proficiente com a arma, BBA +1", bab: 1 }),
  feat("Force of Personality", "force-of-personality", "Usa o modificador de Sabedoria ou de Carisma (o maior) na Defesa de Vontade. (Automático.)", { text: "Car 13", abilities: { cha: 13 } }),
  feat("Fortifying Recovery", "fortifying-recovery", "Ao fazer a ação de recuperar-se (recover), recebe PV temporários iguais a 2× seu bônus de Constituição (mín. 2) até o fim do encontro; não acumulam. (Automático no botão de recuperar-se.)", { text: "Con 13", abilities: { con: 13 } }),
  feat("Mission Specialist", "mission-specialist", "Escolha uma perícia treinada: aliados a até 12 quadrados que não sejam treinados nela recebem +2 de competência nesses testes.", { text: "Treinado na perícia escolhida" }, { choice: "skill", repeatable: true }),
  feat("Never Surrender", "never-surrender", "Na primeira vez no encontro em que seria reduzido a 0 PV, faça Endurance (reação) com CD igual ao dano; se passar, fica com 1 PV.", { text: "Treinado em Endurance", trained: ["endurance"] }),
  feat("Officer Candidacy Training", "officer-candidacy-training", "+2 na pontuação de organização do sistema de Patente e Privilégio. (Automático na ficha.)"),
  feat("Opportunistic Shooter", "opportunistic-shooter", "+2 nos ataques de oportunidade feitos com armas à distância."),
  feat("Pistoleer", "pistoleer", "Blaster pistol: é precisa. Heavy blaster pistol: deixa de ser imprecisa. Hold-out: +2 no ataque contra alvo que ainda não agiu no encontro. (Automático.)", { text: "Proficiente com pistolas", feats: ["weapon-proficiency-pistols"] }),
  feat("Predictive Defense", "predictive-defense", "Usa o modificador de Destreza ou de Inteligência (o maior) na Defesa de Reflexos (limitado pela armadura). (Automático.)", { text: "Int 13", abilities: { int: 13 } }),
  feat("Resilient Strength", "resilient-strength", "Usa o modificador de Força ou de Constituição (o maior) na Defesa de Fortitude. (Automático.)", { text: "For 13", abilities: { str: 13 } }),
  feat("Riflemaster", "riflemaster", "Blaster carbine: pode ser apoiada (brace) em fogo automático. Blaster rifle: é precisa. Heavy blaster rifle: dados passam de d10 para d12. Light repeating blaster: é tratada como arma Média. (Automático.)", { text: "Proficiente com rifles", feats: ["weapon-proficiency-rifles"] }),
  feat("Risk Taker", "risk-taker", "Só cai de uma escalada se falhar em Climb por 10 ou mais. Se falhar num Jump, pode gastar um Ponto da Força e somar o resultado à distância."),
  feat("Sport Hunter", "sport-hunter", "Slugthrower pistol: +1 dado em alcance à queima-roupa. Slugthrower rifle: dados passam de d8 para d12. Sporting blaster pistol: rerrola 1s no dano. Sporting blaster rifle: +1 no ataque ao mirar. (Automático.)", { text: "Proficiente com a arma" }),
  feat("Staggering Attack", "staggering-attack", "Ataque corpo a corpo com −2: se causar dano, o alvo sofre −2 em perícias até o fim do seu próximo turno; ou −5 no ataque para −5 em perícias. (Opção no diálogo de ataque; o efeito vai junto do botão de dano.)", { text: "Proficiente com a arma, BBA +1", bab: 1 }),
  feat("Steadying Position", "steadying-position", "Caído e mirando, o alvo do seu ataque à distância perde o bônus de Destreza na Reflexos. (Automático.)", { text: "Careful Shot", feats: ["careful-shot"] })
];

const martial = [
  feat("Echani Training", "echani-training", "Se fizer apenas um ataque desarmado no turno, soma o dobro do bônus de Força ao dano (mín. +1). 1/encontro, ao causar dano desarmado, ataque livre contra a Fortitude: se acertar, o alvo (até 1 tamanho maior) fica caído. (Opção no diálogo.)", { text: "Des 13, Martial Arts I", abilities: { dex: 13 }, feats: ["martial-arts-i"] }, { img: MA, folder: "Galaxy at War — Artes Marciais" }),
  feat("Hijkata Training", "hijkata-training", "1/rodada, quando um inimigo adjacente o fere em corpo a corpo, faça um ataque de oportunidade desarmado com −5. 1/encontro, se esse ataque causar dano, o inimigo sofre −Des (mín. 1) nos ataques até o fim do próximo turno dele.", { text: "Combat Reflexes, Martial Arts I", feats: ["combat-reflexes", "martial-arts-i"] }, { img: MA, folder: "Galaxy at War — Artes Marciais" }),
  feat("K'tara Training", "ktara-training", "+1 dado de dano desarmado contra alvo surpreso (um ataque por turno; automático). 1/encontro, ao ferir alvo sem Destreza, segundo ataque desarmado contra a Fortitude: se acertar, ele não pode falar (efeito atordoante).", { text: "Martial Arts I, treinado em Stealth", feats: ["martial-arts-i"], trained: ["stealth"] }, { img: MA, folder: "Galaxy at War — Artes Marciais" }),
  feat("K'thri Training", "kthri-training", `1/rodada, ação rápida: um ataque desarmado que causa só o dano base (sem Força nem nível). 1/encontro, ao errar um ataque desarmado, causa metade do dano mesmo assim. ${LIGHT}`, { text: "Dual Weapon Mastery I, Martial Arts I", feats: ["dual-weapon-mastery-i", "martial-arts-i"] }, { img: MA, folder: "Galaxy at War — Artes Marciais" }),
  feat("Stava Training", "stava-training", `Agarra como se fosse 1 tamanho maior (+1 categoria no modificador de agarrar). Ao acertar um ataque desarmado em investida, faz um ataque livre de agarrar (grab). ${LIGHT}`, { text: "Martial Arts I, Running Attack", feats: ["martial-arts-i", "running-attack"] }, { img: MA, folder: "Galaxy at War — Artes Marciais" }),
  feat("Tae-Jitsu Training", "tae-jitsu-training", "Crítico desarmado: o dado de dano sobe 1 passo (máx. d12). 1/encontro, após um ataque desarmado bem-sucedido, ação rápida para designar um adversário principal: seu Dodge vale contra ele e contra outro inimigo até o fim do encontro.", { text: "Dodge, Martial Arts I, treinado em Initiative", feats: ["dodge", "martial-arts-i"], trained: ["initiative"] }, { img: MA, folder: "Galaxy at War — Artes Marciais" }),
  feat("Teräs Käsi Training", "teras-kasi-training", "1/rodada, ao acertar um ataque desarmado, o Limiar de Dano do alvo é reduzido em 5 para esse ataque. (Opção no diálogo.)", { text: "For 13, Martial Arts I", abilities: { str: 13 }, feats: ["martial-arts-i"] }, { img: MA, folder: "Galaxy at War — Artes Marciais" }),
  feat("Wrruushi Training", "wrruushi-training", `1/rodada, ao acertar um ataque desarmado, recebe PV temporários iguais ao mod. de Constituição (até o fim do encontro, não acumulam). 1/encontro, ataque desarmado contra a Fortitude: se acertar, o alvo perde o bônus de equipamento na Fortitude até o fim do encontro. ${LIGHT}`, { text: "Con 13, Martial Arts I, Wookiee", abilities: { con: 13 }, feats: ["martial-arts-i"], species: ["wookiee"] }, { img: MA, folder: "Galaxy at War — Artes Marciais" })
];

const SKILL_NAME = { swim: "Swim", climb: "Climb", stealth: "Stealth", treatInjury: "Treat Injury", ride: "Ride", acrobatics: "Acrobatics", useComputer: "Use Computer", mechanics: "Mechanics", endurance: "Endurance", jump: "Jump", pilot: "Pilot", perception: "Perception", survival: "Survival" };
const teamDefs = [
  ["Aquatic Specialists", "aquatic-specialists", "swim", "Pode nadar à metade do deslocamento com uma ação de movimento."],
  ["Ascension Specialists", "ascension-specialists", "climb", "Pode escalar à metade do deslocamento com uma ação de movimento."],
  ["Covert Operatives", "covert-operatives", "stealth", "Reduz em 2 as penalidades de Stealth por movimento."],
  ["Medical Team", "medical-team", "treatInjury", "Ao ajudar outro (aid another) em Treat Injury, o paciente recupera +4 PV."],
  ["Mounted Regiment", "mounted-regiment", "ride", "1/rodada, reação: teste de Ride para negar um ataque contra sua montaria."],
  ["Nimble Team", "nimble-team", "acrobatics", "Ao se esquivar (tumble), pode mover 1 quadrado adicional."],
  ["Slicer Team", "slicer-team", "useComputer", "Ajudar outro em Use Computer concede +4 em vez de +2."],
  ["Technical Experts", "technical-experts", "mechanics", "Ajudar outro em Mechanics concede +4 em vez de +2."],
  ["Tireless Squad", "tireless-squad", "endurance", "Ajudar outro em Endurance concede +4 em vez de +2."],
  ["Unhindered Approach", "unhindered-approach", "jump", "Ao saltar, percorre 1 quadrado adicional."],
  ["Unified Squadron", "unified-squadron", "pilot", "Evita automaticamente colisões com aliados que também tenham este feat."],
  ["Wary Sentries", "wary-sentries", "perception", "Pode escolher 10 em Perception mesmo sob pressão."],
  ["Wilderness Specialists", "wilderness-specialists", "survival", "Ajudar outro em Survival concede +4 em vez de +2."]
];
const team = teamDefs.map(([name, key, skill, extra]) => feat(name, key,
  `Feat de equipe: +3 de competência em ${SKILL_NAME[skill]} (automático), +1 por aliado a até 12 quadrados que também tenha este feat (máx. +7 no total; some no campo de bônus do teste). ${extra}`,
  { text: `Treinado em ${SKILL_NAME[skill]}`, trained: [skill] },
  { img: TEAM, folder: "Galaxy at War — Equipe", modifiers: [mod(`skills.${skill}`, 3, "competence")] }));

export default [...general, ...martial, ...team];

/** Feats adicionais nas listas de feats bônus das classes base (Galaxy at War, p.18-21). */
export const CLASS_BONUS_FEATS = {
  jedi: ["battering-attack", "dive-for-cover", "fight-through-pain", "force-of-personality", "mission-specialist", "never-surrender", "officer-candidacy-training", "resilient-strength", "risk-taker", "staggering-attack"],
  noble: ["disabler", "fight-through-pain", "force-of-personality", "mission-specialist", "predictive-defense", "sport-hunter"],
  scoundrel: ["bantha-herder", "disabler", "fight-through-pain", "force-of-personality", "mission-specialist", "opportunistic-shooter", "pistoleer", "predictive-defense", "steadying-position"],
  scout: ["destructive-force", "disabler", "dive-for-cover", "forceful-blast", "fortifying-recovery", "mission-specialist", "never-surrender", "opportunistic-shooter", "pistoleer", "resilient-strength", "riflemaster", "risk-taker", "sport-hunter", "steadying-position"],
  soldier: ["bantha-herder", "battering-attack", "destructive-force", "disabler", "dive-for-cover", "forceful-blast", "fortifying-recovery", "mission-specialist", "never-surrender", "officer-candidacy-training", "opportunistic-shooter", "pistoleer", "resilient-strength", "riflemaster", "risk-taker", "sport-hunter", "staggering-attack", "steadying-position"]
};
