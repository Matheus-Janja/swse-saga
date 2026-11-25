// The Clone Wars Campaign Guide — Cap. 2: feats (Tabela 2-1). Textos resumidos.
const SRC = "The Clone Wars Campaign Guide";
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
const mod = (target, value, type = "untyped") => ({ target, value: String(value), type, label: "", disabled: false });
const feat = (name, key, benefit, pre = {}, o = {}) => ({
  name, type: "feat", img: "icons/skills/targeting/crosshair-pointed-orange.webp",
  system: { key, description: `<p>${benefit}</p>`, source: SRC, prerequisites: P(pre), choice: { type: "", value: "", options: [] }, repeatable: false,
    modifiers: o.modifiers ?? [], rerolls: o.rerolls ?? [], grantedBy: "" },
  folder: SRC
});

export default [
  feat("Anointed Hunter", "anointed-hunter", "Se terminar o movimento a 2 ou mais quadrados de onde começou, +1 de competência nos ataques com armas de arremesso até o fim do turno.", { text: "Espécie Nelvaanian", species: ["nelvaanian"] }),
  feat("Artillery Shot", "artillery-shot", "Com armas de explosão (burst) ou splash, contra alvo além da queima-roupa, afeta mais dois quadrados adjacentes à área normal.", { text: "Proficiente na arma usada" }),
  feat("Coordinated Barrage", "coordinated-barrage", "Ao ajudar o ataque de um aliado (aid another), a cada 3 pontos que o ataque dele superar a Reflexos do alvo, causa +1 dado de dano (máx. igual ao número de aliados com o feat que ajudaram, ou +5 dados).", { text: "Coordinated Attack, BBA +5", feats: ["coordinated-attack"], bab: 5 }),
  feat("Droidcraft", "droidcraft", "Repara um droide em 10 minutos em vez de 1 hora.", { text: "Treinado em Mechanics", trained: ["mechanics"] }),
  feat("Droid Hunter", "droid-hunter", "+2 nas jogadas de dano contra droides inimigos, ou +4 com arma que causa dano iônico. (Automático contra alvos droides marcados.)", { text: "Proficiente na arma usada" }),
  feat("Experienced Medic", "experienced-medic", "Faz cirurgia (Treat Injury) em um número de criaturas igual ao mod. de Inteligência (mín. 2) ao mesmo tempo, com um teste para cada.", { text: "Treinado em Treat Injury", trained: ["treatInjury"] }),
  feat("Expert Droid Repair", "expert-droid-repair", "Repara um número de droides igual ao mod. de Inteligência ao mesmo tempo, com um teste de Mechanics para cada.", { text: "Treinado em Mechanics", trained: ["mechanics"] }),
  feat("Flash and Clear", "flash-and-clear", "Ao ferir um alvo com arma de explosão (burst) ou splash, você ganha camuflagem contra ele até o início do seu próximo turno."),
  feat("Flood of Fire", "flood-of-fire", "Num ataque de área com arma em autofire, os alvos perdem os bônus de esquiva e de deflexão na Reflexos contra ele.", { text: "Proficiente na arma usada" }),
  feat("Grand Army of the Republic Training", "grand-army-of-the-republic-training", "Usando armadura que dá bônus de equipamento na Fortitude, aplica também esse bônus na Vontade. (Automático.)", { text: "Proficiente com a armadura usada" }),
  feat("Gunnery Specialist", "gunnery-specialist", "Como artilheiro de um veículo, é considerado proficiente com armas de veículo; 1/encontro rerrola um ataque com arma de veículo (fica com o segundo resultado), decidindo antes do resultado. Conta como Vehicular Combat para o pré-requisito de Starship Tactics (mas só manobras de artilheiro, salvo treinado em Pilot).", { text: "BBA +1", bab: 1 }),
  feat("Jedi Familiarity", "jedi-familiarity", "1/encontro, quando um poder da Força ou talento da Força de um aliado o afeta, ganha um Ponto da Força temporário (usar até o fim do encontro). Não vale se o efeito causa dano ou desce você na trilha."),
  feat("Leader of Droids", "leader-of-droids", "Ao dar um efeito benéfico que afeta a mente a aliados, pode escolher droides em número igual ao mod. de Inteligência (mín. 1): eles ignoram a imunidade a efeitos mentais para recebê-lo."),
  feat("Overwhelming Attack", "overwhelming-attack", "Duas ações rápidas na mesma rodada para ativar: se o alvo tentar negar seu próximo ataque com talento, feat ou habilidade (Block, Deflect, Vehicular Combat...), sofre −5 nos ataques ou testes para negá-lo."),
  feat("Pall of the Dark Side", "pall-of-the-dark-side", "Soma metade do Dark Side Score (mín. 1) aos testes de Use the Force para resistir a ser detectado pela aplicação Sense Force.", { text: "Dark Side Score 1+", darkSide: "atLeast1" }),
  feat("Separatist Military Training", "separatist-military-training", "Adjacente a pelo menos um aliado, +1 de circunstância em uma jogada de ataque por turno."),
  feat("Spray Shot", "spray-shot", "Com arma em autofire, pode reduzir a área do ataque para 1 quadrado."),
  feat("Trench Warrior", "trench-warrior", "Adjacente a uma parede ou objeto que lhe dá cobertura contra os ataques à distância de um inimigo, +1 de circunstância nos ataques contra esse inimigo."),
  feat("Unstoppable Force", "unstoppable-force", "+5 de intuição na Fortitude e na Vontade contra qualquer ataque ou efeito que exija teste de Use the Force."),
  feat("Unwavering Resolve", "unwavering-resolve", "+5 de intuição na Vontade contra Deception e Persuasion.", { text: "Treinado em Perception", trained: ["perception"] }),
  feat("Wary Defender", "wary-defender", "Ao lutar defensivamente, +2 de competência na Fortitude e na Vontade até o início do seu próximo turno.")
];

/** Feats bônus por classe (quadro "Bonus Feats"). */
export const CLASS_BONUS_FEATS = {
  jedi: ["unstoppable-force", "unwavering-resolve", "wary-defender"],
  noble: ["experienced-medic", "leader-of-droids", "unwavering-resolve", "wary-defender"],
  scoundrel: ["droid-hunter", "droidcraft", "expert-droid-repair", "flash-and-clear", "overwhelming-attack"],
  scout: ["droid-hunter", "droidcraft", "expert-droid-repair", "flash-and-clear"],
  soldier: ["artillery-shot", "coordinated-barrage", "droid-hunter", "experienced-medic", "flash-and-clear", "flood-of-fire", "grand-army-of-the-republic-training",
    "gunnery-specialist", "overwhelming-attack", "separatist-military-training", "trench-warrior", "unstoppable-force", "wary-defender"]
};
