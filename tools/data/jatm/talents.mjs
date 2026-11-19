// Jedi Academy Training Manual — talentos (Cap. 1 e 4), técnicas e segredos da Força. Textos resumidos.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, ...o
});
const ICON = {
  talent: "icons/magic/symbols/star-yellow.webp",
  forceTalent: "icons/magic/control/silhouette-aura-energy.webp",
  forceTechnique: "icons/magic/perception/eye-ringed-glow-angry-small-teal.webp",
  forceSecret: "icons/magic/symbols/runes-star-pentagon-blue.webp"
};
let TREE = "";
let CAT = "talent";
const tree = (name, cat = "talent") => { TREE = name; CAT = cat; };
const t = (name, key, text, pre = {}, o = {}) => ({
  name, type: "talent", img: ICON[o.category ?? CAT],
  system: {
    key, tree: o.tree ?? TREE, category: o.category ?? CAT, classes: [], source: "Jedi Academy Training Manual",
    description: `<p>${text}</p>`, prerequisites: P(pre),
    choice: { type: o.choice ?? "", value: o.value ?? "", options: [] },
    repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], rerolls: o.rerolls ?? []
  }
});
const pre = (text, o = {}) => ({ text, ...o });
const mod = (target, value, type = "untyped") => ({ target, value: String(value), type, label: "", disabled: false });
const out = [];
const push = (...x) => out.push(...x);
const SAVANT = desc => `1/encontro, ação rápida: devolve ao seu conjunto um poder ${desc} gasto, sem gastar Ponto da Força. Repetível (+1 uso por encontro a cada vez). (Botão ⚡.)`;

/* ---------------- JEDI ---------------- */
tree("Jedi Consular");
push(
  t("Adversary Lore", "adversary-lore", "Ação padrão: Use the Force contra a Vontade de um alvo a até 12 quadrados; se vencer, ele sofre −2 na Reflexos contra você e seus aliados até o fim do seu próximo turno. (Botão ⚡.)"),
  t("Know Weakness", "know-weakness", "Quando Adversary Lore funciona, o alvo também sofre +1d6 de dano dos ataques bem-sucedidos seus e dos aliados até o fim do seu próximo turno. (Automático no botão.)", pre("Adversary Lore", { talents: ["adversary-lore"] }))
);
tree("Jedi Guardian");
push(
  t("Grenade Defense", "grenade-defense", "Pode usar Move Light Object para afastar granadas: reação, Use the Force contra a jogada de ataque; se igualar ou superar, nega o ataque. Com sucesso ou não, sofre −5 no Use the Force até o início do seu próximo turno."),
  t("Hold the Line", "hold-the-line", "Quando acerta um ataque de oportunidade contra um alvo que sai da sua área ameaçada, o movimento dele termina.")
);
tree("Jedi Sentinel");
push(t("Master of the Great Hunt", "master-of-the-great-hunt", "+1 da Força no ataque e +1 dado de dano com sabre de luz contra feras com Dark Side Score 1+. (Opção no diálogo de ataque.)"));
tree("Lightsaber Combat");
push(t("Shoto Focus", "shoto-focus", "Empunhando um sabre de uma mão e um shoto, recebe +2 de competência nos ataques com o shoto. (Automático com dois sabres equipados.)"));

