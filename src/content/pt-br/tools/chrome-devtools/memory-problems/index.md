project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Saiba como usar o Chrome e o DevTools para encontrar problemas de memória que afetam o desempenho da página, incluindo vazamentos de memória, ocupação excessiva de memória e coletas de lixo frequentes.

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-04-13 #}

# Consertar problemas de memória {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Saiba como usar o Chrome e o DevTools para encontrar problemas de memória
que afetam o desempenho da página, incluindo vazamentos de memória, ocupação excessiva de memória e
coletas de lixo frequentes.


### TL;DR {: .hide-from-toc }
- Saiba quanta memória sua página está usando no momento com o gerenciador de tarefas do Chrome.
- Veja o uso de memória ao longo do tempo com os registros da Timeline.
- Identifique árvores do DOM desconectadas (uma causa comum de vazamentos de memória) com instantâneos de pilha.
- Descubra quando nova memória é alocada à pilha do JS com as gravações da Allocation Timeline.


Visão geral do ## 

De acordo com o modelo de desempenho [RAIL][RAIL], as atividades de
desempenho devem se concentrar nos usuários.

Os problemas de memória são importantes porque são frequentemente
notados pelos usuários. Os usuários podem perceber problemas de memória das seguintes
formas:

* **O desempenho de uma página piora progressivamente ao longo do tempo.** Isso é possivelmente
  um sintoma de vazamento de memória. Um vazamento de memória ocorre quando um erro na página 
  faz com que ela use progressivamente mais e mais memória com o tempo. 
* **O desempenho de uma página é consistentemente ruim.** Isso é possivelmente um sintoma
  de ocupação excessiva da memória. A ocupação excessiva da memória ocorre quando uma página usa mais memória do que
  o necessário para obter a maior velocidade.
* **O desempenho de uma página atrasa ou parece pausar frequentemente.** Isso é
  possivelmente um sintoma de coletas de lixo frequentes. A coleta de lixo
  ocorre quando o navegador recupera memória. O navegador decide quando isso acontecerá.
  Durante as coletas, toda execução de script é pausada. Portanto, se o navegador estiver
  executando muitas coletas de lixo, a execução de scripts será pausada muitas vezes.

### Ocupação excessiva de memória: quanto é "demais"?

É fácil definir um vazamento de memória. Se um site estiver usando mais
e mais memória progressivamente, há um vazamento. Mas a ocupação excessiva da memória é um pouco
mais difícil de detectar. E o que pode ser classificado como "ocupação excessiva de memória"?

Não existem números padrão porque dispositivos
e navegadores diferentes têm recursos distintos. A mesma página que
executa suavemente em um smartphone avançado pode falhar em um smartphone
simples.

A saída é usar o modelo RAIL e manter o foco nos usuários. Descubra
de que dispositivos os usuários mais gostam e teste sua página
neles. Se a experiência for consistentemente ruim, a página
poderá estar excedendo os recursos de memória desses dispositivos.

[RAIL]: /web/tools/chrome-devtools/profile/evaluate-performance/rail

## Monitorar o uso de memória em tempo real com o gerenciador de tarefas do Chrome

Use o gerenciador de tarefas do Chrome como ponto de partida para a investigação do
problema de memória. O gerenciador de tarefas é um monitor em tempo real que informa
quanta memória uma página está usando no momento.

1. Pressione <kbd>Shift</kbd>+<kbd>Esc</kbd> ou acesse o
   menu principal do Chrome e selecione **More tools** > **Task manager** para abrir
   o gerenciador de tarefas.

   ![abrir o gerenciador
   de tarefas](imgs/task-manager.png)

1. Clique com o botão direito no cabeçalho da tabela do gerenciador de tarefas e ative **JavaScript
   memory**.

   ![ativar javascript
   memory](imgs/js-memory.png)

Essas duas colunas contêm informações diferentes sobre a forma como a página usa a memória:

* A coluna **Memory** representa a memória nativa. Os nós de DOM são armazenados na
  memória nativa. Se este valor está aumentando, os nós do DOM estão sendo criados.
* A coluna **JavaScript Memory** representa a pilha JS. Esta coluna
  contém dois valores. O valor que você deve olhar é o número
  ativo (o número entre parênteses). O número ativo representa
  quanta memória os objetos acessíveis da sua página estão usando. Se este
  número estiver aumentando, novos objetos estão sendo criados ou os já
  existentes estão crescendo.

<!-- live number reference: https://groups.google.com/d/msg/google-chrome-developer-tools/aTMVGoNM0VY/bLmf3l2CpJ8J -->

## Visualizar vazamentos de memória com os registros da Timeline

