project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Use a ferramenta do criador de perfil de alocação para encontrar objetos que não foram coletados da lixeira corretamente e continuam retendo memória.

{# wf_updated_on: 2015-07-08 #}
{# wf_published_on: 2015-04-13 #}

# Como usar a ferramenta do criador de perfil de alocação {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
Use a ferramenta do criador de perfil de alocação para encontrar objetos que não foram coletados da lixeira corretamente e continuam retendo memória.


## Como a ferramenta funciona

O **criador de perfil de alocação** combina as informações detalhadas de instantâneo do
[criador de perfil da pilha](/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots)
com a atualização incremental e o rastreamento do
[painel Timeline](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool).
De forma semelhante a essas ferramentas, o rastreamento da alocação de pilha de um objeto envolve iniciar uma gravação,
executar uma sequência de ações e interromper a gravação para análise.

A ferramenta gera periodicamente instantâneos da pilha durante toda a gravação (a intervalos de 50 ms!) e um instantâneo final ao final da gravação.

![Criador de perfil de alocação](imgs/object-tracker.png)

Observação: o número após o @ é um ID de objeto que persiste entre os diversos instantâneos criados. Isto permite a comparação precisa entre estados de pilha. Exibir o endereço de um objeto não faz sentido, já que os objetos são movidos durante as coletas de lixo.

## Ativar o criador de perfil de alocação

Para começar a usar o criador de perfil de alocação:

1. Verifique se você tem o [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) mais recente.
2. Abra as ferramentas de desenvolvedor e clique no ícone de engrenagem no canto inferior direito.
3. Agora, abra o painel Profiler. Você deverá ver um perfil denominado "Record Heap Allocations"

![Criador de perfil Record heap allocations](imgs/record-heap.png)

## Ler um perfil de alocação de pilha

O perfil de alocação de pilha mostra onde os objetos são criados e identifica o caminho de retenção.
No instantâneo a seguir, as barras na parte superior indicam quando novos objetos são encontrados na pilha.

A altura de cada barra corresponde ao tamanho dos objetos recentemente alocados
e a cor das barras indica se esses objetos ainda estão ativos no instantâneo final da pilha.
Barras azuis indicam objetos que ainda estão ativos no final da linha do tempo e
barras cinza indicam objetos que foram alocados durante a linha do tempo,
mas que já foram coletados como lixo:

![Instantâneo do criador de perfil de alocação](imgs/collected.png)

No instantâneo a seguir, uma ação foi executada 10 vezes.
O programa de exemplo armazena em cache cinco objetos, portanto, as últimas cinco barras azuis são normais.
Mas a barra azul mais à esquerda indica um possível problema.

Você pode usar os controles deslizantes na linha do tempo acima para aumentar o zoom nesse instantâneo específico
e ver os objetos alocados recentemente naquele momento:

![Aumentar o zoom no instantâneo](imgs/sliders.png)

Um clique em um objeto específico da pilha mostrará sua árvore de retenção na parte inferior do instantâneo da pilha. Examinar o caminho de retenção para o objeto deve dar a você informações suficiente para entender por que o objeto não foi coletado, e, assim, será possível fazer as mudanças adequadas no código para remover a referência desnecessárias.

## Ver a alocação de memória por função {: #allocation-profiler }

Você também pode ver a alocação de memória por função do JavaScript. Consulte
[Investigar a alocação de memória por função](index#allocation-profile) para
obter mais informações.


{# wf_devsite_translation #}
