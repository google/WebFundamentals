project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-12-09 #}

# La guía sin conexión {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Cuando AppCache llegó a nuestras vidas, nos ofreció un par de patrones para
que dispongamos de contenido sin conexión. Si estos eran los patrones que necesitabas, felicitaciones,
ganaste la lotería de AppCache (todavía nadie cobró el premio mayor). Sin embargo, el resto de
nosotros quedamos al margen,
en [penitencia](http://alistapart.com/article/application-cache-is-a-douchebag).

Con [ServiceWorker][sw_primer], ya no tenemos que intentar trabajar sin conexión y
los programadores recibieron las piezas sueltas para que se las arreglen solos. Te permite controlar
el almacenamiento en caché y la gestión de las solicitudes. Esto significa que
puedes crear tus propios patrones. Analicemos algunos patrones
aislados (en la práctica, es probable que uses muchos de ellos en conjunto,
según la URL y el contexto).

Todos los ejemplos de código funcionan actualmente en Chrome y Firefox, salvo que se indique lo contrario.
Para obtener toda la información sobre la compatibilidad con Service Workers, consulta [“¿Admite Service Workers?”][is_sw_ready].

Para ver una demostración en funcionamiento de algunos de estos patrones, consulta [Trained-to-thrill][ttt] 
y [este video](https://www.youtube.com/watch?v=px-J9Ghvcx4),
que demuestra el impacto del rendimiento.

## La máquina que almacena en caché: cuándo almacenar recursos

[ServiceWorker][sw_primer] te permite gestionar solicitudes independientemente del almacenamiento
en caché, así que las analizaremos por separado. En primer lugar, hablemos del almacenamiento en caché. ¿Cuándo se debe
realizar?

### Durante la instalación, como una dependencia {: #on-install-as-dependency }

<img src="images/cm-on-install-dep.png">

ServiceWorker te proporciona un evento `install`. Puedes usarlo para preparar
elementos; elementos que deben estar listos antes de gestionar otros eventos. Mientras esto
ocurre, todas las versiones anteriores de tu ServiceWorker seguirán en ejecución y
trabajando con las páginas. Por lo tanto, las tareas que lleves a cabo aquí no deben interrumpir nada de esto.

**Es ideal para** CSS, imágenes, fuentes, JS, plantillas… Básicamente, para cualquier elemento que consideres
estático en esa “versión” de tu sitio.

Son elementos que, si llegan
a fallar, provocarán que tu sitio deje de funcionar completamente; elementos que una app nativa equivalente incluiría
en la descarga inicial.

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mysite-static-v3').then(function(cache) {
          return cache.addAll([
            '/css/whatever-v3.css',
            '/css/imgs/sprites-v6.png',
            '/css/fonts/whatever-v8.woff',
            '/js/all-min-v4.js'
            // etc
          ]);
        })
      );
    });

`event.waitUntil` recibe una promesa para definir la longitud y el éxito de la
instalación. Si se rechaza la promesa, la instalación se considerará errónea
y se abandonará el ServiceWorker actual (si hay una versión anterior en
ejecución, no se tocará). `caches.open` y `cache.addAll` devuelven
promesas. Si falla alguno de los recursos, se rechaza la llamada `cache.addAll`.


En [Trained-to-thrill][ttt], lo uso para
[almacenar recursos estáticos en caché](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L3).


### Durante la instalación, no como una dependencia {: #on-install-not }

<img src="images/cm-on-install-not.png">

Parecido a lo descrito anteriormente, pero no causará demoras en la finalización de la instalación ni provocará
un fallo en la instalación si no se realiza correctamente el almacenamiento en caché.

**Es ideal para** recursos más grandes que no se necesitan de inmediato, como
recursos para niveles posteriores de un juego.

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mygame-core-v1').then(function(cache) {
          cache.addAll(
            // levels 11-20
          );
          return cache.addAll(
            // core assets & levels 1-10
          );
        })
      );
    });

En los niveles 11-20, no pasamos la promesa `cache.addAll` de vuelta a
`event.waitUntil`. Por lo tanto, el juego seguirá disponible
sin conexión aunque falle la promesa. Obviamente, necesitarás prever la posible ausencia de estos
niveles e intentar almacenarlos nuevamente en caché si están ausentes.

