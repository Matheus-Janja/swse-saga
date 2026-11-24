// The Unknown Regions — Cap. 1: talentos e feats novos. Textos resumidos.
const SRC = "The Unknown Regions";
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
const reroll = (skill, label, keep = "best") => ({ skill, keep, label });
const out = [];
const push = (...x) => out.push(...x);
const PERS = pre("Treinado em Persuasion", { trained: ["persuasion"] });
const PERC = pre("Treinado em Perception", { trained: ["perception"] });
const RIDE = pre("Treinado em Ride", { trained: ["ride"] });
const DS1 = pre("Force Sensitivity, Dark Side Score 1 ou mais", { feats: ["force-sensitivity"], darkSide: "atLeast1" });

/* ---------------- Jedi ---------------- */
tree("Jedi Sentinel");
push(t("Sense Primal Force", "sense-primal-force", "Numa área natural selvagem (selva, floresta, estepe, pântano, planície), Sense Surroundings detecta alvos num raio de 30 quadrados, independentemente da linha de visão."));

/* ---------------- Noble ---------------- */
tree("Exile");
push(
  t("Arrogant Bluster", "arrogant-bluster", "Ao mudar com sucesso a atitude de um inimigo com Persuasion, ele sofre −5 na Vontade até o fim do seu próximo turno (com um Ponto da Força, até o fim do encontro). Afeta a mente.", PERS),
  t("Band Together", "band-together", "Cada uma 1/encontro: <em>Directed Attack</em> (ação rápida: designe um inimigo; até o fim do seu próximo turno, aliados a até 12 quadrados que o acertarem causam +1d6); <em>Strength in Numbers</em> (ação rápida, com 2+ aliados: aliados a até 12 quadrados em linha de visão recebem +5 na Vontade até o fim do seu próximo turno); <em>Temporary Allies</em> (com Persuasion, um PdM hostil/indiferente vira aliado até o fim do encontro e, com ação rápida sua, ataca, ajuda ou usa uma perícia; afeta a mente).",
    pre("Galactic Guidance, Self-Reliant, treinado em Persuasion e Knowledge (galactic lore)", { talents: ["galactic-guidance", "self-reliant"], trained: ["persuasion", "knowledgeGalacticLore"] })),
  t("Galactic Guidance", "galactic-guidance", "1/encontro, reação: Knowledge (galactic lore) CD 25 permite a um aliado a até 6 quadrados rerrolar um teste de perícia baseado em Int ou Sab que falhou (exceto Perception).", pre("Treinado em Knowledge (galactic lore)", { trained: ["knowledgeGalacticLore"] })),
  t("Rant", "rant", "1/encontro, reação ao intimidar com sucesso um inimigo a até 6 quadrados que o ouça: em vez do efeito normal, ele perde a ação de movimento no próximo turno e um aliado seu recebe uma ação de movimento imediata.", PERS),
  t("Self-Reliant", "self-reliant", "1/encontro, pode usar em si mesmo um talento da árvore Inspiration que normalmente não poderia.")
);
tree("Leadership");
push(t("Coordinated Leadership", "coordinated-leadership", "Escolha um talento seu da árvore Leadership: os bônus que ele concede passam a ser sem tipo, acumulando com os dos seus aliados.", pre("Born Leader, Coordinate", { talents: ["born-leader", "coordinate"] })));

