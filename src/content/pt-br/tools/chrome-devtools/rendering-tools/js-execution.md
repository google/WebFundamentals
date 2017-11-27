project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Identifique funções pesadas usando o criador de perfis de CPU do Chrome DevTools.

{# wf_updated_on: 2016-03-30 #}
{# wf_published_on: 2015-04-13 #}

# Acelerar a execução do JavaScript {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Identifique funções pesadas usando o criador de perfis de CPU 
do Chrome DevTools.

![perfil de CPU](imgs/cpu-profile.png)


### TL;DR {: .hide-from-toc }
- Registre exatamente que funções foram chamadas e quanto tempo cada uma levou com o criador de perfis de CPU.
- Visualize seus perfis como uma diagrama de chamas.


## Gravar um perfil de CPU {:#record-profile}

Se você notar instabilidade no JavaScript, colete um perfil de CPU de JavaScript.
Os perfis de CPU mostram onde o tempo de execução é gasto nas funções da página.

1. Acesse o painel **Profiles** de DevTools.
2. Selecione o botão de opção **Collect JavaScript CPU Profile**.
3. Pressione **Start**.
4. Dependendo do que você estiver tentando analisar, poderá recarregar a 
   página, interagir com ela, ou simplesmente deixar ela ser executada.
5. Pressione o botão **Stop** quando acabar. 

Você também pode usar a [Command Line API][profile] para gravar e agrupar perfis 
na linha de comando.

[profile]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#profilename-and-profileendname

## Visualizar o perfil de CPU {:#view-profile}

Quando você encerrar a gravação, o DevTools preencherá automaticamente o painel Profile
com os dados da gravação. 

A vista padrão é **Heavy (Bottom Up)**. Esta vista permite saber 
que funções produzem maior impacto no desempenho e examinar os caminhos
de chamada dessas funções. 

### Alterar ordenação {:#sort}

Para alterar a ordenação, clique no menu suspenso perto do ícone de 
**foco na função selecionada**
(![ícone de foco na função selecionada](imgs/focus.png){:.inline}) 
e, em seguida, escolha uma das opções a seguir:

**Chart**. Exibe um diagrama de chamas cronológico da gravação.

![diagrama de chamas](imgs/flamechart.png)

**Heavy (Bottom Up)**. Lista as funções de acordo com o impacto no desempenho e permite
examinar os caminhos de chamada delas. Essa é a visualização padrão. 

![gráfico heavy](imgs/heavy.png)

**Tree (Top Down)**. Mostra uma imagem geral da estrutura de chamada, 
começando pela parte superior da pilha de chamadas. 

![gráfico tree](imgs/tree.png)

### Excluir funções {:#exclude}

Para excluir uma função do perfil de CPU, clique nela para selecioná-la e 
pressione o ícone de **excluir função selecionada** 
(![exclude function icon](imgs/exclude.png){:.inline}). O autor da chamada da 
função excluída é cobrado pelo tempo total da função excluída.

Clique no ícone de **restaurar todas as funções** 
(![ícone de restaurar todas as funções](imgs/restore.png){:.inline})
para restaurar todas as funções excluídas à gravação.

## Visualizar perfil de CPU como diagrama de chamas {:#flame-chart}

A visualização Flame Chart oferece uma representação visual do perfil da CPU ao longo
do tempo.

Após [gravar um perfil de CPU](#record-profile), visualize a gravação como 
diagrama de chamas [alterando a ordenação](#sort) para **Chart**.

![Visualização Flame Chart](imgs/flamechart.png)

O diagrama de chamas é dividido em duas partes:

1. **Overview**. Uma vista "aérea" de toda a gravação.
   A altura das barras corresponde à profundidade da 
   pilha de chamadas. Assim, quanto mais alta a barra, mais profunda a pilha de chamadas. 

2. **Call Stacks**. Esta é uma vista detalhada das funções que foram chamadas 
   durante a gravação. O eixo horizontal é o tempo e o vertical, 
   a pilha de chamadas. As pilhas são organizadas de cima para baixo. Assim, a função no topo
   chamou a logo abaixo dela, e assim por diante. 

   As funções são coloridas aleatoriamente. Não há correlação com as cores usadas
   em outros painéis. No entanto, as funções são sempre coloridas igualmente
  entre as invocações para que você possa ver os padrões de execução. 

![diagrama de chamas anotado](imgs/annotated-cpu-flame.png)

Uma pilha de chamadas alta não é necessariamente significativa. Isso significa apenas que muitas
funções foram chamadas. Mas uma barra larga significa que uma pilha levou muito tempo para 
ser concluída. Essa é uma das candidatas a otimização. 

### Aumentar o zoom em partes específicas da gravação {:#zoom}

Clique, mantenha e arraste o mouse para a direita e para a esquerda no overview para aproximar a vista
em partes específicas da pilha de chamadas. Depois de aumentar o zoom, a pilha de chamadas 
exibirá automaticamente a parte da gravação que você selecionou.

![diagrama de chamas com zoom aumentado](imgs/benchmark-zoom.png)

### Visualizar detalhes da função {:#flame-chart-function-details}

Clique em uma função para visualizar sua definição no painel **Sources**.

Passe o cursor sobre uma função para exibir seu nome e dados de sincronização. As informações
a seguir são fornecidas: 

*  **Name**. O nome da função.
*  **Self time**. Quanto tempo levou para concluir a invocação atual da 
   função, incluindo somente as declarações da própria função, não 
   incluindo as funções que ela chamou.
*  **Total time**. O tempo gasto para concluir a invocação atual desta 
   função e de todas as funções que ela chamou.
*  **URL**. O local da definição da função na forma de 
   `file.js:100`, em que `file.js` é o nome do arquivo onde a função
   foi definida e `100` é o número da linha da definição.
*  **Aggregated self time**. Tempo agregado de todas as invocações da 
   função durante a gravação, excluindo funções chamadas por essa 
   função.
*  **Aggregated total time**. Tempo total agregado de todas as invocações da 
   função, incluindo funções chamadas por essa função.
*  **Not optimized**. Se o criador de perfis detectou uma possível otimização
   para a função, a listará aqui.

![visualizar detalhes de funções no diagrama de chamas](imgs/details.png)


{# wf_devsite_translation #}
