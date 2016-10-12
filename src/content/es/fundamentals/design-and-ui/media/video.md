project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprende los métodos más sencillos para añadir vídeos en tu sitio y asegurarte de que los usuarios disfruten de la mejor experiencia posible en cualquier dispositivo.


{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Vídeo {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

A los usuarios les gusta los vídeos, que pueden ser divertidos e informativos. En los dispositivos móviles, los vídeos pueden ser el modo más fácil de consumir información. Pero consumen ancho de banda y no siempre funcionan de la misma forma en cada plataforma. A los usuarios no les gusta esperar a que carguen los vídeos, o pulsar el botón de reproducción y que no pase nada. Aprende los métodos más sencillos para añadir vídeos en tu sitio y asegurarte de que los usuarios disfruten de la mejor experiencia posible en cualquier dispositivo.




## Añadir un vídeo 




Aprende los métodos más sencillos para añadir vídeos en tu sitio y asegurarte de que los usuarios disfruten de la mejor experiencia posible en cualquier dispositivo.



### TL;DR {: .hide-from-toc }
- Usa el elemento de vídeo que se cargará y que descodificará y reproducirá el vídeo en tu sitio.
- Produce vídeos en varios formatos para llegar a varias plataformas móviles.
- Dales un tamaño correcto a los vídeos y asegúrate de que no sobrepasen los elementos que los contienen.
- La accesibilidad es importante; añade el elemento de pista como elemento secundario del elemento de vídeo.


### Añadir el elemento de vídeo

Usa el elemento de vídeo que se cargará y que descodificará y reproducirá el vídeo en tu sitio:

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>Este navegador no es compatible con el elemento de vídeo.</p>
</video>


    <video src="chrome.webm" type="video/webm">
         <p>Tu navegador no es compatible con el elemento de vídeo.</p>
    </video>
    

### Especificar varios formatos de archivo

No todos los navegadores son compatibles con los mismos formatos de vídeo.
El elemento `<source>` permite especificar varios formatos de respaldo en caso de que uno de ellos no sea compatible con el navegador del usuario.
Por ejemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

Cuando el navegador procesa las etiquetas `<source>`, usa el atributo `type` opcional para decidir qué archivo se descargará y se reproducirá. Si el navegador es compatible con WebM, reproducirá chrome.webm. De lo contrario, comprobará si puede reproducir vídeos MPEG-4.
Consulta <a href='//www.xiph.org/video/vid1.shtml' title=Entretenida e informativa guía sobre vídeo digital>A Digital Media Primer for Geeks</a> para obtener más información sobre cómo funcionan el vídeo y el audio en la Web.

A diferencia de la publicación de HTML diferente o de las secuencias de comandos de servidor, este método conlleva varias ventajas, especialmente en los dispositivos móviles:

* Los desarrolladores pueden especificar formatos en orden de preferencia.
* La conmutación nativa del equipo cliente reduce la latencia; solo es necesaria una solicitud para obtener contenido.
* Dejar que el navegador elija el formato es más simple, rápido y posiblemente más fiable que usar una base de datos en un servidor con detección de user-agent.
* Especificar el tipo de fuente de cada archivo mejora el rendimiento de la red. El navegador puede seleccionar una fuente de vídeo sin descargar parte del vídeo para comprobar el formato.

Todas estas ventajas son importantes especialmente en dispositivos móviles, donde el ancho de banda y la latencia son algo fundamental y la paciencia del usuario es probablemente limitada. 
Si no se incluye un atributo de tipo, el rendimiento podría verse afectado negativamente cuando haya varias fuentes con tipos no admitidos.

Con las herramientas de desarrollo de navegador para móviles, compara la actividad de la red <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">con los atributos de tipo</a> y <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/notype.html">con los atributos sin tipo</a>.
Además, comprueba las cabeceras de respuesta en tus herramientas para [asegurarte de que el servidor indique el tipo MIME adecuado](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types). De lo contrario, las comprobaciones de tipo de la fuente de vídeo no funcionarán.

### Especificar una hora de inicio y de fin

Ahorra ancho de banda y haz que tu sitio sea más adaptable: usa el API de Media Fragments para añadir una hora de inicio y de fin al elemento de vídeo.

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>Este navegador no es compatible con el elemento de vídeo.</p>
</video>

Para añadir un fragmento de medios, solo tienes que añadir "#t=[start_time][,end_time]" a la URL de medios. Por ejemplo, para reproducir el vídeo entre los segundos 5 y 10, especifica:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

Además, puedes usar el API de Media Fragments para ofrecer varias vistas de un mismo vídeo (como pies de entrada en un DVD) sin necesidad de codificar y usar varios archivos.


Note: - El API de Media Fragments es compatible con la mayoría de las plataformas, pero no con iOS.
- Asegúrate de que las solicitudes de intervalo de bytes sean compatibles con tu servidor. Las solicitudes de intervalo se habilitan de manera predeterminada en la mayoría de los servidores, pero algunos servicios de alojamiento pueden inhabilitarlas.


Al usar las herramientas de navegador para desarrolladores, comprueba que se incluya `Accept Ranges: bytes` en las cabeceras de respuesta:

<img class="center" alt="Captura de pantalla de herramientas de Chrome para desarrolladores: "Accept-Ranges: bytes"" src="img/Accept-Ranges-Chrome-Dev-Tools.png">

### Incluir un póster

Añade un atributo de póster al elemento de vídeo para que los usuarios se hagan una idea del tipo de contenido que encontrarán en cuanto cargue el elemento, sin necesidad de descargar ningún vídeo o de reproducirlo.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

También puede haber un póster de respaldo en caso de que el video `src` deje de funcionar o de que ninguno de los formatos de vídeo facilitados sea compatible. El único inconveniente de los pósters es que se produce una solicitud de archivo adicional que consume algo de ancho de banda y que requiere procesamiento. Para obtener más información, consulta [Optimización de imágenes](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

A continuación, ofrecemos una comparativa de vídeos sin póster y con póster (el póster aparece en escala de grises para demostrar que no se trata del vídeo):

<img class="attempt-left" alt="Captura de pantalla de Android Chrome, modo retrato: sin póster" src="img/Chrome-Android-video-no-poster.png">
<img class="attempt-right" alt="Captura de pantalla de Android Chrome, modo retrato: con póster" src="img/Chrome-Android-video-poster.png">

<div class="clearfix"></div>



## Ofrecer alternativas para plataformas anteriores 


No todos los formatos vídeo son compatibles en todas las plataformas. Comprueba qué formatos son compatibles en las plataformas principales y asegúrate de que el vídeo funcione en cada una de ellas.



### Comprobar qué formatos son compatibles

Usa `canPlayType()` para averiguar qué formatos de vídeo son compatibles. El método usa un argumento de cadena coherente con un `mime-type` y códecs opcionales, y devuelve uno de los siguientes valores:

<table>
  <thead>
    <tr>
      <th>Valor devuelto</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Return value">(cadena vacía)</td>
      <td data-th="Description">El contenedor o el códec no es compatible.</td>
    </tr>
    <tr>
      <td data-th="Return value"><code>maybe</code></td>
      <td data-th="Description">
        Es posible que el contenedor y los códecs sean compatibles, pero el navegador
        deberá descargar parte del vídeo para comprobarlo.
      </td>
    </tr>
    <tr>
      <td data-th="Return value"><code>probably</code></td>
      <td data-th="Description">El formato parece compatible.
      </td>
    </tr>
  </tbody>
</table>

A continuación, mostramos algunos ejemplos de argumentos `canPlayType()` y de valores devueltos cuando se ejecutan en Chrome:


<table>
  <thead>
    <tr>
      <th>Tipo</th>
      <th>Respuesta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type"><code>video/xyz</code></td>
      <td data-th="Response">(cadena vacía)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response">(cadena vacía)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Response">(cadena vacía)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm</code></td>
      <td data-th="Response"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
  </tbody>
</table>


### Producir vídeo en varios formatos

Hay muchas herramientas que te permiten guardar el mismo vídeo en distintos formatos:

* Herramientas de ordenador: [FFmpeg](//ffmpeg.org/)
* Aplicaciones con interfaz gráfica de usuario: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Servicios online de codificación y transcodificación: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### Comprobar qué formato se ha usado

¿Quieres saber qué formato de vídeo ha elegido el navegador?

En JavaScript, usa la propiedad `currentSrc` del vídeo para ver la fuente utilizada.

Para ver cómo funciona, échale un vistazo a <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">esta demostración</a>: Chrome y Firefox seleccionan `chrome.webm` (porque es la primera en la lista de fuentes posibles que admiten estos navegadores), y Safari selecciona `chrome.mp4`.


## Dar un tamaño adecuado a los vídeos 




Cuando se trata de satisfacer a los usuarios, el tamaño de los vídeos es importante.


### TL;DR {: .hide-from-toc }
- No incluyas vídeos con un tamaño de marco superior o con una calidad mayor que los que admite la plataforma.
- No alargues los vídeos más de lo necesario.
- Los vídeos largos pueden provocar dificultades en las descargas y en las búsquedas; algunos navegadores tienen que esperar a que el vídeo se descargue antes de iniciar la reproducción.



### Comprobar el tamaño del vídeo

El marco del vídeo puede tener unas dimensiones distintas que el elemento de vídeo (también es posible que no se pueda mostrar una imagen usando sus dimensiones reales).

Para comprobar el tamaño codificado de un vídeo, usa las propiedades de elemento de vídeo `videoWidth` y `videoHeight`. `width` y `height` devuelven las dimensiones del elemento de vídeo, cuyo tamaño es posible que se haya especificado mediante CSS o con atributos de ancho y alto junto al contenido.

### Procura que el vídeo no supere el tamaño del elemento contenedor

Cuando los elementos de vídeo son demasiado grandes para la ventana gráfica, es posible que sobrepasen el tamaño del contenedor, lo cual imposibilita que el usuario vea el contenido o use
los controles.

<img class="attempt-left" alt="Captura de pantalla de Chrome en Android, modo retrato: elemento de vídeo sin estilos que supera el tamaño de la ventana gráfica" src="img/Chrome-Android-portrait-video-unstyled.png">
<img class="attempt-right" alt="Captura de pantalla de Chrome en Android, modo apaisado: elemento de vídeo sin estilos que supera el tamaño de la ventana gráfica" src="img/Chrome-Android-landscape-video-unstyled.png">

<div class="clearfix"></div>


Puedes controlar las dimensiones del vídeo con JavaScript o con CSS. Las bibliotecas y complementos de JavaScript como [FitVids](//fitvidsjs.com/) permiten mantener un tamaño y una relación de aspecto adecuados, incluso en vídeos Flash de YouTube y de otras fuentes.

Usa [consultas de medios en CSS](/web/fundamentals/design-and-ui/responsive/#use-css-media-queries-for-responsiveness) para especificar el tamaño de los elementos que dependen de las dimensiones de la ventana gráfica; `max-width: 100%` siempre es útil en estos casos.

Para mostrar contenido multimedia en iframes (como en vídeos de YouTube), prueba con el diseño adaptable (como el [que propone John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).


Note: No fuerces el tamaño de los elementos cuando este resulte en una relación de aspecto distinta a la del vídeo original. Los elementos achatados o estirados no quedan bien.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/responsive_embed.html" region_tag="styling" adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/responsive_embed.html" region_tag="markup" adjust_indentation="auto" %}
</pre>

Compara el <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">ejemplo adaptable</a> con la <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">versión no adaptable</a>.


## Personalizar el reproductor de vídeo 




Cada plataforma muestra el vídeo de una forma distinta. Las soluciones para móviles deben tener en cuenta la orientación del dispositivo. Usa el API de Fullscreen para controlar el modo de pantalla completa del contenido de vídeo.



Cada plataforma muestra el vídeo de una forma distinta. Las soluciones para móviles deben tener en cuenta la orientación del dispositivo. Usa el API de Fullscreen para controlar el modo de pantalla completa del contenido de vídeo.

### Funcionamiento de la orientación de dispositivo en varios dispositivos

La orientación de dispositivo no representa ningún problema en monitores de ordenador y en portátiles, pero es muy importante a la hora de tener en cuenta el diseño de la página web para móviles y tablets.

Safari en iPhone cambia correctamente la orientación de pantalla de modo retrato a modo apaisado:


<img class="attempt-left" alt="Captura de pantalla de la reproducción de un vídeo en Safari de iPhone, modo retrato" src="img/iPhone-video-playing-portrait.png">
<img class="attempt-right" alt="Captura de pantalla de la reproducción de un vídeo en Safari de iPhone, modo apaisado" src="img/iPhone-video-playing-landscape.png">

<div class="clearfix"></div>


La orientación de dispositivo puede dar problemas en iPad y en Chrome para Android.
Por ejemplo, un vídeo sin personalizar reproduciéndose en un iPad en modo apaisado tiene el siguiente aspecto:

<img class="center" alt="Captura de pantalla de la reproducción de un vídeo en Safari de iPad Retina, modo apaisado" src="img/iPad-Retina-landscape-video-playing.png">

Al establecer el ancho del vídeo con `width: 100%` o con `max-width: 100%` en CSS, se resuelven muchos problemas de diseño a la hora de cambiar la orientación del dispositivo. Además, puedes tener en cuenta otras alternativas a la pantalla completa.

### Visualización junto al contenido o en pantalla completa

Cada plataforma muestra el vídeo de una forma distinta. Safari en iPhone muestra un elemento de vídeo junto al contenido en una página web, pero reproduce el vídeo en pantalla completa:

<img class="center" alt="Captura de pantalla del elemento de vídeo en iPhone, modo retrato" src="img/iPhone-video-with-poster.png">

En Android, los usuarios pueden elegir el modo de pantalla completa haciendo clic en el icono de pantalla completa, aunque el modo predeterminado es reproducir el vídeo junto al contenido:

<img class="center" alt="Captura de pantalla de la reproducción de un vídeo en Chrome de Android, modo retrato" src="img/Chrome-Android-video-playing-portrait-3x5.png">

Safari para iPad reproduce los vídeos junto al contenido:

<img class="center" alt="Captura de pantalla de la reproducción de un vídeo en Safari de iPad Retina, modo apaisado" src="img/iPad-Retina-landscape-video-playing.png">

### Control del modo de pantalla completa del contenido

En las plataformas que no obligan a reproducir el vídeo en pantalla completa, el API de Fullscreen es [ampliamente compatible](//caniuse.com/fullscreen). Usa esta API para controlar la visualización en pantalla completa del contenido o de la página.

Para ver un elemento en pantalla completa, como un video::

    elem.requestFullScreen();
    

Para ver todo un documento en pantalla completa:

    document.body.requestFullScreen();
    

También puedes comprobar cambios de estado de pantalla completa:

    video.addEventListener("fullscreenchange", handler);
    

O bien comprobar si el elemento se encuentra en modo de pantalla completa actualmente:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Además, puedes usar la pseudoclase `fullscreen` en CSS para cambiar la forma en que se muestran los elementos en pantalla completa.

En los dispositivos que son compatibles con el API de Fullscreen, recomendamos usar imágenes en miniatura como marcadores de posición para vídeo:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Este navegador no es compatible con el elemento de vídeo.</p>
</video>

Para ver cómo funciona, echa un vistazo a la <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html">demostración</a>.

Note: `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.


## Importancia de la accesibilidad 




La accesibilidad no es una característica. Los usuarios sordos o invidentes no podrán disfrutar de un vídeo si no este no lleva subtítulos o audiodescripción. El tiempo que lleva añadir estos elementos en el vídeo no es nada comparado con la mala experiencia que puedes llegar a ofrecer a los usuarios. Ofréceles a todos los usuarios al menos una experiencia básica.




### Incluir subtítulos para mejorar la accesibilidad

Para que los medios sean más accesibles en los dispositivos móviles, incluye subtítulos o descripciones mediante el elemento de pista.

Note: El elemento de pista es compatible con Chrome para Android, con iOS Safari y con todos los navegadores actuales de ordenador, excepto con Firefox (consulta <a href="http://caniuse.com/track" title="Estado de compatibilidad del elemento de pista">caniuse.com/track</a>). También hay varios Polyfill disponibles. Recomendamos <a href='//www.delphiki.com/html5/playr/' title='Polyfill de elemento de pista de Playr'>Playr</a> o <a href='//captionatorjs.com/' title='Pista de Captionator'>Captionator</a>.

Al usar el elemento de pista, los subtítulos quedan así:

 <img class="center" alt="Captura de pantalla de un vídeo con subtítulos mostrados mediante el elemento de pista de Chrome en Android" src="img/Chrome-Android-track-landscape-5x3.jpg">

### Añadir un elemento de pista

Es muy sencillo añadir subtítulos en tu vídeo; solo tienes que añadir un elemento de pista como elemento secundario del elemento de vídeo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/track.html" region_tag="track" adjust_indentation="auto" %}
</pre>

El atributo `src` del elemento de pista asigna una ubicación al archivo de pista.

### Definir subtítulos en el archivo de pista

Un archivo de pista se compone de pies de entrada con tiempos en formato WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Un hombre sentado en la rama de un árbol usando un portátil.

    00:05.000 --> 00:08.000
    La rama se rompe y cae.

    ...


## Referencia rápida 




Un resumen de las propiedades del elemento de vídeo



### Atributos del elemento de vídeo

Para ver una lista completa de los atributos del elemento de vídeo y de sus definiciones, consulta las [especificaciones del elemento de vídeo](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table>
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

#### Autoplay

En ordenador, `autoplay` indica al navegador que inicie la descarga inmediatamente y que reproduzca el vídeo lo antes posible. En iOS, y en Chrome para Android, `autoplay` no funciona; los usuarios deben tocar la pantalla para reproducir el vídeo.

Incluso en las plataformas donde no es posible usar `autoplay`, deberías plantearte si es buena idea utilizarlo.

* El uso de datos puede ser caro.
* Si haces que los medios se descarguen y se inicie la reproducción sin solicitarlo antes, tanto el ancho de banda como la CPU podrían colapsarse y, por lo tanto, la página tardaría más en mostrarse.
* Es posible que los usuarios accedan desde un entorno en el que la reproducción de vídeo o de audio pueda molestar.

La reproducción automática es configurable en WebView de Android a través del [API de WebSettings](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
El valor predeterminado es `true` pero se puede inhabilitar con una aplicación de WebView.

#### Preload

El atributo `preload` indica al navegador cuánta información o contenido debería cargarse previamente.

<table>
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

### JavaScript

[El artículo `HTML5 Rocks Video`](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) resume muy bien las propiedades, los métodos y los eventos de JavaScript que pueden usarse para controlar la reproducción de vídeo. Hemos incluido aquí el contenido, añadiendo información actualizada sobre móviles donde lo hemos considerado necesario.

#### Propiedades

<table>
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

`playbackRate` (<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/scripted.html">ver demostración</a>) y `volume` no son compatibles con dispositivos móviles.

#### Métodos

<table>
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
se llamen en respuesta de una acción del usuario, como hacer clic en un botón. Mira esta <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/scripted.html">demostración</a>. Del mismo modo, la reproducción no se puede iniciar si el contenido no está insertado en los vídeos de YouTube.

#### Eventos

Solo hay un subconjunto de eventos de medios que pueden activarse. Consulta la página [Eventos de medios](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) en Mozilla Developer Network para obtener una lista completa.

<table>
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



