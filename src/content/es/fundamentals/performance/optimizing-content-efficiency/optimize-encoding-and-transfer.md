project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Después de eliminar las descargas de recursos innecesarias, lo mejor que podemos hacer para mejorar la velocidad de carga de la página es minimizar el tamaño general de las descargas optimizando y comprimiendo los recursos restantes.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-03-31 #}

# Optimización de la codificación y el tamaño de transferencia e recursos basados en texto {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Después de eliminar las descargas de recursos innecesarios, lo mejor que puedes hacer para mejorar la velocidad de carga de la página es minimizar el tamaño general de las descargas optimizando y comprimiendo los recursos restantes.


## Compresión de datos 101

Una vez que hayas eliminado los recursos innecesarios, el siguiente paso será comprimir los recursos restantes que el navegador debe descargar. Según el tipo de recurso texto &mdash;imágenes, fuentes, etc.&mdash;, disponemos de varias técnicas diferentes: herramientas genéricas que se pueden habilitar en el servidor, optimizaciones previas al procesamiento para tipos de contenido específicos y optimizaciones específicas para los recursos que requieren la intervención del programador.

Para proporcionar el mejor rendimiento, se debe combinar todas esas técnicas.

### TL;DR {: .hide-from-toc }
* La compresión es el proceso de codificación de información mediante el uso de pocos bits.
* La eliminación de datos innecesarios siempre proporciona los mejores resultados.
* Existe una gran cantidad de técnicas y algoritmos de compresión diferentes.
* Necesitarás diferentes técnicas para lograr la mejor compresión.


El proceso de reducción del tamaño de los datos se conoce como *compresión de datos*. Muchas personas han dedicado toda su carrera a trabajar en algoritmos, técnicas y optimizaciones para mejorar las relaciones de compresión, la velocidad y los requisitos de memoria de varios compresores. El tratamiento de la compresión de datos en detalle está fuera del alcance de este tema. Sin embargo, es importante comprender en profundidad el funcionamiento de la compresión y las técnicas con las que cuentas para reducir el tamaño de varios recursos que tus páginas necesitan.

Para ilustrar los principios centrales de estas técnicas, considera el proceso para optimizar el formato simple de un mensaje de texto que se inventó para este ejemplo:

    # Below is a secret message, which consists of a set of headers in
    # key-value format followed by a newline and the encrypted message.
    format: secret-cipher
    date: 08/25/16
    AAAZZBBBBEEEMMM EEETTTAAA

1. Los mensajes pueden contener anotaciones arbitrarias que se indican mediante el prefijo “#”. Las anotaciones no afectan el significado ni otros comportamientos del mensaje.
2. Los mensajes pueden contener “encabezados” que son pares clave-valor (separados por “:”) y aparecen al comienzo del mensaje.
3. Los mensajes pueden presentar cargas de texto.

¿Qué podrías hacer para reducir el tamaño del mensaje anterior, que actualmente tiene 200 caracteres?

1. El comentario es interesante pero en realidad no afecta el significado del mensaje. Elimínalo cuando transmites el mensaje.
2. Existen buenas técnicas para codificar encabezados de forma eficaz. Por ejemplo, si sabes que todos los mensajes tienen “formato” y “fecha”, podrías convertirlos en ID enteros cortos y enviar esos ID. Dicho esto, no estamos seguros de que este sea el caso y por ello hazlo a un lado por el momento.
3. La carga es solo texto y, si bien no sabemos cuál es su contenido (aparentemente, usa un “mensaje secreto”), con solo observar el texto nos damos cuenta de que contiene mucha redundancia. Quizá, en lugar de enviar letras repetidas, podrías contar la cantidad de letras repetidas y codificarlas de forma más eficaz. Por ejemplo, “AAA” se convierte en “3A”, que representa una secuencia de tres A.


La combinación de estas técnicas produce el siguiente resultado:

    format: secret-cipher
    date: 08/25/16
    3A2Z4B3E3M 3E3T3A

El nuevo mensaje tiene 56 caracteres. Esto significa que has comprimido el mensaje original en un increíble 72%.

Todo esto es genial, pero ¿cómo nos ayuda a optimizar nuestras páginas web? No vamos a intentar inventar nuestros propios algoritmos de compresión. Sin embargo, como puedes ver, podemos usar las mismas técnicas y la misma forma de pensar para optimizar varios recursos en nuestras páginas: procesamiento previo, optimizaciones específicas para el contexto y diferentes algoritmos para diferente contenido.


## Minificación: procesamiento previo y optimizaciones específicas para el contexto

