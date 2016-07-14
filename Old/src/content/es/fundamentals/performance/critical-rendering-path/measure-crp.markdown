---
title: "Medir la ruta de renderización importante con el tiempo de navegación"
description: "No es posible optimizar lo que no podemos medir. Afortunadamente, el API de Navigation Timing proporciona las herramientas necesarias para medir cada paso de la ruta de renderización importante."
updated_on: 2014-09-18
key-takeaways:
  measure-crp:
    - "El tiempo de navegación proporciona marcas de tiempo de alta resolución para medir la ruta de renderización importante."
    - "El navegador emite una serie de eventos consumibles que capturan varias etapas de la ruta de renderización importante."
---
<p class="intro">
  No es posible optimizar lo que no podemos medir. Afortunadamente, el API de Navigation Timing proporciona las herramientas necesarias para medir cada paso de la ruta de renderización importante.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.measure-crp %}

El secreto de una estrategia de rendimiento eficaz es una buena medición y una buena instrumentación. Y esto es justo lo que proporciona el API de Navigation Timing.

<img src="images/dom-navtiming.png" class="center" alt="Tiempo de navegación">

Cada etiqueta del diagrama anterior se corresponde con una marca de tiempo de alta resolución que rastrea el navegador cada vez que carga una página. De hecho, en este caso concreto, solo vemos una parte de todas las marcas de tiempo diferentes. De momento, dejaremos de lado las marcas de tiempo relacionadas con la red, pero volveremos a ellas en una próxima lección.

Entonces, ¿qué significan estas marcas de tiempo?

* **domLoading:** es la marca de tiempo inicial de todo el proceso. El navegador está a punto de empezar a procesar los primeros bytes del
  documento HTML.
* **domInteractive:** marca el tiempo en el que el navegador acaba de procesar todo el código HTML y finaliza la construcción del DOM.
* **domContentLoaded:** indica el punto en que el DOM está listo y no hay hojas de estilos que impidan la ejecución del código JavaScript. Por lo tanto, ya podemos (en teoría) construir el árbol de visualización.
    * Muchos entornos JavaScript esperan este evento antes de empezar a ejecutar su propia lógica. Por este motivo, el navegador recibe las marcas de tiempo `_EventStart_` y `_EventEnd_`, con el fin de que podamos realizar un seguimiento de la duración de esta ejecución.
* **domComplete:** como el nombre indica, todo el proceso ha finalizado, y todos los recursos de la página(imágenes, etc.) se han descargado (el selector de carga se ha detenido).
* **loadEvent:** como último paso en cada carga de página, el navegador activa un evento `onload` que a su vez puede activar una lógica de aplicación adicional.

La especificación HTML requiere condiciones específicas para cada evento: cuándo debe activarse, qué condiciones debe cumplir, etc. Teniendo en cuenta nuestro fin, nos centraremos en unos cuantos objetivos relacionados con la ruta de renderización importante:

* **domInteractive** indica cuándo está listo el DOM.
* **domContentLoaded** indica normalmente cuándo [están listos el DOM y el CSSOM](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/).
    * Si ningún analizador bloquea el código JavaScript , `_DOMContentLoaded_` se activará justo después de `_domInteractive_`.
* **domComplete** indica cuándo están listos la página y todos sus recursos.

^

{% include_code src=_code/measure_crp.html snippet=full lang=html %}

El ejemplo anterior puede resultar algo complejo a primera vista, pero en realidad es muy simple. El API de Navigation Timing detecta todas las marcas de tiempo relevantes, y nuestro código tan solo espera a que se active el evento `onload` (que se activa después de `domInteractive`, `domContentLoaded` y `domComplete`) y calcula la diferencia entre las distintas marcas de tiempo.
<img src="images/device-navtiming-small.png" class="center" alt="Demostración de NavTiming">

Ahora ya tenemos unas metas específicas de las que realizar un seguimiento, y una función simple para dar salida a estas mediciones. Ten en cuenta que, en lugar de imprimir estas métricas en la página, también puedes modificar el código para enviarlas a un servidor de analítica web ([Google Analytics lo hace automáticamente](https://support.google.com/analytics/answer/1205784?hl=es)), que es lo ideal para estar al tanto del rendimiento de tus páginas e identificar cuáles deberían optimizarse.



