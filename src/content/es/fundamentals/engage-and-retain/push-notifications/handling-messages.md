project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Has visto los aspectos que componen una buena notificación. Ahora veamos la manera de implementarlos.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-06-30 #}

# Administrar mensajes {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/cc-good.png" alt="La notificación de ejemplo.">
</figure>

Al [comienzo de este artículo](#anatomy),
mostramos una notificación como la que aparece a continuación y el código que la acompaña.

Aunque te mostramos algo acerca de cómo se codifica, no te brindamos
suficiente información para que resulte útil. De eso se trata esa sección.

<div style="clear:both;"></div>

## Service workers, otra vez

Hablemos sobre los service workers otra vez. Gestionar mensajes involucra un código que
vive exclusivamente en un service worker. Si necesitas un poco de contexto, aquí puedes ver la
[introducción](/web/fundamentals/getting-started/primers/service-workers)
otra vez. También tenemos instrucciones útiles para
[depurar service workers](/web/tools/chrome-devtools/debug/progressive-web-apps/#service-workers)
utilizando DevTools.

## Más anatomía de notificación {: #more-anatomy }

Cuando se recibe una notificación del servidor, esta se intercepta con un proceso
de trabajo de servicio mediante el evento de aplicación. Su estructura básica es la siguiente:


    self.addEventListener('push', event => {
      event.waitUntil(
        // Process the event and display a notification.
      );
    });


En alguna parte, dentro de `waitUntil()`, llamaremos `showNotification()` a un
objeto de registro del service worker.


    self.registration.showNotification(title, {
        body: 'Are you free tonight?',
        icon: 'images/joe.png',
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: 'request',
        actions: [
          { action: 'yes', title: 'Yes!', icon: 'images/thumb-up.png' },
          { action: 'no', title: 'No', icon: 'images/thumb-down.png' }
        ]
      })


Técnicamente, el único parámetro requerido para `showNotification()` es el título.
Para decirlo en términos prácticos, debes incluir al menos un cuerpo y un ícono. Como puedes
ver, las notificaciones tienen varias opciones. Puedes ver una
[lista completa en MDN](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification).

Finalmente, procesaremos la respuesta del usuario usando los métodos `notificationclick` y
`notificationclose`.


    self.addEventListener('notificationclick', event => {  
      // Do something with the event  
      event.notification.close();  
    });

    self.addEventListener('notificationclose', event => {  
      // Do something with the event  
    });


Todo lo demás es simplemente una elaboración de estas ideas básicas.

## No mostrar una notificación {: #choosing-not-to-show }

Puede haber ocasiones en que no sea necesario mostrar una notificación cuando se recibe un mensaje
de una aplicación. Por  ejemplo, si la app ya está abierta y el contenido
de la aplicación ya es visible para el usuario.

Afortunadamente, los service workers tienen una forma de comprobar si la aplicación está abierta.
Los trabajadores de servicio soportan una interfaz denominada
[`clients`](https://developer.mozilla.org/en-US/docs/Web/API/Clients) es una lista
de todos los clientes activos controlados por el service worker actual. Para ver si
algún cliente está activo, llama `clients.length`. Si esta propiedad devuelve `0`
 muestra una notificación. De lo contrario, haz otra cosa.

<pre class="prettyprint">
self.addEventListener('push', event => {
  const promiseChain = clients.matchAll()
  .then(clients => {
    <strong>let mustShowNotification = true;
    if (clients.length > 0) {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].visibilityState === 'visible') {
          mustShowNotification = false;
          return;
        }
      }
    }

    if (mustShowNotification) {
      // Show the notification.
      event.waitUntil(
        self.registration.showNotification('Push notification')
      );
    } else {
      // Send a message to the page to update the UI.
      console.log('The application is already open.');
    }</strong>
  });

  event.waitUntil(promiseChain);
});
</pre>

## Cómo preparar el contenido del mensaje {: #preparing-messages }

Como dijimos anteriormente, tu servidor envía dos tipos de mensajes:

* mensajes con carga de datos;
* mensajes sin carga de datos, a menudo citados como “señales”.

En tu controlador de eventos push se deben tener en cuenta ambos. Para mensajes sin carga, 
te convendrá proporcionar una buena experiencia de usuario mediante la obtención de datos antes de comunicar a los 
usuarios que está disponible.

Comencemos con nuestro controlador de eventos push llamando a
`event.waitUntil()`.  Este método solo puede llevar una promesa o algo que
se convierta en una. Este método extiende la vida útil del evento `push`
hasta que se realizan ciertas tareas. Como verás pronto, conservaremos
el evento `push` hasta después de mostrar una notificación.

    self.addEventListener('push', event => {
      const promiseChain = someFunction();
      event.waitUntil(promiseChain);
    });

