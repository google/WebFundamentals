project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: En la vista de árbol del DOM del panel Elements de Chrome DevTools se muestra la estructura del DOM de la página web actual. Edita en tiempo real el contenido y la estructura de tu página mediante actualizaciones del DOM.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-29 #}

# Editar el DOM {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

En la vista de árbol del DOM del panel Elements de Chrome DevTools se muestra la estructura del DOM de la página web actual. Edita en tiempo real el contenido y la estructura de tu página mediante actualizaciones del DOM.


### TL;DR {: .hide-from-toc }
- El DOM define la estructura de tu página. Cada nodo del DOM es un elemento de la página, por ejemplo, un nodo encabezado, nodo párrafo.
- Edita en vivo el contenido y la estructura de tus páginas a través del DOM representado.
- Pero recuerda que no puedes modificar archivos de origen a través de cambios del DOM en el panel Elements. Volver a cargar la página borra las modificaciones del árbol del DOM.
- Observa si hay cambios en el DOM usando los puntos de interrupción del DOM.


## Inspeccionar un elemento {:#inspect-an-element}

Usa el **panel Elements** para inspeccionar todos los elementos en tu página en un
árbol del DOM. Selecciona cualquier elemento e inspecciona los estilos que se les aplicó.

<video autoplay muted src="animations/inspect-element.mp4">
</video>

Existen varias formas de inspeccionar un elemento:

Haz clic con el botón secundario en cualquier elemento de la página y selecciona **Inspect**.

![Inspeccionar un elemento a través del clic del botón secundario](/web/tools/chrome-devtools/inspect-styles/imgs/right-click-inspect.png)

Presiona <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd>
+ <kbd class="kbd">C</kbd> (Windows) o <kbd class="kbd">Cmd</kbd>
+ <kbd class="kbd">Mayús</kbd> + <kbd class="kbd">C</kbd> (Mac) para abrir
DevTools en el modo Inspect Element y, a continuación, desplázate sobre un elemento. DevTools
destaca automáticamente el elemento sobre el que te desplazas en el panel
**Elements**. Haz clic en el elemento para salir del modo de inspección. El elemento se mantiene
destacado en el panel **Elements**. 

Haz clic en el botón **Inspect Element** 
![Ícono de inspeccionar](/web/tools/chrome-devtools/inspect-styles/imgs/inspect-icon.png){:.inline}
para ir a Inspect Element Mode y luego haz clic en un elemento.

Usa el método [`inspect`][inspect] en la consola, como
`inspect(document.body)`.

## Navegar por el DOM

Navega a través de la estructura del DOM usando tu mouse o teclado.

Un nodo colapsado tiene una flecha a su lado que apunta hacia la derecha:
![nodo colapsado](imgs/collapsed-node.png){:.inline}

Un nodo expandido tiene una flecha a su lado que apunta hacia abajo:
![nodo expandido](imgs/expanded-node.png){:.inline}

Con tu mouse:

* Haz clic una vez para destacar un nodo.
* Para expandir un nodo, haz doble clic en cualquier parte de este o en la flecha que  
  está junto a él.
* Para colapsar a un nodo, haz clic en la flecha a su lado.

Con tu teclado:

* Presiona la tecla de **dirección hacia arriba** para seleccionar el nodo que se halla antes del nodo actual.
* Presiona la tecla de **dirección hacia abajo** para seleccionar el nodo que se halla después del nodo actual.
* Presiona la tecla de **dirección hacia derecha** para expandir un nodo contraído. Vuelve a
  presionarla para mover el primer elemento secundario del nodo (ahora expandido). Puedes 
  usar esta técnica para navegar con rapidez por los nodos profundamente anidados.

### Navegar por el recorrido de la ruta de navegación

En la parte inferior del panel Elements aparece un recorrido de la ruta de navegación. 

![Recorrido de la ruta de navegación](imgs/breadcrumb-body.png)

El nodo seleccionado actualmente se destaca con color azul. El nodo que se halla la izquierda es
el elemento primario del nodo actual. Y a su izquierda se encuentra el elemento primario del nodo primario
y así sucesivamente durante todo el trayecto hacia arriba del árbol.

![Extender recorrido de ruta de navegación](imgs/breadcrumb-footer.png)

Volver a navegar hacia arriba de la estructura mueve lo destacado:

![Navegar hacia arriba del recorrido de ruta de navegación](imgs/breadcrumb-trail.png)

DevTools muestra la mayor cantidad posible de elementos en el recorrido.
Si todo el recorrido no cabe en la barra de estado, se muestra una elipsis (...) 
donde se ha truncado el recorrido. Haz clic en la elipsis pare mostrar los 
elementos ocultos:

![Elipsis de ruta de navegación](imgs/breadcrumb-ellipsis.png)

## Editar nodos y atributos del DOM

Para editar el nombre o atributo de un nodo del DOM:

