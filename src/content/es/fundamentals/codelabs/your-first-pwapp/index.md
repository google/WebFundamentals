project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2019-04-19 #}
{# wf_published_on: 2016-01-01 #}

# Tu primera Progressive Web App {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

## Introducción

### ¿Qué hace de una aplicación web, una Progressive Web App?

Las Progressive Web Apps proporcionan un instalable, experiencia de aplicación como en ordenadores de escritorio y móviles que se crean y entregan directamente a través de la web. Son aplicaciones web que son rápidas y confiables. Y lo más importante, son aplicaciones web que funcionan en cualquier navegador. Si estás creando una aplicación web hoy, ya estás en el camino hacia la creación de una Progressive Web App.

#### Rápida y Confiable

Toda experiencia web debe ser rápida, y esto es especialmente cierto para las Progressive Web Apps. Rápida se refiere al tiempo que se tarda en obtener contenido significativo en la pantalla y brinda una experiencia interactiva en menos de 5 segundos.

Y, debe ser __confiablemente rápido__. Es difícil enfatizar lo suficiente lo bueno que es el rendimiento confiable. Piénsalo de esta manera: la primera carga de una aplicación nativa es frustrante. Está confinado por una tienda de aplicaciones y una descarga enorme, pero una vez que llegas al punto de instalar la aplicación, ese coste inicial se amortiza en todos los inicios de la aplicación, y ninguno de esos inicios tiene un retraso variable. Cada inicio de aplicación es tan rápido como el último, sin variación. Una Progressive Web App debe ofrecer este rendimiento confiable que los usuarios esperan de cualquier experiencia instalada.

#### Instalable

Las Progressive Web Apps pueden ejecutarse en una pestaña del navegador, pero también son instalables. Añadir a marcadores un sitio simplemente agrega un acceso directo, pero una Progressive Web App instalada se ve y se comporta como todas las demás aplicaciones instaladas. Se inicia desde el mismo lugar que se lanzan otras aplicaciones. Puedes controlar la experiencia de lanzamiento, incluida una pantalla de inicio personalizada, iconos y más. Se ejecuta como una aplicación, en una ventana de aplicación sin una barra de direcciones u otra interfaz de usuario del navegador. Y como todas las demás aplicaciones instaladas, es una aplicación de nivel superior en el gestor de tareas.

Recuerda, es fundamental que una PWA instalable sea rápida y confiable. Los usuarios que instalan una PWA esperan que sus aplicaciones funcionen, sin importar en qué tipo de conexión de red estén conectados. Es una expectativa de referencia que todas las aplicaciones instaladas deben cumplir.

#### Móvil y Escritorio

Mediante el uso de técnicas de diseño adaptable, las Progressive Web Apps funcionan en el móvil __y__ escritorio, utilizando una base de código única entre plataformas. Si estás considerando escribir una aplicación nativa, eche un vistazo a los beneficios que ofrece una PWA.

### Qué construirás

En este laboratorio de código, vas a construir una aplicación web meteorológica utilizando las técnicas de una Progressive Web App. Tu aplicación:

* Usará diseño adaptable, por lo que funciona en escritorio o móvil.
* Será rápido, usa un service worker para guardar en precache los recursos de la aplicación (HTML, CSS, JavaScript, imágenes) necesarios para ejecutar y almacenar en caché los datos meteorológicos en tiempo de ejecución para mejorar el rendimiento.
* Será instalable, utilizando un manifiesto de aplicación web y el evento `beforeinstallprompt` para notificar al usuario que es instalable.

![95fe6f7fbeee5bb1.png](img/95fe6f7fbeee5bb1.png)

Warning: para simplificar este laboratorio de código y explicar los fundamentos de proporcionar una experiencia sin conexión, estamos usando JavaScript de vainilla. En una aplicación de producción, le recomendamos que utilice herramientas como [Workbox](/web/tools/workbox/) para construir tu service worker. Elimina muchos de los bordes afilados y las esquinas oscuras con las que puede encontrarse.

### Lo que aprenderás

* Cómo crear y agregar un manifiesto de aplicación web.
* Cómo proporcionar una experiencia sin conexión simple
* Cómo proporcionar una experiencia sin conexión completa
* Como hacer instalable tu aplicación

Este laboratorio de código está enfocado en Progressive Web Apps. Los conceptos y los bloques de código no relevantes se pasan por alto y se proporcionan para que usted simplemente copie y pegue.

### Lo que necesitarás

* Una versión reciente de Chrome (74 o posterior) las PWAs son solo aplicaciones web y funcionan en todos los navegadores, pero usaremos algunas funciones de Chrome DevTools para comprender mejor lo que está sucediendo a el nivel de navegador y usarlo para probar la experiencia de instalación.
* Conocimiento de HTML, CSS, JavaScript y [Chrome DevTools](https://developer.chrome.com/devtools) .

## Preparación

### Consigue una clave para la API de Dark Sky

Nuestros datos meteorológicos provienen de [Dark Sky API](https://darksky.net/dev). Para poder usarlo, deberás solicitar una API key. Es fácil de usar y gratis para proyectos no comerciales.

[Register for API Key](https://darksky.net/dev/register)

Note: También puedes completar este laboratorio de código sin una API key de Dark Sky. Si nuestro servidor no puede obtener datos reales de la API de Dark Sky, devolverá datos falsos en su lugar.

#### Verifica que tu API key funciona correctamente

Para probar que tu API key funciona correctamente, realiza una solicitud HTTP a la API de DarkSky. Actualiza la URL a continuación para reemplazar `DARKSKY_API_KEY` con tu API key. Si todo funciona, debería ver el último pronóstico del tiempo para la ciudad de Nueva York.

`https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319`

### Obtén el código

Hemos puesto todo lo que necesitas para este proyecto en un repositorio de Git. Para comenzar, deberás obtener el código y abrirlo en tu entorno de desarrollo favorito. Para este laboratorio de código, recomendamos utilizar Glitch.

#### Muy recomendable: usa Glitch para importar el repositorio

Usar Glitch es el método recomendado para trabajar a través de este código.

1. Abre una nueva pestaña del navegador y ve a [https://glitch.com](https://glitch.com) .
2. Si no tienes una cuenta, deberás registrarte.
3. Haz clic en __New Project__, luego __Clone from Git Repo.__
4. Clone __https://github.com/googlecodelabs/your-first-pwapp.git__ y Haz clic en __Accept__.
5. Una vez que se haya cargado el repositorio, edita el archivo `.env` y actualízalo con tu API key DarkSky.
6. HAz clic en el botón __Mostrar Live__ para ver la PWA en acción.

#### Alternativa: Descargar código y trabajar localmente

Si deseas descargar el código y trabajar de manera local, deberás tener una versión reciente de Node y la configuración del editor de códigos y listo para usar.

Caution: si trabaja localmente, algunas de las auditorías de Lighthouse no se aprobarán y es posible que la instalación no esté disponible porque el servidor local no sirve el contenido en un contexto seguro.

[Download source code](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

1. Desempaqueta el archivo zip descargado.
2. Ejecuta `npm install` para instalar las dependencias necesarias para ejecutar el servidor.
3. Edita `server.js` y configura la API key de DarkSky.
4. Ejecuta `node server.js` para iniciar el servidor en el puerto 8000.
5. Abre una pestaña del navegador en [http://localhost:8000](http://localhost:8000)

## Establecer una línea de base

### ¿Cuál es nuestro punto de partida?

Nuestro punto de partida es una aplicación meteorológica básica diseñada para este laboratorio de código. El código se ha simplificado demasiado para mostrar los conceptos en este laboratorio de código y tiene poco manejo de errores. Si eliges reutilizar algo de este código en una aplicación de producción, asegúrate de manejar cualquier error y probar completamente todo el código.

Algunas cosas para probar...

1. Agrega una nueva ciudad con el botón más azul en la esquina inferior derecha.
2. Actualiza los datos con el botón de actualización en la esquina superior derecha.
3. Borra una ciudad usando la x en la parte superior derecha de cada tarjeta de ciudad.
4. Mira cómo funciona en el escritorio y en el móvil.
5. Mira lo que pasa cuando te desconectas.
6. Usando el panel de la Red de Chrome, mira qué sucede cuando la red se limita a Slow 3G.
7. Agrega un retraso al servidor de pronóstico cambiando `FORECAST_DELAY` en `server.js`

### Auditoría con Lighthose

[Lighthouse](/web/tools/lighthouse/#devtools) es una herramienta fácil de usar para ayudar a mejorar la calidad de tus sitios y páginas. Cuenta con auditorías de rendimiento, accesibilidad, Progressive Web Apps y más. Cada auditoría tiene un documento de referencia que explica por qué la auditoría es importante, así como la forma de solucionarla.

![b112675caafccef0.png](img/b112675caafccef0.png)

Usaremos Lighthouse para auditar nuestra aplicación Weather y verificar los cambios que hemos realizado.

Note: Puedes ejecutar Lighthouse en Chrome DevTools, desde la línea de comandos o como un módulo de Node. Considera [añadir Lighthouse](https://github.com/GoogleChromeLabs/lighthousebot) a tu proceso de compilación para asegurarte de que tu aplicación web no retroceda.

### Vamos a ejecutar Lighthouse

1. Abre tu proyecto en una nueva pestaña.
2. Abre Chrome DevTools y cambia a la pestaña __Audits__, DevTools muestra una lista de categorías de auditoría, déjelas todas habilitadas.
3. Haz clic en __Ejecutar auditorías__, después de 60-90 segundos, Lighthouse te da un informe en la página.

### La auditoría Progressive Web App

Nos centraremos en los resultados de la auditoría de la Progressive Web App.

![af1a64a13725428e.png](img/af1a64a13725428e.png)

Y hay mucho rojo en lo que centrarse:

* __❗FALLADO:__ La página actual no responde con un 200 cuando está desconectado.
* __❗FALLADO:__ `start_url` no responde con un 200 cuando está desconectado.
* __❗FALLADO:__ No registra un service worker que controle la página y `start_url.`
* __❗FALLADO:__ El manifiesto de la aplicación web no cumple con los requisitos de instalación.
* __❗FALLADO:__ No está configurado para una pantalla de inicio personalizada.
* __❗FALLADO:__ No establece un color de tema de la barra de direcciones.

¡Saltemos y comencemos a solucionar algunos de estos problemas!

## Añadir un manifiesto de aplicación web

Al final de esta sección, nuestra aplicación meteorológica pasará las siguientes auditorías:

* El manifiesto de la aplicación web no cumple con los requisitos de instalación.
* No está configurado para una pantalla de inicio personalizada.
* No establece un color de tema de la barra de direcciones.

### Crear el manifiesto de la aplicación web.

[El manifiesto de las apps web](/web/fundamentals/web-app-manifest) es un archivo JSON simple que permite que tú, el desarrollador, puedas controlar cómo se muestra tu app al usuario.

Usando el manifiesto de la aplicación web, tu aplicación web puede:

* Indicar al navegador que deseas que se abre tu aplicación en una ventana independiente ( `display` ).
* Definir qué página se abre cuando la aplicación se inicia por primera vez ( `start_url` ).
* Definir cómo debería ser la aplicación en el dock o lanzador de apps ( `short_name`, `icons` ).
* Crear una pantalla de `name` ( `name`, `icons`, `colors` ).
* Indicar al navegador que abre la ventana en modo horizontal o retrato ( `orientation` ).
* Y [mucho más](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members) .

Crea un archivo llamado `public/manifest.json` en tu proyecto y copia/pega los siguientes contenidos:

`public/manifest.json`

```json
{
  "name": "Clima",
  "short_name": "Clima",
  "icons": [{
    "src": "/images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

El manifiesto admite una serie de iconos, destinados a diferentes tamaños de pantalla. Para este laboratorio de código, hemos incluido algunos otros ya que los necesitábamos para nuestra integración con iOS.

Note: para ser instalable, Chrome requiere que proporcione al menos un icono de 192x192px y un icono de 512x512px. Pero también puede proporcionar otros tamaños. Chrome utiliza el icono más cercano a 48dp, por ejemplo, 96px en un dispositivo 2x o 144px para un dispositivo 3x.

### Añadir un enlace al manifiesto de la aplicación web

A continuación, debemos informarle al navegador acerca de nuestro manifiesto agregando `<link rel="manifest"...` a cada página de nuestra aplicación. Agrega la siguiente línea al elemento `<head>` en tu archivo `index.html`.

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L30)

```html
<!-- CODELAB: Add link rel manifest -->
<link rel="manifest" href="/manifest.json">
```

#### DevTools, un pequeño desvío

DevTools proporciona una manera rápida y fácil de revisar tu archivo `manifest.json`. Abre el panel __Manifest__ en el panel __Aplication__. Si has agregado la información del manifiesto correctamente, podrás verla analizada y mostrada en un formato entendible por los humanos en este panel.

![c462743e1bc26958.png](img/c462743e1bc26958.png)

### Añadir meta etiquetas e íconos de iOS

Safari en iOS no admite el manifiesto de aplicación web ([todavía](https://webkit.org/status/#specification-web-app-manifest)), por lo que deberás agregar [etiquetas `meta` tradicionales](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) al `<head>` de tu archivo `index.html` :

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L31)

```html
<!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="PWA Clima">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
```

### Bonus: arreglos fáciles de Lighthouse

Nuestra auditoría de Lighthouse mencionó algunas otras cosas que son bastante fáciles de arreglar, así que cuidémoslas mientras estamos aquí.

#### Establecer la descripción meta

Bajo la auditoría de SEO, Lighthouse anotó que nuestro &quot;[Documento no tiene una meta descripción](/web/tools/lighthouse/audits/description)&quot;. Las descripciones se pueden mostrar en los resultados de búsqueda de Google. Las descripciones únicas y de alta calidad pueden hacer que tus resultados de búsqueda sean más relevantes para los usuarios y pueden aumentar tu tráfico de búsqueda.

Para agregar una descripción, agrega la siguiente etiqueta `meta` al `<head>` de tu documento:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L32)

```html
<!-- CODELAB: Add description here -->
<meta name="description" content="Un simple aplicación meteorológica">
```

#### Establecer el color del tema de la barra de direcciones

En la auditoría de PWA, Lighthouse observó que nuestra aplicación &quot;[No establece un color de tema de la barra de direcciones](/web/tools/lighthouse/audits/address-bar)&quot;. El hecho de que la barra de direcciones del navegador coincida con los colores de su marca proporciona una experiencia de usuario más envolvente.

Para establecer el color del tema en el móvil, agrega la siguiente etiqueta `meta` al `<head>` de tu documento:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L33)

```html
<!-- CODELAB: Add meta theme-color -->
<meta name="theme-color" content="#2F3BA2" />
```

### Verificar cambios con Lighthouse

Ejecuta Lighthouse nuevamente (haciendo clic en el signo + en la esquina superior izquierda del panel Audits) y verifica tus cambios.

__Auditoría SEO__

* __✅ PASADO:__ El documento tiene una meta descripción.

__Auditoría de Progressive Web App__

* __❗FALLADO:__ La página actual no responde con un 200 cuando está desconectado.
* __❗FALLADO:__ `start_url` no responde con un 200 cuando está desconectado.
* __❗FALLADO:__ No registra un service worker que controla la página y `start_url.`
* __✅ PASADO:__ El manifiesto de la aplicación web cumple con los requisitos de instalación.
* __✅ PASADO:__ Configurado para una pantalla de inicio personalizada.
* __✅ PASADO:__ Establece un color de tema de la barra de direcciones.

## Proporciona una experiencia offline básica

Los usuarios esperan que las aplicaciones instaladas siempre tengan una experiencia de referencia si están sin conexión. Por eso es fundamental que las aplicaciones web instalables nunca muestren el dinosaurio sin conexión de Chrome. La experiencia sin conexión puede abarcar desde una página sin conexión simple hasta una experiencia de solo lectura con datos almacenados previamente en caché, hasta una experiencia sin conexión totalmente funcional que se sincroniza automáticamente cuando se restaura la conexión de red.

En esta sección, agregaremos una página sin conexión simple a nuestra aplicación meteorológica. Si el usuario intenta cargar la aplicación mientras está sin conexión, mostrará nuestra página personalizada, en lugar de la página sin conexión típica que muestra el navegador. Al final de esta sección, nuestra aplicación meteorológica pasará las siguientes auditorías:

* La página actual no responde con un 200 cuando está desconectado.
* `start_url` no responde con un 200 cuando está desconectado.
* No registra un service worker que controla la página y `start_url.`

En la siguiente sección, reemplazaremos nuestra página sin conexión personalizada con una experiencia sin conexión completa. Esto mejorará la experiencia sin conexión, pero lo que es más importante, mejorará significativamente nuestro rendimiento, ya que la mayoría de nuestros activos (HTML, CSS y JavaScript) se almacenarán y servirán localmente, eliminando la red como un posible cuello de botella.

### Service workers al rescate

Si no estás familiarizado con los service workers, leyendo [Introducción a los service workers](/web/fundamentals/primers/service-worker/) puedes hacerte una idea básica sobre lo que pueden hacer, cómo funciona su ciclo de vida y más. Una vez que hayas completado este laboratorio de código, asegúrate de revisar el [Laboratorio de código depurando Service Workers](http://goo.gl/jhXCBy) para tener una visión más detallada de cómo trabajar con los service workers.

Las funciones proporcionadas a través de los service workers se deben considerar una mejora progresiva y se deben agregar solo si el navegador las admite. Por ejemplo, con los service workers puedes almacenar en caché la [shell de la app](/web/fundamentals/architecture/app-shell) y los datos de tu aplicación, de modo que esté disponible incluso cuando la red no lo esté. Cuando los service workers no son compatibles, no se llama al código sin conexión y el usuario obtiene una experiencia básica. El uso de la detección de características para proporcionar mejoras progresivas tiene poca sobrecarga y no se interrumpirá en los navegadores antiguos que no son compatibles con esa característica.

Warning: la funcionalidad del service worker solo está disponible en las páginas a las que se accede a través de HTTPS (http://localhost y sus equivalentes también funcionarán para facilitar las pruebas).

### Registrar el service worker

El primer paso es registrar al _service worker_. Agrega el siguiente código a tu archivo `index.html` :

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L206)

```js
// CODELAB: Register service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        });
  });
}
```

Este código verifica si la API de service workers está disponible y, si lo está, el service worker en `/service-worker.js` se registra una vez que la página es [cargada](/web/fundamentals/primers/service-workers/registration) .

Ten en cuenta que el service worker se sirve desde el directorio raíz, no desde un directorio `/scripts/`. Esta es la forma más fácil de configurar el __`scope`__ de tu service worker. El `scope` del _service worker_ determina qué archivos controla el _service worker_, es decir, desde qué ruta el _service worker_ interceptará las solicitudes. El valor predeterminado de `scope` es la ubicación del archivo de service worker y se extiende a todos los directorios a continuación. Entonces, si `service-worker.js` se encuentra en el directorio raíz, el _service worker_ controlará las solicitudes de todas las páginas web en este dominio.

### Precache página sin conexión

Primero, debemos decirle al service worker qué almacenar en caché. Ya hemos creado una simple [página sin conexión](https://your-first-pwa.glitch.me/offline.html) (`public/offline.html`) que se mostrará cada vez que no haya conexión de red.

En tu `service-worker.js`, agrega `'/offline.html',` al array de `FILES_TO_CACHE`, el resultado final debería verse así:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/offline.html',
];
```

A continuación, debemos actualizar el evento `install` para indicar al service worker que precachee la página sin conexión:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L29)

```js
// CODELAB: Precache static resources here.
evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);
```

Note: los eventos y el ciclo de vida del service worker se tratan en la siguiente sección.

Nuestro evento `install` ahora abre la caché con `caches.open()` y proporciona un nombre de caché. Proporcionar un nombre de caché nos permite versionar archivos, o datos separados de los recursos almacenados en caché para que podamos actualizar fácilmente uno pero no afecte al otro.

Una vez que la caché esté abierta, podemos llamar a `cache.addAll()`, que obtiene una lista de URLs, las obtiene del servidor y agrega la respuesta a la caché. Ten en cuenta que `cache.addAll()` se rechazará si falla alguna de las solicitudes individuales. Eso significa que tienes la garantía de que, si el paso de instalación se realiza correctamente, tu caché estará en un estado consistente. Pero, si falla por alguna razón, lo intentará de nuevo automáticamente la próxima vez que se inicie el service worker.

#### DevTools, un pequeño desvío

Veamos cómo puedes usar DevTools para comprender y depurar los service workers. Antes de volver a cargar tu página, abre DevTools, ve al panel __Service Workers__ en el panel __Aplication__. Debe tener un aspecto como este:

![b3aa37b67863fd03.png](img/b3aa37b67863fd03.png)

Cuando ves una página en blanco como esta, significa que la página actualmente abierta no tiene ningún service worker registrado.

Ahora, recarga tu página. El panel service workers ahora debería tener este aspecto:

![69808e4bf3aee41b.png](img/69808e4bf3aee41b.png)

Cuando veas información como esta, significa que la página tiene un service worker en ejecución.

Junto a la etiqueta de estado, hay un número (*34251* en este caso), vigila ese número mientras trabaja con los service workers. Es una manera fácil de saber si tu service worker ha sido actualizado.

### Limpieza de páginas sin conexión antiguas

Usaremos el evento `activate` para limpiar los datos antiguos en nuestro caché. Este código garantiza que tu service worker actualiza nuestra caché cada vez que cambie alguno de los archivos de la shell de la aplicación. Para que esto funcione, necesitarías incrementar la variable `CACHE_NAME` en la parte superior de tu archivo de service worker.

Agrega el siguiente código a tu evento `activate` :

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L36)

```js
// CODELAB: Remove previous cached data from disk.
evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
```

#### DevTools, un pequeño desvío

Con el panel service workers abierto, actualiza la página, verá el nuevo service worker instalado y el incremento del número de estado.

![1db827d76bc0b359.png](img/1db827d76bc0b359.png)

El _service worker_ actualizado toma el control inmediatamente porque nuestro evento `install` finaliza con `self.skipWaiting()` y el evento `activate` finaliza con `self.clients.claim()`. Sin esos, el service worker anterior continuaría controlando la página siempre que haya una pestaña abierta en la página.

### Solicitudes de red fallidas

Y finalmente, necesitamos manejar los eventos de `fetch`. Vamos a utilizar una [estrategia de red y recurrir a la caché](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache). El _service worker_ primero intentará recuperar el recurso de la red, si eso falla, devolverá la página sin conexión de la caché.

![6302ad4ba8460944.png](img/6302ad4ba8460944.png)

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L43)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  return;
}
evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
);
```

El controlador `fetch` solo necesita manejar las navegaciones de la página, por lo que otras solicitudes pueden ser eliminadas del controlador y serán tratadas normalmente por el navegador. Pero, si la solicitud `.mode` es `navigate`, usa `fetch` para intentar obtener el elemento de la red. Si falla, el manejador de `catch` abre la caché con `caches.open(CACHE_NAME)` y usa `cache.match('offline.html')` para obtener la página sin conexión predefinida. El resultado se devuelve al navegador mediante `evt.respondWith()`.

Key Point: envolver la llamada `fetch` en [`evt.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) evita el manejo de recuperación predeterminado del navegador y le dice al navegador que queremos manejar la respuesta por nosotros mismos. Si no llamas a `evt.respondWith()` dentro de un controlador de `fetch`, solo obtendrás el comportamiento de red predeterminado.

