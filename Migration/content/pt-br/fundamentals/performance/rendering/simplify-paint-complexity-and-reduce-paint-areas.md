---
title: "Simplify paint complexity and reduce paint areas"
description: "A pintura é o processo de preenchimento em pixels que é composto nas telas dos usuários. Geralmente é a execução mais longa de todas as tarefas no pipeline e que deve ser evitada sempre que possível."
updated_on: 2015-03-20
notes:
  highdpi:
    - "Em telas de alto DPI, elementos com posição fixa são promovidos automaticamente para sua própria camada de compositor. Esse não é o caso em dispositivos de DPI baixo porque a promoção altera a renderização do texto de subpixel para escala de cinza e a promoção da camada precisa ser realizada manualmente."
key-takeaways:
  - Alterar qualquer propriedade além de transforms ou opacity sempre aciona a pintura.
  - A pintura é frequentemente a parte mais cara do pixel pipeline; evite-a se puder.
  - Reduza áreas de pintura pela camada de promoção e orquestração das animações.
  - Use o gerador de perfis de pintura do Chrome DevTools para avaliar a complexidade e o custo da pintura; reduza se puder.
---
<p class="intro">
  A pintura é o processo de preenchimento em pixels que é composto nas telas dos usuários. Geralmente é a execução mais longa de todas as tarefas no pipeline e que deve ser evitada sempre que possível.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

Se acionar o layout, sempre _acionará a pintura_, porque mudar a geometria de qualquer elemento implica na correção de seus pixels.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame.jpg" class="g--centered" alt="O pixel pipeline completo.">

Você também pode acionar a pintura se alterar propriedades não geométricas, como planos de fundo, cor de texto ou sombras. Nesses casos, o layout não será necessário e o pipeline ficará da seguinte forma:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame-no-layout.jpg" class="g--centered" alt="O pixel pipeline sem layout.">

## Use o Chrome DevTools para identificar rapidamente reduções de pintura

Você pode usar o Chrome DevTools para identificar rapidamente áreas que estão sendo pintadas. Vá para DevTools e pressione a tecla escape no seu teclado. Vá para a guia renderização no painel exibido e selecione “Mostrar retângulos de pintura”:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles.jpg" class="g--centered" alt="A opção mostrar retângulos de pintura no DevTools.">

Com essa opção ativada, o Chrome piscará a tela verde sempre que a pintura ocorrer. Se toda a tela piscar em verde ou se houver áreas que não deveriam ser pintadas, investigue um pouco mais.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles-green.jpg" class="g--centered" alt="A página piscará em verde sempre que a pintura ocorrer.">

Há uma opção na linha cronológica do Chrome DevTools que fornecerá mais informações: um gerador de perfis de pintura. Para habilitar, vá para a Linha cronológica e marque a caixa “Pintura” na parte superior. É importante _ter apenas essa função ativada ao tentar criar um perfil dos problemas de pintura_, pois ele transporta uma sobrecarga e comprometerá seu perfil de desempenho. É recomendado para esclarecer o que exatamente está sendo pintado.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-toggle.jpg" class="g--centered" alt="A alternância para habilitar o perfil de pintura no Chrome DevTools.">

Agora você pode executar um registro da Linha cronológica e os registros de pintura transportarão muito mais detalhes. Ao clicar em um registro de pintura de um frame, você terá acesso ao Gerador de perfis de pintura para esse frame:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-button.jpg" class="g--centered" alt="O botão para exibir o gerador de perfis de pintura.">

Clicar no gerador de perfis de pintura exibe uma visualização onde é possível ver o que foi pintado, quanto tempo levou e as chamadas de pintura individuais que foram necessárias:

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler.jpg" class="g--centered" alt="Gerador de perfis de pintura do Chrome DevTools.">

Este gerador de perfis permite saber a área e complexidade (que é, na verdade, o tempo que se leva para pintar) e ambas são áreas que podem ser corrigidas, se não a pintura não puder ser evitada.

## Promova elementos que não se movam ou desvaneçam

A pintura nem sempre é realizada em uma única imagem na memória. Na verdade, é possível que o navegador pinte em várias imagens ou camadas do compositor, se necessário.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/layers.jpg" class="g--centered" alt="Uma representação das camadas do compositor.">

O benefício desta abordagem é que elementos repintados regularmente ou que se movem na tela com transformações podem ser abordados sem afetar outros elementos. É o mesmo processo de pacotes de arte como Sketch, GIMP ou Photoshop, onde camadas individuais podem ser tratadas e compostas uma em cima da outra para criar a imagem final.

A melhor forma de criar uma nova camada é usar a propriedade CSS `will-change`. Funciona no Chrome, Opera e Firefox, e, com um valor de `transform`, cria uma nova camada do compositor:

{% highlight css %}
.moving-element {
  will-change: transform;
}
{% endhighlight %}

Para navegadores que não suportam `will-change`, mas tiram proveito da criação de camadas, como o Safari e Mobile Safari, você precisa utilizar uma transformação 3D para forçar uma nova camada:

{% highlight css %}
.moving-element {
  transform: translateZ(0);
}
{% endhighlight %}

No entanto, deve-se tomar cuidado para não criar muitas camadas porque cada camada exige memória e gerenciamento. Para mais informações, consulte a seção [Continuar com propriedades compositor-only e gerenciar a contagem de camadas](stick-to-compositor-only-properties-and-manage-layer-count).

Se você promoveu um elemento a uma nova camada, use DevTools para confirmar que ao fazer isso o desempenho melhorou. **Não promova elementos sem perfilar.**

## Reduza áreas de pintura

No entanto, algumas vezes, apesar de promover elementos, o trabalho de pintura ainda é necessário. Um grande desafio de problemas de pintura é que os navegadores reúnem duas áreas que precisam de pintura, o que pode resultar na repintura de toda a tela. Portanto se houver um cabeçalho fixo no topo da página e algo estiver sendo pintado na parte inferior da página, toda a tela pode acabar sendo repintada.

{% include shared/remember.liquid title="Note" list=page.notes.highdpi %}

Reduzir as áreas de pintura é geralmente uma questão de coordenar animações e transições para não se sobreporem demais ou encontrar formas de evitar a animação de determinadas partes da página.

## Simplifique a complexidade da pintura
Quando falamos de pintura, algumas coisas são mais caras do que outras. Por exemplo, tudo que envolve um borrão (como uma sombra) levará mais tempo para pintar do que, digamos, desenhar uma caixa vermelha. No entanto, em termos de CSS, isso nem sempre é óbvio: `background: red;` e `box-shadow: 0, 4px, 4px, rgba(0,0,0,0.5);` não parecem ter uma característica de desempenho muito diferente, mas têm.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/profiler-chart.jpg" class="g--centered" alt="O tempo levado para pintar parte da tela.">

O gerador de perfis de pintura acima permitirá determinar a necessidade de se procurar outras formas de obter efeitos. Verifique se é possível usar um conjunto de estilos ou meios alternativos mais baratos para conseguir seu resultado final.

Sempre que possível evite pinturas durante determinadas animações porque os **10 ms** que você tem por frame normalmente não são longos o suficiente para finalizar a pintura, especialmente em dispositivos móveis.


