project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El sitio no usa eventos de mutación en sus propias secuencias de comandos".

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# El sitio no usa eventos de mutación en sus propias secuencias de comandos  {: .page-title }

## Por qué es importante la auditoría {: #why }

Los siguientes eventos de mutación afectan negativamente el rendimiento y dejaron de estar disponibles en las
especificaciones de los eventos del DOM:

* `DOMAttrModified`
* `DOMAttributeNameChanged`
* `DOMCharacterDataModified`
* `DOMElementNameChanged`
* `DOMNodeInserted`
* `DOMNodeInsertedIntoDocument`
* `DOMNodeRemoved`
* `DOMNodeRemovedFromDocument`
* `DOMSubtreeModified`

## Cómo aprobar la auditoría {: #how }

En **URLs**, Lighthouse informa los detectores de eventos de mutación que encontró en
tu código. Reemplaza cada uno de estos eventos de mutación con `MutationObserver`.
Consulta [`MutationObserver`][mdn] en MDN para obtener más información.

[mdn]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse recopila todos los detectores de eventos de la página y marca
aquellos que usan los tipos de eventos indicados en la sección [Por qué es
importante la auditoría](#why).


{# wf_devsite_translation #}
