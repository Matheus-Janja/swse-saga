/**
 * Seguidores (The Clone Wars Campaign Guide, Cap. 2): cria um PdM seguidor ligado a um herói.
 * O nível acompanha o nível heroico do líder; defesas, PV e BBA saem do modelo (rules/calc.mjs, FOLLOWER_TEMPLATES).
 */
import { SYSTEM_ID } from "../config.mjs";
import { FOLLOWER_TEMPLATES } from "../rules/calc.mjs";

/** Talentos do líder que concedem algo a todos os seguidores. */
const LEADER_GRANTS = {
  "inspire-loyalty": { trained: ["perception"] },
  "reconnaissance-team-leader": { trained: ["perception", "stealth"] },
  "commanding-officer": { feats: ["weapon-proficiency-rifles"] },
  "undying-loyalty": { feats: ["toughness"] },
  "close-combat-assault": { feats: ["point-blank-shot"] },
  "coordinated-tactics": { feats: ["coordinated-attack"] },
  "akk-dog-master": { feats: ["power-attack"] },
  "akk-dog-attack-training": { feats: ["powerful-charge"] }
};
const ABIL = { str: "Força", dex: "Destreza", con: "Constituição", int: "Inteligência", wis: "Sabedoria", cha: "Carisma" };

async function packDocs(name) {
  return (await game.packs.get(`${SYSTEM_ID}.${name}`)?.getDocuments()) ?? [];
}

export async function createFollower(leader = canvas.tokens?.controlled[0]?.actor ?? game.user.character) {
  if (!leader || leader.type !== "character") return ui.notifications.warn("Selecione o token do herói (personagem) que vai liderar o seguidor.");
  const level = leader.system.derived?.heroicLevel || 1;
  const species = (await packDocs("species")).filter(s => !s.system.droid || s.name.startsWith("Chassi")).sort((a, b) => a.name.localeCompare(b.name));
  const skills = Object.entries(game.swse.config.skills).filter(([k]) => k !== "useTheForce");
  const L = k => game.i18n.localize(k);
  const res = await foundry.applications.api.DialogV2.wait({
    window: { title: `Novo seguidor de ${leader.name}` },
    position: { width: 460 },
    content: `<div class="swse-dialog">
      <p>Seguidor de nível ${level} (acompanha o nível heroico de ${leader.name}).</p>
      <div class="form-group"><label>Nome</label><input type="text" name="name" value="Seguidor de ${leader.name}"></div>
      <div class="form-group"><label>Modelo</label><select name="template">${Object.entries(FOLLOWER_TEMPLATES).map(([k, t]) => `<option value="${k}">${t.label}</option>`).join("")}</select></div>
      <div class="form-group"><label>+2 em</label><select name="ability">${Object.entries(ABIL).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select></div>
      <p class="hint">Agressivo: Força ou Constituição · Defensivo: Destreza ou Sabedoria · Utilitário: Inteligência ou Carisma.</p>
      <div class="form-group"><label>Espécie</label><select name="species"><option value="">—</option>${species.map(s => `<option value="${s.uuid}">${s.name}</option>`).join("")}</select></div>
      <div class="form-group"><label>Perícia treinada (utilitário)</label><select name="skill">${skills.map(([k, v]) => `<option value="${k}">${L(v.label ?? v)}</option>`).join("")}</select></div>
    </div>`,
    buttons: [{ action: "ok", label: "Criar", default: true, callback: (e, b) => new foundry.applications.ux.FormDataExtended(b.form).object }],
    rejectClose: false
  });
  if (!res) return;
  const tpl = FOLLOWER_TEMPLATES[res.template];
  const ability = tpl.abilities.includes(res.ability) ? res.ability : tpl.abilities[0];
  if (ability !== res.ability) ui.notifications.info(`O modelo ${tpl.label} só aumenta ${tpl.abilities.map(a => ABIL[a]).join(" ou ")}; usei ${ABIL[ability]}.`);

  // Perícias treinadas e feats: modelo + talentos do líder
  const trained = new Set(tpl.skill ? [tpl.skill] : [res.skill]);
  const featKeys = new Set(["weapon-proficiency-simple", ...tpl.feats]);
  for (const t of leader.items.filter(i => i.type === "talent")) {
    const g = LEADER_GRANTS[t.system.key];
    if (!g) continue;
    (g.trained ?? []).forEach(s => trained.add(s));
    (g.feats ?? []).forEach(f => featKeys.add(f));
  }
  const feats = (await packDocs("feats")).filter(f => featKeys.has(f.system.key)).map(f => f.toObject());
  const items = [...feats];
  if (res.species) {
    const sp = await fromUuid(res.species);
    if (sp) items.push(sp.toObject());
  }
  const abilities = Object.fromEntries(Object.keys(ABIL).map(k => [k, { base: k === ability ? 12 : 10, increase: 0, misc: 0 }]));
  const actor = await Actor.implementation.create({
    name: res.name || `Seguidor de ${leader.name}`, type: "npc", img: `systems/${SYSTEM_ID}/assets/icons/npc.svg`,
    system: {
      abilities, npcLevel: level, challengeLevel: Math.max(1, level - 2),
      skills: Object.fromEntries([...trained].map(k => [k, { trained: true }])),
      follower: { template: res.template, level, leader: leader.id },
      creationComplete: true,
      details: { biography: `<p><strong>Seguidor ${tpl.label}</strong> de ${leader.name}.</p><p>Age na iniciativa do herói e só usa as ações que ele concede (ação padrão: atacar, ajudar, investir, lutar defensivamente, usar habilidade; ação de movimento: mover, sacar arma, manipular item; ação rápida: ativar/soltar item, recuperar; rodada completa: correr). Não tem Pontos da Força nem de Destino; sem feats ou talentos próprios além dos do modelo e dos concedidos pelo líder.</p>` }
    },
    prototypeToken: { actorLink: true, disposition: 1, name: res.name || "Seguidor" },
    items
  });
  ui.notifications.info(`${actor.name} criado (seguidor ${tpl.label.toLowerCase()}, nível ${level}).`);
  actor.sheet.render(true);
  return actor;
}
