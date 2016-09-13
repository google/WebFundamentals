project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Conheça as maneiras mais simples de adicionar vídeos ao seu site e garantir que os usuários tenham a melhor experiência possível em qualquer dispositivo.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Vídeo {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}



Os usuários gostam de vídeos porque eles são divertidos e informativos. Nos dispositivos móveis, os vídeos podem ser uma maneira fácil de adquirir informações. Mas os vídeos consomem largura de banda e nem sempre funcionam da mesma forma em todas as plataformas. Os usuários não gostam de esperar o carregamento dos vídeos, nem quando eles reproduzem o vídeo e nada acontece. Leia mais para conhecer a maneira mais simples de adicionar vídeos ao seu site e garantir que os usuários tenham a melhor experiência possível em qualquer dispositivo.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## Adicione um vídeo 




Conheça as maneiras mais simples de adicionar vídeos ao seu site e garantir que os usuários tenham a melhor experiência possível em qualquer dispositivo.



### TL;DR {: .hide-from-toc }
- 'Use o elemento de vídeo para carregar, decodificar e reproduzir vídeos no seu site.'
- Produza vídeos em diversos formatos para disponibilizá-los em várias plataformas de dispositivos móveis.
- Dimensione os vídeos corretamente e assegure-se de que eles não transbordem os recipientes.
- A acessibilidade é importante. Adicione o elemento de faixa como um derivado do elemento de vídeo.


### Adicione o elemento de vídeo

Adicione o elemento de vídeo para carregar, decodificar e reproduzir vídeos no seu site:

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>Este navegador não oferece suporte ao elemento de vídeo.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Seu navegador não oferece suporte ao elemento de vídeo.</p>
    </video>
    

### Especifique diversos formatos de arquivo

Nem todos os navegadores aceitam os mesmos formatos de vídeo.
O elemento `<source>` permite especificar múltiplos formatos como opções de substituição, caso o navegador do usuário não aceite um deles.
Por exemplo:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/video-main.html" region_tag="sourcetypes" %}
</pre>

Ao analisar as tags `<source>`, o navegador usa o atributo `type` opcional para decidir qual arquivo deve ser acessado por download e reproduzido. Se o navegador for compatível com WebM, ele reproduzirá chrome.webm. Caso contrário, ele verificará se é possível reproduzir vídeos em MPEG-4.
Confira <a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>este guia de formatos digitais</a> para saber mais sobre como funcionam os formatos de áudio e vídeo na Web.

Essa abordagem apresenta inúmeras vantagens em relação à veiculação de diferentes códigos HTML ou scripts de servidores, especialmente em dispositivos móveis:

* Os desenvolvedores podem listar os formatos em ordem de preferência.
* A seleção nativa feita pelo cliente reduz a latência, já que apenas uma solicitação de conteúdo é feita.
* Deixar que o navegador escolha um formato é uma opção mais simples, mais rápida e possivelmente mais confiável do que usar um banco de dados de suporte do servidor com detecção de user-agent.
* Ao especificar o tipo de origem de cada arquivo, você melhora o desempenho da rede, já que o navegador pode selecionar uma origem de arquivo sem ter que fazer o download de parte do vídeo para verificar o formato.

Todos esses argumentos são ainda mais importantes em dispositivos móveis, nos quais a largura de banda e a latência são características valiosas e a paciência do usuário é mais limitada. 
A não inclusão de um atributo de tipo pode afetar o desempenho quando existem várias origens com tipos incompatíveis.

Use as ferramentas para desenvolvedor do seu navegador móvel para comparar a atividade da rede <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">com atributos de tipo</a> e <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/notype.html">sem atributos de tipo</a>.
Além disso, verifique os cabeçalhos de resposta nas ferramentas para desenvolvedor do navegador a fim de [garantir que o servidor informe o tipo correto de MIME](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types). Caso contrário, as verificações do tipo de origem dos vídeos não funcionarão.

### Especifique um horário de início e de término

Economize largura de banda e faça com que seu site seja mais responsivo: use a API dos fragmentos de mídia para adicionar horário de início e de término ao elemento de vídeo.

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>Este navegador não oferece suporte ao elemento de vídeo.</p>
</video>

Para adicionar um fragmento de mídia, adicione `#t=[start_time][,end_time]` ao URL da mídia. Por exemplo, para reproduzir o vídeo entre os segundos 5 e 10, especifique:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

A API dos fragmentos de mídia também pode ser usada para fornecer diversas visualizações do mesmo vídeo, como pontos de marcação em um DVD, sem ter que codificar e veicular diversos arquivos.

