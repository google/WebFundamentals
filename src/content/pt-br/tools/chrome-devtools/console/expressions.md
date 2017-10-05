project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Explore o estado de todos os itens da sua página pelo console do DevTools.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Avaliar expressões {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}
Explore o estado de todos os itens da sua página pelo console do DevTools usando um dos recursos de avaliação.

O console do DevTools permite conhecer o estado dos itens
da sua página de maneira específica para esse fim.
Avalie qualquer expressão que puder digitar usando uma combinação
do seu conhecimento de JavaScript e diversos recursos de apoio.


### TL;DR {: .hide-from-toc }
- Avalie uma expressão apenas digitando-a.
- Selecione elementos usando um dos atalhos.
- Inspecione elementos de DOM e objetos de pilha JavaScript usando  <code>inspect()</code>.
- Acesse elementos e objetos selecionados recentemente usando $0 - 4.


## Navegar expressões

O console avalia qualquer expressão JavaScript que você fornecer
ao pressionar <kbd class="kbd">Enter</kbd>.
Conforme você digita uma expressão,
são exibidas sugestões de nomes de propriedades;
o console também oferece preenchimento automático e de tabulação.

Caso haja várias correspondências,
<kbd class="kbd">↑</kbd> e <kbd class="kbd">↓</kbd> passam por elas. Pressionar <kbd class="kbd">→</kbd> seleciona a sugestão atual.
Se houver uma única sugestão, selecione-a com a tecla
<kbd class="kbd">Tab</kbd>.

![Expressões simples no console.](images/evaluate-expressions.png)

## Selecionar elementos

Use os seguintes atalhos para selecionar elementos:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Atalho &amp; descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Shortcut">$()</td>
      <td data-th="Description">Retorna o primeiro elemento que corresponde ao seletor de CSS especificado. Atalho para  <code>document.querySelector()</code>.</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$$()</td>
      <td data-th="Description">Retorna uma matriz de todos os elementos que correspondem ao seletor de CSS especificado. Alias para  <code>document.querySelectorAll()</code>.</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$x()</td>
      <td data-th="Description">Retorna uma matriz de elementos que corresponde ao XPath especificado.</td>
    </tr>
  </tbody>
</table>

Exemplos de seleção de destino:

    $('code') // Returns the first code element in the document.
    $$('figure') // Returns an array of all figure elements in the document.
    $x('html/body/p') // Returns an array of all paragraphs in the document body.

## Inspecionar elementos de DOM e objetos de pilha JavaScript

A função `inspect()` aceita um elemento de DOM ou uma referência JavaScript
como parâmetro.
Se você fornecer um elemento de DOM,
o DevTools acessará o painel Elements e exibirá esse elemento.
Se você fornecer uma referência JavaScript,
ele acessará o painel Profile.

Quando esse código é executado no seu console nesta página,
ele captura esse valor e o exibe no painel Elements.
Isso aproveita a propriedade `$_`
para obter a saída da última expressão avaliada.

    $('[data-target="inspecting-dom-elements-example"]')
    inspect($_)

## Acessar elementos e objetos selecionados recentemente

O console armazena os cinco últimos elementos e objetos usados
em variáveis para facilitar o acesso.
Use $0 - 4,
para acessar esses elementos pelo console.
Lembre-se de que computadores começam a contar do 0;
isso significa que o item mais recente é $0 e o mais antigo é $4.


{# wf_devsite_translation #}
