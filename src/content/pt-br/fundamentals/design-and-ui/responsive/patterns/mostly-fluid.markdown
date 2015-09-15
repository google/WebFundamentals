---
title: "Mostly fluid"
description: "Os padrões de design da Web responsivos estão evoluindo rapidamente, mas há muitos padrões estabelecidos que funcionam bem em dispositivos móveis e desktop"
updated_on: 2014-10-21
---

<p class="intro">
  O padrão mais fluido consiste principalmente em uma grade fluida.  Em telas grandes ou médias, geralmente permanece do mesmo tamanho, apenas ajustando as margens em telas maiores.
</p>

Em telas menores, a grade de fluido causa um refluxo do conteúdo principal,
enquanto as colunas são empilhadas verticalmente.  Uma grande vantagem desse padrão é
que geralmente exige apenas um ponto de interrupção entre telas pequenas e telas
grandes.

{% link_sample _code/mostly-fluid.html %}
  <img src="imgs/mostly-fluid.svg">
  Tente
{% endlink_sample %}

Na exibição menor, cada conteúdo `div` é empilhado verticalmente.  Quando a largura da
tela atinge 600px, o conteúdo principal `div` permanece em `width: 100%`, enquanto o 
`div` secundário é mostrado como duas colunas abaixo do `div` primário.  Acima de
800px, a largura do contêiner `div` torna-se fixa e ele é centralizado na tela.

Estes são alguns dos sites que usam esse padrão:

 * [A List Apart](http://mediaqueri.es/ala/)
 * [Media Queries](http://mediaqueri.es/)
 * [SimpleBits](http://simplebits.com/)


{% include_code src=_code/mostly-fluid.html snippet=mfluid lang=css %}


