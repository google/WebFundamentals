project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-05-06 #}

# Optimización de la imagen {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

A menudo, las imágenes representan la mayor parte de los bytes descargados en una página web y también ocupan una considerable proporción del espacio visual de esta. Como resultado, la optimización de imágenes a menudo puede ser uno de los más eficaces medios de ahorro de bytes y mejora de rendimiento para tu sitio web. Cuantos menos bytes deba descargar el navegador, menor será la exigencia para el ancho de banda del cliente y mayor la velocidad a la que el navegador podrá descargar y mostrar contenido útil en la pantalla.

La optimización de la imagen es un arte y una ciencia. Un arte porque no hay una respuesta definitiva respecto de cuál es la mejor manera de comprimir una imagen individual, y una ciencia porque existe una gran cantidad de técnicas y algoritmos bien desarrollados que pueden reducir notablemente el tamaño de una imagen. Para hallar la configuración óptima para tu imagen se requiere un análisis cuidadoso en muchas dimensiones; capacidades del formato, contenido de los datos codificados, calidad, dimensiones en píxeles y más.

## Eliminación y reemplazo de imágenes

### TL;DR {: .hide-from-toc }
- Eliminar recursos de imagen innecesarios
- Aprovechar efectos CSS3 cuando sea posible
- Usar fuentes web en lugar de codificar texto en las imágenes


Lo primero que debes preguntarte es si realmente es necesaria una imagen para lograr el efecto que buscas. El buen diseño es simple, y siempre te proporcionará el mejor rendimiento. Si puedes eliminar un recurso de imagen, que generalmente requiera una gran cantidad de bytes relacionados con HTML, CSS, JavaScript y otros recursos de la página, esa será siempre la mejor estrategia de optimización. Dicho esto, una imagen bien ubicada también puede comunicar más información que mil palabras, por lo que dependerá de ti buscar ese equilibrio.

A continuación, debes considerar si hay una tecnología alternativa que pudiera proporcionar los resultados deseados, aunque de forma más eficaz:

* **Los efectos CSS** (gradientes, sombras, etc.) y las animaciones CSS pueden usarse para producir recursos independientes de la resolución que se vean siempre nítidos en todas las resoluciones y todos niveles de zoom, a menudo en una fracción de los bytes que requiere un archivo de imagen.
* **Las fuentes web** permiten usar bellísimos tipos de letras y, al mismo tiempo, conservan la capacidad de seleccionar, buscar y modificar el tamaño del texto; una mejora considerable en la usabilidad.

Si alguna vez codificas texto en un recurso de imagen, deja de hacerlo y vuelve a considerarlo. Para lograr un buen nivel de diseño, personalización de marca y lectura es esencial contar con una tipografía de excelencia, pero el texto integrado en las imágenes ofrece una experiencia de usuario deficiente: el texto no puede ajustarse a escala, no admite búsquedas, no puede acercarse ni alejarse, no ofrece accesibilidad y no se adapta bien a dispositivos con un valor elevado de ppp. El uso de fuentes web requiere su [propio conjunto de optimizaciones](https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/), pero aborda todas estas inquietudes y siempre es una mejor opción para mostrar texto.


## Imágenes vectoriales frente a imágenes de trama

### TL;DR {: .hide-from-toc }
- Las imágenes vectoriales son ideales para imágenes que consisten en formas geométricas.
- Las imágenes vectoriales son independientes del zoom y de la resolución.
- Las imágenes de trama deben usarse para escenas complejas con muchos detalles y formas irregulares.


Una vez que hayas determinado que una imagen tenga el formato óptimo para lograr el efecto deseado, el paso esencial que sigue es seleccionar el formato adecuado:

<div class="attempt-left">
  <figure>
    <img src="images/vector-zoom.png" alt="Imagen vectorial ampliada">
    <figcaption>Imagen vectorial ampliada</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/raster-zoom.png" alt="Imagen de trama ampliada">
    <figcaption>Imagen de trama ampliada</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

