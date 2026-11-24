// Threats of the Galaxy — espécies apresentadas nos quadros do livro. Descrições resumidas.
const SRC = "Threats of the Galaxy";
const A = (o = {}) => ({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0, ...o });
const sp = (name, key, o) => ({
  name, type: "species", img: "icons/environment/people/group.webp",
  system: {
    key, size: "medium", speed: 6, swimSpeed: 0, droid: false, primitive: false,
    bonusFeats: [], bonusFeatChoices: 0, bonusTrainedSkills: 0, conditionalFeats: [], rerolls: [], autoTrained: [],
    modifiers: [], languages: "Basic", traits: [], description: "", naturalWeapon: "", source: SRC,
    ...o, abilityMods: A(o.abilityMods)
  }
});
const mod = (target, value, type = "species") => ({ target, value: String(value), type, label: "", disabled: false });

export default [
  sp("Chistori", "chistori", {
    abilityMods: { str: 2, dex: -2 }, languages: "Chistori", modifiers: [mod("damageReduction", 2)],
    description: "<p>Sáurios ferozes e impacientes de mundo natal desconhecido, que resolvem quase tudo com violência. Jedi Chistori são raríssimos.</p>",
    traits: [
      { name: "Cold-Blooded", text: "−5 na Fortitude em áreas de frio extremo." },
      { name: "Armor Plating", text: "Escamas grossas: Redução de Dano 2." },
      { name: "Rage", text: "1/dia, ação rápida: +2 de fúria nos ataques e dano corpo a corpo por 5 + mod. de Con rodadas; não usa perícias de paciência (Mechanics, Stealth, Use the Force). Ao terminar, −1 passo persistente até descansar 10 minutos." }
    ]
  }),
  sp("Miraluka", "miraluka", {
    abilityMods: { int: 2, dex: -2 }, languages: "Basic, Miralukese", conditionalFeats: [{ skill: "useTheForce", feat: "force-training" }],
    description: "<p>Quase-humanos cegos que \"veem\" através da Força.</p>",
    traits: [
      { name: "Force Sight", text: "Cegos, mas agem sem penalidade, fazem Perception, leem e escrevem; ignoram escuridão como com darkvision. Não percebem criaturas \"invisíveis\" na Força (Yuuzhan Vong, ysalamiri) nem áreas que suprimem a Força: ali tudo tem camuflagem total." },
      { name: "Conditional Bonus Feat", text: "Treinado em Use the Force, recebe Force Training." }
    ]
  }),
  sp("Mantellian Savrip", "mantellian-savrip", {
    abilityMods: { str: 4, dex: -2, con: 4, int: -4, wis: -4, cha: -4 }, size: "large", speed: 8, primitive: true, naturalWeapon: "1d6", languages: "Savrip (só fala)",
    modifiers: [mod("defenses.reflex", 2, "natural")],
    description: "<p>Humanoides grandes, longevos e territoriais de Ord Mantell, de pele grossa e garras venenosas; considerados semi-sencientes.</p>",
    traits: [
      { name: "Large Size", text: "−1 na Reflexos e −5 em Stealth." },
      { name: "Natural Armor", text: "+2 de armadura natural na Reflexos." },
      { name: "Natural Weapons", text: "Garras: 1d6 cortante; sempre armado (armas simples)." },
      { name: "Poison", text: "Garras que causam dano a um ser vivo: 1d20 + nível de personagem contra a Fortitude, −1 passo; no fim da trilha fica imobilizado, não inconsciente." },
      { name: "Primitive", text: "Não ganha Weapon Proficiency (pistolas, rifles, armas pesadas) como feats iniciais." },
      { name: "Rage", text: "1/dia, ação rápida: +2 de fúria nos ataques e dano corpo a corpo por 5 + mod. de Con rodadas; não usa perícias de paciência. Ao terminar, −1 passo persistente até descansar 10 minutos." }
    ]
  }),
  sp("Utai", "utai", {
    abilityMods: { con: 2, cha: -2 }, size: "small", speed: 4, languages: "Utapese",
    rerolls: [{ skill: "ride", keep: "second", label: "Animal Handler" }],
    description: "<p>Nativos pequenos e trabalhadores de Utapau, domadores de varactyls.</p>",
    traits: [
      { name: "Small Size", text: "+1 de tamanho na Reflexos e +5 em Stealth; carga 3/4 do normal." },
      { name: "Animal Handler", text: "Rerrola Ride (fica com o segundo resultado) e pode usar Persuasion para mudar a atitude de criaturas não domesticadas com Int 2 ou menos." },
      { name: "Cooperative", text: "Passa automaticamente ao prestar ajuda (aid another) num teste de perícia de alguém adjacente que o ouça e entenda." },
      { name: "Low-Light Vision", text: "Ignora camuflagem (não total) causada por escuridão." }
    ]
  })
];
