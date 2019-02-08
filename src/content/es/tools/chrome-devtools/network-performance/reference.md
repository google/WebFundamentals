project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Referencia detallada de las funciones del panel Network de Chrome DevTools.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

<style>
figcaption {
  text-align: center;
}
</style>

[ui]: #ui-overview
[requests]: #requests
[overview]: #overview

# Referencia de análisis de red {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Descubre nuevas formas de analizar cómo se carga tu página con esta referencia
completa de las funciones de análisis de red de Chrome DevTools.

Note: Esta referencia se basa en Chrome 58. Si usas otra versión
de Chrome, la IU y las funciones de DevTools pueden ser diferentes. Consulta
`chrome://help` para saber qué versión de Chrome ejecutas.

## Cómo registrar solicitudes de red {: #record }

De manera predeterminada, DevTools registra todas las solicitudes de red en el panel Network,
siempre que DevTools esté abierto.

<figure>
  <img src="imgs/network.png" alt="El panel Network.">
  <figcaption>
    <b>Figura 1</b>. El panel Network
  </figcaption>
</figure>

### Cómo dejar de registrar de solicitudes de red {: #stop-recording }

Para dejar de registrar solicitudes, haz lo siguiente:

* Haz clic en **Stop recording network log** ![Stop recording network
  log](imgs/record-on.png){: .devtools-inline } en el panel Network. Se
  vuelve gris para indicar que DevTools ya no está registrando las solicitudes.
* Presiona <kbd>Command</kbd>+<kbd>E</kbd> (Mac) o
  <kbd>Ctrl</kbd>+<kbd>E</kbd> (Windows o Linux) mientras el panel Network
  esté seleccionado.

### Cómo borrar solicitudes {: #clear }

Haz clic en **Clear** ![Clear][clear]{:.devtools-inline} en el panel Network
para borrar todas las solicitudes de la tabla Requests.

<figure>
  <img src="imgs/clear.svg" alt="El botón Clear.">
  <figcaption>
    <b>Figura 2</b>. Botón Clear en azul
  </figcaption>
</figure>

[clear]: imgs/clear-requests.png

### Cómo guardar solicitudes entre cargas de páginas {: #preserve-log }

Para guardar solicitudes entre cargas de páginas, marca la casilla de verificación **Preserve log**
en el panel Network. DevTools guarda todas las solicitudes hasta que inhabilites
**Preserve log**.

<figure>
  <img src="imgs/preserve-log.svg" alt="Casilla de verificación Preserve Log.">
  <figcaption>
    <b>Figura 3</b>. Casilla de verificación Preserve Log en azul
  </figcaption>
</figure>

### Cómo tomar capturas de pantalla durante la carga de una página {: #screenshots }

Toma capturas de pantalla para analizar qué ven los usuarios mientras esperan que tu página
se cargue.

Para habilitar las capturas de pantalla, haz clic en **Capture screenshots** ![Capture
screenshots][capture]{: .devtools-inline } en el panel Network. Cuando se habilita,
se pone de color azul.

Vuelve a cargar la página con el panel Network seleccionado para tomar capturas de pantalla.

Una vez hechas las capturas, puedes interactuar con ellas de las siguientes maneras:

* Desplázate sobre una captura de pantalla para ver en qué momento se
  capturó. Aparece una línea amarilla en el panel Overview.
* Haz clic en la miniatura de una captura de pantalla para aplicar un filtro que no muestre ninguna solicitud que se haya producido
  después de que se capturó.
* Haz doble clic en una imagen en miniatura para acercarla.

<figure>
  <img src="imgs/screenshot-hover.png"
       alt="Desplazamiento sobre una captura de pantalla.">
  <figcaption>
    <b>Figura 4</b>. Desplazamiento sobre una captura de pantalla. La línea vertical amarilla
    del panel Overview y la cascada representan la hora a la que se hizo
    la captura de pantalla.
  </figcaption>
</figure>

[capture]: imgs/capture-screenshots.png

### Reproducir solicitud XHR {: #replay-xhr }

Para reproducir una solicitud XHR, haz clic con el botón secundario en la tabla Requests
y selecciona **Replay XHR**.

<figure>
  <img src="imgs/replay-xhr.png" alt="Selección de Replay XHR.">
  <figcaption>
    <b>Figura 5</b>. Selección de Replay XHR.
  </figcaption>
