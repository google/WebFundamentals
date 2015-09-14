---
title: "Orientación del dispositivo"
description: "En el evento de orientación del dispositivo, se proporcionan datos de la rotación, que incluyen cuánto se está inclinando el dispositivo de la parte frontal a la parte trasera y de lado a lado y, si el teléfono o la computadora portátil poseen una brújula, la dirección hacia la que está orientado el dispositivo."
updated_on: 2014-10-21
translation_priority: 1
key-takeaways:
  devorientation: 
    - "Utilícelo con moderación."
    - "Pruébelo para ver si es compatible."
    - "No actualice la IU en cada evento de orientación; en su lugar, realice la sincronización con <code>requestAnimationFrame</code>."
---

<p class="intro">
  En el evento de orientación del dispositivo, se proporcionan datos de la rotación, que incluyen cuánto se está inclinando el dispositivo de la parte frontal a la parte trasera y de lado a lado y, si el teléfono o la computadora portátil poseen una brújula, la dirección hacia la que está orientado el dispositivo.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.devorientation %}

## Cuándo se deben utilizar los eventos de orientación del dispositivo

Los eventos de orientación del dispositivo se pueden utilizar de diferentes maneras.  Por ejemplo:

<ul>
  <li>Actualizar un mapa mientras el usuario se desplaza</li>
  <li>Realizar pequeños ajustes en la IU; por ejemplo, agregar efectos de paralaje</li>
  <li>Si se lo combina con la función de geolocalización, se puede utilizar para la navegación paso a paso.</li>
</ul>

## Verificación de la compatibilidad y escucha de eventos

Para escuchar un `DeviceOrientationEvent`, primero, verifique si los eventos
son compatibles con el navegador.  Luego, coloque un agente de escucha en el objeto de `window` 
que escucha los eventos de `deviceorientation`. 

{% include_code src=_code/dev-orientation.html snippet=devori lang=javascript %}

## Manejo de los eventos de orientación del dispositivo

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


