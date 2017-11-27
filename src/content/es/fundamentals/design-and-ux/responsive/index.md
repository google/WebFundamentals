project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La mayoría de la web no está optimizada para esas experiencias multidispositivo. Aprende los aspectos básicos para que tu sitio funcione en dispositivos móviles, escritorios o cualquier cosa con una pantalla.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-29 #}

# Aspectos básicos del diseño web adaptable {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

El uso de dispositivos móviles para navegar en la web está creciendo a un ritmo astronómico, 
pero desafortunadamente la mayoría de la web no está optimizada para esos dispositivos móviles.
A menudo, la mayoría de los dispositivos están restringidos por el tamaño de visualización y requieren de un enfoque 
diferente del modo en que se muestra la disposición del contenido en la pantalla.

Existe una multitud de diferentes tamaños de pantalla en los teléfonos, "tabléfonos",
tablets, escritorios, consolas de juegos, TV e incluso wearables.  Los tamaños de pantalla están siempre
cambiando, de modo que es importante que tu sitio se pueda adaptar a cualquier tamaño de pantalla,
hoy o en el futuro.

<video autoplay muted loop controls>
  <source src="videos/resize.webm" type="video/webm">
  <source src="videos/resize.mp4" type="video/mp4">
</video>

Diseño web adaptable, originalmente definido por [Ethan Marcotte en A List
Apart](http://alistapart.com/article/responsive-web-design/), responde a las
necesidades de los usuarios y los dispositivos que estén usando.  Los cambios de diseño según
el tamaño y las capacidades del dispositivo.  Por ejemplo, en un teléfono los usuarios deberían
ver el contenido que se muestra en una única columna; una tablet puede mostrar el mismo contenido
en dos columnas.

{% include "web/_shared/udacity/ud893.html" %}

## Configurar la ventana de visualización {: #set-the-viewport }

Las páginas optimizadas para diferentes dispositivos deben incluir la etiqueta meta viewport en el encabezado del documento.  Una etiqueta meta viewport da al navegador las instrucciones sobre cómo controlar las dimensiones y el ajuste a escala de la página.

### TL;DR {: .hide-from-toc }
- Usa la etiqueta meta viewport para controlar el ancho y el ajuste de la ventana de visualización del navegador.
- Incluye `width=device-width` para hacer coincidir el ancho de la pantalla en píxeles independientes del dispositivo.
- Incluye `initial-scale=1` para establecer una relación de 1:1 entre los píxeles CSS y los píxeles independientes del dispositivo.
- Asegúrate de que se pueda acceder a tu página sin inhabilitar los ajustes del usuario.


Para ofrecer la mejor experiencia posible, los navegadores de dispositivos móviles muestran
la página con el ancho de una pantalla de escritorio (por lo general, alrededor de 980px, aunque esto varía entre
dispositivos) y luego se intenta mejorar el aspecto del contenido aumentando los tamaños de las
fuentes y modificando la escala del contenido para que se ajuste a la pantalla.  Esto significa que los tamaños de fuente pueden parecer inconsistentes para los usuarios, quienes tal vez tengan que presionar dos veces o
pellizcar para acercar para ver e interactuar con el contenido.


    <meta name="viewport" content="width=device-width, initial-scale=1">
    


El uso del valor de meta viewport `width=device-width` indica a la página que debe hacer coincidir
el ancho de la pantalla en píxeles independientes del dispositivo. Esto permite que la página realice el reprocesamiento
del contenido para adaptarlo a diferentes tamaños de pantalla, así se represente en un teléfono
móvil pequeño o un monitor de escritorio grande.

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-no.html">
  <figure>
    <img src="imgs/no-vp.png" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Página sin una ventana de visualización definida">
    <figcaption>
      Página sin una ventana de visualización definida
     </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp.html">
  <figure>
    <img src="imgs/vp.png" srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Página con una ventana de visualización definida">
    <figcaption>
      Página con una ventana de visualización definida
     </figcaption>
  </figure>
  </a>
</div>

Algunos navegadores mantienen el ancho fijo de la página al girar en el modo
de paisaje y hacen zoom en lugar de procesarlo de nuevo para cubrir la pantalla. Al agregar el atributo
`initial-scale=1`, se indica a los navegadores que establezcan una relación 1:1 entre los píxeles CSS
y los píxeles independientes del dispositivo independientemente de la orientación de este y
permite que la página aproveche todo el ancho del modo horizontal.


Note: Para asegurarse de que los navegadores anteriores pueden analizar de manera apropiada los atributos, usa una coma para separar los atributos.

### Garantiza una ventana de visualización accesible

Además de configurar un `initial-scale`, también puedes fijar los siguientes atributos en la ventana de visualización:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Una vez finalizada la configuración, estos pueden impedir que el usuario haga zoom en la ventana de visualización, lo cual podría ocasionar problemas de accesibilidad.


## Ajusta el contenido a la ventana de visualización

Los usuarios de equipos de escritorio y dispositivos móviles están acostumbrados a desplazarse verticalmente por los sitios web, pero no de modo horizontal. La experiencia del usuario empeora si obligas al usuario a desplazarse horizontalmente o a alejarse para ver la página completa.

### TL;DR {: .hide-from-toc }
- No uses elementos grandes con un ancho fijo.
- El contenido no tiene que depender del ancho de una ventana de visualización en particular para mostrarse correctamente.
- Usa consultas de medios de CSS para aplicar distintos estilos para pantallas pequeñas y grandes.

Cuando se desarrolla un sitio móvil con una etiqueta `meta viewport`, fácilmente se puede
crear de manera accidental en una página contenido que no se adecue muy bien a la ventana de visualización
especificada. Por ejemplo, una imagen que se muestra en un ancho superior al
de la ventana de visualización puede hacer que esta última se desplace de modo horizontal. Debes ajustar este
contenido para que se adecue al ancho de la ventana de visualización, de modo que el usuario no necesite
desplazarse horizontalmente.

Debido a que las dimensiones de la pantalla y el ancho en píxeles de CSS varían ampliamente entre dispositivos
(por ejemplo, entre teléfonos y tablets e incluso entre diferentes teléfonos), el contenido
no tiene que depender de una ventana de visualización en particular para mostrarse correctamente.

Al configurar anchos absolutos en CSS para los elementos de página (como en el siguiente ejemplo),
el elemento `div` puede resultar demasiado ancho para la ventana de visualización en un dispositivo más estrecho (por ejemplo,
un dispositivo con un ancho de 320 píxeles CSS, como un iPhone). Como alternativa, considera
el uso de valores de ancho relativo, como `width: 100%`.  De modo similar, ten cuidado con el uso
de grandes valores absolutos de posicionamiento; pueden hacer que el elemento quede fuera de la
ventana de visualización en pantallas pequeñas.  

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x" alt="Página con un elemento de 344px de ancho fijo en un iPhone.">
    <figcaption>
      Página con un elemento de 344px de ancho fijo en un iPhone
    </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x" alt="Página con un elemento de 344px de ancho fijo en un Nexus 5.">
    <figcaption>
      Página con un elemento de 344px de ancho fijo en un Nexus 5
    </figcaption>
  </figure>
  </a>
</div>
<div class="clearfix"></div>
         
## Usa las consultas de medios en CSS para una mayor receptividad {: #css-media-queries }  

Las consultas de medios son filtros simples que se pueden aplicar a estilos de CSS. Facilitan 
el cambio de estilos según las características del dispositivo que representa
el contenido, como el tipo de pantalla, el ancho, la altura, la orientación e incluso
la resolución.


### TL;DR {: .hide-from-toc }
- Usa las consultas de medios para aplicar estilos según las características del dispositivo.
- Usa `min-width` en lugar de `min-device-width` para asegurar la experiencia más amplia.
- Usa tamaños relativos para elementos para evitar la ruptura del diseño.

Por ejemplo, puedes ubicar todos los estilos necesarios para la impresión
dentro de una consulta de medios de impresión:


    <link rel="stylesheet" href="print.css" media="print">
    

Además del uso del atributo `media` en el vínculo de la hoja de estilo, hay dos
modos de aplicar consultas de medios que se pueden incorporar en un archivo CSS: `@media`
y `@import`.  Por razones de rendimiento, se recomienda cualquiera de los dos primeros métodos
antes que la sintaxis de `@import`
(consulta [Evitar importaciones CSS](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations)).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

La lógica que se aplica a las consultas de medios no es mutuamente exclusiva y se aplica cualquier filtro que
cumpla los criterios del bloque CSS resultante usando las reglas de prioridad
estándar en CSS.

### Aplica consultas de medios según la ventana de visualización

Las consultas de medios nos permiten crear una experiencia receptiva cuando
se aplican estilos específicos en pantallas pequeñas, grandes y de cualquier tamaño intermedio.  La sintaxis de la consulta
de medios permite crear reglas que se pueden aplicar según
las características del dispositivo.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

Aunque hay varios elementos diferentes por los que podemos consultar, los que se usan
con mayor frecuencia para el diseño web adaptable son `min-width`, `max-width`, `min-height` y
`max-height`.


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Parámetros</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
      <td data-th="Result">Las reglas se aplican para cualquier ancho del navegador que supere el valor definido en la consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
      <td data-th="Result">Las reglas se aplican para cualquier ancho del navegador que sea inferior al valor definido en la consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
      <td data-th="Result">Las reglas se aplican para cualquier altura del navegador que supere el valor definido en la consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
      <td data-th="Result">Las reglas se aplican para cualquier altura del navegador que sea inferior al valor definido en la consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=portrait</code></td>
      <td data-th="Result">Reglas que se aplican a cualquier navegador de altura inferior o igual al ancho.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=landscape</code></td>
      <td data-th="Result">Reglas que se aplican a cualquier navegador de ancho inferior a la altura.</td>
    </tr>
  </tbody>
</table>

Veamos un ejemplo:

<figure>
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media-queries.html">
    <img src="imgs/mq.png" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Vista previa de una página usando consultas de medios para cambiar propiedades cuando se modifica el tamaño.">
    <figcaption>
      Vista previa de una página usando consultas de medios para cambiar propiedades cuando se modifica el tamaño.
    </figcaption>
  </a>
</figure>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media-queries.html){: target="_blank" .external }

