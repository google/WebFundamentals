---
title: "Conceptos básicos de diseño web adaptable"
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
  - g.co/mobilesiteprinciple19
udacity:
  id: ud893
  title: Responsive Web Design Fundamentals
  description: "Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more."
  image: imgs/udacity-rwd.png
---
<p class="intro">
  El uso de los dispositivos móviles para navegar por la Web está creciendo de forma astronómica y, sin embargo, la mayoría de la Web no está optimizada para estos dispositivos. Los dispositivos móviles suelen tener un tamaño de pantalla limitado y debería cambiar la forma de presentar el contenido en estas pantallas.
</p>


{% comment %}
{% ytvideo oK09n_PGhTo %}
{% endcomment %}

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}


Existe una multitud de tamaños de pantalla diferentes en teléfonos,  en híbridos de teléfono y tablet, en tablets, en ordenadores, en consolas de videojuegos, en televisores e incluso en tecnología ponible.  Los tamaños de pantalla están cambiando siempre, por eso es importante que tu sitio pueda adaptarse a cualquier tamaño hoy y en el futuro.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

El diseño web adaptable, definido por primera vez por [Ethan Marcotte en A List Apart](http://alistapart.com/article/responsive-web-design/), responde a las necesidades de los usuarios y de sus dispositivos.  El diseño cambia en función del tamaño y de la capacidad del dispositivo.  Por ejemplo, en un teléfono, los usuarios verían el contenido en una sola columna. En cambio, en un tablet el mismo contenido podría aparecer en dos columnas.



