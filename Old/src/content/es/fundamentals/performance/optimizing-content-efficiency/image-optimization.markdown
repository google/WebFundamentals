---
title: "Optimizar imágenes"
description: "A menudo la mayoría de bytes descargados en las páginas web se corresponden a imágenes, que frecuentemente también ocupan una gran cantidad de espacio visual. Por lo tanto, la optimización de las imágenes aporta el máximo ahorro de bytes y permite mejorar al máximo el rendimiento en el sitio web: cuantos menos bytes tenga que descargar el navegador, menos competencia se producirá en el ancho de banda del cliente y más rápidamente podrá el navegador renderizar contenido útil en la pantalla."
updated_on: 2014-05-10
key-takeaways:
  replace:
    - "Eliminar recursos de imagen innecesarios"
    - "Utilizar efectos CSS3 siempre que sea posible"
    - "Utilizar fuentes web en vez de texto de codificación en las imágenes"
  vector-raster:
    - "Las imágenes vectoriales son ideales para las imágenes compuestas por formas geométricas"
    - "Las imágenes vectoriales son independientes del zoom y de la resolución"
    - "Las imágenes de mapa de bits son útiles para imágenes complejas con muchos detalles y formas irregulares"
  hidpi:
    - "Las pantallas de alta resolución tienen varios píxeles de dispositivo por píxel CSS"
    - "Las imágenes a alta resolución requieren una cantidad de píxeles y de bytes significativamente mayor"
    - "Las técnicas de optimización de imágenes son las mismas independientemente de la resolución"
  optimizing-vector:
    - "SVG es un formato de imagen basado en XML"
    - "Los archivos SVG se deben minificar para reducir su tamaño"
    - "Los archivos SVG se deben comprimir con GZIP"
  optimizing-raster:
    - "Una imagen de mapa de bits es una cuadrícula de píxeles"
    - "Cada píxel codifica información de color y de transparencia"
    - "Los compresores de imagen utilizan una serie de técnicas para reducir la cantidad de bits necesarios por píxel para reducir el tamaño de archivo de la imagen"
  lossless-lossy:
    - "El funcionamiento de nuestros ojos permite obtener buenos resultados al someter las imágenes a una compresión con pérdida"
    - "La optimización de imágenes es una función de la compresión con y sin pérdida"
    - "Las diferencias en los formatos de imagen se deben a la forma de utilizar los algoritmos con o sin pérdida y a cuáles se utilizan para optimizar la imagen"
    - "No existe una `configuración de calidad` o un formato mejor para todas las imágenes: cada combinación de compresor y contenidos de imagen tiene un resultado único"
  formats:
    - "Empieza por seleccionar el formato universal adecuado: GIF, PNG, JPEG"
    - "Haz pruebas y selecciona la mejor configuración para cada formato: calidad, medidas de la paleta, etc."
    - "Plantéate añadir recursos WebP y JPEG XR en las imágenes escaladas para los clientes modernos."
  scaled-images:
    - "Una de las optimizaciones más sencillas y eficaces es utilizar recursos escalados"
    - "Presta atención a los recursos grandes porque suponen un gran coste general"
    - "Para reducir el número de píxeles innecesarios, escala las imágenes en función del tamaño de visualización"
notes:
  decompressed:
    - "Ten en cuenta que, independientemente del formato de imagen utilizado para transferir los datos del servidor al cliente, cada píxel utilizado durante la descodificación de la imagen por parte del navegador ocupa 4 bytes de memoria. Esto puede suponer una restricción importante en el caso de imágenes grandes y de dispositivos que no tienen demasiada memoria disponible (p. ej. los dispositivos móviles de baja gama)."
  artifacts:
    - "De izquierda a derecha (PNG): 32 bits (16 millones de colores), 7 bits (128 colores), 5 bits (32 colores). Las imágenes complejas con transiciones de color graduales (gradientes, cielo, etc.) requieren paletas de color más grandes para evitar problemas visuales, como el pixelado del cielo que se aprecia en la imagen de 5 bits. En cambio, si la imagen solo dispone de unos cuantos colores y se utiliza una paleta mayor, estamos malgastando bits muy valiosos."
  quality:
    - "Ten en cuenta que no se pueden comparar directamente los niveles de calidad de diferentes formatos de imagen porque los algoritmos utilizados para codificar la imagen también son distintos: el resultado de un archivo JPEG con una calidad de 90 será muy diferente del de un archivo WebP con una calidad de 90. De hecho, incluso los niveles de calidad del mismo formato de imagen pueden tener resultados visiblemente diferentes en función de la implementación del compresor."
  resized:
    - "Al pasar el cursor por encima del elemento de imagen en Chrome DevTools se muestra el tamaño `real` y el de `visualización` del recurso de imagen. En el ejemplo anterior, se descarga la imagen de 300 x 260 píxeles y, a continuación, se reduce de forma escalada (245 x 212) al mostrarse en el cliente."
