project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprende a suavizar tus animaciones y lograr que sean interesantes.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Aspectos básicos de la aceleración {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Nada de lo que se encuentra en la naturaleza se mueve de forma lineal de un punto a otro. En la realidad, los objetos tienden a acelerar o desacelerar a medida que se mueven. Nuestros cerebros están configurados para esperar este tipo de movimiento. Por ello, al realizar animaciones debes sacar provecho a esto. Si los movimientos son naturales, los usuarios se sentirán más cómodos con tus apps, lo que a su vez derivará en una mejor experiencia general.

### TL;DR {: .hide-from-toc }
* Gracias a la aceleración, tus animaciones se ven más naturales.
* Selecciona animaciones de salida lenta para los elementos de las IU.
* Evita las animaciones de entrada lenta o de entrada y salida lentas, a menos que puedas hacer que sean breves, ya que generalmente resultan muy lentas para los usuarios finales.


En la animación clásica, para el movimiento que comienza lentamente y luego se acelera se usa el término “aceleración”, y para el movimiento que comienza rápidamente y luego se desacelera, “desaceleración”. Los términos más usados en la web para estos conceptos son “entrada lenta” y “salida lenta”, respectivamente. A veces, ambos se combinan y se a esto se lo denomina “entrada y salida lentas”. Por consiguiente, la aceleración es el proceso de hacer que la animación sea menos intensa o pronunciada.

## Palabras clave de la aceleración

Tanto las transiciones como las animaciones de las CSS te permiten [elegir el tipo de aceleración que deseas usar en tus animaciones](choosing-the-right-easing). Puedes usar palabras clave que afecten la aceleración (o `timing`, como también suele llamarse) de la animación en cuestión. También puedes [personalizar por completo la aceleración](custom-easing), lo cual le permite expresar más libremente la personalidad de tu app.

A continuación, presentamos algunas de las palabras claves que puedes usar en las CSS:

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

Fuente: [Transiciones de CSS, W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

También puedes usar la palabra clave `steps`, la cual te permitirá crear transiciones con pasos discretos, pero las palabras clave que se mencionan anteriormente son las más útiles para crear animaciones que resulten naturales.

## Animaciones lineales

<div class="attempt-right">
  <figure>
    <img src="images/linear.png" alt="Curva de animación de aceleración lineal." />
  </figure>
</div>

Las animaciones sin ningún tipo de aceleración se conocen como **lineales**. Los gráficos de las transiciones lineales se ven de la siguiente manera:

A medida que pasa el tiempo, el valor aumenta en cantidades iguales. Con el movimiento lineal, las animaciones tienden a verse robóticas y poco naturales, y esto es algo que resulta chocante para los usuarios. En términos generales, debes evitar el movimiento lineal.

Independientemente de que programes tus animaciones mediante CSS o JavaScript, descubrirás que siempre existe una opción alternativa al movimiento lineal. 

[Ver una animación lineal](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-linear.html){: target="_blank" .external }

<div style="clear:both;"></div>

Para lograr el efecto que se mostró antes con las CSS, el código deberá tener el siguiente aspecto:


    transition: transform 500ms linear;
    


## Animaciones de salida lenta

<div class="attempt-right">
  <figure>
    <img src="images/ease-out.png" alt="Curva de animación de salida lenta." />
  </figure>
</div>

En las salidas lentas, la animación comienza más rápido que en las animaciones lineales y también presenta desaceleración al final.

Por lo general, la salida lenta es la mejor opción para las interfaces de usuario, ya que el inicio rápido proporciona a las animaciones una sensación de receptividad y, a la vez, permite una desaceleración natural al final.

[Ver una animación de salida lenta](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-out.html){: target="_blank" .external }

<div style="clear:both;"></div>

Existen muchas maneras diferentes de lograr un efecto de salida lenta, pero la más simple es usar la palabra clave `ease-out` en la CSS:


    transition: transform 500ms ease-out;
    


## Animaciones de entrada lenta

<div class="attempt-right">
  <figure>
    <img src="images/ease-in.png" alt="Curva de animación de entrada lenta." />
  </figure>
</div>

Las animaciones de entrada lenta comienzan lentamente y finalizan rápidamente, que es lo contrario de las de salida lenta.

Este tipo de animaciones son como una roca pesada que cae, con un comienzo lento, un impacto rápido contra el suelo y un choque asordinado.

Sin embargo, desde el punto de vista de la interacción, las entradas lentas pueden resultar inusuales debido a su final abrupto. Los objetos que se mueven en el mundo real tienden a desacelerar en lugar de simplemente detenerse de repente. Las entradas lentas también tienen el efecto perjudicial de verse demasiado lentas al comienzo, lo cual tiene un impacto negativo en la forma de percibir la receptividad de tu sitio o tu app.

[Ver una animación de entrada lenta](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in.html){: target="_blank" .external }

<div style="clear:both;"></div>

Para usar una animación de entrada lenta, como en el caso de las animaciones lineales y de salida lenta, puedes aplicar las palabras claves correspondientes:


    transition: transform 500ms ease-in;
    

## Animaciones de entrada y salida lentas

<div class="attempt-right">
  <figure>
    <img src="images/ease-in-out.png" alt="Curva de animación de entrada y salida lentas." />
  </figure>
</div>

La inclusión de entradas y salidas lentas se asemeja a un auto que acelera y desacelera, y si se usan juiciosamente pueden proporcionar un efecto más dramático que el uso exclusivo de salidas lentas.

Evita que la duración de la animación sea demasiado prolongada, debido a la lentitud del inicio de la animación con una entrada lenta. Lo adecuado es normalmente algo entre 300 y 500 ms, pero el número exacto depende en gran medida del aspecto de tu proyecto. Dicho esto, debido al inicio lento, una sección intermedia rápida y un final lento, la animación tendrá un contraste mayor, lo cual podría ser bastante atractivo para los usuarios.

[Ver una animación de entrada y salida lentas](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in-out.html){: target="_blank" .external }

<div style="clear:both;"></div>


Para lograr una animación de entrada y salida lentas, puedes usar la palabra clave `ease-in-out` de CSS:


    transition: transform 500ms ease-in-out;
    




{# wf_devsite_translation #}
