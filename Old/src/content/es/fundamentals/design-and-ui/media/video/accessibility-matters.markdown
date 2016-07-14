---
title: "Importancia de la accesibilidad"
description: "La accesibilidad no es una característica."
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
  La accesibilidad no es una característica. Los usuarios sordos o invidentes no podrán disfrutar de un vídeo si no este no lleva subtítulos o audiodescripción. El tiempo que lleva añadir estos elementos en el vídeo no es nada comparado con la mala experiencia que puedes llegar a ofrecer a los usuarios. Ofréceles a todos los usuarios al menos una experiencia básica.
</p>

{% include shared/toc.liquid %}



## Incluir subtítulos para mejorar la accesibilidad

Para que los medios sean más accesibles en los dispositivos móviles, incluye subtítulos o descripciones mediante el elemento de pista.

{% include shared/remember.liquid title="Important" list=page.notes.accessibility-matters %}

Al usar el elemento de pista, los subtítulos quedan así:

 <img class="center" alt="Captura de pantalla de un vídeo con subtítulos mostrados mediante el elemento de pista de Chrome en Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Añadir un elemento de pista

Es muy sencillo añadir subtítulos en tu vídeo; solo tienes que añadir un elemento de pista como elemento secundario del elemento de vídeo:

{% include_code src=_code/track.html snippet=track lang=html %}

El atributo `src` del elemento de pista asigna una ubicación al archivo de pista.

## Definir subtítulos en el archivo de pista

Un archivo de pista se compone de pies de entrada con tiempos en formato WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Un hombre sentado en la rama de un árbol usando un portátil.

    00:05.000 --> 00:08.000
    La rama se rompe y cae.

    ...



