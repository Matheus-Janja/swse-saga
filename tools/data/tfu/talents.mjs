// The Force Unleashed Campaign Guide — talentos novos (Caps. 2-3). Textos resumidos.
const SRC = "The Force Unleashed Campaign Guide";
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
const IMG = { talent: "icons/magic/symbols/star-yellow.webp", forceTalent: "icons/magic/control/silhouette-aura-energy.webp" };
let TREE = "";
let CAT = "talent";
const tree = (n, c = "talent") => { TREE = n; CAT = c; };
const t = (name, key, text, pre = {}, o = {}) => ({
  name, type: "talent", img: IMG[CAT],
  system: { key, tree: TREE, category: CAT, classes: [], source: SRC, description: `<p>${text}</p>`, prerequisites: P(pre),
    choice: { type: o.choice ?? "", value: "", options: [] }, repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], rerolls: o.rerolls ?? [] }
});
const pre = (text, o = {}) => ({ text, ...o });
const T = (text, ...k) => ({ text, talents: k });
const TR = (text, ...k) => ({ text, trained: k });
const mod = (target, value, type = "insight") => ({ target, value: String(value), type, label: "", disabled: false });
const out = [];
const push = (...x) => out.push(...x);

/* ---------------- Jedi ---------------- */
tree("Jedi Consular");
push(
  t("Cleanse Mind", "cleanse-mind", "1/turno, ação rápida: remove um efeito mental contínuo (Demand Surrender, Weaken Resolve, efeitos contínuos de Adept Negotiator, o movimento de mind trick etc.) de um aliado em linha de visão."),
  t("Force of Will", "force-of-will", "+2 de intuição na Vontade. Além disso, ação rápida e 1 Ponto da Força: aliados a até 6 quadrados recebem +2 na Vontade pelo resto do encontro (precisam permanecer a até 6 quadrados e perdem o bônus se você cair inconsciente ou morrer). Efeito mental.", {}, { modifiers: [mod("defenses.will", 2)] })
);
tree("Jedi Guardian");
push(
  t("Forceful Warrior", "forceful-warrior", "Ao acertar um crítico com sabre de luz, ganha 1 Ponto da Força temporário, perdido se não for usado até o fim do encontro."),
  t("Mobile Combatant (Jedi)", "mobile-combatant-tfu", "Ao terminar o movimento adjacente a um oponente, ação rápida: até o início do seu próximo turno, se ele se mover ou recuar, você pode acompanhá-lo até seu deslocamento total (terminando adjacente). A menos que ele use recuo ou Acrobatics, o primeiro quadrado movido provoca ataque de oportunidade seu.")
);
tree("Jedi Sentinel");
push(
  t("Dampen Presence", "dampen-presence", "Ação rápida ao interagir com uma criatura: ao terminar a interação, faz Use the Force contra a Vontade dela; se superar, ela não se lembra de ter interagido com você. Alvos de nível maior que o seu recebem +5 na Vontade. Efeito mental."),
  t("Steel Resolve", "steel-resolve", "Ao fazer um ataque corpo a corpo (ação padrão), aceita −1 a −5 no ataque e recebe o dobro disso (+2 a +10) de intuição na Vontade, até o seu BBA, até o início do próximo turno.")
);

