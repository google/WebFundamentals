project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Gracias a la proliferación de dispositivos móviles y redes, cada vez más personas usan la Web. A medida que crece esta base de usuarios, también lo hace la importancia que tiene el buen rendimiento. En este artículo, descubrirás por qué el rendimiento es importante, y aprenderás qué puedes hacer para que la Web sea más rápida para todos.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2018-03-08 #}
{# wf_blink_components: N/A #}

# Por qué es importante el rendimiento {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

En nuestra búsqueda compartida de lograr que la red haga cada vez más cosas, nos encontramos con un
problema común: el rendimiento. Los sitios tienen más funciones
que nunca. Tanto es así, que muchos tienen dificultades para lograr un nivel de
rendimiento elevado en una variedad de dispositivos y condiciones de red.

Los problemas de rendimiento varían. En el mejor de los casos, crean pequeñas demoras que solo resultan
levemente molestas para los usuarios. En el peor de los casos, hacen que tu sitio sea completamente inaccesible o
no responda a las entradas del usuario (o ambos).

## El rendimiento como herramienta para retener a los usuarios

Queremos que los usuarios encuentren lo que buscan al interactuar con lo que desarrollamos. Si es un
blog, queremos que las personas lean las publicaciones. Si es una tienda en línea, queremos que
compren cosas. Si es una red social, queremos que
interactúen entre ellos.

El rendimiento juega un papel importantísimo en el éxito de cualquier actividad en línea. A continuación, presentamos algunos
casos de éxito que muestran cómo los sitios con rendimiento elevado logran atraer y retener a los usuarios mejor que
aquellos que presentan un rendimiento inferior:

- [Pinterest aumentó el tráfico del motor de búsqueda y la cantidad de registros en un 15 %][pinterest] cuando
  redujo el tiempo de espera percibido en un 40 %.
- [COOK aumentó la conversión en un 7 %, redujo el índice de rebote en un 7 % y aumentó
  la cantidad de páginas por sesión en un 10 %][COOK] cuando redujeron el tiempo promedio de carga de página en 850
  milisegundos.

[pinterest]: https://medium.com/@Pinterest_Engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7
[COOK]: https://www.nccgroup.trust/uk/about-us/resources/cook-real-user-monitoring-case-study/?style=Website+Performance&resources=Case+Studies

Aquí presentamos algunos casos de éxito en los que un bajo rendimiento afectó negativamente los objetivos
comerciales:

- [La BBC determinó que perdía un 10 % adicional de usuarios][BBC] por cada segundo adicional
  que el sitio tardaba en cargarse.
- [DoubleClick de Google determinó que un 53 % de las visitas a sitios móviles se abandonaban][DoubleClick] si una página
  tardaba más de 3 segundos en cargarse.

[BBC]: https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale
[DoubleClick]: https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/

En este mismo estudio de DoubleClick de Google, se
determinó que los sitios que se cargan dentro de los 5 segundos tenían sesiones un 70 % más largas, índices de rebote un 35 %
más bajos y una visualización de anuncios un 25 % mayor que en sitios que tardaban casi cuatro veces
más en cargarse (19 segundos). Para tener una idea general de cómo se compara el rendimiento de tu sitio
con el de tus competidores, [consulta la herramienta
Speed Scorecard](https://www.thinkwithgoogle.com/feature/mobile/).

<figure>
  <img srcset="images/speed-scorecard-2x.png 2x, images/speed-scorecard-1x.png 1x"
src="images/speed-scorecard-1x.png" alt="Captura de pantalla de la herramienta
Speed Scorecard en la que se compara el rendimiento de cuatro sitios de noticias populares.">
  <figcaption><b>Figura 1</b>. Comparación hecha en Speed Scorecard del rendimiento de cuatro
sitios competidores usando datos de Chrome UX Report de usuarios de redes 4G en Estados
Unidos.</figcaption>
</figure>

## El rendimiento para mejorar conversiones

La retención de usuarios es crucial para mejorar las conversiones. Los sitios lentos
afectan negativamente los ingresos, y viceversa. A continuación, hay algunos
ejemplos que muestran cómo el rendimiento ha tenido un papel fundamental en hacer que las empresas sean más (o
menos) rentables:

- Para Mobify, [cada reducción de 100 ms en la velocidad de carga de su página principal generó un **aumento del
1,11 %** en la conversión basada en sesión, lo que generó un aumento promedio de ingresos
anuales de **casi
$380 000**](http://resources.mobify.com/2016-Q2-mobile-insights-benchmark-report.html).
Asimismo, una reducción de 100 ms en la velocidad de carga de la página de finalización de la compra representó un **aumento
del 1,55 %** en la conversión basada en sesión, que a su vez representó un aumento promedio de los
ingresos anuales de **casi $530 000**.
- DoubleClick descubrió que [los publicadores cuyos sitios se cargaban en cinco segundos o menos generaban hasta
el **doble de ingresos por anuncios** que los sitios que tardaban hasta 19
segundos en cargarse](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/).
- [Cuando AutoAnything redujo el tiempo de carga de páginas a la mitad, **sus ventas aumentaron entre un 12 y 13 %**](https://www.digitalcommerce360.com/2010/08/19/web-accelerator-revs-conversion-and-sales-autoanything/).

Si usas la Web para realizar actividades comerciales, el rendimiento es crucial. Si la experiencia
de tu sitio es rápida y con buena respuesta a las entradas del usuario, saldrás beneficiado. Para
ver cómo el rendimiento podría afectar tus ingresos, usa la herramienta [Impact
Calculator](https://www.thinkwithgoogle.com/feature/mobile/).

<figure>
  <img srcset="images/impact-calculator-2x.png 2x, images/impact-calculator-1x.png
1x" src="images/impact-calculator-1x.png" alt="Captura de pantalla de Impact
Calculator, donde se estiman los ingresos que un sitio podría ganar si
se hicieran mejoras en el rendimiento.">
  <figcaption><b>Figura 2</b>. Impact Calculator estima los
ingresos que podrías ganar si mejoraras el rendimiento de tu sitio.</figcaption>
</figure>

## El rendimiento para mejorar la experiencia del usuario

Cuando visitas una URL, lo haces desde una variedad de lugares de origen
potenciales. En función de una serie de
condiciones, como la calidad de conexión y el dispositivo que usas, tu
experiencia podría ser muy distinta de la de otro usuario.

<figure>
  <img src="images/speed-comparison.png" alt="Comparación de dos carretes de tiras de imágenes
de una página que se está cargando. El primer caso muestra la página cargándose con una conexión lenta, mientras que
el segundo muestra la misma página cargándose con una conexión rápida.">
  <figcaption><b>Figura 3</b>. Comparación de la carga de una página con una conexión muy lenta
(arriba) y una más rápida (abajo).</figcaption>
</figure>

Cuando un sitio web comienza a cargarse, hay un período durante el cual los usuarios deben esperar a que
el contenido aparezca. Hasta que esto ocurra, no se puede hablar de la experiencia del usuario. Esta ausencia
de experiencia es fugaz con conexiones rápidas. Con conexiones más lentas,
sin embargo, los usuarios se ven obligados a esperar. Los usuarios pueden tener más problemas porque
los recursos de la página se reciben muy lentamente.

El rendimiento es un aspecto fundamental de
una buena experiencia del usuario. Cuando los sitios envían mucho código, los navegadores deben usar megabytes
del plan de datos del usuario para descargarlo. Los dispositivos móviles tienen capacidad de procesamiento
de CPU y memoria limitados. Con frecuencia, se ven afectados por lo que podría considerarse
una pequeña cantidad de código no optimizado. Esto genera un rendimiento deficiente que conduce
a la falta de respuesta. Teniendo en cuenta lo que sabemos sobre el comportamiento de los seres humanos, los usuarios
tolerarán aplicaciones con rendimiento bajo durante poco tiempo antes de abandonarlas.
Si deseas obtener más información acerca de
cómo evaluar el rendimiento de tu sitio y encontrar oportunidades para mejorarlo,
consulta las [_Consideraciones acerca de herramientas de velocidad_](/web/fundamentals/performance/speed-tools/).

<figure>
  <img srcset="images/lighthouse-2x.png 2x, images/lighthouse-1x.png 1x"
src="images/lighthouse-1x.png" alt="Descripción general del rendimiento de páginas en
Lighthouse.">
  <figcaption><b>Figura 4</b>. Descripción general del rendimiento de páginas en <a
href="/web/tools/lighthouse/">Lighthouse</a>.</figcaption>
</figure>

## El rendimiento y las personas

Los sitios y las aplicaciones con rendimiento bajo también pueden representar costos reales para las
personas que los usan.

[Como los usuarios móviles son una porción considerable de las personas que utilizan Internet
en todo el mundo](http://gs.statcounter.com/platform-market-share/desktop-mobile-tablet),
es importante tener en cuenta que muchos de estos usuarios acceden a la Web a través de
redes móviles LTE, 4G, 3G e incluso 2G. Como Ben Schwarz de Calibre indica
en [este estudio de rendimiento en el
mundo real](https://building.calibreapp.com/beyond-the-bubble-real-world-performance-9c991dcd5342),
el costo de los planes de datos prepagos está bajando, lo que hace que el uso de
Internet sea más accesible en lugares donde antes no lo era. Los dispositivos
móviles y el acceso a Internet ya no son lujos.
Son herramientas comunes necesarias para navegar y funcionar en un mundo cada vez más
interconectado.

[El tamaño total de las páginas viene aumentando de manera constante desde al menos
2011](http://beta.httparchive.org/reports/state-of-the-web#bytesTotal), y la
tendencia parece continuar. Con el aumento de la cantidad de datos que envía una página cualquiera, los usuarios
deben recargar sus planes de datos medidos con más frecuencia, lo que les cuesta dinero.

Además de hacerles ahorrar dinero a tus usuarios, una experiencia rápida y ligera
también puede ser crucial para aquellas personas en crisis. Los recursos públicos como hospitales,
clínicas y centros de atención tienen recursos en línea que brindan a los usuarios información importante
y específica que podrían necesitar durante una crisis. [Si bien el diseño
es fundamental al presentar información relevante de manera eficaz en momentos
difíciles](https://aneventapart.com/news/post/eric-meyer-designing-for-crisis),
no se debe subestimar la importancia de publicar estos datos con rapidez.
Es parte de nuestro trabajo.

## Lo que vendrá

Si bien las siguientes listas pueden parecer abrumadoras, no es
necesario que hagas _todas_ estas cosas para mejorar el rendimiento de tu
sitio. Son simplemente puntos por los que puedes empezar, así que no te desanimes.
_Cualquiera_ de estas cosas que hagas para mejorar el rendimiento será útil para tus usuarios.

### Sé consciente de los recursos que envías

Un método eficaz de desarrollar aplicaciones de buen rendimiento es [auditar
_qué_ recursos envías a tus
usuarios](/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads).
Si bien el [panel de red de Chrome DevTools](/web/tools/chrome-devtools/network-performance/)
resume muy bien los recursos que se usan en una página específica, puede resultar abrumador entender
por dónde empezar si no has considerado el rendimiento hasta ahora. He aquí algunas
sugerencias:

- Si usas Bootstrap o Foundation para desarrollar la IU, pregúntate si son
necesarios. Estas abstracciones agregan mucho código CSS que el navegador debe descargar, analizar
y aplicar a una página, todo ello antes de que el código CSS específico del sitio
entre en juego.
[Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
y [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) son
excelentes para crear diseños simples y complejos con relativamente poco código.
[Como CSS es un recurso de bloqueo
de representación](/web/fundamentals/performance/critical-rendering-path/render-blocking-css),
la sobrecarga de un marco de trabajo CSS puede retrasar la representación de forma significativa. Puedes
acelerar la representación si eliminas la sobrecarga innecesaria cada vez que sea posible.
- Las bibliotecas de JavaScript son convenientes, pero no siempre necesarias. Toma a jQuery como
ejemplo: La selección de elementos se ha simplificado mucho gracias a métodos como
[`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
y
[`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).
La vinculación de eventos es fácil de implementar con
[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
[`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList),
[`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
y
[`getAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)
ofrecen maneras sencillas para trabajar con clases y atributos de elementos. Si necesitas usar
una biblioteca, investiga para encontrar alternativas más eficientes. Por ejemplo,
[Zepto](http://zeptojs.com/) es una alternativa de menor tamaño que jQuery y
[Preact](https://preactjs.com/) es una alternativa mucho más pequeña que React.
- No todos los sitios web tienen que ser aplicaciones de una sola página (SPA), y con frecuencia hacen
mucho uso de JavaScript. [JavaScript es el recurso más costoso de publicar
en la Web byte por
byte](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e), ya que
no solo se debe descargar el código, sino que además se lo debe analizar, compilar y ejecutar. Por
ejemplo, los sitios de noticias y blogs con arquitectura front-end optimizada pueden tener un rendimiento
tan bueno como el de las experiencias tradicionales multipágina. En particular, si [el almacenamiento en
caché de HTTP](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
está bien configurado y, de manera opcional, si se usa un [service
worker](/web/fundamentals/primers/service-workers/).

### Sé consciente de cómo envías recursos

La publicación eficiente es vital para el desarrollo de experiencias de usuario rápidas.

- [Migración a HTTP/2](/web/fundamentals/performance/http2/). HTTP/2 soluciona muchos
problemas de rendimiento inherentes de HTTP/1.1, como límites de solicitudes concurrentes y
la no comprensión de encabezados.
- [Descarga recursos de manera anticipada mediante
sugerencias](/web/fundamentals/performance/resource-prioritization). `rel=preload` es
una de estas sugerencias de recursos que permite obtener recursos críticos antes de lo que
el navegador detectaría. [Esto puede tener un efecto positivo
muy marcado](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf#0106)
en la representación de la página y la reducción del [tiempo de
carga](/web/tools/lighthouse/audits/time-to-interactive) cuando se lo usa
con buen criterio. [`rel=preconnect` es otra sugerencia de recursos que puede enmascarar la
latencia de la apertura de nuevas conexiones para recursos alojados en dominios de
terceros](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/).
- Los sitios modernos envían [mucho_código
JavaScript](http://httparchive.org/trends.php#bytesJS&reqJS) [y
CSS](http://httparchive.org/trends.php#bytesCSS&reqCSS) por lo general. Era común
agrupar estilos y secuencias de comandos en conjuntos de mayor tamaño en entornos HTTP/1.
Esto se hacía porque tener una gran cantidad de solicitudes perjudicaba del rendimiento.
Este ya no es el caso ahora que está HTTP/2, ya que es menos costoso el uso de
varias solicitudes simultáneas. [Considera usar fraccionamiento de código en
webpack](https://webpack.js.org/guides/code-splitting/) para limitar la cantidad de
secuencias de comandos descargadas a la que se necesita para la página o vista actual. Separa el
código CSS en archivos de plantilla o específicos de componentes que sean de menor tamaño e incluye solo
los recursos donde sea probable que se los use.

### Sé consciente de la cantidad de datos que envías

Las siguientes son algunas sugerencias para limitar la _cantidad_ de datos que envías:

- [Minifica los recursos
de texto](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations).
La minificación es la eliminación del espacio en blanco, los comentarios y otro
contenido innecesario en recursos basados en texto. Reduce de forma significativa la cantidad de datos que
envías a los usuarios sin afectar la funcionalidad. [Usa la uglificación en
JavaScript](https://www.npmjs.com/package/uglifyjs) para generar más ahorros
al acortar los nombres de variables y métodos. Como SVG es un formato de imagen
basado en texto, [se lo puede optimizar con SVGO](https://github.com/svg/svgo).
- [Configura tu servidor para comprimir
recursos](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer).
La compresión reduce de forma drástica la cantidad de datos que envías a los usuarios,
_especialmente_ en el caso de recursos de texto. GZIP es una opción popular, pero la [compresión de Brotli puede ir
más allá](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/).
Sin embargo, debes comprender que la compresión _no_ es una solución mágica para los problemas de rendimiento:
Algunos formatos de archivo que tienen compresión intrínseca (p. ej., JPEG, PNG, GIF, WOFF,
etc.) no responden a la compresión porque ya están comprimidos.
- [Optimiza
las imágenes](/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/)
para asegurarte de que tu sitio envíe la menor cantidad posible de datos de imagen. [Como las imágenes representan
una porción grande de la carga útil promedio por página en la
Web](http://httparchive.org/trends.php#bytesImg&reqImg), la optimización de las imágenes
es una oportunidad inigualable de mejorar el rendimiento.
- Si tienes tiempo, considera publicar formatos de imagen alternativos.
[WebP](/speed/webp/) goza de una [compatibilidad razonablemente amplia
con navegadores](https://caniuse.com/#feat=webp) y utiliza menos datos que JPEG y PNG
a la vez que conserva una calidad visual elevada. [JPEG XR es otro
formato alternativo](https://jpeg.org/jpegxr/index.html) compatible con IE y Edge
que ofrece ahorros similares.
- [Entrega imágenes
de manera receptiva](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).
La enorme diversidad de dispositivos y sus pantallas representa una oportunidad
excelente a fin de mejorar el rendimiento al enviar imágenes que sean óptimas para
las pantallas en donde se las visualiza. En el más simples de los casos de uso, puedes agregar un [atributo
`srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)
a un elemento `<img>` para especificar una matriz de imágenes de entre las cuales el navegador puede elegir.
Como algo más complejo, puedes usar `<picture>` para ayudar al navegador a
elegir el formato óptimo (p. ej., WebP por sobre JPEG o PNG) o bien publicar
tratamientos completamente distintos de imágenes para tamaños de pantalla diferentes.
- [Usa video en lugar de
GIF animados](/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video/).
Los GIF animados son _enormes_. Los videos de calidad similar son _mucho_ más pequeños,
generalmente un 80 %. Si tu sitio utiliza bastantes GIF animados, probablemente
esto sea lo mejor que puedas hacer para mejorar el rendimiento de carga.
- Las [sugerencias de cliente](http://httpwg.org/http-extensions/client-hints.html) pueden
adaptar la entrega de recursos en función de las condiciones de red actuales y las características del
dispositivo. Los encabezados `DPR`, `Width` y `Viewport-Width` te pueden ayudar a
[entregar las mejores imágenes para un dispositivo mediante código desde el servidor _y_ utilizar
menos lenguaje de marcado](/web/updates/2015/09/automating-resource-selection-with-client-hints).
El encabezado `Save-Data` puede ayudarte a [entregar experiencias de aplicación más livianas para
los usuarios que específicamente te lo pidan](/web/updates/2016/02/save-data).
- La [`NetworkInformation`
API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)
expone información acerca de la conexión de red del usuario. Esta información se puede
usar a fin de modificar la experiencia de la aplicación para aquellos usuarios cuyas redes son más lentas.

Para consultar una guía más integral sobre cómo mejorar el rendimiento, consulta nuestro artículo sobre
[el modelo de rendimiento RAIL](/web/fundamentals/performance/rail), que se enfoca
en mejorar tanto el tiempo de carga como la capacidad de respuesta de la aplicación. [Nuestra guía sobre el patrón PRPL
también es un gran
recurso](/web/fundamentals/performance/prpl-pattern/) para mejorar el
rendimiento de aplicaciones de una sola página moderna.

Si te entusiasma el tema y quieres leer más acerca del rendimiento y cómo hacer que tu sitio
sea más rápido, explora nuestra documentación sobre rendimiento para obtener guías acerca de una variedad de
temas. Agregamos constantemente nuevas guías y actualizamos las existentes, así que
regresa con frecuencia.

_Agradecemos especialmente a [Addy Osmani](/web/resources/contributors/addyosmani), [Jeff
Posnick](/web/resources/contributors/jeffposnick), [Matt
Gaunt](/web/resources/contributors/mattgaunt), [Philip
Walton](/web/resources/contributors/philipwalton), [Vinamrata
Singal](/web/resources/contributors/vinamratasingal), [Daniel
An](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/)
y [Pete LePage](/web/resources/contributors/petelepage) por sus comentarios
detallados para mejorar y publicar este recurso._

## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}
