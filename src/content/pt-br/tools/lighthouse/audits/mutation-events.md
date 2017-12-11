project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “O site não usa eventos de mutação em seus próprios scripts”.

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# O site não usa eventos de mutação em seus próprios scripts  {: .page-title }

## Por que a auditoria é importante {: #why }

Os eventos de mutação a seguir podem prejudicar o desempenho e se tornaram obsoletos nas
especificações de eventos do DOM:

* `DOMAttrModified`
* `DOMAttributeNameChanged`
* `DOMCharacterDataModified`
* `DOMElementNameChanged`
* `DOMNodeInserted`
* `DOMNodeInsertedIntoDocument`
* `DOMNodeRemoved`
* `DOMNodeRemovedFromDocument`
* `DOMSubtreeModified`

## Como ser aprovado na auditoria {: #how }

Em **URLs**, o Lighthouse reporta cada detector de evento de mutação encontrado
no seu código. Substitua esses eventos de mutação por um `MutationObserver`.
Consulte [`MutationObserver`][mdn] no MDN para obter mais ajuda.

[mdn]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse coleta todos os detectores de evento na página e sinaliza
qualquer um que use um dos tipos listados em [Por que a auditoria é
importante](#why).


{# wf_devsite_translation #}
