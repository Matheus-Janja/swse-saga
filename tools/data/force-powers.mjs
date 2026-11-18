// Poderes da Força do Livro Básico (Cap. 6), com erratas aplicadas. Efeitos resumidos.
// damage: "tier" = rola o primeiro "XdY" do maior nível de CD alcançado.
const fp = (name, key, o) => ({
  name, type: "forcePower", img: o.img ?? "icons/magic/lightning/bolt-strike-blue.webp",
  system: {
    key, descriptors: [], time: "", target: "", defense: "", dcs: [], special: "", uses: 1, spent: 0, damage: "",
    ...o, description: `<p>${o.description}</p>`
  }
});
const dc = (n, text) => ({ dc: n, text });

export default [
  fp("Battle Strike", "battle-strike", {
    description: "Você usa a Força para aprimorar sua habilidade em combate.",
    time: "Ação rápida", target: "Você",
    dcs: [dc(15, "+1 de bônus da Força no próximo ataque antes do fim do seu próximo turno e +1d6 de dano se acertar (errata)."), dc(20, "Como CD 15, mas +2d6 de dano."), dc(25, "Como CD 15, mas +3d6 de dano.")],
    special: "Gaste um Ponto da Força para +2d6 de dano adicional no próximo ataque."
  }),
  fp("Dark Rage", "dark-rage", {
    description: "Você é tomado pela fúria enquanto o lado sombrio flui por você.",
    descriptors: ["darkSide"], time: "Ação rápida", target: "Você", img: "icons/magic/fire/flame-burning-skull-orange.webp",
    dcs: [dc(15, "+2 de fúria em ataques e dano corpo a corpo até o fim do turno."), dc(20, "Como CD 15, mas +4."), dc(25, "Como CD 15, mas +6.")],
    special: "Durante a fúria não pode usar perícias de paciência/concentração. Gaste um Ponto da Força para estender até o fim do encontro."
  }),
  fp("Farseeing", "farseeing", {
    description: "Você tem uma impressão vaga e momentânea do que acontece ao redor de alguém em outro lugar.",
    time: "Rodada completa", target: "Uma criatura que você conheça ou tenha encontrado", defense: "will", img: "icons/magic/perception/eye-ringed-glow-yellow.webp",
    dcs: [],
    special: "Se o resultado ≥ Vontade do alvo (30 se morto), sabe se está vivo e tem noção vaga do que faz e sente; se falhar, não pode tentar de novo no mesmo alvo por 24 h. Gaste um Ponto da Força para uma imagem clara dos arredores (6 quadrados)."
  }),
  fp("Force Disarm", "force-disarm", {
    description: "Você arranca a arma das mãos de um oponente com a Força.",
    descriptors: ["telekinetic"], time: "Ação padrão", target: "Um alvo a até 12 quadrados e em linha de visão (errata)", defense: "reflex", img: "icons/magic/air/wind-tornado-funnel-blue.webp",
    dcs: [],
    special: "Faça uma tentativa de desarmar usando o teste de Use the Force contra a Defesa de Reflexos do alvo (ver Desarmar). Se a tentativa falhar, o alvo não ganha ataque livre contra você."
  }),
  fp("Force Grip", "force-grip", {
    description: "Você estrangula ou esmaga um alvo com a Força.",
    descriptors: ["telekinetic"], time: "Ação padrão", target: "Um alvo a até 12 quadrados e em linha de visão", defense: "fortitude", damage: "tier", img: "icons/magic/control/hand-glow-teal.webp",
    dcs: [dc(15, "Se ≥ Fortitude: 2d6 de dano e o alvo só pode fazer uma ação rápida no próximo turno; senão metade do dano e não pode manter (errata)."), dc(20, "Como CD 15, mas 4d6 de dano."), dc(25, "Como CD 15, mas 6d6 de dano."), dc(30, "Como CD 15, mas 8d6 de dano.")],
    special: "Alvos maiores que Médio somam modificador de tamanho à Fortitude (Grande +5, Enorme +10, Imenso +20, Colossal +50). Manter é ação padrão com novo teste; ao sofrer dano, Use the Force CD 15 + dano para manter."
  }),
  fp("Force Lightning", "force-lightning", {
    description: "Raios de energia da Força saem das suas mãos.",
    descriptors: ["darkSide"], time: "Ação padrão", target: "Um alvo a até 6 quadrados e em linha de visão", defense: "reflex", damage: "tier", img: "icons/magic/lightning/bolt-forked-purple.webp",
    dcs: [dc(15, "Se ≥ Reflexos: 4d6 de dano; senão metade (errata)."), dc(20, "Como CD 15, mas 6d6."), dc(25, "Como CD 15, mas 8d6."), dc(30, "Como CD 15, mas 10d6.")],
    special: "Pode ser desviado com Deflect (metade/nenhum dano)."
  }),
  fp("Force Slam", "force-slam", {
    description: "Uma onda de energia da Força atinge todos à sua frente.",
    descriptors: ["telekinetic"], time: "Ação padrão", target: "Cone de 6 quadrados", defense: "fortitude", damage: "tier", img: "icons/magic/sonic/explosion-shock-wave-teal.webp",
    dcs: [dc(15, "Alvos com Fortitude ≤ resultado sofrem 4d6 e caem; os demais sofrem metade."), dc(20, "Como CD 15, mas 6d6."), dc(25, "Como CD 15, mas 8d6."), dc(30, "Como CD 15, mas 10d6.")],
    special: "Efeito de área. Alvos maiores que Médio somam modificador de tamanho à Fortitude (errata)."
  }),
  fp("Force Stun", "force-stun", {
    description: "Você sobrecarrega os sentidos de um alvo com a Força.",
    time: "Ação padrão", target: "Um alvo a até 12 quadrados e em linha de visão", defense: "fortitude", img: "icons/magic/control/debuff-energy-hold-teal-blue.webp",
    dcs: [],
    special: "Compare com a Fortitude (errata). Se igualar/exceder, o alvo desce −1 passo na trilha de condição, mais −1 para cada 5 pontos acima da Fortitude. Alvos maiores que Médio somam modificador de tamanho à Fortitude."
  }),
  fp("Force Thrust", "force-thrust", {
    description: "Você empurra um alvo com uma rajada de Força.",
    descriptors: ["telekinetic"], time: "Ação padrão", target: "Um alvo a até 12 quadrados e em linha de visão", defense: "fortitude", img: "icons/magic/air/wind-swirl-gray-blue.webp",
    dcs: [],
    special: "Compare com a Fortitude; o alvo soma seu BBA e modificador de tamanho (errata). Se exceder, empurra o alvo 1 quadrado para cada 5 pontos acima; colidir com objetos/criaturas causa dano."
  }),
  fp("Mind Trick", "mind-trick", {
    description: "Você influencia a mente de um alvo com uma sugestão.",
    descriptors: ["mindAffecting"], time: "Ação padrão", target: "Um alvo a até 12 quadrados e em linha de visão", defense: "will", img: "icons/magic/control/hypnosis-mesmerism-swirl.webp",
    dcs: [],
    special: "Compare com a Vontade do alvo. Sucesso permite uma distração momentânea (criar diversão para se esconder) ou uma sugestão razoável e simples; sugestões perigosas ou absurdas exigem resultados maiores. Afeta a mente."
  }),
  fp("Move Object", "move-object", {
    description: "Você move um objeto ou criatura telecineticamente e pode arremessá-lo.",
    descriptors: ["telekinetic"], time: "Ação padrão", target: "Um alvo a até 12 quadrados e em linha de visão (errata)", defense: "will", damage: "tier", img: "icons/magic/earth/projectile-stone-boulder-orange.webp",
    dcs: [dc(15, "Move objeto/criatura Médio ou menor até 6 quadrados; arremessado causa 2d6."), dc(20, "Grande; 4d6."), dc(25, "Enorme; 6d6."), dc(30, "Imenso; 8d6."), dc(35, "Colossal; 10d6.")],
    special: "Criatura resiste se o teste não superar sua Vontade. Para atingir outro alvo com o objeto, compare com a Reflexos dele. Manter é ação padrão; perde ao causar dano (errata)."
  }),
  fp("Negate Energy", "negate-energy", {
    description: "Você absorve e dissipa energia que o atingiria.",
    time: "Reação", target: "Um ataque de energia contra você", img: "icons/magic/defensive/shield-barrier-glowing-blue.webp",
    dcs: [],
    special: "Se o resultado igualar ou exceder o dano do ataque de energia, você nega todo o dano. Gaste um Ponto da Força para recuperar PV iguais ao dano negado (ver livro)."
  }),
  fp("Rebuke", "rebuke", {
    description: "Você absorve ou desvia um poder da Força usado contra você, podendo devolvê-lo.",
    time: "Reação", target: "Um poder da Força dirigido a você", img: "icons/magic/defensive/shield-barrier-deflect-teal.webp",
    dcs: [],
    special: "Se ≥ resultado do poder, você o redireciona sem efeito; se exceder por 5+, pode devolvê-lo ao criador, que sofre o efeito do teste original (errata). O criador pode tentar rebater de volta gastando um uso de rebuke."
  }),
  fp("Sever Force", "sever-force", {
    description: "Você bloqueia o acesso de outro usuário da Força à Força.",
    descriptors: ["lightSide"], time: "Ação padrão", target: "Usuário da Força com Lado Sombrio 1+ a até 12 quadrados", defense: "will", img: "icons/magic/light/beam-rays-yellow.webp",
    dcs: [dc(25, "Se ≥ Vontade: o alvo não pode gastar Pontos da Força por horas iguais à sua Pontuação do Lado Sombrio."), dc(30, "Como CD 25, e o alvo desce −1 passo na trilha de condição cada vez que usa um poder nesse período."), dc(35, "Como CD 25 (errata), mas −2 passos por uso de poder.")],
    special: "Sem efeito em alvos com Lado Sombrio 0. Ponto da Força dobra a duração; Ponto de Destino: dias em vez de horas."
  }),
  fp("Surge", "surge", {
    description: "A Força impulsiona saltos enormes e movimentos rápidos.",
    time: "Ação livre (errata)", target: "Você", img: "icons/magic/movement/trail-streak-impact-blue.webp",
    dcs: [dc(10, "+10 da Força em Jump e +2 quadrados de deslocamento até o próximo turno."), dc(15, "+20 em Jump e +4 quadrados."), dc(20, "+30 em Jump e +6 quadrados.")],
    special: "Conta como corrida para Jump. Ponto da Força: +10 em Jump e +2 quadrados adicionais. Ponto de Destino: +4 quadrados e todo o movimento pode ser salto sem teste (errata)."
  }),
  fp("Vital Transfer", "vital-transfer", {
    description: "Você usa sua própria força vital para curar outra criatura.",
    descriptors: ["lightSide"], time: "Ação padrão", target: "Uma criatura tocada (não você)", img: "icons/magic/life/heart-cross-strong-green.webp",
    dcs: [dc(15, "Cura PV iguais a 2 × nível do alvo."), dc(20, "Cura 3 × nível do alvo."), dc(25, "Cura 4 × nível do alvo.")],
    special: "Você sofre dano igual à metade do que curar (pode curar menos). Ponto da Força: não sofre dano. Ponto de Destino: o alvo também sobe +5 passos na trilha de condição."
  })
];
