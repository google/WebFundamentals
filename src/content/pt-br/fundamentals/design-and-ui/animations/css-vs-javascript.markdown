---
title: "CSS vs JavaScript Animations"
description: "Você pode animar com CSS ou JavaScript. Qual deles usar e por quê?"
updated_on: 2014-10-21
key-takeaways:
  code:
    - "Use animações CSS para transições “one-shot” mais simples, como alternar estados do elemento da interface do usuário."
    - "Use animações JavaScript quando desejar efeitos avançados como pular, parar, pausar, retornar ou desacelerar."
    - "Se optar pelo JavaScript, utilize o TweenMax ou, se deseja uma solução mais leve, use o TweenLite."
notes:
  keyframes:
    - "Se for novo nesta área, quadro-chave é um termo antigo para animações desenhadas à mão. Os animadores criavam quadros específicos para um segmento de ação chamado de quadro-chave, que capturava o final de um movimento, por exemplo, e começava a desenhar todos os quadros individuais entre os quadros-chave. Hoje temos um processo semelhante com animações CSS: informamos ao navegador os valores das propriedades CSS necessários em determinados pontos e ele preenche as lacunas."
  setinterval:
    - "Você pode ver código na Web que usa setInterval ou setTimeout para animações. Essa é uma péssima ideia, porque a animação não estará sincronizada na taxa de atualização da tela e provavelmente trepidará e pulará. Você sempre deve evitar esse código e usar requestAnimationFrame, que é sincronizado corretamente."
---

<p class="intro">
  Há duas formas principais de criar animações na Web: com CSS e com JavaScript. A escolha dependerá de outros elementos em seu projeto e dos tipos de efeitos que deseja obter.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

