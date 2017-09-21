project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Puedes realizar animaciones con CSS o JavaScript. ¿Cuál debes utilizar y por qué?

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-08-08 #}

# Animaciones de CSS frente a JavaScript {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

Existen dos métodos principales para crear animaciones en la web: CSS y JavaScript. La elección de uno u otro dependerá principalmente de las otras dependencias de tu proyecto y de los tipos de efectos que intentes lograr.

### TL;DR {: .hide-from-toc }
* Usa animaciones de CSS para realizar transiciones más simples de "una sola acción", como alternar los estados de los elementos de la IU.
* Usa las animaciones de JavaScript cuando desees agregar efectos avanzados como rebotes, detenciones, pausas, rebobinados o disminuciones de velocidad.
* Si decides realizar animaciones con JavaScript, usa la Web Animations API o un framework moderno con el que te sientas cómodo.


La mayoría de las animaciones básicas se pueden crear con CSS o JavaScript, pero el nivel de esfuerzo y tiempo variarán (consulta también [Comparación de rendimiento entre CSS y JavaScript](animations-and-performance#css-vs-javascript-performance)). Cada uno tiene ventajas y desventajas, pero las siguientes son algunas buenas pautas:

* **Usa CSS cuando tienes estados más pequeños e independientes para los elementos de IU.** Las transiciones y animaciones de CSS son ideales para incorporar un menú de navegación desde el lateral o para mostrar información sobre herramientas. Tal vez necesites usar JavaScript para controlar los estados, pero las animaciones estarán en tu CSS.
* **Usa JavaScript cuando necesites un nivel significativo de control sobre tus animaciones.** La Web Animations API es el enfoque basado en estándares, hoy disponibles en Chrome y Opera. Esto proporciona objetos reales, ideales para aplicaciones complejas orientadas a objetos. JavaScript también es útil cuando necesitas detenimiento, pausa, reducción de velocidad o inversión.
* **Usa `requestAnimationFrame` directamente cuando quieras dirigir toda una escena manualmente.** Este es un enfoque avanzado de JavaScript, pero puede resultar útil si desarrollas un juego o dibujas en un lienzo HTML.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="WaNoqBAp8NI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

De manera alternativa, si ya usas un framework de JavaScript en el que se incluya una funcionalidad de animación, como con el método [`.animate()`](https://api.jquery.com/animate/){: .external } de jQuery o [GreenSock's TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified), tal vez te resulte más práctico seguir haciéndolo para tus animaciones.

<div class="clearfix"></div>

## Animaciones con CSS

Realizar animaciones con CSS es la forma más simple de lograr que un objeto se mueva en la pantalla. Este enfoque se describe como *declarativo*, porque especificas lo que desearías que sucediera.

A continuación, se muestra un fragmento de CSS que mueve un elemento 100 px en los ejes X e Y. Esto se realiza usando la transición de CSS que se configura para demorar 500 ms. Cuando se agrega la clase `move`, el valor `transform` se modifica y comienza la transición.


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
    
[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-simple.html){: target="_blank" .external }

Además de la duración de la transición, existen opciones para la *aceleración*, que es básicamente como se percibe la animación. Para obtener más información sobre la aceleración, consulta la guía [Aspectos básicos de la aceleración](the-basics-of-easing).

Si, al igual que en el siguiente fragmento, creas clases de CSS por separado para administrar tus animaciones, puedes usar JavaScript para activar o desactivar cada animación:


    box.classList.add('move');
    

Esto proporciona un buen balance a tus apps. Puedes centrarte en administrar el estado con JavaScript y simplemente configurar las clases adecuadas en los elementos de destino, dejando así que el navegador se encargue de las animaciones. Si sigues este camino, podrás escuchar los eventos `transitionend` en el elemento, pero solo si eres capaz de renunciar a la compatibilidad con versiones anteriores de Internet Explorer. La versión 10 fue la primera en ser compatible con estos eventos. Todos los demás navegadores fueron compatibles con el evento durante algún tiempo.

El JavaScript necesario para escuchar el final de una transición se ve así:


    var box = document.querySelector('.box');
    box.addEventListener('transitionend', onTransitionEnd, false);
    
    function onTransitionEnd() {
      // Handle the transition finishing.
    }
    

Además de usar las transiciones de CSS, también puedes usar las animaciones de CSS, que te permiten tener mucho más control sobre los marcos clave de animaciones individuales, las duraciones y las iteraciones.

Note: Si es la primera vez que realizas animaciones, “marco clave” es un término antiguo de las animaciones realizadas a mano. Los animadores creaban marcos específicos para una parte de la acción, que llevaban este nombre, en los que capturaban acciones como la parte más extrema de cierto movimiento, y luego dibujaban todos los marcos individuales entre los marcos clave. En la actualidad, tenemos un proceso similar para las animaciones de CSS, en el que le indicamos al navegador los valores de las propiedades de CSS que se deben tener en determinados puntos y, luego, el navegador completa los espacios vacíos.

Por ejemplo, puedes animar el cuadro del mismo modo que las transiciones, pero puedes hacer que se mueva sin la interacción del usuario, como clics, y con una cantidad infinita de repeticiones. También puedes cambiar varias propiedades al mismo tiempo:


    /**
     * This is a simplified version without
     * vendor prefixes. With them included
     * (which you will need), things get far
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
    

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-keyframes.html){: target="_blank" .external }

En las animaciones de CSS, defines la animación independientemente del elemento de destino y usas la propiedad animation-name para elegir la animación necesaria.

Las animaciones de CSS aún incluyen, en gran medida, prefijos del proveedor, y `-webkit-` se usa en Safari, Safari Mobile y Android. Chrome, Opera, Internet Explorer y Firefox realizan envíos sin prefijos. Existen muchas herramientas que pueden ayudarte a crear las versiones con prefijos del CSS que necesites, lo que te permitirá escribir la versión sin prefijo en tus archivos de origen.

## Animaciones con JavaScript y con la Web Animations API

Crear animaciones con JavaScript es, en comparación, más complejo que escribir transiciones o animaciones de CSS, pero generalmente le proporciona a los programadores mucho más poder. Puedes usar la [Web Animations API](https://w3c.github.io/web-animations/), ya sea para animar propiedades de CSS específicas o para crear objetos de efecto componible.

Las animaciones de JavaScript son *imperativas*, cuando las escribes de manera integrada como parte de un código. También puedes encapsularlas dentro de otros objetos. A continuación, se muestra el fragmento de JavaScript que debes escribir para recrear la transición de CSS que se menciona anteriormente.


    var target = document.querySelector('.box');
    var player = target.animate([
      {transform: 'translate(0)'},
      {transform: 'translate(100px, 100px)'}
    ], 500);
    player.addEventListener('finish', function() {
      target.style.transform = 'translate(100px, 100px)';
    });
    

De forma predeterminada, las animaciones web solo modifican la presentación de un elemento. Si deseas que tu objeto permanezca en la ubicación a la que se movió, entonces debes modificar los estilos subyacentes cuando la animación haya finalizado, según nuestro ejemplo.

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-wa.html){: target="_blank" .external }

La Web Animations API es un estándar nuevo de W3C. Es compatible de forma nativa con Chrome y Opera y se encuentra en [proceso activo de desarrollo para Firefox](https://birtles.github.io/areweanimatedyet/){: .external }. Para otros navegadores modernos, [se encuentra disponible polyfill](https://github.com/web-animations/web-animations-js).

Con las animaciones de JavaScript, puedes controlar totalmente los estilos de un elemento en cada paso. Esto significa que es posible reducir la velocidad de las animaciones, pausarlas, detenerlas, invertirlas y manipular elementos según lo creas conveniente. Esto resulta especialmente útil si creas apps complejas orientadas a objetos, ya que puedes encapsular de forma adecuada tu comportamiento.


{# wf_devsite_translation #}
