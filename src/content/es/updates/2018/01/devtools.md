project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Local Overrides, accessibility tools, performance and SEO audits, and more.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-17 #}
{# wf_tags: chrome65,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Local Overrides, accessibility tools, performance and SEO audits, and more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Lo nuevo en DevTools (Chrome 65) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Las nuevas características que llegan a DevTools en Chrome 65 incluyen:

* [**Local Overrides**](#overrides)
* [New accessibility tools](#a11y)
* [The **Changes** tab](#changes)
* [New SEO and performance audits](#audits)
* [Multiple recordings in the **Performance** panel](#recordings)
* [Reliable code stepping with workers and asynchronous code](#stepping)

Siga leyendo o vea la versión en video de estas notas de publicación, a continuación.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="D1pV7ermy6w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Note: comprueba qué versión de Chrome estás ejecutando en `chrome://version` . Si está ejecutando una versión anterior, estas características no existirán. Si está ejecutando una versión posterior, estas características pueden haber cambiado. Chrome se actualiza automáticamente a una nueva versión principal cada 6 semanas.

## Locales {: #overrides }

**Anulaciones locales** le permiten realizar cambios en DevTools y mantener esos cambios en todas las cargas de la página. Anteriormente, cualquier cambio que hiciera en DevTools se perdería al volver a cargar la página.
**Anulaciones locales** funcionan para la mayoría de los tipos de archivos, con un par de excepciones. Ver [Limitations](#overrides-limitations) .

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/overrides.gif"
       alt="Persisting a CSS change across page loads with Local Overrides."/>
  <figcaption>
    <b>Figure 1</b>. Persisting a CSS change across page loads with <b>Local Overrides</b>
  </figcaption>
</figure>

Cómo funciona:

* Usted especifica un directorio donde DevTools debe guardar los cambios.
* Cuando realiza cambios en DevTools, DevTools guarda una copia del archivo modificado en su directorio.
* Cuando recarga la página, DevTools sirve el archivo local, modificado, en lugar del recurso de red.

Para configurar **Anulaciones Locales**:

1. Abra el panel **Fuentes**. 1. Abra la pestaña **Anulaciones**.

     <figure>
       <img src="/web/updates/images/2018/01/overrides.png"
            alt="The Overrides tab"/>
       <figcaption>
         <b>Figure 2</b>. The <b>Overrides</b> tab
       </figcaption>
     </figure>

1. Haga clic en **Anulaciones de configuración**. 1. Seleccione el directorio en el que desea guardar sus cambios. 1. En la parte superior de su ventana gráfica, haga clic en **Permitir** para dar a DevTools acceso de lectura y escritura al directorio. 1. Haz tus cambios.

### Limitaciones {: #overrides-limitations }

* DevTools no guarda los cambios realizados en el **Árbol DOM** del panel **Elementos**. Edite HTML en el panel **Fuentes** en su lugar.
* Si editas CSS en el panel **Estilos**, y la fuente de ese CSS es un archivo HTML, DevTools no guardará el cambio. Edite el archivo HTML en el panel **Fuentes** en su lugar.

### Funciones relacionadas {: #overrides-related }

* [Workspaces][WS] . DevTools asigna automáticamente los recursos de red a un repositorio local. Cada vez que realiza un cambio en DevTools, ese cambio también se guarda en su repositorio local.

[WS]: /web/updates/2017/10/devtools-release-notes#workspaces

## La pestaña Changes {: #changes }

Realice un seguimiento de los cambios que realice localmente en DevTools a través de la nueva pestaña ** Changes **.

<figure>
  <img src="/web/updates/images/2018/01/changes.png"
       alt="The Changes tab"/>
  <figcaption>
    <b>Figure 3</b>. The <b>Changes</b> tab
  </figcaption>
</figure>

## Nuevas herramientas de accesibilidad {: #a11y }

Use el nuevo panel **Accesibilidad** para inspeccionar las propiedades de accesibilidad de un elemento e inspeccione la relación de contraste de los elementos de texto en el **Selector de color** para asegurarse de que sean accesibles para usuarios con problemas de visión o color. -visiones deficiencias.

### accesibilidad de {: #a11y-pane }

Use el panel **Accesibilidad** en el panel **Elementos** para investigar las propiedades de accesibilidad del elemento actualmente seleccionado.

<figure>
  <img src="/web/updates/images/2018/01/a11y-pane.png"
       alt="The Accessibility pane shows the ARIA attributes and computed
            properties for the element that's currently selected in the DOM Tree of
            the Elements panel, as well as its position in the accessibility tree."/>
  <figcaption>
    <b>Figure 4</b>. The <b>Accessibility</b> pane shows the ARIA attributes
    and computed properties for the element that's currently selected in the <b>DOM Tree</b> on
    the <b>Elements</b> panel, as well as its position in the accessibility tree
  </figcaption>
</figure>

Echa un vistazo a A11ycast de Rob Dodson en el etiquetado a continuación para ver el panel ** Accesibilidad ** en acción.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="8dCUzOiMRy4"
          data-autohide="1" data-showinfo="0" frameborder="0"
          data-start="350" allowfullscreen>
  </iframe>
</div>

### Relación de contraste en el {: #contrast } color {: #contrast }

[Color Picker][CP] ahora muestra la relación de contraste de los elementos de texto. El aumento de la relación de contraste de los elementos de texto hace que su sitio sea más accesible para los usuarios con deficiencias visuales o deficiencias en la visión del color. Vea [Color and contrast][contrast] para obtener más información sobre cómo la relación de contraste afecta la accesibilidad.

Mejorar el contraste de color de sus elementos de texto hace que su sitio sea más utilizable para <i>todos los</i> usuarios. En otras palabras, si el texto es gris con un fondo blanco, es difícil de leer para cualquiera.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-collapsed.png"
       alt="Inspecting the contrast ratio of the highlighted H1 element."/>
  <figcaption>
    <b>Figure 5</b>. Inspecting the contrast ratio of the highlighted <code>h1</code> element
  </figcaption>
</figure>

En **Figura 5**, las dos marcas de verificación junto a **4.61** significan que este elemento cumple con las [enhanced recommended contrast ratio (AAA)][enhanced]{:.external} . Si solo tuviera una marca de verificación, eso significaría que cumplió con las [minimum recommended contrast ratio (AA)][minimum]{:.external} .

[enhanced]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7
[minimum]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast

Haga clic en **Mostrar más**! [Show More][SM]{:.cdt-inl} para expandir la sección **Relación de contraste**. La línea blanca en el cuadro **Espectro de color** representa el límite entre los colores que cumplen con la relación de contraste recomendada y los que no. Por ejemplo, ya que el color gris en
**La Figura 6** cumple con las recomendaciones, lo que significa que todos los colores debajo de la línea blanca también cumplen con las recomendaciones.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-expanded.png"
       alt="The expanded Contrast Ratio section."/>
  <figcaption>
    <b>Figure 6</b>. The expanded <b>Contrast Ratio</b> section
  </figcaption>
</figure>

[CP]: /web/tools/chrome-devtools/css/reference#color-picker
[contrast]: /web/fundamentals/accessibility/accessible-styles#color_and_contrast
[SM]: /web/updates/images/2018/01/show-more.png

#### Funciones relacionadas {: #contrast-related }

El panel **Auditorías** tiene una auditoría de accesibilidad automatizada para garantizar que
*cada* elemento de texto en una página tiene una relación de contraste suficiente.

Vea [Run Lighthouse in Chrome DevTools][audit] , o vea el A11ycast a continuación, para aprender cómo usar el panel **Auditorías** para probar la accesibilidad.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="b0Q5Zp_yKaU"
          data-autohide="1" data-showinfo="0" frameborder="0"
          allowfullscreen>
  </iframe>
</div>

[audit]: /web/tools/lighthouse/#devtools

## Nuevas auditorías {: #audits }

Chrome 65 incluye una categoría completamente nueva de auditorías de SEO y muchas auditorías de rendimiento nuevas.

Note: El panel **Auditorías** está alimentado por [Lighthouse][LH] . Chrome 64 ejecuta la versión 2.5 del faro. Chrome 65 ejecuta la versión 2.8 de Faro. Así que esta sección es simplemente un resumen de las actualizaciones de Lighthouse de 2.6, 2.7 y 2.8.

### Nuevas auditorías de SEO {: #seo }

Asegurarse de que sus páginas superen cada una de las auditorías en la nueva categoría ** SEO ** puede ayudar a mejorar su posicionamiento en los motores de búsqueda.

<figure>
  <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category of audits."/>
  <figcaption>
    <b>Figure 7</b>. The new <b>SEO</b> category of audits
  </figcaption>
</figure>

### Nuevas auditorías de performance {: #performance }

Chrome 65 también viene con muchas auditorías de rendimiento nuevas:

* El tiempo de arranque de JavaScript es alto
* Utiliza una política de caché ineficiente en activos estáticos.
* Evita redireccionamientos de página.
* Documento utiliza complementos.
* Minify CSS
* Minificar JavaScript

<aside class="key-point">
  <b>Perf matters!</b> After Mynet improved their page load speed by 4X, users spent 43% more time
  on the site, viewed 34% more pages, bounce rates dropped 24%, and revenue increased 25% per
  article pageview. <a href="/web/showcase/2017/mynet">Learn more</a>.
</aside>

<aside class="success">
  <b>Tip!</b> If you want to improve the load performance of your pages, but don't know where
  to start, try the <b>Audits</b> panel. You give it a URL, and it gives you a detailed report
  on many different ways you can improve that page. <a href="/web/tools/lighthouse/#devtools">Get
  started</a>.
</aside>

### Otras actualizaciones {: #audits-other }

* [New, manual accessibility audits](/web/updates/2018/01/lighthouse#a11y)
* [Updates to the WebP audit][webp] para que incluya más formatos de imagen de próxima generación.
* [A rehaul of the accessibility score][a11yscore]
* Si una auditoría de accesibilidad no es aplicable para una página, esa auditoría ya no cuenta para el puntaje de accesibilidad
* El rendimiento es ahora la sección superior en los informes

[seoaudits]: /web/updates/2018/01/lighthouse#seo
[webp]: /web/updates/2018/01/lighthouse#webp
[a11yscore]: /web/updates/2017/12/lighthouse#a11y
[LH]: /web/tools/lighthouse
[2.6]: /web/updates/2017/12/lighthouse
[2.7]: /web/updates/2018/01/lighthouse

## paso de código confiable con trabajadores y código asíncrono {: #stepping }

Chrome 65 trae actualizaciones para el **Step Into**! Botón [Step Into][into]{:.cdt-inl} al entrar en el código que pasa mensajes entre subprocesos y código asíncrono. Si desea el comportamiento de paso anterior, puede utilizar el nuevo **Paso**! Botón [Step][step]{:.cdt-inl} , en su lugar.

[into]: /web/tools/chrome-devtools/javascript/imgs/step-into.png
[step]: /web/tools/chrome-devtools/javascript/imgs/step.png

### en el código que pasa mensajes entre subprocesos {: #workers }

Cuando entras en el código que pasa mensajes entre subprocesos, DevTools ahora te muestra lo que sucede en cada subproceso.

Por ejemplo, la aplicación en **Figura 8** pasa un mensaje entre el hilo principal y el hilo trabajador. Después de ingresar a la llamada `postMessage()` en el hilo principal, DevTools se detiene en el controlador `onmessage` en el hilo trabajador. El controlador `onmessage` envía un mensaje al hilo principal. Al entrar en * esa * llamada se detiene DevTools nuevamente en el hilo principal.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 65."/>
  <figcaption>
    <b>Figure 8</b>. Stepping into message-passing code in Chrome 65
  </figcaption>
</figure>

Cuando ingresó a un código como este en versiones anteriores de Chrome, Chrome solo le mostró el lado del hilo principal del código, como puede ver en ** Figura 9 **.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 63."/>
  <figcaption>
    <b>Figure 9</b>. Stepping into message-passing code in Chrome 63
  </figcaption>
</figure>

### en el código asíncrono {: #async }

Al entrar en el código asíncrono, DevTools ahora asume que desea hacer una pausa en el código asíncrono que finalmente se ejecuta.

Por ejemplo, en **Figura 10** después de ingresar a `setTimeout()` , DevTools ejecuta todo el código que lleva hasta ese punto detrás de la escena y luego se detiene en la función que se pasa a `setTimeout()` .

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 65."/>
  <figcaption>
    <b>Figure 10</b>. Stepping into asynchronous code in Chrome 65
  </figcaption>
</figure>

Cuando ingresó a un código como este en Chrome 63, DevTools se detuvo en el código mientras se ejecutaba cronológicamente, como puede ver en **Figura 11**.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 63."/>
  <figcaption>
    <b>Figure 11</b>. Stepping into asynchronous code in Chrome 63
  </figcaption>
</figure>

## Grabaciones múltiples en el panel Performance {: #recordings }

El panel **Performance** ahora le permite guardar temporalmente hasta 5 grabaciones. Las grabaciones se eliminan al cerrar la ventana de DevTools. Vea [Get Started with Analyzing Runtime Performance][runtime] para [Get Started with Analyzing Runtime Performance][runtime] cómodo con el panel **Performance**.

[runtime]: /web/tools/chrome-devtools/evaluate-performance/

<figure>
  <img src="/web/updates/images/2018/01/recordings.png"
       alt="Selecting between multiple recordings in the Performance panel."/>
  <figcaption>
    <b>Figure 12</b>. Selecting between multiple recordings in the <b>Performance</b> panel
  </figcaption>
</figure>

## Bonus: Automatice las acciones de DevTools con Puppeteer 1.0 {: #puppeteer }

Note: Esta sección no está relacionada con Chrome 65.

La versión 1.0 de Puppeteer, una herramienta de automatización del navegador mantenida por el equipo de Chrome DevTools, ya está disponible. Puede usar Puppeteer para automatizar muchas tareas que antes solo estaban disponibles a través de DevTools, como la captura de capturas de pantalla:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await page.screenshot({path: 'example.png'});
      await browser.close();
    })();

También tiene API para muchas tareas de automatización generalmente útiles, como generar PDF:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
      await page.pdf({path: 'hn.pdf', format: 'A4'});
      await browser.close();
    })();

Vea [Quick Start][quickstart] para aprender más.

[quickstart]: /web/tools/puppeteer/get-started

También puede usar Puppeteer para exponer las funciones de DevTools mientras navega sin tener que abrir DevTools explícitamente. Ver [Using DevTools Features Without Opening DevTools][without] para un ejemplo.

[without]: /web/updates/2018/01/devtools-without-devtools

## Una solicitud del equipo de DevTools: considere Canary {: #canary }

Si está en Mac o Windows, considere usar [Chrome Canary][canary] como su navegador de desarrollo predeterminado. Si informa un error o un cambio que no le gusta mientras aún está en Canary, el equipo de DevTools puede abordar sus comentarios de manera significativamente más rápida.

Note: Canarias es la versión de vanguardia de Chrome. Se lanza tan pronto como se construye, sin pruebas. Esto significa que Canary se quiebra de vez en cuando, aproximadamente una vez al mes, y generalmente se arregla dentro de un día. Puedes volver a usar Chrome Estable cuando se rompe Canary.

[canary]: https://www.google.com/chrome/browser/canary.html

## Feedback {: #feedback }

El mejor lugar para discutir cualquiera de las características o cambios que ve aquí es [google-chrome-developer-tools@googlegroups.com mailing list][ML] . También puedes twittearnos en [@ChromeDevTools](https://twitter.com/chromedevtools) si tienes poco tiempo. Si está seguro de que ha encontrado un error en DevTools, por favor, [open an issue](https://crbug.com/new) .

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## Notas de la versión anterior {: #links }

Consulte la etiqueta [devtools-whatsnew][tag] para ver los enlaces a todas las notas de la versión de DevTools anteriores.

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}
