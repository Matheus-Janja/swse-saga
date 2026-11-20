// Scum and Villainy — talentos novos (Cap. 1). Textos resumidos.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
let TREE = "";
const tree = n => { TREE = n; };
const t = (name, key, text, pre = {}, o = {}) => ({
  name, type: "talent", img: "icons/magic/symbols/star-yellow.webp",
  system: {
    key, tree: TREE, category: "talent", classes: [], source: "Scum and Villainy",
    description: `<p>${text}</p>`, prerequisites: P(pre),
    choice: { type: o.choice ?? "", value: "", options: [] }, repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], rerolls: o.rerolls ?? []
  }
});
const pre = (text, o = {}) => ({ text, ...o });
const mod = (target, value, type = "untyped") => ({ target, value: String(value), type, label: "", disabled: false });
const out = [];
const push = (...x) => out.push(...x);

/* ---------------- JEDI ---------------- */
tree("Jedi Sentinel");
push(t("Persistent Haze", "persistent-haze", "Quem estiver oculto pelo seu Force Haze mantém a camuflagem total sem precisar mover-se só como ação de movimento; quem ataca perde a camuflagem.", pre("Clear Mind, Force Haze", { talents: ["clear-mind", "force-haze"] })));

/* ---------------- NOBLE ---------------- */
tree("Disgrace");
push(
  t("Ambush", "ambush", "Na rodada de surpresa, se não estiver surpreso, pode abrir mão da ação padrão para que todos os aliados não surpresos em linha de visão façam uma ação de movimento; aliados que gastarem essa ação rerrolam a Iniciativa e ficam com o melhor.", pre("Dirty Tactics", { talents: ["dirty-tactics"] })),
  t("Castigate", "castigate", "Ação padrão: Persuasion contra a Vontade de um alvo que entenda sua língua; se vencer, ele sofre −2 nas Defesas até o fim do seu próximo turno. (Botão ⚡.)"),
  t("Dirty Tactics", "dirty-tactics", "1/encontro, ação padrão: concede vantagem tática a todos os aliados em linha de visão; quem flanquear um oponente recebe +4 (em vez de +2) nos ataques corpo a corpo contra ele. Dura até o fim do encontro ou até você ficar inconsciente/morto. (Botão ⚡.)"),
  t("Misplaced Loyalty", "misplaced-loyalty", "1/rodada, ação rápida: Persuasion contra a Vontade de todos os oponentes em linha de visão; quem falhar não pode atacá-lo se você estiver a até 6 quadrados de um aliado, até o início do seu próximo turno. Não pode usar na mesma rodada que Draw Fire.", pre("Dirty Tactics", { talents: ["dirty-tactics"] })),
  t("Two-Faced", "two-faced", "Cada opção 1/encontro, ação padrão: False Security (um ataque; até o início do seu próximo turno, se o alvo o atacar, você faz um ataque contra ele como reação); Nonthreatening (um ataque; até o início do seu próximo turno, o alvo não pode atacá-lo exceto com ataques de oportunidade — afeta a mente); Tricky Target (um ataque contra alvo que não o atacou desde o fim do seu último turno: +2 no ataque e no dano).", pre("Dirty Tactics, Misplaced Loyalty", { talents: ["dirty-tactics", "misplaced-loyalty"] })),
  t("Unreadable", "unreadable", "+5 na Vontade contra perícias que tentem ler suas emoções ou mudar sua atitude; sempre que fintar com sucesso em combate, o alvo fica surpreso contra seus ataques até o fim do seu próximo turno.", {}, { modifiers: [] })
);
tree("Inspiration");
push(t("Beloved", "beloved", "Cada opção 1/encontro, ação padrão: Guardian (ação rápida: escolha um aliado; enquanto estiver a até 6 quadrados dele, +2 na Reflexos até o início do seu próximo turno); Reprisal (um ataque; se acertar e o alvo atacar você antes do fim do seu próximo turno, aliados a até 6 quadrados podem atacá-lo como reação); To Me! (ação rápida: até o início do seu próximo turno, quando um aliado em linha de visão sofrer dano, ele move 2 quadrados até você, sem provocar).", pre("Bolster Ally, Inspire Confidence", { talents: ["bolster-ally", "inspire-confidence"] })));

