project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Un análisis exhaustivo sobre el ciclo de vida del service worker

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-29 #}

# El ciclo de vida del service worker {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

El ciclo de vida del service worker es la parte más complicada de este. Si desconoces
lo que intenta hacer y los beneficios que ofrece, puede parecer que
molesta. Sin embargo, una vez que conoces cómo funciona, puedes ofrecer actualizaciones discretas
y fluidas a los usuarios, mezclando lo mejor de los patrones web y nativos.

Este artículo es un análisis exhaustivo, pero las viñetas que figuran en el comienzo de cada sección analizan los principales
conceptos que debes conocer.

## El intent

El intent del ciclo de vida es el siguiente:

* hacer posible la perspectiva de “primero sin conexión”;
* permitir que un nuevo service worker se prepare sin interrumpir el flujo del actual
;
* garantizar que una página dentro del ámbito esté controlada por el mismo service worker (o por ningún
  service worker) en todo momento;
* garantizar que solo se ejecute una versión de tu sitio a la vez.

El último punto es muy importante. Sin service worker, los usuarios pueden cargar una
pestaña en tu sitio y, más tarde, abrir otra. De esta manera, pueden ejecutarse
dos versiones de tu sitio al mismo tiempo. A veces, este proceso es correcto. Sin embargo, si estás lidiando
con el concepto de almacenamiento, puedes fácilmente tener dos pestañas con opiniones muy diferentes
acerca de cómo se debería administrar el almacenamiento compartido. Esto puede ocasionar errores o,
peor aún, pérdida de datos.

Warning: los usuarios detestan las pérdidas de datos. Les genera una profunda tristeza.

## El primer service worker

Resumen:

* El evento `install` es el primer evento que obtiene un service worker y solo
  sucede una vez.
* Una promesa que se pasa a `installEvent.waitUntil()` señala la duración y
  el éxito o fracaso de tu instalación.
* Un service worker no recibirá eventos como `fetch` y `push` hasta que
  se termine de instalar correctamente y su estado sea "activo".
* De manera predeterminada, los fetch de una página no atravesarán un service worker a menos que la solicitud de la
  página en sí lo haya hecho. Por lo tanto, tendrás que actualizar la
  página para ver los efectos del service worker.
* `clients.claim()` puede anular esta configuración predeterminada y tomar el control de las
  páginas no controladas.

<style>
  .framebox-container-container {
    max-width: 466px;
    margin: 1.8rem auto 0;
  }
  .framebox-container {
    position: relative;
    padding-top: 75.3%;
  }
  .framebox-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  .browser-screenshot {
    filter: drop-shadow(0 6px 4px rgba(0,0,0,0.2));
  }
</style>
<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer></script>
<style>
.lifecycle-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.lifecycle-diagram .label {
  font-size: 9.46829414px;
  font-family: 'Just Another Hand';
  text-align: center;
  text-anchor: middle;
}