/* ---------------- Noble ---------------- */
tree("Inspiration");
push(t("Willpower", "willpower", "1/encontro, ação rápida: aliados em linha de visão recebem +2 de moral na Vontade pelo resto do encontro (não precisam continuar em linha de visão). Não se aplica a você.", T("Inspire Confidence", "inspire-confidence")));
tree("Ideologue");
push(
  t("Instruction", "instruction", "1/encontro, ação padrão: um aliado a até 6 quadrados faz um teste de perícia usando o seu modificador (exceto Use the Force), antes do fim do encontro. Pode ser escolhido várias vezes (+1 uso por encontro cada).", {}, { repeatable: true }),
  t("Idealist", "idealist", "Soma o bônus de Carisma no lugar do de Sabedoria na Vontade.", { text: "Car 13", abilities: { cha: 13 } }),
  t("Know Your Enemy", "know-your-enemy", "Ação rápida: Knowledge (galactic lore) CD 15 + NC de um inimigo em linha de visão; se passar, descobre duas informações: BBA ou bônus de ataque com uma arma, uma defesa, um modificador de perícia, ou se ele tem um talento ou feat (o Mestre revela)."),
  t("Known Dissident", "known-dissident", "Ação padrão: Persuasion contra a Vontade de um oponente que possa ouvi-lo e entendê-lo, em linha de visão; se superar, ele não pode atacar você nem o veículo em que você está até o início do seu próximo turno (+5 na Vontade se for de nível maior). Termina se o alvo for atacado. Efeito mental.", T("Know Your Enemy", "know-your-enemy")),
  t("Lead by Example (Ideologue)", "lead-by-example-tfu", "1/encontro, ao causar dano a um inimigo: todos os aliados recebem +1 de circunstância no ataque e +1 dado de dano em ataques que não sejam de área contra esse alvo pelo resto do encontro.")
);
tree("Lineage");
push(
  t("Influential Friends", "influential-friends", "1/dia, um contato faz um teste de perícia por você, sempre escolhendo 20 (mesmo onde normalmente não pode), com modificador 5 + metade do seu nível heroico. Leva 10 × o resultado em minutos. Exige meio de comunicação interplanetária.", T("Connections", "connections")),
  t("Powerful Friends", "powerful-friends", "Você tem um contato poderoso (senador, oficial graduado, governador, chefe do crime). 1/encontro, invocando o nome ou cargo dele, escolhe 20 num teste de Persuasion sem gastar tempo extra.", T("Connections, Influential Friends", "connections", "influential-friends"))
);

/* ---------------- Scoundrel ---------------- */
tree("Slicer");
push(
  t("Electronic Forgery", "electronic-forgery", "Usa o modificador de Use Computer no lugar do de Deception para forjar documentos eletrônicos.", TR("treinado em Use Computer", "useComputer")),
  t("Electronic Sabotage", "electronic-sabotage", "Ação padrão: tranca um terminal com Use Computer; o computador fica hostil a qualquer outro usuário e o resultado do seu teste substitui a Vontade dele para mudar sua atitude (até alguém torná-lo indiferente). Não pode escolher 20.", TR("treinado em Use Computer", "useComputer")),
  t("Security Slicer", "security-slicer", "Desativa sistemas de segurança com Mechanics sem kit de segurança; algo só dá errado se falhar por 10 ou mais.", TR("treinado em Mechanics", "mechanics"))
);
tree("Smuggling");
push(
  t("Art of Concealment", "art-of-concealment", "Pode escolher 10 em Stealth para esconder um item mesmo sob pressão, e esconder um item como ação rápida."),
  t("Fast Talker", "fast-talker", "1/dia, escolhe 20 num teste de Deception para enganar, como ação padrão.", T("Art of Concealment", "art-of-concealment")),
  t("Hidden Weapons", "hidden-weapons", "Se sacar uma arma escondida e atacar um alvo que não a notou na mesma rodada, ele está desprevenido contra você. Saca item escondido ou guardado como ação de movimento (ação rápida com Quick Draw).", T("Art of Concealment", "art-of-concealment")),
  t("Illicit Dealings", "illicit-dealings", "Rerrola Persuasion para negociar itens restritos, militares ou ilegais, ficando com o melhor resultado."),
  t("Surprise Strike", "surprise-strike", "Se falhar num teste de Deception para passar informação falsa, pode iniciar o combate e fazer um ataque desarmado como ação livre na rodada surpresa (ou com arma, se tiver Quick Draw); os demais combatentes ficam surpresos mesmo sabendo de você.")
);

