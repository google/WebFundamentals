project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Ao executar uma linha ou função do código por vez, é possível observar as mudanças dos dados e da página e entender exatamente o que está acontecendo.

{# wf_updated_on: 2015-09-01 #}
{# wf_published_on: 2015-04-13 #}

# Como percorrer o código {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

Ao executar uma linha ou função do código por vez, é possível observar as mudanças dos dados e da página e entender exatamente o que está acontecendo. Além disso, você pode modificar o valor dos dados usados pelo script, e até mesmo o próprio script.

"Por que o valor desta variável é 20 em vez de 30? Por que essa linha de código parece não produzir efeito? Por que este sinalizador é verdadeiro quando deve ser falso?* Todo desenvolvedor lida com essas perguntas e percorre o código para descobrir a resposta.

Depois de [configurar pontos de interrupção](add-breakpoints), retorne à página e use-a normalmente até chegar a um ponto de interrupção. Isto pausa todo o JavaScript da página, o foco volta-se ao painel Sources do DevTools e o ponto de interrupção fica em destaque. Agora, você pode executar código seletivamente e analisar seus dados, passo a passo.


### TL;DR {: .hide-from-toc }
- Percorra o código para observar problemas antes ou enquanto eles acontecem e teste as mudanças com a edição em tempo real.
- Prefira pular o registro do console, pois os dados registrados já ficam obsoletos no momento em que chegam ao console.
- Ative o recurso "Async call stack" para ter maior visibilidade da pilha de chamadas de funções assíncronas.
- Oculte a estrutura dos scripts para esconder código de terceiros das suas pilhas de chamadas.
- Use funções com nome, em vez de anônimas, para melhorar a legibilidade da pilha de chamadas.


## Etapas na ação

Todas as opções de etapa são representadas por ícones clicáveis ![barra do botão Breakpoints](imgs/image_7.png){:.inline} na barra lateral, mas também podem ser acionadas por atalhos. Veja o resumo:

<table>
  <thead>
    <tr>
      <th data-th="Icon/Button">Ícone/botão</th>
      <th data-th="Action">Ação</th>
      <th data-th="Description">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_8.png" alt="Retomar" class="inline"></td>
      <td data-th="Action">Retomar</td>
      <td data-th="Description">Retoma a execução até o próximo ponto de interrupção. Se nenhum ponto de interrupção for encontrado, a execução normal é retomada.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_9.png" alt="Retomada longa" class="inline"></td>
      <td data-th="Action">Retomada longa</td>
      <td data-th="Description">Retoma a execução com pontos de interrupção desativados por 500 ms. Conveniente para pontos de interrupção momentaneamente ignorados que poderiam pausar continuamente o código, por exemplo, um ponto de interrupção dentro de um loop. <p><b>Clique em <i>Resume</i> e mantenha pressionado até expandir para exibir a ação.</b></p></td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_10.png" alt="Pular" class="inline"></td>
      <td data-th="Action">Pular</td>
      <td data-th="Description">Executa o que acontecer na próxima linha e pula para a próxima linha.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_11.png" alt="Entrar" class="inline"></td>
      <td data-th="Action">Entrar</td>
      <td data-th="Description">Se a próxima linha contiver uma chamada de função, <i>Entrar</i> pulará para essa função e a pausará.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_12.png" alt="Sair" class="inline"></td>
      <td data-th="Action">Sair</td>
      <td data-th="Description">Executa o restante da função atual e pausa na próxima declaração depois de uma chamada de função.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_13.png" alt="Desativar pontos de interrupção" class="inline"></td>
      <td data-th="Action">Desativar pontos de interrupção</td>
      <td data-th="Description">Desativa todos os pontos de interrupção temporariamente. Use para retomar a execução completa sem remover os pontos de interrupção. Clique novamente para reativar os pontos de interrupção.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_14.png" alt="Pausa em exceções" class="inline"></td>
      <td data-th="Action">Pausa em exceções</td>
      <td data-th="Description">Pausa o código automaticamente quando ocorre uma exceção.</td>
    </tr>
  </tbody>
</table>

Use **entrar** como uma típica ação de "uma linha por vez", assim você garante que somente uma declaração será executada, independentemente das funções em que você entrou e de que saiu.

Use [Pausar em exceções](add-breakpoints#break-on-uncaught-exception) quando suspeitar que uma exceção não capturada está causando um problema, mas não souber onde ela está. Quando essa opção é ativada, é possível refiná-la clicando na caixa de seleção **Pause On Caught Exceptions**. Neste caso, a execução é pausada somente quando uma exceção especificamente manipulada ocorre.

## Ver propriedades por escopo {: #scope }

Quando você pausa um script, a seção **Scope** exibe todas as
propriedades definidas no momento.

A seção está destacada em azul na captura de tela abaixo.

![A seção Scope do painel Sources](imgs/scope-pane.png)

A seção Scope é preenchida apenas quando há um script pausado.
Enquanto a página está em execução, a seção Scope fica vazia.

A seção Scope exibe as propriedades definidas nos níveis local, fechamento e
global.

Se a propriedade tiver um quilate ao lado, isso significa que ela é um objeto. Clique
no quilate para expandir o objeto e ver suas propriedades.

Algumas vezes, as propriedades ficam esmaecidas. Por exemplo, a propriedade `constructor`
está mais esmaecida do que a propriedade `confirm` na captura de tela abaixo.

![Propriedades esmaecidas](imgs/enumerables.png)

As propriedades mais escuras são enumeráveis. As propriedades mais claras e esmaecidas não
são. Consulte a discussão a seguir do Stack Overflow para mais informações:
[O que significam as cores do painel Chrome Developer Tools
Scope?](O que significam as cores do painel Chrome Developer Tools?)

## A pilha de chamadas

Próxima à parte superior da barra lateral, fica a seção **Call Stack**. Quando o código é pausado em um ponto de interrupção, a pilha de chamadas exibe o caminho de execução, em ordem cronológica inversa, que levou o código a esse ponto de interrupção. Isto é relevante para entender não somente onde a execução está *agora*, mas como chegou até lá, um fator importante na depuração.

### Exemplo

<img src="imgs/image_15.png" alt="Call stack" class="attempt-left">

Um evento onclick inicial na linha 50 do arquivo `index.html` chamou a função 
`setone()` na linha 18 do arquivo JavaScript `dgjs.js`, que, por sua vez,
chamou a função `setall()` na linha 4 do mesmo arquivo, onde a execução foi
pausada no ponto de interrupção atual.

<div class="clearfix"></div>

### Ativar a pilha de chamadas assíncronas

Ative o recurso de pilha de chamadas assíncronas para ter mais visibilidade da execução
das suas chamadas de função assíncronas.

1. Abra o painel **Sources** do DevTools.
2. Na seção **Call Stack**, ative a caixa de seleção **Async**.

O vídeo abaixo contém um script simples para demonstrar o recurso da pilha de 
chamadas assíncronas. No script, uma biblioteca terceirizada é usada para selecionar um
elemento DOM. Uma função chamada `onClick` é registrada como o manipulador do evento 
`onclick` para o elemento. Sempre que `onClick` é chamado,
ele chama uma função denominada `f`, que apenas força o script a 
pausar pela palavra-chave `debugger`. 

<video src="animations/async-call-stack-demo.mp4"
       autoplay muted loop controls></video>

No vídeo, um ponto de interrupção é acionado e a pilha de chamadas, expandida.
Há somente uma chamada na pilha: `f`. Em seguida, o recurso da pilha de chamadas assíncronas é
ativado, o script é retomado, o ponto de interrupção é acionado novamente e a
pilha de chamadas é expandida pela segunda vez. Neste momento, a pilha de chamadas contém todas 
as chamadas que levam até `f`, incluindo as chamadas da biblioteca terceirizada, e
a chamada para `onClick`. Na primeira vez em que o script foi chamado, 
havia apenas uma chamada na pilha de chamadas. Na segunda vez, havia quatro. Em
outras palavras, o recurso da pilha de chamadas assíncrona fornece maior visibilidade 
de toda a pilha de chamadas das funções assíncronas.

### Dica: nomeie funções para aumentar a legibilidade da pilha de chamadas

Funções anônimas dificultam a leitura. Nomeie as funções
para aumentar a legibilidade.

Os snippets de código nas duas capturas de tela abaixo são equivalentes em termos de funcionalidade. O
funcionamento exato do código não é importante; o que deve ser destacado é
que o código da primeira captura de tela usa funções anônimas, enquanto
que o da segunda usa funções nomeadas.

Na pilha de chamadas da primeira captura de tela, as duas funções superiores são
simplesmente chamadas de `(anonymous function)`. Na segunda captura de tela, as duas
funções superiores são nomeadas, o que permite entender o fluxo do programa
rapidamente. Quando se trabalha com diversos arquivos de script, incluindo
bibliotecas e estruturas de terceiros, e a pilha de chamadas tem 5 ou 10
chamadas de profundidade, é muito mais fácil entender o fluxo da pilha de chamadas quando as
funções têm nome.

Pilha de chamadas com funções anônimas:

![Pilha de chamadas com funções anônimas difíceis de entender](imgs/anon.png)

Pilha de chamadas com funções nomeadas: 

![Pilha de chamadas com funções nomeadas fáceis de entender](imgs/named.png)

<!-- blackbox OR disable third-party code??? -->

### Oculte o código de terceiros

Oculte a estrutura dos arquivos de script para omitir os arquivos de terceiros das pilhas de chamadas.

Antes do exame superficial:

![Pilha de chamadas antes da ocultação](imgs/before-blackbox.png)

Depois do exame:

![Pilha de chamadas depois da ocultação](imgs/after-blackbox.png)

Para ocultar a estrutura de um arquivo:

1. Abra as configurações do DevTools.

   ![Como abrir as configurações da DevTools](imgs/open-settings.png)

2. No menu de navegação, à esquerda, clique em **Blackboxing**.

   ![Painel Blackboxing no Chrome DevTools](imgs/blackbox-panel.png)

3. Clique em **Add pattern**.

4. No campo de texto **Pattern**, digite o padrão de nome do arquivo que deseja 
   excluir da pilha de chamadas. O DevTools exclui todos os scripts que correspondem ao 
   padrão. 

   ![Como adicionar padrão de ocultação de estrutura](imgs/add-pattern.png)

5. No menu suspenso à direita do campo de texto, selecione **Blackbox** para
   executar os arquivos de script, mas excluir as chamadas da pilha de chamadas, ou selecione
   **Disabled** para impedir a execução dos arquivos.

6. Clique em **Add** para salvar.

Na próxima vez em que você executar a página e um ponto de interrupção for acionado, o DevTools
esconderá todas as chamadas de função da pilha de chamadas dos scripts ocultados.

## Manipulação de dados

Quando a execução do código é pausada, é possível observar e modificar os dados que ela está processando. Isso é fundamental para tentar encontrar uma variável que pareça ter o valor incorreto ou um parâmetro passado recebido de forma diferente da esperada.

Exiba a gaveta Console clicando em **Show/hide drawer** ![Show/Hide drawer](imgs/image_16.png){: .inline} ou pressione <kbd class="kbd">ESC</kbd>. Com o console aberto enquanto percorre o código, agora você pode:

* Digitar o nome de uma variável para ver seu valor atual no âmbito da função atual
* Digitar uma declaração de atribuição JavaScript para alterar o valor

Tentar modificar os valores e continuar a execução para ver como o resultado do seu código é alterado e se se comporta como o esperado.

#### Exemplo

<img src="imgs/image_17.png" alt="Gaveta do Console" class="attempt-left">

Revelamos que o valor do parâmetro `dow` atualmente é 2, mas o alteramos
manualmente para 3 antes de retomar a execução.

<div class="clearfix"></div>

## Edição em tempo real

Observar e pausar o código em execução ajuda a localizar erros, e a edição em tempo real permite prever mudanças rapidamente sem precisar recarregar.

Para editar um script em tempo real, basta clicar na parte do editor do painel Sources enquanto estiver percorrendo o código. Promova as alterações como quiser no editor e implemente-as com <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> (ou <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd> no Mac). Neste momento, todo o arquivo JS será corrigido no VM e todas a definição de todas as funções será atualizada. 

Agora, você pode retomar a execução. Seu script modificado será executado no lugar do original, e você poderá observar os efeitos das alterações que promoveu.

#### Exemplo

![Edição em tempo real](imgs/image_18.png)

Suspeitamos que o parâmetro `dow` tem, em todos os casos, discrepância de +1 quando é
passado à função `setone()` — ou seja, o valor de `dow<`, conforme 
recebido, é 1 quando deveria ser 0, 2 quando deveria ser 1 etc. Para testar 
rapidamente se reduzir o valor passado confirma que este é o problema,
adicionamos a linha 17 no início da função, implementamos com 
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd>  e retomamos.

## Como gerenciar execução de threads {: #threads }

Use a seção **Threads** do painel Sources para pausar, entrar e
inspecionar outros encadeamentos, como service worker ou web worker.

Para demonstrar a seção Threads, este segmento usa a seguinte demonstração:
[Web Workers basic example](http://mdn.github.io/simple-web-worker/)

Se abrir o DevTools no aplicativo, você verá que o script principal está localizado
em `main.js`:

![Script principal](imgs/main-script.png)

E o script web worker está localizado em `worker.js`:

![Script worker](imgs/worker-script.png)

O script principal detecta alterações feitas aos campos de entrada **Multiply number 1** or
**Multiply number 2**. Após a alteração, o script principal envia uma
mensagem ao web worker com os valores dos dois números a serem multiplicados. O
web worker faz a multiplicação e retorna o resultado ao
script principal.

Vamos supor que você tenha definido uma interrupção em `main.js` para ser acionada quando
o primeiro número for alterado:

![Interrupção do script principal](imgs/main-script-breakpoint.png)

E você também pode definir uma interrupção em `worker.js` quando o worker receber uma
mensagem:

![Interrupção do worker script](imgs/worker-script-breakpoint.png)

Modificar o primeiro número na IU do aplicativo aciona as duas interrupções.

![Interrupções dos scripts principal e worker acionadas](imgs/breakpoints-triggered.png)

Na seção Threads, a seta azul indica qual encadeamento está
selecionado. Por exemplo, na captura de tela acima, o encadeamento **Main** está selecionado. 

Todos os
controles do DevTools para percorrer o código (retomar ou pausar a execução do script,
pular para a próxima chamada de função, entrar na próxima chamada de função etc.) são
relacionados ao encadeamento em questão. Em outras palavras, se você pressionar o botão **Resume script execution**
com o DevTools nas mesmas configurações indicadas na captura de tela acima, a execução 
do encadeamento Main seria retomado, mas o web worker
continuaria pausado. As seções **Call Stack** e **Scope** também exibem apenas 
informações do encadeamento principal (Main).

Quando quiser percorrer o código do encadeamento web worker ou consultar suas
informações de escopo e pilha de chamadas, clique no rótulo da seção Threads
para deixar a seta azul ao seu lado. A captura de tela abaixo mostra como as
informações da pilha de chamadas e de escopo mudam após selecionar o encadeamento worker.
Para reforçar: se você pressionar um dos botões de comando para percorrer o código (retomar
execução do script, pular para a próxima chamada de função etc.), a ação estaria relacionada apenas
ao encadeamento worker. O encadeamento Main não é afetado.

![encadeamento worker em foco](imgs/worker-thread.png)


{# wf_devsite_translation #}
