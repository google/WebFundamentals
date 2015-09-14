---
title: "Ajusta el tamaño del contenido a la ventana gráfica"
description: "Gran parte de la Web no está optimizada para varios dispositivos. Adquiere los conocimientos básicos para que tu sitio funcione en móviles, en ordenadores o en cualquier dispositivo con pantalla."
updated_on: 2014-04-30
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
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple20
---
<p class="intro">
  Los usuarios de ordenadores y dispositivos móviles están acostumbrados a desplazarse verticalmente en los sitios web, pero no de manera horizontal. La experiencia del usuario empeora si lo obligas a desplazarse horizontalmente por la página de resultados o a reducir el zoom para verla al completo.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.size-content-to-vp %}

Al desarrollar un sitio para móviles con una metaetiqueta de ventana gráfica, es fácil crear contenido para la página que no se adapte a la ventana gráfica especificada. Por ejemplo, una imagen que se muestre con un ancho superior al de la ventana gráfica puede provocar el desplazamiento horizontal de la ventana gráfica. Deberías ajustar el contenido al ancho de la ventana gráfica para que el usuario no tenga que desplazarse horizontalmente por la página.

Dado que las dimensiones de pantalla y el ancho en píxeles CSS varían entre los dispositivos (por ejemplo, entre teléfonos y tablets, y entre distintos teléfonos), el contenido no debería depender de un ancho específico de ventana gráfica para mostrarse correctamente.

Al establecer anchos absolutos en CSS para los elementos de la página (como en el ejemplo anterior), el elemento `div` puede resultar demasiado ancho para la ventana gráfica en un dispositivo más estrecho (por ejemplo, un dispositivo con un ancho de píxeles CSS, como un iPhone). En su lugar, te recomendamos usar valores de ancho relativos, como `width: 100%`.  Del mismo modo, ten cuidado al usar valores de posicionamiento absolutos de gran tamaño, ya que el elemento podría salirse de la ventana gráfica en una pantalla pequeña.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Página con un elemento de 344 píxeles de ancho fijo en un iPhone">
      Ver ejemplo
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Página con un elemento de 344 píxeles de ancho fijo en un Nexus 5.">
      Ver ejemplo
    {% endlink_sample %}
  </div>
</div>



