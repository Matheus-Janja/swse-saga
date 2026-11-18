// Galaxy of Intrigue — Cap. 3 (Tabelas 3-1 e 3-2), venenos e itens de Nyriaan (Cap. 6). Descrições resumidas.
const SRC = "Galaxy of Intrigue";
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
const EQ = (name, key, category, cost, weight, description = "", o = {}) => ({
  name, type: "equipment", img: o.img ?? "icons/containers/bags/pack-leather-brown.webp",
  system: { key, category, cost, weight, quantity: 1, availability: o.availability ?? "", equipped: false, special: o.special ?? "", modifiers: o.modifiers ?? [], source: SRC, description: description ? `<p>${description}</p>` : "" }
});

export const weapons = [
  W("Xerrol Nightstinger", "xerrol-nightstinger", { group: "exotic", size: "medium", rangeType: "rifle", damage: "3d6", cost: 1500, weight: 4.5, availability: "illegal", ammo: { value: 5, max: 5 }, img: "icons/weapons/guns/rifle-brown.webp", description: "Rifle blaster de caçada de assassinos: dispara raios invisíveis, então o atirador não revela sua posição. Usa cilindros de gás (5 tiros, 1.000 cr). Combina com o cristal de redirecionamento." }),
  W("Blaster, Wrist", "wrist-blaster", { group: "pistols", size: "tiny", rangeType: "pistol", damage: "3d4", inaccurate: true, cost: 800, weight: 0.5, availability: "illegal", ammo: { value: 1, max: 1 }, description: "Parece uma pulseira; a célula só aguenta um tiro. Detectá-lo num scanner exige Use Computer CD 25." }),
  W("Snare Pistol", "snare-pistol", { group: "pistols", size: "medium", rangeType: "pistol", damage: "1d4", stun: true, stunDamage: "1d4", damageType: "bludgeoning", inaccurate: true, cost: 600, weight: 2, availability: "licensed", ammo: { value: 2, max: 2 }, special: "stunOnly", description: "Dispara synthecorda que enrosca o alvo: permite agarrar (grab/grapple) até alcance curto. Escapar: Acrobatics CD 15 ou Força CD 20. Funciona com Pin e Trip, mas não com Crush, Throw ou Bone Crusher. Cartucho de 2 disparos: 25 cr, 1 kg." }),
  W("Darter", "darter", { group: "simple", size: "medium", rangeType: "pistol", damage: "1", damageType: "piercing", noStrDamage: true, cost: 150, weight: 3, availability: "licensed", description: "Pistola de dardos de ar comprimido; alcance máximo curto. O dardo entrega veneno (ao causar dano) ou um rastreador." })
];

export const equipment = [
  EQ("Comlink, Earbud", "comlink-earbud", "communication", 200, 0, "Comlink de ouvido (alcance 50 km): +5 de equipamento em Deception para escondê-lo; pode ser ativado ao tocar a orelha ou ranger os dentes."),
  EQ("Panic Ring", "panic-ring", "communication", 300, 0, "Anel com botão secreto (Perception CD 25 para notar) que emite um sinal criptografado de emergência por 100 km. Alterar o sinal: Mechanics CD 25 (falhar por 5+ dispara)."),
  EQ("Holo Converter", "holo-converter", "communication", 3000, 2, "Altera imagem e voz transmitidas pelo holoprojetor (até 10 personas): +5 de equipamento em Deception para se passar por outra pessoa."),
  EQ("Surveillance Detector", "surveillance-detector", "detection", 450, 0.5, "+10 de equipamento em Perception para localizar dispositivos de espionagem a até 6 quadrados; pode alarmar quando detecta."),
  EQ("Surveillance Tagger", "surveillance-tagger", "detection", 450, 0.5, "Ataque à distância contra alvo a até 6 quadrados: o dardo gruda e vira um localizador (1 km, 40 h). Perception −20 para notá-lo; rastrear exige Use Computer CD 10 e datapad."),
  EQ("Veridicator", "veridicator", "detection", 4000, 0.1, "Pulseira que lê sinais de estresse: após uma rodada completa calibrando num alvo a até 6 quadrados, +5 em Perception para perceber mentiras e influência (e no sabacc). Trocar a espécie: Use Computer CD 10."),
  EQ("Vid-Vox Scrambler", "vid-vox-scrambler", "detection", 3400, 0.5, "Embaralha gravações de vídeo, áudio e holo no próprio quadrado e nos adjacentes; quem tenta ouvir precisa de Perception ou Use Computer CD 30 para captar fragmentos."),
  EQ("Antitoxin Patch", "antitoxin-patch", "medical", 25, 0, "Adesivo de 24 h: +10 de equipamento na Fortitude contra venenos ingeridos e +5 contra inalados. Cada dia seguido de uso: −1 passo na trilha de condição."),
  EQ("Toxin Detector", "toxin-detector", "medical", 700, 0.5, "Ação padrão: analisa comida e bebida em 1 quadrado (100 espécies) e indica veneno. Versão joia: +100 cr."),
  EQ("Redirection Crystal", "redirection-crystal", "tools", 500, 0, "Cristal com gás tibanna que desvia um tiro de blaster para outro ângulo: acerte o cristal (Ref 15, Fino) e faça um segundo ataque contra o alvo real com −10 e as penalidades de alcance. Fica destruído; notá-lo exige Perception CD 30."),
  EQ("Shield Cage", "shield-cage", "tools", 10000, 20, "Disco que cria uma bolha de escudo (SR 15) num quadrado para prender um alvo; ligado a gerador (gasta um pacote de energia a cada 2 h). Vários discos ampliam a área."),
  EQ("Flash Suppressor/Silencer", "flash-suppressor", "accessory", 400, 0.2, "Para slugthrowers: −10 em Perception para perceber o som e o clarão do disparo; o alcance máximo cai 2 categorias."),
  EQ("Componentization (upgrade)", "componentization", "accessory", 0, 0, "Melhoria (1 espaço): o item se divide em 2 partes disfarçadas, uma categoria de tamanho menor; versão deluxe (2 espaços): 4 partes, duas categorias menor. Montar: rodada completa (2 partes) ou duas (4). Identificar: Perception CD 30 ou Knowledge (technology) CD 25."),
  EQ("UV Visor (Defel)", "uv-visor", "accessory", 2000, 0, "Visor ultravioleta sem o qual um Defel fora de Af'El fica cego. Personagens Defel começam com um.")
];

