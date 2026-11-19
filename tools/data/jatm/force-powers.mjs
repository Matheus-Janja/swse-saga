// Jedi Academy Training Manual — Cap. 1: poderes da Força, poderes de forma de sabre e regimes da Força. Efeitos resumidos.
const SRC = "Jedi Academy Training Manual";
const fp = (name, key, o) => ({
  name, type: "forcePower", img: o.img ?? "icons/magic/lightning/bolt-strike-blue.webp",
  system: {
    key, descriptors: [], time: "", target: "", defense: "", dcs: [], special: "", uses: 1, spent: 0, damage: "", source: SRC,
    ...o, description: `<p>${o.description}</p>`
  },
  folder: o.folder ?? "Poderes da Força"
});
const dc = (n, text) => ({ dc: n, text });
const MAINTAIN = "Pode manter o poder de rodada a rodada (novo teste a cada rodada); se sofrer dano enquanto o mantém, Use the Force CD 15 + dano para continuar.";
const SABER = "icons/weapons/swords/sword-runed-glowing.webp";
const FORM = { descriptors: ["lightsaberForm"], img: SABER, folder: "Poderes de Forma de Sabre" };
const REG = { descriptors: ["regimen"], img: "icons/magic/perception/third-eye-blue-red.webp", folder: "Regimes da Força" };
const REG_NOTE = "Regime da Força (aprendido com Force Regimen Mastery): o benefício dura 24 horas e só pode ser obtido 1/dia.";
const CADENCE = "Penalidade no teste igual ao seu Dark Side Score.";

