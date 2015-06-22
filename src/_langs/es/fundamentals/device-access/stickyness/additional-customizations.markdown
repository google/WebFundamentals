---
layout: article
title: "Personalizaciones adicionales"
description: "Las siguientes personalizaciones son muy útiles, pero solo funcionan en un subconjunto de navegadores. Todas ellas son opcionales, pero altamente recomendables, ya que mejoran aún más la experiencia con las aplicaciones."
introduction: "Las siguientes personalizaciones son muy útiles, pero solo funcionan en un subconjunto de navegadores. Todas ellas son opcionales, pero altamente recomendables, ya que mejoran aún más la experiencia con las aplicaciones."
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

## Cómo agregar color a los elementos del navegador

En Chrome, Firefox OS, Safari, Internet Explorer y Opera Coast, es posible definir los colores de los elementos del navegador o la plataforma mediante el uso de etiquetas META.

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
        <img src="images/theme-color.png" alt="Ejemplo de un sitio en el que se utiliza la etiqueta META tema-color">
        <figcaption>Ejemplo de un sitio en el que se utiliza la etiqueta META tema-color</figcaption>
    </figure>
</div>

## Safari: imágenes de inicio, apariencia de la barra de estado

En Safari, puede definir el estilo de la barra de estado y especificar una imagen de inicio.

### Cómo especificar una imagen de inicio

De forma predeterminada, en Safari, se muestra una pantalla en blanco durante el tiempo de carga y, después de varias 
cargas, se muestra una captura de pantalla del estado anterior de la aplicación. Para evitar esto, puede
indicarle a Safari que le muestre una imagen de inicio en particular. Para ello, agregue una etiqueta de vínculo con lo siguiente
`rel=apple-touch-startup-image`. Por ejemplo:

{% highlight html %}
<link rel="apple-touch-startup-image" href="icon.png">
{% endhighlight %}

La imagen debe tener el tamaño específico de la pantalla del dispositivo de destino; de lo contrario,
no se podrá utilizar. Consulte [Directrices sobre el contenido web de Safari](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
para obtener más información.

Aunque la documentación de Apple es dispersa con respecto a este tema, la comunidad de desarrolladores
ha descubierto una forma de incluir a todos los dispositivos mediante consultas avanzadas de medios para
seleccionar el dispositivo adecuado y luego especificar la imagen correcta. A continuación presentamos una
solución útil, cortesía de [gist de Tfausak](//gist.github.com/tfausak/2222823):

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

### Cambio de la apariencia de la barra de estado

Puede cambiar la apariencia de la barra de estado predeterminada a `black` o
`black-translucent`. Si selecciona `black-translucent`, la barra de estado flota sobre
el contenido de la pantalla completa, en lugar de desplazarlo hacia abajo. Esto le aporta más altura al
diseño, pero obstruye la parte superior de la página.  A continuación, se especifica el código requerido:

{% highlight html %}
<meta name="apple-mobile-web-app-status-bar-style" content="black">
{% endhighlight %}

Y aquí se muestra una vista previa de la apariencia de los diferentes modos:

<div class="clear g-wide--pull-1">
  <div class="g--half">
    <figure class="fluid">
      <img src="images/status-bar-translucent.png" srcset="images/status-bar-translucent.png 1x, images/status-bar-translucent-2x.png 2x" alt="negro translúcido">
      <figcaption>Captura de pantalla del modo <code>black-translucent</code></figcaption>
    </figure>
  </div>
  <div class="g--half g--last">
    <figure class="fluid">
      <img src="images/status-bar-black.png" srcset="images/status-bar-black.png 1x, images/status-bar-black-2x.png 2x" alt="negro-negro">
      <figcaption>Captura de pantalla del modo <code>black</code></figcaption>
      </figure>
  </div>
</div>

## Internet Explorer: iconos dinámicos, notificaciones y sitios anclados

Los "sitios anclados" de Microsoft y sus "iconos dinámicos" giratorios van mucho más allá que otras
implementaciones, y si tratamos este tema aquí nos alejaremos mucho del tema de esta guía. Si desea
conocer más, [en MSDN (Microsoft Developer Network) podrá obtener más información sobre cómo crear iconos dinámicos].(//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx).

{% include modules/nextarticle.liquid %}

{% endwrap %}
