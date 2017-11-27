project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "URL responde com 200 quando off-line".

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

# URL responde com 200 quando off-line {: .page-title }

## Por que a auditoria é importante {: #why }

Os Progressive Web Apps funcionam off-line. Se o Lighthouse não receber uma resposta
HTTP 200 ao acessar uma página enquanto está off-line, essa página não poderá ser acessada
off-line.

## Como ser aprovado na auditoria {: #how }

1. Adicione um service worker ao aplicativo.
2. Use o service worker para armazenar localmente os arquivos em cache.
3. Quando off-line, use o service worker como proxy de rede para retornar a
   versão do arquivo armazenada localmente em cache.

Para saber como adicionar um service worker a um aplicativo existente, consulte [Adicionar um service
worker e off-line ao seu app da
Web](https://codelabs.developers.google.com/codelabs/offline). Use o que você
aprendeu neste codelab detalhado e prático para saber como adicionar um service
worker ao seu próprio aplicativo. Isso cobre as etapas 1 e 3 acima.

O codelab acima mostra alguns conceitos básicos sobre como depurar um service worker
usando o Chrome DevTools. Para obter uma ajuda mais detalhada, consulte o codelab dedicado a
este tópico: [Depurar service
workers](https://codelabs.developers.google.com/codelabs/debugging-service-workers).

Use o [Offline Cookbook](https://jakearchibald.com/2014/offline-cookbook/) para
determinar qual estratégia de armazenamento em cache é a mais adequada ao aplicativo. Isso cobre a etapas 2 acima.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse emula uma conexão off-line usando o Chrome Debugging Protocol
e tenta recuperar a página usando `XMLHttpRequest`.


{# wf_devsite_translation #}
