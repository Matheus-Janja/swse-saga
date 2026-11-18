// Talentos do Livro Básico (Cap. 3, 6 e 12), com erratas oficiais aplicadas. Textos resumidos.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, ...o
});
const mod = (target, value, type = "untyped") => ({ target, value: String(value), type, label: "", disabled: false });
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
    key, tree: o.tree ?? TREE, category: o.category ?? CAT, classes: [],
    description: `<p>${text}</p>`,
    prerequisites: P(pre),
    choice: { type: o.choice ?? "", value: o.value ?? "", options: [] },
    repeatable: !!o.repeatable,
    modifiers: o.modifiers ?? [],
    rerolls: o.rerolls ?? []
  }
});
const pre = (text, o = {}) => ({ text, ...o });

const out = [];
const push = (...x) => out.push(...x);

/* ---------------- JEDI ---------------- */
tree("Jedi Consular");
push(
  t("Adept Negotiator", "adept-negotiator", "Ação padrão: teste de Persuasion contra a Vontade de um inimigo (Int 3+, que o veja e entenda). Sucesso move o alvo −1 passo na trilha de condição (+5 de Vontade se tiver nível maior). Ao chegar ao fim da trilha, ele não ataca você nem aliados pelo resto do encontro, salvo se atacado. Efeito de afetar a mente."),
  t("Force Persuasion", "force-persuasion", "Usa o modificador de Use the Force no lugar de Persuasion; é considerado treinado em Persuasion. Rerrolagens de Persuasion podem usar Use the Force.", pre("Adept Negotiator", { talents: ["adept-negotiator"] })),
  t("Master Negotiator", "master-negotiator", "Quando Adept Negotiator funciona, o alvo move −1 passo adicional (−2 no total).", pre("Adept Negotiator", { talents: ["adept-negotiator"] })),
  t("Skilled Advisor", "skilled-advisor", "Ação de rodada completa: aconselha um aliado, que recebe +5 no próximo teste de perícia (+10 gastando um Ponto da Força). Não em si mesmo. Afeta a mente.")
);
tree("Jedi Guardian");
push(
  t("Acrobatic Recovery", "acrobatic-recovery", "Se um efeito o derrubaria (prone), um teste de Acrobatics CD 20 o mantém de pé."),
  t("Battle Meditation", "battle-meditation", "Rodada completa + 1 Ponto da Força: você e aliados a até 6 quadrados recebem +1 de intuição nos ataques até o fim do encontro (enquanto permanecerem a até 6 quadrados). Afeta a mente."),
  t("Elusive Target", "elusive-target", "Em combate corpo a corpo, oponentes que tentem atirar em você sofrem −5 adicional (−10 no total)."),
  t("Force Intuition", "force-intuition", "Usa o modificador de Use the Force no lugar de Initiative e é considerado treinado em Initiative (errata)."),
  t("Resilience", "resilience", "Ação de rodada completa: sobe +2 passos na trilha de condição (errata).")
);
tree("Jedi Sentinel");
push(
  t("Clear Mind", "clear-mind", "Pode rerrolar testes opostos de Use the Force para evitar ser detectado por outros usuários da Força (fica com o segundo resultado)."),
  t("Dark Side Sense", "dark-side-sense", "Pode rerrolar Use the Force para sentir presença e localização de personagens com Pontuação do Lado Sombrio 1+ (fica com o segundo resultado)."),
  t("Dark Side Scourge", "dark-side-scourge", "Contra criaturas com Pontuação do Lado Sombrio 1+, causa dano corpo a corpo extra igual ao seu mod. de Carisma (mínimo +1).", pre("Dark Side Sense", { talents: ["dark-side-sense"] })),
  t("Force Haze", "force-haze", "Ação padrão + Ponto da Força: oculta você e criaturas (até seu nível de classe) da percepção alheia; teste de Use the Force contra a Vontade de quem entrar em linha de visão. Dura até 1 minuto ou até um oculto atacar.", pre("Clear Mind", { talents: ["clear-mind"] })),
  t("Resist the Dark Side", "resist-the-dark-side", "+5 de bônus da Força em todas as Defesas contra poderes [dark side] e poderes de usuários sombrios.", pre("Dark Side Sense", { talents: ["dark-side-sense"] }))
);
tree("Lightsaber Combat");
push(
  t("Block", "block", "Reação: nega um ataque corpo a corpo com teste de Use the Force (CD = resultado do ataque); −5 cumulativo por uso desde seu último turno. Precisa de sabre aceso e estar ciente do ataque. Pode bloquear ataques em área corpo a corpo (metade/nenhum dano) e, gastando um Ponto da Força, proteger um aliado adjacente (errata)."),
  t("Deflect", "deflect", "Reação: nega um ataque à distância com teste de Use the Force (CD = resultado do ataque); −5 cumulativo por uso. Contra fogo automático ou Force lightning: metade do dano se acertar, nenhum se errar (errata)."),
  t("Lightsaber Defense", "lightsaber-defense", "Ação rápida: +1 de deflexão na Defesa de Reflexos até o próximo turno (sabre aceso; não vale se surpreendido). Pode ser escolhido várias vezes (máximo +3).", {}, { repeatable: true }),
  t("Weapon Specialization (Lightsabers)", "weapon-specialization", "+2 no dano corpo a corpo com sabres de luz.", pre("Weapon Focus (lightsabers)", { feats: ["weapon-focus:lightsabers"] }), { choice: "weaponGroup", value: "lightsabers" }),
  t("Lightsaber Throw", "lightsaber-throw", "Arremessa o sabre como ação padrão (arma arremessada); pode trazê-lo de volta (até 6 quadrados) como ação rápida com Use the Force CD 20."),
  t("Redirect Shot", "redirect-shot", "Uma vez por rodada, após desviar um disparo de blaster com sucesso, faz um ataque à distância imediato contra outro alvo em linha de visão.", pre("Deflect, BBA +5", { talents: ["deflect"], bab: 5 }))
);

