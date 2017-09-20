project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “Página não solicita permissões de notificação automaticamente ao ser carregada”.

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# Página não solicita permissões de notificação automaticamente ao ser carregada {: .page-title }

## Por que a auditoria é importante {: #why }

Como explicamos em [O que torna uma notificação boa][good], uma boa notificação é
oportuna, relevante e precisa. Se sua página solicitar permissão para enviar
notificações ao ser carregada, essas notificações podem não ser relevantes para os
usuários ou precisas para as necessidades deles. Uma experiência de usuário melhor é oferecer o
envio de um tipo específico de notificação e apresentar a solicitação de permissões depois
que o usuário aceitar.

[bom]: /web/fundamentals/push-notifications/

## Como ser aprovado na auditoria {: #how }

Em **URLs**, o Lighthouse reporta os números das linhas e colunas nas quais seu
código está solicitando permissão para enviar notificações. Remova essas chamadas
e vincule as solicitações a gestos do usuário.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Se as permissões de notificação já tiverem sido concedidas ou negadas para uma página antes da
auditoria, o Lighthouse não poderá determinar se a página solicita
permissões de notificação ao ser carregada. Redefina as permissões e execute o
Lighthouse novamente. Consulte [Alterar permissões do site][help] para obter mais ajuda.

O Lighthouse coleta o JavaScript executado no carregamento da página. Se esse
código contiver chamadas para `notification.requestPermission()` e a permissão
de notificação ainda não tiver sido concedida, a permissão de notificação foi solicitada.

[ajuda]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