/* ---------------- Scout ---------------- */
tree("Awareness");
push(t("Reset Initiative", "reset-initiative", "1/encontro, após a primeira rodada completa, redefine sua Iniciativa para o valor atual +5.", { text: "Acute Senses, Improved Initiative, treinado em Initiative", talents: ["acute-senses", "improved-initiative"], trained: ["initiative"] }));
tree("Spy");
push(
  t("Blend In (Spy)", "blend-in-tfu", "Usa o modificador de Stealth no lugar do de Deception para criar uma aparência enganosa (disfarce); é considerado treinado em Deception para isso e pode rerrolar Stealth onde rerrolaria Deception."),
  t("Incognito", "incognito", "Rerrola Deception para criar uma aparência enganosa (mesmo sem disfarce), ficando com o melhor.", T("Blend In", "blend-in-tfu")),
  t("Improved Surveillance", "improved-surveillance", "Ao usar Surveillance com sucesso, você e seus aliados também recebem +1 de intuição em todas as defesas contra o alvo.", { text: "Surveillance, treinado em Perception", talents: ["surveillance"], trained: ["perception"] }),
  t("Intimate Knowledge", "intimate-knowledge", "1/encontro, ação padrão: escolhe 20 num teste de Knowledge em que é treinado, ou 10 num em que não é (mesmo onde normalmente não poderia).", T("Surveillance", "surveillance")),
  t("Surveillance", "surveillance", "Rodada completa: Perception contra um alvo em linha de visão (CD 15 ou o Stealth dele, o maior); se passar, você e aliados em linha de visão recebem +2 de intuição nos ataques contra ele até o fim do seu próximo turno (aliados precisam ouvi-lo e entendê-lo).", TR("treinado em Perception", "perception")),
  t("Traceless Tampering", "traceless-tampering", "Ao desativar dispositivos com Mechanics, não deixa rastro automaticamente (sem aumento de CD) e só dá errado se falhar por 10 ou mais.")
);

/* ---------------- Soldier ---------------- */
tree("Mercenary");
push(
  t("Commanding Presence (Mercenary)", "commanding-presence-tfu", "1/encontro, ação rápida: até o fim do encontro, inimigos a até 6 quadrados sofrem −2 na Vontade (efeito mental de medo). Persuasion vira perícia de classe."),
  t("Dirty Fighting", "dirty-fighting", "1/encontro, ao causar dano com ataque corpo a corpo ou à distância, reduz o Limiar de Dano do alvo em 2 pelo resto do encontro."),
  t("Feared Warrior", "feared-warrior", "Ao reduzir um inimigo a 0 PV, Persuasion como ação livre contra todos os alvos a até 6 quadrados; quem tiver a Vontade superada sofre −2 nos ataques pelo resto do encontro (1/encontro por alvo; efeito mental de medo).", T("Commanding Presence", "commanding-presence-tfu")),
  t("Focused Warrior", "focused-warrior", "Ao causar dano em combate, +5 de moral na Vontade até o início do próximo turno; perde o bônus se estiver surpreso ou desprevenido."),
  t("Ruthless (Mercenary)", "ruthless-tfu", "Ao causar dano acima do Limiar de Dano com ataque corpo a corpo ou à distância, +2 nas jogadas de dano contra esse alvo pelo resto do encontro.", T("Dirty Fighting", "dirty-fighting"))
);