### TL;DR {: .hide-from-toc }
- Las optimizaciones de contenido específico pueden reducir notablemente el tamaño de los recursos proporcionados.
- Las optimizaciones de contenido específico se aplican mejor como parte de tu ciclo de compilación y lanzamiento.


La mejor manera de comprimir datos redundantes o innecesarios es eliminarlos. No podemos simplemente borrar datos arbitrarios. No obstante, en algunos contextos en los que podemos conocer el formato de los datos del contenido y sus propiedades en general se puede reducir notablemente el tamaño de la carga sin afectar su significado.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minify.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/optimizing-content-efficiency/minify.html){: target="_blank" .external }

Considera la página HTML sencilla anterior y los tres tipos de contenido diferentes que contiene: lenguaje de marcado HTML, estilos CSS y JavaScript. Cada uno de estos tipos de contenido tiene diferentes reglas para lo que conforma el contenido válido, diferentes reglas para indicar comentarios, etc. ¿Cómo podemos reducir el tamaño de esta página?

* Los comentarios de código son el mejor amigo del programador, pero no es necesario que el navegador los vea. Con solo quitar los comentarios en CSS (`/* … */`), HTML (`<!-- … -->`) y JavaScript (`// …`) podemos reducir notablemente el tamaño total de la página.
* Un compresor de CSS “inteligente” podría detectar que usamos una técnica ineficaz para definir reglas de ‘.awesome-container’ y contraer las dos declaraciones para formar una sin afectar otros estilos, con lo cual se liberarán más bytes.
* Whitespace (espacios y pestañas) es una función conveniente para desarrolladores que trabajan con HTML, CSS y JavaScript. Un compresor adicional podría quitar todas las pestañas y los espacios.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minified.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/optimizing-content-efficiency/minified.html){: target="_blank" .external }

Una vez aplicados los pasos anteriores, nuestra página pasa de 406 a 150 caracteres, lo que significa un ahorro del 63% en compresión. Concedido. No es muy legible, pero tampoco debe serlo: puedes conservar la página original como tu “versión de desarrollo” y luego aplicar los pasos anteriores cuando estés listo para lanzar la página en tu sitio web.

Demos un paso atrás. En el ejemplo anterior se ilustra un punto importante: un compresor multipropósito&mdash;digamos, uno diseñado para comprimir texto arbitrario&mdash;quizás podría hacer un buen trabajo de compresión de la página anterior, pero jamás podría tener capacidad para eliminar comentarios, contraer las reglas de CSS o hacer muchas otras optimizaciones específicas del contenido. Por eso el procesamiento previo, la minificación y la optimización pertinente al contenido pueden ser herramientas muy poderosas.

Note: Un buen ejemplo es la versión de desarrollo sin compresión de la biblioteca JQuery, que se está acercando a los ~300 KB. La misma biblioteca, aunque reducida (sin comentarios, etc.) es aproximadamente 3 veces más pequeña: ~100 KB.

De igual manera, las técnicas anteriores se pueden extender más allá de los recursos basados en texto. Las imágenes, los videos y otros tipos de contenido tienen sus propias formas de metadatos y diferentes cargas. Por ejemplo, cada vez que sacas una foto con una cámara, la foto incorpora mucha información adicional: configuración de la cámara, ubicación, etc. Según la app, estos datos pueden ser críticos (por ejemplo, un sitio donde se comparten fotos) o completamente obsoletos y deberías considerar si vale la pena eliminarlos. En la práctica, estos metadatos pueden sumar decenas de kilobytes por cada imagen.

En pocas palabras, como primer paso en la optimización de la eficiencia de tus recursos, crea un inventario de los diferentes tipos de contenidos y considera las optimizaciones de contenido que puedes aplicar para reducir su tamaño. Luego, cuando determines cuáles son, automatiza esas optimizaciones agregándolas a tus procesos de compilación y lanzamiento. Es la única manera de garantizar que las optimizaciones perduren.

## Compresión de texto con GZIP

### TL;DR {: .hide-from-toc }
- GZIP ofrece el mejor rendimiento en recursos basados en texto: CSS, JavaScript, HTML.
- Todos los navegadores modernos admiten compresión GZIP y la solicitarán automáticamente.
- Tu servidor debe estar configurado para habilitar la compresión GZIP.
- Algunas CDN requieren atención especial para garantizar que la compresión GZIP esté habilitada.


