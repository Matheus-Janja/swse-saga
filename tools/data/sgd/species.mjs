// Scavenger's Guide to Droids — Cap. 1: chassis de droide padrão (Opção 3), usados como "espécies" de droide herói.
const A = (o = {}) => ({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0, ...o });
const DROID = "Imunidades e traços de droide (Livro Básico, p.187-188): sem Constituição, não vivo, vulnerável a íon, manutenção, memória reprogramável.";
const ch = (name, key, degree, o) => ({
  name: `Chassi: ${name}`, type: "species", img: "icons/environment/people/group.webp", folder: "Droides (heróis)",
  system: {
    key, size: "medium", speed: 6, swimSpeed: 0, droid: true, droidDegree: degree, primitive: false,
    bonusFeats: [], bonusFeatChoices: 0, bonusTrainedSkills: 0, conditionalFeats: [], rerolls: [], modifiers: [], autoTrained: [],
    languages: "Basic e Binary", naturalWeapon: "", source: "Scavenger's Guide to Droids",
    ...o, abilityMods: A(o.abilityMods),
    description: `<p>Chassi de droide padrão de ${degree}º grau (Scavenger's Guide to Droids, Opção 3): funciona como uma espécie. O tamanho e o deslocamento não podem ser alterados sem aprovação do Mestre.</p>`,
    traits: [
      { name: `Droide de ${degree}º grau`, text: DROID },
      { name: "Bonus Equipment", text: `Sistemas incluídos (adicione-os do compêndio Sistemas de Droide; não gastam créditos): ${o.equipment}.` },
      ...o.traits
    ]
  }
});

export default [
  ch("Astromech Droid", "chassis-astromech", 2, {
    abilityMods: { int: 2, cha: -2 }, size: "small", autoTrained: ["mechanics"], languages: "Basic (só entende) e Binary",
    conditionalFeats: [{ skill: "mechanics", feat: "skill-focus" }, { skill: "useComputer", feat: "skill-focus" }],
    equipment: "locomoção por rodas, locomoção andando (4 quadrados), pés magnéticos, processador heurístico, 6 apêndices de ferramenta, 1 garra, memória de astrogação (5 unidades), pacote de diagnóstico, armazenamento interno (2 kg)",
    traits: [
      { name: "Tamanho Pequeno", text: "+1 de tamanho em Reflexos e +5 em Stealth; carga 3/4. Deslocamento 6 (rodas), 4 andando." },
      { name: "Hardwired Design (Mechanics)", text: "Treinado em Mechanics (perícia treinada bônus, automático)." },
      { name: "Conditional Bonus Feat", text: "Treinado em Mechanics ou Use Computer: Skill Focus (Mechanics) ou (Use Computer) como feat bônus." }
    ]
  }),
  ch("Battle Droid", "chassis-battle", 4, {
    abilityMods: { dex: 2, int: -2 }, bonusFeatChoices: 2,
    bonusFeatList: ["armor-proficiency-light", "armor-proficiency-medium", "armor-proficiency-heavy", "weapon-proficiency-simple", "weapon-proficiency-pistols", "weapon-proficiency-rifles", "weapon-proficiency-heavy", "weapon-proficiency-advanced-melee", "weapon-proficiency-lightsabers", "exotic-weapon-proficiency"],
    equipment: "locomoção andando, carapaça de plasteel (+2), processador básico, comlink interno, acesso travado, 2 mãos, vocabulador",
    traits: [{ name: "Bonus Feats", text: "No 1º nível, escolhe um feat de Armor Proficiency e um de Weapon Proficiency cujos pré-requisitos cumpra (as 2 escolhas de feat bônus da espécie mostram só esses feats)." }]
  }),
  ch("Labor Droid", "chassis-labor", 5, {
    abilityMods: { str: 2, int: -2 },
    rerolls: ["climb", "jump", "swim"].map(skill => ({ skill, keep: "best", label: "Heavy Lifting" })),
    equipment: "locomoção andando, carapaça de durasteel (+4), processador básico, 2 garras, vocabulador",
    traits: [{ name: "Heavy Lifting", text: "Pode rerrolar testes de Força e de perícias baseadas em Força, ficando com qualquer um dos resultados (rerrolagem automática nas perícias)." }]
  }),
  ch("Mechanic Droid", "chassis-mechanic", 2, {
    abilityMods: { int: 2, cha: -2 }, autoTrained: ["mechanics"], rerolls: [{ skill: "mechanics", keep: "second", label: "Mechanically Minded" }],
    equipment: "locomoção andando (ou esteiras ou rodas), processador básico, 2 mãos, 4 apêndices de ferramenta, pacote de diagnóstico, armazenamento interno (2 kg), vocabulador",
    traits: [
      { name: "Hardwired Design (Mechanics)", text: "Treinado em Mechanics (automático)." },
      { name: "Mechanically Minded", text: "Pode rerrolar qualquer teste de Mechanics." }
    ]
  }),
  ch("Medical Droid", "chassis-medical", 1, {
    abilityMods: { int: 2, str: -2 }, autoTrained: ["treatInjury"],
    conditionalFeats: [{ skill: "treatInjury", feat: "skill-focus" }, { skill: "knowledgeLifeSciences", feat: "skill-focus" }],
    equipment: "locomoção andando, processador heurístico, 2 mãos, 1 apêndice de ferramenta, vocabulador, pacote sensorial aprimorado",
    traits: [
      { name: "Hardwired Design (Treat Injury)", text: "Treinado em Treat Injury (automático)." },
      { name: "Conditional Bonus Feat", text: "Treinado em Treat Injury ou Knowledge (life sciences): Skill Focus numa delas (só uma)." }
    ]
  }),
  ch("Probe Droid", "chassis-probe", 4, {
    abilityMods: { wis: 2, cha: -2 }, autoTrained: ["perception"], languages: "Basic (só entende) e Binary",
    conditionalFeats: [{ skill: "stealth", feat: "skill-focus" }, { skill: "perception", feat: "skill-focus" }],
    equipment: "locomoção por flutuação, processador heurístico, comlink interno, acesso travado, 1 mão, 1 apêndice de ferramenta, pacote sensorial aprimorado, darkvision",
    traits: [
      { name: "Hardwired Design (Perception)", text: "Treinado em Perception (automático)." },
      { name: "Conditional Bonus Feat", text: "Treinado em Stealth ou Perception: Skill Focus numa delas (só uma)." }
    ]
  }),
  ch("Protocol Droid", "chassis-protocol", 3, {
    abilityMods: { wis: 2, cha: 2, dex: -2 }, autoTrained: ["persuasion"], bonusFeatChoices: 1, bonusFeatList: ["skill-training"],
    equipment: "locomoção andando, processador básico, 2 mãos, vocabulador, tradutor (CD 10)",
    traits: [
      { name: "Hardwired Design (Persuasion)", text: "Treinado em Persuasion (automático)." },
      { name: "Bonus Feat", text: "Skill Training em Knowledge (bureaucracy), (galactic lore) ou (social sciences) — use a escolha de feat bônus da espécie." }
    ]
  }),
  ch("Service Droid", "chassis-service", 3, {
    abilityMods: { cha: 2, str: -2 }, bonusFeatChoices: 1, bonusFeatList: ["skill-training"],
    equipment: "locomoção andando, processador básico, 2 mãos, 1 suporte de ferramenta, vocabulador",
    traits: [{ name: "Bonus Feat", text: "Skill Training em Perception, Knowledge (bureaucracy) ou Knowledge (galactic lore) — use a escolha de feat bônus da espécie." }]
  })
];
