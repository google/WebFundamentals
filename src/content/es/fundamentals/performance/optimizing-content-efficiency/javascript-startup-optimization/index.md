project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Mantén un costo bajo de transmisión de red y análisis/compilación para JavaScript para garantizar que las páginas sean interactivas con rapidez.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-11-30 #}
{# wf_blink_components: Blink>JavaScript #}

# Optimización de arranque de JavaScript {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

A medida que desarrollamos sitios que usan más JavaScript, a veces pagamos por lo que
enviamos de maneras que no siempre nos resultan obvias. En este artículo, consideraremos
por qué un poco de **disciplina** puede ser útil si deseas que tu sitio se cargue y sea
interactivo con rapidez en dispositivos móviles. Un uso menos intenso de JavaScript puede significar menos
tiempo de transmisión de red, menos tiempo dedicado a descomprimir código y menos tiempo
para analizar y compilar JavaScript.

## Red

Cuando la mayoría de los desarrolladores consideran el costo de JavaScript, lo hacen en
términos del **costo de descarga y ejecución**. Si se envían más bytes de JavaScript
por la red, cuanto más lenta sea la conexión de un usuario, más tiempo se necesitará.

<img src="images/1_U00XcnhqoczTuJ8NH8UhOw.png" alt="Cuando un navegador solicita un
recurso, este se debe obtener y descomprimir. En el caso
de recursos como JavaScript, se deben analizar y compilar antes de la
ejecución."/>

Esto puede ser un problema, incluso en países desarrollados, ya que el **tipo de conexión
de red real** que tiene el usuario puede no ser 3G, 4G o Wi-Fi. Los usuarios pueden estar en la red
Wi-Fi de una cafetería pero conectados a un hotspot celular con velocidades 2G.

Puedes **reducir** el costo de transferencia de red de JavaScript mediante lo siguiente:

* **Envío de solo el código que el usuario necesita**.
    * Usa la [división de código](/web/updates/2017/06/supercharged-codesplit) para separar
      las partes del código JavaScript que son esenciales de las partes que no lo son. Los agrupadores de módulos
      como [webpack](https://webpack.js.org) admiten la
      [división de código](https://webpack.js.org/guides/code-splitting/).
    * Carga el código que no es esencial con lentitud.
* **Minificación**
    * Usa [UglifyJS](https://github.com/mishoo/UglifyJS) para
      [minificar](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations)
      código ES5.
    * Usa [babel-minify](https://github.com/babel/minify) o
      [uglify-es](https://www.npmjs.com/package/uglify-es) para minificar ES2015+.
* **Compresión**
    * Como mínimo, usa
      [gzip](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text_compression_with_gzip)
      para comprimir los recursos basados en texto.
    * Considera usar
      [Brotli](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/)
      con [q11](https://twitter.com/paulcalvano/status/924660429846208514) aproximadamente. Brotli
      ofrece un mejor índice de compresión que gzip. Ayudó a CertSimple a ahorrar un
      [17%](https://speakerdeck.com/addyosmani/the-browser-hackers-guide-to-instant-loading?slide=30)
      del tamaño de los bytes de JS comprimidos y a LinkedIn a ahorrar un
      [4%](https://engineering.linkedin.com/blog/2017/05/boosting-site-speed-using-brotli-compression)
      de su tiempo de carga.
* **Eliminación de código que no se use**.
    * Usa la [cobertura de código de DevTools](/web/updates/2017/04/devtools-release-notes#coverage)
      para identificar oportunidades de código que se pueda
      eliminar o cargar con lentitud.
    * Usa
      [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)
      y browserlist para evitar funciones de transpilación que ya están incluidas en los navegadores modernos.
      Los desarrolladores experimentados pueden encontrar que el [análisis de los paquetes
      de webpack](https://github.com/webpack-contrib/webpack-bundle-analyzer)
      les resulta útil para identificar oportunidades para recortar dependencias innecesarias.
    * Para eliminar código, consulta información sobre la
      [eliminación de código muerto](https://webpack.js.org/guides/tree-shaking/), las optimizaciones avanzadas de [Closure
      Compiler](/closure/compiler/) y complementos de
      recorte de biblioteca como
      [lodash-babel-plugin](https://github.com/lodash/babel-plugin-lodash) o
      [ContextReplacementPlugin](https://iamakulov.com/notes/webpack-front-end-size-caching/#moment-js)
      de webpack
      para bibliotecas como Moment.js.
* **Almacenamiento de código en caché para minimizar viajes de red.**
    * Usa el [almacenamiento
      en caché de HTTP](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
      para garantizar que la caché de los navegadores responda de manera eficaz. Determina la vida útil
      óptima para secuencias de comandos (max-age) y proporciona tokens de validación (ETag) para evitar
      transferir bytes no modificados.
    * El almacenamiento en caché de service worker puede hacer que la red de la app sea más fuerte y darte
      eager access a funciones como [caché de código
      de V8](https://v8project.blogspot.com/2015/07/code-caching.html).
    * Usa almacenamiento en caché a largo plazo para evitar tener que volver a obtener recursos que no
      hayan cambiado. Si usas webpack, consulta información sobre el [hash
      de nombres de archivo](https://webpack.js.org/guides/caching/).

## Análisis y compilación

Una vez descargado, uno de los costos **más grandes** de JavaScript es el tiempo necesario para que un
motor de JS **analice y compile** el código. En [Chrome
DevTools](/web/tools/chrome-devtools/), el análisis y la compilación son parte del tiempo amarillo
de "secuencias de comandos" en el panel Performance.

<img src="images/1__4gNDmBlXxOF2-KmsOrKkw.png"/>

Las pestañas Bottom-Up y Call Tree muestran los tiempos exactos de análisis y compilación:

<figure> <img src="images/1_GdrVt_BTTzzBOIoyZZsQZQ.png"/> <figcaption> Panel Performance > Bottom-Up de Chrome
DevTools. Si las estadísticas de llamada de tiempo de ejecución de V8 están habilitadas, podemos
ver el tiempo transcurrido en fases como Parse y Compile. </figcaption> </figure>

Note: Por el momento, la compatibilidad del panel Performance con las estadísticas de llamada de tiempo de ejecución es experimental.
Para habilitarlas, ve a chrome://flags/#enable-devtools-experiments -> reinicia Chrome ->
ve a DevTools -> Settings -> Experiments -> presiona Mayús 6 veces -> marca la opción
llamada `Timeline: V8 Runtime Call Stats on Timeline` y cierra y vuelve a abrir DevTools.

Pero ¿por qué es importante todo esto?

<img src="images/1_Dirw7RdQj9Dktc-Ny6-xbA.png"/>

Si se necesita mucho tiempo para analizar y compilar código, se puede retrasar mucho
la interacción del usuario con el sitio. Cuanto más código JavaScript envíes, más tiempo
se necesitará para analizarlo y compilarlo antes de que el sitio sea interactivo.

> Byte por byte, **el procesamiento de JavaScript es más costoso para el navegador que
> una imagen o una fuente web de tamaño equivalente** — Tom Dale

Comparado con JavaScript, hay numerosos costos relacionados con el procesamiento
de imágenes de tamaño equivalente (sigue siendo necesario decodificarlas), pero en hardware móvil
promedio, es más probable que el JS afecte negativamente la interactividad de la página.

<figure> <img src="images/1_PRVzNizF9jQ_QADF5lQHpA.png"/> <figcaption>Los bytes de JavaScript
y de las imágenes tienen costos muy distintos. Las imágenes normalmente no bloquean el subproceso
principal ni impiden la interactividad de las interfaces mientras estas se decodifican y
se generan las tramas. Sin embargo, JS puede retrasar la interactividad debido a los costos de análisis,
compilación y ejecución.</figcaption> </figure>

Cuando decimos que el análisis y la compilación son muy lentos, es importante el contexto. A lo que nos referimos
es a los teléfonos móviles **promedio**. **Los usuarios promedio pueden tener teléfonos
con CPU y GPU lentas, pueden no tener memoria caché L2/L3 e incluso pueden tener restricciones
de memoria.**

> Las capacidades de la red y las capacidades del dispositivo no siempre coinciden. Puede haber un usuario
> que tenga una conexión de fibra excelente, pero que no tenga la mejor CPU para
> analizar y evaluar el código JavaScript enviado al dispositivo. También puede ocurrir la situación
> inversa: un usuario que tenga una conexión de red muy mala, pero una CPU excepcionalmente rápida. — Kristofer
> Baxter, LinkedIn

A continuación, podemos ver el costo de analizar alrededor de 1 MB de código JavaScript descomprimido (simple) en
hardware de baja gama y de alta gama. **Hay una diferencia de 2 a 5 veces en el tiempo necesario para analizar y compilar
el código entre los teléfonos más rápidos del mercado y los teléfonos promedio**.

<figure> <img src="images/1_8BQ3bCYu1AVvJWPR1x8Yig.png"/> <figcaption>En este gráfico
se destacan los tiempos de análisis para un paquete de 1 MB de JavaScript (aprox. 250 KB comprimidos) en
dispositivos de escritorio y móviles de distintas clases. Al analizar el costo del
análisis, se deben considerar las cifras sin compresión; por ejemplo, unos 250 KB de JS comprimidos
se descomprimen en alrededor de 1 MB de código.</figcaption> </figure>

¿Cómo se aplica esto a un sitio real, como CNN.com?

**En el iPhone 8 de alta gama, se necesitan tan solo unos 4 segundos para analizar y compilar el código JS de CNN, en comparación
con los 13 segundos que se requieren, aproximadamente, en un teléfono promedio (Moto G4)**. Esto puede afectar en gran medida la
rapidez con que el usuario puede interactuar libremente con el sitio.

<figure> <img src="images/1_7ysArXJ4nN0rQEMT9yZ_Sg.png"/> <figcaption>Arriba
se muestran los tiempos de análisis de una comparación del rendimiento del chip A11 Bionic de Apple con
Snapdragon 617 en el hardware más genérico de Android.</figcaption> </figure>

Esto destaca la importancia de hacer pruebas en hardware **promedio** (como Moto
G4) y no solamente en el teléfono al que tengas acceso. El contexto es importante,
pero debes **optimizar para el dispositivo y las condiciones de red que tengan tus usuarios**.

<figure> <img src="images/1_6oEpMEi_pjRNjmtN9i2TCA.png"/> <figcaption>Google
Analytics puede proporcionar información valiosa sobre las <a
href="https://crossbrowsertesting.com/blog/development/use-google-analytics-find-devices-customers-use/">clases
de dispositivos móviles</a> que usan tus usuarios reales para acceder al sitio. Esto te puede
permitir comprender las restricciones reales de CPU y GPU que
los afectan.</figcaption> </figure>


**¿Estamos enviando demasiado código JavaScript? Mmm, es probable :)**

Con HTTP Archive (500,000 sitios principales aprox.) para analizar el estado de [JavaScript en
dispositivos móviles](http://beta.httparchive.org/reports/state-of-javascript#bytesJs), podemos
ver que el 50% de los sitios tardan más de 14 segundos en ser interactivos. Estos sitios dedican hasta
4 segundos solamente al análisis y la compilación de JS.

<img src="images/1_sVgunAoet0i5FWEI9NSyMg.png"/>

Considera el tiempo que lleva obtener y procesar código JS y otros recursos, y
tal vez no te sorprenda que los usuarios pueden verse obligados a esperar un tiempo hasta
que sienten que la página está lista para usarse. Ciertamente, esto se puede mejorar.

**Si eliminas el código JavaScript que no es esencial de tus páginas, puedes reducir los tiempos
de trasmisión, las operaciones de análisis y compilación que hacen uso intensivo de la CPU, y una potencial sobrecarga de la memoria. Esto
también ayuda a que tus páginas sean interactivas más rápido.**

## Tiempo de ejecución

El análisis y la compilación no son los únicos procesos que pueden tener un costo asociado. **La ejecución de JavaScript**
(ejecutar código después de analizado y compilado) es una de las operaciones que se debe realizar
en el subproceso principal. Un tiempo de ejecución prolongado también puede afectar con qué rapidez un usuario puede
interactuar con tu sitio.

<img src="images/1_ec0wEKKVl7iQidBks3oDKg.png"/>

> Si la secuencia de comandos se ejecuta durante más de 50 ms, el tiempo hasta la interacción se retrasa
> *toda* la cantidad de tiempo que se necesite para descargar, compilar y ejecutar el código JS —
> Alex Russell

Para solucionar esto, mejor usar **fragmentos pequeños** de JavaScript, ya que se evita
bloquear el subproceso principal. Analiza si puedes reducir la cantidad de trabajo que se
realiza durante la ejecución.

## Otros costos

JavaScript puede afectar el rendimiento de las páginas de otras maneras:

* Memoria. Podría parecer que las páginas se bloquean o pausan con frecuencia debido a la GC (recolección de elementos
  no utilizados). Cuando un navegador recupera memoria, la ejecución de JS se pausa, de modo que un
  navegador que recolecte elementos no utilizados con frecuencia quizá pause la ejecución más a menudo
  de lo que nos gustaría. Evita las [fugas de memoria](/web/tools/chrome-devtools/memory-problems/)
  y las pausas de GC frecuentes para impedir que las páginas se bloqueen.
* Durante el tiempo de ejecución, el código JavaScript que tarda en ejecutarse puede bloquear el subproceso principal y, como resultado,
  las páginas pueden no responder. Si fragmentas tu trabajo en piezas de menor tamaño, con
  <code><a
  href="/web/fundamentals/performance/rendering/optimize-javascript-execution#use_requestanimationframe_for_visual_changes">requestAnimationFrame()</a></code>
  o <code><a
  href="/web/updates/2015/08/using-requestidlecallback">requestIdleCallback()</a></code>
  para la programación, puedes minimizar los problemas de falta de respuesta.

## Patrones para reducir el costo de entrega de JavaScript

Cuando intentas mantener bajo el tiempo necesario para analizar/compilar JavaScript y transmitirlo por la red,
hay patrones que te pueden ser útiles, como la fragmentación basada en rutas o
[PRPL](/web/fundamentals/performance/prpl-pattern/).

### PRPL

PRPL (push, representación, almacenamiento previo en caché y carga lenta) es un patrón optimizado para
la interactividad mediante un uso intensivo del fraccionamiento y el almacenamiento en caché del código:

<img src="images/1_VgdNbnl08gcetpqE1t9P9w.png"/>

Visualicemos el efecto que puede tener.

Analizamos el tiempo de carga de sitios móviles populares y apps web progresivas con
las estadísticas de llamada de tiempo de ejecución de V8. Como se ve, el tiempo de análisis (en naranja) es una
porción importante del tiempo de muchos de estos sitios:

<img src="images/1_9BMRW5i_bS4By_JSESXX8A.png"/>

[Wego](https://www.wego.com), un sitio que usa PRPL, logra tener un tiempo
de análisis bajo para sus rutas y, como resultado, es interactivo muy rápidamente. Muchos otros sitios
de los anteriores adoptaron presupuestos de rendimiento y fraccionamiento de código para intentar reducir sus costos
de JS.


### Arranque progresivo

Muchos sitios optimizan la visibilidad de su contenido a expensas de la interactividad. Para obtener
una buena primera pintura cuando se tienen paquetes de JavaScript voluminosos, los desarrolladores
a veces emplean representación de contenido en el servidor y después la "mejoran" para agregar controladores
de eventos cuando finalmente se obtiene el código JavaScript.

Ten cuidado, ya que esto tiene sus propios costos. 1) Por lo general, envías una respuesta HTML
*de mayor tamaño* que puede acelerar la interactividad y 2) puedes dejar al usuario en un "valle
inquietante" donde la mitad de la experiencia no ofrece interactividad real hasta que finalice
el procesamiento de JavaScript.

El arranque progresivo puede ser un mejor enfoque. Envía una página que
sea mínimamente funcional (compuesta solo por el código HTML/JS/CSS necesario para la ruta actual).
A medida que vayan llegando más recursos, la app puede hacer una carga lenta y desbloquear más funciones.

<figure> <img src="images/1_zY03Y5nVEY21FXA63Qe8PA.png"/> <figcaption> <a
href="https://twitter.com/aerotwist/status/729712502943174657">Arranque
progresivo</a> por Paul Lewis </figcaption> </figure>

Lo ideal es cargar código de manera proporcional a lo que es visible. PRPL y
el arranque progresivo son patrones que pueden ayudar a lograr esto.

## Conclusiones

**El tamaño de transmisión es esencial en las redes de baja gama. El tiempo de análisis es importante
para dispositivos con limitaciones de CPU. Es importante mantener estos valores bajos.**

Los equipos han tenido éxito al adoptar presupuestos estrictos de rendimiento para mantener tiempos
de transmisión, análisis y compilación de JavaScript reducidos. Consulta "[Can You
Afford It?: Real-world Web Performance
Budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)" (¿Puedes permitírtelo?: presupuestos de rendimiento web reales)
de Alex Russell para obtener información sobre presupuestos para dispositivos móviles.

<figure> <img src="images/1_U8PJVNrA_tYADQ6_S4HUYw.png"/> <figcaption>Es
útil considerar cuánto "margen" de JS nos pueden dejar para la lógica de apps
las decisiones de arquitectura que tomamos.</figcaption> </figure>

Si estás desarrollando un sitio para dispositivos móviles, haz todo lo posible por desarrollar
en hardware representativo, mantén los tiempos de análisis y compilación de JavaScript reducidos, y
adopta un presupuesto de rendimiento para asegurarte de que tu equipo pueda llevar un control de
los costos de JavaScript.

## Más información

* [Chrome Dev Summit 2017: prácticas recomendadas para la
  carga moderna](https://www.youtube.com/watch?v=_srJ7eHS3IM)
* [JavaScript Start-up
  Performance](https://medium.com/reloading/javascript-start-up-performance-69200f43b201) (Rendimiento de arranque de JavaScript)
* [Solving the web performance
  crisis](https://nolanlawson.github.io/frontendday-2016/) (Solución de la crisis de rendimiento web) — Nolan Lawson
* [Can you afford it? Real-world performance
  budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/) (¿Puedes permitírtelo?: presupuestos de rendimiento web reales)
  — Alex Russell
* [Evaluating web frameworks and
  libraries](https://twitter.com/kristoferbaxter/status/908144931125858304) (Evaluación de marcos de trabajo web y bibliotecas) —
  Kristofer Baxter
* [Resultados de la experimentación con
  Brotli de Cloudflare](https://blog.cloudflare.com/results-experimenting-brotli/) para
  la compresión (ten en cuenta que Brotli dinámico con una mayor calidad puede retrasar la representación inicial de la
  página, por lo que deberías evaluar con cuidado esta opción; probablemente sea conveniente que optes por comprimir
  de manera estática)
* [Performance
  Futures](https://medium.com/@samccone/performance-futures-bundling-281543d9a0d5) (Futuros de rendimiento)
  — Sam Saccone
