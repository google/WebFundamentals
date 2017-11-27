project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Modificando a ordem do DOM com tabindex


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Uso do tabindex {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



A ordem de guia padrão fornecida pela posição dos elementos nativos do
DOM é conveniente, mas há momentos em que é melhor modificar a ordem de
tabulação, e mover fisicamente elementos no HTML nem sempre é uma solução
ideal, ou mesmo viável. Para esses casos, pode-se usar o atributo HTML `tabindex` para definir
explicitamente a posição de tabulação de um elemento.

`tabindex` pode ser aplicado a qualquer elemento &mdash; embora não seja
necessariamente útil em cada elemento &mdash; e tem uma gama de valores inteiros. Usando
`tabindex`, pode-se especificar uma ordem explícita para elementos de página
focalizáveis, inserir um elemento que, de outra forma, não seria focalizável na
ordem de tabulação, e remover elementos da ordem de tabulação. Por exemplo:

`tabindex="0"`: Insere um elemento na ordem natural de tabulação. O elemento pode
ser focalizado ao se pressionar a tecla `Tab`, e o elemento pode ser focado chamando-se
seu método de `focus()`

    <custom-button tabindex="0">Press Tab to Focus Me!</custom-button>

{% framebox height="60px" %}
<style>
  custom-button {
    margin: 10px;
  }
</style>
<custom-button tabindex="0">Press Tab to Focus Me!</custom-button>
{% endframebox %}

`tabindex="-1"`: Remove um elemento da ordem natural de tabulação, mas o elemento
ainda pode ser focado chamando seu método `focus()`

    <button id="foo" tabindex="-1">I'm not keyboard focusable</button>
    <button onclick="foo.focus();">Focus my sibling</button>

{% framebox height="80px" %}
<button id="foo" tabindex="-1">I'm not keyboard focusable</button>
<button onclick="foo.focus();">Focus my sibling</button>
{% endframebox %}

`tabindex="5"`: Qualquer tabindex maior que 0 passa o elemento para a frente
na ordem natural de tabulação. Se houver vários elementos com um tabindex maior
que 0, a ordem de tabulação começa partir do valor mais baixo que é maior
que zero e vai subindo. Usar um tabindex maior que 0 é considerado
um **anti-padrão**.

    <button>Eu deveria ser o primeiro</button>
    <button>E eu deveria ser o segundo</button>
    <button tabindex="5">Mas eu passei na frente!</button>

{% framebox height="80px" %}
<button>I should be first</button>
<button>And I should be second</button>
<button tabindex="5">But I jumped to the front!</button>
{% endframebox %}

Isso é particularmente verdadeiro para elementos não interativos, como
cabeçalhos, imagens, ou títulos de artigo. Adicionar `tabindex` a esses tipos de elementos é contraproducente. Se
possível, é melhor organizar seu código fonte, de modo que a sequência do DOM
fornece uma ordem lógica de tabulação. Se você usar `tabindex`, limite-o a controles interativos
personalizados como botões, abas, listas suspensas e campos de texto; ou seja,
elementos que o  usuário pode esperar que forneçam interação.

Não se preocupe com que os usuários de leitores de tela deixem de perceber
conteúdo importante por ele não ter um `tabindex`. Mesmo que o conteúdo seja muito importante, como uma imagem,
se ele não for algo com que o usuário possa interagir, não há nenhuma razão
para torná-lo focalizável. Usuários de leitores de tela ainda podem compreender o conteúdo da imagem, contanto
que você forneça suporte adequado ao atributo `alt`, que será abordado em breve.

## Gerenciamento do foco no nível da página

Aqui temos um cenário em que `tabindex` não é apenas útil, mas necessário. Você pode estar
construindo uma única página robusta, com diferentes seções de
conteúdo, nem todas as quais são visíveis simultaneamente. Neste tipo de página, clicar em um link de
navegação pode alterar o conteúdo visível sem fazer uma atualização da página.

Quando isso acontece, você provavelmente identificaria a área de conteúdo selecionada,
atribuiria um `tabindex` de -1 a ela para que não apareça na ordem
natural de tabulação, e chamaria seu método de `focus`. Esta técnica, chamada *gerenciamento de foco*, mantém o
contexto percebido pelo usuário em sincronia com o conteúdo visual do site.

## Gerenciamento do foco em componentes

Gerenciar o foco quando se altera algo na página é importante, mas, às vezes,
é preciso gerenciar o foco no nível de controle &mdash; por exemplo, se você estiver
construindo um componente personalizado.

Considere o elemento `select` nativo. Ele pode receber foco básico, mas,
quando está lá, você pode usar as teclas de seta para expor a funcionalidade adicional
(as opções selecionáveis). Se estivesse construindo um elemento `select` personalizado,
seria desejável expor esses mesmos tipos de comportamentos de modo que usuários
que se baseiam principalmente em teclado ainda possam interagir com o seu controle.

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

Saber quais comportamentos do teclado implementar pode ser difícil, mas há
um documento útil que você pode consultar. O guia das
[Práticas de autoria dos Aplicativos Ricos Acessíveis de Internet (ARIA)](https://www.w3.org/TR/wai-aria-practices/){: .external } 
lista os tipos de componentes e que tipos de ações do teclado que eles suportam.
Abordaremos ARIA em maiores detalhes mais tarde, mas por agora usaremos o guia
para nos ajudar a adicionar suporte de teclado a um novo componente.

Talvez você esteja trabalhando em alguns novos [Elementos
Personalizados](/web/fundamentals/getting-started/primers/customelements) que
lembram um conjunto de botões de rádio, mas com sua visão única sobre
aparência e comportamento.

    <radio-group>
      <radio-button>Water</radio-button>
      <radio-button>Coffee</radio-button>
      <radio-button>Tea</radio-button>
      <radio-button>Cola</radio-button>
      <radio-button>Ginger Ale</radio-button>
    </radio-group>

Para determinar que tipo de suporte de teclado eles requerem, você verificaria o
[Guia de Práticas de autoria do ARIA](https://www.w3.org/TR/wai-aria-practices/){: .external }. 
A seção 2 contém uma lista de padrões de design, e nessa lista há
uma [tabela de características para grupos de rádio](https://www.w3.org/TR/wai-aria-practices/#radiobutton){: .external },
o componente existente que mais se aproxima do seu novo elemento.

Como pode-se ver na tabela, um dos comportamentos mais comuns de teclado que
deve ser suportado são as teclas de setas para cima/para baixo/esquerda/direita. Para adicionar esse comportamento ao novo
componente, usaremos uma técnica chamada *tabindex itinerante*.

![trecho da especificação W3C para botões de rádio](imgs/radio-button.png)

O tabindex itinerante funciona definindo `tabindex` como -1 para todos os filhos, exceto aquele
que está ativo atualmente.

    <radio-group>
      <radio-button tabindex="0">Water</radio-button>
      <radio-button tabindex="-1">Coffee</radio-button>
      <radio-button tabindex="-1">Tea</radio-button>
      <radio-button tabindex="-1">Cola</radio-button>
      <radio-button tabindex="-1">Ginger Ale</radio-button>
    </radio-group>

Em seguida, o componente usa um ouvinte de evento de teclado para determinar qual
tecla o usuário pressiona; quando isso acontece, ele define o `tabindex` focado
anteriormente do filho para -1, define o `tabindex` do filho a ser focado para 0,
e chama o método de foco para ele.

    <radio-group>
      // Assuming the user pressed the down arrow, we'll focus the next available child
      <radio-button tabindex="-1">Water</radio-button>
      <radio-button tabindex="0">Coffee</radio-button> // call .focus() on this element
      <radio-button tabindex="-1">Tea</radio-button>
      <radio-button tabindex="-1">Cola</radio-button>
      <radio-button tabindex="-1">Ginger Ale</radio-button>
    </radio-group>

Quando o usuário alcança o último (ou primeiro, dependendo da direção em que
o foco está sendo deslocado) filho, você fará uma volta e focará no primeiro 
(ou último) filho novamente.

Você pode experimentar o exemplo concluído abaixo. Inspecione o elemento no
DevTools para observar o tabindex se deslocar de um rádio para o próximo.

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

Você pode ver
[a fonte completa para este elemento](https://gist.github.com/robdodson/85deb2f821f9beb2ed1ce049f6a6ed47){: .external }
no GitHub.

## Armadilhas modais e de teclado

Às vezes, quando está administrando o foco, você pode entrar em uma situação da
qual não consegue sair. Considere um widget de preenchimento automático que tenta gerenciar foco e captura
o comportamento de tabulação, mas impede o usuário de sair até que seja
concluído. Isso é chamado de *armadilha de teclado*, e pode ser muito
frustrante para o usuário. A seção 2.1.2 da lista de verificação do Web AIM
aborda esta questão, afirmando que [o foco do teclado nunca deve ser bloqueado ou preso em um elemento de página específico](http://webaim.org/standards/wcag/checklist#sc2.1.2){: .external }.
O usuário deve ser capaz de navegar para e de todos os elementos da página
usando apenas o teclado.

Estranhamente, há momentos em que este comportamento, na verdade, é
desejável, como em uma janela modal. Normalmente, quando o modal é exibido, você não deseja que o usuário acesse
o conteúdo por trás dele. Você pode adicionar uma sobreposição para cobrir a página visualmente,
mas isso não impede que o foco do teclado deixe o modal acidentalmente.

![uma janela modal solicitando que o usuário salve seu trabalho](imgs/modal-example.png)

Em casos como este, você pode implementar uma armadilha de teclado
temporária para garantir que foque na armadilha somente enquanto o modal
é exibido e, em seguida, restaure o foco para o item focado anteriormente quando o modal está fechado.

Existem algumas propostas sobre como facilitar isso para os desenvolvedores,
incluindo o elemento `<dialog>`, mas eles ainda não têm suporte generalizado nos navegadores.
>
>Veja este [artigo MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog){: .external }
para mais informações sobre `<dialog>`, e este
[exemplo de modal](https://github.com/gdkraus/accessible-modal-dialog){: .external } para
mais informações sobre janelas modais.

Considere-se uma caixa de diálogo modal representada por um `div` que contém
alguns elementos, e outra `div` que representa uma sobreposição de fundo. Vamos percorrer as etapas básicas
necessárias para implementar uma armadilha de teclado temporária nesta situação.

 1. Usando `document.querySelector`, selecione os divs modal e sobreposição e
    armazene suas referências.
 1. Conforme o modal abre, armazene uma referência ao elemento que estava focado
    quando o modal foi aberto, para que você possa retornar o foco para esse elemento.
 1. Use um *ouvinte keydown* para pegar as teclas à medida que elas são
    pressionadas enquanto o modal está aberto. Você também pode ouvir por um clique na sobreposição de fundo, e fechar o
     modal se o usuário clicar nele.
 1. Em seguida, obtenha a coleção de elementos focalizáveis dentro do modal. O primeiro
    e o último elementos focalizáveis atuarão como "sentinelas" para que você saiba
    quando fazer a volta do foco para a frente ou para trás a fim de ficar dentro do modal.
 1. Exiba a janela modal e foque o primeiro elemento focalizável.
 1. Conforme o usuário pressiona `Tab` ou `Shift+Tab`, mova o foco para a
    frente ou para trás, fazendo a volta no último ou primeiro elemento, conforme apropriado.
 1. Se o usuário pressionar `Esc`, feche o modal. Isto é muito útil, porque permite
    que o usuário feche o modal sem ter de procurar um botão específico fechar
    e beneficia até mesmo os usuários que estão usando mouse.
 1. Quando o modal está fechado, oculte-o e à sobreposição de fundo, e restaure
o foco para o elemento focado anteriormente que foi salvo antes.

Este procedimento fornece uma janela modal utilizável, não frustrante que
todos podem usar eficazmente.

Para mais detalhes, você pode examinar este [exemplo de código](https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution){: .external },
e ver um exemplo ativo de uma
[página concluída](http://udacity.github.io/ud891/lesson2-focus/07-modals-and-keyboard-traps/solution/index.html){: .external }.



{# wf_devsite_translation #}
