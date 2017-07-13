project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pantalla completa disponible.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-10-01 #}

# Desarrollar experiencias en pantalla completa {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="ZRqr5x73-ng"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Tenemos la capacidad de realizar fácilmente sitios web y apps con modo pantalla completa de inmersiva
, pero como cualquier otra cosa en la web, hay algunas maneras de hacerlo.
Esto es especialmente importante ahora que más navegadores admiten una experiencia "app web
instalada" que inicia la pantalla completa.

<div class="clearfix"></div>

## Obtener pantalla completa para tu app o tu sitio

Hay varios modos de que un usuario o desarrollador pueda obtener pantalla completa para una app web.

* Solicítale al navegador el modo de pantalla completa en respuesta al gesto de un usuario.
* Instala la app en la página principal.
* Simulación: esconder automáticamente la barra de direcciones.

### Solicítale al navegador el modo de pantalla completa en respuesta al gesto de un usuario

<a href="http://caniuse.com/#feat=fullscreen">No todas las plataformas son iguales</a>.
Safari de iOS no tiene una API con el modo de pantalla completa, pero Chrome en Android,
Firefox y en IE 11+ sí la tienen. La mayoría de las apps que creas usan una combinación de la
API JS y de los selectores CSS a cargo de la especificación del modo de pantalla completo. Las principales
API JS por las que te tienes que preocupar cuando desarrollas una experiencia en pantalla completa son:

* `element.requestFullscreen()` (actualmente con prefijo en Chrome, Firefox y en IE)
  muestra el elemento en el modo de pantalla completa.
* `document.exitFullscreen()` (actualmente con prefijo en Chrome, Firefox y en IE.
  En cambio, Firefox usa `cancelFullScreen()`) cancela el modo de pantalla completa.
* `document.fullscreenElement` (actualmente con prefijo en Chrome, Firefox y en IE)
  muestra true si alguno de los elementos está en modo de pantalla completa.

Note: Ten en cuenta que en las versiones con prefijo hay mucha
      inconsistencia en el uso de mayúsculas y minúsculas para la “S”. Esto es raro, pero
      este es el problema con las especificaciones que están en vuelo.

Cuando tu app tiene el modo de pantalla completa, ya no tienes disponibles los controles de IU del
navegador. Esto cambia el modo en que los usuarios interactúan con tu
experiencia. No tienen los controles de navegación estándar como Forwards
y Backwards; no tienen su ruta de escape que es el botón Refresh.  Es
importante cubrir este escenario.  Puedes usar algunos selectores CSS que te ayuden a
cambiar el estilo y la presentación de tu sitio cuando el navegador acceda
al modo de pantalla completa.

    <button id="goFS">Go fullscreen</button>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          document.body.requestFullscreen();
      }, false);
    </script>

El ejemplo anterior es un poco forzado; he ocultado toda la complejidad alrededor del
uso de los prefijos de proveedores.

Note: ¡Benditos prefijos de proveedores!

El código actual es mucho más complejo. <a
href="https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode">Mozilla
ha creado</a> una secuencia de comandos muy útil que puedes usar para activar o desactivar la pantalla completa.  Como puedes
ver, la situación del prefijo de proveedores es compleja y
engorrosa en comparación con la API especificada. Incluso con el siguiente código que es un poco más simple
, es complejo.

    function toggleFullScreen() {
      var doc = window.document;
      var docEl = doc.documentElement;

      var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

      if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
      }
      else {
        cancelFullScreen.call(doc);
      }
    }

Nosotros, los desarrolladores web odiamos la complejidad.  Una buena API de alto nivel y abstracta que puedes usar
es <a href="http://sindresorhus.com/screenfull.js"/>Sindre Sorhus'</a> <a
href="https://github.com/sindresorhus/screenfull.js">Screenfull.js</a> módulo
que unifica las dos API JS con pequeñas diferencias en una
API consistente.

#### Sugerencias para Fullscreen API

##### Activar el modo de pantalla completa del documento

<figure class="attempt-right" style="max-width: 320px;">
  <img src="images/body.png">
  <figcaption>Figura 1: pantalla completa en el elemento de cuerpo.</figcaption>
</figure>


Es natural pensar que tomas el modo de pantalla completa del elemento de cuerpo, pero si estás
en un motor renderizado Webkit o Blink, verás que tiene un efecto raro de
reducción del ancho del cuerpo hasta el tamaño más pequeño posible que contendrá todo el
contenido. (Mozilla Gecko está bien).

<div class="clearfix"></div>

<figure class="attempt-right" style="max-width: 320px;">
<img src="images/document.png" >
<figcaption>Figura 2: pantalla completa en el elemento del documento.</figcaption>
</figure>

Para solucionar esto, usa el elemento de documento en lugar del elemento de cuerpo:

    document.documentElement.requestFullscreen();



