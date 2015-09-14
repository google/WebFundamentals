---
title: "Principios básicos de la aceleración"
description: "Aprenda a lograr que sus animaciones sean suaves pero interesantes."
updated_on: 2014-10-21
translation_priority: 0
key-takeaways:
  code:
    - "Gracias a la aceleración, sus animaciones se ven más naturales."
    - "Seleccione animaciones de salida lenta para los elementos de las IU."
    - "Evite las animaciones de entradas lentas o de entradas y salidas lentas, a menos que sean breves, ya que generalmente les parecen muy lentas a los usuarios finales."
---

<p class="intro">
  Nada de lo que se encuentra en la naturaleza se mueve de forma lineal desde un punto hacia otro. En la realidad, los objetos tienden a acelerar o desacelerar a medida que se mueven. Nuestros cerebros están configurados para esperar este tipo de movimiento, por lo que, al realizar animaciones, debe utilizar esto a su favor. Si los movimientos son naturales, los usuarios se sentirán más cómodos con sus aplicaciones, lo que, a su vez, derivará en una mejor experiencia general.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

En la animación clásica, el término para el movimiento que comienza lentamente y luego se acelera se denomina “aceleración”, y el movimiento que comienza rápidamente y luego se desacelera se conoce como “desaceleración”, pero los términos más usados en la web son “entrada lenta” y “salida lenta”, respectivamente. A veces, las dos se combinan, lo que se denomina “entrada y salida lentas”. Por consiguiente, la aceleración es el proceso de hacer que la animación sea menos intensa o pronunciada.

## Palabras clave de la aceleración

Tanto las transiciones como las animaciones de las CSS (Hoja de estilos en cascada) le permiten [elegir el tipo de aceleración que desea utilizar en sus animaciones]({{site.fundamentals}}/look-and-feel/animations/choosing-the-right-easing.html). Puede utilizar las palabras clave que afectan la aceleración (o, según se denomina comúnmente, la sincronización) de la animación en cuestión. También puede [realizar una personalización completa mediante la aceleración]({{site.fundamentals}}/look-and-feel/animations/custom-easing.html), lo que le permite expresar más libremente la personalidad de su aplicación.

A continuación, presentamos algunas de las palabras clave que puede utilizar en las CSS:

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

Fuente: [Transiciones de CSS, W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

También puede utilizar la palabra clave `steps`, la cual le permite crear transiciones con pasos discretos, pero las que se mencionan arriba son las palabras clave más útiles para crear animaciones que sean naturales, y seguramente eso es lo que desea.

## Animaciones lineales

Las animaciones sin ningún tipo de aceleración se conocen como **lineales**. Los gráficos de las transiciones lineales se ven de la siguiente manera:

<img src="imgs/linear.png" style="max-width: 300px" alt="Linear ease animation curve." />

{% link_sample _code/box-move-linear.html %}Ver una animación lineal{% endlink_sample %}

A medida que pasa el tiempo, el valor aumenta en cantidades iguales. Con el movimiento lineal, las animaciones se ven robóticas y poco naturales, y esto es algo irritante para los usuarios. En términos generales, debe evitar el movimiento lineal.

Independientemente de si codifica sus animaciones mediante CSS o JavaScript, descubrirá que siempre existe una opción para no utilizar el movimiento lineal. Para lograr el efecto que se mostró antes con las CSS, el código debería ser similar al siguiente:

{% highlight css %}
transition: transform 500ms linear;
{% endhighlight %}


## Animaciones de salida lenta

En las salidas lentas, la animación comienza más rápido que en las animaciones lineales y también presenta desaceleración al final.

<img src="imgs/ease-out.png" style="max-width: 300px" alt="Ease-out animation curve." />

Existen muchas maneras diferentes de lograr un efecto de salida lenta, pero la más simple es usar la palabra clave `ease-out` en las CSS:

{% highlight css %}
transition: transform 500ms ease-out;
{% endhighlight %}

{% link_sample _code/box-move-ease-out.html %}Ver una animación de salida lenta{% endlink_sample %}

Por lo general, la salida lenta es la mejor opción para el trabajo de las interfaces de usuario, ya que el inicio rápido les proporciona a las animaciones un aire de receptividad y, a su vez, sigue permitiendo el uso de un poco de desaceleración natural al final.

##Animaciones de entrada lenta

Las animaciones de entrada lenta comienzan lentamente y finalizan rápidamente, lo contrario de la salida lenta.

<img src="imgs/ease-in.png" style="max-width: 300px" alt="Ease-in animation curve." />

{% link_sample _code/box-move-ease-in.html %}Ver una animación de entrada lenta{% endlink_sample %}

Este tipo de animaciones son como una roca pesada que se cae, ya que baja lentamente y golpea contra el suelo rápidamente, con un ruido estrepitoso.

Para utilizar una animación de entrada lenta, al igual que sucede con las animaciones lineales y de salida lenta, puede aplicar las palabras clave correspondientes:

{% highlight css %}
transition: transform 500ms ease-in;
{% endhighlight %}

Sin embargo, desde el punto de vista de la interacción, las entradas lentas son poco comunes debido a su final abrupto. Los objetos que se mueven en el mundo real tienden a desacelerar en lugar de, simplemente, detenerse totalmente. Las entradas lentas también poseen el efecto perjudicial de desacelerar demasiado la animación como para continuar, lo que tendrá un impacto negativo en la percepción de la receptividad de su sitio o su aplicación.

##Animaciones de entrada y salida lenta

El hecho de incluir tanto entradas como salidas lentas es similar a un auto que acelera y desacelera y, si se las usa juiciosamente, puede proporcionar un efecto más dramático que si solo se utilizaran salidas lentas.

<img src="imgs/ease-in-out.png" style="max-width: 300px" alt="Ease-in-out animation curve." />

{% link_sample _code/box-move-ease-in-out.html %}Ver una animación de entrada y salida lentas{% endlink_sample %}

Aquí se debe tener precaución para que la duración de la animación no sea demasiado prolongada, con el fin de evitar la lentitud del inicio con entrada lenta de la animación. Comúnmente, las animaciones que se encuentran entre los 300 y los 500 ms serán correctas, pero el número exacto dependerá, en gran medida, de las características del proyecto. Dicho esto, si realiza un inicio lento, una sección intermedia rápida y un final lento, logrará un mayor contraste en la animación, lo que podría resultar bastante satisfactorio para los usuarios.

Para lograr una animación de entrada y salida lentas, puede utilizar la palabra clave `ease-in-out` de las CSS:

{% highlight css %}
transition: transform 500ms ease-in-out;
{% endhighlight %}


