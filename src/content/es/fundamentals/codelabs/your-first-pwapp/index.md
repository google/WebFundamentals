project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{% include "web/_shared/machine-translation-start.html" %}

{# wf_auto_generated #}
{# wf_updated_on: 2019-04-19 #}
{# wf_published_on: 2016-01-01 #}

# Tu primera Progressive Web App {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

## Introducción

### ¿Qué hace que una aplicación web, una aplicación web progresiva?

Las aplicaciones web progresivas brindan una experiencia instalable, similar a una aplicación en computadoras de escritorio y móviles, que se crean y entregan directamente a través de la web. Son aplicaciones web que son rápidas y confiables. Y lo más importante, son aplicaciones web que funcionan en cualquier navegador. Si está creando una aplicación web hoy, ya está en el camino hacia la creación de una aplicación web progresiva.

#### rápido y confiable

Cada experiencia web debe ser rápida, y esto es especialmente cierto para las aplicaciones web progresivas. Rápido se refiere al tiempo que se tarda en obtener contenido significativo en la pantalla y brinda una experiencia interactiva en menos de 5 segundos.

Y, debe ser __reliablemente rápido__. Es difícil enfatizar lo suficiente el rendimiento confiable. Piénsalo de esta manera: la primera carga de una aplicación nativa es frustrante. Está cerrado por una tienda de aplicaciones y una descarga enorme, pero una vez que llega a un punto donde se instala la aplicación, ese costo inicial se amortiza en todos los inicios de la aplicación, y ninguno de esos inicios tiene un retraso variable. Cada inicio de aplicación es tan rápido como el último, sin variación. Una aplicación web progresiva debe ofrecer este rendimiento confiable que los usuarios esperan de cualquier experiencia instalada.

#### Instalable

Las aplicaciones web progresivas pueden ejecutarse en una pestaña del navegador, pero también son instalables. Marcar un sitio simplemente agrega un acceso directo, pero una aplicación web progresiva instalada se ve y se comporta como todas las demás aplicaciones instaladas. Se inicia desde el mismo lugar que se lanzan otras aplicaciones. Puede controlar la experiencia de lanzamiento, incluida una pantalla de inicio personalizada, iconos y más. Se ejecuta como una aplicación, en una ventana de aplicación sin una barra de direcciones u otra interfaz de usuario del navegador. Y como todas las demás aplicaciones instaladas, es una aplicación de nivel superior en el conmutador de tareas.

Recuerde, es fundamental que un PWA instalable sea rápido y confiable. Los usuarios que instalan un PWA esperan que sus aplicaciones funcionen, sin importar en qué tipo de conexión de red estén conectadas. Es una expectativa de referencia que todas las aplicaciones instaladas deben cumplir.

#### Mobile &amp; Desktop

Mediante el uso de técnicas de diseño receptivo, Progressive Web Apps funciona tanto en el escritorio __ móvil como en el de escritorio, utilizando una base de código única entre plataformas. Si está considerando escribir una aplicación nativa, eche un vistazo a los beneficios que ofrece una PWA.

### Qué construirás

En este código, vas a construir una aplicación web del tiempo utilizando las técnicas de la aplicación web progresiva. Su aplicación:

* Usa diseño responsivo, por lo que funciona en computadoras de escritorio o móviles.
* Sea rápido, use un trabajador del servicio para guardar en antememoria los recursos de la aplicación (HTML, CSS, JavaScript, imágenes) necesarios para ejecutar y almacenar en caché los datos meteorológicos en tiempo de ejecución para mejorar el rendimiento.
* Sea instalable, utilizando un manifiesto de aplicación web y el evento `beforeinstallprompt` para notificar al usuario que es instalable.

![95fe6f7fbeee5bb1.png](img/95fe6f7fbeee5bb1.png)

Warning: para simplificar este código y explicar los fundamentos de proporcionar una experiencia fuera de línea, estamos usando JavaScript de vainilla. En una aplicación de producción, le recomendamos que utilice herramientas como [Workbox](/web/tools/workbox/) para construir su trabajador de servicio. Elimina muchos de los bordes afilados y las esquinas oscuras con las que puede encontrarse.

### Lo que aprenderás

* Cómo crear y agregar un manifiesto de aplicación web.
* Cómo proporcionar una experiencia fuera de línea simple
* Cómo proporcionar una experiencia fuera de línea completa
* Como hacer instalable tu aplicación

Este código está enfocado en aplicaciones web progresivas. Los conceptos y los bloques de código no relevantes se pasan por alto y se proporcionan para que usted simplemente copie y pegue.

### Lo que necesitarás

* Una versión reciente de los PWA de Chrome (74 o posterior) son solo aplicaciones web y funcionan en todos los navegadores, pero usaremos algunas funciones de Chrome DevTools para comprender mejor lo que está sucediendo en el nivel del navegador y usarlo para prueba la experiencia de instalación.
* Conocimiento de HTML, CSS, JavaScript y [Chrome DevTools](https://developer.chrome.com/devtools) .

## Preparándose

### Consigue una clave para la API de Dark Sky

Nuestros datos meteorológicos provienen de [Dark Sky API](https://darksky.net/dev) . Para poder usarlo, deberás solicitar una clave API. Es fácil de usar y gratis para proyectos no comerciales.

[Register for API Key](https://darksky.net/dev/register)

Note: Aún puedes completar este código de código sin una clave de API de Dark Sky. Si nuestro servidor no puede obtener datos reales de la API de Dark Sky, devolverá datos falsos en su lugar.

#### Verifica que tu clave API esté funcionando correctamente

Para probar que su clave de API funciona correctamente, realice una solicitud HTTP a la API de DarkSky. Actualice la URL a continuación para reemplazar `DARKSKY_API_KEY` con su clave API. Si todo funciona, debería ver el último pronóstico del tiempo para la ciudad de Nueva York.

`https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319`

### Consigue el código

Hemos puesto todo lo que necesitas para este proyecto en un repositorio de Git. Para comenzar, deberás tomar el código y abrirlo en tu entorno de desarrollo favorito. Para este código, recomendamos utilizar Glitch.

#### Muy recomendable: usa Glitch para importar el repositorio

Usar Glitch es el método recomendado para trabajar a través de este código.

1. Abra una nueva pestaña del navegador y vaya a [https://glitch.com](https://glitch.com) .
2. Si no tienes una cuenta, deberás registrarte.
3. Haga clic en __New Project__, luego __Clone from Git Repo .__
4. Clone __https: //github.com/googlecodelabs/your-first-pwapp.git__ y haga clic en Aceptar.
5. Una vez que se haya cargado el repositorio, edite el archivo `.env` y actualícelo con su clave de API DarkSky.
6. Haga clic en el botón __Mostrar Live__ para ver el PWA en acción.

Alternativa de #### : Descargar código y trabajar localmente

Si desea descargar el código y trabajar de manera local, deberá tener una versión reciente de Node y la configuración del editor de códigos y listo para usar.

Caution: si trabaja localmente, algunas de las auditorías de Lighthouse no se aprobarán y es posible que la instalación no esté disponible porque el servidor local no sirve el contenido en un contexto seguro.

[Download source code](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

1. Desembale el archivo zip descargado.
2. Ejecute `npm install` para instalar las dependencias necesarias para ejecutar el servidor.
3. Edite `server.js` y configure la clave de la API de DarkSky.
4. Ejecute `node server.js` para iniciar el servidor en el puerto 8000.
5. Abra una pestaña del navegador en [http://localhost:8000](http://localhost:8000)

## Establecer una línea de base

### ¿Cuál es nuestro punto de partida?

Nuestro punto de partida es una aplicación meteorológica básica diseñada para este código. El código se ha simplificado demasiado para mostrar los conceptos en este código de código y tiene poco manejo de errores. Si elige reutilizar cualquiera de este código en una aplicación de producción, asegúrese de manejar cualquier error y probar completamente todo el código.

Algunas cosas para probar ...

1. Agrega una nueva ciudad con el botón más azul en la esquina inferior derecha. 2. Actualice los datos con el botón de actualización en la esquina superior derecha. 3. Borre una ciudad usando la x en la parte superior derecha de cada tarjeta de ciudad. 4. Vea cómo funciona en el escritorio y en el móvil. 5. Mira lo que pasa cuando te desconectas. 6. Usando el panel de la Red de Chrome, vea qué sucede cuando la red se limita a Slow 3G. 7. Agregue un retraso al servidor de pronóstico cambiando `FORECAST_DELAY` en `server.js`

### Auditoría con Faro

[Lighthouse](/web/tools/lighthouse/#devtools) es una herramienta fácil de usar para ayudar a mejorar la calidad de sus sitios y páginas. Cuenta con auditorías de rendimiento, accesibilidad, aplicaciones web progresivas y más. Cada auditoría tiene un documento de referencia que explica por qué la auditoría es importante, así como la forma de solucionarla.

![b112675caafccef0.png](img/b112675caafccef0.png)

Usaremos Lighthouse para auditar nuestra aplicación Weather y verificar los cambios que hemos realizado.

Note: Puede ejecutar Lighthouse en Chrome DevTools, desde la línea de comandos o como un módulo de nodo. Considere [adding Lighthouse](https://github.com/GoogleChromeLabs/lighthousebot) en su proceso de compilación para asegurarse de que su aplicación web no retroceda.

### Vamos a correr el faro

1. Abra su proyecto en una nueva pestaña.
2. Abra Chrome DevTools y cambie a la pestaña __Audits__, DevTools muestra una lista de categorías de auditoría, déjelas todas habilitadas.
3. Haga clic en __Ejecutar auditorías__, después de 60-90 segundos, Lighthouse le da un informe en la página.

### La auditoría progresiva de la aplicación web

Nos centraremos en los resultados de la auditoría de la aplicación web progresiva.

![af1a64a13725428e.png](img/af1a64a13725428e.png)

Y hay mucho rojo para centrarse en:

* __❗FRACASADO:__ La página actual no responde con un 200 cuando está desconectado.
* __❗FRACASADO:__ `start_url` no responde con un 200 cuando está desconectado.
* __❗FRACASADO:__ No registra un trabajador de servicio que controla la página y `start_url.`
* __❗FRACASADO:__ El manifiesto de la aplicación web no cumple con los requisitos de instalación.
* __❗FRACASADO:__ No está configurado para una pantalla de inicio personalizada.
* __❗FRACASADO:__ No establece un color de tema de la barra de direcciones.

¡Saltemos y comencemos a solucionar algunos de estos problemas!

## Añadir un manifiesto de aplicación web

Al final de esta sección, nuestra aplicación meteorológica pasará las siguientes auditorías:

* El manifiesto de la aplicación web no cumple con los requisitos de instalación.
* No está configurado para una pantalla de inicio personalizada.
* No establece un color de tema de la barra de direcciones.

### Crear el manifiesto de la aplicación web.

[web app manifest](/web/fundamentals/web-app-manifest) es un archivo JSON simple que le brinda a usted, el desarrollador, la capacidad de controlar cómo su aplicación se muestra al usuario.

Usando el manifiesto de la aplicación web, su aplicación web puede:

* Indique al navegador que desea que se abra su aplicación en una ventana independiente ( `display` ).
* Defina qué página se abre cuando la aplicación se inicia por primera vez ( `start_url` ).
* Defina cómo debería ser la aplicación en el dock o el `short_name` aplicación ( `short_name` , `icons` ).
* Crear una pantalla de `name` ( `name` , `icons` , `colors` ).
* Indique al navegador que abra la ventana en modo horizontal o retrato ( `orientation` ).
* Y [plenty more](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members) .

Cree un archivo llamado `public/manifest.json` en su proyecto y copie / pegue los siguientes contenidos:

`public/manifest.json`

```json
{
  "name": "Weather",
  "short_name": "Weather",
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

A continuación, debemos informarle al navegador acerca de nuestro manifiesto agregando `<link rel="manifest"...` a cada página de nuestra aplicación. Agregue la siguiente línea al elemento `<head>` en su archivo `index.html` .

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L30)

```html
<!-- CODELAB: Add link rel manifest -->
<link rel="manifest" href="/manifest.json">
```

#### DevTools Desvío

DevTools proporciona una manera rápida y fácil de revisar su archivo `manifest.json` . Abra el panel __Manifest__ en el panel __Aplication__. Si ha agregado la información del manifiesto correctamente, podrá verla analizada y mostrada en un formato fácil de usar en este panel.

![c462743e1bc26958.png](img/c462743e1bc26958.png)

### Añadir meta etiquetas e íconos de iOS

Safari en iOS no admite el manifiesto de aplicación web ( [yet](https://webkit.org/status/#specification-web-app-manifest) ), por lo que deberá agregar [traditional `meta` tags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) a `<head>` de su archivo `index.html` :

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L31)

```html
<!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
```

Bono ### : ### fáciles de Faro

Nuestra auditoría de Lighthouse mencionó algunas otras cosas que son bastante fáciles de arreglar, así que cuidémoslas mientras estamos aquí.

#### Establecer la descripción meta

Bajo la auditoría de SEO, Lighthouse anotó que nuestras descripciones de &quot; [Document does not have a meta description.](/web/tools/lighthouse/audits/description) &quot; se pueden mostrar en los resultados de búsqueda de Google. Las descripciones únicas y de alta calidad pueden hacer que sus resultados sean más relevantes para los usuarios de búsqueda y pueden aumentar su tráfico de búsqueda.

Para agregar una descripción, agregue la siguiente etiqueta `meta` a `<head>` de su documento:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L32)

```html
<!-- CODELAB: Add description here -->
<meta name="description" content="A sample weather app">
```

#### Establecer el color del tema de la barra de direcciones

En la auditoría de PWA, Lighthouse observó nuestra aplicación &quot; [Does not set an address-bar theme color](/web/tools/lighthouse/audits/address-bar) &quot;. El hecho de que la barra de direcciones del navegador coincida con los colores de su marca proporciona una experiencia de usuario más envolvente.

Para establecer el color del tema en el móvil, agregue la siguiente etiqueta `meta` a `<head>` de su documento:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L33)

```html
<!-- CODELAB: Add meta theme-color -->
<meta name="theme-color" content="#2F3BA2" />
```

### Verificar cambios con el faro

Ejecute Lighthouse nuevamente (haciendo clic en el signo + en la esquina superior izquierda del panel Auditorías) y verifique sus cambios.

__Esa Audit__

* __✅ PASADO:__ El documento tiene una meta descripción.

__Auditoría de aplicación web progresiva__

* __❗FRACASADO:__ La página actual no responde con un 200 cuando está desconectado.
* __❗FRACASADO:__ `start_url` no responde con un 200 cuando está desconectado.
* __❗FRACASADO:__ No registra un trabajador de servicio que controla la página y `start_url.`
* __✅ PASADO:__ El manifiesto de la aplicación web cumple con los requisitos de instalación.
* __✅ PASADO:__ Configurado para una pantalla de inicio personalizada.
* __✅ PASADO:__ Establece un color de tema de la barra de direcciones.

## Proporciona una experiencia offline básica

Los usuarios esperan que las aplicaciones instaladas siempre tengan una experiencia de referencia si están fuera de línea. Por eso es fundamental que las aplicaciones web instalables nunca muestren el dinosaurio sin conexión de Chrome. La experiencia sin conexión puede abarcar desde una página sin conexión simple hasta una experiencia de solo lectura con datos almacenados previamente en caché, hasta una experiencia sin conexión totalmente funcional que se sincroniza automáticamente cuando se restaura la conexión de red.

En esta sección, agregaremos una página sin conexión simple a nuestra aplicación de clima. Si el usuario intenta cargar la aplicación mientras está fuera de línea, mostrará nuestra página personalizada, en lugar de la página sin conexión típica que muestra el navegador. Al final de esta sección, nuestra aplicación meteorológica pasará las siguientes auditorías:

* La página actual no responde con un 200 cuando está desconectado.
* `start_url` no responde con un 200 cuando está desconectado.
* No registra un trabajador de servicio que controla la página y `start_url.`

En la siguiente sección, reemplazaremos nuestra página sin conexión personalizada con una experiencia sin conexión completa. Esto mejorará la experiencia fuera de línea, pero lo que es más importante, mejorará significativamente nuestro rendimiento, ya que la mayoría de nuestros activos (HTML, CSS y JavaScript) se almacenarán y servirán localmente, eliminando la red como un posible cuello de botella.

### Servicio de trabajadores al rescate

Si no está familiarizado con los trabajadores de servicio, puede obtener una comprensión básica leyendo [Introduction To Service Workers](/web/fundamentals/primers/service-worker/) sobre lo que pueden hacer, cómo funciona su ciclo de vida y más. Una vez que haya completado este laboratorio de código, asegúrese de revisar [Debugging Service Workers code lab](http://goo.gl/jhXCBy) para obtener una [Debugging Service Workers code lab](http://goo.gl/jhXCBy) más detallada de cómo trabajar con los trabajadores de servicio.

Las funciones proporcionadas a través de los trabajadores del servicio se deben considerar una mejora progresiva y se deben agregar solo si el navegador las admite. Por ejemplo, con los trabajadores de servicios puede almacenar en caché [app shell](/web/fundamentals/architecture/app-shell) y los datos de su aplicación, de modo que esté disponible incluso cuando la red no lo esté. Cuando los trabajadores del servicio no son compatibles, no se llama al código sin conexión y el usuario obtiene una experiencia básica. El uso de la detección de características para proporcionar mejoras progresivas tiene poca sobrecarga y no se interrumpirá en los navegadores antiguos que no son compatibles con esa característica.

Warning: la funcionalidad del trabajador de servicio solo está disponible en las páginas a las que se accede a través de HTTPS (http: // localhost y sus equivalentes también funcionarán para facilitar las pruebas).

### Registrar el trabajador de servicio

El primer paso es registrar al trabajador del servicio. Agregue el siguiente código a su archivo `index.html` :

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

Este código verifica si la API del trabajador de servicios está disponible y, si lo está, el trabajador de servicios en `/service-worker.js` se registra una vez que la página es [loaded](/web/fundamentals/primers/service-workers/registration) .

Tenga en cuenta que el trabajador de servicios se sirve desde el directorio raíz, no desde un directorio `/scripts/` . Esta es la forma más fácil de configurar __ `scope` __ de su trabajador de servicio. El `scope` del trabajador del servicio determina qué archivos controla el trabajador del servicio, es decir, desde qué ruta el trabajador del servicio interceptará las solicitudes. El valor predeterminado de `scope` es la ubicación del archivo de trabajador de servicio y se extiende a todos los directorios a continuación. Entonces, si `service-worker.js` se encuentra en el directorio raíz, el trabajador del servicio controlará las solicitudes de todas las páginas web en este dominio.

### Precache página sin conexión

Primero, debemos decirle al trabajador de servicio qué almacenar en caché. Ya hemos creado un simple [offline page](https://your-first-pwa.glitch.me/offline.html) ( `public/offline.html` ) que se mostrará cada vez que no haya conexión de red.

En su `service-worker.js` , agregue `'/offline.html',` a la matriz de `FILES_TO_CACHE` , el resultado final debería verse así:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/offline.html',
];
```

A continuación, debemos actualizar el evento `install` para indicar al trabajador de servicios que `install` en antememoria la página sin conexión:

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

Note: los eventos y el ciclo de vida del trabajador de servicio se tratan en la siguiente sección.

Nuestro evento `install` ahora abre el caché con `caches.open()` y proporciona un nombre de caché. Proporcionar un nombre de caché nos permite la versión de archivos, o datos separados de los recursos almacenados en caché para que podamos actualizar fácilmente uno pero no afecte al otro.

Una vez que el caché está abierto, podemos llamar a `cache.addAll()` , que toma una lista de URL, las obtiene del servidor y agrega la respuesta al caché. Tenga en cuenta que `cache.addAll()` rechazará si falla alguna de las solicitudes individuales. Eso significa que tiene la garantía de que, si el paso de instalación se realiza correctamente, su caché estará en un estado consistente. Pero, si falla por alguna razón, lo intentará de nuevo automáticamente la próxima vez que se inicie el trabajador de servicio.

#### DevTools Desvío

Veamos cómo puede usar DevTools para comprender y depurar a los trabajadores de servicios. Antes de volver a cargar su página, abra DevTools, vaya al panel __Service Workers__ en el panel __Aplication__. Debe tener un aspecto como este:

![b3aa37b67863fd03.png](img/b3aa37b67863fd03.png)

Cuando ve una página en blanco como esta, significa que la página actualmente abierta no tiene ningún trabajador de servicio registrado.

Ahora, recarga tu página. El panel Trabajadores de servicio ahora debería tener este aspecto:

![69808e4bf3aee41b.png](img/69808e4bf3aee41b.png)

Cuando vea información como esta, significa que la página tiene un trabajador de servicio en ejecución.

Junto a la etiqueta de estado, hay un número (*34251* en este caso), vigile ese número mientras trabaja con los trabajadores de servicio. Es una manera fácil de saber si su trabajador de servicio ha sido actualizado.

### Limpieza de páginas sin conexión antiguas

Usaremos el evento `activate` para limpiar los datos antiguos en nuestro caché. Este código garantiza que su trabajador de servicio actualice su caché cada vez que cambie alguno de los archivos de shell de la aplicación. Para que esto funcione, necesitaría incrementar la variable `CACHE_NAME` en la parte superior de su archivo de trabajador de servicio.

Agregue el siguiente código a su evento `activate` :

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

#### DevTools Desvío

Con el panel Trabajadores de servicio abierto, actualice la página, verá el nuevo trabajador de servicio instalado y el incremento del número de estado.

![1db827d76bc0b359.png](img/1db827d76bc0b359.png)

El trabajador del servicio actualizado toma el control inmediatamente porque nuestro evento `install` finaliza con `self.skipWaiting()` y el evento `activate` finaliza con `self.clients.claim()` . Sin esos, el trabajador de servicio anterior continuaría controlando la página siempre que haya una pestaña abierta en la página.

### solicitudes de red fallidas

Y finalmente, necesitamos manejar los eventos de `fetch` . Vamos a utilizar un [network, falling back to cache strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache) . El trabajador del servicio primero intentará recuperar el recurso de la red, si eso falla, devolverá la página fuera de línea del caché.

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

El controlador `fetch` solo necesita manejar las navegaciones de la página, por lo que otras solicitudes pueden ser eliminadas del controlador y serán tratadas normalmente por el navegador. Pero, si la solicitud `.mode` es `navigate` , use `fetch` para intentar obtener el elemento de la red. Si falla, el manejador de `catch` abre el caché con `caches.open(CACHE_NAME)` y usa `cache.match('offline.html')` para obtener la página sin conexión de predefinido. El resultado se devuelve al navegador mediante `evt.respondWith()` .

Key Point: envolver la llamada `fetch` en [`evt.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) evita el manejo de recuperación predeterminado del navegador y le dice al navegador que queremos manejar la respuesta por nosotros mismos. Si no llama a `evt.respondWith()` dentro de un controlador de `fetch` , solo obtendrá el comportamiento de red predeterminado.

#### DevTools Desvío

Revisemos para asegurarnos de que todo funcione como lo esperamos. Con el panel Trabajadores de servicio abierto, actualice la página, verá el nuevo trabajador de servicio instalado y el incremento del número de estado.

También podemos verificar qué ha sido almacenado en caché. Vaya al panel __Cache Storage__ en el panel __Aplicación__ de DevTools. Haga clic con el botón derecho en __Caché de almacenamiento__, seleccione __Refrescar cachés__, expanda la sección y debería ver el nombre de su caché estático en el lado izquierdo. Al hacer clic en el nombre de la memoria caché se muestran todos los archivos que están en caché.

![c80a2a2e93c1c3ee.png](img/c80a2a2e93c1c3ee.png)

Ahora, vamos a probar el modo fuera de línea. Vuelva al panel __Service Workers__ de DevTools y marque la casilla __Offline__. Después de comprobarlo, debería ver un pequeño icono de advertencia amarillo junto a la pestaña del panel __Network__. Esto indica que estás desconectado.

![984b34dc2aa667a.png](img/984b34dc2aa667a.png)

Recarga tu página y ... ¡funciona! ¡Obtenemos __our__ panda desconectado, en lugar del dino desconectado de Chrome!

### Consejos para los trabajadores de servicio de prueba

Depurar a los trabajadores del servicio puede ser un desafío, y cuando se trata de almacenamiento en caché, las cosas pueden convertirse en una pesadilla aún más si el caché no se actualiza cuando se espera. Entre el ciclo de vida típico de un trabajador de servicio y un error en su código, puede frustrarse rápidamente. __Pero no .__

#### Usar DevTools

En el panel Trabajadores de servicio del panel de la aplicación, hay algunas casillas de verificación que harán su vida mucho más fácil.

![c7ac93904f473a91.png](img/c7ac93904f473a91.png)

* __Offline__ - Cuando se marca, simula una experiencia fuera de línea y evita que cualquier solicitud vaya a la red.
* __Actualización en la recarga__ - Cuando se marque, se obtendrá el trabajador de servicio más reciente, se instalará y se activará de inmediato.
* __Bypass para red__ - Cuando las solicitudes verificadas pasan por alto al trabajador del servicio y se envían directamente a la red.

#### Start Fresh

En algunos casos, es posible que esté cargando datos en caché o que las cosas no se actualicen como espera. Para borrar todos los datos guardados (localStorage, indexedDB data, cached files) y eliminar cualquier trabajador de servicio, use el panel Borrar almacenamiento en la pestaña Aplicación. Alternativamente, también puede trabajar en una ventana de incógnito.

![398bbcd285e2c5dd.png](img/398bbcd285e2c5dd.png)

Consejos adicionales:

* Una vez que un trabajador de servicio no ha sido registrado, puede permanecer en la lista hasta que se cierre la ventana que contiene el navegador.
* Si hay varias ventanas abiertas para su aplicación, un nuevo trabajador de servicio no entrará en vigencia hasta que todas las ventanas hayan sido recargadas y actualizadas al último trabajador de servicio.
* ¡Desregistrar un trabajador de servicio no borra el caché!
* Si existe un trabajador de servicio y un nuevo trabajador de servicio está registrado, el nuevo trabajador de servicio no tomará el control hasta que la página se [take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) cargar, a menos que sea [take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) .

### Verificar cambios con el faro

Ejecuta Lighthouse nuevamente y verifica tus cambios. ¡No olvide desactivar la casilla de verificación Sin conexión antes de verificar sus cambios!

__Esa Audit__

* __✅ PASADO:__ El documento tiene una meta descripción.

__Auditoría de aplicación web progresiva__

* __✅ PASADO:__ La página actual responde con un 200 cuando está fuera de línea.
* __✅ PASADO:__ `start_url` responde con un 200 cuando está desconectado.
* __✅ PASADO:__ Registra un trabajador de servicio que controla la página y `start_url.`
* __✅ PASADO:__ El manifiesto de la aplicación web cumple con los requisitos de instalación.
* __✅ PASADO:__ Configurado para una pantalla de inicio personalizada.
* __✅ PASADO:__ Establece un color de tema de la barra de direcciones.

## Brindar una experiencia fuera de línea completa

Tómese un momento, ponga su teléfono en modo avión e intente ejecutar algunas de sus aplicaciones favoritas. En casi todos los casos, proporcionan una experiencia fuera de línea bastante robusta. Los usuarios esperan que la experiencia robusta de sus aplicaciones. Y la web no debería ser diferente. Las aplicaciones web progresivas deben diseñarse con fuera de línea como escenario central.

Key Point: Diseñar para fuera de línea primero puede mejorar drásticamente el rendimiento de su aplicación web al reducir el número de solicitudes de red realizadas por su aplicación, en lugar de eso, los recursos pueden ser predefinidos y servidos directamente desde el caché local. ¡Incluso con la conexión de red más rápida, el servicio desde el caché local será más rápido!

### Servicio de ciclo de vida del trabajador

El ciclo de vida del trabajador del servicio es la parte más complicada. Si no sabe qué es lo que está tratando de hacer y cuáles son los beneficios, puede sentir que está luchando contra usted. Pero una vez que sepa cómo funciona, puede ofrecer actualizaciones integrales y discretas a los usuarios, mezclando lo mejor de la web y los patrones nativos.

Key Point: Este código de código solo cubre los conceptos básicos del ciclo de vida del trabajador de servicio. Para profundizar más, consulte [The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle) artículo sobre WebFundamentals.

#### `install`

El primer evento que recibe un trabajador de servicio es `install` . Se activa tan pronto como el trabajador se ejecuta, y solo se llama una vez por trabajador del servicio. __Si modifica la secuencia de comandos de su trabajador de servicio, el navegador lo considerará un trabajador de servicio diferente__, y obtendrá su propio evento `install` .

![72ed77b1720512da.png](img/72ed77b1720512da.png)

Normalmente, el evento `install` se usa para almacenar en caché todo lo que necesita para que su aplicación se ejecute.

#### `activate`

El trabajador de servicio recibirá un evento `activate` cada vez que se inicie. El objetivo principal del evento `activate` es configurar el comportamiento del trabajador del servicio, limpiar los recursos que quedan de las ejecuciones anteriores (por ejemplo, cachés antiguos) y preparar al trabajador del servicio para manejar las solicitudes de red (por ejemplo, el evento `fetch` que se describe a continuación).

#### `fetch`

El evento de recuperación permite que el trabajador del servicio intercepte cualquier solicitud de red y maneje las solicitudes. Puede ir a la red para obtener el recurso, puede extraerlo de su propio caché, generar una respuesta personalizada o cualquier número de opciones diferentes. Echa un vistazo a [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/) para ver las diferentes estrategias que puedes usar.

#### Actualizando un trabajador de servicio

El navegador comprueba si hay una nueva versión de su trabajador de servicio en cada carga de página. Si encuentra una nueva versión, la nueva versión se descarga e instala en segundo plano, pero no está activada. Se encuentra en estado de espera, hasta que ya no queda ninguna página abierta que utilice el antiguo trabajador de servicio. Una vez que se cierran todas las ventanas que usan el antiguo trabajador de servicio, el nuevo trabajador de servicio se activa y puede tomar el control. Consulte la sección [Updating the service worker](/web/fundamentals/primers/service-workers/lifecycle#updates) del doc. Del ciclo de vida del trabajador de servicio para obtener más detalles.

### Elegir la estrategia de almacenamiento en caché correcta

Elegir el [caching strategy](/web/fundamentals/instant-and-offline/offline-cookbook/) correcto depende del tipo de recurso que intenta almacenar en caché y de cómo podría necesitarlo más adelante. Para nuestra aplicación de clima, dividiremos los recursos que necesitamos para almacenar en caché en dos categorías: los recursos que queremos incluir en caché y los datos que almacenaremos en caché en tiempo de ejecución.

#### Almacenamiento en caché de recursos estáticos

Unir previamente a sus recursos es un concepto similar a lo que sucede cuando un usuario instala una aplicación de escritorio o móvil. Los recursos clave necesarios para que la aplicación se ejecute se instalan o se almacenan en la memoria caché del dispositivo para que puedan cargarse más tarde, ya sea que haya una conexión de red o no.

Para nuestra aplicación, almacenaremos previamente todos nuestros recursos estáticos cuando nuestro trabajador de servicio esté instalado, de modo que todo lo que necesitamos para ejecutar nuestra aplicación se almacene en el dispositivo del usuario. Para garantizar que nuestra aplicación se cargue a la velocidad de la luz, usaremos la estrategia [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) ; en lugar de ir a la red para obtener los recursos, se extraen de la caché local; Sólo si no está disponible, intentaremos obtenerlo de la red.

![44860840e2090bd8.png](img/44860840e2090bd8.png)

Extraer de la memoria caché local elimina cualquier variabilidad de la red. No importa en qué tipo de red esté el usuario (WiFi, 5G, 3G o incluso 2G), los recursos clave que necesitamos para ejecutar están disponibles casi de inmediato.

Caution: en este ejemplo, los recursos estáticos se sirven utilizando una estrategia [`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) , que da como resultado que se [`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) una copia de cualquier contenido almacenado en caché sin consultar la red. Si bien una estrategia de `cache-first` es fácil de implementar, puede causar desafíos en el futuro.

#### los datos de la aplicación

[stale-while-revalidate strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) es ideal para ciertos tipos de datos y funciona bien para nuestra aplicación. Obtiene los datos en la pantalla lo más rápido posible, luego actualiza que una vez que la red ha devuelto los datos más recientes. El tiempo de revalidación tardío significa que debemos iniciar dos solicitudes asíncronas, una para la memoria caché y otra para la red.

![6ebb2681eb1f58cb.png](img/6ebb2681eb1f58cb.png)

En circunstancias normales, los datos almacenados en la memoria caché se devolverán casi inmediatamente proporcionando la aplicación con datos recientes que puede usar. Luego, cuando vuelva la solicitud de red, la aplicación se actualizará utilizando los datos más recientes de la red.

Para nuestra aplicación, esto proporciona una mejor experiencia que la red, recurriendo a la estrategia de caché porque el usuario no tiene que esperar hasta que la solicitud de la red caduque para ver algo en la pantalla. Es posible que inicialmente vean datos más antiguos, pero una vez que se devuelva la solicitud de red, la aplicación se actualizará con los datos más recientes.

### Actualizar la lógica de la aplicación

Como se mencionó anteriormente, la aplicación debe iniciar dos solicitudes asíncronas, una para el caché y otra para la red. La aplicación utiliza el objeto `caches` disponible en `window` para acceder a la memoria caché y recuperar los últimos datos. Este es un excelente ejemplo de mejora progresiva ya que el objeto `caches` puede no estar disponible en todos los navegadores, y si no es así, la solicitud de red debería funcionar.

Actualice la función `getForecastFromCache()` para verificar si el objeto `caches` está disponible en el objeto global `window` y, si lo está, solicite los datos de la memoria caché.

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

Luego, debemos modificar [`updateData()`](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L196) para que haga dos llamadas, una a `getForecastFromNetwork()` para obtener el pronóstico de la red y otra a `getForecastFromCache()` para obtener el último pronóstico almacenado en caché:

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L200)

```js
// CODELAB: Add code to call getForecastFromCache.
getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
```

Nuestra aplicación meteorológica ahora realiza dos solicitudes asíncronas de datos, una desde el caché y otra a través de un `fetch` . Si hay datos en el caché, serán devueltos y procesados extremadamente rápidamente (decenas de milisegundos). Luego, cuando responda `fetch` , la tarjeta se actualizará con los datos más recientes directamente de la API meteorológica.

Observe cómo la solicitud de caché y la solicitud `fetch` terminan con una llamada para actualizar la tarjeta de pronóstico. ¿Cómo sabe la aplicación si muestra los últimos datos? Esto se maneja en el siguiente código de `renderForecast()` :

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L85)

```js
// If the data on the element is newer, skip the update.
if (lastUpdated >= data.currently.time) {
  return;
}
```

Cada vez que se actualiza una tarjeta, la aplicación almacena la marca de tiempo de los datos en un atributo oculto en la tarjeta. La aplicación simplemente cierra si la marca de tiempo que ya existe en la tarjeta es más reciente que los datos que se pasaron a la función.

### Pre-caché nuestros recursos de la aplicación

En el trabajador de servicios, agreguemos un `DATA_CACHE_NAME` para poder separar los datos de nuestras aplicaciones del shell de la aplicación. Cuando se actualiza el shell de la aplicación y se eliminan los cachés más antiguos, nuestros datos permanecerán intactos, listos para una carga súper rápida. Tenga en cuenta que si su formato de datos cambia en el futuro, necesitará una forma de manejar eso y garantizar que el shell y el contenido de la aplicación estén sincronizados.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L21)

```js
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
```

No olvides actualizar también `CACHE_NAME` ; Estaremos cambiando todos nuestros recursos estáticos también.

Para que nuestra aplicación funcione sin conexión, tenemos que almacenar previamente todos los recursos que necesita. Esto también ayudará a nuestro rendimiento. En lugar de tener que obtener todos los recursos de la red, la aplicación podrá cargarlos todos desde el caché local, eliminando la inestabilidad de la red.

Actualice la matriz `FILES_TO_CACHE` con la lista de archivos:

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

Ya que estamos generando manualmente la lista de archivos a la memoria caché, cada vez que actualizamos un archivo, debemos actualizar el `CACHE_NAME` __. Pudimos eliminar `offline.html` de nuestra lista de archivos en caché porque nuestra aplicación ahora cuenta con todos los recursos necesarios para trabajar sin conexión y nunca volverá a mostrar la página sin conexión.

Caution: En esta muestra, realizamos un rol manual de nuestro propio trabajador de servicio. Cada vez que actualizamos alguno de los recursos estáticos, debemos volver a tirar al trabajador del servicio y actualizar el caché, de lo contrario se servirá el contenido anterior. Además, cuando un archivo cambia, la memoria caché completa se invalida y se debe volver a descargar. Eso significa que corregir un simple error de ortografía de un solo carácter invalidará la memoria caché y requerirá que todo se descargue de nuevo, lo que no es exactamente eficiente. [Workbox](/web/tools/workbox/) maneja esto con gracia, al integrarlo en su proceso de compilación, solo se actualizarán los archivos modificados, lo que ahorrará ancho de banda para los usuarios y un mantenimiento más fácil para usted.

#### Actualizar el controlador de eventos activar

Para asegurar nuestra `activate` caso, no se eliminan accidentalmente nuestros datos, en el `activate` caso de `service-worker.js` , reemplace `if (key !== CACHE_NAME) {` con:

#### public / service-worker.js

```js
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
```

#### Actualizar el controlador de eventos fetch

Necesitamos modificar el trabajador del servicio para interceptar las solicitudes a la API del tiempo y almacenar sus respuestas en el caché, para que podamos acceder a ellas fácilmente más adelante. En la estrategia obsoleta, mientras que la revalidación, esperamos que la respuesta de la red sea la &quot;fuente de la verdad&quot;, siempre nos proporciona la información más reciente. Si no puede, está bien fallar porque ya hemos recuperado los últimos datos almacenados en caché en nuestra aplicación.

Actualice el `fetch` eventos `fetch` para manejar las solicitudes a la API de datos por separado de otras solicitudes.

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

El código intercepta la solicitud y verifica si es para un pronóstico del tiempo. Si es así, use `fetch` para realizar la solicitud. Una vez que se devuelve la respuesta, abra la memoria caché, clone la respuesta, almacénela en la memoria caché y devuelva la respuesta al solicitante original.

Necesitamos eliminar la comprobación `evt.request.mode !== 'navigate'` porque queremos que nuestro trabajador de servicio maneje todas las solicitudes (incluidas imágenes, scripts, archivos CSS, etc.), no solo las navegaciones. Si dejamos ese registro, solo se entregará el HTML desde la memoria caché del trabajador de servicio, todo lo demás se solicitará desde la red.

### Pruébalo

La aplicación debe estar completamente fuera de línea funcional ahora. Actualice la página para asegurarse de que tiene instalado el trabajador de servicio más reciente, luego guarde un par de ciudades y presione el botón de actualización en la aplicación para obtener información actualizada sobre el clima.

Luego vaya al panel __Cache Storage__ en el panel __Aplicación__ de DevTools. Expanda la sección y verá el nombre de su caché estático y el caché de datos en el lado izquierdo. Al abrir el caché de datos se deben mostrar los datos almacenados para cada ciudad.

![731e91776cb6ef18.png](img/731e91776cb6ef18.png)

Luego, abra DevTools y cambie al panel Trabajadores de servicio, y marque la casilla de verificación Sin conexión, luego intente volver a cargar la página, luego desconecte y vuelva a cargar la página.

Si estás en una red rápida y quiere ver cómo se actualiza datos de previsión del tiempo en una conexión lenta, ajuste el `FORECAST_DELAY` propiedad en `server.js` a `5000` . Todas las solicitudes a la API de pronóstico se retrasarán 5000ms.

### Verificar cambios con el faro

También es una buena idea volver a ejecutar Lighthouse.

__Esa Audit__

* __✅ PASADO:__ El documento tiene una meta descripción.

__Auditoría de aplicación web progresiva__

* __✅ PASADO:__ La página actual responde con un 200 cuando está fuera de línea.
* __✅ PASADO:__ `start_url` responde con un 200 cuando está desconectado.
* __✅ PASADO:__ Registra un trabajador de servicio que controla la página y `start_url.`
* __✅ PASADO:__ El manifiesto de la aplicación web cumple con los requisitos de instalación.
* __✅ PASADO:__ Configurado para una pantalla de inicio personalizada.
* __✅ PASADO:__ Establece un color de tema de la barra de direcciones.

## Añadir experiencia de instalación

Cuando se instala una aplicación web progresiva, se ve y se comporta como todas las demás aplicaciones instaladas. Se inicia desde el mismo lugar que se lanzan otras aplicaciones. Se ejecuta en una aplicación sin una barra de direcciones u otra interfaz de usuario del navegador. Y como todas las demás aplicaciones instaladas, es una aplicación de nivel superior en el conmutador de tareas.

![d824e1712e46a1cc.png](img/d824e1712e46a1cc.png)

En Chrome, una aplicación web progresiva puede instalarse a través del menú contextual de tres puntos, o puede proporcionar un botón u otro componente de UI al usuario que le pedirá que instale su aplicación.

Success: dado que la experiencia de instalación en el menú contextual de tres puntos de Chrome está algo oculta, le recomendamos que proporcione alguna indicación dentro de su aplicación para notificar al usuario que su aplicación puede instalarse, y un botón de instalación para completar el proceso de instalación.

### Auditoría con Faro

Para que un usuario pueda instalar su aplicación web progresiva, debe cumplir con [certain criteria](/web/fundamentals/app-install-banners/#criteria) . La forma más fácil de verificar es usar Lighthouse y asegurarse de que cumpla con los criterios instalables.

![b921f5583fcddf03.png](img/b921f5583fcddf03.png)

Si ha trabajado con este código, su PWA ya debería cumplir con estos criterios.

Key Point: Para esta sección, habilite la casilla de verificación **Omitir para la red** en el panel **Trabajadores de servicio** del panel **Aplicación** en DevTools. Cuando está marcado, las solicitudes omiten al trabajador del servicio y se envían directamente a la red. Esto simplifica nuestro proceso de desarrollo ya que no tenemos que actualizar nuestro trabajador de servicio mientras trabajamos en esta sección.

### Agrega install.js a index.html

Primero, agreguemos el `install.js` a nuestro archivo `index.html` .

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L204)

```html
<!-- CODELAB: Add the install script here -->
<script src="/scripts/install.js"></script>
```

### Escuche el evento `beforeinstallprompt`

Si se cumple la función de agregar a la pantalla de inicio [criteria](/web/fundamentals/app-install-banners/#criteria) , Chrome activará un evento de `beforeinstallprompt` , que puede usar para indicar que su aplicación se puede &quot;instalar&quot; y luego solicitar al usuario que la instale. Agregue el siguiente código para escuchar el evento `beforeinstallprompt` :

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L24)

```js
// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
```

### Guardar evento y mostrar el botón de instalación

En nuestra función `saveBeforeInstallPromptEvent` , `saveBeforeInstallPromptEvent` una referencia al evento `beforeinstallprompt` para poder llamar a `prompt()` más adelante y actualizar nuestra interfaz de usuario para mostrar el botón de instalación.

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

Al llamar a `.prompt()` se mostrará un diálogo modal al usuario y se le pedirá que agregue su aplicación a la pantalla de inicio.

### Registrar los resultados

Usted puede comprobar para ver cómo el usuario responde al cuadro de diálogo de instalación mediante la escucha de la promesa de regresar por el `userChoice` propiedad de los salvados `beforeinstallprompt` evento. La promesa devuelve un objeto con una propiedad `outcome` después de que se haya mostrado la solicitud y el usuario haya respondido a ella.

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

Un comentario sobre `userChoice` , [spec defines it as a property](https://w3c.github.io/manifest/#beforeinstallpromptevent-interface) , no es una función como podría esperarse.

#### Registrar todos los eventos de instalación

Además de cualquier IU que agregue para instalar su aplicación, los usuarios también pueden instalar su PWA a través de otros métodos, por ejemplo, el menú de tres puntos de Chrome. Para rastrear estos eventos, escuche el evento instalado.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L51)

```js
// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
```

Luego, necesitaremos actualizar la función `logAppInstalled` , para este código de código, solo usaremos `console.log` , pero en una aplicación de producción, probablemente desee registrar esto como un evento con su software de análisis.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L60)

```js
// CODELAB: Add code to log the event
console.log('Weather App was installed.', evt);
```

### Actualizar el trabajador de servicio

No olvide actualizar `CACHE_NAME` en su archivo `service-worker.js` , ya que ha realizado cambios en los archivos que ya están en caché. Habilitar la casilla de verificación __Bypass for network__ en el panel Trabajadores de servicio del panel de aplicaciones en DevTools funcionará en el desarrollo, pero no ayudará en el mundo real.

### Pruébalo

Vamos a ver cómo fue nuestro paso de instalación. Para estar seguro, use el botón __Clear site data__ en el panel de aplicaciones de DevTools para eliminar todo y asegurarse de que estamos comenzando de nuevo. Si ya instaló la aplicación, asegúrese de desinstalarla, de lo contrario, el icono de instalación no volverá a aparecer.

#### Verifica que el botón de instalación esté visible

Primero, verifiquemos que nuestro ícono de instalación se muestre correctamente, asegúrese de probar esto tanto en el escritorio como en el móvil.

1. Abra la URL en una nueva pestaña de Chrome.
2. Abra el menú de tres puntos de Chrome (junto a la barra de direcciones). Verifique que vea &quot;* Instalar el clima ... *&quot; en el menú.
3. Actualice los datos del clima con el botón de actualización en la esquina superior derecha para asegurarnos de que cumplimos con las [user engagement heuristics](/web/fundamentals/app-install-banners/#criteria).
▢ Verifique que el icono de instalación esté visible en el encabezado de la aplicación.

#### Verifica que el botón de instalación funcione

A continuación, asegurémonos de que todo se instala correctamente y de que nuestros eventos se activan correctamente. Puedes hacerlo tanto en tu escritorio como en tu móvil. Si desea probar esto en el móvil, asegúrese de que está utilizando la depuración remota para poder ver lo que está registrado en la consola.

1. Abra Chrome y, en una nueva pestaña del navegador, navegue a su Weather PWA.
2. Abra DevTools y cambie al panel de la consola.
3. Haga clic en el botón de instalación en la esquina superior derecha.
▢ Verifique que el botón de instalación desaparezca
▢ Verifique que se muestra el cuadro de diálogo modal de instalación.
4. Haga clic en Cancelar.
▢ Verifique que &quot;* El usuario rechazó la solicitud A2HS *&quot; se muestra en la salida de la consola.
▢ Verifique que el botón de instalación vuelva a aparecer.
5. Haga clic en el botón Instalar nuevamente, luego haga clic en el botón Instalar en el diálogo modal. ▢ Verifique que &quot;* El usuario aceptó la solicitud A2HS *&quot; se muestra en la salida de la consola.
▢ Verifique que &quot;* Weather App se haya instalado *&quot; se muestre en la salida de la consola.
▢ Verifique que la aplicación Weather se agregue al lugar donde normalmente encontrará las aplicaciones.
6. Inicia el Weather PWA.
▢ Verifique que la aplicación se abra como una aplicación independiente, ya sea en una ventana de la aplicación en el escritorio o en pantalla completa en el móvil.

Tenga en cuenta que si está ejecutando en el escritorio desde localhost, su PWA instalado puede mostrar una pancarta de dirección porque localhost no se considera un host seguro.

#### Verifica que la instalación de iOS funcione correctamente

Veamos también el comportamiento en iOS. Si tiene un dispositivo iOS, puede usarlo, o si está usando una Mac, pruebe el simulador de iOS disponible con Xcode.

1. Abra Safari y en una nueva pestaña del navegador, navegue a su Weather PWA.
2. Haga clic en el *Compartir*! Botón [8ac92dd483c689d3.png](img/8ac92dd483c689d3.png) .
3. Desplácese hacia la derecha y haga clic en el botón *Agregar a la pantalla de inicio*.
▢ Verifique que el título, la URL y el icono sean correctos.
4. Haga clic en *Agregar.*
▢ Verifique que el icono de la aplicación se agregue a la pantalla de inicio.
5. Inicie el Weather PWA desde la pantalla de inicio.
▢ Verifique que la aplicación se inicie en pantalla completa.

### Bonus: ### si su aplicación se inicia desde la pantalla de inicio

La consulta de medios `display-mode` permite aplicar estilos dependiendo de cómo se lanzó la aplicación, o determinar cómo se lanzó con JavaScript.

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```

También puede comprobar el `display-mode` consulta de medios en [JavaScript to see if you're running in standalone](/web/fundamentals/app-install-banners/#detect-mode) .

### Bonus: Desinstalando tu PWA

Recuerde, `beforeinstallevent` no se dispara si la aplicación ya está instalada, por lo que durante el desarrollo probablemente querrá instalarla y desinstalarla varias veces para asegurarse de que todo funciona como se esperaba.

#### Android

En Android, los PWA se desinstalan de la misma manera que otras aplicaciones instaladas.

* Abre el cajón de aplicaciones.
* Desplácese hacia abajo para encontrar el icono del tiempo.
* Arrastra el ícono de la aplicación a la parte superior de la pantalla.
* Elija *Desinstalar.*

#### ChromeOS

En ChromeOS, los PWA se desinstalan fácilmente desde el cuadro de búsqueda del iniciador.

* Abre el lanzador.
* Escriba &quot;* Tiempo *&quot; en el cuadro de búsqueda, su PWA de tiempo debería aparecer en los resultados.
* Haga clic derecho (alt-clic) en el Weather PWA.
* Haga clic en *Eliminar de Chrome ...*

#### macOS y Windows

En Mac y Windows, los PWA se deben desinstalar a través de Chrome.

* En una nueva pestaña del navegador, abre chrome: // apps.
* Haga clic derecho (alt-clic) en el Weather PWA.
* Haga clic en *Eliminar de Chrome ...*

## Felicitaciones

¡Enhorabuena, ha construido con éxito su primera aplicación web progresiva!

Agregó un manifiesto de aplicación web para permitir que se instalara, y agregó un trabajador de servicio para garantizar que su PWA sea siempre rápida y confiable. Aprendió cómo usar DevTools para auditar una aplicación y cómo puede ayudarlo a mejorar su experiencia de usuario.

Ahora conoce los pasos clave necesarios para convertir cualquier aplicación web en una aplicación web progresiva.

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

Ayúdenos a mejorar nuestros laboratorios de códigos enviando un [issue](https://github.com/googlecodelabs/your-first-pwapp/issues) hoy. ¡Y gracias!

{% include "web/_shared/translation-end.html" %}
