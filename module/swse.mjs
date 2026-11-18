/**
 * Star Wars Saga Edition — sistema para Foundry VTT (v13/v14).
 */
import { SWSE, SYSTEM_ID } from "./config.mjs";
import { CharacterData, NpcData } from "./data/actor.mjs";
import { SpeciesData, ClassData, FeatData, TalentData, ForcePowerData, WeaponData, ArmorData, EquipmentData } from "./data/items.mjs";
import { SWSEActor } from "./documents/actor.mjs";
import { SWSEItem } from "./documents/item.mjs";
import { SWSEActorSheet } from "./sheets/actor-sheet.mjs";
import { SWSEItemSheet } from "./sheets/item-sheet.mjs";
import { CharacterCreator } from "./apps/chargen.mjs";
import { LevelUpApp } from "./apps/levelup.mjs";
import { attackWithWeapon } from "./rolls/attack.mjs";
import { onRenderChatMessage, registerSocket, requestDamage } from "./rolls/damage.mjs";
import * as api from "./helpers/api.mjs";

Hooks.once("init", () => {
  console.log(`${SYSTEM_ID} | Inicializando Star Wars Saga Edition`);
  CONFIG.SWSE = SWSE;

  CONFIG.Actor.documentClass = SWSEActor;
  CONFIG.Item.documentClass = SWSEItem;
  CONFIG.Actor.dataModels = { character: CharacterData, npc: NpcData };
  CONFIG.Item.dataModels = {
    species: SpeciesData, class: ClassData, feat: FeatData, talent: TalentData,
    forcePower: ForcePowerData, weapon: WeaponData, armor: ArmorData, equipment: EquipmentData
  };
  CONFIG.Actor.trackableAttributes = {
    character: { bar: ["hp", "forcePoints"], value: ["destinyPoints.value", "darkSide.value", "condition.step"] },
    npc: { bar: ["hp", "forcePoints"], value: ["condition.step"] }
  };
  CONFIG.Combat.initiative = { formula: "1d20 + @skills.initiative.total", decimals: 0 };

  const DSC = foundry.applications.apps.DocumentSheetConfig;
  DSC.unregisterSheet(Actor, "core", foundry.appv1.sheets.ActorSheet);
  DSC.registerSheet(Actor, SYSTEM_ID, SWSEActorSheet, { types: ["character", "npc"], makeDefault: true, label: "SWSE.SheetActor" });
  DSC.unregisterSheet(Item, "core", foundry.appv1.sheets.ItemSheet);
  DSC.registerSheet(Item, SYSTEM_ID, SWSEItemSheet, { makeDefault: true, label: "SWSE.SheetItem" });

  registerSettings();
  registerHandlebars();

  game.swse = {
    config: SWSE,
    CharacterCreator,
    LevelUpApp,
    attackWithWeapon,
    requestDamage,
    openCharacterCreator: actor => new CharacterCreator({ actor }).render({ force: true }),
    openLevelUp: (actor, opts = {}) => new LevelUpApp({ actor, ...opts }).render({ force: true }),
    ...api
  };

  foundry.applications.handlebars.loadTemplates([
    `systems/${SYSTEM_ID}/templates/actor/parts/header.hbs`,
    `systems/${SYSTEM_ID}/templates/actor/parts/main.hbs`,
    `systems/${SYSTEM_ID}/templates/actor/parts/skills.hbs`,
    `systems/${SYSTEM_ID}/templates/actor/parts/combat.hbs`,
    `systems/${SYSTEM_ID}/templates/actor/parts/talents.hbs`,
    `systems/${SYSTEM_ID}/templates/actor/parts/force.hbs`,
    `systems/${SYSTEM_ID}/templates/actor/parts/gear.hbs`,
    `systems/${SYSTEM_ID}/templates/actor/parts/bio.hbs`
  ]);
});

Hooks.once("ready", () => {
  registerSocket();
});

