project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Obtén la última información sobre el estado de WebVR y sobre qué tener en cuenta a la hora de crear experiencias con WebVR.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-12 #}

# Estado y consideraciones de WebVR {: .page-title }

Warning: WebVR todavía es experimental y se encuentra sujeta a modificaciones.

## Estado de implementación de WebVR

Actualmente, la WebVR API se encuentra disponible en:

* Chrome Beta (M56+), a través de un [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md).
* Firefox Nightly.
* Samsung Internet Browser for Gear VR. (Ten en cuenta que actualmente es compatible con una versión antigua de la especificación de WebVR).

<iframe width="100%" height="320" src="https://www.chromestatus.com/feature/4532810371039232?embed" style="border: 1px solid #CCC" allowfullscreen>
</iframe>

Puedes encontrar más información sobre el estado de implementación en navegadores en [chromestatus.com](https://www.chromestatus.com/features/4532810371039232?embed).

## Consideraciones

A continuación, encontrarás algunos aspectos que debes recordar si creas experiencias con WebVR hoy.

* **Debes proveer tu contenido de WebVR a través de HTTPS.** En caso contrario, tus usuarios recibirán advertencias en sus navegadores.
    * Visita [Habilitación de HTTPS en tus servidores](/web/fundamentals/security/encrypt-in-transit/enable-https) para obtener más información.
* **Actualmente, Chrome solo admite WebVR nativa en Android.** Debes usar un dispositivo Daydream con un teléfono Pixel.
* **Puede ser que [WebVR Polyfill](https://github.com/googlevr/webvr-polyfill) no siempre coincida exactamente con las implementaciones nativas de las especificaciones.** Si planeas usar Polyfill, asegúrate de probar tanto en dispositivos con capacidad para RV como en otros.
* **Los usuarios deben hacer clic en el botón del controlador de RV antes de que se encuentre disponible para tu código**. Debes tener en cuenta esto en tu código; normalmente, se muestra al usuario un mensaje que le solicita que presione un botón del controlador al comienzo de su experiencia de RV.
* **Debes habilitar la información sobre la pose del mando para juegos en Chrome 56 cuando se ejecuta localmente**. La información del mando para juegos no contendrá información sobre la pose (o ubicación) cuando se ejecute en localhost, a menos que habilites el indicador de tiempo de ejecución Gamepad Extensions en Chrome 56. Si ejecutas un "Origin Trial", las "Gamepad Extensions" se habilitan con la WebVR API.


{# wf_devsite_translation #}
