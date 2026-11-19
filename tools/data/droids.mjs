// Droides heróis (Cap. 11): "espécies" por grau e tamanho, sistemas (Tabelas 11-3 a 11-5) e armaduras embutidas (11-6).
const A = (o = {}) => ({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0, ...o });
const add = (a, b) => Object.fromEntries([...new Set([...Object.keys(a), ...Object.keys(b)])].map(k => [k, (a[k] || 0) + (b[k] || 0)]));

const DEGREES = [
  { n: 1, mods: { int: 2, wis: 2, str: -2 }, roles: "médicos e científicos" },
  { n: 2, mods: { int: 2, cha: -2 }, roles: "astromecânicos e técnicos" },
  { n: 3, mods: { wis: 2, cha: 2, str: -2 }, roles: "protocolo e serviço" },
  { n: 4, mods: { dex: 2, int: -2, cha: -2 }, roles: "combate e segurança" },
  { n: 5, mods: { str: 4, int: -4, cha: -4 }, roles: "trabalho e utilidade" }
];

const TRAITS = [
  { name: "Sem Constituição", text: "Droides não têm Constituição: não somam Con aos PV e usam Força na Defesa de Fortitude (automático)." },
  { name: "Não vivo", text: "Imunes a veneno, doença, radiação, riscos atmosféricos não corrosivos, vácuo, efeitos de afetar a mente, atordoamento e efeitos que só afetam seres vivos. Não podem pegar Force Sensitivity nem usar a Força." },
  { name: "Vulnerável a íon", text: "Dano iônico afeta droides como o atordoamento afeta seres vivos (automático no dano)." },
  { name: "Desativado ou destruído", text: "A 0 PV o droide fica desativado; se o ataque também exceder o Limiar de Dano, é destruído. Só recupera PV com reparos (Mechanics; −5 para reparar a si mesmo)." },
  { name: "Inibidores comportamentais", text: "Não pode ferir intencionalmente um ser senciente nem permitir que seja ferido (exceto droides de 4º grau) e obedece a seus donos. O processador heurístico permite interpretar ordens com criatividade." },
  { name: "Manutenção", text: "Após 100 horas de operação precisa desligar e recarregar por 1 hora; caso contrário, testes de Endurance a cada hora (CD 10, +1 por hora) ou −1 passo persistente na trilha de condição." },
  { name: "Memória", text: "Perícias treinadas, feats e talentos podem ser reprogramados com Use Computer. Idiomas automáticos: Binary e mais um à escolha." }
];

const species = [];
for (const d of DEGREES) {
  for (const size of ["medium", "small"]) {
    const small = size === "small";
    species.push({
      name: `Droide de ${d.n}º Grau (${small ? "Pequeno" : "Médio"})`, type: "species",
      folder: "Droides (heróis)",
      system: {
        key: `droid-${d.n}-${size}`, size, speed: small ? 4 : 6, swimSpeed: 0, droid: true, droidDegree: d.n, primitive: false,
        bonusFeats: [], bonusFeatChoices: 0, bonusTrainedSkills: 0, conditionalFeats: [], rerolls: [], modifiers: [],
        languages: "Binary + 1 idioma", source: "Saga Edition Core Rulebook",
        abilityMods: A(add(d.mods, small ? { dex: 2, str: -2 } : {})),
        description: `<p>Droide herói de ${d.n}º grau (funções típicas: ${d.roles}). Não pode ter níveis de Jedi.</p>`,
        traits: [
          { name: `${d.n}º grau`, text: `Modificadores de grau já aplicados${small ? " junto com os de tamanho Pequeno (+2 Des, −2 For)" : ""}.` },
          ...(small ? [{ name: "Tamanho Pequeno", text: "+1 em Reflexos, +5 em Stealth, carga 3/4; começa com locomoção por esteiras (deslocamento 4)." }]
            : [{ name: "Tamanho Médio", text: "Começa com locomoção andando (deslocamento 6)." }]),
          ...TRAITS
        ]
      }
    });
  }
}

