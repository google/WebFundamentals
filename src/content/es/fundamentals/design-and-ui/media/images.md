project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Una imagen vale más que mil palabras, y juegan un papel importante en cada página. Sin embargo, las imágenes también son la causa de que se descarguen tantos bytes.  Al usar un diseño web adaptable, no solo puede cambiar el diseño según las características del dispositivo, sino que las imágenes también pueden cambiar.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2014-04-29 #}

# Imágenes {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Una imagen vale más que mil palabras, y juegan un papel importante en cada página. Sin embargo, las imágenes también son la causa de que se descarguen tantos bytes.  Al usar un diseño web adaptable, no solo puede cambiar el diseño según las características del dispositivo, sino que las imágenes también pueden cambiar.


### Imágenes adaptables

Al usar un diseño adaptable, no solo puede cambiar el diseño según las características del dispositivo, sino que el contenido también puede cambiar.  Por ejemplo, en pantallas de alta resolución (con el doble de píxeles), los gráficos de alta resolución son necesarios para garantizar la nitidez de las imágenes.  Una imagen con un ancho del 50% podría funcionar correctamente cuando la ventana del navegador tenga 800 píxeles de ancho, pero usará demasiado espacio para un teléfono estrecho y, aun así, utilizará el mismo ancho de banda al reducir su tamaño para encajar en una pantalla más pequeña.

### Dirección artística

