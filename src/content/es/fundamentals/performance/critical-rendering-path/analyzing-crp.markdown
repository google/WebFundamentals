---
title: "Analizar el rendimiento de la ruta de publicación importante"
description: "Para identificar y resolver los embudos de rendimiento de la ruta de publicación importante, es necesario conocer a fondo las dificultades habituales. Vamos a realizar un análisis práctico para extraer patrones de rendimiento habituales que te ayudarán a optimizar las páginas."
updated_on: 2014-04-28
---
<p class="intro">
  Para identificar y resolver los embudos de rendimiento de la ruta de publicación importante, es necesario conocer a fondo las dificultades habituales. Vamos a realizar un análisis práctico para extraer patrones de rendimiento habituales que te ayudarán a optimizar las páginas.
</p>


{% include shared/toc.liquid %}

El objetivo de optimizar la ruta de publicación importante es permitir que el navegador muestre la página lo más rápido posible: cuanto más rápidas son las páginas, más implicación se obtiene, se ve un mayor número de páginas y se [mejora la conversión](http://www.google.com/think/multiscreen/success.html). Por eso, es conveniente minimizar la cantidad de tiempo que el visitante tiene que pasar delante de una pantalla en blanco optimizando los recursos que se cargan y en qué orden.

Para ejemplificar este proceso, vamos a empezar con el caso más sencillo posible e iremos ampliando la página de forma incremental para incluir recursos adicionales, estilos y lógica de aplicación. Durante el proceso, también vamos a ver otras cosas que podrían no ir según lo esperado y cómo optimizar cada uno de esos casos.

Por último, hay otro aspecto importante que tener en cuenta antes de empezar. Hasta ahora nos hemos centrado en exclusiva en lo que pasa en el navegador una vez el recurso (el archivo CSS, JS o HTML) pasa a estar disponible para procesarlo y hemos pasado por alto el tiempo para obtenerlo de la memoria caché o de la red. En la siguiente lección nos adentraremos en detalle en la forma de optimizar los aspectos de trabajo en red de nuestra aplicación, pero de momento (para que el proceso sea más realista) daremos estos aspectos por supuesto:

* El recorrido de ida y vuelta de la red (latencia de propagación) al servidor tarda 100 ms.
* El tiempo de respuesta del servidor será de 100 ms para el documento HTML y 10 ms para el resto de archivos.

## La experiencia `Hola, mundo`

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

Empezaremos con el marcado HTML básico y una sola imagen (sin CSS ni JavaScript), que es la situación más sencilla posible. Ahora vamos a abrir nuestra cronología de red en Chrome DevTools y a inspeccionar la cascada de resultados obtenida:

<img src="images/waterfall-dom.png" alt="" class="center" alt="CRP">

Según lo previsto, el archivo HTML ha tardado 200 ms en descargarse. Ten en cuenta que la parte transparente de la línea azul indica el tiempo que el navegador se pasa esperando a la red, es decir, aún no se ha recibido ningún byte de respuesta. Por su parte, la parte continua indica el tiempo que falta hasta finalizar la descarga después de que se hayan recibido los primeros bytes de respuesta. En nuestro ejemplo anterior, la descarga HTML es muy pequeña (menos de 4 KB), así que necesitamos un solo recorrido de ida y vuelta para obtener el archivo completo. Por eso, se tarda ~200 ms en obtener el documento HTML, la mitad del tiempo invertida en esperar a la red y la otra mitad en la respuesta del servidor.

Una vez disponible el contenido HTML, el navegador tiene que analizar los bytes, convertirlos en tokens y crear el árbol DOM. Ten en cuenta que, para tu comodidad, DevTools informa del tiempo del evento DOMContentLoaded en la parte inferior (216 ms), que también se corresponde a la línea vertical azul. El hueco entre el final de la descarga HTML y la línea vertical azul (DOMContentLoaded) es el tiempo que ha tardado el navegador en crear el árbol DOM (en este caso, solo unos milisegundos).

Por último, observa algo interesante: nuestra `maravillosa foto` no ha bloqueado el evento domContentLoaded. Resulta que podemos crear el árbol de publicación e incluso dibujar la página sin tener que esperar a cada elemento de la página: **no todos los recursos son esenciales para proporcionar un primer esbozo rápido**. De hecho, como veremos, cuando hablamos de la ruta de publicación importante, normalmente hablamos del marcado HTML, CSS y JavaScript. Las imágenes no bloquean la publicación inicial de la página, aunque, por supuesto, tenemos que intentar asegurarnos de que estas imágenes también se dibujen cuanto antes.

Dicho esto, el evento de carga (también denominado comúnmente `AlCargar`) está bloqueado en la imagen: DevTools informa de que el evento de carga ha tardado 335 ms. Recuerda que el evento de carga marca el momento en el que **todos los recursos** que la página necesita se han descargado y procesado; es el momento en el que el indicador de carga puede dejar de girar en el navegador y se marca con la línea vertical roja de la cascada.


## Añadir JavaScript y CSS a la ecuación

Nuestra página de la `Experiencia `Hola, mundo`` puede parecer sencilla si se mira por encima, pero hay muchos aspectos en marcha entre bambalinas para que todo funcione. Dicho esto, en la práctica solo con HTML no basta: es probable que tengamos una hoja de estilo CSS y una o dos secuencias de comandos para añadir cierta interactividad a la página. Vamos a añadir ambos elementos a la ecuación y veremos qué pasa:

{% include_code src=_code/measure_crp_timing.html snippet=full %}

_Antes de añadir JavaScript y CSS:_

<img src="images/waterfall-dom.png" alt="CRP de DOM" class="center">

_Con JavaScript y CSS:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

Al añadir archivos CSS y JavaScript externos, se han añadido dos solicitudes adicionales, todas ellas enviadas por el navegador a la vez. De momento, todo va bien. Sin embargo, **observa que ahora hay una diferencia de tiempo mucho inferior entre los eventos domContentLoaded y de carga. ¿Qué ha pasado?**

* A diferencia de nuestro ejemplo de HTML básico, ahora también tenemos que obtener y analizar el archivo CSS para crear CSSOM, y sabemos que necesitamos tanto DOM como CSSOM para crear el árbol de publicación.
* Como también tenemos un analizador que bloquea el archivo JavaScript en la página, el evento domContentLoaded queda bloqueado hasta que se descarga y se analiza el archivo CSS: puede que JavaScript envíe una consulta a CSSOM, de modo que tenemos que establecer un bloqueo y esperar al CSS antes de poder ejecutar JavaScript.

**¿Qué pasa si sustituimos la secuencia de comandos externa por una secuencia de comandos integrada?** Una pregunta que parece inofensiva pero que en realidad es muy complicada. Resulta que, aunque la secuencia de comandos se integre directamente en la página, la única forma fiable de que el navegador sepa qué intenta hacer la secuencia de comandos es ejecutarla y, como ya sabemos, no podemos hasta que se cree CSSOM.  En resumidas cuentas, el JavaScript integrado también bloquea el analizador.

Dicho esto, a pesar de bloquear el CSS, ¿la integración de la secuencia de comandos permitirá mostrar la página más rápidamente? Si la última situación era complicada, esto lo es mucho más. Vamos a intentarlo y veremos qué pasa.

_JavaScript externo:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_JavaScript integrado:_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM, CSSOM y JS integrado" class="center">

Realizamos una solicitud menos, pero nuestros tiempos de los eventos de carga y domContentLoaded son los mismos. ¿Por qué? Sabemos que no importa que el JavaScript esté integrado o sea externo, porque, en cuanto el navegador llega a la etiqueta de secuencia de comandos, se bloquea y espera a que CSSOM se cree. Es más, en nuestro primer ejemplo, el navegador descarga tanto el CSS como JavaScript en paralelo y se completan más o menos a la vez. Por consiguiente, en este caso en concreto, no nos sirve de mucho integrar el código JavaScript. ¿Quiere esto decir que no tenemos salida y que no podemos hacer nada para que nuestra página se muestre más rápidamente? En realidad, tenemos varias estrategias diferentes.

En primer lugar, recuerda que las secuencias de comandos integradas bloquean el analizador, pero que en el caso de las secuencias de comandos externas podemos añadir la palabra clave `async` para desbloquear el analizador. Vamos a deshacer la integración para intentarlo:

{% include_code src=_code/measure_crp_async.html snippet=full %}

_JavaScript que bloquea el analizador (externo):_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_JavaScript asíncrono (externo):_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, JS asíncrono" class="center">

Mucho mejor. El evento domContentLoaded se activa poco después de que el HTML se analice: el navegador sabe que no tiene que bloquear JavaScript y, como no hay ninguna otra secuencia de comandos que bloquee el analizador, la creación de CSSOM también puede seguir en paralelo.

De forma alternativa, podríamos haber intentado otro método y haber integrado tanto CSS como JavaScript:

{% include_code src=_code/measure_crp_inlined.html snippet=full %}

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, CSS integrado, JS integrado" class="center">

Observa que el tiempo de _domContentLoaded_ es el mismo que en el ejemplo anterior: en vez de marcar el código JavaScript como asíncrono, hemos integrado tanto CSS como JS en la propia página. Esto ha aumentado el tamaño de la página HTML, pero la parte positiva es que el navegador no tiene que esperar para obtener los recursos externos, ya que todo lo que necesita se encuentra en la página.

Como puedes ver, aunque tenemos una página muy sencilla, la optimización de la ruta de publicación importante es un ejercicio nada desdeñable: tenemos que entender el gráfico de dependencia entre varios recursos, tenemos que identificar qué recursos son `esenciales` y tenemos que elegir entre diferentes estrategias para incluir esos recursos en la página. No hay una única solución para este problema, sino que cada página es diferente y tienes que seguir un proceso similar por ti solo para averiguar la mejor estrategia.

Dicho esto, veamos si podemos retroceder e identificar algunos patrones de rendimiento generales.


## Patrones de rendimiento

La página más sencilla posible está formada por solo el marcado HTML: sin CSS, JavaScript ni otros tipos de recursos. Para publicar esta página, el navegador tiene que iniciar la solicitud, esperar a que llegue el documento HTML, analizarlo, crear DOM y, por último, publicarlo en la pantalla:

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

<img src="images/analysis-dom.png" alt="CRP de "Hola, mundo"" class="center">

**El tiempo entre T<sub>0</sub> y T<sub>1</sub> da cuenta de los tiempos de procesamiento entre la red y el servidor.** En el mejor de los casos (si el archivo HTML es pequeño), solo necesitamos un recorrido de ida y vuelta a la red para obtener el documento completo. Debido a la forma de funcionamiento de los protocolos de transporte de TCP, puede que los archivos de mayor tamaño requieran más recorridos de ida y vuelta, un tema que volveremos a tratar en futuras lecciones. **Por consiguiente, podemos afirmar que la página anterior, en el mejor de los casos, tiene una ruta de publicación importante de recorrido de ida y vuelta (como mínimo).**

Ahora vamos a plantearnos la misma página pero con un archivo CSS externo:

{% include_code src=_code/analysis_with_css.html snippet=full %}

<img src="images/analysis-dom-css.png" alt="DOM + CRP de CSSOM" class="center">

Una vez más, utilizamos un recorrido de ida y vuelta a la red para obtener el documento HTML y después el marcado obtenido nos indica que aún necesitamos el archivo CSS. Es decir, el navegador tiene que volver al servidor y obtener el archivo CSS antes de poder mostrar la página en pantalla. **Por consiguiente, esta página emplea por lo menos dos recorridos de ida y vuelta antes de que se pueda mostrar la página**. Una vez más, puede que el archivo CSS haga necesarios varios recorridos de ida y vuelta, de ahí el énfasis en `como mínimo`.

Vamos a definir el vocabulario que vamos a utilizar para describir la ruta de publicación importante:

* **Recurso esencial**: un recurso que es posible que bloquee la publicación inicial de la página.
* **Longitud de la ruta importante**: cantidad de recorridos de ida y vuelta o el tiempo total necesario para obtener todos los recursos esenciales.
* **Bytes esenciales**: la cantidad total de bytes necesarios para obtener la primera publicación de la página, que es la suma de los tamaños de archivos de transferencia de todos los recursos esenciales.
Nuestro primer ejemplo con una sola página HTML contenía un único recurso esencial (el documento HTML), la longitud de la ruta importante también era igual a un recorrido de ida y vuelta (suponiendo que el archivo fuera pequeño) y el total de bytes esenciales era el tamaño de transferencia del propio documento HTML.

Ahora vamos a comparar estos resultados con las características de la ruta importante del ejemplo de HTML + CSS anterior:

<img src="images/analysis-dom-css.png" alt="DOM + CRP de CSSOM" class="center">

* **2** recursos esenciales
* **2** o más recorridos de ida y vuelta para la longitud mínima de ruta importante
* **9** KB de bytes esenciales

Necesitamos tanto el código HTML como CSS para crear el árbol de publicación. Por eso, tanto HTML como CSS son recursos esenciales: el CSS se obtiene solo después de que el navegador obtenga el documento HTML, por eso la longitud de ruta importante es, como mínimo, dos recorridos de ida y vuelta; ambos recursos suman un total de 9 KB de bytes esenciales.

Ahora vamos a añadir a la ecuación un archivo JavaScript adicional.

{% include_code src=_code/analysis_with_css_js.html snippet=full %}

Hemos añadido app.js, un elemento JavaScript externo de la página, y, como ya sabemos, es un recurso que bloquea el analizador (es decir, es esencial). Aún peor. Para ejecutar el archivo JavaScript, también tendremos que bloquear y esperar a CSSOM. Recuerda que JavaScript puede enviar consultas a CSSOM y, por eso, el navegador se detendrá hasta que el archivo `style.css` se haya descargado y CSSOM se haya creado.

<img src="images/analysis-dom-css-js.png" alt="DOM, CSSOM, CRP de JavaScript" class="center">

Dicho esto, en la práctica, si observamos la `cascada de red` de esta página, veremos que tanto las solicitudes CSS como las JavaScript se iniciarán aproximadamente a la vez: el navegador obtiene el HTML, detecta ambos recursos e inicia ambas solicitudes. Por eso, la página anterior tiene las siguientes características de ruta importante:

* **3** recursos esenciales
* **2** o más recorridos de ida y vuelta para la longitud mínima de ruta importante
* **11** KB de bytes esenciales

Ahora tenemos tres recursos esenciales que suman 11 KB de bytes esenciales, pero nuestra longitud de ruta importante sigue siendo dos recorridos de ida y vuelta porque podemos transferir el archivo CSS y el de JavaScript en paralelo. **Al averiguar las características de la ruta de publicación importante, puedes identificar cuáles son los recursos esenciales y también puedes entender cómo el navegador programará su obtención.** Sigamos con nuestro ejemplo.

Después de hablar con los desarrolladores del sitio, nos hemos dado cuenta de que el JavaScript que hemos incluido en la página no tiene por qué crear bloqueos. Tenemos algunos análisis y otros códigos que no tienen por qué bloquear la publicación de la página. Sabiendo esto, podemos añadir el atributo `async` a la etiqueta de secuencia de comandos para desbloquear el analizador:

{% include_code src=_code/analysis_with_css_js_async.html snippet=full %}

<img src="images/analysis-dom-css-js-async.png" alt="DOM, CSSOM, CRP de JavaScript asíncrono" class="center">

Al definir la secuencia de comandos como asíncrona, obtenemos ciertas ventajas:

* La secuencia de comandos ya no bloquea el analizador y no forma parte de la ruta de publicación importante.
* Como no hay más secuencias de comandos esenciales, el CSS tampoco necesita bloquear el evento domContentLoaded.
* Cuanto antes se active el evento domContentLoaded, antes se puede empezar a ejecutar otra lógica de la aplicación.

Por eso, nuestra página optimizada vuelve a tener dos recursos esenciales (HTML y CSS), con una longitud mínima de ruta importante de dos recorridos de ida y vuelta y un total de 9 KB de bytes esenciales.

Por último, supongamos que la hoja de estilo CSS solo sea necesaria para imprimir. ¿Qué aspecto tendría?

{% include_code src=_code/analysis_with_css_nb_js_async.html snippet=full %}

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM, CSS que no bloquea y CRP de JavaScript asíncrono" class="center">

Como el recurso style.css solo se utiliza para imprimir, el navegador no tiene que bloquearlo para mostrar la página. Por eso, en cuanto finaliza la creación de DOM, el navegador tiene bastante información para mostrar la página. Esto determina que la página solo tiene un recurso esencial (el documento HTML) y que la longitud mínima de ruta de publicación importante es un recorrido de ida y vuelta.



