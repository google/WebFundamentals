project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El sitio no usa Application Cache".

{# wf_updated_on: 2017-01-04 #}
{# wf_published_on: 2017-01-04 #}

# El sitio no usa Application Cache  {: .page-title }

## Por qué es importante la auditoría {: #why }

Application Cache, también conocido como AppCache, es [obsoleto][deprecated].

[deprecated]: https://html.spec.whatwg.org/multipage/browsers.html#offline

## Cómo aprobar la auditoría {: #how }

En su lugar considera usar el service worker [API de caché][API].

Para ayudar a migrar desde AppCache a service workers, considera usar la biblioteca
[sw-appcache-behavior][sw-appcache-behavior]. Esta biblioteca genera una
implementación basada en service worker del comportamiento definido en un manifiesto de
AppCache.

Consulta la referencia de auditoría [La URL responde con un 200 cuando está sin conexión](http-200-when-offline) 
para obtener más recursos sobre cómo usar service workers para que tu sitio funcione
sin conexión.

[API]: https://developer.mozilla.org/en-US/docs/Web/API/Cache

[sw-appcache-behavior]: https://github.com/GoogleChrome/sw-appcache-behavior

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

La auditoría se aprueba si no se detecta ningún manifiesto de AppCache.


{# wf_devsite_translation #}
