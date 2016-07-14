---
title: "Stick to compositor-only properties and manage layer count"
description: "Composição é onde as partes pintadas da página são agrupadas para exibição na tela."
updated_on: 2015-03-20
notes:
  flip:
    - "Se você está preocupado que não poderá limitar suas animações apenas para essas propriedades, veja o <a href='http://aerotwist.com/blog/flip-your-animations'>Princípio FLIP</a>, que pode ajudá-lo a remapear animações para mudanças de transforms e opacity de propriedades mais caras."
key-takeaways:
  - Atenha-se à mudanças de transforms e opacity para suas animações.
  - Promova elementos de movimentação com will-change ou translateZ.
  - Evite usar muitas regras de promoção; as camadas exigem mais memória e gerenciamento.
---
<p class="intro">
  Composição é onde as partes pintadas da página são agrupadas para exibição na tela.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

Há dois fatores principais nesta área que afetam o desempenho da página: o número de camadas do compositor que precisam ser gerenciadas e as propriedades usadas para animações.

## Use mudanças de transforms e opacity para animações
A versão de melhor desempenho do pixel pipeline evita o layout e a pintura e exige apenas mudanças de composição:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-no-layout-paint.jpg" class="g--centered" alt="O pixel pipeline sem layout ou pintura.">

Para isso, você precisará ater-se às propriedades de alteração que podem ser tratadas apenas pelo compositor. Hoje há apenas duas propriedades onde isso é acontece: **transforms** e **opacity**:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/safe-properties.jpg" class="g--centered" alt="As propriedades que você pode animar sem acionar o layout ou a pintura.">

A advertência para o uso de transforms e opacity é que o elemento no qual você altera essas propriedades deve estar em _sua própria camada do compositor_. Para criar uma camada, você deve promover o elemento, que será abordado a seguir.

{% include shared/remember.liquid title="Note" list=page.notes.flip %}

## Promova elementos que planeja animar

Como mencionado na seção “[Simplificar a complexidade da pintura e reduzir as áreas de pintura](simplify-paint-complexity-and-reduce-paint-areas)”, promova elementos a serem animados (com bom senso, sem exageros!) para sua própria camada:

{% highlight css %}
.moving-element {
  will-change: transform;
}
{% endhighlight %}

Para navegadores mais antigos ou aqueles que não suportam will-change:

{% highlight css %}
.moving-element {
  transform: translateZ(0);
}
{% endhighlight %}

Isso envia ao navegador uma advertência de que as alterações estão em andamento e, dependendo do que será alterado, o navegador pode realizar provisões, como a criação de camadas do compositor.

## Gerencie camadas e evite explosões de camada

Tendo em vista que as camadas podem ajudar no desempenho, talvez você considere promover todos os elementos na sua página da seguinte forma:

{% highlight css %}
* {
  will-change: transform;
  transform: translateZ(0);
}
{% endhighlight %}

Que é uma forma indireta de dizer que gostaria de promover todos os elemento da página. O problema é que cada camada criada exige memória e gerenciamento, que acarreta custos. Na verdade, em dispositivos com memória limitada, o impacto sobre o desempenho pode superar qualquer benefício de criação da camada. Cada textura de camada precisa ser carregada na GPU. Portanto, há mais restrições em termos de largura de banda entre CPU e GPU e memória disponível para texturas no GPU.

Em resumo, **não promova elementos desnecessariamente**.

## Use o Chrome DevTools para compreender as camadas em seu aplicativo

Para uma melhor compreensão das camadas em seu aplicativo e qualquer elemento que tenha uma camada, habilite o gerador de perfis de Pintura na Linha cronológica do Chrome DevTools:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/paint-profiler.jpg" class="g--centered" alt="A alternância para o gerador de perfis de pintura no Chrome DevTools.">

Com isso ativado, você precisará de uma gravação. Quando a gravação for finalizada, você poderá clicar em frames individuais, encontrado entre as barras frames-por-segundo e os detalhes:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-of-interest.jpg" class="g--centered" alt="Um frame que o desenvolvedor está interessado em perfilar.">

Clicar nisso trará uma nova opção nos detalhes: a guia camadas.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-tab.jpg" class="g--centered" alt="O botão da guia camadas no Chrome DevTools.">

Essa opção exibirá uma nova visualização que permite deslocar, digitalizar e ampliar em todas as camadas durante esse frame, junto com os motivos pelos quais cada camada foi criada.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-view.jpg" class="g--centered" alt="A visualização de camadas no Chrome DevTools.">

Com essa visualização você pode rastrear o número de camadas que possui. Se estiver gastando muito tempo na composição durante ações críticas de desempenho como rolagem ou transições (o ideal é algo em torno de **4-5 ms**), pode-se usar essa informação para verificar o número de camadas, por quê elas foram criadas e a partir desse ponto, gerenciar as contagens de camadas em seu aplicativo.


