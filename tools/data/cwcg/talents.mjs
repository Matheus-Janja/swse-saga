// The Clone Wars Campaign Guide — Cap. 2-4: talentos novos. Textos resumidos.
const SRC = "The Clone Wars Campaign Guide";
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
    key, tree: TREE, category: CAT, classes: [], source: SRC,
    description: `<p>${text}</p>`, prerequisites: P(pre),
    choice: { type: o.choice ?? "", value: "", options: [] }, repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], rerolls: o.rerolls ?? []
  }
});
const pre = (text, o = {}) => ({ text, ...o });
const T = (...k) => ({ talents: k });
const out = [];
const push = (...x) => out.push(...x);
export const FOLLOWER = "Seguidor: PdM que acompanha o herói (regras de seguidores do Cap. 2; modelos agressivo, defensivo ou utilitário — ver a descrição do feat/talento e o diário \"Seguidores\").";

/* ---------------- Jedi ---------------- */
tree("Jedi Consular");
push(
  t("Consular's Vitality", "consulars-vitality", "1/rodada, ação rápida: um aliado a até 12 quadrados em linha de visão recebe PV bônus iguais a 5 + mod. de Carisma até o início do seu próximo turno (o dano tira primeiro desses PV). Você sofre −5 em Use the Force até o início do seu próximo turno. (Botão ⚡.)"),
  t("Improved Consular's Vitality", "improved-consulars-vitality", "Ao causar dano com um ataque de sabre de luz, pode usar Consular's Vitality como ação livre (em vez de rápida) até o início do seu próximo turno.", pre("Consular's Vitality", T("consulars-vitality")))
);
tree("Jedi Guardian");
push(
  t("Exposing Strike", "exposing-strike", "Ao causar dano com sabre de luz, gasta um Ponto da Força: o alvo fica desprevenido até o fim do seu próximo turno."),
  t("Guardian Strike", "guardian-strike", "Ao causar dano com sabre de luz, o alvo sofre −2 nos ataques contra qualquer um que não seja você até o início do seu próximo turno.")
);
tree("Jedi Sentinel");
push(
  t("Sentinel's Observation", "sentinels-observation", "Se você tem camuflagem contra um alvo, recebe +2 de circunstância nos ataques contra ele."),
  t("Unseen Eyes", "unseen-eyes", "Com Force Haze, aliados escondidos pela névoa podem rerrolar Perception (ficam com o melhor) e recebem +2 no dano contra inimigos que não os percebem.", pre("Clear Mind, Force Haze", T("clear-mind", "force-haze")))
);

/* ---------------- Noble ---------------- */
tree("Collaborator");
push(
  t("Double Agent", "double-agent", "Ao rolar Iniciativa no início do combate, rola também Deception contra a Vontade de cada inimigo em linha de visão: quem falhar não o ataca nem o considera inimigo até você atacá-lo ou prejudicá-lo (ou a um aliado dele). Afeta a mente."),
  t("Enemy Tactics", "enemy-tactics", "Quando um inimigo a até 12 quadrados em linha de visão recebe bônus de intuição ou moral de qualquer fonte, você também recebe esse bônus (com as mesmas limitações).", pre("Double Agent", T("double-agent"))),
  t("Feed Information", "feed-information", "Ação rápida: um inimigo recebe +1 de intuição no próximo ataque antes do início do seu próximo turno; além disso, um aliado que o receba ganha +2 de intuição no próximo ataque.", pre("Double Agent", T("double-agent"))),
  t("Friendly Fire", "friendly-fire", "Em corpo a corpo com um inimigo adjacente, quando um ataque à distância erra você, compare o resultado com a Reflexos desse inimigo: se igualar ou superar, ele se torna o novo alvo.", pre("Enemy Tactics", T("enemy-tactics"))),
  t("Protection", "protection", "Ação padrão: designa um aliado e faz Persuasion contra a Vontade de todos os inimigos em linha de visão que o ouçam; quem tiver Vontade igual ou menor não pode atacar o aliado até o início do seu próximo turno.", pre("Double Agent", T("double-agent")))
);
tree("Loyal Protector");
const FOLLOWER_TXT = "Ganha um seguidor (modelo agressivo, defensivo ou utilitário; estatísticas pelas regras de seguidores) com um feat de Armor Proficiency à sua escolha e treinado em Perception. Repetível (máx. 3 seguidores). (Macro Criar Seguidor.)";
push(
  t("Inspire Loyalty", "inspire-loyalty", FOLLOWER_TXT, {}, { repeatable: true }),
  t("Undying Loyalty", "undying-loyalty", "Cada um dos seus seguidores ganha o feat Toughness.", pre("Inspire Loyalty", T("inspire-loyalty"))),
  t("Punishing Protection", "punishing-protection", "1/encontro, reação ao ser ferido por um ataque ou poder da Força: um seguidor faz um ataque corpo a corpo ou à distância imediato contra o atacante; até o início do seu próximo turno, sempre que você sofrer dano, outro seguidor pode atacá-lo também.", pre("Inspire Loyalty, BBA +5", { talents: ["inspire-loyalty"], bab: 5 })),
  t("Protector Actions", "protector-actions", "Ações em equipe com seus seguidores: <em>Bodyguard</em> (ação padrão, ataca um alvo; se ele o ferir antes do seu próximo turno, como reação redireciona o ataque ou poder a um seguidor adjacente); <em>Diversion Attack</em> (ação padrão, ataca; se o alvo atacar você ou um aliado, um seguidor pode se mover até o deslocamento em direção a ele); <em>The Best Defense</em> (ação padrão, ataca; para cada seguidor com arma à distância e linha de visão, o alvo sofre −1 nos ataques até o início do seu próximo turno).", pre("Inspire Loyalty", T("inspire-loyalty")))
);

