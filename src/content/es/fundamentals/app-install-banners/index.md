project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Hay dos tipos de banners de instalación de apps: los de apps web y los de apps nativas. Te dan la posibilidad de permitir que los usuarios agreguen de manera rápida y fluida tu app nativa o web a sus pantallas de inicio sin salir del navegador.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-12-16 #}

# Banners de instalación de apps web {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/add-to-home-screen.gif" alt="Banner de instalación de aplicación web">
  </figure>
</div>

Hay dos tipos de banners de instalación de apps: los de apps **web** y
 los de apps [**nativas**](native-app-install). Permiten que los usuarios agreguen de manera rápida y fluida tu app nativa o web a sus pantallas de inicio sin salir del navegador.

Agregar banners de instalación de apps es sencillo, y Chrome se encarga de la mayoría del 
trabajo pesado. Deberás incluir un archivo de manifiesto de app web en tu sitio
con información detallada sobre tu app.

Chrome luego usará un conjunto de criterios y heurística de frecuencia de visitas para 
      determinar el momento en que se mostrará el banner. Continúa leyendo para obtener más información.

Note: Add to Homescreen (a veces abreviado como A2HS) es otro nombre para los Banners de instalación de apps web. Los dos términos son equivalentes.

### ¿Cuáles son los criterios?

Chrome mostrará de manera automática el banner cuando tu app cumpla con los siguientes
criterios:

* Contener un archivo de [manifiesto de aplicación web](../web-app-manifest/) con:
    - un `short_name` (usado en la pantalla de inicio);
    - un `name` (usado en el banner);
    - un ícono png de 144 x 144 (en las declaraciones del ícono se debe incluir un tipo de mime `image/png`);
    - una `start_url` que se carga.
* Contener un [service worker](/web/fundamentals/getting-started/primers/service-workers)
  registrado en tu sitio.
* Transmitirse a través de [HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https)
  (un requisito para usar el service worker).
* Recibir visitas al menos dos veces, con al menos cinco minutos de diferencia entre las visitas.

