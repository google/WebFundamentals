project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Aprende a usar Chrome DevTools para encontrar y corregir errores de JavaScript.

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-01-04 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Comenzar a depurar JavaScript en Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

En este instructivo se describe el flujo de trabajo básico para depurar problemas de JavaScript en DevTools.
Sigue leyendo o mira la versión en video del instructivo, a continuación.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="H0XScE08hy8"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## Paso 1: Reproduce el error {: #reproduce }

El primer paso para la depuración siempre es encontrar una serie de acciones que reproduzcan un error
de manera uniforme.

1. Haz clic en **Open Demo**. La demostración se abre en una nueva pestaña.

     <a href="https://googlechrome.github.io/devtools-samples/debug-js/get-started"
       target="devtools"
       rel="noopener noreferrer">
       <button>Open Demo</button>
     </a>

1. Ingresa `5` en el cuadro de texto **Number 1**.
1. Ingresa `1` en el cuadro de texto **Number 2**.
1. Haz clic en **Add Number 1 and Number 2**. La etiqueta debajo del botón dice `5 + 1 = 51`. El resultado
   debería ser `6`. Este es el error que vas a corregir.

     <figure>
       <img src="imgs/bug.png"
         alt="El resultado de 5 + 1 es 51. Debería ser 6."/>
       <figcaption>
         <b>Figura 1</b>. El resultado de 5 + 1 es 51. Debería ser 6.
       </figcaption>
     </figure>

## Paso 2: Familiarízate con la IU del panel Sources {: #sources-ui }

DevTools proporciona muchas herramientas diferentes para distintas tareas, como cambio de CSS, generación de perfiles de
rendimiento de carga de páginas y supervisión de solicitudes de red. El panel **Sources** es donde depuras
JavaScript.

1. Para abrir DevTools, presiona <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac)
   o <kbd>Ctrl</kbd>+<kbd>Mayús</kbd>+<kbd>I</kbd> (Windows, Linux). Este acceso directo abre
   el panel **Console**.

     <figure>
       <img src="imgs/console.png" alt="El panel Console."/>
       <figcaption>
         <b>Figura 2</b>. El panel <b>Console</b>
       </figcaption>
     </figure>

1. Haz clic en la pestaña **Sources**.

     <figure>
       <img src="imgs/sources.png" alt="El panel Sources."/>
       <figcaption>
         <b>Figura 3</b>. El panel <b>Sources</b>
       </figcaption>
     </figure>

La IU del panel **Sources** tiene 3 partes:

<figure>
  <img src="imgs/sources-annotated.png" alt="Las 3 partes de la IU del panel Sources."/>
  <figcaption>
    <b>Figura 4</b>. Las 3 partes de la IU del panel <b>Sources</b>
  </figcaption>
</figure>

1. Panel **File Navigator**. Aquí se muestran todos los archivos que solicita la página.
2. Panel **Code Editor**. Después de seleccionar un archivo en el panel **File Navigator**, el contenido
   del archivo se muestra aquí.
3. Panel **JavaScript Debugging**. Diversas herramientas para inspeccionar el JavaScript de la página. Si
   la ventana de DevTools es ancha, este panel aparece a la derecha del panel **Code Editor**.

## Paso 3: Pausa el código con un punto de interrupción {: #event-breakpoint }

Un método común para depurar un problema como este es insertar muchas instrucciones de `console.log()`
en el código para inspeccionar los valores a medida que se ejecuta la secuencia de comandos. Por ejemplo:

<pre class="prettyprint">function updateLabel() {
  var addend1 = getNumber1();
  <strong>console.log('addend1:', addend1);</strong>
  var addend2 = getNumber2();
  <strong>console.log('addend2:', addend2);</strong>
  var sum = addend1 + addend2;
  <strong>console.log('sum:', sum);</strong>
  label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;
}</pre>

El método de `console.log()` es útil, pero los **puntos de interrupción** pueden ser más rápidos.
Un punto de interrupción te permite pausar el código durante la ejecución y examinar todos los valores
en ese momento específico. Los puntos de interrupción tienen algunas ventajas por sobre el método de `console.log()`:

