---
title: "Animaciones y rendimiento"
description: "Las animaciones deben funcionar correctamente; de lo contrario, tendrán un impacto negativo en la experiencia del usuario."
updated_on: 2014-10-21
translation_priority: 0
key-takeaways:
  code:
    - "Debe procurar que sus animaciones no causen problemas de rendimiento. Asegúrese de conocer el impacto de animar una determinada propiedad de la CSS (hoja de estilos en cascada)."
    - "Las propiedades de animación que modifican las características geométricas de la página (diseño) o que generan efectos de pintura son particularmente costosas."
    - "Siempre que pueda, limítese a realizar cambios en las propiedades transforms y opacity."
    - "Utilice <code>will-change</code> para asegurarse de que el navegador sepa lo que desea animar."
related-guides:
  blocking-css:
  -
      title: "Render Blocking CSS"
      href: fundamentals/performance/critical-rendering-path/render-blocking-css.html
      section:
        title: "Ruta crítica de representación"
        href: performance/critical-rendering-path/
---
<p class="intro">
  Cada vez que se hace una animación, se deben mantener 60 fotogramas/s, ya que los usuarios notarán los parpadeos o las obstrucciones, y esto tendrá un impacto negativo en sus experiencias.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

La animación de propiedades no es gratuita, y algunas propiedades son menos costosas que otras para animar. Por ejemplo, si se animan las propiedades `width` y `height` de un elemento, se modifica su geometría y esto podría causar que otros elementos de la página se desplacen o cambien de tamaño. Este proceso se denomina diseño (o redistribución en los navegadores basados en Gecko, como Firefox) y puede ser costoso si en su página hay muchos elementos. Cada vez que se genera un diseño, generalmente, se deberá pintar la página o parte de ella, lo que suele ser más costoso que la operación de diseño.

Siempre que sea posible, debe evitar animar propiedades que requieran diseños o pintura. En el caso de los navegadores más modernos, esto significa limitar las animaciones a `opacity` o `transform`, ya que ambas propiedades se pueden optimizar, en gran medida, a través del navegador, independientemente de si la animación se utiliza mediante JavaScript o CSS.

Podrá encontrar una lista completa de los trabajos generados mediante propiedades individuales de CSS en [Desencadenadores de CSS](http://csstriggers.com), y podrá encontrar una guía completa sobre cómo crear [Animaciones de alto rendimiento en HTML5 Rocks](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/).

{% include shared/related_guides.liquid inline=true list=page.related-guides.blocking-css %}

### Uso de la propiedad will-change

Le recomendamos utilizar [`will-change`](http://dev.w3.org/csswg/css-will-change/) para asegurarse de que el navegador sepa que desea modificar la propiedad de un elemento. De este modo, el navegador puede aplicar las optimizaciones más adecuadas antes de que usted realice el cambio. Sin embargo, se debe tener precaución de no utilizar demasiado `will-change`, ya que esto podría hacer que el navegador malgaste los recursos, lo que, a su vez, podría generar incluso más problemas de rendimiento.

La regla de oro es que, si la animación se puede desencadenar en los próximos 200 ms, ya sea mediante la interacción de un usuario o debido al estado de su aplicación, es una buena idea aplicar la propiedad will-change en los elementos animados. En la mayoría de los casos, entonces, cualquier elemento de la vista actual de su aplicación que decida animar debe tener la propiedad`will-change` habilitada para poder modificar las propiedades. En el caso del ejemplo del cuadro que utilizamos en las guías anteriores, la adición de `will-change` para los atributos transforms y opacity se vería de la siguiente manera:

{% highlight css %}
.box {
  will-change: transform, opacity;
}
{% endhighlight %}

Ahora bien, los navegadores compatibles con esto, actualmente Chrome, Firefox y Opera, realizarán las optimizaciones adecuadas en la memoria física para que se puedan aplicar los cambios o las animaciones en dichas propiedades.

## Rendimiento de CSS en comparación con JavaScript

Existen muchas páginas y comentarios en la web, en los que se tratan las ventajas relativas de las animaciones de CSS y JavaScript desde la perspectiva del rendimiento. A continuación, le presentamos algunos aspectos que debe tener en cuenta:

* Las animaciones basadas en CSS generalmente se manejan en un subproceso independiente del "subproceso principal" del navegador, donde se ejecutan el estilo, el diseño, la pintura y JavaScript. Esto significa que, si el navegador está ejecutando algunas tareas costosas en el subproceso principal, es muy probable que las animaciones basadas en CSS se sigan ejecutando sin interrupciones. Los cambios en las propiedades transforms y opacity se pueden realizar, en la mayoría de los casos, en el mismo subproceso que las animaciones basadas en CSS, que se denomina "subproceso compositor", por lo que le recomendamos que utilice este método para sus animaciones.
* Si alguna animación desencadena pintura, diseño o ambos, se necesitará que el "subproceso principal» haga el trabajo. Esto se aplica a las animaciones basadas en CSS y en JavaScript, y es probable que la sobrecarga de diseño o pintura reduzca la cantidad de trabajo asociado con la ejecución de CSS o JavaScript, por lo que el dilema seguiría siendo debatible.

Si desea saber exactamente qué trabajo se desencadena debido a la animación de una determinada propiedad, visite [Desencadenadores de CSS](http://csstriggers.com) para obtener más información.


