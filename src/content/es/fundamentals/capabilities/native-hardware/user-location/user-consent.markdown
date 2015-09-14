---
title: "Cómo lograr que el usuario dé su consentimiento para que se comparta su ubicación"
description: "TODO"
updated_on: 2014-10-21
translation_priority: 1
key-takeaways:
  geo: 
    - Suponga que los usuarios no le proporcionarán su ubicación.
    - Explique claramente por qué necesita acceder a la ubicación del usuario.
    - No solicite acceso de inmediato en la carga de la página.
comments: 
  # NOTA: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple25
---

<p class="intro">
  Como desarrollador web, el hecho de tener acceso a la ubicación del usuario abre una gran cantidad de posibilidades, como filtrado avanzado, identificación del usuario en un mapa y ofrecimiento de sugerencias proactivas sobre lo que el usuario puede hacer teniendo en cuenta su posición actual.
</p>

Como usuario, su ubicación física es una pieza de información que desea
conservar y compartirla solo con las personas en las que confía.  Es por ello que en el navegador se muestra
una petición cuando en un sitio le solicitan su ubicación.

{% include shared/toc.liquid %}

Estudios recientes realizados entre los usuarios <a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">han demostrado</a> que los
usuarios no confían en los sitios que simplemente le solicitan al usuario que proporcione su
posición durante la carga de la página. Entonces, ¿cuáles son las mejores prácticas?

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## Suponga que los usuarios no le proporcionarán su ubicación

Tal vez no quiera escuchar esto, pero muchos de sus usuarios no querrán proporcionarle su
ubicación, por lo que deberá adoptar un estilo de desarrollo defensivo.

1.  Elimine todos los errores de la API de geolocalización, de modo que pueda adaptar su
 sitio a esta condición.
2.  Sea claro y explícito acerca de la necesidad de conocer la ubicación.
3.  Utilice una solución de reserva, si es necesario.

## Utilice una reserva si es necesario conocer la geolocalización

Le recomendamos que en su sitio o aplicación no solicite
acceso a la ubicación actual del usuario, pero si su aplicación o sitio
la necesitan realmente, existen soluciones de terceros que le permiten saber
mejor dónde se encuentra la persona en ese momento.

Por lo general, estas soluciones resultan eficientes si se analiza la dirección IP del usuario y esta se asigna
a las direcciones físicas registradas en la base de datos del RIPE (Centro de Coordinación de Redes IP Europeas).  A menudo, estas ubicaciones
 no son muy precisas, ya que normalmente le proporcionan una posición del concentrador
de telecomunicaciones más cercano al usuario o de la torre de telefonía celular más cercana.  En muchos
casos, pueden incluso no ser tan precisas, especialmente si el usuario utiliza una VPN (red privada virtual)
o algún otro servicio proxy.

## Siempre obtenga acceso a la ubicación mediante un gesto del usuario

Asegúrese de que los usuarios comprendan por qué les solicita su ubicación y cuál será
el beneficio para ellos.  El hecho de solicitar la ubicación de inmediato en la página de inicio 
mientras se carga el sitio hace que la experiencia del usuario sea poco agradable.

<div class="clear g-wide--pull-1">
  <div class="mdl-cell mdl-cell--6--col">
    <figure class="fluid">
      <img src="images/sw-navigation-bad.png" srcset="images/sw-navigation-bad.png 1x, images/sw-navigation-bad-2x.png 2x" alt="">
      <figcaption>El hecho de solicitar la ubicación de inmediato en la página de inicio mientras se carga el sitio hace que la experiencia del usuario sea poco agradable.</figcaption>
    </figure>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    <figure class="fluid">
      <img src="images/sw-navigation-good.png" srcset="images/sw-navigation-good.png 1x, images/sw-navigation-good-2x.png 2x" alt="">
      <figcaption> Siempre obtenga acceso a la ubicación mediante un gesto del usuario.</figcaption>
      </figure>
  </div>
</div>

Por el contrario, debe proporcionarle al usuario un llamado a la acción claro u ofrecerle una indicación de que
en una operación se necesitará tener acceso a su ubicación.  De este modo, el usuario podrá
asociar más fácilmente la petición de acceso del sistema con la acción
que se acaba de iniciar.

## Indique claramente al usuario que en una acción le solicitarán la ubicación

<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">En un estudio realizado por el equipo de Google Ads</a>, cuando se les pidió a los usuarios que reservaran una habitación en un hotel de Boston mediante un sitio particular de hoteles para una conferencia futura, se les solicitó que compartieran su ubicación del GPS (Sistema de posicionamiento global) inmediatamente luego de presionar el llamado a la acción ‘Find and Book’ en la página de inicio.

En algunos casos, el usuario se siente frustrado porque se esfuerza por entender por qué
le muestran hoteles en San Francisco si desea reservar una habitación en
Boston.

Para mejorar la experiencia, se debe asegurar de que el usuario comprenda por qué se le solicita
su ubicación. Agregue un significante muy conocido que sea común en todos los
dispositivos, tal como el buscador de rangos.

<img src="images/indication.png">

O bien, considere incluir un llamado a la acción muy explícito, como “Buscar cerca de mi ubicación”.

<img src="images/nearme.png">

## Invite sutilmente a los usuarios a otorgarle permiso para acceder a su ubicación

Usted no posee acceso a lo que los usuarios están haciendo.  Sabe exactamente
cuándo los usuarios deshabilitan el acceso a su ubicación, pero no sabe
cuándo le otorgan acceso. Solo sabe que obtiene acceso cuando aparecen los resultados.

Se considera buen práctica "tentar" al usuario a realizar una acción si necesita que el usuario lo haga.

Le recomendamos lo siguiente: 

1.  Configurar un temporizador que se activará luego de un breve período: 5 segundos es un buen valor.
2.  Si obtiene un mensaje de error, muéstrele un mensaje al usuario.
3.  Si obtiene una respuesta positiva, deshabilite el temporizador y procese los resultados.
4.  Si, cuando se acaba el tiempo, no obtiene una respuesta positiva, muéstrele una notificación al usuario.
5.  Si la respuesta llega más tarde y la notificación aún está presente, retírela de la pantalla.

{% highlight javascript %}
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
{% endhighlight %}