function registerSettings() {
  game.settings.register(SYSTEM_ID, "hpMethod", {
    name: "SWSE.Settings.HpMethod", hint: "SWSE.Settings.HpMethodHint",
    scope: "world", config: true, type: String, default: "roll",
    choices: { roll: "SWSE.Settings.HpRoll", average: "SWSE.Settings.HpAverage", max: "SWSE.Settings.HpMax" }
  });
  game.settings.register(SYSTEM_ID, "abilityMethods", {
    name: "SWSE.Settings.AbilityMethods", hint: "SWSE.Settings.AbilityMethodsHint",
    scope: "world", config: true, type: String, default: "all",
    choices: { all: "SWSE.Settings.MethodsAll", pointBuy: "SWSE.Settings.MethodPointBuy", roll: "SWSE.Settings.MethodRoll", array: "SWSE.Settings.MethodArray" }
  });
  game.settings.register(SYSTEM_ID, "enforcePrereqs", {
    name: "SWSE.Settings.EnforcePrereqs", hint: "SWSE.Settings.EnforcePrereqsHint",
    scope: "world", config: true, type: Boolean, default: true
  });
  game.settings.register(SYSTEM_ID, "autoOpenCreator", {
    name: "SWSE.Settings.AutoOpenCreator", hint: "SWSE.Settings.AutoOpenCreatorHint",
    scope: "world", config: true, type: Boolean, default: true
  });
}

function registerHandlebars() {
  Handlebars.registerHelper("swseSigned", n => {
    n = Number(n) || 0;
    return n >= 0 ? `+${n}` : `${n}`;
  });
  Handlebars.registerHelper("swseEq", (a, b) => a === b);
  Handlebars.registerHelper("swseIncludes", (arr, v) => Array.isArray(arr) && arr.includes(v));
  Handlebars.registerHelper("swseAdd", (a, b) => (Number(a) || 0) + (Number(b) || 0));
  Handlebars.registerPartial("pickList", `<ul class="pick-list">{{#each list as |f|}}
    <li class="{{#if f.selected}}selected{{/if}} {{#unless f.ok}}unavailable{{/unless}}">
      <a data-action="{{../action}}" data-slot="{{../slot}}" data-id="{{f.id}}"><i class="fa-regular {{#if f.selected}}fa-circle-dot{{else}}fa-circle{{/if}}"></i> {{f.name}}{{#if f.choiceValue}} ({{f.choiceValue}}){{/if}}</a>
      <small>{{f.prereqText}}{{#if f.missing.length}} — <span class="warn">{{#each f.missing}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}</span>{{/if}}</small>
      <a class="info" data-action="showItem" data-uuid="{{f.uuid}}"><i class="fa-solid fa-circle-info"></i></a>
    </li>{{else}}<li class="empty">—</li>{{/each}}</ul>`);
  Handlebars.registerHelper("swseTimes", (n, block) => {
    let out = "";
    for (let i = 0; i < n; i++) out += block.fn(i);
    return out;
  });
}

/* Botões nos cartões de chat */
Hooks.on("renderChatMessageHTML", onRenderChatMessage);

/* Abre o assistente de criação ao criar um personagem novo */
Hooks.on("createActor", (actor, options, userId) => {
  if (userId !== game.user.id || actor.type !== "character") return;
  if (!game.settings.get(SYSTEM_ID, "autoOpenCreator")) return;
  if (actor.items.size || actor.system.creationComplete) return;
  setTimeout(() => new CharacterCreator({ actor }).render({ force: true }), 250);
});

/* Arrastar armas/poderes para a barra de macros cria uma macro de uso */
Hooks.on("hotbarDrop", (bar, data, slot) => {
  if (data.type !== "Item") return;
  createItemMacro(data, slot);
  return false;
});

async function createItemMacro(data, slot) {
  const item = await fromUuid(data.uuid);
  if (!item?.parent) return ui.notifications.warn(game.i18n.localize("SWSE.Warn.MacroOwnedOnly"));
  const command = `// Usa "${item.name}" do personagem selecionado (ou do dono original)\ngame.swse.useItemMacro(${JSON.stringify(item.name)}, ${JSON.stringify(item.uuid)});`;
  let macro = game.macros.find(m => m.name === item.name && m.command === command);
  if (!macro) {
    macro = await Macro.create({ name: item.name, type: "script", img: item.img, command, flags: { [SYSTEM_ID]: { itemMacro: true } } });
  }
  game.user.assignHotbarMacro(macro, slot);
}
