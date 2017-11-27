project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Depura contenido activo en un dispositivo Android de manera remota desde una computadora con Windows, Mac o Linux.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# Comenzar con la depuración remota de dispositivos Android {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Depura contenido activo en un dispositivo Android de manera remota desde tu 
computadora con Windows, Mac o Linux. Con este instructivo, aprenderás a hacer lo siguiente:

* Configurar tu dispositivo Android para que se pueda depurar de manera remota y detectarlo desde tu equipo
  de desarrollo.
* Inspeccionar y depurar contenido activo en tu dispositivo Android desde tu
  equipo de desarrollo.
* Presentar en pantalla contenido desde tu dispositivo Android en una instancia de DevTools en tu
  máquina de desarrollo.

![Ilustración de depuración remota](imgs/remote-debugging.png)

## Requisitos {: #requirements }

* Chrome 32, o versiones posteriores, en tu equipo de desarrollo.
* [Controladores USB][drivers] en tu equipo de desarrollo si usas
 Windows Verificar que el controlador USB aparezca correctamente en el _Administrador de dispositivos_).
* Un cable USB para conectar tu dispositivo Android al equipo de desarrollo.
* Android 4.0, o versiones posteriores.
* Chrome para Android instalado en tu dispositivo Android.

[Controladores]: https://developer.android.com/tools/extras/oem-usb.html

## Paso 1: Detecta el dispositivo Android {: #discover }

1. En el dispositivo Android, selecciona **Settings** > **Developer Options** >
   **Enable USB Debugging**. En Android 4.2 y versiones posteriores, la opción **Developer Options** 
   está oculta de forma predeterminada. Consulta [Habilitación de Developer Options en el dispositivo][android]
   para obtener información sobre cómo habilitarla.

[Android]: https://developer.android.com/studio/run/device.html#developer-device-options

1. En tu equipo de desarrollo, abre Chrome. Debes iniciar sesión en
   Chrome con una de tus cuentas de Google. La depuración remota no funciona en
   el [modo incógnito][incognito] o el [modo de invitado][guest].

[guest]: https://support.google.com/chrome/answer/6130773
[incognito]: https://support.google.com/chrome/answer/95464

