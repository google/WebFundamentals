project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Device Mode de Chrome DevTools te permite imitar cómo se verá tu sitio de desarrollo en producción cuando esté en un conjunto de dispositivos.

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# Ventanas de visualización receptivas de pruebas y específicas del dispositivo {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

La versión actualizada de Device Mode (a partir de Chrome 49) es una parte esencial de DevTools que prioriza los dispositivos móviles y amplía la barra de DevTools. Aprende cómo usar sus controles para simular un amplio conjunto de dispositivos o para ser totalmente adaptable.


### TL;DR {: .hide-from-toc }
- Prueba la receptividad de tu sitio usando el emulador de pantalla de Device Mode.
- Guarda los valores preestablecidos personalizados así después puedes acceder a ellos con facilidad.
- Device Mode no reemplaza a las pruebas de dispositivos reales. Ten en cuenta sus limitaciones.


## Usar los controles de la ventana de visualización {: #viewport-controls }

![device mode habilitado](imgs/device-mode.png)

Los Controles de la ventana de visualización te permiten probar tu sitio con una serie de dispositivos, así como también de manera totalmente receptiva. Tiene dos modos:

  1. **Responsive**: Hace que el tamaño de la ventana de visualización se pueda modificar libremente mediante grandes controladores a cada lado.
  2. **Dispositivo específico**. Bloquea a la ventana de visualización en el tamaño de ventana de visualización exacto de un dispositivo específico y emula determinadas características del dispositivo.

## Modo adaptable

Recomendamos que uses **Responsive Mode** como tu modo de trabajo predeterminado. Úsalo durante el desarrollo activo de tu sitio y app, y modifica el tamaño de la ventana de visualización con frecuencia a fin de crear un diseño libremente adaptable que se adapte incluso a tipos de dispositivos futuros y desconocidos.

