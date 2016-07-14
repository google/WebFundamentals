---
title: "Animations"
description: "Aprenda mais sobre animações e sua utilização em aplicativos e sites modernos."
updated_on: 2014-10-21
key-takeaways:
  code:
    - "Use animações como uma forma de dar vida aos seus projetos."
    - "As animações devem auxiliar na interação do usuário."
    - "Tenha cuidado com quais propriedades animar; algumas são mais caras do que outras!"

---
<p class="intro">
  Animações são uma parte enorme da criação de aplicativos e sites atraentes. O usuário espera interfaces altamente responsivas e interativas. No entanto, animar sua interface não é simples. O que deve ser animado, quando e qual tipo de efeito a animação deve produzir?
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

## Selecione os elementos certos para animar

Ótimas animações dão um toque de diversão e envolvimento aos seus projetos. Você pode animar praticamente tudo que desejar, seja larguras, alturas, posições, cores ou planos de fundo. Mas precisará conhecer os possíveis estrangulamentos de desempenho e como as animações afetarão a personalidade do seu aplicativo. Animações oscilantes ou mal escolhidas podem afetar negativamente a experiência do usuário. Portanto, elas precisam ter bom desempenho e serem adequadas.

## Use animações para apoiar interações

Não crie uma animação desnecessária; incomoda os usuários e é obstrutivo. Em vez disso, use animações estrategicamente para _reforçar_ as interações do usuário. Se ele tocar no ícone do menu, mostre o menu a partir da lateral da página, ou se tocar em um botão, use um brilho suave ou oscilação para confirmar a interação. Evite animações que interrompam ou obstruam desnecessariamente a atividade do usuário.

## Evite animar propriedades caras

Pior do que animações que são mal posicionadas, são aquelas que causam oscilação na página. O usuário ficará frustrado e insatisfeito e provavelmente irá preferir que não houvesse animação alguma.

Algumas propriedades são mais caras para mudar do que outras e, portanto, provavelmente causarão mais oscilações. Por exemplo, mudar o `box-shadow` de um elemento exigirá uma operação de pintura muito mais cara do que mudar, por exemplo, mudar a cor de texto. Mudar o `width` de um elemento talvez seja mais caro do que mudar seu `transform`.

Saiba mais sobre desempenho das animações no guia [Animações e desempenho](animations-and-performance.html), mas se deseja que o TL;DR permaneça para mudanças de transforms e opacity, utilize o `will-change`. Para saber exatamente qual trabalho é acionado com a animação de uma determinada propriedade, veja [Acionadores CSS](http://csstriggers.com).