Se puede detener ServiceWorker mientras se descargan los niveles 11-20 dado que
terminó de gestionar los eventos; es decir, no se almacenarán en caché. Más adelante, planeamos
agregar una API que descargue en segundo plano en estos casos y en
descargas más pesadas, como películas.

### Durante la activación {: #on-activate }

<img src="images/cm-on-activate.png">

**Es ideal para** limpieza y migración.

Cuando se instala un nuevo ServiceWorker, y no se utiliza una versión anterior,
este ServiceWorker se activa y obtienes un evento `activate`. Dado que la versión
anterior ya no se utiliza, es buen momento de gestionar las migraciones de esquemas en
IndexedDB y eliminar los cachés sin uso.

    self.addEventListener('activate', function(event) {
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
        })
      );
    });

Durante la activación, se colocan otros eventos en la cola, como `fetch`; por lo tanto, una activación
extensa podría ser capaz de bloquear la carga de páginas. Asegúrate de que tu activación
esté lo más optimizada posible; úsala únicamente para tareas que _no_ podías hacer cuando la versión
anterior estaba activa.

En [Trained-to-thrill][ttt], lo uso para 
[quitar cachés antiguos](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L17).

### Durante la interacción del usuario {: #on-user-interaction }

<img src="images/cm-on-user-interaction.png">

**Es ideal para** permitirle al usuario seleccionar el contenido al que desee tener acceso sin conexión cuando sea imposible
utilizar todo el sitio sin conexión. Por ejemplo, un video en una
plataforma como YouTube, un artículo de Wikipedia o una determinada galería de Flickr.

Ofrece al usuario un botón “Leer más tarde” o “Guardar para ver sin conexión”. Cuando se haga clic
en el botón, busca lo que necesites en la red y guárdalo en caché.

    document.querySelector('.cache-article').addEventListener('click', function(event) {
      event.preventDefault();

      var id = this.dataset.articleId;
      caches.open('mysite-article-' + id).then(function(cache) {
        fetch('/get-article-urls?id=' + id).then(function(response) {
          // /get-article-urls returns a JSON-encoded array of
          // resource URLs that a given article depends on
          return response.json();
        }).then(function(urls) {
          cache.addAll(urls);
        });
      });
    });

La [Cache API][caches_api] se encuentra disponible desde páginas y Service
Workers. Esto significa que no hace falta involucrar al Service Worker para agregar elementos
al caché.


### Durante respuestas de la red {: #on-network-response }

<img src="images/cm-on-network-response.png">

**Es ideal para** actualizar recursos con frecuencia, como la casilla de entrada del usuario o contenidos de
artículos. También es útil para contenido no esencial, como avatares,
pero hay que tener cuidado.

Si la solicitud no coincide con ningún elemento del caché, recupéralo de la red,
envíalo a la página y agrégalo al caché al mismo tiempo.

Si lo haces para un rango de URL, como avatares, debes tener cuidado de no
exceder el almacenamiento de tu origen: cuando el usuario necesite
liberar espacio en el disco, no es buena idea que tu contenido sea lo primero que descarte. Asegúrate
de eliminar los elementos del caché que ya no necesites.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    });

Para que el uso de memoria sea eficiente, solo puedes leer una respuesta o solicitud una sola
vez. En el código anterior, se usa 
[`.clone()`](https://fetch.spec.whatwg.org/#dom-request-clone) para crear
copias adicionales que se pueden leer de forma individual.

En [Trained-to-thrill][ttt], lo utilizo para
[almacenar imágenes de Flickr en caché](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L109).

### Stale-while-revalidate {: #stale-while-revalidate }

<img src="images/cm-stale-while-revalidate.png">

**Es ideal para** actualizar recursos con frecuencia cuando no sea esencial contar
con la última versión. Los avatares pueden entrar en esta categoría.

Si dispones de una versión almacenada en caché, úsala, pero busca una actualizada para
la próxima vez.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function(response) {
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            return response || fetchPromise;
          })
        })
      );
    });