* Con `console.log()`, debes abrir manualmente el código fuente, encontrar el código relevante,
  insertar las instrucciones de `console.log()` y volver a cargar la página para ver los mensajes
  en la consola. Con los puntos de interrupción, puedes realizar una pausa en el código relevante sin siquiera saber
  cómo está estructurado.
* En las instrucciones de `console.log()` debes especificar explícitamente cada valor que deseas
  inspeccionar. Con los puntos de interrupción, DevTools te muestra los valores de todas las variables en ese momento
  específico. A veces hay variables que afectan el código que ni siquiera sabes que existen.

En resumen, los puntos de interrupción pueden ser útiles para encontrar y corregir errores más rápido que con el método de `console.log()`.

Si piensas cómo funciona la app, puedes darte cuenta intuitivamente
que se calcula la suma incorrecta (`5 + 1 = 51`) en el receptor de eventos `click` que está
asociado con el botón **Add Number 1 and Number 2**. Por lo tanto, es probable que te convenga pausar
el código aproximadamente en el momento de la ejecución del receptor `click`. **Event Listener Breakpoints**
te permite hacer exactamente eso:

1. En el panel **JavaScript Debugging**, haz clic en **Event Listener Breakpoints** para expandir la
   sección. DevTools muestra una lista de categorías de eventos expandibles, como **Animation** y
   **Clipboard**.
1. Junto a la categoría de evento **Mouse**, haz clic en **Expand** ![ícono
   Expand](/web/tools/chrome-devtools/images/expand.png){: .devtools-inline}.
   DevTools muestra una lista de eventos de mouse, como **click** y **mousedown**. Cada evento tiene
   una casilla de verificación a su lado.
1. Marca la casilla de verificación **click**. DevTools ahora está configurado para hacer una pausa automáticamente cuando se ejecute *cualquier*
   receptor de eventos `click`.


     <figure>
       <img src="imgs/get-started-click-breakpoint.png"
         alt="La casilla de verificación click está habilitada."/>
       <figcaption>
         <b>Figura 5</b>. La casilla de verificación <b>click</b> está habilitada
       </figcaption>
     </figure>