/* ---------------- Scoundrel ---------------- */
tree("Outsider");
push(
  t("Oafish", "oafish", "1/encontro, ao falhar num teste de Deception ou Persuasion, soma 1d6 + mod. de Sabedoria ao resultado."),
  t("Outsider's Eye", "outsiders-eye", "1/encontro, ação padrão, Perception CD 20: descobre uma Defesa de um personagem ou veículo em linha de visão, ou quem em linha de visão tem mais/menos PV ou está mais alto/baixo na trilha de condição.", PERC),
  t("Outsider's Query", "outsiders-query", "Se falhar em Persuasion para mudar a atitude de alguém, a atitude não piora; e pode tentar mudá-la uma vez extra por encontro.", PERS),
  t("Wary", "wary", "Quando um inimigo falha num teste de Stealth ou Deception resistido pela sua Perception, você ganha uma ação de movimento como reação (máximo de ações por turno igual ao seu mod. de Destreza).", pre("Outsider's Eye, treinado em Perception", { talents: ["outsiders-eye"], trained: ["perception"] }))
);
tree("Spacer");
push(t("Deep Space Raider", "deep-space-raider", "Cada uma 1/encontro, pilotando uma nave: <em>Clear a Path</em> (ação padrão, ataque à distância; se acertar, o alvo precisa se afastar de você no próximo turno; um caça em dogfight tenta se desvencilhar); <em>Covering Fire</em> (rodada completa: move até o dobro do deslocamento e faz um ataque com arma do piloto em qualquer ponto; se acertar, o alvo tem −2 nos ataques contra você até o fim do seu próximo turno); <em>Disabling Fire</em> (ataque com arma de veículo; se acertar e causar dano, até o fim do seu próximo turno: uma arma para, o SR cai a 0, o hiperpropulsor desliga ou o deslocamento cai a 2 quadrados).",
  pre("Spacehound, Starship Raider", { talents: ["spacehound", "starship-raider"] })));

/* ---------------- Scout ---------------- */
tree("Camouflage");
push(t("Extended Ambush", "extended-ambush", "Na rodada surpresa, ao fazer um ataque à distância contra um alvo surpreso, pode mirar nele como ação livre.", pre("Improved Stealth", { talents: ["improved-stealth"] })));
tree("Hyperspace Explorer");
push(t("Silent Movement", "silent-movement", "Ruído nunca lhe impõe circunstâncias desfavoráveis em Stealth; 1/rodada, ao usar Stealth, ajuda automaticamente o Stealth de um aliado.", pre("Treinado em Stealth", { trained: ["stealth"] })));
tree("Master Scout");
push(
  t("Piercing Hit", "piercing-hit", "Cada uma 1/encontro, ação padrão (ataque corpo a corpo ou à distância que acerte e cause dano): <em>Binding Hit</em> (o alvo perde o bônus de armadura na Reflexos e fica desprevenido até gastar uma ação padrão ajustando a armadura); <em>Blinding Fire</em> (−2 em todos os ataques do alvo e todos os outros têm camuflagem contra ele até o fim do seu próximo turno); <em>Slowing Shot</em> (deslocamento do alvo cai a 2 quadrados até o fim do seu próximo turno).", pre("Acute Senses, Keen Shot", { talents: ["acute-senses", "keen-shot"] })),
  t("Quicktrap", "quicktrap", "Monta Tripwire como ação de movimento em vez de padrão.", pre("Jury-Rigger, Tripwire, treinado em Mechanics", { talents: ["jury-rigger", "tripwire"], trained: ["mechanics"] })),
  t("Speedclimber", "speedclimber", "Não sofre a penalidade da escalada acelerada (Climb).", pre("Long Stride, Surefooted, treinado em Climb", { talents: ["long-stride", "surefooted"], trained: ["climb"] })),
  t("Surprisingly Quick", "surprisingly-quick", "Na rodada surpresa, se não estiver surpreso, ganha uma ação rápida extra; se estiver surpreso, ainda pode fazer uma ação rápida.", pre("Skill Focus (Initiative), treinado em Initiative", { trained: ["initiative"] })),
  t("Tripwire", "tripwire", "Ação padrão, Mechanics CD 20: arma uma armadilha de fio numa abertura de até 3 quadrados; Deception para escondê-la, resistido pela Perception de quem passa (−10 se viu você montar). Se falhar, sofre o efeito (Acrobatics CD 10 evita): <em>Clothesline</em> (cai e sofre 1d6, fim das ações); <em>Electronic tripwire</em> (como granada de fragmentação, raio 2, 1d20+10 contra a Reflexos); <em>Tripwire</em> (+2 no Deception; cai e perde as ações).", pre("Jury-Rigger, treinado em Mechanics", { talents: ["jury-rigger"], trained: ["mechanics"] }))
);
tree("Mobile Scout");
push(
  t("Battle Mount", "battle-mount", "Cada uma 1/encontro: <em>Covered Attack</em> (usando a montaria como cobertura com Ride, ainda ataca como ação padrão com uma mão livre); <em>Reduce Profile</em> (ao usar a montaria como cobertura, recebe cobertura melhorada; se falhar por menos de 10, cobertura normal); <em>Swift Attack Mount</em> (a montaria ataca como ação rápida).", pre("Expert Rider, Terrain Guidance, treinado em Ride", { talents: ["expert-rider", "terrain-guidance"], trained: ["ride"] })),
  t("Expert Rider", "expert-rider", "Pode rerrolar testes de Ride, ficando com o segundo resultado.", RIDE, { rerolls: [{ skill: "ride", keep: "second", label: "Expert Rider" }] }),
  t("Terrain Guidance", "terrain-guidance", "Controlando a montaria, ação rápida e Ride CD 20 anulam o efeito de terreno difícil no deslocamento dela.", RIDE),
  t("Mechanized Rider", "mechanized-rider", "Pilotando speeder bike ou swoop, pode usar as aplicações de Ride montar/desmontar rápido, queda suave, ficar na sela e usar a montaria como cobertura.", pre("Treinado em Pilot e Ride", { trained: ["pilot", "ride"] }))
);