---

<p class="intro">
  A menudo la mayoría de bytes descargados en las páginas web se corresponden a imágenes, que frecuentemente también ocupan una gran cantidad de espacio visual. Por lo tanto, la optimización de las imágenes aporta el máximo ahorro de bytes y permite mejorar al máximo el rendimiento en el sitio web: cuantos menos bytes tenga que descargar el navegador, menos competencia se producirá en el ancho de banda del cliente y más rápidamente podrá el navegador renderizar contenido útil en la pantalla.
</p>


{% include shared/toc.liquid %}

La optimización de imágenes es un arte y una ciencia al mismo tiempo: un arte porque no hay ninguna respuesta definitiva a la hora de comprimir una imagen concreta de la mejor forma posible y una ciencia porque se han desarrollado muchas técnicas y algoritmos que pueden reducir significativamente el tamaño de una imagen. Para encontrar la configuración óptima para una imagen hay que realizar un análisis pormenorizado de diferentes parámetros: las capacidades del formato, el contenido de los datos codificados, la calidad, la dimensión de los píxeles y más.

## Eliminar y sustituir imágenes

{% include shared/takeaway.liquid list=page.key-takeaways.replace %}

La primera pregunta que te debes hacer es si realmente hace falta utilizar una imagen para conseguir el efecto que estás buscando. Con un buen diseño también se pueden conseguir resultados increíbles de forma sencilla. La mejor estrategia de optimización pasa siempre por eliminar recursos de imagen, que acostumbran a requerir una gran cantidad de bytes en comparación con los recursos HTML, CSS, JavaScript y otros recursos de la página. Dicho esto, también es cierto que una imagen bien ubicada vale más que mil palabras, así que eres tú quien debe encontrar el equilibrio.

A continuación, debes plantearte si hay una tecnología alternativa que pueda ofrecer los resultados que estás buscando pero de forma más eficaz:

* Los **efectos CSS** (gradientes, sombras, etc.) y las animaciones CSS son útiles para producir recursos independientes de la resolución. Estos se ven siempre nítidos en cualquier resolución y nivel de zoom, y acostumbran a ocupar solo parte de los bytes que requieren los archivos de imagen.
* Las **fuentes web** permiten utilizar una variedad de fuentes al mismo tiempo que se conserva la posibilidad de seleccionar el texto, de hacer búsquedas en el texto y de cambiar su tamaño, lo que supone una mejora significativa en cuanto al uso.

Si estás pensando en codificar texto en un recurso de imagen, detente y considéralo de nuevo. El uso de una buena tipografía es básico para conseguir un buen diseño, inclusión de marca y legibilidad; en cambio, el texto insertado en imágenes proporciona una mala experiencia de usuario, porque no se puede seleccionar el texto, hacer búsquedas o zoom y no es accesible ni compatible con los dispositivos con muchos puntos por pulgada. Para utilizar fuentes web hay que llevar a cabo un [conjunto de optimizaciones concreto](https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/), pero permite solucionar todos estos problemas y siempre resulta la mejor opción para mostrar texto.


## Imágenes vectoriales en comparación con imágenes de mapa de bits

{% include shared/takeaway.liquid list=page.key-takeaways.vector-raster %}

Si llegas a la conclusión de que la mejor forma de conseguir el efecto deseado es mediante una imagen, la siguiente decisión importante que deberás tomar es seleccionar el formato más adecuado:

&nbsp;

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <b>Imagen vectorial</b>
    <img class="center" src="images/vector-zoom.png" alt="Ampliación de una imagen vectorial">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <b>Imagen de mapa de bits</b>
    <img src="images/raster-zoom.png" alt="Ampliación de una imagen de mapa de bits">
  </div>
</div>

