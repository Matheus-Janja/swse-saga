// Galaxy at War — Cap. 2 (Tabelas 2-1 a 2-6) e Cap. 3 (Tabelas 3-1 e 3-3): armas, explosivos, armaduras,
// equipamentos e cibernéticos. Descrições resumidas.
const SRC = "Galaxy at War";
const W = (name, key, o) => ({
  name, type: "weapon", img: o.img ?? "icons/weapons/guns/gun-pistol-flintlock-white.webp",
  system: {
    key, group: "simple", size: "medium", rangeType: "melee", damage: "1d4", damage2: "", damageType: "energy",
    stun: false, stunDamage: "", ion: false, rateOfFire: "S", area: "", accurate: false, inaccurate: false, thrown: false,
    reach: false, double: false, strDamage: false, noStrDamage: false, ignoresDR: false, attackBonus: 0, damageBonus: 0,
    critRange: 20, critMultiplier: 2, ammo: { value: 0, max: 0 }, special: "", cost: 0, weight: 0, quantity: 1,
    availability: "", equipped: false, modifiers: [], settings: "", source: SRC, ...o, description: o.description ? `<p>${o.description}</p>` : ""
  }
});
const AR = (name, key, o) => ({
  name, type: "armor", img: o.img ?? "icons/equipment/chest/breastplate-banded-steel.webp",
  system: { key, category: "light", reflexBonus: 0, fortBonus: 0, maxDex: 5, special: "", cost: 0, weight: 0, quantity: 1, availability: "", equipped: false, modifiers: [], source: SRC, ...o, description: o.description ? `<p>${o.description}</p>` : "" }
});
const EQ = (name, key, category, cost, weight, description = "", o = {}) => ({
  name, type: "equipment", img: o.img ?? "icons/containers/bags/pack-leather-brown.webp",
  system: { key, category, cost, weight, quantity: 1, availability: o.availability ?? "", equipped: false, special: o.special ?? "", modifiers: o.modifiers ?? [], source: SRC, description: description ? `<p>${description}</p>` : "" }
});
const mod = (target, value, type = "untyped") => ({ target, value: String(value), type, label: "", disabled: false });
const IMG = {
  blade: "icons/weapons/swords/sword-guard-blue.webp",
  spear: "icons/weapons/polearms/spear-simple-engraved.webp",
  club: "icons/weapons/clubs/club-simple-barbed-brown.webp",
  fist: "icons/skills/melee/unarmed-punch-fist.webp",
  pistol: "icons/weapons/guns/gun-pistol-flintlock-white.webp",
  rifle: "icons/weapons/guns/rifle-brown.webp",
  heavy: "icons/weapons/guns/gun-blunderbuss-gold.webp",
  grenade: "icons/weapons/thrown/bomb-fuse-black-pink.webp",
  bow: "icons/weapons/crossbows/crossbow-simple-brown.webp",
  flame: "icons/magic/fire/beam-jet-stream-embers.webp",
  explosive: "icons/weapons/thrown/grenade-round.webp",
  tool: "icons/tools/hand/shovel-spade-steel-grey.webp",
  cyber: "icons/commodities/tech/cog-steel-grey.webp",
  eye: "icons/commodities/biological/eye-blue.webp"
};

