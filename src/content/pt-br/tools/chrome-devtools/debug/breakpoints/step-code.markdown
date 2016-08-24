---
title: "Como Percorrer Seu Código"
description: "Executar uma linha de código ou uma função de cada vez, te permite observar alterações nos dados e na página para entender exatamente o que está acontecendo."
updated_on: 2015-09-02
translators:
  - alansilva
translation_priority: 0
key-takeaways:
  tldr:
    - "Execute o código passo a passo para observar os problemas antes ou enquanto ocorrem e teste alterações através de alterações do código em tempo real."
    - "Prefira dar passos ao invés de registrar coisas no console, pois dados logados já estão velhos no momento em que chegam no console."
    - "Habilite o recurso 'Async call stack' para ganhar maior visibilidade dentro da pilha de chamadas de funções assíncronas."
    - "Coloque scripts no Blackbox para esconder códigos de terceiros das suas pilhas de chamadas."
    - "Use funções nomeadas ao invés de anônimas para melhorar a legibilidade da sua pilha de chamadas."
---
<p class="intro">
  Executar uma linha de código ou uma função de cada vez, te permite observar alterações nos dados e na página para entender exatamente o que está acontecendo.
  Você pode também modificar os valores dos dados utilizados pelo script, e você pode também modificar o próprio script.
</p>

*Porque o valor desta variável é 20 ao invés de 30? Porque parece que aquela linha de código não funciona? Porque esta flag está com true quando deveria ser false?* Todo desenvolvedor encara essas perguntas, e percorre o código para solucioná-las.

Depois de [adicionar os breakpoints](/web/tools/chrome-devtools/debug/breakpoints/add-breakpoints), retorne para a página e use-a normalmente até
que o breakpoint seja alcançado. Isto pausa todo o JavaScript na página, o foco muda para o painel Sources do DevTools, e a linha com breakpoint fica realçada.
Você pode agora seletivamente executar o código e examinar seus dados, passo a passo.

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Passo a passo em ação

Todas as opções de passo são representadas através de ícones clicáveis ![Breakpoints button bar](imgs/image_7.png){:.inline} no sidebar, mas pode também ser acionada via teclas de atalho.
Aqui está o resumo:

<table class="mdl-data-table">
  <thead>
    <tr>
      <th data-th="Icon/Button">Ícone/Botão</th>
      <th data-th="Action">Ação</th>
      <th data-th="Description">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_8.png" alt="Resume" class="inline"></td>
      <td data-th="Action">Retomar (Resume)</td>
      <td data-th="Description">Retoma a execução até o próximo breakpoint. Se nenhum breakpoint for encontrado, a execução normal é retomada.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_9.png" alt="Long Resume" class="inline"></td>
      <td data-th="Action">Retomar demorado (Resume Long)</td>
      <td data-th="Description">Retoma a execução com breakpoints disabilitados por 500ms.
      Conveniente para pular momentaneamente breakpoints que parariam o código continuamente, por exemplo, um breakpoint dentro de um loop.
      <p><b>Clique e segure <i>Resume</i> até ele expandir para mostrar a ação.</b></p></td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_10.png" alt="Step Over" class="inline"></td>
      <td data-th="Action">Dar um passo por cima (Step Over)</td>
      <td data-th="Description">Executa qualquer coisa que acontece na próxima linha e depois pula para a próxima linha.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_11.png" alt="Step Into" class="inline"></td>
      <td data-th="Action">Dar um passo para dentro (Step Into)</td>
      <td data-th="Description">Se na próxima linha existir a chamada de uma função, o <i>Step Into</i> irá pular para dentro dela e pausar a função na primeira linha.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_12.png" alt="Step Out" class="inline"></td>
      <td data-th="Action">Dar um passo para fora (Step Out)</td>
      <td data-th="Description">Executa o restante da função atual e então pausa na próxima instrução após a chamada da função.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_13.png" alt="Deactivate breakpoints" class="inline"></td>
      <td data-th="Action">Desativar os breakpoints (Deactivate breakpoints)</td>
      <td data-th="Description">Desabilita temporariamente todos os breakpoints. Utilize para retomar a execução completa, sem realmente remover seus breakpoints.
      Clique novamente para reativar os breakpoints.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_14.png" alt="Pause on exceptions" class="inline"></td>
      <td data-th="Action">Pausar em execeções (Pause on exceptions)</td>
      <td data-th="Description">Automaticamente pausa o código quando uma execeção ocorre.</td>
    </tr>
  </tbody>
