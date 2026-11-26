// Knights of the Old Republic Campaign Guide — Cap. 2: feats (Tabela 2-1) e combinações de feats. Textos resumidos.
const SRC = "Knights of the Old Republic Campaign Guide";
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
const feat = (name, key, benefit, pre = {}, o = {}) => ({
  name, type: "feat", img: "icons/skills/melee/strike-sword-steel-yellow.webp",
  system: { key, description: `<p>${benefit}</p>`, source: SRC, prerequisites: P(pre), choice: { type: o.choice ?? "", value: "", options: [] }, repeatable: false,
    modifiers: [], rerolls: o.rerolls ?? [], grantedBy: "" },
  folder: SRC
});
const COMBO = "<p><strong>Combinações (KotOR):</strong> Dodge + Charging Fire: a penalidade na Reflexos ao atirar no fim de uma investida cai para −1. Dodge + Running Attack: soma o bônus de Dodge contra ataques de oportunidade durante Running Attack. Dual Weapon Mastery I + Quick Draw: saca ou guarda duas armas com uma ação rápida. Force Training + Improved Disarm: +5 do Improved Disarm no teste de Force disarm. Quick Draw + Weapon Proficiency (lightsabers): saca e acende o sabre com uma ação rápida. Weapon Focus + Weapon Finesse: arma de uma mão com Weapon Focus conta como leve para Weapon Finesse.</p>";

export default [
  feat("Accelerated Strike", "accelerated-strike", "1/encontro, faz um ataque total como ação padrão, usando só armas corpo a corpo em que é proficiente.", { text: "BBA +6", bab: 6 }),
  feat("Conditioning", "conditioning", "Rerrola testes de perícias de Força e Constituição em que é treinado (fica com o segundo). 1/encontro, reação: soma o bônus de Força à Fortitude até o início do seu próximo turno.", { text: "For 13, Con 13", abilities: { str: 13, con: 13 } }),
  feat("Critical Strike", "critical-strike", "Duas ações rápidas consecutivas: a margem de crítico do próximo ataque corpo a corpo aumenta em 1 (19-20; só o 20 natural é acerto automático). Perde o efeito se perder linha de visão ou fizer outra ação antes.", { text: "BBA +9, proficiente na arma corpo a corpo, Weapon Focus", bab: 9 }),
  feat("Force Readiness", "force-readiness", "Pode gastar Pontos da Força como ação livre mesmo fora do seu turno (as demais restrições continuam)."),
  feat("Flurry", "flurry", "Com armas leves ou sabres de luz: −5 na Reflexos e +2 nos ataques corpo a corpo até o início do seu próximo turno. Pode substituir Point Blank Shot como pré-requisito de Elite Trooper.", { text: "Des 13", abilities: { dex: 13 } }),
  feat("Gearhead", "gearhead", "1/encontro, faz um teste de Mechanics ou Use Computer mais rápido: rodada completa vira padrão, padrão vira movimento, movimento vira rápida; múltiplas ações rápidas caem uma; acima de rodada completa, metade do tempo com −10."),
  feat("Implant Training", "implant-training", "Com implante cibernético, não desce um passo extra na trilha de condição (desce um passo a menos quando cair por qualquer motivo).", { text: "Possui implante cibernético" }),
  feat("Improved Rapid Strike", "improved-rapid-strike", "Com arma leve ou sabre e Rapid Strike, −5 no ataque para +2 dados de dano (−10 se Des menor que 13). Não acumula com Rapid Strike nem com Mighty Swing.", { text: "Rapid Strike, arma corpo a corpo leve", feats: ["rapid-strike"] }),
  feat("Increased Agility", "increased-agility", "Deslocamento de escalada e natação +2 quadrados e distância de salto +2; não perde a Destreza na Reflexos escalando.", { text: "Conditioning", feats: ["conditioning"] }),
  feat("Logic Upgrade: Self-Defense", "logic-upgrade-self-defense", "1/encontro, reação: +2 de moral numa Defesa à escolha até o fim do seu próximo turno.", { text: "Só droides", droidOnly: true }),
  feat("Logic Upgrade: Tactician", "logic-upgrade-tactician", "1/encontro, ao ajudar (aid another) uma jogada de ataque, o aliado recebe +5 em vez de +2.", { text: "Só droides, BBA +4", droidOnly: true, bab: 4 }),
  feat("Mandalorian Training", "mandalorian-training", "Com Charging Fire, +2 no ataque à distância no fim da investida e +2 de moral na Vontade até o início do seu próximo turno.", { text: "Charging Fire", feats: ["charging-fire"] }),
  feat("Poison Resistance", "poison-resistance", "+5 na Fortitude contra ataques de veneno; se o veneno acertar, sofre só metade do dano.", { text: "Con 13", abilities: { con: 13 } }),
  feat("Power Blast", "power-blast", "Ação rápida antes de atacar: subtrai um número (até o BBA) das jogadas de ataque à distância e soma ao dano até o início do seu próximo turno (não vale para área nem contra objetos/veículos). Com For menor que 13, −5 nos ataques com armas não veiculares."),
  feat("Quick Skill", "quick-skill", "1/encontro, escolhe 10 num teste de perícia treinada mesmo apressado (salvo se a perícia proibir); ou escolhe 20 numa perícia treinada na metade do tempo normal."),
  feat("Republic Military Training", "republic-military-training", "1/encontro, reação: RD 10 contra um ataque se você tem cobertura contra o atacante (mesmo que ele mire para ignorar a cobertura)."),
  feat("Sith Military Training", "sith-military-training", "1/encontro, reação ao reduzir um alvo a 0 PV ou exceder o Limiar dele: inimigos a até 6 quadrados sofrem −2 nas Defesas até o fim do seu próximo turno. Afeta a mente."),
  feat("Sniper Shot", "sniper-shot", "Com armas à distância (exceto pesadas e de veículo) em que é proficiente: +2 no ataque e −5 na Reflexos até o início do seu próximo turno.", { text: "Proficiente na arma à distância" }),
  feat("Tumble Defense", "tumble-defense", "Quando alguém tenta passar (tumble) por um quadrado que você ameaça com arma corpo a corpo, soma seu BBA à CD de Acrobatics; se falhar, você faz ataque de oportunidade. Não vale desprevenido.", { text: "Proficiente na arma corpo a corpo" }),
  feat("Withdrawal Strike", "withdrawal-strike", "Escolha uma arma exótica ou grupo corpo a corpo: com ela, inimigos adjacentes não podem fazer withdraw dos quadrados que você ameaça (ainda podem usar Acrobatics para passar).", { text: "BBA +5, proficiente na arma corpo a corpo", bab: 5 }, { choice: "weaponGroup" })
].map((f, i) => (i === 0 ? { ...f, system: { ...f.system, description: f.system.description + COMBO } } : f));

export const CLASS_BONUS_FEATS = {
  jedi: ["accelerated-strike", "critical-strike", "force-readiness", "flurry", "improved-rapid-strike", "tumble-defense", "withdrawal-strike"],
  noble: ["flurry", "quick-skill"],
  scoundrel: ["gearhead", "implant-training", "poison-resistance", "quick-skill", "sniper-shot"],
  scout: ["conditioning", "gearhead", "increased-agility", "poison-resistance"],
  soldier: ["accelerated-strike", "conditioning", "critical-strike", "flurry", "improved-rapid-strike", "increased-agility", "power-blast", "sniper-shot", "tumble-defense", "withdrawal-strike"]
};
