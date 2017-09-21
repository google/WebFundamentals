project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "HTML tem uma meta tag de janela de visualização".

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# HTML tem uma meta tag de janela de visualização {: .page-title }

## Por que a auditoria é importante {: #why }

Sem uma meta tag de janela de visualização, os dispositivos móveis renderizam páginas nas larguras de tela
típicas de desktop e depois ajustam a escala das páginas para as telas dos dispositivos móveis. A definição da
janela de visualização permite controlar sua largura e escala.
Consulte os links a seguir para saber mais:

* [Configurar a janela de visualização](/speed/docs/insights/ConfigureViewport).
* [Definir a janela de visualização](/web/fundamentals/design-and-ux/responsive/#set-the-viewport).

## Como ser aprovado na auditoria {: #how }

Adicione uma tag `<meta>` à janela de visualização no `<head>` do HTML.

    <head>
      ...
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ...
    </head>

O par chave-valor `width=device-width` define a largura da janela de visualização como
a largura do dispositivo. O par chave-valor `initial-scale=1` define o nível inicial de
zoom ao acessar a página.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse verifica se existe uma tag `<meta name="viewport">` no `<head>`
do documento. Além disso, verifica se o nó contém um atributo `content`
e se o valor desse atributo contém o texto `width=`. No entanto,
ele não verifica se `width` é igual a `device-width`. O Lighthouse também não
verifica a existência de um par chave-valor `initial-scale`.


{# wf_devsite_translation #}
