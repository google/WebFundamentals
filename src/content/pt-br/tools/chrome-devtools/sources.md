project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Visualize e edite arquivos, crie snippets, depure o JavaScript e defina espaços de trabalho no painel Sources do Chrome DevTools.

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2018-01-09 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Visão geral do painel Sources {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Use o painel **Sources** do Chrome DevTools para:

* [visualizar arquivos](#files);
* [editar CSS e JavaScript](#edit);
* [criar e salvar **snippets** de JavaScript](#snippets), que podem ser executados em qualquer página.
  Os **snippets** são parecidos com bookmarklets;
* [depurar o JavaScript](#debug);
* [definir um espaço de trabalho](#workspace), para que as alterações que você faça no DevTools sejam salvas no código no
 seu sistema de arquivos.

## Visualizar arquivos {: #files }

Use o painel **Network** para visualizar todos os recursos que a página carregou.

<figure>
  <img src="images/sources-network-pane.png"
       alt="O painel Network"/>
  <figcaption>
    <b>Imagem 1</b>. O painel <b>Network</b>
 </figcaption>
</figure>

Como o painel **Network** é organizado:

* O que aparece em primeiro nível, como `top` na <b>Imagem 1</b>, representa um [frame HTML][frame].
  Você encontrará `top` em todas as páginas que visitar. `top` representa o frame do documento
 principal.
* O que aparece em segundo nível, como `developers.google.com` na <b>Imagem 1</b>, representa uma
 [origem][origin].
* O que aparece em terceiro nível, quarto nível e assim por diante, representa os diretórios e recursos
 carregados a partir daquela origem. Por exemplo, na <b>Imagem 1</b> o caminho completo para o
 recurso `devsite-googler-button` é
 `developers.google.com/_static/f6e16de9fa/css/devsite-googler-button`

[frame]: https://www.w3.org/TR/html401/present/frames.html
[origin]: https://www.w3.org/TR/2011/WD-html5-20110525/origin-0.html

Clique em um arquivo no painel **Network** para visualizar seu conteúdo no painel **Editor**. Você
pode visualizar qualquer tipo de arquivo. Para imagens, você vê uma visualização da imagem.

<figure>
  <img src="images/sources-editor-pane.png"
       alt="Visualizar um arquivo no painel Editor"/>
  <figcaption>
    <b>Imagem 2</b>. Visualizar o conteúdo de <code>jquery-bundle.js</code> no painel <b>Editor</b>
    
 </figcaption>
</figure>

## Editar CSS e JavaScript {: #edit }

Use o painel **Editor** para editar CSS e JavaScript.  O DevTools atualiza a
página para executar o novo código. Por exemplo, se editar a `background-color` de um elemento, você
verá essa mudança em vigor imediatamente.

<figure>
  <img src="images/edit-css.gif"
       alt="Editar CSS no painel Editor"/>
  <figcaption>
    <b>Imagem 3</b>. Editar CSS no painel <b>Editor</b> para alterar a cor de fundo de um
    elemento de azul para vermelho
 </figcaption>
</figure>

As mudanças de CSS entram em vigor imediatamente, sem precisar salvar nada. Para as alterações de JavaScript aparecerem, pressione
<kbd>Command</kbd>+<kbd>S</kbd> (Mac) ou <kbd>Control</kbd>+<kbd>S</kbd> (Windows, Linux).
O DevTools não executa novamente um script, então as únicas alterações de JavaScript que aparecem são aquelas que
você faz dentro das funções. Por exemplo, na <b>Imagem 4</b>, observe como `console.log('A')` não
é executado, enquanto `console.log('B')` é. Se o DevTools gerasse novamente todo o script depois de fazer a
alteração, o texto `A` teria sido registrado no **Console**.

<figure>
  <img src="images/edit-js.gif"
       alt="Editar JavaScript no painel Editor"/>
  <figcaption>
    <b>Imagem 5</b>. Editar JavaScript no painel <b>Editor</b>
 </figcaption>
</figure>

O DevTools apaga as alterações de CSS e JavaScript quando você atualiza a página. Consulte
[Definir um espaço de trabalho](#workspace) para aprender a salvar as alterações no sistema de
arquivos.

## Criar, salvar e executar snippets {: #snippets }

Os snippets são scripts que você pode executar em qualquer página. Imagine que você digita repetidas vezes o
código a seguir no **Console** para inserir a biblioteca jQuery em uma página, de modo que
possa executar comandos jQuery a partir desse **Console**:

    let script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
    script.crossOrigin = 'anonymous';
    script.integrity = 'sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=';
    document.head.appendChild(script);

Por outro lado, você pode salvar esse código em um **snippet** e executá-lo com alguns cliques do botão
a qualquer momento que precisar. O DevTools salva o **snippet** no sistema de arquivos.

<figure>
  <img src="images/snippet.png"
       alt="Um snippet que insere a biblioteca jQuery em uma página."/>
  <figcaption>
    <b>Imagem 6</b>. Um <b>snippet</b> que insere a biblioteca jQuery em uma página
 </figcaption>
</figure>

Para executar um **snippet**:

* Abra o arquivo por meio do painel **Snippets** e clique em **Run** ![O botão Run][run]{:.cdt-inl}.
* Abra o [**Command Menu**][CM], exclua o `>` caractere, digite `!` e o nome do
 **Snippet**. Em seguida, pressione <kbd>Enter</kbd>.

[CM]: /web/tools/chrome-devtools/ui#command-menu
[run]: images/run-snippet.png

Consulte [Executar snippets de código em qualquer página][snip] para saber mais.

[snip]: /web/tools/chrome-devtools/snippets

## Depurar o JavaScript {: #debug }

Em vez de usar `console.log()` para inferir onde o JavaScript está apresentando erros, considere usar
as ferramentas de depuração do Chrome DevTools. A ideia geral é definir um ponto de interrupção, que
é um ponto de parada intencional no código, e acessar a execução do código,
uma linha de cada vez. Ao acessar o código, você pode visualizar e alterar os valores de todas as
propriedades e variáveis atualmente definidas, executar o JavaScript no **Console** e mais.

Consulte [Primeiros passos com a depuração do JavaScript](/web/tools/chrome-devtools/javascript/) para aprender o
básico sobre a depuração no DevTools.

<figure>
  <img src="images/debugging.png"
       alt="Depurar o JavaScript"/>
  <figcaption>
    <b>Imagem 7</b>. Depurar o JavaScript
 </figcaption>
</figure>

## Definir um espaço de trabalho {: #workspace }

Por padrão, ao editar um arquivo no painel **Sources**, essas alterações são perdidas quando
a página é atualizada. Os **espaços de trabalho** permitem salvar as alterações feitas no DevTools no
sistema de arquivos. Essencialmente, isso permite que você use o DevTools como seu editor de códigos.

Consulte [Configurar persistência com os espaços de trabalho do DevTools][WS] para dar os primeiros passos.

[WS]: /web/tools/chrome-devtools/workspaces/

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
