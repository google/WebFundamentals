project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “O manifesto contém ícones de pelo menos 192 pixels”.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# O manifesto contém ícones de pelo menos 192 pixels  {: .page-title }

## Por que a auditoria é importante {: #why }

Quando um usuário adiciona seu aplicativo à tela inicial, o dispositivo móvel precisa de um ícone para
exibir. Esse ícone é especificado na matriz `icons` no manifesto do aplicativo da Web.

A presença de um ícone de 192 pixels garante que seu ícone seja exibido corretamente nos
maiores dispositivos Android. Para dispositivos menores que precisam de ícones menores, o Android
pode reduzir o ícone de 192 pixels com uma precisão razoável. Em outras palavras,
apesar de você poder fornecer ícones menores no manifesto do seu aplicativo da Web, isso
não é necessário.

## Como ser aprovado na auditoria {: #how }

Adicione um ícone de 192 pixels no manifesto do aplicativo da Web.

    {
      ...
      "icons": [{
        "src": "images/homescreen192.png",
        "sizes": "192x192",
        "type": "image/png"
      }],
      ...
    }

Confira [O manifesto existe](manifest-exists#how)
para obter uma lista de guias que ensinam você a implementar
e testar corretamente o suporte à adição na tela inicial em seu aplicativo.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Esta auditoria só pode garantir que seu ícone seja corretamente exibido em dispositivos Android.
Outros sistemas operacionais podem exigir tamanhos de ícone diferentes para apresentação
ideal.

O Lighthouse busca o manifesto e verifica se a propriedade `icons` faz referência
a um ícone de 192 pixels. O manifesto que o Lighthouse busca é
separado do que o Chrome está usando na página, que pode
causar resultados imprecisos. Observe também que o Lighthouse não verifica se
o ícone realmente existe no cache. Ele apenas garante que o manifesto
do aplicativo da Web defina um ícone de 192 pixels.


{# wf_devsite_translation #}
