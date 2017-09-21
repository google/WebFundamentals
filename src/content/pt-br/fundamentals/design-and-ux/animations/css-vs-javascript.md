project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Você pode animar com CSS ou JavaScript. Qual usar e por quê?

{# wf_updated_on: 2016-08-25 #}
{# wf_published_on: 2014-08-08 #}

# Animações CSS vs. JavaScript {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

Há duas formas principais de criar animações na Web: com CSS e com JavaScript. A escolha dependerá de outros elementos em seu projeto e dos tipos de efeitos que deseja obter.

### TL;DR {: .hide-from-toc }
* Use animações CSS para transições individuais mais simples, como alternar estados do elemento da interface do usuário.
* Use animações JavaScript quando desejar efeitos avançados como pular, parar, pausar, retornar ou desacelerar.
* Se você optar por animar com JavaScript, utilize a Web Animations API ou uma estrutura moderna com a qual esteja acostumado.


A maioria das animações básicas pode ser criada com CSS ou JavaScript, mas o esforço e o tempo necessários será diferente (consulte também [Desempenho do CSS vs JavaScript](animations-and-performance#css-vs-javascript-performance)). Cada linguagem tem seus prós e contras, mas as regras gerais são:

* **Use CSS quando tiver estados menores e autocontidos para elementos de IU.** Transições e animações CSS são ideais para exibir um menu de navegação da lateral ou mostrar uma descrição. Você pode acabar usando o JavaScript para controlar os estados, mas as animações estarão no CSS.
* **Use JavaScript quando precisar de controle significativo sobre as animações.** A Web Animations API é a abordagem baseada em padrões, disponível hoje no Chrome e no Opera. Isso oferece objetos verdadeiros, ideais para aplicativos complexos orientados por objetos. O JavaScript também é útil quando precisar parar, pausar, desacelerar ou inverter.
* **Use `requestAnimationFrame` diretamente quando quiser orquestrar uma cena interna manualmente.** Essa é uma abordagem JavaScript avançada, mas ela pode ser útil se você estiver criando um jogo ou desenhando em um canvas HTML.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="WaNoqBAp8NI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Como alternativa, se já estiver usando uma infraestrutura JavaScript que inclua o recurso de animação, como o método [`.animate()`](https://api.jquery.com/animate/){: .external } do jQuery ou o [TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified) do GreenSock, pode ser mais conveniente manter essa escolha para suas animações.

<div class="clearfix"></div>

## Anime com CSS

Animar com CSS é a forma mais simples de fazer algo se mover na tela. Essa abordagem é descrita como *declarativa*, pois você especifica o que deseja que aconteça.

Abaixo está um exemplo de CSS que move um elemento de 100 pixels nos eixos X e Y. Para isso, usa-se uma transição CSS definida para durar 500 ms. Quando a classe `move` é adicionada, o valor `transform` é alterado e a transição começa.


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
    
[Try it](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-simple.html){: target="_blank" .external }

Além da duração da transição, há opções para *easing*, que é basicamente o resultado da animação. Para saber mais sobre o easing, consulte o guia [Os conceitos básicos de easing](the-basics-of-easing).

Se, como no snippet acima, você criar classes CSS separadas para gerenciar suas animações, é possível usar o JavaScript para ativar e desativar cada animação:


    box.classList.add('move');
    

Isso proporciona um bom equilíbrio para seus aplicativos. Você pode se concentrar em gerenciar o estado com JavaScript e apenas definir as classes adequadas nos elementos alvo, deixando o navegador lidar com as animações. Se escolher esse caminho, pode aguardar eventos `transitionend` no elemento, mas apenas se dispensar o suporte para versões mais antigas do Internet Explorer; a versão 10 foi a primeira versão com suporte para esses eventos. Todos os outros navegadores suportam o evento já há algum tempo.

O JavaScript necessário para executar o final de uma transição será:


    var box = document.querySelector('.box');
    box.addEventListener('transitionend', onTransitionEnd, false);
    
    function onTransitionEnd() {
      // Handle the transition finishing.
    }
    

Além de usar transições CSS, você também pode usar animações CSS, que permitirão mais controle sobre quadros-chave de animação individuais, durações e interações.

Observação: Se não tiver experiência com animações, quadro-chave é um termo antigo para animações desenhadas à mão. Os animadores criavam quadros específicos para um segmento de ação chamado de quadro-chave, que capturava o final de um movimento, por exemplo, e desenhavam todos os quadros individuais entre os quadros-chave. Hoje temos um processo semelhante com animações CSS: informamos ao navegador os valores das propriedades CSS necessários em determinados pontos e ele preenche as lacunas.

Por exemplo, você pode animar a caixa da mesma forma que anima transições, mas precisará fazê-lo sem qualquer interação do usuário, como cliques, e com infinitas repetições. Você também pode alterar várias propriedades ao mesmo tempo:


    /**
     * This is a simplified version without
     * vendor prefixes. With them included
     * (which you will need), things get far
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
    

[Try it](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-keyframes.html){: target="_blank" .external }

Com animações CSS, você define a própria animação independentemente do elemento alvo e usa a propriedade animation-name para selecionar a animação necessária.

Animações CSS ainda são relativamente prefixadas pelo fornecedor, com `-webkit-` sendo usado nos navegadores Safari, Safari Mobile e Android. O Chrome, o Opera, o Internet Explorer e o Firefox não incluem prefixos. Várias ferramenta podem ajudar na criação de versões prefixadas do CSS, permitindo que você programe a versão não prefixada em seus arquivos de fonte.

## Anime com JavaScript e a Web Animations API

Criar animações com JavaScript é mais complexo do que programar transições ou animações CSS, mas geralmente proporciona aos desenvolvedores muito mais poder. Você pode usar a [Web Animations API](https://w3c.github.io/web-animations/) para animar propriedades CSS específicas ou compilar objetos de efeito composto.

Animações JavaScript são *imperativas*, pois são programadas em linha como parte do seu código. Você pode encapsulá-las dentro de outros objetos. Veja abaixo o código JavaScript necessário para recriar a transição CSS descrita anteriormente:


    var target = document.querySelector('.box');
    var player = target.animate([
      {transform: 'translate(0)'},
      {transform: 'translate(100px, 100px)'}
    ], 500);
    player.addEventListener('finish', function() {
      target.style.transform = 'translate(100px, 100px)';
    });
    

Por padrão, animações da Web só modificam a apresentação de um elemento. Se quiser que seu objeto permaneça no local para onde ele foi motivo, modifique seus estilos subjacentes quando a animação for concluída, como é apresentado no nosso exemplo.

[Try it](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-wa.html){: target="_blank" .external }

A Web Animations API é um novo padrão do W3C. Ela tem suporte nativo no Chrome e no Opera e está [sendo desenvolvida para Firefox](https://birtles.github.io/areweanimatedyet/){: .external }. Para outros navegadores modernos, [há um polyfill disponível](https://github.com/web-animations/web-animations-js).

Com animações JavaScript, você tem controle total sobre os estilos de um elemento em cada etapa. Isso significa que você pode desacelerar, pausar, interromper e inverter animações e manipular seus elementos como quiser. Isso é particularmente útil se você estiver compilando aplicativos complexos orientados por objetos, pois será possível encapsular seu comportamento de forma apropriada.


{# wf_devsite_translation #}
