---
title: "Layout shifter"
description: "Los patrones de diseño web receptivos evolucionan rápidamente, pero existen unos pocos patrones establecidos que funcionan de forma eficiente en los diferentes escritorios y dispositivos móviles."
updated_on: 2014-10-21
translation_priority: 1
---

<p class="intro">
  El patrón Layout shifter es el más receptivo, ya que posee varios puntos de interrupción en diferentes anchos de pantalla.
</p>

La clave de este diseño es el modo en que el contenido se mueve, en lugar de redistribuirse y
colocarse debajo de otras columnas.  Debido a las diferencias significativas entre cada
punto de interrupción principal, es más complejo de mantener, y es posible que se deban realizar cambios
dentro de los elementos, no solo en el diseño de contenido general.

{% link_sample _code/layout-shifter.html %}
  <img src="imgs/layout-shifter.svg">
  Probar
{% endlink_sample %}

En este ejemplo simplificado, se muestra el patrón Layout shifter. En las pantallas más pequeñas, el contenido se
apila verticalmente, pero cambia significativamente a medida que se
agranda la pantalla, con un `div` a la izquierda y dos `div` apilados a la derecha.

Entre los sitios que utilizan este patrón, se incluyen los siguientes:

 * [Food Sense](http://foodsense.is/)
 * [Seminal Responsive Design
  Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/)

{% include_code src=_code/layout-shifter.html snippet=lshifter lang=css %}


