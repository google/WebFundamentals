project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “O manifesto contém theme_color”.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# O manifesto contém theme_color  {: .page-title }

## Por que a auditoria é importante {: #why }

Quando um usuário acessa seu aplicativo no  Google Chrome para Android, a propriedade `theme_color` do
manifesto do aplicativo da Web determina a cor da barra de endereço. Essa propriedade
é aplicada mesmo que o usuário não tenha adicionado o aplicativo à tela inicial.

## Como ser aprovado na auditoria {: #how }

Adicione uma propriedade `theme_color` no manifesto do seu aplicativo da Web. O valor pode ser qualquer cor
CSS válida.

    {
      ...
      "theme_color": "cornflowerblue",
      ...
    }

Confira [O manifesto existe](manifest-exists#how)
para obter uma lista de guias que ensinam você a implementar
e testar corretamente o suporte à adição na tela inicial em seu aplicativo.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

A auditoria será aprovada se o manifesto contiver uma propriedade `theme_color`.
O manifesto que o Lighthouse busca é separado do que o Chrome está
usando na página, que pode causar resultados imprecisos. O Lighthouse não
valida o valor da cor CSS.


{# wf_devsite_translation #}
