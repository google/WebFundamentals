project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Vá além e crie animações totalmente personalizadas para seus projetos.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Easing personalizado {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

Em alguns casos, você não desejará usar as palavras-chave de easing incluídas com o CSS ou usará animações Web ou uma estrutura JavaScript. Geralmente, nesse caso, é possível definir suas próprias curvas (ou equações), o que proporciona mais controle sobre as animações do seu projeto.

### TL;DR {: .hide-from-toc }
* O easing personalizado confere mais personalidade a seus projetos.
* Você pode criar curvas de Bézier cúbicas que se parecem com as curvas de animação padrão (ease-out, ease-in etc.), mas com ênfase em locais diferentes.
* Use JavaScript quando precisar de mais controle sobre o timing e o comportamento da animação, por exemplo, animações elastic ou bounce.


Se estiver animando com CSS, você poderá estabelecer curvas de Bézier cúbicas para definir a precisão. Na verdade, as palavras-chave `ease`, `ease-in`, `ease-out` e `linear` mapeiam para curvas de Bézier predefinidas, que são detalhadas na [Especificação das transições CSS](http://www.w3.org/TR/css3-transitions/) e na [Especificação das animações Web](https://w3c.github.io/web-animations/#scaling-using-a-cubic-bezier-curve).

Essas curvas de Bézier têm quatro valores, ou dois pares de números, e cada par descreve as coordenadas X e Y dos pontos de controle da curva de Bézier cúbica. O ponto de início da curva de Bézier tem uma coordenada de (0, 0) e a coordenada final é (1, 1); você pode definir os valores X e Y dos dois pontos de controle. Os valores X para os dois pontos de controle devem estar entre 0 e 1 e cada valor Y do ponto de controle pode ultrapassar o limite [0, 1], embora a especificação não diga quanto.

Mudar o valor de X e Y de cada ponto de controle trará uma curva muito distinta e, portanto, um resultado completamente diferente para a sua animação. Por exemplo, se o primeiro ponto de controle estiver na área inferior direita, a animação começará lentamente. Na área superior esquerda, começará rapidamente. Por outro lado, se o segundo ponto de controle estiver na área inferior direita da grade, a animação terá um final rápido, enquanto que, se estiver na área superior esquerda, terá um final lento.

Para comparação, aqui estão duas curvas: uma curva ease-in-out comum e uma curva personalizada:

<div class="attempt-left">
  <figure>
    <img src="images/ease-in-out-markers.png" alt="Curva de animação ease-in-out." />
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/custom.png" alt="Curva de animação personalizada." />
  </figure>
</div>

[Veja uma animação com easing personalizado](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-custom-curve.html){: target="_blank" .external }

O CSS para a curva personalizada é:


    transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    

Os primeiros dois números são as coordenadas X e Y do primeiro ponto de controle. Os dois números seguintes são as coordenadas X e Y do segundo ponto de controle.

Criar uma curva personalizada é muito divertido e oferece um maior controle sobre o resultado da animação. Na curva acima, por exemplo, pode-se observar que ela se assemelha a uma curva ease-in-out clássica, mas com uma parte ease-in menor, ou "inicial", e desaceleração alongada no final.

Experimente com esta [ferramenta de curva de animação](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/curve-playground.html){: target="_blank" .external } e veja como a curva afeta uma animação.

## Use estruturas JavaScript para obter mais controle

Em alguns casos, você precisará de ainda mais controle do que uma curva de Bézier cúbica pode proporcionar. Se quiser um efeito elastic bounce, considere usar uma estrutura JavaScript, pois esse é um efeito difícil de ser obtido com CSS ou animações Web.

### TweenMax

Uma das melhores estruturas é a [Greensock’s TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified) (ou TweenLite se quiser uma versão muito leve), pois oferece mais controle em uma pequena biblioteca JavaScript, que é também uma base de código muito madura.

[Veja uma animação de elastic ease](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-elastic.html){: target="_blank" .external }

Para usar o TweenMax, inclua este script na sua página:


    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
    

Quando o script estiver pronto, você pode chamar o TweenMax no seu elemento e dizer quais propriedades e easings deseja. Há diversas opções de easing que você pode usar; o código abaixo usa um elastic ease-out:


    var box = document.getElementById('my-box');
    var animationDurationInSeconds = 1.5;
    
    TweenMax.to(box, animationDurationInSeconds, {
      x: '100%',
      ease: 'Elastic.easeOut'
    });
    

A [Documentação do TweenMax](https://greensock.com/docs/#/HTML5/GSAP/TweenMax/) destaca todas as opções indicadas aqui, portanto, é uma leitura recomendada.





{# wf_devsite_translation #}
