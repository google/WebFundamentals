project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Cada vez más dispositivos cuentan con pantallas táctiles, desde teléfonos hasta pantallas de escritorio. Cuando los usuarios tocan la pantalla, tu app debería responder de forma intuitiva y atractiva.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-01-01 #}

# Haz que tu sitio sea táctil {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Rwc4fHUnGuU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Cada vez más dispositivos cuentan con pantallas táctiles, desde teléfonos hasta
pantallas de escritorio. Cuando los usuarios elijen interactuar con tu IU y la tocan, tu app
debería responder de forma intuitiva.

<div class="clearfix"></div>

## Responder a estados de elementos

¿Alguna vez tocaste o hiciste clic en un elemento de una página web y te preguntaste
si el sitio realmente lo detectó?

Si simplemente cambia el color de un elemento cuando el usuario lo toca o interactúa con partes
de tu IU, se brinda la tranquilidad básica de que tu sitio funciona. Esto no solo
reduce la frustración, también puede transmitir un estilo ágil y adaptable.

Los elementos del DOM pueden heredar cualquiera de los siguientes estados: default, focus, hover
y active. Para cambiar nuestra IU en cada uno de estos estados, necesitamos aplicar estilos
a las seudoclases `:hover`, `:focus` y `:active`, como se muestra a continuación:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="btnstates" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

![Imagen que muestra distintos colores para los estados de los
botones](images/button-states.png)

En la mayoría de los navegadores móviles, los estados *hover* y/o *focus* se aplicarán a un elemento
después de presionarlo.

Piensa detenidamente qué estilos usarás y cómo los verán los usuarios después de
que toquen sobre ellos.

Note: Los botones y las etiquetas de anclaje pueden tener distintos comportamientos
en diferentes navegadores. Por lo tanto, ten en cuenta que **hover**
permanecerá en algunos casos y **focus**, en otros.

### Suprimir estilos predeterminados de navegadores

Después de agregar estilos para los diferentes estados, notarás que la mayoría de los navegadores
implementan su propio estilo cuando responden a la interacción del usuario. Esto se debe principalmente
a que cuando se lanzaron los primeros dispositivos móviles, muchos sitios no
tenían estilos para el estado `:active`. Por lo tanto, muchos navegadores agregaron
color o estilo adicional de resaltado para mostrar una respuesta al usuario.

La mayoría de los navegadores usan la propiedad `outline` de CSS para mostrar un anillo al rededor de un
elemento cuando este elemento tiene el foco. Puedes suprimirlo de la siguiente manera:

    .btn:focus {
      outline: 0;

      // Add replacement focus styling here (i.e. border)
    }

Safari y Chrome agregan un color de resalte cuando se presiona un elemento. Puede evitarse con la propiedad
`-webkit-tap-highlight-color` de CSS:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="webkit-specific" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

Internet Explorer tiene un comportamiento similar en Windows Phone, pero se suprime
por medio de una metaetiqueta:

    <meta name="msapplication-tap-highlight" content="no">

Firefox tiene dos efectos secundarios que se deben controlar.

La seudoclase `-moz-focus-inner`, que agrega un contorno a
los elementos táctiles, y que puede quitarse con la configuración `border: 0`.

Si usas un elemento `<button>` en Firefox, se le aplica un
degradado, que puede quitarse con la configuración `background-image: none`.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="ff-specific" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

Warning: ¡Solo debes suprimir los estilos predeterminados que se mencionan anteriormente si cuentas con
seudoclases para `:hover`, `:active` y `:focus`!

### Deshabilitar user-select

Cuando creas tu IU, es posible que desees permitirles a los usuarios
interactuar con tus elementos, pero necesites suprimir el comportamiento predeterminado
de seleccionar texto al mantener presionado o al desplazar un mouse por tu IU.

Puedes hacerlo con la propiedad `user-select` de CSS, pero ten en cuenta
que si lo haces en contenido, puede ser **extremadamente** exasperante
para los usuarios que *quieran* seleccionar el texto del elemento.
Por lo tanto, asegúrate de usarlo con precaución y moderación.

    user-select: none;

## Implementar gestos personalizados

Si tienes una idea para implementar interacciones y gestos personalizados en tu sitio, existen
dos temas a tener en cuenta:

