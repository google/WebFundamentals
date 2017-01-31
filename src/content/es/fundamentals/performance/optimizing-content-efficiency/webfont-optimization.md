project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La tipografía es fundamental para un buen diseño, para la inclusión de marca, la legibilidad y la accesibilidad. Las fuentes web permiten hacer todo esto y más: permiten seleccionar el texto, hacer búsquedas y hacer zoom, y admiten muchos puntos por pulgada, con lo que se consigue un texto preciso y coherente que se renderiza independientemente del tamaño de la pantalla y de la resolución. 

{# wf_updated_on: 2014-09-29 #}
{# wf_published_on: 2014-09-19 #}

# Optimizar fuentes web {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



La tipografía es fundamental para un buen diseño, para la inclusión de marca, la legibilidad y la accesibilidad. Las fuentes web permiten hacer todo esto y más: permiten seleccionar el texto, hacer búsquedas y hacer zoom, y admiten muchos puntos por pulgada, con lo que se consigue un texto preciso y coherente que se renderiza independientemente del tamaño de la pantalla y de la resolución. Las fuentes web son básicas para conseguir un diseño, una experiencia de usuario y un rendimiento satisfactorios.


La optimización de fuentes web es una parte fundamental de la estrategia de rendimiento global. Cada fuente es un recurso adicional y algunas fuentes pueden bloquear la renderización del texto. Pero que la página utilice fuentes web no significa que tenga que renderizarse más lentamente, sino al contrario, una fuente optimizada combinada con una estrategia de carga y aplicación en la página bien planteada puede contribuir a reducir el tamaño total de la página y a mejorar el tiempo de renderización.

## Anatomía de una fuente web

### TL;DR {: .hide-from-toc }
- Las fuentes unicode pueden contener miles de glifos
- Existen cuatro formatos de fuente: WOFF2, WOFF, EOT y TTF
- Algunos formatos de fuente requieren el uso de compresión GZIP


Una fuente web está formada por una serie de glifos, es decir, por formas vectoriales que describen una letra o un símbolo. Por lo tanto, el tamaño de un archivo de fuente concreto está determinado por dos variables sencillas: la complejidad de las rutas vectoriales de cada glifo y la cantidad de glifos de una fuente concreta. Por ejemplo, Open Sans, que es una de las fuentes web más populares, está formada por 897 glifos, que incluyen caracteres latinos, griegos y cirílicos.

<img src="images/glyphs.png" class="center" alt="Tabla de glifos de fuente">

Al seleccionar una fuente, hay que tener en cuenta qué conjuntos de caracteres admite. Si tienes que traducir el contenido de una página a diferentes idiomas, debes utilizar una fuente que ofrezca el mismo aspecto y la misma experiencia a los usuarios. Por ejemplo, se supone que la [familia de fuentes Noto de Google](https://www.google.com/get/noto/) es compatible con todos los idiomas del mundo. Sin embargo, puede ser que para descargar el tamaño total de Noto, con todos los idiomas incluidos, se requiera un archivo ZIP de más de 130 MB. 

Obviamente el uso de fuentes en la Web pasa por utilizar herramientas de ingeniería precisa para garantizar que la tipografía no interfiera en el rendimiento. Por suerte, la plataforma web proporciona todas las premisas necesarias y, a lo largo de esta guía, ofreceremos información práctica para sacar el máximo partido de estos dos mundos.

### Formatos de fuentes web

Hoy en día se utilizan cuatro formatos de contenedor de fuentes en la Web: [EOT](http://en.wikipedia.org/wiki/Embedded_OpenType), [TTF](http://es.wikipedia.org/wiki/TrueType), [WOFF](http://es.wikipedia.org/wiki/Web_Open_Font_Format) y [WOFF2](http://www.w3.org/TR/WOFF2/). Por desgracia, a pesar de estas múltiples posibilidades, no existe un formato universal único que funcione en todos los navegadores, tanto en los antiguos como en los nuevos: EOT [solo funciona con IE](http://caniuse.com/#feat=eot), TTF es [parcialmente compatible con IE](http://caniuse.com/#search=ttf), WOFF tiene una mayor compatibilidad pero [no está disponible en algunos navegadores más antiguos](http://caniuse.com/#feat=woff) y la compatibilidad de WOFF 2.0 [todavía se está implementando en muchos navegadores](http://caniuse.com/#feat=woff2).

¿Y qué conclusión sacamos de esto? No existe ningún formato único que funcione en todos los navegadores, lo que significa que tenemos que enviar varios formatos para proporcionar una experiencia homogénea:

* Utilizar una variante de WOFF 2.0 para los navegadores que lo admitan
* Utilizar una variante de WOFF para la mayoría de navegadores
* Utilizar una variante de TTF para los navegadores antiguos de Android (anteriores a 4.4)
* Utilizar una variante de EOT para los navegadores IE antiguos (anteriores a IE9)
^

Note: Técnicamente también existe el <a href="http://caniuse.com/svg-fonts">contenedor de fuentes SVG</a>, pero no es compatible con IE ni con Firefox, y ahora Chrome tampoco lo admite. Por lo tanto, su uso está limitado y por eso lo omitimos de forma intencionada en esta guía.

### Reducir el tamaño de fuente mediante la compresión

Cada fuente está formada por varios glifos, cada uno de los cuales es un conjunto de rutas que describen la forma de una letra. Obviamente, todos los glifos son distintos, pero a pesar de ello contienen mucha información similar que se puede comprimir con GZIP o con un compresor compatible: 

* Los formatos EOT y TTF no se comprimen de forma predeterminada: asegúrate de que tus servidores estén configurados para aplicar una [compresión GZIP](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip) al utilizar estos formatos.
* WOFF dispone de compresión integrada: asegúrate de que tu compresor WOFF utilice una configuración de compresión óptima. 
* WOFF2 utiliza algoritmos de preprocesamiento y de compresión personalizados para proporcionar una reducción aproximada del 30% sobre el tamaño de archivo con relación a otros formatos: consulta el [informe](http://www.w3.org/TR/WOFF20ER/).

Por último, cabe apuntar que algunos formatos de fuente contienen metadatos adicionales, como información de la [optimización de fuentes](http://en.wikipedia.org/wiki/Font_hinting) y del [interletraje](http://es.wikipedia.org/wiki/Interletraje) que puede no ser necesaria en algunas plataformas. De esta forma se puede optimizar aún más el tamaño de archivo. Consulta las opciones de optimización que tienes disponibles en tu compresor de fuentes y, si eliges esta ruta, asegúrate de que tienes la infraestructura adecuada para probar y proporcionar estas fuentes optimizadas en cada navegador concreto. Por ejemplo, {\f3 (c)}{\f2321   Google} Fonts conserva más de 30 variantes optimizadas para cada fuente y detecta y proporciona automáticamente la variante óptima para cada plataforma y para cada navegador.

Note: Puedes usar la <a href='http://en.wikipedia.org/wiki/Zopfli'>compresión Zopfli</a> para los formatos EOT, TTF y WOFF. Zopfli es un compresor compatible con zlib que proporciona una reducción del tamaño de archivo aproximada del 5% mediante gzip.

## Definir la familia de fuentes con @font-face

### TL;DR {: .hide-from-toc }
- Utiliza la opción format() para especificar varios formatos de fuente
- Crea subconjuntos de fuentes unicode grandes para mejorar el rendimiento: utiliza los subconjuntos de la gama unicode y proporciona manualmente un subconjunto alternativo para los navegadores más antiguos
- Reduce el número de opciones de estilo de las fuentes para mejorar el rendimiento de la renderización de la página y del texto


La regla arroba de CSS @font-face permite definir la ubicación de un recurso de fuente concreto, sus características de estilo y los puntos de código unicode para los que se debe utilizar. Se puede usar una combinación de estas declaraciones @font-face para construir una `familia de fuentes` que el navegador pueda utilizar para evaluar qué recursos de fuente debe descargar y aplicar a la página actual. Echemos un vistazo más de cerca al funcionamiento real de este sistema.

### Selección del formato

Cada declaración @font-face proporciona el nombre de la familia de fuentes, que funciona como un grupo lógico de diferentes declaraciones, [propiedades de fuentes](http://www.w3.org/TR/css3-fonts/#font-prop-desc), como estilo, grosor y extensión, y el [descriptor src](http://www.w3.org/TR/css3-fonts/#src-desc), que especifica una lista prioritaria de ubicaciones para el recurso de fuente.


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome.woff2') format('woff2'), 
           url('/fonts/awesome.woff') format('woff'),
           url('/fonts/awesome.ttf') format('ttf'),
           url('/fonts/awesome.eot') format('eot');
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: italic;
      font-weight: 400;
      src: local('Awesome Font Italic'),
           url('/fonts/awesome-i.woff2') format('woff2'), 
           url('/fonts/awesome-i.woff') format('woff'),
           url('/fonts/awesome-i.ttf') format('ttf'),
           url('/fonts/awesome-i.eot') format('eot');
    }


En primer lugar, ten en cuenta que los ejemplos anteriores definen una única familia _Awesome Font_ con dos estilos (normal y _cursiva_), cada uno de los cuales hace referencia a un conjunto distinto de recursos de fuente. A su vez, cada descriptor `src` contiene una lista prioritaria y separada por comas de las variantes del recurso: 

* La directiva `local()` permite hacer referencia a fuentes instaladas localmente, cargarlas y utilizarlas.
* La directiva `url()` permite cargar fuentes externas y puede contener una optimización `format()` opcional que indica el formato de la fuente a la que hace referencia la URL proporcionada.

Note: A menos que hagas referencia a fuentes del sistema predeterminadas, debes proporcionar una lista de ubicaciones de fuentes externas, porque no es habitual que el usuario las tenga instaladas localmente, especialmente en dispositivos móviles, en los que es materialmente imposible `instalar` fuentes adicionales.

Si el navegador determina que se necesita la fuente, recurre a la lista de recursos proporcionada en el orden especificado e intenta cargar el recurso apropiado. Por ejemplo, siguiendo el ejemplo anterior:

1. El navegador ejecuta la disposición de la página y determina las variantes de fuentes que se requieren para renderizar el texto especificado en la página.
2. El navegador comprueba si cada una de las fuentes está disponible localmente.
3. Si el archivo no está disponible localmente, recurre a definiciones externas:
  * Si alguno de los formatos está optimizado, el navegador comprueba si es compatible antes de iniciar la descarga. Si no es así, pasa al siguiente.
  * Si ninguno de los formatos está optimizado, el navegador descarga el recurso.

Al combinar las directivas locales y externas con las optimizaciones de formato adecuadas podemos especificar todos los formatos de fuente disponibles y podemos dejar que el navegador se encargue del resto: el navegador deduce qué recursos se requieren y selecciona el formato óptimo por nosotros.

Note: El orden de especificación de las variedades de fuentes juega un papel importante. El navegador selecciona el primer formato que admite. Por lo tanto, si quieres que los navegadores más nuevos utilicen WOFF2, debes ubicar la declaración WOFF2 encima de WOFF, etc.

### Subconjunto de la gama unicode

Además de las propiedades de la fuente, como el estilo, el grosor y la extensión, la regla @font-face permite definir un conjunto de puntos de código unicode compatibles con todos los recursos. Esto nos permite dividir una fuente unicode grande en subconjuntos más pequeños (p. ej., subconjuntos latino, cirílico, griego) y descargar solamente los glifos requeridos para renderizar el texto en una página concreta.

El [descriptor de la gama unicode](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range) permite especificar una lista de valores de gama delimitada por comas. Los valor pueden tener una de estas tres formas:

* Punto de código único (p. ej., U+416)
* Alcance del intervalo (p. ej., U+400-4ff): indica los puntos de código de inicio y final de una gama
* Alcance del comodín (p. ej., U+4??): los caracteres `?` indican cualquier dígito hexadecimal

Por ejemplo, podemos dividir la familia _Awesome Font_ en subconjuntos latinos y japoneses, para que el navegador descargue el que corresponda según sea necesario. 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('ttf'),
           url('/fonts/awesome-l.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-jp.woff2') format('woff2'), 
           url('/fonts/awesome-jp.woff') format('woff'),
           url('/fonts/awesome-jp.ttf') format('ttf'),
           url('/fonts/awesome-jp.eot') format('eot');
      unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
    }
    

Note: El subconjunto de fuentes unicode es particularmente importante para los idiomas asiáticos, que contienen una cantidad de glifos mucho mayor que los idiomas occidentales y en los que la fuente `completa` se acostumbra a medir en megabytes en vez de hacerlo en decenas de kilobytes.

El uso de subconjuntos de la gama unicode y de archivos independientes de cada variante estilística de la fuente permite definir una familia de fuentes compuesta, que se descarga de forma más rápida y más eficaz. De esta forma, el visitante solo tendrá que descargar las variantes y los subconjuntos que necesite, y no estará obligado a descargar subconjuntos que nunca verá ni utilizará en la página. 

Dicho esto, la gama unicode plantea un pequeño problema, y es que aún [no es compatible con todos los navegadores](http://caniuse.com/#feat=font-unicode-range). Algunos navegadores ignoran la optimización de la gama unicode y descargan todas las variantes, mientras que otros pueden no procesar la declaración @font-face. Para solucionarlo, tenemos que recurrir al `subconjunto manual` en los navegadores más antiguos.

Puesto que los navegadores antiguos no son lo suficientemente inteligentes para seleccionar solamente los subconjuntos necesarios y no pueden construir una fuente compuesta, tenemos que proporcionar un único recurso de fuente que contenga todos los subconjuntos necesarios y ocultar el resto al navegador. Por ejemplo, si la página solo utiliza caracteres latinos, podemos quitar los demás glifos y utilizar solamente este conjunto concreto como un recurso independiente. 

1. **¿Cómo podemos saber cuáles son los subconjuntos necesarios?** 
  - Si el navegador admite el subconjunto de la gama unicode, seleccionará automáticamente el subconjunto correcto. La página solo tiene que proporcionar los archivos del subconjunto y especificar las gamas unicode adecuadas en las reglas @font-face.
  - Si el navegador no admite la gama unicode, la página tendrá que ocultar todos los subconjuntos innecesarios (p. ej., el desarrollador tendrá que especificar los subconjuntos requeridos).
2. **¿Cómo podemos generar subconjuntos de fuentes?**
  - Utiliza la [herramienta pyftsubset](https://github.com/behdad/fonttools/blob/master/Lib/fontTools/subset.py#L16) de código abierto para hacer un subconjunto y optimizar las fuentes.
  - Algunos servicios de fuentes permiten crear subconjuntos manualmente mediante los parámetros de consultas personalizadas, que permiten especificar de forma manual el subconjunto requerido para la página. Consulta la documentación de tu proveedor de fuentes.


### Selección y síntesis de fuentes

Cada familia de fuentes está formada por diferentes variantes estilísticas (normal, negrita, cursiva) y por varios grosores para cada estilo, cada uno de los cuales, a su vez, puede contener formas de glifos muy diferentes (p. ej., espaciados o tamaños distintos, o formas totalmente diferentes). 

<img src="images/font-weights.png" class="center" alt="Grosor de la fuente">

Por ejemplo, el diagrama anterior ilustra una familia de fuentes con tres grosores de negrita distintos disponibles: 400 (normal), 700 (negrita) y 900 (negrita extra). El navegador asigna automáticamente todas las demás variantes intermedias (en gris) a la variante más cercana. 

> Al especificar un grosor para el que no existe ninguna fuente, se utiliza una fuente con un grosor similar. Por lo general, el grosor de las negritas se asigna a fuentes más densas, mientras que los grosores menos densos se asignan a fuentes menos gruesas.
> > <a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">Algoritmo de concordancia de fuentes CSS3</a>

Para las variantes en _cursiva_ se utiliza una lógica similar. El diseñador de la fuente controla de qué variantes dispondrá y nosotros controlamos qué variantes utilizaremos en la página. Puesto que cada variante comporta una descarga distinta, se recomienda no tener una cantidad excesiva de variantes. Por ejemplo, podemos definir dos variantes de negrita para nuestra familia _Awesome Font_: 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('ttf'),
           url('/fonts/awesome-l.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 700;
      src: local('Awesome Font'),
           url('/fonts/awesome-l-700.woff2') format('woff2'), 
           url('/fonts/awesome-l-700.woff') format('woff'),
           url('/fonts/awesome-l-700.ttf') format('ttf'),
           url('/fonts/awesome-l-700.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    

En el ejemplo anterior podemos ver que la familia _Awesome Font_ está formada por dos recursos que incluyen el mismo conjunto de glifos latinos (U+000-5FF) pero que ofrecen dos `grosores` distintos: normal (400) y negrita (700). Sin embargo, ¿qué sucede si una de nuestras reglas CSS especifica un grosor de fuente diferente o establece la propiedad de estilo de fuente a cursiva?

* Si no está disponible una coincidencia de fuente exacta, el navegador la sustituirá por la coincidencia más cercana.
* Si no se encuentra ninguna coincidencia estilística (p. ej., no hemos indicado variantes de cursiva en el ejemplo anterior), el navegador sintetizará su propia variante de fuente. 

<img src="images/font-synthesis.png" class="center" alt="Síntesis de fuentes">

> Los autores deben tener en cuenta que puede ser que las opciones sintetizadas no sean adecuadas para alfabetos como el cirílico, en los que las formas en cursiva tienen una forma muy distinta. Siempre es mejor utilizar fuentes en cursiva reales que depender de las versiones sintetizadas.
> > <a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">Estilo de fuente CSS3</a>


En el ejemplo anterior se muestra la diferencia entre los resultados de fuentes reales y sintetizadas de Open-Sans. Todas las variantes sintetizadas se generan a partir de una fuente de grosor 400. Como puedes ver, hay una diferencia significativa en los resultados. La información para generar las variantes en negrita y en cursiva no se especifica. Por lo tanto, los resultados variarán de un navegador a otro y también dependerán mucho de la fuente.

Note: Para conseguir la máxima coherencia y los mejores resultados visuales, no confíes ciegamente en la síntesis de fuentes. Lo que sí te será útil es reducir la cantidad de variantes de fuentes utilizadas y especificar sus ubicaciones para que el navegador pueda descargarlas cuando vaya a utilizarlas en la página. Dicho esto, en algunos casos puede ser que la variante sintetizada <a href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>sea una opción viable</a>. Utilízala con precaución.


## Optimizar la carga y la renderización

### TL;DR {: .hide-from-toc }
- Las solicitudes de fuentes se retrasan hasta que se construye el árbol de visualización, lo que puede retardar la renderización del texto
- La API de carga de fuentes permite implementar estrategias de carga y renderización de fuentes personalizadas que sustituyen la carga de fuentes lenta predeterminada
- La incrustación de fuentes permite sustituir la carga de fuentes lenta predeterminada en los navegadores antiguos


Es probable que una fuente web `completa` que incluya todas las variantes estilísticas (que puede ser que no necesitemos) más todos los glifos (que puede ser que tampoco usemos) comporte la descarga de muchos megabytes. Para solucionarlo, se ha diseñado específicamente la regla CSS @font-face, para poder dividir la familia de fuentes en una serie de recursos: subconjuntos unicode, variantes de estilo distintos, etc. 

Con estas declaraciones, el navegador deduce cuáles son las variantes y los subconjuntos requeridos y descarga el conjunto mínimo necesario para renderizar el texto. Este comportamiento es muy útil, pero si no vamos con cuidado, también puede bloquear el rendimiento en la ruta de renderización importante y retrasar la renderización del texto, lo cual queremos evitar por todos los medios. 

### Fuentes web y la ruta de renderización importante

La carga lenta de fuentes comporta una implicación oculta importante que puede retrasar la renderización del texto: el navegador debe [construir el árbol de visualización](/web/fundamentals/performance/critical-rendering-path/render-tree-construction), que depende de los árboles DOM y CSSOM, antes de saber qué recursos de fuente necesitará para renderizar el texto. Por lo tanto, las solicitudes de fuentes se posponen a otros recursos importantes y puede ser que el navegador no pueda renderizar texto hasta recuperar el recurso.

<img src="images/font-crp.png" class="center" alt="Ruta de renderización importante de fuentes">

1. El navegador solicita el documento HTML
2. El navegador empieza a analizar la respuesta HTML y a construir el DOM
3. El navegador detecta CSS, JS y otros recursos, y procesa las solicitudes
4. El navegador construye el árbol CSSOM una vez ha recibido todo el contenido de CSS y lo combina con el árbol DOM para construir el árbol de visualización
  * Las solicitudes de fuentes se procesan cuando el árbol de visualización indica qué variantes de fuentes se necesitan para renderizar el texto especificado en la página
5. El navegador implementa la distribución y pinta el contenido en la pantalla
  * Si la fuente aún no está disponible, puede ser que el navegador no renderice ningún píxel de texto
  * Cuando la fuente esté disponible, el navegador pintará los píxeles de texto

En el `intervalo` entre la primera pintura del contenido de la página, que se puede hacer justo después de la creación del árbol de visualización, y la solicitud del recurso de fuente es donde se crea el `problema de texto en blanco` en el que el navegador puede renderizar el diseño de la página y omitir el texto. El comportamiento real es distinto en función del navegador:

* Safari retiene la renderización de texto hasta que finaliza la descarga de la fuente.
* Chrome y Firefox retienen la renderización de la fuente hasta 3 segundos y, a continuación, utilizan una fuente alternativa. una vez finalizada la descarga de la fuente, vuelven a renderizar el texto otra vez con la fuente descargada.
* IE renderiza inmediatamente con la fuente alternativa si la fuente solicitada aún no está disponible y vuelve a renderizar al finalizar la descarga de la fuente.

Hay buenos argumentos a favor y en contra de las diferentes estrategias de renderización: a algunas personas les molesta la doble renderización, mientras que otras prefieren ver los resultados de forma inmediata y no les importa el reflujo de la página una vez terminada la descarga de fuentes. Aquí no entraremos en este debate. Lo importante es que una carga lenta reduce la cantidad de bytes, pero también puede retrasar la renderización del texto. Ahora vamos a echar un vistazo a las opciones que tenemos para optimizar este comportamiento.

### Optimizar la renderización de fuentes con la API de carga de fuentes

La [API de carga de fuentes](http://dev.w3.org/csswg/css-font-loading/) proporciona una interfaz de secuencia de comandos para definir y manipular fuentes CSS, para hacer el seguimiento del progreso de descarga y para sustituir el comportamiento de carga lenta predeterminado. Por ejemplo, si estamos seguros de que necesitaremos una variante de fuente concreta, podemos definirla e indicarle al navegador que inicie una obtención inmediata del recurso de fuente:


    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
    });
    
    font.load(); // don't wait for render tree, initiate immediate fetch!
    
    font.ready().then(function() {
      // apply the font (which may rerender text and cause a page reflow)
      // once the font has finished downloading
      document.fonts.add(font);
      document.body.style.fontFamily = "Awesome Font, serif";
    
      // OR... by default content is hidden, and rendered once font is available
      var content = document.getElementById("content");
      content.style.visibility = "visible";
    
      // OR... apply own render strategy here... 
    });
    

Además, como podemos comprobar el estado de la fuente (mediante el método [check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check)) y hacer el seguimiento de su progreso de descarga, también podemos definir una estrategia personalizada para renderizar texto en nuestras páginas: 

* Podemos retener la renderización de todo el texto hasta que la fuente esté disponible.
* Podemos implementar un receso personalizado para cada fuente.
* Podemos utilizar la fuente alternativa para desbloquear la renderización e inyectar un nuevo estilo que utilice la fuente deseada cuando esté disponible.

Lo mejor de todo es que también podemos combinar las estrategias anteriores en distintos contenidos de la página. Por ejemplo, se puede retener la renderización de texto en algunas secciones hasta que la fuente esté disponible, utilizar una fuente alternativa y después volver a renderizar cuando la descarga de la fuente haya terminado, especificar recesos diferentes, etc. 

Note: <a href='http://caniuse.com/#feat=font-loading'>Algunos navegadores aún están desarrollando</a> la API de carga de fuentes. Plantéate utilizar <a href='https://github.com/bramstein/fontloader'>FontLoader polyfill</a> o la <a href='https://github.com/typekit/webfontloader'>biblioteca de carga de fuentes web</a> para conseguir una funcionalidad similar pero con el coste general de una dependencia de JavaScript adicional.

### Optimizar la renderización de fuentes mediante la incrustación

Una sencilla estrategia alternativa para usar la API de carga de fuentes para eliminar el `problema del texto en blanco` es incrustar el contenido de la fuente en una hoja de estilos CSS:

* El navegador descarga automáticamente y de forma prioritaria las hojas de estilos CSS con consultas multimedia coincidentes ya que son necesarias para construir el árbol CSSOM.
* Al incrustar los datos de las fuentes en una hoja de estilos CSS se fuerza al navegador a descargar la fuente con alta prioridad sin esperar al árbol de visualización. Por ejemplo, es como sustituir manualmente el comportamiento de carga lenta predeterminado.

La estrategia de incrustación no es tan flexible y no nos permite definir recesos personalizados ni estrategias de renderización en diferente contenido, sino que es una solución sencilla y potente que funciona en todos los navegadores. Para obtener mejores resultados, separa las fuentes incrustadas en una hoja de estilos independiente y proporciónalas con un parámetro max-age grande. De esta forma, al actualizar el CSS no obligas a los visitantes a volver a descargar las fuentes. 

Note: Utiliza la incrustación de forma selectiva. Recuerda que el motivo por el que la carga de @font-face es lenta es para evitar la descarga de variantes y subconjuntos de fuentes innecesarios. Además, aumentar el tamaño del CSS mediante una incrustación excesiva influye de forma negativa a la <a href='/web/fundamentals/performance/critical-rendering-path/'>ruta de renderización importante</a>, ya que el navegador debe descargar todos los CSS para poder construir el CSSOM, crear el árbol de renderización y renderizar el contenido de la página en la pantalla.

### Optimizar la reutilización de fuentes mediante el almacenamiento en la memoria caché HTTP

Normalmente los recursos de fuente son recursos estáticos que no se actualizan con frecuencia. Por lo tanto están pensados para tener una caducidad max-age a largo plazo, siempre que se especifique un [encabezado ETag condicional](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags) y una [política de control de caché óptima](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) para todos los recursos de fuente.   
    
No hace falta almacenar fuentes en almacenaje local ni mediante otros mecanismos. Cada una de ellas tiene su conjunto de problemas de rendimiento. La caché HTTP del navegador, combinada con la API de carga de fuentes o con la biblioteca de carga de fuentes web, proporciona el mecanismo más adecuado y más potente para proporcionar recursos de fuentes al navegador.


## Lista de verificación para la optimización

A diferencia de lo que se acostumbra a pensar, el uso de fuentes web no comporta obligatoriamente un retraso en la renderización de páginas ni influye negativamente en otras métricas de rendimiento. El uso de fuentes bien optimizadas puede proporcionar una experiencia de usuario global mucho mejor: se mejora la inclusión de marca, la legibilidad, la usabilidad y la capacidad de hacer búsquedas, al mismo tiempo que se ofrece una solución de resolución múltiple y escalable que se adapta bien a todos los formatos y resoluciones de pantalla. No tengas miedo de utilizar fuentes web. 

Dicho esto, llevar a cabo una implementación de forma inexperta puede conllevar grandes descargas y retrasos innecesarios. Ahora es cuando tenemos que desempolvar el kit de herramientas de optimización y ayudar al navegador mediante la optimización de los mismos recursos de fuente y de la forma como se recuperan y se utilizan en nuestras páginas. 

1. **Audita y supervisa el uso de fuentes:** no utilices demasiadas fuentes en las páginas y reduce el número de variantes utilizadas para cada fuente. De esa forma contribuirás a proporcionar una experiencia más coherente y rápida a los usuarios.
2. **Agrupa los recursos de fuentes en subconjuntos:** se pueden hacer subconjuntos de muchas fuentes o dividirlas en varias gamas unicode para proporcionar solamente los glifos que requiere una página concreta. De esta forma se reduce el tamaño de archivo y se mejora la velocidad de descarga del recurso. Sin embargo, al definir los subconjuntos, recuerda optimizarlos para la reutilización de fuentes, es decir, no pretendemos descargar un conjunto de caracteres distintos para cada página, sino un conjunto de caracteres que puedan coexistir. Es recomendable hacer subconjuntos en función del abecedario (latino, cirílico, etc.).
3. **Proporciona formatos de fuentes optimizadas para cada navegador:** cada fuente se debe proporcionar en formatos WOFF2, WOFF, EOT y TTF. Asegúrate de aplicar una compresión GZIP a los formatos EOT y TTF, ya que no se comprimen de forma predeterminada.
4. **Especifica las políticas de revalidación y de almacenamiento en la memoria caché óptimas:** las fuentes son recursos estáticos que no se actualizan con frecuencia. Asegúrate de que tus servidores proporcionan una marca de tiempo max-age de larga duración y un token de revalidación que permita la reutilización eficaz de fuentes en diferentes páginas.
5. **Utiliza la API de carga de fuentes para optimizar la ruta de renderización importante:** el comportamiento de carga lenta puede comportar un retraso en la renderización del texto. La API de carga de fuentes permite cambiar este comportamiento con fuentes concretas y especificar estrategias de receso personalizadas para contenido distinto de la página. Para los navegadores más antiguos que no admiten esta API, puedes utilizar la biblioteca de carga de fuentes web de JavaScript o la estrategia de incrustación de CSS.


