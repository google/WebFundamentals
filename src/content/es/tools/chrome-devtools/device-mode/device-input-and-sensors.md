project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Las pantallas táctiles, los chips de GPS y los acelerómetros pueden ser difíciles de probar ya que la mayoría de las computadoras de escritorio no los tienen. Los emuladores de sensores de Chrome DevTools reducen la sobrecarga de la prueba al emular los sensores de dispositivos móviles comunes.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Emulación de sensores: Ubicación geográfica y acelerómetro {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Los chips de GPS y los acelerómetros pueden ser difíciles de probar, ya que la mayoría de las computadoras de escritorio no los tienen. El panel de emulación de sensores de Chrome DevTools reduce la sobrecarga de la prueba emulando los sensores de dispositivos móviles comunes.


### TL;DR {: .hide-from-toc }
- Emula coordenadas de ubicación geográfica para probar las anulaciones de ubicación geográfica.
- Simula la orientación del dispositivo para probar los datos del acelerómetro.


## Acceso a los controles de los sensores

<div class="wf-devtools-flex">
  <div>
    <p>Para acceder a los controles de los sensores de Chrome DevTools:</p>
    <ol>
      <li>Abre el menú principal de DevTools, luego</li>
      <li>en <strong>More Tools</strong>, haz clic en <strong>Sensors</strong></li>
    </ol>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/navigate-to-sensors.png" alt="Navega hasta el panel Sensors">
  </div>
</div>

Note: Si tu app detecta sensores en carga mediante JavaScript (como Modernizr), asegúrate de volver a cargar la página luego de habilitar los emuladores del sensor.

## Anulación de datos de ubicación geográfica

A diferencia de las computadoras de escritorio, los dispositivos móviles por lo general utilizan hardware de GPS para detectar la ubicación. En el panel Sensors, puedes emular coordenadas de ubicación geográfica para usarlas con la <a href='http://www.w3.org/TR/geolocation-API/'>Geolocation API</a>.

<div class="wf-devtools-flex">
  <div>
    <p>Habilita la emulación de ubicación geográfica seleccionando la casilla de verificación <strong>Emulate geolocation coordinates</strong> en el panel sensors del panel lateral de emulación.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-geolocation.png" alt="emulador de ubicación geográfica habilitado">
  </div>
</div>

Puedes usar este emulador a fin de anular los valores de posición para `navigator.geolocation`, así como también simular casos cuando los datos de ubicación geográfica no están disponibles.

## Emulación de acelerómetro (Orientación del dispositivo)

<div class="wf-devtools-flex">
  <div>
    <p>Para probar los datos del acelerómetro provenientes de la <a href='http://www.w3.org/TR/screen-orientation/'>Orientation API </a>, habilita el emulador del acelerómetro seleccionando la casilla de verificación <strong>Accelerometer</strong> en el panel Sensors.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-accelerometer.png" alt="Control del acelerómetro">
  </div>
</div>

Puedes manipular los siguientes parámetros de orientación:

<dl>
<dt><abbr title="alpha">α</abbr></dt>
<dd>Rotación alrededor del eje z.</dd>
<dt><abbr title="beta">β</abbr></dt>
<dd>Inclinación de izquierda a derecha.</dd>
<dt><abbr title="gamma">γ</abbr></dt>
<dd>Inclinación de adelante hacia atrás.</dd>
</dl>

También puedes hacer clic en el acelerómetro de modelo y arrastrarlo hasta la orientación deseada.

Prueba el emulador de acelerómetro usando esta [demostración de orientación de dispositivo](http://googlesamples.github.io/web-fundamentals/fundamentals/native-hardware/device-orientation/dev-orientation.html).




{# wf_devsite_translation #}
