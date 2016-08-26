project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Quando a satisfação de seus usuários está em jogo, o tamanho importa.

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# Dimensione o tamanho dos vídeos corretamente {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Quando a satisfação de seus usuários está em jogo, o tamanho importa.


## TL;DR {: .hide-from-toc }
- Evite veicular vídeos que tenham um tamanho de quadro maior ou uma qualidade superior ao que é compatível com a plataforma.
- Não exagere na duração de seus vídeos.
- Vídeos longos podem causar interrupções no download e na busca. Alguns navegadores podem precisar aguardar até que o download do vídeo seja feito antes de poder reproduzi-lo.



## Verifique o tamanho do vídeo

O tamanho de quadro real do vídeo quando estiver codificado pode ser diferente das dimensões do elemento de vídeo (assim como uma imagem pode não ser exibida usando suas dimensões reais).

Para verificar o tamanho codificado de um vídeo, use as propriedades do elemento de vídeo `videoWidth` e `videoHeight`. As propriedades `width` e `height` retornam as dimensões do elemento de vídeo, que podem ter sido dimensionadas usando CSS ou atributos de altura e largura in-line.

## Certifique-se de que os vídeos não ultrapassem o tamanho da janela de visualização

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




