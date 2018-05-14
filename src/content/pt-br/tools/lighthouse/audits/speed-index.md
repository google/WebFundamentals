project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência da auditoria do Lighthouse "Índice de velocidade".

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Índice de velocidade  {: .page-title }

## Por que a auditoria é importante {: #why }

Índice de velocidade é uma métrica de desempenho de carregamento de páginas que indica a rapidez
com que o conteúdo de uma página é exibido. Quanto menor a pontuação, melhor.

## Como ser aprovado na auditoria {: #how }

Para diminuir sua pontuação no Índice de velocidade, é necessário otimizar a página para carregar visualmente
mais rápido. As duas fontes a seguir têm informações úteis para você começar:

* [Otimização da eficiência do conteúdo](/web/fundamentals/performance/optimizing-content-efficiency/).
* [Otimização do caminho crítico de renderização](/web/fundamentals/performance/critical-rendering-path/).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse usa um módulo de nó chamado
[Speedline](https://github.com/pmdartus/speedline)
para gerar a pontuação do Índice de velocidade.

Para obter mais informações sobre os algoritmos e metodologias relacionados ao Índice de velocidade,
consulte [Índice de velocidade](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index).

A pontuação-alvo é calculada por uma função de distribuição acumulada de uma distribuição
log-normal. Confira os comentários na
[fonte](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/speed-index-metric.js)
da auditoria caso queira saber mais.


{# wf_devsite_translation #}
