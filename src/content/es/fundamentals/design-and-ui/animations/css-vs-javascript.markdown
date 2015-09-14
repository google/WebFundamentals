---
title: "Animaciones de CSS en comparación con las de JavaScript"
description: "Puede realizar animaciones con CSS o con JavaScript. ¿Cuál debe utilizar y por qué?"
updated_on: 2014-10-21
translation_priority: 0
key-takeaways:
  code:
    - "Utilice animaciones de CSS para realizar transiciones más simples de “una sola acción”, como alternar los estados de los elementos de la IU."
    - "Utilice las animaciones de JavaScript cuando desee agregar efectos avanzados como rebotes, detenciones, pausas, rebobinados o disminuciones de velocidad."
    - "Si decide animar con JavaScript, utilice TweenMax o, si desea utilizar una solución más liviana, TweenLite."
notes:
  keyframes:
    - "Si es la primera vez que realiza animaciones, le contamos que marcos clave es un nombre que se utilizaba anteriormente en las animaciones realizadas a mano. Los animadores creaban marcos específicos para una parte de la acción, llamados marcos clave, en los que capturaban acciones como la parte más extrema de algún movimiento, y luego dibujaban todos los marcos individuales entre los marcos clave. En la actualidad, tenemos un proceso similar para las animaciones de CSS, en el que le indicamos al navegador los valores de las propiedades de CSS que se deben tener en determinados puntos y, luego, el navegador completa los espacios vacíos."
  setinterval:
    - "Podrá ver un código en la web en el que se utiliza setInterval o setTimeout para las animaciones. Esta no es una buena idea, ya que la animación no se sincronizará a la frecuencia de actualización de la pantalla, y es muy probable que se produzcan sacudidas y saltos. Siempre debe evitar utilizar este código y, en su lugar, utilizar requestAnimationFrame, el cual está sincronizado adecuadamente."
---
<p class="intro">
  Existen dos formas principales de crear animaciones en la web: CSS y JavaScript. La elección de una u otra dependerá principalmente de las otras dependencias de su proyecto y de los tipos de efectos que intenta lograr.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