* Cuando el navegador tenga un tamaño de entre <b>0px</b> y <b>640px</b> de ancho, se aplica `max-640px.css`.
* Cuando el navegador tenga un tamaño de entre <b>500px</b> y <b>600px</b> de ancho, se aplican los estilos de `@media`.
* Cuando el navegador tenga <b>640px de ancho o más</b>, se aplica `min-640px.css`.
* Cuando el navegador tenga un <b>ancho superior a la altura</b>, se aplica `landscape.css`.
* Cuando el navegador tenga una <b>altura superior al ancho</b>, se aplica `portrait.css`.


### Una observación sobre `min-device-width`

También es posible crear consultas basadas en
`min-device-width`, aunque **no se recomienda** esta práctica.

La diferencia es sutil, pero es muy importante: `min-width` se basa en el
tamaño del navegador mientras que `min-device-width` se basa en
el tamaño de la pantalla.  Desafortunadamente, algunos navegadores, como el navegador heredado de
Android no informan correctamente el ancho del dispositivo, informan el tamaño de pantalla en píxeles de dispositivo en vez del ancho esperado de la ventana de visualización.

Además, el uso de `min-device-width` puede evitar que el contenido se adapte a
escritorios u otros dispositivos que permitan que se ajuste el tamaño de las ventanas, ya que la consulta
se basa en el tamaño actual del dispositivo, y no en el tamaño de la ventana del navegador.

