project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Los eventos de movimiento y orientación del dispositivo proporcionan acceso al acelerómetro, el giroscopio y la brújula incorporados en los dispositivos móviles.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-06-17 #}

# Movimiento y orientación del dispositivo {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Los eventos de movimiento y orientación del dispositivo proporcionan acceso al acelerómetro, el giroscopio y la brújula incorporados
en los dispositivos móviles.

Estos eventos se pueden utilizar para diferentes fines; por ejemplo, en los juegos, para controlar
la dirección o acción del personaje. Si se los usa junto con la ubicación geográfica, se puede
crear una navegación paso a paso más precisa o proporcionar información sobre
una ubicación específica.

Warning: No todos los navegadores usan el mismo sistema de coordenadas, y podrían informar diferentes valores en situaciones idénticas. Esto ha mejorado con el tiempo, pero asegúrate de probar tu situación.

### TL;DR {: .hide-from-toc }

* Detecta qué lado del dispositivo se encuentra orientado hacia arriba y cómo rota el mismo.
* Obtén más información sobre cómo y cuándo responder a los eventos de movimiento y orientación.


## ¿Qué extremo está orientado hacia arriba?

Para poder utilizar los datos generados a través de los eventos de movimiento y de orientación del dispositivo,
es importante comprender los valores proporcionados.  

### Marco de coordenadas de la Tierra

El marco de coordenadas de la Tierra, que se describe mediante los valores `X`, `Y` y `Z`, se alinea
según la gravedad y la orientación magnética estándar.

<table class="responsive">
<tr><th colspan="2">Sistema de coordenadas</th></tr>
<tr>
  <td><code>X</code></td>
  <td>Representa la dirección de este a oeste (donde el este es positivo).</td>
</tr>
<tr>
  <td><code>Y</code></td>
  <td>Representa la dirección de norte a sur (donde el norte es positivo).</td>
</tr>
<tr>
  <td><code>Z</code></td>
  <td>Z: representa la dirección de arriba hacia abajo, en posición perpendicular al suelo
      (donde la dirección hacia arriba es positiva).
  </td>
</tr>
</table>

### Marco de coordenadas del dispositivo

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/axes.png" alt="Ilustración del marco de coordenadas del dispositivo">
    <figcaption>
       Ilustración del marco de coordenadas del dispositivo
    </figcaption>
  </figure>
</div>

<!-- Special thanks to Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy)
  for his images which are in the public domain. -->

El marco de coordenadas del dispositivo, que se describe mediante los valores `x`, `y` y `z`, se alinea
teniendo en cuenta el centro del dispositivo.

<table class="responsive">
<tr><th colspan="2">Sistema de coordenadas</th></tr>
<tr>
  <td><code>X</code></td>
  <td>En el plano de la pantalla, positivo hacia la derecha.</td>
</tr>
<tr>
  <td><code>Y</code></td>
  <td>En el plano de la pantalla, positivo hacia arriba.</td>
</tr>
<tr>
  <td><code>Z</code></td>
  <td>Perpendicular a la pantalla o al teclado, positivo al
    alejarse.
  </td>
</tr>
</table>

En un teléfono o una tablet, la orientación del dispositivo se basa en la orientación
típica de la pantalla. Para teléfonos y tablets, se basa en el posicionamiento del dispositivo
en el modo vertical. En el caso de las computadoras de escritorio o las laptops, la orientación se
considera en relación con el teclado.

### Datos de rotación

