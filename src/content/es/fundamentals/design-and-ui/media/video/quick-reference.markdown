---
title: "Referencia rápida"
description: "Un resumen de las propiedades del elemento de vídeo"
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - Usa el elemento de vídeo que se cargará y que descodificará y reproducirá el vídeo en tu sitio.
    - Produce vídeos en varios formatos para llegar a varias plataformas móviles.
    - Dales un tamaño correcto a los vídeos y asegúrate de que no sobrepasen los elementos que los contienen.
    - La accesibilidad es importante; añade el elemento de pista como elemento secundario del elemento de vídeo.
notes:
  media-fragments:
    - El API de Media Fragments es compatible con la mayoría de las plataformas, pero no con iOS.
    - Asegúrate de que las solicitudes de intervalo de bytes sean compatibles con tu servidor. Las solicitudes de intervalo se habilitan de manera predeterminada en la mayoría de los servidores, pero algunos servicios de alojamiento pueden inhabilitarlas.
  dont-overflow:
    - No fuerces el tamaño de los elementos cuando este resulte en una relación de aspecto distinta a la del vídeo original. Los elementos achatados o estirados no quedan bien.
  accessibility-matters:
    - El elemento de pista es compatible con Chrome para Android, con iOS Safari y con todos los navegadores actuales de ordenador, excepto con Firefox (consulta <a href="http://caniuse.com/track" title="Estado de compatibilidad del elemento de pista">caniuse.com/track</a>). También hay varios Polyfill disponibles. Recomendamos <a href='//www.delphiki.com/html5/playr/' title='Polyfill de elemento de pista de Playr'>Playr</a> o <a href='//captionatorjs.com/' title='Pista de Captionator'>Captionator</a>.
  construct-video-streams:
    - MSE es compatible con Chrome y Opera en Android, y con Internet Explorer 11 y Chrome en ordenador. También está previsto que sea compatible con la <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='cronología de implementación de Firefox Media Source Extensions'>Firefox</a>.
---

<p class="intro">
  Un resumen de las propiedades del elemento de vídeo
</p>

{% include shared/toc.liquid %}


## Atributos del elemento de vídeo

