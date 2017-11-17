project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "URL responde con un mensaje HTTP 200 cuando está sin conexión".

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

# URL responde con un mensaje HTTP 200 cuando está sin conexión {: .page-title }

## Por qué es importante la auditoría {: #why }

Progressive Web Apps trabajan sin conexión. Si Lighthouse no recibe una respuesta HTTP 200
cuando accede a una página mientras está sin conexión, esto significa que no se puede acceder a la página
sin conexión.

## Cómo aprobar la auditoría {: #how }

1. Agrega un service worker a tu app.
2. Usa el service worker para almacenar en caché los archivos localmente.
3. Cuando estés sin conexión, usa el service worker como un proxy de red para mostrar la
   versión almacenada en caché del archivo.

Para obtener más información sobre cómo agregar un service worker a una app existente, consulta [Agregar un service
worker a la app web
y trabajar sin conexión](https://codelabs.developers.google.com/codelabs/offline). Aplica lo que
aprendiste en este codelab práctico y paso a paso para agregar un service
worker a tu propia app. Esto abarca los pasos 1 y 3 precedentes.

El codelab anterior brinda información básica sobre cómo depurar tu service
worker con Chrome DevTools. Para obtener más información, consulta el codelab dedicado a
este tema, [Depurar los service
worker](https://codelabs.developers.google.com/codelabs/debugging-service-workers).

Usa la [guía sin conexión](https://jakearchibald.com/2014/offline-cookbook/) para
determinar qué estrategias de almacenamiento en caché son más apropiadas para tu app. Esto abarca el paso 2 precedente.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse emula el uso sin conexión con el protocolo de depuración de Chrome
y luego intenta recuperar la página con `XMLHttpRequest`.


{# wf_devsite_translation #}
