project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “O manifesto contém name”.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# O manifesto contém name  {: .page-title }

## Por que a auditoria é importante {: #why }

A propriedade `name` do manifesto do aplicativo da Web é um nome legível do seu
aplicativo que deve ser exibido no dispositivo móvel do usuário.

Se um `short_name` não for fornecido, o `name` será o rótulo usado
na tela inicial do dispositivo móvel abaixo do ícone do seu aplicativo.

## Como ser aprovado na auditoria {: #how }

Adicione uma propriedade `name` no manifesto do seu aplicativo da Web.

    {
      ...
      "name": "Air Horner",
      ...
    }

O [tamanho
máximo](https://developer.chrome.com/apps/manifest/name) permitido pelo Chrome é 45 caracteres.

Confira [O manifesto existe](manifest-exists#how)
para obter uma lista de guias que ensinam você a implementar
e testar corretamente o suporte à adição na tela inicial em seu aplicativo.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse busca o manifesto e verifica se ele tem uma propriedade `name`.
O manifesto que o Lighthouse busca é separado do que o Chrome está
usando na página, que pode causar resultados imprecisos.


{# wf_devsite_translation #}
