project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: En este instructivo interactivo, comenzarás a depurar JavaScript con Chrome DevTools.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2017-01-04 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

<!-- TODO
     make demo responsive
-->

# Comenzar a depurar JavaScript en Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Este instructivo interactivo te guiará paso a paso para aprender el
flujo de trabajo básico para depurar JavaScript en Chrome DevTools. El instructivo te muestra
cómo depurar un problema específico, pero el flujo de trabajo general que aprenderás te servirá
para depurar cualquier tipo de error de JavaScript.

Si usas `console.log()` para buscar y solucionar errores de tu código, es buena
idea usar el flujo de trabajo aquí descrito. Por lo general, es mucho más rápido
y eficaz.

## Paso 1: reproduce el error {: #step-1 }

El primer paso de la depuración siempre es reproducir el error.
“Reproducir el error” significa encontrar una serie de acciones que
provocan el error constantemente. Es posible que debas reproducir el error varias veces,
así que trata de eliminar cualquier paso innecesario.

Sigue las siguientes instrucciones para reproducir el error que solucionarás
en este instructivo.

1. Haz clic en **Abrir demostración**. La demostración se abrirá en una nueva pestaña.

     <a href="https://googlechrome.github.io/devtools-samples/debug-js/get-started"
       target="devtools"
       rel="noopener noreferrer">
       <button>Abrir demostración</button>
     </a>

1. En la demostración, ingresa `5` en **Number 1**.
1. Ingresa `1` en **Number 2**.
1. Haz clic en **Add Number 1 and Number 2**.
1. Mira debajo de las casillas y el botón. Dice `5 + 1 = 51`.

Uy. El resultado está mal. Debe ser `6`. Este es el error
que solucionarás.

## Paso 2: pausa el código con un punto de interrupción

DevTools te permite pausar el código en el medio de la ejecución y examinar los valores
de *todas* las variables en ese momento. La herramienta que se usa para
pausar el código se llama **punto de interrupción**. Inténtalo ahora:

1. Abre DevTools en la demostración: presiona
   <kbd>Comando</kbd>+<kbd>Opción</kbd>+<kbd>I</kbd> (Mac) o
   <kbd>Control</kbd>+<kbd>Mayúscula</kbd>+<kbd>I</kbd> (Windows y Linux).

1. Haz clic en la pestaña **Sources**.

<!-- PENDIENTE agregar una captura de pantalla. No hacer la captura de pantalla hasta que el diseño de la demostración esté
     terminado. Agrégala aquí en lugar de en la captura de pantalla anterior por si Sources
    está oculto. -->

1. Haz clic en **Event Listener Breakpoints** para expandir la sección. DevTools muestra
   una lista de categorías de eventos expandibles, como **Animation** y
   **Clipboard**.

<!-- TODO or maybe add it here -->

1. Haz clic en **Expand** ![ícono
   Expand](/web/tools/chrome-devtools/images/expand.png){: .devtools-inline} junto a la categoría de evento **Mouse**.
   DevTools muestra una lista de eventos del mouse, como **click**,
   con casillas de verificación junto al evento.
1. Marca la casilla de verificación de **click**.

     <figure>
       <img src="imgs/get-started-click-breakpoint.png"
         alt=“DevTools abierto en la demostración, con el foco en el panel Sources
              y click activo en Event Listener Breakpoints”.
       <figcaption>
         <b>Figura 1</b>: DevTools abierto en la demostración, con el foco en el panel Sources
              y click activo en Event Listener Breakpoints.
         Si la ventana de DevTools tiene un tamaño grande en tu pantalla, el panel <b>Event
         Listener Breakpoints</b> estará ubicado a la derecha y no en la
     esquina inferior izquierda, como en la captura de pantalla.
       </figcaption>
     </figure>

1. Regresa a la demostración y haz clic nuevamente en **Add Number 1 and Number 2**. DevTools
   pausa la demostración y destaca una línea de código en el panel **Sources**.
   DevTools destaca esta línea de código:

       `function onClick() {`

Cuando marcaste la casilla de verificación de **click**, configuraste un punto de interrupción de evento en todos
los eventos `click`. Cuando se haga clic en *cualquier* nodo, y el nodo tenga un controlador `click`,
DevTools realizará una pausa automáticamente en la primera línea del controlador
`click` de dicho nodo.

Note: Este es solo uno de los varios tipos de puntos de interrupción que DevTools ofrece.
El que debas usar depende del tipo de problema que estés depurando.

