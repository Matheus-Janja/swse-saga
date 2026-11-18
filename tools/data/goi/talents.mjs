// Galaxy of Intrigue — talentos novos (Cap. 1). Textos resumidos.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, ...o
});
const ICON = "icons/magic/symbols/star-yellow.webp";
let TREE = "";
const tree = name => { TREE = name; };
const t = (name, key, text, pre = {}, o = {}) => ({
  name, type: "talent", img: ICON,
  system: {
    key, tree: o.tree ?? TREE, category: "talent", classes: [], source: "Galaxy of Intrigue",
    description: `<p>${text}</p>`, prerequisites: P(pre),
    choice: { type: o.choice ?? "", value: o.value ?? "", options: [] },
    repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], rerolls: o.rerolls ?? []
  }
});
const pre = (text, o = {}) => ({ text, ...o });
const skill = { choice: "skill", repeatable: true };
const out = [];
const push = (...x) => out.push(...x);

/* ---------------- NOBLE ---------------- */
tree("Master of Intrigue");
push(
  t("Advanced Planning", "advanced-planning", "Ao rolar Iniciativa para o combate, escolha um aliado voluntário em linha de visão: vocês trocam os resultados de Iniciativa. (Botão ⚡: troca no rastreador de combate com o aliado marcado.)"),
  t("Blend In", "blend-in", "Ação rápida: recebe camuflagem total enquanto estiver adjacente a pelo menos duas outras criaturas (não vale contra ataques de criaturas adjacentes). (Botão ⚡.)"),
  t("Done It All", "done-it-all", "Escolha dois talentos de classes não de prestígio que você não possui mas cujos pré-requisitos cumpre. 1/turno, no seu turno, pode gastar um Ponto da Força (ação livre) para ter os benefícios de um deles até o fim do seu próximo turno."),
  t("Get into Position", "get-into-position", "1/encontro, no início do seu primeiro turno, escolha dois aliados a até 12 quadrados e em linha de visão: cada um pode mover até o próprio deslocamento como reação."),
  t("Master Manipulator", "master-manipulator", "Cada opção 1/encontro, ação rápida: Demand Recovery (um aliado a até 5 quadrados sobe +5 passos na trilha de condição e recebe +2 de moral em ataques e perícias até o fim do próximo turno); Exceptional Control (role um d20 e anote; até o fim do encontro, como reação, substitua por ele o d20 de um inimigo ou aliado em linha de visão); Word of Warning (escolha um aliado a até 5 quadrados; uma vez no encontro, como reação, a defesa visada dele passa a usar o valor da sua mesma defesa). (Botão ⚡.)", pre("Advanced Planning, Get into Position", { talents: ["advanced-planning", "get-into-position"] })),
  t("Retaliation", "retaliation", "Quando desce na trilha de condição por dano que iguale ou supere seu Limiar, da próxima vez que acertar e ferir uma criatura ou droide com ataque corpo a corpo ou à distância até o fim do seu próximo turno, o alvo desce −1 passo automaticamente.", pre("Advanced Planning", { talents: ["advanced-planning"] }))
);
tree("Skill Challenge");
push(
  t("Guaranteed Boon", "guaranteed-boon", "Num desafio de perícia, se gastar um Ponto da Força num teste e mesmo assim acumular uma falha, recupera o Ponto da Força. (Automático no rastreador de desafios.)"),
  t("Leading Skill", "leading-skill", "Ao obter um sucesso num desafio de perícia, recebe +2 de intuição no próximo teste feito com uma perícia diferente no mesmo desafio. (Automático no rastreador.)"),
  t("Learn from Mistakes", "learn-from-mistakes", "Ao acumular uma falha num desafio de perícia, o próximo aliado a agir recebe +2 de intuição num teste, se fizer uma ação diferente (com outra perícia). (Lembrete no rastreador.)"),
  t("Try Your Luck", "try-your-luck", "Ao acumular uma falha num desafio de perícia, escolha um aliado: na próxima vez que ele usar a mesma perícia e fosse falhar, rola dois dados e fica com o melhor. (Lembrete no rastreador.)")
);
tree("Superior Skills");
push(
  t("Assured Skill", "assured-skill", "Escolha uma perícia: ao testá-la, pode abrir mão dos bônus de competência e rolar 2 dados, ficando com qualquer um. Repetível (outra perícia). (Opção no diálogo do teste.)", {}, skill),
  t("Critical Skill Success", "critical-skill-success", "Ao tirar 20 natural num teste de perícia, escolha outra perícia: uma vez até o fim do seu próximo turno pode receber +5 de competência nela (ação livre). (Lembrete automático no cartão do teste.)"),
  t("Exceptional Skill", "exceptional-skill", "Escolha uma perícia: resultados de 2 a 7 no dado contam como 8. Repetível (outra perícia). (Automático.)", pre("Treinado na perícia escolhida"), skill),
  t("Reliable Boon", "reliable-boon", "Ao gastar um Ponto da Força num teste de perícia, rerrola os 1 nos dados do Ponto da Força até obter 2 ou mais. (Automático.)"),
  t("Skill Boon", "skill-boon", "Escolha uma perícia: ao gastar um Ponto da Força nela, o dado do Ponto da Força sobe um passo (d6→d8→d10→d12, máx. d12). Repetível. (Automático.)", pre("Treinado na perícia escolhida"), skill),
  t("Skill Confidence", "skill-confidence", "Escolha uma perícia: com 19 ou 20 natural nela, recebe o benefício de Critical Skill Success e PV temporários iguais ao mod. de Carisma. Repetível. (Automático.)", pre("Critical Skill Success, treinado na perícia escolhida", { talents: ["critical-skill-success"] }), skill),
  t("Skillful Recovery", "skillful-recovery", "Escolha uma perícia: ao falhar num teste dela, recebe um Ponto da Força temporário que só pode ser gasto num teste dessa perícia até o fim do encontro (falhar = não atingir o resultado mínimo necessário). Repetível. (Lembrete no cartão do teste com CD.)", pre("Treinado na perícia escolhida"), skill)
);

