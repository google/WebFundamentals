project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: A Command Line API do Chrome DevTools oferece diversas maneiras de observar e inspecionar detectores de evento

{# wf_updated_on: 2015-08-02 #}
{# wf_published_on: 2015-04-13 #}

# Monitorar eventos {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
A Command Line API do Chrome DevTools oferece diversas maneiras de observar e inspecionar detectores de evento. O JavaScript desempenha um papel central em páginas interativas, e o navegador fornece algumas ferramentas úteis para depurar eventos e gerenciadores de evento.


### TL;DR {: .hide-from-toc }
- Detecte eventos de um determinado tipo usando  <code>monitorEvents()</code>.
- Use  <code>unmonitorEvents()</code> para interromper a detecção.
- Conheça os detectores de um elemento de DOM usando  <code>getEventListeners()</code>.
- Use o painel Event Listeners Inspector para obter informações sobre detectores de evento.


## Monitorar eventos

O método [monitorEvents()](/web/tools/chrome-devtools/debug/command-line/command-line-reference#monitoreventsobject-events)
instrui o DevTools a registrar informações sobre os destinos especificados.

O primeiro parâmetro é o objeto a ser monitorado.
Todos os eventos são retornados se o segundo parâmetro não for fornecido.
Para especificar eventos a serem detectados,
passe uma string ou uma matriz de strings como o segundo parâmetro.

Detecte eventos de clique no corpo da página:

    monitorEvents(document.body, "click");

Se o evento monitorado for um *tipo de evento*
com suporte que o DevTools mapear para um conjunto de nomes de evento padrão,
o método detecta os eventos desse tipo.

A [Command Line API](/web/tools/chrome-devtools/debug/command-line/command-line-reference) tem um mapeamento completo de *tipos de evento* para os eventos suportados.

Para interromper o monitoramento de eventos,
chame o método `unmonitorEvents()` e forneça a ele o objeto para interromper o monitoramento.

Pare de detectar eventos no objeto `body`:

    unmonitorEvents(document.body);

## Visualizar detectores de evento registrados em objetos

A [getEventListeners() API](/web/tools/chrome-devtools/debug/command-line/command-line-reference#geteventlistenersobject)
retorna os detectores de objetos registrados no objeto especificado.

O valor de retorno é um objeto que contém uma matriz para cada tipo de evento registrado (`click` ou `keydown`, por exemplo).
Os membros de cada matriz são objetos que descrevem
o detector registrado para cada tipo.
Por exemplo,
o código a seguir lista todos os detectores de evento registrados no objeto document:

    getEventListeners(document);

![Resultado por usar getEventListeners()](images/events-call-geteventlisteners.png)

Se mais de um detector estiver registrado no objeto especificado,
a matriz contém um membro para cada detector.
No exemplo a seguir,
há dois detectores de evento registrados no elemento #scrollingListpara o evento `mousedown`:

![Visualização dos detectores de evento conectados a mousedown](images/events-geteventlisteners_multiple.png)

Expanda cada um desses objetos para explorar suas propriedades:

![Vista expandida de objeto de detector](images/events-geteventlisteners_expanded.png)

## Visualizar detectores de evento registrados em elementos DOM

Por padrão,
o painel *Event Listeners* no Elements Inspector mostra todos os eventos conectados a uma página:

![Painel Event listeners](images/events-eventlisteners_panel.png)

O filtro limita os eventos a apenas o nó selecionado:

![Painel Event listeners, filtrado apenas pelo nó selecionado](images/events-eventlisteners_panel_filtered.png)

Ao expandir o objeto, o painel mostra os detalhes do detector de evento.
Neste exemplo,
a página tem dois detectores de evento conectados via jQuery:

![Visualização expandida dos detectores de evento](images/events-eventlisteners_panel_details.png)



{# wf_devsite_translation #}
