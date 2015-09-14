---
title: "Optimizar imágenes para mejorar el rendimiento"
description: "Las imágenes suelen ser las responsables de la mayoría de los bytes descargados en un sitio y, además, ocupar una gran cantidad de espacio visual en la página."
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
related-guides:
  optimize:
  -
      title: "Optimización de imágenes"
      href: fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization
      section:
        id: optimizing-content-efficiency
        title: "Optimizar la eficacia del contenido"
        href: performance/optimizing-content-efficiency/
---

<p class="intro">
  Las imágenes suelen ser las responsables de la mayoría de los bytes descargados en un sitio y, además, ocupar una gran cantidad de espacio visual en la página. Por lo tanto, al optimizar las imágenes se consumirán menos bytes y se mejorará el rendimiento en el sitio web. Cuantos menos bytes deba descargar el navegador, menor será la competición por el ancho de banda del cliente y más rápido se descargarán y se mostrarán los recursos en el sitio web.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.optimize-images %}

## Elegir el formato adecuado

Hay dos tipos de imagen que deberías tener en cuenta: las [imágenes vectoriales](http://es.wikipedia.org/wiki/Gr%C3%A1fico_vectorial) y las [imágenes de mapa de bits](http://es.wikipedia.org/wiki/Imagen_de_mapa_de_bits). Para las imágenes de mapa de bits, necesitas además seleccionar el formato de compresión adecuado, por ejemplo, GIF, PNG o JPG.

**Imágenes de mapa de bits**, como fotografías y otras imágenes representadas como una cuadrícula de puntos o píxeles individuales. Las imágenes de mapa de bits suelen proceder de cámaras o escáneres, o pueden crearse en el navegador con el elemento `canvas`.  A medida que el tamaño de la imagen crece, el tamaño del archivo también lo hace.  Cuando la imagen se escala a un tamaño mayor que el original, las imágenes de mapa de bits aparecen borrosas, ya que el navegador intenta averiguar cómo mostrar los píxeles que faltan.

**Imágenes vectoriales**, como los logotipos y el arte de línea, que se definen con un conjunto de curvas, de líneas, de formas y de colores de relleno. Las imágenes vectoriales se crean con programas como Adobe Illustrator o Inkscape, y se guardan en un formato vectorial como [`SVG`](http://css-tricks.com/using-svg/).  Dado que las imágenes vectoriales se crean a partir de primitivas simples, se pueden escalar sin pérdidas de calidad y sin que cambie el tamaño del archivo.

Al elegir el formato adecuado, es importante tener en cuenta el origen de la imagen (si es vectorial o de mapa de bits) y el contenido (colores, animación, texto, etc.). Ningún formato se ajusta a todos los tipos de imagen, y cada uno de ellos tiene sus ventajas y desventajas.

Empieza teniendo en cuenta estas directrices a la hora de elegir el formato adecuado:

* Usa `JPG` para imágenes fotográficas.
* Usa `SVG` para arte vectorial y gráficos de colores básicos, como los logotipos y el arte de línea.
  Si no hay arte vectorial disponible, prueba con WebP o PNG.
* Usa `PNG` en lugar de `GIF`, ya que permite más colores y mejores porcentajes de compresión.
* En el caso de animaciones de larga duración, recomendamos usar `<video>` para obtener una mejor calidad de imagen y darle al usuario un mayor control de la reproducción.

## Reducir el tamaño del archivo

El archivo de imagen puede reducirse notablemente si lo procesas una vez guardado. Hay varias herramientas para la compresión de imágenes, ya sea con o sin pérdida de calidad, online, mediante interfaz gráfica de usuario o mediante línea de comandos.  Siempre que sea posible, lo mejor es automatizar la optimización de las imágenes. De este modo, se le da la importancia que merece en el flujo de trabajo.

Hay varias herramientas disponibles que comprimen aun más las imágenes, sin pérdida de calidad en los archivos JPG y PNG. En el caso de los archivos JPG, prueba [jpegtran](http://jpegclub.org/) o [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (disponible solo para Linux; se ejecuta con la opción `--strip-all`). En el caso de los archivos PNG, prueba [OptiPNG](http://optipng.sourceforge.net/) o [PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

## Usar sprites de imagen

El uso de sprites en CSS es una técnica en la que varias imágenes se combinan en una sola imagen `sprite sheet`. Con esta técnica, cada imagen puede usarse para especificar la imagen de fondo de un elemento (la hoja de sprites) y un desplazamiento para mostrar la parte correcta.

{% link_sample _code/image-sprite.html %}
<img src="img/sprite-sheet.png" class="center" alt="Hoja de sprites de imágenes usada en el ejemplo">
{% endlink_sample %}
{% include_code src=_code/image-sprite.html snippet=sprite lang=css %}

El uso de sprites tiene la ventaja de reducir el número de descargas necesarias para obtener varias imágenes y, a la vez, habilitar el almacenamiento en caché.

## Carga inteligente

La carga inteligente permite aumentar la velocidad de carga de páginas extensas con muchas imágenes en la mitad inferior, ya que carga las imágenes según sean necesarias o cuando el contenido principal se haya cargado y mostrado.  Además de mejorar el rendimiento, el uso de la carga inteligente permite crear páginas con desplazamiento infinito.

Ten cuidado al crear estas páginas, ya que el contenido se carga a medida que se visualiza, y es posible que los motores de búsqueda nunca detecten ese contenido.  Además, los usuarios que busquen el tipo de información que suele incluirse en un pie de página, nunca verán ese pie de página, ya que se carga contenido nuevo de manera continua.

{% include shared/related_guides.liquid inline=true list=page.related-guides.optimize %}