</figure>

## Cómo cambiar el comportamiento de carga

### Cómo desactivar la caché del navegador para emular un visitante nuevo {: #disable-cache}

Para emular la primera experiencia de un usuario con tu sitio, marca la casilla de verificación **Disable
cache**. DevTools inhabilita la caché del navegador. Esto emula
con más precisión la primera experiencia del usuario, ya que las solicitudes se responden desde
la caché del navegador cuando el usuario vuelve a visitar el sitio.

<figure>
  <img src="imgs/disable-cache.svg" alt="Casilla de verificación Disable Cache.">
  <figcaption>
    <b>Figura 6</b>. Casilla de verificación Disable Cache en azul
  </figcaption>
</figure>

#### Cómo inhabilitar caché del navegador desde el panel lateral Network Conditions {: #disable-cache-network-conditions }

Si deseas inhabilitar la caché mientras trabajas en otros paneles de DevTools, usa
el panel lateral Network Conditions.

1. Abre el [panel lateral Network Conditions](#network-conditions).
1. Marca o desmarca la casilla de verificación **Disable Cache**.

### Cómo borrar manualmente la caché del navegador {: #clear-cache}

Para borrar manualmente la caché del navegador en cualquier momento, haz clic en cualquier lugar de la
tabla Requests y selecciona **Clear Browser Cache**.

<figure>
  <img src="imgs/clear-browser-cache.png"
       alt="Selección de Clear Browser Cache.">
  <figcaption>
    <b>Figura 7</b>. Selección de Clear Browser Cache.
  </figcaption>
</figure>

### Cómo emular sin conexión {: #offline }

Hay una nueva clase de aplicaciones web, llamadas [aplicaciones web progresivas][pwa], que pueden
funcionar sin conexión con la ayuda de [service workers][sw]. Cuando desarrollas
este tipo de app, es útil poder simular con rapidez un dispositivo que
no tenga conexión de datos.

Marca la casilla de verificación **Offline** para simular una experiencia de red completamente
sin conexión.

<figure>
  <img src="imgs/offline.svg"
       alt="Casilla de verificación Offline">
  <figcaption>
    <b>Figura 8</b>. Casilla de verificación Offline, en azul
  </figcaption>
</figure>

[pwa]: /web/progressive-web-apps/
[sw]: /web/fundamentals/getting-started/primers/service-workers

### Cómo emular conexiones de red lentas {: #throttling }

Emula velocidades de conexión 2G, 3G y otras desde el menú **Network Throttling**.


<figure>
  <img src="imgs/network-panel-throttling-menu.svg"
       alt="Menú Network Throttling.">
  <figcaption>
    <b>Figura 9</b>. Menú Network Throttling, en azul
  </figcaption>
</figure>

Puedes seleccionar una variedad de valores preestablecidos, como Regular o Good 2G. También
puedes agregar tus propios valores preestablecidos personalizados si abres el menú Network Throttling
y seleccionas **Custom** > **Add**.

DevTools muestra un ícono de advertencia junto a la pestaña **Network** para
recordarte que está habilitada la restricción de red.

#### Cómo emular conexiones de red lentas desde el panel lateral Network Conditions {: #throttling-network-conditions }

Si deseas restringir la conexión de red mientras trabajas en otros paneles de
DevTools, usa el panel lateral Network Conditions.

1. Abre el [panel lateral Network Conditions](#network-conditions).
1. Selecciona la velocidad de conexión deseada en el menú **Network Throttling**.

### Cómo borrar manualmente cookies del navegador {: #clear-cookies }

Para borrar manualmente cookies del navegador en cualquier momento, haz clic en cualquier lugar de la
tabla Requests y selecciona **Clear Browser Cookies**.

<figure>
  <img src="imgs/clear-browser-cookies.png"
       alt="Selección de Clear Browser Cookies.">
  <figcaption>
    <b>Figura 10</b>. Selección de Clear Browser Cookies
  </figcaption>
</figure>

### Cómo anular un usuario-agente {: #user-agent }

Para anular manualmente el usuario-agente:

1. Abre el [panel lateral Network Conditions](#network-conditions).
1. Desmarca **Select automatically**.
1. Elige una de las opciones de usuario-agente del menú o ingresa una personalizada en el
   cuadro de texto.

## Cómo filtrar solicitudes {: #filter }

### Cómo filtrar solicitudes por propiedades {: #filter-by-property }

Utiliza el cuadro de texto **Filter** para filtrar solicitudes según sus propiedades, como
dominio o tamaño de la solicitud.

Si no ves el cuadro de texto, el panel Filters probablemente esté oculto.
Consulta [cómo ocultar el panel Filters](#hide-filters).

<figure>
  <img src="imgs/filter-text-box.svg" alt="Cuadro de texto Filters.">
  <figcaption>
    <b>Figura 11</b>. Cuadro de texto Filters, en azul
  </figcaption>
</figure>

Puedes usar varias propiedades simultáneamente si separas cada propiedad
con un espacio. Por ejemplo, `mime-type:image/gif larger-than:1K` muestra
todos los GIF de más de un kilobyte. Estos filtros de varias propiedades
son equivalentes a operaciones AND. Actualmente no se admiten
operaciones OR.

La siguiente es una lista completa de las propiedades admitidas.

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

### Cómo filtrar solicitudes por tipo {: #filter-by-type }

Para filtrar solicitudes por tipo de solicitud, haz clic en los botones **XHR**, **JS**, **CSS**,
**Img**, **Media**, **Font**, **Doc**, **WS** (WebSocket), **Manifest** u
**Other** (cualquier otro tipo no mencionado aquí) en el panel Network.

Si no ves estos botones, el panel Filters probablemente esté oculto.
Consulta [cómo ocultar el panel Filters](#hide-filters).

Para habilitar simultáneamente varios tipos de filtros, mantén presionado <kbd>Command</kbd>
(Mac) o <kbd>Ctrl</kbd> (Windows o Linux), y después haz clic.

<figure>
  <img src="imgs/multi-type-filter.png"
       alt="Uso de los filtros de tipo para mostrar recursos de JS, CSS y
            Doc[umento].">
  <figcaption>
    <b>Figura 12</b>. Uso de los filtros de tipo para mostrar recursos de JS, CSS y
            Doc[umento].
  </figcaption>
</figure>

### Cómo filtrar solicitudes por tiempo {: #filter-by-time }

Haz clic y arrastra hacia la izquierda o la derecha en el panel Overview para mostrar solo solicitudes
que estaban activas durante ese período. El filtro es inclusivo. Se muestran todas las solicitudes
que hayan estado activas por el tiempo destacado.

<figure>
  <img src="imgs/overview-filter.png"
       alt="Filtro de solicitudes que no hayan estado activas aproximadamente 2500 ms.">
  <figcaption>
    <b>Figura 13</b>. Filtro de solicitudes que no hayan estado activas aproximadamente
    2500 ms
  </figcaption>
</figure>

### Cómo ocultar URL de datos

Las [URL de datos][data-uris] son archivos pequeños insertados en otros documentos. Las
solicitudes de la tabla Requests que comienzan con
`data:` son URL de datos.

Marca la casilla de verificación **Hide data URLs** para ocultar estas solicitudes.

<figure>
  <img src="imgs/hide-data-urls.svg" alt="Casilla de verificación Hide Data URLs.">
  <figcaption>
    <b>Figura 14</b>. Casilla de verificación Hide Data URLs.
  </figcaption>
</figure>

[data-uris]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs

## Cómo clasificar solicitudes

De manera predeterminada, las solicitudes de la tabla Requests se ordenan por hora de
inicio, pero puedes aplicar otros criterios para ordenar la tabla.

### Cómo ordenar por columna {: #sort-by-column }

Haz clic en el encabezado de cualquiera de las columnas de la tabla Requests a fin de usar esa columna para ordenar las
solicitudes.

### Cómo ordenar por fase de actividad {: #sort-by-activity }

Para cambiar la manera en la que Waterfall ordena las solicitudes, haz clic con el botón secundario en el encabezado de la
tabla Requests, desplázate sobre **Waterfall** y selecciona una de las siguientes
opciones:

* **Start Time**: La solicitud que se inició primero es la primera de la lista.
* **Response Time**: La solicitud que se comenzó a descargar primero es la primera de la lista.
* **End Time**: La solicitud que se finalizó primero es la primera de la lista.
* **Total Duration**: La solicitud con la menor configuración de conexión y
  solicitud/respuesta es la primera de la lista.
* **Latency**: La solicitud que esperó menos tiempo por una respuesta es
  la primera de la lista.

En estas descripciones se supone que cada opción respectiva se ordena de más corta
a más larga. Al hacer clic en el encabezado de la columna **Waterfall**, se invierte el orden.

<figure>
  <img src="imgs/waterfall-total-duration.png"
       alt="Columna Waterfall ordenada por duración total.">
  <figcaption>
    <b>Figura 15</b>. Columna Waterfall ordenada por duración total. La porción
    más clara de cada barra es el tiempo que se pasó en espera. La porción más oscura indica el tiempo
    que se pasó descargando bytes.
  </figcaption>
</figure>

## Cómo analizar solicitudes {: #analyze }

Mientras DevTools está abierta, registra todas las solicitudes en el panel Network.
Usa el panel Network para analizar solicitudes.

### Cómo ver un registro se solicitudes {: #requests }

Usa la tabla Requests para ver un registro de todas las solicitudes hechas mientras DevTools
estaba abierto. Si haces clic o te desplazas sobre una solicitud, se muestra más información
sobre ella.

<figure>
  <img src="imgs/requests-table.svg"
       alt="Tabla Requests.">
  <figcaption>
    <b>Figura 16</b>. Tabla Requests, en azul
  </figcaption>
</figure>

La tabla Requests muestra las siguientes columnas de manera predeterminada.

* **Name**: Es el nombre de archivo o identificador del recurso.
* **Status**: Indica el código de estado HTTP.
* **Type**: Indica el tipo de MIME del recurso solicitado.
* **Initiator**: Los siguientes objetos o procesos pueden iniciar solicitudes:
    * **Parser**: Es el analizador HTML de Chrome.
    * **Redirect**: Es la redirección de HTTP.
    * **Script**: Es la función de JavaScript.
    * **Other**: Es algún otro proceso o acción,    como la navegación a una página
      mediante un vínculo o el ingreso de una URL en la barra de direcciones.
* **Size**: Es el tamaño combinado de los encabezados de la respuesta
  y el cuerpo de la respuesta, como los entrega el servidor.
* **Time**: Es la duración total, desde el inicio de la solicitud hasta la
  recepción del último byte de la respuesta.
* [**Waterfall**](#waterfall): Es un desglose visual de cada actividad de la solicitud.

#### Como agregar o quitar columnas {: #columns }

Haz clic con el botón en el encabezado de la tabla Requests y selecciona una opción
para ocultarla o mostrarla. Las opciones que se muestran tienen marcas de selección junto a ellas.

<figure>
  <img src="imgs/add-column.png"
       alt="Agregado de una columna a la tabla Requests.">
  <figcaption>
    <b>Figura 17</b>. Agregado de una columna a la tabla Requests.
  </figcaption>
</figure>

#### Cómo agregar columnas personalizadas {: #custom-columns }

Para agregar una columna personalizada a la tabla Requests, haz clic con el botón secundario en el encabezado de la tabla
y selecciona **Response Headers** > **Manage Header Columns**.

<figure>
  <img src="imgs/custom-column.png"
       alt="Agregado de una columna personalizada a la tabla Requests.">
  <figcaption>
    <b>Figura 18</b>. Agregado de una columna personalizada a la tabla Requests.
  </figcaption>
</figure>

### Cómo ver el tiempo de las solicitudes en relación a otras solicitudes {: #waterfall }

Usa la cascada para ver el tiempo de la solicitud en relación a otras solicitudes.
De manera predeterminada, la cascada está organizada por hora de inicio de las solicitudes.
Así, las solicitudes que están más hacia la izquierda comenzaron antes que las
que están más hacia la derecha.

Consulta las distintas maneras
en las que puedes ordenar la cascada en [cómo ordenar por fase de actividad](#sort-by-activity).

<figure>
  <img src="imgs/waterfall.png"
       alt="Columna Waterfall del panel Requests.">
  <figcaption>
    <b>Figura 19</b>. Columna Waterfall del panel Requests.
  </figcaption>
</figure>

### Cómo analizar los marcos de una conexión de WebSocket {: #frames }

Para ver los marcos de una conexión de WebSocket, haz lo siguiente:

1. Haz clic en la URL de la conexión de WebSocket, debajo de la columna **Name**
   de la tabla Requests.
1. Haz clic en la pestaña **Frames**. La tabla muestra los últimos 100 marcos.

Para actualizar la tabla, vuelve a hacer clic en la conexión de WebSocket, debajo de la columna
**Name** en la tabla Requests.

<figure>
  <img src="imgs/frames.svg"
       alt="Pestaña Frames.">
  <figcaption>
    <b>Figura 20</b>. Pestaña Frames, en azul
  </figcaption>
</figure>

La tabla tiene tres columnas:

* **Data**: Indica la carga del mensaje. Si el mensaje es texto sin formato, se
  muestra aquí. Para los códigos de operación binarios, en esta columna se
  muestran el nombre y el código correspondientes. Se admiten los siguientes códigos de operación: Continuation Frame,
  Binary Frame, Connection Close Frame, Ping Frame y Pong Frame.
* **Length**: Es la extensión de la carga útil del mensaje, en bytes.
* **Time**: Es la hora a la que se recibió o envió el mensaje.

Los mensajes están codificados por color según el tipo al que pertenecen:

* Los mensajes de texto salientes son de color verde claro.
* Los entrantes son de color blanco.
* Los códigos de operaciones de WebSocket son de color amarillo claro.
* Los errores se muestran de color rojo claro.

### Cómo obtener una vista previa del cuerpo de una respuesta {: #preview }

Para obtener una vista previa del cuerpo de una respuesta, haz lo siguiente:

1. Haz clic en la URL de la solicitud, debajo de la columna **Name**
   de la tabla Requests.
1. Haz clic en la pestaña **Preview**.

Esta pestaña es útil principalmente para visualizar imágenes.

<figure>
  <img src="imgs/preview.svg"
       alt="Pestaña Preview.">
  <figcaption>
    <b>Figura 21</b>. Pestaña Preview, en azul
  </figcaption>
</figure>

### Cómo ver un cuerpo de respuesta {: #response }

Para ver el cuerpo de la respuesta a una solicitud, haz lo siguiente:

1. Haz clic en la URL de la solicitud, debajo de la columna **Name**
   de la tabla Requests.
1. Haz clic en la pestaña **Response**.

<figure>
  <img src="imgs/response.svg"
       alt="Pestaña Response.">
  <figcaption>
    <b>Figura 22</b>. Pestaña Response, en azul
  </figcaption>
</figure>

### Cómo ver encabezados HTTP {: #headers }

Para ver datos de encabezados HTTP acerca de una solicitud:, haz lo siguiente:

1. Haz clic en la URL de la solicitud, debajo de la columna **Name** de la tabla
   Requests.
1. Haz clic en la pestaña **Headers**.

<figure>
  <img src="/web/tools/chrome-devtools/images/headers.svg"
       alt="Pestaña Headers.">
  <figcaption>
    <b>Figura 23</b>. Pestaña Headers, en azul
  </figcaption>
</figure>

#### Cómo ver el origen de encabezados HTTP {: #header-source }

De manera predeterminada, la pestaña Headers muestra los nombres de los encabezados ordenados alfabéticamente. Para ver los nombres de los encabezados
HTTP en el orden en el que se los recibió, haz lo siguiente:

1. Abre la pestaña **Headers** de la solicitud de tu interés. Consulta
   [cómo ver encabezados HTTP](#headers).
1. Haz clic en **view source**, junto a la sección **Request Header** o **Response
   Header**.

### Cómo ver los parámetros de las strings de consulta {: #query-string }

Para ver los parámetros de las strings de consulta de una URL en un formato en lenguaje natural, haz lo siguiente:

1. Abre la pestaña **Headers** de la solicitud de tu interés. Consulta
   [cómo ver encabezados HTTP](#headers).
1. Ve a la sección **Query String Parameters**.

<figure>
  <img src="imgs/query-string.svg" alt="Sección Query String Parameters.">
  <figcaption>
    <b>Figura 24</b>. Sección Query String Parameters, en azul
  </figcaption>
</figure>

#### Cómo ver el origen de los parámetros de las strings de consulta {: #query-string-source }

Para ver el origen de los parámetros de las strings de consulta de una solicitud, haz lo siguiente:

1. Ve a la sección Query String Parameters. Consulta [cómo ver parámetros
   de string de consulta](#query-string).
1. Haz clic en **view source**.

#### Cómo ver los parámetros de las strings de consulta codificados para direcciones URL {: #query-string-encodings }

Para ver los parámetros de las strings de consulta en formato de lenguaje natural, pero conservando la
codificación, haz lo siguiente:

1. Ve a la sección Query String Parameters. Consulta [cómo ver parámetros
   de string de consulta](#query-string).
1. Haz clic en **view URL encoded**.

### Cómo ver cookies {: #cookies }

Para ver las cookies enviadas en el encabezado HTTP de una solicitud, haz lo siguiente:

1. Haz clic en la URL de la solicitud, debajo de la columna **Name**
   de la tabla Requests.
1. Haz clic en pestaña **Cookies**.

Consulta [Campos](/web/tools/chrome-devtools/manage-data/cookies#fields) para obtener una
descripción de cada una de las columnas.

<figure>
  <img src="imgs/cookies.svg"
       alt="Pestaña Cookies.">
  <figcaption>
    <b>Figura 25</b>. Pestaña Cookies, en azul
  </figcaption>
</figure>

### Cómo ver el desglose de tiempo de una solicitud {: #timing }

Para ver el desglose de horas de una solicitud, haz lo siguiente:

1. Haz clic en la URL de la solicitud, debajo de la columna **Name**
   de la tabla Requests.
1. Haz clic en la pestaña **Timing**.

Consulta [cómo obtener una vista previa de un desglose de tiempo](#timing-preview) para conocer una manera más rápida
de acceder a estos datos.

Consulta [la explicación de fases de desglose de tiempo](#timing-explanation) para obtener más
información acerca de cada una de las fases que pueden aparecer en la pestaña Timing.

<figure>
  <img src="imgs/timing.svg" alt="Pestaña Timing.">
  <figcaption>
    <b>Figura 26</b>. Pestaña Timing, en azul
  </figcaption>
</figure>

A continuación, se presenta más información acerca de cada una de las fases.

Consulta [cómo ver un desglose de tiempo](#timing-breakdown) para conocer otra manera de acceder
a esta vista.

#### Cómo obtener una vista previa de un desglose de tiempo {: #timing-preview }

Para obtener una vista previa del desglose de tiempo de una solicitud, desplázate sobre
la entrada de la solicitud en la columna **Waterfall** de la tabla Requests.

Consulta [cómo ver el desglose de tiempo de una solicitud](#timing) para conocer una manera de acceder
a estos datos que no requiere desplazarse sobre la entrada de la solicitud.

<figure>
  <img src="imgs/waterfall-hover.png"
       alt="Vista previa del desglose de tiempo de una solicitud.">
  <figcaption>
    <b>Figura 27</b>. Vista previa del desglose de tiempo de una solicitud
  </figcaption>
</figure>

#### Explicación de fases de desglose de tiempo {: #timing-explanation }

A continuación, se presenta más información acerca de cada una de las fases que pueden aparecer en la pestaña
Timing:

* **Queueing**: El navegador agrega solicitudes a la cola cuando:
    * Hay solicitudes de mayor prioridad.
    * Ya hay seis conexiones TCP abiertas para ese origen, que es
      el límite. Esto se aplica solo a HTTP/1.0 y HTTP/1.1.
    * El navegador está asignando espacio brevemente en la caché del disco
* **Stalled**: La solicitud se puede detener por cualquiera de los motivos descritos
  en **Queueing**.
* **DNS Lookup**: El navegador está resolviendo la dirección IP de la solicitud.
* **Proxy negotiation**: El navegador está negociando la solicitud con un [servidor
  proxy](https://en.wikipedia.org/wiki/Proxy_server).
* **Request sent**: Se está enviando la solicitud..
* **ServiceWorker Preparation**: El navegador está iniciando el service worker.
* **Request to ServiceWorker**: Se está enviando la solicitud al service
  worker.
* **Waiting (TTFB)**: El navegador está esperando el primer byte de una respuesta.
  TTFB es la sigla de Time To First Byte, o tiempo hasta el primer byte. Este tiempo incluye un viaje de ida y vuelta de latencia
  y el tiempo que el servidor tardó en preparar la respuesta.
* **Content Download**: El navegador está recibiendo la respuesta.
* **Receiving Push**: El navegador está recibiendo datos para esta respuesta a través del
  servidor Push HTTP/2.
* **Reading Push**: El navegador está leyendo los datos locales recibidos anteriormente.

### Ver iniciadores y dependencias {: #initiators-dependencies }

Para ver los iniciadores y las dependencias de una solicitud, mantén presionada la tecla <kbd>Mayúsculas</kbd>
y desplázate sobre la solicitud en la tabla Requests. DevTools marca los iniciadores de color
verde y las dependencias de color rojo.

<figure>
  <img src="imgs/initiators-dependencies.png"
       alt="Vista de iniciadores y dependencias de una solicitud.">
  <figcaption>
    <b>Figura 28</b>. Vista de iniciadores y dependencias de una solicitud
  </figcaption>
</figure>

Cuando la tabla Requests está ordenada cronológicamente, la primera
solicitud verde que se encuentra arriba de la solicitud sobre la que te estás desplazando es el iniciador
de la dependencia. Si hay otra solicitud verde arriba de esa, esa solicitud
más arriba es el iniciador del iniciador. etc.

### Cómo ver eventos de carga {: #load }

DevTools muestra el tiempo de los eventos `DOMContentLoaded` y `load` en
varios lugares del panel Network. El evento `DOMContentLoaded` es de color
azul y `load`, rojo.

<figure>
  <img src="imgs/load-events.svg"
       alt="Ubicaciones de los eventos DOMContentLoaded y load en el panel Network.">
  <figcaption>
    <b>Figura 29</b>. Ubicaciones de los eventos <code>DOMContentLoaded</code> y
    <code>load</code> en el panel Network
  </figcaption>
</figure>

### Cómo ver la cantidad total de solicitudes {: #total-number }

La cantidad total de solicitudes se muestra en el panel Summary, en la parte inferior del
panel Network.

Warning: Esta cifra solo sigue las solicitudes que se hayan registrado después de abrir
DevTools. Si hubo otras solicitudes antes de abrir DevTools, esas
no se cuentan.

<figure>
  <img src="imgs/total-requests.svg"
       alt="Cantidad total de solicitudes desde que se abrió DevTools">
  <figcaption>
    <b>Figura 30</b>. Cantidad total de solicitudes desde que se abrió DevTools
  </figcaption>
</figure>

### Cómo ver el tamaño total de descarga {: #total-size }

El tamaño total de descarga de las solicitudes se muestra en el panel Summary, en la parte
inferior del panel Network.

Warning: Esta cifra solo sigue las solicitudes que se hayan registrado después de abrir
DevTools. Si hubo otras solicitudes antes de abrir DevTools, esas
no se cuentan.

<figure>
  <img src="imgs/total-size.svg"
       alt="Tamaño de descarga total de las solicitudes">
  <figcaption>
    <b>Figura 31</b>. Tamaño de descarga total de las solicitudes
  </figcaption>
</figure>

Consulta [cómo ver el tamaño sin comprimir de un recurso](#uncompressed) para saber cuánto
pesarán los recursos después de que el navegador los descomprima.

### Cómo ver el seguimiento de pila que ocasionó una solicitud {: #initiator-stack-trace }

Cuando una instrucción de JavaScript hace que se solicite un recurso, desplázate sobre la columna **Initiator**
para ver el seguimiento de pila que lleva a la solicitud.

<figure>
  <img src="imgs/initiator-stack.png"
       alt="Seguimiento de pila que lleva a la solicitud de un recurso">
  <figcaption>
    <b>Figura 32</b>. Seguimiento de pila que lleva a la solicitud de un recurso
  </figcaption>
</figure>

### Cómo ver el tamaño sin comprimir de un recurso {: #uncompressed }

Haz clic en **Use Large Request Rows** ![Use Large Request
Rows](imgs/large-resource-rows-button.png){:.inline-icon} y mira el
valor inferior de la columna **Size**.

<figure>
  <img src="imgs/large-request-rows.png"
       alt="Ejemplo de recursos sin comprimir.">
  <figcaption>
    <b>Figura 33</b>. El tamaño comprimido del archivo <code>jquery-bundle.js</code>
    que se envió a través de la red fue <code>30.9 KB</code>, mientras que el tamaño sin comprimir fue
    <code>86.3 KB</code>
  </figcaption>
</figure>

## Cómo exportar datos de solicitudes {: #export }

### Cómo guardar todas las solicitudes de red en un archivo HAR {: #save-as-har }

Para guardar todas las solicitudes de red en un archivo HAR, haz lo siguiente:

1. Haz clic con el botón secundario en cualquiera de las solicitudes de la tabla Requests.
1. Selecciona **Save as HAR with Content**. DevTools guarda en un archivo HAR todas las solicitudes que se han realizado desde que
   abriste DevTools. No hay manera de filtrar solicitudes ni de guardar solo una
   solicitud.

Cuando ya tienes un archivo HAR, puedes importarlo a DevTools para análisis. Simplemente
arrastra y suelta el archivo HAR en la tabla Requests. Consulta también [Analizador HAR][HAR
Analyzer]{: .external }.

[HAR Analyzer]: https://toolbox.googleapps.com/apps/har_analyzer/

<figure>
  <img src="imgs/save-as-har.png"
       alt="Selección de Save as HAR with Content.">
  <figcaption>
    <b>Figura 34</b>. Selección de <b>Save as HAR with Content</b>
  </figcaption>
</figure>

### Cómo copiar una o varias solicitudes en el portapapeles {: #copy }

En la columna **Name** de la tabla Requests, haz clic con el botón secundario en una solicitud,
desplázate sobre **Copy** y selecciona una de las siguientes opciones:

* **Copy Link Address**: Copia la URL de la solicitud en el portapapeles.
* **Copy Response**: Copia el cuerpo de la respuesta en el portapapeles.
* **Copy as cURL**: Copia la solicitud como comando cURL.
* **Copy All as cURL**: Copia todas las solicitudes como cadena de comandos cURL.
* **Copy All as HAR**: Copia todas las solicitudes como datos HAR.

<figure>
  <img src="imgs/copy.png" alt="Selección de Copy Response.">
  <figcaption>
    <b>Figura 35</b>. Selección de Copy Response
  </figcaption>
</figure>

## Cómo cambiar el diseño del panel Network

Expande o contrae secciones de la IU del panel Network para enfocarte en lo que
es importante para ti.

### Cómo ocultar el panel Filters {: #hide-filters }

De manera predeterminada, DevTools muestra el [panel Filters](#filters).
Haz clic en **Filter** ![Filter][filter]{: .devtools-inline } para ocultarlo.

<figure>
  <img src="imgs/hide-filters.svg" alt="Botón Hide Filters">
  <figcaption>
    <b>Figura 36</b>. Hide Filters, en azul
  </figcaption>
</figure>

[filter]: imgs/filters.png

### Cómo usar filas de solicitud grandes {: #request-rows }

Usa filas grandes cuando desees tener más espacio en blanco en la tabla
de solicitudes de red. Algunas columnas también proporcionan un poco más de información
cuando usas filas grandes. Por ejemplo, el valor inferior de la columna **Size**
es el tamaño sin comprimir de una solicitud.

<figure>
  <img src="imgs/large-request-rows.png"
       alt="Ejemplo de filas de solicitud grandes en el panel Requests.">
  <figcaption>
    <b>Figura 37</b>. Ejemplo de filas de solicitud grandes en el panel Requests.
  </figcaption>
</figure>

Haz clic en **Use large request rows** ![Use large request
rows][large]{:.devtools-inline} para habilitar el uso de filas grandes.

[large]: imgs/large-resource-rows-button.png

<figure>
  <img src="imgs/large-request-rows.svg" alt="Botón Large Request Rows">
  <figcaption>
    <b>Figura 38</b>. Large Request Rows, en azul
  </figcaption>
</figure>

### Cómo ocultar el panel Overview {: #hide-overview }

De manera predeterminada, DevTools muestra el [panel Overview](#overview).
Haz clic en **Hide overview** ![Hide overview][hide]{:.devtools-inline} para ocultarlo.

<figure>
  <img src="imgs/hide-overview.svg" alt="Botón Hide Overview">
  <figcaption>
    <b>Figura 39</b>. Hide Overview, en azul
  </figcaption>
</figure>

[hide]: imgs/hide-overview.png

## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}