/* ---------------- FORÇA ---------------- */
tree("Alter", "forceTalent");
push(
  t("Illusion", "illusion", "Ação padrão e um Ponto da Força: cria uma ilusão (afeta a mente). Use the Force contra a Vontade de cada observador; interagir fisicamente revela a ilusão. Dura minutos iguais ao seu nível heroico; penalidade de −1 (Enorme), −2 (Gigantesco), −5 (Colossal) ou −10 (Colossal fragata+)."),
  t("Illusion Bond", "illusion-bond", "Vê e ouve a partir do espaço de uma ilusão humanoide sua.", pre("Illusion", { talents: ["illusion"] })),
  t("Influence Savant", "influence-savant", SAVANT("[mind-affecting]"), {}, { repeatable: true }),
  t("Link", "link", "Ação padrão: designa um aliado voluntário treinado em Use the Force a até 12 quadrados; até o fim do encontro, enquanto estiverem a até 12 quadrados, um pode ajudar o outro em Use the Force como reação (quem reage sofre −5 no Use the Force até o fim do próximo turno). Só um elo por vez."),
  t("Masquerade", "masquerade", "Pode usar Illusion como disfarce: o resultado de Use the Force vale como Deception para aparência enganosa.", pre("Illusion", { talents: ["illusion"] })),
  t("Suppress Force", "suppress-force", "Quando um alvo (Int 3+) a até 12 quadrados usa Use the Force, você pode gastar um uso de mind trick como reação: se seu Use the Force igualar ou superar o dele, o uso é negado.", pre("Influence Savant, mind trick", { talents: ["influence-savant"], forcePowers: ["mind-trick"] }))
);
tree("Control", "forceTalent");
push(
  t("Channel Energy", "channel-energy", "Quando negate energy nega o dano de uma arma de energia, pode gastar um Ponto da Força (reação) para ativar qualquer poder do seu conjunto.", pre("negate energy", { forcePowers: ["negate-energy"] })),
  t("Force Harmony", "force-harmony", "1/encontro, ativa um talento que exige Ponto da Força sem gastá-lo.")
);
tree("Dark Side", "forceTalent");
push(
  t("Dark Side Savant", "dark-side-savant", SAVANT("[dark side]"), {}, { repeatable: true }),
  t("Transfer Essence", "transfer-essence", "Ao morrer, vira um espírito do lado sombrio até o fim do encontro e pode possuir uma criatura adjacente (Use the Force contra a Vontade: 8d6 de atordoamento; em 0 PV ou no fim da trilha você a possui) ou transferir-se para um objeto.", pre("Dark Side Score igual à Sabedoria"))
);
tree("Sense", "forceTalent");
push(
  t("Instinctive Navigation", "instinctive-navigation", "Pilotando um veículo, usa Use the Force no lugar de Use Computer para astrogação e sensores.", pre("Force Pilot", { talents: ["force-pilot"] })),
  t("Motion of the Future", "motion-of-the-future", "Ação rápida: gasta um uso de farseeing; até o fim do seu próximo turno, quando for alvo de um ataque ou poder, força o atacante a rerrolar e ficar com o segundo resultado.", pre("Force Perception", { talents: ["force-perception"] }))
);
tree("Guardian Spirit", "forceTalent");
push(
  t("Guardian Spirit", "guardian-spirit", "Um espírito guardião o acompanha: consulte-o com Search Your Feelings. Recebe 1 Ponto da Força bônus por dia (após 6 h de descanso) só para poderes, técnicas ou segredos; perde-se se não usado."),
  t("Crucial Advice", "crucial-advice", "1/encontro, ao falhar num teste de perícia, rerrola com +2 de circunstância.", pre("Guardian Spirit", { talents: ["guardian-spirit"] })),
  t("Distracting Apparition", "distracting-apparition", "Com o espírito manifestado, inimigos a até 3 quadrados dele sofrem −2 na Vontade e −2 nos ataques contra você.", pre("Manifest Guardian Spirit", { talents: ["manifest-guardian-spirit"] })),
  t("Manifest Guardian Spirit", "manifest-guardian-spirit", "Ponto da Força, ação rápida: o espírito se manifesta por um encontro (a até 6 quadrados); com ele a até 12 quadrados, +1 de moral nos ataques, +2 de moral em Use the Force e na Vontade. Move o espírito 6 quadrados como ação rápida, 1/turno. (Botão ⚡.)", pre("Guardian Spirit", { talents: ["guardian-spirit"] })),
  t("Vital Encouragement", "vital-encouragement", "1/encontro, ação livre: PV temporários iguais a 10 + ½ nível heroico. (Botão ⚡.)", pre("Guardian Spirit", { talents: ["guardian-spirit"] }))
);

