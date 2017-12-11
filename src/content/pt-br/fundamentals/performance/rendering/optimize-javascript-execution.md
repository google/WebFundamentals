project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript muitas vezes aciona mudanças visuais. Às vezes, diretamente por manipulação de estilo e, às vezes, por cálculos que resultam em mudanças visuais, como buscar ou classificar dados. JavaScript de longa duração ou no momento errado é uma causa comum de problemas de desempenho. Você deve buscar minimizar seu impacto ao máximo.

{# wf_updated_on: 2015-03-20 #}
{# wf_published_on: 2015-03-20 #}

# Otimizar a execução de JavaScript {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

JavaScript muitas vezes aciona mudanças visuais. Às vezes, diretamente por
manipulação de estilo e, às vezes, por cálculos que resultam
em mudanças visuais, como buscar ou classificar dados. JavaScript de
longa execução ou no momento errado é uma causa comum de problemas de desempenho.
Você deve buscar minimizar seu impacto ao máximo.

A criação de perfis de desempenho do JavaScript pode ser algo complexo porque o JavaScript que você escreve não se parece em nada com o código realmente executado. Navegadores modernos usam compiladores JIT e todas as formas de otimizações e truques para tentar oferecer a execução mais rápida possível. Isso muda consideravelmente a dinâmica do código.

Observação: se você quiser realmente conhecer o funcionamento do JIT, acesse <a href='http://mrale.ph/irhydra/2/'>IRHydra<sup>2</sup>, de Vyacheslav Egorov</a>. Mostra o estado intermediário do código do JavaScript quando o mecanismo JavaScript do Chrome, V8, o otimiza.

No entanto, há certamente algumas coisas que podem ser feitas para melhorar a execução do JavaScript nos aplicativos.

### TL;DR {: .hide-from-toc }

* Evitar setTimeout ou setInterval para mudanças visuais, sempre usar requestAnimationFrame.
* Transferir JavaScript de longa duração do encadeamento principal para os Web Workers.
* Usar microtarefas para realizar mudanças no DOM ao longo de vários quadros.
* Usar a Timeline e o JavaScript Profiler do Chrome DevTools para avaliar o impacto do JavaScript.

## Use `requestAnimationFrame` para mudanças visuais

Quando mudanças visuais ocorrem na tela, recomendamos fazer o trabalho no momento certo para o navegador, ou seja, no início do quadro. A única forma de garantir que o JavaScript seja executado no início de um quadro é usando `requestAnimationFrame`.


    /**
     * If run as a requestAnimationFrame callback, this
     * will be run at the start of the frame.
     */
    function updateScreen(time) {
      // Make visual updates here.
    }

    requestAnimationFrame(updateScreen);


Frameworks ou exemplos podem usar `setTimeout` ou `setInterval` para fazer mudanças visuais como animações. No entanto, o problema dessa abordagem é que o retorno de chamada será executado em _algum ponto_ no quadro, possivelmente no final. Isso pode causar a perda de um quadro e, consequentemente, instabilidade.

<img src="images/optimize-javascript-execution/settimeout.jpg" alt="setTimeout faz o navegador perder um quadro.">

Na verdade, o comportamento padrão atual do `animate` do jQuery é usar `setTimeout`! Você pode [corrigi-lo para usar `requestAnimationFrame`](https://github.com/gnarf/jquery-requestAnimationFrame), o que é altamente recomendado.

## Reduza a complexidade ou use Web Workers

O JavaScript funciona no encadeamento principal do navegador, juntamente com cálculos de estilo, layout e, em muitos casos, pintura. Se a execução do JavaScript demorar muito tempo, bloqueará essas outras tarefas, causando possivelmente perda de quadros.

Seja tático quanto ao momento e ao tempo de execução do JavaScript. Por exemplo, em uma animação como rolagem, mantenha a duração do JavaScript no intervalo de **3 a 4 ms**. Um tempo maior que esse pode ser demais. Em períodos de inatividade, há mais flexibilidade quanto ao tempo decorrido.

Em muitos casos, você pode delegar trabalho computacional puro para [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage), desde que, por exemplo não seja necessário acessar o DOM. Manipular ou percorrer dados, como na classificação ou pesquisa, são com frequência atividades adequadas para esse modelo, bem como carregamento e geração de modelo.


    var dataSortWorker = new Worker("sort-worker.js");
    dataSortWorker.postMesssage(dataToSort);

    // The main thread is now free to continue working on other things...

    dataSortWorker.addEventListener('message', function(evt) {
       var sortedData = evt.data;
       // Update data on screen...
    });



Nem todo trabalho é adequado a esse modelo: os Web Workers não têm acesso ao DOM. Quando for necessário executar seu trabalho no encadeamento principal, considere uma abordagem em lotes, onde a tarefa maior é segmentada em microtarefas, cada uma delas com duração de poucos milissegundos e executada dentro de gerenciadores `requestAnimationFrame` em cada quadro.


    var taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
    requestAnimationFrame(processTaskList);

    function processTaskList(taskStartTime) {
      var taskFinishTime;

      do {
        // Assume the next task is pushed onto a stack.
        var nextTask = taskList.pop();

        // Process nextTask.
        processTask(nextTask);

        // Go again if there’s enough time to do the next task.
        taskFinishTime = window.performance.now();
      } while (taskFinishTime - taskStartTime < 3);

      if (taskList.length > 0)
        requestAnimationFrame(processTaskList);

    }


Essa abordagem afeta a interface e a experiência do usuário. Será necessário garantir que o usuário saiba que uma tarefa está sendo processada, [usando um indicador de andamento ou de atividade](https://www.google.com/design/spec/components/progress-activity.html). Em qualquer caso, essa abordagem mantém o encadeamento principal do aplicativo livre, ajudando-o a ser responsivo para as interações do usuário.

## Conheça a "taxa de quadros" do JavaScript

Ao avaliar um framework, biblioteca ou seu próprio código, é importante estimar o custo da execução do código JavaScript quadro a quadro. Isso é especialmente importante em trabalhos de animação em que o desempenho é crítico, como transição ou rolagem.

A melhor forma de medir o perfil de custo e desempenho do JavaScript é usando Chrome DevTools. Normalmente, você obterá registros com poucos detalhes como:

<img src="images/optimize-javascript-execution/low-js-detail.jpg" alt="Timeline do Chrome DevTools com poucos detalhes da execução do JS.">

Se você descobrir que tem um JavaScript de longa duração, poderá ativar o gerador de perfis do JavaScript na parte superior da interface do usuário do DevTools:

<img src="images/optimize-javascript-execution/js-profiler-toggle.jpg" alt="Ativar o gerador de perfis JS no DevTools.">

A geração de perfis do JavaScript dessa forma gera uma sobrecarga. Portanto, ative-a somente quando precisar de mais insights sobre as características de tempo de execução do JavaScript. Com a caixa de seleção ativada, você pode executar as mesmas ações e receberá muito mais informações sobre quais funções foram chamadas no JavaScript:

<img src="images/optimize-javascript-execution/high-js-detail.jpg" alt="Timeline do Chrome DevTools com muitos detalhes da execução do JS.">

Com essas informações, você pode avaliar o impacto do desempenho do JavaScript no aplicativo e começar a localizar e corrigir todos os pontos problemáticos onde o tempo de execução das funções é excessivo. Como mencionado anteriormente, remova o JavaScript de longa execução ou, se isso não for possível, transfira-o para um Web Worker, liberando o encadeamento principal para continuar com outras tarefas.

## Evite a micro-otimização do JavaScript

Pode ser bom saber que o navegador pode executar uma versão de alguma coisa 100 vezes mais rápido do que outra coisa, como a solicitação e o `offsetTop` do elemento é mais rápido do que a computação `getBoundingClientRect()`, mas geralmente você estará apenas chamando funções como essas poucas vezes por frame. Portanto, é normalmente esforço desperdiçado enfatizar esse aspecto do desempenho do JavaScript. Você geralmente economizará apenas frações de milissegundos.

Se você estiver criando um jogo ou um aplicativo com alto custo computacional, essa regra não se aplicará, pois provavelmente haverá muita computação em um único quadro e, nesse caso, tudo ajuda.

Resumindo, você deve ser muito cauteloso com micro-otimizações porque elas geralmente não são adequadas ao tipo de aplicativo que você está criando.


{# wf_devsite_translation #}
