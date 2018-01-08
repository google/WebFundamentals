project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Conteúdo dimensionado corretamente para a janela de visualização".

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Conteúdo dimensionado corretamente para a janela de visualização  {: .page-title }

## Por que a auditoria é importante {: #why }

Esta auditoria verifica se a largura do conteúdo de uma página é igual
à largura da janela de visualização. A largura do conteúdo menor ou maior que
a da janela de visualização muitas vezes indica que a página não está otimizada para
telas de dispositivos móveis.

## Como ser aprovado na auditoria {: #how }

Esta auditoria é uma forma indireta de determinar se a página está otimizada para
dispositivos móveis. Se o site não estiver otimizado e você quiser otimizá-lo, consulte
[Princípios básicos do Web design responsivo](/web/fundamentals/design-and-ux/responsive/)
para começar.

Você poderá ignorar esta auditoria se:

* O site não precisar ser otimizado para telas de dispositivos móveis.
* A largura do conteúdo da página é intencionalmente menor ou maior que a
  da janela de visualização.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

A auditoria será aprovada se `window.innerWidth === window.outerWidth`.


{# wf_devsite_translation #}
