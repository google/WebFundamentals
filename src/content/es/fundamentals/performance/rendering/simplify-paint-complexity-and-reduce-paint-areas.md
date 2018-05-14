project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La pintura es el proceso de rellenar los píxeles que, finalmente, se convierten en una composición en las pantallas de los usuarios. A menudo, es la tarea del proceso que más tiempo se ejecuta, y la que se debe evitar siempre que sea posible.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

# Simplifica la complejidad de la pintura y reduce las áreas de pintura {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

La pintura es el proceso de rellenar los píxeles que, finalmente, se convierten en una composición en las
 pantallas de los usuarios. A menudo, es la tarea del proceso que más tiempo se 
ejecuta, y la que se debe evitar siempre que sea posible.

### TL;DR {: .hide-from-toc } 

* Si se cambia alguna propiedad que no sea transforms u opacity, siempre se desencadena la función de pintura.
* La pintura es, generalmente, la parte más costosa de la canalización de píxeles; evítala siempre que sea posible.
* Reduce las áreas de pintura mediante la promoción de las capas y la orquestación de las animaciones.
* Utiliza el generador de perfiles de pintura de Chrome DevTools para evaluar la complejidad y el costo de la pintura; reduce su uso siempre que sea posible.

## Activación de diseño y pintura

Si activas un diseño, _siempre activarás la pintura_, ya que si se modifica la geometría de un elemento sus píxeles deberán corregirse.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame.jpg"  alt="Canalización de píxeles completa.">

También puedes activar la pintura si modificas las propiedades no geométricas, como los fondos, el color del texto o las sombras. En esos casos, el diseño no será necesario y la canalización tendrá el siguiente aspecto:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame-no-layout.jpg"  alt="Canalización de píxeles sin diseño.">

## Usa Chrome DevTools para identificar rápidamente los cuellos de botella de pintura

<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles.jpg" alt="Opción “Show paint rectangles” en DevTools.">
  </figure>
</div>

Puedes usar Chrome DevTools para identificar rápidamente las áreas que se pintan. Ingresa a DevTools y presiona la tecla Escape del teclado. Accede a la pestaña Rendering, en el panel que aparece, y selecciona “Show paint rectangles”.

<div style="clear:both;"></div>

Con esta opción activada, en Chrome la pantalla parpadeará con color verde cada vez que se aplique pintura. Si ves que toda la pantalla parpadea con color verde o que esto sucede en algunas áreas de la pantalla que según tu parecer no deberían pintarse, te recomendamos investigar un poco más sobre el tema.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles-green.jpg"  alt="Página parpadeando con color verde cada vez que se aplica pintura.">


<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-toggle.jpg" alt="Activación y desactivación de la generación de perfiles de pintura en Chrome DevTools.">
  </figure>
</div>

Existe una opción en Timeline de Chrome DevTools con la que podrás obtener más información: un generador de perfiles de pintura. Para habilitarlo, accede a Timeline y marca la casilla “Paint” que aparece en la parte superior. Es importante que _solo esta función esté activada cuando se intenta crear un perfil relacionado con la pintura_, ya que esta función posee una sobrecarga y esto distorsionará la creación de perfiles de rendimiento. Esta función se puede aprovechar mejor si deseas obtener más información sobre lo que se está pintando exactamente.

<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-button.jpg" alt="Botón para iniciar el generador de perfiles de pintura." class="screenshot">
  </figure>
</div>

Desde aquí, ahora podrás ejecutar una grabación de Timeline, y los registros de pintura serán más detallados. Si haces clic en el registro de pintura de un fotograma, podrás tener acceso al generador de perfiles de pintura de dicho fotograma:

<div style="clear:both;"></div>

Si haces clic en el generador de perfiles de pintura, aparecerá una vista en la que podrás ver lo que se pintó, el tiempo que esto llevó y las llamadas de pintura individuales que se necesitaron:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler.jpg"  alt="Paint Profiler de Chrome DevTools.">

