---
title: "Optimize JavaScript Execution"
description: "JavaScript é geralmente o acionador de mudanças visuais. Algumas vezes de forma direta, através de manipulações de estilo, outras, seu cálculos resultarão em mudanças visuais, como pesquisa ou classificação de algum dado. O JavaScript mal cronometrado ou de longa execução pode ser uma causa comum de problemas de desempenho, então minimize seu impacto sempre que possível."
updated_on: 2015-03-20
notes:
  jit:
    - "Para conhecer o funcionamento do JIT, veja <a href='http://mrale.ph/irhydra/2/'>IRHydra<sup>2</sup> por Vyacheslav Egorov</a>. Mostra o estado intermediário do código do JavaScript quando o mecanismo JavaScript do Chrome, V8, o otimiza."
key-takeaways:
  - Evite setTimeout ou setInterval para atualizações de visual; sempre use requestAnimationFrame.
  - Remova o JavaScript de longa duração do thread principal para o Web Workers.
  - Use microtarefas para realizar mudanças do DOM em vários frames.
  - Use a Linha cronológica do Chrome DevToolse JavaScript Profiler para avaliar o impacto do JavaScript.

---
<p class="intro">
  JavaScript é geralmente o acionador de mudanças visuais. Algumas vezes de forma direta, através de manipulações de estilo, outras, seu cálculos resultarão em mudanças visuais, como pesquisa ou classificação de algum dado. O JavaScript mal cronometrado ou de longa execução pode ser uma causa comum de problemas de desempenho, então minimize seu impacto sempre que possível.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

O perfil de desempenho do JavaScript pode ser algo complexo, porque o JavaScript que você escreve não se parece em nada com o código que é realmente executado. Navegadores modernos usam compiladores JIT e todas as formas de otimizações e truques para testar e proporcionar a execução mais rápida possível o que muda muito a dinâmica do código.

{% include shared/remember.liquid title="Note" list=page.notes.jit %}

No entanto, há algumas coisas que podem ser feitas para melhorar a execução do JavaScript em seus aplicativos.

## Use requestAnimationFrame para mudanças visuais

Quando mudanças visuais estão acontecendo na tela, recomenda-se fazer o trabalho no momento certo para o navegador, ou seja, no início do frame. A única forma de garantir que seu JavaScript funcionará no início de um frame é usando `requestAnimationFrame`.

{% highlight javascript %}
/**
 * If run as a requestAnimationFrame callback, this
 * will be run at the start of the frame.
 */
function updateScreen(time) {
  // Make visual updates here.
}

requestAnimationFrame(updateScreen);
{% endhighlight %}

Frameworks ou amostras podem usar `setTimeout` ou `setInterval` para realizar mudanças visuais, como animações, mas o retorno de chamada será executado em _algum ponto_ no frame, possivelmente no final, o que pode causar a perda de um frame, e consequentemente um jank.

<img src="images/optimize-javascript-execution/settimeout.jpg" class="g--centered" alt="setTimeout fazendo o navegador perder um frame.">