Luego, si encuentras datos en el objeto event, obtenlo.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>
  let data = null;
  if (event.data) {
    // We have data - lets use it
    data = event.data.json();
  }</strong>
  let promiseChain = someFunction(data);
  event.waitUntil(promiseChain);
});
</pre>


Si no hay datos en el objeto, llama a `fetch()` para obtenerlo desde el servidor.
En caso contrario, simplemente muestra los datos.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>let promiseChain;
  if (event.data) {
    // We have data - lets use it
    promiseChain = Promise.resolve(event.data.json());
  } else {
    promiseChain = fetch('/some/data/endpoint.json')
      .then(response => response.json());
  }</strong>

  promiseChain = promiseChain.then(data => {
      // Now we have data we can show a notification.
    });
  event.waitUntil(promiseChain);
});
</pre>

En ambos casos, finalmente tendremos un objeto JSON. Ahora es el momento de mostrar una
notificación al usuario.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>let promiseChain;
  if (event.data) {
    // We have data - lets use it
    promiseChain = Promise.resolve(event.data.json());
  } else {
    promiseChain = fetch('/some/data/endpoint.json')
      .then(response => response.json());
  }</strong>

  promiseChain = promiseChain.then(data => {
      return self.registration.showNotification(data.title, {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/icon-192x192.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: data.tag
      });
    });
  event.waitUntil(promiseChain);
});
</pre>

## Combinar notificaciones similares {: #combine-similar-notes }

<figure class="attempt-right">
  <img src="images/combined-notes-mobile.png" alt="Combina mensajes del mismo remitente.">
</figure>

A veces, resulta útil combinar varias notificaciones en una sola. Por
ejemplo, para una app de red social probablemente convenga evitar el envío de mensajes a los usuarios por cada
publicación que realice una persona en particular y, en su lugar, combinarlos.

La combinación de notificaciones similares es un proceso complejo. Pero me gusta pensarlo
como elaboraciones con los siguientes pasos.

1. Llega un mensaje en el controlador del evento `push`.
2. Llamas a `self.registration.getNotifications()` para ver si hay
notificaciones que quieras combinar. Generalmente, esto se realiza controlando la etiqueta
   de la notificación.
3. Por último, muestra tu nueva notificación mediante una llamada a `self.registration.showNotification()`
   asegurándote de configurar el parámetro renotify como true en las opciones (a continuación
   encontrarás un ejemplo).

Busca estos aspectos mientras revisamos otro ejemplo. Supongamos que
ya recibiste o recuperaste datos de mensajes como se describe en la sección
anterior. Ahora veamos qué se puede hacer con eso.

Comencemos con un controlador básico de eventos push. El método `waitUntil()` muestra una
promesa que resuelve los datos de la notificación.


    self.addEventListener('push', function(event) {
      const promiseChain = getData(event.data)
      .then(data => {
        // Do something with the data
      });
      event.waitUntil(promiseChain);
    });


Cuando tenemos los datos del mensaje, llamamos a `getNotifications()` usando `data.tag`.

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag});
  })
  .then(notifications => {
    //Do something with the notifications.
  })</strong>;
  event.waitUntil(promiseChain);
});
</pre>

En otros ejemplos, creamos instancias de nuestro objeto `options` directamente en la llamada a
`showNotification()`. Para este caso, el objeto `options` necesita cambiar
según los resultados de `getNotifications()`, por lo que creamos instancias del objeto
`options` de la notificación.

Ten en cuenta que también hemos adjuntado los datos de notificación a las opciones de
notificación. Haremos esto a fin de asegurarnos de que esté disponible para `notificationclick`,
que observaremos en una sección posterior. Para comunicarle al navegador que estamos combinando
notificaciones, necesitamos reutilizar la `tag` y configurar `renotify` en `true`. Ambas se destacan a continuación.

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag})
    .then(notifications => {
      var noteOptions = {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        <strong>tag: data.tag,</strong>
        data: data
    	};

      if (notifications.length > 0) {
        <strong>noteOptions.renotify = true;</strong>
        // Configure other options for combined notifications.
      }
    })</strong>;
  });
  event.waitUntil(promiseChain);
});
</pre>

Cuando llenamos las propiedades restantes para las nuevas notificaciones, también
añadiremos dos botones de acción a la notificación. Una
abre la app; la otra descarta la notificación sin
realizar ninguna acción. El evento push no controla ninguna de estas acciones. Veremos
eso en la siguiente sección. Por último, muestra la notificación (línea 26).

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag})
    .then(notifications => {
      var noteOptions = {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        <strong>tag: data.tag,</strong>
        data: data
    	};

      if (notifications.length > 0) {
        data.title = "Flight Updates";
        noteOptions.body = "There are several updates regarding your flight, 5212 to Kansas City.";
        noteOptions.renotify = true;
        <strong>noteOptions.actions = [
          {action: 'view', title: 'View updates'},
          {action: 'notNow', title: 'Not now'}
        ];
      }

      return self.registration.showNotification(data.title, noteOptions);
    })</strong>;
  });
  event.waitUntil(promiseChain);
});
</pre>

