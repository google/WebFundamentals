project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Los controladores de entrada son una posible causa de problemas de rendimiento en tus apps, ya que pueden bloquear la compleción de los fotogramas y dar lugar a trabajo de diseño adicional e innecesario.

{# wf_updated_on: 2015-10-06 #}
{# wf_published_on: 2015-03-20 #}

# Elimina los efectos de rebote en los controladores de entrada {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Los controladores de entrada son una posible causa de problemas de rendimiento en tus apps, ya que
pueden bloquear la compleción de los fotogramas y dar lugar a trabajo de diseño
adicional e innecesario.

### TL;DR {: .hide-from-toc }

* Evita los controladores de entrada de ejecución prolongada, ya que pueden bloquear el desplazamiento.
* No realices cambios de estilo en los controladores de entrada.
* Evita el efecto de rebote en los controladores. Almacena los valores de los eventos y realiza cambios de estilo en la siguiente callback a requestAnimationFrame.

## Evita los controladores de entrada de larga ejecución

En el caso más rápido posible, cuando un usuario interactúa con la página, la cadena del compositor de la página puede tomar la entrada táctil del usuario y simplemente desplazar el contenido de un lado a otro. Esto no requiere el trabajo de la cadena principal, donde se ejecutan JavaScript, el diseño, los estilos o la pintura.

<img src="images/debounce-your-input-handlers/compositor-scroll.jpg" alt="Desplazamiento ligero, solo el compositor.">

Sin embargo, si dispones un controlador de entrada como `touchstart`, `touchmove` o `touchend`, la cadena del compositor debe esperar que el controlador finalice la ejecución, ya que puedes optar por llamar a `preventDefault()` y evitar que se ejecute el desplazamiento táctil. Incluso cuando no llames a `preventDefault()`, el compositor debe esperar. Por ello, el desplazamiento del usuario se bloqueará y esto podría hacer que haya fotogramas entrecortados y omitidos.

<img src="images/debounce-your-input-handlers/ontouchmove.jpg" alt="Desplazamiento pesado; el compositor se bloquea en JavaScript.">

En resumen, debes asegurarte de que los controladores de entrada que uses se ejecuten rápidamente y permitan al compositor hacer su trabajo.

## Evita los cambios de estilo en los controladores de entrada

Los controladores de entrada, al igual que los que se usan para las funciones táctil y de desplazamiento, se programan para ejecutarse justo antes de los callbacks `requestAnimationFrame`.

Si realizas un cambio visual dentro de alguno de estos controladores, al inicio de `requestAnimationFrame` habrá cambios de estilo pendientes. Si _luego_ se leen propiedades visuales al inicio del callback requestAnimationFrame, como se sugiere en la sección “[Evita los diseños grandes y complejos, y la paginación excesiva de diseños](avoid-large-complex-layouts-and-layout-thrashing)”, activarás un diseño sincrónico forzado.

<img src="images/debounce-your-input-handlers/frame-with-input.jpg" alt="Desplazamiento pesado; el compositor se bloquea en JavaScript.">

## Elimina el efecto de rebote en los controladores de desplazamiento

La solución para ambos problemas mencionados anteriormente es la misma; siempre se debe eliminar el efecto de rebote en los cambios visuales para el próximo callback `requestAnimationFrame`:


    function onScroll (evt) {

      // Store the scroll value for laterz.
      lastScrollY = window.scrollY;

      // Prevent multiple rAF callbacks.
      if (scheduledAnimationFrame)
        return;

      scheduledAnimationFrame = true;
      requestAnimationFrame(readAndUpdatePage);
    }

    window.addEventListener('scroll', onScroll);


Si se haces esto, también obtendrás el beneficio adicional de lograr que tus controladores de entrada sean ligeros, lo cual será fantástico porque ya no bloquearás funciones como el desplazamiento o la función táctil en códigos costosos a nivel computacional.


{# wf_devsite_translation #}
