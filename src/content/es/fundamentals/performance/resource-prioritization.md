project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2019-05-25 #}
{# wf_published_on: 2017-11-01 #}
{# wf_blink_components: Blink>Network,Blink>Loader #}

<!--
  Aspect ratio CSS, Copyright 2017 Google Inc
  Maintains aspect ratio in blocks that use the class, so that content doesn't
  move around as media loads.

  Adapted from https://github.com/sgomes/css-aspect-ratio
-->
<style>
.aspect-ratio {
  /* aspect-ratio custom properties */
  /* The width portion of the aspect ratio, e.g. 16 in 16:9. */
  --aspect-ratio-w: 1;
  /* The height portion of the aspect ratio, e.g. 9 in 16:9. */
  --aspect-ratio-h: 1;

  position: relative;
  max-width: 100%;
  margin-bottom: 1ex;
}

.aspect-ratio > *:first-child {
  width: 100%;
}

@supports (--custom-props: "true") {
  .aspect-ratio::before {
    display: block;
    padding-top: calc(var(--aspect-ratio-h, 1) /
        var(--aspect-ratio-w, 1) * 100%);
    content: "";
  }

  .aspect-ratio > *:first-child {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
</style>

# Prioridades de recursos: cómo hacer que el navegador te ayude {: .page-title }

{% include "web/_shared/contributors/sgomes.html" %}

No todos los bytes enviados al navegador tienen el mismo nivel de
importancia, y el navegador lo sabe. Los navegadores tienen heurísticas que intentan
determinar lo mejor posible cuáles son los recursos más importantes que se deben cargar primero, como
CSS antes que scripts e imágenes.

No obstante, como con cualquier heurística, esto no siempre funciona de forma correcta: el navegador
puede tomar la decisión incorrecta, generalmente porque no cuenta con información suficiente
en ese momento. En este artículo, se explica cómo influenciar la prioridad del contenido
correctamente en los navegadores modernos haciéndoles saber qué es lo que se necesitará más adelante.

## Prioridades predeterminadas en el navegador

Como ya se mencionó, el navegador asigna diferentes prioridades relativas
a los distintos tipos de recursos en función de cuán críticos sean estos recursos. Así, por
ejemplo, una etiqueta `<script>` del `<head>` de la página se cargaría en Chrome con una prioridad
**alta** (debajo de CSS, que tiene la prioridad**más alta**), pero esa prioridad cambiaría a
**baja** si tuviera el atributo "async" (que significa que se la puede cargar y ejecutar
asincrónicamente).

Las prioridades son importantes cuando investigas el rendimiento de carga de tu sitio.
Más allá de las técnicas usuales de
[medición](/web/fundamentals/performance/critical-rendering-path/measure-crp)
y
[análisis de la ruta de acceso de representación crítica](/web/fundamentals/performance/critical-rendering-path/analyzing-crp),
es útil saber cuál es la prioridad que asigna Chrome a cada recurso. Puedes encontrar esa información en el panel
Network de Chrome Developer Tools. El panel se ve así:


<figure>
  <div class="aspect-ratio"
       style="width: 1810px; --aspect-ratio-w: 1810; --aspect-ratio-h: 564">
    <img src="images/res-prio-priorities.png"
    alt="Ejemplo de cómo se muestran las prioridades en Chrome Developer Tools">
  </div>
  <figcaption><b>Figura 1</b>: Prioridades en Chrome Developer Tools. Tal vez tengas que
  habilitar la columna Priority. En ese caso, haz clic con el botón secundario en los encabezados de las columnas.
  </figcaption>
</figure>


Estas prioridades te dan una idea de la importancia relativa
que el navegador asigna a cada recurso. Recuerda que es suficiente una diferencia sutil
para que el navegador asigne una propiedad distinta; por ejemplo, una imagen
que es parte de la representación inicial tiene una prioridad más alta que una que
comienza fuera de la pantalla. Si tienes curiosidad acerca de las prioridades,
[este artículo de Addy Osmani](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf){: .external}
analiza en mucho más detalle el estado actual de las prioridades en Chrome.

Entonces, ¿qué puedes hacer si encuentras algún recurso marcado con una prioridad
distinta de la que deseas?

En este artículo, se analizan tres soluciones declarativas distintas, que son
tipos de `<link>` relativamente nuevos. Si los recursos son cruciales para la
experiencia del usuario y se están cargando con una prioridad demasiado baja, soluciona
eso de una de dos maneras: precargando o preconectando. Por otro lado, si deseas que el navegador
obtenga algunos recursos solo después de haber hecho todo lo
demás, prueba con la captura previa.

Analicemos estas tres opciones.

## Precargar

`<link rel="preload">` informa al navegador que un recurso es necesario como
parte de la navegación actual y que se lo debe comenzar a obtener
lo antes posible. Se usa así:

    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">

La mayor parte de esto probablemente es lo que esperarías, excepto tal vez el atributo
"as". Esto te permite indicar al navegador cuál es el tipo de recurso que estás
cargando, para que lo maneje correctamente. El navegador no usa
el recurso precargado a menos que esté configurado el tipo correcto. El recurso se
carga con la misma prioridad que tendría en otras situaciones, pero ahora el navegador
lo sabe de antemano, lo que permite que la descarga comience antes.

Ten en cuenta que `<link rel="preload">` es una instrucción obligatoria para el navegador;
a diferencia de las demás sugerencias de recursos de las que hablaremos. En este caso, es algo que el
navegador debe hacer y no una sugerencia meramente opcional. Esto hace que sea muy
importante hacer pruebas cuidadosas, de modo que te asegures de no causar accidentalmente
que se obtenga un recursos dos veces ni de obtener un elemento que no se necesite.

Los recursos que se obtienen con `<link rel="preload">`, pero que no se usan en la
página actual en un lapso de 3 segundos, generan una advertencia en la consola de Chrome
Developer Tools, así que asegúrate de estar atento a esto.

<figure>
  <div class="aspect-ratio"
       style="width: 1050px; --aspect-ratio-w: 1050; --aspect-ratio-h: 244">
    <img src="images/res-prio-timeout.png"
    alt="Ejemplo de un error de tiempo de espera de precarga en Chrome Developer Tools">
  </div>
</figure>

### Caso de uso: Fuentes

Las fuentes son un excelente ejemplo de recursos de detección tardía que se deben obtener.
Con frecuencia, se encuentran al final de uno de varios archivos CSS que cargan una página.

A fin de reducir la cantidad de tiempo que el usuario debe esperar el contenido de texto
de tu sitio, así como para evitar cambios molestos entre las fuentes del sistema y las
que configuraste para el sitio, puedes usar `<link rel="preload">` en tu código HTML con el objetivo de informar de inmediato al
navegador que se necesita una fuente.

    <link rel="preload" as="font" crossorigin type="font/woff2" href="myfont.woff2">

Ten en cuenta que el uso de `crossorigin` aquí es importante. Sin este atributo,
el navegador ignora la fuente precargada y se realiza una nueva operación
fetch. Esto es porque se espera que el navegador obtenga las
fuentes anónimamente y la solicitud de precarga se hace anónima solo mediante el
atributo `crossorigin`.

Warning: Si usas una CDN, como Google Fonts, asegúrate de que los archivos de fuentes
que precargues coincidan con los de CSS, lo que puede ser complicado debido a los rangos de
pesos y variantes de fuentes de Unicode. También es posible que las fuentes se actualicen periódicamente, y
si precargas una versión antigua de CSS en lugar de una más reciente, podrías
terminar descargando dos versiones de la misma fuente y malgastar el ancho de banda de tus
usuarios. Considera usar `<link rel="preconnect">` en lugar de un mantenimiento más
sencillo.

### Caso de uso: Ruta crítica de CSS y JavaScript

Cuando se habla del rendimiento de una página, es útil el concepto de "ruta crítica".
Este tipo de ruta hace referencia a los recursos que se deben cargar antes de la
representación inicial. Estos recursos, como CSS, son esenciales para obtener los primeros
píxeles en la pantalla del usuario.

Antes, la recomendación era insertar este contenido en tu código HTML.
Sin embargo, en una situación de varias páginas representadas del lado del servidor, esto se convierte rápidamente en
muchos bytes innecesarios. También dificulta el control de versiones, ya que cualquier cambio en el
código crítico invalida cualquier página en la que está insertado.

`<link rel="preload">` te permite conservar los beneficios del
control de versiones de archivos individuales y el almacenamiento en caché, a la vez que te brinda un mecanismo para solicitar
el recurso lo antes posible.

    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">

Sin embargo, la precarga presenta una desventaja: hay un recorrido completo adicional.
Este recorrido se debe a que el navegador primero debe obtener el
código HTML y recién después se descubre cuáles son los siguientes recursos.

Una forma de evitar el recorrido adicional es usar un
push de [HTTP/2](/web/fundamentals/performance/http2/#server_push)
, donde se adjuntan de manera preventiva los recursos críticos a la misma
conexión que usas para enviar el código HTML. Esto garantiza que
no haya tiempo de inactividad entre que el navegador del usuario recupera el código y el comienzo de
la descarga de los recursos críticos. No obstante, debes tener cuidado al usar un push de HTTP/2,
ya que es una manera muy forzada de controlar el uso del ancho de banda del usuario ("server
knows best") y deja al navegador muy poco espacio para tomar sus propias
decisiones, como no recuperar un archivo que ya tiene en la caché.

## Preconexión

`<link rel="preconnect">` informa al navegador que tu página desea
establecer una conexión con otro origen y que deseas que el proceso
comience lo antes posible.

Con frecuenta, el establecimiento de conexiones requiere un tiempo importante en redes lentas,
en particular cuando se trata de conexiones seguras, ya que puede incluir consultas de DNS,
redirecciones y varios viajes de ida y vuelta al servidor final que maneja
la solicitud del usuario. Si te encargas de todo esto de antemano, al
usuario le parecerá que la aplicación es mucho más rápida sin afectar el uso del ancho de banda
de manera negativa. La mayor parte del tiempo dedicado al establecimiento de la conexión se pasa esperando,
no intercambiando datos.

Informar al navegador tu intención es tan simple como agregar un vínculo o una etiqueta a
tu página:

    <link rel="preconnect" href="https://example.com">

En este caso, informamos al navegador que deseamos establecer una conexión con
`example.com` y recuperar contenido desde allí.

Ten en cuenta que si bien `<link rel="preconnect">` es bastante económico, igual puede
consumir tiempo de CPU valioso, especialmente en conexiones seguras. Este es
un gran punto en contra si la conexión no se usa dentro de los 10 segundos, ya que el navegador
la cierra y se pierde todo ese trabajo de conexión anticipada.

En general, intenta usar `<link rel="preload">` siempre que sea posible, ya que es un ajuste del
rendimiento mucho más integral, pero mantén `<link rel="preconnect">` a
mano para los casos límite. Analicemos un par de estos casos.

Note: En realidad, hay otro tipo de `<link>` relacionado con las conexiones:
`<link rel="dns-prefetch">`. Este parámetro solo se encarga de las consultas de DNS, de manera que es un
subconjunto pequeño de `<link rel="preconnect">`, pero tiene compatibilidad más amplia en los navegadores, por lo que
puede ser una reserva útil.
Se usa de la misma manera:
`<link rel="dns-prefetch" href="https://example.com">`

### Caso de uso: Saber *de dónde* se obtienen los recursos, pero no *cuáles* son

Debido a dependencias con control de versiones, a veces te encuentras en una situación donde
sabes que recuperarás un recurso de una CDN dada, pero no conoces la ruta de acceso
exacta del elemento. En otros casos, se puede recuperar uno de varios recursos,
en función de consultas de medios o comprobaciones de funciones de tiempo de ejecución en el navegador del usuario.

En estas situaciones, y si el recurso que obtendrás es importante, tal
vez te convenga ahorrar tanto tiempo como sea posible mediante un proceso de preconexión al servidor. El
navegador no comienza a obtener el archivo antes de necesitarlo (es decir, recién cuando
la página hace la solicitud correspondiente), pero al menos procesa los
aspectos relacionados con la conexión de forma anticipada, lo que le evita al usuario tener que esperar a que se realicen varios
recorridos completos.

### Caso de uso: Transmisión de medios

Otro caso en el que tal vez te convenga ahorrar algo de tiempo en la fase de conexión,
pero no necesariamente comenzar a recuperar contenido de inmediato, es en la transmisión de medios
desde un origen distinto.

En función de cómo maneje tu página el contenido transmitido, tal vez sea mejor esperar
hasta que las secuencias de comandos se hayan cargado y estén listas para procesar la transmisión. La preconexión
te permite reducir el tiempo de espera a la duración de un único recorrido completo una vez que esté todo listo
para comenzar la captura.

## Captura previa

`<link rel="prefetch">` se diferencia de `<link rel="preload">` y de
`<link rel="preconnect">` en que no intenta hacer que algo crítico
suceda más rápido, sino que intenta hacer que algo no crítico suceda antes,
si se da la oportunidad.

Para ello, informa al navegador que se espera que un recurso sea
necesario como parte de una navegación o una interacción del usuario futura, por ejemplo,
algo que *podría* necesitarse más tarde, si el usuario realiza la acción que se
espera. Estos recursos se obtienen con la prioridad **más baja** en Chrome;
es decir, cuando la página actual ya se cargó y hay ancho de banda disponible.

Esto significa que `prefetch` es más adecuado para prever lo que el usuario podría
hacer a continuación y prepararse para ello, como mostrar la página de detalles
del primer producto de una lista de resultados o mostrar la siguiente página de contenido paginado.

    <link rel="prefetch" href="page-2.html">

Recuerda que la captura previa no funciona de manera recursiva. En el ejemplo
anterior, solo recuperarías el código HTML; los recursos que necesita `page-2.html`
no se descargarían antes de que se los solicite a menos que también hagas la captura
previa.

### La captura previa no funciona como una anulación

Es importante tener en cuenta que no puedes usar `<link rel="prefetch">` como una manera de
bajar la prioridad de un recurso existente. En el siguiente código HTML, podrías
creer que declarar `optional.css` en una captura previa reduciría su prioridad para
la `<link rel="stylesheet">` subsiguiente:

    <html>
      <head>
        <link rel="prefetch" href="optional.css">
        <link rel="stylesheet" href="optional.css">
      </head>
      <body>
        ¡Hola,
      </body>
    </html>

Sin embargo, esto en realidad haría que la hoja de estilos se capturara dos veces (aunque
con un acierto de caché potencial para la segunda), una vez con la prioridad predeterminada **más alta**
y otra con la **más baja**, ya que la captura previa inicia una captura
independiente:

<figure>
  <div class="aspect-ratio"
       style="width: 1374px; --aspect-ratio-w: 1374; --aspect-ratio-h: 190">
    <img src="images/res-prio-prefetch.png"
         alt="Captura de pantalla de Chrome Developer Tools donde se ve cómo optional.css se
              obtiene dos veces">
  </div>
</figure>

La captura doble puede ser un aspecto negativo para los usuarios. En este caso, no solo debería
esperar la carga de CSS que bloquea la representación, sino que además potencialmente
se haría un uso innecesario del ancho de banda al descargar el archivo dos veces. Recuerda que el
ancho de banda de los usuarios puede ser medido. Asegúrate de analizar tus solicitudes de red
en detalle y presta atención para que no haya ninguna captura doble.

## Otras técnicas y herramientas

`<link rel="preload">`, `<link rel="preconnect">` y `<link rel="prefetch">`
(así como `<link rel="dns-prefetch">`) ofrecen una
excelente manera de informar declarativamente al navegador acerca de recursos y
conexiones de antemano, y ajustarlos en función de la situación y cuándo
se los necesita.

Hay una serie de herramientas y técnicas adicionales que puedes usar para ajustar la prioridad
y el momento en el que se cargan los recursos. Asegúrate de leer sobre
[Servidor push HTTP/2](/web/fundamentals/performance/http2/#server_push);
[Uso de `IntersectionObserver` para la carga lenta de imágenes y otros medios](/web/updates/2016/04/intersectionobserver);
[Cómo evitar CSS que bloquea la representación](/web/fundamentals/performance/critical-rendering-path/render-blocking-css)
con consultas de medios y bibliotecas como
[loadCSS](https://github.com/filamentgroup/loadCSS){: .external}
y cómo retrasar capturas, compilaciones y ejecuciones de JavaScript con
[async](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async){: .external}
y
[defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer){: .external}.

## Comentarios {: #feedback }

{% include "web/_shared/helpful.html" %}
