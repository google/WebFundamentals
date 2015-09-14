---
title: "Evite los diseños grandes y complejos, y la hiperpaginación de diseños"
description: "El diseño es la parte donde el navegador descifra la información geométrica de los elementos: su tamaño y ubicación en la página. Cada elemento posee información explícita o implícita sobre el tamaño, según la CSS (Hoja de estilos en cascada) que se utilizó, los contenidos del elemento o un elemento principal. Este proceso se denomina Diseño en los navegadores Blink, WebKit e Internet Explorer. En los navegadores basados en Gecko, como Firefox, esto se denomina Redistribución, pero los procesos, en realidad, son los mismos."
updated_on: 2015-03-20
translation_priority: 0
notes:
  tree:
    - "Internamente, en el navegador, hay un árbol de representaciones que se crea a partir del DOM (Modelo de objetos del documento) y que es una representación de todos los elementos que se deben dibujar en la pantalla del dispositivo. Allí se incluye toda la información visual sobre los elementos: colores, dimensiones, ubicación, etc. Sin embargo, si un elemento posee el estilo display: none, este no se incluirá en el árbol de representación. De manera similar, si un elemento posee un seudoelemento (:after, :before), este no aparecerá en el DOM, pero existirá en el árbol de representación."
  csstriggers:
    - "¿Desea obtener una lista definitiva de las propiedades de la CSS que desencadenan el diseño, la pintura o la composición? Consulte <a href='http://csstriggers.com/''>Desencadenadores de CSS</a>."

key-takeaways:
  - "El diseño generalmente se aplica en todo el documento."
  - "La cantidad de elementos del DOM afectará al rendimiento; por eso, debe evitar el desencadenamiento de diseño siempre que sea posible."
  - "Evalúe el rendimiento del modelo de diseño: los nuevos modelos Flexbox generalmente son más rápidos que los modelos Flexbox anteriores o que los modelos de diseño flotantes."
  - "Evite los diseños sincrónicos forzados y la hiperpaginación de diseños; lea los valores de estilo y luego realice los cambios en el estilo."
---
<p class="intro">
  El diseño es la parte donde el navegador descifra la información geométrica de los elementos: su tamaño y ubicación en la página. Cada elemento posee información explícita o implícita sobre el tamaño, según la CSS (Hoja de estilos en cascada) que se utilizó, los contenidos del elemento o un elemento principal. El proceso se denomina Diseño en Chrome, Opera, Safari e Internet Explorer. En Firefox, se denomina Redistribución, pero el proceso, en realidad, es el mismo.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

De modo similar a los cálculos de estilo, las inquietudes inmediatas relacionadas con los costos de diseño son las siguientes:

1. La cantidad de elementos que requieren diseño.
2. La complejidad de esos diseños.

## Evite el diseño siempre que sea posible

Cuando modifica los estilos, el navegador verifica si alguno de los cambios requiere que se calcule el diseño y si se debe actualizar el árbol de representación. Todos los cambios en las “propiedades geométricas” (como los anchos, las alturas, los lados izquierdos o las partes superiores) requieren diseño.

{% highlight css %}
.box {
  width: 20px;
  height: 20px;
}

/**
 * Changing width and height
 * triggers layout.
 */
.box--expanded {
  width: 200px;
  height: 350px;
}
{% endhighlight %}

**El diseño casi siempre se aplica a todo el documento.** Si tiene muchos elementos, le tomará más tiempo descifrar las ubicaciones y las dimensiones de todos ellos.

Si no es posible evitar el diseño, la clave es, nuevamente, utilizar DevTools de Chrome para ver cuánto tiempo se demora y determinar si el diseño es la causa del cuello de botella. En primer lugar, abra DevTools, vaya a la pestaña Timeline, presione Record e interactúe con el sitio. Cuando haya dejado de grabar, verá un desglose del rendimiento de su sitio:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/big-layout.jpg" class="g--centered" alt="DevTools showing a long time in Layout" />

Si analizamos el marco del ejemplo anterior, vemos que más de 20 ms se destinan al diseño interior, un valor que es demasiado elevado si necesitamos 16 ms para que en una animación aparezca un marco en la pantalla. También podrá ver que DevTools le indicará el tamaño del árbol (1.618 elementos en este caso) y cuántos nodos necesitaban diseño.

{% include shared/remember.liquid title="Note" list=page.notes.csstriggers %}

## Uso de Flexbox sobre los modelos de diseño anteriores
En la web, existe una amplia variedad de modelos de diseño, y algunos son más compatibles que otros. El modelo de diseño de CSS más antiguo le permite posicionar los elementos en la pantalla de forma relativa o absoluta, o mediante elementos flotantes.

En la captura de pantalla que se muestra a continuación, se presenta el costo del diseño si se utiliza el diseño flotante en 1.300 cuadros. Es cierto que este es un ejemplo forzado, ya que en la mayoría de las aplicaciones se utilizarán diferentes medios para posicionar los elementos.

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-float.jpg" class="g--centered" alt="Using floats as layout" />

