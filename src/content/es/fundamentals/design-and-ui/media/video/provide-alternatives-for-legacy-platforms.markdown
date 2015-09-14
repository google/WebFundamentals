---
title: "Ofrecer alternativas para plataformas anteriores"
description: "No todos los formatos vídeo son compatibles con cada plataforma. Comprueba qué formatos son compatibles en las plataformas principales y asegúrate de que el vídeo funcione en cada una de ellas."
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
  optimize:
    - <a href="../images/">Imágenes</a>
    - <a href="../../performance/optimizing-content-efficiency/">Optimizar la eficacia del contenido</a>
---

<p class="intro">
  No todos los formatos vídeo son compatibles en todas las plataformas. Comprueba qué formatos son compatibles en las plataformas principales y asegúrate de que el vídeo funcione en cada una de ellas.
</p>

{% include shared/toc.liquid %}


## Comprobar qué formatos son compatibles

Usa `canPlayType()` para averiguar qué formatos de vídeo son compatibles. El método usa un argumento de cadena coherente con un `mime-type` y códecs opcionales, y devuelve uno de los siguientes valores:

<table class="mdl-data-table mdl-js-data-table">
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


<table class="mdl-data-table mdl-js-data-table">
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


## Producir vídeo en varios formatos

Hay muchas herramientas que te permiten guardar el mismo vídeo en distintos formatos:

* Herramientas de ordenador: [FFmpeg](//ffmpeg.org/)
* Aplicaciones con interfaz gráfica de usuario: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Servicios online de codificación y transcodificación: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## Comprobar qué formato se ha usado

¿Quieres saber qué formato de vídeo ha elegido el navegador?

En JavaScript, usa la propiedad `currentSrc` del vídeo para ver la fuente utilizada.

Para ver cómo funciona, échale un vistazo a {% link_sample _code/video-main.html %}esta demostración{% endlink_sample %}: Chrome y Firefox seleccionan `chrome.webm` (porque es la primera en la lista de fuentes posibles que admiten estos navegadores), y Safari selecciona `chrome.mp4`.



