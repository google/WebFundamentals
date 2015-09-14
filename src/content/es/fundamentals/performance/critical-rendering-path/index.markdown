---
title: "Ruta de renderización importante"
description: "Optimización de la ruta de renderización importante dando prioridad a la visualización de contenido relacionada con la acción principal que el usuario quiere realizar en una página"
updated_on: 2014-04-28
udacity:
  id: ud884
  title: Website Performance Optimization
  description: "Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages."
  image: images/crp-udacity.png
---
<p class="intro">
  La optimización de la ruta de renderización importante es fundamental para mejorar el rendimiento de las páginas. Nuestro objetivo es priorizar y mostrar el contenido relacionado con la acción principal que el usuario quiere realizar en una página.
</p>

Para ofrecer rapidez al usuario en nuestro sitio, el navegador debe realizar muchas tareas. La mayoría de ellas transcurren en segundo plano para nosotros, los desarrolladores web, ya que tras escribir el lenguaje de marcado, solo vemos una bonita página. ¿Cuál es exactamente el proceso que realiza el navegador para transformar nuestro código HTML, CSS y JavaScript en píxeles en una pantalla?

La optimización del rendimiento consiste básicamente en entender qué sucede en estos pasos intermedios, desde que se reciben los bytes en HTML, CSS y JavaScript hasta que se procesan para convertirlos en píxeles. Esto se denomina **ruta de renderización importante**.

<img src="images/progressive-rendering.png" class="center" alt="visualización progresiva de una página">

Al optimizar la ruta de renderización importante, podemos mejorar significativamente el tiempo que se tarda en mostrar nuestras páginas. Es más, entender la ruta de renderización importante también nos servirá como base para crear aplicaciones interactivas con un buen rendimiento. Pues resulta que los pasos para procesar las actualizaciones interactivas son los mismos, salvo que tienen lugar en bucle continuo e, idealmente, a 60 fotogramas por segundo. Pero aún no nos adelantemos. Primero, veremos de forma general cómo el navegador muestra una página simple.

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title image=page.udacity.image description=page.udacity.description %}


