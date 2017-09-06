project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “O manifesto contém short_name”.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# O manifesto contém short_name  {: .page-title }

## Por que a auditoria é importante {: #why }

Depois que um usuário adiciona seu aplicativo à tela inicial, o `short_name` é o texto
exibido na tela inicial abaixo do ícone do aplicativo. Em geral, ele é usado
sempre que há espaço insuficiente para exibir o nome completo do aplicativo.

## Como ser aprovado na auditoria {: #how }

Adicione uma propriedade `short_name` no manifesto do seu aplicativo da Web.

    {
      ...
      "short_name": "Air Horner",
      ...
    }

O [tamanho
máximo recomendado](https://developer.chrome.com/apps/manifest/name#short_name) pelo Chrome é 12
caracteres.

Confira [O manifesto existe](manifest-exists#how)
para obter uma lista de guias que ensinam você a implementar
e testar corretamente o suporte à adição na tela inicial em seu aplicativo.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

A auditoria será aprovada se o manifesto contiver uma propriedade `short_name` ou `name`.
O manifesto que o Lighthouse busca é separado do que o Chrome está
usando na página, que pode causar resultados imprecisos.


{# wf_devsite_translation #}
