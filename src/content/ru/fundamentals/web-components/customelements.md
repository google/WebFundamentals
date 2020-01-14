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

При помощи [Custom
Elements](https://html.spec.whatwg.org/multipage/scripting.html#custom-elements)
(* пользовательские элементы. Здесь и далее примеч. пер.) веб-разработчики могут
** создавать новые теги HTML **, совершенствовать существующие или улучшать
созданные другими разработчиками компоненты. Этот API (* Application Programming
Interface – программный интерфейс приложения) – фундамент [ Web Components
](http://webcomponents.org/). За счет него у нас имеется основанный на
веб-стандартах способ создания компонентов для повторного использования при
помощи лишь чистого кода JS/HTML/CSS. Благодаря нему нам необходимо писать
меньше кода и мы получаем модульный код, который можем повторно использовать в
нашем приложении.

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

Пример использования:

```
<app-drawer></app-drawer>
```

Важно помнить, что использование пользовательского элемента ничем не отличается
от использования `<div>` или любого другого элемента. Его образцы могут быть
объявлены на странице, созданы динамически при помощи кода JavaScript, могут
быть добавлены обработчики событий и т.д. Читайте далее для ознакомления с
большим количеством примеров.

### Описание API JavaScript {: #jsapi}

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

В этом примере мы создаем ящик с `open` свойством, `disabled` свойством и
`toggleDrawer()` . Он также [отражает свойства как атрибуты HTML](#reflectattr)
. В этом случае мы создаем боковую выдвижную навигационную панель со свойствами
`open` , `disabled` и методом `toggleDrawer()` . [HTML](#reflectattr) .

Отличная возможность пользовательских элементов - то, что **`this` внутри
определения класса относится к самому элементу DOM** , то есть к образцу класса.
В нашем примере `this` относится к `<app-drawer>` . За счет этого элемента может
подключить обработчик события нажмите для себя самого! И при помощи этого
ключевого слова можно не только подключать обработчики событий. Весь API DOM
доступен внутри кода элемента. Используйте `this` для доступа к свойствам
элемента, обращения к его дочерним элементам ( `this.children` ), запроса узлов
( `this.querySelectorAll('.items')` ) и т.д.

**Правила создания пользовательских элементов**

1. В имени пользовательского элемента **должен содержать дефис (-)** . Таким
образом, `<x-tags>` , `<my-element>` и `<my-awesome-app>` - допустимые имена, а
`<tabs>` и `<foo_bar>` - нет. Благодаря этому парсер (* синтаксический
анализатор) HTML может отличить пользовательские элементы от стандартных. (При
работе с другими приложениями).
2. Вы не можете зарегистрировать один и тот же тэг более одного раза. При
попытке это выполнить будет выкунута ошибка `DOMException`. Как только вы
сообщили браузеру о новом тэге, то все. Назад дороги нет.
3. Пользовательские элементы не могут быть самозакрывающимися, поскольку
согласно стандарту HTML только [несколько
элементов](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)
могут быть самозакрывающимися. Всегда добавляйте закрывающийся тэг (
<code><app-drawer></app-drawer></code> drawer
<code><app-drawer></app-drawer></code> ).

## Реакции (* ответные действия) пользовательского элемента {: #reactions}

Для детской организации могут быть назначены специальные перехватчики событий (*
специальная процедура, отслеживающая появление некоторых дорог), связанных с его
жизненным циклом, для выполнения кода в определенных моментах его существования.
Они называются **реакциями пользовательского элемента {* strong0}.**

<table>
  <thead>
    <tr>
      <th>Имя</th>
      <th>Вызывается</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>constructor</code></td>
<td>При создании или <a href="#upgrades">обновлении</a> образца элемента.
Полезен для инициализации характеристик состояния, регистрации обработчиков
событий или <a href="#shadowdom">создания Shadow DOM</a> . Обратитесь к <a
href="https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance">спецификации</a>
для ознакомления с тем, что вы можете выполнить в <code>constructor</code>
.</td>
    </tr>
    <tr>
      <td><code>connectedCallback</code></td>
<td>каждый раз при добавлении элемента в DOM. Полезен для выполнения кода
для настройки элемента, например для получения ресурсов или отображения. Как
правило, вам следует стараться отложить выполнение остального кода до
наступления этого момента.</td>
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
<td>при перемещении пользовательского элемента в новый
<code>документ</code> (например при вызове <code>document.adoptNode(el)</code>
).</td>
    </tr>
  </tbody>
</table>

Обратите внимание: Браузер вызывает `attributeChangedCallback()` при изменении
значений любого атрибут, указанный в массиве `observedAttributes` (обратитесь к
разделу, посвященное [Отслеживание изменений значений атрибутов](#attrchanges)
). По сути, это делается с максимальной производительностью (* для программных
средств это делается путем профилирования и последующего анализа узких мест ).
Например, `style` или `class` .

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

## Свойства и атрибуты

### Преобразование значений свойств в значения атрибутов HTML {: #reflectattr}

Преобразование значения свойств HTML обратно в DOM в значение атрибута HTML –
обычное дело. Например, когда значения `hidden` или `id` изменяются в коде JS:

```
div.id = 'my-id';
div.hidden = true;
```

значения применяются к существущему DOM в качестве атрибутов:

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

Преобразование значений свойств полезно везде, где вы хотите **синхронизировать
представление элемента в DOM с его состоянием в коде JavaScript** .

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

При изменении в коде JS значения свойства `disabled` Мы хотим, чтобы этот
атрибут был добавлен в DOM, за счет чего были применены административные правила
для определенного пользователя селектора. Такое поведение может быть обеспечено
за счет преобразования значений свойств в значение атрибута c тем же именем.

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

**Пользовательские элементы могут быть использованы *до* регистрации их
определения** .

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

**Пример** : создание элемента с чем-то HTML-кодом, элемента по умолчанию:

```
customElements.define('x-foo-with-markup', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
  }
  ...
});
```

При объявлении этого тэга получим:

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

### Создание элемента, в котором используется Shadow DOM {: #shadowdom}

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

Обратите внимание: В примере выше мы используем `template` для клонирования DOM,
а не `shadowRoot` `innerHTML` `shadowRoot` . Благодаря этому маневру сокращается
время, используемое для парсинга HTML, поскольку контент шаблона подвергается
парсингу только один раз, в то время как при вызове `innerHTML` для `shadowRoot`
парсинг HTML будет выполняться при добавлении каждого образца элемента. Мы
поговорим подробнее о шаблонах в следующем разделе.

Пример использования:

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

### Создание элементов из `<template>` {: #fromtemplate}

Для тех, кто не знает, элемент [`<template>`
element](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)
позволяет вам объявлять фрагменты DOM, которые подвергаются парсингу, неактивны
при загрузке страницы и могут быть активированы позже при выполнении кода. Это
еще один примитив (* базовый элемент) API в семействе Web Components. **Шаблоны
являются идеальным местом для объявлений** .

**Пример** : регистрация элемента с контентом Shadow DOM, созданным из
`<template>` :

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

1. Мы определяем новый элемент в HTML - `<x-foo-from-template>`
2. Создаем Shadow DOM элемента из `<template>`
3. DOM элемента заключена в самом элементе благодаря Shadow DOM
4. Область видимости (CSS): CSS CSS-код элемента ограничена самим элементом
Благодаря Shadow DOM

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

## Добавление стилевого оформления для пользовательского элемента {: #styling}

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

### Добавление соответствующего стиля для незарегистрированного элемента {: #prestyle}

До [обновления](#upgrades) элемента вы можете выбрать его в CSS при помощи
псевдокласса `:defined`. Before an element is [upgraded](#upgrades) you can
target it in CSS using the
`:defined` pseudo-class. Это полезно при добавлении предварительного стилевого
оформления для компонента. Например: вы можете захотеть предотвратить FOUC (*
Flash of unstyled content – появление контента без стилевого оформления) за счет
скрытия неопределенных компонентов и их постепенного проявления после их
определения.

**Пример** : скрываем `<app-drawer>` drawer `<app-drawer>` до его определения:

```
app-drawer:not(:defined) {
  /* Pre-style, give layout, replicate app-drawer's eventual styles, etc. */
  display: inline-block;
  height: 100vh;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
```

После того, как `<app-drawer>` drawer `<app-drawer>` определенно, селектор (
`app-drawer:not(:defined)` drawer `app-drawer:not(:defined)` ) для него более не
подходит.

## Расширение возможностей элементов {: #extend}

Пользовательские элементы API полезны для создания новых элементов HTML, однако
он также полезен для расширения возможностей других пользовательских элементов
или даже встроенных в браузера элементов HTML.

### Расширение возможностей пользовательского элемента {: #extendcustomeel}

Расширение возможностей другого пользовательского элемента осуществляется за
счет унаследования определения его класса.

**Пример** : создание `<fancy-app-drawer>` drawer `<fancy-app-drawer>` , в
котором расширяются возможности `<app-drawer>` drawer `<app-drawer>` :

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

### Расширение возможностей собственных элементов HTML {: #extendhtml}

Давайте предположим, что вы хотели бы создать более изящный элемент `<button>`.
Вместо копирования поведения и функциональных возможностей `<button>` более
удачный вариант – прогрессивное улучшение существующего элемента при помощи
пользовательских элементов.

**Настроенный встроенный элемент** - пользовательский элемент, который наследует
возможности встроенных в браузер тэгов HTML. Основное преимущество наследования
существующего элемента - получение всех его возможностей (свойств DOM, методов,
доступности пользовательского интерфейса). Нет лучшего способа написания
[прогрессивных веб-приложений](/web/progressive-web-apps/) (* название группы
приложений, которые используют стек Web-технологии (JS + HTML + CSS) и позволяют
соединить простоту использования Web-сайт со специфичными для нахих приложений
UX (пользовательский опыт - опыт взаимодействия пользователя) и технические
возможности ), чем **прогрессивное улучшение домена HTML-элементов** .
Пользовательский **встроенный элемент** - это настраиваемый элемент, который
расширяет один из встроенных HTML-тегов браузера. Основным преимуществом
расширения существующего элемента является получение всех его функций (свойств,
методов, доступности DOM). Нет лучшего способа написать [прогрессивное
веб-приложение, а](/web/progressive-web-apps/) не **улучшать существующие
элементы HTML** .

Обратите внимание: Только в Chrome 67 сейчас имеется поддержка встроенных
элементов ( [статус](https://www.chromestatus.com/feature/4670146924773376) ). В
Edge и Firefox будет реализована их поддержка, однако в Safari - нет. Из-за
этого может пострадать доступность пользовательского интерфейса и возможность
осуществления прогрессивного улучшения. Если вы считаете, что расширение
возможностей встроенных элементов HTML полезно, выскажитесь на Github (проблемы
<a href="https://github.com/w3c/webcomponents/issues/509">509</a> и <a
href="https://github.com/w3c/webcomponents/issues/662">662</a> ).

Для того чтобы получить возможность элемента, вам необходимо будет создать
определение класса, которое наследует возможности от подходящего интерфейса DOM.
Например, пользовательский элемент, который расширяет возможности `<button>` ,
должен наследовать характеристики `HTMLButtonElement` , а не `HTMLElement` .
Подобным образом элемент, расширяющий возможности `<img>` , должен наследовать
характеристики `HTMLImageElement` .

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

Обратите внимание, что при расширении возможностей встроенного элемента вызов
`define()` происходит немного по-другому. За счет обязательного третьего уровня
браузера сообщается, характеристики какого-то тэга вы наследуете. Это
необходимо, поскольку для многих тэгов HTML используется один и тот же интерфейс
DOM. Для элементов `<section>` , `<address>` и `<em>` (и многих других)
используют `HTMLElement` ; для `<q>` и `<blockquote>` используется
`HTMLQuoteElement` ; и т.д. За счет указания `{extends: 'blockquote'}` браузеру
сообщается, что вы создаете `<blockquote>` (* для выделения длинных цитат), а не
`<q>` (* для выделения коротких). Обратитесь к
[спецификации](https://html.spec.whatwg.org/multipage/indices.html#element-interfaces)
HTML для ознакомления со всеми списком интерфейсов DOM HTML.

Обратите внимание: за счет наследования характеристик `HTMLButtonElement` наша
изящная кнопка наделяется всеми свойствами/методами DOM `<button>`. В результате
отпадает необходимость реализации кучи возможностей: свойства `disabled`, метода
`click()`, обработчиков для события `keydown` и настроки `tabindex` (*
определяет последовательность перехода между ссылками при нажатии на кнопку
Tab). Вместо этого мы можем сфокусироваться на прогрессивном улучшении
`<button>` за счет добавления собственных возможностей, а именно метода
`drawRipple()` (* для добавления эффекта волны (ripple – волна на поверхности
жидкости)). В итоге мы пишем меньше кода и чаще используем тот же самый.

Пользователи настроенного встроенного элемента могут его использовать
несколькими способами. Они могут объявить его за счет добавления `is=""` атрибут
во встроенном тэге:

```
<!-- This <button> is a fancy button. -->
<button is="fancy-button" disabled>Fancy button!</button>
```

создать образец в JavaScript:

```
// Custom elements overload createElement() to support the is="" attribute.
let button = document.createElement('button', {is: 'fancy-button'});
button.textContent = 'Fancy button!';
button.disabled = true;
document.body.appendChild(button);
```

или воспользоваться оператором `new` :

```
let button = new FancyButton();
button.textContent = 'Fancy button!';
button.disabled = true;
```

Вот еще пример, в котором расширяются возможности `<img>` .

**Пример** : расширение возможностей `<img>` :

```
customElements.define('bigger-img', class extends Image {
  // Give img default size if users don't specify.
  constructor(width=50, height=50) {
    super(width * 10, height * 10);
  }
}, {extends: 'img'});
```

Пользователи могут объявить этот элемент так:

```
<!-- This <img> is a bigger img. -->
<img is="bigger-img" width="15" height="20">
```

или создать его образец в JavaScript:

```
const BiggerImage = customElements.get('bigger-img');
const image = new BiggerImage(15, 20); // pass constructor values like so.
console.assert(image.width === 150);
console.assert(image.height === 200);
```

## Дополнительные моменты {: #details}

### Сравнение неизвестных элементов с незарегистрированными пользовательскими элементами {: #unknown}

HTML - нестрогая и гибкая в работе технология. Например, объявление на странице
`<randomtagthatdoesntexist>` , и браузер успешно воспримет его. Почему элементы
с нестандартными именами работают? Потому что [спецификация
HTML](https://html.spec.whatwg.org/multipage/dom.html#htmlunknownelement)
позволяет их использовать. После парсинга не определенные в спецификации
элементов получается `HTMLUnknownElement` .

В случае с пользовательскими элементами дело обстоит иначе. В результате
парсинга потенциальных пользовательских элементов получается `HTMLElement` ,
если при создании для них были указаны корректные имена (с "-"). Вы можете в
этом удостовериться в браузере, который поддерживает пользовательские элементы.
Запустите консоль при помощи комбинации pan1} Ctrl + <span
class="kbd">Shift</span> + <span class="kbd">J</span> (или <span
class="kbd">Cmd</span> + <span class="kbd">Opt</span> + <span
class="kbd">J</span> для Mac) и в следующий код:

```
// "tabs" is not a valid custom element name
document.createElement('tabs') instanceof HTMLUnknownElement === true

// "x-tabs" is a valid custom element name
document.createElement('x-tabs') instanceof HTMLElement === true
```

## Список API

Свойство `customElements` глобального объекта window имеет полезные методы для
работы с пользовательскими элементами.

**`define (tagName, конструктор, параметры)`**

Используется для определения пользовательского элемента в браузере.

Пример:

```
customElements.define('my-app', class extends HTMLElement { ... });
customElements.define(
  'fancy-button', class extends HTMLButtonElement { ... }, {extends: 'button'});
```

**`get(tagName)`**

При передаче ему в качестве допустимого имени тэга пользовательского элемента
возвращает конструктор элемента. Возвращает `undefined` , если не было
зарегистрировано ни одного определения элемента для переданного имени.

Пример:

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

Пример:

```
customElements.whenDefined('app-drawer').then(() => {
  console.log('ready!');
});
```

## История версий и поддержка браузерами {: #historysupport}

Если вы следили за Web Components последние несколько лет, то знаете, что в
версии Chrome 36+ реализована версия API Custom Elements, в которой вместо
`document.registerElement()` используется `customElements.define()` . Эта версия
(v0) стандарта сейчас рассматривается устаревшей. `customElements.define()` -
новый востребованный метод, который поставщики браузеров начинают реализовывать.
Она называется Custom Elements v1.

Если вы, вдруг, заинтересованы в спецификации более ранней версии (v0), то
ознакомьтесь со своим товаром [html5rocks
article](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)
{: .external}.

### Поддержка браузерами

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

Для того чтобы определить, поддерживает ли браузер создание пользовательских
элементов, проверьте наличие `window.customElements` :

```
const supportsCustomElementsV1 = 'customElements' in window;
```

#### Полифилл (* библиотека, которая добавляет в старые браузеры поддержку возможностей, которые в современных браузерах являются встроенными) {: #polyfill}

Пока во многих браузерах не реализована поддержка этой возможности, вы можете
использовать [автономный
полиполк](https://github.com/webcomponents/custom-elements/) для добавления
поддержки пользовательских элементов v1. Однако, мы рекомендуем использовать
[загрузчик](https://github.com/webcomponents/webcomponentsjs#using-webcomponents-loaderjs)
загрузчика webcomponents.js для оптимальной загрузки полифиллов веб-компонентов.
Загрузчик проверяет поддержку возможностей для асинхронной загрузки только
необходимых для браузера полифиллов.

Обратите внимание: если выполняется транспиляция вашего проекта или в нем
используется ES5, то обязательно ознакомьтесь с советами по добавлению
[custom-elements-es5-adapter.js](https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs)
в дополнение к полифиллам.

Установите его при помощи команды:

```
npm install --save @webcomponents/webcomponentsjs
```

Использование:

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

Обратите внимание: нельзя добавить поддержку псевдокласса CSS `:defined` .

## Заключение

Технология Пользовательские элементы предоставили нам новый инструмент для
определения новых тэгов HTML в браузере и создании компонентов для повторного
использования. При совместном использовании пользовательских элементов с другими
новыми примитивами Веб-платформа (* коллекция технологий, разработанных как
открытые стандарты Кносорциумом World Wide Web (консорциум производителей
программного обеспечения для интернета, поддерживающих его стандартов) и по
стандартизации (Рабочая группа по технологии веб-гипертекстовой технологии,
Консорциум Unicode, Целевая группа Internet Engineering и Ecma International). В
состав Веб-платформы входят технологии - языки и API - которые изначально были
созданы для публикации веб-страниц. Среди них: HTML, CSS 2.1, CSS, SVG,
ECMAScript , WebGL, Web Storage, Indexed Database API и т. Д.) (Например, Shadow
DOM и `<template>` ) мы начинаем понимать общую картину Веб-компоненты:

- Web Components - кросс-браузерная технология (веб-стандарт) для создания
веб-компонентов для повторного использования и расширения их возможностей.
- Для того, чтобы начать работать с этой технологией, не нужно подключать
никаких библиотек или фреймворков. Чистый код JS / HTML / CSS - все, что
необходимо для победы!
- Предоставляет знакомую модель программирования (* описание возможностей,
доступных для эффективного программирования в рамках компьютерной архитектуры),
в которых используются только DOM / CSS / HTML.
- Совместимость с другими преимуществами Веб-платформа (Shadow DOM, `<template>`
, пользовательские свойства CSS и т.д.).
- Тесно интегрирована с DevTools браузера.
- Пользуется существующими доступностью пользовательского интерфейса.

## Замечания и предложения {: #inline-feedback }

{% include "web/_shared/helpful.html" %}