/* -------- Sistemas -------- */
const S = (name, key, category, o = {}) => ({
  name, type: "droidSystem", folder: o.folder,
  system: {
    key, category, costMode: o.mode ?? "flat", costBase: o.cost ?? 0, minSize: o.min ?? "", cost: 0,
    weight: o.weight ?? 0, quantity: 1, availability: o.avail ?? "", equipped: true,
    locomotion: { type: o.loco?.type ?? "", small: o.loco?.[0] ?? 0, medium: o.loco?.[1] ?? 0, large: o.loco?.[2] ?? 0, mult: o.loco?.mult ?? 0 },
    appendage: o.app ?? "", shieldRating: o.sr ?? 0, rerolls: o.rerolls ?? [], modifiers: o.mods ?? [], special: o.special ?? "",
    description: `<p>${o.desc ?? ""}</p>`, source: "Saga Edition Core Rulebook"
  }
});
const loco = (type, speeds, mult) => Object.assign([...speeds], { type, mult });
const mod = (target, value, type = "equipment") => ({ target, value: String(value), type, label: "", disabled: false });
const F = {
  loco: "Locomoção", app: "Apêndices", proc: "Processadores", sens: "Sensores", comm: "Comunicação",
  shield: "Escudos", trans: "Tradutores", store: "Armazenamento", hard: "Sistemas Endurecidos", acc: "Acessórios", armor: "Armaduras de Droide"
};