.lifecycle-diagram .state-placeholder {
  fill: none;
  stroke-opacity: 0.28;
  stroke-width: 1px;
  stroke: #000;
  stroke-dasharray: 1;
}
.lifecycle-diagram .fetch {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
.lifecycle-diagram .controlled {
  fill: #d1eaff;
}

.lifecycle-diagram .fetch {
  stroke-dasharray: 7 30;
  stroke-dashoffset: 8;
}

.lifecycle-diagram.register,
.lifecycle-diagram .diagram-refresh,
.lifecycle-diagram .diagram-close,
.lifecycle-diagram.register .controlled,
.lifecycle-diagram .cog-new {
  opacity: 0;
}
</style>
<svg class="lifecycle-diagram" style="display:none">
  <defs>
    <g id="diagram-static">
      <text y="6.7" x="14.5" class="label">Instalación</text><text y="6.7" x="81.1" class="label">Activo</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
    </g>
    <g id="diagram-page">
      <path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" />
      <path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" />
    </g>
    <path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z"/>
    <g id="diagram-refresh"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5"/><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z"/></g>
    <g id="diagram-close"><use xlink:href="#page-action-circle"/><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z"/></g>
  </defs>
</svg>
<svg class="lifecycle-diagram register" viewBox="0 0 96.9 73"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled"/><use xlink:href="#diagram-static"/><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new"><use height="10" width="10" xlink:href="#diagram-sw"/></g><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page"/><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch"/><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch"/><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch"/><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch"/><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch"/><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch"/><g class="refresh-rotator"><use xlink:href="#diagram-refresh" class="diagram-refresh"/></g></svg>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('.lifecycle-diagram.register');
    var timeline = new TimelineLite({paused: true, onComplete: function() {
      timeline.play(0);
    }});

    var cogRotate = TweenLite.fromTo(el.querySelector('.cog-new use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      cogRotate.play(0);
    }});

    timeline.to(el, 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,67.745203,12.407711)', ease: Quint.easeInOut});
    timeline.addLabel('cog-active');

    var subTimeline = new TimelineLite();
    subTimeline.set({}, {}, "+=0.7");
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut});
    subTimeline.set({}, {}, "+=0.5");
    subTimeline.addLabel('page-load')
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    subTimeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut, delay: 0.25}, 'page-load');

    var refresh = new TimelineLite();
    refresh.set({}, {}, "+=0.5");
    refresh.addLabel('refresh-appearing');
    refresh.fromTo(el.querySelector('.diagram-refresh'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    refresh.set({}, {}, "+=1.3");
    refresh.to(el.querySelector('.diagram-refresh'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut});
    refresh.to(el.querySelector('.refresh-rotator'), 2, {rotation: 360, ease: Linear.easeNone}, 'refresh-appearing');

    timeline.add(subTimeline, 'cog-active');
    timeline.add(refresh, 'cog-active');

    var fetching = new TimelineLite();
    Array.prototype.slice.call(el.querySelectorAll('.fetch')).forEach(function(el, i) {
      fetching.to(el, 0.5, {strokeDashoffset: '-19px', ease: Linear.easeNone}, i * 0.15);
    });

    timeline.add(fetching);
    timeline.set({}, {}, "+=3");
    timeline.to(el, 0.5, {opacity: 0, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(changes) {
        changes.forEach(function(change) {
          if (change.intersectionRatio) {
            timeline.play(0);
            cogRotate.play(0);
            return;
          }
          timeline.pause();
          cogRotate.pause();
        });
      }, {});

      observer.observe(document.documentElement);
    }
    else {
      timeline.play(0);
      cogRotate.play(0);
    }
  });
</script>
{% endframebox %}
</div>
</div>

Analiza este HTML:

    <!DOCTYPE html>
    An image will appear here in 3 seconds:
    <script>
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered!', reg))
        .catch(err => console.log('Boo!', err));

      setTimeout(() => {
        const img = new Image();
        img.src = '/dog.svg';
        document.body.appendChild(img);
      }, 3000);
    </script>

Se registra un service worker y se agrega una imagen de un perro después de 3 segundos.

Aquí se muestra su service worker, `sw.js`:

    self.addEventListener('install', event => {
      console.log('V1 installing…');

      // cache a cat SVG
      event.waitUntil(
        caches.open('static-v1').then(cache => cache.add('/cat.svg'))
      );
    });

    self.addEventListener('activate', event => {
      console.log('V1 now ready to handle fetches!');
    });

    self.addEventListener('fetch', event => {
      const url = new URL(event.request.url);

      // serve the cat SVG from the cache if the request is
      // same-origin and the path is '/dog.svg'
      if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event.respondWith(caches.match('/cat.svg'));
      }
    });

Almacena en caché la imagen de un gato y la provee donde haya una solicitud de
`/dog.svg`. Sin embargo, si [ejecutas el ejemplo
anterior](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}, verás un perro la primera vez que cargues la página. Si actualizas la página,
verás el gato.

Note: los gatos son mejores que los perros. Simplemente *son*.

### Ámbito y control

El ámbito predeterminado del registro de un service worker es `./` en relación con la
URL de la secuencia de comandos. Esto significa que, si registras un service worker en
`//example.com/foo/bar.js`, el ámbito predeterminado será`//example.com/foo/`.

Denominamos `clients` a las páginas, los procesos de trabajo y los procesos de trabajo compartidos. Tu service worker
solo puede controlar clientes que estén dentro del ámbito. Una vez que un cliente está “controlado”, sus
fetch atraviesan el service worker dentro del ámbito. Puedes detectar si un cliente es
controlado mediante `navigator.serviceWorker.controller` porque su valor será null o una instancia de
service worker.

### Descarga, análisis y ejecución

Cuando llamas a `.register()`, se descarga el primer service worker. Si tu
secuencia de comandos no se descarga, no se analiza o arroja un error en su ejecución inicial,
se rechaza la promesa de registro y se descarta el service worker.

DevTools de Chrome muestra el error en la consola y en la sección de
service worker de la pestaña Application:

<figure>
  <img src="images/register-fail.png" class="browser-screenshot" alt="Error que aparece en la pestaña Service Workers de DevTools">
</figure>

### Instalación