export const weapons = [
  // Corpo a corpo
  W("Shock Stick", "shock-stick", { group: "advancedMelee", size: "large", damage: "3d6", stun: true, stunDamage: "3d6", damageType: "energy", cost: 450, weight: 1.4, availability: "licensed", img: IMG.club, special: "stunOnly", description: "Sempre causa dano de atordoamento (marque Atordoar). Se o dano (antes de dividir) igualar ou superar os PV atuais do alvo, ele desce −5 passos e fica inconsciente. Pode ser montado como baioneta: sem penalidade de proficiência para quem é proficiente com o rifle. Requer célula de energia." }),
  W("Static Pike", "static-pike", { group: "advancedMelee", size: "large", damage: "2d6", stun: true, stunDamage: "2d6", damageType: "piercing", thrown: true, reach: true, cost: 300, weight: 1.8, availability: "restricted", img: IMG.spear, description: "Arma de alcance; pode ser arremessada como uma lança. Dano perfurante e de energia; letal ou atordoante. Requer célula de energia." }),
  W("Vibrolance", "vibrolance", { group: "advancedMelee", size: "large", damage: "2d10", damageType: "piercing", cost: 500, weight: 2, availability: "licensed", img: IMG.spear, description: "Perfurante ou cortante. Não pode ser arremessada. Requer célula de energia." }),
  W("Darkstick", "darkstick", { group: "exotic", size: "small", damage: "1d6", damageType: "slashing", thrown: true, cost: 1000, weight: 1.5, availability: "rare", img: IMG.blade, description: "Lâmina curva Kerestiana. Atacantes adjacentes tratam o portador como em camuflagem total (exceto darkvision). Proficientes podem segurar várias numa mão: 1d6 vira 2d8. Arremessada: se o ataque superar a Reflexos em 5+, volta à mão." }),
  W("Entrenching Tool", "entrenching-tool", { group: "simple", size: "small", damage: "1d6", damageType: "slashing", attackBonus: -2, cost: 50, weight: 1, img: IMG.tool, description: "Pá/picareta dobrável: −2 no ataque (já incluso). Cortante ou perfurante." }),
  W("Fire Blade", "fire-blade", { group: "simple", size: "small", damage: "2d4", damageType: "slashing", cost: 200, weight: 1, img: IMG.blade, description: "Lâmina energizada de Dathomir (energia e corte); ignora a RD de objetos sem dono. Requer célula de energia." }),
  W("Shockboxing Gloves", "shockboxing-gloves", { group: "simple", size: "tiny", damage: "1d4", damageBonus: 1, stun: true, damageType: "bludgeoning", cost: 600, weight: 0.5, availability: "restricted", img: IMG.fist, description: "+1 de dano em ataques desarmados (letal ou atordoante; ação rápida para alternar); não podem ser desarmadas. Versão para personagem Pequeno: 500 cr, 0,4 kg. (Use no lugar do Unarmed.)" }),
  // Pistolas
  W("Blaster Pistol, Sidearm", "sidearm-blaster-pistol", { group: "pistols", size: "small", rangeType: "pistol", damage: "3d6", stun: true, cost: 400, weight: 1, availability: "military", ammo: { value: 250, max: 250 }, description: "DC-15s: com Rapid Shot (ou feats que o exigem), é preciso uma ação rápida para rearmar o gatilho antes de atirar de novo. 250 tiros por pacote." }),
  W("Ascension Gun", "ascension-gun", { group: "pistols", size: "medium", rangeType: "pistol", damage: "3d8", stun: true, inaccurate: true, cost: 1200, weight: 2, availability: "military", ammo: { value: 50, max: 50 }, description: "Pistola blaster pesada com lançador de gancho e synthecorda (ação rápida para alternar; alcance 30 quadrados, sobe 12 quadrados/rodada, até 720 kg; 2 cordas). −5 em Stealth para ocultá-la." }),
  // Rifles
  W("Blaster Rifle, Variable", "variable-blaster-rifle", { group: "rifles", size: "medium", rangeType: "rifle", damage: "3d4", stun: true, rateOfFire: "S, A", cost: 1300, weight: 5, availability: "military", ammo: { value: 500, max: 500 }, img: IMG.rifle, settings: "3d4:1|3d6:5|3d8:10", description: "DC-15S: ação rápida para ajustar a potência — 3d4 (1 tiro), 3d6 (5 tiros) ou 3d8 (10 tiros) por ataque. (Escolha no diálogo de ataque.) 500 tiros." }),
  W("Blaster Rifle, Heavy Variable", "heavy-variable-blaster-rifle", { group: "rifles", size: "large", rangeType: "rifle", damage: "3d6", stun: true, inaccurate: true, cost: 2250, weight: 6.5, availability: "military", ammo: { value: 500, max: 500 }, img: IMG.rifle, settings: "3d6:1|3d8:10|3d10:20", description: "DC-15A: ação rápida para ajustar — 3d6 (1 tiro), 3d8 (10) ou 3d10 (20) por ataque; também tem modo de ascensão (gancho, 30 quadrados). (Escolha no diálogo.)" }),
  W("Scatter Gun", "scatter-gun", { group: "rifles", size: "medium", rangeType: "rifle", damage: "3d8", damageType: "piercing", inaccurate: true, cost: 275, weight: 4, availability: "licensed", ammo: { value: 10, max: 10 }, img: IMG.rifle, description: "Espingarda de projéteis: 3d8 à queima-roupa, 2d8 em alcance curto, sem dano em médio ou longo (automático). Cartuchos: 2 cr cada." }),
  W("Interchangeable Weapon System", "icws", { group: "rifles", size: "medium", rangeType: "rifle", damage: "3d8", stun: true, rateOfFire: "S, A", cost: 4500, weight: 5, availability: "military", img: IMG.rifle, description: "DC-17m: configuração rifle blaster. Trocar de configuração é ação padrão (veja os itens de configuração sniper e antiblindagem)." }),
  W("ICWS — Sniper Configuration", "icws-sniper", { group: "rifles", size: "medium", rangeType: "rifle", damage: "3d10", accurate: true, cost: 0, weight: 0, availability: "military", img: IMG.rifle, description: "Modo sniper do DC-17m: inclui mira telescópica, é preciso; −2 contra alvos em alcance à queima-roupa (some no campo de ataque)." }),
  W("ICWS — Anti-Armor Configuration", "icws-anti-armor", { group: "heavy", size: "medium", rangeType: "heavy", damage: "4d6", damageType: "slashing", area: "Raio 3", cost: 0, weight: 0, availability: "military", ammo: { value: 1, max: 1 }, img: IMG.heavy, description: "Modo antiblindagem do DC-17m: lança-granadas de tiro único (explosão de 3 quadrados); conta como arma pesada. Munição antiblindagem: 400 cr, 1 kg." }),
  // Pesadas
  W("Flame Cannon", "flame-cannon", { group: "heavy", size: "large", rangeType: "heavy", damage: "5d6", damageType: "fire", area: "Cone 12", noStrDamage: true, cost: 3000, weight: 5, availability: "military", ammo: { value: 20, max: 20 }, img: IMG.flame, description: "Cone de 12 quadrados (8 de largura no fim): um ataque contra a Reflexos de todos; metade do dano em quem errar (Evasion se aplica). No tripé, conta como um tamanho menor. Recarregar: rodada completa; tanque 600 cr, 20 kg." }),
  W("Mortar Launcher", "mortar-launcher", { group: "heavy", size: "large", rangeType: "heavy", damage: "4d6", damageType: "slashing", area: "Raio 2", cost: 2500, weight: 20, availability: "military", ammo: { value: 5, max: 5 }, img: IMG.heavy, description: "Arma de arco: não ataca alvos em alcance à queima-roupa; o ponto de origem conta como 20 quadrados acima para linha de visão e cobertura. Projéteis equivalem a granadas (5 no carregador)." }),
  W("Rotary Blaster Cannon", "rotary-blaster-cannon", { group: "heavy", size: "large", rangeType: "heavy", damage: "3d10", rateOfFire: "A", cost: 5500, weight: 16, availability: "military", ammo: { value: 20, max: 20 }, img: IMG.heavy, description: "Z-6: apoiado, o fogo automático cobre 2×4 quadrados; sem apoiar, −5 adicional no ataque (some no campo de ataque). Pode ligar a um gerador." }),
  W("Tactical Tractor Beam", "tactical-tractor-beam", { group: "heavy", size: "large", rangeType: "heavy", damage: "3d6", cost: 8000, weight: 25, availability: "military", img: IMG.heavy, description: "Agarra alvos Enormes ou menores e os move até 10 quadrados, ou arremessa o objeto contra outro alvo a até 10 quadrados (ataque contra Reflexos; dano por queda de objetos). Requer gerador e um segundo operador (senão −2 nos ataques)." }),
  // Simples
  W("Crossbow, Repeating", "repeating-crossbow", { group: "simple", size: "medium", rangeType: "simple", damage: "1d8", damageType: "piercing", cost: 400, weight: 1.2, ammo: { value: 10, max: 10 }, img: IMG.bow, description: "Rearma sozinha a cada tiro. Carregador de 10 virotes: 30 cr, 1,2 kg; trocar é ação de movimento." }),
  W("Grenade, Radiation", "radiation-grenade", { group: "simple", size: "tiny", rangeType: "thrown", damage: "3d8", area: "Raio 2", thrown: true, noStrDamage: true, cost: 500, weight: 0.5, availability: "illegal", img: IMG.grenade, description: "Ataque contra a Fortitude (não a Reflexos) de todos na área; metade do dano em quem errar. Os afetados sofrem radiação moderada." }),
  W("Grenade, Smoke", "smoke-grenade", { group: "simple", size: "tiny", rangeType: "thrown", damage: "0", area: "Raio 2", thrown: true, noStrDamage: true, cost: 100, weight: 0.5, availability: "restricted", img: IMG.grenade, description: "Nuvem de fumaça de raio 2 que dá camuflagem por 10 rodadas." }),
  W("Targeting Laser", "targeting-laser", { group: "simple", size: "tiny", rangeType: "simple", damage: "0", noStrDamage: true, cost: 50, weight: 0.1, availability: "licensed", img: IMG.pistol, description: "Ataque ignorando os bônus de armadura do alvo; enquanto repetir o ataque a cada rodada, aliados recebem +2 em ataques com lança-mísseis, lança-granadas ou armas veiculares contra esse alvo." }),
  // Explosivos (Tabela 2-3) e defesas (Tabela 3-1): bônus de ataque definido pelo Mestre
  W("Antipersonnel Mine", "antipersonnel-mine", { group: "simple", size: "tiny", rangeType: "thrown", damage: "6d6", damageType: "piercing", area: "Cone 6", noStrDamage: true, cost: 500, weight: 1, availability: "military", img: IMG.explosive, description: "Cone de 6 quadrados na direção escolhida. −5 em Perception para notar minas; instalar é rodada completa; fio de disparo: Mechanics CD 10." }),
  W("Detonite Cord", "detonite-cord", { group: "simple", size: "tiny", rangeType: "thrown", damage: "4d6", area: "Raio 1 por quadrado", noStrDamage: true, cost: 1000, weight: 1, availability: "restricted", img: IMG.explosive, description: "Rolo de 6 quadrados; explode em raio 1 a partir de cada quadrado ocupado. +5 de equipamento em Mechanics para ignorar a RD do objeto." }),
  W("Ion Mine", "ion-mine", { group: "simple", size: "tiny", rangeType: "thrown", damage: "8d6", ion: true, damageType: "ion", area: "Raio 2", noStrDamage: true, cost: 800, weight: 0.5, availability: "military", img: IMG.explosive, description: "Dispara quando um droide ou veículo terrestre entra no quadrado." }),
  W("Limpet Mine", "limpet-mine", { group: "simple", size: "tiny", rangeType: "thrown", damage: "6d6", area: "Raio 1", noStrDamage: true, ignoresDR: true, cost: 300, weight: 0.5, availability: "military", img: IMG.explosive, description: "Presa (ação padrão) a veículo ou droide Grande ou maior; explode 1 rodada depois e ignora a RD do alvo." }),
  W("Bounding Mine", "bounding-mine", { group: "simple", size: "tiny", rangeType: "thrown", damage: "6d6", damageType: "slashing", area: "Raio 3", noStrDamage: true, cost: 250, weight: 1, availability: "military", img: IMG.explosive, description: "Salta 1,5 m antes de explodir. Notar: Perception CD 25." }),
  W("Smart Mine", "smart-mine", { group: "simple", size: "tiny", rangeType: "thrown", damage: "5d6", damageType: "slashing", area: "Raio 2", noStrDamage: true, cost: 500, weight: 1.5, availability: "military", img: IMG.explosive, description: "Programável (Use Computer CD 10) com critérios de alvo e IFF. Notar: Perception CD 20." }),
  W("Static Mine", "static-mine", { group: "simple", size: "tiny", rangeType: "thrown", damage: "4d6", damageType: "slashing", area: "Raio 2", noStrDamage: true, cost: 100, weight: 1, availability: "military", img: IMG.explosive, description: "Mina comum por vibração. Notar: Perception CD 25." }),
  W("Vehicular Mine", "vehicular-mine", { group: "simple", size: "tiny", rangeType: "thrown", damage: "4d10", damageType: "slashing", area: "Raio 3", noStrDamage: true, cost: 500, weight: 10, availability: "military", img: IMG.explosive, description: "Dano 4d10×2 (escala de veículo: dobre o resultado). Detecta repulsores. Notar: Perception CD 25." }),
  W("Razor Wire (1 m)", "razor-wire", { group: "simple", size: "tiny", rangeType: "thrown", damage: "2d6", damageType: "slashing", noStrDamage: true, attackBonus: 10, cost: 10, weight: 2, availability: "restricted", img: IMG.explosive, description: "Terreno difícil; quem entra sofre ataque +10 contra Reflexos: 2d6 e não pode se mover (metade se errar). Cada quadrado: RD 1, 4 PV, Limiar 20, quebrar CD 30." }),
  W("Fragmentation Wire (1 m)", "fragmentation-wire", { group: "simple", size: "tiny", rangeType: "thrown", damage: "2d6", damageType: "slashing", area: "Raio 1", noStrDamage: true, attackBonus: 10, cost: 100, weight: 2, availability: "military", img: IMG.explosive, description: "Como o arame de lâminas, mas explode ao acertar (raio 1) e se destrói. Distinguir: Perception CD 20. RD 1, 4 PV, Limiar 10, quebrar CD 15." })
];