export const powers = [
  fp("Blind", "blind", { descriptors: ["telekinetic"], time: "Ação rápida", target: "Uma criatura a até 12 quadrados em linha de visão", defense: "reflex",
    description: "Você lança terra, poeira e detritos no rosto do inimigo, afetando sua percepção.",
    special: "Se o resultado igualar ou superar a Reflexos do alvo, ele fica surpreso e todos os outros têm camuflagem contra ele até o fim do seu próximo turno (quem não depende da visão é imune). Ponto da Força: usa como ação livre." }),
  fp("Convection", "convection", { time: "Ação rápida", target: "Você",
    description: "Você altera a química do corpo e sua pele queima com calor intenso.",
    dcs: [dc(15, "Até o início do seu próximo turno, ataques desarmados causam +1d6 de fogo (o alvo pega fogo)."), dc(20, "+2d6 de fogo."), dc(25, "+3d6 de fogo."), dc(30, "+4d6 de fogo.")],
    special: `Ponto da Força: quem o atingir com ataque desarmado, agarrar ou agarrão sofre o dano de fogo. ${MAINTAIN.replace("rodada a rodada", "rodada a rodada como ação rápida")}` }),
  fp("Crucitorn", "crucitorn", { time: "Reação (a um ataque ou poder)", target: "Você",
    description: "Você ignora os efeitos debilitantes da dor física.",
    dcs: [dc(15, "+5 da Força no Limiar de Dano contra o dano desse ataque ou poder."), dc(20, "+10."), dc(25, "+15."), dc(30, "+20.")],
    special: "Ponto da Força: +5 adicional no Limiar. (Aplique como efeito temporário no Limiar.)" }),
  fp("Cryokinesis", "cryokinesis", { time: "Ação padrão", target: "Um objeto sem dono a até 12 quadrados em linha de visão",
    description: "Você retira o calor de um objeto, deixando-o frio e frágil.",
    dcs: [dc(20, "RD do objeto −5 até o fim do seu próximo turno; se mecânico/eletrônico, desce −1 passo na trilha."), dc(25, "RD −10."), dc(30, "RD −15."), dc(35, "RD −20.")],
    special: `Ponto da Força: RD −5 adicional. Objeto no fim da trilha para de funcionar até ser reparado. ${MAINTAIN}` }),
  fp("Drain Energy", "drain-energy", { time: "Ação padrão", target: "Uma arma ou objeto energizado a até 6 quadrados em linha de visão",
    description: "Você drena a energia de células, pacotes ou geradores.",
    dcs: [dc(20, "Drena arma/objeto Pequeno ou menor (sem uso até trocar a célula)."), dc(25, "Médio ou menor."), dc(30, "Grande ou menor."), dc(35, "Enorme ou menor.")],
    special: "Se alimentado por gerador, drena todo o gerador. Ponto da Força: +1 categoria de tamanho (até Gigantesco)." }),
  fp("Fold Space", "fold-space", { time: "Rodada completa", target: "Um objeto a até 6 quadrados em linha de visão, ou o veículo em que está",
    description: "Você dobra o espaço e transporta um objeto quase instantaneamente.",
    dcs: [dc(20, "Médio ou menor, até 6 quadrados."), dc(25, "Grande, até 12."), dc(30, "Enorme, até 18."), dc(35, "Gigantesco, até 24."), dc(40, "Colossal, até 30.")],
    special: "O conteúdo do objeto (inclusive criaturas) é transportado junto. Ponto da Força: +2 categorias de tamanho (até Colossal (cruiser)) ou o dobro da distância." }),
  fp("Force Light", "force-light", { descriptors: ["lightSide"], time: "Ação padrão", target: "Área (6 quadrados ao seu redor)",
    description: "Você vira um farol de luz que purifica a mácula do lado sombrio.",
    dcs: [dc(20, "Até o fim do seu próximo turno, criatura com Dark Side Score 1+ que começa o turno a até 6 quadrados sofre 1d6 de dano da Força e −1 nos ataques (área)."), dc(25, "2d6."), dc(30, "3d6."), dc(35, "4d6.")],
    special: `Ponto da Força: +1d6. ${MAINTAIN.replace("rodada a rodada", "rodada a rodada (ação padrão)")}` }),
  fp("Force Storm", "force-storm", { descriptors: ["darkSide"], time: "Ação padrão", target: "Área a até 12 quadrados em linha de visão",
    description: "Você cria uma tempestade de chuva ácida alimentada pelo lado sombrio.",
    dcs: [dc(20, "Área 3×3: camuflagem, 2d6 de ácido a quem entra ou começa o turno nela, −5 em Perception para ouvir; até o fim do seu próximo turno (área)."), dc(25, "Área 4×4."), dc(30, "Área 5×5."), dc(35, "Área 6×6.")],
    special: `Ponto da Força: +2d6. ${MAINTAIN.replace("rodada a rodada", "rodada a rodada (ação padrão)")}` }),
  fp("Force Track", "force-track", { time: "Ação rápida", target: "Você",
    description: "Você busca na Força o rastro da sua presa.",
    dcs: [dc(15, "Segue o rastro de uma criatura que passou no último minuto, como Survival (rastrear) sem testes, por até 1 hora."), dc(20, "Passou nos últimos 10 minutos."), dc(25, "Na última hora."), dc(30, "No último dia.")],
    special: "Ponto da Força: rastreia até dois alvos ao mesmo tempo." }),
  fp("Hatred", "hatred", { descriptors: ["darkSide"], time: "Ação padrão", target: "Área (6 quadrados ao seu redor)",
    description: "Seu ódio irradia em ondas palpáveis.",
    dcs: [dc(15, "Até o fim do seu próximo turno, criatura que começa o turno a até 6 quadrados sofre 1d6 de dano da Força e −1 em todas as Defesas."), dc(20, "2d6."), dc(25, "3d6."), dc(30, "4d6.")],
    special: `Ponto da Força: +1d6. ${MAINTAIN.replace("rodada a rodada", "rodada a rodada (ação rápida)")}` }),
  fp("Inertia", "inertia", { time: "Ação de movimento", target: "Você",
    description: "Você desloca a inércia do corpo para fazer acrobacias impossíveis.",
    dcs: [dc(15, "Move metade do deslocamento por uma parede como se fosse chão."), dc(20, "Deslocamento normal."), dc(25, "Deslocamento + 2."), dc(30, "Deslocamento + 4.")],
    special: "Se não terminar no chão, cai. Ponto da Força: +2 quadrados." }),
  fp("Inspire", "inspire", { descriptors: ["lightSide"], time: "Ação rápida", target: "Aliados a até 6 quadrados em linha de visão",
    description: "Você enche seus aliados de esperança e coragem.",
    dcs: [dc(20, "+2 da Força na Vontade contra efeitos de medo e de afetar a mente até o fim do seu próximo turno."), dc(25, "+5."), dc(30, "+10."), dc(35, "Imunes a afetar a mente e medo.")],
    special: `Ponto da Força: cada alvo recebe 2d6 PV temporários na primeira ativação. ${MAINTAIN.replace("rodada a rodada", "rodada a rodada (ação rápida)")}` }),
  fp("Intercept", "intercept", { descriptors: ["telekinetic"], time: "Reação", target: "Um ataque à distância contra você",
    description: "Você arremessa telecineticamente um pequeno objeto no caminho do projétil.",
    special: "Se o resultado igualar ou superar a jogada de ataque, nega o ataque. Também nega objetos arremessados com Move Light Object ou move object (CD = teste de Use the Force do inimigo; se for move object, ele perde a manutenção). Ponto da Força: contra fogo automático, metade do dano se acertar e nenhum se errar." }),
  fp("Memory Walk", "memory-walk", { descriptors: ["darkSide", "mindAffecting"], time: "Ação padrão", target: "Uma criatura (Int 3+) a até 6 quadrados em linha de visão", defense: "will", damage: "tier",
    description: "Você atormenta o inimigo fazendo-o reviver as piores lembranças.",
    dcs: [dc(20, "Se ≥ Vontade: 2d6 de dano da Força e o alvo perde a ação rápida no próximo turno."), dc(25, "Perde a ação de movimento."), dc(30, "Perde a ação padrão."), dc(35, "Perde a ação padrão e a rápida.")],
    special: `Ponto da Força: +2d6 de dano. ${MAINTAIN.replace("rodada a rodada", "rodada a rodada (ação padrão)")}` }),
  fp("Mind Shard", "mind-shard", { descriptors: ["mindAffecting"], time: "Ação padrão", target: "Uma criatura a até 12 quadrados em linha de visão", defense: "will", damage: "tier",
    description: "Você estilhaça a mente do oponente, causando dor intensa.",
    dcs: [dc(15, "Se ≥ Vontade: 2d8 de dano da Força e −1 passo; o alvo não melhora a condição até o fim do seu próximo turno."), dc(20, "3d8."), dc(25, "4d8."), dc(30, "5d8.")],
    special: "Ponto da Força: +2d8 de dano." }),
  fp("Plant Surge", "plant-surge", { time: "Ação padrão", target: "Uma criatura a até 12 quadrados em linha de visão", defense: "fortitude",
    description: "Você pede ajuda às plantas, que agarram o inimigo.",
    special: `Se ≥ Fortitude, o deslocamento do alvo vira 0 até o fim do seu próximo turno; escapa com teste de agarrão (ação padrão) contra seu Use the Force. Exige plantas adjacentes ao alvo. Ponto da Força: −10 nos testes para escapar. ${MAINTAIN.replace("rodada a rodada", "rodada a rodada (ação rápida)")}` }),
  fp("Thought Bomb", "thought-bomb", { descriptors: ["mindAffecting"], time: "Ação padrão", target: "Todos os inimigos a até 2 quadrados", defense: "will", damage: "2d6",
    description: "Ondas telepáticas danosas irradiam de você.",
    special: "Contra cada alvo cuja Vontade seja igualada ou superada: 2d6 de dano da Força e perde a ação rápida no próximo turno (área). Ponto da Força: +2d6." })
];

