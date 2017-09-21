project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: O Shadow DOM permite que desenvolvedores da Web criem DOM e CSS compartimentalizados para componentes da Web

{# wf_updated_on: 2016-10-13 #}
{# wf_published_on: 2016-08-01 #}

# Shadow DOM v1: Componentes da Web Independentes {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc}

O Shadow DOM remove as complicações da criação de apps da Web. Essas complicações
são geradas pela natureza global do HTML, do CSS e do JS. Ao longo dos anos,
inventamos um [número enorme](http://getbem.com/introduction/)
 [de](https://github.com/css-modules/css-modules)
 [ferramentas](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)
 para contornar esses problemas. Por exemplo, quando você usa um novo id/classe do HTML,
não há como dizer se ele conflitará com um nome já existente na página.
[Erros sutis](http://www.2ality.com/2012/08/ids-are-global.html) aparecem,
a especificidade do CSS se torna um grande problema (`!important` para tudo!), os
seletores de estilo crescem descontrolados e o
[desempenho pode ser afetado](/web/updates/2016/06/css-containment). A lista de problemas
não termina por aí.

**O Shadow DOM corrige o CSS e o DOM**. Ele introduz **estilos com escopo** na plataforma
da Web. Sem ferramentas nem convenções de nomenclatura, você pode **empacotar CSS
com marcação**, ocultar detalhes de implementação e **criar componentes
independentes** usando JavaScript simples.

## Introdução {: #intro}

Observação: **Já conhece o Shadow DOM?**Este artigo descreve a nova 
<a href="http://w3c.github.io/webcomponents/spec/shadow/" target="_blank">
especificação do Shadow DOM v1</a>. Se você já usa o Shadow DOM, é provável que já
conheça a <a href="https://www.chromestatus.com/features/4507242028072960">
versão v0 fornecida no Chrome 35</a> e os polyfills do webcomponents.js.
Os conceitos são os mesmos, mas a especificação v1 tem diferenças importantes de API. Além disso,
ela é a versão que todos os navegadores importantes concordaram
em implementar. As implementações já estão disponíveis no Safari Tech Preview e no Chrome Canary. Continue a ler
para ver quais são as novidades ou confira a seção <a href="#historysupport">
Histórico e compatibilidade de navegadores</a> para obter mais informações.

O Shadow DOM é um dos quatro padrões de Web Component: 
[modelos HTML](https://www.html5rocks.com/en/tutorials/webcomponents/template/),
[Shadow DOM][sd_spec_whatwg],
[elementos personalizados](/web/fundamentals/getting-started/primers/customelements) e
[importações de HTML](https://www.html5rocks.com/en/tutorials/webcomponents/imports/).

Você não precisa criar componentes da Web que usam o shadow DOM. Mas, quando faz isso,
aproveita suas vantagens (escopo de CSS, encapsulamento
de DOM, composição) e cria
[elementos personalizados](/web/fundamentals/getting-started/primers/customelements),
 reutilizáveis que são resilientes, altamente configuráveis e extremamente reutilizáveis. Se os elementos
personalizados são a forma de criar um novo HTML (com uma JS API), o shadow DOM é
a forma de disponibilizar seu HTML e CSS. As duas APIs se combinam para fazer um componente
com HTML, CSS e JavaScript independentes.

O Shadow DOM foi projetado como uma ferramenta para a criação de aplicativos baseados em componentes. Assim,
ele traz soluções para problemas comuns no desenvolvimento da Web:

- **DOM isolado**: O DOM de um componente é independente (por exemplo, 
`document.querySelector()` não retorna nós no shadow DOM do componente).
- **CSS com escopo**: o CSS definido dentro do shadow DOM assume o seu escopo. As regras de estilo 
  não vazam e os estilos das páginas não interferem.
- **Composição**: Crie uma API declarativa e baseada em marcação para o componente.
- **Simplifica o CSS** - o DOM com escopo significa que você pode usar seletores CSS, 
  nomes de ID/classe mais genéricos e não se preocupar com conflitos de nomenclatura.
- **Produtividade** - pense nos aplicativos como blocos de DOM em vez de uma página 
grande (global).

Observação: Embora você possa usar a shadow DOM API e seus benefícios fora dos componentes
da Web, vamos nos concentrar apenas nos exemplos que usam elementos personalizados.
Usaremos a API de elementos personalizados v1 em todos os exemplos.


#### `fancy-tabs` demonstração {: #demo}

Neste artigo, faremos referência a um componente de demonstração (`<fancy-tabs>`)
e a snippets de seu código. Se o seu navegador for compatível com as APIs,
uma demonstração ao vivo será exibida logo abaixo. Caso contrário, verifique o 
<a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">
código-fonte completo no Github</a>.

<figure class="demoarea">
  <iframe style="height:360px;width:100%;border:none" src="https://rawgit.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b/raw/fancy-tabs-demo.html"></iframe>
  <figcaption>
    <a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">
  Ver código-fonte no Github
    </a>
  </figcaption>
</figure>

## O que é o shadow DOM? {: #what}

#### Conceitos básicos do DOM {: #sdbackground}

O HTML sustenta a Web porque é fácil trabalhar com ele. Declarando algumas tags, você
pode criar uma página em segundos com apresentação e estrutura. No entanto,
sozinho, o HTML não é tão útil. Os humanos conseguem entender facilmente uma linguagem
baseada em texto, mas as máquinas precisam de algo mais. Apresentamos o Document Object
Model, ou DOM.

Quando o navegador carrega uma página da Web, faz muitas coisas interessantes. Uma delas
é transformar o HTML em um documento vivo.
Basicamente, para compreender a estrutura da página, o navegador analisa o HTML (strings
estáticos de texto) e o converte em um modelo de dados (objetos/nós). O navegador preserva a hierarquia do
HTML criando uma árvore desses nós: o DOM. O interessante
do DOM é que ele é uma representação vida da página. Ao contrário do HTML
estático que criamos, os nós gerados pelo navegador contêm propriedades, métodos e, o melhor
de tudo... podem ser manipulados por programas! É por isso que conseguimos criar elementos do
DOM diretamente usando JavaScript:


    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Hello world!';
    header.appendChild(h1);
    document.body.appendChild(header);
    

gera a marcação HTML a seguir:


    <body>
      <header>
        <h1>Hello DOM</h1>
      </header>
    </body>
    

Tudo isso é ótimo. Mas, 
[o que é esse tal de _shadow DOM_](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/)?

#### O DOM... paralelo {: #sddom}

O Shadow DOM é apenas o DOM normal, com duas diferenças: 1) a forma como é criado/usado e
2) a forma como se comporta em relação ao resto da página. Normalmente, você cria nós do DOM
e os anexa como filhos de outro elemento. Com o shadow DOM, você
cria uma árvore do DOM com escopo que é anexada ao elemento, mas separada
de seus filhos reais. Essa subárvore com escopo é denominada **árvore paralela**. O elemento
é anexado ao seu **host paralelo**. Tudo o que você adiciona em paralelo se torna
local ao elemento host, incluindo `<style>`. É assim que o shadow DOM
consegue definir um escopo para o estilo do CSS.

## Criar o shadow DOM {: #create}

Uma **raiz paralela** é um documento fragmentado anexado a um elemento "host".
O elemento obtém seu shadow DOM mediante a anexação de uma raiz paralela. Para
criar um shadow DOM para um elemento, chame `element.attachShadow()`:


    const header = document.createElement('header');
    const shadowRoot = header.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>'; // Could also use appendChild().
    
    // header.shadowRoot === shadowRoot
    // shadowRoot.host === header
    

Estou usando `.innerHTML` para preencher a raiz paralela, mas outras APIs do DOM também
poderiam ser usadas. Estamos na Web. Temos opções.

A especificação [define uma lista de documentos](http://w3c.github.io/webcomponents/spec/shadow/#h-methods)
que não podem hospedar uma árvore paralela. Há vários motivos para que um elemento
esteja na lista:

- O navegador já hospeda seu próprio shadow DOM para o elemento 
 (`<textarea>`, `<input>`).
- Não faz sentido que o elemento hospede um (`<img>`) do shadow DOM.

Por exemplo, isso não funciona:


    document.createElement('input').attachShadow({mode: 'open'});
    // Error. `<input>` cannot host shadow dom.
    

### Criar o shadow DOM usando um elemento personalizado {: #elements}

O Shadow DOM é particularmente útil na criação de
[elementos personalizados](/web/fundamentals/getting-started/primers/customelements).
Use o shadow DOM para compartimentalizar o HTML, o CSS e o JS de um elemento, produzindo
assim um "componente da Web".

**Exemplo** - um elemento personalizado **anexa o shadow DOM a si mesmo**,
encapsulando seu DOM/CSS:

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

Algumas coisas interessantes estão acontecendo. A primeira é que o
elemento personalizado **cria seu próprio shadow DOM** quando uma instância de `<fancy-tabs>`
é criada. Isso é feito no `constructor()`. A segunda é que, como estamos criando
uma raiz paralela, as regras do CSS dentro de `<style>` assumirão o escopo de `<fancy-tabs>`.

Observação: Quando você executar esse exemplo, provavelmente notará que nada
será renderizado. A marcação do usuário, aparentemente, desapareceu. Isso ocorre porque o **shadow DOM do
elemento é renderizado em vez de seus filhos**. Se você quiser exibir os filhos,
precisará informar ao navegador onde eles serão renderizados, colocando um
[elemento `<slot>`](#slots) no shadow DOM. Veremos mais sobre isso
[posteriormente](#composition_slot).


## Composição e slots {: #composition_slot}

A composição é um dos recursos menos compreendidos do shadow DOM,
mas é provavelmente o mais importante.

No nosso mundo de desenvolvimento da Web, a composição nos permite criar aplicativos
de forma declarativa usando HTML. Blocos básicos diferentes (`<div>`s, `<header>`s, 
`<form>`s, `<input>`s) são reunidos para formar aplicativos. Algumas dessas tags até trabalham
juntamente com as outras. A composição permite que elementos como `<select>`,
`<details>`, `<form>` e `<video>` sejam tão flexíveis. Cada uma dessas tags aceita
determinados HTML como filhos e fazem algo especial com eles. Por exemplo, 
`<select>` sabe como renderizar `<option>` e `<optgroup>`, transformando-os em widgets
suspensos e de seleção múltipla. O elemento `<details>` renderiza `<summary>` como
uma seta expansível. Até mesmo `<video>` sabe como lidar com determinados filhos: os elementos 
`<source>` não são renderizados, mas afetam o comportamento do vídeo.
É magia pura!

### Terminologia: light DOM vs. shadow DOM {: #lightdom}

A composição do Shadow DOM introduz vários conceitos básicos novos
no desenvolvimento da Web. Antes de entrarmos em detalhes, vamos padronizar a terminologia
para falarmos o mesmo idioma.

**Light DOM**

A marcação escrita por um usuário do seu componente. Esse DOM reside fora do
shadow DOM do componente. Ele consiste nos filhos reais do elemento.


    <button is="better-button">
      <!-- the image and span are better-button's light DOM -->
      <img src="gear.svg" slot="icon">
      <span>Settings</span>
    </button>
    

**Shadow DOM**

O DOM escrito pelo autor do componente. O Shadow DOM é local em relação ao componente e
define sua estrutura interna e o CSS com escopo, bem como encapsula os detalhes
da sua implementação. Além disso, ele define como renderizar marcação criada pelo consumidor
do seu componente.


    #shadow-root
      <style>...</style>
      <slot name="icon"></slot>
      <span id="wrapper">
        <slot>Button</slot>
      </span>
    

**Árvore plana do DOM**

O resultado da distribuição do light DOM do usuário pelo navegador no shadow
DOM, renderizando o produto final. A árvore plana é o que você finalmente verá
no DevTools e o que será renderizado na página.


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
    

### O elemento &lt;slot&gt; {: #slots}

O Shadow DOM compõe árvores do DOM diferentes, juntando-as usando o elemento `<slot>`.
**Os slots são marcadores dentro do componente que _podem_ ser preenchidos pelos usuários com
sua própria marcação**. A definição de um ou mais slots permite que marcações externas sejam
renderizadas no shadow DOM do componente. Essencialmente, você está dizendo: _"renderize a marcação
do usuário aqui"_.

Observação: Os slots são uma forma de criar uma "API declarativa" para um componente da Web. Eles se
combinam ao DOM do usuário para ajudar a renderizar o componente geral, ou seja, **compor
árvores do DOM diferentes em conjunto**.


Os elementos podem "cruzar" a fronteira do shadow DOM quando
convidados por um `<slot>`. Esses elementos são denominados **nós distribuídos**. Conceitualmente, os nós
distribuídos podem parecer um pouco estranhos. Os slots não movem fisicamente o DOM. Eles o
renderizam em outro local, dentro do shadow DOM.

Um componente pode definir zero ou mais slots no shadow DOM. Os slots podem estar vazios
ou fornecer conteúdo de fallback. Se o usuário não fornecer conteúdo do [light DOM](#lightdom)
, o slot renderizará o conteúdo de fallback.


    <!-- Default slot. If there's more than one default slot, the first is used. -->
    <slot></slot>
    
    <slot>Fancy button</slot> <!-- default slot with fallback content -->
    
    <slot> <!-- default slot entire DOM tree as fallback -->
      <h2>Title</h2>
      <summary>Description text</summary>
    </slot>
    

Você também pode criar **slots nomeados**. Os slots nomeados são compartimentos específicos no
shadow DOM que os usuários podem referenciar pelo nome.

**Exemplo** - os slots nomeados no shadow DOM de `<fancy-tabs>`:


    #shadow-root
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    

Os usuários do componente declaram `<fancy-tabs>` da seguinte forma:


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
    

E, caso você esteja imaginando, a árvore plana tem a seguinte aparência:


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
    

Observe que o nosso componente pode tratar configurações diferentes, mas
a árvore plana do DOM permanece a mesma. Também podemos alternar entre `<button>` e 
`<h2>`. Esse componente foi criado para tratar tipos diferentes de filhos... da
mesma forma que o `<select>`.

## Aplicar estilo  {: #styling}

Há várias opções para aplicar estilo a componentes da Web. Um componente que usa shadow
DOM pode ser estilizado pela página principal, definir seus próprios estilos ou fornecer ganchos (na
forma de [propriedades personalizadas do CSS][css_props]) para que os usuários modifiquem os padrões.

### Estilos definidos pelo componente {: #host}

O recurso mais útil do shadow DOM, de longe, é o **CSS com escopo**:

- Os seletores CSS da página externa não se aplicam dentro do componente.
- Os estilos definidos dentro do componente não vazam para fora. Seu escopo é limitado ao elemento host.

**Os seletores CSS usados dentro do shadow DOM se aplicam localmente ao seu componente**.  Na
prática, isso significa que podemos usar nomes de ID/classe comuns novamente,
sem nos preocuparmos com conflitos com outros locais da página. Os seletores CSS mais simples são uma prática recomendada
dentro do Shadow DOM. Além disso, ajudam a melhorar o desempenho.

**Exemplo** - os estilos definidos em uma raiz paralela são locais


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
    

As folhas de estilo também assumem o escopo da árvore paralela:


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
    

Você já se perguntou como o elemento `<select>` renderiza um widget de seleção múltipla
(em vez de um suspenso) quando você adiciona o atributo `multiple`?

<select multiple>
  <option>Do</option>
  <option selected>Re</option>
  <option>Mi</option>
  <option>Fa</option>
  <option>So</option>
</select>

`<select>` pode aplicar estilo _a si mesmo_ de formar diferentes, de acordo
com os atributos declarados para ele. Os componentes da Web também podem aplicar estilo a si mesmos usando o seletor `:host`
.

**Exemplo** - um componente aplicando estilo a si mesmo


    <style>
    :host {
      display: block; /* by default, custom elements are display: inline */
      contain: content; /* CSS containment FTW. */
    }
    </style>
    

Um problema do `:host` é que as regras na página pai têm especificidade maior
que as regras do `:host` definidas no elemento. Ou seja, os estilos externos prevalecem. Isso
permite que os usuários modifiquem externamente o estilo de alto nível do componente. Além disso, o `:host`
 funciona apenas no contexto de uma raiz paralela. Portanto, não pode ser usada
fora do shadow DOM.

A forma funcional do `:host(<selector>)` permite que você atue no host se ele
corresponder a um `<selector>`. Essa é uma ótima forma de seu componente encapsular
comportamentos que reagem à interação do usuário ou declarar ou aplicar estilo
a nós internos baseados no host.


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
    

### Aplicar estilo de acordo com o contexto {: #contextstyling}

O `:host-context(<selector>)` corresponderá o componente se ele ou qualquer de
seus ancestrais corresponder ao `<selector>`. Um uso comum para isso é aplicação de temas de acordo com as áreas próximas
ao componente. Por exemplo, muitas pessoas implementam temas aplicando uma classe a
`<html>` ou `<body>`:


    <body class="darktheme">
      <fancy-tabs>
        ...
      </fancy-tabs>
    </body>
    

`:host-context(.darktheme)` aplicará estilo a `<fancy-tabs>` quando este for
descendente de `.darktheme`:


    :host-context(.darktheme) {
      color: white;
      background: black;
    }
    

`:host-context()` pode ser útil para aplicação de temas, mas uma abordagem ainda
melhor é [criar ganchos de estilo usando propriedades personalizadas do CSS](#stylehooks).

### Aplicar estilo em nós distribuídos {: #stylinglightdom}

`::slotted(<compound-selector>)` corresponde a nós que são distribuídos em
um`<slot>`.

Vamos supor que criamos um componente de crachá:


    <name-badge>
      <h2>Eric Bidelman</h2>
      <span class="title">
        Digital Jedi, <span class="company">Google</span>
      </span>
    </name-badge>
    

O shadow DOM do componente pode aplicar estilo ao `<h2>` e ao `.title` do usuário:


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
    

Como vimos antes, os `<slot>`s não movimentam o light DOM do usuário. Quando os
nós são distribuídos em um `<slot>`, o `<slot>` renderiza seu DOM, mas os
nós ficam fisicamente fixos. **Estilos aplicados antes da distribuição continuam a ser
aplicados após a distribuição**. No entanto, quando o light DOM é distribuído, ele _pode_
assumir estilos adicionais (definidos pelo shadow DOM).

Outro exemplo mais detalhado de `<fancy-tabs>`:


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
    

Nesse exemplo, há dois espaços: um nomeado para os títulos da guia e outro
para o conteúdo das guias. Quando um usuário seleciona uma guia, aplicamos negrito à seleção
e revelamos seu painel. Isso é feito selecionando nós distribuídos com o atributo
`selected`. O JS do elemento personalizado (não mostrado aqui) adiciona
esse atributo no momento certo.

### Aplicar estilo a um componente externo {: #stylefromoutside}

Há algumas maneiras de aplicar externamente estilo a um componente. A maneira mais fácil
é usar o nome da tag como seletor:


    fancy-tabs {
      width: 500px;
      color: red; /* Note: inheritable CSS properties pierce the shadow DOM boundary. */
    }
    fancy-tabs:hover {
      box-shadow: 0 3px 3px #ccc;
    }
    

**Estilos externos sempre prevalecem sobre estilos definidos no shadow DOM**. Por exemplo, se
o usuário escrever o seletor `fancy-tabs { width: 500px; }`, ele prevalecerá sobre a
regra do componente `:host { width: 650px;}`.

Aplicando um estilo ao próprio componente produz resultados limitados. Mas o que acontece se você
quiser aplicar estilo internamente a um componente? Para isso, precisamos das propriedades
personalizadas do CSS.

#### Criar ganchos de estilo usando propriedades personalizadas do CSS {: #stylehooks}

Os usuários poderão alterar estilos internos se o autor do componente fornecer ganchos
para aplicação de estilo usando [propriedades personalizadas do CSS][css_props]. Conceitualmente, a ideia é similar ao
`<slot>`. Você cria "marcadores de estilo" para modificação pelos usuários.

**Exemplo** - `<fancy-tabs>` permite que os usuários modifiquem a cor do segundo plano:


    <!-- main page -->
    <style>
      fancy-tabs {
        margin-bottom: 32px;
        --fancy-tabs-bg: black;
      }
    </style>
    <fancy-tabs background>...</fancy-tabs>
    

Dentro de seu shadow DOM:


    :host([background]) {
      background: var(--fancy-tabs-bg, #9E9E9E);
      border-radius: 10px;
      padding: 10px;
    }
    

Nesse caso, o componente usa `black` como o valor de segundo plano, pois
foi especificado pelo usuário. Caso contrário, assume o valor padrão de `#9E9E9E`.

Observação: Como autor do componente, você é responsável por informar aos desenvolvedores
quais as propriedades personalizadas do CSS que podem usar. Considere isso como uma parte da interface
pública do seu componente. Não deixe de documentar os ganchos de aplicação de estilo.


## Tópicos avançados {: #advanced}

### Criar raízes paralelas fechadas (não recomendado) {: #closed}

Há uma outra variação do shadow DOM denominada modo "fechado". Quando você cria uma
árvore paralela fechada, o JavaScript externo não consegue acessar o DOM
interno do componente. Isso é semelhante à forma que os elementos nativos como `<video>` funcionam. 
O JavaScript não pode acessar o shadow DOM de `<video>` porque ele é implementado pelo navegador usando
uma raiz paralela de modo fechado.

**Exemplo** - criar uma árvore paralela fechada:


    const div = document.createElement('div');
    const shadowRoot = div.attachShadow({mode: 'closed'}); // close shadow tree
    // div.shadowRoot === null
    // shadowRoot.host === div
    

Outras APIs também são afetadas pelo modo fechado:

- `Element.assignedSlot` / `TextNode.assignedSlot` retorna `null`
- `Event.composedPath()` para eventos associados a elementos dentro do shadow
DOM, retorna []

Observação: As raízes paralelas fechadas também não são muito úteis. Alguns desenvolvedores perceberão o modo
fechado como um recurso de segurança artificial. Vamos ser claros: ele **não** é um
recurso de segurança. O modo fechado simplesmente evita que JS externo acesse o
DOM de um elemento interno.


Veja a seguir um resumo dos motivos pelos quais você nunca deve criar componentes da Web com
`{mode: 'closed'}`:

1. Sensação artificial de segurança. Não há nada que impeça um atacante de
   sequestrar `Element.prototype.attachShadow`.

2. O modo fechado **evita que o código do elemento personalizado acesse
   seu próprio shadow DOM**. Isso é um desastre. Em vez disso, você terá de guardar uma referência
 para uso posterior se quiser usar algo como `querySelector()`. Isso invalida 
totalmente o propósito original do modo fechado.

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

3. **O modo fechado torna seu componente menos flexível para os usuários finais**. Na criação
de componentes da Web, chegará o momento em que você esquecerá de
adicionar um recurso. Uma opção de configuração. Um caso de uso desejado pelo usuário. Um exemplo comum 
é esquecer de incluir ganchos de estilo adequados para nós internos.
   Com o modo fechado, não há como os usuários modificarem padrões e
alterarem estilos. A capacidade de acessar internamente os componentes é muito útil.
   No final, se o seu componente não fizer o que os usuários desejam, eles o alterarão,
encontrarão outro ou criarão seu próprio componente :(

### Usar slots no JS {: #workwithslots}

A API do shadow DOM oferece utilitários para trabalhar com slots e nós
distribuídos. Eles são úteis para criar um elemento personalizado.

#### Evento slotchange {: #slotchange}

O evento `slotchange` é acionado quando os nós distribuídos de um slot são alterados. Por
exemplo, se o usuário adicionar/remover filhos do light DOM.


    const slot = this.shadowRoot.querySelector('#slot');
    slot.addEventListener('slotchange', e => {
      console.log('light dom children changed!');
    });
    
Note: `slotchange` does not fire when an instance of the component is
first initialized.

Para monitorar outros tipos de alteração no light DOM, você pode configurar um
[`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
 no construtor do elemento.

#### Quais elementos estão sendo renderizados em um slot? {: #slotnodes}

Algumas vezes, é útil saber quais elementos estão associados a um slot. Chame
`slot.assignedNodes()` para saber quais elementos o slot está renderizando. A opção 
`{flatten: true}` também retornará o conteúdo do fallback de um slot (se
nenhum nó estiver sendo distribuído).

Como exemplo, vamos supor que o shadow DOM é semelhante a este:

    <slot><b>fallback content</b></slot>

<table>
  <thead><th>Uso</th><th>Chamar</th><th>Resultado</th></tr></thead>
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

#### A qual slot um elemento está atribuído? {: #assignedslot}

Também é possível responder à pergunta inversa. `element.assignedSlot` informa a
 quais slots de componente o elemento está atribuído.

### O modelo de eventos do Shadow DOM {: #events}

Quando um evento surge do shadow DOM, seu destino é ajustado para manter
o encapsulamento oferecido pelo shadow DOM. Ou seja, os eventos são redirecionados para
parecer que foram originados do componente e não de elementos internos no
shadow DOM. Alguns eventos nem mesmo são propagados para fora do shadow DOM.

Os eventos que **cruzam** a fronteira do Shadow DOM são:

- Eventos de foco: `blur`, `focus`, `focusin`, `focusout`
- Eventos de mouse: `click`, `dblclick`, `mousedown`, `mouseenter`, `mousemove`, etc.
- Eventos de roda: `wheel`
- Eventos de entrada: `beforeinput`, `input`
- Eventos de teclado: `keydown`, `keyup`
- Eventos de composição: `compositionstart`, `compositionupdate`, `compositionend`
- DragEvent: `dragstart`, `drag`, `dragend`, `drop`, etc.

**Dicas**

Se a árvore paralela estiver aberta, a chamada de `event.composedPath()` retornará
uma matriz de nós percorridos pelo evento.

#### Usar eventos personalizados {: #customevents}

Os eventos personalizados de DOM acionados em nós internos de uma árvore paralela não
cruzamos limites do Shadow DOM a menos que o evento seja criado usando o sinalizador 
`composed: true`:


    // Inside <fancy-tab> custom element class definition:
    selectTab() {
      const tabs = this.shadowRoot.querySelector('#tabs');
      tabs.dispatchEvent(new Event('tab-select', {bubbles: true, composed: true}));
    }
    

Se `composed: false` (padrão), os consumidores não poderão ouvir o evento
fora da raiz paralela.


    <fancy-tabs></fancy-tabs>
    <script>
      const tabs = document.querySelector('fancy-tabs');
      tabs.addEventListener('tab-select', e => {
        // won't fire if `tab-select` wasn't created with `composed: true`.
      });
    </script>
    

### Processamento de foco {: #focus}

Se você se lembrar de [modelo de evento do shadow de DOM](#events), os eventos
que são acionados dentro do shadow DOM são ajustados para parecer que
vêm do elemento de hospedagem. Por exemplo, digamos que você clique em um `<input>` dentro de uma raiz paralela:


    <x-focus>
      #shadow-root
        <input type="text" placeholder="Input inside shadow dom">
    

Parecerá que evento `focus` veio do `<x-focus>`, não da `<input>`. 
Da mesma forma, `document.activeElement` será `<x-focus>`. Se a raiz paralela
foi criada com `mode:'open'` (veja [modo fechado](#closed)), você também 
conseguirá acessar o nó interno que ganhou foco:

    document.activeElement.shadowRoot.activeElement // only works with open mode.

Se houver vários níveis de shadow DOM em jogo (digamos, um elemento 
personalizado dentro outro elemento personalizado), é preciso detalhar as raízes de shadow recursivamente para
encontrar o `activeElement`:


    function deepActiveElement() {
      let a = document.activeElement;
      while (a && a.shadowRoot && a.shadowRoot.activeElement) {
        a = a.shadowRoot.activeElement;
      }
      return a;
    }
    

Outra opção para o foco é a opção `delegatesFocus: true`, que expande o
comportamento de foco do elemento de dentro de uma árvore de shadow:

- Se você clicar em um nó dentro shadow DOM e o nó não for uma área
focalizável, a primeira área focalizável será focada.
- Quando um nó dentro do shadow DOM ganha foco, `:focus` aplica-se ao host
além do elemento focado.

**Exemplo** - como `delegatesFocus: true` altera o comportamento de foco


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

Acima está o resultado quando `<x-focus>` está focado (clique do usuário,
com guias até `focus()` etc.), "Clickable Shadow DOM text" é clicado, ou
o `<input>` interno é focado (inclusive `autofocus`).

Se definisse `delegatesFocus: false`, eis o que você veria:

<figure>
  <img src="imgs/delegateFocusFalse.png">
  <figcaption>
    <code>delegatesFocus: false</code> e o <code>&lt;input></code> interno é focado.
  </figcaption>
</figure>

<figure>
  <img src="imgs/delegateFocusFalseFocus.png">
  <figcaption>
    <code>delegatesFocus: false</code> e <code>&lt;x-focus></code>
    ganham foco (por exemplo, ele tem <code>tabindex="0"</code>).
  </figcaption>
</figure>

<figure>
  <img src="imgs/delegateFocusNothing.png">
  <figcaption>
    <code>delegatesFocus: false</code> e "Clickable Shadow DOM text" is 
 é clicado (ou outra área vazia dentro do shadow DOM do elemento é clicada).
  </figcaption>
</figure>

## Dicas e truques {: #tricks}

Nos últimos anos, aprendi algumas coisas sobre a criação de componentes da Web. Acredito
que algumas dessas dicas serão úteis para criar componentes e
depurar o shadow DOM.

### Usar contenção do CSS {: #containment}

Normalmente, o layout/estilo/pintura de um componente da Web é razoavelmente independente. Use
[a contenção do CSS](/web/updates/2016/06/css-containment) no `:host` para obter um ganho
de desempenho:


    <style>
    :host {
      display: block;
      contain: content; /* Boom. CSS containment FTW. */
    }
    </style>
    

### Redefinir estilos herdáveis {: #reset}

Os estilos herdáveis (`background`, `color`, `font`, `line-height`, etc.) continuam
a herdar no shadow DOM. Ou seja, eles cruzam o limite do shadow DOM
por padrão. Se você quiser começar do zero, use `all: initial;` para redefinir
os estilos herdáveis ao seu valor inicial quando cruzam o limite do Shadow DOM.


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

### Localizar todos os elementos personalizados usados por uma página {: #findall}

Algumas vezes, é útil encontrar os elementos personalizados usados na página. Para fazer isso, você
precisa percorrer de forma recursiva o shadow DOM de todos os elementos usados na página.


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
Alguns navegadores também são compatíveis com o uso do combinador `/deep/` do shadow DOM v0 em `querySelectorAll()`:


    const allCustomElements = Array.from(document.querySelectorAll('html /deep/ *')).filter(el => {
      const isAttr = el.getAttribute('is');
      return el.localName.includes('-') || isAttr && isAttr.includes('-');
    });
    

Por enquanto, `/deep/` [continua a funcionar em chamadas `querySelectorAll()`](https://bugs.chromium.org/p/chromium/issues/detail?id=633007).
{% endcomment %}

### Criar elementos de um &lt;modelo> {: #fromtemplate}

Em vez de preencher uma raiz paralela usando `.innerHTML`, podemos usar um 
`<template>` declarativo. Os modelos são um marcador ideal para declarar a estrutura de um
componente da Web.

Veja o exemplo em 
"[Elementos personalizados: criar componentes da Web reutilizáveis"](/web/fundamentals/getting-started/primers/customelements).

## Histórico e compatibilidade de navegadores {: #historysupport}

Se você acompanhou os componentes da Web durante os últimos dois anos, já
sabe que os navegadores Chrome 35+/Opera estão fornecendo uma versão mais antiga do shadow DOM
há algum tempo. O Blink continuará a oferecer suporte a ambas as versões em paralelo por
algum tempo. A especificação v0 oferecia um método diferente para criar uma raiz paralela
(`element.createShadowRoot` em vez do `element.attachShadow` da v1). A chamada do
método antigo continua a criar uma raiz paralela com semântica da v0.
Portanto, o código v0 atual continuará a funcionar.

Se por acaso você estiver interessado na especificação v0 antiga, confira os 
artigos de html5rocks: 
[1](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/),
[2](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/),
[3](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/).
Também há uma ótima comparação das 
[diferenças entre shadow DOM v0 e v1][differences].

### Compatibilidade de navegadores {: #support}

Os navegadores Chrome 53 ([status](https://www.chromestatus.com/features/4667415417847808)), 
Opera 40 e Safari 10 estão fornecendo o shadow DOM v1. O Edge está considerando a compatibilidade
[com alta prioridade](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/shadowdom/).
O Mozilla tem um [bug em aberto](https://bugzilla.mozilla.org/show_bug.cgi?id=811542)
para a implementação.

Para detectar a disponibilidade do shadow DOM, verifique a existência de `attachShadow`:


    const supportsShadowDOMV1 = !!HTMLElement.prototype.attachShadow;
    

    
#### Polyfill {: #polyfill}

Até que o suporte ao navegador esteja amplamente disponível, os
 polyfills [shadydom](https://github.com/webcomponents/shadydom) e 
[shadycss](https://github.com/webcomponents/shadycss) oferecem o 
recurso v1. Shady DOM imita o escopo DOM do shadow DOM e propriedades personalizadas de
polyfills shadycss CSS e o escopo de estilo que a API nativa proporciona.

Instale os polyfills:

    bower install --save webcomponents/shadydom
    bower install --save webcomponents/shadycss

Use os polyfills:


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


Veja os [https://github.com/webcomponents/shadycss#usage](https://github.com/webcomponents/shadycss)
para obter instruções sobre como preencher/estender seus estilos.


## Conclusão

Pela primeira vez, temos um primitivo de API que oferece escopo adequado de
CSS e de DOM e oferece composição real. Combinado com outras APIs de componentes da Web como
elementos personalizados, o shadow DOM oferece uma forma de criar
componentes verdadeiramente encapsulados, sem truques nem recursos antiquados como `<iframe>`s.

Não me entenda mal. O Shadow DOM é certamente muito complexo. Mas vale muito a pena
aprender a usá-lo. Invista algum tempo nele. Aprenda e faça perguntas!

#### Leitura adicional

- [Diferenças entre o Shadow DOM v1 e o v0][differences]
- ["Introdução Slot-Based Shadow DOM API"](https://webkit.org/blog/4096/introducing-shadow-dom-api/)
 do WebKit Blog.
- [Web Components e o futuro do CSS modular](https://philipwalton.github.io/talks/2015-10-26/)
 por [Philip Walton](https://twitter.com/@philwalton)
- ["Elementos personalizados: criar componentes da Web reutilizáveis"](/web/fundamentals/getting-started/primers/customelements)
 do WebFundamentals do Google.
- [Especificação do Shadow DOM v1][sd_spec_whatwg]
- [Especificação do Custom Elements v1][ce_spec]

## PERGUNTAS FREQUENTES

**Já posso usar o Shadow DOM v1?**

Com um polyfill, sim. Consulte [Compatibilidade de navegadores](#support).

**Quais os recursos de segurança oferecidos pelo shadow DOM?**

O Shadow DOM não é um recurso de segurança. É uma ferramenta leve para aplicar escopo ao CSS
e ocultar árvores do DOM no componente. Se você quiser um limite de segurança verdadeiro,
use um `<iframe>`.

**O componente da Web precisa usar um shadow DOM?**

Não! Você não precisa criar componentes da Web que usam o shadow DOM. No entanto,
a criação de [elementos personalizados que usam o Shadow DOM](#elements) significa que
você pode aproveitar recursos como atribuição de escopo para CSS, encapsulamento do DOM e composição.

**Qual a diferença entre raízes paralelas abertas e fechadas?**

Consulte [Raízes paralelas fechadas](#closed).

[ce_spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[ce_article]: (/web/fundamentals/getting-started/primers/customelements)
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/
[sd_spec_whatwg]: https://dom.spec.whatwg.org/#shadow-trees
[differences]: http://hayato.io/2016/shadowdomv1/
[css_props]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables


{# wf_devsite_translation #}
