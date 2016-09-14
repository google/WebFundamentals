project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprenda a suavizar e dar peso às suas animações.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-08-08 #}

# The Basics of Easing {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}


Nada na natureza se move linearmente de um ponto para o outro. Na realidade, as coisas tendem a acelerar ou desacelerar conforme se movem. Nossos cérebros esperam esse tipo de movimento, portanto, ao criar uma animação, isso essa informação a seu favor. O movimento natural fará com que o usuário se sinta mais confortável com seus aplicativos, que por sua vez levará a uma melhor experiência geral.

## TL;DR {: .hide-from-toc }
- Easing deixa suas animações mais naturais.
- Selecione animações ease-out para elementos da interface do usuário.
- 'Evite animações ease-in ou ease-in-out, a não menos que sejam curtas; elas tendem a parecer lentas para os usuários finais.'


Na animação clássica, os termos para movimentos que começam lentamente e aceleram é “acelerar” e aqueles que começam rapidamente e desaceleram são chamados de “desacelerar”. Mas a terminologia mais comum na Web é “ease in” e “ease out”, respectivamente. Algumas vezes os dois são combinados, o que é chamado de “ease in out”. Portanto, easing é na verdade o processo de tornar a animação menos dura ou marcada.

## Palavras-chaves de easing

As transições e animações CSS permitem [escolher o tipo de easing a ser usado em animações]({{site.fundamentals}}/look-and-feel/animations/choosing-the-right-easing.html). Palavras-chave que afetam o easing (ou timing, como é chamado às vezes) da animação em questão podem ser usadas. Pode-se também [personalizar completamente um easing]({{site.fundamentals}}/look-and-feel/animations/custom-easing.html), o que proporciona mais liberdade para expressar a personalidade do seu aplicativo.

Estas são algumas palavras-chave que podem ser usadas em CSS:

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

Fonte: [Transições CSS, W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

Você também pode usar uma palavra-chave `steps`, que permite criar transições com etapas distintas. As palavras-chave listadas acima são indicadas para animações naturais, que é exatamente o efeito desejado.

## Animações lineares

Animações sem nenhum tipo de easing são chamadas de **linear**. Um gráfico de uma transição linear é assim:

<img src="imgs/linear.png" style="max-width: 300px" alt="Curva de animação ease linear." />

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/animations/box-move-linear.html">Veja uma animação linear.</a>

Conforme o tempo passa, o valor aumenta na mesma proporção. Com o movimento linear, obtém-se um aspecto robótico e não natural. Isso é algo que choca o usuário. Em linhas gerais, evite movimentos lineares.

Se estiver codificando suas animações com CSS ou JavaScript, sempre há uma opção melhor do que o movimento linear. Para obter o efeito acima com CSS, o código seria o seguinte:


    transition: transform 500ms linear;
    


## Animações ease-out

O ease out faz com que a animação comece mais rapidamente do que na linear, e também tenha uma desaceleração no final.

<img src="imgs/ease-out.png" style="max-width: 300px" alt="Curva de animação ease-out." />

Há várias formas de se obter um efeito ease out, mas o mais simples é a palavra-chave `ease-out` no CSS:


    transition: transform 500ms ease-out;
    

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/animations/box-move-ease-out.html">Veja uma animação ease-out.</a>

Ease out é geralmente melhor para o trabalho da interface do usuário, porque o início rápido dá uma sensação de resposta à sua animação, enquanto permite uma pequena desaceleração natural no final.

## Animações ease-in

Animações ease-in começam de forma lenta e terminam rapidamente, diferente do ease-out.

<img src="imgs/ease-in.png" style="max-width: 300px" alt="Curva de animação do ease-in." />

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/animations/box-move-ease-in.html">Veja uma animação ease-in.</a>

Esse tipo de animação é como uma pedra pesada caindo, onde começa lentamente e atinge o chão rapidamente com uma batida mortal.

Para usar uma animação ease-in, da mesma forma que as animações ease-out e lineares, você pode usar a palavra-chave:


    transition: transform 500ms ease-in;
    

No entanto, de um ponto de vista da interação, os ease-ins podem parecer um pouco incomuns por causa de seu término súbito; coisas que se movem no mundo real tendem a desacelerar em vez de simplesmente parar de repente. Ease-ins também têm o efeito prejudicial de parecer lento no início, o que também impacta negativamente a percepção de resposta em seu site ou aplicativo.

## Animações ease-in-out

Ease in e out são semelhantes a um carro acelerando e desacelerando e, se usado com consciência, podem proporcionar um efeito mais dramático do que apenas o ease out.

<img src="imgs/ease-in-out.png" style="max-width: 300px" alt="Curva de animação do ease-in-out." />

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/animations/box-move-ease-in-out.html">Veja uma animação ease-in-out.</a>

Deve-se ter cuidado para não criar animação longa demais, devido à lentidão do início do ease-in na animação. Geralmente, algo entre 300 e 500 ms é indicado, mas o valor exato depende muito do objetivo do seu projeto. Desta forma, início lento, meio rápido e término lento resultarão em maior contraste da animação, o que pode ser bastante satisfatório para o usuário.

Para obter uma animação ease-in-out, você pode usar a palavra-chave do CSS `ease-in-out`:


    transition: transform 500ms ease-in-out;
    


