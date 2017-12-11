project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript suele activar cambios visuales. Algunas veces, lo hace directamente mediante manipulaciones de estilo y, otras veces, mediante cálculos que generarán cambios visuales, como la búsqueda o clasificación de algunos datos. El JavaScript sincronizado incorrectamente o de larga ejecución puede ser una causa común de los problemas de rendimiento, y debes intentar minimizar su impacto siempre que sea posible.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-20 #}

# Reduce el alcance y la complejidad de los cálculos de estilo {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Si se modifica el DOM, mediante la adición y la eliminación de elementos, la modificación de los atributos o 
las clases, o a través de la animación, el navegador recalculará 
los estilos de los elementos y, en muchos casos, el diseño (o el reprocesamiento) de la página o partes de 
esta. Este proceso se denomina <em>cálculo de estilo computado</em>.

La primera parte del cómputo de estilos consiste en crear un conjunto de selectores de coincidencias. Básicamente, esto supone que el navegador identifique clases, seudoselectores e identificadores que se aplican a cada elemento en particular.

La segunda parte del proceso consiste en recopilar todas las reglas de estilo de los selectores de coincidencias y descifrar los estilos finales del elemento. En Blink (motor de representación de Chrome y Opera), estos procesos son, al menos en la actualidad, bastante equivalentes en términos de exigencia:

> Alrededor del 50% del tiempo que se emplea para calcular el estilo computarizado de un elemento se usa para unir selectores, y la otra mitad del tiempo se usa para construir la RenderStyle (representación de estilo computarizado) de reglas compatibles.
> Rune Lillesveen, Opera / [Invalidación de estilos en Blink](https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/view)

### TL;DR {: .hide-from-toc }

* Reduce la complejidad de tus selectores; usa una metodología centrada en la clase, como BEM.
* Reduce la cantidad de elementos en los que se deban realizar cálculos de estilo.

## Reduce la complejidad de tus selectores

En el caso más simple, se hace referencia a un elemento de tu CSS que posee una sola clase:


    .title {
      /* styles */
    }


Sin embargo, a medida que un proyecto se expande, es probable que como resultado haya CSS más complejas. De esto podrían surgir selectores como los siguientes:


    .box:nth-last-child(-n+1) .title {
      /* styles */
    }


Para definir si se deben aplicar determinados estilos, el navegador se debe preguntar lo siguiente: “¿Es este un elemento con una clase de título cuyo elemento principal que resulta ser el atributo minus nth child más un elemento con una clase de cuadro?”. Definir esto puede llevar mucho tiempo, según el selector empleado y el navegador en cuestión. El comportamiento deseado del selector se podría cambiar, como alternativa, por una clase:


    .final-box-title {
      /* styles */
    }


Tal vez no estés de acuerdo con el nombre de la clase, pero el trabajo ahora será mucho más simple para el navegador. En la versión anterior, para que el navegador determine, por ejemplo, si un elemento es el último de su tipo, debe tener información completa sobre los demás elementos y determinar si hay otros elementos luego de este que podrían ser nth-last-child. Esto probablemente suponga una exigencia mucho mayor si se compara con solo hacer coincidir el selector con el elemento porque su clase coincide.

## Reduce la cantidad de elementos a los que se les aplica estilo
Otra consideración de rendimiento, que normalmente representa _el factor más importante para muchas actualizaciones de estilo_, es el volumen verdadero de trabajo que se debe llevar a cabo cuando cambia un elemento.

En términos generales, la peor situación en términos de exigencia al calcular el estilo computado de los elementos es la cantidad de elementos multiplicados por el conteo del selector, ya que cada elemento se debe revisar al menos una vez con cada estilo para ver si hay coincidencia.

Note: Anteriormente, si se modificaba una clase en, por ejemplo, el elemento del cuerpo, se debían recalcular los estilos computarizados de todos los elementos secundarios de la página. Afortunadamente, esto ya no sucede porque, en su lugar, algunos navegadores incorporan un pequeño conjunto de reglas exclusivas para cada elemento. Si estas se modifican, se calculan nuevamente los estilos del elemento. Eso significa que puede o no ser necesario recalcular un elemento según el lugar que ocupa en el árbol y de lo que se cambió específicamente.

