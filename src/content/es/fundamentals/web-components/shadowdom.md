project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Shadow DOM les permite a los programadores crear DOM y CSS compartimentados para componentes web

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-08-01 #}

# Shadow DOM v1: Componentes web independientes {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc}

Shadow DOM elimina la fragilidad en la creación de aplicaciones web. La fragilidad
viene de la naturaleza global de los HTML, CSS y JS. Con el paso de los años, hemos
inventado una exorbitante [cantidad](http://getbem.com/introduction/) 
[de](https://github.com/css-modules/css-modules)
[herramientas](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)
par evadir los problemas. Por ejemplo, cuando usas un nuevo id/clase de HTML,
no se puede identificar si estará en conflicto con un nombre existente que use la página.
[Los errores sutiles](http://www.2ality.com/2012/08/ids-are-global.html) se acumulan,
la especificidad de CSS se convierte en un gran problema (`!important` todo), los selectores
de estilo se van de control, y
[se puede perjudicar el rendimiento](/web/updates/2016/06/css-containment). La lista
continúa.

**Shadow DOM soluciona los problemas de CSS y DOM**. Introduce **estilos acotados** en la plataforma
web. Sin herramientas ni convenciones para aplicar nombres, puedes **agrupar los CSS con
lenguaje de marcado**, ocultar los detalles de implementación y **crear componentes
autocontenidos** en JavaScript clásico.

## Introducción {: #intro}

Note: **¿Ya conoces Shadow DOM?** Este artículo describe las especificaciones del nuevo
<a href="http://w3c.github.io/webcomponents/spec/shadow/" target="_blank">
Shadow DOM v1</a>. Si has usado Shadow DOM, es posible que estés
familiarizado con la<a href="https://www.chromestatus.com/features/4507242028072960">
versión v0 se envió en Chrome 35</a>, y los polyfills webcomponents.js.
Los conceptos son los mismos, pero la especificación de v1 tiene grandes diferencias de API. Es
también la versión que todos los navegadores más importantes han acordado implementar, con
implementaciones que ya se encuentran en Safari Tech Preview y Chrome Canary. Continúa leyendo
para conocer las novedades, o consulta la sección sobre <a href="#historysupport">
la historia y la compatibilidad de los navegadores</a> para obtener más información.

Shadow DOM es uno de los cuatro estándares de componentes web: 
[plantillas de HTML](https://www.html5rocks.com/en/tutorials/webcomponents/template/),
[Shadow DOM][sd_spec_whatwg],
[elementos personalizados](/web/fundamentals/getting-started/primers/customelements) e
[importaciones de HTML](https://www.html5rocks.com/en/tutorials/webcomponents/imports/).

No es necesario desarrollar componentes web que usen shadow DOM. Pero cuando lo haces,
aprovechas sus beneficios (alcance de CSS, encapsulación del DOM,
composición) y compilas
[elementos personalizados](/web/fundamentals/getting-started/primers/customelements) reutilizables,
que son resistentes, muy configurables y reutilizables. Si los elementos
personalizados son la forma de crear un nuevo HTML (con una API JS), shadow DOM es la
forma en que le brindas su HTML y CSS. Las dos APIs se combinan para formar un componente
con JavaScript, CSS y HTML autocontenidos.

Shadow DOM está diseñado como una herramienta para crear apps basadas en componentes. Por lo tanto,
tiene soluciones para problemas comunes del desarrollo web:

- **DOM aislado**: El DOM de un componente es autocontenido (p.ej., 
  `document.querySelector()` no muestra nodos en el shadow DOM del componente).
- **CSS con ámbito**: la CSS definida dentro de shadow DOM está acotado al DOM. Las reglas de estilo 
 no filtran y los estilos de página no se infiltran.
- **Composición**: Diseña una API declarativa basada en lenguaje de marcado para tu componente.
- **Simplifica CSS**: el DOM dentro del ámbito significa que puedes usar simples selectores de CSS, nombres de id/clase 
  más genéricos, y no preocuparte por conflictos de nombres.
- **Productividad**: piensa en apps en fragmentos del DOM en lugar de una gran 
 página (global).

Note: A pesar de que puedes usar la API de shadow DOM y sus beneficios fuera de los componentes
web, solo me concentraré en ejemplos sobre la base de elementos personalizados.
Usaré la API v1 para elementos personalizados en todos los ejemplos.


#### Demostración de `fancy-tabs` {: #demo}

En este artículo, haré referencia a un componente de demostración (`<fancy-tabs>`)
y a fragmentos de código de este. Si tu navegador es compatible con las APIs, deberías
ver una demostración en vivo a continuación. Si no, consulta la fuente completa 
<a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">
en Github</a>.

<figure class="demoarea">
  <iframe style="height:360px;width:100%;border:none" src="https://rawgit.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b/raw/fancy-tabs-demo.html"></iframe>
  <figcaption>
    <a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">
      Ver el origen en GitHub
    </a>
  </figcaption>
</figure>

## ¿Qué es shadow DOM? {: #what}

#### Contexto de DOM {: #sdbackground}

El lenguaje HTML alimenta toda la Web porque es fácil de usar. Declarando algunas etiquetas, puedes
crear una página en segundos que tenga presentación y estructura. Sin embargo,
el HTML por su cuenta no es nada útil. Es sencillo para los humanos comprender un lenguaje basada
en texto, pero las máquinas necesitan algo más. Ingresa el Modelo
de objeto del documento, o DOM.

Cuando el navegador carga una página web, realiza muchísimas acciones interesantes. Una de
las cosas que hace es transformar el HTML del autor en un documento vivo.
Básicamente, para comprender la estructura de la página, el navegador analiza el HTML (cadenas
estáticas de texto) en un modelo de datos (objetos/nodos). El navegador preserva la
jerarquía de HTML creando un árbol de estos nodos: el DOM. Lo genial
del DOM es que es una representación viva de tu página. A diferencia del HTML
estático que creamos, los nodos producidos por navegador contienen propiedades, métodos y, lo mejor
de todo, se los puede manipular con programas. Es por esto que podemos crear elementos del
DOM directamente usando JavaScript:


    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Hello world!';
    header.appendChild(h1);
    document.body.appendChild(header);
    

produce el siguiente lenguaje de marcado de HTML:


    <body>
      <header>
        <h1>Hello DOM</h1>
      </header>
    </body>
    

Todo eso está bien y es bueno. Entonces, ¿
[qué diablos es _shadow DOM_](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/)?

#### DOM... en las sombras {: #sddom}

Un shadow DOM es lo mismo que un DOM normal, pero con dos diferencias: 1) cómo se crea/usa y
2) cómo se comporta en relación con el resto de la página. Normalmente, creas nodos del
DOM y los agregas como secundarios de otro elemento. Con shadow DOM,
creas un árbol del DOM dentro del ámbito, adherido al elemento, pero separado de su
secundario real. Este subárbol con ámbito se llama **shadow tree** (árbol en las sombras). El elemento
está adherido a su **shadow host** (host en las sombras). Todo lo que agregues en las sombras se hace
local para el elemento de hosting, incluido el `<style>`. Así es como shadow DOM
logra acotar el ámbito de estilo de CSS.

## Cómo crear un shadow DOM {: #create}

Un **shadow root** (raíz en las sombras) es un fragmento de documento que se adhiere al elemento de un “host”.
El acto de adherir un shadow root es la forma en que el elemento gana su shadow DOM. Para
crear shadow DOM para un elemento, llama a `element.attachShadow()`:


    const header = document.createElement('header');
    const shadowRoot = header.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>'; // Could also use appendChild().
    
    // header.shadowRoot === shadowRoot
    // shadowRoot.host === header
    

Estoy usando `.innerHTML` para completar shadow root, pero también podrías usar otras APIs
del DOM. Estamos trabajando en la Web. Tenemos opciones.

La especificación [define una lista de elementos](http://w3c.github.io/webcomponents/spec/shadow/#h-methods)
que no puede alojar un shadow tree. Existen varios motivos por los que un elementos puede estar
en la lista:

- El navegador ya aloja su propio shadow DOM interno para el elemento 
  (`<textarea>`, `<input>`).
- No tiene sentido que el elemento aloje un shadow DOM (`<img>`).

Por ejemplo, esto no funciona:


    document.createElement('input').attachShadow({mode: 'open'});
    // Error. `<input>` cannot host shadow dom.
    

### Cómo crear un shadow DOM para un elemento personalizado {: #elements}

Shadow DOM es particularmente útil para crear
[elementos personalizados](/web/fundamentals/getting-started/primers/customelements).
Usa shadow DOM para compartimentar el HTML, CSS y JS de un elemento, mientras se
produce un "componente web".

**Ejemplo**: un elemento personalizado **adhiere a shadow DOM a sí mismo**,
encapsulando sus DOM/CSS:

    // Use custom elements API v1 to register a new HTML tag and define its JS behavior
    // using an ES6 class. Every instance of <fancy-tab> will have this same prototype.
    customElements.define('fancy-tabs', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.

        // Attach a shadow root to <fancy-tabs>.
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
          <style>#tabs { ... }</style> <!-- styles are scoped to fancy-tabs! -->
          <div id="tabs">...</div>
          <div id="panels">...</div>
        `;
      }
      ...
    });

En este ejemplo tienen lugar varias cosas interesantes. En primer lugar, el
elemento personalizado **crea su propio shadow DOM** cuando se crea una instancia de `<fancy-tabs>`
. Esto se lleva a cabo en `constructor()`. En segundo lugar, como creamos
una shadow root, las reglas de CSS dentro del `<style>` se encontrarán dentro del ámbito de `<fancy-tabs>`.

Note: Cuando intentes ejecutar este ejemplo, probablemente notes que no aparece
nada. El lenguaje de marcado del usuario parece desaparecer. Eso sucede porque el **shadow DOM
del elemento aparece en lugar de sus secundarios**. Si quieres mostrar los
secundarios, tienes que decirle al navegador dónde mostrarlos, colocando un
[`<slot>` elemento](#slots) en tu shadow DOM. Más sobre eso
[más adelante](#composition_slot).


## Composición y elementos slot {: #composition_slot}

La composición es una de las funciones menos comprendidas de shadow DOM, pero
dudamos que sea la más importante.

En nuestro mundo de desarrollo web, la composición es cómo construimos apps,
en forma declarativa, partiendo de HTML. Distintos bloques de compilación (`<div>`s, `<header>`s,
`<form>`s, `<input>`s) se unen para formar apps. Algunas de estas etiquetas incluso funcionan
las unas con las otras. La composición es el motivo por el que los elementos nativos como `<select>`,
`<details>`, `<form>` y `<video>` son tan flexibles. Cada una de esas etiquetas acepta
ciertos HTML como secundarios y hace algo especial con ellos. Por ejemplo,
`<select>` sabe cómo representar `<option>` y `<optgroup>` en widgets desplegables y
de selección múltiple. El elemento `<details>` representa `<summary>`como una
flecha expandible. Incluso `<video>` sabe cómo lidiar con ciertos elementos secundarios: los elementos
`<source>` no se representan, pero sí afectan al comportamiento del video.
¡Es mágico!

### Terminología: light DOM y shadow DOM {: #lightdom}

La composición de Shadow DOM introduce un grupo de nuevos aspectos básicos del desarrollo
web. Antes de abrumarnos, estandaricemos algo de
terminología para que hablemos en la misma jerga.

**Light DOM**

Es el lenguaje de marcado que escribe un usuario de tu componente. El DOM vive afuera del
shadow DOM del componente. Consta de los campos secundarios reales del elemento.


    <button is="better-button">
      <!-- the image and span are better-button's light DOM -->
      <img src="gear.svg" slot="icon">
      <span>Settings</span>
    </button>
    

**Shadow DOM**

Es el DOM que escribe el autor del componente. Shadow DOM es local del componente y
define su estructura interna, CSS con ámbito, y encapsula tus detalles
de implementación. También puede definir cómo representar el lenguaje de marcado que creó el consumidor
de tu componente.


    #shadow-root
      <style>...</style>
      <slot name="icon"></slot>
      <span id="wrapper">
        <slot>Button</slot>
      </span>
    

**Árbol del DOM plano**

El resultado de que el navegador distribuya el light DOM del usuario en tu shadow
DOM, representando el producto final. El árbol plano es lo que en última instancia ves
en las DevTools y lo que se representa en la página.


    <button is="better-button">
      #shadow-root
        <style>...</style>
        <slot name="icon">
          <img src="gear.svg" slot="icon">
        </slot>
        <slot>
          <span>Settings</span>
        </slot>
    </button>
    

### El elemento &lt;slot&gt; {: #slots}

Shadow DOM compone distintos DOM trees usando el elemento `<slot>`.
**Los slots son marcadores de posición dentro de tu componente, que los usuarios _pueden_ rellenar con su
propio lenguaje de marcado**. Al definir uno o más slots, invitas al lenguaje de marcado externo a representar
en el shadow DOM de tu componente. Esencialmente, estás diciendo _«Representa el lenguaje de marcado
del usuario aquí»_.

Note: Los slots son una forma de crear una "API declarativa" para un componente web. Se
mezclan en el DOM del usuario para ayudar a representar el componente general, **componiendo así
distintos DOM trees juntos**.


Los elementos pueden "cruzar" el límite de shadow DOM cuando un `<slot>` los
invita. Estos elementos se denominan **nodos distribuidos**. Conceptualmente,
los nodos distribuidos puedes resultar bizarros. Los slots no mueven físicamente el DOM; sino que
representan otra ubicación dentro del shadow DOM.

Un componente puede definir en su shadow DOM un número de slots de cero o adelante. Los slots pueden estar vacíos
o brindar contenido de reserva. Si el usuario no brinda contenido de [light DOM](#lightdom)
, el slot representa su contenido de reserva.


    <!-- Default slot. If there's more than one default slot, the first is used. -->
    <slot></slot>
    
    <slot>Fancy button</slot> <!-- default slot with fallback content -->
    
    <slot> <!-- default slot entire DOM tree as fallback -->
      <h2>Title</h2>
      <summary>Description text</summary>
    </slot>
    

También puedes crear **slots con nombre**. Los mencionados slots son huecos específicos en tu
shadow DOM a los que los usuarios hacen referencia por el nombre.

**Ejemplo**: slots con nombre en el shadow DOM de `<fancy-tabs>`.


    #shadow-root
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    

Los usuarios de componentes declaran `<fancy-tabs>` de la siguiente manera:


    <fancy-tabs>
      <button slot="title">Title</button>
      <button slot="title" selected>Title 2</button>
      <button slot="title">Title 3</button>
      <section>content panel 1</section>
      <section>content panel 2</section>
      <section>content panel 3</section>
    </fancy-tabs>
    
    <!-- Using <h2>'s and changing the ordering would also work! -->
    <fancy-tabs>
      <h2 slot="title">Title</h2>
      <section>content panel 1</section>
      <h2 slot="title" selected>Title 2</h2>
      <section>content panel 2</section>
      <h2 slot="title">Title 3</h2>
      <section>content panel 3</section>
    </fancy-tabs>
    

Y si te lo preguntas, el árbol plano luce así:


    <fancy-tabs>
      #shadow-root
        <div id="tabs">
          <slot id="tabsSlot" name="title">
            <button slot="title">Title</button>
            <button slot="title" selected>Title 2</button>
            <button slot="title">Title 3</button>
          </slot>
        </div>
        <div id="panels">
          <slot id="panelsSlot">
            <section>content panel 1</section>
            <section>content panel 2</section>
            <section>content panel 3</section>
          </slot>
        </div>
    </fancy-tabs>
    

Nota que nuestro componente puede controlar distintas configuraciones, pero el
DOM tree plano permanece igual. También podemos cambiar de `<button>` a
`<h2>`. Este componente fue creado para controlar distintos tipos de elementos secundarios,
como lo hace `<select>`.

## Estilos {: #styling}

Hay muchas opciones de estilo para los componentes web. Un componente que usa shadow
DOM puede recibir estilo de la página principal, definir sus propios estilos o brindar enlaces (en
forma de [propiedades CSS personalizadas][css_props]) para que los usuarios anulen los predeterminados.

### Estilos definidos por el componente {: #host}

Sin lugar a dudas, la función más útil de los shadow DOM es **CSS acotado**:

- Los selectores de CSS de la página exterior no se aplican dentro de tu componente.
- Los estilos definidos dentro del componente no influyen en el exterior. Tienen un ámbito fijado en el elemento host.

**Los selectores de CSS que se usan dentro de un shadow DOM influyen en tu componente de forma local**.  En
la práctica, esto significa que podemos usar de nuevo nombres de id/clase comunes, sin preocuparte
por los conflictos de otra parte de la página. Los selectores más simples de CSS son una buena práctica
dentro del Shadow DOM. También contribuyen al rendimiento.

**Ejemplo**: los estilos definidos en una shadow root son locales.


    #shadow-root
      <style>
        #panels {
          box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
          background: white;
          ...
        }
        #tabs {
          display: inline-flex;
          ...
        }
      </style>
      <div id="tabs">
        ...
      </div>
      <div id="panels">
        ...
      </div>
    

Las hojas de estilo también tienen un ámbito fijado en el shadow tree:


    #shadow-root
      <!-- Available in Chrome 54+ -->
      <!-- WebKit bug: https://bugs.webkit.org/show_bug.cgi?id=160683 -->
      <link rel="stylesheet" href="styles.css">
      <div id="tabs">
        ...
      </div>
      <div id="panels">
        ...
      </div>
    

Incluso pregúntate cómo el elemento `<select>` representa un widget de selección múltiple (en lugar de
un menú desplegable) cuando agregas el atributo `multiple`:

<select multiple>
  <option>Do</option>
  <option selected>Re</option>
  <option>Mi</option>
  <option>Fa</option>
  <option>Sol</option>
</select>

`<select>` puede darse estilo _a sí mismo_ de otra forma según los atributos que
declaras en él. Los componentes web pueden darse estilo también, usando el selector `:host`
.

**Ejemplo**: un componente que define su propio estilo.


    <style>
    :host {
      display: block; /* by default, custom elements are display: inline */
      contain: content; /* CSS containment FTW. */
    }
    </style>
    

Una trampa con `:host` es que las reglas de la página principal tienen más especificidad
que las reglas de `:host` definidas en el elemento. Esto significa que los estilos exteriores tienen prioridad. Esto
les permite a los usuarios anular tu estilo de primer nivel desde afuera. Además, `:host`
solo funciona en el contexto de una shadow root, así que no puedes usarlo fuera de
shadow DOM.

El formulario funcional de `:host(<selector>)` te permite apuntar al host si
coincide con un `<selector>`. Esta es una excelente forma para que tu componente encapsule
los comportamientos que reaccionan a la interacción o estado del usuario o le dan estilo a los nodos internos según
el host.


    <style>
    :host {
      opacity: 0.4;
      will-change: opacity;
      transition: opacity 300ms ease-in-out;
    }
    :host(:hover) {
      opacity: 1;
    }
    :host([disabled]) { /* style when host has disabled attribute. */
      background: grey;
      pointer-events: none;
      opacity: 0.4;
    }
    :host(.blue) {
      color: blue; /* color host when it has class="blue" */
    }
    :host(.pink) > #tabs {
      color: pink; /* color internal #tabs node when host has class="pink". */
    }
    </style>
    

### Estilos basados en contexto {: #contextstyling}

`:host-context(<selector>)` coincide con el componente si él o cualquiera de sus antecesores
coinciden con `<selector>`. Un uso común de esto es la app de temas según el entorno
de un componente. Por ejemplo, muchas personas aplican temas aplicando una clase a
`<html>` o `<body>`:


    <body class="darktheme">
      <fancy-tabs>
        ...
      </fancy-tabs>
    </body>
    

`:host-context(.darktheme)` le aplicaría estilo a `<fancy-tabs>` cuando es descendiente
de `.darktheme`:


    :host-context(.darktheme) {
      color: white;
      background: black;
    }
    

`:host-context()` puede ser útil para aplicar temas, pero un acercamiento aun mejor es
[crear enlaces de estilo usando propiedades personalizadas de CSS](#stylehooks).

### Estilos de nodos distribuidos {: #stylinglightdom}

`::slotted(<compound-selector>)` coincide con los nodos que se distribuyen en un
`<slot>`.

Supongamos que hemos creado un componente identificador:


    <name-badge>
      <h2>Eric Bidelman</h2>
      <span class="title">
        Digital Jedi, <span class="company">Google</span>
      </span>
    </name-badge>
    

El shadow DOM del componente puede definir el estilo de `<h2>` y `.title` del usuario:


    <style>
    ::slotted(h2) {
      margin: 0;
      font-weight: 300;
      color: red;
    }
    ::slotted(.title) {
       color: orange;
    }
    /* DOESN'T WORK (can only select top-level nodes).
    ::slotted(.company),
    ::slotted(.title .company) {
      text-transform: uppercase;
    }
    */
    </style>
    <slot></slot>
    

Como mencioné anteriormente, los `<slot>` no trasladan el light DOM del usuario. Cuando
los nodos se distribuyen en un `<slot>`, el `<slot>` representa su DOM, pero los
nodos quedan físicamente quietos. **Los estilos que se aplicaron antes de la distribución siguen
aplicados después de la distribución**. Sin embargo, cuando el light DOM se distribuye, _puede_
implementar estilos adicionales (los definidos por el shadow DOM).

A continuación, se muestra otro ejemplo más detallado de `<fancy-tabs>`:


    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        #panels {
          box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
          background: white;
          border-radius: 3px;
          padding: 16px;
          height: 250px;
          overflow: auto;
        }
        #tabs {
          display: inline-flex;
          -webkit-user-select: none;
          user-select: none;
        }
        #tabsSlot::slotted(*) {
          font: 400 16px/22px 'Roboto';
          padding: 16px 8px;
          ...
        }
        #tabsSlot::slotted([aria-selected="true"]) {
          font-weight: 600;
          background: white;
          box-shadow: none;
        }
        #panelsSlot::slotted([aria-hidden="true"]) {
          display: none;
        }
      </style>
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    `;
    

En este ejemplo, hay dos slots: un slot nombrado para los títulos de las pestañas, un slot
nombrado para el contenido de las pestañas. Cuando el usuario selecciona una pestaña, ponemos en negrita su selección
y revelamos su panel. Eso se logra seleccionando nodos distribuidos que tienen el atributo
`selected`. El JS del elemento personalizado (que no se muestra aquí) agrega ese
atributo en el momento correcto.

### Cómo definir el estilo de un componente desde el exterior {: #stylefromoutside}

Hay varias formas de definir el estilo de un componente desde el exterior. La forma
más sencilla es usar el nombre de la etiqueta como selector:


    fancy-tabs {
      width: 500px;
      color: red; /* Note: inheritable CSS properties pierce the shadow DOM boundary. */
    }
    fancy-tabs:hover {
      box-shadow: 0 3px 3px #ccc;
    }
    

**Los estilos externos son más importantes que los estilos definidos en el shadow DOM**. Por ejemplo,
si el usuario escribe el selector `fancy-tabs { width: 500px; }`, destruirá
la regla del componente: `:host { width: 650px;}`.

No será suficiente con definir el estilo propio del componente. Pero, ¿qué sucede si
quieres darle estilo a las partes internas de un componente? Para eso, necesitamos propiedades
personalizadas de CSS.

#### Cómo crear enlaces de estilo mediante las propiedades personalizadas de CSS {: #stylehooks}

Los usuarios pueden retocar estilos internos si el autor del componente brinda enlaces de estilo
usando [propiedades personalizadas de CSS][css_props]. Conceptualmente, la idea es similar a
`<slot>`. Se crean “marcadores de posición de estilo” que los usuarios pueden anular.

**Ejemplo**: `<fancy-tabs>` permite a los usuarios anular el color de fondo.


    <!-- main page -->
    <style>
      fancy-tabs {
        margin-bottom: 32px;
        --fancy-tabs-bg: black;
      }
    </style>
    <fancy-tabs background>...</fancy-tabs>
    

Adentro de su shadow DOM:


    :host([background]) {
      background: var(--fancy-tabs-bg, #9E9E9E);
      border-radius: 10px;
      padding: 10px;
    }
    

En este caso, el componente usará `black` como valor de fondo ya que el
usuario lo brindó. De lo contrario, usaría el valor predeterminado `#9E9E9E`.

Note: Como autor del componente, eres responsable de informar a los programadores
sobre las propiedades personalizadas de CSS que pueden usar. Considéralo parte de la interfaz pública
de tu componente. ¡Asegúrate de documentar los enlaces de estilo!


## Conceptos avanzados {: #advanced}

### Cómo crear shadow root cerradas (debe evitarse) {: #closed}

Existe otra clase de shadow DOM llamada modo "cerrado". Cuando creas un
shadow tree cerrado, fuera de JavaScript no podrás acceder al DOM interno
de tu componente. Esto es similar al modo en que los elementos nativos como `<video>` funcionan.
JavaScript no puede acceder al shadow DOM de `<video>` porque el navegador
lo implementa usando una shadow root de modo cerrado.

**Ejemplo**: cómo crear un shadow tree cerrado:


    const div = document.createElement('div');
    const shadowRoot = div.attachShadow({mode: 'closed'}); // close shadow tree
    // div.shadowRoot === null
    // shadowRoot.host === div
    

Otras API también se ven afectadas por el modo cerrado:

- `Element.assignedSlot`/`TextNode.assignedSlot` muestra `null`.
- `Event.composedPath()` para eventos asociados con elementos dentro del shadow
  DOM, muestra []

Note: Las shadow root cerradas no son muy útiles. Algunos programadores verán el modo
cerrado como una función de seguridad artificial. Pero seamos claro, **no** es una
función de seguridad. El modo cerrado sencillamente evita que el JS externo explore el
DOM interno de un elemento.


Este es un resumen sobre por qué nunca deberías crear componentes web con
`{mode: 'closed'}`:

1. Sensación de seguridad artificial. Nada detiene a un atacante de
   perpetuar un secuestro `Element.prototype.attachShadow`.

2. el modo cerrado **evita que tu código de elemento personalizado acceda a su propio
   shadow DOM**. Un error absoluto. En cambio, tendrás que introducir una referencia
   para después si quieres usar cosas como `querySelector()`. ¡Esto elimina por completo 
   el objetivo original del modo cerrado!

        customElements.define('x-element', class extends HTMLElement {
          constructor() {
            super(); // always call super() first in the ctor.
            this._shadowRoot = this.attachShadow({mode: 'closed'});
            this._shadowRoot.innerHTML = '<div class="wrapper"></div>';
          }
          connectedCallback() {
            // When creating closed shadow trees, you'll need to stash the shadow root
            // for later if you want to use it again. Kinda pointless.
            const wrapper = this._shadowRoot.querySelector('.wrapper');
          }
          ...
        });

3. **Closed mode makes your component less flexible for end users**. A medida que
   compilas componentes web, llegará un momento en que olvidarás agregar una
   función. una opción de configuración o un caso de uso que el usuario necesite. Un ejemplo 
   común es olvidar incluir enlaces de estilo adecuados para nodos internos.
   Con el modo cerrado, no hay forma de que los usuarios anulen los predeterminados y retoquen
   estilos. Es muy útil poder tener acceso al interior del componente.
   Finalmente, los usuarios bifurcarán tu componente, encontrarán otro o crearán el suyo
   propio si no hace lo que ellos quieren :(

### Trabajar con slots en JS {: #workwithslots}

La API del shadow DOM brinda utilidades para trabajar con slots y nodos
distribuidos. Son útiles cuando desarrollas un elemento personalizado.

#### Evento slotchange {: #slotchange}

El evento `slotchange` se activa cuando cambian los nodos distribuidos de un slot. Por
ejemplo, si el usuario agrega/quita el secundario del light DOM.


    const slot = this.shadowRoot.querySelector('#slot');
    slot.addEventListener('slotchange', e => {
      console.log('light dom children changed!');
    });
    
Note: `slotchange` does not fire when an instance of the component is
first initialized.

Para monitorear otros tipos de cambios a light DOM, puedes configurar un
[`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
en el constructor de tu elemento.

#### ¿Cuáles son los elementos que se representan en un slot? {: #slotnodes}

A menudo, resulta útil conocer los elementos asociados a un slot. Llama a
`slot.assignedNodes()` para encontrar qué elementos está representando el slot. La opción
`{flatten: true}` también mostrará el contenido de reserva de un slot (si no se están distribuyendo
nodos).

Por ejemplo, supongamos que tu shadow DOM tiene el siguiente aspecto:

    <slot><b>fallback content</b></slot>

<table>
  <thead><th>Uso</th><th>Llamada</th><th>Resultado</th></tr></thead>
  <tr>
    <td>&lt;button is="better-button"&gt;My button&lt;/button&gt;</td>
    <td><code>slot.assignedNodes();</code></td>
    <td><code>[text]</code></td>
  </tr>
  <tr>
    <td>&lt;button is="better-button">&lt;/button&gt;</td>
    <td><code>slot.assignedNodes();</code></td>
    <td><code>[]</code></td>
  </tr>
  <tr>
    <td>&lt;button is="better-button"&gt;&lt;/button&gt;</td>
    <td><code>slot.assignedNodes({flatten: true});</code></td>
    <td><code>[&lt;b&gt;fallback content&lt;/b&gt;]</code></td>
  </tr>
</table>

#### ¿A qué slot está asignado un elemento? {: #assignedslot}

También es posible responder la pregunta de reserva. `element.assignedSlot` te
dice a cuál de los slots de componente se asigna tu elemento.

### El modelo de eventos de Shadow DOM {: #events}

Cuando un evento surge del shadow DOM, se ajusta su objetivo para mantener la
encapsulación que brinda el shadow DOM. Es decir, se modifica el objetivo de los eventos para que
parezca que han salido del componente y no de elementos internos de tu
shadow DOM. Algunos eventos ni siquiera se propagan fuera del shadow DOM.

Los eventos que **sí** cruzan la frontera de la “sombra” son los siguientes:

- Eventos de foco: `blur`, `focus`, `focusin` y `focusout`.
- Eventos del mouse: `click`, `dblclick`, `mousedown`, `mouseenter`, `mousemove`, etc.
- Eventos de la rueda: `wheel`.
- Eventos de entrada: `beforeinput` e `input`
- Eventos de teclado: `keydown` y `keyup`
- Eventos de composición: `compositionstart`, `compositionupdate` y `compositionend`
- Eventos de arrastre: `dragstart`, `drag`, `dragend`, `drop`, etc.

**Sugerencias**

Si el shadow tree está abierto, llamar a `event.composedPath()` mostrará una amplia gama
de nodos por los que el evento viajó.

#### Cómo usar eventos personalizados {: #customevents}

Los eventos del DOM personalizados que se emiten en nodos internos de un shadow tree no
surgen del límite de shadow a menos que el evento se cree usando el marcador
`composed: true`:


    // Inside <fancy-tab> custom element class definition:
    selectTab() {
      const tabs = this.shadowRoot.querySelector('#tabs');
      tabs.dispatchEvent(new Event('tab-select', {bubbles: true, composed: true}));
    }
    

Si `composed: false` (predeterminado), los consumidores no podrán escuchar el evento
fuera de tu shadow root.


    <fancy-tabs></fancy-tabs>
    <script>
      const tabs = document.querySelector('fancy-tabs');
      tabs.addEventListener('tab-select', e => {
        // won't fire if `tab-select` wasn't created with `composed: true`.
      });
    </script>
    

### Cómo manejar el foco {: #focus}

Si recuerdas de [modelo de evento del shadow DOM](#events), los eventos que se disparan
dentro del shadow DOM se ajustan para que parezca que han salido del elemento de hosting.
Por ejemplo, supongamos que haces clic en un `<input>` dentro de una shadow root:


    <x-focus>
      #shadow-root
        <input type="text" placeholder="Input inside shadow dom">
    

El evento `focus` parecerá haber salido de `<x-focus>`, no de del `<input>`.
De manera similar, `document.activeElement` será el `<x-focus>`. Si la shadow root
se creó con `mode:'open'` (consulta [modo cerrado](#closed)), también
podrás acceder al nodo interno que ganó foco:

    document.activeElement.shadowRoot.activeElement // only works with open mode.

Si hay varios niveles de shadow DOM en juego (como un elemento personalizado dentro de
otro elemento personalizado), tienes que explorar las shadow roots para
encontrar el `activeElement`:


    function deepActiveElement() {
      let a = document.activeElement;
      while (a && a.shadowRoot && a.shadowRoot.activeElement) {
        a = a.shadowRoot.activeElement;
      }
      return a;
    }
    

Otra opción de foco es la opción `delegatesFocus: true`, que expande el
comportamiento del foco de los elementos dentro de un shadow tree:

- Si haces clic en un nodo dentro del shadow DOM y el nodo no es un área en la que se puede hacer foco,
  la primera área enfocable recibe el foco.
- Cuando un nodo dentro del shadow DOM recibe el foco, el `:focus` se aplica al host
  además del elemento con foco.

**Ejemplo**: cómo `delegatesFocus: true` modifica el comportamiento del foco


    <style>
      :focus {
        outline: 2px solid red;
      }
    </style>
    
    <x-focus></x-focus>
    
    <script>
    customElements.define('x-focus', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.
    
        const root = this.attachShadow({mode: 'open', delegatesFocus: true});
        root.innerHTML = `
          <style>
            :host {
              display: flex;
              border: 1px dotted black;
              padding: 16px;
            }
            :focus {
              outline: 2px solid blue;
            }
          </style>
          <div>Clickable Shadow DOM text</div>
          <input type="text" placeholder="Input inside shadow dom">`;
    
        // Know the focused element inside shadow DOM:
        this.addEventListener('focus', function(e) {
          console.log('Active element (inside shadow dom):',
                      this.shadowRoot.activeElement);
        });
      }
    });
    </script>
    

**Resultado**

<img src="imgs/delegateFocusTrue.png" title="delegatesFocus: true behavior">

Arriba está el resultado cuando `<x-focus>` recibe el foco (clic de usuario, en pestaña,
`focus()`, etc.), se hace clic en "texto del Shadow DOM al que se le hace clic", o el
`<input>` interno recibe foco (incluido el `autofocus`).

Si quisieras establecer `delegatesFocus: false`, esto es lo que deberías ver:

<figure>
  <img src="imgs/delegateFocusFalse.png">
  <figcaption>
    <code>delegatesFocus: false</code> y el <code>&lt;input></code> interno recibe el foco.
  </figcaption>
</figure>

<figure>
  <img src="imgs/delegateFocusFalseFocus.png">
  <figcaption>
    <code>delegatesFocus: false</code> y <code>&lt;x-focus></code>
    recibe el foco (p. ej., tiene <code>tabindex="0"</code>).
  </figcaption>
</figure>

<figure>
  <img src="imgs/delegateFocusNothing.png">
  <figcaption>
    <code>delegatesFocus: false</code> y se hace clic en "texto del Shadow DOM al que se le hace clic" 
    (o se le hace clic a otra área vacía dentro del shadow DOM del elemento).
  </figcaption>
</figure>

## Sugerencias y trucos {: #tricks}

Con el paso de los años, he aprendido algunas cosas sobre el desarrollo de componentes web. Yo
creo que algunas de estas sugerencias te resultarán útiles para crear componentes y
depurar shadow DOM.

### Usar la contención de CSS {: #containment}

Por lo general, los diseños, estilos o colores de un componente web son bastante independientes. Usa la
[contención de CSS](/web/updates/2016/06/css-containment) en `:host` para un resultado
satisfactorio:


    <style>
    :host {
      display: block;
      contain: content; /* Boom. CSS containment FTW. */
    }
    </style>
    

### Restablecer estilos heredables {: #reset}

Los estilos heredables (`background`, `color`, `font`, `line-height`, etc.) continúan
heredando en shadow DOM. Es decir, perforan el límite del shadow DOM de forma
predeterminada. Si quieres comenzar con una pizarra en blanco, usa `all: initial;` para restablecer
los estilos heredable a su valor inicial cuando cruzan el límite de shadow.


    <style>
      div {
        padding: 10px;
        background: red;
        font-size: 25px;
        text-transform: uppercase;
        color: white;
      }
    </style>
    
    <div>
      <p>I'm outside the element (big/white)</p>
      <my-element>Light DOM content is also affected.</my-element>
      <p>I'm outside the element (big/white)</p>
    </div>
    
    <script>
    const el = document.querySelector('my-element');
    el.attachShadow({mode: 'open'}).innerHTML = `
      <style>
        :host {
          all: initial; /* 1st rule so subsequent properties are reset. */
          display: block;
          background: white;
        }
      </style>
      <p>my-element: all CSS properties are reset to their
         initial value using <code>all: initial</code>.</p>
      <slot></slot>
    `;
    </script>

{% framebox height="195px" %}
<div class="demoarea">
  <style>
    #initialdemo {
      padding: 10px;
      background: red;
      font-size: 25px;
      text-transform: uppercase;
      color: white;
    }
  </style>

  <div id="initialdemo">
    <p>I'm outside the element (big/white)</p>
    <my-element>Light DOM content is also affected.</my-element>
    <p>I'm outside the element (big/white)</p>
  </div>
</div>

<script>
function supportsShadowDOM() {
  return !!HTMLElement.prototype.attachShadow;
}

if (supportsShadowDOM()) {
  const el = document.querySelector('#initialdemo my-element');
  el.attachShadow({mode: 'open'}).innerHTML = `
    <style>
      :host {
        all: initial; /* 1st rule so subsequent properties are reset. */
        display: block;
        background: white;
      }
    </style>
    <p>my-element: all CSS properties are reset to their
       initial value using <code>all: initial</code>.</p>
    <slot></slot>
  `;
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

### Encontrar todos los elementos personalizados que usa una página {: #findall}

A menudo, resulta útil buscar los elementos personalizados que usa una página. Para hacerlo,
tienes que recorrer de manera recursiva el shadow DOM de todos los elementos utilizados en la página.


    const allCustomElements = [];
    
    function isCustomElement(el) {
      const isAttr = el.getAttribute('is');
      // Check for <super-button> and <button is="super-button">.
      return el.localName.includes('-') || isAttr && isAttr.includes('-');
    }
    
    function findAllCustomElements(nodes) {
      for (let i = 0, el; el = nodes[i]; ++i) {
        if (isCustomElement(el)) {
          allCustomElements.push(el);
        }
        // If the element has shadow DOM, dig deeper.
        if (el.shadowRoot) {
          findAllCustomElements(el.shadowRoot.querySelectorAll('*'));
        }
      }
    }
    
    findAllCustomElements(document.querySelectorAll('*'));
    

{% comment %}
Algunos navegadores también soportan el uso del combinador `/deep/` de shadow DOM v0 en `querySelectorAll()`:


    const allCustomElements = Array.from(document.querySelectorAll('html /deep/ *')).filter(el => {
      const isAttr = el.getAttribute('is');
      return el.localName.includes('-') || isAttr && isAttr.includes('-');
    });
    

Por ahora, `/deep/` [continúa trabajando en llamadas de `querySelectorAll()`](https://bugs.chromium.org/p/chromium/issues/detail?id=633007).
{% endcomment %}

### Cómo crear elementos a partir de una &lt;template> {: #fromtemplate}

En lugar de mostrar una shadow root usando `.innerHTML`, podemos usar una 
`<template>` declarativa. Las plantillas son marcadores de posición ideales para declarar la estructura de
un componente web.

Consulta el ejemplo en 
["Elementos personalizados: compilación de componentes web reutilizables"](/web/fundamentals/getting-started/primers/customelements).

## Historia y compatibilidad de los navegadores {: #historysupport}

Si has estado siguiendo a los componentes web durante los últimos años, sabrás
que Chrome 35+/Opera han estado enviando una versión más vieja de shadow DOM durante
un buen tiempo. Blink seguirá soportando ambas versiones en paralelo durante un buen
tiempo. Las especificaciones de la v0 brindaron un método diferente para crear una shadow root
(`element.createShadowRoot` en lugar del `element.attachShadow` de la v1). Llamar al
método anterior sigue creando un shadow root con semantics de la v0, por eso el código
de la v0 existente no se romperá.

Si estás interesado en las especificaciones de la antigua v0, consulta los artículos
de html5rocks: 
[1](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/),
[2](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/),
[3](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/).
También hay una gran comparación de las 
[diferencias entre shadow DOM v0 y v1][differences].

### Compatibilidad con navegadores {: #support}

Chrome 53 ([estado](https://www.chromestatus.com/features/4667415417847808)), 
Opera 40 y Safari 10 envían shadow DOM v1. Edge se encuentra en consideración
[con gran prioridad](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/shadowdom/).
Mozilla tiene un [error abierto](https://bugzilla.mozilla.org/show_bug.cgi?id=811542)
para implementar.

Para detectar shadow DOM por medio de funciones, verifica si existe `attachShadow`:


    const supportsShadowDOMV1 = !!HTMLElement.prototype.attachShadow;
    

    
#### Polyfill {: #polyfill}

Hasta que el soporte del navegador esté totalmente disponible, los polyfills
[shadydom](https://github.com/webcomponents/shadydom) y 
[shadycss](https://github.com/webcomponents/shadycss) te brindan la función de la 
v1. Shady DOM imita al alcance del DOM de Shadow DOM y las propiedades personalizadas de CSS
de polyfills shadycss y el alcance del estilo que brinda la API nativa.

Instala los polyfills:

    bower install --save webcomponents/shadydom
    bower install --save webcomponents/shadycss

Utiliza los polyfills:


    function loadScript(src) {
     return new Promise(function(resolve, reject) {
       const script = document.createElement('script');
       script.async = true;
       script.src = src;
       script.onload = resolve;
       script.onerror = reject;
       document.head.appendChild(script);
     });
    }

    // Lazy load the polyfill if necessary.
    if (!supportsShadowDOMV1) {
      loadScript('/bower_components/shadydom/shadydom.min.js')
        .then(e => loadScript('/bower_components/shadycss/shadycss.min.js'))
        .then(e => {
          // Polyfills loaded.
        });
    } else {
      // Native shadow dom v1 support. Go to go!
    }


Consulta [https://github.com/webcomponents/shadycss#usage](https://github.com/webcomponents/shadycss)
para recibir instrucciones sobre cómo corregir la compatibilidad de/limitar tus estilos.


## Conclusión

Por primera vez, tenemos una primitiva de API que limita CSS y
limitación de DOM correctamente, y tiene verdadera composición. En combinación con otras APIs de componente web
como elementos personalizados, el shadow DOM brinda una forma de crear componentes
verdaderamente encapsulados sin modificaciones ni uso de bagaje como `<iframe>`.

No me malinterpreten. Sin lugar a dudas, el asunto de los shadow DOM es complejo. Pero
vale la pena aprenderlo. Dedícale tiempo. ¡Aprende a usarlo y haz preguntas!

#### Consultas adicionales

- [Diferencias entre shadow DOM v1 y v0][differences]
- ["Introducción a API de Shadow DOM basado en slot"](https://webkit.org/blog/4096/introducing-shadow-dom-api/)
  del blog de WebKit.
- [Los componentes web y el futuro del CSS modular](https://philipwalton.github.io/talks/2015-10-26/)
  de [Philip Walton](https://twitter.com/@philwalton)
- ["Elementos personalizados: compilación de componentes web reutilizables"](/web/fundamentals/getting-started/primers/customelements)
  de WebFundamentals de Google.
- [Especificaciones de Shadow DOM v1][sd_spec_whatwg]
- [Especificaciones de elementos personalizados v1][ce_spec]

## Preguntas frecuentes

**¿Puedo usar Shadow DOM v1 en la actualidad?**

Sí, con un polyfill. Consulta [Compatibilidad de los navegadores](#support).

**¿Cuáles son las funciones de seguridad que proporciona shadow DOM?**

Shadow DOM no es una función de seguridad. Es una herramienta liviana para acotar CSS
y ocultar árboles DOM en componentes. Si quieres un verdadero límite de seguridad,
usa un `<iframe>`.

**¿Debe un componente web usar shadow DOM?**

¡No! No es necesario desarrollar componentes web que usen shadow DOM. Sin embargo,
la creación de [elementos personalizados que usan Shadow DOM](#elements) significa que puedes
aprovechar las funciones como alcance de CSS, encapsulamiento del DOM y composición.

**¿Cuál es la diferencia entre las shadow root abiertas y cerradas?**

Consulta la sección sobre [shadow root cerradas](#closed).

[ce_spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[ce_article]: (/web/fundamentals/getting-started/primers/customelements)
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/
[sd_spec_whatwg]: https://dom.spec.whatwg.org/#shadow-trees
[differences]: http://hayato.io/2016/shadowdomv1/
[css_props]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables


{# wf_devsite_translation #}
