/**
 * Constantes do sistema Star Wars Saga Edition.
 */
export const SYSTEM_ID = "swse-saga";

export const SWSE = {};

SWSE.abilities = {
  str: "SWSE.Ability.str",
  dex: "SWSE.Ability.dex",
  con: "SWSE.Ability.con",
  int: "SWSE.Ability.int",
  wis: "SWSE.Ability.wis",
  cha: "SWSE.Ability.cha"
};

SWSE.abilityAbbr = {
  str: "SWSE.AbilityAbbr.str",
  dex: "SWSE.AbilityAbbr.dex",
  con: "SWSE.AbilityAbbr.con",
  int: "SWSE.AbilityAbbr.int",
  wis: "SWSE.AbilityAbbr.wis",
  cha: "SWSE.AbilityAbbr.cha"
};

/**
 * Perícias. armor = sofre penalidade de armadura; trainedOnly = usos que exigem treino (informativo);
 * force = só utilizável com Force Sensitivity.
 */
SWSE.skills = {
  acrobatics: { label: "SWSE.Skill.acrobatics", ability: "dex", armor: true },
  climb: { label: "SWSE.Skill.climb", ability: "str", armor: true },
  deception: { label: "SWSE.Skill.deception", ability: "cha" },
  endurance: { label: "SWSE.Skill.endurance", ability: "con", armor: true },
  gatherInformation: { label: "SWSE.Skill.gatherInformation", ability: "cha" },
  initiative: { label: "SWSE.Skill.initiative", ability: "dex", armor: true },
  jump: { label: "SWSE.Skill.jump", ability: "str", armor: true },
  knowledgeBureaucracy: { label: "SWSE.Skill.knowledgeBureaucracy", ability: "int", knowledge: true },
  knowledgeGalacticLore: { label: "SWSE.Skill.knowledgeGalacticLore", ability: "int", knowledge: true },
  knowledgeLifeSciences: { label: "SWSE.Skill.knowledgeLifeSciences", ability: "int", knowledge: true },
  knowledgePhysicalSciences: { label: "SWSE.Skill.knowledgePhysicalSciences", ability: "int", knowledge: true },
  knowledgeSocialSciences: { label: "SWSE.Skill.knowledgeSocialSciences", ability: "int", knowledge: true },
  knowledgeTactics: { label: "SWSE.Skill.knowledgeTactics", ability: "int", knowledge: true },
  knowledgeTechnology: { label: "SWSE.Skill.knowledgeTechnology", ability: "int", knowledge: true },
  mechanics: { label: "SWSE.Skill.mechanics", ability: "int" },
  perception: { label: "SWSE.Skill.perception", ability: "wis" },
  persuasion: { label: "SWSE.Skill.persuasion", ability: "cha" },
  pilot: { label: "SWSE.Skill.pilot", ability: "dex" },
  ride: { label: "SWSE.Skill.ride", ability: "dex" },
  stealth: { label: "SWSE.Skill.stealth", ability: "dex", armor: true },
  survival: { label: "SWSE.Skill.survival", ability: "wis" },
  swim: { label: "SWSE.Skill.swim", ability: "str", armor: true },
  treatInjury: { label: "SWSE.Skill.treatInjury", ability: "wis" },
  useComputer: { label: "SWSE.Skill.useComputer", ability: "int" },
  useTheForce: { label: "SWSE.Skill.useTheForce", ability: "cha", force: true }
};

SWSE.knowledgeSkills = Object.entries(SWSE.skills).filter(([, s]) => s.knowledge).map(([k]) => k);

SWSE.defenses = {
  reflex: "SWSE.Defense.reflex",
  fortitude: "SWSE.Defense.fortitude",
  will: "SWSE.Defense.will"
};

SWSE.sizes = {
  fine: { label: "SWSE.Size.fine", reflex: 10, stealth: 20, dt: 0, grapple: -20, order: 0 },
  diminutive: { label: "SWSE.Size.diminutive", reflex: 5, stealth: 15, dt: 0, grapple: -15, order: 1 },
  tiny: { label: "SWSE.Size.tiny", reflex: 2, stealth: 10, dt: 0, grapple: -10, order: 2 },
  small: { label: "SWSE.Size.small", reflex: 1, stealth: 5, dt: 0, grapple: -5, order: 3 },
  medium: { label: "SWSE.Size.medium", reflex: 0, stealth: 0, dt: 0, grapple: 0, order: 4 },
  large: { label: "SWSE.Size.large", reflex: -1, stealth: -5, dt: 5, grapple: 5, order: 5 },
  huge: { label: "SWSE.Size.huge", reflex: -2, stealth: -10, dt: 10, grapple: 10, order: 6 },
  gargantuan: { label: "SWSE.Size.gargantuan", reflex: -5, stealth: -15, dt: 20, grapple: 15, order: 7 },
  colossal: { label: "SWSE.Size.colossal", reflex: -10, stealth: -20, dt: 50, grapple: 20, order: 8 }
};

