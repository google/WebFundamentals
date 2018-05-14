project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript nos permite modificar prácticamente todos los aspectos de la página, el contenido, el estilo y su respuesta ante la interacción del usuario. No obstante, JavaScript también puede bloquear la construcción del DOM y demorar la presentación de la página. Para obtener un rendimiento óptimo, haz que tu JavaScript sea asincrónico y elimina todo JavaScript innecesario desde la ruta de acceso de representación crítica.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2013-12-31 #}

# Agregar interactividad con JavaScript {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

JavaScript nos permite modificar prácticamente todos los aspectos de la página: contenido,
estilo y su respuesta ante la interacción del usuario. No obstante, JavaScript también puede
bloquear la construcción del DOM y demorar la presentación de la página. Para obtener un
rendimiento óptimo, haz que tu JavaScript sea asincrónico y elimina todo JavaScript innecesario
desde la ruta de acceso de representación crítica.

### TL;DR {: .hide-from-toc }
- JavaScript puede consultar y modificar el DOM y el CSSOM.
- La ejecución de JavaScript bloquea el CSSOM.
- JavaScript bloquea la construcción del DOM, a menos que se declare explícitamente como asincrónico.


JavaScript es un lenguaje dinámico que se ejecuta en un navegador y nos permite modificar prácticamente todos los aspectos del comportamiento de la página: podemos modificar contenido de la página agregando o eliminando elementos del árbol del DOM. También podemos modificar las propiedades del CSSOM de cada elemento y controlar las entradas del usuario, entre otras muchas opciones más. Para ilustrar esto, ampliemos nuestro ejemplo anterior "Hello World" con una sencilla secuencia de comandos integrada:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/script.html){: target="_blank" .external }

* JavaScript nos permite explorar el DOM y obtener la referencia a un nodo de intervalo oculto. Es posible que el nodo no esté visible en el árbol de representación, pero aún se encuentra en el DOM. Luego, una vez que tengamos la referencia, podemos cambiar su texto (mediante .textContent) e incluso anular su propiedad de estilo de visualización calculada pasando de "none" a "inline". Ahora nuestra página presenta "**Hello interactive students!**".

* JavaScript también nos permite crear nuevos elementos, aplicarles ajustes de estilo, también agregarlos al DOM y eliminarlos de él. Técnicamente, toda nuestra página podría ser un solo archivo JavaScript grande que nos permita crear los elementos y darles estilo uno por uno. Pese a que esto puede funcionar, en la práctica, es mucho más fácil usar HTML y CSS. En la segunda parte de nuestra función JavaScript, crearemos un nuevo elemento div, configuraremos su contenido de texto y lo adjuntaremos al cuerpo.

<img src="images/device-js-small.png"  alt="vista previa de la página">

Con esto, modificamos el contenido y el estilo de CSS de un nodo del DOM existente y agregamos un nodo completamente nuevo al documento. Nuestra página no ganará ningún premio de diseño, pero en ella se ilustrarán la capacidad y flexibilidad que JavaScript nos ofrece.

Sin embargo, si bien JavaScript nos brinda mucha capacidad, genera muchas limitaciones adicionales respecto de cómo y cuándo se representa la página.