Para ver una lista completa de los atributos del elemento de vídeo y de sus definiciones, consulta las [especificaciones del elemento de vídeo](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table class="mdl-data-table mdl-js-data-table">
  <thead>
      <th>Atributo</th>
      <th>Disponibilidad</th>
      <th>Descripción</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>src</code></td>
      <td data-th="Availability">Todos los navegadores</td>
      <td data-th="Description">Dirección (URL) del vídeo</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>poster</code></td>
      <td data-th="Availability">Todos los navegadores</td>
      <td data-th="Description">Dirección (URL) de un archivo de imagen que puede mostrar el navegador en cuando el elemento de vídeo se muestre, sin necesidad de descargar contenido de vídeo.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>preload</code></td>
      <td data-th="Availability">Todos los navegadores para móviles ignoran la carga previa.</td>
      <td data-th="Description">Indica al navegador que es lo mejor es cargar los metadatos (o un vídeo) antes de la reproducción. Las opciones son `none`, `metadata` o `auto` (consulta la sección `Preload` para obtener información más detallada). </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>autoplay</code></td>
      <td data-th="Availability">No es compatible con iPhone o Android, pero es compatible con todos los navegadores de ordenador y de iPad, y con Firefox y Opera para Android.</td>
      <td data-th="Description">Inicia la descarga y la reproducción lo antes posible (consulta la sección `Autoplay`). </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>loop</code></td>
      <td data-th="Availability">Todos los navegadores</td>
      <td data-th="Description">Reproduce el vídeo en bucle.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>controls</code></td>
      <td data-th="Availability">Todos los navegadores</td>
      <td data-th="Descripción">Muestra los controles de vídeo predeterminados (reproducir, detener, etc.)</td>
    </tr>
  </tbody>
</table>

### Autoplay

En ordenador, `autoplay` indica al navegador que inicie la descarga inmediatamente y que reproduzca el vídeo lo antes posible. En iOS, y en Chrome para Android, `autoplay` no funciona; los usuarios deben tocar la pantalla para reproducir el vídeo.

Incluso en las plataformas donde no es posible usar `autoplay`, deberías plantearte si es buena idea utilizarlo.

* El uso de datos puede ser caro.
* Si haces que los medios se descarguen y se inicie la reproducción sin solicitarlo antes, tanto el ancho de banda como la CPU podrían colapsarse y, por lo tanto, la página tardaría más en mostrarse.
* Es posible que los usuarios accedan desde un entorno en el que la reproducción de vídeo o de audio pueda molestar.

La reproducción automática es configurable en WebView de Android a través del [API de WebSettings](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
El valor predeterminado es `true` pero se puede inhabilitar con una aplicación de WebView.

### Preload

El atributo `preload` indica al navegador cuánta información o contenido debería cargarse previamente.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Valor</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Value"><code>none</code></td>
      <td data-th="Descripción">Es posible que el usuario ni siquiera vea el vídeo; no se carga previamente nada.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>metadata</code></td>
      <td data-th="Description">Los metadatos (duración, dimensiones, pistas de texto) deberían cargarse previamente, pero con una cantidad mínima de vídeo.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>auto</code></td>
      <td data-th="Description">Lo ideal sería descargar todo el vídeo directamente.</td>
    </tr>
  </tbody>
</table>

El atributo `preload` afecta de diferente manera a cada plataforma.
Por ejemplo, Chrome almacena en el búfer 25 segundos de vídeo en ordenadores, pero no almacena nada en iOS o en Android. Esto significa que en móvil, el inicio de la reproducción podría retrasarse, algo que no sucede en ordenadores. Consulta la [página de prueba de Steve Souders](//stevesouders.com/tests/mediaevents.php) para obtener información más detallada.

## JavaScript

[El artículo `HTML5 Rocks Video`](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) resume muy bien las propiedades, los métodos y los eventos de JavaScript que pueden usarse para controlar la reproducción de vídeo. Hemos incluido aquí el contenido, añadiendo información actualizada sobre móviles donde lo hemos considerado necesario.

### Propiedades

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Propiedad</th>
    <th>Descripción</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>currentTime</code></td>
      <td data-th="Descripción">Obtiene o establece la posición de reproducción en segundos.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>volume</code></td>
      <td data-th="Description">Obtiene o establece el nivel de volumen actual del vídeo.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>muted</code></td>
      <td data-th="Description">Obtiene o establece el silenciamiento de audio.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>playbackRate</code></td>
      <td data-th="Description">Obtiene o establece la tasa de reproducción; 1 es la velocidad de avance normal.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>buffered</code></td>
      <td data-th="Description">Información sobre la cantidad de vídeo que se almacena en el búfer y que está listo para reproducirse (mira <a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="Demostración de la cantidad de vídeo que se almacena en búfer en un elemento canvas">esta demostración</a>).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>currentSrc</code></td>
      <td data-th="Description">La dirección del vídeo que se reproduce.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoWidth</code></td>
      <td data-th="Description">Ancho del vídeo en píxeles (que puede ser distinto del ancho del elemento de vídeo)</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoHeight</code></td>
      <td data-th="Description">Alto del vídeo en píxeles (que puede ser distinto del alto del elemento de vídeo)</td>
    </tr>
  </tbody>
</table>

`playbackRate` ({% link_sample _code/scripted.html %}ver demostración{% endlink_sample %}) y `volume` no son compatibles con dispositivos móviles.

### Métodos

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Método</th>
    <th>Descripción</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Method"><code>load()</code></td>
      <td data-th="Descripción">Carga o vuelve a cargar una fuente de vídeo sin iniciar la reproducción; por ejemplo, cuando la fuente del vídeo se modifica con JavaScript.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>play()</code></td>
      <td data-th="Description">Reproduce el vídeo desde su ubicación actual.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>pause()</code></td>
      <td data-th="Description">Detiene el vídeo desde su ubicación actual.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>canPlayType('format')</code></td>
      <td data-th="Description">Comprueba qué formatos son compatibles (consulta `Comprobar qué formatos son compatibles`).</td>
    </tr>
  </tbody>
</table>

En móvil (a excepción de Opera en Android), `play()` y `pause()` no funcionan salvo que
se llamen en respuesta de una acción del usuario, como hacer clic en un botón. Mira esta {% link_sample _code/scripted.html %}demostración{% endlink_sample %}. Del mismo modo, la reproducción no se puede iniciar si el contenido no está insertado en los vídeos de YouTube.

### Eventos

Solo hay un subconjunto de eventos de medios que pueden activarse. Consulta la página [Eventos de medios](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) en Mozilla Developer Network para obtener una lista completa.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Evento</th>
    <th>Descripción</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event"><code>canplaythrough</code></td>
      <td data-th="Descripción">Se activa cuando hay suficientes datos disponibles como para que el navegador pueda reproducir el vídeo de forma completa sin interrupciones.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>ended</code></td>
      <td data-th="Description">Se activa cuando acaba la reproducción del vídeo.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>error</code></td>
      <td data-th="Description">Se activa si se produce un error.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>playing</code></td>
      <td data-th="Description">Se activa cuando el vídeo se reproduce por primera vez después de una pausa o de reiniciarse.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>progress</code></td>
      <td data-th="Description">Se activa cada cierto tiempo para indicar el progreso de la descarga.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>waiting</code></td>
      <td data-th="Description">Se activa cuando se retrasa una acción que espera a que otra acción finalice.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>loadedmetadata</code></td>
      <td data-th="Description">Se activa cuando el navegador acaba de cargar los metadatos de vídeo: la duración, las dimensiones y las pistas de texto.</td>
    </tr>
  </tbody>
</table>



