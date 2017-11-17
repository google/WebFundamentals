project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Command Line API de Chrome DevTools ofrece varias formas de observar e inspeccionar a los receptores de eventos

{# wf_updated_on: 2015-08-02 #}
{# wf_published_on: 2015-04-13 #}

# Controlar eventos {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
Command Line API de Chrome DevTools ofrece varias formas de observar e inspeccionar a los receptores de eventos. JavaScript tiene una función fundamental en las páginas interactivas, y el navegador te proporciona herramientas útiles para depurar eventos y controladores de eventos.


### TL;DR {: .hide-from-toc }
- Escucha a los eventos de un tipo determinado mediante <code>monitorEvents()</code>.
- Usa <code>unmonitorEvents()</code> para dejar de escuchar.
- Obtén receptores de un elemento del DOM mediante <code>getEventListeners()</code>.
- Usa el panel Event Listeners Inspector para obtener información acerca de receptores de eventos.


## Controla los eventos

El método [monitorEvents()](/web/tools/chrome-devtools/debug/command-line/command-line-reference#monitoreventsobject-events)
le indica a DevTools que registre información sobre los objetivos especificados.

El primer parámetro es el objeto a controlar.
Se muestran todos los eventos si no se proporciona un segundo parámetro.
Para especificar qué eventos escuchar,
pasa una cadena o una matriz de cadenas como segundo parámetro.

Escucha a los eventos de clic en el cuerpo de la página:

    monitorEvents(document.body, "click");

Si el evento controlado es un *tipo de evento* admitido
que DevTools asigna a un conjunto de nombres de eventos estándar,
el método escucha a los eventos de ese tipo.

[Command Line API](/web/tools/chrome-devtools/debug/command-line/command-line-reference) cuenta con una admisión completa de *tipos de eventos* para los eventos que cubren.

Para detener el control de eventos,
llama al método `unmonitorEvents()` y proporciónale el objeto para dejar de controlar.

Deja de escuchar eventos en el objeto `body` :

    unmonitorEvents(document.body);

## Ver receptores de eventos registrados en objetos

La [API getEventListeners() ](/web/tools/chrome-devtools/debug/command-line/command-line-reference#geteventlistenersobject)
muestra los receptores de eventos registrados en el objeto especificado.

El valor mostrado es un objeto que contiene una matriz para cada tipo de evento registrado (por ejemplo, `click` o`keydown`).
Los miembros de cada matriz son objetos que describen
al receptor registrado para cada tipo.
Por ejemplo,
el siguiente código enumera todos los receptores de eventos registrados en el objeto del documento:

    getEventListeners(document);

![Resultado de la aplicación de getEventListeners()](images/events-call-geteventlisteners.png)

Si más de un receptor está registrado en el objeto especificado,
la matriz contiene un miembro para cada receptor.
En el siguiente ejemplo
hay dos receptores de eventos registrados en el elemento #scrollingList para el `mousedown` evento:

![Vista de los receptores de eventos adjuntados a mousedown](images/events-geteventlisteners_multiple.png)

Además, amplía cada uno de estos objetos para explorar sus propiedades.

![Vista ampliada de un objeto receptor](images/events-geteventlisteners_expanded.png)

## Ver los receptores de eventos registrados en los elementos del DOM

De manera predeterminada,
el panel *Event Listeners* en Elements Inspector muestra todos los eventos adjuntados a una página:

![Panel Event listeners](images/events-eventlisteners_panel.png)

El filtro limita los eventos al nodo seleccionado:

![Panel Event listeners, filtrado únicamente por el nodo seleccionado](images/events-eventlisteners_panel_filtered.png)

Al expandir el objeto, el panel muestra los detalles del receptor de eventos.
En este ejemplo,
la página tiene dos receptores de eventos adjuntados a través de jQuery:

![Vista ampliada de los receptores de eventos](images/events-eventlisteners_panel_details.png)



{# wf_devsite_translation #}
