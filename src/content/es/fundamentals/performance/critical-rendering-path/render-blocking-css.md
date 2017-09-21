project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: De forma predeterminada, la CSS se trata como un recurso que bloquea la representación. Aprende a evitar que bloquee la representación.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# CSS que bloquea la representación {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

De forma predeterminada, la CSS se trata como un recurso que bloquea la representación. Esto significa que el
navegador no representará ningún contenido procesado hasta que se construya el
CSSOM. Asegúrate de que tu CSS sea simple, proporciónala tan rápido como sea
posible, y usa tipos y consultas de medios para desbloquear la representación.

En la [construcción del árbol de representación](render-tree-construction), vimos que la ruta de representación crítica requiere el DOM y el CSSOM para construir el árbol de representación. Esto genera una importante consecuencia para el rendimiento: **tanto HTML como CSS son recursos que bloquean la representación.** HTML es evidente, ya que sin el DOM no tendríamos nada para representar, pero el requisito de CSS puede ser menos obvio. ¿Qué ocurriría si intentáramos representar una página típica sin bloquear la representación en CSS?

### TL;DR {: .hide-from-toc }
- De forma predeterminada, la CSS se trata como un recurso que bloquea la representación.
- Los tipos de medios y las consultas de medios nos permiten marcar algunos recursos CSS como no bloqueadores de la representación.
- Todos los recursos CSS, independientemente de su conducta de bloqueo o no bloqueo, se descargan a través del navegador.


<div class="attempt-left">
  <figure>
    <img src="images/nytimes-css-device.png" alt="NYTimes con CSS">
    <figcaption>The New York Times con CSS</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/nytimes-nocss-device.png" alt="NYTimes sin CSS">
    <figcaption>The New York Times sin CSS (FOUC)</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

El ejemplo anterior, en el cual se muestra el sitio web del NYTimes con CSS y sin CSS, demuestra la razón por la cual se bloquea la representación hasta que CSS esté disponible;---sin CSS, la página no se puede usar. La experiencia de la derecha a menudo se conoce como “destello de contenido sin estilo” (FOUC). El navegador bloquea la representación hasta contar con el DOM y el CSSOM.

> **_CSS es un recurso que bloquea la representación. Proporciónala al cliente lo más rápido posible para optimizar el tiempo de la primera representación._**

No obstante, ¿qué ocurre si hay algunos estilos de CSS que solo se usan en ciertas condiciones (por ejemplo, cuando se imprime la página o cuando se proyecta en un monitor grande)? Sería bueno no tener que bloquear la representación en estos recursos.

Los “tipos de medios” y las “consultas de medios” de CSS nos permiten abordar estos casos de uso:


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

Una [consulta de medios](../../design-and-ux/responsive/#use-css-media-queries-for-responsiveness) consiste en un tipo de medio y un número de expresiones de cero en adelante; estos comprueban las condiciones de funciones de medios específicas. Por ejemplo, nuestra primera declaración de la hoja de estilo no proporciona tipos ni consultas de medios. Por ello, se aplicará en todos los casos; es decir, siempre bloqueará la representación. Por otro lado, la segunda declaración de la hoja de estilo solo se aplica cuando se imprime el contenido.---Tal vez quieras ordenar el diseño, cambiar las fuentes, etc., y de ahí que esta declaración de la hoja de estilo no necesita bloquear la representación de la página. Por último, la última declaración de la hoja de estilo proporciona una “consulta de medios” que ejecuta el navegador: si las condiciones coinciden, el navegador bloqueará la representación hasta que la hoja de estilo se haya descargado y procesado.

Al usar consultas de medios, nuestra presentación puede orientarse a casos de uso específicos, como la representación frente a la impresión, y a condiciones dinámicas, como cambios en la orientación de la pantalla y cambios de tamaño de eventos, entre otras. **Cuando declares tus recursos de hoja de estilo, presta mucha atención al tipo y a las consultas de medios ya que tendrán un gran impacto en el rendimiento de la ruta de representación crítica.**

Consideremos algunos ejemplos prácticos:


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* La primera declaración bloquea la representación y coincide en todas las condiciones.
* La segunda declaración también bloquea la representación; “all” es el tipo predeterminado; por lo tanto, si no especificas un tipo, se establece implícitamente. Por lo tanto, la primera y la segunda declaración son equivalentes.
* La tercera declaración presenta una consulta de medios dinámica, que se evaluará durante la carga de la página. Según la orientación del dispositivo durante la carga de la página, portrait.css podría o no bloquear la representación.
* La última declaración solo se aplica durante la impresión de la página. Por lo tanto, no bloquea la representación cuando se carga la página por primera vez en el navegador.

Por último, ten en cuenta que “bloqueo de la representación” solo hace referencia a si el navegador debe demorar la representación inicial de la página en el recurso en cuestión. En cualquiera de estos casos, el recurso CSS se descarga de todos modos a través del navegador, aunque con una prioridad más baja para los recursos que no bloqueen la representación.

<a href="adding-interactivity-with-javascript" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Adding Interactivity with JS">
  <button>A continuación: Agregar interactividad con JavaScript</button>
</a>


{# wf_devsite_translation #}
