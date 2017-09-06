project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mude a aparência do DevTools e acesse recursos ocultos.

{# wf_updated_on: 2016-07-26 #}
{# wf_published_on: 2016-03-28 #}

# Configurar e personalizar o DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Mude a aparência do DevTools e acesse recursos 
ocultos.


### TL;DR {: .hide-from-toc }
- Abra os menus Main e Settings.
- Personalize a aparência do DevTools.
- Acesse recursos ocultos.


## Abra o Main Menu {:#main-menu}

O **Main Menu** do DevTools é um menu suspenso para configurar o visual
do DevTools, acessar ferramentas adicionais, abrir as configurações e muito mais.

Para abrir o Main Menu, clique no botão **Main Menu** na parte superior direita
da janela do DevTools.

![main menu](images/main-menu.png)

## Abrir Settings {:#settings}

Para abrir as configurações do DevTools, pressione <kbd>F1</kbd> com o DevTools em foco
ou [abra o Main Menu](#main-menu) e selecione **Settings**.

## Abrir Command Menu {:#command-menu}

Pressione <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) ou
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux) para abrir o
Command Menu.

![command menu](images/command-menu.png)

## Reorganizar guias do painel {:#panel-tabs}

Clique, mantenha e arraste uma guia do painel para alterar a ordem de listagem. Sua ordem personalizada para as guias
se mantém em todas as sessões do DevTools.

Por exemplo, por padrão, a guia **Network** normalmente é a quarta da esquerda para a direita.

![antes da reorganização](images/before-reorder.png)

Você pode arrastá-la para qualquer posição, como primeira da esquerda para a direita.

![depois da reorganização](images/after-reorder.png)

## Personalizar posicionamento do DevTools {:#placement}

Você pode ancorar o DevTools no fundo da página, à direita dela ou 
pode abri-lo em uma nova janela. 

Para alterar o local do DevTools, [abra o Main Menu](#main-menu) e selecione
o botão **Undock into separate window** 
(![botão undock](images/undock.png){:.inline})
, **Dock to bottom** 
(![botão dock to bottom](images/dock-bottom.png){:.inline})
 ou 
**Dock to right** 
(![botão dock to right](images/dock-right.png){:.inline})
. 

## Usar tema escuro {:#dark-theme}

Para usar um tema escuro no DevTools, [abra Settings no DevTools](#settings),
acesse a página **Preferences**, encontre a seção **Appearance** e
selecione **Dark** no menu suspenso **Theme**.

![tema escuro](images/dark-theme.png)

## Abrir e fechar as guias da gaveta {:#drawer-tabs}

Pressione <kbd>Esc</kbd> para abrir e fechar a **Drawer** do DevTools. A imagem
abaixo mostra um exemplo do painel **Elements** com a gaveta **Console**
aberta na parte inferior.

![Painel Elements com gaveta](images/drawer.png)

Na gaveta, você pode executar comandos no Console, visualizar o Animation 
Inspector, ajustar condições de rede e configurações de renderização, buscar 
strings e arquivos e emular sensores de dispositivos móveis.

Com a Drawer aberta, clique no ícone de reticências
(![ícone de reticências](images/three-dot.png){:.inline}) à esquerda da 
guia **Console** e selecione uma das opções do menu suspenso para abrir as
outras guias.

![menu de guias da gaveta](images/drawer-tabs.png)

## Ativar experimentos {:#experiments}

Quando os DevTools Experiments estão ativados, uma nova página chamada **Experiments**
 aparece em Settings. Nesta página, você pode ativar e desativar
recursos experimentais.

Para ativar os experimentos, acesse `chrome://flags/#enable-devtools-experiments`
e clique em **Enable**. Clique no botão **Relaunch Now** no fim da
página. 

Agora você verá uma nova página chamada **Experiments** quando abrir Settings
no DevTools.

![Experimentos do DevTools](images/experiments.png)

## Emular mídia de impressão {:#emulate-print-media}

Para visualizar uma página em modo de prévia de impressão, [abra o menu principal do 
DevTools](#main-menu), selecione **More Tools** > **Rendering Settings** e 
marque a caixa de seleção **emulate media** com o menu suspenso definido como **print**.

![como ativar o modo de prévia de impressão](images/emulate-print-media.png)

## Exibir comentários HTML {: #show-html-comments }

Para exibir ou ocultar comentários HTML no painel **Elements**, [abra
**Settings**](#settings), selecione o painel **Preferences**, encontre a seção
**Elements** e marque a caixa de seleção **Show HTML comments**.


{# wf_devsite_translation #}
