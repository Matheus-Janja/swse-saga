/**
 * Desafios de perícia (Galaxy of Intrigue, Cap. 2) — regras puras.
 * O estado fica numa configuração do mundo (escrita só pelo Mestre).
 */

export const DC_CATEGORIES = ["easy", "medium", "moderate", "hard", "heroic"];

/** Tabela 2-1: CDs por ND do desafio. [ND mínimo, fácil, média, moderada, difícil, heroica] */
const DC_TABLE = [
  [1, 13, 18, 23, 26, 31], [2, 14, 19, 24, 27, 32], [4, 16, 21, 26, 29, 34], [6, 17, 22, 27, 30, 35],
  [8, 18, 23, 28, 32, 37], [10, 19, 24, 29, 33, 38], [12, 21, 26, 31, 35, 40], [14, 22, 27, 32, 36, 41],
  [15, 22, 27, 32, 37, 42], [16, 23, 28, 33, 38, 43], [18, 24, 29, 34, 39, 44], [20, 26, 31, 36, 41, 46]
];

export function dcRow(cl) {
  const c = Math.max(1, Math.min(20, Number(cl) || 1));
  return [...DC_TABLE].reverse().find(r => c >= r[0]);
}

/** CD de uma linha de perícia: número fixo, categoria (com o deslocamento do efeito Degenerating) ou "opposed". */
export function dcFor(state, dc) {
  if (dc === "opposed" || dc === "" || dc === null || dc === undefined) return null;
  if (typeof dc === "number" || /^\d+$/.test(String(dc))) return Number(dc) + (state.effects?.degenerating ? 5 * (state.shift || 0) : 0);
  let idx = DC_CATEGORIES.indexOf(dc);
  if (idx < 0) return null;
  if (state.effects?.degenerating) idx += state.shift || 0;
  idx = Math.max(0, Math.min(DC_CATEGORIES.length - 1, idx));
  return dcRow(state.cl)[idx + 1];
}

export const COMPLEXITY = { 1: 5, 2: 8, 3: 11 };

export function newChallenge(o = {}) {
  return {
    active: true, name: "Desafio de perícia", cl: 1, complexity: 1, successesNeeded: 5, maxFailures: 3,
    successes: 0, failures: 0, shift: 0, rounds: 0, timedRounds: 0, reveal: true,
    effects: {}, skills: [], log: [], outcome: null, notes: "", success: "", failure: "",
    leading: {}, learn: null, ...structuredClone(o)
  };
}

/**
 * Resolve um teste no desafio.
 * @param {object} state
 * @param {object} c { total, dc, actorId, actorName, skill, skillLabel, features:Set<string>, fp }
 * @param {object} [choices] { recovery: boolean (trocar o sucesso por remover uma falha), secondEffort: boolean }
 * @returns {{state, entry}}
 */
