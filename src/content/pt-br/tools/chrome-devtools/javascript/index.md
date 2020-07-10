project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Aprenda a usar o Chrome DevTools para encontrar e corrigir bugs de JavaScript.

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-01-04 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Primeiros passos com a depuração do JavaScript no Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Este tutorial ensina os fluxos de trabalho básicos para depuração de qualquer problema de JavaScript no DevTools.
Continue lendo ou assista à versão em vídeo deste tutorial logo abaixo.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="H0XScE08hy8"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## Etapa 1: reproduzir o bug. {: #reproduce }

Encontrar uma série de ações que reproduzam consistentemente um bug é sempre o primeiro passo
para a depuração.

1. Clique em **Open Demo**. A demonstração abrirá em uma nova guia.

     <a href="https://googlechrome.github.io/devtools-samples/debug-js/get-started"
       target="devtools"
       rel="noopener noreferrer">
       <button>Open Demo</button>
     </a>

1. Insira `5` na caixa de texto **Number 1**.
1. Insira `1` na caixa de texto **Number 2**.
1. Clique em **Add Number 1 and Number 2**. A etiqueta abaixo do botão informa `5 + 1 = 51`. O resultado
   deveria ser `6`. Esse é o bug que você corrigirá.

     <figure>
       <img src="imgs/bug.png"
         alt="O resultado de 5 + 1 é 51. Deveria ser 6."/>
       <figcaption>
         <b>Imagem 1</b>. O resultado de 5 + 1 é 51. Deveria ser 6.
       </figcaption>
     </figure>

## Etapa 2: familiarizar-se com a IU do painel Sources {: #sources-ui }

O DevTools fornece diversas ferramentas para tarefas diferentes, como alteração de CSS, criação de perfil de desempenho
de carregamento de página e monitoramento de solicitações de rede. O painel **Sources** é onde você depura
o JavaScript.

1. Abra o DevTools pressionando <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac)
   ou   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows, Linux). Esse atalho abre o painel
   **Console**.

     <figure>
       <img src="imgs/console.png" alt="O painel Console."/>
       <figcaption>
         <b>Imagem 2</b>. <b>O painel</b> Console.
       </figcaption>
     </figure>

1. Clique na guia **Sources**.

     <figure>
       <img src="imgs/sources.png" alt="O painel Sources."/>
       <figcaption>
         <b>Imagem 3</b>. O <b>painel</b> Sources
       </figcaption>
     </figure>

A IU do painel **Sources** tem 3 partes:

<figure>
  <img src="imgs/sources-annotated.png" alt="As três partes da IU do painel Sources."/>
  <figcaption>
    <b>Imagem 4</b>. As três partes da <b>IU do painel</b> Sources
 </figcaption>
</figure>

1. O painel **File Navigator**. Todo arquivo solicitado pela página é listado aqui.
2. O painel **Code Editor**. Após selecionar um arquivo no painel **File Navigator**, os conteúdos
   desse arquivo são exibidos aqui.
3. O painel **JavaScript Debugging**. Várias ferramentas para inspecionar o JavaScript da página. Se
   sua janela do DevTools estiver ampliada, esse painel é exibido à direita do painel **Code Editor**.

## Etapa 3: pausar o código com um ponto de interrupção {: #event-breakpoint }

Um método comum para depurar problemas desse tipo é inserir várias instruções `console.log()`
no código, para inspecionar valores durante a execução do script. Por exemplo:

<pre class="prettyprint">function updateLabel() {
  var addend1 = getNumber1();
  <strong>console.log('addend1:', addend1);</strong>
  var addend2 = getNumber2();
  <strong>console.log('addend2:', addend2);</strong>
  var sum = addend1 + addend2;
  <strong>console.log('sum:', sum);</strong>
  label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;
}</pre>

O método `console.log()` pode dar conta do trabalho, mas **pontos de interrupção** são mais rápidos.
Um ponto de interrupção permite pausar o código no meio da execução e examinar todos os valores
naquele momento. Os pontos de interrupção têm algumas vantagens sobre o método `console.log()`:

