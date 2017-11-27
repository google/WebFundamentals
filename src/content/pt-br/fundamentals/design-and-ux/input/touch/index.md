project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Telas sensíveis a toque estão disponíveis em cada vez mais dispositivos, de celulares a telas de computadores. Seu aplicativo deve responder ao toque de forma intuitiva e atraente.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-01-01 #}

# Adicionar recurso de toque ao seu site {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Rwc4fHUnGuU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Touchscreens estão disponíveis em cada vez mais dispositivos, de celulares a
telas de computadores desktop. Quando os usuários optam por interagir com sua interface, seu aplicativo
deve responder ao toque de forma intuitiva.

<div class="clearfix"></div>

## Responder a estados de elementos

Você já tocou ou clicou em um elemento de uma página da Web e se perguntou
se o site detectou a ação?

A simples alteração de cor de um elemento quando os usuários tocam ou interagem com partes
da sua interface proporciona uma garantia básica de que seu site está funcionando. Isso não só
alivia a frustração do usuário, mas também pode proporcionar uma sensação de que o site é ágil e responsivo.

Elementos do DOM podem herdar qualquer um dos seguintes estados: default, focus, hover
e active. Para alterar a interface para cada um desses estados, precisamos aplicar estilos
às pseudoclasses `:hover`, `:focus` e `:active` conforme é mostrado abaixo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="btnstates" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

![Imagem apresentando diferentes cores para estados de
botões](images/button-states.png)

Na maioria dos navegadores móveis, os estados *hover* e/ou *focus* serão aplicados a um elemento
após ele ter sido tocado.

Considere com cautela quais estilos definir e como eles ficarão após
a finalização do toque do usuário.

Observação: tags e botões âncora podem ter um comportamento diferente
em navegadores distintos, portanto, presuma que, em alguns casos, **hover**
permanecerá, enquanto, em outros, **focus** permanecerá.

### Suprimir estilos padrão de navegadores

Depois de adicionar estilos para os diferentes estados, você perceberá que a maioria dos navegadores
implementam seus próprios estilos em resposta ao toque de um usuário. Isso ocorre, principalmente,
porque, quando dispositivos móveis foram inicialmente lançados, diversos sites
não tinham estilos para o estado `:active`. Consequentemente, muitos navegadores adicionaram
uma cor ou um estilo de destaque adicional para dar feedback ao usuário.

A maioria dos navegadores usa a propriedade CSS `outline` para exibir um contorno em volta de um
elemento quando ele é focado. Você pode suprimir essa propriedade da seguinte maneira:

    .btn:focus {
      outline: 0;

      // Add replacement focus styling here (i.e. border)
    }

O Safari e o Chrome adicionam uma cor de destaque de toque que pode ser impedida com a propriedade CSS
`-webkit-tap-highlight-color`:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="webkit-specific" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

O Internet Explorer do Windows Phone tem um comportamento semelhante, mas ele pode ser suprimido
com uma meta tag:

    <meta name="msapplication-tap-highlight" content="no">

O Firefox tem dois efeitos secundários a serem manipulados.

A pseudoclasse `-moz-focus-inner`, que adiciona um contorno a
elementos tocáveis, pode ser removida definindo `border: 0`.

Se você estiver usando um elemento `<button>` no Firefox, um gradiente é
aplicado, e pode ser removido ao definir `background-image: none`.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="ff-specific" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

Warning: suprima os estilos padrão mencionados acima somente se você tiver pseudo
classes para `:hover`, `:active` e `:focus`!

### Desativar user-select

Durante a criação da sua IU, pode haver cenários nos quais você deseja que os usuários
interajam com os elementos, mas suprimindo o comportamento padrão
de seleção de texto com ações manter o botão pressionado ou arrastando o mouse pela interface.

Isso pode ser feito com a propriedade CSS `user-select`, mas esteja ciente de que
fazer isso com o conteúdo pode ser **extremamente** irritante
para os usuários se eles *quiserem* selecionar o texto do elemento.
Dessa forma, use esse recurso com cautela e nas ocasiões certas.

    user-select: none;

## Implementar gestos personalizados

Se você tiver uma ideia para implementar interações e gestos personalizados em seu site,
tenha em mente dois tópicos:

