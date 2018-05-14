project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Site não usa Date.now() em seus próprios scripts".

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# Site não usa Date.now() em seus próprios scripts  {: .page-title }

## Por que a auditoria é importante {: #why }

Se você usar `Date.now()` para medir tempo, em vez disso, considere usar
`performance.now()`. O `performance.now()` oferece uma resolução maior de
timestamp e é sempre incrementado a uma taxa constante, independentemente
do relógio do sistema, que pode ser ajustado ou distorcido manualmente.

## Como ser aprovado na auditoria {: #how }

No seu relatório, o Lighthouse lista todas as instâncias de `Date.now()`
que encontrou em **URLs**. Substitua todas essas chamadas por `performance.now()`.

Consulte [`performance.now()`][MDN] para obter mais informações sobre a API.

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse relata todas as instâncias de `Date.now()` encontradas em
scripts no mesmo host da página. Os scripts de outros hosts são
excluídos, pois o Lighthouse assume que você não tem controle sobre
eles. Portanto, podem existir outros scripts que usam `Date.now()` na página,
mas eles não serão exibidos no relatório do Lighthouse.


{# wf_devsite_translation #}
