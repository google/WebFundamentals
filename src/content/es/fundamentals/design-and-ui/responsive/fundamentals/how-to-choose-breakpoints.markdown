---
title: "Cómo seleccionar puntos de interrupción"
description: "Gran parte de la Web no está optimizada para varios dispositivos. Adquiere los conocimientos básicos para que tu sitio funcione en móviles, en ordenadores o en cualquier dispositivo con pantalla."
updated_on: 2014-09-12
key-takeaways:
  set-viewport:
    - Usa la metaetiqueta de ventana gráfica para controlar el ancho y el escalado de la ventana gráfica del navegador.
    - Usa <code>width=device-width</code> para que el ancho coincida con el de la pantalla en píxeles independientes del dispositivo.
    - Usa <code>initial-scale=1</code> para mantener proporciones reales entre los píxeles CSS y los píxeles independientes del dispositivo.
    - No inhabilites el escalado de usuario, ya que así te aseguras de que tu página sea accesible.
  size-content-to-vp:
    - No uses elementos grandes con un ancho fijo.
    - El contenido no debería depender del ancho de la ventana gráfica para mostrarse correctamente.
    - Usa consultas de medios en CSS para aplicar distintos estilos en pantallas pequeñas y grandes.
  media-queries:
    - Las consultas de medios pueden usarse para aplicar estilos según las características del dispositivo.
    - Usa <code>min-width</code> en vez de <code>min-device-width</code> para obtener una mayor compatibilidad.
    - Usa tamaños relativos en los elementos para no romper el diseño.
  choose-breakpoints:
    - Crea puntos de interrupción basados en el contenido, nunca en un dispositivo, producto o marca en particular.
    - Diseña primero para el dispositivo móvil más pequeño, y luego ve adaptando el diseño a las pantallas más grandes.
    - Procura que las líneas de texto tengan un máximo de 70 u 80 caracteres.
notes:
  use-commas:
    - Usa una coma para separar los atributos y asegurarte de que los navegadores más antiguos puedan procesarlos.
---
<p class="intro">
  Aunque puede ser útil definir puntos de interrupción según las clases del dispositivo, hay que tener cuidado al hacerlo.  La definición de puntos de interrupción en cada dispositivo, producto, nombre de marca o sistema operativo utilizado actualmente puede convertirse en una pesadilla. En lugar de esto, lo ideal es que el contenido determine cómo se ajusta el diseño en el elemento contenedor.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.choose-breakpoints %}

## Elige primero los puntos de interrupción principales de la pantalla más pequeña

Lo primero es crear un diseño con el contenido adaptado a una pantalla pequeña. A partir de ahí, amplía la pantalla hasta que necesites otro punto de interrupción.  Esto te permite reducir al mínimo los puntos de interrupción en función del contenido.

Ahora vamos a trabajar con el ejemplo que vimos al principio, el de [previsión del tiempo]({{site.fundamentals}}/layouts/rwd-fundamentals/index.html).
Lo primero es adaptarlo para que quede bien en una pantalla pequeña.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Vista previa de la previsión del tiempo en una pantalla pequeña">
  {% endlink_sample %}
</figure>

A continuación, cambia el tamaño de la ventana del navegador hasta que quede demasiado espacio en blanco entre los elementos y el aspecto de la página empeore.  Esto es subjetivo, aunque un espacio superior a 600 píxeles podría considerarse excesivo.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Vista previa de la previsión del tiempo a medida que aumenta el ancho de la página.">
  {% endlink_sample %}
</figure>

Para insertar un punto de interrupción a los 600 píxeles, crea dos hojas de estilo: una para cuando la ventana del navegador tenga un tamaño de 600 píxeles como máximo, y otra para cuando supere ese tamaño.

{% include_code src=_code/weather-2.html snippet=mqweather2 %}

Por último, refactoriza el código CSS.  En este ejemplo, hemos colocado los estilos comunes, como las fuentes, los iconos, las posiciones básicas o los colores, en `weather.css`.  Los diseños específicos para pantallas pequeñas se encuentran en `weather-small.css`, mientras que los estilos para pantallas grandes se encuentran en `weather-large.css`.

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

## Elije puntos de interrupción secundarios cuando sea necesario

Además de elegir los puntos de interrupción principales para cuando el diseño cambie significativamente, también es útil realizar ajustes ante cambios menores.  Por ejemplo, entre los puntos de interrupción principales, puede resultar útil ajustar los márgenes o el relleno en un elemento, o bien aumentar el tamaño de la fuente para que esta quede más natural en el diseño.

Empezaremos optimizando el diseño para pantallas pequeñas.  En este caso, ampliaremos la fuente cuando el ancho de la ventana gráfica supere los 360 píxeles.  En segundo lugar, cuando haya suficiente espacio, podemos separar la temperatura más alta y la más baja para que queden en la misma línea, en lugar de una encima de la otra.  Además, nos aseguraremos de que los iconos del tiempo sean un poco más grandes.

{% include_code src=_code/weather-small.css snippet=mqsmallbpsm lang=css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

Del mismo modo, para pantallas grandes, lo mejor es limitar el ancho máximo del panel de previsión para que no ocupe todo el ancho de la pantalla.

{% include_code src=_code/weather-large.css snippet=mqsmallbplg lang=css %}

## Optimiza el texto para una lectura adecuada

Según la teoría clásica de la legibilidad, una columna debería contener de 70 a 80 caracteres por línea (entre ocho y diez palabras en inglés). Por lo tanto, lo ideal sería incluir un punto de interrupción cada vez que el ancho de un bloque de texto supere diez palabras aproximadamente.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Antes de añadir puntos de interrupción secundarios">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Después de añadir puntos de interrupción secundarios">
  </div>
</div>

Veamos de forma más detallada el ejemplo anterior de la entrada de blog.  En pantallas más pequeñas, la fuente Roboto con tamaño de 1em funciona bien, ya que permite diez palabras en cada línea. En cambio, necesitará un punto de interrupción en pantallas más grandes. En este caso, si el ancho de la ventana del navegador es superior a 575 píxeles, el ancho ideal para el contenido sería de 550 píxeles.

{% include_code src=_code/reading.html snippet=mqreading lang=css %}

## Nunca ocultes el contenido completamente

Piensa bien qué contenido quieres ocultar o mostrar en función del tamaño de pantalla.
No lo ocultes solo porque no quepa en la pantalla.  Esto no se debería decidir únicamente teniendo en cuenta el tamaño de la pantalla, sino que habría que pensar en lo que le interesaría leer al usuario.  Por ejemplo, eliminar el recuento de polen de la previsión del tiempo podría ser un tema serio para las personas alérgicas en primavera, que necesitan esta información para saber si pueden salir o no.




