project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Las notificaciones push son una de las funcionalidades más valiosas de las apps nativas y ahora se encuentran disponibles en la web. Para sacarles el máximo provecho, las notificaciones deben ser oportunas, precisas y relevantes.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-06-30 #}

# Notificaciones push en la web: Oportunas, relevantes y precisas {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}


<img src="images/cc-good.png" alt="Notificación de ejemplo" class="attempt-right">

Si le preguntas a un grupo de programadores qué funciones para dispositivos móviles faltan en
la web, las notificaciones push están siempre entre las primeras de la lista.

Las notificaciones push en la web permiten a los usuarios acceder a actualizaciones oportunas desde sus sitios
preferidos, y te permiten volver a atraerlos eficazmente con contenido personalizado
y relevante. 

Push API y Notification API abren un nuevo abanico de posibilidades para que
vuelvas a interactuar con tus usuarios.

## ¿Se incluyen los service workers? {: #service-worker-involved }

Sí. "Push" se basa en service worker debido a que los service worker operan en
segundo plano. Esto significa que la única vez que se ejecuta código para una notificación push (en
otras palabras, la única vez que se consume batería) es cuando el usuario interactúa con
una notificación al hacer clic sobre ella o al cerrarla.   Si no estás familiarizado con ellos,
visita la [introducción a los service worker][service-worker-primer]. Usaremos
código de service worker en secciones posteriores, en las que te mostramos cómo implementar "push"
y notificaciones.

## Dos tecnologías {: #two-technologies }

"Push" y notificaciones usan API diferentes, aunque complementarias:
[**push**](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) se
invoca cuando un servidor proporciona información a un service worker. Una
[**notificación**](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
es la acción de un service worker o de una secuencia de comandos de una página web que muestra información
al usuario.

## Un poco de anatomía de notificaciones {: #anatomy }

En la próxima sección, te mostraremos algunas imágenes, aunque
prometimos código. Así que aquí lo tienes. Con un registro de service worker, puedes llamar
`showNotification` a un objeto de registro.


    serviceWorkerRegistration.showNotification(title, options);
    

El argumento `title` aparece como un encabezado en la notificación. El argumento `options`
es un literal de objeto que configura las demás propiedades de una notificación.
Un objeto con opciones típicas tiene el siguiente aspecto:


    {
      "body": "Did you make a $1,000,000 purchase at Dr. Evil...",
      "icon": "images/ccard.png",
      "vibrate": [200, 100, 200, 100, 200, 100, 400],
      "tag": "request",
      "actions": [
        { "action": "yes", "title": "Yes", "icon": "images/yes.png" },
        { "action": "no", "title": "No", "icon": "images/no.png" }
      ]
    }
    
<img src="images/cc-good.png" alt="Notificación de ejemplo" class="attempt-right">

Este código genera una notificación como la que se muestra en la imagen. En general,
proporciona las mismas capacidades que una app nativa. Antes de adentrarnos en
los detalles de la implementación de esas capacidades, te mostraré cómo puedes usar esas
capacidades con eficacia.   Describiremos la mecánica de
la implementación de notificaciones push; incluiremos el manejo de permisos y
suscripciones, el envío de mensajes y sus respuestas.

## ¿Cómo puedo probarlo?

Existen varias formas en las que puedes jugar con las funciones antes de comprender por completo cómo funcionan o tener que implementarlas. Primero, consulta [nuestro propio ejemplo](https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications). También se encuentran disponibles [Notification Generator](https://tests.peter.sh/notification-generator/) de Peter Beverloo y [push-api-demo](https://github.com/chrisdavidmills/push-api-demo) de Chris Mill.

Note: A menos que uses localhost, la Push API requiere HTTPS.

<<../../../_common-links.md>>


{# wf_devsite_translation #}
