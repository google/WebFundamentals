---
title: "Column Drop"
description: "Os padrões de design da Web responsivos estão evoluindo rapidamente, mas há muitos padrões estabelecidos que funcionam bem em dispositivos móveis e desktop"
updated_on: 2014-10-21
---

<p class="intro">
  Para layouts de várias colunas de largura completa, a queda da coluna simplesmente empilha as colunas verticalmente conforme a largura da janela fica estreita demais para o conteúdo.  
</p>

Eventualmente
isso resultará em todas as colunas empilhadas verticalmente.  Selecionar
pontos de interrupção para este padrão de layout depende do conteúdo e é muda de acordo com
 o design.

{% link_sample _code/column-drop.html %}
  <img src="imgs/column-drop.svg">
  Tente
{% endlink_sample %}


Como a amostra mais fluida, o conteúdo é empilhado verticalmente na menor
visualização, mas conforme a tela se expande além de 600px, o 
`div` do conteúdoprimário e secundário utiliza a largura total da tela.  A ordem do `div` é definida usando
a ordem da propriedade CSS.  Em 800px, todos os três conteúdos de `div` são mostrados, usando a
largura total da tela.

Estes são alguns dos sites que usam esse padrão:

 * [Modernizr](http://modernizr.com/)
 * [Wee Nudge](http://weenudge.com/)

{% include_code src=_code/column-drop.html snippet=cdrop lang=css %}


