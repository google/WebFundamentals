---
title: "Dar un tamaño adecuado a los vídeos"
description: "Cuando se trata de satisfacer a los usuarios, el tamaño de los vídeos es importante."
updated_on: 2014-09-19
key-takeaways:
  size-matters:
    - No incluyas vídeos con un tamaño de marco superior o con una calidad mayor que los que admite la plataforma.
    - No alargues los vídeos más de lo necesario.
    - Los vídeos largos pueden provocar dificultades en las descargas y en las búsquedas; algunos navegadores tienen que esperar a que el vídeo se descargue antes de iniciar la reproducción.
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
related-guides:
  media:
  -
      title: "Usar consultas de medios en CSS para una mayor adaptabilidad"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Conceptos básicos de diseño web adaptable"
        href: layouts/rwd-fundamentals/
---

<p class="intro">
  Cuando se trata de satisfacer a los usuarios, el tamaño de los vídeos es importante.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.size-matters %}


## Comprobar el tamaño del vídeo

El marco del vídeo puede tener unas dimensiones distintas que el elemento de vídeo (también es posible que no se pueda mostrar una imagen usando sus dimensiones reales).

Para comprobar el tamaño codificado de un vídeo, usa las propiedades de elemento de vídeo `videoWidth` y `videoHeight`. `width` y `height` devuelven las dimensiones del elemento de vídeo, cuyo tamaño es posible que se haya especificado mediante CSS o con atributos de ancho y alto junto al contenido.

## Procura que el vídeo no supere el tamaño del elemento contenedor

Cuando los elementos de vídeo son demasiado grandes para la ventana gráfica, es posible que sobrepasen el tamaño del contenedor, lo cual imposibilita que el usuario vea el contenido o use
los controles.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Captura de pantalla de Chrome en Android, modo retrato: elemento de vídeo sin estilos que supera el tamaño de la ventana gráfica" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Captura de pantalla de Chrome en Android, modo apaisado: elemento de vídeo sin estilos que supera el tamaño de la ventana gráfica" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Puedes controlar las dimensiones del vídeo con JavaScript o con CSS. Las bibliotecas y complementos de JavaScript como [FitVids](//fitvidsjs.com/) permiten mantener un tamaño y una relación de aspecto adecuados, incluso en vídeos Flash de YouTube y de otras fuentes.

Usa [consultas de medios en CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) para especificar el tamaño de los elementos que dependen de las dimensiones de la ventana gráfica; `max-width: 100%` siempre es útil en estos casos.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

Para mostrar contenido multimedia en iframes (como en vídeos de YouTube), prueba con el diseño adaptable (como el [que propone John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).

{% include shared/remember.liquid title="Important" list=page.notes.dont-overflow %}

**CSS:**

{% include_code src=_code/responsive_embed.html snippet=styling lang=css %}

**HTML:**

{% include_code src=_code/responsive_embed.html snippet=markup lang=html %}

Compara el {% link_sample _code/responsive_embed.html %}ejemplo adaptable{% endlink_sample %} con la {% link_sample _code/unyt.html %}versión no adaptable{% endlink_sample %}.




