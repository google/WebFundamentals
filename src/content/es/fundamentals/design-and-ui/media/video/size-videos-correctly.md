project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Cuando se trata de satisfacer a los usuarios, el tamaño de los vídeos es importante.

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# Dar un tamaño adecuado a los vídeos {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Cuando se trata de satisfacer a los usuarios, el tamaño de los vídeos es importante.


## TL;DR {: .hide-from-toc }
- No incluyas vídeos con un tamaño de marco superior o con una calidad mayor que los que admite la plataforma.
- No alargues los vídeos más de lo necesario.
- Los vídeos largos pueden provocar dificultades en las descargas y en las búsquedas; algunos navegadores tienen que esperar a que el vídeo se descargue antes de iniciar la reproducción.



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

<!-- TODO: Verify note type! -->
Note: No fuerces el tamaño de los elementos cuando este resulte en una relación de aspecto distinta a la del vídeo original. Los elementos achatados o estirados no quedan bien.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

Compara el <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">ejemplo adaptable</a> con la <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">versión no adaptable</a>.




