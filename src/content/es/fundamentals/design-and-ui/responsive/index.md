project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Gran parte de la Web no está optimizada para varios dispositivos. Adquiere los conocimientos básicos para que tu sitio funcione en móviles, en ordenadores o en cualquier dispositivo con pantalla.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2014-04-29 #}

# Conceptos básicos de diseño web adaptable {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="oK09n_PGhTo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

El uso de los dispositivos móviles para navegar por la Web está creciendo de forma astronómica y, sin embargo, la mayoría de la Web no está optimizada para estos dispositivos. Los dispositivos móviles suelen tener un tamaño de pantalla limitado y debería cambiar la forma de presentar el contenido en estas pantallas.

<div class="clearfix"></div>

{% include "_shared/udacity/ud893.html" %}




Existe una multitud de tamaños de pantalla diferentes en teléfonos,  en híbridos de teléfono y tablet, en tablets, en ordenadores, en consolas de videojuegos, en televisores e incluso en tecnología ponible.  Los tamaños de pantalla están cambiando siempre, por eso es importante que tu sitio pueda adaptarse a cualquier tamaño hoy y en el futuro.


<video autoplay loop controls class="responsiveVideo">
  <source src="videos/resize.webm" type="video/webm">
  <source src="videos/resize.mp4" type="video/mp4">
</video>