/* ---------------- NOBLE ---------------- */
tree("Influence");
push(
  t("Presence", "presence", "Pode usar Persuasion para intimidar como ação padrão (em vez de rodada completa)."),
  t("Demand Surrender", "demand-surrender", "1/encontro, ação padrão: teste de Persuasion contra a Vontade de um oponente com metade ou menos dos PV; se suceder, ele se rende (+5 de Vontade se tiver nível maior). Afeta a mente.", pre("Presence", { talents: ["presence"] })),
  t("Improved Weaken Resolve", "improved-weaken-resolve", "Como Weaken Resolve, mas o alvo continua fugindo mesmo se ferido.", pre("Presence, Weaken Resolve", { talents: ["presence", "weaken-resolve"] })),
  t("Weaken Resolve", "weaken-resolve", "1/rodada, ao causar dano ≥ Limiar de Dano: ação livre, Persuasion contra a Vontade; sucesso faz o alvo fugir apavorado por 1 minuto. Negado se o alvo tiver nível ≥ ao seu. Efeito de medo.", pre("Presence", { talents: ["presence"] }))
);
tree("Inspiration");
push(
  t("Bolster Ally", "bolster-ally", "Ação padrão: um aliado em linha de visão sobe +1 passo na trilha de condição e ganha PV temporários iguais ao nível dele (se estiver com metade dos PV ou menos). 1×/encontro por aliado. Afeta a mente."),
  t("Ignite Fervor", "ignite-fervor", "Ao acertar um oponente, um aliado em linha de visão recebe bônus de dano no próximo ataque igual ao nível dele.", pre("Bolster Ally, Inspire Confidence", { talents: ["bolster-ally", "inspire-confidence"] })),
  t("Inspire Confidence", "inspire-confidence", "Ação padrão: aliados em linha de visão recebem +1 de moral em ataques e perícias até o fim do encontro."),
  t("Inspire Haste", "inspire-haste", "Ação rápida: no próximo turno de um aliado, ele pode fazer um teste de perícia de ação padrão como ação de movimento."),
  t("Inspire Zeal", "inspire-zeal", "Quando um aliado em linha de visão move um oponente na trilha de condição, o oponente move −1 passo adicional.", pre("Bolster Ally, Inspire Confidence, Ignite Fervor", { talents: ["bolster-ally", "inspire-confidence", "ignite-fervor"] }))
);
tree("Leadership");
push(
  t("Born Leader", "born-leader", "1/encontro, ação rápida: aliados em linha de visão recebem +1 de intuição nos ataques enquanto permanecerem em sua linha de visão."),
  t("Coordinate", "coordinate", "Aliados em linha de visão concedem +1 adicional na ação de ajudar outro até seu próximo turno. Pode ser escolhido várias vezes (máximo +5).", {}, { repeatable: true }),
  t("Distant Command", "distant-command", "Aliados beneficiados por Born Leader não perdem o bônus ao sair da sua linha de visão.", pre("Born Leader", { talents: ["born-leader"] })),
  t("Fearless Leader", "fearless-leader", "Ação rápida: aliados recebem +5 de moral na Vontade contra medo pelo resto do encontro.", pre("Born Leader", { talents: ["born-leader"] })),
  t("Rally", "rally", "1/encontro, ação rápida: aliados com menos da metade dos PV recebem +2 de moral em Reflexos e Vontade e +2 no dano até o fim do encontro.", pre("Born Leader, Distant Command", { talents: ["born-leader", "distant-command"] })),
  t("Trust", "trust", "Abre mão da sua ação padrão para dar a um aliado uma ação padrão ou de movimento extra no próximo turno dele.", pre("Born Leader, Coordinate", { talents: ["born-leader", "coordinate"] }))
);
tree("Lineage");
push(
  t("Connections", "connections", "Obtém equipamento licenciado/restrito/militar/ilegal sem taxa de licença se o custo total ≤ nível × 1.000; reduz em 1 o multiplicador do mercado negro."),
  t("Educated", "educated", "Pode fazer qualquer teste de Knowledge sem treino."),
  t("Spontaneous Skill", "spontaneous-skill", "1/dia, faz um teste de perícia não treinada como se fosse treinado (Use the Force só com Force Sensitivity). Repetível: +1 uso/dia.", pre("Educated", { talents: ["educated"] }), { repeatable: true }),
  t("Wealth", "wealth", "A cada nível (inclusive o atual), recebe 5.000 × seu nível de classe em créditos (errata).")
);

