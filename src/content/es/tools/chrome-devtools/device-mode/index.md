project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Usa dispositivos virtuales en Device Mode de Chrome para compilar sitios web que prioricen los dispositivos móviles.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Simular dispositivos móviles con Device Mode {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

Usa Device Mode de Chrome DevTools para compilar sitios web completamente adaptables y que prioricen los dispositivos móviles. Aprende a usar esta opción para simular una amplia variedad de dispositivos y sus capacidades.

Warning: Device Mode proporciona una aproximación sobre cómo se verá tu sitio
en un dispositivo móvil; pero, para conocer plenamente su apariencia, siempre debes
probar tu sitio en dispositivos reales. DevTools no puede emular las características de
desempeño de los dispositivos móviles, por ejemplo.


## En resumen

* Emula tu sitio en [pantallas de diferentes tamaños y resoluciones](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports), incluidas pantallas con tecnología Retina.
* Realiza diseños adaptables visualizando e [inspeccionando consultas de medios de CSS](/web/tools/chrome-devtools/iterate/device-mode/media-queries).
* Evalúa el rendimiento del sitio con el [emulador de red](/web/tools/chrome-devtools/network-performance/network-conditions), sin afectar el tráfico a otras pestañas.
* [Simula con precisión las entradas del dispositivo](/web/tools/chrome-devtools/device-mode/device-input-and-sensors) para los eventos táctiles, ubicación geográfica y orientación del dispositivo.

## Activar o desactivar Device Mode {: #toggle }

Activa o desactiva el botón **Device Mode** para activar o desactivar Device Mode.

![Comienzo inicial de Device Mode](imgs/device-mode-initial-view.png)

Cuando Device Mode está activado, el ícono se torna azul
(![Device Mode activado](imgs/device-mode-on.png)).

Cuando está desactivado, el ícono se torna gris
(![Device Mode desactivado](imgs/device-mode-off.png)).

Device Mode está inhabilitado de manera predeterminada. 

Puedes activar o desactivar Device Mode presionando
<kbd>Command</kbd>+<kbd>Mayús</kbd>+<kbd>M</kbd> (Mac) o
<kbd>Ctrl</kbd>+<kbd>Mayús</kbd>+<kbd>M</kbd> (Windows, Linux).
Para usar esta combinación de teclas, el mouse debe estar en la ventana de DevTools.
Si apunta a la ventana de visualización, activarás la [combinación de teclas para cambiar de usuario de
Chrome](https://support.google.com/chrome/answer/157179).





{# wf_devsite_translation #}
