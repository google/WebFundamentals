---
title: "Forneça alternativas para plataformas legadas"
description: "Nem todos os formatos de vídeo são compatíveis com todas as plataformas. Verifique quais formatos são aceitos pelas principais plataformas e faça com que seu vídeo seja exibido corretamente em cada um deles."
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
  Nem todos os formatos de vídeo são compatíveis com todas as plataformas. Verifique quais formatos são aceitos pelas principais plataformas e faça com que seu vídeo seja exibido corretamente em cada um deles.
</p>

{% include shared/toc.liquid %}


## Verifique quais formatos são compatíveis

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


## Produza vídeos em vários formatos

Inúmeras ferramentas podem ser usadas para salvar o mesmo vídeo em diferentes formatos:

* Ferramentas para computador: [FFmpeg](//ffmpeg.org/)
* Aplicativos para interface do usuário: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Serviços on-line de codificação/transcodificação: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## Verifique qual formato foi usado

Quer saber qual formato de vídeo foi escolhido pelo navegador?

Em JavaScript, use a propriedade `currentSrc` para retornar a origem usada.

Para ver isto em ação, confira {% link_sample _code/video-main.html %}esta demonstração{% endlink_sample %}: Google Chrome e Firefox escolhem o `chrome.webm` (porque esta é a primeira opção na lista de possíveis origens que os navegadores aceitam), enquanto o Safari escolhe `chrome.mp4`.



