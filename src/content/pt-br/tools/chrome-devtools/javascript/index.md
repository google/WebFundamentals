project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Dê os primeiros passos com a depuração do JavaScript usando o Chrome DevTools neste tutorial interativo.

{# wf_updated_on: 2017-01-04 #}
{# wf_published_on: 2017-01-04 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

<!-- TODO
     make demo responsive
-->

# Primeiros passos com a depuração do JavaScript no Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Este tutorial detalhado interativo ensina o fluxo de trabalho
básico para depurar JavaScript no Chrome DevTools. O tutorial mostra
como depurar um problema específico, mas o fluxo de trabalho geral que você aprenderá será útil
para depurar todos os tipos de bugs de JavaScript.

Se você está usando `console.log()` para encontrar e corrigir bugs no código, em vez disso, considere
usar o fluxo de trabalho descrito neste tutorial. Muitas vezes, esse fluxo será bem
mais rápido e eficaz.

## Etapa 1: reproduzir o bug {: #step-1 }

A reprodução do bug é sempre a primeira etapa da depuração.
"Reproduzir o bug" significa encontrar uma série de ações que causa
consistentemente a ocorrência do bug. Pode ser necessário reproduzir o bug várias vezes.
Portanto, tente eliminar todas as etapas desnecessárias.

Siga as instruções abaixo para reproduzir o bug que você
corrigirá neste tutorial.

1. Clique em **Open Demo**. A demonstração abrirá em uma nova guia.

     <a href="https://googlechrome.github.io/devtools-samples/debug-js/get-started"
       target="devtools"
       rel="noopener noreferrer">
       <button>Open Demo</button>
     </a>

1. Na demonstração, insira `5` em **Number 1**.
1. Insira `1` em **Number 2**.
1. Clique em **Add Number 1 and Number 2**.
1. Examine o rótulo abaixo das entradas e do botão. O rótulo exibe `5 + 1 = 51`.

Epa! Esse resultado está incorreto. O resultado deveria ser `6`. Esse é o bug que
você corrigirá.

## Etapa 2: pausar o código com um ponto de interrupção

O DevTools permite pausar o código no meio da execução e
examinar os valores de *todas* as variáveis naquele momento. A ferramenta para
pausar o código é denominada um **ponto de interrupção**. Experimente agora:

1. Abra o DevTools na demonstração pressionando
   <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) ou
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows, Linux).

1. Clique na guia **Sources**.

<!-- TODO add a screenshot. Don't create the screenshot until demo design is
     finished. Add it here rather than previous screenshot in case Sources
     is hidden -->

1. Clique em **Event Listener Breakpoints** para expandir a seção. O DevTools mostra
   uma lista de categorias de vendo expansíveis, como **Animation** e
   **Clipboard**.

<!-- TODO or maybe add it here -->

1. Ao lado da categoria de evento **Mouse**, clique em **Expand** ![Ícone
   de expansão](/web/tools/chrome-devtools/images/expand.png){: .devtools-inline}.
   O DevTools mostra uma lista de eventos de mouse, como **click**,
   com caixas de seleção ao seu lado.
1. Marque a caixa de seleção **click**.

     <figure>
       <img src="imgs/get-started-click-breakpoint.png"
         alt="O DevTools abriu na demonstração, com o foco no painel Sources
              e pontos de interrupção de detector de evento de clique ativados."
       <figcaption>
         <b>Figura 1</b>: O DevTools abriu na demonstração, com o
              foco no painel Sources e pontos de interrupção de detector de evento de clique ativados.
         Se a janela do DevTools for grande, o painel <b>Event
         Listener Breakpoints</b> estará localizado à direita, em vez de no
         canto inferior esquerdo, como na captura de tela.
       </figcaption>
     </figure>

1. Voltando à demonstração, clique em **Add Number 1 and Number 2** novamente. O DevTools
   pausa a demonstração e destaca uma linha de código no painel **Sources**.
   O DevTools destaca esta linha de código:

       `function onClick() {`

Quando você marcou a caixa de seleção **click**, definiu um ponto de interrupção baseado em evento para
todos os eventos `click`. Quando *qualquer* nó que tiver um gerenciador `click` for clicado
, o DevTools pausará automaticamente na primeira linha do gerenciador
`click` desse nó.

Observação: esse é apenas um dos vários tipos de pontos de interrupção oferecidos pelo DevTools.
O tipo de pontos de interrupção que você deve usar depende do problema que está depurando.

