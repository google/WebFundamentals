project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Depura contenido activo en un dispositivo Android de manera remota desde una computadora con Windows, Mac o Linux.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

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

<figure>
  <img src="imgs/remote-debugging.png"
       alt="La depuración remota te permite inspeccionar desde tu equipo de desarrollo
            una página que se está ejecutando en un dispositivo Android."/>
  <figcaption>
    <b>Figura 1</b>. La depuración remota te permite inspeccionar desde tu equipo de desarrollo
    una página que se está ejecutando en un dispositivo Android.
  </figcaption>
</figure>

## Paso 1: Detecta el dispositivo Android {: #discover }

El siguiente flujo de trabajo funciona para la mayoría de los usuarios. Consulta [Solución de problemas: DevTools no detecta el
dispositivo Android](#troubleshooting) para obtener más ayuda.

1. Abre la pantalla **Developer Options** en el dispositivo Android. Consulta [Configurar opciones para programadores
   en el dispositivo](https://developer.android.com/studio/debug/dev-options.html){:.external}.
1. Selecciona **Enable USB Debugging**.
1. En tu equipo de desarrollo, abre Chrome.
1. [Abre DevTools](/web/tools/chrome-devtools/#open).
1. En DevTools, haz clic en el **menú principal** ![menú principal][main]{:.devtools-inline} 
   y selecciona **More tools** > **Remote devices**. 

     <figure>
       <img src="imgs/open-remote-devices.png"
            alt="Apertura de la pestaña Remote Devices desde el menú principal."/>
       <figcaption>
         <b>Figura 2</b>. Apertura de la pestaña <b>Remote Devices</b> desde el <b>menú principal</b>
       </figcaption>
     </figure>

[main]: /web/tools/chrome-devtools/images/three-dot.png
[open]: /web/tools/chrome-devtools/remote-debugging/imgs/open-remote-devices.png

1. En DevTools, abre la pestaña **Settings**.

1. Asegúrate de que la casilla de verificación **Discover USB devices** esté habilitada.

     <figure>
       <img src="imgs/discover-usb-devices.png" alt="La casilla de verificación Discover USB Devices está
           habilitada."/>
       <figcaption>
         <b>Figura 3</b>. La casilla de verificación <b>Discover USB Devices</b> está habilitada
       </figcaption>
     </figure>

[discover]: /web/tools/chrome-devtools/remote-debugging/imgs/discover-usb-devices.png

1. Conecta el dispositivo Android directamente al equipo de desarrollo con un cable
   USB. La primera vez que haces esto, normalmente, ves que DevTools detecta un dispositivo
   desconocido. Si ves un punto verde y el texto **Connected** debajo del nombre del modelo de
   tu dispositivo Android, significa que DevTools se ha conectado correctamente con
   el dispositivo. Sigue con el [paso 2](#debug).

     <figure>
       <img src="imgs/unknown-device.png" alt="La pestaña Remote Devices detectó correctamente
           un dispositivo desconocido cuya autorización está pendiente."/>
       <figcaption>
         <b>Figura 4</b>. La pestaña <b>Remote Devices</b> detectó correctamente un dispositivo
         desconocido cuya autorización está pendiente
       </figcaption>
     </figure>


[unknown]: /web/tools/chrome-devtools/remote-debugging/imgs/unknown-device.png

1. Si tu dispositivo figura como **Unknown**, acepta la solicitud de permiso **Allow USB
   Debugging** en el dispositivo Android. 

### Solución de problemas: DevTools no detecta el dispositivo Android {: #troubleshooting }

Asegúrate de que el hardware esté configurado correctamente:

* Si usas un concentrador USB, prueba a conectar el dispositivo Android directamente a tu
  máquina de desarrollo.
* Intenta desconectar el cable USB que conecta el dispositivo Android al equipo de desarrollo y volver a
  conectarlo. Hazlo cuando las pantallas del dispositivo Android y el equipo
  de desarrollo estén desbloqueadas.
* Asegúrate de que el cable USB funcione. Deberías poder inspeccionar archivos en el dispositivo Android
  desde el equipo de desarrollo.

Asegúrate de que el software esté configurado correctamente:

* Si tu equipo de desarrollo ejecuta Windows, intenta instalar manualmente los controladores USB para
  tu dispositivo Android. Consulta [Instalar controladores USB de OEM][drivers]{:.external}.
* Algunas combinaciones de Windows y dispositivos Android (especialmente Samsung) requieren configuración
  adicional. Consulta [Chrome DevTools Devices does not detect device when plugged in][SO]{:.external}(Los dispositivos Chrome DevTools no detectan un dispositivo conectado).

Si no aparece el mensaje **Allow USB Debugging** en el dispositivo Android, prueba lo siguiente:

* Desconectar y volver a conectar el cable USB mientras DevTools está seleccionada en
  el equipo de desarrollo y la pantalla inicial del dispositivo Android es visible. En otras palabras,
  a veces el mensaje no aparece si la pantalla del dispositivo Android o la del equipo de desarrollo
  están bloqueadas.
* Actualizar la configuración de pantalla del dispositivo Android y el equipo
  de desarrollo de modo que nunca pasen a un estado de suspensión.
* Configurar el modo USB del dispositivo Android en PTP. Consulta [Galaxy S4 does not show Authorize USB debugging
  dialog box](https://android.stackexchange.com/questions/101933){: .external }(Galaxy S4 no muestra el cuadro de diálogo Authorize USB debugging).
* Selecciona **Revoke USB Debugging Authorizations** en la pantalla **Developer Options** de tu
  dispositivo Android para restablecer el estado.

Si encuentras una solución que no se menciona en esta sección o en [Chrome DevTools Devices
does not detect device when plugged in][SO]{: .external}, agrega una respuesta a esa pregunta de Stack
Overflow o [abre un problema en el repositorio de webfundamentals][issue]{:.external}.

[drivers]: https://developer.android.com/tools/extras/oem-usb.html
[SO]: https://stackoverflow.com/questions/21925992
[issue]: https://github.com/google/webfundamentals/issues/new?title=[Remote%20Debugging]

## Paso 2: Depura contenido en tu dispositivo Android desde tu equipo de desarrollo {: #debug }

1. Abre Chrome en el dispositivo Android.
1. En la pestaña **Remote Devices**, haz clic en la pestaña que coincide con el nombre del modelo del dispositivo Android.
   En la parte superior de esta página, verás el nombre del modelo de tu dispositivo Android seguido por su número
   de serie. Debajo de eso, podrás ver la versión de Chrome que se ejecuta en el dispositivo, con el
   número de versión entre paréntesis. Cada pestaña abierta de Chrome tiene su propia sección. Puedes
   interactuar con la pestaña desde esta sección. Si alguna app está usando WebView, también verás una
   sección para cada una de esas apps. En la <b>figura 5</b> no hay pestañas ni instancias de WebViews abiertas.

     <figure>
       <img src="imgs/connected-remote-device.png" alt="Dispositivo remoto conectado."/>
       <figcaption>
         <b>Figura 5</b>. Dispositivo remoto conectado
       </figcaption>
     </figure>

1. En el cuadro de texto **New tab**, escribe una URL y después haz clic en **Open**. La página se abre
   en una pestaña nueva en el dispositivo Android.

1. Haz clic en **Inspect** junto a la URL que acabas de abrir. Se abre una instancia
   nueva de DevTools. La versión de Chrome de tu dispositivo Android
   determina la versión de DevTools que se abre en tu equipo de desarrollo.
   Por lo tanto, si el dispositivo Android ejecuta una versión anterior de Chrome, la instancia
   de DevTools puede tener una apariencia muy diferente de la que estás acostumbrado.

### Más acciones: volver a cargar, focalizar o cerrar una pestaña {: #more-actions }

Haz clic en **More Options** ![More Options][more]{:.devtools-inline} junto a la
pestaña que deseas volver a cargar, focalizar o cerrar.

[more]: /web/tools/chrome-devtools/images/three-dot.png

<figure>
  <img src="imgs/reload.png" alt="Menú para volver a cargar, focalizar o cerrar una pestaña."/>
  <figcaption>
    <b>Figura 6</b>. Menú para volver a cargar, focalizar o cerrar una pestaña
  </figcaption>
</figure>

### Inspeccionar elementos {: #inspect }

Ve al panel **Elements** de la instancia de DevTools y coloca el cursor sobre un
elemento para destacarlo en la vista del puerto del dispositivo Android.

También puedes tocar un elemento en la pantalla del dispositivo Android para seleccionarlo en el
panel **Elements**. Haz clic en **Select Element** ![Select
Element][select]{:.devtools-inline} en tu instancia de DevTools y después toca
el elemento en la pantalla de tu dispositivo Android. Ten en cuenta que **Select Element**
se inhabilita después del primer toque, por lo que tienes que volver a habilitar esta opción cada vez que
quieras usarla.

[select]: imgs/select-element.png

### Hacer una presentación en pantalla de la pantalla del dispositivo Android en el equipo de desarrollo {: #screencast }

Haz clic en **Toggle Screencast** ![Toggle Screencast][screencast]{:.devtools-inline}
para ver el contenido del dispositivo Android en la instancia de DevTools.

[screencast]: imgs/toggle-screencast.png

Puedes interactuar con la presentación en pantalla de varias formas:

* Los clics se convierten en toques. Con esto se activarán eventos de entrada táctil en el dispositivo. 
* Las pulsaciones de teclas de tu computadora se envían al dispositivo. 
* Para simular un gesto de pellizcar, mantén presionada la tecla <kbd>Mayús</kbd> mientras arrastras. 
* Para desplazarte, usa el panel táctil, la rueda del mouse o el puntero del
 mouse.

Algunas notas sobre la presentación en pantalla:

* La presentación en pantalla solo muestra contenido de la página. Las partes transparentes de la presentación en pantalla 
  representan las interfaces del dispositivo, como el barra de direcciones de Chrome, la barra de estado de 
  Android o el teclado de Android.
* La presentación en pantalla tiene un efecto negativo en los índices de fotogramas. Inhabilita la presentación en pantalla mientras
  midas los desplazamientos o las animaciones para obtener una idea más clara del rendimiento de
  la página.
* Si la pantalla del dispositivo Android se bloquea, el contenido de la presentación en pantalla
  desaparece. Desbloquea la pantalla del dispositivo Android para reanudar automáticamente la
  presentación en pantalla.

## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}
