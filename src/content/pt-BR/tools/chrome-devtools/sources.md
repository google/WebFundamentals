project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: View and edit files, create Snippets, debug JavaScript, and set up Workspaces in the Sources panel of Chrome DevTools.

{# wf_blink_components: Platform>DevTools #} {# wf_updated_on: 2019-01-30 #} {#
wf_published_on: 2018-01-09 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Visão geral do painel Sources {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Use o painel **Sources** do Chrome DevTools para:

- [Visualizar arquivos](#files).
- [Editar CSS e JavaScript](#edit).
- [Criar e salvar **Snippets** de JavaScript](#snippets), que você pode executar
em qualquer página. **Snippets** são semelhantes à bookmarklets.
- [Depurar JavaScript](#debug).
- [Configurar um Workspace](#workspace), para que as alterações feitas no
DevTools sejam salvas no código do seu sistema de arquivos.

## Visualize arquivos {: #files }

Use o painel **Page** para visualizar todos os recursos que a página carregou.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/images/sources-page-pane.png?raw=true"
alt="The Page pane">
  <figcaption>
    <b>Figure 1</b>. The <b>Page</b> pane
  </figcaption>
</figure>

Como o painel **Page** é organizado:

- The top-level, such as `top` in <b>Figure 1</b>, represents an [HTML
frame](https://www.w3.org/TR/html401/present/frames.html).You'll find `top` on
every page that you visit. `top` represents the main documentframe.
- O segundo nível, como `developers.google.com` na <b>Figura 1</b>, representa
uma [origem](https://www.w3.org/TR/2011/WD-html5-20110525/origin-0.html).
- The third-level, fourth-level, and so on, represent directories and resources
thatwere loaded from that origin. For example, in <b>Figure 1</b> the full path
to theresource `devsite-googler-button`
is`developers.google.com/_static/19aa27122b/css/devsite-googler-button`

Clique em um arquivo no painel **Page** para visualizar seu conteúdo no painel
**Editor**. Você pode ver qualquer tipo de arquivo. Para imagens, você visualiza
uma prévia da imagem.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/images/sources-editor-pane.png?raw=true"
alt="Viewing a file in the Editor pane">
  <figcaption>
    <b>Figure 2</b>. Viewing the contents of <code>jquery-bundle.js</code> in
the <b>Editor</b>
    pane
  </figcaption>
</figure>

## Edite CSS e JavaScript {: #edit }

Use o painel **Editor** para editar CSS e JavaScript. O DevTools atualiza a
página para executar seu novo código. Por exemplo, se você editar o
`background-color` de um elemento, verá  que a alteração entrará em vigor
imediatamente.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/images/edit-css.gif?raw=true"
alt="Editing CSS in the Editor pane">
  <figcaption>
    <b>Figure 3</b>. Editing CSS in the <b>Editor</b> pane to change the
background color of an
    element from blue to red
  </figcaption>
</figure>

As alterações de CSS entram em vigor imediatamente, sem a necessidade de salvar.
Em JavaScript, para que as alterações entrem em vigor, pressione
<kbd>Command</kbd>+<kbd>S</kbd> (Mac) ou <kbd>Control</kbd>+<kbd>S</kbd>
(Windows, Linux).  O DevTools não executa novamente um script, portanto, as
únicas alterações de JavaScript que são concretizadas, são aquelas  que você
cria dentro de funções. Por exemplo, na <b>Figura 4</b> observe como
`console.log('A')` não é  executado, enquanto `console.log('B')` é executado. Se
o DevTools executasse novamente o script inteiro depois de fazer a  alteração, o
texto `A` teria sido registrado no **Console**.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/images/edit-js.gif?raw=true"
alt="Editing JavaScript in the Editor pane">
  <figcaption>
    <b>Figure 4</b>. Editing JavaScript in the <b>Editor</b> pane
  </figcaption>
</figure>

O DevTools apaga suas alterações de CSS e JavaScript quando você recarrega a
página. Consulte  [Configurar Workspace](#workspace) para aprender como salvar
as alterações no seu sistema de arquivos.

## Crie, salve e execute Snippets {: #snippets }

Snippets são scripts que você pode executar em qualquer página. Imagine que você
digite repetidamente o  seguinte código no **Console**, para inserir a
biblioteca jQuery em uma página, com isso, você pode executar comandos jQuery a
partir do **console**:

```
let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
script.crossOrigin = 'anonymous';
script.integrity = 'sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=';
document.head.appendChild(script);
```

Em vez disso, você pode salvar esse código em um **Snippet** e executá-lo com
alguns cliques,  sempre que precisar. O DevTools salva o **Snippet** no seu
sistema de arquivos.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/images/snippet.png?raw=true"
alt="A Snippet that inserts the jQuery library into a page.">
  <figcaption>
    <b>Figure 5</b>. A <b>Snippet</b> that inserts the jQuery library into a
page
  </figcaption>
</figure>

Para executar um **Snippet**:

- Abra o arquivo por meio do painel **Snippets** e clique em **Run** ![The Run
button](https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/images/run-snippet.png?raw=true){:
.cdt-inl}.
- Abra [**Command Menu**](/web/tools/chrome-devtools/ui#command-menu), apague o
caractere `>`, digite `!`, digite o nome do seu **Snippet** e pressione
<kbd>Enter</kbd>.

Consulte [Executar Snippets em qualquer
página](/web/tools/chrome-devtools/snippets) para saber mais.

## Depure JavaScript {: #debug }

Em vez de usar `console.log()` para inferir onde seu JavaScript está errado,
considere usar  as ferramentas de depuração do Chrome DevTools. A idéia é
definir um breakpoint, que  é um ponto de parada intencional no seu código, em
seguida, percorrê-lo,  uma linha por vez. Conforme você percorre o código, é
possível visualizar e alterar os valores de todas as  propriedades e variáveis
definidas atualmente, executar JavaScript no **Console** e muito mais.

Consulte [Iniciar depuração com
JavaScript](/web/tools/chrome-devtools/javascript/) para aprender as noções
básicas de depuração no DevTools.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/images/debugging.png?raw=true"
alt="Debugging JavaScript">
  <figcaption>
    <b>Figure 6</b>. Debugging JavaScript
  </figcaption>
</figure>

## Configure uma Workspace {: #workspace }

Por padrão, quando você edita um arquivo no painel **Sources**, essas alterações
são perdidas quando você  recarrega a página. **Workspace** permite que você
salve as alterações feitas no DevTools e  no seu sistema de arquivos.
Essencialmente, isso permite usar o DevTools como seu editor de código.

Consulte [Edite arquivos com Workspace](/web/tools/chrome-devtools/workspaces/)
para começar.

## Comentários {: #feedback }

{% include "web/_shared/helpful.html" %}
