project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “A propriedade display do manifesto foi definida”.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# A propriedade display do manifesto foi definida  {: .page-title }

## Por que a auditoria é importante {: #why }

Quando seu aplicativo é iniciado da tela inicial, você pode usar a propriedade `display`
no manifesto do aplicativo da Web para especificar o modo de exibição do aplicativo.

## Como ser aprovado na auditoria {: #how }

Adicione uma propriedade `display` ao manifesto do aplicativo da Web e defina-a
com um dos seguintes valores: `fullscreen`, `standalone` ou `browser`.

    {
      ...
      "display": "fullscreen",
      ...
    }

Consulte a [referência do MDN para a propriedade
display](https://developer.mozilla.org/en-US/docs/Web/Manifest#display) para
saber mais sobre cada um desses valores.

Confira [O manifesto existe](manifest-exists#how)
para obter uma lista de guias que ensinam você a implementar
e testar corretamente o suporte à adição na tela inicial em seu aplicativo.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse busca o manifesto e verifica se a propriedade `display` existe
e se seu valor é `fullscreen`, `standalone` ou `browser`.

O manifesto que o Lighthouse busca é separado do que o Chrome
está usando na página, que pode causar resultados imprecisos.


{# wf_devsite_translation #}