Na verdade, o comportamento padrão do `animate` do jQuery hoje é usar `setTimeout`! Você pode [corrigi-lo para usar `requestAnimationFrame`](https://github.com/gnarf/jquery-requestAnimationFrame), o que é recomendado.

## Reduza a complexidade ou use Web Workers

JavaScript funciona no thread principal do navegador, juntamente de cálculos de estilo, layout e, em muitos casos, pintura. Se seu JavaScript for executado por muito tempo, bloqueará essas outras tarefas, possivelmente causando perdas de frames.

Seja tático quanto ao momento e tempo de execução do JavaScript. Por exemplo, em uma animação como rolagem, mantenha seu JavaScript próximo de **3-4 ms**. Um tempo maior que esse pode ser demais. Se estiver em um período de inatividade, haverá maior flexibilidade quanto ao tempo decorrido.

Em muitos casos, você pode delegar trabalho computacional para [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage), se, por exemplo, acesso DOM não for exigido. Manipulação de dados ou transversal, como classificação ou pesquisa, são adequados para este modelo, da mesma forma que carregamento e geração de modelo.

{% highlight javascript %}
var dataSortWorker = new Worker("sort-worker.js");
dataSortWorker.postMesssage(dataToSort);

// The main thread is now free to continue working on other things...

dataSortWorker.addEventListener('message', function(evt) {
   var sortedData = e.data;
   // Update data on screen...
});

{% endhighlight %}

Nem todo trabalho é adequado a este modelo: Web Workers não tem acesso DOM. Quando seu trabalho precisar constar do thread principal, considere uma abordagem em lotes, onde a tarefa maior é  segmentada em microtarefas, que levam alguns milissegundos e são executadas dentro de handlers `requestAnimationFrame` em cada frame.

{% highlight javascript %}
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
{% endhighlight %}

Há consequências de UX e UI  nessa abordagem e você precisará garantir que o usuário saiba que uma tarefa está sendo processada através do [uso de um indicador de atividade ou andamento](http://www.google.com/design/spec/components/progress-activity.html). Em qualquer caso, essa abordagem manterá o thread principal do seu aplicativo livre, ajudando a permanecer responsivo para as interações do usuário.

## Conheça sua “taxa de frames” do JavaScript

Ao avaliar um framework, biblioteca ou seu próprio código, é importante avaliar quanto custará para executar o código JavaScript com base frame por frame. Isso é especialmente importante em trabalhos de animação de desempenho crítico, como transição ou rolagem.

A melhor forma de medir seu perfil de custo e desempenho do JavaScript é usando Chrome DevTools. Geralmente você receberá registros de detalhes baixos como:

<img src="images/optimize-javascript-execution/low-js-detail.jpg" class="g--centered" alt="Linha cronológica do Chrome DevTools fornecendo detalhes de baixa execução JS.">

Se descobrir que tem um JavaScript de longa execução, é possível habilitar o gerador de perfis do JavaScript no alto interface do usuário do DevTools:

<img src="images/optimize-javascript-execution/js-profiler-toggle.jpg" class="g--centered" alt="Habilitando o gerador de perfis JS no DevTools.">

Há uma sobrecarga no perfil do JavaScript desta forma, portanto, certifique-se de habilitar apenas quando desejar dicas sobre as características de tempo de execução do JavaScript. Com a caixa de seleção habilitada, você pode realizar as mesmas ações e receberá muito mais informações sobre quais funções foram chamadas no seu JavaScript:

<img src="images/optimize-javascript-execution/high-js-detail.jpg" class="g--centered" alt="Linha cronológica do Chrome DevTools fornecendo detalhes de alta execução JS.">

Com essa informação você pode avaliar o impacto do desempenho do JavaScript no seu aplicativo e começar a localizar e corrigir qualquer ponto de acesso onde as funções estão levando muito tempo para serem executadas. Como mencionado anteriormente, recomenda-se remover o JavaScript de longa execução ou, se não for possível, movê-lo para um Web Worker liberando o thread principal para continuar com outras tarefas.

## Evite a micro otimização do seu JavaScript

Pode ser bom saber que o navegador pode executar uma versão de alguma coisa 100 vezes mais rápido do que outra coisa, como a solicitação e o `offsetTop` do elemento é mais rápido do que a computação `getBoundingClientRect()`, mas geralmente você estará apenas chamando funções como essas poucas vezes por frame. Portanto, é normalmente esforço desperdiçado enfatizar esse aspecto do desempenho do JavaScript. Você geralmente economizará apenas frações de milissegundos.

Se estiver criando um jogo ou um aplicativo caro, essa regra não se aplica, pois provavelmente esta inserindo muita computação em um único frame e, nesse caso, tudo ajuda.

Resumindo, você deve ter muito cuidado com as micro otimizações porque elas geralmente não mapeiam o tipo de aplicativo que está sendo criado.


