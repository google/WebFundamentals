project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Bibliotecas de service worker

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-11-07 #}

# Bibliotecas de service worker {: .page-title }

Usa nuestras bibliotecas de [service worker](/web/fundamentals/getting-started/primers/service-workers)
para simplificar tu desarrollo gracias a la eliminación del código
estándar del service worker.

<figure class="attempt-right">
  <img src="/web/tools/images/tools-landing-page.gif">
  <figcaption>Resumen de las bibliotecas de service worker</figcaption>
</figure>

**sw-precache&mdash;** Se integra con tu proceso de compilación para generar un proceso
de trabajo de servicio que almacena previamente en caché los elementos estáticos, por ejemplo, un shell
de app.

**sw-toolbox&mdash;** Implementa patrones de almacenamiento en caché de tiempo de ejecución común como contenido
dinámico, llamadas API y recursos de terceros con la misma facilidad que escribir un archivo README.

**sw-offline-google-analytics&mdash;** Mantiene temporariamente y reintenta solicitudes
de analítica para evitar que se pierdan en las desconexiones de red.

<div class="clearfix"></div>

## ¿Por qué usar bibliotecas de service worker?

Estas bibliotecas ofrecen la ventaja de agregar un service worker a tu app web,
intercambiando la incertidumbre de la red por una promesa de experiencia rápida, primera
sin conexión, impulsada por service worker. Sin embargo, para escribir tu propio service worker
desde cero, debes sortear algunos obstáculos:

