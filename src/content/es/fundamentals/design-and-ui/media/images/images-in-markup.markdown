---
title: "Imágenes en el marcado"
description: "El elemento `img` es muy útil (descarga, descodifica y muestra contenido) y los navegadores modernos son compatibles con una serie de formatos de imagen."
updated_on: 2014-09-30
key-takeaways:
  img-in-markup:
    - Utiliza tamaños relativos para las imágenes a fin de evitar que se salgan del contenedor por accidente.
    - Utiliza el elemento <code>picture</code> cuando quieras especificar diferentes imágenes en función de las características del dispositivo (es decir, dirección de recursos gráficos).
    - Utiliza el atributo <code>srcset</code> y el descriptor <code>x</code> en el elemento <code>img</code> para dar pistas al navegador sobre la imagen que es mejor utilizar cuando elija entre varias densidades.
notes:
  picture-support:
    - El elemento <code>picture</code> se empieza a utilizar en navegadores.
      Aunque aún no está disponible en todos los navegadores, recomendamos su uso por la amplia compatibilidad con versiones anteriores y el posible uso del <a href="http://picturefill.responsiveimages.org/">polyfill de Picturefill</a>.
      Consulta el sitio de <a href="http://responsiveimages.org/#implementation">ResponsiveImages.org</a> para obtener más información. 
  compressive:
    - Ten cuidado con la técnica de compresión, porque aumenta el uso de memoria y supone costes adicionales de descodificación.  La adaptación de imágenes grandes para que quepan en pantallas más pequeñas es cara y puede ser una tarea especialmente ardua en los dispositivos de gama baja en los que la memoria y la capacidad de procesamiento son limitadas.
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple21
---

<p class="intro">
  El elemento <code>img</code> es muy útil (descarga, descodifica y muestra contenido) y los navegadores modernos son compatibles con una serie de formatos de imagen. Por ejemplo, las imágenes que sirven en los dispositivos no son diferentes a las imágenes para ordenadores, y con solo unas pocas modificaciones podemos crear una buena experiencia.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.img-in-markup %}


## Utilizar tamaños relativos para imágenes

No olvides utilizar unidades relativas cuando especifiques anchos para las imágenes. Así evitarás que se salgan de la ventana gráfica por accidente.  Por ejemplo, el atributo `width: 50%;` hará que el ancho de la imagen ocupe un 50% del elemento contenedor (no de la ventana gráfica ni del tamaño de píxeles real).

Como CSS permite que el contenido se salga del contenedor, puede que sea necesario utilizar un ancho máximo de 100% (`max-width: 100%`) para impedir que las imágenes y otros contenidos se salgan.  Por ejemplo:

{% highlight css %}
img, embed, object, video {
  max-width: 100%;
}
{% endhighlight %}

Asegúrate de proporcionar descripciones pertinentes con el atributo `alt` de los elementos `img`; estas descripciones mejoran la accesibilidad del sitio, ya que proporcionan contexto a los lectores de pantalla y a otras tecnologías asistenciales.

## Optimizar los elementos `img` con el atributo `srcset` para dispositivos con alta proporción de puntos por pulgada

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      El atributo <code>srcset</code> mejora el comportamiento del elemento <code>img</code>, de modo que es más fácil proporcionar varios archivos de imagen para diferentes características de los dispositivos. De modo similar a la <a href="images-in-css.html#use-image-set-to-provide-high-res-images">función CSS</a> <code>image-set</code> que pertenece a CSS, el atributo <code>srcset</code> permite que el navegador elija la mejor imagen en función de las características del dispositivo. Por ejemplo, utiliza una imagen 2x en una pantalla 2x y quizás, en el futuro, una imagen 1x en un dispositivo 2x con una red de ancho de banda limitado.
    </p>
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo Pzc5Dly_jEM %}
  </div>
</div>

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
{% endhighlight %}

En los navegadores que no son compatibles con el atributo `srcset`, el navegador utiliza el archivo de imagen predeterminado por el atributo `src`.  Por eso es importante incluir siempre una imagen 1x que se pueda mostrar en cualquier dispositivo, sean cuales sean sus funciones.  Si se admite el atributo `srcset`, la lista separada con comas de imágenes y condiciones se analiza antes de realizar una solicitud y solo se descarga y se muestra la imagen más adecuada.

Aunque las condiciones pueden incluir todo tipo de criterios, desde la densidad de píxeles hasta el ancho y el alto, hoy en día solo está extendida la compatibilidad con la densidad de píxeles.  Para equilibrar el comportamiento actual y las funciones futuras, sigue optando por proporcionar la imagen 2x en el atributo.

## Dirección de recursos gráficos en imágenes adaptables con el elemento `picture`

La modificación de las imágenes en función de las características del dispositivo, también conocido como `dirección de recursos gráficos`, se puede lograr con el elemento `picture`.  El elemento <code>picture</code> define una solución declarativa para proporcionar varias versiones de una imagen en función de varias características, como el tamaño del dispositivo, la resolución del dispositivo, la orientación, etc.

