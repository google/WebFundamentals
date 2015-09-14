---
title: "Tiny tweaks"
description: "Los patrones de diseño web receptivos evolucionan rápidamente, pero existen unos pocos patrones establecidos que funcionan de forma eficiente en los diferentes escritorios y dispositivos móviles."
updated_on: 2014-10-21
translation_priority: 1
---

<p class="intro">
  El patrón Tiny tweaks permite realizar pequeños cambios en el diseño, como ajustar el tamaño de la fuente, cambiar el tamaño de las imágenes o desplazar el contenido de diferentes maneras.
</p>

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

{% include_code src=_code/tiny-tweaks.html snippet=ttweaks lang=css %}


