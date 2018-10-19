project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 64 for developers?
{% include "web/_shared/machine-translation-start.html" %}

{# wf_published_on: 2018-01-23 #}
{# wf_updated_on: 2018-03-05 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome64,new-in-chrome,observers,ux,regex,media,modules,responsive #}
{# wf_featured_snippet: Chrome 64 adds support for ResizeObservers, which will notify you when an element’s content rectangle has changed its size. Modules can now access to host specific metadata with import.metadata The pop-up blocker gets strong and plenty more. Let’s dive in and see what’s new for developers in Chrome 64! #}
{# wf_blink_components: N/A #}

# Nuevo en Chrome 64 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">  <iframe class="devsite-embedded-youtube-video" data-video-id="y5sb-icqOyg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* El soporte para [`ResizeObservers` ](#resizeobserver) le notificará cuando el rectángulo de contenido de un elemento haya cambiado su tamaño.
* Los módulos ahora pueden acceder a los metadatos específicos del host con [import.meta](#import-meta).
* El [bloqueador de ventanas emergentes](#popup-blocker) se vuelve fuerte.
* [`window.alert()` ](#window-alert) ya no cambia el enfoque.

Y hay [mucho más](#more)!

Soy Pete LePage. ¡Introduzcámonos y veamos las novedades para los desarrolladores en Chrome 64!

<div class="clearfix"></div>

Note: ¿Desea la lista completa de cambios? Echa un vistazo a la [lista de cambios del repositorio de origen de Chromium](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140).

## `ResizeObserver` {: #resizeobserver }

El seguimiento de los cambios de tamaño de un elemento puede ser un poco molesto. Lo más probable es que adjunte un agente de escucha al evento `resize` del documento, luego llame a `getBoundingClientRect` o `getComputedStyle` . Pero, ambos pueden causar una paliza de diseño.

¿Y qué sucede si la ventana del navegador no cambió el tamaño, pero se agregó un nuevo elemento al documento? ¿O agregaste `display: none` a un elemento? Ambos pueden cambiar el tamaño de otros elementos dentro de la página.

`ResizeObserver` le notifica cada vez que cambia el tamaño de un elemento, y proporciona la nueva altura y anchura del elemento, reduciendo el riesgo de apalear el diseño.

Al igual que otros observadores, usarlo es bastante simple, cree un objeto `ResizeObserver` y pase una devolución de llamada al constructor. La devolución de llamada recibirá una matriz de `ResizeOberverEntries` (una entrada por elemento observado) que contiene las nuevas dimensiones del elemento.

```js
const ro = new ResizeObserver( entries => {
  for (const entry of entries) {
    const cr = entry.contentRect;
    console.log('Element:', entry.target);
    console.log(`Element size: ${cr.width}px × ${cr.height}px`);
    console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
  }
});

// Observe one or multiple elements
ro.observe(someElement);
```

Echa un vistazo a [`ResizeObserver` : es como `document.onresize` para Elementos](/web/updates/2016/10/resizeobserver) para obtener más detalles y ejemplos del mundo real.


## Bloqueador de elementos emergentes mejorado {: #popup-blocker }

Odio el tabulador. Usted los conoce, es cuando una página abre una ventana emergente a algún destino Y navega por la página. Por lo general, uno de ellos es un anuncio o algo que no deseaba.

A partir de Chrome 64, este tipo de navegación se bloqueará, y Chrome mostrará una interfaz de usuario nativa al usuario, lo que les permitirá seguir la redirección si lo desean.


## `import.meta` {: #import-meta }

Al escribir módulos de JavaScript, a menudo desea acceder a metadatos específicos del host sobre el módulo actual. Chrome 64 ahora admite la propiedad `import.meta` dentro de los módulos y expone la URL del módulo como `import.meta.url` .

Esto es realmente útil cuando desea resolver recursos relacionados con el archivo del módulo en lugar del documento HTML actual.


## ¡Y más! {: #more }

Estos son solo algunos de los cambios en Chrome 64 para desarrolladores, por supuesto, hay muchos más.

* Chrome ahora admite [capturas con nombre](/web/updates/2017/07/upcoming-regexp-features#named_captures) y [Escapes de propiedades de Unicode](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes) en expresiones regulares.
* El valor predeterminado `preload` para los elementos `<audio>` y `<video>` ahora es `metadata` . Esto hace que Chrome esté en línea con otros navegadores y ayuda a reducir el ancho de banda y el uso de recursos al cargar solo los metadatos y no los medios en sí.
* Ahora puede usar `Request.prototype.cache` para ver el modo de caché de un `Request` y determinar si una solicitud es una solicitud de recarga.
* Con la API de Focus Management, ahora puede enfocar un elemento sin desplazarse hacia él con el atributo `preventScroll` .

## `window.alert()` {: #window-alert }

¡Ah, y uno más! Si bien esta no es realmente una "característica de desarrollador", me hace feliz. ¡`window.alert()` ya no trae una pestaña de fondo al primer plano! En su lugar, la alerta se mostrará cuando el usuario cambie a esa pestaña.

No más cambios aleatorios de pestañas porque algo me disparó un `window.alert` . Te estoy mirando el viejo Google Calendar.


Asegúrate de [suscribirte](https://goo.gl/6FP1a5) a nuestro [canal de YouTube](https://www.youtube.com/user/ChromeDevelopers/), y recibirás una notificación por correo electrónico cada vez que iniciemos un nuevo video, o agregaremos nuestro [RSS feed](/web/shows/rss.xml) a tu lector de feeds.


Soy Pete LePage, y tan pronto como se lance Chrome 65, estaré aquí para decirles: ¡qué novedades hay en Chrome!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}