<img class="center" src="img/art-direction.png" alt="Ejemplo de dirección de recursos gráficos"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include shared/remember.liquid title="Important" list=page.notes.picture-support %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      El elemento <code>picture</code> se debe utilizar cuando exista un recurso de imagen con varias densidades o cuando un diseño adaptable determine una imagen con ciertas diferencias en algunos tipos de pantallas.  De modo similar al elemento <code>video</code>, se pueden incluir varios elementos <code>source</code>, así se pueden especificar varios archivos de imagen en consultas multimedia o en el formato de imagen.
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo QINlm3vjnaY %}
  </div>
</div>

{% include_code src=_code/media.html snippet=picture lang=html %}

En el ejemplo anterior, si el ancho del navegador tiene un valor mínimo de 800 px, se utilizarán `head.jpg` o `head-2x.jpg`, en función de la resolución del dispositivo. Si el navegador admite entre 450 px y 800 px, se utilizarán `head-small.jpg` o `head-small-2x.jpg`, una vez más, en función de la resolución del dispositivo. En el caso de las pantallas con un ancho inferior a 450 px y compatibilidad con versiones anteriores en las que no se admita el elemento `picture`, el navegador hará efectivo el elemento `img`. Por eso, siempre se debe incluir.

### Imágenes con tamaños relativos

Cuando no se conoce el tamaño final de la imagen, puede resultar difícil especificar un descriptor de densidad para los recursos de imágenes.  Esto se cumple sobre todo con las imágenes que ocupan un ancho proporcional del navegador y son fluidas, en función del tamaño del navegador.

En vez de proporcionar tamaños y densidades de imagen fijos, el tamaño de cada imagen se puede especificar añadiendo un descriptor de anchura junto con el tamaño del elemento de imagen, de modo que el navegador puede calcular automáticamente la densidad de píxeles eficiente y puede elegir la imagen que es mejor descargar.

{% include_code src=_code/sizes.html snippet=picture lang=html %}

En el ejemplo anterior se muestra una imagen que ocupa la mitad del ancho de ventana gráfica (`sizes='50vw'`) y, en función del ancho de navegador y la relación de píxeles del dispositivo), se permite que el navegador elija la imagen correcta independientemente del tamaño de la ventana del navegador.  Por ejemplo, en la tabla siguiente se muestra qué imagen elegiría el navegador:

<table class="mdl-data-table mdl-js-data-table">
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


### Dar cuenta de los puntos de interrupción en imágenes adaptables

En muchos casos, el tamaño o la imagen pueden variar en función de los puntos de interrupción del diseño del sitio.  Por ejemplo, en una pantalla pequeña, puede que quieras que la imagen ocupe todo el ancho de la ventana gráfica, mientras que en las pantallas grandes quizá solo quieras que ocupe una parte pequeña.  

{% include_code src=_code/breakpoints.html snippet=picture lang=html %}

El atributo `sizes` del ejemplo anterior utiliza varias consultas multimedia para especificar el tamaño de la imagen.  Cuando el ancho del navegador es superior a 600 px, la imagen ocupa el 25% del ancho de la ventana gráfica; cuando se encuentra entre 500 px y 600 px, la imagen ocupa el 50% del ancho de ventana gráfica; y por debajo de 500 px, ocupa todo el ancho.


## Definir que las imágenes del producto se puedan ampliar

Puede que los clientes quieran ver lo que van a comprar.  En los sitios de compras, los usuarios esperan poder ver primeros planos de los productos en alta resolución para poder examinar mejor los detalles. Además, los [participantes del estudio](/web/fundamentals/principles/research-study.html) se sintieron frustrados si no se les daba esta opción.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Sitio web de J. Crew con imagen del producto ampliable">
  <figcaption>Sitio web de J. Crew con imagen del producto ampliable</figcaption>
</figure>

El sitio de J. Crew nos proporciona un buen ejemplo de imágenes ampliables que se pueden tocar. Una superposición que desaparece nos indica que cierta imagen se puede tocar para obtener un primer plano que pone de relieve los detalles.


## Otras técnicas de imágenes

### Imágenes de compresión

La [técnica
de imagen de compresión](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview) muestra una imagen 2x muy comprimida en todos los dispositivos, sin importar las funciones del dispositivo.  En función del tipo de imagen y del nivel de compresión, puede que no se perciba cambio alguno en la calidad de la imagen, pero el tamaño del archivo se reduce en gran medida.

{% link_sample _code/compressive.html %}
Mostrar ejemplo
{% endlink_sample %}

{% include shared/remember.liquid title="Important" list=page.notes.compressive %}

### Sustitución de la imagen JavaScript

La sustitución de la imagen JavaScript comprueba las funciones del dispositivo y `hace lo correcto`. Puedes determinar la relación de píxeles del dispositivo con el atributo `window.devicePixelRatio`, obtener el ancho y alto de pantalla y posiblemente hasta buscar conexión de red mediante `navigator.connection` o emitir una solicitud falsa. Una vez recopilada toda esta información, puedes decidir qué imagen quieres cargar.

Un gran inconveniente de este método es que usar JavaScript implica que la carga de la imagen se retrasa hasta que, por lo menos, el analizador anticipado haya terminado. Esto quiere decir que las imágenes ni siquiera se empezarán a descargar hasta después de que se inicie el evento `pageload`. Además, es muy probable que el navegador descargue tanto la imagen 1x como la 2x, de modo que aumenta el peso de la página.



