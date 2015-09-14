---
title: "Elección de la aceleración adecuada"
description: "Elija la aceleración adecuada para su proyecto, ya sea entrada lenta, salida lenta o ambos. ¡Sea flexible y pruebe nuevos efectos!"
updated_on: 2014-10-21
translation_priority: 0
key-takeaways:
  code:
    - "Utilice las animaciones de salida lenta para los elementos de la IU; una salida lenta Quintic es una aceleración muy atractiva, aunque enérgica."
    - "Asegúrese de utilizar la duración de la animación. Las salidas lentas y las entradas lentas deben ser de entre 200 ms y 500 ms, mientras que los rebotes y las aceleraciones elásticas deben tener una duración más prolongada de entre 800 ms y 1.200 ms."
---
<p class="intro">
  Ahora que ya analizamos las diferentes opciones disponibles para acelerar las animaciones, ¿qué tipo debería utilizar en sus proyectos y qué tipos de duraciones deben tener sus animaciones?
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

En términos generales, una **salida lenta** será la llamada correcta y, sin dudas, un buen parámetro predeterminado. Se inicia rápidamente, y sus animaciones ofrecerán un aspecto de receptividad (que es lo ideal), pero con una agradable reducción de la velocidad al final.

Existe un grupo de ecuaciones de salida lenta reconocidas que van más allá de la especificada en la palabra clave `ease-out` de las CSS, las cuales varían en cuanto a niveles de ‘agresividad’. Para aplicar un efecto de salida lenta súper enérgica, considere la idea de utilizar una [salida Quintic](http://easings.net/#easeOutQuint).

<img src="imgs/quintic-ease-out-markers.png" alt="A Quintic ease-out animation curve" style="max-width: 300px"/>

{% link_sample _code/box-move-quintic-ease-out.html %}Ver una animación de salida lenta Quintic{% endlink_sample %}

El resto de las ecuaciones de aceleración, especialmente los rebotes y las aceleraciones elásticas, se deben utilizar con moderación y solo cuando sean adecuadas para su proyecto. Algunos efectos hacen que el usuario interrumpa la experiencia, como las animaciones estridentes. Si su proyecto no es alegre y divertido, no incluya elementos de IU que reboten por toda la página. Por el contrario, si realiza un sitio que debe ser alegre y divertido, entonces no dude en colocar el efecto de rebote.

Intente diferentes aceleraciones; descubra cuáles coinciden con la personalidad de su proyecto y utilícelas. En [easings.net](http://easings.net) podrá encontrar una lista completa de los tipos de aceleraciones, junto con las demostraciones correspondientes.

## Seleccione la duración correcta para las animaciones

Es importante que las animaciones que se agregan a su proyecto tengan la duración correcta. Si la animación es demasiado breve, se considerará agresiva y grosera; si es demasiado larga, será entorpecedora e irritante.

* **Salidas lentas: aproximadamente entre 200 ms y 500 ms**. De este modo, el ojo puede captar la animación, pero no se considera entorpecedora.
* **Entradas lentas: aproximadamente entre 200 ms y 500 ms**. Tenga en cuenta que se sacudirá al final y ningún cambio que se realice en la sincronización podrá suavizar esa sensación.
* **Efectos de rebote o elásticos: aproximadamente entre 800 ms y 1.200 ms**. Debe asignar tiempo suficiente para que el efecto de rebote o elástico se ‘asiente’. Sin este tiempo adicional, la parte de rebote elástico de la animación será realmente agresiva y poco placentera para la visión.

Recuerde que estas son solo algunas recomendaciones. Experimente con sus propias aceleraciones y elija las que combinan mejor con sus proyectos.


