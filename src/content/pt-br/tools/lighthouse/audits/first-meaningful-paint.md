project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Primeira pintura significativa".

{# wf_updated_on: 2016-10-05 #}
{# wf_published_on: 2016-10-05 #}

# Primeira pintura significativa {: .page-title }

## Por que a auditoria é importante {: #why }

O carregamento da página é um aspecto fundamental de como o usuário observa o desempenho da sua
página. Consulte [Medição de desempenho com o método RAIL](/web/fundamentals/performance/rail) para obter mais informações.

Esta auditoria identifica o momento em que o usuário sente que o conteúdo
principal da página está visível.

## Como ser aprovado na auditoria {: #how }

Quanto menor for a pontuação de primeira pintura significativa, maior será a rapidez percebida
da exibição do conteúdo principal pela página.

A [otimização do caminho crítico de renderização](/web/fundamentals/performance/critical-rendering-path/)
é particularmente útil para acelerar a primeira pintura significativa.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

A primeira pintura significativa é essencialmente a pintura efetuada após a maior
alteração de layout da parte inicialmente visível da página inicial e o carregamento das fontes da Web. Consulte a
especificação para saber mais:
[Primeira pintura significativa: uma abordagem baseada em layout](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view).


{# wf_devsite_translation #}
