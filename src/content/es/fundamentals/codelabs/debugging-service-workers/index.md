project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: En este codelab, aprenderá a depurar un service worker usando el panel de la nueva app DevTools. También aprenderás a simular una notificación push para verificar que tu suscripción esté bien configurada.

{# wf_updated_on: 2016-10-19T18:28:32Z #}
{# wf_published_on: 2016-01-01 #}


# Depuración de Service Workers {: .page-title }

{% include "web/_shared/contributors/robdodson.html" %}



## Introducción




Los Service Workers les brindan a los programadores la increíble capacidad de controlar redes irregulares y crear apps web verdaderamente sin conexión. Pero al ser una nueva tecnología, a veces pueden ser difíciles de depurar, especialmente si esperamos que nuestras herramientas estén al día.

Este codelab te guiará sobre cómo crear un Service Worker básico y demostrará cómo usar el panel de la nueva app de Chrome DevTools para depurar e inspeccionar a tu trabajador.

### ¿Qué crearemos?

![6ffdd0864a80600.png](img/6ffdd0864a80600.png)

En este code lab, trabajarás con una app web progresiva extremadamente simple y aprenderás técnicas que puedes emplear en tus propias apps cuando encuentres problemas.

Debido a que este code lab está enfocado en enseñarte a usar las herramientas, siéntete libre de detenerte en distintos puntos y experimentar. Juega con el código, actualiza la página, abre nuevas pestañas, etc. La mejor forma de aprender a depurar herramientas es romper las cosas y ensuciarte las manos para arreglarlas.

### Lo que aprenderás

* Cómo inspeccionar un Service Worker con el panel de la app
* Cómo explorar la caché e IndexedDB
* Cómo simular distintas condiciones de red
* Cómo usar puntos de interrupción e instrucciones de depurador para depurar un Service Worker
* Cómo simular eventos push

### Qué necesitarás

* Chrome 52 o superior
* Instala [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) o usa tu servidor web de tu elección.
* El ejemplo de código
* Un editor de texto
* Conocimiento básico de HTML, CSS y JavaScript

Este codelab se enfoca en depurar Service Workers y asume un conocimiento previo de trabajo con Service Workers. Algunos conceptos se pasan por alto o se brindan bloques de códigos (por ejemplo, estilos o JavaScript no relevante) para que simplemente copies y pegues. Si eres nuevo con los Service Workers, asegúrate de  [leer el Manual de API](/web/fundamentals/primers/service-worker/) antes de continuar.


## Preparación




### Descarga el código

Puedes descargar todo el código de este codelab haciendo clic en el siguiente botón:

[Vínculo](https://github.com/googlecodelabs/debugging-service-workers/archive/master.zip)

Descomprime el archivo zip descargado. Esto descomprimirá una carpeta raíz (`debugging-service-workers-master`), que contiene una carpeta para cada paso de este codelab, junto con todos los recursos que necesitarás.

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

![8937a38abc57e3.png](img/8937a38abc57e3.png)

Luego, detén y reinicia el servidor deslizando el activador denominado "Web Server: STARTED" hacia la izquierda y luego a la derecha.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

Ahora visita tu sitio de trabajo en tu propio navegador web (haciendo clic en la URL destacada de Web Server) y deberías ver una página como esta:

![693305d127d9fe80.png](img/693305d127d9fe80.png)

Obviamente, esta app aún no está haciendo nada interesante. Le agregaremos funcionalidad para poder verificar que funcione sin conexión en pasos siguientes. 


## Introducción de la pestaña de la app




### Inspección del manifiesto

La compilación de Progressive Web Apps requiere unir una cantidad de distintas tecnologías centrales, incluidas Service Workers y manifiestos de apps web, como también útiles tecnologías habilitantes, como la API de almacenamiento en caché, IndexedDB y notificaciones push. Para que sea más fácil para los programadores tener una visión coordinada de cada una de estas tecnologías, Chrome DevTools ha incorporado inspectores para cada una en el panel de la nueva app.

* Abre Chrome DevTools y haz clic en la pestaña que dice __Application__.

![b380532368b4f56c.png](img/b380532368b4f56c.png)

Mira la barra lateral y nota __Manifest__ está destacado. Esta vista muestra información importante relacionada con el archivo `manifest.json` como el nombre de su app, la URL de inicio, íconos, etc.

A pesar de que no lo vamos a cubrir en este codelab, fíjate que hay un botón __Add to homescreen__ que se puede usar para simular la experiencia de agregado de la app a la pantalla de inicio del usuario.

![56508495a6cb6d8d.png](img/56508495a6cb6d8d.png)

### Inspección de los Service Workers

En el pasado, la inspección de un Service Worker implicaba husmear el interior de Chrome y, definitivamente, no era la experiencia más amigable con el usuario. ¡Todo eso cambia con la nueva pestaña __Application__!

* Haz clic en el elemento del menú __Service Workers__ debajo del elemento __Manifest__ actualmente seleccionado

![3dea544e6b44979d.png](img/3dea544e6b44979d.png)

La vista de __Service Workers__ brinda información sobre los Service Workers que están activos en el origen actual. En la fila superior hay una serie de casillas de verificación.

* __Offline__: simula estar desconectado de la red. Esto puede ser útil para verificar rápidamente que tus controladores de extracción de Service Worker estén funcionando correctamente.
* __Update on reload__: hace que el Service Worker actual quede reemplazado por otro Service Worker (si el programador ha hecho actualizaciones a su `service-worker.js`). Normalmente, el navegador espera hasta que un usuario cierre todas las pestañas que contienen el sitio actual antes de actualizar a un nuevo Service Worker.
* __Bypass for network__: hace que el navegador ignore los Service Workers activos y extrae recursos de la red. Esto es muy útil para situaciones en las que quieres trabajar en CSS o JavaScript y no tener que preocuparte por que el Service Worker accidentalmente almacene en caché y muestre archivos viejos.
* __Show all__: muestra una lista de todos los Service Workers activos, sin importar el origen.

Debajo de eso, verás información relacionada con el Service Worker activo actual (si hay alguno). Uno de los campos más útiles es el campo __Status__, que muestra el estado actual del Service Worker. Ya que esta es la primera vez que se inicia la app, el Service Worker actual se ha instalado y activado con éxito, así que muestra un círculo verde que indica que todo está bien.

Ten en cuenta el siguiente número de ID junto al indicador de estado verde. Esa es la ID del Service Worker actualmente activo. Recuérdalo o escríbelo, ya que lo usaremos para una comparación en un momento.

* En tu editor de texto, abre el archivo `service-worker.js`.

El código del Service Worker actual es bastante simple, solo algunos registros de consola.

    self.addEventListener('install', function(event) {
      console.log('Service Worker installing.');
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Service Worker activating.');  
    });

Si vuelves a DevTools y miras la consola, puedes ver que ambos registros se han emitido con éxito.

![5fcfd389f5357c09.png](img/5fcfd389f5357c09.png)

Actualicemos el código del `service-worker.js` para verlo pasar por un cambio de ciclo de vida.

* Actualiza los comentarios en `service-worker.js` para que contengan nuevos mensajes

    self.addEventListener('install', function(event) {
      console.log('A *new* Service Worker is installing.');
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Finally active. Ready to start serving content!');  
    });

* Actualiza la página y abre la consola en DevTools

La consola registra `A *new* Service Worker is installing.`, pero no muestra el segundo mensaje que indique que el nuevo Service Worker esté activo.

* Cambia a la pestaña Application en DevTools

En la pestaña Application ahora hay dos indicadores de estado, cada uno de ellos representa el estado de los dos Service Workers.

![2e41dbf21437944c.png](img/2e41dbf21437944c.png)

Ten en cuenta la ID del primer Service Worker. Debería coincidir con la ID del Service Worker original. Cuando instalas un nuevo Service Worker, el anterior permanece activo hasta la próxima vez que el usuario visita la página.

El segundo indicador de estado muestra el nuevo Service Worker que acabamos de editar. Ahora está en estado de espera.

Una forma fácil de hacer que se active el nuevo Service Worker es con el botón __skipWaiting__.

![7a60e9ceb2db0ad2.png](img/7a60e9ceb2db0ad2.png)

* Haz clic en el botón skipWaiting y cambia a la consola

Observa que la consola ahora registra el mensaje del controlador de evento `activate`

`Finally active. Ready to start serving content!`


## Exploración de la caché




El control de la caché de tu propio archivo sin conexión con un Service Worker es un superpoder increíble. El nuevo panel __Application__ tiene varias herramientas útiles para explorar y modificar tus recursos almacenados, que pueden ser muy útiles durante el momento de desarrollo.

### Agrega almacenamiento en caché a tu Service Worker

Antes de poder inspeccionar la caché, tendrás que escribir un pequeño código para almacenar algunos archivos. El almacenamiento previo en caché durante la fase de instalación del Service Worker es una técnica útil para garantizar que esos recursos cruciales estén disponibles para el usuario si se trabaja sin conexión. Comencemos por ahí.

* Antes de actualizar el `service-worker.js`, abre el panel __Application__ de DevTools, navega al menú __Service Workers__ y marca el cuadro que dice __Update on reload__

![d4bcfb0983246797.png](img/d4bcfb0983246797.png)

Este útil truco hará que la página use el último Service Worker, así no tienes que hacer clic en la opción __skipWaiting__ cada vez que quieres hacer cambios a tu Service Worker.

* A continuación, actualiza el código en `service-worker.js` para que luzca así

```
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/smiley.svg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});

self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!');  
});
```

* Actualiza la página

En el panel Application puedes notar que aparece un error. Esto asusta, pero si haces clic en el botón __details__ verás que es el panel __Application__ que te indica que tu Service Worker viejo se actualizó a la fuerza. Debido a que esa era la intención, esto está bien, pero puede servir como útil advertencia para que no olvides desmarcar la casilla de verificación cuando termines de editar el archivo `service-worker.js`.

![a039ca69d2179199.png](img/a039ca69d2179199.png)

### Inspección del almacenar en caché

Nota que el artículo del menú __Cache Storage__ del panel __Application__ ahora tiene un símbolo de intercalación que indica que se puede expandir.

* Haz clic para expandir el menú  __Cache Storage__, luego haz clic en `my-site-cache-v1`

![af2b3981c63b1529.png](img/af2b3981c63b1529.png)

Aquí verás todos los archivos almacenados en caché por el Service Worker. Si necesitas quitar un archivo de la caché, puedes hacerle clic derecho y seleccionar la opción __delete__ del menú contextual. De manera similar, puedes borrar toda la caché haciendo clic derecho en `my-site-cache-v1` y eligiendo borrar.

![5c8fb8f7948066e6.png](img/5c8fb8f7948066e6.png)

### Borrón y cuenta nueva

Como puedes haber notado, con __Cache Storage__, hay otros elementos de menú relacionados con recursos almacenados, incluidos: Almacenamiento local, Almacenamiento de sesión, IndexedDB, Web SQL, Cookies y Application Cache ("AppCache"). Tener control granular de cada uno de estos recursos en un solo panel es muy útil. Pero, si estuvieses en una situación en que quisieras borrar los recursos almacenados, sería muy tedioso tener que visitar cada elemento del menú y borrar su contenido. En cambio, puedes usar la opción __Clear storage__ para borrar la pizarra de una sola vez (nota que esto también quitará del registro todos los Service Workers).

* Selecciona la opción del menú __Clear storage__
* Haz clic en el botón __Clear site data__ para borrar todos los recursos almacenados

![59838a73a2ea2aaa.png](img/59838a73a2ea2aaa.png)

Si vuelves y haces clic en `my-site-cache-v1` verás que se han borrado todos los archivos almacenados.

![317d24238f05e69c.png](img/317d24238f05e69c.png)

__¿Qué hay del engranaje?__

Ya que el Service Worker puede hacer sus propias solicitudes de red, puede ser útil para identificar el tráfico de red que se originó del worker.

* Mientras `my-site-cache-v1` sigue vacío, pasa al panel Network
* Actualiza la página

En el panel Network, deberías ver un conjunto inicial de solicitud de archivos como `main.css`, seguido de una segunda ronda de solicitudes prefijadas con un ícono de ajustes, que parece capturar los mismos recursos.

![2ba393cf3d41e087.png](img/2ba393cf3d41e087.png)

El ícono de ajustes significa que estas solicitudes vinieron del Service Worker. Específicamente, estas son solicitudes que hace el controlador `install` del Service Worker para mostrar la caché sin conexión.


## Simulación de distintas condiciones de red




Una de las mejores funciones de los Service Workers es su capacidad de acercar el contenido de la caché a los usuarios, incluso si trabajan sin conexión. Para verificar que todo funcione según lo planeado, probemos algunas de las herramientas de limitación de red que brinda Chrome.

### Solicitudes sin conexión

Para acercar contenido sin conexión, tendrás que agregarle un controlador `fetch` a tu `service-worker.js`

* Agrega el siguiente código a `service-worker.js` después del controlador `activate`

```
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
```

* Pasa la panel __Application__ y verifica que __Update on reload__ siga marcado
* Actualiza la página para instalar el nuevo Service Worker
* Desmarca __Update on reload__
* Marca __Offline__

Tu panel __Application__ debería verse así ahora:

![873b58278064b627.png](img/873b58278064b627.png)

Nota que el panel __Network__ ahora tiene un símbolo amarillo de advertencia que indica que trabajas sin conexión (y te recuerda que deberás desmarcar esa casilla de verificación si quieres seguir desarrollando con la red).

Con tu controlador `fetch` en su lugar y tu app configurada en __Offline__, ahora es el momento de la verdad. Actualiza la página y si todo sale bien deberías seguir viendo el contenido del sitio, a pesar de que no llegue nada de la red. Puedes pasar al panel __Network__ para verificar que todos los recursos estén llegando de almacenar en caché. Nota que en la columna __Size__ dice que estos recursos llegan `(from Service Worker)`. Es aes la señal que nos indica que el Service Worker interceptó la solicitud y brindó una respuesta de la caché en lugar de la red.

![a6f485875ca088db.png](img/a6f485875ca088db.png)

Notarás que hay solicitudes fallidas (como de un nuevo Service Worker o `manifest.json`). Eso está bien y es lo que se espera.

### Prueba de redes lentas o débiles

Ya que usamos nuestros dispositivos móviles en un sinfín de distintos contextos, nos estamos moviendo constantemente entre varios estados de conectividad. No solo eso, sino que existen muchas partes del mundo en que las velocidades 3G y 2G son la norma. Para verificar que nuestra app funcione bien para estos consumidores, deberíamos verificar que tenga buen rendimiento incluso con conexión lenta.

Para comenzar, simulemos el funcionamiento de la app en una red lenta cuando el Service Worker no participa.

* Del panel __Application__, desmarca __Offline__
* Marca __Bypass for network__

![739dc5811e4aa937.png](img/739dc5811e4aa937.png)

La opción __Bypass for network__ le dirá al navegador que omita nuestro service worker cuando tenga que hacer una nueva solicitud. Esto significa que no podrá venir nada del almacenamiento en caché, será como si no tuviésemos Service Worker instalado.

* A continuación, pasa al panel __Network__
* Usa el menú desplegable __Network Throttle__ para establecer la velocidad de red en `Regular 2G`

El menú desplegable __Network Throttle__ se encuentra en la esquina superior derecha del panel __Network__, junto a la propia casilla de verificación __Offline__ del panel __Network__. De forma predeterminada, se configura en `No throttling`.

![c59b54a853215598.png](img/c59b54a853215598.png)

* Con la velocidad configurada en `Regular 2G`, actualiza la página

Nota que los tiempos de respuesta suben. Ahora cada recurso tarda varios cientos de milisegundos para descargarse.

![70e461338a0bb051.png](img/70e461338a0bb051.png)

Veamos cómo cambian las cosas con nuestro Service Worker de vuelta en funcionamiento.

* Con la red todavía configurada en `Regular 2G`, vuelve a la pestaña __Application__
* Desmarca la casilla de verificación __Bypass for network__
* Vuelve al panel __Network__
* Actualiza la página

Ahora nuestros tiempos de respuesta bajan a unos pocos y rápidos milisegundos por recurso. Para los usuarios con redes más lentas, esta es una gran diferencia.

![f0f6d3b0a1b1f18d.png](img/f0f6d3b0a1b1f18d.png)


## Recuerda, es solo JavaScript




Los Service Workers pueden parecer mágicos, pero en realidad son solo archivos de JavaScript comunes. Esto significa que puedes usar herramientas existentes como instrucciones `debugger` y puntos de interrupción para depurarlos.

### Trabajo con el depurador

Muchos programadores confían en la vieja `console.log()` cuando tienen un problema en su app. Pero hay una herramienta mucho más poderosa disponible en la caja de herramientas: `debugger`.

Agregar esta única línea a tu código pausará la ejecución y abrirá el panel __Sources__ de DevTools. Desde aquí, puedes repasar las funciones, inspeccionar los objetos y hasta usar la consola para ejecutar comandos en el alcance actual. Esto puede resultar especialmente útil para depurar un Service Worker inestable.

Para probarlo, depuremos nuestro controlador `install`.

* Agrega una indicación de `debugger` al principio de tu controlador `install` en `service-worker.js`

```
self.addEventListener('install', function(event) {
  debugger;
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});
```

* Desde el panel __Application__, actualiza la página
* Haz clic en __skipWaiting__ para activar el nuevo Service Worker
* Actualiza la página nuevamente para permitirle al controlador `fetch` ejecutarse

La app pausará la ejecución y pasará los paneles a __Sources__, donde la indicación de `debugger` ahora está destacada en `service-worker.js`.

![d960b322c020d6cc.png](img/d960b322c020d6cc.png)

Existen una tonelada de herramientas útiles disponibles en esta vista. Una de esas herramientas es el inspector de __Scope__, que nos permite ver el estado actual de los objetos en el ámbito de la función actual.

* Haz clic en el menú desplegable `event: ExtendableEvent`

![5116146f838a566.png](img/5116146f838a566.png)

Desde aquí, puedes conocer todo tipo de información útil sobre los actuales objetos dentro del ámbito. Por ejemplo, mirando el campo `type` puedes verificar que el objeto de evento actual sea para el evento `install`.

### Uso de puntos de interrupción

Si ya estás inspeccionando tu código en el panel __Sources__, te puede resultar más fácil establecer un punto de interrupción, en lugar de agregar instrucciones de `debugger` a tus archivos reales. Un punto de interrupción sirve para un objetivo similar (congela la ejecución y te permite inspeccionar la app), pero se puede establecer desde DevTools.

Para establecer un punto de interrupción, tienes que hacer clic en el número de línea en el que quisieras que la app detenga la ejecución.

* Desde el panel __Sources__, desplaza hacia abajo hasta la línea 25 de `service-worker.js` y haz clic en el número de línea

![da7b5f76723ca525.png](img/da7b5f76723ca525.png)

Esto establecerá un punto de interrupción al principio del controlador `fetch` para que puedas inspeccionar su objeto de evento.

* Actualiza la página

Nota que, casi como cuando usaste la indicación de `debugger`, la ejecución ahora se ha detenido en la línea que tiene el punto de interrupción. Esto significa que ahora puedes inspeccionar los objetos `FetchEvent` pasando por tu app y determinar qué recursos solicitaban.

* En el inspector __Scope__, expande el objeto `event`
* Expande el objeto `request`
* Observa la propiedad `url`

![f9b0c00237b4400d.png](img/f9b0c00237b4400d.png)

Puedes ver que este `FetchEvent` estaba solicitando el recurso en `http://127.0.0.1:8887/`, que es nuestro `index.html`. Ya que la app controlará muchas solicitudes `fetch`, puedes dejar el punto de interrupción en el lugar y reanudar la ejecución. Esto te permitirá inspeccionar cada `FetchEvent` a medida que pase por la app. Una técnica muy útil para ver más detalladamente todas las solicitudes de tu app.

* Presiona el botón __Resume__ para permitir que la ejecución de la secuencia de comandos continúe

![ce7b5e8df4e8bc07.png](img/ce7b5e8df4e8bc07.png)

Después de un momento, la ejecución se pausará en el mismo punto de interrupción. Marca la propiedad `event.request.url` y observa que ahora muestra `http://127.0.0.1:8887/styles/main.css`. Puedes continuar de esta manera para ver cómo solicita `smiley.svg`, `main.js` y, finalmente, el `manifest.json`.


## Prueba de notificaciones push




Las notificaciones push son una parte importante de la creación de una experiencia atractiva. Debido a que las notificaciones requieren coordinación entre el servidor de una app, un servicio de mensajería (como Google Cloud Messaging) y tu Service Worker, puede ser útil probar el Service Worker aislado primero para verificar que esté bien configurado.

### Agregado de soporte push

Tal vez hayas visto un botón en el centro de la app que le indique al usuario __Subscribe for Push Notifications__. Este botón ya está conectado para solicitar el permiso de notificación push del usuario cuando se le hace clic.

![3e7f08f9d8c1fc5c.png](img/3e7f08f9d8c1fc5c.png)

El único paso restante es agregar soporte para el evento `push` a `service-worker.js`.

* Abre `service-worker.js` y agrega las siguientes líneas después del controlador `fetch`

```
self.addEventListener('push', function(event) {  
  var title = 'Yay a message.';  
  var body = 'We have received a push message.';  
  var icon = '/images/smiley.svg';  
  var tag = 'simple-push-example-tag';
  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});
```

Con el controlador en su lugar, es fácil simular un evento push.

* Abre el panel __Application__
* Actualiza la página, cuando veas el nuevo Service Worker ingresa a la fase `waiting` y haz clic en el botón __skipWaiting__
* Haz clic en el botón __Subscribe to Push Notifications__
* Acepta la solicitud de permiso

![a8a8fa8d35b0667a.png](img/a8a8fa8d35b0667a.png)

* Finalmente, haz clic en el botón __Push__, junto a __Update__ y __Unregister__

![eacd4c5859f5f3ff.png](img/eacd4c5859f5f3ff.png)

Ahora debería aparecer una notificación push en la esquina superior derecha de la pantalla, que confirma que el Service Worker está controlando los eventos `push` como se esperaba.

![b552ed129bc6cdf6.png](img/b552ed129bc6cdf6.png)

¡Buen trabajo!

Ahora que tienes herramientas depuradas en la caja de herramientas, deberías estar bien equipado para solucionar los problemas que surjan en tu proyecto. ¡Lo único que falta es que te animes a crear la Progressive Web App más increíble que haya!





## ¿Encontraste un problema o tienes comentarios? {: .hide-from-toc }
Ayúdanos a que nuestros code labs sean mejores enviando un 
[problema](https://github.com/googlecodelabs/debugging-service-workers/issues) hoy. ¡Gracias!

{# wf_devsite_translation #}