/* ---------------- SCOUNDREL ---------------- */
tree("Fortune");
push(
  t("Avert Disaster", "avert-disaster", "1/encontro: transforma um acerto crítico contra você num acerto normal.", pre("Fool's Luck", { talents: ["fools-luck"] })),
  t("Better Lucky than Dead", "better-lucky-than-dead", "1/encontro, reação: +5 de sorte numa Defesa até o início do seu próximo turno. (Botão ⚡.)", pre("Fool's Luck", { talents: ["fools-luck"] })),
  t("Dumb Luck", "dumb-luck", "Cada opção 1/encontro, ação padrão: Elude Enemy (um ataque; se ferir, +2 na Reflexos contra o alvo até o início do seu próximo turno); Escape (um ataque; se ferir, move 2 quadrados como reação, sem provocar); Make your Own Luck (um ataque; se errar, +2 no próximo ataque).", pre("Knack, Lucky Shot", { talents: ["knack", "lucky-shot"] })),
  t("Labyrinthine Mind", "labyrinthine-mind", "1/encontro, reação: fica imune a efeitos de afetar a mente até o fim do seu próximo turno e encerra os que estiverem ativos (pode manter os benéficos)."),
  t("Ricochet Shot", "ricochet-shot", "Atacando à distância um alvo com cobertura, pode reduzir a cobertura em um passo (aprimorada → normal, normal → nenhuma), mas causa só metade do dano.", pre("Knack, Lucky Shot", { talents: ["knack", "lucky-shot"] })),
  t("Uncanny Luck", "uncanny-luck", "1/encontro, pode considerar um d20 de 16 ou mais como 20 natural.", pre("Knack, Lucky Shot", { talents: ["knack", "lucky-shot"] })),
  t("Unlikely Shot", "unlikely-shot", "1/encontro, rerrola o dano de um ataque e fica com o melhor.", pre("Knack, Lucky Shot", { talents: ["knack", "lucky-shot"] }))
);
tree("Misfortune");
push(
  t("Befuddle", "befuddle", "Ao vencer a Vontade de um alvo com Deception (ação rápida), até o início do seu próximo turno pode atravessar a área ameaçada dele sem provocar; cada quadrado ameaçado conta como 2."),
  t("Cunning Strategist", "cunning-strategist", "Cada opção 1/encontro, ação padrão: Create Opening (um ataque; se ferir, o alvo sofre −5 na Reflexos até o fim do seu próximo turno); Crippling Attack (um ataque; até o fim do próximo turno do alvo, −2 de deslocamento); Vicious Attack (um ataque contra dois oponentes a até 2 quadrados um do outro, −5 em cada; role o dano uma vez).", pre("Disruptive, Walk the Line", { talents: ["disruptive", "walk-the-line"] })),
  t("Hesitate", "hesitate", "Ação padrão: Persuasion contra a Vontade de um alvo a até 12 quadrados; se vencer, ele sofre −2 de deslocamento e, se fizer uma ação padrão, precisa gastar também a rápida, até o fim do próximo turno dele. (Botão ⚡.)"),
  t("Improved Skirmisher", "improved-skirmisher", "Quando se move ao menos 2 quadrados e termina noutro quadrado, +1 nas Defesas até o início do seu próximo turno (além do Skirmisher).", pre("Skirmisher", { talents: ["skirmisher"] })),
  t("Sow Confusion", "sow-confusion", "1/encontro, ação padrão: Deception contra a Vontade de todos os inimigos em linha de visão; quem falhar precisa gastar uma ação rápida além da padrão para atacar até o início do seu próximo turno.", pre("Hesitate", { talents: ["hesitate"] })),
  t("Sudden Strike", "sudden-strike", "Quando receberia o benefício do Skirmisher e acerta o oponente, soma o dano de Sneak Attack. (Opção no diálogo: marque Skirmisher.)", pre("Skirmisher, Sneak Attack", { talents: ["skirmisher", "sneak-attack"] })),
  t("Weakening Strike", "weakening-strike", "Ao ferir um oponente sem Destreza na Reflexos, pode, em vez de movê-lo na trilha, impor −5 em todos os ataques e danos corpo a corpo dele até o fim do próximo turno.", pre("Dastardly Strike", { talents: ["dastardly-strike"] }))
);
tree("Slicer");
push(t("Virus", "virus", "Pode usar Use Computer no lugar de Mechanics para desativar dispositivos computadorizados (1 minuto, CD = Vontade do computador); quem acessar o computador afetado com droide ou outro computador vê a atitude do droide piorar para hostil.", pre("Electronic Sabotage, treinado em Use Computer", { trained: ["useComputer"] })));
tree("Spacer");
push(
  t("Cramped Quarters Fighting", "cramped-quarters-fighting", "Adjacente a um obstáculo ou barreira, +2 de cobertura na Reflexos.", pre("Spacehound, Starship Raider", { talents: ["spacehound", "starship-raider"] })),
  t("Make a Break for It", "make-a-break-for-it", "1/encontro, a pé ou num veículo, ação rápida: move metade do deslocamento (ou do veículo) sem provocar.", pre("Spacehound, Stellar Warrior", { talents: ["spacehound", "stellar-warrior"] }))
);