1. Cómo admitir todos los navegadores.
1. Cómo mantener un índice de fotogramas alto.

En este artículo, trataremos precisamente estos temas, veremos las API que necesitamos
admitir para todos los navegadores y también cómo usar estos eventos
de manera eficiente.

Según lo que desees que haga tu gesto, probablemente quieras
que los usuarios interactúen con un elemento a la vez *o* quieras que puedan
interactuar con varios elementos al mismo tiempo.

Warning: No te olvides de que algunos usuarios querrán entrada de teclado, y los usuarios
que utilicen tecnología de asistencia en dispositivos con pantallas táctiles tal vez no puedan
hacer los gestos porque los intercepta / consume la tecnología de
asistencia.

Veremos dos ejemplos en este artículo, los cuales demuestran la
compatibilidad para todos los navegadores y cómo mantener el índice de fotogramas alto.

![GIF de ejemplo de entrada táctil en un documento](images/touch-document-level.gif){: .attempt-right }

El primer ejemplo permitirá al usuario interactuar con un elemento. En este
caso, tal vez quieras que se le otorguen todos los eventos táctiles a ese elemento, siempre que
el gesto tenga origen en el mismo elemento. Por ejemplo, mover un
dedo fuera del elemento deslizable aún puede controlar el elemento.

Esto resulta útil ya que le proporciona mucha flexibilidad al usuario, pero
impone una restricción sobre la forma en la que el usuario puede interactuar con tu IU.

<div class="clearfix"></div>

![GIF de ejemplo de entrada táctil en un elemento](images/touch-element-level.gif){: .attempt-right }

Sin embargo, si esperas que los usuarios interactúen con varios elementos a la
vez (con función multitáctil), deberías limitar la función táctil al elemento
específico.

Esto brinda mayor flexibilidad a los usuarios, pero complica la lógica para manipular
la IU y es menos resistente a los errores de los usuarios.

<div class="clearfix"></div>

### Agregar receptores de eventos

En Chrome (a partir de la versión 55), Internet Explorer y Edge,
se recomienda usar `PointerEvents` como método para implementar gestos personalizados.

En otros navegadores, lo correcto es utilizar `TouchEvents` y `MouseEvents`.

La mayor función de `PointerEvents` es que combina varios tipos de entrada,
incluidos los eventos de mouse, lápiz o táctiles, en un grupo de
callbacks. Los eventos que se deben recibir son `pointerdown`, `pointermove`,
`pointerup` y `pointercancel`.

Los equivalentes para otros navegadores son `touchstart`, `touchmove`,
`touchend` y `touchcancel` para eventos táctiles; y si quisieras implementar
los mismos gestos para la entrada de mouse, necesitarías implementar `mousedown`,
`mousemove` y `mouseup`.

