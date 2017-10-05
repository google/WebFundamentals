project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Considera el contenido, el formato y el diseño gráfico al desarrollar para diferentes usuarios y dispositivos.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-05-10 #}

# Contenido para varios dispositivos {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

## Qué clase de lectura realiza la gente en la Web

La [guía de escritura del gobierno de EE. UU.](http://www.usability.gov/how-to-and-tools/methods/writing-for-the-web.html) resume lo que la gente quiere leer en la web:

> Cuando se escribe para la web, un lenguaje simple permite a los usuarios encontrar lo que necesitan, entender lo que encontraron y luego usarlo para cumplir sus propósitos.
>
> También debe ser interactivo, fácil de encontrar y fácil de compartir.

Las investigaciones muestran que [la gente no lee las páginas web, las ojea](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/). En promedio, [la gente solo lee entre un 20 y un 28% del contenido de las páginas web](https://www.nngroup.com/articles/how-little-do-users-read/). La lectura en pantallas es mucho más lenta que en papel. La gente se rendirá y abandonará tu sitio a menos que la información sea accesible y fácil de comprender.

## Cómo redactar contenido para plataformas móviles

Concéntrate en el asunto en cuestión y cuenta la historia de antemano. Si deseas redactar contenido para que funcione en diferentes dispositivos y ventanas de visualización, asegúrate de incluir los puntos principales desde el principio: a modo de regla, idealmente [en los primeros cuatro párrafos, en alrededor de 70 palabras](http://www.bbc.co.uk/academy/journalism/article/art20130702112133610).

Pregúntate qué desean de tu sitio los visitantes. ¿Intentan descubrir algo? Si la gente visita tu sitio para buscar información, asegúrate de que el propósito de todo el texto sea ayudarlos a alcanzar sus objetivos. Escribe con [voz activa](https://learnenglish.britishcouncil.org/en/english-grammar/verbs/active-and-passive-voice), proporciona acciones y soluciones.

Publica únicamente lo que tus visitantes quieren y nada más.

[Una investigación del gobierno del RU](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) también demuestra lo siguiente:

> El 80% de las personas prefiere oraciones escritas en un idioma claro; y mientras más
>complejo es el tema, esa preferencia crece (p. ej., el 97% prefiere expresiones
> comunes en su idioma antes que latinismos).
>
>A mayor educación y más especializado el conocimiento de una persona,
> mayor su preferencia por un lenguaje simple.

En otras palabras: usa un lenguaje claro, con palabras más cortas y estructuras de oraciones simples; incluso para un público instruido y técnico. A menos que haya una buena razón para no hacerlo, mantén un tono coloquial. Una vieja regla del periodismo es escribir como si te dirigieras a un niño inteligente de 11 años.

## Los próximos mil millones de usuarios

El enfoque de redacción sencilla tiene particular importancia para los lectores que usan dispositivos móviles y es crucial al crear contenido para teléfonos de bajo costo con ventanas de visualización pequeñas que requieren más desplazamientos y pueden tener pantallas de menor calidad y menor repuesta.

La mayor parte de los próximos mil millones de usuarios que se sumen a la red tendrán dispositivos económicos. No querrán gastar su presupuesto de datos en navegar por contenidos extensos, y es probable que no lean en su lengua materna. Reduce tu texto: usa oraciones cortas, reduce al mínimo la puntuación, forma párrafos de cinco o menos líneas y aplica títulos de una sola línea. Considera usar textos adaptables (por ejemplo, usa títulos más cortos para ventanas de visualización más cortas), pero [ten presente las desventajas](https://www.smashingmagazine.com/2012/02/ever-justification-for-responsive-text/).

Una perspectiva minimalista respecto del texto también hará que tu contenido sea más fácil de localizar e internacionalizar, y aumentará las probabilidades de que lo citen en las redes sociales.

Lo más importante:

* Procede de modo simple.
* Reduce la sobrecarga.
* Sé conciso.


## Elimina el contenido innecesario

En términos de tamaño en bytes, las páginas web son [grandes y cada vez crecen más](http://httparchive.org/trends.php#bytesTotal&reqTotal).

[Las técnicas de diseño adaptable](/web/fundamentals/design-and-ux/responsive/) hacen posible el aprovisionamiento de contenidos diferentes para ventanas de visualización más pequeñas, pero siempre será una práctica sensata comenzar por optimizar el texto, las imágenes y otros contenidos.

> A menudo, los usuarios de la web se enfocan en la acción, “con una inclinación hacia” la búsqueda de respuestas para sus preguntas actuales, en lugar de recostarse y dejarse absorber por un buen libro.
>
> — [Jakob Nielsen](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)

Pregúntate “¿qué desea conseguir la gente cuando visita mi sitio?”

¿Cada componente de la página ayuda a los usuarios a alcanzar sus objetivos?

### Quita elementos redundantes de la página

Los archivos HTML representan cerca de 70 k y más de nueve solicitudes para la página web promedio, conforme al [archivo HTTP](http://httparchive.org/trends.php#bytesHtml&reqHtml).

En muchos sitios populares se usan varios miles de elementos HTML por página y varios miles de líneas de código, incluso en dispositivos móviles. El tamaño excesivo del archivo HTML [puede hacer que las páginas no se carguen más lentamente](http://jsbin.com/zofavunapo/1/edit?html,js,output), pero una carga HTML pesada puede indicar un aumento de contenido: los archivos .html más grandes implican más elementos, más contenido de texto o ambos aspectos.

Reducir la complejidad de la carga HTML también reducirá la carga de la página ayudará a permitir la localización e internalización, y hará un diseño adaptable más fácil de planear y depurar. Para obtener información sobre cómo redactar HTML más eficiente, consulta [HTML de alto rendimiento](https://samdutton.wordpress.com/2015/04/02/high-performance-html/).

> Cada paso que hagas dar a un usuario para obtener valor en tu app te costará un 20% de los usuarios
>
>— [Gabor Cselle, Twitter](http://blog.gaborcselle.com/2012/10/every-step-costs-you-20-of-users.html)

Lo mismo se aplica al contenido: ayuda a los usuarios a obtener lo que deseen tan pronto como sea posible.

No ocultes el contenido a los usuarios de dispositivos móviles. Apunta hacia la [igualdad de contenido](http://bradfrost.com/blog/mobile/content-parity/), ya que especular sobre las funciones que tus usuarios de dispositivos móviles no se perderán está condenada a fracasar en algún caso. Si cuentas con los recursos necesarios, crea versiones alternativas del mismo contenido para diferentes tamaños de ventanas de visualización, aun cuando se trate únicamente de elementos de página de prioridad alta.

Considera la administración de contenido y el flujo de trabajo: ¿los sistemas heredados generan contenido heredado?

### Simplifica el texto

En medio de la transición Web hacia los dispositivos móviles, deberás cambiar el modo de redactar. Hazlo de modo simple, reduce la sobrecarga y sé conciso.

### Quita imágenes redundantes

<div class="attempt-right">
  <figure>
    <img src="imgs/http-archive-images.png" alt="Archivo HTTP que muestra una cantidad creciente de tamaños de transferencia de imágenes y solicitudes de imágenes" />
    <figcaption>Según <a href="http://httparchive.org/trends.php#bytesImg&reqImg">los datos del archivo HTTP</a>, una página web promedio realiza 54 solicitudes de imágenes.</figcaption>
 </figure>
</div>

Las imágenes pueden ser bellas, divertidas e informativas, pero también ocupan espacio real de la página, agregan volumen a esta y aumentan el número de solicitudes de archivos. [La latencia empeora cuando lo mismo sucede con la conectividad](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/). Esto significa que un exceso de solicitudes de archivos de imagen es un problema que aumenta cuando se cambia de la Web al dispositivo móvil.


<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="imgs/http-archive-content-type-pie-chart.png" alt="Gráfico circular del archivo HTTP que muestra el promedio de bytes por página conforme al tipo de contenido, del cuál el 60% son imágenes">
    <figcaption>Las imágenes constituyen más del 60% del peso de la página.</figcaption>
  </figure>
</div>

Las imágenes también consumen energía. Después de la pantalla, la radio es el segundo factor de descarga de batería en importancia. Más solicitudes de imágenes, más uso de la radio, más baterías sin carga. Incluso, la mera representación de imágenes consume energía y esto es proporcional al tamaño y al número. Consulta el informe de Stanford [Who Killed My Battery?](http://cdn.oreillystatic.com/en/assets/1/event/79/Who%20Killed%20My%20Battery_%20Analyzing%20Mobile%20Browser%20Energy%20Consumption%20Presentation.pdf) (¿quién acabó con la carga de mi batería?).

Si puedes, deshazte de las imágenes.

Aquí te proporcionamos alguna sugerencias:

* Ten en cuenta los diseños que evitan las imágenes o úsalas con moderación. [El texto por sí solo puede ser bello](https://onepagelove.com/tag/text-only). Pregúntate “¿qué desean obtener quienes visitan mi sitio? ¿Las imágenes ayudan en ese proceso?”
* En el pasado, era común guardar encabezados y otros elementos textuales como gráficos. Ese enfoque no responde bien a los cambios de tamaños de ventanas de visualización, y agrega volumen y latencia a la página. El uso del texto como gráficos también implica que no será posible su localización a través de motores de búsqueda ni el acceso a él a través de lectores de pantalla u otras tecnologías de asistencia. Usa texto “real” cuando sea posible; las fuentes web y las CSS pueden permitir acceder a una bella tipografía.
* Usa CSS en lugar de imágenes para degradados, sombras, esquinas redondeadas y [texturas de fondo](http://lea.verou.me/css3patterns/){: .external }, funciones [admitidas en todos los navegadores modernos](http://caniuse.com/#search=shadows). Sin embargo, ten en cuenta que las CSS pueden ser mejores que las imágenes, aunque de todos modos puede haber una [penalidad de representación y procesamiento](http://www.smashingmagazine.com/2013/04/03/build-fast-loading-mobile-website/) particularmente considerable en el dispositivo móvil.
* Las imágenes de fondo raramente funcionan bien en un dispositivo móvil. Puedes [usar solicitudes de medios](http://udacity.github.io/responsive-images/examples/2-06/backgroundImageConditional/) para evitar imágenes de fondo en pequeñas ventanas de visualización.
* Evita imágenes de pantallas de presentación.
* [Usa CSS para animaciones de IU](/web/fundamentals/design-and-ux/animations/).
* Conoce tus glifos; usa [símbolos e íconos Unicode](https://en.wikipedia.org/wiki/List_of_Unicode_characters) en lugar de imágenes, con fuentes web si es necesario.
* Ten en cuenta [fuentes de íconos](http://weloveiconfonts.com/#zocial); son gráficos vectoriales que admiten escalamiento infinito, y se puede descargar un conjunto completo de imágenes en una fuente. (Ten en cuenta, no obstante, [estos asuntos](https://sarasoueidan.com/blog/icon-fonts-to-svg/)).
* El elemento `<canvas>` se puede usar para crear imágenes en JavaScript a partir de líneas, curvas, texto y otras imágenes.
* [Las imágenes del archivo SVG en línea o de URI de datos](http://udacity.github.io/responsive-images/examples/2-11/svgDataUri/) no reducirán el peso de la página, pero pueden disminuir la latencia mediante la reducción del número de solicitudes de recursos. El archivo SVG en línea ofrece [gran compatibilidad en dispositivos móviles y navegadores de escritorio](http://caniuse.com/#feat=svg-html5), y  las [herramientas de optimización](http://petercollingridge.appspot.com/svg-optimiser) pueden reducir de manera significativa el tamaño del archivo SVG. Del mismo modo, los URI de datos son [muy compatibles](http://caniuse.com/datauri). Ambos se pueden poner en línea en CSS.
* Considera usar `<video>` en lugar de GIF animados. [El elemento de video es compatible con todos los navegadores de dispositivos móviles](http://caniuse.com/video) (excepto con Opera Mini).

Para obtener más información, consulta [Optimización de la imagen](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) e [Eliminación y reemplazo de imágenes](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization#eliminating-and-replacing-images).


## Diseña el contenido para que funcione correctamente en diferentes tamaños de ventana de visualización {: #viewport }

> "Crea un producto, no rediseñes uno para pantallas pequeñas. Los grandes productos
> móviles se crean, nunca se adaptan."
>
>— <a href="https://goo.gl/KBAXj0">Mobile Design and Development</a>, Brian Fling


Los grandes diseñadores no realizan “optimizaciones para dispositivos móviles”; piensan, de manera responsable, en crear sitios que funcionen en varios dispositivos. La estructura del texto y otros contenidos de la página es esencial para el éxito en diferentes dispositivos.

Los próximos miles de millones de usuarios que se conectan usan dispositivos de bajo costo con pequeñas ventanas de visualización. Puede resultar difícil leer en una pantalla con una resolución baja de 3,5 o 4”.

Aquí te mostramos una fotografía de los dos juntos:

![Foto en la que se compara la pantalla de la entrada de blog en smartphones de bajo costo y de alta capacidad](imgs/devices-photo.jpg)

En la pantalla más grande, el texto es pequeño pero se puede leer.

En la pantalla más pequeña, el diseño se representa de manera correcta en el navegador, pero el texto no se puede leer; tampoco cuando se realiza un acercamiento. La pantalla se ve borrosa y tiene una “transmisión de color”, el blanco no se ve blanco, lo cual hace que el contenido sea menos legible.

### Diseñar contenido para móviles

Cuando desarrolles para varias ventanas de visualización diferentes, ten en cuenta el contenido además de la disposición y el diseño gráfico,
[diseña con textos e imágenes reales, no con contenido ficticio](http://uxmyths.com/post/718187422/myth-you-dont-need-the-content-to-design-a-website).

> "El contenido precede al diseño. El diseño sin contenido no es diseño, es decoración."
>
>— Jeffrey Zeldman

* Pon tu contenido más importante en la parte superior, ya que los [usuarios tienden a leer las páginas web de acuerdo a un patrón en forma de F](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/).
* Los usuarios visitan tu sitio en busca de un objetivo. Pregúntate qué necesitan para alcanzar ese objetivo y deshazte del resto. Sé firme respecto de los adornos visuales y textuales, el contenido heredado, los vínculos excesivos y otras sobrecargas.
* Ten cuidado con los íconos de uso compartido en redes sociales; pueden sobrecargar los diseños y su código puede reducir la velocidad de la carga de la página.
* Crea [diseños adaptables](/web/fundamentals/design-and-ux/responsive/) para el contenido, en lugar de tamaños fijos para diferentes dispositivos.

### Probar contenido

Success: Hagas lo que hagas, ¡**pruébalo**!

* Verifica la lectura en ventanas de visualización más pequeñas con Chrome DevTools y otras [herramientas de emulación](/web/fundamentals/performance/poor-connectivity/).
* [Prueba tu contenido en condiciones de ancho de banda reducido y latencia alta](/web/fundamentals/performance/poor-connectivity/); prueba el contenido en diferentes situaciones de conectividad.
* Intenta leer tu contenido e interactuar con él en un teléfono de bajo costo.
* Pídeles a amigos y colegas que prueben tu app o tu sitio.
* Crea un test lab de dispositivos simples. El [repositorio de GitHub](https://github.com/GoogleChrome/MiniMobileDeviceLab) para el Mini Mobile Device Lab de Google tiene instrucciones sobre cómo crear uno propio. [OpenSTF](https://github.com/openstf/stf) es una app web simple para probar sitios web en diferentes dispositivos Android.

A continuación, se muestra OpenSTF en acción:

[![Interfaz OpenSTF](imgs/stf.png)](https://github.com/openstf/stf)

Crece el uso de dispositivos móviles para el consumo de contenido y la obtención de información, no solo como dispositivos para la comunicación, juegos y medios.

Esto aumenta la importancia de planear el contenido con el fin de que funcione bien en diferentes ventanas de visualización, y de priorizar el contenido al considerar un diseño, una interfaz y un bosquejo de interacción para diferentes dispositivos.


## Comprende el costo de los datos

Las páginas web se están expandiendo. <br><br>Conforme al <a href="http://httparchive.org/trends.php#bytesTotal&reqTotal">archivo HTTP</a>, el tamaño promedio de una página para el <a href="http://httparchive.org/about.php#listofurls">millón de sitios más importantes</a> supera los 2 MB.


Los usuarios evitan sitios o apps que les resultan lentos o costosos, de modo que es crucial comprender el costo de carga de una página y de los componentes de la app.

Reducir el peso de la página también puede ser rentable. [Chris Zacharias, de YouTube](http://blog.chriszacharias.com/page-weight-matters), descubrió que cuando se redujo el tamaño de la página de visualización de 1,2 MB a 250 KB:

>  un gran número de personas que antes no podían usar YouTube de repente pudieron hacerlo.

En otras palabras, la reducción del tamaño de una página **puede abrir nuevos mercados**.

### Calcula el peso de la página {: #weight }

Hay varias herramientas para calcular el tamaño de una página. El panel Network de Chrome DevTools muestra el tamaño total en bytes para todos los recursos y se puede usar para determinar los tamaños de los tipos de recursos individuales. También puedes verificar los elementos recuperados del caché del navegador.

![Visualización de los tamaños de recursos en el panel Network de Chrome DevTools](imgs/chrome-dev-tools.png)

Firefox y otros navegadores ofrecen herramientas similares.

[webpagetest.org](http://webpagetest.org) ofrece la posibilidad de probar la primera carga de página y las que siguen. Puedes automatizar las pruebas con [secuencias de comandos](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting) (por ejemplo, para acceder a un sitio) o con sus [API RESTful](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis). En el siguiente ejemplo (carga de [developers.google.com/web](/web/)) se muestra que el almacenamiento en caché fue exitoso y que para las cargas de página posteriores no se necesitaron recursos adicionales.

![Resultados de WebPagetest en los que se muestra el tamaño total en bytes para las primeras visitas y las repeticiones de visitas de página](imgs/webpagetest-first-and-repeat.png).

WebPagetest también otorga un desglose de tamaños y solicitudes por tipo de MIME.

![Gráficos circulares de WebPagetest en los que se muestran solicitudes y bytes a través por tipo de MIME](imgs/webpagetest-requests-and-bytes-pie-charts.png).

### Calcula el costo de la página

Para muchos usuarios, los datos no solo consumen bytes y rendimiento, sino también dinero.

El sitio [What Does My Site Cost?](https://whatdoesmysitecost.com/){: .external } te permite estimar el costo real que supone la carga de tu sitio. En el histograma que se ofrece a continuación se muestra cuánto cuesta (con un plan de datos prepago) cargar [amazon.com](https://www.amazon.com/).

![Costo estimado de los datos en 12 países para la carga de la página principal de amazon.com](imgs/what-does-my-site-cost.png).

Ten presente que no se tiene en cuenta la accesibilidad a cuentas conforme a los ingresos. Información de [blog.jana.com](https://blog.jana.com/2015/05/21/the-data-trap-affordable-smartphones-expensive-data/) en la que se muestra el costo de los datos.

<table>
  <tr>
    <td></td>
    <td><strong>Costo de un plan de datos<br>de 500 MB (en USD)</strong></td>
    <td><strong>Salario mínimo<br>por hora (en USD)</strong></td>
    <td><strong>Horas de trabajo para pagar<br>un plan de datos de 500 MB</strong></td>
  </tr>
  <tr>
    <td>India</td>
    <td>USD 3.38</td>
    <td>USD 0.20</td>
    <td>17 horas</td>
  </tr>
  <tr>
    <td>Indonesia</td>
    <td>USD 2.39</td>
    <td>USD 0.43</td>
    <td>6 horas</td>
  </tr>
  <tr>
    <td>Brasil</td>
    <td>USD 13.77</td>
    <td>USD 1.04</td>
    <td>13 horas</td>
  </tr>
</table>


El tamaño de la página no es solo un problema de los mercados emergentes. En muchos países, la gente usa planes de telefonía móvil con datos limitados y evitará tu sitio o tu app si percibe que son cargados y de navegación costosa. Incluso los planes de datos de datos de telefonía celular y Wi-Fi “ilimitados” tienen en general un límite de datos y al superarlo se bloquean o se regulan.

Lo más importante: el tamaño de la página afecta el rendimiento y cuesta dinero. En [Optimización del ahorro del contenido](/web/fundamentals/performance/optimizing-content-efficiency/) se muestra cómo reducir ese costo.


{# wf_devsite_translation #}
