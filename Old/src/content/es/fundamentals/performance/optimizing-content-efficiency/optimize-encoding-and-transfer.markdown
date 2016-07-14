---
title: "Optimizar la codificación y el tamaño de transferencia de los recursos basados en texto"
description: "Una vez eliminados todos los recursos innecesarios, hay que reducir el tamaño total del resto de recursos que el navegador tiene que descargar. Para la compresión se pueden utilizar algoritmos de compresión (GZip) genéricos y específicos del tipo de contenido."
updated_on: 2014-09-12
key-takeaways:
  compression-101:
    - "La compresión es el proceso de codificar información utilizando menos bits"
    - "Al eliminar los datos innecesarios se consiguen mejores resultados"
    - "Hay muchas técnicas y muchos algoritmos de compresión distintos"
    - "Necesitarás varias técnicas para conseguir la mejor compresión"
  minification:
    - "Las optimizaciones específicas del contenido pueden reducir significativamente el tamaño de los recursos entregados."
    - "Las optimizaciones específicas del contenido funcionan mejor si se aplican durante el período de creación/lanzamiento."
  text-compression:
    - "GZIP funciona mejor en recursos basados en texto: CSS, JavaScript, HTML"
    - "Todos los navegadores modernos admiten compresión GZIP y la solicitan automáticamente"
    - "Hay que configurar el servidor para que admita la compresión GZIP"
    - "Hay que prestar una atención especial a algunos CDN para garantizar que se habilita GZIP"
notes:
  jquery-minify:
    - "Veamos un caso de ejemplo: la versión de desarrollo descomprimida de la biblioteca JQuery ocupa casi 300 KB. La misma biblioteca minificada (con los comentarios suprimidos, etc.) se ha reducido a un tercio y ocupa aproximadamente 100 KB."
  gzip:
    - "Por increíble que parezca, en algunos casos GZIP puede aumentar el tamaño del recurso. Normalmente esto sucede cuando el recurso es muy pequeño y el coste global del diccionario GZIP es superior al ahorro de compresión o si el recurso ya está comprimido. Algunos servidores permiten especificar un `límite mínimo de tamaño de archivo` para evitar este problema."
---

<p class="intro">
  El ámbito, los objetivos y las funcionalidades de nuestras aplicaciones web siguen creciendo, y esto es bueno. Sin embargo, el avance incesante hacia una web más rica tiene otra consecuencia: la cantidad de datos descargados por las aplicaciones aumenta sin parar. Para ofrecer unos resultados increíbles debemos optimizar la entrega de todos los bytes de datos.
</p>

{% include shared/toc.liquid %}


## Compresión de datos 101

Una vez eliminados todos los recursos innecesarios, hay que reducir el tamaño total del resto de recursos que el navegador tiene que descargar. Para la compresión se pueden utilizar algoritmos de compresión (GZip) genéricos y específicos del tipo de contenido. En función del tipo de recurso (texto, imágenes, fuentes, etc.), tenemos distintas técnicas a nuestra disposición: herramientas genéricas que se pueden habilitar en el servidor, optimizaciones de preprocesamiento para tipos de contenido específicos y optimizaciones específicas del recurso que requieren una actuación por parte del desarrollador.

Para obtener el mejor resultado posible hay que combinar todas estas técnicas.

{% include shared/takeaway.liquid list=page.key-takeaways.compression-101 %}

El proceso de reducción del tamaño de los datos se conoce como `compresión de datos` y es un gran campo de estudio en sí mismo: muchas personas han dedicado toda su carrera profesional a los algoritmos, a las técnicas y a las optimizaciones para mejorar los índices de compresión, la velocidad y los requisitos de memoria de varios compresores. Evidentemente no vamos a abrir ahora un debate sobre este tema, pero es importante entender cómo funciona la compresión y las técnicas que tenemos a nuestra disposición para reducir el tamaño de varios recursos que nuestras páginas necesitan.

