project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El sitio usa receptores de eventos pasivos para mejorar el rendimiento del desplazamiento".

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# El sitio usa receptores de eventos pasivos para mejorar el rendimiento del desplazamiento  {: .page-title }

## Por qué es importante la auditoría {: #why }

La configuración de la opción `passive` en tus gestores de eventos táctiles y de la rueda del mouse puede
mejorar el rendimiento del desplazamiento.

Consulta [Mejorar el rendimiento de desplazamiento con gestores de eventos pasivos][blog] para
obtener información general.

Consulta el [Explainer][explainer] de la especificación del gestor de eventos pasivos
para obtener información técnica detallada.

[blog]: https://developers.google.com/web/updates/2016/06/passive-event-listeners
[explainer]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md

## Cómo aprobar la auditoría {: #how }

Agregar el marcador `passive` a todos los gestores de eventos que Lighthouse
haya identificado. En general, agrega el marcador `passive` a cada gestor de eventos `wheel`,
`mousewheel`, `touchstart`, y `touchmove` que no
llame`preventDefault()`.

En navegadores que admitan gestores de eventos pasivos, marcar un gestor como
`passive` es tan fácil como configurar un marcador:

    document.addEventListener('touchstart', onTouchStart, {passive: true});

Sin embargo, en los navegadores que no soportan gestores de eventos pasivos, el tercer
parámetro es un booleano para indicar si el evento debe ser un cuadro o una captura.
Por este motivo, usar la sintaxis anterior puede causar consecuencias no intencionadas.

Consulta el polyfill en [Detección de funciones][polyfill] para obtener información sobre cómo
implementar gestores de eventos pasivos en forma segura.

[polyfill]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse usa el siguiente algoritmo para marcar posibles candidatos para el gestor
de eventos pasivos:

1. Recopila todos los gestores de eventos de la página.
1. Filtra los gestores que no son táctiles ni funcionan con la rueda del mouse.
1. Filtra los gestores que llamen a `preventDefault()`.
1. Filtra los gestores de un host diferente
    que la página.

Lighthouse filtra los gestores de diferentes hosts porque probablemente
no tienes control sobre estas secuencias de comandos. Por este motivo, nota que la auditoría de Lighthouse
no representa el rendimiento de desplazamiento completo de tu página. Es posible que
existan secuencias de comandos de terceros que estén dañando el rendimiento del desplazamiento de tu página,
pero estas no se incluyen en tu informe de Lighthouse.


{# wf_devsite_translation #}