// Poderes de forma de sabre: exigem empunhar um sabre de luz ativado; não podem ser rebatidos com rebuke (exceto draw closer e pushing slash).
const F = (name, key, text, dcs, form, special, o = {}) => fp(name, key, { ...FORM, ...o, description: text, dcs, special: `${form ? `<strong>Forma de sabre:</strong> ${form} ` : ""}${special ? `Ponto da Força: ${special}` : ""}` });
export const formPowers = [
  F("Assured Strike", "assured-strike", "Você troca potência por precisão.", [dc(15, "Ataque corpo a corpo com sabre rolando dois d20 (fica com o maior), −5 no dano."), dc(20, "−2 no dano."), dc(25, "−1 no dano."), dc(30, "Sem penalidade.")], "Juyo: se errar as duas jogadas, o poder não é gasto.", "rola três vezes.", { time: "Ação padrão", target: "Um inimigo ao alcance" }),
  F("Barrier of Blades", "barrier-of-blades", "Você gira o sabre criando uma barreira contra disparos.", [dc(0, "Até o início do seu próximo turno, o resultado do teste substitui sua Reflexos contra ataques à distância que não sejam de área.")], "Shien: redireciona um disparo que errar você (como Redirect Shot).", "também vale contra fogo automático (metade se acertar, nada se errar).", { time: "Ação rápida", target: "Você" }),
  F("Circle of Shelter", "circle-of-shelter", "Você cria uma área protegida ao seu redor.", [dc(20, "Você e aliados adjacentes: +1 de deflexão na Reflexos até o fim do seu próximo turno."), dc(25, "+2."), dc(30, "+5.")], "Soresu: soma o bônus de deflexão ao Use the Force de Block e Deflect.", "o bônus também vale na Fortitude dos aliados adjacentes.", { time: "Ação padrão", target: "Você e aliados adjacentes" }),
  F("Contentious Opportunity", "contentious-opportunity", "Você aproveita a brecha do oponente para golpear.", [dc(20, "Se acertar o ataque de oportunidade, +1 dado de dano."), dc(25, "+2 dados."), dc(30, "+3 dados."), dc(35, "+4 dados.")], "Makashi: +2 da Força em ataques de oportunidade até o fim do seu próximo turno.", "ao acertar, o deslocamento do alvo cai 2 quadrados até o fim do próximo turno dele.", { time: "Livre (ao fazer um ataque de oportunidade)", target: "Um inimigo ao alcance" }),
  F("Deflecting Slash", "deflecting-slash", "Você aproveita o impulso de desviar um projétil para atacar um oponente adjacente.", [dc(15, "Se ≥ jogada de ataque à distância, ele causa metade do dano; depois faz um ataque com sabre contra um alvo ao alcance."), dc(20, "+1 de dano nesse ataque."), dc(25, "+3."), dc(30, "+5.")], "Soresu: Ponto da Força para redirecionar o ataque (Redirect Shot) a um alvo a até 6 quadrados.", "nenhum dano se o teste igualar ou superar o ataque.", { time: "Reação (ataque à distância que não seja de área)", target: "Você e um inimigo ao alcance" }),
  F("Disarming Slash", "disarming-slash", "Você golpeia a arma do oponente para arrancá-la.", [dc(15, "Ataque com sabre; se causar dano, o resultado do Use the Force é a tentativa de desarmar (alvo +10 na Reflexos)."), dc(20, "Alvo só +5."), dc(25, "Alvo só +2."), dc(30, "Sem bônus para o alvo.")], "Shii-Cho: pode usar como reação ao ser atacado por um oponente adjacente.", "causa à arma do alvo o mesmo dano causado a ele, se desarmar.", { time: "Ação padrão", target: "Um inimigo ao alcance" }),
  F("Draw Closer", "draw-closer", "Você puxa um inimigo com a Força para o caminho da sua lâmina.", [dc(15, "Alvo Médio ou menor (não agarrado) é puxado para um espaço adjacente; depois um ataque com sabre."), dc(20, "Grande ou menor."), dc(25, "Enorme ou menor."), dc(30, "Gigantesco ou menor.")], "Niman: alvo a até 12 quadrados. Djem So: ao ativar, recebe 1 Ponto da Força temporário só para o talento Djem So.", "puxa para qualquer espaço adjacente.", { time: "Ação padrão", target: "Um inimigo a até 6 quadrados em linha de visão", descriptors: ["lightsaberForm", "telekinetic"] }),
  F("Falling Avalanche", "falling-avalanche", "Você ergue o sabre e o desce com força esmagadora.", [dc(15, "Ataque com sabre contra alvo até 1 tamanho maior; se causar dano, empurra 1 quadrado e você ocupa o espaço (sem ataques de oportunidade)."), dc(20, "Empurra 2."), dc(25, "Empurra 3."), dc(30, "Empurra 4.")], "Djem So: recebe 1 Ponto da Força temporário só para o talento Djem So.", "derruba o alvo no fim do movimento forçado.", { time: "Ação padrão", target: "Você e um inimigo ao alcance" }),
  F("Fluid Riposte", "fluid-riposte", "Você desvia o golpe e entra com seu próprio ataque.", [dc(0, "Se ≥ ataque corpo a corpo recebido, ele causa metade do dano; você move para outro quadrado adjacente ao atacante (sem provocar) e faz um ataque com sabre.")], "Djem So: recebe 1 Ponto da Força temporário só para o talento Djem So.", "o atacante fica surpreso contra o seu ataque.", { time: "Reação (oponente adjacente o ataca corpo a corpo)", target: "Você e um inimigo ao alcance" }),
  F("Hawk-Bat Swoop", "hawk-bat-swoop", "Você salta para a ação antes que os inimigos reajam.", [dc(15, "Move 2 quadrados (sem provocar) e, se terminar adjacente, faz um ataque com sabre."), dc(20, "Até 4 quadrados."), dc(25, "Até 6."), dc(30, "Até 8.")], "Ataru: também move 2 quadrados após o ataque, sem provocar.", "+2 dados de dano.", { time: "Ação", target: "Você e um inimigo ao alcance" }),
  F("High Ground Defense", "high-ground-defense", "Você usa o terreno para ganhar vantagem defensiva.", [dc(15, "Em objeto baixo ou terreno difícil: quem se move para perto de você provoca ataque de oportunidade até o início do seu próximo turno."), dc(20, "+1 da Força nesses ataques."), dc(25, "+2."), dc(30, "+5.")], "Sokan: +1 dado de dano nesses ataques.", "move 1 quadrado a cada ataque de oportunidade (sem provocar).", { time: "Ação rápida", target: "Você" }),
  F("Makashi Riposte", "makashi-riposte", "Uma técnica Makashi de desviar e responder.", [dc(0, "Se ≥ ataque corpo a corpo recebido, ele causa metade do dano; você faz um ataque com sabre contra ele (mesmo errando, causa metade do dano).")], "Makashi: até o fim do seu próximo turno, o alvo provoca ataque de oportunidade se atacar estando ao seu alcance.", "nenhum dano se o teste igualar ou superar o ataque.", { time: "Reação (oponente adjacente o ataca corpo a corpo)", target: "Você e um inimigo ao alcance" }),
  F("Pass the Blade", "pass-the-blade", "Você desliga o sabre quando o oponente bloqueia e o religa atravessando a defesa.", [dc(15, "Ataque com sabre; o alvo sofre −2 no Use the Force para bloquear (Block)."), dc(20, "−5."), dc(25, "−10."), dc(30, "O alvo não pode usar Block contra o ataque.")], "Tràkata: também ignora a deflexão de Lightsaber Defense do alvo.", "+2d6 de dano se acertar.", { time: "Ação padrão", target: "Você e um inimigo ao alcance" }),
  F("Pushing Slash", "pushing-slash", "Você golpeia e arremessa o alvo para longe com a Força.", [dc(15, "Ataque com sabre; se acertar e o teste ≥ Fortitude, empurra 2 quadrados (sem provocar)."), dc(20, "3 quadrados."), dc(25, "4."), dc(30, "5.")], "Niman: compara também com a Fortitude dos outros inimigos adjacentes e os empurra 1 quadrado (área).", "derruba o alvo no fim do movimento.", { time: "Ação padrão", target: "Um inimigo ao alcance", descriptors: ["lightsaberForm", "telekinetic"], defense: "fortitude" }),
  F("Rising Whirlwind", "rising-whirlwind", "Você gira os sabres em um redemoinho brilhante.", [dc(15, "Dois ataques com sabre, cada um contra um alvo diferente; se ambos acertarem, 10 PV temporários."), dc(20, "15 PV."), dc(25, "20 PV."), dc(30, "25 PV.")], "Jar'Kai: move 2 quadrados entre os ataques, sem provocar. Exige dois sabres.", "+1d6 de dano em cada alvo atingido.", { time: "Ação padrão", target: "Dois inimigos ao alcance" }),
  F("Saber Swarm", "saber-swarm", "Golpes curtos e rápidos no corpo do alvo.", [dc(20, "Dois ataques com sabre contra um alvo, cada um com −5."), dc(25, "−2."), dc(30, "−1."), dc(35, "Sem penalidade.")], "Ataru: o oponente sofre −5 no Use the Force para bloquear (Block ou makashi riposte).", "move 2 quadrados antes ou depois, sem provocar.", { time: "Ação padrão", target: "Um inimigo ao alcance" }),
  F("Sarlacc Sweep", "sarlacc-sweep", "Um golpe largo que atinge vários inimigos.", [dc(15, "Ataque contra o alvo principal; se acertar, 5 de dano no secundário."), dc(20, "+1d6 no secundário."), dc(25, "+2d6."), dc(30, "+3d6.")], "Shii-Cho: pode ser usado no fim de uma investida, com o benefício de Powerful Charge no ataque inicial.", "afeta dois alvos secundários.", { time: "Ação padrão", target: "Um inimigo ao alcance e outro inimigo ao alcance" }),
  F("Shien Deflection", "shien-deflection", "Você desvia o disparo e avança contra o atirador.", [dc(15, "Se ≥ ataque, metade do dano; move até o deslocamento em direção ao atacante e, se ficar ao alcance, faz um ataque com sabre."), dc(20, "Deslocamento + 2."), dc(25, "+4."), dc(30, "+6.")], "Shien: até o início do seu próximo turno, sem penalidade cumulativa em Deflect.", "nenhum dano se o teste igualar ou superar o ataque.", { time: "Reação (ataque à distância que não seja de área)", target: "Você e um inimigo ao alcance" }),
  F("Swift Flank", "swift-flank", "Você salta ou contorna o oponente e ataca.", [dc(20, "Move metade do deslocamento (sem provocar) e ataca com sabre; se terminar flanqueando, o alvo conta como flanqueado."), dc(25, "Deslocamento."), dc(30, "Deslocamento + 2."), dc(35, "Deslocamento + 4.")], "Vaapad: o alvo fica surpreso contra você até o fim do turno.", "+2 quadrados de movimento.", { time: "Ação padrão", target: "Você e um inimigo adjacente" }),
  F("Tempered Aggression", "tempered-aggression", "Você controla sua agressão para dominar o oponente.", [dc(30, "Ataque com sabre: se superar a Reflexos por 10+, é crítico."), dc(35, "Por 5+."), dc(40, "Por 2+.")], "Vaapad: o poder não tem o descritor [dark side] para você.", "+2 dados de dano (somados depois de dobrar).", { time: "Ação padrão", target: "Um inimigo ao alcance", descriptors: ["darkSide", "lightsaberForm"] }),
  F("Twin Strike", "twin-strike", "Você golpeia com os dois sabres em arco.", [dc(15, "Ataque com sabre; se acertar, soma os dados de dano do outro sabre."), dc(25, "+1 da Força no ataque."), dc(30, "+2.")], "Jar'Kai: triplica (em vez de dobrar) a deflexão de Lightsaber Defense até o fim do seu próximo turno. Exige dois sabres.", "+1 dado de dano.", { time: "Ação padrão", target: "Um inimigo ao alcance" }),
  F("Unbalancing Block", "unbalancing-block", "Você prende a arma do oponente na lâmina e o desequilibra.", [dc(0, "Se ≥ ataque corpo a corpo recebido, metade do dano; se também ≥ Vontade do atacante, ele fica surpreso até o fim do seu próximo turno.")], "Tràkata: +2 dados de dano no seu primeiro ataque contra ele no próximo turno.", "nenhum dano se o teste igualar ou superar o ataque.", { time: "Reação (inimigo adjacente o ataca corpo a corpo)", target: "Você" }),
  F("Unhindered Charge", "unhindered-charge", "Você corre até o oponente ignorando obstáculos.", [dc(15, "Move até o deslocamento em direção a um inimigo ignorando terreno difícil e obstáculos baixos; se ficar ao alcance, ataque com sabre."), dc(20, "Deslocamento + 2."), dc(25, "+4."), dc(30, "+6.")], "Sokan: +5 da Força na Reflexos contra ataques de oportunidade durante o movimento.", "+2 quadrados.", { time: "Ação padrão", target: "Você e um inimigo ao alcance" }),
  F("Vornskr's Ferocity", "vornskrs-ferocity", "Você caminha na linha entre luz e trevas atacando com ferocidade.", [dc(20, "Ataque com sabre: +1 dado de dano se acertar."), dc(25, "+2 dados."), dc(30, "+3 dados."), dc(35, "+4 dados.")], "Juyo: o poder não tem o descritor [dark side] para você.", "pode usar no fim de uma investida.", { time: "Ação padrão", target: "Um inimigo ao alcance", descriptors: ["darkSide", "lightsaberForm"] })
];

