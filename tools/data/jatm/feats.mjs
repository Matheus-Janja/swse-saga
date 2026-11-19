// Jedi Academy Training Manual — feats (Cap. 1, p.23-24). Benefícios resumidos.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, ...o
});
const feat = (name, key, benefit, pre = {}, o = {}) => ({
  name, type: "feat", img: o.img ?? "icons/skills/targeting/crosshair-pointed-orange.webp",
  system: {
    key, description: `<p>${benefit}</p>`, source: "Jedi Academy Training Manual",
    prerequisites: P(pre), choice: { type: o.choice ?? "", value: o.value ?? "", options: [] },
    repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], grantedBy: ""
  },
  folder: "Jedi Academy Training Manual"
});

export default [
  feat("Follow Through", "follow-through", "1/turno, ao reduzir um oponente a 0 PV com um ataque corpo a corpo, move imediatamente até o seu deslocamento. Com Cleave, pode mover antes do ataque extra."),
  feat("Force Regimen Mastery", "force-regimen-mastery", "Aprende regimes da Força (compêndio de poderes, pasta Regimes da Força) em número igual a 1 + mod. de Sabedoria (mín. 1). Repetível. Se o mod. de Sabedoria aumentar permanentemente, aprende regimes adicionais.", { text: "Force Sensitivity, treinado em Use the Force", feats: ["force-sensitivity"], trained: ["useTheForce"] }, { repeatable: true }),
  feat("Long Haft Strike", "long-haft-strike", "Usa o lightsaber pike ou o long-handle lightsaber como arma dupla (a outra ponta causa 1d6). (Automático: as armas ganham a segunda ponta.)", { text: "Proficiente com a arma" }),
  feat("Relentless Attack", "relentless-attack", "Escolha um grupo/arma com Double Attack: ao errar um alvo com ela, recebe +2 de competência no próximo ataque contra ele antes do fim do seu próximo turno. Repetível. (Automático: o efeito é criado ao errar.)", { text: "Proficiente com a arma, Double Attack com a arma", feats: ["double-attack"] }, { choice: "weaponGroup", repeatable: true }),
  feat("Unswerving Resolve", "unswerving-resolve", "Quando um efeito de medo ou de afetar a mente não consegue vencer sua Vontade, recebe um Ponto da Força temporário que dura até o fim do seu próximo turno. (Botão ⚡ para registrar.)", { text: "BBA +2", bab: 2 })
];
