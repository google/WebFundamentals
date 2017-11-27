project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Están llegando a la Web ricas experiencias sin conexión, sincronizaciones periódicas en segundo plano, notificaciones push: funcionalidad que normalmente requiere una app nativa. Los service workers brindan la base técnica en la que descansan todas estas funciones.

{# wf_published_on: 2014-12-01 #}
{# wf_updated_on: 2016-01-18 #}

# Service Workers: introducción {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

Están llegando a la Web ricas experiencias sin conexión, sincronizaciones periódicas en segundo plano, notificaciones
push: funcionalidad que normalmente requiere una app
nativa. Los service workers brindan la base
técnica en la que descansan todas estas funciones.

## Qué es un service worker

Un service worker es una secuencia de comandos que tu navegador ejecuta en segundo plano,
separado de una página web, abriéndoles la puerta a funciones que no necesitan una página
web ni interacción de usuario. En la actualidad, ya incorporan funciones como 
[notificaciones de aplicación](/web/updates/2015/03/push-notifications-on-the-open-web) 
y [sincronización en segundo plano](/web/updates/2015/12/background-sync). En el futuro,
los service workers soportarán cosas como sincronización periódica o perimetraje.
La función principal que analizamos en este instructivo es la capacidad de interceptar y 
manejar solicitudes de red, incluida la administración programática de un caché de 
respuestas.

El motivo por el que esta es una API tan emocionante es que te permite soportar experiencias
sin conexión, brindándoles a los programadores control total sobre la
experiencia.

Antes del service worker, existía otra API que les brindaba a los usuarios una experiencia
sin conexión en la Web, llamada [AppCache](//www.html5rocks.com/en/tutorials/appcache/beginner/){: .external }.
El problema principal con AppCache es la [cantidad de trampas](http://alistapart.com/article/application-cache-is-a-douchebag) 
que existen, así también como el hecho de que aunque el diseño funciona muy bien con apps 
web de una página, no funciona tan bien con sitios de varias páginas. Los service workers están diseñados para 
evitar estas deficiencias comunes.

Algunas consideraciones sobre los service workers:

* Es un [worker de JavaScript](//www.html5rocks.com/en/tutorials/workers/basics/){: .external },
  así que puede acceder al DOM directamente. Como alternativa, un service worker puede 
  comunicarse con las páginas que controla porque responde a mensajes enviados a través 
 de la interfaz de [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage); estas 
  páginas pueden manipular el DOM si es necesario.
* Un service worker es un proxy de red programable. Esto te permite controlar la manera en que 
 se llevan adelante las solicitudes de red de tu página.
* Se rescinde cuando no está en uso y se reinicia cuando se lo necesita, 
  así que no puedes confiar en el estado global de los controladores `onfetch` y 
  `onmessage` de un service worker. Si hay información que debes guardar y 
 reutilizar entre un reinicio y otro, los service workers no tendrán acceso a la 
 [API de IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
* Los service workers hacen gran uso de las promesas, así que, si no las conoces bien, 
  deberías dejar de leer esto y revisar 
  [Promesas, introducción](/web/fundamentals/getting-started/primers/promises).

## El ciclo de vida del service worker

Un service worker tiene un ciclo de vida completamente separado de tu página web.

Si quieres instalar un service worker para tu sitio, debes registrarlo. Esto se realiza
en el lenguaje JavaScript de tu página. Cuando registres un service worker, el navegador
iniciará la etapa de instalación del proceso en segundo plano.

Por lo general, durante la etapa de instalación, te convendrá almacenar en caché algunos elementos estáticos. Si
todos los archivos se almacenan correctamente en caché, se instalará el proceso de trabajo de
servicio. Si no se puede descargar o almacenar en caché alguno de los archivos, la etapa de instalación
fallará y el proceso no se activará (es decir, no se instalará). Si
esto ocurre, no te preocupes; se realizará un nuevo intento la próxima vez. Sin embargo, esto significa que si la instalación tiene
éxito podrás estar seguro de que dichos elementos estáticos estarán en la caché.

Luego de la instalación, comenzará el paso de activación. Es una excelente
oportunidad para administrar los cachés anteriores. Trataremos este asunto durante
la sección sobre la actualización de los service workers.

Luego de la etapa de activación, el service worker controlará todas las páginas que estén a
su alcance. Sin embargo, no se controlará la página que registró por primera
vez el service worker hasta que se vuelva a cargar. Una vez que un service worker tiene
el control, estará en uno de dos estados: el service worker se
rescindirá para ahorrar memoria o controlará eventos de mensaje y extracción que
ocurran cuando se emita un mensaje o solicitud de red desde tu página.

A continuación, se muestra una versión muy simplificada del ciclo de vida del service worker cuando se
instala por primera vez.

![ciclo de vida del service worker](imgs/sw-lifecycle.png)


## Requisitos previos

### Compatibilidad con navegadores

Cada vez hay más opciones de navegadores. Los service workers son compatible con Firefox y
Opera. Microsoft Edge está 
[recibiendo apoyo públicamente](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/serviceworker/).
Incluso Safari ha demostrado [interés en desarrollos futuros](https://trac.webkit.org/wiki/FiveYearPlanFall2015).
Puedes seguir el progreso de todos los navegadores en el sitio 
[está listo el Serviceworker](https://jakearchibald.github.io/isserviceworkerready/){: .external } 
de Jake Archibald.

### Se necesita HTTPS

Durante el desarrollo, podrás usar el service worker a través de `localhost`, pero
para implementarlo en un sitio deberás configurar HTTPS en tu servidor.

Con los service workers puedes tomar el control de una conexión, y crear y filtrar
respuestas. Herramientas poderosas. Si bien es muy probable que uses este poder con buenos propósitos, es
posible que un intermediario no lo haga. Para evitar esto, solo puedes registrar procesos
de trabajo de servicio en páginas que se proporcionen a través de HTTPS, De esta forma, nos aseguramos de que el service worker que recibe
el navegador no se ha manipulado durante su recorrido por la red.

[Las páginas de Github](https://pages.github.com/){: .external } se brindan a través de HTTPS, así que son un
excelente lugar para alojar demostraciones.

Si deseas agregar HTTPS a tu servidor, deberás conseguir un certificado 
TLS y configurarlo para el servidor. Esto varía según tu configuración; 
consulta la documentación de tu servidor y no olvides visitar el 
[generador de configuraciones SSL de Mozilla](https://mozilla.github.io/server-side-tls/ssl-config-generator/) 
para conocer las prácticas recomendadas.

## Registra un service worker

Para instalar un service worker, debes
**registrarlo** en tu página para iniciar el proceso. De esta forma, se comunica al navegador dónde
reside el archivo JavaScript de tu service worker.

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }

Este código verifica si la API del service worker está disponible. Si está disponible,
se registra el service worker de `/sw.js`
[una vez que se carga la página](/web/fundamentals/instant-and-offline/service-worker/registration).

Puedes llamar a `register()` sin ningún problema cada vez que se cargue una página. El navegador
determinará si el service worker está registrado o no, y actuará
según corresponda.

Un detalle que hay que tener en cuenta del método `register()` es la ubicación del archivo del proceso de trabajo de
servicio. En este caso, observarás que el archivo del service worker se encuentra en la raíz del
dominio. Esto significa que el alcance de este proceso será el origen
completo. En otras palabras, el service worker recibirá eventos `fetch` para
todos los elementos de este dominio. Si registramos el archivo del service worker en
`/example/sw.js`, el service worker solo identificará eventos `fetch` de páginas
cuyas URL comiencen con `/example/` (es decir, `/example/page1/`, `/example/page2/`).

Ahora podrás ver si un service worker está habilitado visitando `chrome://inspect
/#service-workers` y buscando tu sitio.

![Inspeccionar service workers](imgs/sw-chrome-inspect.png)

Cuando se implementó el service worker por primera vez, también se podía ver la información de un proceso
de trabajo de servicio a través de `chrome://serviceworker-internals`. Esto puede continuar resultando
útil si solo deseas conocer el ciclo de vida de los procesos
de trabajo de servicio, pero no debe sorprenderte si
`chrome://inspect/#service-workers` lo reemplaza por completo más adelante.

Probablemente te resulte útil probar tu service worker en una ventana de incógnito, de modo que
puedas cerrarla y volver a abrirla sabiendo que el service worker anterior
no tendrá efecto en la nueva ventana. Cualquier registro y caché creados en una
ventana de incógnito se borrarán tras cerrar la ventana.


## Instala un service worker

Cuando en una página controlada se inicie el proceso de registro, pasaremos a la
perspectiva de la secuencia de comandos del service worker que se encarga del evento `install`.

Como parte del ejemplo más básico, debes definir un callback para el evento de instalación
y definir los archivos que deseas almacenar en caché.

    self.addEventListener('install', function(event) {
      // Perform install steps
    });


En nuestro callback `install`, debemos realizar los siguientes pasos:

1. Abrir un caché.
2. Almacenar nuestros archivos en caché.
3. Confirmar si todos los elementos requeridos se almacenan en caché o no.

<div style="clear:both;"></div>

    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
      '/',
      '/styles/main.css',
      '/script/main.js'
    ];

    self.addEventListener('install', function(event) {
      // Perform install steps
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
    });


Aquí podrás ver que se llama a `caches.open()` con el nombre de caché deseado; después
se llama a `cache.addAll()` y se pasa el arreglo de archivos. Esta es una cadena de
promesas (`caches.open()` y `cache.addAll()`). El método `event.waitUntil()` toma
una promesa, y la usa para saber cuánto demora la instalación y si
se realizó correctamente.

Si todos los archivos se almacenan correctamente en caché, se instalará el proceso de trabajo de
servicio. Si **alguno** de los archivos no se descarga correctamente, fallará el proceso de
instalación. De esta forma, te aseguras de tener todos los elementos que hayas definido. Sin embargo,
también debes tener cuidado con la lista de archivos que desees almacenar en caché durante el
paso de instalación. Si defines una lista larga de archivos, habrá más posibilidad
de que uno de ellos no se almacene correctamente en caché y de que falle la instalación del proceso de trabajo de
servicio.

Este es solo un ejemplo; puedes realizar otras tareas en el evento `install` o
directamente puedes establecer un receptor de eventos `install`.

## Solicitudes de devolución y caché

Ahora que has instalado un service worker, probablemente desees 
  mostrar una de tus respuestas almacenadas en caché, ¿no es así?

Cuando se instale un service worker, y el usuario se dirige a una página diferente
o la actualiza, este proceso comenzará a recibir eventos `fetch` (a continuación, se muestra un
ejemplo).

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    });


Aquí hemos definido nuestro evento `fetch` y en `event.respondWith()`, pasamos
una promesa de `caches.match()`. Este método examina la solicitud y
encuentra cualquier resultado almacenado en caché de cualquiera de los caché creados por tu service worker.

Si existe una respuesta, se devuelve el valor almacenado en caché. Si no existe, se devuelve
el resultado de una llamada a `fetch`, que realizará una solicitud de red y devolverá
los datos si se puede recuperar algo de la red. Este es un ejemplo simple
y en él se usa cualquier recurso que hayamos almacenado en caché durante la instalación.

Si deseamos almacenar en caché solicitudes nuevas de forma acumulativa, podemos hacerlo administrando la
respuesta de la solicitud de fetch y luego agregándola al caché, como se muestra a continuación.


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
              function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                var responseToCache = response.clone();

                caches.open(CACHE_NAME)
                  .then(function(cache) {
                    cache.put(event.request, responseToCache);
                  });

                return response;
              }
            );
          })
        );
    });


