project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Cada plataforma muestra el vídeo de una forma distinta. Las soluciones para móviles deben tener en cuenta la orientación del dispositivo. Usa el API de Fullscreen para controlar el modo de pantalla completa del contenido de vídeo.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Personalizar el reproductor de vídeo {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Cada plataforma muestra el vídeo de una forma distinta. Las soluciones para móviles deben tener en cuenta la orientación del dispositivo. Usa el API de Fullscreen para controlar el modo de pantalla completa del contenido de vídeo.



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

    elem.requestFullScreen();
    

Para ver todo un documento en pantalla completa:

    document.body.requestFullScreen();
    

También puedes comprobar cambios de estado de pantalla completa:

    video.addEventListener("fullscreenchange", handler);
    

O bien comprobar si el elemento se encuentra en modo de pantalla completa actualmente:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Además, puedes usar la pseudoclase `fullscreen` en CSS para cambiar la forma en que se muestran los elementos en pantalla completa.

En los dispositivos que son compatibles con el API de Fullscreen, recomendamos usar imágenes en miniatura como marcadores de posición para vídeo:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Este navegador no es compatible con el elemento de vídeo.</p>
</video>

Para ver cómo funciona, echa un vistazo a la <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html">demostración</a>.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



