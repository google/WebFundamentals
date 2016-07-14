---
title: "Reduce the scope and complexity of style calculations"
description: "Mudando o DOM, através da adição e remoção de elementos, mudando atributos, classes ou através da animação, fará com que o navegador recalcule estilos de elemento e, em vários casos, o layout (ou refluxo) da página ou partes dela. Esse processo é chamado de cálculo de estilo computado."
updated_on: 2015-03-20
notes:
  components:
    - "Se estiver utilizando o Web Components, note que os cálculos de estilo são um pouco diferentes, pois os estilos padrões não cruzam o limite do Shadow DOM e são planejados para componentes individuais em vez da árvore como um todo. Em linhas gerais, contudo, o mesmo conceito é aplicado: árvores menores com regras mais simples são processadas de forma mais eficaz do que árvores grandes ou regras complexas."
  bodystylechange:
    - "Anteriormente, se fosse feita uma mudança de classe no elemento do corpo, todos os estilos computados dos filhos na página precisavam ser recalculados. Felizmente, esse não é mais o caso. Alguns navegadores mantêm uma pequena coleção de regras exclusivas para cada elemento que, se mudada, efetua o recálculo dos estilos do elemento. Isso significa que um elemento pode ou não precisar ser recalculado dependendo de onde ele está na árvore e do que foi mudado especificamente."

key-takeaways:
  - "Reduza a complexidade dos seus seletores; use uma metodologia orientada para classe, como o BEM."
  - "Reduza o número de elementos em que o cálculo de estilo deve ser calculado."

---
<p class="intro">
  Mudando o DOM, através da adição e remoção de elementos, mudando atributos, classes ou através da animação, fará com que o navegador recalcule estilos de elemento e, em vários casos, o layout (ou refluxo) da página ou partes dela. Esse processo é chamado de <em>cálculo de estilo computado</em>.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

A primeira parte dos estilos de computação é criar um conjunto de seletores correspondentes, que é basicamente o navegador descobrindo quais classes, pseudo-seletores e IDs são aplicados a um determinado elemento.

A segunda parte do processo envolve pegar todas as regras de estilo dos seletores correspondentes e descobrir qual o estilo final do elemento. No Blink (mecanismo de renderização do Chrome e Opera), esses processos são, ao menos hoje, basicamente equivalentes em custo:

<div class="quote" style="margin-top: 30px;">
  <div class="container">
    <blockquote class="quote__content g-wide--push-1 g-wide--pull-1 g-medium--push-1">Basicamente 50% do tempo para calcular o estilo computador para um elemento é usado para corresponder seletores, e a outra metade do tempo é usada para construir o RenderStyle (representação de estilo computado) das regras correspondentes.
    <p>Rune Lillesveen, Opera/ <a href="https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/edit">Invalidação de Estilo no Blink</a></p>
    </blockquote>
  </div>
</div>


## Reduza a complexidade dos seus seletores

No mais simples dos casos, você referencia um elemento em seu CSS com apenas uma classe:

{% highlight css %}
.title {
  /* styles */
}
{% endhighlight %}

Mas, conforme o projeto cresce, provavelmente resultará em CSS mais complexos e você acabará com os seguintes seletores:

{% highlight css %}
.box:nth-last-child(-n+1) .title {
  /* styles */
}
{% endhighlight %}

Para saber quais estilos precisam para ser aplicados, o navegador deve perguntar “este é um elemento com uma classe de título que tem um elemento principal que é justamente o elemento minus nth child plus 1 com uma classe de caixa?” Descobrir isso _pode_ levar muito tempo, dependendo do seletor usado e do navegador. O comportamento pretendido do seletor pode ser mudado para uma classe:

{% highlight css %}
.final-box-title {
  /* styles */
}
{% endhighlight %}