Para ilustrar los principios básicos de estas técnicas en acción, vamos a ver cómo podemos optimizar el formato de un mensaje de texto sencillo que nos inventaremos para la ocasión:

    # Este es un mensaje secreto formado por un conjunto de encabezados en formato
    # key-value seguidos por una nueva línea y por el mensaje encriptado.
    format: secret-cipher
    date: 04/04/14
    AAAZZBBBBEEEMMM EEETTTAAA

1. Los mensajes pueden contener anotaciones arbitrarias, precedidas por el prefijo `#`. Las anotaciones no afectan al significado ni a otros comportamientos del mensaje.
2. Los mensajes pueden contener `encabezados`, que son parejas key-value (separadas por `:`) que aparecen al inicio del mensaje.
3. Los mensajes llevan cargas de texto.

¿Qué podemos hacer para reducir el tamaño del mensaje anterior, que tiene una longitud de 200 caracteres?

1. El comentario es interesante, pero sabemos que realmente no influye en el significado del mensaje, así que lo eliminaremos al transmitir el mensaje.
2. Probablemente podemos utilizar algunas técnicas inteligentes para codificar encabezados de forma eficaz. Por ejemplo, no sabemos si todos los mensajes siempre contienen `formato` y `fecha`, pero si los tuvieran, podríamos convertirlos a ID enteros cortos y enviar únicamente esta información. Como no sabemos si este es el caso, nos olvidaremos de ello por ahora.
3. La carga está formada solo por texto y aunque desconocemos cuál es su contenido (parece que utiliza un `mensaje secreto`), solo con mirar el texto podemos ver que contiene muchas redundancias. Quizás en vez de enviar letras repetidas podríamos contar cuantas hay y encriptarlas de forma más eficaz.
    * P. ej., `AAA` se convierte en `3A` o en una secuencia de tres A.


Con la combinación de nuestras técnicas obtenemos el resultado siguiente:

    format: secret-cipher
    date: 04/04/14
    3A2Z4B3E3M 3E3T3A

El nuevo mensaje tiene una longitud de 56 caracteres, lo que significa que hemos podido comprimir el mensaje original hasta un 72%. No está mal para empezar.

Y ahora debes estar pensando: `Esto está muy bien, ¿pero cómo nos ayuda en la optimización de páginas web?`. Está claro que no vamos a intentar inventar nuestros propios algoritmos de compresión. Pero, como podrás ver, utilizaremos exactamente las mismas técnicas y el mismo enfoque para optimizar varios recursos en nuestras páginas: optimizaciones de preprocesamiento y específicas del contexto y algoritmos distintos para contenido distinto.


## Minificar: optimizaciones de preprocesamiento y específicas del contexto

{% include shared/takeaway.liquid list=page.key-takeaways.minification %}

La mejor forma de comprimir datos redundantes o innecesarios es eliminarlos completamente. Es obvio que no podemos limitarnos a eliminar los datos arbitrarios, pero en los casos en los que podamos conocer específicamente el contenido del formato de datos y sus propiedades, probablemente podremos reducir significativamente el tamaño de la carga sin afectar al significado real.

{% include_code src=_code/minify.html snippet=full %}

Piensa en la página HTML sencilla que hemos visto anteriormente y en los tres tipos de contenido distintos que se muestran: marcas HTML, estilos CSS y JavaScript. Cada uno de estos tipos de contenido tiene diferentes reglas para constituir marcas HTML válidas, reglas CSS o contenido JavaScript, reglas distintas para indicar comentarios, etc. ¿Cómo podemos reducir el tamaño de la página?

* Los comentarios de código son el mejor recurso para un desarrollador, pero no es necesario que el navegador los vea. Solo tienes que quitar los comentarios CSS (`/* ... */`), HTML (`<!-- ... -->`) y JavaScript (`// ...`), con lo que el tamaño total de la página se reduce significativamente.
* Un compresor de CSS `inteligente` podría detectar que estamos utilizando una forma poco eficaz de definir reglas para `.awesome-container` y reducir las dos declaraciones en una sin afectar a ningún otro estilo, con lo que aún ahorraríamos más bytes.
* El espacio en blanco (espacios y tabulaciones) es una convención de los desarrolladores en HTML, CSS y JavaScript. Un compresor adicional podría quitar todas las tabulaciones y todos los espacios.

