project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Site não usa console.time() em seus próprios scripts".

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# Site não usa console.time() em seus próprios scripts  {: .page-title }

## Por que a auditoria é importante {: #why }

Se você usar `console.time()` para medir o desempenho de uma página, em vez disso, considere
usar a User Timing API. Os benefícios incluem:

* Timestamps de alta resolução.
* Dados cronológicos exportáveis.
* Integração com o Timeline do Chrome DevTools. Quando a função
  `performance.measure()` da User Timing for chamada durante uma gravação do Timeline, o DevTools
  adicionará automaticamente a medição aos resultados do Timeline, como mostrado no
  rótulo `my custom measurement` na captura de tela a seguir.

![Medição da User Timing no Timeline do Chrome DevTools][timeline]

[timeline]: /web/tools/lighthouse/images/user-timing-measurement-in-devtools.png

## Como ser aprovado na auditoria {: #how }

No seu relatório, o Lighthouse lista todas as instâncias de `console.time()`
que encontrou em **URLs**. Substituta cada uma dessas chamadas por `performance.mark()`.
Se você quiser medir o tempo decorrido entre duas marcas, use
`performance.measure()`.

Consulte [User Timing API: como entender seu aplicativo Web][html5rocks]
para saber como usar a API.

[html5rocks]: https://www.html5rocks.com/en/tutorials/webperformance/usertiming/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse relata todas as instâncias de `console.time()` encontradas em
scripts no mesmo host da página. Os scripts de outros hosts são
excluídos, pois o Lighthouse assume que você não tem controle sobre
eles. Portanto, podem existir outros scripts que usam `console.time()` na página,
mas eles não serão exibidos no relatório do Lighthouse.


{# wf_devsite_translation #}
