project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Saiba mais sobre todas as maneiras de pausar o código no Chrome DevTools.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-02-03 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Pausar o código com pontos de interrupção {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Use pontos de interrupção para pausar o código JavaScript. Este guia explica cada tipo de
ponto de interrupção disponível no DevTools, bem como quando usar e como
definir cada um deles. Para um tutorial prático sobre o processo de depuração, veja [Primeiros
passos com a depuração do JavaScript no Chrome
DevTools](/web/tools/chrome-devtools/javascript/).

## Visão geral de quando usar cada tipo de ponto de interrupção {: #overview }

O tipo de ponto de interrupção mais conhecido é a linha de código. Mas os pontos de interrupção de
linha de código podem ser ineficientes, especialmente se você não souber exatamente
o que observar ou se estiver trabalhando com uma grande base de códigos. É possível economizar
tempo durante a depuração sabendo como e quando usar os outros tipos
de pontos de interrupção.

<table>
  <tr><th>Tipo de ponto de interrupção</th><th>Use este quando quiser pausar...</th></tr>
  <tr>
    <td><a href="#loc">Linha de código</a></td>
    <td>
      em uma região exata do código.
    </td>
  </tr>
  <tr>
    <td><a href="#conditional-loc">Linha de código condicional</a></td>
    <td>
      em uma região exata do código, mas apenas quando outra condição for verdadeira.
    </td>
  </tr>
  <tr>
    <td><a href="#dom">DOM</a></td>
    <td>
      no código que altera ou remove um nó DOM
      específico ou seus filhos.
    </td>
  </tr>
  <tr>
    <td><a href="#xhr">XHR</a></td>
    <td>
      quando um URL XHR contém um padrão de string.
    </td>
  </tr>
  <tr>
    <td><a href="#event-listeners">Listener de eventos</a></td>
    <td>
      no código executado depois que um evento, como
      <code>click</code>, é acionado.
    </td>
  </tr>
  <tr>
    <td><a href="#exceptions">Exceção</a></td>
    <td>
      na linha de código que está lançando uma exceção capturada
    ou não capturada.
    </td>
  </tr>
  <tr>
    <td><a href="#function">Função</a></td>
    <td>
      sempre que uma função específica é chamada.
    </td>
  </tr>
</table>

## Pontos de interrupção da linha de código {: #loc }

Use um ponto de interrupção da linha de código quando souber a região exata do código que você
precisa investigar. O DevTools *sempre* faz uma pausa antes que essa linha de código seja
executada.

Para definir um ponto de interrupção da linha de código no DevTools:

1. Clique na guia **Sources**.
1. Abra o arquivo que contém a linha de código que você deseja interromper.
1. Vá até a linha de código.
1. À esquerda da linha de código, está a coluna do número da linha. Clique nele. O
   ícone do número da linha ficará azul.

<figure>
  <img src="imgs/loc-breakpoint.png"
       alt="Um ponto de interrupção da linha de código."
  <figcaption>
    <b>Imagem 1</b>: um ponto de interrupção da linha de código definido on-line <b>29</b>
  </figcaption>
</figure>

### Pontos de interrupção da linha de código no código {: #debugger }

Chame o `debugger` do código para pausar nessa linha. Isso é equivalente a
um [ponto de interrupção de linha de código](#loc), exceto que o ponto de interrupção é definido no
código, não na IU do DevTools.

    console.log('a');
    console.log('b');
    debugger;
    console.log('c');

### Pontos de interrupção de linha de código condicional {: #conditional-loc }

Use um ponto de interrupção de linha de código condicional quando souber a região exata do
código que você precisa investigar. No entanto, pause apenas quando
outra condição for verdadeira.

Para definir um ponto de interrupção de linha de código condicional:

1. Clique na guia **Sources**.
1. Abra o arquivo que contém a linha de código que você deseja interromper.
1. Vá até a linha de código.
1. À esquerda da linha de código, está a coluna do número da linha. Clique no número com o botão direito.
1. Selecione **Add conditional breakpoint**. Uma caixa de diálogo é exibida abaixo da
   linha de código.
1. Insira sua condição na caixa de diálogo.
1. Pressione <kbd>Enter</kbd> para ativar o ponto de interrupção. O ícone do número fica
   da cor laranja.

<figure>
  <img src="imgs/conditional-loc-breakpoint.png"
       alt="Um ponto de interrupção de linha de código condicional."
  <figcaption>
    <b>Imagem 2</b>: um ponto de interrupção de linha de código condicional definido na linha
    <b>32</b>
  </figcaption>
</figure>

### Gerenciar pontos de interrupção de linha de código {: #manage-loc }

Use o painel **Breakpoints** para desativar ou remover pontos de interrupção de linha de código de
um único local.

<figure>
  <img src="imgs/breakpoints-pane.png"
       alt="O painel Breakpoints."
  <figcaption>
    <b>Imagem 3</b>: o painel <b>Breakpoints</b> mostrando dois pontos de interrupção de
    linha de código, um na linha 15 de <code>get-started.js</code> e outro na
    linha 32
  </figcaption>
</figure>

* Marque a caixa de seleção ao lado de uma entrada para desativar esse ponto de interrupção.
* Clique com o botão direito do mouse em uma entrada para remover esse ponto de interrupção.
* Clique com o botão direito do mouse em qualquer lugar no painel **Breakpoints** para desativar,
  desabilitar ou remover todos os pontos de interrupção. Desabilitar
  todos os pontos de interrupção é equivalente a desmarcar cada um deles. A desativação de todos
  os pontos de interrupção instrui o DevTools a ignorar todos os pontos de interrupção da linha de código, mas
  também mantém o estado ativado deles para que estejam no mesmo
  estado de antes de você reativá-los.

<figure>
  <img src="imgs/deactivated-breakpoints.png"
       alt="Pontos de interrupção desativados no painel Breakpoints."
  <figcaption>
    <b>Imagem 4</b>: os pontos de interrupção desativados no painel <b>Breakpoints</b>
    estão desativados e transparentes
  </figcaption>
</figure>

## Pontos de interrupção de mudança DOM {: #dom }

Use um ponto de interrupção de mudança DOM quando quiser pausar o código que altera
um nó DOM ou os respectivos filhos.

Para definir um ponto de interrupção de mudança DOM:

1. Clique na guia **Elements**.
1. Vá até o elemento no qual você deseja definir o ponto de interrupção.
1. Clique com o botão direito no elemento.
1. Passe o cursor sobre **Break on** e, em seguida, selecione **Subtree modifications**, **Attribute
 modifications** ou **Node removal**.

<figure>
  <img src="imgs/dom-change-breakpoint.png"
       alt="O menu de contexto para criar um ponto de interrupção de mudança DOM."
  <figcaption>
    <b>Imagem 5</b>: o menu de contexto para criar um ponto de interrupção de mudança DOM
  </figcaption>
</figure>

### Tipos de pontos de interrupção de mudança DOM {: #dom-types }

* **Subtree modifications**. Acionado quando um filho do nó
  atualmente selecionado é removido ou adicionado ou o conteúdo de um filho é alterado. Não
  acionadas em mudanças de atributo do nó filho nem em mudanças do
  nó atualmente selecionado.

* **Attributes modifications**: Acionado quando um atributo é adicionado ou removido
  no nó atualmente selecionado ou quando o valor de um atributo muda.

* **Node Removal**: Acionado quando o nó atualmente selecionado é removido.

## Pontos de interrupção XHR/Fetch {: #xhr }

Use um ponto de interrupção XHR quando quiser adicionar uma interrupção quando o URL de solicitação de um XHR
tiver uma string especificada. O DevTools faz uma pausa na linha de código onde o
XHR chama `send()`.

Note: esse recurso também funciona com solicitações [Fetch][Fetch].

Isso é útil, por exemplo, quando você vê que sua
página está solicitando um URL incorreto e deseja localizar rapidamente o código-fonte AJAX ou
Fetch que está causando a solicitação incorreta.

Para definir um ponto de interrupção XHR:

1. Clique na guia **Sources**.
1. Expanda o painel **XHR Breakpoints**.
1. Clique em **Add breakpoint**.
1. Insira a string que deseja interromper. O DevTools pausa quando esta
   string está presente em algum lugar no URL da solicitação XHR.
1. Pressione <kbd>Enter</kbd> para confirmar.

<figure>
  <img src="imgs/xhr-breakpoint.png"
       alt="Criação de um ponto de interrupção XHR."
  <figcaption>
    <b>Imagem 6</b>: criação de um ponto de interrupção XHR nos <b>Pontos de interrupção XHR</b>
    para qualquer solicitação que contenha <code>org</code> no URL
  </figcaption>
</figure>

[Fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## Pontos de interrupção de listener de eventos {: #event-listeners }

Use pontos de interrupção de listener de eventos quando quiser pausar no código do listener de
eventos que é executado após um evento ser acionado. Você pode selecionar eventos específicos, como
`click` ou categorias de evento, como todos os eventos de mouse.

1. Clique na guia **Sources**.
1. Expanda o painel **Event Listener Breakpoints**. O DevTools mostra uma lista
   de categorias de eventos, como **Animation**.
1. Marque uma dessas categorias para pausar sempre que um evento da categoria
   for acionado ou expandir a categoria e verificar um evento específico.

<figure>
  <img src="imgs/event-listener-breakpoint.png"
       alt="Criação de um ponto de interrupção de listener de eventos."
  <figcaption>
    <b>Imagem 7</b>: criação de um ponto de interrupção de listener de eventos para
    <code>deviceorientation</code>
  </figcaption>
</figure>

## Pontos de interrupção de exceção {: #exceptions }

Use pontos de interrupção de exceção quando quiser pausar na linha de código que
está gerando uma exceção capturada ou não capturada.

1. Clique na guia **Sources**.
1. Clique em **Pause on exceptions** ![Pausar nas
   exceções](imgs/pause-on-exceptions.png){:.devtools-inline}. Ele fica azul
   quando ativado.
1. (Opcional) Marque a caixa de seleção **Pause On Caught Exceptions** se você também
 deseja pausar as exceções capturadas, além das não capturadas.

<figure>
  <img src="imgs/uncaught-exception.png"
       alt="Pausado em uma exceção não capturada."
  <figcaption>
    <b>Imagem 7</b>: pausado em uma exceção não capturada
  </figcaption>
</figure>

## Pontos de interrupção de função {: #function }

Chame `debug(functionName)`, onde `functionName` é a função que você deseja
depurar, quando quiser pausar sempre que uma função específica é chamada. Você pode
inserir `debug()` no código (como uma declaração de `console.log()`) ou chamá-la no
Console do DevTools. `debug()` é equivalente a definir um
[ponto de interrupção de linha de código](#loc) na primeira linha da função.

    function sum(a, b) {
      let result = a + b; // DevTools pauses on this line.
      return result;
    }
    debug(sum); // Pass the function object, not a string.
    sum();


### Verificar se a função de destino está no escopo {: #scope }

O DevTools lança um `ReferenceError` se a função que você deseja depurar não estiver
no escopo.

    (function () {
      function hey() {
        console.log('hey');
      }
      function yo() {
        console.log('yo');
      }
      debug(yo); // This works.
      yo();
    })();
    debug(hey); // This doesn't work. hey() is out of scope.

Garantir que a função de destino esteja no escopo pode ser complicado se você estiver
chamando `debug()` do Console do DevTools. Veja esta estratégia:

1. Defina um [ponto de interrupção de linha de código](#loc) em algum lugar onde a função esteja no
   escopo.
1. Acione o ponto de interrupção.
1. Chame `debug()` no Console do DevTools enquanto o código ainda estiver pausado
   no seu ponto de interrupção de linha de código.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