Es muy parecido a 
[stale-while-revalidate](https://www.mnot.net/blog/2007/12/12/stale) de HTTP.

### Durante un mensaje push {: #on-push-message }

<img src="images/cm-on-push.png">

La [Push API](/web/fundamentals/engage-and-retain/push-notifications/)
es otra característica de ServiceWorker. Le permite a
ServiceWorker despertarse cuando llegue un mensaje del servicio de mensajería del
SO. Esto ocurre incluso cuando el usuario no tiene una pestaña abierta
de tu sitio; solo se despierta al ServiceWorker. Pides permiso para hacerlo
desde una página y el usuario responde a la solicitud.

**Es ideal para** contenido relacionado con una notificación, como un mensaje
de chat, una noticia de último momento o un correo electrónico. También para contenido que no
cambia con frecuencia y que se beneficia de sincronizaciones inmediatas, como modificaciones de una lista de tareas pendientes
o un cambio en el calendario.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="0i7YdSEQI1w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Como resultado, se obtiene una notificación que, cuando se presiona,
abre o selecciona una página relevante. Pero es
_extremadamente_ importante actualizar los cachés antes de que esto ocurra. Sin lugar a dudas, el usuario estará en línea cuando reciba el mensaje
push, pero es posible que no lo esté cuando interactúe con la
notificación. Por eso, es importante permitir que el contenido esté disponible sin conexión. La
app nativa de Twitter, que generalmente es un excelente ejemplo de
“primero sin conexión”, suele tener problemas con esto.

Sin una conexión, Twitter no proporciona el contenido relacionado con el mensaje
push. Es más, cuando el usuario selecciona el mensaje, la notificación desaparece y el usuario
termina con menos información que antes. ¡No lo hagas!

<div style="clear:both;"></div>

Este código actualiza los cachés antes de mostrar la notificación:

    self.addEventListener('push', function(event) {
      if (event.data.text() == 'new-email') {
        event.waitUntil(
          caches.open('mysite-dynamic').then(function(cache) {
            return fetch('/inbox.json').then(function(response) {
              cache.put('/inbox.json', response.clone());
              return response.json();
            });
          }).then(function(emails) {
            registration.showNotification("New email", {
              body: "From " + emails[0].from.name
              tag: "new-email"
            });
          })
        );
      }
    });

    self.addEventListener('notificationclick', function(event) {
      if (event.notification.tag == 'new-email') {
        // Assume that all of the resources needed to render
        // /inbox/ have previously been cached, e.g. as part
        // of the install handler.
        new WindowClient('/inbox/');
      }
    });


### Durante una sincronización en segundo plano {: #on-background-sync }

<img src="images/cm-on-bg-sync.png">

Prueba interna: La sincronización en segundo plano todavía no se admite completamente en Chrome.

La [sincronización en segundo plano](/web/updates/2015/12/background-sync)
es otra característica de
ServiceWorker. Te permite solicitar sincronización de datos en segundo plano
una sola vez o en intervalos (extremadamente heurístico). Esto ocurre incluso cuando el usuario no tiene una pestaña abierta
de tu sitio; solo se despierta
al ServiceWorker. Pides permiso para hacerlo desde una página y el usuario responde a la
solicitud.

**Es ideal para** actualizaciones que no sean urgentes, sobre todo aquellas que ocurren tan frecuentemente que sería demasiado mostrar un mensaje push para cada actualización, como
muros de redes sociales o
noticias.

    self.addEventListener('sync', function(event) {
      if (event.id == 'update-leaderboard') {
        event.waitUntil(
          caches.open('mygame-dynamic').then(function(cache) {
            return cache.add('/leaderboard.json');
          })
        );
      }
    });


## Persistencia del caché {: #cache-persistence }

Tu origen recibe una determinada cantidad de espacio libre para hacer lo que desee.
A este espacio, lo comparte todo el almacenamiento del origen: LocalStorage,
IndexedDB, Filesystem y, sin lugar a dudas, los cachés.

La cantidad que recibes no está especificada; variará según el dispositivo y las condiciones de
almacenamiento. Para conocer la cantidad disponible, utiliza lo siguiente:

    navigator.storageQuota.queryInfo("temporary").then(function(info) {
      console.log(info.quota);
      // Result: <quota in bytes>
      console.log(info.usage);
      // Result: <used data in bytes>
    });

Sin embargo, como cualquier almacenamiento del navegador, el navegador puede descartarlo libremente si
el dispositivo se queda sin espacio. Infortunadamente, el navegador
no puede diferenciar entre las películas que quieres guardar sí
o sí y el juego que no te interesa perder.

Para evitarlo, se propone usar una API
([`requestPersistent`](https://storage.spec.whatwg.org/){: .external }):

    // From a page:
    navigator.storage.requestPersistent().then(function(granted) {
      if (granted) {
        // Hurrah, your data is here to stay!
      }
    });

Obviamente, el usuario debe dar permiso. Es importante que el usuario sea parte de este
flujo de trabajo ya que ahora controlará la eliminación.
Si su dispositivo se queda con poco espacio, y el problema no se soluciona eliminando datos
no esenciales, el usuario determinará los elementos
que se conservarán y los que se quitarán.

Para que esto funcione, los sistemas operativos deben tratar a los orígenes “duraderos”
de la misma forma que a las apps nativas cuando analicen el uso del almacenamiento en lugar de
describir al navegador como un solo elemento.


## Sugerencias de trabajo: responder a solicitudes {: #serving-suggestions }

No importa cuántas veces realices almacenamiento en caché: el Service Worker no usará
la caché hasta que le informes cuándo y cómo hacerlo. A continuación, se describen algunos patrones para
gestionar solicitudes:

### Solo caché{: #cache-only }

<img src="images/ss-cache-only.png">

**Es ideal para** cualquier elemento que consideres estático en una “versión” de tu sitio.
Se supone que almacenaste estos elementos en caché durante el evento de instalación, así que puedes estar tranquilo de que
están allí.

    self.addEventListener('fetch', function(event) {
      // If a match isn't found in the cache, the response
      // will look like a connection error
      event.respondWith(caches.match(event.request));
    });

Sin embargo, generalmente no hace falta que gestiones este caso específicamente: se analiza en
[Caché y recurrir a la red](#cache-falling-back-to-network).

### Solo red {: #network-only }

<img src="images/ss-network-only.png">

**Es ideal para** elementos que no tengan un equivalente sin conexión, como pings
de analytics y solicitudes que no sean GET.

    self.addEventListener('fetch', function(event) {
      event.respondWith(fetch(event.request));
      // or simply don't call event.respondWith, which
      // will result in default browser behaviour
    });

Sin embargo, generalmente no hace falta que gestiones este caso específicamente: se analiza en 
[Caché y recurrir a la red](#cache-falling-back-to-network).

### Caché y recurrir a la red {: #cache-falling-back-to-network }

<img src="images/ss-falling-back-to-network.png">

**Es ideal para** gestionar la mayoría de las solicitudes si desarrollas con una perspectiva de “primero sin
conexión”. Otros patrones serán excepciones según la
solicitud entrante.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

Te proporciona la funcionalidad de “Solo caché” para elementos en la caché y la
funcionalidad de “Solo red” para elementos que no estén en la caché (incluso las solicitudes
que no sean GET).

### La carrera del caché y la red {: #cache-and-network-race }

<img src="images/ss-cache-and-network-race.png">

**Es ideal para** recursos pequeños cuando buscas rendimiento en dispositivos con acceso
lento al disco.

Cuando se combinan discos duros antiguos, análisis de virus y
conexiones rápidas de Internet, puede ser más rápido obtener recursos desde la red que
acceder al disco. Sin embargo, ten en cuenta que acceder a la red cuando el usuario tiene el contenido
en su dispositivo puede ser un gasto inútil de los datos.

    // Promise.race is no good to us because it rejects if
    // a promise rejects before fulfilling. Let's make a proper
    // race function:
    function promiseAny(promises) {
      return new Promise((resolve, reject) => {
        // make sure promises are all promises
        promises = promises.map(p => Promise.resolve(p));
        // resolve this promise as soon as one resolves
        promises.forEach(p => p.then(resolve));
        // reject if all promises reject
        promises.reduce((a, b) => a.catch(() => b))
          .catch(() => reject(Error("All failed")));
      });
    };

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        promiseAny([
          caches.match(event.request),
          fetch(event.request)
        ])
      );
    });


### Red y recurrir al caché {: #network-falling-back-to-cache }

<img src="images/ss-network-falling-back-to-cache.png">

**Es ideal para** una solución rápida de los recursos que se actualizan con frecuencia en otra “versión”
del sitio. Por ejemplo, artículos, avatares, muros de redes sociales,
marcadores de juegos, etc.

Esto significa que los usuarios en línea obtienen el contenido más actualizado, mientras que los usuarios sin
conexión obtienen una versión anterior almacenada en caché. Si la solicitud de red se realiza correctamente,
se recomienda [actualizar la entrada del caché](#on-network-response).

Sin embargo, este método tiene deficiencias. Si la conexión del usuario es intermitente o
lenta, habrá que esperar a que falle la red antes de mostrar
el contenido que ya está en el dispositivo y que es completamente aceptable. Esto puede demorar
mucho y la experiencia del usuario será frustrante. En el siguiente
patrón, [Caché y después red](#cache-then-network), se describe una mejor solución.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        })
      );
    });

### Caché después red {: #cache-then-network }

<img src="images/ss-cache-then-network.png">

**Es ideal para** contenido que se actualiza con frecuencia. Por ejemplo, artículos, muros en redes
sociales, marcadores de juegos, etc.

Este patrón requiere que la página realice dos solicitudes: una al caché y otra
a la red. La idea es mostrar primero los datos del caché y, a continuación, actualizar la página
si se obtienen los datos de la red.

A veces, simplemente basta con reemplazar los datos actuales cuando llegan los datos nuevos
(p. ej., en el marcador de un juego), pero este método puede generar interrupciones en contenido
de mayor tamaño. Básicamente, no es buena idea “hacer desaparecer” contenido que el usuario esté
leyendo o con el que esté interactuando.

Twitter agrega el contenido nuevo sobre el contenido anterior y establece la posición
de la vista para no interrumpir al usuario. Esto es posible porque el orden del contenido de
Twitter es, en gran medida, lineal. En
[Trained-to-thrill][ttt], copié este patrón para que el contenido aparezca en pantalla lo más rápido
posible, pero sin dejar de mostrar contenido actualizado a medida que llega.

**Código de la página:**

    var networkDataReceived = false;

    startSpinner();

    // fetch fresh data
    var networkUpdate = fetch('/data.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      networkDataReceived = true;
      updatePage();
    });

    // fetch cached data
    caches.match('/data.json').then(function(response) {
      if (!response) throw Error("No data");
      return response.json();
    }).then(function(data) {
      // don't overwrite newer network data
      if (!networkDataReceived) {
        updatePage(data);
      }
    }).catch(function() {
      // we didn't get cached data, the network is our last hope:
      return networkUpdate;
    }).catch(showErrorMessage).then(stopSpinner);