#### DevTools, un pequeño desvío

Revisemos para asegurarnos de que todo funciona como lo esperamos. Con el panel service workers abierto, actualiza la página, verás el nuevo service worker instalado y el incremento del número de estado.

También podemos verificar qué ha sido almacenado en caché. Ve al panel __Cache Storage__ en el panel __Application__ de DevTools. Haz clic con el botón derecho en __Cache Storage__, selecciona __Refresh Caches__, expande la sección y deberías ver el nombre de su caché estática en el lado izquierdo. Al hacer clic en el nombre de la memoria caché se muestran todos los archivos que están en caché.

![c80a2a2e93c1c3ee.png](img/c80a2a2e93c1c3ee.png)

Ahora, vamos a probar el modo sin conexión. Vuelve al panel __Service Workers__ de DevTools y marca la casilla __Offline__. Después de cambiarlo, deberías ver un pequeño icono de advertencia amarillo junto a la pestaña del panel __Network__. Esto indica que estás desconectado.

![984b34dc2aa667a.png](img/984b34dc2aa667a.png)

Recarga tu página y... ¡funciona! ¡Obtenemos __nuestro__ panda desconectado, en lugar del dino desconectado de Chrome!

### Consejos para probar los service workers

Depurar a los service workers puede ser un desafío, y cuando se trata de almacenamiento en caché, las cosas pueden convertirse en una pesadilla aún más si la caché no se actualiza cuando se espera. Entre el ciclo de vida típico de un service worker y un error en su código, puedes frustrarte rápidamente. __Pero no .__

