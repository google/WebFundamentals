project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: En este codelab, crearás una Progressive Web App, que se carga rápidamente, incluso con redes débiles, tiene un ícono en la pantalla principal y se carga como experiencia de pantalla completa y de primer nivel.

{# wf_updated_on: 2017-01-05T16:32:36Z #}
{# wf_published_on: 2016-01-01 #}


# Tu primera Progressive Web App {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



## Introducción




Las [Progressive Web Apps](/web/progressive-web-apps) son experiencias que combinan lo mejor de la Web y lo mejor de las apps. Están disponibles para los usuarios a partir de la primera visita en una pestaña del navegador y no requieren instalación. A medida que el usuario compila progresivamente una relación con la app con el paso del tiempo, se hace más y más poderosa. Se carga rápidamente, incluso con redes débiles, envía notificaciones push relevantes, tiene un ícono en la pantalla principal y se carga como experiencia de pantalla completa y de primer nivel.

### ¿Qué es una Progressive Web App?

Una Progressive Web App es:

* __Progresiva__: funciona para todos los usuarios, sin importar la elección de navegador, porque está construida con mejora progresiva como principio central.
* __Adaptable__: se adapta a cualquier factor de formulario, sea escritorio, móvil, tablet o lo que venga en el futuro.
* __Independiente de la conectividad__: mejorada con service workers para trabajar sin conexión o con redes de mala calidad.
* __Estilo app__: al usuario le parece una app con interacciones y navegación estilo app, porque está construida con modelo de shell de app.
* __Fresca__: siempre actualizada gracias al proceso de actualización de service worker.
* __Segura__: emitida vía HTTPS para evitar intromisiones y para garantizar que el contenido no se haya manipulado.
* __Descubrible__: se puede identificar como "app" gracias al manifiesto W3C y al alcance de registro de service worker, lo que permite que los motores de búsqueda la encuentren.
* __Posibilidad de volver a interactuar__: facilita la posibilidad de volver a interactuar a través de funciones como notificaciones push.
* __Instalable__: les permite a los usuarios "conservar" las apps que les resultan más útiles en su pantalla principal sin la molestia de una tienda de app.
* __Vinculable__ : se puede compartir fácilmente vía URL, no requiere instalación compleja.

Este codelab te guiará para crear tu propia Progressive Web App, incluidas las consideraciones de diseño, como también la implementación de detalles para garantizar que tu app cumpla los principios claves de una Progressive Web App.

### ¿Qué crearemos?

En este codelab, crearás una app web de estado del tiempo usando técnicas de Progressive Web
App. Analicemos las propiedades de una Progressive Web App:

* **Progresiva**: usaremos una mejora progresiva en todo el proceso.
* **Adaptable**: nos aseguraremos de que se adapte a cualquier forma de formulario.
* Independiente de la **conectividad**: almacenaremos en caché el shell de app con service workers.
* **Similar a una app tradicional**: usaremos interacciones de tipo aplicación-estilo para agregar ciudades y actualizar los datos.
* **Actualizada**: almacenaremos en caché los datos más actualizados con service workers.
* **Segura**: implementaremos la app en un host que admita HTTPS.
* **Detectable e instalable**: incluiremos un manifiesto para que sea sencillo para los motores de búsqueda encontrar nuestra app.
* **Vinculable**: ¡es la web!

### Lo que aprenderás

* Cómo diseñar y construir una app usando el método “shell de app”
* Cómo hacer para que tu app funcione sin conexión
* Cómo almacenar datos para usarlos sin conexión posteriormente

### Qué necesitarás

* Chrome 52 o superior
*  [Servidor web para Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) o el servidor web de tu elección
* El ejemplo de código.
* Un editor de texto.
* Conocimiento básico de HTML, CSS, JavaScript y Chrome DevTools

Este codelab se enfoca en Progressive Web Apps. Los conceptos que no son relevantes y los bloques de código se pasan por alto y se te brindan para que solo copies y pegues.


## Preparación




### Descarga el código

Haz clic en el siguiente botón para descargar todo el código de este codelab:

[Vínculo](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

Descomprime el archivo zip descargado. Esto descomprimirá una carpeta raíz (`your-first-pwapp-master`), que contiene una carpeta para cada paso de este codelab, junto con todos los recursos que necesitarás.

Las carpetas `step-NN` contienen el estado final deseado de cada paso de este codelab. Están allí a modo de referencia. Haremos todo tu trabajo de codificación en un directorio llamado `work`.

### Instala y verifica el servidor web

A pesar de que puedes usar tu propio servidor web, este codelab está diseñado para funcionar bien con Web Server de Chrome. Si aún no tienes la app instalada, puedes instalarla desde Chrome Web Store.

[Vínculo](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

Después de instalar la app Web Server for Chrome, haz clic en el atajo Apps de la barra de marcadores: 

![9efdf0d1258b78e4.png](img/9efdf0d1258b78e4.png)

En la ventana resultante, haz clic en el ícono de Web Server: 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

A continuación, verás un diálogo que te permite configurar tu servidor web local:

![433870360ad308d4.png](img/433870360ad308d4.png)

Haz clic en el botón __choose folder__ y selecciona la carpeta `work`. Esto te permitirá exhibir tu trabajo en progreso a través de la URL destacada en el diálogo del servidor web (en la sección __Web Server URL(s)__).

En Options, marca el cuadro al lado de "Automatically show index.html", como se muestra a continuación:

![39b4e0371e9703e6.png](img/39b4e0371e9703e6.png)

Luego, detén y reinicia el servidor deslizando el activador denominado "Web Server: STARTED" hacia la izquierda y luego a la derecha.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

Ahora visita tu sitio de trabajo en tu propio navegador web (haciendo clic en la URL destacada de Web Server) y deberías ver una página como esta:

![aa64e93e8151b642.png](img/aa64e93e8151b642.png)

Por supuesto, esta app aún no está haciendo nada interesante. Hasta ahora, solo es un esqueleto mínimo con un control de número que usaremos para verificar la funcionalidad de tu servidor web. Agregaremos funcionalidad y funciones de IU en los siguientes pasos. 


## Adapta la arquitectura del shell de tu app




### ¿Qué es el shell de la app?

El shell de la app es el HTML, CSS y JavaScript mínimos necesarios para impulsar la interfaz de usuario de una app web progresiva y es uno de los componentes que garantiza un rendimiento bueno y confiable. Su primera carga debería ser muy rápida y almacenarse en caché inmediatamente. Que se "almacena en caché" significa que los archivos de shell se cargan una vez a través de la red y luego se guardan en el dispositivo local. Cada vez posterior en que el usuario abre la app, los archivos de shell se cargan en la caché local del dispositivo, lo que resulta en tiempos de inicio muy rápidos. 

La arquitectura de shell de app separa la infraestructura central de la aplicación y la IU de los datos. La IU y la infraestructura completas se almacenan localmente en la caché mediante un service worker, de modo que en las cargas posteriores la Progressive Web App solo deba recuperar los datos necesarios en lugar de cargar todo.

![156b5e3cc8373d55.png](img/156b5e3cc8373d55.png)

Dicho de otra manera, el shell de app es similar al paquete de código que publicarías en una tienda de apps al crear una aplicación nativa. Contiene los componentes principales necesarios para poner en marcha tu app, pero probablemente no contenga los datos.

### ¿Por qué usar la arquitectura de shell de app?

El uso de la arquitectura de shell de app te permite concentrarte en la velocidad y aporta a tu Progressive Web App propiedades similares a las que tienen las apps nativas (carga instantánea y actualizaciones periódicas), todo ello sin la necesidad de una tienda de apps.

### Diseña el shell de app 

El primer paso es dividir el diseño en los componentes centrales que lo integran.

Pregúntate lo siguiente:

* ¿Qué debe aparecer en pantalla de inmediato?
* ¿Qué otros componentes de la IU son claves para tu app?
* ¿Qué recursos de respaldo se requieren para el shell de la aplicación? Por ejemplo, imágenes, JavaScript, estilos, etc.

Crearemos una app meteorológica como nuestra primera Progressive Web App. Los componentes claves serán los siguientes:

* encabezado con título y botones de adición y actualización;
* contenedor para tarjetas de pronóstico;
* una plantilla para tarjetas de pronóstico;
* un cuadro de diálogo para agregar nuevas ciudades;
* un indicador de carga.

Al diseñar una app más compleja, el contenido que no sea necesario para la carga inicial se puede solicitar más adelante y luego almacenarse en caché para su uso posterior. Por ejemplo, podríamos diferir la carga del diálogo New City hasta después de que representemos la experiencia de la primera ejecución y contemos con algunos ciclos inactivos disponibles.


## Implementa el shell de tu app




Existen varias maneras de comenzar con cualquier proyecto, y generalmente recomendamos usar Web Starter Kit. Sin embargo, en este caso, para que tu proyecto sea lo más simple posible y para que puedas concentrarte en las Progressive Web Apps, te hemos ofrecido todos los recursos que necesitarás.

### Crea la HTML para el shell de app

Ahora, agregaremos los componentes centrales que discutimos en [Adapta la arquitectura del shell de la app](/web/fundamentals/getting-started/your-first-progressive-web-app/step-01).

Recuerda que los componentes claves consistirán en lo siguiente:

* encabezado con título y botones de adición y actualización;
* contenedor para tarjetas de pronóstico;
* una plantilla para tarjetas de pronóstico;
* un cuadro de diálogo para agregar nuevas ciudades;
* un indicador de carga.

El archivo `index.html` que ya se encuentra en tu directorio `work` debería parecerse a este (este es un subset de los contenidos reales, no copies este código en tu archivo):

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather PWA</title>
  <link rel="stylesheet" type="text/css" href="styles/inline.css">
</head>
<body>
  <header class="header">
    <h1 class="header__title">Weather PWA</h1>
    <button id="butRefresh" class="headerButton"></button>
    <button id="butAdd" class="headerButton"></button>
  </header>

  <main class="main">
    <div class="card cardTemplate weather-forecast" hidden>
    . . .
    </div>
  </main>

  <div class="dialog-container">
  . . .
  </div>

  <div class="loader">
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
    </svg>
  </div>

  <!-- Insert link to app.js here -->
</body>
</html>
```

Observa que el cargador es visible de manera predeterminada. Esto garantiza que el usuario vea el cargador de inmediato cuando se carga la página, lo cual le proporciona una indicación clara de que el contenido se está cargando.

Para ahorrar tiempo, también ya hemos creado la hoja de estilo para que uses.

### Revisa el código clave de JavaScript de la app

Ahora que tenemos gran parte de la IU lista, es hora de comenzar a conectar el código para que todo funcione. Al igual que con el resto del shell de app, debes conocer el código que necesitas como parte de la experiencia clave y lo que podrás cargar posteriormente.

El directorio de trabajo también ya incluye el código de la app (`scripts/app.js`) y en él encontrarás:

* un objeto `app` que contiene parte de la información clave necesaria para la app;
* los receptores de códigos para todos los botones del encabezado (`add/refresh`) y del diálogo para agregar la ciudad (`add/cancel`);
* un método para agregar o actualizar tarjetas de pronóstico (`app.updateForecastCard`);
* un método para obtener los últimos datos de pronóstico de estado del tiempo de la API de estado del tiempo pública de Firebase (`app.getForecast`);
* un método para iterar las tarjetas actuales y llamar a `app.getForecast` para obtener los últimos datos de pronóstico climático (`app.updateForecasts`);
* algunos datos falsos (`initialWeatherForecast`) que puedes usar para probar rápidamente la representación.

### Probar

Ahora que tienes el HTML, los estilo y JavaScript centrales, es hora de probar la app.

Para ver cómo se representan los datos de estado del tiempo falsos, elimina el comentario de la siguiente línea de la parte inferior de tu archivo `index.html`:

    <!--<script src="scripts/app.js" async></script>-->

A continuación, elimina el comentario de la siguiente línea de la parte inferior de tu archivo `app.js`:

    // app.updateForecastCard(initialWeatherForecast);

Vuelve a cargar tu app. El resultado debería ser una tarjeta de pronóstico climático de agradable formato (a pesar de ser falso, como verás por la fecha) con el control de número inhabilitado, así:

![166c3b4982e4a0ad.png](img/166c3b4982e4a0ad.png)

[Vínculo](https://weather-pwa-sample.firebaseapp.com/step-04/)

Una vez que la hayas probado y hayas verificado que funciona como esperabas, puedes quitar la llamada a `app.updateForecastCard` con los datos falsos nuevamente. Solo la necesitas para asegurarte de que todo funcione como esperabas.


## Comienza con una primera carga rápida




Las Progressive Web Apps deben iniciarse rápidamente y deben poder usarse de inmediato. En su estado actual, nuestra app de estado del tiempo se inicia rápidamente, pero no puede usarse. No hay datos. Podríamos enviar una solicitud AJAX para obtener esos datos, pero eso generaría otra solicitud y demoraría la carga inicial. Como alternativa, proporciona datos reales en la primera carga.

### Inyecta los datos del pronóstico del tiempo

Para este code lab, simularemos que el servidor introduce el pronóstico de estado del tiempo directamente en el JavaScript, pero, en una app de producción, el servidor introduciría los últimos datos de pronóstico de estado del tiempo según la geolocalización de la dirección IP del usuario.

El código ya contiene los datos que introduciremos. Es el `initialWeatherForecast` que usamos en el paso anterior.

### Diferenciación de la primera ejecución

¿Cómo determinar el momento en que se debe mostrar esa información, que puede no ser relevante en cargas futuras, cuando se obtenga la app del estado del tiempo del caché? Cuando el usuario cargue la app en visitas posteriores, es posible que la ciudad cambie. Por ello, debemos cargar la información para la ciudad implicada, y no necesariamente para la primera ciudad que este buscó.

Las preferencias del usuario, como la lista de ciudades a las que el usuario se ha suscrito, se deberían almacenar a nivel local usando IndexedDB u otro mecanismo de almacenamiento rápido. Para simplificar este code lab lo más posible, hemos usado  [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), que no es ideal para apps de producción porque es un mecanismo de bloqueo y almacenamiento sincrónico que puede ser muy lento en algunos dispositivos.

En primer lugar, agreguemos el código necesario para guardar las preferencias de usuario. Encuentra el siguiente comentario TODO en tu código.

```
  // TODO add saveSelectedCities function here
```

Y agrega el siguiente código debajo del comentario.

```
  // Save list of cities to localStorage.
  app.saveSelectedCities = function() {
    var selectedCities = JSON.stringify(app.selectedCities);
    localStorage.selectedCities = selectedCities;
  };
```

A continuación, agreguemos el código de inicio para revisar si el usuario tiene ciudades guardadas y mostrarlas, o usar los datos introducidos. Encuentra el siguiente comentario:

```
  // TODO add startup code here
```

Y agrega el siguiente código debajo de este comentario:

```
/************************************************************************
   *
   * Código necesario para iniciar la app
   *
   * NOTA: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  app.selectedCities = localStorage.selectedCities;
  if (app.selectedCities) {
    app.selectedCities = JSON.parse(app.selectedCities);
    app.selectedCities.forEach(function(city) {
      app.getForecast(city.key, city.label);
    });
  } else {
    /* The user is using the app for the first time, or the user has not
     * saved any cities, so show the user some fake data. A real app in this
     * scenario could guess the user's location via IP lookup and then inject
     * that data into the page.
     */
    app.updateForecastCard(initialWeatherForecast);
    app.selectedCities = [
      {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
    ];
    app.saveSelectedCities();
  }
```

El código de inicio revisa si hay ciudades guardadas en el almacenamiento local. Si la hay, analiza los datos de almacenamiento local y muestra una tarjeta de pronóstico climático de cada una de las ciudades guardadas. Si no, el código de inicio usa los datos falsos de pronóstico climático y los guarda como ciudad predeterminada.

### Guarda las ciudades seleccionadas

Finalmente, tienes que modificar el controlador del botón "add city" para guardar la ciudad seleccionada en el almacenamiento local.

Actualiza tu controlador de clic de `butAddCity` para que coincida con el siguiente código:

```
document.getElementById('butAddCity').addEventListener('click', function() {
    // Add the newly selected city
    var select = document.getElementById('selectCityToAdd');
    var selected = select.options[select.selectedIndex];
    var key = selected.value;
    var label = selected.textContent;
    if (!app.selectedCities) {
      app.selectedCities = [];
    }
    app.getForecast(key, label);
    app.selectedCities.push({key: key, label: label});
    app.saveSelectedCities();
    app.toggleAddDialog(false);
  });
```

Los nuevos agregados son la inicialización de `app.selectedCities` si no existe y las llamadas a `app.selectedCities.push()` y `app.saveSelectedCities()`.

### Probar

* Cuando se ejecuta por primera vez, tu app debería mostrarle al usuario inmediatamente el pronóstico climático de `initialWeatherForecast`.
* Agrega una ciudad nueva (haciendo clic en el ícono + en la esquina superior derecha) y verifica que se muestren dos tarjetas.
* Actualiza el navegador y verifica que la app cargue ambos pronósticos climáticos y muestre la última información.

[Vínculo](https://weather-pwa-sample.firebaseapp.com/step-05/)


## Usa service workers para almacenar en caché por adelantado el shell de la app




Las Progressive Web Apps tienen que ser rápidas y posibles de instalar, lo que significa que funcionan en línea, sin conexión y en conexiones lentas e intermitentes. Para lograr esto, tenemos que almacenar en caché el shell de nuestra app usando service worker, para que siempre esté disponible rápidamente y en forma confiable.

Si no conoces los service workers, puedes adquirir conocimientos básicos leyendo  [Introducción a Service Workers](/web/fundamentals/primers/service-worker/) sobre qué hacen, cómo funciona su ciclo de vida y más. Una vez que hayas completado este code lab, asegúrate de revisar el [code lab Depuración de Service Workers](https://goo.gl/jhXCBy) para conocer más cómo trabajar con service workers.

Las funciones que se proporcionan mediante los procesos de trabajo deben considerarse como una mejora progresiva, y solo deben agregarse si son compatibles con el navegador. Por ejemplo, con los procesos de trabajo puedes almacenar en caché el shell de la app y datos para tu app, de modo que estén disponibles aun cuando no suceda lo mismo con la red. Cuando no se admitan procesos de trabajo, no se llamará al código sin conexión y el usuario obtendrá una experiencia básica. El uso de la detección de funciones para proporcionar una mejora progresiva tiene poca sobrecarga y no fallará en navegadores más antiguos que no admitan esa función.

### Registra el service worker si está disponible

El primer paso para lograr que la app funcione sin conexión es registrar un proceso de trabajo; una secuencia de comandos que permite el uso en segundo plano sin necesidad de abrir una página web o de que exista interacción por parte del usuario.

Esto requiere dos pasos sencillos:

1. Dile al navegador que registre el archivo de JavaScript como service worker.
2. Crea un archivo de JavaScript que contenga el service worker.

Primero, tenemos que revisar si el navegador es compatible con service workers y, si lo es, registrar el service worker. Agrega el siguiente código a `app.js` (después del comentario `// TODO add service worker code here`):

```
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
```

### Almacena en caché los recursos del sitio

Cuando se registra el service worker y el evento de instalación se activa por primera vez, el usuario visita la página. En este controlador de eventos, almacenaremos en caché todos los recursos necesarios para la aplicación.

Cuando se activa el service worker, debe abrir los objetos  [cachés](https://developer.mozilla.org/en-US/docs/Web/API/Cache) y mostrarlos con los recursos necesarios para cargar el shell de la app. Crea un archivo llamado `service-worker.js` en tu carpeta de raíz de app (que debería ser el directorio `your-first-pwapp-master/work`). El archivo tiene que vivir en la raíz de la app porque el directorio en el que reside el archivo define el alcance de los service workers. Agrega este código en tu nuevo archivo `service-worker.js`:

```
var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
```

En primer lugar, debemos abrir la caché con `caches.open()` y proporcionar un nombre de caché. Proporcionar un nombre de caché nos permite versionar archivos o separar datos del shell de la app de modo que podamos actualizar uno con facilidad sin afectar al otro.

Una vez que se abre la caché, podremos llamar a `cache.addAll()`, que toma una lista de URL, luego las obtiene del servidor y agrega la respuesta al caché. Lamentablemente, `cache.addAll()` es atómico; si alguno de los archivos falla, todo el paso de caché falla.

Comencemos a conocer cómo usar DevTools para comprender y depurar los service workers. Antes de volver a cargar tu página, abre DevTools, dirígete al subpanel __Service Worker__ del panel __Application__. Debería tener la siguiente apariencia:

![ed4633f91ec1389f.png](img/ed4633f91ec1389f.png)

Cuando veas una página en blanco como esta, significa que la página que está abierta no tiene service workers registrados.

Ahora, actualiza la página. El subpanel de Service Worker ahora debería lucir así.

![bf15c2f18d7f945c.png](img/bf15c2f18d7f945c.png)

Cuando veas información como esta, significa que la página tiene un service worker en ejecución.

Ahora vamos a tomar un desvío y mostraremos una trampa que puedes encontrar a la hora de desarrollar service workers. Para mostrarlo, agreguemos un receptor de eventos `activate` debajo del receptor de eventos `install` en tu archivo `service-worker.js`. 

```
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});
```

El evento `activate` se activa cuando se inicia el service worker.

Abre la Console de DevTools y vuelve a cargar la página, pasa al subpanel de Service Worker en el panel Application y haz clic para inspeccionar el service worker activado. Esperas ver el mensaje `[ServiceWorker] Activate` registrado en la consola, pero no sucedió. Observa el subpanel de Service Worker y verás que el nuevo service worker (que incluye el receptor de eventos activar) parece estar en estado de "espera".

![1f454b6807700695.png](img/1f454b6807700695.png)

Básicamente, el antiguo service worker sigue controlando la página, siempre y cuando haya una pestaña abierta en la página. Así que,  *podrías * cerrar y volver a abrir la página o presionar el botón __skipWaiting__, pero una solución a más largo plazo es habilitar la casilla de verificación __Update on Reload__ en el subpanel de Service Worker de DevTools. Cuando esta casilla de verificación está marcada, el service worker se actualiza forzosamente cada vez que se vuelve a cargar la página.

Marca la casilla de verificación __update on reload__ ahora y vuelve a cargar la página para confirmar que se active el nuevo service worker.

__Nota:__ puedes ver un error en el subpanel de Service Worker del panel Application similar al siguiente, es __seguro__ ignorar este error.

![b1728ef310c444f5.png](img/b1728ef310c444f5.png)

Eso es todo por ahora en cuanto a inspección y depuración de service workers en DevTools. Más adelante te mostraremos más trucos. Volvamos a la compilación de tu app.

Ampliemos la información sobre el receptor de eventos `activate` e incluyamos algo de lógica para actualizar la caché. Actualiza tu código para que coincida con el siguiente código.

```
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
```

Este código garantiza que tu service worker actualice su caché cada vez que cambie cualquiera de los archivos del shell de la app. Para que esto funcione, tendrías que incrementar la variable `cacheName` de la parte superior de tu archivo de service worker.

La última instrucción corrige un caso de esquina sobre el que puedes leer en el siguiente cuadro de información (opcional).

Por último, actualizaremos la lista de archivos necesarios para el shell de la app. En la matriz, debemos incluir todos los archivos que necesita nuestra app, como imágenes, JavaScript, hojas de estilo, etc. Cerca de la parte superior de tu archivo `service-worker.js`, reemplaza `var filesToCache = [];` con el siguiente código:

```
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];
```

Todavía nuestra app no funciona sin conexión. Hemos almacenado en caché los componentes del shell de la app, pero tenemos que cargarlos desde la caché local.

### Obtén el shell de la app desde la caché

Los procesos de trabajo ofrecen la capacidad de interceptar solicitudes realizadas desde nuestra Progressive Web App y controlarlas desde el service worker. Esto significa que podemos determinar la manera en que deseamos controlar la solicitud y, posiblemente, ofrecer nuestra propia respuesta almacenada en caché.

Por ejemplo:

```
self.addEventListener('fetch', function(event) {
  // Do something interesting with the fetch here
});
```

A continuación, obtendremos el shell de la app desde la caché. Agrega el siguiente código al final de tu archivo `service-worker.js`:

```
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
```

Desde adentro hacia afuera, `caches.match()` evalúa la solicitud web que activó el evento  [extracción](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) y revisa si está disponible en la caché. Luego, este responde con la versión almacenada en caché o usa `fetch` para obtener una copia desde la red. La `response` se devuelve a la página web con `e.respondWith()`.

### Probar

¡Ahora tu app puede funcionar sin conexión! Probémoslo.

Vuelve a cargar tu página y dirígete al subpanel __Cache Storage__ del panel __Application__ de DevTools. Expande la sección y deberías ver el nombre de la caché del shell de tu app enumerado a la izquierda. Cuando haces clic en la caché del shell de tu app, puedes ver todos los recursos que actualmente ha almacenado en caché.

![ab9c361527825fac.png](img/ab9c361527825fac.png)

Ahora, probemos el modo sin conexión. Vuelve al subpanel __Service Worker__ de DevTools y marca la casilla de verificación __Offline__. Después de marcarla, deberías ver un pequeño ícono amarillo de advertencia al lado de la pestaña del panel __Network__. Esto indica que trabajas sin conexión.

![7656372ff6c6a0f7.png](img/7656372ff6c6a0f7.png)

Vuelve a cargar tu página y... ¡funciona! O, al menos, así parece. Observa cómo carga los datos de estado del tiempo iniciales (falsos).

![8a959b48e233bc93.png](img/8a959b48e233bc93.png)

Observa la oración `else` de `app.getForecast()` para comprender por qué la app puede cargar los datos falsos.

El siguiente paso es la modificación de la lógica de la app y el service worker para poder almacenar en caché los datos de estado del tiempo, y mostrar los datos más recientes de la caché cuando la app trabaje sin conexión.

__Consejo:__ para comenzar desde cero y eliminar todos los datos guardados (localStoarge, datos de indexedDB, archivos almacenados en caché) y quita los service workers, usa el subpanel de almacenamiento Clear de la pestaña Application.

[Vínculo](https://weather-pwa-sample.firebaseapp.com/step-06/)

### Ten cuidado con los casos extremos

Como ya se mencionó, este código __no se debe usar en producción__ debido a todos los casos extremos sin manejar.

#### El almacenamiento en caché depende de la actualización de la clave del caché para cada cambio

Por ejemplo, este método de almacenamiento en caché exige que actualices la clave del caché cada vez que modifiques contenido; de lo contrario, la caché no se actualizará y se ofrecerá el contenido anterior. Asegúrate de cambiar la clave de caché con cada cambio mientras trabajas en tu proyecto.

#### Requiere que se vuelva a descargar todo para cada cambio

Otra desventaja es que se invalida todo la caché y se debe volver a descargar cada vez que cambia un archivo. Esto significa que si cambias un error ortográfico de un solo carácter, se invalidará la caché y se deberá descargar todo nuevamente. Esto no es precisamente eficaz.

#### La caché del navegador puede impedir la actualización del caché del service worker

Aquí encontramos otro inconveniente importante. Es fundamental que la solicitud HTTPS realizada durante el controlador de la instalación vaya directamente a la red y no muestre una respuesta del la caché del navegador. De lo contrario, el navegador puede mostrar la versión anterior almacenada en caché, lo cual hará que la caché del service worker nunca se actualice.

#### En la producción, ten en cuenta las estrategias en las que se prioriza la caché

En nuestra app se usa una estrategia en la que se prioriza la caché, lo cual genera una copia de todo el contenido almacenado en caché que se muestra sin enviar una consulta a la red. Si bien implementar una estrategia en la que se priorice la caché es sencillo, puede suponer desafíos en el futuro. Una vez que se almacena en caché el registro del proceso de trabajo y la página host, puede resultar muy difícil cambiar la configuración del proceso de trabajo (ya que esta depende del punto en el que se definió), y podrías encontrarte implementando sitios extremadamente difíciles de actualizar.

#### ¿Cómo evito estos casos extremos?

¿Cómo evitamos estos casos extremos? Usa una biblioteca como  [sw-precache](https://github.com/GoogleChrome/sw-precache), que brinda buen control sobre lo que vence, asegura que las solicitudes vayan directamente a la red y se encarga todo el trabajo duro por ti.

### Sugerencias para probar service workers dinámicos

La depuración de service workers puede ser un desafío, y cuando incluye el almacenamiento en caché, todo se puede convertir en una pesadilla si la caché no se actualiza cuando tú lo esperas. Entre el ciclo de vida del proceso de trabajo típico y un error en tu código, puedes frustrarte bastante rápido. No lo hagas. Existen algunas herramientas que pueden hacer más simple tu trabajo.

#### Comienza desde cero

En algunos casos, puedes encontrarte cargando datos almacenados en caché o que las cosas no están actualizadas como esperas. Para eliminar todos los datos guardados (localStoarge, datos de indexedDB, archivos almacenados en caché) y quitar los service workers, usa el subpanel de almacenamiento Clear de la pestaña Application.

Algunas otras sugerencias:

* Una vez que se ha eliminado el registro de un service worker, puede permanecer enumerado hasta que se cierre la ventana del navegador que lo contiene.
* Si hay varias ventanas de tu app abiertas, el nuevo service worker no tendrá efecto hasta que se hayan vuelto a cargar y se hayan actualizado al último service worker.
* Eliminar del registro un service worker no limpia la caché, por eso es posible que tengas datos viejos si no ha cambiado el nombre de la caché.
* Si existe un service worker y se registra un nuevo service worker, el nuevo service worker no tomará control hasta que se vuelva a cargar la página, a menos que tomes  [control inmediato](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/immediate-control).


## Usa service workers para almacenar en caché los datos de pronóstico climático




Escoger la  [estrategia de almacenamiento en caché](https://jakearchibald.com/2014/offline-cookbook/) adecuada para tus datos es vital y depende del tipo de datos que presenta tu app. Por ejemplo, los datos sensibles al tiempo, como el estado del tiempo o cotizaciones bursátiles, deberían ser lo más nuevos posibles, mientras que las imágenes de avatar y el contenido de artículos se puede actualizar menos a menudo.

La estrategia de  [primero-caché-después-red](https://jakearchibald.com/2014/offline-cookbook/#cache-network-race) es ideal para nuestra app. Hace que se muestren datos en pantalla lo más rápido posible y luego los actualiza cuando obtiene de la red los datos más recientes. En comparación con la primero-red-luego-caché, el usuario no tiene que esperar hasta que la  [extracción](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) finalice para obtener los datos almacenados en caché.

Caché-primero-después-red significa que tenemos que emitir dos solicitudes asincrónicas: una a la caché y otra a la red. Nuestra solicitud de red con la app no debe cambiar demasiado, pero se debe modificar el service worker para almacenar en caché la respuesta antes de mostrarla.

Bajo circunstancias normales, los datos almacenados en caché se mostrarán casi inmediatamente, brindándole a la app datos recientes que pueda usar. Posteriormente, cuando se muestre la respuesta de la red, se actualizará la app con los datos más recientes de la red.

### Intercepta la solicitud de la red y almacena la respuesta en caché

Se debe modificar el proceso de trabajo para interceptar solicitudes enviadas a la weather API y almacenar sus respuestas en la caché, de modo que se pueda acceder fácilmente a ellas posteriormente. En la estrategia caché-después-red, esperamos que la respuesta de la red sea la "fuente de la verdad" y que siempre nos brinde la información más reciente. Si esta no puede hacerlo, podría producirse un error, pero no representará un problema porque se habrán recuperado los últimos datos almacenados en la caché de la app.

En el proceso de trabajo, agregaremos un `dataCacheName` para poder separar los datos de nuestras aplicaciones del shell de la app. Cuando se actualice el shell de app y se depuren los cachés más antiguos, los datos permanecerán intactos y estarán listos para una carga rapidísima. Recuerda que si en el futuro cambias el formato de tus datos, deberás controlar esos cambios y asegurarte de que el shell y el contenido de la app permanezcan sincronizados.

Agrega la siguiente línea en la parte superior de tu archivo `service-worker.js`:

```
var dataCacheName = 'weatherData-v1';
```

Luego, actualiza el controlador de evento `activate` para que no borre la caché de datos cuando limpia la caché del shell de la app.

```
if (key !== cacheName && key !== dataCacheName) {
```

Finalmente, actualiza el controlador de evento `fetch` para que controle solicitudes a la API de datos en forma separada de otras solicitudes.

```
self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
```

El código intercepta la solicitud y comprueba si la URL comienza con la dirección de la weather API. Si lo hace, usa  [extracción](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) para hacer la solicitud. Una vez que se muestra la respuesta, nuestro código abre la caché, clona la respuesta, la almacena en la caché y le muestra la respuesta al solicitante original.

La app aún no funcionará sin conexión. Hemos implementado el almacenamiento en caché y la devolución para el shell de la app, pero, a pesar de estar almacenando los datos en caché, la app aún no revisa la caché para ver si tiene datos de estado del tiempo. 

### Cómo realizar las solicitudes

Como se mencionó anteriormente, la app debe emitir dos solicitudes asincrónicas: una al caché y otra a la red. La app usa el objeto `caches` disponible en `window` para acceder al caché y recuperar los datos más recientes. Este es un excelente ejemplo de mejora progresiva ya que el objeto `caches` puede no estar disponible en todos los navegadores, y, si no lo está, la solicitud de red debería funcionar.

Para hacer esto, es necesario:

1. Revisa si el objeto `caches` está disponible en el objeto global `window`.
2. Solicita datos de la caché. 

* Si la solicitud del servidor se sigue destacando, actualiza la app con los datos almacenados en caché.

3. Solicita datos del servidor.

* Guarda los datos para tener un rápido acceso después.
* Actualiza la app con los datos nuevos del servidor.

#### Obtén datos de la caché

A continuación, se debe comprobar si existe el objeto `caches` y se le deben solicitar datos actualizados. Encuentra el comentario `TODO add cache logic here` en `app.getForecast()` y agrega el código debajo del comentario.

```
    if ('caches' in window) {
      /*
       * Check if the service worker has already cached this city's weather
       * data. If the service worker has the data, then display the cached
       * data while the app fetches the latest data.
       */
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function updateFromCache(json) {
            var results = json.query.results;
            results.key = key;
            results.label = label;
            results.created = json.query.created;
            app.updateForecastCard(results);
          });
        }
      });
    }
```

Nuestra app de estado del tiempo ahora hace dos solicitudes sincrónicas de datos, una desde `cache` y una vía un XHR. Si hay datos en la caché, se devolverán y se mostrarán muy rápidamente (decenas de milisegundos), y actualizarán la tarjeta solo si el XHR sigue estando destacado. Luego, cuando el XHR responda, la tarjeta se actualizará con los datos más nuevos directamente de la weather API.

Observa cómo la solicitud de caché y la solicitud de XHR finalizan con una llamada a actualización de la tarjeta de pronóstico climático. ¿Cómo sabe la app si está mostrando los datos más nuevos? Esto se controla en el siguiente código de `app.updateForecastCard`:

```
    var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    var cardLastUpdated = cardLastUpdatedElem.textContent;
    if (cardLastUpdated) {
      cardLastUpdated = new Date(cardLastUpdated);
      // Bail if the card has more recent data then the data
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }
```

Cada vez que se actualiza una tarjeta, la app almacena la marca de tiempo de los datos en un atributo oculto de la tarjeta. La app se retira si la marca de tiempo que ya existe en la tarjeta es más nueva que los datos que se pasaron a la función.

### Probar

Ahora, la app debería funcionar por completo sin conexión. Guarda alguna ciudades y presiona el botón para actualizar en la app para obtener datos de estado del tiempo más nuevos, luego corta la conexión y vuelve a cargar la página. 

Luego ve al subpanel __Cache Storage__ del panel __Application__ de DevTools. Amplía la sección y deberías ver el nombre del shell de tu app y los datos de caché enumerados a la izquierda. Abrir la caché de datos debería mostrar los datos almacenados de cada ciudad.

![cf095c2153306fa7.png](img/cf095c2153306fa7.png)

[Vínculo](https://weather-pwa-sample.firebaseapp.com/step-07/)


## Soporta la integración nativa




A nadie le agrada tener que escribir URLs largas en un teclado móvil si no tiene necesidad de hacerlo. Con la función de la pantalla principal Add To, tus usuarios pueden escoger agregar un vínculo de atajo a su dispositivo de la misma manera en que instalarían una app nativa de una tienda, pero con mucha menos fricción.

### Banners de instalación de aplicaciones web y Add to Homescreen para Chrome en Android

Los banners de instalación de apps web te dan la posibilidad de permitir que tus usuarios agreguen de manera rápida y fluida tu app web a sus pantallas de inicio. Esto hace más simple abrir y regresar a tu app. Agregar banners de instalación de apps es sencillo y Chrome se encarga de la mayor parte del trabajo pesado. Solo tenemos que incluir un archivo de manifiesto de app web con detalles de la app.

Chrome luego usa un conjunto de criterios que incluyen el uso de un service worker, estado de SSL y visita algoritmos heurísticos de frecuencia para saber cuándo mostrar el banner. Además, un usuario puede agregarlo en forma manual a través del botón del menú "Add to Home Screen" en Chrome.

#### Declara un manifiesto de las apps con un archivo `manifest.json`

El manifiesto de las apps web es un archivo JSON simple que te proporciona a ti, el programador, la capacidad de controlar cómo se le muestra tu app al usuario en las áreas en las que espera ver apps (por ejemplo, la pantalla de inicio para móvil), dirigir lo que el usuario puede ejecutar y, lo que es más importante, cómo puede hacerlo.

Al usar el manifiesto para aplicaciones web, tu aplicación web puede:

* tener una presencia destacada en la pantalla de inicio de Android del usuario;
* ejecutarse en el modo de pantalla completa en Android sin barra de URL;
* controlar la orientación de la pantalla para optimizar la visualización;
* definir una experiencia de ejecución de “pantalla de presentación” y un color de tema para el sitio;
* identificar si se ejecuta tu app desde la pantalla de inicio o la barra de URL.

Crea un archivo llamado `manifest.json` en tu carpeta `work` y copia/pega el siguiente contenido:

```
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

El manifiesto es compatible con una variedad de íconos que sirven para distintos tamaños de pantallas. Cuando se escribió esto, Chrome y Opera Mobile, los únicos navegadores compatibles con manifiestos de la app web, no usaban nada de tamaño menor a 192 px.

Una sencilla forma de rastrear cómo se lanza la app es agregar una cadena de consulta al parámetro `start_url` y usar una suite de análisis para rastrear la cadena de consulta. Si usas este método, recuerda actualizar la lista de archivos almacenados en caché por el shell de la app, para asegurarte de que el archivo que tiene la cadena de consulta se almacene en caché.

#### Notifica al navegador sobre tu archivo de manifiesto

Ahora agrega la siguiente línea al final del elemento `<head>` en tu archivo `index.html`: 

```
<link rel="manifest" href="/manifest.json">
```

#### Prácticas recomendadas

* Coloca el vínculo al manifiesto en todas las páginas de tu sitio para que Chrome lo tome no bien el usuario visita el sitio, sin importar a qué página llegue.
* En Chrome se prefiere el `short_name` y se usará si está presente en el campo de nombre.
* Define conjuntos de íconos para pantallas de diferentes densidades. Chrome intentará usar el ícono más cercano a 48 dp, por ejemplo, 96 px en un dispositivo de 2 x, o 144 px en un dispositivo de 3 x.
* Recuerda incluir un ícono con tamaño sensible para una pantalla de presentación y no olvides establecer el `background_color`.

Lecturas adicionales:

[Uso de banners de instalación de app](/web/fundamentals/engage-and-retain/simplified-app-installs/)

### Elementos de Add to Homescreen para Safari en iOS

En tu `index.html`, agrega lo siguiente al final del elemento `<head>`:

```
  <!-- Add to home screen for Safari on iOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Weather PWA">
  <link rel="apple-touch-icon" href="images/icons/icon-152x152.png">
```

### Ícono de mosaico para Windows

En tu `index.html`, agrega lo siguiente al final del elemento `<head>`:

```
  <meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
  <meta name="msapplication-TileColor" content="#2F3BA2">
```

### Probar

En esta sección, te mostraremos alguna formas de probar el manifiesto de tu app web.

La primera forma es con DevTools. Abre el subpanel __Manifest__del panel __Application__. Si has agregado correctamente la información del manifiesto, podrás verla analizada y presentada en un formato legible en este subpanel.

También puedes probar la función para agregar a la pantalla principal desde este subpanel. Haz clic en el botón __Add to homescreen__. Deberías ver el mensaje "add this site to your shelf" debajo de tu barra de URL, como en la siguiente captura de pantalla.

![cbfdd0302b611ab0.png](img/cbfdd0302b611ab0.png)

Este es el equivalente de escritorio de la función móvil de agregar a la pantalla principal. Puedes activar esta solicitud en el escritorio con éxito, luego puedes estar seguro de que los usuarios de dispositivos móviles puedan agregar tu app a sus dispositivos.

La segunda forma de probarlo es vía Web Server for Chrome. Con este acercamiento, puedes exponer tu servidor de desarrollo local (en tu computadora de escritorio o laptop) a otras computadoras, y luego puedes acceder a tu progressive web app desde un dispositivo móvil real.

En el diálogo de configuración de Web Server for Chrome, selecciona la opción `Accessible on local network`:

![81347b12f83e4291.png](img/81347b12f83e4291.png)

Coloca el servidor web en `STOPPED` y de nuevo en `STARTED`. Verás una nueva URL que se puede usar para acceder a tu app en forma remota.

Ahora, accede a tu sitio desde un dispositivo móvil, usando la nueva URL.

Verás errores de service worker en la consola cuando hagas una prueba de esta forma porque el service worker no se emite a través de HTTPS.

Usando Chrome desde un dispositivo Android, intenta agregar la app a la pantalla principal y verificar que la pantalla de inicio aparezca correctamente y se usen los íconos adecuados.

En Safari e Internet Explorer, también puedes agregar la app en forma manual a tu pantalla principal.

[Vínculo](https://weather-pwa-sample.firebaseapp.com/step-08/)


## Impleméntala en un host seguro y festeja




El último paso es implementar nuestra app de estado del tiempo en un servidor compatible con HTTPS. Si aún no tienes uno, el acercamiento más sencillo (y gratuito) es el uso del hosting de contenido estático de Firebase. Es muy fácil de usar, proporciona contenido a través de HTTPS y cuenta con el respaldo de una CDN global.

### Crédito adicional: minifica e integra CSS

Hay algo más que deberías tener en cuenta: la minificación de los estilos claves y el alineamiento de los mismo directamente en `index.html`.  [Page Speed Insights](/speed) recomienda emitir el contenido de la mitad superior de la página en los primeros 15k bytes de la solicitud.

Observa el nivel de reducción máxima que puedes lograr para la solicitud inicial con todo integrado.

Lecturas adicionales:  [Reglas de PageSpeed Insight](/speed/docs/insights/rules)

### Realiza implementaciones en Firebase

Si eres nuevo en Firebase, primero deberás crear tu cuenta e instalar algunas herramientas.

1. Crea una cuenta de Firebase en [https://firebase.google.com/console/](https://firebase.google.com/console/)
2. Instala las herramientas de Firebase vía npm: `npm install -g firebase-tools`

Una vez que se haya creado tu cuenta y hayas iniciado sesión, estarás listo para la implementación.

1. Crea una nueva app en  [https://firebase.google.com/console/](https://firebase.google.com/console/)
2. Si no has iniciado sesión recientemente en las herramientas de Firebase, actualiza tus credenciales: `firebase login`
3. Inicia tu app y proporciona el directorio (probablemente `work`) donde completaste la ubicación de la app: `firebase init`
4. Finalmente, implementa la app en Firebase: `firebase deploy`
5. Festeja. ¡Eso es todo! Tu app se implementará en el dominio: `https://YOUR-FIREBASE-APP.firebaseapp.com`

Lecturas adicionales:  [Guía de Hosting de Firebase](https://www.firebase.com/docs/hosting/guide/)

### Probar

* Intenta agregar la app a tu pantalla principal y desconecta la red, y verifica que la app funcione sin conexión, como se espera.

[Vínculo](https://weather-pwa-sample.firebaseapp.com/final/)





## ¿Encontraste un problema o tienes comentarios? {: .hide-from-toc }
Ayúdanos a que nuestros code labs sean mejores enviando un 
[problema](https://github.com/googlecodelabs/your-first-pwapp/issues) hoy. ¡Gracias!


{# wf_devsite_translation #}
