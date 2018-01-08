project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El sitio no usa SQL Web".

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# El sitio no usa SQL Web  {: .page-title }

## Por qué es importante la auditoría {: #why }

SQL Web dejó de estar disponible. Consulta la [Base de datos de SQL Web][spec] para obtener más información.

[spec]: https://www.w3.org/TR/webdatabase/

## Cómo aprobar la auditoría {: #how }

Considera reemplazar tu base de datos SQL Web por una alternativa moderna, como
[IndexedDB][indexeddb].

Consulta [Información general del almacenamiento web][overview] para obtener información sobre otras opciones de almacenamiento
disponibles.

[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[overview]: /web/fundamentals/instant-and-offline/web-storage/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse comprueba si la página tiene una instancia de base de datos de SQL Web.


{# wf_devsite_translation #}
