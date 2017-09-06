project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “O manifesto existe”.

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# O manifesto existe  {: .page-title }

## Por que a auditoria é importante {: #why }

O manifesto do aplicativo da Web é a tecnologia Web que permite que você adicione seu aplicativo
à tela inicial de um usuário. Esse recurso é frequentemente chamado de “Adicionar à
tela inicial (A2HS)”.

## Como ser aprovado na auditoria {: #how }

Para obter um guia passo a passo prático de como adicionar suporte a A2HS em um
aplicativo existente, confira o seguinte codelab: [Adicionar seu aplicativo da Web à
tela inicial de um usuário](https://codelabs.developers.google.com/codelabs/add-to-home-screen).

Para obter um guia mais informal e mais aprofundado sobre os manifestos
de aplicativos da Web, consulte [Melhorar as experiências da Web com um manifesto
de aplicativo da Web](/web/fundamentals/engage-and-retain/web-app-manifest).

Use as informações obtidas nesses guias para adicionar suporte a A2HS em seu
próprio aplicativo da Web.

É possível emular e testar eventos de A2HS no Chrome DevTools. Consulte a seguinte
seção para obter mais ajuda: [Manifesto do
aplicativo da Web](/web/tools/chrome-devtools/debug/progressive-web-apps/#manifest).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse busca o manifesto e verifica se ele contém dados. O manifesto que o
Lighthouse busca é separado do que o Chrome está usando na página, que pode
causar resultados imprecisos.


{# wf_devsite_translation #}