/* ---------------- SCOUNDREL ---------------- */
tree("Revolutionary");
push(
  t("Bomb Thrower", "bomb-thrower", "+5 em Mechanics para manusear explosivos; com uma rodada completa e materiais adequados (blaster velho, kit de ferramentas, sucata de hangar), fabrica o equivalente a uma granada de fragmentação.", pre("Treinado em Mechanics", { trained: ["mechanics"] })),
  t("For the Cause", "for-the-cause", "Sempre que você ou um aliado a até 6 quadrados sofre dano que excede o Limiar, você e os aliados a até 6 quadrados recebem +2 em ataque e dano até o fim do seu próximo turno. (Botão ⚡: você e aliados marcados.)", pre("Make an Example", { talents: ["make-an-example"] })),
  t("Make an Example", "make-an-example", "Ao acertar um ataque que cause dano suficiente para exceder o Limiar do alvo, ele sofre −5 nos ataques contra você até o fim do seu próximo turno (afeta a mente). (Automático: o efeito vai junto do botão de dano quando o dano iguala ou supera o Limiar.)"),
  t("Revolutionary Rhetoric", "revolutionary-rhetoric", "Ação padrão: Persuasion contra a Vontade de um inimigo a até 12 quadrados; se vencer, ele só pode fazer ações de movimento e rápidas até o fim do próximo turno (termina se você atacá-lo; afeta a mente). (Botão ⚡.)")
);

/* ---------------- SCOUT ---------------- */
tree("Espionage");
push(
  t("Fade Out", "fade-out", "Usa Stealth no lugar de Deception para criar uma distração e se esconder; se for treinado em Deception, recebe +5 nesse teste.", pre("Treinado em Stealth", { trained: ["stealth"] })),
  t("Keep Together", "keep-together", "Quando é acertado ou errado por um ataque corpo a corpo ou à distância, pode, como reação, mover até seu deslocamento terminando adjacente a um aliado, sem provocar ataques de oportunidade."),
  t("Prudent Escape", "prudent-escape", "Quando reduz uma criatura a 0 PV ou a deixa inconsciente, você e até dois aliados a até 6 quadrados podem mover até o próprio deslocamento como reação, sem provocar."),
  t("Reactive Stealth", "reactive-stealth", "Quando um ataque à distância erra você e você tem camuflagem ou cobertura contra o atacante, pode mover metade do deslocamento (reação) e fazer um teste de Stealth para se esconder dele, se ainda tiver camuflagem ou cobertura no fim.", pre("Treinado em Stealth", { trained: ["stealth"] })),
  t("Sizing Up", "sizing-up", "1/encontro: Perception contra a Vontade de um alvo a até 6 quadrados e em linha de visão; se vencer, recebe +2 de intuição em perícias e ataques contra ele até o fim do encontro. (Botão ⚡.)")
);

