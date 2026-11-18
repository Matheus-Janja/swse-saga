/**
 * Patente e Privilégio (Galaxy at War, p.73-77) — regras puras.
 * A pontuação de organização = critérios automáticos (Tabela 2-8, os que a ficha consegue verificar)
 * + ajuste manual (capturas, bravura, infrações etc.).
 */

/** Tabela 2-9. min = pontuação mínima; orders = [menores, maiores, de comando]. */
export const RANKS = [
  { min: -Infinity, rank: 0, title: "Recruit", bonus: 0, orders: [0, 0, 0], benefit: "" },
  { min: 4, rank: 1, title: "Private/Trooper", bonus: 0, orders: [0, 0, 0], benefit: "" },
  { min: 6, rank: 1, title: "Corporal", bonus: 0, orders: [0, 0, 0], benefit: "Segundo em comando de esquadrões de até dez soldados." },
  { min: 7, rank: 1, title: "Sergeant", bonus: 1, orders: [1, 0, 0], benefit: "1/encontro, ação rápida: todos os aliados na linha de visão recebem uma ação de movimento adicional." },
  { min: 8, rank: 2, title: "Warrant Officer", bonus: 2, orders: [2, 0, 0], benefit: "1/encontro: +5 de intuição num teste de perícia baseada em Inteligência." },
  { min: 10, rank: 2, title: "Chief Warrant Officer", bonus: 2, orders: [2, 0, 0], benefit: "" },
  { min: 11, rank: 2, title: "Master Warrant Officer", bonus: 3, orders: [2, 0, 0], benefit: "1/encontro: acesso a um droide astromecânico, de protocolo ou médico com até 3 níveis não heroicos." },
  { min: 12, rank: 3, title: "Second Lieutenant", bonus: 4, orders: [1, 1, 0], benefit: "1/encontro: aliados na linha de visão concedem +5 adicional ao ajudar outro até o início do seu próximo turno." },
  { min: 16, rank: 3, title: "First Lieutenant", bonus: 5, orders: [1, 1, 0], benefit: "1/encontro: +1 nas jogadas de ataque de todos os aliados na linha de visão por uma rodada." },
  { min: 19, rank: 3, title: "Captain", bonus: 6, orders: [2, 1, 0], benefit: "" },
  { min: 21, rank: 4, title: "Commander", bonus: 7, orders: [2, 1, 1], benefit: "1/encontro: +2 nas jogadas de ataque de todos os aliados na linha de visão (uma rodada)." },
  { min: 24, rank: 4, title: "Major", bonus: 8, orders: [2, 2, 1], benefit: "" },
  { min: 26, rank: 4, title: "Colonel", bonus: 9, orders: [3, 2, 1], benefit: "1/encontro: um aliado na linha de visão recebe uma ação padrão ou de movimento extra no próximo turno." },
  { min: 28, rank: 5, title: "General/Marshal", bonus: 10, orders: [3, 2, 2], benefit: "Acesso total a uma nave capital por até 1 semana." }
];

const INT_SKILLS = ["knowledgeBureaucracy", "knowledgeGalacticLore", "knowledgeLifeSciences", "knowledgePhysicalSciences", "knowledgeSocialSciences", "knowledgeTactics", "knowledgeTechnology", "mechanics", "useComputer"];

/**
 * @param {object} d  derivados de computeActor (bab, level, classLevels, skills)
 * @param {object} military  {score (ajuste manual), nco}
 * @param {object} f  {has(key), choicesOf(key), trees:Set<string> de talentos possuídos}
 */
export function computeRank(d, military = {}, f) {
  const parts = [];
  const add = (label, n) => { if (n) parts.push({ label, value: n }); };
  add("BBA", d.bab >= 15 ? 3 : d.bab >= 10 ? 2 : d.bab >= 5 ? 1 : 0);
  add("½ nível", Math.floor(d.level / 2));
  const cl = d.classLevels ?? {};
  add("Elite Trooper", cl["elite-trooper"] ? 1 : 0);
  add("Noble", cl.noble ? 1 : 0);
  add("Officer (½ nível)", Math.floor((cl.officer ?? 0) / 2));
  add("Soldier", cl.soldier ? 1 : 0);
  add("Scoundrel", cl.scoundrel ? -1 : 0);
  add("Talento de Leadership", f.trees.has("Leadership") ? 1 : 0);
  const focus = f.choicesOf("skill-focus");
  add("Skill Focus (bureaucracy)", focus.includes("knowledgeBureaucracy") ? 1 : 0);
  add("Skill Focus (tactics)", focus.includes("knowledgeTactics") ? 1 : 0);
  add("Especialista (+15 em perícia de Int)", INT_SKILLS.some(k => (d.skills?.[k]?.total ?? 0) >= 15) ? 1 : 0);
  add(d.skills?.knowledgeTactics?.trained ? "Treinado em Knowledge (tactics)" : "Sem treino em Knowledge (tactics)", d.skills?.knowledgeTactics?.trained ? 1 : -1);
  add("Officer Candidacy Training", f.has("officer-candidacy-training") ? 2 : 0);
  add("Ajuste manual", Number(military.score) || 0);
  let score = parts.reduce((a, p) => a + p.value, 0);
  // Officer: no mínimo segundo-tenente (Rank 3)
  if (cl.officer && score < 12) { parts.push({ label: "Officer (mín. Second Lieutenant)", value: 12 - score }); score = 12; }
  // Suboficiais (onde há distinção): teto 11
  if (military.nco && score > 11) score = 11;
  const r = [...RANKS].reverse().find(x => score >= x.min);
  return { score, parts, ...r };
}
