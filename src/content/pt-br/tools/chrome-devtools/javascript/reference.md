project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Descubra novas formas de depuração nesta referência abrangente dos recursos de depuração do Chrome DevTools.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-01-04 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

<style>
.devtools-list {
  list-style: none;
}
</style>

# Referência de como depurar JavaScript {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Descubra novas formas de depuração, nesta abrangente referência dos recursos de
depuração do Chrome DevTools.

Consulte [Primeiros passos com a depuração do JavaScript no Chrome
DevTools](/web/tools/chrome-devtools/javascript) para aprender o básico de
depuração.

## Pause o código com breakpoints {: #breakpoints }

Defina um breakpoint para que você possa pausar seu código no meio de sua
execução.

Consulte [Pausar o código com pontos de interrupção](breakpoints) para aprender
como definir breakpoints.

## Percorrer o código {: #stepping }

Depois que seu código for pausado, passe por ele, uma linha por vez,
investigando a estrutura de controle e os valores das propriedades ao longo do
caminho.

### Passe por uma linha de código {: #step-over }

Quando pausado em uma linha de código que contém uma função que não é relevante
para o problema que você está depurando, clique em **Step over**![Step over](imgs/step-over.png){:.devtools-inline} 
para executar a função sem entrar nela.

<figure>
  <img src="imgs/step-over-outline.svg"
       alt="Selecting 'Step over'."/>
  <figcaption>
    <b>Figura 1</b>. <b>Step over</b>, destacado em azul
  </figcaption>
</figure>

Por exemplo, suponha que você esteja depurando o seguinte código:

```
function updateHeader() {
  var day = new Date().getDay();
  var name = getName(); // A
  updateName(name); // D
}
function getName() {
  var name = app.first + ' ' + app.last; // B
  return name; // C
}
```

Você está pausado em `A`. Ao pressionar **Step over**, o DevTools executa todo o
código na função que você está passando, que é `B` e `C`. O DevTools faz então
uma pausa em `D`.

### Entre em uma linha de código {: #step-into }

Quando pausado em uma linha de código que contém uma chamada de função
relacionada ao problema que você está depurando, clique em **Step into** ![Step into](imgs/step-into.png){:.devtools-inline} 
para investigar mais essa função.

<figure>
  <img src="imgs/step-into-outline.svg"
       alt="Selecting 'Step into'."/>
  <figcaption>
    <b>Figura 2</b>. <b>Step into</b>, destacado em azul
  </figcaption>
</figure>

Por exemplo, suponha que você esteja depurando o seguinte código:

```
function updateHeader() {
  var day = new Date().getDay();
  var name = getName(); // A
  updateName(name);
}
function getName() {
  var name = app.first + ' ' + app.last; // B
  return name;
}
```

Você está pausado em `A`. Ao pressionar **Step into**, o DevTools executa essa
linha de código, em seguida, faz uma pausa em `B`.

### Saia de uma linha de código {: #step-out }

Quando estiver pausado em uma função que não está relacionada ao problema que
você está depurando, clique em **Step out** ![Step out](imgs/step-out.png){:.devtools-inline}
para executar o restante do código da função.

<figure>
  <img src="imgs/step-out-outline.svg"
       alt="Selecting 'Step out'."/>
  <figcaption>
    <b>Figura 3</b>. <b>Step out</b>, destacado em azul
  </figcaption>
</figure>

Por exemplo, suponha que você está depurando o seguinte código:

```
function updateHeader() {
  var day = new Date().getDay();
  var name = getName();
  updateName(name); // C
}
function getName() {
  var name = app.first + ' ' + app.last; // A
  return name; // B
}
```

Você está pausado `A`. Pressionando **Step out**, o DevTools executa o restante
do código em `getName()`, que neste exemplo é apenas `B`, em seguida, faz uma
pausa em `C`.

### Executar todo o código até uma determinada linha {: # continue-to-here }

Ao depurar uma função longa, pode haver muito código que não está relacionado ao
problema que você está depurando.

Você *poderia* percorrer todas as linhas, mas isso pode ser entediante. Você
*pode* definir um breakpoint na linha em que está interessado e, em seguida,
pressionar **Resume Script Execution** ![Resume Script
Execution][resume]{:.devtools-inline},
porém há um caminho mais rápido.

Clique com o botão direito na linha de código em que você está interessado e
selecione **Continue to here**. O DevTools executa todo o código até esse ponto
e, em seguida, faz uma pausa nessa linha.

<figure>
  <img src="imgs/continue-to-here.png" alt="Selecting 'Continue to here'."/>
  <figcaption>
    <b>Figura 4</b>. Seleção de <b>Continue to here</b>
  </figcaption>
</figure>

### Reinicie a função principal na pilha de chamadas {: # restart-frame }

Enquanto estiver em pausa numa linha de código, clique com o botão direito do
mouse em qualquer lugar no painel Call Stack e selecione **Restart Frame** para
pausar na primeira linha da função principal em sua pilha de chamadas. A função
que estiver acima é a última função que foi chamada.