Si tienes preguntas sobre qué eventos debes usar, mira esta tabla de
[eventos táctiles, de mouse y puntero](#touch-mouse-and-pointer-events).

Para usar estos eventos, se requiere llamar al método `addEventListener()` en un elemento de
DOM, con el nombre de un evento, una función callback y un booleano.
El booleano determina si deberías detectar el evento antes o después
de que otros elementos hayan tenido la oportunidad de detectar e interpretar los
eventos. (`true` significa que quieres al evento antes que otros elementos).

El siguiente es un ejemplo de recepción para el comienzo de una interacción.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="addlisteners" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

Note: Debido al diseño de la API, PointerEvents solo necesita un único evento
`pointerdown` para controlar los eventos de mouse y táctiles.

#### Controlar la interacción para un único elemento

En el breve fragmento de código que se muestra anteriormente, solo se añadió el receptor de eventos de inicio
para eventos de mouse. La razón de esto es que los eventos de mouse solo se desencadenarán
cuando el cursor se desplace *sobre* el elemento al que se agrega el receptor de eventos.

TouchEvents realizará el seguimiento de un gesto tras su comienzo independientemente del lugar donde ocurrió
la respuesta táctil y PointerEvents realizará el seguimiento de eventos independientemente del lugar donde ocurrió
la respuesta táctil. Llamamos a `setPointerCapture` en un elemento DOM.

Para los eventos de finalización y movimientos de mouse, se agregan los receptores de eventos *en* el
método de inicio para el gesto y se agregan los receptores al documento, lo que significa que puedes
seguir el cursor hasta que el gesto se complete.

Estos son los pasos para implementarlo:

1. Agrega todos los receptores de TouchEvent y PointerEvent. Para MouseEvents, agrega **únicamente**
   el evento de inicio.
1. En el callback del gesto de inicio, enlaza los eventos de movimiento y finalización al
   documento. De esta forma, se recibirán todos los eventos del mouse, tanto si
   el evento ocurrió en el elemento original o no. Para PointerEvents, debemos
   llamar a `setPointerCapture()` en el elemento original para recibir
   el resto de los eventos. A continuación, se debe gestionar el inicio del gesto.
1. Gestiona los eventos de movimiento.
1. En el evento de finalización, quita del documento los receptores de movimiento y finalización del mouse,
y   finaliza el gesto.

A continuación, encontrarás un fragmento de nuestro método `handleGestureStart()`, que agrega los eventos de movimiento y
finalización al documento:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

El callback de finalización que agregamos es `handleGestureEnd()`, que quita los receptores de movimiento y
finalización del documento, y libera la captura del puntero
cuando finaliza el gesto:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-end-gesture" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

<div class="attempt-left">
  <p>Utilizando este patrón para agregar el evento de movimiento al documento, si el
  usuario comienza a interactuar con un elemento y traslada el gesto fuera del
  elemento, seguiremos recibiendo movimientos del mouse en cualquier lugar
  de la página porque los eventos se reciben del documento.</p>

  <p>En este diagrama, se muestra el comportamiento de los eventos táctiles si agregamos los
  eventos de movimiento y finalización al documento cuando comienza un gesto.</p>
</div>

![Ejemplo de enlace de eventos táctiles al documento en
`touchstart`](images/scroll-bottleneck.gif)

<div class="clearfix"></div>

### Responder a las acciones táctiles con eficiencia

Ahora que ya solucionamos los eventos de inicio y finalización, estamos en condiciones
de responder a los eventos táctiles.

En cualquier evento de inicio y movimiento, puedes extraer fácilmente `x` e `y`
de un evento.

En el siguiente ejemplo, para verificar si el evento es de un `TouchEvent`, se
verifica si existe `targetTouches`. Si es así, se extrae
`clientX` y `clientY` de la primera acción táctil.
Si el evento es un `PointerEvent` o `MouseEvent`, se extrae `clientX` y
`clientY` directamente del evento.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-2.html" region_tag="extract-xy" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-2.html){: target="_blank" .external }

Un `TouchEvent` tiene tres listas con datos de acciones táctiles:

* `touches`: lista de todas las acciones táctiles actuales en la pantalla, independientemente del elemento DOM
en las que se encuentren.
* `targetTouches`: lista de las acciones táctiles actuales en el elemento DOM al que está enlazado
el evento.
* `changedTouches`: lista de las acciones táctiles que se modificaron y provocaron la ejecución del
evento.

En la mayoría de los casos, `targetTouches` te brinda toda la información que necesitas. Para
obtener más información sobre estas listas, consulta [las listas de acciones táctiles](#touch-lists).

#### Usar requestAnimationFrame

Como los callbacks de eventos se ejecutan en el subproceso principal, es buena idea ejecutar
la mínima cantidad de código en los callbacks de nuestros eventos para que nuestro índice
de fotogramas sea alto y evitar un rendimiento malo.

Usando `requestAnimationFrame()`, podemos actualizar la IU justo
antes de que el navegador intente dibujar un fotograma. Además, nos ayudará a quitar actividades de
nuestros callbacks de eventos.

Si no conoces `requestAnimationFrame()`,
[aquí podrás encontrar](/web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes) más información.

Una implementación muy utilizada es guardar las coordenadas `x` e `y` de los eventos
de inicio y movimiento, y solicitar un fotograma de animación dentro del callback
del evento de movimiento.

En nuestra demostración, almacenamos la posición inicial de la acción táctil en `handleGestureStart()` (busca `initialTouchPos`):

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

El método `handleGestureMove()` guarda la posición de su evento
antes de solicitar un fotograma de animación si es necesario y pasa nuestra función
`onAnimFrame()` como callback:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-move" adjust_indentation="auto" %}
</pre>

El valor `onAnimFrame` es una función que, cuando se la llama, cambia nuestra IU
para moverla. Cuando pasamos esta función a `requestAnimationFrame()`, le solicitamos
al navegador que la llame justo antes de actualizar la página
(es decir, realizar cualquier cambio en la página).

En el callback `handleGestureMove()`, primero verificamos si `rafPending` es false
(indicará si `requestAnimationFrame()` llamó a `onAnimFrame()`
desde el último evento de movimiento). Esto significa que habrá un solo elemento `requestAnimationFrame()`
en espera de ejecución a la vez.

Cuando se ejecuta nuestro callback `onAnimFrame()`, configuramos la propiedad transform de los
elementos que queremos mover antes de actualizar `rafPending` a `false`. De esta forma, permitimos
que el próximo evento táctil solicite un nuevo fotograma de animación.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="on-anim-frame" adjust_indentation="auto" %}
</pre>

### Controlar gestos con acciones táctiles

La propiedad `touch-action` de CSS te permite controlar el comportamiento
táctil predeterminado de un elemento. En nuestros ejemplos, usamos `touch-action: none` para
evitar que el navegador utilice la acción táctil del usuario. En consecuencia, podemos
interceptar todos los eventos táctiles.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="touch-action-example" adjust_indentation="auto" %}
</pre>

