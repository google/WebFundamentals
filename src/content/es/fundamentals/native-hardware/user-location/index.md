project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La mayoría de los navegadores y dispositivos tienen acceso a la ubicación geográfica de los usuarios. Aprenda a utilizar la ubicación del usuario en su sitio y sus apps.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-01-01 #}

# Ubicación del usuario {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

La Geolocation API te permite descubrir, con el consentimiento del usuario, la ubicación del usuario. Puedes usar esta funcionalidad para situaciones como guiar a un usuario hacia su destino y etiquetar geográficamente contenido creado por el usuario; por ejemplo, marcar dónde se tomó una foto.

La Geolocation API le permite averiguar dónde se encuentra el usuario y mantenerse informado a medida que
este se desplaza, siempre con su consentimiento (y solo cuando la página está abierta). Esto 
genera muchos casos de uso interesantes, como la integración con sistemas de respaldo para preparar un pedido para que lo retire el usuario si se encuentra cerca del lugar.

Tienes que tener en cuenta varias cosas cuando usas la Geolocation API. Esta guía te ayudará con los casos de uso comunes y las soluciones.

Note: A partir de Chrome 50, la [Geolocation API solo funciona en contextos seguros (HTTPS)](/web/updates/2016/04/geolocation-on-secure-contexts-only). Si tu sitio se aloja en un origen que no es seguro (como `HTTP`), cualquier solicitud de ubicación del usuario **no volverá a** funcionar.

### TL;DR {: .hide-from-toc }

* Usa la ubicación geográfica cuando beneficie al usuario.
* Pide permiso como una clara respuesta ante el gesto de un usuario. 
* Usa la detección de funciones en el caso de que el navegador de un usuario no admita la ubicación geográfica.
* No solo aprendas cómo implementar la ubicación geográfica; aprende la mejor manera de usarla.
* Prueba la ubicación geográfica con tu sitio.

##  Cuándo usar la ubicación geográfica

*  Descubre los casos en los que el usuario está cerca de su ubicación física para personalizar 
   la experiencia del usuario.
*  Adapta la información (como las noticias) a la ubicación del usuario.
*  Muestra la posición de un usuario en un mapa.
*  Etiqueta los datos creados dentro de su app con la ubicación del usuario 
 (p. ej., etiquete geográficamente una imagen).

## Pedir permiso de modo responsable

Estudios recientes realizados entre los usuarios [han demostrado](http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf)
que los usuarios no confían en los sitios que simplemente le solicitan al usuario que proporcione su
posición durante la carga de la página. ¿Cuáles son las prácticas recomendadas?

### Supón que los usuarios no te proporcionarán su ubicación

Muchos de tus usuarios no querrán proporcionarte su
ubicación, por lo que deberás adoptar un estilo de desarrollo defensivo.

1.  Soluciona todos los errores fuera de la Geolocation API de modo que puedas adaptar tu
    sitio a esta condición.
2.  Sé claro y explícito respecto al dar las razones por las cuales necesitas la ubicación.
3.  Una solución de reserva si es necesario.

### Usa una reserva si necesitas saber la ubicación geográfica

Te recomendamos que tu sitio o app no solicite
acceso para la ubicación actual del usuario. Sin embargo, si tu sitio o tu app
solicita la ubicación actual del usuario, hay soluciones de terceros que te permiten saber
mejor dónde se encuentra la persona en ese momento.

Por lo general, estas soluciones observan la dirección IP del usuario y la asignan
a las direcciones físicas registradas en la base de datos del RIPE. Estas ubicaciones
generalmente no son muy precisas y te proporcionan la ubicación del
concentrador de telecomunicaciones o la torre de telefonía celular más cercana al usuario. En muchos
casos, es posible que no sean tan precisas, en especial si el usuario usa una VPN
o algún otro servicio de proxy.

### Siempre solicita acceso a una ubicación mediante un gesto del usuario

Asegúrate de que los usuarios comprendan por qué les solicita su ubicación y cuál será
el beneficio para ellos. Si la solicitas de inmediato en la página principal mientras 
se cargue el sitio, afectarás negativamente la experiencia del usuario.

<div class="attempt-left">
  <figure>
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: siempre solicita acceso a una ubicación mediante un gesto del usuario.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>LO QUE NO DEBES HACER</b>: El hecho de solicitar la ubicación en la página de inicio mientras se carga el sitio hace que la experiencia del usuario sea poco agradable.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Como alternativa, tienes que proporcionar al usuario una llamada a la acción clara o una indicación de que
una operación requerirá acceso a su ubicación. El usuario podrá asociar más fácilmente la petición de acceso del sistema con la acción
que se acaba de iniciar.