Por exemplo, suponha que você esteja percorrendo o seguinte código:

```
function factorial(n) {
  var product = 0; // B
  for (var i = 1; i <= n; i++) {
    product += i;
  }
  return product; // A
}
```

Você está pausado em `A`. Depois de clicar em **Restart Frame**, você seria
pausado em `B`, sem precisar definir um breakpoint ou pressionar **Resume script
execution**.

<figure>
  <img src="imgs/restart-frame.png"
    alt="Selecting 'Restart Frame'."/>
  <figcaption>
    <b>Figura 5</b>. Seleção de <b>Restart Frame</b>
  </figcaption>
</figure>

### Retomar a execução do script {: #resume }

Para continuar a execução de seu script após uma pausa, clique em **Resume
Script Execution** ![Resume Script Execution][resume]{:.devtools-inline}. 
O DevTools executa o script até o próximo breakpoint, se houver.

<figure>
  <img src="imgs/resume-script-execution-outline.svg"
       alt="Selecting 'Resume script execution'."/>
  <figcaption>
    <b>Figura 6</b>. <b>Resume script execution</b>, destacado em azul
  </figcaption>
</figure>

#### Forçar a execução de um script {: #force-resume }

Para ignorar todos os breakpoints e forçar o seu script a retomar a execução,
clique e  mantenha em **Resume Script Execution** ![Resume Script
Execution][resume]{:.devtools-inline} e selecione **Force script execution** ![Force script
execution](imgs/force-script-execution.png){:.devtools-inline}.

<figure>
  <img src="imgs/selecting-force-script-execution.png"
       alt="Selecting 'Force script execution'."/>
  <figcaption>
    <b>Figure 7</b>. Seleção de <b>Force script execution</b>
  </figcaption>
</figure>

### Alterar o contexto de thread {: #threads }

Ao trabalhar com web workers ou service workers, clique em um contexto listado
no painel Threads para alternar para esse contexto. O ícone da seta azul
representa  qual contexto está selecionado no momento.


<figure>
  <img src="imgs/threads.svg" alt="The Threads pane."/>
  <figcaption>
    <b>Figura 8</b>. O painel Threads, destacado em azul
  </figcaption>
</figure>

Por exemplo, suponha que você está pausado em um breakpoint no script principal
e em um script do service worker. Você deseja visualizar as propriedades locais
e globais para o contexto do service worker, mas o painel Sources está mostrando
o contexto do script principal. Ao clicar em service worker no painel  Threads,
você poderá alternar para esse contexto.

## Visualize e edite propriedades locais, globais e closures {: #scope }

Enquanto pausado em uma linha de código, use o painel Scope para visualizar e
editar os valores de propriedades e variáveis nos escopos local, global e
closures.

- Clique duas vezes em um valor de propriedade para alterá-lo.
- Propriedades não enumeráveis são ignoradas.

<figure>
  <img src="imgs/scope.svg" alt="The Scope pane."/>
  <figcaption>
    <b>Figura 9</b>. O painel Scope, destacado em azul
  </figcaption>
</figure>

## Veja a atual pilha de chamadas {: #call-stack }

Enquanto pausado em uma linha de código, use o painel Call Stack para visualizar
a pilha de chamadas que o levou até este ponto.

Se você estiver trabalhando com código assíncrono, marque o parâmetro **Async**
para habilitar as pilhas de chamadas assíncronas.

Clique em uma linha da pilha para ir a linha de código da qual essa função foi
chamada. O ícone da seta azul representa qual função que o DevTools está
destacando no momento.

<figure>
  <img src="imgs/call-stack.svg"
    alt="The Call Stack pane."/>
  <figcaption>
    <b>Figura 10</b>. O painel Call Stack, destacado em azul
  </figcaption>
</figure>

Nota: Quando não estiver em pausa numa linha de código, o painel Call Stack
estará vazio.

### Copiar o rastreamento de pilha {: #copy-stack-trace }

{% comment %}  This should be moved to an "Export debug data" H2 section when
there's enough content for that, but there's not right now, so it's here. {%
endcomment %}

Clique com o botão direito do mouse em qualquer lugar no painel Pilha de
chamadas e selecione **Copy stack trace** para copiar a pilha de chamadas atual
para a área de transferência.

<figure>
  <img src="imgs/copy-stack-trace.png"
    alt="Selecting 'Copy Stack Trace'."/>
  <figcaption>
    <b>Figura 11</b>. Seleção de <b>Copy Stack Trace</b>
  </figcaption>
</figure>

Abaixo está um exemplo do resultado:

```
getNumber1 (get-started.js:35)
inputsAreEmpty (get-started.js:22)
onClick (get-started.js:15)
```

## Ignorar script ou um padrão de scripts {: #blackbox }

