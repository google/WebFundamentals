---
title: "Animating Between Views"
description: "Aprenda como animar entre duas visualizações em seus aplicativos."
updated_on: 2014-10-22
key-takeaways:
  code:
    - "Use transições para se mover entre visualizações; evite usar <code>left</code>, <code>top</code> ou qualquer outra propriedade que acione o layout."
    - "Certifique-se de que as animações usadas sejam alegres e de curta duração."
    - "Leve em consideração como suas animações e layouts mudam conforme o tamanho da tela aumenta; o que funciona para uma tela pequena pode parecer estranho quando usado em um contexto de desktop."
notes:
  sixtyfps:
    - "Você deve procurar manter 60 fps para todas as suas animações. Dessa forma, seus usuários não verão animações oscilantes que prejudicará a experiência. Certifique-se de que qualquer elemento de animação tenha will-change definido para tudo que você planeja alterar bem antes de começar a animação. Para transições de visualização, você provavelmente usará <code>will-change: transform</code>."
  flinging:
    - "Criar este tipo de hierarquia entre vários navegadores pode ser um desafio. Por exemplo, o iOS exige uma propriedade CSS adicional, <code>-webkit-overflow-scrolling: touch</code>, para ‘reabilitar’ a rolagem corrente, mas você não pode controlar para qual eixo, como você faz com a propriedade overflow padrão. Certifique-se de testar sua implementação em vários dispositivos!"
---

<p class="intro">
  Muitas vezes os usuários deverão passar por diferentes visualizações no seu aplicativo, seja uma lista para uma visualização de detalhes ou mostrar uma navegação de barra lateral. Animações entre essas visualizações são ótimas para prender a atenção do usuário e dar ainda mais vida aos seus projetos.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

A aparência e desempenho dessas transições de visualização dependerão muito do tipo de visualização com o qual você está trabalhando. Por exemplo, animar uma superposição modal em cima de uma visualização deve ser uma experiência diferente da transição entre uma visualização de lista e detalhes.

{% include shared/remember.liquid title="Note" list=page.notes.sixtyfps %}

## Use alternância para mover entre visualizações

Para tornar a vida um pouco mais fácil, vamos assumir que há duas visualizações: uma visualização de lista e uma visualização de detalhes. Conforme o usuário toca em um item da lista dentro da visualização de lista, a visualização de detalhes aparece e a visualização de lista desaparece.

<img src="imgs/gifs/view-translate.gif" alt="Alternando entre duas visualizações" />

Para obter esse efeito, você precisará de um contêiner para ambas as visualizações com `overflow: hidden` definido. Dessa forma, as duas visualizações podem estar dentro, lado a lado, sem mostrar barras de rolagem horizontais e cada visualização pode rolar lado a lado dentro do contêiner, conforme necessário.

<img src="imgs/container-two-views.svg" alt="Hierarquia de visualização." />

O CSS para o contêiner é:

{% highlight css %}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
{% endhighlight %}

A posição do contêiner é definida como `relative`. Isso significa que cada visualização dentro dele pode ser posicionada totalmente no canto superior esquerdo e movida com transformações. Esta abordagem é melhor para o desempenho do que usar a propriedade `left` (porque ela aciona o layout e a pintura) e é geralmente mais fácil de racionalizar.

{% highlight css %}
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
{% endhighlight %}

Adicionar um `transition` na propriedade `transform` proporciona um ótimo efeito deslizante. Para proporcionar um bom efeito, ele usa uma curva `cubic-bezier` personalizada, que discutimos no [Guia de easing personalizado](custom-easing.html).

{% highlight css %}
.view {
  /* Prefixes are needed for Safari and other WebKit-based browsers */
  transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
  transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
}
{% endhighlight %}

A visualização que está fora da tela deve ser alternada para a direita. Portanto, nesse caso, a visualização de detalhes precisa ser movida:

{% highlight css %}
.details-view {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
{% endhighlight %}

Agora uma pequena quantidade de JavaScript é necessária para lidar com as classes. Isso alternará as classes adequadas nas visualizações.

{% highlight javascript %}
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

// When you click on a list item bring on the details view.
for (var i = 0; i < listItems.length; i++) {
  listItems[i].addEventListener('click', onViewChange, false);
}

// And switch it back again when you click on the back button
backButton.addEventListener('click', onViewChange);
{% endhighlight %}

Por fim, adicionamos as declarações CSS para essas classes.

{% highlight css %}
.view-change .list-view {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}

.view-change .details-view {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
{% endhighlight %}

{% link_sample _code/inter-view-animation.html %}Veja a amostra.{% endlink_sample %}

Você pode expandir para cobrir várias visualizações e o conceito básico deverá permanecer o mesmo; cada visualização não visível deve estar fora da tela e trazida conforme necessário e a visualização atualmente na tela deve ser removida.

{% include shared/remember.liquid title="Note" list=page.notes.flinging %}

Além da transição entre visualizações, essa técnica também pode ser aplicada a outros elementos de deslizamento, como os elementos de navegação da barra lateral. A única diferença real é que você não precisará mover as outras visualizações.

## Garanta que sua animação funcione com telas maiores

Para uma tela maior, você deve manter a visualização de lista disponível a todo momento em vez de removê-la e deslizar a visualização de detalhes do lado direito. É muito parecido com lidar com uma visualização de navegação.

<img src="imgs/container-two-views-ls.svg" alt="Hierarquia de visualização em uma tela grande." />


