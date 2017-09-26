project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Entenda melhor as animações e sua utilização em aplicativos e sites modernos.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Animações {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

As animações são uma parte significativa do que torna aplicativos da Web e sites atraentes. O usuário espera interfaces altamente responsivas e interativas. No entanto, animar sua interface não é necessariamente simples. O que deve ser animado, quando e qual tipo de efeito a animação deve produzir?


### TL;DR {: .hide-from-toc }
* Use animações como uma forma de dar vida aos seus projetos.
* As animações devem auxiliar na interação do usuário.
* Tenha cuidado com quais propriedades animar; algumas são mais caras do que outras.


## Selecione os elementos certos para animar

Ótimas animações dão um toque de diversão e envolvimento aos usuários dos seus projetos. Você pode animar praticamente tudo que quiser: seja larguras, alturas, posições, cores ou planos de fundo. No entanto, precisará conhecer os possíveis estrangulamentos de desempenho e como as animações afetarão a personalidade do seu aplicativo. Animações oscilantes ou mal escolhidas podem afetar negativamente a experiência do usuário. Portanto, elas precisam ter bom desempenho e serem adequadas.

## Use animações para apoiar interações

Não crie uma animação desnecessária; isso incomoda os usuários e é obstrutivo. Em vez disso, use animações estrategicamente para _reforçar_ as interações do usuário. Se ele tocar no ícone de menu, deslizar para revelar uma gaveta de navegação ou tocar em um botão, você pode usar um brilho ou bounce sutil para confirmar a interação. Evite animações que interrompam ou obstruam desnecessariamente a atividade do usuário.

## Evite animar propriedades caras

Pior do que animações que são mal posicionadas são aquelas que causam oscilação na página. Esse tipo de animação frustra os usuários e faz com que eles desejem que elas não existissem.

Algumas propriedades são mais caras para mudar do que outras e, portanto, provavelmente causarão mais oscilações. Por exemplo, mudar o `box-shadow` de um elemento exigirá uma operação de pintura muito mais cara do que mudar, por exemplo, a cor de texto. Da mesma forma, mudar o atributo `width` de um elemento talvez seja mais caro do que mudar seu `transform`.

Saiba mais sobre o desempenho das animações no guia [Animações e desempenho](animations-and-performance), mas, caso queira que o TL;DR permaneça para mudanças de transformações e opacidades, utilize `will-change`. Para saber exatamente qual trabalho é acionado com a animação de uma determinada propriedade, consulte [Acionadores CSS](http://csstriggers.com).


{# wf_devsite_translation #}
