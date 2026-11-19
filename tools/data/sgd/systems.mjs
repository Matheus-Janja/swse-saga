// Scavenger's Guide to Droids — Cap. 3: sistemas e acessórios de droide (Tabela 3-2) e armaduras (Tabela 3-1).
const SRC = "Scavenger's Guide to Droids";
const mod = (target, value, type = "equipment") => ({ target, value: String(value), type, label: "", disabled: false });
const S = (name, key, category, folder, o = {}) => ({
  name, type: "droidSystem", folder,
  system: {
    key, category, costMode: o.mode ?? "flat", costBase: o.cost ?? 0, minSize: o.min ?? "", cost: 0,
    weight: o.weight ?? 0, quantity: 1, availability: o.avail ?? "", equipped: true,
    locomotion: { type: "", small: 0, medium: 0, large: 0, mult: 0 },
    appendage: "", shieldRating: 0, rerolls: o.rerolls ?? [], modifiers: o.mods ?? [], special: o.special ?? "",
    description: `<p>${o.desc ?? ""}${o.costText ? ` <em>Custo: ${o.costText}.</em>` : ""}</p>`, source: SRC
  }
});
const F = { acc: "Acessórios", app: "Apêndices", proc: "Processadores", sens: "Sensores", comm: "Comunicação", loco: "Locomoção", shield: "Escudos", station: "Estações (Scavenger's Guide)" };

