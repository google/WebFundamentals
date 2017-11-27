project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: PENDIENTE

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Referencia de Command Line API {: .page-title }

{% include "web/_shared/contributors/andismith.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Command Line API ofrece varias funciones convenientes para realizar tareas comunes: seleccionar e inspeccionar elementos DOM, mostrar datos en formatos legibles, detener e iniciar generadores de perfiles, y controlar eventos DOM.

Note: Esta API solo está disponible dentro de la misma consola. No puedes acceder a Command Line API desde secuencias de comandos en la página.


## $_

`$_` muestra el valor de la última expresión evaluada.

En el siguiente ejemplo,
se evalúa una expresión simple (`2 + 2`).
A continuación, se evalúa la propiedad `$_`,
que contiene el mismo valor:

![$_ es la última expresión evaluada](images/recently-evaluated-expression-1.png)

En el siguiente ejemplo,
la expresión evaluada contiene inicialmente una matriz de nombres.
Cuando se evalúa `$_.length` para encontrar la extensión de la matriz,
el valor almacenado en `$_` cambia
para convertirse en la última expresión evaluada, 4:

![$_ cambia cuando se evalúan comandos nuevos](images/recently-evaluated-expression-2.png)

## $0 - $4

Los comandos `$0`, `$1`, `$2`, `$3` y `$4` funcionan como una referencia histórica de los últimos cinco elementos DOM que se inspeccionaron en el panel Elements
o los últimos cinco objetos de montón JavaScript que se seleccionaron en el panel Profiles.
`$0` muestra el último elemento u objeto JavaScript seleccionado,
`$1` muestra el penúltimo elemento u objeto seleccionado, etc.

En el siguiente ejemplo,
se selecciona un elemento con la clase `medium` en el panel Elements.
En el panel lateral de la consola, se evaluó `$0`
y se muestra el mismo elemento:

![Ejemplo de $0](images/element-0.png)

En la siguiente imagen se muestra otro elemento seleccionado en la misma página.
`$0` hace referencia al nuevo elemento seleccionado,
mientras que `$1` muestra el elemento previamente seleccionado:

![Ejemplo de $1](images/element-1.png)

## $(selector)

`$(selector)` muestra la referencia al primer elemento DOM
con el selector CSS especificado.
Esta función es un alias de la función
[document.querySelector()](https://docs.webplatform.org/wiki/css/selectors_api/querySelector).

En el siguiente ejemplo se muestra una referencia
al primer elemento `<img>` del documento:

![Ejemplo de $('img')](images/selector-img.png)

Haz clic con el botón secundario derecho en el resultado obtenido y
selecciona “Reveal in Elements Panel” para encontrarlo en el DOM
o “Scroll in to View” para mostrarlo en la página.

En el siguiente ejemplo se muestra una referencia al elemento actualmente seleccionado y se visualiza su propiedad src:

![Ejemplo de $('img').src](images/selector-img-src.png)

Note: Si usas una biblioteca como jQuery que emplea <code>$</code>, esta funcionalidad se sobrescribirá y <code>$</code> corresponderá a la implementación de esa biblioteca.

## $$(selector)

`$$(selector)` muestra una matriz de elementos
que coinciden con el selector CSS en cuestión.
Este comando es equivalente a llamar a
[document.querySelectorAll()](https://docs.webplatform.org/wiki/css/selectors_api/querySelectorAll).

En el siguiente ejemplo, se usa `$$()` para crear una matriz
de todos los elementos `<img>` del documento actual y
se muestra el valor de la propiedad `src` de cada elemento:

		var images = $$('img');
		for (each in images) {
			console.log(images[each].src);
		}

![Ejemplo en el que se usa $$() para seleccionar todas las imágenes del documento y mostrar sus fuentes](images/all-selector.png)

Note: Presiona <kbd class='kbd'>Shift</kbd> + <kbd class='kbd'>Enter</kbd> en la consola para iniciar una línea nueva sin ejecutar la secuencia de comandos.

## $x(path)

`$x(path)` muestra una matriz de elementos DOM
que coinciden con la expresión XPath en cuestión.

Por ejemplo,
a continuación se muestran todos los elementos `<p>` de la página:

		$x("//p")

![Ejemplo en el que se usa un selector XPath](images/xpath-p-example.png)

En el siguiente ejemplo, se muestran todos los elementos `<p>` que 
contienen elementos `<a>`:

		$x("//p[a]")

![Ejemplo en el que se usa un selector XPath más complicado](images/xpath-p-a-example.png)

## clear()

`clear()` borra el historial de la consola.

		clear();

## copy(object)

`copy(object)` envía al portapapeles una copia de una representación de string de un objeto
especificado.

		copy($0);

## debug(function)

Cuando se llama a la función especificada,
se invoca al depurador y la función se desglosa
en el panel Sources para que se pueda recorrer y depurar el código.

		debug(getData);

![Uso de break-inside en una función con debug()](images/debug.png)

Usa `undebug(fn)` para finalizar el desglose de la función
o aplica la IU para inhabilitar todos los puntos de interrupción.

Para obtener más información sobre los puntos de interrupción,
consulta [Realiza depuraciones con puntos de interrupción](/web/tools/chrome-devtools/javascript/add-breakpoints).

## dir(object)

`dir(object)` muestra un listado tipo objeto
de todas las propiedades del objeto especificado.
Este método es un alias del método `console.dir()` de la API de la consola.

En el siguiente ejemplo, se muestra la diferencia entre
evaluar `document.body` directamente en la línea de comandos
y usar `dir()` para mostrar el mismo elemento:

		document.body;
		dir(document.body);

![Registrar document.body con y sin la función dir()](images/dir.png)

Para obtener más información,
consulta la entrada sobre [`console.dir()`](/web/tools/chrome-devtools/debug/console/console-reference#console.dir(object)) en la API de la consola.

## dirxml(object)

`dirxml(object)` muestra una representación XML del objeto especificado,
como se ve en la pestaña Elements.
Este método es equivalente al método [console.dirxml()](https://developer.mozilla.org/en-US/docs/Web/API/Console).

## inspect(object/function) {:#inspect}

`inspect(object/function)` abre y selecciona el elemento
u objeto especificado en el panel correspondiente: el panel Elements para elementos DOM o el panel Profiles para objetos de montón JavaScript.

En el siguiente ejemplo, se abre `document.body` en el panel Elements:

		inspect(document.body);

![Inspeccionar un elemento con inspect()](images/inspect.png)

Cuando se pasa una función a inspect,
la función abre el documento
en el panel Sources para que lo inspecciones.

## getEventListeners(object)

`getEventListeners(object)` muestra los receptores de eventos registrados
en el objeto especificado.
El valor que se muestra es un objeto que contiene una matriz
para cada tipo de evento registrado (“click” o “keydown”, por ejemplo).
Los miembros de cada matriz son objetos
que describen el receptor registrado para cada tipo.
Por ejemplo,
a continuación se enumeran todos los receptores de eventos
registrados en el objeto document:

		getEventListeners(document);

![Resultado de la aplicación de getEventListeners()](images/get-event-listeners.png)

Si hay más de un receptor registrado en el objeto especificado,
la matriz contendrá un miembro para cada receptor.
En el siguiente ejemplo,
hay dos receptores de eventos registrados en el elemento #scrollingList
para el evento “mousedown”:

![Varios receptores](images/scrolling-list.png)

Puedes expandir cada uno de estos objetos para explorar sus propiedades:

![Vista ampliada de un objeto receptor](images/scrolling-list-expanded.png)

## keys(object)

`keys(object)` muestra una matriz con los nombres
de las propiedades del objeto especificado.
Para obtener los valores asociados de las mismas propiedades,
usa `values()`.

Por ejemplo,
supongamos que tu aplicación definió el siguiente objeto:

		var player1 = { "name": "Ted", "level": 42 }

Si suponemos que `player1` se definió en el espacio de nombres global (por cuestiones de simplicidad), escribir `keys(player1)` y `values(player1)` en la consola permitirá obtener
lo siguiente:

![Ejemplo de los métodos keys() y values()](images/keys-values.png)

## monitor(function)

Cuando se llama a la función especificada,
se registra un mensaje en la consola que indica el nombre de la función
y los argumentos pasados
a la función cuando se la llamó.

		function sum(x, y) {
			return x + y;
		}
		monitor(sum);

![Ejemplo del método monitor()](images/monitor.png)

Usa `unmonitor(function)` para detener el control.

## monitorEvents(object[, events])

Cuando uno de los eventos especificados ocurre en el objeto especificado,
el objeto Event se registra en la consola.
Puedes especificar un solo evento para controlar,
una matriz de eventos o uno de los “tipos” de eventos genéricos asignado
a una colección predefinida de eventos. Consulta los siguientes ejemplos.

A continuación, se controlan todos los eventos resize en el objeto window.

		monitorEvents(window, "resize");

![Controlar eventos resize en window](images/monitor-events.png)

En el siguiente ejemplo, se define una matriz para controlar los eventos “resize” y “scroll” en el objeto window:

		monitorEvents(window, ["resize", "scroll"])

También puedes especificar uno de los “tipos” de eventos disponibles
(strings que se asignan a conjuntos predefinidos de eventos).
En la tabla siguiente, se especifican los tipos de eventos disponibles y las asignaciones de
eventos relacionadas:

<table class="responsive">
	<thead>
		<tr>
			<th colspan="2">Tipo de evento &amp; Eventos asignados correspondientes</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>mouse</td>
			<td>“mousedown”, “mouseup”, “click”, “dblclick”, “mousemove”, “mouseover”, “mouseout” y “mousewheel”</td>
		</tr>
		<tr>
			<td>key</td>
			<td>“keydown”, “keyup”, “keypress” y “textInput”</td>
		</tr>
		<tr>
			<td>touch</td>
			<td>“touchstart”, “touchmove”, “touchend” y “touchcancel”</td>
		</tr>
		<tr>
			<td>control</td>
			<td>“resize”, “scroll”, “zoom”, “focus”, “blur”, “select”, “change”, “submit” y “reset”</td>
		</tr>
	</tbody>
</table>

Por ejemplo,
a continuación se usan todos los eventos de teclas correspondientes al tipo de evento “key”
en un campo de texto de entrada actualmente seleccionado en el panel Elements.

		monitorEvents($0, "key");

A continuación, se muestran resultados de ejemplo tras ingresar caracteres en el campo de texto:

![Controlar eventos claves](images/monitor-key.png)

## profile([name]) y profileEnd([name])

`profile()` inicia una sesión de perfilamiento de CPU en JavaScript
con un nombre opcional.
`profileEnd()` completa el perfil y muestra los resultados
en el panel Profile.
También puedes consultar el artículo sobre [cómo acelerar la ejecución de JavaScript](/web/tools/chrome-devtools/rendering-tools/js-execution)).

Para iniciar el perfilamiento:

		profile("My profile")

Para detener el perfilamiento y mostrar los resultados en el panel Profiles:

		profileEnd("My profile")

Los perfiles también pueden anidarse. Por ejemplo, lo siguiente funcionará en cualquier orden:

		profile('A');
		profile('B');
		profileEnd('A');
		profileEnd('B');

Resultado en el panel Profiles:

![Perfiles agrupados](images/grouped-profiles.png)


Note: Múltiples perfiles de CPU pueden operar a la vez y no debes cerrarlos según el orden en que se crearon.

## table(data[, columns])

Registra datos de objetos con formato de tabla: pasa un objeto de datos
con encabezados de columna opcionales.
Por ejemplo,
para mostrar una lista de nombres usando una tabla en la consola,
deberías hacer lo siguiente:

		var names = {
			0: { firstName: "John", lastName: "Smith" },
			1: { firstName: "Jane", lastName: "Doe" }
		};
		table(names);

![Ejemplo del método table()](images/table.png)

## undebug(function)

`undebug(function)` detiene la depuración de la función especificada
para que el depurador no se invoque cuando se llame
a la función.

		undebug(getData);

## unmonitor(function)

`unmonitor(function)` detiene el control de la función especificada.
Se usa junto con `monitor(fn)`.

		unmonitor(getData);

## unmonitorEvents(object[, events])

`unmonitorEvents(object[, events])` detiene los eventos de control
en el objeto y los eventos especificados.
Por ejemplo,
con lo siguiente se detiene todo el control de eventos en el objeto window:

		unmonitorEvents(window);

También puedes dejar de controlar, de manera selectiva, eventos específicos que en un objeto.
Por ejemplo,
el siguiente código inicia el control de todos los eventos del mouse
en el elemento actualmente seleccionado
y, posteriormente, deja de controlar los eventos “mousemove” (posiblemente para disminuir el ruido en la salida de la consola):

		monitorEvents($0, "mouse");
		unmonitorEvents($0, "mousemove");

## values(object)

`values(object)` muestra una matriz con los valores
de todas las propiedades del objeto especificado.

		values(object);




{# wf_devsite_translation #}