Esto es lo que estamos haciendo:

1. Agregamos un callback a `.then()` en la solicitud de `fetch`.
2. Cuando obtenemos una respuesta, realizamos las siguientes verificaciones:

   1. Nos aseguramos de que la respuesta sea válida.
   2. Verificamos que el estado sea `200` en la respuesta.
   3. Nos aseguramos de que el tipo de respuesta sea **basic**; esto indica que es una 
     solicitud de nuestro origen. Esto significa que las solicitudes a elementos de terceros 
      tampoco están almacenadas en caché.
3. Si aprobamos las verificaciones, [clonamos](https://fetch.spec.whatwg.org/#dom-response-clone) 
 la respuesta. El motivo de esto es que la respuesta es una 
   [Stream](https://streams.spec.whatwg.org/){: .external }, el cuerpo solo se puede consumir 
   una vez. Debido a que buscamos devolver la respuesta para que el navegador la use, además de 
   pasarla al caché para su aplicación, debemos clonarla a fin de enviar una 
   al navegador y otra al caché.

## Actualiza un service worker {: #update-a-service-worker }

Habrá un momento del tiempo en que tu service worker 
necesitará actualización. Cuando llegue, deberás seguir estos pasos:

1. Actualiza el archivo JavaScript de tu service worker. Cuando un usuario navega por
 tu sitio, el navegador intenta descargar de nuevo el archivo de la secuencia de comandos que definió
 el service worker en segundo plano. Si existe aunque sea un byte de diferencia entre 
 el archivo del service worker y el archivo actual, se considera 
 como _nuevo_.
2. Se iniciará tu nuevo service worker y se activará el evento `install`.
3. En este punto, el service worker anterior seguirá controlando las páginas actuales; 
 el nuevo service worker entrará en un estado `waiting`.
4. Cuando se cierren las ventanas abiertas de tu sitio, finalizará el proceso de trabajo de 
   servicio anterior y el nuevo proceso tomará el control.
5. Cuando esto ocurra, se activará el evento `activate`. 


Una tarea común que tendrá lugar en el callback de `activate` es la administración del caché.
Te convendrá hacer esto durante el callback de `activate`, ya que si tu
intención es borrar cachés viejos durante el paso de instalación, los service workers anteriores,
que controlan las páginas actuales, repentinamente no podrán obtener
archivos del caché en cuestión.

Supongamos que tenemos un caché llamado `'my-site-cache-v1'` descubrimos que
deseamos dividirlo en un caché para páginas y un caché para entradas de blog.
Esto significa que, en la etapa de instalación, crearemos dos cachés: `'pages-cache-v1'` y
`'blog-posts-cache-v1'`. En el paso de activación, borraremos nuestro
`'my-site-cache-v1'` anterior.

El siguiente código haría esto generando un ciclo por todas las cachés del 
service worker y eliminando cualquier caché que no está definida en la lista blanca
de la caché.


    self.addEventListener('activate', function(event) {

      var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });

## Asperezas y trampas

Todo esto es muy nuevo. A continuación, se describe una colección de problemas que 
ocasionan molestias. Esperamos poder borrar esta sección pronto. Por ahora, sin embargo, 
vale la pena tener en cuenta esta información.


### Si la instalación falla, no somos muy buenos para contártelo

Si un proceso de trabajo se registra, pero no aparece en `chrome://inspect/#service-workers` 
o `chrome://serviceworker-internals`, es muy probable que no se haya
instalado debido a un error o a que se pasó una promesa rechazada a
`event.waitUntil()`.

Para trabajar en esto, visita `chrome://serviceworker-internals` y revisa "Abrir
la ventana DevTools y pausa la ejecución de JavaScript en el inicio de service worker para
la depuración", y coloca una indicación de depuración al principio de tu evento de instalación.
Esto, junto con <a href="/web/tools/chrome-devtools/javascript/add-breakpoints#exceptions">Pausar las excepciones no detectadas</a>,
debería revelar el problema.


### Los predeterminados de la extracción()

#### No hay credenciales predeterminadas

Cuando usas `fetch` en la configuración predeterminada, las solicitudes no tendrán credenciales como las 
cookies. Si deseas credenciales, como alternativa llama a lo siguiente:

    fetch(url, {
      credentials: 'include'
    })


Este comportamiento es intencional, y se podría decir que es mejor que el método predeterminada, más
complejo, de XHR: enviar credenciales si la URL tiene el mismo origen y omitirlas si
sucede lo contrario. El comportamiento de las extracciones se parece al de otras solicitudes CORS, como `<img crossorigin>`,que nunca envía cookies, a menos que accedas con `<img crossorigin="use-credentials">`.



#### Lo no compatible con CORS falla de forma predeterminada

De manera predeterminada, obtener un recurso de una URL de terceros no será posible si esta no
admite CORS. Puedes agregar a la solicitud una opción `no-CORS` para superar este obstáculo.
Sin embargo, se producirá una respuesta “opaca”; esto significa que no podrás
saber si la respuesta tuvo éxito o no.

    cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
      return new Request(urlToPrefetch, { mode: 'no-cors' });
    })).then(function() {
      console.log('All resources have been fetched and cached.');
    });