* En los [gráficos vectoriales](https://en.wikipedia.org/wiki/Vector_graphics) se usan líneas y polígonos para representar una imagen.
* Los [gráficos de trama](https://en.wikipedia.org/wiki/Raster_graphics) representan una imagen codificando los valores individuales de cada píxel dentro de una cuadrícula rectangular.

Cada formato tiene sus propias ventajas y desventajas. Los formatos vectoriales son ideales para imágenes que consisten en formas geométricas simples (por ejemplo, logotipos, texto, íconos, etc.) y ofrecen resultados nítidos en todos los ajustes de resolución y zoom. Esto los convierte en el formato ideal para pantallas de alta resolución y recursos que deben mostrarse en diferentes tamaños.

No obstante, los formatos vectoriales no son eficientes cuando la escena es compleja (por ejemplo, una foto): el volumen de lenguaje de marcado SVG para describir todas las formas puede ser prohibitivamente alto y el resultado podría no aportar "realidad fotográfica". Cuando eso sucede, debes usar un formato de imagen de trama como GIF, PNG o JPEG, o uno de los nuevos, como JPEG-XR y WebP.

Las imágenes de trama no tienen las mismas propiedades atractivas de ser independientes de la resolución o del zoom. Cuando amplíes una imagen de trama, verás gráficos angulosos y borrosos. En consecuencia, es posible que debas guardar varias versiones de una imagen de trama en diferentes resoluciones para proporcionar a tus usuarios una experiencia óptima.


## Consecuencias de las pantallas de alta resolución

### TL;DR {: .hide-from-toc }
- Las pantallas de alta resolución tienen píxeles para varios dispositivos por cada pixel CSS.
- Las imágenes de alta resolución requieren una cantidad de píxeles y bytes considerablemente superior.
- Las técnicas de optimización de la imagen son las mismas, independientemente de la resolución.


Al hablar de píxeles de imagen, debemos distinguir diferentes tipos de píxeles: los píxeles CSS y los píxeles de dispositivo. Un píxel de CSS individual puede contener varios píxeles de dispositivos; por ejemplo, el píxel de CSS individual puede corresponder directamente a un solo píxel de dispositivo o estar respaldado por varios de estos píxeles. ¿Cuál es el sentido? Cuantos más píxeles de dispositivo haya, mayor será el detalle del contenido que se muestre en pantalla.

<img src="images/css-vs-device-pixels.png"  alt="Píxeles de CSS frente a píxeles de dispositivo">

Las pantallas con valores altos de PPP (HiDPI en inglés) producen resultados bellos, pero presentan una desventaja obvia: nuestros recursos de imagen requieren más detalles para poder aprovechar las cantidades de píxeles de dispositivo más altas. La buena noticia es que las imágenes vectoriales son ideales para esta tarea, ya que se pueden representar en cualquier resolución con buenos resultados. Posiblemente, estaríamos ante mayores requisitos de procesamiento para la representación de detalles más precisos, pero el recurso subyacente es el mismo y es independiente de la resolución.

Por otra parte, las imágenes de trama presentan un desafío mucho más grande porque codifican los datos de la imagen por píxel. Por lo tanto, cuantos más píxeles haya, mayor será el tamaño del archivo de una imagen de trama. A modo de ejemplo, consideremos la diferencia entre un recurso de foto visualizado en 100 x 100 píxeles (CSS):

<table>
<thead>
  <tr>
    <th>Resolución de la pantalla</th>
    <th>Píxeles totales</th>
    <th>Tamaño del archivo sin comprimir (4 bytes por pixel)</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="total pixels">100 x 100 = 10 000</td>
  <td data-th="filesize">40 000 bytes</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="total pixels">100 x 100 x 4 = 40 000</td>
  <td data-th="filesize">160 000 bytes</td>
</tr>
<tr>
  <td data-th="resolution">3x</td>
  <td data-th="total pixels">100 x 100 x 9 = 90 000</td>
  <td data-th="filesize">360 000 bytes</td>
</tr>
</tbody>
</table>

Cuando duplicamos la resolución de la pantalla física, la cantidad total de píxeles se multiplica por cuatro: se duplica la cantidad de píxeles horizontales y se duplica la cantidad de píxeles verticales. Por lo tanto, en una pantalla “2x” no solo se duplica, sino que se cuadruplica la cantidad necesaria de píxeles.

¿Qué significa esto en la práctica? Las pantallas de alta resolución nos permiten mostrar imágenes bellas, lo cual puede ser una excelente función de producto. Sin embargo, para las pantallas de alta resolución también se requieren imágenes de alta resolución: usa imágenes vectoriales siempre que sea posible, ya que no dependen de la resolución y siempre proporcionan buenos resultados. Si fuera necesario usar una imagen de trama, proporciona y optimiza diferentes variantes de cada imagen con la ayuda de  [`srcset` y `picture`](/web/fundamentals/design-and-ux/media/images#images-in-markup).

## Optimización de imágenes vectoriales

### TL;DR {: .hide-from-toc }
- SVG es un formato de imagen basado en XML.
- Los archivos SVG deben minificarse para reducir su tamaño.
- Los archivos SVG deben comprimirse con GZIP.


Todos los navegadores modernos admiten gráficos vectoriales escalables (SVG), un formato de imagen basado en XML para gráficos bidimensionales. Podemos incorporar el lenguaje de marcado SVG directamente en la página, o como un recurso externo. A su vez, se puede crear un archivo SVG con la mayoría de los programas de dibujo basados en vectores o a mano, directamente en tu editor de texto favorito.


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
    

En el ejemplo anterior se representa una forma circular simple con un delineado negro y un fondo rojo, exportada de Adobe Illustrator. Como puedes ver, contiene muchísimos metadatos, como información en capas, comentarios y espacio de nombres XML que generalmente no son necesarios para mostrar un recurso en el navegador. En consecuencia, siempre se recomienda minificar tus archivos SVG ejecutándolos a través de una herramienta como [svgo](https://github.com/svg/svgo).

Un ejemplo claro: svgo reduce en un 58% el tamaño del archivo SVG anterior generado por Illustrator, llevándolo así de 470 a 199 bytes. Además, debido a que SVG es un formato basado en XML, también se puede aplicar compresión GZIP para reducir su tamaño de transferencia. Asegúrate de que tu servidor esté configurado para comprimir recursos SVG.


## Optimización de imágenes de trama

### TL;DR {: .hide-from-toc }
- Una imagen de trama es una cuadrícula de píxeles.
- Cada píxel codifica información sobre color y transparencia.
- Los compresores de imágenes usan diferentes técnicas para reducir la cantidad de bits necesarios por pixel a fin de reducir el tamaño del archivo de la imagen.


Una imagen de trama es simplemente una cuadrícula bidimensional de "píxeles" individuales. Por ejemplo, una imagen de 100 x 100 píxeles es una secuencia de 10 000 píxeles. A su vez, en cada píxel se almacenan los valores de “[RGBA](https://en.wikipedia.org/wiki/RGBA_color_space)”: (R) canal rojo, (G) canal verde, (B) canal azul y (A) canal alfa (transparencia).

A nivel interno, el navegador asigna 256 valores (tonos) para cada canal, lo cual se traduce en 8 bits por canal (2 ^ 8 = 256) y 4 por píxel (4 canales x 8 bits = 32 bits = 4 bytes). Como consecuencia, si sabemos las dimensiones de la cuadrícula, podremos calcular fácilmente el tamaño del archivo:

* Una imagen de 100 x 100 px está compuesta por 10 000 píxeles
* 10 000 píxeles x 4 bytes = 40 000 bytes
* 40 000 bytes/1024 = 39 KB

Note: A modo de aclaración, independientemente del formato de imagen utilizado para transferir los datos del servidor al cliente, cuando el navegador decodifica la imagen, cada píxel siempre ocupa 4 bytes de memoria. Esta puede ser una limitación importante para las imágenes grandes y los dispositivos que no tienen mucha memoria disponible; por ejemplo dispositivos móviles de gama baja.

<table>
<thead>
  <tr>
    <th>Dimensiones</th>
    <th>Píxeles</th>
    <th>Tamaño del archivo</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="dimensions">100 x 100</td>
  <td data-th="pixels">10 000</td>
  <td data-th="file size">39 KB</td>
</tr>
<tr>
  <td data-th="dimensions">200 x 200</td>
  <td data-th="pixels">40 000</td>
  <td data-th="file size">156 KB</td>
</tr>
<tr>
  <td data-th="dimensions">300 x 300</td>
  <td data-th="pixels">90 000</td>
  <td data-th="file size">351 KB</td>
</tr>
<tr>
  <td data-th="dimensions">500 x 500</td>
  <td data-th="pixels">250 000</td>
  <td data-th="file size">977 KB</td>
</tr>
<tr>
  <td data-th="dimensions">800 x 800</td>
  <td data-th="pixels">640 000</td>
  <td data-th="file size">2500 KB</td>
</tr>
</tbody>
</table>

Tal vez 39 KB una imagen de 100 x 100 píxeles no parezca gran cosa, pero el tamaño del archivo aumenta rápidamente para imágenes más grandes y hace que la descarga de los recursos de imagen sea más lenta y pesada. Afortunadamente, lo descrito hasta ahora es el formato de imagen “sin comprimir”. ¿Qué podemos hacer para reducir el tamaño del archivo de imagen?

Una estrategia simple consiste en reducir la "profundidad de bits" de la imagen de 8 bits por canal a una paleta de colores más pequeña: 8 bits por canal nos brinda 256 valores por canal y 16 777 216 (2563) colores en total. ¿Qué ocurriría si redujeras la paleta a 256 colores? Solo necesitaríamos 8 bits en total para los canales RGB y ahorraríamos de inmediato dos bytes por píxel, lo cual equivale a un ahorro del 50% en la compresión en comparación con el formato original de 4 bytes por píxel.

<img src="images/artifacts.png"  alt="Alteraciones de la compresión">

Note: De izquierda a derecha (PNG): 32 bits (16 millones de colores), 7 bits (128 colores), 5 bits (32 colores). Las escenas complejas con transiciones de color graduales (gradientes, cielo, etc.) requieren paletas de colores más amplias para evitar anomalías visuales, como un cielo pixelado en el recurso de 5 bits. Por el contrario, si la imagen solo usa pocos colores, la presencia de una paleta grande implicará la pérdida de bits valiosos.

A continuación, una vez que optimicemos los datos almacenados en píxeles individuales, podríamos profundizar y observar también los píxeles cercanos: al parecer, muchas imágenes, y en especial las fotos, tienen muchos píxeles cercanos con colores similares; por ejemplo, el cielo, texturas repetidas, etc. Al usar esa información para nuestro beneficio, el compresor puede aplicar “[codificación delta](https://en.wikipedia.org/wiki/Delta_encoding)”. En lugar de almacenar valores individuales para cada píxel, podemos guardar la diferencia entre los píxeles cercanos. Si los píxeles adyacentes son los mismos, delta es “cero” y solo necesitamos almacenar un solo bit. Pero no hay por qué detenerse allí...

El ojo humano tiene un nivel de sensibilidad diferente para los distintos colores: podemos optimizar nuestra codificación de colores para contemplar esto reduciendo o ampliando la paleta para esos colores.
Los píxeles “cercanos” forman una cuadrícula bidimensional; esto significa que cada píxel tiene diferentes vecinos. Podemos usar esta información para continuar mejorando la codificación delta.
En lugar de observar únicamente los vecinos inmediatos para cada píxel, podemos observar bloques más grandes de píxeles cercanos y codificar diferentes bloques con configuraciones distintas. Y así sucesivamente...

Como podrás ver, la optimización de la imagen cobra complejidad rápidamente (o se vuelve más divertida, según tu perspectiva) y representa un área activa de investigación académica y comercial. Las imágenes ocupan una gran cantidad de bytes y el desarrollo de mejores técnicas de compresión de imágenes es un aspecto de muchísimo valor. Si deseas obtener más información, visita la [página de Wikipedia](https://en.wikipedia.org/wiki/Image_compression) o lee el [documento técnico sobre técnicas de compresión WebP](/speed/webp/docs/compression) para observar un ejemplo práctico.

Todo esto es genial, pero también muy académico. ¿Cómo nos ayuda a optimizar imágenes en nuestras páginas? No nos encontramos en una posición en la que se puedan inventar nuevas técnicas de compresión, pero es importante comprender el problema: los píxeles RGBA, la profundidad de bits y varias técnicas de optimización. Es fundamental comprender y considerar todos estos conceptos para abordar los diferentes formatos de imágenes de trama.


## Compresión de imágenes con y sin pérdida

### TL;DR {: .hide-from-toc }
- Debido a la manera en la que funcionan nuestros ojos, las imágenes están muy sujetas a la compresión con pérdida.
- La optimización de la imagen depende de la compresión con y sin pérdida.
- Las diferencias en los formatos de imagen se deben a la diferencia entre la manera en que se usan los algoritmos con y sin pérdida, y cuáles de ellos se usan, para optimizar la imagen.
- No hay un formato ni un "ajuste de calidad" que sea óptimo para todas las imágenes: cada combinación específica de compresor y contenido de imagen produce un resultado único.


Para ciertos tipos de datos, como el código fuente de una página o un archivo ejecutable, es fundamental que el compresor no modifique ni pierda la información original; si un solo dato falta o es incorrecto, podría cambiar completamente el significado del contenido del archivo o, lo que es peor, dañarlo por completo. Para otros tipos de datos, como las imágenes, el audio y el video, puede ser totalmente aceptable proporcionar una representación “aproximada” de los datos originales.

De hecho, debido a la forma en que funciona el ojo, a menudo podemos descartar algo de información sobre cada píxel a fin de reducir el tamaño de archivo de una imagen; por ejemplo, nuestros ojos tienen una sensibilidad diferente para los distintos colores, lo cual significa que podemos usar menos bits para codificar algunos colores. En consecuencia, una canalización de optimización de imágenes típica consiste en dos pasos muy importantes:

1. La imagen se procesa con un filtro “[con pérdida](https://en.wikipedia.org/wiki/Lossy_compression)” que elimina parte de los datos de píxeles
1. La imagen se procesa con un filtro “[sin pérdida](https://en.wikipedia.org/wiki/Lossless_compression)” que comprime los datos de los píxeles.

**El primer paso es opcional, y el algoritmo exacto dependerá del formato de imagen específico, pero es importante comprender que cualquier imagen puede atravesar una etapa de compresión con pérdida para reducir su tamaño.** De hecho, la diferencia entre los diferentes formatos de imagen, como GIF, PNG, JPEG, entre otros, se encuentra en la combinación de los algoritmos específicos que usan (u omiten) al aplicar los pasos con pérdida y sin pérdida.

¿Cuál es, entonces, la configuración “óptima” para la optimización con y sin pérdida? La respuesta depende del contenido de imagen y de tus propios criterios, como las ventajas y desventajas entre el tamaño de archivo y los artefactos introducidos por la compresión con pérdida: en algunos casos, podrías omitir la optimización con pérdida para comunicar detalles complejos en su máxima fidelidad, y en otros podrías aplicar optimización agresiva con pérdida para reducir el tamaño de archivo del recurso de imagen.  Aquí es donde entran en juego tu criterio y el contexto; no existe una configuración universal.

<img src="images/save-for-web.png" class="attempt-right" alt="Save for web">

A modo de ejemplo práctico, al usar un formato con pérdida, como JPEG, el compresor generalmente expondrá una configuración de "calidad" personalizable (por ejemplo, el control deslizante de calidad proporcionado por la funcionalidad "Save for Web", en Adobe Photoshop), que generalmente es un número entre 1 y 100 con el cual se controla el funcionamiento interno del conjunto específico de algoritmos con pérdida y sin pérdida. Para obtener mejores resultados, experimenta con varias configuraciones de calidad para tus imágenes, y no dudes en reducir la calidad. Los resultados visuales generalmente son muy buenos y la reducción del tamaño de archivo puede ser muy importante.

Note: Ten en cuenta que los niveles de calidad para los diferentes formatos de imagen no son directamente comparables debido a la diferencia en los algoritmos empleados para codificar la imagen: la calidad 90 JPEG producirá un resultado muy diferente del de la calidad 90 WebP. De hecho, incluso los niveles de calidad para el mismo formato de imagen pueden producir resultados visiblemente diferentes en la implementación del compresor.


## Selección del formato de imagen correcto

### TL;DR {: .hide-from-toc }
- Comienza por seleccionar el formato universal correcto: GIF, PNG, JPEG.
- Experimenta y selecciona la mejor configuración para cada formato: calidad, tamaño de la paleta, etc.
- Considera agregar recursos WebP y JPEG XR para clientes modernos.


Además de los diferentes algoritmos de compresión con y sin pérdida, los diferentes formatos de imagen son compatibles con diferentes funciones, como los canales de animación y transparencia (alfa). Como resultado, la opción de “formato correcto” para una imagen específica es una combinación de resultados visuales deseados y requisitos funcionales.


<table>
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
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></td>
  <td data-th="transparency">Sí</td>
  <td data-th="animation">Sí</td>
  <td data-th="browser">Todos</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></td>
  <td data-th="transparency">Sí</td>
  <td data-th="animation">No</td>
  <td data-th="browser">Todos</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/JPEG">JPEG</a></td>
  <td data-th="transparency">No</td>
  <td data-th="animation">No</td>
  <td data-th="browser">Todos</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></td>
  <td data-th="transparency">Sí</td>
  <td data-th="animation">Sí</td>
  <td data-th="browser">IE</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/WebP">WebP</a></td>
  <td data-th="transparency">Sí</td>
  <td data-th="animation">Sí</td>
  <td data-th="browser">Chrome, Opera, Android</td>
</tr>
</tbody>
</table>

Hay tres formatos de imagen universalmente compatibles: GIF, PNG y JPEG. Además de estos formatos, algunos navegadores también admiten formatos más nuevos, como WebP y JPEG XR, que ofrecen una mejor compresión general y más funciones. Entonces, ¿qué formato debemos usar?

<img src="images/format-tree.png"  alt="Save for web">

1. **¿Necesitas animaciones? Si las necesitas, el formato GIF es la única opción universal.**
    * Este formato limita la paleta de colores a un número máximo de 256 colores, lo que la convierte en una opción deficiente para la mayoría de las imágenes. A su vez, el formato PNG-8 ofrece una mejor compresión de imágenes con una paleta pequeña. En consecuencia, GIF es la opción correcta solo cuando hacen falta animaciones.
1. **¿Necesitas conservar detalles con alta resolución? Usa el formato PNG.**
    * Este no aplica algoritmos de compresión con pérdida más allá de la elección del tamaño de la paleta de colores. De este modo, producirá una imagen de máxima calidad, aunque con un tamaño de archivo resultante mucho mayor que el de otros formatos. Úsalo con precaución.
    * Si el recurso de imagen contiene imágenes compuestas por formas geométricas, considera convertirlo en un formato vectorial (SVG).
    * Si el recurso de imagen contiene texto, vuelve a pensarlo. El texto en las imágenes no admite selección ni búsqueda y no puede ampliarse ni reducirse. Si deseas darle una apariencia personalizada (para el desarrollo de una marca o por otros motivos), usa una fuente web.
1. **¿Optimizarás una foto, una captura de pantalla o un recurso de imagen similar? Usa el formato JPEG.**
    * En este formato se usa una combinación de optimización con y sin pérdida para reducir el tamaño de archivo del recurso de imagen. Prueba con diferentes niveles de calidad JPEG hasta encontrar la mejor relación entre calidad y tamaño de archivo para tu recurso.

Por último, una vez que hayas determinado el formato de imagen óptimo y la configuración para cada uno de tus archivos, considera agregar una variante adicional codificada en WebP y JPEG XR. Ambos formatos son nuevos y, desafortunadamente, los navegadores todavía no los admiten a nivel universal, pero aún así pueden implicar ahorros significativos para los clientes más nuevos (por ejemplo, en promedio, WebP ofrece una [reducción del tamaño de archivo del 30%](/speed/webp/docs/webp_study) en comparación con una imagen JPEG.

Dado que ni WebP ni JPEG XR tienen compatibilidad universal, deberás agregar lógica adicional a tu app o a tus servidores para proporcionar el recurso correcto:

* Algunas CDN proporcionan optimización de imágenes como servicio, e incluyen los formatos JPEG XR y WebP.
* Algunas herramientas de código abierto (por ejemplo, PageSpeed para Apache o Nginx) automatizan la optimización, la conversión y la provisión de los recursos correspondientes.
* Puedes agregar lógica de aplicación adicional para detectar el cliente, comprobar los formatos que admiten y proporcionar el mejor formato de imagen disponible.

Por último, ten en cuenta que si usas una vista web para representar contenido en tu aplicación nativa, podrás controlar por completo el cliente y usar WebP de forma exclusiva. Facebook, Google+ y muchos otros usan WebP para proporcionar todas sus imágenes en sus apps. El ahorro definitivamente vale la pena. Para obtener más información acerca de WebP, consulta la presentación [WebP: Deploying Faster, Smaller, and More Beautiful Images](https://www.youtube.com/watch?v=pS8udLMOOaE) (WebP: implementación de imágenes más rápidas, pequeñas y mejoradas) de Google I/O 2013.


## Ajuste de herramientas y parámetros

No existe un formato, una herramienta ni un conjunto de parámetros de optimización perfecto para todas las imágenes. Para obtener los mejores resultados, deberás seleccionar el formato y su configuración según el contenido de la imagen y otros requisitos visuales y técnicos.

<table>
<thead>
  <tr>
    <th>Herramienta</th>
    <th>Descripción</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="tool"><a href="http://www.lcdf.org/gifsicle/">gifsicle</a></td>
  <td data-th="description">creación y optimización de imágenes GIF</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://jpegclub.org/jpegtran/">jpegtran</a></td>
  <td data-th="description">optimización de imágenes JPEG</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://optipng.sourceforge.net/">optipng</a></td>
  <td data-th="description">optimización de imágenes PNG sin pérdida</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://pngquant.org/">pngquant</a></td>
  <td data-th="description">optimización de imágenes PNG con pérdida</td>
</tr>
</tbody>
</table>


No dudes en experimentar con parámetros de cada compresor. Reduce la calidad, observa el aspecto y luego simplemente repite el procedimiento. Cuando encuentres un buen conjunto de ajustes, podrás aplicarlos a otras imágenes similares en tu sitio, pero no des por sentado que todas las imágenes deben comprimirse con la misma configuración.


## Provisión de recursos de imagen ajustados a escala

### TL;DR {: .hide-from-toc }
- La provisión de recursos ajustados a escala es una de las optimizaciones más sencillas y eficaces.
- Presta mucha atención a los recursos grandes ya que podrían provocar una gran sobrecarga.
- Reduce la cantidad de píxeles innecesarios al ajustar a escala tus imágenes hasta alcanzar su tamaño de representación.


La optimización de la imagen se reduce a dos criterios: la optimización de la cantidad de bytes empleados para codificar cada pixel de la imagen, y la optimización de la cantidad total de píxeles. El tamaño de archivo de la imagen equivale simplemente la cantidad total de píxeles multiplicada por la cantidad de bytes usados para codificar cada pixel. Nada más y nada menos que eso.

<img src="images/resized-image.png" class="attempt-right" alt="Imagen con tamaño modificado">

En consecuencia, una de las técnicas más simples y eficaces de optimización de imágenes es asegurarse de no usar más píxeles que los necesarios para mostrar el recurso y su tamaño previsto en el navegador. ¿Suena simple, no es así? Lamentablemente, la mayoría de las páginas no superan esta prueba a causa de varios de sus recursos de imagen. Generalmente, envían recursos más grandes y derivan al navegador el ajuste de escala (lo cual también consumen más recursos de CPU) y la visualización con una resolución más baja.

Note: El desplazamiento sobre el elemento de imagen en Chrome DevTools revela los tamaños "natural" y "de visualización" del recurso de imagen. En el ejemplo anterior se descarga la imagen de 300 x 260 píxeles, pero luego se reduce (245 x 212) en el cliente para poder mostrarla.

La sobrecarga del uso de píxeles innecesarios para que el navegador modifique el tamaño de la imagen implica la pérdida de una gran oportunidad de reducir y optimizar la cantidad total de bytes para la representación de la página. Además, ten en cuenta que la modificación del tamaño no depende simplemente de la reducción en píxeles de la imagen, sino también de su tamaño natural.

<table>
<thead>
  <tr>
    <th>Resolución de la pantalla</th>
    <th>Tamaño natural</th>
    <th>Tamaño de representación (px CSS)</th>
    <th>Píxeles innecesarios</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="natural">110 x 110</td>
  <td data-th="display">100 x 100</td>
  <td data-th="overhead">110 x 110 - 100 x 100 = 2100</td>
</tr>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="natural">410 x 410</td>
  <td data-th="display">400 x 400</td>
  <td data-th="overhead">410 x 410 - 400 x 400 = 8100</td>
</tr>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="natural">810 x 810</td>
  <td data-th="display">800 x 800</td>
  <td data-th="overhead">810 x 810 - 800 x 800 = 16 100</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="natural">220 x 220</td>
  <td data-th="display">100 x 100</td>
  <td data-th="overhead">210 x 210 - (2 x 100) x (2 x 100) = 8400</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="natural">820 x 820</td>
  <td data-th="display">400 x 400</td>
  <td data-th="overhead">820 x 820 - (2 x 400) x (2 x 400) = 32 400</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="natural">1620 x 1620</td>
  <td data-th="display">800 x 800</td>
  <td data-th="overhead">1620 x 1620 - (2 x 800) x (2 x 800) = 64 400</td>
</tr>
</tbody>
</table>

Ten en cuenta que, en todos los casos anteriores, el tamaño de visualización es “solo 10 píxeles CSS más pequeño” que el recurso requerido para cada resolución de pantalla. No obstante, la cantidad de píxeles adicionales y la sobrecarga asociada aumentan rápidamente a medida que se incrementan las dimensiones de visualización de la imagen. Como consecuencia, si bien quizá no puedas garantizar la provisión de cada uno de los recursos en el tamaño exacto de visualización, **debes asegurarte de que la cantidad de píxeles innecesarios sea mínima y que tus recursos de gran volumen, en particular, se proporcionen en el tamaño más aproximado posible a su tamaño de visualización.**

## Lista de comprobación de optimización de la imagen

La optimización de la imagen es un arte y una ciencia. Un arte porque no hay una respuesta definitiva respecto de cuál es la mejor manera de comprimir una imagen individual, y una ciencia porque existe una gran cantidad de técnicas y algoritmos bien desarrollados que pueden reducir notablemente el tamaño de una imagen.

Te damos algunas sugerencias y técnicas para que recuerdes mientras trabajas en la optimización de tus imágenes:

* **Prioriza los formatos vectoriales:** las imágenes vectoriales no dependen de la resolución ni de la escala. Esto las convierte en una opción perfecta para el ámbito de los diferentes dispositivos y la alta resolución.
* **Reduce y comprime los recursos SVG:** el lenguaje de marcado XML producido por la mayoría de las aplicaciones de dibujo a menudo contiene metadatos innecesarios que se pueden eliminar. Asegúrate de que la configuración de tus servidores permita aplicar compresión GZIP para recursos SVG.
* **Escoge el mejor formato de imagen de trama:** determina tus requisitos funcionales y selecciona el que se adecue a cada recurso en particular.
* **Experimenta con configuraciones de calidad óptimas para formatos de trama:** no dudes en reducir la configuración de “calidad”; los resultados generalmente son muy buenos y la reducción en bytes es considerable.
* **Elimina los metadatos de imágenes innecesarios:** muchas imágenes de trama contienen metadatos innecesarios sobre el recurso; entre otros, la información geográfica y la información de la cámara. Usa las herramientas correctas para eliminar estos datos.
* **Proporciona imágenes ajustadas a escala:** modifica el tamaño de las imágenes en el servidor y asegúrate de que el tamaño de “visualización” sea lo más aproximado posible al tamaño natural de la imagen. Presta mucha atención a las imágenes más grandes en particular, ya que generan la mayor sobrecarga cuando se modifica su tamaño.
* **Busca la automatización permanentemente:** invierte en herramientas e infraestructura automatizadas. Estas garantizarán que todos tus recursos de imagen estén siempre optimizados.


{# wf_devsite_translation #}