^
{% include_code src=_code/minified.html snippet=full %}

Después de aplicar los pasos anteriores, la página pasa de 406 a 150 caracteres (el ahorro conseguido con la compresión es del 63%). Es cierto que no es muy cómodo de leer, pero tampoco es necesario que lo sea: podemos conservar la página original como nuestra `versión de desarrollo` y aplicar los pasos anteriores cuando estemos listos par publicar la página en nuestro sitio web.

Si volvemos al ejemplo anterior, podemos llegar a la conclusión de que un compresor general, por ejemplo uno diseñado para comprimir texto arbitrario, probablemente podría hacer un trabajo de compresión bastante bueno, pero no podría quitar los comentarios, reducir las reglas CSS o docenas de otras optimizaciones específicas del contenido. Este es el motivo por el que la optimización de preprocesamiento, de minificación y en función del contexto puede ser una herramienta tan útil.

{% include shared/remember.liquid list=page.notes.jquery-minify %}

Asimismo, las técnicas anteriores se pueden aplicar más allá de los recursos basados en texto. Tanto las imágenes como los vídeos y otro tipo de contenido contienen sus propias formas de metadatos y cargas varias. Por ejemplo, al hacer una foto con la cámara, se acostumbra a incrustar mucha información adicional en la foto: configuración de la cámara, ubicación, etc. Según la aplicación que se vaya a utilizar, estos datos pueden ser muy importantes (p. ej. un sitio para compartir fotos) o completamente inútiles. Puedes plantearte si merece la pena eliminar esta información. En la práctica, estos metadatos pueden añadir decenas de kilobytes a las imágenes.

En resumen, como primer paso para optimizar la eficacia de los recursos debes crear un inventario de los diferentes tipos de contenido y plantearte qué tipo de optimizaciones específicas del contenido puedes aplicar para reducir su tamaño. De esta forma puedes ahorrar mucho. Cuando lo sepas, automatiza estas optimizaciones añadiéndolas a los procesos de creación y de envío. Esta es la única forma de garantizar la aplicación de las optimizaciones.

## Compresión de texto con GZIP

{% include shared/takeaway.liquid list=page.key-takeaways.text-compression %}