export const systems = [
  // Locomoção
  S("Burrower Drive", "burrower-drive", "locoExtra", F.loco, { mode: "factor", costText: "200 × fator de custo × deslocamento²", avail: "restricted", desc: "Move à metade do deslocamento através da rocha e do solo (também na vertical). Como arma: ataque corpo a corpo com o dano de autodestruição do droide; cada acerto desce −1 passo persistente." }),
  S("Gyroscopic Stabilizers", "gyroscopic-stabilizers", "locoExtra", F.loco, { mode: "factor", costText: "2 × fator de custo × deslocamento²", desc: "+5 de estabilidade contra ser derrubado (acumula com pernas extras)." }),
  S("Underwater Drive", "underwater-drive", "locoExtra", F.loco, { mode: "factor", costText: "20 × fator de custo × deslocamento²", avail: "licensed", desc: "Deslocamento de natação igual ao deslocamento base em terra." }),
  // Apêndices
  S("Magnetic Hands", "magnetic-hands", "appendage", F.app, { mode: "factor", cost: 100, costText: "custo do apêndice × 2", desc: "Com pés magnéticos: +2 em Climb ao manobrar num casco no espaço e +5 nas Defesas contra ser derrubado do casco; ativas, não pode atacar com as mãos." }),
  S("Projectile Hand", "projectile-hand", "appendage", F.app, { mode: "factor", cost: 100, avail: "licensed", costText: "custo do apêndice × 2 (pacote básico 250 cr)", desc: "A mão é disparada: arma simples à distância, não letal, 2d8; pode desarmar à distância um alvo a até 6 quadrados." }),
  S("Quick-Release Coupling (apêndice)", "quick-release-appendage", "appendage", F.app, { mode: "factor", cost: 50, desc: "Troca um apêndice em duas rodadas completas, sem teste de Mechanics." }),
  S("Quick-Release Coupling (ferramenta)", "quick-release-tool", "appendage", F.app, { mode: "factor", cost: 10, desc: "Troca uma ferramenta em duas ações padrão." }),
  S("Remote Limb Control", "remote-limb-control", "appendage", F.app, { mode: "factor", cost: 100, avail: "restricted", costText: "básico 1.500; deluxe 6.000", desc: "Destaca um membro que flutua (6 quadrados) e age a até 24 quadrados; deluxe: até 1 + mod. de Int membros." }),
  S("Rocket Arm", "rocket-arm", "appendage", F.app, { mode: "factor", cost: 200, avail: "illegal", costText: "2.000 cr; Mechanics CD 20 para instalar", desc: "Braço-foguete: arma pesada à distância, 3d8 com splash de 1 quadrado; falha na instalação faz explodir no próprio droide." }),
  // Processadores
  S("Droid Remote Control", "droid-remote-control", "processor", F.proc, { cost: 500, weight: 0.5, desc: "Versão avançada do parafuso de contenção: o dono move o droide (metade do deslocamento) com um chamador." }),
  S("Hidden Core", "hidden-core", "processor", F.proc, { cost: 200, weight: 1, avail: "restricted", desc: "Cópia oculta da personalidade: 1d6 dias após um apagamento de memória, tenta restaurar-se (1d20+10 ou 1d20 + Use Computer contra CD 20). Achar: Use Computer contra a Vontade do droide." }),
  S("Personality Downloader", "personality-downloader", "processor", F.proc, { cost: 5000, weight: 2, avail: "illegal", desc: "Ligado a um droide, Use Computer contra a Vontade dele: a personalidade invasora assume em 5 minutos; a cada 10 minutos, novo teste resistido." }),
  S("Remote Starship Starter", "remote-starship-starter", "processor", F.proc, { cost: 50, weight: 2, desc: "Inicia remotamente o pré-voo da nave." }),
  S("Specialized Subprocessor", "specialized-subprocessor", "processor", F.proc, { cost: 1000, weight: 2, desc: "Uma ação rápida extra por turno, só para ações de uma perícia escolhida na instalação. Só um por droide." }),
  S("Tactician Battle Computer", "tactician-battle-computer", "processor", F.proc, { cost: 5000, weight: 10, avail: "restricted", desc: "Ação padrão: analisa o combate e dá +2 no próximo ataque de aliados (até mod. de Int, mín. 1) cujas armas tenham o transceptor; só funciona com essas armas." }),
  // Sensores
  S("Sensor Booster", "sensor-booster", "sensor", F.sens, { cost: 200, weight: 5, desc: "Com pacote de sensores, alcance de até 2 km." }),
  S("Sensor Countermeasure Package", "sensor-countermeasure", "sensor", F.sens, { cost: 1000, weight: 2, desc: "Use Computer para evitar detecção por sensores: Perception não visual precisa igualar ou superar o resultado." }),
  S("YV Sensor Package", "yv-sensor-package", "sensor", F.sens, { cost: 1000, weight: 3, avail: "military", desc: "+10 em Perception para detectar Yuuzhan Vong (até ocultos por ooglith) a até 12 quadrados." }),
  S("Audio Enhancers", "audio-enhancers", "sensor", F.sens, { cost: 2000, weight: 1, desc: "Rerrola Perception para ouvir sons distantes e ambiente (fica com o melhor)." }),
  S("Automap", "automap", "sensor", F.sens, { cost: 1000, weight: 2, desc: "Mapeia terreno, atmosfera, sinais e seres vivos num raio de 12 quadrados (não atravessa paredes)." }),
  S("Multispectrum Searchlight", "multispectrum-searchlight", "sensor", F.sens, { cost: 100, weight: 2, desc: "Holofote (6 km): +2 em Perception para procurar e notar; cone de 6 quadrados: ataque à distância contra a Fortitude cega (−5 em ataques e perícias visuais até o seu próximo turno; −2 se falhar)." }),
  S("Weapon Detector", "weapon-detector", "sensor", F.sens, { cost: 1500, weight: 5, avail: "licensed", desc: "Soma o mod. de Inteligência em Perception para procurar armas." }),
  S("Remote Viewer", "remote-viewer", "sensor", F.sens, { cost: 1000, weight: 20, desc: "Sensor flutuante destacável (12 quadrados, desloc. 4, Ref 18, Fort 12) por 30 minutos." }),
  S("Repulsorcam", "repulsorcam", "sensor", F.sens, { cost: 1000, weight: 20, desc: "Gravador flutuante destacável (12 quadrados, 2 h de gravação; desloc. 4, Ref 16, Fort 10)." }),
  // Comunicação
  S("Antitheft Comlink Locator", "antitheft-comlink-locator", "communication", F.comm, { cost: 100, weight: 0.5, desc: "Emite sinal de socorro rastreável ao comlink do dono." }),
  S("Communications Countermeasures", "comm-countermeasures", "communication", F.comm, { cost: 1000, weight: 3, avail: "restricted", mods: [mod("skills.useComputer", 5)], desc: "+5 de equipamento em Use Computer contra interferência nas comunicações (automático)." }),
  S("Communications Jammer", "comm-jammer", "communication", F.comm, { cost: 5000, weight: 5, avail: "military", desc: "+5 em Use Computer para fatiar sistemas de comunicação; Use Computer CD 25 bloqueia comlinks num raio de 1 km." }),
  S("Remote Receiver Jammer", "remote-receiver-jammer", "communication", F.comm, { cost: 2000, weight: 2, avail: "military", desc: "Ação padrão: Use Computer contra a Vontade de droides com receptor remoto (sem reserva) a curto alcance; se vencer, não agem e ficam surpresos até o próximo turno." }),
  S("Remote Receiver Signal Booster", "remote-receiver-booster", "communication", F.comm, { cost: 500, weight: 2, avail: "licensed", desc: "Alcance do receptor +50% (+100% por 1 h com Use Computer CD 30)." }),
  S("Scomp Link", "scomp-link", "communication", F.comm, { cost: 100, weight: 1, desc: "+2 de equipamento em Use Computer para acessar informações quando o computador é prestativo ou amistoso." }),
  S("Earphone Binary-to-Basic Translator", "earphone-translator", "communication", F.comm, { cost: 20, weight: 0.5, desc: "Traduz o Binary para um fone (detectar: Perception CD 20)." }),
  S("Video Screen", "video-screen", "communication", F.comm, { cost: 100, weight: 1, desc: "Tela embutida (50 a 500 mm; 1 cr por mm²)." }),
  S("Voice-Print Command Lock", "voice-print-lock", "communication", F.comm, { cost: 400, weight: 1, desc: "Só obedece ao dono; enganar com gravação: Use Computer contra a Vontade +5." }),
  S("Space-Beacon Launcher", "space-beacon-launcher", "communication", F.comm, { cost: 5000, weight: 10, desc: "Lança até 12 faróis espaciais (localizar: Use Computer CD 10)." }),
  // Acessórios
  S("Audio-Radial Stunner", "audio-radial-stunner", "accessory", F.acc, { cost: 5000, weight: 3, avail: "restricted", desc: "Ação padrão: até o fim do próximo turno, quem começa o turno adjacente faz Endurance CD 20 ou desce −1 passo." }),
  S("Blaster Recharge Interface", "blaster-recharge-interface", "accessory", F.acc, { cost: 300, weight: 1, avail: "licensed", desc: "Ação rápida: recarrega um pacote de blaster perdendo PV iguais ao tipo de dado da arma." }),
  S("Collapsible Construction", "collapsible-construction", "accessory", F.acc, { mode: "factor", cost: 2000, desc: "Desligado, reduz o tamanho em uma categoria; reativa com ação padrão." }),
  S("Concealed Item", "concealed-item", "accessory", F.acc, { avail: "restricted", costText: "custo do item + apêndice/armazenamento × 2", desc: "Arma ou ferramenta oculta num apêndice: +5 em Stealth para escondê-la e +10 em Deception para aparência enganosa; sacar é ação rápida." }),
  S("Courier Compartment", "courier-compartment", "accessory", F.acc, { cost: 200, desc: "Compartimento oculto (Perception CD = Vontade do droide +5); torradeira opcional destrói o conteúdo." }),
  S("Credit Reader", "credit-reader", "accessory", F.acc, { cost: 50, weight: 1, avail: "licensed", desc: "+5 em Perception contra falsificações de crédito e documentos financeiros." }),
  S("Electric Defense Grid", "electric-defense-grid", "accessory", F.acc, { mode: "factor", cost: 3000, avail: "restricted", desc: "Quem o fere com arma corpo a corpo (exceto armas de energia, como sabres) sofre 5 de dano de energia." }),
  S("Emergency Oxygen Supply", "emergency-oxygen", "accessory", F.acc, { cost: 200, weight: 20, desc: "30 minutos de oxigênio para um ser Médio." }),
  S("Hidden Holster", "hidden-holster", "accessory", F.acc, { mode: "factor", cost: 500, avail: "licensed", desc: "Coldre na perna para arma um tamanho menor: saca ou guarda como ação rápida (benefício de Quick Draw)." }),
  S("High-Speed Cutting Torch and Welder", "cutting-torch", "accessory", F.acc, { cost: 2500, weight: 500, avail: "licensed", min: "medium", desc: "Maçarico de 1 quadrado: 4d10 de dano; após duas rodadas no mesmo objeto, ignora 5 de RD e reduz o Limiar em 10." }),
  S("Holographic Game System", "holo-game-system", "accessory", F.acc, { cost: 300, weight: 3, desc: "Quinze jogos (dejarik, sabacc...)." }),
  S("Holographic Image Disguiser", "holo-image-disguiser", "accessory", F.acc, { mode: "factor", cost: 20000, avail: "restricted", mods: [mod("skills.deception", 10)], desc: "+10 de equipamento em Deception para aparência enganosa (automático); versão avançada (dobro do preço) disfarça como rodada completa sem penalidade." }),
  S("ID Dodge", "id-dodge", "accessory", F.acc, { cost: 5000, weight: 1, avail: "illegal", desc: "Usa Deception no lugar de Use Computer contra sistemas de identificação biométrica." }),
  S("Improved Coordination Circuitry", "improved-coordination", "accessory", F.acc, { cost: 1000, weight: 1, desc: "Ao ajudar outro droide numa perícia (escolhida), o bônus é +4." }),
  S("Interference Generator", "interference-generator", "accessory", F.acc, { cost: 2500, weight: 1, avail: "restricted", desc: "Gravações nos quadrados adjacentes exigem Perception ou Use Computer CD 30." }),
  S("Internal Defenses", "internal-defenses", "accessory", F.acc, { mode: "factor", cost: 10, avail: "licensed", desc: "Quem abrir os painéis sem permissão sofre 1d20+5 contra a Fortitude: 1d8 + ½ nível heroico do droide (10 usos)." }),
  S("Internal Grapple Gun", "internal-grapple-gun", "accessory", F.acc, { mode: "factor", cost: 100, desc: "Gancho magnético com cabo de 15 m (até 100 m externos); disparar é ação padrão." }),
  S("Mesh Tape Dispenser", "mesh-tape-dispenser", "accessory", F.acc, { mode: "factor", cost: 10, weight: 5, desc: "Num ataque corpo a corpo, enrola braços (−2 em ataques e perícias de Des) ou pernas (−2 de deslocamento, não corre); com Pin, mantém o alvo imobilizado até a fita ser removida." }),
  S("Micro Shield", "micro-shield", "accessory", F.acc, { mode: "factor", cost: 600, avail: "licensed", mods: [mod("defenses.reflex", 1)], desc: "Escudo de energia num braço: +1 de equipamento na Reflexos (automático; ative como ação rápida). 1 hora por célula." }),
  S("Multifunction Apparatus", "multifunction-apparatus", "accessory", F.acc, { mode: "factor", cost: 80, desc: "Até três ferramentas ou armas num apêndice; trocar a ativa é ação rápida." }),
  S("Radiant Heat Element", "radiant-heat-element", "accessory", F.acc, { cost: 200, desc: "Aquece; no máximo, quem termina o turno adjacente sofre 1d4 de fogo (o droide sofre 1)." }),
  S("Rental Restraining Bolt", "rental-restraining-bolt", "accessory", F.acc, { cost: 10, weight: 0.5, desc: "Parafuso de contenção com leitor de créditos para aluguel." }),
  S("Silence-Bubble Generator", "silence-bubble", "accessory", F.acc, { mode: "factor", cost: 3500, avail: "licensed", desc: "Ação padrão: bolha de silêncio num raio de 3 quadrados (−10 em Perception para ouvir de fora)." }),
  S("Survival Kit (droide)", "droid-survival-kit", "accessory", F.acc, { cost: 100, weight: 1, desc: "Ao ajudar em Survival, concede +4 em vez de +2." }),
  S("Taser", "droid-taser", "accessory", F.acc, { cost: 250, weight: 2, avail: "licensed", desc: "Arma não letal de dardos (atordoamento); contra droides funciona como arma iônica; também serve de sonda de eletrochoque." }),
  S("Droid Oil Bath", "droid-oil-bath", "accessory", F.acc, { costText: "Pequeno 100, Médio 1.000, Grande 5.000, Enorme+ 10.000", desc: "30 minutos imerso: pode usar um segundo second wind no dia, mesmo já tendo usado." }),
  // Escudos
  S("Shield Expansion Module", "shield-expansion-module", "shield", F.shield, { mode: "factor", costText: "50 × SR × fator de custo", avail: "military", desc: "Ação padrão: estende o escudo a um quadrado adjacente (Médio ou menor); Grande ou maior pode ter dois módulos." }),
  // Estações
  S("Droid Battle Station", "droid-battle-station", "accessory", F.station, { cost: 50000, weight: 5000, avail: "military", desc: "Estação de comando de batalha (por 100 droides): escolha dois talentos de Droid Commander, usados pelo operador." }),
  S("Droid Command Station", "droid-command-station", "accessory", F.station, { cost: 10000, weight: 1000, avail: "licensed", desc: "Comanda droides do grupo: +10 em Use Computer, Persuasion e Perception contra eles; coordena ajuda (+3); localiza, monitora e reprograma." }),
  S("Droid Recharge Station", "droid-recharge-station", "accessory", F.station, { cost: 4000, weight: 500, desc: "Recarga de 1 hora; diagnóstico com Use Computer CD 10." }),
  S("Droid Socket", "droid-socket", "accessory", F.station, { cost: 10000, weight: 1000, avail: "military", desc: "Soquete de astromecânico em naves: copilota, opera escudos, redireciona energia, faz reparos e astrogação, ejeta o droide." })
];