/* ---------------- Classes de prestígio existentes ---------------- */
tree("Bounty Hunter");
push(
  t("Fearsome", "fearsome", "Oponentes a até 6 quadrados de nível igual ou menor que o seu nível heroico sofrem −1 nos ataques contra você.", T("Notorious", "notorious")),
  t("Signature Item", "signature-item", "Escolha uma arma, armadura, veículo, nave ou outro item: usando-o, +2 de moral em testes resistidos. Pode ser escolhido várias vezes (outro item; os bônus de itens múltiplos se somam, +1 por item extra).", {}, { repeatable: true }),
  t("Jedi Hunter", "jedi-hunter", "+1 de intuição na Fortitude e na Vontade e +1 dado de dano contra personagens com Force Sensitivity.")
);
tree("Critical Master");
push(
  t("Deny Move", "deny-move", "Ao acertar um crítico corpo a corpo ou à distância, o alvo não pode se mover no próximo turno.", T("Reduce Mobility", "reduce-mobility")),
  t("Extended Critical Range (heavy weapons)", "extended-critical-range-heavy-weapons", "Com armas pesadas, margem de crítico +1 (19-20); só o 20 natural acerta automaticamente.", { text: "BBA +10, Weapon Proficiency (heavy weapons)", bab: 10, feats: ["weapon-proficiency-heavy"] }),
  t("Extended Critical Range (rifles)", "extended-critical-range-rifles", "Com rifles, margem de crítico +1 (19-20); só o 20 natural acerta automaticamente.", { text: "BBA +10, Weapon Proficiency (rifles)", bab: 10, feats: ["weapon-proficiency-rifles"] }),
  t("Flurry Attack", "flurry-attack", "Escolha um grupo de armas (ou arma exótica) em que é proficiente: ao acertar um crítico com ela, faz imediatamente um ataque extra contra um alvo ao alcance (1/turno). Pode ser escolhido várias vezes, para grupos diferentes.", {}, { repeatable: true, choice: "weaponGroup" }),
  t("Knockback", "knockback", "Ao acertar um crítico num alvo até duas categorias maior que você, ação livre: move-o 1 quadrado em qualquer direção (não se estiver agarrado, nem para dentro de objetos sólidos ou de outra criatura)."),
  t("Reduce Defense", "reduce-defense", "Ao acertar um crítico corpo a corpo ou à distância, o alvo sofre −2 na Reflexos até ser totalmente curado."),
  t("Reduce Mobility", "reduce-mobility", "Ao acertar um crítico corpo a corpo ou à distância, o deslocamento do alvo cai pela metade até ser totalmente curado.")
);
tree("Imperial Inquisitor");
push(
  t("Cower Enemies", "cower-enemies", "Ao intimidar com Persuasion, pode intimidar todos os alvos num cone de 6 quadrados em vez de um só.", T("Force Interrogation", "force-interrogation")),
  t("Force Interrogation", "force-interrogation", "Ao causar dano com um poder da Força, faz imediatamente Persuasion como ação livre para intimidar um dos alvos atingidos."),
  t("Inquisition", "inquisition", "+1 nos ataques e +1 dado de dano contra alvos com Force Sensitivity."),
  t("Unsettling Presence", "unsettling-presence", "Ação padrão, 1 Ponto da Força: aura de desconforto; quem entrar a até 6 quadrados tem a Vontade comparada ao seu Use the Force da ativação e, se superada, sofre −2 em ataques e perícias enquanto estiver a até 6 quadrados. Dura o encontro.", T("Force Interrogation", "force-interrogation"))
);
tree("Duelist");
push(
  t("Improved Lightsaber Throw", "improved-lightsaber-throw", "Ação padrão, 1 Ponto da Força: arremessa o sabre num ataque de área contra todos numa linha de 6 quadrados; dano normal em quem tiver a Reflexos superada, metade nos demais. Recupera o sabre com ação rápida e Use the Force CD 20.", T("Lightsaber Throw", "lightsaber-throw")),
  t("Thrown Lightsaber Mastery", "thrown-lightsaber-mastery", "Alvos atingidos pelo seu sabre arremessado movem à metade do deslocamento até o início do seu próximo turno.", T("Improved Lightsaber Throw, Lightsaber Throw", "improved-lightsaber-throw", "lightsaber-throw"))
);

