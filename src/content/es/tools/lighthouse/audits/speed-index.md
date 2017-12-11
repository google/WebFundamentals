project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "Índice de velocidad".

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Índice de velocidad  {: .page-title }

## Por qué es importante la auditoría {: #why }

El Índice de velocidad es una métrica de rendimiento de carga de página que muestra qué tan rápido
se completan visiblemente los contenidos de una página. Cuanto menor es el puntaje, mejor.

## Cómo aprobar la auditoría {: #how }

Para reducir el puntaje del Índice de velocidad, debes optimizar tu página
para que se cargue visualmente más rápido. Los siguientes son dos buenos puntos de inicio:

* [Optimización del ahorro de contenido](/web/fundamentals/performance/optimizing-content-efficiency/).
* [Optimización de la ruta de acceso de representación crítica](/web/fundamentals/performance/critical-rendering-path/).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse usa un módulo de nodo denominado
[Speedline](https://github.com/pmdartus/speedline)
para generar el puntaje de Índice de velocidad.

Para obtener más información sobre los algoritmos y las metodologías detrás del Índice de velocidad,
consulta [Índice de velocidad](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index).

El puntaje objetivo se calcula mediante una función de distribución acumulativa de una
distribución lognormal. Consulta los comentarios de la 
[fuente](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/speed-index-metric.js)
de la auditoría si necesitas obtener más información.


{# wf_devsite_translation #}
