---
title: "Animations and Performance"
description: "Animações devem ter um bom desempenho, caso contrário, impactarão negativamente a experiência do usuário."
updated_on: 2014-10-21
key-takeaways:
  code:
    - "Tome cuidado para que suas animações não causem problemas de desempenho; certifique-se de saber o impacto da animação de uma determinada propriedade CSS."
    - "Animar propriedades que mudam a geometria da página (layout) ou causam pinturas são particularmente caras."
    - "Onde possível, opte pela mudança de transforms e opacity."
    - "Use <code>will-change</code> para garantir que o navegador saiba o que você planeja animar."

related-guides:
  blocking-css:
  -
      title: "Render Blocking CSS"
      href: fundamentals/performance/critical-rendering-path/render-blocking-css.html
      section:
        title: "Critical Rendering Path"
        href: performance/critical-rendering-path/
---
<p class="intro">
  Deve-se ter cuidado para manter 60 fps sempre que você estiver animando, porque qualquer salto ou tremida será observada pelos seus usuários e impactará negativamente a experiência.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

Animar propriedades não é gratuito e algumas propriedades são mais baratas do que outras. Por exemplo, animar o `width` e `height` de um elemento muda sua geometria e pode fazer com que outros elementos da página se movam ou mudem de tamanho. Esse processo é chamado de layout (ou refluxo em navegadores baseados em Gecko como o Firefox) e pode ser caro se sua página tiver muitos elementos. Sempre que o layout for acionado, a página ou parte dela normalmente precisará ser pintada, que é geralmente mais caro do que a própria operação de layout.

Onde possível, evite animar propriedades que acionam layout ou pintura. Para a maioria dos navegadores modernos isso significa limitar animações para `opacity` ou `transform`. Ambas podem ser altamente otimizadas pelo navegador, não importando se a animação é tratada por JavaScript ou CSS.

Obtenha uma lista completa do trabalho acionado por propriedades CSS individuais em [Acionadores CSS](http://csstriggers.com) e encontre um guia completo sobre como criar [Animações de alto desempenho no HTML5 Rocks](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/).

{% include shared/related_guides.liquid inline=true list=page.related-guides.blocking-css %}

### Usando a propriedade will-change

Vale a penar usar [`will-change`](http://dev.w3.org/csswg/css-will-change/) para garantir que o navegador saiba que você pretende mudar a propriedade de um elemento. Isso permite que o navegador coloque as otimizações mais adequadas no local antes de você fazer a mudança. Deve-se ter cuidado para não utilizar demais o `will-change`. No entanto, pode fazer com que o navegador gaste recursos, que por sua vez causará ainda mais problemas de desempenho.

A regra geral é que se a animação pode ser acionada nos próximos 200 ms, seja pela interação de um usuário ou por causa do estado do seu aplicativo, ter will-change em elementos de animação é uma boa escolha. Para a maioria dos casos, qualquer elemento na exibição atual do aplicativo que você pretende animar deve ter `will-change` habilitado para qualquer propriedade a ser alterada. No caso da amostra de caixa que usamos nos guias anteriores, ao adicionar `will-change` para transforms e opacity teremos o seguinte resultado:

{% highlight css %}
.box {
  will-change: transform, opacity;
}
{% endhighlight %}

Já os navegadores com suporte, atualmente o Chrome, Firefox e Opera, farão as otimizações adequadas de forma secundária para suportar a mudança ou animação dessas propriedades.

## Desempenho do CSS vs JavaScript

Há muitos threads de páginas e comentários na Web que discutem os méritos relacionados das animações CSS e JavaScript de uma perspectiva de desempenho. Aqui há alguns pontos que se deve ter em mente:

* Animações baseadas em CSS são geralmente tratadas em um thread separado do “thread principal” do navegador, onde estilo, layout, pintura e JavaScript são executados. Isso significa que se o navegador estiver executando algumas tarefas caras no thread principal, as animações baseadas em CSS possivelmente continuarão sem interrupções. Mudanças em transforms e opacity podem, em vários casos, ser tratadas pelo mesmo thread que as animações baseadas em CSS, chamado de “thread compositor”. Portanto, o ideal é você continuar usando esse thread em suas animações.
* Se qualquer animação acionar uma pintura, layout ou ambos, o “thread principal" será solicitado. Isso vale para animações baseadas em CSS e JavaScript e a sobrecarga do layout ou pintura provavelmente minimizará qualquer trabalho associado à execução do CSS ou JavaScript, tornando a questão discutível.

Se você deseja saber exatamente qual trabalho é acionado com a animação de uma determinada propriedade, veja [Acionadores CSS](http://csstriggers.com) para obter mais detalhes.


