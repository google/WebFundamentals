project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Discover new debugging workflows in this comprehensive reference of Chrome DevTools debugging features.

{# wf_updated_on: 2019-01-31 #} {# wf_published_on: 2017-01-04 #} {#
wf_blink_components: Platform>DevTools #}

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
para o problema que você está depurando, clique em **Step over**![Step
over](https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/step-over.png?raw=true)
{:.devtools-inline} para executar a função sem entrar nela.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/step-over-outline.svg?raw=true"
alt="Selecting 'Step over'.">
  <figcaption>
    <b>Figure 1</b>. <b>Step over</b>, outlined in blue
  </figcaption>
</figure>

For example, suppose you're debugging the following code:

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
relacionada ao problema que você está depurando, clique em **Step into** ![Step
into](https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/step-into.png?raw=true){:.devtools-inline}
para investigar mais essa função.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/step-into-outline.svg?raw=true"
alt="Selecting 'Step into'.">
  <figcaption>
    <b>Figure 2</b>. <b>Step into</b>, outlined in blue
  </figcaption>
</figure>

For example, suppose you're debugging the following code:

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
você está depurando, clique em **Step out** ![Step
out](https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/step-out.png?raw=true){:.devtools-inline}
para executar o restante do código da função.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/step-out-outline.svg?raw=true"
alt="Selecting 'Step out'.">
  <figcaption>
    <b>Figure 3</b>. <b>Step out</b>, outlined in blue
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
Execution](https://github.com/google/WebFundamentals/blob/master/web/tools/chrome-devtools/images/resume-script-execution.png?raw=true){:.devtools-inline},
porém há um caminho mais rápido.

Clique com o botão direito na linha de código em que você está interessado e
selecione **Continue to here**. O DevTools executa todo o código até esse ponto
e, em seguida, faz uma pausa nessa linha.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/continue-to-here.png?raw=true"
alt="Selecting 'Continue to here'.">
  <figcaption>
    <b>Figure 4</b>. Selecting <b>Continue to here</b>
  </figcaption>
</figure>

### Reinicie a função principal na pilha de chamadas {: # restart-frame }

Enquanto estiver em pausa numa linha de código, clique com o botão direito do
mouse em qualquer lugar no painel Call Stack e selecione **Restart Frame** para
pausar na primeira linha da função principal em sua pilha de chamadas. A função
que estiver acima é a última função que foi chamada.

For example, suppose you're stepping through the following code:

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
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/restart-frame.png?raw=true"
alt="Selecting 'Restart Frame'.">
  <figcaption>
    <b>Figure 5</b>. Selecting <b>Restart Frame</b>
  </figcaption>
</figure>

### Retomar a execução do script {: #resume }

Para continuar a execução de seu script após uma pausa, clique em **Resume
Script Execution** ![Resume Script
Execution](https://github.com/google/WebFundamentals/blob/master/web/tools/chrome-devtools/images/resume-script-execution.png?raw=true){:
.devtools-inline}. O DevTools executa o script até o próximo breakpoint, se
houver.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/resume-script-execution-outline.svg?raw=true"
alt="Selecting 'Resume script execution'.">
  <figcaption>
    <b>Figure 6</b>. <b>Resume script execution</b>, outlined in blue
  </figcaption>
</figure>

#### Forçar a execução de um script {: #force-resume }

Para ignorar todos os breakpoints e forçar o seu script a retomar a execução,
clique e  mantenha em **Resume Script Execution** ![Resume Script
Execution](https://github.com/google/WebFundamentals/blob/master/web/tools/chrome-devtools/images/resume-script-execution.png?raw=true){:
.devtools-inline} e selecione **Force script execution** ![Force script
execution](https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/force-script-execution.png?raw=true){:.devtools-inline}.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/selecting-force-script-execution.png?raw=true"
alt="Selecting 'Force script execution'.">
  <figcaption>
    <b>Figure 7</b>. Selecting <b>Force script execution</b>
  </figcaption>
</figure>

### Alterar o contexto de thread {: #threads }

Ao trabalhar com web workers ou service workers, clique em um contexto listado
no painel Threads para alternar para esse contexto. O ícone da seta azul
representa  qual contexto está selecionado no momento.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/threads.svg?raw=true"
alt="The Threads pane.">
  <figcaption>
    <b>Figure 8</b>. The Threads pane, outlined in blue
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

- Double-click a property value to change it.
- Propriedades não enumeráveis são ignoradas.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/scope.svg?raw=true"
alt="The Scope pane.">
  <figcaption>
    <b>Figure 9</b>. The Scope pane, outlined in blue
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
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/call-stack.svg?raw=true"
alt="The Call Stack pane.">
  <figcaption>
    <b>Figure 10</b>. The Call Stack pane, outlined in blue
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
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/copy-stack-trace.png?raw=true"
alt="Selecting 'Copy Stack Trace'.">
  <figcaption>
    <b>Figure 11</b>. Selecting <b>Copy Stack Trace</b>
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

For example, suppose you're stepping through this code:

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

1. Open the file.
2. Right-click anywhere.
3. Selecione **Blackbox script**.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/blackbox-editor-pane.png?raw=true"
alt="Blackboxing a script from the Editor pane.">
  <figcaption>
    <b>Figure 12</b>. Blackboxing a script from the Editor pane
  </figcaption>
</figure>

### Caixa preta de um script no painel Call Stack {: #call-stack-blackbox }

Para aplicar a caixa preta em um script no painel Call Stack:

1. Right-click on a function from the script.
2. Selecione **Blackbox script**.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/blackbox-call-stack-pane.png?raw=true"
alt="Blackboxing a script from the Call Stack pane.">
  <figcaption>
    <b>Figure 13</b>. Blackboxing a script from the Call Stack pane
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
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/blackbox.png?raw=true"
alt="Blackboxing a script from Settings.">
  <figcaption>
    <b>Figure 14</b>. Blackboxing a script from Settings
  </figcaption>
</figure>

## Executar snippets de código em qualquer página {: #snippets }

Se você estiver executando o mesmo código de depuração no Console várias vezes,
considere os Snippets. Snippets são scripts executáveis que você cria, armazena
e  executa dentro do DevTools.

Consulte [Executar snippets de código em qualquer
página](/web/tools/chrome-devtools/snippets) para saber mais.

## Assista os valores das expressões personalizadas de JavaScript {: #watch }

Use the Watch pane to watch the values of custom expressions.
You can watch any valid JavaScript expression.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/watch.svg?raw=true"
alt="The Watch pane.">
  <figcaption><b>Figure 15</b>. The Watch pane, outlined in blue</figcaption>
</figure>

- Clique em **Add Expression** ![Add
Expression](https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/add-expression.png?raw=true){:.devtools-inline}
para criar uma nova expressão de observação.
- Clique em **Refresh**
![Refresh](https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/refresh.png?raw=true){:.devtools-inline}
para atualizar os valores de todas as expressões existentes. Os valores são
atualizados automaticamente ao percorrer o código.
- Passe o mouse sobre uma expressão e clique em **Delete Expression** ![Delete
Expression](https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/delete-expression.png?raw=true){:.devtools-inline}
para excluí-la.

## Tornar um arquivo minificado legível {: #format }

Clique em **Format**
![Format](https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/format.png?raw=true){:.devtools-inline}
para tornar um arquivo minificado legível para humanos.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/format.svg?raw=true"
alt="The Format button.">
  <figcaption><b>Figure 16</b>. <b>Format</b>, outlined in blue</figcaption>
</figure>

## Editar um script {: #edit }

Ao corrigir um bug, muitas vezes você precisa testar algumas alterações no seu
código  JavaScript. Você não precisa fazer as alterações em uma fonte externa e,
em seguida, recarregar  a página. Você pode editar seu script no DevTools.

To edit a script:

1. Abra o arquivo no painel Editor do painel Sources.
2. Make your changes in the Editor pane.
3. Pressione <kbd>Command</kbd>+<kbd>S</kbd> (Mac) ou
<kbd>Ctrl</kbd>+<kbd>S</kbd> (Windows, Linux) para salvar. O DevTools corrige
todo o arquivo JS no mecanismo JavaScript do Chrome.

 <figure>
   <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/javascript/imgs/editor.svg?raw=true"
alt="The Editor pane.">
   <figcaption><b>Figura 17</b>. O painel Editor, destacado em azul</figcaption>
 </figure>


## Desabilitar JavaScript {: #disable }

Consulte [Desativar JavaScript com DevTools do
Chrome](/web/tools/chrome-devtools/javascript/disable).

## Comentários {: #feedback }

{% include "web/_shared/helpful.html" %}
