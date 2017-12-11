project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “Site abre âncoras externas usando rel="noopener"”.

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# Site abre âncoras externas usando rel="noopener" {: .page-title }

## Por que a auditoria é importante {: #why }

Quando sua página é vinculada a outra página usando `target="_blank"`, a nova página
é executada no mesmo processo que a sua. Se essa nova página executar
JavaScript expansivo, o desempenho da sua página também poderá ser degradado.

Além disso, `target="_blank"` também é uma vulnerabilidade de segurança. A nova página
tem acesso ao seu objeto window via `window.opener` e pode navegar
da sua página para um URL diferente usando `window.opener.location = newURL`.

Consulte [Os benefícios de desempenho de rel=noopener][jake] para saber mais.

[jake]: https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/

## Como ser aprovado na auditoria {: #how }

Adicione `rel="noopener"` em cada link que o Lighthouse identificar em seu
relatório. De forma geral, sempre adicione `rel="noopener"` quando abrir um link externo
em uma nova janela ou guia.

    <a href="https://examplepetstore.com" target="_blank" rel="noopener">...</a>

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse usa o seguinte algoritmo para sinalizar links como candidatos para `rel="noopener"`
:

1. Reunir todos os nós `<a>` que contêm o atributo `target="_blank"` e que não
 contêm o atributo `rel="noopener"`.
2. Remover dos filtros qualquer link que tenha o mesmo host.

Como o Lighthouse remove dos filtros links que têm o mesmo host, há uma exceção que você deve
considerar ao trabalhar em um site de grande porte. Se sua página abrir
um link para outra seção do seu site sem usar `rel="noopener"`, as
implicações de desempenho dessa auditoria ainda serão aplicáveis. Entretanto, você não verá esses
links nos resultados do Lighthouse.


{# wf_devsite_translation #}
