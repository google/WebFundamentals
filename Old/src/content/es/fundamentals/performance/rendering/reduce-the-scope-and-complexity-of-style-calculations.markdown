---
title: "Reducción del alcance y la complejidad de los cálculos de estilo"
description: "Si se modifica el DOM (Modelo de objetos de documento), mediante la adición y la eliminación de elementos, la modificación de los atributos o las clases, o a través de la animación, el navegador recalculará los estilos de los elementos y, en muchos casos, el diseño (o la redistribución) de la página o partes de esta. Este proceso se denomina cálculo de estilo computarizado."
updated_on: 2015-03-20
translation_priority: 0
notes:
  components:
    - "Si se encuentra en Web Components, es importante notar que los cálculos de estilo aquí son diferentes, ya que, de manera predeterminada, los estilos no atraviesan el límite de Shadow DOM, y su ámbito se define en relación con los componentes individuales en lugar de hacerlo con respecto al árbol en general. Sin embargo, en general, se sigue aplicando el mismo concepto: los árboles más pequeños con reglas más simples se procesan más eficientemente que los árboles grandes o las reglas complejas."
  bodystylechange:
    - "Anteriormente, si se modificaba una clase en, por ejemplo, el elemento del cuerpo, se debían recalcular los estilos computarizados de todos los elementos secundarios de la página. Afortunadamente, esto ya no sucede porque, en su lugar, algunos navegadores mantienen una pequeña colección de reglas exclusivas de cada elemento que, si se modifican, hacen que los estilos del elemento se recalculen. Eso significa que puede o no ser necesario recalcular un elemento según el lugar que ocupa en el árbol y de lo que se cambió específicamente."

key-takeaways:
  - "Reduzca la complejidad de sus selectores; utilice una metodología centrada en la clase, como BEM (Bloque, elemento, modificador)."
  - "Reduzca la cantidad de elementos en los que se deben realizar cálculos de estilo."

---
<p class="intro">
  Si se modifica el DOM (Modelo de objetos de documento), mediante la adición y la eliminación de elementos, la modificación de los atributos o las clases, o a través de la animación, el navegador recalculará los estilos de los elementos y, en muchos casos, el diseño (o la redistribución) de la página o partes de esta. Este proceso de denomina <em>cálculo de estilo computarizado</em>.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

La primera parte de los estilos computarizados consiste en crear un conjunto de selectores de coincidencias, que es, básicamente, cuando el navegador identifica qué clases, seudoselectores e identificadores se aplican a cada elemento en particular.

La segunda parte del proceso consiste en recopilar todas las reglas de estilo de los selectores de coincidencias y descifrar los estilos finales del elemento. En Blink (motor de representación de Chrome y Opera), estos procesos son, al menos en la actualidad, bastante equivalentes en costo:

<div class="quote" style="margin-top: 30px;">
  <div class="container">
    <blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">Aproximadamente, el 50 % del tiempo que se utiliza para calcular el estilo computarizado de un elemento se destina a los selectores de coincidencias, y la otra mitad del tiempo se utiliza para crear el RenderStyle (representación del estilo computarizado) a partir de las reglas que coinciden.
    <p>Rune Lillesveen, Opera / <a href="https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/edit">Invalidación de estilos en Blink</a></p>
    </blockquote>
  </div>
</div>


## Reducción de la complejidad de sus selectores

Uno de los casos más simples es cuando se hace referencia a un elemento de su CSS que posee una sola clase:

{% highlight css %}
.title {
  /* styles */
}
{% endhighlight %}

Sin embargo, a medida que un proyecto se hace más grande, es probable que el resultado sean CSS más complejas, lo que podría derivar en selectores como los siguientes:

{% highlight css %}
.box:nth-last-child(-n+1) .title {
  /* styles */
}
{% endhighlight %}

Para definir si se deben aplicar determinados estilos, el navegador se debe preguntar eficazmente lo siguiente: “¿Este es un elemento con una clase de título que posee un elemento primario que resulta ser el atributo minus nth child más un elemento con una clase de cuadro?”. Definir esto puede llevar mucho tiempo, según el selector utilizado y el navegador en cuestión. El comportamiento deseado del selector se podría cambiar, en su lugar, a una clase:

{% highlight css %}
.final-box-title {
  /* styles */
}
{% endhighlight %}