/* ---------------- Scoundrel ---------------- */
tree("Misfortune");
push(t("Stymie", "stymie", "Ação rápida: designa um alvo a até 12 quadrados em linha de visão e uma perícia; até o início do seu turno ele sofre −5 nos testes dessa perícia. Afeta a mente."));
tree("Opportunist");
push(
  t("Advantageous Opening", "advantageous-opening", "Quando um inimigo ou aliado em linha de visão tira 1 natural numa jogada de ataque, você pode fazer um ataque corpo a corpo ou à distância contra um alvo ao alcance."),
  t("Retribution", "retribution", "Quando um alvo move um aliado seu em linha de visão para baixo na trilha de condição, você recebe +2 de intuição nos ataques contra esse alvo até o fim do seu próximo turno."),
  t("Slip By", "slip-by-opportunist", "Ao causar dano a um alvo, até o início do seu próximo turno pode atravessar o espaço dele (o movimento provoca ataques de oportunidade normalmente e precisa terminar em espaço válido)."),
  t("Thrive on Chaos", "thrive-on-chaos", "Quando um inimigo ou aliado a até 20 quadrados é reduzido a 0 PV, você ganha PV bônus iguais a 5 + ½ nível de personagem (perdidos no fim do encontro; não acumulam).", pre("Advantageous Opening", T("advantageous-opening"))),
  t("Vindication", "vindication", "Quando um inimigo que você feriu cai a 0 PV ou ao fundo da trilha, seu próximo ataque antes do fim do encontro causa +1 dado de dano.", pre("Retribution", T("retribution")))
);