export function resolveCheck(state, c, choices = {}) {
  const s = structuredClone(state);
  const fx = s.effects ?? {};
  const has = k => c.features?.has?.(k);
  let total = Number(c.total) || 0;
  const notes = [];
  // Leading Skill: +2 no próximo teste do mesmo herói com perícia diferente
  const lead = s.leading?.[c.actorId];
  if (lead && lead !== c.skill) { total += 2; notes.push("Leading Skill +2"); }
  if (s.leading) delete s.leading[c.actorId];
  // Learn from Mistakes: +2 para o próximo aliado com outra perícia
  if (s.learn && s.learn.actorId !== c.actorId && s.learn.skill !== c.skill) { total += 2; notes.push("Learn from Mistakes +2"); s.learn = null; }
  const dc = Number(c.dc) || 0;
  const margin = total - dc;
  let succ = 0;
  let fail = 0;
  let result;
  if (margin >= 0) {
    result = "success";
    succ = fx.extremeSuccess && margin >= 10 ? 2 : 1;
    if (succ === 2) notes.push("Extreme Success");
    if (fx.recovery && margin >= 5 && s.failures > 0 && choices.recovery) { succ = 0; fail = -1; notes.push("Recovery: −1 falha"); }
    if (has("leading-skill")) (s.leading ??= {})[c.actorId] = c.skill;
    if (fx.degenerating) s.shift = (s.shift || 0) - 1;
  } else {
    result = "failure";
    fail = 1;
    if (fx.closeCall && margin > -5) { fail = 0; notes.push("Close Call"); }
    if (fx.containment || fx.timed || fx.antagonist) { fail = 0; notes.push("sem falha automática"); }
    const catThreshold = has("skill-challenge-catastrophic-avoidance") ? -15 : -10;
    if (fail && fx.catastrophic && margin <= catThreshold) { fail = has("skill-challenge-catastrophic-avoidance") ? 1 : 2; notes.push("Catastrophic Failure"); }
    if (fail && fx.secondEffort && choices.secondEffort) { fail = 0; succ = 1; result = "success"; notes.push("Second Effort"); }
    if (fail && has("learn-from-mistakes")) s.learn = { actorId: c.actorId, skill: c.skill };
    if (fail && fx.degenerating) { s.shift = (s.shift || 0) + fail; fail = 0; notes.push("Degenerating: CDs sobem"); }
    if (fail && has("guaranteed-boon") && c.fp) notes.push("Guaranteed Boon: Ponto da Força recuperado");
    if (fail && has("try-your-luck")) notes.push("Try Your Luck: um aliado rola 2 dados na próxima falha com esta perícia");
  }
  s.successes = Math.max(0, s.successes + succ);
  s.failures = Math.max(0, s.failures + fail);
  const entry = { actor: c.actorName ?? "", skill: c.skillLabel ?? c.skill ?? "", total, dc, result, succ, fail: Math.max(fail, 0), notes };
  s.log = [entry, ...(s.log ?? [])].slice(0, 40);
  s.outcome = evaluateOutcome(s);
  return { state: s, entry, refundFP: result === "failure" && fail > 0 && has("guaranteed-boon") && !!c.fp };
}

export function evaluateOutcome(s) {
  if (s.successes >= s.successesNeeded) return "success";
  if (!s.effects?.degenerating && s.failures >= s.maxFailures) return "failure";
  if (s.effects?.timed && s.timedRounds > 0 && s.rounds > s.timedRounds) return "failure";
  if (s.effects?.degenerating && s.endCategory) {
    const idx = DC_CATEGORIES.indexOf(s.endCategory);
    if (idx >= 0 && (s.shift || 0) >= idx) return "failure";
  }
  return null;
}

/** XP: complexidade × oponente do ND do desafio (o valor por oponente vem da tabela do Livro Básico). */
export const challengeXpOpponents = s => Number(s.complexity) || Math.ceil((s.successesNeeded || 5) / 4);