#### Usar DevTools

En el panel service workers del panel Application, hay algunas casillas de verificación que harán tu vida mucho más fácil.

![c7ac93904f473a91.png](img/c7ac93904f473a91.png)

* __Offline__ - Cuando se marca, simula una experiencia sin conexión y evita que cualquier solicitud vaya a la red.
* __Actualización en la recarga__ - Cuando se marca, se obtendrá el service worker más reciente, se instalará y se activará de inmediato.
* __Bypass para red__ - Cuando se marca, las solicitudes pasan por alto al _service worker_ y se envían directamente a la red.

#### Borrón y cuenta nueva

En algunos casos, es posible que esté cargando datos en caché o que las cosas no se actualizan como esperas. Para borrar todos los datos guardados (localStorage, indexedDB data, cached files) y eliminar cualquier service worker, usa el panel Clear storage en la pestaña Application. Alternativamente, también puedes trabajar en una ventana de incógnito.

![398bbcd285e2c5dd.png](img/398bbcd285e2c5dd.png)

Consejos adicionales:

* Una vez que un service worker no ha sido registrado, puede permanecer en la lista hasta que se cierre la ventana que contiene el navegador.
* Si hay varias ventanas abiertas de tu aplicación, un nuevo service worker no entrará en vigencia hasta que todas las ventanas hayan sido recargadas y actualizadas al último service worker.
* ¡Desregistrar un service worker no borra la caché!
* Si existe un service worker y un nuevo service worker está registrado, el nuevo service worker no tomará el control hasta que la página es recargada, a menos que [tomes el control inmediato](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim).

