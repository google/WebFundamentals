project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Use o Security Panel para garantir que todos os recursos do seu site sejam protegidos por HTTPS.

{# wf_updated_on: 2016-03-09 #}
{# wf_published_on: 2015-12-21 #}

# [Entendendo problemas de segurança] {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

HTTPS fornece [segurança crítica e integridade de dados][why-https] 
para seus sites e as pessoas que confiam informações pessoais
a seus sites. Use o Security Panel no Chrome DevTools 
para depurar problemas de segurança e confirmar se você implementou HTTPS 
corretamente nos sites.


### TL;DR {: .hide-from-toc }
- Use a Security Overview para descobrir imediatamente se a página atual é ou não segura.
- Inspecione origens individuais para visualizar detalhes de conexão e certificado (para origens seguras) ou para descobrir exatamente quais solicitações não estão protegidas (para origens não seguras).


## Security Overview

Para visualizar a segurança geral de uma página, abra o DevTools e acesse o 
Security Panel. 

A primeira coisa que você verá é a Security Overview. Instantaneamente, a 
Security Overview mostra que página está segura. Páginas seguras são 
identificadas com a mensagem `This page is secure (valid HTTPS).`

![security overview, página segura](images/overview-secure.png)

Clique em **View certificate** para visualizar o certificado do servidor para a 
[origem principal][same-origin-policy]. 

![visualizar certificado](images/view-certificate.png)

Páginas não seguras são identificadas com a mensagem `This page is not secure.`

O Security Panel distingue os dois tipos de páginas não seguras.
Se a página solicitada é fornecida por HTTP, a origem principal é sinalizada como 
não segura. 

![security overview, origem principal não segura](images/overview-non-secure.png)

Se a página solicitada é apresentada por HTTPS, mas a página 
obtém conteúdo de outras origens usando HTTP, ela ainda é 
sinalizada como não segura. Essa é conhecida como uma página de 
[conteúdo misto][mixed-content]. Páginas de conteúdo misto são apenas parcialmente protegidas porque o conteúdo 
HTTP é acessível a detectores e vulnerável a ataques indiretos. 

![security overview, conteúdo misto](images/overview-mixed.png)

Clique em **View request in Network Panel** para abrir uma visualização filtrada do 
Network Panel e ver exatamente quais solicitações foram fornecidas por HTTP. Isto mostra 
todas as solicitações desprotegidas de todas as origens. 

![network panel, recursos não seguros, todas as origens](images/network-all.png)

## Inspecionar origens

Use o painel à esquerda para inspecionar individualmente origens seguras ou não seguras. 

Clique em uma origem segura para visualizar os detalhes de conexão e 
certificado dela.

![detalhes da origem, segura](images/origin-detail-secure.png)

Se você clicar em uma origem não segura, o Security Panel fornecerá um link para uma visualização filtrada do Network Panel. 

![detalhes da origem, não segura](images/origin-detail-non-secure.png)

Clique no link para ver exatamente quais solicitações dessa origem foram 
fornecidas por HTTP. 

![network panel, recursos não seguros, uma origem](images/network-one.png)





[mixed-content]: https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content
[same-origin-policy]: https://en.wikipedia.org/wiki/Same-origin_policy
[why-https]: https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https


{# wf_devsite_translation #}