<img class="center" src="img/art-direction.png" alt="Ejemplo de dirección artística"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Otras veces, la imagen puede necesitar cambios más drásticos: modificar las proporciones, recortarla e incluso sustituirla por otra.  En este caso, el cambio en la imagen suele denominarse `dirección artística`.  Consulta [responsiveimages.org/demos/](http://responsiveimages.org/demos/) para ver más ejemplos.


## Responsive Images
<div class="attempt-right">
  <figure>
    <img src="img/udacity-ri.jpg">
  </figure>
</div>

Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow.

[View Course](https://udacity.com/ud882){: .external }







## Imágenes en el marcado 




El elemento <code>img</code> es muy útil (descarga, descodifica y muestra contenido) y los navegadores modernos son compatibles con una serie de formatos de imagen. Por ejemplo, las imágenes que sirven en los dispositivos no son diferentes a las imágenes para ordenadores, y con solo unas pocas modificaciones podemos crear una buena experiencia.



### TL;DR {: .hide-from-toc }
- Utiliza tamaños relativos para las imágenes a fin de evitar que se salgan del contenedor por accidente.
- Utiliza el elemento <code>picture</code> cuando quieras especificar diferentes imágenes en función de las características del dispositivo (es decir, dirección de recursos gráficos).
- Utiliza el atributo <code>srcset</code> y el descriptor <code>x</code> en el elemento <code>img</code> para dar pistas al navegador sobre la imagen que es mejor utilizar cuando elija entre varias densidades.



### Utilizar tamaños relativos para imágenes

No olvides utilizar unidades relativas cuando especifiques anchos para las imágenes. Así evitarás que se salgan de la ventana gráfica por accidente.  Por ejemplo, el atributo `width: 50%;` hará que el ancho de la imagen ocupe un 50% del elemento contenedor (no de la ventana gráfica ni del tamaño de píxeles real).

Como CSS permite que el contenido se salga del contenedor, puede que sea necesario utilizar un ancho máximo de 100% (`max-width: 100%`) para impedir que las imágenes y otros contenidos se salgan.  Por ejemplo:


    img, embed, object, video {
      max-width: 100%;
    }
    

Asegúrate de proporcionar descripciones pertinentes con el atributo `alt` de los elementos `img`; estas descripciones mejoran la accesibilidad del sitio, ya que proporcionan contexto a los lectores de pantalla y a otras tecnologías asistenciales.

### Optimizar los elementos `img` con el atributo `srcset` para dispositivos con alta proporción de puntos por pulgada

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

El atributo <code>srcset</code> mejora el comportamiento del elemento <code>img</code>, de modo que es más fácil proporcionar varios archivos de imagen para diferentes características de los dispositivos. De modo similar a la <a href="images-in-css.html#use-image-set-to-provide-high-res-images">función CSS</a> <code>image-set</code> que pertenece a CSS, el atributo <code>srcset</code> permite que el navegador elija la mejor imagen en función de las características del dispositivo. Por ejemplo, utiliza una imagen 2x en una pantalla 2x y quizás, en el futuro, una imagen 1x en un dispositivo 2x con una red de ancho de banda limitado.


<div class="clearfix"></div>


    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

En los navegadores que no son compatibles con el atributo `srcset`, el navegador utiliza el archivo de imagen predeterminado por el atributo `src`.  Por eso es importante incluir siempre una imagen 1x que se pueda mostrar en cualquier dispositivo, sean cuales sean sus funciones.  Si se admite el atributo `srcset`, la lista separada con comas de imágenes y condiciones se analiza antes de realizar una solicitud y solo se descarga y se muestra la imagen más adecuada.

Aunque las condiciones pueden incluir todo tipo de criterios, desde la densidad de píxeles hasta el ancho y el alto, hoy en día solo está extendida la compatibilidad con la densidad de píxeles.  Para equilibrar el comportamiento actual y las funciones futuras, sigue optando por proporcionar la imagen 2x en el atributo.

### Dirección de recursos gráficos en imágenes adaptables con el elemento `picture`

La modificación de las imágenes en función de las características del dispositivo, también conocido como `dirección de recursos gráficos`, se puede lograr con el elemento `picture`.  El elemento <code>picture</code> define una solución declarativa para proporcionar varias versiones de una imagen en función de varias características, como el tamaño del dispositivo, la resolución del dispositivo, la orientación, etc.

<img class="center" src="img/art-direction.png" alt="Ejemplo de dirección de recursos gráficos"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

<div class="clearfix"></div>


Note: El elemento <code>picture</code> se empieza a utilizar en navegadores. Aunque aún no está disponible en todos los navegadores, recomendamos su uso por la amplia compatibilidad con versiones anteriores y el posible uso del <a href="http://picturefill.responsiveimages.org/">polyfill de Picturefill</a>. Consulta el sitio de <a href="http://responsiveimages.org/#implementation">ResponsiveImages.org</a> para obtener más información.

El elemento <code>picture</code> se debe utilizar cuando exista un recurso de imagen con varias densidades o cuando un diseño adaptable determine una imagen con ciertas diferencias en algunos tipos de pantallas.  De modo similar al elemento <code>video</code>, se pueden incluir varios elementos <code>source</code>, así se pueden especificar varios archivos de imagen en consultas multimedia o en el formato de imagen.

<div class="clearfix"></div>


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/media.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

En el ejemplo anterior, si el ancho del navegador tiene un valor mínimo de 800 px, se utilizarán `head.jpg` o `head-2x.jpg`, en función de la resolución del dispositivo. Si el navegador admite entre 450 px y 800 px, se utilizarán `head-small.jpg` o `head-small-2x.jpg`, una vez más, en función de la resolución del dispositivo. En el caso de las pantallas con un ancho inferior a 450 px y compatibilidad con versiones anteriores en las que no se admita el elemento `picture`, el navegador hará efectivo el elemento `img`. Por eso, siempre se debe incluir.

#### Imágenes con tamaños relativos

Cuando no se conoce el tamaño final de la imagen, puede resultar difícil especificar un descriptor de densidad para los recursos de imágenes.  Esto se cumple sobre todo con las imágenes que ocupan un ancho proporcional del navegador y son fluidas, en función del tamaño del navegador.

En vez de proporcionar tamaños y densidades de imagen fijos, el tamaño de cada imagen se puede especificar añadiendo un descriptor de anchura junto con el tamaño del elemento de imagen, de modo que el navegador puede calcular automáticamente la densidad de píxeles eficiente y puede elegir la imagen que es mejor descargar.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/sizes.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

En el ejemplo anterior se muestra una imagen que ocupa la mitad del ancho de ventana gráfica (`sizes='50vw'`) y, en función del ancho de navegador y la relación de píxeles del dispositivo), se permite que el navegador elija la imagen correcta independientemente del tamaño de la ventana del navegador.  Por ejemplo, en la tabla siguiente se muestra qué imagen elegiría el navegador:

<table>
    <thead>
    <tr>
      <th data-th="Ancho del navegador">Ancho del navegador</th>
      <th data-th="Relación de píxeles del dispositivo">Relación de píxeles del dispositivo</th>
      <th data-th="Imagen usada">Imagen usada</th>
      <th data-th="Resolución eficiente">Resolución eficiente</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Ancho del navegador">400 px</td>
      <td data-th="Relación de píxeles del dispositivo">1</td>
      <td data-th="Imagen usada"><code>200.png</code></td>
      <td data-th="Resolución eficiente">1x</td>
    </tr>
    <tr>
      <td data-th="Ancho del navegador">400 px</td>
      <td data-th="Relación de píxeles del dispositivo">2</td>
      <td data-th="Imagen usada"><code>400.png</code></td>
      <td data-th="Resolución eficiente">2x</td>
    </tr>
    <tr>
      <td data-th="Ancho del navegador">320 px</td>
      <td data-th="Relación de píxeles del dispositivo">2</td>
      <td data-th="Imagen usada"><code>400.png</code></td>
      <td data-th="Resolución eficiente">2,5x</td>
    </tr>
    <tr>
      <td data-th="Ancho del navegador">600 px</td>
      <td data-th="Relación de píxeles del dispositivo">2</td>
      <td data-th="Imagen usada"><code>800.png</code></td>
      <td data-th="Resolución eficiente">2,67x</td>
    </tr>
    <tr>
      <td data-th="Ancho del navegador">640 px</td>
      <td data-th="Relación de píxeles del dispositivo">3</td>
      <td data-th="Imagen usada"><code>1000.png</code></td>
      <td data-th="Resolución eficiente">3,125x</td>
    </tr>
    <tr>
      <td data-th="Ancho del navegador">1.100 px</td>
      <td data-th="Relación de píxeles del dispositivo">1</td>
      <td data-th="Imagen usada"><code>1400.png</code></td>
      <td data-th="Resolución eficiente">1,27x</td>
    </tr>
  </tbody>
</table>


#### Dar cuenta de los puntos de interrupción en imágenes adaptables

En muchos casos, el tamaño o la imagen pueden variar en función de los puntos de interrupción del diseño del sitio.  Por ejemplo, en una pantalla pequeña, puede que quieras que la imagen ocupe todo el ancho de la ventana gráfica, mientras que en las pantallas grandes quizá solo quieras que ocupe una parte pequeña.  

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/breakpoints.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

El atributo `sizes` del ejemplo anterior utiliza varias consultas multimedia para especificar el tamaño de la imagen.  Cuando el ancho del navegador es superior a 600 px, la imagen ocupa el 25% del ancho de la ventana gráfica; cuando se encuentra entre 500 px y 600 px, la imagen ocupa el 50% del ancho de ventana gráfica; y por debajo de 500 px, ocupa todo el ancho.


### Definir que las imágenes del producto se puedan ampliar

Puede que los clientes quieran ver lo que van a comprar.  En los sitios de compras, los usuarios esperan poder ver primeros planos de los productos en alta resolución para poder examinar mejor los detalles. Además, los [participantes del estudio](/web/fundamentals/principles/research-study.html) se sintieron frustrados si no se les daba esta opción.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Sitio web de J. Crew con imagen del producto ampliable">
  <figcaption>Sitio web de J. Crew con imagen del producto ampliable</figcaption>
</figure>

El sitio de J. Crew nos proporciona un buen ejemplo de imágenes ampliables que se pueden tocar. Una superposición que desaparece nos indica que cierta imagen se puede tocar para obtener un primer plano que pone de relieve los detalles.


### Otras técnicas de imágenes

#### Imágenes de compresión

La [técnica
de imagen de compresión](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview) muestra una imagen 2x muy comprimida en todos los dispositivos, sin importar las funciones del dispositivo.  En función del tipo de imagen y del nivel de compresión, puede que no se perciba cambio alguno en la calidad de la imagen, pero el tamaño del archivo se reduce en gran medida.

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/images/compressive.html">Mostrar ejemplo</a>


Note: Ten cuidado con la técnica de compresión, porque aumenta el uso de memoria y supone costes adicionales de descodificación.  La adaptación de imágenes grandes para que quepan en pantallas más pequeñas es cara y puede ser una tarea especialmente ardua en los dispositivos de gama baja en los que la memoria y la capacidad de procesamiento son limitadas.

#### Sustitución de la imagen JavaScript

La sustitución de la imagen JavaScript comprueba las funciones del dispositivo y `hace lo correcto`. Puedes determinar la relación de píxeles del dispositivo con el atributo `window.devicePixelRatio`, obtener el ancho y alto de pantalla y posiblemente hasta buscar conexión de red mediante `navigator.connection` o emitir una solicitud falsa. Una vez recopilada toda esta información, puedes decidir qué imagen quieres cargar.

Un gran inconveniente de este método es que usar JavaScript implica que la carga de la imagen se retrasa hasta que, por lo menos, el analizador anticipado haya terminado. Esto quiere decir que las imágenes ni siquiera se empezarán a descargar hasta después de que se inicie el evento `pageload`. Además, es muy probable que el navegador descargue tanto la imagen 1x como la 2x, de modo que aumenta el peso de la página.





## Imágenes en CSS 




La propiedad `background` de CSS es un método eficaz de añadir imágenes complejas en los elementos y, además, permite añadir varias imágenes, hacer que se repitan, etc.  Cuando se combina con las consultas de medios, la propiedad `background` es aun más eficaz y permite la carga condicional de la imagen teniendo en cuenta la resolución de la pantalla, el tamaño de la ventana gráfica y otros aspectos.



### TL;DR {: .hide-from-toc }
- Usa la imagen que mejor se adapte a las características de la pantalla, teniendo en cuenta el tamaño de la pantalla, la resolución del dispositivo y el diseño de la página.
- Cambia la propiedad <code>background-image</code> en CSS para las pantallas con muchos puntos por pulgada. Para ello, usa consultas de medios con <code>min-resolution</code> y <code>-webkit-min-device-pixel-ratio</code>.
- Usa `srcset` para mostrar imágenes de alta resolución, además de la imagen en tamaño normal en el lenguaje de marcado.
- Ten en cuenta los costes de rendimiento al usar técnicas de sustitución de imágenes de JavaScript o al mostrar imágenes de alta resolución muy comprimidas en dispositivos de menor resolución.


### Usar consultas de medios para la carga condicional de imágenes o dar dirección artística

Las consultas de medios no solo afectan al diseño de la página, sino que también pueden usarse para la carga condicional de imágenes o para dar dirección artística según el ancho de la ventana gráfica.

Por ejemplo, en el siguiente ejemplo, solo se descarga `small.png` y se aplica al `div` de contenido en las pantallas más pequeñas. En cambio, en pantallas más grandes, se aplica `background-image: url(body.png)` al cuerpo, y `background-image: url(large.png)` al `div` de contenido.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/conditional-mq.html" region_tag="conditional" adjust_indentation="auto" %}
</pre>

### Usar `image-set` para mostrar imágenes de alta resolución

La función `image-set()` en CSS mejora el comportamiento de la propiedad `background`, ya que permite añadir de forma más fácil varios archivos de imagen para diferentes características de dispositivo.  Esto permite al navegador elegir la mejor imagen en función de las características del dispositivo. Por ejemplo, puede usar una imagen cuyo tamaño sea el doble del tamaño normal en una pantalla con el doble de píxeles, o una imagen de tamaño normal en un dispositivo con el doble de píxeles cuando la red tenga ancho de banda limitado.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

Además de cargar la imagen correcta, el navegador la escalará
según sea necesario. Es decir, el navegador interpreta que las imágenes que duplican su tamaño normal son el doble de grandes que las imágenes de tamaño normal y, por lo tanto escalará las imágenes de tamaño doble reduciendo su tamaño por un factor de 2. De este modo, la imagen parece tener el mismo tamaño en la página.

La compatibilidad con `image-set()` aún es reciente y solo es compatible en Chrome y en Safari con el prefijo de proveedor `-webkit`.  Se debe tomar la precaución de incluir una imagen de respaldo para cuando no se admita `image-set()`, por ejemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/image-set.html" region_tag="imageset" adjust_indentation="auto" %}
</pre>

El ejemplo anterior cargará los recursos apropiados en los navegadores que sean compatibles con `image-set()` y, si no fuera posible, mostrará el recurso en tamaño normal. La desventaja obvia de este método es que la compatibilidad del navegador con `image-set()` es poco frecuente, por lo que la mayoría de los navegadores mostrarán el recurso en tamaño normal.

### Usar consultas de medios para imágenes de alta resolución o para dirección artística

Las consultas de medios pueden crear normas basadas en la [relación de píxeles del dispositivo](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg), lo que hace posible especificar distintas imágenes tanto para pantallas con el doble de píxeles como para pantallas con la cantidad normal de píxeles.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome, Firefox y Opera son compatibles con la sintaxis `(min-resolution: 2dppx)`, aunque Safari y el navegador de Android requieren la sintaxis anterior del proveedor con sufijo, pero sin la unidad `dppx`.  Recuerda que estos estilos solo se cargan si el dispositivo coincide con la consulta de medios y que debe especificar estilos para el caso básico.  Con esto también se garantiza que se muestre un elemento si el navegador no es compatible con la resolución especificada en las consultas de medios.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/media-query-dppx.html" region_tag="mqdppx" adjust_indentation="auto" %}
</pre>

Además, puedes usar la sintaxis `min-width` para mostrar imágenes alternativas en función del tamaño de la ventana gráfica.  Esta técnica tiene la ventaja de que la imagen no se descarga si la consulta de medios no coincide.  Por ejemplo, solo se descarga y se aplica `bg.png` en `body` si el ancho del navegador es de 500 píxeles como mínimo:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    	





## Usar SVG para iconos 




Cuando añadas iconos a tu página web, usa iconos SVG en la medida de lo posible o, en algunos casos, caracteres unicode.




### TL;DR {: .hide-from-toc }
- Usa SVG o caracteres unicode para los iconos en lugar de imágenes de mapa de bits.


### Sustituir iconos simples por unicode

Muchas fuentes admiten los miles de glifos unicode, que pueden usarse en sustitución de las imágenes.  A diferencia de las imágenes, las fuentes unicode se escalan correctamente y quedan bien independientemente de lo pequeñas o grandes que se muestren en la pantalla.

Además del conjunto de caracteres normal, los caracteres unicode pueden incluir símbolos para formas numéricas (&#8528;), flechas (&#8592;), operadores matemáticos (&#8730;), formas geométricas (&#9733;), imágenes de control (&#9654;), patrones braille (&#10255;), anotaciones musicales (&#9836;), letras griegas (&#937;) e incluso fichas de ajedrez (&#9822;).

Los caracteres unicode se usan del mismo modo que las entidades nombradas: en `&#XXXX`, `XXXX` representa el número del carácter unicode.  Por ejemplo:


    Eres una auténtica &#9733;
    

Eres una auténtica &#9733;

### Sustituir iconos complejos con SVG
Cuando los requisitos de iconos son más complejos, se recomienda usar iconos SVG, que suelen ser más ligeros y fáciles de usar, y se les pueden aplicar estilos con CSS. Las imágenes SVG tienen una serie de ventajas sobre las imágenes de mapa de bits:

* Son gráficos vectoriales que pueden escalarse de manera infinita.
* Es fácil usar efectos de CSS para aplicar color, sombras, transparencias y animaciones.
* Las imágenes SVG pueden incluirse directamente en el documento.
* Son semánticas.
* Permiten una mayor accesibilidad con los atributos adecuados.


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/icon-svg.html" region_tag="iconsvg" adjust_indentation="auto" %}
</pre>

### Usar fuentes de iconos con precaución

Las fuentes de icono son populares y pueden usarse fácilmente, pero tienen algunos inconvenientes en comparación con los iconos SVG.

* Son gráficos vectoriales que pueden escalarse de manera infinita, pero pueden aparecer con los bordes suavizados, por lo que los iconos no quedarían tan nítidos como cabría esperar.
* Tienen estilos limitados en CSS.
* Puede ser difícil colocar perfectamente los píxeles, en función de la altura de la línea, del espacio entre letras, etc.
* No son semánticas y pueden ser difíciles de usar con lectores de pantalla o con otras tecnologías de apoyo.
* Salvo que se delimiten de forma adecuada, pueden resultar en un archivo muy grande para solo usar un pequeño subconjunto de los iconos disponibles. 



<img src="img/icon-fonts.png" class="center" srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x" alt="Ejemplo de página que usa FontAwesome para sus iconos de fuente.">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/icon-font.html" region_tag="iconfont" adjust_indentation="auto" %}
</pre>

Hay cientos de fuentes de icono gratis y de pago, incluidas [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [Pictos](http://pictos.cc/) y [Glyphicons](http://glyphicons.com/).

Asegúrate de que el peso de la solicitud HTTP adicional y el tamaño del archivo estén equilibrados con la necesidad de iconos.  Por ejemplo, si solo necesita unos cuantos iconos, puede ser mejor usar una imagen o un sprite de imagen.





## Optimizar imágenes para mejorar el rendimiento 




Las imágenes suelen ser las responsables de la mayoría de los bytes descargados en un sitio y, además, ocupar una gran cantidad de espacio visual en la página. Por lo tanto, al optimizar las imágenes se consumirán menos bytes y se mejorará el rendimiento en el sitio web. Cuantos menos bytes deba descargar el navegador, menor será la competición por el ancho de banda del cliente y más rápido se descargarán y se mostrarán los recursos en el sitio web.


### TL;DR {: .hide-from-toc }
- No elijas un formato de imagen al azar; usa el formato más óptimo.
- Incluye herramientas de optimización de imágenes y de compresión en el flujo de trabajo para reducir el tamaño de los archivos.
- Reduce el número de solicitudes HTTP situando las imágenes más usadas en sprites de imagen.
- Procura cargar las imágenes solo cuando el usuario llegue a la sección en que se encuentran. De este modo, se mejora el tiempo de carga inicial de la página y se reduce el peso inicial de esta.


### Elegir el formato adecuado

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

### Reducir el tamaño del archivo

El archivo de imagen puede reducirse notablemente si lo procesas una vez guardado. Hay varias herramientas para la compresión de imágenes, ya sea con o sin pérdida de calidad, online, mediante interfaz gráfica de usuario o mediante línea de comandos.  Siempre que sea posible, lo mejor es automatizar la optimización de las imágenes. De este modo, se le da la importancia que merece en el flujo de trabajo.

Hay varias herramientas disponibles que comprimen aun más las imágenes, sin pérdida de calidad en los archivos JPG y PNG. En el caso de los archivos JPG, prueba [jpegtran](http://jpegclub.org/) o [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (disponible solo para Linux; se ejecuta con la opción `--strip-all`). En el caso de los archivos PNG, prueba [OptiPNG](http://optipng.sourceforge.net/) o [PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

### Usar sprites de imagen

El uso de sprites en CSS es una técnica en la que varias imágenes se combinan en una sola imagen `sprite sheet`. Con esta técnica, cada imagen puede usarse para especificar la imagen de fondo de un elemento (la hoja de sprites) y un desplazamiento para mostrar la parte correcta.

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/images/image-sprite.html"><img src="img/sprite-sheet.png" class="center" alt="Hoja de sprites de imágenes usada en el ejemplo"></a>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/image-sprite.html" region_tag="sprite" adjust_indentation="auto" %}
</pre>

El uso de sprites tiene la ventaja de reducir el número de descargas necesarias para obtener varias imágenes y, a la vez, habilitar el almacenamiento en caché.

### Carga inteligente

La carga inteligente permite aumentar la velocidad de carga de páginas extensas con muchas imágenes en la mitad inferior, ya que carga las imágenes según sean necesarias o cuando el contenido principal se haya cargado y mostrado.  Además de mejorar el rendimiento, el uso de la carga inteligente permite crear páginas con desplazamiento infinito.

Ten cuidado al crear estas páginas, ya que el contenido se carga a medida que se visualiza, y es posible que los motores de búsqueda nunca detecten ese contenido.  Además, los usuarios que busquen el tipo de información que suele incluirse en un pie de página, nunca verán ese pie de página, ya que se carga contenido nuevo de manera continua.


## Evitar las imágenes por completo 




A veces, la mejor imagen no es una imagen. Siempre que sea posible, usa la capacidad nativa del navegador para ofrecer las mismas funciones u otras similares.  Los navegadores generan elementos gráficos que antes hubieran requerido imágenes.   Esto significa que ya no es necesario que el navegador descargue diferentes archivos de imágenes y que las imágenes se escalen de forma incorrecta.  Los iconos pueden mostrarse con unicode o con fuentes de icono especiales.




### TL;DR {: .hide-from-toc }
- Evita las imágenes siempre que sea posible y, en su lugar, usa las funciones del navegador para aplicar sombras, gradientes, esquinas redondeadas, etc.


### Colocar texto en el lenguaje de marcado, no en imágenes

Siempre hay que procurar que el texto sea texto auténtico y que no forme parte de la imagen, como al usar títulos o números de teléfono y direcciones directamente en las imágenes.  De este modo, la información se puede copiar y pegar, se adaptará a cualquier tamaño de pantalla y será accesible para los lectores de pantalla.  Coloca el texto en el lenguaje de marcado y, si fuera necesario, usa fuentes web para conseguir el estilo deseado.

### Usar CSS para sustituir imágenes

Los navegadores actuales pueden usar funciones de CSS para crear estilos que antes hubieran requerido imágenes.  Por ejemplo, se pueden crear gradientes complejos, sombras y esquinas redondeadas usando las propiedades <code>background</code>, <code>box-shadow</code> y <code>border-radius</code> respectivamente.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

Recuerda que el uso de estas técnicas requiere ciclos de procesamiento, algo que puede afectar a los dispositivos móviles.  Si se usan excesivamente, puedes perder las ventajas que hubieras ganado, además de empeorar el rendimiento.



