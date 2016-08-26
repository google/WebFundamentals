project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: No todos los formatos vídeo son compatibles con cada plataforma. Comprueba qué formatos son compatibles en las plataformas principales y asegúrate de que el vídeo funcione en cada una de ellas.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Ofrecer alternativas para plataformas anteriores {: .page-title }

{% include "_shared/contributors/TODO.html" %}



No todos los formatos vídeo son compatibles en todas las plataformas. Comprueba qué formatos son compatibles en las plataformas principales y asegúrate de que el vídeo funcione en cada una de ellas.



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

Para ver cómo funciona, échale un vistazo a <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">esta demostración</a>: Chrome y Firefox seleccionan `chrome.webm` (porque es la primera en la lista de fuentes posibles que admiten estos navegadores), y Safari selecciona `chrome.mp4`.



