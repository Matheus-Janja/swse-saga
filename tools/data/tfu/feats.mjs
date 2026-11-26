// The Force Unleashed Campaign Guide — Cap. 2: feats (Tabela 2-1), habilidades Unleashed (Tabela 2-2) e destinos. Textos resumidos.
const SRC = "The Force Unleashed Campaign Guide";
const P = (o = {}) => ({
  text: "", abilities: {}, bab: 0, level: 0, trained: [], feats: [], featsAny: [], talents: [], talentsAny: [],
  talentTrees: { trees: [], count: 0 }, forceTalents: 0, forceTechniques: 0, forcePowers: [], sameChoice: "",
  species: [], sizes: [], darkSide: "", nonDroid: false, droidOnly: false, locomotion: [], appendage: false, ...o
});
const feat = (name, key, benefit, pre = {}, o = {}) => ({
  name, type: "feat", img: o.img ?? "icons/skills/melee/strike-sword-steel-yellow.webp",
  system: { key, description: `<p>${benefit}</p>`, source: SRC, prerequisites: P(pre), choice: { type: o.choice ?? "", value: "", options: [] }, repeatable: false,
    modifiers: [], rerolls: o.rerolls ?? [], grantedBy: "" },
  folder: o.folder ?? SRC
});
const F = (text, ...k) => ({ text, feats: k });
const RAGE = { text: "traço de espécie Rage" };

const UF = "Habilidades Unleashed (Force Unleashed)";
const UIMG = "icons/magic/lightning/bolt-strike-forked-yellow.webp";
const UNOTE = " <em>Habilidade Unleashed: não é escolhida como feat; quem tem o feat Unleashed a ativa gastando 1 Ponto de Destino, se cumprir os pré-requisitos.</em>";
const U = (name, key, benefit, pre = {}) => feat(name, key, benefit + UNOTE, pre, { folder: UF, img: UIMG });
const UL = (text, ...k) => ({ text: `Feat Unleashed${text ? ", " + text : ""}`, feats: ["unleashed", ...k] });