A menudo, los cálculos de estilo se pueden dirigir directamente a unos pocos elementos en lugar de invalidar la página completa. En los navegadores modernos, esto ya no es un problema importante porque no necesariamente deben verificar todos los elementos que podrían resultar afectados por un cambio. Por otro lado, los navegadores anteriores no siempre están tan optimizados para estas tareas. Cuando puedas, debes **reducir la cantidad de elementos invalidados**.

Note: Si se encuentra en Web Components, es importante notar que los cálculos de estilo aquí son diferentes, ya que, de manera predeterminada, los estilos no atraviesan el límite del Shadow DOM, y su ámbito se define en relación con los componentes individuales en lugar de hacerlo con respecto al árbol en general. Sin embargo, en general, se sigue aplicando el mismo concepto: los árboles más pequeños con reglas más simples se procesan más eficientemente que los árboles grandes o las reglas complejas.

## Medición del costo de recalcular el estilo

La forma más simple y eficiente de medir el costo de recalcular el estilo es utilizar el modo Timeline de DevTools de Chrome. Para comenzar, abre DevTools, accede a la pestaña Timeline, presiona Record e interactúa con tu sitio. Cuando interrumpas la grabación, verás algo similar a lo que se muestra en la imagen siguiente.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/long-running-style.jpg"  alt="DevTools muestra cálculos de estilo de larga ejecución.">

En la franja de la parte superior se muestran los fotogramas por segundo y, si ves barras que pasan por encima de la línea inferior (la línea de 60 fps), significa que los fotogramas son de ejecución prolongada.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/frame-selection.jpg"  alt="Ampliación del área problemática en Chrome DevTools.">

Si hay un fotograma de ejecución prolongada durante algún tipo de interacción, como el desplazamiento o algún otro tipo de interacción, será necesario realizar un examen más profundo.

Si te aparece un bloque grande color violeta, como se muestra anteriormente, haz clic en el registro para obtener más detalles.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/style-details.jpg"  alt="Obtención de detalles sobre cálculos de estilo de larga ejecución.">

En esta captura se muestra un evento Recalculate Style de ejecución prolongada que solo tarda un poco más de 18 ms y tiene lugar durante un desplazamiento, lo cual provoca una sacudida notable en la experiencia.

Si haces clic en el evento, recibirás una pila de llamadas, a través de las cuales se identifica el punto de tu JavaScript en el cual se activa el cambio de estilo. Además, también podrás conocer la cantidad de elementos afectados por el cambio (en este caso, un poco más de 400) y el tiempo que tardaron los cálculos de estilo. Puedes usar esta información para tratar de encontrar problemas en tu código y solucionarlos.

## Uso del enfoque Bloque, elemento, modificador

Los enfoques de codificación, como [BEM (Bloque, elemento, modificador)](https://bem.info/){: .external }, en realidad, se integran entre los beneficios de rendimiento del selector que busca coincidencias que se mencionaron anteriormente, ya que recomiendan que todo tenga una sola clase y, donde es necesario contar con una jerarquía, también se integran en el nombre de la clase:


    .list { }
    .list__list-item { }


Si necesitas algún tipo de modificador, como en el ejemplo anterior (en el cual deseamos hacer algo especial por el último campo secundario), puedes agregarlo de la siguiente manera:


    .list__list-item--last-child {}


Si buscas una forma eficiente de organizar tu CSS, el enfoque de BEM será un muy buen punto de partida; no solo desde el punto de vista de la estructura, sino también debido a las simplificaciones de búsqueda de estilo.

Si no te gusta el enfoque BEM, existen otras formas de usar tu CSS, pero las consideraciones de rendimiento deben evaluarse junto con la ergonomía del enfoque.

## Recursos

* [Invalidación de estilos en Blink](https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/edit)
* [BEM (Bloquear, Elemento, Modificador)](https://bem.info/){: .external }


{# wf_devsite_translation #}
