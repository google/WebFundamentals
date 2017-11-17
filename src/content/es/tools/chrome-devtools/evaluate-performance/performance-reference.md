project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: El modo de eventos de la línea de tiempo muestra todos los eventos desencadenados mientras se realiza una grabación. Usa la referencia de eventos de la línea de tiempo para obtener más información sobre cada tipo de evento de esta.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Referencia de los eventos de la línea de tiempo {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}

El modo de eventos de la línea de tiempo muestra todos los eventos desencadenados mientras se realiza una grabación. Usa la referencia de eventos de la línea de tiempo para obtener más información sobre cada tipo de evento de esta.


## Propiedades de eventos comunes de la línea de tiempo

Determinados detalles figuran en los eventos de todos los tipos, mientras que otros solo se aplican a tipos de eventos específicos. En esta sección, se enumeran las propiedades comunes a diferentes tipos de eventos. Las propiedades específicas de determinados tipos de eventos se enumeran en las referencias para los siguientes tipos de eventos.

| Propiedad   |      Cuándo se muestra                                                       |
|----------|:-----------------------------------------------------------------|
| Aggregated time | Para eventos con [eventos anidados](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#view-nested-events), el tiempo que demora cada categoría de eventos.|
| Call Stack | Para eventos con [eventos secundarios](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#view-nested-events), el tiempo que demora cada categoría de eventos.|
| CPU time | El tiempo de CPU que consumió el evento grabado.|
| Details | Otros detalles sobre el evento.
| Duration (en la marca de tiempo) | El tiempo que demoraron el evento y todos sus eventos secundarios para completarse; la marca de tiempo es el tiempo en el que se produjo el evento en relación con el inicio de la grabación.|
| Self time    | El tiempo que demoró el evento sin ninguno de sus eventos secundarios para completarse.|
| Used Heap Size | La cantidad de memoria usada por la app cuando el evento se grabó y el cambio delta (+/-) en el tamaño del montón utilizado desde el último muestreo.|

## Eventos de carga

En esta sección, se enumeran los eventos que pertenecen a la categoría de carga y sus propiedades.

| Evento | Descripción |
|-------|:----------|
|Parse HTML|  Chrome ejecutó el algoritmo de análisis de HTML.|
|Finish Loading|  Solicitud de red completada.|
|Receive Data|  Se recibieron datos para una solicitud. Habrá uno o más eventos Receive Data.|
|Receive Response|  La respuesta HTTP inicial a una solicitud.|
|Send Request|  Se envió una solicitud de la red.|

### Propiedades de los eventos de carga

| Propiedad | Descripción |
|-------|:----------|
|Resource|La dirección URL del recurso solicitado.|
|Preview|Vista previa del recurso solicitado (solo imágenes).|
|Request Method|El método HTTP empleado para la solicitud (GET o POST, por ejemplo).|
|Status Code|El código de la respuesta HTTP.|
|MIME Type|El tipo de MIME del recurso solicitado.|
|Encoded Data Length|La extensión del recurso solicitado en bytes.|

## Eventos de generación se secuencias de comandos

En esta sección, se enumeran los eventos que pertenecen a la categoría de eventos de generación se secuencias de comandos y sus propiedades.

| Evento | Descripción |
|-------|:----------|
|Animation Frame Fired| Se activó un cuadro de animación programado y se invocó el controlador de callback de este.|
|Cancel Animation Frame|  Se canceló cuadro de animación programado.|
|GC Event|  Se recolectaron de elementos no usados.|
|DOMContentLoaded|  El navegador inició [DOMContentLoaded](https://docs.webplatform.org/wiki/dom/events/DOMContentLoaded). Este evento se activa una vez cargado y analizado todo el contenido del DOM de la página.|
|Evaluate Script| Se evaluó una secuencia de comandos.|
|Event| Un evento de JavaScript (por ejemplo, "mousedown" o "key").|
|Function Call| Se realizó una llamada de JavaScript de nivel superior (solo aparece cuando el navegador entra al motor de JavaScript).|
|Install Timer| Se creó un sincronizador con [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) o [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout).|
|Request Animation Frame| Una llamada de `requestAnimationFrame()` programó un marco nuevo.|
|Remove Timer|  Se borró un sincronizador creado previamente.|
|Time|  Una secuencia de comandos llamó a [console.time()](/web/tools/chrome-devtools/debug/console/console-reference#consoletimelabel).|
|Time End|  Una secuencia de comandos llamó a [console.timeEnd()](/web/tools/chrome-devtools/debug/console/console-reference#consoletimeendlabel).|
|Timer Fired| Se activó un sincronizador que se programó con `setInterval()` o `setTimeout()`.|
|XHR Ready State Change|  El estado de listo de XMLHTTPRequest cambió.|
|XHR Load|  Se terminó de cargar `XMLHTTPRequest`.|

### Propiedades de los eventos de secuencias de comandos

| Propiedad | Descripción |
|-------|:----------|
|Timer ID|El ID del sincronizador.|
|Timeout|El tiempo de espera especificado por el sincronizador.|
|Repeats|Valor booleano que especifica si el sincronizador se repite.|
|Function Call|Se invocó una función.|

## Eventos de representación

En esta sección, se enumeran los eventos que pertenecen a la categoría de eventos de representación y sus propiedades.

| Evento | Descripción |
|-------|:----------|
|Invalidate layout| El diseño de la página fue invalidado por un cambio del DOM.|
|Layout|  Se ejecutó el diseño de una página.|
|Recalculate style| Chrome recalculó los elementos de estilo.|
|Scroll|  Se desplazó el contenido de una vista anidada.|

### Propiedades de los eventos de representación

| Propiedad | Descripción |
|-------|:----------|
|Layout invalidated|Para registros de diseño; seguimiento de pila del código que produjo la invalidación del diseño.|
|Nodes that need layout|Para registros de diseño; cantidad de nodos respecto de la cual se indicó la necesidad de diseño antes de que se restableciera el diseño. Usualmente, estos son nodos invalidados por el código del programador, además de una ruta de acceso hacia arriba para rediseñar la raíz.|
|Layout tree size|Para los registros de diseño, la cantidad total de nodos debajo de la raíz de rediseño (el nodo en el que Chrome inicia el rediseño).|
|Layout scope|Los valores posibles son "Partial" (el límite del rediseño es una parte del DOM) o "Whole document".|
|Elements affected|Para los registros de recálculo de estilo, la cantidad de elementos afectados por un recálculo de estilo.|
|Styles invalidated|Para los registros de recálculo de estilo, proporciona el seguimiento de pila del código que originó la invalidación del estilo.|

## Eventos de pintura

En esta sección, se enumeran los eventos que pertenecen a la categoría de eventos de pintura y sus propiedades.

| Evento | Descripción |
|-------|:----------|
|Composite Layers|  Capas de imágenes compuestas del motor de representación de Chrome.|
|Image Decode|  Se decodificó un recurso de imagen.|
|Image Resize|  Se cambiaron las dimensiones nativas de una imagen.|
|Paint| Se pintaron capas compuestas en una sección de la pantalla. Desplazarse sobre un registro de pintura destaca la región de la pantalla que se actualizó.|

### Propiedades de los eventos de pintura

| Propiedad | Descripción |
|-------|:----------|
|Location|Para eventos Paint; coordenadas x e y del rectángulo de pintura.|
|Dimensions|Para eventos Paint; altura y ancho de la región de pintura.|




{# wf_devsite_translation #}