A maioria das animações básicas pode ser criada com CSS ou JavaScript, mas a quantidade de esforço e tempo exigidos será diferente (veja também [Desempenho do CSS vs JavaScript]({{site.fundamentals}}/look-and-feel/animations/animations-and-performance.html#css-vs-javascript-performance)). Cada um tem seus prós e contras, mas as regras gerais são:

* **Use CSS quando você tiver estados menores e autocontidos para elementos da interface do usuário.** Transições e animações CSS são ideais para exibir um menu de navegação da lateral ou mostrar uma descrição. Você pode acabar usando o JavaScript para controlar os estados, mas as animações estarão em seu CSS.
* **Use JavaScript quando precisar de maior controle sobre suas animações.** Elementos que localizam dinamicamente uma posição de toque ou uma animação que você precise parar, pausar, desacelerar ou inverter geralmente exigem o uso do JavaScript.

Se você já estiver usando jQuery ou um framework JavaScript que inclui a funcionalidade de animação, talvez seja mais conveniente continuar com ele em vez de mudar para o CSS.

### Animar com CSS

Sem dúvidas animar com CSS é a forma mais simples de fazer algo se mover na tela.

Abaixo está um exemplo de CSS que moverá um elemento de 100px nos eixos X e Y. Para isso, usa-se uma transição CSS definida para receber 500 ms. Quando a classe `move` é adicionada, o valor `transform` é alterado e a transição começa.

{% highlight css %}
.box {
  -webkit-transform: translate(0, 0);
  -webkit-transition: -webkit-transform 500ms;

  transform: translate(0, 0);
  transition: transform 500ms;
}

.box.move {
  -webkit-transform: translate(100px, 100px);
  transform: translate(100px, 100px);
}
{% endhighlight %}

{% link_sample _code/box-move-simple.html %}Veja a amostra{% endlink_sample %}

Além da duração da transição, há opções para easing, que é basicamente o resultado da animação. Para saber mais sobre o tema, veja o guia [Os fundamentos do easing”](the-basics-of-easing.html).

Se, como no trecho acima, você cria classes CSS separadas para gerenciar suas animações, é possível usar o JavaScript para ligar e desligar cada animação:

{% highlight javascript %}
box.classList.add('move');
{% endhighlight %}

Esta ação proporcionará melhor equilíbrio para seus aplicativos. Você pode se concentrar em gerenciar o estado com JavaScript e apenas definir as classes adequadas nos elementos alvo, deixando o navegador lidar com as animações. Se escolher esse caminho, pode aguardar eventos `transitionend` no elemento, mas apenas se dispensar o suporte para versões mais antigas do Internet Explorer; a versão 10 foi a primeira versão com suporte para esses eventos. Todos os outros navegadores suportam o evento já há algum tempo.

O JavaScript necessário para executar o final de uma transição será:

{% highlight javascript %}
var box = document.querySelector('.box');
box.addEventListener('transitionend', onTransitionEnd, false);

function onTransitionEnd() {
  // Handle the transition finishing.
}
{% endhighlight %}

Além de usar transições CSS, você também pode usar animações CSS, que permitirão maior controle sobre quadros-chave de animação individuai, durações e interações.

{% include shared/remember.liquid title="Note" list=page.notes.keyframes %}

Por exemplo, você pode animar a caixa da mesma forma que anima transições, mas precisará fazê-lo sem qualquer interação do usuário como clicar, e com infinitas repetições. Você também pode alterar várias propriedades ao mesmo tempo:

{% highlight css %}
/**
 * This is a simplified version without
 * vendor prefixes. With them included
 * (which you will need) things get far
 * more verbose!
 */
.box {
  /* Choose the animation */
  animation-name: movingBox;

  /* The animation’s duration */
  animation-duration: 1300ms;

  /* The number of times we want
      the animation to run */
  animation-iteration-count: infinite;

  /* Causes the animation to reverse
      on every odd iteration */
  animation-direction: alternate;
}

@keyframes movingBox {
  0% {
    transform: translate(0, 0);
    opacity: 0.3;
  }

  25% {
    opacity: 0.9;
  }

  50% {
    transform: translate(100px, 100px);
    opacity: 0.2;
  }

  100% {
    transform: translate(30px, 30px);
    opacity: 0.8;
  }
}
{% endhighlight %}

{% link_sample _code/box-move-keyframes.html %}Veja a amostra{% endlink_sample %}

Com animações CSS você define a própria animação independentemente do elemento alvo e usa a propriedade animation-name par selecionar a animação necessária.

As Animações CSS ainda são geralmente prefixadas pelo fabricante, com `-webkit-` sendo usadas no Chrome, Safari, Opera, Safari Mobile e Android Browser. Internet Explorer e Firefox enviam sem prefixos. Várias ferramenta o ajudarão na criação de versões prefixadas do CSS, permitindo que você escreva a versão não prefixada em seus arquivos de origem.

### Animar com JavaScript

Criar animações com JavaScript é mais complexo do que escrever transições ou animações CSS, mas geralmente proporciona muito mais poder a você como desenvolvedor. A abordagem mais comum é usar `requestAnimationFrame` e, em cada frame de animação, determinar manualmente o valor de cada propriedade do elemento que está sendo animado.

{% include shared/remember.liquid title="Note" list=page.notes.setinterval %}

Abaixo está o JavaScript que você precisará escrever para recriar a transição CSS discutida anteriormente.

{% highlight javascript %}
function Box () {

  var animationStartTime = 0;
  var animationDuration = 500;
  var target = document.querySelector('.box');

  this.startAnimation = function() {
    animationStartTime = Date.now();
    requestAnimationFrame(update);
  };

  function update() {
    var currentTime = Date.now();
    var positionInAnimation = (currentTime - animationStartTime) / animationDuration;

    var xPosition = positionInAnimation * 100;
    var yPosition = positionInAnimation * 100;

    target.style.transform = 'translate(' + xPosition + 'px, ' + yPosition + 'px)';

    if (positionInAnimation <= 1)
      requestAnimationFrame(update);
  }
}

var box = new Box();
box.startAnimation();
{% endhighlight %}

{% link_sample _code/box-move-js.html %}Veja a amostra{% endlink_sample %}

Esse código se torna muito complexo e difícil de gerenciar conforme é expandido para abordar mais casos, portanto, de forma geral, o ideal é escolher uma das várias bibliotecas JavaScript disponíveis para animação. Se já estiver usando o jQuery em seu projeto, é recomendável continuar com ele e usar as funções [`.animate()`](http://api.jquery.com/animate/). Por outro lado, se precisar de uma biblioteca exclusiva, veja a [Greensock’s TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified), que é excelente. Há uma versão mais leve chamada TweenLite, mais simples do ponto de vista de tamanho de arquivo.

Com as animações JavaScript você tem total controle dos estilos dos elementos a cada etapa, e pode desacelerar a animação, pausar, parar, inverter e manipular conforme achar adequado.


