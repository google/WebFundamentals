project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Desvíate de lo común y crea animaciones totalmente personalizadas para tus proyectos.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Aceleración personalizada {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

En algunos casos, no te convendrá usar las palabras claves de aceleración que se incluyan con CSS, o usarás animaciones web o un framework de JavaScript. Generalmente, en estos casos puedes definir tus propias curvas (o ecuaciones), y esto te proporciona mucho control sobre el aspecto de las animaciones de tu proyecto.

### TL;DR {: .hide-from-toc }
* La aceleración personalizada te permite darles más personalidad a tus proyectos.
* Puedes crear curvas Bézier cúbicas similares a las curvas de animación predeterminadas (salida lenta, entrada lenta, etc.), pero con énfasis en diferentes lugares.
* Usa JavaScript cuando necesites tener más control sobre la duración y el comportamiento de las animaciones; por ejemplo, animaciones elásticas o de rebote.


Si realizas animaciones con CSS, descubrirás que puedes definir curvas Bézier cúbicas para definir la duración. De hecho, las palabras claves `ease`, `ease-in`, `ease-out` y `linear` se asignan a curvas Bézier predefinidas, las cuales se detallan en la [especificación de transiciones de CSS](http://www.w3.org/TR/css3-transitions/) y la [especificación de animaciones web](https://w3c.github.io/web-animations/#scaling-using-a-cubic-bezier-curve).

Estas curvas Bézier toman cuatro valores o dos pares de números, y en cada par se describen las coordenadas X e Y de los puntos de control de una curva Bézier cúbica. El punto de inicio de la curva Bézier posee la coordenada (0, 0), y la coordenada final es (1, 1), por lo que puedes configurar los valores X e Y de los dos puntos de control. Los valores de X para los dos puntos de control deben ser de entre 0 y 1, y el valor Y de cada punto de control puede superar el límite [0, 1], aunque en las especificaciones no se aclara por cuánto.

Si se cambian los valores X e Y de cada punto de control, se obtiene una curva muy diferente y, por consiguiente, tu animación tendrá una apariencia bastante distinta. Por ejemplo, si el primer punto de control se encuentra en el área inferior derecha, la animación será lenta al inicio. Si se encuentra en el área superior izquierda, será rápida al inicio. Por el contrario, si el segundo punto de control se encuentra en el área inferior derecha de la cuadrícula, la animación será rápida al final; mientras que, si se encuentra en el área superior izquierda, será lenta al final.

A modo de comparación, presentamos dos curvas: una típica de entrada y salida lenta, y una personalizada:

<div class="attempt-left">
  <figure>
    <img src="images/ease-in-out-markers.png" alt="Curva de animación de entrada y salida lentas." />
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/custom.png" alt="Curva de animación personalizada." />
  </figure>
</div>

[Ver una animación con aceleración personalizada](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-custom-curve.html){: target="_blank" .external }

La CSS para la curva personalizada es la siguiente:


    transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    

Los dos primeros números son las coordenadas X e Y del primer punto de control; los dos segundos números son las coordenadas X e Y del segundo punto de control.

Crear una curva personalizada es una tarea divertida y te proporciona mucho control sobre el aspecto de la animación. Por ejemplo, si analizas la curva que se muestra anteriormente, podrás ver que es similar a una curva clásica de entrada y salida lentas, pero con una entrada lenta abreviada, o una porción de “comenzar”, y una reducción de velocidad más larga al final.

Experimenta con esta [herramienta de curvas de animación](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/curve-playground.html){: target="_blank" .external } y mira cómo la curva afecta la apariencia de la animación.

## Uso de frameworks de JavaScript para tener más control

En algunos casos, necesitas tener incluso más control que el que puede proporcionar una curva Bézier cúbica. Si deseas una apariencia de rebote elástica, podrías considerar el uso de un framework de JavaScript, ya que se trata de un efecto difícil de alcanzar con CSS o animaciones web.

### TweenMax

Un framework potente es [TweenMax de Greensock](https://github.com/greensock/GreenSock-JS/tree/master/src/minified) (o TweenLite, si deseas que todo sea más liviano), ya que de este modo puedes tener mucho control en una pequeña biblioteca de JavaScript y este es un código base muy evolucionado.

[Ver una animación de aceleración elástica](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-elastic.html){: target="_blank" .external }

Para usar TweenMax, incluye la siguiente secuencia de comandos en tu página:


    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
    

Luego de que la secuencia de comandos esté lista, podrás llamar a TweenMax para tu elemento e indicarle qué propiedades te gustaría aplicar, junto con cualquier tipo de aceleración que desees usar. Puedes usar muchísimas opciones de aceleración. En el siguiente código se usa una salida lenta elástica:


    var box = document.getElementById('my-box');
    var animationDurationInSeconds = 1.5;
    
    TweenMax.to(box, animationDurationInSeconds, {
      x: '100%',
      ease: 'Elastic.easeOut'
    });
    

En la [documentación de TweenMax](https://greensock.com/docs/#/HTML5/GSAP/TweenMax/) se mencionan todas las opciones disponibles, por lo que te recomendamos leerla.





{# wf_devsite_translation #}
