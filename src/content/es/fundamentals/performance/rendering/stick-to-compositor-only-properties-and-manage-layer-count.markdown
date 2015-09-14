---
title: "Limítese solo a las propiedades del compositor y administre el recuento de capas"
description: "Composición hace referencia al proceso en el que las partes pintadas de la página se unen para mostrarlas en la pantalla."
updated_on: 2015-03-20
translation_priority: 0
notes:
  flip:
    - "Si le preocupa no poder limitar las animaciones a estas propiedades, consulte el<a href='http://aerotwist.com/blog/flip-your-animations'>principio FLIP (Primero, Último, Invertir, Reproducir)</a>, que puede ayudarlo a reasignar las animaciones a los cambios de las propiedades transforms y opacity desde propiedades más costosas."
key-takeaways:
  - Limítese a los cambios de transform y opacity para sus animaciones.
  - Promueva el movimiento de los elementos con las propiedades will-change o translateZ.
  - Evite usar en exceso las reglas de promoción; las capas requieren memoria y administración.
---
<p class="intro">
  Composición hace referencia al proceso en el que las partes pintadas de la página se unen para mostrarlas en la pantalla.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

En esta área, hay dos factores clave que afectan el rendimiento de la página: la cantidad de capas del compositor que se deben administrar y las propiedades que utiliza para las animaciones.

## Uso de los cambios en las propiedades transform y opacity para las animaciones
En la versión con mejor rendimiento de la canalización de píxeles, se evitan tanto el diseño como la pintura, y solo se deben realizar cambios en la composición:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-no-layout-paint.jpg" class="g--centered" alt="The pixel pipeline with no layout or paint.">

Para lograrlo, debe limitarse a las propiedades de cambio que se pueden manejar mediante el compositor. En la actualidad, esto se aplica solo a dos propiedades: **transforms** y **opacity**:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/safe-properties.jpg" class="g--centered" alt="The properties you can animate without triggering layout or paint.">

La advertencia sobre el uso de transforms y opacity es que el elemento en el que cambiará estas propiedades se debe encontrar en _la capa de su propio compositor_. Para poder crear una capa, debe promover el elemento. Hablaremos de esto a continuación.

{% include shared/remember.liquid title="Note" list=page.notes.flip %}

## Promoción de los elementos que desea animar

Como mencionamos en la sección “[Simplificación de la complejidad de la pintura y reducción de las áreas de pintura](simplify-paint-complexity-and-reduce-paint-areas)”, debe promover los elementos que desea animar (dentro de lo razonable; no lo haga en exceso) a su propia capa:

{% highlight css %}
.moving-element {
  will-change: transform;
}
{% endhighlight %}

O bien, en el caso de los navegadores anteriores o aquellos que no son compatibles con will-change:

{% highlight css %}
.moving-element {
  transform: translateZ(0);
}
{% endhighlight %}

De este modo, se le advierte al navegador sobre el ingreso de cambios y, según lo que desee cambiar, es posible que el navegador tome medidas; por ejemplo, mediante la creación de capas del compositor.

## Administre las capas y evite las explosiones de capas

Resulta tentador, al saber que las capas suelen contribuir al rendimiento, promover todos los elementos de su página con algo como lo siguiente:

{% highlight css %}
* {
  will-change: transform;
  transform: translateZ(0);
}
{% endhighlight %}

Esta es una forma indirecta de decir que le gustaría promover cada elemento de la página. El problema es que cada capa que crea requiere memoria y administración, y eso no es gratuito. De hecho, en los dispositivos con memoria limitada, el impacto en el rendimiento puede pesar más que cualquier beneficio de crear una capa. Todas las texturas de las capas se deben cargar en la GPU (Unidad de procesamiento gráfico), por lo que hay aún más restricciones con respecto a la banda ancha entre la CPU (Unidad central de procesamiento) y la GPU, y con respecto a la memoria disponible para texturas en la GPU.

En resumenn, **no promueva elementos innecesariamente**.

## Uso de DevTools de Chrome para comprender las capas de su aplicación

Para poder comprender las capas de su aplicación y por qué un elemento posee una capa, debe habilitar el generador de perfiles Paint en la sección Timeline de DevTools de Chrome:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/paint-profiler.jpg" class="g--centered" alt="The toggle for the paint profiler in Chrome DevTools.">

Cuando se active esta herramienta, debe iniciar una grabación. Cuando la grabación haya finalizado, podrá hacer clic en cada uno de los marcos, que se encuentran entre las barras de marcos por segundos y los detalles:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-of-interest.jpg" class="g--centered" alt="A frame the developer is interested in profiling.">

Si hace clic aquí, aparecerá una nueva opción en los detalles: la pestaña Layer.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-tab.jpg" class="g--centered" alt="The layer tab button in Chrome DevTools.">

A través de esta opción, se generará una nueva vista que le permitirá hacer una panorámica, analizar y agrandar todas las capas durante dicho marco, junto con los motivos por los que se creó cada capa.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-view.jpg" class="g--centered" alt="The layer view in Chrome DevTools.">

Si utiliza esta vista, podrá realizar un seguimiento del número de capas que posee. Si demora mucho tiempo en la composición durante acciones críticas para el rendimiento, como el desplazamiento o las transiciones (debe intentar lograr, aproximadamente, **4 o 5 ms**), puede utilizar esta información para saber cuántas capas tiene y por qué se crearon, y, a partir de allí, administrar el recuento de capas en su aplicación.


