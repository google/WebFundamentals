project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Este codelab te ayudará a aprender a identificar y solucionar los cuellos de botella de rendimiento de la app web.

{# wf_updated_on: 2016-10-20T18:16:09Z #}
{# wf_published_on: 2016-01-01 #}


# Encuentra y soluciona los problemas de rendimiento de la app web {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}




## Introducción




Este codelab es una versión basada en texto de parte del contenido cubierto en un curso de Udacity sobre rendimiento de app/Web ([ud860](https://www.udacity.com/course/browser-rendering-optimization--ud860)). En lugar de una transcripción del curso en video, este codelab sirve como un eficiente tratamiento específico de identificación y corrección de jank, usado el proyecto final práctico original del curso.


## Información general




Todos hemos visto apps cuyas pantallas tienden a saltar irregularmente durante animaciones, desplazamientos u otras interacciones de usuario. La visible inconsistencia es un problema de rendimiento comúnmente llamado  *jank*  o  *judder*  y es una distracción molesta para los usuarios; interrumpe su flujo de pensamiento mientras usan la app y hace que la app parezca menos pulida y profesional.

Si el navegador tarda mucho en generar y mostrar un fotograma, lo omite y no puedes verlo. Ves el siguiente (o el que le sigue a este) y el objeto da un salto en lugar de desplazarse de forma fluida.

El fenómeno de bloqueo se puede evitar garantizando que una app se ejecute a un ritmo constante de sesenta fotogramas por segundo (60 fps). Muchos factores contribuyen al índice de fotogramas de una app, y existen varias maneras de codificar JavaScript y CSS para reducir o eliminar el bloqueo, y lograr el índice deseado.

Este codelab se trata de cambiar la forma en que te acercas a los problemas de rendimiento de la app, ayudándote a encontrar y solucionar los cuellos de botella de los marcos que causan jank.

### Lo que debes saber antes de empezar

*  *Ruta de acceso de representación crítica*:  deberías comprender la canalización de representación y cómo JavaScript y CSS le afectan. Conoce más aquí:  [https://developers.google.com/web/fundamentals/performance/critical-rendering-path/](/web/fundamentals/performance/critical-rendering-path/) y aquí: Curso de Udacity sobre  [Optimización de rendimiento de sitio web: la ruta crítica de representación](https://www.udacity.com/course/website-performance-optimization--ud884)__.__
*  *Marcos y rango de marcos*:  deberías saber cómo el navegador construye marcos y por qué el rango de 60 fps es importante para una reproducción fluida. Conoce más aquí:  [https://developers.google.com/web/fundamentals/performance/rendering/](/web/fundamentals/performance/rendering/) y aquí: Curso de Udacity sobre  [Optimización de rendimiento de navegador: cómo crear aplicaciones web de 60 fps](https://www.udacity.com/course/browser-rendering-optimization--ud860).
*  *Ciclo de vida de la aplicación*:  deberías comprender las partes de respuesta, animación, inactividad y carga de una app en funcionamiento, y reconocer las ventanas de oportunidad que cada parte presenta. Conoce más aquí:  [El modelo de rendimiento RAIL](/web/fundamentals/performance/rail)
*  *Chrome DevTools*:  deberías comprender las características básicas de DevTools y cómo usarlas para analizar una app web, especialmente la herramienta Timeline. Conoce más aquí:  [Análisis de rendimiento de tiempo de ejecución](/web/tools/chrome-devtools/rendering-tools/).

### Lo que aprenderás en este laboratorio de código

* identificar el código de la aplicación que provoca cuellos de botella en el rendimiento de la representación;
* analizar y modificar el código para reducir o eliminar los cuellos de botella.

### Lo que necesitarás en tu espacio de trabajo de desarrollo

* Navegador Google Chrome y DevTools;
* El código de muestra del proyecto práctico (ver a continuación)

### Bloqueo y sacudidas

Conoceremos el bloqueo jugando a “Jank Invaders”, de Jake Archibald. Fue diseñado para demostrar problemas con índices de fotogramas y rendimiento. A continuación, te ofrecemos una captura de pantalla.

![4a4d206daaf5693a.png](img/4a4d206daaf5693a.png)

En el juego, naves espaciales recorren la pantalla. Los buenos se desplazan de forma fluida, mientras que los malos (“naves espías”) se desplazan de forma irregular. Tu tarea: identificar y derribar las diez naves espías de jank entre las afables haciéndoles clic lo más rápido posible.  [Este es el vínculo al juego](http://jakearchibald.github.io/jank-invaders/). Diviértete y regresa cuando termines.

Claramente, los usuarios detectan los bloqueos y, de manera casi invariable, escogen apps que presentan un mejor rendimiento. Lo mismo ocurre con la Web: el mal rendimiento echa a perder los sitios buenos. Este laboratorio de código te ayudará a analizar el rendimiento de tu proyecto y explorar la manera de identificar y corregir problemas comunes. Identificarás las causas del desplazamiento persistente, las actualizaciones fluctuantes y las animaciones que presentan sacudidas con el objetivo de lograr un índice de fotogramas fluido de 60 fps.


## La app del proyecto




Comencemos dándole un vistazo a la app que depurarás en este codelab. Así es como se ve.

![36d93b5f28eb60c5.png](img/36d93b5f28eb60c5.png)

Este sitio usa la __Hacker News API__ para mostrar historias recientes y sus puntajes. En este momento, el rendimiento de la app es deficiente, en especial en dispositivos móviles, pero no hay ningún impedimento para que alcance los 60 fps. Al finalizar este laboratorio de código, habrás adquirido las habilidades, las técnicas y, lo que es más importante, la mentalidad necesarias para convertir esta app irregular en una experiencia atractiva y eficiente de 60 fps.

### Obtén el código del proyecto

Primero, debes obtener el código de la aplicación en sus versiones “anterior” y “posterior”. Para esto, puedes clonar los repositorios o simplemente descargar los archivos zip.

* Esta es la app original con cuellos de botella de rendimiento en un  [repositorio de GitHub](http://github.com/udacity/news-aggregator). Además, este es el  [sitio en vivo](http://udacity.github.io/news-aggregator/), por si quieres verlo. Esta es la versión en la que trabajarás.
* Esta es la app completada sin cuellos de botella de rendimiento en un  [repositorio de GitHub](https://github.com/udacity/news-aggregator/tree/solution). Puedes usar esta versión corregida como referencia.

### Ejecuta la app original

Primero, haz que funcione la versión problemática original de la app. En Chrome, abre __index.html__ en la carpeta del nivel superior (p. ej., agregador-maestro-de-noticias). Experimenta un poco con la app; rápidamente observarás un par de problemas de rendimiento de alto nivel en las dos interacciones principales del usuario: el desplazamiento en la pantalla principal y el deslizamiento hacia adentro y afuera de la historia. Nos concentraremos en estos problemas principales para observar la manera en que podemos mejorar el rendimiento de esta app irregular.


## Ejercicio 1: desplazamiento de lista




Durante el desplazamiento en la pantalla principal, notarás que la lista de historias se sacude. También verás que los indicadores de punto de las historias individuales (los números encerrados en círculos) no solo cambian sus valores, sino también el color. El propósito de este ejercicio es identificar esos problemas y determinar la manera de abordarlos.

Veamos lo que ocurre realmente cuando nos desplazamos por la pantalla principal usando la función Timeline. Asegúrate de que la casilla de verificación __JS Profile__ esté habilitada antes de comenzar tu grabación. Comienza una nueva grabación, desplaza la lista hacia abajo y deja de grabar. 

Al principio de la grabación, ves un indicador de FPS en verde. Deberías ver una barra verde con picos ocasionales, como en la siguiente captura de pantalla. El hecho de que la barra verde esté tan baja indica que la pantalla no estaba llegando a 60 FPS.

![2e40b3134f26b0fa.png](img/2e40b3134f26b0fa.png)

Acerca tu grabación y verás que después del evento de desplazamiento hay una llamada de función, seguida de muchos eventos de diseño separados, cada uno de ellos con un triángulo rojo de advertencia. Los eventos de diseño son los eventos delgados violetas al final del gráfico de llamas en la siguiente captura de pantalla. Este es un indicador seguro de que está ocurriendo un  *diseño sincrónico forzado*  .

![d6fb17faaa99e6f.png](img/d6fb17faaa99e6f.png)

Desplázate para identificar un evento de diseño y haz clic en el mismo para ver sus detalles. 

![fce56d36285bc1fc.png](img/fce56d36285bc1fc.png)

Mira los detalles de un evento de diseño y verás que la función `colorizeAndScaleStories` en app.js produce la advertencia de diseño sincrónica forzada.

![f58a21a56040ce6a.png](img/f58a21a56040ce6a.png)

Veamos esa función.

```
function colorizeAndScaleStories() {

  var storyElements = document.querySelectorAll('.story');

  // It does seem awfully broad to change all the
  // colors every time!
  for (var s = 0; s < storyElements.length; s++) {

    var story = storyElements[s];
    var score = story.querySelector('.story__score');
    var title = story.querySelector('.story__title');

    // Base the scale on the y position of the score.
    var height = main.offsetHeight;
    var mainPosition = main.getBoundingClientRect();
    var scoreLocation = score.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top;
    var scale = Math.min(1, 1 - (0.05 * ((scoreLocation - 170) / height)));
    var opacity = Math.min(1, 1 - (0.5 * ((scoreLocation - 170) / height)));

    score.style.width = (scale * 40) + 'px';
    score.style.height = (scale * 40) + 'px';
    score.style.lineHeight = (scale * 40) + 'px';

    // Now figure out how wide it is and use that to saturate it.
    scoreLocation = score.getBoundingClientRect();
    var saturation = (100 * ((scoreLocation.width - 38) / 2));

    score.style.backgroundColor = 'hsl(42, ' + saturation + '%, 50%)';
    title.style.opacity = opacity;
  }
}
```

Nota que se accede a `height`, `width` y `line-height`, que causan que el diseño se ejecute. También está configurada la opacidad y, si bien un cambio en la opacidad no activa una acción de diseño, esta línea de código aplica un nuevo estilo que activa una acción de recálculo y, nuevamente, de diseño. Estas dos técnicas empleadas en el bucle principal de la función provocan el problema de diseño sincrónico forzado. 

A continuación, consideremos el efecto visual en los indicadores de puntos de la historia, el cual no agrega valor informativo. Podríamos lograr el efecto con las propiedades de CSS en lugar de JavaScript, pero sería mejor dejar de lado el efecto por completo. Conclusión: a veces, la mejor manera de corregir un código es eliminarlo.

Quitemos las llamadas a la función `colorizeAndScaleStories`. Recomienda las líneas 88, 89 y 305 en app.js, como también toda la función, líneas 255 a 286. No borres estas líneas porque los números de las líneas a los que hacemos referencia más adelante en este codelab no coincidirán con tu app. Ahora los puntos de la historia lucen iguales todo el tiempo.

Vuelve a ejecutar la app, realiza una grabación de Timeline de alguna actividad de desplazamiento y luego amplíala en un evento de desplazamiento. Esta vez, verás que hay solo un recálculo de estilo después del desplazamiento y que la barra de FPS está mucho más alta. 

![5e9d66cb007f9076.png](img/5e9d66cb007f9076.png)

Los diseños adicionales y sus advertencias de diseño sincrónico forzado ya no están, y el índice de fotogramas es excelente. ¡Un problema de bloqueo solucionado!


## Ejercicio 2: concatenación de historia




Otro problema que afecta la fluidez de la app es el desplazamiento con jank cuando se agregan historias a la lista. Observa la llamada a `loadStoryBatch` en el código de receptor de eventos de `scroll`.

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    loadStoryBatch();
});
```

Esta función implementa cambios visibles en la página insertándole nuevas historias a medida que se carga, específicamente, anexando nodos del DOM usando `appendChild`. No hay nada inherentemente incorrecto en la función ni en el acercamiento de diseño que la usa, pero observa cómo se la llama.

La función `loadStoryBatch` es aleatoria, se ejecuta cuando sea necesario, según la prueba `loadThreshold`, sin importar qué más sucede en la página o dónde se encuentra el navegador en el proceso de construcción de marco. Esto sucede porque el motor de JavaScript no le presta atención a la canalización de representación a la hora de ejecutar secuencias de comandos. Esa inmediatez causa un problema de rendimiento, especialmente a medida que se agregan más historias a la lista. Podemos tratar este problema usando  *requestAnimationFrame* .

Idealmente, todo lo que genera un cambio visible en la página debería suceder dentro de una llamada de requestAnimationFrame. Hagámosle esa modificación al código de receptor de eventos de `scroll`.

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    requestAnimationFrame(loadStoryBatch);
});
```

Este sencillo cambio garantiza que nuestra secuencia de comandos relacionada con animaciones se ejecute al principio del proceso de canalización, y brinda un pequeño pero importante aumento del rendimiento.


## Ejercicio 3: deslizamiento de historias hacia adentro/afuera (parte 1)




Otra área problemática para nuestra app agregadora de noticias es la acción básica de deslizamiento de historias hacia adentro y hacia afuera. Aparte del desplazamiento, esta es la función de interacción de usuario más común de la app.

Como de costumbre, comienza por realizar en Timeline una grabación del deslizamiento de una historia hacia dentro y hacia fuera, y examina el índice de fotogramas. En diferentes dispositivos, la calificación del deslizamiento hacia adentro y afuera puede ir de un poco irregular a prácticamente inaplicable. Asegúrate de ver el  [sitio en vivo](http://udacity.github.io/news-aggregator/) en un dispositivo móvil, pero es problemático en todas las plataformas.

![59865afca1e508ef.png](img/59865afca1e508ef.png)

En general, cuando veas un evento violeta con un triángulo rojo, deberán investigar desplazándote encima del mismo y haciéndole clic para ver sus detalles. En este momento, te interesa el diseño sincrónico forzado que ocurrió después de que se disparó un temporizador. 

![1bd8f7700f55a6c4.png](img/1bd8f7700f55a6c4.png)

La animación de deslizamiento hacia adentro/afuera dispara un temporizador y ocurre un diseño sincrónico forzado. Los detalles apuntan a la línea 180 del archivo app.js, que es una función llamada `animate`. Veamos esa función.

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        setTimeout(animate, 4);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

Una de las primeras cosas que notarás es el `setTimeout` que configura la siguiente llamada a `animate`. Como aprendiste en el ejercicio anterior, el trabajo visible que se realiza en la página generalmente debería incluirse en una llamada `requestAnimationFrame` . Ese elemento `setTimeout` en particular representa un problema.

La solución obvia y sencilla es hacer que cada llamada a `animate` se programe por la fuerza al comienzo de su secuencia de fotogramas disponiéndola dentro de un `requestAnimationFrame`.

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

Si realizas otra grabación en Timeline, observarás una mejora de rendimiento entre moderada e importante, según el dispositivo.

Pregunta adicional: piensa en lo que ocurre con el deslizamiento de la historia hacia adentro y afuera. Estamos haciendo que aparezca y desaparezca una historia en la página, y que se revele y oculte contenido. Parece un proceso de transición sencillo; ¿se necesita JavaScript o se puede administrar solo con CSS? Volveremos a ver esta situación en el ejercicio 5.


## Ejercicio 4: desperdicio de memoria




Las animaciones jank no son la única causa de un malo rendimiento de las apps y las páginas web. Otro gran culpable es el uso ineficiente de la memoria y, como puedes suponer, nuestra app agregadora de noticias también es culpable de eso.

Cuando se hace clic el encabezado de una historia en la lista principal, la app compila el contenido de la historia, lo agrega a la página y lo desliza para hacerlo visible. Lo que debemos examinar es la parte de “adición a  la página”. Convenientemente, la función que controla el clic en una historia se llama `onStoryClick`. Veámosla.

```
function onStoryClick(details) {

  var storyDetails = $('sd-' + details.id);

  // Wait a little time then show the story details.
  setTimeout(showStory.bind(this, details.id), 60);

  // Create and append the story. A visual change...
  // perhaps that should be in a requestAnimationFrame?
  // And maybe, since they're all the same, I don't
  // need to make a new element every single time? I mean,
  // it inflates the DOM and I can only see one at once.
  if (!storyDetails) {

    if (details.url)
      details.urlobj = new URL(details.url);

    var comment;
    var commentsElement;
    var storyHeader;
    var storyContent;

    var storyDetailsHtml = storyDetailsTemplate(details);
    var kids = details.kids;
    var commentHtml = storyDetailsCommentTemplate({
      by: '', text: 'Loading comment...'
    });

    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);

    commentsElement = storyDetails.querySelector('.js-comments');
    storyHeader = storyDetails.querySelector('.js-header');
    storyContent = storyDetails.querySelector('.js-content');

    var closeButton = storyDetails.querySelector('.js-close');
    closeButton.addEventListener('click', hideStory.bind(this, details.id));

    var headerHeight = storyHeader.getBoundingClientRect().height;
    storyContent.style.paddingTop = headerHeight + 'px';

    if (typeof kids === 'undefined')
      return;

    for (var k = 0; k < kids.length; k++) {

      comment = document.createElement('aside');
      comment.setAttribute('id', 'sdc-' + kids[k]);
      comment.classList.add('story-details__comment');
      comment.innerHTML = commentHtml;
      commentsElement.appendChild(comment);

      // Update the comment with the live data.
      APP.Data.getStoryComment(kids[k], function(commentDetails) {

        commentDetails.time *= 1000;

        var comment = commentsElement.querySelector(
            '#sdc-' + commentDetails.id);
        comment.innerHTML = storyDetailsCommentTemplate(
            commentDetails,
            localeData);
      });
    }
  }
}
```

Después del primer grupo de declaraciones de variable, observa las cuatro líneas que componen la variable `storyDetails` y configuran su tipo de elemento, sus atributos y su contenido. Inmediatamente después de eso, observa que se agregará `storyDetails` al DOM como un nodo nuevo con el método `appendChild`.

En un principio, no necesariamente representará un problema, pero la pérdida aumentará considerablemente a medida que se use la app. Por supuesto, el usuario solo ve una historia a la vez, pero los nuevos nodos que se crean para cada historia que se mira nunca se descartan. Después de unos pocos clics, el DOM se obstruirá con nodos abandonados que ocupan memoria y hará que la app esté más lenta, y cuanto más tiempo se use esta, peor será el rendimiento.

Una mejor forma de lograr esta característica es la creación de solo un nodo de `storyDetails` permanente antes en la secuencia de comandos para sostener la historia actual y luego el uso de la confiable propiedad `innerHTML` para restablecer su contenido cada vez en lugar de crear un nuevo nodo. En otras palabras, sencillamente usarías este código: 

```
    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);
```

Para esto:

```
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.innerHTML = storyDetailsHtml;
```

Ese cambio indudablemente mejorará el rendimiento a largo plazo, pero no nos ayuda en el corto plazo. 

Aún debemos terminar de abordar el problema de deslizamiento hacia adentro y afuera.


## Ejercicio 5: deslizamiento de historias hacia adentro/afuera (parte 2)




Hasta ahora, has mejorado no solo el rendimiento general de la app, sino que has tratado algunos problemas de rendimiento específicos, como el desplazamiento en la lista. Al ejecutar la app mejorada, sin embargo, puedes ver que hay jank en la otra importante interacción de usuario, el deslizamiento de historias hacia adentro/afuera.

Veamos este proceso. En este Timeline, enciende el perfilador de JavaScript y toma una grabación de Timeline mientras haces clic en el titular de una historia para deslizarla hacia adentro y luego haz clic en el botón X de la historia para deslizarla hacia afuera. Como viste en el ejercicio 3, la función `onStoryClick` sigue causando un diseño sincrónico forzado.

![33ba193a24cb7303.png](img/33ba193a24cb7303.png)

En ese ejercicio, pusimos las llamadas de la función `animate` en un `requestAnimationFrame`. Eso, sin dudas, ayudó, pero no eliminó el problema por completo. 

Recuerda de nuestra discusión anterior (y desde tu búsqueda en  [Activadores de CSS](http://csstriggers.com/)) que el uso de propiedades específicas causa que ocurran partes específicas de la canalización de representación. Veamos de nuevo `animate`.

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

Prácticamente al final de la función, se configura la propiedad `left` y esto hace que el navegador ejecute el diseño. Poco después, se configura la propiedad `style` y esto hace que el navegador ejecute repeticiones de cálculos de estilos. Como sabes, si esto ocurre más de una vez en un fotograma, generará un diseño sincrónico forzado, y esto sucederá muchas veces en esta función. 

La función `animate` se encuentra dentro de la función `showStory` y la función similar, `hideStory`, que actualizan las mismas propiedades y ocasionan un problema de diseño sincrónico forzado.

Como observamos antes en este laboratorio de código, algunas veces, la mejor manera de corregir un código es eliminarlo. Sí, las funciones `showStory` y `hideStory` hacen su trabajo, pero son muy complejas para lo que debería ser un efecto simple. Por lo tanto, las haremos a un lado por ahora y veremos si podemos solucionar el problema con la CSS. Considera este código CSS.

```
.story-details {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: fixed;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 2;
  box-shadow:
      0px 2px 7px 0px rgba(0, 0, 0, 0.10);

  overflow: hidden;
  transition: transform 0.3s;
  will-change: transform;
}

.story-details.visible {
  transform: translateX(-100vw);
}

.story-details.hidden {
  transform: translateX(0);
}
```

Lo primero que debes observar en la clase `.story-details` es que fijamos la propiedad `left` en el 100%; independientemente del ancho de la pantalla, esto desplaza todo el elemento de la historia hacia la derecha, completamente fuera de la parte visible de la página, y lo oculta. 

A continuación, en las clases `.story-details.visible` y `.story-details.hidden`, configuramos una `transform` en cada una para forzar la posición X (horizontal) a -100 vw ( *ancho de ventana de visualización* ) y 0, respectivamente. Después de la aplicación, estas clases reubicarán el contenido de la historia en la vista o nuevamente en su posición original, fuera de la pantalla.

Luego, para asegurarnos de que el aspecto de la historia se vea como una animación y no aparezca y desaparezca abruptamente, configuramos una `transition` en `transform` a fin de darle 0,3 s (33 ms) para que tenga lugar. Esto garantiza un efecto visual uniforme de deslizamiento hacia adentro y afuera.

Por último, usamos la propiedad `will-change` para notificar al navegador sobre los posibles cambios `transform`.

Volviendo a las funciones `showStory` y `hideStory`, ahora podemos simplificarlas para agregar o quitar las nuevas clases `visible` y `hidden`, logrando el cambio visual deseado sin complejas secuencias de comandos.

```
function showStory(id) {
  if (!storyDetails)
    return;

  storyDetails.classList.add('visible');
  storyDetails.classList.remove('hidden');
}

function hideStory(id) {
  storyDetails.classList.add('hidden');
  storyDetails.classList.remove('visible');
}
```

Todo esto aportará beneficios importantes al rendimiento del deslizamiento hacia adentro y afuera de la historia de la app. Sin embargo, por supuesto, la única manera de asegurarnos es hacer una prueba. Realiza en Timeline otra grabación del deslizamiento de una historia hacia adentro y afuera, y observa lo que sucede.

![5543cf34c10a914b.png](img/5543cf34c10a914b.png)

El rendimiento de la app será mucho mejor; todos los fotogramas ahora se encontrarán muy por debajo de la línea de los 60 fps y desaparecerán las advertencias de diseño sincrónico forzado. Lo mejor es que ya no necesitamos JavaScript para realizar la animación de deslizamiento hacia adentro y afuera. 

Con esto finalizará nuestro trabajo de mejora del rendimiento.


## ¡Felicitaciones!




Si seguiste las descripciones y explicaciones, y aplicaste los cambios recomendados a tu código de proyecto original, ahora dispondrás de una app que se ejecutará perfectamente en 60 fps sin bloqueos en las animaciones.

### ¿Qué se abarcó?

En este laboratorio de código tratamos lo siguiente:

* Conocimientos requeridos: ruta de acceso de representación crítica, fotogramas e índice de fotogramas, ciclo de vida de la aplicación y Chrome DevTools.
* Información general sobre el bloqueo: qué es, cuándo se produce y cómo identificarlo visualmente.
* La app del proyecto: para qué sirve, por qué no muestra animaciones fluidas y cómo encontrar y solucionar los problemas.

### ¿Cuáles son las conclusiones?

Las principales conclusiones de este laboratorio de código son los siguientes:

* El bloqueo de la animación en pantalla puede deberse a un problema de diseño y de código.
* La percepción, o falta de percepción, del bloqueo es un factor importante para el usuario a la hora de decidir si usará o no la app.
* Mediante ajustes muy pequeños, incluso, se puede mejorar notablemente el rendimiento general de una app con el tiempo.

### Lo que viene

Te recomendamos que mires el código de proyecto completo, disponible en este  [repositorio de GitHub](https://github.com/udacity/news-aggregator/tree/solution). Verás que contiene más código mejorado que el que hemos podido abarcar en este laboratorio de código. Compara las versiones de la app “antes” y “después”, y explora las diferencias de código para evaluar qué otros cambios aplicaron los autores para mejorar el rendimiento de la app.

### ¡Gracias!

Gracias por trabajar en este laboratorio de código. Siempre nos esforzamos por mejorar. Si encontraste un error o problema, o tienes sugerencias, problemas o comentarios, contáctanos a través del siguiente vínculo de comentarios. ¡Feliz codificación!




{# wf_devsite_translation #}
