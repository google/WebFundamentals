project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprende los métodos más sencillos para añadir vídeos en tu sitio y asegurarte de que los usuarios disfruten de la mejor experiencia posible en cualquier dispositivo.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Añadir un vídeo {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Aprende los métodos más sencillos para añadir vídeos en tu sitio y asegurarte de que los usuarios disfruten de la mejor experiencia posible en cualquier dispositivo.



## TL;DR {: .hide-from-toc }
- Usa el elemento de vídeo que se cargará y que descodificará y reproducirá el vídeo en tu sitio.
- Produce vídeos en varios formatos para llegar a varias plataformas móviles.
- Dales un tamaño correcto a los vídeos y asegúrate de que no sobrepasen los elementos que los contienen.
- La accesibilidad es importante; añade el elemento de pista como elemento secundario del elemento de vídeo.


## Añadir el elemento de vídeo

Usa el elemento de vídeo que se cargará y que descodificará y reproducirá el vídeo en tu sitio:

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>Este navegador no es compatible con el elemento de vídeo.</p>
</video>


    <video src="chrome.webm" type="video/webm">
         <p>Tu navegador no es compatible con el elemento de vídeo.</p>
    </video>
    

## Especificar varios formatos de archivo

No todos los navegadores son compatibles con los mismos formatos de vídeo.
El elemento `<source>` permite especificar varios formatos de respaldo en caso de que uno de ellos no sea compatible con el navegador del usuario.
Por ejemplo:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/video-main.html" region_tag="sourcetypes" %}
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

## Especificar una hora de inicio y de fin

Ahorra ancho de banda y haz que tu sitio sea más adaptable: usa el API de Media Fragments para añadir una hora de inicio y de fin al elemento de vídeo.

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>Este navegador no es compatible con el elemento de vídeo.</p>
</video>

Para añadir un fragmento de medios, solo tienes que añadir "#t=[start_time][,end_time]" a la URL de medios. Por ejemplo, para reproducir el vídeo entre los segundos 5 y 10, especifica:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

Además, puedes usar el API de Media Fragments para ofrecer varias vistas de un mismo vídeo (como pies de entrada en un DVD) sin necesidad de codificar y usar varios archivos.

<!-- TODO: Verify note type! -->
Note: - 'El API de Media Fragments es compatible con la mayoría de las plataformas, pero no con iOS.'
- 'Asegúrate de que las solicitudes de intervalo de bytes sean compatibles con tu servidor. Las solicitudes de intervalo se habilitan de manera predeterminada en la mayoría de los servidores, pero algunos servicios de alojamiento pueden inhabilitarlas.'


Al usar las herramientas de navegador para desarrolladores, comprueba que se incluya `Accept Ranges: bytes` en las cabeceras de respuesta:

<img class="center" alt="Captura de pantalla de herramientas de Chrome para desarrolladores: "Accept-Ranges: bytes"" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## Incluir un póster

Añade un atributo de póster al elemento de vídeo para que los usuarios se hagan una idea del tipo de contenido que encontrarán en cuanto cargue el elemento, sin necesidad de descargar ningún vídeo o de reproducirlo.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

También puede haber un póster de respaldo en caso de que el video `src` deje de funcionar o de que ninguno de los formatos de vídeo facilitados sea compatible. El único inconveniente de los pósters es que se produce una solicitud de archivo adicional que consume algo de ancho de banda y que requiere procesamiento. Para obtener más información, consulta [Optimización de imágenes](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

A continuación, ofrecemos una comparativa de vídeos sin póster y con póster (el póster aparece en escala de grises para demostrar que no se trata del vídeo):

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Captura de pantalla de Android Chrome, modo retrato: sin póster" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Captura de pantalla de Android Chrome, modo retrato: con póster" src="images/Chrome-Android-video-poster.png">
  </div>
</div>