/* ---------------- Scout ---------------- */
tree("Reconnaissance");
push(
  t("Reconnaissance Team Leader", "reconnaissance-team-leader", "Ganha um seguidor (modelo agressivo, defensivo ou utilitário) treinado em Perception e Stealth; quando você usa Stealth, seus seguidores também podem fazer Stealth como parte da mesma ação. Repetível (máx. 3 seguidores). (Macro Criar Seguidor.)", {}, { repeatable: true }),
  t("Close-Combat Assault", "close-combat-assault", "Cada um dos seus seguidores ganha o feat Point Blank Shot.", pre("Reconnaissance Team Leader", T("reconnaissance-team-leader"))),
  t("Get Into Position", "get-into-position-recon", "Ação de movimento: um seguidor se move até o deslocamento dele +2 quadrados.", pre("Reconnaissance Team Leader, BBA +5", { talents: ["reconnaissance-team-leader"], bab: 5 })),
  t("Reconnaissance Actions", "reconnaissance-actions", "Ações em equipe: <em>Forward Scouting</em> (ação padrão, ataca; para cada seguidor armado com linha de visão, um aliado recebe +2 de intuição nos ataques contra o alvo até o início do seu próximo turno); <em>Group Sniping</em> (ação padrão, ataca; cada seguidor armado com linha de visão dá a você e a ele +1 de circunstância em Stealth até o fim do próximo turno); <em>Sweep the Area</em> (ação padrão, ataca; cada seguidor armado dá a você e a ele +1 de circunstância em Perception até o fim do próximo turno).", pre("Reconnaissance Team Leader", T("reconnaissance-team-leader")))
);
tree("Surveillance");
push(
  t("Spotter", "spotter", "Ação de movimento: Perception CD 10 + ND de um alvo em linha de visão; se passar, você e os aliados que o ouçam recebem +1 de intuição nos ataques contra ele até o fim do seu próximo turno. (Botão ⚡.)"),
  t("Advanced Intel", "advanced-intel", "Se não estiver surpreso no início do combate, pode usar Spotter como ação livre no seu primeiro turno (mesmo na rodada surpresa).", pre("Spotter", T("spotter"))),
  t("Hidden Eyes", "hidden-eyes", "Com camuflagem contra um alvo, +5 de circunstância em Perception contra ele."),
  t("Hunt the Hunter", "hunt-the-hunter", "Ao usar ação padrão para procurar inimigos escondidos (Perception), pode fazer um ataque corpo a corpo ou à distância contra um inimigo que notou."),
  t("Seek and Destroy", "seek-and-destroy", "Ao investir contra um alvo que não sabe de você, ele não pode fazer Perception para notá-lo até o ataque ser resolvido, mesmo que você saia de cobertura ou camuflagem.", pre("Hidden Eyes", T("hidden-eyes")))
);

/* ---------------- Soldier ---------------- */
tree("Brawler");
push(
  t("Bayonet Master", "bayonet-master", "Ação de rodada completa: trata uma arma à distância com baioneta como arma dupla corpo a corpo (baioneta e coronha como em Gun Club), sem as penalidades normais de atacar com as duas pontas.", pre("Gun Club", T("gun-club"))),
  t("Unrelenting Assault", "unrelenting-assault", "Quando erra um ataque corpo a corpo (ou ele é negado), ainda causa dano igual ao seu bônus de Força (mín. 1), ou o dobro com arma de duas mãos.", pre("Melee Smash", T("melee-smash")))
);
tree("Commando");
push(t("Keep Them at Bay", "keep-them-at-bay", "Ao usar aid another para suprimir um inimigo, ele sofre −5 no próximo ataque em vez de −2. Só um personagem por vez recebe este benefício contra um mesmo alvo."));
tree("Trooper");
push(
  t("Comrades in Arms", "comrades-in-arms", "A até 3 quadrados de um aliado, +1 de circunstância nos ataques corpo a corpo e à distância."),
  t("Focused Targeting", "focused-targeting", "Ao causar dano com um ataque, aliados a até 3 quadrados recebem +2 no dano contra esse alvo até o início do seu próximo turno.", pre("Comrades in Arms", T("comrades-in-arms"))),
  t("Phalanx", "phalanx", "Quando você dá cobertura leve a um aliado a até 3 quadrados, ela conta como cobertura melhorada.", pre("Watch Your Back", T("watch-your-back"))),
  t("Stick Together", "stick-together", "Ação de movimento para ativar: até o início do seu próximo turno, quando um aliado se mover, você pode se mover imediatamente até o seu deslocamento, terminando a até 3 quadrados dele.", pre("Comrades in Arms", T("comrades-in-arms"))),
  t("Watch Your Back", "watch-your-back", "Adjacente a pelo menos um aliado, os inimigos não recebem benefício de flanquear você nem os aliados adjacentes.")
);
tree("Squad Leader (Soldier)");
push(
  t("Commanding Officer", "commanding-officer", "Ganha um seguidor (modelo agressivo, defensivo ou utilitário) com um Armor Proficiency à sua escolha e Weapon Proficiency (rifles), além dos do modelo. Repetível (máx. 3 seguidores). (Macro Criar Seguidor.)", {}, { repeatable: true }),
  t("Coordinated Tactics", "coordinated-tactics", "Cada um dos seus seguidores ganha o feat Coordinated Attack (se cumprir o pré-requisito; senão, ganha quando cumprir).", pre("Commanding Officer", T("commanding-officer"))),
  t("Fire at Will", "fire-at-will", "Rodada completa: você e um seguidor fazem cada um um ataque à distância contra um alvo em linha de visão, com −5.", pre("Commanding Officer, BBA +5", { talents: ["commanding-officer"], bab: 5 })),
  t("Squad Actions", "squad-actions", "Ações em equipe: <em>Autofire Barrage</em> (ação padrão, autofire numa área; cada seguidor com arma em autofire e linha de visão acrescenta um quadrado adjacente à área); <em>Open Fire</em> (ação padrão, ataque à distância; cada seguidor armado com linha de visão soma +2 ao dano se acertar); <em>Painted Target</em> (ação padrão, ataque à distância; +1 de competência no ataque para cada seguidor armado com linha de visão ao alvo).", pre("Commanding Officer", T("commanding-officer")))
);

