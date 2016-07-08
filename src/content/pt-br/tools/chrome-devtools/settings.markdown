---
title: "Configure e customize o DevTools"
description: "Altere a aparência do DevTools e acesse recursos escondidos."
updated_on: 2016-03-29
translation_priority: 0
key-takeaways:
  tldr:
    - "Abra os menus Principal e Settings."
    - "Customize a aparência do DevTools."
    - "Acesse recursos ocultos."
---

<p class="intro">Altere a aparência do DevTools e acesse recursos escondidos.</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Abra o menu principal {#main-menu}

O **Menu Principal** do DevTools é um menu dropdown para configurar a aparência
do DevTools, acessar ferramentas adicionais, abrir as configurações, e outras coisas.

Para acessar o Menu Principal, clique no botão **Main Menu** no canto superior direito
da janela do DevTools.

![main menu](images/main-menu.png)

## Abra o menu Settings {#settings}

Para abrir as configurações do DevTools, pressione <kbd>F1</kbd> com o DevTools com foco,
ou [abra o Menu Principal](#main-menu) e então selecione **Settings**.

## Reordene as abas dos painéis {#panel-tabs}

Clique, segure, e arraste a aba de um painel para mudar a ordenação. Sua ordenação customizada
persiste através das sessões do DevTools.

Por exemplo, por padrão a aba **Network** fica normalmente na quarta posição para esquerda.

![antes de reordenar](images/before-reorder.png)

Você pode arrastá-lo para qualquer posição, podendo até deixá-lo como o primeiro no lado esquerdo.

![depois de reordenar](images/after-reorder.png)

## Customize o posicionamento do DevTools {#placement}

Você pode encaixar o DevTools na parte inferior da página, no canto direito da página, ou
você pode abri-lo em uma nova janela.

Para alterar o posicionamento do DevTools, [abra o Menu Principal](#main-menu) e selecione
o botão **Undock into separate window**
(![undock button](images/undock.png){:.inline})
button, **Dock to bottom**
(![dock to bottom button](images/dock-bottom.png){:.inline}), ou
o botão **Dock to right**
(![dock to right button](images/dock-right.png){:.inline}).

## Use tema escuro {#dark-theme}

Para usar o tema escuro do DevTools, [abra as configurações do DevTools](#settings),
vá até a página **Preferences**, encontre a sessão **Appearance**, e então
selecione **Dark** do menu **Theme**.

![dark theme](images/dark-theme.png)

## Abra e feche os painéis inferiores {#drawer-tabs}

Pressione <kbd>Esc</kbd> para abrir e fechar as **Abas Inferiores** no DevTools. A imagem
abaixo mostra um exemplo do painel **Elements** enquanto o painel **Console**
está aberto no canto inferior.

![painel Elements com painéis inferiores](images/drawer.png)

A partir dos painéis inferiores você pode executar comandos no Console, ver o Animation
Inspector, configurar condições de rede e configurações de renderização, procurar por
textos e arquivos, e emular sensores de dispositivos móveis.

Enquanto ele estiver aberto, clique no ícone com três pontos
(![three dot icon](images/three-dot.png){:.inline}) no lado esquerdo da aba
**Console** e então selecione alguma das opções para abrir outras abas.

![drawer tabs menu](images/drawer-tabs.png)

## Habilite os experimentos {#experiments}

Quando o DevTools Experiment estiver habilitado, uma nova página chamada **Experiments**
vai aparecer nas configurações do DevTools. A partir dessa página você pode habilitar e desabilitar
recursos experimentais.

Para habilitar os experimentos, vá para `chrome://flags/#enable-devtools-experiments`
e clique em **Enable**. Clique no botão **Relaunch Now** no canto inferior da página.

Você deverá ver uma nova página chamada **Experiments** ao abrir as configurações do DevTools.

![DevTools Experiments](images/experiments.png)

## Emule mídia de impressão {#emulate-print-media}

Para visualizar uma página no modo preview de impressão, [abra o menu principal do DevTools](#main-menu),
selecione **More Tools** > **Rendering Settings**, e depois habilite
o checkbox **emulate media** com o menu dropdown selecionado com **print**.

![enabling print preview mode](images/emulate-print-media.png)
