---
title: "Optimización de la ejecución de JavaScript"
description: "JavaScript suele ser el desencadenador de los cambios visuales. Algunas veces, esto se hace directamente mediante manipulaciones de estilo y, otras veces, mediante cálculos que darán como resultado cambios visuales, como buscar o clasificar algunos datos. El JavaScript sincronizado incorrectamente o de larga ejecución puede ser una causa común de los problemas de rendimiento, y debe intentar minimizar su impacto siempre que sea posible."
updated_on: 2015-03-20
translation_priority: 0
notes:
  jit:
    -" Si realmente desea ver cómo funciona JIT, debe consultar <a href='http://mrale.ph/irhydra/2/'>IRHydra<sup>2</sup> de Vyacheslav Egorov</a>. Allí se muestra el estado intermedio del código de JavaScript cuando el motor JavaScript de Chrome, V8, lo está optimizando."
key-takeaways:
  - "Evite utilizar setTimeout o setInterval para realizar actualizaciones visuales. En su lugar, utilice siempre requestAnimationFrame."
  - "Desplace JavaScript de larga ejecución fuera de la cadena principal y hacia los Web Workers."
  - "Utilice microtareas para realizar cambios en el DOM (Modelo de objetos del documento) en varios marcos."
  - "Utilice la escala de tiempo de DevTools de Chrome y el generador de perfiles de JavaScript para evaluar el impacto de JavaScript."

---
<p class="intro">
  JavaScript suele ser el desencadenador de los cambios visuales. Algunas veces, esto se hace directamente mediante manipulaciones de estilo y, otras veces, mediante cálculos que darán como resultado cambios visuales, como buscar o clasificar algunos datos. El JavaScript sincronizado incorrectamente o de larga ejecución puede ser una causa común de los problemas de rendimiento, y debe intentar minimizar su impacto siempre que sea posible.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

La generación de perfiles de rendimiento de JavaScript se puede considerar una obra de arte, ya que el JavaScript que usted escribe no es para nada similar al código que en realidad se ejecuta. En los navegadores modernos, se utilizan los compiladores JIT y todos los tipos de optimizaciones y trucos posibles para realizar pruebas y proporcionarle una ejecución lo más rápida posible, y esto modifica en gran medida la dinámica del código.

{% include shared/remember.liquid title="Note" list=page.notes.jit %}

Dicho todo esto, sin embargo, existen algunas medidas que definitivamente puede aplicar para que en sus aplicaciones JavaScript se ejecute correctamente.

## Uso de requestAnimationFrame para realizar cambios visuales

Cuando se producen cambios visuales en la pantalla, usted desea hacer su trabajo en el momento adecuado para el navegador, que es justo al inicio del marco. La única forma de garantizar que su JavaScript se ejecute al inicio de un marco es mediante el uso de `requestAnimationFrame`.

{% highlight javascript %}
/**
 * If run as a requestAnimationFrame callback, this
 * will be run at the start of the frame.
 */
function updateScreen(time) {
  // Make visual updates here.
}

requestAnimationFrame(updateScreen);
{% endhighlight %}

En los marcos o las muestras se puede utilizar `setTimeout` o `setInterval` para introducir cambios visuales, como animaciones, pero el problema es que la llamada de retorno se ejecutará en _algún momento_ en el marco, posiblemente justo al final, y eso, a menudo, puede causar la pérdida de un marco, lo que da como resultado un bloqueo.

<img src="images/optimize-javascript-execution/settimeout.jpg" class="g--centered" alt="setTimeout causing the browser to miss a frame.">

