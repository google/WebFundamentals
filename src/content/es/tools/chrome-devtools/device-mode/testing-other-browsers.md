project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Tu trabajo no termina al asegurarte de que el sitio funciona perfectamente en Chrome y Android. Aunque Device Mode puede simular otros dispositivos diferentes, como iPhone, te recomendamos ver otras soluciones de navegadores para emulación.

{# wf_updated_on: 2020-07-21 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

# Cómo emular y probar otros navegadores {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Tu trabajo no termina al asegurarte de que el sitio funciona perfectamente en Chrome y Android. Aunque Device Mode puede simular otros dispositivos diferentes, como iPhone, te recomendamos ver otras soluciones de navegadores para emulación.


### TL;DR {: .hide-from-toc }
- Cuando no tienes un dispositivo determinado o deseas realizar una verificación al azar, la mejor opción es emular el dispositivo dentro del navegador.
- Los emuladores y simuladores de dispositivos te permiten imitar el sitio de desarrollo en diferentes dispositivos desde tu estación de trabajo.
- Los emuladores basados en la nube te permiten automatizar las pruebas de unidades para el sitio en diferentes plataformas.


## Emuladores de navegadores

Los emuladores de navegadores son muy útiles para probar la adaptabilidad de un sitio, pero no
emulan diferencias en API, compatibilidad con CSS y algunos comportamientos que estarían presentes
en un navegador móvil. Prueba tu sitio en navegadores que se ejecuten en dispositivos reales para
asegurarte de que todo tenga el comportamiento deseado.

### Vista de diseño adaptable de Firefox

Firefox tiene una [vista de diseño adaptable](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View)
que te alienta a dejar de pensar en términos de dispositivos específicos y a
explorar cómo cambia tu diseño en tamaños de pantalla comunes o tu propio tamaño
arrastrando los bordes.

### Emulación con F12 de Edge

Para emular los teléfonos Windows Phone, usa la [emulación integrada](https://dev.modern.ie/platform/documentation/f12-devtools-guide/emulation/) de Microsoft Edge.

Como Edge no incluye compatibilidad con versiones heredadas, usa la [emulación de IE 11](https://msdn.microsoft.com/en-us/library/dn255001(v=vs.85).aspx) para simular cómo se vería tu página en versiones anteriores de Internet Explorer.

## Emuladores y simuladores de dispositivos

Los emuladores y simuladores de dispositivos simulan no solo el entorno del navegador, sino también todo el dispositivo. Son útiles para probar comportamientos que requieren la integración del SO (por ejemplo, la entrada de un formulario con teclados virtuales).

### Android Emulator

<figure class="attempt-right">
  <img src="imgs/android-emulator-stock-browser.png" alt="Navegador Stock en Android Emulator">
  <figcaption>Navegador Stock en Android Emulator</figcaption>
</figure>

Hasta el momento, no se puede instalar Chrome en el emulador de Android. Sin embargo, puedes usar el navegador de Android, Chromium Content Shell y Firefox para Android, que abarcaremos posteriormente en esta guía. Chromium Content Shell usa el mismo motor de representación de Chrome, pero no incluye ninguna de las funciones específicas del navegador.

El emulador de Android incluye el SDK de Android que debes <a href="http://developer.android.com/sdk/installing/studio.html">descargar desde
aquí</a>. Luego, sigue las instrucciones para <a href="http://developer.android.com/tools/devices/managing-avds.html">configurar un dispositivo virtual</a> e <a href="http://developer.android.com/tools/devices/emulator.html">iniciar el emulador</a>.

Una vez iniciado el emulador, haz clic en el ícono del navegador a fin de probar tu sitio en el navegador Stock para Android.

#### Chromium Content Shell en Android

<figure class="attempt-right">
  <img src="imgs/android-avd-contentshell.png" alt="Content Shell en Android Emulator">
  <figcaption>Content Shell en Android Emulator</figcaption>
</figure>

A fin de instalar Chromium Content Shell para Android, deja el emulador en segundo plano
y ejecuta los siguientes comandos en un símbolo del sistema:

    git clone https://github.com/PaulKinlan/chromium-android-installer.git
    chmod u+x ./chromium-android-installer/\*.sh
    ./chromium-android-installer/install-chromeandroid.sh

Ahora puedes probar tu sitio en Chromium Content Shell.


#### Firefox en Android

<figure class="attempt-right">
  <img src="imgs/ff-on-android-emulator.png" alt="Ícono de Firefox en Android Emulator">
  <figcaption>Ícono de Firefox en Android Emulator</figcaption>
</figure>

Al igual que con Chromium Content Shell, puedes obtener un APK para instalar Firefox en el emulador.

Descarga el archivo .apk correcto desde <a href="https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/">https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/</a>.

Desde aquí, puedes instalar el archivo en un emulador abierto o dispositivo Android conectado con el siguiente comando:

    adb install &lt;path to APK&gt;/fennec-XX.X.XX.android-arm.apk


### Simulador de iOS

El simulador de iOS para Mac OS X incluye Xcode, que se puede [instalar desde
App Store](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12).

Cuando finalices, obtén más información sobre cómo trabajar con el simulador en la [documentación de Apple](https://developer.apple.com/library/prerelease/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/Introduction/Introduction.html).

Note: Para evitar que debas abrir Xcode cada vez que quieras usar el simulador de iOS, ábrelo, haz clic en el ícono del simulador de iOS en tu conector y selecciona `Keep in Dock`. Ahora solo deberás hacer clic en este ícono cuando lo necesites.

### Modern.IE

<figure class="attempt-right">
  <img src="imgs/modern-ie-simulator.png" alt="MV de Modern IE">
  <figcaption>MV de Modern IE</figcaption>
</figure>

Las máquinas virtuales de Modern.IE te permiten acceder a versiones diferentes de IE en tu computadora mediante VirtualBox (o VMWare). Elige una máquina virtual en la <a href="https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/">página de descarga</a>.


## Emuladores y simuladores basados en la nube

Si no puedes usar los emuladores y no tienes acceso a dispositivos reales, la mejor opción son los emuladores basados en la nube. Una gran ventaja de los emuladores basados en la nube, en comparación con los dispositivos reales y emuladores locales, es que puedes automatizar pruebas de unidades para el sitio en diferentes plataformas.

* [BrowserStack (comercial)](https://www.browserstack.com/automate) es el más fácil de usar para pruebas manuales. Debes seleccionar un sistema operativo, la versión de tu navegador, el tipo de dispositivo y una URL para navegar. Este emulador generará una máquina virtual alojada con la que podrás interactuar. También puedes usar diferentes emuladores en la misma pantalla, lo que te permitirá probar el aspecto de tu app en diversos dispositivos al mismo tiempo.
* [SauceLabs (comercial)](https://saucelabs.com/){: .external } te permite ejecutar pruebas de unidades dentro de un emulador, lo que puede ser muy útil para generar una secuencia de comandos del flujo por el sitio y ver posteriormente el video de esto en varios dispositivos. También puedes realizar la prueba manual del sitio.
* [Device Anywhere (comercial)](http://www.keynote.com/solutions/testing/mobile-testing) no
usa emuladores, sino dispositivos reales que puedes controlar de manera remota. Resulta muy útil cuando necesitas reproducir un problema en un dispositivo específico y no puedes ver el error en ninguna de las opciones de las guías anteriores.


## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}
