project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Los elementos personalizados permiten a los programadores web definir nuevas etiquetas HTML, extender las existentes y crear componentes web reutilizables.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-06-28 #}

# Custom Elements v1: Componentes web reutilizables {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc }

Con [Custom Elements][spec], los programadores web pueden **crear nuevas etiquetas HTML**,
reforzar las que existen o ampliar los componentes de otros desarrolladores.
La API es la base de los [componentes web](http://webcomponents.org/){: .external }. Aporta
una estrategia web basada en estándares para crear componentes reutilizables usando solo
JS/HTML/CSS básicos. Como resultado se obtiene una reducción del código, la modularización de este y una mayor capacidad de reutilización en nuestras apps.

## Introducción {: #intro}

Note: En este artículo se describen las nuevas <a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-elements" target="_blank">especificaciones de elementos personalizados v1</a>. Si ya has usado elementos personalizados, es probable que conozcas la versión <a href="https://www.chromestatus.com/features/4642138092470272">v0 incluida en Chrome 33</a>. El concepto es el mismo, pero las especificaciones de v1 incluyen importantes diferencias en la API. Continúa leyendo para conocer las novedades, o consulta la sección sobre <a href="#historysupport">la historia y la compatibilidad de los navegadores</a> para obtener más información.

El navegador ofrece una excelente herramienta para estructurar aplicaciones web.
Se conoce como “HTML”.  ¡Probablemente hayas oído el término! Es declarativo, portátil, ampliamente compatible y fácil de usar. Si bien el lenguaje HTML es excelente, su vocabulario y extensibilidad son limitados. El [estándar HTML](https://html.spec.whatwg.org/multipage/){: .external } no ofrece una manera de asociar automáticamente el comportamiento de JS con tu lenguaje de marcado... hasta ahora.

Los elementos personalizados son la respuesta a la modernización de HTML; completan las piezas faltantes
y agrupan estructura y comportamiento. Si HTML no proporciona la solución a un problema,
podemos crear un elemento personalizado que lo haga. **Los elementos personalizados transmiten nuevos trucos al navegador y conservan los beneficios del HTML**.

## Definición de un nuevo elemento {: #define}

Para definir un nuevo elemento HTML, necesitamos el poder de JavaScript.

El elemento `customElements` global se usa para definir un elemento personalizado y notificar
al navegador sobre una nueva etiqueta. Llama a `customElements.define()` con el nombre de etiqueta que desees
crear y una `class` JavaScript que extienda el `HTMLElement` básico.

**Ejemplo**; definición de un panel lateral para dispositivos móviles, `<app-drawer>`:


    class AppDrawer extends HTMLElement {...}
    window.customElements.define('app-drawer', AppDrawer);
    
    // Or use an anonymous class if you don't want a named constructor in current scope.
    window.customElements.define('app-drawer', class extends HTMLElement {...});
    

Ejemplo de uso:


    <app-drawer></app-drawer>
    

Es importante recordar que el uso de un elemento personalizado no difiere del uso de un `<div>` u otro elemento. Las instancias pueden declararse en la página, crearse de forma dinámica en JavaScript y tomar receptores de eventos como adjuntos, entre otras posibilidades. Continúa leyendo para hallar más ejemplos.

### Definición de la JavaScript API de un elemento {: #jsapi}

La funcionalidad de un elemento personalizado se define mediante un ES2015 [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) que extiende `HTMLElement`.
La extensión de `HTMLElement` garantiza que el elemento personalizado herede toda la API de DOM, lo cual
significa que las propiedades o los métodos que agregues a la clase formarán parte de la interfaz del DOM del elemento.
Básicamente, usa la clase a fin de crear una **JavaScript API pública** para tu etiqueta.

**Ejemplo**; definición de la interfaz de DOM de `<app-drawer>`:


    class AppDrawer extends HTMLElement {
    
      // A getter/setter for an open property.
      get open() {
        return this.hasAttribute('open');
      }
    
      set open(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
          this.setAttribute('open', '');
        } else {
          this.removeAttribute('open');
        }
        this.toggleDrawer();
      }
    
      // A getter/setter for a disabled property.
      get disabled() {
        return this.hasAttribute('disabled');
      }
    
      set disabled(val) {
        // Reflect the value of the disabled property as an HTML attribute.
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
      }
    
      // Can define constructor arguments if you wish.
      constructor() {
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.
        super();
    
        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          // Don't toggle the drawer if it's disabled.
          if (this.disabled) {
            return;
          }
          this.toggleDrawer();
        });
      }
    
      toggleDrawer() {
        ...
      }
    }
    
    customElements.define('app-drawer', AppDrawer);
    