/* ---------------- Soldier ---------------- */
tree("Commando");
push(t("Out of Harm's Way", "out-of-harms-way", "Reação ao usar Harm's Way: entra no quadrado do aliado protegido e o move para um quadrado adjacente válido, sem provocar ataques de oportunidade.", pre("Harm's Way, treinado em Initiative", { talents: ["harms-way"], trained: ["initiative"] })));
tree("Warrior");
push(
  t("Champion", "champion", "Cada uma 1/encontro: <em>Champion's Pride</em> (ao usar o second wind, sobe +1 passo e remove um efeito de medo ou que afete a mente); <em>Disarming Hit</em> (ao igualar ou exceder o Limiar do alvo, faz Disarm como ação livre; à distância exige Ranged Disarm); <em>Masterful Strike</em> (ataque desarmado ou corpo a corpo, exceto sabre: +2 de dano a cada 5 pontos acima da Reflexos do alvo).", pre("Warrior's Awareness, Warrior's Determination", { talents: ["warriors-awareness", "warriors-determination"] })),
  t("Quick Study", "quick-study", "1/encontro, quando um inimigo erra você com um talento não ligado à Força, pode usar esse mesmo talento contra ele no seu próximo turno (sem precisar dos pré-requisitos, com arma ou item adequado).", pre("Warrior's Awareness", { talents: ["warriors-awareness"] })),
  t("Simple Opportunity", "simple-opportunity", "Pode fazer ataques de oportunidade com armas simples à distância ou de arremesso contra um único alvo (não com armas de área).", pre("Weapon Proficiency (simple weapons)")),
  t("Warrior's Awareness", "warriors-awareness", "Reação, a partir do segundo ataque corpo a corpo ou desarmado de um mesmo inimigo no encontro: Perception; se passar, +1 na Reflexos e na Fortitude contra ele até o fim do encontro (um inimigo por vez). (Botão ⚡: rola Perception e aplica o efeito.)"),
  t("Warrior's Determination", "warriors-determination", "1/encontro, reação: ignora um efeito, talento, perícia ou habilidade não ligado à Força que exceda sua Vontade. Com um Ponto da Força, ignora um efeito que afete a mente mesmo vindo da Força.")
);

