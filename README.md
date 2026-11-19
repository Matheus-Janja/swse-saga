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