<div class="clearfix"></div>


##### Activar el modo de pantalla completa de un elemento de video

La activación del modo de pantalla completa de un elemento de video es exactamente igual a la activación de cualquier otro
elemento. Llamas al método `requestFullscreen` en el elemento de
video.

    <video id=videoElement></video>
    <button id="goFS">Go Fullscreen</button>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          var videoElement = document.getElementById("videoElement");
          videoElement.requestFullscreen();
      }, false);
    </script>

Si tu elemento `<video>` no tiene el atributo de controles definido,
no hay modo de que el usuario controle el video una vez que estén en pantalla completa. El modo
recomendado de hacer esto es tener un contenedor básico que encapsule el video y
los controles que quieres que vea el usuario.

    <div id="container">
      <video></video>
      <div>
        <button>Play</button>
        <button>Stop</button>
        <button id="goFS">Go fullscreen</button>
      </div>
    </div>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          var container = document.getElementById("container");
          container.requestFullscreen();
      }, false);
    </script>

Esto te otorga más flexibilidad porque puedes combinar el objeto
contenedor con el pseudo selector CSS (por ejemplo para ocultar el botón "goFS").

    <style>
      #goFS:-webkit-full-screen #goFS {
        display: none;
      }
      #goFS:-moz-full-screen #goFS {
        display: none;
      }
      #goFS:-ms-fullscreen #goFS {
        display: none;
      }
      #goFS:fullscreen #goFS {
        display: none;
      }
    </style>

Con el uso de estos patrones, puedes detectar cuando se ejecuta la pantalla completa y puedes adaptar tu
interfaz de usuario de un modo apropiado, por ejemplo:

* Al proporcionar un vínculo de regreso a la página de inicio
* Al proporcionar un mecanismo para cerrar diálogos o ir hacia atrás


### Iniciar el modo de pantalla completa de una página desde la pantalla de inicio

No es posible el inicio de una página web de pantalla completa cuando el usuario navega hacia esta.
Los proveedores del navegador son muy conscientes de que desarrollar una experiencia de pantalla completa cada vez que se carga
la página es una gran molestia, por lo tanto se solicita un gesto del usuario para acceder a una pantalla completa.
Los proveedores permiten que los usuarios "instalen" las apps y el acto de instalación es una
señal al sistema operativo de que el usuario la quiere lanzar como una app en la
plataforma.

En las principales plataformas móviles es bastante sencillo implementar el uso de
metaetiquetas o archivos manifiesto de la siguiente manera.

#### iOS

Desde el lanzamiento del iPhone, los usuarios han podido instalar las apps web en
la pantalla de inicio y las han lanzado como apps web de pantalla principal.

    <meta name="apple-mobile-web-app-capable" content="yes">

> Si el contenido está configurado en sí, la app web se ejecuta en el modo de pantalla completa;
> de lo contrario, no lo hace. El comportamiento predeterminado es usar Safari para mostrar contenido
> web. Puedes determinar si una página web se muestra en el modo de pantalla completa
> usando la propiedad booleana de solo lectura de JavaScript window.navigator.standalone.
> <a href="https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html">Apple</a>

#### Chrome para Android

El equipo Chrome ha implementado recientemente una función que le indica al navegador que
inicie la pantalla completa de la página cuando el usuario la ha agregado a la pantalla de inicio.  Es
similar al modelo Safari de iOS.

    <meta name="mobile-web-app-capable" content="yes">

> Puedes configurar tu app web para que agregue un ícono de acceso directo a una app en la
> pantalla de inicio de un dispositivo y para que inicie la app en el "modo app" en pantalla completa usando
> Chrome para el elemento del menú de Android "Agregar en la pantalla principal".
>  <a href="https://developers.chrome.com/multidevice/android/installtohomescreen">Google Chrome</a>

Una mejor opción es usar el manifiesto de apps web.

#### El manifiesto de apps web (Chrome, Opera, Firefox, Samsung)

El [manifiesto para las apps web](/web/fundamentals/engage-and-retain/web-app-manifest/)
es un archivo JSON simple que le proporciona a usted, el
desarrollador, la capacidad de controlar cómo se le muestra su app al usuario en las áreas
en las que espera ver apps (por ejemplo, la pantalla de inicio de los celulares), dirigir
lo que el usuario puede iniciar y, lo que es más importante, cómo puede hacerlo. En el
futuro, el manifiesto le permitirá tener incluso más control sobre su app, pero ahora
solo nos centramos en cómo se puede iniciar su app. Específicamente:

1. Informa al navegador acerca de tu manifiesto
2. Describir cómo iniciar

Una vez que hayas creado el manifiesto y que esté alojado en tu sitio, deberás
agregar una etiqueta de vínculo en todas las páginas en las que se muestra tu app, tal como se explica a continuación.

    <link rel="manifest" href="/manifest.json">

