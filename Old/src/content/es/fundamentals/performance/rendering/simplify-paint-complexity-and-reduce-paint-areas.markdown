---
title: "Simplificación de la complejidad de la pintura y reducción de las áreas de pintura"
description: "La pintura es el proceso de rellenar los píxeles que, finalmente, se convierten en una composición en las pantallas de los usuarios. A menudo, es la tarea del proceso que más tiempo se ejecuta, y la que se debe evitar siempre que sea posible."
updated_on: 2015-03-20
translation_priority: 0
notes:
  highdpi:
    - "Los elementos de las pantallas con valores altos de PPP (Puntos por pulgada) que están en una posición fija se promueven automáticamente a su propia capa del compositor. Esto no es así en los dispositivos con valores bajos  de PPP, debido a que la promoción modifica la representación de los textos desde subpíxeles a escala de grises, y la promoción de las capas debe hacerse manualmente."

key-takeaways:
  - "Si se cambia alguna propiedad que no sea transforms u opacity, siempre se desencadena la función de pintura."
  - "La pintura es, generalmente, la parte más costosa de la canalización de píxeles; evítela siempre que sea posible."
  - "Reduzca las áreas de pintura mediante la promoción de las capas y la orquestación de las animaciones."
  - "Utilice el generador de perfiles de pintura de DevTools de Chrome para evaluar la complejidad y el costo de la pintura; reduzca su uso siempre que sea posible."


---
<p class="intro">
  La pintura es el proceso de rellenar los píxeles que, finalmente, se convierten en una composición en las pantallas de los usuarios. A menudo, es la tarea del proceso que más tiempo se ejecuta, y la que se debe evitar siempre que sea posible.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

Si desencadena un diseño, _siempre desencadenará la pintura_, ya que, si se modifica la geometría de un elemento, sus píxeles deberán arreglarse.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame.jpg" class="g--centered" alt="The full pixel pipeline.">

También puede desencadenar la pintura si modifica las propiedades no geométricas, como los fondos, el color del texto o las sombras. En esos casos, el diseño no será necesario y la canalización se verá de la siguiente manera:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame-no-layout.jpg" class="g--centered" alt="The pixel pipeline without layout.">

## Uso de DevTools de Chrome para identificar rápidamente los cuellos de botella de pintura

Puede utilizar DevTools de Chrome para identificar rápidamente las áreas que se están pintando. Vaya a DevTools y presione la tecla Escape del teclado. Acceda a la pestaña Rendering, en el panel que aparece, y seleccione “Show paint rectangles”:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles.jpg" class="g--centered" alt="The show paint rectangles option in DevTools.">

Con esta opción activada, en Chrome, la pantalla parpadeará en color verde cada vez que se aplique pintura. Si ve que toda la pantalla parpadea en color verde o que esto sucede en algunas áreas de la pantalla que considera que no se deberían pintar, le recomendamos que investigue un poco más sobre el tema.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles-green.jpg" class="g--centered" alt="The page flashing green whenever painting occurs.">

Existe una opción en la escala de tiempo de DevTools de Chrome en la que podrá obtener más información: un generador de perfiles de pintura. Para habilitarlo, acceda a Timeline y marque la casilla “Paint” que aparece en la parte superior. Es importante que _solo esta función esté activada cuando se intenta crear un perfil relacionado con la pintura_, ya que esta función posee una sobrecarga y esto distorsionará la creación de perfiles de rendimiento. Esta función se puede aprovechar mejor si desea obtener más información sobre qué se está pintando exactamente.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-toggle.jpg" class="g--centered" alt="The toggle to enable paint profiling in Chrome DevTools.">

Desde aquí, ahora podrá ejecutar una grabación de la escala de tiempo, y los registros de pintura serán más detallados. Si hace clic en el registro de pintura de un marco, ahora podrá tener acceso al Paint Profiler de dicho marco:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-button.jpg" class="g--centered" alt="The button to bring up the paint profiler.">