/* ---------------- Novas classes de prestígio ---------------- */
tree("Enforcement");
push(
  t("Cover Bracing", "cover-bracing", "Apoia (brace) uma arma em autofire com uma única ação rápida (em vez de duas) se estiver adjacente a um objeto que lhe dá cobertura contra todos os quadrados-alvo."),
  t("Intentional Crash", "intentional-crash", "Ao abalroar um veículo em movimento e causar dano, seu veículo sofre metade do dano do choque; se o alvo for do mesmo tamanho ou menor, não pode se mover na rodada seguinte.", TR("treinado em Pilot", "pilot")),
  t("Nonlethal Tactics", "nonlethal-tactics", "Com arma à distância em atordoamento, granadas atordoantes, redes ou bastões atordoantes: +1 no ataque e +1 dado de dano de atordoamento."),
  t("Pursuit", "pursuit", "Correndo, não precisa seguir em linha reta e pode rerrolar Endurance, ficando com o melhor.", { text: "Des 13", abilities: { dex: 13 } }),
  t("Respected Officer", "respected-officer", "Sua reputação faz aliados e inimigos o tratarem com respeito: melhora automaticamente a atitude de um personagem indiferente para amistoso."),
  t("Slowing Stun", "slowing-stun", "Ao mover um alvo −1 passo ou mais na trilha com um ataque, o deslocamento dele cai pela metade até remover todas as condições."),
  t("Takedown", "takedown", "Ao causar dano com um ataque corpo a corpo no fim de uma investida, derruba o alvo (se ele não for mais de uma categoria maior que você).")
);
tree("Autonomy");
push(
  t("Defensive Electronics", "defensive-electronics", "Quando alguém tenta reprogramá-lo, soma seu nível de classe à Vontade."),
  t("Ion Resistance 10", "ion-resistance-10", "RD 10 contra dano iônico."),
  t("Soft Reset", "soft-reset", "Se for levado ao fim da trilha de condição por qualquer meio que não dano acima do Limiar, sobe automaticamente +1 passo após 2 rodadas."),
  t("Modification Specialist", "modification-specialist", "Não sofre o −5 normal em Mechanics e Use Computer para se reprogramar ou se automodificar."),
  t("Repair Self", "repair-self", "Ao se consertar (aplicação repair droid de Mechanics), recupera 1 PV adicional por ponto acima da CD.")
);
tree("Specialized Droid");
push(
  t("Computer Language", "computer-language", "Usa o modificador de Persuasion no lugar do de Use Computer (considerado treinado); pode rerrolar Persuasion onde rerrolaria Use Computer.", { text: "saber o idioma Binary" }),
  t("Computer Master", "computer-master", "Rerrola qualquer teste resistido de Use Computer, ficando com o melhor."),
  t("Enhanced Manipulation", "enhanced-manipulation", "Pode escolher 10 em perícias de Destreza mesmo ameaçado ou quando normalmente não poderia.", { text: "Des 15", abilities: { dex: 15 } }),
  t("Hotwired Processor", "hotwired-processor", "Ação rápida: +5 de circunstância em perícias de Inteligência e Sabedoria e +1 nos ataques à distância por rodadas iguais a ½ nível. Ao fim, −1 passo persistente até ser consertado (repair droid)."),
  t("Power Surge", "power-surge", "Ação rápida: +1 de circunstância nos ataques corpo a corpo, +1 dado de dano corpo a corpo e +2 quadrados de deslocamento por rodadas iguais a ½ nível. Ao fim, −1 passo persistente até ser consertado."),
  t("Skill Conversion", "skill-conversion", "Ao se reprogramar, troca uma perícia treinada por um feat Skill Focus bônus (cumprindo os pré-requisitos). Uma vez por reprogramação.")
);
tree("Infiltration");
push(
  t("Always Ready", "always-ready", "Quando sua ação preparada é disparada, sua contagem de Iniciativa não muda.", TR("treinado em Initiative", "initiative")),
  t("Concealed Weapon Expert", "concealed-weapon-expert", "1/rodada, ação rápida: rerrola um ataque com golpe desarmado, blaster de bolso, adaga, vibroadaga ou outra arma pequena e escondível (a critério do Mestre), ficando com o segundo resultado."),
  t("Creeping Approach", "creeping-approach", "Ação rápida: um oponente a até 12 quadrados que não saiba de você não pode fazer Perception para notá-lo até o início do seu próximo turno, mesmo que você entre na linha de visão dele. Termina se você ou um aliado atacá-lo.", TR("treinado em Stealth", "stealth")),
  t("Set for Stun", "set-for-stun", "Com arma à distância que causa atordoamento, duas ações rápidas consecutivas na mesma rodada: se o dano de atordoamento do próximo ataque superar o Limiar do alvo, ele desce −3 passos (em vez de −2). Perde o efeito se perder linha de visão ou fizer outra ação antes."),
  t("Silent Takedown", "silent-takedown", "Ao causar dano a um oponente que não sabe de você, ele não pode falar nem fazer barulho até o fim do próximo turno dele (efeito atordoante).", TR("treinado em Stealth", "stealth"))
);
tree("Bothan Spynet");
push(
  t("Bothan Resources", "bothan-resources", "Gather Information CD 20: compra armas, equipamento e transporte padrão a 50% do preço, e exóticos ou restritos a 75%.", T("Spynet Agent", "spynet-agent")),
  t("Knowledge Is Life", "knowledge-is-life", "Ação rápida: Knowledge (galactic lore) CD 15 + NC de um alvo em linha de visão; se passar, +2 de moral numa Defesa à escolha contra ele pelo resto do encontro.", T("Spynet Agent", "spynet-agent")),
  t("Knowledge Is Power", "knowledge-is-power", "Ação rápida: Knowledge (galactic lore) CD 15 + NC de um alvo em linha de visão; se passar, acerta crítico contra ele com 19-20 natural pelo resto do encontro (aumenta em 1 outras margens ampliadas). Só o 20 natural acerta automaticamente.", T("Spynet Agent", "spynet-agent")),
  t("Knowledge Is Strength", "knowledge-is-strength", "Ação rápida: Knowledge (galactic lore) CD 15 + NC de um alvo em linha de visão; se passar, +2 de moral nos ataques contra ele pelo resto do encontro.", T("Spynet Agent", "spynet-agent")),
  t("Six Questions", "six-questions", "Ação rápida: Knowledge (galactic lore) CD 15 + NC de um alvo; se passar, descobre o nível, as classes, os atributos e os Pontos da Força e de Destino dele.", T("Spynet Agent", "spynet-agent")),
  t("Spynet Agent", "spynet-agent", "Usa o modificador de Gather Information no lugar do de Knowledge (galactic lore) (considerado treinado); pode rerrolar Gather Information onde rerrolaria Knowledge (galactic lore).", { text: "espécie Bothan, ou dois talentos de Infiltration", talentTrees: { trees: ["Infiltration"], count: 2 } })
);
tree("Privateer");
push(
  t("Armored Spacer", "armored-spacer", "Usa armaduras espaciais como se tivesse Armor Proficiency (heavy)."),
  t("Attract Privateer", "attract-privateer", "Atrai um tenente corsário leal: personagem não heroico de nível igual a ¾ do seu (arredondado para baixo), que recebe uma parte igual da experiência. Pode ser escolhido várias vezes.", {}, { repeatable: true }),
  t("Blaster and Blade I", "blaster-and-blade-i", "Ao fazer um único ataque com arma corpo a corpo avançada como ação padrão, faz um ataque com pistola como ação livre (com as duas armas em mãos), com as penalidades normais de duas armas.", { text: "Dual Weapon Mastery I, Weapon Proficiency (advanced melee weapons, pistols)", feats: ["dual-weapon-mastery-i", "weapon-proficiency-advanced-melee", "weapon-proficiency-pistols"] }),
  t("Blaster and Blade II", "blaster-and-blade-ii", "Com arma corpo a corpo avançada e pistola, trata a arma corpo a corpo como empunhada com as duas mãos (dobro do bônus de Força no dano).", { text: "Blaster and Blade I, Dual Weapon Mastery I, Weapon Proficiency (advanced melee weapons, pistols)", talents: ["blaster-and-blade-i"], feats: ["dual-weapon-mastery-i"] }),
  t("Blaster and Blade III", "blaster-and-blade-iii", "Com arma corpo a corpo avançada e pistola, faz um ataque total como ação padrão (atacando com as duas armas).", { text: "Blaster and Blade I e II, Dual Weapon Mastery I, Weapon Proficiency (advanced melee weapons, pistols)", talents: ["blaster-and-blade-i", "blaster-and-blade-ii"], feats: ["dual-weapon-mastery-i"] }),
  t("Boarder", "boarder", "A bordo de uma nave ou estação hostil, ignora cobertura (não aprimorada) com ataques à distância em escala de personagem."),
  t("Ion Mastery", "ion-mastery", "Com armas iônicas, +1 nos ataques e +1 dado de dano iônico."),
  t("Preserving Shot", "preserving-shot", "Ao causar com arma de veículo dano igual ou maior que os PV atuais e o Limiar de uma nave, pode causar só metade do dano e movê-la −1 passo; os motores subluz e o hiperpropulsor ficam desativados até o conserto.")
);
tree("Advanced Medicine");
push(
  t("Battlefield Medic", "battlefield-medic", "Primeiros socorros com Treat Injury como ação padrão (em vez de rodada completa).", T("Steady Under Pressure", "steady-under-pressure")),
  t("Bring Them Back", "bring-them-back", "Pode usar revivify em quem morreu há até ½ nível heroico em rodadas."),
  t("Emergency Team", "emergency-team", "Aliados passam automaticamente em Aid Another para ajudá-lo em Treat Injury."),
  t("Extra First Aid", "extra-first-aid", "1/dia por alvo, pode aplicar primeiros socorros uma vez a mais em quem já os recebeu no dia."),
  t("Medical Miracle", "medical-miracle", "Ação padrão, Treat Injury CD 20 num alvo adjacente: ele usa imediatamente o Second Wind (mesmo acima da metade dos PV). Sem efeito se já gastou todos os do dia."),
  t("Natural Healing", "natural-healing", "Primeiros socorros, tratar doença e tratar veneno sem kit médico, usando substitutos naturais (a critério do Mestre)."),
  t("Second Chance", "second-chance", "Se falhar em Treat Injury, o paciente não sofre dano adicional nem morre, mesmo que a falha normalmente causasse isso.", T("Steady Under Pressure", "steady-under-pressure")),
  t("Steady Under Pressure", "steady-under-pressure", "Rerrola qualquer teste de Treat Injury, ficando com o melhor.", {}, { rerolls: [{ skill: "treatInjury", keep: "best", label: "Steady Under Pressure" }] })
);
tree("Sabotage");
push(
  t("Device Jammer", "device-jammer", "Rodada completa e Mechanics CD 20: escolhe um tipo de equipamento eletrônico (gerador de escudo, comlink, computador, datapad; não droide, veículo nem arma); todos daquele tipo a até 12 quadrados param de funcionar até o fim do encontro. Só um bloqueador (de dispositivo ou droide) ativo por vez."),
  t("Droid Jammer", "droid-jammer", "Rodada completa: Mechanics contra a Vontade de droides que cheguem a até 6 quadrados; se igualar ou superar, o droide só faz ações rápidas enquanto estiver no raio. Imunes a restraining bolt são imunes. Dura o encontro; só um bloqueador ativo."),
  t("Extreme Explosion", "extreme-explosion", "Aumenta em 1 quadrado o raio de explosão de minas e explosivos.", T("Skilled Demolitionist, Shaped Explosion", "skilled-demolitionist", "shaped-explosion")),
  t("Mine Mastery", "mine-mastery", "Coloca uma mina como ação padrão (em vez de rodada completa)."),
  t("Shaped Explosion", "shaped-explosion", "Direciona a explosão de minas e explosivos numa linha (2 × o raio) ou cone (3 × o raio), originados no quadrado da carga.", T("Skilled Demolitionist", "skilled-demolitionist")),
  t("Skilled Demolitionist", "skilled-demolitionist", "Arma um detonador como ação rápida; os explosivos só disparam ao colocá-los se falhar por 10 ou mais.")
);
tree("Turret");
push(
  t("Blaster Turret I", "blaster-turret-i", "1/encontro, ação padrão: cria uma torreta blaster (Miúda, Iniciativa +4, Perception +4, Reflexos 10, 10 PV, Limiar 8) fixada em superfície plana; dispara uma vez por rodada (ação livre sua, adjacente) usando seu BBA + bônus de Inteligência, 3d6 de dano, contra alvos que você designar. Gasta-se no fim do encontro."),
  t("Blaster Turret II", "blaster-turret-ii", "A torreta melhora: Iniciativa +8, Perception +8, Reflexos 12, 15 PV, Limiar 10, 3d8 de dano, e pode ser comandada à distância a até 12 quadrados.", T("Blaster Turret I", "blaster-turret-i")),
  t("Blaster Turret III", "blaster-turret-iii", "A torreta dispara duas vezes por rodada (−5 em cada ataque) e ganha RD 5.", T("Blaster Turret I, Blaster Turret II", "blaster-turret-i", "blaster-turret-ii")),
  t("Ion Turret", "ion-turret", "A torreta causa dano iônico em vez de normal.", T("Blaster Turret I", "blaster-turret-i")),
  t("Stun Turret", "stun-turret", "A torreta causa dano de atordoamento em vez de normal.", T("Blaster Turret I", "blaster-turret-i")),
  t("Turret Self-Destruct", "turret-self-destruct", "A torreta explode ao chegar a 0 PV num raio de 2 quadrados, causando o dano normal dela. Adjacente, pode desativar isso como reação.", T("Blaster Turret I", "blaster-turret-i"))
);

