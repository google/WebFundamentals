project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El sitio no usa console.time() en sus propias secuencias de comandos".

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# El sitio no usa console.time() en sus propias secuencias de comandos  {: .page-title }

## Por qué es importante la auditoría {: #why }

Si usas `console.time()` para medir el rendimiento de tu página, considera
en su lugar considera usar User Timing API. Entre los beneficios se incluyen:

* Marcas de tiempo de alta resolución.
* Datos de intervalos exportables.
* Integración con Timeline de Chrome DevTools. Cuando se llama la función User Timing
  `performance.measure()` durante una grabación de Timeline, DevTools
  agrega automáticamente la medición a los resultados de Timeline, tal como se muestra en la etiqueta
  `my custom measurement` en la captura de pantalla a continuación.

![Medición de User Timing en Timeline de Chrome DevTools][timeline]

[timeline]: /web/tools/lighthouse/images/user-timing-measurement-in-devtools.png

## Cómo aprobar la auditoría {: #how }

En tu informe, Lighthouse enumera cada instancia de `console.time()` que
encuentra en **URLs**. Reemplaza cada una de estas llamadas con `performance.mark()`.
Si deseas medir el tiempo que ha transcurrido entre las dos marcas, usa
`performance.measure()`.

Consulta [User Timing API: Understanding Your Web App][html5rocks]
para obtener más información sobre cómo usar la API.

[html5rocks]: https://www.html5rocks.com/en/tutorials/webperformance/usertiming/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse informa cada instancia de `console.time()` que encuentra en
secuencias de comandos que están en el mismo host que la página. Se excluyen las secuencias de comandos de otros hosts
ya que Lighthouse asume que no tienes control de estas
secuencias de comandos. Por lo tanto, puede haber otras secuencias de comandos que usen `console.time()` en tu página,
pero no aparecerán en tu informe de Lighthouse.


{# wf_devsite_translation #}