/* ---------------- FORCE ADEPT ---------------- */
tree("Dark Side Devotee");
push(
  t("Dark Side Talisman", "dark-side-talisman", "Ponto da Força, rodada completa: cria um talismã do lado sombrio; enquanto o usa, +2 da Força numa Defesa contra poderes [light side]. Um por vez (pode ter também um talismã da Força); se for destruído, só pode criar outro após 24 h. (Botão ⚡.)"),
  t("Greater Dark Side Talisman", "greater-dark-side-talisman", "O bônus do Dark Side Talisman vale nas três Defesas.", pre("Dark Side Talisman", { talents: ["dark-side-talisman"] }))
);
tree("Beastwarden");
push(
  t("Charm Beast", "charm-beast", "Usa Use the Force no lugar de Persuasion para mudar a atitude de criaturas não domesticadas com Int 2 ou menos, sem a penalidade de −5 por não falar a língua."),
  t("Bonded Mount", "bonded-mount", "Ponto da Força, rodada completa: cria um elo com uma fera domesticada amistosa como montaria; sente as emoções dela e, montado, ela usa sua Reflexos e Vontade em vez das dela, e você recebe os sentidos especiais dela.", pre("Charm Beast", { talents: ["charm-beast"] })),
  t("Entreat Beast", "entreat-beast", "Ação rápida: Use the Force contra a Vontade de uma fera pequena indiferente ou melhor; ela realiza uma tarefa simples (levar objeto, buscar item sem dono a até 30 quadrados, apertar botão).", pre("Charm Beast", { talents: ["charm-beast"] })),
  t("Soothing Presence", "soothing-presence", "Feras hostis (unfriendly) com você ficam automaticamente indiferentes.", pre("Charm Beast", { talents: ["charm-beast"] })),
  t("Wild Sense", "wild-sense", "1/turno, ação rápida: Use the Force para tocar a mente de uma fera a até 12 quadrados; ela faz um teste de Perception e você percebe tudo o que ela perceber, com linha de visão até o fim do turno.", pre("Charm Beast", { talents: ["charm-beast"] }))
);
tree("Mystic");
push(
  t("Channel Vitality", "channel-vitality", "Ação rápida: desce −1 passo na trilha de condição e recebe 1 Ponto da Força temporário até o fim do turno. (Botão ⚡.)"),
  t("Closed Mind", "closed-mind", "Efeitos de afetar a mente contra sua Vontade rolam duas vezes e ficam com o menor."),
  t("Esoteric Technique", "esoteric-technique", "Ao gastar um Ponto da Força para ativar uma técnica ou segredo da Força, recebe PV temporários iguais a 10 + nível de classe até o fim do encontro."),
  t("Mystic Mastery", "mystic-mastery", "Ao subir de nível, recebe Pontos da Força adicionais iguais ao número de talentos da Força que possui (máx. +6)."),
  t("Regimen Aptitude", "regimen-aptitude", "+5 da Força nos testes de regimes da Força. (Automático no teste.)", pre("Force Regimen Mastery", { feats: ["force-regimen-mastery"] }))
);
tree("Telepath");
push(
  t("Mind Probe", "mind-probe", "Rodada completa tocando um ser vivo (Int 3+): usa Use the Force (contra a Vontade, se relutante) como Gather Information para notícias, segredos ou localizar alguém, sem suborno."),
  t("Perfect Telepathy", "perfect-telepathy", "Comunica frases e pensamentos completos com a telepatia de Use the Force."),
  t("Psychic Citadel", "psychic-citadel", "+bônus da Força na Vontade igual ao seu nível de classe. (Automático.)", {}, { modifiers: [mod("defenses.will", "@classLevel.force_adept", "force")] }),
  t("Psychic Defenses", "psychic-defenses", "Quem o alvejar com poder [mind-affecting] sofre automaticamente 1d6 × seu mod. de Sabedoria (mín. ×1) de dano da Força.", pre("Psychic Citadel", { talents: ["psychic-citadel"] })),
  t("Telepathic Intruder", "telepathic-intruder", "Após usar com sucesso um poder [mind-affecting] contra um alvo, +2 da Força nos testes para poderes e talentos de afetar a mente contra ele até o fim do seu próximo turno.")
);

