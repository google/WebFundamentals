project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Elige la aceleración adecuada para tu proyecto, así se trate de una entrada o salida lentas o de ambas posibilidades. ¡Incluso puedes usar rebotes para agregarle diversión!

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Elección de la aceleración adecuada {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Ahora que ya analizamos las diferentes opciones disponibles para acelerar las animaciones, ¿qué clase deberías usar en tus proyectos y qué tipos de duraciones deben tener tus animaciones?

### TL;DR {: .hide-from-toc }
* Usa las animaciones de salida lenta para los elementos de la IU; una salida lenta Quintic, a pesar de ser rápida, es una aceleración muy atractiva.
* Asegúrate de usar la duración de la animación. Las salidas y las entradas lentas deben durar entre 200 y 500 ms, mientras que los rebotes y las aceleraciones elásticas deben tener una duración más prolongada de entre 800 y 1200 ms.


<img src="images/quintic-ease-out-markers.png" alt="La curva de una animación de salida lenta Quintic" style="max-width: 300px" class="attempt-right"/>

En términos generales, una **salida lenta** será la opción correcta y, sin dudas, un buen parámetro predeterminado. Se inicia rápidamente, lo cual proporciona a tus animaciones una sensación de receptividad (un aspecto bienvenido), aunque con una agradable reducción de la velocidad al final.

Existe un grupo de ecuaciones de salida lenta reconocidas más allá de la especificada con la palabra clave `ease-out` en CSS, cuyos niveles de “agresividad” varían. Para obtener un efecto rápido de salida lenta, considera la [salida lenta Quintic](http://easings.net/#easeOutQuint).


[Ver una animación de salida lenta Quintic](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-quintic-ease-out.html){: target="_blank" .external }

El resto de las ecuaciones de aceleración, especialmente los rebotes y las aceleraciones elásticas, se deben usar con moderación y solo cuando sean adecuadas para tu proyecto. Existen algunos elementos que interrumpen la experiencia del usuario, como una animación estridente. Si tu proyecto no pretende ser divertido, entonces no hagas que los elementos reboten por la IU. Por el contrario, si creas un sitio con la intención de que sea alegre, ¡entonces sí usa rebotes!

Prueba con diferentes aceleraciones; descubre las que coincidan con la personalidad de tu proyecto y úsalas. Para acceder a una lista completa de tipos de aceleraciones, con sus demos, visita [easings.net](http://easings.net).

## Selecciona la duración correcta para las animaciones

Es importante que las animaciones que se agregan a tu proyecto tengan la duración correcta. Si la animación es demasiado breve, resultará agresiva y grosera; si es demasiado larga, será entorpecedora e irritante.

* **Salidas lentas: aproximadamente entre 200 ms y 500 ms**. De este modo, el ojo puede captar la animación, pero no es entorpecedora.
* **Entradas lentas: aproximadamente entre 200 ms y 500 ms**. Ten en cuenta que se sacudirá al final y ningún cambio que se realice en la duración podrá suavizar ese impacto.
* **Efectos de rebote o elásticos: aproximadamente entre 800 ms y 1200 ms**. Debes asignar tiempo suficiente para que el efecto de rebote o elástico se “asiente”. Sin este tiempo adicional, la parte de rebote elástico de la animación será agresiva y poco placentera a la vista.

Estas, por supuesto, son solo algunas recomendaciones. Experimenta con tus propias aceleraciones y elige las que combinen mejor con tus proyectos.




{# wf_devsite_translation #}