/* ---------------- SCOUT ---------------- */
tree("Camouflage");
push(
  t("Hide in Plain Sight", "hide-in-plain-sight", "1/encontro, a até 2 quadrados de cobertura ou camuflagem, move-se até ela e faz Stealth para se esconder como uma única ação de movimento.", pre("Hidden Movement, Improved Stealth", { talents: ["hidden-movement", "improved-stealth"] })),
  t("Hunker Down", "hunker-down", "Com cobertura, ação rápida: a cobertura vira aprimorada, e a aprimorada vira total, até o início do seu próximo turno. (Botão ⚡.)"),
  t("Shadow Striker", "shadow-striker", "Cada opção 1/encontro, ação padrão: Blinding Strike (um ataque; se ferir, ganha camuflagem total contra o alvo até o início do seu próximo turno); Confusing Strike (um ataque contra oponente sem Destreza ou de quem você tem camuflagem; se ferir, ele só faz uma ação rápida no próximo turno); Unexpected Attack (um ataque contra quem não o vê: +2 com camuflagem, +5 com camuflagem total).", pre("Hidden Movement, Improved Stealth", { talents: ["hidden-movement", "improved-stealth"] }))
);
tree("Fringer");
push(
  t("Flee", "flee", "Ação padrão: designa um oponente e move até o deslocamento para longe dele, sem provocar ataques de oportunidade dele; +2 de deslocamento até o fim do próximo turno.", pre("Long Stride", { talents: ["long-stride"] })),
  t("Keep It Together", "keep-it-together", "Ao improvisar (jury-rig) um dispositivo ou veículo com sucesso, ele não desce −5 passos ao fim do encontro (só −2 persistentes).", pre("Jury-Rigger", { talents: ["jury-rigger"] })),
  t("Sidestep", "sidestep", "Ação rápida: o custo de mover na diagonal cai para 1 até o fim do turno (armadura leve ou nenhuma).", pre("Long Stride", { talents: ["long-stride"] })),
  t("Surge", "surge-talent", "1/encontro, ação rápida: move até o seu deslocamento.", pre("Long Stride", { talents: ["long-stride"] })),
  t("Swift Strider", "swift-strider", "Cada opção 1/encontro: Blurring Burst (ação de movimento: move até o deslocamento e +2 na Reflexos até o fim do encontro); Sudden Assault (ação padrão: investida sem a penalidade na Reflexos); Weaving Stride (ação de movimento: move o deslocamento; +2 de esquiva cumulativo na Reflexos a cada ataque de oportunidade sofrido, até o início do seu próximo turno).", pre("Long Stride, Sidestep", { talents: ["long-stride", "sidestep"] }))
);

