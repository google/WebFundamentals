project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Conheça as maneiras mais simples de adicionar vídeos ao seu site e garanta a melhor experiência possível para os usuários em qualquer dispositivo.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-15 #}

# Vídeo {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Os usuários gostam de vídeos — eles podem ser divertidos e informativos. Em dispositivos móveis, os vídeos podem
ser uma maneira mais fácil de consumir informações. No entanto, vídeos gastam largura de banda e nem
sempre têm a mesma aparência em todas as plataformas. Os usuários não gostam de esperar o
carregamento de vídeos nem de não obter uma resposta quando tentam reproduzir um vídeo. Continue lendo para conhecer as maneiras
mais simples de adicionar vídeos ao seu site e garanta a melhor experiência
possível para os usuários em qualquer dispositivo.


## Adicione um vídeo 

### TL;DR {: .hide-from-toc }
- Use o elemento `video` para carregar, decodificar e reproduzir vídeos no seu site.
- Produza vídeos em vários formatos para abranger diversas plataformas móveis.
- Dimensione os vídeos corretamente e garanta que eles não ultrapassem seus contêineres.
- A acessibilidade é importante. Adicione o elemento `track` como filho do elemento `video`.


### Adicione o elemento video

Adicione o elemento `video` para carregar, decodificar e reproduzir vídeos no seu site:

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
  <p>Este navegador não oferece suporte para o elemento video.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Your browser does not support the video element.</p>
    </video>
    

### Especifique vários formatos de arquivo

Nem todos os navegadores oferecem suporte para os mesmos formatos de vídeo. O elemento `<source>` permite que 
você especifique vários formatos como garantia caso o navegador do usuário 
não ofereça suporte a um deles. Por exemplo:

Por exemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html){: target="_blank" .external }

Quando o navegador analisa as tags `<source>`, ele usa o atributo opcional `type`
para decidir qual arquivo baixar e reproduzir. Se o navegador oferecer
suporte a `WebM`, reproduzirá chrome.webm. Caso contrário, ele verificará se é possível
reproduzir vídeos MPEG-4

