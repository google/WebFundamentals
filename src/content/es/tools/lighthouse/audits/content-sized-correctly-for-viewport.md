project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "Contenido dimensionado correctamente para la ventana de visualización".

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Contenido dimensionado correctamente para la ventana de visualización  {: .page-title }

## Por qué es importante la auditoría {: #why }

Esta auditoría comprueba que el ancho del contenido en tu página sea equivalente
al ancho de la ventana de visualización. Cuando el ancho del contenido es menor o mayor que
el ancho de la ventana de visualización, suele ser una señal de que la página no está optimizada para
pantallas de dispositivos móviles.

## Cómo aprobar la auditoría {: #how }

Esta auditoría es una forma indirecta de determinar si tu página está optimizada para
dispositivos móviles. Si tu sitio no está optimizado y deseas que lo esté, primero consulta
[Conceptos básicos de diseño web adaptable](/web/fundamentals/design-and-ux/responsive/).


Puedes ignorar esta auditoría si:

* Tu sitio no necesita ser optimizado para pantallas de dispositivos móviles.
* El ancho del contenido de tu página es intencionalmente menor o mayor que el
  ancho de la ventana de visualización.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Se aprueba la auditoría si `window.innerWidth === window.outerWidth`.


{# wf_devsite_translation #}
