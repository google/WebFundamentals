project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Modificación del orden en el DOM con tabindex


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Uso de tabindex {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



El orden de pestañas predeterminado que determina la posición de los elementos nativos en el DOM es
práctico, pero en ciertas ocasiones querrás modificar el orden de tabulación, y
mover los elementos físicamente en HTML no es siempre lo mejor, o ni siquiera una
solución viable. Para estos casos, puedes usar el atributo HTML `tabindex` para
establecer explícitamente la posición de pestaña de un elemento.

`tabindex` puede aplicarse a cualquier elemento (aunque no necesariamente resulta
útil para todos los elementos) y puede llevar varios valores enteros. Mediante el uso de
`tabindex`, puedes especificar un orden explícito para los elementos de página que pueden tener el foco,
insertar un elemento que de otra manera no podría tener el foco en el orden de tabulación y quitar elementos
del orden de pestañas. Por ejemplo:

`tabindex="0"`: Inserta un elemento en el orden natural de pestañas. El elemento puede
tomar el foco si se presiona la tecla `Tab`, y el elemento puede tomar el foco mediante una llamada a
su método `focus()`

    <custom-button tabindex="0">Press Tab to Focus Me!</custom-button>

{% framebox height="60px" %}
<style>
  custom-button {
    margin: 10px;
  }
</style>
<custom-button tabindex="0">Press Tab to Focus Me!</custom-button>
{% endframebox %}

`tabindex="-1"`: Quita un elemento del orden natural de pestañas, pero el elemento
todavía puede tomar el foco mediante una llamada a su método `focus()`.

    <button id="foo" tabindex="-1">I'm not keyboard focusable</button>
    <button onclick="foo.focus();">Focus my sibling</button>

{% framebox height="80px" %}
<button id="foo" tabindex="-1">I'm not keyboard focusable</button>
<button onclick="foo.focus();">Focus my sibling</button>
{% endframebox %}

`tabindex="5"`: Todo tabindex superior a 0 hace saltar al elemento al principio
del orden natural de pestañas. Si existen varios elementos con un tabindex superior
a 0, el orden de pestañas comienza desde el valor más bajo que sea mayor que cero y
va subiendo desde ahí. El uso de un tabindex superior a 0 se considera un
**antipatrón**.

    <button>I should be first</button>
    <button>And I should be second</button>
    <button tabindex="5">But I jumped to the front!</button>

{% framebox height="80px" %}
<button>I should be first</button>
<button>And I should be second</button>
<button tabindex="5">But I jumped to the front!</button>
{% endframebox %}

Esto es así especialmente para los elementos que no son de entrada, como encabezados, imágenes o títulos
de artículos. Es contraproducente agregar `tabindex` a ese tipo de elementos. Si
es posible, es mejor ordenar tu código fuente para que la secuencia DOM aporte un
orden de pestañas lógico. En el caso de que uses `tabindex`, limítalo a controles interactivos
personalizados, como botones, pestañas, menús desplegables y campos de texto; es decir, elementos en los que el
usuario podría pretender realizar entradas.

No te preocupes por el hecho de que los usuarios de lectores de pantalla puedan perderse contenido importante por no
tener un `tabindex`. Incluso si el contenido es muy importante, como una imagen,
si no es algo con lo que el usuario pueda interactuar, no hay razones para hacer que pueda
tener el foco. Los usuarios de lectores de pantalla aún pueden entender el contenido de la imagen, siempre y cuando
proporciones el soporte correcto para atributos `alt`, lo cual discutiremos más adelante.

## Administración de foco a nivel de página

El siguiente es un escenario en el cual `tabindex` no solo es útil, sino también necesario. Podrías
compilar una única página robusta con diferentes secciones de contenido, de las cuales
no todas son visibles al mismo tiempo. En este tipo de páginas, hacer clic en un vínculo
de navegación podría cambiar el contenido visible sin actualizar la página.

Cuando esto sucede, probablemente podrías identificar el área de contenido seleccionada, colocarle
un `tabindex` de -1 para que no aparezca en el orden natural de pestañas, y
llamar a su método `focus`. Esta técnica, llamada *administración de foco*, mantiene el
contexto que percibe el usuario en sincronización con el contenido visual del sitio.

## Administración de foco en componentes

La administración de foco es importante cuando cambias algo en la página, pero a veces
necesitas administrar el foco a nivel de control; por ejemplo, si
compilas un componente personalizado.

Piensa en el elemento nativo `select`. Puede recibir el foco básico, pero
cuando lo hace, puedes usar las teclas de dirección para revelar funcionalidades diferentes (las
opciones seleccionables). Si compilaras un elemento `select` personalizado, te convendría
revelar estos mismos tipos de comportamientos para que los usuarios que utilizan principalmente
el teclado también puedan interactuar con tu control.

    <!-- Focus the element using Tab and use the up/down arrow keys to navigate -->
    <select>
      <option>Aisle seat</option>
      <option>Window seat</option>
      <option>No preference</option>
    </select>

<select>
  <option>Aisle seat</option>
  <option>Window seat</option>
  <option>No preference</option>
</select>

Es difícil conocer qué comportamientos de teclado implementar, pero existe un
documento útil que puedes consultar. El
sitio sobre las [prácticas para autores de apps de Internet enriquecidas accesibles (ARIA)](https://www.w3.org/TR/wai-aria-practices/){: .external } 
contiene una guía que enumera los tipos de componentes y qué tipos de acciones de teclado admiten.
Hablaremos con mayor profundidad sobre ARIA más adelante, pero por ahora usemos la guía para
ayudarnos a agregar compatibilidad con el teclado a un componente nuevo.

Tal vez desarrolles nuevos [elementos
personalizados](/web/fundamentals/getting-started/primers/customelements) que
sean similares a un conjunto de botones de selección, pero con tu toque personal en su apariencia y
comportamiento.

    <radio-group>
      <radio-button>Water</radio-button>
      <radio-button>Coffee</radio-button>
      <radio-button>Tea</radio-button>
      <radio-button>Cola</radio-button>
      <radio-button>Ginger Ale</radio-button>
    </radio-group>

Para definir qué tipo de compatibilidad con el teclado necesitan, deberías consultar la
[guía de prácticas para autores de ARIA](https://www.w3.org/TR/wai-aria-practices/){: .external }.
La sección 2 contiene una lista de patrones de diseño, y en esa lista se encuentra una
[tabla de características para grupos de selección](https://www.w3.org/TR/wai-aria-practices/#radiobutton){: .external },
que es el componente actual que más se asemeja a tu nuevo elemento.

Como puedes ver en la tabla, uno de los comportamientos comunes de teclado que debería
admitirse es el de las teclas de dirección arriba/abajo/izquierda/derecha. Para agregar este comportamiento al nuevo
componente, emplearemos una técnica llamada *tabindex itinerante* (roving tabindex).

![Extracto de especificaciones del W3C para botones de selección](imgs/radio-button.png)

El tabindex itinerante funciona configurando `tabindex` en -1 para todos los elementos secundarios excepto el
que se encuentra activo en el momento.

    <radio-group>
      <radio-button tabindex="0">Water</radio-button>
      <radio-button tabindex="-1">Coffee</radio-button>
      <radio-button tabindex="-1">Tea</radio-button>
      <radio-button tabindex="-1">Cola</radio-button>
      <radio-button tabindex="-1">Ginger Ale</radio-button>
    </radio-group>

Entonces, el componente usa un receptor de eventos de teclado para determinar qué tecla
presiona el usuario. Cuando esto suceda, establece el
`tabindex` del elemento secundario que tenía previamente el foco en -1, establece el `tabindex` del elemento secundario que va a recibir el foco en 0, y llama al
método de foco para el mismo.

    <radio-group>
      // Assuming the user pressed the down arrow, we'll focus the next available child
      <radio-button tabindex="-1">Water</radio-button>
      <radio-button tabindex="0">Coffee</radio-button> // call .focus() on this element
      <radio-button tabindex="-1">Tea</radio-button>
      <radio-button tabindex="-1">Cola</radio-button>
      <radio-button tabindex="-1">Ginger Ale</radio-button>
    </radio-group>

Cuando los usuarios alcancen el último elemento secundario (o el primero, según la dirección en la que
muevan el foco), harás un bucle y pondrás el foco nuevamente en el primer elemento
secundario (o en el último).

A continuación, puedes probar el ejemplo completo. Inspecciona el elemento con
DevTools para observar el desplazamiento del tabindex de un botón de selección al siguiente.

{% framebox height="130px" %}
<style>
  .demo {
    margin-left: 80px;
  }
  radio-button {
    position: relative;
    display: block;
    font-size: 18px;
  }
  radio-button:focus {
    outline: none;
  }
  radio-button::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border: 1px solid black;
    position: absolute;
    left: -18px;
    top: 7px;
    border-radius: 50%;
  }
  radio-button:focus::before {
    box-shadow: 0 0 3px 3px #83BEFF;
  }
  radio-button[aria-checked="true"]::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background: red;
    position: absolute;
    left: -18px;
    top: 7px;
    border-radius: 50%;
  }
</style>

<div class="demo">
  <radio-group>
    <radio-button>Water</radio-button>
    <radio-button>Coffee</radio-button>
    <radio-button>Tea</radio-button>
    <radio-button>Cola</radio-button>
    <radio-button>Ginger Ale</radio-button>
  </radio-group>
</div>

<script src="https://cdn.rawgit.com/webcomponents/custom-elements/master/custom-elements.min.js"></script>

<script>
  class RadioButton extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'radio');
      this.setAttribute('tabindex', -1);
      this.setAttribute('aria-checked', false);
    }
  }

  window.customElements.define('radio-button', RadioButton);

  // Define values for keycodes
  const VK_LEFT       = 37;
  const VK_UP         = 38;
  const VK_RIGHT      = 39;
  const VK_DOWN       = 40;

  class RadioGroup extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'radiogroup');
      this.radios = Array.from(this.querySelectorAll('radio-button'));

      // Setup initial state
      if (this.hasAttribute('selected')) {
        let selected = this.getAttribute('selected');
        this._selected = selected;
        this.radios[selected].setAttribute('tabindex', 0);
        this.radios[selected].setAttribute('aria-checked', true);
      } else {
        this._selected = 0;
        this.radios[0].setAttribute('tabindex', 0);
      }

      this.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.addEventListener('click', this.handleClick.bind(this));
    }

    handleKeyDown(e) {
      switch(e.keyCode) {

        case VK_UP:
        case VK_LEFT: {
          e.preventDefault();

          if (this.selected === 0) {
            this.selected = this.radios.length - 1;
          } else {
            this.selected--;
          }
          break;

        }

        case VK_DOWN:
        case VK_RIGHT: {
          e.preventDefault();

          if (this.selected === this.radios.length - 1) {
            this.selected = 0;
          } else {
            this.selected++;
          }
          break;
        }

      }
    }

    handleClick(e) {
      const idx = this.radios.indexOf(e.target);
      if (idx === -1) {
        return;
      }
      this.selected = idx;
    }

    set selected(idx) {
      if (isFinite(this.selected)) {
        // Set the old button to tabindex -1
        let previousSelected = this.radios[this.selected];
        previousSelected.tabIndex = -1;
        previousSelected.removeAttribute('aria-checked', false);
      }

      // Set the new button to tabindex 0 and focus it
      let newSelected = this.radios[idx];
      newSelected.tabIndex = 0;
      newSelected.focus();
      newSelected.setAttribute('aria-checked', true);

      this.setAttribute('selected', idx);
      this._selected = idx;
    }

    get selected() {
      return this._selected;
    }
  }

  window.customElements.define('radio-group', RadioGroup);