`touch-action: none` es una opción de último recurso ya que no le permite
al navegador utilizar sus comportamientos predeterminados. En muchos casos, es mejor usar alguna
de las opciones que se describen más adelante.

`touch-action` te permite inhabilitar gestos implementados por un navegador.
Por ejemplo, IE10+ admite el gesto de presionar dos veces para hacer zoom. Si estableces una
acción táctil de `manipulation`, evitas el comportamiento predeterminado que esté asociado a la acción de
presionar dos veces.

De esta forma, puedes implementar tú mismo el gesto de presionar dos veces.

A continuación, encontrarás una lista con valores muy utilizados de acciones táctiles:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Parámetros de acciones táctiles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>touch-action: none</code></td>
      <td data-th="Description">El navegador no controlará ninguna
      interacción táctil.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pinch-zoom</code></td>
      <td data-th="Description">Inhabilita todas las interacciones del navegador, como
      `touch-action: none`, excepto `pinch-zoom`, que la controlará el
      navegador.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pan-y pinch-zoom</code></td>
      <td data-th="Description">Gestiona desplazamientos horizontales en JavaScript sin
      inhabilitar los desplazamientos verticales ni la acción de pellizcar para hacer zoom (p. ej., en carreteles de imágenes).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: manipulation</code></td>
      <td data-th="Description">Inhabilita el gesto de presionar dos veces, que evita demoras
      en el navegador. Permite que el navegador controle los desplazamientos y la acción de pellizcar para hacer
      zoom.</td>
    </tr>
  </tbody>
</table>

## Admitir versiones anteriores de IE

Si deseas admitir IE10, deberás gestionar versiones de
`PointerEvents` con prefijos del proveedor.


Para corroborar la compatibilidad de `PointerEvents`, normalmente buscarías
`window.PointerEvent`, pero en IE10, debes buscar
`window.navigator.msPointerEnabled`.

Los nombres de los eventos con prefijos del proveedor son 'MSPointerDown', 'MSPointerUp' and
'MSPointerMove'.

En el siguiente ejemplo, se explica cómo corroborar la compatibilidad y cambiar
el nombre de los eventos.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="pointereventsupport" adjust_indentation="auto" %}
</pre>