* Com o `console.log()`, você precisa abrir o código-fonte manualmente, encontrar o código relevante,
 inserir as instruções `console.log()` e recarregar a página para ver as mensagens
 no Console. Com os pontos de interrupção, você pode pausar no código relevante sem mesmo saber como
 o código está estruturado.
* Nas suas instruções `console.log()`, você precisa especificar exatamente cada valor que quer
 inspecionar. Com os pontos de interrupção, o DevTools exibe para você os valores de todas as variáveis naquele momento,
 em tempo real. Às vezes existem variáveis afetando seu código que você não percebeu.

Resumindo, os pontos de interrupção podem ajudar você a encontrar e a consertar bugs mais rapidamente do que o método `console.log()`.

Se você der um passo atrás e pensar em como o aplicativo funciona, pode chegar à conclusão de
que a soma incorreta (`5 + 1 = 51`) é calculada no listener de eventos `click` que está
associado ao botão **Add Number 1 and Number 2**. Dessa forma, você provavelmente quer pausar
o código próximo ao tempo no qual o listener `click` é executado. O **Event Listener Breakpoints**
permite que você faça exatamente isso:

1. No painel **JavaScript Debugging**, clique em **Event Listener Breakpoints** para expandir a
   seção. O DevTools revela uma lista de categorias de evento expansíveis, como o **Animation** e o
   **Clipboard**.
1. Ao lado da categoria de evento **Mouse**, clique em **Expand** ![Expandir
 o ícone](/web/tools/chrome-devtools/images/expand.png){: .devtools-inline}.
   O DevTools revela uma lista de eventos de mouse, como o **click** e o **mousedown**. Há uma caixa de seleção
   ao lado de cada evento.
1. Marque a caixa de seleção **click**. O DevTools agora está configurado para pausar automaticamente quando *qualquer*
   listener de evento `click` for executado.


     <figure>
       <img src="imgs/get-started-click-breakpoint.png"
         alt="A caixa de seleção click está ativada."/>
       <figcaption>
         <b>Imagem 5</b>. A caixa de seleção <b>click</b> está ativada
       </figcaption>
     </figure>

   