Activa la [Media Queries Bar](#media-queries) para aprovechar Responsive Mode al máximo.

### Personalizar el tamaño de la ventana de visualización

Para lograr un control más detallado, arrastra los grandes controladores de modificación del tamaño en la ventana de visualización o haz clic en el valores de la barra de menú.

## Modo específico del dispositivo

Usa el **Device-specific Mode** cuando estás por terminar el desarrollo activo y deseas perfeccionar la apariencia de tu sitio en dispositivos móviles específicos (p. ej., un determinado iPhone o Nexus).

### Valores preestablecidos integrados en el dispositivo

<div class="wf-devtools-flex">
  <div>
  <p>Hemos incluido los dispositivos más populares de la actualidad en el menú desplegable del dispositivo. Luego de seleccionar un dispositivo, cada valor preestablecido automáticamente configura la emulación de determinadas características de dispositivo:</p>
  <ul>
    <li>Establece la cadena "User Agent" (UA) correcta.</li>
    <li>Establece la resolución y DPI del dispositivo (relación de píxeles del dispositivo).</li>
    <li>Emula eventos táctiles (de ser aplicables).</li>
    <li>Emula superposiciones de la barra de desplazamiento de dispositivos móviles y metaventana de visualización.</li>
    <li>Mide automáticamente (aumenta) el tamaño del texto para las páginas sin una ventana de visualización definida.</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/select-device.png" alt="selecciona un dispositivo">
  </div>
</div>

### Agregar valores preestablecidos a dispositivos personalizados

Device Mode ofrece una amplia gama de dispositivos para emular. Puedes agregar un 
dispositivo personalizado si encuentras un dispositivo de caso límite o nuevo que no esté incluido. 

<div class="wf-devtools-flex">
  <div>
  <p>Para agregar un dispositivo personalizado:</p>
  <ol>
    <li>Ve a DevTools Settings.</li>
    <li>Haz clic en la pestaña <strong>Devices</strong>.</li>
    <li>Haz clic en <strong>Add custom device</strong>.</li>
    <li>Ingresa un nombre de dispositivo, el ancho, la altura, la relación de píxeles del dispositivo y 
     la cadena user agent.</li>
     <li>Haz clic en <strong>Add</strong>.</li>
  </ol>
  <p>Tu dispositivo personalizado ahora está disponible en el menú desplegable <strong>Device</strong>.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/custom-device.png" alt="selecciona un dispositivo">
  </div>
</div>

### Estados y orientación del dispositivo

![activar o desactivar orientación](imgs/change-orientation.png)

Cuando se emula a un dispositivo específico, la barra de herramientas de Device Mode muestra un control adicional que primero funciona como una manera de activar o desactivar la orientación entre horizontal y vertical.

<div class="wf-devtools-flex">
  <div>
    <p>En los dispositivos seleccionados, el control hace más que meramente activar o desactivar la orientación. En dispositivos compatibles como Nexus 5X, encontrarás un menú desplegable que te permite emular determinados estados del dispositivo, por ejemplo:</p>
    <ul>
      <li>IU del navegador predeterminado</li>
      <li>Con la barra de navegación de Chrome </li>
      <li>Con teclado abierto</li>
    </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/change-device-state.png" alt="Cambia la IU del dispositivo">
  </div>
</div>

### Zoom to fit  

<div class="wf-devtools-flex">
  <div>
  <p>A veces querrás probar un dispositivo con una resolución mayor que el espacio real disponible en la ventana de tu navegador. En estos casos, es útil la opción <strong>Zoom to Fit</strong>:</p>
  <ol>
    <li><strong>Fit to Window</strong> automáticamente establece el nivel de zoom según el espacio máximo disponible.</li>
    <li><strong>Explicit percentages</strong> son útiles, por ejemplo, si deseas probar DPI en imágenes.</li>
  </ol>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/zoom-to-fit.png" alt="Zoom to Fit">
  </div>
</div>

## Controles opcionales (p. ej., toque, consultas de medios, DPR)

<div class="wf-devtools-flex">
  <div>
  <p>Los controles opcionales pueden cambiarse o habilitarse si haces clic en los tres puntos pequeños que aparecen en el lado derecho de la barra de herramientas del dispositivo. Las opciones actuales incluyen</p>
  <ul>
    <li>Tipo de user agent (Emula UA y eventos táctiles)</li>
    <li>Relación de píxeles del dispositivo</li>
    <li>Consultas de medios</li>
    <li>Reglas</li>
    <li>Configurar red (UA, Network Throttling)</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/device-mode-dotmenu.png" alt="Configuración de Device Mode">
  </div>
</div>

Continúa leyendo para conocer más acerca de las opciones específicas.

### User agent type

La configuración **User Agent Type** o Device Type te permite cambiar el tipo
de dispositivo. Los posibles valores son los siguientes:

  1. Móvil
  2. De escritorio
  3. De escritorio y táctil

Cambiar esta configuración influirá en la emulación de la ventana de visualización del dispositivo móvil y los eventos táctiles,
además cambiará la cadena UA. Así que si te gustaría crear un sitio adaptable para
Desktop y quieres probar los efectos de desplazamiento, cambia a "Desktop" en Responsive Mode.

**Sugerencia**: También puedes establecer user agent en el panel lateral [**Network conditions**][nc].



### Relación de píxeles del dispositivo (DPR)

Si deseas emular un dispositivo Retina desde una máquina que no sea Retina o viceversa
, ajusta la **Relación de píxeles del dispositivo**. La **relación de píxeles del 
dispositivo** (DPR) es la relación entre píxeles lógicos y píxeles físicos.
Los dispositivos con pantallas Retina, como Nexus 6P, tienen mayor densidad de píxeles 
que los dispositivos estándar, lo cual puede afectar la nitidez y el tamaño del contenido 
visual.

Algunos ejemplos de sensibilidad "Relación de píxeles del dispositivo" (DPR) en la Web son:

* Consultas de medios de CSS como:

      @media (-webkit-min-device-pixel-ratio: 2), 
             (min-resolution: 192dpi) { ... }

* las reglas [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) 
 de las CSS;

* el atributo [srcset](/web/fundamentals/design-and-ux/media/images/images-in-markup) 
 en las imágenes;

* La propiedad `window.devicePixelRatio`.

Si tienes una pantalla Retina nativa, verás que los recursos con valores bajos de "Puntos por pulgada" 
(PPP) parecen pixelados mientras que los recursos con valores altos de PPP son nítidos. Para simular 
este efecto en una pantalla estándar, fija la DPR en 2 y aumenta la ventana de visualización 
con el zoom. Un recurso 2x continuará viéndose nítido, mientras que uno 1x parecerá 
pixelado.

### Consultas de medios{: #media-queries }

[Consultas de medios](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries)
son una parte esencial del diseño web adaptable. Para ver el inspector de consulta de medios,
haz clic en **Show Media queries** en el menú de tres puntos. DevTools detecta las consultas de
medios en tus hojas de estilo y las muestra como barras coloreadas en la regla superior.

![mostrar consultas de medios](imgs/show-media-queries.png)

![inspector de consulta de medios](imgs/media-query-inspector-ruler.png)

Las consultas de medios están codificadas por colores tal como se muestra a continuación:

<style>#colortable { width: 60%; border: none; } #colortable td { border: none; } .max-width { background: #327ff2; width: 10%; } .max-and-min { background: #3b9903; width: 10%; } .min-width { background: #d4731f; width: 10%; }</style>

<table id="colortable">
  <tbody>
    <tr>
      <td class="max-width"></td>
      <td>Consultas que tienen como objetivo un ancho máximo.</td>
    </tr>
    <tr>
      <td class="max-and-min"></td>
      <td>Consultas que tienen como objetivo anchos dentro de un rango.</td>
    </tr>
    <tr>
      <td class="min-width"></td>
      <td>Consultas que tienen como objetivo un ancho mínimo.</td>
    </tr>
  </tbody>
</table>

#### Obtener una vista previa rápida de una consulta de medios

Haz clic en la barra de una consulta de medios para ajustar el tamaño de la ventana de visualización y los estilos de vista previa para
los tamaños de las pantallas objetivo.

#### Ver CSS asociado

Haz clic con el botón secundario en una barra para ver dónde se define la consulta de medios en CSS y pasa a
la definición en el código fuente.

![vista de los principios fundamentales web de las consultas de medios](imgs/reveal-source-code.png)

### Reglas

Activa o desactiva esta opción para mostrar las reglas basadas en píxeles al lado de la ventana de visualización.

### Configura la red (UA, network throttling)

Cuando seleccionas esta opción, se abre un panel en el Panel lateral que te permite cambiar
comportamientos relacionados con la red:

  1. **Disk Cache**: deshabilitar Disk Cache impide que el navegador almacene las páginas y sus recursos
     en caché mientras DevTools está abierto.
  2. **Network Throttling**: obtén más información sobre [Network Throttling aquí](/web/tools/chrome-devtools/network-performance/network-conditions).
  3. **User Agent**: Te permite anular una cadena UA (User Agent)
     específica.

**Sugerencia**: También puedes abrir el panel lateral **Network conditions** desde el 
[menú principal][nc].

## Limitaciones

Device Mode tiene algunas limitaciones.

* **Hardware del dispositivo**
  * El comportamiento de la GPU y la CPU no se emula.
* **IU del navegador**
  * Las pantallas del sistema, como la barra de direcciones, no se emulan.
  * Las pantallas nativas, como los elementos `<select>`, no se emulan como una lista modal.
  * Algunas mejoras, como las entradas de números para abrir un teclado numérico, pueden diferir respecto del comportamiento real del dispositivo.
* **Funcionalidad del navegador**
  * WebGL funciona en el emulador, pero no es compatible con los dispositivos iOS 7.
  * MathML no se admite en Chrome, pero es compatible con los dispositivos iOS 7.
  * El [error de zoom de orientación de iOS 5](https://github.com/scottjehl/device-bugs/issues/2) no se emula.
  * La propiedad de altura de línea de la CSS funciona en el emulador, pero no es compatible con Opera Mini.
  * Los límites de las reglas de CSS, como las de [Internet Explorer](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx), no se emulan.
* **AppCache**
  * El emulador no anula la <abbr title="User Agent">UA</abbr> para AppCache [archivos del manifiesto](https://code.google.com/p/chromium/issues/detail?id=334120) o [ver solicitudes de origen](https://code.google.com/p/chromium/issues/detail?id=119767).

Pese a estas limitaciones, Device Mode es lo suficientemente sólido para realizar la mayoría de las tareas.
Cuando necesites probar en un dispositivo real, puedes usar 
[Depuración remota](/web/tools/chrome-devtools/debug/remote-debugging) 
para conocer más.


[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions


{# wf_devsite_translation #}