export const armor = [
  AR("Barabel Microbe Armor", "barabel-microbe-armor", { category: "light", reflexBonus: 2, fortBonus: 0, maxDex: 3, cost: 4000, weight: 6, availability: "licensed", description: "RD 2 contra dano de energia e de fogo. Duas melhorias (Scum and Villainy)." }),
  AR("Stun Cloak", "stun-cloak", { category: "light", reflexBonus: 1, fortBonus: 0, maxDex: 5, cost: 3500, weight: 2, availability: "licensed", description: "Quando o usuário agarra ou é agarrado com sucesso, o oponente sofre 3d8 de atordoamento. Pelo dobro do preço, também funciona como manto de todas as temperaturas ou poncho de camuflagem." }),
  AR("Marine Armor", "marine-armor", { category: "light", reflexBonus: 5, fortBonus: 2, maxDex: 3, cost: 5000, weight: 12, availability: "restricted", description: "Sobrevive 24 h no vácuo; botas magnéticas (−2 quadrados de deslocamento quando ativas); rerrola Swim (fica com o melhor) e pode escolher 10 em Swim." }),
  AR("Biohazard Suit", "biohazard-suit", { category: "medium", reflexBonus: 0, fortBonus: 3, maxDex: 5, cost: 4000, weight: 9, availability: "licensed", description: "Imune a perigos atmosféricos, venenos inalados e doenças por inalação/contato; 1 hora de ar." }),
  AR("Camo Scout Armor", "camo-scout-armor", { category: "medium", reflexBonus: 6, fortBonus: 2, maxDex: 3, cost: 6000, weight: 13, availability: "licensed", modifiers: [mod("skills.stealth", 5, "equipment")], description: "+5 de equipamento em Stealth (automático)." }),
  AR("Katarn-class Commando Armor", "katarn-commando-armor", { category: "medium", reflexBonus: 9, fortBonus: 4, maxDex: 1, cost: 30000, weight: 20, availability: "military", description: "Selada (24 h no vácuo/sob a água), comlink e lâmina retrátil. Com Armor Proficiency (heavy): +2 em Perception e visão na penumbra. Rodada completa: tanques de bacta dão Treat Injury +10 em si mesmo, sem a penalidade de −5." }),
  AR("Stalker Armor", "stalker-armor", { category: "medium", reflexBonus: 7, fortBonus: 0, maxDex: 3, cost: 7500, weight: 10, availability: "licensed", description: "M1-10 da Salus Corporation: identifica o usuário como caçador de recompensas. Três melhorias." })
];