/* ---------------- Talentos de droide (Cap. 6) ---------------- */
const DNOTE = "Talento de droide: um droide herói pode escolhê-lo no lugar de um talento de classe nos níveis em que ganharia talento.";
const d = (name, key, text, p = {}, o = {}) => t(name, key, `${text} ${DNOTE}`, p, o);
tree("1st-Degree Droid");
push(
  d("Dull the Pain", "dull-the-pain", "Rodada completa, Treat Injury CD 15 numa criatura viva adjacente: ela sobe +1 passo na trilha de condição.", T("Medical Droid", "medical-droid")),
  d("Interrogator", "interrogator", "Usa o modificador de Treat Injury no lugar do de Persuasion para mudar atitude ou intimidar (o alvo precisa estar adjacente)."),
  d("Medical Droid", "medical-droid", "Primeiros socorros com medpac: o paciente recupera 2 PV por ponto acima da CD (em vez de 1).")
);
tree("2nd-Degree Droid");
push(
  d("Adept Assistant", "adept-assistant", "Ao ajudar com sucesso (Aid Another) em Mechanics, Pilot ou Use Computer, soma +5 ao teste (em vez de +2)."),
  d("Mechanics Mastery", "mechanics-mastery", "Sempre pode escolher 10 em Mechanics, mesmo com distrações ou perigo."),
  d("Vehicle Mechanic", "vehicle-mechanic", "1/dia, três ações rápidas em rodadas seguidas e Mechanics CD 20: o veículo recupera 1d8 PV (+1 por ponto acima da CD) e sobe +1 passo na trilha.")
);
tree("3rd-Degree Droid");
push(
  d("Etiquette", "etiquette", "Ao passar num teste de Persuasion para mudar atitude, ajusta a atitude do alvo um passo adicional."),
  d("Helpful", "helpful", "1/turno, usa Aid Another numa perícia de um aliado adjacente como ação rápida."),
  d("Protocol", "protocol", "Sempre tem sucesso (sem teste) ao ajudar em Deception, Knowledge e Persuasion.")
);
tree("4th-Degree Droid");
push(
  d("Combat Repairs", "combat-repairs", "1/dia, conserta a si mesmo (aplicação repair droid de Mechanics) com uma rodada completa em vez de 1 hora."),
  d("Droid Smash", "droid-smash", "Com arma corpo a corpo, soma 2 × o bônus de Força ao dano quando a empunha com uma mão."),
  d("Targeting Package", "targeting-package", "Duas ações rápidas consecutivas na mesma rodada: +2 no ataque e no dano do próximo ataque contra um alvo em curta distância (ou ao alcance, corpo a corpo) e em linha de visão. Acumula com Point Blank Shot.")
);
tree("5th-Degree Droid");
push(
  d("Cargo Hauler", "cargo-hauler", "+5 em perícias de Força e dobra a capacidade de carga."),
  d("Environmentally Shielded", "environmentally-shielded", "+5 de equipamento na Fortitude contra perigos ambientais (atmosferas extremas, corrosão)."),
  d("Power Supply", "power-supply", "Alimenta uma arma que exige gerador (E-Web etc.). Recarregar escudos ou redirecionar energia de um veículo custa duas ações rápidas em vez de três.")
);

export default out;
export const CLASS_TREES = { noble: ["Ideologue"], scoundrel: ["Smuggling"], scout: ["Spy"], "force-adept": ["Imperial Inquisitor"], "master-privateer": ["Privateer"] };