1. [Abre DevTools](/web/tools/chrome-devtools/#open).

1. En DevTools, haz clic en **Main Menu** ![Main Menu][main]{:.devtools-inline} 
   y selecciona **More tools** > **Remote devices**. 

     ![Apertura del panel lateral de dispositivos remotos][open]

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. En DevTools, haz clic en la pestaña **Settings** si se muestra otra pestaña.

1. Asegúrate de que **Discover USB devices** esté habilitado.

     ![Discover USB devices habilitado][discover]

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. Conecta el dispositivo Android directamente al equipo de desarrollo con un cable
   USB. No uses concentradores USB intermedios. Si esta es la primera vez que
   conectas el dispositivo Android a este equipo de desarrollo, el dispositivo
   aparece en **Unknown**, con el texto **Pending Authorization** debajo de
   él.

       ![Dispositivo desconocido, autorización pendiente][unknown]

[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. Si tu dispositivo figura como **Unknown**, acepta la solicitud de permiso **Allow USB
   Debugging** en el dispositivo Android. **Unknown** se
   reemplaza con el nombre del modelo de tu dispositivo Android. El círculo verde
   y el texto **Connected** indican que estás listo para depurar
   de manera remota tu dispositivo Android desde el equipo de desarrollo.

Note: Si tienes algún problema durante el proceso de detección, puedes 
reiniciarlo seleccionando **Settings** > **Developer Options** >
**Revoke USB Debugging Authorizations** en el dispositivo Android.

## Paso 2: Depura contenido en tu dispositivo Android desde tu equipo de desarrollo {: #debug }

1. Si no tienes Chrome abierto en tu dispositivo Android, ábrelo ahora.

1. De nuevo en DevTools, haz clic en la pestaña que coincide con el nombre
   del modelo del dispositivo. En la parte superior de esta página, verás el nombre del modelo de tu
   dispositivo Android seguido por su número de serie. Debajo de eso, puedes ver la versión
   de Chrome que se ejecuta en el dispositivo, con el número de versión entre
   paréntesis. Cada pestaña abierta de Chrome, tiene su propia sección. Puedes interactuar
   con la pestaña desde esta sección. Si alguna app está usando WebView,
   también verás una sección para cada una de esas apps. En la siguiente captura de pantalla, no se han abierto
   pestañas ni WebView.

       ![Dispositivo remoto conectado][connected]

[connected]: /web/tools/chrome-devtools/remote-debugging/imgs/connected-remote-device.png

1. Junto a **New tab**, escribe la dirección URL y luego haz clic en **Open**. La página se abre
   en una pestaña nueva en el dispositivo Android.

1. Haz clic en **Inspect** junto a la dirección URL que abriste. Se abre una instancia
   nueva de DevTools. La versión de Chrome de tu dispositivo Android
   determina la versión de DevTools que se abre en tu equipo de desarrollo.
   Por lo tanto, si el dispositivo Android ejecuta una versión anterior de Chrome, la instancia
   de DevTools puede tener una apariencia muy diferente de la que estás acostumbrado.

### Más acciones: volver a cargar, focalizar o cerrar una pestaña {: #more-actions }

Haz clic en **More Options** ![More Options][more]{:.devtools-inline} junto a la
pestaña que deseas volver a cargar, focalizar o cerrar.

[more]: /web/tools/chrome-devtools/images/three-dot.png

![volver a cargar, focalizar o cerrar una pestaña](imgs/reload.png)

### Inspeccionar elementos {: #inspect }

Ve al panel **Elements** de la instancia de DevTools y desplázate sobre un
elemento para destacarlo en la ventana de visualización del dispositivo Android.

También puedes presionar un elemento en la pantalla del dispositivo Android para seleccionarlo en el panel
**Elements**. Haz clic en **Select Element** ![Select
Element][select]{:.devtools-inline} en la instancia de DevTools y luego presiona
el elemento en la pantalla del dispositivo Android. Ten en cuenta que **Select Element**
se inhabilita después del primer toque, por lo que tienes que volver a habilitar esta opción cada vez que
quieras usar esta función.

[select]: imgs/select-element.png

### Presentar en pantalla desde un dispositivo Android en un equipo de desarrollo {: #screencast }

Haz clic en **Toggle Screencast** ![Toggle Screencast][screencast]{:.devtools-inline}
para ver el contenido del dispositivo Android en la instancia de DevTools.

[screencast]: imgs/toggle-screencast.png

Puedes interactuar con la presentación en pantalla de varias formas:

* Los clics se convierten en toques. Con esto se activarán eventos de entrada táctil en el dispositivo. 
* Las pulsaciones de teclas de tu computadora se envían al dispositivo. 
* Para simular un gesto de pellizcar, mantén presionada la tecla <kbd>Mayúscula</kbd> mientras arrastras. 
* Para desplazarte, usa el panel táctil, la rueda del mouse o el puntero de
 este.

Algunas notas sobre la presentación en pantalla:

* La presentación en pantalla solo muestra contenido de la página. Las partes transparentes de la presentación en pantalla 
  representan las interfaces del dispositivo, como el cuadro multifunción de Chrome, la barra de estado de 
  Android o el teclado de Android.
* La presentación en pantalla tiene un efecto negativo en los índices de fotogramas. Inhabilita la presentación en pantalla mientras
  midas los desplazamientos o las animaciones para obtener una idea más clara del rendimiento de
  la página.
* Si la pantalla del dispositivo Android se bloquea, el contenido de la presentación en pantalla
  desaparece. Desbloquea la pantalla del dispositivo Android para reanudar automáticamente la
  presentación en pantalla.

## Comentarios {: #feedback }

Si te gustaría ayudarnos a mejorar este instructivo, responde estas
preguntas.

{% framebox width="auto" height="auto" %}
<p>¿Completaste el instructivo correctamente?</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / Yes">Sí</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Completed / No">No</button>
<p>¿El instructivo contenía la información que buscabas?</p>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / Yes">Sí</button>
<button class="gc-analytics-event"
   data-category="DevTools / Remote Debugging"
   data-label="Relevant / No">No</button>
{% endframebox %}


{# wf_devsite_translation #}
