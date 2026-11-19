// Scavenger's Guide to Droids — Cap. 1: feats (Tabela 1-3). Quase todos exigem ser droide.
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
const feat = (name, key, benefit, pre = {}, o = {}) => ({
  name, type: "feat", img: o.img ?? "icons/commodities/tech/cog-steel-grey.webp",
  system: {
    key, description: `<p>${benefit}</p>`, source: "Scavenger's Guide to Droids",
    prerequisites: P(pre), choice: { type: o.choice ?? "", value: o.value ?? "", options: [] },
    repeatable: !!o.repeatable, modifiers: o.modifiers ?? [], grantedBy: ""
  },
  folder: "Scavenger's Guide to Droids"
});
const D = (text, o = {}) => ({ text: `Droide${text ? `, ${text}` : ""}`, droidOnly: true, ...o });

export default [
  feat("Aiming Accuracy", "aiming-accuracy", "Mirando como ação de rodada completa (em vez de duas rápidas), recebe +5 no próximo ataque com a arma contra o alvo na rodada seguinte, se ele continuar na linha de visão. (Opção no diálogo de ataque.)", D("Point Blank Shot, Precise Shot, proficiente com a arma", { feats: ["point-blank-shot", "precise-shot"] })),
  feat("Damage Conversion", "damage-conversion", "Quando um ataque que não seja de área, de íons ou da Força causa dano igual ou maior que o Limiar, pode sofrer 10 PV adicionais em vez de descer na trilha de condição; cada uso seguinte no encontro aumenta o dano extra em 5. (Opção no aplicar dano.)", D("Des 13", { abilities: { dex: 13 } })),
  feat("Distracting Droid", "distracting-droid", "Ação padrão: Persuasion contra a Vontade de todos os inimigos a até 6 quadrados que o vejam ou ouçam; se igualar ou superar, o inimigo perde uma ação de movimento no próximo turno; se superar por 10+, também fica surpreso até o início do seu próximo turno (afeta a mente). (Botão ⚡.)", D("")),
  feat("Droid Focus", "droid-focus", "Escolha um grau de droide (1º a 5º): +1 em Deception, Mechanics, Perception, Persuasion e Use Computer usados com ou contra droides desse grau, e +1 em todas as Defesas contra ataques e perícias de droides desse grau. Repetível (outro grau).", { text: "Treinado em Mechanics e Use Computer", trained: ["mechanics", "useComputer"] }, { repeatable: true, img: "icons/skills/targeting/crosshair-pointed-orange.webp" }),
  feat("Droid Shield Mastery", "droid-shield-mastery", "Sucesso automático nos testes de Endurance para restaurar o escudo (+5 até o máximo), e restaura com duas ações rápidas em vez de três.", D("com gerador de escudo")),
  feat("Erratic Target", "erratic-target", "Pode reduzir o deslocamento em até 2 quadrados para somar +1 de esquiva por quadrado (contra o alvo do Dodge) até o início do próximo turno; precisa mover ao menos 2 quadrados. (Botão ⚡.)", D("com locomoção por flutuação ou voo, Des 13, Dodge", { abilities: { dex: 13 }, feats: ["dodge"], locomotion: ["hovering", "flying"] })),
  feat("Ion Shielding", "ion-shielding", "Quando dano de íons (antes de dividir) iguala ou supera o Limiar, desce só −1 passo na trilha (em vez de −2). (Automático.)", { text: "Droide com For 13, ou ciborgue com Con 13" }),
  feat("Logic Upgrade: Skill Swap", "logic-upgrade-skill-swap", "Escolha uma perícia em que não é treinado (exceto Use the Force): rodada completa para trocar uma perícia treinada por ela (sem as aplicações só de treinados nem bônus nela). Repetível.", D("com processador básico"), { repeatable: true, choice: "skill" }),
  feat("Mechanical Martial Arts", "mechanical-martial-arts", "Ao causar dano a um inimigo com ataque desarmado, ele sofre −5 nos ataques e no dano corpo a corpo até o início do seu próximo turno (ataque de oportunidade: até o início do próximo turno dele). (Automático: o efeito acompanha o botão de dano.)", D("Martial Arts I, BBA +1", { feats: ["martial-arts-i"], bab: 1 })),
  feat("Multi-Targeting", "multi-targeting", "Pode dividir a ação de mirar por várias rodadas consecutivas (sem perder o benefício).", D("Int 13, proficiente com a arma", { abilities: { int: 13 } })),
  feat("Pincer", "pincer", "Mantém o Pin e faz os testes de agarrão seguintes como ação rápida, aplicando Crush a cada um.", D("com garra ou mão, BBA +1, Pin, Crush", { bab: 1, feats: ["pin", "crush"] })),
  feat("Pinpoint Accuracy", "pinpoint-accuracy", "Ao usar Aiming Accuracy, o alvo ferido desce −1 passo na trilha de condição e não pode usar a ação de recuperar-se até o fim do próximo turno dele. (Automático com a opção Aiming Accuracy.)", D("Aiming Accuracy, Point Blank Shot, Precise Shot, proficiente com a arma", { feats: ["aiming-accuracy", "point-blank-shot", "precise-shot"] })),
  feat("Sensor Link", "sensor-link", "Ação rápida: transmite seus sensores a um aliado droide, comlink ou receptor a até 24 quadrados; ele sabe o que você percebe e pode ajudar em Perception sem linha de visão. Se ambos tiverem Sensor Link, +2 em Perception.", { text: "Droide ou ciborgue com o equipamento necessário" }),
  feat("Shield Surge", "shield-surge", "Reação: quando o veículo conectado sofre dano acima do SR, reduz o dano em até o SR restante; o SR cai 1 por ponto reduzido. Recarregar escudos fica indisponível por uma rodada.", { text: "Droide ou ciborgue com scomp link, treinado em Mechanics", trained: ["mechanics"] }),
  feat("Slammer", "slammer", "Ação padrão: bate dois apêndices contra o inimigo num ataque desarmado que soma o dobro do bônus de Força ao dano; se exceder o Limiar, o alvo fica com condição persistente (8 h de descanso ou Treat Injury CD 20). Com Crush, +1 dado. (Opção no diálogo de ataque desarmado.)", D("Pequeno ou maior, dois apêndices adequados, For 13", { abilities: { str: 13 } })),
  feat("Tool Frenzy", "tool-frenzy", "Ação padrão: um ataque desarmado com +2 usando todos os apêndices (dano do maior apêndice); −2 na Reflexos até o fim do seu próximo turno. (Botão ⚡ aplica a penalidade.)", D("Pequeno ou maior, dois apêndices com ferramentas")),
  feat("Turn and Burn", "turn-and-burn", "Ao fazer withdraw, livra até 2 quadrados ameaçados sem provocar e move o deslocamento inteiro; com um Ponto da Força, faz withdraw como reação quando um inimigo termina adjacente.", D("com flutuação, voo, rodas ou esteiras, Des 13", { abilities: { dex: 13 }, locomotion: ["hovering", "flying", "wheeled", "tracked"] }))
];