/* ---------------- JEDI KNIGHT ---------------- */
tree("Duelist");
push(
  t("Lightsaber Form Savant", "lightsaber-form-savant", SAVANT("[lightsaber form]"), {}, { repeatable: true }),
  t("Shoto Master", "shoto-master", "Empunhando um sabre de uma mão e um shoto, o sabre de uma mão conta como arma leve; com Lightsaber Defense, ativa o talento como ação livre no seu turno.")
);
tree("Jedi Artisan");
push(
  t("Call Weapon", "call-weapon", "Usa Move Light Object para chamar à mão e ligar (ação livre) um sabre que você construiu, em linha de visão."),
  t("Lightsaber Specialist", "lightsaber-specialist", "Empunhando um sabre que você construiu, +2 de moral no Use the Force para Block e Deflect.", pre("Masterwork Lightsaber", { talents: ["masterwork-lightsaber"] })),
  t("Masterwork Lightsaber", "masterwork-lightsaber", "Ao construir um sabre, adiciona um acessório extra; ao acertar com um sabre que construiu, pode rerrolar um dado de dano (fica com o segundo). Ao orientar outro na construção, a CD cai 5."),
  t("Perfect Attunement", "perfect-attunement", "Quando gasta um Ponto da Força no ataque com um sabre que construiu, soma o mesmo valor ao dano se acertar.", pre("Masterwork Lightsaber", { talents: ["masterwork-lightsaber"] })),
  t("Quick Modification", "quick-modification", "Com 1 minuto, troca um acessório de um sabre que você construiu.", pre("Masterwork Lightsaber", { talents: ["masterwork-lightsaber"] }))
);
tree("Jedi Instructor");
push(
  t("Apprentice Boon", "apprentice-boon", "Quando um aliado a até 12 quadrados com Use the Force menor que o seu faz um teste de Use the Force, pode gastar um Ponto da Força (reação) para somar ao teste dele (dados pelo seu nível)."),
  t("Share Force Secret", "share-force-secret", "Escolha um segredo da Força que conhece: 1/turno, ação rápida, concede-o a um aliado treinado em Use the Force a até 12 quadrados até o fim do próximo turno dele.", pre("Conhecer ao menos 1 segredo da Força")),
  t("Share Force Technique", "share-force-technique", "Escolha uma técnica que conhece (exceto Force Point Recovery): 1/turno, ação rápida, concede-a a um aliado treinado em Use the Force a até 12 quadrados até o fim do seu próximo turno.", pre("Conhecer ao menos 1 técnica da Força", { forceTechniques: 1 })),
  t("Share Talent", "share-talent", "Escolha um talento seu de Lightsaber Combat, Duelist ou Lightsaber Forms: 1/dia, ação padrão e Ponto da Força, concede-o a aliados (até ½ nível de classe) treinados em Use the Force a até 12 quadrados até o fim do encontro. Repetível.", pre("Um talento de Lightsaber Combat, Duelist ou Lightsaber Forms", { talentTrees: { trees: ["Lightsaber Combat", "Duelist", "Lightsaber Forms"], count: 1 } }), { repeatable: true }),
  t("Transfer Power", "transfer-power", "Ação padrão: gasta um uso de um poder para adicioná-lo ao conjunto de um aliado treinado em Use the Force a até 12 quadrados; se não for usado até o fim do encontro, some.", pre("Force Training", { feats: ["force-training"] }))
);
tree("Jedi Investigator");
push(
  t("Echoes in the Force", "echoes-in-the-force", "Usa farseeing num local para ver o passado dele (CD 20 +1 por dia no passado)."),
  t("Jedi Quarry", "jedi-quarry", "Ação rápida: designa um alvo; +2 de deslocamento sempre que se move para terminar adjacente a ele, até ele se render, ir a 0 PV, ao fim da trilha ou ao fim do encontro. (Botão ⚡.)"),
  t("Prepared for Danger", "prepared-for-danger", "Com um uso de farseeing não gasto, pode gastá-lo (ação rápida) para recuperar qualquer outro poder."),
  t("Sense Deception", "sense-deception", "Quando alguém usa Deception ou Persuasion contra sua Vontade, pode fazer um teste de Use the Force e usar o resultado no lugar da Vontade, se for maior."),
  t("Unclouded Judgment", "unclouded-judgment", "Ao ser alvo de poder ou talento de afetar a mente, gasta um Ponto da Força (reação) para negá-lo.", pre("Sense Deception", { talents: ["sense-deception"] }))
);
tree("Jedi Weapon Master");
push(
  t("Combat Trance", "combat-trance", "Ao usar battle strike, recebe o bônus do poder no primeiro ataque corpo a corpo de cada rodada até o fim do encontro (acaba se não atacar numa rodada)."),
  t("Improved Weapon Master", "improved-weapon-master", "Sem penalidade em ataques com armas improvisadas."),
  t("Twin Weapon Style", "twin-weapon-style", "Ação padrão: com duas armas (ou arma dupla), um ataque com cada uma contra alvos diferentes."),
  t("Twin Weapon Mastery", "twin-weapon-mastery", "Com Twin Weapon Style, move 2 quadrados entre os ataques sem provocar.", pre("Twin Weapon Style", { talents: ["twin-weapon-style"] })),
  t("Shoto Pin", "shoto-pin", "Empunhando um shoto, quando nega um ataque corpo a corpo com Block, o atacante não pode fazer mais ataques corpo a corpo até o início do próximo turno dele ou até deixar de estar adjacente.", pre("Block", { talents: ["block"] }))
);

