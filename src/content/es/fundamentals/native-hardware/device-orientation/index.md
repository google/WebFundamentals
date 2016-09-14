project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Los eventos de movimiento y orientación del dispositivo proporcionan acceso al acelerómetro, el giroscopio y la brújula incorporados en los dispositivos móviles.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Orientación del dispositivo {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}


Los eventos de movimiento y orientación del dispositivo proporcionan acceso al acelerómetro, el giroscopio y la brújula incorporados en los dispositivos móviles.

Estos eventos se pueden utilizar para diferentes fines; por ejemplo, en los juegos, para 
controlar la dirección del personaje o para determinar la altura 
a la que debe saltar. Si se los utiliza junto con la función de geolocalización, se puede crear un sistema de navegación 
paso a paso más preciso o proporcionar información sobre la ubicación de una tienda.

<!-- TODO: Verify note type! -->
Note: Tenga <b>mucho</b> cuidado si decide utilizar los eventos de movimiento u orientación del dispositivo.Desafortunadamente, no todos los navegadores utilizan el mismo sistema de coordenadas, y podrían informar diferentes valores en situaciones idénticas.

## ¿Qué extremo se encuentra orientado hacia arriba?

Para poder utilizar los datos generados a través de los eventos de movimiento y de orientación del dispositivo,
es importante comprender los valores proporcionados.  

### Marco de coordenadas de la Tierra

El marco de coordenadas de la Tierra, que se describe mediante los valores `X`, `Y` y `Z`, se alinea 
según la gravedad y la orientación magnética estándar.

<ul>
  <li>
    <b>X:</b> representa la dirección de este a oeste (donde el este es positivo).
  </li>
    <li>
    <b>Y:</b> representa la dirección de norte a sur (donde el norte es positivo).
  </li>
    <li>
    <b>Z:</b> representa la dirección de arriba hacia abajo, en posición perpendicular al suelo
 (donde la dirección hacia arriba es positiva).
  </li>
</ul>

### Marco de coordenadas del dispositivo

El marco de coordenadas del dispositivo, que se describe mediante los valores `x`, `y` y `z`, se alinea
teniendo en cuenta el centro del dispositivo.

<img src="images/axes.png" alt=" Ilustración del marco de coordenadas del dispositivo">
<!-- Special thanks to Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy) 
  for his images which are in the public domain. -->

<ul>
  <li>
    <b>x:</b> en el plano de la pantalla, positivo hacia la derecha.
  </li>
    <li>
    <b>y:</b> en el plano de la pantalla, positivo hacia arriba.
  </li>
    <li>
    <b>z:</b> perpendicular a la pantalla o al teclado, positivo al
 alejarse.
  </li>
</ul>

En los teléfonos o las tablets, la orientación del dispositivo se basa en la 
orientación típica de la pantalla.  En cuanto a los teléfonos y tablets, se basa en el hecho de que el dispositivo
esté en modo retrato. En el caso de las computadoras portátiles o de escritorio, la orientación se 
considera en relación con el teclado.

### Datos de rotación

