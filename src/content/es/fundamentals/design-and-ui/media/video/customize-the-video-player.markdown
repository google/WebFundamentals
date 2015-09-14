---
title: "Personalizar el reproductor de vídeo"
description: "Cada plataforma muestra el vídeo de una forma distinta. Las soluciones para móviles deben tener en cuenta la orientación del dispositivo. Usa el API de Fullscreen para controlar el modo de pantalla completa del contenido de vídeo."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - Usa el elemento de vídeo que se cargará y que descodificará y reproducirá el vídeo en tu sitio.
    - Produce vídeos en varios formatos para llegar a varias plataformas móviles.
    - Dales un tamaño correcto a los vídeos y asegúrate de que no sobrepasen los elementos que los contienen.
    - La accesibilidad es importante; añade el elemento de pista como elemento secundario del elemento de vídeo.
notes:
  media-fragments:
    - El API de Media Fragments es compatible con la mayoría de las plataformas, pero no con iOS.
    - Asegúrate de que las solicitudes de intervalo de bytes sean compatibles con tu servidor. Las solicitudes de intervalo se habilitan de manera predeterminada en la mayoría de los servidores, pero algunos servicios de alojamiento pueden inhabilitarlas.
  dont-overflow:
    - No fuerces el tamaño de los elementos cuando este resulte en una relación de aspecto distinta a la del vídeo original. Los elementos achatados o estirados no quedan bien.
  accessibility-matters:
    - El elemento de pista es compatible con Chrome para Android, con iOS Safari y con todos los navegadores actuales de ordenador, excepto con Firefox (consulta <a href="http://caniuse.com/track" title="Estado de compatibilidad del elemento de pista">caniuse.com/track</a>). También hay varios Polyfill disponibles. Recomendamos <a href='//www.delphiki.com/html5/playr/' title='Polyfill de elemento de pista de Playr'>Playr</a> o <a href='//captionatorjs.com/' title='Pista de Captionator'>Captionator</a>.
  construct-video-streams:
    - MSE es compatible con Chrome y Opera en Android, y con Internet Explorer 11 y Chrome en ordenador. También está previsto que sea compatible con la <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='cronología de implementación de Firefox Media Source Extensions'>Firefox</a>.
  optimize:
    - <a href="../images/">Imágenes</a>
    - <a href="../../performance/optimizing-content-efficiency/">Optimizar la eficacia del contenido</a>
---

<p class="intro">
  Cada plataforma muestra el vídeo de una forma distinta. Las soluciones para móviles deben tener en cuenta la orientación del dispositivo. Usa el API de Fullscreen para controlar el modo de pantalla completa del contenido de vídeo.
</p>

{% include shared/toc.liquid %}


Cada plataforma muestra el vídeo de una forma distinta. Las soluciones para móviles deben tener en cuenta la orientación del dispositivo. Usa el API de Fullscreen para controlar el modo de pantalla completa del contenido de vídeo.

## Funcionamiento de la orientación de dispositivo en varios dispositivos

La orientación de dispositivo no representa ningún problema en monitores de ordenador y en portátiles, pero es muy importante a la hora de tener en cuenta el diseño de la página web para móviles y tablets.

Safari en iPhone cambia correctamente la orientación de pantalla de modo retrato a modo apaisado:

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Captura de pantalla de la reproducción de un vídeo en Safari de iPhone, modo retrato" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Captura de pantalla de la reproducción de un vídeo en Safari de iPhone, modo apaisado" src="images/iPhone-video-playing-landscape.png">
</div>

La orientación de dispositivo puede dar problemas en iPad y en Chrome para Android.
Por ejemplo, un vídeo sin personalizar reproduciéndose en un iPad en modo apaisado tiene el siguiente aspecto:

<img class="center" alt="Captura de pantalla de la reproducción de un vídeo en Safari de iPad Retina, modo apaisado"
src="images/iPad-Retina-landscape-video-playing.png">

Al establecer el ancho del vídeo con `width: 100%` o con `max-width: 100%` en CSS, se resuelven muchos problemas de diseño a la hora de cambiar la orientación del dispositivo. Además, puedes tener en cuenta otras alternativas a la pantalla completa.

## Visualización junto al contenido o en pantalla completa

Cada plataforma muestra el vídeo de una forma distinta. Safari en iPhone muestra un elemento de vídeo junto al contenido en una página web, pero reproduce el vídeo en pantalla completa:

<img class="center" alt="Captura de pantalla del elemento de vídeo en iPhone, modo retrato" src="images/iPhone-video-with-poster.png">

En Android, los usuarios pueden elegir el modo de pantalla completa haciendo clic en el icono de pantalla completa, aunque el modo predeterminado es reproducir el vídeo junto al contenido:

<img class="center" alt="Captura de pantalla de la reproducción de un vídeo en Chrome de Android, modo retrato" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Safari para iPad reproduce los vídeos junto al contenido:

<img class="center" alt="Captura de pantalla de la reproducción de un vídeo en Safari de iPad Retina, modo apaisado" src="images/iPad-Retina-landscape-video-playing.png">

## Control del modo de pantalla completa del contenido

En las plataformas que no obligan a reproducir el vídeo en pantalla completa, el API de Fullscreen es [ampliamente compatible](//caniuse.com/fullscreen). Usa esta API para controlar la visualización en pantalla completa del contenido o de la página.

Para ver un elemento en pantalla completa, como un video::
{% highlight javascript %}
elem.requestFullScreen();
{% endhighlight %}

Para ver todo un documento en pantalla completa:
{% highlight javascript %}
document.body.requestFullScreen();
{% endhighlight %}

También puedes comprobar cambios de estado de pantalla completa:
{% highlight javascript %}
video.addEventListener("fullscreenchange", handler);
{% endhighlight %}

O bien comprobar si el elemento se encuentra en modo de pantalla completa actualmente:
{% highlight javascript %}
console.log("In full screen mode: ", video.displayingFullscreen);
{% endhighlight %}

Además, puedes usar la pseudoclase `fullscreen` en CSS para cambiar la forma en que se muestran los elementos en pantalla completa.

En los dispositivos que son compatibles con el API de Fullscreen, recomendamos usar imágenes en miniatura como marcadores de posición para vídeo:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Este navegador no es compatible con el elemento de vídeo.</p>
</video>

Para ver cómo funciona, echa un vistazo a la {% link_sample _code/fullscreen.html %}demostración{% endlink_sample %}.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



