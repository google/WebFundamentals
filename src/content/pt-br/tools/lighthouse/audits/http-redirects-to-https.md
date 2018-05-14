project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Site redireciona tráfego HTTP para HTTPS".

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# Site redireciona tráfego HTTP para HTTPS  {: .page-title }

## Por que a auditoria é importante {: #why }

Todos os sites devem ser protegidos com HTTPS. Veja este documento do Lighthouse para
saber porque: [Site está em HTTPS](https).

Depois de configurar o HTTPS, você precisa assegurar que todo o tráfego HTTP
não seguro seja redirecionado ao HTTPS.

## Como ser aprovado na auditoria {: #how }

1. Use links canônicos no `head` do HTML para ajudar os mecanismos de pesquisa a descobrir
   a melhor forma de chegar à página.

       <link rel="canonical" href="https://example.com"/>

2. Configure o servidor para redirecionar tráfego HTTP ao HTTPS. Consulte a documentação
   do servidor para descobrir a melhor maneira de fazer isso.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse altera o URL da página para `http`, carrega a página e aguarda o
evento do Chrome Debugger que indica que a página é segura. Se o
Lighthouse não receber o evento em 10 segundos, a auditoria será reprovada.


{# wf_devsite_translation #}
