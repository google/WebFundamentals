project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Si el sitio contiene una gran cantidad de imágenes y videos, pero no deseas reducir ese contenido, la carga diferida puede ser la técnica que necesitas para mejorar el tiempo de carga inicial de la página y reducir la carga útil por página.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2018-04-04 #}
{# wf_blink_components: Blink>Image,Blink>HTML,Blink>JavaScript #}

# Carga diferida de imágenes y videos {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

La porción de
[imágenes](http://beta.httparchive.org/reports/state-of-images?start=earliest&end=latest)
y [videos](http://beta.httparchive.org/reports/page-weight#bytesVideo) en la
carga útil típica de un sitio web puede ser considerable. Lamentablemente, las
partes interesadas de un proyecto pueden ser renuentes a reducir los recursos de medios
de sus aplicaciones existentes. Esos estancamientos son frustrantes, especialmente cuando
todas las partes involucradas desean mejorar el rendimiento del sitio, pero no acuerdan la forma de lograrlo.
Afortunadamente, la carga diferida es una solución que reduce el tiempo de carga
inicial de la página _y_ el tiempo de carga, pero no escatima en contenido.

## ¿Qué es la carga diferida?

La carga diferida es una técnica que aplaza la carga de recursos no esenciales en
el tiempo de carga de la página. Estos recursos no esenciales se cargan en el momento en que
son necesarios. En lo que se refiere a las imágenes, "no esencial" generalmente es sinónimo de
"fuera de pantalla". Si utilizaste Lighthouse y exploraste algunas oportunidades de
mejora, sin dudas obtuviste cierta orientación en este ámbito en la
[auditoría Imágenes fuera de
pantalla](/web/tools/lighthouse/audits/offscreen-images):

<figure>
  <img srcset="images/offscreen-audit-2x.png 2x, images/offscreen-audit-1x.png 1x"
src="images/offscreen-audit-1x.png" alt="Una captura de pantalla de la auditoría
Imágenes fuera de pantalla en Lighthouse.">
  <figcaption><b>Figura 1</b>. Una de las auditorías de rendimiento de Lighthouse es
identificar las imágenes fuera de pantalla candidatas para la carga diferida.</figcaption>
</figure>

Seguramente, ya viste la carga diferida en acción alguna vez. Se parece a
esto:

- Llegas a una página. Te desplazas a medida que lees el contenido.
- En cierto punto, te desplazas hasta una imagen de marcador de posición en la ventana de visualización.
- De repente, la imagen de marcador de posición se reemplaza por la imagen final.

Es posible ver un ejemplo de carga diferida de imagen en la popular plataforma de publicación
[Medium](https://medium.com/), que carga imágenes de marcador de posición ligeras
en el tiempo de carga y las reemplaza por imágenes de carga diferida a medida que se desplazan
en la ventana de visualización.

<figure>
  <img srcset="images/lazy-loading-example-2x.jpg 2x,
images/lazy-loading-example-1x.jpg 1x"
src="images/lazy-loading-example-1x.jpg" alt="Una captura de pantalla del sitio web
Medium en la navegación donde se muestra la carga diferida en acción. El marcador de posición
borroso se encuentra a la izquierda y el recurso cargado a la derecha.">
  <figcaption><b>Figura 2</b>. Un ejemplo de carga diferida de imagen en acción. Se
carga una imagen de marcador de posición en la carga de la página (izquierda) y, al desplazarse
a la ventana de visualización, se carga la imagen final cuando se necesita.</figcaption>
</figure>

Si no conoces bien la carga diferida, seguramente te preguntas qué tan útil es
esta técnica y cuáles son sus beneficios. ¡Continúa leyendo para descubrirlo!

## ¿Por qué cargar de forma diferida las imágenes y los videos en lugar de solo _cargarlos_?

Para evitar cargar elementos que es probable que el usuario nunca vea. Esto es
un problema por diversos motivos:

- Se desperdician datos. En las conexiones sin medición de uso, esto no es lo peor que puede pasar
(aunque se puede utilizar ese valioso ancho de banda para descargar
otros recursos que el usuario efectivamente verá). Sin embargo, en los planes
de datos limitados, la carga de elementos que el usuario nunca verá
puede ser un desperdicio real de dinero.
- Se desperdician tiempo de procesamiento, batería y otros recursos del sistema. Una vez cargado
el recurso de medios, el navegador debe decodificarlo y representar su contenido
en la ventana de visualización.

Al cargar de forma diferida imágenes y videos, se reducen el tiempo de carga inicial de la página,
el peso inicial de la página y el uso de recursos del sistema, lo que afecta positivamente
el rendimiento. En esta guía, abordaremos algunas técnicas y brindaremos orientación para
la carga diferida de imágenes y videos, así como [una lista breve de
bibliotecas utilizadas comúnmente](/web/fundamentals/performance/lazy-loading-guidance/images-and-video/#lazy_loading_libraries).

## Carga diferida de imágenes

En teoría, los mecanismos de carga diferida de imágenes son simples, pero los detalles son
algo complicados. Además, existen algunos casos de uso puntuales en los que
la carga diferida aporta beneficios. Comencemos por la carga diferida de imágenes incorporadas en
HTML.

### Imágenes incorporadas

Los candidatos más comunes para la carga diferida son las imágenes que se utilizan en los elementos `<img>`.
Cuando se cargan de forma diferida elementos `<img>`, se utiliza JavaScript para comprobar si se encuentran
en la ventana de visualización. Si se encuentran, sus atributos `src` (y a veces `srcset`) se rellenan
con direcciones URL al contenido de imagen deseado.

#### Uso de Intersection Observer

Si alguna vez escribiste código de carga diferida, es probable que hayas logrado esta tarea con
controladores de eventos como `scroll` o `resize`. Si bien este enfoque es el más
compatible con los navegadores, los navegadores modernos ofrecen una forma más eficaz
de comprobar la visibilidad de los elementos mediante
[la API Intersection Observer](/web/updates/2016/04/intersectionobserver).

Note: Intersection Observer no es compatible con todos los navegadores. Si la compatibilidad
con todos los navegadores es esencial, asegúrate de leer [la próxima
sección](#using_event_handlers_the_most_compatible_way), donde se muestra cómo
cargar de forma diferida imágenes con controladores de eventos scroll
y resize menos eficaces (pero más compatibles).

Intersection Observer es una API más fácil de usar y leer que el código basado en
diversos controladores de eventos, ya que los desarrolladores solo deben registrar una instancia de Intersection Observer
para vigilar los elementos en lugar de escribir el tedioso código de detección de visibilidad de elementos. Todo
lo que el desarrollador debe hacer es decidir qué hacer cuando un elemento se vuelve
visible. Supongamos que este es el patrón de marcado básico para los elementos `<img>`
cargados de forma diferida:

```html
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load-1x.jpg" data-srcset="image-to-lazy-load-2x.jpg 2x, image-to-lazy-load-1x.jpg 1x" alt="I'm an image!">
```

Debemos enfocarnos en tres partes relevantes de este marcado:

1. El atributo `class`, que es con lo que seleccionaremos el elemento en
JavaScript.
2. El atributo `src`, que hace referencia a una imagen de marcador de posición que aparecerá
cuando se cargue la página por primera vez.
3. Los atributos `data-src` y `data-srcset`, que son atributos de marcador de posición y
contienen la URL para la imagen que cargaremos cuando el elemento se encuentre en la ventana de visualización.

Ahora veamos la forma en que podemos usar Intersection Observer en JavaScript para
cargar imágenes de forma diferida con este patrón de marcado:

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});
```

En el evento `DOMContentLoaded` del documento, esta secuencia de comandos consulta el DOM
para todos los elementos `<img>` con la clase `lazy`. Si existe una instancia de Intersection Observer disponible,
se crea un nuevo observador que ejecuta una devolución de llamada cuando los elementos `img.lazy`
ingresan a la pantalla de visualización. Revisa [este ejemplo
de CodePen](https://codepen.io/malchata/pen/YeMyrQ) para ver este código en acción.

Note: Este código utiliza un método basado en Intersection Observer llamado
`isIntersecting`, que no se encuentra disponible en la implementación de Intersection Observer
de Edge 15. Así que el código de carga diferida anterior (y otros fragmentos
de código similares) producirá un error. Consulta [este problema
de GitHub](https://github.com/w3c/IntersectionObserver/issues/211) para obtener orientación sobre
un condicional de detección de funciones más completo.

La desventaja de la API Intersection Observer es que, si bien [ofrece
una buena compatibilidad con navegadores](https://caniuse.com/#feat=intersectionobserver),
no es universal. [Es necesario aplicar
polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)
en los navegadores que no lo admiten o, como sugiere el código anterior, detectar si
se encuentra disponible y posteriormente revertir a métodos anteriores compatibles.

#### Uso de controladores de eventos (la forma más compatible)

Si bien es _recomendable_ usar Intersection Observer para la carga diferida,
es posible que la compatibilidad con el navegador sea esencial debido a los requisitos de la aplicación. [Una _posibilidad_ es aplicar
polyfill a la compatibilidad de
Intersection Observer](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) (y
esta es la opción más simple), pero también es posible revertir el código mediante
los controladores de eventos [`scroll`](https://developer.mozilla.org/en-US/docs/Web/Events/scroll),
[`resize`](https://developer.mozilla.org/en-US/docs/Web/Events/resize), y
posiblemente
[`orientationchange`](https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange)
en sintonía con
[`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
para determinar si un elemento se encuentra en la ventana de visualización.

Suponiendo que el patrón de marcado es el mismo que el anterior, el siguiente JavaScript
brinda la funcionalidad de carga diferida:

```javascript
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});
```

Este código usa `getBoundingClientRect` en un controlador de eventos `scroll` para comprobar si
algunos de los elementos `img.lazy` se encuentra en la ventana de visualización. Se utiliza una llamada `setTimeout` para
demorar el procesamiento y una variable `active` contiene el estado de procesamiento
que se utiliza para regular las llamadas de función. A medida que se cargan de forma diferida,
las imágenes se eliminan de la matriz de elementos. Cuando la matriz de elementos alcanza un valor de `length` de `0`,
se elimina el código del controlador de eventos scroll. Ve este código en acción en [este ejemplo
de CodePen](https://codepen.io/malchata/pen/mXoZGx).

Si bien funciona en casi todos los navegadores, este código presenta problemas potenciales
de rendimiento. La repetición de llamadas `setTimeout` puede ser un desperdicio, aunque
se regule el código en ellas. En este ejemplo, se ejecuta una comprobación cada 200
milisegundos sobre el desplazamiento en el documento o el cambio de tamaño de la ventana,
independientemente de que exista o no una imagen en la ventana de visualización. Además, el tedioso seguimiento de la cantidad de elementos
restantes para la carga diferida y el desenlace del controlador de eventos scroll
son responsabilidad del desarrollador.

En pocas palabras: Usa Intersection Observer siempre que puedas y revierte a
controladores de eventos si la compatibilidad más amplia posible es
un requisito esencial de la aplicación.

### Imágenes en CSS

Si bien las etiquetas `<img>` son la forma más común de usar imágenes en páginas web,
también es posible invocar imágenes mediante la propiedad CSS
[`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)
(y otras propiedades). A diferencia de los elementos `<img>` que se cargan independientemente
de su visibilidad, el comportamiento de carga de imágenes en CSS
implica más especulación. Cuando se crean [los modelos de documento y
objeto CSS](/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)
y [el árbol
de representación](/web/fundamentals/performance/critical-rendering-path/render-tree-construction),
el navegador examina la forma en que se aplica CSS a un documento antes de
solicitar recursos externos. Si el navegador determina una regla de CSS
por la que un recurso externo no se aplica al documento en función de su construcción
actual, el navegador no lo solicita.

Es posible usar este comportamiento especulativo para diferir la carga de imágenes en CSS
mediante JavaScript para determinar si un elemento se encuentra en la ventana de visualización y,
posteriormente, aplicar una clase a ese elemento
con la que se invoque el estilo de una imagen de fondo. Esto hace que la imagen se descargue cuando se necesita
y no en la carga inicial. Por ejemplo, veamos un elemento que contiene
una gran imagen de fondo hero:

```html
<div class="lazy-background">
  <h1>Here's a hero heading to get your attention!</h1>
  <p>Here's hero copy to convince you to buy a thing!</p>
  <a href="/buy-a-thing">Buy a thing!</a>
</div>
```

Normalmente, el elemento `div.lazy-background` contiene una imagen de fondo hero
invocada por alguna CSS. No obstante, en este ejemplo de carga diferida, es posible aislar
la propiedad `background-image` del elemento `div.lazy-background` mediante una clase `visible`
que se agrega al elemento cuando este llegue a la ventana de visualización:

```css
.lazy-background {
  background-image: url("hero-placeholder.jpg"); /* Placeholder image */
}

.lazy-background.visible {
  background-image: url("hero.jpg"); /* The final image */
}
```

Desde aquí, se utiliza JavaScript para comprobar si el elemento se encuentra en la ventana de visualización (con
Intersection Observer), y se agrega la clase `visible` al
elemento `div.lazy-background` en ese momento, lo que carga la imagen:

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});
```

Como se indicó anteriormente, se recomienda proporcionar una reserva o un
polyfill para Intersection Observer, ya que no todos los navegadores admiten esta API en la actualidad.
Revisa [esta demostración de CodePen](https://codepen.io/malchata/pen/wyLMpR) para ver
este código en acción.

## Carga diferida de videos

Al igual que con los elementos de imagen, también es posible cargar de forma diferida videos. Para cargar un video en
circunstancias normales, se utiliza el elemento `<video>` (a pesar de que ha surgido
[un método alternativo con
`<img>`](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/)
de implementación limitada). Sin embargo, el _modo_ en que se carga de forma diferida `<video>`
depende de cada caso de uso. Analicemos algunas situaciones y la solución diferente
que se requiere en cada una.

### Para videos sin reproducción automática

En los videos donde el usuario inicia la reproducción (es decir, videos _sin_
reproducción automática), especificar el [atributo
`preload`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload)
en el elemento `<video>` puede ser conveniente:

```html
<video controls preload="none" poster="one-does-not-simply-placeholder.jpg">
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

Aquí, se usa un atributo `preload` con el valor `none` para evitar que los navegadores
precarguen _cualquier_ dato de video. Para ocupar el espacio, se usa el atributo `poster`
para otorgar un marcador de posición al elemento `<video>`. El motivo de esto es que
los comportamientos predeterminados de carga de video pueden variar de un navegador a otro:

- En Chrome, el valor predeterminado para `preload` era `auto`. A partir de Chrome 64,
el valor predeterminado es `metadata`. Aun así, en la versión de Chrome para equipos de escritorio, es posible que
se precargue una porción de video con el encabezado `Content-Range`. Firefox, Internet Explorer 11
y Edge se comportan de un modo similar.
- Al igual que Chrome en los equipos de escritorio, las versiones de Safari 11.0 para escritorio precargan
un intervalo de video. En la versión 11.2 (la versión Tech Preview actual de Safari), solo
se precargan los metadatos de video. [En Safari en iOS, nunca se precargan
los videos](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html#//apple_ref/doc/uid/TP40009523-CH2-SW9).
- Cuando se habilita [el modo de ahorro de datos](https://support.google.com/chrome/answer/2392284),
el valor predeterminado de `preload` es `none`.

Como los comportamientos predeterminados de los navegadores con respecto a `preload`
no son inamovibles, ser explícitos es probablemente la mejor jugada. En los casos donde el usuario inicia la reproducción,
el uso de `preload="none"` es la forma más fácil de diferir la carga de un video
en todas las plataformas. El atributo `preload` no es la única forma de diferir la carga
de contenido de video. En [_Reproducción rápida con carga
previa de video_](/web/fundamentals/media/fast-playback-with-video-preload), es posible obtener algunas ideas
y conocimientos sobre el trabajo con la reproducción de video en JavaScript.

Lamentablemente, esto no resulta útil para usar videos en lugar de
GIF animados, los cuales se analizarán a continuación.

### Para videos en reemplazo de GIF animados

Si bien los GIF animados se utilizan ampliamente, son mediocres equivalentes de los videos
en diversas aspectos, especialmente en el tamaño de archivo de salida. Los GIF animados pueden alcanzar
el rango de varios megabytes de datos. Los videos con una calidad visual similar
suelen ser mucho más pequeños.

El uso del elemento `<video>` como reemplazo de un GIF animado no es tan
simple como el elemento `<img>`. Los GIF animados presentan estos
tres comportamientos inherentes:

1. Se reproducen automáticamente cuando se cargan.
2. Se repiten de forma continua ([si bien ese no es siempre
el caso](https://davidwalsh.name/prevent-gif-loop)).
3. No tienen una pista de audio.

Lograr esto con el elemento `<video>` se parece a algo como esto:

```html
<video autoplay muted loop playsinline>
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

Los atributos `autoplay`, `muted` y `loop` se explican por sí solos.
[`playsinline` se necesita para la reproducción automática en
iOS](https://webkit.org/blog/6784/new-video-policies-for-ios/). Se obtiene un reemplazo
de video como GIF que se puede utilizar en todas las plataformas. ¿Pero cómo se debe abordar
su carga diferida? [Chrome cargará de forma diferida
el video por el usuario](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/03/chrome-58-media-updates%23offscreen&sa=D&ust=1521096956530000&usg=AFQjCNHPv7wM_yxmkOWKA0sZ-MXYKUdUXg).
No se puede dar por hecho que todos los navegadores brindarán este comportamiento optimizado.
Según el público y los requisitos de la aplicación, es posible que debas tomar
las riendas de este asunto. Para comenzar, modifica el marcado `<video>` según corresponda:

```html
<video autoplay muted loop playsinline width="610" height="254" poster="one-does-not-simply.jpg">
  <source data-src="one-does-not-simply.webm" type="video/webm">
  <source data-src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

Notarás que la adición de un [atributo `poster`
](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-poster)
permite especificar un marcador de posición que ocupe el espacio del elemento `<video>`
hasta que se cargue de forma diferida el video. Al igual que con los ejemplos de carga diferida de `<img>` anteriores,
se guarda la URL del video en el atributo `data-src` de cada elemento `<source>`.
 Desde allí, se utiliza un JavaScript similar al de los ejemplos
de carga diferida de imágenes basada en Intersection Observer:

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});
```

Cuando se carga de forma diferida un elemento `<video>`, es necesario recorrer todos los elementos
`<source>` secundarios y alternar sus atributos `data-src` por atributos `src`. Una vez
hecho eso, es necesario activar la carga del video mediante una llamada al
método del elemento `load`, después de la cual los medios comenzarán a reproducirse automáticamente
según el atributo `autoplay`.

Al usar este método, se obtiene una solución de video que emula el comportamiento de los GIF animados,
pero no genera el mismo uso de datos intensivo que los GIF animados y permite
cargar de forma diferida ese contenido.

## Carga diferida de bibliotecas

Si no te importa tanto saber _cómo_ funciona la carga diferida en detalle y solo deseas
seleccionar una biblioteca y comenzar (¡eso no tiene nada de malo!), dispones de muchas
opciones para elegir. Muchas bibliotecas utilizan un patrón de marcado similar
a los que se mostraron en esta guía. Estas son algunas bibliotecas de carga diferida que puedes considerar
útiles:

- [lazysizes](https://github.com/aFarkas/lazysizes) es una biblioteca de carga diferida
con todas las funciones para cargar de forma diferida imágenes e iframes. Utiliza un patrón bastante
similar a los ejemplos de código mostrados aquí, ya que se enlaza automáticamente
a una clase `lazyload` en los elementos `<img>` y requiere especificar URL de imagen en
los atributos `data-src` y/o `data-srcset`, cuyo contenido se intercambia
por los atributos `src` y/o `srcset`, respectivamente. Utiliza Intersection Observer
(donde se puede aplicar polyfill) y se puede ampliar con [diversos
complementos](https://github.com/aFarkas/lazysizes#available-plugins-in-this-repo) para
tareas como la carga diferida de videos.
- [lozad.js](https://github.com/ApoorvSaxena/lozad.js) es una opción súper ligera
que solo utiliza Intersection Observer. Por esto, es altamente eficaz,
pero requiere polyfill para poder utilizarla en navegadores anteriores.
- [blazy](https://github.com/dinbror/blazy) es otra opción similar que se factura
como un cargador diferido ligero (su tamaño es 1.4 KB). Al igual que con los tamaños diferidos,
no requiere utilidades de terceros para la carga y funciona con IE7+.
Lamentablemente, no utiliza Intersection Observer.
- [yall.js](https://github.com/malchata/yall.js) es una biblioteca de mi autoría que utiliza
IntersectionObserver y se revierte a los controladores de eventos. Es compatible con IE11
y los principales navegadores.
- Si buscas una biblioteca de carga diferida específica para React, puedes considerar el uso de
[react-lazyload](https://github.com/jasonslyvia/react-lazyload). Si bien
no utiliza Intersection Observer, _sí_ proporciona un método conocido de
carga diferida de imágenes para los usuarios habituados a desarrollar aplicaciones con React.

Cada una de estas bibliotecas de carga diferida está bien documentada, con muchos patrones
de marcado para diversos esfuerzos de carga diferida. Si no eres de realizar cambios,
toma una biblioteca y comienza. Requiere el mínimo esfuerzo.

## Lo que puede salir mal

A pesar de que la carga diferida de imágenes y videos ofrece beneficios de rendimiento
positivos y medibles, no es una tarea para tomar a la ligera. Un error puede producir
consecuencias inesperadas. Así que es importante tener en cuenta
las siguientes consideraciones:

### Cuidado con la mitad superior

Aplicar la carga diferida a cada recurso de medios en la página con JavaScript puede ser tentador,
pero es necesario resistir la tentación. No se debe cargar de forma diferida ningún
elemento en la mitad superior de la página. Esos recursos deben ser considerados activos
esenciales y, por lo tanto, deben cargarse de forma normal.

El principal argumento para cargar los recursos de medios esenciales de la forma habitual en lugar de
diferir la carga es que la carga diferida demora la carga de esos recursos
hasta que el DOM se vuelve interactivo, cuando se completa la carga de las secuencias de comandos
y se inicia su ejecución. Esto es apropiado para las imágenes en la mitad inferior de la página,
pero es más rápido cargar los recursos esenciales en la mitad superior con un elemento `<img>` estándar.

Obviamente, la ubicación de la mitad no es tan clara por estos días cuando los sitios web son vistos
en tantas pantallas de tamaños variados. Lo que se encuentra en la mitad superior en
un equipo portátil puede estar en la mitad _inferior_ en los dispositivos móviles. No existe un consejo infalible para
abordar esto de forma óptima en cada situación. Es necesario realizar un inventario
de los activos esenciales de la página y cargar esas imágenes
de la forma típica.

Además, no es conveniente ser tan estricto sobre la línea de mitad de página
como el umbral para activar la carga diferida. Quizás, lo ideal para los fines personales sea
establecer una zona de búfer un poco más abajo de la mitad de la página para que
las imágenes comiencen a cargarse bastante antes de que el usuario las desplace a la ventana de visualización. Por ejemplo, la
API Intersection Observer permite especificar una propiedad `rootMargin` en un objeto
de opciones al crear una nueva instancia de `IntersectionObserver`. Esto
otorga efectivamente un búfer a los elementos, lo que activa el comportamiento
de carga diferida antes de que los elementos lleguen a la pantalla de visualización:

```javascript
let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
  // Lazy loading image code goes here
}, {
  rootMargin: "0px 0px 256px 0px"
});
```

Si el valor de `rootMargin` parece similar a los valores especificados para una propiedad
`margin` de CSS, es porque lo es. En este caso, se expande 256 píxeles
el margen inferior del elemento de observación (la ventana de visualización del navegador
de forma predeterminada, pero esto puede cambiarse por un elemento específico mediante
la propiedad `root`). Eso significa que se ejecutará una función de callback cuando un elemento de imagen
se encuentre a 256 píxeles de la ventana de visualización,
es decir, que la imagen comenzará a cargarse antes de que el usuario la vea.

A fin de lograr el mismo efecto con un código de control de eventos scroll, simplemente ajusta
la comprobación `getBoundingClientRect` para incluir un búfer y obtener el mismo efecto
en navegadores no compatibles con Intersection Observer.

### Cambio de diseño y marcadores de posición

La carga diferida de medios puede provocar cambios en el diseño si no se utilizan marcadores de posición.
Estos cambios pueden desorientar a los usuarios y activar operaciones costosas de diseño de DOM
que consumen recursos del sistema y favorecen los bloqueos. Como mínimo,
considera usar un marcador de posición de color sólido que ocupe las mismas dimensiones
que la imagen de destino, o técnicas como
[LQIP](http://www.guypo.com/introducing-lqip-low-quality-image-placeholders/) o
[SQIP](https://github.com/technopagan/sqip) que dan indicios sobre el contenido de un elemento
de medios antes de que se cargue.

Para las etiquetas `<img>`, `src` debe apuntar inicialmente a un marcador de posición
hasta que ese atributo se actualice con la URL de la imagen final. Utiliza el atributo `poster` en un elemento
`<video>` para apuntar a una imagen de marcador de posición. Asimismo, utiliza los atributos `width` y
`height` en las etiquetas `<img>` y `<video>`. Esto garantiza que
la transición de los marcadores de posición a las imágenes finales no modifique
el tamaño representado del elemento mientras se cargan los medios.

### Demoras en la decodificación de imágenes

La carga de imágenes grandes en JavaScript y su colocación en DOM pueden ocupar
el subproceso principal y, como consecuencia, la interfaz de usuario puede dejar de responder
por un breve período mientras se ejecuta la decodificación. [La decodificación asíncrona de imágenes con el método
`decode`](https://medium.com/dailyjs/image-loading-with-image-decode-b03652e7d2d2)
antes de insertarlas en el DOM puede reducir este tipo de bloqueos,
pero cuidado: Todavía no se encuentra disponible en todos lados y aumenta la complejidad
de la lógica de carga diferida. Si deseas usarla, debes revisar la disponibilidad. A continuación, se muestra
cómo se puede usar `Image.decode()` con una reserva:

```javascript
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

if ("decode" in newImage) {
  // Fancy decoding logic
  newImage.decode().then(function() {
    imageContainer.appendChild(newImage);
  });
} else {
  // Regular image load
  imageContainer.appendChild(newImage);
}
```

Revisa [este vínculo de CodePen](https://codepen.io/malchata/pen/WzeZGW) para ver
código similar a este ejemplo en acción. Si la mayoría de las imágenes son relativamente pequeñas,
esta opción no ofrece mucho, pero sin dudas puede reducir los bloqueos al
cargar de forma diferida imágenes grandes e insertarlas en el DOM.

### Cuando algo no se carga

A veces, los recursos de medios no se cargan por un motivo u otro y se producen
errores. ¿Cuándo puede suceder esto? Depende. Aquí se presenta una situación hipotética:
 Existe una política de almacenamiento en caché HTML válida por un período breve (p. ej., cinco
minutos), y un usuario visita el sitio _o_ un usuario deja una pestaña obsoleta abierta
por un período extenso (p. ej., siete horas) y regresa para leer el contenido.
En algún punto de este proceso, se produce una reimplementación. Durante esta implementación, se modifica
el nombre de un recurso de imagen debido al control de versiones basado en hash o
se elimina por completo. Para cuando el usuario carga de forma diferida la imagen,
el recurso ya no está disponible y se produce un error.

Si bien estos casos son bastante inusuales, es conveniente disponer de un plan de copia de seguridad
en caso de que la carga diferida falle. Para las imágenes, una solución de ese tipo puede ser
similar a esto:

```javascript
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

newImage.onerror = function(){
  // Decide what to do on error
};
newImage.onload = function(){
  // Load the image
};
```

Lo que se decide hacer en caso de un error depende de la aplicación. Por
ejemplo, se puede reemplazar el área de marcador de posición de la imagen por un botón
con el que el usuario pueda intentar cargar la imagen de nuevo o solo ver un mensaje de error
en el área de marcador de posición de la imagen.

También se pueden presentar otras situaciones. Lo que sea que se haga, nunca es mala idea
indicar al usuario cuando se produce un error y ofrecerle una acción para ejecutar
si algo sale mal.

### Disponibilidad de JavaScript

No se debe suponer que JavaScript está siempre disponible. Si planeas cargar imágenes
de forma diferida, considera ofrecer un marcado `<noscript>` que muestre las imágenes
en caso de que JavaScript no esté disponible. El ejemplo de reserva más simple posible
implica usar elementos `<noscript>` para presentar imágenes si JavaScript está desactivado:

```html
<!-- An image that eventually gets lazy loaded by JavaScript -->
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load.jpg" alt="I'm an image!">
<!-- An image that is shown if JavaScript is turned off -->
<noscript>
  <img src="image-to-lazy-load.jpg" alt="I'm an image!">
</noscript>
```

Si JavaScript está desactivado, los usuarios verán _ambos_: la imagen de marcador de posición
y la imagen incluida en los elementos `<noscript>`. Para evitar esto, coloca una clase
`no-js` en la etiqueta `<html>` de esta manera:

```html
<html class="no-js">
```

A continuación, coloca una línea de la secuencia de comandos integrada en `<head>`, antes de
que se soliciten hojas de estilo a través de etiquetas `<link>`, para eliminar la clase `no-js`
del elemento `<html>` si JavaScript está activado:

```html
<script>document.documentElement.classList.remove("no-js");</script>
```

Por último, puedes utilizar cierta CSS para ocultar los elementos con una clase diferida cuando
JavaScript no está disponible de esta manera:

```css
.no-js .lazy {
  display: none;
}
```

Esto no evita que las imágenes de marcador de posición se carguen, sino que ofrece un resultado
más conveniente. Los usuarios con JavaScript desactivado obtienen algo más que imágenes de
marcador de posición, lo que es mejor que obtener marcadores de posición sin contenido
de imagen con ningún significado.

## Conclusión

Si se utiliza con cuidado, la carga diferida de imágenes y videos puede reducir
seriamente el tiempo de carga inicial y la carga útil de páginas en el sitio. Los usuarios no soportarán la actividad de red
innecesaria ni los costos de procesamiento de recursos de medios que quizás nunca vean,
pero podrán ver esos recursos si lo desean.

En lo que respecta a las técnicas de mejora del rendimiento, la carga diferida no presenta
controversia razonable. Si un sitio contiene muchas imágenes integradas, es una forma
perfectamente adecuada de reducir las descargas innecesarias. ¡Los usuarios del sitio y
las partes interesadas del proyecto lo agradecerán!

_Un agradecimiento especial a [François
Beaufort](/web/resources/contributors/beaufortfrancois), Dean Hume, [Ilya
Grigork](/web/resources/contributors/ilyagrigorik), [Paul
Irish](/web/resources/contributors/paulirish), [Addy
Osmani](/web/resources/contributors/addyosmani), [Jeff
Posnick](/web/resources/contributors/jeffposnick) y Martin Schierle por sus
valiosos comentarios, los cuales mejoraron notablemente la calidad de este artículo._
