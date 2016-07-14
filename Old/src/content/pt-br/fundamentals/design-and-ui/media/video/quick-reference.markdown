---
title: "Referência rápida"
description: "Uma visão geral rápida das propriedades do elemento de vídeo."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Use o elemento de vídeo para carregar, decodificar e reproduzir vídeos no seu site."
    - "Produza vídeos em diversos formatos para disponibilizá-los em várias plataformas de dispositivos móveis."
    - "Dimensione os vídeos corretamente e assegure-se de que eles não transbordem os recipientes."
    - "A acessibilidade é importante. Adicione o elemento de faixa como um derivado do elemento de vídeo."
notes:
  media-fragments:
    - "A API dos fragmentos de mídia é compatível com a maioria das plataformas, mas não com iOS."
    - "Certifique-se de que as solicitações de faixa sejam compatíveis com seu servidor. As solicitações de faixa são habilitadas por padrão na maioria dos servidores, mas alguns serviços de hospedagem podem desativá-las."
  dont-overflow:
    - "Não force o dimensionamento de elementos se isso resultar em uma proporção diferente do vídeo original. Uma imagem achatada ou alongada tem aparência feia."
  accessibility-matters:
    - "O elemento de faixa é aceito no Google Chrome para Android, Safari (iOS) e em todos os navegadores atuais para computador, exceto Firefox (veja <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>). Também existem diversas opções de polyfill disponíveis. Recomendamos o <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> ou o <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>."
  construct-video-streams:
    - "A especificação MSE é compatível com Google Chrome e Opera para Android e com o Internet Explorer 11 e Google Chrome para computador, com suporte planejado para <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>."
  optimize:
    - "<a href='../images/'>Imagens</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>Como otimizar a eficiência do conteúdo</a>"
---

<p class="intro">
  Uma visão geral rápida das propriedades do elemento de vídeo.
</p>

{% include shared/toc.liquid %}


## Atributos de elementos de vídeo