export const equipment = [
  EQ("Com Scrambler", "com-scrambler", "communication", 6000, 10, "Bloqueia comunicações num raio de 20 km; furar exige Use Computer contra +10 (a cada minuto).", { availability: "military" }),
  EQ("Comlink, Tightbeam", "comlink-tightbeam", "communication", 300, 0.5, "Laser criptografado em linha de visão; ignora penalidades de escuridão e fumaça; não pode ser interceptado."),
  EQ("Targeting Beacon", "targeting-beacon", "communication", 300, 0.1, "Pulso de luz visível, infravermelha ou ultravioleta para guiar evacuações e bombardeios (visível a 2 km)."),
  EQ("Triangulation Visor", "triangulation-visor", "computer", 1400, 0.5, "Para armas de projéteis sólidos (slugthrowers, morteiros, lança-mísseis e lança-granadas): reduz o alcance em uma categoria. Não pode ser usado com capacete."),
  EQ("Communication Scanner", "communication-scanner", "detection", 1000, 1, "Intercepta transmissões num raio de 50 km (Use Computer CD 15 para identificar; CD 20 para direção e distância); +5 de equipamento para decifrar."),
  EQ("Proximity Flare", "proximity-flare", "detection", 50, 0.5, "Dispara quando algo Pequeno ou maior chega a 3 quadrados: ilumina raio de 10. Evitar: Stealth CD 25. Como arma: +2, 3d6 de fogo."),
  EQ("Radiation Detector", "radiation-detector", "detection", 20, 0, "Alerta radiação a até 6 quadrados."),
  EQ("Anti-Rad Dose", "anti-rad-dose", "medical", 50, 0, "+10 de equipamento na Fortitude contra radiação e +5 em Treat Injury para tratar radiação."),
  EQ("Cryogenic Pouch", "cryogenic-pouch", "medical", 600, 1.5, "Rodada completa: estabiliza um ser Médio inconsciente (até mesmo morrendo há até 1d3 rodadas); fica −5 passos por até 24 h. RD 5; 1 ponto de dano rompe o selo."),
  EQ("Camouflage Netting", "camouflage-netting", "survival", 2000, 5, "+5 de equipamento em Stealth (inclusive contra sensores) para um objeto Enorme ou menor."),
  EQ("Camouflage Poncho", "camouflage-poncho", "survival", 125, 1.5, "+5 de equipamento em Stealth (automático quando equipado).", { modifiers: [mod("skills.stealth", 5, "equipment")] }),
  EQ("Field Food Processor", "field-food-processor", "survival", 1500, 4, "Transforma plantas e carne em ração; +10 de equipamento em Fortitude contra venenos e radiação dos ingredientes."),
  EQ("Personal Field Shelter", "personal-field-shelter", "survival", 500, 1.5, "Barraca para um Médio: +10 de equipamento na Fortitude contra calor/frio extremos, 1 h de ar e +2 em Stealth."),
  EQ("Plasma Bridge", "plasma-bridge", "survival", 12500, 700, "Ponte de 6 por até 120 quadrados; some 2 rodadas após perder a energia."),
  EQ("Vacuum Survival Pouch", "vacuum-survival-pouch", "survival", 800, 1, "Bolha que mantém um Médio vivo no vácuo por 2 h (2 PV)."),
  EQ("Droid Diagnostic", "droid-diagnostic", "tools", 400, 2, "+2 de equipamento em Mechanics para um droide conectado.")
];