Para obtener más información, consulta este [artículo sobre actualizaciones de
Microsoft](https://msdn.microsoft.com/en-us/library/dn304886(v=vs.85).aspx).

## Referencia

### Seudoclases para estados de acciones táctiles

<table>
  <thead>
    <tr>
      <th>Clase</th>
      <th>Ejemplo</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Class">:hover</td>
      <td data-th="Example"><img alt="Botón presionado" src="images/btn-hover-state.png"></td>
      <td data-th="Description">
        Se ejecuta cuando el cursor se coloca encima de un elemento.
        Es útil cambiar la IU cuando esto ocurre para incentivar a los usuarios a interactuar con
        los elementos.
      </td>
    </tr>
    <tr>
      <td data-th="Class">:focus</td>
      <td data-th="Example">
        <img alt="Botón con foco" src="images/btn-focus-state.png">
      </td>
      <td data-th="Description">
        Se ejecuta cuando el usuario pasa de un elemento a otro en la página. Este estado
        le permite al usuario saber con qué elemento está
        interactuando; también le permite al usuario navegar fácilmente por la IU con un teclado.
      </td>
    </tr>
    <tr>
      <td data-th="Class">:active</td>
      <td data-th="Example">
        <img alt="Botón presionado" src="images/btn-pressed-state.png">
      </td>
      <td data-th="Description">
        Se ejecuta cuando se selecciona el elemento (por
        ejemplo, cuando el usuario hace clic en un elemento o lo toca).
      </td>
    </tr>
  </tbody>
</table>


En
[Touch Events de w3](http://www.w3.org/TR/touch-events/), encontrarás la referencia completa de los eventos táctiles.

### Eventos táctiles, de mouse y de punteros

Estos eventos son la base para agregar nuevos gestos a tu
app:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Eventos táctiles, de mouse y de punteros</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event Names">
        <code>touchstart</code>,
        <code>mousedown</code> y
        <code>pointerdown</code>
      </td>
      <td data-th="Description">
        Se llama cuando un dedo toca por primera vez un elemento o cuando el
        usuario hace clic con el mouse.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchmove</code>,
        <code>mousemove</code> y
        <code>pointermove</code>
      </td>
      <td data-th="Description">
        Se llama cuando el usuario mueve el dedo por la pantalla o
        arrastra con el mouse.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchend</code>,
        <code>mouseup</code> y
        <code>pointerup</code>
      </td>
      <td data-th="Description">
        Se llama cuando el usuario quita el dedo de la pantalla
        o suelta el botón del mouse.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchcancel</code>
        <code>pointercancel</code>
      </td>
      <td data-th="Description">
        Se llama cuando el navegador cancela los gestos de acciones táctiles. Por ejemplo,
        el usuario toca una app web y después cambia de pestaña.
      </td>
    </tr>
  </tbody>
</table>

### Listas de las acciones táctiles

Cada evento táctil incluye tres atributos de lista:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Atributos de los eventos táctiles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>touches</code></td>
      <td data-th="Description">
        Lista de todas las acciones táctiles actuales en la pantalla, independientemente de los elementos
        que se estén tocando.
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>targetTouches</code></td>
      <td data-th="Description">
        Lista de las acciones táctiles que se iniciaron en el elemento 
        del evento actual. Por ejemplo, si el destino es un <code>&lt;button&gt;</code>,
        solo obtendrás las acciones táctiles actualmente en dicho botón. Si el destino es el
       documento, obtendrás todas las acciones táctiles actualmente en el documento.
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>changedTouches</code></td>
      <td data-th="Description">
        Lista de las acciones táctiles que se modificaron y provocaron la ejecución del evento:
        <ul>
          <li>
            En el evento <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchstart">
            touchstart</a></code>,
            lista de los puntos táctiles que se acaban de activar con el
            evento actual.
          </li>
          <li>
            En el evento <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchmove">
            touchmove</a></code>,
            lista de los puntos táctiles que se movieron desde el último
            evento.
          </li>
          <li>
            En los eventos <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchend">
            touchend</a></code>
            y <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchcancel">
            touchcancel</a></code>,
            lista de los puntos táctiles que se acaban de quitar
            de la superficie.
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Habilitar compatibilidad con estado active en iOS

Infortunadamente, Safari en iOS no establece el estado *active* de forma predeterminada. Para
comenzar a usarlo, debes agregar un receptor de evento `touchstart` al *cuerpo del
documento* o a cada elemento.

Debes hacerlo desde una prueba de usuario-agente para que solo se ejecute en dispositivos iOS.

Agregar un inicio táctil al cuerpo tiene la ventaja de afectar a todos los elementos
del DOM; sin embargo, es posible que esto provoque problemas de rendimiento durante el desplazamiento de la página.


    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
      }
    };


La alterativa es agregar los receptores de inicio táctil a todos los elementos
de la página con los que se pueda interactuar. De esta forma, se evitan algunos de los problemas de rendimiento.


    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        var elements = document.querySelectorAll('button');
        var emptyFunction = function() {};
        for(var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('touchstart', emptyFunction, false);
        }
      }
    };


{# wf_devsite_translation #}