## Colocar las acciones en la notificación {: #notification-actions }

Ya hemos visto ejemplos de notificaciones con acciones incorporadas. Veamos
cómo se implementan y cómo responder a ellas.

Recuerda que `showNotification()` lleva un argumento de opciones con una o más
acciones opcionales.


    ServiceWorkerRegistration.showNotification(title, {  
      body: data.body,  
      icon: (data.icon ? data.icon : '/images/i_face_black_24dp_2x.png'),  
      vibrate: [200, 100, 200, 100, 200, 100, 400],  
      tag: data.tag,  
      actions: [  
        {action: 'change', title: 'Ask for reschedule'},  
        {action: 'confirm', title: 'Confirm'}  
      ],  
      data: data  
    })

<figure class="attempt-right">
  <img src="images/confirmation.png" alt="Una notificación con acciones.">
</figure>

La notificación indica que Stacy ha
confirmado una cita para las 3:00 p. m. El receptor puede responder con
su propia confirmación o pedir que se restablezca la cita. Para la
primera opción, enviamos un mensaje directamente al servidor. Para la segunda, abrimos
la app con una interfaz adecuada.

<div style="clear:both;"></div>

Primero, agregaremos un controlador de eventos `notificationclick` para el service worker. Además,
cerramos la notificación.


    self.addEventListener('notificationclick', function(event) {  
      event.notification.close();  
      // Process the user action.  
    });


A continuación, necesitamos algo de lógica para descubrir el punto en el que se hizo clic sobre la notificación. ¿El
usuario hizo clic en la opción de confirmar, en la de solicitar otra cita o en ninguna?

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  <strong>if (event.action === 'confirm') {
    // Send the confirmation to the server.
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }</strong>
});
</pre>

Si el usuario hizo clic en la opción de confirmar, podemos devolver eso directamente al servidor
sin abrir la app (líneas 3 a la 13). Ten en cuenta que
regresaremos del evento `notificationclick` de inmediato después de enviar la
confirmación al servidor. Esto evita que se abra la app.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  <strong>if (event.action === 'confirm')
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.</strong>
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }
});
</pre>

Si el receptor hizo clic en la opción para solicitar otra cita, lo que queremos es abrir una página de confirmación. Si el usuario hace clic en otro lugar que no sea un botón de acción, lo que queremos es simplemente abrir la app.
En ambos casos, creamos una URL correspondiente.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'confirm') {
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.
  <strong>} else if (event.action === 'change') {
    var appUrl = '/?confirmation_id=' +
      event.notification.data.confirmation_id + '#reschedule';
  } else {
    var appUrl = '/';
  }
  // Navigate to appUrl.</strong>
});
</pre>

Note: A partir de aquí, los ejemplos de código se vuelven algo extensos. Vamos a truncarlos por razones de espacio. No te preocupes, Te mostraremos todo completo al final.

Independientemente de la URL, llamaremos a `clients.matchAll()` para obtener una ventana de cliente con la que se pueda
navegar.


    self.addEventListener('notificationclick', function(event) {
      // Content excerpted

      event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
        })
      );
    });


Finalmente, necesitaremos tomar diferentes rutas de acceso de navegación según haya o no un
cliente abierto.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  // Content excerpted

  event.waitUntil(clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
    <strong>}).then( activeClients => {
      if (activeClients.length > 0) {
        activeClients[0].navigate(appUrl);
        activeClients[0].focus();
      } else {
        clients.openWindow(appUrl);
      }</strong>
    })
  );
});
</pre>


Aquí se muestra el controlador `notificationclick` completo de un extremo a otro.


    self.addEventListener('notificationclick', function(event) {
      event.notification.close();
      if (event.action === 'confirm') {
        var fetchOptions = {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: event.notification.data.confirmation_id
        };
        var confirmation = new Request('/back/end/system/confirm');
        event.waitUntil(fetch(confirmation, fetchOptions));
        return; // So we don't open the page when we don't need to.
      } else if (event.action === 'change') {
        var appUrl = '?confirmation_id=' +
          event.notification.data.confirmation_id + '#reschedule';
      } else {
        var appUrl = '/';
      }

      event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
        }).then( activeClients => {
          if (activeClients.length > 0) {
            activeClients[0].navigate(appUrl);
            activeClients[0].focus();
          } else {
            clients.openWindow(appUrl);
          }
        })
      );
    });


{# wf_devsite_translation #}
