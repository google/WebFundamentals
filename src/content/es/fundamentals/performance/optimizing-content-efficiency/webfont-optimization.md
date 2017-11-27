project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La tipografía es fundamental para lograr un buen nivel de diseño, desarrollo de la marca, legibilidad y accesibilidad. Las fuentes web permiten todo lo anterior y más: el texto admite selección, búsqueda, ampliación y reducción, y admite valores elevados de ppp, lo que permite la representación de texto consistente y bien definido, independientemente del tamaño de la pantalla y la resolución.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-09-19 #}

# Optimización de fuentes web {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

La tipografía es fundamental para lograr un buen nivel de diseño, desarrollo de la marca, legibilidad y accesibilidad. Las fuentes web permiten todo lo anterior y más: el texto admite selección, búsqueda, ampliación y reducción, y admite valores elevados de ppp, lo que permite la representación de texto consistente y bien definido, independientemente del tamaño de la pantalla y la resolución. Las fuentes web son fundamentales para que el diseño, la experiencia de usuario y el rendimiento sean buenos.

La optimización de fuentes web es una pieza crítica de la estrategia de rendimiento general. Cada fuente es un recurso adicional, y algunas fuentes pueden bloquear la representación del texto; sin embargo, el hecho de que en la página se usen fuentes web no significa que su representación sea lenta. Por el contrario, las fuentes optimizadas, combinadas con una estrategia criteriosa sobre cómo se deben cargar y aplicar en la página, pueden ayudar a reducir el tamaño total de la página y mejorar los tiempos de representación de la página.


## Anatomía de una fuente web

### TL;DR {: .hide-from-toc }
* Las fuentes Unicode pueden contener miles de glifos.
* Existen cuatro formatos de fuente: WOFF2, WOFF, EOT y TTF.
* Algunos formatos de fuente requieren compresión GZIP.


Una *fuente web* es un conjunto de glifos y cada glifo es una forma vectorial que describe una letra o un símbolo. En consecuencia, el tamaño de un archivo de fuente específico está determinado por dos variables simples: la complejidad de las rutas de acceso vectoriales de cada glifo y la cantidad de glifos en una fuente determinada. Open Sans, por ejemplo, que es una de las fuentes web más populares, contiene 897 glifos, entre los que se incluyen caracteres latinos, griegos y cirílicos.

<img src="images/glyphs.png"  alt="Tabla de glifos de las fuentes">