/** Exemplos do Cap. 2 (CDs e efeitos; textos de sucesso/falha resumidos). */
export const PRESETS = {
  kessel: { name: "Escape from Kessel", cl: 8, complexity: 2, effects: { closeCall: true, degreesFailure: true },
    skills: [["perception", 18], ["persuasion", 23], ["stealth", 18], ["survival", 28]],
    success: "Roubam a nave no pouso e saltam para o hiperespaço.", failure: "Encurralados pelos guardas colicoides: combate difícil. Cada falha reduz o número de prisioneiros que escapam." },
  bunker: { name: "Breaching the Bunker", cl: 2, complexity: 1, effects: { timed: true }, timedRounds: 10,
    skills: [["knowledgeTechnology", 14], ["mechanics", 19], ["persuasion", 24], ["useComputer", 19]],
    success: "Após 2 sucessos as portas abrem; com o desafio, obtêm os dados.", failure: "Chegam reforços: seis stormtroopers ND 1." },
  podrace: { name: "The Podrace (3 voltas)", cl: 6, complexity: 3, effects: { degreesFailure: true, extremeSuccess: true, recovery: true },
    skills: [["initiative", 22], ["knowledgeTactics", 17], ["perception", 22], ["pilot", 17], ["mechanics", 22], ["stealth", 27], ["acrobatics", 27], ["deception", 22], ["useComputer", 17]],
    notes: "Volta 1 (até 4 sucessos): Initiative 22, K(tactics) 17, Perception 22, Pilot 17. Volta 2 (até 7): Mechanics 22, Pilot 17, Stealth 27. Volta 3: Acrobatics 27 (22 se infiltrou na volta 2), Deception 22, Pilot 27 (17 após sucesso em Use Computer), Use Computer 17; Second Effort (−1 passo no pod).",
    success: "Posição final pelas falhas: 0 = 1º, 1 = 2º, 2 = 3º.", failure: "3 falhas: o pod bate (ou termina em 7º na volta final)." },
  asteroids: { name: "Asteroid Field Escape", cl: 9, complexity: 1, effects: { catastrophic: true, degreesSuccess: true, initiative: true },
    skills: [["knowledgePhysicalSciences", 18], ["mechanics", 23], ["pilot", 28]],
    notes: "Artilheiros podem atirar contra Reflexos 23 (dano mínimo 2d10×2). Cada sucesso dá +2 de circunstância no próximo ataque de um artilheiro. Falha catastrófica só no Pilot.",
    success: "Despistam os caças e atravessam o campo.", failure: "A nave é abatida ou cai num asteroide." },
  infiltration: { name: "Covert Infiltration", cl: 12, complexity: 2, effects: { recovery: true },
    skills: [["acrobatics", 21], ["deception", 26], ["stealth", 26], ["useComputer", 21]],
    success: "Chegam ao destino sem alarmes.", failure: "Chegam, mas são confrontados pelos guardas e os alarmes soam." },
  interrogation: { name: "Interrogation", cl: 3, complexity: 1, effects: { containment: true },
    skills: [["deception", 19], ["persuasion", 24], ["useTheForce", 24]],
    notes: "Containment: só há falha quando todos agem e ninguém obtém sucesso (registre manualmente).",
    success: "Descobrem a informação.", failure: "O prisioneiro resiste; não dirá mais nada." },
  investigation: { name: "Investigation", cl: 5, complexity: 2, effects: { closeCall: true, degreesSuccess: true },
    skills: [["deception", 26], ["gatherInformation", 16], ["knowledgeGalacticLore", 16], ["useComputer", 21]],
    notes: "A cada 2 sucessos, uma informação nova sobre o alvo.", success: "Sabem tudo o que precisam.", failure: "Não descobrem o necessário e os inimigos percebem a investigação." },
  negotiation: { name: "Negotiation", cl: 12, complexity: 2, effects: { antagonist: true, opposedDC: true, recovery: true },
    skills: [["deception", "opposed"], ["knowledgeGalacticLore", 26], ["knowledgeSocialSciences", 31], ["persuasion", "opposed"], ["useTheForce", "opposed"]],
    notes: "Deception, Persuasion e Use the Force contra a Vontade do senador. Antagonista: a cada rodada, o assessor faz um teste contra a Vontade do senador; cada sucesso dele = 1 falha.",
    success: "O senador vira espião da Aliança.", failure: "O senador chama os guardas e o ISB é alertado." },
  overland: { name: "Overland Travel", cl: 4, complexity: 3, effects: { degenerating: true, extremeSuccess: true, individualEffort: true }, endCategory: "heroic",
    skills: [["endurance", "easy"], ["knowledgeLifeSciences", "easy"], ["knowledgePhysicalSciences", "easy"], ["perception", "medium"], ["survival", "easy"], ["treatInjury", "medium"]],
    notes: "Cada herói precisa de 3 sucessos. Cada falha sobe as CDs um passo e cada sucesso desce; falham quando todas chegam a 34 (heroica).",
    success: "Chegam em segurança.", failure: "Perdidos: cada herói perde um second wind e ganha uma condição persistente até 8 horas de descanso em local civilizado." },
  debris: { name: "Searching the Debris Field", cl: 8, complexity: 2, effects: { degreesFailure: true, extremeSuccess: true },
    skills: [["mechanics", 23], ["perception", 23], ["pilot", 23], ["useComputer", 18]],
    notes: "Cada falha: colisão com detrito Colossal, 8d6+10 de dano na nave.", success: "Acham e recolhem o objeto.", failure: "Não acham o objeto a tempo." },
  holonet: { name: "Slicing the HoloNet", cl: 11, complexity: 1, effects: { opposedDC: true },
    skills: [["deception", 24], ["knowledgeBureaucracy", 19], ["useComputer", "opposed"]],
    notes: "Use Computer contra o droide antislicer (Use Computer +18).", success: "Acessam a HoloNet.", failure: "As autoridades são alertadas e o Império caça os slicers." },
  smuggling: { name: "Smuggling Contraband", cl: 4, complexity: 3, effects: { closeCall: true },
    skills: [["deception", 21], ["perception", 21], ["persuasion", 26], ["pilot", 16], ["stealth", 16], ["useComputer", 16]],
    success: "Entregam a carga sem serem pegos.", failure: "As autoridades descobrem a carga e tentam apreendê-la." },
  speederChase: { name: "Speeder Bike Chase", cl: 8, complexity: 3, effects: { containment: true, opposedDC: true, restricted: true },
    skills: [["knowledgeGalacticLore", 28], ["perception", 23], ["pilot", 18], ["stealth", "opposed"], ["useComputer", 32]],
    notes: "K(galactic lore) 23 para quem conhece a cidade. Proibidas: Gather Information, Survival, Swim, Treat Injury.", success: "Capturam o criminoso.", failure: "O criminoso escapa." },
  tactical: { name: "Tactical Leadership", cl: 14, complexity: 1, effects: { antagonist: true, opposedDC: true },
    skills: [["deception", 27], ["knowledgeTactics", "opposed"], ["perception", 22]],
    success: "Aliados na batalha: +2 de circunstância em ataques e Defesas até o fim da batalha.", failure: "Os inimigos recebem esse bônus." },
  minefield: { name: "Traversing the Minefield", cl: 10, complexity: 1, effects: { degreesFailure: true, degreesSuccess: true, initiative: true },
    skills: [["knowledgeTechnology", 19], ["perception", 19], ["useTheForce", 24]],
    notes: "Cada falha detona uma mina adjacente; cada sucesso revela 3 minas.", success: "Todas as minas ficam visíveis.", failure: "Precisam cruzar arriscando minas ocultas." },
  sabotage: { name: "Sabotage Mission", cl: 6, complexity: 2, effects: { changingObjectives: true, closeCall: true },
    skills: [["deception", 22], ["knowledgeTechnology", 17], ["stealth", 22], ["useComputer", 22], ["mechanics", 22], ["perception", 22], ["pilot", 17], ["useTheForce", 27]],
    notes: "Fase 1 (até 4 sucessos): Deception, K(technology), Stealth, Use Computer; Close Call. Fase 2: Mechanics, Perception, Pilot (só com nave), Use the Force; Falha Catastrófica e cada perícia uma vez. Cada falha: combate contra patrulha de droides (ND 6).",
    success: "Fogem antes de a nave explodir.", failure: "Presos na nave que cai." }
};

export function presetState(key) {
  const p = PRESETS[key];
  if (!p) return newChallenge();
  return newChallenge({
    name: p.name, cl: p.cl, complexity: p.complexity, successesNeeded: COMPLEXITY[p.complexity] ?? 5,
    effects: { ...p.effects }, timedRounds: p.timedRounds ?? 0, endCategory: p.endCategory ?? null,
    skills: p.skills.map(([skill, dc]) => ({ skill, dc })), notes: p.notes ?? "", success: p.success ?? "", failure: p.failure ?? ""
  });
}