const AR = (name, key, category, costBase, reflexBonus, maxDex, weight, avail, desc, mods = []) => ({
  name, type: "armor", folder: "Armaduras de Droide",
  system: {
    key, category, reflexBonus, fortBonus: 0, maxDex, droid: true, costBase, cost: costBase, weight, quantity: 1, availability: avail,
    equipped: false, modifiers: mods, special: "", source: SRC,
    description: `<p>Armadura embutida de droide. Custo = ${costBase.toLocaleString("pt-BR")} × fator de custo. ${desc}</p>`
  }
});
export const armor = [
  AR("Duravlex Shell", "duravlex-shell", "light", 1000, 4, 3, 10, "licensed", "Resistente a calor: +10 de equipamento na Fortitude contra fogo e calor extremo (aplique como efeito).", []),
  AR("Laminanium Plating (leve)", "laminanium-plating-light", "light", 3000, 4, 3, 15, "military", "Auto-reparável: +2 de equipamento na Fortitude (automático).", [mod("defenses.fortitude", 2)]),
  AR("Crystadurium Plating", "crystadurium-plating", "heavy", 50000, 10, 2, 30, "military", "Reduz o dano de blasters em 1 ponto por dado. Com armadura pesada, o droide corre só três vezes o deslocamento."),
  AR("Laminanium Plating (pesada)", "laminanium-plating-heavy", "heavy", 20000, 12, 2, 15, "military", "Auto-reparável: +2 de equipamento na Fortitude (automático).", [mod("defenses.fortitude", 2)])
];
