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

### Compêndios
Espécies (17), classes heroicas, de prestígio e não heroica, 69 feats, todas as árvores de talento do livro básico (classes, Força e prestígio), 16 poderes da Força, técnicas e segredos, armas, armaduras, equipamentos e macros. Erratas oficiais de out/2008 aplicadas.

## Desenvolvimento

```bash
npm install
npm test             # testa os cálculos de regras
npm run build:packs  # gera packs/ a partir de tools/data/
```

Para publicar uma versão: atualize `version` no `system.json`, faça commit e crie uma tag `vX.Y.Z`. O GitHub Actions gera os compêndios, o zip e a release.

Os dados do compêndio ficam em `tools/data/*.mjs` (um arquivo por tipo); as regras estão em `module/rules/calc.mjs`.

## Limitações atuais
- Droides como personagens jogadores, veículos/naves e criaturas ainda não têm ficha própria.
- Muitos talentos de uso situacional são descritos no item mas não automatizados (o cartão de chat indica o efeito).

## Aviso legal
Projeto de fã, gratuito e sem fins lucrativos. *Star Wars* é marca registrada da Lucasfilm Ltd.; *Star Wars Roleplaying Game Saga Edition* é da Wizards of the Coast. Este repositório não contém texto do livro: os itens do compêndio trazem apenas dados de regra e resumos próprios. Use com o seu exemplar do livro. O código é distribuído sob a licença MIT.
