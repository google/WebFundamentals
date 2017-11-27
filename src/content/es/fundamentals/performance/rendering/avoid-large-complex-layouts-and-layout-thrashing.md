project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: El diseño es el aspecto a través del cual el navegador descifra la información geométrica de los elementos: su tamaño y ubicación en la página. Cada elemento posee información explícita o implícita sobre el tamaño, según la CSS empleada, el contenido del elemento o un elemento principal. El proceso se conoce como "diseño" en Chrome.

# Evita los diseños grandes y complejos, y la paginación excesiva de diseños {: .page-title }

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

{% include "web/_shared/contributors/paullewis.html" %}

El diseño es el aspecto a través del cual el navegador descifra la información geométrica de los 
elementos: su tamaño y ubicación en la página. Cada elemento posee información 
explícita o implícita sobre el tamaño, según la CSS empleada, el 
contenido del elemento o un elemento principal. El proceso se conoce como “diseño” 
en Chrome, Opera, Safari e Internet Explorer. En Firefox, se denomina 
“Reprocesamiento”, aunque el proceso es el mismo.

Casi al igual que en el caso de los cálculos de estilo, las inquietudes inmediatas relacionadas con los costos de diseño son las siguientes:

1. la cantidad de elementos que requieren diseño;
2. la complejidad de esos diseños.

### TL;DR {: .hide-from-toc }

* El diseño generalmente se orienta a todo el documento.
* La cantidad de elementos del DOM afectará el rendimiento; por ello, debes evitar la activación del diseño siempre que sea posible.
* Evalúa el rendimiento del modelo de diseño. El nuevo Flexbox generalmente es más rápido que los modelos Flexbox anteriores o los modelos de diseño flotantes.
* Evita los diseños sincrónicos forzados y la paginación excesiva de diseños; lee los valores de estilo y realiza cambios de estilo.

## Evita el diseño siempre que sea posible

Cuando modificas los estilos, el navegador verifica si para alguno de los cambios es necesario calcular el diseño y si se debe actualizar el árbol de representación. Para todos los cambios en las “propiedades geométricas”, como el ancho, la altura, la sección izquierda o la parte superior, se requiere diseño.


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


**El diseño generalmente se aplica a todo el documento.** Si tienes muchos elementos, te tomará más tiempo descifrar las ubicaciones y las dimensiones de todos ellos.

Si no es posible evitar el diseño, la clave es, nuevamente, usar Chrome DevTools para ver cuánto tiempo tarda y determinar si el diseño es la causa del cuello de botella. Primero, abre DevTools, dirígete a la pestaña Timeline, presiona el botón Record e interactúa con tu sitio. Cuando dejes de grabar, verás un desglose del rendimiento de tu sitio:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/big-layout.jpg" alt="Visualización de tiempo prolongado en Layout a través de DevTools" />

Si analizamos el fotograma del ejemplo anterior, veremos que más de 20 ms se destinan al diseño interior, un valor demasiado elevado si necesitamos 16 ms para que en una animación aparezca un fotograma en la pantalla. También podrás ver que DevTools te indicará el tamaño del árbol (1618 elementos en este caso) y la cantidad de nodos que necesitaban diseño.