* Los [gráficos vectoriales](http://es.wikipedia.org/wiki/Gr%C3%A1fico_vectorial) utilizan líneas, puntos y polígonos para representar una imagen.
* Las [imágenes de mapa de bits](http://es.wikipedia.org/wiki/Imagen_de_mapa_de_bits) representan una imagen mediante la codificación de los valores concretos de cada píxel dentro de una cuadrícula rectangular.

Cada formato tiene sus pros y sus contras. Los formatos vectoriales están pensados para imágenes compuestas por formas geométricas simples (p. ej., logotipos, texto, iconos, etc.) y dan buenos resultados en todas las opciones de resolución y zoom, lo que los convierte en un formato ideal para pantallas de alta resolución y recursos que se tengan que mostrar en diferentes medidas.

Sin embargo, los formatos vectoriales se quedan cortos para imágenes complicadas (p. ej., para fotos): la cantidad de marcas SVG necesarias para crear todas las formas puede ser exageradamente alta y el resultado puede ser poco `realista fotográficamente`. En este caso, hay que utilizar un formato de imagen de mapa de bits, como GIF, PNG, JPEG o formatos más nuevos, como JPEG-XR o WebP.

Las imágenes de mapa de bits no tienen las mismas propiedades que las que son independientes de la resolución o del zoom: al aumentar una imagen de mapa de bits, los gráficos se ven desdibujados y borrosos. Por lo tanto, quizás tengas que guardar varias versiones de una imagen de mapa de bits en varias resoluciones para conseguir una experiencia óptima para los usuarios.


## Implicaciones de las pantallas en alta resolución

{% include shared/takeaway.liquid list=page.key-takeaways.hidpi %}

Al hablar de píxeles de imagen, debemos distinguir entre diferentes tipos de píxel: los píxeles CSS y los píxeles de dispositivo. Un único píxel CSS puede contener varios píxeles de dispositivo (p. ej., un único píxel CSS puede corresponder directamente a un único píxel de dispositivo o puede estar respaldado por varios píxeles de dispositivo). ¿Y qué significa esto? Pues que cuantos más píxeles de dispositivo haya, más detallado será el contenido mostrado en la pantalla.

<img src="images/css-vs-device-pixels.png" class="center" alt="Píxeles CSS en comparación con píxeles de dispositivo">

Las pantallas con muchos DPI (HiDPI) tienen una resolución muy buena, pero existe una contrapartida obvia: los recursos de imagen deben tener un gran detalle para sacar partido de un mayor número de píxeles de dispositivo. La ventaja es que las imágenes vectoriales están pensadas para esta tarea, ya que se pueden renderizar en cualquier resolución con buenos resultados. Puede ser que el coste de procesamiento para renderizar los detalles más precisos sea más alto, pero el recurso subyacente es el mismo y es independiente de la resolución.

En cambio, las imágenes de mapa de bits suponen un reto mucho mayor, porque codifican datos de imagen por píxel. Por lo tanto, cuantos más píxeles se utilicen mayor será el tamaño de archivo de una imagen de mapa de bits. Por ejemplo, pensemos en la diferencia entre un recurso de foto mostrado con píxeles 100 x 100 (CSS):

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Resolución de la pantalla</th>
    <th>Total de píxeles</th>
    <th>Tamaño del archivo sin comprimir (4 bytes por píxel)</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="resolución">1x</td>
  <td data-th="total de píxeles">100 x 100 = 10.000</td>
  <td data-th="tamaño de archivo">40.000 bytes</td>
</tr>
<tr>
  <td data-th="resolución">2x</td>
  <td data-th="total de píxeles">100 x 100 x 4 = 40.000</td>
  <td data-th="tamaño de archivo">160.000 bytes</td>
</tr>
<tr>
  <td data-th="resolución">3x</td>
  <td data-th="total de píxeles">100 x 100 x 9 = 90.000</td>
  <td data-th="tamaño de archivo">360.000 bytes</td>
</tr>
</tbody>
</table>

Al doblar la resolución de la pantalla física, el número total de píxeles aumenta por cuatro: se dobla la cantidad de píxeles horizontales y se dobla la cantidad de píxeles verticales. Por lo tanto, una pantalla de `2x` no dobla sino que cuadruplica el número de píxeles necesarios.

¿Y esto qué significa en la práctica? Que las pantallas de alta resolución permiten mostrar imágenes espectaculares, podría ser el caso de la función de un producto, pero también requieren imágenes de alta resolución. Siempre que sea posible, utiliza imágenes vectoriales, puesto que son independientes de la resolución y siempre ofrecen buenos resultados. Si tienes que utilizar imágenes de mapa de bits, envía y optimiza unas cuantas variantes de cada imagen (sigue leyendo para obtener más información).


## Optimizar imágenes vectoriales

{% include shared/takeaway.liquid list=page.key-takeaways.optimizing-vector %}

Todos los navegadores modernos son compatibles con los gráficos vectoriales redimensionables (SVG), un formato de imagen basado en XML para los gráficos en dos dimensiones. Podemos insertar la marca SVG directamente en la página o como un recurso externo. La mayoría de software de dibujo basado en vectores permite crear archivos SVG. Estos también se pueden crear a mano y directamente en el editor de textos que se desee.

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
   x="0px" y="0px" viewBox="0 0 612 792" xml:space="preserve">
<g id="XMLID_1_">
  <g>
    <circle fill="red" stroke="black" stroke-width="2" stroke-miterlimit="10" cx="50" cy="50" r="40"/>
  </g>
</g>
</svg>
{% endhighlight %}

El ejemplo anterior renderiza una forma de círculo sencilla con un contorno negro y un fondo rojo, y se ha exportado de Adobe Illustrator. Como puedes ver, contiene muchos metadatos, como información por capas, comentarios y espacios de nombres XML que normalmente no son necesarios para renderizar el recurso en el navegador. Por eso siempre es una buena idea minificar los archivos SVG mediante la ejecución de una herramienta como [svgo](https://github.com/svg/svgo).

Por ejemplo, svgo reduce el tamaño del archivo SVG anterior generado por Illustrator en un 58%, y pasa a ocupar de 470 a 199 bytes. Además, como SVG es un formato basado en XML, también podemos aplicar la compresión GZIP para reducir su tamaño de transferencia. Asegúrate de que el servidor esté configurado para comprimir recursos SVG.


## Optimizar imágenes de mapa de bits

{% include shared/takeaway.liquid list=page.key-takeaways.optimizing-raster %}

Una imagen de mapa de bits es simplemente una cuadrícula de `píxeles` individuales de dos dimensiones (p. ej., una imagen de 100 x 100 píxeles es una secuencia de 10.000 píxeles). A su vez, cada píxel almacena los valores `[RGBA](http://en.wikipedia.org/wiki/RGBA_color_space)`: (R) canal rojo, (G) canal verde, (B) canal azul y (A) canal alfa (transparencia).

El navegador asigna internamente 256 valores (sombras) a cada canal, lo que se traduce en 8 bits por canal (2 ^ 8 = 256) y 4 bytes por píxel (4 canales x 8 bits = 32 bits = 4 bytes). Por lo tanto, si conocemos las dimensiones de la cuadrícula, podremos calcular fácilmente el tamaño del archivo:

* Una imagen de 100 x 100 píxeles está formada por 10.000 píxeles
* 10.000 píxeles x 4 bytes = 40.000 bytes
* 40.000 bytes / 1024 = 39 KB

^

{% include shared/remember.liquid title="Note" list=page.notes.decompressed %}

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Dimensiones</th>
    <th>Píxeles</th>
    <th>Tamaño de archivo</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="dimensiones">100 x 100</td>
  <td data-th="píxeles">10.000</td>
  <td data-th="tamaño de archivo">39 KB</td>
</tr>
<tr>
  <td data-th="dimensiones">200 x 200</td>
  <td data-th="píxeles">40.000</td>
  <td data-th="tamaño de archivo">156 KB</td>
</tr>
<tr>
  <td data-th="dimensiones">300 x 300</td>
  <td data-th="píxeles">90.000</td>
  <td data-th="tamaño de archivo">351 KB</td>
</tr>
<tr>
  <td data-th="dimensiones">500 x 500</td>
  <td data-th="píxeles">250.000</td>
  <td data-th="tamaño de archivo">977 KB</td>
</tr>
<tr>
  <td data-th="dimensiones">800 x 800</td>
  <td data-th="píxeles">640.000</td>
  <td data-th="tamaño de archivo">2500 KB</td>
</tr>
</tbody>
</table>

Puede parecer que 39 KB para una imagen de 100 x 100 píxeles no sea mucho, pero el tamaño de archivo aumenta sustancialmente en el caso de imágenes más grandes y hace que la descarga de recursos de imagen sea lenta y costosa. Por suerte, por ahora solo hemos descrito el formato de imagen `sin comprimir`. ¿Qué podemos hacer para reducir el tamaño de archivo de la imagen?

Una forma fácil de hacerlo es reducir la `profundidad de bits` de la imagen, de 8 bits por canal a una paleta de color más pequeña: 8 bits por canal suponen 256 valores por canal y 16.777.216 (2.563) de colores en total. ¿Qué pasa si reducimos la paleta a 256 colores? Que solo necesitaremos 8 bits en total para los canales RGB y ahorraremos automáticamente dos bytes por píxel, con lo que conseguiremos una compresión del 50% sobre nuestro formato de 4 bytes por píxel original.

<img src="images/artifacts.png" class="center" alt="Herramientas de compresión">

{% include shared/remember.liquid title="Note" list=page.notes.artifacts %}

A continuación, cuando hayamos optimizado los datos almacenados en píxeles individuales, podremos ir más allá y observar los píxeles adyacentes: resulta que el color de los píxeles de muchas imágenes, especialmente en las fotos, es muy similar al de los píxeles más cercanos (p. ej., el cielo, las texturas repetidas, etc.). Si aprovechamos esta información, el compresor puede aplicar `[codificación delta](http://en.wikipedia.org/wiki/Delta_encoding)` de forma que, en vez de almacenar los valores individuales de cada píxel, almacenamos la diferencia respecto de los píxeles cercanos: si los píxeles adyacentes son iguales, delta es `cero` y solo se almacena un bit. Pero por qué vamos a detenernos aquí...

El ojo humano tiene diferentes niveles de sensibilidad a diferentes colores: podemos optimizar la codificación de color en consonancia mediante la reducción o el aumento de la paleta de estos colores.
Los píxeles `cercanos` forman una cuadrícula de dos dimensiones, lo que significa que cada píxel tiene varios vecinos: podemos utilizar este hecho para mejorar aún más la codificación delta.
En vez de observar solamente a los vecinos más inmediatos de cada píxel, podemos observar bloques más grandes de píxeles cercanos y codificar bloques distintos con configuraciones diferentes, etcétera.

Como puedes ver, la optimización de imágenes se complica rápidamente (o se hace más divertida, según la perspectiva); se ha convertido en un área activa de la investigación académica y comercial. Las imágenes ocupan muchos bytes y existe un gran interés en desarrollar mejores técnicas de compresión de imágenes. Si te interesa obtener más información, ve a la [página de la Wikipedia](http://es.wikipedia.org/wiki/Compresi%C3%B3n_de_imagen) o consulta el [libro blanco sobre técnicas de compresión WebP](https://developers.google.com/speed/webp/docs/compression), donde encontrarás un ejemplo práctico.

Todo esto está muy bien una vez más, pero sigue siendo muy teórico: ¿cómo influye en la optimización de las imágenes para nuestras páginas? Obviamente no estamos en situación de inventar nuevas técnicas de compresión, pero debemos comprender el problema: los píxeles RGBA, el ancho de bits y varias técnicas de optimización. Todos estos conceptos son fundamentales para comprender y recordar que nos abocamos de lleno al debate sobre varios formatos de imágenes de mapa de bits.


## Compresión de imágenes con y sin pérdida

{% include shared/takeaway.liquid list=page.key-takeaways.lossless-lossy %}

Para algunos tipos de datos, como los códigos fuente de páginas o los archivos ejecutables, es fundamental que el compresor no altere ni pierda información original: si falta un solo bit de datos o es incorrecto, el significado del contenido del archivo puede cambiar completamente o, lo que es peor, estropearse por completo. Para otros tipos de datos, como imágenes, audio y vídeo, una representación `aproximada` de los datos originales puede ser suficiente.

De hecho, el funcionamiento de nuestros ojos hace posible que descartemos parte de la información sobre cada píxel para poder reducir el tamaño de archivo de una imagen (p. ej., nuestros ojos tienen una sensibilidad diferente ante ciertos colores, lo que significa que podemos utilizar menos bits para codificar determinados colores). Por eso, una forma habitual de perfeccionar las imágenes pasa por dos pasos de alto nivel:

1. La imagen se procesa con un filtro `[con pérdida](http://es.wikipedia.org/wiki/Algoritmo_de_compresi%C3%B3n_con_p%C3%A9rdida)` que elimina algunos datos de los píxeles.
1. La imagen se procesa con un filtro `[sin pérdida](http://es.wikipedia.org/wiki/Algoritmo_de_compresi%C3%B3n_sin_p%C3%A9rdida)` que comprime los datos de los píxeles.

**El primer paso es opcional y el algoritmo exacto dependerá del formato de imagen en concreto, pero es importante entender que se puede utilizar la compresión con pérdida para reducir el tamaño de cualquier imagen.** De hecho, la diferencia entre varios formatos de imagen, como GIF, PNG, JPEG y otros, es la combinación de algoritmos concretos que se utilizan (o se omiten) al aplicar los pasos con o sin pérdida.

Así pues, ¿cuál es la configuración `óptima` de la optimización con y sin pérdida? La respuesta depende del contenido de la imagen y de tu propio criterio, así como de la compensación entre el tamaño de archivo y los elementos introducidos por la compresión con pérdida: en algunos casos te puede interesar omitir la optimización con pérdida para representar detalles intrínsecos con la máxima fidelidad, y en otros puedes llevar a cabo una importante optimización con pérdida para reducir el tamaño de archivo del recurso de imagen.  Aquí es donde entran en juego tu propio criterio y el contexto: no existe una configuración universal.

<img src="images/save-for-web.png" class="center" alt="Guardar para Web">

Un ejemplo práctico: al usar un formato con pérdida, como JPEG, el compresor acostumbra a exponer una configuración de `calidad` personalizable (p. ej., el conmutador de calidad proporcionado por la funcionalidad `Guardar para Web` de Adobe Photoshop), que acostumbra a ser un número entre 1 y 100 que controla el funcionamiento interno de la colección concreta de algoritmos con y sin pérdida. Para obtener los mejores resultados, prueba varias configuraciones de calidad para las imágenes y no dudes en reducir la calidad; los resultados visuales acostumbran a ser muy buenos y la reducción del tamaño de archivo puede ser bastante grande.

{% include shared/remember.liquid title="Note" list=page.notes.quality %}


## Seleccionar el formato de imagen correcto

{% include shared/takeaway.liquid list=page.key-takeaways.formats %}

Además de diferentes algoritmos de compresión con y sin pérdida, existen diferentes formatos de imagen que admiten funciones distintas, como los canales de animación y transparencia (alfa). Por lo tanto, la elección del `formato correcto` para una imagen concreta es el resultado de la combinación de los resultados visuales deseados y de los requisitos funcionales.


<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Formato</th>
    <th>Transparencia</th>
    <th>Animación</th>
    <th>Navegador</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="formato"><a href="http://es.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></td>
  <td data-th="transparencia">Sí</td>
  <td data-th="animación">Sí</td>
  <td data-th="navegador">Todos</td>
</tr>
<tr>
  <td data-th="formato"><a href="http://es.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></td>
  <td data-th="transparencia">Sí</td>
  <td data-th="animación">No</td>
  <td data-th="navegador">Todos</td>
</tr>
<tr>
  <td data-th="formato"><a href="http://es.wikipedia.org/wiki/Joint_Photographic_Experts_Group">JPEG</a></td>
  <td data-th="transparencia">No</td>
  <td data-th="animación">No</td>
  <td data-th="navegador">Todos</td>
</tr>
<tr>
  <td data-th="formato"><a href="http://es.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></td>
  <td data-th="transparencia">Sí</td>
  <td data-th="animación">Sí</td>
  <td data-th="navegador">IE</td>
</tr>
<tr>
  <td data-th="formato"><a href="http://es.wikipedia.org/wiki/WebP">WebP</a></td>
  <td data-th="transparencia">Sí</td>
  <td data-th="animación">Sí</td>
  <td data-th="navegador">Chrome, Opera, Android</td>
</tr>
</tbody>
</table>

Existen tres formatos de imagen universales: GIF, PNG y JPEG. Además de estos formatos, algunos navegadores también admiten formatos más nuevos, como WebP y JPEG XR, que ofrecen una mejor compresión global y más funciones. Así pues, ¿qué formato deberías utilizar?

<img src="images/format-tree.png" class="center" alt="Guardar para Web">

1. **¿Necesitas animación? Si es así, GIF es la única opción universal.**
  * GIF limita la paleta de color a un máximo de 256 colores, lo que supone una elección pobre para la mayoría de imágenes. Además, PNG-8 proporciona una mejor compresión para imágenes con una paleta pequeña. Por lo tanto, GIF es la solución adecuada solo cuando se requiere animación.
1. **¿Necesitas conservar los detalles precisos con la mejor resolución? Utiliza PNG.**
  * PNG no aplica ningún algoritmo de compresión con pérdida más allá de la elección de tamaño de la paleta de color. Por lo tanto, las imágenes PNG tienen la máxima calidad, pero a un coste de tamaño de archivo significativamente superior a otros formatos. Utilízalo con criterio.
  * Si el recurso de imagen contiene imágenes compuestas por formas geométricas, plantéate convertirlo en un formato vectorial (SVG).
  * Si el recurso de imagen contiene texto, detente y piénsatelo bien. El texto insertado en las imágenes no se puede seleccionar, no se puede buscar ni se puede ampliar. Si tienes que mostrar un aspecto personalizado (por cuestiones de marca u otros motivos), utiliza fuentes web.
1. **¿Quieres optimizar una foto, una captura de pantalla o un recurso de imagen similar? Utiliza JPEG.**
  * En el formato JPEG se utiliza una combinación de optimización con y sin pérdida para reducir el tamaño de archivo del recurso de imagen. Prueba varios niveles de calidad JPEG para encontrar el equilibrio entre una buena calidad y un tamaño de archivo adecuado para tu recurso.

Por último, cuando hayas determinado el formato de imagen óptimo y su configuración para cada uno de los recursos, plantéate añadir una variante adicional codificada en WebP y JPEG XR. Estos dos formatos son nuevos y, por desgracia, (todavía) no son compatibles universalmente con todos los navegadores. No obstante, permiten ahorrar sustancialmente en tamaño de archivo para los clientes más nuevos. Por ejemplo, con WebP se consigue una [reducción del tamaño de archivo del 30%] de media (https://developers.google.com/speed/webp/docs/webp_study) con respecto a una imagen JPEG comparable.

Puesto que ni WebP ni JPEG XR son compatibles universalmente, tendrás que añadir una lógica adicional a tu aplicación o a tus servidores para mostrar el recurso adecuado:

* Algunos CDN proporcionan optimización de imagen como servicio, e incluyen JPEG XR y WebP.
* Algunas herramientas de código abierto (p. ej., PageSpeed para Apache o Nginx) automatizan la optimización, la conversión y la utilización de recursos adecuados.
* Puedes añadir una lógica de aplicación adicional para detectar el cliente, comprobar qué formatos admite y publicar el mejor formato de imagen disponible.

Por último, ten en cuenta que si utilizas un visualizador web para renderizar contenido en tu aplicación nativa, tendrás control total del cliente y podrás utilizar exclusivamente WebP. Facebook, Google+ y muchas otras aplicaciones utilizan WebP para mostrar todas sus imágenes en sus aplicaciones: el ahorro merece la pena. Para obtener más información sobre WebP, consulta la presentación [WebP: implementación de imágenes más rápidas, más pequeñas y mejoradas](https://www.youtube.com/watch?v=pS8udLMOOaE) de Google I/O 2013.


## Herramientas y ajuste de parámetros

No hay ningún formato de imagen perfecto, ninguna herramienta ni ningún conjunto de parámetros de optimización que sea válido para todas las imágenes. Para obtener los mejores resultados, tendrás que seleccionar el formato y su configuración en función del contenido de la imagen, de sus requisitos visuales y de otros requisitos técnicos.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Herramienta</th>
    <th>Descripción</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="herramienta"><a href="http://www.lcdf.org/gifsicle/">gifsicle</a></td>
  <td data-th="descripción">creación y optimización de imágenes GIF</td>
</tr>
<tr>
  <td data-th="herramienta"><a href="http://jpegclub.org/jpegtran/">jpegtran</a></td>
  <td data-th="descripción">optimización de imágenes JPEG</td>
</tr>
<tr>
  <td data-th="herramienta"><a href="http://optipng.sourceforge.net/">optipng</a></td>
  <td data-th="descripción">optimización de imágenes PNG sin pérdida</td>
</tr>
<tr>
  <td data-th="herramienta"><a href="http://pngquant.org/">pngquant</a></td>
  <td data-th="descripción">optimización de imágenes PNG con pérdida</td>
</tr>
</tbody>
</table>


No dudes en experimentar con los parámetros de los diferentes compresores. Reduce la calidad, observa el resultado, borra, restaura y repite. Cuando hayas encontrado un conjunto de parámetros adecuado, puedes aplicarlo a imágenes similares del sitio, pero no des por sentado que debes usar la misma configuración para comprimir todas las imágenes.


## Publicar recursos de imagen escalados

{% include shared/takeaway.liquid list=page.key-takeaways.scaled-images %}

La optimización de imágenes se reduce a dos criterios: optimización del número de bytes utilizado para codificar cada píxel de imagen y optimización del número total de píxeles. El tamaño de archivo de la imagen es el resultado de multiplicar el número total de píxeles por el número de bytes utilizado para codificar cada píxel. Ni más ni menos.

Por lo tanto, una de las técnicas de optimización de imágenes más sencilla y efectiva es asegurarnos que no estemos enviando más píxeles de los necesarios para mostrar el recurso en el tamaño previsto en el navegador. Parece fácil, ¿verdad? Por desgracia, muchos recursos de imagen de la mayoría de páginas no superan esta prueba: normalmente envían recursos más grandes y dejan que el navegador se encargue de escalarlos para mostrarlos con una resolución menor, lo que también consume recursos de CPU extra.

<img src="images/resized-image.png" class="center" alt="Imagen con cambio de tamaño">

{% include shared/remember.liquid title="Note" list=page.notes.resized %}

El coste general que resulta de enviar más píxeles de los necesarios y de hacer que sea el navegador el que escale la imagen puede suponer la pérdida de una gran oportunidad para reducir y optimizar el número de bytes total necesario para renderizar la página. Además, ten en cuenta que el cambio de tamaño no depende solamente del número de píxeles al que se reduce la imagen, sino también de su tamaño real.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Tamaño real</th>
    <th>Tamaño de visualización</th>
    <th>Píxeles innecesarios</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="real">110 x 110</td>
  <td data-th="visualización">100 x 100</td>
  <td data-th="coste general">110 x 110 - 100 x 100 = 2100</td>
</tr>
<tr>
  <td data-th="real">410 x 410</td>
  <td data-th="visualización">400 x 400</td>
  <td data-th="coste general">410 x 410 - 400 x 400 = 8100</td>
</tr>
<tr>
  <td data-th="real">810 x 810</td>
  <td data-th="visualización">800 x 800</td>
  <td data-th="coste general">810 x 810 - 800 x 800 = 16100</td>
</tr>
</tbody>
</table>

Ten en cuenta que en los tres casos anteriores el tamaño de visualización es `solamente 10 píxeles más pequeño` que el tamaño real de la imagen. Sin embargo, el número de píxeles extra que deberíamos codificar y enviar sería significativamente superior a su tamaño real. Por lo tanto, aunque quizás no puedas conseguir enviar todos los recursos en su tamaño de visualización exacto, **el número de píxeles innecesarios debe ser mínimo y debes enviar los recursos más grandes con el tamaño más próximo posible al tamaño de visualización.**

## Lista de verificación para la optimización de imágenes

La optimización de imágenes es un arte y una ciencia al mismo tiempo: un arte porque no hay ninguna respuesta definitiva a la hora de comprimir una imagen concreta de la mejor forma posible y una ciencia porque se han desarrollado técnicas y algoritmos que pueden reducir significativamente el tamaño de una imagen.

A continuación te ofrecemos consejos y técnicas que debes tener en cuenta para trabajar con la optimización de imágenes:

* **Opta por los formatos vectoriales:** las imágenes vectoriales son independientes de la resolución y de la escala, lo que las hace una opción perfecta para el mundo multidispositivo y de alta resolución.
* **Reduce y comprime los recursos SVG:** la marca XML producida por la mayoría de aplicaciones de dibujo a menudo contienen metadatos innecesarios que se pueden suprimir; asegúrate de que tus servidores están configurados para aplicar una compresión GZIP para recursos SVG.
* **Selecciona el mejor formato de imagen de mapa de bits:** determina tus requisitos funcionales y selecciona el que se adapte mejor a cada recurso concreto.
* **Experimenta con las opciones de calidad óptimas para formatos de mapa de bits:** no dudes en reducir los parámetros de `calidad`; los resultados acostumbran a ser muy buenos y el ahorro en tamaño de archivo es significativo.
* **Suprime los metadatos de imagen innecesarios:** muchas imágenes de mapa de bits contienen metadatos innecesarios sobre el recurso, como información geográfica, información de la cámara, etc. Utiliza las herramientas adecuadas para quitar estos datos.
* **Publica imágenes escaladas:** cambia el tamaño de las imágenes en el servidor y asegúrate de que el tamaño de `visualización` se acerca lo máximo posible al tamaño `real` de la imagen. Presta mucha atención a las imágenes grandes en concreto, ya que comportan un coste general muy grande al cambiar el tamaño.
* **Automatiza, automatiza, automatiza:** invierte en herramientas automatizadas y en infraestructuras que garanticen que todos los recursos de imagen estén siempre optimizados.




