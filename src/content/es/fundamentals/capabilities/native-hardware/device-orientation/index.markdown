---
title: "Orientación del dispositivo"
description: "Los eventos de movimiento y orientación del dispositivo proporcionan acceso al acelerómetro, el giroscopio y la brújula incorporados en los dispositivos móviles."
updated_on: 2014-10-21
translation_priority: 1
notes:
  not-stable:
    - "Tenga <b>mucho</b> cuidado si decide utilizar los eventos de movimiento u orientación del dispositivo.Desafortunadamente, no todos los navegadores utilizan el mismo sistema de coordenadas, y podrían informar diferentes valores en situaciones idénticas."
---
<p class="intro">
  Los eventos de movimiento y orientación del dispositivo proporcionan acceso al acelerómetro, el giroscopio y la brújula incorporados en los dispositivos móviles.
</p>

Estos eventos se pueden utilizar para diferentes fines; por ejemplo, en los juegos, para 
controlar la dirección del personaje o para determinar la altura 
a la que debe saltar. Si se los utiliza junto con la función de geolocalización, se puede crear un sistema de navegación 
paso a paso más preciso o proporcionar información sobre la ubicación de una tienda.

{% include shared/remember.liquid title="Warning" list=page.notes.not-stable %}

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

