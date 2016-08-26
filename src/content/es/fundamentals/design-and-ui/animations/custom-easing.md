project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Desvíese de lo común y cree animaciones totalmente personalizadas para sus proyectos.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-08-08 #}

# Aceleración personalizada {: .page-title }

{% include "_shared/contributors/paullewis.html" %}
{% include "_shared/contributors/samthorogood.html" %}



En algunos casos, no querrá utilizar las palabras clave de aceleración que se incluyen con CSS, o bien utilizará una biblioteca de animaciones basadas en JavaScript. Generalmente, en ambos casos puede definir sus propias curvas (o ecuaciones), y esto le proporcionará mucho control sobre el aspecto de las animaciones de su proyecto.

## TL;DR {: .hide-from-toc }
- La aceleración personalizada le permitirá darle más personalidad a sus proyectos.
- 'Puede crear curvas Bézier cúbicas similares a las curvas de animación predeterminadas (salida lenta, entrada lenta, etc.), pero con énfasis en diferentes lugares.'
- "Utilice JavaScript cuando necesite tener más control sobre la sincronización y el comportamiento de las animaciones; p.\_ej., animaciones elásticas o de rebote."


Si realiza animaciones con CSS, descubrirá que puede definir curvas Bézier cúbicas para definir la sincronización. De hecho, las palabras clave `ease`, `ease-in`, `ease-out` y `linear` se asignan a curvas Bézier predefinidas, las cuales se detallan en las [especificaciones de transiciones de CSS](http://www.w3.org/TR/css3-transitions/).

En las CSS, estas curvas Bézier toman cuatro valores o 2 pares de números, y en cada par se describen las coordenadas X e Y de los puntos de control de una curva Bézier cúbica.  El punto de inicio de la curva Bézier posee la coordenada (0, 0), y la coordenada final es (1, 1), por lo que puede configurar los valores X e Y de los dos puntos de control. Los valores de X para los dos puntos de control deben ser de entre 0 y 1, y el valor Y de cada punto de control puede superar el límite [0, 1], aunque en las especificaciones no se aclara por cuánto.

Si se cambian los valores X e Y de cada punto de control, se obtiene una curva muy diferente y, por consiguiente, su animación tendrá una apariencia bastante diferente. Por ejemplo, si el primer punto de control se encuentra en la esquina inferior derecha, la animación será lenta al inicio. Si el primer punto de control se encuentra en el área superior izquierda, la animación será rápida al inicio. Por el contrario, si el segundo punto de control se encuentra en la esquina inferior derecha de la cuadrícula, la animación será rápida al final, mientras que, si se encuentra en la esquina superior izquierda, será lenta al final.

A modo de comparación, presentamos dos curvas: una curva típica de entrada y salida lenta, y una curva personalizada:

<img src="imgs/ease-in-out-markers.png" style="display: inline; max-width: 300px" alt="Ease-in-out animation curve." />
<img src="imgs/custom.png" style="display: inline; max-width: 300px" alt="Custom animation curve." />

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/animations/box-move-custom-curve.html">Ver una animación con aceleración personalizada</a>

La CSS para la curva personalizada es la siguiente:


    transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    

Los dos primeros números son las coordenadas X e Y del primer punto de control; los dos segundos números son las coordenadas X e Y del segundo punto de control.

La creación de una curva personalizada es una tarea divertida, y le proporciona mucho control sobre la apariencia de la animación. Por ejemplo, si analiza la curva que se muestra arriba, podrá ver que es similar a una curva clásica de entrada y salida lentas, pero con una entrada lenta abreviada, o una porción de ‘ingreso-egreso’, y una reducción de la velocidad elongada al final.

Experimente con esta <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/animations/curve-playground.html">herramienta de curvas de animación</a> y vea cómo la curva afecta la apariencia de la animación.

## Uso de JavaScript para tener más control

En algunos casos, necesitará tener incluso más control que el que le puede proporcionar una curva Bézier cúbica. Tal vez desee lograr una apariencia de rebote elástica o desee detener la ejecución de una parte animada a lo largo de la animación, dos efectos que son mucho más difíciles de lograr con las CSS. En estos casos, debe utilizar las bibliotecas de animaciones de JavaScript. Una de las mejores bibliotecas es [TweenMax de Greensock](https://github.com/greensock/GreenSock-JS/tree/master/src/minified) (o TweenLite si desea que todo sea más liviano), ya que de este modo puede tener mucho control en una pequeña biblioteca de JavaScript, y este es un código base muy maduro.

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/animations/box-move-elastic.html">Ver una animación de aceleración elástica</a>

Para utilizar una herramienta como TweenMax, incluya el siguiente script en su página:


    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
    

Luego, podrá ejecutar TweenMax en su elemento e indicar las propiedades que le gustaría aplicar, junto con cualquier tipo de aceleración que desee utilizar. Puede utilizar muchísimas opciones de aceleración. En el código que se especifica a continuación, se utiliza una salida lenta elástica:


    var box = document.getElementById('my-box');
    var animationDurationInSeconds = 1.5;
    
    TweenMax.to(box, animationDurationInSeconds, {
      x: '100%',
      ease: 'Elastic.easeOut'
    });
    

En la [documentación de TweenMax](http://greensock.com/docs/#/HTML5/GSAP/TweenMax/) se mencionan todas las opciones que posee en esta herramienta, por lo que le recomendamos que la lea.



