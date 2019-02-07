project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Comienza a analizar el rendimiento de red.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-01-17 #}
{# wf_blink_components: Platform>DevTools #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
figcaption {
  text-align: center;
}
</style>

# Primeros pasos con el análisis del rendimiento de red en Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: En [Optimize Website Speed](/web/tools/chrome-devtools/speed/get-started) (Optimización de la velocidad de sitios web) puedes
encontrar un enfoque detallado para mejorar la velocidad de carga. Ese instructivo incluye el flujo de trabajo recomendado
para analizar el rendimiento de carga.

Usa este instructivo interactivo y detallado para aprender a usar el panel Network de Chrome DevTools a fin de comprender por qué una página
carga con lentitud.

## Paso 1: Configura DevTools {: #set-up }

Supongamos que recibes informes de usuarios móviles que te advierten que una página específica
de tu sitio es lenta. Tu trabajo es lograr que la página sea rápida.

1. Haz clic en **Open Slow Page**. La página se abre en una pestaña nueva.

     <a href="https://googlechrome.github.io/devtools-samples/network/gs/v1.html"
       target="devtools" class="gc-analytics-event" rel="noopener noreferrer"
       data-category="DevTools / Network / Get Started"
       data-label="Slow Page Opened">
       <button>Open Slow Page</button>
     </a>

1. Con la página en foco, presiona
   <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) o
   <kbd>Ctrl</kbd>+<kbd>Mayús</kbd>+<kbd>I</kbd> (Windows o Linux) para
   abrir DevTools en la página.

1. En DevTools, haz clic en la pestaña **Network**.

     <figure>
       <img src="imgs/get-started-network-panel.png"
         alt="Panel Network de Chrome DevTools abierto en la página
              lenta que deseas diagnosticar.">
       <figcaption>
         <b>Figura 1</b>. Panel Network de Chrome DevTools abierto junto a
         la página lenta que deseas diagnosticar.
       </figcaption>
     </figure>

     <aside class="note">
       <b>Note:</b> Para el resto de las capturas de pantalla, DevTools está <a
       href="/web/tools/chrome-devtools/ui#placement" target="_blank">
       en una ventana separada</a> para que puedas visualizar mejor
       el contenido.
     </aside>

1. Habilita **Capture Screenshots** ![Capture
   Screenshots][screenshots]{:.devtools-inline}, que se pone de color azul cuando se habilita.
   DevTools hace capturas de pantalla durante la carga de la página.

## Paso 2: Emula la experiencia de un usuario móvil {: #emulate }

Las pruebas de rendimiento de red que se hacen en una laptop o un equipo de escritorio pueden ser engañosas. Tu
conexión a Internet es mucho más rápida que la de un usuario de dispositivo móvil, y tu navegador
almacena en caché recursos de visitas anteriores.

1. Marca la casilla de verificación **Disable Cache**. Cuando esta
   casilla de verificación está habilitada, DevTools no entrega ningún recurso desde la caché.
   Esto emula mejor la experiencia inicial de los usuarios cuando
   visualizan tu página.

1. En el menú desplegable que actualmente dice **No Throttling**, selecciona
   **Regular 2G**. DevTools aplica un límite a la conexión de red para simular una
   experiencia 2G normal. Así es como los usuarios móviles experimentan tu sitio
   cuando no tienen una buena conexión.

<figure>
  <img src="imgs/get-started-setup.svg"
    alt="Panel Network de Chrome DevTools después de configurar las capturas de pantalla,
         deshabilitar la caché y aplicar un límite a la conexión de red.">
  <figcaption>
    <b>Figura 2</b>. Panel Network de Chrome DevTools configurado para emular
    la experiencia de un usuario móvil. Las capturas de pantalla, la caché
    deshabilitada y la limitación de la conexión de red están marcadas en azul, de izquierda a derecha,
    en ese orden.
  </figcaption>
</figure>

Esta configuración simula el peor de los casos. Si logras que la página
cargue con rapidez con esta configuración, será rápida para todos los usuarios.

[screenshots]: imgs/capture-screenshots.png

## Paso 3: Analiza las solicitudes {: #analyze }

Para averiguar el motivo por el que la página es lenta, recárgala y analiza
las solicitudes que llegan.

### Parte A: Busca secuencias de comandos que bloqueen la representación

Cuando el navegador encuentra una etiqueta `<script>`, debe pausar la representación y
ejecutar la secuencia de comandos de inmediato. Busca secuencias de comandos que no sean necesarias para que cargue la página
y márcalas como asíncronas o difiere su ejecución para acelerar el tiempo de carga.

1. Presiona <kbd>Command</kbd>+<kbd>R</kbd> (Mac) o
   <kbd>Ctrl</kbd>+<kbd>R</kbd> (Windows, Linux) para volver a cargar la página.
   Con una buena conexión inalámbrica, la página tarda más de 10 segundos para
   cargar por completo.

     <figure>
       <img src="imgs/get-started-post-load.png"
         alt="Panel Network de Chrome DevTools después de volver a cargar la página.">
       <figcaption>
         <b>Figura 3</b>. Panel Network de Chrome DevTools después de volver a cargar
         la página.
       </figcaption>
     </figure>

