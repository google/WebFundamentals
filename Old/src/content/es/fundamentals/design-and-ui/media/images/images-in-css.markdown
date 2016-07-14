---
title: "Imágenes en CSS"
description: "La propiedad `background` de CSS es un método eficaz de añadir imágenes complejas en los elementos y, además, permite añadir varias imágenes, hacer que se repitan, etc."
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
---

<p class="intro">
  La propiedad `background` de CSS es un método eficaz de añadir imágenes complejas en los elementos y, además, permite añadir varias imágenes, hacer que se repitan, etc.  Cuando se combina con las consultas de medios, la propiedad `background` es aun más eficaz y permite la carga condicional de la imagen teniendo en cuenta la resolución de la pantalla, el tamaño de la ventana gráfica y otros aspectos.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.use-right-image %}

## Usar consultas de medios para la carga condicional de imágenes o dar dirección artística

Las consultas de medios no solo afectan al diseño de la página, sino que también pueden usarse para la carga condicional de imágenes o para dar dirección artística según el ancho de la ventana gráfica.

Por ejemplo, en el siguiente ejemplo, solo se descarga `small.png` y se aplica al `div` de contenido en las pantallas más pequeñas. En cambio, en pantallas más grandes, se aplica `background-image: url(body.png)` al cuerpo, y `background-image: url(large.png)` al `div` de contenido.

{% include_code src=_code/conditional-mq.html snippet=conditional lang=css %}

## Usar `image-set` para mostrar imágenes de alta resolución

La función `image-set()` en CSS mejora el comportamiento de la propiedad `background`, ya que permite añadir de forma más fácil varios archivos de imagen para diferentes características de dispositivo.  Esto permite al navegador elegir la mejor imagen en función de las características del dispositivo. Por ejemplo, puede usar una imagen cuyo tamaño sea el doble del tamaño normal en una pantalla con el doble de píxeles, o una imagen de tamaño normal en un dispositivo con el doble de píxeles cuando la red tenga ancho de banda limitado.

{% highlight css %}
background-image: image-set(
  url(icon1x.jpg) 1x,
  url(icon2x.jpg) 2x
);
{% endhighlight %}

Además de cargar la imagen correcta, el navegador la escalará
según sea necesario. Es decir, el navegador interpreta que las imágenes que duplican su tamaño normal son el doble de grandes que las imágenes de tamaño normal y, por lo tanto escalará las imágenes de tamaño doble reduciendo su tamaño por un factor de 2. De este modo, la imagen parece tener el mismo tamaño en la página.

La compatibilidad con `image-set()` aún es reciente y solo es compatible en Chrome y en Safari con el prefijo de proveedor `-webkit`.  Se debe tomar la precaución de incluir una imagen de respaldo para cuando no se admita `image-set()`, por ejemplo:

{% include_code src=_code/image-set.html snippet=imageset lang=css %}

El ejemplo anterior cargará los recursos apropiados en los navegadores que sean compatibles con `image-set()` y, si no fuera posible, mostrará el recurso en tamaño normal. La desventaja obvia de este método es que la compatibilidad del navegador con `image-set()` es poco frecuente, por lo que la mayoría de los navegadores mostrarán el recurso en tamaño normal.

## Usar consultas de medios para imágenes de alta resolución o para dirección artística

Las consultas de medios pueden crear normas basadas en la [relación de píxeles del dispositivo](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg), lo que hace posible especificar distintas imágenes tanto para pantallas con el doble de píxeles como para pantallas con la cantidad normal de píxeles.

{% highlight css %}
@media (min-resolution: 2dppx),
(-webkit-min-device-pixel-ratio: 2)
{
  /* High dpi styles & resources here */
}
{% endhighlight %}

Chrome, Firefox y Opera son compatibles con la sintaxis `(min-resolution: 2dppx)`, aunque Safari y el navegador de Android requieren la sintaxis anterior del proveedor con sufijo, pero sin la unidad `dppx`.  Recuerda que estos estilos solo se cargan si el dispositivo coincide con la consulta de medios y que debe especificar estilos para el caso básico.  Con esto también se garantiza que se muestre un elemento si el navegador no es compatible con la resolución especificada en las consultas de medios.

{% include_code src=_code/media-query-dppx.html snippet=mqdppx lang=css %}

Además, puedes usar la sintaxis `min-width` para mostrar imágenes alternativas en función del tamaño de la ventana gráfica.  Esta técnica tiene la ventaja de que la imagen no se descarga si la consulta de medios no coincide.  Por ejemplo, solo se descarga y se aplica `bg.png` en `body` si el ancho del navegador es de 500 píxeles como mínimo:

{% highlight css %}
@media (min-width: 500px) {
  body {
    background-image: url(bg.png);
  }
}
{% endhighlight %}	



