project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Introducción a la propiedad CSS-overscroll-behaviour.

{# wf_updated_on: 2019-08-26 #} {# wf_published_on: 2017-11-14 #}

{# wf_tags: chrome63,css,overscroll,scroll #} {# wf_blink_components: Blink>CSS
#} {# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png
#} {# wf_featured_snippet: The CSS overscroll-behavior property allows
developers to override the browser's overflow scroll effects when reaching the
top/bottom of content. It can be used to customize or prevent the mobile
pull-to-refresh action. #}

# Tome el control de su desplazamiento: personalizando los efectos de extracción y actualización y desbordamiento {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %} {% include
"web/_shared/contributors/majidvp.html" %} {% include
"web/_shared/contributors/sunyunjia.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-size: 14px;
  font-style: italic;
}
.border {
  border: 1px solid #ccc;
}
.centered {
  display: flex;
  justify-content: center;
}
</style>

### TL; DR {: #tldr .hide-from-toc}

La propiedad de [`overscroll-behavior`
CSS](https://wicg.github.io/overscroll-behavior/) permite a los desarrolladores
anular el comportamiento de desplazamiento de desbordamiento predeterminado del
navegador al llegar a la parte superior / inferior del contenido. Los casos de
uso incluyen deshabilitar la función de extracción para actualizar en
dispositivos móviles, eliminar el resplandor de desplazamiento y los efectos de
bandas de goma, y evitar que el contenido de la página se desplace cuando está
debajo de un modal / superposición.

`overscroll-behavior` requiere Chrome 63+. Está en desarrollo o está siendo
considerado por otros navegadores. Ver
[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) para
más información. {: .caution }

## Fondo

### Límites de desplazamiento y encadenamiento de desplazamiento {: #scrollchaining }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" autoplay
loop muted alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>Desplazamiento encadenado en Chrome Android.</figcaption>
</figure>

El desplazamiento es una de las formas más fundamentales para interactuar con
una página, pero ciertos patrones de UX pueden ser difíciles de manejar debido a
los comportamientos predeterminados peculiares del navegador. Como ejemplo, tome
un cajón de aplicaciones con una gran cantidad de elementos por los que el
usuario puede tener que desplazarse. Cuando llegan al fondo, el contenedor de
desbordamiento deja de desplazarse porque no hay más contenido para consumir. En
otras palabras, el usuario alcanza un "límite de desplazamiento". Pero observe
lo que sucede si el usuario continúa desplazándose. **¡El contenido *detrás* del
cajón comienza a desplazarse** ! El desplazamiento se hace cargo del contenedor
principal; la página principal en sí en el ejemplo.

Resulta que este comportamiento se llama **encadenamiento de desplazamiento** ;
El comportamiento predeterminado del navegador al desplazarse por el contenido.
A menudo, el valor predeterminado es bastante bueno, pero a veces no es deseable
o incluso inesperado. Ciertas aplicaciones pueden querer proporcionar una
experiencia de usuario diferente cuando el usuario alcanza un límite de
desplazamiento.

### El efecto de extracción para actualizar {: #p2r }

Pull-to-refresh es un gesto intuitivo popularizado por aplicaciones móviles como
Facebook y Twitter. Tirar hacia abajo en un feed social y liberar crea un nuevo
espacio para cargar publicaciones más recientes. De hecho, este UX en particular
se ha vuelto *tan popular* que los navegadores móviles como Chrome en Android
han adoptado el mismo efecto. Al deslizar hacia abajo en la parte superior de la
página, se actualiza toda la página:

<div class="clearfix centered">
  <figure class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
autoplay muted loop height="350" class="border"></video>
    </a>
<figcaption>Twitter personalizado para actualizar <br> al actualizar un feed
en su PWA.</figcaption>
  </figure>
  <figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" autoplay
muted loop height="350" class="border"></video>
    </a>
<figcaption>Acción de extracción para actualizar nativa de Chrome Android
<br> actualiza toda la página.</figcaption>
  </figure>
</div>

Para situaciones como la [PWA de](/web/progressive-web-apps/) Twitter, puede
tener sentido deshabilitar la acción nativa de extracción para actualizar. ¿Por
qué? En esta aplicación, probablemente no desee que el usuario actualice
accidentalmente la página. ¡También existe la posibilidad de ver una animación
de actualización doble! Alternativamente, podría ser mejor personalizar la
acción del navegador, alineándola más estrechamente con la marca del sitio. La
parte desafortunada es que este tipo de personalización ha sido difícil de
lograr. Los desarrolladores terminan escribiendo JavaScript innecesario, agregan
escuchas táctiles [no
pasivas](/web/tools/lighthouse/audits/passive-event-listeners) (que bloquean el
desplazamiento) o pegan la página completa en 100vw / vh `<div>` (para evitar
que la página se desborde). Estas soluciones tienen efectos negativos [bien
documentados](https://wicg.github.io/overscroll-behavior/#intro) sobre el
rendimiento de desplazamiento.

¡Podemos hacerlo mejor!

## Introducción `overscroll-behavior` {: #intro }

La `overscroll-behavior` [de
propiedad](https://wicg.github.io/overscroll-behavior/) es una nueva
característica de CSS que controla el comportamiento de lo que sucede cuando
Permitir desplazamiento de un contenedor (incluyendo la propia página). Puede
usarlo para cancelar el encadenamiento de desplazamiento, deshabilitar /
personalizar la acción de extracción para actualizar, deshabilitar los efectos
de banda elástica en iOS (cuando Safari implementa `overscroll-behavior` ) y
más. ¡La mejor parte es que el <strong data-md-type="double_emphasis">uso
`overscroll-behavior` no afecta negativamente el rendimiento de la
página</strong> como los hacks mencionados en la introducción!

La propiedad toma tres valores posibles:

1. **auto** : predeterminado. Los pergaminos que se originan en el elemento
pueden propagarse a elementos ancestrales.

- **contener** - evita el encadenamiento de desplazamiento. Los pergaminos no se
propagan a los antepasados, pero se muestran los efectos locales dentro del
nodo. Por ejemplo, el efecto de brillo de desplazamiento en Android o el efecto
de banda de goma en iOS que notifica al usuario cuando ha alcanzado un límite de
desplazamiento. **Nota** : el uso `overscroll-behavior: contain` en el elemento
`html` evita las acciones de navegación de desplazamiento excesivo.
- **ninguno** , lo mismo que `contain` pero también evita los efectos de
sobredesplazamiento dentro del nodo en sí (por ejemplo, brillo de
sobredesplazamiento de Android o bandas de goma de iOS).

Nota: `overscroll-behavior` también admite shorthands para
`overscroll-behavior-x` y `overscroll-behavior-y` si solo desea definir
comportamientos para un determinado eje.

Veamos algunos ejemplos para ver cómo usar `overscroll-behavior` .

## Evite que los pergaminos escapen de un elemento de posición fija {: #fixedpos }

### El escenario de chatbox {: #chat }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
autoplay muted loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
<figcaption>El contenido debajo de la ventana de chat también se desplaza
:(</figcaption>
</figure>

Considere un chatbox de posición fija que se encuentra en la parte inferior de
la página. La intención es que el chatbox sea un componente autónomo y que se
desplace por separado del contenido detrás de él. Sin embargo, debido al
encadenamiento de desplazamiento, el documento comienza a desplazarse tan pronto
como el usuario llega al último mensaje en el historial de chat.

Para esta aplicación, es más apropiado que los pergaminos que se originan en el
chatbox permanezcan dentro del chat. Podemos hacer que eso suceda agregando
`overscroll-behavior: contain` al elemento que contiene los mensajes de chat:

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

Básicamente, estamos creando una separación lógica entre el contexto de
desplazamiento del chatbox y la página principal. El resultado final es que la
página principal permanece fija cuando el usuario alcanza la parte superior /
inferior del historial de chat. Los pergaminos que comienzan en el chatbox no se
propagan.

### El escenario de superposición de página {: #overlay }

Otra variación del escenario de "desplazamiento inferior" es cuando ve que el
contenido se desplaza detrás de una **superposición de posición fija** . ¡Un
`overscroll-behavior` regalo muerto está en orden! El navegador está tratando de
ser útil, pero termina haciendo que el sitio se vea defectuoso.

**Ejemplo** : modal con y sin `overscroll-behavior: contain` :

<figure class="clearfix centered">
  <div class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Antes</b> : el contenido de la página se desplaza debajo de
la superposición.</figcaption>
  </div>
  <div class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Después</b> : el contenido de la página no se desplaza debajo
de la superposición.</figcaption>
  </div>
</figure>

## Deshabilitar pull-to-refresh {: #disablp2r }

**Desactivar la acción de extracción para actualizar es una sola línea de CSS**
. Simplemente evite el encadenamiento de desplazamiento en todo el elemento que
define la ventana gráfica. En la mayoría de los casos, eso es `<html>` o
`<body>` :

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

Con esta simple adición, arreglamos las animaciones de doble extracción para
actualizar en la [demostración de
chatbox](https://ebidel.github.io/demos/chatbox.html) y, en su lugar, podemos
implementar un efecto personalizado que utiliza una animación de carga más
ordenada. Toda la bandeja de entrada también se difumina a medida que se
actualiza la bandeja de entrada:

<figure class="clearfix centered">
  <div class="attempt-left">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4"
autoplay muted loop height="225"></video>
    <figcaption>antes de</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Después</figcaption>
  </div>
</figure>

Aquí hay un fragmento del [código
completo](https://github.com/ebidel/demos/blob/master/chatbox.html) :

```html
<style>
  body.refreshing #inbox {
    filter: blur(1px);
    touch-action: none; /* prevent scrolling */
  }
  body.refreshing .refresher {
    transform: translate3d(0,150%,0) scale(1);
    z-index: 1;
  }
  .refresher {
    --refresh-width: 55px;
    pointer-events: none;
    width: var(--refresh-width);
    height: var(--refresh-width);
    border-radius: 50%; 
    position: absolute;
    transition: all 300ms cubic-bezier(0,0,0.2,1);
    will-change: transform, opacity;
    ...
  }
</style>

<div class="refresher">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>

<section id="inbox"><!-- msgs --></section>

<script>
  let _startY;
  const inbox = document.querySelector('#inbox');

  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {passive: true});

  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top of the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
        !document.body.classList.contains('refreshing')) {
      // refresh inbox.
    }
  }, {passive: true});
</script>
```

## Deshabilitar los efectos de resplandor de desplazamiento excesivo y bandas de goma {: #disableglow }

Para deshabilitar el efecto de rebote al tocar un límite de desplazamiento, use
`overscroll-behavior-y: none` :

```css
body {
  /* Disables pull-to-refresh and overscroll glow effect.
     Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
```

<figure class="clearfix centered">
  <div class="attempt-left">
<video src="/web/updates/images/2017/11/overscroll-behavior/drawer-glow.mp4"
autoplay muted loop height="300" class="border"></video>
<figcaption><b>Antes</b> : golpear el límite de desplazamiento muestra un
brillo.</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4" autoplay
muted loop height="300" class="border"></video>
    <figcaption><b>Después</b> : brillo deshabilitado.</figcaption>
  </div>
</figure>

Nota: Esto conservará las navegaciones de deslizamiento hacia la izquierda /
derecha. Para evitar navegaciones, puede usar `overscroll-behavior-x: none` .
Sin embargo, esto [todavía se está implementando](https://crbug.com/762023) en
Chrome.

## Demo completa {: #demo }

En conjunto, la [demostración](https://ebidel.github.io/demos/chatbox.html)
completa de [chatbox](https://ebidel.github.io/demos/chatbox.html) usa
`overscroll-behavior` para crear una animación personalizada de extracción para
actualizar y deshabilita los desplazamientos para que no escapen del widget de
chatbox. Esto proporciona una experiencia de usuario óptima que habría sido
difícil de lograr sin el `overscroll-behavior` CSS.

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4" autoplay
muted loop alt="Chatbox demo" height="600"></video>
  </a>
<figcaption><a href="https://ebidel.github.io/demos/chatbox.html"
target="_blank">Ver demo</a> | <a
href="https://github.com/ebidel/demos/blob/master/chatbox.html"
target="_blank">Fuente</a></figcaption>
</figure>

<br>
