project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Os elementos personalizados permitem que desenvolvedores da Web definam novas tags HTML, ampliem as já existentes e criem componentes da Web reutilizáveis.

{# wf_updated_on: 2016-09-26 #}
{# wf_published_on: 2016-06-28 #}

# Custom Elements v1: Componentes de Web Reutilizáveis {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc }

O [Custom Elements][spec] permite que os desenvolvedores da Web **criem novas tags HTML**,
aprimorem as tags HTML existentes ou ampliem componentes criados por outros desenvolvedores.
A API é a fundação dos [componentes da Web](http://webcomponents.org/){: .external }. Ela disponibiliza
uma forma de criar componentes reutilizáveis baseada em padrões da Web, usando nada mais que
JS/HTML/CSS comuns. Os resultados são menos código, código modular e mais reutilização nos aplicativos.

## Introdução {: #intro}

Observação: Este artigo descreve a nova <a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-elements" target="_blank">especificação Custom Elements v1</a>. Se você já usou elementos personalizados, é provável que conheça a <a href="https://www.chromestatus.com/features/4642138092470272">versão v0, fornecida no Chrome 33</a>. Os conceitos são os mesmos, mas a especificação v1 tem diferenças importantes de API. Continue a ler para ver quais são as novidades ou confira a seção <a href="#historysupport">Histórico e compatibilidade de navegadores</a> para obter mais informações.

O navegador nos proporciona uma ferramenta excelente para estruturar aplicativos da Web.
Essa ferramenta é o HTML.  Talvez você já tenha ouvido falar dele. O HTML é declarativo, portátil, amplamente compatível e fácil de trabalhar. O HTML é ótimo. No entanto, seu vocabulário e sua capacidade de extensão são limitados. O [padrão atual do HTML](https://html.spec.whatwg.org/multipage/){: .external } não dispõe de uma forma de associar automaticamente o comportamento do JS à marcação... até agora.

Os elementos personalizados são a resposta para a modernização do HTML, completando as partes faltantes
e agrupando estrutura e comportamentos. Se o HTML não fornecer a solução para um problema,
poderemos criar um elemento personalizado que faça isso. **Os elementos personalizados ensinam novas funcionalidades ao navegador, sem deixar de preservar os benefícios do HTML**.

## Definir um novo elemento {: #define}

Para definir um novo elemento do HTML, precisamos dos recursos do JavaScript.

O objeto global `customElements` é usado para definir um elemento personalizado e para ensinar
a nova tag ao navegador. Chame `customElements.define()` com o nome da tag que quer
criar e uma `class` do JavaScript que estenda a base `HTMLElement`.

**Exemplo** - definir um painel de gaveta para dispositivos móveis, `<app-drawer>`:


    class AppDrawer extends HTMLElement {...}
    window.customElements.define('app-drawer', AppDrawer);
    
    // Or use an anonymous class if you don't want a named constructor in current scope.
    window.customElements.define('app-drawer', class extends HTMLElement {...});
    

Exemplo de uso:


    <app-drawer></app-drawer>
    

É importante lembrar que o uso de um elemento personalizado não é diferente do uso de um `<div>` ou qualquer outro elemento. As instâncias podem ser declaradas na página e criadas dinamicamente no JavaScript; é possível anexar ouvintes de eventos, etc. Continue a leitura para obter mais exemplos.

### Definir a JavaScript API de um elemento {: #jsapi}

A funcionalidade de um elemento personalizado é definida usando um ES2015 [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), que estende `HTMLElement`.
A extensão de `HTMLElement` garante que o elemento personalizado herde toda a DOM API e
significa que todas as propriedades/métodos adicionados à classe se tornam parte da interface DOM do elemento.
Essencialmente, use a classe para criar uma **JavaScript API pública** para a tag.

**Exemplo** - definir a interface do DOM de `<app-drawer>`:


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
    

Nesse exemplo, criamos uma gaveta que tem uma propriedade `open`, uma propriedade `disabled`
e um método `toggleDrawer()`. Além disso, [reflete propriedades como atributos do HTML](#reflectattr).

Um recurso elegante dos elementos personalizados é que **`this`, dentro de uma definição de classe, é uma referência ao
próprio elemento do DOM**, ou seja, à instância da classe. No nosso exemplo, `this` é uma referência a `<app-drawer>`. É assim (😉) que o elemento pode anexar um ouvinte `click` a si mesmo. E você não está limitado a ouvintes de eventos. Toda a DOM API está disponível dentro do código do elemento. Use `this` para acessar as propriedades dos elementos, inspecionar seus filhos (`this.children`), consultar nós (`this.querySelectorAll('.items')`), etc.

**Regras para a criação de elementos personalizados**

1. O nome de um elemento personalizado **deve conter um traço (-)**. Portanto `<x-tags>`, `<my-element>` e `<my-awesome-app>` são nomes válidos, mas `<tabs>` e `<foo_bar>` não. O motivo desse requisito é que o analisador HTML possa distinguir entre elementos personalizados e elementos normais. Além disso, garante compatibilidade futura quando novos tags forem adicionados ao HTML.
2. Não é possível registrar a mesma tag mais de uma vez. Se você tentar fazer isso, será acionada uma `DOMException`. Informe o navegador sobre uma nova tag. É só isso. Sem devoluções.
3. Os elementos personalizados não podem se fechar automaticamente, pois o HTML permite isso [somente para alguns elementos](https://html.spec.whatwg.org/multipage/syntax.html#void-elements). Escreva sempre uma tag de fechamento (<code>&lt;app-drawer&gt;&lt;/app-drawer&gt;</code>).

## Estender elementos {: #extend}

Além de ser útil para criar novos elementos HTML, a Custom Elements API também
pode ampliar outros elementos personalizados ou até mesmo o HTML integrado no navegador.

### Estender um elemento personalizado {: #extendcustomeel}

A extensão de outro elemento personalizado é efetuada estendendo sua definição de classe.

**Exemplo** - criar `<fancy-app-drawer>`, que estende `<app-drawer>`:


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
    

### Estender elementos HTML nativos {: #extendhtml}

Vamos supor que você queira criar um `<button>` mais elegante. Em vez de replicar o comportamento e a
funcionalidade de `<button>`, é melhor aprimorar progressivamente o elemento existente usando elementos personalizados.

Um **elemento personalizado incorporado** é um elemento personalizado que estende uma das tags HTML
incorporadas do navegador. A principal vantagem da extensão de um elemento existente é
obter todos os seus recursos (propriedades do DOM, métodos, acessibilidade). A melhor forma de criar um [Progressive Web App](/web/progressive-web-apps/) é **aprimorar progressivamente elementos HTML existentes**.

Para estender um elemento, será necessário criar uma definição de classe que herde
da interface DOM correta. Por exemplo, um elemento personalizado que estende `<button>`
precisa herdar de `HTMLButtonElement` em vez de `HTMLElement`. De forma semelhante, um
elemento que estende `<img>` precisa estender `HTMLImageElement`.

**Exemplo** - estender `<button>`:


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
    

Observe que a chamada a `define()` é um pouco diferente na extensão de um elemento nativo. O terceiro parâmetro, obrigatório, informa ao navegador qual tag está sendo estendida. Isso é necessário porque muitas tags HTML compartilham a mesma interface do DOM. `<section>`, `<address>` e `<em>` (entre outros) compartilham `HTMLElement`; `<q>` e `<blockquote>` compartilham `HTMLQuoteElement`; etc.. A especificação de `{extends: 'blockquote'}` permite que o navegador saiba que você está criando um `<blockquote>` aperfeiçoado, em vez de um `<q>`. Consulte [a especificação do HTML](https://html.spec.whatwg.org/multipage/indices.html#element-interfaces) para
obter a lista completa das interfaces do DOM do HTML.

Observação: A extensão de `HTMLButtonElement` aprimora nosso botão elegante com todas as propriedades/métodos do DOM de `<button>`. Com isso, não precisamos fazer nossa própria implementação de muitas coisas: propriedade `disabled`, método `click()`, ouvintes `keydown`, gerenciamento de `tabindex`. Em vez disso, podemos nos concentrar no aprimoramento progressivo de `<button>` com funcionalidades personalizadas, ou seja, o método `drawRipple()`. Menos código, mais reutilização!

Os clientes de um elemento personalizado incorporado podem usá-lo de diversas formas.
O elemento pode ser declarado adicionando o atributo `is=""` à tag nativa:


    <!-- This <button> is a fancy button. -->
    <button is="fancy-button" disabled>Botão bonito!</button>
    

Ou criando uma instância no JavaScript:


    // Custom elements overload createElement() to support the is="" attribute.
    let button = document.createElement('button', {is: 'fancy-button'});
    button.textContent = 'Fancy button!';
    button.disabled = true;
    document.body.appendChild(button);
    

Ou usando o operador `new`:


    let button = new FancyButton();
    button.textContent = 'Fancy button!';
    button.disabled = true;
    

Veja a seguir outro exemplo que estende `<img>`:

**Exemplo** - estender `<img>`:


    customElements.define('bigger-img', class extends Image {
      // Give img default size if users don't specify.
      constructor(width=50, height=50) {
        super(width * 10, height * 10);
      }
    }, {extends: 'img'});
    

Os usuários declaram esse componente como:


    <!-- This <img> is a bigger img. -->
    <img is="bigger-img" width="15" height="20">
    

Ou criam uma instância no JavaScript:


    const BiggerImage = customElements.get('bigger-img');
    const image = new BiggerImage(15, 20); // pass ctor values like so.
    console.assert(image.width === 150);
    console.assert(image.height === 200);
    

Observação: Alguns navegadores demonstraram aversão à implementação da sintaxe  <code>is=""</code>. Isso é uma má notícia para a acessibilidade e os aprimoramentos progressivos. Se você acha que a extensão de elementos nativos do HTML é útil, divulgue sua opinião <a href='https://github.com/w3c/webcomponents/issues/509'>no Github</a>.

## Reações do elemento personalizado {: #reactions}

Um elemento personalizado pode definir ganchos de ciclo de vida especiais para a execução de código durante
momentos interessante de sua existência. Esses ganchos são denominados **reações do elemento personalizado**.

<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Chamado quando</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>constructor</code></td>
      <td>Uma instância do elemento é criada ou <a href="#upgrades">atualizada</a>. Útil para inicializar um estado, configurar escutas de eventos ou <a href="#shadowdom">criar o Shadow DOM</a>. Consulte a <a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance">especificação</a> para ver as restrições sobre o que é possível fazer no  <code>constructor</code>.</td>
    </tr>
    <tr>
      <td><code>connectedCallback</code></td>
      <td>Chamado todas as vezes que o elemento é inserido no DOM. Útil para executar código de instalação, como recuperação de recursos ou renderização. Normalmente, você deve tentar retardar o trabalho até esse momento.</td>
    </tr>
    <tr>
      <td><code>disconnectedCallback</code></td>
      <td>Chamado todas as vezes que o elemento é removido do DOM. Útil para executar código de limpeza (remoção de ouvintes de eventos, etc.).</td>
    </tr>
    <tr>
      <td><code>attributeChangedCallback(attrName, oldVal, newVal)</code></td>
      <td>Um atributo foi adicionado, removido, atualizado ou substituído. Também chamado para valores iniciais quando um elemento é criado ou <a href="#upgrades">atualizado</a> pelo analisador. <b>Observação:</b> somente os atributos listados na propriedade  <code>observedAttributes</code> receberão esse retorno de chamada.</td>
    </tr>
    <tr>
      <td><code>adoptedCallback()</code></td>
      <td>O elemento personalizado foi movido para um novo <code>document</code> (por exemplo, alguém chamou <code>document.adoptNode(el)</code>).</td>
    </tr>
  </tbody>
</table>

O navegador chama o `attributeChangedCallback()` para todos os atributos que constam na lista de permissões
na matriz `observedAttributes` (consulte [Observar alterações em atributos](#attrchanges)).
Essencialmente, é uma otimização de desempenho. Quando os usuários alteram um atributo
comum como `style` ou `class`, você não quer receber toneladas de retornos de chamada.

**Retornos de chamada de reação são síncronos**. Se alguém chamar `el.setAttribute(...)`
no elemento, o navegador chamará imediatamente `attributeChangedCallback()`. De forma semelhante,
você receberá um `disconnectedCallback()` logo após a remoção do elemento do
DOM (por exemplo, o usuário chama `el.remove()`).

**Exemplo:** adicionar reações de elemento personalizado ao `<app-drawer>`:


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
    

Defina reações se/quando isso fizer sentido. Se o elemento for bastante complexo e abrir uma conexão ao IndexedDB em `connectedCallback()`, faça o trabalho de limpeza necessário em `disconnectedCallback()`. Mas tome cuidado! Você não pode depender do elemento sendo removido do DOM em todas as circunstâncias. Por exemplo, `disconnectedCallback()` nunca será chamado se o usuário fechar a guia.

**Exemplo:** mover um elemento personalizado para outro documento, observando seu `adoptedCallback()`:


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
    

## Propriedades e atributos

### Refletir propriedades para atributos {: #reflectattr}

É comum que as propriedades do HTML reflitam seu valor no DOM como um atributo do HTML.
Por exemplo, quando os valores de `hidden` ou `id` são alterados no JS:


    div.id = 'my-id';
    div.hidden = true;
    

Os valores são aplicados ao DOM em execução como atributos:


    <div id="my-id" hidden>
    

Isso é chamado "[refletir propriedades para atributos](https://html.spec.whatwg.org/multipage/infrastructure.html#reflecting-content-attributes-in-idl-attributes)". Praticamente todas as propriedades do HTML fazem isso. Por quê? Os atributos também são úteis para configurar um
elemento de forma declarativa, e algumas APIs, como acessibilidade e seletores CSS, dependem desses atributos para funcionar.

A reflexão de uma propriedade será útil sempre que você quiser **manter a representação do elemento
no DOM em sincronia com seu estado no JavaScript**. Um motivo para
refletir uma propriedade é aplicar estilos definidos pelo usuário quando o estado do JS muda.

Lembre-se de nossa `<app-drawer>`. Um consumidor desse componente pode querer esmaecê-lo
e/ou evitar interações do usuário enquanto o componente estiver desativado:


    app-drawer[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }
    

Quando a propriedade `disabled` é alterada no JS, queremos que esse atributo seja adicionado
ao DOM para que o seletor do usuário corresponda. O elemento pode fornecer esse comportamento
refletindo o valor para um atributo do mesmo nome:


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
    

### Observar alterações em atributos {: #attrchanges}

Os atributos do HTML são uma forma conveniente de declaração do estado inicial pelos usuários:


    <app-drawer open disabled></app-drawer>
    

Os elementos podem reagir às mudanças de atributos definindo um `attributeChangedCallback`.
O navegador chama esse método para cada mudança nos atributos listados na matriz `observedAttributes`.


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
    

No exemplo, estamos definindo atributos adicionais no `<app-drawer>` quando um
atributo `disabled` é alterado. Embora não façamos isso aqui, você também poderia
**usar `attributeChangedCallback` para manter uma propriedade do JS sincronizada com seu atributo**.

## Atualizações de elementos {: #upgrades}

### HTML aprimorado progressivamente

Já vimos que os elementos personalizados são definidos chamando `customElements.define()`.
Mas isso não significa que você tem de definir e registrar um elemento personalizado de uma só vez.

**Os elementos personalizados podem ser usados _antes_ do registro de sua definição**.

O aprimoramento progressivo é um recurso dos elementos personalizados. Em outras palavras, você pode declarar vários elementos `<app-drawer>` na página e somente invocar `customElements.define('app-drawer', ...)` muito depois. O motivo é que o navegador trata possíveis elementos personalizados de forma diferente graças a [tags desconhecidas](#unknown). O processo de chamar `define()` e aprimorar um elemento existente com uma definição de classe é denominado "atualização de elementos".

Para saber quando uma tag é definida, você pode usar `window.customElements.whenDefined()`.
Ele disponibiliza uma promessa que será resolvida quando o elemento se tornar definido.


    customElements.whenDefined('app-drawer').then(() => {
      console.log('app-drawer defined');
    });
    

**Exemplo** - retardar o trabalho até que um conjunto de elementos filho seja atualizado


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
    

Observação: Eu imagino os elementos personalizados como estando em um limbo antes de serem definidos. A [especificação](https://dom.spec.whatwg.org/#concept-element-custom-element-state) define o estado de um elemento como "indefinido", "não personalizado" ou "personalizado". Elementos incorporados, como `<div>`, têm sempre o status "definido".

## Conteúdo definido pelo elemento {: #addingmarkup}

Os elementos personalizados podem gerenciar seu próprio conteúdo usando as DOM APIs dentro do código do elemento. As [reações](#reactions) são úteis para essa finalidade.

**Exemplo** - criar um elemento com algum HTML padrão:

    customElements.define('x-foo-with-markup', class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
      }
      ...
    });
    
Declaring this tag will produce:

    <x-foo-with-markup>
     <b>Sou um x-foo-com-marcação!</b>
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

Observação: Normalmente, a substituição dos filhos de um elemento com novo conteúdo não é uma boa ideia, por ser algo inesperado. Os usuários ficariam surpresos com o descarte das marcações. Uma maneira melhor para adicionar conteúdo definido no elemento é usar o shadow DOM. É sobre isso que falaremos a seguir.

### Criar um elemento que usa o Shadow DOM {: #shadowdom}

Observação: Não vou descrever os recursos do [Shadow DOM][sd_spec] neste artigo, mas
ele é uma API avançada que pode ser combinada com elementos personalizados. Por si só, o Shadow DOM é
uma ferramenta de composição. Quando usado com elementos personalizados, coisas incríveis acontecem.


O Shadow DOM permite que um elemento tenha, renderize e estilize um bloco de DOM
separado do resto da página. Você pode até ocultar todo
o aplicativo em uma única tag:


    <!-- chat-app's implementation details are hidden away in Shadow DOM. -->
    <chat-app></chat-app>
    

Para usar o Shadow DOM em um elemento personalizado, chame `this.attachShadow` dentro do `constructor`:

    customElements.define('x-foo-shadowdom', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.

        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
          <style>:host { ... }</style> <!-- look ma, scoped styles -->
          <b>Sou um Shadow DOM!</b>
          <slot></slot>
        `;
      }
      ...
    });

Exemplo de uso:

    <x-foo-shadowdom>
      <p>Texto personalizado do <b>usuário</b></p>
    </x-foo-shadowdom>
    
    <!-- renders as -->
    <x-foo-shadowdom>
      <b>Sou um Shadow DOM!</b>
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
    <p>Texto personalizado do <b>usuário</b></p>
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

### Criar elementos usando um `<template>` {: #fromtemplate}

Para os que não sabem, o [elemento `<template>`](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element) (modelo) permite declarar fragmentos do DOM que são analisados, ficam inertes na carga da página e podem ser ativados posteriormente em tempo de execução. É outro primitivo de API na família de componentes da Web. **Os modelos são um marcador ideal para declarar a estrutura de um elemento personalizado**.

**Exemplo:** registrar um elemento com conteúdo do Shadow DOM criado usando um `<template>`:

    <template id="x-foo-from-template">
      <style>
        p { color: orange; }
      </style>
      <p>Estou no Shadow DOM. Minha marcação foi copiada de um &lt;template&gt;.</p>
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
    

Essas poucas linhas de código fazem muita coisa. Vamos entender suas principais atividades:

1. Definimos um novo elemento no HTML: `<x-foo-from-template>`
2. O Shadow DOM do elemento é criado usando um `<template>`
3. O DOM do elemento é local em relação ao elemento, graças ao Shadow DOM
4. O CSS interno do elemento tem o escopo do elemento, graças ao Shadow DOM

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
  <p>Estou no Shadow DOM. Minha marcação foi copiada de um &lt;template&gt;.</p>
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

## Aplicar um estilo a um elemento personalizado {: #styling}

Mesmo se o elemento definir seu próprio estilo usando o Shadow DOM, os usuários poderão
usar a página para aplicar estilo ao elemento personalizado. Esses estilos são denominados "estilos definidos pelo usuário".


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
      <panel-item>Dó</panel-item>
      <panel-item>Ré</panel-item>
      <panel-item>Mi</panel-item>
    </app-drawer>
    

Você pode estar se perguntando como funcionará a especificidade do CSS se o elemento tiver
estilos definidos no Shadow DOM. Em termos de especificidade, os estilos do usuário predominam.
Eles sempre modificarão os estilos definidos no elemento. Veja a seção sobre [Criar um elemento que usa o Shadow DOM](#shadowdom).

### Aplicar estilo predefinido elementos não registrados {: #prestyle}

Antes que um elemento seja [atualizado](#upgrades), você poderá fazer referência a ele no CSS usando a pseudoclasse `:defined`.
Isso é útil para aplicar estilo predefinido a um componente. Por exemplo, para evitar
layout ou outro flash de conteúdo sem estilo (FOUC) visual, oculte componentes indefinidos e exiba-os
quando forem definidos.

**Exemplo** - oculte `<app-drawer>` antes de ser definido:


    app-drawer:not(:defined) {
      /* Pre-style, give layout, replicate app-drawer's eventual styles, etc. */
      display: inline-block;
      height: 100vh;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
    

Depois que `<app-drawer>` for definido, o seletor (`app-drawer:not(:defined)`)
deixa de corresponder.

## Detalhes diversos {: #details}

### Elementos desconhecidos vs. elementos personalizados indefinidos {: #unknown}

O HTML pode ser usado de forma leniente e flexível. Por exemplo, declare `<randomtagthatdoesntexist>` em uma página e navegador aceitará isso sem qualquer problema. Por que as tags não padrão funcionam? A resposta é que isso é permitido pela [especificação do HTML](https://html.spec.whatwg.org/multipage/dom.html#htmlunknownelement). Elementos não definidos na especificação são analisados como `HTMLUnknownElement`.

O mesmo não acontece com elementos personalizados. Os possíveis elementos personalizados são analisados como
um `HTMLElement`, se criados com um nome válido (incluindo um "-"). Você pode verificar isso em um navegador compatível com elementos personalizados. Acione o console: <span class="kbd">Ctrl</span>+<span class="kbd">Shift</span>+<span class="kbd">J</span> (ou <span class="kbd">Cmd</span>+<span class="kbd">Opt</span>+<span class="kbd">J</span> no Mac) e cole as linhas de código a seguir:


    // "tabs" is not a valid custom element name
    document.createElement('tabs') instanceof HTMLUnknownElement === true
    
    // "x-tabs" is a valid custom element name
    document.createElement('x-tabs') instanceof HTMLElement === true
    

## Referência da API

O objeto global `customElements` define métodos úteis para trabalhar com elementos personalizados.

**`define(tagName, constructor, options)`**

Define um novo elemento personalizado no navegador.

Exemplo


    customElements.define('my-app', class extends HTMLElement { ... });
    customElements.define(
      'fancy-button', class extends HTMLButtonElement { ... }, {extends: 'button'});
    

**`get(tagName)`**

Dado um nome de tag de elemento personalizado válido, retorna o construtor do elemento. Retorna `undefined`
se nenhuma definição de elemento foi registrada.

Exemplo


    let Drawer = customElements.get('app-drawer');
    let drawer = new Drawer();
    

**`whenDefined(tagName)`**

Retorna uma promessa, que será resolvida quando o elemento personalizado for definido. Se o elemento
já foi definido, resolve a promessa imediatamente. Rejeita a solicitação de promessa se o nome da tag não é um nome
de elemento personalizado válido

Exemplo


    customElements.whenDefined('app-drawer').then(() => {
      console.log('ready!');
    });
    

## Histórico e compatibilidade de navegadores {: #historysupport}

Se você acompanhou os componentes da Web nos últimos dois anos, sabe que o
Chrome 36+ implementou uma versão da Custom Elements API que usa `document.registerElement()`
em vez de `customElements.define()`. Hoje, é considerada uma versão suspensa do
padrão, denominada v0. `customElements.define()` é mais moderna e é
o que os fornecedores de navegador estão começando a implementar. É a versão Custom Elements v1.

Se você ainda estiver interessado na antiga especificação v0, confira o [artigo de html5rocks](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/){: .external }.

### Compatibilidade de navegadores

O Chrome 54 ([status](https://www.chromestatus.com/features/4696261944934400)) tem Custom Elements v1. O Safari [iniciou a prototipação](https://bugs.webkit.org/show_bug.cgi?id=150225) e você pode testar a API na Web toda noite. O Edge [iniciou a prototipação](https://twitter.com/AaronGustafson/status/717028669948977153). O Mozilla tem um [bug em aberto](https://bugzilla.mozilla.org/show_bug.cgi?id=889230) para a implementação.

Para detectar elementos personalizados, verifique a existência de `window.customElements`:


    const supportsCustomElementsV1 = 'customElements' in window;
    

#### Polyfill {: #polyfill}

Até que uma ampla compatibilidade de navegadores esteja disponível, há um [polyfill](https://github.com/webcomponents/custom-elements/blob/master/custom-elements.min.js) disponível. 

**Observação**: a pseudo-classe CSS `:defined` não permite o polyfill.

Instale:

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
      // Native support. Pronto.
    }
    

## Conclusão

Os elementos personalizados nos oferecem uma nova ferramenta para definir novas tags HTML no navegador e criar componentes
reutilizáveis. Combine-os com outros novos primitivos da plataforma, como Shadow DOM e `<template>`, para começar a perceber a abrangência geral dos Web Components:

- Compatível com todos os navegadores (padrão da Web) para criar e estender componentes reutilizáveis.
- Não exige biblioteca ou framework para começar a usar. JS/HTML comum... fantástico!
- Oferece um modelo de programação familiar. É apenas DOM/CSS/HTML.
- Funciona bem com outros novos recursos da plataforma da Web (Shadow DOM, `<template>`, propriedades personalizadas do CSS etc.)
- Estreitamente integrado ao DevTools do navegador.
- Use recursos de acessibilidade atuais.

[spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/


{# wf_devsite_translation #}
