project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Los controladores de entrada son una posible causa de problemas de rendimiento en sus aplicaciones, ya que pueden bloquear la compleción de los marcos y causar trabajo de diseño adicional (e innecesario).

{# wf_review_required #}
{# wf_updated_on: 2015-03-19 #}
{# wf_published_on: 2000-01-01 #}

# Eliminación de los efectos de rebote en los controladores de entrada {: .page-title }

{% include "_shared/contributors/paullewis.html" %}


Los controladores de entrada son una posible causa de problemas de rendimiento en sus aplicaciones, ya que pueden bloquear la compleción de los marcos y causar trabajo de diseño adicional (e innecesario).

## TL;DR {: .hide-from-toc }
- 'Evite los controladores de entrada de larga ejecución, ya que pueden bloquear el desplazamiento.'
- No realice cambios de estilo en los controladores de entrada.
- Evite el efecto de rebote en los controladores. Almacene los valores de los eventos y realice los cambios de estilo en la próxima llamada de retorno requestAnimationFrame.


## Evite los controladores de entrada de larga ejecución

En un caso lo más inmediato posible, cuando un usuario interactúa con la página, la cadena del compositor de la página puede tomar la entrada táctil del usuario y simplemente desplazar el contenido de un lado a otro. Esto no requiere el trabajo de la cadena principal, donde se ejecutan JavaScript, el diseño, los estilos o la pintura.

<img src="images/debounce-your-input-handlers/compositor-scroll.jpg" class="center" alt="Lightweight scrolling; compositor only.">

Sin embargo, si coloca un controlador de entrada como `touchstart`, `touchmove` o `touchend`, la cadena del compositor debe esperar que el controlador finalice la ejecución, ya que usted puede decidir llamar a `preventDefault()` y evitar que el desplazamiento táctil se ejecute. Incluso si no realiza una llamada a `preventDefault()`, el compositor debe esperar, por lo que el desplazamiento del usuario está bloqueado, y esto podría dar como resultado marcos entrecortados y perdidos.

<img src="images/debounce-your-input-handlers/ontouchmove.jpg" class="center" alt="Heavy scrolling; compositor is blocked on JavaScript.">

En resumen, debe asegurarse de que los controladores de entrada que utilice se ejecuten rápidamente y le permitan al compositor hacer su trabajo.

## Evite los cambios de estilo en los controladores de entrada

Los controladores de entrada, al igual que los que se utilizan para las funciones táctil y de desplazamiento, se programan para ejecutarse junto antes de las llamadas de retorno `requestAnimationFrame`.

Si realiza un cambio visual dentro de alguno de estos controladores, al inicio de`requestAnimationFrame`, habrá cambios de estilo pendientes. Si _luego_ se leen las propiedades visuales al inicio de la llamada de retorno requestAnimationFrame, como se sugiere en la sección “Evite los diseños grandes y complejos, y la hiperpaginación de diseños](avoid-large-complex-layouts-and-layout-thrashing)”, se desencadenará un diseño sincrónico forzado.

<img src="images/debounce-your-input-handlers/frame-with-input.jpg" class="center" alt="Heavy scrolling; compositor is blocked on JavaScript.">

## Elimine el rebote en los controladores de desplazamiento

La solución para ambos problemas mencionados anteriormente es la misma: siempre se debe eliminar el rebote en los cambios visuales para la próxima llamada de retorno `requestAnimationFrame`:


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
    

Si se hace esto, también se obtiene el beneficio adicional de mantener los controladores de entrada ligeros, lo que es fantástico porque no tiene que bloquear funciones como el desplazamiento o la función táctil en códigos costosos a nivel computacional.