/* ---------------- SCOUNDREL ---------------- */
tree("Fortune");
push(
  t("Fool's Luck", "fools-luck", "Ação padrão + Ponto da Força: até o fim do encontro, escolha +1 de competência em ataques, +5 em perícias ou +1 em todas as Defesas (errata)."),
  t("Fortune's Favor", "fortunes-favor", "Ao conseguir um acerto crítico, ganha uma ação padrão gratuita a ser usada até o fim do turno."),
  t("Gambler", "gambler", "+2 de competência em testes de Sabedoria para apostar. Repetível (+2 cada).", {}, { repeatable: true }),
  t("Knack", "knack", "1/dia, rerrola um teste de perícia e fica com o melhor. Repetível (+1 uso/dia). (Botão de rerrolagem nos testes.)", {}, { repeatable: true, rerolls: [{ skill: "all", keep: "best", label: "Knack (1/dia)" }] }),
  t("Lucky Shot", "lucky-shot", "1/dia, rerrola uma jogada de ataque e fica com a melhor. Repetível (+1 uso/dia).", pre("Knack", { talents: ["knack"] }), { repeatable: true })
);
tree("Misfortune");
push(
  t("Dastardly Strike", "dastardly-strike", "Ao acertar um oponente sem bônus de Destreza na Defesa de Reflexos, ele move −1 passo na trilha de condição."),
  t("Disruptive", "disruptive", "Gastando duas ações rápidas, suprime bônus de moral e intuição de inimigos em sua linha de visão até seu próximo turno."),
  t("Skirmisher", "skirmisher", "Se mover ao menos 2 quadrados antes de atacar e terminar em local diferente do inicial, +1 nos ataques até o próximo turno."),
  t("Sneak Attack", "sneak-attack", "+1d6 de dano contra oponente surpreendido ou sem bônus de Destreza (à distância só a até 6 quadrados). Repetível (máximo +10d6).", {}, { repeatable: true }),
  t("Walk the Line", "walk-the-line", "Ação padrão: oponentes a até 6 quadrados e em linha de visão sofrem −2 nas Defesas até seu próximo turno.", pre("Disruptive", { talents: ["disruptive"] }))
);
tree("Slicer");
push(
  t("Gimmick", "gimmick", "Pode emitir um comando de rotina a um computador como ação rápida."),
  t("Master Slicer", "master-slicer", "Pode rerrolar Use Computer para melhorar acesso a um computador, ficando com o melhor.", pre("Gimmick", { talents: ["gimmick"] }), { rerolls: [{ skill: "useComputer", keep: "best", label: "Master Slicer (melhorar acesso)" }] }),
  t("Trace", "trace", "Pode usar Use Computer no lugar de Gather Information quando tiver acesso a uma rede.")
);
tree("Spacer");
push(
  t("Hyperdriven", "hyperdriven", "1/dia, adiciona seu nível de classe como bônus a um ataque, perícia ou atributo; decide após ver o resultado (errata)."),
  t("Spacehound", "spacehound", "Sem penalidade em baixa/zero gravidade; ignora enjoo espacial; proficiente com todas as armas de naves."),
  t("Starship Raider", "starship-raider", "+1 nos ataques enquanto estiver a bordo de uma nave.", pre("Spacehound", { talents: ["spacehound"] })),
  t("Stellar Warrior", "stellar-warrior", "Ao tirar 20 natural num ataque a bordo de uma nave, ganha um Ponto da Força temporário (perdido no fim do encontro).", pre("Spacehound", { talents: ["spacehound"] }))
);

/* ---------------- SCOUT ---------------- */
tree("Awareness");
push(
  t("Acute Senses", "acute-senses", "Pode rerrolar Perception, ficando com o segundo resultado.", {}, { rerolls: [{ skill: "perception", keep: "second", label: "Acute Senses" }] }),
  t("Expert Tracker", "expert-tracker", "Sem penalidade em Survival para rastrear movendo-se ao deslocamento normal.", pre("Acute Senses", { talents: ["acute-senses"] })),
  t("Improved Initiative", "improved-initiative", "Pode rerrolar Initiative, ficando com o segundo resultado.", pre("Acute Senses", { talents: ["acute-senses"] }), { rerolls: [{ skill: "initiative", keep: "second", label: "Improved Initiative" }] }),
  t("Keen Shot", "keen-shot", "Sem penalidade de ataque contra alvos com camuflagem (não total).", pre("Acute Senses", { talents: ["acute-senses"] })),
  t("Uncanny Dodge I", "uncanny-dodge-i", "Mantém o bônus de Destreza na Defesa de Reflexos mesmo surpreendido ou atacado por oculto (exceto imobilizado).", pre("Acute Senses, Improved Initiative", { talents: ["acute-senses", "improved-initiative"] })),
  t("Uncanny Dodge II", "uncanny-dodge-ii", "Não pode ser flanqueado.", pre("Acute Senses, Improved Initiative, Uncanny Dodge I", { talents: ["acute-senses", "improved-initiative", "uncanny-dodge-i"] }))
);
tree("Camouflage");
push(
  t("Hidden Movement", "hidden-movement", "Sem penalidade em Stealth ao se mover no deslocamento normal.", pre("Improved Stealth", { talents: ["improved-stealth"] })),
  t("Improved Stealth", "improved-stealth", "Pode rerrolar Stealth, ficando com o segundo resultado.", {}, { rerolls: [{ skill: "stealth", keep: "second", label: "Improved Stealth" }] }),
  t("Total Concealment", "total-concealment", "Qualquer situação que lhe daria camuflagem lhe dá camuflagem total.", pre("Hidden Movement, Improved Stealth", { talents: ["hidden-movement", "improved-stealth"] }))
);
tree("Fringer");
push(
  t("Barter", "barter", "Pode rerrolar Persuasion para barganhar, ficando com o segundo resultado.", {}, { rerolls: [{ skill: "persuasion", keep: "second", label: "Barter (barganha)" }] }),
  t("Fringe Savant", "fringe-savant", "Ao tirar 20 natural num teste de perícia durante um encontro, ganha um Ponto da Força temporário."),
  t("Long Stride", "long-stride", "+2 quadrados de deslocamento sem armadura ou com armadura leve (também em voo/escalada/natação). (Aplicado automaticamente.)"),
  t("Jury-Rigger", "jury-rigger", "Pode rerrolar Mechanics para gambiarras (jury-rig), ficando com o segundo resultado.", {}, { rerolls: [{ skill: "mechanics", keep: "second", label: "Jury-Rigger" }] })
);
tree("Survivor");
push(
  t("Evasion", "evasion", "Ataques em área: metade do dano se acertarem, nenhum se errarem. (Aplicado automaticamente nos ataques em área.)"),
  t("Extreme Effort", "extreme-effort", "Gastando duas ações rápidas, +5 num único teste de Força ou perícia baseada em Força na mesma rodada."),
  t("Sprint", "sprint", "Ao correr, move até 5× o deslocamento (em vez de 4×)."),
  t("Surefooted", "surefooted", "Deslocamento não é reduzido por terreno difícil.")
);