Um script tem uma caixa preta (blackbox), se você precisar ignorar esse script
durante a depuração. Quando estiver em caixa preta, um script é obscurecido no
painel Call Stack e você nunca entra nas funções do script quando percorre seu
código.

Por exemplo, suponha que você esteja percorrendo este código:

```
function animate() {
  prepare();
  lib.doFancyStuff(); // A
  render();
}
```

`A` é uma biblioteca de terceiros em que você confia. Se tiver certeza de que o
problema que você está depurando não está relacionado à biblioteca de terceiros,
faz sentido usar a caixa preta script.

### Caixa preta de um script no painel Editor {: #editor-blackbox }

Para aplicar a caixa preta em um script no painel Editor:

1. Abra o arquivo.
2. Clique com o botão direito em qualquer lugar.
3. Selecione **Blackbox script**.

<figure>
  <img src="imgs/blackbox-editor-pane.png"
    alt="Blackboxing a script from the Editor pane."/>
  <figcaption>
    <b>Figura 12</b>. Blackbox script no painel Editor
  </figcaption>
</figure>

### Caixa preta de um script no painel Call Stack {: #call-stack-blackbox }

Para aplicar a caixa preta em um script no painel Call Stack:

1. Clique com o botão direito do mouse em uma função do script.
2. Selecione **Blackbox script**.

<figure>
  <img src="imgs/blackbox-call-stack-pane.png"
    alt="Blackboxing a script from the Call Stack pane."/>
  <figcaption>
    <b>Figura 13</b>. Blackbox script no painel Call
  </figcaption>
</figure>

### Scripts de caixa preta nas configurações {: #settings-blackbox }

Adicione uma caixa preta em um único script ou um padrão de scripts em
Configurações:

1. Abra as [configurações](/web/tools/chrome-devtools/ui#settings) (Settings).
2. Vá para a guia **Blackboxing**.
3. Clique em **Add pattern**.
4. Digite o nome do script ou um padrão regex com o nome dos scripts para a
caixa preta.
5. Clique em **Add**.

<figure>
  <img src="imgs/blackbox.png"
    alt="Blackboxing a script from Settings."/>
  <figcaption>
    <b>Figura 14</b>. Blackbox script em Settings
  </figcaption>
</figure>

## Executar snippets de código em qualquer página {: #snippets }

Se você estiver executando o mesmo código de depuração no Console várias vezes,
considere os Snippets. Snippets são scripts executáveis que você cria, armazena
e  executa dentro do DevTools.

Consulte [Executar snippets de código em qualquer
página](/web/tools/chrome-devtools/snippets) para saber mais.

## Assista os valores das expressões personalizadas de JavaScript {: #watch }

Use o painel Watch para observar os valores das expressões personalizadas. Você
pode assistir a qualquer expressão JavaScript válida.

<figure>
  <img src="imgs/watch.svg"
    alt="The Watch pane."/>
  <figcaption><b>Figura 15</b>. O painel Watch, destacado em azul</figcaption>
</figure>

- Clique em **Add Expression** ![Add
  Expression](imgs/add-expression.png){:.devtools-inline} 
  para criar uma nova expressão de observação.
- Clique em **Refresh** ![Refresh](imgs/refresh.png){:.devtools-inline} 
  para atualizar os valores de todas as expressões existentes. Os valores são
  atualizados automaticamente ao percorrer o código.
- Passe o mouse sobre uma expressão e clique em **Delete Expression** ![Delete
  Expression](imgs/delete-expression.png){:.devtools-inline} 
  para excluí-la.

## Tornar um arquivo minificado legível {: #format }

Clique em **Format** ![Format](imgs/format.png){:.devtools-inline} para 
tornar um arquivo minificado legível para humanos.

<figure>
  <img src="imgs/format.svg"
    alt="The Format button."/>
  <figcaption><b>Figura 16</b>. <b>Format</b>, destacado em azul</figcaption>
</figure>

## Editar um script {: #edit }

Ao corrigir um bug, muitas vezes você precisa testar algumas alterações no seu
código  JavaScript. Você não precisa fazer as alterações em uma fonte externa e,
em seguida, recarregar  a página. Você pode editar seu script no DevTools.

Para editar um script:

1. Abra o arquivo no painel Editor do painel Sources.
2. Faça suas alterações no painel Editor.
3. Pressione <kbd>Command</kbd>+<kbd>S</kbd> (Mac) ou
<kbd>Ctrl</kbd>+<kbd>S</kbd> (Windows, Linux) para salvar. O DevTools corrige
todo o arquivo JS no mecanismo JavaScript do Chrome.

 <figure>
   <img src="imgs/editor.svg"
     alt="The Editor pane."/>
   <figcaption><b>Figura 17</b>. O painel Editor, destacado em azul</figcaption>
 </figure>

## Desabilitar JavaScript {: #disable }

Consulte [Desativar JavaScript com DevTools do
Chrome](/web/tools/chrome-devtools/javascript/disable).

## Comentários {: #feedback }

{% include "web/_shared/helpful.html" %}