Para ver uma lista completa de atributos de elementos de vídeo e suas definições, veja [the video element spec](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table class="mdl-data-table mdl-js-data-table">
  <thead>
      <th>Atributo</th>
      <th>Disponibilidade</th>
      <th>Descrição</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Atributo"><code>src</code></td>
      <td data-th="Disponibilidade">Todos os navegadores</td>
      <td data-th="Descrição">Endereço (URL) do vídeo.</td>
    </tr>
    <tr>
      <td data-th="Atributo"><code>poster</code></td>
      <td data-th="Disponibilidade">Todos os navegadores</td>
      <td data-th="Descrição">Endereço (URL) de um arquivo de imagem que o navegador pode exibir assim que o elemento de vídeo for exibido, sem precisar fazer o download do conteúdo do vídeo.</td>
    </tr>
    <tr>
      <td data-th="Atributo"><code>preload</code></td>
      <td data-th="Disponibilidade">Todos os navegadores de dispositivos móveis ignoram o atributo `preload`.</td>
      <td data-th="Descrição">Informa o navegador de que é útil pré-carregar os metadados (ou vídeos) antes de sua reprodução. As opções são: none (nenhum), metadata (metadados) ou auto (automático) (consulte a seção `Pré-carregamento` para mais detalhes). </td>
    </tr>
    <tr>
      <td data-th="Atributo"><code>autoplay</code></td>
      <td data-th="Disponibilidade">Não é compatível com o iPhone nem com o Android. É compatível com todos os navegadores de computadores, iPad, Firefox e Opera para Android.</td>
      <td data-th="Description">Inicia o download e a reprodução assim que possível (consulte a seção `Reprodução automática`). </td>
    </tr>
    <tr>
      <td data-th="Atributo"><code>loop</code></td>
      <td data-th="Disponibilidade">Todos os navegadores</td>
      <td data-th="Descrição">Deixa o vídeo em loop.</td>
    </tr>
    <tr>
      <td data-th="Atributo"><code>controls</code></td>
      <td data-th="Disponibilidade">Todos os navegadores</td>
      <td data-th="Descrição">Exibe os controles padrão do vídeo (reproduzir, pausar etc.)</td>
    </tr>
  </tbody>
</table>

### Reprodução automática

Em computadores, `Reprodução automática` informa ao navegador para iniciar imediatamente o download e, assim que possível, iniciar a reprodução do vídeo. No iOS e Google Chrome para Android, a opção `Reprodução automática` não funciona. Os usuários precisam tocar na tela para reproduzir o vídeo.

Até mesmo em plataforma em que a reprodução automática é possível, é preciso avaliar se é útil ativá-la.

* O uso de dados pode ser caro.
* Iniciar o download e a reprodução de uma mídia sem solicitar o consentimento do usuário pode comprometer inesperadamente a largura de banda e o uso da CPU, o que atrasaria a renderização da página. 
* Os usuários podem estar em um contexto em que a reprodução de vídeo ou de áudio seria considerada inadequada.

O comportamento da Reprodução automática pode ser configurado no Android WebView por meio da [WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
O padrão é verdadeiro, mas um aplicativo da WebView pode oferecer a opção de desabilitá-lo.

### Pré-carregar

O atributo `preload` informa ao navegador quanto de informação ou conteúdo deve ser pré-carregado.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Valor</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Valor"><code>none</code></td>
      <td data-th="Descrição">O usuário pode nem assistir ao vídeo. Não realiza o pré-carregamento.</td>
    </tr>
    <tr>
      <td data-th="Valor"><code>metadata</code></td>
      <td data-th="Descrição">Os metadados (duração, dimensões e faixas de texto) devem ser pré-carregados, mas com vídeo pequeno.</td>
    </tr>
    <tr>
      <td data-th="Valor"><code>auto</code></td>
      <td data-th="Descrição">Considera-se desejável o download imediato de todo o vídeo.</td>
    </tr>
  </tbody>
</table>

O atributo "preload" tem efeitos diferentes dependendo da plataforma.
Por exemplo, o Google Chrome armazena em buffer 25 segundos do vídeo em um computador e nada no iOS nem no Android. Isso significa que em dispositivos móveis podem ocorrer atrasos de inicialização da reprodução que não ocorrem em computadores. Consulte [a página de teste de Steve Souders](//stevesouders.com/tests/mediaevents.php) para ver detalhes completos.

## JavaScript

[O artigo "HTML5 Rocks Video"](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) fez um ótimo trabalho em resumir as propriedades, os métodos e os eventos de Javascript que podem ser usados para controlar a reprodução de vídeos. Incluímos o conteúdo aqui e o atualizamos com questões específicas a dispositivos móveis em partes relevantes.

### Propriedades

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Propriedade</th>
      <th>Descrição</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Propriedade"><code>currentTime</code></td>
      <td data-th="Descrição">Ver ou definir a posição de reprodução em segundos.</td>
    </tr>
    <tr>
      <td data-th="Propriedade"><code>volume</code></td>
      <td data-th="Descrição">Ver ou definir o nível do volume atual do vídeo.</td>
    </tr>
    <tr>
      <td data-th="Propriedade"><code>muted</code></td>
      <td data-th="Descrição">Ver ou definir o áudio como mudo.</td>
    </tr>
    <tr>
      <td data-th="Propriedade"><code>playbackRate</code></td>
      <td data-th="Descrição">Ver ou definir a taxa de reprodução. A velocidade de reprodução normalmente é um.</td>
    </tr>
    <tr>
      <td data-th="Propriedade"><code>buffered</code></td>
      <td data-th="Descrição">Informações sobre quanto do vídeo foi armazenado em buffer e está pronto para reprodução (veja a <a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="Demonstração exibindo a quantidade de vídeo armazenado em buffer em um elemento de tela">demonstração</a>).</td>
    </tr>
    <tr>
      <td data-th="Propriedade"><code>currentSrc</code></td>
      <td data-th="Descrição">O endereço do vídeo em reprodução.</td>
    </tr>
    <tr>
      <td data-th="Propriedade"><code>videoWidth</code></td>
      <td data-th="Descrição">Largura do vídeo em pixels (pode ser diferente da largura do elemento de vídeo).</td>
    </tr>
    <tr>
      <td data-th="Propriedade"><code>videoHeight</code></td>
      <td data-th="Descrição">Altura do vídeo em pixels (pode ser diferente da altura do elemento de vídeo).</td>
    </tr>
  </tbody>
</table>

Tanto playbackRate ({% link_sample _code/scripted.html %}ver demonstração{% endlink_sample %}) como o volume não são compatíveis com dispositivos móveis.

### Métodos

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Método</th>
    <th>Descrição</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Método"><code>load()</code></td>
      <td data-th="Descrição">Carrega ou recarrega uma fonte de vídeo sem iniciar a reprodução. Por exemplo, quando o src do vídeo é alterado usando JavaScript.</td>
    </tr>
    <tr>
      <td data-th="Método"><code>play()</code></td>
      <td data-th="Descrição">Reproduz um vídeo a partir do seu local atual.</td>
    </tr>
    <tr>
      <td data-th="Método"><code>pause()</code></td>
      <td data-th="Descrição">Pausa o vídeo em seu local atual.</td>
    </tr>
    <tr>
      <td data-th="Método"><code>canPlayType('format')</code></td>
      <td data-th="Descrição">Saiba os formatos compatíveis (confira `Verificar os formatos compatíveis`).</td>
    </tr>
  </tbody>
</table>

Em dispositivos móveis (exceto o Opera para Android), os métodos `play()` e `pause()` não funcionam, a menos que
sejam chamados em resposta a uma ação do usuário, como clicar em um botão. Veja a {% link_sample _code/scripted.html %}demonstração{% endlink_sample %}. Da mesma forma, a reprodução não pode ser iniciada para conteúdos como vídeos incorporados do YouTube.

### Eventos

Esses são os únicos subconjuntos de eventos de mídia que podem ser acionados. Consulte a página [eventos de mídia](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) no Mozilla Developer Network para ver uma listagem completa.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Evento</th>
      <th>Descrição</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Evento"><code>canplaythrough</code></td>
      <td data-th="Descrição">Acionado quando há dados suficientes disponíveis a ponto de o navegador analisar que a reprodução do vídeo pode ser feita sem nenhuma interrupção.</td>
    </tr>
    <tr>
      <td data-th="Evento"><code>ended</code></td>
      <td data-th="Descrição">Acionado quando a reprodução do vídeo terminou.</td>
    </tr>
    <tr>
      <td data-th="Evento"><code>error</code></td>
      <td data-th="Descrição">Acionado em caso de erros.</td>
    </tr>
    <tr>
      <td data-th="Evento"><code>playing</code></td>
      <td data-th="Descrição">Acionado quando a reprodução do vídeo é iniciada pela primeira vez, após ter sido pausada ou quando está reiniciando.</td>
    </tr>
    <tr>
      <td data-th="Evento"><code>progress</code></td>
      <td data-th="Descrição">Acionado periodicamente para indicar o progresso do download.</td>
    </tr>
    <tr>
      <td data-th="Evento"><code>waiting</code></td>
      <td data-th="Descrição">Acionado quando uma ação está atrasada, pois está aguardando o término de outra ação.</td>
    </tr>
    <tr>
      <td data-th="Evento"><code>loadedmetadata</code></td>
      <td data-th="Descrição">Acionado quando o navegador termina de carregar os metadados do vídeo: duração, dimensões e faixas de texto.</td>
    </tr>
  </tbody>
</table>