El primer evento que recibe un service worker es `install`. Se activa apenas
se ejecuta el proceso de trabajo, y solo se lo llama una vez por service worker. Si
modificas la secuencia de comandos del service worker, el navegador lo considera un proceso de trabajo
de servicio diferente, y este recibirá su propio evento `install`. Analizaré [las actualizaciones con más detalle
más adelante](#updates).

El evento `install` es tu oportunidad de almacenar en caché todo lo que necesitas para poder
controlar los clientes. La promesa que pasas a `event.waitUntil()` permite que el navegador
sepa que tu instalación se completó correctamente.

Si se rechaza la promesa, significa que la instalación no se completó y el navegador elimina el
service worker. Nunca controlará los clientes. Esto significa que podemos confiar en la presencia de
"cat.svg" en la caché en nuestros eventos `fetch`. Se trata de una dependencia.

### Activación

Una vez que tu service worker esté listo para controlar clientes y administrar eventos
funcionales como `push` y `sync`, recibirás un evento `activate`. Sin embargo, eso no
significa que se controlará la página desde la que se llamó a `.register()`.

La primera vez que cargas [la versión
demo](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external}, si bien `dog.svg` se solicita mucho después de que se activa
el service worker, no se controla la solicitud, y seguirás viendo la imagen del
perro. La configuración predeterminada es *consistencia*: si tu página no se carga con un service worker,
tampoco lo harán los subrecursos. Si cargas [la versión
demo](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/){:
.external} otra vez (en otras palabras, actualizas la página), se controlará la solicitud.
Tanto la página como la imagen atravesarán eventos `fetch`, y verás un gato
en lugar de un perro.

### clients.claim

Puedes controlar clientes no controlados llamando a `clients.claim()` dentro del
service worker una vez que este está activo.

En este caso, se trata de [una variación de la versión demo
anterior](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/df4cae41fa658c4ec1fa7b0d2de05f8ba6d43c94/){:
.external} que llama a `clients.claim()` en su evento `activate`. *Deberías* ver
un gato la primera vez. Digo “deberías”, porque es una cuestión de sincronización. Solo
verás un gato si se activa el service worker y `clients.claim()` entra en vigencia
antes de que la imagen intente cargarse.

Si usas tu service worker para cargar páginas de manera diferente con respecto a la forma en la que se hubieran cargado mediante
la red, `clients.claim()` puede ser problemático, ya que el service worker
termina controlando algunos clientes que se cargaron sin él.

Note: veo que muchas personas incluyen `clients.claim()` como algo estándar, pero
pocas veces lo hago. Solo importante realmente en la primera carga y, debido a las
mejoras progresivas, la página por lo general funciona correctamente sin utilizar
un service worker.

## Actualización del service worker {: #updates}

Resumen:

* Se activa una actualización:
    * durante la navegación hasta una página dentro del ámbito;
    * durante eventos funcionales como `push` y `sync`, a menos que haya habido una
      revisión de actualización dentro de las 24 horas anteriores;
    * al llamar a `.register()` *solo si* ha cambiado la URL del service worker.
* Los encabezados de caché de la secuencia de comandos del service worker se respetan (hasta 24
  horas) cuando se actualiza el proceso de obtención. Haremos que este sea un comportamiento opcional, ya que
  atrae a las personas. Es probable que desees un `max-age` de 0 en la secuencia de comandos
  de tu service worker.
* Tu service worker se considera actualizado si tiene una cantidad de bytes diferente con respecto al proceso
  que ya tiene el navegador. (Extendemos este concepto para incluir también los módulos/las secuencias de comandos
  importados.)
* El service worker actualizado se inicia junto con el existente y recibe su
  propio evento `install`.
* Si tu nuevo proceso de trabajo tiene un código de estado incorrecto (por ejemplo, 404), no se analiza, arroja
  un error durante la ejecución o se rechaza durante la instalación, el nuevo proceso de trabajo se
  elimina, pero el actual permanece activo.
* Una vez que se instale correctamente, el proceso de trabajo actualizado esperará con un evento `wait` hasta que el proceso de trabajo
  actual no controle clientes. (Ten en cuenta que los clientes se superponen durante una
  actualización.)
* `self.skipWaiting()` evita la espera, es decir, el service worker
  se activa apenas finaliza su instalación.

<div class="framebox-container-container">
<div class="framebox-container">
{% framebox height="100%" %}
<link href="https://fonts.googleapis.com/css?family=Just+Another+Hand" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineLite.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js" defer></script>
<style>
.lifecycle-diagram {
  width: 100%;
  height: auto;
  display: block;
}

.lifecycle-diagram .label {
  font-size: 9.46829414px;
  font-family: 'Just Another Hand';
  text-align: center;
  text-anchor: middle;
}

.lifecycle-diagram .state-placeholder {
  fill: none;
  stroke-opacity: 0.28;
  stroke-width: 1px;
  stroke: #000;
  stroke-dasharray: 1;
}
.lifecycle-diagram .fetch {
  fill: none;
  stroke: #000;
  stroke-width: 1px;
}
.lifecycle-diagram .controlled {
  fill: #d1eaff;
}

.lifecycle-diagram .fetch {
  stroke-dasharray: 7 30;
  stroke-dashoffset: 8;
}

.lifecycle-diagram.register,
.lifecycle-diagram .diagram-refresh,
.lifecycle-diagram .diagram-close,
.lifecycle-diagram.register .controlled,
.lifecycle-diagram .cog-new {
  opacity: 0;
}
</style>
<svg class="lifecycle-diagram" style="display:none">
  <defs>
    <g id="diagram-static">
      <text y="6.7" x="14.5" class="label">Instalación</text><text y="6.7" x="81.1" class="label">Activo</text><circle r="14" cy="25.8" cx="14.5" class="state-placeholder"/><circle r="14" cy="25.8" cx="47.8" class="state-placeholder"/><circle r="14" cy="25.8" cx="81.2" class="state-placeholder"/>
    </g>
    <g id="diagram-page">
      <path d="M 191.3,0 12.8,0 C 5.8,0 0,5.7 0,12.8 L 0,167 c 0,7.2 5.7,13 12.8,13 l 178.5,0 c 7,0 12.8,-5.8 12.8,-13 l 0,-154 C 204,6 198.7,0.2 191.6,0.2 Z M 11,11 c 0.5,-0.5 1,-0.7 1.8,-0.8 l 178.5,0 c 0.7,0 1.3,0.3 1.8,0.8 0.8,0.5 1,1 1,1.8 l 0,13.5 -184.1,0 0,-13.5 c 0,-0.7 0.3,-1.3 0.8,-1.8 z m 182,158 c -0.4,0.4 -1,0.7 -1.7,0.7 l -178.5,0 c -0.7,0 -1.3,-0.3 -1.8,-0.8 -0.5,-0.8 -0.8,-1.4 -0.8,-2 l 0,-130.4 183.6,0 0,130.5 c 0,0.8 -0.2,1.4 -0.7,2 z" />
      <path d="m 26.5,18.6 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.2,0 c 0,2.8 -2.3,5 -5,5 -3,0 -5.2,-2.2 -5.2,-5 0,-3 2.3,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m 15.3,0 c 0,2.8 -2.3,5 -5.2,5 -2.8,0 -5,-2.2 -5,-5 0,-3 2.2,-5.2 5,-5.2 3,0 5.2,2.3 5.2,5.2 z m -5.2,111 102.7,0 0,10.4 -102.7,0 0,-10.3 z m 0,-16.8 102.7,0 0,10.2 -102.7,0 0,-10 z M 52,96 l 45.4,0 0,10.2 -45.4,0 0,-10.2 z m 0,-17 45.4,0 0,10.3 -45.4,0 0,-10.3 z m 0,-16.8 45.6,0 0,10.3 -45.6,0 0,-10.3 z m 100.2,1.3 -45.4,0 0,42 45.4,0 0,-42 z m -10.2,31.8 -25,0 0,-21.5 25,0 0,21.5 z" />
    </g>
    <path id="diagram-sw" d="m 19.43,12.98 c 0.04,-0.32 0.07,-0.64 0.07,-0.98 0,-0.34 -0.03,-0.66 -0.07,-0.98 l 2.11,-1.65 c 0.19,-0.15 0.24,-0.42 0.12,-0.64 l -2,-3.46 C 19.54,5.05 19.27,4.97 19.05,5.05 l -2.49,1 C 16.04,5.65 15.48,5.32 14.87,5.07 L 14.49,2.42 C 14.46,2.18 14.25,2 14,2 L 10,2 C 9.75,2 9.54,2.18 9.51,2.42 L 9.13,5.07 C 8.52,5.32 7.96,5.66 7.44,6.05 l -2.49,-1 C 4.72,4.96 4.46,5.05 4.34,5.27 l -2,3.46 C 2.21,8.95 2.27,9.22 2.46,9.37 l 2.11,1.65 C 4.53,11.34 4.5,11.67 4.5,12 c 0,0.33 0.03,0.66 0.07,0.98 l -2.11,1.65 c -0.19,0.15 -0.24,0.42 -0.12,0.64 l 2,3.46 c 0.12,0.22 0.39,0.3 0.61,0.22 l 2.49,-1 c 0.52,0.4 1.08,0.73 1.69,0.98 l 0.38,2.65 C 9.54,21.82 9.75,22 10,22 l 4,0 c 0.25,0 0.46,-0.18 0.49,-0.42 l 0.38,-2.65 c 0.61,-0.25 1.17,-0.59 1.69,-0.98 l 2.49,1 c 0.23,0.09 0.49,0 0.61,-0.22 l 2,-3.46 c 0.12,-0.22 0.07,-0.49 -0.12,-0.64 L 19.43,12.98 Z M 12,15.5 c -1.93,0 -3.5,-1.57 -3.5,-3.5 0,-1.93 1.57,-3.5 3.5,-3.5 1.93,0 3.5,1.57 3.5,3.5 0,1.93 -1.57,3.5 -3.5,3.5 z"/>
    <g id="diagram-refresh"><circle id="page-action-circle" cx="81.2" cy="58.1" r="3.5" fill="#fff" stroke="#000" stroke-width=".5"/><path d="M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z"/></g>
    <g id="diagram-close"><use xlink:href="#page-action-circle"/><path id="path5062" d="M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z"/></g>
  </defs>
</svg>
<svg class="lifecycle-diagram update" viewBox="0 0 96.9 73"><rect ry="15.8" y="10" x="65.4" height="63" width="31.6" class="controlled"/><use xlink:href="#diagram-static"/><text x="47.7" y="6.7" class="label">Espera</text><g transform="matrix(1.1187 0 0 1.1187 1.078 12.408)" class="cog cog-new"><use height="10" width="10" xlink:href="#diagram-sw"/></g><g transform="matrix(1.1187 0 0 1.1187 67.745 12.408)" class="cog cog-old"><use xlink:href="#diagram-sw" width="10" height="10"/></g><use transform="matrix(.09532 0 0 .09532 71.44 48.39)" xlink:href="#diagram-page" width="10" height="10" class="diagram-page"/><path d="M78.6 47.7c-1-6-2-11.6-1.6-17" class="fetch"/><path d="M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2" class="fetch"/><path d="M75.7 47c-2.3-6.3-3.2-12.5-2-18.2" class="fetch"/><path d="M89.5 29.5c.3 6-.4 12-4 18" class="fetch"/><path d="M75.4 30.3c0 4-1 6 2 17.2" class="fetch"/><path d="M86.6 31C88 37 86 42 84 47.4" class="fetch"/><g class="refresh-rotator"><use xlink:href="#diagram-refresh" class="diagram-refresh"/></g><use xlink:href="#diagram-close" class="diagram-close"/></svg>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var el = document.querySelector('.lifecycle-diagram.update');
    var timeline = new TimelineLite({paused: true, onComplete: function() {
      timeline.play(0);
    }});

    var cogRotate = TweenLite.fromTo(el.querySelector('.cog-new use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      cogRotate.play(0);
    }});

    var oldCogRotate = TweenLite.fromTo(el.querySelector('.cog-old use'), 15, {rotation: 0, transformOrigin:"50% 50%"}, {rotation: 360, ease: Linear.easeNone, paused: true, onComplete: function() {
      oldCogRotate.play(0);
    }});

    function createFetchingAnim() {
      var fetching = new TimelineLite();
      Array.prototype.slice.call(el.querySelectorAll('.fetch')).forEach(function(el, i) {
        fetching.fromTo(el, 0.5,
          {strokeDashoffset: 8},
          {strokeDashoffset: -19, ease: Linear.easeNone},
          i * 0.15
        );
      });
      return fetching;
    }

    timeline.add(createFetchingAnim());
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    timeline.set({}, {}, "+=0.5");
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,34.411905,12.407711)', ease: Quint.easeInOut});
    timeline.addLabel('cog-waiting');

    var subTimeline = new TimelineLite();
    subTimeline.set({}, {}, "+=0.7");
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut});
    subTimeline.set({}, {}, "+=0.5");
    subTimeline.addLabel('page-load')
    subTimeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut});
    subTimeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut, delay: 0.25}, 'page-load');

    var refresh = new TimelineLite();
    refresh.set({}, {}, "+=0.5");
    refresh.addLabel('refresh-appearing');
    refresh.fromTo(el.querySelector('.diagram-refresh'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    refresh.set({}, {}, "+=1.3");
    refresh.to(el.querySelector('.diagram-refresh'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut});
    refresh.to(el.querySelector('.refresh-rotator'), 2, {rotation: 360, ease: Linear.easeNone}, 'refresh-appearing');

    timeline.add(subTimeline, 'cog-waiting');
    timeline.add(refresh, 'cog-waiting');
    timeline.add(createFetchingAnim());
    timeline.set({}, {}, "+=1");
    timeline.fromTo(el.querySelector('.diagram-close'), 0.25,
      {opacity: 0, scale: 0, transformOrigin:"50% 50%"},
      {opacity: 1, scale: 1, ease: Quad.easeInOut}
    );
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('page-close');
    timeline.to(el.querySelector('.controlled'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.to(el.querySelector('.diagram-close'), 0.25, {opacity: 0, scale: 0, ease: Quad.easeInOut}, 'page-close');
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('takeover');
    timeline.to(el.querySelector('.cog-old'), 0.5, {opacity: 0, ease: Quad.easeInOut}, 'takeover');
    timeline.to(el.querySelector('.cog-new'), 1, {transform: 'matrix(1.1187138,0,0,1.1187138,67.745203,12.407711)', ease: Quint.easeInOut}, 'takeover');
    timeline.set({}, {}, "+=0.5");
    timeline.addLabel('page-open');
    timeline.to(el.querySelector('.controlled'), 0.5, {opacity: 1, ease: Quad.easeInOut}, 'page-open+=0.25');
    timeline.to(el.querySelector('.diagram-page'), 0.5, {opacity: 1, ease: Quad.easeInOut}, 'page-open');

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function(changes) {
        changes.forEach(function(change) {
          if (change.intersectionRatio) {
            timeline.play(0);
            cogRotate.play(0);
            oldCogRotate.play(0);
            return;
          }
          timeline.pause();
          cogRotate.pause();
          oldCogRotate.pause(0);
        });
      }, {});

      observer.observe(document.documentElement);
    }
    else {
      timeline.play(0);
      cogRotate.play(0);
      oldCogRotate.play(0);
    }
  });
