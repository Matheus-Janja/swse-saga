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
- **Compêndio "Veículos e Naves"** com os 18 veículos do livro: AT-AT, AT-ST, X-34, speeder bike 74-Z, AAT-1, T-47, LAAT/i, X-wing, Y-wing, TIE fighter, TIE interceptor, Eta-2, ARC-170, Vulture, Tri-Fighter, YT-1300, Corvette Corelliana e Star Destroyer classe Imperial I. Um teste garante que todos batem com o livro.

### Droides jogadores
Marque **"Personagem droide"** no primeiro passo da criação (Cap. 11):
- 5 atributos (sem Constituição): compra de 21 pontos, pacote 15/14/13/12/10 ou 5× 4d6.
- "Espécies" por **grau** (1º a 5º) e **tamanho** (Médio ou Pequeno), com os modificadores das Tabelas 11-1 e 11-2 e os traços de droide. Droides não podem ser Jedi nem pegar Force Sensitivity.
- Novo passo **Sistemas de Droide**: começa com processador heurístico, duas mãos e locomoção básica, e gasta até 1.000 créditos em locomoção, apêndices, sensores, comunicação, escudos, tradutores, armazenamento e armaduras embutidas — com o custo calculado pelo fator de tamanho (Tabelas 11-3 a 11-6).
- Na ficha: Fortitude com Força, PV sem Con, deslocamento do melhor sistema de locomoção, armadura embutida sem redução de deslocamento, pacote sensorial (+2 Perception), rerrolagens de garras de escalada e servos de salto, dano desarmado pelo apêndice (Tabela 11-4), processador básico restringindo perícias sem treino, imunidade a atordoamento e vulnerabilidade a íon.
- Compêndio **Sistemas de Droide** com 59 sistemas e 11 armaduras embutidas.

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