### Usa `any-pointer` y `any-hover` para interacciones flexibles

A partir de Chrome 39, tus hojas de estilo pueden escribir selectores que abarcan
múltiples tipos de punteros y comportamientos de desplazamiento. Las funciones de medios `any-pointer` y `any-hover`
son similares a `pointer` y `hover` en el sentido de que te permiten consultar las
capacidades del puntero del usuario. Sin embargo, a diferencia de este último, `any-pointer` y
`any-hover` operan en la unión de todos los dispositivos de puntero en lugar de solo el dispositivo principal
de puntero.

### Usa unidades relativas

Un concepto clave detrás del diseño adaptable es el de fluidez y proporcionalidad en
contraposición a los diseños de ancho fijo.  El uso de unidades relativas en las medidas puede ayudar a
simplificar diseños y a evitar la creación accidental de componentes que son demasiado grandes
para la ventana de visualización.

Por ejemplo, en la configuración del ancho: 100% en un elemento `div` de nivel superior, nos asegura que ocupa el
ancho de la ventana de visualización y de que nunca sea demasiado grande o pequeño para esta.  El elemento
`div` se adapta sin importar si es un iPhone de 320 píxeles, un Blackberry Z10 de 342 píxeles
o un Nexus 5 de 360 píxeles de ancho.