En este ejemplo, se crea un panel lateral con una propiedad `open`, una propiedad `disabled`
y un método `toggleDrawer()`. También [refleja propiedades como atributos HTML](#reflectattr).

Una buena función de los elementos personalizados consiste en que **`this` dentro de una definición de clase hace referencia al
propio elemento DOM**; es decir, la instancia de la clase. En nuestro ejemplo, `this` hace referencia a `<app-drawer>`. Así (😉) es como el elemento puede adjuntarse un receptor de `click` a sí mismo. Además, no estarás limitado a receptores de eventos. La API de DOM completa se encuentra disponible en el código del elemento. Usa `this` para acceder a las propiedades del elemento, inspeccionar sus campos secundarios (`this.children`) y consultar nodos (`this.querySelectorAll('.items')`), entre otras posibilidades.

**Reglas para la creación de elementos personalizados**

1. El nombre de un elemento personalizado **debe contener un guión (-)**. Por lo tanto, `<x-tags>`, `<my-element>` y `<my-awesome-app>` son todos nombres válidos, mientras que `<tabs>` y `<foo_bar>` no lo son. Este requisito está pensado para que el analizador HTML pueda diferenciar los elementos personalizados de los comunes. También garantiza la compatibilidad a futuro cuando se agreguen nuevas etiquetas al HTML.
2. Puedes registrar la misma etiqueta más de una vez. Si intentas hacerlo, se generará una `DOMException`. Una vez que notifiques al navegador sobre la nueva etiqueta, el trabajo estará hecho. No habrá vuelta atrás.
3. Los elementos personalizados no se pueden cerrar automáticamente, ya que HTML solo permite a [unos pocos elementos](https://html.spec.whatwg.org/multipage/syntax.html#void-elements) cerrarse por sí solos. Escribe siempre una etiqueta de cierre (<code>&lt;app-drawer&gt;&lt;/app-drawer&gt;</code>).

## Extensión de elementos {: #extend}

La Custom Elements API es útil para crear nuevos elementos HTML, pero también
lo es para extender otros elementos personalizados o incluso el HTML integrado del navegador.

### Extensión de un elemento personalizado {: #extendcustomeel}

La extensión de otro elemento personalizado se realiza mediante la extensión de su definición de clase.

**Ejemplo**; crea un `<fancy-app-drawer>` que extienda `<app-drawer>`:


    class FancyDrawer extends AppDrawer {
      constructor() {
        super(); // always call super() first in the ctor. This also calls the extended class' ctor.
        ...
      }
    
      toggleDrawer() {
        // Possibly different toggle implementation?
        // Use ES2015 if you need to call the parent method.
        // super.toggleDrawer()
      }
    
      anotherMethod() {
        ...
      }
    }
    
    customElements.define('fancy-app-drawer', FancyDrawer);
    

### Extensión de elementos HTML nativos {: #extendhtml}

Supongamos que deseas crear un `<button>` más atractivo. En lugar de replicar el comportamiento y la
funcionalidad de `<button>`, una mejor opción es mejorar de forma progresiva el elemento existente usando elementos personalizados.

Un **elemento personalizado integrado** es un elemento que extiende una de las etiquetas
HTML integradas del navegador. El principal beneficio de extender un elemento existente es
contar con todas sus características (propiedades del DOM, métodos y accesibilidad). No existe una mejor manera de escribir una [Progressive Web App](/web/progressive-web-apps/) que **mejorar progresivamente los elementos HTML existentes**.

Para extender un elemento, deberás crear una definición de clase que herede contenido de
la interfaz correcta del DOM. Por ejemplo, un elemento personalizado que extiende `<button>`
debe heredar contenido de `HTMLButtonElement` en lugar de `HTMLElement`. De igual manera, un
elemento que extiende `<img>` debe extender `HTMLImageElement`.

**Ejemplo**; extensión de `<button>`:


    // See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
    // for the list of other DOM interfaces.
    class FancyButton extends HTMLButtonElement {
      constructor() {
        super(); // always call super() first in the ctor.
        this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY));
      }
    
      // Material design ripple animation.
      drawRipple(x, y) {
        let div = document.createElement('div');
        div.classList.add('ripple');
        this.appendChild(div);
        div.style.top = `${y - div.clientHeight/2}px`;
        div.style.left = `${x - div.clientWidth/2}px`;
        div.style.backgroundColor = 'currentColor';
        div.classList.add('run');
        div.addEventListener('transitionend', e => div.remove());
      }
    }
    
    customElements.define('fancy-button', FancyButton, {extends: 'button'});
    

