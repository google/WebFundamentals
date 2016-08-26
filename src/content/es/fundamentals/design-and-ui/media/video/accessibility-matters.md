project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La accesibilidad no es una característica.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Importancia de la accesibilidad {: .page-title }

{% include "_shared/contributors/TODO.html" %}



La accesibilidad no es una característica. Los usuarios sordos o invidentes no podrán disfrutar de un vídeo si no este no lleva subtítulos o audiodescripción. El tiempo que lleva añadir estos elementos en el vídeo no es nada comparado con la mala experiencia que puedes llegar a ofrecer a los usuarios. Ofréceles a todos los usuarios al menos una experiencia básica.




## Incluir subtítulos para mejorar la accesibilidad

Para que los medios sean más accesibles en los dispositivos móviles, incluye subtítulos o descripciones mediante el elemento de pista.

<!-- TODO: Verify note type! -->
Note: El elemento de pista es compatible con Chrome para Android, con iOS Safari y con todos los navegadores actuales de ordenador, excepto con Firefox (consulta <a href="http://caniuse.com/track" title="Estado de compatibilidad del elemento de pista">caniuse.com/track</a>). También hay varios Polyfill disponibles. Recomendamos <a href='//www.delphiki.com/html5/playr/' title='Polyfill de elemento de pista de Playr'>Playr</a> o <a href='//captionatorjs.com/' title='Pista de Captionator'>Captionator</a>.

Al usar el elemento de pista, los subtítulos quedan así:

 <img class="center" alt="Captura de pantalla de un vídeo con subtítulos mostrados mediante el elemento de pista de Chrome en Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Añadir un elemento de pista

Es muy sencillo añadir subtítulos en tu vídeo; solo tienes que añadir un elemento de pista como elemento secundario del elemento de vídeo:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

El atributo `src` del elemento de pista asigna una ubicación al archivo de pista.

## Definir subtítulos en el archivo de pista

Un archivo de pista se compone de pies de entrada con tiempos en formato WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Un hombre sentado en la rama de un árbol usando un portátil.

    00:05.000 --> 00:08.000
    La rama se rompe y cae.

    ...