/* ---------------- SITH APPRENTICE ---------------- */
tree("Sith Alchemy");
push(
  t("Sith Alchemy", "sith-alchemy", "Cria objetos imbuídos do lado sombrio (cada uso +1 Dark Side Score): amuleto Sith (25.000 cr, 1 semana, PF); armadura Sith (de armadura de batalha: 1/2/3 dias, PF); talismã Sith (PF: +1d6 de dano com poderes da Força; um por vez); arma Sith (arma corpo a corpo simples/avançada, PF, 1 hora: sabres não ignoram sua RD e ela conta como sabre para Block/Deflect/Redirect Shot; ação rápida + PF: +Dark Side Score no dano do próximo ataque, +1 DSS)."),
  t("Cause Mutation", "cause-mutation", "Com laboratório e dias iguais ao ND modificado, aplica o modelo Sith Abomination ou Chrysalis Beast a uma criatura voluntária ou inconsciente (PF no fim).", pre("Sith Alchemy", { talents: ["sith-alchemy"] })),
  t("Rapid Alchemy", "rapid-alchemy", "Ação padrão: altera uma arma corpo a corpo que empunha: +2 de equipamento no ataque até o fim do encontro; pode sacrificar o bônus para +5 de equipamento num único dano. (Botão ⚡.)"),
  t("Sith Alchemy Specialist", "sith-alchemy-specialist", "Ponto da Força e 1 hora: adiciona um traço da Tabela 1-1 a um objeto (armadura: Cortosis Weave, Dark Side Energy, Dark Side Stealth, Imposing Form; abominação: RD +5, Iron Will, armas naturais venenosas; arma: Jagged, Master's Weapon, Vile). +1 Dark Side Score.", pre("Sith Alchemy", { talents: ["sith-alchemy"] }))
);

