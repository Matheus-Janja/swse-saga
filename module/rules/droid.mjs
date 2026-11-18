/**
 * Regras de droides (Cap. 11) — funções puras.
 */

/** Fator de custo por tamanho (Tabela 11-2). */
export const COST_FACTOR = { fine: 20, diminutive: 10, tiny: 5, small: 2, medium: 1, large: 2, huge: 5, gargantuan: 10, colossal: 20 };

/** Coluna de deslocamento da Tabela 11-3 conforme o tamanho. */
export const sizeBand = size => (["fine", "diminutive", "tiny", "small"].includes(size) ? "small" : size === "medium" ? "medium" : "large");

/** Locomoção padrão de um droide herói (Cap. 11): Médio anda; Pequeno usa esteiras. */
export const BASE_LOCOMOTION = { medium: "walking-locomotion", small: "tracked-locomotion" };
export const FREE_SYSTEMS = ["heuristic-processor", "hand-appendage", "hand-appendage"];
export const DROID_BUDGET = 1000;
export const DROID_POINT_BUY = 21;
export const DROID_ARRAY = [15, 14, 13, 12, 10];

/** Sobretaxa por sistema de locomoção adicional (2º, 3º, 4º, 5º). */
const LOCO_SURCHARGE = [0, 500, 1000, 2000, 5000];

/** Dano desarmado por apêndice e tamanho (Tabela 11-4). */
const APPENDAGE_DAMAGE = {
  small: { probe: null, instrument: "1", tool: "1d2", claw: "1d3", hand: "1d2" },
  medium: { probe: "1", instrument: "1d2", tool: "1d3", claw: "1d4", hand: "1d3" },
  large: { probe: "1d2", instrument: "1d3", tool: "1d4", claw: "1d6", hand: "1d4" }
};
const APPENDAGE_RANK = ["probe", "instrument", "tool", "hand", "claw"];
const DIE_STEPS = ["1", "1d2", "1d3", "1d4", "1d6", "1d8", "1d10", "1d12", "2d8"];

/** Melhor apêndice para ataques desarmados. */
export function bestAppendage(list) {
  return [...list].sort((a, b) => APPENDAGE_RANK.indexOf(b) - APPENDAGE_RANK.indexOf(a))[0] ?? null;
}

/** Dano desarmado de droide com Martial Arts (passos de dado). */
export function droidUnarmedDamage(size, appendage, martialSteps = 0) {
  const base = APPENDAGE_DAMAGE[sizeBand(size)]?.[appendage] ?? "1";
  const idx = Math.max(0, DIE_STEPS.indexOf(base));
  return DIE_STEPS[Math.min(idx + martialSteps, DIE_STEPS.length - 1)];
}

/** Deslocamento de um sistema de locomoção para o tamanho. */
export function locomotionSpeed(sys, size) {
  return Number(sys.locomotion?.[sizeBand(size)]) || 0;
}

/**
 * Custo de um sistema de droide.
 * @param {object} sys       item.system (droidSystem ou armor de droide)
 * @param {string} size
 * @param {object} [ctx]     { locomotionIndex: posição deste sistema de locomoção (0 = primeiro), walkingCost }
 */
export function systemCost(sys, size, ctx = {}) {
  const cf = COST_FACTOR[size] ?? 1;
  const base = Number(sys.costBase) || 0;
  switch (sys.costMode) {
    case "factor": return base * cf;
    case "locomotion": {
      const speed = locomotionSpeed(sys, size);
      const surcharge = (LOCO_SURCHARGE[ctx.locomotionIndex ?? 0] ?? 5000) * cf;
      return (Number(sys.locomotion?.mult) || 0) * cf * speed * speed + surcharge;
    }
    case "locoExtra": return ctx.walkingCost ?? 10 * cf * Math.pow(locomotionSpeed({ locomotion: { small: 4, medium: 6, large: 8 } }, size), 2);
    case "selfDestruct": {
      const dice = { small: 4, medium: 6, large: 8, huge: 10 }[size] ?? 20;
      return dice * 6 * 20;
    }
    default: return base;
  }
}

/** O sistema pode ser instalado neste tamanho? */
export function sizeAllowed(sys, size) {
  const order = ["fine", "diminutive", "tiny", "small", "medium", "large", "huge", "gargantuan", "colossal"];
  if (!sys.minSize) return true;
  return order.indexOf(size) >= order.indexOf(sys.minSize);
}
