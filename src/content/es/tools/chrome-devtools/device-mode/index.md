project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Usa dispositivos virtuales en Device Mode de Chrome para compilar sitios web que prioricen los dispositivos móviles.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

[capture]: /web/tools/chrome-devtools/images/shared/capture-settings.png
[customize]: /web/tools/chrome-devtools/images/shared/customize-and-control-devtools.png

# Simulación de dispositivos móviles con Device Mode en Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Usa Device Mode para saber de manera aproximada cuál será el aspecto y el rendimiento de tu página en un dispositivo móvil.

Device Mode es el nombre de un conjunto variado de funciones en Chrome DevTools que
te ayudan a simular dispositivos móviles. Estas funciones incluyen:

* [Simulación de la vista del puerto de un dispositivo móvil](#viewport)
* [Limitación de la red](#network)
* [Limitación de la CPU](#cpu)
* [Simulación de la ubicación geográfica](#geolocation)
* [Configuración de la orientación](#orientation)

## Limitaciones {: #limitations }

Considera Device Mode como una [aproximación de primer orden][approximation]{:.external} para conocer el aspecto y el funcionamiento
de tu página en un dispositivo móvil. Con Device Mode no ejecutas el código
en un dispositivo móvil, sino que simulas la experiencia del usuario móvil desde tu laptop o equipo de escritorio.

[approximation]: https://en.wikipedia.org/wiki/Order_of_approximation#First-order

Hay algunos aspectos de los dispositivos móviles que DevTools nunca podrá simular. Por
ejemplo, la arquitectura de las CPU móviles es muy distinta de la arquitectura de la CPU de una laptop
o un equipo de escritorio. Si tienes dudas, lo mejor que puedes hacer es ejecutar la página en un dispositivo móvil.
Usa [Remote Debugging](/web/tools/chrome-devtools/remote-debugging/) para ver, cambiar, depurar
y generar un perfil del código de una página desde tu laptop o equipo de escritorio mientras lo ejecutas en un dispositivo móvil.

## Simulación de la vista del puerto de un dispositivo móvil {: #viewport }

Haz clic en **Toggle Device Toolbar** ![Toggle Device Toolbar][TDB]{: .inline-icon } para abrir la IU que
te permite simular la vista del puerto de un dispositivo móvil.

[TDB]: /web/tools/chrome-devtools/images/shared/toggle-device-toolbar.png

<figure>
  <img src="imgs/device-toolbar.png"
       alt="Barra de herramientas de dispositivo."/>
  <figcaption>
    <b>Figura 1</b>. Barra de herramientas de dispositivo
  </figcaption>
</figure>

De manera predeterminada, la barra de herramientas de dispositivo se abre en el modo de vista del puerto receptiva.

### Modo de vista del puerto receptiva {: #responsive }

Arrastra los controladores para cambiar el tamaño de la vista del puerto a las dimensiones que necesites. También puedes ingresar valores específicos
en los cuadros de ancho y altura. En la **figura 2**, el ancho es `628` y la altura es
`662`.

<figure>
  <img src="imgs/responsive-handles.png"
       alt="Controladores para cambiar las dimensiones de la vista del puerto en el modo de vista del puerto receptiva."/>
  <figcaption>
    <b>Figura 2</b>. Controladores para cambiar las dimensiones de la vista del puerto en el modo de vista del puerto receptiva
  </figcaption>
</figure>

#### Visualización de consultas de medios {: #queries }

Para mostrar los puntos de interrupción de consultas de medios por encima de la vista del puerto, haz clic en **More options** y luego selecciona **Show media
queries**.

<figure>
  <img src="imgs/show-media-queries.png"
       alt="Show media queries."/>
  <figcaption>
    <b>Figura 3</b>. Show media queries
  </figcaption>
</figure>

Haz clic en un punto de interrupción para cambiar el ancho de la vista del puerto para que se active el punto de interrupción.

<figure>
  <img src="imgs/breakpoint.png"
       alt="Haz clic en un punto de interrupción para cambiar el ancho de la vista del puerto."/>
  <figcaption>
    <b>Figura 4</b>. Haz clic en un punto de interrupción para cambiar el ancho de la vista del puerto.
  </figcaption>
</figure>

### Modo de vista del puerto de dispositivo móvil {: #device }

Para simular las dimensiones de un dispositivo móvil específico, selecciona el dispositivo en la lista **Device**.

<figure>
  <img src="imgs/device-list.png"
       alt="Lista Device."/>
  <figcaption>
    <b>Figura 5</b>. Lista Device
  </figcaption>
</figure>

#### Cambio a la orientación horizontal de la vista del puerto {: #landscape }

Haz clic en **Rotate** ![Rotate](imgs/rotate.png){: .inline-icon } para cambiar a la orientación horizontal de la vista del puerto.

<figure>
  <img src="imgs/landscape.png"
       alt="Orientación horizontal."/>
  <figcaption>
    <b>Figura 6</b>. Orientación horizontal
  </figcaption>
</figure>

Ten en cuenta que el botón **Rotate** desaparece si la **barra de herramientas de dispositivo** es angosta.

<figure>
  <img src="imgs/device-toolbar.png"
       alt="Barra de herramientas de dispositivo."/>
  <figcaption>
    <b>Figura 7</b>. Barra de herramientas de dispositivo
  </figcaption>
</figure>

Consulta también [Configuración de la orientación](#orientation).

#### Visualización del marco del dispositivo {: #frame }

Al simular las dimensiones de un dispositivo móvil específico como un iPhone 6, abre **More options**
y selecciona **Show device frame** para mostrar el marco del dispositivo físico alrededor de la vista del puerto.

Note: Si no ves el marco de un dispositivo específico, es probable que DevTools
simplemente no tenga la imagen de esa opción en particular.

<figure>
  <img src="imgs/show-device-frame.png"
       alt="Show device frame."/>
  <figcaption>
    <b>Figura 8</b>. Show device frame
  </figcaption>
</figure>

<figure>
  <img src="imgs/iphone-frame.png"
       alt="Marco de dispositivo de un iPhone 6."/>
  <figcaption>
    <b>Figura 9</b>. Marco de dispositivo de un iPhone 6
  </figcaption>
</figure>

### Visualización de reglas {: #rulers }

Haz clic en **More options** y después selecciona **Show rulers** para ver las reglas arriba y a la izquierda
de la vista del puerto. La unidad de tamaño de las reglas son los píxeles.

<figure>
  <img src="imgs/show-rulers.png"
       alt="Show rulers."/>
  <figcaption>
    <b>Figura 10</b>. Show rulers
  </figcaption>
</figure>

<figure>
  <img src="imgs/rulers.png"
       alt="Reglas arriba y a la izquierda de la vista del puerto."/>
  <figcaption>
    <b>Figura 11</b>. Reglas arriba y a la izquierda de la vista del puerto
  </figcaption>
</figure>

### Zoom en la vista del puerto {: #zoom }

Usa la lista **Zoom** para acercar o alejar.

<figure>
  <img src="imgs/zoom-viewport.png"
       alt="Zoom."/>
  <figcaption>
    <b>Figura 11</b>. Zoom
  </figcaption>
</figure>

## Limitación de la red y la CPU {: #throttle }

Para limitar la red y la CPU, selecciona **Mid-tier mobile** o **Low-end mobile**
en la lista **Throttle**.

<figure>
  <img src="imgs/throttling.png"
       alt="Lista Throttle."/>
  <figcaption>
    <b>Figura 12</b>. Lista Throttle
  </figcaption>
</figure>

**Mid-tier mobile** simula conexiones 3G y limita tu CPU para que sea 4 veces
más lenta que lo normal. **Low-end mobile** simula conexiones 3G y limita tu CPU para que sea 6 veces más lenta que lo normal.
Ten en cuenta que la limitación es con respecto a la capacidad normal de tu laptop o equipo de escritorio.

La lista **Throttle** estará oculta si la **barra de herramientas de dispositivo** es angosta.

<figure>
  <img src="imgs/device-toolbar.png"
       alt="Barra de herramientas de dispositivo."/>
  <figcaption>
    <b>Figura 13</b>. Barra de herramientas de dispositivo
  </figcaption>
</figure>

### Limitación de la CPU solamente {: #cpu }

Para limitar solamente la CPU y no la red, ve al panel **Performance**, haz clic en
**Capture Settings** ![Capture Settings][capture]{:.inline-icon}y selecciona
**4x slowdown** o **6x slowdown** en la lista **CPU**.

<figure>
  <img src="imgs/cpu.png"
       alt="Lista CPU."/>
  <figcaption>
    <b>Figura 14</b>. Lista CPU
  </figcaption>
</figure>

### Limitación de la red solamente {: #network }

Para limitar la red pero no la CPU, ve al panel **Network** y selecciona
**Fast 3G** o **Slow 3G** en la lisa **Throttle**.

<figure>
  <img src="imgs/network.png"
       alt="Lista Throttle."/>
  <figcaption>
    <b>Figura 14</b>. Lista Throttle
  </figcaption>
</figure>

De manera alternativa, puedes presionar <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) o
<kbd>Ctrl</kbd>+<kbd>Mayús</kbd>+<kbd>P</kbd> (SO Windows, Linux o Chrome) para abrir
el menú Command, escribir `3G` y seleccionar **Enable fast 3G throttling** o
**Enable slow 3G throttling**.

<figure>
  <img src="imgs/commandmenu.png"
       alt="Menú Command."/>
  <figcaption>
    <b>Figura 15</b>. Menú Command
  </figcaption>
</figure>

También puedes configurar la limitación de la red desde el panel **Performance**. Haz clic en
**Capture Settings** ![Capture Settings][capture]{: .inline-icon } y después
selecciona **Fast 3G** o **Slow 3G** en la lista **Network**.

<figure>
  <img src="imgs/network2.png"
       alt="Configuración de la limitación de la red desde el panel Performance."/>
  <figcaption>
    <b>Figura 16</b>. Configuración de la limitación de la red desde el panel Performance
  </figcaption>
</figure>

## Anulación de la ubicación geográfica {: #geolocation }

Para abrir la IU de anulación de la ubicación geográfica, haz clic en **Customize and control DevTools**
![Customize and control DevTools][customize]{: .inline-icon } y selecciona
**More tools** > **Sensors**.

<figure>
  <img src="imgs/sensors.png"
       alt="Sensors"/>
  <figcaption>
    <b>Figura 17</b>. Sensors
  </figcaption>
</figure>

De manera alternativa, puedes presionar <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) o
<kbd>Ctrl</kbd>+<kbd>Mayús</kbd>+<kbd>P</kbd> (SO Windows, Linux o Chrome) para abrir
el menú Command, escribir `Sensors` y seleccionar **Show Sensors**.

<figure>
  <img src="imgs/show-sensors.png"
       alt="Show Sensors"/>
  <figcaption>
    <b>Figura 18</b>. Show Sensors
  </figcaption>
</figure>

Selecciona una de las configuraciones preestablecidas en la lista **Geolocation** o selecciona **Custom location**
para ingresar tus propias coordenadas. También puedes seleccionar **Location unavailable** para probar cómo se comporta tu página
cuando la ubicación geográfica está en estado de error.

<figure>
  <img src="imgs/geolocation.png"
       alt="Geolocation"/>
  <figcaption>
    <b>Figura 19</b>. Geolocation
  </figcaption>
</figure>

## Configuración de la orientación {: #orientation }

Para abrir la IU de la orientación, haz clic en **Customize and control DevTools**
![Customize and control DevTools][customize]{: .inline-icon } y selecciona
**More tools** > **Sensors**.


<figure>
  <img src="imgs/sensors.png"
       alt="Sensors"/>
  <figcaption>
    <b>Figura 20</b>. Sensors
  </figcaption>
</figure>

De manera alternativa, puedes presionar <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) o
<kbd>Ctrl</kbd>+<kbd>Mayús</kbd>+<kbd>P</kbd> (SO Windows, Linux o Chrome) para abrir
el menú Command, escribir `Sensors` y seleccionar **Show Sensors**.

<figure>
  <img src="imgs/show-sensors.png"
       alt="Show Sensors"/>
  <figcaption>
    <b>Figura 21</b>. Show Sensors
  </figcaption>
</figure>

Selecciona uno de los valores preestablecidos de la lista **Orientation** o selecciona **Custom orientation**
para establecer tus propios valores alfa, beta y gamma.

<figure>
  <img src="imgs/orientation.png"
       alt="Orientation"/>
  <figcaption>
    <b>Figura 22</b>. Orientation
  </figcaption>
</figure>

## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}

Consulta [Join the DevTools community](/web/tools/chrome-devtools/#community) (Unirse a la comunidad de DevTools) para conocer otras formas
de enviar comentarios.