</script>
{% endframebox %}

Puedes ver
[el código fuente completo para este elemento](https://gist.github.com/robdodson/85deb2f821f9beb2ed1ce049f6a6ed47){: .external }
en GitHub.

## Ventanas modales y trampas de teclado

En ocasiones, cuando administras el foco, puedes entrar en una situación de la cual no puedes
salir. Piensa en un widget para autocompletar que intente administrar el foco y capture
el comportamiento de pestañas, pero que evite que el usuario salga hasta que esté completo.
Esto se llama una *trampa de teclado*, y puede ser muy molesta para el usuario.
La sección 2.1.2 de la lista de comprobación de la Web AIM trata este tema y menciona que
[el foco del teclado nunca debería bloquearse ni atraparse en un elemento de la página en especial](http://webaim.org/standards/wcag/checklist#sc2.1.2){: .external }.
El usuario debería poder navegar desde todos los elementos de página y hacia los mismos usando únicamente el
teclado.

Curiosamente, existen ocasiones en las cuales este comportamiento puede ser conveniente, como en una ventana
modal. Normalmente, cuando se muestra la ventana modal, no quieres que el usuario pueda acceder
al contenido detrás de la misma. Puedes agregar una superposición para tapar visualmente la página, pero
eso no evita que el foco del teclado se dirija accidentalmente afuera de la ventana modal.

![una ventana modal que pregunta al usuario si quiere guardar su trabajo](imgs/modal-example.png)

En ocasiones como esta, puedes implementar una trampa de teclado provisoria para asegurarte
de atrapar al foco solo mientras se muestra la ventana modal, y luego devolver el foco
al elemento enfocado anteriormente cuando se cierre la ventana.

>Existen algunas propuestas sobre cómo facilitar esto para los programadores, incluido
el elemento `<dialog>`, pero aún no cuentan con compatibilidad extendida en los navegadores.>
>
>Consulta este [artículo de MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog){: .external }
para obtener más información sobre `<dialog>`, y este
[ejemplo de ventana modal](https://github.com/gdkraus/accessible-modal-dialog){: .external } para
obtener más información sobre las ventanas modales.

Considera un diálogo modal representado por un `div` que contenga algunos elementos, y
otro `div` que represente una superposición de fondo. Pasos
básicos para implementar una trampa de teclado provisoria en esta situación.

 1. Con `document.querySelector`, selecciona los divs modal y de superposición, y guarda
    sus referencias.
 1. Al abrirse la ventana modal, guarda una referencia al elemento que tenía el foco cuando
    se abrió la ventana modal, para que puedas mostrar el foco en ese elemento.
 1. Usa un *receptor de keydown* para captar las teclas cuando se presionen mientras la ventana modal se encuentre
    abierta. También podrías detectar un clic en la superposición de fondo y cerrar
    la ventana modal si el usuario hace clic en ella.
 1. A continuación, obtén la colección de elementos que pueden enfocarse dentro de la ventana modal. El primero
    y el último de los elementos que pueden enfocarse actuarán como "centinelas" para avisarte cuando
    hacer un bucle hacia adelante o hacia atrás para permanecer dentro de la ventana modal.
 1. Muestra la ventana modal y pon el foco en el primer elemento que pueda enfocarse.
 1. Cuando el usuario presione `Tab` o `Shift+Tab`, mueve el foco hacia adelante o hacia atrás,
para hacer un bucle hasta el último o el primer elemento según corresponda.
 1. Si el usuario presiona `Esc`, cierra la ventana modal. Esto resulta muy útil porque
    permite que el usuario cierre la ventana modal sin la necesidad de buscar un
    botón para cerrar, y beneficia incluso a los usuarios que usan un mouse.
 1. Cuando se cierra la ventana modal, escóndela junto con la superposición de fondo y devuelve
    el foco al elemento que lo tenía anteriormente y que se había guardado.

Este procedimiento te proporciona una ventana modal utilizable, que no da dolores de cabeza y que todo el mundo
puede usar eficazmente.

Para conocer más detalles, puedes examinar el siguiente [código de ejemplo](https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution){: .external },
y ver un ejemplo en vivo de una
[página completada](http://udacity.github.io/ud891/lesson2-focus/07-modals-and-keyboard-traps/solution/index.html){: .external }.



{# wf_devsite_translation #}
