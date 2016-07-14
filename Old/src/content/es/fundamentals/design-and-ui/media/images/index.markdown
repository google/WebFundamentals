---
title: "Imágenes"
description: "Una imagen vale más que mil palabras, y juegan un papel importante en cada página. Sin embargo, las imágenes también son la causa de que se descarguen tantos bytes.  Al usar un diseño web adaptable, no solo puede cambiar el diseño según las características del dispositivo, sino que las imágenes también pueden cambiar."
updated_on: 2014-04-30
key-takeaways:
  use-right-image:
    - Usa la imagen que mejor se adapte a las características de la pantalla, teniendo en cuenta el tamaño de la pantalla, la resolución del dispositivo y el diseño de la página.
    - Cambia la propiedad <code>background-image</code> en CSS para las pantallas con muchos puntos por pulgada. Para ello, usa consultas de medios con <code>min-resolution</code> y <code>-webkit-min-device-pixel-ratio</code>.
    - Usa `srcset` para mostrar imágenes de alta resolución, además de la imagen en tamaño normal en el lenguaje de marcado.
    - Ten en cuenta los costes de rendimiento al usar técnicas de sustitución de imágenes de JavaScript o al mostrar imágenes de alta resolución muy comprimidas en dispositivos de menor resolución.
  avoid-images:
    - Evita las imágenes en la medida de lo posible. En su lugar, usa las funciones del navegador y caracteres unicode en vez de las imágenes, y sustituye los iconos complejos con fuentes de icono.
  optimize-images:
    - No elijas un formato de imagen al azar; usa el formato más óptimo.
    - Incluye herramientas de optimización de imágenes y de compresión en el flujo de trabajo para reducir el tamaño de los archivos.
    - Reduce el número de solicitudes HTTP situando las imágenes más usadas en sprites de imagen.
    - Procura cargar las imágenes solo cuando el usuario llegue a la sección en que se encuentran. De este modo, se mejora el tiempo de carga inicial de la página y se reduce el peso inicial de esta.
notes:
  compressive:
    - No abuses de la compresión de imágenes, ya que su descodificación requiere más memoria.  El cambio de tamaño de las imágenes grandes para adaptarlas a pantallas pequeñas es caro y puede resultar especialmente complejo en dispositivos de gama baja con memoria y procesador limitados.
udacity:
  id: ud882
  title: Responsive Images
  description: "Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow."
  image: img/udacity-ri.jpg
---

<p class="intro">
  Una imagen vale más que mil palabras, y juegan un papel importante en cada página. Sin embargo, las imágenes también son la causa de que se descarguen tantos bytes.  Al usar un diseño web adaptable, no solo puede cambiar el diseño según las características del dispositivo, sino que las imágenes también pueden cambiar.
</p>


### Imágenes adaptables

Al usar un diseño adaptable, no solo puede cambiar el diseño según las características del dispositivo, sino que el contenido también puede cambiar.  Por ejemplo, en pantallas de alta resolución (con el doble de píxeles), los gráficos de alta resolución son necesarios para garantizar la nitidez de las imágenes.  Una imagen con un ancho del 50% podría funcionar correctamente cuando la ventana del navegador tenga 800 píxeles de ancho, pero usará demasiado espacio para un teléfono estrecho y, aun así, utilizará el mismo ancho de banda al reducir su tamaño para encajar en una pantalla más pequeña.

### Dirección artística

<img class="center" src="img/art-direction.png" alt="Ejemplo de dirección artística"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Otras veces, la imagen puede necesitar cambios más drásticos: modificar las proporciones, recortarla e incluso sustituirla por otra.  En este caso, el cambio en la imagen suele denominarse `dirección artística`.  Consulta [responsiveimages.org/demos/](http://responsiveimages.org/demos/) para ver más ejemplos.

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}