</script>
{% endframebox %}
</div>
</div>

Supongamos que modificamos la secuencia de comandos de nuestro service worker para responder con una imagen de
un caballo en lugar de la de un gato:

    const expectedCaches = ['static-v2'];

    self.addEventListener('install', event => {
      console.log('V2 installing…');

      // cache a horse SVG into a new cache, static-v2
      event.waitUntil(
        caches.open('static-v2').then(cache => cache.add('/horse.svg'))
      );
    });

    self.addEventListener('activate', event => {
      // delete any caches that aren't in expectedCaches
      // which will get rid of static-v1
      event.waitUntil(
        caches.keys().then(keys => Promise.all(
          keys.map(key => {
            if (!expectedCaches.includes(key)) {
              return caches.delete(key);
            }
          })
        )).then(() => {
          console.log('V2 now ready to handle fetches!');
        })
      );
    });

    self.addEventListener('fetch', event => {
      const url = new URL(event.request.url);

      // serve the horse SVG from the cache if the request is
      // same-origin and the path is '/dog.svg'
      if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event.respondWith(caches.match('/horse.svg'));
      }
    });

Note: no tengo opiniones sólidas sobre los caballos.

[Prueba una versión demo de lo
anterior](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}. Deberías continuar viendo una imagen de un gato. Este es el motivo...

