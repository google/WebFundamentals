project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Para solicitar permiso de notificación y registrar usuarios a fin de que reciban notificaciones, solo es necesario algo tan sutil como hacer que las vean.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-06-30 #}

# Solicitar permiso y suscribir usuarios {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

Para solicitar permiso de notificación y registrar usuarios a fin de que reciban notificaciones, solo es necesario algo tan sutil como hacer que las vean.

En esta sección y la que restante, te mostraré el código actual.
Es importante ser claro con respecto a dónde se implementan estos fragmentos de código. Aquí
es donde la comprensión de procesos de trabajo se vuelve importante. El código para
solicitar permiso y suscribir usuarios se lleva a cabo en el código de tu app, en lugar
del código del proceso de trabajo. Luego, se usará el proceso de trabajo cuando procesemos
mensajes de notificaciones push y se los mostrará al usuario.

## Verifica que existan permisos {: #check-permissions }

Siempre verifica que exista un permiso cuando se cargue la página. Si ya se otorgó el
permiso, puedes comenzar a enviar notificaciones
de inmediato. De cualquier manera, usa esta información para fijar la configuración del estado de permiso.
 A continuación, se muestra un ejemplo de esto. Para ser claros, aún no hemos realizado
solicitudes.

Note: Para ser claros, este ejemplo excluye un número de comprobaciones de funciones
que debes realizar siempre. Puedes ver el código original completo en
nuestro <a href='https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications'>
repositorio de ejemplos de GitHub</a>.


    function initialiseState() {
      if (Notification.permission !== 'granted') {
        console.log('The user has not granted the notification permission.');
        return;
      } else if (Notification.permission === “blocked”) {
       /* the user has previously denied push. Can't reprompt. */
      } else {
        /* show a prompt to the user */
      }

      // Use serviceWorker.ready so this is only invoked
      // when the service worker is available.
      navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
          .then(function(subscription) {
            if (!subscription) {
              // Set appropriate app states.
              return;
            }
          })
          .catch(function(err) {
            console.log('Error during getSubscription()', err);
          });
      });
    }


## Evita los requisitos de suscripción al cargarse la página {: #avoid-page-load-requests }

Ten en cuenta que el ejemplo anterior _no_ llama a
`pushManager.subscribe()`, aunque esto parece ser la respuesta lógica al
determinar que no hay una suscripción existente. Tales solicitudes pueden parecer oportunas. Sin embargo, debido a que aún no sabes nada sobre tus usuarios y tal vez ellos tampoco
sepan nada sobre ti, es difícil enviarles mensajes
precisos o relevantes.

## Solicitar permiso {: #requesting-permission }

<figure class="attempt-right">
  <img src="images/news-prompt.png" alt="Primero pregunta antes de enviar notificaciones y explica el motivo.">
</figure>

Sin importar cuándo la realices, la solicitud de permiso es un proceso que consta de dos pasos.
Primero, pregunta si tu app puede enviar notificaciones con un mensaje en el que se
explique el motivo por el cual les envías notificaciones.

Si el usuario lo aprueba, podemos obtener una suscripción del administrador
de notificaciones push. Haz esto llamando a `PushManager.subscribe()` (destacado en el siguiente
ejemplo). En este ejemplo, pasamos un objeto con `userVisibleOnly` fijado
en `true` para indicarle al navegador que siempre le mostraremos una notificación al
usuario. También incluiremos un elemento `applicationServerKey`.


<div style="clear:both;"></div>

<pre class="prettyprint">
if ('showNotification' in ServiceWorkerRegistration.prototype) {
  navigator.serviceworker.ready
  .then(registration => {
    <strong>return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array([...])
    });</strong>
  })
  .then(subscription => {
    // Do something with the subscription.
  })
  .catch(error => {
    // Do something with the error.
  });
}
</pre>

Este es el resultado en Chrome.

![Chrome solicita permisos.](images/news-permissions.png){:width="296px"}

### ¿Qué es la applicationServerKey? {: #applicationserverkey }

El valor `applicationServerKey` lo tiene que generar tu servidor. Estamos guardando
todos lo problemas del servidor para la siguiente sección. Por ahora, hay una cosa que tienes que
saber acerca de `applicationServerKey`: cuando se pasa la clave a una llamada
`subscribe()`, asegúrate de que es un
[Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
(un conjunto de valores enteros de 8 bits sin firmar).

## Disparador desde una acción específica {: #trigger-from-action }

<figure class="attempt-right">
  <img src="images/airline-prompt.png" alt="Una solicitud con una acción específica.">
</figure>

Pide permiso para enviar notificaciones en respuesta a una acción específica y contextual
del usuario. Esto te permite vincular tus notificaciones
al objetivo de un usuario y deja en claro para este el motivo por el cual deseas enviar
notificaciones.

Por ejemplo, si desde el sitio de una aerolínea se buscara notificar demoras de vuelos,
se mostraría de manera prominente una casilla de verificación de participación y solo se solicitarían permisos de
notificación una vez que el usuario eligiera participar.

<div style="clear:both;"></div>

## Proporciona un espacio para administrar notificaciones {: #manage-notifications }

Haz que para los usuarios sea más sencillo cambiar e incluso inhabilitar notificaciones de tu sitio.
Evita que eliminen las notificaciones en el nivel del navegador o del dispositivo.

Agrega un cambio de notificación en un espacio con altamente visible. Además, etiquétalo para
indicar a los usuarios lo que deseas enviarles y no cómo se implementa. Los usuarios saben
de notificaciones push tanto como tú del ajuste de la
órbita de una cápsula Soyuz.

<div class="attempt-left">
  <figure>
    <img src="images/flight-delay.png">
    <figcaption class="success">
      <b>Lo que debes hacer:</b> Un cambio de notificaciones que muestre el contenido de las notificaciones.
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/send-push.png">
    <figcaption class="warning">
      <b>Lo que no debes hacer:</b> Un cambio de notificaciones que muestre cómo se implementan las notificaciones.
    </figcaption>
  </figure>
</div>
<div style="clear:both;"></div>


## Pasar una suscripción al servidor {: #passing-subscription }

Después de obtener el permiso de un usuario para enviar notificaciones y configurar el estado de los
controles relacionados, debes enviar la información de suscripción (denominada
“Recurso de aplicación” en la especificación) al servidor de aplicación. Esto incluye la creación de un
objeto de solicitud apropiado que contenga datos de suscripción y luego los pase al
servidor.

Cuando creas la solicitud (destacado en el siguiente ejemplo), usa el verbo `POST`
y un encabezado `Content-Type` de `application/json`. Para el cuerpo, debes
convertir el objeto de suscripción en una string. Veremos el contenido de este
objeto en la próxima sección, [Cómo enviar mensajes](sending-messages). Usa `fetch()`
para enviar la solicitud de suscripción al servidor.

<pre class="prettyprint">
if ('showNotification' in ServiceWorkerRegistration.prototype) {
  navigator.serviceworker.ready
  .then(registration => {
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array([...])
    });
  })
  <strong>.then(subscription => {
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(subscription)
    };
    return fetch('/your-web-server/api', fetchOptions);
  })</strong>
  .catch(error => {
    // Do something with the error.
  });
}
</pre>


{# wf_devsite_translation #}