1. Toma nota del valor de [`DOMContentLoaded`][DOMContentLoaded] en el
   [panel Summary](reference#summary), en la parte inferior del panel Network.
   Deberías ver un valor de al menos 4 segundos. Si ves que este evento
   se activa tarde como en este caso, busca secuencias de comandos que estén retrasando
   la carga y el análisis del documento principal.

1. Haz clic en **main.js** para investigar la solicitud en más detalle. DevTools muestra un
   juego de pestañas nuevas que proporcionan más información acerca de esta solicitud.

1. Haz clic en la pestaña **Preview** para ver el código fuente de la solicitud. Puedes
   ver que la secuencia de comandos se detiene durante 4,000 ms.
   Al marcar esta secuencia de comandos con el atributo `async` y moverla
   al final del `<body>` del documento, la página
   puede cargarse sin tener que esperar a la secuencia de comandos.

     <figure>
       <img src="imgs/get-started-preview.png"
         alt="Visualización del código fuente de main.js en el panel Preview.">
       <figcaption>
         <b>Figura 4</b>. Visualización del código fuente de <code>main.js</code> en
         el panel Preview.
       </figcaption>
     </figure>

Consulta [Bloquear el analizador en comparación con JavaScript asincrónico][async] para obtener más información
acerca de secuencias de comandos que bloquean la representación.

### Parte B: Busca solicitudes grandes

Cuando la página se cargó, ¿notaste que el logotipo de DevTools tardó
mucho en cargar? No bloquea la carga, pero hace que la página *parezca*
lenta. A los usuarios les gusta que las páginas *parezcan* rápidas.

1. Haz clic en **Close** ![Close][close]{:.devtools-inline} para volver a ver
   el [**panel Requests**](reference#requests).

1. Haz doble clic en la captura de pantalla de la parte superior izquierda.

1. Presiona la tecla de la flecha hacia la derecha para ver todas las capturas de pantalla, una a la vez. El
   tiempo debajo de la captura de pantalla indica cuándo se generó. La
   captura de pantalla tarda varios segundos en cargar. Eso significa que probablemente
   sea un archivo demasiado grande.

1. Haz clic en cualquier lugar fuera de la captura de pantalla para minimizarla.

1. Coloca el cursor sobre la [cascada](reference#waterfall) de la
   solicitud de `logo-1024px.png`. La solicitud pasa la mayor parte de su tiempo
   descargando la imagen. Esto confirma que la imagen es demasiado grande.

     <figure>
       <img src="imgs/get-started-waterfall.png"
         alt="Cascada de logo-1024px.png.">
       <figcaption>
         <b>Figura 5</b>. Cascada de <code>logo-1024px.png</code>.
       </figcaption>
     </figure>

[DOMContentLoaded]: https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded

[async]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript#parser_blocking_versus_asynchronous_javascript

[close]: imgs/close.png

## Paso 4: Verifica las correcciones en la página actualizada. {: #verify }

Ya casi terminas. Supongamos ahora que ya hiciste dos cambios en
la página:

* Moviste la secuencia de comandos al final del `<body>` y la marcaste como `async`
  para impedir que bloquee la carga de la página.
* Convertiste el logotipo a SVG para reducir su tamaño.

Todo lo que queda por hacer es probar la página actualizada para verificar que las
correcciones realmente hagan que la página se cargue más rápido.

1. Haz clic en **Open Fast Page**. La página corregida se abre en una pestaña nueva.

     <a href="https://googlechrome.github.io/devtools-samples/network/gs/v2.html"
       target="devtools" class="gc-analytics-event" rel="noopener noreferrer"
       data-category="DevTools / Network / Get Started"
       data-label="Fast Page Opened">
       <button>Open Fast Page</button>
     </a>

1. Configura DevTools como antes. La deshabilitación de las capturas de pantalla y la caché deben
   estar activadas, y la limitación de la red debe estar configurada con el valor **Regular 2G**.
1. Vuelve a cargar la página. La página carga mucho más rápido.

     <figure>
       <img src="imgs/get-started-post-fix.png"
         alt="Registro de la carga de la página después de aplicar las correcciones.">
       <figcaption>
         <b>Figura 6</b>. Registro de la carga de la página después de aplicar las
         correcciones. La página tardaba unos 10 segundos en aparecer completa
         visualmente. Ahora solo tarda 1 segundo.
       </figcaption>
     </figure>

<aside class="note">
  <b>Nota</b>: Si bien la página carga mucho más rápido, sigue siendo inutilizable durante
  unos 5 segundos. Esto es porque sigue ejecutando la secuencia de comandos que bloquea
  el subproceso principal de la página.
</aside>

## Próximos pasos {: #next-steps }

Buen trabajo. Ya eres todo un experto en el panel Network
de Chrome DevTools. Bueno, tal vez no un experto. Pero tienes una base excelente
de habilidades y conocimiento.

* Consulta <a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / CRP"
  href="/web/fundamentals/performance/critical-rendering-path">Ruta de acceso
   de representación crítica</a> para obtener más información acerca de la teoría de carga de páginas
  ultrarrápida.
* Consulta <a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / Issues Guide" href="issues">Network
  Issues Guide</a> (Guía de problemas de red) para aprender a identificar más problemas de red.
* Consulta <a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / Reference" href="reference">Network
  Panel Reference</a> (Referencia del panel Network) si deseas ver una lista completa de las funciones del panel Network.

## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}