Los datos de rotación se proporcionan como [ángulos de Euler](http://en.wikipedia.org/wiki/Euler_angles),
que representan la cantidad de grados de diferencia entre el marco de coordenadas del dispositivo
y el marco de coordenadas de la Tierra.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--4-col">
    <img src="images/alpha.png"><br>
    <b>alpha:</b> valor de rotación en torno al eje z; es de 0&deg; cuando la parte superior del dispositivo
 apunta directamente hacia el norte.  A medida que el dispositivo se rota en sentido contrario a las agujas del reloj,
 el valor `alpha` aumenta.
  </div>
  <div class="mdl-cell mdl-cell--4-col">
    <img src="images/beta.png"><br>
    <b>beta:</b> valor de rotación en torno al eje x; es de 0&deg; cuando la partes superior e 
 inferior del dispositivo se encuentran a la misma distancia de la superficie de la Tierra. El valor
 aumenta a medida que la parte superior del dispositivo se apunta hacia la superficie de la Tierra.
  </div>
  <div class="mdl-cell mdl-cell--4-col">
    <img src="images/gamma.png"><br>
    <b>gamma:</b> valor de rotación en torno al eje y; es de 0&deg; cuando las partes izquierda y 
 derecha del dispositivo se encuentran a la misma distancia de la superficie de la Tierra.  El valor
 aumenta a medida que la parte derecha del dispositivo se apunta hacia la superficie de la tierra. 
  </div>
</div>



## Orientación del dispositivo 




En el evento de orientación del dispositivo, se proporcionan datos de la rotación, que incluyen cuánto se está inclinando el dispositivo de la parte frontal a la parte trasera y de lado a lado y, si el teléfono o la computadora portátil poseen una brújula, la dirección hacia la que está orientado el dispositivo.


### TL;DR {: .hide-from-toc }
- Utilícelo con moderación.
- Pruébelo para ver si es compatible.
- 'No actualice la IU en cada evento de orientación; en su lugar, realice la sincronización con <code>requestAnimationFrame</code>.'


### Cuándo se deben utilizar los eventos de orientación del dispositivo

Los eventos de orientación del dispositivo se pueden utilizar de diferentes maneras.  Por ejemplo:

<ul>
  <li>Actualizar un mapa mientras el usuario se desplaza</li>
  <li>Realizar pequeños ajustes en la IU; por ejemplo, agregar efectos de paralaje</li>
  <li>Si se lo combina con la función de geolocalización, se puede utilizar para la navegación paso a paso.</li>
</ul>

### Verificación de la compatibilidad y escucha de eventos

Para escuchar un `DeviceOrientationEvent`, primero, verifique si los eventos
son compatibles con el navegador.  Luego, coloque un agente de escucha en el objeto de `window` 
que escucha los eventos de `deviceorientation`. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/capabilities/native-hardware/device-orientation/_code/dev-orientation.html" region_tag="devori" lang=javascript %}
</pre>

### Manejo de los eventos de orientación del dispositivo

El evento de orientación del dispositivo se activa cuando se mueve el dispositivo o cuando se cambia su 
orientación.  Proporciona datos sobre la diferencia entre el dispositivo en 
la posición actual en relación con el <a href="index.html#earth-coordinate-frame">
marco de coordenadas de la Tierra</a>.

El evento generalmente proporciona tres propiedades: 
<a href="index.html#rotation-data">`alpha`</a>, 
<a href="index.html#rotation-data">`beta`</a> y 
<a href="index.html#rotation-data">`gamma`</a>.  En Mobile Safari, se proporciona un
parámetro adicional <a href="https://developer.apple.com/library/safari/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/DeviceOrientationEvent/DeviceOrientationEvent.html">`webkitCompassHeading`</a> con el título
Brújula.




## Movimiento del dispositivo 




A través de la función Movimiento del dispositivo se proporciona información sobre la fuerza de aceleración que se aplica al dispositivo en un momento determinado, y sobre la velocidad de rotación.


### TL;DR {: .hide-from-toc }
- Utilice la función Movimiento del dispositivo cuando necesite conocer el movimiento actual del dispositivo.
- La función <code>rotationRate</code> se muestra en &deg;/seg.
- Las funciones <code>acceleration</code> y <code>accelerationWithGravity</code> se muestran en m/seg<sup>2</sup>.
- Tenga en cuenta las diferencias entre las implementaciones del navegador.


### Cuándo se deben utilizar los eventos de movimiento del dispositivo

Los eventos de movimiento del dispositivo se pueden utilizar de diferentes maneras.  Por ejemplo:

<ul>
  <li>Un gesto de sacudida para actualizar los datos</li>
  <li>En los juegos, para hacer que los personajes salten o se muevan</li>
  <li>En aplicaciones relacionadas con la salud y el estado físico</li>
</ul>

### Verificación de la compatibilidad y escucha de eventos

Para escuchar instancias de `DeviceMotionEvent`, primero, verifique si los eventos
son compatibles con el navegador.  Luego, coloque un agente de escucha en el objeto de `window` 
que escucha los eventos de `devicemotion`. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/capabilities/native-hardware/device-orientation/_code/jump-test.html" region_tag="devmot" lang=javascript %}
</pre>

### Manejo de los eventos de movimiento del dispositivo

El evento de movimiento del dispositivo se activa a intervalos regulares y proporciona datos sobre la
rotación (en &deg; por segundo) y la aceleración (en m por segundo<sup>2</sup>)
del dispositivo, en ese momento específico.  Algunos dispositivos no cuentan con el hardware
para excluir el efecto de la gravedad.

El evento proporciona cuatro propiedades: 
<a href="index.html#device-frame-coordinate">`accelerationIncludingGravity`</a>, 
<a href="index.html#device-frame-coordinate">`acceleration`</a> 
(que excluye los efectos de la gravedad), 
<a href="index.html#rotation-data">`rotationRate`</a> y `interval`.

Por ejemplo, miremos el teléfono apoyado sobre una mesa plana,
con la pantalla hacia arriba.

<table class="mdl-data-table mdl-js-data-table">
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
      <td data-th="State">Con movimiento hacia arriba</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 5]</td>
      <td data-th="Acceleration with gravity">[0, 0, 14,81]</td>
    </tr>
    <tr>
      <td data-th="State">Con movimiento solo hacia la derecha</td>
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

Por el contrario, si el teléfono se colocara con la pantalla en posición perpendicular al
piso, y el espectador lo pudiera visualizar directamente:

<table class="mdl-data-table mdl-js-data-table">
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
      <td data-th="State">Con movimiento hacia arriba</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 5, 0]</td>
      <td data-th="Acceleration with gravity">[0, 14,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Con movimiento solo hacia la derecha</td>
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

#### Ejemplo: cómo calcular la aceleración máxima de un objeto

Una forma de utilizar los eventos de movimiento del dispositivo consiste en calcular la aceleración máxima
de un objeto.  Por ejemplo, cuál es la aceleración máxima de una persona 
que está saltando.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/capabilities/native-hardware/device-orientation/_code/jump-test.html" region_tag="devmothand" lang=javascript %}
</pre>

Luego de presionar el botón Go!, se le indica al usuario que salte.  Durante ese tiempo,
en la página se almacenan los valores de aceleración máximos (y mínimos) y, luego del
salto, se le informa al usuario su aceleración máxima.

