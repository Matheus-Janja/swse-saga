// Scum and Villainy — Cap. 1: espécies. Descrições resumidas.
const SRC = "Scum and Villainy";
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
const reroll = (skill, label, keep = "second") => ({ skill, keep, label });
const cond = skill => ({ skill, feat: "skill-focus" });
const mod = (target, value, type = "species") => ({ target, value: String(value), type, label: "", disabled: false });
const darkvision = { name: "Darkvision", text: "Ignora camuflagem (inclusive total) causada por escuridão; não distingue cores na escuridão total." };
const small = { name: "Small Size", text: "+1 de tamanho na Defesa de Reflexos e +5 em Stealth; carga 3/4 do normal." };

export default [
  sp("Blood Carver", "blood-carver", {
    abilityMods: { dex: 2, wis: -2, cha: -2 }, languages: "Basic, Batorese", conditionalFeats: [cond("acrobatics")],
    description: "<p>Humanoides esguios de Batorine, de pele dourada, temidos como assassinos.</p>",
    traits: [
      { name: "Conditional Bonus Feat", text: "Se treinado em Acrobatics, recebe Skill Focus (Acrobatics)." },
      { name: "Deathstrike", text: "Ataque corpo a corpo contra oponente sem bônus de Destreza na Reflexos causa +1 dado de dano se acertar. (Automático com a opção Alvo surpreso.)" }
    ]
  }),
  sp("Clawdite", "clawdite", {
    abilityMods: { str: -2, cha: 2 }, languages: "Basic, Clawdite",
    description: "<p>Metamorfos de Zolan, frágeis porém mestres em mudar a aparência.</p>",
    traits: [
      { name: "Shapeshift", text: "Muda a aparência (Deception para aparência enganosa) com +10 de espécie e pode se disfarçar como ação de rodada completa sem penalidade." },
      { name: "Startle", text: "1/encontro, reação ao ser atacado: Deception contra a Vontade do atacante; se vencer, ele sofre −5 nessa jogada de ataque." }
    ]
  }),
  sp("Falleen", "falleen", {
    abilityMods: { wis: -2, cha: 2 }, languages: "Basic, Falleen",
    description: "<p>Reptilianos de grande magnetismo, capazes de emitir feromônios que manipulam outros seres.</p>",
    traits: [
      { name: "Hold Breath", text: "Prende a respiração por 25 × Constituição rodadas antes de testar Endurance." },
      { name: "Pheromones", text: "Ação padrão: ataque especial (nível de personagem + mod. de Carisma) contra a Fortitude de um alvo adjacente; se acertar, ele desce −1 passo; se falhar, o alvo fica imune por 24 h. Ao chegar a −5 passos, em vez de inconsciente, a atitude dele melhora para amistosa. Veneno inalado. (Botão ⚡ na ficha.)" },
      { name: "Pheromone Acclimation", text: "+5 de espécie na Fortitude contra feromônios de outros Falleen." }
    ]
  }),
  sp("Gand", "gand", {
    abilityMods: { wis: 2, cha: -2 }, languages: "Gand",
    description: "<p>Insetoides de Gand, caçadores e rastreadores lendários (os \"findsmen\").</p>",
    traits: [
      darkvision,
      { name: "Hardy", text: "Ao usar o second wind, recupera mais 5 + nível de personagem PV (automático)." },
      { name: "Special Equipment", text: "Fora de Gand precisa de aparelho respiratório (2.000 cr; filtros 200 cr/ano) e de tradutor (100 cr). Começa com eles." },
      { name: "Limb Regeneration", text: "Regenera um membro perdido em 1d10 dias." }
    ]
  }),
  sp("Jawa", "jawa", {
    abilityMods: { str: -2, dex: 2 }, size: "small", speed: 4, languages: "Jawa, Jawa Trade Language",
    rerolls: [reroll("survival", "Desert Dweller", "best")],
    description: "<p>Pequenos catadores encapuzados de Tatooine, comerciantes de sucata e droides.</p>",
    traits: [
      small, darkvision,
      { name: "Desert Dweller", text: "Pode rerrolar Survival contra calor extremo, ficando com o melhor." },
      { name: "Scavenger", text: "Armado com arma iônica, ao ferir um droide ou veículo soma metade do nível ao dano iônico. (Automático.)" }
    ]
  }),
  sp("Ryn", "ryn", {
    abilityMods: { cha: 2 }, languages: "Basic, Ryn",
    rerolls: [reroll("deception", "Musical Beak", "best")],
    description: "<p>Nômades artistas e videntes, de bico musical e cauda preênsil.</p>",
    traits: [
      { name: "Musical Beak", text: "Ao usar o bico para imitar sons ou transmitir informação enganosa, rerrola Deception (fica com o melhor); projeta a voz até 10 quadrados (ventriloquismo como ação rápida para criar uma distração)." },
      { name: "Prehensile Tail", text: "Segura (não empunha) com a cauda um objeto Pequeno ou menor; com algo Médio ou maior fica sobrecarregado." },
      { name: "Connections", text: "Ao usar Gather Information para notícias ou informações secretas, pode dispensar o custo em créditos; se falhar, paga normalmente." }
    ]
  }),
  sp("Toydarian", "toydarian", {
    abilityMods: { str: -2, wis: 2 }, size: "small", speed: 4, languages: "Huttese, Toydarian", conditionalFeats: [cond("deception")],
    description: "<p>Alados barrigudos de Toydaria, negociantes astutos e resistentes a truques mentais.</p>",
    traits: [
      small,
      { name: "Speed", text: "4 quadrados; voo 6 (pode pairar; altitude máxima 2 quadrados)." },
      { name: "Conditional Bonus Feat", text: "Se treinado em Deception, recebe Skill Focus (Deception)." },
      { name: "Force Resistance", text: "+5 de espécie na Vontade contra Use the Force com o descritor [mind-affecting]." }
    ]
  }),
  sp("Ubese", "ubese", {
    abilityMods: { con: -2, dex: 2 }, languages: "Basic, Ubeninal, Ubese", conditionalFeats: [cond("perception")],
    rerolls: [reroll("survival", "Survival Instinct")],
    description: "<p>Nômades de Uba IV, de rosto sempre oculto por trajes ambientais, mercenários e caçadores de recompensa.</p>",
    traits: [
      { name: "Aggressive", text: "Ao acertar um ataque de investida, o +2 de investida contra aquele alvo continua até o fim do encontro." },
      { name: "Survival Instinct", text: "Pode rerrolar Survival, ficando com o segundo resultado." },
      { name: "Conditional Bonus Feat", text: "Se treinado em Perception, recebe Skill Focus (Perception)." },
      { name: "Special Equipment", text: "Precisa de máscara respiratória fora de Uba; o traje ambiental (2.000 cr, filtros 200 cr/ano) dá +2 de equipamento na Fortitude e modulador de voz. Começa com ele." }
    ]
  })
];
