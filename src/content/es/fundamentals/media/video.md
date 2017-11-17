project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Obtén información sobre las maneras más simples de agregar videos a tu sitio y asegurarte de que los usuarios disfruten de la mejor experiencia posible en cualquier dispositivo.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-15 #}

# Video {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

A los usuarios les gustan los videos, que pueden ser divertidos e informativos. En los dispositivos móviles, los videos pueden
ser el modo más fácil de consumir información. Pero consumen ancho de banda y no
siempre funcionan de la misma forma en cada plataforma. A los usuarios no les gusta esperar a que se
carguen los videos ni presionar el botón de reproducción y que no pase nada. Sigue leyendo para descubrir los
métodos más sencillos para agregar videos en tu sitio y asegurarte de que los usuarios disfruten de la mejor experiencia posible
en cualquier dispositivo.


## Agregar un video 

### TL;DR {: .hide-from-toc }
- Usa el elemento `video` para cargar, descodificar y reproducir videos en tu sitio.
- Produce videos en varios formatos para llegar a varias plataformas móviles.
- Dales el tamaño correcto a los videos y asegúrate de que no sobrepasen los elementos que los contienen.
- La accesibilidad es importante; agrega el elemento `track` como elemento secundario del elemento `video`.


### Agrega el elemento de video

Agrega el elemento `video` para cargar, descodificar y reproducir videos en tu sitio:

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
  <p>This browser does not support the video element.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Tu navegador no es compatible con el elemento de video.</p>
    </video>
    

### Especifica varios formatos de archivos

No todos los navegadores son compatibles con los mismos formatos de video. El elemento `<source>` te permite 
especificar varios formatos de respaldo en caso de que uno de ellos 
no sea compatible con el navegador del usuario.

Por ejemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html){: target="_blank" .external }

Cuando el navegador analice las etiquetas `<source>`, usa el atributo opcional `type`
para ayudar a determinar el archivo que se descargará y reproducirá. Si el navegador
es compatible con `WebM`, reproducirá chrome.webm. De lo contrario, comprobará si puede reproducir
videos MPEG-4.

