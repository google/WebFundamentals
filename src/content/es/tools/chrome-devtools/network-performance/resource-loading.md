project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mide el rendimiento de la red de tu app web mediante el panel de red de Chrome DevTools.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

# Cómo medir los tiempos de carga de los recursos {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}


Warning: Esta página es obsoleta. En la parte superior de la sección, hay un
vínculo a una página actualizada donde puedes encontrar información similar.

Mide el rendimiento de red de tu sitio con el panel de
<strong>Network</strong>.


El panel de **Network** registra información sobre cada operación de red en
una página, incluidos detalles de sincronización, encabezados de solicitud y respuesta
HTML, cookies y mucho más.


### TL;DR {: .hide-from-toc }
- Usa el panel de Network para registrar y analizar la actividad de la red.
- Visualiza información de carga de manera global o por recursos individuales.
- Filtra y ordena la manera en que se muestran los recursos.
- Guarda, copia y borra grabaciones de red.
- Personaliza el panel de Network según tus necesidades.

## Descripción general del panel de Network

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta las siguientes secciones para obtener información
  actualizada:
  <ul>
    <li><a href="reference#controls">Controles del panel</a></li>
    <li><a href="reference#filters">Filtros del panel</a></li>
    <li><a href="reference#overview">Descripción general del panel</a></li>
    <li><a href="reference#requests">Solicitudes del panel</a></li>
    <li><a href="reference#summary">Resumen del panel</a></li>
  </ul>
</aside>

El panel de Network incluye cinco subpaneles:

1. **Controls**: Usa estas opciones para controlar la visualización y el funcionamiento
   del panel de **Network**.
2. **Filters**: Usa estas opciones para controlar los recursos que se muestran en
   **Requests Table**. Sugerencia: Mantén presionado <kbd>Cmd</kbd> (Mac) o <kbd>Ctrl</kbd>
   (Windows/Linux) y, luego, haz clic en un filtro para seleccionar varios
   al mismo tiempo.
3. **Overview**: En este gráfico, se muestra una línea de tiempo del momento en que se mostraron los recursos.
   Si ves varias barras apiladas verticalmente, significa que esos recursos
   se recuperaron de forma simultánea.
4. **Requests Table**. En esta tabla, se enumeran todos los recursos recuperados.
   De manera predeterminada, la tabla está organizada cronológicamente, y los recursos más
   recientes aparecen en la parte superior.
   Si haces clic en el nombre de un recurso, se muestra más información sobre él.
   Sugerencia: Haz clic con el botón derecho en cualquiera de los encabezados de la tabla, a excepción de **Timeline**, para
   agregar o quitar columnas de información.
5. **Summary**: A simple vista, este panel indica la cantidad total de solicitudes,
    la cantidad de datos transferidos y los tiempos de carga.

![subpaneles del panel network](imgs/panes.png)

