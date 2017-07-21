project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Obtén información acerca de cómo el navegador construye los árboles del DOM y el CSSOM.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-03-31 #}

# Construcción del modelo de objetos {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Para que el navegador pueda representar la página, debe construir los árboles del DOM y el CSSOM. En consecuencia, debemos asegurarnos de proporcionar lenguaje de marcado HTML y CSS al navegador lo más rápido posible.


### TL;DR {: .hide-from-toc }
- Bytes → caracteres → tokens → nodos → modelo de objetos.
- El lenguaje de marcado HTML se transforma en un Document Object Model (DOM) y el lenguaje de marcado CSS se transforma en un CSS Object Model (CSSOM).
- DOM y CSSOM son estructuras de datos independientes.
- Timeline de Chrome DevTools nos permite capturar e inspeccionar los costos de construcción y procesamiento del DOM y CSSOM.


## Document Object Model (DOM)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom.html){: target="_blank" .external }

Comencemos con el caso más sencillo: una página HTML estándar, con un poco de texto y una sola imagen. ¿Cómo el navegador procesa esta página?

<img src="images/full-process.png" alt="Proceso de construcción del DOM">

1. **Conversión:** el navegador lee los bytes sin procesar del HTML del disco o de la red y los traduce en caracteres individuales según la codificación especificada del archivo (por ejemplo, UTF-8).
1. **Conversión en tokens:** el navegador convierte cadenas de caracteres en tokens diferentes&mdash;especificados por el [estándar W3C HTML5](http://www.w3.org/TR/html5/){: .external }; por ejemplo, "&lt;html&gt;", "&lt;body&gt;"&mdash;y otras cadenas entre paréntesis angulares. Cada token tiene un significado especial y un conjunto de reglas propio.
1. **Lexicalización:** los tokens emitidos se convierten en "objetos" que definen sus propiedades y reglas.
1. **Construcción del DOM:** Por último, debido a que el lenguaje de marcado HTML define relaciones entre etiquetas diferentes (algunas etiquetas están contenidas en otras), los objetos creados se vinculan en una estructura de datos en forma de árbol que también captura las relaciones entre objetos primarios y secundarios definidas en el lenguaje de marcado original: el objeto _HTML_ es un elemento primario del objeto _body_, el objeto _body_ es un elemento primario del objeto _paragraph_, etc.

<img src="images/dom-tree.png"  alt="Árbol del DOM">

**El resultado final de todo este proceso es el Document Object Model (DOM) de nuestra página simple, que el navegador usa para todos los demás procesamientos de la página.**

Cada vez que el navegador procesa el lenguaje de marcado HTML, realiza todos los pasos que se mencionan más arriba: convertir bytes en caracteres, identificar tokens, convertir tokens en nodos y compilar el árbol del DOM. Todo este proceso puede tardar un poco, especialmente si hay mucho HTML para procesar.

<img src="images/dom-timeline.png"  alt="Seguimiento de la construcción del DOM en DevTools">

Note: Supondremos que conoces algo de Chrome DevTools; es decir, que sabes capturar una cascada de red o registrar una línea de tiempo. Si necesitas un actualizador rápido, lee la <a href='/web/tools/chrome-devtools/'>documentación de Chrome DevTools</a>; si recién comienzas a usar DevTools, te recomendamos realizar el curso <a href='http://discover-devtools.codeschool.com/'>Discover DevTools</a> (descubre DevTools) de Codeschool.

Si abres Chrome DevTools y registras una línea de tiempo mientras se carga la página, puedes ver el tiempo necesario para este paso. En el ejemplo anterior, la conversión de un fragmento de HTML en un árbol del DOM tardó ~5 ms. Respecto de una página más grande, este proceso puede durar mucho más. Cuando creas animaciones fluidas, puede convertirse fácilmente en un cuello de botella si el navegador debe procesar grandes cantidades de HTML.

El árbol del DOM captura las propiedades y relaciones del lenguaje de marcado del documento, pero no muestra indicios sobre el aspecto que debe tener el elemento al representarse Esa es tarea del CSSOM.

## CSS Object Model (CSSOM)

Mientras el navegador construía el DOM de nuestra página simple, encontró una etiqueta de vínculo en el encabezado del documento que hacía referencia a una hoja de estilo CSS externa: style.css. Previendo que necesita este recurso para representar la página, envía de inmediato una solicitud de este recurso, que regresa con el siguiente contenido:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/style.css" region_tag="full" adjust_indentation="auto" %}
</pre>

Podríamos haber declarado nuestros estilos directamente en el lenguaje de marcado HTML (integrado), pero mantener la independencia de nuestro lenguaje de marcado CSS respecto del HTML nos permite abordar el contenido y el diseño como dos temas independientes: los diseñadores pueden trabajar en CSS, los programadores en HTML, etc.

Al igual que con HTML, debemos convertir las reglas de CSS recibidas en algo que el navegador comprenda y con lo que pueda trabajar. Por lo tanto, repetimos el proceso de HTML, pero para CSS en lugar de HTML:

<img src="images/cssom-construction.png"  alt="Pasos para la construcción del CSSOM">

Los bytes del CSS se convierten en caracteres, luego en tokens y nodos y, por último, se vinculan en una estructura de árbol conocida como "CSS Object Model" (CSSOM):

<img src="images/cssom-tree.png"  alt="Árbol del CSSOM">

¿Por qué el CSSOM tiene una estructura de árbol? Al computar el conjunto final de estilos para cualquier objeto de la página, el navegador comienza por la regla aplicable más general para ese nodo (por ejemplo, si es un campo secundario del elemento body, se aplican todos los estilos de body) y luego define mejor y de manera recursiva los estilos computados aplicando reglas más específicas; es decir, las reglas se ordenan en cascada de forma "descendente".

Para ser más concretos, considera el árbol del CSSOM anterior. El texto de la etiqueta _span_ que se coloca en el elemento body tiene un tamaño de fuente de 16 píxeles y es de color rojo; el orden de tamaño de fuente se encuentra en una jerarquía de órdenes descendentes desde el elemento body hasta el elemento span. No obstante, si la etiqueta span es el elemento secundario de una etiqueta paragraph (p) no se mostrará su contenido.

Ten en cuenta también que el árbol anterior no es el árbol completo del CSSOM y en él solo se muestran los estilos que decidimos anular en nuestra hoja de estilos. Cada navegador proporciona un conjunto de estilos predeterminado, también conocidos como "estilos de usuario-agente"&mdash;lo que vemos cuando no proporcionamos los nuestros&mdash;y nuestros estilos simplemente anulan a los predeterminados (por ejemplo, [estilos de IE predeterminados](http://www.iecss.com/){: .external }).

Para averiguar cuánto demora el procesamiento de CSS, puedes registrar una línea de tiempo en DevTools y buscar el evento "Recalculate Style": a diferencia del análisis del DOM, la línea de tiempo no muestra una entrada "Parse CSS" independiente y, en su lugar, captura el análisis y la construcción del árbol del CSSOM, además del cálculo recursivo de los estilos computados en este evento.

<img src="images/cssom-timeline.png"  alt="Seguimiento de la construcción del CSSOM en DevTools">

Nuestras hojas de estilo simples demoran ~0,6ms en procesarse y afectan a 8 elementos de la página; no mucho, pero una vez más, no es gratis. Sin embargo, ¿de dónde vienen los 8 elementos? El CSSOM y el DOM son estructuras de datos independientes. Resulta que el navegador está escondiendo un paso importante. A continuación, hablaremos sobre el [árbol de representación](/web/fundamentals/performance/critical-rendering-path/render-tree-construction) que vincula al DOM y el CSSOM.

<a href="render-tree-construction" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Render-Tree Construction">
  <button>A continuación: Construcción, diseño y color del árbol de representación</button>
</a>


{# wf_devsite_translation #}
