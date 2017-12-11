project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A composição é o agrupamento das partes gravadas da página para exibição na tela.

{# wf_updated_on: 2015-03-20 #}
{# wf_published_on: 2015-03-20 #}

# Trabalhar apenas com propriedades do compositor e gerenciar o número de camadas {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

A composição é o agrupamento das partes gravadas da página 
para exibição na tela.

Há dois fatores principais nesta área que afetam o desempenho da página: o número de camadas do compositor que precisam ser gerenciadas e as propriedades usadas para animações.

### TL;DR {: .hide-from-toc }

* Limitar-se a mudanças de "transform" e "opacity" nas animações.
* Promover elementos movimentáveis com `will-change` ou `translateZ`.
* Evitar uso excessivo das regras de promoção — as camadas exigem memória e gerenciamento.

## Use mudanças de transform e opacity para animações

A versão do pipeline de pixels com o melhor desempenho evita o layout e a coloração e exige apenas mudanças de composição:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-no-layout-paint.jpg"  alt="O pipeline de pixels sem layout ou coloração.">

Para isso, você precisará se limitar a mudar propriedades que podem ser tratadas apenas pelo compositor. Atualmente, existem apenas duas propriedades onde isso é verdade: **`transforms`** e **`opacity`**:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/safe-properties.jpg"  alt="As propriedades que podem ser animadas sem acionar o layout ou a coloração.">

A limitação do uso de `transform`s e `opacity` é que o elemento em que essas propriedades são alteradas deve estar em _sua própria camada de composição_. Para criar uma camada, você deve promover o elemento. Veremos esse tópico a seguir.

Observação: se você está preocupado que pode não ter como limitar as animações apenas para a propriedades, dê uma olhada no [Princípio FLIP](https://aerotwist.com/blog/flip-your-animations) para obter ajudar para remapear as animações nas mudanças de transforms e opacity por parte de propriedades mais pesadas.

## Promover os elementos que serão animados

Como mencionado na seção "[Simplificar a complexidade da coloração e reduzir as áreas de coloração](simplify-paint-complexity-and-reduce-paint-areas)", promova os elementos que pretende animar (com bom senso, sem exageros!) para a sua própria camada:


    .moving-element {
      will-change: transform;
    }


Ou, para navegadores mais antigos ou que não permitem will-change:


    .moving-element {
      transform: translateZ(0);
    }


Isso envia ao navegador uma advertência sobre alterações iminentes. Dependendo do que será alterado, o navegador poderá tomar algumas medidas, como a criação de camadas do compositor.

## Gerenciar camadas e evitar um número excessivo de camadas

Como as camadas podem frequentemente ajudar no desempenho, pode ser tentador promover todos os elementos da página da seguinte forma:


    * {
      will-change: transform;
      transform: translateZ(0);
    }


O que é uma forma indireta de dizer que você quer promover todos os elementos da página. O problema é que cada camada criada exige memória e gerenciamento, e isso gera custos. Na verdade, em dispositivos com memória limitada, o impacto negativo sobre o desempenho pode superar qualquer benefício da criação da camada. Cada textura de camada precisa ser carregada na GPU. Portanto, há mais restrições em termos de largura de banda entre a CPU e a GPU e de memória disponível para texturas na GPU.

Aviso: não promova elementos sem necessidade.

## Usar o Chrome DevTools para compreender as camadas do aplicativo

<div class="attempt-right">
  <figure>
    <img src="images/stick-to-compositor-only-properties-and-manage-layer-count/paint-profiler.jpg" alt="A ativação do gerador de perfis de coloração no Chrome DevTools.">
  </figure>
</div>

Para uma melhor compreensão das camadas do aplicativo e do motivo pelo qual um elemento tem uma camada, ative o gerador de perfis de coloração no Timeline do Chrome DevTools:

<div style="clear:both;"></div>

Após a ativação, faça uma gravação. Quando a gravação for finalizada, você poderá clicar em quadros individuais que se encontram entre barras de quadros por segundo e os detalhes:

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-of-interest.jpg"  alt="Um quadro para o qual o desenvolvedor quer gerar um perfil.">

Clique no quadro para exibir uma nova opção nos detalhes: uma guia Layer.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-tab.jpg"  alt="O botão da guia Layer no Chrome DevTools.">

Essa opção exibirá uma nova visualização que permite deslocar, percorrer e aumentar o zoom em todas as camadas desse quadro, bem como os motivos pelos quais cada camada foi criada.

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-view.jpg"  alt="A visualização de camadas no Chrome DevTools.">

Com essa visualização, você pode controlar o número de camadas. Se você estiver gastando muito tempo na composição durante ações de desempenho crítico, como rolagem ou transições (o ideal é algo em torno de **4 a 5 ms**), poderá usar essas informações para verificar o número de camadas e o motivo da sua criação, além de gerenciar o número de camadas do aplicativo.


{# wf_devsite_translation #}
