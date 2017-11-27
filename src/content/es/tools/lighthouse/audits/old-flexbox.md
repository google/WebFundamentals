project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El sitio no usa el antiguo Flexbox de CSS".

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# El sitio no usa el antiguo Flexbox de CSS  {: .page-title }

## Por qué es importante la auditoría {: #why }

La especificación de 2009 para Flexbox es obsoleta y es 2,3 veces más lenta
que la última especificación. Consulta [El diseño de Flexbox no es lento][slow] para obtener más
información.

[slow]: https://developers.google.com/web/updates/2013/10/Flexbox-layout-isn-t-slow

## Cómo aprobar la auditoría {: #how }

En **URLs**, Lighthouse enumera cada instancia de `display: box` que encontró
en las hojas de estilo de tu página. Reemplaza cada instancia con la sintaxis nueva,
`display: flex`.

Si una hoja de estilo usa `display: box`, puede estar empleando otras propiedades obsoletas de
Flexbox. En resumen, cada propiedad que comienza con `box`,
como `box-flex`, es obsoleta y se la debe reemplazar. Consulta
[Asignación de propiedades en la sintaxis de la especificación de Flexbox 2009/2011 de CSS][map] para conocer con exactitud cómo
se asignan las propiedades anteriores a las nuevas.

[map]: https://wiki.csswg.org/spec/flexbox-2009-2011-spec-property-mapping

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse recopila todas las hojas de estilo que se usan en la página y controla si alguna
usa `display: box`. Lighthouse no controla si las hojas de estilo usan alguna otra
propiedad obsoleta.


{# wf_devsite_translation #}
