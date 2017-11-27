project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Use o painel Timeline do Chrome DevTools para registrar e analisar todas as atividades no seu aplicativo enquanto ele está em execução. É o melhor lugar para começar a investigar problemas de desempenho percebidos no seu aplicativo.

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-06-08 #}

# Como usar a ferramenta Timeline {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Use o painel <em>Timeline</em> do Chrome DevTools para registrar e
analisar todas as atividades no seu aplicativo enquanto ele está em execução. É o melhor 
lugar para começar a investigar problemas de desempenho percebidos no seu 
aplicativo.

![Ferramenta Timeline](imgs/timeline-panel.png)


### TL;DR {: .hide-from-toc }
- Faça uma gravação na Timeline para analisar cada evento que ocorreu depois de um carregamento da página ou de uma interação do usuário.
- Visualize FPS, CPU e solicitações de rede na seção Overview.
- Clique em um evento dentro do Flame Chart para ver detalhes.
- Aumente o zoom em uma seção de uma gravação para facilitar a análise.


## Visão geral do painel Timeline {:#timeline-overview}

O painel Timeline é composto por quatro seções:

1. **Controls**. Comece ou pare uma gravação e 
   configure que informações serão capturadas durante ela.
2. **Overview**. Um resumo de alto nível do desempenho da página. Veja mais sobre 
   isso abaixo.
3. **Flame Chart**. Uma visualização do rastreamento de pilha do CPU. 

   Você pode ver linhas verticais com um, dois ou três pontos no **Flame Chart**. A 
   linha azul representa o evento `DOMContentLoaded`. A linha verde representa 
   o tempo da primeira coloração. A linha vermelha representa o evento `load`.

4. **Details**. Quando um evento é selecionado, esta seção mostra mais informações 
   sobre esse evento. Quando nenhum evento é selecionado, esta seção mostra informações 
   sobre o período selecionado. 

![painel timeline comentado](imgs/timeline-annotated.png)

### Seção Overview

A seção **Overview** é composta de três diagramas:

1. **FPS**. Quadros por segundo. Quanto maior for a barra verde, maior será o 
   FPS. Os blocos vermelhos acima do diagrama de FPS indica quadros longos, que são 
   prováveis candidatos a [enrolação][jank].
2. **CPU**. Recursos de CPU. Este [gráfico de área][ac] indica que tipos de evento 
   consumiram recursos da CPU.
3. **NET**. Cada barra colorida representa um recurso. Quanto maior for a barra, mais
   tempo levará para recuperar o recurso. A parte mais clara de cada barra 
   representa o tempo de espera (o tempo entre quando o recurso foi solicitado
   e o tempo em que o primeiro byte foi baixado). A parte mais escura
   representa o tempo de transferência (o intervalo entre os tempos de quando o primeiro e o último bytes
   foram baixados).

   As barras são codificadas por cor da seguinte forma:
   <!-- source: https://goo.gl/eANVFf -->
   
   * Os arquivos HTML são **<span style="color:hsl(214, 67%, 66%)">azuis</span>**.
   * Os scripts são **<span style="color:hsl(43, 83%, 64%)">amarelos</span>**.
   * As folhas de estilo são **<span style="color:hsl(256, 67%, 70%)">roxas</span>**.
   * Os arquivos de mídia são **<span style="color:hsl(109, 33%, 55%)">verdes</span>**.
   * Os recursos diversos são 
     **<span style="color:hsl(0, 0%, 70%)">cinza</span>**.

![seção overview, comentada](imgs/overview-annotated.jpg)

[ac]: https://en.wikipedia.org/wiki/Area_chart 
[jank]: /web/fundamentals/performance/rendering/

## Fazer uma gravação

Para fazer uma gravação de um *carregamento de página*, abra o painel **Timeline**, abra a 
página que deseja registrar e recarregue-a. O painel **Timeline** 
grava automaticamente o recarregamento da página.

Para fazer uma gravação de uma *interação da página*, abra o painel **Timeline** e
comece a gravar pressionando o botão **Record** 
(![botão record](imgs/record-off.png){:.inline}) ou digitando o atalho 
de teclado <kbd>Cmd</kbd>+<kbd>E</kbd> (Mac) ou <kbd>Ctrl</kbd>+<kbd>E</kbd> 
(Windows/Linux). O botão **Record** fica vermelho durante uma gravação. Realize 
as interações na página e pressione o botão **Record** ou digite o 
atalho de teclado novamente para parar a gravação.

Quando a gravação acabar, o DevTools supõe qual parte da gravação
é mais relevante para você e aproxima o zoom nela automaticamente.

### Dicas de gravação

* **Mantenha as gravações com o menor tamanho possível.** Gravações mais curtas geralmente facilitam 
  a análise.
* **Evite ações desnecessárias**. Evite ações (cliques de mouse, carregamentos de rede 
  etc.) que sejam irrelevantes à atividade que você deseja gravar e analisar.
  Por exemplo, se quiser registrar eventos que ocorrem depois de clicar em um botão de 
  Login, não role a página, carregue imagens etc.
* **Ativar o cache do navegador**. Ao gravar operações de rede, é uma 
  boa ideia desativar o cache do navegador no painel Settings do DevTools ou
  na gaveta [**Network conditions**][nc].
