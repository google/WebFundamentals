---
layout: article
title: "Tiny tweaks"
description: "Los patrones de diseño web receptivos evolucionan rápidamente, pero
 existen unos pocos patrones establecidos que funcionan de forma eficiente en los diferentes
 escritorios y dispositivos móviles."
introduction: «El patrón Tiny tweaks permite realizar pequeños cambios en el diseño, como ajustar el tamaño de la
 fuente, cambiar el tamaño de las imágenes o desplazar el contenido de diferentes maneras.  "
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-10-21
  order: 4
priority: 1
collection: rwd-patterns
---

{% wrap content%}

Funciona correctamente en diseños con una sola columna, como los sitios web lineales de una sola página
y los artículos con mucho texto.

{% link_sample _code/tiny-tweaks.html %}
  <img src="imgs/tiny-tweaks.svg">
  Probar
{% endlink_sample %}

Como lo indica el nombre, en esta muestra se realizan cambios pequeños cuando se cambia el tamaño de la pantalla.
A medida que aumenta el ancho de la pantalla, también cambian el tamaño de la fuente y el relleno.

Entre los sitios que utilizan este patrón, se incluyen los siguientes:

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

{% include_code _code/tiny-tweaks.html ttweaks css %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