/* ---------------- Prestígio ---------------- */
tree("Expert Pilot");
push(t("Roll Out", "roll-out", "Ao tentar se desvencilhar de um dogfight, pode rerrolar o Pilot, ficando com o melhor; se falhar, os artilheiros da sua nave não sofrem penalidade nos ataques.", pre("Elusive Dogfighter", { talents: ["elusive-dogfighter"] })));
tree("Gunner");
push(
  t("Fast Attack Specialist", "fast-attack-specialist", "1/encontro, pilotando veículo Gargantua ou menor, faz um ataque total como ação padrão (com um Ponto da Força, mais uma vez no encontro).", pre("Expert Gunner, Quick Trigger", { talents: ["expert-gunner", "quick-trigger"] })),
  t("Overcharged Shot", "overcharged-shot", "Ação rápida: sobrecarrega uma arma de energia do veículo, +1 dado de dano no próximo ataque no mesmo turno; depois a arma perde 1 dado até passar uma rodada completa sem disparar.", pre("Expert Gunner", { talents: ["expert-gunner"] }))
);
tree("Bounty Hunter");
push(
  t("Familiar Enemies", "familiar-enemies", "Aplica Familiar Foe contra um segundo inimigo; se vir os dois ao mesmo tempo, basta uma rodada completa observando.", pre("Familiar Foe")),
  t("Familiar Situation", "familiar-situation", "O bônus de Familiar Foe também vale na Fortitude e na Vontade contra ataques e ações do alvo.", pre("Familiar Foe")),
  t("Quick Cuffs", "quick-cuffs", "Ação rápida após agarrar com sucesso: algema um braço do alvo a um dos seus ou a um objeto adjacente; ambos sofrem −2 nos ataques e na Reflexos enquanto presos.", pre("Quick Draw", { feats: ["quick-draw"] }))
);
tree("Infamy");
push(
  t("Master Manipulator", "master-manipulator", "Após um Persuasion bem-sucedido, faz imediatamente um segundo teste de Persuasion contra o mesmo alvo (para outro uso).", pre("Notorious, Skill Focus (Persuasion), treinado em Persuasion", { talents: ["notorious"], trained: ["persuasion"] })),
  t("Small Favor", "small-favor", "1/dia, Persuasion CD 25: um informante dá +10 de competência num teste de Gather Information ou Knowledge nas próximas 24 horas.", pre("Notorious, treinado em Persuasion", { talents: ["notorious"], trained: ["persuasion"] }))
);
tree("Mastermind");
push(t("Master's Orders", "masters-orders", "Quando um aliado usa uma ação concedida por você, pode rerrolar o ataque ou teste dessa ação, ficando com o melhor.", pre("Impel Ally I, Impel Ally II", { talents: ["impel-ally-i", "impel-ally-ii"] })));
tree("Critical Master");
push(t("Extended Critical Range (simple weapons)", "extended-critical-range-simple", "Com armas simples, a margem de crítico aumenta em 1 (19-20); só o 20 natural é acerto automático.", pre("Weapon Proficiency (simple weapons), BBA +10", { bab: 10 })));
tree("Weapon Master");
push(
  t("Extended Threat", "extended-threat", "Com uma arma à distância apta a ataques de oportunidade, ameaça os quadrados num raio de 2.", pre("Weapon Focus e Weapon Proficiency na arma usada")),
  t("Multiattack Proficiency (simple weapons)", "multiattack-proficiency-simple", "Ataque total com armas simples: −2 na penalidade de ataques múltiplos (cumulativo ao repetir).", {}, { repeatable: true }),
  t("Two-For-One Throw", "two-for-one-throw", "Ação padrão: arremessa duas armas semelhantes (até um tamanho menor que você, alcance curto) no mesmo alvo ou quadrado, cada ataque com −10.", pre("Weapon Focus (simple weapons), Weapon Proficiency (simple weapons)"))
);
tree("Force Adept");
push(
  t("Instrument of the Force", "instrument-of-the-force", "Ao usar Search Your Feelings com sucesso, ganha um Ponto da Força temporário (usar até o fim do encontro). Usá-lo numa ação desfavorável aumenta o Dark Side Score em 1 (ou 2 se a ação já aumentaria)."),
  t("Long Call", "long-call", "Telepatia: CD à metade com alvo voluntário; contra alvo involuntário, rerrola ficando com o melhor; com um Ponto da Força, contata alvos iguais ao mod. de Carisma (mín. 2) num só teste.", pre("Mystical Link", { talents: ["mystical-link"] })),
  t("Mystical Link", "mystical-link", "Ação padrão, Use the Force CD 30: à escolha do Mestre, recupera um poder da Força, ganha um Ponto da Força temporário, um uso extra de um talento/feat da Força limitado por encontro, ou rola um dado extra num teste da Força ficando com o melhor.")
);
tree("Gunslinger");
push(
  t("Lingering Debilitation", "lingering-debilitation", "1/encontro, ao mover um alvo −1 passo com Debilitating Shot, a condição fica persistente (4 horas de descanso ou Treat Injury CD 25).", pre("Debilitating Shot", { talents: ["debilitating-shot"] })),
  t("Retreating Fire", "retreating-fire", "Ao se afastar de um perseguidor correndo ou com duas ações de movimento, faz um ataque à distância com −5 (sem penalidade com um Ponto da Força)."),
  t("Slowing Shot", "slowing-shot", "Após Debilitating Shot, até o alvo voltar ao normal na trilha ou o encontro acabar, ele tem −2 quadrados de deslocamento e fica desprevenido (com um Ponto da Força, −4 quadrados ou metade, o que for maior).", pre("Debilitating Shot", { talents: ["debilitating-shot"] })),
  t("Swift Shot", "swift-shot", "1/encontro, um ataque à distância com arma de mão como ação rápida (não pode usar as demais ações para atacar).")
);
tree("Military Tactics");
push(
  t("Commander's Prerogative", "commanders-prerogative", "Na primeira rodada de combate, age antes de todos os aliados, desde que use um talento compartilhado ou de Commando, Leadership ou Military Tactics; depois volta à sua Iniciativa.", pre("Treinado em Initiative", { trained: ["initiative"] })),
  t("Irregular Tactics", "irregular-tactics", "Depois de usar Share Talent, Knowledge (tactics) como ação livre: o resultado substitui a CD dos talentos de Military Tactics usados contra você e seus aliados.", pre("Share Talent")),
  t("Lead by Example", "lead-by-example", "Se já usou um talento antes de compartilhá-lo no encontro, quem o recebe ganha: CD −5, +2 num bônus concedido, ou −10 no dano sofrido.", pre("Share Talent")),
  t("Turn the Tide", "turn-the-tide", "1/encontro após a 1ª rodada, rodada completa: Knowledge (tactics) contra a Vontade dos inimigos a até 12 quadrados; os afetados rerrolam a Iniciativa no início da próxima rodada (aliados podem escolher rerrolar).", pre("Command Decision, Commander's Prerogative, treinado em Initiative", { talents: ["commanders-prerogative"], trained: ["initiative"] }))
);

