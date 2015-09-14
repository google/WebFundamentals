---
title: "Obtención de la ubicación actual del usuario"
description: "La API (Interfaz de programación de aplicaciones) de geolocalización le permite averiguar dónde se encuentra el usuario, siempre con su consentimiento."
updated_on: 2014-10-21
translation_priority: 1
key-takeaways:
  geo: 
    - Verifique la compatibilidad antes de utilizar la API.
    - Dele preferencia a las ubicaciones comunes en lugar de las ubicaciones específicas.
    - Siempre solucione los errores.
    - No solicite los datos con demasiada frecuencia para no consumir la batería del usuario.

---

<p class="intro">
  La API (Interfaz de programación de aplicaciones) de geolocalización le permite averiguar dónde se encuentra el usuario, siempre con su consentimiento. Esta funcionalidad se puede utilizar como parte de las consultas del usuario; p. ej., para guiar a una persona hacia un punto de destino. También se puede utilizar para 'etiquetar geográficamente' contenido que creó el usuario; p. ej., para marcar dónde se tomó una fotografía.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

La API es independiente del dispositivo. La forma en que el navegador determina la
ubicación no es importante, siempre y cuando los clientes puedan solicitar y recibir datos de la ubicación de una
forma estándar. El mecanismo subyacente puede ser a través de GPS (Sistema de posicionamiento global), WiFi o simplemente
al solicitarle al usuario que ingrese su ubicación manualmente. Como cualquiera de
estas búsquedas demoran una cierta cantidad de tiempo, la API es asíncrona; se utiliza un
método de devolución de llamada cada vez que solicita una ubicación.

## Cuándo utilizar la geolocalización

* Descubra los casos en los que el usuario está cerca de su ubicación física para personalizar 
 la experiencia del usuario.
* Adapte la información (como las noticias) a la ubicación del usuario.
* Muestre la posición del usuario en un mapa.
* Etiquete los datos creados dentro de su aplicación con la ubicación del usuario 
 (p. ej., etiquete geográficamente una imagen).


## Verificación de la compatibilidad

La API de geolocalización es ahora compatible con la mayoría de los navegadores, pero se
recomienda verificar siempre la compatibilidad antes de comenzar a utilizarla.

Para verificar fácilmente la compatibilidad, pruebe la presencia del 
objeto de geolocalización:

{% highlight javascript %}
// check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
}
else {
  console.log('Geolocation is not supported for this Browser/OS version yet.');
}
{% endhighlight %}

## Determinación de la ubicación actual del usuario

La API de geolocalización es un método simple de “acción única» que se utiliza para obtener la ubicación
del usuario `getCurrentPosition()`.  Si se realiza una llamada mediante este método, la ubicación actual del usuario
se informará de forma asíncrona.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
{% endhighlight %}

Si esta es la primera vez que una aplicación de este dominio solicita
permisos, el navegador normalmente solicitará el consentimiento del usuario. Según el
navegador, también se pueden configurar las preferencias sobre si siempre se deben permitir o no permitir
la búsqueda de permisos, en cuyo caso el proceso de confirmación se omitirá.

Según el dispositivo de ubicación que se esté utilizando en su navegador, el objeto de posición
puede contener mucha más información que simplemente la latitud y la longitud; por ejemplo, puede incluir una altitud o una dirección.  No podrá saber cuál es la información adicional que ese sistema de localización utilizará hasta que realmente le proporcione la información.

## Prueba de la geolocalización con su sitio

Si en una aplicación se utiliza un sistema compatible con la geolocalización HTML5, puede resultar
útil depurar los resultados recibidos al utilizar diferentes valores para la longitud y la
latitud.

Mediante DevTools es posible reemplazar los valores de posición para navigator.geolocation
y simular las geolocalizaciones que no están disponibles a través del menú Overrides.

<img src="images/emulategeolocation.png">

1. Abra el menú Overrides de DevTools.
2. Marque “Override Geolocation” y luego ingrese Lat = 41.4949819 y Lon = -0.1461206.
3. Actualice la página, y allí se utilizarán las posiciones remplazadas para la geolocalización.

## Solucionar siempre los errores

Desafortunadamente, no todas las búsquedas de ubicaciones se realizan con éxito. Tal vez no se puede localizar
un GPS o el usuario deshabilitó repentinamente las búsquedas de ubicaciones. Se podrá realizar una segunda llamada
opcional a `getCurrentPosition()` en caso de que se produzca un
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
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
{% endhighlight %}

## Reducción de la necesidad de iniciar el hardware de geolocalización

En muchos casos no necesita utilizar la ubicación más actualizada del usuario;
solo necesita una ubicación aproximada.

Utilice la propiedad opcional `maximumAge` para indicarle al navegador que utilice un
resultado de geolocalización obtenido recientemente.  De este modo no solo se obtienen los resultados más rápidamente si el usuario
solicitó los datos anteriormente, sino que también evita que el navegador tenga que iniciar
las interfaces del hardware de geolocalización, como la triangulación de WiFi o el GPS.

{% highlight javascript %}
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
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}

## No deje al usuario esperando; configure un tiempo de espera

A menos que establezca un tiempo de espera, es posible que nunca obtenga respuesta a su solicitud para obtener la posición actual.

{% highlight javascript %}
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
{% endhighlight %}

## Dele preferencia a las ubicaciones comunes en lugar de las ubicaciones específicas.

Si desea encontrar la tienda más cercana a la ubicación de un usuario, es poco probable que necesite
contar con una medición muy precisa para resolverlo.  La API está diseñada para que arroje una ubicación 
común que se informe lo más rápido posible.

Si no necesita una ubicación de alta precisión, es posible reemplazar la configuración predeterminada
con la opción`enableHighAccuracy`.  Utilice esta función con moderación ya que se resolverá
más lentamente y consumirá más batería.

{% highlight javascript %}
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
{% endhighlight %}