Además, el uso de unidades relativas permite que los navegadores pueden procesar el contenido según
sea el nivel de zoom que apliquen los usuarios, sin necesidad de agregar barras de desplazamiento horizontal a la
página.

<span class="compare-worse">No recomendado</span>: ancho fijo

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">Recomendado</span>: ancho adaptable

    div.fullWidth {
      width: 100%;
    }


## Cómo elegir puntos de interrupción 

No definas los puntos de interrupción según las clases de dispositivos. La definición de puntos de interrupción en dispositivos específicos,
productos, nombres de marca o sistemas operativos que se usan actualmente pueden convertir
un mantenimiento en una pesadilla. En lugar de esto, lo ideal es que el contenido determine cómo
se ajusta el diseño en el elemento contenedor.


### TL;DR {: .hide-from-toc }
- Crea puntos de interrupción basados en el contenido, nunca en dispositivos, productos o marcas en particular.
- Diseña primero para el dispositivo móvil más pequeño, y luego mejora la experiencia cuando un estado mucho más real de pantalla esté disponible.
- Procura que las líneas de texto tengan un máximo de 70 u 80 caracteres.


### Selecciona puntos de interrupción mayores comenzando de a poco y luego ampliando el alcance

<figure class="attempt-right">
  <img src="imgs/weather-1.png" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-1.html">
      La vista previa del pronóstico se muestra en una pantalla pequeña.
    </a>
  </figcaption>
</figure>

Diseña el contenido para que primero se ajuste a un tamaño de pantalla reducido y luego expande la pantalla
hasta que se necesite un punto de interrupción.  Esto te permite optimizar
los puntos de interrupción según el contenido y te permite mantener el menor número posible de puntos de
interrupción.

Ahora vamos a trabajar con el ejemplo que vimos al principio:
el pronóstico del tiempo. El primer paso es que el pronóstico se vea bien en una pantalla
pequeña.

<div style="clear:both;"></div>

<figure class="attempt-right">
  <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Vista previa del pronóstico del tiempo cuando la página se ensancha.">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-1.html">
      Vista previa del pronóstico del tiempo cuando la página se ensancha.
    </a>
  </figcaption>
</figure>

A continuación, cambia el tamaño del navegador hasta que quede demasiado espacio en blanco entre los
elementos y el aspecto del pronóstico simplemente no se vea tan bien.  La decisión es un poco
subjetiva, pero un valor superior a 600 px es sin duda supone un ancho excesivo.

<div style="clear:both;"></div>

Para insertar un punto de interrupción a los 600 píxeles, crea dos hojas de estilo; una para cuando el
navegador tenga un tamaño de 600 píxeles en adelante, y otra para cuando el ancho supere ese tamaño.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-2.html){: target="_blank" .external }

<figure class="attempt-right">
  <img src="imgs/weather-3.png"  srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Vista previa del pronóstico del tiempo diseñada para una pantalla más ancha.">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-2.html">
      Vista previa del pronóstico del tiempo diseñada para una pantalla más ancha.
    </a>
  </figcaption>
</figure>

Por último, refactoriza la CSS.  En este ejemplo, hemos colocado los estilos comunes, como
las fuentes, los íconos, las posiciones básicas o los colores, en `weather.css`.  Los diseños específicos
para pantallas pequeñas se encuentran en `weather-small.css`, mientras que los estilos para pantallas
grandes se encuentran en `weather-large.css`.

<div style="clear:both"></div>


### Toma puntos de interrupción de menor importancia cuando sea necesario

Además de elegir puntos de interrupción mayores cuando el diseño cambie de manera significativa, también
resultará útil aplicar ajustes para cambios de menor importancia.  Por ejemplo, entre los puntos de interrupción
principales, puede resultar útil ajustar los márgenes o el relleno en un elemento,
o bien aumentar el tamaño de la fuente para que esta quede más natural en el diseño.

