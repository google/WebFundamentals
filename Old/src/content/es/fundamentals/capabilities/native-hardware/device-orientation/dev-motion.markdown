---
title: "Movimiento del dispositivo"
description: "A través de la función Movimiento del dispositivo se proporciona información sobre la fuerza de aceleración que se aplica al dispositivo en un momento determinado, y sobre la velocidad de rotación."
updated_on: 2014-10-21
translation_priority: 1
key-takeaways:
  devmotion: 
    - "Utilice la función Movimiento del dispositivo cuando necesite conocer el movimiento actual del dispositivo."
    - "La función <code>rotationRate</code> se muestra en &deg;/seg."
    - "Las funciones <code>acceleration</code> y <code>accelerationWithGravity</code> se muestran en m/seg<sup>2</sup>."
    - "Tenga en cuenta las diferencias entre las implementaciones del navegador."
---

<p class="intro">
  A través de la función Movimiento del dispositivo se proporciona información sobre la fuerza de aceleración que se aplica al dispositivo en un momento determinado, y sobre la velocidad de rotación.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.devmotion %}

## Cuándo se deben utilizar los eventos de movimiento del dispositivo

Los eventos de movimiento del dispositivo se pueden utilizar de diferentes maneras.  Por ejemplo:

<ul>
  <li>Un gesto de sacudida para actualizar los datos</li>
  <li>En los juegos, para hacer que los personajes salten o se muevan</li>
  <li>En aplicaciones relacionadas con la salud y el estado físico</li>
</ul>

## Verificación de la compatibilidad y escucha de eventos

Para escuchar instancias de `DeviceMotionEvent`, primero, verifique si los eventos
son compatibles con el navegador.  Luego, coloque un agente de escucha en el objeto de `window` 
que escucha los eventos de `devicemotion`. 

{% include_code src=_code/jump-test.html snippet=devmot lang=javascript %}

## Manejo de los eventos de movimiento del dispositivo

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

### Ejemplo: cómo calcular la aceleración máxima de un objeto

Una forma de utilizar los eventos de movimiento del dispositivo consiste en calcular la aceleración máxima
de un objeto.  Por ejemplo, cuál es la aceleración máxima de una persona 
que está saltando.

{% include_code src=_code/jump-test.html snippet=devmothand lang=javascript %}

Luego de presionar el botón Go!, se le indica al usuario que salte.  Durante ese tiempo,
en la página se almacenan los valores de aceleración máximos (y mínimos) y, luego del
salto, se le informa al usuario su aceleración máxima.

