project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: O modo de eventos de linha do tempo exibe todos os eventos acionados durante uma gravação. Use a referência ao evento de linha do tempo para saber mais sobre cada tipo de evento de linha do tempo.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Referência aos eventos de linha do tempo {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}

O modo de eventos de linha do tempo exibe todos os eventos acionados durante uma gravação. Use a referência ao evento de linha do tempo para saber mais sobre cada tipo de evento de linha do tempo.


## Propriedades comuns de eventos de linha do tempo

Determinados detalhes são apresentados em eventos de todos os tipos, embora alguns se apliquem apenas a determinados tipos de evento. Esta seção lista as propriedades comuns a diferentes tipos de evento. As propriedades específicas de determinados tipos de evento são listadas nas referências a esses tipos de evento a seguir.

| Propriedade   |      Quando é exibida                                                       |
|----------|:-----------------------------------------------------------------|
| --|| Aggregated time | Para eventos com [eventos aninhados](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#view-nested-events), o tempo necessário de cada categoria de eventos.|
| Call Stack | Para eventos com [eventos secundários](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#view-nested-events), o tempo necessário de cada categoria de eventos.|
| CPU time | Quanto tempo do CPU o evento gravado tomou.|
| Details | Outros detalhes sobre o evento.|
| Duration (at time-stamp) | Quanto tempo o evento levou para concluir com todos os seus secundários; marcação de tempo é o tempo em que o evento ocorreu, em relação a quando a gravação começou.|
| Self time    | Quanto tempo o evento levou sem seus aninhados.|
| Used Heap Size | Quantidade de memória usada pelo aplicativo quando o evento foi gravado e a mudança de delta (+/-) em tamanho da pilha usado desde a última amostragem.|

## Eventos de carregamento

Esta seção lista eventos que pertencem à categoria Loading e suas propriedades.

| Evento | Descrição |
|-------|:----------|
|Parse HTML|  O Chrome executou seu algoritmo de análise do HTML.|
|Finish Loading|  Uma solicitação de rede concluída.|
|Receive Data|  Os dados de uma solicitação foram recebidos. Haverá um ou mais eventos Receive Data.|
|Receive Response|  A resposta inicial em HTTP a uma solicitação.|
|Send Request|  Uma solicitação de rede foi enviada.|

### Propriedades do evento de carregamento

| Propriedade | Descrição |
|-------|:----------|
|Resource|O URL do recurso solicitado.|
|Preview|Prévia do recurso solicitado (somente imagens).|
|Request Method|Método HTTP usado para a solicitação (GET ou POST, por exemplo).|
|Status Code|Código da resposta em HTTP.|
|MIME Type|Tipo de MIME do recurso solicitado.|
|Encoded Data Length|Comprimento do recurso solicitado em bytes.|

## Eventos de script

Esta seção lista eventos que pertencem à categoria Scripting e suas propriedades.

| Evento | Descrição |
|-------|:----------|
|Animation Frame Fired| Um quadro de animação programado acionado e seu gerenciador de retorno de chamadas invocado.|
|Cancel Animation Frame|  Um quadro de animação programado foi cancelado.|
|GC Event|  Coleta de lixo realizada.|
|DOMContentLoaded|  O [DOMContentLoaded](https://docs.webplatform.org/wiki/dom/events/DOMContentLoaded) foi acionado pelo navegador. Este evento será acionado quando todo o conteúdo DOM da página for carregado e analisado.|
|Evaluate Script| Um script foi avaliado.|
|Event| Um evento JavaScript ("mousedown" ou "key", por exemplo).|
|Function Call| Uma chamada de função JavaScript de nível superior foi realizada (só aparece quando o navegador acessa o mecanismo JavaScript).|
|Install Timer| Um cronômetro foi criado com [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) ou [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout).|
|Request Animation Frame| Uma chamada de `requestAnimationFrame()` programou um novo quadro|
|Remove Timer|  Um cronômetro criado anteriormente foi excluído.|
|Time|  Um script chamou [console.time()](/web/tools/chrome-devtools/debug/console/console-reference#consoletimelabel)|
|Time End|  Um script chamou [console.timeEnd()](/web/tools/chrome-devtools/debug/console/console-reference#consoletimeendlabel)|
|Timer Fired| Um cronômetro disparado que foi programado com `setInterval()` ou `setTimeout()`.|
|XHR Ready State Change|  O estado de prontidão de uma XMLHTTPRequest alterada.|
|XHR Load|  Um carregamento finalizado de `XMLHTTPRequest`.|

### Propriedades do evento de scripts

| Propriedade | Descrição |
|-------|:----------|
|Timer ID|O ID do temporizador.|
|Timeout|O tempo limite especificado pelo temporizador.|
|Repeats|Booleano que especifica se o temporizador é repetido.|
|Function Call|Uma função que foi invocada.|

## Eventos de renderização

Esta seção lista eventos que pertencem à categoria Rendering e suas propriedades.

| Evento | Descrição |
|-------|:----------|
|Invalidate layout| O layout da página foi invalidado por uma alteração no DOM.|
|Layout|  O layout de uma página foi executado.|
|Recalculate style| O Chrome recalculou estilos dos elementos.|
|Scroll|  O conteúdo da vista aninhada foi rolado.|

### Propriedades do evento de renderização

| Propriedade | Descrição |
|-------|:----------|
|Layout invalidated|Para registros de Layout, o rastreamento de pilha do código que tornou o layout inválido.|
|Nodes that need layout|Para registros de Layout, o número dos nós que foram marcados como "precisa de layout" antes do início da criação do novo layout. Normalmente, esses são os nós que foram invalidados pelo código do desenvolvedor, mais um caminho ascendente para a raiz do novo layout.|
|Layout tree size|Para registros de Layout, o total de nós na raiz de novo layout (o nó que faz o Chrome iniciar a criação do novo layout).|
|Layout scope|Valores possíveis são "Partial" (O limite da criação do novo layout é uma parte do DOM) ou "Whole document".|
|Elements affected|Para registros de estilo de Recalculate, o número de elementos afetados por um novo cálculo de estilos.|
|Styles invalidated|Para registros de estilo de Recalculate, fornece o rastreamento de pilha do código que tornou o estilo inválido.|

## Eventos de coloração

Esta seção lista eventos que pertencem à categoria Painting e suas propriedades.

| Evento | Descrição |
|-------|:----------|
|Composite Layers|  O mecanismo de renderização do Chrome combinou camadas de imagem.|
|Image Decode|  Um recurso de imagem foi decodificado.|
|Image Resize|  Uma imagem foi redimensionada a partir de suas dimensões nativas.|
|Paint| Camadas combinadas foram coloridas para uma região da tela. Passar o cursor sobre o registro de Paint destaca a região da tela que foi atualizada.|

### Propriedades do evento de coloração

| Propriedade | Descrição |
|-------|:----------|
|Location|Para eventos de Paint, as coordenadas x e y do retângulo de coloração.|
|Dimensions|Para eventos de Paint, a altura e o comprimento da região colorida.|




{# wf_devsite_translation #}
