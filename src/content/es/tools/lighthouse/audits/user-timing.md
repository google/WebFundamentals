project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "Marcas y medidas de sincronización del usuario".

{# wf_updated_on: 2016-10-06 #}
{# wf_published_on: 2016-10-06 #}

# Marcas y medidas de sincronización del usuario  {: .page-title }

## Por qué es importante la auditoría {: #why }

La API User Timing te permite medir el rendimiento de JavaScript de tu app.
La idea básica es que decides qué partes de tus secuencias de comandos quieres
optimizar, y luego instrumentas esas partes en tus secuencias de comandos con la API User
Timing. A partir de allí, puedes acceder a los resultados de JavaScript por medio de la
API, o verlos en tus [Grabaciones de la línea de tiempo
de Chrome DevTools](/web/tools/chrome-devtools/evaluate-performance/timeline-tool).

## Cómo aprobar la auditoría {: #how }

Esta auditoría no está estructurada como una prueba que se "aprueba" o "desaprueba". Solo es una
oportunidad de descubrir una API útil que puede ayudarte a medir el rendimiento
de tu app. El puntaje que informa Lighthouse para esta auditoría corresponde a la cantidad de
Marcas y medidas de sincronización del usuario que encuentra en tu app.

Cuando tu app incluye Marcas y medidas de sincronización del usuario, verás estas
Marcas y medidas en tu informe de Lighthouse.

Consulta la [API User Timing](https://www.html5rocks.com/en/tutorials/webperformance/usertiming/)
para ver una introducción sobre cómo usar la API User Timing para medir el rendimiento de JavaScript
de tu app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse extrae los datos de User Timing de la herramienta de creación de perfiles de eventos de seguimiento de Chrome.


{# wf_devsite_translation #}
