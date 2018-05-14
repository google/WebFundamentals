project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência da auditoria do Lighthouse "Marcações e medições da User Timing".

{# wf_updated_on: 2016-10-06 #}
{# wf_published_on: 2016-10-06 #}

# Marcações e medições da User Timing  {: .page-title }

## Por que a auditoria é importante {: #why }

A API User Timing permite medir o desempenho em JavaScript do seu aplicativo.
O propósito básico é permitir que você dedica quais partes dos scripts pretende
otimizar e instrumentá-las com a API User
Timing. Depois disso, é possível acessar os resultados do JavaScript usando a
API ou vê-los pelas [Chrome DevTools Timeline
Recordings](/web/tools/chrome-devtools/evaluate-performance/timeline-tool).

## Como ser aprovado na auditoria {: #how }

Esta auditoria não é estruturada com base em um teste de aprovação ou reprovação. Ela simplesmente representa
uma oportunidade de descobrir uma API útil que pode ajudá-lo a medir o desempenho do seu
aplicativo. A pontuação que o Lighthouse determina nesta auditoria corresponde ao
número de marcações de medições da User Timing encontrados no aplicativo.

Se seu aplicativo contiver marcações e medições da User Timing, esses parâmetros
serão indicados no relatório do Lighthouse.

Acesse [API User Timing](https://www.html5rocks.com/en/tutorials/webperformance/usertiming/)
para ver uma introdução sobre como usar a API User Timing para medir o desempenho do seu aplicativo em
JavaScript.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse extrai os dados da User Timing pela Trace Event Profiling Tool do Chrome.


{# wf_devsite_translation #}
