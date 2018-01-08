project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Site não usa document.write()".

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# Site não usa document.write() {: .page-title }

## Por que a auditoria é importante {: #why }

Para usuários em conexões lentas, como 2G, 3G ou Wi-Fi lento, scripts
externos injetados dinamicamente por meio de `document.write()` podem retardar a exibição de
conteúdo da página principal em dezenas de segundos.

Consulte [Intervir contra `document.write()`][blog] para saber mais.

[blog]: /web/updates/2016/08/removing-document-write

## Como ser aprovado na auditoria {: #how }

No seu relatório, o Lighthouse lista todas as chamadas para `document.write()`.
Examine essa lista e observe todas as chamadas que injetam dinamicamente um script.
Se o script cumprir os critérios descritos na introdução de
[Intervir contra `document.write()`][blog], o Chrome não executará o
script injetado. São essas chamadas para `document.write()` que você
deverá alterar. Consulte [Como faço para consertar isso?][fix] para ver as possíveis soluções. 

[fix]: /web/updates/2016/08/removing-document-write#how_do_i_fix_this

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse relata todas as instâncias de `document.write()` encontradas.
Observe que a intervenção do Chrome contra o `document.write()` se aplica apenas a
scripts bloqueadores de renderização injetados dinamicamente. Os outros usos de `document.write()`
podem ser aceitáveis.


{# wf_devsite_translation #}