### Verificar cambios con Lighthouse

Ejecuta Lighthouse de nuevo y verifica tus cambios. ¡No olvides desactivar la opción Offline antes de verificar tus cambios!

__Auditoría SEO__

* __✅ PASADO:__ El documento tiene una meta descripción.

__Auditoría de Progressive Web App__

* __✅ PASADO:__ La página actual responde con un 200 cuando está sin conexión.
* __✅ PASADO:__ `start_url` responde con un 200 cuando está desconectado.
* __✅ PASADO:__ Registra un service worker que controla la página y `start_url.`
* __✅ PASADO:__ El manifiesto de la aplicación web cumple con los requisitos de instalación.
* __✅ PASADO:__ Configurado para una pantalla de inicio personalizada.
* __✅ PASADO:__ Establece un color de tema de la barra de direcciones.

## Brindar una experiencia sin conexión completa

Tómate un momento, pon tu teléfono en modo avión e intenta ejecutar algunas de sus aplicaciones favoritas. En casi todos los casos, proporcionan una experiencia sin conexión bastante robusta. Los usuarios esperan un experiencia robusta de sus aplicaciones. Y la web no debería ser diferente. Las Progressive Web Apps deben diseñarse para unas condiciones sin conexión como escenario principal.

Key Point: Diseñar primero para sin conexión puede mejorar drásticamente el rendimiento de tu aplicación web al reducir el número de solicitudes de red realizadas por tu app, en lugar de eso, los recursos pueden ser predefinidos y servidos directamente desde la caché local. ¡Incluso con la conexión de red más rápida, el servicio desde la caché local será más rápido!