Note: Los Banners de instalación de apps web son una tecnología emergente. Los criterios para mostrar los banners de instalación de app pueden cambiar en el futuro. Consulta [¿Qué exactamente convierte a algo en una Progressive Web App?](https://infrequently.org/2016/09/what-exactly-makes-something-a-progressive-web-app/) para ver una referencia canónica (que se actualizará con el tiempo) de los últimos criterios sobre banners de instalación de apps web.

### Prueba del banner de instalación de apps {: #test }

Una vez que has establecido tu manifiesto de app web, deberás validar
que está definido correctamente. Tienes dos enfoques a tu disposición. Uno
es manual, el otro es automatizado.

Para ejecutar el banner de instalación de app manualmente:

1. Abre Chrome DevTools.
2. Dirígete al panel **Application**.
3. Dirígete a la pestaña **Manifest**.
4. Haz clic en **Add to homescreen**, destacado en rojo en la siguiente captura de pantalla.

![Agregar al botón de la pantalla de inicio en DevTools](images/devtools-a2hs.png)

Consulta [Simular eventos para agregar a la
pantalla de inicio](/web/tools/chrome-devtools/progressive-web-apps#add-to-homescreen)
para obtener más ayuda.

Para realizar una prueba automática de tu banner de instalación de app, usa Lighthouse. Lighthouse
es una herramienta de auditoría de app web. Puedes ejecutarlo como una extensión de Chrome o como un
módulo NPM. Para probar tu app, proporciona a Lighthouse una página específica
para realizar la auditoría. Lighthouse ejecuta una serie de auditorías contra la página y luego suministra
un informe con los resultados de la página.

Las dos series de auditorías de Lighthouse que aparecen en la captura de pantalla representan todas
las pruebas que tu página necesita pasar para mostrarse en un banner de instalación de app.

![Auditorías de instalación de app de Lighthouse](images/lighthouse-a2hs.png)

Consulta [Auditoría de apps web con Lighthouse](/web/tools/lighthouse/) para comenzar
con Lighthouse.

## Eventos de banner de instalación de apps

Chrome proporciona un mecanismo sencillo para determinar la respuesta del usuario al
banner de instalación de aplicaciones e incluso cancelarlo o diferirlo hasta un momento más conveniente.

### ¿Un usuario instaló la app?

El evento `beforeinstallprompt` muestra una promesa llamada `userChoice` 
que se resuelve cuando el usuario actúa ante el aviso.  La promesa 
muestra un objeto con un valor `dismissed` en el atributo `outcome`
o `accepted` si el usuario agregó la página web a la pantalla de inicio.

    window.addEventListener('beforeinstallprompt', function(e) {
      // beforeinstallprompt Event fired
      
      // e.userChoice will return a Promise. 
      // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
      e.userChoice.then(function(choiceResult) {
        
        console.log(choiceResult.outcome);
        
        if(choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }
      });
    });
    

Esta es una buena herramienta para comprender la interacción de tus usuarios con la solicitud de instalación de 
la aplicación.


### Diferir o cancelar la solicitud

Chrome administra el momento de activación de la solicitud. No obstante, es probable que para algunos sitios esto no sea 
ideal. Puedes diferir la solicitud para un momento posterior en el uso de la aplicación o 
incluso cancelarla. 

Cuando Chrome solicita al usuario que instale la aplicación, 
puedes evitar la acción predeterminada y almacenar el evento para después. Luego, cuando 
la interacción del usuario con tu sitio sea positiva, puedes reactivar 
la solicitud llamando a `prompt()` en el evento almacenado. 

This causes Chrome to show the banner and all the Promise attributes 
such as `userChoice` will be available to bind to so that you can understand 
what action the user took.
    
    var deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      
      return false;
    });
    
    btnSave.addEventListener('click', function() {
      if(deferredPrompt !== undefined) {
        // The user has had a postive interaction with our app and Chrome
        // has tried to prompt previously, so let's show the prompt.
        deferredPrompt.prompt();
      
        // Follow what the user has done with the prompt.
        deferredPrompt.userChoice.then(function(choiceResult) {
      
          console.log(choiceResult.outcome);
          
          if(choiceResult.outcome == 'dismissed') {
            console.log('User cancelled home screen install');
          }
          else {
            console.log('User added to home screen');
          }
          
          // We no longer need the prompt.  Clear it up.
          deferredPrompt = null;
        });
      }
    });
    

Como alternativa, puedes cancelar la solicitud evitando el valor predeterminado.

    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      return false;
    });
    
## Banners de instalación de apps web

<div class="attempt-right">
  <figure>
     <img src="images/native-app-install-banner.gif" alt="Banner de instalación de apps nativas" style="max-height: 500px">
  </figure>
</div>

Los banners de instalación de apps nativas son similares a los  [Banners de instalación de apps web](.), pero
en lugar de agregarse a la pantalla de inicio, permitirán que el usuario instale tu
app nativa sin abandonar tu sitio.

### Criterios para mostrar el banner

El criterio es similar al banner de instalación de aplicación web, excepto por la necesidad de un
service worker. Tu sitio debe:

* Contener un archivo de [manifiesto de app web](../web-app-manifest/) con:
  - un `short_name`
  - un `name` (usado en el aviso del banner);
  - un ícono png de 144x144, la declaración de tu ícono debe incluir un tipo de mime de `image/png`
  - un `related_applications` objeto con información de la app
* Ser enviado por [HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https)
* Ser visitado por el usuario dos veces, en dos días diferentes durante un período de
 dos semanas.

### Requisitos del manifiesto

Para integrarse a cualquier manifiesto, agrega un conjunto de `related_applications` con las
plataformas de `play` (para Google Play) y la Id. de la app.


    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]
    

Si solo quieres ofrecer al usuario la capacidad de instalar tu app
Android y no mostrar el banner de instalación de app web, agrega
`"prefer_related_applications": true`. Por ejemplo:


    "prefer_related_applications": true,
    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]


{# wf_devsite_translation #}