El subpanel **Requests Table** muestra las siguientes columnas de manera predeterminada. Puedes
[agregar o quitar columnas](#add-and-remove-table-columns).

* **Name**: Indica el nombre del recurso.
* **Status**: Indica el código de estado HTTP.
* **Type**: Indica el tipo de MIME del recurso solicitado.
* **Initiator**: Indica qué objeto o proceso inició la solicitud. Puede
  tener uno de los siguientes valores:
  * **Parser**: Es el analizador HTML de Chrome que inicia la solicitud.
  * **Redirect**: Es el redireccionamiento HTTP que inició la solicitud.
  * **Script**: Es la secuencia de comandos que inicia la solicitud.
  * **Other**: Es algún otro proceso o acción que inicia la solicitud,
    como la navegación del usuario hacia una página a través de un vínculo o del ingreso de una
    URL en la barra de direcciones.
* **Size**: Es el tamaño combinado de los encabezados de la respuesta (generalmente,
  algunos cientos de bytes), más el cuerpo de la respuesta, tal como la proporcionó el servidor.
* **Time**: Es la duración total, desde el inicio de la solicitud hasta la
  recepción del último byte de la respuesta.
* **Timeline**: En esta columna, se muestra una cascada visual con todas las
  solicitudes de la red. Cuando se hace clic en el encabezado de esta columna, se muestra un menú de
  campos de ordenamiento adicionales.

## Cómo registrar la actividad de red

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#record">cómo iniciar o detener grabaciones</a>
  para obtener información actualizada.
</aside>

Cuando el panel de **Network** está abierto, DevTools registrar toda la actividad de la red
de manera predeterminada. Para ello, vuelve a cargar una página mientras el panel está abierto, o espera
la actividad de red de la página cargada actualmente.

Puedes distinguir si DevTools está registrando o no mediante el botón
**record**. Cuando el botón está en rojo
(![botón record activado](imgs/record-on.png){:.inline}), significa que hay una grabación activa en DevTools.
Cuando es gris (![botón record desactivado](imgs/record-off.png){:.inline}), significa que no hay grabaciones
activas en DevTools. Haz clic en este botón para comenzar o para detener la grabación, o presiona
la combinación de teclas <kbd>Cmd/Ctrl</kbd>+<kbd>e</kbd>.

## Cómo obtener capturas de pantalla durante la grabación {:#filmstrip}

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#screenshots">cómo tomar capturas de pantalla durante la grabación</a>
  para obtener información actualizada.
</aside>

El panel de **Network** puede tomar capturas de pantalla durante la carga de una página. Esta función
se denomina **Filmstrip**.

Haz clic en el ícono de **Camera** para habilitar Filmstrip. Si el ícono está gris,
significa que la función está inhabilitada  (![Filmstrip
inhabilitada](imgs/filmstrip-disabled.png){:.inline}). Si está en azul, significa que está
habilitada (![Filmstrip habilitada](imgs/filmstrip-enabled.png){:.inline}).

Vuelve a cargar la página para tomar capturas de pantalla. Las capturas de pantalla se muestran
arriba de **Overview**.

![grabación con tira de imágenes](imgs/filmstrip.png)

Cuando te desplazas sobre una captura de pantalla, **Timeline** muestra una línea vertical amarilla
que indica cuándo se capturó el fotograma.

![superposición del filmstrip en la línea de tiempo](imgs/filmstrip-timeline-overlay.png)

Haz doble clic en una captura de pantalla para ver una versión acercada de ella. Con
la captura de pantalla acercada, usa las flechas izquierda y derecha del teclado para
navegar entre los elementos.

![captura de pantalla del filmstrip acercada](imgs/filmstrip-zoom.png)

## Cómo ver DOMContentLoaded y cargar información del evento

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#load">cómo ver eventos de carga</a>
  para obtener información actualizada.
</aside>

El panel de **Network** destaca dos eventos:
[`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) y
[`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load).

`DOMContentLoaded` se dispara cuando se analiza el lenguaje de marcado inicial
de una página. Se muestra en dos lugares del panel de **Network**:

1. La barra vertical azul del panel de **Overview** representa el evento.
2. En el panel de **Summary**, puedes ver la hora exacta del evento.

![Evento DOMContentLoaded en el panel de Network](imgs/domcontentloaded.png)

`load` se dispara cuando se carga una página por completo. Se muestra en tres lugares:

1. La barra vertical roja del panel de **Overview** representa el evento.
2. La barra vertical roja de **Requests Table** también representa el evento.
3. En el panel de **Summary**, puedes ver la hora exacta del evento.

![cargar evento en el panel de Network](imgs/load.png)

## Cómo ver detalles de un solo recurso

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#details">cómo ver detalles</a>
  para obtener información actualizada.
</aside>

Haz clic en el nombre de un recurso (debajo la columna **Name** de **Requests Table**)
para ver más información sobre él.

Las pestañas disponibles cambian según el tipo de recurso seleccionado,
pero las cuatro pestañas que se incluyen a continuación son las más comunes.

* **Headers**: Son los encabezados HTTP asociados con el recurso.
* **Preview**: Son las vistas previas de los recursos JSON de imagen y texto.
* **Response**: Son los datos de la respuesta HTTP (si existen).
* **Timing**: Es un detalle granular del ciclo de vida de la solicitud del
  recurso.

![ver detalles de un solo recurso](imgs/network-headers.png)

### Cómo ver la sincronización de la red

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#timing">la pestaña Timing</a>
  para obtener información actualizada.
</aside>

Haz clic en la pestaña **Timing** para ver un desglose detallado del ciclo de vida de la
solicitud de un solo recurso.

El ciclo de vida muestra el tiempo dedicado a las siguientes categorías:

<!-- the screenshot above and list below are redundant, but we include
     the text for SEO -->

* En cola
* Detenida
* Si corresponde: consulta de DNS, conexión inicial, protocolo de enlace de SSL
* Solicitud enviada
* Esperando (tiempo hasta el primer byte (TTFB))
* Descarga de contenido

![pestaña Timing](imgs/timing-tab.png)

Si desplazas el mouse sobre un
recurso dentro del gráfico de **Timeline**, también puedes ver esta información.

![datos de sincronización de un recurso en la línea de tiempo](imgs/timeline-view-hover.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.timing #}

Guías relacionadas:

* [Cómo entender Resource Timing](understanding-resource-timing)

### Cómo ver encabezados HTTP

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#headers">la pestaña Headers</a>
  para obtener información actualizada.
</aside>

Haz clic en **Headers** para ver los encabezados de ese recurso.

La pestaña **Headers** muestra la URL de la solicitud de recursos, el método HTTP y el código de estado
de respuesta. Además, enumera los encabezados de respuesta y solicitud HTTP
y sus valores, así como cualquier parámetro de cadena de búsqueda.

![Encabezados HTTP de un único recurso](imgs/network-headers.png)

Puedes ver encabezados de respuesta, encabezados de solicitudes o parámetros de cadenas de búsqueda
en formato fuente o analizado haciendo clic en el vínculo `view source` o `view parsed`
junto a cada sección.

![ver fuente del encabezado](imgs/view-header-source.png)

También puedes ver los parámetros de cadena de búsqueda en formato URL codificado o decodificado haciendo
clic en el vínculo `view URL encoded` o `view decoded` junto a esa sección.

![ver URL codificada](imgs/view-url-encoded.png)

### Cómo obtener una vista previa de un recurso

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#preview">la pestaña Preview</a>
  para obtener información actualizada.
</aside>

Haz clic en la pestaña **Preview** para obtener una vista previa de ese recurso. La pestaña **Preview**
puede mostrar (o no) cualquier información útil, según el tipo de
recurso seleccionado.

![vista previa del recurso de imagen](imgs/preview-png.png)

### Ver contenido de la respuesta HTTP

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#response">la pestaña Response</a>
  para obtener información actualizada.
</aside>

Haz clic en la pestaña **Response** para ver el
contenido de la respuesta HTTP sin formato del recurso. La pestaña **Response** puede contener (o no) información útil,
según el tipo de recurso seleccionado.

![Datos de respuesta del recurso JSON](imgs/response-json.png)

### Cómo ver cookies

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#cookies">la pestaña Cookies</a>
  para obtener información actualizada.
</aside>

Haz clic en la pestaña **Cookies** para ver una tabla de cookies
transmitidas en los encabezados de respuesta y solicitud HTTP del recurso. Esta pestaña solo está disponible
cuando se transmiten cookies.

A continuación, se incluye una descripción de cada columna de la tabla:

* **Name**: Indica el nombre de la cookie.
* **Value**: Indica el valor de la cookie.
* **Domain**: Indica el dominio al que pertenece la cookie.
* **Path**: Indica la ruta de acceso URL de la que provino la cookie.
* **Expires / Max-Age**: Indica el valor de las propiedades de vida útil o duración
  de la cookie.
* **Size**: Indica el tamaño de la cookie en bytes.
* **HTTP**: Indica que la cookie debe fijarse únicamente a través del navegador en
  la solicitud HTTP. También señala que no se puede tener acceso a la cookie con JavaScript.
* **Secure**: La presencia de este atributo indica que la cookie solo
  se debe transmitir mediante una conexión segura.

![cookies de recursos](imgs/cookies.png)

### Cómo ver marcos de WebSocket

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#frames">la pestaña Frames</a>
  para obtener información actualizada.
</aside>

Haz clic en la pestaña **Frames** para ver
la información de conexión de [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).
 Esta pestaña solo está visible cuando el recurso seleccionado
inicia una conexión `WebSocket`.

![pestaña Frames de websocket](imgs/websocket-frames.png)

La siguiente lista describe cada columna de la tabla de la pestaña **Frames**:


* **Data**: Indica la carga del mensaje. Si el mensaje es texto sin formato, se
  muestra aquí. Para los códigos de operación binarios, en este campo se
  muestran el nombre y el código correspondientes. Se admiten los siguientes códigos de operación:
  * Continuation Frame
  * Binary Frame
  * Connection Close Frame
  * Ping Frame
  * Pong Frame
* **Length**. Indica la extensión de la carga del mensaje en bytes.
* **Time**: Indica la marca de tiempo del momento en que se creó el mensaje.

Los mensajes están codificados por color según el tipo al que pertenecen:

* Los mensajes de texto salientes son de color verde claro.
* Los entrantes son de color blanco.
* Los códigos de operaciones de WebSocket son de color amarillo claro.
* Los errores se muestran de color rojo claro.

**Notas sobre la implementación actual:**

* Para actualizar la tabla **Frames** después de la llegada de mensajes nuevos, haz clic en
  el nombre del recurso a la izquierda.
* En la tabla **Frames**, solo se conservan los últimos 100 mensajes de `WebSocket`.

## Cómo ver iniciadores de recursos y dependencias {:#initiators-dependencies}

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#initiators-dependencies">cómo ver iniciadores y
  dependencias</a> para obtener información actualizada.
</aside>

Mantén presionado <kbd>Shift</kbd> y desplázate sobre un recurso para ver sus iniciadores
y dependencias. En esta sección, se usa el término **objetivo** para referirse al recurso sobre el que te
desplazas.

El primer recurso de color verde sobre el objetivo es el iniciador
de este. Si hay sobre este un segundo recurso de color verde,
será el iniciador del iniciador. Cualquier recurso por debajo del objetivo
que esté de color rojo será una dependencia del objetivo.

En la captura de pantalla que figura a continuación, el objetivo es `dn/`. El iniciador del objetivo es
la secuencia de comandos que comienza con `rs=AA2Y`. El iniciador del iniciador
(`rs=AA2Y`) es `google.com`. Por último, `dn.js` es una dependencia del
objetivo (`dn/`).

![ver iniciadores de recursos y
dependencias](imgs/initiators-dependencies.png)

Recuerda que en el caso de las páginas con muchos recursos, es posible que
no puedas ver todos los iniciadores o dependencias.

## Cómo clasificar solicitudes

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#sort-by-activity">cómo ordenar por fase de actividad</a>
  para obtener información actualizada.
</aside>

De manera predeterminada, los recursos de **Requests Table** se clasifican por el tiempo de
inicio de cada solicitud, comenzando con la más temprana en la parte superior.

Haz clic en el encabezado de una columna para ordenar la tabla por el valor de cada recurso
para ese encabezado. Haz clic en el mismo encabezado otra vez para cambiar el orden a
ascendente o descendente.

La columna **Timeline** es diferente a las demás. Cuando se hace clic en ella, muestra
un menú de campos de ordenamiento.

* **Timeline**: Aplica el ordenamiento por el tiempo de inicio de cada solicitud de la red. Este es el ordenamiento
  predeterminado, y equivale a aplicar ordenamiento con la opción **Start Time**.
* **Start Time**: Aplica el ordenamiento por el tiempo de inicio de cada solicitud de la red (equivale a
  aplicar ordenamiento por la opción **Timeline**).
* **Response Time**: Aplica el ordenamiento por el tiempo de respuesta de cada solicitud.
* **End Time**: Aplica el ordenamiento por momento de compleción de cada solicitud.
* **Duration**: Aplica el ordenamiento por el tiempo total de cada solicitud. Selecciona este
  filtro para determinar cuáles son los recursos que tardan más tiempo en cargarse.
* **Latency**: Aplica el ordenamiento por el tiempo que pasa desde el inicio de la solicitud y el
  comienzo de la respuesta. Selecciona este filtro para determinar qué recurso
  tarda más en mostrar el primer byte (TTFB).

![Campos de orden de línea de tiempo](imgs/timeline-sort-fields.png)

## Cómo filtrar solicitudes

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#filters">el panel Filters</a>
  para obtener información actualizada.
</aside>

El panel **Network** provee numerosas formas de filtrar los recursos que
se muestran. Haz clic en el botón **filters**
(![botón filters](imgs/filters.png){:.inline})
para ocultar o mostrar el panel **Filters**.

Usa los botones de tipo de contenido para mostrar solamente los recursos del tipo de contenido
seleccionado.

Note: Mantén presionado <kbd>Cmd</kbd> (Mac) o <kbd>Ctrl</kbd> (Windows/Linux) y, luego, haz clic para habilitar múltiples filtros simultáneamente.

![múltiples filtros de tipo de contenido seleccionados
simultáneamente](imgs/multiple-content-type-filters.png)

El campo de texto **filter** es engañosamente potente. Si ingresas una string
arbitraria en este campo, el panel **Network** solo mostrará los recursos cuyos
nombres de archivo coincidan con la string especificada.

![filtrado de nombres de recursos](imgs/resource-name-filtering.png)

El campo de texto **filter** también admite diversas palabras clave que te permiten
clasificar recursos por diferentes propiedades, como el tamaño de archivo usando la palabra clave `larger-than`.


La siguiente lista describe todas las palabras clave.

* `domain`: Solo muestra recursos del dominio especificado. Puedes usar
  un carácter comodín (`*`) para incluir varios dominios. Por ejemplo, `*.com`
  muestra recursos de todos los nombres de dominio que terminan en `.com`. DevTools
  propaga el menú desplegable de autocompletar con todos los dominios
  que encuentra.
* `has-response-header`: Muestra los recursos que contienen el encabezado de respuesta
  HTTP especificado. DevTools propaga el menú desplegable de autocompletar con
  todos los encabezados de respuesta que encuentra.
* `is`: Usa `is:running` para buscar recursos `WebSocket`.
* `larger-than`: Muestra recursos de tamaño superior al especificado,
  en bytes. Establecer un valor de `1000` equivale a fijar un valor de `1k`.
* `method`: Muestra recursos recuperados con un tipo de método HTTP
  especificado. DevTools completa el menú desplegable de autocompletar con todos los métodos HTTP
  que encuentra.
* `mime-type`: Muestra recursos de un tipo de MIME especificado. DevTools completa
  el menú desplegable de autocompletar con todos los tipos de MIME que encuentra.
* `mixed-content`: Muestra todos los recursos de contenido mixto (`mixed-content:all`) o
  solo los que se visualizan en el momento (`mixed-content:displayed`).
* `scheme`: Muestra los recursos recuperados a través de una conexión HTTP no protegida (`scheme:http`)
  o HTTPS protegida (`scheme:https`).
* `set-cookie-domain`: Muestra los recursos que tienen un encabezado `Set-Cookie`
  con un atributo `Domain` que coincide con el valor especificado. DevTools
  propaga el menú desplegable de autocompletar con todos los dominios de cookies que
  encuentra.
* `set-cookie-name`: Muestra los recursos que tienen un encabezado `Set-Cookie`
  con un nombre que coincide con el valor especificado. DevTools propaga
  el menú desplegable de autocompletar con todos los nombres de las cookies que encuentra.
* `set-cookie-value`: Muestra los recursos que tienen un encabezado `Set-Cookie`
  con un valor que coincide con el valor especificado. DevTools propaga
  el menú desplegable de autocompletar con todos los valores de las cookies que encuentra.
* `status-code`: Solo muestra los recursos cuyo código de estado HTTP coincide con el
  código especificado. DevTools completa el menú desplegable de autocompletar con todos
  los códigos de estado encontrados.

![filtrado por tamaño de archivo](imgs/larger-than.png)

Algunas de las palabras clave anteriores mencionan un menú desplegable de autocompletar. Para desencadenar
el menú de autocompletar, escribe la palabra clave seguida por dos puntos. Por ejemplo,
en la siguiente captura de pantalla, al escribir `domain:` se activó el menú desplegable de autocompletar.

![filtrar autocompletar campo de texto](imgs/filter-autocomplete.png)

## Cómo copiar, guardar y borrar información de la red

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta las siguientes secciones para obtener información
  actualizada:
  <ul>
    <li><a href="reference#copy">Cómo copiar una o todas las solicitudes</a></li>
    <li><a href="reference#save-as-har">Cómo guardar como HAR con contenido</a></li>
    <li><a href="reference#clear-cache">Cómo borrar la caché del navegador</a></li>
    <li><a href="reference#clear-cookies">Cómo borrar las cookies del navegador</a></li>
  </ul>
</aside>

Haz clic con el botón derecho dentro de **Requests Table** para copiar, guardar, o
borrar información de la red. Algunas de las opciones dependen del contexto. Por lo tanto,
si deseas trabajar en un único recurso, debes hacer clic con el botón derecho del mouse en la
fila de ese recurso. En la siguiente lista, se describe cada una de las opciones.

* **Copy Response**: Envía una copia de la respuesta HTTP del recurso seleccionado al
  portapapeles del sistema.
* **Copy as cURL**: Copia la solicitud de red del recurso seleccionado como una
  cadena de comandos [cURL](http://curl.haxx.se/){: .external } al portapapeles del sistema.
  Consulta [cómo copiar solicitudes como comandos cURL](#copy-requests-as-curl-commands).
* **Copy All as HAR**: Copia todos los recursos al portapapeles del sistema como
  datos [HAR](https://en.wikipedia.org/wiki/.har){: .external } .
  Un archivo HAR contiene una estructura de datos JSON que describe la
  "cascada" de la red. Varias [herramientas](https://ericduran.github.io/chromeHAR/){: .external }
  [de terceros](https://code.google.com/p/harviewer/){: .external } pueden reconstruir la cascada de red
  de los datos del archivo HAR. Consulta
  [Herramienta potente para el rendimiento web: HTTP Archive
  (HAR)](https://www.igvita.com/2012/08/28/web-performance-power-tool-http-archive-har/)
  para obtener más información.
* **Save as HAR with Content**: Guarda todos los datos de la red en un
  archivo HAR, junto con la página de cada recurso. Los recursos binarios, incluidas las imágenes,
  se codifican como texto Base64.
* **Clear Browser Cache**: Borra la caché del navegador.
  **Sugerencia**: También puedes habilitar o inhabilitar la caché del navegador desde el panel lateral
  [**Network Conditions**][nc].
* **Clear Browser Cookies**: Borra las cookies del navegador.
* **Open in Sources Panel**: Abre el recurso seleccionado en el panel
  **Sources**.
* **Open Link in New Tab**: Abre el recurso seleccionado en una pestaña nueva. También
  puedes hacer doble clic en el nombre del recurso de la tabla Network.
* **Copy Link Address**: Envía una copia de la URL del recurso al portapapeles del sistema.
* **Save**: Guarda el recurso de texto seleccionado. Solo se muestra en los recursos de
  texto.
* **Replay XHR**: Vuelve a enviar el elemento `XMLHTTPRequest` seleccionado. Solo se muestra en los recursos XHR.


![copiar y guardar menú contextual](imgs/copy-save-menu.png)

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions

### Cómo copiar una o todas las solicitudes como comandos cURL {: #curl }

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#copy">cómo copiar una o todas las solicitudes</a>
  para obtener información actualizada.
</aside>

[cURL](http://curl.haxx.se/){: .external } es una herramienta de la línea de comandos para hacer transacciones
HTTP.

Haz clic con el botón derecho del mouse en Requests Table, desplázate sobre
**Copy** y, luego, selecciona **Copy as cURL** para copiar una cadena de solicitudes
cURL para todos los recursos detectados por el panel Network.

![Comando Copy single request as cURL](imgs/copy-as-curl.png)

Selecciona **Copy as cURL** para copiar una cadena de solicitudes cURL para todos
los recursos detectados por el panel Network.

Cuando copias todo, se ignora el filtrado (p. ej., si filtras el panel Network
para que solo muestre los recursos CSS y luego presionas **Copy All as cURL**, obtendrás
todos los recursos detectados, no solo los CSS).

## Cómo personalizar el panel Network

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#request-rows">cómo usar filas de solicitudes grandes o pequeñas</a>
  para obtener información actualizada.
</aside>

De manera predeterminada, **Requests Table** muestra los recursos con filas pequeñas. Haz clic en
el botón **Use large resource rows**
(![botón large resource rows](imgs/large-resource-rows-button.png){:.inline})
para aumentar el tamaño de cada fila.

Las filas grandes permiten que en algunas columnas se muestren dos campos de texto: uno
principal y otro secundario. El encabezado de la columna indica el significado del
campo secundario.

![amplias filas de recursos](imgs/large-resource-rows.png)

### Cómo agregar y quitar columnas de tablas

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta las siguientes secciones para obtener información
  actualizada:
  <ul>
    <li><a href="reference#columns">Cómo mostrar u ocultar columnas</a></li>
    <li><a href="reference#custom-columns">Cómo agregar columnas personalizadas</a></li>
  </ul>
</aside>

Haz clic con el botón secundario en cualquiera de los encabezados de **Requests Table** para agregar o quitar
columnas.

![Agregar o quitar columnas](imgs/add-remove-columns.png)

### Cómo conservar el registro de red en la navegación

<aside class="warning">
  <b>Warning:</b> Esta página es obsoleta. Consulta
  <a href="reference#preserve-log">cómo conservar registros</a>
  para obtener información actualizada.
</aside>

De manera predeterminada, la actividad de red se descarta cuando
vuelves a cargar la página actual o bien cuando cargas otra página.
Habilita la casilla de verificación **Preserve log** para guardar el registro de la red en estas
situaciones. Los nuevos registros se agregan al final de **Requests Table**.

## Recursos adicionales

Para obtener más información sobre cómo optimizar el rendimiento de red de tu app, consulta estos recursos:

* Usa [PageSpeed
  Insights](/speed/pagespeed/insights) para identificar
  recomendaciones de rendimiento que se pueden aplicar a tu sitio, y
  [Herramientas de optimización de
  PageSpeed](/speed/pagespeed/optimization) para
  automatizar el proceso de aplicación de esas prácticas.
* En [Redes de alto rendimiento de Google
  Chrome](https://www.igvita.com/posa/high-performance-networking-in-google-chrome/)
  se tratan los aspectos internos de Chrome y la manera en que puedes aprovecharlos
  a fin de lograr que tu sitio sea más rápido.
* En [Cómo funciona la compresión
  gzip](/speed/articles/gzip) se brinda
  una descripción general de la compresión gzip y se explica la razón por la cual es recomendable.
* En [Recomendaciones de rendimiento
  web](/speed/docs/best-practices/rules_intro)
  se ofrecen sugerencias adicionales para optimizar el rendimiento de red de tu página
  o aplicación web.

## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}