Los datos de rotación se proporcionan como [ángulos de Euler](https://en.wikipedia.org/wiki/Euler_angles),
que representan la cantidad de grados de diferencia entre el marco de coordenadas del dispositivo
y el marco de coordenadas de la Tierra.

#### Alpha

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/alpha.png" alt="Ilustración del marco de coordenadas del dispositivo">
    <figcaption>
      Ilustración de alfa en el marco de coordenadas del dispositivo
    </figcaption>
  </figure>
</div>

La rotación alrededor del eje z. El valor de `alpha` es de 0&deg; cuando la parte superior del dispositivo
apunta directamente hacia el norte. A medida que el dispositivo se rota en sentido contrario a las agujas del reloj,
el valor `alpha` aumenta.

<div style="clear:both;"></div>

#### Beta

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/beta.png" alt="Ilustración del marco de coordenadas del dispositivo">
    <figcaption>
      Ilustración de beta en el marco de coordenadas del dispositivo
    </figcaption>
  </figure>
</div>

La rotación alrededor del eje x. El valor de `beta` es de 0&deg; cuando la partes superior e
inferior del dispositivo se encuentran a la misma distancia de la superficie de la Tierra. El valor
aumenta a medida que la parte superior del dispositivo se apunta hacia la superficie de la Tierra.

<div style="clear:both;"></div>

#### Gamma

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/gamma.png" alt="Ilustración del marco de coordenadas del dispositivo">
    <figcaption>
      Ilustración de gamma en el marco de coordenadas del dispositivo
    </figcaption>
  </figure>
</div>

La rotación alrededor del eje y. El valor de `gamma` es de 0&deg; cuando los bordes izquierdos y
derechos del dispositivo se encuentran a la misma distancia de la superficie de la Tierra.  El valor
aumenta a medida que la parte derecha del dispositivo se apunta hacia la superficie de la Tierra.

<div style="clear:both;"></div>

## Orientación del dispositivo

En el evento de orientación del dispositivo, se proporcionan datos de la rotación, que incluyen cuánto
se está inclinando el dispositivo de la parte frontal a la parte trasera y de lado a lado y, si el teléfono o la computadora portátil
poseen una brújula, la dirección hacia la que está orientado el dispositivo.

Úsalo con moderación.
Pruébalo para ver si es compatible.
No actualice la IU en cada evento de orientación; en su lugar, realice la sincronización con `requestAnimationFrame`.

### Cuándo usar eventos de orientación del dispositivo

Los eventos de orientación del dispositivo se pueden utilizar de varias maneras. Algunos ejemplos son los siguientes:

* Actualización de un mapa mientras el usuario se desplaza.
* Realizar pequeños ajustes en la IU; por ejemplo, agregar efectos de paralaje.
* Combinado con la ubicación geográfica, se puede usar para la navegación paso a paso.

### Verifica la compatibilidad y detecta eventos

Para escuchar un `DeviceOrientationEvent`, primero, verifica si el navegador es compatible con los eventos. Luego, adjunta un receptor de eventos al objeto `window` que recibe eventos `deviceorientation`. 

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', deviceOrientationHandler, false);
      document.getElementById("doeSupported").innerText = "Supported!";
    }

### Controla los eventos de orientación del dispositivo