### Ciclo de vida del service worker

El ciclo de vida del _service worker_ es la parte más complicada. Si no sabes qué es lo que está tratando de hacer y cuáles son los beneficios, puedes sentir que está luchando contra ti. Pero una vez que sepas cómo funciona, puedes ofrecer actualizaciones integrales y discretas a los usuarios, mezclando lo mejor de la web y los patrones nativos.

Key Point: Este laboratorio de código solo cubre los conceptos básicos del ciclo de vida del service worker. Para profundizar más, consulta el artículo [El ciclo de vida del service worker](/web/fundamentals/primers/service-workers/lifecycle) en WebFundamentals.

#### `install`

El primer evento que recibe un service worker es `install`. Se activa tan pronto como el worker se ejecuta, y solo se llama una vez por _service worker_. __Si modificas la secuencia de comandos de tu service worker, el navegador lo considerará un service worker diferente__, y obtendrá su propio evento `install`.

![72ed77b1720512da.png](img/72ed77b1720512da.png)

Normalmente, el evento `install` se usa para almacenar en caché todo lo que necesita para que tu aplicación se ejecute.

#### `activate`

El service worker recibirá un evento `activate` cada vez que se inicie. El objetivo principal del evento `activate` es configurar el comportamiento del _service worker_, limpiar los recursos que quedan de las ejecuciones anteriores (por ejemplo, cachés antiguas) y preparar al _service worker_ para manejar las solicitudes de red (por ejemplo, el evento `fetch` que se describe a continuación).

#### `fetch`

El evento fetch permite que el _service worker_ intercepte cualquier solicitud de red y maneje las solicitudes. Puede ir a la red para obtener el recurso, puede extraerlo de su propia caché, generar una respuesta personalizada o cualquiera de las múltiples opciones. Echa un vistazo a [La guía de soluciones sin conexión](/web/fundamentals/instant-and-offline/offline-cookbook/) para ver las diferentes estrategias que puedes usar.

#### Actualizando un service worker

