project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La mejora del rendimiento comienza minimizando o, al menos, optimizando los datos que los usuarios descargan. Comprender cómo un navegador representa esos recursos es un requisito previo para mejorar la eficiencia del código. Después de mejorarlo, necesitas probarlo. 

{# wf_updated_on: 2016-09-09 #}
{# wf_published_on: 2015-09-08 #}

# Rendimiento {: .page-title }

La mejora del rendimiento es un proceso que comienza con la minimización o, al menos, la optimización de los datos que los usuarios descargan. Comprender cómo un navegador representa esos recursos es un requisito previo para mejorar la eficiencia del código. Después de mejorarlo, necesitas probarlo. 

## Optimización del ahorro de contenido

<img src="images/oce.png" class="attempt-right" style="max-height: 200px;">

Para ofrecer un excelente rendimiento, debes optimizar la entrega de cada byte de tu sitio.

[Comencemos](optimizing-content-efficiency/)

<div style="clear:both;"></div>

## Ruta de acceso de representación crítica

<img src="images/crp.png" class="attempt-right">

¿Comprendes qué sucede en los pasos entre la recepción de HTML, CSS y JavaScript, y el procesamiento para convertirlos en píxeles representados?

[Más información](critical-rendering-path/)

<div style="clear:both;"></div>

## Rendimiento de la representación

<img src="images/rend.png" class="attempt-right">

Para escribir sitios y apps de alto rendimiento, debes comprender de qué modo el navegador utiliza HTML, JavaScript y CSS, y asegurarte de que el código que escribas (y el otro código de terceros que incluyas) se ejecute lo más eficientemente posible.

[Más información](rendering/)

<div style="clear:both;"></div>

## Comprensión de las implicaciones del ancho de banda bajo y de la latencia alta

<img src="images/low.png" class="attempt-right">

Es importante comprender cómo es usar tu app o tu sitio cuando la conectividad es deficiente o poco confiable, y cómo desarrollar en consecuencia. Varias herramientas pueden ayudar.

[Más información](poor-connectivity/)

<div style="clear:both;"></div>

## El patrón PRPL

<img src="images/prpl.png" class="attempt-right">

El PRPL (push, representación, almacenamiento previo en caché y carga lenta) es un patrón para estructurar
y brindar Progressive Web Apps (PWAs), con énfasis en el rendimiento
del lanzamiento y la entrega de la app.

[Más información](prpl-pattern/)

<div style="clear:both;"></div>


## Recursos relacionados

### Laboratorios de código

[Encuentra y soluciona los problemas de rendimiento de la app web](/web/fundamentals/getting-started/codelabs/web-perf/)<br>
Este codelab te ayudará a aprender a identificar y solucionar los cuellos de botella de rendimiento de la app web.

### Chrome DevTools

* [Cómo ver el rendimiento](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
* [Rendimiento del tiempo de ejecución](/web/tools/chrome-devtools/rendering-tools/)
* [Rendimiento de la carga de página](/web/tools/chrome-devtools/network-performance/resource-loading)


### Cursos de Udacity

[Optimización de representación del navegador](https://www.udacity.com/course/browser-rendering-optimization--ud860)<br>
El gurú del rendimiento de Google, Paul Lewis, está aquí para ayudarte a destruir los bloqueos y crear
apps web que mantengan un rendimiento de 60 marcos por segundo.

[Ruta crítica de representación](https://www.udacity.com/course/website-performance-optimization--ud884)<br>
Obtén más información sobre la Ruta crítica de representación o sobre los pasos que los navegadores deben dar
para convertir HTML, CSS y JavaScript en sitios web vivos.

[HTTP/1 a HTTP/2](https://www.udacity.com/course/client-server-communication--ud897)<br>
Surma comienza con los conceptos básicos de HTTP/1 y va hasta HTTP/2, cómo
cargar recursos en forma eficiente y también cubre aspectos de seguridad de estos protocolos. 
<div style="clear:both;"></div>




{# wf_devsite_translation #}