**Código del ServiceWorker:**

Siempre se acude a la red y se actualiza la caché a medida que se avanza.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    });

Note: El código anterior todavía no funciona en Chrome porque debemos exponer `fetch` y `caches` a páginas ([vale n.º 1](https://code.google.com/p/chromium/issues/detail?id=436770) y [vale n.º 2](https://code.google.com/p/chromium/issues/detail?id=439389)).

En [Trained-to-thrill][ttt], lo solucioné de la siguiente manera:
usé [XHR en lugar de fetch](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/utils.js#L3) y
abusé del encabezado Accept para indicarle a ServiceWorker de dónde obtener 
el resultado ([código de la página](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/index.js#L70) y
[código de ServiceWorker](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L61)).

### Retroceso genérico {: #generic-fallback }

<img src="images/ss-generic-fallback.png">

Si no puedes proporcionar un elemento del caché o de la red, conviene
proporcionar un retroceso genérico.

**Es ideal para** imágenes secundarias, como avatares, solicitudes POST no exitosas o
páginas “Unavailable while offline”.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
          // Fall back to network
          return response || fetch(event.request);
        }).catch(function() {
          // If both fail, show a generic fallback:
          return caches.match('/offline.html');
          // However, in reality you'd have many different
          // fallbacks, depending on URL & headers.
          // Eg, a fallback silhouette image for avatars.
        })
      );
    });