[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png

## Etapa 3: percorrer o código

Uma causa comum de bugs é a execução de um script na
ordem errada. Percorrer o código permite que você acompanhe sua execução,
uma linha de cada vez, e descubra exatamente onde
ele está sendo executado em ordem diferente da esperada. Experimente agora:

1. No painel **Sources** do DevTools, clique em **Step into next function
   call** ![Entrar na próxima chamada de função][into]{:.devtools-inline} para acompanhar
   a execução da função `onClick()`, uma linha de cada vez.
   O DevTools destaca esta linha de código:

       `if (inputsAreEmpty()) {` 

1. Clique em **Step over next function call** ![Pular para a próxima chamada de
   função][over]{:.devtools-inline}. O DevTools executa `inputsAreEmpty()`
   sem entrar na função para acompanhamento. Observe como o DevTools pula algumas linhas de código.
   Isso ocorre porque `inputsAreEmpty()` foi avaliado como falso, portanto, o bloco de código da instrução `if`
   não executou.

Essa é a ideia básica de percorrer o código. Se observar o código em
`get-started.js`, você verá que o bug está provavelmente na
função `updateLabel()`. Em vez de acompanhar cada linha de código,
você pode usar outro tipo de ponto de interrupção para pausar o código mais perto do
local do bug.

[into]: /web/tools/chrome-devtools/images/step-into.png
[over]: /web/tools/chrome-devtools/images/step-over.png

## Etapa 4: definir outro ponto de interrupção

Os pontos de interrupção de linha de código são o tipo mais comum de ponto de interrupção. Quando
você quiser pausar em uma linha de código específica, use um
ponto de interrupção de linha de código. Experimente agora:

1. Veja a última linha de código em `updateLabel()`, que se parece com:

       `label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;`

1. À esquerda do código, você pode ver o número da linha dessa
   linha de código específica: **32**. Clique em **32**. O DevTools coloca um ícone azul acima
   de **32**. Isso significa que há um ponto de interrupção de linha de código nessa linha.
   Agora, o DevTools pausará sempre antes da execução dessa linha de código.
1. Clique em **Resume script execution** ![Retomar
   execução do script][resume]{:.devtools-inline}. O script continua a executar
   até alcançar a linha de código onde o ponto de interrupção foi colocado.
1. Examine as linhas de código de `updateLabel()` que já foram executadas.
   O DevTools imprime os valores de `addend1`, `addend2` e `sum`.

O valor de `sum` parece suspeito. Aparentemente, foi avaliado como
string em vez de como número. Isso pode ser a causa do bug.

## Etapa 5: conferir valores das variáveis

Outra causa comum de bugs é quando uma variável ou função produz
um valor diferente do esperado. Muitos desenvolvedores usam `console.log()` para
acompanhar a evolução dos valores ao longo do tempo. No entanto, `console.log()` pode ser tedioso e
ineficaz por dois motivos. Primeiro, pode ser necessário editar manualmente o código
com várias chamadas para `console.log()`. Segundo, pode ser que você não saiba exatamente qual
variável está relacionada ao bug e tenha de exibir várias variáveis.

Uma alternativa do DevTools ao `console.log()` é Watch Expressions. Use
Watch Expressions para monitorar o valor das variáveis ao longo do tempo.
Como indicado pelo nome, Watch Expressions não estão limitadas apenas a variáveis. Você
pode armazenar qualquer expressão JavaScript válida em uma Watch Expression. Experimente agora:

1. No painel **Sources** de DevTools, clique em **Watch**. A seção é expandida.
1. Clique em **Add Expression** ![Adicionar expressão][add]{:.devtools-inline}.
1. Digite `typeof sum`.
1. Pressione <kbd>Enter</kbd>. O DevTools exibe `typeof sum: "string"`. O valor
   à direita dos dois pontos é o resultado da Watch Expression.

     <figure>
       <img src="imgs/get-started-watch-expression.png"
         alt="O painel Watch Expression."
       <figcaption>
         <b>Figura 1</b>: O painel Watch Expression pane (canto inferior direito) após a
         criação da Watch Expression  <code>typeof sum</code>.
         Se a janela do DevTools for grande, o painel Watch Expression estará localizado
         à direita, acima do painel <b>Event Listener Breakpoints</b>.
       </figcaption>
     </figure>

Como presumido, `sum` está sendo avaliado como string em vez de
número. Esse é o motivo do bug da demonstração.

Uma segunda alternativa do DevTools ao `console.log()` é o Console. Use o
Console para avaliar instruções arbitrárias do JavaScript.
Normalmente, os desenvolvedores usam o Console para substituir os valores de variáveis
durante a depuração. No nosso caso, o Console pode ajudar a testar as possíveis
correções do bug que você acabou de descobrir. Experimente agora:

1. Se a gaveta Console não estiver aberta, pressione <kbd>Escape</kbd> para
   abri-la. Ela é aberta na parte inferior da janela do DevTools.
1. No Console, digite `parseInt(addend1) + parseInt(addend2)`.
1. Pressione <kbd>Enter</kbd>. O DevTools avalia a instrução e imprime
   `6`, que é o resultado esperado da demonstração.

     <figure>
       <img src="imgs/get-started-console.png"
         alt="A gaveta Console após a avaliação de uma instrução."
       <figcaption>
         <b>Figura 1</b>: A gaveta Console após a avaliação de
         <code>parseInt(addend1) + parseInt(addend2)</code>.
       </figcaption>
     </figure>

[add]: /web/tools/chrome-devtools/javascript/imgs/add-expression.png

## Etapa 6: aplicar uma correção

Você identificou uma possível correção para o bug. Agora, só resta testar a
correção editando o código e executando novamente a demonstração. Não é
necessário sair do DevTools para aplicar a correção. Você pode editar o código JavaScript diretamente
na IU do DevTools. Experimente agora:

1. No editor de código do painel **Sources** de DevTools, substitua
   `var sum = addend1 + addend2` por
   `var sum = parseInt(addend1) + parseInt(addend2);`. Isso está uma linha
   acima da posição atual.
1. Pressione <kbd>Command</kbd>+<kbd>S</kbd> (Mac) ou
   <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux) para salvar a alteração.
   O fundo do código é alterado para vermelho, indicando que o script foi
   alterado dentro do DevTools.
