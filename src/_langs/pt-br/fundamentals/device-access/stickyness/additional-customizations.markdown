---
layout: article
title: "Additional Customizations"
description: "A seguir estão personalizações muito úteis, mas que funcionam apenas em um subconjunto de navegadores. Todas são opcionais, mas muito recomendadas, pois deixam a experiência do aplicativo ainda melhor."
introduction: "A seguir estão personalizações muito úteis, mas que funcionam apenas em um subconjunto de navegadores. Todas são opcionais, mas muito recomendadas, pois deixam a experiência do aplicativo ainda melhor."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 6
id: additional-customizations
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

{% include modules/toc.liquid %}

## Colorir os elementos do navegador

Chrome, Firefox OS, Safari, Internet Explorer e Opera Coast permitem definir cores para elementos do navegador e/ou plataforma usando meta tags.

{% highlight html %}
<!-- Chrome & Firefox OS -->
<meta name="theme-color" content="#4285f4">
<!-- Windows Phone -->
<meta name="msapplication-navbutton-color" content="#4285f4">
<!-- iOS Safari -->
<meta name="apple-mobile-web-app-status-bar-style" content="#4285f4">
{% endhighlight %}


<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/theme-color.png" alt="Exemplo de um site usando os temas de cor da meta tag">

        <figcaption>Exemplo de um site usando os temas de cor da meta tag</figcaption>
    </figure>
</div>

## Safari: Imagens de inicialização, aparência da barra de status

O Safari permite que você personalize a barra de status e especifique uma imagem de inicialização.

### Especificar uma imagem de inicialização

Por padrão, o Safari mostra uma tela vazia durante o tempo de carregamento e, depois de vários
carregamentos, uma captura de tela de um estado anterior do aplicativo. Você pode evitar isso
dizendo ao Safari para mostrar uma imagem de inicialização explícita, adicionando uma tag de link, com
`rel=apple-touch-startup-image`. Por exemplo:

{% highlight html %}
<link rel="apple-touch-startup-image" href="icon.png">
{% endhighlight %}

A imagem deve estar no tamanho específico da tela do dispositivo de destino ou
não será usada. Consulte as
[Diretrizes de Conteúdo da Web do Safari](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
para obter mais detalhes.

Embora a documentação da Apple sobre esse assunto seja escassa, a comunidade de desenvolvedores
descobriu uma forma de direcionar todos os dispositivos usando consultas de mídia avançadas para
selecionar o dispositivo adequado e especificar a imagem correta. Esta é uma
solução de trabalho, cortesia de [tfausak’s gist](//gist.github.com/tfausak/2222823):

{% highlight html %}
<!-- iOS 6 & 7 iPad (retina, portrait) -->
<link href="/static/images/apple-touch-startup-image-1536x2008.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: portrait)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPad (retina, landscape) -->
<link href="/static/images/apple-touch-startup-image-1496x2048.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: landscape)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPad (portrait) -->
<link href="/static/images/apple-touch-startup-image-768x1004.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: portrait)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPad (landscape) -->
<link href="/static/images/apple-touch-startup-image-748x1024.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: landscape)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone 5 -->
<link href="/static/images/apple-touch-startup-image-640x1096.png"
     media="(device-width: 320px) and (device-height: 568px)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone (retina) -->
<link href="/static/images/apple-touch-startup-image-640x920.png"
     media="(device-width: 320px) and (device-height: 480px)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPhone -->
<link href="/static/images/apple-touch-startup-image-320x460.png"
     media="(device-width: 320px) and (device-height: 480px)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">
{% endhighlight %}

### Alterar a aparência da barra de status

Você pode alterar a aparência da barra de status padrão para `black` ou
`black-translucent`. Com o `black-translucent`, a barra de status flutua no topo
do conteúdo da tela cheia, em vez de empurrá-la para baixo. O layout torna-se mais alto
, mas o topo fica obstruído.  O código necessário é o seguinte:

{% highlight html %}
<meta name="apple-mobile-web-app-status-bar-style" content="black">
{% endhighlight %}

Esta é uma pré-visualização dos diferentes modos:

<div class="clear g-wide--pull-1">
  <div class="g--half">
    <figure class="fluid">
      <img src="images/status-bar-translucent.png" srcset="images/status-bar-translucent.png 1x, images/status-bar-translucent-2x.png 2x" alt="preto translúcido">
      <figcaption>Captura de tela utilizando <code>preto translúcido</code></figcaption>
    </figure>
  </div>
  <div class="g--half g--last">
    <figure class="fluid">
      <img src="images/status-bar-black.png" srcset="images/status-bar-black.png 1x, images/status-bar-black-2x.png 2x" alt="preto-preto">
      <figcaption>Captura de tela utilizando <code>preto</code></figcaption>
      </figure>
  </div>
</div>

## Internet Explorer: Blocos Dinâmicos, notificações e sites fixos

Os “Sites Fixos” da Microsoft e seus “Blocos Dinâmicos” giratórios vão muito além de outras
implementações e abordá-los aqui deixaria esse guia enorme. Se desejar
saber mais,
[aprenda como criar blocos dinâmicos no MSDN](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx).

{% include modules/nextarticle.liquid %}

{% endwrap %}