const R = (name, key, time, text, dcs, o = {}) => fp(name, key, { ...REG, ...o, time, target: o.target ?? "Você", description: `${text} ${REG_NOTE}`, dcs });
export const regimens = [
  R("Awaken Force Sensitivity", "regimen-awaken-force-sensitivity", "1 hora", "Você desperta a sensibilidade de um aliado voluntário sem Force Sensitivity.", [dc(13, "Benefício de Gauge Force Potential sobre o aluno."), dc(18, "O aluno pode usar Use the Force sem treino como se fosse sensível por 24 h."), dc(23, "Além disso, +1 da Força no Use the Force do aluno."), dc(28, "+2 da Força.")], { target: "Um aliado voluntário" }),
  R("Eyes of the Force", "regimen-eyes-of-the-force", "1 hora", "Treino com imagens 2D e um assistente.", [dc(13, "+1 da Força em Use the Force para telepatia."), dc(18, "+2."), dc(23, "+2 e percebe emoções superficiais de alvos relutantes.")]),
  R("Oxygen Bottle", "regimen-oxygen-bottle", "1 hora", "Meditação dentro de uma garrafa de vidro.", [dc(26, "+2 da Força na Fortitude contra venenos inalados e perigos atmosféricos não corrosivos."), dc(32, "+5."), dc(38, "Imune.")]),
  R("Quiet the Mind", "regimen-quiet-the-mind", "1 hora", "Meditação silenciosa.", [dc(13, "+1 uso de farseeing (uma vez)."), dc(18, "Um uso de farseeing."), dc(23, "Farseeing e o benefício do talento Visions.")]),
  R("Telekinetic Practice", "regimen-telekinetic-practice", "1 hora", "Treino com tigela e esfera.", [dc(18, "1 Ponto da Força temporário só para ativar poderes [telekinetic]."), dc(23, "2 PF temporários."), dc(28, "2 PF temporários e rerrola Use the Force de um poder [telekinetic] (fica com o segundo).")]),
  R("Sparring Practice", "regimen-sparring-practice", "2 horas", "Duelo de treino com sabre e parceiro.", [dc(18, "Um Ponto da Força gasto em Block não conta no limite de 1 por rodada."), dc(23, "Além disso, 1 PF temporário para Block."), dc(28, "2 PF temporários para Block.")]),
  R("Training Remote", "regimen-training-remote", "1 hora", "Treino com sabre, remoto e capacete cego.", [dc(18, "Um Ponto da Força gasto em Deflect não conta no limite de 1 por rodada."), dc(23, "Além disso, 1 PF temporário para Deflect."), dc(28, "2 PF temporários para Deflect.")]),
  R("Vo'ren's First Cadence", "regimen-first-cadence", "1 hora", `${CADENCE}`, [dc(13, "+1 da Força na Vontade."), dc(18, "+2 na Vontade."), dc(23, "+2 na Vontade e o benefício do talento Severing Strike.")]),
  R("Vo'ren's Second Cadence", "regimen-second-cadence", "2 horas", `${CADENCE}`, [dc(18, "+1 da Força em ataques com sabre contra quem o flanqueia."), dc(23, "+2."), dc(28, "+2 e o benefício do feat Whirlwind Attack.")]),
  R("Vo'ren's Third Cadence", "regimen-third-cadence", "3 horas", `${CADENCE}`, [dc(23, "+1 da Força no ataque à distância com Redirect Shot."), dc(28, "+2."), dc(33, "+2 e pode gastar PF em Block/Deflect fora do seu turno sem contar no limite.")]),
  R("Vo'ren's Fourth Cadence", "regimen-fourth-cadence", "3 horas", `${CADENCE}`, [dc(26, "+1 da Força no Use the Force para manter um poder ao sofrer dano."), dc(32, "+2."), dc(38, "+2 e, com um Ponto da Força (reação), não precisa refazer o teste.")]),
  R("Vo'ren's Fifth Cadence", "regimen-fifth-cadence", "3 horas", `${CADENCE}`, [dc(31, "+1 da Força em Move Light Object."), dc(37, "+2."), dc(43, "+2 e rerrola (Ponto da Força) Use the Force de um poder [telekinetic], ficando com o melhor.")])
];

export default [...powers, ...formPowers, ...regimens];