const systems = [
  // Locomoção (Tabela 11-3). Custo = multiplicador × fator de custo × deslocamento², + sobretaxa por sistema adicional
  S("Locomoção: Andando", "walking-locomotion", "locomotion", { folder: F.loco, mode: "locomotion", loco: loco("walking", [4, 6, 8], 10), desc: "Pernas e pés; sofre as penalidades normais de terreno difícil." }),
  S("Locomoção: Rodas", "wheeled-locomotion", "locomotion", { folder: F.loco, mode: "locomotion", loco: loco("wheeled", [6, 8, 10], 5), desc: "Não pode usar Climb; penalidades de terreno difícil dobradas." }),
  S("Locomoção: Esteiras", "tracked-locomotion", "locomotion", { folder: F.loco, mode: "locomotion", loco: loco("tracked", [4, 6, 8], 20), desc: "Ignora as penalidades de terreno difícil; −5 em Climb." }),
  S("Locomoção: Flutuação", "hovering-locomotion", "locomotion", { folder: F.loco, mode: "locomotion", loco: loco("hovering", [6, 6, 6], 100), desc: "Repulsores a até 3 m do chão; ignora terreno difícil." }),
  S("Locomoção: Voo", "flying-locomotion", "locomotion", { folder: F.loco, mode: "locomotion", loco: loco("flying", [9, 12, 12], 200), desc: "Não é impedido por nenhum tipo de terreno." }),
  S("Garras de Escalada", "climbing-claws", "locoExtra", { folder: F.loco, mode: "locoExtra", desc: "Requer locomoção andando. Escalada com metade do deslocamento; pode rerrolar Climb (fica com o melhor) e escolher 10 sob pressão.", rerolls: [{ skill: "climb", keep: "best", label: "Garras de Escalada" }] }),
  S("Pernas Extras", "extra-legs", "locoExtra", { folder: F.loco, mode: "locoExtra", desc: "Requer locomoção andando. Carga +50% e +5 de estabilidade contra ser derrubado." }),
  S("Servos de Salto", "jump-servos", "locoExtra", { folder: F.loco, mode: "locoExtra", desc: "Requer locomoção andando. Todos os saltos contam como com corrida; pode rerrolar Jump (fica com o melhor) e escolher 10 sob pressão.", rerolls: [{ skill: "jump", keep: "best", label: "Servos de Salto" }] }),
  S("Pés Magnéticos", "magnetic-feet", "locoExtra", { folder: F.loco, mode: "locoExtra", desc: "Requer locomoção andando, rodas ou esteiras. Fixa-se ao casco de naves, mesmo em alta velocidade." }),
  // Apêndices (Tabela 11-5)
  S("Apêndice: Sonda", "probe-appendage", "appendage", { folder: F.app, mode: "factor", cost: 2, app: "probe", desc: "Só empurra ou puxa objetos." }),
  S("Apêndice: Instrumento", "instrument-appendage", "appendage", { folder: F.app, mode: "factor", cost: 5, app: "instrument", desc: "Projetado para uma tarefa específica; carga como se a Força fosse 1/4." }),
  S("Apêndice: Ferramenta", "tool-appendage", "appendage", { folder: F.app, mode: "factor", cost: 10, app: "tool", desc: "Des CD 15 para manipular objetos para os quais não foi projetada. Armas montadas em droides são apêndices de ferramenta." }),
  S("Apêndice: Garra", "claw-appendage", "appendage", { folder: F.app, mode: "factor", cost: 20, app: "claw", desc: "Segura objetos; tarefas que exigem mão verdadeira pedem Des CD 15. Melhor dano desarmado (Tabela 11-4)." }),
  S("Apêndice: Mão", "hand-appendage", "appendage", { folder: F.app, mode: "factor", cost: 50, app: "hand", desc: "Mão verdadeira (ao menos três dedos, um opositor)." }),
  S("Apêndice Telescópico", "telescopic-appendage", "appendage", { folder: F.app, mode: "factor", cost: 100, desc: "Alcance dobrado (Médio: 2 quadrados). Custo = dobro do apêndice (padrão: mão)." }),
  // Processadores
  S("Processador Básico", "basic-processor", "processor", { folder: F.proc, desc: "Segue instruções literalmente; sem treino só usa Acrobatics, Climb, Jump e Perception (automático); não usa armas sem proficiência." }),
  S("Processador Heurístico", "heuristic-processor", "processor", { folder: F.proc, cost: 2000, weight: 5, desc: "Raciocínio criativo: usa perícias sem treino e armas sem proficiência (−5), e interpreta os inibidores comportamentais." }),
  S("Processador Remoto (5 km)", "remote-processor-5", "processor", { folder: F.proc, cost: 1000, weight: 10, desc: "Controla droides com receptor remoto (−2 na Destreza dos droides controlados)." }),
  S("Processador Remoto (50 km)", "remote-processor-50", "processor", { folder: F.proc, cost: 10000, weight: 100 }),
  S("Processador Remoto (500 km)", "remote-processor-500", "processor", { folder: F.proc, cost: 100000, weight: 1000, avail: "military" }),
  S("Processador Remoto (5.000 km)", "remote-processor-5000", "processor", { folder: F.proc, cost: 1000000, weight: 10000, avail: "military" }),
  S("Receptor Remoto", "remote-receiver", "processor", { folder: F.proc, cost: -500, weight: 1, desc: "Recebe ordens de um processador remoto (não disponível para heróis)." }),
  S("Processador Reserva", "backup-processor", "processor", { folder: F.proc, cost: 100, desc: "Mantém o droide funcionando se perder contato com o processador remoto." }),
  S("Circuitos de Fogo Sincronizado", "synchronized-fire-circuits", "processor", { folder: F.proc, cost: 150, weight: 1, avail: "military", desc: "Ao ajudar outro droide do mesmo processador remoto, concede +5 (errata) em vez de +2." }),
  S("Parafuso de Contenção", "restraining-bolt", "accessory", { folder: F.acc, cost: 5, desc: "Desliga os impulsos motores quando ativado por um chamador de droides." }),
  S("Bateria Secundária", "secondary-battery", "accessory", { folder: F.acc, cost: 400, weight: 4, desc: "Opera 200 horas antes de precisar recarregar." }),
  S("Sistema de Autodestruição", "self-destruct", "accessory", { folder: F.acc, mode: "selfDestruct", avail: "restricted", desc: "Explosão como ataque de área (+5): Pequeno 4d6, Médio 6d6, Grande 8d6; raio de 2 quadrados por 4d6." }),
  // Sensores
  S("Pacote Sensorial Aprimorado", "improved-sensor-package", "sensor", { folder: F.sens, cost: 200, weight: 2.5, mods: [mod("skills.perception", 2)], desc: "+2 de equipamento em Perception (automático) e visão na penumbra." }),
  S("Darkvision", "darkvision", "sensor", { folder: F.sens, cost: 150, weight: 1.5, desc: "Ignora camuflagem (inclusive total) causada pela escuridão." }),
  // Comunicação
  S("Comlink Interno", "internal-comlink", "communication", { folder: F.comm, cost: 250, weight: 0.1, desc: "Comlink integrado." }),
  S("Vocabulador", "vocabulator", "communication", { folder: F.comm, cost: 50, weight: 0.5, desc: "Permite falar idiomas além de Binary." }),
  S("Pacote de Diagnóstico", "diagnostics-package", "communication", { folder: F.comm, cost: 250, weight: 4, desc: "+2 de equipamento em Mechanics para diagnosticar problemas." }),
  S("Chamador de Droides", "droid-caller", "communication", { folder: F.comm, cost: 10, weight: 0.2, desc: "Ativa parafusos de contenção." }),
  // Escudos
  S("Gerador de Escudo SR 5", "shield-sr5", "shield", { folder: F.shield, mode: "factor", cost: 2500, sr: 5, avail: "military", desc: "Reduz o dano pelo SR; dano ≥ SR reduz o SR em 5. Recarregar: 3 ações rápidas e Endurance CD 20." }),
  S("Gerador de Escudo SR 10", "shield-sr10", "shield", { folder: F.shield, mode: "factor", cost: 5000, sr: 10, min: "small", avail: "military" }),
  S("Gerador de Escudo SR 15", "shield-sr15", "shield", { folder: F.shield, mode: "factor", cost: 7500, sr: 15, min: "medium", avail: "military" }),
  S("Gerador de Escudo SR 20", "shield-sr20", "shield", { folder: F.shield, mode: "factor", cost: 10000, sr: 20, min: "large", avail: "military" }),
  // Tradutores
  S("Unidade Tradutora (CD 20)", "translator-20", "translator", { folder: F.trans, cost: 200, weight: 1 }),
  S("Unidade Tradutora (CD 15)", "translator-15", "translator", { folder: F.trans, cost: 500, weight: 2 }),
  S("Unidade Tradutora (CD 10)", "translator-10", "translator", { folder: F.trans, cost: 1000, weight: 4 }),
  S("Unidade Tradutora (CD 5)", "translator-5", "translator", { folder: F.trans, cost: 2000, weight: 8 }),
  // Armazenamento
  S("Armazenamento Interno (1 kg)", "internal-storage", "storage", { folder: F.store, cost: 50, min: "small", desc: "1 kg por compra (máx.: Pequeno 5 kg, Médio 10 kg, Grande 20 kg)." }),
  S("Mecanismo de Mola", "spring-loaded-mechanism", "storage", { folder: F.store, cost: 150, weight: 3, desc: "Lança um item do compartimento interno a até 4 quadrados (ataque à distância contra Reflexos 10)." }),
  S("Acesso Travado", "locked-access", "storage", { folder: F.store, cost: 50, avail: "licensed", desc: "O botão de desligar fica protegido: só pode ser desligado se desativado ou indefeso." }),
  // Sistemas endurecidos (Grande ou maior)
  ...[2, 3, 4, 5].map((x, i) => S(`Sistemas Endurecidos ×${x}`, `hardened-x${x}`, "hardened", {
    folder: F.hard, mode: "factor", cost: [1000, 2500, 4000, 6250][i], min: "large", avail: "military",
    desc: `Multiplica por ${x} o bônus de PV e de Limiar de Dano por tamanho (Grande: +${10 * x} PV, +${5 * x} Limiar).`
  }))
];