/* ---------------- SOLDIER ---------------- */
tree("Brawler");
push(
  t("Cantina Brawler", "cantina-brawler", "Flanqueado, +2 em ataques e dano desarmados. (Opção no diálogo de ataque.)"),
  t("Counterpunch", "counterpunch", "Lutando defensivamente, qualquer criatura adjacente que o ataque provoca um ataque de oportunidade seu."),
  t("Experienced Brawler", "experienced-brawler", "Cada opção 1/encontro, ação padrão: Avoid Attack (um ataque corpo a corpo; até o início do seu próximo turno, +5 de esquiva na Reflexos contra um ataque, como reação); Fortified Mind (idem, +5 na Fortitude ou Vontade contra um ataque); Focused Stance (idem, move 2 quadrados como reação, sem provocar).", pre("Melee Smash, Stunning Strike", { talents: ["melee-smash", "stunning-strike"] })),
  t("Make Do", "make-do", "Sem penalidade em ataques com armas improvisadas."),
  t("Man Down", "man-down", "Quando um aliado a até 6 quadrados cai a 0 PV, move até o deslocamento em direção a ele como reação, sem provocar."),
  t("Pick a Fight", "pick-a-fight", "Na rodada de surpresa, você e os aliados a até 6 quadrados recebem +1 de moral nos ataques; até o fim do encontro mantêm o bônus contra alvos que você ou os aliados feriram na rodada de surpresa.", pre("Cantina Brawler", { talents: ["cantina-brawler"] })),
  t("Sucker Punch", "sucker-punch", "Quando seu ataque corpo a corpo fere um oponente sem Destreza na Reflexos, ele não pode fazer ataques de oportunidade até o fim do próximo turno dele.")
);
tree("Weapon Specialist");
push(
  t("Crushing Assault", "crushing-assault", "Ao ferir com arma contundente com Weapon Specialization, seu próximo ataque contra o mesmo oponente antes do fim do encontro recebe +2 no ataque e no dano (não acumula).", pre("Weapon Specialization", { talents: ["weapon-specialization"] })),
  t("Impaling Assault", "impaling-assault", "Ao ferir com arma perfurante com Weapon Specialization, o deslocamento do alvo cai 2 quadrados até o fim do seu próximo turno (não acumula).", pre("Weapon Specialization", { talents: ["weapon-specialization"] })),
  t("Stinging Assault", "stinging-assault", "Ao ferir com arma cortante com Weapon Specialization, o alvo sofre −2 nos ataques corpo a corpo contra você até o início do seu próximo turno (não acumula).", pre("Weapon Specialization", { talents: ["weapon-specialization"] }))
);

