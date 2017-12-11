project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Site usa HTTP/2 para seus próprios recursos".

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# Site usa HTTP/2 para seus próprios recursos  {: .page-title }

## Por que a auditoria é importante {: #why }

O HTTP/2 pode entregar os recursos da página com mais rapidez e menos dados percorrendo a
rede.

Consulte [Perguntas frequentes sobre o HTTP/2][faq] para ver uma lista dos benefícios oferecidos pelo HTTP/2
em relação ao HTTP/1.1.

Consulte [Introdução ao HTTP/2][intro] para obter uma visão geral técnica detalhada.

[faq]: https://http2.github.io/faq/
[introdução]: /web/fundamentals/performance/http2/

## Como ser aprovado na auditoria {: #how }

Em **URLs**, o Lighthouse lista todos os recursos não entregues por meio do HTTP/2.
Para ser aprovado nesta auditoria, entregue todos esses recursos por meio do HTTP/2.

Para saber como ativar o HTTP/2 nos servidores, consulte [Configurar o HTTP/2][setup].

[setup]: https://dassur.ma/things/h2setup/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse coleta dos os recursos que são do mesmo host que a
página e verifica a versão do protocolo HTTP para cada recurso.

O Lighthouse exclui recursos de outros hosts dessa auditoria porque
supõe que você não tem controle sobre como esses recursos são entregues.


{# wf_devsite_translation #}