### Instalación

Observa que he cambiado el nombre del caché de `static-v1` a `static-v2`. Esto
significa que puedo configurar el nuevo caché sin sobrescribir elementos en el actual
,que continúa utilizando el service worker antiguo.

Mediante este patrón, se crean cachés específicos de la versión, similar a los recursos que una app nativa incluiría en el
paquete con su ejecutable. También es posible tener cachés que no sean específicos
de la versión, como por ejemplo, `avatars`.

### Espera

Luego de que el service worker actualizado se instala correctamente, este no se activa
hasta que el proceso de trabajo actual ya no controle clientes. Este estado
se denomina “espera” y representa la forma en la que el navegador garantiza que solo se ejecute una versión de tu
service worker a la vez.

Si ejecutas [la versión
demo actualizada](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}, deberías seguir viendo una imagen de un gato, porque el proceso de trabajo V2
todavía no se activó. Puedes ver el nuevo service worker en estado de espera en la pestaña
"Application" de DevTools:

<figure>
  <img src="images/waiting.png" class="browser-screenshot" alt="DevTools con un nuevo service worker en estado de espera">
</figure>

Incluso si tienes solo una pestaña abierta en la versión demo, actualizar la página no es suficiente
para permitir que la nueva versión tome el control. Esto se debe a cómo funcionan las búsquedas en el navegador.
Cuando navegas, la página actual no desaparece hasta que se hayan
recibido los encabezados de respuesta, e incluso después la página actual puede permanecer visible si la respuesta tiene un
encabezado `Content-Disposition`. Debido a esta superposición, el service worker actual
siempre controla un cliente durante una actualización.

