// Threats of the Galaxy — talentos e feats dos quadros do livro. Textos resumidos.
const SRC = "Threats of the Galaxy";
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
const out = [];
const push = (...x) => out.push(...x);
const MT = pre("Malkite Techniques", { talents: ["malkite-techniques"] });
const MA1 = ["martial-arts-i"];

tree("Malkite Poisoner");
push(
  t("Malkite Techniques", "malkite-techniques", "1/encontro, ação padrão: aplica uma toxina a uma arma cortante ou perfurante não energizada. Se um ataque com ela superar a Fortitude do alvo, ele fica envenenado: a cada rodada, 1d20 + nível heroico contra a Fortitude; se acertar, 1d6 + ½ nível heroico de dano e −1 passo. No fim da trilha fica inconsciente mas continua sofrendo dano até o veneno errar ou ser tratado (Treat Injury CD 10 + nível heroico)."),
  t("Modify Poison", "modify-poison", "Muda o modo de aplicação de um veneno (contato, ingerido, inalado, ferimento) com Knowledge (life sciences) contra a CD de Treat Injury do veneno; os efeitos não mudam.", MT),
  t("Numbing Poison", "numbing-poison", "Alvos envenenados por você perdem o bônus de Destreza na Reflexos enquanto o veneno durar.", MT),
  t("Undetectable Poison", "undetectable-poison", "A CD de Treat Injury para tratar seus venenos sobe 5.", MT),
  t("Vicious Poison", "vicious-poison", "Seus venenos recebem +2 nas jogadas de ataque contra a Fortitude do alvo.", MT)
);
tree("Dark Side", "forceTalent");
push(t("Drain Knowledge", "drain-knowledge", "Ação padrão, um Ponto da Força, tocando um inimigo: Use the Force contra a Vontade dele. Se vencer, fica treinado por um dia numa perícia em que ele é treinado (ou ganha Skill Focus nela, se já for treinado), e o alvo desce −1 passo persistente (8 horas de descanso). Alternativamente, Perception contra a Vontade para arrancar uma informação específica. Se falhar, não pode tentar no mesmo alvo por um dia. Aumenta o Dark Side Score em 1.", pre("Force Sensitivity", { feats: ["force-sensitivity"] })));
tree("Sith", "forceTalent");
push(t("Stolen Form", "stolen-form", "Escolha um talento da árvore Lightsaber Forms: recebe os benefícios dele e conta como tendo-o para pré-requisitos (mas precisa cumprir os pré-requisitos dele). Repetível, com outra forma a cada vez.", pre("Uma técnica da Força, Weapon Focus (lightsabers)", { forceTechniques: 1 }), { repeatable: true }));
tree("Master of Teräs Käsi");
push(
  t("Teräs Käsi Basics", "teras-kasi-basics", "Seus ataques desarmados causam um dado de dano adicional.", pre("Martial Arts I", { feats: MA1 })),
  t("Ignore Damage Reduction", "ignore-damage-reduction", "Ao acertar um ataque desarmado contra um alvo com RD e causar mais dano que ela, ignora a RD completamente.", pre("Teräs Käsi Basics, Martial Arts I", { talents: ["teras-kasi-basics"], feats: MA1 })),
  t("Unarmed Parry", "unarmed-parry", "Lutando defensivamente, reação: um ataque desarmado que iguale ou supere a jogada de um ataque corpo a corpo recebido o anula (precisa estar ciente e não desprevenido); −2 cumulativo a cada uso desde o seu último turno.", pre("Teräs Käsi Basics, Martial Arts I e II", { talents: ["teras-kasi-basics"], feats: ["martial-arts-i", "martial-arts-ii"] })),
  t("Unarmed Counterstrike", "unarmed-counterstrike", "Após aparar com sucesso com Unarmed Parry, faz imediatamente um ataque desarmado contra o atacante como reação.", pre("Teräs Käsi Basics, Unarmed Parry, Martial Arts I e II", { talents: ["teras-kasi-basics", "unarmed-parry"], feats: ["martial-arts-i", "martial-arts-ii"] })),
  t("Teräs Käsi Mastery", "teras-kasi-mastery", "Fazendo só ataques desarmados, pode fazer um ataque total como ação padrão em vez de rodada completa.", pre("Teräs Käsi Basics, Martial Arts I, II e III", { talents: ["teras-kasi-basics"], feats: ["martial-arts-i", "martial-arts-ii", "martial-arts-iii"] }))
);
tree("Mercenary");
push(
  t("Combined Fire (Mercenary)", "combined-fire-mercenary", "+2 nas jogadas de dano contra alvos que um aliado tenha ferido desde o fim do seu último turno.", pre("Coordinated Attack", { feats: ["coordinated-attack"] })),
  t("Mercenary's Grit", "mercenarys-grit", "Afetado por uma condição debilitante, ação rápida: converte a penalidade em bônus por 1 rodada; no fim do seu próximo turno desce −1 passo.", pre("Combined Fire", { talents: ["combined-fire-mercenary"] })),
  t("Mercenary's Determination", "mercenarys-determination", "No seu turno, ação livre: gasta um Ponto da Força para dobrar o deslocamento por 1 rodada; espera 5 rodadas entre usos.", pre("Mercenary's Grit", { talents: ["mercenarys-grit"] })),
  t("Mercenary's Teamwork", "mercenarys-teamwork", "+2 nas jogadas de dano (máx. +10) para cada aliado que feriu seu alvo desde o fim do seu último turno.", pre("Combined Fire, Coordinated Attack", { talents: ["combined-fire-mercenary"], feats: ["coordinated-attack"] }))
);
tree("Commando");
push(t("Hard Target", "hard-target", "Pode usar o second wind como reação em vez de ação rápida.", pre("Tough as Nails", { talents: ["tough-as-nails"] })));
tree("Expert Pilot");
push(t("Vehicle Evasion", "vehicle-evasion", "Pilotando, se um ataque de área atingir seu veículo, ele sofre metade do dano se o ataque acertar e nenhum se errar.", pre("Vehicular Combat", { feats: ["vehicular-combat"] })));

