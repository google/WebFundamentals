project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: En este codelab, aprenderás a agregar notificaciones push a tu app web.

{# wf_updated_on: 2017-07-12T15:42:20Z #}
{# wf_published_on: 2016-01-01 #}


# Agregado de notificaciones push a una app web {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}



## Información general




Los mensajes push brindan una forma simple y efectiva de volver a interactuar con tus usuarios y en este codelab aprenderás a agregar notificaciones push a tu app web.

### Lo que aprenderás

* Cómo suscribir y anular la suscripción de un usuario a mensajería push
* Cómo manejar los mensajes push entrantes
* Cómo mostrar una notificación
* Cómo responder a clics de notificaciones

### Qué necesitarás

* Chrome 52 o superior
*  [Servidor web para Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) o el servidor web de tu elección
* Un editor de texto
* Conocimiento básico de HTML, CSS, JavaScript y Chrome DevTools
* El código de muestra, consulta Obtener configuración


## Obtener configuración




### Descargar el código de ejemplo

Puedes obtener el código de muestra de este código descargando el zip aquí:

[Vínculo](https://github.com/googlechrome/push-notifications/archive/master.zip)

o clonando este repositorio de git:

    git clone https://github.com/GoogleChrome/push-notifications.git

Si descargaste la fuente como un zip, cuando lo descomprimas deberías obtener una carpeta raíz `push-notifications-master`.

### Instala y verifica el servidor web

A pesar de que puedes usar tu propio servidor web, este codelab está diseñado para funcionar bien con Web Server de Chrome. Si aún no tienes la app instalada, puedes instalarla desde Chrome Web Store.

[Vínculo](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

Después de instalar la app Web Server for Chrome, haz clic en el atajo Apps de la barra de marcadores: 

![a80b29d5e878df22.png](img/a80b29d5e878df22.png)

En la ventana resultante, haz clic en el ícono de Web Server: 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

A continuación, verás un diálogo que te permite configurar tu servidor web local:

![433870360ad308d4.png](img/433870360ad308d4.png)

Haz clic en el botón __choose folder__ y selecciona la carpeta de la app. Esto te permitirá exhibir tu trabajo en progreso a través de la URL destacada en el diálogo del servidor web (en la sección __Web Server URL(s)__).

En Options, marca el cuadro al lado de "Automatically show index.html", como se muestra a continuación:

![39b4e0371e9703e6.png](img/39b4e0371e9703e6.png)

Luego, detén y reinicia el servidor deslizando el activador denominado "Web Server: STARTED" hacia la izquierda y luego a la derecha.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

Ahora visita tu sitio en tu propio navegador web (haciendo clic en la URL destacada de Web Server) o deberías ver una página como esta:

![4525ec369fc2ae47.png](img/4525ec369fc2ae47.png)

### Siempre actualiza el service worker

Durante el desarrollo, es útil para garantizar que tu service worker esté siempre actualizado y tenga los últimos cambios.

Para configurar esto en Chrome, abre DevTools (Clic derecho > Inspect) y dirígete al panel de __Application__, haz clic en la pestaña __Service Workers__ y marca la casilla de verificación __Update on Reload__. Cuando esta casilla de verificación está marcada, el service worker se actualiza forzosamente cada vez que se vuelve a cargar la página.

![6b698d7c7bbf1bc0.png](img/6b698d7c7bbf1bc0.png)


## Registra un Service Worker




En tu directorio `app`, fíjate que tienes un archivo vacío llamado `sw.js`. Este archivo será tu service worker, por ahora puede quedar vacío y más tarde le agregaremos un código.

Primero, tenemos que registrar este archivo como nuestro Service Worker.

Nuestra página `app/index.html` carga `scripts/main.js` y en el archivo de JavaScript registraremos nuestro service worker.

Agrega el siguiente código a `scripts/main.js`:

```
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}
```

Este código comprueba si el actual navegador es compatible con los service workers y la mensajería push. Si son compatibles, registra nuestro archivo `sw.js`.

#### Pruébalo

Revisa tus cambios abriendo la URL __127.0.0.1:8887__ en el navegador.

Abre Chrome DevTools para revisar la consola de `Service Worker is registered`, como aquí:

![de3ceca91043d278.png](img/de3ceca91043d278.png)

### Obtén claves del servidor de la app

Para trabajar con este code lab, tienes que generar claves del servidor de la app, cosa que podemos hacer con este sitio complementario:  [https://web-push-codelab.appspot.com/](https://web-push-codelab.appspot.com/)

Aquí puedes crear un par de claves pública y privada.

![a1304b99e7b981dd.png](img/a1304b99e7b981dd.png)

Copia tu clave pública en `scripts/main.js`, reemplazando el valor `<Your Public Key>`:

```
const applicationServerPublicKey = '<Your Public Key>';
```

Note: Nunca debes poner tu clave privada en tu app web.


## Inicia el estado




En este momento, el botón de la app web está inhabilitado y no se le puede hacer clic. Esto es porque es bueno inhabilitar el botón push de manera predeterminada y habilitarlo cuando sepas que push es compatible y puedas saber si el usuario está suscripto o no.

Creemos dos funciones en `scripts/main.js`, una llamada `initialiseUI`, que revisaremos si el usuario está suscripto actualmente, y una llamada `updateBtn`, que habilitará nuestro botón y cambiará el texto si el usuario está suscripto o no.

Queremos que nuestra función `initialiseUI` se vea así:

```
function initialiseUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
```

Nuestro nuevo método usa `swRegistration` del paso anterior y llama a `getSubscription()` en su `pushManager`. `getSubscription()` es un método que muestra una promesa que se resuelve con la suscripción actual, si la hay, o devuelve `null`. Así, podemos revisar si el usuario ya está suscripto o no, establecer estados y llamar a `updateBtn()`, para que el botón se habilite con un texto útil.

Agrega el siguiente código para implementar la función `updateBtn()`.

```
function updateBtn() {
  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
```

Esta función sencillamente cambia el texto según si el usuario está suscripto o no, y luego habilita el botón.

Lo último que hay que hacer es llamar a `initialiseUI()` cuando nuestro service worker está registrado.

```
navigator.serviceWorker.register('sw.js')
.then(function(swReg) {
  console.log('Service Worker is registered', swReg);

  swRegistration = swReg;
  initialiseUI();
})
```

#### Pruébalo

Abre tu app web y deberías ver que el botón ‘Enable Push Messaging' está habilitado (puedes hacerle clic) y deberías ver ‘User is NOT subscribed.' en la consola.

![15f6375617c11974.png](img/15f6375617c11974.png)

Cuando avanzamos por el resto del code lab, deberías ver que el texto del botón cambia cuando el usuario se suscribe/anula la suscripción.


## Suscribe al usuario




Ahora, nuestro botón ‘Enable Push Messaging' no hace mucho, solucionémoslo.

Agrega un receptor de clic a nuestro botón en la función `initialiseUI()`, así:

```
function initialiseUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
```

Cuando el usuario hace clic en el botón push, primero inhabilitamos el botón para asegurarnos de que el usuario no pueda hacer clic por segunda vez mientras suscribimos a push, ya que puede llevar un tiempo.

Entonces, llamamos a `subscribeUser()` cuando sabemos que el usuario no está suscripto, entonces copia y pega el siguiente código en `scripts/main.js`.

```
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}
```

Repasemos los pasos que este código está siguiendo y cómo está suscribiendo al usuario a mensajes push.

Primero, tomamos la clave pública del servidor de la app, que es una URL 64 base codificada, y la convertimos en `UInt8Array`, ya que es la entrada esperada de la llamada de suscripción. Ya te hemos brindado la función `urlB64ToUint8Array` en la primera parte de `scripts/main.js`.

Una vez que has convertido el valor, llamamos al método `subscribe()` del `pushManager` de nuestros service workers, pasando la clave pública del servidor de la app y el valor `userVisibleOnly: true`.

```
const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
```

El parámetro `userVisibleOnly` es, básicamente, una admisión para que muestres una notificación cada vez que se envía un push. Al momento de escribir, este valor es obligatorio y debe ser true.

Llamar a `subscribe()` devuelve una promesa que se resolverá después de los siguientes pasos:

1. El usuario ha otorgado servicio para mostrar notificaciones.
2. El navegador ha enviado una solicitud de red a un servicio push para obtener los detalles para generar una PushSubscription.

La promesa `subscribe()` se resolverá con una `PushSubscription` si estos pasos fueron exitosos. Si el usuario no otorga permiso o si hay algún problema en la suscripción del usuario, la promesa se rechazará con un error. Esto nos brinda la siguiente cadena de promesa en nuestro codelab:

```
swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
.then(function(subscription) {
  console.log('User is subscribed:', subscription);

  updateSubscriptionOnServer(subscription);

  isSubscribed = true;

  updateBtn();

})
.catch(function(err) {
  console.log('Failed to subscribe the user: ', err);
  updateBtn();
});
```

Con esto, obtenemos una suscripción y tratamos al usuario como suscripto o captamos el error y lo imprimimos en la consola. En ambos casos, llamamos a `updateBtn()` para asegurarnos de que el botón esté rehabilitado y tenga el texto correcto.

El método `updateSubscriptionOnServer` es un método mediante el que en una app real enviaríamos nuestra suscripción a un backend, pero para nuestro codelab imprimiremos la suscripción en nuestra IU, que nos ayudará más adelante. Agrega este método a `scripts/main.js`:

```
function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}
```

#### Pruébalo

Si vuelves a tu app web e intentas hacer clic en el botón, deberías ver un aviso de permiso como este:

![227cea0abe03a5b4.png](img/227cea0abe03a5b4.png)

Si otorgas el permiso, deberías ver la impresión de consola `User is subscribed:` con la `PushSubscription`, el texto del botón cambiará a ‘Disable Push Messaging' y podrás ver la suscripción como JSON en la parte inferior de la página.

![8fe2b1b110f87b34.png](img/8fe2b1b110f87b34.png)


## Manejo del acceso denegado




Algo que aún no hemos manejado es qué sucede si el usuario bloquea la solicitud de permiso. Esto necesita consideraciones únicas porque, si el usuario bloquea el permiso, nuestra app web no podrá volver a mostrar el aviso de permiso ni podrá suscribir al usuario, así que necesitamos al menos inhabilitar un botón push para que el usuario sepa que se puede usar.

El lugar obvio para que manejemos esta situación es la función `updateBtn()`. Lo único que tenemos que hacer es marcar el valor `Notification.permission`, de esta forma:

```
function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
```

Sabemos que si el permiso está `denied`, no se puede suscribir al usuario y no podemos hacer nada más, por eso la mejor opción es inhabilitar el botón definitivamente.

#### Pruébalo

Como ya hemos otorgado permiso para nuestra app web en el paso anterior, tenemos que hacer clic en la __i__ que está en un círculo en la barra de URL y cambiar el permiso de notificaciones a *Use global default (Ask)* .

![8775071d7fd66432.png](img/8775071d7fd66432.png)

Después de cambiar esta configuración, actualiza la página y haz clic en el botón *Enable Push Messaging* y, esta vez, selecciona *Block* en el diálogo de permiso. El texto del botón ahora será *Push Messaging Blocked* y estará inhabilitado.

![2b5314607196f4e1.png](img/2b5314607196f4e1.png)

Con este cambio, ahora podemos suscribir al usuario y nos estamos ocupando de las posibles situaciones de permiso.


## Manejo de un evento push




Antes de cubrir cómo enviar un mensaje push desde tu backend, tenemos que analizar qué sucederá cuando un usuario suscripto reciba un mensaje push.

Cuando lanzamos un mensaje push, el navegador recibe el mensaje push, descifra para qué service worker es el push antes de activar ese service worker y distribuir un evento push. Tenemos que escuchar este evento y mostrar una notificación como resultado.

Agrega el siguiente código a tu archivo `sw.js`:

```
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
```

Repasemos este código. Estamos escuchando eventos push en nuestro service worker agregando un receptor de eventos a nuestro service worker, que es la siguiente parte del código:

```
self.addEventListener('push', ...... );
```

A menos que antes hayas usado trabajadores web, `self` probablemente será nuevo. `self` hace referencia al service worker, así que agregamos un receptor de eventos a nuestro service worker.

Cuando se reciba un mensaje push, se ejecutará nuestro receptor de eventos, y crearemos una notificación llamando a `showNotification()` en nuestro registro. `showNotification()` espera un `title` y podemos otorgar un objeto `options`. Aquí estableceremos un mensaje, ícono e insignia en las opciones (la insignia solo se usa en Android al momento de escribir).

```
const title = 'Push Codelab';
const options = {
  body: 'Yay it works.',
  icon: 'images/icon.png',
  badge: 'images/badge.png'
};
self.registration.showNotification(title, options);
```

Lo último para cubrir nuestro evento push es `event.waitUntil()`. El método toma una promesa y el navegador mantendrá vivo tu service worker hasta que la promesa que se pasó se haya resuelto.

Para que el código anterior sea un poco más fácil de comprender, podemos reescribirlo de la siguiente forma:

```
const notificationPromise = self.registration.showNotification(title, options);
event.waitUntil(notificationPromise);
```

Ahora que hemos repasado el evento push, probemos un evento push.

#### Pruébalo

Con nuestro evento push en el service worker, podemos probar qué sucede cuando se recibe un mensaje disparando un evento push falso usando DevTools.

En tu app web, suscríbete a los mensajes push, asegurándote de tener *User IS subscribed* en tu consola. Luego, dirígete al panel *Application* en DevTools bajo la pestaña *Service Workers* y haz clic en el vínculo *Push* bajo tu service worker.

![2b089bdf10a8a945.png](img/2b089bdf10a8a945.png)

Cuando le haces clic debes ver una notificación como esta:

![eee7f9133a97c1c4.png](img/eee7f9133a97c1c4.png)

Note: Si este paso no funciona, intenta anular el registro de tu service worker, a través del vínculo *Unregister*  del panel de la app DevTools, espera que se detenga el service worker y vuelve a cargar la página.


## Clic de notificación




Si haces clic en una de estas notificaciones, notarás que no sucede nada. Podemos controlar los clics de notificación escuchando los eventos `notificationclick` de tu service worker.

Comienza agregando un receptor `notificationclick` en `sw.js`, así:

```
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});
```

Cuando el usuario hace clic en la notificación, se llamará al receptor de eventos `notificationclick`.

En este code lab, primero cerramos la notificación a la que se le hizo clic con lo siguiente:

```
event.notification.close();
```

Luego, abrimos una ventana/pestaña nueva cargando la url developers.google.com/web/ , puedes cambiar esto :)

```
clients.openWindow('https://developers.google.com/web/')
```

Estamos llamando a `event.waitUntil()` de nuevo para asegurarnos de que el navegador no finalice nuestro service worker antes de que se haya mostrado nuestra nueva ventana.

#### Pruébalo

Intenta disparar un mensaje push nuevamente en DevTools y haz clic en la notificación. Ahora verás la notificación, cierra y abre una pestaña nueva.


## Envío de mensajes push




Hemos visto que nuestra app web es capaz de mostrar una notificación usando DevTools y hemos visto cómo cerrar la notificación de un clic, el siguiente paso es enviar un mensajes push real.

Normalmente, el proceso para esto sería enviar una suscripción de una página web a un backend y el backend dispararía un mensaje push haciendo que una API llame al terminal de la suscripción.

Esto está fuera de alcance para este codelab, pero puedes usar el sitio complementario ([https://web-push-codelab.appspot.com/](https://web-push-codelab.appspot.com/)) para que este code lab dispare un mensaje push real. Copia y pega la suscripción en la parte inferior de la página:

![cf0e71f76cb79cc4.png](img/cf0e71f76cb79cc4.png)

Luego, pega esto en el sitio complementario, en el área de texto  *Subscription to Send To*  :

![a12fbfdc08233592.png](img/a12fbfdc08233592.png)

Luego, bajo  *Text to Send*  puedes agregar cualquier cadena que desees enviar con el mensaje push y hacer clic en el botón  *Send Push Message*  .

![2973c2b818ca9324.png](img/2973c2b818ca9324.png)

Luego, deberías recibir un mensaje push y el texto que incluiste se imprimirá en la consola.

![75b1fedbfb7e0b99.png](img/75b1fedbfb7e0b99.png)

Deberías darte la oportunidad de probar el envío y recepción de datos, y de manipular notificaciones como resultado.

La app complementaria es en realidad solo un servidor de nodo que usa la  [biblioteca web-push](https://github.com/web-push-libs/web-push) para enviar mensajes. Vale la pena revisar las  [bibliotecas web-push de Github](https://github.com/web-push-libs/) para saber qué bibliotecas están disponibles para enviar mensajes push para ti (esto controla muchos de los detalles esenciales para disparar mensajes push).


## Anula la suscripción del usuario




Lo único que nos falta es la capacidad de anular la suscripción del usuario de push. Para hacer esto, necesitamos llamar a `unsubscribe()` en una `PushSubscription`.

En nuestro archivo `scripts/main.js`, cambia el receptor de clic de `pushButton` en `initialiseUI()` a lo siguiente:

```
pushButton.addEventListener('click', function() {
  pushButton.disabled = true;
  if (isSubscribed) {
    unsubscribeUser();
  } else {
    subscribeUser();
  }
});
```

Nota que vamos a llamar a una nueva función `unsubscribeUser()`. En este método, obtendremos la suscripción actual y anularemos la suscripción. Agrega el siguiente código a `scripts/main.js`:

```
function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}
```

Repasemos esta función.

Primero, obtenemos la suscripción actual, llamando a `getSubscription()`:

```
swRegistration.pushManager.getSubscription()
```

Esto devuelve una promesa que resuelve con una `PushSubscription`, si existe alguna, o devuelve `null`. Si hay una suscripción, llamamos a `unsubscribe()`, que hace que la `PushSubscription` no sea válida.

```
swRegistration.pushManager.getSubscription()
.then(function(subscription) {
  if (subscription) {
    // TODO: Tell application server to delete subscription
    return subscription.unsubscribe();
  }
})
.catch(function(error) {
  console.log('Error unsubscribing', error);
})
```

Llamar a `unsubscribe()` devuelve una promesa, ya que puede llevar un tiempo completarse, entonces devolvemos esa promesa para que el próximo `then()` de la cadena espere que `unsubscribe()` finalice. También agregamos un controlador de captura en caso de que llamar a `unsubscribe()` resulte en un error. Después de esto, podemos actualizar nuestra IU.

```
.then(function() {
  updateSubscriptionOnServer(null);

  console.log('User is unsubscribed.');
  isSubscribed = false;

  updateBtn();
})
```

#### Pruébalo

Deberías poder presionar  *Enable Push Messaging*  /  *Disable Push Messaging*   en tu app web y los registros mostrarán que el usuario se suscribe y anula la suscripción.

![33dd89c437c17c97.png](img/33dd89c437c17c97.png)


## Finalizado




¡Felicitaciones por completar este codelab!

Este code lab te ha enseñado a desarrollar tus conocimiento para agregar push a tu app web. Si quieres conocer más sobre lo que pueden hacer las notificaciones web,  [consulta estos documentos](/web/fundamentals/engage-and-retain/push-notifications/). 

Si buscas implementar push en tu sitio, te puede interesar agregar soporte para navegadores más viejos/no estándar compatibles que usen GCM,  [conoce más aquí](https://web-push-book.gauntface.com/chapter-06/01-non-standards-browsers/).

### Consultas adicionales

*  Documentación sobre [notificación web push](/web/fundamentals/engage-and-retain/push-notifications/) en Web __Fundamentals__
*  [Bibliotecas web push](https://github.com/web-push-libs/) - Bibliotecas web push que incluyen Node.js, PHP, Java y Python.

#### Entradas de blogs relevantes

*  [Encriptación de carga web push](/web/updates/2016/03/web-push-encryption)
*  [Claves de servidor de la app y web push](/web/updates/2016/07/web-push-interop-wins)
*  [Acciones de la notificación](/web/updates/2016/01/notification-actions)
*  [Íconos, cerrar eventos, renotificar preferencias y marcas de tiempo](/web/updates/2016/03/notifications)





## ¿Encontraste un problema o tienes comentarios? {: .hide-from-toc }
Ayúdanos a que nuestros code labs sean mejores enviando un 
[problema](https://github.com/googlechrome/push-notifications/issues) hoy. ¡Gracias!

{# wf_devsite_translation #}
