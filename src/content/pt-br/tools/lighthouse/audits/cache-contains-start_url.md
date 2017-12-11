project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Cache contém start_url do manifesto".

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

# Cache contém start_url do manifesto  {: .page-title }

## Por que a auditoria é importante {: #why }

Garante que um Progressive Web App seja iniciado corretamente em uma tela inicial
de dispositivo móvel off-line.

## Como ser aprovado na auditoria {: #how }

1. Defina uma propriedade' `start_url` no arquivo `manifest.json`.
2. Verifique se o service worker armazena corretamente em cache um recurso correspondente
   ao valor de `start_url`.

Para aprender os conceitos básicos da adição de aplicativos a telas iniciais,
consulte [Adicionar seu aplicativo da Web à tela inicial
de um usuário](https://codelabs.developers.google.com/codelabs/add-to-home-screen).
Esse é um codelab detalhado e prático, onde você adiciona a funcionalidade "adicionar à
tela inicial" a um aplicativo existente. Use o que você aprendeu neste
codelab para integrar a funcionalidade "adicionar à tela inicial" a seu próprio aplicativo.

Para obter mais ajuda sobre como armazenar arquivos em cache com service workers para uso off-line, consulte
a seção "Como ser aprovado na auditoria" do seguinte documento do Lighthouse:
[URL responde com 200 quando off-line](http-200-when-offline#how)

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Quando um Progressive Web App é inicializado na tela inicial de um dispositivo
móvel, o aplicativo abre em um URL específico. Esse URL é definido no arquivo
`manifest.json` do manifesto como a propriedade `start_url`.

Esta auditoria analisa o valor de `start_url` do `manifest.json` e
garante que um recurso correspondente esteja armazenado no cache do service worker.

**Se o service worker redirecionar solicitações de** `start_url` **, essa auditoria
poderá gerar resultados imprecisos**.

Uma limitação dessa auditoria é a inspeção direta do conteúdo do
cache, em vez de solicitar ao service worker que resolva a solicitação `start_url`.
 Isso poderá gerar um resultado com falso negativo se o cache não tiver
um recurso correspondente ao valor exato de `start_url`, embora em
cenários reais a solicitação seja resolvida corretamente porque o service
worker redireciona para outro recurso no cache. Inversamente, a auditoria poderá
gerar um resultado com falso positivo se o cache tiver um recurso
correspondente a `start_url`, mas o service worker redirecionar a solicitação para
um recurso inexistente.


{# wf_devsite_translation #}
