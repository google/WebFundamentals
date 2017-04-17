project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Hay maneras correctas de usar las notificaciones y hay maneras de usarlas mejor. Obtén más información sobre los aspectos que componen una buena notificación. No nos limitaremos a mostrarte lo que debes hacer. Te mostraremos la manera de hacerlo.

{# wf_updated_on: 2016-09-12 #}
{# wf_published_on: 2016-06-30 #}

# ¿Qué aspectos componen una buena notificación? {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/tpnr.png" alt="Oportunas, precisas y relevantes">
  <figcaption>Oportunas, precisas y relevantes</figcaption>
</figure>

No hagas que tus usuarios se enojen. De lo contrario, los perderás definitivamente. ¿Hace falta
añadir algún comentario? Sí, porque es más fácil decir que hacer. 

Las notificaciones push son una de las funcionalidades más valiosas de las apps nativas
y ahora se encuentran disponibles en la web. Para aprovecharlas al máximo,
deben ser oportunas, precisas y relevantes.

**Oportuna**: una notificación oportuna aparece cuando los usuarios la desean y
cuando les importa.

**Precisa**: una notificación precisa contiene información específica sobre la que se
pueden tomar medidas de inmediato.

**Relevante**: para ser relevante, un mensaje debe relacionarse con personas o temas que el usuario
valore.

<div style="clear:both;"></div>


## Oportuna {: #timely }

Una notificación oportuna aparece cuando los usuarios la desean y
cuando les importa. El significado de “oportuno” tiene relevancia para el usuario, no necesariamente
para ti.

### Haz que esté disponible independientemente de la conectividad {: #make-it-available }

Te convendrá mostrar la mayoría de los avisos de inmediato. Hay razones para aferrarse a
un aviso antes de mostrarlo, y entre ellas una de las más importante es que las cargas de aplicación tal vez no sean
compatibles con todas las plataformas. Por lo tanto, quizás necesites obtener la información crítica
antes de mostrarla.

Hasta hace poco, solo las apps para dispositivos móviles podían hacer esto. Con service workers puedes
almacenar una notificación hasta que un usuario la desee. Cuando este hace clic sobre ella, el estado
de la red no tiene importancia.


    self.addEventListener('push', event => {
      var dataPromise;
      if (data in event) {
        dataPromise = Promise.resolve(event.data.json());
      } else {
        dataPromise = fetch('notification/end/point/data.json')
          .then(response => {
            return response.json();
          });
      }
    
      event.waitUntil(
        dataPromise
        .then(msgData => {
          // Now tell the user.
          return self.registration.showNotification(data.title, {
            // Whether you show data and how much you show depends on
            // content of the data itself.
            body: event.data.body,
            icon: 'images/icon.png'
          });
        })
      );
    }); 
    

### Usa la vibración con criterio {: #vibrate-judiciously }

El uso de la vibración puede parecer una propuesta particular. De hecho, está estrechamente
relacionada y existen muchas clases de problemas.

En primer lugar, la vibración parece ser el elemento ideal para que los usuarios se enteren de las notificaciones
nuevas. Pero no todos los usuarios la activan y algunos dispositivos
no tienen la función. En consecuencia, cualquier urgencia que intentes comunicar con
vibración puede perderse.

En segundo lugar, aplicar vibración a cada notificación puede generar una falsa sensación de urgencia.
Si se acosa a los usuarios con notificaciones que no son tan importantes como
parecen, estos pueden desactivarlas por completo.

En resumen, deja que el usuario determine la manera en que usará las vibraciones. Permíteles
determinar las notificaciones que llevan vibración o incluso si desean usarla. Si
tienes diferentes categorías de notificaciones, puedes incluso dejarlos seleccionar
diferentes patrones de vibración.

Por último, recuerda que, para vibrar, un dispositivo móvil debe tener un motor, y los motores
requieren más energía que las notificaciones en la pantalla.

## Precisa {: #precise }

Una notificación precisa contiene información específica sobre la que se pueden tomar medidas de
inmediato. Considera nuevamente la imagen de la lección de anatomía.

![Una notificación precisa contiene información específica.](images/flight-delayed-good.png){:width="316px"}

Te dice todo lo que necesitas saber en un vistazo:

* Quién envió el mensaje: la aerolínea.
* Qué sucedió: tu nuevo vuelo está demorado.
* Qué más: la hora de tu nuevo vuelo.


### Ofrece suficiente información para que el usuario no necesite visitar tu sitio {: #offer-enough }

Tal vez no sea apropiado en todos los casos, pero si la información es suficientemente simple
como para que se proporcione en un espacio pequeño, no hagas que los usuarios abran tu sitio web para leerlo
. Por ejemplo, si deseas notificar a un usuario sobre la confirmación de otro usuario,
no muestres un mensaje que diga “Notificación nueva”. Muestra uno que diga
'Pete dijo "no"'.

<div class="attempt-left">
  <figure>
    <img src="images/pete-replied.png">
    <figcaption class="success"><b>Lo que debes hacer:</b> Ofrecer suficiente información
    para que los usuarios no necesiten visitar tu sitio.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/new-missive.png">
    <figcaption class="warning"><b>Lo que no debes hacer:</b> Proporcionar mensajes
    indefinidos y enigmáticos.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Esto tiene particular importancia para la información crítica.

<div class="attempt-left">
  <figure>
    <img src="images/extreme-danger.png">
    <figcaption class="success"><b>Lo que debes hacer:</b> Ofrecer suficiente información
    para que los usuarios no necesiten visitar tu sitio.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/suggestion.png">
    <figcaption class="warning"><b>Lo que no debes hacer:</b> Proporcionar mensajes
    indefinidos y enigmáticos.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Dispón las acciones en la notificación {: #offer-actions }

Hemos visto esto algunas veces, e incluso en la lección de anatomía se mostró la manera de
agregarlas a una notificación. El service worker debe procesar esas acciones.
Haz esto en el evento `notificationclick`.


    self.addEventListener('notificationclick', event => {
      var messageId = event.notification.data;
      
      event.notification.close();
    
      if (event.action) {
        // Send the response directly to the server.
      } else {
        // Open the app.
      }
    }, false);
    

### Proporciona especificidad al título y al contenido {: #specific-title }

Haz que el título se relacione con el contexto del mensaje e incluye algo
específico del mensaje. El contenido que el destinatario ya conoce, como el nombre
de tu app, no servirá. Tampoco servirá la información que el destinatario no conozca,
como la tecnología que se usa para enviar el mensaje.

<div class="attempt-left">
  <figure>
    <img src="images/flight-delayed-good.png">
    <figcaption class="success"><b>Lo que debes hacer:</b> Hacer que en el título se incluya
    algo específico del mensaje.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/cc-bad.png">
    <figcaption class="warning"><b>Lo que no debes hacer:</b> Incluir
    información que los usuarios ya conozcan o no comprendan.</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

### Dispón la información importante de antemano

Esto implica ubicar la información importante para tu usuario en la parte de la
notificación que más llame la atención. Por ejemplo, en idiomas occidentales,
los textos se leen de izquierda a derecha y de arriba hacia abajo; por ello, una app de mensajería pondría el nombre del emisor en la parte superior izquierda.


<div class="attempt-left">
  <figure>
    <img src="images/pete-replied.png">
    <figcaption class="success"><b>Lo que debes hacer:</b> Procurar que el nombre del emisor se encuentre en 
    la parte superior izquierda.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/new-missive.png">
    <figcaption class="warning"><b>Lo que no debes hacer:</b> Brindar información redundante en la parte
    superior izquierda.</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

### Proporciona mensajes breves {: #keep-it-short }

Las notificaciones no son correos electrónicos. El propósito de estas es tentar a sus usuarios para que
abran tu app. El objeto `PushMessageData` te permite enviar datos al
usuario de inmediato, pero tal vez no   te convenga mostrar todos esos datos al usuario,
en especial si es posible que se acumulen datos adicionales en el servidor después del
envío de la notificación.

## Relevante {: #relevant }

Para ser relevante, un mensaje debe relacionarse con personas o temas que el usuario valore.

### Prioriza los usuarios con sesiones activas {: #prefer-logged }

Solicita únicamente permisos de notificaciones de usuarios con sesiones activas.
Si no conoces a tus usuarios, será difícil enviarles notificaciones
relevantes. Si las notificaciones no son relevantes, los usuarios podrían identificarlas como
correo no deseado.

### No repitas información {: #dont-repeat }

Tienes poco espacio para proporcionar mucha información. No lo desperdicies duplicando
información en secciones de la notificación. Tal vez la información duplicada sea
relevante, pero al quitarla tendrás lugar adicional para otros
datos. Por ejemplo, si tu título contiene el día de la semana,
no lo incluyas en el cuerpo.

<div class="attempt-left">
  <figure>
    <img src="images/notification-no-dup-content.png">
    <figcaption class="success"><b>Lo que debes hacer:</b> No repetir la información
    del título.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/notification-dup-content.png">
    <figcaption class="warning"><b>Lo que no debes hacer:</b> Repetir información del título en el contenido del mensaje.</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

Además, si la app está abierta, es posible que la información nueva ya aparezca en
pantalla. En lugar de una notificación, usa la IU de aplicación para notificar al usuario.

### No promociones tu aplicación nativa {: #dont-advertise-native }

El propósito de los service workers (la tecnología de las notificaciones de aplicación) es que puedas
evitar el tiempo y la carga de redactar una aplicación separada de tu
sitio web. Un usuario que cuente con tu service worker y tu aplicación nativa podrá obtener
notificaciones duplicadas a menos que redactes código en el servidor para evitarlo. Puedes 
evitar el problema por completo; no alientes a los usuarios a ejecutar ambos.

### No hagas publicidad {: #dont-advertise }

Tendrás oportunidades de monetizar la experiencia del usuario una vez que usen tu
app. No las eches a perder enviándoles correo no deseado cuando no lo hagan. Si envías notificaciones
no deseadas a tus usuarios, puedes perderlos.

### No incluyas el nombre o el dominio de tu sitio web {: #no-website }

Las notificaciones ya contienen tu nombre de dominio y el espacio es, de todos modos, reducido.

<div class="attempt-left">
  <figure>
    <img src="images/chrome-notification.png" alt="Nombre de dominio en una notificación de Chrome.">
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/firefox-notification.png" alt="Nombre de dominio en una notificación de Firefox.">
  </figure>
</div>
<div style="clear:both;"></div>

### Proporciona contextualidad al ícono {: #contextual-icon }

<figure class="attempt-right">
  <img src="images/still-up.png">
  <figcaption class="warning"><b>Lo que no debes hacer:</b> Usar un ícono genérico.
    </figcaption>
</figure>

Los íconos deben transmitir algo relacionado con el mensaje que acompañan. Considera el siguiente
ejemplo.

Se indica con exactitud el emisor el mensaje. Sin embargo, el ícono, que en muchas
notificaciones es el logotipo del sitio o de la app, no transmite nada.

<div style="clear:both;"></div>

Como alternativa, usemos la imagen de perfil del emisor.

<figure class="attempt-right">
  <img src="images/contextual-icon.png">
  <figcaption class="success"><b>Lo que debes hacer:</b> Usar un ícono que proporcione
    información contextual sobre el mensaje.</figcaption>
</figure>




Procura que el ícono sea simple. El exceso de matices probablemente no tenga impacto en el usuario.


{# wf_devsite_translation #}
