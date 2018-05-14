project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprenda a medir o caminho crítico de renderização.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Medição do caminho crítico de renderização {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Toda estratégia de desempenho sólida precisa de uma boa medição e uma boa
instrumentação. Não é possível otimizar o que não pode ser medido. Esse documento
explica diferentes abordagens para medir o desempenho do CRP.

* A abordagem do Lighthouse executa uma série de testes automatizados em uma página
  e gera um relatório sobre o desempenho do CRP da página. Essa abordagem
  oferece um resumo rápido, fácil e abrangente do desempenho do CRP de
  determinada página carregada no seu navegador, permitindo testar,
  iterar e melhorar seu desempenho rapidamente.
* A abordagem da Navigation Timing API
  captura as métricas de [monitoramento
  real do usuário (RUM)](https://en.wikipedia.org/wiki/Real_user_monitoring). Como diz o nome, essas métricas são capturadas das interações reais
  do usuário com o site e fornece uma visão precisa do
  desempenho do CRP no mundo real, da forma com que seus usuários o encaram em diversos
  dispositivos e condições de rede.

Em geral, uma boa abordagem é usar o Lighthouse para identificar oportunidades óbvias de otimização do
CRP e, em seguida, instrumentar seu código com a
Navigation Timing API para monitorar como o seu aplicativo se sai no mundo real.

## Auditar uma página com o Lighthouse {: #lighthouse }

O Lighthouse é uma ferramenta de auditoria de aplicativos web que executa uma série de testes em uma
determinada página e exibe os resultados em um relatório consolidado. Você
pode executar o Lighthouse como uma extensão do Chrome ou um módulo do NPM, o que é
útil para integrar o Lighthouse a sistemas de integração contínua.

Acesse [Auditar apps da web com o Lighthouse](/web/tools/lighthouse/) para começar a usá-lo.

Quando se executa o Lighthouse como uma extensão do Chrome, os resultados do CRP da sua página
ficam mais ou menos como na imagem abaixo.

![Auditorias de CRP do Lighthouse](images/lighthouse-crp.png)

Acesse [Cadeias de solicitação críticas][crc] para obter mais informações sobre os resultados
dessa auditoria.

[crc]: /web/tools/lighthouse/audits/critical-request-chains

## Instrumentar o seu código com a Navigation Timing API {: #navigation-timing }

A combinação da Navigation Timing API e de outros eventos de navegador emitidos
durante o carregamento da página permite que você capture e registre o desempenho
do CRP de qualquer página no mundo real.

<img src="images/dom-navtiming.png"  alt="Navigation Timing">

Cada um dos rótulos no diagrama acima corresponde a uma marcação de data e hora de alta resolução rastreado pelo navegador para cada página carregada. Na verdade, neste caso específico, mostramos apenas uma fração de todas as marcações de data e hora diferentes &mdash; por enquanto, estamos ignorando todas as marcações de data e hora relacionadas à rede, mas voltaremos a elas em uma lição futura.

O que essas marcações de data e hora significam?

* `domLoading`: a marcação de data e hora inicial de todo o processo; o
  navegador está prestes a iniciar a análise dos primeiros bytes recebidos do documento
  HTML.
* `domInteractive`: marca o ponto em que o navegador concluiu a análise de todo
  o HTML e a construção do DOM.
* `domContentLoaded`: marca o ponto em que o DOM está pronto e nenhuma folha de estilo bloqueia a execução do JavaScript; isso significa que agora já podemos (possivelmente) construir a árvore de renderização.
    * Muitos frameworks JavaScript aguardam esse evento antes de executar sua própria lógica. Por isso, o navegador captura as marcações de data e hora `EventStart` e `EventEnd` para permitir rastrear a duração dessa execução.
* `domComplete`: como diz o nome, todo o processamento foi concluído e
  todos os recursos da página (imagens, etc.) foram baixados.
  Ou seja, o ícone de carregamento parou de girar.
* `loadEvent`: como etapa final em toda carga de página, o navegador aciona um
  evento `onload`, que pode acionar outras lógicas de aplicativos.

A especificação do HTML estabelece condições específicas para cada evento: quando deve ser acionado, quais condições devem ser cumpridas e assim por diante. Para as nossas finalidades, vamos nos concentrar em alguns marcos importantes relacionados ao caminho crítico de renderização:

* `domInteractive` marca quando o DOM está pronto.
* `domContentLoaded` normalmente marca quando [o DOM e o CSSOM estão prontos](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/).
    * Se nenhum analisador estiver bloqueando o JavaScript, `DOMContentLoaded` será acionado imediatamente após `domInteractive`.
* `domComplete` marca quando a página e todos seus subrecursos estão prontos.


<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp.html){: target="_blank" .external }

O exemplo acima pode parecer um tanto assustador, mas na verdade é bastante simples. O Navigation Timing API captura todas as marcações de data e hora relevantes e o nosso código simplesmente aguarda o acionamento do evento `onload` &mdash; lembre-se de que o evento `onload` é acionado após `domInteractive`, `domContentLoaded` e `domComplete` &mdash; e calcula a diferença entre as diversas marcações de data e hora.

<img src="images/device-navtiming-small.png"  alt="demonstração do NavTiming">

Considerando tudo isso, temos agora alguns marcos específicos para rastrear e uma função simples para gerar essas medidas. Observe que, em vez de imprimir essas métricas na página, você também pode modificar o código para enviá-las a um servidor de análises ([o Google Analytics faz isso automaticamente](https://support.google.com/analytics/answer/1205784)), o que é uma ótima maneira de acompanhar o desempenho das páginas e identificar páginas candidatas a aprimoramento com algum trabalho de otimização.

## E o DevTools? {: #devtools }

Embora, às vezes, esses documentos usem o painel "Network" do Chrome DevTools para
ilustrar conceitos de CRP, o DevTools atualmente não está adaptado a medições
de CRP porque não tem um mecanismo embutido de isolamento
de recursos críticos. Execute uma auditoria com o [Lighthouse](#lighthouse) para obter ajuda
para identificar esses recursos.

<a href="analyzing-crp" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Analyzing CRP">
  <button>A seguir: Análise do desempenho do caminho crítico de renderização</button>
</a>


{# wf_devsite_translation #}
