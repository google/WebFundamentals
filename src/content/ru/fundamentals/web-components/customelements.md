project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
описание: Custom Elements позволяют веб-разработчикам определять новые
HTML-теги, расширять фунциональные возможности существующих и создавать
веб-компоненты для повторного использования.

{# wf_updated_on: 2018-09-20 #}
{# wf_published_on: 2016-06-28 #}
{# wf_blink_components: Blink>DOM #}

# Custom Elements v1: веб-компоненты для повторного использования {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### Краткое изложение {: #tldr .hide-from-toc }

With [Custom
Elements](https://html.spec.whatwg.org/multipage/scripting.html#custom-elements),
web developers can **create new HTML tags**,
beef-up existing HTML tags, or extend the components other developers have
authored. The API is the foundation of [web
components](http://webcomponents.org/). It brings a web
standards-based way to create reusable components using nothing more than
vanilla JS/HTML/CSS. The result is less code, modular code, and more reuse in
our apps.

## Введение

Обратите внимание: В данной статье описывается новая <a
href="https://html.spec.whatwg.org/multipage/scripting.html#custom-elements"
target="_blank"> спецификация Custom Elements </a>. Если вы использовали
пользовательские элементы, то, вероятно, знакомы с <a
href="https://www.chromestatus.com/features/4642138092470272"> версией 0,
поддержка которой реализована в Chrome 33 </a>. Принцип работы тот же, однако в
спецификацию версии 1 внесены важные поправки в API. Читайте далее, чтобы
узнать, что нового появилось в этой версии или ознакомьтесь с разделом <a
href="#historysupport"> История и поддержка браузером </a> для получения
дополнительной информации. <a
href="https://html.spec.whatwg.org/multipage/scripting.html#custom-elements"
target="_blank">Custom Elements spec</a>. If you've been using custom elements,
chances are you're familiar with the <a
href="https://www.chromestatus.com/features/4642138092470272">version 0 that
shipped in Chrome 33</a>. The concepts are the same, but the version 1 spec has
important API differences. Keep reading to see what's new or check out the
section on <a href="#historysupport">History and browser support</a> for more
info.

Браузер предоставляет нам великолепный инструмент для структурирования
веб-приложений. Этот инструмент называется HTML. Вы, должно быть, слышали о нем!
Этот язык соответствует принципам декларативного программирования (* парадигма
программирования – стиль построения структуры и элементов компьютерных программ
– при которой основное внимание уделяется построению логики программы без
собственно описания потока управления; вы указываете что необходимо выполнять
без указания как), написанный на нем код портируемый (* может исполняться на
более чем одном типе компьютеров либо может быть перенесен на другую
[аппаратную] платформу с минимальными усилиями), эта технология поддерживается
всеми браузерами и с ней легко работать. Каким бы великолепным не казался HTML,
его словарный состав и расширяемость (* возможность определения в языке
программирования новых языковых конструкций; возможность добавления в систему
новых возможностей в условиях её эксплуатации) ограничены. В [ имеющемся
стандарте HTML ](https://html.spec.whatwg.org/multipage/) всегда не хватало
способа автоматического объединения поведения, реализуемого при помощи JS, с
вашей разметкой ... до сих пор.

За счет Custom elements осуществляется модернизация HTML, заполнение недостающих
кусочков мозаики и объединение структуры и поведения. Если мы не можем решить
проблему за счет имеющихся средств HTML, то можем создать для ее решения
пользовательский элемент. ** Благодаря Custom elements расширяются
функциональные возможности браузера и в то же время сохраняются преимущества
использования HTML **.

## Определение нового элемента {: #define}

Для того чтобы определить новый элемент HTML, нам необходимо воспользоваться
возможностями JavaScript!

Свойство ` customElements ` глобального объекта window используется для
определения нового пользовательского элемента и обучения браузера тому, как его
отображать. Вызовите ` customElements.define() `, передав в качестве параметров
имя тега, который хотите создать, и  `класс` (* производный) JavaScript, который
наследует свою обобщенную структуру и поведение от базового класса
`HTMLElement`.

**Пример:** - определение боковой выдвижной навигационной панели для мобильных
устройств, `<app-drawer>`:

```
class AppDrawer extends HTMLElement {...}
window.customElements.define('app-drawer', AppDrawer);

// Or use an anonymous class if you don't want a named constructor in current scope.
window.customElements.define('app-drawer', class extends HTMLElement {...});
```

Example usage:

```
<app-drawer></app-drawer>
```

Важно помнить, что использование пользовательского элемента ничем не отличается
от использования `<div>` или любого другого элемента. Его образцы могут быть
объявлены на странице, созданы динамически при помощи кода JavaScript, могут
быть добавлены обработчики событий и т.д. Читайте далее для ознакомления с
большим количеством примеров.

### Defining an element's JavaScript API {: #jsapi}

Функциональные возможности пользовательского элемента определяются при помощи
[`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
ES2015 (* спецификация ES6), который наследует свою обобщенную структуру и
поведение от `HTMLElement`. За счет наследования от `HTMLElement` гарантируется,
что пользовательский элемент перенимает весь API DOM (* Document Object Model –
объектная модель документа), и обеспечивается то, что любые добавленные к классу
свойства/методы становятся частью интерфейса DOM элемента. По сути, используйте
класс для создания **публичного API JavaScript**.

**Пример**: определение интерфейса DOM `<app-drawer>`:

```
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
    // If you define a constructor, always call super() first!
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
```

In this example, we're creating a drawer that has an `open` property, `disabled`
property, and a `toggleDrawer()` method. It also [reflects properties as HTML
attributes](#reflectattr).

A neat feature of custom elements is that **`this` inside a class definition
refers to the DOM element itself** i.e. the instance of the class. In our
example, `this` refers to `<app-drawer>`. This (😉) is how the element can
attach a `click` listener to itself! And you're not limited to event listeners.
The entire DOM API is available inside element code. Use `this` to access the
element's properties, inspect its children (`this.children`), query nodes
(`this.querySelectorAll('.items')`), etc.

**Rules on creating custom elements**

1. The name of a custom element **must contain a dash (-)**. So
`<x-tags>`,`<my-element>`, and `<my-awesome-app>` are all valid names, while
`<tabs>`and `<foo_bar>` are not. This requirement is so the HTML parser
candistinguish custom elements from regular elements. It also ensures
forwardcompatibility when new tags are added to HTML.
2. Вы не можете зарегистрировать один и тот же тэг более одного раза. При
попытке это выполнить будет выкунута ошибка `DOMException`. Как только вы
сообщили браузеру о новом тэге, то все. Назад дороги нет.
3. Custom elements cannot be self-closing because HTML only allows [a few
elements](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)to be
self-closing. Always write a closing
tag(<code><app-drawer></app-drawer></code>).

## Custom element reactions {: #reactions}

A custom element can define special lifecycle hooks for running code during
interesting times of its existence. These are called **custom element
reactions**.

<table>
  <thead>
    <tr>
      <th>Имя</th>
      <th>Called when</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>constructor</code></td>
      <td>An instance of the element is
        created or <a href="#upgrades">upgraded</a>. Useful for initializing
        state, settings up event listeners, or
        <a href="#shadowdom">creating shadow dom</a>.
        See the
<a
href="https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance">
        spec
        </a>
        for restrictions on what you can do in the <code>constructor</code>.
      </td>
    </tr>
    <tr>
      <td><code>connectedCallback</code></td>
      <td>Called every time the
        element is inserted into the DOM. Useful for running setup code, such as
        fetching resources or rendering. Generally, you should try to delay work
        until this time.
      </td>
    </tr>
    <tr>
      <td><code>disconnectedCallback</code></td>
<td>каждый раз при удалении элемента из DOM. Полезен для выполнения кода
для завершения работы с элементом.</td>
    </tr>
    <tr>
      <td><code>attributeChangedCallback(attrName, oldVal, newVal)</code></td>
<td>при добавлении, удалении, обновлении или замене <a
href="#attrchanges">отслеживаемого атрибута</a>. Также вызывается для задания
первоначальных значений при создании элемента парсером или его <a
href="#upgrades">обновлении</a>. <b>Обратите внимание:</b> обработчик будет
вызван только для атрибутов, перечисленных в свойстве
<code>observedAttributes</code>. </td>
    </tr>
    <tr>
      <td><code>adoptedCallback()</code></td>
      <td>The
        custom element has been moved into a new <code>document</code> (e.g.
        someone called <code>document.adoptNode(el)</code>).
      </td>
    </tr>
  </tbody>
</table>

Note: The browser calls the `attributeChangedCallback()` for any attributes
whitelisted in the `observedAttributes` array (see [Observing changes to
attributes](#attrchanges)). Essentially, this is a performance optimization.
When users change a common attribute like `style` or `class`, you don't want to
be spammed with tons of callbacks.

**Вышеуказанные обработчики событий вызываются последовательно**. Если кто-либо
вызывает  `el.setAttribute()` для вашего элемента, то браузер тут же вызывает
`attributeChangedCallback()`. Подобным образом будет вызван
`disconnectedCallback()` сразу после того, как ваш элемент удален из DOM
(например пользователь вызвал `el.remove()`).

**Пример**: добавление реакций пользовательского элемента для `<app-drawer>`:

```
class AppDrawer extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.
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
```

Определяйте реакции, если/когда это имеет смысл. Если ваш элемент достаточно
сложен и выполняет подключение к IndexedDB в `connectedCallback()`, то выполните
необходимый для завершения работы с элементом код в disconnectedCallback(). Но
будьте бдительны! Вы не можете полагаться во всех ситуациях исключительно на
код, выполняемый при удалении элемента из DOM. Например,
`disconnectedCallback()` никогда не будет вызван при закрытии пользователем
вкладки.

## Properties and attributes

### Преобразование значений свойств в значения атрибутов HTML {: #reflectattr}

Преобразование значения свойств HTML обратно в DOM в значение атрибута HTML –
обычное дело. Например, когда значения `hidden` или `id` изменяются в коде JS:

```
div.id = 'my-id';
div.hidden = true;
```

the values are applied to the live DOM as attributes:

```
<div id="my-id" hidden>
```

Это явление называется «[преобразование значений свойств в значения
атрибутов](https://html.spec.whatwg.org/multipage/infrastructure.html#reflecting-content-attributes-in-idl-attributes)».
Почти все свойства в HTML способны на это. Почему? Атрибуты также полезны для
декларативного конфигурирования элемента, и некоторые API, такие как API для
обеспечения доступности пользовательского интерфейса (* для людей с
ограниченными возможностями) или API для работы с селекторами CSS, в своей
работе полагаются на атрибуты.

Reflecting a property is useful anywhere you want to **keep the element's DOM
representation in sync with its JavaScript state**. One reason you might want to
reflect a property is so user-defined styling applies when JS state changes.

Одна из причин, по которой вам могло бы захотеться преобразовать значение
свойства – то, что благодаря этому определенные пользователем стилевые правила
применяются при изменении состояния элемента в коде JavaScript. Вспомните наш
`<app-drawer>`. Разработчик, который использует этот компонент, может захотеть,
чтобы он постепенно исчез, и/или предотвратить взаимодействие пользователя при
блокировке доступа к элементу:

```
app-drawer[disabled] {
  opacity: 0.5;
  pointer-events: none;
}
```

When the `disabled` property is changed in JS, we want that attribute to be
added to the DOM so the user's selector matches. The element can provide that
behavior by reflecting the value to an attribute of the same name:

```
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
```

### Отслеживание изменений значений атрибутов {: #attrchanges}

Установление значений атрибутов – удобный для пользователей способ объявления
начального состояния элемента:

```
<app-drawer open disabled></app-drawer>
```

Элементы могут отреагировать на изменения атрибутов за счет определения
`attributeChangedCallback`. Браузер вызовет этот метод при изменении любых
значений атрибутов, перечисленных в массиве `observedAttributes`.

```
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
```

В этом примере мы задаем значения дополнительных атрибутов для `<app-drawer>`
при изменении значения атрибута `disabled`. Хотя мы этого здесь не делаем, вы
могли бы также использовать attributeChangedCallback для синхронизации свойства
элемента в JS с его атрибутом. Хотя мы этого здесь не делаем, вы могли бы также
**использовать `attributeChangedCallback` для синхронизации свойства элемента в
JS с его атрибутом**.

## Обновление элемента {: #upgrades}

### Прогрессивно улучшенный HTML

Мы уже узнали, что пользовательские элементы определяются при помощи вызова
`customElements.define()`. Однако это не означает, что вы должны определить +
зарегистрировать пользовательский элемент сразу.

**Custom elements can be used *before* their definition is registered**.

Прогрессивное улучшение (* предполагает, что веб-интерфейсы должны создаваться
поэтапно, циклически, от простого к сложному. На каждом из этапов должен
получаться законченный веб-интерфейс, который будет лучше, красивее и удобнее
предыдущего) – возможность пользовательских элементов. Другими словами, вы
можете объявить ряд элементов `<app-drawer>` на странице и вызвать
`customElements.define('app-drawer', ...)` намного позже. Это так, поскольку
браузер обрабатывает потенциальные пользовательские элементы иначе благодаря
из-за возможности добавления тэгов с [неизвестными именами](#unknown). Процесс
вызова `define()` и наделения существующего элемента определением класса
называется «обновления элемента».

Для того чтобы узнать, когда определено имя тэга, вы можете воспользоваться
`window.customElements.whenDefined()`. Он возвращает Promise, который переходит
в состояние «выполнено» после определения элемента.

```
customElements.whenDefined('app-drawer').then(() => {
  console.log('app-drawer defined');
});
```

**Пример**: отложение выполнение кода до обновления дочерних элементов

```
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
```

Обратите внимание: До того, как пользовательские элементы определены, я
представляю, что они находятся в состоянии лимба (* у католиков: место между
раем и адом, где пребывают души праведников, умерших до пришествия Христа, и
души некрещёных младенцев). При этом в
[спецификации](https://dom.spec.whatwg.org/#concept-element-custom-element-state)
состояние элемента определяется как «неопределенное», «ненастроенное» или
«пользовательское». Встроенные элементы (например `<div>`) всегда находятся в 
«определенном» состоянии.

## Контент, определенный в элементе {: #addingmarkup}

Контентом пользовательских элементов можно управлять за счет использования API
DOM в коде для определения элемента. Custom elements can manage their own
content by using the DOM APIs inside
element code. При этом нам оказываются полезными [реакции](#reactions).

**Example** - create an element with some default HTML:

```
customElements.define('x-foo-with-markup', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
  }
  ...
});
```

Declaring this tag will produce:

```
<x-foo-with-markup>
 <b>I'm an x-foo-with-markup!</b>
</x-foo-with-markup>
```

{% framebox height="100px" %}

<style>
  .demoarea {
    padding: 8px; border: 1px dashed #ccc;
  }
  .demoarea::before {
    display: block; content: 'DEMO';
  }
</style>

<div class="demoarea">
  <x-foo-with-markup></x-foo-with-markup>
</div>

<script>
  const supportsCustomElementsV1 = 'customElements' in window;

  if(supportsCustomElementsV1) {
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

Обратите внимание: Перезаписывание дочерних элементов компонента новым контентом
обычно не является удачной идеей, поскольку это неожиданно. Пользователи будут
удивлены, что их разметка удалена. Более удачный вариант добавления контента,
определенного в элементе, – использование Shadow DOM, что мы далее и рассмотрим.

### Creating an element that uses Shadow DOM {: #shadowdom}

Обратите внимание: я не буду рассматривать возможности [Shadow
DOM](http://w3c.github.io/webcomponents/spec/shadow/) в этом руководстве, но
скажу, что это мощный API для совместного использования с пользовательскими
элементами. Сама по себе технология Shadow DOM – инструмент для создания дерева
узлов. При использовании этой технологии совместно с пользовательскими
элементами получается потрясающий результат.

За счет Shadow DOM в элементе можно хранить, отображать фрагмент DOM, который
существует отдельно от остальных элементов страницы, и задавать для него
стилевое оформление. Знаете, да вы могли бы даже поместить целое приложение в
единственный элемент:

```
<!-- chat-app's implementation details are hidden away in Shadow DOM. -->
<chat-app></chat-app>
```

Для того чтобы использовать воспользоваться Shadow DOM в пользовательском
элементе, вызовите `this.attachShadow` внутри вашего `constructor`:

```
let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>:host { ... }</style> <!-- look ma, scoped styles -->
  <b>I'm in shadow dom!</b>
  <slot></slot>
`;

customElements.define('x-foo-shadowdom', class extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.

    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }
  ...
});
```

Note: In the above snippet we use a `template` element to clone DOM, instead of
setting the `innerHTML` of the `shadowRoot`. This technique cuts down on HTML
parse costs because the content of the template is only parsed once, whereas
calling `innerHTML` on the `shadowRoot` will parse the HTML for each instance.
We'll talk more about templates in the next section.

Example usage:

```
<x-foo-shadowdom>
  <p><b>User's</b> custom text</p>
</x-foo-shadowdom>

<!-- renders as -->
<x-foo-shadowdom>
  #shadow-root
    <b>I'm in shadow dom!</b>
    <slot></slot> <!-- slotted content appears here -->
</x-foo-shadowdom>
```

{% framebox height="142px" %}

<style>
  .demoarea {
    padding: 8px; border: 1px dashed #ccc;
  }

  .demoarea::before {
    content: 'DEMO'; display: block;
  }
</style>

<div class="demoarea">
  <x-foo-shadowdom>
    <p><b>User's</b> custom text</p>
  </x-foo-shadowdom>
</div>

<script>
  const supportsCustomElementsV1 = 'customElements' in window;

  if(supportsCustomElementsV1) {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
      <b>I'm in shadow dom!</b>
      <slot></slot>
    `;

    customElements.define('x-foo-shadowdom', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the constructor.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
      }
    });
  } else {
    if (self.frameElement) {
      self.frameElement.style.display = 'none';
    }
  }
</script>

{% endframebox %}

### Creating elements from a `<template>` {: #fromtemplate}

For those unfamiliar, the [`<template>`
element](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)
allows you to declare fragments of DOM which are parsed, inert at page load, and
can be activated later at runtime. It's another API primitive in the web
components family. **Templates are an ideal placeholder for declaring the
structure of a custom element**.

**Example:** registering an element with Shadow DOM content created from a
`<template>`:

```
<template id="x-foo-from-template">
  <style>
    p { color: green; }
  </style>
  <p>I'm in Shadow DOM. My markup was stamped from a &lt;template&gt;.</p>
</template>

<script>
  let tmpl = document.querySelector('#x-foo-from-template');
  // If your code is inside of an HTML Import you'll need to change the above line to:
  // let tmpl = document.currentScript.ownerDocument.querySelector('#x-foo-from-template');

  customElements.define('x-foo-from-template', class extends HTMLElement {
    constructor() {
      super(); // always call super() first in the constructor.
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
    ...
  });
</script>
```

За счет этих нескольких строк кода многое происходит. Давайте рассмотрим
ключевые моменты:

1. We're defining a new element in HTML: `<x-foo-from-template>`
2. The element's Shadow DOM is created from a `<template>`
3. The element's DOM is local to the element thanks to Shadow DOM
4. The element's internal CSS is scoped to the element thanks to Shadow DOM

{% framebox height="120px" %}

<style>
.demoarea {
  padding: 8px; border: 1px dashed #ccc;
}

.demoarea::before {
  content: 'DEMO'; display: block;
}
</style>

<div class="demoarea">
  <x-foo-from-template></x-foo-from-template>
</div>

<template id="x-foo-from-template">
  <style>:host p { color: green; }</style>
  <p>I'm in Shadow DOM. My markup was stamped from a <template>.</p>
</template>

<script>
  const supportsCustomElementsV1 = 'customElements' in window;

  if(supportsCustomElementsV1) {
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

## Styling a custom element {: #styling}

Даже если бы такое оформление для элемента задано в нем самом при помощи Shadow
DOM, пользователи могут добавить для вашего пользовательского элемента свое
стилевое оформление. Эти стилевые правила называются «стилевые правила, заданные
пользователем».

```
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
```

Вы могли бы задать себе вопрос, как работает специфичность CSS (* правило CSS,
согласно которому при конфликтной ситуации к элементу применяются свойства,
заданные для наиболее специфичного селектора), если для элемента добавлено
стилевое оформление внутри Shadow DOM. С точки зрения специфичности стилевые
правила, заданные пользователем, имеют преимущество. Они всегда переопределяют
стилевые правила, заданные в самом элементе. Обратитесь к разделу «[Создание
элемента, в котором используется Shadow DOM](#shadowdom)[».](#shadowdom)

### Pre-styling unregistered elements {: #prestyle}

До [обновления](#upgrades) элемента вы можете выбрать его в CSS при помощи
псевдокласса `:defined`. Before an element is [upgraded](#upgrades) you can
target it in CSS using the
`:defined` pseudo-class. Это полезно при добавлении предварительного стилевого
оформления для компонента. Например: вы можете захотеть предотвратить FOUC (*
Flash of unstyled content – появление контента без стилевого оформления) за счет
скрытия неопределенных компонентов и их постепенного проявления после их
определения.

**Example** - hide `<app-drawer>` before it's defined:

```
app-drawer:not(:defined) {
  /* Pre-style, give layout, replicate app-drawer's eventual styles, etc. */
  display: inline-block;
  height: 100vh;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
```

After `<app-drawer>` becomes defined, the selector (`app-drawer:not(:defined)`)
no longer matches.

## Extending elements {: #extend}

The Custom Elements API is useful for creating new HTML elements, but it's also
useful for extending other custom elements or even the browser's built-in HTML.

### Extending a custom element {: #extendcustomeel}

Extending another custom element is done by extending its class definition.

**Example** - create `<fancy-app-drawer>` that extends `<app-drawer>`:

```
class FancyDrawer extends AppDrawer {
  constructor() {
    super(); // always call super() first in the constructor. This also calls the extended class' constructor.
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
```

### Extending native HTML elements {: #extendhtml}

Давайте предположим, что вы хотели бы создать более изящный элемент `<button>`.
Вместо копирования поведения и функциональных возможностей `<button>` более
удачный вариант – прогрессивное улучшение существующего элемента при помощи
пользовательских элементов.

A **customized built-in element** is a custom element that extends one of the
browser's built-in HTML tags. The primary benefit of extending an existing
element is to gain all of its features (DOM properties, methods, accessibility).
There's no better way to write a [progressive web
app](/web/progressive-web-apps/) than to **progressively enhance existing HTML
elements**.

Note: Only Chrome 67 supports customized built-in elements
([status](https://www.chromestatus.com/feature/4670146924773376))
right now. Edge and Firefox will implement it, but Safari
has chosen not to implement it. This is unfortunate for accessibility and
progressive enhancement. If you think extending native HTML elements is
useful, voice your thoughts on
<a href="https://github.com/w3c/webcomponents/issues/509">509</a> and <a
href="https://github.com/w3c/webcomponents/issues/662">662</a> on Github.

To extend an element, you'll need to create a class definition that inherits
from the correct DOM interface. For example, a custom element that extends
`<button>` needs to inherit from `HTMLButtonElement` instead of `HTMLElement`.
Similarly, an element that extends `<img>` needs to extend `HTMLImageElement`.

**Пример**: расширение возможностей `<button>`:

```
// See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
// for the list of other DOM interfaces.
class FancyButton extends HTMLButtonElement {
  constructor() {
    super(); // always call super() first in the constructor.
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
```

Notice that the call to `define()` changes slightly when extending a native
element. The required third parameter tells the browser which tag you're
extending. This is necessary because many HTML tags share the same DOM
interface. `<section>`, `<address>`, and `<em>` (among others) all share
`HTMLElement`; both `<q>` and `<blockquote>` share `HTMLQuoteElement`; etc..
Specifying `{extends: 'blockquote'}` lets the browser know you're creating a
souped-up `<blockquote>` instead of a `<q>`. See [the HTML
spec](https://html.spec.whatwg.org/multipage/indices.html#element-interfaces)
for the full list of HTML's DOM interfaces.

Обратите внимание: за счет наследования характеристик `HTMLButtonElement` наша
изящная кнопка наделяется всеми свойствами/методами DOM `<button>`. В результате
отпадает необходимость реализации кучи возможностей: свойства `disabled`, метода
`click()`, обработчиков для события `keydown` и настроки `tabindex` (*
определяет последовательность перехода между ссылками при нажатии на кнопку
Tab). Вместо этого мы можем сфокусироваться на прогрессивном улучшении
`<button>` за счет добавления собственных возможностей, а именно метода
`drawRipple()` (* для добавления эффекта волны (ripple – волна на поверхности
жидкости)). В итоге мы пишем меньше кода и чаще используем тот же самый.

Consumers of a customized built-in element can use it in several ways. They can
declare it by adding the `is=""` attribute on the native tag:

```
<!-- This <button> is a fancy button. -->
<button is="fancy-button" disabled>Fancy button!</button>
```

create an instance in JavaScript:

```
// Custom elements overload createElement() to support the is="" attribute.
let button = document.createElement('button', {is: 'fancy-button'});
button.textContent = 'Fancy button!';
button.disabled = true;
document.body.appendChild(button);
```

or use the `new` operator:

```
let button = new FancyButton();
button.textContent = 'Fancy button!';
button.disabled = true;
```

Here's another example that extends `<img>`.

**Example** - extending `<img>`:

```
customElements.define('bigger-img', class extends Image {
  // Give img default size if users don't specify.
  constructor(width=50, height=50) {
    super(width * 10, height * 10);
  }
}, {extends: 'img'});
```

Users declare this component as:

```
<!-- This <img> is a bigger img. -->
<img is="bigger-img" width="15" height="20">
```

or create an instance in JavaScript:

```
const BiggerImage = customElements.get('bigger-img');
const image = new BiggerImage(15, 20); // pass constructor values like so.
console.assert(image.width === 150);
console.assert(image.height === 200);
```

## Misc details {: #details}

### Unknown elements vs. undefined custom elements {: #unknown}

HTML is lenient and flexible to work with. For example, declare
`<randomtagthatdoesntexist>` on a page and the browser is perfectly happy
accepting it. Why do non-standard tags work? The answer is the [HTML
specification](https://html.spec.whatwg.org/multipage/dom.html#htmlunknownelement)
allows it. Elements that are not defined by the specification get parsed as
`HTMLUnknownElement`.

The same is not true for custom elements. Potential custom elements are parsed
as an `HTMLElement` if they're created with a valid name (includes a "-"). You
can check this in a browser that supports custom elements. Fire up the Console:
<span class="kbd">Ctrl</span>+<span class="kbd">Shift</span>+<span
class="kbd">J</span> (or <span class="kbd">Cmd</span>+<span
class="kbd">Opt</span>+<span class="kbd">J</span> on Mac) and paste in the
following lines of code:

```
// "tabs" is not a valid custom element name
document.createElement('tabs') instanceof HTMLUnknownElement === true

// "x-tabs" is a valid custom element name
document.createElement('x-tabs') instanceof HTMLElement === true
```

## API reference

Свойство `customElements` глобального объекта window имеет полезные методы для
работы с пользовательскими элементами.

**`define(tagName, constructor, options)`**

Defines a new custom element in the browser.

Example

```
customElements.define('my-app', class extends HTMLElement { ... });
customElements.define(
  'fancy-button', class extends HTMLButtonElement { ... }, {extends: 'button'});
```

**`get(tagName)`**

Given a valid custom element tag name, returns the element's constructor.
Returns `undefined` if no element definition has been registered.

Example

```
let Drawer = customElements.get('app-drawer');
let drawer = new Drawer();
```

**`whenDefined(tagName)`**

Возвращает Promise (* объект «обещание»), которое переходит в состояние
«выполнено» после определения пользовательского элемента. Если пользовательский
элемент уже определен, то Promise «разрешается» сразу же. Promise переходит в
состояние «отклонено», если именем тэга является некорректное имя
пользовательского элемента.

Example

```
customElements.whenDefined('app-drawer').then(() => {
  console.log('ready!');
});
```

## History and browser support {: #historysupport}

If you've been following web components for the last couple of years, you'll
know that Chrome 36+ implemented a version of the Custom Elements API that uses
`document.registerElement()` instead of `customElements.define()`. That's now
considered a deprecated version of the standard, called v0.
`customElements.define()` is the new hotness and what browser vendors are
starting to implement. It's called Custom Elements v1.

If you happen to be interested in the old v0 spec, check out the [html5rocks
article](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/){:
.external }.

### Browser support

Chrome 54 ([status](https://www.chromestatus.com/features/4696261944934400)) и
Safari 10.1 ([status](https://webkit.org/status/#feature-custom-elements)) и
Firefox 63 ([status](https://platform-status.mozilla.org/#custom-elements))
поддерживают Custom Elements v1. Для Edge (* браузер от компании Microsoft,
призванный заменить Internet Explorer. Вошёл в состав Windows 10 параллельно с
Internet Explorer, который останется для сохранения обратной совместимости
корпоративных приложений) [началась разработка
прототипа](https://developer.microsoft.com/microsoft-edge/platform/status/customelements/)
(* создание демонстрационной или упрощённой, пробной версии (макета, модели)
новой системы). Edge has [begun
development](https://developer.microsoft.com/microsoft-edge/platform/status/customelements/).

To feature detect custom elements, check for the existence of
`window.customElements`:

```
const supportsCustomElementsV1 = 'customElements' in window;
```

#### Полифилл (* библиотека, которая добавляет в старые браузеры поддержку возможностей, которые в современных браузерах являются встроенными) {: #polyfill}

Until browser support is widely available, there's a
[standalone polyfill](https://github.com/webcomponents/custom-elements/)
available for Custom Elements v1. However, we recommend using the
[webcomponents.js
loader](https://github.com/webcomponents/webcomponentsjs#using-webcomponents-loaderjs)
to optimally load the web components polyfills. The loader
uses feature detection to asynchronously load only the necessary pollyfills
required by the browser.

Обратите внимание: если выполняется транспиляция вашего проекта или в нем
используется ES5, то обязательно ознакомьтесь с советами по добавлению
[custom-elements-es5-adapter.js](https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs)
в дополнение к полифиллам.

Установите его при помощи команды:

```
npm install --save @webcomponents/webcomponentsjs
```

Usage:

```
<!-- Use the custom element on the page. -->
<my-element></my-element>

<!-- Load polyfills; note that "loader" will load these async -->
<script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js" defer></script>

<!-- Load a custom element definitions in `waitFor` and return a promise -->
<script type="module"> 
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  WebComponents.waitFor(() => {
    // At this point we are guaranteed that all required polyfills have
    // loaded, and can use web components APIs.
    // Next, load element definitions that call `customElements.define`.
    // Note: returning a promise causes the custom elements
    // polyfill to wait until all definitions are loaded and then upgrade
    // the document in one batch, for better performance.
    return loadScript('my-element.js');
  });
</script>
```

Note: the `:defined` CSS pseudo-class cannot be polyfilled.

## Заключение

Custom elements give us a new tool for defining new HTML tags in the browser and
creating reusable components. Combine them with the other new platform
primitives like Shadow DOM and `<template>`, and we start to realize the grand
picture of Web Components:

- Cross-browser (web standard) for creating and extending reusable components.
- Requires no library or framework to get started. Vanilla JS/HTML FTW!
- Provides a familiar programming model. It's just DOM/CSS/HTML.
- Works well with other new web platform features (Shadow DOM, `<template>`,
CSScustom properties, etc.)
- Tightly integrated with the browser's DevTools.
- Leverage existing accessibility features.

## Замечания и предложения {: #inline-feedback }

{% include "web/_shared/helpful.html" %}