Note: ¿Deseas acceder a una lista completa de las propiedades de la CSS que activan el diseño, la pintura o la composición? Consulta [Desencadenadores de CSS](https://csstriggers.com).

## Usa flexbox en lugar de modelos de diseño anteriores

En la Web existe una amplia variedad de modelos de diseño, y algunos son más compatibles que otros. El modelo de diseño de CSS más antiguo nos permite posicionar los elementos en la pantalla de forma relativa o absoluta, o mediante elementos flotantes.

En la captura de pantalla que se muestra a continuación, se presenta la exigencia de diseño cuando se usan elementos flotantes en 1300 cuadros. Es cierto que este es un ejemplo forzado, ya que en la mayoría de las aplicaciones se usarían diferentes medios para posicionar los elementos.

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-float.jpg" alt="Uso de elementos flotantes para el diseño" />

Si actualizamos el ejemplo para usar Flexbox, una adición más reciente a la plataforma web, podemos obtener una imagen diferente:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-flex.jpg" alt="Uso de Flexbox para el diseño" />

Ahora destinamos mucho menos tiempo (3,5 ms en comparación con 14 ms en este caso) al diseño para la _misma cantidad de elementos_ y la misma apariencia visual. Es importante recordar que, en algunos contextos, tal vez no puedas seleccionar Flexbox, ya que es [mucho menos compatible que los diseños flotantes](http://caniuse.com/#search=flexbox). Sin embargo, siempre que sea posible debes por lo menos investigar el impacto del modelo de diseño en tu rendimiento y elegir el que minimice la exigencia de ejecución.

Cualquiera sea el caso, independientemente de que elijas Flexbox o no, **deberás de todos modos tratar de evitar activar todo el diseño junto** durante los puntos de alta exigencia de tu aplicación.

## Evita el diseño sincrónico forzado

El envío de un fotograma a la pantalla se realiza en este orden:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/frame.jpg" alt="Uso de Flexbox para el diseño" />

Primero se ejecuta JavaScript, _luego_ se realizan los cálculos de estilo y _finalmente_ se aplica el diseño. No obstante, es posible hacer que un navegador realice por la fuerza el diseño de forma anticipada con JavaScript. Esto se denomina **diseño sincrónico forzado**.

Lo primero que se debe tener en cuenta es que, conforme JavaScript se ejecuta, puedes acceder a todos los valores de diseño del fotograma anterior para realizar consultas. Por lo tanto, si deseas definir la altura de un elemento (supongamos que es un “cuadro”) al inicio del fotograma, puedes escribir un código como el siguiente:


    // Schedule our function to run at the start of the frame.
    requestAnimationFrame(logBoxHeight);

    function logBoxHeight() {
      // Gets the height of the box in pixels and logs it out.
      console.log(box.offsetHeight);
    }


Pueden surgir problemas si cambiaste los estilos del cuadro _antes_ de averiguar su altura:


    function logBoxHeight() {

      box.classList.add('super-big');

      // Gets the height of the box in pixels
      // and logs it out.
      console.log(box.offsetHeight);
    }


Ahora bien, para poder responder la duda respecto de la altura, el navegador _primero_ debe aplicar el cambio de estilo (debido a la adición de la clase `super-big`) y _luego_ ejecutar el diseño. Solo de este modo se podrá mostrar la altura correcta. Este es un trabajo innecesario y, potencialmente, trabajoso.

Por este motivo, siempre debes agrupar las lecturas de estilo y ejecutarlas primero (cuando el navegador puede usar los valores de diseño del fotograma anterior) y, luego, realizar las escrituras necesarias:

Si se lo haces correctamente, la función anterior debería verse de la siguiente manera:


    function logBoxHeight() {
      // Gets the height of the box in pixels
      // and logs it out.
      console.log(box.offsetHeight);

      box.classList.add('super-big');
    }


En la mayoría de los casos, no debería ser necesario aplicar estilos y después realizar consultas de valores; debería bastar con los valores del último fotograma. La ejecución de los cálculos de estilo y el diseño de forma sincrónica, y antes de lo que se esperaría para el navegador, supone posibles cuellos de botella y no es algo que normalmente te convendría hacer.

##  Evita la paginación excesiva de diseños
Existe una forma de complicar incluso más la creación de diseños sincrónicos forzados: _crear muchos diseños en una sucesión rápida_. Observa el siguiente código:


    function resizeAllParagraphsToMatchBlockWidth() {

      // Puts the browser into a read-write-read-write cycle.
      for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.width = box.offsetWidth + 'px';
      }
    }


Este código se repite en un grupo de párrafos y establece el ancho del párrafo para que coincida con el ancho de un elemento llamado “box”. Si bien parece inofensivo, el problema es que en cada repetición del bucle se lee un valor de estilo (`box.offsetWidth`) y, luego, inmediatamente, se usa para actualizar el ancho de un párrafo (`paragraphs[i].style.width`). En la próxima repetición del bucle, el navegador debe tener en cuenta el hecho de que los estilos cambiaron desde que se solicitó `offsetWidth` por última vez (en la iteración anterior), y debe aplicar los cambios de estilo y ejecutar el diseño. Esto sucederá en _cada una de las iteraciones_.

La solución para este ejemplo consiste en, nuevamente, _leer_ y luego _escribir_ los valores:


    // Read.
    var width = box.offsetWidth;

    function resizeAllParagraphsToMatchBlockWidth() {
      for (var i = 0; i < paragraphs.length; i++) {
        // Now write.
        paragraphs[i].style.width = width + 'px';
      }
    }


Si quieres garantizar la seguridad, debes visitar [FastDOM](https://github.com/wilsonpage/fastdom), una herramienta que agrupa automáticamente las lecturas y escrituras, y que te permite evitar la activación de diseños sincrónicos forzados o paginaciones excesivas de diseños de forma accidental.


{# wf_devsite_translation #}