El navegador comprueba si hay una nueva versión de tu service worker en cada carga de página. Si encuentra una nueva versión, la nueva versión se descarga e instala en segundo plano, pero no está activada. Se encuentra en estado de espera, hasta que ya no queda ninguna página abierta que utilice el antiguo service worker. Una vez que se cierran todas las ventanas que usan el antiguo service worker, el nuevo service worker se activa y puede tomar el control. Consulte la sección [Actualización del service worker](/web/fundamentals/primers/service-workers/lifecycle#updates) del documento del ciclo de vida del service worker para obtener más detalles.

### Elegir la estrategia de almacenamiento en caché correcta

Elegir la [estrategia de cacheo](/web/fundamentals/instant-and-offline/offline-cookbook/) correcta depende del tipo de recurso que intentes almacenar en caché y de cómo podría necesitarlo más adelante. Para nuestra aplicación meteorológica, dividiremos los recursos que necesitamos para almacenar en caché en dos categorías: los recursos que queremos incluir en caché y los datos que almacenaremos en caché en tiempo de ejecución.

#### Almacenamiento en caché de recursos estáticos

Precachear tus recursos es un concepto similar a lo que sucede cuando un usuario instala una aplicación de escritorio o móvil. Los recursos clave necesarios para que la aplicación se ejecute se instalan o se almacenan en la memoria caché del dispositivo para que puedan cargarse más tarde, si hay conexión de red o no.

Para nuestra aplicación, almacenaremos previamente todos nuestros recursos estáticos cuando nuestro service worker esté instalado, de modo que todo lo que necesitamos para ejecutar nuestra aplicación se almacene en el dispositivo del usuario. Para garantizar que nuestra aplicación se cargue a la velocidad de la luz, usaremos la estrategia [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network); en lugar de ir a la red para obtener los recursos, se extraen de la caché local; Sólo si no está disponible, intentaremos obtenerlo de la red.

![44860840e2090bd8.png](img/44860840e2090bd8.png)

Extraer de la memoria caché local elimina cualquier variabilidad de la red. No importa en qué tipo de red esté el usuario (WiFi, 5G, 3G o incluso 2G), los recursos clave que necesitamos para ejecutar están disponibles casi de inmediato.

Caution: en este ejemplo, los recursos estáticos se sirven utilizando una estrategia [`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network), que da como resultado una copia de cualquier contenido almacenado en caché sin consultar la red. Si bien una estrategia de `cache-first` es fácil de implementar, puede causar desafíos en el futuro.

#### Los datos de la aplicación

La [estrategia stale-while-revalidate](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) es ideal para ciertos tipos de datos y funciona bien para nuestra aplicación. Obtiene los datos en la pantalla lo más rápido posible, después los actualiza una vez que la red ha devuelto los datos más recientes. Stale-while-revalidate significa que debemos iniciar dos solicitudes asíncronas, una para la memoria caché y otra para la red.

![6ebb2681eb1f58cb.png](img/6ebb2681eb1f58cb.png)

En circunstancias normales, los datos almacenados en la memoria caché se devolverán casi inmediatamente proporcionando la aplicación con datos recientes que puede usar. Luego, cuando vuelva la solicitud de red, la aplicación se actualizará utilizando los datos más recientes de la red.

Para nuestra aplicación, esto proporciona una mejor experiencia que la red, recurriendo a la estrategia de caché porque el usuario no tiene que esperar hasta que la solicitud de la red caduque para ver algo en la pantalla. Es posible que inicialmente vean datos más antiguos, pero una vez que se devuelva la solicitud de red, la aplicación se actualizará con los datos más recientes.

### Actualizar la lógica de la aplicación

Como se mencionó anteriormente, la aplicación debe iniciar dos solicitudes asíncronas, una para la caché y otra para la red. La aplicación utiliza el objeto `caches` disponible en `window` para acceder a la memoria caché y recuperar los últimos datos. Este es un excelente ejemplo de mejora progresiva ya que el objeto `caches` puede no estar disponible en todos los navegadores, y si no es así, la solicitud de red debería funcionar.

Actualiza la función `getForecastFromCache()` para verificar si el objeto `caches` está disponible en el objeto global `window` y, si lo está, solicita los datos de la memoria caché.

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L164)

```js
// CODELAB: Add code to get weather forecast from the caches object.
if (!('caches' in window)) {
  return null;
}
const url = `${window.location.origin}/forecast/${coords}`;
return caches.match(url)
    .then((response) => {
      if (response) {
        return response.json();
      }
      return null;
    })
    .catch((err) => {
      console.error('Error getting data from cache', err);
      return null;
    });
```

Después, debemos modificar [`updateData()`](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L196) para que haga dos llamadas, una a `getForecastFromNetwork()` para obtener el pronóstico de la red y otra a `getForecastFromCache()` para obtener el último pronóstico almacenado en caché:

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L200)

```js
// CODELAB: Add code to call getForecastFromCache.
getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
```

Nuestra aplicación meteorológica ahora realiza dos solicitudes asíncronas de datos, una desde la caché y otra a través de un `fetch`. Si hay datos en la caché, serán devueltos y procesados extremadamente rápido (decenas de milisegundos). Luego, cuando responda `fetch`, la tarjeta se actualizará con los datos más recientes directamente de la API meteorológica.

Observe cómo la solicitud de caché y la solicitud `fetch` terminan con una llamada para actualizar la tarjeta de pronóstico. ¿Cómo sabe la aplicación si muestra los últimos datos? Esto se maneja en el siguiente código de `renderForecast()` :

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L85)

```js
// If the data on the element is newer, skip the update.
if (lastUpdated >= data.currently.time) {
  return;
}
```

Cada vez que se actualiza una tarjeta, la aplicación almacena la marca de tiempo de los datos en un atributo oculto en la tarjeta. La aplicación simplemente comprueba si la marca de tiempo que ya existe en la tarjeta es más reciente que los datos que se pasaron a la función.

### Pre-cachear nuestros recursos de la aplicación

En el service worker, agregamos un `DATA_CACHE_NAME` para poder separar los datos de nuestras aplicaciones del shell de la aplicación. Cuando se actualiza el shell de la aplicación y se eliminan los cachés más antiguas, nuestros datos permanecerán intactos, listos para una carga súper rápida. Ten en cuenta que si su formato de datos cambia en el futuro, necesitará una forma de manejar eso y garantizar que el shell y el contenido de la aplicación estén sincronizados.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L21)

```js
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
```

No olvides actualizar también `CACHE_NAME`; Estaremos cambiando todos nuestros recursos estáticos también.

Para que nuestra aplicación funcione sin conexión, tenemos que almacenar previamente todos los recursos que necesita. Esto también ayudará a nuestro rendimiento. En lugar de tener que obtener todos los recursos de la red, la aplicación podrá cargarlos todos desde la caché local, eliminando la inestabilidad de la red.

Actualiza el array `FILES_TO_CACHE` con la lista de archivos:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/install.js',
  '/scripts/luxon-1.11.4.js',
  '/styles/inline.css',
  '/images/add.svg',
  '/images/clear-day.svg',
  '/images/clear-night.svg',
  '/images/cloudy.svg',
  '/images/fog.svg',
  '/images/hail.svg',
  '/images/install.svg',
  '/images/partly-cloudy-day.svg',
  '/images/partly-cloudy-night.svg',
  '/images/rain.svg',
  '/images/refresh.svg',
  '/images/sleet.svg',
  '/images/snow.svg',
  '/images/thunderstorm.svg',
  '/images/tornado.svg',
  '/images/wind.svg',
];
```

Ya que estamos generando manualmente la lista de archivos a cachear, cada vez que actualizamos un archivo, __debemos actualizar `CACHE_NAME`__. Pudimos eliminar `offline.html` de nuestra lista de archivos en caché porque nuestra aplicación ahora cuenta con todos los recursos necesarios para trabajar sin conexión y nunca volverá a mostrar la página sin conexión.

Caution: En este ejemplo, realizamos un despliegue manual de nuestro propio service worker. Cada vez que actualizamos alguno de los recursos estáticos, debemos volver a desplegar al _service worker_ y actualizar la caché, de lo contrario se servirá el contenido anterior. Además, cuando un archivo cambia, la memoria caché completa se invalida y se debe volver a descargar. Eso significa que corregir un simple error de ortografía de un solo carácter invalidará la memoria caché y requerirá que todo se descargue de nuevo, lo que no es exactamente eficiente. [Workbox](/web/tools/workbox/) maneja esto con gracia, al integrarlo en su proceso de compilación, solo se actualizarán los archivos modificados, lo que ahorrará ancho de banda para los usuarios y un mantenimiento más fácil para ti.

#### Actualizar el controlador de eventos activate

Para asegurar que nuestro evento `activate` no elimina accidentalmente nuestros datos, en el evento `activate` de `service-worker.js`, reemplaza `if (key !== CACHE_NAME) {` con:

#### public / service-worker.js

```js
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
```

#### Actualizar el controlador de eventos fetch

Necesitamos modificar el _service worker_ para interceptar las solicitudes a la API metereológica y almacenar sus respuestas en la caché, para que podamos acceder a ellas fácilmente más adelante. En la estrategia stale-while-revalidate, esperamos que la respuesta de la red sea la &quot;fuente de la verdad&quot;, siempre nos proporciona la información más reciente. Si no puede, está bien fallar porque ya hemos recuperado los últimos datos almacenados en caché en nuestra aplicación.

Actualiza el manejador de evento `fetch` para manejar las solicitudes a la API de datos por separado de otras solicitudes.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L42)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);
```

El código intercepta la solicitud y verifica si es para un pronóstico del tiempo. Si es así, usa `fetch` para realizar la solicitud. Una vez que se devuelve la respuesta, abre la memoria caché, clona la respuesta, la almacena en la memoria caché y devuelve la respuesta al solicitante original.

Necesitamos eliminar la comprobación `evt.request.mode !== 'navigate'` porque queremos que nuestro service worker maneje todas las solicitudes (incluidas imágenes, scripts, archivos CSS, etc.), no solo las navegaciones. Si dejamos ese registro, solo se entregará el HTML desde la memoria caché del service worker, todo lo demás se solicitará desde la red.

### Pruébalo

La aplicación, sin conexión, debe estar completamente funcional ahora. Actualiza la página para asegurarte de que tienes instalado el service worker más reciente, luego guarda un par de ciudades y presiona el botón de actualización en la aplicación para obtener información actualizada sobre el clima.

Luego ve al panel __Cache Storage__ en el panel __Application__ de DevTools. Expande la sección y verás el nombre de su caché estático y la caché de datos en el lado izquierdo. Al abrir la caché de datos se deben mostrar los datos almacenados para cada ciudad.

![731e91776cb6ef18.png](img/731e91776cb6ef18.png)

Luego, abre DevTools y cambia al panel service workers, y marca la casilla de verificación Offline, luego intenta volver a cargar la página, después desconecta y vuelve a cargar la página.

Si estás en una red rápida y quiere ver cómo se actualiza datos de previsión del tiempo en una conexión lenta, ajusta el `FORECAST_DELAY` propiedad en `server.js` a `5000`. Todas las solicitudes a la API de pronóstico se retrasarán 5000ms.

### Verificar cambios con Lighthouse

También es una buena idea volver a ejecutar Lighthouse.

__Auditoría SEO__

* __✅ PASADO:__ El documento tiene una meta descripción.

__Auditoría de Progressive Web App__

* __✅ PASADO:__ La página actual responde con un 200 cuando está sin conexión.
* __✅ PASADO:__ `start_url` responde con un 200 cuando está desconectado.
* __✅ PASADO:__ Registra un service worker que controla la página y `start_url.`
* __✅ PASADO:__ El manifiesto de la aplicación web cumple con los requisitos de instalación.
* __✅ PASADO:__ Configurado para una pantalla de inicio personalizada.
* __✅ PASADO:__ Establece un color de tema de la barra de direcciones.

## Añadir experiencia de instalación

Cuando se instala una Progressive Web App, se ve y se comporta como todas las demás aplicaciones instaladas. Se inicia desde el mismo lugar que se lanzan otras aplicaciones. Se ejecuta en una aplicación sin una barra de direcciones u otra interfaz de usuario del navegador. Y como todas las demás aplicaciones instaladas, es una aplicación de nivel superior en el conmutador de tareas.

![d824e1712e46a1cc.png](img/d824e1712e46a1cc.png)

En Chrome, una Progressive Web App puede instalarse a través del menú contextual de tres puntos, o puede proporcionar un botón u otro componente de UI al usuario que le pedirá que instale tu aplicación.

Success: dado que la experiencia de instalación en el menú contextual de tres puntos de Chrome está algo oculta, le recomendamos que proporcione alguna indicación dentro de tu aplicación para notificar al usuario que tu aplicación puede instalarse, y un botón de instalación para completar el proceso de instalación.

### Auditoría con Lighthouse

Para que un usuario pueda instalar tu Progressive Web App, debe cumplir con [ciertos criterios](/web/fundamentals/app-install-banners/#criteria). La forma más fácil de verificar es usar Lighthouse y asegurarse de que cumpla con los criterios instalables.

![b921f5583fcddf03.png](img/b921f5583fcddf03.png)

Si has trabajado con este código, tu PWA ya debería cumplir con estos criterios.

Key Point: Para esta sección, habilita la casilla de verificación **Bypass for network** en el panel **service workers** del panel **Application** en DevTools. Cuando está marcado, las solicitudes omiten al _service worker_ y se envían directamente a la red. Esto simplifica nuestro proceso de desarrollo ya que no tenemos que actualizar nuestro service worker mientras trabajamos en esta sección.

### Agrega install.js a index.html

Primero, agregamos el `install.js` a nuestro archivo `index.html`.

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L204)

```html
<!-- CODELAB: Add the install script here -->
<script src="/scripts/install.js"></script>
```

### Escucha el evento `beforeinstallprompt`

Si se cumple la función de agregar a la pantalla de inicio [criterio](/web/fundamentals/app-install-banners/#criteria), Chrome activará un evento de `beforeinstallprompt`, que puede usar para indicar que tu aplicación se puede &quot;instalar&quot; y luego solicitar al usuario que la instale. Agrega el siguiente código para escuchar el evento `beforeinstallprompt` :

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L24)

```js
// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
```

### Evento guardar y mostrar el botón de instalación

En nuestra función `saveBeforeInstallPromptEvent`, `saveBeforeInstallPromptEvent` una referencia al evento `beforeinstallprompt` para poder llamar a `prompt()` más adelante y actualizar nuestra interfaz de usuario para mostrar el botón de instalación.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L34)

```js
// CODELAB: Add code to save event & show the install button.
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
```

### Mostrar el prompt / ocultar el botón

Cuando el usuario hace clic en el botón de instalación, debemos llamar a `.prompt()` en el evento `beforeinstallprompt` guardado. También necesitamos ocultar el botón de instalación, porque solo se puede llamar a `.prompt()` una vez en cada evento guardado.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L45)

```js
// CODELAB: Add code show install prompt & hide the install button.
deferredInstallPrompt.prompt();
// Hide the install button, it can't be called twice.
evt.srcElement.setAttribute('hidden', true);
```

Al llamar a `.prompt()` se mostrará un diálogo modal al usuario y se te pedirá que agregues tu aplicación a la pantalla de inicio.

### Registrar los resultados

Puedes verificar qué respondió el usuario al cuadro de diálogo de instalación escuchando la promesa que devuelve la propiedad `userChoice` del evento `beforeinstallprompt` salvado. La promesa devuelve un objeto con una propiedad `outcome` después de que se haya mostrado la solicitud y el usuario haya respondido a ella.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L47)

```js
// CODELAB: Log user response to prompt.
deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });
```

Un comentario sobre `userChoice`, [la especificación lo define como una propiedad](https://w3c.github.io/manifest/#beforeinstallpromptevent-interface), no es una función como podría esperarse.

#### Registrar todos los eventos de instalación

Adicionalmente a cualquier UI que añadadas para instalar tu aplicación, los usuarios también pueden instalar tu PWA a través de otros métodos, por ejemplo, el menú de tres puntos de Chrome. Para rastrear estos eventos, escuche el evento instalado.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L51)

```js
// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
```

Después, necesitaremos actualizar la función `logAppInstalled`, para este laboratorio de código, solo usaremos `console.log`, pero en una aplicación de producción, probablemente desearás registrar esto como un evento en tu software de analíticas.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L60)

```js
// CODELAB: Add code to log the event
console.log('Aplicación meteorológica fue instalada.', evt);
```

### Actualizar el service worker

No olvides actualizar `CACHE_NAME` en tu archivo `service-worker.js`, ya que has realizado cambios en los archivos que ya están en caché. Habilitar la casilla de verificación __Bypass for network__ en el panel service workers del panel de aplicaciones en DevTools funcionará en el desarrollo, pero no ayudará en el mundo real.

### Pruébalo

Vamos a ver cómo fue nuestro paso de instalación. Para estar seguro, usa el botón __Clear site data__ en el panel de aplicaciones de DevTools para eliminar todo y asegurarte de que estamos comenzando de nuevo. Si ya instalaste la aplicación, asegúrate de desinstalarla, de lo contrario, el icono de instalación no volverá a aparecer.

#### Verifica que el botón de instalación esté visible

Primero, verificamos que nuestro ícono de instalación se muestre correctamente, asegúrate de probar esto tanto en el escritorio como en el móvil.

1. Abre la URL en una nueva pestaña de Chrome.
2. Abre el menú de tres puntos de Chrome (junto a la barra de direcciones).
▢ Verifica que vea &quot;*Instalar Clima...*&quot; en el menú.
3. Actualiza los datos metereológicos con el botón de actualización en la esquina superior derecha para asegurarnos de que cumplimos con las [heurística de compromiso del usuario](/web/fundamentals/app-install-banners/#criteria).
▢ Verifica que el icono de instalación esté visible en el encabezado de la aplicación.

#### Verifica que el botón de instalación funcione

A continuación, nos aseguramos de que todo se instala correctamente y de que nuestros eventos se activan correctamente. Puedes hacerlo tanto en tu escritorio como en tu móvil. Si deseas probar esto en el móvil, asegúrate de que estás utilizando la depuración remota para poder ver lo que se está registrado en la consola.

1. Abre Chrome y, en una nueva pestaña del navegador, navega a tu PWA Clima.
2. Abre DevTools y cambia al panel de la consola.
3. Haz clic en el botón de instalación en la esquina superior derecha.
▢ Verifica que el botón de instalación desaparezca
▢ Verifica que se muestra el cuadro de diálogo modal de instalación.
4. Haz clic en Cancelar.
▢ Verifica que &quot;*El usuario rechazó la solicitud A2HS*&quot; se muestra en la salida de la consola.
▢ Verifica que el botón de instalación vuelva a aparecer.
5. Haz clic en el botón Instalar nuevamente, luego haz clic en el botón Instalar en el diálogo modal.
▢ Verifica que &quot;*El usuario aceptó la solicitud A2HS*&quot; se muestra en la salida de la consola.
▢ Verifica que &quot;*aplicación meteorológica se haya instalado*&quot; se muestre en la salida de la consola.
▢ Verifica que la aplicación meteorológica se agrega al lugar donde normalmente encontrará las aplicaciones.
6. Inicia la PWA Clima.
▢ Verifica que la aplicación se abre como una aplicación independiente, ya sea en una ventana de la aplicación en el escritorio o en pantalla completa en el móvil.

Ten en cuenta que si está ejecutando en el escritorio desde localhost, tu PWA instalada puede mostrar una pancarta de dirección porque localhost no se considera un host seguro.

#### Verifica que la instalación de iOS funcione correctamente

Veamos también el comportamiento en iOS. Si tienes un dispositivo iOS, puedes usarlo, o si estás usando un Mac, prueba el simulador de iOS disponible con Xcode.

1. Abre Safari y en una nueva pestaña del navegador, navega a tu PWA Clima.
2. Haz clic en el botón *Compartir*! [8ac92dd483c689d3.png](img/8ac92dd483c689d3.png) .
3. Desplázate hacia la derecha y Haz clic en el botón *Agregar a la pantalla de inicio*.
▢ Verifica que el título, la URL y el icono sean correctos.
4. Haz clic en *Agregar.*
▢ Verifica que el icono de la aplicación se agrega a la pantalla de inicio.
5. Inicia la PWA Clima desde la pantalla de inicio.
▢ Verifica que la aplicación se inicia en pantalla completa.

### Bonus: ### si tu aplicación se inicia desde la pantalla de inicio

La media query `display-mode` permite aplicar estilos dependiendo de cómo se lanzó la aplicación, o determinar cómo se lanzó con JavaScript.

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```