Si hace clic en Paint Profiler, aparecerá una vista en la que podrá ver qué se pintó, cuánto tiempo se demoró en hacerlo y las llamadas de pintura individuales que se necesitaron:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler.jpg" class="g--centered" alt="Chrome DevTools Paint Profiler.">

Este generador de perfiles le permite conocer tanto el área como la complejidad (que es, en realidad, el tiempo que se demora en pintar). Puede consultar estas dos áreas para solucionar el problema si no puede evitar la pintura.

## Promoción de elementos que se mueven o se atenúan

La pintura no siempre se realiza en una sola imagen de la memoria. De hecho, es posible que el navegador realice pinturas en varias imágenes o capas del compositor, si fuera necesario.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/layers.jpg" class="g--centered" alt="A representation of compositor layers.">

El beneficio de este enfoque es que los elementos que se vuelven a pintar regularmente o que se mueven en la pantalla mediante transforms se pueden manipular sin afectar a los otros elementos. Lo mismo ocurre con los paquetes de arte, como Sketch, GIMP o Photoshop, en los que cada una de las capas se puede manipular y componer sobre el resto de las capas para crear la imagen final.

La mejor forma de crear una capa nueva es mediante el uso de la propiedad `will-change` de CSS. Esto funcionará en Chrome, Opera y Firefox, y, con un valor de `transform`, se creará una capa nueva del compositor:

{% highlight css %}
.moving-element {
  will-change: transform;
}
{% endhighlight %}

En el caso de los navegadores que no son compatibles con `will-change`, pero que se benefician de la creación de capas, como Safari y Mobile Safari, debe utilizar correcta o incorrectamente una transformación 3D para crear, de forma forzada, una capa nueva:

{% highlight css %}
.moving-element {
  transform: translateZ(0);
}
{% endhighlight %}

Sin embargo, se debe tener la precaución de no crear demasiadas capas, ya que cada capa requiere memoria y administración. Podrá encontrar más información en la sección [Limítese solo a las propiedades del compositor y administre el recuento de capas](stick-to-compositor-only-properties-and-manage-layer-count).

Si promovió un elemento a una capa nueva, utilice DevTools para confirmar que, al hacerlo, obtuvo un beneficio de rendimiento. **No promueva elementos sin generar perfiles.**

## Reducción de las áreas de pintura

En algunos casos, no obstante, aunque se promuevan los elementos, aún es necesario realizar trabajos de pintura. Un gran desafío en relación con la pintura es que los navegadores unen dos áreas que necesitan pintura, y el resultado de esto podría ser que se vuelva a pintar toda la pantalla. Entonces, por ejemplo, si posee un encabezado fijo en la parte superior de la página y un elemento que se está pintando en la parte inferior de la pantalla, es posible que se termine pintando nuevamente toda la pantalla.

{% include shared/remember.liquid title="Note" list=page.notes.highdpi %}

Reducir las áreas de pintura suele consistir en orquestrar sus animaciones y transiciones para que no se superpongan demasiado, o en una forma de encontrar estrategias para evitar animar ciertas partes de la página.

## Simplificación de la complejidad de la pintura
Cuando se trata de la pintura, algunas tareas son más costosas que otras. Por ejemplo, todo lo que incluye un desenfoque (como una sombra, por ejemplo) demorará más en pintarse que, supongamos, dibujar un cuadro rojo. Sin embargo, en cuanto a las CSS, esto no siempre es obvio: `background: red;` y `box-shadow: 0, 4px, 4px, rgba(0,0,0,0.5);` no necesariamente se ven como si tuvieran características de rendimiento muy diferentes, pero de hecho las tienen.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/profiler-chart.jpg" class="g--centered" alt="The time taken to paint part of the screen.">

El generador de perfiles de pintura mencionado anteriormente le permite determinar si necesita buscar otras formas de lograr los efectos. Pregúntese si es posible utilizar un conjunto de estilos más económicos o medios alternativos para lograr el resultado final.

Siempre que sea posible, evite aplicar pintura durante las animaciones especialmente, ya que los **10 ms** que tiene por marco no  suelen ser una cantidad de tiempo suficiente como para finalizar el trabajo de pintura, en particular en los dispositivos móviles.