Consulta [A Digital Media Primer for Geeks](//www.xiph.org/video/vid1.shtml)
para obtener más información sobre cómo funcionan el video y el audio en la Web.

Este enfoque tiene varias ventajas en comparación con el ofrecimiento de diferentes HTML o
secuencias de comandos del servidor, especialmente en dispositivos móviles:

* Los desarrolladores pueden hacer una lista de los formatos en orden de preferencia.
* El cambio del lado del cliente nativo reduce la latencia; solo se realiza una solicitud para
  obtener el contenido.
* Dejar que el navegador elija el formato es más simple, rápido y posiblemente
 más fiable que usar una base de datos en un servidor con detección de usuario-agente.
* Especificar el tipo de fuente de cada archivo mejora el rendimiento de la red. El navegador puede seleccionar
 una fuente de video sin descargar parte del video para comprobar el formato.

Todas estas ventajas son importantes especialmente en contexto móviles, donde el ancho de banda
y la latencia son fundamentales y la paciencia del usuario es probablemente limitada.
Si no se incluye un atributo de tipo, el rendimiento podría verse afectado negativamente cuando
haya varias fuentes con tipos no admitidos.

Con las herramientas para programadores del navegador móvil, compara la actividad de la red [con atributos de tipo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html){: target="_blank" .external } y [sin atributos de tipo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html){: target="_blank" .external }.

Además, comprueba los encabezados de respuesta en las herramientas para programadores del navegador a fin de 
[asegurarte de que el servidor indique el tipo MIME adecuado](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types).
De lo contrario, las comprobaciones de tipo de la fuente de video no funcionarán.

### Especifica una hora de inicio y de finalización

Ahorra ancho de banda y haz que tu sitio sea más adaptable: usa la API de
Media Fragments para agregar una hora de inicio y de finalización al elemento de video.

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
  <p>This browser does not support the video element.</p>
</video>

Para agregar un fragmento de medios, simplemente debes agregar `#t=[start_time][,end_time]` a la
URL de medios. Por ejemplo, para reproducir el video entre los 5 y los 10 segundos,
especifica:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

Además, puedes usar el API de Media Fragments para ofrecer varias vistas de un mismo
video (como puntos de entrada en un DVD) sin necesidad de codificar y
usar varios archivos.


Warning: La API de Media Fragments es compatible con la mayoría de las plataformas, pero no con iOS. Asegúrate de que las solicitudes de intervalo sean compatibles con tu servidor. Las solicitudes de intervalo se habilitan de manera predeterminada en la mayoría de los servidores, pero algunos servicios de hosting pueden inhabilitarlas.

Al usar las herramientas para programadores del de navegador, comprueba que se incluya `Accept-Ranges: bytes` en los
encabezados de respuesta:

<img class="center" alt="Captura de pantalla de Chrome DevTools: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### Incluye una imagen de póster

Agrega un atributo de póster al elemento `video` para que los usuarios se hagan una idea
del contenido que encontrarán en cuanto cargue el elemento, sin necesidad de descargar ningún
video o de reproducirlo.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

También puede haber un póster de respaldo en caso de que el `src` del video deje de funcionar o de que ninguno
de los formatos de video proporcionados sea compatible. La única desventaja de publicar imágenes es
una solicitud de archivo adicional. Esto consume parte del ancho de banda y requiere
representación. Para obtener más información, consulta [Optimización de imágenes](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization).

A continuación, ofrecemos una comparación de videos sin una imagen de póster y con ella (el póster aparece en escala de grises para demostrar que no se trata del video):

<div class="attempt-left">
  <figure>
    <img alt="Captura de pantalla de Chrome para Android, orientación vertical: sin póster" src="images/Chrome-Android-video-no-poster.png">
    <figcaption>
      Captura de pantalla de Chrome para Android, orientación vertical: sin póster
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Captura de pantalla de Chrome para Android, orientación vertical: con póster" src="images/Chrome-Android-video-poster.png">
    <figcaption>
      Captura de pantalla de Chrome para Android, orientación vertical: con póster
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


## Ofrece alternativas para plataformas heredadas 

No todos los formatos de video son compatibles con todas las plataformas. Comprueba qué formatos
son compatibles en las plataformas principales y asegúrate de que el video funcione en cada
una de ellas.


### Comprueba qué formatos son compatibles {: #check-formats }

Usa `canPlayType()` para descubrir los formatos de videos compatibles. El método
usa un argumento de cadena que consta de un `mime-type` y códecs opcionales, y
muestra uno de los siguientes valores:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Valor mostrado y descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Return value">(cadena vacía)</td>
      <td data-th="Description">El contenedor y/o códec no es compatible.</td>
    </tr>
    <tr>
      <td data-th="Return value"><code>maybe</code></td>
      <td data-th="Description">
        El contenedor y los códecs pueden ser compatibles, pero el navegador
        deberá descargar parte del video para la comprobación.
      </td>
    </tr>
    <tr>
      <td data-th="Return value"><code>probably</code></td>
      <td data-th="Description">El formato parece ser compatible.
      </td>
    </tr>
  </tbody>
</table>

A continuación, se ofrecen algunos ejemplos de argumentos `canPlayType()` y valores de retorno para la
ejecución en Chrome:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Tipo y respuesta</th>
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


### Produce videos en varios formatos

Existen muchas herramientas que permiten guardar el mismo video en diferentes formatos:

* Herramientas de escritorio: [FFmpeg](//ffmpeg.org/)
* Aplicaciones GUI: [Miro](http://www.mirovideoconverter.com/),
  [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Servicios de codificación y transcodificación en línea:
  [Zencoder](//en.wikipedia.org/wiki/Zencoder),
  [Amazon Elastic Codificar](//aws.amazon.com/elastictranscoder)

### Verifica el formato que se usó

¿Quieres conocer el formato de video que seleccionó el navegador?

En JavaScript, usa la propiedad `currentSrc` del video para devolver la fuente empleada.



## Da el tamaño adecuado a los videos 

Cuando se trata de satisfacer a los usuarios, el tamaño de los videos es importante.


### TL;DR {: .hide-from-toc }
- No incluyas videos con un tamaño de marco superior o con una calidad mayor que los que admite la plataforma.
- No alargues los videos más de lo necesario.
- Los videos largos pueden provocar dificultades en las descargas y en las búsquedas; algunos navegadores tienen que esperar hasta que el video se descargue para iniciar la reproducción.


### Comprueba el tamaño del video

El marco real del video, tal como se lo codifica, podría tener dimensiones distintas de las del elemento
de video (también es posible que no se pueda mostrar una imagen usando sus dimensiones
reales).

Para comprobar el tamaño codificado de un video, usa las propiedades `videoWidth`
y `videoHeight` del elemento de video. `width` y `height` muestran las dimensiones del
elemento de video, cuyo tamaño es posible que se haya especificado mediante CSS o con atributos integrados de ancho
y alto.

### Asegúrate de que el video no supere el tamaño del elemento contenedor

Cuando los elementos de video son demasiado grandes para la ventana de visualización , es posible que sobrepasen
el tamaño del contenedor, lo cual imposibilita que el usuario vea el contenido o use
los controles.

<div class="attempt-left">
  <figure>
    <img alt="Captura de pantalla de Chrome para Android, orientación vertical: elemento de video sin estilo sobrepasa el tamaño de la ventana de visualización" src="images/Chrome-Android-portrait-video-unstyled.png">
    <figcaption>
      Captura de pantalla de Chrome para Android, orientación vertical: elemento de video sin estilo sobrepasa el tamaño de la ventana de visualización
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Captura de pantalla de Chrome para Android, horizontal: elemento de video sin estilo sobrepasa el tamaño de la ventana de visualización" src="images/Chrome-Android-landscape-video-unstyled.png">
    <figcaption>
      Captura de pantalla de Chrome para Android, horizontal: elemento de video sin estilo sobrepasa el tamaño de la ventana de visualización
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Puedes controlar las dimensiones del video con JavaScript o con CSS. Las bibliotecas
y los complementos de JavaScript, [como FitVids](http://fitvidsjs.com/) permiten mantener
un tamaño y una relación de aspecto adecuados, incluso en videos de Flash de YouTube y de
otras fuentes.

Usa [consultas de medios en CSS](/web/fundamentals/design-and-ux/responsive/#css-media-queries) para especificar el tamaño de los elementos según las dimensiones de la ventana de visualización; `max-width: 100%` siempre es útil en estos casos.

Para mostrar contenido multimedia en iframes (como en videos de YouTube), prueba un
enfoque adaptable (como el que [propone John Surdakowski](http://avexdesigns.com/responsive-youtube-embed/)).


Warning: No fuerces el tamaño de los elementos cuando este resulte en una relación de aspecto distinta a la del video original. Los elementos achatados o estirados no quedan bien.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling" adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html){: target="_blank" .external }

Compara el [ejemplo adaptable](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html){: target="_blank" .external }
con la [versión no adaptable](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html){: target="_blank" .external }.


## Personaliza el reproductor de video

El video se visualiza de manera diferente en las distintas plataformas. En las soluciones móviles se debe
considerar la orientación del dispositivo. Usa la API Fullscreen para controlar el modo de pantalla completa
del contenido del video.


### Cómo funciona la orientación del dispositivo en los diferentes dispositivos

La orientación de dispositivo no representa ningún problema en monitores de escritorio o en laptops, pero es
muy importante a la hora de tener en cuenta el diseño de la página web para dispositivos móviles y tablets.

Safari en iPhone hace un buen trabajo al cambiar entre orientación vertical y horizontal
:

<div class="attempt-left">
  <figure>
    <img  alt="Captura de pantalla de video en Safari para iPhone, orientación vertical" src="images/iPhone-video-playing-portrait.png">
    <figcaption>Captura de pantalla de video en Safari para iPhone, orientación vertical</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Captura de pantalla del video en Safari para iPhone, orientación horizontal" src="images/iPhone-video-playing-landscape.png">
    <figcaption>Captura de pantalla del video en Safari para iPhone, orientación horizontal</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

La orientación del dispositivo en un iPad y en Chrome para Android puede ser problemática.
Por ejemplo, sin personalización, un video que se reproduce en un iPad con
orientación horizontal se ve de la siguiente manera:

<img alt="Captura de pantalla de video en Safari en la pantalla Retina de iPad, orientación horizontal"
src="images/iPad-Retina-landscape-video-playing.png">

Configurar el video `width: 100%` o `max-width: 100%` con CSS puede resolver
muchos problemas de diseño de orientación de dispositivos. Tal vez también te convenga considerar
alternativas de pantalla completa.

## Pantalla completa o integrada

<img class="attempt-right" alt="Captura de pantalla del elemento de video en iPhone, orientación vertical" src="images/iPhone-video-with-poster.png">

El video se visualiza de manera diferente en las distintas plataformas. En Safari, para iPhone, se muestra un
elemento de video integrado en una página web, pero se reproduce un video en el modo de pantalla completa:

<div style="clear:both;"></div>

<img class="attempt-right" alt="Captura de pantalla de video en Chrome para Android, orientación vertical" src="images/Chrome-Android-video-playing-portrait-3x5.png">

En Android, los usuarios pueden solicitar un modo de pantalla completa haciendo clic sobre el
ícono de pantalla completa. Sin embargo, el método predeterminado consiste en reproducir un video integrado:

<div style="clear:both;"></div>

<img class="attempt-right" alt="Captura de pantalla de video en Safari en la pantalla Retina de iPad, orientación horizontal" src="images/iPad-Retina-landscape-video-playing.png">

Safari, en un iPad, reproduce un video integrado:

<div style="clear:both;"></div>

### Controla la función de pantalla completa del contenido

Para plataformas que no fuerzan la reproducción de video en pantalla completa, la API Fullscreen
[cuenta con mucha compatibilidad](http://caniuse.com/#feat=fullscreen). Usa esta API para controlar
la función de pantalla completa del contenido o de la página.

Para ver en pantalla completa un elemento, como un video:

    elem.requestFullScreen();
    

Para ver en pantalla completa todo el documento:

    document.body.requestFullScreen();
    

También puedes realizar la recepción de cambios de estado de pantalla completa:

    video.addEventListener("fullscreenchange", handler);
    

Como alternativa, puedes comprobar que el elemento esté actualmente en el modo de pantalla completa:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

También puedes usar la seudoclase CSS `:fullscreen` para cambiar el modo en que los
elementos se muestran en el modo de pantalla completa.

<video autoplay muted loop class="attempt-right">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
  <p>This browser does not support the video element.</p>
</video>

En dispositivos que sean compatibles con la API Fullscreen, considera usar imágenes en miniatura
como marcadores de posición para video:

Para ver cómo funciona, echa un vistazo a la [demostración](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html){: target="_blank" .external }.

Prueba interna: `requestFullScreen()` puede tener prefijos del proveedor y requerir código adicional para lograr compatibilidad completa entre navegadores.

<div style="clear:both;"></div>




## La accesibilidad importa

La accesibilidad no es una función. Los usuarios que no puedan oír ni ver, no podrán vivir la experiencia de un video si no se ofrecen subtítulos o descripciones. El tiempo que lleva agregar estos elementos al video no es nada comparado con la mala experiencia que ofreces a los usuarios. Proporciona al menos una experiencia de base para todos los usuarios.


### Incluye subtítulos para mejorar la accesibilidad

<img class="attempt-right" alt="Captura de pantalla de los subtítulos mostrados con el elemento de seguimiento en Chrome para Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

Para hacer que los medios sean más accesibles en dispositivos móviles, incluye subtítulos o descripciones
con el elemento de seguimiento.

<div style="clear:both;"></div>

### Agrega un elemento de seguimiento

Es muy sencillo agregar subtítulos a tu video; solo tienes que agregar un elemento de seguimiento
como elemento secundario del elemento de video:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/track.html){: target="_blank" .external }

El atributo `src` del elemento de seguimiento proporciona la ubicación del archivo de seguimiento.

## Define subtítulos en el archivo de seguimiento

Un archivo de seguimiento se compone de indicaciones con tiempos en formato WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Man sitting on a tree branch, using a laptop.

    00:05.000 --> 00:08.000
    The branch breaks, and he starts to fall.

    ...

Prueba interna: El elemento de seguimiento es compatible con Chrome para Android, Safari de iOS y todos los navegadores actuales para escritorio, excepto Firefox (consulta [caniuse.com/track](http://caniuse.com/track)). También hay varios pollyfills disponibles. Recomendamos [Captionator](http://captionatorjs.com/){: .external }.




## Referencia rápida

### Atributos del elemento de video

Para ver una lista completa de los atributos del elemento de video y de sus definiciones, consulta 
[las especificaciones del elemento de video](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table>
  <thead>
    <tr>
      <th>Atributo</th>
      <th>Disponibilidad</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>src</code></td>
      <td data-th="Availability">Todos los navegadores.</td>
      <td data-th="Description">Dirección (URL) del video.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>poster</code></td>
      <td data-th="Availability">Todos los navegadores.</td>
      <td data-th="Description">Dirección (URL) de un archivo de imagen que puede mostrar el navegador ni bien se muestre el elemento de video, sin necesidad de descargar contenido de video.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>preload</code></td>
      <td data-th="Availability">Todos los navegadores móviles ignoran la carga previa.</td>
      <td data-th="Description">Indica al navegador que es lo mejor es cargar los metadatos (o un video) antes de la reproducción. Las opciones son "none", "metadata" o "auto" (consulta la sección <a href="#preload">Preload</a> para obtener información más detallada). </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>autoplay</code></td>
      <td data-th="Availability">No es compatible con iPhone o Android, pero es compatible con todos los navegadores de escritorio, iPad, Firefox y Opera para Android.</td>
      <td data-th="Description">Inicia la descarga y la reproducción lo antes posible (consulta la sección <a href="#autoplay">Autoplay</a> para obtener información más detallada).</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>loop</code></td>
      <td data-th="Availability">Todos los navegadores.</td>
      <td data-th="Description">Reproduce el video en bucle.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>controls</code></td>
      <td data-th="Availability">Todos los navegadores.</td>
      <td data-th="Description">Muestra los controles de video predeterminados (reproducir, pausar, etc.).</td>
    </tr>
  </tbody>
</table>

### Autoplay {: #autoplay }

En el escritorio, `autoplay` indica al navegador que inicie la descarga y que reproduzca el video inmediatamente. En iOS y en Chrome para Android, `autoplay` no funciona; los usuarios deben presionar la pantalla para reproducir el video.

Incluso en las plataformas donde es posible usar la reproducción automática, deberías plantearte
si es buena idea habilitarla:

* El uso de datos puede ser costoso.
* Si haces que los medios se descarguen y se inicie la reproducción sin consultarlo antes,
  tanto el ancho de banda como la CPU podrían colapsar y, por lo tanto, la página tardaría más en mostrarse.
* Es posible que los usuarios accedan desde un entorno en el que la reproducción de video o de audio pueda molestar.

La reproducción automática es configurable en WebView de Android a través de la
[API WebSettings](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean).
El valor predeterminado es true pero se puede inhabilitar con una app de WebView.

### Preload {: #preload }

El atributo `preload` indica al navegador cuánta información o contenido
debe cargarse previamente.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Valor y descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Value"><code>none</code></td>
      <td data-th="Description">Es posible que el usuario ni siquiera vea el video; no se carga nada previamente.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>metadata</code></td>
      <td data-th="Description">Los metadatos (duración, dimensiones, pistas de texto) deberían cargarse previamente, pero con una cantidad mínima de video.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>auto</code></td>
      <td data-th="Description">Lo ideal sería descargar todo el video directamente.</td>
    </tr>
  </tbody>
</table>

El atributo `preload` afecta de diferente manera a cada plataforma.
Por ejemplo, Chrome almacena en el búfer 25 segundos de video en los dispositivos de escritorio, pero no almacena nada en iOS o en
Android. Esto significa que en un dispositivo móvil, el inicio de la reproducción podría retrasarse,
algo que no sucede en los dispositivos de escritorio.
Consulta la [página de prueba de Steve Souders](//stevesouders.com/tests/mediaevents.php)
para obtener información más detallada.

### JavaScript

[El artículo HTML5 Rocks Video](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)
resume muy bien las propiedades, los métodos y los eventos de JavaScript
que pueden usarse para controlar la reproducción de video. Hemos incluido aquí el contenido
y los actualizamos con información sobre dispositivos móviles donde lo hemos considerado necesario.

#### Propiedades

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">Propiedad y descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>currentTime</code></td>
      <td data-th="Description">Obtiene o establece la posición de reproducción en segundos.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>volume</code></td>
      <td data-th="Description">Obtiene o establece el nivel de volumen actual del video.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>muted</code></td>
      <td data-th="Description">Obtiene o establece el silenciamiento del audio.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>playbackRate</code></td>
      <td data-th="Description">Obtiene o establece la tasa de reproducción; 1 es la velocidad de avance normal.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>buffered</code></td>
      <td data-th="Description">Información sobre la cantidad de video que se almacena en el búfer y que está listo para reproducirse.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>currentSrc</code></td>
      <td data-th="Description">La dirección del video que se reproduce.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoWidth</code></td>
      <td data-th="Description">Ancho del video en píxeles (que puede ser distinto del ancho del elemento de video).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoHeight</code></td>
      <td data-th="Description">Alto del video en píxeles (que puede ser distinto del alto del elemento de video).</td>
    </tr>
  </tbody>
</table>

Ni `playbackRate` ([mira esta demostración](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html){: target="_blank" .external }) ni `volume` son compatibles con dispositivos móviles.

#### Métodos

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">Método y descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Method"><code>load()</code></td>
      <td data-th="Description">Carga o vuelve a cargar una fuente de video sin iniciar la reproducción, por ejemplo, cuando la fuente del video se modifica con JavaScript.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>play()</code></td>
      <td data-th="Description">Reproduce el video desde su ubicación actual.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>pause()</code></td>
      <td data-th="Description">Pausa el video desde su ubicación actual.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>canPlayType('format')</code></td>
      <td data-th="Description">Identifica qué formatos son compatibles (consulta <a href="#check-formats"> Comprobar qué formatos son compatibles</a>)</td>.
    </tr>
  </tbody>
</table>

En dispositivos móviles (a excepción de Opera en Android), `play()` y `pause()` no funcionan
salvo que se llamen en respuesta a una acción del usuario, como hacer clic en un botón. 
Mira esta [demostración](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html){: target="_blank" .external }.
Del mismo modo, no se puede iniciar la reproducción de contenido, como los videos
incorporados de YouTube).

#### Eventos

Solo hay un subconjunto de eventos de medios que pueden activarse. Consulta la
página [Eventos de medios](//developer.mozilla.org/docs/Web/Guide/Events/Media_events)
en Mozilla Developer Network para obtener una lista completa.

<table class="responsive">
  <thead>
  <tr>
    <th colspan="2">Evento y descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event"><code>canplaythrough</code></td>
      <td data-th="Description">Se activa cuando hay suficientes datos disponibles como para que el navegador pueda reproducir el video de forma completa sin interrupciones.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>ended</code></td>
      <td data-th="Description">Se activa cuando acaba la reproducción del video.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>error</code></td>
      <td data-th="Description">Se activa si se produce un error.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>playing</code></td>
      <td data-th="Description">Se activa cuando el video se reproduce por primera vez después de una pausa o de reiniciarse.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>progress</code></td>
      <td data-th="Description">Se activa periódicamente para indicar el progreso de la descarga.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>waiting</code></td>
      <td data-th="Description">Se activa cuando se retrasa una acción que espera que otra acción finalice.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>loadedmetadata</code></td>
      <td data-th="Description">Se activa cuando el navegador acaba de cargar los metadatos del video: la duración, las dimensiones y las pistas de texto.</td>
    </tr>
  </tbody>
</table>




{# wf_devsite_translation #}