/* ---------------- TRADIÇÕES (Cap. 4) ---------------- */
tree("Aing-Tii Monk", "forceTalent");
push(
  t("Aura of Freedom", "aura-of-freedom", "Aliados a até 6 quadrados recebem +5 da Força em testes para escapar de agarrões e imobilizações; quando um aliado a até 6 quadrados for movido contra a vontade, gasta um Ponto da Força (reação) para negar o movimento."),
  t("Folded Space Mastery", "folded-space-mastery", "Pilotando, usa fold space para mover o veículo por longas distâncias (o resultado substitui Use Computer de astrogação; viagem instantânea, sem hiperpropulsor).", pre("fold space", { forcePowers: ["fold-space"] })),
  t("Liberate", "liberate", "Ponto da Força, ação rápida: um aliado a até 12 quadrados agarrado ou imobilizado escapa e move metade do deslocamento (reação, sem provocar).", pre("Aura of Freedom", { talents: ["aura-of-freedom"] })),
  t("Many Shades of the Force", "many-shades-of-the-force", "Escolha um poder [dark side] ou [light side] do seu conjunto: ele perde o descritor para você.", pre("Force Training", { feats: ["force-training"] })),
  t("Spatial Integrity", "spatial-integrity", "A bordo de um veículo, Ponto da Força (reação ao dano): faz Use the Force e reduz o dano pelo resultado, depois de RD e SR.")
);
tree("Baran Do Sage", "forceTalent");
push(
  t("Enhanced Danger Sense", "enhanced-danger-sense", "+10 em Perception para evitar surpresa; com um Ponto da Força, age na rodada de surpresa mesmo surpreso."),
  t("Expanded Horizon", "expanded-horizon", "Search Your Feelings alcança 1 hora no futuro; com Ponto da Força, 8 horas; com Ponto de Destino, 24 horas."),
  t("Knowledge and Defense", "knowledge-and-defense", "Soma seu bônus de Sabedoria à Reflexos quando perderia o bônus de Destreza. (Automático.)", pre("Enhanced Danger Sense", { talents: ["enhanced-danger-sense"] })),
  t("Planetary Attunement", "planetary-attunement", "Ao chegar a um planeta, 10 minutos e um Ponto da Força: +2 da Força nas Defesas contra perigos naturais dele, +1 de deslocamento e prevê o clima por 24 h."),
  t("Precognitive Meditation", "precognitive-meditation", "1/dia, 10 minutos e um Ponto da Força: uma vez no dia, nega um ataque contra você ou contra o veículo que pilota (exceto 20 natural). Se não usar, recupera o Ponto da Força.")
);
tree("White Current Adept", "forceTalent");
push(
  t("White Current Adept", "white-current-adept", "Usa Use the Force no lugar de Stealth e conta como treinado em Stealth; rerrolagens de Stealth podem usar Use the Force. (Automático.)"),
  t("Force Immersion", "force-immersion", "Usa Stealth (sneak) para se esconder de vigilância eletrônica e sensores: um só teste serve de CD para Perception e Use Computer.", pre("White Current Adept, treinado em Stealth", { talents: ["white-current-adept"], trained: ["stealth"] })),
  t("Immerse Another", "immerse-another", "Ao usar Stealth para se esgueirar, seu resultado substitui o de um aliado adjacente (também contra Sense Force); com um Ponto da Força, vale para todos os aliados adjacentes.", pre("White Current Adept, treinado em Stealth", { talents: ["white-current-adept"], trained: ["stealth"] })),
  t("Ride the Current", "ride-the-current", "Reação ao sofrer dano: Ponto da Força para camuflagem total contra todos até o fim do seu próximo turno; se ainda não usou o second wind, pode usá-lo agora. (Botão ⚡.)"),
  t("Surrender to the Current", "surrender-to-the-current", "Ação rápida: até o fim do encontro só usa poderes com \"Você\" como único alvo; 1/turno, ação rápida, recupera um desses poderes gastos sem Ponto da Força.")
);
tree("Iron Knight", "forceTalent");
push(
  t("Droid Duelist", "droid-duelist", "Empunhando um sabre, Ponto da Força e ação rápida: o oponente fica surpreso contra seu próximo ataque com sabre antes do fim do turno."),
  t("Force Repair", "force-repair", "Usa o transe da Força para recuperar PV com cura natural e pode receber vital transfer; sempre que recebe PV temporários, ganha + mod. de Carisma (mín. +1)."),
  t("Heal Droid", "heal-droid", "Pode usar vital transfer para curar droides.", pre("vital transfer", { forcePowers: ["vital-transfer"] })),
  t("Mask Presence", "mask-presence", "Ação rápida: fica imune a Sense Force e parece um droide comum na Força; termina se usar Use the Force, um poder ou talento da Força."),
  t("Silicon Mind", "silicon-mind", "Ponto da Força (reação): + mod. de Carisma (mín. +1) na Vontade contra todos os testes de Use the Force até o fim do seu próximo turno.")
);
tree("Matukai Adept", "forceTalent");
push(
  t("Body Control", "body-control", "Soma o mod. de Carisma (em vez de Constituição) na Fortitude; Ponto da Força, ação rápida: imune a venenos, radiação e doenças até o fim do encontro. (Automático na Fortitude.)"),
  t("Physical Surge", "physical-surge", "Ao rolar Iniciativa no início do combate, faz uma ação rápida imediatamente, mesmo surpreso."),
  t("Soft to Solid", "soft-to-solid", "Reação ao sofrer dano: Ponto da Força para RD 10 até o fim do seu próximo turno. (Botão ⚡.)"),
  t("Wan-Shen Defense", "wan-shen-defense", "Ação rápida, com o wan-shen na mão: +1 de deflexão na Reflexos contra ataques corpo a corpo até o início do próximo turno (não se surpreso). Repetível (máx. +3). (Botão ⚡.)", pre("Proficiente com o wan-shen"), { repeatable: true }),
  t("Wan-Shen Kata", "wan-shen-kata", "Trata o wan-shen como arma Média; pode usar Pin e Trip com ele; ao atacar com as duas pontas, reduz em 1 todas as penalidades.", pre("Proficiente com o wan-shen")),
  t("Wan-Shen Mastery", "wan-shen-mastery", "Ação padrão: dois ataques com o wan-shen contra alvos diferentes ao alcance.", pre("Proficiente com o wan-shen, Wan-Shen Kata, BBA +5", { talents: ["wan-shen-kata"], bab: 5 }))
);
tree("Seyugi Dervish", "forceTalent");
push(
  t("Seyugi Cyclone", "seyugi-cyclone", "Sem armas (exceto luvas), pode usar Whirlwind Attack como ação padrão gastando um Ponto da Força, mesmo sem o feat; conta como tendo o feat para pré-requisitos."),
  t("Mobile Whirlwind", "mobile-whirlwind", "Após um Whirlwind Attack, move até o deslocamento.", pre("Seyugi Cyclone", { talents: ["seyugi-cyclone"] })),
  t("Repelling Whirlwind", "repelling-whirlwind", "+2 de circunstância na Reflexos contra os alvos atingidos pelo Whirlwind Attack até o início do seu próximo turno.", pre("Seyugi Cyclone", { talents: ["seyugi-cyclone"] })),
  t("Sudden Storm", "sudden-storm", "Ponto da Força: no fim de uma investida desarmada, faz um Whirlwind Attack em vez do ataque normal.", pre("Seyugi Cyclone", { talents: ["seyugi-cyclone"] })),
  t("Tempest Tossed", "tempest-tossed", "Ao ferir um alvo com Whirlwind Attack, move-o 1 quadrado em qualquer direção (ação livre, sem provocar).", pre("Seyugi Cyclone", { talents: ["seyugi-cyclone"] }))
);
tree("Shapers of Kro Var", "forceTalent");
push(
  t("Combustion", "combustion", "Ponto da Força, ação rápida: +1d6 de fogo num poder que cause dano a um único alvo (ele pega fogo).", pre("Force Training", { feats: ["force-training"] })),
  t("Earth Buckle", "earth-buckle", "Ponto da Força, ação rápida: área 3×3 de terreno difícil centrada em você (você ignora as penalidades dele)."),
  t("Fluidity", "fluidity", "Usa Use the Force no lugar de Acrobatics (e suas rerrolagens); Ponto da Força: agarra como se fosse 1 tamanho maior. (Automático em Acrobatics.)"),
  t("Thunderclap", "thunderclap", "Ao usar um poder que cause dano, pode aplicar Bantha Rush contra o alvo como se tivesse feito um ataque corpo a corpo.", pre("Bantha Rush, Force Training", { feats: ["bantha-rush", "force-training"] })),
  t("Wind Vortex", "wind-vortex", "Ponto da Força, ação rápida: camuflagem contra todos e +2 de circunstância na Reflexos contra armas arremessadas até o fim do encontro. (Botão ⚡.)")
);
tree("Tyia Adept", "forceTalent");
push(
  t("Tyia Adept", "tyia-adept", "Ponto da Força, ação rápida: designa um aliado não droide a até 12 quadrados; até o fim do seu próximo turno, o dano que você ou ele sofrem é dividido ao meio entre os dois (antes do Limiar)."),
  t("Cycle of Harmony", "cycle-of-harmony", "Quando um aliado a até 12 quadrados sofre dano ou desce na trilha, outro aliado a até 12 quadrados recebe (reação) PV temporários iguais a 5 + mod. de Carisma (mín. +1) até o fim do encontro.", pre("Tyia Adept", { talents: ["tyia-adept"] })),
  t("Force Stabilize", "force-stabilize", "1/turno, ação rápida: um aliado a até 12 quadrados usa imediatamente o second wind, se ainda não o usou no encontro.", pre("Tyia Adept", { talents: ["tyia-adept"] })),
  t("Repel Discord", "repel-discord", "Alvo de um poder [dark side]: Ponto da Força (reação) para impor ao usuário penalidade igual ao Dark Side Score dele no Use the Force."),
  t("Stifle Conflict", "stifle-conflict", "Pode fazer qualquer poder que ativar causar dano de atordoamento em vez de dano normal.")
);
tree("Warden of the Sky", "forceTalent");
push(
  t("Brutal Unarmed Strike", "brutal-unarmed-strike", "Rerrola os 1 nos dados de dano desarmado. (Automático.)", pre("Telekinetic Strike", { talents: ["telekinetic-strike"] })),
  t("Martial Resurgence", "martial-resurgence", "Ao tirar 20 natural num ataque desarmado, recupera todos os poderes da Força gastos."),
  t("Rebound Leap", "rebound-leap", "Ao reduzir um oponente a 0 PV com ataque desarmado, faz um teste de Jump como ação livre (surge se aplica)."),
  t("Simultaneous Strike", "simultaneous-strike", "Ação padrão: dois ataques desarmados contra alvos diferentes.", pre("BBA +5", { bab: 5 })),
  t("Telekinetic Strike", "telekinetic-strike", "Ao acertar um ataque desarmado, pode somar o Ponto da Força ao dano em vez do ataque."),
  t("Telekinetic Throw", "telekinetic-throw", "Ao usar Throw com sucesso, o oponente cai prone em qualquer espaço até 3 quadrados além do seu alcance.", pre("Throw", { feats: ["throw"] }))
);
tree("Zeison Sha Warrior", "forceTalent");
push(
  t("Discblade Arc", "discblade-arc", "Rodada completa: ataque de área com o discblade contra três alvos em alcance à queima-roupa (uma jogada contra todos).", pre("Proficiente com o discblade")),
  t("Distant Discblade Throw", "distant-discblade-throw", "O discblade usa o alcance de pistola em vez de arma arremessada.", pre("Proficiente com o discblade")),
  t("Recall Discblade", "recall-discblade", "Após um ataque à distância com o discblade, Use the Force CD 15 (ação livre) para trazê-lo de volta à mão.", pre("Proficiente com o discblade")),
  t("Telekinetic Vigilance", "telekinetic-vigilance", "Ação rápida: devolve intercept ao seu conjunto sem gastar Ponto da Força.", pre("intercept", { forcePowers: ["intercept"] })),
  t("Weapon Specialization (Discblade)", "weapon-specialization-discblade", "+2 nas jogadas de dano corpo a corpo com o discblade.", pre("Proficiente com o discblade, Weapon Focus (discblade)"))
);

