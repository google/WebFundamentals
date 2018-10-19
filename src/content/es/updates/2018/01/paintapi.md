project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Houdini’s CSS Paint API allows you to programmatically draw CSS images.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-05-21 #}
{# wf_published_on: 2018-01-18 #}
{# wf_tags: css,style,houdini,javascript,chrome65 #}
{# wf_featured_image: /web/updates/images/2018/01/paintapi/houdinidiamond.png #}
{# wf_featured_snippet: Houdini’s CSS Paint API allows you to programmatically draw CSS images. #}
{# wf_blink_components: Blink>CSS #}


# CSS Paint API {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

## Las nuevas posibilidades en Chrome 65 CSS Paint API (también conocido como “CSS Custom Paint” o “worklet de pintura de Houdini”) están a punto de habilitarse de forma predeterminada en Chrome Stable. ¿Qué es? ¿Qué puedes hacer con eso? Y, ¿cómo funciona? Bueno, sigue leyendo, ¿quieres?


CSS Paint API le permite generar una imagen mediante programación cada vez que una propiedad CSS espera una imagen. Las propiedades como `background-image` o `border-image` generalmente se usan con `url()` para cargar un archivo de imagen o con funciones incorporadas de CSS como `linear-gradient()` . En lugar de usarlos, ahora puede usar `paint(myPainter)` para hacer referencia a un _paint worklet_.

### Escribiendo un worklet de pintura

Para definir un worklet de pintura llamado `myPainter` , necesitamos cargar un archivo de worklet de pintura CSS utilizando `CSS.paintWorklet.addModule('my-paint-worklet.js')` . En ese archivo podemos usar la función `registerPaint` para registrar una clase de worklet de pintura:

    class MyPainter {
      paint(ctx, geometry, properties) {
        // ...
      }
    }

    registerPaint('myPainter', MyPainter);

Dentro de la devolución de llamada `paint()` , podemos usar `ctx` de la misma forma que lo haríamos con un `CanvasRenderingContext2D` tal como lo conocemos de `<canvas>` . Si sabes dibujar en un `<canvas>` , ¡puedes dibujar en un worklet de pintura! `geometry` nos dice el ancho y la altura del lienzo que está a nuestra disposición. `properties` Lo explicaré más adelante en este artículo.

Note: El contexto de un worklet de pintura no es 100% lo mismo que el contexto `<canvas>` . A partir de ahora, faltan métodos de representación de texto y, por razones de seguridad, no puede leer los píxeles del lienzo.

Como ejemplo introductorio, escribamos un cuadro de trabajo de pintura de tablero de ajedrez y lo usamos como imagen de fondo de un `<textarea>` . (Estoy usando un área de texto porque se puede cambiar de tamaño por defecto):

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      paint(ctx, geom, properties) {
        // Use `ctx` as if it was a normal canvas
        const colors = ['red', 'green', 'blue'];
        const size = 32;
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            const color = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.rect(x * size, y * size, size, size);
            ctx.fill();
          }
        }
      }
    }

    // Register our class under a specific name
    registerPaint('checkerboard', CheckerboardPainter);

Si ha usado `<canvas>` en el pasado, este código debería parecerle familiar. Vea el [demo] en vivo (0) aquí.

Note: Como con casi todas las API nuevas, la CSS Paint API solo está disponible a través de HTTPS (o `localhost` ).

<img src="/web/updates/images/2018/01/paintapi/checkerboard1.png" alt="Textarea con un patrón de tablero de ajedrez como imagen de fondo.">

La diferencia de usar una imagen de fondo común aquí es que el patrón se volverá a dibujar a pedido, siempre que el usuario cambie el tamaño del área de texto. Esto significa que la imagen de fondo es siempre tan grande como debe ser, incluida la compensación para pantallas de alta densidad.

Eso es bastante bueno, pero también es bastante estático. ¿Querríamos escribir un nuevo worklet cada vez que quisiéramos el mismo patrón pero con cuadrados de diferente tamaño? ¡La respuesta es no!

### Parametrizando tu worklet

Afortunadamente, el worklet de pintura puede acceder a otras propiedades CSS, que es donde el parámetro adicional `properties` entra en juego. Al darle a la clase un atributo `inputProperties` estático, puede suscribirse a los cambios en cualquier propiedad de CSS, incluidas las propiedades personalizadas. Los valores se le entregarán a través del parámetro `properties` .

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        /* The paint worklet subscribes to changes of these custom properties. */
        --checkerboard-spacing: 10;
        --checkerboard-size: 32;
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      // inputProperties returns a list of CSS properties that this paint function gets access to
      static get inputProperties() { return ['--checkerboard-spacing', '--checkerboard-size']; }

      paint(ctx, geom, properties) {
        // Paint worklet uses CSS Typed OM to model the input values.
        // As of now, they are mostly wrappers around strings,
        // but will be augmented to hold more accessible data over time.
        const size = parseInt(properties.get('--checkerboard-size').toString());
        const spacing = parseInt(properties.get('--checkerboard-spacing').toString());
        const colors = ['red', 'green', 'blue'];
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            ctx.fillStyle = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.rect(x*(size + spacing), y*(size + spacing), size, size);
            ctx.fill();
          }
        }
      }
    }

    registerPaint('checkerboard', CheckerboardPainter);

