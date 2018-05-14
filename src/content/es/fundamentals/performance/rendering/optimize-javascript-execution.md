project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript a menudo activa cambios visuales. Algunas veces, lo hace directamente mediante manipulaciones de estilo y, otras veces, mediante cálculos que generan cambios visuales, como la búsqueda o clasificación de datos. El JavaScript sincronizado incorrectamente o de larga ejecución puede ser una causa común de los problemas de rendimiento. Debes intentar minimizar su impacto siempre que sea posible.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

# Optimización de la ejecución de JavaScript {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

JavaScript a menudo activa cambios visuales. Algunas veces,
lo hace directamente mediante manipulaciones de estilo y, otras veces, mediante cálculos que
generan cambios visuales, como la búsqueda o clasificación de datos. El JavaScript
sincronizado incorrectamente o de larga ejecución puede ser una causa común de los problemas de rendimiento,
y debes intentar minimizar su impacto siempre que sea posible.

La generación de perfiles de rendimiento de JavaScript puede considerarse como una obra de arte, ya que el código JavaScript que escribes no se parece en nada al código que en realidad se ejecuta. En los navegadores modernos, se usan los compiladores JIT y toda clase de optimizaciones y trucos posibles para realizar pruebas y brindarte la ejecución más rápida posible, y esto modifica en gran medida la dinámica del código.

Note: Si realmente deseas ver cómo funciona JIT en acción, debes consultar <a href='http://mrale.ph/irhydra/2/'>IRHydra<sup>2</sup> de Vyacheslav Egorov</a>. Allí se muestra el estado intermedio del código de JavaScript cuando el motor JavaScript de Chrome, V8, lo está optimizando.

No obstante, hay algunas medidas que definitivamente puedes tomar para que JavaScript se ejecute correctamente en tus apps.

### TL;DR {: .hide-from-toc }

* Evita utilizar setTimeout o setInterval para realizar actualizaciones visuales. En su lugar, utiliza siempre requestAnimationFrame.
* Desplaza JavaScript de larga ejecución fuera de la cadena principal y hacia los Web Workers.
* Utiliza microtareas para realizar cambios en el DOM en varios marcos.
* Utiliza la escala de tiempo de Chrome DevTools y el generador de perfiles de JavaScript para evaluar el impacto de JavaScript.

## Usa `requestAnimationFrame` para los cambios visuales

Cuando se producen cambios visuales en la pantalla, te recomendamos que hagas tu trabajo en el momento adecuado para el navegador, que es justo al inicio del fotograma. La única forma de garantizar que tu JavaScript se ejecute al inicio de un fotograma es a través de `requestAnimationFrame`.


    /**
     * If run as a requestAnimationFrame callback, this
     * will be run at the start of the frame.
     */
    function updateScreen(time) {
      // Make visual updates here.
    }

    requestAnimationFrame(updateScreen);


En los fotogramas o los ejemplos se puede usar `setTimeout` o `setInterval` para introducir cambios visuales, como animaciones, pero el problema es que el callback se ejecutará en _algún momento_ en el fotograma (posiblemente justo al final) y eso, a menudo, puede causar la pérdida de un fotograma, lo cual genera un bloqueo.

<img src="images/optimize-javascript-execution/settimeout.jpg" alt="setTimeout hace que el navegador omita un fotograma.">

