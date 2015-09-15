---
title: "Debounce your input handlers"
description: "Manipuladores de entrada são uma possível causa de problemas em seus aplicativos, pois eles podem bloquear a conclusão de frames e causar trabalho extra (e desnecessário) com layout."
updated_on: 2015-03-20
notes:
  highdpi:
    - "Em telas de alto DPI, elementos com posição fixa são promovidos automaticamente para sua própria camada de compositor. Esse não é o caso em dispositivos de DPI baixo porque a promoção altera a renderização do texto de subpixel para escala de cinza e a promoção da camada precisa ser realizada manualmente."
  csstriggers:
    - "Deseja uma lista definitiva de quais propriedades CSS acionam o layout, pintura ou composição? Veja <a href='http://csstriggers.com/'>Acionadores CSS</a>."

key-takeaways:
  - Evite manipuladores de entrada de longa execução; eles podem bloquear a rolagem.
  - Não faça mudanças de estilo nos manipuladores de entrada.
  - Atrase seus manipuladores; armazene valores de evento e lide com as mudanças de estilo no próximo retorno de chamada requestAnimationFrame.


---
<p class="intro">
  Manipuladores de entrada são uma possível causa de problemas em seus aplicativos, pois eles podem bloquear a conclusão de frames e causar trabalho extra (e desnecessário) com layout.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

## Evite manipuladores de entrada de longa execução

No caso mais rápido possível, quando um usuário interage com a página, o thread compositor da página pode pegar a entrada de toque do usuário e simplesmente mover o conteúdo. Isso não exige trabalho do thread principal, onde o JavaScript, layout, estilos e pintura são realizados.

<img src="images/debounce-your-input-handlers/compositor-scroll.jpg" class="center" alt="Rolagem leve; somente compositor.">

No entanto, se você anexar um manipulador de entrada como o `touchstart`, `touchmove` ou `touchend`, o thread do compositor deve aguardar que esse manipulador termine de executar porque você pode escolher chamar `preventDefault()` e evitar que a rolagem do toque aconteça. Mesmo se você não chamar `preventDefault()`, o compositor deve aguardar e, como a rolagem do usuário é bloqueada, pode resultar em oscilação e frames ausentes.

<img src="images/debounce-your-input-handlers/ontouchmove.jpg" class="center" alt="Rolagem pesada; o compositor está bloqueado no JavaScript.">

Resumidamente, certifique-se de que qualquer manipulador de entrada executado funcione rapidamente e permita que o compositor desempenhe sua função.

## Evite mudanças de estilo nos manipuladores de entrada

Manipuladores de entrada, como aqueles para rolagem e toque, são programados para executar logo antes de qualquer retorno de chamada `requestAnimationFrame`.

Se você realizar uma mudança visual dentro de um desses manipuladores, no início do `requestAnimationFrame`, haverá mudanças de estilo pendentes. Se ler as propriedades visuais no início do retorno de chamada requestAnimationFrame, conforme “[Evite layouts grandes, complexos e extravagantes](avoid-large-complex-layouts-and-layout-thrashing)” sugere, você acionará um layout sincronizado forçado!

<img src="images/debounce-your-input-handlers/frame-with-input.jpg" class="center" alt="Rolagem pesada; o compositor está bloqueado no JavaScript.">

## Atrase seus manipuladores de rolagem

A solução para ambos os problemas acima é a mesma: atrase as mudanças visuais para o próximo retorno de chamada `requestAnimationFrame`:

{% highlight javascript %}
function onScroll (evt) {

  // Store the scroll value for laterz.
  lastScrollY = window.scrollY;

  // Prevent multiple rAF callbacks.
  if (scheduledAnimationFrame)
    return;

  scheduledAnimationFrame = true;
  requestAnimationFrame(readAndUpdatePage);
}

window.addEventListener('scroll', onScroll);
{% endhighlight %}

Esta ação tem a vantagem extra de manter seus manipuladores de entrada leves, o que é ótimo porque agora não bloqueará elementos como a rolagem ou o toque em um código computacional caro!


