---
title: "Sincronización asimétrica de las animaciones"
description: "Romper la simetría les proporciona contraste a sus proyectos y los hace atractivos. Aprenda cuándo y cómo aplicarlo en sus proyectos."
updated_on: 2014-10-21
translation_priority: 0
key-takeaways:
  code:
    - "Utilice las animaciones asimétricas para agregarles personalidad y contraste a sus trabajos."
    - "Siempre debe favorecer la interacción del usuario. Para ello, utilice duraciones más cortas cuando deba dar una respuesta a las pulsaciones o los clics, y reserve las duraciones más lentas para los momentos en los que no debe hacerlo."
---
<p class="intro">
  Gracias a la asimetría de la duración de las animaciones, se mejora la experiencia del usuario, ya que esto le permite expresar su personalidad y, al mismo tiempo, responder rápidamente a las interacciones del usuario. Además, se genera un contraste en la apariencia, lo que hace que la interfaz sea más atractiva.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

Al igual que la mayoría de las "reglas" de animación, debe probar qué funciona mejor para su aplicación, pero cuando se hace referencia a los aspectos de la experiencia del usuario, está a la vista que los usuarios son impacientes. La regla de oro es que **siempre se debe responder rápidamente a la interacción del usuario**. Dicho esto, la mayoría del tiempo, la acción del usuario es asimétrica, por lo que la animación también puede ser asimétrica.

Por ejemplo, cuando un usuario pulsa para que aparezca la navegación de la barra lateral, debe lograr que eso se muestre en la pantalla tan pronto como sea posible, con una duración de 100 ms aproximadamente. No obstante, cuando el usuario descarta el menú, puede probar animar la vista un poco más lentamente, digamos que con una marca de 300 ms aproximadamente.

Por el contrario, cuando debe mostrar una vista modal, generalmente la utilizará para mostrar un error o algún otro mensaje importante. En ese caso, deberá mostrar la vista de una forma un poco más lenta, nuevamente con una marca de 300 ms aproximadamente, pero si se realiza la acción de descarte, que generalmente desencadena el usuario, esto se debe realizar muy rápido.

Por consiguiente, la regla de oro general es la siguiente:

* En el caso de las animaciones de la IU que se desencadenan a partir de la interacción del usuario, como las transiciones de vistas o cuando se muestra un elemento, realice una introducción rápida (duración corta), pero un cierre lento (duración más larga).
* En el caso de las animaciones de la IU que se desencadenan a partir de su código, como los errores o las vistas modales, realice una introducción más lenta (duración más larga), pero un cierre rápido (duración corta).