El evento de orientación del dispositivo se activa cuando se mueve el dispositivo o cuando se cambia su 
orientación. Muestra datos sobre la diferencia entre el dispositivo en 
la posición actual en relación con el 
[Marco de coordenadas de la Tierra](#earth-coordinate-frame).

El evento generalmente muestra tres propiedades: [`alpha`](#alpha), 
[`beta`](#beta) y [`gamma`](#gamma). En Mobile Safari, se muestra un parámetro adicional
[`webkitCompassHeading`](https://developer.apple.com/library/ios/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/){: .external }
con la orientación según la brújula.

## Movimiento del dispositivo 

En el evento de orientación del dispositivo, se proporcionan datos de la rotación, que incluyen cuánto
se está inclinando el dispositivo de la parte frontal a la parte trasera y de lado a lado y, si el teléfono o la computadora portátil
poseen una brújula, la dirección hacia la que está orientado el dispositivo.

Usa la función movimiento del dispositivo cuando necesite conocer el movimiento actual del dispositivo.
`rotationRate` se proporciona en &deg;/seg.
`acceleration` y `accelerationWithGravity` se proporcionan en m/seg<sup>2</sup>.
Ten en cuenta las diferencias entre las implementaciones del navegador.

### Cuándo usar eventos de movimiento del dispositivo

Los eventos de movimiento del dispositivo se pueden usar de diferentes maneras. Algunos ejemplos son los siguientes:

* Para actualizar los datos con gestos de sacudida.
* En los juegos, para hacer que los personajes salten o se muevan.
* En apps relacionadas con la salud y el estado físico.


### Verifica la compatibilidad y detecta eventos

Para escuchar un `DeviceMotionEvent`, primero, verifica si los eventos
son compatibles con el navegador.  Luego, coloca un agente de escucha en el objeto de `window` 
que escucha los eventos de `devicemotion`. 

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', deviceMotionHandler);
      setTimeout(stopJump, 3*1000);
    }

### Controla los eventos de movimiento del dispositivo

El evento de movimiento del dispositivo se activa a intervalos regulares y proporciona datos sobre la
rotación (en &deg; por segundo) y la aceleración (en m por segundo<sup>2</sup>)
del dispositivo, en ese momento específico. Algunos dispositivos no cuentan con el hardware necesario
para excluir el efecto de la gravedad.

El evento muestra cuatro propiedades, 
[`accelerationIncludingGravity`](#device-coordinate-frame), 
[`acceleration`](#device-coordinate-frame), que excluye los efectos de la
gravedad, [`rotationRate`](#rotation-data) y `interval`.

Por ejemplo, miremos el teléfono apoyado sobre una mesa plana, con la
pantalla hacia arriba.

<table>
  <thead>
    <tr>
      <th data-th="State">Estado</th>
      <th data-th="Rotation">Rotación</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">Aceleración (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">Aceleración con gravedad (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">Sin movimiento</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 0, 9,8]</td>
    </tr>
    <tr>
      <td data-th="State">Con movimiento hacia arriba, en dirección al cielo</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 5]</td>
      <td data-th="Acceleration with gravity">[0, 0, 14,81]</td>
    </tr>
    <tr>
      <td data-th="State">Con movimiento únicamente hacia la derecha</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 0, 9,81]</td>
    </tr>
    <tr>
      <td data-th="State">Con movimiento hacia arriba y hacia la derecha</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 0, 5]</td>
      <td data-th="Acceleration with gravity">[5, 0, 14,81]</td>
    </tr>
  </tbody>
</table>

Por el contrario, si el teléfono se coloca con la pantalla en posición perpendicular respecto del
suelo y el observador puede visualizarlo directamente:

<table>
  <thead>
    <tr>
      <th data-th="State">Estado</th>
      <th data-th="Rotation">Rotación</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">Aceleración (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">Aceleración con gravedad (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">Sin movimiento</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 9,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Con movimiento hacia arriba, en dirección al cielo</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 5, 0]</td>
      <td data-th="Acceleration with gravity">[0, 14,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Con movimiento únicamente hacia la derecha</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 9,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Con movimiento hacia arriba y hacia la derecha</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 5, 0]</td>
      <td data-th="Acceleration with gravity">[5, 14,81, 0]</td>
    </tr>
  </tbody>
</table>

### Ejemplo: cómo calcular la aceleración máxima de un objeto

Una forma de usar los eventos de movimiento del dispositivo consiste en calcular la aceleración máxima
de un objeto. Por ejemplo, cuál es la aceleración máxima de una persona 
que está saltando.

    if (evt.acceleration.x > jumpMax.x) {
      jumpMax.x = evt.acceleration.x;
    }
    if (evt.acceleration.y > jumpMax.y) {
      jumpMax.y = evt.acceleration.y;
    }
    if (evt.acceleration.z > jumpMax.z) {
      jumpMax.z = evt.acceleration.z;
    }


Luego de presionar el botón Go!, se le indica al usuario que salte. Durante ese tiempo,
en la página se almacenan los valores de aceleración máximos (y mínimos) y, luego del
salto, se informa al usuario su aceleración máxima.


{# wf_devsite_translation #}