Comencemos por optimizar el diseño pequeño de pantalla.  En este caso, aumentaremos
la fuente cuando el ancho de la ventana de visualización sea superior a 360 px.  En segundo lugar, cuando haya
suficiente espacio, podemos separar la temperatura más alta y la más baja para que queden en la
misma línea, en lugar de una encima de la otra.  También agrandaremos un poco los íconos del
clima.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-small.css" region_tag="mqsmallbpsm" adjust_indentation="auto" %}
</pre>

<div class="attempt-left">
  <figure>
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Se muestra el aspecto antes de agregar puntos de interrupción menores.">
    <figcaption>
      Se muestra el aspecto antes de agregar puntos de interrupción menores.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="Se muestra el aspecto después de agregar puntos de interrupción menores.">
    <figcaption>
      Se muestra el aspecto después de agregar puntos de interrupción menores.
     </figcaption>
  </figure>
</div>


<div style="clear:both;"></div>


Del mismo modo, para pantallas grandes, lo mejor es limitar el ancho máximo del
panel del pronóstico para que no ocupe todo el ancho de la pantalla.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-large.css" region_tag="mqsmallbplg" adjust_indentation="auto" %}
</pre>

### Optimiza el texto para la lectura

La teoría de la legibilidad clásica sugiere que una columna ideal debe tener entre 70 y 80
caracteres por línea (entre 8 y 10 palabras en inglés). Por lo tanto, considera agregar un punto de interrupción cada vez que el ancho
de un bloque de texto supere 10 palabras aproximadamente.

<div class="attempt-left">
  <figure>
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Se muestra el aspecto antes de agregar puntos de interrupción menores.">
    <figcaption>Se muestra el aspecto antes de agregar puntos de interrupción menores.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Se muestra el aspecto después de agregar puntos de interrupción menores.">
    <figcaption>Se muestra el aspecto después de agregar puntos de interrupción menores.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Observemos con mayor detalle el ejemplo anterior de la entrada de blog.  En pantallas más pequeñas,
la fuente Roboto con tamaño de 1em funciona bien, ya que permite 10 palabras en cada línea. Sin embargo, se necesitará un punto de interrupción en
pantallas más grandes. En este caso, si el ancho del navegador es superior a
575 px, el ancho ideal del contenido será de 550 px.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/reading.html" region_tag="mqreading" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/reading.html){: target="_blank" .external }

### Nunca ocultes el contenido por completo

Ten cuidado cuando elijas qué contenido quieres ocultar o mostrar en función del tamaño de pantalla.
No lo ocultes solo porque no se ajuste a la pantalla.  El tamaño de la pantalla
no es un indicio definitivo de lo que el usuario puede desear.  Por ejemplo,
eliminar el recuento de polen del pronóstico del tiempo podría ser un tema serio
para las personas alérgicas en primavera, que necesitan esta información para saber si
pueden salir o no.

## Ver los puntos de interrupción en consultas de medios en Chrome DevTools {: #devtools }

Una vez que se definan los puntos de interrupción de consultas de medios, querrás ver cómo
se ve tu sitio con ellos. *Puedes* modificar el tamaño de la ventana de tu navegador para activar
los puntos de interrupción, pero existe un mejor modo: Chrome DevTools. Las siguientes dos
capturas de pantalla demuestran el uso de DevTools para ver cómo se ve una página bajo
diferentes puntos de interrupción.

![Ejemplo de la función de consultas de medios de DevTools](imgs/devtools-media-queries-example.png)

Para ver tu página bajo diferentes puntos de interrupción:

[Abrir DevTools](/web/tools/chrome-devtools/#open) y luego activar [Device
Mode](/web/tools/chrome-devtools/device-mode/#toggle).

Usa los
[controles de la ventana de visualización](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#viewport-controls)
para seleccionar **Responsive**, que pone a DevTools en el modo adaptable.

Por último, abre el menú del Device Mode y selecciona
[**Mostrar consultas de medios**](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#media-queries)
para que se muestren los puntos de interrupción como barras coloreadas en tu página.

Haz clic en una de las barras para ver tu página mientras que esa consulta
de medios está activa. Haz clic con el botón secundario en una barra para saltar a la definición de la consulta
de medios. Consulta 
[consultas de medios](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#media-queries)
para obtener más ayuda.


{# wf_devsite_translation #}
