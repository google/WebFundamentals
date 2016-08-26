project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A acessibilidade não é um recurso.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# A acessibilidade é importante {: .page-title }

{% include "_shared/contributors/TODO.html" %}



A acessibilidade não é um recurso. Os usuários com dificuldades de visão e escuta não poderão desfrutar de um vídeo sem legendas ou descrições. O tempo necessário para adicionar esses recursos ao vídeo é muito menor do que o custo da experiência negativa fornecida aos usuários. Forneça pelo menos uma experiência básica a todos os usuários.




## Inclua legendas para melhorar a acessibilidade

Para tornar os recursos de mídia mais acessíveis nos dispositivos móveis, inclua legendas ou descrições usando o elemento de faixa.

<!-- TODO: Verify note type! -->
Note: O elemento de faixa é aceito no Google Chrome para Android, Safari (iOS) e em todos os navegadores atuais para computador, exceto Firefox (veja <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>). Também existem diversas opções de polyfill disponíveis. Recomendamos o <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> ou o <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.

Com o elemento de faixa, as legendas aparecem desta forma:

 <img class="center" alt="Captura de tela mostrando as legendas em exibição com o elemento de faixa no Google Chrome para Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Adicione o elemento de faixa

É fácil adicionar legendas a um vídeo, basta adicionar um elemento de faixa como derivado do elemento de vídeo:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

O atributo "src" do elemento de faixa fornece a localização do arquivo de faixa.

## Defina as legendas no arquivo de faixa

Um arquivo de faixa consiste em informações de tempo de inserção no formato WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Homem sentado em um galho, usando um laptop.

    00:05.000 --> 00:08.000
    O galho quebra, e o homem cai.

    ...



