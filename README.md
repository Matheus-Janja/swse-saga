# Star Wars RPG — Saga Edition para Foundry VTT

Sistema **não oficial** de *Star Wars Roleplaying Game: Saga Edition* para o Foundry VTT (testado contra a API v13/v14, verificado para a 14.370).

## Instalação

No Foundry: **Configuração → Sistemas de Jogo → Instalar Sistema** e cole o link de manifesto:

```
https://github.com/Matheus-Janja/swse-saga/releases/latest/download/system.json
```

## O que o sistema faz

### Ficha automatizada
- **Atributos** com base + espécie + aumentos de nível + outros → modificador.
- **Defesas** (Reflexos, Fortitude, Vontade) = 10 + nível heroico (ou bônus de armadura) + atributo + **maior** bônus de classe + tamanho + espécie/feats/talentos. Reflexos surpreso calculado.
- **Armadura**: bônus em Reflexos/Fortitude, Destreza máxima, redução de deslocamento, penalidade sem proficiência em ataques e perícias; *Armored Defense*, *Improved Armored Defense*, *Second Skin*, *Armor Mastery* e *Juggernaut* aplicados automaticamente.
- **Limiar de Dano** (Fortitude + tamanho + *Improved Damage Threshold*), **Redução de Dano**, **PV** por nível (com Con e *Toughness*), **BBA** por classe (completo ou 3/4), **Pontos da Força** (5 + ½ nível, +3 por *Force Boon*, dados d6/d8 e 2–3 dados a partir do 8º/15º nível).
- **Perícias**: ½ nível + atributo + treinada (+5) + *Skill Focus* (+5) + espécie + penalidade de armadura + tamanho (Stealth) + condição. *Skill Training* conta como treinada.
- **Trilha de Condição** clicável (0, −1, −2, −5, −10, indefeso) aplicada a defesas, ataques e perícias.
- **Second Wind**, **descanso**, **Pontos de Destino**, **Lado Sombrio**.
- **Modificadores** em itens (espécies, feats, talentos, equipamento) e personalizados na ficha, com regra de empilhamento (bônus do mesmo tipo não se somam, exceto esquiva e sem tipo).
- **Rerrolagens** de espécie e talentos (ex.: Cerean em Initiative, *Acute Senses*) aparecem como botão no cartão do teste.

### Criação de personagem guiada
Ao criar um personagem, abre um assistente em 9 passos seguindo o livro: atributos (compra de 25 pontos, pacote padrão ou 4d6), espécie, classe, perícias treinadas, feats (iniciais da classe e da espécie são adicionados sozinhos, inclusive regras de espécie primitiva e feats condicionais), talento, poderes da Força (se tiver *Force Training*), créditos iniciais e compras, e revisão. Pré-requisitos são verificados em cada escolha.

### Subida de nível
Escolha da classe (inclusive de prestígio, com pré-requisitos), PV, aumento de atributos no 4º/8º/12º/16º/20º, feat de nível (1º, 3º, 6º…), feat bônus de classe, feat de multiclasse, talento, técnicas e segredos da Força, nova perícia ao aumentar Inteligência e novos poderes ao aumentar Sabedoria.

### Ataques automatizados
Clique na arma (ou use a macro *Atacar*). O diálogo mostra só o que o personagem pode usar:
- proficiência (−5 sem ela), *Weapon Focus*, *Greater Weapon Focus*, *Weapon Finesse* (Destreza em armas leves e sabres), Força ×2 em armas de duas mãos;
- alcance (queima-roupa/curto/médio/longo), *Point Blank Shot*, *Far Shot*, *Precise Shot*, armas precisas/imprecisas, mirar com *Careful Shot* e *Deadeye*;
- *Rapid Shot*, *Rapid Strike*, *Power Attack*, *Mighty Swing*, investida, fogo automático (área), *Burst Fire*, *Controlled Burst*, arma apoiada, *Double/Triple Attack*, duas armas com *Dual Weapon Mastery*, *Multiattack Proficiency*;
- dano: ½ nível + Força + *Weapon Specialization*, *Greater Weapon Specialization*, *Melee Smash*, *Trusty Sidearm*, *Hunter's Target*, *Sneak Attack*, *Ataru*, fúria Wookiee; crítico ×2 (×3 com *Triple Crit*, 19–20 com *Vaapad*);
- compara com a Defesa de Reflexos de cada alvo marcado, e os botões do cartão aplicam o dano com **Limiar de Dano** (trilha de condição), RD, *Devastating/Penetrating Attack*, *Stunning Strike*, dano de atordoamento e iônico, *Evasion* em ataques de área. Jogadores sem permissão sobre o alvo têm o dano aplicado pelo Mestre via socket.

### Poderes da Força
Teste de Use the Force com tabela de CDs destacando o nível alcançado, comparação com a defesa dos alvos, dano rolado automaticamente, controle do conjunto (usos gastos), recuperação com 20 natural e aumento do Lado Sombrio em poderes sombrios.

### PdMs do Livro Básico
Compêndio **PdMs (Livro Básico)** com 46 fichas prontas, organizadas em pastas: personagens principais e coadjuvantes do Cap. 15 (Darth Vader, Obi-Wan, Padmé, Luke, Leia, Han, Palpatine, Chewbacca, Lando, R2-D2, C-3PO, Yoda, Boba Fett, General Grievous), arquétipos do Cap. 16 (Império, Rebelião, República, Fringe), feras (acklay, dewback, nexu, rancor, reek, tauntaun, wampa) e os droides de exemplo do Cap. 11 (com a errata do Droideka, IG-100 e 3PO).

Cada PdM é montado com espécie, classes, feats, talentos, poderes e armas reais do compêndio, então ataques e testes funcionam com a mesma automação dos personagens. O build calcula cada ficha com o motor de regras e ajusta os campos "Outros" para que Defesas, PV, Limiar, BBA, perícias e bônus de ataque fiquem idênticos ao livro (um teste automatizado garante isso). Detalhes que não são automatizados (sentidos, imunidades, sistemas de droides, posses, ataques múltiplos) estão na aba Biografia.

