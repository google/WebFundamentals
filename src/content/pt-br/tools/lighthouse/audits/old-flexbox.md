project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “Site não usa o Flexbox CSS antigo”.

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# Site não usa o Flexbox CSS antigo {: .page-title }

## Por que a auditoria é importante {: #why }

A especificação antiga de 2009 para o Flexbox tornou-se obsoleta e é 2,3 vezes mais lenta
do que a especificação mais recente. Consulte [O layout do Flexbox não é lento][slow] para saber
mais.

[lento]: https://developers.google.com/web/updates/2013/10/Flexbox-layout-isn-t-slow

## Como ser aprovado na auditoria {: #how }

Em **URLs**, o Lighthouse lista todas as instâncias de `display: box` encontradas
nas folhas de estilo da sua página. Substitua todas as instâncias pela nova sintaxe:
`display: flex`.

Se uma folha de estilo estiver usando `display: box`, ela poderá estar usando outras
propriedades obsoletas do Flexbox. Em poucas palavras, todas as propriedades iniciadas por `box`,
como `box-flex`, são obsoletas e devem ser substituídas. Consulte
[Mapeamento de propriedades da sintaxe da especificação de 2009/2011 do Flexbox CSS][map] para ver a equivalência exata
das propriedades antigas em relação às novas.

[mapa]: https://wiki.csswg.org/spec/flexbox-2009-2011-spec-property-mapping

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse coleta todas as folhas de estilo usadas na página e verifica se qualquer uma delas
usa `display: box`. O Lighthouse não verifica se as folhas de estilo usam
outras propriedades obsoletas.


{# wf_devsite_translation #}