1. De volta à demonstração, clique novamente em **Add Number 1 and Number 2** O DevTools
   pausa a demonstração e destaca uma linha de código no painel **Sources**.
   O DevTools deve estar pausado nesta linha de código:

     <pre class="prettyprint">function onClick() {</pre>

     Se você está pausado em uma linha de código diferente, pressione **Resume Script Execution** ![Retomar
     a execução do script][resume]{:.cdt-inl} até que você esteja pausado na linha correta.

     <aside class="note">
       **Observação**: se tiver pausado em uma linha diferente, você tem uma extensão de navegador que
       registra um listener de evento `click` em cada página que você visita. Você ficou pausado no
       listener `click` da extensão. Se usar o modo de navegação anônima [navegador no
       privado][incognito], que desativa todas as extensões, você pode ver que pausou
       todas as vezes na linha de código correta.
     </aside>

[incognito]: https://support.google.com/chrome/answer/95464

O **Event Listener Breakpoints** é apenas um dos vários tipos de pontos de interrupção disponíveis no DevTools.
Vale a pena memorizar todos os tipos diferentes, porque cada tipo ajuda você a depurar
cenários diferentes da maneira mais rápida possível. Veja [Pausar o código com pontos de interrupção][breakpoints]
para saber quando e como usar cada tipo.

[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png
[breakpoints]: /web/tools/chrome-devtools/javascript/breakpoints

## Etapa 4: percorrer o código {: #code-stepping }

Uma causa comum de bugs é a execução de um script na
ordem errada. Percorrer o código permite que você acompanhe a execução dele,
uma linha de cada vez, e descubra exatamente onde
ele está sendo executado em ordem diferente da esperada. Experimente agora:

1. No painel **Sources** do DevTools, clique em **Step into next function
   call** ![Entrar na chamada de função][into]{:.devtools-inline} para percorrer
   a execução da função `onClick()` uma linha por vez.
   O DevTools destaca esta linha de código:

     <pre class="prettyprint">if (inputsAreEmpty()) {</pre>

1. Clique em **Step over next function call** ![Pular para a próxima chamada
   de função][over]{:.devtools-inline}. O DevTools executa `inputsAreEmpty()`
   sem entrar na função para acompanhamento. Observe como o DevTools pula algumas linhas de código.
   Isso ocorre porque `inputsAreEmpty()` foi avaliado como falso, portanto, o bloco de código da instrução `if`
   não foi executado.

Essa é a ideia básica de percorrer o código. Se observar o código em
`get-started.js`, você verá que o bug está provavelmente na
função`updateLabel()`. Em vez de acompanhar cada linha de código,
você pode usar outro tipo de ponto de interrupção para pausar o código mais perto do
local do bug.

[into]: /web/tools/chrome-devtools/images/step-into.png
[over]: /web/tools/chrome-devtools/images/step-over.png

## Etapa 5: definir um ponto de interrupção da linha de código {: #line-breakpoint }

Os pontos de interrupção de linha de código são o tipo mais comum de ponto de interrupção. Quando
você quiser pausar em uma linha de código específica, use um
ponto de interrupção de linha de código.

1. Veja a última linha de código em `updateLabel()`:

     <pre class="prettyprint">label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;</pre>

1. À esquerda do código, você pode ver o número da linha dessa
   linha de código específica, que é **32**. Clique em **32**. O DevTools deixa o ícone
   do **32** azul. Isso significa que há um ponto de interrupção de linha de código nessa linha.
   O DevTools sempre faz uma pausa antes que essa linha de código seja executada.
1. Clique em **Resume script execution** ![Retomar a execução do
   script][resume]{:.devtools-inline}. O script continua a execução
   até alcançar a linha 32. Nas linhas 29, 30, e 31, o DevTools exibe os valores de
   `addend1`, `addend2` e `sum` à direita do ponto e vírgula de cada linha.

     <figure>
       <img src="imgs/line-of-code-breakpoint.png"
         alt="O DevTools pausa no ponto de interrupção da linha de código sobre a linha 32."/>
       <figcaption>
         <b>Imagem 6</b>. O DevTools pausa no ponto de interrupção da linha de código na linha 32.
       </figcaption>
     </figure>

## Etapa 6: conferir valores das variáveis {: #check-values }

Os valores do `addend1`, `addend2` e `sum` parecem suspeitos. Eles estão entre aspas, o que
significa que são strings. Essa é uma boa hipótese para explicar a causa do bug.
Agora é hora de reunir mais informações. O DevTools fornece muitas ferramentas para examinar os valores das
variáveis.

### Método 1: o painel Scope {: #scope }

Quando você está pausado em uma linha de código, o painel **Scope** exibe para você qual o local e as variáveis globais
atualmente definidas, juntamente com o valor de cada variável. Ele também exibe variáveis de fechamento,
quando é o caso. Clique duas vezes sobre o valor de uma variável para editá-lo. Quando você não está pausado sobre uma linha de
código, o painel **Scope** fica vazio.

<figure>
  <img src="imgs/scope-pane.png"
    alt="O painel Scope."/>
  <figcaption>
    <b>Imagem 7</b>. O painel <b>Scope</b>
 </figcaption>
</figure>

### Método 2: Watch Expressions {: #watch-expressions }

A guia **Watch Expressions** permite que você monitore os valores de variáveis ao longo do tempo.
Como o nome indica, o Watch Expressions não é limitado apenas a variáveis. Você
pode armazenar qualquer expressão JavaScript válida em uma Watch Expression. Experimente agora:

1. Clique na guia **Watch**.
1. Clique em **Add Expression** ![Adicionar expressão][add]{:.devtools-inline}.
1. Digite `typeof sum`.
1. Pressione <kbd>Enter</kbd>. O DevTools exibe `typeof sum: "string"`. O valor
   à direita dos dois pontos é o resultado da Watch Expression.

     <figure>
       <img src="imgs/get-started-watch-expression.png"
         alt="O painel Watch Expression."/>
       <figcaption>
         <b>Imagem 8</b>. O painel Watch Expression pane (canto inferior direito) após a
         criação da Watch Expression <code>typeof sum</code>.
         Se a janela do DevTools for grande, o painel Watch Expression estará localizado
         à direita, acima do painel <b>Event Listener Breakpoints</b>.
       </figcaption>
     </figure>

Como previsto, `sum` está sendo avaliado como string em vez de
número. Esse é o motivo do bug.

### Método 3: o Console {: #console }

Além da visualização de mensagens `console.log()`, você também pode usar o Console para avaliar
instruções arbitrárias do JavaScript. Com relação às depurações, você pode usar o console para testar
potenciais correções de bugs. Experimente agora:

1. Se você não estiver com a gaveta Console aberta, pressione <kbd>Escape</kbd> para
   abri-la. Ela será aberta na parte inferior da janela do DevTools.
1. No Console, digite `parseInt(addend1) + parseInt(addend2)`. Essa instrução funciona porque você
   está pausado em uma linha onde `addend1` e `addend2` estão no escopo.
1. Pressione <kbd>Enter</kbd>. O DevTools avalia a instrução e exibe
   `6`, que é o resultado esperado da demonstração.

     <figure>
       <img src="imgs/get-started-console.png"
         alt="A gaveta Console, após avaliar parseInt(addend1) + parseInt(addend2)."/>
       <figcaption>
         <b>Imagem 9</b>. A gaveta Console, após avaliar
         <code>parseInt(addend1) + parseInt(addend2)</code>.
       </figcaption>
     </figure>

[add]: /web/tools/chrome-devtools/javascript/imgs/add-expression.png

## Etapa 7: aplicar uma correção {: #apply-fix }

Você encontrou uma correção para o bug. Agora, só resta testar a
correção editando o código e executando novamente a demonstração. Não é
necessário sair do DevTools para aplicar a correção. Você pode editar o código JavaScript diretamente
na IU do DevTools. Experimente agora:

1. Clique em **Resume script execution** ![Retomar a execução do
   script][resume]{:.devtools-inline}.
1. No **Code Editor**, substitua a linha 31, `var sum = addend1 + addend2`, por
   `var sum = parseInt(addend1) + parseInt(addend2)`.
1. Pressione <kbd>Command</kbd>+<kbd>S</kbd> (Mac) ou
   <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux) para salvar sua alteração.
1. Clique em **Deactivate breakpoints** ![Desativar
   pontos de interrupção][deactivate]{:.devtools-inline}. Ele é alterado para a cor azul, indicando
   que está ativo. Enquanto essa configuração for mantida, o DevTools ignorará todos os pontos de interrupção
   definidos.
1. Teste a demonstração com valores diferentes. A demonstração agora realiza o cálculo corretamente.

Atenção: esse fluxo de trabalho é aplicável apenas a correções de código executado no seu navegador.
Ela não se aplica ao código executado por todos os usuários que visitam sua página. Para fazer isso, você precisa corrigir o
código que está nos seus servidores.

[deactivate]: /web/tools/chrome-devtools/images/deactivate-breakpoints-button.png

## Próximas etapas {: #next-steps }

Parabéns! Você sabe como aproveitar ao máximo o Chrome DevTools para depurar
JavaScript. As ferramentas e os métodos que você aprendeu neste tutorial podem economizar horas incalculáveis.

Este tutorial mostrou apenas duas formas de definir pontos de interrupção. O DevTools oferece muitas
outras formas, incluindo:

* Pontos de interrupção condicionais, acionados somente quando a condição fornecida
 for verdadeira.
* Pontos de interrupção em exceções capturadas ou não capturadas.
* Pontos de interrupção XHR, acionados quando o URL selecionado corresponder a
 uma substring informada.

Veja [Pausar o código com pontos de interrupção](/web/tools/chrome-devtools/javascript/breakpoints) para
saber quando e como usar cada tipo.

Há alguns controles de acompanhamento de código que não foram explicados neste tutorial. Veja [Percorrer
linha de código](/web/tools/chrome-devtools/javascript/reference#stepping) para saber mais.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
