// Scum and Villainy — Cap. 1: feats (Tabela 1-4). Benefícios resumidos.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
const feat = (name, key, benefit, pre = {}, o = {}) => ({
  name, type: "feat", img: "icons/skills/targeting/crosshair-pointed-orange.webp",
  system: {
    key, description: `<p>${benefit}</p>`, source: "Scum and Villainy",
    prerequisites: P(pre), choice: { type: o.choice ?? "", value: "", options: [] },
    repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], grantedBy: ""
  },
  folder: "Scum and Villainy"
});
const SHAPE = ["clawdite"];
const TECH = "Tech Specialist (feat do Starships of the Galaxy, ainda não incluído)";

export default [
  feat("Burst of Speed", "burst-of-speed", "Ação de movimento: move até o dobro do deslocamento; ao fim do movimento, desce −1 passo na trilha de condição. (Botão ⚡.)", { text: "Treinado em Endurance", trained: ["endurance"] }),
  feat("Close Combat Escape", "close-combat-escape", "Ao escapar de um agarrão com Acrobatics, ação rápida: um ataque corpo a corpo ou desarmado contra quem o agarrava; se acertar, causa dano normal e ele fica surpreso até o início do próximo turno dele.", { text: "Treinado em Acrobatics", trained: ["acrobatics"] }),
  feat("Collateral Damage", "collateral-damage", "Ao ferir com Rapid Shot num ataque que não seja de área, faz um segundo ataque com −2 contra outro alvo a até 2 quadrados do primeiro; se acertar, causa metade do dano do primeiro ataque.", { text: "Rapid Shot, BBA +6", feats: ["rapid-shot"], bab: 6 }),
  feat("Cornered", "cornered", "Ameaçado por um oponente e sem poder fazer withdraw, +2 nas jogadas de ataque contra os oponentes que o ameaçam."),
  feat("Deadly Sniper", "deadly-sniper", "Atacando à distância um alvo que não percebeu sua presença, +2 no ataque e +1 dado de dano no primeiro ataque de cada turno. (Opção no diálogo: Alvo surpreso.)", { text: "Sniper, treinado em Stealth, BBA +9", feats: ["sniper"], trained: ["stealth"], bab: 9 }),
  feat("Deceptive Drop", "deceptive-drop", "Na rodada de surpresa, ao ferir um alvo surpreso, se o ataque também superar a Fortitude dele (com o modificador de tamanho: Colossal +50, Gigantesco +20, Enorme +10, Grande +5), ele fica caído.", { text: "Treinado em Initiative", trained: ["initiative"] }),
  feat("Desperate Gambit", "desperate-gambit", "1/encontro, ao errar um ataque, rerrola sofrendo −2 na Reflexos até o fim do seu próximo turno; se o primeiro foi 1 natural, ainda pode, com −5 na Reflexos. Fica com o segundo resultado."),
  feat("Duck and Cover", "duck-and-cover", "1/turno, quando é alvo de um ataque de área que erra, move 2 quadrados como reação, sem provocar.", { text: "Treinado em Stealth", trained: ["stealth"] }),
  feat("Fleet-Footed", "fleet-footed", "Movendo-se antes e depois de um ataque com Running Attack, +2 quadrados de deslocamento até o fim do turno.", { text: "Running Attack", feats: ["running-attack"] }),
  feat("Friends in Low Places", "friends-in-low-places", "Pode usar Gather Information no lugar de Knowledge (bureaucracy) para obter licenças de itens restritos ou militares; reduz em 1 o multiplicador de custo do mercado negro desses itens.", { text: "Treinado em Gather Information", trained: ["gatherInformation"] }),
  feat("Hasty Modification", "hasty-modification", `Com 1 minuto e Mechanics CD 20, troca um traço aplicado com Tech Specialist por outro até o fim do encontro (depois o item perde os traços adquiridos assim). Requer ${TECH}.`),
  feat("Hideous Visage", "hideous-visage", "1/encontro, ação rápida: Deception contra a Vontade de um oponente que o veja; se vencer, ele é empurrado 1 quadrado para longe e sofre −1 em todos os ataques até o início do seu próximo turno (medo, afeta a mente).", { text: "Traço Shapeshift", species: SHAPE }),
  feat("Impersonate", "impersonate", "Usa Deception para mudar as feições e a voz e imitar uma pessoa específica; é sempre uma aparência enganosa Moderada.", { text: "Traço Shapeshift, Skill Focus (Deception)", species: SHAPE, feats: ["skill-focus:deception"] }),
  feat("Impetuous Move", "impetuous-move", "Ao usar o second wind, pode recuperar só metade dos PV e mover imediatamente até metade do deslocamento, sem provocar.", { text: "Con 13", abilities: { con: 13 } }),
  feat("Impulsive Flight", "impulsive-flight", "Ao fazer withdraw, move 1 quadrado adicional."),
  feat("Knife Trick", "knife-trick", "Num ataque de oportunidade, pode sacar uma arma escondida no corpo e fazer o ataque com ela.", { text: "Lightning Draw, treinado em Stealth", feats: ["lightning-draw"], trained: ["stealth"] }),
  feat("Lightning Draw", "lightning-draw", "1/encontro, saca uma arma no coldre e ataca com ela como uma única ação padrão.", { text: "Quick Draw", feats: ["quick-draw"] }),
  feat("Metamorph", "metamorph", "Rodada completa: muda de tamanho uma categoria (Pequeno: +1 Reflexos, +5 Stealth, carga 3/4; Grande: −1 Reflexos, −5 Stealth, carga dobrada, +5 no Limiar, +1 de alcance) por rodadas iguais ao valor de Constituição por dia.", { text: "Con 13, traço Shapeshift, treinado em Deception", abilities: { con: 13 }, species: SHAPE, trained: ["deception"] }),
  feat("Opportunistic Retreat", "opportunistic-retreat", "Quando um oponente provoca um ataque de oportunidade seu, 1/turno pode abrir mão dele para mover até metade do deslocamento sem provocar.", { text: "Combat Reflexes", feats: ["combat-reflexes"] }),
  feat("Resurgence", "resurgence", "Ao usar o second wind, recebe imediatamente uma ação de movimento.", { text: "Treinado em Endurance", trained: ["endurance"] }),
  feat("Signature Device", "signature-device", `Designa uma arma, armadura, veículo ou outro item como item de assinatura: escolhe 10 ao modificá-lo e ele pode ter dois traços de Tech Specialist (só um ativo; ação rápida para trocar). Requer ${TECH}.`),
  feat("Slippery Maneuver", "slippery-maneuver", "Aplica o Dodge contra ataques de dois oponentes; com withdraw, pode usar o Dodge para mover até o deslocamento inteiro (ainda provoca do alvo do Dodge se passar por mais de 1 quadrado ameaçado).", { text: "Dodge", feats: ["dodge"] }),
  feat("Staggering Attack (Scum and Villainy)", "staggering-attack-snv", "Quando causaria dano extra com um feat ou talento que concede dados extras (Sneak Attack, Rapid Shot, Rapid Strike), pode abrir mão de cada dado extra para mover o alvo 2 quadrados, sem provocar.", { text: "Sneak Attack, Rapid Shot ou Rapid Strike" }),
  feat("Stay Up", "stay-up", "1/encontro, quando sofreria dano de um ataque, pode sofrer só metade e descer −1 passo na trilha de condição. (Botão ⚡ aplica o passo.)", { text: "Treinado em Endurance", trained: ["endurance"] }),
  feat("Superior Tech", "superior-tech", `Instala traços avançados (Tabela 1-5: armaduras, dispositivos, droides, veículos ou armas) ao modificar o tipo escolhido; custo de 1/5 do item ou 2.000 cr, 1 dia por 1.000 cr e Mechanics CD 30. Repetível. Requer Int 17, nível 9 e ${TECH}.`, { text: "Int 17, Tech Specialist, nível 9", abilities: { int: 17 }, level: 9 }, { repeatable: true }),
  feat("Tactical Advantage", "tactical-advantage", "Ao ferir um oponente com ataque de oportunidade, move 1 quadrado em qualquer direção, sem provocar.", { text: "Combat Reflexes", feats: ["combat-reflexes"] }),
  feat("Wicked Strike", "wicked-strike", "Ao ferir com Rapid Strike um único alvo (ataque que não seja de área), faz um segundo ataque com −2 contra outro alvo ao alcance; se acertar, causa metade do dano do primeiro.", { text: "Rapid Strike", feats: ["rapid-strike"] })
];

// O livro não amplia as listas de feats bônus das classes base.
