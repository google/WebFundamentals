project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: É fácil não dar atenção às condições de rede que seus usuários terão no dispositivo móvel. Use o DevTools para emular diferentes condições de rede. Conserte qualquer problema de tempo de carregamento, seus usuários ficarão gratos.

{# wf_updated_on: 2015-07-20 #}
{# wf_published_on: 2015-04-13 #}

# Otimizar desempenho sob condições de rede diversas {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/jonathangarbee.html" %}

É fácil não dar atenção às condições de rede que seus usuários terão no dispositivo móvel. Use o DevTools para emular diferentes condições de rede. Conserte qualquer problema de tempo de carregamento, seus usuários ficarão gratos.


### TL;DR {: .hide-from-toc }
- Sem afetar o tráfego para outras abas, avalie o desempenho do seu site usando o emulador de rede do Chrome DevTools.
- Use perfis personalizados específicos das condições de rede do seu público.


## Emular a conectividade de rede

O condicionamento da rede permite testar seu site em diversas conexões de rede, incluindo Edge, 3G e até off-line.
Ele limita a taxa de transferência de download e upload a um máximo.
A manipulação da latência gera um atraso mínimo no tempo de viagem de ida e volta (RTT) da conexão.

O condicionamento de rede é ativado pelo painel Network.
Selecione uma conexão no menu suspenso para aplicar a limitação de rede e a manipulação de latência.

![Selecionar limitação de rede](imgs/throttle-selection.png)

**Dica**: Você também pode definir limites para a rede pela gaveta 
[Network conditions](#network-conditions)

Quando um limite é ativado, o indicador do painel exibe um ícone de aviso.
Ele visa lembrar você de que a limitação fica ativa quando você está em outros painéis.

![Seletor do painel Network com indicador de aviso](imgs/throttling-enabled.png)

## Limites personalizados

O DevTools fornece uma base sólida de condições padrão.
Você pode adicionar condições personalizadas para atender às principais condições do seu público.

Para adicionar uma condição, abra o menu suspenso para aplicá-la.
No cabeçalho **custom**, encontre e selecione a opção **Add...**.
Isso abrirá a caixa de diálogo do DevTools com a guia "Throttling" aberta.

![Índice das configurações de limite](imgs/throttle-index.png)

Primeiramente, clique no botão **Add custom profile**.
Isso abre um formulário embutido para fornecer as condições dos perfis.
Preencha o formulário precisamente e pressione o botão **Add** quando atender às suas necessidades.

![Adicionar limite personalizado nas configurações de limite](imgs/add-custom-throttle.png)

Você pode modificar um perfil personalizado existente passando o cursor no dado que quiser.
Com o cursor em cima do dado, os ícones **Edit** e **Delete** são exibidos à direita do campo.

![Modificar dado personalizado nas configurações de limite](imgs/hover-to-modify-custom-throttle.png)

Agora você pode fechar a caixa de diálogo de configurações.
Seus novos perfis personalizados serão exibidos no cabeçalho **custom** ara selecionar uma condição.

## Abrir a gaveta de condições de rede {:#network-conditions}

Você pode acessar funções de rede, mesmo com outros painéis do DevTools abertos, com
a gaveta **Network conditions**. 

![a gaveta network conditions](imgs/network-drawer.png)

Acesse a gaveta no menu principal do DevTools (**Main Menu** > **More Tools** >
**Network Conditions**).

![como abrir a gaveta network conditions](imgs/open-network-drawer.png)


{# wf_devsite_translation #}