### Veículos e naves
Novo tipo de ator **Veículo** (Cap. 10):
- **Ficha**: Reflexos = 10 + Des + tamanho + armadura (ou o nível heroico do piloto, o maior) + manobra; Fortitude = 10 + For; Limiar = Fortitude + tamanho (Grande +5 até Colossal estação +500); PV, RD, escudos (SR atual/máximo), vulnerabilidade a íon e trilha de condição.
- **Manobras**: luta defensiva (+2/+5, ou +5/+10 com piloto treinado), Attack Run (−2 Ref) e veículo parado.
- **Tripulação**: arraste personagens para os postos (piloto, copiloto, artilheiros, comandante, operador de sistemas, engenheiro). O piloto soma Des e tamanho do veículo em Pilot e Initiative. Postos vazios usam a tripulação padrão do livro (qualidade untrained/normal/skilled/expert/ace e BBA).
- **Armas de veículo** (novo tipo de item): ataque = BBA do operador + Int do veículo (+2 se um piloto treinado dispara), dano = (dados + ½ nível heroico) × multiplicador (errata); autofire, splash/explosão em área, íon, penetração, raio trator (teste de agarrar), munição de mísseis/torpedos, −20 de naves capitais contra alvos menores, dogfight e alcances da Tabela 10-2.
- **Dano em veículos**: SR, RD, Limiar (−1 passo), destruído ou desativado ao chegar a 0 PV, e os ocupantes sofrem metade do excesso sobre o Limiar.
- **Ações**: recarregar escudos e redirecionar energia (Mechanics CD 20).
- **Combate veicular** (painel na ficha do veículo; marque o veículo inimigo com T):
  - **Dogfight**: iniciar (Pilot −5 oposto; *Relentless Pursuit* rola duas vezes), atacar no dogfight (Pilot oposto → ataque com arma do veículo; perdendo, artilheiros −5 até o próximo turno), desengajar; *Elusive Dogfighter* (−10 nos ataques do inimigo), *Dogfight Gunner* e *Expert Gunner* automáticos; atirar num dogfight alheio aplica −5 sozinho (exceto *Precise Shot*); aviso ao atacar alvos fora do dogfight.
  - **Abalroar** (Pilot −10 contra a Reflexos) e **colisão com perigo** (1d20 + tamanho), com o dano da Tabela 10-3 (+ For, dobrado em movimento total) para os dois veículos e para os tripulantes (reduzido pelo Limiar do veículo, errata); *Vehicular Evasion* aplicada.
  - **Manobras**: luta defensiva agora também aplica −5/−10 aos artilheiros; **movimento total** (4×, 5× com *Full Throttle*; sem Des na Ref e sem ataques até o próximo turno), **aumentar velocidade** (Pilot CD 20; falha −1 passo), **evitar colisão** (CD 15), **parada total**, **levantar/baixar escudos**.
  - **Vehicle Dodge** do Ace Pilot na Reflexos do veículo; veículos aceitam efeitos temporários (modificadores `vehicle.attack.all`, `vehicle.attack.gunner`, defesas e perícias).
- **Compêndio "Veículos e Naves"** com os 18 veículos do livro: AT-AT, AT-ST, X-34, speeder bike 74-Z, AAT-1, T-47, LAAT/i, X-wing, Y-wing, TIE fighter, TIE interceptor, Eta-2, ARC-170, Vulture, Tri-Fighter, YT-1300, Corvette Corelliana e Star Destroyer classe Imperial I. Um teste garante que todos batem com o livro.

### Droides jogadores
Marque **"Personagem droide"** no primeiro passo da criação (Cap. 11):
- 5 atributos (sem Constituição): compra de 21 pontos, pacote 15/14/13/12/10 ou 5× 4d6.
- "Espécies" por **grau** (1º a 5º) e **tamanho** (Médio ou Pequeno), com os modificadores das Tabelas 11-1 e 11-2 e os traços de droide. Droides não podem ser Jedi nem pegar Force Sensitivity.
- Novo passo **Sistemas de Droide**: começa com processador heurístico, duas mãos e locomoção básica, e gasta até 1.000 créditos em locomoção, apêndices, sensores, comunicação, escudos, tradutores, armazenamento e armaduras embutidas — com o custo calculado pelo fator de tamanho (Tabelas 11-3 a 11-6).
- Na ficha: Fortitude com Força, PV sem Con, deslocamento do melhor sistema de locomoção, armadura embutida sem redução de deslocamento, pacote sensorial (+2 Perception), rerrolagens de garras de escalada e servos de salto, dano desarmado pelo apêndice (Tabela 11-4), processador básico restringindo perícias sem treino, imunidade a atordoamento e vulnerabilidade a íon.
- Compêndio **Sistemas de Droide** com 59 sistemas e 11 armaduras embutidas.

### Condições e efeitos
- **Condições de combate** (HUD do token ou aba **Efeitos** da ficha): surpreso, caído, indefeso, inconsciente, lutando defensivamente, defesa total, investida, agarrado, imobilizado, cobertura, cobertura melhorada, camuflagem, camuflagem total, fúria e mirando — cada uma aplicada automaticamente às Defesas, ataques e deslocamento (Cap. 9). *Uncanny Dodge I* mantém a Destreza quando surpreso.
- **Ataques consideram o estado do alvo**: caído (+5 corpo a corpo / −5 à distância), indefeso, cobertura ignorada ao mirar e camuflagem (−2/−5, *Keen Shot*). Nova opção **Flanqueando (+2)**; a investida aplica −2 Ref por uma rodada sozinha.
- **Efeitos temporários (buffs/penalidades)** com modificadores (mesmos alvos e regras de empilhamento dos itens) e duração em rodadas, removidos no início do turno do personagem. Modelos prontos: Born Leader, Battle Meditation, Inspire Confidence, Rally, Dark Presence, Fool's Luck, Lightsaber Defense, Dodge, Battle Strike, Dark Rage, Force Talisman, Surge, Shift Defense e outros.
- **Início de combate**: todos ficam surpresos até o primeiro turno (configurável). **Recuperar** (+1 passo na trilha) na ficha; −10 na trilha reduz o deslocamento à metade; atordoamento/íon a 0 PV levam ao fim da trilha.
- Macros: *Aplicar Efeito aos Selecionados* e *Alternar Condição*.

