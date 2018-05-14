project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência da auditoria do Lighthouse “Tem um service worker registrado”.

{# wf_updated_on: 2016-07-25 #}
{# wf_published_on: 2016-07-25 #}

# Tem um service worker registrado {: .page-title }

## Por que a auditoria é importante {: #why }

Registrar um service worker é o primeiro passo para ativar
os seguintes recursos progressivos de aplicativos da Web:

* Off-line
* Notificações push
* Adicionar à tela inicial

## Como ser aprovado na auditoria {: #how }

Para registrar um service worker, é necessário apenas algumas linhas de código, mas o único
motivo para usar um service worker é implementar um dos recursos progressivos
de aplicativos da Web mencionados acima. Implementar esses recursos é mais
trabalhoso.

Para obter mais ajuda sobre como armazenar arquivos em cache para uso off-line, consulte a seção “Como ser aprovado na
auditoria” do seguinte documento do Lighthouse: [URL responde com 200 quando
off-line](http-200-when-offline#how).

Para ativar notificações push ou “adicionar à tela inicial”, execute os
seguintes tutorais passo a passo e use o que aprender para implementar
os recursos no seu próprio aplicativo:

* [Ativar notificações push para seu próprio aplicativo
 da Web](https://codelabs.developers.google.com/codelabs/push-notifications).
* [Adicionar seu aplicativo da Web à tela inicial
 de um usuário](https://codelabs.developers.google.com/codelabs/add-to-home-screen).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Verifica se o Chrome Debugger retorna uma versão de service worker.


{# wf_devsite_translation #}