De hecho, actualmente el comportamiento predeterminado de `animate` en jQuery contempla el uso de `setTimeout`. Puedes [realizar revisiones para usar `requestAnimationFrame`](https://github.com/gnarf/jquery-requestAnimationFrame), algo que se recomienda enfáticamente.

## Reduce la complejidad o el uso de Web Workers

JavaScript se ejecuta en la cadena principal del navegador, exactamente junto con los cálculos de estilo, el diseño y, en muchos casos, la pintura. Si tu JavaScript se ejecuta durante un período prolongado, bloqueará estas otras tareas y posiblemente ocasione la pérdida de fotogramas.

Debes ser estratégico respecto del momento en que JavaScript se ejecutará y el tiempo durante el cual esto se extenderá. Por ejemplo, si trabajas en una animación como el desplazamiento, sería ideal que mantuvieras el ajuste de tu JavaScript dentro del rango de **3 a 4 ms**. Cualquier valor superior hará que corras el riesgo de usar demasiado tiempo para esta tarea. Para un periodo de inactividad, podrás relajarte más respecto del tiempo requerido.

En muchos casos, puedes mover el trabajo específico de cálculo a los [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage) si, por ejemplo, no se requiere acceso al DOM. La manipulación o el cruce seguro de datos, como la clasificación o la búsqueda, a menudo son muy adecuados para este modelo, al igual que la carga y la generación de modelos.


    var dataSortWorker = new Worker("sort-worker.js");
    dataSortWorker.postMesssage(dataToSort);

    // The main thread is now free to continue working on other things...

    dataSortWorker.addEventListener('message', function(evt) {
       var sortedData = evt.data;
       // Update data on screen...
    });



No todas las tareas se pueden realizar correctamente en este modelo: los Web Workers no tienen acceso al DOM. En aquellos casos en los cuales tu trabajo se deba ejecutar en el subproceso principal, considera implementar un enfoque de procesamiento por lotes mediante el cual se segmente la tarea más grande en microtareas que en cada caso no duren más de algunos milisegundos y se ejecuten dentro de los controladores `requestAnimationFrame` en cada fotograma.


    var taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
    requestAnimationFrame(processTaskList);

    function processTaskList(taskStartTime) {
      var taskFinishTime;

      do {
        // Assume the next task is pushed onto a stack.
        var nextTask = taskList.pop();

        // Process nextTask.
        processTask(nextTask);

        // Go again if there’s enough time to do the next task.
        taskFinishTime = window.performance.now();
      } while (taskFinishTime - taskStartTime < 3);

      if (taskList.length > 0)
        requestAnimationFrame(processTaskList);

    }


Este enfoque tiene consecuencias para la experiencia y la interfaz de usuario, y deberás asegurarte de que el usuario sepa que una tarea se encuentra en proceso, ya sea [con un indicador de progreso o de actividad](https://www.google.com/design/spec/components/progress-activity.html). Cualquiera sea el caso, este enfoque mantendrá libre el subproceso principal de tu app para que sea adaptable ante las interacciones del usuario.

## Conoce el “impuesto al fotograma” de JavaScript

Cuando evalúas un fotograma, una biblioteca o tu propio código, es importante evaluar también la exigencia que supone ejecutar el código de JavaScript fotograma por fotograma. Esto es especialmente importante cuando se realizan trabajos de animación críticos para el rendimiento, como las transiciones o el desplazamiento.

La mejor manera de medir el perfil de rendimiento y la exigencia de tu JavaScript es usar Chrome DevTools. Generalmente, obtendrás registros con bajo nivel de detalle que se ven de la siguiente manera:

<img src="images/optimize-javascript-execution/low-js-detail.jpg" alt="Timeline de Chrome DevTools proporciona pocos detalles sobre la ejecución de JS.">

Si descubres que tienes JavaScript de larga ejecución, puedes habilitar el generador de perfiles de JavaScript en la parte superior de la interfaz de usuario de DevTools:

<img src="images/optimize-javascript-execution/js-profiler-toggle.jpg" alt="Habilitación del generador de perfiles de JS en DevTools.">

De este modo, se produce una sobrecarga de generación de perfiles en JavaScript. Por ello, debes asegurarte de habilitarlo únicamente cuando desees obtener información más detallada sobre las características del tiempo de ejecución de JavaScript. Con la casilla de verificación marcada, ahora puedes realizar las mismas acciones y obtener mucha más información sobre las funciones llamadas en tu JavaScript:

<img src="images/optimize-javascript-execution/high-js-detail.jpg" alt="Timeline de Chrome DevTools proporciona muchos detalles de la ejecución de JS.">

Con esta información a tu disposición, puedes evaluar el impacto del rendimiento de JavaScript en tu aplicación y comenzar a detectar y corregir las hotspots en las cuales las funciones demoren tarden en ejecutarse. Como se mencionó anteriormente, debes intentar quitar el JavaScript de larga ejecución o, si esto no fuera posible, moverlo hacia un Web Worker para liberar la cadena principal y continuar con otras tareas.

## Evita la microoptimización de tu JavaScript

Lo ideal sería saber que en el navegador se puede ejecutar una versión de un programa 100 veces más rápido que otro programa como, por ejemplo, que solicitar `offsetTop` de un elemento sea más rápido que calcular `getBoundingClientRect()`. No obstante, casi siempre es cierto que solo utilizará funciones como estas unas pocas veces por marco, por lo que generalmente es una pérdida de tiempo enfocarse en este aspecto del rendimiento de JavaScript. Generalmente, solo ahorrará fracciones de milisegundos.

Si creas un juego o una aplicación de alta exigencia en términos de cálculo, tu caso será una excepción para esta orientación porque es muy probable que introduzcas muchos cálculos en un solo fotograma, y en ese caso todo servirá.

En pocas palabras, debes ser muy cauteloso con las microoptimizaciones debido a que generalmente no se asignarán al tipo de aplicación que crees.


{# wf_devsite_translation #}
