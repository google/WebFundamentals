project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mide el rendimiento de la red de tu app web por medio del panel de red Chrome DevTools.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Medir los tiempos de carga de los recursos {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Mide el rendimiento de red de tu sitio por medio del panel 
<strong>Network</strong>.

![el panel de red de herramientas para desarrolladores de Chrome](imgs/network-panel.png)

El panel **Network** registra información sobre cada operación de red en
una página, incluidos detalles de sincronización, encabezados de solicitud y respuesta HTML 
, cookies, y más.


### TL;DR {: .hide-from-toc }
- Usa el panel Network para registrar y analizar la actividad de la red.
- Ve la información de carga general o para cada recurso individual.
- Filtra y ordena la manera en que se muestran los recursos.
- Guarda, copia y borra los registros de red.
- Personaliza el panel Network según tus necesidades.


## Información general del panel Network

El panel Network incluye cinco subpaneles:

1. **Controls**: usa las opciones de este para controlar la visualización y el funcionamiento 
   del panel **Network**.
2. **Filters**: las opciones de este te permitirán controlar los recursos que se muestran en 
   **Requests Table**. Sugerencia: mantén presionado <kbd>Cmd</kbd> (Mac) o <kbd>Ctrl</kbd>
   (Windows/Linux) y luego haz clic en un filtro para seleccionar varios filtros 
al mismo tiempo.
3. **Overview**: en este gráfico se muestra una línea de tiempo del momento en que se recuperaron los recursos.
   Si ves varias barras apiladas verticalmente, significa que esos recursos 
   se recuperaron simultáneamente.
4. **Requests Table**: en esta tabla se enumeran todos los recursos recuperados.
   De manera predeterminada, la tabla está organizada cronológicamente, y los recursos más 
   recientes figuran en la parte superior.
   Si haces clic en el nombre de un recurso, se muestra más información sobre él.
   Sugerencia: haz clic con el botón secundario en cualquiera de los encabezados de la tabla, a excepción de **Timeline**, para 
   agregar o quitar columnas de información.
5. **Summary**: a simple vista, este panel indica la cantidad total de solicitudes,
    la cantidad de datos transferidos y los tiempos de carga.

![subpaneles del panel network](imgs/panes.png)

El subpanel **Requests Table** muestra las siguientes columnas en forma predeterminada. Puedes
[agregar o quitar columnas](#add-and-remove-table-columns).

* **Name**: nombre del recurso.
* **Status**: código de estado HTTP.
* **Type**: tipo de MIME del recurso solicitado.
* **Initiator**: objeto o proceso que inició la solicitud. Puede 
  tener uno de los siguientes valores:
  * **Parser**: el analizador HTML de Chrome inicia la solicitud.
  * **Redirect**: un redireccionamiento HTTP inició la solicitud.
  * **Script**: una secuencia de comandos inicia la solicitud.
  * **Other**: algún otro proceso o acción inicia la solicitud, 
    como la navegación del usuario hacia una página a través de un vínculo o del ingreso de una 
    URL en la barra de direcciones.
* **Size**: tamaño combinado de los encabezados de la respuesta (generalmente, 
  unos cuantos cientos de bytes), más el cuerpo de la respuesta, tal como la proporcionó el servidor. 
* **Time**: duración total, desde el inicio de la solicitud hasta la 
  recepción del último byte de la respuesta. 
* **Timeline**: en esta columna se muestra una cascada visual con todas las 
  solicitudes de la red. Cuando se hace clic en el encabezado de esta columna se muestra un menú de 
  campos de ordenamiento adicionales.

## Grabar la actividad de la red

Cuando el panel **Network** está abierto, DevTools graba toda la actividad de la red
de manera predeterminada. Para grabar, simplemente vuelve a cargar una página mientras el panel está abierto, o espera 
la actividad de red de la página cargada actualmente.

Puedes distinguir si DevTools está grabando o no por medio del botón 
**record**. Cuando el botón está en rojo 
(![botón record activado](imgs/record-on.png){:.inline}), hay una grabación activa en DevTools.
Cuando es gris (![botón record desactivado](imgs/record-off.png){:.inline}), no hay grabaciones activas 
en DevTools. Haz clic en este botón para comenzar o para detener la grabación, o presiona 
la combinación de teclas <kbd>Cmd/Ctrl</kbd>+<kbd>e</kbd>.

## Obtener capturas de pantalla durante la grabación {:#filmstrip}

El panel **Network** puede tomar capturas de pantalla durante la carga de una página. Esta característica
se denomina **tira de imágenes**. 

Haz clic en el ícono de la **cámara** para habilitar la tira de imágenes. Cuando el ícono está en gris, 
la tira de imágenes está inhabilitada  (![tira de imágenes 
inhabilitada](imgs/filmstrip-disabled.png){:.inline}). Cuando el ícono está en azul, la tira de imágenes está
habilitada (![tira de imágenes habilitada](imgs/filmstrip-enabled.png){:.inline}

Volver a cargar la página para capturar las capturas de pantalla. Las capturas de pantalla se muestran
arriba de **Overview**. 

![grabación con tira de imágenes](imgs/filmstrip.png)

Cuando te desplazas sobre una captura de pantalla, **Timeline** muestra una línea vertical amarilla
que indica cuándo se capturó el cuadro.

![superposición de la tira de imágenes en la línea de tiempo](imgs/filmstrip-timeline-overlay.png)

Haz doble clic en una captura de pantalla para ver una versión acercada de la captura. Con
la captura de pantalla acercada, usa las flechas izquierda y derecha de tu teclado para
navegar entre capturas de pantalla.

![captura de pantalla de la tira de imágenes acercada](imgs/filmstrip-zoom.png)

## Ver DOMContentLoaded y cargar información del evento

El panel **Network** destaca dos eventos: 
[`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) y 
[`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load).

`DOMContentLoaded` se dispara cuando el lenguaje de marcado inicial de una página 
fue analizado. Se muestra en dos lugares en el panel **Network**:

1. La barra vertical azul del subpanel **Overview** indica el evento.
2. En el subpanel **Summary**, puedes ver la hora exacta del evento.

![Evento DOMContentLoaded en el panel Network](imgs/domcontentloaded.png)

`load` se dispara cuando se carga una página completamente. Se muestra en tres lugares:

1. La barra vertical roja del subpanel **Overview** indica el evento.
2. La barra vertical roja de **Requests Table** también indica el evento.
3. En el subpanel **Summary**, puedes ver la hora exacta del evento.

![cargar evento en el panel network](imgs/load.png)

## Ver detalles para un solo recurso

Haz clic en el nombre de un recurso (bajo la columna **Name** de **Requests Table**)
para ver más información de ese recurso.

Las pestañas disponibles cambian según el tipo de recurso seleccionado,
pero las cuatro pestañas que se incluyen a continuación son las más comunes.

* **Headers**: los encabezados HTTP asociados con el recurso.
* **Preview**: vistas previas de los recursos JSON, de imagen y texto.
* **Response**: datos de la respuesta HTTP (si existen).
* **Timing**: un detalle granular del ciclo de vida de la solicitud para el 
  recurso.

![ver detalles para un solo recurso](imgs/network-headers.png)

### Ver sincronización de la red

Haz clic en la pestaña **Timing** para ver un detalle granular del ciclo de vida de la 
solicitud para un solo recurso. 

El ciclo de vida muestra el tiempo dedicado a las siguientes categorías:

<!-- the screenshot above and list below are redundant, but we include
     the text for SEO -->

* Queuing
* Stalled;
* Según corresponda: Búsqueda de DNS, conexión inicial, protocolo de enlace SSL
* Request sent
* Waiting (tiempo hasta el primer byte o TTFB).
* Descarga de contenido

![pestaña de sincronización](imgs/timing-tab.png)

Si desplazas el mouse sobre un 
recurso dentro del gráfico **Timeline**, también puedes ver esta información. 

![datos de sincronización para un recurso en la línea de tiempo](imgs/timeline-view-hover.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.timing #}

Guías relacionadas:

* [Comprensión de Resource Timing](understanding-resource-timing)

### Ver encabezados HTTP

Haz clic en **Headers** para ver los encabezados de ese recurso.

La pestaña **Headers** muestra la URL de la solicitud de recursos, el método HTTP, y el código de estado 
de respuesta. Además, enumera los encabezados de respuesta y solicitud HTTP 
 y sus valores, así como cualquier parámetro de cadena de búsqueda. 

![Encabezados HTTP para un único recurso](imgs/network-headers.png)

Puedes ver encabezados de respuesta, encabezados de solicitudes o parámetros de cadenas de búsqueda
en formato fuente o analizado al hacer clic en el enlace `view source` o `view parsed` 
 junto a cada sección.

![ver fuente del encabezado](imgs/view-header-source.png)

También puedes ver los parámetros de cadena de búsqueda en formato URL codificado o decodificado al hacer
clic en el enlace `view URL encoded` o `view decoded` junto a esa sección.

![ver URL codificada](imgs/view-url-encoded.png)

### Obtener una vista previa de un recurso

Haz clic en la pestaña **Preview** para obtener una vista previa de ese recurso. La pestaña **Preview**
puede mostrar (o no) cualquier información útil, según el tipo de 
recurso seleccionado.

![vista previa del recurso de imagen](imgs/preview-png.png)

### Ver contenido de la respuesta HTTP

Haz clic en la pestaña **Response** para ver el 
contenido de la respuesta HTTP sin formato del recurso. La pestaña **Response** puede contener (o no) información útil, 
según el tipo de recurso seleccionado.

![Datos de respuesta del recurso JSON](imgs/response-json.png)

### Ver cookies

Haz clic en la pestaña **Cookies** para ver una tabla de cookies 
transmitidas en los encabezados de respuesta y solicitud HTTP del recurso. Esta pestaña solo está disponible
cuando se transmiten cookies.

A continuación se incluye una descripción de cada columna de la tabla:

* **Name**: nombre de la cookie.
* **Value**: valor de la cookie.
* **Domain**: dominio al que pertenece la cookie.
* **Path**: ruta de acceso URL de la que provino la cookie.
* **Expires / Max-Age**: valor de las propiedades de vida útil o duración 
  de la cookie.
* **Size**: tamaño de la cookie en bytes.
* **HTTP**: indica que la cookie debe fijarse únicamente a través del navegador en 
  la solicitud HTTP. También señala que no se puede tener acceso a la cookie con JavaScript.
* **Secure**: La presencia de este atributo indica que la cookie solo 
  debe ser transmitida por una conexión segura.

![cookies de recursos](imgs/cookies.png)

### Ver marcos de WebSocket

Haz clic en la pestaña **Frames** para ver 
la información de conexión de [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
. Esta pestaña solo está visible cuando el recurso seleccionado 
inicia una conexión `WebSocket`.

![pestaña frames de websocket](imgs/websocket-frames.png)

La siguiente lista describe cada columna de la tabla de la pestaña **Frames**:


* **Data**: carga del mensaje. Si el mensaje es texto sin formato, se 
  muestra aquí. Para los códigos de operación binarios, en este campo se 
  muestran el nombre y el código de estos. Se admiten los siguientes códigos de operación:
  * marco de continuación.
  * marco de ejecutable;
  * marco de cierre de conexión;
  * marco ping;
  * marco pong.
* **Length**: extensión de la carga del mensaje en bytes.
* **Time**: la marca de tiempo del momento en que se creó el mensaje.

Los mensajes están codificados por color según el tipo al que pertenecen: 

* Los mensajes de texto salientes son verdes claros.
* Los mensajes de texto entrantes son blancos. 
* Los códigos de operaciones WebSocket son amarillos claros.
* Los errores son rojo claro.

**Notas sobre la implementación actual:**

* Para actualizar la tabla **Frames** después de la llegada de mensajes nuevos, haz clic en 
  el nombre del recurso a la izquierda.
* En la tabla **Frames**, solo se conservan los últimos 100 mensajes`WebSocket`.

## Ver iniciadores de recursos y dependencias {:#initiators-dependencies}

Mantén presionado <kbd>Shift</kbd> y desplázate sobre un recurso para ver sus iniciadores
y dependencias. En esta sección, el recurso sobre el que te 
desplazas se cita como **objetivo**. 

El primer recurso de color verde sobre el objetivo es el iniciador
de este. Si hay sobre este un segundo recurso de color verde,
será el iniciador del iniciador. Cualquier recurso por debajo del objetivo
que esté en color rojo es una dependencia del objetivo.

En la captura de pantalla que figura a continuación, el objetivo es `dn/`. El iniciador del objetivo es
la secuencia de comandos que comienza con `rs=AA2Y`. El iniciador del iniciador 
(`rs=AA2Y`) es `google.com`. Por último, `dn.js` es una dependencia del 
objetivo (`dn/`).

![ver iniciadores de recursos y 
dependencias](imgs/initiators-dependencies.png)

Recuerda que en el caso de las páginas con muchos recursos, es posible que 
no puedas ver todos los iniciadores o dependencias. 

## Clasificar solicitudes

En forma predeterminada, los recursos de **Requests Table** se clasifican por el tiempo de
inicio de cada solicitud, comenzando con la solicitud más temprana en la parte superior.

Haz clic en el encabezado de una columna para ordenar la tabla por el valor de cada recurso
para ese encabezado. Haz clic en el mismo encabezado otra vez para cambiar el orden a 
ascendente o descendente.

La columna **Timeline** es diferente a las demás. Cuando se hace clic en ella, muestra
un menú de campos de ordenamiento.

* **Timeline**: aplica ordenamiento por el tiempo de inicio de cada solicitud de la red. Este es el ordenamiento 
  predeterminado, y equivale a aplicar ordenamiento con la opción **Start Time**.
* **Start Time**: aplica ordenamiento por el tiempo de inicio de cada solicitud de la red (equivale a 
  aplicar ordenamiento por la opción **Timeline**).
* **Response Time**: aplica ordenamiento por el tiempo de respuesta de cada solicitud.
* **End Time**: aplica ordenamiento por momento de compleción de cada solicitud.
* **Duration**: aplica ordenamiento por el tiempo total de cada solicitud. Selecciona este 
  filtro para determinar los recursos que tardan más tiempo en cargarse.
* **Latency**: aplica ordenamiento por el tiempo que pasa desde el inicio de la solicitud y el 
  comienzo de la respuesta. Selecciona este filtro para determinar qué recurso 
  toma el tiempo hasta el primer byte (TTFB) más largo.

![Campos de orden de línea de tiempo](imgs/timeline-sort-fields.png)

## Filtrar solicitudes 

El panel **Network** provee numerosas formas de filtrar los recursos que 
se muestran. Haz clic en el botón **filters** 
(![botón filters](imgs/filters.png){:.inline})
para ocultar o mostrar el subpanel **Filters**.

Usa los botones de tipo de contenido para mostrar solamente los recursos del tipo de contenido 
seleccionado. 

Note: Mantén presionado <kbd>Cmd</kbd> Mac) o <kbd>Ctrl</kbd> (Windows/Linux) y luego haz clic para habilitar múltiples filtros simultáneamente.

![múltiples filtros de tipo de contenido seleccionados 
simultáneamente](imgs/multiple-content-type-filters.png)

El campo de texto **filter** es engañosamente potente. Si ingresas una cadena
arbitraria en este campo, el panel **Network** solo muestra los recursos cuyos
nombres de archivo coincidan con la cadena especificada.

![filtrado de nombres de recursos](imgs/resource-name-filtering.png)

El campo de texto **filter** también admite diversas palabras clave que te permiten 
clasificar recursos por diferentes propiedades, como el tamaño de archivo, por medio de la palabra clave `larger-than`.


La siguiente lista describe todas las palabras clave. 

* `domain`: solo muestra recursos del dominio especificado. Puedes usar 
  un carácter comodín (`*`) para incluir varios dominios. Por ejemplo, `*.com` 
  muestra recursos de todos los nombres de dominio que terminan en `.com`. DevTools 
  rellena el menú desplegable de autocompletar con todos los dominios
  que encuentra.
* `has-response-header`: muestra los recursos que contienen el encabezado de respuesta 
  HTTP especificado. DevTools completa el menú desplegable de autocompletar con 
  todos los encabezados de respuesta que encuentra.
* `is`: usa `is:running` para encontrar recursos `WebSocket`.
* `larger-than`: muestra recursos de tamaño superior al especificado, 
  en bytes. Establecer un valor de `1000` equivale a fijar un valor de `1k`.
* `method`: muestra recursos recuperados con un tipo de método HTTP
  especificado. DevTools completa el menú desplegable de autocompletar con todos los métodos HTTP
  que encuentra.
* `mime-type`: muestra recursos de un tipo de MIME especificado. DevTools completa
  el menú desplegable de autocompletar con todos los tipos de MIME que encuentra.
* `mixed-content`: muestra todos los recursos de contenido mixto (`mixed-content:all`) o
  solo los que se visualizan en el momento (`mixed-content:displayed`).
* `scheme`: muestra los recursos recuperados a través de una conexión HTTP no protegida (`scheme:http`) 
  o HTTPS protegida (`scheme:https`).
* `set-cookie-domain`: muestra los recursos que tienen un encabezado `Set-Cookie` 
  con un atributo `Domain` que coincide con el valor especificado. DevTools 
  completa el menú desplegable de autocompletar con todos los dominios de cookies que 
  encuentra.
* `set-cookie-name`: muestra los recursos que tienen un encabezado `Set-Cookie` 
  con un nombre que coincide con el valor especificado. DevTools completa 
  el menú desplegable de autocompletar con todos los nombres de las cookies que encuentra.
* `set-cookie-value`: muestra los recursos que tienen un encabezado `Set-Cookie`
  con un valor que coincide con el valor especificado. DevTools completa 
  el menú desplegable de autocompletar con todos los valores de las cookies que encuentra.
* `status-code`: solo muestra los recursos cuyo código de estado HTTP coincide con el 
  código especificado. DevTools completa el menú desplegable de autocompletar con todos 
  los códigos de estado encontrados.

![filtrado por tamaño de archivo](imgs/larger-than.png)

Algunas de las palabras clave anteriores mencionan un menú desplegable de autocompletar. Para desencadenar
el menú de autocompletar, escribe la palabra clave seguida por dos puntos. Por ejemplo,
en la siguiente captura de pantalla, al escribir `domain:` se activó el menú desplegable de autocompletar.

![filtrar autocompletar campo de texto](imgs/filter-autocomplete.png)

## Copiar, guardar y borrar información de la red

Haz clic con el botón derecho dentro de **Requests Table** para copiar, guardar, o
eliminar información de la red. Algunas de las opciones dependen del contexto. Por lo tanto, 
si deseas trabajar en un único recurso, debes hacer clic con el botón derecho del mouse en la
fila de ese recurso. En la lista siguiente, se describe cada una de las opciones.

* **Copy Response**: envía una copia de la respuesta HTTP del recurso seleccionado al 
  portapapeles del sistema.
* **Copy as cURL**: copia la solicitud de red del recurso seleccionado como una
  cadena de comandos [cURL](http://curl.haxx.se/){: .external } al portapapeles del sistema.
   Consulta [Copiar solicitudes como comandos cURL](#copy-requests-as-curl-commands).
* **Copy All as HAR**: copia todos los recursos al portapapeles del sistema como
  datos [HAR](https://en.wikipedia.org/wiki/.har){: .external }.
  Un archivo HAR contiene una estructura de datos JSON que describe la 
  “cascada” de la red. Varias [herramientas](https://ericduran.github.io/chromeHAR/){: .external }
  [de terceros](https://code.google.com/p/harviewer/){: .external } pueden reconstruir la cascada de red
  de los datos del archivo HAR. Consulta
  [Herramienta potente para el rendimiento web: HTTP Archive 
  (HAR)](https://www.igvita.com/2012/08/28/web-performance-power-tool-http-archive-har/)
  para obtener más información.
* **Save as HAR with Content**: guarda todos los datos de la red en un
  archivo HAR, junto con la página de cada recurso. Los recursos binarios, incluidas las imágenes, 
  se codifican como texto Base64.
* **Clear Browser Cache**: borra la caché del navegador.
  **Sugerencia**: también puedes habilitar o inhabilitar la caché del navegador desde el panel lateral 
  [**Network Conditions**][nc].
* **Clear Browser Cookies**: borra las cookies del navegador.
* **Open in Sources Panel**: abre el recurso seleccionado en el panel 
  **Sources**.
* **Open Link in New Tab**: abre el recurso seleccionado en una pestaña nueva. También 
  puedes hacer doble clic en el nombre del recurso de la tabla Network.
* **Copy Link Address**: envía una copia la URL del recurso al portapapeles del sistema.
* **Save**: guarda el recurso de texto seleccionado. Solo se muestra en los recursos de 
  texto.
* **Replay XHR**: vuelve a enviar el elemento `XMLHTTPRequest` seleccionado. Solo se muestra en los recursos XHR.


![copiar y guardar menú contextual](imgs/copy-save-menu.png) 

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions

### Copia una o todas las solicitudes como comandos cURL {: #curl }

[cURL](http://curl.haxx.se/){: .external } es una herramienta de la línea de comandos para hacer transacciones 
HTTP. 

Haz clic con el botón derecho del mouse sobre Requests Table, desplázate sobre 
**Copy** y luego selecciona **Copy as cURL** para copiar una cadena de solicitudes
cURL para todos los recursos detectados por el panel Network.

![Copiar solicitud única como comando cURL](imgs/copy-as-curl.png)

Selecciona **Copy as cURL** para copiar una cadena de solicitudes cURL para todos
los recursos detectados por el panel Network.

Cuando copias todo, se ignora el filtrado (p. ej., si filtras el panel Network
para que solo muestre los recursos CSS y luego presionas **Copy All as cURL**, obtendrás
todos los recursos detectados, no solo los CSS).

## Personalizar el panel Network

En forma predeterminada, **Requests Table** muestra los recursos con filas pequeñas. Haz clic en
el botón de **uso de filas de recursos grandes**
(![botón de uso de filas de recursos grandes](imgs/large-resource-rows-button.png){:.inline})
para aumentar el tamaño de cada fila. 

Las filas grandes permiten que en algunas columnas se muestren dos campos de texto: uno 
principal y otro secundario. El encabezado de la columna indica el significado del 
campo secundario. 

![amplias filas de recursos](imgs/large-resource-rows.png)

### Agregar y quitar columnas de tablas

Haz clic con el botón derecho en cualquiera de los encabezados de **Requests Table** para agregar o quitar
columnas.

![Agregar o quitar columnas](imgs/add-remove-columns.png)

### Conservar el registro de red en la navegación

En forma predeterminada, se descarta la actividad de red cuando 
vuelves a cargar la página actual o cargas otra página.
Habilita la casilla de verificación **Preserve log** para guardar el registro de la red en estas
situaciones. Los nuevos registros se agregan al final de **Requests Table**.

## Recursos adicionales

Para obtener más información sobre cómo optimizar el rendimiento de red de tu app, consulta estos recursos:

* Usa [PageSpeed 
  Insights](/speed/pagespeed/insights) para identificar 
  prácticas recomendadas de rendimiento que se pueden aplicar a tu sitio, y 
  [Herramientas de optimización de 
  PageSpeed](/speed/pagespeed/optimization) para 
  automatizar el proceso de aplicación de esas prácticas.
* En [Redes de alto rendimiento en Google
  Chrome](https://www.igvita.com/posa/high-performance-networking-in-google-chrome/) 
  se tratan los aspectos internos de Chrome y la manera en que puedes aprovecharlos 
  a fin de lograr que tu sitio sea más rápido.
* En [Cómo funciona la compresión 
  gzip](/speed/articles/gzip) se brinda 
  una descripción general de la compresión gzip y se explica la razón por la cual es recomendable.
* En [Mejores prácticas del rendimiento 
  web](/speed/docs/best-practices/rules_intro) 
  se ofrecen sugerencias adicionales para optimizar el rendimiento de red de tu página 
  o aplicación web.




{# wf_devsite_translation #}
