// Macros utilitárias. Todas usam a API exposta em game.swse.
const M = (name, img, command) => ({ name, type: "script", img, scope: "global", command });

export default [
  M("Atacar (escolher arma)", "icons/skills/melee/strike-sword-steel-yellow.webp",
`// Ataca com uma arma do personagem do token selecionado (ou do seu personagem).
const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
if (!actor) return ui.notifications.warn("Selecione um token ou defina seu personagem.");
game.swse.attackPrompt(actor);`),
  M("Teste de Perícia", "icons/skills/trades/academics-study-reading-book.webp",
`const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
if (!actor) return ui.notifications.warn("Selecione um token ou defina seu personagem.");
game.swse.skillPrompt(actor);`),
  M("Usar Poder da Força", "icons/magic/lightning/bolt-strike-blue.webp",
`const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
if (!actor) return ui.notifications.warn("Selecione um token ou defina seu personagem.");
game.swse.forcePrompt(actor);`),
  M("Second Wind", "icons/magic/life/heart-glowing-red.webp",
`const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
if (!actor) return ui.notifications.warn("Selecione um token ou defina seu personagem.");
actor.secondWind();`),
  M("Aplicar Dano aos Selecionados", "icons/skills/wounds/blood-drip-droplet-red.webp",
`// Pede um valor e tipo e aplica o dano (com Limiar de Dano) a todos os tokens selecionados.
game.swse.damagePrompt();`),
  M("Descanso (8 horas)", "icons/magic/time/day-night-sunset-sunrise.webp",
`// Recupera second wind e poderes da Força; cura PV iguais ao nível; zera condição não persistente.
for (const t of canvas.tokens.controlled) await t.actor?.rest();`),
  M("Recuperar Poderes da Força", "icons/magic/perception/third-eye-blue-red.webp",
`for (const t of canvas.tokens.controlled) await t.actor?.recoverForcePowers();
ui.notifications.info("Poderes da Força recuperados.");`),
  M("Aplicar Efeito aos Selecionados", "icons/svg/aura.svg",
`// Cria um buff/penalidade (com modelos prontos e duração) em todos os tokens selecionados.
game.swse.effectToSelected();`),
  M("Alternar Condição (selecionados)", "icons/svg/aura.svg",
`// Ativa/desativa uma condição (caído, surpreso, cobertura...) em todos os tokens selecionados.
game.swse.toggleStatusPrompt();`),
  M("Criação de Personagem", "icons/sundries/documents/document-sealed-signatures-red.webp",
`const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
game.swse.openCharacterCreator(actor);`),
  M("Ataque de Artilharia / Bombardeio", "icons/weapons/guns/gun-blunderbuss-gold.webp",
`// Galaxy at War: observador avançado (Knowledge (tactics) CD 15) ou ordem especial de bombardeio.
// Marque primeiro o alvo do quadrado central e depois os que estão no raio de splash.
const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
game.swse.artilleryStrike(actor);`),
  M("Desafio de Perícia", "icons/sundries/gaming/dice-runed-brown.webp",
`// Galaxy of Intrigue: abre o rastreador de desafios de perícia (o Mestre monta e registra; jogadores acompanham).
game.swse.skillChallenge();`),
  M("Feromônios Falleen", "icons/magic/air/fog-gas-smoke-green.webp",
`// Scum and Villainy: marque o alvo adjacente e use com o token Falleen selecionado.
const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
const sp = actor?.items.find(i => i.type === "species");
if (!sp) return ui.notifications.warn("Selecione um token.");
sp.use();`),
  M("Subir de Nível", "icons/magic/symbols/chevron-elipse-circle-blue.webp",
`const actor = canvas.tokens.controlled[0]?.actor ?? game.user.character;
if (!actor) return ui.notifications.warn("Selecione um token ou defina seu personagem.");
game.swse.openLevelUp(actor);`)
];