// Venenos: special = "poison|ataque|defesa|efeito" — usar o item rola o ataque contra os alvos marcados.
const PO = (name, key, cl, attack, text, o = {}) => EQ(`${name} (CL ${cl})`, key, "poison", o.cost ?? 0, 0, text,
  { special: `poison|${attack}|fortitude|${o.effect ?? ""}`, img: "icons/consumables/potions/bottle-round-corked-green.webp", availability: o.availability ?? "illegal" });
export const poisons = [
  PO("Bundar Root", "bundar-root", 1, "1d20+5", "Ingerido. Se o ataque vencer a Fortitude, o alvo sofre −5 em todos os testes de perícia nessa rodada. Ataca toda rodada até ser curado (Treat Injury CD 15).", { effect: "skills-5" }),
  PO("Chuba Poison", "chuba-poison", 8, "1d20+10", "Ingerido. Se vencer a Fortitude, −1 passo na trilha de condição; se vencer por 10+, a condição fica persistente até três testes de Treat Injury CD 20. Ataca toda rodada até ser curado (Treat Injury CD 20).", { effect: "step1" }),
  PO("Devaronian Blood-Poison", "devaronian-blood-poison", 4, "1d10+5", "Contato. Se vencer a Fortitude, o alvo só se move à metade e desce −1 passo; no ponto em que normalmente ficaria à metade do deslocamento, fica imobilizado. Ataca toda rodada até ser curado (Treat Injury CD 20).", { effect: "step1" }),
  PO("Irksh Poison", "irksh-poison", 13, "1d20+10", "Ingerido. Se vencer a Fortitude, 8d6 de dano e −1 passo; se falhar, metade do dano e sem passo. Ataca toda rodada até ser curado (Treat Injury CD 28).", { effect: "dmg8d6-step1-half" }),
  PO("Quongoosh Essence", "quongoosh-essence", 3, "1d20+5", "Ingerido. Se vencer a Fortitude, −1 passo; ao chegar a \"Indefeso\", fica cego (não inconsciente): todos têm camuflagem contra ele. Ataca toda rodada até ser curado (Treat Injury CD 15).", { effect: "step1" }),
  PO("Trihexalon", "trihexalon", 15, "1d20+20", "Contato (pó). Se vencer a Fortitude, 10d6 de dano e −2 passos; se falhar, metade do dano e −1 passo. Ataca toda rodada até ser curado (Treat Injury CD 30). Dano total desintegra o membro em contato.", { effect: "dmg10d6-step2-half1" }),
  PO("Falsin's Rot (doença)", "falsins-rot", 7, "1d20+10", "Fungo de Nyriaan. Se vencer a Fortitude, 1d8 de dano e −1 passo persistente; repete a cada dia sem tratamento. Quem fica em −3 passos por dois dias perde um membro. Tratamento: Treat Injury CD 20.", { effect: "dmg1d8-step1p", availability: "" })
];
export const misc = [
  EQ("Nyriaan Spice", "nyriaan-spice", "medical", 0, 0, "Consumida: second wind instantâneo, +1 passo na trilha de condição e +5 no Limiar de Dano por 1 hora; sensíveis à Força recebem +5 em Use the Force com farseeing. Depois: −5 em Sabedoria por 4 horas. (Usar o item aplica os efeitos.)", { special: "nyriaanSpice", availability: "illegal", img: "icons/consumables/potions/bottle-round-corked-orange.webp" })
];
