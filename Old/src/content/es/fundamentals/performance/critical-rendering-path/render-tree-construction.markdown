---
title: "Construcción del árbol de visualización, diseño y representación final"
description: "Los árboles de CSSOM y de DOM se combinan en el árbol de visualización, que se usa para calcular el diseño de cada elemento visible y sirve como base para la representación final que nos permite ver los píxeles en la pantalla. La optimización de cada uno de estos pasos es fundamental para lograr un buen rendimiento en el procesamiento."
updated_on: 2014-09-18
key-takeaways:
  render-tree-construction:
    - "Los árboles de DOM y de CSSOM se combinan para formar el árbol de visualización."
    - "El árbol de visualización solo contiene los nodos necesarios para mostrar la página."
    - "El diseño calcula la posición y el tamaño exactos de cada objeto."
    - "La representación final usa el árbol de visualización y lo traduce en los píxeles que vemos en pantalla."
notes:
  hidden:
    - "Como nota aparte, recuerda que <code>visibility: hidden</code> no es lo mismo que <code>display: none</code>. El primero hace que el elemento sea invisible, pero este seguirá ocupando espacio en el diseño (por ejemplo, se muestra como un cuadro vacío). En cambio, el segundo <code>display: none</code> elimina el elemento por completo del árbol de visualización, por lo que deja de formar parte del diseño."
---
<p class="intro">
  Los árboles de CSSOM y de DOM se combinan en el árbol de visualización, que se usa para calcular el diseño de cada elemento visible y sirve como base para la representación final por la que aparecen los píxeles en la pantalla. La optimización de cada uno de estos pasos es fundamental para lograr un buen rendimiento en el procesamiento.
</p>


En la sección anterior sobre la construcción del modelo de objetos, creamos los árboles de DOM y de CSSOM según las indicaciones del código HTML y de los estilos CSS. Sin embargo, ambos son objetos independientes que interpretan aspectos distintos del documento: uno describe el contenido, y el otro las reglas de estilo que deben aplicarse al documento. ¿Cómo combinamos los dos para hacer que el navegador muestre los píxeles correspondientes en la pantalla?

{% include shared/takeaway.liquid list=page.key-takeaways.render-tree-construction %}

El primer paso es que el navegador combine el DOM y el CSSOM en un árbol de visualización que recopile todo el contenido visible del DOM en la página y toda la información de estilos del CSSOM en cada nodo.

<img src="images/render-tree-construction.png" alt="El DOM y el CSSOM se combinan para crear el árbol de visualización" class="center">

Para construir el árbol de visualización, el navegador, por lo general, hace lo siguiente:

1. Desde el nivel superior del árbol de DOM, analiza cada nodo visible.
  * Algunos nodos no son visibles en absoluto (por ejemplo, las etiquetas de una secuencia de comandos, las metaetiquetas, etc.) y se omiten, ya que no se mostrarán en la página final.
  * Algunos nodos se ocultan mediante estilos CSS y también se omiten en el árbol de visualización, como el nodo `span` del ejemplo anterior, que se omite en el árbol de visualización porque hemos declarado explícitamente la propiedad `display: none`.
1. En cada nodo visible, busca las reglas de CSSOM apropiadas y las aplica.
2. Emite nodos visibles con contenido y con los estilos que se aplicarán.

{% include shared/remember.liquid list=page.notes.hidden %}

El resultado final es una página que incluye contenido e información de los estilos en todo el contenido visible de la pantalla. Ya falta menos.  **Una vez que tenemos el árbol de visualización, podemos pasar a la fase de diseño.**

Hasta el momento, hemos calculado qué nodos deberían ser visibles y qué estilos se aplicarán, pero no hemos calculado su posición exacta en la [ventana gráfica]({{site.fundamentals}}/layouts/rwd-fundamentals/set-the-viewport.html) del dispositivo. Esto se lleva a cabo en la fase de diseño.

Para calcular el tamaño y la posición exactos de cada objeto, el navegador empieza por el nivel superior del árbol de visualización y pasa de nodo en nodo analizando la geometría de cada objeto de la página. Veamos un ejemplo práctico:

{% include_code src=_code/nested.html snippet=full %}

El cuerpo de la página anterior contiene dos elementos `div` anidados: el primer `div` (el principal) establece el tamaño de pantalla del nodo en un 50% del ancho de la ventana gráfica; y el segundo, dentro del `div` principal, establece el ancho en un 50% del `div` principal (que puede ocupar un 25% del ancho de la ventana gráfica)

<img src="images/layout-viewport.png" alt="Cálculo de los datos de diseño" class="center">

El resultado del proceso de diseño es un modelo de cuadros en el que se representa de forma precisa la posición y el tamaño exactos de cada elemento de la ventana gráfica: todas las medidas relativas se convierten en posiciones de píxeles absolutas en la pantalla, y así sucesivamente.

Por último, ya sabemos qué nodos son visibles, que estilos se aplicarán y la geometría de los elementos de la página. Por fin podemos usar esta información en la fase final, en la que convertiremos cada nodo del árbol de visualización en píxeles, un proceso también conocido como `entramado`.

¿Todo claro hasta ahora? Cada paso exige al navegador una cantidad considerable de trabajo, por lo que a veces se necesita algo más de tiempo para completarlos. Afortunadamente, Chrome DevTools puede ofrecerte alfo de información sobre los tres pasos que hemos descrito. Veamos cómo funciona la fase de diseño en este ejemplo tan original de `hello world`:

<img src="images/layout-timeline.png" alt="Medir el diseño en DevTools" class="center">

* El evento `Layout` recopila en la cronología la construcción del árbol de visualización y el cálculo de la posición y del tamaño.
* Cuando el diseño está completo, el navegador emite los eventos `Paint Setup` y `Paint`, que convierten el árbol de visualización en píxeles.

El tiempo invertido en construir el árbol de visualización, en la fase de diseño y en la de representación final varía según el tamaño del documento, los estilos aplicados y, por supuesto, el dispositivo en que se ejecute el proceso. Cuanto más grande sea el documento, más trabajo debe realizar el navegador; y cuanto más complicados sean los estilos, más tiempo llevará la representación final (por ejemplo, es fácil representar un color básico, pero representar una sombra consume más recursos).

Y por fin podemos ver nuestra página en la ventana gráfica. ¡Genial!

<img src="images/device-dom-small.png" alt="Página `Hello World`" class="center">

Repasemos rápidamente todos los pasos que debe seguir el navegador:

1. Procesar el lenguaje de marcado HTML y construir el árbol de DOM
2. Procesar el lenguaje de marcado CSS y construir el árbol de CSSOM
3. Combinar el DOM y el CSSOM en un árbol de visualización
4. Ejecutar el diseño en el árbol de visualización para procesar la geometría de cada nodo
5. Representar cada nodo en la pantalla

Nuestra página de ejemplo puede parecer simple, pero requiere bastante trabajo. ¿Adivinas lo que pasaría si se modificara el DOM o el CSSOM? El navegador debería repetir el mismo proceso para averiguar qué píxeles debe mostrar en la pantalla.

**La optimización de la ruta de renderización importante es el proceso de minimizar el tiempo total invertido en los pasos del 1 al 5 de la secuencia anterior.** Esta permite mostrar el contenido en la pantalla lo antes posible y también reduce la cantidad de tiempo entre las actualizaciones de pantalla tras la primera visualización, por ejemplo, para lograr una mayor tasa de refresco para el contenido interactivo.



