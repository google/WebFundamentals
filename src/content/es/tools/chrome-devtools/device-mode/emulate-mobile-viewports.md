project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Device Mode de Chrome DevTools te permite imitar cómo se verá tu sitio de desarrollo en producción cuando se muestre en un conjunto de dispositivos.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

# Vistas del puerto receptivas de pruebas y específicas del dispositivo {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

La versión actualizada de Device Mode (a partir de Chrome 49) es una parte esencial de DevTools que prioriza los dispositivos móviles y 
amplía la barra principal de DevTools. Aprende cómo usar sus controles para simular un amplio conjunto de dispositivos o 
para lograr total receptividad.


### TL;DR {: .hide-from-toc }
- Prueba la receptividad de tu sitio con el emulador de pantallas de Device Mode.
- Guarda dispositivos preestablecidos personalizados para poder acceder a ellos fácilmente en otro momento.
- Device Mode no reemplaza la prueba del dispositivo real. Ten en cuenta sus limitaciones.


## Uso de los controles de la vista del puerto {: #viewport-controls }

![Device Mode habilitado](imgs/device-mode.png)

Los controles de la vista del puerto te permiten probar tu sitio en una serie de dispositivos, así como también de manera totalmente 
receptiva. Tiene dos modos:

  1. **Adaptable**. Permite modificar libremente el tamaño de la vista del puerto mediante controladores en cada lado. 
  2. **Dispositivo específico**. Bloquea la vista del puerto en el tamaño exacto de un dispositivo específico y 
  emula determinadas características del dispositivo.

## Modo adaptable

Recomendamos que uses **Responsive Mode** como modo de trabajo predeterminado. Úsalo durante el 
desarrollo activo de tu sitio y app, y modifica el tamaño de la vista del puerto con frecuencia a fin de crear un diseño libremente adaptable 
que se adapte incluso a tipos de dispositivos futuros y desconocidos.

