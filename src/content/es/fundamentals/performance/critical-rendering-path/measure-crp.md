project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprende a medir la ruta de representación crítica.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Medir la ruta de representación crítica {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

La base de toda estrategia de rendimiento sólida es una buena medición e
instrumentación. No se puede optimizar lo que no se puede medir. En este documento,
se explican distintos métodos para medir el rendimiento de CRP.

* El método Lighthouse realiza una serie de pruebas automatizadas en una página y, a continuación,
  genera un informe sobre el rendimiento de CRP en la página. Este método
  proporciona una descripción general, rápida y de alto nivel sobre el rendimiento de CRP de una
  página cargada en el navegador. De esta forma, te permite probar,
  iterar y mejorar su rendimiento rápidamente.
* El método Navigation Timing API captura mediciones de [monitoreo de
  usuario real (RUM)](https://en.wikipedia.org/wiki/Real_user_monitoring).
 Como su nombre insinúa, estas mediciones se capturan de las interacciones
que los usuarios reales tienen con tu sitio y proporcionan un panorama preciso
  del rendimiento de CRP en el mundo real, tal como lo experimentan los usuarios de varios
  dispositivos y diferentes condiciones de red.

En general, es buena idea usar Lighthouse para identificar oportunidades obvias
que permitan optimizar CRP y equipar tu código con
Navigation Timing API para monitorear el desempeño de tu app en el mundo real.

## Realizar auditorías de tu página con Lighthouse {: #lighthouse }

Lighthouse es una herramienta de auditoría de apps web que realiza una serie de pruebas en una
página determinada y, a continuación, muestra los resultados de la página en un informe consolidado. Puedes
ejecutar Lighthouse como una extensión de Chrome o un módulo de NPM, que es
útil para integrar Lighthouse con sistemas de integración continua.

Para empezar, consulta [Auditorías de apps web con Lighthouse](/web/tools/lighthouse/).

Cuando ejecutas Lighthouse como una extensión de Chrome, la CRP de tu página luce
similar a la siguiente captura de pantalla.

![Auditorías de CRP con Lighthouse](images/lighthouse-crp.png)

Consulta [Cadenas de solicitudes críticas][crc] para obtener más información sobre los resultados de esta
auditoría.

[crc]: /web/tools/lighthouse/audits/critical-request-chains

## Equipar tu código con Navigation Timing API {: #navigation-timing }

La combinación de Navigation Timing API y otros eventos del navegador emitidos
cuando se carga la página te permite capturar y grabar el rendimiento real de CRP
de cualquier página.

<img src="images/dom-navtiming.png"  alt="Navigation Timing">

Cada una de las etiquetas del diagrama anterior corresponde a una marca de tiempo de alta resolución que el navegador rastrea para cada una de las páginas que carga. De hecho, en este caso específico solo mostraremos una fracción de todas las marcas de tiempo diferentes; por ahora, omitiremos todas las marcas de tiempo relacionadas con la red, pero regresaremos a ellas en una de las próximas lecciones.

¿Qué son las marcas de tiempo?

* `domLoading`: esta es la marca de tiempo inicial de todo el proceso; el
  navegador está por comenzar a analizar los primeros bytes recibidos del documento
  HTML.
* `domInteractive`: marca el punto en el cual el navegador termina de analizar todo
  el HTML y finaliza la construcción del DOM.
* `domContentLoaded`: marca el punto en el cual el DOM está listo y no hay hojas de estilo que bloqueen la ejecución de JavaScript; esto significa que ahora (posiblemente) podemos construir el árbol de representación.
    * Muchos frameworks de JavaScript esperan este evento antes de comenzar a ejecutar su propia lógica. Por este motivo, el navegador captura las marcas de tiempo `EventStart` y `EventEnd` para permitirnos realizar un seguimiento del tiempo que llevó esta ejecución.
* `domComplete`: como el nombre lo indica, se completó la totalidad del procesamiento y
  se terminaron de descargar todos los recursos de la página (imágenes, etc.);
  es decir, el indicador de carga dejó de girar.
* `loadEvent`: como paso final en toda carga de una página, el navegador activa un evento
  `onload` que puede desencadenar lógica de aplicación adicional.

La especificación HTML dicta condiciones específicas para cada evento: cuándo se debe activar, qué condiciones debe cumplir, etc. Para nuestros fines, nos concentraremos en algunos elementos claves relacionados con la ruta de acceso de representación crítica:

* `domInteractive` marca el momento en que el DOM está listo.
* `domContentLoaded` generalmente marca el momento en que [el DOM y el CSSOM están listos](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/).
    * Si no hay analizadores que bloqueen JavaScript, `DOMContentLoaded` se activará de inmediato después de `domInteractive`.
* `domComplete` marca el momento en que la página y todos sus recursos secundarios están listos.


<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp.html){: target="_blank" .external }

El ejemplo anterior puede parecer intimidante a primera vista, pero en realidad es bastante simple. La Navigation Timing API captura todas las marcas de tiempo correspondientes y nuestro código simplemente espera que se active el evento `onload`; recuerda que el evento `onload` se activa después de `domInteractive`, `domContentLoaded` y `domComplete`, y computa la diferencia entre las diversas marcas de tiempo.

<img src="images/device-navtiming-small.png"  alt="Demostración de NavTiming">

En resumen, ahora tenemos algunos elementos claves específicos por delante y una función simple para obtener esas mediciones. Ten en cuenta que en lugar de imprimir esas mediciones en la página también puedes modificar el código para enviar esas métricas a un servidor de análisis ([Google Analytics lo hace automáticamente](https://support.google.com/analytics/answer/1205784)). Esta es una excelente manera de mantenerte informado sobre el rendimiento de tus páginas y te permite identificar las páginas que podrían beneficiarse con algunas tareas de optimización.

## ¿Qué sucede con DevTools? {: #devtools }

Si bien estos documentos a veces usan el panel Network de Chrome DevTools para
ilustrar conceptos de CRP, DevTools no es ideal para realizar mediciones de
CRP porque no cuenta con un mecanismo incorporado para aislar
recursos críticos. Realiza una auditoría de [Lighthouse](#lighthouse) para que te sea más fácil
identificar estos recursos.

<a href="analyzing-crp" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Analyzing CRP">
  <button>A continuación: Analizar el rendimiento de la ruta de representación crítica</button>
</a>


{# wf_devsite_translation #}
