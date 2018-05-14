project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La optimización de la ruta de acceso de representación crítica hace referencia al hecho de priorizar la visualización de contenido relacionado con la acción actual del usuario.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Ruta de acceso de representación crítica {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


_Optimización de la ruta de acceso de representación crítica_ hace referencia al hecho de priorizar la representación de
contenido relacionado con la acción actual del usuario.

Ofrecer una experiencia web rápida implica una alta exigencia para el navegador. Como programadores web
no podemos ver la mayor parte de este trabajo: escribimos el lenguaje de marcado y
aparece una bonita página en pantalla. Pero, ¿cómo pasa exactamente el navegador de
consumir nuestro lenguaje HTML, CSS y JavaScript a píxeles representados en la pantalla?

La optimización para mejorar el rendimiento se basa en la comprensión de lo que ocurre en estos
pasos intermedios entre la recepción de los bytes de HTML, CSS y JavaScript, y
el procesamiento necesario para convertirlos en píxeles representados; esa es
la **ruta de acceso de representación crítica**.

<img src="images/progressive-rendering.png"  alt="representación progresiva de la página">

Optimizando la ruta de acceso de representación crítica, podemos mejorar notablemente el
tiempo necesario para representar nuestras páginas por primera vez. Además, comprender la ruta de acceso
de representación crítica también sirve como base para crear apps interactivas
de buen rendimiento. El proceso de actualizaciones interactivas es el mismo, aunque se realiza en un bucle continuo e, idealmente, a 60 fotogramas por segundo. Pero primero, un panorama sobre la manera en que el navegador muestra una página simple.

<a href="constructing-the-object-model" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Constructing the Object Model">
  <button>A continuación: Construcción del modelo de objetos</button>
</a>

{% include "web/_shared/udacity/ud884.html" %}


{# wf_devsite_translation #}