/* ---------------- SOLDIER ---------------- */
tree("Armor Specialist");
push(
  t("Armored Defense", "armored-defense", "Na Defesa de Reflexos, soma o maior entre nível heroico e bônus de armadura (precisa ser proficiente). (Automático.)"),
  t("Improved Armored Defense", "improved-armored-defense", "Na Defesa de Reflexos, soma o maior entre (nível heroico + metade do bônus de armadura) e bônus de armadura. (Automático.)", pre("Armored Defense", { talents: ["armored-defense"] })),
  t("Juggernaut", "juggernaut", "Sua armadura não reduz o deslocamento nem a distância de corrida (precisa ser proficiente). (Automático.)", pre("Armored Defense", { talents: ["armored-defense"] })),
  t("Second Skin", "second-skin", "Com armadura proficiente, +1 no bônus de armadura em Reflexos e no bônus de equipamento em Fortitude. (Automático.)", pre("Armored Defense", { talents: ["armored-defense"] })),
  t("Armor Mastery", "armor-mastery", "O bônus máximo de Destreza da armadura aumenta em +1 (precisa ser proficiente). (Automático.)", pre("Armored Defense", { talents: ["armored-defense"] }))
);
tree("Brawler");
push(
  t("Expert Grappler", "expert-grappler", "+2 de competência em ataques de agarrar.", {}, { modifiers: [mod("grapple", 2, "competence")] }),
  t("Gun Club", "gun-club", "Usa uma arma à distância como arma corpo a corpo (porrete) sem penalidade; rifle com baioneta vira arma dupla."),
  t("Melee Smash", "melee-smash", "+1 de dano em ataques corpo a corpo. (Automático.)"),
  t("Stunning Strike", "stunning-strike", "Quando o dano corpo a corpo iguala ou excede o Limiar de Dano do alvo, ele move −1 passo adicional (errata: rolagem de dano). (Automático.)", pre("Melee Smash", { talents: ["melee-smash"] })),
  t("Unbalance Opponent", "unbalance-opponent", "Designa um oponente (até um tamanho de diferença) que não soma Força nos ataques contra você até seu próximo turno.", pre("Expert Grappler", { talents: ["expert-grappler"] }))
);
tree("Commando");
push(
  t("Battle Analysis", "battle-analysis", "Ação rápida, Knowledge (tactics) CD 15: sabe quais aliados e oponentes em linha de visão estão com metade ou menos dos PV."),
  t("Cover Fire", "cover-fire", "Ao atacar com pistola ou rifle, aliados a até 6 quadrados recebem +1 na Defesa de Reflexos até seu próximo turno.", pre("Battle Analysis", { talents: ["battle-analysis"] })),
  t("Demolitionist", "demolitionist", "Explosivos colocados com Mechanics causam +2 dados de dano. Repetível.", {}, { repeatable: true }),
  t("Draw Fire", "draw-fire", "Ação rápida: Persuasion contra a Vontade de oponentes em linha de visão; quem falhar só pode atacar você (se não tiver cobertura) até seu próximo turno."),
  t("Harm's Way", "harms-way", "1/rodada, ação rápida: protege um aliado adjacente; ataques contra ele passam a mirar você (errata).", pre("Treinado em Initiative", { trained: ["initiative"] })),
  t("Indomitable", "indomitable", "1/dia, ação rápida: sobe +5 passos na trilha de condição (não remove condições persistentes). Repetível (+1 uso/dia).", {}, { repeatable: true }),
  t("Tough as Nails", "tough-as-nails", "Pode usar second wind uma vez adicional por dia. (Automático.)")
);
tree("Weapon Specialist");
push(
  t("Devastating Attack", "devastating-attack", "Com o grupo/arma exótica escolhida (proficiente), trata o Limiar de Dano do alvo como 5 menor. Repetível. (Automático.)", {}, { choice: "weaponGroup", repeatable: true }),
  t("Penetrating Attack", "penetrating-attack", "Com o grupo/arma escolhida, trata a Redução de Dano do alvo como 5 menor. Repetível. (Automático.)", pre("Weapon Focus com o grupo escolhido", { sameChoice: "weapon-focus" }), { choice: "weaponGroup", repeatable: true }),
  t("Weapon Specialization", "weapon-specialization", "+2 de dano com o grupo/arma exótica escolhida. Repetível. (Automático.)", pre("Weapon Focus com o grupo escolhido", { sameChoice: "weapon-focus" }), { choice: "weaponGroup", repeatable: true })
);