Você também pode usar o painel Timeline como outro ponto de entrada para sua
investigação. O painel Timeline ajuda a visualizar o uso de memória pela página
ao longo do tempo.

1. Abra o painel **Timeline** no DevTools.
1. Ative a caixa de seleção **Memory**.
1. [Faça uma gravação][recording].

Dica: É uma boa prática começar e finalizar a gravação com uma coleta
de lixo forçada. Clique no botão **collect garbage**
(![botão force garbage collection][cg]{:.inline})
durante a gravação para forçar a coleta de lixo.

Para demonstrar as gravações de memória do Timeline, considere este código:

    var x = [];
    
    function grow() {
      for (var i = 0; i < 10000; i++) {
        document.body.appendChild(document.createElement('div'));
      }
      x.push(new Array(1000000).join('x'));
    }
    
    document.getElementById('grow').addEventListener('click', grow);

Todas as vezes que o botão referenciado no código é pressionado, dez 
mil nós `div` são anexados ao
corpo do documento e uma string de um milhão de caracteres `x` é inserida
na matriz `x`. A execução desse código gera uma gravação de Timeline semelhante à 
esta captura de tela:

![exemplo simples de crescimento][sg]

Em primeiro lugar, uma explicação da interface do usuário.
O gráfico **HEAP** no painel **Overview** (abaixo de **NET**) representa a pilha do
JS. Embaixo do painel **Overview** está o painel **Counter**. Aqui, o uso da memória
é exibido dividido por pilha do JS (como no gráfico **HEAP** no
painel **Overview**), documentos, nós do DOM, detectores e memória GPU.
A desativação de uma caixa de seleção oculta as informações no gráfico.

Agora, uma análise do código comparada com a captura de tela.
Se você observar o contador de nós (o gráfico verde), verá que ele corresponde
exatamente ao código. A contagem de nós aumenta
em passos discretos. Você pode presumir que cada aumento na contagem de nós é uma
chamada de `grow()`. O gráfico da pilha JS (o gráfico azul) não é tão direto.
Em consistência com as práticas recomendadas, o primeiro fundo é, na verdade, uma coleta
 de lixo forçada (resultante do pressionar do botão **collect garbage**).
À medida que a gravação progride, você pode ver que o tamanho da pilha JS apresenta picos. Isso é
natural e esperado: o código JavaScript está criando os nós do DOM a cada
clique no botão e trabalha muito quando cria a string de um milhão de
caracteres. O principal fator aqui é o fato de que a pilha JS encerra mais alta
do que começou (com o "início" sendo o ponto após a coleta
de lixo forçada). No mundo real, se você perceber esse padrão de tamanho crescente
de pilha de JS ou nó, isso poderá significar um vazamento de memória.

[recording]: https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#make-a-recording

[cg]: imgs/collect-garbage.png

[sg]: imgs/simple-growth.png

[hngd]: https://jsfiddle.net/kaycebasques/tmtbw8ef/

## Descobrir vazamentos de memória da árvore do DOM desconectada com instantâneos de pilha

Um nó do DOM somente pode ser coletado como lixo quando não for referenciado
pela árvore do DOM e pelo código JavaScript da página. Um nó é considerado 
"desconectado" quando é removido da árvore do DOM mas ainda tem referências
no JavaScript. Nós do DOM desconectados são uma causa comum de vazamentos de memória. Esta
seção mostra como usar os criadores de perfil de pilha do DevTools para identificar nós
desconectados.

Veja a seguir um exemplo simples de nós de DOM desconectados. 

    var detachedNodes;
    
    function create() {
      var ul = document.createElement('ul');
      for (var i = 0; i < 10; i++) {
        var li = document.createElement('li');
        ul.appendChild(li);
      }
      detachedTree = ul;
    }
    
    document.getElementById('create').addEventListener('click', create);

Um clique no botão referenciado no código cria um nó `ul` com dez filhos `li`.
 Estes nós são referenciados pelo código, mas não existem na
árvore do DOM. Portanto, estão desconectados.

Os instantâneos de pilha são uma forma de identificar nós desconectados. Como indicado pelo nome,
os instantâneos de pilha mostram como a memória é distribuída entre os objetos JS e os nós do DOM
da página no momento do instantâneo.

Para criar um instantâneo, abra o DevTools e acesse o painel **Profiles**, selecione
o botão de opção **Take Heap Snapshot** e pressione o botão **Take
Snapshot**. 

![take heap snapshot][ths]

O processamento e o carregamento do instantâneo podem demorar algum tempo. Depois que acabar, selecione-o
 no painel à esquerda (chamado de **HEAP SNAPSHOTS**). 

Digite `Detached` na caixa de texto **Class filter** para buscar árvores
do DOM desconectadas.