* Haz doble clic directamente en el nombre o el atributo del nodo.
* Destaca el nodo, presiona <kbd>Enter</kbd> y luego presiona <kbd>Tab</kbd>
  hasta que se seleccione el nombre o atributo.
* Abre el [menú de más acciones](#more-actions) y selecciona **Add Attribute** 
  o **Edit Attribute**. **Edit Attribute** depende del contexto; la parte donde haces clic determina lo que se edita.


La etiqueta de cierre se actualiza automáticamente cuando terminas.

<video autoplay muted src="animations/edit-element-name.mp4">
</video>

### Editar el nodo del DOM y sus elementos secundarios como HTML

Para editar un nodo del DOM y sus elementos secundarios como HTML:

* Abre el [menú de más acciones](#more-actions) y selecciona **Edit as HTML**. 
* Presiona <kbd>F2</kbd> (Windows/Linux) o <kbd>Fn</kbd>+<kbd>F2</kbd> (Mac).
* Presiona <kbd>Ctrl</kbd>+<kbd>Intro</kbd> (Windows/Linux) o 
  <kbd>Cmd</kbd>+<kbd>Intro</kbd> (Mac) para guardar los cambios. 
* Presiona <kbd>Esc</kbd> para salir del editor sin guardar.

![editar como HTML](imgs/edit-as-html.png)

## Mover el nodo del DOM

Haz clic en un nodo, mantenlo presionado y muévelo.

<video autoplay muted src="animations/move-node.mp4">
</video>

## Borrar nodo del DOM

Para borrar un nodo del DOM:

* Abre el [menú de más acciones](#more-actions) y selecciona **Delete Node**.
* Selecciona el nodo y presiona la tecla <kbd>Delete</kbd>.

Note: Si borras un nodo por accidente, presiona <kbd class='kbd'>Ctrl</kbd> + <kbd class='kbd'>Z</kbd> (o <kbd class='kbd'>Cmd</kbd> + <kbd class='kbd'>Z</kbd> en Mac) para deshacer tu última acción.

## Mostrar el menú more actions {:#more-actions}

El menú **more actions** te permite interactuar con un nodo del DOM de diversas
maneras. Para ver el menú, haz clic con el botón secundario en un nodo o selecciona un nodo
y luego presiona el botón de **más acciones** (![botón 
more actions](imgs/more-actions-button.png){:.inline}). El botón solo 
se muestra en el elemento actualmente seleccionado.

![menú more actions] (imgs/more-actions-menu.png)

## Desplazar en la vista

Cuando te desplazas por un nodo del DOM o lo seleccionas, el nodo representado se destaca 
en la ventana de visualización. En caso de que el nodo se desplace fuera de la pantalla, verás
información sobre la herramienta en la parte superior de la ventana de visualización si el nodo está encima de
esta; en cambio, la información aparecerá en la parte inferior si el nodo se encuentra debajo de la ventana de visualización
actual. Por ejemplo, en la siguiente captura de pantalla DevTools indica que el
elemento seleccionado actualmente en el panel **Elements** está debajo de la ventana de visualización.

![elemento debajo de la ventana de visualización](imgs/below-viewport.png)

Para desplazar la página para que el nodo aparezca en la ventana de visualización,
**haz clic con el botón secundario** en el nodo y selecciona **Scroll into View**.

## Establecer puntos de interrupción del DOM

Establece puntos de interrupción del DOM para depurar apps JavaScript complejas.
Por ejemplo, si tu JavaScript cambia el estilo de un elemento del DOM,
establece un punto de interrupción del DOM para que se desencadene cuando los atributos del elemento se cambian. Desencadena un punto de interrupción en uno de los siguientes cambios del DOM: cambio del subárbol, cambio de atributo, eliminación de nodo.

{# include shared/related_guides.liquid inline=true list=page.related-guides.breakpoints #}

### Modificaciones del subárbol

El punto de interrupción de modificación de un subárbol se desencadena cuando se agrega un elemento secundario, se lo elimina o se lo mueve. Por ejemplo, si estableces un punto de interrupción de modificación de un subárbol en el elemento `main-content`, el siguiente código activa el punto de interrupción:


    var element = document.getElementById('main-content');
    //modify the element's subtree.
    var mySpan = document.createElement('span');
    element.appendChild( mySpan );
    

### Modificaciones de atributo

Una modificación de atributo se produce cuando el atributo de un elemento (`class, id, name`) se cambia dinámicamente:


    var element = document.getElementById('main-content');
    // class attribute of element has been modified.
    element.className = 'active';
    

### Eliminación de nodo

La modificación de eliminación de un nodo se desencadena cuando el nodo
en cuestión es eliminado del DOM:


    document.getElementById('main-content').remove();
    

## Interactuar con puntos de interrupción del DOM

Los paneles Elements y Sources incluyen un panel para gestionar los puntos de interrupción
de tu DOM.

Cada punto de interrupción está enumerado con un identificador de elemento y el tipo de punto de interrupción.

![Panel de puntos de interrupción del DOM](imgs/dom-breakpoints-pane.png)

Interactúa con cada punto de interrupción enumerado en cualquiera de las siguientes maneras:

* **Desplázate** sobre el identificador del elemento para ver la posición correspondiente 
  del elemento en la página (esto es similar a desplazarte sobre los nodos en el panel Elements).
* **Haz clic** en un elemento en el panel Elements.
* **Activa o desactiva** la casilla de verificación para habilitar o inhabilitar el punto de interrupción.

Cuando desencadenas un punto de interrupción del DOM, este se destaca en el panel Breakpoints 
del DOM. El panel **Call Stack** muestra la **razón** por la que se produce una 
pausa en el depurador:

![Razón del punto de interrupción](imgs/breakpoint-reason.png)

## Ver receptores de eventos de elementos

Ve los receptores de eventos de JavaScript asociados con un nodo del DOM en el panel 
**Event Listeners**. 

![panel event listeners](imgs/event-listeners-pane.png)

Los elementos de nivel superior en el panel Event Listeners muestran los tipos de eventos que 
tienen receptores registrados.

Haz clic en la flecha al lado del tipo de evento (por ejemplo `click`) para ver 
una lista de los controladores de eventos registrados. Cada controlador está identificado por un 
identificador de elementos de tipo selector de CSS, como `document` o 
`button#call-to-action`. Si se registra más de un controlador para el 
mismo elemento, este se enumera de manera repetida.

Haz clic en la flecha del expansor que está al lado del identificador de un elemento para ver las propiedades del controlador de eventos. El subpanel Event Listeners enumera las siguientes propiedades para cada controlador:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Propiedades del receptor de eventos y descripción</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
      <td data-th="Value"><code>controlador</code></td>
      <td data-th="Description">Contiene una función callback. Haz clic con el botón secundario en la función y selecciona <strong>Show Function Definition</strong> para ver dónde se define la función (en caso de que el código fuente esté disponible).</td>
    </tr>
    <tr>
      <td data-th="Value"><code>useCapture</code></td>
      <td data-th="Description">Un valor booleano que indica si se estableció el marcador <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener">useCapture</a>  <code>addEventListener</code>.</td>
    </tr>
  </tbody>
</table>

Note: Muchas extensiones de Chrome agregan sus propios receptores de eventos en el DOM. Si ves una serie de receptores de eventos que no son establecidos por tu código, puede que desees reabrir tu página en una [Ventana de incógnito](https://support.google.com/chrome/answer/95464). Las ventanas de incógnito evitan que las extensiones se ejecuten de manera predeterminada.

### Ver receptores de eventos antecesores

{% comment %}

código para captura de pantalla

<!doctype html>
<html>
<body onload="console.log('onload');">
  <div onfocus="console.log('focus');">
    <button id="button" onclick="console.log('onclick');">haz clic aquí</button>
  </div>
</body>
</html>

{% endcomment %}

Cuando se habilita la casilla de verificación **Ancestors** , se muestran los receptores de eventos para los  
antecesores del nodo seleccionado actualmente, además de los receptores de eventos de
dicho nodo.

![antecesores habilitados](imgs/ancestors-enabled.png)

Cuando se inhabilita la casilla de verificación, solo se muestran los receptores de eventos para el 
nodo seleccionado actualmente.

![antecesores inhabilitados](imgs/ancestors-disabled.png)

### Ver receptores de marcos

{% comment %}

código para captura de pantalla

<!doctype html>
<html>
<script src="https://code.jquery.com/jquery-2.2.0.js"></script>
<body>
  <button id="button">haz clic aquí</button>
  <script>
    $('#button').click(function() {
      $('#button').text('hehe, that tickled, thanks');
    });
  </script>
</body>
</html>

{% endcomment %}

Algunos frameworks y algunas bibliotecas de JavaScript incluyen los eventos nativos del DOM 
en sus API de eventos personalizadas. En el pasado, debido a esto era difícil inspeccionar los receptores de eventos
con DevTools, porque la definición de la función solo hacía referencia al 
código del marco o la biblioteca. La función **Framework listeners** resuelve 
este problema.

Cuando se habilita la casilla de verificación **Framework listeners** , DevTools de manera automática
resuelve el marco o la parte que abarca la biblioteca del código del evento y
luego te indica dónde delimitaste realmente el evento en tu propio código.

![receptores de marcos habilitados](imgs/framework-listeners-enabled.png)

Cuando la casilla de verificación **Framework listeners** está inhabilitada, el código de receptor de eventos
probablemente resolverá en alguna parte del código del marco o la biblioteca. 

![receptores de marcos inhabilitados](imgs/framework-listeners-disabled.png)



[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