Activa la [barra de consultas de medios](#media-queries) para aprovechar el modo adaptable al máximo.

### Personalización del tamaño de la vista del puerto

Para lograr un control 
más detallado, arrastra los controladores grandes de modificación del tamaño en la vista del puerto o haz clic en el valores de la barra de menú.

## Modo específico del dispositivo

Usa **Device-specific Mode** cuando estés por terminar el desarrollo activo y desees 
perfeccionar la apariencia de tu sitio en dispositivos móviles específicos (p. ej., un determinado iPhone o Nexus).

### Valores preestablecidos integrados en el dispositivo

<div class="wf-devtools-flex">
  <div>
  <p>Hemos incluido los dispositivos más populares de la actualidad en el menú desplegable de dispositivos. Después de seleccionar 
    un dispositivo, cada valor preestablecido automáticamente configura la emulación de determinadas características del dispositivo:</p>
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

### Adición de dispositivos personalizados preestablecidos

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

Cuando se emula a un dispositivo específico, la barra de herramientas de Device Mode muestra un control adicional que
 funciona principalmente como una manera de alternar entre la orientación horizontal y la vertical.

<div class="wf-devtools-flex">
  <div>
    <p>En los dispositivos seleccionados, el control hace más que solo activar o desactivar la orientación. En dispositivos 
      compatibles, como Nexus 5X, encontrarás un menú desplegable que te permite emular determinados 
      estados del dispositivo, por ejemplo:</p>
    <ul>
      <li>IU del navegador predeterminado</li>
      <li>Con la barra de navegación de Chrome</li>
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
  <p>A veces querrás probar un dispositivo con una resolución mayor que el espacio real disponible 
    en la ventana de tu navegador. En estos casos, es útil la opción 
    <strong>Zoom to Fit</strong>:</p>
  <ol>
    <li>
      <strong>Fit to Window</strong> establece automáticamente el nivel de zoom según el espacio máximo 
      disponible.
    </li>
    <li>
      La opción <strong>Explicit percentages</strong> es útil, por ejemplo, si deseas probar 
      DPI en imágenes.
    </li>
  </ol>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/zoom-to-fit.png" alt="Zoom to Fit">
  </div>
</div>

## Controles opcionales (p. ej. toque, consultas de medios, DPR)

<div class="wf-devtools-flex">
  <div>
  <p>Puedes cambiar o habilitar los controles opcionales si haces clic en los tres puntos pequeños que aparecen 
    en el lado derecho de la barra de herramientas del dispositivo. Las opciones actuales incluyen:</p>
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
además cambiará la cadena UA. Así que, si te gustaría crear un sitio adaptable para
escritorio y quieres probar los efectos de desplazamiento, cambia a "Desktop" en Responsive Mode.

**Sugerencia**: También puedes establecer User agent en el panel lateral 
[**Network conditions**][nc].


### Relación de píxeles del dispositivo (DPR)

Si deseas emular un dispositivo Retina desde una máquina que no sea Retina o viceversa, 
ajusta **Device pixel ratio**. La **relación de píxeles del 
dispositivo** (DPR) es la relación entre los píxeles lógicos y los píxeles físicos. 
Los dispositivos con pantallas Retina, como Nexus 6P, tienen mayor densidad de píxeles 
que los dispositivos estándar, lo cual puede afectar la nitidez y el tamaño del contenido 
visual.

Algunos ejemplos de sensibilidad de relación de píxeles del dispositivo (DPR) en la Web son:

* Consultas de medios de CSS, como:

      @media (-webkit-min-device-pixel-ratio: 2), 
             (min-resolution: 192dpi) { ... }

* Las reglas [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) 
  de CSS.

* El atributo [srcset](/web/fundamentals/design-and-ux/responsive/images#images-in-markup) 
  en imágenes.

* La propiedad `window.devicePixelRatio`.

Si tienes una pantalla Retina nativa, verás que los recursos con valores bajos de "puntos por pulgada" 
(PPP) parecen pixelados, mientras que los recursos con valores altos de PPP son nítidos. Para simular 
este efecto en una pantalla estándar, fija la DPR en 2 y aumenta la ventana de visualización 
con el zoom. Un recurso 2x continuará viéndose nítido, mientras que uno 1x se verá 
pixelado.

### Consultas de medios {: #media-queries }

Las [consultas de medios](/web/fundamentals/design-and-ux/responsive/#use-media-queries)
son una parte esencial del diseño web adaptable. Para ver el inspector de consulta de medios,
haz clic en **Show media queries** en el menú de tres puntos. DevTools detecta las consultas de
medios en tus hojas de estilo y las muestra como barras coloreadas en la regla superior.

![mostrar consultas de medios](imgs/show-media-queries.png)

![inspector de consulta de medios](imgs/media-query-inspector-ruler.png)

Las consultas de medios están codificadas por colores tal como se muestra a continuación:

<style>
  #colortable { width: 60%; border: none; } #colortable td { border: none; } 
  .max-width { background: #327ff2; width: 10%; } 
  .max-and-min { background: #3b9903; width: 10%; }
  .min-width { background: #d4731f; width: 10%; }
</style>

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

#### Vista previa rápida de una consulta de medios

Haz clic en la barra de una consulta de medios para ajustar el tamaño de la vista del puerto y los estilos de vista previa a
los tamaños de las pantallas objetivo.

#### Visualización de CSS asociado

Haz clic con el botón secundario en una barra para ver dónde se define la consulta de medios en CSS y pasar a
la definición en el código fuente.

![vista de los principios fundamentales web de las consultas de medios](imgs/reveal-source-code.png)

### Reglas

Activa o desactiva esta opción para mostrar las reglas basadas en píxeles al lado de la vista del puerto.

### Configuración de la red (UA, Network throttling) {: #network }

Si seleccionas esta opción, se abre el [panel lateral Network Conditions][nc], donde puedes
cambiar los siguientes comportamientos de la red:

  1. **Disk Cache**: Deshabilitar Disk Cache impide que el navegador almacene las páginas y sus recursos
     en caché mientras DevTools está abierto.
  2. **Network Throttling**: Permite simular conexiones de red lentas.
  3. **User Agent**: Permite anular una cadena de UA (User Agent)
     específica.

[nc]: /web/tools/chrome-devtools/network-performance/reference#network-conditions

## Limitaciones

Device Mode tiene algunas limitaciones.

* **Hardware del dispositivo**
    * El comportamiento de la GPU y la CPU no se emula.
* **IU del navegador**
    * Las pantallas del sistema, como la barra de direcciones, no se emulan.
    * Las pantallas nativas, por ejemplo, los elementos `<select>`, no se emulan como una lista modal.
    * Algunas mejoras, como las entradas de números para abrir un teclado numérico, pueden diferir respecto del comportamiento real del 
    dispositivo.
* **Funcionalidad del navegador**
    * WebGL funciona en el emulador, pero no es compatible con los dispositivos iOS 7.
    * MathML no se admite en Chrome, pero es compatible con los dispositivos iOS 7.
    * La [reproducción HLS](https://en.wikipedia.org/wiki/HTTP_Live_Streaming) (HTTP Live Streaming para 
		video) no se admite durante la emulación, pero es compatible de manera nativa en iOS y Android Chrome.
    * El [error de zoom de orientación de iOS 5](https://github.com/scottjehl/device-bugs/issues/2) no se 
		emula.
    * La propiedad de altura de línea de CSS funciona en el emulador, pero no es compatible con Opera Mini.
    * Los límites de las reglas de CSS, como las de 
		[Internet Explorer](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx), 
		no se emulan.
* **AppCache**
    * El emulador no anula el <abbr title="User Agent">UA</abbr> para 
		[archivos del manifiesto](https://code.google.com/p/chromium/issues/detail?id=334120) de AppCache ni para 
		[solicitudes de visualización de origen](https://code.google.com/p/chromium/issues/detail?id=119767).

Pese a estas limitaciones, Device Mode es lo suficientemente sólido para realizar la mayoría de las tareas. 
Cuando necesites probar en un dispositivo real, puedes usar la 
[depuración remota](/web/tools/chrome-devtools/debug/remote-debugging) 
para obtener más datos.

## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}
