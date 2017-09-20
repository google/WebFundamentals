project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: PENDIENTE

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-03-31 #}

# Construcción, diseño y pintura del árbol de representación {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Los árboles CSSOM y DOM se combinan en un árbol de representación. A continuación, este árbol se utiliza
para computarizar el diseño de cada elemento visible y sirve como entrada del
proceso de pintura que permite representar los píxeles en la pantalla. Para lograr un óptimo rendimiento de representación, es imprescindible optimizar cada uno de estos 
pasos.

En la sección anterior de la construcción del modelo de objeto, construimos los árboles DOM y
CSSOM a partir de la entrada de HTML y CSS. Sin embargo, ambos
son objetos independientes que capturan distintos aspectos del documento: uno
describe el contenido y el otro describe las reglas de estilo que se
deben aplicar al documento. ¿Cómo los combinamos y logramos que el navegador represente
píxeles en la pantalla?

### TL;DR {: .hide-from-toc }
- Los árboles DOM y CSSOM se combinan para formar el árbol de representación.
- El árbol de representación solo contiene los nodos necesarios para representar la página.
- El diseño computariza la posición y el tamaño exactos de cada objeto.
- El último paso es la pintura, que recibe el árbol de representación final y representa los píxeles en la pantalla.


Primero, el navegador combina el DOM y el CSSOM en un “árbol de representación”, que captura todo el contenido visible del DOM en la página y toda la información de estilo del CSSOM para cada nodo.

<img src="images/render-tree-construction.png" alt="DOM y CSSOM se combinan para crear un árbol de representación." >

Para construir el árbol de representación, el navegador realiza algo parecido a lo siguiente:

1. Comenzando por la raíz del árbol del DOM, atraviesa cada nodo visible.

    * Algunos nodos no son visibles (por ejemplo, las etiquetas de secuencias de comandos, las metaetiquetas, etc.) y se omiten ya que no se reflejan en la salida representada.
    * Algunos nodos se ocultan a través de CSS y también se omiten del árbol de representación. Por ejemplo, el nodo span---del ejemplo anterior---no aparece en el árbol de representación porque hay una regla explícita que define la propiedad “display: none” en el nodo.

1. Para cada nodo visible, encuentra las adecuadas reglas de CSSOM y aplícalas.
1. Emite nodos visibles con contenido y sus estilos computarizados.

Note: Como nota al margen, observa que `visibility: hidden` es diferente de `display: none`. El primero provoca que el elemento sea invisible, pero el elemento sigue ocupando espacio en el diseño (es decir, se representa como un cuadro vacío). El segundo (`display: none`) quita completamente el elemento del árbol de representación; el elemento es invisible y no forma parte del diseño.

La salida final es una representación con el contenido y la información de estilo de todo el contenido visible en pantalla.  **Una vez preparado el árbol de representación, podemos continuar con la etapa de “diseño”.**

Hasta ahora, hemos calculado los nodos que deben ser visibles y sus estilos computarizados, pero no hemos calculado la posición y el tamaño exactos dentro de la [ventana de visualización](/web/fundamentals/design-and-ux/responsive/#set-the-viewport) del dispositivo.---Esta es la etapa de “diseño”, también llamada “reprocesamiento”.

Para conocer la posición y el tamaño exactos de cada objeto de la página, el navegador comienza su camino por la raíz del árbol de representación. Veamos un ejemplo simple y práctico:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/nested.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/nested.html){: target="_blank" .external }

El cuerpo de la página anterior tiene dos div anidados: el primer div (primario) configura el tamaño del nodo para que sea un 50% de la longitud de la ventana de visualización y el segundo div---(contenido en el primario)---configura el ancho para que sea el 50% de la longitud del primario (es decir, el 25% de la longitud de la ventana de visualización).

<img src="images/layout-viewport.png" alt="Calcular la información del diseño" >

El resultado del proceso de diseño es un “modelo de cuadro”, que precisamente captura la posición y el tamaño exactos de cada elemento en la ventana de visualización: todas las mediciones relativas se convierten a píxeles absolutos en la pantalla.

Por último, ahora que conocemos los nodos visibles, y su geografía y sus estilos computarizados, podemos pasar esta información a la etapa final, que convierte cada nodo del árbol de representación en píxeles reales en pantalla. Este paso se conoce normalmente como “pintura” o “rasterización”.

Puede demorar porque el navegador tiene que realizar bastante trabajo. Sin embargo, Chrome DevTools puede proporcionar un poco de información sobre las tres etapas descritas anteriormente. Analicemos la etapa de diseño para nuestro ejemplo de “hello world” original:

<img src="images/layout-timeline.png" alt="Medir el diseño en DevTools" >

* El evento “Layout” captura la construcción, la posición y el cálculo de tamaño del árbol de representación en la línea temporal.
* Cuando finaliza, el navegador produce los eventos “Paint Setup” y “Paint”, que convierten al árbol de representación en píxeles en la pantalla.

El tiempo necesario para realizar la construcción, el diseño y la pintura del árbol de representación varía según el tamaño del documento, los estilos aplicados y el dispositivo utilizado: mientras más grande sea el documento, más trabajo deberá realizar el navegador; mientras más complicados sean los estilos, más tiempo demorará la pintura (por ejemplo, es “barato” pintar un color sólido, pero una sombra paralela es “costosa” de computarizar y representar).

Finalmente, la página es visible en la ventana de visualización:

<img src="images/device-dom-small.png" alt="Página Hola mundo representada" >

A continuación, se describe un resumen de los pasos del navegador:

1. Procesó el lenguaje de marcado HTML y construyó el árbol de DOM.
1. Procesó el lenguaje de marcado CSS y construyó el árbol de CSSOM.
1. Combinó el DOM y el CSSOM en un árbol de representación.
1. Ejecutó diseño en el árbol de representación para calcular la geometría de cada nodo.
1. Pintó cada nodo en la pantalla.

Es posible que nuestra página de demostración parezca simple, pero requiere bastante trabajo. Si el DOM o el CSSOM se modifican, deberás repetir el proceso para conocer los píxeles que se deben representar nuevamente en la pantalla.

**_Optimizar la ruta de acceso de representación crítica_ es el proceso mediante el cual se minimiza la cantidad total de tiempo utilizado en los pasos 1 a 5 de la secuencia anterior.** Permite representar contenido en la pantalla lo más rápido posible y también disminuye la cantidad de tiempo entre actualizaciones de la pantalla tras la representación inicial; es decir, permite alcanzar mayores frecuencias de actualización para el contenido interactivo.

<a href="render-blocking-css" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Render-Blocking CSS">
  <button>A continuación: Bloqueo de representación de CSS</button>
</a>


{# wf_devsite_translation #}