### Indique claramente al usuario que en una acción le solicitarán la ubicación

[En un estudio realizado por el equipo de Google Ads](http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf),
cuando se les pidió a los usuarios que reservaran una habitación en un hotel de Boston mediante un sitio particular de hoteles para una conferencia
futura, se les solicitó que compartieran su ubicación
del GPS (Sistema de posicionamiento global) inmediatamente luego de presionar el llamado a la acción ‘Find and Book’ en la página de inicio.

En algunos casos, los usuarios se frustraron porque no pudieron comprender la razón por la cual
se les mostraban hoteles en San Francisco cuando deseaban reservar una habitación en
Boston.

Para mejorar la experiencia, te tienes que asegurar de que el usuario comprenda por qué se le solicita
su ubicación. Agrega un significante muy conocido que sea común en todos los
dispositivos, tal como el buscador de rango o una llamada a la acción específica como 
“buscar cerca de la ubicación actual”.

<div class="attempt-left">
  <figure>
    <img src="images/indication.png">
    <figcaption>
      Usa un buscador de rangos
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/nearme.png">
    <figcaption>
      Llamada a la acción específica para buscar cerca de la ubicación actual  
    </figcaption>.
  </figure>
</div>

<div style="clear:both;"></div>

### Invita amablemente a los usuarios a que te den permiso para acceder a su ubicación

No tienes acceso a cualquier cosa que estén haciendo los usuarios. Conoces exactamente
el momento en que los usuarios deshabilitan el acceso a su ubicación, pero no sabes
cuándo te brindan acceso. Solo sabes que obtuviste acceso cuando aparecen los
resultados.

Una práctica recomendada es “invitar” al usuario a la acción si necesitas que
complete la acción.

Te recomendamos lo siguiente: 

1.  Configura un temporizador que se active después de un período corto; 5 segundo es un
    buen valor.
2.  Si obtienes un mensaje de error, muéstrele un mensaje al usuario.
3.  Si obtienes una respuesta positiva, deshabilita el temporizador y procesa los resultados.
4.  Si, cuando se acaba el tiempo, no obtienes una respuesta positiva, muéstrale una
    notificación al usuario.
5.  Si la respuesta llega más tarde y la notificación aún está presente,
    retírela de la pantalla.

<div style="clear:both;"></div>

    button.onclick = function() {
      var startPos;
      var element = document.getElementById("nudge");

      var showNudgeBanner = function() {
        nudge.style.display = "block";
      };

      var hideNudgeBanner = function() {
        nudge.style.display = "none";
      };

      var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

      var geoSuccess = function(position) {
        hideNudgeBanner();
        // We have the location, don't display banner
        clearTimeout(nudgeTimeoutId); 

        // Do magic with location
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        switch(error.code) {
          case error.TIMEOUT:
            // The user didn't accept the callout
            showNudgeBanner();
            break;
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };

## Compatibilidad con navegadores

Ahora la mayoría de los navegadores admiten la Geolocation API, pero se recomienda
verificar siempre la compatibilidad antes de comenzar a usarla.

Para verificar fácilmente la compatibilidad, prueba la presencia del
objeto de ubicación geográfica:

    // check for Geolocation support
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }


## Determinación de la ubicación actual del usuario

La Geolocation API es un método simple de "acción única" que se usa para obtener la ubicación
del usuario: `getCurrentPosition()`. Si se realiza una llamada mediante este método,
la ubicación actual del usuario se informará de manera asincrónica.

    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    };


Si esta es la primera vez que una app en este dominio ha pedido
permisos, por lo general el navegador comprueba el consentimiento del usuario. Según el
navegador, también se pueden configurar las preferencias para siempre permitir&mdash;o no&mdash;la búsqueda de permisos, en cuyo caso el proceso de confirmación se omitirá.

Según el dispositivo de ubicación que se esté usando en el navegador, el objeto de posición
podría contener mucha más información además de la latitud y la longitud; por
ejemplo, podría incluir una altitud o una dirección. No podrás saber cuál
es la información adicional que ese sistema de localización usará hasta que realmente le proporcione la
información.

## Seguir la ubicación del usuario

La Geolocation API te permite obtener la ubicación del usuario (con su previo consentimiento
) mediante una llamada a `getCurrentPosition()`.  

Si deseas realizar un seguimiento constante de la ubicación del usuario, usa el método
de Geolocation API, `watchPosition()`. Este método funciona de modo similar a
`getCurrentPosition()`, pero se activará varias veces a medida que el
software de posicionamiento:

