project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Si ejecutas tu código de a una línea o función a la vez, podrás observar los cambios en los datos y en la página para conocer exactamente lo que sucede.

{# wf_updated_on: 2015-09-01 #}
{# wf_published_on: 2015-04-13 #}

# Cómo recorrer tu código {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

Si ejecutas tu código de a una línea o función a la vez, podrás observar los cambios en los datos y en la página para conocer exactamente lo que sucede. También puedes modificar valores de datos usados por la secuencia de comandos e incluso puedes modificar la propia secuencia de comandos.

*¿Por qué el valor de esta variable es 20 y no 30? ¿Por qué esa línea de código parece no cumplir ninguna función? ¿Por qué es este indicador true cuando debería ser false?* Todo desarrollador enfrenta estos desafíos y recorre el código para buscar soluciones.

Después de [configurar puntos de interrupción](add-breakpoints), regresa a la página y úsala normalmente hasta alcanzar uno. Todo el JavaScript se pausará en la página, el foco pasará al panel Sources de DevTools y el punto de interrupción se destacará. Ahora podrás ejecutar código de manera selectiva y examinar los datos paso a paso.


### TL;DR {: .hide-from-toc }
- Recorre el código para identificar problemas antes de que sucedan o mientras lo hacen y prueba cambios mediante edición en tiempo real.
- Es preferible omitir el registro por consola, ya que los datos registrados ya están caducos cuando llegan a la consola.
- Habilita la característica "Async call stack" para obtener más información sobre la pila de llamadas de funciones asincrónicas.
- Dispón archivos de secuencias de comandos en la caja negra para ocultar los archivos de terceros en las pilas de llamadas.
- Usa funciones con nombres, en lugar de funciones anónimas, para mejorar la legibilidad de la pila de llamadas.


## Recorrer el código

Todas las opciones para recorrer código se representan mediante íconos seleccionables ![Barra de botones de puntos de interrupción](imgs/image_7.png){:.inline} en la barra lateral, pero también se pueden activar con combinaciones de teclas. A continuación, se muestra un resumen de las acciones:

<table>
  <thead>
    <tr>
      <th data-th="Icon/Button">Ícono/botón</th>
      <th data-th="Action">Acción</th>
      <th data-th="Description">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_8.png" alt="Reanudar" class="inline"></td>
      <td data-th="Action">Reanudar</td>
      <td data-th="Description">Reanuda la ejecución hasta el siguiente punto de interrupción. Si no se encuentra ningún punto de interrupción, se reanuda la ejecución normal.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_9.png" alt="Reanudar prolongadamente" class="inline"></td>
      <td data-th="Action">Reanudar prolongadamente</td>
      <td data-th="Description">Reanuda la ejecución con los puntos de interrupción inhabilitados por 500 ms. Se recomienda para saltear momentáneamente puntos de interrupción que provocarían pausas continuas en el código (p. ej., un punto de interrupción dentro de un bucle). <p><b>Haz clic y mantén presionado <i>Reanudar</i> hasta que se expanda y muestre la acción.</b></p></td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_10.png" alt="Omitir" class="inline"></td>
      <td data-th="Action">Omitir</td>
      <td data-th="Description">Ejecuta la acción que se indica en la siguiente línea y pasa a la siguiente línea.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_11.png" alt="Entrar" class="inline"></td>
      <td data-th="Action">Entrar</td>
      <td data-th="Description">Si la siguiente línea contiene una llamada de función, <i>Entrar</i> irá a esa función y la pausará en la primera línea.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_12.png" alt="Salir" class="inline"></td>
      <td data-th="Action">Salir</td>
      <td data-th="Description">Ejecuta el resto de la función actual y pausa la ejecución en la siguiente instrucción después de la llamada de función.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_13.png" alt="Inhabilitar los puntos de interrupción" class="inline"></td>
      <td data-th="Action">Inhabilitar los puntos de interrupción</td>
      <td data-th="Description">Inhabilita temporalmente los puntos de interrupción. Se usa para reanudar la ejecución completa sin quitar los puntos de interrupción. Haz clic de nuevo en el botón para volver a activar los puntos de interrupción.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_14.png" alt="Pausar en excepciones" class="inline"></td>
      <td data-th="Action">Pausar en excepciones</td>
      <td data-th="Description">Automáticamente pausa el código cuando se produce una excepción.</td>
    </tr>
  </tbody>
</table>

Usa **Ingresar** como la acción típica para recorrer el código "una línea a la vez", ya que garantiza la ejecución de una sola instrucción, independientemente de la función a la que hayas ingresado o de la que hayas salido.

Usa [Pausar en excepciones](add-breakpoints#break-on-uncaught-exception) cuando sospeches que una excepción no detectada esté causando un problema y no sepas de dónde proviene. Cuando se habilita esta opción, puedes definirla mejor haciendo clic en la casilla de verificación **Pause On Caught Exceptions**; en este caso, la ejecución se pausa únicamente cuando se produce una excepción con la que se haya trabajado de forma específica.

## Ver propiedades por ámbito {: #scope }

Cuando pausas una secuencia de comandos, el subpanel **Scope** te muestra todas las
propiedades definidas en ese momento.

El subpanel se ve destacado en azul en la captura de pantalla a continuación.

![Subpanel Scope del panel Sources](imgs/scope-pane.png)

El subpanel solo se completa cuando una secuencia de comandos está pausada.
Mientras la página se ejecuta, el subpanel Scope permanece vacío.

El subpanel Scope te muestra las propiedades definidas en los niveles local, cierre y
global.

Si una propiedad tiene un ícono de flecha junto a ella, esto significa que es un objeto. Haz clic
en el ícono de flecha para expandir el objeto y ver sus propiedades.

Algunas veces, las propiedades están atenuadas. Por ejemplo, la propiedad `constructor`
está más atenuada que la propiedad `confirm` en la captura de pantalla siguiente.

![Propiedades atenuadas](imgs/enumerables.png)

Las propiedades más oscuras se pueden enumerar. Las propiedades atenuadas
no se pueden enumerar. Consulta el siguiente subproceso de Stack Overflow para obtener más información:
[¿Qué significan los colores en el panel Scope
de Chrome Developer Tools?](Qué significan los colores en el panel Scope de Chrome Developer Tools?).

## La pila de llamadas

Cerca de la parte superior de la barra lateral, se encuentra la sección **Call Stack**. Cuando el código está pausado en un punto de interrupción, en la pila de llamadas se muestra, en orden cronológico inverso, la ruta de acceso de ejecución que llevó al código a dicho punto de interrupción. Es útil para entender tanto la ubicación *actual* de la ejecución como la manera en que llegó allí, un factor importante de la depuración.

### Ejemplo

<img src="imgs/image_15.png" alt="Call Stack" class="attempt-left">

Un evento de clics inicial en la línea 50 en el archivo `index.html` llamó a la función 
`setone()` en la línea 18 en el archivo de JavaScript `dgjs.js`, el cual llamó a
la función `setall()` en la línea 4 en el mismo archivo, donde se pausa la ejecución
en el punto de interrupción actual.

<div class="clearfix"></div>

### Habilitar la pila de llamadas asíncronas

Habilita la función de la pila de llamadas asincrónicas para obtener más visibilidad de la ejecución
de tus llamadas de funciones asincrónicas.

1. Abre el panel **Sources** de DevTools.
2. En el subpanel **Call Stack**, habilita la casilla de verificación **Async**.

El siguiente video contiene una secuencia de comandos simple para demostrar la función de la pila de 
llamadas asincrónicas. En la secuencia de comandos, se usa una biblioteca de terceros para seleccionar un
elemento del DOM. Una función denominada `onClick` se registra como el controlador del evento 
`onclick` para el elemento. Cada vez que se llama a `onClick`,
esta función llama a otra denominada `f`, que hace que la secuencia de comandos se 
pause con la palabra clave `debugger`. 

<video src="animations/async-call-stack-demo.mp4"
       autoplay muted loop controls></video>

En el video, se activa un punto de interrupción y se expande la pila de llamadas.
Solo hay una llamada en la pila: `f`. A continuación, se activa la función de la pila de llamadas
asincrónicas, se reanuda la secuencia de comandos, se vuelve a activar el punto de interrupción y
la pila de llamadas se expande por segunda vez. Esta vez, la pila de llamadas contiene 
todas las llamadas hasta `f`, incluidas las llamadas a bibliotecas de terceros y
la llamada a `onClick`. La primera vez que se llamó a la secuencia de comandos, 
solo hubo una llamada en la pila de llamadas. La segunda vez, hubo cuatro. En
resumen, la función de la pila de llamadas asincrónicas proporciona más visibilidad 
de toda la pila de llamadas de las funciones asincrónicas.

### Sugerencia: Nombra las funciones para mejorar la legibilidad de la pila de llamadas

Las funciones anónimas dificultan la lectura de la pila de llamadas. Nombra tus funciones
para mejorar la legibilidad.

Los fragmentos de código que figuran en las dos capturas de pantalla siguientes son funcionalmente equivalentes: El
funcionamiento exacto del código no es importante, lo que importa es
que el código de la primera captura de pantalla usa funciones anónimas, mientras
que el de la segunda captura de pantalla usa funciones con nombre.

En la pila de llamadas de la primera captura de pantalla, las dos funciones superiores
simplemente dicen `(anonymous function)`. En la segunda captura de pantalla, las dos
funciones superiores tienen un nombre, lo que facilita la comprensión del flujo del programa
en un solo vistazo. Cuando trabajas con una gran cantidad de archivos de secuencias de comandos, incluidas
bibliotecas de terceros y frameworks, la pila de llamadas tiene cinco o diez
llamadas; es mucho más fácil comprender el flujo de la pila de llamadas cuando
las funciones tienen un nombre.

Pila de llamadas con funciones anónimas:

![Pila de llamadas con funciones anónimas y difíciles de leer](imgs/anon.png)

Pila de llamadas con funciones con nombre: 

![Pila de llamadas con funciones con nombre y fáciles de leer](imgs/named.png)

<!-- blackbox OR disable third-party code??? -->

### Disponer código de terceros en la caja negra

Dispón archivos de secuencias de comandos en la caja negra para evitar archivos de terceros en las pilas de llamadas.

Antes de disponerlos en la caja negra:

![Pila de llamadas sin archivos en la caja negra](imgs/before-blackbox.png)

Después de la disposición en la caja negra:

![Pila de llamadas después de la disposición en la caja negra](imgs/after-blackbox.png)

Para disponer un archivo en la caja negra:

1. Abre la configuración de DevTools

   ![Abrir la configuración de DevTools](imgs/open-settings.png)

2. En el menú de navegación de la izquierda, haz clic en **Blackboxing**.

   ![Panel Blackboxing de Chrome DevTools](imgs/blackbox-panel.png)

3. Haz clic en **Add pattern**.

4. En el campo de texto de **Pattern**, ingresa el patrón del nombre de archivo que deseas 
   excluir de tu pila de llamadas. DevTools excluirá cualquier secuencia de comandos que coincida con el 
   patrón. 

   ![Agregar un patrón a la caja negra](imgs/add-pattern.png)

5. En el menú desplegable a la derecha del campo de texto, selecciona **Blackbox** para
   ejecutar los archivos de la secuencia de comandos y excluir las llamadas de la pila de llamadas, o selecciona
   **Disabled** para evitar que los archivos se ejecuten.

6. Haz clic en **Add** para guardar.

La próxima vez que ejecutes la página y se active un punto de interrupción, DevTools
ocultará de la pila de llamadas todas las llamadas de funciones de las secuencias de comandos dispuestas en la caja negra.

## Manipulación de datos

Cuando la ejecución del código está pausada, puedes observar y modificar los datos que se procesan. Esto es crucial cuando se intenta realizar el seguimiento de una variable que aparentemente tiene un valor incorrecto o de un parámetro que se pasó, pero no se recibió como se esperaba.

Muestra el panel lateral Console haciendo clic en **Show/Hide drawer** ![Show/Hide drawer](imgs/image_16.png){: .inline} o presiona <kbd class="kbd">ESC</kbd>. Con la consola abierta mientras recorres el texto, podrás:

* escribir el nombre de una variable para ver su valor actual en el ámbito de la función actual;
* escribir una instrucción de asignación JavaScript para cambiar el valor.

Intenta modificar los valores y continúa con la ejecución para ver cómo influye en el resultado del código y si el código se comporta como esperas.

#### Ejemplo

<img src="imgs/image_17.png" alt="Panel lateral Console" class="attempt-left">

Revelamos que el valor del parámetro `dow` actualmente es 2, pero lo cambiamos
manualmente a 3 antes de reanudar la ejecución.

<div class="clearfix"></div>

## Edición en tiempo real

Observar y pausar el código que está en ejecución te ayuda a localizar errores, y la edición en tiempo real te permite obtener rápidamente una vista previa sin tener que volver a cargar.

Para editar una secuencia de comandos en tiempo real, solo debes hacer clic en la sección de edición del panel Sources cuando recorras el código. Realiza los cambios como lo harías en el editor y confirma los cambios con <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> (o <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd> en Mac). En este momento, todo el archivo JS se corregirá en el VM y todas las definiciones de la función se actualizarán. 

Ahora puedes reanudar la ejecución. La secuencia de comandos modificada se ejecutará en lugar de la original y podrás observar los efectos de tus cambios.

#### Ejemplo

![Edición en tiempo real](imgs/image_18.png)

Sospechamos que el parámetro `dow` es, en cada caso, incorrecto por +1 cuando se lo
pasa a la función `setone()`; es decir, el valor de `dow<` se 
recibe como 1 cuando debería ser 0, como 2 cuando debería ser 1, etc. Para probar 
rápidamente si disminuir el valor que se pasa confirma que esto es un problema,
agregamos la línea 17 al comienzo de la función, aceptamos el cambio con 
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> y reanudamos la ejecución.

## Manejar la ejecución del subproceso {: #threads }

Usa el subpanel **Threads** en el panel Sources para pausar, entrar e
inspeccionar otros subprocesos, como los subprocesos del trabajador de servicio o del trabajador web.

Para mostrar el subpanel Threads, esta sección usa la siguiente demostración:
[Ejemplo básico de trabajadores web](http://mdn.github.io/simple-web-worker/).

Si abres DevTools en la app, puedes ver que la secuencia de comandos principal está
en `main.js`:

![Secuencia de comandos principal](imgs/main-script.png)

La secuencia de comandos del trabajador web está en `worker.js`:

![Secuencia de comandos del trabajador](imgs/worker-script.png)

La secuencia de comandos principal detecta los cambios en los campos de entrada **Multiply number 1** o
**Multiply number 2**. Ante un cambio, la secuencia de comandos principal envía un
mensaje al trabajador web con los valores de los dos números que se deben multiplicar. El
trabajador web realiza la multiplicación y pasa el resultado a la secuencia de
comandos principal.

Supón que estableces un punto de interrupción en `main.js` que se activa cuando
se cambia el primer número:

![Punto de interrupción de la secuencia de comandos principal](imgs/main-script-breakpoint.png)

También estableces un punto de interrupción en `worker.js` cuando el trabajador recibe un
mensaje:

![Punto de interrupción de la secuencia de comandos del trabajador](imgs/worker-script-breakpoint.png)

La modificación del primer número en la IU de la app activa ambos puntos de interrupción.

![Puntos de interrupción de la secuencia de comandos principal y del trabajador activados](imgs/breakpoints-triggered.png)

En el subpanel Threads, la flecha azul indica qué subproceso está
seleccionado en el momento. Por ejemplo, en la captura de pantalla precedente, está seleccionado el subproceso **Main**. 

Todos los controles
de DevTools para recorrer el código (reanudar o pausar la ejecución de la secuencia de comandos,
omitir la siguiente llamada de función, entrada a la siguiente llamada de función, etc.) se relacionan con
ese subproceso. En otras palabras, si presionaste el botón para **reanudar la ejecución de la secuencia de comandos**
mientras DevTools se veía como en la captura de pantalla de arriba, el subproceso 
Main reanudaría su ejecución, pero el subproceso del trabajador web
seguiría pausado. Las secciones **Call Stack** y **Scope** solo muestran 
información para el subproceso Main.

Cuando desees recorrer el código para el subproceso del trabajador web o ver su
información de ámbito y pila de llamadas, haz clic en su etiqueta en el subpanel Threads,
para que aparezca la flecha azul junto a él. En la siguiente captura de pantalla se muestra cómo la información
de la pila de llamadas y el ámbito cambia después de seleccionar el subproceso del trabajador.
Nuevamente, si presionaras cualquiera de los botones para recorrer el código (reanudar
la ejecución de la secuencia de comandos, omitir la siguiente llamada de función, etc.) esa acción solo
correspondería al subproceso del trabajador. El subproceso Main no resulta afectado.

![Subproceso del trabajador en foco](imgs/worker-thread.png)


{# wf_devsite_translation #}
