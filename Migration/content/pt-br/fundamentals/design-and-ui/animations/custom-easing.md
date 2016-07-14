---
title: "Custom Easing"
description: "Vá além e crie animações totalmente personalizadas para os seus projetos."
updated_on: 2014-10-21
key-takeaways:
  code:
    - "O easing personalizado confere mais personalidade a seus projetos."
    - "Você pode criar curvas de bézier cúbicas que se parecem com as curvas de animação padrão <code>(ease-out</code>, <code>ease-in</code>, etc.), mas com ênfase em locais diferentes."
    - "Use JavaScript quando precisar de mais controle sobre o tempo e comportamento da animação, por exemplo, animações elásticas ou saltitantes."

---
<p class="intro">
  Algumas vezes você não deseja usar as palavras-chave de easing incluídas com o CSS ou usa uma biblioteca de animação baseada em JavaScript. Em ambos os casos, você geralmente pode definir suas próprias curvas (ou equações) o que proporciona maior controle sobre as animações do seu projeto.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

Se está animando com CSS, você pode estabelecer curvas de bézier cúbicas para definir o tempo. Na verdade, as palavras-chave `ease`, `ease-in`, `ease-out` e `linear` mapeiam para curvas de bézier predefinidas, que são detalhadas na [Especificação das transições CSS](http://www.w3.org/TR/css3-transitions/).

No CSS, essas curvas de bézier têm quatro valores, ou 2 pares de números, e cada par descreve as coordenadas X e Y dos pontos de controle da curva de bézier cúbica.  O ponto de início da curva de bézier tem uma coordenada de (0, 0) e a coordenada final é (1, 1); você pode definir os valores X e Y dos dois pontos de controle. Os valores X para os dois pontos de controle devem estar entre 0 e 1 e cada valor Y do ponto de controle pode ultrapassar o limite [0, 1], embora a especificação não diga quanto.

Mudar o valor de X e Y de cada ponto de controle trará uma curva muito distinta e, portanto, um resultado completamente diferente para a sua animação. Por exemplo, se o primeiro ponto de controle estiver no canto inferior direito, a animação começará lentamente. Se estiver no canto superior esquerdo, começará rapidamente. Por outro lado, se o segundo ponto de controle estiver no canto inferior direito da grade, a animação terá um final rápido. Enquanto que, se estiver no canto superior esquerdo, terá um final lento.

Para comparação, aqui estão duas curvas: uma curva ease-in-out comum e uma curva personalizada:

<img src="imgs/ease-in-out-markers.png" style="display: inline; max-width: 300px" alt="Curva de animação do ease-in-out." />
<img src="imgs/custom.png" style="display: inline; max-width: 300px" alt="Curva de animação personalizada." />

{% link_sample _code/box-move-custom-curve.html %}Veja uma animação com easing personalizado.{% endlink_sample %}

O CSS para a curva personalizada é:

{% highlight css %}
transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
{% endhighlight %}

Os primeiros dois números são as coordenadas X e Y do primeiro ponto de controle. Os dois números seguintes são as coordenadas X e Y do segundo ponto de controle.

Criar uma curva personalizada é muito divertido e oferece um maior controle sobre o resultado da animação. A curva acima, por exemplo. Pode-se observar que ela se assemelha a uma curva ease-in-out clássica, mas com uma parte ease-in menor, ou “inicial”, e desaceleração alongada no final.

Experimente esta {% link_sample _code/curve-playground.html %}ferramenta de curva de animação{% endlink_sample %} e veja como a curva afeta seu resultado.

## Use JavaScript para ter mais controle

Algumas vezes você precisa de ainda mais controle do que uma curva de bézier cúbica pode proporcionar. Se deseja um efeito de elástico ou se quiser parar a execução da animação no meio, ambos são muito mais difíceis de fazer com o CSS. Nesses casos, você deve usar bibliotecas de animação JavaScript. Uma das melhores bibliotecas é a [Greensock’s TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified) (ou TweenLite se você deseja uma versão leve), pois você tem maior controle em uma pequena biblioteca JavaScript, que é também uma base de código muito madura.

{% link_sample _code/box-move-elastic.html %}Veja uma animação de elastic ease.{% endlink_sample %}

Para usar algo como o TweenMax, inclua o script na sua página:

{% highlight html %}
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
{% endhighlight %}

Quando estiver pronto, você pode chamar o TweenMax no seu elemento e dizer quais propriedades e easings deseja. Há milhares de opções de easing que você pode usar; o código abaixo usa um elastic ease-out:

{% highlight javascript %}
var box = document.getElementById('my-box');
var animationDurationInSeconds = 1.5;

TweenMax.to(box, animationDurationInSeconds, {
  x: '100%',
  ease: 'Elastic.easeOut'
});
{% endhighlight %}

A [Documentação do TweenMax](http://greensock.com/docs/#/HTML5/GSAP/TweenMax/) destaca todas as opções indicadas aqui, portanto, é uma leitura recomendada.



