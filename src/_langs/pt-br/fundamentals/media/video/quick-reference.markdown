---
layout: article
title: "Referência rápida"
description: "Uma visão geral rápida das propriedades do elemento de vídeo."
introduction: "Uma visão geral rápida das propriedades do elemento de vídeo."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 5
collection: videos
authors:
  - samdutton
key-takeaways:
  add-a-video:
    - Use o elemento para carregar, decodificar e reproduzir o vídeo em seu site.
    - Crie vídeos em vários formatos para abranger uma variedade de plataformas de dispositivos móveis.
    - Dimensione os vídeos corretamente. Certifique-se de que eles não ultrapassam o tamanho da tela.
    - A acessibilidade é importante. Adicione o elemento de faixa como um derivado do elemento de vídeo.
remember:
  media-fragments:
    - A Media Fragments API é compatível com a maioria das plataformas, exceto o iOS.
    - Certifique-se de que o recurso Range Requests é compatível com seu servidor. Por padrão, o recurso Range Requests é ativado na maioria dos servidores, mas alguns serviços de hospedagem podem tê-lo desativado.
  dont-overflow:
    - Não force a dimensão de um elemento que pode resultar em uma proporção diferente da proporção do vídeo original. O resultado visual de uma dimensão achatada ou esticada não é bom.
  accessibility-matters:
    - O elemento de faixa é compatível com o Google Chrome para Android, Safari no iOS e todos os navegadores para computador, exceto o Firefox (consulte <a href="http://caniuse.com/track" title="Rastrear o status de suporte do elemento">caniuse.com/track</a>). Também há vários códigos polyfill disponíveis. Recomendamos <a HREF ='//www.delphiki. com/html5/playr/' title ='Polyfill do elemento de rastreamento do playr'>Playr</a> ou <a HREF ='//captionatorjs. com/' title ='Faixa do captionator'>Captionator</a>.
  construct-video-streams:
    - No Android, MSE é compatível com os navegadores Google Chrome e Opera. Em computadores, MSE é compatível com o Internet Explorer 11 e o Google Chrome. A compatibilidade com o <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='cronograma de implementação de Extensões de fonte de mídia do Firefox'>Firefox</a> está prevista para versões futuras.
---

{% wrap content%}

{% include modules/toc.liquid %}

<style>

  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

</style>

## Atributos de elementos de vídeo

Para ver uma lista completa de atributos de elementos de vídeo e suas definições, veja [the video element spec](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table class="table">
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

<table>
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

<table class="table">
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

<table class="table">
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

<table class="table">
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

{% include modules/nextarticle.liquid %}

{% endwrap %}