### Talentos e feats automatizados
178 dos 273 feats e talentos do Livro Básico têm efeito mecânico (a descrição no compêndio indica "Automático"):
- **Passivos** (calculados na ficha ou no ataque): bônus de Defesas/perícias/dano, armaduras, *Niman*, *Force Intuition/Perception/Pilot/Persuasion/Deception/Treatment* (usam Use the Force e contam como treinadas), *Dark Side Scourge*, *Dark Scourge*, *Uncanny Dodge II*, *Elusive Target*, *Knack* (rerrolagem), *Resist the Dark Side*, *Force Power Mastery/Adept*, *Dark Side Master*, *Devastating Power*, *Force Point Recovery* (fim do combate) e os de combate veicular.
- **Opções no ataque**: *Melee Defense*, *Powerful Charge*, *Charging Fire*, *Acrobatic Strike*, *Skirmisher*, *Knockdown Shot* (derruba ao aplicar dano), **Desarmar** (*Improved Disarm*, *Ranged Disarm*).
- **Ativáveis (botão ⚡ na ficha ou arrastando para a barra de macros)**: *Block* e *Deflect* (penalidade acumulada, *Shii-Cho*, *Soresu*), *Lightsaber Defense* (*Makashi*, *Jar'Kai*), *Battle Meditation*, *Born Leader*, *Inspire Confidence*, *Rally*, *Bolster Ally*, *Dark Presence*, *Fool's Luck*, *Cover Fire*, *Walk the Line*, *Adept/Master Negotiator*, *Deceptive Shot*, *Shift Defense I–III*, *Deployment/Field/Assault Tactics*, *Outmaneuver*, *Resilience*, *Indomitable*, *Shake It Off*, *Equilibrium*, *Damage Reduction 10*, *Force Focus*, *Telekinetic Savant*, *Channel Anger*, *Force Talisman*, *Attune/Empower Weapon*, *Dark Healing*, *Extreme Effort* e outros. Talentos que afetam aliados aplicam o efeito aos tokens marcados (T).
- Os restantes são narrativos ou dependem do posicionamento no mapa (Cleave, Mobility, Running Attack, Harm's Way, formas de sabre de reação etc.); a descrição de cada um continua no item.

### Suplemento: Galaxy at War
Conteúdo mecânico dos capítulos 1 a 3 (pastas "Galaxy at War" nos compêndios):
- **9 espécies** (Barabel, Dashade, Lurmen, Taung, Thakwaash, Trianii, Yevetha, Yuzzem, Zygerrian) — armas naturais (o ataque desarmado passa a usar o dado natural), *Armor Training* do Taung e *Strength of Conviction* do Zygerrian automáticos.
- **42 feats**: gerais (as listas de feats bônus das classes base foram ampliadas), 8 de artes marciais e 13 de equipe. Automáticos: *Force of Personality*, *Predictive Defense*, *Resilient Strength*, *Fight Through Pain*, *Fortifying Recovery*, *Pistoleer*, *Riflemaster*, *Sport Hunter*, *Disabler*, *Steadying Position*, feats de equipe (+3); opções no diálogo de ataque para *Staggering Attack*, *Echani Training* e *Teräs Käsi Training*.
- **Talentos**: árvores novas Anticipation (Noble), Brigand (Scoundrel), Advance Patrol (Scout), Shockboxer e Veteran (Soldier, Veteran qualifica para Officer), Squad Leader (Elite Trooper), Sharpshooter (Gunslinger), além de talentos novos em árvores do Livro Básico. Botões ⚡ para *Squad Leader*, *Commanding Presence*, *Get Down*, *Easy Prey*, *Sly Combatant*, *Dig In*, *Ghost Assailant*, *Mobile Combatant*, *Defensive Position*, *Grizzled Warrior*, *Keep Them Honest*; passivos *Watchful Step*, *Tested in Battle*, *Precision Shot*, *Autofire Assault*, *Backstabber*, *Reckless*.
- **Classe de prestígio Martial Arts Master** (árvores Martial Arts Forms e Unarmed Mastery; *Tough as Durasteel* dá PV temporários ao acertar desarmado).
- **Equipamento**: armas (rifles de potência variável com escolha de potência no ataque, scatter gun por alcance, ICWS, canhões), minas e defesas de campo, armaduras, equipamentos e **cibernéticos** (−1 em Use the Force por peça; quem tem peças cibernéticas sofre íons como droide, salvo com *Ion Shielding*).
- **PdMs**: 11 droides (A-Series, KDY-4, Chiba DR-10, B2-AA, Eradicator, Purge Trooper, Sniper Droideka, T-Series, Vigilant 2X, CLL-M2, MR-200), 8 feras de guerra e a sentinela automática — todos conferidos com os blocos do livro.
- **Veículos**: Freeco Speeder, Shelter Speeder, WLO-5, Drop Pod, IF-120, Penumbra, YU-410, Wayfarer e a fragata Corona.
- **Efeitos de campo de batalha** de veículos (botão no painel de combate veicular): aplicam o efeito aos tokens aliados/inimigos no raio.
- **Patente e Privilégio** (aba Bio): pontuação de organização com os critérios automáticos da ficha, título, bônus de requisição/comando e ordens especiais.
- **Macro "Ataque de Artilharia / Bombardeio"**: observador avançado (Knowledge (tactics) CD 15) com as munições da Tabela 3-3, ou as ordens especiais de bombardeio.
- Os capítulos 4 a 7 (unidades militares, bases e aventuras) são ambientação/material do Mestre e não entram nos compêndios.

### Suplemento: Galaxy of Intrigue
Conteúdo mecânico dos capítulos 1 a 3 e da fauna de Nyriaan (pastas "Galaxy of Intrigue" nos compêndios):
- **Rastreador de Desafios de Perícia** (macro "Desafio de Perícia" ou `game.swse.skillChallenge()`): o Mestre define ND, complexidade e efeitos (Close Call, Catastrophic Failure, Extreme Success, Recovery, Degenerating, Second Effort, Timed etc.), monta as perícias sugeridas com as CDs da Tabela 2-1 e registra os testes — rolando pelos tokens selecionados, digitando o resultado ou pelo botão "Aplicar ao desafio" que aparece nos cartões de teste. Contagem de sucessos/falhas, resultado, registro e XP; os jogadores acompanham em tempo real. Inclui os 16 desafios de exemplo do livro.
- **9 espécies** (Bith, Defel, Fosh, Givin, Gotal, Herglic, Mrlssi, Neimoidian revisado, Umbaran): RD e Fortitude do Givin, rerrolagem de Knowledge, *Sturdy* do Herglic no second wind, feats condicionais.
- **29 feats** (listas de feats bônus das classes ampliadas). Automáticos: *Cut the Red Tape*, *Resolute Stance*, *Forceful Recovery*, *Bone Crusher*; opções no ataque para *Flèche* e *Grazing Shot*; botões ⚡ para *Brilliant Defense*, *Indomitable Personality*, *Channel Rage* e *Opportunistic Trickery*.
- **Talentos**: árvores Master of Intrigue, Skill Challenge e Superior Skills (Noble), Revolutionary (Scoundrel), Espionage (Scout), além de talentos novos em Brawler, Commando, Expert Pilot, Bounty Hunter, Mastermind e Gunslinger. *Assured Skill*, *Exceptional Skill*, *Skill Boon*, *Reliable Boon*, *Critical Skill Success* e *Skill Confidence* funcionam nos testes de perícia; os talentos de desafio funcionam no rastreador; *Make an Example* e *Damaging Disarm* no ataque; botões para *Advanced Planning* (troca a Iniciativa), *Master Manipulator*, *Revolutionary Rhetoric*, *Sizing Up*, *Dedicated Protector/Guardian*, *For the Cause* e *Pistol Duelist*.
- **Equipamento**: Xerrol Nightstinger, wrist blaster, snare pistol, darter, equipamentos de espionagem e **venenos** (usar o item rola o ataque contra a Fortitude dos alvos marcados e aplica dano e passos na trilha), além do spice de Nyriaan.
- **PdMs**: 7 droides (5-BT, NR-1100, 3D-4, M4, FIII Footman, BL-Series, B4J4) e a fauna de Nyriaan (lluma, pherin, chlovi cat); **veículos**: PTV-2100, A-24 Sleuth, Ferret, Prowler, Sabaoth, Corona Limited e JG-8.
- Os capítulos 4, 5, 7 e 8 (campanhas, facções, encontros e aventura) são material do Mestre e não entram nos compêndios.

### Suplemento: Jedi Academy Training Manual
Conteúdo mecânico dos capítulos 1, 3, 4 e das feras do capítulo 6 (pastas "Jedi Academy" nos compêndios):
- **Poderes da Força**: 17 poderes novos (blind, convection, crucitorn, fold space, Force light, Force storm, hatred, inspire, intercept, mind shard, thought bomb…), **23 poderes de forma de sabre** (pasta própria, com os bônus de cada forma) e **12 regimes da Força** (aprendidos com Force Regimen Mastery; as cadências de Vo'ren aplicam a penalidade do Dark Side Score e Regimen Aptitude soma +5 automaticamente).
- **Técnicas e segredos**: 14 técnicas e 2 segredos novos.
- **Talentos**: novos em Jedi Consular/Guardian/Sentinel, Lightsaber Combat, Alter, Control, Dark Side, Sense e Duelist; árvores novas Guardian Spirit (Força), Beastwarden, Mystic e Telepath (Force Adept), Jedi Artisan, Jedi Instructor, Jedi Investigator e Jedi Weapon Master (Jedi Knight), Sith Alchemy (Sith Apprentice) e as **10 tradições da Força** (Aing-Tii, Baran Do, White Current, Iron Knights, Matukai, Seyugi Dervish, Shapers of Kro Var, Tyia, Warden of the Sky, Zeison Sha). Automáticos: *Body Control*, *Knowledge and Defense*, *White Current Adept*, *Fluidity*, *Psychic Citadel*, *Shoto Focus*, *Brutal Unarmed Strike*; botões ⚡ para os *Savants*, *Adversary Lore*/*Know Weakness*, *Manifest Guardian Spirit*, *Vital Encouragement*, *Dark Side Talisman*, *Channel Vitality*, *Jedi Quarry*, *Rapid Alchemy*, *Ride the Current*, *Soft to Solid*, *Wan-Shen Defense*, *Wind Vortex* e outros.
- **5 feats** (*Long Haft Strike* transforma pike/long-handle em arma dupla; *Relentless Attack* cria o bônus ao errar).
- **Espécie Shard** (Iron Knights).
- **Equipamento**: 11 variantes de sabre e outras armas (lightfoils contam como armas leves; guard shoto dá +2 em Block/Deflect; crossguard reduz a penalidade cumulativa de Block; pike e crossguard −2 em Deflect — tudo aplicado no botão de Block/Deflect), discblade, wan-shen, san-ni staff, armaduras Jedi e Sith, **28 cristais de sabre**, acessórios de sabre, holocrons, artefatos Sith, veneno Sith e a peste do droch.
- **19 feras** ligadas à Força (battle hydra, beck-tori, chrysalis rancor, derriphan, droch, Dxun tomb beast, hssiss, marsh haunt, nighthunter, shyrack, silooth, Sith warbird, Sith wyrm, storm beast, taozin, terentatek, tuk'ata…), conferidas com os blocos do livro.
- **18 vilões do lado sombrio** (Azrakel, Blackguard, Brakiss, Carnor Jax, Freedon Nadd como espírito, Hethrir, Lord Nyax, Kueller, abominação Massassi, Nightsister, Profeta do Lado Sombrio, Sedriss, alunos da Academia das Sombras, Feiticeiro de Tund, Tamith Kai, Xanatos), com classes, talentos e poderes reais e valores conferidos com o livro; talentos de outros suplementos ainda não incluídos aparecem nas notas.
- Fora dos compêndios: capítulos 2, 5 e 7 (filosofia, instrutores e ex-alunos famosos, intercâmbios).

### Suplemento: Scavenger's Guide to Droids
- **8 chassis de droide padrão** (astromecânico, batalha, trabalho, mecânico, médico, sonda, protocolo e serviço) na pasta de droides heróis das espécies, com perícias embutidas (Hardwired Design) marcadas como treinadas automaticamente e feats condicionais.
- **Talentos de droide por grau** (1º a 5º): o assistente de criação e de subida de nível mostra automaticamente a árvore do grau do droide. Também as árvores das classes de prestígio Droid Commander (classe incluída com o The Clone Wars Campaign Guide) e Independent Droid (classe incluída com o The Force Unleashed Campaign Guide). Automáticos: *Science Analyzer*, *Heavy-Duty Actuators*; botões ⚡ para *Target Acquisition*, *Weapons Power Surge* e *Just a Scratch*.
- **17 feats de droide**, com pré-requisito "ser droide" e de locomoção verificados. *Aiming Accuracy* (+5, com *Pinpoint Accuracy* −1 passo) e *Slammer* no diálogo de ataque; *Mechanical Martial Arts* aplica −5 ao ferir; *Ion Shielding* reduz o efeito dos íons; botões para *Distracting Droid*, *Erratic Target* e *Tool Frenzy*.
- **Sistemas de droide**: 65 acessórios, sensores, processadores, apêndices, locomoções extras, estações e 4 armaduras novas no compêndio de sistemas.
- **Codex de Droides: 45 droides** com fichas conferidas com o livro (incluindo Annihilator, Droideka Mk II, IG/HK, SD-9, YVH, Shadow Droid, X-1 Viper).
- Fora dos compêndios: traços de fabricantes, tabela de peculiaridades (quirks) e o capítulo 2 (aconselhamento ao Mestre) — servem como referência de mesa.
- Melhoria geral: o assistente agora oferece todas as árvores de talentos da Força dos suplementos (Guardian Spirit e as tradições) para personagens sensíveis à Força.

### Suplemento: Scum and Villainy
- **8 espécies** (Blood Carver, Clawdite, Falleen, Gand, Jawa, Ryn, Toydarian, Ubese): *Hardy* do Gand no second wind, *Deathstrike* do Blood Carver no ataque, *Scavenger* do Jawa, e os **feromônios Falleen** (usar o item de espécie ou a macro rola o ataque contra a Fortitude e aplica o passo na trilha).
- **4 classes de prestígio**: Assassin, Charlatan, Master Privateer e Outlaw, com as árvores Assassin, GenoHaradan, Trickery, Piracy e Outlaw.
- **Talentos**: árvore Disgrace (Noble), talentos novos em Inspiration, Fortune, Misfortune, Slicer, Spacer, Camouflage, Fringer, Brawler e Weapon Specialist, e árvores de prestígio Blockade Runner, Gand Findsman, Pistoleer e novos em Bounty Hunter, Infamy, Mastermind e Gunslinger. Automáticos: *Cantina Brawler*, *Sniping Assassin*, *Twin Shot*, *Advantageous Positioning*; botões ⚡ para *Castigate*, *Dirty Tactics*, *Better Lucky than Dead*, *Hesitate*, *Hunker Down*, *Innocuous*, *Preternatural Senses*, *Inspire Wrath*, *Burst of Speed* e *Stay Up*.
- **28 feats** (incluindo os de metamorfo dos Clawdite).
- **Melhorias de equipamento**: armas e armaduras ganharam espaços de melhoria e uma lista de upgrades na ficha do item; *Pulse Charger*, *Neutronium Reinforcement*, *Double Trigger*, *Rapid Recycler*, *Sniper Switch*, *Miniaturized*, *Shadowskin*, *Helmet Package* e *Shield Generator* são aplicados automaticamente.
- **Equipamento**: armaduras (beskar'gam, GTU, Krail 210, shadowsuit...), armas (pulse rifle, deck sweeper, snare rifle, sniper blaster rifle...) e equipamentos de contrabando.
- **PdMs**: os personagens notórios do Cap. 4 (BoShek, Booster Terrik, Boushh, Jodo Kast, Jorj Car'das, Mirax Terrik, Moxin Tark, Príncipe Xizor, Snoova, Tyber Zann, Zam Wesell, Zardra, Zuckuss) e 10 arquétipos, conferidos com o livro.
- Fora dos compêndios: Cap. 3 (campanhas de crime, regras de prisão), naves não confiáveis/emplacement points (dependem do Starships of the Galaxy) e o capítulo de aventuras.

### Suplemento: Starships of the Galaxy
- **27 manobras de nave** (pasta "Manobras de Nave" no compêndio de poderes): ficam num painel próprio na aba da Força, mesmo para personagens que não são sensíveis à Força. O teste usa Pilot (ou ataque / Use the Force, conforme a manobra) contra as CDs, e um 20 natural recupera só as manobras. *Starship Tactics* define quantas manobras o personagem conhece, e *Force Reflexes* permite rerrolar o Pilot com um Ponto da Força.
- **Talentos**:
  - Árvores novas: Outlaw Tech (Scoundrel), Squadron Leader (Ace Pilot) e Naval Officer (Officer).
  - Talentos novos em Expert Pilot, Gunner, Sense e Lineage.
  - Automação: *Great Shot* reduz a categoria de distância automaticamente no ataque veicular; *Personalized Modifications* e *Fleet Tactics* ganharam botão ⚡.
- **4 feats**: Starship Designer, Starship Tactics, Tactical Genius e Tech Specialist.
- **Sistemas de nave**: 91 sistemas de movimento, defesa e acessórios (pasta "Sistemas de Nave" do compêndio de equipamentos), cada um com pontos de instalação, custo e regras de instalação. Também 24 armas de nave (pasta "Armas de Nave"), que podem ser arrastadas para a ficha de um veículo.
- **Codex de naves: 97 naves**, conferidas com os blocos de estatística do livro:
  - Caças: A-, B-, E-, K-, V-, Y-wing e variantes, TIE Advanced/Bomber/Defender, Predator, StarViper, coralskipper…
  - Transportes: YT-2000/2400, Millennium Falcon, Slave I, Sith Infiltrator, Lambda, Skipray…
  - Naves capitais: Acclamator, Venator, Victory II, Imperial II, Nebulon-B, MC80, Hapan Battle Dragon, Interdictor, Lucrehulk, Nebula, os Super Star Destroyers Executor, Lusankya e Eclipse…
  - Os modelos de nave (avançado, arcaico, junker, protótipo) e o tiro tático de cada nave capital estão nas notas.
- Fora dos compêndios: regras gerais de combate espacial do Cap. 2 que o sistema já cobria, as plantas das naves e a parte descritiva do Cap. 3.

### Suplemento: The Unknown Regions
- **18 espécies**: Anzati (Mesmerize ao usar o item de espécie), Chadra-Fan, Ishi Tib, Krevaaki, Nikto, Shistavanen, Sluissi, Squib, Verpine, Near-Human (traços na descrição) e as espécies das ameaças: Chiss, Ebruchi, Killik, Lugubraa, Sorcerer of Rhand, Ssi-ruuk, Tof e Vagaari.
- **Talentos**:
  - Árvores novas: Exile (Noble), Outsider (Scoundrel), Master Scout, Mobile Scout e Hyperspace Explorer (Scout), Warrior (Soldier) e a tradição da Força Blazing Chain.
  - Talentos novos em Jedi Sentinel, Leadership, Spacer, Camouflage, Commando e nas árvores de prestígio.
  - Botões ⚡: *Warrior's Awareness*, *Rising Anger*, *Rising Panic* e o feat *Instinctive Defense*.
- **21 feats**, que também entram nas listas de feats bônus das classes heroicas.
- **Equipamento**: armas (blastsword, electropole, vibro-saw, magna caster, Squib tensor rifle, Verpine shatter gun, concussion rifle…) e equipamentos de exploração.
- **Novo compêndio "Perigos (Hazards)"**: 81 perigos, separados por ambiente, incluindo os do Livro Básico reformatados e os dos planetas do Cap. 6. Usar o perigo rola o ataque contra os tokens marcados e oferece o botão de aplicar dano e passos na trilha.
- **PdMs**:
  - 6 droides de exploração.
  - 16 montarias e companheiros animais, mais as feras Brintak e Reyko.
  - Ameaças: Captain Ness, Lorgrombo, Mnggal-Mnggal e seu zumbi, Elder Ruthic, Blessed Toxmalb e Vagaari Infiltrator.
  - Todos conferidos com o livro.
- **25 veículos e naves**: speeders, rodas e esteiras, entre eles veículos de tamanho Médio, que agora são suportados; naves de exploração (JumpMaster 5000, Vaya, SkyBlind, Star Seeder…); e naves das ameaças (Killik Dartship, Royal Fortune, Surfeik Cruiser).
- Fora dos compêndios: Cap. 3 (campanhas, geradores de planetas e criaturas), os textos dos planetas e o Cap. 7 (aventuras).

### Suplemento: Threats of the Galaxy
- **153 PdMs** prontos para usar, conferidos com os blocos do livro, em três pastas "Threats":
  - **Personagens** (arquétipos e nomes famosos): Force Adept, Dathomiri Witch, Assassin, Malkite Poisoner, Bounty Hunter, Aurra Sing, Bossk, Jango Fett, Commandos, Crime Lord, Black Sun Vigos, Hutt, Dark Jedi, Jerec, Desann, Reborn, Jedi (Padawan a Mestre), Imperial Knight, Jensaarai, Teräs Käsi, mercenários, pilotos, piratas, policiais, políticos, Bail Organa, Sector Rangers, sabotadores, Ship Captain, Sith Apprentice, Darth Maul, Sith Lords, Lumiya, Darth Bane, slicers, contrabandistas, Talon Karrde, soldados, Commander Cody, espiões, swoop gangs e outros.
  - **Criaturas**: banshee bird, sand panther, dragonsnake, gundark, katarn, krayt dragons, rancors, sarlacc, varactyl, vornskr, womp rats (e as regras de matilhas/enxames), ysalamiri e outras.
  - **Droides**: VX, ASN-121, astromecânicos R2-R/R3/R4/R5/R7, B3, IG lancer, buzz droid, EVS, GRZ-6B, 3PX, TO-D, GH-7, power droid, DRK-1, protocolo, Guri, WSB-15, 501-Z, seeker, sentry, SD-6, Sith warbot e PK.
- **4 espécies**: Chistori, Miraluka, Mantellian Savrip e Utai.
- **Talentos**: árvores Malkite Poisoner (Scoundrel), Mercenary (Soldier) e Master of Teräs Käsi (Elite Trooper), além de Drain Knowledge, Stolen Form, Hard Target e Vehicle Evasion.
- **4 feats**: A Few Maneuvers, Suppression Fire, Momentum Strike e Mounted Defense.
- **Equipamento**: datadagger, espada Sith, sonic stunner, escudo antimotim, manopla de cortosis, lança-mísseis de concussão leve, ferramentas de slicer, medisensor, FastFlesh medpac e o lançador de mísseis discord (pasta Armas de Nave).
- **5 veículos**: Hound's Tooth, Bloodfin, VCX-350, Raptor speeder bike e swoop Nebulon-Q.
- Talentos de outros livros (Adept Spellcaster, Command Beast, Flight, Attune Armor) aparecem nas notas dos PdMs que os usam.

### Campaign Guide: The Clone Wars
- **12 espécies**: Dug, Gen'Dai, Iktotchi, Kaleesh, Kaminoan, Kerkoiden, Nautolan, Nelvaanian, Vurk, Republic Clone, Chagrian e Geonosian.
- **3 classes de prestígio**: Droid Commander, Military Engineer e Vanguard (com as árvores próprias).
- **Talentos**:
  - Árvores novas: Collaborator e Loyal Protector (Noble), Opportunist (Scoundrel), Reconnaissance e Surveillance (Scout), Trooper e Squad Leader (Soldier), Melee Specialist e Republic Commando (Elite Trooper), Jedi Archivist e Jedi Healer (Jedi Knight).
  - Força: Light Side, as tradições Bando Gora Captain, Believer Disciple e Korunnai Adept, 8 técnicas e 3 segredos novos.
- **8 poderes da Força**: cloak, levitate, malacia, morichro, phase, rend, shatterpoint e technometry.
- **21 feats**, incluídos nas listas de feats bônus das classes.
- **Seguidores**: a macro *Criar Seguidor* cria um PdM ligado ao herói do token, com modelo agressivo, defensivo ou utilitário. O nível acompanha o nível heroico do líder; defesas, PV e BBA seguem as regras do livro; feats concedidos pelos talentos do líder (Commanding Officer, Undying Loyalty etc.) entram automaticamente. A ficha de PdM ganhou o campo "Seguidor".
- **Esquadrões e combate em massa**: a macro *Criar Esquadrão / Unidade* cria uma cópia do PdM selecionado transformada em esquadrão (tamanho +1, PV ×2, Limiar +10, +4 no ataque) ou em unidade de combate em massa (Colossal, PV ×4, Limiar = Fortitude + 50, RD 15, números de atrito), com as regras especiais na biografia.
- **Equipamento**: vibroknucklers, vibrorapier, garrote, snap baton, wrist rocket launcher, pistolas e rifles da época (DH-17 "Outback", DT-12, "DeathHammer", Firelance, DLT-20A...), granada EMP, armaduras (thinsuit, camo armor, vacuum pod) e equipamentos.
- **95 PdMs** em seis pastas "Clone Wars", conferidos com o livro: droides (médicos, astromecânicos, dróides de batalha e de comando da Confederação, A-DSD, JK-13, IG-110...), Jedi (do Serviço Jedi a Yoda, Mace Windu, Ahsoka, Kit Fisto, Plo Koon, Aayla Secura, Quinlan Vos...), República (clones de todos os tipos, Rex, Alpha-17, Argyus, Yularen, Mas Amedda, Sly Moore), Confederação (Dooku, Asajj Ventress, Durge, Loathsom, geonosianos, trandoshanos), Orla (Boba Fett jovem, Cavik Toth, Chewbacca, Tarfful, Nym, Ziro) e feras (kybuck, dactillion, horax).
- **69 veículos e naves**: transportes e caças da época, naves Jedi (variantes do Delta-7 e do Eta-2, Azure Angel), veículos da República (AT-TE, AT-RT, AT-AP, BARC, LAAT/c, SPHA, TX-130, UT-AT...), da Confederação (Hailfire, MTT, OG-9, Persuader, Tri-Droid, Providence, Invisible Hand, Subjugator...) e as armas fixas LR1K e AV-7 (nova pasta "Armas Fixas").
- Fora dos compêndios: o Gazetteer (Cap. 8, planetas) e as estruturas de comando dos exércitos.

### Campaign Guide: Knights of the Old Republic
- **11 espécies**: Arkanian, Arkanian Offshoot, Cathar, Draethos, Feeorin, Khil, Kissai, Massassi, Rakata, Selkath e Snivvian.
- **3 classes de prestígio**: Corporate Agent, Gladiator e Melee Duelist (com as árvores próprias).
- **Talentos**:
  - Árvores novas: Fencing (Noble), Run and Gun (Scoundrel), Rocket Jumper (Soldier), Mandalorian Warrior (Elite Trooper), Jedi Battlemaster, Jedi Shadow e Jedi Watchman (Jedi Knight), além de talentos novos nas árvores existentes.
  - Força: Alter, Control, técnicas novas e as tradições Jal Shey, Keetael, The Krath, Luka Sene e Order of Shasa.
- **10 poderes da Força**: energy resistance, fear, force scream, force whirlwind, ionize, kinetic combat, resist force, slow, valor e wound.
- **20 feats**, incluídos nas listas de feats bônus das classes (Sith/Republic Military Training, Mandalorian Training, Flurry, Withdrawal Strike...).
- **Equipamento**: armas antigas (vibrolâminas, espadas de guerra, shockstaff, lanvarok, pulse-wave, sônicas, carbonite rifle, machado do Mitossauro), armaduras (fiber, mesh, weave, matrix, armaduras da República e Neo-Crusader mandalorianas), escudos de energia, visores, implantes, acessórios e 23 modelos de equipamento (nova categoria "Modelos de Equipamento").
- **100 PdMs** em seis pastas "KotOR", conferidos com o livro: droides (HK-24/47/50, T3-M4, GO-TO, Mark I/IV, Krath, Rakatan), Jedi e República (Bastila, Jolee, Juhani, Vandar, o Exilado, Carth, Atton, Bao-Dur, oficiais e soldados da República), Império Sith (Revan, Malak, Exar Kun, Traya, Sion, Nihilus, Bandon, Karath, soldados e assassinos Sith, Krath), Mandalorianos (Crusaders, Neo-Crusaders, Cassus Fett, Demagol, Canderous, os Mandalores), Orla (Calo Nord, Mission, Zaalbar, os Moomo, Gryph, Jarael, Mira) e feras (kath hound, rakghoul).
- **39 veículos e naves**: speeders, transportes (Ebon Hawk, Herald, Lethisk...), caças (Aurek, Chela, Davaab, interceptador Sith, Chaos), naves capitais da República, dos Sith e dos Mandalorianos (Hammerhead, Inexpugnable, Interdictor, Centurion, Kandosii...) e o droide de guerra Basilisk.
- Talentos de outros livros (Force Valor, Language Rip, Improved Wound...) aparecem nas notas dos PdMs que os usam.
- Fora dos compêndios: o Gazetteer (Cap. 8, planetas).

### Campaign Guide: The Force Unleashed
- **11 espécies**: Aleena, Caamasi, Felucian, Gran, Nosaurian, Talz, Togorian, Togruta, Whiphid, Yarkora e Noghri.
- **5 classes de prestígio**: Enforcer, Independent Droid, Infiltrator, Medic e Saboteur, com as árvores próprias. O Master Privateer, que já vinha do Scum and Villainy, ganhou a árvore Privateer.
- **Talentos**:
  - Árvores novas: Ideologue (Noble), Smuggling (Scoundrel), Spy (Scout) e Imperial Inquisitor (Force Adept).
  - Talentos novos nas árvores existentes, inclusive Mercenary, Bounty Hunter, Critical Master e Duelist.
  - Talentos de droide de 1º a 5º grau.
- **Força**:
  - 4 poderes novos: corruption, Force blast, Force shield e repulse.
  - Talentos de Alter, Control, Dark Side e Sense, 9 técnicas e 5 segredos.
  - As tradições Agents of Ossus e Felucian Shamans.
- **20 feats**, incluídos nas listas de feats bônus das classes.
- **Habilidades Unleashed**: o feat *Unleashed* e 26 habilidades, inclusive as Force Unleashed. Ficam na pasta "Habilidades Unleashed" do compêndio de feats e se ativam gastando um Ponto de Destino.
- **Equipamento**:
  - armas: power hammer, vibrosword, skullblade, ryyk blade, pistola e rifle Bryar, disruptores, incinerator rifle e spray stick Stokhli;
  - minas e o arsenal imperial: chicote neurônico, CR-1, lança-mísseis E-Web, lança-flechettes e arma detonadora de trilho;
  - holoshroud, jet pack Hush-About e outros equipamentos.
- **70 PdMs** em seis pastas "Force Unleashed", conferidos com o livro:
  - droides: Q7, BD-3000, droides de sucata, IT-O, RA-7, PROXY, R-1 e MSE-6;
  - tropas e agentes do Império: 501ª, Royal e Shadow Guard, Sovereign Protector, clones veteranos e Spaarti, Dark Trooper Phase Zero, EVO, Jumptrooper, Radtrooper, ISB, CompForce, Inquisidores, Sentinel, Emperor's Hand e Noghri;
  - personalidades imperiais: o aprendiz secreto de Vader, Juno Eclipse, Tarkin, Thrawn, Tremayne, Isard, Madine, Pellaeon, Sturn, Veers, Yularen e Dodonna;
  - aliados: Bail Organa, Mon Mothma, Garm Bel Iblis, Sabé, Rahm Kota e a milícia dele, Kazdan Paratus, Shaak Ti, Maris Brood, felucianos, a gangue de Drexl Roosh, jawas, ugnaughts e wookiees berserkers;
  - feras: o rancor touro e o ripper feluciano.
- **33 veículos e naves**:
  - terrestres: groundcar, Arrow-23, swoops, Freerunner, A5 Juggernaut, AT-KT, AT-CT e TX-130T imperial;
  - caças: H-60, Scyk, NovaSword, R-41, Toscan, Zebra, A-7 Hunter e TIE Prototype;
  - transportes: Hwk-290, Maka-Eekai, Guardian, Rogue Shadow e Sentinel;
  - naves capitais: Neutron Star, Escort Carrier, Gladiator, Tartan, Venator e Victory I.
- Fora dos compêndios: as organizações (Cap. 4, regras de pontuação de organização para o Mestre), a aventura e as diretrizes de campanha (Cap. 8) e o Gazetteer (Cap. 9).

### Compêndios
Espécies (21, incluindo Aqualish, Hutt, Neimoidian e Yuuzhan Vong do Cap. 16), classes heroicas, de prestígio e não heroica, 69 feats, todas as árvores de talento do livro básico (classes, Força e prestígio), 16 poderes da Força, técnicas e segredos, armas, armaduras, equipamentos e macros. Erratas oficiais de out/2008 aplicadas.

## Desenvolvimento

```bash
npm install
npm test             # testa os cálculos de regras
npm run build:packs  # gera packs/ a partir de tools/data/
```

Para publicar uma versão: atualize `version` no `system.json`, faça commit e crie uma tag `vX.Y.Z`. O GitHub Actions gera os compêndios, o zip e a release.

Os dados do compêndio ficam em `tools/data/*.mjs` (um arquivo por tipo); as regras estão em `module/rules/calc.mjs`.

## Limitações atuais
- Muitos talentos de uso situacional são descritos no item mas não automatizados (o cartão de chat indica o efeito).

## Aviso legal
Projeto de fã, gratuito e sem fins lucrativos. *Star Wars* é marca registrada da Lucasfilm Ltd.; *Star Wars Roleplaying Game Saga Edition* é da Wizards of the Coast. Este repositório não contém texto do livro: os itens do compêndio trazem apenas dados de regra e resumos próprios. Use com o seu exemplar do livro. O código é distribuído sob a licença MIT.