/* ---------------- SOLDIER ---------------- */
tree("Brawler");
push(
  t("Crowd Control", "crowd-control", "Pode agarrar (grab) duas criaturas adjacentes ao mesmo tempo.", pre("Entangler", { talents: ["entangler"] })),
  t("Disarm and Engage", "disarm-and-engage", "Ao desarmar um oponente, faz imediatamente um ataque livre com a arma tomada, com −5 (mais a penalidade de não proficiência, se houver)."),
  t("Entangler", "entangler", "Ao agarrar (grab) um alvo, sofre −2 no ataque (em vez de −5). Enquanto não se soltar, o alvo sofre −5 nos ataques, inclusive com armas naturais e leves (em vez de −2)."),
  t("Reverse Strength", "reverse-strength", "Ao vencer um agarrão (grapple), causa dano igual ao modificador de Força do oponente (mín. 1).")
);
tree("Commando");
push(
  t("Coordinated Effort", "coordinated-effort", "Ao usar ajudar outro para dar bônus no ataque do aliado protegido pelo seu Dedicated Protector, ele também recebe +2 no dano desse ataque.", pre("Dedicated Protector", { talents: ["dedicated-protector"] })),
  t("Dedicated Guardian", "dedicated-guardian", "Cada opção 1/encontro: Blast Shield (ação rápida: até o fim do seu próximo turno o aliado protegido conta como tendo Evasion contra ataques de área; se já tiver, o dano de área cai 1 dado); Take the Pain (reação: quando o aliado protegido desceria na trilha de condição, você desce os passos no lugar dele); Team Effort (ação rápida: até o fim do seu próximo turno, inimigos adjacentes a você e ao aliado contam como flanqueados). (Botão ⚡.)", pre("Dedicated Protector, Harm's Way", { talents: ["dedicated-protector", "harms-way"] })),
  t("Dedicated Protector", "dedicated-protector", "1/encontro, escolha um aliado a até 6 quadrados: até o fim do encontro ele recebe +1 de moral na Reflexos enquanto estiver adjacente a você. Cada indivíduo só pode ser alvo deste talento uma vez por encontro. (Botão ⚡.)", pre("Harm's Way", { talents: ["harms-way"] }))
);

/* ---------------- PRESTÍGIO ---------------- */
tree("Expert Pilot");
push(
  t("Clip", "clip", "Ao abalroar (ram), reduz em duas categorias o tamanho da sua nave para calcular o dano de colisão que ela sofre; a nave atingida sofre o dano do tamanho real."),
  t("Master Defender", "master-defender", "Ao lutar defensivamente, o veículo recebe +5 de esquiva na Reflexos se você e os artilheiros aceitarem −2 nos ataques, ou +10 se aceitarem −5. (Botão ⚡ no veículo pilotado.)"),
  t("Shunt Damage", "shunt-damage", "1/encontro, quando sua nave sofre dano, faça um teste de Pilot e compare com a Reflexos de uma nave aliada adjacente: se for maior, a nave aliada sofre o dano no lugar.")
);
tree("Bounty Hunter");
push(
  t("Detective", "detective", "Ao usar Gather Information para localizar alguém, a CD cai 10 e o tempo e o custo de suborno caem pela metade."),
  t("Electronic Trail", "electronic-trail", "Depois de localizar um alvo com Gather Information, 1/dia recebe um catálogo do rastro eletrônico dele (créditos gastos, transporte público, sites acessados) — exige computador ou datapad com acesso à HoloNet; não revela saldos ou segredos.", pre("Nowhere to Hide, treinado em Use Computer", { talents: ["nowhere-to-hide"], trained: ["useComputer"] })),
  t("Revealing Secrets", "revealing-secrets", "Ao usar Gather Information para descobrir informações secretas sobre o alvo, a CD cai 10 e o suborno custa um quinto do normal.", pre("Detective", { talents: ["detective"] }))
);
tree("Mastermind");
push(
  t("Attract Superior Minion", "attract-superior-minion", "Atrai um capanga especialmente capaz: personagem não heroico com nível de classe igual ao seu nível de personagem (funciona como Attract Minion).", pre("Attract Minion, Impel Ally I, Impel Ally II", { talents: ["attract-minion", "impel-ally-i", "impel-ally-ii"] })),
  t("Contingency Plan", "contingency-plan", "1/encontro, se falhar numa jogada de ataque, num teste de perícia ou num talento que exija teste resistido, pode mover seu deslocamento como reação.")
);
tree("Gunslinger");
push(
  t("Damaging Disarm", "damaging-disarm", "Ao desarmar um oponente com um ataque à distância, ele também sofre metade do dano do ataque. (Automático.)", pre("Ranged Disarm", { talents: ["ranged-disarm"] })),
  t("Pistol Duelist", "pistol-duelist", "Cada opção 1/encontro, ação padrão: End Game (ataque à distância com pistola; o Limiar do alvo cai à metade para esse ataque); Snap Aiming (ataque à distância com os benefícios de mirar); Stand Steady (+4 na Reflexos até o fim do seu próximo turno e um ataque à distância). (Botão ⚡: aplica e abre o ataque.)")
);

export default out;

/** Árvores novas por classe (Galaxy of Intrigue). */
export const CLASS_TREES = {
  noble: ["Master of Intrigue", "Skill Challenge", "Superior Skills"],
  scoundrel: ["Revolutionary"],
  scout: ["Espionage"]
};
