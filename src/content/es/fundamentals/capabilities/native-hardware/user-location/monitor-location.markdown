---
title: "Monitoreo de la ubicación del usuario"
description: "La API (Interfaz de programación de aplicaciones) de geolocalización le permite averiguar dónde se encuentra el usuario y mantenerse informado a medida que este se desplaza, siempre con su consentimiento."
updated_on: 2014-10-21
translation_priority: 1
key-takeaways:
  geo: 
    - Verifique la compatibilidad antes de utilizar la API.
    - Minimice el uso de seguimiento de la ubicación del usuario para ahorrar batería.
    - Siempre solucione los errores.
---

<p class="intro">
  La API (Interfaz de programación de aplicaciones) de geolocalización le permite averiguar dónde se encuentra el usuario y mantenerse informado a medida que este se desplaza, siempre con su consentimiento.
</p>

{% include shared/toc.liquid %}

La API es independiente del dispositivo. La forma en que el navegador determina la
ubicación no es importante, siempre y cuando los clientes puedan solicitar y recibir datos de la ubicación de una
forma estándar. El mecanismo subyacente debe ser a través de GPS (Sistema de posicionamiento global) y WiFi. Como cualquiera de
estas búsquedas demoran una cierta cantidad de tiempo, la API es asíncrona; se utiliza un
método de devolución de llamada cada vez que solicita una ubicación.

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## Cuándo utilizar la geolocalización para conocer la ubicación del usuario

* Si desea obtener un dato más preciso sobre la ubicación del usuario.
* Si su aplicación necesita actualizar la interfaz de usuario sobre la base de la información de la 
 nueva ubicación.
*  Si sus aplicaciones necesitan actualizar la lógica comercial cuando el usuario ingresa a una
 determinada zona definida.

## Visualización de la ubicación del usuario

La API de geolocalización le permite obtener la ubicación del usuario (con su consentimiento
) con una simple llamada a `getCurrentPosition()`.  

Si desea monitorear constantemente la ubicación del usuario, la
API de geolocalización posee un método denominado `watchPosition()`. Este método funciona de modo similar a 
`getCurrentPosition()`, pero se activará varias veces a medida que el 
software de posicionamiento:

1.  Obtenga una posición más precisa del usuario.
2.  Detecte que el usuario cambia la posición.
 
{% highlight javascript %}
var watchId = navigator.geolocation.watchPosition(function(position) {
  document.getElementById('currentLat').innerHTML = position.coords.latitude;
  document.getElementById('currentLon').innerHTML = position.coords.longitude;
});
{% endhighlight %}

## Siempre desconectar y conservar batería

Estar al tanto de los cambios en una geolocalización no es una operación gratuita.  Aunque
en los sistemas operativos se están introduciendo funciones de plataforma para permitir que las aplicaciones
se comuniquen con el subsistema geográfico, usted, como desarrollador web, no conoce la compatibilidad
que tiene el dispositivo del usuario para monitorear la posición del usuario y, mientras usted visualiza
una posición, somete al dispositivo a mucho procesamiento adicional.

Cuando ya no necesite realizar un seguimiento de la posición del usuario, llame a `clearWatch` para desconectar
los sistemas de geolocalización.

## Solucionar siempre los errores

Desafortunadamente, no todas las búsquedas de ubicaciones se realizan con éxito. Tal vez no se puede localizar
un GPS o el usuario deshabilitó repentinamente las búsquedas de ubicaciones. Se podrá realizar una segunda llamada
opcional a getCurrentPosition() en caso de que se produzca un
error, para que pueda notificarle al usuario que recibe la devolución de llamada.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.watchPosition(geoSuccess, geoError);
};
{% endhighlight %}


