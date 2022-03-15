project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Asegúrate de obtener el mejor rendimiento posible de la implementación de service worker.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-09-21 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Carga de service worker de alto rendimiento {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

Si agregas un [service
worker](/web/fundamentals/getting-started/primers/service-workers) a tu app
web, puedes ofrecer ventajas importantes de rendimiento que van más allá de lo que es posible,
incluso si sigues todas las [prácticas recomendadas tradicionales de almacenamiento en caché
de navegadores](/web/fundamentals/performance/optimizing-content-efficiency/http-caching).
Pero hay algunas prácticas recomendadas que puedes seguir para optimizar los tiempos
de carga. Las siguientes sugerencias te permitirán obtener el mejor rendimiento posible de
la implementación de un service worker.

## Primero, ¿qué son las solicitudes de navegación?

Las solicitudes de navegación se definen (de manera concisa) en la [especificación
Fetch](https://fetch.spec.whatwg.org/#navigation-request) de la siguiente manera: <em>Una
[solicitud](https://fetch.spec.whatwg.org/#concept-request) de navegación es una
solicitud cuyo
[destino](https://fetch.spec.whatwg.org/#concept-request-destination) es
"<code>document</code>".</em> Si bien técnicamente correcta, esa definición no es
detallada y no destaca la importancia de las navegaciones en el rendimiento de una
app web. En términos informales, una solicitud de navegación ocurre cuando se ingresa una
URL en la barra de ubicación del navegador, se interactúa con
<code>[window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)</code>
o se visita un enlace desde una página web a otra. Si se agrega un `<iframe>`
en una página, también se genera una solicitud de navegación para `src` de `<iframe>`.

Note: Las [aplicaciones de una página](https://en.wikipedia.org/wiki/Single-page_application),
que utilizan la [API de historial](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
y las modificaciones de DOM en el lugar, tienden a evitar las solicitudes de navegación al pasar
de una vista a otra. Pero la solicitud inicial en una sesión de navegador para una
app de una sola página sigue siendo una navegación.

Si bien la app web puede hacer numerosas [solicitudes de
subrecursos](https://fetch.spec.whatwg.org/#subresource-request) adicionales a fin de
mostrar todo el contenido (para elementos como secuencias de comandos, imágenes o estilos), es el
HTML de la respuesta de navegación el que es responsable de iniciar todas las demás
solicitudes. Cualquier demora que haya en la respuesta a la solicitud de navegación inicial será
muy evidente para los usuarios, ya que deberán esperar frente a una pantalla en blanco
durante un tiempo indeterminado.

Note: El [servidor push HTTP/2](/web/fundamentals/performance/http2/#server_push)
agrega una complicación aquí, ya que permite que las respuestas de los subrecursos se devuelvan sin
latencia adicional, junto con la respuesta de navegación. Pero las demoras para
establecer la conexión con el servidor remoto también generarán demoras en los
datos que se están enviando mediante un proceso push al cliente.

Las [prácticas recomendadas de
almacenamiento en caché](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#top_of_page) tradicionales,
que utilizan encabezados de `Cache-Control` de HTTP y no un service worker,
requieren [ir a la red en cada
navegación](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#invalidating_and_updating_cached_responses),
para garantizar que las URL de todos los subrecursos estén actualizadas. Lo ideal para el rendimiento
de red sería obtener todas las ventajas del almacenamiento intenso en caché de los subrecursos
*sin* requerir que se genere una solicitud de navegación que dependa de la red. Con un service worker
configurado correctamente en función de la arquitectura
específica del sitio, ahora esto es posible.

## Para un rendimiento óptimo, omite la red para las navegaciones

El mayor impacto de agregar un service worker a la aplicación web se debe a que
se responde a las solicitudes de navegación sin esperar a la red. En el
mejor de los casos, para conectarse a un servidor web, es probable que se necesiten varios órdenes de
magnitud más de tiempo que para leer datos almacenados localmente en la caché. En situaciones
en las que la conexión del cliente no es la ideal (en general, cualquier red
móvil), el tiempo que lleva recibir el primer byte de datos desde la
red puede fácilmente superar el tiempo total que llevaría mostrar todo el
HTML.

La elección de la implementación adecuada de service worker que priorice el almacenamiento en caché depende principalmente de
la arquitectura del sitio.

### Transmisión de respuestas compuestas

Si el HTML que usas se puede dividir naturalmente en partes de menor tamaño, con un encabezado y un pie de página estáticos
junto con una porción media que varíe en función de la URL de la solicitud,
lo ideal es procesar las navegaciones mediante una respuesta de transmisión. Puedes componer
la respuesta con partes individuales que se almacenen en caché por separado. El uso de
transmisiones garantiza que la porción inicial de la respuesta se exponga al
cliente lo más rápido posible, lo que da más tiempo para analizar el HTML y
hacer solicitudes adicionales de subrecursos.

En el artículo "[Stream Your Way to Immediate Responses](/web/updates/2016/06/sw-readablestreams)" (Obtenga respuestas inmediatas mediante transmisiones)
se proporciona la descripción general de este enfoque, pero si deseas consultar ejemplos de aplicación real
y demostraciones, la guía más completa es "[2016 - the year of web streams](https://jakearchibald.com/2016/streams-ftw/)" (2016: el año de las transmisiones web),
de Jake Archibald.

Note: Para algunas apps web, no se puede evitar el uso de la red al responder a
una solicitud de navegación. El HTML de cada URL del sitio puede depender de datos
provenientes de un sistema de administración de contenido o tal vez el sitio use diseños distintos y
no se pueda adaptar a una estructura de shell de aplicación genérica. De todas maneras, el modelo service worker
abre la puerta a mejoras con respecto al *statu quo* para la carga de HTML.
Al usar transmisiones, puedes responder a las solicitudes de navegación de inmediato con un
fragmento de HTML común almacenado en caché (tal vez incluso todo el contenido de `<head>` del sitio y algunos elementos
iniciales de `<body>`) mientras se carga desde la red el resto del HTML, es decir, las opciones específicas correspondientes a
una URL dada.

### Almacenamiento en caché de HTML estático

Si tienes una app web simple que utiliza exclusivamente un conjunto de documentos de HTML
estático, tienes suerte: la ruta para evitar la red
es directa. Necesitas una configuración de service worker que responda a las navegaciones con
HTML almacenado previamente en caché y que además incluya lógica no bloqueante para mantener ese
HTML actualizado a medida que el sitio evolucione.

Nuestro enfoque es usar un controlador `fetch` de service worker que implemente una
[política stale-while-revalidate](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)
para las solicitudes de navegación, de la siguiente manera:

```js
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // See /web/fundamentals/getting-started/primers/async-functions
    // for an async/await primer.
    event.respondWith(async function() {
      // Optional: Normalize the incoming URL by removing query parameters.
      // Instead of https://example.com/page?key=value,
      // use https://example.com/page when reading and writing to the cache.
      // For static HTML documents, it's unlikely your query parameters will
      // affect the HTML returned. But if you do use query parameters that
      // uniquely determine your HTML, modify this code to retain them.
      const normalizedUrl = new URL(event.request.url);
      normalizedUrl.search = '';

      // Create promises for both the network response,
      // and a copy of the response that can be used in the cache.
      const fetchResponseP = fetch(normalizedUrl);
      const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

      // event.waitUntil() ensures that the service worker is kept alive
      // long enough to complete the cache update.
      event.waitUntil(async function() {
        const cache = await caches.open('my-cache-name');
        await cache.put(normalizedUrl, await fetchResponseCloneP);
      }());

      // Prefer the cached response, falling back to the fetch response.
      return (await caches.match(normalizedUrl)) || fetchResponseP;
    }());
  }
});
```

Otro enfoque sería usar una herramienta como [Workbox](https://workboxjs.org/), que
se enlaza con el proceso de compilación de la app web para generar un service worker que
procese el almacenamiento en caché de todos los recursos estáticos (no solamente los documentos HTML), los entregue
primero desde la caché y los mantenga actualizados.

### Uso de un shell de aplicación

Si tienes una aplicación ya existente de una sola página, la implementación de la
[arquitectura de shell de aplicación](/web/fundamentals/architecture/app-shell)
es muy simple. Hay una estrategia clara para procesar
las solicitudes de navegación sin utilizar la red: cada solicitud de navegación,
independientemente de la URL específica, se responde con una copia almacenada en caché de un
"shell" genérico de un documento HTML. El shell incluye todo lo necesario para el arranque de
la aplicación de una sola página y, luego, la lógica de enrutamiento del cliente puede presentar el
contenido específico de la URL de la solicitud.

Escrito, el controlador `fetch` de service worker correspondiente sería
similar al siguiente:

```js
// Not shown: install and activate handlers to keep app-shell.html
// cached and up to date.
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Always respond to navigations with the cached app-shell.html,
    // regardless of the underlying event.request.url value.
    event.respondWith(caches.match('app-shell.html'));
  }
});
```

[Workbox](https://workboxjs.org/) también puede ser útil, ya que puede garantizar que el
`app-shell.html` se almacene en caché y se mantenga actualizado y también puede proporcionar
[asistentes](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Router.html#registerNavigationRoute)
para responder a las solicitudes de navegación con el shell almacenado en caché.

## ⚠️ Problemas potenciales de rendimiento

Si no puedes responder a las navegaciones con datos almacenados en caché, pero necesitas un service
worker para otra funcionalidad (como proporcionar
[contenido de reserva sin conexión](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)
o [procesar notificaciones push](/web/fundamentals/getting-started/codelabs/push-notifications/)),
estás en una situación difícil. Si no tomas precauciones específicas,
podrías terminar con un problema de rendimiento cuando agregues el service worker.
Pero si estás atento y evitas estas situaciones, no tendrás ningún problema.

### Nunca uses un controlador fetch "passthrough"

Si usas un service worker solo para notificaciones push, podrías
cometer el error de pensar que lo siguiente es obligatorio o que se considerará
una instrucción de no operación:

```js
// Don't do this!
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
```

Este tipo de controlador fetch "passthrough" es peligroso, ya que
la aplicación web seguirá funcionando, pero introducirás una pequeña
latencia cada vez que se haga una solicitud de red. El
inicio de un service worker genera una sobrecarga si no se estaba ejecutando, y también hay
sobrecarga cuando se pasa la respuesta del service worker al cliente que
hizo la solicitud.

Si el service worker no incluye un controlador `fetch`, algunos navegadores
toman nota de ello y [no inician el service
worker](https://github.com/w3c/ServiceWorker/issues/718) cuando hay una
solicitud de red.

### Usa la precarga de navegación cuando sea apropiado

Hay situaciones en las que *necesitas* un controlador `fetch` para usar una estrategia de
almacenamiento en caché para ciertos subrecursos, pero la arquitectura hace que sea imposible
responder a las solicitudes de navegación. Como alternativa, podrías
usar datos almacenados en caché en la respuesta de navegación, pero deberías asegurarte de hacer una
solicitud de red de datos actualizados para reemplazar los datos antiguos una vez que la página se haya cargado.

Una función conocida como
[precarga de navegación](https://developer.mozilla.org/en-US/docs/Web/API/NavigationPreloadManager)
es relevante para situaciones como estas dos. Puede mitigar las demoras que podría introducir un
service worker que no respondiera a las navegaciones. También
se puede usar para solicitudes "fuera de banda" de datos actualizados que después pueden
usarse en el código del cliente una vez que la página se haya cargado. El artículo
"[Speed up Service Worker with Navigation Preloads](/web/updates/2017/02/navigation-preload)"
tiene todos los detalles que necesitas para configurar el service worker
según corresponda.

## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}
