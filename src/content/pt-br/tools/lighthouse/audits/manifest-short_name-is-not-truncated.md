project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência da auditoria do Lighthouse “A propriedade short_name do manifesto não ficará truncada ao ser exibida na tela inicial”.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# A propriedade short_name do manifesto não ficará truncada ao ser exibida na tela inicial {: .page-title }

## Por que a auditoria é importante {: #why }

Quando um usuário adiciona seu aplicativo da Web à tela inicial, a propriedade `short_name` é
exibida como o rótulo abaixo do ícone do aplicativo. Se `short_name` tiver mais
de 12 caracteres, ela ficará truncada na tela inicial.

Observe que, se `short_name` não estiver presente, o Chrome poderá utilizar a propriedade
`name` se ela for curta o bastante.

## Como ser aprovado na auditoria {: #how }

Garanta que o valor da propriedade `short_name` no manifesto do seu aplicativo da Web tenha menos de 12 caracteres.

    {
      ...
      "short_name": "Air Horner",
      ...
    }

Ou, caso você não especifique uma propriedade `short_name` no manifesto, o valor da propriedade
`name` deverá ter menos de 12 caracteres.

Confira [O manifesto existe](manifest-exists#how)
para obter uma lista de guias que ensinam você a implementar
e testar corretamente o suporte à adição na tela inicial em seu aplicativo.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse busca o manifesto e verifica se o valor da propriedade `short_name` tem
menos de 12 caracteres. Observe que, como a propriedade `name` pode ser usada
no lugar de `short_name`, o Lighthouse também a testa como substituta.
Portanto, se você não incluir a propriedade `short_name` no manifesto, mas o valor de `name` tiver
menos de 12 caracteres, a auditoria será aprovada. O manifesto que o Lighthouse
busca é separado do que o Chrome está usando na página, que pode
causar resultados imprecisos.


{# wf_devsite_translation #}
