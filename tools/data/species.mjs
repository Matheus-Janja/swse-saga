// Espécies do Livro Básico (Cap. 2). Descrições resumidas/parafraseadas.
const A = (o = {}) => ({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0, ...o });
const sp = (name, key, o) => ({
  name, type: "species", img: o.img ?? "icons/environment/people/group.webp",
  system: {
    key, size: "medium", speed: 6, swimSpeed: 0, droid: false, primitive: false,
    bonusFeats: [], bonusFeatChoices: 0, bonusTrainedSkills: 0, conditionalFeats: [], rerolls: [],
    modifiers: [], languages: "Basic", traits: [], description: "", ...o, abilityMods: A(o.abilityMods)
  }
});
const reroll = (skill, label, keep = "second") => ({ skill, keep, label });
const cond = skill => ({ skill, feat: "skill-focus" });
const lowLight = { name: "Low-Light Vision", text: "Ignora camuflagem (mas não camuflagem total) causada por escuridão." };
const darkvision = { name: "Darkvision", text: "Ignora camuflagem, inclusive total, causada por escuridão; não distingue cores na escuridão total." };
const mod = (target, value, type = "species") => ({ target, value: String(value), type, label: "", disabled: false });

export default [
  sp("Human", "human", {
    description: "<p>Espécie dominante e versátil, presente em toda a galáxia.</p>",
    bonusTrainedSkills: 1, bonusFeatChoices: 1,
    traits: [
      { name: "Bonus Trained Skill", text: "Escolhe uma perícia treinada adicional (da lista de perícias de classe) no 1º nível." },
      { name: "Bonus Feat", text: "Recebe um feat adicional no 1º nível." }
    ]
  }),
  sp("Bothan", "bothan", {
    abilityMods: { dex: 2, con: -2 }, languages: "Basic, Bothese",
    description: "<p>Humanoides peludos de Bothawui, mestres da espionagem e da informação.</p>",
    modifiers: [mod("defenses.will", 2)], conditionalFeats: [cond("gatherInformation")],
    traits: [
      { name: "Iron Will", text: "+2 de bônus de espécie na Defesa de Vontade." },
      { name: "Conditional Bonus Feat", text: "Se treinado em Gather Information, recebe Skill Focus (Gather Information)." }
    ]
  }),
  sp("Cerean", "cerean", {
    abilityMods: { int: 2, wis: 2, dex: -2 }, languages: "Basic, Cerean",
    description: "<p>Humanoides de crânio alongado e cérebro binário, calmos e lógicos.</p>",
    rerolls: [reroll("initiative", "Intuitive Initiative")], conditionalFeats: [cond("initiative")],
    traits: [
      { name: "Intuitive Initiative", text: "Pode rerrolar testes de Initiative, ficando com o segundo resultado." },
      { name: "Conditional Bonus Feat", text: "Se treinado em Initiative, recebe Skill Focus (Initiative)." }
    ]
  }),
  sp("Duros", "duros", {
    abilityMods: { dex: 2, int: 2, con: -2 }, languages: "Basic, Durese",
    description: "<p>Espaçonautas natos, hábeis astronavegadores e pilotos.</p>",
    rerolls: [reroll("pilot", "Expert Pilot")],
    traits: [{ name: "Expert Pilot", text: "Pode rerrolar testes de Pilot, ficando com o segundo resultado." }]
  }),
  sp("Ewok", "ewok", {
    abilityMods: { dex: 2, str: -2 }, size: "small", speed: 4, primitive: true, languages: "Ewokese (apenas fala)",
    description: "<p>Pequenos nativos da lua florestal de Endor, curiosos e corajosos.</p>",
    rerolls: [reroll("stealth", "Sneaky")], conditionalFeats: [cond("survival")],
    traits: [
      { name: "Small Size", text: "+1 de tamanho na Defesa de Reflexos e +5 em Stealth; carga 3/4 do normal." },
      { name: "Primitive", text: "Não recebe Weapon Proficiency (pistols, rifles ou heavy weapons) como feat inicial." },
      { name: "Scent", text: "A até 10 quadrados ignora camuflagem e cobertura para Perception e não sofre penalidade de visibilidade ao rastrear." },
      { name: "Sneaky", text: "Pode rerrolar Stealth, ficando com o segundo resultado." },
      { name: "Conditional Bonus Feat", text: "Se treinado em Survival, recebe Skill Focus (Survival)." }
    ]
  }),
  sp("Gamorrean", "gamorrean", {
    abilityMods: { str: 2, dex: -2, int: -2 }, primitive: true, languages: "Gamorrean (fala), Basic (entende)",
    description: "<p>Brutamontes porcinos de Gamorr, valorizados como guarda-costas e capangas.</p>",
    modifiers: [mod("defenses.fortitude", 2)], bonusFeats: ["improved-damage-threshold"],
    traits: [
      { name: "Primitive", text: "Não recebe Weapon Proficiency (pistols, rifles ou heavy weapons) como feat inicial." },
      { name: "Great Fortitude", text: "+2 de bônus de espécie na Defesa de Fortitude." },
      { name: "Bonus Feat", text: "Recebe Improved Damage Threshold." }
    ]
  }),
  sp("Gungan", "gungan", {
    abilityMods: { dex: 2, int: -2, cha: -2 }, swimSpeed: 4, languages: "Basic, Gunganese",
    description: "<p>Anfíbios dos pântanos de Naboo, com tecnologia biológica.</p>",
    modifiers: [mod("defenses.reflex", 2)], rerolls: [reroll("swim", "Expert Swimmer")],
    traits: [
      { name: "Expert Swimmer", text: "Pode rerrolar Swim (segundo resultado) e pode escolher 10 em Swim mesmo sob pressão. Deslocamento de natação 4." },
      { name: "Hold Breath", text: "Prende a respiração por 25 × Constituição rodadas antes de testar Endurance." },
      { name: "Lightning Reflexes", text: "+2 de bônus de espécie na Defesa de Reflexos." },
      lowLight,
      { name: "Weapon Familiarity", text: "Trata atlatl e cesta como armas simples." }
    ]
  }),
  sp("Ithorian", "ithorian", {
    abilityMods: { wis: 2, cha: 2, dex: -2 }, languages: "Basic, Ithorese",
    description: "<p>Os pacíficos \"Cabeças-de-Martelo\", grandes ecologistas e diplomatas.</p>",
    modifiers: [mod("defenses.will", 2)], rerolls: [reroll("survival", "Survival Instinct")], conditionalFeats: [cond("knowledgeLifeSciences")],
    traits: [
      { name: "Iron Will", text: "+2 de bônus de espécie na Defesa de Vontade." },
      { name: "Bellow", text: "Ação padrão: ataque especial (1d20 + nível) contra a Fortitude de todos num cone de 6 quadrados; 3d6 de dano sônico (metade se errar). Cada uso move o Ithorian −1 passo na trilha de condição; pode adicionar d6 extras ao custo de −1 passo cada." },
      { name: "Survival Instinct", text: "Pode rerrolar Survival, ficando com o segundo resultado." },
      { name: "Conditional Bonus Feat", text: "Se treinado em Knowledge (life sciences), recebe Skill Focus nessa perícia." }
    ]
  }),
  sp("Kel Dor", "kel-dor", {
    abilityMods: { dex: 2, wis: 2, con: -2 }, languages: "Basic, Kel Dor",
    description: "<p>Nativos de Dorin; precisam de máscara antioxigênio e óculos fora de seu mundo.</p>",
    rerolls: [reroll("useTheForce", "Keen Force Sense (Search/Sense)", "best")],
    traits: [
      { name: "Keen Force Sense", text: "Pode rerrolar Use the Force para buscar sentimentos ou sentir a Força, ficando com o melhor." },
      lowLight,
      { name: "Special Equipment", text: "Sem óculos é considerado cego; sem máscara começa a sufocar. Começa com ambos sem custo." }
    ]
  }),
  sp("Mon Calamari", "mon-calamari", {
    abilityMods: { int: 2, wis: 2, con: -2 }, swimSpeed: 4, languages: "Basic, Mon Calamarian",
    description: "<p>Anfíbios idealistas, renomados engenheiros navais.</p>",
    rerolls: [reroll("swim", "Expert Swimmer")], conditionalFeats: [cond("perception")],
    traits: [
      { name: "Breathe Underwater", text: "Não se afoga na água." },
      { name: "Expert Swimmer", text: "Pode rerrolar Swim (segundo resultado) e escolher 10 sob pressão. Deslocamento de natação 4." },
      lowLight,
      { name: "Conditional Bonus Feat", text: "Se treinado em Perception, recebe Skill Focus (Perception)." }
    ]
  }),
  sp("Quarren", "quarren", {
    abilityMods: { con: 2, wis: -2, cha: -2 }, swimSpeed: 4, languages: "Basic, Quarrenese",
    description: "<p>Os \"cabeças de lula\" de Mon Calamari, práticos e conservadores.</p>",
    rerolls: [reroll("swim", "Expert Swimmer")], conditionalFeats: [cond("persuasion")],
    traits: [
      { name: "Breathe Underwater", text: "Não se afoga na água." },
      { name: "Expert Swimmer", text: "Pode rerrolar Swim (segundo resultado) e escolher 10 sob pressão. Deslocamento de natação 4." },
      lowLight,
      { name: "Conditional Bonus Feat", text: "Se treinado em Persuasion, recebe Skill Focus (Persuasion)." }
    ]
  }),
  sp("Rodian", "rodian", {
    abilityMods: { dex: 2, wis: -2, cha: -2 }, languages: "Basic, Rodese",
    description: "<p>Caçadores natos de Rodia; muitos se tornam caçadores de recompensas.</p>",
    rerolls: [reroll("perception", "Heightened Awareness")], conditionalFeats: [cond("survival")],
    traits: [
      { name: "Heightened Awareness", text: "Pode rerrolar Perception, ficando com o segundo resultado." },
      lowLight,
      { name: "Conditional Bonus Feat", text: "Se treinado em Survival, recebe Skill Focus (Survival)." }
    ]
  }),
  sp("Sullustan", "sullustan", {
    abilityMods: { dex: 2, con: -2 }, languages: "Basic, Sullustese",
    description: "<p>Habitantes das cavernas de Sullust, ótimos pilotos e navegadores.</p>",
    rerolls: [reroll("perception", "Heightened Awareness")],
    traits: [
      darkvision,
      { name: "Expert Climber", text: "Pode escolher 10 em Climb mesmo sob pressão." },
      { name: "Heightened Awareness", text: "Pode rerrolar Perception, ficando com o segundo resultado." }
    ]
  }),
  sp("Trandoshan", "trandoshan", {
    abilityMods: { str: 2, dex: -2 }, languages: "Basic, Dosh",
    description: "<p>Répteis caçadores de Trandosha, rivais tradicionais dos Wookiees.</p>",
    modifiers: [mod("defenses.reflex", 1, "natural")], bonusFeats: ["toughness"],
    traits: [
      darkvision,
      { name: "Limb Regeneration", text: "Regenera um membro perdido em 1d10 dias." },
      { name: "Natural Armor", text: "+1 de armadura natural na Defesa de Reflexos (acumula com armadura)." },
      { name: "Bonus Feat", text: "Recebe Toughness." }
    ]
  }),
  sp("Twi'lek", "twilek", {
    abilityMods: { cha: 2, wis: -2 }, languages: "Basic, Ryl",
    description: "<p>Humanoides de Ryloth com tentáculos cefálicos (lekku), carismáticos e pragmáticos.</p>",
    modifiers: [mod("defenses.fortitude", 2)], rerolls: [reroll("deception", "Deceptive")],
    traits: [
      { name: "Deceptive", text: "Pode rerrolar Deception, ficando com o segundo resultado." },
      { name: "Great Fortitude", text: "+2 de bônus de espécie na Defesa de Fortitude." },
      lowLight
    ]
  }),
  sp("Wookiee", "wookiee", {
    abilityMods: { str: 4, con: 2, dex: -2, wis: -2, cha: -2 }, languages: "Shyriiwook (fala), Basic (entende)",
    description: "<p>Gigantes peludos de Kashyyyk, honrados, leais e de pavio curto.</p>",
    rerolls: [reroll("persuasion", "Intimidate (Persuasion)")],
    traits: [
      { name: "Extraordinary Recuperation", text: "Recupera pontos de vida pelo descanso natural no dobro da taxa normal." },
      { name: "Rage", text: "1/dia, ação rápida: +2 de fúria em ataques e dano corpo a corpo por 5 + mod. Con rodadas; não pode usar perícias de paciência/concentração. Ao fim, −1 passo persistente na trilha de condição até descansar 10 minutos." },
      { name: "Weapon Familiarity", text: "Trata bowcasters como rifles." },
      { name: "Skills", text: "Pode escolher 10 em Climb sob pressão e rerrolar Persuasion para intimidar (segundo resultado)." }
    ]
  }),
  sp("Zabrak", "zabrak", {
    languages: "Basic, Zabrak",
    description: "<p>Humanoides com chifres vestigiais, determinados e autoconfiantes.</p>",
    modifiers: [mod("defenses.all", 1)], rerolls: [reroll("perception", "Heightened Awareness")],
    traits: [
      { name: "Heightened Awareness", text: "Pode rerrolar Perception, ficando com o segundo resultado." },
      { name: "Superior Defenses", text: "+1 de bônus de espécie em todas as Defesas." }
    ]
  })
];