1. Como oferecer suporte a todos os navegadores.
2. Como manter a taxa de quadros alta.

Neste artigo, examinaremos precisamente esses tópicos, abordando as APIs necessárias
para oferecer suporte para todos os navegadores e como usar esses eventos
de forma eficiente.

Dependendo do que você deseja fazer com os gestos, é provável que você queira que
o usuário interaja com um elemento por vez *ou* que ele possa
interagir com vários elementos simultaneamente.

Warning: não se esqueça de que alguns usuários preferem usar o teclado e que usuários
que usem tecnologias auxiliares em um dispositivo com tela sensível a toque podem não conseguir
realizar certos gestos por eles serem interceptados/consumidos pela tecnologia
assistiva.

Examinaremos dois exemplos neste artigo, ambos demonstrando
suporte para todos os navegadores e como manter a taxa de frames alta.

![GIF de exemplo de toque em um documento](images/touch-document-level.gif){: .attempt-right }

O primeiro exemplo permitirá que o usuário interaja com um elemento. Nesse
caso, pode ser pertinente que todos os eventos de toque sejam fornecidos ao elemento em questão, desde que
o gesto seja iniciado nesse elemento. Por exemplo, mover o
dedo para fora de um elemento que comporte o gesto deslizar ainda permite que o usuário controle esse elemento.

Isso é bastante útil, pois proporciona mais flexibilidade para o usuário, mas aplica
uma restrição em como o usuário pode interagir com sua IU.

<div class="clearfix"></div>

![GIF de exemplo de toque em um elemento](images/touch-element-level.gif){: .attempt-right }

Se, no entanto, você espera que os usuários interajam com vários elementos simultaneamente
(usando multitoque), você deve restringir o toque ao elemento específico
em questão.

Isso é mais flexível para os usuários, mas complica a lógica de manipulação da
interface e é menos resistente a erros de usuário.

<div class="clearfix"></div>

### Adicionar detectores de evento

No Chrome (versão 55 e posteriores), no Internet Explorer e no Edge,
`PointerEvents` são a abordagem recomendada para implementar gestos personalizados.

Em outros navegadores, `TouchEvents` e `MouseEvents` são a abordagem correta.

Uma das melhores características de `PointerEvents` é que esse recurso mescla diversos tipos de entrada,
incluindo eventos de mouse, toque e caneta, em um só conjunto de
retornos de chamada. Os eventos que devem ser detectados são `pointerdown`, `pointermove`,
`pointerup` e `pointercancel`.

Os equivalentes em outros navegadores são `touchstart`, `touchmove`,
`touchend` e `touchcancel` para eventos de toque e, se você quiser implementar
o mesmo gesto para entrada de mouse, será necessário implementar `mousedown`,
`mousemove` e `mouseup`.

