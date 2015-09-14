---
title: "Establecer la ventana gráfica"
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
  Las páginas optimizadas para varios dispositivos deben incluir un elemento meta de ventana gráfica en la cabecera del documento. Una metaetiqueta de ventana gráfica indica al navegador cómo ajustar las dimensiones y el escalado de la página.
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.set-viewport %}

Para ofrecer la mejor experiencia posible, los navegadores para móviles muestran la página con el ancho de una pantalla de ordenador (normalmente, 980 píxeles, aunque este tamaño varía según el dispositivo) y, a continuación, intentan mejorar el aspecto aumentando las fuentes y escalando el contenido para ajustarlo a la pantalla.  Esto significa que los tamaños de fuente podrían mostrarse incoherentemente y que los usuarios deberían tocar dos veces o pellizcar para hacer zoom con el fin de ver el contenido e interactuar con él.

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
{% endhighlight %}


Al usar el valor de metaetiqueta `width=device-width` para la ventana gráfica, se indica a la página que el ancho de la pantalla debe coincidir con los píxeles independientes del dispositivo. Esto permite a la página volver a procesar el contenido para que coincida con distintos tamaños de pantalla, ya sea en la pantalla pequeña de un teléfono móvil o en la pantalla grande de un monitor.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Página sin una ventana gráfica definida">
      Ver ejemplo
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Página sin una ventana gráfica definida">
      Ver ejemplo
    {% endlink_sample %}
  </div>
</div>

Algunos navegadores mantendrán un ancho de página fijo al girar la pantalla en modo apaisado y harán zoom en el contenido en lugar de procesarlo de nuevo para rellenar la pantalla. Al añadir el atributo `initial-scale=1`, se indica a los navegadores que mantengan las proporciones reales entre los píxeles CSS y los píxeles independientes del dispositivo, sea cual sea la orientación de este. Además, permite a la página utilizar todo el ancho de la pantalla en modo apaisado.

{% include shared/remember.liquid inline="True" list=page.notes.use-commas %}

## Garantizar la accesibilidad de la ventana gráfica

Además de establecer el atributo `initial-scale`, puedes establecer los siguientes atributos en la ventana gráfica:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Cuando los definas, estos pueden inhabilitar la acción de hacer zoom en la ventana gráfica, lo que podría causar problemas de accesibilidad.