Primero, ten en cuenta que en el ejemplo anterior nuestra secuencia de comandos integrada se encuentra cerca de la parte inferior de la página. ¿Por qué? Deberías probarlo tú mismo, pero si movemos la secuencia de comandos por encima del elemento _span_, verás que se producirá un error en esta y se te advertirá de que no puedes encontrar una referencia a ningún elemento _span_ en el documento; es decir, para _getElementsByTagName(‘span')_ se mostrará _null_. Esto demuestra una propiedad importante: nuestra secuencia de comandos se ejecuta en el punto exacto donde se inserta en el documento. Cuando el analizador de HTML encuentra una etiqueta de secuencia de comandos, pausa su proceso de construcción del DOM y delega el control al motor JavaScript. Una vez que este último termina de ejecutarse, el navegador reanuda el proceso y reanuda la construcción del DOM.

En otras palabras, nuestro bloque de secuencia de comandos no podrá encontrar elementos más adelante en la página, ya que aún no estarán procesados. Dicho de otro modo: **la ejecución de nuestra secuencia de comandos integrada bloquea la construcción del DOM, lo cual también demora la representación inicial.**

Otra propiedad discreta de la introducción de secuencias de comandos en nuestra página es que pueden leer y modificar no solo el DOM, sino también las propiedades de CSSOM. De hecho, eso es exactamente lo que estamos haciendo en nuestro ejemplo cuando cambiamos la propiedad de visualización del elemento span de none a inline. ¿El resultado final? Ahora nos hallamos ante una situación de competencia.

¿Qué ocurriría si el navegador no ha terminado de descargar y compilar el CSSOM cuando queramos ejecutar nuestra secuencia de comandos? La respuesta es simple y no muy buena para el rendimiento: **el navegador demora la ejecución de la secuencia de comandos y la construcción del DOM hasta haber terminado de descargar y construir el CSSOM.**

En resumen, JavaScript introduce muchas dependencias nuevas entre la ejecución del DOM, el CSSOM y JavaScript. Esto puede tener efectos adversos importantes en la velocidad con que el navegador procese y represente la página en la pantalla:

* La ubicación de la secuencia de comandos en el documento es importante.
* Cuando el navegador encuentra una etiqueta de secuencia de comandos, se pausa la construcción del DOM hasta que la secuencia de comandos termina de ejecutarse.
* JavaScript puede consultar y modificar el DOM y el CSSOM.
* La ejecución de JavaScript se pausa hasta que el CSSOM esté listo.

Cuando hablamos de "optimizar la ruta de acceso de representación crítica", en gran medida nos referimos a la comprensión y optimización del gráfico de dependencias entre HTML, CSS y JavaScript.

## Bloquear el analizador en comparación con JavaScript asincrónico

De forma predeterminada, la ejecución de JavaScript "bloquea el analizador": cuando el navegador encuentra una secuencia de comandos en el documento, debe pausar la construcción del DOM, delegar el control al tiempo de ejecución de JavaScript y permitir que la secuencia de comandos se ejecute antes de continuar con la construcción del DOM. Ya vimos esto en acción en un ejemplo anterior con una secuencia de comandos integrada. De hecho, las secuencias de comandos integradas siempre bloquean el analizador, a menos que tomes precauciones especiales y escribas código adicional para diferir su ejecución.

¿Qué ocurre con las secuencias de comandos que se incluyen mediante una etiqueta script? Volvamos a nuestro ejemplo anterior y extraigamos el código en un archivo independiente:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

**app.js**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/app.js" region_tag="full" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/split_script.html){: target="_blank" .external }

Ya sea que usemos una etiqueta de &lt;secuencia de comandos&gt; o un fragmento de JavaScript integrado, deberías
prever que ambos se comportarán de la misma manera. En ambos casos, el navegador pausa y
ejecuta la secuencia de comandos antes de poder procesar el resto del documento.
Sin embargo, **en caso de un archivo JavaScript externo, el navegador debe pausarse para
esperar que se obtenga la secuencia de comandos del disco, la caché o un servidor remoto, lo que
puede sumar cientos de milisegundos de demora a la ruta de acceso de
representación crítica.**

De forma predeterminada, JavaScript bloquea a los analizadores. Dado que el navegador no sabe qué es lo que planea hacer la secuencia de comandos en la página, supone el peor de los escenarios y bloquea el analizador. Una señal enviada al navegador de que "la secuencia de comandos no necesita ejecutarse en el punto exacto donde se hace referencia" permite que el navegador continúe construyendo el DOM y permite que la secuencia de comandos se ejecute cuando esté lista. Por ejemplo, luego de que el archivo se obtiene de la caché o un servidor remoto.  

Para lograrlo, marcamos nuestra secuencia de comandos como _async_:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/split_script_async.html){: target="_blank" .external }

Agregar la palabra clave async a la etiqueta de secuencia de comandos indica al navegador que no bloquee la construcción del DOM mientras espera que la secuencia de comandos esté disponible, lo que puede mejorar el rendimiento de manera significativa.

<a href="measure-crp" class="gc-analytics-event" data-category="CRP"
    data-label="Next / Measuring CRP">
  <button>A continuación: Medición de la ruta de representación crítica</button>
</a>


{# wf_devsite_translation #}
