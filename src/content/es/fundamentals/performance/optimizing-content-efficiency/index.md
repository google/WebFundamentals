project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La cantidad de datos que descargan las apps continúa aumentando con el tiempo. Para proporcionar un excelente rendimiento, debes optimizar la entrega de datos tanto como sea posible.


{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Optimización del ahorro de contenido {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Nuestras aplicaciones web continúan creciendo en términos de alcance, ambición y funcionalidad, y eso es bueno. No obstante, la implacable marcha hacia una Web más dinámica está impulsando otra tendencia: la cantidad de datos que descarga cada app continúa aumentando a un ritmo sostenido. Para ofrecer un excelente rendimiento, debemos optimizar la entrega de cada byte.

¿Qué aspecto tiene una app web moderna? [HTTP Archive](http://httparchive.org/){: .external } nos puede ayudar a responder esta pregunta. En el proyecto se realiza un seguimiento de la forma en que está constituida la Web mediante el rastreo periódico de los sitios más populares (más de 300 000 en la lista del millón de sitios principales de Alexa), el registro y la adición de análisis sobre la cantidad de recursos, los tipos de contenido y otros metadatos para cada destino individual.

<img src="images/http-archive-trends.png"  alt="Tendencias de HTTP Archive">

<table class="">
<colgroup><col span="1"><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th></th>
    <th>Percentil 50</th>
    <th>Percentil 75</th>
    <th>Percentil 90</th>
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
  <td data-th="90%"><strong>3486 KB</strong></td>
</tr>
</table>

Los datos anteriores capturan la tendencia de aumento de la cantidad de bytes descargados para destinos populares en la Web entre enero de 2013 y enero de 2014. Por supuesto, no todos los sitios crecen en la misma proporción ni requieren la misma cantidad de datos, y por ello resaltamos los diferentes cuantiles dentro de la distribución: 50 (promedio), 75 y 90.

Un sitio promedio a principios de 2014 estaba compuesto por 75 solicitudes que sumaban 1054 KB de bytes transferidos totales, y la cantidad total de bytes (y solicitudes) aumentó a un ritmo constante durante todo el año anterior. Esto no debería sorprendernos, aunque conlleva consecuencias de rendimiento importantes: efectivamente, la velocidad de Internet aumenta, pero esto tiene lugar en diferentes proporciones en los distintos países, y muchos usuarios aún están sujetos a límites de datos y planes limitados costosos; en especial, los usuarios de dispositivos móviles.

A diferencia de lo que sucede en los equipos de escritorio, las aplicaciones web no requieren un proceso de instalación independiente. Se introduce la URL y eso es todo. Esta es una función clave de la Web. No obstante, para que esto ocurra **a menudo necesitamos obtener docenas, y a veces cientos, de recursos diferentes que pueden aumentar los megabytes de datos y deben combinarse en cientos de milisegundos para ofrecer la experiencia web que buscamos.**

Lograr una experiencia web instantánea en vista de estos requisitos no es un tema menor y por ello es fundamental optimizar la eficacia del contenido: eliminar descargas innecesarias, optimizar la codificación de transferencia de cada recurso mediante diferentes técnicas de compresión y aprovechar el almacenamiento en caché, siempre que sea posible, para eliminar descargas redundantes.


{# wf_devsite_translation #}