/* ---------------- PRESTÍGIO ---------------- */
tree("Blockade Runner");
push(
  t("Close Cover", "close-cover", "Ocupando o mesmo espaço que um veículo maior, o seu recebe +5 de cobertura dele.", pre("Watch This", { talents: ["watch-this"] })),
  t("Outrun", "outrun", "Ao usar movimento total (all-out) como piloto, o veículo recebe +2 de esquiva na Reflexos."),
  t("Punch Through", "punch-through", "Pilotando, veículos menores que tentam enfrentá-lo em dogfight sofrem −10 no Pilot (em vez de −5)."),
  t("Small Target", "small-target", "Pilotando um veículo Colossal ou menor, armas de escala capital sofrem −20 contra ele (em vez de −20 só se menor que Colossal) e não fazem crítico automático com 20 natural, salvo se o total acertar."),
  t("Watch This", "watch-this", "Pode mover-se para dentro e através do espaço de um veículo Colossal (fragata) ou maior sem colidir; pilotando Colossal ou menor, ocupa o mesmo espaço que um veículo Colossal (fragata) ou maior.")
);
tree("Bounty Hunter");
push(
  t("Dread", "dread", "Ação padrão: Persuasion contra a Vontade do alvo do seu Hunter's Target; se vencer, ele sofre −5 na Vontade enquanto você estiver em linha de visão (medo).", pre("Hunter's Mark, Hunter's Target", { talents: ["hunters-mark", "hunters-target"] })),
  t("Nowhere to Run", "nowhere-to-run", "1/turno, quando o alvo do seu Hunter's Target tenta fazer withdraw, você faz um ataque de oportunidade contra ele.", pre("Hunter's Mark, Hunter's Target, Nowhere to Hide", { talents: ["hunters-mark", "hunters-target", "nowhere-to-hide"] })),
  t("Tag", "tag", "Ao ferir o alvo do seu Hunter's Target, todos os aliados recebem +2 no próximo ataque contra ele até o início do seu próximo turno.", pre("Hunter's Mark, Hunter's Target", { talents: ["hunters-mark", "hunters-target"] }))
);
tree("Gand Findsman");
push(
  t("Findsman Ceremonies", "findsman-ceremonies", "1/dia, 10 minutos de ritual gastando Pontos da Força: até o fim do dia, em Perception, Stealth, Use the Force (farseeing) ou ataques, pode rerrolar (fica com o segundo) um número de vezes igual aos PF gastos; recupera os PF não usados ao fim do dia.", pre("Force Sensitivity", { feats: ["force-sensitivity"] })),
  t("Findsman's Foresight", "findsmans-foresight", "Contra surpresa, rola Perception duas vezes e fica com o melhor.", pre("Findsman Ceremonies", { talents: ["findsman-ceremonies"] })),
  t("Omens", "omens", "Quando um aliado a até 10 quadrados em linha de visão tira 1 ou 20 natural num ataque, você recebe +2 de intuição no próximo ataque ou na Reflexos até o fim do seu próximo turno.", pre("Findsman Ceremonies", { talents: ["findsman-ceremonies"] })),
  t("Target Visions", "target-visions", "1/encontro, quando um inimigo se move a até 6 quadrados de você, faz um ataque contra ele como reação.", pre("Findsman Ceremonies", { talents: ["findsman-ceremonies"] })),
  t("Temporal Awareness", "temporal-awareness", "1/encontro, reação a um ataque inimigo: move até o seu deslocamento.", pre("Findsman Ceremonies", { talents: ["findsman-ceremonies"] }))
);
tree("Infamy");
push(
  t("Fear Me", "fear-me", "1/encontro, como reação quando um capanga seu desceria na trilha, reduz os passos em 1; além disso, o capanga recupera PV iguais ao seu nível heroico.", pre("Attract Minion, Inspire Fear I, Inspire Fear II", { talents: ["attract-minion", "inspire-fear-i", "inspire-fear-ii"] })),
  t("Frighten", "frighten", "1/encontro, ação livre: até o fim do encontro, inimigos adjacentes ao seu capanga que comecem o turno ali são movidos 1 quadrado para longe dele (afeta a mente).", pre("Attract Minion, Inspire Fear I", { talents: ["attract-minion", "inspire-fear-i"] })),
  t("Terrify", "terrify", "Ação padrão: Persuasion contra a Vontade de um alvo afetado pelo seu Inspire Fear; se vencer, no próximo turno ele precisa gastar uma ação de movimento para se afastar de você; se não puder, a penalidade de Inspire Fear dobra até o início do seu próximo turno (medo).", pre("Frighten, Inspire Fear I, Inspire Fear II", { talents: ["frighten", "inspire-fear-i", "inspire-fear-ii"] })),
  t("Unsavory Reputation", "unsavory-reputation", "Oponentes reduzidos à metade dos PV ou menos a até 6 quadrados sofrem −2 em ataques e perícias pelo resto do encontro (afeta a mente).", pre("Inspire Fear I, II e III, Notorious", { talents: ["inspire-fear-i", "inspire-fear-ii", "inspire-fear-iii", "notorious"] }))
);
tree("Mastermind");
push(
  t("Bodyguard I", "bodyguard-i", "Adjacente a um capanga, 1/turno, como reação a um ataque contra você, redireciona o ataque para o capanga (compare com as defesas dele).", pre("Attract Minion", { talents: ["attract-minion"] })),
  t("Bodyguard II", "bodyguard-ii", "Ao redirecionar com Bodyguard I, a defesa visada do capanga recebe bônus igual à metade do seu nível de classe.", pre("Attract Minion, Bodyguard I", { talents: ["attract-minion", "bodyguard-i"] })),
  t("Bodyguard III", "bodyguard-iii", "Ao redirecionar, o capanga pode atacar imediatamente o atacante se ele estiver ao alcance; o bônus de Bodyguard II passa ao nível de classe inteiro.", pre("Attract Minion, Bodyguard I, Bodyguard II", { talents: ["attract-minion", "bodyguard-i", "bodyguard-ii"] })),
  t("Impel Ally III", "impel-ally-iii", "1/encontro, gastando três ações rápidas em turnos seguidos, concede a um aliado uma ação padrão e uma de movimento, usadas imediatamente no seu turno após a última ação rápida.", pre("Impel Ally I, Impel Ally II", { talents: ["impel-ally-i", "impel-ally-ii"] })),
  t("Inspire Wrath", "inspire-wrath", "Ação padrão: designa um alvo para a ira dos aliados; enquanto o virem, eles recebem +2 de moral em ataques e perícias contra ele (um alvo por vez; troca com outra ação padrão). (Botão ⚡.)"),
  t("Shelter", "shelter", "Adjacente a um capanga, +2 de cobertura na Reflexos.", pre("Attract Minion", { talents: ["attract-minion"] })),
  t("Tactical Superiority", "tactical-superiority", "Gastando duas ações rápidas, escolha dois aliados: cada um move 2 quadrados como reação, sem provocar."),
  t("Tactical Withdraw", "tactical-withdraw", "Gastando duas ações rápidas, aliados em linha de visão e a até 6 quadrados podem fazer withdraw como ação rápida até o início do seu próximo turno."),
  t("Urgency", "urgency", "1/encontro, gastando três ações rápidas em turnos seguidos, aliados em linha de visão recebem +2 de deslocamento até o início do seu próximo turno após a última ação.", pre("Impel Ally I, Impel Ally II", { talents: ["impel-ally-i", "impel-ally-ii"] })),
  t("Wealth of Allies", "wealth-of-allies", "Quando um capanga seu morre, é substituído por outro do mesmo nível 24 horas depois.", pre("Attract Minion", { talents: ["attract-minion"] }))
);
tree("Gunslinger");
push(t("Ranged Flank", "ranged-flank", "A até 6 quadrados de um alvo e com pistola ou rifle, conta como ocupando o quadrado adjacente mais próximo dele para fins de flanquear (seu ou dos aliados); ação rápida para designar o alvo."));
tree("Pistoleer");
push(
  t("Dash and Blast", "dash-and-blast", "Rodada completa, empunhando duas pistolas: move até o dobro do deslocamento e faz um ataque à distância com cada pistola (penalidades normais de duas armas).", pre("Dual Weapon Mastery I, Running Attack", { feats: ["dual-weapon-mastery-i", "running-attack"] })),
  t("Flanking Fire", "flanking-fire", "Flanqueado por dois ou mais oponentes e com duas pistolas, faz um ataque total como ação padrão, desde que ataque pelo menos dois dos que o flanqueiam.", pre("Dual Weapon Mastery I", { feats: ["dual-weapon-mastery-i"] })),
  t("Guaranteed Shot", "guaranteed-shot", "Com duas pistolas, ação padrão: um ataque à distância com uma delas; mesmo errando, causa dano igual a metade do seu nível heroico. Gasta um tiro.", pre("Dual Weapon Mastery I", { feats: ["dual-weapon-mastery-i"] })),
  t("Hailfire", "hailfire", "Com duas pistolas, ação padrão: ataque em área com ambas como se estivessem em fogo automático (mesmo que não tenham), com as penalidades normais; divide os tiros entre elas.", pre("Dual Weapon Mastery I", { feats: ["dual-weapon-mastery-i"] })),
  t("Twin Shot", "twin-shot", "Com duas pistolas, +2 nas jogadas de dano usando Rapid Shot. (Automático com duas pistolas equipadas.)", pre("Dual Weapon Mastery I, Rapid Shot", { feats: ["dual-weapon-mastery-i", "rapid-shot"] }))
);

