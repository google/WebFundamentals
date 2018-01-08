project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Saiba como suavizar e dar peso às suas animações.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Os conceitos básicos de easing {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Nada na natureza se move linearmente de um ponto a outro. Na realidade, as coisas tendem a acelerar ou desacelerar conforme se movem. Nossos cérebros esperam esse tipo de movimento, portanto, ao criar uma animação, use essa informação a seu favor. O movimento natural fará com que o usuário se sinta mais confortável com seus aplicativos, o que, por sua vez, levará a uma melhor experiência geral.

### TL;DR {: .hide-from-toc }
* O easing deixa suas animações mais naturais.
* Selecione animações ease-out para elementos da interface do usuário.
* Evite animações ease-in ou ease-in-out a menos que sejam curtas; elas tendem a parecer lentas para os usuários finais.


Na animação clássica, os termos para movimentos que começam lentamente e aceleram é “slow in” e aqueles que começam rapidamente e desaceleram são chamados de “slow out”. A terminologia mais comum na Web é “ease in” e “ease out”, respectivamente. Algumas vezes os dois são combinados, o que é chamado de "ease in out". Portanto, easing é na verdade o processo de tornar a animação menos dura ou marcada.

## Palavras-chave de easing

As transições e animações CSS permitem que você [escolha o tipo de easing a ser usado em animações](choosing-the-right-easing). Palavras-chave que afetam o easing (ou `timing`, como é chamado às vezes) da animação em questão podem ser usadas. Pode-se também [personalizar completamente um easing](custom-easing), o que proporciona mais liberdade para expressar a personalidade do seu aplicativo.

Estas são algumas palavras-chave que podem ser usadas em CSS:

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

Fonte: [Transições CSS, W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

Você também pode usar uma palavra-chave `steps`, que permite criar transições com etapas distintas. No entanto, as palavras-chave listadas acima são indicadas para animações naturais.

## Animações lineares

<div class="attempt-right">
  <figure>
    <img src="images/linear.png" alt="Curva de animação com ease linear." />
  </figure>
</div>

Uma animação sem nenhum tipo de easing é chamada de **linear**. Um gráfico de uma transição linear é assim:

Conforme o tempo passa, o valor aumenta na mesma proporção. Com o movimento linear, obtém-se um aspecto robótico e não natural. Isso é algo que causa estranhamento para o usuário. De modo geral, evite movimentos lineares.

Se estiver codificando suas animações usando CSS ou JavaScript, sempre há uma opção melhor do que o movimento linear. 

[Veja uma animação linear](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-linear.html){: target="_blank" .external }

<div style="clear:both;"></div>

Para obter o efeito acima com CSS, o código seria o seguinte:


    transition: transform 500ms linear;
    


## Animações ease-out

<div class="attempt-right">
  <figure>
    <img src="images/ease-out.png" alt="Curva de animação ease-out." />
  </figure>
</div>

O ease out faz com que a animação comece mais rapidamente do que na linear e também tenha uma desaceleração no final.

O ease out é geralmente melhor para o trabalho na interface do usuário, pois o início rápido dá uma sensação de capacidade de resposta à sua animação, permitindo uma desaceleração natural no final.

[Veja uma animação ease-out](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-out.html){: target="_blank" .external }

<div style="clear:both;"></div>

Há várias formas de se obter um efeito ease out, mas o mais simples é a palavra-chave `ease-out` no CSS:


    transition: transform 500ms ease-out;
    


## Animações ease-in

<div class="attempt-right">
  <figure>
    <img src="images/ease-in.png" alt="Curva de animação ease-in." />
  </figure>
</div>

Animações ease-in começam de forma lenta e terminam rapidamente, o que é o oposto do ease-out.

Esse tipo de animação é como uma pedra pesada caindo, onde começa lentamente e atinge o chão rapidamente com um baque ensurdecedor.

No entanto, de um ponto de vista da interação, os ease-ins podem parecer um pouco incomuns por causa de seu término súbito; coisas que se movem no mundo real tendem a desacelerar em vez de simplesmente parar repentinamente. Ease-ins também têm o efeito prejudicial de parecerem lentos no início, o que também afeta negativamente a percepção de resposta do seu site ou aplicativo.

[Veja uma animação ease-in](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in.html){: target="_blank" .external }

<div style="clear:both;"></div>

Para usar uma animação ease-in, da mesma forma que as animações ease-out e lineares, você pode usar a palavra-chave:


    transition: transform 500ms ease-in;
    

## Animações ease-in-out

<div class="attempt-right">
  <figure>
    <img src="images/ease-in-out.png" alt="Curva de animação ease-in-out." />
  </figure>
</div>

O ease in e out é semelhante a um carro acelerando e desacelerando e, se usado com consciência, podem proporcionar um efeito mais dramático do que apenas o ease out.

Não crie uma animação longa demais devido à lentidão do início do ease-in na animação. O intervalo de 300 a 500 ms é geralmente adequado, mas o valor exato depende muito do seu projeto específico. Desta forma, início lento, meio rápido e término lento resultarão em maior contraste da animação, o que pode ser bastante satisfatório para o usuário.

[Veja uma animação ease-in-out](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in-out.html){: target="_blank" .external }

<div style="clear:both;"></div>


Para obter uma animação ease-in-out, você pode usar a palavra-chave do CSS `ease-in-out`:


    transition: transform 500ms ease-in-out;
    




{# wf_devsite_translation #}