1.  Obtenga una posición más precisa del usuario.
2.  Determine que la posición del usuario está cambiando.
 

    var watchId = navigator.geolocation.watchPosition(function(position) {
      document.getElementById('currentLat').innerHTML = position.coords.latitude;
      document.getElementById('currentLon').innerHTML = position.coords.longitude;
    });

### Cuándo usar la ubicación geográfica para conocer la ubicación del usuario

*  Si deseas obtener un dato más preciso sobre la ubicación del usuario.
*  Si tu aplicación debe actualizar la interfaz de usuario sobre la base de la nueva información 
 de ubicación.
*  Si tu app necesita actualizar la lógica comercial cuando el usuario ingresa a una
   determinada zona definida.


## Prácticas recomendadas cuando se usa la ubicación geográfica

### Siempre realiza una limpieza y ahorra batería

Estar al tanto de los cambios en una ubicación geográfica no es una operación que no tenga un costo. Aunque
en los sistemas operativos se están introduciendo funciones de plataforma para permitir que las apps
se comuniquen con el subsistema geográfico, tú, como desarrollador web, no conoces la compatibilidad
que tiene el dispositivo del usuario para monitorear la posición del usuario y, mientras visualizas
una posición, somete al dispositivo a mucho procesamiento adicional.

Cuando ya no necesites realizar un seguimiento de la posición del usuario, llama a `clearWatch` para desconectar
los sistemas de ubicación geográfica.

###  Administra los errores correctamente

Desafortunadamente, no todas las búsquedas de ubicaciones son exitosas. Es posible que no se pueda localizar
un GPS o que el usuario inhabilite repentinamente las búsquedas de ubicaciones. Se podrá realizar una segunda llamada opcional a `getCurrentPosition()` en caso de que se produzca un
error, para que puedas notificar al usuario en el callback:

    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };


### Reduce de la necesidad de iniciar el hardware de ubicación geográfica

Para muchos casos de uso, no necesitas la ubicación más actualizada del usuario;
solo necesitas una ubicación aproximada.

Aplica la propiedad opcional `maximumAge` para indicarle al navegador que use un
resultado de ubicación geográfica obtenido recientemente. De este modo no solo se obtienen los resultados más rápidamente si el usuario
solicitó los datos anteriormente, sino que también evita que el navegador tenga que iniciar
las interfaces del hardware de ubicación geográfica, como la triangulación de WiFi o el GPS.

    window.onload = function() {
      var startPos;
      var geoOptions = {
        maximumAge: 5 * 60 * 1000,
      }

      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };


### No dejes al usuario esperando; configura un tiempo de espera

A menos que establezcas un tiempo de espera, es posible que nunca obtengas respuesta a tu solicitud para obtener la posición actual.


    window.onload = function() {
      var startPos;
      var geoOptions = {
         timeout: 10 * 1000
      }

      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };


### Dale preferencia a las ubicaciones comunes en lugar de las ubicaciones específicas

Si deseas encontrar la tienda más cercana a la ubicación de un usuario, es poco probable que necesites
una precisión de 1 metro. La API está diseñada para proporcionar una ubicación 
común que se muestre lo más rápido posible.

Si no necesitas un nivel alto de precisión, es posible anular la configuración predeterminada
con la opción `enableHighAccuracy`. Usa esta función con moderación, ya que resuelve
más lentamente y consumirá más batería.

    window.onload = function() {
      var startPos;
      var geoOptions = {
        enableHighAccuracy: true
      }

      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    };


## Emula la ubicación geográfica con Chrome DevTools {: #devtools }

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sensors-drawer.png" class="screenshot">
  </figure>
</div>

Una vez que se fije la ubicación geográfica, querrás:

* Probar cómo funciona tu app en diferentes ubicaciones geográficas.
* Verificar que tu app desaparezca correctamente cuando no esté disponible la ubicación geográfica.

Puedes realizar ambas cosas desde Chrome DevTools.

[Abre Chrome DevTools](/web/tools/chrome-devtools/#open) y luego
[abre el panel lateral de Console](/web/tools/chrome-devtools/console/#open_as_drawer).

[Abre el menú del panel lateral de Console](/web/tools/chrome-devtools/settings#drawer-tabs)
y haz clic en la opción **Sensors** para que se muestre el panel lateral de Sensors.

Desde aquí, puedes reemplazar la ubicación con una gran ciudad preestablecida
ingresa una ubicación personalizada o inhabilita la ubicación geográfica fijando el reemplazo
en **Ubicación no disponible**.


{# wf_devsite_translation #}