Ahora podemos usar el mismo código para todos los diferentes tipos de tableros de ajedrez. Pero aún mejor, ahora podemos ir a DevTools y [jugar con los valores](https://googlechromelabs.github.io/houdini-samples/paint-worklet/parameter-checkerboard/) hasta que encontremos el aspecto correcto.

<div style="display: flex; justify-content: center">  <video loop muted controls>
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_vp8.webm"
      type="video/webm; codecs=vp8">
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_x264.mp4"
      type="video/mp4; codecs=h264">
  </video>
</div>

Note: También sería bueno parametrizar los colores, ¿no es así? La especificación permite que la función `paint()` tome una lista de argumentos. Esta función aún no está implementada en Chrome, ya que se basa en gran medida en la API de propiedades y valores de Houdini, que todavía necesita algo de trabajo antes de poder enviarse.

## Exploradores que no son compatibles con Paint Worklet Al momento de escribir, solo Chrome tiene implementado Paint Worklet. Si bien hay señales positivas de todos los demás proveedores de navegadores, no hay mucho progreso. Para mantenerse al día, marque [¿Ya está listo Houdini?](https://ishoudinireadyyet.com) regularmente. Mientras tanto, asegúrese de usar la mejora progresiva para mantener su código en funcionamiento incluso si no hay soporte para el cuadro de trabajo de pintura. Para asegurarse de que las cosas funcionen como se espera, debe ajustar su código en dos lugares: el CSS y el JS.

La detección del soporte para el worklet de pintura en JS se puede hacer al verificar el objeto `CSS` :

    if ('paintWorklet' in CSS) {
      CSS.paintWorklet.addModule('mystuff.js');
    }

Para el lado de CSS, tienes dos opciones. Puedes usar `@supports` :

    @supports (background: paint(id)) {
      /* ... */
    }

Un truco más compacto es usar el hecho de que CSS invalida y subsecuentemente ignora una declaración de propiedad completa si hay una función desconocida en ella. Si especifica una propiedad dos veces, primero sin el worklet de pintura, y luego con el worklet de pintura, obtendrá una mejora progresiva:

    textarea {
      background-image: linear-gradient(0, red, blue);
      background-image: paint(myGradient, red, blue);
    }

En los navegadores _con_ soporte para paint worklet, la segunda declaración de `background-image` sobrescribirá la primera. En los navegadores _sin soporte_ para el worklet de pintura, la segunda declaración no es válida y se descartará, dejando la primera declaración en vigor.

### CSS Paint Polyfill

Para muchos usos, también es posible utilizar el [Polyfill de pintura de CSS](https://github.com/GoogleChromeLabs/css-paint-polyfill), que agrega la compatibilidad con los entrenamientos personalizados de pintura de CSS a los navegadores modernos.

## Casos de uso Hay muchos casos de uso para los worklets de pintura, algunos de ellos más obvios que otros. Uno de los más obvios es el uso de paint worklet para reducir el tamaño de su DOM. A menudo, los elementos se agregan únicamente para crear adornos utilizando CSS. Por ejemplo, en [Material Design Lite](https://getmdl.io) el botón con el efecto de onda contiene 2 elementos `<span>` adicionales para implementar la onda en sí. Si tiene muchos botones, esto puede agregar un número considerable de elementos DOM y puede llevar a un rendimiento degradado en el móvil. Si [implementa el efecto de ondulación usando el worklet de pintura](https://googlechromelabs.github.io/houdini-samples/paint-worklet/ripple/) en su lugar, obtendrá 0 elementos adicionales y solo un worklet de pintura. Además, tienes algo que es mucho más fácil de personalizar y parametrizar.

Otra ventaja del uso de paint worklet es que, en la mayoría de los escenarios, una solución que usa paint worklet es pequeña en términos de bytes. Por supuesto, hay un compromiso: su código de pintura se ejecutará cada vez que cambie el tamaño del lienzo o cualquiera de los parámetros. Por lo tanto, si su código es complejo y lleva mucho tiempo, podría presentar un jank. Chrome está trabajando para mover los worklets de pintura del hilo principal, de modo que incluso los worklets de pintura de larga duración no afecten la capacidad de respuesta del hilo principal.

Para mí, la perspectiva más emocionante es que Paint Worklet permite realizar un relleno múltiple eficiente de las características CSS que un navegador aún no tiene. Un ejemplo sería polyfill [gradientes cónicos](https://lab.iamvdo.me/houdini/conic-gradient) hasta que lleguen a Chrome de forma nativa. Otro ejemplo: en una reunión de CSS se decidió que ahora puede tener varios colores de borde. Mientras esta reunión continuaba, mi colega Ian Kilpatrick [escribió un polyfill](https://twitter.com/malyw/status/934737334494429184) para este nuevo comportamiento de CSS usando paint worklet.

## Pensando fuera del "cuadro" La mayoría de las personas comienzan a pensar en imágenes de fondo y en imágenes de bordes cuando aprenden sobre el worklet de pintura. Un caso de uso menos intuitivo para el worklet de pintura es `mask-image` para hacer que los elementos DOM tengan formas arbitrarias. Por ejemplo un [diamante](https://googlechromelabs.github.io/houdini-samples/paint-worklet/diamond-shape/):

<img src="/web/updates/images/2018/01/paintapi/houdinidiamond.png" alt="Un elemento DOM en forma de diamante.">

`mask-image` toma una imagen que es del tamaño del elemento. Áreas donde la imagen de la máscara es transparente, el elemento es transparente. Áreas donde la imagen de la máscara es opaca, el elemento opaco.

## Ahora en Chrome

El worklet de pintura ha estado en Chrome Canary por un tiempo. Con Chrome 65, está habilitado por defecto. ¡Anímate y prueba las nuevas posibilidades que abre Worklet Paint y muéstranos lo que has construido! Para más inspiración, eche un vistazo a [la colección de Vincent De Oliveira](https://lab.iamvdo.me/houdini/).

Los puntos de interrupción Note: actualmente no son compatibles con la API de pintura CSS, pero se habilitarán en una versión posterior de Chrome.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}