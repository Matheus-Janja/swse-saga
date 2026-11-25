/**
 * Esquadrões e unidades de combate em massa (The Clone Wars Campaign Guide, Cap. 7).
 * Cria uma cópia do ator (PdM) já transformada: os ajustes de tamanho, Limiar, ataque e RD vão num efeito
 * permanente "Esquadrão"/"Unidade"; os PV são multiplicados pelo campo de ajuste de PV.
 */
import { SWSE } from "../config.mjs";

const L = k => game.i18n.localize(k);
const ORDER = Object.keys(SWSE.sizes);
const mod = (target, value, type = "untyped") => ({ target, value: String(value), type, label: "", disabled: false });

/** Modificadores para "mudar" de tamanho sem trocar a espécie (diferenças da tabela de tamanhos). */
function sizeShift(from, to) {
  const a = SWSE.sizes[from] ?? SWSE.sizes.medium;
  const b = SWSE.sizes[to] ?? SWSE.sizes.medium;
  return { reflex: b.reflex - a.reflex, stealth: b.stealth - a.stealth, dt: b.dt - a.dt, grapple: b.grapple - a.grapple };
}

/** Regras do quadro: pacote de ajustes por tipo. */
export const SQUAD_KINDS = {
  squad: { label: "Esquadrão (3-4 criaturas)", size: "up1", hp: 2, dt: 10, attack: 4, dr: 0, cl: 2, attrition: false },
  unit: { label: "Unidade de combate em massa", size: "colossal", hp: 4, dt: 0, attack: 0, dr: 15, cl: 6, attrition: true, fortDT: 50 },
  advantaged: { label: "Unidade vantajosa (+1 qualidade)", size: "colossal", hp: 5, dt: 0, attack: 0, dr: 15, cl: 7, attrition: true, fortDT: 50 },
  disadvantaged: { label: "Unidade desvantajosa (−1 qualidade)", size: "colossal", hp: 3, dt: 0, attack: 0, dr: 15, cl: 4, attrition: true, fortDT: 50 }
};

export function attritionNumbers(hp) {
  const step = Math.floor(hp / 4);
  return [hp - step, hp - 2 * step, hp - 3 * step];
}

/** Calcula o pacote de mudanças (puro, testável). */
export function squadChanges({ size = "medium", hpMax = 1, fort = 10, dt = 10 }, kind) {
  const k = SQUAD_KINDS[kind];
  const idx = ORDER.indexOf(size);
  const newSize = k.size === "up1" ? ORDER[Math.min(ORDER.length - 1, idx + 1)] : k.size;
  const sh = sizeShift(size, newSize);
  const hp = hpMax * k.hp;
  // Unidades: Limiar = Fortitude + 50 (substitui o bônus de tamanho)
  const dtDelta = k.fortDT ? (fort + k.fortDT) - dt : sh.dt + k.dt;
  const modifiers = [
    mod("defenses.reflex", sh.reflex), mod("skills.stealth", sh.stealth), mod("grapple", sh.grapple),
    mod("damageThreshold", dtDelta)
  ];
  if (k.attack) modifiers.push(mod("attack.all", k.attack));
  if (k.dr) modifiers.push(mod("damageReduction", k.dr));
  return { newSize, hpBonus: hp - hpMax, hp, modifiers: modifiers.filter(m => Number(m.value) !== 0), attrition: k.attrition ? attritionNumbers(hp) : null, cl: k.cl };
}

const NOTES = {
  squad: "Esquadrão: ataques corpo a corpo são de área (todos os quadrados ao alcance; pode poupar aliados); ataques à distância têm splash 1 (ou +1 de raio); ataques de área causam +2 dados contra o esquadrão; não pode ser agarrado; faz ataques de oportunidade normais (não de área).",
  unit: "Unidade (combate em massa): ocupa 1 quadrado em escala de nave, deslocamento 1 quadrado (escala de nave); ataques corpo a corpo e à distância ganham multiplicador ×2; sofre metade do dano de ataques que não são de área; atrito: cada vez que os PV passam por um número de atrito, desce −1 passo persistente; a 0 PV a unidade se dispersa."
};

/** Cria a cópia transformada no diretório de atores (ao lado do original). */
export async function makeSquad(actor, kind) {
  if (!actor || actor.type === "vehicle") return ui.notifications.warn("Selecione o token de um PdM ou criatura.");
  const d = actor.system.derived ?? {};
  const ch = squadChanges({ size: d.size, hpMax: d.hpMax, fort: d.defenses?.fortitude?.total ?? 10, dt: d.damageThreshold ?? 10 }, kind);
  const k = SQUAD_KINDS[kind];
  const data = actor.toObject();
  delete data._id;
  data.name = `${actor.name} (${kind === "squad" ? "Esquadrão" : "Unidade"})`;
  const hpMisc = (Number(data.system.hp?.misc) || 0) + ch.hpBonus;
  foundry.utils.setProperty(data, "system.hp.misc", hpMisc);
  foundry.utils.setProperty(data, "system.hp.value", ch.hp);
  const tokenSize = { small: 1, medium: 1, large: 2, huge: 3, gargantuan: 4, colossal: 6 }[ch.newSize] ?? 1;
  data.prototypeToken = { ...(data.prototypeToken ?? {}), width: kind === "squad" ? tokenSize : 1, height: kind === "squad" ? tokenSize : 1, name: data.name };
  const extra = ch.attrition ? `<p><strong>Atrito:</strong> ${ch.attrition.join(" / ")} PV · ND ≈ +${ch.cl}</p>` : `<p>ND ≈ +${ch.cl}</p>`;
  const bio = foundry.utils.getProperty(data, "system.details.biography") ?? "";
  foundry.utils.setProperty(data, "system.details.biography", `<p><strong>${k.label}</strong> (tamanho ${L(SWSE.sizes[ch.newSize]?.label ?? "")}).</p><p>${NOTES[kind === "squad" ? "squad" : "unit"]}</p>${extra}${bio}`);
  data.effects = [...(data.effects ?? []), {
    name: k.label, img: "systems/swse-saga/assets/icons/status/buff.svg", disabled: false, statuses: [],
    flags: { "swse-saga": { modifiers: ch.modifiers } }
  }];
  const created = await Actor.implementation.create(data);
  ui.notifications.info(`${created.name} criado.`);
  created.sheet.render(true);
  return created;
}

export async function squadPrompt(actor = canvas.tokens?.controlled[0]?.actor) {
  if (!actor) return ui.notifications.warn("Selecione o token de um PdM.");
  const kind = await foundry.applications.api.DialogV2.wait({
    window: { title: `Esquadrão / Unidade: ${actor.name}` },
    content: `<div class="swse-dialog"><p>Cria uma cópia de <strong>${actor.name}</strong> transformada pelas regras do The Clone Wars Campaign Guide.</p>
      <div class="form-group"><select name="k">${Object.entries(SQUAD_KINDS).map(([key, v]) => `<option value="${key}">${v.label}</option>`).join("")}</select></div></div>`,
    buttons: [{ action: "ok", label: "Criar", default: true, callback: (e, b) => b.form.elements.k.value }],
    rejectClose: false
  });
  if (kind) return makeSquad(actor, kind);
}