Para obtener la actualización, cierra o abandona todas las pestañas que utilizan el proceso de trabajo
de servicio actual. Luego, cuando [navegues hasta la versión demo
nuevamente](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}, deberías ver el caballo.

Este patrón es similar a cómo se actualiza Chrome. Las actualizaciones de Chrome se descargan en
segundo plano, pero no se aplican hasta que Chrome se reinicia. Mientras tanto, puedes
continuar utilizando la versión actual sin interrupciones. Sin embargo, esto es un punto débil
durante el desarrollo, pero DevTools tiene formas de simplificarlo, las cuales analizaremos
[más adelante en este artículo](#devtools).

### Activación

Se activa cuando el service worker antiguo haya desaparecido y tu nuevo proceso de trabajo
de servicio pueda controlar clientes. Es el momento ideal para llevar a cabo tareas que no pudiste hacer
mientras el proceso de trabajo antiguo todavía estaba en uso, como por ejemplo, migrar bases de datos y vaciar
cachés.

En la versión demo anterior, mantengo una lista de cachés que deseo estén allí y, en
el evento `activate`, elimino el resto, lo cual permite quitar la caché
`static-v1` antiguo.

Warning: es posible que no estés realizando una actualización desde la versión anterior. Puede tratarse de una versión mucho más antigua del service worker.

Si pasas una promesa a `event.waitUntil()`, se almacenarán en búfer los eventos funcionales
(`fetch`, `push`, `sync`, etc.) hasta que se resuelva la promesa. Por lo tanto, cuando se activa el evento `fetch`
, significa que la activación finalizó completamente.

Warning: la API de almacenamiento en caché es "origin storage" (como localStorage y
IndexedDB). Si ejecutas muchos sitios en el mismo origen (por ejemplo,
`yourname.github.io/myapp`), ten cuidado de no borrar los cachés de los demás
sitios. Para evitar esto, agrégales a los nombres de caché un prefijo exclusivo del sitio actual,
como por ejemplo, `myapp-static-v1`, y no toques los cachés a menos que comiencen con `myapp-`.

### Omisión de la fase de espera

La fase de espera significa que solo puedes ejecutar una versión de tu sitio a la vez;
sin embargo, si no necesitas esa función, puedes hacer que tu nuevo service worker se
active antes llamando a `self.skipWaiting()`.

De esta manera, el service worker expulsa el proceso de trabajo activo actual y se activa
automáticamente apenas ingresa en la fase de espera (o inmediatamente si ya se encuentra en dicha
fase). *No* hace que se omita la instalación de tu proceso de trabajo; simplemente es una fase de espera.

Puedes llamar a `skipWaiting()` en cualquier momento, siempre y cuando sea durante la espera o
antes de esta. Es bastante común realizar la llamada en el evento `install`:

    self.addEventListener('install', event => {
      self.skipWaiting();

      event.waitUntil(
        // caching etc
      );
    });

Sin embargo, es posible que desees realizar la llamada como consecuencia de un `postMessage()` al proceso de trabajo de
servicio. En este caso, debes llamar a `skipWaiting()` luego de la interacción del usuario.

[Aquí se presenta una versión demo que utiliza
`skipWaiting()`](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v3.html){:
.external}. Deberías ver una imagen de una vaca sin tener que dejar de navegar.
Como sucede con `clients.claim()`, se trata de una carrera, por lo que solo verás la vaca si el nuevo service worker
realiza la obtención, se instala y se activa antes de que la página intente cargar la imagen.

Caution: `skipWaiting()` indica que es posible que tu nuevo service worker controle
páginas que se cargaron con una versión anterior. Esto significa que algunos de los fetch
de tu página serán administrados por tu service worker anterior; no obstante, tu nuevo
service worker administrará los fetch subsiguientes. No
uses `skipWaiting()` si esto podría generar fallas.

### Actualizaciones manuales

Como mencioné antes, el navegador revisa si hay actualizaciones disponibles automáticamente luego de las
navegaciones y los eventos funcionales, pero también puedes activar dichas actualizaciones manualmente:

    navigator.serviceWorker.register('/sw.js').then(reg => {
      // sometime later…
      reg.update();
    });

Si prevés que el usuario utilizará tu sitio por un período prolongado sin volver a cargar la página,
puedes establecer un intervalo de llamada a `update()` (por ejemplo, una hora).

### Evitar modificar la URL de la secuencia de comandos de tu service worker

Si leíste [mi publicación sobre mejores prácticas
de uso del caché](https://jakearchibald.com/2016/caching-best-practices/){: .external},
podrías considerar otorgarle una URL exclusiva a cada versión de tu service worker.
**¡No lo hagas!** Por lo general, se trata de una práctica poco eficaz para los service worker. Simplemente, actualiza
la secuencia de comandos en su ubicación actual.

Se podría generar uno de los siguientes problemas:

1. `index.html` registra `sw-v1.js` como service worker.
1. `sw-v1.js` almacena en caché y proporciona `index.html` por lo que funciona en el modo primero sin conexión.
1. Actualizas `index.html` por lo que se registra el nuevo service worker `sw-v2.js`.

Si sigues los pasos anteriores, el usuario nunca recibe `sw-v2.js`, porque `sw-v1.js` 
proporciona la versión anterior de `index.html` desde su caché. Te encuentras en
una posición en la que debes actualizar tu proceso de
trabajo de servicio. Ew.

Sin embargo, en el caso de [la versión demo
anterior](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html){:
.external}, *he* modificado la URL del service worker. Hice esto, a los efectos
de la versión demo, para que puedas alternar entre las versiones. No es algo que haga
en el entorno de producción.

## Facilidad de desarrollo {: #devtools}

El ciclo de vida del service worker se crea teniendo en cuenta al usuario; sin embargo,
durante el desarrollo, este concepto es un punto débil. Por suerte, existen algunas herramientas de ayuda:

### Update on reload

Es mi preferida.

<figure>
  <img src="images/update-on-reload.png" class="browser-screenshot" alt="Se muestra la herramienta 'update on reload' en DevTools">
</figure>

Mediante esta herramienta, se logra que el ciclo de vida sea accesible para el programador. En cada navegación, sucede lo siguiente:

1. Se recupera el service worker.
1. Se lo instala como una nueva versión incluso si tiene la misma cantidad de bytes, lo que significa que tu evento `install`
   se ejecuta y los cachés se actualizan.
1. Se omite la fase de espera de manera que se active el nuevo service worker.
1. Se navega por la página.

Esto significa que obtendrás actualizaciones en cada navegación (incluida la función de actualizar)
sin necesidad de volver a cargar la página dos veces o cerrar la pestaña.

### Skip waiting

<figure>
  <img src="images/skip-waiting.png" class="browser-screenshot" alt="Se muestra la herramienta 'skip waiting' en DevTools">
</figure>

Si cuentas con un proceso de trabajo en espera, puedes seleccionar "skip waiting" en DevTools para
activarlo inmediatamente.

### Shift-reload

Si fuerzas la recarga de la página (shift-reload), se evita el service worker
por completo. No se lo podrá controlar. Esta función se encuentra en la especificación, por lo que funciona en
otros navegadores que son compatibles con el service worker.

## Administración de actualizaciones

El service worker se diseñó como parte de la [Web
extensible](https://extensiblewebmanifesto.org/){: .external }. La idea es que nosotros, como
programadores de navegadores, reconozcamos que no somos mejores que los
programadores web en lo que respecta al desarrollo web. Y, como tales, no deberíamos proporcionar API de alto nivel estrechas que
resuelvan un problema en particular mediante patrones que *a nosotros* nos gusten. En cambio, deberíamos ofrecerte acceso
a la parte central del navegador y permitirte usar tu propia metodología,
de forma que funcione mejor para *tus* usuarios.

Por lo tanto, para habilitar la mayor cantidad posible de patrones, debemos observar el ciclo de actualización completo:

    navigator.serviceWorker.register('/sw.js').then(reg => {
      reg.installing; // the installing worker, or undefined
      reg.waiting; // the waiting worker, or undefined
      reg.active; // the active worker, or undefined

      reg.addEventListener('updatefound', () => {
        // A wild service worker has appeared in reg.installing!
        const newWorker = reg.installing;

        newWorker.state;
        // "installing" - the install event has fired, but not yet complete
        // "installed"  - install complete
        // "activating" - the activate event has fired, but not yet complete
        // "activated"  - fully active
        // "redundant"  - discarded. Either failed install, or it's been
        //                replaced by a newer version

        newWorker.addEventListener('statechange', () => {
          // newWorker.state has changed
        });
      });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // This fires when the service worker controlling this page
      // changes, eg a new worker has as skipped waiting and become
      // the new active worker. 
    });

## ¡Sobreviviste!

¡Uf! Se analizaron muchos conceptos técnicos teóricos. No te pierdas las novedades de las próximas semanas
, ya que analizaremos algunas apps prácticas de los temas anteriores.


{# wf_devsite_translation #}