Em caso de dúvidas sobre quais eventos usar, confira esta tabela de
[eventos de toque, mouse e ponteiro](#touch-mouse-and-pointer-events)).

O uso desses eventos exige chamar o método `addEventListener()` em um elemento do DOM
, juntamente com o nome de um evento, uma função de retorno de chamada e um booleano.
O booleano determina se você deve capturar o evento antes ou depois
de outros elementos terem a oportunidade de capturar e interpretar
esses eventos. (`true` significa que você deseja capturar o evento antes de outros elementos.)

Veja a seguir um exemplo de como detectar o início de uma interação.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="addlisteners" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

Observação: Devido ao design da API, PointerEvents só precisam de um evento
`pointerdown` para manipular eventos de mouse e toque.

#### Processar interações com um só elemento

No pequeno snippet de código acima, adicionamos apenas o detector de evento inicial
para eventos de mouse. O motivo disso é que a maioria dos eventos de mouse só é acionada
quando o cursor está sendo passado *sobre* o elemento ao qual o detector foi adicionado.

TouchEvents rastreará um gesto depois que ele for iniciado, independentemente de onde o
toque ocorra, e PointerEvents rastreará eventos independentemente de onde o toque
ocorra se chamarmos `setPointerCapture` em um elemento de DOM.

Para eventos move e end do mouse, devemos adicionar os detectores de evento *dentro* do
método de início de gesto e adicionar os detectores ao documento, o que significa que eles poderão
rastrear o cursor até que o gesto seja concluído.

As etapas para implementar isso são as seguintes:

1. Adicione todos os detectores de TouchEvent e PointerEvent. Para MouseEvents, adicione **somente**
 o evento de início.
2. No retorno de chamada do evento de início, vincule os eventos move e end do mouse ao
 documento. Assim, todos os eventos do mouse serão recebidos, não importando
 se eles ocorreram no elemento original ou não. Para PointerEvents, precisamos
 chamar `setPointerCapture()` no elemento original para receber
 todos os eventos subsequentes. Em seguida, é preciso processar o início do gesto.
1. Processe os eventos move.
2. No evento end, remova os detectores de eventos move e end do mouse do documento
 e conclua o gesto.

Veja abaixo um snippet do nosso método `handleGestureStart()`, que adiciona os eventos move
e end ao documento:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

O retorno de chamada de end que adicionamos é `handleGestureEnd()`, que remove os detectores de eventos move
e end do documento e libera a captura do ponteiro
quando o gesto for concluído, assim:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-end-gesture" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

<div class="attempt-left">
  <p>Ao seguir esse padrão de adicionar o evento move ao documento, se o usuário
 começar a interagir com um elemento e mover o gesto para fora
 dele, continuaremos a obter os movimentos do mouse independentemente de onde ele estiver
 na página, pois os eventos estão sendo recebidos do documento inteiro.</p>

  <p>Este diagrama mostra o que os eventos de toque estão fazendo conforme adicionamos os
 eventos move e end ao documento após o início de um gesto.</p>
</div>

![Demonstração da vinculação de eventos de toque ao documento em
`touchstart`](images/scroll-bottleneck.gif)

<div class="clearfix"></div>

### Responder ao toque de forma eficiente

Agora que já cuidamos dos eventos start e end, podemos
responder aos eventos de toque.

Para qualquer um dos eventos start e move, você pode facilmente extrair `x` e `y`
de um evento.

O exemplo a seguir verifica se o evento vem de um `TouchEvent` ao
verificar se `targetTouches` existe. Se existir, ele extrai o
`clientX` e o `clientY` do primeiro toque.
Se o evento for um `PointerEvent` ou `MouseEvent`, ele extrai o `clientX` e o
`clientY` do próprio evento.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-2.html" region_tag="extract-xy" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-2.html){: target="_blank" .external }

Um `TouchEvent` tem três listas que contêm dados de toque:

* `touches`: lista de todos os toques atuais na tela, independentemente do
elemento do DOM no qual eles tenham ocorrido.
* `targetTouches`: lista de toques atualmente no elemento do DOM ao qual o evento
está vinculado.
* `changedTouches`: lista de toques com mudanças resultantes do evento
ser acionado.

Na maioria dos casos, `targetTouches` fornece tudo que você possa querer ou precisar. (Para
saber mais sobre essas listas, consulte [Listas de toques](#touch-lists)).

#### Usar requestAnimationFrame

Como os retornos de chamada dos eventos são acionados no thread principal, devemos executar a menor
quantidade de código possível nos retornos de chamada dos nossos eventos, mantendo a taxa de frames
alta e evitando atrasos.

Ao usar `requestAnimationFrame()`, temos uma oportunidade de atualizar a IU antes
que o navegador renderize um quadro e isso nos ajudará a remover
parte do trabalho nos retornos de chamada de eventos.

Se não estiver familiarizado com o `requestAnimationFrame()`,
[saiba mais aqui](/web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes).

Uma implementação típica é salvar as coordenadas `x` e `y` dos eventos
start e move e solicitar um frame de animação dentro do retorno de chamada do
evento move.

Na nossa demonstração, nós armazenamos a posição de toque inicial em `handleGestureStart()` (procure `initialTouchPos`):

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

O método `handleGestureMove()` armazena a posição do seu evento
antes de solicitar um quadro de animação se necessário, passando na função
`onAnimFrame()` como retorno de chamada:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-move" adjust_indentation="auto" %}
</pre>

O valor `onAnimFrame` é uma função que, quando chamada, altera a IU
para movê-la. Ao passar essa função para `requestAnimationFrame()`, nós
instruímos o navegador a chamá-la antes de atualizar a página
(ou seja, realizar alterações na página).

No retorno de chamada `handleGestureMove()`, nós, inicialmente, verificamos se `rafPending` é false,
indicando se `onAnimFrame()` foi chamado por `requestAnimationFrame()`
desde o último evento move. Isso significa que temos apenas um `requestAnimationFrame()`
aguardando para ser executado em qualquer ocasião.

Quando o retorno de chamada `onAnimFrame()` é executado, nós definimos a transformação em qualquer
elemento que queiramos mover antes de atualizar `rafPending` para `false`, permitindo que
o próximo evento de toque solicite um novo quadro de animação.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="on-anim-frame" adjust_indentation="auto" %}
</pre>

### Controlar gestos usando ações de toque

A propriedade CSS `touch-action` permite que você controle o comportamento de toque
padrão de um elemento. Nos nossos exemplos, nós usamos `touch-action: none` para
impedir que o navegador faça qualquer coisa com o toque de um usuário, permitindo que
interceptemos todos os eventos de toque.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="touch-action-example" adjust_indentation="auto" %}
</pre>

Usar `touch-action: none` é um pouco exagerado, pois ela impede todos
os comportamentos padrão dos navegadores. Em muitos casos, uma das opções
abaixo é uma solução melhor.

`touch-action` permite que você desative gestos implementados por um navegador.
Por exemplo, o IE 10 e posteriores oferecem suporte a um gesto de dois toques para ativar o zoom. Ao definir um
touch-action de `manipulation`, você impede o comportamento padrão de
dois toques.

Isso permite que você implemente um gesto de dois toques pessoalmente.

Veja abaixo uma lista de valores comuns para touch-action:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Parâmetros da ação de toque</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>touch-action: none</code></td>
      <td data-th="Description">Nenhuma interação de toque será processada
 pelo navegador.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pinch-zoom</code></td>
      <td data-th="Description">Desativa todas as interações do navegador como
      `touch-action: none`, exceto `pinch-zoom`, que ainda será processada
 pelo navegador.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pan-y pinch-zoom</code></td>
      <td data-th="Description">Processa rolamentos horizontais em JavaScript sem
 desativar o rolamento vertical ou o zoom por gesto de pinça (por exemplo, carrosséis de imagens).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: manipulation</code></td>
      <td data-th="Description">Desativa gestos de dois toques que evitem qualquer
 atraso de clique por parte do navegador. Deixa a rolagem e o zoom por gesto de pinça a cargo do
 navegador.</td>
    </tr>
  </tbody>
</table>

## Oferecer suporte a versões mais antigas do IE

Se quiser oferecer suporte ao IE 10, você deverá processar versões do
`PointerEvents` prefixadas pelo fornecedor.


Para verificar o suporte de `PointerEvents`, você geralmente procuraria por
`window.PointerEvent`, mas, no IE 10, você deve procurar por
`window.navigator.msPointerEnabled`.

Nomes de eventos com prefixos de fornecedor são: 'MSPointerDown', 'MSPointerUp' and
'MSPointerMove'.

O exemplo a baixo mostra como verificar o suporte e alterar
os nomes dos eventos.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="pointereventsupport" adjust_indentation="auto" %}
</pre>

