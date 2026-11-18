import { SWSE, SYSTEM_ID } from "../config.mjs";

/**
 * Opções possíveis para a escolha de um feat/talento (Weapon Focus, Skill Focus, etc.).
 * @param {object} p  perfil/ator: precisa de items (ou feats/talents) para filtrar sameChoice
 * @returns {Promise<{value:string,label:string}[]>}
 */
export async function choiceOptions(actor, itemData, profile = null) {
  const L = k => game.i18n.localize(k);
  const type = itemData.system.choice?.type;
  let opts = [];
  if (type === "weaponGroup") {
    opts = Object.entries(SWSE.weaponGroups).filter(([k]) => k !== "exotic").map(([k, v]) => ({ value: k, label: L(v) }));
    opts.push(...(await exoticWeapons()).map(w => ({ value: w.key, label: `${w.name} (${L("SWSE.WeaponGroup.exotic")})` })));
  } else if (type === "weapon") {
    opts = (await exoticWeapons()).map(w => ({ value: w.key, label: w.name }));
  } else if (type === "skill") {
    opts = Object.entries(SWSE.skills).map(([k, v]) => ({ value: k, label: L(v.label) }));
  } else if (type === "forcePower") {
    const powers = actor?.items.filter(i => i.type === "forcePower") ?? [];
    opts = powers.map(p => ({ value: p.system.key, label: p.name }));
    if (!opts.length) {
      const pack = game.packs.get(`${SYSTEM_ID}.force-powers`);
      const idx = await pack?.getIndex({ fields: ["system.key", "type"] });
      opts = (idx?.contents ?? []).filter(e => e.type === "forcePower").map(e => ({ value: e.system.key, label: e.name }));
    }
  } else if (type === "defense") {
    opts = Object.entries(SWSE.defenses).map(([k, v]) => ({ value: k, label: L(v) }));
  }
  // Restringe a escolhas que o personagem já tem no feat/talento exigido (ex.: Weapon Specialization)
  const same = itemData.system.prerequisites?.sameChoice;
  if (same) {
    const have = profile
      ? [...profile.feats, ...profile.talents].filter(f => f.key === same).map(f => f.choice)
      : (actor?.featureChoices(same) ?? []);
    if (have.length) opts = opts.filter(o => have.includes(o.value));
  }
  return opts;
}

let _exotic = null;
async function exoticWeapons() {
  if (_exotic) return _exotic;
  const pack = game.packs.get(`${SYSTEM_ID}.weapons`);
  const idx = await pack?.getIndex({ fields: ["system.key", "system.group"] });
  _exotic = (idx?.contents ?? []).filter(e => e.system?.group === "exotic").map(e => ({ key: e.system.key, name: e.name }));
  return _exotic;
}

/** Diálogo para escolher o valor. Retorna string ou null se cancelado. */
export async function promptChoice(actor, itemData, profile = null) {
  const L = k => game.i18n.localize(k);
  const type = itemData.system.choice?.type;
  if (!type) return "";
  const opts = await choiceOptions(actor, itemData, profile);
  const field = type === "text" || !opts.length
    ? `<input type="text" name="choice" value="" autofocus>`
    : `<select name="choice">${opts.map(o => `<option value="${o.value}">${o.label}</option>`).join("")}</select>`;
  const res = await foundry.applications.api.DialogV2.wait({
    window: { title: `${itemData.name}: ${L("SWSE.Choice.prompt")}` },
    content: `<div class="swse-dialog"><p>${L(SWSE.choiceTypes[type] ?? "SWSE.Choice.prompt")}</p><div class="form-group">${field}</div></div>`,
    buttons: [{ action: "ok", label: "OK", default: true, callback: (e, b) => b.form.elements.choice.value }],
    rejectClose: false
  });
  return res ?? null;
}