/* ---------------- Tradição: Blazing Chain ---------------- */
tree("Blazing Chain", "forceTalent");
push(
  t("Force Directed Shot", "force-directed-shot", "Ação rápida: escolha um quadrado a até 12 quadrados em linha de visão; o próximo ataque à distância com arma de energia antes do seu próximo turno parte dele (cobertura e camuflagem medidas de lá).", pre("Force Sensitivity, treinado em Use the Force", { feats: ["force-sensitivity"], trained: ["useTheForce"] })),
  t("Negate and Redirect", "negate-and-redirect", "Ao negar um tiro de energia com Negate Energy, ação livre: Use the Force contra a Fortitude de um inimigo a até 6 quadrados; se acertar, ele sofre metade do dano negado.", pre("Negate Energy, Force Sensitivity, treinado em Use the Force", { feats: ["force-sensitivity"], trained: ["useTheForce"], forcePowers: ["negate-energy"] })),
  t("Rising Anger", "rising-anger", "1/rodada, reação quando um aliado sofre dano ou desce na trilha: +1 de moral no próximo ataque; repetindo antes de atacar, o bônus sobe até +5. (Botão ⚡.)", DS1),
  t("Rising Panic", "rising-panic", "1/rodada, reação quando um aliado sofre dano ou desce na trilha: Use the Force contra a Vontade do inimigo responsável; se acertar, ele desce −1 passo (no fundo da trilha, em vez de inconsciente, foge por 1 minuto). Medo, afeta a mente. (Botão ⚡.)", DS1)
);

export default out;

/** Árvores novas adicionadas às classes. */
export const CLASS_TREES = {
  noble: ["Exile"], scoundrel: ["Outsider"], scout: ["Master Scout", "Mobile Scout", "Hyperspace Explorer"], soldier: ["Warrior"],
  "elite-trooper": ["Critical Master"]
};