Para saber mais, confira este [artigo de atualizações da
Microsoft](https://msdn.microsoft.com/en-us/library/dn304886(v=vs.85).aspx).

Referência da## 

### Pseudoclasses para estados de toque

<table>
  <thead>
    <tr>
      <th>Classe</th>
      <th>Exemplo</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Class">:hover</td>
      <td data-th="Example"><img alt="Botão no estado pressed" src="images/btn-hover-state.png"></td>
      <td data-th="Description">
        Inserida quando um cursor é posicionado sobre um elemento.
        Alterações na IU em caso de eventos hover são úteis para incentivar os usuários a interagir
 com os elementos.
      </td>
    </tr>
    <tr>
      <td data-th="Class">:focus</td>
      <td data-th="Example">
        <img alt="Botão com o estado focus" src="images/btn-focus-state.png">
      </td>
      <td data-th="Description">
        Inserida quando o usuário percorre elementos de uma página usando a tecla Tab. O estado focus
 permite que o usuário saiba com qual ele está interagindo.
 Além disso, ele também permite que os usuários naveguem por sua IU com facilidade usando um teclado.
      </td>
    </tr>
    <tr>
      <td data-th="Class">:active</td>
      <td data-th="Example">
        <img alt="Botão no estado pressed" src="images/btn-pressed-state.png">
      </td>
      <td data-th="Description">
        Inserida quando um elemento estiver sendo selecionado, por
 exemplo, quando um usuário estiver clicando ou tocando um elemento.
      </td>
    </tr>
  </tbody>
</table>


A referência definitiva para eventos de toque pode ser encontrada aqui:
[w3 Touch Events](http://www.w3.org/TR/touch-events/).

### Eventos de toque, mouse e ponteiro

Esses eventos são a base para adicionar novos gestos ao seu
aplicativo:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Eventos de toque, mouse e ponteiro</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event Names">
        <code>touchstart</code>,
        <code>mousedown</code>,
        <code>pointerdown</code>
      </td>
      <td data-th="Description">
        Chamado quando um dedo toca um elemento inicialmente ou quando o
 usuário pressiona o botão do mouse.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchmove</code>,
        <code>mousemove</code>,
        <code>pointermove</code>
      </td>
      <td data-th="Description">
        Chamado quando o usuário move o dedo pela tela ou
 arrasta com o mouse.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchend</code>,
        <code>mouseup</code>,
        <code>pointerup</code>
      </td>
      <td data-th="Description">
        Chamado quando o usuário levanta o dedo da tela
 ou solta o botão do mouse.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchcancel</code>
        <code>pointercancel</code>
      </td>
      <td data-th="Description">
        Chamado quando o navegador cancela os gestos de toque. Por exemplo,
 um usuário toca em um aplicativo da Web e troca de guia no navegador.
      </td>
    </tr>
  </tbody>
</table>

### Listas de toques

Cada evento de toque inclui três atributos de lista:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Atributos do evento de toque</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>touches</code></td>
      <td data-th="Description">
 Lista de todos os toques atuais na tela, independentemente dos elementos
 sendo tocados.
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>targetTouches</code></td>
      <td data-th="Description">
 Lista de todos os toques iniciados no elemento que é o alvo do
 evento atual. Por exemplo, se vincular o evento a um  <code>&lt;button&gt;</code>,
 você só receberá os toques que se encontrarem nesse botão. Se vincular o evento ao
 documento, você receberá todos os toques que se encontrarem no documento.
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>changedTouches</code></td>
      <td data-th="Description">
        Lista de toques com mudanças resultantes do evento ser acionado:
        <ul>
          <li>
            Para o evento <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchstart">
            touchstart</a></code>
            - lista dos pontos de toque que acabaram de se tornar ativos com o
 evento atual.
          </li>
          <li>
            Para o evento <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchmove">
            touchmove</a></code>
            - lista dos pontos de toque que foram movidos desde o último
            evento.
          </li>
          <li>
            Para os eventos <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchend">
            touchend</a></code>
            e <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchcancel">
            touchcancel</a></code>
             - lista dos pontos de toque que acabaram de ser removidos
            da superfície.
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Ativar o suporte ao estado active no iOS

Infelizmente, o Safari do iOS não aplica o estado *active* por padrão.
Para que ele funcione, você deve adicionar um detector de evento `touchstart` ao *corpo
do documento* ou a cada elemento.

Isso deve ser feito em um teste de user-agent para que essa configuração só seja executada em dispositivos iOS.

Adicionar um touchstart ao corpo do documento tem a vantagem de ser aplicado a todos os elementos
do DOM, no entanto, isso pode causar problemas de desempenho ao rolar a página.


    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
      }
    };


A alternativa é adicionar os detectores de touchstart a todos os elementos da página
que permitem interações, o que amenizará alguns dos problemas de desempenho.


    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        var elements = document.querySelectorAll('button');
        var emptyFunction = function() {};
        for(var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('touchstart', emptyFunction, false);
        }
      }
    };


{# wf_devsite_translation #}
