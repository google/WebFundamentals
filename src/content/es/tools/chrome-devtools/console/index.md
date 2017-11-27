project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Obtén más información sobre cómo navegar por el panel Console de JavaScript de Chrome DevTools.

{# wf_updated_on: 2016-02-01 #}
{# wf_published_on: 2015-05-10 #}

# Uso de Console {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/andismith.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Obtén más información sobre cómo abrir Console de DevTools, apilar mensajes 
redundantes o mostrarlos en sus propias líneas, borrar o conservar 
resultados o guardarlos en un archivo, filtrar resultados y acceder a la configuración adicional de
Console.

### TL;DR {: .hide-from-toc }
- Abre Console como un panel dedicado o como un panel lateral junto a cualquier otro panel.
- Apila mensajes redundantes o muéstralos en sus propias líneas.
- Borra o conserva resultados entre páginas o guárdalos en un archivo.
- Filtra los resultados por nivel de gravedad, ocultando los mensajes de la red o por patrones de expresiones regulares.

## Apertura de Console

Accede a Console como un panel dedicado en pantalla completa.

![Console como panel](images/console-panel.png)

También puedes acceder a Console como un panel lateral que se abre junto a cualquier otro panel.

![Console como panel lateral](images/console-drawer.png)

### Abrir como panel

Para abrir el panel **Console** dedicado, puedes hacer esto:

* Presiona <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows o Linux) o
 <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd class="kbd">J</kbd> (Mac).
* Si DevTools ya está abierto, presiona el botón **Console**.

Cuando abres el panel Console, el panel lateral Console se contrae automáticamente.

### Abrir como panel lateral

Para abrir Console como un panel lateral junto a cualquier otro panel, puedes hacer esto:

* Presiona <kbd>Esc</kbd> mientras DevTools esté seleccionada.
* Presiona el botón **Customize and control DevTools** y luego presiona 
  **Show console**.

![Show console](images/show-console.png)

## Apilamiento de mensajes

Si un mensaje se repite consecutivamente, en lugar de imprimir cada
instancia del mensaje en una línea nueva, Console "apila" los mensajes
y muestra un número en el margen izquierdo. El número indica cuántas veces
se repitió el mensaje.

![Apilamiento de mensajes](images/message-stacking.png)

Si prefieres una entrada de una sola línea por cada registro, habilita **Show timestamps**
en la configuración de DevTools.

![Show timestamps](images/show-timestamps.png)

Como la marca de tiempo de cada mensaje es diferente, cada mensaje se muestra
en su propia línea.

![Console con marcas de tiempo](images/timestamped-console.png)

## Trabajo con el historial de Console

### Borrar el historial {: #clearing}

Puedes borrar el historial de la consola con cualquiera de los siguientes métodos:

* Haz clic con el botón secundario en la consola y selecciona **Clear console**.
* Ingresa `clear()` en la consola.
* Llama a `console.clear()` en tu código JavaScript.
* Escribe <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">L</kbd> 
  (Mac, Windows, Linux).

### Conservar el historial {: #preserve-log}

Habilita la casilla de verificación **Preserve log** en la parte superior de Console para conservar
el historial de Console entre actualizaciones y cambios de páginas. Los mensajes se guardarán
hasta que borres la consola o cierres la pestaña.

### Guardar el historial

Haz clic con el botón secundario en Console y selecciona **Save as** para guardar el resultado
de la consola en un archivo de registro.

![Guardar el resultado de Console en un archivo de registro](images/console-save-as.png)

## Elegir el contexto de ejecución {: #execution-context }

El menú desplegable destacado en azul en la captura de pantalla a continuación se denomina
**selector de contexto de ejecución**.

![Selector de contexto de ejecución](images/execution-context-selector.png)

Por lo general, verás el contexto establecido en `top` (el marco superior de la página).

Otros marcos y extensiones funcionan en su propio contexto. Para trabajar con estos
otros contextos, debes seleccionarlos en el menú desplegable. Por ejemplo,
si deseas ver el resultado del registro de un elemento `<iframe>` y modificar
una variable que existe en ese contexto, debes seleccionar el contexto en
el menú desplegable del selector de contexto de ejecución.

Console muestra de manera predeterminada el contexto `top`, a menos que accedas a DevTools
inspeccionando un elemento dentro de otro contexto. Por ejemplo, si inspeccionas
un elemento `<p>` dentro de `<iframe>`, DevTools establece el selector de contexto de
ejecución en el contexto de ese `<iframe>`.

Cuando trabajas en un contexto que no es `top`, DevTools destaca el
selector de contexto de ejecución en rojo, como se muestra en la siguiente captura de pantalla. Esto se debe a que
no es usual que los programadores tengan que trabajar en otro contexto que no sea `top`. Puede ser
muy confuso escribir una variable, esperando que se genere un valor, y ver que el valor mostrado
es `undefined` (porque está definido en otro contexto).

![Selector de contexto de ejecución destacado en rojo](images/non-top-context.png)

## Filtrado de los resultados de Console

Haz clic en el botón **Filter** 
(![Botón filter](images/filter-button.png){:.inline})
para filtrar el resultado de Console. Puedes filtrar por nivel de gravedad, por una expresión 
regular u ocultando los mensajes de la red.

![Resultado filtrado de Console](images/filtered-console.png)

Filtrar por nivel de gravedad equivale a lo siguiente:

<table class="responsive">
  <thead>
     <tr>
      <th colspan="2">Opción y lo que muestra</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>Todos</td>
    <td>Muestra todos los resultados de Console.</td>
  </tr>
  <tr>
    <td>Errors</td>
    <td>Solo muestra los resultados de <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-">console.error()</a>.</td>
  </tr>
  <tr>
    <td>Warnings</td>
    <td>Solo muestra los resultados de <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-">console.warn()</a>.</td>
  </tr>
  <tr>
    <td>Info</td>
    <td>Solo muestra los resultados de <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoleinfoobject--object-">console.info()</a>.</td>
  </tr>
  <tr>
    <td>Logs</td>
    <td>Solo muestra los resultados de <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a>.</td>
  </tr>
  <tr>
    <td>Debug</td>
    <td>Solo muestra los resultados de <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoletimeendlabel">console.timeEnd()</a> y <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoledebugobject--object-">console.debug()</a>.</td>
  </tr>
  </tbody>
</table>

## Configuración adicional

Abre la configuración de DevTools, ve a la pestaña **General** y baja hasta la
sección **Console** para ver otra configuración de Console.

![Configuración de Console](images/console-settings.png)

<table class="responsive">
  <thead>
     <tr>
      <th colspan="2">Configuración y descripción</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>Hide network messages</td>
    <td>De manera predeterminada, la consola informa los problemas de la red. Si activas esta configuración, la consola no mostrará los registros de estos errores. Por ejemplo, no se registrarán los errores 404 y 500.</td>
  </tr>
  <tr>
    <td>Log XMLHttpRequests</td>
    <td>Determina si la consola registra cada XMLHttpRequest.</td>
  </tr>
  <tr>
    <td>Preserve log upon navigation</td>
    <td>Conserva el historial de la consola durante las actualizaciones de las páginas o mientras se las recorre.</td>
  </tr>
  <tr>
    <td>Show timestamps</td>
    <td>Antepone una marca de tiempo a cada mensaje de la consola que muestra cuándo se realizó la llamada. Es útil para realizar depuraciones de un evento en particular. Esto inhabilitará el apilamiento de mensajes.</td>
  </tr>
  <tr>
    <td>Enable custom formatters</td>
    <td>Controla el <a href="https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview">formato</a> de los objetos de JavaScript.</td>
  </tr>
  </tbody>
</table>


{# wf_devsite_translation #}
