project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Frequentemente, o JavaScript é o acionador de mudanças visuais. Algumas vezes, de forma direta, por meio de manipulações de estilo; outras, seus cálculos resultam em mudanças visuais, como pesquisa ou classificação de alguns dados. JavaScript delonga execução ou no momento errado pode ser uma causa comum de problemas de desempenho e, por isso, você deve buscar minimizar seu impacto ao máximo.

{# wf_updated_on: 2015-03-20 #}
{# wf_published_on: 2015-03-20 #}

# Reduzir o escopo e a complexidade dos cálculos de estilo {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Alterar o DOM, seja por meio da adição ou remoção de elementos, alteração de atributos, 
classes ou por animação, sempre fará o navegador recalcular 
o estilo dos elementos e, em muitos casos, diagramar a página (ou recriar o fluxo dela) ou de partes 
dela. Esse processo é chamado de <em>cálculo de estilo computado</em>.

A primeira parte do cálculo de estilos é criar um conjunto de seletores correspondentes. Basicamente, o navegador faz isso descobrindo quais classes, pseudosseletores e IDs se aplicam a um determinado elemento.

A segunda parte do processo envolve obter todas as regras de estilo dos seletores correspondentes e descobrir os estilos finais do elemento. No Blink (mecanismo de renderização do Chrome e Opera), esses processos são, no momento, basicamente equivalentes em custo:

> Aproximadamente 50% do tempo para se calcular o estilo computado de um elemento é usado para relacionar seletores, e a outra metade é usada para construir o RenderStyle (representação do estilo computado) das regras relacionadas.
> Rune Lillesveen, Opera / [Invalidação de estilo no Blink](https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/view)

### TL;DR {: .hide-from-toc }

* Reduza a complexidade dos seletores. Use uma metodologia orientada a classes, como o BEM.
* Reduza o número de elementos para os quais o estilo deve ser calculado.

## Reduza a complexidade dos seletores

No caso mais simples, você referencia um elemento no CSS com apenas uma classe:


    .title {
      /* styles */
    }


Mas, com o crescimento do projeto, o CSS provavelmente ficará mais complexo e você poderá ter seletores como este:


    .box:nth-last-child(-n+1) .title {
      /* styles */
    }


Para saber quais estilos precisam ser aplicados, o navegador deve perguntar "este é um elemento com uma classe de título que tem um elemento principal que é justamente o elemento menos enésimo filho mais 1 com uma classe de caixa?" Descobrir isso _pode_ demorar muito, dependendo do seletor usado e do navegador. O comportamento pretendido do seletor pode ser mudado para uma classe:


    .final-box-title {
      /* styles */
    }


Você pode não gostar do nome da classe, mas o trabalho fica muito mais simples para o navegador. Na versão anterior, para saber, por exemplo, se o elemento é o último do seu tipo, o navegador deve primeiro saber tudo sobre todos os outros elementos e se há algum elemento depois dele que seria o enésimo último filho. Isso possivelmente é muito mais caro do que simplesmente relacionar o seletor ao elemento porque a classe corresponde.

## Reduza o número de elementos sendo estilizados
Outra consideração de desempenho, que é geralmente _o fator mais importante para muitas atualizações de estilo_, é o grande volume de trabalho necessário quando um elemento muda.

Em termos gerais, o custo do pior caso de cálculo de estilo dos elementos computados é o número de elementos multiplicado pela contagem do seletor, porque a correspondência de cada elemento precisa ser verificada pelo menos uma vez em cada estilo.

Observação: anteriormente, se fosse feita uma mudança de classe, digamos, no elemento do corpo, todos os estilos computados dos secundários da página teriam que ser recalculados. Felizmente, isso não é mais necessário. Alguns navegadores mantêm uma pequena coleção de regras exclusivas para cada elemento que, se mudada, força o recálculo dos estilos do elemento. Isso significa que pode ou não ser necessário recalcular um elemento, dependendo de onde ele está na árvore e do que especificamente foi alterado.

Muitas vezes, os cálculos de estilo podem ser direcionados diretamente a alguns elementos, em vez de invalidar toda a página. Em navegadores modernos, isso não tende a ser um problema, porque ele não precisa verificar todos os elementos possivelmente afetados por uma mudança. Por outro lado, navegadores mais antigos não são necessariamente otimizados para essas tarefas. Onde possível, **reduza o número de elementos invalidados**.

Observação: Se você estiver utilizando Web Components, vale a pena notar que os cálculos de estilo são um pouco diferentes, já que, por padrão, os estilos não cruzam o limite do Shadow DOM e seus escopos são componentes individuais, em vez de a árvore como um todo. De forma geral, no entanto, o mesmo conceito é aplicado: árvores menores com regras mais simples são processadas com maior eficiência do que árvores grandes ou regras complexas.

## Meça o consumo do recálculo do seu estilo

A forma mais fácil e mais rápida de medir o consumo dos recálculos de estilo é usando o modo "Timeline" do Chrome DevTools. Para começar, abra o DevTools, acesse a guia Timeline, clique em Record e interaja com o site. Quando a gravação for interrompida, será exibida uma imagem como esta:

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/long-running-style.jpg"  alt="DevTools mostrando cálculos de estilo de longa execução.">

A faixa no topo indica os quadros por segundo. Se existirem barras acima da linha inferior (a linha de 60 fps), elas indicarão a existência de quadros de longa execução.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/frame-selection.jpg"  alt="Aproximar zoom de uma área problemática no Chrome DevTools.">

Se você tiver um quadro de longa duração durante uma interação, como rolagem ou alguma outra interação, será necessário examiná-lo mais detalhadamente.

Se você tiver um grande bloco roxo, como no caso acima, clique no registro para obter mais detalhes.

<img src="images/reduce-the-scope-and-complexity-of-style-calculations/style-details.jpg"  alt="Obter detalhes de cálculos de estilo de longa execução.">

Nessa captura, há um evento Recalculate Style de longa execução que demora um pouco mais de 18 ms e ocorre justamente durante uma rolagem, causando uma trepidação perceptível na experiência.

Se você clicar no evento, verá uma pilha de chamadas, que indica com precisão o local no JavaScript que aciona a mudança de estilo. Além disso, você receberá o número de elementos afetados pela mudança (neste caso, um pouco mais de 400 elementos) e quanto tempo foi gasto na execução dos cálculos de estilo. Você pode usar essas informações para tentar encontrar uma correção para o código.

## Use bloco, elemento, modificador

As abordagens à codificação, como o [BEM (bloco, elemento, modificador)](https://bem.info/){: .external }, na realidade, incorporam os benefícios de desempenho da correspondência de seletores acima porque recomendam uma única classe para tudo e, além disso, se uma hierarquia for necessária, será incorporada ao nome da classe:


    .list { }
    .list__list-item { }


Se você precisar de um modificador, como acima, onde queremos fazer algo especial para o último filho, poderá adicioná-lo da seguinte forma:


    .list__list-item--last-child {}


Se você estiver procurando uma boa forma de organizar o CSS, o BEM é um ótimo ponto de partida do ponto de vista estrutural e também por conta das simplificações na pesquisa de estilo.

Se você não gosta do BEM, há outras formas de abordar o CSS, mas as considerações de desempenho devem ser avaliadas junto com a ergonomia da abordagem.

## Recursos

* [Invalidação de estilo no Blink](https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/edit)
* [BEM (bloco, elemento, modificador)](https://bem.info/){: .external }


{# wf_devsite_translation #}