Si actualizamos el ejemplo para utilizar Flexbox, una adición más reciente a la plataforma web, obtenemos una imagen diferente:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-flex.jpg" class="g--centered" alt="Using flexbox as layout" />

Ahora, destinamos mucho menos tiempo (3,5 ms en comparación con 14 ms en este caso) al diseño para la _misma cantidad de elementos_ y la misma apariencia visual. Es importante recordar que, en algunos contextos, tal vez no pueda seleccionar Flexbox, ya que es [mucho menos compatible que los diseños flotantes](http://caniuse.com/#search=flexbox). Sin embargo, siempre que sea posible debe, al menos, investigar el impacto del modelo de diseño en su rendimiento y elegir el que minimice el costo de ejecutarlo.

Cualquiera sea el caso, independientemente de si elige Flexbox o no, de todos modos debe **probar y evitar desencadenar todo el diseño junto** durante los puntos de presión alta de su aplicación.

## Evite los diseños sincrónicos forzados
El envío de un marco a la pantalla se realiza en este orden:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/frame.jpg" class="g--centered" alt="Using flexbox as layout" />

En primer lugar, se ejecuta JavaScript, _luego_ se realizan los cálculos de estilo y _luego_ se aplica el diseño. Sin embargo, es posible forzar a un navegador para que realice el diseño antes con JavaScript. Esto se denomina **diseño sincrónico forzado**.

Lo primero que se debe tener en cuenta es que, a medida que JavaScript se ejecuta, usted puede acceder a todos los valores de diseño anteriores del marco anterior para realizar consultas. Por consiguiente, si desea definir la altura de un elemento (supongamos que es un “cuadro”) al inicio del marco, puede escribir un código como el siguiente:

{% highlight javascript %}
// Schedule our function to run at the start of the frame.
requestAnimationFrame(logBoxHeight);

function logBoxHeight() {
  // Gets the height of the box in pixels and logs it out.
  console.log(box.offsetHeight);
}
{% endhighlight %}

Pueden surgir problemas si cambió los estilos del cuadro _antes_ de averiguar su altura:

{% highlight javascript %}
function logBoxHeight() {

  box.classList.add('super-big');

  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);
}
{% endhighlight %}

Ahora bien, para poder responder la pregunta de la altura, el navegador _primero_ debe aplicar el cambio de estilo (debido a la adición de la clase `super-big`) y, _luego_, ejecutar el diseño. Solo de este modo se podrá obtener la altura correcta. Este es un trabajo innecesario y, probablemente, costoso.

Debido a esto, siempre debe agrupar las lecturas de estilo y ejecutarlas primero (cuando el navegador puede utilizar los valores de diseño del marco anterior) y, luego, realizar las escrituras necesarias:

Si se lo hace correctamente, la función anterior debería ser de la siguiente manera:

{% highlight javascript %}
function logBoxHeight() {
  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);

  box.classList.add('super-big');
}
{% endhighlight %}

En la mayoría de los casos, no debería ser necesario aplicar estilos y después realizar consultas sobre los valores; debería ser suficiente usar los valores del último marco. La ejecución de los cálculos de estilo y el diseño de forma sincrónica y antes de lo que el navegador desearía son posibles cuellos de botella, y no algo que normalmente desearía hacer.

## Evite la hiperpaginación de diseños
Existe una forma de complicar incluso más la creación de diseños sincrónicos forzados: _crear muchos diseños en una sucesión rápida_. Observe este código:

{% highlight javascript %}
function resizeAllParagraphsToMatchBlockWidth() {

  // Puts the browser into a read-write-read-write cycle.
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + 'px';
  }
}
{% endhighlight %}

Este código se repite en un grupo de párrafos y, a través de él, se determina el ancho del párrafo para que coincida con el ancho de un elemento llamado “cuadro”. Esto parece inofensivo, pero el problema es que en cada repetición del bucle se lee un valor de estilo (`box.offsetWidth`) y, luego, inmediatamente, se lo utiliza para actualizar el ancho de un párrafo (`paragraphs[i].style.width`). En la próxima repetición del bucle, el navegador debe tener en cuenta el hecho de que los estilos cambiaron desde que se solicitó `offsetWidth` por última vez (en la repetición anterior) y debe aplicar los cambios de estilo, y ejecutar el diseño. Esto sucederá en _cada una de las repeticiones_.

La solución para este ejemplo consiste en, nuevamente, _leer_ y luego _escribir_ los valores:

{% highlight javascript %}
// Read.
var width = box.offsetWidth;

function resizeAllParagraphsToMatchBlockWidth() {
  for (var i = 0; i < paragraphs.length; i++) {
    // Now write.
    paragraphs[i].style.width = width + 'px';
  }
}
{% endhighlight %}

Si desea garantizar la seguridad, debe visitar [FastDOM](https://github.com/wilsonpage/fastdom), una herramienta que agrupa automáticamente las lecturas y las escrituras en su nombre, y que le permite evitar que se desencadenen diseños sincrónicos forzados o hiperpaginaciones de diseños de forma accidental.


