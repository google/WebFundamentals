project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “O manifesto contém background_color”.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# O manifesto contém background_color  {: .page-title }

## Por que a auditoria é importante {: #why }

Quando seu aplicativo da Web é carregado da tela inicial de um usuário, o navegador usa a propriedade
`background_color` para renderizar a cor de fundo do navegador enquanto o
aplicativo é carregado. Isso cria uma transição uniforme entre a inicialização do aplicativo e o
carregamento do seu conteúdo.

## Como ser aprovado na auditoria {: #how }

Adicione uma propriedade `background_color` no manifesto do seu aplicativo da Web. O valor pode ser qualquer cor
CSS válida.

    {
      ...
      "background_color": "cornflowerblue",
      ...
    }

Confira [O manifesto existe](manifest-exists#how)
para obter uma lista de guias que ensinam você a implementar
e testar corretamente o suporte à adição na tela inicial em seu aplicativo.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

A auditoria será aprovada se o manifesto contiver uma propriedade `background_color`.
O manifesto que o Lighthouse busca é separado do que o Chrome está
usando na página, que pode causar resultados imprecisos. O Lighthouse não
valida o valor da cor CSS.


{# wf_devsite_translation #}