![filtrar por nós desconectados][df]

Expanda os quilates para investigar uma árvore desconectada.

![investigar árvore desconectada][ed]

Os nós destacados em amarelo fazem referência direta a eles no código 
JavaScript. Os nós destacados em vermelho não têm referências diretas. Eles só
estão ativos porque são parte da árvore dos nós amarelos. Em geral, você deve se
concentrar nos nós amarelos. Altere o código para que o nó amarelo não fique ativo
por mais tempo que o necessário. Com isso, você também se livrará dos nós vermelhos que fazem
parte da árvore de nós amarelos.

Clique em um nó amarelo para examiná-lo em detalhes. No painel **Objects**,
você pode ver mais informações sobre o código que está referenciando-o. Por exemplo,
na imagem acima, você pode ver que a variável `detachedTree` está
referenciando o nó. Para corrigir esse vazamento de memória específico, você precisa estudar 
o código que usa `detachedTree` e garantir que ele remova a referência ao
nó quando não precisar mais dele.

![investigar um nó amarelo][yn]

[ths]: imgs/take-heap-snapshot.png

[df]: imgs/detached-filter.png

[ed]: imgs/expanded-detached.png

[yn]: imgs/yellow-node.png

## Identificar vazamentos de memória na pilha JS com Allocation Timelines

A Allocation Timeline é outra ferramenta que pode ajudar a rastrear 
vazamentos de memória na pilha JS. 

Para demonstrar o Allocation Timeline, considere este código:

    var x = [];

    function grow() {
      x.push(new Array(1000000).join('x'));
    }

    document.getElementById('grow').addEventListener('click', grow);

Todas as vezes que o botão referenciado no código for acionado, uma string de um
milhão de caracteres será adicionada à matriz `x`.

Para gravar uma Allocation Timeline, abra o DevTools, acesse o painel **Profiles**,
selecione o botão de opção **Record Allocation Timeline**, pressione o botão **Start**,
execute a ação que você suspeita que esteja causando o vazamento de memória e,
em seguida, pressione o botão **stop recording** 
(![botão stop recording][sr]{:.inline})
quando estiver tudo pronto. 

Durante a gravação, observe se alguma barra azul aparece no Allocation
Timeline, como na captura de tela abaixo. 

![novas alocações][na]

Essas barras azuis representam novas alocações de memória. Essas novas alocações de memória
são seus candidatos a ter vazamentos de memória. Você pode aumentar o zoom em uma barra e filtrar o
painel **Constructor** para exibir somente os objetos alocados durante o período
especificado. 

![allocation timeline com zoom aumentado][zat]

Expanda o objeto e clique em seu valor para ver mais detalhes sobre ele no painel
**Object**. Por exemplo, na captura de tela abaixo, ao examinar os detalhes
do objeto recém-alocado, você poderá ver que ele foi
alocado à variável `x` no escopo `Window`.

![detalhes do objeto][od]

[sr]: imgs/stop-recording.png

[na]: imgs/new-allocations.png

[zat]: imgs/zoomed-allocation-timeline.png

[od]: imgs/object-details.png

## Investigar a alocação de memória por função {: #allocation-profile }

Use o tipo **Record Allocation Profiler** para ver a alocação de memória por
função do JavaScript.

![Record Allocation Profiler](imgs/record-allocation-profile.png)

1. Selecione o botão de opção **Record Allocation Profiler**. Se houver um
   worker na página, você poderá selecioná-lo como o destino da criação do perfil usando
   o menu suspenso ao lado do botão **Start**.
1. Pressione o botão **Start**.
1. Execute as ações na página que quer investigar.
1. Pressione o botão **Stop** quando concluir todas as ações.

O DevTools exibe a distribuição da alocação de memória por função. A visualização
padrão é **Heavy (Bottom Up)**, que exibe na parte superior as funções que
mais alocaram memória.

![Perfil de alocação](imgs/allocation-profile.png)

## Identificar coletas de lixo frequentes

Se uma página aparentar estar pausando com frequência, poderão estar ocorrendo problemas de
coleta de lixo. 

Você pode usar o Gerenciador de tarefas do Chrome ou os registros de memória da Timeline para
identificar coletas de lixo frequentes. No Gerenciador de tarefas, aumentar e reduzir
frequentemente os valores de **Memória** ou **Memória JavaScript** representa coletas
de lixo frequentes. Nas gravações da Timeline, gráficos frequentemente ascendentes e descendentes
de pilha JS ou contagem de nós indicam coletas de lixo frequentes.

Depois de identificar o problema, você poderá usar uma gravação da
Allocation Timeline para descobrir onde a memória está sendo alocada e que funções estão
causando as alocações. 


{# wf_devsite_translation #}