/* ---------------- FORCE TALENTS ---------------- */
tree("Alter", "forceTalent");
push(
  t("Disciplined Strike", "disciplined-strike", "Com poderes de área (ex.: Force slam), exclui do efeito um número de alvos igual ao mod. de Sabedoria (mínimo 1) (errata)."),
  t("Telekinetic Power", "telekinetic-power", "Ao tirar 20 natural ao ativar um poder [telekinetic], pode usá-lo de novo imediatamente como ação livre (errata)."),
  t("Telekinetic Savant", "telekinetic-savant", "1/encontro, ação rápida: devolve ao conjunto um poder [telekinetic] sem gastar Ponto da Força (errata). Repetível (+1 uso/encontro).", {}, { repeatable: true })
);
tree("Control", "forceTalent");
push(
  t("Damage Reduction 10", "damage-reduction-10", "Ação padrão + Ponto da Força: Redução de Dano 10 por 1 minuto."),
  t("Equilibrium", "equilibrium", "Ação rápida + Ponto da Força: remove condições debilitantes e volta ao estado normal na trilha de condição."),
  t("Force Focus", "force-focus", "Rodada completa, Use the Force CD 15: recupera um poder da Força gasto."),
  t("Force Recovery", "force-recovery", "Ao usar second wind, recupera +1d6 PV por Ponto da Força que possui (máximo 10d6). (Automático.)", pre("Equilibrium", { talents: ["equilibrium"] }))
);
tree("Dark Side", "forceTalent");
push(
  t("Power of the Dark Side", "power-of-the-dark-side", "Ao gastar um Ponto da Força num ataque, pode rolar um dado bônus adicional e ficar com o melhor, aumentando a Pontuação do Lado Sombrio em 1.", pre("Pontuação do Lado Sombrio 1+", { darkSide: "atLeast1" })),
  t("Dark Presence", "dark-presence", "Ação padrão: você e aliados a até 6 quadrados recebem +1 da Força em todas as Defesas até o fim do encontro.", pre("Car 13, Power of the Dark Side, Lado Sombrio 1+", { abilities: { cha: 13 }, talents: ["power-of-the-dark-side"], darkSide: "atLeast1" })),
  t("Revenge", "revenge", "Quando um aliado de nível igual ou maior é morto ou reduzido a 0 PV em sua linha de visão, +2 da Força em ataques e dano até o fim do encontro.", pre("Dark Presence, Power of the Dark Side", { talents: ["dark-presence", "power-of-the-dark-side"], darkSide: "atLeast1" })),
  t("Swift Power", "swift-power", "1/dia, usa como ação rápida um poder da Força que normalmente exige ação padrão ou de movimento.", pre("Power of the Dark Side", { talents: ["power-of-the-dark-side"], darkSide: "atLeast1" }))
);
tree("Sense", "forceTalent");
push(
  t("Force Perception", "force-perception", "Usa Use the Force no lugar de Perception (evitar surpresa, notar inimigos, intuir) e é considerado treinado em Perception (errata)."),
  t("Force Pilot", "force-pilot", "Usa Use the Force no lugar de Pilot e é considerado treinado em Pilot (errata)."),
  t("Foresight", "foresight", "Gasta um Ponto da Força para rerrolar Initiative e ficar com o melhor; se tirar 20 natural na rerrolagem, recupera o Ponto.", pre("Force Perception", { talents: ["force-perception"] })),
  t("Gauge Force Potential", "gauge-force-potential", "Ação padrão, Use the Force contra a Vontade de uma criatura: descobre se tem Force Sensitivity, quantos poderes conhece e quantos Pontos da Força tem.", pre("Force Perception", { talents: ["force-perception"] })),
  t("Visions", "visions", "Ao usar farseeing, pode gastar um Ponto da Força (ação rápida) para ver o passado ou futuro do alvo (até 1 ano por nível).", pre("Force Perception, farseeing", { talents: ["force-perception"], forcePowers: ["farseeing"] }))
);