La mayoría de las animaciones básicas se pueden crear con CSS o JavaScript, pero la cantidad de esfuerzo y tiempo variarán (consulte también [Rendimiento de CSS en comparación con JavaScript]({{site.fundamentals}}/look-and-feel/animations/animations-and-performance.html#css-vs-javascript-performance)). Cada uno posee ventajas y desventajas, pero estas son las reglas básicas:

* **Utilice CSS cuando posea estados más pequeños e independientes para los elementos de IU.** Las transiciones y animaciones de CSS son ideales para incorporar un menú de navegación desde el lateral o para mostrar información sobre herramientas. Tal vez necesite utilizar JavaScript para controlar los estados, pero las animaciones estarán en su CSS.
* **Utilice JavaScript cuando necesite tener una cantidad significativa de control sobre sus animaciones.** Si necesita realizar un seguimiento de forma dinámica de una posición táctil, o bien necesita detener, pausar, reducir la velocidad o invertir una animación, generalmente deberá utilizar JavaScript.

Si ya está utilizando jQuery o un marco de JavaScript en el que se incluya la funcionalidad de animación, tal vez se sienta más cómodo al seguir utilizando esto para sus animaciones, en lugar de comenzar a utilizar CSS.

### Animaciones con CSS

No existen dudas de que el hecho de animar con CSS es la forma más simple de lograr que un objeto se mueva en la pantalla.

A continuación, se muestran algunas CSS en las que se moverá un elemento de 100 píxeles en los ejes X e Y. Esto se realiza utilizando las transiciones de CSS, que se configuran para que demoren 500 ms. Cuando se agrega la clase `move`, el valor `transform` se modifica y comienza la transición.

{% highlight css %}
.box {
  -webkit-transform: translate(0, 0);
  -webkit-transition: -webkit-transform 500ms;

  transform: translate(0, 0);
  transition: transform 500ms;
}

.box.move {
  -webkit-transform: translate(100px, 100px);
  transform: translate(100px, 100px);
}
{% endhighlight %}

{% link_sample _code/box-move-simple.html %}Ver el ejemplo{% endlink_sample %}

Además de la duración de la transición, existen opciones para la aceleración, que es, básicamente, cómo se ve la animación. Podrá obtener más información sobre esto en la guía de [“Principios básicos de la aceleración”](the-basics-of-easing.html).

Si, al igual que en el siguiente fragmento, crea clases de CSS por separado para administrar sus animaciones, puede utilizar JavaScript para activar o desactivar cada animación:

{% highlight javascript %}
box.classList.add('move');
{% endhighlight %}

Si realiza esto, podrá lograr un equilibrio muy agradable en sus aplicaciones. Puede centrarse en administrar el estado con JavaScript y simplemente configurar las clases adecuadas en los elementos de destino, y dejar que el navegador se encargue de las animaciones. Si sigue este camino, podrá escuchar los eventos `transitionend` en el elemento, pero solo si es capaz de renunciar a la compatibilidad con versiones anteriores de Internet Explorer. La versión 10 fue la primera en ser compatible con estos eventos. Todos los demás navegadores fueron compatibles con el evento durante algún tiempo.

El JavaScript necesario para escuchar el final de una transición se ve así:

{% highlight javascript %}
var box = document.querySelector('.box');
box.addEventListener('transitionend', onTransitionEnd, false);

function onTransitionEnd() {
  // Handle the transition finishing.
}
{% endhighlight %}

Además de utilizar las transiciones de CSS, también puede utilizar las animaciones de CSS, que le permitirán tener mucho más control sobre los marcos clave de animaciones individuales, las duraciones y las repeticiones.

{% include shared/remember.liquid title="Note" list=page.notes.keyframes %}

Por ejemplo, puede animar el cuadro del mismo modo con las transiciones, pero puede hacerlo sin que el usuario interactúe con clics y con una cantidad infinita de repeticiones. También puede cambiar múltiples propiedades al mismo tiempo:

{% highlight css %}
/**
 * This is a simplified version without
 * vendor prefixes. With them included
 * (which you will need) things get far
 * more verbose!
 */
.box {
  /* Choose the animation */
  animation-name: movingBox;

  /* The animation’s duration */
  animation-duration: 1300ms;

  /* The number of times we want
      the animation to run */
  animation-iteration-count: infinite;

  /* Causes the animation to reverse
      on every odd iteration */
  animation-direction: alternate;
}

@keyframes movingBox {
  0% {
    transform: translate(0, 0);
    opacity: 0.3;
  }

  25% {
    opacity: 0.9;
  }

  50% {
    transform: translate(100px, 100px);
    opacity: 0.2;
  }

  100% {
    transform: translate(30px, 30px);
    opacity: 0.8;
  }
}
{% endhighlight %}

{% link_sample _code/box-move-keyframes.html %}Ver el ejemplo{% endlink_sample %}

En las animaciones de CSS, usted define la animación independientemente del elemento de destino y utiliza la propiedad animation-name para elegir la animación necesaria.

Las animaciones de CSS aún incluyen, en gran medida, prefijos del proveedor, y `-webkit-` se utiliza en los navegadores Chrome, Safari, Opera, Safari Mobile y Android. Tanto Internet Explorer como Firefox realizan envíos sin prefijos. Puede utilizar diferentes herramientas para crear las versiones con prefijos de la CSS que necesita, lo que le permitirá escribir la versión sin prefijo en los archivos de origen.

### Animaciones con JavaScript

El hecho de crear animaciones con JavaScript es, en comparación, más complejo que escribir transiciones o animaciones de CSS, pero generalmente le proporciona más poder a usted en su papel de desarrollador. El enfoque general consiste en utilizar `requestAnimationFrame` y, en cada marco de la animación, determinar manualmente el valor de cada propiedad del elemento que se está animando.

{% include shared/remember.liquid title="Note" list=page.notes.setinterval %}

A continuación, se muestra la versión de JavaScript que debería escribir para recrear la transición de CSS que mencionamos anteriormente.

{% highlight javascript %}
function Box () {

  var animationStartTime = 0;
  var animationDuration = 500;
  var target = document.querySelector('.box');

  this.startAnimation = function() {
    animationStartTime = Date.now();
    requestAnimationFrame(update);
  };

  function update() {
    var currentTime = Date.now();
    var positionInAnimation = (currentTime - animationStartTime) / animationDuration;

    var xPosition = positionInAnimation * 100;
    var yPosition = positionInAnimation * 100;

    target.style.transform = 'translate(' + xPosition + 'px, ' + yPosition + 'px)';

    if (positionInAnimation <= 1)
      requestAnimationFrame(update);
  }
}

var box = new Box();
box.startAnimation();
{% endhighlight %}

{% link_sample _code/box-move-js.html %}Ver el ejemplo{% endlink_sample %}

Este código se torna muy complejo y difícil de administrar a medida que intenta expandirlo para abarcar más casos, por lo que, en general, se beneficiará si elige una de las tantas bibliotecas de JavaScript disponibles para animación. Si ya está utilizando jQuery en su proyecto, es probable que se beneficie usándolo y ejecutando las funciones de [`.animate()`](http://api.jquery.com/animate/). Si, por otro lado, necesita una biblioteca especializada, consulte [TweenMax de Greensock](https://github.com/greensock/GreenSock-JS/tree/master/src/minified), que es una herramienta muy eficiente. Existe una versión liviana de esta herramienta, denominada TweenLite, que es más fácil de utilizar desde el punto de vista del tamaño.

Puesto que con las animaciones de JavaScript puede controlar totalmente los estilos de los elementos en cada paso, es posible reducir la velocidad de la animación, pausarla, detenerla, invertirla y manipularla hasta que se ajuste a lo que desea.