export default out;

export const CLASS_TREES = {
  noble: ["Disgrace"],
  "ace-pilot": ["Blockade Runner"],
  "bounty-hunter": ["Gand Findsman"],
  gunslinger: ["Pistoleer"]
};

/* ---------------- CLASSES DE PRESTÍGIO NOVAS ---------------- */
const more = [];
const T2 = (tr, name, key, text, p = {}) => { TREE = tr; more.push(t(name, key, text, p)); };
// Assassin
T2("Assassin", "Advantageous Positioning", "advantageous-positioning", "Um oponente flanqueado por você fica surpreso contra seus ataques e perde a Destreza na Reflexos. (Automático com a opção Flanqueando.)", pre("Shift", { talents: ["shift"] }));
T2("Assassin", "Get Some Distance", "get-some-distance", "1/encontro, ação padrão: um ataque corpo a corpo e depois move até o deslocamento para longe do alvo, sem provocar.", pre("Advantageous Positioning, Shift", { talents: ["advantageous-positioning", "shift"] }));
T2("Assassin", "Murderous Arts I", "murderous-arts-i", "Quando seu ataque faz o oponente descer na trilha de condição, ele sofre +1d6 de dano.");
T2("Assassin", "Murderous Arts II", "murderous-arts-ii", "Ao acertar um oponente que você marcou (Mark), seus ataques causam +1d6 de dano.", pre("Murderous Arts I", { talents: ["murderous-arts-i"] }));
T2("Assassin", "Ruthless", "ruthless", "1/encontro, ao reduzir um inimigo a 0 PV ou ao fim da trilha, recebe imediatamente uma ação padrão bônus.");
T2("Assassin", "Shift", "shift", "Como ação de movimento, move 1 quadrado sem provocar ataques de oportunidade.");
T2("Assassin", "Sniping Assassin", "sniping-assassin", "Atacando à distância um alvo fora do alcance à queima-roupa, soma metade do seu nível de classe ao dano. (Automático em alcance curto, médio ou longo.)");
T2("Assassin", "Sniping Marksman", "sniping-marksman", "1/encontro, num ataque à distância contra alvo fora da queima-roupa, ignora o bônus de cobertura dele.", pre("Sniping Assassin", { talents: ["sniping-assassin"] }));
T2("Assassin", "Sniping Master", "sniping-master", "Mira com uma única ação rápida contra um alvo fora do alcance à queima-roupa.", pre("Sniping Assassin, Sniping Marksman", { talents: ["sniping-assassin", "sniping-marksman"] }));
T2("GenoHaradan", "Deadly Repercussions", "deadly-repercussions", "Ao reduzir um alvo a 0 PV ou ao fim da trilha, todos os oponentes que tinham linha de visão dele e de você sofrem −2 nos ataques até o início do seu próximo turno.");
T2("GenoHaradan", "Manipulating Strike", "manipulating-strike", "1/turno, ao ferir um alvo com ataque que não seja de área, faz Persuasion contra a Vontade dele; se vencer, decide o que ele faz com a ação rápida no próximo turno (afeta a mente).");
T2("GenoHaradan", "Improved Manipulating Strike", "improved-manipulating-strike", "Com Manipulating Strike, também decide a ação de movimento dele (não pode jogá-lo em perigo).", pre("Manipulating Strike", { talents: ["manipulating-strike"] }));
T2("GenoHaradan", "Pulling the Strings", "pulling-the-strings", "Ação padrão: Persuasion contra a Vontade de um alvo a até 12 quadrados; se vencer, move-o até metade do deslocamento dele e pode fazê-lo atacar imediatamente outro alvo ao alcance (não para um perigo).");
// Charlatan
T2("Trickery", "Cunning Distraction", "cunning-distraction", "Ao fintar um oponente com sucesso em combate, move até metade do deslocamento imediatamente.");
T2("Trickery", "Damaging Deception", "damaging-deception", "Ação padrão: Deception contra a Vontade de um alvo que o veja, ouça e entenda; se vencer, o próximo ataque seu ou de aliado contra ele causa +2 dados de dano.", pre("Cunning Distraction", { talents: ["cunning-distraction"] }));
T2("Trickery", "Distracting Shoot", "distracting-shoot", "1/encontro, reação quando um aliado é atacado: faz Deception e o resultado substitui a defesa do aliado contra esse ataque, se for maior.", pre("Cunning Distraction", { talents: ["cunning-distraction"] }));
T2("Trickery", "Improved Soft Cover", "improved-soft-cover", "Adjacente a outra criatura, ação rápida: +2 de cobertura na Reflexos até o início do seu próximo turno ou até deixar de estar adjacente.", pre("Innocuous", { talents: ["innocuous"] }));
T2("Trickery", "Innocuous", "innocuous", "Ação rápida: Deception contra a Vontade de um inimigo a até 6 quadrados; se vencer, ele sofre −5 nos ataques contra você até o início do seu próximo turno. (Botão ⚡.)");
T2("Trickery", "Treacherous", "treacherous", "Quando é atacado estando adjacente a outra criatura, move 1 quadrado como reação; o ataque visa a criatura adjacente (se você sair de uma área ameaçada, faz um ataque de oportunidade antes).", pre("Improved Soft Cover, Innocuous", { talents: ["improved-soft-cover", "innocuous"] }));
// Master Privateer
T2("Piracy", "Bloodthirsty", "bloodthirsty", "Golpe de misericórdia como ação de movimento; ao matar assim, aliados em linha de visão recebem +2 de moral nos ataques até o fim do encontro.");
T2("Piracy", "Fight to the Death", "fight-to-the-death", "1/encontro, ação rápida: aliados a até 6 quadrados recuperam PV iguais ao seu nível heroico.", pre("Bloodthirsty", { talents: ["bloodthirsty"] }));
T2("Piracy", "Keep Them Reeling", "keep-them-reeling", "Ação padrão: um ataque corpo a corpo ou à distância; se acertar, não causa dano, mas o alvo precisa mover-se ou fazer withdraw para longe de você no próximo turno.");
T2("Piracy", "Raider's Frenzy", "raiders-frenzy", "1/rodada, quando um aliado a até 6 quadrados fere um alvo, todos os aliados em linha de visão recebem bônus no dano igual à metade do seu nível de classe contra ele até o fim do encontro.");
T2("Piracy", "Raider's Surge", "raiders-surge", "1/encontro, ação padrão: Deception ou Persuasion contra a Vontade de todos os inimigos em linha de visão; quem falhar precisa fazer withdraw no próximo turno ou sofre −1 nos ataques até o fim do encontro.");
T2("Piracy", "Savage Reputation", "savage-reputation", "Oponentes a até 6 quadrados que o reconheçam sofrem −1 em todos os ataques (afeta a mente, medo).", pre("Bloodthirsty", { talents: ["bloodthirsty"] }));
T2("Piracy", "Take Them Alive", "take-them-alive", "Quando você ou um aliado a até 6 quadrados reduz um alvo a 0 PV, pode tratar como dano de atordoamento (o alvo fica inconsciente).");
// Outlaw
T2("Outlaw", "Confounding Attack", "confounding-attack", "1/encontro, ao usar Uncanny Instincts, pode abrir mão do movimento para fazer um ataque contra quem o atingiu; se o ataque corpo a corpo ferir, vocês trocam de lugar.", pre("Tangle Up, Uncanny Instincts", { talents: ["tangle-up", "uncanny-instincts"] }));
T2("Outlaw", "Double Up", "double-up", "1/encontro, ao usar Seize the Moment, troca a ação rápida extra por um ataque contra o alvo ferido; se for à distância e ferir, o dano soma ao do aliado para RD, SR e Limiar.", pre("Find an Opening, Seize the Moment", { talents: ["find-an-opening", "seize-the-moment"] }));
T2("Outlaw", "Find an Opening", "find-an-opening", "Ao usar Seize the Moment, pode trocar a ação rápida por mirar com uma única ação rápida no próximo turno.", pre("Seize the Moment", { talents: ["seize-the-moment"] }));
T2("Outlaw", "Opportunistic Defense", "opportunistic-defense", "1/encontro, ao usar Uncanny Instincts, troca o movimento por +5 na Reflexos até o fim do seu próximo turno.", pre("Uncanny Instincts", { talents: ["uncanny-instincts"] }));
T2("Outlaw", "Preternatural Senses", "preternatural-senses", "1/encontro, reação: soma metade do seu nível de classe a uma Defesa à escolha. (Botão ⚡.)", pre("Uncanny Instincts", { talents: ["uncanny-instincts"] }));
T2("Outlaw", "Seize the Moment", "seize-the-moment", "1/rodada, quando um aliado fere um oponente, você faz uma ação rápida como reação.");
T2("Outlaw", "Tangle Up", "tangle-up", "Ação padrão: um ataque corpo a corpo ou à distância que não seja de área; se acertar, causa metade do dano (mín. 1) e o alvo perde a próxima ação de movimento.");
T2("Outlaw", "Uncanny Instincts", "uncanny-instincts", "1/encontro, quando um oponente o fere, move 1 quadrado como reação, sem provocar.");
out.push(...more);
CLASS_TREES.assassin = ["Assassin", "GenoHaradan", "Misfortune", "Malkite Poisoner"];
CLASS_TREES.charlatan = ["Trickery", "Disgrace", "Fortune"];
CLASS_TREES["master-privateer"] = ["Piracy", "Infamy", "Spacer"];
CLASS_TREES.outlaw = ["Outlaw", "Slicer", "Fringer", "Survivor"];