El elemento al que retrocedes es, probablemente, una [dependencia de instalación](#on-install-as-dependency).

Si tu página publica un correo electrónico, tu ServiceWorker puede recurrir a
almacenar el correo electrónico en una bandeja de salida de IDB y responderle a la página que
no se pudo enviar el correo, pero que los datos se conservaron correctamente.

### ServiceWorker y plantillas {: #serviceworker-side-templating }

<img src="images/ss-sw-side-templating.png">

**Es ideal para** páginas cuya respuesta del servidor no se puede almacenar en caché.

[Representar las páginas en el servidor permite que todo sea más rápido](https://jakearchibald.com/2013/progressive-enhancement-is-faster/),
pero es posible que se incluyan datos que no tengan mucho sentido en un caché;
por ejemplo, “Registrado como…”. En cambio, si un ServiceWorker controla tu página,
puedes optar por solicitar datos JSON junto con una plantilla y representar
esto en su lugar.

    importScripts('templating-engine.js');

    self.addEventListener('fetch', function(event) {
      var requestURL = new URL(event.request);

      event.respondWith(
        Promise.all([
          caches.match('/article-template.html').then(function(response) {
            return response.text();
          }),
          caches.match(requestURL.path + '.json').then(function(response) {
            return response.json();
          })
        ]).then(function(responses) {
          var template = responses[0];
          var data = responses[1];

          return new Response(renderTemplate(template, data), {
            headers: {
              'Content-Type': 'text/html'
            }
          });
        })
      );
    });


## Revisión general

No tienes que elegir uno de estos métodos. Es probable que uses varios
de acuerdo con la URL de solicitud. Por ejemplo,
[Trained-to-thrill][ttt] usa los siguientes:

* [Almacenar en caché durante la instalación](#on-install-as-dependency) para la IU y las funcionalidades estáticas
* [Almacenar en caché durante respuestas de la red](#on-network-response) para datos e imágenes de Flickr
* [Buscar en caché y recurrir a la red](#cache-falling-back-to-network) para la mayoría de las solicitudes
* [Buscar en caché y después en la red](#cache-then-network) para los resultados de la búsqueda de Flickr

Solo mira la solicitud y decide qué hacer:

    self.addEventListener('fetch', function(event) {
      // Parse the URL:
      var requestURL = new URL(event.request.url);

      // Handle requests to a particular host specifically
      if (requestURL.hostname == 'api.example.com') {
        event.respondWith(/* some combination of patterns */);
        return;
      }
      // Routing for local URLs
      if (requestURL.origin == location.origin) {
        // Handle article URLs
        if (/^\/article\//.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/\.webp$/.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (request.method == 'POST') {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/cheese/.test(requestURL.pathname)) {
          event.respondWith(
            new Response("Flagrant cheese error", {
              status: 512
            })
          );
          return;
        }
      }

      // A sensible default pattern
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

¿Ves?


### Créditos {: hide-from-toc }
de los hermosos íconos:

* [Código](http://thenounproject.com/term/code/17547/){: .external }: buzzyrobot
* [Calendario](http://thenounproject.com/term/calendar/4672/){: .external }: Scott Lewis
* [Red](http://thenounproject.com/term/network/12676/){: .external }: Ben Rizzo
* [SD](http://thenounproject.com/term/sd-card/6185/): Thomas Le Bas
* [CPU](http://thenounproject.com/term/cpu/72043/){: .external }: iconsmind.com
* [Papelera](http://thenounproject.com/term/trash/20538/){: .external }: trasnik
* [Notificación](http://thenounproject.com/term/notification/32514/){: .external }: @daosme
* [Diseño](http://thenounproject.com/term/layout/36872/){: .external }: Mister Pixel
* [Nube](http://thenounproject.com/term/cloud/2788/){: .external }: P.J. Onori

Gracias a [Jeff Posnick](https://twitter.com/jeffposnick) por descubrir muchos errores importantes
antes de presionar “Publicar”.

### Consultas adicionales
* [ServiceWorkers: introducción][sw_primer]
* [¿Admite ServiceWorker?][is_sw_ready] (realiza un seguimiento del estado de implementación en los navegadores más utilizados)
* [Promesas de JavaScript: introducción](/web/fundamentals/getting-started/primers/promises) (guía de las promesas)


[ttt]: https://jakearchibald.github.io/trained-to-thrill/
[is_sw_ready]: https://jakearchibald.github.io/isserviceworkerready/
[sw_primer]: /web/fundamentals/getting-started/primers/service-workers
[caches_api]: https://developer.mozilla.org/en-US/docs/Web/API/Cache


{# wf_devsite_translation #}
