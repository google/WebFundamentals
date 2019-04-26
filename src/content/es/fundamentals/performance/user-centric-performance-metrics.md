project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Métricas de rendimiento centradas en el usuario

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-06-01 #}
{# wf_tags: performance #}
{# wf_blink_components: Blink>PerformanceAPIs #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Métricas de rendimiento centradas en el usuario {: .page-title }

{% include "web/_shared/contributors/philipwalton.html" %}

Es sumamente común escuchar que el rendimiento importa y que es esencial
que las aplicaciones web sean rápidas.

Pero, a medida que intentes responder la pregunta *¿Qué tan rápida es mi aplicación?*,
comprenderás que "rápido" es un término ambiguo. ¿Qué significa exactamente "rápido"? ¿En qué
contexto? ¿Y rápido para quién?

<aside>
  <strong>Note:</strong> si prefieres mirar un video en lugar de leer un artículo,
 hablé sobre este tema en Google I/O 2017 con mi colega
  <a href="https://twitter.com/shubhie">Shubhie Panicker</a>.
</aside>

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="6Ljq-Jn-EgU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Al hablar sobre rendimiento, es importante hacerlo con precisión para no generar
conceptos erróneos o extender mitos que harían que desarrolladores
con buenas intenciones optimicen elementos incorrectos
y, en última instancia, perjudiquen la experiencia de usuario en lugar de mejorarla.

Para brindar un ejemplo específico, hoy en día es habitual escuchar comentarios como:
__*Probé mi aplicación y se carga en X,XX segundos*__.

El problema con esta declaración *no* es que sea falsa, sino que
distorsiona la realidad. Los tiempos de carga varían considerablemente
de un usuario a otro según las capacidades de su dispositivo y las condiciones de red. Presentar
los tiempos de carga como un solo número omite a los usuarios que experimentaron cargas mucho más prolongadas.

En la práctica, el tiempo de carga de una aplicación es una recopilación de
los tiempos de carga de cada usuario, y la única manera de representarlo
es con una distribución como la del histograma a continuación:

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-histogram.png"
       alt="Un histograma de los tiempos de carga para los visitantes de un sitio web"/>
</figure>

Los números en el eje X muestran los tiempos de carga y la altura de las barras
en el eje Y muestra la cantidad relativa de usuarios que experimentaron un tiempo de carga
en ese segmento de tiempo específico. Como se muestra en este gráfico, si bien el segmento más grande de usuarios
experimentó cargas de menos de uno o dos segundos, una gran parte de ellos
observó tiempos de carga mucho mayores.

El otro motivo por el que "mi sitio se carga en X,XX segundos" es un mito es que la carga no
es un solo momento en el tiempo; es una experiencia que ninguna métrica puede
capturar por completo. Hay varios momentos durante la experiencia de carga que pueden afectar
si un usuario la percibe como "rápida" y, si solo nos enfocamos en uno, podemos
pasar por alto malas experiencias que se produjeron durante el resto del tiempo.

Por ejemplo, consideremos una aplicación que se optimiza para obtener una representación inicial rápida
y que entrega contenido al usuario de forma inmediata. Si la aplicación carga un gran conjunto
JavaScript cuyo análisis y ejecución demoran varios segundos, el contenido
de la página no será interactivo hasta que se complete la ejecución de JavaScript. Si un usuario
puede ver un vínculo en la página, pero no puede hacer clic en él, o si
puede ver un cuadro de texto, pero no puede escribir en él, es probable que no preste atención a la velocidad con la que se representa la página.

Así que, en lugar de medir la carga con una sola métrica, debemos medir los tiempos de
cada momento a lo largo de la experiencia que pueden afectar la *precepción* de carga de
los usuarios.

Un segundo ejemplo de un mito de rendimiento es que __*el rendimiento solo preocupa
en el tiempo de carga*__.

Como equipo, somos culpables de haber cometido este error, que puede llegar a potenciarse por
el hecho de que la mayoría de las herramientas de rendimiento *solo* miden el rendimiento de carga.

La realidad es que el rendimiento deficiente aparece en cualquier momento,
no solo durante la carga. Las aplicaciones que no responden rápidamente a toques o clics y las que no
se desplazan ni se animan con facilidad pueden ser tan deficientes como las que se cargan con lentitud. Los usuarios
consideran la experiencia completa y, nosotros, como desarrolladores, debemos hacer lo mismo.

Un tema común en todos estos conceptos erróneos de rendimiento es que se enfocan
en aspectos que poco o nada tienen que ver con la experiencia de usuario. Del mismo modo,
las métricas de rendimiento tradicionales, como
tiempo [carga](https://developer.mozilla.org/en-US/docs/Web/Events/load) o tiempo
[DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
, son muy poco confiables, ya que el momento en que se produjeron puede coincidir
o no con el momento en que el usuario cree que se cargó la aplicación.

Para asegurarnos de no repetir este error, debemos responder estas
preguntas:

1. ¿Qué métricas miden con mayor precisión el rendimiento según la percepción de un humano?
2. ¿Cómo medimos estas métricas en nuestros usuarios reales?
3. ¿Cómo interpretamos nuestras mediciones para determinar si una aplicación es "rápida"?
4. Después de comprender el rendimiento de la aplicación para un usuario real,
 ¿qué hacemos para evitar las regresiones y, en lo posible, mejorar el rendimiento en el futuro?

## Métricas de rendimiento centradas en el usuario

Cuando un usuario navega a una página web, generalmente busca información
visual para reafirmar que todo funciona según lo esperado.

<table>
  <tr>
   <td><strong>¿Está sucediendo?</strong></td>
   <td>¿La navegación se inició correctamente? ¿El servidor respondió?</td>
  </tr>
  <tr>
   <td><strong>¿Es útil?</strong></td>
   <td>¿Se representó contenido suficiente como para atraer a los usuarios?</td>
  </tr>
  <tr>
   <td><strong>¿Es utilizable?</strong></td>
   <td>¿Los usuarios pueden interactuar con la página o todavía se encuentra ocupada en la carga?</td>
  </tr>
  <tr>
   <td><strong>¿Es agradable?</strong></td>
   <td>¿Las interacciones son fluidas y naturales, sin demoras ni bloqueos?</td>
  </tr>
</table>

Para comprender las situaciones en las que una página entrega esta información a los usuarios,
definimos varias métricas nuevas:

### Primer procesamiento de imagen y primer procesamiento de imagen con contenido

La API [Paint Timing](https://github.com/WICG/paint-timing) define dos
métricas: *primer procesamiento de imagen* (FP) y *primer procesamiento de imagen con contenido* (FCP). Estas métricas
indican los puntos, inmediatamente después de la navegación, cuando el navegador representa los píxeles
en la pantalla. Es importante para el usuario, ya que responde a la pregunta:
*¿está sucediendo?*

La principal diferencia entre las dos métricas es que FP indica el punto cuando el navegador
representa *cualquier elemento* visualmente diferente de lo que estaba
en la pantalla antes de la navegación. En cambio, FCP es el punto cuando el navegador
representa el primer bit de contenido desde el DOM, lo que puede ser texto, una imagen, SVG
o, incluso, un elemento `<canvas>`.

### Primer procesamiento de imagen con significado y tiempo de elemento hero

El primer procesamiento de imagen con significado (FMP) es la métrica que responde a la pregunta:
"¿es útil?". Si bien el concepto "útil" es sumamente difícil de especificar para aplicarlo
de forma genérica a todas las páginas web (por ende, no existe una especificación todavía),
es bastante fácil para los desarrolladores web saber las partes de sus páginas
que serán más útiles para los usuarios.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-hero-elements.png"
       alt="Ejemplos de elementos hero en diversos sitios web"/>
</figure>

A menudo, las "partes más importantes" de una página web se conocen como *elementos
hero*. Por ejemplo, en la página de visualización de YouTube, el elemento hero es
el video principal. En Twitter, estos elementos probablemente son las insignias de notificación
y el primer tweet. En una aplicación meteorológica, es el pronóstico para la ubicación especificada. Y, en un sitio
de noticias, posiblemente son la historia principal y la imagen destacada.

Casi siempre, las páginas web tienen partes más importantes que otras. Si
las partes más importantes de una página se cargan de forma rápida, es posible que el usuario
ni siquiera note que el resto de la página no se carga.

### Tareas largas

Para responder a las entradas de los usuarios, los navegadores agregan tareas a una cola
en el subproceso principal para ejecutarlas una por una. Aquí también es donde el navegador ejecuta
el JavaScript de la aplicación y, en ese sentido, el navegador mantiene un solo subproceso.

En algunos casos, estas tareas pueden demorar más tiempo en ejecutarse y, si eso sucede,
el subproceso principal se bloquea y el resto de las tareas en la cola deben esperar.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-long-tasks.png"
       alt="Tareas largas como se muestran en las herramientas para desarrolladores de Chrome"/>
</figure>

Esto puede parecer una demora o un bloqueo para el usuario y es una fuente
importante de malas experiencias en la Web de hoy en día.

La [API Long Tasks](https://w3c.github.io/longtasks/) identifica las tareas
de más de 50 ms de duración como potencialmente problemáticas
y las expone al desarrollador de aplicaciones. Se seleccionó la duración de 50 ms para que las aplicaciones
cumplan con las [pautas de RAIL](/web/fundamentals/performance/rail) de
responder a una entrada del usuario en 100 ms.

### Tiempo hasta que es interactiva

La métrica *Tiempo hasta que es interactiva* (TTI) indica el punto en el que la aplicación
se representa visualmente y es capaz de responder de forma confiable a una entrada del usuario. Es
posible que una aplicación no pueda responder a una entrada del usuario por diversos motivos:

* Todavía no se cargó el JavaScript necesario para que los componentes en la página
 funcionen.
* Existen tareas largas que bloquean el subproceso principal (como se describe
 en la última sección).

La métrica TTI identifica el punto en el que se carga el JavaScript inicial de la página
y se inactiva el subproceso principal (sin tareas largas).

### Asignación de métricas a la experiencia de usuario

Volviendo a las preguntas que antes identificamos como las más importantes
para la experiencia de usuario, en esta tabla se describe la forma en que se asigna
cada métrica mencionada a la experiencia que se espera optimizar:

<table>
  <tr>
    <th>La experiencia</th>
    <th>La métrica</th>
  </tr>
  <tr>
    <td>¿Está sucediendo?</td>
    <td>Primer procesamiento de imagen (FP)/Primer procesamiento de imagen con contenido (FCP)</td>
  </tr>
  <tr>
    <td>¿Es útil?</td>
    <td>Primer procesamiento de imagen con significado (FMP)/Tiempo de elemento hero</td>
  </tr>
  <tr>
    <td>¿Es utilizable?</td>
    <td>Tiempo hasta que es interactiva (TTI)</td>
  </tr>
  <tr>
    <td>¿Es agradable?</td>
    <td>Tareas largas (técnicamente la ausencia de tareas largas)</td>
  </tr>
</table>

Estas capturas de pantalla de un cronograma de carga te ayudarán a visualizar mejor
la ubicación de las métricas de carga en la experiencia de carga:

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-load-timeline.png"
       alt="Capturas de pantalla de las ubicaciones en la experiencia de carga donde se observan estas métricas"/>
</figure>

La siguiente sección detalla la forma de medir estas métricas en dispositivos de usuarios reales.

## Medición de estas métricas en dispositivos de usuarios reales

Uno de los principales motivos por los que históricamente hemos realizado optimizaciones para métricas como
la carga y`DOMContentLoaded` es porque se exponen como eventos en el navegador y
es fácil medirlas en usuarios reales.

Por otro lado, muchas otras métricas siempre han sido muy difíciles de
medir. Por ejemplo, este código es un truco que los desarrolladores suelen utilizar para detectar
tareas largas:

```
(function detectLongFrame() {
  var lastFrameTime = Date.now();
  requestAnimationFrame(function() {
    var currentFrameTime = Date.now();

    if (currentFrameTime - lastFrameTime > 50) {
      // Report long frame here...
    }

    detectLongFrame(currentFrameTime);
  });
}());
```

Este código inicia un bucle `requestAnimationFrame` infinito y registra el tiempo
en cada iteración. Si el tiempo actual muestra 50 ms más que el tiempo
anterior, se asume que es el resultado de una tarea larga. Este código funciona
en la mayoría de los casos, pero presenta muchas desventajas:

* Agrega sobrecarga a cada marco.
* Evita los bloques en estado de inactividad.
* Es terrible para la duración de la batería.

La regla más importante de los códigos de medición de rendimiento es que no deben
deteriorar el rendimiento.

Los servicios, como [Lighthouse](/web/tools/lighthouse/) y [Web Page
Test](https://www.webpagetest.org/), llevan bastante tiempo ofreciendo algunas de estas métricas nuevas
(por lo general, son excelentes herramientas para probar el rendimiento de
funciones antes de publicarlas), pero estas herramientas no se ejecutan
en los dispositivos de los usuarios, así que no reflejan la experiencia de rendimiento real de los usuarios.

Afortunadamente, con la incorporación de algunas API de navegador nuevas, es posible
medir estas métricas en dispositivos reales sin los trucos o los métodos alternativos
que pueden deteriorar el rendimiento.

Estas nuevas API son
[`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver),
[`PerformanceEntry`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry)
y
[`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp).
Para mostrar algún código en acción con estas nuevas API, el siguiente ejemplo de código
crea una nueva instancia de `PerformanceObserver` y se suscribe para recibir notificaciones
de las entradas de procesamiento de imagen (por ej., FP y FCP), así como de las tareas largas que se produzcan:

```
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // `entry` is a PerformanceEntry instance.
    console.log(entry.entryType);
    console.log(entry.startTime); // DOMHighResTimeStamp
    console.log(entry.duration); // DOMHighResTimeStamp
  }
});

// Start observing the entry types you care about.
observer.observe({entryTypes: ['resource', 'paint']});
```

`PerformanceObserver` ofrece algo nunca antes posible: la capacidad de suscribirse
a eventos de rendimiento a medida que se producen y responder a estos
de forma asíncrona. Esto reemplaza a la interfaz
[PerformanceTiming](https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface)
anterior, en la que se requería un sondeo para ver si los datos
se encontraban disponibles.

### Seguimiento de FP/FCP

Una vez obtenidos los datos para un evento de rendimiento determinado, es posible enviarlos
al servicio de análisis que se use para captar la métrica del usuario actual.
Por ejemplo, si se usa Google Analytics, es posible realizar un seguimiento de
los tiempos de procesamiento de imagen de la siguiente manera:

```
<head>
  <!-- Add the async Google Analytics snippet first. -->
  <script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
  </script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>

  <!-- Register the PerformanceObserver to track paint timing. -->
  <script>
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // `name` will be either 'first-paint' or 'first-contentful-paint'.
      const metricName = entry.name;
      const time = Math.round(entry.startTime + entry.duration);

      ga('send', 'event', {
        eventCategory: 'Performance Metrics',
        eventAction: metricName,
        eventValue: time,
        nonInteraction: true,
      });
    }
  });
  observer.observe({entryTypes: ['paint']});
  </script>

  <!-- Include any stylesheets after creating the PerformanceObserver. -->
  <link rel="stylesheet" href="...">
</head>
```

<aside>
  <p><strong>Importante:</strong> Es necesario comprobar que <code>PerformanceObserver
  </code> se registre en el elemento <code>&lt;head&gt;</code> del documento
 antes de cualquier hoja de estilo, para que se ejecute antes de que se produzca FP/FCP.<p>
  <p>Esto ya no será necesario cuando se implemente el nivel 2 de <a
  href="https://w3c.github.io/performance-timeline/">la especificación PerformanceObserver,
 </a> la cual introduce una marca <a
  href="https://w3c.github.io/performance-timeline/#dom-performanceobserverinit-
  buffered"><code>buffered</code></a> que permite acceder a las entradas de rendimiento
 en cola antes de que se cree <code>PerformanceObserver</code>
  .</p>
</aside>

### Seguimiento de FMP con elementos hero

Una vez identificados los elementos de la página que son hero, se recomienda realizar
un seguimiento del punto en el que se vuelven visibles para los usuarios.

Todavía no existe una definición estandarizada de FMP (y, por ende, ningún tipo de entrada
de rendimiento). En parte, esto se debe a que es muy difícil determinar,
de forma genérica, lo que significa "con significado" para todas las páginas.

Sin embargo, en el contexto de una sola página o aplicación, lo mejor generalmente es
considerar FMP como el momento cuando los elementos hero se vuelven visibles
en la pantalla.

Steve Souders tiene un excelente artículo con el título [User Timing and Custom
Metrics](https://speedcurve.com/blog/user-timing-and-custom-metrics/) donde
se detallan muchas de las técnicas para usar las API de rendimiento del navegador
para determinar en código el momento en que diversos tipos de medios se vuelven visibles.

### Seguimiento de TTI

A largo plazo, esperamos disponer de una métrica de TTI estandarizada y expuesta en el navegador
a través de PerformanceObserver. Mientras tanto, desarrollamos un polyfill que
se puede usar para detectar TTI hoy y funciona con cualquier navegador compatible con la
[API Long Tasks](https://w3c.github.io/longtasks/).

El polyfill expone un método `getFirstConsistentlyInteractive()`, que devuelve
una promesa que se resuelve con el valor de TTI. Es posible realizar un seguimiento de TTI
mediante Google Analytics de la siguiente manera:

```
import ttiPolyfill from './path/to/tti-polyfill.js';

ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  ga('send', 'event', {
    eventCategory: 'Performance Metrics',
    eventAction: 'TTI',
    eventValue: tti,
    nonInteraction: true,
  });
});
```

El método `getFirstConsistentlyInteractive()` acepta una opción de configuración `startTime`
opcional, la que permite especificar un límite inferior antes del cual se sabe
que la aplicación no puede ser interactiva. De forma predeterminada, el polyfill utiliza
DOMContentLoaded como la hora de inicio, pero suele ser más efectivo utilizar
algo como el momento en el que los elementos hero se vuelven visibles o
el punto en el que se sabe que se agregaron todos los receptores de eventos.

Consulta la [documentación del
polyfill de TTI](https://github.com/GoogleChrome/tti-polyfill) para obtener
todas las instrucciones de instalación y uso.

<aside>
  <strong>Note:</strong> Al igual que con FMP, es bastante difícil especificar
 una definición de la métrica TTI que funcione a la perfección en todas las páginas web. La versión
 implementada en el polyfill funcionará en la mayoría de las aplicaciones,
 pero es posible que no funcione en alguna en particular. Es importante probarla antes de
 depender en esta opción. Para obtener detalles sobre las características específicas
 de implementación y definición de TTI, lee
 <a href="https://goo.gl/OSmrPk">el documento de definiciones de la métrica TTI</a>.
</aside>

### Seguimiento de tareas largas

Anteriormente, mencionamos que las tareas largas a menudo generan algún tipo de
experiencia de usuario negativa (por ej., un controlador de eventos lento o un marco descartado). Es bueno conocer
la frecuencia con la que esto se produce a fin de poder emplear esfuerzos para minimizarlo.

Para detectar tareas largas en JavaScript, es necesario un `PerformanceObserver` nuevo y
observar las entradas de tipo `longtask`. Una buena característica de las entradas de
tareas largas es una [propiedad de
atribución](https://w3c.github.io/longtasks/#sec-TaskAttributionTiming) para
poder descubrir el código que provocó la tarea larga:

```
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    ga('send', 'event', {
      eventCategory: 'Performance Metrics',
      eventAction: 'longtask',
      eventValue: Math.round(entry.startTime + entry.duration),
      eventLabel: JSON.stringify(entry.attribution),
    });
  }
});

observer.observe({entryTypes: ['longtask']});
```

La propiedad de atribución indicará el contexto de marco responsable de la tarea larga,
lo que es útil para determinar si las secuencias de comandos de terceros
provocan problemas. Las versiones futuras de la especificación planean agregar granularidad
y exponer la línea, el número de columna y la URL de la secuencia de comandos,
lo que es sumamente útil para determinar si las secuencias de comandos propias provocan lentitud.

### Seguimiento de la latencia de entrada

Las tareas largas que bloquean el subproceso principal pueden evitar que los receptores
de eventos se ejecuten a su debido tiempo. El [modelo de rendimiento
RAIL](/web/fundamentals/performance/rail) nos enseña que, para que una interfaz de usuario
se sienta fluida, debe responder a menos de 100 ms de la entrada del usuario y,
si esto no sucede, es importante saberlo.

Para detectar la latencia de entrada en código, es posible comparar la marca de tiempo
del evento con la hora actual y, si la diferencia es superior a 100 ms, se puede (y se debe)
informar.

```
const subscribeBtn = document.querySelector('#subscribe');

subscribeBtn.addEventListener('click', (event) => {
  // Event listener logic goes here...

  const lag = performance.now() - event.timeStamp;
  if (lag > 100) {
    ga('send', 'event', {
      eventCategory: 'Performance Metric'
      eventAction: 'input-latency',
      eventLabel: '#subscribe:click',
      eventValue: Math.round(lag),
      nonInteraction: true,
    });
  }
});
```

Como la latencia de evento generalmente es el resultado de una tarea larga, es posible combinar
la lógica de detección de latencia de evento con la lógica de tarea larga:
si una tarea larga bloquea el subproceso principal al mismo tiempo que `event.timeStamp`,
también se puede informar el valor de atribución de esa tarea larga. Esto permite trazar una línea
muy clara entre las experiencias de rendimiento negativas y el código
que las provocó.

Si bien esta técnica no es perfecta (no admite receptores de eventos grandes más adelante
en la fase de propagación y no funciona con animaciones de desplazamiento o compuestas
que no se ejecutan en el subproceso principal), es un buen primer paso
para comprender mejor con qué frecuencia la ejecución prolongada de código JavaScript
afecta la experiencia de usuario.

## Interpretación de los datos

Una vez iniciada la recopilación de métricas de rendimiento para usuarios reales, es necesario
poner esos datos en acción. Los datos de rendimiento de usuarios reales
son útiles para algunos puntos importantes:

* Validar que la aplicación se ejecuta de la forma esperada.
* Identificar lugares donde el rendimiento deficiente afecta negativamente las conversiones
 (lo que sea que eso signifique para la aplicación).
* Buscar oportunidades para mejorar la experiencia de los usuarios y deleitarlos.

Un aspecto que sin dudas vale la pena comparar es el rendimiento de la aplicación
en dispositivos móviles contra equipos de escritorio. El siguiente gráfico muestra la distribución de TTI en equipos de escritorio
(azul) y dispositivos móviles (naranja). Como el ejemplo muestra, el valor de TTI en los dispositivos móviles
es bastante mayor que en los equipos de escritorio:

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-tti-mobile-v-desktop.png"
       alt="Distribución de TTI en equipos de escritorio y dispositivos móviles"/>
</figure>

Si bien los números aquí son específicos de una aplicación (y no se debe esperar que coincidan
con los propios, ya que cada uno debe probarlo por sí mismo), este es un ejemplo de la forma en que se debe
abordar la generación de informes sobre métricas de uso:

#### Escritorio

<table>
  <tr>
   <td><strong>Percentil</strong></td>
   <td align="right"><strong>TTI (segundos)</strong></td>
   </td>
  </tr>
  <tr>
   <td>50%</td>
   <td align="right">2.3</td>
  </tr>
  <tr>
   <td>75%</td>
   <td align="right">4.7</td>
  </tr>
  <tr>
   <td>90%</td>
   <td align="right">8.3</td>
  </tr>
</table>

#### Móvil

<table>
  <tr>
   <td><strong>Percentil</strong></td>
   <td align="right"><strong>TTI (segundos)</strong></td>
   </td>
  </tr>
  <tr>
   <td>50%</td>
   <td align="right">3.9</td>
  </tr>
  <tr>
   <td>75%</td>
   <td align="right">8.0</td>
  </tr>
  <tr>
   <td>90%</td>
   <td align="right">12.6</td>
  </tr>
</table>

Desglosar los resultados entre dispositivos móviles y equipos de escritorio, y analizar
los datos de distribución son tareas que permiten obtener información valiosa rápida sobre las experiencias de los usuarios reales.
Por ejemplo, al observar la tabla anterior, podemos ver fácilmente que,
para esta aplicación, el **10% de los usuarios móviles demoraron más de 12 segundos en estar interactivos.**

### Forma en que el rendimiento afecta el negocio

Una enorme ventaja del seguimiento del rendimiento en las herramientas de análisis
es la posibilidad de usar esos datos para analizar la forma en que el rendimiento afecta el negocio.

Si se realiza un seguimiento de los cumplimientos de objetivos o las conversiones de comercio electrónico
en los análisis, es posible generar informes donde se exploren las correlaciones entre estas métricas
y las de rendimiento de la aplicación. Por ejemplo:

* ¿Los usuarios con tiempos interactivos más bajos compran más?
* ¿Los usuarios que experimentan más tareas largas durante el flujo de finalización de compra muestran índices de abandono más altos?

Si se encuentran correlaciones, es sustancialmente más fácil argumentar a favor
de que el rendimiento es importante y debe tener prioridad.

### Abandono por carga

Se sabe que muchos usuarios abandonan una página si esta demora demasiado en cargarse.
Lamentablemente, esto significa que todas nuestras métricas de rendimiento comparten
el problema de [sesgo de supervivencia](https://en.wikipedia.org/wiki/Survivorship_bias), en el que
los datos no abarcan las métricas de carga de las personas que no esperaron que la carga
de la página se complete (lo que probablemente significa que los números son demasiado bajos).

Si bien no se puede realizar un seguimiento de los números que se habrían obtenido si
los usuarios se hubieran quedado, se puede rastrear con qué frecuencia sucedió esto y
cuánto tiempo se quedó cada usuario.

Esto es un poco complicado en Google Analytics, ya que la biblioteca analytics.js se carga
generalmente de forma asíncrona y puede no estar disponible
cuando el usuario decide irse. Sin embargo, no es necesario esperar que analytics.js se cargue
para enviar datos a Google Analytics. Se pueden enviar directamente mediante el
[protocolo de medición](/analytics/devguides/collection/protocol/v1/).

Este código agrega un receptor al evento
[`visibilitychange`](https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange)
(el cual se activa durante la descarga de la página o se coloca en segundo plano)
y envía el valor de `performance.now()` en ese punto.

```
<script>
window.__trackAbandons = () => {
  // Remove the listener so it only runs once.
  document.removeEventListener('visibilitychange', window.__trackAbandons);
  const ANALYTICS_URL = 'https://www.google-analytics.com/collect';
  const GA_COOKIE = document.cookie.replace(
    /(?:(?:^|.*;)\s*_ga\s*\=\s*(?:\w+\.\d\.)([^;]*).*$)|^.*$/, '$1');
  const TRACKING_ID = 'UA-XXXXX-Y';
  const CLIENT_ID =  GA_COOKIE || (Math.random() * Math.pow(2, 52));

  // Send the data to Google Analytics via the Measurement Protocol.
  navigator.sendBeacon && navigator.sendBeacon(ANALYTICS_URL, [
    'v=1', 't=event', 'ec=Load', 'ea=abandon', 'ni=1',
    'dl=' + encodeURIComponent(location.href),
    'dt=' + encodeURIComponent(document.title),
    'tid=' + TRACKING_ID,
    'cid=' + CLIENT_ID,
    'ev=' + Math.round(performance.now()),
  ].join('&'));
};
document.addEventListener('visibilitychange', window.__trackAbandons);
</script>
```

Para usar este código, puedes copiarlo en `<head>` en el documento y reemplazar
el marcador de posición `UA-XXXXX-Y` por el
[ID de seguimiento](https://support.google.com/analytics/answer/1008080).

También es conveniente eliminar este receptor una vez que la página se vuelve
interactiva; de lo contrario, se informará el abandono de cargas donde también
se informa TTI.

```
document.removeEventListener('visibilitychange', window.__trackAbandons);
```

## Optimización de rendimiento y prevención de regresión

Lo magnífico de definir métricas centradas en el usuario es que, al optimizarlas,
es inevitable mejorar también la experiencia de usuario.

Una de la formas más simples de mejorar el rendimiento es enviar menos código JavaScript
al cliente. Si reducir el tamaño de código no es una opción, es esencial
pensar en *cómo* se entrega JavaScript.

### Optimización de FP/FCP

Es posible reducir el tiempo de primer procesamiento de imagen y primer procesamiento de imagen con contenido
si se eliminan las hojas de estilo o las secuencias de comandos que bloquean la representación del `<head>` del documento.

Al dedicar tiempo a identificar el conjunto mínimo de estilos necesarios para mostrar
al usuario que "está sucediendo" y alinearlo en el `<head>` (o usar el [servidor
push HTTP/2](/web/fundamentals/performance/http2/#server_push)), es posible obtener tiempos de
primer procesamiento de imagen sorprendentemente rápidos.

El [patrón de shell de aplicación](/web/updates/2015/11/app-shell) es un excelente ejemplo de
cómo hacer esto para [aplicaciones web progresivas](/web/progressive-web-apps/).

### Optimización de FMP/TTI

Una vez identificados los elementos esenciales de la interfaz de usuario en la página
(los elementos hero), se debe comprobar que la carga de secuencia de comandos inicial
contenga solo el código necesario para que esos elementos se representen y se vuelvan interactivos.

Todo código no relacionado con los elementos hero que se incluya en el conjunto
JavaScript aumentará el tiempo de interactividad. No existe motivo
para forzar a los dispositivos de los usuarios a descargar y analizar código JavaScript que no necesitan
de inmediato.

Como regla general, se debe hacer todo lo posible por minimizar el tiempo
entre FMP y TTI. Si no es posible minimizar este tiempo, es absolutamente
esencial que las interfaces indiquen con claridad que la página no es
interactiva todavía.

Una de las experiencias más frustrantes para un usuario es tocar un elemento y que
no suceda nada.

### Prevención de tareas largas

Al dividir el código y priorizar el orden en que se carga, no solo es posible reducir
el tiempo en que las páginas se vuelven interactivas, sino también reducir
las tareas largas y, con suerte, reducir la latencia de entrada y los marcos lentos.

Además de dividir el código en archivos separados, se pueden dividir los grandes
fragmentos de código síncrono en porciones pequeñas
que se puedan ejecutar de forma asíncrona o ser
[diferidas al siguiente punto inactivo](/web/updates/2015/08/using-requestidlecallback).
La ejecución de esta lógica de forma asíncrona en fragmentos más pequeños deja espacio
en el subproceso principal para que el navegador responda a la entrada del usuario.

Por último, es necesario probar el código de terceros y responsabilizar a todo código
que se ejecute con lentitud. Las secuencias de comandos de seguimiento o
los anuncios de terceros que generan muchas tareas largas pueden dañar al negocio
más que ayudarlo.

## Prevención de regresiones

Este artículo se enfoca profundamente en la medición del rendimiento en usuarios reales y,
si bien es cierto que los datos de RUM son los datos de rendimiento que al final importan,
los datos de laboratorio todavía son esenciales para comprobar que la aplicación funcione bien (y no
retroceda) antes del lanzamiento de nuevas funciones. Las pruebas de laboratorio son ideales
para detectar regresiones, ya que se ejecutan en un entorno controlado
y son mucho menos propensas a la variabilidad arbitraria de las pruebas RUM.

Es posible integrar herramientas como [Lighthouse](/web/tools/lighthouse/) y [Web Page
Test](https://www.webpagetest.org/) en el servidor de integración continua,
y redactar pruebas que desaprueben una compilación
si las métricas clave retroceden o descienden por debajo de cierto umbral.

Si el código ya fue lanzado, es posible agregar [alertas
personalizadas](https://support.google.com/analytics/answer/1033021) que notifiquen si se producen
picos inesperados en la repetición de eventos de rendimiento negativos.
Esto puede suceder, por ejemplo, si un tercero lanza una nueva versión de uno
de sus servicios y los usuarios comienzan a notar un aumento significativo
de las tareas largas.

Para evitar eficazmente las regresiones, es necesario probar el rendimiento tanto
en el laboratorio como en el mundo real con el lanzamiento de cada nueva función.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-test-cycle.png"
       alt="Diagrama de flujo de RUM y pruebas de laboratorio en el proceso de lanzamiento"/>
</figure>

## Conclusión y perspectiva a futuro

En el último año, hemos avanzado mucho en exponer métricas centradas en el usuario
para los desarrolladores en el navegador, pero eso no es todo, hemos planeado
mucho más.

Deseamos estandarizar las métricas de tiempo hasta que es interactiva y elementos hero,
a fin de que los desarrolladores no necesiten medirlas por cuenta propia o depender de polyfills. También
deseamos que los desarrolladores puedan atribuir más fácilmente marcos descartados
y latencia de entrada a tareas largas específicas y al código que las provoca.

Tenemos mucho trabajo por delante, pero estamos emocionados por los avances logrados. Con
las nuevas API, como `PerformanceObserver` y Long Tasks, compatibles de forma nativa con el navegador,
los desarrolladores finalmente tienen
las primitivas necesarias para medir el rendimiento en usuarios reales sin deteriorar su experiencia.

Las métricas más relevantes son las que representan las experiencias de usuarios reales.
Nuestro objetivo es que sea lo más fácil posible para los desarrolladores deleitar
a sus usuarios y crear aplicaciones magníficas.

## Seguir conectados

{% include "web/_shared/helpful.html" %}

Para presentar problemas de especificación:

* [https://github.com/w3c/longtasks/issues](https://github.com/w3c/longtasks/issues)
* [https://github.com/WICG/paint-timing/issues](https://github.com/WICG/paint-timing/issues)
* [https://github.com/w3c/performance-timeline/issues](https://github.com/w3c/performance-timeline/issues)

Para presentar problemas de polyfill:

* [https://github.com/GoogleChrome/tti-polyfill/issues](https://github.com/GoogleChrome/tti-polyfill/issues)

Para realizar preguntas:

* [progressive-web-metrics@chromium.org](mailto:progressive-web-metrics@chromium.org)
* [public-web-perf@w3.org](mailto:public-web-perf@w3.org)

Para expresar respaldo a inquietudes sobre las propuestas de API nuevas:

* [https://github.com/w3c/charter-webperf/issues](https://github.com/w3c/charter-webperf/issues)