El diseño web adaptable, definido por primera vez por [Ethan Marcotte en A List Apart](http://alistapart.com/article/responsive-web-design/), responde a las necesidades de los usuarios y de sus dispositivos.  El diseño cambia en función del tamaño y de la capacidad del dispositivo.  Por ejemplo, en un teléfono, los usuarios verían el contenido en una sola columna. En cambio, en un tablet el mismo contenido podría aparecer en dos columnas.


## Establecer la ventana gráfica 


Las páginas optimizadas para varios dispositivos deben incluir un elemento meta de ventana gráfica en la cabecera del documento. Una metaetiqueta de ventana gráfica indica al navegador cómo ajustar las dimensiones y el escalado de la página.




### TL;DR {: .hide-from-toc }
- Usa la metaetiqueta de ventana gráfica para controlar el ancho y el escalado de la ventana gráfica del navegador.
- Usa <code>width=device-width</code> para que el ancho coincida con el de la pantalla en píxeles independientes del dispositivo.
- Usa <code>initial-scale=1</code> para mantener proporciones reales entre los píxeles CSS y los píxeles independientes del dispositivo.
- No inhabilites el escalado de usuario, ya que así te aseguras de que tu página sea accesible.


Para ofrecer la mejor experiencia posible, los navegadores para móviles muestran la página con el ancho de una pantalla de ordenador (normalmente, 980 píxeles, aunque este tamaño varía según el dispositivo) y, a continuación, intentan mejorar el aspecto aumentando las fuentes y escalando el contenido para ajustarlo a la pantalla.  Esto significa que los tamaños de fuente podrían mostrarse incoherentemente y que los usuarios deberían tocar dos veces o pellizcar para hacer zoom con el fin de ver el contenido e interactuar con él.


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


Al usar el valor de metaetiqueta `width=device-width` para la ventana gráfica, se indica a la página que el ancho de la pantalla debe coincidir con los píxeles independientes del dispositivo. Esto permite a la página volver a procesar el contenido para que coincida con distintos tamaños de pantalla, ya sea en la pantalla pequeña de un teléfono móvil o en la pantalla grande de un monitor.

<figure class="attempt-left">
  <img src="imgs/no-vp.png" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Página sin una ventana gráfica definida">
  <figcaption>Página sin una ventana gráfica definida</figcaption>
</figure>
<figure class="attempt-right">
  <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Página sin una ventana gráfica definida">
  <figcaption>Página sin una ventana gráfica definida</figcaption>
</figure>

<div class="clearfix"></div>


Algunos navegadores mantendrán un ancho de página fijo al girar la pantalla en modo apaisado y harán zoom en el contenido en lugar de procesarlo de nuevo para rellenar la pantalla. Al añadir el atributo `initial-scale=1`, se indica a los navegadores que mantengan las proporciones reales entre los píxeles CSS y los píxeles independientes del dispositivo, sea cual sea la orientación de este. Además, permite a la página utilizar todo el ancho de la pantalla en modo apaisado.


Note: Usa una coma para separar los atributos y asegurarte de que los navegadores más antiguos puedan procesarlos.

### Garantizar la accesibilidad de la ventana gráfica

Además de establecer el atributo `initial-scale`, puedes establecer los siguientes atributos en la ventana gráfica:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Cuando los definas, estos pueden inhabilitar la acción de hacer zoom en la ventana gráfica, lo que podría causar problemas de accesibilidad.


## Ajusta el tamaño del contenido a la ventana gráfica 


Los usuarios de ordenadores y dispositivos móviles están acostumbrados a desplazarse verticalmente en los sitios web, pero no de manera horizontal. La experiencia del usuario empeora si lo obligas a desplazarse horizontalmente por la página de resultados o a reducir el zoom para verla al completo.


### TL;DR {: .hide-from-toc }
- No uses elementos grandes con un ancho fijo.
- El contenido no debería depender del ancho de la ventana gráfica para mostrarse correctamente.
- Usa consultas de medios en CSS para aplicar distintos estilos en pantallas pequeñas y grandes.


Al desarrollar un sitio para móviles con una metaetiqueta de ventana gráfica, es fácil crear contenido para la página que no se adapte a la ventana gráfica especificada. Por ejemplo, una imagen que se muestre con un ancho superior al de la ventana gráfica puede provocar el desplazamiento horizontal de la ventana gráfica. Deberías ajustar el contenido al ancho de la ventana gráfica para que el usuario no tenga que desplazarse horizontalmente por la página.

Dado que las dimensiones de pantalla y el ancho en píxeles CSS varían entre los dispositivos (por ejemplo, entre teléfonos y tablets, y entre distintos teléfonos), el contenido no debería depender de un ancho específico de ventana gráfica para mostrarse correctamente.

Al establecer anchos absolutos en CSS para los elementos de la página (como en el ejemplo anterior), el elemento `div` puede resultar demasiado ancho para la ventana gráfica en un dispositivo más estrecho (por ejemplo, un dispositivo con un ancho de píxeles CSS, como un iPhone). En su lugar, te recomendamos usar valores de ancho relativos, como `width: 100%`.  Del mismo modo, ten cuidado al usar valores de posicionamiento absolutos de gran tamaño, ya que el elemento podría salirse de la ventana gráfica en una pantalla pequeña.

<figure class="attempt-left">
  <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Página con un elemento de 344 píxeles de ancho fijo en un iPhone">
  <figcaption>Página con un elemento de 344 píxeles de ancho fijo en un iPhone</figcaption>
</figure>
<figure class="attempt-right">
  <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Página con un elemento de 344 píxeles de ancho fijo en un Nexus 5.">
  <figcaption>Página con un elemento de 344 píxeles de ancho fijo en un Nexus 5.</figcaption>
</figure>

<div class="clearfix"></div>


## Usar consultas de medios en CSS para una mayor adaptabilidad 


Las consultas de medios son simples filtros que pueden aplicarse a los estilos CSS.  Facilitan el cambio de estilos según las características del dispositivo, como el tipo de pantalla, el ancho, el alto, la orientación e incluso la resolución.




### TL;DR {: .hide-from-toc }
- Las consultas de medios pueden usarse para aplicar estilos según las características del dispositivo.
- Usa <code>min-width</code> en vez de <code>min-device-width</code> para obtener una mayor compatibilidad.
- Usa tamaños relativos en los elementos para no romper el diseño.



Por ejemplo, puedes insertar todos los estilos necesarios para impresión dentro de una consulta de medios de impresión:


    <link rel="stylesheet" href="print.css" media="print">
    

Además de usar el atributo `media` en el enlace de la hoja de estilos, hay dos modos de aplicar consultas de medios que puedan insertarse en un archivo CSS: `@media` e `@import`.  Por motivos de rendimiento, es preferible usar cualquiera de los dos primeros métodos que usar la sintaxis `@import` (consulta [Evitar importaciones en CSS](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations)).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

La lógica que afecta a las consultas de medios no es mutuamente exclusiva, y se aplicará cualquier filtro que cumpla los criterios del bloque CSS resultante usando las reglas de prioridad estándar en CSS.

## Aplicar consultas de medios basadas en el tamaño de la ventana gráfica

Las consultas de medios nos permiten crear una experiencia para varios dispositivos, con estilos específicos para pantallas pequeñas, grandes y de cualquier tamaño intermedio.  La sintaxis de la consulta de medios permite la creación de reglas que pueden aplicarse según las características del dispositivo.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

Si bien hay varios elementos que podemos usar para estas consultas, los más usados para el diseño web adaptable son `min-width`, `max-width`, `min-height` y `max-height`.


<table>
    <thead>
    <tr>
      <th data-th="attribute">atributo</th>
      <th data-th="Result">Resultado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
      <td data-th="Result">Reglas aplicadas a cualquier ancho de ventana de navegador que supere el valor definido en la consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
      <td data-th="Result">Reglas aplicadas a cualquier ancho de ventana de navegador que sea inferior al valor definido en la consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
      <td data-th="Result">Reglas aplicadas a cualquier alto de ventana de navegador que supere el valor definido en la consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
      <td data-th="Result">Reglas aplicadas a cualquier alto de ventana de navegador que sea inferior al valor definido en la consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=portrait</code></td>
      <td data-th="Result">Reglas aplicadas a cualquier navegador cuyo alto de ventana sea superior o igual al ancho.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=landscape</code></td>
      <td data-th="Result">Reglas aplicadas a cualquier navegador cuyo ancho sea superior al alto.</td>
    </tr>
  </tbody>
</table>

Veamos el siguiente ejemplo:


<img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Vista previa de una página que usa consultas de medios para cambiar las propiedades a medida que cambia de tamaño.">


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

* Cuando la ventana del navegador tenga un tamaño de entre <b>0 px</b> y <b>640 px</b> de ancho, se aplicará·`max-640px.css`.
* Cuando la ventana del navegador tenga un tamaño de entre <b>500 px</b> y <b>600 px</b> de ancho, se aplicarán los estilos de·`@media`.
* Cuando la ventana del navegador tenga <b>640 px de ancho o más</b>, se aplicará `min-640px.css`.
* Cuando la ventana del navegador tenga un <b>ancho superior al alto</b>, se aplicará `landscape.css`.
* Cuando la ventana del navegador tenga un <b>alto superior al ancho</b>, se aplicará `portrait.css`.


### Nota sobre `min-device-width`

También es posible crear consultas basadas en `*-device-width`, aunque **no se recomienda** hacerlo.

La diferencia es sutil, aunque muy importante: `min-width` depende del tamaño de la ventana del navegador, mientras que `min-device-width` depende del tamaño de la pantalla.  Lamentablemente, algunos navegadores, incluido el navegador anterior de Android, no interpretarán correctamente el ancho del dispositivo y, en su lugar, interpretarán el tamaño de pantalla en píxeles de dispositivo en vez de tener en cuenta el ancho de la ventana gráfica, que sería lo esperado.

Además, el uso de `*-device-width` puede evitar que el contenido se adapte en ordenadores y en otros dispositivos que permitan que las ventanas cambien de tamaño. Esto se debe a que la consulta se basa en el tamaño normal del dispositivo, y no en el tamaño de la ventana del navegador.

### Usar unidades relativas

Un concepto clave detrás del diseño adaptable es la fluidez y la proporcionalidad, en contraposición a los diseños con ancho fijo.  Al usar unidades relativas en las medidas, el diseño se simplifica y se evita la creación accidental de componentes que sean demasiado grandes para la ventana gráfica.

Por ejemplo, al establecer `width: 100%` en un elemento `div` de nivel superior, nos aseguramos de que ocupe el ancho de la ventana gráfica y de que nunca sea demasiado grande o pequeño para esta.  El elemento `div` encajará correctamente en un iPhone de 320 píxeles, en un Blackberry Z10 de 342 píxeles o en un Nexus 5 de 360 píxeles de ancho.

Además, al usar unidades relativas, los navegadores pueden procesar el contenido según sea el nivel de zoom que apliquen los usuarios, sin necesidad de añadir barras de desplazamiento horizontal a la página.

<span class="compare-worse">Not recommended</span> — fixed width

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">Recommended</span> — responsive width

    div.fullWidth {
      width: 100%;
    }




## Cómo seleccionar puntos de interrupción 

Aunque puede ser útil definir puntos de interrupción según las clases del dispositivo, hay que tener cuidado al hacerlo.  La definición de puntos de interrupción en cada dispositivo, producto, nombre de marca o sistema operativo utilizado actualmente puede convertirse en una pesadilla. En lugar de esto, lo ideal es que el contenido determine cómo se ajusta el diseño en el elemento contenedor.



### TL;DR {: .hide-from-toc }
- Crea puntos de interrupción basados en el contenido, nunca en un dispositivo, producto o marca en particular.
- Diseña primero para el dispositivo móvil más pequeño, y luego ve adaptando el diseño a las pantallas más grandes.
- Procura que las líneas de texto tengan un máximo de 70 u 80 caracteres.


### Elige primero los puntos de interrupción principales de la pantalla más pequeña

Lo primero es crear un diseño con el contenido adaptado a una pantalla pequeña. A partir de ahí, amplía la pantalla hasta que necesites otro punto de interrupción.  Esto te permite reducir al mínimo los puntos de interrupción en función del contenido.

Ahora vamos a trabajar con el ejemplo que vimos al principio, el de [previsión del tiempo](/web/fundamentals/design-and-ui/responsive/).
Lo primero es adaptarlo para que quede bien en una pantalla pequeña.

<img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Vista previa de la previsión del tiempo en una pantalla pequeña">


A continuación, cambia el tamaño de la ventana del navegador hasta que quede demasiado espacio en blanco entre los elementos y el aspecto de la página empeore.  Esto es subjetivo, aunque un espacio superior a 600 píxeles podría considerarse excesivo.


<img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Vista previa de la previsión del tiempo a medida que aumenta el ancho de la página.">


Para insertar un punto de interrupción a los 600 píxeles, crea dos hojas de estilo: una para cuando la ventana del navegador tenga un tamaño de 600 píxeles como máximo, y otra para cuando supere ese tamaño.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

Por último, refactoriza el código CSS.  En este ejemplo, hemos colocado los estilos comunes, como las fuentes, los iconos, las posiciones básicas o los colores, en `weather.css`.  Los diseños específicos para pantallas pequeñas se encuentran en `weather-small.css`, mientras que los estilos para pantallas grandes se encuentran en `weather-large.css`.


<img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">


### Elije puntos de interrupción secundarios cuando sea necesario

Además de elegir los puntos de interrupción principales para cuando el diseño cambie significativamente, también es útil realizar ajustes ante cambios menores.  Por ejemplo, entre los puntos de interrupción principales, puede resultar útil ajustar los márgenes o el relleno en un elemento, o bien aumentar el tamaño de la fuente para que esta quede más natural en el diseño.

Empezaremos optimizando el diseño para pantallas pequeñas.  En este caso, ampliaremos la fuente cuando el ancho de la ventana gráfica supere los 360 píxeles.  En segundo lugar, cuando haya suficiente espacio, podemos separar la temperatura más alta y la más baja para que queden en la misma línea, en lugar de una encima de la otra.  Además, nos aseguraremos de que los iconos del tiempo sean un poco más grandes.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/weather-small.css" region_tag="mqsmallbpsm" adjust_indentation="auto" %}
</pre>

<img class="attempt-left" src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
<img class="attempt-right" src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">

<div class="clearfix"></div>

Del mismo modo, para pantallas grandes, lo mejor es limitar el ancho máximo del panel de previsión para que no ocupe todo el ancho de la pantalla.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/weather-large.css" region_tag="mqsmallbplg" adjust_indentation="auto" %}
</pre>

### Optimiza el texto para una lectura adecuada

Según la teoría clásica de la legibilidad, una columna debería contener de 70 a 80 caracteres por línea (entre ocho y diez palabras en inglés). Por lo tanto, lo ideal sería incluir un punto de interrupción cada vez que el ancho de un bloque de texto supere diez palabras aproximadamente.

<img class="attempt-left" src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Antes de añadir puntos de interrupción secundarios">
<img class="attempt-right" src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Después de añadir puntos de interrupción secundarios">

<div class="clearfix"></div>

Veamos de forma más detallada el ejemplo anterior de la entrada de blog.  En pantallas más pequeñas, la fuente Roboto con tamaño de 1em funciona bien, ya que permite diez palabras en cada línea. En cambio, necesitará un punto de interrupción en pantallas más grandes. En este caso, si el ancho de la ventana del navegador es superior a 575 píxeles, el ancho ideal para el contenido sería de 550 píxeles.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/reading.html" region_tag="mqreading" adjust_indentation="auto" %}
</pre>

### Nunca ocultes el contenido completamente

Piensa bien qué contenido quieres ocultar o mostrar en función del tamaño de pantalla.
No lo ocultes solo porque no quepa en la pantalla.  Esto no se debería decidir únicamente teniendo en cuenta el tamaño de la pantalla, sino que habría que pensar en lo que le interesaría leer al usuario.  Por ejemplo, eliminar el recuento de polen de la previsión del tiempo podría ser un tema serio para las personas alérgicas en primavera, que necesitan esta información para saber si pueden salir o no.




