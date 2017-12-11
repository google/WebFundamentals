project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Fragmentos são scripts pequenos que você pode criar e executar dentro do painel Sources do Chrome DevTools. É possível acessar e executá-losem qualquer página. Ao executar um snippet, ele é executado no contexto da página atualmente aberta.

{# wf_updated_on: 2016-06-26 #}
{# wf_published_on: 2015-10-12 #}

# Executar snippets de código em qualquer página {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Fragmentos são scripts pequenos que você pode criar e executar 
dentro do painel Sources do Chrome DevTools. É possível acessar e executá-los
em qualquer página. Ao executar um snippet, ele é executado no contexto da 
página atualmente aberta.

Se você usa pequenos utilitários ou scripts de depuração 
repetidamente em diversas páginas, considere salvar os scripts como snippets.
Você também pode usar snippets como uma alternativa para 
[bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet).


### TL;DR {: .hide-from-toc }
- Snippets são scripts pequenos que você pode executar em qualquer página (parecidos com os bookmarklets).
- Execute partes de snippets no Console com o recurso "Evaluate in Console".
- Lembre-se de que recursos populares do painel Sources, como pontos de interrupção, também funcionam com snippets.


## Criar snippet

Para criar um snippet, abra o painel **Sources**, clique na guia **Snippets**,
clique com o botão direito no Navigator e selecione **New**.

![criar snippet](images/create-snippet.png)

Insira seu código no editor. Quando tiver mudanças não salvas, o nome do seu
script terá um asterisco próximo a ele, como na imagem abaixo.
Pressione <kbd>Command</kbd>+<kbd>S</kbd> (Mac) ou <kbd>Ctrl</kbd>+<kbd>S</kbd>
(Windows, Linux) para salvar as alterações. 

![snippet não salvo](images/unsaved-snippet.png)

## Executar snippet

Existem três maneiras de executar um snippet: 

* Clique com o botão direito no nome do arquivo do fragmento (no painel à esquerda que lista
  todos os fragmentos) e selecione **Run**.
* Clique no botão **Run** (![botão run snippet 
](images/run.png){:.inline}).
* Pressione <kbd>Command</kbd>+<kbd>Enter</kbd> (Mac) ou 
 <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (Windows, Linux).

Para avaliar uma parte do snippet no Console, destaque essa 
parte, clique com o botão direito em qualquer lugar no editor e selecione **Evaluate in 
Console** ou use o atalho de teclado 
<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> (Mac) ou
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> (Windows, Linux).

![avaliar no console](images/evaluate-in-console.png)

## Visualizar modificações locais

<!-- TODO apply revision content doesn't really work... -->

Para visualizar uma comparação das modificações que fez em um snippet, clique com o botão direito 
no editor (com o snippet em exibição) e selecione **Local modifications**

![modificações locais](images/local-modifications.png)

Uma nova guia chamada **History** é exibida na gaveta do Console.

![histórico do snippet](images/snippet-history.png)

Cada timestamp representa uma modificação. Expanda o quilate próximo a
uma marcação de data e hora para visualizar uma comparação das modificações nesse momento.
O link **revert** remove o histórico de revisão. A partir de 27 de junho de 2016, os
links **apply revision content** e **apply original content** parecem
não funcionar como devem.

## Definir pontos de interrupção

Assim como com outros scripts, você pode definir pontos de interrupção em snippets. Consulte
[Adicionar pontos de interrupção](/web/tools/chrome-devtools/debug/breakpoints/add-breakpoints)
para saber como adicionar pontos de interrupção pelo painel **Sources**.


{# wf_devsite_translation #}