/* ---------------- TÉCNICAS E SEGREDOS ---------------- */
tree("Force Techniques", "forceTechnique");
push(
  t("Cure Disease", "cure-disease", "Ao usar vital transfer, se o resultado igualar ou superar a CD de Treat Injury de uma doença do alvo, pode gastar um Ponto da Força para curá-la."),
  t("Extended Blind", "extended-blind", "O alcance de blind passa a 18 quadrados."),
  t("Extended Force Disarm", "extended-force-disarm", "O alcance de Force disarm passa a 18 quadrados."),
  t("Extended Force Grip", "extended-force-grip", "O alcance de Force grip passa a 18 quadrados."),
  t("Extended Force Thrust", "extended-force-thrust", "O alcance de Force thrust passa a 18 quadrados."),
  t("Extended Move Object", "extended-move-object", "O alcance de move object passa a 18 quadrados."),
  t("Improved Convection", "improved-convection", "O fogo de convection ataca a Fortitude do alvo com seu BBA em vez do bônus normal de +5."),
  t("Improved Crucitorn", "improved-crucitorn", "Se usar crucitorn e o ataque ainda causar dano acima do seu Limiar, o poder não é gasto."),
  t("Improved Cryokinesis", "improved-cryokinesis", "Pode usar cryokinesis em veículos ocupados; o veículo só desce na trilha se o resultado também superar a Fortitude dele."),
  t("Improved Fold Space", "improved-fold-space", "Com fold space, Ponto da Força: move o objeto para qualquer lugar em linha de visão; Ponto de Destino: para qualquer lugar do sistema estelar."),
  t("Improved Force Light", "improved-force-light", "Ponto da Força: Force light cega quem fere (os demais têm camuflagem contra ele até o fim do próximo turno); Ponto de Destino: camuflagem total."),
  t("Improved Force Storm", "improved-force-storm", "Ponto da Força: a Force storm ganha raios; ao ativá-la e ao mantê-la (ação padrão), compare o Use the Force com a Reflexos de um alvo na tempestade: 3d6 de dano da Força (Ponto de Destino: 6d6)."),
  t("Improved Plant Surge", "improved-plant-surge", "Ponto da Força: plant surge atinge todos os inimigos numa área 5×5; Ponto de Destino: área 10×10."),
  t("Improved Thought Bomb", "improved-thought-bomb", "Ponto da Força: thought bomb atinge inimigos a até 5 quadrados; Ponto de Destino: todos os inimigos em linha de visão.")
);
tree("Force Secrets", "forceSecret");
push(
  t("Holocron Loremaster", "holocron-loremaster", "Ao ativar um poder, gaste um Ponto da Força para adicionar ao seu conjunto um uso de qualquer poder conhecido por um aliado a até 12 quadrados (até o fim do seu próximo turno; com Ponto de Destino, até o fim do encontro). Permite criar o guardião de um holocron."),
  t("Mentor", "mentor", "Ao ativar um poder, gaste um Ponto da Força para adicionar um uso dele ao conjunto de um aliado a até 12 quadrados em linha de visão (até o fim do próximo turno dele; com Ponto de Destino, até o fim do encontro). Exige ter treinado um aprendiz até cavaleiro.")
);

export default out;

/** Árvores novas por classe de prestígio. */
export const CLASS_TREES = {
  "force-adept": ["Beastwarden", "Mystic", "Telepath"],
  "jedi-knight": ["Jedi Artisan", "Jedi Instructor", "Jedi Investigator", "Jedi Weapon Master"],
  "sith-apprentice": ["Sith Alchemy"]
};
