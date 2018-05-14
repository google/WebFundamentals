project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “O manifesto contém start_url”.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# O manifesto contém start_url  {: .page-title }

## Por que a auditoria é importante {: #why }

Depois que seu aplicativo da Web é adicionado à tela inicial de um usuário, a propriedade `start_url`
no manifesto do aplicativo da Web determina qual página do aplicativo é carregada primeiro
quando o usuário o inicializa da tela inicial.

Se a propriedade `start_url` não estiver presente, o navegador assume como padrão a
página que estava ativa quando o usuário decidiu adicionar o aplicativo à tela inicial.

## Como ser aprovado na auditoria {: #how }

Adicione uma propriedade `start_url` no manifesto do seu aplicativo da Web.

    {
      ...
      "start_url": ".",
      ...
    }

Confira [O manifesto existe](manifest-exists#how)
para obter uma lista de guias que ensinam você a implementar
e testar corretamente o suporte à adição na tela inicial em seu aplicativo.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse busca o manifesto e verifica se ele tem uma propriedade `start_url`.
O manifesto que o Lighthouse busca é separado do que o Chrome está
usando na página, que pode causar resultados imprecisos.


{# wf_devsite_translation #}