De hecho, en la actualidad, el comportamiento predeterminado de `animate` en jQuery es utilizar `setTimeout`. Puede [realizar revisiones para utilizar `requestAnimationFrame`](https://github.com/gnarf/jquery-requestAnimationFrame), algo que se recomienda enfáticamente.

## Reducción de la complejidad o uso de Web Workers

JavaScript se ejecuta en la cadena principal del navegador, exactamente junto con los cálculos de estilo, el diseño y, en muchos casos, la pintura. Si su JavaScript se ejecuta durante un período prolongado, bloqueará estas otras tareas y, posiblemente, ocasionará la pérdida de marcos.

Debe ser estratégico respecto de cuándo y por cuánto tiempo se ejecuta JavaScript. Por ejemplo, si se encuentra trabajando en una animación como el desplazamiento, sería ideal que mantenga su JavaScript dentro del rango de **3 a 4 ms**. Si se extiende más allá de este rango, correrá el riesgo de utilizar demasiado tiempo para esta tarea. Si se encuentra en un periodo inactivo, podrá relajarse más respecto del tiempo dedicado.

En muchos casos, puede mover el trabajo puramente de cálculo a los [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage) si, por ejemplo, no requiere acceso al DOM. La manipulación o el cruce seguro de datos, como la clasificación o la búsqueda, a menudo, son muy adecuados para este modelo, al igual que la carga y la generación de modelos.

{% highlight javascript %}
var dataSortWorker = new Worker("sort-worker.js");
dataSortWorker.postMesssage(dataToSort);

// The main thread is now free to continue working on other things...

dataSortWorker.addEventListener('message', function(evt) {
   var sortedData = e.data;
   // Update data on screen...
});

{% endhighlight %}

No todos los trabajos se pueden realizar correctamente en este modelo: Los Web Workers no tienen acceso al DOM. En aquellos casos en los que su trabajo se debe ejecutar en la cadena principal, considere la idea de implementar un enfoque de procesamiento por lotes, mediante el cual se segmenta la tarea más grande en microtareas, cada una de las cuales no dura más de algunos milisegundos y se ejecuta dentro de los controladores `requestAnimationFrame` en cada marco.

{% highlight javascript %}
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
{% endhighlight %}

Este enfoque presenta consecuencias para la UX (Experiencia del usuario) y la UI (Interfaz de usuario), por lo que deberá asegurarse de que el usuario sepa que se está procesando una tarea, ya sea al [utilizar un indicador de progreso o de actividad](http://www.google.com/design/spec/components/progress-activity.html). Cualquiera sea el caso, este enfoque mantendrá libre la cadena principal de su aplicación para que pueda brindar respuestas a las interacciones del usuario.

## Conocimiento del “impuesto al marco” de JavaScript

Cuando evalúa un marco, una biblioteca o su propio código, es importante evaluar también el costo de ejecutar el código de JavaScript segundo a segundo. Esto es especialmente importante cuando se realizan trabajos de animación críticos para el rendimiento, como las transiciones o el desplazamiento.

La mejor manera de medir el perfil de rendimiento y el costo de su JavaScript es utilizar DevTools de Chrome. Generalmente, obtendrá registros con pocos detalles que se ven de la siguiente manera:

<img src="images/optimize-javascript-execution/low-js-detail.jpg" class="g--centered" alt="Chrome DevTools' Timeline providing low JS execution detail.">

Si descubre que posee JavaScript de larga ejecución, puede habilitar el generador de perfiles de JavaScript en la parte superior de la interfaz de usuario de DevTools:

<img src="images/optimize-javascript-execution/js-profiler-toggle.jpg" class="g--centered" alt="Enabling the JS profiler in DevTools.">

De este modo, se produce una sobrecarga de generación de perfiles en JavaScript, por lo que debe asegurarse de habilitarlo únicamente cuando desee obtener más detalles sobre las características del tiempo de ejecución de JavaScript. Con la casilla de verificación marcada, ahora puede realizar las mismas acciones y obtener mucha más información sobre las funciones que se ejecutaron en su JavaScript:

<img src="images/optimize-javascript-execution/high-js-detail.jpg" class="g--centered" alt="Chrome DevTools' Timeline providing high JS execution detail.">

Con esta información en sus manos, puede evaluar el impacto del rendimiento de JavaScript en su aplicación, y comenzar a encontrar y solucionar las zonas activas en las que las funciones demoran demasiado en ejecutarse. Como mencionamos anteriormente, debe intentar eliminar el JavaScript de larga ejecución o, si esto no fuera posible, moverlo hacia el Web Worker para liberar la cadena principal y continuar con otras tareas.

## Evite la micro optimización de su JavaScript

Lo ideal sería saber que en el navegador se puede ejecutar una versión de un programa 100 veces más rápido que otro programa como, por ejemplo, que solicitar `offsetTop` de un elemento sea más rápido que calcular `getBoundingClientRect()`. No obstante, casi siempre es cierto que solo utilizará funciones como estas unas pocas veces por marco, por lo que generalmente es una pérdida de tiempo enfocarse en este aspecto del rendimiento de JavaScript. Generalmente, solo ahorrará fracciones de milisegundos.

Si está creando un juego o una aplicación costosa a nivel computacional, su caso es una excepción a esta orientación, ya que es muy probable que introduzca muchos cálculos en un solo marco, y en ese caso todo resulta útil.

En síntesis, debe ser muy cauteloso con las micro optimizaciones ya que, generalmente, no se asignarán al tipo de aplicación que está creando.


