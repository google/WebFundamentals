project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El sitio no usa Date.now() en sus propias secuencias de comandos".

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# El sitio no usa Date.now() en sus propias secuencias de comandos   {: .page-title }

## Por qué es importante la auditoría {: #why }

Si usas `Date.now()` para medir el tiempo, considera usar
`performance.now()` en su lugar. `performance.now()` brinda una mayor resolución de
marca de tiempo y siempre aumenta a un ritmo constante que es independiente
del reloj del sistema, que puede ajustarse o sesgarse de forma manual.

## Cómo aprobar la auditoría {: #how }

En tu informe, Lighthouse enumera cada instancia de `Date.now()` que
encuentra en **URLs**. Reemplaza cada una de estas llamadas con `performance.now()`.

Consulta [`performance.now()`][MDN] para obtener más información sobre la API.

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse informa cada instancia de `Date.now()` que encuentra en
secuencias de comandos que están en el mismo host que la página. Se excluyen las secuencias de comandos de otros hosts
ya que Lighthouse asume que no tienes control de estas
secuencias de comandos. Por lo tanto, puede haber otras secuencias de comandos que usen `Date.now()` en tu página,
pero no aparecerán en tu informe de Lighthouse.


{# wf_devsite_translation #}