También puedes comprobar la media query `display-mode` con [JavaScript para ver si estás ejecutándola independientemente](/web/fundamentals/app-install-banners/#detect-mode) .

### Bonus: Desinstalando tu PWA

Recuerda, `beforeinstallevent` no se dispara si la aplicación ya está instalada, por lo que durante el desarrollo probablemente querrás instalarla y desinstalarla varias veces para asegurarte de que todo funciona como se esperaba.

#### Android

En Android se desinstalan de la misma manera que otras aplicaciones instaladas.

* Abre el cajón de aplicaciones.
* Desplázate hacia abajo para encontrar el icono del tiempo.
* Arrastra el ícono de la aplicación a la parte superior de la pantalla.
* Elige *Desinstalar.*

#### ChromeOS

En ChromeOS, las PWA se desinstalan fácilmente desde el cuadro de búsqueda del iniciador.

* Abre el lanzador.
* Escribe &quot;*Clima*&quot; en el cuadro de búsqueda, tu PWA Clima debería aparecer en los resultados.
* Haz clic derecho (alt-clic) en la PWA Clima.
* Haz clic en *Eliminar de Chrome...*

#### macOS y Windows

En Mac y Windows se deben desinstalar a través de Chrome.

* En una nueva pestaña del navegador, abre chrome://apps.
* Haz clic derecho (alt-clic) en la PWA Clima.
* Haz clic en *Eliminar de Chrome...*

## Felicitaciones

¡Enhorabuena, has construido con éxito tu primera Progressive Web App!

Agregaste un manifiesto de aplicación web para permitir que se instalara, y agregaste un service worker para garantizar que tu PWA sea siempre rápida y confiable. Has aprendido cómo usar DevTools para auditar una aplicación y cómo esto puede mejorar la experiencia de usuario.

Ahora conoce los pasos clave necesarios para convertir cualquier aplicación web en una Progressive Web App.

### Lectura adicional

* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Service Worker Caching Strategies Based on Request Types](https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c)

### referencia

* [Web App Manifest docs](/web/fundamentals/web-app-manifest)
* [Web App Manifest properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members)
* [Install & Add to Home Screen](/web/fundamentals/app-install-banners/)
* [Service Worker Overview](/web/fundamentals/primers/service-workers/)
* [Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)
* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)

## Encontró un problema o tiene comentarios? {: .hide-from-toc }

Ayúdanos a mejorar nuestros laboratorios de códigos enviando una [issue](https://github.com/googlecodelabs/your-first-pwapp/issues) hoy. ¡Y gracias!
