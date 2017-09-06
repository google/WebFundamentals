project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Usa puntos de interrupción para pausar tu código JavaScript e investigar los valores de las variables y la pila de llamadas en ese momento en particular.

{# wf_updated_on: 2016-07-17 #}
{# wf_published_on: 2015-04-13 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# Cómo establecer puntos de interrupción {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Usa puntos de interrupción para pausar tu código JavaScript e investigar
los valores de las variables y la pila de llamadas en ese momento
en particular.

Una vez que hayas establecido tus puntos de interrupción, aprende cómo recorrer el código
e investigar tus variables y pilas de llamadas en [Cómo recorrer tu
código](step-code).


### TL;DR {: .hide-from-toc }
- El modo más básico de establecer un punto de interrupción es agregarlo manualmente en una línea de código específica. Puedes configurar estos puntos de interrupción para que solo se activen cuando se cumple una determinada condición.
- También puedes establecer puntos de interrupción que se activen cuando se cumplan condiciones generales, como un evento, un cambio de DOM o una excepción no detectada.


## Configura un punto de interrupción en una línea de código específica {:#line-number}

Configurar un punto de interrupción en una línea de código específica es útil cuando sabes
qué declaración quieres investigar. Por ejemplo, si tu flujo de trabajo
de acceso no funciona como se espera y solo hay una función en
el código que gestiona dicho acceso, casi con total seguridad el error
se encontrará en esta función. En este escenario, tiene sentido agregar un
punto de interrupción en la primera línea de esa función.

Cuando estableces un punto de interrupción en una línea de código, este siempre se interrumpirá en esa
línea de código hasta que borres el punto de interrupción, lo inhabilites o lo hagas
condicional.

Para establecer un punto de interrupción en una línea de código específica, primero abre el panel **Sources**
, y luego selecciona la secuencia de comandos del panel **File Navigator** que se encuentra a la
izquierda. Si no puedes ver el panel **File Navigator**, presiona el botón para **activar o desactivar File
Navigator** 
(![botón para mostrar u ocultar File Navigator][fn]{:.devtools-inline}).


**Sugerencia**: Si trabajas con código reducido, presiona el botón **Pretty-Print**
 
(![botón Pretty-Print][pp]{:.devtools-inline})
para que sea legible. 

Puedes ver el número de las líneas a la izquierda de tu código fuente. Esta región
se llama **medianil del número de línea**. Haz clic dentro del medianil del número de línea para
agregar un punto de interrupción en esa línea de código.

![punto de interrupción del número de línea][lnb]

Si una expresión se divide en varias líneas y se coloca un punto de interrupción
de línea en el medio de la expresión, DevTools establece el punto de interrupción
en la siguiente expresión. Por ejemplo, si intentas establecer un punto de interrupción en la línea
4 en la siguiente captura de pantalla, DevTools coloca un punto de interrupción en la línea 6.

![punto de interrupción de mitad de expresión](imgs/mid-expression-breakpoint.png)

[pp]: imgs/pretty-print.png
[fn]: imgs/file-navigator.png
[lnb]: imgs/line-number-breakpoint.png

### Haz un punto de interrupción de número de línea condicional

Un punto de interrupción condicional solo se ejecuta cuando la condición que especificas
es verdadera.

Haz clic con el botón secundario en un número de línea que aún no tenga un punto de interrupción y
presiona **Add conditional breakpoint** para crear un punto de interrupción condicional.
Si ya agregaste un punto de interrupción en una línea de código y quieres hacer 
ese punto de interrupción condicional, haz clic con el botón secundario y presiona **Edit breakpoint**.

Ingresa tu condición en el campo de texto y presiona <kbd>Enter</kbd>.

![agregar condición][ac]

Los puntos de interrupción condicionales se muestran en dorado. 

![punto de interrupción condicional][cb]

[ac]: imgs/adding-condition.png
[cb]: imgs/conditional-breakpoint.png

### Borra o inhabilita un punto de interrupción de número de línea

Si deseas ignorar temporalmente un punto de interrupción, puedes inhabilitarlo.
Haz clic con el botón secundario dentro del **medianil del número de línea** y selecciona **Disable
breakpoint**.

![inhabilitar punto de interrupción][db]

Si ya no necesitas un punto de interrupción, bórralo. Haz clic con el botón secundario dentro del 
**medianil del número de línea** y selecciona **Remove breakpoint**.

También puedes administrar los puntos de interrupción de número de línea en todas tus
secuencias de comandos desde un solo lugar. Ese lugar es el panel **Breakpoints** 
 del panel **Sources**.

Para borrar un punto de interrupción desde la IU del panel **Breakpoints**, haz clic con el botón secundario sobre el punto de interrupción
y selecciona **Remove breakpoint**.

![panel de puntos de interrupción][bp]

Para inhabilitar un punto de interrupción desde este panel, inhabilita su casilla de verificación.

Para inhabilitar todos los puntos de interrupción, haz clic con el botón secundario desde este panel y selecciona **Deactivate
breakpoints**. De esta manera, se produce el mismo efecto que con la opción **Disable All
Breakpoints**.

Otra opción para inhabilitar todos los puntos de interrupción es presionar el botón **para desactivar
puntos de interrupción** 
(![desactivar puntos de interrupción][dbb]{:.devtools-inline}), también en el panel 
**Sources**.

[db]: imgs/disable-breakpoint.png
[bp]: imgs/breakpoints-pane.png
[dbb]: imgs/deactivate-breakpoints-button.png

## Establece un punto de interrupción en un cambio de DOM {:#dom}

Usa un punto de interrupción en un cambio de DOM cuando hay un error en tu código que está cambiando
, borrando o agregando un nodo del DOM de forma incorrecta.

En lugar de hacer una búsqueda manual en el código que está causando el cambio,
DevTools te permite establecer un punto de interrupción en el nodo. Cada vez que se agrega, borra o cambia el nodo o,
en algunos casos, uno de sus nodos secundarios,
DevTools interumpe la página y te transporta a la línea de código exacta que
está causando el cambio.

A continuación incluimos una demostración en vivo para aprender a establecer puntos de interrupción de cambios de DOM.
Al hacer clic en **Increment** se incrementa **Count** en una unidad. Inténtalo ahora.

Tu objetivo en este instructivo interactivo es establecer un punto de interrupción de cambio de DOM
que se active cuando aumenta el número de **Count**, de manera de poder inspeccionar el
código que está modificando **Count**.

{% framebox height="auto" %}
<p><b>Demostración de los puntos de interrupción de cambio de DOM</b></p>
<button>Increment</button>
<p>Count: <span>0</span></p>
<script>
var buttons = document.querySelectorAll('button');
var increment = buttons[0];
var toggle = buttons[1];
var count = document.querySelector('span');
increment.addEventListener('click', function() {
  count.textContent = parseInt(count.textContent) + 1;
});
</script>
{% endframebox %}

Para**agregar el punto de interrupción de cambio de DOM**:

1. Haz clic con el botón secundario en **Count** y selecciona **Inspect**. DevTools destaca
el nodo azul. Debe ser un nodo `<p>`. Puedes verificar que estás en el
   nodo correcto al hacer doble clic en él, lo cual expande el nodo de manera tal que puedes
   ver su contenido.

1. Haz clic con el botón secundario en el nodo destacado y selecciona  **Break on** >
   **Subtree Modifications**. El ícono azul ![ícono del punto de interrupción DOM
][icon]{:.devtools-inline} que se encuentra a la izquierda del nodo indica que se estableció un punto de interrupción DOM
    en el nodo. Es un poco difícil ver el ícono mientras
el nodo está destacado, ya que es un ícono azul contra un fondo azul.


1. De regreso a la demostración, haz clic en **Increment**. DevTools interrumpe la página, va a
**Sources** y destaca la línea de código en la secuencia de comandos que está 
causando el cambio.

1. Presiona **Resume script execution** ![botón para reanudar la ejecución de la secuencia de
   comandos][resume]{:.devtools-inline} dos veces para reanudar
   la ejecución de la secuencia de comandos. Debes presionarlo dos veces porque el punto de interrupción
 se ejecuta una vez que el texto del conteo se borra, y luego una vez más cuando el
 texto se actualiza con el nuevo conteo.

[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png

Para interrumpir cuando cambia un atributo del nodo seleccionado, o cuando se borra el 
nodo seleccionado, simplemente selecciona **Attributes modifications** o
**Node Removal** en lugar de **Subtree modifications**, como se indica en el paso 2.

Sugerencia: Estos puntos de interrupción no son exclusivos Puedes tener dos o los tres puntos de interrupción habilitados en un mismo nodo al mismo tiempo.

Para **desactivar temporalmente el punto de interrupción**:

1. En DevTools, regresa a **Elements**.
1. Haz clic en **DOM Breakpoints**. Si tu ventana de DevTools es pequeña, es posible que **DOM
 Breakpoints** esté oculto detrás del menú ampliado ![menú
 ampliado][overflow]{:.devtools-inline}. Debes ver una casilla de verificación con el texto `p`
 junto a ella, y **Subtree Modified** debajo de `p`.
1. Inhabilita la casilla de verificación junto a **Subtree Modified**.
1. Intenta hacer clic en **Increment** otra vez. El contador se incrementa y DevTools ya no
 pausa la página.

Sugerencia: Desplázate sobre `p` para destacar el nodo en la ventana de visualización. Haz clic en `p` para
seleccionar el nodo en **Elements**.

Para **borrar el punto de interrupción**:

1. Ve a **DOM Breakpoints**.
1. Haz clic con el botón secundario en el punto de interrupción que quieres borrar y selecciona
 **Remove breakpoint**.

[icon]: imgs/dom-breakpoint-icon.png
[overflow]: imgs/overflow.png

### Más información sobre los tipos de puntos de interrupción de cambios de DOM

Aquí podrás encontrar información detallada sobre cómo y cuando exactamente se ejecuta cada tipo de punto de interrupción de cambio de DOM:


* **Subtree modifications**: se ejecuta cuando se borra o se agrega un campo secundario del nodo
 actualmente seleccionado o se modifican los contenidos de dicho campo. No
 se ejecuta cuando cambian los atributos del nodo secundario ni cuando se realizan cambios del
 nodo actualmente seleccionado.

* **Attributes modifications**: se ejecuta cuando se agrega o quita un atributo
 del nodo actualmente seleccionado, o cuando cambia el valor de un atributo.

* **Node Removal**: Se ejecuta cuando se quita el nodo actualmente seleccionado.

## Interrupción en XHR

Existen dos maneras de activar puntos de interrupción en XHRs: cuando *cualquier* XHE alcanza
una determinada etapa del ciclo de vida del XHR (`readystatechange`, `load`, etc.), o
cuando la URL de un XHR coincide con una determinada string. 

Si quieres interrumpir en una determinada etapa del ciclo de vida del XHR, comprueba la categoría del
**XHR** en el [panel de puntos de interrupción del gestor de eventos](#events).

Para interrumpir cuando la URL de un XHR coincide con una string determinada, usa el panel **XHR
Breakpoints** del panel **Sources**. 

![Panel de puntos de interrupción XHR][xbp]

[xbp]: imgs/xhr-breakpoints-pane.png

Haz clic en el botón del signo más para agregar un nuevo patrón de punto de interrupción. Ingresa la string
en el campo de texto y presiona <kbd>Enter</kbd> para guardarlo.

**Sugerencia**: Haz clic en el signo más y luego presiona inmediatamente <kbd>Enter</kbd> para
ejecutar un punto de interrupción antes de que se envíe cualquier XHR.

## Interrupción cuando se activa un evento {:#events}

Usa el panel **Event Listener Breakpoints** del panel **Sources** para 
interrumpir cuando se activa un determinado evento (p. ej. `click`) o una categoría de eventos (por ejemplo, cualquier
evento del`mouse`).

![panel de puntos de interrupción del gestor de eventos][elbp]

El nivel superior representa las categorías de eventos. Activa una de estas casillas de verificación
para realizar una pausa cuando se active cualquier evento de la categoría. Expande
la categoría de nivel superior para ver qué eventos incluye.

Si quieres controlar un evento específico, busca la categoría de nivel superior a la que
pertenece el evento, y habilita la casilla de verificación junto al evento objetivo.

![panel de puntos de interrupción del gestor de eventos expandido][eelbp]

[elbp]: imgs/event-listener-breakpoints-pane.png

[eelbp]: imgs/expanded-event-listener-breakpoints-pane.png

## Puntos de interrupción de excepción {:#exceptions}

Usa puntos de interrupción de excepción para pausar un script cuando se
produce una excepción y luego salta hacia la línea de código que produce
la excepción.

La demostración que aparece a continuación contiene un error. Sigue las instrucciones que aparecen a continuación
para aprender a corregir el error mediante un punto de interrupción de excepción.

{% framebox height="auto" width="auto" %}
<button>Print Random Number</button>
<p>Random Number: <span></span></p>
<script type="text/javascript">
  var nodes = {};
  nodes.button = document.querySelector('button');
  nodes.num = document.querySelector('span');
  nodes.button.addEventListener('click', function onClick() {
    nodes.number.textContent = Math.random();
  });
</script>
{% endframebox %}

1. Haz clic en **Print Random Number**. El propósito de la etiqueta **Random Number** que aparece debajo del
   botón es emitir un número aleatorio, pero eso no está sucediendo.
   Ese es el error que vas a corregir.
1. Presiona <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) o
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows, Linux) para
   abrir DevTools.
1. Haz clic en la pestaña **Sources**.
1. Haz clic en **Pause on exceptions** ![Pausar en
   excepciones][pause on exception]{:.devtools-inline}.
1. Haz clic en **Print Random Number** otra vez para activar el punto de interrupción.
   DevTools debe pausarse en la línea de código que contiene
   `nodes.number.textContent = Math.random();`. Ahora conoces todo lo que
   necesitas para usar puntos de interrupción de excepción. El resto de las instrucciones
   explican cómo corregir este error específico.
1. En la línea de código donde DevTools está en pausa actualmente, desplázate sobre `nodes`
   para asegurarte de que se haga referencia al objeto de forma correcta. Debes ver
   que contiene tres propiedades: `button`, `num` y `__proto__`.
   Todo parece estar bien aquí, esta no es la fuente del error.
1. Desplázate sobre `number`. Debes ver que está evaluando hasta `undefined`.
   Esta es la causa del error. El nombre de la propiedad debe ser
   `num`, no `number`.
1. En DevTools, cambia `nodes.number.textContent` por `nodes.num.textContent`.
1. Presiona <kbd>Command</kbd>+<kbd>S</kbd> (Mac) o
   <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux) para guardar tu cambio.
   DevTools reanuda automáticamente la ejecución de la secuencia de comandos una vez que se guarda.
1. Presiona **Print Random Number** otra vez para asegurarte de que tu corrección solucionó
   el error. DevTools no debe pausarse más luego de hacer clic en el botón, lo que
   significa que la secuencia de comandos ya no produce ninguna excepción.

[pause on exception]: /web/tools/chrome-devtools/images/pause-on-exception.png


{# wf_devsite_translation #}
