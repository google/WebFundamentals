project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Conheça os principais fatores na otimização do caminho crítico de renderização.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Otimização do caminho crítico de renderização {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


  Para obter a maior rapidez possível na primeira renderização, precisamos 
  minimizar três variáveis:

  <ul>
    <li>O número de recursos críticos.</li>
    <li>O tamanho do caminho crítico.</li>
    <li>O número de bytes críticos.</li>
  </ul>

Um recurso crítico é aquele que pode bloquear a renderização inicial da página. Quanto menos desses recursos houver, menor será o trabalho do navegador, do CPU e de outros componentes.

De modo parecido, o tamanho do caminho crítico é uma função do gráfico de dependências entre os recursos críticos e seu tamanho em bytes: alguns downloads de recursos só podem ser iniciados depois que um recurso anterior já tiver sido processado, e quanto maior o recurso, mais idas e voltas são necessárias para baixá-lo.

Por fim, quanto menos bytes críticos o navegador precisar baixar, mais rápido poderá processar conteúdo e renderizá-lo na tela. Para reduzir o número de bytes, podemos diminuir o número de recursos (eliminá-los ou torná-los não críticos) e assegurar a redução do tamanho da transferência compactando e otimizando cada recurso.

**A sequência geral de etapas para otimizar o caminho crítico de renderização é:**

1. Analisar e caracterizar o caminho crítico: número de recursos, bytes e tamanho.
1. Minimizar o número de recursos críticos: eliminá-los, adiar o download, marcá-los como assíncronos etc.
1. Otimizar o número de bytes críticos para reduzir o tempo de download (número de idas e voltas).
1. Otimizar a ordem de carregamento dos recursos críticos restantes: baixar todos os ativos críticos o quanto antes para reduzir o tamanho do caminho crítico.

<a href="page-speed-rules-and-recommendations" class="gc-analytics-event"
    data-category="CRP" data-label="Next / PageSpeed">
  <button>A seguir: Regras e recomendações para o PageSpeed</button>
</a>


{# wf_devsite_translation #}