[GZIP](http://es.wikipedia.org/wiki/Gzip) es un compresor genérico que se puede aplicar a cualquier flujo de bytes. Lo que hace es recordar cierto contenido visto anteriormente para después buscar y reemplazar fragmentos de datos duplicados de forma eficaz. Si te interesa este tema, puedes ver una [fantástica explicación sobre GZIP para personas no expertas](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s). Sin embargo, en la práctica GZIP funciona mejor con contenido basado en texto, con el que acostumbra a conseguir índices de compresión de entre el 70 y el 90% en archivos grandes. En cambio, si se utiliza GZIP con recursos que ya se han comprimido mediante otros algoritmos (p. ej., la mayoría de formatos de imagen) casi no se consiguen mejoras o las mejoras son muy pocas.

Todos los navegadores modernos admiten y negocian automáticamente con la compresión GZIP para todas las solicitudes de HTTP: nuestro trabajo es asegurarnos de que el servidor esté bien configurado para ofrecer el recurso comprimido cuando el cliente lo solicite.


<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Biblioteca</th>
    <th>Tamaño</th>
    <th>Tamaño de compresión</th>
    <th>Índice de compresión</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="biblioteca">jquery-1.11.0.js</td>
  <td data-th="tamaño">276 KB</td>
  <td data-th="compresión">82 KB</td>
  <td data-th="ahorro">70%</td>
</tr>
<tr>
  <td data-th="biblioteca">jquery-1.11.0.min.js</td>
  <td data-th="tamaño">94 KB</td>
  <td data-th="compresión">33 KB</td>
  <td data-th="ahorro">65%</td>
</tr>
<tr>
  <td data-th="biblioteca">angular-1.2.15.js</td>
  <td data-th="tamaño">729 KB</td>
  <td data-th="compresión">182 KB</td>
  <td data-th="ahorro">75%</td>
</tr>
<tr>
  <td data-th="biblioteca">angular-1.2.15.min.js</td>
  <td data-th="tamaño">101 KB</td>
  <td data-th="compresión">37 KB</td>
  <td data-th="ahorro">63%</td>
</tr>
<tr>
  <td data-th="biblioteca">bootstrap-3.1.1.css</td>
  <td data-th="tamaño">118 KB</td>
  <td data-th="compresión">18 KB</td>
  <td data-th="ahorro">85%</td>
</tr>
<tr>
  <td data-th="biblioteca">bootstrap-3.1.1.min.css</td>
  <td data-th="tamaño">98 KB</td>
  <td data-th="compresión">17 KB</td>
  <td data-th="ahorro">83%</td>
</tr>
<tr>
  <td data-th="biblioteca">foundation-5.css</td>
  <td data-th="tamaño">186 KB</td>
  <td data-th="compresión">22 KB</td>
  <td data-th="ahorro">88%</td>
</tr>
<tr>
  <td data-th="biblioteca">foundation-5.min.css</td>
  <td data-th="tamaño">146 KB</td>
  <td data-th="compresión">18 KB</td>
  <td data-th="ahorro">88%</td>
</tr>
</tbody>
</table>

En la tabla anterior se puede ver lo que se puede ahorrar con la compresión GZIP en unas cuantas bibliotecas populares de JavaScript y escenarios CSS. El ahorro va del 60 al 88%. Ten en cuenta que con la combinación de archivos minificados (extensión `.min` en el nombre del archivo) y de GZIP se consiguen muy buenos resultados.

1. **Utiliza primero optimizaciones específicas del contenido: minificadores de CSS, JS y HTML.**
2. **Utiliza GZIP para comprimir el resultado minificado.**

Lo mejor es que habilitar GZIP es una de las mayores optimizaciones de carga que se pueden llevar a cabo y de las más fáciles de implementar. Por desgracia, muchas personas se olvidan de hacerlo. La mayoría de servidores web comprimen el contenido por ti y lo único que debes hacer es verificar que el servidor esté bien configurado para comprimir todos los tipos de contenido que se compriman con GZIP.

¿Cuál es la mejor configuración del servidor? El proyecto HTML5 Boilerplate contiene [archivos de configuración de muestra](https://github.com/h5bp/server-configs) para los servidores más populares, con comentarios detallados sobre todas las marcas de configuración y todos los ajustes: busca tu servidor favorito en la lista, busca la sección GZIP y confirma que el servidor esté configurado con los ajustes recomendados.

<img src="images/transfer-vs-actual-size.png" class="center" alt="Demostración de DevTools sobre el tamaño real y el tamaño de transferencia">

Una forma rápida y sencilla de ver GZIP en acción es abrir Chrome DevTools y consultar la columna `Tamaño/Contenido` del panel Red: en `Tamaño` se indica el tamaño de transferencia del recurso y en `Contenido` el tamaño descomprimido del recurso. Con el recurso HTML del ejemplo anterior, GZIP permitió ahorrar 24,8 KB durante la transferencia.

{% include shared/remember.liquid list=page.notes.gzip %}

Y un recordatorio para terminar: aunque muchos servidores comprimen automáticamente los recursos por ti al mostrarlos al usuario, hay que prestar más atención en el caso de ciertos CDN, en los que deberás hacer un trabajo manual para garantizar que se muestra el recurso GZIP. Audita tu sitio y comprueba que tus recursos se estén [comprimiendo](http://www.whatsmyip.org/http-compression-test/) correctamente.