1. Clique em **Deactivate breakpoints** ![Desativar
   pontos de interrupção][deactivate]{:.devtools-inline}. A cor muda para azul, indicando
   que está ativo. Enquanto essa configuração for mantida, o DevTools ignorará todos os pontos de interrupção
   definidos.
1. Clique em **Resume script execution** ![Retomar
   execução do script][resume]{:.devtools-inline}.
1. Teste a demonstração com valores diferentes. Agora, a demonstração deve calcular
   as somas corretamente.

Lembre-se de que esse fluxo de trabalho se aplica apenas a correções de código
executado no seu navegador. Ela não se aplica ao código executado por todos os usuários que acessam a sua
página. Para fazer isso, será necessário corrigir o código executado nos servidores
que entregam a sua página.

[deactivate]: /web/tools/chrome-devtools/images/deactivate-breakpoints-button.png

## Próximas etapas

Parabéns! Agora você já conhece os conceitos básicos da depuração de JavaScript no DevTools.

Este tutorial mostrou apenas duas formas de definir pontos de interrupção. O DevTools oferece muitas
outras formas, incluindo:

* Pontos de interrupção condicionais, acionados somente quando a condição fornecida
  for verdadeira.
* Pontos de interrupção em exceções capturadas ou não capturadas.
* Pontos de interrupção XHR, acionados quando o URL selecionado corresponder a
  uma substring informada.

<a class="gc-analytics-event"
   data-category="DevTools / Debug JS / Get Started / Next Steps / Breakpoints"
   href="add-breakpoints" target="_blank"
   rel="noopener noreferrer"><button>Mostrar todos os pontos de interrupção</button></a>

Há alguns controles de acompanhamento de código que não foram explicados neste
tutorial. Consulte o link a seguir para saber mais sobre eles.

<a class="gc-analytics-event"
   data-category="DevTools / Debug JS / Get Started / Next Steps / Breakpoints"
   href="step-code#stepping_in_action" target="_blank"
   rel="noopener noreferrer"><button>Quero saber tudo sobre o acompanhamento de código</button></a>

## Comentários

Ajude-nos a melhorar este tutorial respondendo às perguntas abaixo.

{% framebox width="auto" height="auto" %}

<p>Você concluiu o tutorial com êxito?</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Completed / Yes">Sim</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Completed / No">Não</button>

<p>Este tutorial tinha as informações que você estava procurando?</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Relevant / Yes">Sim</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Relevant / No">Não</button>

<p>O tutorial foi muito longo?</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Too Long / Yes">Sim</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Too Long / No">Não</button>

{% endframebox %}


{# wf_devsite_translation #}