/* ---------------- PRESTIGE ---------------- */
tree("Expert Pilot");
push(
  t("Elusive Dogfighter", "elusive-dogfighter", "Em dogfight, quando vence o teste oposto de Pilot, pilotos inimigos no mesmo dogfight sofrem −10 nos ataques."),
  t("Full Throttle", "full-throttle", "Pode escolher 10 em Pilot para aumentar a velocidade; em all-out movement o veículo move 5× (em vez de 4×)."),
  t("Juke", "juke", "Ao lutar defensivamente como piloto, pode negar um acerto adicional por rodada com Vehicular Combat (errata).", pre("Vehicular Evasion", { talents: ["vehicular-evasion"] })),
  t("Keep It Together", "keep-it-together", "1/encontro, quando o veículo sofre dano ≥ seu Limiar, ele não desce na trilha de condição."),
  t("Relentless Pursuit", "relentless-pursuit", "Rola duas vezes testes opostos de Pilot para iniciar dogfight e fica com o melhor."),
  t("Vehicular Evasion", "vehicular-evasion", "Ataques em área contra o veículo: metade do dano se acertarem, nenhum se errarem (não se parado ou desativado).")
);
tree("Gunner");
push(
  t("Dogfight Gunner", "dogfight-gunner", "Em dogfight, sem penalidade com armas do veículo mesmo não sendo o piloto.", pre("Expert Gunner", { talents: ["expert-gunner"] })),
  t("Expert Gunner", "expert-gunner", "+1 nos ataques com armas de veículos."),
  t("Quick Trigger", "quick-trigger", "Quando um veículo inimigo sai do seu quadrado ou adjacente, faz um ataque de oportunidade contra ele.", pre("Expert Gunner", { talents: ["expert-gunner"] })),
  t("System Hit", "system-hit", "Ao causar dano ≥ Limiar de um veículo, ele desce −1 passo adicional.", pre("Expert Gunner", { talents: ["expert-gunner"] }))
);
tree("Bounty Hunter");
push(
  t("Hunter's Mark", "hunters-mark", "Ao mirar antes de um ataque à distância que causa dano, o alvo move −1 passo na trilha de condição (errata). (Indicado no ataque.)"),
  t("Hunter's Target", "hunters-target", "1/encontro, ação livre: designa um oponente; ao acertá-lo recebe bônus de dano igual ao nível de classe. (Opção no ataque.)", pre("Hunter's Mark", { talents: ["hunters-mark"] })),
  t("Notorious", "notorious", "Se não estiver disfarçado, rerrola Persuasion para intimidar, ficando com o melhor.", {}, { rerolls: [{ skill: "persuasion", keep: "best", label: "Notorious (intimidar)" }] }),
  t("Nowhere to Hide", "nowhere-to-hide", "Rerrola Gather Information para localizar um indivíduo, ficando com o segundo resultado.", {}, { rerolls: [{ skill: "gatherInformation", keep: "second", label: "Nowhere to Hide (localizar)" }] }),
  t("Relentless", "relentless", "Ataques/efeitos do seu Hunter's Target que o moveriam na trilha de condição não o movem.", pre("Hunter's Mark, Hunter's Target", { talents: ["hunters-mark", "hunters-target"] })),
  t("Ruthless Negotiator", "ruthless-negotiator", "Ao negociar recompensas, rerrola Persuasion e fica com o melhor.", pre("Notorious", { talents: ["notorious"] }))
);
tree("Infamy");
push(
  t("Inspire Fear I", "inspire-fear-i", "Oponentes de nível ≤ ao seu sofrem −1 em ataques e testes opostos contra você (inclusive Use the Force). Medo."),
  t("Inspire Fear II", "inspire-fear-ii", "Como Inspire Fear I, penalidade −2.", pre("Inspire Fear I", { talents: ["inspire-fear-i"] })),
  t("Inspire Fear III", "inspire-fear-iii", "Como Inspire Fear I, penalidade −5.", pre("Inspire Fear I, Inspire Fear II", { talents: ["inspire-fear-i", "inspire-fear-ii"] })),
  t("Notorious", "notorious", "Se não estiver disfarçado, rerrola Persuasion para intimidar, ficando com o melhor.", {}, { rerolls: [{ skill: "persuasion", keep: "best", label: "Notorious (intimidar)" }] }),
  t("Shared Notoriety", "shared-notoriety", "Seus asseclas podem rerrolar Persuasion para intimidar invocando seu nome (segundo resultado).", pre("Notorious", { talents: ["notorious"] }))
);
tree("Mastermind");
push(
  t("Attract Minion", "attract-minion", "Atrai um asseclo leal (personagem não heroico de nível = 3/4 do seu). Repetível.", {}, { repeatable: true }),
  t("Impel Ally I", "impel-ally-i", "Ação rápida: um aliado pode se mover seu deslocamento imediatamente. Até 3 vezes por turno."),
  t("Impel Ally II", "impel-ally-ii", "Duas ações rápidas: um aliado ganha uma ação padrão ou de movimento imediata.", pre("Impel Ally I", { talents: ["impel-ally-i"] }))
);
tree("Weapon Master");
push(
  t("Controlled Burst", "controlled-burst", "A penalidade de fogo automático e de Burst Fire cai para −2; armas só-automáticas apoiadas não sofrem penalidade. (Automático.)"),
  t("Exotic Weapon Mastery", "exotic-weapon-mastery", "É proficiente com todas as armas exóticas. (Automático.)"),
  t("Greater Devastating Attack", "greater-devastating-attack", "Com o grupo escolhido, trata o Limiar de Dano do alvo como 10 menor (substitui Devastating Attack). (Automático.)", pre("Greater Weapon Focus, Devastating Attack, Weapon Focus (mesmo grupo)", { talents: ["greater-weapon-focus", "devastating-attack"], sameChoice: "devastating-attack" }), { choice: "weaponGroup", repeatable: true }),
  t("Greater Penetrating Attack", "greater-penetrating-attack", "Com o grupo escolhido, trata a Redução de Dano do alvo como 10 menor. (Automático.)", pre("Greater Weapon Focus, Penetrating Attack, Weapon Focus (mesmo grupo)", { talents: ["greater-weapon-focus", "penetrating-attack"], sameChoice: "penetrating-attack" }), { choice: "weaponGroup", repeatable: true }),
  t("Greater Weapon Focus", "greater-weapon-focus", "+1 nos ataques com o grupo escolhido (acumula com Weapon Focus). (Automático.)", pre("Weapon Focus no mesmo grupo", { sameChoice: "weapon-focus" }), { choice: "weaponGroup", repeatable: true }),
  t("Greater Weapon Specialization", "greater-weapon-specialization", "+2 de dano com o grupo escolhido (acumula com Weapon Specialization). (Automático.)", pre("Greater Weapon Focus, Weapon Focus, Weapon Specialization (mesmo grupo)", { talents: ["greater-weapon-focus"], sameChoice: "weapon-specialization" }), { choice: "weaponGroup", repeatable: true }),
  t("Multiattack Proficiency (Heavy Weapons)", "multiattack-proficiency-heavy", "Reduz em 2 a penalidade de ataques múltiplos (ataque total) com armas pesadas. Repetível. (Automático.)", {}, { repeatable: true }),
  t("Multiattack Proficiency (Rifles)", "multiattack-proficiency-rifles", "Reduz em 2 a penalidade de ataques múltiplos (ataque total) com rifles. Repetível. (Automático.)", {}, { repeatable: true })
);
tree("Dark Side Devotee");
push(
  t("Channel Aggression", "channel-aggression", "Ao acertar um oponente flanqueado ou sem Destreza na Defesa de Reflexos, gaste um Ponto da Força (ação livre) para causar +1d6 por nível de classe (máximo 10d6)."),
  t("Channel Anger", "channel-anger", "Ação rápida + Ponto da Força: +2 de fúria em ataque e dano corpo a corpo por 5 + mod. Con rodadas; depois −1 passo na trilha de condição. Sem perícias de concentração. (Opção de fúria no ataque.)", pre("Channel Aggression", { talents: ["channel-aggression"] })),
  t("Crippling Strike", "crippling-strike", "Ao conseguir um crítico, gaste um Ponto da Força para reduzir o deslocamento do alvo à metade até ser totalmente curado.", pre("Channel Aggression", { talents: ["channel-aggression"] })),
  t("Embrace the Dark Side", "embrace-the-dark-side", "Pode rerrolar Use the Force ao ativar poderes [dark side] (segundo resultado). Não pode mais usar poderes [light side].", pre("Channel Aggression, Channel Anger", { talents: ["channel-aggression", "channel-anger"] }))
);
tree("Force Adept");
push(
  t("Force Power Adept", "force-power-adept", "Escolha um poder conhecido: ao usá-lo, pode gastar um Ponto da Força para rolar dois testes de Use the Force e ficar com o melhor. Repetível (outro poder).", {}, { choice: "forcePower", repeatable: true }),
  t("Force Treatment", "force-treatment", "Usa Use the Force no lugar de Treat Injury (considerado treinado) e não precisa de kit para primeiros socorros e tratamentos (errata)."),
  t("Fortified Body", "fortified-body", "Imune a doenças, venenos e radiação.", pre("Equilibrium", { talents: ["equilibrium"] }))
);
tree("Force Item");
push(
  t("Attune Weapon", "attune-weapon", "Gaste um Ponto da Força e uma rodada completa para sintonizar uma arma corpo a corpo: +1 da Força nos ataques com ela (só para você)."),
  t("Empower Weapon", "empower-weapon", "Gaste um Ponto da Força e uma rodada completa para potencializar uma arma corpo a corpo: +1 dado de dano (só com você)."),
  t("Force Talisman", "force-talisman", "Gaste um Ponto da Força (rodada completa) para criar um talismã: +1 da Força numa Defesa à escolha enquanto o portar. Apenas um ativo; se destruído, espere 24 horas."),
  t("Greater Force Talisman", "greater-force-talisman", "O talismã concede +1 da Força em todas as três Defesas.", pre("Force Talisman", { talents: ["force-talisman"] }))
);
tree("Gunslinger");
push(
  t("Debilitating Shot", "debilitating-shot", "Ao mirar antes de um ataque à distância que causa dano, o alvo move −1 passo na trilha de condição (errata). (Indicado no ataque.)"),
  t("Deceptive Shot", "deceptive-shot", "Duas ações rápidas: Deception contra a Vontade de um alvo a até 6 quadrados; se suceder, ele perde a Destreza na Defesa de Reflexos contra seus ataques até seu próximo turno."),
  t("Improved Quick Draw", "improved-quick-draw", "Pode sacar uma pistola e atacar na rodada surpresa mesmo se surpreendido."),
  t("Knockdown Shot", "knockdown-shot", "Ao mirar antes de um ataque à distância que acerta, derruba o alvo (até um tamanho maior que você)."),
  t("Multiattack Proficiency (Pistols)", "multiattack-proficiency-pistols", "Reduz em 2 a penalidade de ataques múltiplos com pistolas. Repetível. (Automático.)", {}, { repeatable: true }),
  t("Ranged Disarm", "ranged-disarm", "Pode desarmar com ataque à distância; se falhar, o oponente não ganha ataque livre."),
  t("Trigger Work", "trigger-work", "Sem penalidade de ataque ao usar Rapid Shot. (Automático.)")
);
tree("Duelist");
push(
  t("Force Fortification", "force-fortification", "Reação + Ponto da Força: nega um crítico contra você, sofrendo dano normal."),
  t("Greater Weapon Focus (Lightsabers)", "greater-weapon-focus", "+1 nos ataques corpo a corpo com sabres de luz (acumula com Weapon Focus).", pre("Weapon Focus (lightsabers)", { feats: ["weapon-focus:lightsabers"] }), { choice: "weaponGroup", value: "lightsabers" }),
  t("Greater Weapon Specialization (Lightsabers)", "greater-weapon-specialization", "+2 de dano corpo a corpo com sabres de luz (acumula com Weapon Specialization).", pre("Greater Weapon Focus (lightsabers), Weapon Focus (lightsabers), Weapon Specialization (lightsabers)", { feats: ["weapon-focus:lightsabers"], talents: ["greater-weapon-focus:lightsabers", "weapon-specialization:lightsabers"] }), { choice: "weaponGroup", value: "lightsabers" }),
  t("Multiattack Proficiency (Lightsabers)", "multiattack-proficiency-lightsabers", "Reduz em 2 a penalidade de ataques múltiplos com sabres de luz. Repetível. (Automático.)", {}, { repeatable: true }),
  t("Severing Strike", "severing-strike", "Quando o dano do sabre mataria o alvo (≥ PV atuais e ≥ Limiar), pode causar metade do dano, movê-lo −1 passo e decepar um braço ou perna (condição persistente).")
);
tree("Lightsaber Forms");
push(
  t("Ataru", "ataru", "Soma Destreza (em vez de Força) no dano com sabre de luz; dobro em duas mãos. (Automático se Des > For.)"),
  t("Djem So", "djem-so", "1/rodada, quando um oponente o acerta corpo a corpo, gaste um Ponto da Força (reação) para fazer um ataque imediato contra ele."),
  t("Jar'Kai", "jar-kai", "Com dois sabres, Lightsaber Defense concede o dobro do bônus de deflexão.", pre("Lightsaber Defense, Niman", { talents: ["lightsaber-defense", "niman"] })),
  t("Juyo", "juyo", "1/encontro, ação rápida + Ponto da Força: designa um inimigo; pode rerrolar o primeiro ataque de cada rodada contra ele (fica com o melhor).", pre("Weapon Focus (lightsabers), Weapon Specialization (lightsabers), BBA +10", { feats: ["weapon-focus:lightsabers"], talents: ["weapon-specialization:lightsabers"], bab: 10 })),
  t("Makashi", "makashi", "Com um único sabre em uma mão, a deflexão de Lightsaber Defense aumenta em 2 (máximo +5).", pre("Lightsaber Defense", { talents: ["lightsaber-defense"] })),
  t("Niman", "niman", "Empunhando um sabre de luz, +1 nas Defesas de Reflexos e Vontade."),
  t("Shien", "shien", "+5 no ataque à distância ao redirecionar um disparo (Redirect Shot).", pre("Deflect, Redirect Shot", { talents: ["deflect", "redirect-shot"] })),
  t("Shii-Cho", "shii-cho", "Com Block ou Deflect, a penalidade cumulativa é só −2 por uso.", pre("Block, Deflect", { talents: ["block", "deflect"] })),
  t("Sokan", "sokan", "Pode escolher 10 em Acrobatics para tumble mesmo sob pressão; cada quadrado ameaçado conta como 1 quadrado.", pre("Acrobatic Recovery", { talents: ["acrobatic-recovery"] })),
  t("Soresu", "soresu", "Pode rerrolar um teste de Use the Force falho ao usar Block ou Deflect.", pre("Block, Deflect", { talents: ["block", "deflect"] })),
  t("Trakata", "trakata", "Desligando e religando o sabre (duas ações rápidas), faz Deception para fintar em combate.", pre("Weapon Focus, Weapon Specialization (lightsabers), BBA +12", { feats: ["weapon-focus:lightsabers"], talents: ["weapon-specialization:lightsabers"], bab: 12 })),
  t("Vaapad", "vaapad", "Com sabre de luz, ameaça crítico com 19 ou 20 natural (19 não é acerto automático). (Automático.)", pre("Juyo, Weapon Focus, Weapon Specialization (lightsabers), BBA +12", { talents: ["juyo", "weapon-specialization:lightsabers"], feats: ["weapon-focus:lightsabers"], bab: 12 }))
);
tree("Military Tactics");
push(
  t("Assault Tactics", "assault-tactics", "Ação de movimento, Knowledge (tactics) CD 15: designa um alvo; você e aliados causam +1d6 de dano a ele até seu próximo turno. Afeta a mente."),
  t("Deployment Tactics", "deployment-tactics", "Ação de movimento, Knowledge (tactics) CD 15: você e aliados recebem +1 contra oponentes flanqueados ou +1 de esquiva contra ataques de oportunidade (+2 com Born Leader ou Battle Analysis)."),
  t("Field Tactics", "field-tactics", "Ação de movimento, Knowledge (tactics) CD 15: você e aliados a até 10 quadrados recebem +10 de cobertura (em vez de +5).", pre("Deployment Tactics", { talents: ["deployment-tactics"] })),
  t("One for the Team", "one-for-the-team", "Reação: assume metade ou todo o dano de um ataque contra um aliado adjacente (e vice-versa).", pre("Deployment Tactics", { talents: ["deployment-tactics"] })),
  t("Outmaneuver", "outmaneuver", "Ação padrão, Knowledge (tactics) CD 15: inimigos em linha de visão perdem bônus de competência, intuição, moral e esquiva até seu próximo turno.", pre("Deployment Tactics, Field Tactics", { talents: ["deployment-tactics", "field-tactics"] })),
  t("Shift Defense I", "shift-defense-i", "Ação rápida: −2 numa Defesa para +1 de competência em outra até seu próximo turno."),
  t("Shift Defense II", "shift-defense-ii", "Ação rápida: −5 numa Defesa para +2 de competência em outra.", pre("Shift Defense I", { talents: ["shift-defense-i"] })),
  t("Shift Defense III", "shift-defense-iii", "Ação rápida: +5 de competência numa Defesa e −5 nas outras duas.", pre("Shift Defense I, Shift Defense II", { talents: ["shift-defense-i", "shift-defense-ii"] })),
  t("Tactical Edge", "tactical-edge", "Pode usar Assault Tactics, Deployment Tactics ou Field Tactics como ação rápida.")
);
tree("Sith");
push(
  t("Dark Healing", "dark-healing", "Ação padrão + Ponto da Força: ataque à distância contra a Fortitude de uma criatura a até 6 quadrados; causa 1d6 por nível de classe e você cura o mesmo valor."),
  t("Dark Scourge", "dark-scourge", "+1 do lado sombrio nos ataques contra personagens Jedi."),
  t("Dark Side Adept", "dark-side-adept", "Pode rerrolar Use the Force ao ativar poderes [dark side] (segundo resultado)."),
  t("Dark Side Master", "dark-side-master", "Como Dark Side Adept, mas gastando um Ponto da Força fica com o melhor dos dois.", pre("Dark Side Adept", { talents: ["dark-side-adept"] })),
  t("Force Deception", "force-deception", "Usa Use the Force no lugar de Deception e é considerado treinado em Deception (errata)."),
  t("Improved Dark Healing", "improved-dark-healing", "Dark Healing alcança 12 quadrados e, mesmo se falhar, causa metade do dano e cura o mesmo valor.", pre("Dark Healing", { talents: ["dark-healing"] })),
  t("Wicked Strike", "wicked-strike", "Ao conseguir um crítico com sabre, gaste um Ponto da Força para mover o alvo −2 passos na trilha de condição.", pre("Weapon Focus (lightsabers), Weapon Specialization (lightsabers)", { feats: ["weapon-focus:lightsabers"], talents: ["weapon-specialization:lightsabers"] }))
);