SWSE.weaponGroups = {
  simple: "SWSE.WeaponGroup.simple",
  pistols: "SWSE.WeaponGroup.pistols",
  rifles: "SWSE.WeaponGroup.rifles",
  heavy: "SWSE.WeaponGroup.heavy",
  lightsabers: "SWSE.WeaponGroup.lightsabers",
  advancedMelee: "SWSE.WeaponGroup.advancedMelee",
  exotic: "SWSE.WeaponGroup.exotic"
};

/** Tipo de alcance. "melee" = corpo a corpo. */
SWSE.rangeTypes = {
  melee: "SWSE.Range.melee",
  pistol: "SWSE.Range.pistol",
  rifle: "SWSE.Range.rifle",
  heavy: "SWSE.Range.heavy",
  simple: "SWSE.Range.simple",
  thrown: "SWSE.Range.thrown"
};

/** Tabela 8-5: alcance em quadrados [point blank, short, medium, long]. */
SWSE.rangeTable = {
  heavy: [50, 100, 250, 500],
  pistol: [20, 40, 60, 80],
  rifle: [30, 60, 150, 300],
  simple: [20, 40, 60, 80],
  thrown: [6, 8, 10, 12]
};

SWSE.rangeBands = {
  pointBlank: { label: "SWSE.RangeBand.pointBlank", penalty: 0, farShot: 0 },
  short: { label: "SWSE.RangeBand.short", penalty: -2, farShot: -1 },
  medium: { label: "SWSE.RangeBand.medium", penalty: -5, farShot: -2 },
  long: { label: "SWSE.RangeBand.long", penalty: -10, farShot: -5 }
};

SWSE.armorCategories = {
  light: { label: "SWSE.Armor.light", penalty: -2, feat: "armor-proficiency-light" },
  medium: { label: "SWSE.Armor.medium", penalty: -5, feat: "armor-proficiency-medium" },
  heavy: { label: "SWSE.Armor.heavy", penalty: -10, feat: "armor-proficiency-heavy" }
};

SWSE.weaponSizes = {
  tiny: "SWSE.Size.tiny",
  small: "SWSE.Size.small",
  medium: "SWSE.Size.medium",
  large: "SWSE.Size.large",
  huge: "SWSE.Size.huge"
};

SWSE.damageTypes = {
  energy: "SWSE.DamageType.energy",
  slashing: "SWSE.DamageType.slashing",
  piercing: "SWSE.DamageType.piercing",
  bludgeoning: "SWSE.DamageType.bludgeoning",
  fire: "SWSE.DamageType.fire",
  ion: "SWSE.DamageType.ion",
  sonic: "SWSE.DamageType.sonic",
  special: "SWSE.DamageType.special"
};

SWSE.availability = {
  "": "—",
  licensed: "SWSE.Availability.licensed",
  restricted: "SWSE.Availability.restricted",
  military: "SWSE.Availability.military",
  illegal: "SWSE.Availability.illegal",
  rare: "SWSE.Availability.rare"
};

/** Trilha de condição: penalidade por passo. O passo 5 é "indefeso". */
SWSE.conditionTrack = [
  { label: "SWSE.Condition.normal", penalty: 0 },
  { label: "SWSE.Condition.minus1", penalty: -1 },
  { label: "SWSE.Condition.minus2", penalty: -2 },
  { label: "SWSE.Condition.minus5", penalty: -5 },
  { label: "SWSE.Condition.minus10", penalty: -10 },
  { label: "SWSE.Condition.helpless", penalty: -10 }
];

/** Compra de pontos (25 pontos, todos começam em 8). */
SWSE.pointBuyCost = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 6, 15: 8, 16: 10, 17: 13, 18: 16 };
SWSE.pointBuyTotal = 25;
SWSE.standardArray = [15, 14, 13, 12, 10, 8];

/** Níveis em que se ganha feat de nível de personagem e aumentos de atributo (Tabela 3-1). */
SWSE.featLevels = [1, 3, 6, 9, 12, 15, 18];
SWSE.abilityIncreaseLevels = [4, 8, 12, 16, 20];
SWSE.xpTable = [0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 66000, 78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000];

SWSE.babProgressions = {
  full: "SWSE.BABProg.full",
  threeQuarter: "SWSE.BABProg.threeQuarter",
  half: "SWSE.BABProg.half"
};

SWSE.classTypes = {
  base: "SWSE.ClassType.base",
  prestige: "SWSE.ClassType.prestige",
  nonheroic: "SWSE.ClassType.nonheroic"
};

SWSE.forcePowerDescriptors = {
  lightSide: "SWSE.Descriptor.lightSide",
  darkSide: "SWSE.Descriptor.darkSide",
  mindAffecting: "SWSE.Descriptor.mindAffecting",
  telekinetic: "SWSE.Descriptor.telekinetic"
};