export default out;

/** Árvores novas adicionadas às classes. */
export const CLASS_TREES = { scoundrel: ["Malkite Poisoner"], soldier: ["Mercenary"], "elite-trooper": ["Master of Teräs Käsi"] };

/* ---------------- FEATS ---------------- */
const feat = (name, key, benefit, pre = {}, o = {}) => ({
  name, type: "feat", img: "icons/skills/movement/feet-winged-boots-brown.webp",
  system: { key, description: `<p>${benefit}</p>`, source: SRC, prerequisites: P(pre), choice: { type: "", value: "", options: [] }, repeatable: false, modifiers: [], rerolls: [], grantedBy: "" },
  folder: SRC
});
export const feats = [
  feat("A Few Maneuvers", "a-few-maneuvers", "Pilotando um veículo Colossal ou menor, +2 de esquiva na Reflexos dele; quando um míssil ou torpedo erra seu veículo por 5 ou mais, ele se autodestrói.", { text: "Dodge, Vehicular Combat", feats: ["dodge", "vehicular-combat"] }),
  feat("Suppression Fire", "suppression-fire", "Ao usar aid another para impor penalidade a um inimigo, se o ataque também superar a Vontade dele, ele precisa terminar o próximo turno numa posição com cobertura contra você, se possível. Alvos de nível igual ou maior que o seu são imunes. Medo, afeta a mente.", { text: "For 13, Burst Fire, Weapon Proficiency (heavy weapons)", abilities: { str: 13 }, feats: ["burst-fire", "weapon-proficiency-heavy"] }),
  feat("Momentum Strike", "momentum-strike", "Montado ou numa speeder bike (piloto ou passageiro), +1 dado de dano nos ataques corpo a corpo se a montaria/veículo já se moveu pelo menos o próprio deslocamento neste turno.", { text: "Treinado em Pilot ou Ride" }),
  feat("Mounted Defense", "mounted-defense", "Montado ou numa speeder bike, 1/encontro redireciona para a montaria/veículo um ataque feito contra você (depois de ver a jogada, antes do dano).", { text: "Treinado em Pilot ou Ride" })
];