// Cibernéticos (Tabela 2-6). Cada parte: −1 em Use the Force e vulnerabilidade a íons como droide (automáticos).
const UTF = mod("skills.useTheForce", -1);
const CY = (name, key, cost, surgery, rejection, availability, description, mods = [], o = {}) => EQ(name, key, "cybernetic", cost, 0,
  `${description} Cirurgia: ${surgery.toLocaleString("pt-BR")} cr.${rejection ? ` Rejeição: +${rejection} contra a Fortitude do hospedeiro (falha → −1 passo persistente e a peça não funciona).` : ""}`,
  { availability, img: o.img ?? IMG.cyber, modifiers: [UTF, ...mods], special: o.special ?? "cybernetic" });
export const cybernetics = [
  CY("Borg Construct", "borg-construct", 80000, 70000, 14, "restricted", "Conexão direta com computadores a 10 m; +2 em Use Computer e Knowledge, −5 em Persuasion; Issue Routine Commands como ação rápida.",
    [mod("skills.useComputer", 2), ...["knowledgeBureaucracy", "knowledgeGalacticLore", "knowledgeLifeSciences", "knowledgePhysicalSciences", "knowledgeSocialSciences", "knowledgeTactics", "knowledgeTechnology"].map(k => mod(`skills.${k}`, 2)), mod("skills.persuasion", -5, "penalty")]),
  CY("Comlink, Subcutaneous", "comlink-subcutaneous", 4000, 3000, 3, "restricted", "Comlink implantado; comunica-se com sons quase inaudíveis."),
  CY("Cybernetic Prosthesis (Galaxy at War)", "cybernetic-prosthesis-gaw", 1500, 500, 0, "", "Prótese padrão: sem bônus, sem rejeição; 1 espaço de melhoria (Scum and Villainy); dois tamanhos menor que o hospedeiro."),
  CY("Eye, Infrared Sensor", "eye-infrared", 300, 2250, 14, "restricted", "Concede darkvision.", [], { img: IMG.eye }),
  CY("Eye, Targeting", "eye-targeting", 500, 3750, 16, "military", "Funciona como pacote de capacete (helmet package).", [], { img: IMG.eye }),
  CY("Eye, Telescopic", "eye-telescopic", 500, 3750, 9, "restricted", "Penalidades de alcance em Perception a cada 20 quadrados (em vez de 10).", [], { img: IMG.eye }),
  CY("Skeletal Reinforcement", "skeletal-reinforcement", 10000, 50000, 12, "restricted", "+2 de equipamento no Limiar de Dano (automático).", [mod("damageThreshold", 2, "equipment")]),
  CY("Sensory Enhancement", "sensory-enhancement", 800, 3000, 14, "restricted", "Reduz em 2 as penalidades de Perception para notar alvos com camuflagem ou camuflagem total."),
  CY("Tremor Sensor", "tremor-sensor", 400, 3750, 7, "restricted", "Sem penalidade de camuflagem em Perception contra alvos que se moveram no último turno."),
  EQ("Ion Shielding (prosthesis upgrade)", "ion-shielding", "cybernetic", 1000, 0, "Melhoria de prótese (1 espaço). Se todas as partes cibernéticas a tiverem, o hospedeiro deixa de sofrer íons como droide (automático: um escudo por parte).", { special: "ionShielding", img: IMG.cyber })
];
