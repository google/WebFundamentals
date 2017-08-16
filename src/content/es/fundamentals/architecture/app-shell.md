project_path: /web/_project.yaml 
book_path: /web/fundamentals/_book.yaml
description: La arquitectura de shell de la app mantiene tu IU local y carga contenido dinámicamente sin sacrificar las vínculos y la visibilidad de la Web. 

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-27 #}

# El modelo de "shell de app" {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

Una arquitectura de **shell de aplicación** (o shell de app) es una forma de crear una
Progressive Web App que se carga al instante y de manera confiable en la pantalla de tu usuario,
en forma similar a lo que ves en las apps nativas.

La "shell" de app es la mínima cantidad de HTML, CSS y JavaScript requeridos para activar la
interfaz de usuario, y cuando se almacena en caché sin conexión puede asegurar un **rendimiento instantáneo y
de alta confiabilidad** para los usuarios en las visitas repetidas. De esta manera, la shell de la app
no se carga desde la red en cada visita del usuario. Solo se carga el contenido
necesario de la red.

Para [apps de
una sola página](https://en.wikipedia.org/wiki/Single-page_application) con
arquitecturas con mucho código JavaScript, una shell de app es un enfoque acertado. Este
enfoque se basa en almacenar la shell agresivamente en caché (utilizando un [service
worker](/web/fundamentals/primers/service-worker/) para lograr que la app
funcione. Luego, el contenido dinámico carga cada página a través de JavaScript. Una shell
de app es útil para enviar el HTML inicial a la pantalla en forma rápida y sin utilizar una
red.

<img src="images/appshell.png" alt="Arquitectura de la shell de app" />

En otras palabras, la shell de app es similar al paquete de código que
publicarías en una tienda de apps al compilar una app nativa. Es el esqueleto de tu
IU y contiene los componentes principales necesarios para poner en marcha tu app, pero probablemente
no contenga los datos.

Note: Prueba el laboratorio de código de la [Primera app
web progresiva](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0)
para saber cómo diseñar y cómo
implementar tu primera shell de app para una app sobre el clima. El video [Carga
automática con el modelo de shell de app](https://www.youtube.com/watch?v=QhUzmR8eZAo)
también recorre este patrón.

### Cuándo utilizar el modelo de shell de app

Compilar una PWA no significa comenzar desde el principio. Si estás creando una app moderna
de una sola página, probablemente estés usando algo similar a una shell de app
, ya sea que lo llames así o no. Los detalles pueden variar sutilmente, según qué
bibliotecas o marcos de trabajo estés usando, pero el concepto en sí mismo es
independiente del framework.

Una arquitectura de shell de app es realmente útil para las apps y los sitios con
navegación relativamente sin cambios pero con contenido cambiante. Cierto número de bibliotecas y marcos JavaScript
modernos ya promueven la división de la lógica de
tu app de su contenido, ya que de esta manera la arquitectura se aplica más directamente.
Para cierto tipo de sitios web que solo tienen contenido estático, también
puedes seguir el mismo modelo, pero el sitio es 100 % shell de app.

Para ver cómo Google creó una arquitectura de shell de app, consulta
[Compilación de la Progressive Web App de Google I/O 2016](/web/showcase/2016/iowa2016).
Esta app del mundo real comenzó con una SPA para crear una PWA que almacena el contenido en caché previamente
utilizando un service worker, carga las páginas nuevas dinámicamente, alterna correctamente
entre vistas y reutiliza el contenido después de la primera carga.


### Beneficios {: #app-shell-benefits }

Algunos de los beneficios de una arquitectura de shell de app con un service worker:

* **Rendimiento confiable y rápido en todo momento**. Las visitas repetidas son
extremadamente rápidas.  Los recursos estáticos y la IU (p. ej. HTML, JavaScript, imágenes
y CSS) se almacenan en caché en la primera visita, y luego se cargan instantáneamente en
las visitas repetidas. El contenido se puede almacenar en caché en la primera visita, pero generalmente
se carga cuando se necesita.

* **Interacciones similares a las apps nativas**. Al adoptar un modelo de shell de app, puedes
crear experiencias con navegación e interacciones similares a las
apps nativas, completas con soporte sin conexión.

* **Uso económico de datos**. Diseña para hacer un uso de datos mínimo y se criterioso en
lo que almacenas en caché, ya que guardar archivos que no son esenciales (imágenes grandes que
no se muestran en todas las páginas, por ejemplo) provocará que los navegadores descarguen más
datos de lo estrictamente necesario. Aunque los datos son relativamente económicos en los países
occidentales, no es el caso de los mercados emergentes en donde la conectividad
y los datos son costosos.

## Requisitos {: #app-shell-requirements }

La app idealmente deberá:

* Cargarse rápidamente
* Usar la menor cantidad de datos posible
* Usar recursos estáticos de una caché local
* Separar contenido de la navegación
* Recuperar y mostrar contenido específico de la página (HTML, JSON, etc.)
* Opcionalmente, almacenar en caché contenido dinámico

La shell de app mantiene tu IU local y también incorpora contenido dinámicamente a través de una
API, pero no sacrifica los enlaces ni la visibilidad de la Web. La
siguiente vez que el usuario acceda a tu app, se mostrará la última versión automáticamente.
No es necesario descargar nuevas versiones antes de usarla.

Note: La extensión de auditoría [Lighthouse](https://github.com/googlechrome/lighthouse)
se puede utilizar para verificar si tu PWA que utiliza una shell de app ofrece un
rendimiento superior. [A Lighthouse](https://www.youtube.com/watch?v=LZjQ25NRV-E)
es una charla que explica cómo optimizar una PWA con esta herramienta.

## Cómo compilar tu shell de app {: #building-your-app-shell }

Estructura tu app para una distinción clara entre la shell de la página y el
contenido dinámico. En genera, tu app debe cargar la shell más simple posible
pero debe incluir contenido de página significativo con la descarga inicial. Determina
el balance correcto entre velocidad y actualización de datos para cada fuente
de datos.

<figure>
  <img src="images/wikipedia.jpg"
    alt="App de Wikipedia sin conexión con utilización de una shell de app con almacenamiento en caché de contenido">
  <figcaption>La app de Wikipedia sin conexión <a href="https://wiki-offline.jakearchibald.com/wiki/Rick_and_Morty">de Jake Archibald</a> es un buen ejemplo de una PWA que utiliza un modelo de shell de app. Se carga instantáneamente en las visitas repetidas, pero obtiene contenido dinámicamente con el uso de JS. Este contenido luego se almacena en caché sin conexión para futuras visitas.
</figcaption>
</figure>

### Ejemplo HTML para una shell de app {: #example-html-for-appshell }

Este ejemplo separa la infraestructura central de la app y la IU de los datos.
Es importante mantener la carga inicial lo más simple posible para que muestre solo
el diseño de la página apenas se abra la app web. Parte del diseño proviene del archivo index de tu
app (DOM en línea, estilos) y el resto se carga desde
secuencias de comandos y hojas de estilo externas.

Toda la IU y la infraestructura se almacena en caché localmente mediante un service worker, de manera que
en cargas subsiguientes, solo se obtienen los datos nuevos o modificados, en lugar de
tener que cargar todo.

El archivo `index.html` de tu directorio de trabajo debe tener una apariencia similar al
siguiente código. Esta es un subconjunto de contenidos reales y no es un
archivo index completo. Observemos lo que contiene.

* HTML y CSS para el "esqueleto" de tu interfaz de usuario completa con navegación
 y marcadores de posición de contenido.
* Un archivo JavaScript externo (app.js) para manejar la navegación y lógica de IU,
 así como el código para mostrar las publicaciones obtenidas del servidor y almacenarlas
 localmente a través de un mecanismo de almacenamiento como IndexedDB.
* Un manifiesto de app web y un cargador de service worker para habilitar funcionalidades sin conexión.

<div class="clearfix"></div>

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>App Shell</title>
      <link rel="manifest" href="/manifest.json">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App Shell</title>
      <link rel="stylesheet" type="text/css" href="styles/inline.css">
    </head>

    <body>
      <header class="header">
        <h1 class="header__title">Shell de app</h1>
      </header>
      
      <nav class="nav">
      ...
      </nav>
      
      <main class="main">
      ...
      </main>

      <div class="dialog-container">
      ...
      </div>

      <div class="loader">
        <!-- Show a spinner or placeholders for content -->
      </div>

      <script src="app.js" async></script>
      <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      }
      </script>
    </body>
    </html>

<div class="clearfix"></div>


Note: Visita [https://app-shell.appspot.com/](https://app-shell.appspot.com/) para ver una PWA
simple y real que utiliza una shell de app y
representación de contenido del lado del servidor. Una shell de app se puede implementar por medio de cualquier biblioteca o
framework mencionado en nuestra charla sobre <a
href="https://www.youtube.com/watch?v=srdKq0DckXQ">Progresive Web Apps
en todos los marcos de trabajo.</a> Las muestras están disponibles mediante Polymer (<a
href="https://shop.polymer-project.org">Shop</a>) y React (<a
href="https://github.com/insin/react-hn">ReactHN</a>,
<a
href="https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo">iFixit</a>).
 

### Almacenamiento en caché de la shell de app {: #app-shell-caching }

Una shell de app se puede almacenar en caché a través de un service worker escrito manualmente o de un
service worker generado a través de una herramienta de almacenamiento previo en caché de recursos estáticos
[sw-precache](https://github.com/googlechrome/sw-precache).

Note: Los ejemplos se incluyen solo para fines de ilustración
y de información general. Los recursos reales utilizados probablemente serán diferentes para tu
app.

#### Almacenamiento en caché de la shell de app manualmente

A continuación se incluye un ejemplo de código de service worker que almacena en caché recursos estáticos desde la
shell de app en la [API de caché](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
 utilizando el evento `install` del service worker:

    var cacheName = 'shell-content';
    var filesToCache = [
      '/css/styles.css',
      '/js/scripts.js',
      '/images/logo.svg',

      '/offline.html’,

      '/’,
    ];

    self.addEventListener('install', function(e) {
      console.log('[ServiceWorker] Install');
      e.waitUntil(
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(filesToCache);
        })
      );
    });

#### Uso de sw-precache para almacenar en caché la shell de app

El service worker generado por sw-precache almacenará en caché y ofrecerá los recursos
que configuras como parte de tu proceso de compilación. Puedes hacer que almacene previamente en caché cada
archivo HTML, JavaScript y CSS que componga tu shell de app. Todo funcionará
sin conexión y se cargará rápido en las siguientes visitas, sin necesidad de esfuerzos adicionales.

Aquí incluimos un ejemplo básico de cómo usar sw-precache como parte de un proceso de compilación de
[gulp](http://gulpjs.com).

    gulp.task('generate-service-worker', function(callback) {
      var path = require('path');
      var swPrecache = require('sw-precache');
      var rootDir = 'app';

      swPrecache.write(path.join(rootDir, 'service-worker.js'), {
        staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
        stripPrefix: rootDir
      }, callback);
    });

Para obtener más información sobre el almacenamiento en caché de elementos estáticos, consulta el laboratorio de código [Cómo agregar un service worker con
sw-precache](https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0)
.

Note: sw-precache es útil para el almacenamiento en caché de tus recursos estáticos sin conexión. En cuanto a los recursos de
tiempo de ejecución/dinámicos, recomendamos usar nuestra biblioteca complementaria
[sw-toolbox](https://github.com/googlechrome/sw-toolbox).

## Conclusión {: #conclusion }

Un shell de app que usa un service worker es un patrón potente para el almacenamiento en caché sin conexión, pero
también ofrece beneficios importantes relacionados con el rendimiento gracias a la carga instantánea para
visitas repetidas a tu PWA. Puedes almacenar en caché tu shell de app para que funcione
sin conexión y complete su contenido mediante JavaScript.

En las visitas repetidas, se obtienen píxeles importantes en la pantalla sin
la red, aun si tu contenido eventualmente proviene de allí.



{# wf_devsite_translation #}
