---
title: "Como medir o caminho de processamento essencial com o tempo de navegação"
description: "Não é possível otimizar o que não é possível medir. Felizmente, a API de tempo de navegação oferece todas as ferramentas necessárias para medir cada etapa do caminho de processamento essencial."
updated_on: 2014-09-18
key-takeaways:
  measure-crp:
    - O tempo de navegação oferece carimbos de data e hora de alta resolução para medir o CRP.
    - O navegador emite uma série de eventos consumíveis que capturam várias etapas do CRP.
---
<p class="intro">
  Não é possível otimizar o que você não pode medir. Felizmente, a API de tempo de navegação oferece todas as ferramentas necessárias para medir cada etapa do caminho de processamento essencial.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.measure-crp %}

A base de toda estratégia de desempenho sólida é a boa medição e instrumentação. E isso é exatamente o que a API de tempo de navegação oferece.

<img src="images/dom-navtiming.png" class="center" alt="Tempo de navegação">

Cada rótulo do diagrama acima corresponde a um carimbo de data e hora de alta resolução. Na verdade, nesse caso específico, estamos mostrando apenas uma fração de todos os carimbos de data e hora diferentes &mdash; no momento ignoraremos todos os carimbos de data e hora relacionados à rede, mas voltaremos a eles em outra aula.

Então, o que esses carimbos de data e hora significam?

* **domLoading:** este é o primeiro carimbo de data e hora de todo o processo, quando o navegador está prestes a começar a analisar os primeiros bytes recebidos do documento
  HTML.
* **domInteractive:** marca o ponto em que o navegador termina de analisar todo o HTML e a construção do DOM é concluída.
* **domContentLoaded:** marca o ponto em que o DOM está pronto e não há folhas de estilo bloqueando a execução de JavaScript - o que significa que é possível construir a árvore de renderização.
    * Muitas estruturas de JavaScript esperam esse evento para começar a executar a própria lógica. Por isso, o navegador captura os carimbos de data e hora _EventStart_ e _EventEnd_ para permitir o rastreamento da duração da execução.
* **domComplete:** como o nome já diz, todo o processamento foi concluído e todos os recursos da página (imagens etc.) foram transferidos: por exemplo, a roda que indica que a página está carregando já parou de girar.
* **loadEvent:** como etapa final de todo carregamento de página, o navegador aciona um evento `onload`, que pode acionar mais lógicas de aplicativos.

A especificação de HTML determina as condições específicas de cada evento: quando ele deve ser acionado, que condições devem ser atendidas e assim por diante. Para nossa finalidade, nosso foco será algumas etapas relacionadas ao caminho de processamento essencial:

* **domInteractive** marca quando o DOM está pronto.
* **domContentLoaded** normalmente marca quando [o DOM e o CSSOM estão prontos](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/).
    * Se não houver analisadores bloqueando JavaScript , o _DOMContentLoaded_ será acionado logo depois de _domInteractive_.
* **domComplete** marca quando a página e todos os sub-recursos estão prontos.

^

{% include_code src=_code/measure_crp.html snippet=full lang=html %}

O exemplo acima pode parecer intimidante à primeira vista, mas na verdade ele é bastante simples. A API de tempo de navegação captura todos os carimbos de data e hora relevantes, e nosso código simplesmente espera que o evento `onload` seja acionado &mdash; lembre que o evento onload é acionado depois de domInteractive, domContentLoaded e domComplete &mdash; e computa a diferença entre os diferentes carimbos de data e hora.
<img src="images/device-navtiming-small.png" class="center" alt="Demonstração do tempo de navegação">

Depois de tudo isso, temos algumas etapas específicas para acompanhar e uma função simples para produzir essas medidas. Em vez de imprimir essas medidas na página, também é possível modificar o código para enviá-las a um servidor de análises lógicas ([O Google Analytics faz isso automaticamente](https://support.google.com/analytics/answer/1205784?hl=pt-BR)), uma ótima maneira de acompanhar o desempenho das suas páginas e identificar páginas que podem se beneficiar com um pouco de otimização.



