---
title: "Optimizar la eficacia del contenido"
description: "La cantidad de datos descargados por cada aplicación va en aumento. Para ofrecer un buen rendimiento, debemos optimizar el envío de cada byte."
updated_on: 2014-04-29
---

<p class="intro">
  Las aplicaciones web siguen creciendo en posibilidades, ambición y funcionalidad, lo cual es positivo. Sin embargo, el incesante avance hacia una web más completa genera otra tendencia: la cantidad de datos descargados por cada aplicación va en aumento a un ritmo constante. Para ofrecer un buen rendimiento, debemos optimizar el envío de cada byte de datos.
</p>


¿Qué aspecto tiene una aplicación web actual? [HTTP Archive](http://httparchive.org/) puede ayudarnos a responder a esa pregunta. El proyecto realiza un seguimiento de cómo se crea la Web rastreando de forma periódica los sitios más populares (más de 300.000 incluidos en la lista del millón de sitios más populares de Alexa), registrando y usando analítica web para medir el número de recursos, los tipos de contenido y otros metadatos en cada sitio.

<img src="images/http-archive-trends.png" class="center" alt="Tendencias en HTTP Archive">

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th></th>
    <th>Percentil 50º</th>
    <th>percentil núm. 75</th>
    <th>percentil núm. 90</th>
  </tr>
</thead>
<tr>
  <td data-th="type">HTML</td>
  <td data-th="50%">13 KB</td>
  <td data-th="75%">26 KB</td>
  <td data-th="90%">54 KB</td>
</tr>
<tr>
  <td data-th="type">Imágenes</td>
  <td data-th="50%">528 KB</td>
  <td data-th="75%">1213 KB</td>
  <td data-th="90%">2384 KB</td>
</tr>
<tr>
  <td data-th="type">JavaScript</td>
  <td data-th="50%">207 KB</td>
  <td data-th="75%">385 KB</td>
  <td data-th="90%">587 KB</td>
</tr>
<tr>
  <td data-th="type">CSS</td>
  <td data-th="50%">24 KB</td>
  <td data-th="75%">53 KB</td>
  <td data-th="90%">108 KB</td>
</tr>
<tr>
  <td data-th="type">Otros</td>
  <td data-th="50%">282 KB</td>
  <td data-th="75%">308 KB</td>
  <td data-th="90%">353 KB</td>
</tr>
<tr>
  <td data-th="type"><strong>Total</strong></td>
  <td data-th="50%"><strong>1054 KB</strong></td>
  <td data-th="75%"><strong>1985 KB</strong></td>
  <td data-th="90%"><strong>3486 B</strong></td>
</tr>
</table>

Los datos anteriores reflejan la tendencia de crecimiento en el número de bytes descargados en sitios populares de la Web entre enero de 2013 y enero de 2014. Por supuesto, no todos los sitios crecen al mismo ritmo o requieren la misma cantidad de datos, por eso destacamos los diferentes cuantiles en la distribución: el 50º (mediana), el 75º y el 90º.

A principios del 2014, cualquier sitio de la mediana se componía de 75 solicitudes que sumaban 1054 KB de bytes transferidos totales, y el número total de bytes (y de solicitudes) ha crecido a un ritmo constante a lo largo del año anterior. Esto no debería sorprendernos, pero conlleva implicaciones importantes relacionadas con el rendimiento. Sí, la velocidad de Internet es cada vez mayor, pero a ritmos diferentes en distintos países. Muchos usuarios aún están sujetos a limitaciones de datos y planes costosos en los que se mide el consumo de datos, sobre todo en móviles.

A diferencia de los ordenadores, las aplicaciones web no requieren un proceso de instalación distinto: introduces la URL y ya estás en la página. Es una de las características fundamentales de la Web. Sin embargo, para que esto sea así **a menudo debemos usar decenas, y a veces cientos, de recursos distintos que se suman a los megabytes de datos consumidos y que deben combinarse en cientos de milisegundos para facilitar la experiencia web inmediata que buscamos.**

Ofrecer una experiencia inmediata teniendo en cuenta estos requisitos no es tarea fácil, por lo que es importante optimizar la eficacia del contenido. Para ello, hay que eliminar descargas innecesarias, optimizar la codificación de cada recurso mediante varias técnicas de compresión y usar el almacenamiento en caché siempre que sea posible para evitar descargas redundantes.