Observa que la llamada a `define()` cambia ligeramente al extender un elemento nativo. El tercer parámetro obligatorio indica al navegador la etiqueta que extenderás. Esto es necesario porque muchas etiquetas HTML comparten la misma interfaz del DOM. Ejemplos: `<section>`, `<address>` y `<em>` (entre otras) comparten `HTMLElement`; `<q>` y `<blockquote>` comparten `HTMLQuoteElement`. La especificación de `{extends: 'blockquote'}` le permite al navegador determinar que estás creando una `<blockquote>` modificada en lugar de `<q>`. Consulta [la especificación de HTML](https://html.spec.whatwg.org/multipage/indices.html#element-interfaces) para
obtener la lista completa de interfaces de DOM del HTML.

Note: La extensión de `HTMLButtonElement` transmite a nuestro atractivo botón todas las propiedades y todos los métodos del DOM de `<button>`. Eso nos libera de una gran cantidad de implementaciones: la propiedad `disabled`, el método `click()`, los receptores de `keydown` y la administración de `tabindex`. En su lugar, nuestro foco debe centrarse en mejorar progresivamente `<button>` con funcionalidad personalizada; sobre todo, el método `drawRipple()`. Menos código y más reutilización.

Los consumidores de un elemento integrado personalizado pueden usarlo de varias maneras.
Pueden declararlo agregando el atributo `is=""` en la etiqueta nativa:


    <!-- This <button> is a fancy button. -->
    <button is="fancy-button" disabled>atractivo botón.</button>
    

Crea una instancia en JavaScript:


    // Custom elements overload createElement() to support the is="" attribute.
    let button = document.createElement('button', {is: 'fancy-button'});
    button.textContent = 'Fancy button!';
    button.disabled = true;
    document.body.appendChild(button);
    

Si no, usa el operador `new`:


    let button = new FancyButton();
    button.textContent = 'Fancy button!';
    button.disabled = true;
    

Aquí te mostramos otro ejemplo que extiende `<img>`.

**Ejemplo**; extensión de `<img>`:


    customElements.define('bigger-img', class extends Image {
      // Give img default size if users don't specify.
      constructor(width=50, height=50) {
        super(width * 10, height * 10);
      }
    }, {extends: 'img'});
    

Los usuarios declaran este componente de la siguiente manera:


    <!-- This <img> is a bigger img. -->
    <img is="bigger-img" width="15" height="20">
    

También pueden crear una instancia en JavaScript:


    const BiggerImage = customElements.get('bigger-img');
    const image = new BiggerImage(15, 20); // pass ctor values like so.
    console.assert(image.width === 150);
    console.assert(image.height === 200);
    

Note: Algunos navegadores exhiben un rechazo manifiesto por la implementación de la sintaxis  <code>is=""</code>. Esto representa una desventaja para la accesibilidad y la mejora progresiva. Si crees que extender elementos HTML nativos es útil, danos tu opinión <a href='https://github.com/w3c/webcomponents/issues/509'>en Github</a>.

## Reacciones de los elementos personalizados {: #reactions}

Un elemento personalizado puede definir enlaces de ciclo de vida especiales para ejecutar código durante
momentos interesantes de su existencia. Estos enlaces se llaman **reacciones de elementos personalizados**.

<table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Momento en que se llama</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>constructor</code></td>
      <td>Se crea o <a href="#upgrades">se actualiza</a> una instancia del elemento. Es útil para inicializar el estado, configurar receptores de eventos o<a href="#shadowdom">crear un Shadow DOM</a>. Consulta la especificación<a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance"></a> para obtener información sobre las restricciones en relación con lo que puedes hacer en el  <code>constructor</code>.</td>
    </tr>
    <tr>
      <td><code>connectedCallback</code></td>
      <td>Se llama cada vez que se inserta el elemento en el DOM. Es útil para ejecutar código de configuración, como la obtención de recursos o la representación. En general, debes intentar demorar el trabajo hasta este momento.</td>
    </tr>
    <tr>
      <td><code>disconnectedCallback</code></td>
      <td>Se llama cada vez que se quita el elemento del DOM. Es útil para ejecutar código de limpieza (eliminación de receptores de eventos, etc.).</td>
    </tr>
    <tr>
      <td><code>attributeChangedCallback(attrName, oldVal, newVal)</code></td>
      <td>Se agrega, quita, actualiza o reemplaza un atributo. También se llama para obtener valores iniciales cuando el analizador crea un elemento o lo <a href="#upgrades">actualiza</a>. <b>Nota:</b> solo los atributos que se indiquen en la propiedad <code>observedAttributes</code> recibirán este callback.</td>
    </tr>
    <tr>
      <td><code>adoptedCallback()</code></td>
      <td>El elemento personalizado se traslada a un nuevo <code>document</code> (p. ej., alguien llama a <code>document.adoptNode(el)</code>).</td>
    </tr>
  </tbody>
</table>

El navegador llama a `attributeChangedCallback()` para obtener los atributos que se encuentran en la lista blanca
en la matriz `observedAttributes` (consulta [Observación de cambios en los atributos](#attrchanges)).
Básicamente, es una optimización del rendimiento. Cuando los usuarios cambien un atributo
común como `style` o `class`, no te convendrá recibir cientos de callbacks no deseados.

**Los callbacks de reacción son sincrónicos**. Si alguien llama a `el.setAttribute(...)`
en tu elemento, el navegador llamará de inmediato a `attributeChangedCallback()`. De igual manera,
recibirás `disconnectedCallback()` después de eliminar tu elemento
del DOM (p. ej., el usuario llama a `el.remove()`).

**Ejemplo;** adición de reacciones de elementos personalizados a `<app-drawer>`:


    class AppDrawer extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.
        ...
      }
      connectedCallback() {
        ...
      }
      disconnectedCallback() {
        ...
      }
      attributeChangedCallback(attrName, oldVal, newVal) {
        ...
      }
    }
    

Define reacciones cuando tengan sentido. Si tu elemento es suficientemente complejo y abre una conexión con IndexedDB en `connectedCallback()`, realiza las tareas de limpieza necesarias en `disconnectedCallback()`. Ten cuidado. No puedes confiar en que tu elemento se elimine del DOM en todas las circunstancias. Por ejemplo, si el usuario cierra la pestaña, nunca se llamará a `disconnectedCallback()`.

**Ejemplo;** traslado de un elemento personalizado a otro documento observando su `adoptedCallback()`:


    function createWindow(srcdoc) {
      let p = new Promise(resolve => {
        let f = document.createElement('iframe');
        f.srcdoc = srcdoc || '';
        f.onload = e => {
          resolve(f.contentWindow);
        };
        document.body.appendChild(f);
      });
      return p;
    }
    
    // 1. Create two iframes, w1 and w2.
    Promise.all([createWindow(), createWindow()])
      .then(([w1, w2]) => {
        // 2. Define a custom element in w1.
        w1.customElements.define('x-adopt', class extends w1.HTMLElement {
          adoptedCallback() {
            console.log('Adopted!');
          }
        });
        let a = w1.document.createElement('x-adopt');
    
        // 3. Adopts the custom element into w2 and invokes its adoptedCallback().
        w2.document.body.appendChild(a);
      });
    

## Propiedades y atributos

### Cómo reflejar propiedades en atributos {: #reflectattr}

Es común que las propiedades HTML reflejen su valor en el DOM como un atributo HTML.
Por ejemplo, cuando los valores de `hidden` o `id` se modifican en JS:


    div.id = 'my-id';
    div.hidden = true;
    

los valores se aplican al DOM activo como atributos:


    <div id="my-id" hidden>
    

Esto se cita bajo el título “[cómo reflejar propiedades en atributos](https://html.spec.whatwg.org/multipage/infrastructure.html#reflecting-content-attributes-in-idl-attributes)”. Casi todas las propiedades en HTML hacen esto. ¿Por qué? Los atributos también son útiles para configurar un
elemento de forma declarativa, y el funcionamiento de ciertas API, como los selectores de CSS y accesibilidad, depende de los atributos.

Reflejar una propiedad es útil cuando deseas **conservar la representación del elemento DOM
en sincronización con su estado de JavaScript**. Un motivo por el cual podría convenirte
reflejar una propiedad es la aplicación de los estilos definidos por el usuario cuando cambie el estado de JS.

Recuerda `<app-drawer>`. Un consumidor de este componente podría deseas que se desvanezca
o evitar la interacción del usuario cuando esté inhabilitado:


    app-drawer[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }
    

Cuando se modifica la propiedad `disabled` en JS, se busca agregar ese atributo
al DOM de modo que coincida con el selector del usuario. El elemento puede proporcionar ese comportamiento
reflejando el valor en un atributo con el mismo nombre:


    ...
    
    get disabled() {
      return this.hasAttribute('disabled');
    }
    
    set disabled(val) {
      // Reflect the value of `disabled` as an attribute.
      if (val) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
      this.toggleDrawer();
    }
    

### Observación de cambios en los atributos {: #attrchanges}

Los atributos HTML permiten a los usuarios declarar el estado inicial de una manera conveniente:


    <app-drawer open disabled></app-drawer>
    

Los elementos pueden reaccionar a los cambios del atributo definiendo una `attributeChangedCallback`.
El navegador llamará a este método para cada cambio en los atributos que se indique en la matriz `observedAttributes`.


    class AppDrawer extends HTMLElement {
      ...
    
      static get observedAttributes() {
        return ['disabled', 'open'];
      }
    
      get disabled() {
        return this.hasAttribute('disabled');
      }
    
      set disabled(val) {
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
      }
    
      // Only called for the disabled and open attributes due to observedAttributes
      attributeChangedCallback(name, oldValue, newValue) {
        // When the drawer is disabled, update keyboard/screen reader behavior.
        if (this.disabled) {
          this.setAttribute('tabindex', '-1');
          this.setAttribute('aria-disabled', 'true');
        } else {
          this.setAttribute('tabindex', '0');
          this.setAttribute('aria-disabled', 'false');
        }
        // TODO: also react to the open attribute changing.
      }
    }
    

En el ejemplo, se configuran atributos adicionales en el `<app-drawer>` cuando se
cambia un atributo `disabled`. Si bien no lo haremos aquí, también podrías
**usar la `attributeChangedCallback` para mantener una propiedad JS sincronizada con su atributo**.

## Actualizaciones de elementos {: #upgrades}

### HTML mejorado progresivamente

Ya vimos que los elementos personalizados se definen llamando a `customElements.define()`.
Pero esto no significa que debes definir y registrar un elemento personalizado en una sola operación.

**Los elementos personalizados pueden usarse _antes_ de registrar su definición**.

La mejora progresiva es una característica de los elementos personalizados. En otras palabras, puedes declarar un grupo de elementos `<app-drawer>` en la página y no invocar a `customElements.define('app-drawer', ...)` hasta mucho más adelante. Esto se debe a que el navegador da a los posibles elementos personalizados un tratamiento diferente al de las [etiquetas desconocidas](#unknown). El proceso de llamar a `define()` y transmitirle un elemento existente con una definición de clase se denomina “actualizaciones de elementos”.

Para saber cuándo se define el nombre de una etiqueta, puedes usar `window.customElements.whenDefined()`;
proporciona una promesa que se resuelve al definirse el elemento.


    customElements.whenDefined('app-drawer').then(() => {
      console.log('app-drawer defined');
    });
    

**Ejemplo**; suspende el trabajo hasta que se actualice un conjunto de elementos secundarios


    <share-buttons>
      <social-button type="twitter"><a href="...">Twitter</a></social-button>
      <social-button type="fb"><a href="...">Facebook</a></social-button>
      <social-button type="plus"><a href="...">G+</a></social-button>
    </share-buttons>
    


    // Fetch all the children of <share-buttons> that are not defined yet.
    let undefinedButtons = buttons.querySelectorAll(':not(:defined)');
    
    let promises = [...undefinedButtons].map(socialButton => {
      return customElements.whenDefined(socialButton.localName);
    ));
    
    // Wait for all the social-buttons to be upgraded.
    Promise.all(promises).then(() => {
      // All social-button children are ready.
    });
    

Note: Imagino que los elementos personalizados se encuentran en un limbo antes de su definición. La [especificación](https://dom.spec.whatwg.org/#concept-element-custom-element-state) define el estado de un elemento como “indefinido”, “no personalizado” o “personalizado”. El estado de los elementos integrados como `<div>` siempre es “definido”.

## Contenido definido por el elemento {: #addingmarkup}

Los elementos personalizados pueden administrar su propio contenido usando las API de DOM en el código del elemento. Las [reacciones](#reactions) son prácticas para esto.

**Ejemplo**; crea un elemento con HTML predeterminado:

    customElements.define('x-foo-with-markup', class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
      }
      ...
    });
    
Declaring this tag will produce:

    <x-foo-with-markup>
     <b>I'm an x-foo-with-markup!</b>
    </x-foo-with-markup>

{% framebox height="70px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}
.demoarea::before {
  display: block;
  content: 'DEMO';
}
</style>

<div class="demoarea">
  <x-foo-with-markup></x-foo-with-markup>
</div>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-with-markup', class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

Note: Sobrescribir los campos secundarios de un elemento con contenido nuevo generalmente no se recomienda porque es una medida inesperada. Los usuarios se sorprenderían si se desestimara su lenguaje de marcado. Una mejor manera de agregar contenido definido por el elemento es usar el shadow DOM que trataremos a continuación.

### Creación de un elemento que use Shadow DOM {: #shadowdom}

Note: No abarcaré las características de [Shadow DOM][sd_spec] en este artículo, pero
es una API poderosa que puede combinarse con elementos personalizados. Por sí misma, Shadow DOM es
una herramienta de composición. Cuando se usa con elementos personalizados, los resultados son increíbles.


Shadow DOM proporciona una alternativa para que un elemento posea una parte del DOM independiente del resto de la página,
la represente y le aplique estilo. Podrías, incluso, ocultar una
app completa en una sola etiqueta:


    <!-- chat-app's implementation details are hidden away in Shadow DOM. -->
    <chat-app></chat-app>
    

Para usar Shadow DOM en un elemento personalizado, llama a `this.attachShadow` dentro de tu `constructor`:

    customElements.define('x-foo-shadowdom', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.

        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
          <style>:host { ... }</style> <!-- look ma, scoped styles -->
          <b>I'm in shadow dom!</b>
          <slot></slot>
        `;
      }
      ...
    });

Ejemplo de uso:

    <x-foo-shadowdom>
      <p><b>User's</b> custom text</p>
    </x-foo-shadowdom>
    
    <!-- renders as -->
    <x-foo-shadowdom>
      <b>I'm in shadow dom!</b>
      <slot></slot>
    </x-foo-shadowdom>

{% framebox height="130px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}

.demoarea::before {
  content: 'DEMO';
  display: block;
}
</style>

<div class="demoarea">
  <x-foo-shadowdom>
    <p><b>User's</b> custom text</p>
  </x-foo-shadowdom>
</div>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-shadowdom', class extends HTMLElement {
    constructor() {
      super(); // always call super() first in the ctor.
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = `
        <b>I'm in shadow dom!</b>
        <slot></slot>
      `;
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

### Creación de elementos a partir de una `<template>` {: #fromtemplate}

Para aquellos que no lo conozcan, el [elemento `<template>`](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element) permite declarar fragmentos de DOM que se analizan, permanecen inactivos durante la carga de la página y se pueden activar más adelante en el tiempo de ejecución. Es otra primitiva de API de la familia de componentes web. **Las plantillas son marcadores de posición ideales para declarar la estructura de un elemento personalizado**.

**Ejemplo;** cómo registrar un elemento con contenido de Shadow DOM creado a partir de un elemento `<template>`:

    <template id="x-foo-from-template">
      <style>
        p { color: orange; }
      </style>
      <p>I'm in Shadow DOM. My markup was stamped from a &lt;template&gt;.</p>
    </template>
    
    <script>
      customElements.define('x-foo-from-template', class extends HTMLElement {
        constructor() {
          super(); // always call super() first in the ctor.
          let shadowRoot = this.attachShadow({mode: 'open'});
          const t = document.querySelector('#x-foo-from-template');
          const instance = t.content.cloneNode(true);
          shadowRoot.appendChild(instance);
        }
        ...
      });
    </script>
    

Estas pocas líneas de código tienen una gran capacidad. Analicemos las principales eventos que tienen lugar:

1. Se define un nuevo elemento en HTML: `<x-foo-from-template>`
2. El Shadow DOM del elemento se crea a partir de un elemento `<template>`
3. El DOM del elemento es local para el elemento gracias a Shadow DOM
4. La CSS interna del elemento se aplica a este gracias a Shadow DOM.

{% framebox height="100px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}

.demoarea::before {
  content: 'DEMO';
  display: block;
}
</style>

<div class="demoarea">
  <x-foo-from-template></x-foo-from-template>
</div>

<template id="x-foo-from-template">
  <style>:host p { color: orange; }</style>
  <p>I'm in Shadow DOM. My markup was stamped from a &lt;template&gt;.</p>
</template>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-from-template', class extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({mode: 'open'});
      const t = document.querySelector('#x-foo-from-template');
      shadowRoot.appendChild(t.content.cloneNode(true));
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

## Cómo aplicar estilo a un elemento personalizado {: #styling}

Incluso cuando tu elemento define su propio estilo usando Shadow DOM, los usuarios pueden
aplicar estilo a tu elemento personalizado desde sus páginas. Esos estilos se denominan “estilos definidos por el usuario”.


    <!-- user-defined styling -->
    <style>
      app-drawer {
        display: flex;
      }
      panel-item {
        transition: opacity 400ms ease-in-out;
        opacity: 0.3;
        flex: 1;
        text-align: center;
        border-radius: 50%;
      }
      panel-item:hover {
        opacity: 1.0;
        background: rgb(255, 0, 255);
        color: white;
      }
      app-panel > panel-item {
        padding: 5px;
        list-style: none;
        margin: 0 7px;
      }
    </style>
    
    <app-drawer>
      <panel-item>Do</panel-item>
      <panel-item>Re</panel-item>
      <panel-item>Mi</panel-item>
    </app-drawer>
    

Quizá te preguntes cómo funciona la especificidad de la CSS si el elemento tiene
estilos definidos en Shadow DOM. En términos de especificidad, prevalecen los estilos del usuario.
Siempre anularán los estilos definidos por el elemento. Consulta la sección [Creación de un elemento que use Shadow DOM](#shadowdom).

### Cómo aplicar estilo preliminar a elementos sin registrar {: #prestyle}

Antes de que un elemento se [actualice](#upgrades), puedes apuntar a él en la CSS usando la seudoclase `:defined`.
Esto resulta útil para aplicar estilo preliminar a un componente. Por ejemplo, quizá desees evitar
el diseño u otro FOUC visual ocultando los componentes sin definir y aplicándoles difuminación de entrada
cuando se vuelvan definidos.

**Ejemplo**; oculta `<app-drawer>` antes de que se defina:


    app-drawer:not(:defined) {
      /* Pre-style, give layout, replicate app-drawer's eventual styles, etc. */
      display: inline-block;
      height: 100vh;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
    

Una vez que se define `<app-drawer>`, el selector (`app-drawer:not(:defined)`)
deja de coincidir.

## Detalles varios {: #details}

### Elementos desconocidos frente a elementos personalizados sin definir {: #unknown}

El lenguaje HTML resulta flexible para trabajar. Por ejemplo, si declaras `<randomtagthatdoesntexist>` en una página el navegador lo aceptará sin problemas. ¿Por qué funcionan las etiquetas no estándares? Porque la [especificación de HTML](https://html.spec.whatwg.org/multipage/dom.html#htmlunknownelement) lo permite. Los elementos que la especificación no define se analizan como `HTMLUnknownElement`.

No ocurre lo mismo con los elementos personalizados. Los posibles elementos personalizados se analizan como
un `HTMLElement` si se crean con un nombre válido (se incluye “-”). Puedes comprobar esto en un navegador que admita elementos personalizados. Pon en marcha la consola: <span class="kbd">Ctrl</span>+<span class="kbd">Shift</span>+<span class="kbd">J</span> (o <span class="kbd">Cmd</span>+<span class="kbd">Opt</span>+<span class="kbd">J</span> en Mac) y pega las siguientes líneas de código:


    // "tabs" is not a valid custom element name
    document.createElement('tabs') instanceof HTMLUnknownElement === true
    
    // "x-tabs" is a valid custom element name
    document.createElement('x-tabs') instanceof HTMLElement === true
    

## Referencia de la API

`customElements` global define métodos útiles para trabajar con elementos personalizados.

**`define(tagName, constructor, options)`**

Define un nuevo elemento personalizado en el navegador.

Ejemplo


    customElements.define('my-app', class extends HTMLElement { ... });
    customElements.define(
      'fancy-button', class extends HTMLButtonElement { ... }, {extends: 'button'});
    

**`get(tagName)`**

Cuando se proporciona un nombre de etiqueta válido a un elemento personalizado, se muestra el constructor del elemento. Si no se registró una
definición para el elemento, se muestra `undefined`.

Ejemplo


    let Drawer = customElements.get('app-drawer');
    let drawer = new Drawer();
    

**`whenDefined(tagName)`**

Muestra una Promesa que se resuelve cuando se define el elemento personalizado. Si ya se definió
el elemento, se resuelve de inmediato. Se rechaza si el nombre de la etiqueta no es un
nombre de elemento personalizado válido.

Ejemplo


    customElements.whenDefined('app-drawer').then(() => {
      console.log('ready!');
    });
    

## Historial y compatibilidad del navegador {: #historysupport}

Si has estado al tanto de los componentes web durante los últimos años, sabrás que en
Chrome 36 (y versiones posteriores) se implementó una versión de la Custom Elements API en la cual se usa `document.registerElement()`
en lugar de `customElements.define()`. Hoy se considera una versión en desuso de
la estándar, llamada v0. `customElements.define()` es el nuevo atractivo y lo que
los proveedores de navegadores están comenzando a implementar. Se llama Custom Elements v1.

Si estás interesado en la especificación anterior de v0, lee el [artículo html5rocks](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/){: .external }.

### Compatibilidad con navegadores

Chrome 54 ([estado](https://www.chromestatus.com/features/4696261944934400)) tiene Custom Elements v1. Safari tiene [comenzó con prototipos](https://bugs.webkit.org/show_bug.cgi?id=150225) y puedes probar la API en WebKit de noche. En el caso de Edge, se ha [iniciado el desarrollo de prototipos](https://twitter.com/AaronGustafson/status/717028669948977153). En el caso de Mozilla, existe un [error publicado](https://bugzilla.mozilla.org/show_bug.cgi?id=889230) para el que se requiere implementación.

Para detectar elementos personalizados, verifica la presencia de `window.customElements`:


    const supportsCustomElementsV1 = 'customElements' in window;
    

#### Polyfill {: #polyfill}

Hasta que haya compatibilidad general con navegadores, hay un [polyfill](https://github.com/webcomponents/custom-elements/blob/master/custom-elements.min.js) disponible. 

**Nota**: la pseudoclase `:defined` de CSS no puede tener polyfill.

Instálalo:

    bower install --save webcomponents/custom-elements

Uso:


    function loadScript(src) {
     return new Promise(function(resolve, reject) {
       const script = document.createElement('script');
       script.src = src;
       script.onload = resolve;
       script.onerror = reject;
       document.head.appendChild(script);
     });
    }
    
    // Lazy load the polyfill if necessary.
    if (!supportsCustomElementsV1) {
      loadScript('/bower_components/custom-elements/custom-elements.min.js').then(e => {
        // Polyfill loaded.
      });
    } else {
      // Native support. Good to go.
    }
    

## Conclusión

Los elementos personalizados nos proporcionan una nueva herramienta para definir etiquetas HTML nuevas en el navegador y crear componentes
reutilizables. Cuando se combinan con las demás primitivas de la nueva plataforma, como Shadow DOM y `<template>`, se puede comenzar a ver el panorama general de Web Components:

- Es compatible con varios navegadores (estándar de la Web) para crear y extender componentes reutilizables.
- No requiere una biblioteca ni framework para comenzar. ¡JS/HTML clásicos por la victoria!
- Proporciona un modelo de programación conocido. Es simplemente DOM/CSS/HTML.
- Funciona bien con otra plataforma web nueva (Shadow DOM, `<template>`, propiedades personalizadas de CSS, etc.).
- Se integra por completo con DevTools del navegador.
- Permite aprovechar las características de accesibilidad existentes.

[spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/


{# wf_devsite_translation #}