/* ---------------- FEATS ---------------- */
const feat = (name, key, benefit, pre = {}, o = {}) => ({
  name, type: "feat", img: "icons/skills/movement/feet-winged-boots-brown.webp",
  system: { key, description: `<p>${benefit}</p>`, source: SRC, prerequisites: P(pre), choice: { type: o.choice ?? "", value: "", options: [] }, repeatable: !!o.repeatable,
    modifiers: o.modifiers ?? [], rerolls: o.rerolls ?? [], grantedBy: "" },
  folder: SRC
});
export const feats = [
  feat("Acrobatic Ally", "acrobatic-ally", "Ação padrão, Acrobatics CD 20: lança um aliado do seu tamanho ou menor (que aja na mesma iniciativa e comece adjacente) até 2 quadrados; conta como ação livre dele e encerra o turno dele, que depois pode continuar. Se falhar, ambos caem no seu quadrado. Pode provocar ataques de oportunidade.",
    { text: "Des 13, For 13, treinado em Acrobatics", abilities: { dex: 13, str: 13 }, trained: ["acrobatics"] }),
  feat("Acrobatic Dodge", "acrobatic-dodge", "1/encontro (mais uma com um Ponto da Força), reação quando um ataque corpo a corpo erra você: move-se para um quadrado adjacente sem provocar ataque de oportunidade.",
    { text: "Des 13, Dodge, Mobility, Skill Focus (Acrobatics), treinado em Acrobatics", abilities: { dex: 13 }, feats: ["dodge", "mobility"], trained: ["acrobatics"] }),
  feat("Combat Trickery", "combat-trickery", "Duas ações rápidas consecutivas: Deception contra a Vontade do alvo; se vencer, ele fica desprevenido contra seu próximo ataque antes do fim do seu próximo turno (um Ponto da Força estende até o fim do encontro).", { text: "Treinado em Deception", trained: ["deception"] }),
  feat("Elder's Knowledge", "elders-knowledge", "1/encontro, substitui um teste de Sabedoria (ou perícia de Sabedoria) por Knowledge (social sciences) ou (galactic lore).", { text: "Skill Focus (Knowledge [social sciences] ou [galactic lore])" }),
  feat("Frightening Cleave", "frightening-cleave", "Logo após usar Cleave, cada inimigo a até 6 quadrados em linha de visão sofre −1 na Reflexos, ataques e perícias contra você até o fim do encontro (acumula até −5). Afeta a mente.",
    { text: "For 13, Cleave, Power Attack, BBA +4", abilities: { str: 13 }, feats: ["cleave", "power-attack"], bab: 4 }),
  feat("Grab Back", "grab-back", "+2 na Reflexos contra agarrar e grapple; quando um inimigo erra um desses ataques contra você, faz o seu como reação (ou um grapple, se tiver Pin, Trip etc.).", { text: "Des 13", abilities: { dex: 13 } }),
  feat("Halt", "halt", "Ao acertar um ataque de oportunidade num inimigo até um tamanho maior, compare o mesmo d20 com o grapple dele: se superar, ele para e cai no quadrado; se exceder o Limiar, perde as ações restantes. Encerra uma investida.",
    { text: "Trip, Weapon Focus e Weapon Proficiency na arma, BBA +8", feats: ["trip"], bab: 8 }),
  feat("Heavy Hitter", "heavy-hitter", "Com arma de emplacement ou de veículo, +1 de dano a cada 5 pontos acima da Reflexos do alvo; excedendo o Limiar, no próximo turno ele não ataca e perde 2 quadrados de deslocamento (1 em escala de nave).", { text: "Weapon Focus e Weapon Proficiency (heavy weapons)" }),
  feat("Hold Together", "hold-together", "Reação, com um Ponto da Força: adia até o fim da rodada o efeito do dano num veículo Colossal ou menor que você pilota ou em que está.", { text: "Treinado em Mechanics", trained: ["mechanics"] }),
  feat("Hyperblazer", "hyperblazer", "No emaranhado do hiperespaço, tempo de cálculo e penalidades de astrogação (Use Computer) caem à metade; mapear novas rotas leva metade do tempo.", { text: "Treinado em Use Computer", trained: ["useComputer"] }),
  feat("Improved Sleight of Hand", "improved-sleight-of-hand", "Ação rápida: Deception antes do Stealth de prestidigitação — a Perception de quem observa precisa superar os dois. Também saca e esconde na mão uma arma dois tamanhos menor que você numa só ação; reesconder é ação rápida.",
    { text: "Des 15, Skill Focus (Deception), treinado em Deception e Stealth", abilities: { dex: 15 }, trained: ["deception", "stealth"] }),
  feat("Improvised Weapon Mastery", "improvised-weapon-mastery", "Armas improvisadas contam como armas simples (sem penalidade, valem talentos e feats de armas simples) e causam +1d6 de dano.", { text: "Weapon Proficiency (simple weapons)" }),
  feat("Instinctive Attack", "instinctive-attack", "Ao gastar um Ponto da Força num ataque, rerrola o ataque e fica com o melhor (o dado do Ponto vale para o melhor).", { text: "Proficiente na arma, ser vivo (não droide)", nonDroid: true }),
  feat("Instinctive Defense", "instinctive-defense", "No seu turno, ação livre: gasta um Ponto da Força para ganhar +2 em todas as Defesas até o início do seu próximo turno. (Botão ⚡.)", { text: "Ser vivo (não droide)", nonDroid: true }),
  feat("Intimidator", "intimidator", "Ao intimidar com Persuasion, em vez do efeito normal, o alvo sofre −5 em perícias (inclusive Use the Force) e −2 nos ataques enquanto estiver na sua linha de visão, até o fim do seu próximo turno. Não combina com Maniacal Charge.", { text: "Treinado em Persuasion", trained: ["persuasion"] }),
  feat("Maniacal Charge", "maniacal-charge", "Ao investir, Persuasion como ação livre para intimidar o alvo e cada inimigo pelo qual passar (a 1 quadrado): os afetados não fazem ataque de oportunidade; o alvo perde o bônus de Destreza e fica desprevenido até o início do seu próximo turno."),
  feat("Mounted Combat", "mounted-combat", "Ação rápida, Ride CD 20 (sem escolher 10): a montaria tem +2 quadrados de deslocamento até o seu próximo turno; se falhar, ela desce −1 passo. Usos seguintes no encontro exigem Endurance CD 20 da montaria. 1/rodada, reação: Ride contra o resultado de um ataque que acertou você ou a montaria para negá-lo.", { text: "Treinado em Ride", trained: ["ride"] }),
  feat("Nikto Survival", "nikto-survival", "Escolha sua subespécie Nikto (Kajain'sa'Nikto: deserto; Kadas'sa'Nikto: floresta; Esral'sa'Nikto: montanha; Gluss'sa'Nikto: oceano; M'shento'su'Nikto: ártico). No ambiente nativo, rerrola Survival ficando com o melhor.",
    { text: "Espécie Nikto", species: ["nikto"] }, { choice: "text" }),
  feat("Targeted Area", "targeted-area", "Num ataque de área bem-sucedido, escolha um alvo atingido: ele sofre +5 de dano (antes de Evasion).", { text: "Weapon Proficiency na arma, BBA +5", bab: 5 }),
  feat("Trample", "trample", "Na investida montada, a montaria faz um ataque corpo a corpo contra a Reflexos de cada inimigo cujo quadrado atravessar (dano de garra/chifre/pancada + For da montaria); você ou ela ainda atacam no fim. Montarias com o feat não precisam do pré-requisito.", { text: "Treinado em Ride", trained: ["ride"] }),
  feat("Wilderness First Aid", "wilderness-first-aid", "1/dia, Survival CD 20 (ajustável pelo ambiente): até o fim do dia, conta como tendo um medpac para Treat Injury.", { text: "Treinado em Survival", trained: ["survival"] })
];

/** Feats que passam a ser feats bônus de classe (Tabela "Bonus Feats"). */
export const CLASS_BONUS_FEATS = {
  jedi: ["elders-knowledge", "instinctive-attack", "instinctive-defense"],
  noble: ["combat-trickery", "elders-knowledge", "intimidator", "mounted-combat"],
  scoundrel: ["acrobatic-ally", "acrobatic-dodge", "combat-trickery", "hold-together", "improved-sleight-of-hand"],
  scout: ["hold-together", "hyperblazer", "improvised-weapon-mastery", "maniacal-charge", "mounted-combat", "targeted-area", "trample", "wilderness-first-aid"],
  soldier: ["frightening-cleave", "grab-back", "halt", "heavy-hitter", "improvised-weapon-mastery", "maniacal-charge", "targeted-area"]
};