<!-- TODO: Verify note type! -->
Note: - 'A API dos fragmentos de mídia é compatível com a maioria das plataformas, mas não com iOS.'
- 'Certifique-se de que as solicitações de faixa sejam compatíveis com seu servidor. As solicitações de faixa são habilitadas por padrão na maioria dos servidores, mas alguns serviços de hospedagem podem desativá-las.'


Com as ferramentas para desenvolvedores do seu navegador, verifique `Accept-Ranges: bytes` nos cabeçalhos de resposta:

<img class="center" alt="Captura de tela das ferramentas para desenvolvedores do Google Chrome: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### Inclua uma imagem em formato pôster

Adicione um atributo de pôster ao elemento de vídeo para que os usuários tenham uma ideia do conteúdo assim que o elemento é carregado, sem ter que fazer o download do vídeo nem iniciar a reprodução.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

Um pôster também pode ser usado como substituto se o `src` do vídeo estiver quebrado ou se nenhum formato de vídeo for compatível. A única desvantagem das imagens em formato de pôster é a necessidade de fazer uma solicitação adicional de arquivo, o que consome mais largura de banda e requer processamento. Para saber mais detalhes, consulte [Otimização de imagem](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

Veja uma comparação de vídeos sem e com uma imagem de pôster. A imagem está em escala de cinza para provar que não é o vídeo:

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Captura de tela do Google Chrome para Android, orientação retrato: sem imagem de pôster" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Captura de tela do Google Chrome para Android, orientação retrato: com imagem de pôster" src="images/Chrome-Android-video-poster.png">
  </div>
</div>


## Forneça alternativas para plataformas legadas 




Nem todos os formatos de vídeo são compatíveis com todas as plataformas. Verifique quais formatos são aceitos pelas principais plataformas e faça com que seu vídeo seja exibido corretamente em cada um deles.



### Verifique quais formatos são compatíveis

Use `canPlayType()` para descobrir quais formatos de vídeo são compatíveis. O método usa um argumento de string que consiste em um `mime-type` e codecs opcionais e retorna um dos seguintes valores:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Valor retornado</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Valor retornado">(string vazia)</td>
      <td data-th="Descrição">O recipiente e/ou o codec não são compatíveis.</td>
    </tr>
    <tr>
      <td data-th="Valor retornado"><code>maybe</code></td>
      <td data-th="Descrição">
        O recipiente e os codecs podem ser compatíveis, mas o navegador
        precisará fazer o download de partes dos vídeos para verificar.
      </td>
    </tr>
    <tr>
      <td data-th="Valor retornado"><code>probably</code></td>
      <td data-th="Descrição">O formato parece ser compatível.
      </td>
    </tr>
  </tbody>
</table>

Veja alguns exemplos de argumentos `canPlayType()` e valores retornados quando executados no Google Chrome:


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Tipo</th>
      <th>Resposta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Tipo"><code>video/xyz</code></td>
      <td data-th="Resposta">(string vazia)</td>
    </tr>
    <tr>
      <td data-th="Tipo"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Resposta">(string vazia)</td>
    </tr>
    <tr>
      <td data-th="Tipo"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Resposta">(string vazia)</td>
    </tr>
    <tr>
      <td data-th="Tipo"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Resposta"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Tipo"><code>video/webm</code></td>
      <td data-th="Resposta"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Tipo"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Resposta"><code>probably</code></td>
    </tr>
  </tbody>
</table>


### Produza vídeos em vários formatos

Inúmeras ferramentas podem ser usadas para salvar o mesmo vídeo em diferentes formatos:

* Ferramentas para computador: [FFmpeg](//ffmpeg.org/)
* Aplicativos para interface do usuário: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Serviços on-line de codificação/transcodificação: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### Verifique qual formato foi usado

Quer saber qual formato de vídeo foi escolhido pelo navegador?

Em JavaScript, use a propriedade `currentSrc` para retornar a origem usada.

Para ver isto em ação, confira <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">esta demonstração</a>: Google Chrome e Firefox escolhem o `chrome.webm` (porque esta é a primeira opção na lista de possíveis origens que os navegadores aceitam), enquanto o Safari escolhe `chrome.mp4`.


## Dimensione o tamanho dos vídeos corretamente 




Quando a satisfação de seus usuários está em jogo, o tamanho importa.


### TL;DR {: .hide-from-toc }
- Evite veicular vídeos que tenham um tamanho de quadro maior ou uma qualidade superior ao que é compatível com a plataforma.
- Não exagere na duração de seus vídeos.
- Vídeos longos podem causar interrupções no download e na busca. Alguns navegadores podem precisar aguardar até que o download do vídeo seja feito antes de poder reproduzi-lo.



### Verifique o tamanho do vídeo

O tamanho de quadro real do vídeo quando estiver codificado pode ser diferente das dimensões do elemento de vídeo (assim como uma imagem pode não ser exibida usando suas dimensões reais).

Para verificar o tamanho codificado de um vídeo, use as propriedades do elemento de vídeo `videoWidth` e `videoHeight`. As propriedades `width` e `height` retornam as dimensões do elemento de vídeo, que podem ter sido dimensionadas usando CSS ou atributos de altura e largura in-line.

### Certifique-se de que os vídeos não ultrapassem o tamanho da janela de visualização

Quando os elementos de vídeos são muito grandes para a janela de visualização, eles podem se expandir demasiadamente, impossibilitando que os usuários vejam seu conteúdo ou usem
os controles.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Captura de tela do Google Chrome para Android, retrato. O elemento de vídeo não estilizado ultrapassa o tamanho da janela de visualização" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Captura de tela do Google Chrome para Android, paisagem. O elemento de vídeo não estilizado ultrapassa o tamanho da janela de visualização" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Controle as dimensões do vídeo usando o JavaScript e CSS. As bibliotecas e os plug-ins do JavaScript como [FitVids](//fitvidsjs.com/) possibilitam manter o tamanho e a proporção adequados, até mesmo para vídeos em Flash do YouTube e outras fontes.

Use [consultas de mídia CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) para especificar o tamanho dos elementos dependendo das dimensões da janela de visualização: `max-width: 100%` é seu braço direito.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

Para conteúdo de mídia em iframe (como vídeos do YouTube), tente uma abordagem ágil (como a que foi [proposta por John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).

<!-- TODO: Verify note type! -->
Note: Não force o dimensionamento de elementos se isso resultar em uma proporção diferente do vídeo original. Uma imagem achatada ou alongada tem aparência feia.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

Compare a <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">amostra ágil</a> com a <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">versão não ágil</a>.


## Personalize o player de vídeo 




Plataformas diferentes exibem os vídeos de maneiras diferentes. As soluções para dispositivos móveis precisam levar em conta a orientação do dispositivo. Use a API de tela cheia para controlar a visualização em tela cheia do conteúdo de vídeo.



Plataformas diferentes exibem os vídeos de maneiras diferentes. As soluções para dispositivos móveis precisam levar em conta a orientação do dispositivo. Use a API de tela cheia para controlar a visualização em tela cheia do conteúdo de vídeo.

### Como funciona a orientação dos dispositivos

A orientação dos dispositivos não é um problema relacionado a laptops e a monitores de computadores, mas é extremamente importante para o design de páginas para celulares e tablets.

O Safari do iPhone executa com eficiência a alternância entre as orientações de retrato e paisagem:

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Captura de tela de um vídeo reproduzido no Safari do iPhone em modo retrato" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Captura de tela de um vídeo reproduzido no Safari do iPhone em modo paisagem" src="images/iPhone-video-playing-landscape.png">
</div>

A orientação no iPad e no Google Chrome para Android pode ser problemática.
Por exemplo, sem qualquer personalização, um vídeo reproduzido no iPad em modo paisagem tem esta aparência:

<img class="center" alt="Captura de tela de um vídeo reproduzido no Safari do iPad Retina em modo paisagem"
src="images/iPad-Retina-landscape-video-playing.png">

Definir o vídeo com `width: 100%` ou `max-width: 100%` com CSS pode resolver diversos problemas de layout nas orientações dos dispositivos. Também recomendamos levar em consideração opções de tela cheia.

### Exibição in-line ou em tela cheia

Plataformas diferentes exibem os vídeos de maneiras diferentes. O Safari em um iPhone exibe um elemento de vídeo in-line em uma página da Web, mas reproduz o vídeo em modo tela cheia.

<img class="center" alt="Captura de tela de um elemento de vídeo no iPhone em modo retrato" src="images/iPhone-video-with-poster.png">

No Android, os usuários podem ativar o modo tela cheia clicando no ícone de tela cheia. No entanto, o padrão é reproduzir o vídeo in-line:

<img class="center" alt="Captura de tela de um vídeo reproduzido no Google Chrome do Android em modo retrato" src="images/Chrome-Android-video-playing-portrait-3x5.png">

O Safari em um iPad reproduz os vídeos in-line:

<img class="center" alt="Captura de tela de um vídeo reproduzido no Safari do iPad Retina em modo paisagem" src="images/iPad-Retina-landscape-video-playing.png">

### Controle a exibição de conteúdo em tela cheia

Para plataformas que não forçam a reprodução de vídeo em tela cheia, a API de tela cheia é [amplamente aceita](//caniuse.com/fullscreen). Use essa API para controlar a exibição de conteúdo ou de páginas em tela cheia.

Para exibir em tela cheia um elemento, como video:

    elem.requestFullScreen();
    

Para exibir em tela cheia todo o documento:

    document.body.requestFullScreen();
    

Também é possível ouvir mudanças no estado de tela cheia:

    video.addEventListener("fullscreenchange", handler);
    

Ou verificar se o elemento está atualmente em modo tela cheia:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Você também pode usar a pseudoclasse `:fullscreen` de CSS para modificar a forma como os elementos são exibidos em modo tela cheia.

Nos dispositivos compatíveis com a API de tela cheia, considere o uso de imagens em miniatura como marcadores de posição dos vídeos:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Este navegador não oferece suporte ao elemento de vídeo.</p>
</video>

Para ver isto em ação, confira a <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html">demonstração</a>.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.


## A acessibilidade é importante 




A acessibilidade não é um recurso. Os usuários com dificuldades de visão e escuta não poderão desfrutar de um vídeo sem legendas ou descrições. O tempo necessário para adicionar esses recursos ao vídeo é muito menor do que o custo da experiência negativa fornecida aos usuários. Forneça pelo menos uma experiência básica a todos os usuários.




### Inclua legendas para melhorar a acessibilidade

Para tornar os recursos de mídia mais acessíveis nos dispositivos móveis, inclua legendas ou descrições usando o elemento de faixa.

<!-- TODO: Verify note type! -->
Note: O elemento de faixa é aceito no Google Chrome para Android, Safari (iOS) e em todos os navegadores atuais para computador, exceto Firefox (veja <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>). Também existem diversas opções de polyfill disponíveis. Recomendamos o <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> ou o <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.

Com o elemento de faixa, as legendas aparecem desta forma:

 <img class="center" alt="Captura de tela mostrando as legendas em exibição com o elemento de faixa no Google Chrome para Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

### Adicione o elemento de faixa

É fácil adicionar legendas a um vídeo, basta adicionar um elemento de faixa como derivado do elemento de vídeo:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

O atributo "src" do elemento de faixa fornece a localização do arquivo de faixa.

### Defina as legendas no arquivo de faixa

Um arquivo de faixa consiste em informações de tempo de inserção no formato WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Homem sentado em um galho, usando um laptop.

    00:05.000 --> 00:08.000
    O galho quebra, e o homem cai.

    ...


## Referência rápida 




Uma visão geral rápida das propriedades do elemento de vídeo.



### Atributos de elementos de vídeo

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

#### Reprodução automática

Em computadores, `Reprodução automática` informa ao navegador para iniciar imediatamente o download e, assim que possível, iniciar a reprodução do vídeo. No iOS e Google Chrome para Android, a opção `Reprodução automática` não funciona. Os usuários precisam tocar na tela para reproduzir o vídeo.

Até mesmo em plataforma em que a reprodução automática é possível, é preciso avaliar se é útil ativá-la.

* O uso de dados pode ser caro.
* Iniciar o download e a reprodução de uma mídia sem solicitar o consentimento do usuário pode comprometer inesperadamente a largura de banda e o uso da CPU, o que atrasaria a renderização da página. 
* Os usuários podem estar em um contexto em que a reprodução de vídeo ou de áudio seria considerada inadequada.

O comportamento da Reprodução automática pode ser configurado no Android WebView por meio da [WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
O padrão é verdadeiro, mas um aplicativo da WebView pode oferecer a opção de desabilitá-lo.

#### Pré-carregar

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

### JavaScript

[O artigo "HTML5 Rocks Video"](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) fez um ótimo trabalho em resumir as propriedades, os métodos e os eventos de Javascript que podem ser usados para controlar a reprodução de vídeos. Incluímos o conteúdo aqui e o atualizamos com questões específicas a dispositivos móveis em partes relevantes.

#### Propriedades

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

Tanto playbackRate (<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/scripted.html">ver demonstração</a>) como o volume não são compatíveis com dispositivos móveis.

#### Métodos

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
sejam chamados em resposta a uma ação do usuário, como clicar em um botão. Veja a <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/scripted.html">demonstração</a>. Da mesma forma, a reprodução não pode ser iniciada para conteúdos como vídeos incorporados do YouTube.

#### Eventos

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