Al seleccionar una fuente, es importante considerar los grupos de caracteres admitidos. Si necesitas localizar el contenido de tu página en varios idiomas, debes usar una fuente que pueda proporcionar una apariencia y experiencia uniformes a tus usuarios. Por ejemplo, [la familia de fuentes Noto de Google](https://www.google.com/get/noto/){: .external } apunta a admitir todos los idiomas del mundo. No obstante, ten en cuenta que el tamaño total del archivo ZIP de Noto, con todos los idiomas incluidos, supera los 130 MB.

Claramente, el uso de fuentes en la Web requiere un poco de ingeniería cuidadosa para garantizar que la tipografía no obstaculice el rendimiento. Afortunadamente, la plataforma web proporciona todas las primitivas necesarias, y durante el resto de esta guía abordaremos una observación práctica relacionada con cómo sacar el mayor provecho de ambos aspectos.

### Formatos de fuentes web

En la actualidad, en la Web se usan cuatro formatos de contenedores: [EOT](https://en.wikipedia.org/wiki/Embedded_OpenType), [TTF](https://en.wikipedia.org/wiki/TrueType), [WOFF](https://en.wikipedia.org/wiki/Web_Open_Font_Format) y [WOFF2](https://www.w3.org/TR/WOFF2/){: .external }. Lamentablemente, a pesar de la gran variedad de opciones, no hay un formato universal que funcione tanto en los navegadores nuevos como en los más antiguos: EOT [solo es compatible con IE](http://caniuse.com/#feat=eot), TTF [es parcialmente compatible con IE](http://caniuse.com/#search=ttf), WOFF es el que ofrece la compatibilidad más amplia, aunque [no está disponible en algunos navegadores anteriores](http://caniuse.com/#feat=woff) y la compatibilidad en WOFF 2.0 [se encuentra en desarrollo para muchos navegadores](http://caniuse.com/#feat=woff2).

Entonces, ¿a dónde nos lleva todo esto? No hay un solo formato que funcione en todos los navegadores. Esto significa que debemos ofrecer varios formatos para proporcionar una experiencia uniforme:

* Proporciona la variante WOFF 2.0 para los navegadores que la admitan.
* Proporciona la variante WOFF para la mayoría de los navegadores.
* Proporciona la variante TTF para navegadores Android previos (anteriores a la versión 4.4).
* Proporciona la variante EOT para navegadores IE anteriores (previos a IE9).

Note: Técnicamente existe otro formato de contenedor, el <a href='http://caniuse.com/svg-fonts'>contenedor de fuente SVG</a>, pero IE y Firefox nunca lo admitieron, y ahora quedó en desuso en Chrome. Por este motivo, es de uso limitado y se omite intencionalmente en esta guía.

### Reducción del tamaño de fuente con compresión

Una fuente es un conjunto de glifos, y cada uno de estos es un conjunto de rutas de acceso que describen la forma de la letra. Los glifos individuales son diferentes pero contienen mucha información similar que se puede comprimir con GZIP o un compresor compatible: 

* Los formatos EOT y TTF no se comprimen de forma predeterminada. Asegúrate de que tus servidores estén configurados para aplicar [compresión GZIP](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip) cuando proporciones estos formatos.
* WOFF cuenta con compresión integrada: asegúrate de que tu compresor WOFF esté configurado con los ajustes de compresión óptimos. 
* WOFF2 usa algoritmos personalizados de procesamiento previo y compresión para permitir una reducción del tamaño de archivo de aproximadamente el 30% en comparación con otros formatos. Para obtener más información, consulta [el informe de evaluación de WOFF 2.0](http://www.w3.org/TR/WOFF20ER/){: .external }.

Por último, cabe mencionar que algunos formatos de fuente contienen metadatos adicionales, como información de [sugerencia de fuentes](https://en.wikipedia.org/wiki/Font_hinting) e [interletraje](https://en.wikipedia.org/wiki/Kerning) que puede no ser necesaria en algunas plataformas, lo cual permite optimizar aún más el tamaño de archivo. Consulta tu compresor de fuentes para averiguar las opciones de optimización disponibles y, si tomas este camino, asegúrate de contar con la infraestructura adecuada para probar y proporcionar estas fuentes optimizadas a cada navegador específico. Por ejemplo, Google Fonts ofrece más de 30 variantes optimizadas para cada fuente, y detecta y proporciona automáticamente la variante óptima para cada plataforma y navegador.

Note: Considera usar <a href='http://en.wikipedia.org/wiki/Zopfli'>compresión Zopfli</a> para los formatos EOT, TTF y WOFF. Zopfli es un compresor compatible con zlib y permite una reducción del tamaño de archivo que supera en aproximadamente un 5% a la de gzip.

## Definición de la familia de fuentes con @font-face

### TL;DR {: .hide-from-toc }
* Usa la indicación <code>format()</code> para especificar varios formatos de fuente.
* Dispón en subconjuntos las fuentes Unicode grandes para mejorar el rendimiento. Usa subconjuntos de Unicode y proporciona una reserva de subconjunto manual para navegadores anteriores.
* Reduce la cantidad de variantes de fuente estilísticas para mejorar el rendimiento de representación de la página y del texto.


La regla-at @font-face de CSS te permite definir la ubicación de un recurso de fuente determinado, sus características de estilo y los puntos de código Unicode para los que se debe usar. Se puede usar una combinación de estas declaraciones @font-face a fin de construir una "familia de fuentes" que el navegador usará para evaluar los recursos de fuente que debe descargar y aplicar a la página actual.

### Selección de formato

Cada declaración @font-face proporciona el nombre de la familia de fuentes, que actúa como un grupo lógico compuesto por varias declaraciones, [propiedades de fuentes](http://www.w3.org/TR/css3-fonts/#font-prop-desc) como el estilo, el espesor y la expansión, y el [descriptor src](http://www.w3.org/TR/css3-fonts/#src-desc), que especifica una lista priorizada de ubicaciones para el recurso de fuente.


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome.woff2') format('woff2'), 
           url('/fonts/awesome.woff') format('woff'),
           url('/fonts/awesome.ttf') format('truetype'),
           url('/fonts/awesome.eot') format('embedded-opentype');
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: italic;
      font-weight: 400;
      src: local('Awesome Font Italic'),
           url('/fonts/awesome-i.woff2') format('woff2'), 
           url('/fonts/awesome-i.woff') format('woff'),
           url('/fonts/awesome-i.ttf') format('truetype'),
           url('/fonts/awesome-i.eot') format('embedded-opentype');
    }


Primero, observa que los ejemplos anteriores definen una familia _Awesome Font_ individual con dos estilos (normal e _italic_), y cada uno apunta a un conjunto diferente de recursos de fuente. A la vez, cada descriptor `src` contiene una lista priorizada 
de variantes de recursos separadas por comas: 

* La directiva `local()` te permite hacer referencia a fuentes instaladas localmente, cargarlas y usarlas.
* La directiva `url()` te permite cargar fuentes externas y pueden contener una sugerencia de `format()` opcional que indique el formato de la fuente a la que se hace referencia en la URL proporcionada.


Note: A menos que hagas referencia a las fuentes predeterminadas del sistema, en la práctica es poco común que el usuario lo tenga instalado localmente, en especial en dispositivos móviles, en los cuales resulta imposible “instalar” fuentes adicionales. En consecuencia, siempre debes proporcionar una lista de las ubicaciones de fuentes externas.

Cuando el navegador determina se necesita la fuente, recorre la lista de recursos proporcionada en el orden especificado e intenta cargar el recurso correcto. Por ejemplo, de acuerdo con el ejemplo anterior:

1. El navegador realiza un diseño de la página y determina las variantes de fuente necesarias para representar en la página el texto especificado.
1. Para cada fuente necesaria, el navegador comprueba si la fuente está disponible localmente.
1. Si la fuente no está disponible localmente, el navegador recorre definiciones externas:
    * Si hay una sugerencia de formato presente, el navegador comprueba si la admite antes de iniciar la descarga; de lo contrario, avanza hacia la siguiente.
    * Si no hay sugerencias de formato, el navegador descarga el recurso.

La combinación de directivas locales y externas con sugerencias de formato adecuadas te permite especificar todos los formatos de fuente disponibles y dejar que el navegador haga el resto. El navegador detecta qué recursos son necesarios y selecciona el formato óptimo.

Note: El orden en el que se especifican las variantes de las fuentes es importante. El navegador selecciona el primer formato compatible. Por lo tanto, si deseas que los navegadores más nuevos usen WOFF2, debes disponer la declaración de WOFF2 por encima de la de WOFF, etc.

### Subdivisión de Unicode

Además de las propiedades de la fuente, como estilo, peso y estiramiento, la 
regla @font-face nos permite definir un conjunto de puntos de código Unicode admitidos para 
cada recurso. Esto nos permite dividir una fuente Unicode grande en 
subconjuntos más pequeños (por ejemplo, los subconjuntos latino, cirílico y griego) y solo descargar los glifos requeridos para representar el texto en una página determinada.

El [descriptor del intervalo Unicode](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range) te permite especificar una lista de valores de intervalo delimitada por comas, en la que cada valor puede presentar una de tres formas diferentes:

* Punto de código individual (por ejemplo, U+416)
* Amplitud del intervalo (por ejemplo, U+400-4ff): indica los puntos de código inicial y final de un intervalo
* Intervalo comodín (por ejemplo, U+4??): los caracteres '?' indican dígitos hexadecimales

Por ejemplo, puedes dividir tu familia _Awesome Font_ en subconjuntos latino y japonés 
, que el navegador descarga cuando sea necesario: 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('truetype'),
           url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-jp.woff2') format('woff2'), 
           url('/fonts/awesome-jp.woff') format('woff'),
           url('/fonts/awesome-jp.ttf') format('truetype'),
           url('/fonts/awesome-jp.eot') format('embedded-opentype');
      unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
    }
    

Note: La disposición en subconjuntos de Unicode tiene particular importancia para los idiomas asiáticos, en los cuales la cantidad de glifos es mucho mayor que en los idiomas occidentales y la medición de una fuente "completa" normalmente se realiza en megabytes en lugar de decenas de kilobytes.

El uso de subconjuntos del intervalo Unicode y archivos independientes para cada variante estilística nos permite definir una familia de fuentes combinada cuya descarga es más rápida y más eficiente. El visitante solo descargará las variantes y los subconjuntos que necesita, y no están obligados a descargar subconjuntos que quizá nunca vean ni usen en la página. 

Dicho esto, hay un solo pequeño problema con el intervalo Unicode: [no todos los navegadores
lo admiten](http://caniuse.com/#feat=font-unicode-range) todavía. Algunos navegadores 
simplemente ignoran la sugerencia del intervalo Unicode y descargan todas las variantes, mientras 
otros podrían no procesar la declaración @font-face en absoluto. Para abordar esto, debemos recurrir a "subdivisión manual" para navegadores anteriores.

Dado que los navegadores anteriores no son lo suficientemente inteligentes para seleccionar solo los subconjuntos necesarios y no pueden construir una fuente compuesta, debes recurrir a proporcionar un solo recurso de fuente que contenga todos los subconjuntos necesarios y oculte el resto del navegador. Por ejemplo, si la página solo usa caracteres latinos, puedes eliminar otros glifos y proporcionar ese subconjunto específico como recurso independiente. 

1. **¿Cómo se determinan los subconjuntos necesarios?** 
    * Si el navegador admite la subdivisión del intervalo Unicode, seleccionará automáticamente el subconjunto adecuado. La página solo deberá proporcionar los archivos del subconjunto y especificar intervalos Unicode apropiados en las reglas @font-face.
    * Si el navegador no admite la subdivisión del intervalo Unicode, la página debe ocultar todos los subconjuntos innecesarios; es decir, el programador debe especificar los subconjuntos necesarios.
1. **¿Cómo generas subconjuntos de fuentes?**
    - Usa la [herramienta pyftsubset](https://github.com/behdad/fonttools/){: .external } de código abierto para disponer en subconjuntos y optimizar tus fuentes.
    - Algunos servicios de fuente permiten la subdivisión manual mediante parámetros de consulta personalizados, que puedes usar para especificar manualmente el subconjunto necesario para tu página. Consulta la documentación de tu proveedor de fuentes.


### Selección y síntesis de fuentes

Cada familia de fuentes está compuesta por múltiples variantes estilísticas (regular, negrita, cursiva) y múltiples pesos para cada estilo; y cada estilo, a la vez, puede contener diferentes formas de glifos, como espaciado diferente, ajuste de tamaño diferente o una forma diferente. 

<img src="images/font-weights.png"  alt="Tamaños de las fuentes">

Por ejemplo, el diagrama anterior ilustra una familia de fuentes que ofrece tres 
tamaños de negrita diferentes: 400 (regular), 700 (negrita) y 900 (extranegrita). Todas 
las demás variantes intermedias (indicadas en gris) son asignadas automáticamente por el navegador 
a la variante más cercana. 



> Cuando se especifica un espesor para el que no existe una fuente, se usa una fuente con un espesor aproximado. En general, los espesores en negrita se asignan a fuentes con espesores más gruesos, y los espesores finos se asignan a fuentes con espesores más delgados.
> > <a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">Algoritmo de coincidencia de fuentes CSS3</a>



Se aplica la misma lógica a las variantes de _cursiva_. El diseñador de fuentes controla las 
variantes que producirá y tú controlas las que usarás en la 
página. Dado que cada variante supone una descarga individual, se recomienda que el número de 
variantes sea reducido. Por ejemplo, puedes definir dos variantes en negrita para la 
familia _Awesome Font_: 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('truetype'),
           url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 700;
      src: local('Awesome Font'),
           url('/fonts/awesome-l-700.woff2') format('woff2'), 
           url('/fonts/awesome-l-700.woff') format('woff'),
           url('/fonts/awesome-l-700.ttf') format('truetype'),
           url('/fonts/awesome-l-700.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    

En el ejemplo anterior se declara que la familia _Awesome Font_ está compuesta por dos recursos que abarcan el mismo conjunto de glifos latinos (U+000-5FF), pero estos ofrecen dos "espesores" diferentes: normal (400) y negrita (700). Sin embargo, ¿qué sucede si en una de nuestras reglas CSS se especifica un espesor de fuente diferente o se fija la propiedad 
de estilo de la fuente en cursiva?

* Si no hay una coincidencia de fuente exacta disponible, el navegador usa la más cercana.
* Si no se encuentra una coincidencia estilística (por ejemplo, en el caso anterior no se declararon variantes de cursiva), el navegador sintetiza su propia variante de fuente. 

<img src="images/font-synthesis.png"  alt="Síntesis de fuentes">


> Los autores deben saber que los enfoques sintetizados probablemente no sean adecuados para tipos como el cirílico, en el cual las formas cursivas son muy diferentes en términos de forma. Siempre es mejor usar una fuente cursiva real que confiar en una versión sintética.
> > <a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">Estilo de fuente CSS3</a>


En el ejemplo anterior se ilustra la diferencia entre los resultados de la fuente real frente a la fuente sintetizada para Open-Sans. Todas las variantes sintetizadas se generan a partir de una fuente individual con un espesor de 400. Como puedes ver, existe una diferencia notoria en los resultados. No se especifican los detalles sobre cómo generar las variantes negrita y oblicua. Por lo tanto, los resultados varían de un navegador a otro y también dependerán en gran medida de la fuente.

Note: Para obtener la mejor uniformidad y los mejores resultados visuales, no debes basarte en la síntesis de fuentes. En lugar de ello, minimiza la cantidad de variantes de las fuentes que usas y especifica sus ubicaciones para que el navegador pueda descargarlas cuando se usen en la página. Dicho esto, en algunos casos una variante sintetizada <a href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>podría ser una opción viable</a>, pero debes actuar con precaución al usar variantes sitentizadas.

## Optimización de la carga y la representación

### TL;DR {: .hide-from-toc }
* Las solicitudes de fuente se difieren hasta que se crea el árbol de representación, lo cual puede generar demoras en la representación del texto.
* La Font Loading API te permite implementar estrategias personalizadas de carga y representación de fuentes que anulan la carga lenta de fuentes predeterminada.
* La incorporación de fuentes te permite anular la carga lenta de fuentes predeterminada en navegadores anteriores.

Una fuente web "completa" que incluya todas las variantes estilísticas, que quizá no necesites, y todos los glifos, que quizá no se usen, fácilmente puede implicar una descarga de muchos megabytes. Para abordar esto, la regla CSS @font-face está específicamente diseñada con el propósito de permitirte dividir la familia de fuentes en una colección de recursos: subconjuntos Unicode, diferentes variantes estilísticas, etc. 

Dadas estas declaraciones, el navegador descifrará las variantes y los subconjuntos necesarios, y descargará el conjunto mínimo requerido para representar el texto, lo cual es muy conveniente. Sin embargo, si no eres cuidadoso, también puede crear un cuello de botella de rendimiento en la ruta de acceso de representación crítica y retardar la representación del texto. 

### Fuentes web y ruta de acceso de representación crítica

La carga lenta de fuentes conlleva una consecuencia oculta importante que puede retardar la representación del texto: el navegador debe [construir el árbol de representación](/web/fundamentals/performance/critical-rendering-path/render-tree-construction), que depende de los árboles del DOM y el CSSOM, a fin de determinar los recursos que necesita para representar el texto. Como resultado, las solicitudes de fuentes se demoran hasta mucho después de otros recursos críticos y la representación del texto en el navegador puede quedar bloqueada hasta que se obtenga el recurso.

<img src="images/font-crp.png"  alt="Ruta de acceso de representación crítica de fuentes">

1. El navegador solicita el documento HTML.
1. El navegador comienza a analizar la respuesta HTML y construir el DOM.
1. El navegador detecta CSS, JS y otros recursos, y envía solicitudes.
1. El navegador construye el CSSOM una vez que recibe todo el contenido CSS, y lo combina con el árbol del DOM para construir el árbol de representación.
    * Las solicitudes de fuentes se envían un vez que el árbol de representación indica las variantes de fuente que se necesitan para representar el texto especificado en la página.
1. El navegador realiza un diseño y pinta contenido en la pantalla.
    * Si la fuente aún no está disponible, es posible que en el navegador no se representen los píxeles de texto.
    * Cuando la fuente está disponible, el navegador pinta los píxeles de texto.

La "carrera" entre la primera pintura del contenido de la página, que puede ocurrir poco 
después de la construcción del árbol de representación, y la solicitud del recurso de fuente son los elementos que 
generan el "problema de texto en blanco"; cuando este se produce, el navegador puede representar el diseño de la página, pero 
omite el texto. El comportamiento real difiere según el navegador:

* Safari demora la representación de texto hasta que se completa la descarga de la fuente.
* Chrome y Firefox demoran la representación de la fuente durante hasta 3 segundos, después de lo cual usan una fuente de reserva. Una vez que finaliza la descarga de la fuente, vuelven a representar el texto con la fuente descargada.
* Si la fuente solicitada aún no está disponible, IE representa de inmediato el texto con la fuente de reserva y vuelve a representarlo una vez que finaliza la descarga de la fuente.

Existen buenos argumentos a favor y en contra de las diferentes estrategias de representación. Para algunas personas, la doble representación puede ocasionar disgusto; otras prefieren ver resultados inmediatos y no le dan importancia al reprocesamiento de la página luego de que finaliza la descarga de la fuente. No abordaremos este asunto. Lo importante es que la carga lenta 
reduce la cantidad de bytes, pero también puede demorar la representación del texto. La próxima sección describe cómo puedes optimizar este comportamiento.

### Optimización de la representación de la fuente con la Font Loading API

La [Font Loading API](http://dev.w3.org/csswg/css-font-loading/) ofrece una interfaz de escritura para definir y manipular los tipos de fuente CSS, realizar un seguimiento de la descarga y anular su comportamiento predeterminado de carga lenta. Por ejemplo, si estás seguro de que se requerirá una variante de fuente determinada, puedes definirla e indicar al navegador que inicie una obtención inmediata del recurso de fuente:


    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
    });
    
    font.load(); // don't wait for the render tree, initiate an immediate fetch!
    
    font.ready().then(function() {
      // apply the font (which may re-render text and cause a page reflow)
      // after the font has finished downloading
      document.fonts.add(font);
      document.body.style.fontFamily = "Awesome Font, serif";
    
      // OR... by default the content is hidden, 
      // and it's rendered after the font is available
      var content = document.getElementById("content");
      content.style.visibility = "visible";
    
      // OR... apply your own render strategy here... 
    });
    

Además, debido a que puedes comprobar el estado de la fuente (a través del método [check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check)) y realizar un seguimiento del progreso de la descarga, también puedes definir una estrategia personalizada para representar texto en tus páginas: 

* Puedes demorar la representación de todo el texto hasta que la fuente esté disponible.
* Puedes implementar un tiempo de espera personalizado para cada fuente.
* Puedes usar la fuente de reserva para desbloquear la representación e inyectar un nuevo estilo que use la fuente deseada cuando esté disponible.

Lo mejor de todo es que también puedes combinar estas estrategias para contenido diferente en la página. Por ejemplo, puedes demorar la representación de texto en algunas secciones hasta que la fuente esté disponible, usar una fuente de reserva y luego volver realizar la representación cuando la descarga de la fuente haya finalizado, especificar diferentes tiempos de espera, etc. 

Note: La Font Loading API aún se encuentra <a href='http://caniuse.com/#feat=font-loading'>en desarrollo para algunos navegadores</a>. Considera usar el polyfill <a href='https://github.com/bramstein/fontloader'>FontLoader</a>, o la biblioteca <a href='https://github.com/typekit/webfontloader'>webfontloader</a>, para proporcionar funcionalidad similar, aunque con la sobrecarga de una dependencia JavaScript adicional.

### Optimización de la representación de la fuente con incorporación

Una estrategia alternativa simple para usar la Font Loading API a fin de eliminar el "problema de texto en blanco" es incorporar el contenido de la fuente en una hoja de estilo CSS:

* El navegador descarga automáticamente las hojas de estilo CSS con consultas de medios coincidentes y las prioriza según sean necesarias para construir el CSSOM.
* La incorporación de datos de fuente a una hoja de estilo CSS fuerza al navegador a descargar la fuente con alta prioridad y sin esperar al árbol de representación; es decir, esto actúa como una anulación manual del comportamiento predeterminado de descarga lenta.

La estrategia de incorporación no es tan flexible y no te permite definir tiempos de espera personalizados ni representar estrategias para diferentes contenidos, pero es una solución sencilla y sólida que funciona en todos los navegadores. Para obtener los mejores resultados, separa las fuentes incorporadas en una hojas de estilo independiente y proporciónalas con una vida útil (max-age) prolongada. De esta manera, cuando actualices tu CSS, no forzarás a tus visitantes a volver a descargar las fuentes. 

Note: Usa la incorporación de forma selectiva. Recuerda que @font-face usa comportamiento de carga lenta para evitar la descarga de variantes y subconjuntos innecesarios. Asimismo, aumentar el tamaño de tu CSS mediante incorporación agresiva afectará de forma negativa tu <a href='/web/fundamentals/performance/critical-rendering-path/'>ruta de acceso de representación crítica</a>. El navegador debe descargar toda la CSS para poder construir el CSSOM, crear el árbol de representación y representar el contenido de la página en pantalla.

### Optimización de la reutilización de fuentes con almacenamiento en caché HTTP

Generalmente, los recursos de fuentes son recursos estáticos que no presentan actualizaciones frecuentes. En consecuencia, son ideales para una vida útil prolongada; asegúrate de especificar un [encabezado ETag condicional](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags) y una [óptima política de Cache-Control](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) para todos los recursos de fuente.
    
No es necesario que almacenes fuentes en localStorage ni a través de otros mecanismos; cada 
uno tiene sus propias desventajas en términos de rendimiento. La caché HTTP del navegador, 
junto con la Font Loading API o la biblioteca webfontloader, ofrece el 
mecanismo más adecuado y sólido para proporcionar recursos de fuente al navegador.


## Lista de comprobación de optimización

En contra de lo que se suele creer, el uso de fuentes web no debería demorar la representación de la página ni afectar negativamente otras métricas de rendimiento. El uso bien optimizado de fuentes puede ofrecer una experiencia general de usuario mucho más positiva: excelente desarrollo de marca; legibilidad, usabilidad y capacidad de búsqueda mejoradas; al mismo tiempo, se proporciona una solución escalable en varias resoluciones que se adapte bien a los formatos y las resoluciones de pantalla. No dudes en usar fuentes web. 

Dicho esto, una implementación nueva puede implicar descargas pesadas y demoras innecesarias. Tú debes ayudar al navegador optimizando los recursos de fuente y la manera en que se obtienen y usan en tus páginas. 

* **Audita y controla el uso de fuentes:** no uses demasiadas en tus páginas y, para cada una, minimiza la cantidad de variantes empleadas. Esto ayuda a proporcionar una experiencia más uniforme y rápida para tus usuarios.
* **Subdivide tus recursos de fuentes:** muchas fuentes pueden subdividirse en diferentes intervalos Unicode a fin de proporcionar solo los glifos necesarios para una página determinada; esto reduce el tamaño de archivo y mejora la velocidad de descarga del recurso. No obstante, al definir subconjuntos, procura aplicar optimizaciones para la reutilización de las fuentes; por ejemplo, no te convendrá descargar un conjunto de caracteres diferentes y superpuestos en cada página. Una buena práctica es la disposición en subconjuntos según el tipo de fuente; por ejemplo, latino, cirílico, etc.
* **Proporciona formatos de fuente optimizados para cada navegador:** estas deben proporcionarse en los formatos WOFF2, WOFF, EOT y TTF. Asegúrate de aplicar compresión GZIP a los formatos EOT y TTF ya que no se comprimen de forma predeterminada.
* **Especifica políticas de revalidación y almacenamiento en caché óptimo:** las fuentes son recursos estáticos que se actualizan con poca frecuencia. Asegúrate de que tus servidores proporcionen una marca de tiempo de max-age prolongada y un token de revalidación para permitir la reutilización eficaz de fuentes en diferentes páginas.
* **Usa la Font Loading API para optimizar la ruta de acceso de representación crítica:** el comportamiento de carga lenta predeterminado puede generar demoras en la representación del texto. La Font Loading API te permite anular este comportamiento para determinadas fuentes, y también especificar estrategias de representación y tiempo de espera personalizadas para diferentes contenidos de la página. Para los navegadores más antiguos que no admitan la API, puedes usar la biblioteca JavaScript Web Font Loader o la estrategia de incorporación de CSS.


{# wf_devsite_translation #}
