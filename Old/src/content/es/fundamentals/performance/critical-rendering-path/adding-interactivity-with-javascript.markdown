---
title: "Añadir interactividad con JavaScript"
description: "JavaScript nos permite modificar casi cualquier aspecto de la página: el contenido, el estilo y su comportamiento según las interacciones del usuario. Sin embargo, JavaScript también puede bloquear la creación de DOM y retrasar la visualización de la página. Para ofrecer un rendimiento óptimo, define que JavaScript sea asíncrono y elimina todo el contenido JavaScript innecesario de la ruta de publicación importante."
updated_on: 2014-09-18
key-takeaways:
  adding-interactivity:
    - JavaScript puede enviar consultas a DOM y CSSOM y modificarlos.
    - La ejecución de JavaScript crea bloqueos en CSSOM.
    - JavaScript bloquea la creación de DOM a no ser que se declare expresamente como asíncrono.
---
<p class="intro">
  JavaScript nos permite modificar casi cualquier aspecto de la página: el contenido, el estilo y su comportamiento según las interacciones del usuario. Sin embargo, JavaScript también puede bloquear la creación de DOM y retrasar la visualización de la página. Para ofrecer un rendimiento óptimo, define que JavaScript sea asíncrono y elimina todo el contenido JavaScript innecesario de la ruta de publicación importante.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.adding-interactivity %}

JavaScript es un lenguaje dinámico que se ejecuta en el navegador y nos permite modificar casi cualquier aspecto del comportamiento de la página: podemos añadir o suprimir elementos del árbol DOM para modificar el contenido de la página, podemos modificar las propiedades CSSOM de cada elemento, podemos gestionar la información introducida del usuario y mucho más. Para ilustrar esta acción, vamos a ampliar nuestro ejemplo anterior de `Hola, mundo` con una secuencia de comandos integrada sencilla:

{% include_code src=_code/script.html snippet=full %}

* JavaScript nos permite echar mano de DOM y obtener la referencia al nodo de alcance oculto. Puede que el nodo no se muestre en el árbol de publicación, pero aun así sabemos que se encuentra en DOM. Después, una vez obtenida la referencia, podemos cambiar el texto (con `.textContent`) e incluso anular la propiedad de estilo de visualización calculada de `none` (ninguna) a `inline` (integrada). Una vez finalizada esta modificación, en nuestra página se mostrará el texto `**Hello interactive students!`.**

* JavaScript también nos permite crear, aplicar estilo, y añadir y suprimir elementos nuevos a DOM. De hecho, técnicamente, toda nuestra página podría limitarse a un archivo JavaScript grande que cree elementos y les aplique estilo de uno en uno. Esto funcionaría, pero en la práctica es mucho más fácil trabajar con HTML y CSS. En la segunda parte de nuestra función JavaScript podemos crear un elemento `div` nuevo, definir su contenido de texto, aplicarle estilo y añadirlo al cuerpo.

<img src="images/device-js-small.png" class="center" alt="vista previa de la página">

Así, hemos modificado el contenido y el estilo CSS de un nodo DOM existente. Además, hemos añadido un nodo completamente nuevo al documento. Puede que no ganemos ningún premio de diseño con la página, pero ilustra la capacidad y la flexibilidad que JavaScript nos ofrece.

Sin embargo, hay una gran advertencia de rendimiento subyacente. JavaScript nos proporciona muchas opciones, pero también crea muchas limitaciones adicionales sobre cómo y cuándo se muestra la página.

En primer lugar, podemos ver en el ejemplo anterior que nuestra secuencia de comandos integrada se encuentra cerca del final de la página. ¿La razón? Puedes intentarlo personalmente, pero, si colocamos la secuencia de comandos antes del elemento _span_, verás que la secuencia de comandos falla e indica que no encuentra ninguna referencia a elementos _span_ en el documento, es decir, _getElementsByTagName('span')_ ofrece _null_ como resultado. Esto muestra una propiedad importante: nuestra secuencia de comandos se ejecuta en el punto exacto en el que se inserta en el documento. Cuando el analizador HTML se topa con una etiqueta de secuencia de comandos, pone en pausa el proceso de creación de DOM y transfiere el control al motor de JavaScript; una vez se acabe de ejecutar el motor de JavaScript, el navegador retoma la actividad donde la dejó y reactiva la creación de DOM.