Confira [A Digital Media Primer for Geeks](//www.xiph.org/video/vid1.shtml)
para saber mais sobre como arquivos de vídeo e áudio funcionam na Web.

Essa abordagem apresenta diversas vantagens em relação à apresentação de diferentes scripts HTML ou
no lado do servidor, especialmente para dispositivos móveis:

* Os desenvolvedores podem listar formatos em ordem de preferência.
* A troca nativa do lado do cliente reduz a latência. Apenas uma solicitação é feita para
 obter o conteúdo.
* Permitir que o navegador escolha um formato é mais simples, rápido e potencialmente
  mais confiável do que usar um banco de dados de suporte no lado do servidor com detecção de user-agent.
* Especificar o tipo da fonte de cada arquivo melhora o desempenho da rede; o navegador pode selecionar uma
  fonte de vídeo sem precisar fazer download de parte do vídeo para identificar o formato.

Todos esses fatores são extremamente importantes em contextos de dispositivos móveis, nos quais a largura de banda
e a latência são escassas e a paciência do usuário provavelmente é limitada.
Não incluir um atributo type pode afetar o desempenho quando há
várias fontes com tipos incompatíveis.

Usando as ferramentas de desenvolvedor do seu navegador móvel, compare a atividade de rede [com atributos type](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html){: target="_blank" .external } e [sem atributos type](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html){: target="_blank" .external }.

Além disso, verifique os cabeçalhos de resposta nas ferramentas de desenvolvedor do navegador para 
[garantir que o servidor reporte o tipo MIME certo](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types);
caso contrário, as verificações de tipo de fonte de vídeos não funcionarão.

### Especifique horários de início e término

Economize largura de banda e deixe seu site mais responsivo: use a Media
Fragments API para adicionar horários de início e de término ao elemento video.

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
  <p>Este navegador não oferece suporte para o elemento video.</p>
</video>

Para adicionar um fragmento de mídia, basta incluir `#t=[start_time][,end_time]` no
URL da mídia. Por exemplo, para reproduzir o vídeo entre os segundos 5 e 10,
especifique:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

Você também pode usar a Media Fragments API para apresentar diversas visualizações no mesmo
vídeo &ndash; como pontos de sinalização em um DVD &ndash; sem precisar codificar e
enviar vários arquivos.


Warning: A maioria das plataformas oferece suporte à Media Fragments API, exceto o iOS. Certifique-se também de que seu servidor ofereça suporte a solicitações de Range. Por padrão, a maioria dos servidores aceita solicitações de Range, mas alguns serviços de hospedagem podem desativá-las.

Usando as ferramentas de desenvolvedor do navegador, verifique se `Accept-Ranges: bytes` está presente
nos cabeçalhos de resposta:

<img class="center" alt="Captura de tela do Chrome DevTools: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### Inclua uma imagem de pôster

Adicione um atributo poster ao elemento `video` para que seus usuários tenham uma ideia do
conteúdo assim que o elemento for carregado, sem precisar fazer o download do
vídeo ou iniciar a reprodução.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

Um pôster também pode ser um plano B se o `src` do vídeo for inválido ou se nenhum dos
formatos de vídeo fornecidos for compatível. A única desvantagem de imagens de pôster é
uma solicitação de arquivo adicional, que consome mais largura de banda e exige
renderização. Para saber mais, consulte [Otimização de imagens](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization).

Veja uma comparação lado a lado de vídeos com e sem uma imagem de pôster &ndash; deixamos a imagem em escala de cinza para provar que ela não faz parte do vídeo:

<div class="attempt-left">
  <figure>
    <img alt="Captura de tela do Android Chrome, retrato: sem pôster" src="images/Chrome-Android-video-no-poster.png">
    <figcaption>
      Captura de tela do Android Chrome, retrato: sem pôster
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Captura de tela do Android Chrome, retrato: com pôster" src="images/Chrome-Android-video-poster.png">
    <figcaption>
      Captura de tela do Android Chrome, retrato: com pôster
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


## Forneça alternativas para plataformas legadas 

Nem todos os formatos de vídeo são compatíveis com todas as plataformas. Verifique quais formatos
são compatíveis com as principais plataformas e certifique-se de que seu vídeo funcione em
todas elas.


### Verifique quais formatos são compatíveis {: #check-formats }

Use `canPlayType()` para descobrir quais formatos de vídeo são compatíveis. O método
comporta um argumento de string que consiste em um `mime-type` e codecs opcionais e
retorna um dos seguintes valores:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Valor de retorno e descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Return value">(string vazia)</td>
      <td data-th="Description">O contêiner e/ou codec não é compatível.</td>
    </tr>
    <tr>
      <td data-th="Return value"><code>maybe</code></td>
      <td data-th="Description">
        O contêiner e o(s) codec(s) podem ser compatíveis, mas o navegador
        precisará fazer o download de parte do vídeo para verificar.
      </td>
    </tr>
    <tr>
      <td data-th="Return value"><code>probably</code></td>
      <td data-th="Description">O formato parece ser compatível.
      </td>
    </tr>
  </tbody>
</table>

Veja alguns exemplos de argumentos `canPlayType()` e de valores de retornos para
execução no Chrome:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Tipo e resposta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type"><code>video/xyz</code></td>
      <td data-th="Response">(string vazia)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response">(string vazia)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Response">(string vazia)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm</code></td>
      <td data-th="Response"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
  </tbody>
</table>


### Produza vídeos em vários formatos

Existem muitas ferramentas que ajudam a salvar o mesmo vídeo em diferentes formatos:

* Ferramentas para computador: [FFmpeg](//ffmpeg.org/)
* Aplicativos de GUI: [Miro](http://www.mirovideoconverter.com/),
  [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Serviços de codificação/transcodificação on-line:
  [Zencoder](//en.wikipedia.org/wiki/Zencoder),
  [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### Verifique o formato usado

Quer saber qual formato de vídeo foi escolhido pelo navegador?

Em JavaScript, use a propriedade `currentSrc` do vídeo para retornar a fonte usada.



## Dimensione vídeos corretamente 

Quando se trata de deixar os usuários felizes, o tamanho do arquivo é importante.


### TL;DR {: .hide-from-toc }
- Não exiba vídeos com frames de tamanho maior ou qualidade superior do que a plataforma pode suportar.
- Não crie vídeos maiores do que deveria.
- Vídeos longos causam oscilações no download e na busca e alguns navegadores podem precisar aguardar até que o vídeo seja baixado para iniciar a reprodução.


### Verifique o tamanho do vídeo

O tamanho real do frame do vídeo, conforme for codificado, pode ser diferente das dimensões
do elemento video (assim como uma imagem pode não ser exibida com suas dimensões
reais).

Para verificar o tamanho codificado de um vídeo, use as propriedades `videoWidth`
e `videoHeight` do elemento video. `width` e `height` retornam as dimensões do
elemento video, que pode ter sido dimensionado usando CSS ou os atributos width e
height em linha.

### Garanta que os vídeos não ultrapassem os contêineres

Quando elementos de vídeo são grandes demais para a janela de visualização, eles podem ultrapassar o
contêiner, impossibilitando que os usuários vejam o conteúdo ou usem
os controles.

<div class="attempt-left">
  <figure>
    <img alt="Captura de tela do Android Chrome, retrato: elemento video sem estilo ultrapassa a janela de visualização" src="images/Chrome-Android-portrait-video-unstyled.png">
    <figcaption>
      Captura de tela do Android Chrome, retrato: elemento video sem estilo ultrapassa a janela de visualização
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Captura de tela do Android Chrome, paisagem: elemento video sem estilo ultrapassa a janela de visualização" src="images/Chrome-Android-landscape-video-unstyled.png">
    <figcaption>
      Captura de tela do Android Chrome, paisagem: elemento video sem estilo ultrapassa a janela de visualização
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Você pode controlar as dimensões do vídeo usando JavaScript ou CSS. Bibliotecas JavaScript
e plug-ins como o [FitVids](http://fitvidsjs.com/) permitem manter
um tamanho e uma taxa de proporção apropriados, mesmo para vídeos Flash do YouTube e
de outras fontes.

Use [consultas de mídia CSS](/web/fundamentals/design-and-ux/responsive/#css-media-queries) para especificar o tamanho de elementos dependendo das dimensões da janela de visualização; `max-width: 100%` é muito útil.

Para conteúdo de mídia em iframes (como vídeos do YouTube), experimente uma abordagem
responsiva (como a [proposta por John Surdakowski](http://avexdesigns.com/responsive-youtube-embed/)).


Warning: Não force dimensionamento de elementos que resulte em uma taxa de proporção diferente da do vídeo original. Elementos comprimidos ou esticados ficam feios.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling" adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html){: target="_blank" .external }

Compare o [exemplo responsivo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html){: target="_blank" .external }
à [versão não responsiva](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html){: target="_blank" .external }.


## Personalize o reprodutor de vídeos

Diferentes plataformas exibem vídeos de forma diferente. Soluções para dispositivos móveis precisam
considerar a orientação do dispositivo. Use a Fullscreen API para controlar a visualização
em tela cheia do conteúdo de vídeo.


### Como a orientação funciona em diferentes dispositivos

A orientação do dispositivo não é um problema para monitores de desktop ou laptops, mas é
extremamente importante ao considerar o design de uma página da Web para celulares e tablets.

O Safari do iPhone troca entre as orientações de retrato e paisagem
de forma adequada:

<div class="attempt-left">
  <figure>
    <img  alt="Captura de tela de um vídeo reproduzido no Safari do iPhone, retrato" src="images/iPhone-video-playing-portrait.png">
    <figcaption>Captura de tela de um vídeo reproduzido no Safari do iPhone, retrato</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Captura de tela de um vídeo reproduzido no Safari do iPhone, paisagem" src="images/iPhone-video-playing-landscape.png">
    <figcaption>Captura de tela de um vídeo reproduzido no Safari do iPhone, paisagem</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

A orientação do dispositivo pode ser problemática em um iPad ou no Chrome do Android.
Por exemplo, sem qualquer personalização, um vídeo reproduzido em um iPad na orientação
paisagem tem a seguinte aparência:

<img alt="Captura de tela de um vídeo reproduzido no Safari no iPad Retina, paisagem"
src="images/iPad-Retina-landscape-video-playing.png">

Definir `width: 100%` ou `max-width: 100%` para o vídeo com CSS pode solucionar
muitos problemas de layout relacionados à orientação do dispositivo. Considere também
alternativas para o modo de tela inteira.

## Exibição em linha ou em tela inteira

<img class="attempt-right" alt="Captura de tela de um elemento video no iPhone, retrato" src="images/iPhone-video-with-poster.png">

Diferentes plataformas exibem vídeos de forma diferente. O Safari em um iPhone exibe um elemento
video em linha em uma página da Web, mas reproduz o vídeo no modo de tela inteira:

<div style="clear:both;"></div>

<img class="attempt-right" alt="Captura de tela de um vídeo reproduzido no Chrome do Android, retrato" src="images/Chrome-Android-video-playing-portrait-3x5.png">

No Android, os usuários podem solicitar o modo de tela inteira clicando no
ícone do recurso. No entanto, o padrão é reproduzir o vídeo em linha:

<div style="clear:both;"></div>

<img class="attempt-right" alt="Captura de tela de um vídeo reproduzido no Safari no iPad Retina, paisagem" src="images/iPad-Retina-landscape-video-playing.png">

O Safari do iPad reproduz vídeos em linha:

<div style="clear:both;"></div>

### Controle do modo de tela inteira do conteúdo

Para plataformas que não forçam a reprodução de vídeos em tela inteira, a Fullscreen API
tem [amplo suporte](http://caniuse.com/#feat=fullscreen). Use essa API para controlar
o modo de tela inteira do conteúdo ou da página.

Para colocar um elemento, como um vídeo, no modo de tela inteira:

    elem.requestFullScreen();
    

Para colocar todo o documento no modo de tela inteira:

    document.body.requestFullScreen();
    

Você também pode escutar mudanças no estado de tela inteira:

    video.addEventListener("fullscreenchange", handler);
    

Também é possível verificar se o elemento está no modo de tela inteira no momento:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Você também pode usar a pseudoclasse `:fullscreen` do CSS para alterar a maneira com a qual
os elementos são exibidos no modo de tela inteira.

<video autoplay muted loop class="attempt-right">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
  <p>Este navegador não oferece suporte para o elemento video.</p>
</video>

Em dispositivos compatíveis com a Fullscreen API, considere usar imagens
de miniatura como marcadores para vídeos:

Para ver esse recurso em ação, confira [esta demonstração](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html){: target="_blank" .external }.

Dogfood: `requestFullScreen()` pode ter prefixo de fornecedor e pode exigir códigos adicionais para ser totalmente compatível entre navegadores.

<div style="clear:both;"></div>




## A acessibilidade é importante

A acessibilidade não é um recurso. Usuários que não conseguem ouvir nem enxergar não terão a experiência do vídeo sem legendas ou descrições. O tempo necessário para adicionar esses elementos é muito menor do que a experiência ruim apresentada aos usuários. Forneça pelo menos uma experiência básica para todos os usuários.


### Inclua legendas para melhorar a acessibilidade

<img class="attempt-right" alt="Captura de tela mostrando legendas exibidas usando o elemento track no Chrome no Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

Para que mídias sejam mais acessíveis em dispositivos móveis, inclua legendas ou descrições
usando o elemento track.

<div style="clear:both;"></div>

### Adicione o elemento track

É muito fácil adicionar legendas ao seu vídeo &ndash; basta incluir um elemento
track como filho do elemento video:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/track.html){: target="_blank" .external }

O atributo `src` do elemento track fornece o local do arquivo da faixa.

## Defina legendas no arquivo da faixa

Um arquivo de faixa consiste em "deixas" cronometradas em formato WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Man sitting on a tree branch, using a laptop.

    00:05.000 --> 00:08.000
    The branch breaks, and he starts to fall.

    ...

Dogfood: O elemento track é compatível com o Google Chrome para Android, o iOS Safari e todos os navegadores atuais para computador, exceto o Firefox (consulte [caniuse.com/track](http://caniuse.com/track)). Há também vários polyfills disponíveis. Recomendamos o [Captionator](http://captionatorjs.com/){: .external }




## Referência rápida

### Atributos do elemento video

Para obter uma lista completa dos atributos do elemento video e suas definições, consulte 
[as especificações do elemento video](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table>
  <thead>
    <tr>
      <th>Atributo</th>
      <th>Disponibilidade</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>src</code></td>
      <td data-th="Availability">Todos os navegadores.</td>
      <td data-th="Description">Endereço (URL) do vídeo.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>poster</code></td>
      <td data-th="Availability">Todos os navegadores.</td>
      <td data-th="Description">Endereço (URL) de um arquivo de imagem que o navegador pode mostrar assim que o elemento video for exibido sem baixar o conteúdo do vídeo.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>preload</code></td>
      <td data-th="Availability">Todos os dispositivos móveis ignoram o pré-carregamento.</td>
      <td data-th="Description">Indica ao navegador que pré-carregar metadados (ou parte do vídeo) antes da reprodução é útil. As opções são none, metadata ou auto (consulte a seção <a href="#preload">Pré-carregamento</a> para obter detalhes). </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>autoplay</code></td>
      <td data-th="Availability">Sem suporte no iPhone ou Android; com suporte em todos os navegadores de computador, no iPad, no Firefox e no Opera para Android.</td>
      <td data-th="Description">Inicia o download e a reprodução assim que possível (consulte a seção <a href="#autoplay">Reprodução automática</a> para obter detalhes).</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>loop</code></td>
      <td data-th="Availability">Todos os navegadores.</td>
      <td data-th="Description">Repete o vídeo.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>controls</code></td>
      <td data-th="Availability">Todos os navegadores.</td>
      <td data-th="Description">Mostra os controles padrão de vídeo (reproduzir, pausar etc.).</td>
    </tr>
  </tbody>
</table>

### Reprodução automática {: #autoplay }

Em computadores, `autoplay` instrui o navegador a baixar e reproduzir o vídeo imediatamente. No iOS e no Chrome para Android, o `autoplay` não funciona; os usuários devem tocar na tela para reproduzir o vídeo.

Mesmo em plataformas nas quais a reprodução automática é possível, você deve considerar se
é uma boa ideia ativar esse recurso:

* O uso de dados pode ser caro.
* Fazer com que mídias sejam baixadas e reproduzidas sem pedir permissão do usuário pode
  monopolizar a largura de banda e a CPU de forma inesperada e atrasar a renderização da página.
* Os usuários podem estar em um contexto no qual a reprodução de vídeo ou áudio seja intrusiva.

O comportamento de reprodução automática pode ser configurado no Android WebView pela
[WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
O valor padrão é true, mas um aplicativo WebView pode optar por desativar o recurso.

### Pré-carregamento {: #preload }

O atributo `preload` indica ao navegador a quantidade de
informações ou conteúdo deve ser pré-carregada.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Valor &amp; descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Value"><code>none</code></td>
      <td data-th="Description">O usuário pode não assistir ao vídeo &ndash; não pré-carregar conteúdo.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>metadata</code></td>
      <td data-th="Description">Metadados (duração, dimensões, faixas de texto) devem ser pré-carregados, mas com quantidade mínima de vídeo.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>auto</code></td>
      <td data-th="Description">Baixar o vídeo completo imediatamente é desejável.</td>
    </tr>
  </tbody>
</table>

O atributo `preload` tem diferentes efeitos em diferentes plataformas.
Por exemplo, o Chrome tem um buffer de 25 segundos de vídeo em computadores, mas nenhum no iOS ou no
Android. Isso significa que, em dispositivos móveis, pode haver atrasos no início da reprodução
que não estão presentes em computadores. 
Consulte [a página de teste de Steve Souders](//stevesouders.com/tests/mediaevents.php)
para obter os detalhes completos.

### JavaScript

[Este artigo do HTML5 Rocks sobre vídeos](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)
resume muito bem as propriedades, os métodos e os eventos JavaScript
que podem ser usados para controlar a reprodução de vídeos. Nós incluímos esse conteúdo aqui,
atualizando-o com preocupações específicas a dispositivos móveis quando relevante.

#### Propriedades

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">Propriedade &amp; descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>currentTime</code></td>
      <td data-th="Description">Obtém ou define a posição da reprodução em segundos.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>volume</code></td>
      <td data-th="Description">Obtém ou define o nível de volume do vídeo.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>muted</code></td>
      <td data-th="Description">Obtém ou define a desativação do áudio.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>playbackRate</code></td>
      <td data-th="Description">Obtém ou define a taxa de reprodução; 1 é a velocidade de reprodução normal.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>buffered</code></td>
      <td data-th="Description">Informações sobre a quantidade do vídeo está em buffer e pronta para ser reproduzida.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>currentSrc</code></td>
      <td data-th="Description">O endereço do vídeo sendo reproduzido.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoWidth</code></td>
      <td data-th="Description">A largura do vídeo em pixels (que pode ser diferente da largura do elemento video).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoHeight</code></td>
      <td data-th="Description">A altura do vídeo em pixels (que pode ser diferente da altura do elemento video).</td>
    </tr>
  </tbody>
</table>

`playbackRate` ([veja a demonstração](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html){: target="_blank" .external }) ou `volume` não são suportados em dispositivos móveis.

#### Métodos

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">Método &amp; descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Method"><code>load()</code></td>
      <td data-th="Description">Carrega ou recarrega uma origem de vídeo sem iniciar a reprodução: por exemplo, quando o src do vídeo é alterado usando JavaScript.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>play()</code></td>
      <td data-th="Description">Reproduz o vídeo do local atual.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>pause()</code></td>
      <td data-th="Description">Pausa o vídeo no local atual.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>canPlayType('format')</code></td>
      <td data-th="Description">Descobre quais formatos são compatíveis (consulte <a href="#check-formats">Verificar quais formatos são compatíveis</a>).</td>
    </tr>
  </tbody>
</table>

Em dispositivos móveis (exceto no Opera do Android), `play()` e `pause()` não funcionam
a não ser que sejam chamados em resposta a uma ação do usuário, como o clique em um botão: confira 
a [demonstração](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html){: target="_blank" .external }.
(Da mesma forma, não é possível iniciar a reprodução de conteúdo como vídeos
incorporados do YouTube.)

#### Eventos

Esses são apenas um subconjunto dos eventos de mídia que podem ser acionados. Consulte a
página [Eventos de mídia](//developer.mozilla.org/docs/Web/Guide/Events/Media_events)
na Mozilla Developer Network para obter uma lista completa.

<table class="responsive">
  <thead>
  <tr>
    <th colspan="2">Evento &amp; descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event"><code>canplaythrough</code></td>
      <td data-th="Description">Acionado quando dados suficientes estão disponíveis de forma que o navegador acredite que possa reproduzir o vídeo por completo sem interrupções.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>ended</code></td>
      <td data-th="Description">Acionado quando o vídeo termina de ser reproduzido.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>error</code></td>
      <td data-th="Description">Acionado se um erro ocorre.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>playing</code></td>
      <td data-th="Description">Acionado quando um vídeo começa a ser reproduzido pela primeira vez após ser pausado ou reiniciado.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>progress</code></td>
      <td data-th="Description">Acionado periodicamente para indicar o progresso do download.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>waiting</code></td>
      <td data-th="Description">Acionado quando uma ação é atrasada aguardando a conclusão de outra ação.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>loadedmetadata</code></td>
      <td data-th="Description">Acionado quando o navegador termina de carregar os metadados do vídeo: duração, dimensões e faixas de texto.</td>
    </tr>
  </tbody>
</table>




{# wf_devsite_translation #}