/* -------- Armaduras embutidas (Tabela 11-6) -------- */
const AR = (name, key, category, costBase, reflexBonus, maxDex, avail = "") => ({
  name, type: "armor", folder: F.armor,
  system: {
    key, category, reflexBonus, fortBonus: 0, maxDex, droid: true, costBase, cost: costBase, weight: 0, quantity: 1, availability: avail,
    equipped: false, modifiers: [], special: "", source: "Saga Edition Core Rulebook",
    description: `<p>Armadura embutida de droide (${category === "light" ? "leve, −2" : category === "medium" ? "média, −5" : "pesada, −10"} sem proficiência). Não reduz o deslocamento. Custo = ${costBase} × fator de custo.</p>`
  }
});
const droidArmor = [
  AR("Plasteel Shell", "plasteel-shell", "light", 400, 2, 5),
  AR("Quadanium Shell", "quadanium-shell", "light", 900, 3, 4),
  AR("Durasteel Shell", "durasteel-shell", "light", 1600, 4, 4),
  AR("Quadanium Plating", "quadanium-plating", "light", 2500, 5, 3, "licensed"),
  AR("Durasteel Plating", "durasteel-plating", "light", 3600, 6, 3, "licensed"),
  AR("Quadanium Battle Armor", "quadanium-battle-armor", "medium", 4900, 7, 3, "restricted"),
  AR("Duranium Plating", "duranium-plating", "medium", 6400, 8, 2, "restricted"),
  AR("Durasteel Battle Armor", "durasteel-battle-armor", "medium", 9600, 8, 3, "restricted"),
  AR("Mandalorian Steel Shell", "mandalorian-steel-shell", "heavy", 8100, 9, 3, "military"),
  AR("Duranium Battle Armor", "duranium-battle-armor", "heavy", 10000, 10, 2, "military"),
  AR("Neutronium Plating", "neutronium-plating", "heavy", 12100, 11, 1, "military")
];

export const droidSpecies = species;
export const droidSystems = [...systems, ...droidArmor];
export const DROID_FOLDERS = Object.values(F);
