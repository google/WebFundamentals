project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Página não solicita automaticamente geolocalização ao ser carregada".

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# Página não solicita automaticamente geolocalização ao ser carregada  {: .page-title }

## Por que a auditoria é importante {: #why }

Os usuários desconfiam ou se confundem quando as páginas solicitam automaticamente
sua localização durante o carregamento. Em vez de solicitar automaticamente a
localização do usuário no carregamento da página, vincule a solicitação a um gesto do usuário, como
um toque no botão "Find Stores Near Me". Verifique se o gesto exprime de forma clara
e explícita a necessidade da localização do usuário.

## Como ser aprovado na auditoria {: #how }

Em **URLs**, o Lighthouse relata os números das linhas e colunas nas quais seu
código está solicitando a localização do usuário. Remova essas chamadas e vincule as
solicitações a gestos do usuário. 

Consulte [Peça autorização com consciência][ask] para obter uma lista de práticas recomendadas para
solicitar a localização de um usuário.

[ask]: /web/fundamentals/native-hardware/user-location/#ask_permission_responsibly

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Se a permissão de geolocalização já foi concedida a uma página antes da auditoria
do Lighthouse, ele não poderá determinar se a página solicita a localização do usuário
no carregamento da página. Redefina as permissões e execute o Lighthouse novamente. Consulte
[Alterar permissões do site][help] para obter mais ajuda.

O Lighthouse coleta o JavaScript executado no carregamento da página. Se esse
código tiver chamadas para `geolocation.getCurrentPosition()` ou
`geolocation.watchPosition()` e a permissão de geolocalização ainda não tiver sido
concedida, a localização do usuário foi solicitada.

[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