export default [
  feat("Advantageous Attack", "advantageous-attack", "Ao acertar um inimigo que ainda não agiu no combate, soma o nível heroico inteiro ao dano (em vez da metade).", { text: "BBA +1", bab: 1 }),
  feat("Advantageous Cover", "advantageous-cover", "Com cobertura, não sofre dano de ataques de área mesmo que o ataque supere sua Reflexos.", { text: "treinado em Stealth", trained: ["stealth"] }),
  feat("Angled Throw", "angled-throw", "Ao arremessar granadas ou armas semelhantes, pode ricochetear: se o ataque superar Reflexos 15, ignora cobertura e cobertura aprimorada (não total).", { text: "Des 13", abilities: { dex: 13 } }),
  feat("Bad Feeling", "bad-feeling", "Sempre pode fazer uma ação de movimento na rodada surpresa, mesmo surpreso; se não estiver surpreso, ganha essa ação de movimento além das demais."),
  feat("Blaster Barrage", "blaster-barrage", "Ao causar dano a pelo menos um alvo com uma arma em autofire, aliados recebem +2 de circunstância nos ataques em autofire contra esse alvo até o início do seu próximo turno.", F("Coordinated Attack", "coordinated-attack")),
  feat("Controlled Rage", "controlled-rage", "Entra em fúria como ação livre; a fúria termina 1 rodada após você declarar o fim. Não aumenta o número de rodadas de fúria.", RAGE),
  feat("Crossfire", "crossfire", "1/rodada, ao errar um ataque à distância contra um alvo com cobertura leve (dada por outro personagem, criatura ou droide), faz imediatamente o mesmo ataque contra quem fornece a cobertura.", { text: "Point Blank Shot, Precise Shot, BBA +6", bab: 6, feats: ["point-blank-shot", "precise-shot"] }),
  feat("Cunning Attack", "cunning-attack", "+2 nos ataques contra inimigos desprevenidos ou que perderam o bônus de Destreza na Reflexos."),
  feat("Focused Rage", "focused-rage", "Em fúria, pode usar perícias de paciência e concentração (Mechanics, Stealth, Use the Force...) com −5.", { text: "traço Rage, Controlled Rage", feats: ["controlled-rage"] }),
  feat("Improved Bantha Rush", "improved-bantha-rush", "No Bantha Rush, empurra o oponente quadrados extras iguais à metade do mod. de Força (mínimo 2 no total).", { text: "Bantha Rush, For 15, BBA +1", bab: 1, abilities: { str: 15 }, feats: ["bantha-rush"] }),
  feat("Informer", "informer", "Usa o modificador de Perception no lugar do de Gather Information (considerado treinado); pode rerrolar Perception onde rerrolaria Gather Information. Em condições favoráveis, leva metade do tempo.", { text: "treinado em Perception, Skill Focus (Perception)", trained: ["perception"], feats: ["skill-focus"] }),
  feat("Mighty Throw", "mighty-throw", "Soma o bônus de Força (além da Destreza) ao ataque com armas arremessadas e aumenta cada faixa de alcance em quadrados iguais ao mod. de Força.", { text: "For 13", abilities: { str: 13 } }),
  feat("Natural Leader", "natural-leader", "Torna-se líder de uma organização própria (Cap. 4), com escala igual à metade do nível heroico + bônus de Carisma e +10 no próprio escore de organização.", { text: "Car 13", abilities: { cha: 13 } }),
  feat("Powerful Rage", "powerful-rage", "Em fúria, +4 em testes de Força e perícias de Força.", RAGE),
  feat("Rapport", "rapport", "Ao usar Aid Another, dá +2 de intuição adicional em perícias e ataques. Não acumula com Coordinate.", { text: "Sab 13", abilities: { wis: 13 } }),
  feat("Recall", "recall", "Rerrola qualquer teste de Knowledge em que é treinado, ficando com o melhor.", { text: "treinado em uma perícia Knowledge" }),
  feat("Savage Attack", "savage-attack", "Para o grupo de armas escolhido no Double Attack: num ataque total em que o primeiro ataque acerta, os ataques seguintes contra o mesmo alvo causam +1 dado de dano.", { text: "Double Attack com a arma, proficiente com ela", feats: ["double-attack"] }, { choice: "weaponGroup" }),
  feat("Scavenger", "scavenger", "1 hora vasculhando veículos ou objetos: Perception × 30 créditos em matéria-prima para construir um único objeto (uso Build Object de Mechanics). Só uma vez por objeto vasculhado."),
  feat("Strafe", "strafe", "Ao atacar em autofire, atinge uma linha de 1 × 4 quadrados em vez de uma área 2 × 2. Com jet pack, pode atacar em autofire todos os quadrados sobre os quais voar.", { text: "BBA +1", bab: 1 }),
  feat("Swarm", "swarm", "+1 de circunstância nos ataques corpo a corpo para cada aliado adjacente ao seu alvo.", F("Coordinated Attack", "coordinated-attack")),
  feat("Unleashed", "unleashed", "Dá acesso às habilidades Unleashed (e, com Force Sensitivity, às Force Unleashed do Cap. 5), ativadas gastando 1 Ponto de Destino. Normalmente exige aprovação do Mestre.", { text: "ter um destino (ou destino secreto)" }),

  U("Unleashed Bantha Rush", "unleashed-bantha-rush", "Ao usar Bantha Rush, empurra o alvo 5 quadrados a mais e o derruba.", UL("Bantha Rush", "bantha-rush")),
  U("Unleashed Charge", "unleashed-charge", "Ação padrão: move até o dobro do deslocamento (mín. 2 quadrados) em linha reta, mesmo por terreno obstruído, e faz um ataque total com +5 em cada ataque; −2 na Reflexos até o próximo turno. Aliados não atrapalham. Com Improved Charge pode mudar de rumo; aplica Powerful Charge se o tiver.", UL("")),
  U("Unleashed Cleave", "unleashed-cleave", "Ao reduzir um oponente a 0 PV, faz imediatamente um ataque corpo a corpo extra contra todos os oponentes ao seu alcance.", UL("Cleave", "cleave")),
  U("Unleashed Devastating Attack", "unleashed-devastating-attack", "Até o início do seu próximo turno, todo ataque (simples ou num ataque total) é tratado como se superasse o Limiar de Dano do alvo.", UL("Devastating Attack")),
  U("Unleashed Extreme Effort", "unleashed-extreme-effort", "Ao usar Extreme Effort, o bônus vira +20.", UL("Extreme Effort")),
  U("Unleashed Firepower", "unleashed-firepower", "Ação padrão: dispara contra até cinco alvos ao alcance da arma à distância com uma única jogada de ataque comparada à Reflexos de cada um e uma única jogada de dano. Precisa de munição para cada alvo; mirar não ajuda.", UL("")),
  U("Unleashed Ignite Fervor", "unleashed-ignite-fervor", "Ao usar Ignite Fervor, o bônus de dano vale para todos os aliados em linha de visão.", UL("Ignite Fervor")),
  U("Unleashed Keen Shot", "unleashed-keen-shot", "Ao fazer um ataque à distância, ignora toda cobertura até o início do seu próximo turno.", UL("Keen Shot")),
  U("Unleashed Mighty Swing", "unleashed-mighty-swing", "Ao usar Mighty Swing: +5 no ataque e no dano e um ataque de derrubar automático (como Trip), também com +5 no teste resistido.", UL("Mighty Swing", "mighty-swing")),
  U("Unleashed Penetrating Attack", "unleashed-penetrating-attack", "Ignora toda a redução de dano dos alvos até o início do seu próximo turno.", UL("Penetrating Attack")),
  U("Unleashed Rage", "unleashed-rage", "No início da fúria: +10 em ataques e dano corpo a corpo e +5 na Fortitude. Ao fim, −2 passos persistentes na trilha, até descansar 20 minutos sem esforço.", UL("traço de espécie Rage")),
  U("Unleashed Skirmisher", "unleashed-skirmisher", "Ao receber o benefício de Skirmisher num ataque, o ataque é um crítico automático e o dano base aumenta em um valor igual aos quadrados movidos.", UL("Skirmisher")),
  U("Unleashed Sneak Attack", "unleashed-sneak-attack", "Num ataque com Sneak Attack: +5 no ataque e +5d6 de dano extra (até 6 quadrados para ataques à distância). Acumula com o Sneak Attack.", UL("Sneak Attack")),
  U("Unleashed Strafe", "unleashed-strafe", "Ao usar Strafe, o ataque atinge uma área de 4 × 3 quadrados.", UL("arma com autofire", "strafe")),
  U("Unleashed Whirlwind Attack", "unleashed-whirlwind-attack", "Ao usar Whirlwind Attack: +5 no ataque e derruba todos os alvos que sofrerem dano.", UL("Whirlwind Attack", "whirlwind-attack")),

  // Force Unleashed (Cap. 5): exigem também Force Sensitivity.
  U("Unleashed Battle Meditation", "unleashed-battle-meditation", "Ao usar Battle Meditation, os bônus valem para todos os aliados no mesmo sistema estelar.", UL("Force Sensitivity, Battle Meditation", "force-sensitivity")),
  U("Unleashed Battle Strike", "unleashed-battle-strike", "Ao usar battle strike, o próximo ataque corpo a corpo, se acertar, também move o alvo −2 passos na trilha, supere ou não o Limiar.", UL("Force Sensitivity, battle strike", "force-sensitivity")),
  U("Unleashed Corruption", "unleashed-corruption", "Ao causar dano com corruption, o alvo sofre a metade adicional a cada rodada por 5 rodadas (em vez de 1).", UL("Force Sensitivity, corruption", "force-sensitivity")),
  U("Unleashed Dark Rage", "unleashed-dark-rage", "Ao usar dark rage, +10 de fúria nos ataques e no dano corpo a corpo pelo resto do encontro.", UL("Force Sensitivity, dark rage", "force-sensitivity")),
  U("Unleashed Force Blast", "unleashed-force-blast", "Ao usar Force blast, multiplica o dano por 2 (afeta até veículos e naves).", UL("Force Sensitivity, Force blast", "force-sensitivity")),
  U("Unleashed Force Grip", "unleashed-force-grip", "Ao causar dano com Force grip, mantém o poder sem concentração (nenhuma ação) por rodadas iguais a metade do mod. de Carisma (mín. 1). Sofrer dano ainda exige testes para manter.", UL("Force Sensitivity, Force grip", "force-sensitivity")),
  U("Unleashed Force Lightning", "unleashed-force-lightning", "Ao usar Force lightning, atinge todas as criaturas num cone de 6 quadrados a partir do seu quadrado.", UL("Force Sensitivity, Force lightning", "force-sensitivity")),
  U("Unleashed Force Storm", "unleashed-force-storm", "Ao usar Force storm, causa 8d6 de dano aos alvos adjacentes pela duração do efeito.", UL("Force Sensitivity, Force storm", "force-sensitivity")),
  U("Unleashed Force Thrust", "unleashed-force-thrust", "Ao usar Force thrust, os alvos não somam o modificador de tamanho ao teste de Força (penalidades de tamanho continuam); a distância empurrada dobra e, ao bater num objeto maior, sofrem 1d6 por quadrado movido.", UL("Force Sensitivity, Force thrust", "force-sensitivity")),
  U("Unleashed Move Object", "unleashed-move-object", "Ao arremessar um objeto ou personagem com move object, multiplica o dano por 2 (afeta até veículos e naves).", UL("Force Sensitivity, move object", "force-sensitivity")),
  U("Unleashed Repulse", "unleashed-repulse", "Ao usar repulse, os alvos não somam o modificador de tamanho ao teste de Força (penalidades continuam); a distância empurrada dobra e, ao bater num objeto maior, sofrem 1d6 por quadrado movido.", UL("Force Sensitivity, repulse", "force-sensitivity"))
];

export const CLASS_BONUS_FEATS = {
  jedi: ["savage-attack", "swarm"],
  noble: ["informer", "rapport", "recall"],
  scoundrel: ["advantageous-attack", "advantageous-cover", "bad-feeling", "crossfire", "cunning-attack", "scavenger"],
  scout: ["advantageous-attack", "advantageous-cover", "bad-feeling", "cunning-attack"],
  soldier: ["advantageous-cover", "angled-throw", "blaster-barrage", "crossfire", "improved-bantha-rush", "mighty-throw", "rapport", "savage-attack", "strafe"]
};