[GZIP](https://en.wikipedia.org/wiki/Gzip) es un compresor genérico que se puede aplicar a cualquier transmisión de bytes. De forma imperceptible, este recuerda el contenido que detectó anteriormente e intenta buscar y reemplazar fragmentos de datos duplicados de forma eficaz. (Si te interesa, puedes consultar esta [excelente explicación simple de GZIP](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s).) No obstante, en la práctica, GZIP ofrece mejores resultados con contenido basado en texto y generalmente alcanza índices de compresión del 70 al 90% para archivos más grandes, mientras que la ejecución de GZIP en recursos ya comprimidos mediante algoritmos alternativos (por ejemplo, la mayoría de los formatos de imagen) no ofrece un beneficio significativo.

Todos los navegadores modernos admiten y negocian automáticamente la compresión GZIP para todas las solicitudes HTTP. Debes garantizar que el servidor esté configurado correctamente para proporcionar el recurso comprimido cuando el cliente lo solicite.


<table>
<thead>
  <tr>
    <th>Biblioteca</th>
    <th>Tamaño</th>
    <th>Tamaño comprimido</th>
    <th>Índice de compresión</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="library">jquery-1.11.0.js</td>
  <td data-th="size">276 KB</td>
  <td data-th="compressed">82 KB</td>
  <td data-th="savings">70%</td>
</tr>
<tr>
  <td data-th="library">jquery-1.11.0.min.js</td>
  <td data-th="size">94 KB</td>
  <td data-th="compressed">33 KB</td>
  <td data-th="savings">65%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.js</td>
  <td data-th="size">729 KB</td>
  <td data-th="compressed">182 KB</td>
  <td data-th="savings">75%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.min.js</td>
  <td data-th="size">101 KB</td>
  <td data-th="compressed">37 KB</td>
  <td data-th="savings">63%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.css</td>
  <td data-th="size">118 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">85%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.min.css</td>
  <td data-th="size">98 KB</td>
  <td data-th="compressed">17 KB</td>
  <td data-th="savings">83%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.css</td>
  <td data-th="size">186 KB</td>
  <td data-th="compressed">22 KB</td>
  <td data-th="savings">88%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.min.css</td>
  <td data-th="size">146 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">88%</td>
</tr>
</tbody>
</table>

En la tabla anterior se ilustra el ahorro en compresión que puedes lograr con GZIP para algunas de las bibliotecas JavaScript y algunos de los frameworks de CSS. El rango de ahorro en la compresión oscila entre el 60 y el 88%, y la combinación de los archivos reducidos (identificados con la extensión “.min” en sus nombres) con la compresión GZIP te brinda un ahorro mayor.

1. **Primero, aplica optimizaciones de contenido: minificadores CSS, JS y HTML.**
1. **Aplica GZIP para comprimir el resultado minificado.**

La habilitación de GZIP es una de las optimizaciones más sencillas y beneficiosas que se pueden implementar (lamentablemente, muchos se olvidan de hacerlo). La mayoría de los servidores web comprimen el contenido en tu nombre y solo deberás verificar que el servidor esté configurado correctamente para comprimir todos los tipos de contenido que se benefician con la compresión GZIP.

El proyecto HTML5 Boilerplate contiene [ejemplos de archivos de configuración](https://github.com/h5bp/server-configs) para todos los servidores más populares con comentarios detallados para cada marcador de configuración y cada ajuste. Para determinar cuál es la mejor configuración para tu servidor, haz lo siguiente: 
* Encuentra tu servidor favorito en la lista.
* Busca la sección GZIP.
* Confirma que tu servidor esté configurado con los ajustes recomendados

<img src="images/transfer-vs-actual-size.png"  alt="Demostración en DevTools del tamaño real frente al de transferencia">

Una forma rápida y simple de ver a GZIP en acción es abrir Chrome DevTools e inspeccionar la columna “Size/Content” en el panel Network: “Size” indica el tamaño de transferencia del recurso y “Content” el tamaño del recurso sin comprimir. Para el recurso HTML del ejemplo anterior, GZIP ahorró 98,8 KB durante la transferencia.

Note: A veces, GZIP aumenta el tamaño del recurso. Generalmente, esto ocurre cuando el recurso es muy pequeño y la sobrecarga del diccionario de GZIP supera lo que se ahorra en la compresión o cuando el recurso ya está bien comprimido. Algunos servidores te permiten especificar un umbral de tamaño de archivo mínimo para evitar este problema.

Por último, si bien la mayoría de los servidores comprimen automáticamente los recursos al proporcionárselos a los usuarios, algunas CDN requieren especial atención y esfuerzo manual para garantizar que se proporcione el recurso GZIP. Audita tu sitio y asegúrate de que tus recursos [se compriman](http://www.whatsmyip.org/http-compression-test/).


{# wf_devsite_translation #}