Dicho de otro modo, nuestro bloque de secuencia de comandos no encuentra ningún elemento más adelante en la página porque aún no se han procesado. O, expresado con ciertas diferencias: **al ejecutar nuestra secuencia de comandos integrada se bloquea la creación de DOM, que también retrasa la publicación inicial.**

Otra propiedad sutil de introducir secuencias de comandos en la página es que no solo pueden leer y modificar DOM, sino también las propiedades de CSSOM. De hecho, eso es exactamente lo que hacemos en el ejemplo al cambiar la propiedad de visualización del elemento `span` de `none` a `inline`. ¿Cuál es el resultado final? Hemos obtenido una condición de carrera.

¿Qué pasa si el navegador no ha acabado de descargar y crear CSSOM cuando queremos ejecutar nuestra secuencia de comandos? La respuesta es sencilla y no muy favorable para el rendimiento: **el navegador retrasa la ejecución de la secuencia de comandos hasta que acaba de descargar y crear CSSOM, y, mientras esperamos, la creación de DOM también está bloqueada.**

En resumen, JavaScript introduce muchas dependencias nuevas entre la ejecución de DOM, CSSOM y JavaScript y puede provocar retrasos importantes en la velocidad con la que el navegador procesa y presenta nuestra página en pantalla:

1. La ubicación de la secuencia de comandos en el documento es importante.
2. La creación de DOM se pone en pausa al topar con una etiqueta de secuencia de comandos y hasta que la secuencia de comandos se haya acabado de ejecutar.
3. JavaScript puede enviar consultas a DOM y CSSOM y modificarlos.
4. La ejecución de JavaScript se retrasa hasta que CSSOM esté a punto.

Cuando hablamos de `optimizar la ruta de publicación importante`, en gran medida hablamos de entender y optimizar el gráfico de dependencia entre HTML, CSS y JavaScript.


## Bloqueo del analizador frente a JavaScript asíncrono

De forma predeterminada, la ejecución de JavaScript supone un `bloqueo del analizador`: cuando el navegador se topa con una secuencia de comandos en el documento, tiene que poner en pausa la creación de DOM, transferir el control al tiempo de ejecución de JavaScript y dejar que la secuencia de comandos se ejecute antes de continuar con la creación de DOM. Ya hemos visto esta situación en acción con una secuencia de comandos integrada en el ejemplo anterior. De hecho, las secuencias de comandos integradas siempre bloquean el analizador, a no ser que tengas especial cuidado en escribir código adicional para posponer su ejecución.

¿Qué pasa con las secuencias de comandos incluidas mediante una etiqueta de secuencia de comandos? Vamos a echar mano del ejemplo anterior para extraer el código y copiarlo en un archivo diferente:

{% include_code src=_code/split_script.html snippet=full %}

**app.js**

{% include_code src=_code/app.js snippet=full lang=javascript %}

¿Es previsible que el orden de ejecución sea diferente cuando usamos una etiqueta `<script>` en vez de un fragmento JavaScript integrado? Por supuesto que no, ya que son idénticos y deberían tener el mismo comportamiento. En ambos casos el navegador se tendrá que detener y ejecutar la secuencia de comandos antes de poder procesar el resto del documento. Sin embargo, **en caso de que usemos un archivo JavaScript externo, el navegador también tendrá que detenerse y esperar a que se obtenga la secuencia de comandos del disco, de la memoria caché o de un servidor remoto, de modo que el retraso puede suponer decenas de milisegundos más en la ruta de publicación importante.**

De todas formas, tenemos una escotilla de emergencia. De forma predeterminada, todo JavaScript bloquea el analizador y el navegador no conoce el plan de acción de la secuencia de comandos en la página, de modo que se pone en la peor situación y por eso bloquea el analizador. Sin embargo, ¿qué pasaría si pudiéramos avisar al navegador de que la secuencia de comandos no se tiene que ejecutar en el preciso momento en el que se le hace referencia en el documento? Si le avisamos, el navegador podrá seguir creando DOM y dejará que la secuencia de comandos se ejecute una vez preparada, es decir, una vez el archivo se haya obtenido de la memoria caché o de un servidor remoto.

Entonces, ¿cómo llevamos a cabo este truco? Es muy sencillo: hay que marcar la secuencia de comandos como asíncrona (`_async_:`).

{% include_code src=_code/split_script_async.html snippet=full %}

Si añadimos la palabra clave `async` a la etiqueta de secuencia de comandos, se informa al navegador de que no bloquee la creación de DOM mientras espera a que la secuencia de comandos esté disponible. El rendimiento se mejora en gran medida.