Você pode ter problemas com o nome da classe, mas o trabalho fica muito mais simples para o navegador. Na versão anterior, para saber, por exemplo, se o elemento é o último do seu tipo, o navegador deve primeiro saber tudo sobre todos os outros elementos e se há algum elemento depois dele que seria o nth-last-child, que é possivelmente muito mais caro do que simplesmente relacionar o seletor ao elemento porque a classe corresponde.

## Reduza o número de elementos sendo estilizados
Outra consideração de desempenho, que é geralmente _o fator mais importante para muitas atualizações de estilo_, é o grande volume de trabalho que precisa ser realizado quando um elemento muda.

Em termos gerais, o pior caso de custo de cálculo de estilo dos elementos computados é o número de elementos multiplicado pela contagem do seletor, porque cada elemento precisa ser verificado pelo menos uma vez em cada estilo para ver se corresponde.

{% include shared/remember.liquid title="Note" list=page.notes.bodystylechange %}

Geralmente, os cálculos de estilo podem enfatizar alguns elementos diretamente em vez de invalidar a página toda. Em navegadores modernos, isso não tende a ser um problema, porque ele não precisa verificar todos os elementos possivelmente afetados por uma mudança. Por outro lado, navegadores mais antigos não são necessariamente otimizados para essas tarefas. Onde possível, **reduza o número de elementos invalidados**.

{% include shared/remember.liquid title="Note" list=page.notes.components %}

## Meça seu custo de recálculo de estilo
A melhor forma e também a mais fácil de medir o custo de recálculos de estilo é usar o modo Linha cronológica do Chrome DevTools. Para começar, abra o DevTools, vá para a guia Linha cronológica, clique em registro e interaja com o seu site. Quando parar de gravar, uma imagem como esta será exibida.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/long-running-style.jpg" class="g--centered" alt="DevTools mostrando cálculos de estilo de longa execução.">

A faixa no topo indica frames por segundo e, se houver barras acima da linha inferior, a linha de 60 fps, serão frames de longa execução.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/frame-selection.jpg" class="g--centered" alt="Ampliando uma área de problemas no Chrome DevTools.">

Se você tiver um frame de longa duração durante uma interação, como rolagem ou alguma outra interação, ele traz uma análise mais profunda.

Se você tiver um grande bloco roxo, como no caso acima, clique no registro e você receberá mais detalhes.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/style-details.jpg" class="g--centered" alt="Obtendo detalhes de cálculos de estilo de longa execução.">

Neste ponto, há um evento Recalcular Estilo, de longa execução, que leva um pouco mais de 18 ms e está ocorrendo justamente durante uma rolagem, causando uma trepidação perceptível na experiência.

Se clicar no evento, você recebe uma pilha de chamadas, que indica o local em seu JavaScript responsável por acionar a mudança de estilo. Além disso, você recebe vários elementos que foram afetados pela mudança (nesse caso, um pouco mais de 400 elementos) e quanto tempo levou para realizar os cálculos de estilo. Você pode usar essa informação para tentar localizar uma correção em seu código.

## Use o Block, Element, Modifier
Abordagens para codificação como [BEM (Block, Element, Modifier)](https://bem.info/) na realidade agrupam no seletor os benefícios de desempenho correspondentes acima porque recomenda uma única classe e, quando uma hierarquia for necessária, também é agrupada no nome da classe:

{% highlight css %}
.list { }
.list__list-item { }
{% endhighlight %}

Se precisar de um modificador, como acima, onde desejamos algo especial para o último filho, pode-se adicionar como:

{% highlight css %}
.list__list-item--last-child {}
{% endhighlight %}

Se você estiver procurando uma forma de organizar seu CSS, o BEM é um bom ponto de partida do ponto de vista estrutural e também por conta das simplificações da pesquisa de estilo.

Se não gosta do BEM, há outras formas de abordar seu CSS, mas as considerações de desempenho devem ser avaliadas junto com a ergonomia da abordagem.

## Recursos

* [Invalidação de estilo no Blink](https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/edit)
* [BEM (Block, Element, Modifier)](https://bem.info/)