* Almacenamiento previo de URL en caché de manera fácil y confiable. 
* Incremento de una string de versión de caché para asegurar que los recursos almacenados previamente en caché
estén actualizados.
* Implementación de una estrategia de vencimiento de caché para justificar el tamaño o la antigüedad
de las entradas en caché.
* Compilación de patrones comunes como [lie-fi](http://www.urbandictionary.com/define.php?term=lie-fi)
 tiempos de espera de red y código estándar.
* Captura e informe de datos de analítica de Google durante el uso sin conexión.


Puedes solucionar todos estos inconvenientes con nuestras bibliotecas de service worker.


## Almacenamiento previo en caché de los service worker 

[Almacenamiento previo en caché de los service worker](https://github.com/GoogleChrome/sw-precache/) (`sw-precache`) es un módulo
 utilizado para generar un service worker que
almacena recursos previamente en caché. El módulo se puede usar en secuencias de comandos de compilación basadas en JavaScript,
como las escritas con [`gulp`](https://gulpjs.com/); y, además, proporciona una 
[interfaz de línea de comandos](https://github.com/GoogleChrome/sw-precache/#command-line-interface). Puedes usar el módulo
directamente, o si lo prefieres, puedes usar los [contenedores](https://github.com/GoogleChrome/sw-precache/#wrappers-and-starter-kits)
alrededor de `sw-precache` para entornos de compilación específicos, como
[`webpack`](https://webpack.github.io/).

Se puede [usar junto con](https://github.com/GoogleChrome/sw-precache/blob/master/sw-precache-and-sw-toolbox.md) la biblioteca [`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox)
, que funciona bien cuando se sigue el [modelo de contenido dinámico App Shell +](/web/fundamentals/architecture/app-shell).

La documentación completa se encuentra en [read me](https://github.com/GoogleChrome/sw-precache/blob/master/README.md),
y la [guía de introducción](https://github.com/GoogleChrome/sw-precache/blob/master/GettingStarted.md) 
ofrece un punto de partida más rápido.

[Obtén sw-precache](https://github.com/GoogleChrome/sw-precache/){: .button .button-primary }

### Funciones

| Función | Resumen |
|---------|---------|
| Almacena previamente en caché tu shell de app | Tu shell de app web; sus HTML, JavaScript y CSS centrales se pueden almacenar previamente en caché cuando un usuario visita tu página. |
| Integración del tiempo de compilación | Inclúyelo en tu proceso de compilación existente: [Gulp](https://github.com/GoogleChrome/sw-precache/blob/master/demo/gulpfile.js), [Grunt](https://github.com/GoogleChrome/sw-precache/blob/master/demo/Gruntfile.js), o [línea de comandos](https://github.com/GoogleChrome/sw-precache#command-line-interface). |
| Mantente actualizado | Los cambios hechos en tu versión actualizan la secuencia de comandos del service worker. El usuario obtiene actualizaciones, pero no es necesario que hagas versiones de tu contenido o tus memorias caché manualmente. |
| Sin red, sin problemas | Tus recursos estáticos se envían [primero en caché](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network), de manera rápida, ya sea que haya una red disponible o no. |

## Caja de herramientas de Service Worker

La [caja de herramientas de Service Worker](https://github.com/GoogleChrome/sw-toolbox/) (`sw-toolbox`) proporciona
algunos asistentes simples que puedes usar para crear tus propios service worker. Específicamente,
proporciona patrones de almacenamiento en caché comunes y un
[enfoque expresivo](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-api#expressive-approach)
para usar esas estrategias para solicitudes de tiempo de ejecución. 

[Obtén sw-toolbox](https://github.com/GoogleChrome/sw-toolbox/){: .button .button-primary }

### Funciones

| Función | Resumen |
|---------|---------|
| Almacenamiento en caché de tiempo de ejecución | Almacena en caché recursos de gran tamaño o que no se usan frecuentemente, como imágenes, en tiempo de ejecución, cuando se usan por primera vez. |
| Alternativas sin conexión | Carga imágenes actualizadas, respuestas API o también otros contenidos dinámicos desde tu red cuando hay conexión, pero usa un marcador almacenado en caché cuando no hay conexión. |
| Adiós a Lie-Fi | Combate [lie-fi](https://www.youtube.com/watch?v=oRcxExzWlc0) utilizando automáticamente una respuesta almacenada en caché cuando la velocidad de la red sea demasiado lenta. |
| Combate el aumento de almacenamiento en caché | Esa imagen del mes pasado no debe estar almacenada en caché por siempre. La expiración de contenido en caché por uso menos reciente y antigüedad ayuda a liberar espacio.

## Google Analytics sin conexión

[Google Analytics sin conexión](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics) 
mantiene temporariamente y reintenta solicitudes de analítica para evitar que se pierdan en caso de desconexión
de la red. Esta herramienta se instala fácilmente en tu sistema de compilación por medio de nmp, y 
se importa fácilmente en tu secuencia de comandos del service worker. Configúrala por medio de una
llamada de función parametrizada.

[Obtén sw-offline-google-analytics](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics){: .button .button-primary }

### Funciones

| Función | Resumen |
|---------|---------|
| Google Analytics sin conexión | Crea controladores de extracción que aseguran que JavaScript de Google Analytics estará disponible sin conexión. |
| Almacena datos en caché temporariamente | Mantiene las solicitudes de analítica hechas cuando el dispositivo está sin conexión y las reintenta la siguiente vez que se inicia el service worker. |
| Valores de reproducción personalizados | Pares clave-valor que se deben agregar a las solicitudes de Google Analytics reproducidas otra vez. Por ejemplo, puedes configurar una dimensión personalizada para indicar que se volvió a reproducir una solicitud. |
| Parámetros de coincidencia personalizados| Te permite modificar programáticamente los parámetros de una coincidencia, por ejemplo, controlar el tiempo transcurrido entre el momento en que se intenta una coincidencia hasta que se vuelve a reproducir. |

## Más información

### Artículos

[Primeros pasos con sw-toolbox](http://deanhume.com/home/blogpost/getting-started-with-the-service-worker-toolbox/10134) por Dean Hume

[Cómo agregar soporte sin conexión para crear create-react-app por medio de sw-precache](https://medium.com/dev-channel/create-react-pwa-7b69425ffa86#.nqsrshawm) por Jeffrey Posnick

El caso de estudio de [service worker en producción](/web/showcase/case-study/service-workers-iowa)
observa más de cerca cómo se usan las bibliotecas `sw-precache` y `sw-toolbox` 
en conjunto para impulsar la
[app web de Google I/O 2015](https://events.google.com/io2015/).

### Laboratorios de código

[Cómo agregar un service worker con sw-precache](https://codelabs.developers.google.com/codelabs/sw-precache/index.html#0)

### Videos

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="jCKZDTtUA2A"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

La presentación realizada por Jeff Posnick en la Cumbre de desarrolladores de Chrome 2015,
_Carga instantánea con procesos de trabajo de servicio_, describe cómo usar efectivamente
`sw-precache` junto con `sw-toolbox` para crear apps web que se carguen rápidamente y
funcionen sin conexión.

[Diapositivas](https://speakerdeck.com/jeffposnick/instant-loading-with-service-workers-chrome-dev-summit-15)

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="IIRj8DftkqE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Matt Gaunt y Addy Osmani explican cómo nuestras bibliotecas de service worker pueden ayudar a que
tus apps web funcionen sin conexión rápidamente. Este video describe 
`sw-precache` y `sw-toolbox`.

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="gfHXekzD7p0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

En el episodio de Totally Tooling Mini-Tips, Matt y Addy describen
`sw-toolbox`.

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Use459WBeWc"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Desde Google I/O 2016, Mat Scales describe grandes bibliotecas y herramientas para hacer que las apps web
progresivas se carguen rápido, funcionen bien sin conexión y mejoren progresivamente,
todo para lograr una mejor experiencia del usuario.


{# wf_devsite_translation #}
