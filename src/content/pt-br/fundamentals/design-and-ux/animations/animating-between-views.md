project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Saiba como criar uma animação entre duas visualizações em seus aplicativos.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-08-08 #}

# Animar entre visualizações {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Com frequência, os usuários deverão passar por diferentes visualizações no seu aplicativo, seja de uma lista para uma visualização de detalhes ou mostrar uma navegação de barra lateral. Animações entre essas visualizações prendem a atenção do usuário e dão ainda mais vida aos seus projetos.

### TL;DR {: .hide-from-toc }
* Use alternância para mover-se entre visualizações; evite usar `left`, `top` ou qualquer outra propriedade que acione o layout.
* Certifique-se de que as animações usadas sejam alegres e de curta duração.
* Leve em consideração como as animações e os layouts mudam conforme o tamanho da tela aumenta; o que funciona para uma tela pequena pode parecer estranho quando usado em um contexto de desktop.

A aparência e o comportamento dessas transições de visualização dependem dos tipos de visualizações com os quais você trabalha. Por exemplo, animar uma sobreposição modal sobre uma visualização deve ser uma experiência diferente do que uma transição entre uma visualização de lista e uma de detalhes.

Success: Procure manter 60 fps para todas as suas animações. Dessa forma, seus usuários não verão animações oscilantes que interfiram com suas experiências. Certifique-se de que qualquer elemento de animação tenha `will-change` definido para tudo que você planeje alterar bem antes de começar a animação. Para alternâncias de visualização, você provavelmente usará `will-change: transform`.

## Use alternâncias para mover-se entre visualizações

<div class="attempt-left">
  <figure>
    <img src="images/view-translate.gif" alt="Alternando entre duas visualizações" />
  </figure>
</div>

Para tornar a vida um pouco mais fácil, vamos presumir que há duas visualizações: uma visualização de lista e uma visualização de detalhes. Conforme o usuário toca em um item da lista dentro da visualização de lista, a visualização de detalhes aparece e a visualização de lista desaparece.

<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views.svg" alt="Hierarquia de visualização." />
  </figure>
</div>

Para obter esse efeito, você precisará de um contêiner para ambas as visualizações com `overflow: hidden` definido. Dessa forma, as duas visualizações podem estar dentro do contêiner, lado a lado, sem mostrar barras de rolagem horizontais e cada visualização pode deslizar lado a lado, conforme necessário.

<div style="clear:both;"></div>

O CSS para o contêiner é:


    .container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    

A posição do contêiner é definida como `relative`. Isso significa que cada visualização dentro dele pode ser posicionada totalmente no canto superior esquerdo e movida com transformações. Esta abordagem é melhor para o desempenho do que usar a propriedade `left` (porque ela aciona o layout e a pintura) e é geralmente mais fácil de racionalizar.


    .view {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    
      /* let the browser know we plan to animate
         each view in and out */
      will-change: transform;
    }
    

Adicionar um `transition` na propriedade `transform` proporciona um ótimo efeito deslizante. Para proporcionar um bom efeito, ele usa uma curva `cubic-bezier` personalizada, que discutimos no [Guia de easing personalizado](custom-easing).


    .view {
      /* Prefixes are needed for Safari and other WebKit-based browsers */
      transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
      transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    }
    

A visualização que está fora da tela deve ser alternada para a direita. Portanto, nesse caso, a visualização de detalhes precisa ser movida:


    .details-view {
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    

Agora uma pequena quantidade de JavaScript é necessária para lidar com as classes. Isso alterna as classes adequadas nas visualizações.


    var container = document.querySelector('.container');
    var backButton = document.querySelector('.back-button');
    var listItems = document.querySelectorAll('.list-item');
    
    /**
     * Toggles the class on the container so that
     * we choose the correct view.
     */
    function onViewChange(evt) {
      container.classList.toggle('view-change');
    }
    
    // When you click a list item, bring on the details view.
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener('click', onViewChange, false);
    }
    
    // And switch it back again when you click the back button
    backButton.addEventListener('click', onViewChange);
    

Por fim, adicionamos as declarações CSS para essas classes.


    .view-change .list-view {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
    
    .view-change .details-view {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    
[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/inter-view-animation.html){: target="_blank" .external }

Você pode expandir para cobrir várias visualizações e o conceito básico deverá permanecer o mesmo; cada visualização não visível deve estar fora da tela e trazida conforme necessário e a visualização atualmente na tela deve ser removida.

Warning: Criar este tipo de hierarquia entre vários navegadores pode ser um desafio. Por exemplo, o iOS exige uma propriedade CSS adicional,  <code>-webkit-overflow-scrolling: touch</code> para “reativar” a rolagem corrente, mas você não pode controlar o eixo como faz com a propriedade overflow padrão. Teste sua implementação em vários dispositivos!

Além da transição entre visualizações, essa técnica também pode ser aplicada a outros elementos de deslizamento, como os elementos de navegação da barra lateral. A única diferença real é que você não precisará mover as outras visualizações.

## Garanta que sua animação funcione com telas maiores

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views-ls.svg" alt="Hierarquia de visualização em uma tela grande." />
  </figure>
</div>

Para uma tela maior, você deve manter a visualização de lista disponível a todo momento em vez de removê-la e deslizar a visualização de detalhes do lado direito. É muito parecido com lidar com uma visualização de navegação.






{# wf_devsite_translation #}
