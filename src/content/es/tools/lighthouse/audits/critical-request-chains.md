project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "Cadenas de solicitudes críticas".

{# wf_updated_on: 2016-10-06 #}
{# wf_published_on: 2016-10-06 #}

# Cadenas de solicitudes críticas  {: .page-title }

## Por qué es importante la auditoría {: #why }

La Cadena de Solicitud Crítica es un concepto de la estrategia de optimización de la Ruta crítica
de representación (CRP). CRP habilita al navegador cargar una página lo más rápido
posible al priorizar qué recursos se cargan y el orden en el que se
cargan.

Para obtener más información, consulta los documentos [Ruta crítica de
representación](/web/fundamentals/performance/critical-rendering-path/).


## Cómo aprobar la auditoría {: #how }

Esta auditoría no está estructurada en la actualidad como algo que se "aprueba" o se "desaprueba". La
información proporcionada por esta auditoría te da la posibilidad de mejorar
el rendimiento de carga de la página de tu app.

En la versión Chrome Extension de Lighthouse, tu informe genera un diagrama
como el siguiente:

<pre>
Initial navigation
|---lighthouse/ (developers.google.com)
    |---/css (fonts.googleapis.com) - 1058.34ms, 72.80KB
    |---css/devsite-googler-buttons.css (developers.google.com) - 1147.25ms, 70.77KB
    |---jsi18n/ (developers.google.com) - 1155.12ms, 71.20KB
    |---css/devsite-google-blue.css (developers.google.com) - 2034.57ms, 85.83KB
    |---2.2.0/jquery.min.js (ajax.googleapis.com) - 2699.55ms, 99.92KB
    |---contributors/kaycebasques.jpg (developers.google.com) - 2841.54ms, 84.74KB
    |---MC30SXJEli4/photo.jpg (lh3.googleusercontent.com) - 3200.39ms, 73.59KB
</pre>

Este diagrama representa las cadenas de solicitudes críticas de la página. La ruta de acceso desde
`lighthouse/` hasta `/css` es una cadena. La ruta de acceso desde `lighthouse/` hasta
`css/devsite-googler-buttons.css` es otra cadena,  etc. El puntaje
máximo de la auditoría representa esta cantidad de cadenas. Por ejemplo, el diagrama
anterior tendría un "puntaje" de 7.

El diagrama también desglosa cuánto tiempo se utilizó para descargar cada
recurso y la cantidad de bytes necesarios para descargar cada recurso.

Puedes usar este diagrama para mejorar tu CRP al:

* Minimizar la cantidad de recursos críticos: eliminándolos, aplazando
  su descarga, marcándolos como asinc., etc.
* Optimizar la cantidad de bytes críticos para reducir el tiempo de descarga (cantidad
  de recorridos).
* Optimizar el orden en el que se cargan los recursos críticos restantes:
  descargando todos los recursos críticos lo más pronto posible a fin de acortar la longitud de la ruta de acceso
  crítica.

Al optimizar cualquiera de estos factores se logra cargar la página con más rapidez.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse usa prioridad de red como un proxy para identificar recursos críticos
que bloquean la representación. Consulta [Prioridades de recursos de Chrome y
programación](https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc)
para obtener más información sobre cómo Chrome define estas prioridades.

Los datos sobre cadenas de solicitud crítica, tamaños de recursos y el tiempo transcurrido en descargar
recursos se obtienen del Chrome Debugger Protocol.


{# wf_devsite_translation #}