Chrome ha admitido manifiestos desde la versión 38 para Android (Octubre de 2014)
y te da el control sobre cómo aparece la app web cuando se instala
en la pantalla de inicio (a través de las propiedades `short_name`, `name` y `icons`) y cómo se tiene que
iniciar cuando el usuario hace clic en el ícono de ejecución (a través de `start_url`,
`display` y `orientation`).

A continuación, se muestra un ejemplo de manifiesto. No muestra todo lo que puede haber en un
manifiesto.

    {
      "short_name": "Kinlan's Amaze App",
      "name": "Kinlan's Amazing Application ++",
      "icons": [
        {
          "src": "launcher-icon-4x.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ],
      "start_url": "/index.html",
      "display": "standalone",
      "orientation": "landscape"
    }

Esta función es completamente progresiva y te permite generar mejores experiencias y más integradas
para usuarios de un navegador que admite la función.

Cuando un usuario agrega tu sitio o app a la pantalla de inicio, hay una intención por parte del
usuario de tratarlo como una app. Esto significa que tienes que dirigir al usuario a
la funcionalidad de tu app en lugar de a una página de destino del producto. Por ejemplo,
si le solicitan al usuario que acceda a la app, entonces esa es una buena página para
lanzar.

##### Apps de utilidad

La mayoría de las apps de utilidad aprovecharán esto de inmediato. Para esas
app, querrás que se inicien de modo independiente como el resto de las apps
en una plataforma móvil. Para indicarle a una app que se inicie de modo independiente, agrega esto al manifiesto
de las apps web:

    "display": "standalone"

##### Juegos

La mayoría de los juegos aprovecharán un manifiesto de inmediato. Se querrá iniciar la vasta
mayoría de los juegos en pantalla completa y se fuerza una orientación
específica.

Si estás desarrollando un juego con desplazamiento vertical o como Flappy Birds entonces
seguramente querrás que esté siempre en modo de retrato.

    "display": "fullscreen",
    "orientation": "portrait"

Si, por otro lado, estás creando juegos de rompecabezas o un juego como X-Com, entonces
probablemente querrás que el juego siempre use la orientación horizontal.

    "display": "fullscreen",
    "orientation": "landscape"

##### Sitios de noticias

En la mayoría de los casos, los sitios de noticias son experiencias basadas en contenido puro. Naturalmente
la mayoría de los desarrolladores no piensan en agregar un manifiesto a un sitio de noticias.  El manifiesto
te permitirá definir qué iniciar (la portada de tu sitio de noticias) y
cómo iniciarlo (pantalla completa o como una pestaña de navegador normal).

La elección depende de ti y de cómo crees que les gustaría a tus usuarios acceder a tu
experiencia. Si quieres que tu sitio tenga todas las posibilidades del navegador chrome que
pretendes para un sitio, puedes configurar la pantalla en `browser`.

    "display": "browser"

Si quieres que tu sitio de noticias se parezca a cómo la mayoría de las apps centradas en noticias tratan
sus experiencias como app y quite todos los navegadores chrome similares a la web desde la IU, puedes hacer
esto configurando la pantalla en `standalone`.

    "display": "standalone"

### Simulación: esconder automáticamente la barra de direcciones.

Puedes "simular la pantalla completa" ocultando automáticamente la barra de direcciones de la siguiente manera:

    window.scrollTo(0,1);

Warning: Te lo digo como amigo. Existe. Es una cosa, pero
         es una modificación. Por favor no lo uses. &mdash; Paul

Este es un método bastante simple, la página se carga y se le indica a la barra del navegador que
se quite del camino. Desafortunadamente no es estandarizado y no es muy
compatible. También tienes que trabajar en varias interpretaciones.

Por ejemplo los navegadores a menudo restauran la posición en la página cuando el usuario
retrocede en su navegación hasta esta. Usar `window.scrollTo` anula esto, que le resulta fastidioso
al usuario. Para solucionar esto, tienes que almacenar la última posición en
localStorage y abordar los casos extremos (por ejemplo, si el usuario tiene la
página abierta en varias ventanas).

## Pautas de la experiencia de usuario

Cuando estás creando un sitio que saca provecho de la pantalla completa, hay un
número de cambios de experiencia de usuarios potenciales que tienes que tener en cuenta para
crear un servicio que tus usuarios amarán.

### No debes basarte en los controles de navegación

No hay disponible un botón atrás de hardware o un gesto de actualización para iOS. Por lo tanto te tienes que
asegurar de que los usuarios puedan navegar en toda la app sin bloquearse.

Puedes detectar fácilmente si estás ejecutando en un modo de pantalla completa o en un modo instalado
en todas las principales plataformas.

#### iOS

En iOS, puedes usar el valor booleano `navigator.standalone` para ver si el usuario ha
iniciado o no desde la pantalla de inicio.

    if(navigator.standalone == true) {
      // My app is installed and therefore fullscreen
    }

#### El manifiesto de apps web (Chrome, Opera, Samsung)

Cuando se inicia como una app instalada, Chrome no se ejecuta en una experiencia verdadera de pantalla completa
de modo que el resultado de `document.fullscreenElement` es nulo y los selectores CSS
no funcionan.

Cuando el usuario solicita pantalla completa a través de un gesto en tu sitio, las API estándar de pantalla completa
están disponibles incluso el pseudo selector CSS que te permite
adaptar tu IU para reaccionar ante el estado de pantalla completa de la siguiente manera

    selector:-webkit-full-screen {
      display: block; // displays the element only when in fullscreen
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

Si los usuarios inician su sitio desde la pantalla de inicio la consulta de medios `display-mode` se
fijará en lo que se definió en el manifiesto de la app web. En el caso de
pantalla completa pura será:

    @media (display-mode: fullscreen) {

    }

Si el usuario inicia la app de modo independiente, la consulta de medios `display-mode`
será `standalone`:

    @media (display-mode: standalone) {

    }


#### Firefox

Cuando el usuario solicita pantalla completa a través de tu sitio o el usuario inicia la app en
el modo de pantalla completa, todas las API estándar de pantalla completa están disponibles incluso el
pseudo selector CSS que te permite adaptar tu IU para reaccionar ante el estado de pantalla completa
de la siguiente manera:

    selector:-moz-full-screen {
      display: block; // hides the element when not in fullscreen mode
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

#### Internet Explorer

En IE, la pseudo clase CSS carece de un guión. Sin embargo, por otra parte, funciona de modo similar en
Chrome y Firefox.

    selector:-ms-fullscreen {
      display: block;
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

#### Especificación

La ortografía en la especificación coincide con la sintaxis que usa IE.

    selector:fullscreen {
      display: block;
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

### Mantén al usuario en la experiencia de pantalla completa

A veces la API de pantalla completa puede ser un poco exhaustiva. Los proveedores del navegador no quieren
confinar a los usuarios en una página de pantalla completa de modo que han desarrollado mecanismos para salir
de la pantalla completa tan pronto como puedan.  Esto significa que no puedes crear un
sitio web de pantalla completa que abarque varias páginas porque:

* Con el cambio de la URL programáticamente usando `window.location =
  "http://example.com"` se sale de la pantalla completa.
* Un usuario que hace clic en un vínculo externo dentro de tu página saldrá de la pantalla completa.
* Con el cambio de la URL a través de la API `navigator.pushState` también se sale de la experiencia de
  pantalla completa.

Si quieres mantener al usuario en una experiencia de pantalla completa, tienes dos opciones:

1. Usar los mecanismos de la app web instalable para que activen la pantalla completa.
2. Administrar tu IU y el estado de la app usando el # fragmento.

Usando la #syntax para actualizar la url (window.location = "#somestate") y
escuchando al evento `window.onhashchange` puedes usar la pila de historial
propia del navegador para administrar cambios en el estado de la app, puedes permitir que el usuario use
sus botones atrás de hardware u ofrezca una experiencia simple y programática de botón atrás
usando la API de historial de la siguiente manera:

    window.history.go(-1);

### Permitir que el usuario elija cuando activar la pantalla completa

No hay nada más molesto para el usuario que un sitio web que hace algo
inesperado. Cuando un usuario navega hacia tu sitio, no intentes engañarlos para que accedan a la
pantalla completa.

No interceptes el primer evento táctil y llama a `requestFullscreen()`.

1. Es molesto.
2. Es posible que los navegadores le soliciten al usuario en algún momento el
   permiso para que en la app se active la pantalla completa.

Si quieres iniciar la pantalla completa de las apps, piensa en el uso de las experiencias de instalación
para cada plataforma.

### No le envíes correo no deseado al usuario para que instale tu app en una pantalla de inicio

Si planeas ofrecer una experiencia de pantalla completa a través de los mecanismos de la app instalada
se considerado con el usuario.

* Se discreto. Usa un banner o un pie de página para hacerles saber que puedes instalar la
  app.
* Si descartan la solicitud, no la muestres nuevamente.
* En una primera visita de los usuarios, es poco probable que instalen la app a menos que
  estén felices con tu servicio. Considera sugerirles la instalación después
  de una interacción positiva en tu sitio.
* Si un usuario visita tu sitio de modo regular y no instala la app, es muy poco probable que
  instale tu app en el futuro. No les sigas enviando correo no deseado.

## Conclusión

Mientras que no tengamos una API completamente estandarizada e implementada, con el uso de cierta
información que se presenta en este artículo puedes compilar de modo sencillo experiencias que saquen provecho
de la pantalla completa del usuario, independientemente del cliente.


{# wf_devsite_translation #}