SWSE.talentCategories = {
  talent: "SWSE.TalentCategory.talent",
  forceTalent: "SWSE.TalentCategory.forceTalent",
  forceTechnique: "SWSE.TalentCategory.forceTechnique",
  forceSecret: "SWSE.TalentCategory.forceSecret"
};

SWSE.choiceTypes = {
  "": "SWSE.Choice.none",
  weaponGroup: "SWSE.Choice.weaponGroup",
  skill: "SWSE.Choice.skill",
  weapon: "SWSE.Choice.weapon",
  forcePower: "SWSE.Choice.forcePower",
  defense: "SWSE.Choice.defense",
  text: "SWSE.Choice.text"
};

/** Tipos de bônus que se acumulam entre si. Os demais tipos não se acumulam (vale o maior). */
SWSE.stackingBonusTypes = ["untyped", "dodge", "penalty"];

SWSE.bonusTypes = {
  untyped: "SWSE.BonusType.untyped",
  species: "SWSE.BonusType.species",
  class: "SWSE.BonusType.class",
  dodge: "SWSE.BonusType.dodge",
  equipment: "SWSE.BonusType.equipment",
  competence: "SWSE.BonusType.competence",
  insight: "SWSE.BonusType.insight",
  morale: "SWSE.BonusType.morale",
  force: "SWSE.BonusType.force",
  deflection: "SWSE.BonusType.deflection",
  natural: "SWSE.BonusType.natural",
  luck: "SWSE.BonusType.luck",
  rage: "SWSE.BonusType.rage",
  penalty: "SWSE.BonusType.penalty"
};

/**
 * Alvos válidos de modificadores. Usado nos itens (system.modifiers) e mostrado na ficha do item.
 * skills.<chave> e abilities.<chave> também são válidos.
 */
SWSE.modifierTargets = {
  "defenses.all": "SWSE.Target.defensesAll",
  "defenses.reflex": "SWSE.Defense.reflex",
  "defenses.fortitude": "SWSE.Defense.fortitude",
  "defenses.will": "SWSE.Defense.will",
  "damageThreshold": "SWSE.DamageThreshold",
  "damageReduction": "SWSE.DamageReduction",
  "hp.max": "SWSE.Target.hpMax",
  "speed": "SWSE.Speed",
  "forcePoints.max": "SWSE.Target.forcePointsMax",
  "attack.all": "SWSE.Target.attackAll",
  "attack.melee": "SWSE.Target.attackMelee",
  "attack.ranged": "SWSE.Target.attackRanged",
  "damage.all": "SWSE.Target.damageAll",
  "damage.melee": "SWSE.Target.damageMelee",
  "damage.ranged": "SWSE.Target.damageRanged",
  "skills.all": "SWSE.Target.skillsAll",
  "secondWind.uses": "SWSE.Target.secondWindUses",
  "grapple": "SWSE.Grapple"
};

SWSE.vehicleCategories = {
  walker: "SWSE.VCat.walker", speeder: "SWSE.VCat.speeder", airspeeder: "SWSE.VCat.airspeeder",
  starfighter: "SWSE.VCat.starfighter", transport: "SWSE.VCat.transport", capital: "SWSE.VCat.capital", station: "SWSE.VCat.station"
};
SWSE.droidSystemCategories = {
  locomotion: "SWSE.DroidCat.locomotion", locoExtra: "SWSE.DroidCat.locoExtra", appendage: "SWSE.DroidCat.appendage",
  processor: "SWSE.DroidCat.processor", sensor: "SWSE.DroidCat.sensor", communication: "SWSE.DroidCat.communication",
  shield: "SWSE.DroidCat.shield", translator: "SWSE.DroidCat.translator", storage: "SWSE.DroidCat.storage",
  hardened: "SWSE.DroidCat.hardened", accessory: "SWSE.DroidCat.accessory"
};
SWSE.droidCostModes = { flat: "SWSE.Droid.Cost.flat", factor: "SWSE.Droid.Cost.factor", locomotion: "SWSE.Droid.Cost.locomotion", locoExtra: "SWSE.Droid.Cost.locoExtra", selfDestruct: "SWSE.Droid.Cost.selfDestruct" };
SWSE.vehicleStations = { pilot: "SWSE.Role.pilot", copilot: "SWSE.Role.copilot", gunner: "SWSE.Role.gunner" };

/** Familiaridade com armas por espécie (errata): chave da espécie -> chave da arma -> grupo. */
SWSE.weaponFamiliarity = {
  gungan: { atlatl: "simple", cesta: "simple" },
  wookiee: { bowcaster: "rifles" }
};

/** Bônus de dados da Força por nível (Força Point: 1d6; 2d6 escolhe maior no 8º; 3d6 no 15º). */
SWSE.forcePointDice = level => (level >= 15 ? 3 : level >= 8 ? 2 : 1);
