---
layout: article
title: "Colocación de columnas"
description: "Los patrones de diseño web receptivos evolucionan rápidamente, pero
 existe solo un puñado de patrones establecidos que funcionan de forma eficiente en los diferentes
 escritorios y dispositivos móviles."
introduction: "En el caso de los diseños con varias columnas de ancho completo, durante el proceso de colocación de columnas, éstas únicamente se colocan
 de forma vertical, debido a que el ancho de la ventana es demasiado estrecho para el contenido.  "
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-10-21
  order: 2
priority: 1
collection: rwd-patterns
---

{% wrap content%}

Finalmente
, el resultado es que todas las columnas se apilan verticalmente.  La selección
de puntos de interrupción para este patrón de diseño depende del contenido y cambiará
para cada diseño.

{% link_sample _code/column-drop.html %}
  <img src="imgs/column-drop.svg">
  Probar
{% endlink_sample %}


Como sucede con las muestras que son principalmente fluidas, el contenido se coloca verticalmente en la
vista más pequeña, pero a medida que se expande la pantalla a más de 600 píxeles, el parámetro
`div` del contenido principal y secundario ocupa todo el ancho de la pantalla.  El orden de `div` se configura mediante la propiedad
CSS de orden.  A los 800 píxeles, se muestra el `div` de los tres contenidos en todo el
ancho de la pantalla.

Entre los sitios que utilizan este patrón, se incluyen los siguientes:

 * [Modernizr](http://modernizr.com/)
 * [Wee Nudge](http://weenudge.com/)

{% include_code _code/column-drop.html cdrop css %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