Este generador de perfiles te permite conocer tanto el área como la complejidad (que es, en realidad, el tiempo que tarda en aplicarse la pintura). Puedes consultar estos dos aspectos para solucionar el problema si no puedes evitar la pintura.

## Promueve elementos que se muevan o se atenúen

La pintura no siempre se realiza en una sola imagen de la memoria. De hecho, es posible que el navegador aplique pintura en varias imágenes, o capas del compositor, si es necesario.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/layers.jpg"  alt="Representación de las capas del compositor.">

El beneficio de este enfoque es que los elementos que se vuelven a pintar regularmente o se mueven en la pantalla mediante transforms pueden manipularse sin afectar a los demás elementos. Lo mismo sucede con los paquetes de edición, como Sketch, GIMP o Photoshop, en los cuales cada capa se puede manipular y componer sobre el resto de las capas para crear la imagen final.

La mejor forma de crear una capa nueva es a través de la propiedad `will-change` de CSS. Esto funciona en Chrome, Opera y Firefox y, con un valor de `transform`, se creará una capa nueva del compositor:


    .moving-element {
      will-change: transform;
    }


En el caso de los navegadores que no son compatibles con `will-change`, pero se benefician con la creación de capas, como Safari y Mobile Safari, debes usar correcta o incorrectamente una transformación 3D para crear, de manera forzosa, una capa nueva:


    .moving-element {
      transform: translateZ(0);
    }


Sin embargo, debes tener suficiente precaución para no crear demasiadas capas, ya que para cada una se requiere memoria y administración. Podrás encontrar más información en la sección [Limítate solo a las propiedades del compositor y administra el recuento de capas](stick-to-compositor-only-properties-and-manage-layer-count).

Si promoviste un elemento a una capa nueva, usa DevTools para confirmar que al hacerlo obtuviste un beneficio de rendimiento. **No promuevas elementos sin generar perfiles.**

## Reduce las áreas de pintura

En algunos casos, no obstante, aunque se promuevan los elementos será necesario realizar trabajos de pintura de todos modos. Un gran desafío, en términos de problemas relacionados con la pintura, es que los navegadores unen dos áreas que necesitan pintura; esto puede hacer que se vuelva a pintar toda la pantalla. Entonces, por ejemplo, si tienes un encabezado fijo en la parte superior de la página y un elemento que se está pintando en la parte inferior de la pantalla, es posible que se pinte nuevamente toda la pantalla.

Note: Los elementos de las pantallas con valores altos de PPP (Puntos por pulgada) que están en una posición fija se promueven automáticamente a su propia capa del compositor. Esto no es así en los dispositivos con valores bajos de PPP, debido a que la promoción modifica la representación de los textos desde subpíxeles a escala de grises, y la promoción de las capas debe hacerse manualmente.

Reducir las áreas de pintura suele implicar orquestar tus animaciones y transiciones para que no se superpongan demasiado, o encontrar estrategias para evitar animar ciertas partes de la página.

## Simplificación de la complejidad de la pintura

<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/profiler-chart.jpg" alt="Tiempo que tarda en pintarse parte de la pantalla.">
  </figure>
</div>

Cuando se trata de la pintura, algunas tareas son más costosas que otras. Por ejemplo, todo elemento que incluya un desenfoque (como una sombra, por ejemplo) tardará más en pintarse que, por ejemplo, un cuadro rojo en dibujarse. Sin embargo, en términos de CSS, esto no siempre es evidente: `background: red;` y `box-shadow: 0, 4px, 4px, rgba(0,0,0,0.5);` no necesariamente se ven como si tuvieran características de rendimiento muy diferentes, pero de hecho las tienen.

El generador de perfiles de pintura mencionado anteriormente te permite determinar si necesitas buscar otras formas de lograr los efectos. Pregúntate si es posible usar un conjunto de estilos menos exigente o medios alternativos para lograr el resultado final.

Siempre que sea posible, evita aplicar pintura durante las animaciones en particular, ya que los **10 ms** que tienes por fotograma no suelen bastar para finalizar el trabajo de pintura, en particular en los dispositivos móviles.


{# wf_devsite_translation #}