1. De regreso en la demostración, vuelve a hacer clic en **Add Number 1 and Number 2**. DevTools
   pausa la demostración y destaca una línea de código en el panel **Sources**.
   DevTools se debe pausar en esta línea de código:

     <pre class="prettyprint">function onClick() {</pre>

     Si hiciste la pausa en una línea de código distinta, presiona **Resume Script Execution** ![Resume
     Script Execution][resume]{:.cdt-inl} hasta que el código quede pausado en la línea correcta.

     <aside class="note">
       **Nota**: Si pausaste en una línea distinta, tienes una extensión de navegador que
       registra un receptor de eventos `click` en cada página que visitas. Habías hecho una pausa en el
       receptor `click` de la extensión. Si usas el modo de navegación incógnito para [navegación
       privada][incognito], que deshabilita todas las extensiones, puedes ver que la pausa siempre se hace en
       la línea de código correcta.
     </aside>

[incognito]: https://support.google.com/chrome/answer/95464

Los **puntos de interrupción de receptor de eventos** son uno de varios tipos de puntos de interrupción disponibles en DevTools.
Es útil memorizar todos los tipos que existen porque cada uno te ayudará a depurar
distintas situaciones con la mayor rapidez posible. Consulta [Puntos de interrupción para pausas en el código][breakpoints]
para obtener información sobre cuándo y cómo usar cada tipo.

[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png
[breakpoints]: /web/tools/chrome-devtools/javascript/breakpoints

## Paso 4: Recorre el código {: #code-stepping }

Una causa común de errores es que la secuencia de comandos se ejecute en el
orden incorrecto. Si recorres el código, podrás seguir la
ejecución, línea por línea, y conocer exactamente qué parte
se ejecuta en un orden distinto del esperado. Inténtalo ahora:

1. En el panel **Sources** de DevTools, haz clic en **Step into next function
   call** ![Step into next function call][into]{:.devtools-inline} para recorrer
   la ejecución de la función `onClick()` una línea a la vez.
   DevTools destaca la siguiente línea de código:

     <pre class="prettyprint">if (inputsAreEmpty()) {</pre>

1. Haz clic en **Step over next function call** ![Step over next function
   call][over]{:.devtools-inline}. DevTools ejecuta `inputsAreEmpty()`
   sin recorrerla. Observa que DevTools saltea unas líneas de código.
   Es porque `inputsAreEmpty()` se evaluó como false; por lo tanto, el bloque de código de la sentencia `if`
  no se ejecutó.

Estas son las nociones básicas para recorrer el código. Si observas el código de
`get-started.js`, podrás ver que el error se encuentra, probablemente, en algún lugar de la función
`updateLabel()`. En lugar de recorrer cada línea de código,
puedes usar otro tipo de punto de interrupción para pausar el código más cerca de la
ubicación probable del error.

[into]: /web/tools/chrome-devtools/images/step-into.png
[over]: /web/tools/chrome-devtools/images/step-over.png

## Paso 5: Establece un punto de interrupción de línea de código {: #line-breakpoint }

El tipo de punto de interrupción más común es el de línea de código. Cuando
encuentres una determinada línea de código en la que quieras pausar, usa un punto de interrupción
de línea de código:

1. Observa la última línea de código de `updateLabel()`:

     <pre class="prettyprint">label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;</pre>

1. A la izquierda del código puedes ver el número de línea de esta
   línea de código específica, que es **32**. Haz clic en **32**. DevTools coloca un ícono azul sobre
    **32**. Esto significa que la línea tiene un punto de interrupción de línea de código.
   DevTools ahora siempre hace una pausa antes de que se ejecute esta línea de código.
1. Haz clic en **Resume script execution** ![Resume script
   execution][resume]{:.devtools-inline}. La secuencia de comandos se sigue ejecutando
   hasta llegar a la línea 32. En las líneas 29, 30 y 31, DevTools muestra los valores de
   `addend1`, `addend2` y `sum` a la derecha del punto y coma de cada línea.

     <figure>
       <img src="imgs/line-of-code-breakpoint.png"
         alt="DevTools pausa en el punto de interrupción de línea de código en la línea 32."/>
       <figcaption>
         <b>Figura 6</b>. DevTools pausa en el punto de interrupción de línea de código en la línea 32
       </figcaption>
     </figure>

## Paso 6: Verifica los valores de las variables {: #check-values }

Los valores de `addend1`, `addend2` y `sum` se ven sospechosos. Están entre comillas, lo que
significa que son strings. Esta es una buena hipótesis para explicar la causa del error.
Ahora debes recopilar más información. DevTools proporciona muchas herramientas para examinar valores de
variables.

### Método 1: El panel Scope {: #scope }

Cuando el código está pausado en una línea, el panel **Scope** te muestra las variables locales y globales
actualmente definidas, junto con el valor de cada variable. También muestra variables de cierre,
cuando corresponde. Haz doble clic en un valor de variable para editarlo. Cuando el código no está pausado en una línea,
el panel **Scope** está vacío.

<figure>
  <img src="imgs/scope-pane.png"
    alt="Panel Scope."/>
  <figcaption>
    <b>Figura 7</b>. Panel <b>Scope</b>
  </figcaption>
</figure>

### Método 2: Expresiones supervisadas {: #watch-expressions }

La pestaña **Watch** te permite supervisar los valores de las variables a lo largo del tiempo.
Como su nombre lo indica, las expresiones supervisadas no se limitan a las variables. En una expresión supervisada, puedes
almacenar cualquier expresión válida de JavaScript. Inténtalo ahora:

1. Haz clic en la pestaña **Watch**.
1. Haz clic en **Add Expression** ![Add Expression][add]{:.devtools-inline}.
1. Escribe `typeof sum`.
1. Presiona <kbd>Intro</kbd>. DevTools muestra `typeof sum: "string"`. El valor
   a la derecha de los dos puntos es el resultado de la expresión supervisada.

     <figure>
       <img src="imgs/get-started-watch-expression.png"
         alt="Panel de expresiones supervisadas."/>
       <figcaption>
         <b>Figura 8</b>. Panel de expresiones supervisadas (abajo a la derecha) después de
         crear la expresión supervisada <code>typeof sum</code>.
         Si la ventana de DevTools es grande, el panel de expresiones supervisadas se encontrará
         a la derecha, arriba del panel <b>Event Listener Breakpoints</b>.
       </figcaption>
     </figure>

Como sospechábamos, `sum` se evalúa como una string en lugar de un
número. Has confirmado que esta es la causa del error.

### Método 3: La consola {: #console }

Además de ver los mensajes de `console.log()`, también puedes usar la consola para evaluar
instrucciones arbitrarias de JavaScript. En términos de depuración, puedes usar la consola para probar
correcciones potenciales de errores. Inténtalo ahora:

1. Si el panel lateral Console no está abierto, presiona <kbd>Escape</kbd> para
   abrirlo. Se abrirá en la parte inferior de la ventana de DevTools.
1. En la consola, escribe `parseInt(addend1) + parseInt(addend2)`. Esta instrucción funciona porque
   el código está pausado en una línea donde `addend1` y `addend2` están dentro del alcance.
1. Presiona <kbd>Intro</kbd>. DevTools evalúa la instrucción y muestra
   `6`, que es el resultado esperado de la demostración.

     <figure>
       <img src="imgs/get-started-console.png"
         alt="El panel lateral Console después de evaluar parseInt(addend1) + parseInt(addend2)."/>
       <figcaption>
         <b>Figura 9</b>. El panel lateral Console después de evaluar
         <code>parseInt(addend1) + parseInt(addend2)</code>.
       </figcaption>
     </figure>

[add]: /web/tools/chrome-devtools/javascript/imgs/add-expression.png

## Paso 7: Soluciona el problema {: #apply-fix }

Encontraste una solución para el error. Lo único que falta es
probar la solución. Para hacerlo, edita el código y vuelve a ejecutar la demostración. No hace
falta salir de DevTools para insertar la solución. Puedes editar el código JavaScript directamente
en la IU de DevTools. Inténtalo ahora:

1. Haz clic en **Resume script execution** ![Resume script
   execution][resume]{:.devtools-inline}.
1. En **Code Editor**, reemplaza la línea 31, `var sum = addend1 + addend2`, con
   `var sum = parseInt(addend1) + parseInt(addend2)`.
1. Presiona <kbd>Command</kbd>+<kbd>S</kbd> (Mac) o
   <kbd>Ctrl</kbd>+<kbd>S</kbd> (Windows, Linux) para guardar el cambio.
1. Haz clic en **Deactivate breakpoints** ![Deactivate
   breakpoints][deactivate]{:.devtools-inline}. Cambia a azul para indicar
   que está activo. Mientras esté configurado así, DevTools ignorará los puntos de interrupción
   que hayas establecido.
1. Prueba la demostración con distintos valores. Ahora los cálculos se realizan de manera correcta.

Warning: Este flujo de trabajo solo corrige el código que se ejecuta en tu navegador.
No corregirá el código para todos los usuarios que visiten tu página. Para eso, debes corregir el
código que está en los servidores.

[deactivate]: /web/tools/chrome-devtools/images/deactivate-breakpoints-button.png

## Próximos pasos {: #next-steps }

¡Felicitaciones! Puedes aprovechar al máximo Chrome DevTools cuando depuras
JavaScript. Las herramientas y los métodos que aprendiste en este instructivo pueden ahorrarte muchísimas horas.

En este instructivo, solo se mostraron dos formas de colocar puntos de interrupción. DevTools ofrece muchas
otras formas, como las siguientes:

* Puntos de interrupción condicionales que solo se activan cuando la condición que
  proporciones sea verdadera
* Puntos de interrupción en excepciones detectadas y no detectadas
* Puntos de interrupción XHR que se activan cuando la URL solicitada coincide con una
  subcadena que proporciones

Consulta [Puntos de interrupción para pausas en el código](/web/tools/chrome-devtools/javascript/breakpoints) para
obtener información sobre cuándo y cómo usar cada tipo.

Hay algunos controles para recorrer el código que no se explicaron en este instructivo. Consulta [Step
over line of code](/web/tools/chrome-devtools/javascript/reference#stepping) (Omitir línea de código) para obtener más información.

## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}
