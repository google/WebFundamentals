project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A gravação é o processo de preencher pixels para posterior composição nas telas dos usuários. Muitas vezes, é a tarefa mais longa do funil e deve ser evitada, se possível.

{# wf_updated_on: 2015-03-20 #}
{# wf_published_on: 2015-03-20 #}

# Simplificar a complexidade da gravação e reduzir áreas de gravação {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

A gravação é o processo de preencher pixels para posterior composição 
nas telas dos usuários. Muitas vezes, é a tarefa mais longa do 
funil e deve ser evitada, se possível.

### TL;DR {: .hide-from-toc } 

* Com a exceção de "transforms" ou "opacity", a alteração de qualquer propriedade sempre aciona a gravação.
* A gravação é, geralmente, a parte que mais pesada do funil de pixels. Evite-a sempre que possível.
* Reduza as áreas de gravação com a promoção de camadas e orquestração de animações.
* Use o gerador de perfis de gravação do Chrome DevTools para avaliar a complexidade e o custo da gravação. Reduza-os sempre que possível.

## Acionar layout e gravação

O acionamento do layout _sempre aciona a coloração_, pois a mudança da geometria de qualquer elemento implica na correção de seus pixels.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame.jpg"  alt="O pipeline de pixels completo.">

Você também poderá acionar a coloração se alterar propriedades não geométricas, como planos de fundo, cor de texto ou sombras. Nesses casos, o layout não será necessário e o pipeline ficará da seguinte forma:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame-no-layout.jpg"  alt="O pipeline de pixels sem layout.">

## Use o Chrome DevTools para identificar rapidamente os gargalos de coloração

<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles.jpg" alt="A opção para mostrar retângulos de coloração no DevTools.">
  </figure>
</div>

Você pode usar o Chrome DevTools para identificar rapidamente as áreas que estão sendo pintadas. Acesse o DevTools e pressione a tecla de escape do seu teclado. Acesse a guia de renderização no painel exibido e selecione "Show paint rectangles".

<div style="clear:both;"></div>

Com essa opção ativada, o Chrome piscará a tela na cor verde sempre que ocorrer uma coloração. Caso a cor verde pisque em toda a tela ou em áreas da tela que não deveriam ser pintadas, investigue um pouco mais.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles-green.jpg"  alt="A página pisca na cor verde sempre que ocorrer uma coloração.">


<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-toggle.jpg" alt="A ativação do gerador de perfis de coloração no Chrome DevTools.">
  </figure>
</div>

Há uma opção no Timeline do Chrome DevTools que fornece mais informações: o gerador de perfis de coloração. Para ativá-lo, acesse o Timeline e marque a caixa "Paint" na parte superior. É importante _ativar somente essa opção na criação de um perfil de problemas de coloração_, pois ela gera uma sobrecarga e distorce a criação do perfil de desempenho. A melhor utilização desse recurso é na obtenção mais insights sobre o que exatamente está sendo pintado.

<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-button.jpg" alt="O botão para exibir o gerador de perfis de coloração." class="screenshot">
  </figure>
</div>

Agora, você pode executar uma gravação de Timeline, com registros de coloração consideravelmente mais detalhados. Se você clicar no registro de coloração de um quadro, poderá acessar o gerador de perfis de coloração desse quadro:

<div style="clear:both;"></div>

Clique no gerador de perfis de coloração para exibir uma visualização que mostra o que foi pintado, quanto tempo foi gasto e as chamadas de coloração individuais que foram necessárias:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler.jpg"  alt="Gerador de perfis de coloração do Chrome DevTools.">

Esse gerador de perfis informa a área e a complexidade (que é, na verdade, o tempo necessário para a coloração). Se não for possível evitar a coloração, otimize esses dois fatores.

## Promova elementos se movem ou esmaecem

A coloração nem sempre é executada em uma única imagem na memória. Na verdade, é possível que o navegador pinte em várias imagens ou camadas do compositor, se necessário.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/layers.jpg"  alt="Uma representação das camadas do compositor.">

O benefício dessa abordagem é que elementos repintados regularmente ou que se movem na tela com transforms podem ser tratados sem afetar os outros elementos. É o mesmo processo de pacotes de arte como Sketch, GIMP ou Photoshop, onde camadas individuais podem ser tratadas e compostas uma em cima da outra para criar a imagem final.

A melhor forma de criar uma nova camada é usar a propriedade CSS `will-change`. Essa propriedade funciona no Chrome, no Opera e no Firefox. Com um valor `transform`, cria uma nova camada do compositor:


    .moving-element {
      will-change: transform;
    }


Para navegadores que não são compatíveis com `will-change`, mas que permitem a criação de camadas, como o Safari e o Mobile Safari, você precisa executar uma transformação 3D para forçar uma nova camada:


    .moving-element {
      transform: translateZ(0);
    }


No entanto, tome cuidado para não criar muitas camadas, pois cada uma delas exige memória e gerenciamento. Para obter mais informações, consulte a seção [Usar somente propriedades do compositor e gerenciar o número de camadas](stick-to-compositor-only-properties-and-manage-layer-count).

Se você promoveu um elemento para uma nova camada, use o DevTools para confirmar se essa mudança melhorou o desempenho. **Não promova elementos sem gerar um perfil.**

## Reduza áreas de coloração

No entanto, algumas vezes, mesmo com a promoção elementos, o trabalho de coloração continuará sendo necessário. Um grande desafio dos problemas de coloração é que os navegadores reúnem duas áreas que precisam de coloração, o que pode resultar na recoloração de toda a tela. Portanto, se houver um cabeçalho fixo na parte superior da página e algo estiver sendo pintado na parte inferior da página, toda a tela poderá ser repintada.

Observação: em telas de alto DPI, elementos com posição fixa são automaticamente promovidos para sua própria camada do compositor. Isso não acontece em dispositivos de DPI baixo, pois a promoção altera a renderização do texto do subpixel até a escala de cinza, por isso, a promoção da camada precisa ser feita manualmente.

A redução das áreas de coloração é geralmente uma questão de coordenar animações e transições para não se sobreponham demais ou encontrar formas de evitar a animação de determinadas partes da página.

## Reduza a complexidade da gravação

<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/profiler-chart.jpg" alt="O tempo levado para colorir parte da tela.">
  </figure>
</div>

Quando se trata de gravação, algumas coisas consomem mais recursos do que outras. Por exemplo, tudo que envolve um desfoque (como uma sombra) levará mais tempo para pintar do que, por exemplo, desenhar uma caixa vermelha. No entanto, em termos de CSS, isso nem sempre é óbvio: `background: red;` e `box-shadow: 0, 4px, 4px, rgba(0,0,0,0.5);` não aparentam ter características de desempenho muito diferentes, mas têm.

O gerador de perfis de coloração acima permite determinar a necessidade de se procurar outras formas de obter efeitos. Verifique se é possível usar um conjunto de estilos ou meios alternativos mais baratos para conseguir o mesmo resultado final.

Sempre que possível, evite colorações durante determinadas animações, pois os **10 ms** disponíveis por quadro normalmente não são longos o suficiente para finalizar coloração, especialmente em dispositivos móveis.


{# wf_devsite_translation #}