[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png

## Paso 3: recorre el código

Una causa común de errores es cuando la secuencia de comandos se ejecuta en el
orden incorrecto. Si recorres el código, podrás seguir la
ejecución, línea por línea, y conocer exactamente qué parte
se ejecuta en un orden distinto del esperado. Inténtalo ahora:

1. En el panel **Sources** de DevTools, haz clic en **Step into next function
   call** ![Step into next function call][into]{:.devtools-inline} para recorrer
   la ejecución de la función `onClick()`, línea por línea.
   DevTools destaca la siguiente línea de código:

       `if (inputsAreEmpty()) {` 

1. Haz clic en **Step over next function call** ![Step over next function
   call][over]{:.devtools-inline}. DevTools ejecuta `inputsAreEmpty()`
   sin recorrerla. Observa que DevTools saltea unas líneas de código.
   Es porque `inputsAreEmpty()` se evaluó como false; por lo tanto, el bloque de código de la sentencia `if`
  no se ejecutó.

Estas son las nociones básicas para recorrer el código. Si observas el código de
`get-started.js`, podrás ver que el error se encuentra, probablemente, en algún lugar de la función
`updateLabel()`. En lugar de recorrer cada línea de código,
puedes usar otro tipo de punto de interrupción para pausar el código más cerca del
error.

[into]: /web/tools/chrome-devtools/images/step-into.png
[over]: /web/tools/chrome-devtools/images/step-over.png

## Paso 4: coloca otro punto de interrupción

El tipo de punto de interrupción más común es el de línea de código. Cuando
encuentres una determinada línea de código en la que quieras pausar, usa un punto de interrupción
de línea de código. Inténtalo ahora:

1. Observa la última línea de código de `updateLabel()`, que luce así:

       `label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;`

1. A la izquierda de este código, podrás ver un número de línea correspondiente a la
   línea de código: **32**. Haz clic en **32**. DevTools coloca un ícono azul sobre
   **32**. Esto significa que la línea tiene un punto de interrupción de línea de código.
   De ahora en adelante, DevTools siempre realizará una pausa antes de ejecutar esta línea de código.
1. Haz clic en **Resume script execution** ![Resume script
   execution][resume]{:.devtools-inline}. La secuencia de comandos continuará su ejecución
   hasta llegar a la línea de código con el punto de interrupción.
1. Observa las líneas de código de `updateLabel()` que ya se ejecutaron.
   DevTools muestra los valores de `addend1`, `addend2` y `sum`.

El valor de `sum` parece sospechoso. Parece que se evalúa como un
string en lugar de un número. Es posible que esta sea la causa del error.

## Paso 5: verifica los valores de las variables

Otra causa común de errores es cuando una variable o función produce
un valor distinto del esperado. Muchos programadores usan `console.log()` para
ver cómo cambian los valores con el tiempo, pero `console.log()` puede resultar tedioso e
ineficaz por dos razones. En primer lugar, es posible que debas editar manualmente tu código con
muchas llamadas a `console.log()`. En segundo lugar, es posible que no sepas exactamente cuál es la variable que
está relacionada con el error, por lo que deberás registrar varias variables.

Una alternativa a `console.log()` que ofrece DevTools es Watch Expressions. Usa
Watch Expressions para monitorear el valor de variables con el tiempo.
Como implica su nombre, Watch Expressions no solo está limitado a variables. En una instancia de Watch Expressions, puedes
almacenar cualquier expresión válida de JavaScript. Inténtalo ahora:

1. En el panel **Sources** de DevTools, haz clic en **Watch**. Se expande la sección.
1. Haz clic en **Add Expression** ![Add Expression][add]{:.devtools-inline}.
1. Escribe `typeof sum`.
1. Presiona <kbd>Entrar</kbd>. DevTools muestra `typeof sum: "string"`. El valor
   a la derecha de los dos puntos es el resultado de la expresión de Watch Expression.

     <figure>
       <img src="imgs/get-started-watch-expression.png"
         alt="El panel Watch Expression."
       <figcaption>
         <b>Figura 1</b>: El panel Watch Expression (esquina inferior derecha) después de
         crear la expresión <code>typeof sum</code>.
         Si la ventana de DevTools es grande en tu pantalla, el panel Watch Expression se encontrará
      a la derecha, arriba del panel <b>Event Listener Breakpoints</b>.
       </figcaption>
     </figure>

Como sospechábamos, `sum` se evalúa como un string en lugar de un
número. Esta es la causa del error en la demostración.

Otra alternativa a `console.log()` que ofrece DevTools es Console. Usa
Console para evaluar instrucciones arbitrarias de JavaScript.
Por lo general, los programadores usan Console para sobrescribir los valores de la variable
durante la depuración. En tu caso, Console puede ayudarte a probar soluciones
potenciales del error que acabas de descubrir. Inténtalo ahora:

1. Si el panel lateral Console no está abierto, presiona <kbd>Escape</kbd> para
   abrirlo. Se abrirá en la parte inferior de la ventana de DevTools.
1. En Console, escribe `parseInt(addend1) + parseInt(addend2)`.
1. Presiona <kbd>Entrar</kbd>. DevTools evalúa la instrucción y muestra
   `6`, que es el resultado esperado de la demostración.

     <figure>
       <img src="imgs/get-started-console.png"
         alt="El panel lateral Console después de evaluar la instrucción."
       <figcaption>
         <b>Figura 1</b>: El panel lateral Console después de evaluar
         <code>parseInt(addend1) + parseInt(addend2)</code>.
       </figcaption>
     </figure>

[add]: /web/tools/chrome-devtools/javascript/imgs/add-expression.png

## Paso 6: soluciona el problema

Has identificado una posible solución del error. Lo único que falta es
probar la solución. Para hacerlo, edita el código y vuelve a ejecutar la demostración. No hace
falta salir de DevTools para insertar la solución. Puedes editar el código JavaScript directamente
en la IU de DevTools. Inténtalo ahora:

1. En el editor de código del panel **Sources** de DevTools, reemplaza 
   `var sum = addend1 + addend2` por
   `var sum = parseInt(addend1) + parseInt(addend2);`. Es la línea que se encuentra arriba
   de la línea con el punto de interrupción.
1. Presiona <kbd>Comando</kbd>+<kbd>S</kbd> (Mac) o
   <kbd>Control</kbd>+<kbd>S</kbd> (Windows y Linux) para guardar el cambio.
   El color de fondo del código cambia a rojo para indicar que la secuencia de comandos
   se modificó en DevTools.
1. Haz clic en **Deactivate breakpoints** ![Deactivate
   breakpoints][deactivate]{:.devtools-inline}. El ícono cambia de color a azul para indicar
   que está activo. Cuando esta opción está activa, DevTools ignora todos los puntos de interrupción
   que hayas colocado.
1. Haz clic en **Resume script execution** ![Resume script
   execution][resume]{:.devtools-inline}.
1. Prueba la demostración con diferentes valores. La demostración debería calcular
   las sumas correctamente.

Ten en cuenta que este flujo de trabajo solo corrige el código que
se ejecuta en tu navegador. No corregirá el código para todos los usuarios que visiten tu
página. Para hacerlo, debes corregir el código en los servidores
que proveen tu página.

[deactivate]: /web/tools/chrome-devtools/images/deactivate-breakpoints-button.png

## Próximos pasos

¡Felicitaciones! Ahora conoces las nociones básicas de la depuración de JavaScript en DevTools.

En este instructivo, solo se mostraron dos formas de colocar puntos de interrupción. DevTools ofrece muchas
otras formas, como las siguientes:

* Puntos de interrupción condicionales que solo se activan cuando la condición que
  proporciones sea verdadera
* Puntos de interrupción en excepciones detectadas y no detectadas
* Puntos de interrupción XHR que se activan cuando la URL solicitada coincide con una
  subcadena que proporciones

<a class="gc-analytics-event"
   data-category="DevTools / Debug JS / Get Started / Next Steps / Breakpoints"
   href="add-breakpoints" target="_blank"
   rel="noopener noreferrer"><button>Quiero ver todos los puntos de interrupción</button></a>

Existen un par de controles para recorrer el código que no se explicaron en este
instructivo. Consulta el siguiente vínculo para obtener más información.

<a class="gc-analytics-event"
   data-category="DevTools / Debug JS / Get Started / Next Steps / Breakpoints"
   href="step-code#stepping_in_action" target="_blank"
   rel="noopener noreferrer"><button>Quiero dominar el arte de recorrer código</button></a>

## Comentarios

Responde a las siguientes preguntas para ayudarnos a mejorar este instructivo.

{% framebox width="auto" height="auto" %}

<p>¿Completaste el instructivo correctamente?</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Completed / Yes">Sí</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Completed / No">No</button>

<p>¿Encontraste la información que buscabas en este instructivo?</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Relevant / Yes">Sí</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Relevant / No">No</button>

<p>¿El instructivo fue demasiado largo?</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Too Long / Yes">Sí</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Too Long / No">No</button>

{% endframebox %}


{# wf_devsite_translation #}