</table>

Use o **step into** como sua ação padrão de "linha a linha", pois ele garante que apenas uma instrução é executada, não importa em quais funções você dê um passo para dentro ou para fora.

Use o [Pause on exceptions](add-breakpoints#break-on-uncaught-exception) quando você suspeitar que uma execeção inesperada está causando um problema,
mas você não sabe onde. Quando esta opção estiver habilitada, você poderá refina-la clicando no checkbox **Pause On Caught Exceptions**; neste caso, a execução é pausada apenas
quando uma exceção esperada ocorre.

## A pilha de chamadas

Próximo ao topo do sidebar está a sessão **Call Stack**. Quando um código é pausado em um breakpoint, a pilha de chamada mostra o caminho de execução, em ordem cronológica inversa,
dos passos que levaram o código até o breakpoint. Ele é útil para entender não apenas a execução está *agora*, mas como ela chegou até lá, um fator importante em uma depuração.

### Exemplo

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--4-col">
    <img src="imgs/image_15.png" alt="Call stack">
  </div>
  <div class="mdl-cell mdl-cell--8-col">
    Um evento onclick inicial na linha 50 no arquivo <strong>index.html</strong> chamou a função <code>setone()</code> na linha 18 do arquivo de JavaScrip <strong>dgjs.js</strong>,
    que então chamou a função <code>setall()</code> na linha 4 do mesmo arquivo, onde a execução está pausada no breakpoint atual.
  </div>
</div>

### Habilite a pilha de chamada assíncrona

Habilite o recurso de pilha de chamada assíncrona para ganhar mais visibilidade na execução
das chamadas se suas funções assíncronas.

1. Abra o painel **Sources** do DevTools.
2. No quadrado **Call Stack**, habilite o checkbox **Async**.

O vídeo abaixo contém um simples script para demonstrar o recurso de pilha de chamada assíncrona.
No script, uma biblioteca de terceiro é usada para selecionar um elemento do DOM.
Uma função chamada `onClick` é registrada como o manipulador do evento
`onclick` do elemento. Sempre que o `onClick` for chamado,
por sua vez ele chama uma função chamada `f`, da qual apenas força o script a
pausar usando a palavra chave `debugger`.

{% animation animations/async-call-stack-demo.mp4 %}

No video, um breakpoint é acionado, e a pilha de chamada fica extendida.
Existe apenas uma chamada na pilha: `f`. O recurso de pilha de chamada assíncrona fica então
habilitada, o script continua, o breakpoint é acionado novamente, e então a pilha de chamada
fica expandida pela segunda vez. Desta vez, a pilha de chamada contém
todas as chamadas que levam ao `f`, incluindo chamadas de bibliotecas de terceiros, e
a chamada para o `onClick`. Na primeira vez em que o script foi chamado, existia
uma chamada na pilha de chamada. Na segunda vez, existiam quatro. Resumindo,
o recurso de pilha de chamadas assíncronas proporciona maior visibilidade para dentro da
chamada completa da pilha de funções assíncronas.

### Dica: nomeie funções para melhorar a legibilidade da pilha de chamadas

Funções anônimas deixa a pilha de chamadas mais difícil de ler. Nomeie suas funções
para melhorar a legibilidade.

O código nas duas imagens abaixo funciona de modo equivalente. O
funcionamento exato do código não é importante, o que importa é que
o código na primeira imagem usa funções anônimas, enquanto o segundo
utiliza funções nomeadas.

Na pilha de chamadas na primeira imagem, ambas funções no topo estão entituladas
`(anonymous function)`. Na segunda imagem, ambas funções no topo
estão nomeadas, tornando mais fácil a compreensão do fluxo programa num relance.
Quando se está trabalhando com diversos arquivos de script, incluindo bibliotecas e
frameworks de terceiros, e a sua pilha de chamada tem cinco ou dez funções de profundidade,
fica muito mais fácil entender o fluxo da pilha de chamada quando as funções estão nomeadas.

Pilha de chamadas com funções anônimas:

![Pilha de chamadas com funções anônimas difíceis de ler](imgs/anon.png)

Pilha de chamadas com funções nomeadas:

![Pilha de chamadas com funções nomeadas fáceis de ler](imgs/named.png)

<!-- blackbox OR disable third-party code??? -->

### Esconda o código de terceiros

Coloque scripts de terceiros no Blackbox para omitir esses arquivos nas suas pilhas de chamadas.

Antes de omitir:

![Pilha de chamada antes de omitir os arquivos](/web/tools/chrome-devtools/debug/breakpoints/imgs/before-blackbox.png)

Depois de omitir:

![Pilha de chamada depois de omitir os arquivos](/web/tools/chrome-devtools/debug/breakpoints/imgs/after-blackbox.png)

Para esconder um arquivo:

1. Abra as configurações do DevTools.

   ![Abrindo as configurações do DevTools](/web/tools/chrome-devtools/debug/breakpoints/imgs/open-settings.png)

2. No menu de navegação á esquerda, clique em **Blackboxing**.

   ![painel Blackboxing no Chrome DevTools](/web/tools/chrome-devtools/debug/breakpoints/imgs/blackbox-panel.png)

3. Clique em **Add pattern**.

4. No campo **Pattern** informe o padrão de nome de arquivo que você deseja
   excluir da sua pilha de chamadas. O DevTools exclui quaisquer scripts que combinam com o padrão.

   ![Adicionando o padrão no blackbox](/web/tools/chrome-devtools/debug/breakpoints/imgs/add-pattern.png)

5. No menu á direita do campo, selecione **Blackbox** para executar os arquivos de script
   mas para excluir as chamadas das pilhas de chamadas, ou selecione
   **Disabled** para prevenir que os arquivos executem.

6. Clique em **Add** para salvar.

Na próxima vez em que você executar a página e um breakpoint for acionado, o DevTools
irá esconder qualquer chamadas de função dos scripts omitidos na pilha de chamadas.

## Manipulação de dados

Quando a execução do código for pausada, você poderá observar e modificar os dados do processamento. Isto é crucial quando for tentar rastrear
uma variável que parece estar com o valor errado, ou um parâmetro que foi passado que não veio como esperado.

Mostre o Console nos Drawers clicando no **Show/Hide drawer** ![Show/Hide drawer](imgs/image_16.png){: .inline} ou pressione <kbd class="kbd">ESC</kbd>.
Com o console aberto enquanto você passeia pelo código, você pode agora:

* Digitar o nome de uma variável para ver o seu valor atual no escopo da função atual
* Digitar uma instrução JavaScript de atribuição para mudar o valor

Experimente modificar os valores, e então continue a execução para ver como muda a saída do seu código e se ele se comporta como você espera.

#### Exemplo

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--4-col">
    <img src="imgs/image_17.png" alt="Console Drawer">
  </div>
  <div class="mdl-cell mdl-cell--8-col">
    Revelamos que o valor do parâmetro `dow` é na verdade 2, mas manualmente altermos ele para 3 antes de retomar a execução.
  </div>
</div>

## Editando em tempo real

Observar e pausar a execução do código te auxilia a localizar erros, e editar em tempo real permite que você rapidamente preveja as alterações sem a necessidade de recarregar a página.

Para editar um script em tempo real, simplesmente clique na parte do editor do painel Sources enquanto estiver debugando.
Faça as suas alterações desejadas no editor, e então retome a execução e interaja com a página normalmente;
seu script modificado será executado no lugar do original, e você poderá observar os efeitos das suas alterações.

#### Exemplo

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--4-col">
    <img src="imgs/image_18.png" alt="Live Editing">
  </div>
  <div class="mdl-cell mdl-cell--8-col">
    Suspeitamos que o parâmetro <code>dow</code> está, em cada caso, fora por +1 quando é passado para a função <code>setone()</code> – que é, o valor do <code>dow</code>,
    quando recebida, é 1 quando deveria ser 0, 2 quando deveria ser 1, etc. Para testar rapidamente se diminuindo o valor passado confirma que este é o problema,
    nós adicionamos a linha 17 no começo da função e retomamos a execução.
  </div>
</div>



