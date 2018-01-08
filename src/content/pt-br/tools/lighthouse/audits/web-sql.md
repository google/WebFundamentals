project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Site não usa Web SQL".

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# Site não usa Web SQL  {: .page-title }

## Por que a auditoria é importante {: #why }

O Web SQL está obsoleto. Consulte o [Database Web SQL][spec] para saber mais.

[spec]: https://www.w3.org/TR/webdatabase/

## Como ser aprovado na auditoria {: #how }

Considere substituir o database Web SQL por uma solução mais moderna, como o
[IndexedDB][indexeddb].

Acesse [Web Storage Overview][overview] para ver uma discussão de outras opções de armazenamento
disponíveis.

[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[visão geral]: /web/fundamentals/instant-and-offline/web-storage/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse verifica se a página tem uma instância do database Web SQL.


{# wf_devsite_translation #}
