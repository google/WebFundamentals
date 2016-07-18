---
title: "Monitore Eventos"
description: "A API da Linha de Comandos do Chrome DevTools oferece várias maneiras de observar e inspecionar ouvintes de eventos"
updated_on: 2015-08-03
translation_priority: 0
translators:
  - alan
key-takeaways:
  command-line:
    - "Ouça eventos de um certo tipo usando <code>monitorEvents()</code>."
    - "Use <code>unmonitorEvents()</code> para parar de ouvir."
    - "Pegue os ouvintes de um elemento do DOM usando <code>getEventListeners()</code>."
    - "Use o painel Event Listeners para obter informações sobre os event listeners."
---
<p class="intro">
  A API da Linha de Comandos do Chrome DevTools oferece várias maneiras de observar e inspecionar ouvintes de eventos.
  O JavaScript exerce um papel central nas páginas interativas, e o browser fornece algumas ferramentas úteis para debugar eventos e manipuladores de eventos.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.command-line %}

## Monitore eventos

O método [monitorEvents()](/web/tools/chrome-devtools/debug/command-line/command-line-reference#monitoreventsobject-events)
instrui o DevTools para fazer log de informações em alvos específicos.

O primeiro parâmetro é o objeto a ser monitorado.
Todos os eventos retornam se o segundo parâmetro não for fornecido.
Para especificar quais eventos devem ser ouvidos,
passe uma string ou um array de strings como segundo parâmetro.

Ouça aos eventos de clique no corpo da página:

    monitorEvents(document.body, "click");

Se o evento monitorado é um *tipo de evento* suportado
que o DevTools mapeia para um conjunto de nomes de evento padrão,
então o metódo ouve os eventos daquele tipo.

A [API da Linha de Comandos](/web/tools/chrome-devtools/debug/command-line/command-line-reference) tem um mapeamento completo dos *tipos de eventos* dos eventos que ela cobre.

Para parar de monitorar eventos,
chame o método `unmonitorEvents()` e dê a ele o objeto para parar o monitoramento.

Pare de ouvir eventos no objeto `body`:

    unmonitorEvents(document.body);

## Veja os ouvintes de evento registrados em um objeto

A [API getEventListeners()](/web/tools/chrome-devtools/debug/command-line/command-line-reference#geteventlistenersobject)
retorna os ouvintes de eventos registrados em um objeto específico.

O valor de retorno é um objeto que contém um array para cada tipo de evento registrado (`click` ou `keydown`, por exemplo).
Os membros de cada array são objetos que descrevem
o ouvinte registrado para cada tipo.
Por exemplo,
o código seguinte lista todos os ouvintes de evento registrados no objeto document:

    getEventListeners(document);

![Resultado da utilização do getEventListeners()](images/events-call-geteventlisteners.png)

Se mais de um ouvinte for registrado em um objeto específico,
então o array irá conter um membro para cada ouvinte.
No exemplo seguinte,
há dois ouvintes de eventos registrados no elemento #scrollingList para o evento `mousedown`:

![vista dos ouvintes de evento relacionados ao mousedown](images/events-geteventlisteners_multiple.png)

Amplie ainda mais cada um desses objetos para explorar suas propriedades:

![Visão expandida do ouvinte do objeto](images/events-geteventlisteners_expanded.png)

## Veja ouvintes de eventos registrados em elementos do DOM

Por padrão,
o painel *Event Listeners* no painel Elements mostra todos os eventos ligados em uma página:

![Event listeners panel](images/events-eventlisteners_panel.png)

O filtro limita os eventos apenas para o nó selecionado:

![Event listeners panel, filtered by selected node only](images/events-eventlisteners_panel_filtered.png)

Ao expandir o objeto, o painel mostra os detalhes do ouvinte.
Neste exemplo,
a página tem dois ouvintes de evento ligados via jQuery:

![Expanded view of the event listeners](images/events-eventlisteners_panel_details.png)