/* ---------------- FORCE TECHNIQUES & SECRETS ---------------- */
tree("Force Techniques", "forceTechnique");
push(
  t("Force Point Recovery", "force-point-recovery", "No fim de um encontro, recupera automaticamente 1 Ponto da Força gasto nele. Repetível (+1).", {}, { repeatable: true }),
  t("Force Power Mastery", "force-power-mastery", "Escolha um poder: pode escolher 10 em Use the Force para ativá-lo mesmo sob pressão. Repetível (outro poder).", {}, { choice: "forcePower", repeatable: true }),
  t("Improved Force Trance", "improved-force-trance", "A cada hora em transe da Força, recupera PV iguais a 2 × nível de personagem."),
  t("Improved Move Light Object", "improved-move-light-object", "Move objeto leve como ação rápida; usá-lo como projétil é ação de movimento."),
  t("Improved Sense Force", "improved-sense-force", "Usa sentir a Força como ação de movimento."),
  t("Improved Sense Surroundings", "improved-sense-surroundings", "Usa sentir os arredores como ação livre."),
  t("Improved Telepathy", "improved-telepathy", "Ao usar telepatia, rerrola Use the Force e fica com o melhor.")
);
tree("Force Secrets", "forceSecret");
push(
  t("Devastating Power", "devastating-power", "Com um poder que causa dano: Ponto da Força para +50% de dados de dano, ou Ponto de Destino para dobrar os dados."),
  t("Distant Power", "distant-power", "Com um poder de alcance numérico: Ponto da Força multiplica o alcance por 10; Ponto de Destino leva o alcance a qualquer ponto do sistema estelar."),
  t("Multitarget Power", "multitarget-power", "Com poder de alvo único: Ponto da Força para afetar um alvo adicional; Ponto de Destino para um alvo a cada 4 níveis."),
  t("Quicken Power", "quicken-power", "Ponto da Força: ativa como ação rápida um poder de ação padrão/movimento; Ponto de Destino: como reação."),
  t("Shaped Power", "shaped-power", "Com poder em cone: Ponto da Força para virar uma linha de 1 quadrado (5× o comprimento); Ponto de Destino para escolher os alvos dentro de um raio.")
);

export default out;