Tal vez no esté de acuerdo con el nombre de la clase, pero el trabajo ahora es mucho más simple para el navegador. En la versión anterior, para saber, por ejemplo, si un elemento es el último de su tipo, el navegador primero debe saber todo sobre los demás elementos, y debe saber si hay otros elementos luego de este que podrían ser nth-last-child, lo que es posiblemente mucho más costoso que solo hacer coincidir el selector con el elemento porque su clase coincide.

## Reducción de la cantidad de elementos a los que se les aplica estilo
Otra consideración de rendimiento, que es generalmente _el factor más importante para muchas actualizaciones de estilo_, es el volumen verdadero de trabajo que se debe llevar a cabo cuando cambia un elemento.

En términos generales, el peor costo de calcular el estilo computarizado de los elementos es la cantidad de elementos multiplicados por el conteo del selector, debido a que cada elemento se debe revisar al menos una vez con cada estilo para ver si coinciden.

{% include shared/remember.liquid title="Note" list=page.notes.bodystylechange %}

A menudo, los cálculos de estilo se pueden dirigir directamente a unos pocos elementos en lugar de invalidar la página completa. En los navegadores modernos, esto ya no es un problema importante porque el navegador no necesariamente debe verificar todos los elementos que podrían haber resultado afectados por un cambio. Por otro lado, los navegadores más viejos no siempre están tan optimizados para estas tareas. Where you can you should **reduce the number of invalidated elements**.

{% include shared/remember.liquid title="Note" list=page.notes.components %}

## Medición del costo de recalcular el estilo
La forma más simple y eficiente de medir el costo de recalcular el estilo es utilizar el modo Timeline de DevTools de Chrome. Para comenzar, abra DevTools, vaya a la pestaña Timeline, presione Record e interactúe con el sitio. Cuando haya dejado de grabar, verá algo similar a lo que se muestra en la imagen.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/long-running-style.jpg" class="g--centered" alt="DevTools showing long-running style calculations.">

En la franja de la parte superior se muestran los marcos por segundo y, si ve barras que pasan por encima de la línea inferior (la línea de 60 fotogramas/s), esto significa que posee marcos de larga ejecución.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/frame-selection.jpg" class="g--centered" alt="Zooming in on a trouble area in Chrome DevTools.">

Si posee un marco de larga ejecución durante algún tipo de interacción, como el desplazamiento o algún otro tipo de interacción, entonces es necesario realizar un examen más profundo.

Si le aparece un bloque grande color morado, como se muestra anteriormente, haga clic en el registro para obtener más detalles.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/style-details.jpg" class="g--centered" alt="Getting the details of long-running style calculations.">

En esta captura, se muestra un evento Recalcular estilo de larga ejecución que solo demora poco más de 18 ms y que se lleva a cabo durante un desplazamiento, lo que provoca una sacudida notable en la experiencia.

Si hace clic en el evento, recibirá una pila de llamadas, a través de lo cual se identifica el lugar de su JavaScript que es responsable de desencadenar el cambio de estilo. Además, también podrá conocer la cantidad de elementos que se vieron afectados por el cambio (en este caso, solo un poco más de 400 elementos), y cuánto se demoró en realizar los cálculos de estilo. Puede utilizar esta información para tratar de encontrar una solución en su código.

## Uso del enfoque Bloque, elemento, modificador
Los enfoques de codificación, como [BEM (Bloque, elemento, modificador)](https://bem.info/), en realidad, se integran entre los beneficios de rendimiento del selector que busca coincidencias que se mencionaron anteriormente, ya que recomiendan que todo tenga una sola clase y, donde es necesario contar con una jerarquía, también se integran en el nombre de la clase:

{% highlight css %}
.list { }
.list__list-item { }
{% endhighlight %}

Si necesita algún tipo de modificador, como el del ejemplo anterior en el que deseamos hacer algo especial para el último elemento secundario, puede agregarlo de la siguiente manera:

{% highlight css %}
.list__list-item--last-child {}
{% endhighlight %}

Si está buscando una forma eficiente de organizar su CSS, BEM es realmente un buen punto de partida, no solo desde el punto de vista de la estructura, sino también debido a las simplificaciones de búsqueda de estilo.

Si no le gusta el enfoque BEM, existen otras formas de utilizar su CSS, pero las consideraciones de rendimiento se deben evaluar junto con la ergonomía del enfoque.

## Recursos

* [Validación de estilo en Blink](https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/edit)
* [BEM (Bloque, elemento, modificador)](https://bem.info/)