/* ---------------- Prestígio (Cap. 3) ---------------- */
tree("Expert Pilot");
push(t("Renowned Pilot", "renowned-pilot", "Aliados a até 6 quadrados de um veículo que você pilota podem rerrolar um teste de Pilot (ficam com o melhor); cada aliado só uma vez por encontro."));
tree("Melee Specialist");
push(
  t("Accurate Blow", "accurate-blow", "Escolha uma arma exótica de corpo a corpo ou um grupo (corpo a corpo avançado, sabres de luz ou simples) em que é proficiente: se o ataque com ela superar a Reflexos do alvo por 5 ou mais, +1 dado de dano.", {}, { choice: "weaponGroup" }),
  t("Close-Quarters Fighter", "close-quarters-fighter", "No mesmo quadrado do alvo ou adjacente a ele, +1 de circunstância nos ataques corpo a corpo contra ele."),
  t("Ignore Armor", "ignore-armor", "1/encontro, num ataque corpo a corpo, ignora os bônus de armadura e de equipamento da armadura do alvo."),
  t("Improved Stunning Strike", "improved-stunning-strike", "Ao ferir com ataque corpo a corpo e descer o alvo na trilha, ele não pode fazer ações padrão nem de rodada completa no próximo turno.", pre("Stunning Strike", T("stunning-strike"))),
  t("Whirling Death", "whirling-death", "Girando a arma corpo a corpo empunhada: qualquer inimigo que comece o turno adjacente a você sofre dano igual ao seu bônus de Força.", pre("Melee Smash, Unrelenting Assault", T("melee-smash", "unrelenting-assault")))
);
tree("Republic Commando");
push(
  t("Ambush", "ambush-commando", "Ao acertar um oponente que ainda não agiu no combate, +2 dados de dano."),
  t("Higher Yield", "higher-yield", "1/encontro, +1 dado de dano com uma granada ou explosivo.", pre("Treinado em Demolitions (Mechanics)", { trained: ["mechanics"] })),
  t("Rapid Reload", "rapid-reload", "Pega uma célula de energia guardada e recarrega a arma com uma única ação rápida."),
  t("Shoulder to Shoulder", "shoulder-to-shoulder", "Ao começar o turno adjacente a um aliado, ganha PV bônus iguais ao seu nível heroico (dano sai primeiro deles; somem no fim do encontro; não acumulam)."),
  t("Strength in Numbers", "strength-in-numbers", "A até 10 quadrados de um aliado, +2 na sua RD."),
  t("Weapon Shift", "weapon-shift", "Usando uma arma à distância como corpo a corpo (como em Gun Club), +2 nos ataques corpo a corpo com ela.", pre("Gun Club", T("gun-club")))
);
tree("Force Item", "forceTalent");
push(
  t("Focused Force Talisman", "focused-force-talisman", "Ao criar um talismã da Força, escolha um poder: usando o talismã, pode gastar um Ponto da Força para recuperar esse poder gasto imediatamente.", pre("Force Talisman", T("force-talisman"))),
  t("Greater Focused Force Talisman", "greater-focused-force-talisman", "Como Focused Force Talisman, mas o Ponto da Força gasto para recuperar o poder não conta no limite de um por turno.", pre("Force Talisman, Focused Force Talisman", T("force-talisman", "focused-force-talisman")))
);
tree("Gunslinger");
push(t("Blind Shot", "blind-shot", "Ignora as penalidades de camuflagem e camuflagem total nos ataques à distância."));
tree("Jedi Archivist", "forceTalent");
push(
  t("Direct", "direct", "Ação padrão: devolve um poder da Força gasto ao conjunto de um aliado a até 6 quadrados em linha de visão."),
  t("Impart Knowledge", "impart-knowledge", "Ajuda (aid another) testes de Knowledge de aliados a até 6 quadrados como reação, nas perícias de Knowledge em que é treinado.", pre("Skilled Advisor", T("skilled-advisor"))),
  t("Insight of the Force", "insight-of-the-force", "Usa Use the Force no lugar de Knowledge em que não é treinado (conta como treinado); rerrolagens de Knowledge podem usar Use the Force."),
  t("Master Advisor", "master-advisor", "Quando usa Skilled Advisor, o aliado ajudado ganha um Ponto da Força temporário no fim do turno dele (perdido no fim do encontro).", pre("Skilled Advisor", T("skilled-advisor"))),
  t("Scholarly Knowledge", "scholarly-knowledge", "Ação rápida: rerrola um teste de Knowledge em que é treinado, ficando com o melhor.")
);
tree("Jedi Healer", "forceTalent");
push(
  t("Force Treatment (Healer)", "force-treatment-healer", "Usa Use the Force no lugar de Treat Injury (conta como treinado); rerrolagens de Treat Injury podem usar Use the Force."),
  t("Healing Boost", "healing-boost", "Ao curar com vital transfer, a cura aumenta em 1 por nível de classe.", pre("Vital transfer", { forcePowers: ["vital-transfer"] })),
  t("Improved Healing Boost", "improved-healing-boost", "Com vital transfer, a cura aumenta em 2 por nível de classe (em vez de 1).", pre("Healing Boost, vital transfer", { talents: ["healing-boost"], forcePowers: ["vital-transfer"] })),
  t("Soothe", "soothe", "Ao usar vital transfer, pode subir o alvo +1 passo na trilha em vez de curar PV; você desce −1 passo.", pre("Vital transfer", { forcePowers: ["vital-transfer"] }))
);
tree("Military Tactics");
push(
  t("Exploit Weakness", "exploit-weakness", "Ao usar Assault Tactics contra um inimigo, ele sofre −1 cumulativo na Reflexos cada vez que um aliado o fere (máx. −5) até o fim do seu próximo turno.", pre("Assault Tactics", T("assault-tactics"))),
  t("Grand Leader", "grand-leader", "1/encontro, ação rápida: aliados a até 20 quadrados em linha de visão recebem PV bônus iguais a 5 + ½ nível de personagem (perdidos no fim do encontro; não acumulam)."),
  t("Uncanny Defense", "uncanny-defense", "1/dia, soma ½ nível de officer a todas as Defesas por uma rodada (declare no início do turno).")
);
tree("Droid Commander");
push(
  t("Automated Strike", "automated-strike", "Ação rápida, Knowledge (tactics) CD 15: droides aliados que o ouçam ganham o feat Double Attack com uma arma em que são proficientes até o fim do seu próximo turno.", pre("Double Attack com a arma escolhida")),
  t("Droid Defense", "droid-defense", "Ação padrão: droides aliados que o ouçam recebem bônus igual ao seu mod. de Inteligência numa Defesa (à escolha) até o início do seu próximo turno."),
  t("Droid Mettle", "droid-mettle", "1/turno, ação rápida: um droide aliado em linha de visão ganha PV bônus iguais a 10 + nível de classe.", pre("Droid Defense", T("droid-defense"))),
  t("Expanded Sensors", "expanded-sensors", "Se você ou um droide aliado vê e conhece um alvo, todos os droides aliados que o ouçam contam como tendo linha de visão (não de efeito) a ele."),
  t("Inspire Competence", "inspire-competence", "1/turno, ação rápida: um droide aliado em linha de visão recebe bônus de competência igual a ½ nível de classe no próximo ataque; droides da sua Networked Mind contam como tendo processador heurístico quando for benéfico.", pre("Expanded Sensors", T("expanded-sensors"))),
  t("Maintain Focus", "maintain-focus", "1/turno, ação rápida: droides aliados em linha de visão podem usar Recover com duas ações rápidas (em vez de três) até o início do seu próximo turno."),
  t("Overclocked Troops", "overclocked-troops", "1/turno, ação rápida: droides da sua rede movem-se imediatamente até o deslocamento.", pre("Droid Defense", T("droid-defense"))),
  t("Reinforced Commands", "reinforced-commands", "Bônus de moral ou intuição que você dá a um droide aliado aumentam em 1.", pre("Droid Defense", T("droid-defense")))
);
tree("Military Engineer");
push(
  t("Breach Cover", "breach-cover", "Atacando com arma de explosão ou splash um alvo com cobertura, ignora a cobertura."),
  t("Breaching Explosive", "breaching-explosive", "Ignora o Limiar de Dano de portas e paredes ao usar minas e explosivos fixos (não granadas)."),
  t("Droid Expert", "droid-expert", "Ao reparar um droide, repara 1 PV adicional por ponto que o teste de Mechanics superar a CD 20.", pre("Repairs on the Fly", T("repairs-on-the-fly"))),
  t("Prepared Explosive", "prepared-explosive", "Ao usar mina ou explosivo fixo, pode fazer a área virar terreno difícil depois da detonação; ou, plantando em terreno difícil, o explosivo não causa dano e transforma a área em terreno normal."),
  t("Problem Solver", "problem-solver", "1/turno, ação rápida: um veículo em linha de visão cujo piloto o ouça ignora terreno difícil até o início do seu próximo turno, e o piloto recebe +5 de intuição em Pilot para evitar perigos e colisões."),
  t("Quick Modifications", "quick-modifications", "Ao criar uma Field-Created Weapon, aplica a ela uma modificação do Tech Specialist (Starships of the Galaxy).", pre("Repairs on the Fly, Tech Specialist", { talents: ["repairs-on-the-fly"], feats: ["tech-specialist"] })),
  t("Repairs on the Fly", "repairs-on-the-fly", "Usa a aplicação de reparo de Mechanics em um droide ou objeto como ação padrão; 1/dia por droide, objeto ou veículo."),
  t("Sabotage Device", "sabotage-device", "Ação rápida: sabota um objeto ou arma alimentado por célula de energia para que funcione como granada de fragmentação (até ser restaurado com outra ação rápida)."),
  t("Tech Savant", "tech-savant", "Ação padrão: aumenta em 1 quadrado o deslocamento de um droide ou veículo adjacente que você ocupa até o fim do seu próximo turno.", pre("Treinado em Knowledge (technology)", { trained: ["knowledgeTechnology"] })),
  t("Vehicular Boost", "vehicular-boost", "Ação padrão, Mechanics CD 15: o veículo que você ocupa ganha PV bônus iguais a 5 × nível de classe (somem no fim do encontro).")
);
tree("Vanguard");
push(
  t("Enhanced Vision", "enhanced-vision", "Procurando inimigos escondidos, faz Perception como ação rápida em vez de padrão."),
  t("Impenetrable Cover", "impenetrable-cover", "Com cobertura contra um alvo, ganha RD igual ao seu nível de classe contra os ataques dele até o início do seu próximo turno (se ainda tiver cobertura).", pre("Maximize Cover", T("maximize-cover"))),
  t("Invisible Attacker", "invisible-attacker", "Contra um alvo que não sabe de você, seus ataques à distância causam +1 dado de dano.", pre("Maximize Cover", T("maximize-cover"))),
  t("Mark the Target", "mark-the-target", "Ao ferir um alvo com ataque à distância que não seja de área, ação rápida: um aliado em linha de visão o trata como desprevenido no primeiro ataque antes do início do seu próximo turno."),
  t("Maximize Cover", "maximize-cover", "Quando um oponente mira para anular sua cobertura, faça Stealth contra a Iniciativa dele: se vencer, mantém o bônus de cobertura."),
  t("Shellshock", "shellshock", "Ao ferir com ataque de área um alvo que não sabe de você, ele fica desprevenido até o início do seu próximo turno.", pre("Soften the Target", T("soften-the-target"))),
  t("Soften the Target", "soften-the-target", "Ao ferir um alvo com ataque à distância, ação rápida: um aliado em linha de visão ignora a RD e o SR do alvo até o início do seu próximo turno."),
  t("Triangulate", "triangulate", "Se você e pelo menos um aliado têm linha de visão a um alvo e o conhecem, você e os aliados que o ouçam podem rerrolar um ataque à distância contra ele (ficando com o segundo); 1/encontro cada.", pre("Enhanced Vision", T("enhanced-vision")))
);

export const CLASS_TREES = {
  noble: ["Collaborator", "Loyal Protector"], scoundrel: ["Opportunist"], scout: ["Reconnaissance", "Surveillance"],
  soldier: ["Trooper", "Squad Leader (Soldier)"], "elite-trooper": ["Melee Specialist", "Republic Commando"], "jedi-knight": ["Jedi Archivist", "Jedi Healer"]
};

export default out;
