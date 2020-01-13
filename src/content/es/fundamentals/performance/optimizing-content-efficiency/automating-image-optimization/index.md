project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ¡Formatos de imagen!

{# wf_updated_on: 2019-02-06#}
{# wf_published_on: 2017-11-16 #}
{# wf_blink_components: Blink>Image,Internals>Images,Internals>Images>Codecs #}

# Cómo automatizar la optimización de imágenes {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

**Todos deberíamos automatizar nuestra compresión de imágenes.**

En 2017, la optimización de imágenes debe automatizarse. Es fácil olvidarlo; las prácticas
recomendadas cambian y el contenido que no pasa por una canalización de compilación puede
omitirse fácilmente. Para automatizar: Usa [imagemin](https://github.com/imagemin/imagemin)
o [libvps](https://github.com/jcupitt/libvips) para tu proceso de compilación. Existen
muchas alternativas.

La mayoría de las CDN (p.ej.,
[Akamai](https://www.akamai.com/us/en/solutions/why-akamai/image-management.jsp))
y soluciones de terceros como [Cloudinary](https://cloudinary.com),
[imgix](https://imgix.com), [Image
Optimizer de Fastly](https://www.fastly.com/io/), [SmartVision de
Instart Logic](https://www.instartlogic.com/technology/machine-learning/smartvision)
o la [API ImageOptim](https://imageoptim.com/api) ofrecen una optimización de imágenes
automatizada.

La cantidad de tiempo que pasarás leyendo entradas de blogs y modificando tu configuración es
mayor que la tarifa mensual por un servicio (Cloudinary posee una opción
[gratuita](http://cloudinary.com/pricing)). Si no quieres tercerizar este
trabajo por motivos de costos o latencia, las opciones de código abierto mencionadas son sólidas.
Proyectos como [Imageflow](https://github.com/imazen/imageflow) o
[Thumbor](https://github.com/thumbor/thumbor) permiten usar alternativas autoalojadas.

**Todos deben comprimir las imágenes de manera eficiente.**

Como mínimo, debe usarse [ImageOptim](https://imageoptim.com/). Esta herramienta puede reducir
significativamente el tamaño de las imágenes sin afectar la calidad visual. También hay
[alternativas](https://imageoptim.com/versions.html) disponibles para Windows y Linux.

Más específicamente: ejecuta los archivos JPEG con
[MozJPEG](https://github.com/mozilla/mozjpeg) (`q=80` o menos es suficiente para contenidos
web) y considera la compatibilidad con [JPEG
progresivo](http://cloudinary.com/blog/progressive_jpegs_and_green_martians),
los archivos PNG con [pngquant](https://pngquant.org/) y los archivos SVG con
[SVGO](https://github.com/svg/svgo). Excluye explícitamente los metadatos (`--strip`
para pngquant) para evitar un tamaño excesivo. En lugar de ofrecer archivos GIF animados extremadamente grandes, ofrece
videos [H.264](https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC) (o
[WebM](https://www.webmproject.org/) para Chrome, Firefox y Opera)! Si no
puedes hacerlo, al menos usa [Giflossy](https://github.com/pornel/giflossy). Si puedes
evitar los ciclos de CPU adicionales, necesitas una calidad superior al promedio para la Web y no te molesta
la codificación lenta, prueba
[Guetzli](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html).

Algunos navegadores anuncian su compatibilidad con formatos de imagen a través del encabezado Aceptar solicitud.
Esto puede usarse para procesar formatos condicionalmente, p. ej., con pérdida
[WebP](/speed/webp/) para navegadores basados en Blink, como
Chrome, y opciones de reserva, como JPEG/PNG para otros navegadores.

Siempre se puede hacer algo más. Existen herramientas para generar y entregar puntos de interrupción
`srcset`. La selección de recursos puede automatizarse en navegadores basados en Blink con
[client-hints](/web/updates/2015/09/automating-resource-selection-with-client-hints)
, y puedes enviar menos bytes a los usuarios que optaron por "ahorros de datos" dentro del navegador
siguiendo la sugerencia
[Save-Data](/web/updates/2016/02/save-data).


Cuanto menor tamaño de archivo tengan las imágenes, mejor será la
experiencia de red que podrás ofrecer a los usuarios, especialmente en dispositivos móviles. En esta reseña,
analizaremos maneras de reducir el tamaño de las imágenes a través de técnicas de compresión modernas
con un impacto mínimo sobre la calidad.

## Introducción {: #introduction }

**Las imágenes siguen siendo la causa número uno de los archivos de tamaño excesivo en la Web.**

Las imágenes suponen un enorme consumo de banda ancha de Internet, ya que generalmente el tamaño de esta clase de
archivos es grande. Según [HTTP Archive](http://httparchive.org/), el 60%
de los datos transferidos para obtener una página web son imágenes compuestas de archivos JPEG, PNG
y GIF. A partir de julio de 2017, las imágenes representaban
[1.7 MB](http://httparchive.org/interesting.php#bytesperpage) del contenido
cargado para un sitio web promedio de 3.0 MB.

Según Tammy Everts, se
ha
[comprobado](https://calendar.perfplanet.com/2014/images-are-king-an-image-optimization-checklist-for-everyone-in-your-organization/)
que agregar imágenes a una página o agrandar imágenes existentes son tareas que aumentan las tasas de conversión. Es poco probable que las imágenes desaparezcan. Por eso,
invertir en una estrategia de compresión eficiente para minimizar el tamaño excesivo es cada vez más
importante.


<img src="images/Modern-Image00.jpg" alt="Menos imágenes por página crean más
 conversiones. Un promedio de 19 imágenes por página tuvieron una mejor conversión que un promedio de 31
 imágenes por página." />

Según una [investigación de
Soasta/Google](https://www.thinkwithgoogle.com/marketing-resources/experience-design/mobile-page-speed-load-time/)
de 2016, las imágenes fueron el segundo factor para predecir las conversiones, y las mejores
páginas incluían un 38% menos de imágenes.


La optimización de imágenes consiste en diferentes medidas que pueden reducir el tamaño de archivo
de las imágenes. En última instancia, depende de la fidelidad visual que requieren las
imágenes.


<img src="images/image-optimisation.jpg" alt="La optimización de imágenes abarca una serie de
 diferentes técnicas" /> <strong>Optimización de imágenes:</strong> Elige el
 formato adecuado, comprime con cuidado y prioriza las imágenes críticas sobre
 las que pueden cargarse de manera diferida.


Entre las optimizaciones de imágenes comunes se encuentran la compresión, la disminución de la capacidad de respuesta
según el tamaño de la pantalla con
[`<picture>`](/web/fundamentals/design-and-ux/responsive/images)/[`<img
srcset>`](/web/fundamentals/design-and-ux/responsive/images)
y el cambio del tamaño para reducir los costos de decodificación de las imágenes.


<img src="images/chart_naedwl.jpg" alt="Un histograma de potenciales ahorros de imágenes
 de HTTP Archive valida un ahorro de imágenes potencial de 30 KB en
 el percentil 95." /> Según [HTTP
 Archive](http://jsfiddle.net/rviscomi/rzneberp/embedded/result/),
 los ahorros por imagen en el percentil 95 (cuando se analiza la función
 de distribución acumulativa) es de 30 KB.</strong>


Hay mucho espacio para que podamos optimizar mejor las imágenes de forma colectiva.


<img src="images/image-optim.jpg" alt="ImageOptim en uso en una Mac con una serie de
 imágenes que se comprimieron con ahorros superiores al 50%" />

ImageOptim es gratuito, reduce el tamaño de las imágenes mediante técnicas de compresión modernas y
la eliminación de metadatos EXIF innecesarios.



Si eres diseñador, puedes optar también por un [complemento de ImageOptim para
Sketch](https://github.com/ImageOptim/Sketch-plugin) que optimiza los
recursos durante la exportación. Descubrí que permite ahorrar mucho tiempo.

### ¿Cómo puedo saber si debo optimizar mis imágenes? {: #do-my-images-need-optimization }

Realiza una auditoría del sitio en [WebPageTest.org](https://www.webpagetest.org/) para
destacar oportunidades de optimizar mejor tus imágenes (consulta "Comprimir
imágenes").


<img src="images/Modern-Image1.jpg" alt="WebPageTest permite auditar la
 compresión de imágenes en la sección Comprimir imágenes" />

En la sección "Comprimir imágenes" de un informe de WebPageTest, se enumeran las imágenes que pueden
comprimirse de manera más eficiente y los ahorros estimados en tamaño de archivo que se pueden obtener.

<img src="images/Modern-Image2.jpg" alt="recomendaciones de compresión de imágenes de
 webpagetest" />



[Lighthouse](/web/tools/lighthouse/) audita las prácticas recomendadas de rendimiento. Incluye
auditorías de optimización de imágenes y realiza sugerencias para imágenes que
pueden comprimirse más, o bien destaca imágenes que están fuera de la pantalla y pueden
cargarse de manera diferida.

A partir de Chrome 60, Lighthouse ahora potencia el [panel
Auditsl](/web/updates/2017/05/devtools-release-notes#lighthouse) en Chrome
DevTools:


<img src="images/hbo.jpg" alt="Lighthouse audita
 HBO.com, muestra recomendaciones de optimización de imágenes" /> Lighthouse
 puede auditar el rendimiento web, las prácticas recomendadas y las funciones de Progressive Web
 App.



Es posible que también estés familiarizado con otras herramientas de auditoría de rendimiento, como [PageSpeed
Insights](/speed/pagespeed/insights/) o [Website Speed
Test](https://webspeedtest.cloudinary.com/) de Cloudinary, que incluye una
auditoría de análisis de imágenes detallada.

## <a id="choosing-an-image-format" href="#choosing-an-image-format">¿Cómo elijo un formato de imagen?</a>

Como observa Ilya Grigorik en su excelente [Guía de optimización de
imágenes](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization),
el "formato adecuado" para una imagen es una combinación de los resultados visuales y
los requisitos funcionales deseados. ¿Trabajas con imágenes de trama o vectoriales?


<img src="images/rastervvector.png" alt="imágenes vectoriales frente a imágenes de trama"
         />



Los [gráficos de trama](https://en.wikipedia.org/wiki/Raster_graphics) representan
imágenes codificando los valores de cada píxel dentro de una cuadrícula rectangular de píxeles.
No son independientes de la resolución o del zoom. WebP o los formatos ampliamente popularizados,
como JPEG o PNG, manejan estos gráficos bien en casos donde el fotorrealismo es algo necesario.
Guetzli, MozJPEG y otras ideas que hemos debatido se aplican bien a los gráficos de trama.

Los [gráficos vectoriales](https://en.wikipedia.org/wiki/Vector_graphics) usan puntos,
líneas y polígonos para representar imágenes, y los formatos con formas geométricas simples
(p. ej., logotipos) que ofrecen una alta resolución y zoom como SVG manejan este caso de uso
mejor.

El formato equivocado puede ser costoso. El flujo lógico para elegir el formato correcto
puede estar plagado de peligros, por lo que se recomienda experimentar con cuidado en relación a los ahorros que otros formatos
pueden permitir.

Jeremy Wagner trata sobre las
[desventajas](http://jlwagner.net/talks/these-images/#/2/2) que conviene tener en cuenta
al evaluar los formatos en sus charlas sobre optimización de imágenes.

## El humilde JPEG {: #the-humble-jpeg }

El [JPEG](https://en.wikipedia.org/wiki/JPEG) posiblemente sea el formato de imagen
más usado a nivel mundial. Como se señaló anteriormente, el [45% de las
imágenes](http://httparchive.org/interesting.php) que se observan en los sitios rastreados por HTTP
Archive son archivos JPEG. Un teléfono, un SLR digital, esa cámara web antigua... Prácticamente
todo admite este códec. Además es muy antiguo: su primera versión data de
1992. En esa época, había un corpus inmenso de
investigaciones realizadas que intentaban mejorar lo que ofrecía.

JPEG es un algoritmo de compresión con pérdida que descarta información para ahorrar
espacio, y muchos de los esfuerzos que vinieron después intentaban conservar la fidelidad
visual mientras se conservaba el tamaño más pequeño posible de los archivos.

**¿Qué calidad de imagen es aceptable para tu caso de uso?**

Los formatos como JPEG son ideales para fotografías o imágenes con una serie de
regiones de color. La mayoría de las herramientas de optimización permiten configurar el nivel de
compresión deseado; una compresión más alta reduce el tamaño del archivo, pero puede
introducir artefactos, halos o degradación en forma de bloques.


<img src="images/Modern-Image5.jpg" alt="Los artefactos con compresión JPEG pueden
 percibirse cada vez más a medida que pasamos de la calidad más alta a la más baja" />

JPEG: Los artefactos con compresión JPEG que se perciben pueden aumentar a medida que pasamos de la calidad más alta
a la más baja. Ten en cuenta que los puntajes de calidad de imágenes de una herramienta pueden ser muy
diferentes a los de otra.


Al elegir la opción de calidad deseada, ten en cuenta en qué segmento de calidad se enmarcan
las imágenes:

*   **Excelente calidad**: Cuando la calidad importa más que el ancho de banda. Esto puede deberse
 a que la imagen tiene una alta preponderancia en el diseño o se muestra a resolución
 completa.
*   **Buena calidad**: Cuando te importa enviar archivos de menor tamaño, pero
 no quieres que exista un impacto demasiado negativo sobre la imagen. Los usuarios siguen valorando
 cierto nivel de calidad de las imágenes.
*   **Baja calidad**: Cuando te importa más el ancho de banda y no tanto
 la degradación de las imágenes. Estas imágenes son aptas para condiciones de red
 irregulares/deficientes.
*   **Muy baja calidad**: Ahorrar ancho de banda es lo más importante. Los usuarios buscan una
 experiencia decente, pero aceptan una degradación considerable a cambio de
 una carga más rápida de las páginas.

A continuación, hablaremos sobre los modos de compresión de archivos JPEG, ya que pueden tener un gran impacto
sobre el rendimiento percibido.

Note: Es posible que a veces sobrestimemos la calidad de imagen que necesitan
los usuarios. La calidad de imagen puede considerarse una desviación de una fuente
ideal sin compresión. También puede ser subjetiva.

## Modos de compresión de archivos JPEG {: #jpeg-compression-modes }

El formato de imagen JPEG tiene una serie de diferentes [modos de
compresión](http://cs.haifa.ac.il/~nimrod/Compression/JPEG/J5mods2007.pdf). Los tres
modos populares son referencia (secuencial), JPEG progresivo (PJPEG) y sin pérdida.


**¿En qué se diferencian los archivos JPEG de referencia (secuenciales) y los progresivos?**

Los JPEG de referencia (el formato predeterminado para la mayoría de las herramientas de edición y optimización de imágenes) se
codifican y decodifican de manera relativamente simple: de arriba hacia abajo. Cuando los
JPEG de referencia se cargan en conexiones lentas o irregulares, los usuarios ven la parte superior de la imagen,
que se va revelando a medida que se carga el resto de la imagen. Los JPEG sin pérdida son similares, pero tienen un
menor índice de compresión.



<img src="images/Modern-Image6.jpg" alt="los JPEG de referencia se cargan de arriba hacia abajo" />
        Los JPEG de referencia se cargan de arriba hacia abajo, mientras que los JPEG progresivos se cargan de
 borrosos a nítidos.


Los JPEG progresivos dividen la imagen en una serie de escaneos. El primer escaneo muestra
la imagen en una versión borrosa o de baja calidad, y los siguientes van mejorando su
calidad. Pensemos en esto como una refinación "progresiva" de la imagen. Cada "escaneo" de una imagen
agrega un nivel de detalle más alto. Al combinarse, se crea una imagen de
calidad completa.


<img src="images/Modern-Image7.jpg" alt="los JPEG progresivos se cargan de
 baja resolución o alta resolución" /> </picture> Los JPEG de referencia cargan
 imágenes de arriba hacia abajo. Los PJPEG se cargan de baja resolución (borrosa) a
 alta resolución. Pat Meenan programó una [herramienta
 interactiva](http://www.patrickmeenan.com/progressive/view.php?img=https%3A%2F%2Fwww.nps.gov%2Fplanyourvisit%2Fimages%2FGrandCanyonSunset_960w.jpg)
 para poner a prueba los escaneos de JPEG progresivos y además aprender sobre ellos.


Para lograr la optimización de JPEG sin pérdida, [es necesario eliminar los datos
EXIF](http://www.verexif.com/en/) agregados por editores o cámaras digitales,
optimizar las [tablas de
Huffman](https://en.wikipedia.org/wiki/Huffman_coding) de una imagen o volver a escanear la imagen.
Las herramientas como [jpegtran](http://jpegclub.org/jpegtran/) logran una compresión
sin pérdida mediante el reordenamiento de los datos comprimidos sin degradar la imagen.
[jpegrescan](https://github.com/kud/jpegrescan),
[jpegoptim](https://github.com/tjko/jpegoptim) y
[mozjpeg](https://github.com/mozilla/mozjpeg) (sobre el que hablaremos a continuación) también
permiten lograr una compresión de JPEG sin pérdida.


### Las ventajas de los archivos JPEG progresivos {: #the-advantages-of-progressive-jpegs }

La capacidad de los PJPEG para ofrecer "vistas previas" de baja resolución de una imagen a medida que
se carga mejora el rendimiento percibido; los usuarios sienten que la imagen se carga
más rápido a comparación de las imágenes adaptables.

En conexiones 3G más lentas, esto permite que los usuarios vean (en cierta medida) el contenido de una imagen
cuando se ha recibido solo parte del archivo, y tomar la decisión de esperar
a que se cargue completamente. Esto puede ser más placentero que la visualización de arriba hacia abajo
de las imágenes que ofrecen los JPEG de referencia.


<img src="images/pjpeg-graph.png" alt="impacto en el tiempo de espera de cambiar a
 jpeg progresivos" /> En 2015, [Facebook cambió a PJPEG (en su aplicación para
 iOS)](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/)
 y redujo un 10% el consumo de datos. Se pudo lograr una buena
 calidad de imagen un 15% más rápido que antes y se optimizó el tiempo de carga
 percibido, como se muestra en la figura anterior.


Los PJPEG pueden mejorar la compresión, ya que consumen un
[2-10%](http://www.bookofspeed.com/chapter5.html) menos de ancho de banda a comparación de
los JPEG de referencia/simples para imágenes superiores a 10 KB. El índice de compresión mayor se
debe a que cada escaneo en el JPEG puede tener su propia
[tabla de Huffman](https://en.wikipedia.org/wiki/Huffman_coding) dedicada opcional. Los codificadores
de JPEG modernos (p. ej., [libjpeg-turbo](http://libjpeg-turbo.virtualgl.org/), MozJPEG,
etc.) aprovechan la flexibilidad de los PJPEG para comprimir mejor los datos.

Note: ¿Por qué los PJPEG logran una mejor compresión? Los bloques de JPEG de referencia se codifican de a uno
por vez. Con los PJPEG, los coeficientes de [transformación de coseno
discreto](https://en.wikipedia.org/wiki/Discrete_cosine_transform) similares
en más de un bloque pueden codificarse juntos, lo que produce una mejor
compresión.

### ¿Quién usa JPEG progresivos en producción? {: #whos-using-progressive-jpegs-in-production }

* [Twitter.com envía JPEG
 progresivos](https://www.webpagetest.org/performance_optimization.php?test=170717_NQ_1K9P&run=2#compress_images)
 con una referencia de calidad del 85%. Midieron la latencia percibida por el usuario
 (el tiempo hasta el primer escaneo y el tiempo de carga total) y, en términos generales, se descubrió que los PJPEG eran
 competitivos en cuanto a requisitos de tamaño pequeño y tiempos de
 transcodificación y decodificación aceptables.
* [Facebook envía JPEG progresivos para su aplicación de
 iOS](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/).
    Descubrieron que reducía un 15% el consumo de datos y les permitía mostrar una imagen
 de buena calidad un 15% más rápido.
* [Yelp cambió a JPEG
 progresivos](https://engineeringblog.yelp.com/2017/06/making-photos-smaller.html)
    y descubrió que era en parte responsable por ~4.5% de los ahorros en tamaño de
 imágenes. Además ahorraron un 13.8% adicional con MozJPEG.

### Las desventajas de los archivos JPEG progresivos {: #the-disadvantages-of-progressive-jpegs }

Los PJPEG pueden tener una decodificación más lenta que los JPEG de referencia; a veces pueden tardar hasta 3 veces
más. En equipos de escritorio con CPU potentes, esto puede ser un problema menos relevante, pero
cobra importancia en dispositivos móviles menos potentes y con recursos limitados. Mostrar capas
incompletas lleva trabajo, ya que básicamente se está decodificando la imagen varias veces. Estas
múltiples pasadas pueden consumir ciclos de CPU.

Además, los JPEG progresivos no *siempre* son más pequeños. Para imágenes muy pequeñas (como
miniaturas), los JPEG progresivos pueden ser más grandes que sus contrapartes de referencia.
Sin embargo, para este tipo de miniaturas más pequeñas, la renderización progresiva quizás no ofrezca realmente
el mismo valor.

Esto significa que al decidir si enviar o no PJPEG, debes
experimentar y encontrar el equilibrio justo entre tamaño de archivo, latencia de red y consumo
de ciclos de CPU.

Note: Los PJPEG (y todos los archivos JPEG) a veces pueden decodificarse por hardware en dispositivos
móviles. No mejora el impacto sobre la memoria RAM, pero puede compensar algunos de los problemas de la
CPU. No todos los dispositivos Android son compatibles con la aceleración por hardware, pero los dispositivos
de alta gama y todos los dispositivos iOS sí lo son.

Algunos usuarios pueden considerar que la carga progresiva es una desventaja, ya que puede
resultar difícil distinguir cuándo una imagen se terminó de cargar. Como esto puede variar
mucho según el público, debemos evaluar qué es más conveniente para los usuarios propios.

### ¿Cómo se crean los archivos JPEG progresivos? {: #how-to-create-progressive-jpegs }

Las herramientas y las bibliotecas, como [ImageMagick](https://www.imagemagick.org/),
[libjpeg](http://libjpeg.sourceforge.net/),
[jpegtran](http://jpegclub.org/jpegtran/),
[jpeg-recompress](http://jpegclub.org/jpegtran/) e
[imagemin](https://github.com/imagemin/imagemin), admiten la exportación de JPEG
progresivos. Si tienes una canalización de optimización de imágenes existente, es muy
probable que resulte sencillo agregar compatibilidad con la carga progresiva:

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    return gulp.src('images/*.jpg')
        .pipe(imagemin({
            progressive: true

        }))
        .pipe(gulp.dest('dist'));
});
```

De forma predeterminada, la mayoría de las herramientas de edición de imágenes guardan las imágenes como archivos JPEG de referencia.


<img src="images/photoshop.jpg" alt="photoshop permite exportar a jpeg
 progresivo desde el menú de exportación de archivos" /> De forma predeterminada, la mayoría de las herramientas de edición de imágenes
 guardan las imágenes como archivos JPEG de referencia. Puedes guardar cualquier imagen creada en
 Photoshop como JPEG progresivo. Para eso, debes ir al menú File -> Export -> Save for
 Web (legacy) y luego hacer clic en la opción Progressive. Sketch también
 permite exportar archivos JPEG progresivos; debes exportarlos como JPG y marcar la casilla de verificación
 ‘Progressive’ al guardar las imágenes.

### Submuestreo de croma (o color) {: #chroma-subsampling }

Los ojos dejan pasar más fácilmente la pérdida de detalle de color en una imagen (croma) que
la luminancia (en su forma breve, luma, una medida de brillo). El [submuestreo
de croma](https://en.wikipedia.org/wiki/Chroma_subsampling) es una forma de
compresión que reduce la precisión del color de una señal sin afectar tanto la luma.
Esto reduce el tamaño del archivo, en algunos casos hasta un
[15-17%](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/),
sin afectar la calidad de la imagen, y es una opción que está disponible para imágenes
JPEG. El submuestreo también puede reducir el consumo de memoria de la imagen.



<img src="images/luma-signal.jpg" alt="señal = croma + luma" />


Como el contraste es responsable de presentar las formas que vemos en una imagen, la luma,
que lo define, es muy importante. Las fotos en blanco y negro viejas o filtradas
pueden no contener color, pero gracias a la luma pueden ser igual de detalladas que
las fotos a color. El croma (el color) tiene menos impacto en la percepción visual.


<img src="images/no-subsampling.jpg"
     alt="JPEG incluye compatibilidad con numerosos tipos de submuestreo: ninguno, horizontal, y horizontal y vertical." />

JPEG admite numerosos tipos de submuestreo: ninguno, horizontal, y
horizontal y vertical. Este diagrama es de [JPEGs for the horseshoe
crabs](http://frdx.free.fr/JPEG_for_the_horseshoe_crabs.pdf), de Frédéric Kayser.


Hay una serie de muestras comunes a las que se hace referencia cuando se habla de submuestreo.
Por lo general, `4:4:4`, `4:2:2` y `4:2:0`. Pero ¿qué representan? Digamos que
un submuestreo adopta el formato A:B:C. A es la cantidad de píxeles en una fila (para los
JPEG, generalmente es 4). B representa la cantidad de color en la primera fila, y C
el color en la segunda.

* `4:4:4` no tiene compresión, por lo que el color y la luma se transportan completamente.
* `4:2:2` posee la mitad del muestreo horizontal y muestreo completo vertical.
* `4:2:0` muestrea colores de la mitad de los píxeles de la primera fila e ignora
 la segunda.

Note: jpegtran y cjpeg admiten la configuración individual de las opciones de luminancia y
croma. Esto puede lograrse agregando el indicador `-sample` (p. ej., `-sample 2x1`).

Algunas reglas generales recomendadas: la opción subsampling (`-sample 2x2`) es ideal para fotos.
no-subsampling (`-sample 1x1`) es una opción óptima para capturas de pantalla, banners y botones.
Por último, compromise (`2x1`) es la opción que se elige cuando no se está seguro de qué conviene usar.</aside>

Al reducir los píxeles en nuestros componentes de croma, es posible reducir significativamente
el tamaño de los componentes de color, reduciendo en última instancia el tamaño en bytes.


<img src="images/subsampling.jpg" alt="Configuraciones de submuestreo de Chrome para un
 archivo JPEG de calidad 80." /> Configuraciones de submuestreo de Chrome para un
 archivo JPEG de calidad 80.


Es conveniente tener en cuenta el submuestreo de croma para la mayoría de los tipos de imágenes. Hay
algunas excepciones notables: como el submuestreo se basa en las limitaciones de la vista, no es
muy bueno para comprimir imágenes donde el detalle de color puede ser igual de importante que
la luminancia (p. ej., imágenes médicas).

Las imágenes que contienen tipos de letra también pueden verse adversamente afectadas, ya que un submuestreo de mala calidad del texto puede
reducir su legibilidad. Los bordes nítidos son más difíciles de comprimir en el formato JPEG, que
está diseñado para manejar mejor las escenas fotográficas con transiciones más fluidas.



<img src="images/Screen_Shot_2017-08-25_at_11.06.27_AM.jpg" alt="Ten cuidado al
 usar submuestreo en grandes cantidades con imágenes que contienen texto" /> [Conceptos de
 JPEG](http://compress-or-die.com/Understanding-JPG/) recomienda respetar
 un submuestreo de 4:4:4 (1x1) al trabajar con imágenes que contienen
 texto.


Trivia: El método exacto de submuestreo de croma no fue incluido en la especificación
de JPEG, por lo que cada decodificador lo maneja de distinta forma. MozJPEG y
libjpeg-turbo utilizan el mismo método de escalado. Las versiones anteriores de libjpeg usan un
método diferente que agrega artefactos de anillos a color.

Note: Photoshop configura automáticamente el submuestreo de croma al usar la función ‘Save for
web’. Cuando la calidad de la imagen se configura entre 51 y 100, directamente no se utiliza
submuestreo (`4:4:4`). Cuando la calidad está por debajo de esto, se utiliza un submuestreo de
`4:2:0`. Este es uno de los motivos por los cuales se observa una reducción mucho mayor en el tamaño de los archivos
al cambiar la calidad de 51 a 50.

Note: En los debates de submuestreo, el término
[YCbCr](https://en.wikipedia.org/wiki/YCbCr) se menciona con frecuencia. Este es un modelo
que puede representar espacios de color
[RGB](https://en.wikipedia.org/wiki/RGB_color_model) con corrección de gamma. Y es
la luminancia con corrección de gamma, Cb es el componente de croma del color azul y Cr es el
componente de croma del color rojo. Si observas ExifData, verás que YCbCr aparece junto a los
niveles de muestreo.

Para leer material adicional sobre el submuestreo de croma, consulta [¿Por qué las imágenes no usan
submuestreo de
croma?](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/).

### ¿Cuánto hemos avanzado desde JPEG? {: #how-far-have-we-come-from-the-jpeg }

**Este es el estado actual de los formatos de imagen en la Web:**

*tl;dr: hay mucha fragmentación. Con frecuencia, debemos entregar condicionalmente
diferentes formatos para distintos navegadores si queremos aprovechar las ventajas que ofrece la modernidad.*


<img src="images/format-comparison.jpg" alt="formatos de imagen modernos comparados según
 su calidad." /> Se utilizan diferentes formatos (y optimizadores) de imagen modernos para
 demostrar lo que puede lograrse con un tamaño de archivo objetivo de 26 KB. Podemos
 comparar la calidad con
 [SSIM](https://en.wikipedia.org/wiki/Structural_similarity) (similitud
 estructural) o [Butteraugli](https://github.com/google/butteraugli),
 algo que analizaremos en detalle más adelante.


*   **[JPEG 2000](https://en.wikipedia.org/wiki/JPEG_2000) (2000)**: una
 mejora respecto del cambio de JPEG de una transformación basada en coseno discreto a un
 método basado en ondículas. **Compatibilidad con navegadores: Safari de escritorio + iOS**
*   **[JPEG XR](https://en.wikipedia.org/wiki/JPEG_XR) (2009)**: alternativa a
 JPEG y JPEG 2000 compatibles con
 [HDR](http://wikivisually.com/wiki/High_dynamic_range_imaging) y espacios de color
 [gamut](http://wikivisually.com/wiki/Gamut) amplios. Produce archivos
 más pequeños que los JPEG a velocidades de codificación/decodificación ligeramente más lentas. **Compatibilidad con navegadores:
    Edge, IE.**
*   **[WebP](https://en.wikipedia.org/wiki/WebP) (2010)**: formato basado en
 predicción de bloques de Google que admite compresión con y sin pérdida.
    Ofrece ahorros de bytes basados en JPEG y compatibilidad con transparencia
 para la que suelen usarse archivos PNG pesados. No tiene configuración de submuestreo de croma ni
 carga progresiva. Los tiempos de decodificación también son más lentos que la decodificación de JPEG.
    **Compatibilidad con navegadores: Chrome, Opera. Se probó en Safari y Firefox.**
*   **[FLIF](https://en.wikipedia.org/wiki/Free_Lossless_Image_Format) (2015)**: formato de imagen sin pérdida que afirma tener mejor rendimiento que PNG, WebP sin pérdida, BPG
 sin pérdida y JPEG 2000 sin pérdida basado en el índice de compresión. **Compatibilidad con navegadores:
    ninguna.**
*   **HEIF y BPG.** Desde el punto de vista de la compresión, son lo mismo pero
 con diferente envoltorio:
*   **[BPG](https://en.wikipedia.org/wiki/Better_Portable_Graphics) (2015)**:
 tiene el objetivo de ser un reemplazo con compresión más eficiente para JPEG basado en
 HEVC ([High Efficiency Video
 Coding](http://wikivisually.com/wiki/High_Efficiency_Video_Coding)). Parece
 ofrecer un mejor tamaño de archivos a comparación de MozJPEG y WebP. Es poco probable que
 se convierta en popular debido a problemas de licencia. **Compatibilidad con navegadores: ninguna. *Ten en cuenta que
 existe un formato [decodificador de JS interno del navegador](https://bellard.org/bpg/).***
*   **[HEIF](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format)
 (2015)**: formato para imágenes y secuencias de imágenes para almacenar imágenes
   con codificación HEVC a las que se ha aplicado una interpredicción limitada. Apple anunció en
 [WWDC](https://www.cnet.com/news/apple-ios-boosts-heif-photos-over-jpeg-wwdc/)
 que exploraría la posibilidad de cambiar a HEIF desde JPEG para iOS, y mencionó un ahorro
 dos veces mayor en cuanto a tamaño de archivos. **Compatibilidad con navegadores: ninguna al momento de este artículo.
    Eventualmente, Safari de escritorio y iOS 11**

Si eres más visual, quizás aprecies
[una](https://people.xiph.org/~xiphmont/demo/daala/update1-tool2b.shtml) de
[estas](http://xooyoozoo.github.io/yolo-octo-bugfixes/#cologne-cathedral&jpg=s&webp=s)
herramientas de comparación visual para algunos de los ejemplos anteriores.

Por lo tanto, **la compatibilidad con navegadores está fragmentada**, y si deseas aprovechar alguna
de las ventajas mencionadas, probablemente debas procesar opciones de reserva de forma condicional para cada uno de
los navegadores objetivo. En Google, WebP fue bastante prometedor, por lo que lo
analizaremos en más detalle a la brevedad.

También puedes procesar formatos de imágenes (p. ej., WebP, JPEG 2000) con una extensión .jpg (o
cualquier otra), ya que el navegador puede renderizar una imagen y decidir el tipo de medio. Esto
permite una [negociación del
tipo de contenido](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/)
del lado del servidor para decidir qué imagen enviar sin necesidad de realizar ningún cambio en el código HTML.
Los servicios como Instart Logic usan este enfoque al enviar imágenes a sus
clientes.

Ahora hablaremos sobre una opción para los casos donde no se pueden procesar
diferentes formatos de imagen de forma condicional: **la optimización de codificadores JPEG**.


### Optimización de codificadores JPEG {: #optimizing-jpeg-encoders }

Los codificadores JPEG modernos intentan producir archivos JPEG más pequeños y de alta fidelidad
conservando la compatibilidad con los navegadores y las aplicaciones de procesamiento de imágenes
existentes. Evitan la necesidad de introducir nuevos formatos de imagen o cambios en el
ecosistema para poder lograr mejoras de compresión. Dos de estos codificadores son
MozJPEG y Guetzli.

***tl;dr ¿Qué codificador JPEG se debe usar para la optimización?***

* Recursos web generales: MozJPEG
* La calidad es la principal preocupación, y no importa si los tiempos de codificación son prolongados: usa Guetzli
* Si necesitas capacidad de configuración:
 * [JPEGRecompress](https://github.com/danielgtaylor/jpeg-archive) (que usa
 MozJPEG bajo la superficie)
 * [JPEGMini](http://www.jpegmini.com/). Es similar a Guetzli: selecciona la mejor
 calidad automáticamente. No es tan sofisticado técnicamente como Guetzli, pero
 es más rápido y apunta a un rango de calidad más apto para la Web.
 * [API ImageOptim](https://imageoptim.com/api) (con interfaz en línea gratuita
 [aquí](https://imageoptim.com/online)): es única en su manejo del
 color. Puede seleccionar por separado la calidad del color y la calidad general. Elige
 automáticamente el nivel de submuestreo de croma para conservar colores de alta resolución en
 capturas de pantalla, pero evita el desperdicio de bytes en colores suaves en fotos naturales.

### ¿Qué es MozJPEG? {: #what-is-mozjpeg }

Mozilla ofrece un codificador JPEG modernizado con
[MozJPEG](https://github.com/mozilla/mozjpeg). MozJPEG
[afirma](https://research.mozilla.org/2014/03/05/introducing-the-mozjpeg-project/)
recortar hasta un 10% de los archivos JPEG. Los archivos comprimidos con MozJPEG funcionan
entre navegadores, y algunas de sus funciones incluyen optimización de escaneo progresivo,
[cuantificación de trellis](https://en.wikipedia.org/wiki/Trellis_quantization)
(la eliminación de los detalles que comprimen menos) y algunas [opciones predefinidas
de tablas de cuantificación](https://calendar.perfplanet.com/2014/mozjpeg-3-0/) decentes que ayudan a
crear imágenes más suaves de altos DPI (aunque esto puede hacerse con ImageMagick si
estás dispuesto a batallar con configuraciones XML).

MozJPEG es compatible con
[ImageOptim](https://github.com/ImageOptim/ImageOptim/issues/45), y hay un
[complemento de
imagemin](https://github.com/imagemin/imagemin-mozjpeg) de configuración bastante confiable para él. Este es un ejemplo de
implementación con Gulp:

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('mozjpeg', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([imageminMozjpeg({
        quality: 85

    })]))
    .pipe(gulp.dest('dist'))
);
```


<img src="images/Modern-Image10.jpg" alt="mozjpeg ejecutado desde la
 línea de comandos" />




<img src="images/Modern-Image11.jpg" alt="compresión de mozjpeg a diferentes
 calidades. A q=90, 841 KB. A q=85, 562 KB. A q=75, 324 KB. De manera similar,
 los puntajes de Butteraugli y SSIM empeoran ligeramente a medida que reducimos la calidad." />

MozJPEG: Una comparación de tamaños de archivo y puntajes de similitud visual en diferentes
calidades.

Utilicé [jpeg-compress](https://github.com/imagemin/imagemin-jpeg-recompress)
del proyecto [jpeg-archive](https://github.com/danielgtaylor/jpeg-archive)
para calcular los puntajes de SSIM (similitud estructural) de una imagen de origen.
SSIM es un método para medir la similitud entre dos imágenes, donde el puntaje
SSIM es la medida de calidad de una imagen donde se considera a la otra como "perfecta".

En mi experiencia, MozJPEG es una buena opción para comprimir imágenes para la Web con
una alta calidad visual y reducciones en el tamaño del archivo. Para imágenes
pequeñas a medianas, descubrí que MozJPEG (con archivos de calidad=80-85) produjo ahorros del 30-40% en
el tamaño de archivos, a la vez que los puntajes de SSIM se mantenían en un nivel aceptable, con una mejora del 5-6% respecto de
jpeg-turbo. Incluye un costo de [codificación
más lenta](http://www.libjpeg-turbo.org/About/Mozjpeg) que los JPEG de referencia, pero
no debes considerar esto un factor excluyente.

Note: Si necesitas una herramienta compatible con MozJPEG que tenga opciones de configuración adicionales
y algunas utilidades complementarias para la comparación de imágenes, consulta
[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive). Jeremy Wagner,
autor de Web Performance in Action, tuvo cierto grado de éxito usando esto con
[la siguiente](https://twitter.com/malchata/status/884836650563579904) configuración.


### ¿Qué es Guetzli? {: #what-is-guetzli }

[Guetzli](https://github.com/google/guetzli) es un codificador JPEG de Google
prometedor, aunque algo lento y perceptivo, que intenta encontrar el JPEG más pequeño y
perceptualmente indistinguible del original para el ojo humano. Realiza una
secuencia de experimentos que producen una propuesta para el JPEG final que representa
el error psicovisual de cada propuesta. Entre ellas, selecciona la
propuesta de mejor puntaje como resultado final.

Para medir las diferencias entre imágenes, Guetzli usa
[Butteraugli](https://github.com/google/butteraugli), un modelo para medir
diferencias entre imágenes basado en la percepción humana (más información a continuación). Guetzli puede tomar
en cuenta algunas propiedades de la visión que otros codificadores JPEG no consideran. Por
ejemplo, hay una relación entre la cantidad de luz verde observada y
la sensibilidad al azul, por lo que los cambios del azul cercano al verde pueden codificarse
con un poco menos de precisión.

Note: El tamaño del archivo de imagen depende **mucho** más de la opción de **calidad**
que de la opción de **códec**. Hay diferencias de tamaño de archivo
mucho más grandes entre los archivos JPEG de mayor y menor calidad a comparación de los ahorros en tamaño de archivo
que se logran al cambiar de códec. El uso de la calidad más baja aceptable siempre es muy
importante. Evita configurar una calidad demasiado alta sin prestarle atención.

Guetzli
[afirma](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html
) lograr una reducción del 20-30% en el tamaño de los datos para imágenes de un puntaje
de Butteraugli determinado a comparación de otros compresores. Una gran salvedad si se usa Guetzli es que
se trata de una opción extremadamente lenta y, por el momento, solo es apta para contenido estático.
Leyendo el archivo README, advertimos que Guetzli requiere una gran cantidad de memoria: puede
tardar 1 minuto + 200 MB de RAM por megapíxel. Hay un buen debate sobre experiencias
concretas con Guetzli en [este hilo de
Github](https://github.com/google/guetzli/issues/50). Puede ser ideal para casos en que
deben optimizarse imágenes como parte de un proceso de compilación para un sitio estático, pero no tanto
cuando se trabaja según demanda.

Note: Guetzli puede ser más apto cuando se optimizan imágenes como parte de un
proceso de compilación para un sitio estático, o situaciones donde la optimización de imágenes no
se realiza según demanda.

Herramientas como ImageOptim son compatibles con la optimización de Guetzli (en [sus versiones
más recientes](https://imageoptim.com/)).

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminGuetzli = require('imagemin-guetzli');

gulp.task('guetzli', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([
        imageminGuetzli({
            quality: 85
        })
    ]))
    .pipe(gulp.dest('dist'))

);
```


<img src="images/Modern-Image12.jpg" alt="guetzli ejecutado desde gulp con fines de
 optimización" />


Tardó casi siete minutos (con un alto consumo de CPU) para codificar 3 imágenes de 3 MP con
Guetzli, con distintas instancias de guardado. Para archivar fotos de alta resolución, entiendo que
esta opción tiene cierto valor.


<img src="images/Modern-Image13.jpg" alt="comparación de guetzli a diferentes
 calidades. q=100, 945 KB. q=90, 687 KB. q=85, 542 KB." /> Guetzli: Una
 comparación de tamaños de archivo y puntajes de similitud visual en diferentes
 calidades.



Note: Se recomienda ejecutar Guetzli en imágenes de alta calidad (p. ej., imágenes de entrada
sin comprimir, imágenes PNG de origen o JPEG con calidad del 100% o cerca de ese valor). Aunque funcionará
con otras imágenes (p. ej., JPEG de calidad 84 o inferior), los resultados pueden no ser igual de buenos.

Aunque comprimir una imagen con Guetzli consume mucho (mucho) tiempo y hace
girar los ventiladores de la CPU, vale la pena usarlo con imágenes de gran tamaño. Observé una serie de
ejemplos donde permitió ahorrar hasta un 40 % en tamaño de archivo sin afectar la fidelidad
visual. Esto lo convierte en una opción ideal para archivar fotos. En imágenes de tamaño pequeño a
mediano, he advertido cierto ahorro (en el rango de 10 KB-15 KB), pero no
tan pronunciado. Guetzli puede introducir una distorsión más parecida a la del filtro Liquify en
imágenes más pequeñas durante la compresión.

También es posible que sea útil la investigación de Eric Portis, quien
[compara](https://cloudinary.com/blog/a_closer_look_at_guetzli) Guetzli con
la compresión automática de Cloudinary para obtener un punto de datos diferente en cuanto a la efectividad.

### ¿Cómo se compara MozJPEG con Guetzli? {: #mozjpeg-vs-guetzli }

Comparar diferentes codificadores JPEG es una tarea compleja. Deben compararse la
calidad y la fidelidad de la imagen comprimida, además del tamaño final. Como señala
el experto en compresión de imágenes Kornel Lesi&#x144;, evaluar comparativamente no uno sino los dos
aspectos puede llevar a
conclusiones [inválidas](https://kornel.ski/faircomparison).

¿Cómo se compara Guetzli con MozJPEG? - Esta es la opinión de Kornel:

* Guetzli está configurado para imágenes de mayor calidad (se afirma que butteraugli es mejor para
  `q=90`+, y la ventaja de MozJPEG se encuentra en torno a `q=75`)
* Guetzli es mucho más lento para comprimir (ambos producen JPEG estándar, por lo que la decodificación
 tiene la velocidad habitual)
* MozJPEG no selecciona automáticamente la configuración de calidad, pero puede encontrar una
 calidad óptima con una herramienta externa, p. ej.,
  [jpeg-archive](https://github.com/danielgtaylor/jpeg-archive)

Hay una serie de métodos para determinar si las imágenes comprimidas son visualmente
similares o se perciben similares a las imágenes de origen. Los estudios de calidad de imagen generalmente usan
métodos como [SSIM](https://en.wikipedia.org/wiki/Structural_similarity)
(similaridad estructural). Sin embargo, Guetzli está optimizado para Butteraugli.

### Butteraugli {: #butteraugli }

[Butteraugli](https://github.com/google/butteraugli) es un proyecto de Google que
estima el punto en el que una persona puede advertir una degradación visual de la imagen (la
similitud psicovisual) entre dos imágenes. Asigna un puntaje para las imágenes que es
confiable en el ámbito de las diferencias apenas perceptibles. Butteraugli no solo asigna
un puntaje escalar, sino que además computa un mapa espacial del nivel de las
diferencias. Mientras que SSIM analiza el total de los errores de una imagen,
Butteraugli se concentra en la peor parte.


<img src="images/Modern-Image14.jpg" alt="butteraugli validando una imagen de un
 loro" /> Arriba observamos un ejemplo que utilizó Butteraugli para encontrar el umbral
 mínimo de calidad de JPEG antes de que la degradación visual fuera considerable
 y un usuario pudiera advertir que algo no era claro. Logró una reducción del 65% en el tamaño
 total del archivo.



En la práctica, se define un objetivo de calidad visual que se ejecuta
según una serie de distintas estrategias de optimización de imágenes, y se analizan los
puntajes de Butteraugli antes de seleccionar algo que constituya el equilibrio ideal entre
tamaño de archivo y nivel.


<img src="images/Modern-Image15.jpg"
        alt="butteraugli ejecutado desde la línea de comandos" /> En total, me llevó
 aproximadamente 30 minutos configurar localmente Butteraugli después de instalar Bazel y
 obtener una compilación de los códigos fuente de C++ para poder compilarlos correctamente en mi Mac. Usarlo
 es relativamente sencillo: deben especificarse las dos imágenes que se van a
 comparar (una de origen y una versión comprimida) para que otorgue un puntaje a partir del cual
 se trabajará.


**¿En qué se diferencia Butteraugli de otras maneras de comparar la similitud visual?**

[Este
comentario](https://github.com/google/guetzli/issues/10#issuecomment-276295265)
de un miembro de proyecto de Guetzli sugiere que Guetzli logra mejores puntajes en Butteraugli y peores
en SSIM, y que MozJPEG alcanza aproximadamente los mismos puntajes en ambos. Esto se condice con la
investigación que realicé para mi propia estrategia de optimización de imágenes. Ejecuto Butteraugli y
un módulo Node como [img-ssim](https://www.npmjs.com/package/img-ssim) en
imágenes que comparan la de origen con sus puntajes de SSIM antes y después de Guetzli y
MozJPEG.

**¿Combinar codificadores?**

Para imágenes de gran tamaño, descubrí que combinar Guetzli con **compresión sin pérdida** en
MozJPEG (jpegtran, no cjpeg para no desperdiciar el trabajo realizado por Guetzli)
puede producir una reducción adicional del 10-15% en el tamaño de archivos (55% en total) con solo
disminuciones menores de SSIM. Esto es algo en lo que yo recomendaría
experimentación y análisis, pero otras personas también lo intentaron en el campo, como
[Ariya Hidayat](https://ariya.io/2017/03/squeezing-jpeg-images-with-guetzli), con
resultados promisorios.

MozJPEG es un codificador para novatos orientado a recursos web que es relativamente rápido
y produce imágenes de buena calidad. Debido a que Guetzli consume muchos recursos y funciona
mejor en imágenes más grandes y de mayor calidad, es una opción que reservaría para
usuarios intermedios y avanzados.


## ¿Qué es WebP? {: #what-is-webp }

[WebP](/speed/webp/) es un formato de imagen reciente de
Google que intenta ofrecer archivos de tamaño reducido para compresión con y sin pérdida a
una calidad visual aceptable. Incluye compatibilidad para animación y transparencia de
canal alfa.

En el último año, WebP obtuvo una ventaja de algunos puntos porcentuales en términos de compresión (modos con y sin
pérdida). En términos de velocidad, el algoritmo duplicó su velocidad, con una mejora del 10%
en la descompresión.  WebP no es una herramienta multiuso, pero tiene
cierta posición y una base de usuarios en crecimiento en la comunidad de compresión de imágenes. Ahora analizaremos
a qué se debe esto.


<img src="images/Modern-Image16.jpg" alt="comparación de webp en diferentes
 configuraciones de calidad. q=90, 646 KB. q=80= 290 KB. q=75, 219 KB. q=70, 199 KB" />
 WebP: Una comparación de tamaños de archivo y puntajes de similitud visual en
 diferentes calidades.


### ¿Qué rendimiento tiene WebP? {: #how-does-webp-perform }

**Compresión con pérdida**

Los archivos WebP con pérdida, que utilizan una variante de codificación de fotograma clave de video VP8 o VP9, son citados
por el equipo de WebP como una opción que ofrece tamaños un
[25-34%](/speed/webp/docs/webp_study) más pequeños en promedio que los
archivos JPEG.

En el rango de baja calidad (0-50), WebP tiene una mayor ventaja respecto de JPEG, ya que
puede disimular molestos artefactos con bloques. Una configuración de calidad media (-m 4 -q 75)
es el equilibrio predeterminado entre velocidad y tamaño de archivo. En el rango superior (80-99), las
ventajas de WebP se reducen. WebP es una opción recomendada en casos donde la velocidad es más importante que la
calidad.

**Compresión sin pérdida**

[Los archivos WebP sin pérdida son un 26% más pequeños que los archivos
PNG](/speed/webp/docs/webp_lossless_alpha_study).
El tiempo de carga de archivos sin pérdida se reduce un 3% respecto de PNG. Más allá de eso, en términos generales,
no es conveniente ofrecer opciones sin pérdida a los usuarios en la Web. Existe una diferencia
entre opciones sin pérdida y bordes nítidos (p. ej., opciones no JPEG). El formato WebP sin pérdida puede ser más
apto para archivar contenidos.

**Transparencia**

WebP posee un canal de transparencia de 8 bits sin pérdida, con solo un 22% más de bytes que
PNG. También admite la transparencia RGB con pérdida, que es una función exclusiva de WebP.

**Metadatos**

El formato de archivo WebP es compatible con metadatos de fotos EXIF y metadatos de documentos digitales
XMP. También contiene un perfil de color ICC.

WebP ofrece una mejor compresión, con la desventaja de un uso más intensivo de la CPU. En
2013, la velocidad de compresión de WebP era aproximadamente 10 veces mejor que JPEG, pero ahora es
insignificante (algunas imágenes pueden ser 2 veces más lentas). En el caso de las imágenes estáticas que se procesan
como parte de la compilación, esto no debería ser un problema considerable. Las imágenes generadas
dinámicamente probablemente representen un aumento perceptible en el consumo de CPU, y es algo que
deberá evaluarse en cada caso.

Note: La configuración de calidad de WebP con pérdida no es directamente comparable con JPEG. Un JPEG al
«70% de calidad" es bastante diferente a una imagen WebP al «70% de calidad", ya que
WebP logra tamaños de archivo más reducidos mediante la eliminación de más datos.


### ¿Quién usa WebP en producción? {: #whos-using-webp-in-production }

Muchas empresas grandes usan WebP en producción para reducir costos y reducir
los tiempos de carga de páginas web.

Google informó que con WebP se logran ahorros del 30-35% a diferencia de otros esquemas de compresión con pérdida y
se procesan 43 mil millones de solicitudes de imágenes por día (el 26% de ellas con compresión sin pérdida).
Sin duda se trata de muchas solicitudes y de ahorros significativos. Los ahorros serían claramente
mayores si la [compatibilidad con navegadores](http://caniuse.com/#search=webp) fuera mejor y más
amplia. Google también usa esta herramienta en sitios de producción, como Google Play y
YouTube.

Netflix, Amazon, Quora, Yahoo, Walmart, Ebay, The Guardian, Fortune, y USA
Today comprimen y utilizan imágenes con WebP en navegadores compatibles con ese formato.
VoxMedia [redujo entre 1 y 3 segundos los tiempos
de carga](https://product.voxmedia.com/2015/8/13/9143805/performance-update-2-electric-boogaloo)
en The Verge al cambiar a WebP para sus usuarios de Chrome.
[500px](https://iso.500px.com/500px-color-profiles-file-formats-and-you/) informó una
reducción promedio del 25% en el tamaño de los archivos de imagen con calidad similar o superior
al optar por utilizar esta herramienta con sus usuarios de Chrome.

Hay algunas empresas más, aparte de las incluidas en esta lista, que también la usan.


<img src="images/webp-conversion.jpg" alt="Estadísticas de WebP en Google: en 43 mil millones
 de solicitudes de imágenes por día" /> Uso de WebP en Google: Se envían 43 mil millones de solicitudes de imágenes WebP
 por día a través de YouTube, Google Play, Chrome Data Saver y G+.

### ¿Cómo funciona la codificación WebP? {: #how-does-webp-encoding-work }

La codificación con pérdida de WebP está diseñada para competir con JPEG en imágenes fijas. Hay
tres fases clave en la codificación con pérdida de WebP:

**Formación de macrobloques**: dividir una imagen en bloques de 16x16 (macro) de píxeles de luma
y dos bloques de 8x8 de píxeles de croma. Esto puede relacionarse con la idea de
archivos JPEG que realizan conversión de espacios de color, reducción de resolución de muestreo de canales de croma y subdivisión de
imágenes.


<img src="images/Modern-Image18.png" alt="Ejemplo de formación de macrobloques de un Google
 Doodle, donde descomponemos un rango de píxeles en bloques de luma y
 croma."/>



**Predicción**: cada subbloque de 4x4 de un macrobloque tiene un modelo de predicción
aplicado que efectivamente utiliza filtrado. Esto define dos conjuntos de píxeles en torno a
un bloque: A (la fila que está ubicada arriba del bloque) y L (la columna a la izquierda del bloque).
Con estos dos elementos, el codificador rellena un bloque de prueba con píxeles de 4x4 y determina
cuál crea valores más cercanos al bloque original. Colt McAnlis habla sobre
esto con mayor profundidad en [How WebP lossy mode
works](https://medium.com/@duhroach/how-webp-works-lossly-mode-33bd2b1d0670).



<img src="images/Modern-Image19.png" alt="Ejemplo de Google Doodle de un segmento
 que muestra la fila, el bloque de destino y la columna L al considerar un
 modelo de predicción."/>



Se aplica una transformación de coseno discreto (DCT) con algunos pasos similares a la codificación de
JPEG. Una diferencia clave es el uso de un [compresor
aritmético](https://www.youtube.com/watch?v=FdMoL3PzmSA&index=7&list=PLOU2XLYxmsIJGErt5rrCqaSGTMyyqNt2H)
versus el uso de Huffman en JPEG.

Si deseas profundizar más en este tema, el artículo de Google Developer llamado [WebP Compression
Techniques](/speed/webp/docs/compression) aborda
estas cuestiones en más detalle.


### Compatibilidad con navegadores de WebP {: #webp-browser-support }

No todos los navegadores son compatibles con WebP. Sin embargo, [según
CanIUse.com](http://caniuse.com/webp), la compatibilidad global con usuarios es de aproximadamente el 74%.
Chrome y Opera poseen soporte nativo para WebP. Safari, Edge y Firefox han
experimentado con WebP, pero aún no lo han incluido en las versiones oficiales. Esto a menudo
significa que la tarea de que la imagen WebP llegue al usuario está en manos del desarrollador.
Más adelante volveremos sobre este tema.

Estos son los principales navegadores y la información de compatibilidad de cada uno:

* Chrome: Chrome comenzó a tener compatibilidad total con WebP en la versión 23.
* Chrome para Android: A partir de Chrome 50
* Android: A partir de Android 4.2
* Opera: A partir de 12.1
* Opera Mini: Todas las versiones
* Firefox: Compatibilidad en algunas versiones beta
* Edge: Compatibilidad en algunas versiones beta
* Internet Explorer: Sin compatibilidad
* Safari: Compatibilidad en algunas versiones beta

WebP también tiene desventajas. Carece de opciones de espacio de color a resolución completa
y no permite decodificación progresiva. Dicho eso, las herramientas para WebP son decentes,
y la compatibilidad con navegadores, aunque está limitada a Chrome y Opera al momento de redactar este artículo,
bien puede cubrir a una porción suficiente de usuarios para que se considere una opción de
reserva.

### ¿Cómo convierto mis imágenes a WebP? {: #how-do-i-convert-to-webp }

Varios paquetes de procesamiento y edición de imágenes de código abierto y comerciales son compatibles con
WebP. Una aplicación particularmente útil es XnConvert: un convertidor de procesamiento de imágenes
en lote gratuito y para varias plataformas.

Note: Es importante evitar la conversión de JPEG de calidad promedio o baja a WebP.
Este es un error común, y puede generar imágenes WebP con artefactos de compresión
JPEG. Esto puede provocar que WebP sea menos eficiente, ya que debe guardar la
imagen _y también_ las distorsiones agregadas por JPEG; esto puede llevar a una pérdida de calidad
doble. El archivo de entrada de las aplicaciones de conversión siempre debe ser el de mejor calidad disponible, preferiblemente
el original.

**[XnConvert](http://www.xnview.com/en/xnconvert/)**

XnConvert permite el procesamiento de imágenes en lote, compatible con más de 500 formatos de
imagen. Puedes combinar más de 80 acciones por separado para transformar o editar las
imágenes de varias maneras.


<img src="images/Modern-Image20.png" alt="Aplicación XNConvert en Mac, donde se han convertido
 una serie de imágenes a WebP"
         />
XnConvert permite la optimización de imágenes en lote y la conversión directa de
archivos de origen a WebP y otros formatos. Además de la
compresión, XnConvert también puede ayudar a eliminar y recortar metadatos, personalizar
la profundidad de color y otras transformaciones.


Algunas de las opciones incluidas en el sitio web xnview son las siguientes:

* Metadatos: Edición
* Transformaciones: Rotar, Recortar, Cambiar tamaño
* Ajustes: Brillo, Contraste, Saturación
* Filtros: Esfumar, Relieve, Mejorar
* Efectos: Máscara, Maca de agua, Viñetas

Los resultados de las operaciones pueden exportarse a aproximadamente 70 formatos de
archivo diferentes, entre ellos WebP. XnConvert es gratuito para Linux, Mac y Windows.
XnConvert se recomienda especialmente para pequeñas empresas.

**Módulos Node**

[Imagemin](https://github.com/imagemin/imagemin) es un módulo de minificación de imágenes
popular que también posee un complemento para convertir imágenes a WebP
([imagemin-webp](https://github.com/imagemin/imagemin-webp)). Esto admite los
modos con y sin pérdida.

Para instalar imagemin y imagemin-webp, ejecute lo siguiente:

```
> npm install --save imagemin imagemin-webp
```

Podemos usar require() en ambos módulos y ejecutarlos para cualquier imagen (p. ej., JPEG)
en un directorio de proyecto. A continuación, estamos usando la codificación con pérdida con un codificador WebP
de calidad 60:


```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg}'], 'images', {
    use: [
        imageminWebp({quality: 60})
    ]
}).then(() => {
    console.log('Images optimized');
});
```


De manera similar que con los archivos JPEG, se pueden advertir artefactos de compresión en nuestra salida.
Debes evaluar qué configuración de calidad conviene para tus propias imágenes. Imagemin-webp también
puede usarse para codificar imágenes WebP de calidad sin pérdida (compatibles con color de 24 bits y
transparencia completa) pasando `lossless: true` a las opciones:


```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg,png}'], 'build/images', {
    use: [
        imageminWebp({lossless: true})
    ]
}).then(() => {
    console.log('Images optimized');
});
```


También hay un [complemento de WebP para Gulp](https://github.com/sindresorhus/gulp-webp) de Sindre
Sorhus, programado según imagemin-webp, y un [loader de WebP para
WebPack](https://www.npmjs.com/package/webp-loader) disponibles. El complemento de
Gulp acepta cualquiera de las opciones que acepta el accesorio de imagemin:

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        quality: 80,
        preset: 'photo',
        method: 6
    }))
    .pipe(gulp.dest('dist'))
);
```

O sin pérdida:

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp-lossless', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        lossless: true
    }))
    .pipe(gulp.dest('dist'))
);
```

**Optimización de imágenes en lote con Bash**

XNConvert admite la compresión de imágenes en lote, pero si prefieres no
usar una aplicación o un sistema de compilación, bash y los binarios de optimización de imágenes simplifican bastante
las tareas.

Puedes convertir en lote imágenes a WebP con
[cwebp](/speed/webp/docs/cwebp):

```
find ./ -type f -name '*.jpg' -exec cwebp -q 70 {} -o {}.webp \;
```

O bien puedes optimizar las imágenes de origen en lote con MozJPEG utilizando
[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive):

```
find ./ -type f -name '*.jpg' -exec jpeg-recompress {} {} \;
```

y recortar esos SVG con [svgo](https://github.com/svg/svgo) (tema que trataremos
más adelante):

```
find ./ -type f -name '*.svg' -exec svgo {} \;
```

Jeremy Wagner publicó un análisis más integral sobre [la optimización de imágenes con
Bash](https://jeremywagner.me/blog/bulk-image-optimization-in-bash) y otro
artículo sobre la forma de realizar este trabajo en
[paralelo](https://jeremywagner.me/blog/faster-bulk-image-optimization-in-bash)
que valen la pena leer.

**Otras aplicaciones de procesamiento y edición de imágenes WebP son las siguientes:**

   * Leptonica: un sitio web entero sobre aplicaciones de procesamiento y análisis de imágenes de código
 abierto.

* Sketch admite la salida directa a WebP
 * GIMP: alternativa gratuita y de código abierto a Photoshop. Editor de imágenes.
    * ImageMagick: permite crear, diseñar, convertir o editar imágenes de mapas de bits. Gratuito.
      Aplicación de línea de comandos.
    * Pixelmator: editor de imágenes comercial para Mac.
    * Complemento de WebP para Photoshop: gratuito. Importación y exportación de imágenes. De Google.

**Android:** Puedes convertir imágenes BMP, JPG, PNG o GIF estáticos a formato WebP
con Android Studio. Para obtener más información, consulta [Create WebP Images Using
Android Studio](https://developer.android.com/studio/write/convert-webp.html).

### <a id="how-do-i-view-webp-on-my-os" href="#how-do-i-view-webp-on-my-os">¿Cómo veo las imágenes WebP en mi SO?</a>

Aunque puedes arrastrar y soltar imágenes WebP en navegadores basados en Blink (Chrome, Opera,
Brave) para acceder a una vista previa, también hay una vista previa disponible directamente desde tu SO con un
complemento para Mac o Windows.

[Facebook experimentó con
WebP](https://www.cnet.com/news/facebook-tries-googles-webp-image-format-users-squawk/)
hace algunos años y descubrió que los usuarios que intentaban hacer clic con el botón derecho en las fotos y guardarlas en
el disco advertían que no se visualizaban fuera del navegador debido a
que estaban en formato WebP. Aquí había tres problemas fundamentales:

<ul> <li>"Guardar como" no tenía la capacidad para visualizar localmente archivos WebP. Para corregir este problema,
se registró Chrome como programa compatible con la extensión ".webp".</li> <li> "Guardar como" y
adjuntar la imagen a un correo electrónico y compartirla con una persona que no tiene Chrome.
Para resolver este problema, Facebook introdujo un botón "descargar" destacado en su IU
y devolvía un archivo en formato JPEG cuando los usuarios solicitaban la descarga.</li> <li>Right click >
copiar URL -> compartir URL en la Web. Esto se resolvió mediante la [negociación del
tipo de contenido](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/).</li>
</ul>

Estos problemas pueden ser menos importantes para tus usuarios, pero es un elemento interesante sobre
la capacidad para compartir contenido en medios sociales. Afortunadamente, actualmente existen utilidades para ver
y trabajar con WebP en diferentes sistemas operativos.

En Mac, prueba [el complemento Quick Look para
WebP](https://github.com/Nyx0uf/qlImageSize) (qlImageSize). Funciona bastante
bien:


<img src="images/Modern-Image22.jpg" alt="Escritorio en una Mac que muestra la vista previa de
 un archivo WebP con el complemento Quick Look para archivos WebP"
         />



En Windows, también puedes descargar el [paquete de códecs
WebP](https://storage.googleapis.com/downloads.webmproject.org/releases/webp/WebpCodecSetup.exe)
para poder acceder a una vista previa de imágenes WebP en el explorador de archivos y en el visor de fotos de
Windows.

### ¿Cómo proceso archivos WebP? {: #how-do-i-serve-webp }

Los navegadores no compatibles con WebP pueden terminar no mostrando en absoluto la imagen, algo que
no es ideal. Para evitar esta situación, a continuación presentamos algunas estrategias que se pueden usar
para procesar condicionalmente imágenes WebP según la compatibilidad con el navegador.


<img src="images/play-format-webp.jpg" alt="El panel Chrome DevTools Network
 que muestra la cascada de Play Store en Chrome, donde se ofrece
 WebP."
         />
El panel Chrome DevTools Network destaca los archivos WebP que se entregan
condicionalmente a navegadores basados en Blink en la columna "Tipo".




<img src="images/play-format-type.jpg" alt="Aunque Play Store ofrece entrega WebP
 a Blink, utiliza archivos JPEG como reserva para navegadores como Firefox."
         />
Aunque Play Store ofrece entrega WebP a Blink, utiliza archivos JPEG como reserva para navegadores
como Firefox.



Estas son algunas de las opciones para obtener imágenes WebP del servidor para los
usuarios:

**Uso de .htaccess para procesar copias de WebP**

Esta es la manera de usar un archivo .htaccess para procesar archivos WebP en navegadores compatibles
cuando existe una versión coincidente de .webp de un archivo JPEG/PNG en el servidor.

Vincent Orback recomendó el siguiente enfoque:

Los navegadores pueden [señalizar explícitamente la compatibilidad con
WebP](http://vincentorback.se/blog/using-webp-images-with-htaccess/) a través de
un encabezado [Accept
](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept). Si
controlas el backend, puedes devolver una versión WebP de una imagen existente
en el disco en lugar de formatos como JPEG o PNG. Sin embargo, esto no siempre es posible
(p. ej., para hosts estáticos, como páginas GitHub o S3), por lo que debes asegurarte de comprobarlo
antes de considerar esta opción.

Este es un ejemplo de archivo .htaccess para un servidor web Apache:

```
<IfModule mod_rewrite.c>

  RewriteEngine On

  # Check if browser support WebP images
  RewriteCond %{HTTP_ACCEPT} image/webp

  # Check if WebP replacement image exists
  RewriteCond %{DOCUMENT_ROOT}/$1.webp -f

  # Serve WebP image instead
  RewriteRule (.+)\.(jpe?g|png)$ $1.webp [T=image/webp,E=accept:1]

</IfModule>

<IfModule mod_headers.c>

    Header append Vary Accept env=REDIRECT_accept

</IfModule>

AddType  image/webp .webp
```

Si existe algún problema con las imágenes .webp que aparecen en la página, asegúrate de
que el tipo de imagen/webp MIME esté habilitado en el servidor.

Apache: agrega el siguiente código a tu archivo .htaccess:

```
AddType image/webp .webp
```

Nginx: agrega el siguiente código a tu archivo mime.types:

```
image/webp webp;
```

Note: Vincent Orback posee un archivo [htaccess
config](https://github.com/vincentorback/WebP-images-with-htaccess) de ejemplo para entregar
WebP a modo de referencia, mientras que Ilya Grigorik mantiene una colección de [scripts
de configuración para entregar WebP](https://github.com/igrigorik/webp-detect) que puede ser
útil.


**Uso de la etiqueta `<picture>`**

El propio navegador es capaz de elegir qué formato de imagen mostrar a través
del uso de la etiqueta `<picture>`. La etiqueta `<picture>` utiliza varios elementos `<source>`
, con una etiqueta `<img>`, que es el elemento DOM que contiene
la imagen. El navegador explora las fuentes y recupera la primera coincidencia.
Si el navegador del usuario no admite la etiqueta `<picture>`, se renderiza un `<div>` y
se usa la etiqueta `<img>`.

Note: Debes tener cuidado con la posición de `<source>`, ya que el orden es importante. No coloques fuentes de
imagen/webp después de formatos heredados; colócalos antes. Los navegadores
que lo entiendan las utilizarán, y los que no pasarán a estructuras con una compatibilidad
más amplia. También puedes colocar tus imágenes por orden según el tamaño de archivo si
todas tienen el mismo tamaño físico (cuando no se usa el atributo `media`).
Por lo general, es el mismo orden que se daría si se coloca último a los formatos heredados.

Este es un ejemplo de HTML:

```html
<picture>
  <source srcset="/path/to/image.webp" type="image/webp">
  <img src="/path/to/image.jpg" alt="">
</picture>

<picture>
    <source srcset='paul_irish.jxr' type='image/vnd.ms-photo'>
    <source srcset='paul_irish.jp2' type='image/jp2'>
    <source srcset='paul_irish.webp' type='image/webp'>
    <img src='paul_irish.jpg' alt='paul'>
</picture>

<picture>
   <source srcset="photo.jxr" type="image/vnd.ms-photo">
   <source srcset="photo.jp2" type="image/jp2">
   <source srcset="photo.webp" type="image/webp">
   <img src="photo.jpg" alt="My beautiful face">
</picture>
```

**Conversión de CDN automática a WebP**

Algunas CDN admiten la conversión automatizada de WebP y pueden utilizar sugerencias de cliente para procesar
imágenes WebP [siempre que sea
posible](http://cloudinary.com/documentation/responsive_images#automating_responsive_images_with_client_hints).
Consulta a tu CDN para comprobar si la compatibilidad con WebP está incluida en su servicio. Es posible
que tengas en tus manos una solución sencilla.

**Compatibilidad de WebP con WordPress**

Jetpack: Jetpack, un complemento de WordPress popular, incluye un servicio de imágenes de CDN
llamado [Photon](https://jetpack.com/support/photon/). Con Photon, obtienes
una compatibilidad transparente con imágenes WebP. La CDN de Photon se incluye en la versión gratuita de Jetpack,
por lo que se trata de una buena opción de implementación sin intervención. La desventaja es que
Photon modifica el tamaño de las imágenes, coloca una cadena de consulta en la URL y se requiere una
búsqueda de DNS adicional para cada imagen.

**Cache Enabler y Optimizer**: si utilizas WordPress, existe al menos
una opción de código semiabierto. El complemento de código abierto [Cache
Enabler](https://wordpress.org/plugins/cache-enabler/) posee una opción
de menú para almacenar en caché imágenes WebP que se procesarán si están disponibles y si el navegador del usuario
actual es compatible. Esto facilita el procesamiento de imágenes WebP. Existe una desventaja:
Cache Enabler requiere usar un programa hermano llamado Optimizer, que
es pago. Esto parece fuera de lugar para una solución que se presenta como genuinamente de código abierto.


**ShortPixel**: otra opción que puede usarse de manera independiente o con Cache
Enabler, también de forma paga, es ShortPixel. Cuando se usa de forma independiente, [ShortPixel](https://shortpixel.com)
puede agregar una etiqueta `<picture>` que generalmente procesa el tipo de imagen correcto
según el navegador. Se pueden optimizar hasta 100 imágenes por mes de manera gratuita.

**Compresión de GIF animados y por qué `<video>` es mejor**

Los GIF animados siguen teniendo un uso extendido, pese a ser un formato muy
limitado. Aunque todo el mundo, desde redes sociales hasta sitios de medios de comunicación populares, poseen
una gran integración para GIF animados, el formato *nunca* fue diseñado para almacenamiento o animación de
video. De hecho, [la especificación
GIF89a](https://www.w3.org/Graphics/GIF/spec-gif89a.txt) advierte que "el GIF no
está pensado como una plataforma para la animación". La [cantidad de colores, la cantidad de fotogramas
y
las dimensiones](http://gifbrewery.tumblr.com/post/39564982268/can-you-recommend-a-good-length-of-clip-to-keep-gifs)
afectan el tamaño del GIF animado. Cambiar a video ofrece un ahorro importante.



<img src="images/animated-gif.jpg" alt="GIF animados frente a Video: una comparación de
 tamaños de archivo con una calidad de equivalencia aproximada para diferentes formatos."
         />
GIF animados frente a Video: una comparación de tamaños de archivo con una calidad de equivalencia aproximada para
diferentes formatos.


**Entregar el mismo archivo que un video MP4 a menudo puede recortar el 80% o más del
tamaño de archivo.** No solo los GIF desperdician una gran cantidad de ancho de banda, sino que además
tardan más tiempo en cargarse, incluyen menos colores y generalmente ofrecen experiencias de usuario
de menor calidad. Es posible que hayas observado que los GIF animados cargados en Twitter tienen un mejor
rendimiento allí que en otros sitios web. [En Twitter, los GIF animados no son
realmente archivos GIF](http://mashable.com/2014/06/20/twitter-gifs-mp4/#fiiFE85eQZqW).
Para mejorar la experiencia del usuario y reducir el consumo de ancho de banda, los GIF animados
cargados en Twitter en realidad se convierten a video. De manera similar, [Imgur convierte
GIF a
video](https://thenextweb.com/insider/2014/10/09/imgur-begins-converting-gif-uploads-mp4-videos-new-gifv-format/)
al cargarlos, en lo que realmente es una conversión silenciosa a MP4.

¿Por qué los GIF son varias veces más grandes? Los GIF animados almacenan cada cuadro como una imagen GIF
sin pérdida. Así es: sin pérdida. La calidad degradada que solemos experimentar se debe a que los GIF
están limitados a una paleta de 256 colores. Generalmente el formato es de gran tamaño, ya que no
tiene en cuenta los fotogramas vecinos para la compresión, a diferencia de los códecs de video como H.264. Un video
MP4 almacena cada fotograma clave como imagen JPEG sin pérdida, lo que descarta parte de los datos
originales para lograr una mejor compresión.

**Si puedes cambiar a videos**

* Usa [ffmpeg](https://www.ffmpeg.org/) para convertir GIF animados (o
 archivos de origen) a MP4 H.264. Yo utilizo esta línea de comandos de [
 Rigor](http://rigor.com/blog/2015/12/optimizing-animated-gifs-with-html5-video):
    `ffmpeg -i animated.gif -movflags faststart -pix_fmt yuv420p -vf
    "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.mp4`
* La API ImageOptim también admite [la conversión de gif animados en videos
 WebM/H.264](https://imageoptim.com/api/ungif), [la eliminación de la interpolación de los
 GIF](https://github.com/pornel/undither#examples) que puede ayudar a que los códecs
 de video alcancen una compresión aún mayor.

**Si debes usar GIF animados**

* Las herramientas como Gifsicle pueden eliminar metadatos y entradas de paleta no utilizadas, además de minimizar
 lo que cambia entre fotogramas
* Considera usar un codificador de GIF con pérdida. El fork
 [Giflossy](https://github.com/pornel/giflossy) de Gifsicle es compatible con
 esto mediante el indicador `—lossy`, y puede recortar aproximadamente un 60-65% del tamaño. También hay una
 herramienta interesante basada en él que se llama [Gifify](https://github.com/vvo/gifify). Los
 GIF no animados pueden convertirse a PNG o WebP.

Para obtener más información, consulta el [Libro de
GIF](https://rigor.com/wp-content/uploads/2017/03/TheBookofGIFPDF.pdf) de Rigor.

## Optimización de SVG {: #svg-optimization }

Mantener optimizados los SVG significa eliminar todo lo que no es necesario. Los archivos SVG creados
con editores generalmente contienen una gran cantidad de información redundante
(metadatos, comentarios, capas ocultas, etc.). Este contenido frecuentemente puede
eliminarse de manera segura o convertirse a un formato más mínimo sin impactar el
SVG final que se intenta renderizar.


<img src="images/Modern-Image26.jpg" alt="svgo"
         />
[SVGOMG](https://jakearchibald.github.io/svgomg/), de Jake Archibald, es una interfaz gráfica de usuario
que permite optimizar SVG según tus preferencias mediante la selección de
optimizaciones, con una vista previa en vivo de la marca de salida


**Algunas reglas generales para la optimización de SVG (SVGO):**

* Minifica y comprime con gzip los archivos SVG. En realidad, los SVG son recursos de texto expresados
 en XML, como CSS, HTML y JavaScript, y deben minificarse y comprimirse con gzip
 para mejorar el rendimiento.
* En lugar de rutas, utiliza formas de SVG predefinidas, como `<rect>`, `<circle>`,
 `<ellipse>`, `<line>` y `<polygon>`. La preferencia por formas predefinidas reduce
 las marcas necesarias para producir una imagen final; es decir, el navegador necesita menos código para analizar
 y rasterizar. Reducir la complejidad de los archivos SVG significa que un navegador puede
 mostrarlo más rápidamente.
* Si debes usar rutas, intenta reducir las curvas y las rutas. Simplifícalas y
 combínalas siempre que sea posible. La herramienta [simplify
 de Illustrator](http://jlwagner.net/talks/these-images/#/2/10) es útil para eliminar
 puntos superfluos incluso en conceptos de diseño complejos, además de suavizar
 irregularidades.
* Evita usar grupos. Si no puedes, intenta simplificarlos.
* Elimina las capas invisibles.
* Evita todos los efectos de Photoshop o Illustrator. Pueden convertirse en
 imágenes rasterizadas de gran tamaño.
* Vuelve a comprobar que no existan imágenes rasterizadas integradas no compatibles con SVG
* Usa una herramienta para optimizar los SVG.
  [SVGOMG](https://jakearchibald.github.io/svgomg/) es una interfaz gráfica de usuario muy práctica
 basada en Web para [SVGO](https://github.com/svg/svgo) programada por Jake Archibald que, a mi criterio, es
 muy valiosa. Si utilizas Sketch, el complemento SVGO Compressor ([complemento de Sketch para
 ejecutar SVGO](https://www.sketchapp.com/extensions/plugins/svgo-compressor/))
 puede usarse durante la exportación para reducir el tamaño del archivo.


<img src="images/svgo-precision.jpg" alt="la reducción de precisión de svgo en ocasiones puede afectar
 positivamente el tamaño del archivo"
         />
Un ejemplo de ejecución de una fuente SVG a través de SVGO en modo de alta precisión (que ofrece
una mejora del 29% en el tamaño) frente al modo de baja precisión (mejora del 38%)



[SVGO](https://github.com/svg/svgo) es una herramienta basada en Node para optimizar archivos SVG.
SVGO puede reducir el tamaño de los archivos mediante una disminución en la *precisión* de los números en la definición de la <path>
. Cada dígito después de un punto agrega un byte, y es por ese motivo que cambiar la
precisión (la cantidad de dígitos) puede influir mucho el tamaño. Sin embargo, debes ser extremadamente
cuidadoso si cambias la precisión, ya que puede afectar visualmente el aspecto
de las formas.


<img src="images/Modern-Image28.jpg" alt="casos donde svgo puede fallar,
 simplificación excesiva de rutas y conceptos de diseño"
         />
Es importante advertir que aunque SVGO tiene un buen rendimiento en el ejemplo anterior sin
simplificar excesivamente rutas y conceptos de diseño, hay muchos casos donde posiblemente esto
no suceda. Observa cómo la tira de luz en el cohete de arriba se distorsiona cuando se utiliza una
precisión más baja.


**Uso de SVGO con la línea de comandos:**

SVGO puede instalarse como [CLI de npm global](https://www.npmjs.com/package/svgo)
si prefieres eso en lugar de una interfaz gráfica de usuario:

```
npm i -g svgo
```

Esto luego puede ejecutarse contra un archivo SVG local de la siguiente manera:

```
svgo input.svg -o output.svg
```

Admite todas las opciones que podrían esperarse, incluido el ajuste de la precisión del punto
flotante:

```
svgo input.svg --precision=1 -o output.svg
```

Consulta el archivo [readme](https://github.com/svg/svgo) de SVGO para acceder a la lista completa de
opciones admitidas.

**¡No olvides comprimir los SVG!**


<img src="images/before-after-svgo.jpg" alt="antes y después de ejecutar una imagen
 a través de svgo"
         />
Es importante advertir que aunque SVGO tiene un buen rendimiento en el ejemplo anterior sin
simplificar excesivamente rutas y conceptos de diseño, hay muchos casos donde posiblemente esto
no suceda. Observa cómo la tira de luz en el cohete de arriba se distorsiona cuando se utiliza una
precisión más baja.


Además, no olvides [comprimir con Gzip tus recursos de
SVG](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)
o entregarlos a través de Brotli. Como se basan en texto, se comprimirán realmente bien
(con un tamaño aproximado del 50 % de los archivos originales).

Cuando Google envió un nuevo logotipo, anunciamos que su versión
[más pequeña](https://twitter.com/addyosmani/status/638753485555671040) pesaba
solo 305 bytes.


<img src="images/Modern-Image30.jpg" alt="la versión más pequeña del nuevo logotipo de
 Google pesaba solo 305 bytes"
         />


Hay [muchos trucos avanzados para
SVG](https://www.clicktorelease.com/blog/svg-google-logo-in-305-bytes/) que
puedes usar para reducir esto aún más (hasta llegar a los 146 bytes). Basta decir
que, sea con herramientas o a través de una limpieza manual, probablemente haya un *poco*
más que se puede recortar de los SVG.

**Sprites de SVG**

SVG puede ser [eficaz](https://css-tricks.com/icon-fonts-vs-svg/) para iconos,
ya que ofrece una manera de representar visualizaciones como un sprite sin los
[peculiares](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html)
métodos alternativos que se necesitan para las fuentes de iconos. Ofrece un control de estilos de CSS más granular que
las fuentes de iconos (propiedades de trazo de SVG) y un mejor control de posicionamiento (sin necesidad de personalizar
pseudoelementos y el CSS `display`), y los SVG son mucho más
[accesibles](http://www.sitepoint.com/tips-accessible-svg/).

Herramientas como [svg-sprite](https://github.com/jkphl/svg-sprite) e
[IcoMoon](https://icomoon.io/) pueden automatizar la combinación de SVG en sprites. Esto
puede usarse a través de [CSS Sprite](https://css-tricks.com/css-sprites/), [Symbol
Sprite](https://css-tricks.com/svg-use-with-external-reference-take-2) o
[Stacked Sprite](http://simurai.com/blog/2012/04/02/svg-stacks). Una Kravetz tiene
una [reseña](https://una.im/svg-icons/#💁) práctica sobre cómo utilizar
gulp-svg-sprite para un flujo de trabajo de sprites de SVG que vale la pena leer. Sara Soudein también
habla sobre [cómo realizar la transición de fuentes de iconos a
SVG](https://www.sarasoueidan.com/blog/icon-fonts-to-svg/) en su blog.

**Consultas adicionales**

Las [sugerencias para optimizar la entrega de SVG en la
Web](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)
de Sara Soueidan y el [libro Practical
SVG](https://abookapart.com/products/practical-svg) de Chris Coyier son excelentes. También me resultó esclarecedora
la publicación de Andreas Larsen ([parte
1](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-2-6711cc15df46),[parte
2](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-1-67e8f2d4035)) sobre cómo optimizar SVG. [Preparing
and exporting SVG icons in
Sketch](https://medium.com/sketch-app-sources/preparing-and-exporting-svg-icons-in-sketch-1a3d65b239bb)
también fue una lectura muy útil.

## Evita recomprimir imágenes mediante códecs con pérdida. {: #avoid-recompressing-images-lossy-codecs }

Siempre se recomienda comprimir a partir de la imagen original. La recompresión
de imágenes tiene consecuencias. Digamos que tomas un JPEG que ya fue
comprimido con una calidad de 60. Si recomprimes la imagen utilizando
codificación con pérdida, su aspecto será peor. Cada ronda adicional de compresión va a
introducir una pérdida de generación. Se perderá información y se empezarán a acumular
artefactos de compresión. Esto sucederá aunque la recompresión se realice con una configuración de alta calidad.

Para evitar esta trampa, **configura la buena calidad más baja que estés dispuesto a aceptar en
primer lugar** para obtener el máximo ahorro en tamaño de archivo desde el principio. Evitarás
esta trampa, ya que todas las reducciones de tamaño del archivo que se basen solo en reducción de calidad
no tendrán un buen aspecto.

La recodificación de un archivo con pérdida casi siempre dará como resultado un archivo más pequeño, pero esto
no significa que obtengas toda la calidad esperada.


<img src="images/generational-loss.jpg" alt="pérdida de generación al recodificar
 varias veces una imagen"
         />
Arriba, en este [excelente video](https://www.youtube.com/watch?v=w7vXJbLhTyI)
y [el artículo
que lo acompaña](http://cloudinary.com/blog/why_jpeg_is_like_a_photocopier) de Jon
Sneyers, podemos ver el impacto de la pérdida de generación al recomprimir mediante varios
formatos. Este es un problema que puede darse si se guardan imágenes
(ya comprimidas) de redes sociales y se las vuelve a cargar (lo que provoca una recompresión).
La pérdida de calidad se acumulará.



MozJPEG (quizás accidentalmente) posee una mejor resistencia a la degradación por
recompresión debido a cuantificación de trellis. En lugar de comprimir todos los valores de DCT
exactamente como están, puede optar por valores cercanos (dentro de un rango de +1/-1) para
determinar si valores similares se comprimen en menos bits. El FLIF con pérdida posee una personalización similar al
PNG con pérdida, en el sentido de que, antes de la (re)compresión, puede analizar los datos y decidir
qué eliminar. Los PNG recomprimidos poseen "agujeros" que pueden detectarse para evitar
cambios adicionales en los datos.

**Al editar archivos de origen, almacénalos en un formato sin pérdida, como PNG o
TIFF, para preservar toda la calidad posible.** Las herramientas de compilación o el
servicio de compresión podrán trabajar con la versión comprimida que proceses
para los usuarios con una pérdida de calidad mínima.

## Reduce los costos innecesarios de decodificación y cambio de tamaño de imágenes {: #reduce-unnecessary-image-decode-costs }

En el pasado, todos hemos enviado imágenes de gran tamaño y mayor resolución que lo que necesitaban nuestros usuarios
. Eso tiene un costo. La decodificación y el cambio de tamaño de imágenes son operaciones
intensivas para un navegador con hardware móvil promedio. Si se envían imágenes
grandes y se las vuelve a escalar mediante CSS o atributos de alto/ancho, es probable que suceda esto,
que puede afectar el rendimiento.


<img src="images/image-pipeline.jpg" alt="Hay muchos pasos involucrados cuando un
 navegador toma una imagen especificada en una etiqueta y la muestra en la
 pantalla. Entre ellos se encuentran la solicitud, la decodificación, el cambio de tamaño, la copia a la GPU y la visualización."
         />

Cuando un navegador recupera una imagen, debe decodificarla desde el formato
original (p. ej., JPEG) a un mapa de bits en la memoria. Con frecuencia, debe cambiarse el tamaño
de la imagen (p. ej., el ancho debe configurarse como un porcentaje de su contenedor). La decodificación y
el cambio de tamaño de imágenes son costosos y pueden prolongar el tiempo que lleva la visualización de una
imagen.


Lo ideal es enviar imágenes que un navegador puede renderizar sin necesidad de cambiar el tamaño de todo
. Por eso, debes procesar las imágenes más pequeñas para los tamaños y las resoluciones
de pantalla de destino con [`srcset` y
`sizes`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
; hablaremos sobre `srcset` a la brevedad.

Omitir los atributos `width` o `height` en una imagen también puede tener un impacto
negativo en el rendimiento. Sin ellos, un navegador asigna una región de marcador de posición más pequeña
para la imagen hasta que hayan llegado los bytes suficientes a fin de saber cuáles son las dimensiones
correctas. En ese momento, el diseño del documento debe actualizarse en un paso llamado
reflujo, que puede ser muy costoso.


<img src="images/devtools-decode.jpg" alt="costos de la decodificación de imágenes en
 Chrome DevTools"
         />
Los navegadores deben realizar una serie de pasos para mostrar imágenes en la pantalla. Además
de recuperar las imágenes, deben decodificarlas y, a menudo, cambiar su tamaño. Estos
eventos pueden auditarse en el panel
[Timeline](/web/tools/chrome-devtools/evaluate-performance/performance-reference) de Chrome DevTools.



Las imágenes más grandes además incluyen un aumento en el costo de memoria. Las imágenes decodificadas
pesan aproximadamente 4 bytes por píxel. Si no tienes cuidado, literalmente puedes hacer fallar
el navegador; en dispositivos de gama baja, no hace falta mucho para que la memoria comience a usar el archivo de intercambio.
Por lo tanto, debes vigilar de cerca la decodificación y el cambio de tamaño de imágenes en cuanto al costo de memoria.


<img src="images/image-decoding-mobile.jpg" alt="La decodificación de imágenes puede ser
 increíblemente costosa en promedio para hardware de dispositivos móviles de gama baja"
         />
La decodificación de imágenes puede ser increíblemente costosa en promedio para hardware de dispositivos móviles de gama baja.
En algunos casos, la decodificación puede ser 5 veces más lenta (o más).


Al diseñar su nueva [experiencia web
móvil](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3),
Twitter mejoró el rendimiento de decodificación de las imágenes garantizando la entrega de imágenes
de tamaño apropiado a sus usuarios. Esto significó tiempo de decodificación para muchas imágenes
en la cronología de Twitter, desde aproximadamente 400 hasta llegar a los 19 mseg.


<img src="images/image-decoding.jpg" alt="El panel Timeline/Performance
 de Chrome DevTools muestra los tiempos de decodificación de imágenes antes y después de que Twitter Lite
 optimizara su canalización de imágenes. Anteriormente eran mayores."
         />
El panel Timeline/Performance de Chrome DevTools muestra los tiempos de decodificación de imágenes (en
verde) antes y después de que Twitter Lite optimizara su canalización de imágenes.

### Entregar imágenes de HiDPI con `srcset` {: #delivering-hidpi-with-srcset }

Los usuarios puede acceder a su sitio a través de un rango de dispositivos móviles y de escritorio que poseen
pantallas de alta resolución. La [relación de píxeles del
dispositivo](https://stackoverflow.com/a/21413366) (DPR) (también denominado "relación de píxeles de
CSS") determina la forma en que CSS interpreta la pantalla de un dispositivo. DPR
fue creado por los fabricantes de teléfonos para permitir un aumento de la resolución y una
mayor nitidez de las pantallas móviles sin que los elementos se visualicen demasiado pequeños.

Para que la calidad de imagen coincida con la expectativa de los usuarios, debes entregar imágenes de
resolución adecuada en sus dispositivos. Pueden procesarse imágenes nítidas con una alta DPR (p. ej., 2x, 3x)
en dispositivos compatibles. Las imágenes con DPR bajo y estándar deben
procesarse para los usuarios con pantallas de menor resolución, ya que este tipo de imágenes 2x+ con frecuencia pesan
muchos más bytes.


<img src="images/device-pixel-ratio.jpg" alt="Un diagrama de la relación de píxeles del
 dispositivo a 1x, 2x y 3x. La calidad de la imagen parece mejorar a medida que
 aumenta la DPR, y se muestra una comparación visual entre los píxeles del dispositivo y los píxeles de CSS."
         />
Relación de píxeles del dispositivo: Muchos sitios realizan un seguimiento de la DPR de dispositivos populares, entre ellos
[material.io](https://material.io/devices/) y
[mydevice.io](https://mydevice.io/devices/).



[srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
permite que un navegador seleccione la mejor imagen disponible por dispositivo (p. ej., seleccionando una
imagen 2x para una visualización móvil 2x). Los navegadores no compatibles con `srcset` pueden utilizar la opción
de reserva predeterminada `src`, especificada en la etiqueta `<img>`.

```
<img srcset="paul-irish-320w.jpg,
             paul-irish-640w.jpg 2x,
             paul-irish-960w.jpg 3x"
     src="paul-irish-960w.jpg" alt="Paul Irish cameo">
```

Las CDN de imágenes, como
[Cloudinary](http://cloudinary.com/blog/how_to_automatically_adapt_website_images_to_retina_and_hidpi_devices)
e [Imgix](https://docs.imgix.com/apis/url/dpr), permiten controlar la densidad
de imágenes, a fin de procesar la mejor densidad para los usuarios desde una única fuente canónica.

Note: Puedes obtener más información sobre la relación de píxeles del dispositivo y las imágenes receptivas en este
curso gratuito de [Udacity](https://www.udacity.com/course/responsive-images--ud882)
y en la guía [Images](/web/fundamentals/design-and-ui/responsive/images) de Web
Fundamentals.

Te recordamos que [Client
Hints](https://www.smashingmagazine.com/2016/01/leaner-responsive-images-client-hints/)
también puede ser una alternativa para especificar cada posible densidad y formato de píxeles
en el marcado de imágenes receptivas. Lo que hace es anexar esta información a
la solicitud HTTP para que los servidores web puedan elegir la opción más apta para la densidad de pantalla
del dispositivo actual.

### Dirección artística {: #art-direction }

Aunque enviar la resolución adecuada a los usuarios es importante, algunos sitios además
deben pensar esto en términos de **[dirección
artística](http://usecases.responsiveimages.org/#art-direction)**. Si un usuario está
en una pantalla más pequeña, quizás te convenga recortar o acercar para lograr una mejor visualización y
aprovechar al máximo el espacio disponible. Aunque esta dirección artística está fuera del marco de
este artículo, servicios como
[Cloudinary](http://cloudinary.com/blog/automatically_art_directed_responsive_images%20)
ofrecen API que intentan automatizar esto lo máximo posible.


<img src="images/responsive-art-direction.jpg" alt="dirección artística receptiva en
 acción para adaptarse a la visualización más o menos de una imagen mediante recortes,
 según el dispositivo"
         />
Dirección artística: Eric Portis nos brinda un excelente
[ejemplo](https://ericportis.com/etc/cloudinary/) de cómo pueden usarse las
imágenes receptivas para la dirección artística. Este ejemplo adapta las características visuales de la imagen del
protagonista en diferentes puntos de interrupción para aprovechar al máximo el espacio
disponible.

## Administración de color {: #color-management }

Existen al menos tres perspectivas diferentes de color: biología, física e
impresión. En la biología, el color es un [fenómeno de
la percepción](http://hubel.med.harvard.edu/book/ch8.pdf). Los objetos reflejan luz en
diferentes combinaciones de longitudes de onda. Los receptores de luz en los ojos traducen
estas longitudes de onda en la sensación que conocemos como color. En la física, lo que importa
es la luz, tanto el brillo como la frecuencia de la luz. La impresión se orienta más hacia ruedas
de color, tintas y modelos artísticos.

Idealmente, todas las pantallas y los navegadores web del mundo deberían mostrar el color exactamente
igual. Lamentablemente, debido a una serie de inconsistencias intrínsecas,
esto no sucede. La administración del color nos permite llegar a un punto de acuerdo para visualizar el color
a través de espacios, perfiles y modelos de color.

#### Modelos de color {: #color-models }

Los [modelos de color](https://en.wikipedia.org/wiki/Gamma_correction) son un sistema para
generar un rango completo de colores desde un conjunto más pequeño de colores primarios.
Hay diferentes tipos de espacios de color que usan diferentes parámetros para
controlar los colores. Algunos espacios de color tienen menos parámetros de control que otros;
p. ej., la escala de grises tiene un solo parámetro para controlar el brillo entre
los colores blanco y negro.

Dos modelos de color comunes son el aditivo y el sustractivo. Los modelos de color aditivos
(como RGB, utilizado para visualizaciones digitales) utilizan luz para mostrar el color, mientras que los modelos de color
sustractivos (como CMYK, utilizado para impresiones) funcionan por eliminación de luz.



<img src="images/colors_ept6f2.jpg" alt="sRGB, Adobe RGB y ProPhoto RGB" /> En
 RGB, se agrega luz roja, verde y azul en diferentes combinaciones para
 producir un amplio espectro de colores. CYMK (cian, magenta, amarillo y
 negro) funciona con diferentes colores de tinta que eliminan brillo del
 color blanco.


El artículo [Understanding Color Models and Spot Color
Systems](https://www.designersinsights.com/designer-resources/understanding-color-models/)
posee una buena descripción de otros modelos y modos de color, como HSL, HSV y
LAB.

#### Espacios de color {: #color-spaces }

Los [espacios
de color](http://www.dpbestflow.org/color/color-space-and-color-profiles#space)
son un rango de colores específico que puede representarse para una determinada imagen. Por
ejemplo, si una imagen contiene hasta 16.7 millones de colores, diferentes espacios de color
permiten el uso de rangos más y menos amplios de estos colores. Algunos desarrolladores consideran
que los modelos de color y los espacios de color son lo mismo.

[sRGB](https://en.wikipedia.org/wiki/SRGB) se diseñó para ser
un espacio de color [estándar](https://www.w3.org/Graphics/Color/sRGB.html) para la Web,
y se basa en RGB. Es un espacio de color pequeño que generalmente se considera
el menor denominador común, y es la opción más segura para la administración del color
entre navegadores. Otros espacios de color (como [Adobe
RGB](https://en.wikipedia.org/wiki/Adobe_RGB_color_space) o [ProPhoto
RGB](https://en.wikipedia.org/wiki/ProPhoto_RGB_color_space), utilizados en Photoshop
y Lightroom) pueden representar colores más vibrantes que sRGB, pero este último es
más flexible entre navegadores, juegos y monitores, y generalmente es eso
lo que tiene más importancia.



<img src="images/color-wheel_hazsbk.jpg" alt="sRGB, Adobe RGB y ProPhoto RGB"
        /> Arriba podemos ver una visualización del gamut, el rango de colores que
        puede definir un espacio de color.


Los espacios de color tienen tres canales (rojo, verde y azul). Hay 255 colores
posibles en cada canal en modo de 8 bits, lo que nos da un total de 16.7
millones de colores. Las imágenes de 16 bits pueden mostrar billones de colores.


<img src="images/srgb-rgb_ntuhi4.jpg" alt="sRGB, Adobe RGB y ProPhoto RGB" />
        Una comparación de sRGB, Adobe RGB y ProPhoto RGB que usa una imagen de
 [Yardstick](https://yardstick.pictures/tags/img%3Adci-p3). Es
 muy difícil demostrar este concepto en sRGB cuando no se pueden mostrar colores
 que no son visualizables. Una foto normal en sRGB versus gamut amplio debería ser
 completamente idéntica, salvo los colores "jugosos" más saturados.


Las diferencias entre espacios de color (como sRGB, Adobe RGB y ProPhoto RGB) son
su gamut (el rango de colores que pueden reproducir con sombras), fuente de iluminación y
curvas de [gamma](http://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/). sRGB es aproximadamente un 20% más pequeño que Adobe RGB, y ProPhoto RGB es aproximadamente un [50%
más grande](http://www.petrvodnakphotography.com/Articles/ColorSpace.htm) que Adobe
RGB. Los imágenes de origen anteriores son de [Clipping
Path](http://clippingpathzone.com/blog/essential-photoshop-color-settings-for-photographers).

[Gamut amplio](http://www.astramael.com/) es un término que describe los espacios de color con un
gamut más grande que sRGB. Estos tipos de visualizaciones son cada vez más comunes. Dicho
esto, muchas pantallas digitales simplemente no pueden mostrar perfiles de color
significativamente mejores que sRGB. Al guardar para la Web en Photoshop,
considera usar la opción 'Convert to sRGB’, a menos que tu objetivo sean usuarios que poseen
pantallas con un gamut amplio, de gama más alta.

<aside class="key-point"><b>Note:</b> Al trabajar con fotografías originales,
evita usar sRGB como el espacio de color primario. Es más pequeño que los espacios de color
admitidos por la mayoría de las cámaras y puede provocar recortes. Debes trabajar con un espacio de color
grande (como ProPhoto RGB) y ofrecer una salida a sRGB al exportar para la Web.</aside>

**¿Existe algún caso donde el gamut amplio sea conveniente para contenido web?**

Sí. Si una imagen contiene colores muy saturados, jugosos o vibrantes y es importante que
se visualicen con esas mismas características en pantallas compatibles. Sin embargo, esto rara vez sucede
en fotos reales. Con frecuencia, es sencillo personalizar el color para que parezca vibrante
sin que supere realmente el gamut de sRGB

Eso se debe a que la percepción humana del color no es absoluta, sino relativa a
nuestro entorno, y se puede engañar fácilmente. Si la imagen contiene un color fluorescente
más destacado, te será más fácil trabajar con un gamut amplio.

#### Compresión y corrección de gamma {: #gamma-correction }

La [corrección de Gamma](https://en.wikipedia.org/wiki/Gamma_correction) (o simplemente
gamma) controla el brillo general de una imagen. El cambio de gamma también puede
alterar la relación del rojo con el verde y el azul. Las imágenes sin corrección de gamma
pueden dar la impresión de que sus colores están lavados o son muy oscuros.

En video y gráficos de computadora, el gamma se utiliza para compresión, algo similar a lo que ocurre con la compresión de
datos. Esto permite extraer niveles útiles de brillo en menos
bits (8 bits en lugar de 12 o 16). La percepción humana del brillo no es
directamente proporcional a la cantidad física de luz. Representar colores en
su forma física real significaría desperdiciar espacio al codificar imágenes para el ojo humano. La compresión de
gamma se usa para codificar brillo en una escala más cercana a la percepción
humana.

Con la compresión de gamma, la escala útil de brillo cabe en 8 bits de precisión
(la mayoría de los colores RGB usa 0-255). Todo esto se basa en el hecho de que si los colores
utilizaron alguna unidad con una relación 1:1 respecto a la física, los valores de RGB estarían entre 1 y
un millón; los valores entre 0 y 1,000 tendrían un aspecto distinto, pero los valores entre
999,000 y 1,000,000 serían idénticos. Imagina estar en un ambiente oscuro donde hay
solo 1 vela. Si enciendes una segunda vela, advertirás un aumento significativo en el
brillo de la luz del ambiente. Si agregas una tercera vela, parecerá aún más brillante.
Ahora imagina que estás en un ambiente con 100 velas. Si enciendes la vela 101 y luego la 102...
No notarás un cambio en el brillo.

Pero en ambos casos, físicamente, se agregó exactamente la misma cantidad de
luz. Entonces, como los ojos son sensibles cuando la luz es brillante, la compresión
de gamma "comprime" los valores de brillo. Por eso, en términos físicos, los niveles de brillo son
menos precisos, pero la escala se ajusta para humanos; por lo tanto, desde la perspectiva humana
, todos los valores tienen exactamente la misma precisión.

<aside class="key-point"><b>Note:</b> Aquí la compresión o corrección de gamma son
diferentes a las curvas de gamma de la imagen que pueden configurarse en Photoshop. Cuando la compresión de
gamma funciona como corresponde, no debería advertirse.</aside>

#### Perfiles de color {: #color-profiles }

Un perfil de color es la información que describe en qué consiste el espacio de color de
un dispositivo. Se utiliza para la conversión entre diferentes espacios de color. Los perfiles intentan
garantizar que una imagen luzca lo más similar posible en estos diferentes tipos de
pantallas y medios.

Las imágenes pueden tener un perfil de color integrado, como lo describe [International
Color Consortium](http://www.color.org/icc_specs2.xalter) (ICC), para representar
con precisión la visualización de los colores. Esto es compatible con diferentes formatos,
entre ellos JPEG, PNG, SVG y
[WebP](/speed/webp/docs/riff_container), y la mayoría de
los principales navegadores admiten perfiles de ICC integrados. Cuando se muestra una imagen en una
aplicación y se conocen las capacidades del monitor, estos colores pueden ajustarse según
el perfil de color.

<aside class="key-point"><b>Note:</b> Algunos monitores tienen un perfil de color similar
a sRGB, y no pueden mostrar perfiles mucho mejores. Por eso, según cuáles sean tus usuarios
objetivo, es posible que exista un valor limitado para integrarlos. Comprueba quiénes son
tus usuarios objetivo.</aside>

Los perfiles de color integrado también pueden aumentar fuertemente el tamaño de las imágenes
(en ocasiones, más de 100 KB), por lo que debes tener cuidado con la integración. Algunas herramientas, como ImageOptim
, eliminan [automáticamente](https://imageoptim.com/color-profiles.html) los
perfiles de color detectados. Por el contrario, cuando se elimina el perfil de ICC en
pos de reducir tamaño, los navegadores se ven forzados a mostrar la imagen en
el espacio de color del monitor, algo que puede llevar a diferencias en la saturación y el contraste
esperados. Aquí debes evaluar las desventajas aceptables para tu caso de uso.

[Nine Degrees Below](https://ninedegreesbelow.com/photography/articles.html)
tienen un conjunto excelente de recursos sobre administración de color con perfiles de ICC si te
interesa obtener más información sobre los perfiles.

#### Perfiles de color y navegadores web {: #color-profiles }

Las primeras versiones de Chrome no tenían una gran compatibilidad para la administración de color, pero
esta característica se mejoró en 2017 con [Color Correct
Rendering](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ptuKdRQwPAo).
Las pantallas que no son sRGB (las Macbook Pros más nuevas) convierten los colores de sRGB
al perfil de la pantalla. Esto significa que los colores tienen un aspecto más similar entre
diferentes sistemas y navegadores. Ahora Safari, Edge y Firefox pueden tener en cuenta
los perfiles de ICC, por lo que las imágenes con un perfil de color diferente (p. ej., ICC) pueden
mostrarlo correctamente más allá de que la pantalla tenga un gamut amplio o no.

Note: Para acceder a una excelente guía para saber cómo se aplica el color a un espectro de maneras más amplias con las que trabajamos
en la Web, consulte [Nerd’s guide to color on the web](https://css-tricks.com/nerds-guide-color-web/) de Sarah
Drasner.

## Sprites de imágenes {: #image-sprites }

Los [sprites de
imágenes](/web/fundamentals/design-and-ui/responsive/images#use_image_sprites)
(o sprites de CSS) tienen una larga historia en la Web, son compatibles con todos los navegadores
y han sido una manera popular de reducir la cantidad de imágenes que carga una página
gracias a su combinación en una sola imagen más grande que se divide en partes.


<img src="images/i2_2ec824b0_1.jpg" alt="Los sprites de imágenes siguen usándose ampliamente en
 sitios de producción grandes, entre ellos la página de inicio de Google."
         />
Los sprites de imágenes siguen usándose ampliamente en sitios de producción grandes, entre ellos la
página de inicio de Google.


En HTTP/1.x, algunos desarrolladores utilizaron sprites para reducir la cantidad de solicitudes HTTP. Esto trajo
una serie de beneficios, aunque debía tenerse cuidado, ya que podían producirse problemas
rápidamente con invalidación de caché (cambios en cualquier parte pequeña de un sprite
de imagen que podrían invalidar toda la imagen en la caché de un usuario).

Sin embargo, en la actualidad los sprites posiblemente sean un antipatrón de [HTTP/2](https://hpbn.co/http2/).
Con HTTP/2, quizás lo mejor sea [cargar imágenes
individuales](https://deliciousbrains.com/performance-best-practices-http2/), ya que
ahora es posible realizar varias solicitudes dentro de una sola conexión. Debes realizar mediciones para
evaluar si este es el caso en tu configuración de red.

## Imágenes no críticas de carga diferida {: #lazy-load-non-critical-images }

La carga diferida es un patrón de rendimiento web que retrasa la carga de imágenes en
el navegador hasta que el usuario necesita verlas. Un ejemplo es la carga de imágenes
asíncrona según demanda a medida que el usuario se desplaza. Esto puede complementar aún más
los ahorros de bytes que se observan como consecuencia de la estrategia de compresión de imágenes.



<img src="images/scrolling-viewport.jpg" alt="imágenes de carga diferida"
         />


Imágenes que deben aparecer en la "parte superior", o que se cargan inmediatamente cuando la página web
aparece por primera vez. Las imágenes que vienen después son las de la "parte inferior", aunque no
son visibles para el usuario. No deben cargarse inmediatamente en el
navegador. Pueden cargarse más tarde, o de manera diferida, solo cuando el usuario
se desplaza hacia abajo y mostrarlas ya es algo necesario.

La carga diferida aún no posee soporte nativo en el navegador (aunque
el tema se ha
[analizado](https://discourse.wicg.io/t/a-standard-way-to-lazy-load-images/1153/10)
en el pasado). Se utiliza JavaScript para agregar esta capacidad.

**¿Por qué es útil la carga diferida?**

Esta forma "diferida" de cargar imágenes se usa solo en los casos necesarios y tiene muchos beneficios:

* **Menor consumo de datos**: Como no se asume que el usuario necesitará recuperar
 cada imagen por adelantado, solo se cargará la cantidad mínima de
 recursos. Esto siempre es bueno, especialmente en dispositivos móviles con planes de datos
 más restrictivos.
* **Menor consumo de batería**: Menos carga de trabajo para el navegador del usuario que
 puede ahorrar vida útil de batería
* **Velocidad de descarga mejorada**: Reducir el tiempo de carga total de la página en un
 sitio web con muchas imágenes de varios segundos a prácticamente nada es una tremenda
 ventaja para la experiencia del usuario. De hecho, puede ser la diferencia entre que
 un usuario permanezca en un sitio y disfrute de él con otro que sea apenas otra estadística de visita fugaz.

**Pero, como sucede con todas las herramientas, un gran poder conlleva una gran responsabilidad.**

**Evita cargar imágenes diferidas en la parte superior.** Usa esta opción para largas listas de imágenes
(p. ej. productos) o listas de avatares de usuarios. No la uses para la imagen protagónica de la
página principal. Las imágenes de carga diferida en la parte superior pueden hacer que la carga sea visiblemente más lenta, tanto
técnicamente como para la percepción humana. Se puede anular la carga previa del navegador;
la carga progresiva y el JavaScript pueden crear trabajo adicional para el navegador.

** Debes tener mucho cuidado con las imágenes de carga diferida al desplazarte hacia abajo.** Si esperas hasta que el
usuario se desplace hacia abajo, es probable que se muestren marcadores de posición, y eventualmente aparecen
las imágenes, siempre que el usuario no las haya omitido al desplazarse. Una recomendación sería
iniciar la carga diferida después de que se carguen las imágenes en la parte superior, para cargar todas
las imágenes más allá de la interacción con el usuario.

**¿Quién utiliza la carga diferida?**

Para acceder a ejemplos de carga diferida, analiza cualquier sitio importante que aloje muchas
imágenes. Algunos sitios notables son [Medium](https://medium.com/) y
[Pinterest](https://www.pinterest.com/).


<img src="images/Modern-Image35.jpg" alt="vistas previas integradas de imágenes en
 medium.com"
         />
Un ejemplo de vistas previas integradas de desenfoque gausiano para imágenes en Medium.com


Una serie de sitios (como Medium) muestran una vista previa integrada
de desenfoque gausiano (unos pocos cientos de bytes) como transición (de carga diferida) hacia una imagen de calidad completa
una vez que se la ha recuperado.

José M. Pérez ha escrito sobre la forma de implementar el efecto Medium mediante [filtros
CSS](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)
y ha experimentado con [diferentes formatos de
imagen](https://jmperezperez.com/webp-placeholder-images/) para que admitan estos
marcadores de posición. Facebook también hizo una reseña sobre su famoso enfoque de los 200 bytes para
este tipo de marcadores de posición en sus [fotos de
portada](https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/)
que vale la pena leer. Si eres usuario de Webpack, [LQIP
loader](https://lqip-loader.firebaseapp.com/) puede ayudar a automatizar parte de este
trabajo.

De hecho, puedes buscar tu fuente favorita de fotos en alta resolución y luego
desplazarte hacia abajo en la página. En casi todos los casos, experimentarás la forma en que el sitio web
carga solo unas pocas imágenes a resolución completa a la vez, mientras que el resto son
colores o imágenes de marcadores de posición. A medida que continúas desplazándote hacia abajo, las imágenes de los marcadores de posición
se reemplazan por imágenes de resolución completa. Esta es la carga diferida en acción.

**¿Cómo puedo aplicar la carga diferida a mis imágenes?**

Hay una serie de técnicas y complementos disponibles para la carga diferida. Personalmente,
recomiendo [lazysizes](https://github.com/aFarkas/lazysizes) de Alexander Farkas
debido a su buen rendimiento, sus funciones y su integración opcional con
[Intersection Observer](/web/updates/2016/04/intersectionobserver), y compatibilidad
con complementos.

**¿Qué se puede hacer con Lazysizes?**

Lazysizes es una biblioteca de JavaScript. No requiere configuración. Descarga el
archivo de js minificado e inclúyelo en tu página web.


Este es un ejemplo de código tomado del archivo README:

Agrega la clase "lazyload" a images/iframes junto con un atributo data-src
y/o data-srcset.

De manera opcional, también puedes agregar un atributo src con una imagen de baja calidad:

```html
<!-- non-responsive: -->
<img data-src="image.jpg" class="lazyload" />

<!-- responsive example with automatic sizes calculation: -->
<img
    data-sizes="auto"
    data-src="image2.jpg"
    data-srcset="image1.jpg 300w,
    image2.jpg 600w,
    image3.jpg 900w" class="lazyload" />

<!-- iframe example -->

<iframe frameborder="0"
    class="lazyload"
    allowfullscreen=""
 data-src="//www.youtube.com/embed/ZfV-aYdU4uE">
</iframe>
```

Para la versión web de este libro, combiné Lazysizes (aunque se puede usar cualquier
alternativa) con Cloudinary para imágenes receptivas según demanda. Esto me permitió
tener la libertad de experimentar con diferentes valores de escala, calidad, formato y
si opto o no por la carga progresiva con un esfuerzo mínimo:


<img src="images/cloudinary-responsive-images.jpg" alt="Cloudinary admite
 control según demanda de la calidad, el formato y otras características de la imagen."
         />


**Entre las características de Lazysizes se incluyen las siguientes:**

* Detecta automáticamente cambios de visibilidad que se producen en elementos de carga diferida actuales y
 futuros
* Incluye compatibilidad con imágenes receptivas (picture y srcset)
* Agrega cálculo de tamaños automático y nombres de alias para la función de consulta de medios
* Puede usarse con cientos de imágenes o iframes en CSS y páginas con uso intensivo de JS o aplicaciones
  web
* Extensible: Admite complementos
* Solución liviana y madura
* Optimizada para SEO: No oculta imágenes ni recursos de los metabuscadores

**Más opciones de carga diferida**

Lazysizes no es la única opción. Estas son otras bibliotecas de carga diferida:

* [Lazy Load XT](http://ressio.github.io/lazy-load-xt/)
* [BLazy.js](https://github.com/dinbror/blazy) (o [Be]Lazy)
* [Unveil](http://luis-almeida.github.io/unveil/)
* [yall.js (Yet Another Lazy Loader)](https://github.com/malchata/yall.js)
,    que pesa aproximadamente 1 KB y utiliza Intersection Observer en los casos permitidos.

**¿Cuál es la desventaja de la carga diferida?**

* Los lectores de pantalla, algunos bots de búsqueda y cualquier usuario con JavaScript deshabilitado
 no podrán ver imágenes de carga diferida con JavaScript. Sin embargo, esto es
 algo que se puede solucionar con una opción `<noscript>` de reserva.
* Los receptores de desplazamiento, como los utilizados para determinar cuándo cargar una imagen de
 carga diferida, pueden tener un efecto adverso sobre el rendimiento de desplazamiento del navegador. Pueden
 provocar que el navegador vuelva a dibujar varias veces, lo que ralentiza el proceso de un metabuscador;
 sin embargo, las bibliotecas de carga diferida utilizan limitaciones para mitigar esta situación.
    Una solución posible es Intersection Observer, una opción admitida por
 lazysizes.

Las imágenes de carga diferida son un patrón muy difundido para reducir el ancho de banda, disminuir
los costos y mejorar la experiencia del usuario. Debes evaluar si eso es conveniente para tu
experiencia. Para obtener más información, consulta [Carga diferida de
imágenes](https://jmperezperez.com/lazy-loading-images/) e [Implementación de
la carga progresiva de
Medium](https://jmperezperez.com/medium-image-progressive-loading-placeholder/).

## Cómo evitar la trampa de display:none {: #display-none-trap }

Las soluciones de imágenes receptivas antiguas han equivocado la forma en que los navegadores manejan las solicitudes
de imágenes al configurar la propiedad `display` de CSS. Esto puede hacer que se solicite
una cantidad mucho mayor de imágenes que las esperadas, y es otro motivo por el cual se prefiere usar
`<picture>` y `<img srcset>` para cargar imágenes receptivas.

¿Algunas vez escribiste una consulta de medios que configura una imagen como `display:none` en
ciertos puntos de interrupción?

```html
<img src="img.jpg">
<style>
@media (max-width: 640px) {
    img {
        display: none;
    }
}
</style>
```

¿O alternado para ver qué imágenes se ocultan con una clase `display:none`?

```html
<style>
.hidden {
  display: none;
}
</style>
<img src="img.jpg">
<img src=“img-hidden.jpg" class="hidden">
```

Si se realiza una comprobación rápida en el panel de red de Chrome DevTools, se verifica que las imágenes
ocultas que usan este enfoque se sigan recuperando incluso cuando no esperamos que esto
suceda. Esta conducta en realidad es correcta de acuerdo con la especificación de recursos integrados.


<img src="images/display-none-images.jpg" alt="Las imágenes ocultas con display:none
 se siguen recuperando"
         />


**¿Evita la opción `display:none` la activación de una solicitud de una imagen `src`?**

```html
<div style="display:none"><img src="img.jpg"></div>
```

No. Se seguirá solicitando la imagen especificada. Una biblioteca no puede depender de
display:none en este caso, ya que la imagen se solicitará antes de que JavaScript pueda alterar el
src.

**¿Se evita la opción `display:none` con la activación de una solicitud de `background: url()`?**

```html
<div style="display:none">
  <div style="background: url(img.jpg)"></div>
</div>
```

Sí. Los fondos de CSS no se recuperan inmediatamente después de analizar un elemento. El cálculo de
CSS para subelementos con `display:none` sería menos útil, ya
que no afecta la renderización del documento. Las imágenes en segundo plano en subelementos
no se calculan ni se descargan.

El artículo [Request Quest](https://jakearchibald.github.io/request-quest/)
de Jake Archibald posee un excelente cuestionario que describe las desventajas de usar `display:none` para la carga
de imágenes receptivas. En caso de dudas sobre la forma en que el navegador debe manejar
la carga de solicitudes de imágenes, abre DevTools y verifícalo.

Nuevamente, siempre que sea posible debes usar `<picture>` y `<img srcset>` en lugar de basarte en
`display:none`.

## ¿Es conveniente en tu caso una CDN de procesamiento de imágenes? {: #image-processing-cdns }

*El tiempo que tardarás leyendo publicaciones de blogs para configurar tu propia canalización de
procesamiento de imágenes y personalizar la configuración con frecuencia es mayor que el precio que debes pagar por un servicio de este tipo. Con
[Cloudinary](http://cloudinary.com/), que ofrece un servicio gratuito,
[Imgix](https://www.imgix.com/) que posee una versión de prueba gratuita, y
[Thumbor](https://github.com/thumbor/thumbor), que existe como alternativa de OSS,
tienes muchas opciones disponibles para la automatización.*

Para lograr tiempos de carga de páginas óptimos, debes optimizar la carga de páginas.
Esta optimización requiere una estrategia de imágenes receptivas, y puede beneficiarse con la
compresión de imágenes en el servidor, la selección automática del mejor formato y el cambio de tamaño
receptivo. Lo importante es que lograrás ofrecer imágenes del tamaño correcto al
dispositivo adecuado y en la resolución apropiada lo más rápido posible. Hacer esto no es
tan fácil como se supone.

** Uso del servidor frente a una CDN**

Debido a la complejidad y la naturaleza en permanente evolución de la manipulación de imágenes, vamos a
citar una frase de una persona con experiencia en el campo, para luego
continuar con una sugerencia.

"Si tu producto no tiene que ver con la manipulación de imágenes, no hagas esto por tu cuenta.
Los servicios como Cloudinary [N. del ed.: o imgix] hacen esto de forma mucho más eficiente y mucho
mejor que tú. Úsalos. Y si te preocupa el costo, piensa
en lo que te costarán el desarrollo y el mantenimiento, además del hosting,
del almacenamiento y de la entrega". — [Chris
Gmyr](https://medium.com/@cmgmyr/moving-from-self-hosted-image-service-to-cloudinary-bd7370317a0d)


Por el momento, vamos a coincidir con Chris y sugerir que consideres usar una CDN
para el procesamiento de imágenes. Se analizarán dos CDN para determinar de qué manera
se comparan en relación a la lista de tareas que describimos anteriormente.

**Cloudinary e imgix**

[Cloudinary](http://cloudinary.com/) e [imgix](https://www.imgix.com/) son dos
CDN de procesamiento de imágenes reconocidas. Son las elegidas por cientos de miles
de desarrolladores y empresas en todo el mundo, como Netflix y Red Bull. Ahora
vamos a analizarlas con mayor detalle.

**¿Cuáles son los aspectos básicos?**

A menos que seas dueño de una red de servidores como ellos, la primera gran
ventaja sobre implementar tu propia solución es que utilizan un sistema de
redes distribuidas global para acercarles a tus usuarios una copia de tus imágenes. También es
mucho más fácil para una CDN hacer que tu estrategia de carga de imágenes sea "a prueba de futuro", en un contexto donde las tendencias
cambian. Si haces esto por tu cuenta, se requerirán mantenimiento, un seguimiento de la compatibilidad del navegador
con los formatos emergentes y una participación en la comunidad de compresión de imágenes.

En segundo lugar, cada servicio tiene un plan de precios por niveles. Cloudinary ofrece un [nivel
gratuito](http://cloudinary.com/pricing), mientras que el precio de imgix para el nivel estándar
no es oneroso en relación el plan premium de alto volumen. Imgix ofrece una
[prueba](https://www.imgix.com/pricing) gratuita con un crédito para servicios, por lo que
prácticamente es lo mismo que un nivel gratuito.

En tercer lugar, ambos servicios permiten el acceso a API. Los desarrolladores pueden acceder a la CDN
de manera programática y automatizar el procesamiento. Las bibliotecas de clientes, los complementos de
estructuras y la documentación de API también está disponible, con algunas funciones restringidas
a los niveles pagos más altos.

**Ahora hablemos del procesamiento de imágenes**

Por ahora, limitaremos nuestro análisis a las imágenes estáticas. Tanto Cloudinary como Imgix
ofrecen un rango de métodos de manipulación de imágenes y ambos admiten funciones primarias,
como compresión, cambio de tamaño, recortes y creación de miniaturas en sus planes
estándar y gratuitos.


<img src="images/Modern-Image36.jpg" alt="biblioteca multimedia de cloudinary"
         />
Biblioteca multimedia de Cloudinary: De manera predeterminada, Cloudinary codifica [JPEG
no progresivos](http://cloudinary.com/blog/progressive_jpegs_and_green_martians). Para
optar voluntariamente por generarlos, marca la opción 'Progressive' dentro de 'More options' o
pasa el indicador 'fl_progressive'.


Cloudinary enumera [siete categorías de transformación
de imágenes amplias](http://cloudinary.com/documentation/image_transformations)
, con un total de 48 subcategorías dentro de ellas. Imgix afirma contar con más de
[100 operaciones de
procesamiento de imágenes](https://docs.imgix.com/apis/url?_ga=2.52377449.1538976134.1501179780-2118608066.1501179780).

**¿Cuál es el comportamiento predeterminado?**

* Cloudinary realiza las siguientes optimizaciones de manera predeterminada:
* [Codifica JPEG con
 MozJPEG](https://twitter.com/etportis/status/891529495336722432) (elegido
 en lugar de Guetzli como opción predeterminada)
* Elimina todos los metadatos asociados del archivo de la imagen transformada (la imagen
 original se deja intacta). Para anular esta conducta y ofrecer una
 imagen transformada con metadatos intactos, agrega el indicador `keep_iptc`.
* Puede generar formatos WebP, GIF, JPEG y JPEG-XR con calidad automática. Para
 anular los ajustes predeterminados, configura el parámetro de calidad en tu
    transformación.
* Ejecuta algoritmos de
 [optimización](http://cloudinary.com/documentation/image_optimization#default_optimizations)
 para minimizar el tamaño del archivo con impacto mínimo en la calidad visual
 al generar imágenes en el formato PNG, JPEG o GIF.

Imgix no tiene optimizaciones predeterminadas como Cloudinary. Pero sí cuenta con una
calidad de imagen predeterminada configurable. Para imgix, los parámetros automáticos te ayudan a automatizar
el nivel de automatización de referencia en el catálogo de imágenes.

Actualmente posee [cuatro métodos
diferentes](https://docs.imgix.com/apis/url/auto):

* Compresión
* Mejora visual
* Conversión de formatos de archivo
* Eliminación de ojos rojos

Imgix admite los siguientes formatos de imagen: JPEG, JPEG2000, PNG, GIF, GID
animado, TIFF, BMP, ICNS, ICO, PDF, PCT, PSD, AI

Cloudinary admite los siguientes formatos de imagen: JPEG, JPEG 2000, JPEG XR, PNG,
GIF, GIF animado, WebP, WebP animados, BMP, TIFF, ICO, PDF, EPS, PSD, SVG, AI,
DjVu, FLIF, TARGA.

**¿Qué sucede con el rendimiento?**

El rendimiento de entrega de CDN está orientado principalmente a la
[latencia](https://docs.google.com/a/chromium.org/viewer?a=v&pid=sites&srcid=Y2hyb21pdW0ub3JnfGRldnxneDoxMzcyOWI1N2I4YzI3NzE2)
y la velocidad.

La latencia siempre aumenta en cierto modo para imágenes no almacenadas en caché. Pero una vez que una
imagen se almacena en caché y se distribuye en los servidores de la red, el hecho de que una
CDN global pueda encontrar el salto más corto hacia un usuario, sumado a los ahorros de bytes de una
imagen procesada adecuadamente, casi siempre mitiga los problemas de latencia si se los compara con
las imágenes mal procesadas o los servidores solitarios que intentan llegar a todo el
planeta.

Los dos servicios usan una CDN rápida y amplia. Esta configuración reduce la latencia y
aumenta la velocidad de descarga. La velocidad de descarga afecta el tiempo de carga de páginas, y es una
de las métricas más importantes de experiencia del usuario y conversión.

**¿Y cómo se comparan?**

Cloudinary tiene [160 mil clientes](http://cloudinary.com/customers), entre ellos
Netflix, eBay y Dropbox. Imgix no hizo pública su cantidad de clientes, pero
es más pequeño que Cloudinary. Pero aún así, la base de clientes de imgix incluye usuarios de imágenes pesadas,
como Kickstarter, Exposure, unsplash y Eventbrite.

Hay muchas variables no controladas en la manipulación de imágenes que dificultan
una comparación cabeza a cabeza entre los dos servicios. Entonces,
depende mucho del grado de necesidad de procesamiento de la imagen que se tenga, cuánto le lleva a una variable
(cantidad de tiempo) y qué tamaño y resolución se requieren para la salida final,
lo que a su vez afecta la velocidad y el tiempo de descarga. En última instancia, el costo puede ser el factor más importante
en tu caso.

Las CDN cuestan dinero. Un sitio con imágenes pesadas y mucho tráfico puede costar cientos
de dólares al mes en gastos de CDN. Hay un cierto nivel de conocimiento de los requisitos previos
y habilidades de programación que se requiere para aprovechar al máximo estos servicios.
Si no haces nada demasiado complejo, probablemente no tengas
problemas.

Pero si no estás cómodo con las herramientas o las API de procesamiento de imágenes,
debes prepararte para una pequeña curva de aprendizaje. Debes cambiar algunas URL en tus vínculos locales
para adaptarte a las ubicaciones de los servidores de CDN. Todo gracias a la
diligencia debida adecuada :)

**Conclusión**

Si actualmente procesas tus propias imágenes o piensas hacerlo, quizás debas
considerar una CDN.

## Cómo almacenar en caché recursos de imágenes {: #caching-image-assets }

Los recursos pueden especificar una política de almacenamiento en caché con [encabezados de caché
HTTP](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control).
Específicamente, `Cache-Control` puede definir quién puede almacenar respuesta en caché y durante cuánto
tiempo

La mayoría de las imágenes que entregas a los usuarios son recursos estáticos que [no
cambian](http://kean.github.io/post/image-caching) en el futuro. La mejor
estrategia de almacenamiento en caché para estos recursos es una agresiva.

Al configurar los encabezados de almacenamiento en caché HTTP, establece Cache-Control en un valor de campo max-age de
un año (p. ej., `Cache-Control:public; max-age=31536000`). Este tipo de almacenamiento en caché
agresivo funciona bien para la mayoría de los tipos de imágenes, especialmente las que son
avatares y encabezados de imágenes de larga data.

Note: Si procesas imágenes con PHP, esto puede destruir el almacenamiento en caché debido a la
opción
[session_cache_limiter](http://php.net/manual/en/function.session-cache-limiter.php)
predeterminada. Esto puede ser un desastre para el almacenamiento en caché, y se recomienda [circunvalar](https://stackoverflow.com/a/3905468)
esto definiendo la opción
session_cache_limiter(“public”), que configurará `public, max-age=`. Deshabilitar y
configurar encabezados de control de almacenamiento en caché personalizados también es una buena opción.

## Carga previa de recursos de imagen críticos {: #preload-critical-image-assets }

Los recursos de imagen críticos pueden cargarse previamente con [`<link
rel=preload>`](https://www.w3.org/TR/preload/).

`<link rel=preload>` es una recuperación declarativa que te permite forzar al navegador
para que haga una solicitud de un recurso sin bloquear el evento `onload` del documento.
Permite aumentar la prioridad de solicitudes de recursos que pueden
no ser detectados de otro modo hasta una etapa posterior del proceso de análisis del documento.

Las imágenes pueden cargarse previamente especificando un valor `as` de `image`:

```html
<link rel="preload" as="image" href="logo.jpg"/>
```

Los recursos de imágenes para `<img>`, `<picture>`, `srcset` y SVG pueden
beneficiarse con esta optimización.

Note: `<link rel="preload">` es [compatible](http://caniuse.com/#search=preload)
con Chrome y navegadores basados en Blink, como Opera, [Safari Tech
Preview](https://developer.apple.com/safari/technology-preview/release-notes/),
y se [implementó](https://bugzilla.mozilla.org/show_bug.cgi?id=1222633)
en Firefox.

Sitios como [Philips](https://www.usa.philips.com/),
[FlipKart](https://www.flipkart.com/) y [Xerox](https://www.xerox.com/) usan
`<link rel=preload>` para cargar previamente los recursos de su logotipo principal (utilizado con frecuencia anteriormente en el
documento). [Kayak](https://kayak.com/) también usa la carga previa para asegurarse de que la imagen
protagónica de su encabezado se cargue lo antes posible.


<img src="images/preload-philips.jpg" alt="Philips utiliza link rel=preload para
 la carga previa de la imagen de su logotipo"
         />


**¿Qué es el encabezado de carga previa de vínculo?**

Puede especificarse un vínculo de carga previa con una etiqueta HTML o un [encabezado de vínculo
HTTP](https://www.w3.org/wiki/LinkHeader). En cualquier caso, un vínculo de carga previa
dirige al navegador para que comience a cargar un recurso en la caché en memoria,
para indicar que la página espera usar el recurso con un alto grado de confianza, y
no quiere esperar que el escáner de carga previa o el analizador lo detecten.

Un encabezado de carga previa de vínculo para imágenes sería algo similar a esto:

```
Link: <https://example.com/logo-hires.jpg>; rel=preload; as=image
```

Cuando Financial Times incluyó un encabezado de carga previa de vínculos en su sitio,
recortaron [1 segundo](https://twitter.com/wheresrhys/status/843252599902167040)
el tiempo que tardaba en aparecer su imagen de membrete:


<img src="images/preload-financial-times.jpg" alt="FT con carga previa.
        Se muestra WebPageTest antes y después de la traza, con
 mejoras."
         />
Parte inferior: con `<link rel=preload>`; parte superior: sin el código. Comparación para un Moto G4 por medio de
3G en WebPageTest
[antes](https://www.webpagetest.org/result/170319_Z2_GFR/) y
[después](https://www.webpagetest.org/result/170319_R8_G4Q/).


De manera similar, Wikipedia mejoró el rendimiento del tiempo de visualización del logotipo con el encabezado de carga previa de
vínculo, como se cubrió en su [caso
de estudio](https://phabricator.wikimedia.org/phame/post/view/19/improving_time-to-logo_performance_with_preload_links/).

**¿Cuáles son los inconvenientes que deben considerarse al usar esta optimización?**

Debes estar muy seguro de que vale la pena cargar previamente recursos de imagen, ya que si no son
críticos para tu experiencia de usuario, quizás haya otros contenidos en la página
hacia los que vale la pena orientar esfuerzos para que se carguen antes. Al priorizar las solicitudes
de imágenes, quizás termines moviendo otros recursos hacia lugares más relegados de la cola.

Es importante evitar el uso de `rel=preload` para la carga previa de formatos de imagen que no tienen una
amplia compatibilidad con navegadores (p. ej., WebP). También es bueno evitar su uso para
imágenes receptivas definidas en `srcset`, donde la fuente recuperada puede variar según
las condiciones del dispositivo.

Para obtener más información sobre la carga previa, consulta [Preload, Prefetch and Priorities in
Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)
y [Preload: What Is It Good
For?](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/).

## Presupuestos de rendimiento web para imágenes {: #performance-budgets }

Un presupuesto de rendimiento es un "tope" para el rendimiento de páginas web que un equipo intenta
no superar. Por ejemplo, "las imágenes no superarán los 200 KB en ninguna página", o "la
experiencia del usuario debe ser utilizable en menos de 3 segundos". Cuando no se cumple un
presupuesto, debes averiguar a qué se debe y cómo volver a respetarlo.

Los presupuestos ofrecen una estructura útil para charlas sobre rendimiento con las partes interesadas.
Cuando una decisión de diseño o de negocios puede afectar el rendimiento del sitio, consulta el
presupuesto. Es una referencia para frenar cambios o repensarlos cuando
pueden dañar la experiencia de usuario de un sitio.

Descubrí que los equipos tienen mucho éxito con los presupuestos de rendimiento cuando su monitoreo
está automatizado. En lugar de inspeccionar manualmente las cascadas de regresiones de
presupuestos, la automatización puede indicar cuando se cruza una línea. Dos servicios de este tipo
que son útiles para el seguimiento de un presupuesto de rendimiento son
[Calibre](https://calibreapp.com/docs/metrics/budgets) y
[SpeedCurve](https://speedcurve.com/blog/tag/performance-budgets/).

Una vez que se define un presupuesto de rendimiento para tamaños de imagen, SpeedCurve comienza
a monitorear y envía alertas cuando se supera el rendimiento:


<img src="images/F2BCD61B-85C5-4E82-88CF-9E39CB75C9C0.jpg" alt="Monitoreo de tamaño
 de imágenes de SpeedCurve."
         />


Calibre ofrece una funcionalidad similar, además de admitir la configuración de presupuestos para cada
clase de dispositivo de destino. Esto es útil para su presupuesto, ya que los tamaños de imagen en
escritorio con WiFi pueden variar mucho respecto de los presupuestos para dispositivos móviles.


<img src="images/budgets.jpg" alt="Calibre admite presupuestos para tamaños de imagen."
         />

## Recomendaciones finales {: #closing-recommendations }

En última instancia, al elegir una estrategia de optimización de imágenes, debes considerar los tipos
de imágenes que se procesarán para los usuarios y el conjunto de criterios
de evaluación que creas razonables. Puede ser usar SSIM o Butteraugli. o bien, si
hablamos de un conjunto de imágenes lo suficientemente pequeño, salir de la percepción humana para considerar la opción
más lógica.

**Estas son mis recomendaciones finales:**

Si **no puedes** invertir en formatos de entrega condicionales según la compatibilidad con
navegadores:


* Guetzli + jpegtran de MozJPEG es un buen formato para JPEG de calidad > 90.
 * Para la Web, `q=90` es muy alto y produce desechos innecesarios. No puedes usar `q=80`, y
 en pantallas 2x ni siquiera con `q=50`. Como Guetzli no alcanza valores tan bajos, para
 la Web puedes usar MozJPEG.
    * Recientemente, Kornel Lesi&#x144;ski mejoró el comando cjpeg d mozjpeg para agregar
      un pequeño perfil sRGB con el fin de ayudar a que Chrome muestre el color natural en visualizaciones de
      gamut amplio
* PNG pngquant + advpng tiene un buen índice de velocidad/compresión
* Si **puedes** procesar condicionalmente (con `<picture>`, el [encabezado
  Accept](https://www.igvita.com/2013/05/01/deploying-webp-via-accept-content-negotiation/)
 o [Picturefill](https://scottjehl.github.io/picturefill/)):
    * Procesa WebP de menor calidad en navegadores compatibles con este formato
 * Crea imágenes WebP desde imágenes originales al 100% de calidad. De lo contrario,
 proporcionarás a los navegadores compatibles imágenes de peor aspecto con distorsiones
 de JPEG *y* distorsiones de WebP. Si comprimes imágenes de origen
 no comprimidas con WebP, incluirán las distorsiones de WebP menos visibles
 y también se podrán comprimir mejor.
        * La configuración predeterminada de `-m 4 -q 75` que utiliza el equipo de WebP generalmente es
 buena para la mayoría de los casos en los que se optimiza para índice de velocidad.
        * WebP también tiene un modo especial para archivos sin pérdida (`-m 6 -q 100`) que puede
 reducir un archivo a su tamaño más pequeño explorando todas las combinaciones de
 parámetros. Es un orden de magnitud más lento, pero vale la pena para
 recursos estáticos.
    *   Como reserva, puedes entregar archivos de origen comprimidos con Guetzli/MozJPEG a otros
 navegadores

¡Felices compresiones!