* **Desativar extensões**. As extensões do Chrome podem adicionar ruído não relacionado às 
  gravações do seu aplicativo na Timeline. Abra uma janela do Chrome no 
  [modo de navegação anônima][incognito] ou crie um novo 
  [perfil de usuário do Chrome][new chrome profile] para garantir que o ambiente
  não tenha extensões.

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions
[modo de navegação anônima]: https://support.google.com/chrome/answer/95464
[novo perfil do chrome]: https://support.google.com/chrome/answer/142059

## Visualizar detalhes da gravação

Ao selecionar um evento no **Flame Chart**, a seção **Details** exibe 
informações adicionais sobre o evento.

![seção details](imgs/details-pane.png)

Algumas guias, como a **Summary**, estão presentes para todos os tipos de evento. Outras abas só
estão disponíveis para determinados tipos de evento. Consulte a [Referência de eventos 
da Timeline][event reference] para obter detalhes sobre cada tipo de gravação.

[event reference]: /web/tools/chrome-devtools/profile/evaluate-performance/performance-reference

## Capturar imagens da tela durante a gravação {:#filmstrip}

O painel **Timeline** pode capturar imagens da tela durante o carregamento de uma página. Este recurso
é conhecido como **Filmstrip**.

Marque a caixa de seleção **Screenshots** na seção **Controls** antes de fazer
uma gravação para capturar imagens da tela da gravação. As capturas de tela são
exibidas abaixo da seção **Overview**.

![gravação da linha do tempo com filmstrip](imgs/timeline-filmstrip.png)

Passe o cursor sobre **Screenshots** ou a seção **Overview** para visualizar uma 
imagem aproximada desse ponto na gravação. Mova o cursor para a esquerda e para a
direita para simular uma animação da gravação.

<video src="animations/hover.mp4" autoplay muted loop controls></video>

## Perfil JavaScript {:#profile-js}

Marque a caixa de seleção **JS Profile** antes de realizar uma gravação para capturar 
pilhas JavaScript na gravação da linha do tempo. Quando o criador de perfis JS estiver 
ativo, o Flame Chart exibirá todas as funções JavaScript que forem chamadas. 

![flame chart com perfil JS ativo](imgs/js-profile.png)

## Coloração de perfil {:#profile-painting}

Ative a caixa de seleção **Paint** antes de realizar uma gravação para receber mais informações
sobre os eventos de **Paint**. Quando a criação de perfil de cor estiver ativa e você clicar
em um evento de **Paint**, uma nova guia **Paint Profiler** será exibida na seção
**Details** para exibir informações muito mais específicas sobre o evento.

![criador de perfis de cor](imgs/paint-profiler.png)

### Configurações de renderização {:#rendering-settings}

Abra o menu principal do DevTools e selecione **More tools** > **Rendering settings**
para acessar as configurações de renderização que podem ser úteis para depurar problemas de cor.
As configurações de renderização abrem como uma guia próxima à gaveta **Console** (pressione
<kbd>esc</kbd> para exibir a gaveta, caso ela esteja oculta).

![configurações de renderização](imgs/rendering-settings.png)

## Buscar gravações

Ao analisar eventos, você pode querer se concentrar em um tipo de evento. Por
exemplo, talvez você precise visualizar os detalhes de cada evento `Parse HTML`. 

Pressione <kbd>Cmd</kbd>+<kbd>F</kbd> (Mac) ou <kbd>Ctrl</kbd>+<kbd>F</kbd> 
(Windows/Linux) com a **Timeline** em foco para abrir uma barra de ferramentas de busca.
Digite o nome do tipo de evento que quer inspecionar, como `Event`.

A barra de ferramentas só se aplica ao período atualmente selecionado. Todos os eventos 
externos ao período de tempo selecionado não são incluídos nos resultados. 

As setas para cima e para baixo movem você cronologicamente pelos resultados. Assim, o
primeiro resultado representa o evento mais antigo no período selecionado e
o último resultado representa o último evento. Sempre que você pressionar a seta
para cima ou a para baixo, um novo evento será selecionado, e você poderá ver seus detalhes no
painel **Details**. Pressionar as setas para cima e para baixo é equivalente a clicar 
em um evento no **Flame Chart**.

![barra de ferramentas de busca](imgs/find-toolbar.png)

## Aumentar o zoom em uma seção da Timeline {:#zoom}

Você pode aumentar o zoom em uma seção de uma gravação para facilitar a análise. Você usa
o painel **Overview** para aproximar a vista em uma seção da gravação. Depois de aumentar o zoom,
o **Flame Chart** tem o zoom ajustado automaticamente para corresponder à mesma seção.

![aumentar zoom em uma seção de uma gravação da linha do tempo](imgs/zoom.png)

Para aumentar o zoom em uma seção da Timeline:

* No painel **Overview**, arraste uma seleção da Timeline com o cursor.
* Ajuste os controles deslizantes cinza na área da régua.

Depois de selecionar uma seção, você pode usar as teclas <kbd>W</kbd>,<kbd>A</kbd>,
<kbd>S</kbd> e <kbd>D</kbd> para ajustar a seleção. <kbd>W</kbd> 
e <kbd>S</kbd> aproximam e afastam a vista, respectivamente. <kbd>A</kbd> e 
<kbd>D</kbd> movem para a esquerda e para a direita, respectivamente.

## Salvar e carregar gravações

Você pode salvar e abrir gravações clicando com o botão direito dentro das seções 
**Overview** ou **Flame Chart** e selecionando a respectiva opção.

![salvar e abrir gravações](imgs/save-open.png)


{# wf_devsite_translation #}