### Manejo de imágenes receptivas

El atributo `srcset` o el elemento `<picture>` seleccionará el recurso de imagen más
apropiado durante el tiempo de ejecución y realizará una solicitud de red.

Para un service worker, si deseas almacenar en caché una imagen durante el proceso de instalación,
tienes varias opciones:

1. instalar todas las imágenes que el elemento `<picture>` y el 
 atributo `srcset` soliciten;
2. instalar una versión de la imagen en baja resolución;
3. instalar una versión de la imagen en alta resolución.

En la práctica, deberías elegir la opción 2 o 3, ya que descargar todas las
imágenes sería una pérdida de espacio de almacenamiento.

Supongamos que eliges la versión de baja resolución durante la instalación y deseas tratar de
recuperar las imágenes de mayor resolución desde la red cuando se cargue la página. No obstante, si fallan las imágenes de alta resolución,
retoma la versión de baja resolución. Esto es perfectamente
posible, pero hay un inconveniente.

Supongamos que tenemos estas dos imágenes:

| Densidad de la pantalla | Ancho | Alto |
| -------------- | ----- | ------ |
| 1x             | 400   | 400    |
| 2x             | 800   | 800    |

En una imagen `srcset`, tendríamos un lenguaje de marcado como este:


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x" />


Si ves en una pantalla 2x, el navegador descargará `image-2x.png`,
si estamos sin conexión podrías `.catch()` esta solicitud y devolver `image-src.png`
si se almacena en caché, sin embargo, el navegador esperará una imagen que tenga
en cuenta los píxeles adicionales en una pantalla 2x, así que, la imagen aparecerá como
200x200 píxeles CSS en lugar de 400x400 píxeles CSS. La única forma de solucionar esto es
establecer en la imagen una altura y un ancho fijos.


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x"
     style="width:400px; height: 400px;" />


En los elementos `<picture>` empleados para dirección artística, esto resulta mucho
más difícil y dependerá en gran medida de cómo se creen y usen las imágenes,
pero es posible usar un método parecido a srcset.

## Más información

En 
[jakearchibald.github.io/isserviceworkerready/resources.html](https://jakearchibald.github.io/isserviceworkerready/resources.html)
, encontrarás una lista de documentación sobre los service workers que probablemente te resulte útil.

## Obtener ayuda

Si tienes algún problema, publica tus preguntas en Stackoverflow y usa la etiqueta 
'[service-worker](http://stackoverflow.com/questions/tagged/service-worker)' 
para que podamos realizar el seguimiento de los problemas y tratar de brindarte la mejor ayuda posible.


{# wf_devsite_translation #}
