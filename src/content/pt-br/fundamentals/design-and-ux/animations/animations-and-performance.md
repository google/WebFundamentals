project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Animações devem ter um bom desempenho, caso contrário, afetarão negativamente a experiência do usuário.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Animações e desempenho {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

Mantenha 60 fps sempre que você estiver animando, pois um valor inferior resultará em saltos ou tremidas que serão observados pelos seus usuários e afetarão negativamente a experiência.

### TL;DR {: .hide-from-toc }
* Tome cuidado para que suas animações não causem problemas de desempenho; conheça o impacto da animação de uma determinada propriedade CSS.
* Animar propriedades que mudam a geometria da página (layout) ou causam pinturas são particularmente caras.
* Sempre que possível, opte pela mudança de transformações e opacidade.
* Use  <code>will-change</code> para garantir que o navegador saiba o que você planeja animar.


Animar propriedades não é gratuito e algumas propriedades são mais baratas do que outras. Por exemplo, animar a `width` e a `height` de um elemento muda sua geometria e pode fazer com que outros elementos da página se movam ou mudem de tamanho. Esse processo é chamado de *layout* (ou *refluxo* em navegadores baseados em Gecko, como o Firefox) e pode ser caro se sua página tiver muitos elementos. Sempre que o layout for acionado, a página ou parte dela normalmente precisará ser pintada, o que é geralmente mais caro do que a própria operação de layout.

Sempre que possível, evite animar propriedades que acionam layout ou pintura. Para a maioria dos navegadores modernos, isso significa limitar animações para `opacity` ou `transform`. Ambas podem ser altamente otimizadas pelo navegador, não importando se a animação é gerenciada por JavaScript ou CSS.

Para obter uma lista completa dos trabalhos acionados por propriedades CSS individuais, consulte [Acionadores CSS](http://csstriggers.com). Encontre um guia completo sobre como criar [Animações de alto desempenho no HTML5 Rocks](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/).

### Usando a propriedade will-change

Use [`will-change`](https://dev.w3.org/csswg/css-will-change/) para garantir que o navegador saiba que você pretende alterar a propriedade de um elemento. Isso permite que o navegador realize as otimizações mais adequadas antes de fazer a alteração. Não utilize `will-change` excessivamente, pois isso pode fazer com que o navegador desperdice recursos, o que, por sua vez, causa ainda mais problemas de desempenho.

A regra geral é que, se a animação puder ser acionada nos próximos 200 ms, seja pela interação de um usuário ou por causa do estado do seu aplicativo, ter `will-change` em elementos de animação é uma boa escolha. Para a maioria dos casos, qualquer elemento na visualização atual do aplicativo que você pretende animar deve ter `will-change` ativado para qualquer propriedade a ser alterada. No caso do exemplo de caixa que usamos nos guias anteriores, ao adicionar `will-change` para transformações e opacidade, teremos o seguinte resultado:


    .box {
      will-change: transform, opacity;
    }
    

Já os navegadores compatíveis, [atualmente o Chrome, o Firefox e o Opera](http://caniuse.com/#feat=will-change), farão as otimizações adequadas em segundo plano para oferecer suporte a alteração ou animação dessas propriedades.

## Desempenho do CSS vs JavaScript

Há muitos encadeamentos de páginas e comentários na Web que discutem os méritos relativos das animações CSS e JavaScript de uma perspectiva de desempenho. Alguns conceitos que devem ser considerados:

* Animações baseadas em CSS e animações da Web com suporte nativo geralmente são gerenciadas em um encadeamento conhecido como "encadeamento de composição". Isso é diferente do "encadeamento principal" do navegador, no qual o estilo, o layout, a pintura e o JavaScript são executados. Isso significa que, se o navegador estiver executando algumas tarefas caras no encadeamento principal, essas animações podem continuar sem interrupções.

* Outras alterações em transformações e opacidade podem, em muitos casos, também ser gerenciadas pelo encadeamento de composição.

* Se qualquer animação acionar uma pintura, um layout ou ambos, o "encadeamento principal" será solicitado. Isso vale para animações baseadas em CSS e JavaScript e a sobrecarga do layout ou pintura provavelmente minimizará qualquer trabalho associado à execução do CSS ou JavaScript, tornando a questão discutível.

Para saber mais sobre quais trabalhos são acionados ao animar determinada propriedade, consulte [Acionadores CSS](http://csstriggers.com).




{# wf_devsite_translation #}
