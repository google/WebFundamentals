project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A função da semântica na navegação de páginas


{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-10-04 #}

# A semântica e a navegação de conteúdo {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Você já aprendeu sobre affordances, semântica e como as tecnologias assistivas usam
a árvore de acessibilidade para criar uma experiência alternativa para seus usuários.
Como você pode ver, programar um HTML semântico e expressivo proporciona
muita acessibilidade sem exigir muito esforço, pois muitos elementos padrão têm
a semântica e o comportamento de suporte incorporados.

Nesta lição, abordaremos algumas das semânticas menos óbvias que são muito importantes para usuários
de leitores de tela, especialmente em termos de navegação. Em uma página simples com
muitos controles, mas pouco conteúdo, é fácil procurar o que
você precisa. No entanto, em uma página com muito conteúdo, como uma entrada da Wikipédia ou um agregador
de notícias, não é prático ler todo o conteúdo da página. É preciso
encontrar uma maneira eficiente de navegar pelo conteúdo.

Os desenvolvedores frequentemente têm a concepção errada de que leitores de tela são lentos e tediosos
de usar, ou que todos os elementos da tela precisam ser focáveis para que o leitor
de tela os encontrem. Esse frequentemente não é o caso.

Os usuários de leitores de tela muitas vezes usam uma lista de cabeçalhos para localizar informações. A maioria
dos leitores de tela tem maneiras fáceis de isolar e analisar uma lista de cabeçalhos de páginas, um
importante recurso chamado *rotor*. Vejamos como usar cabeçalhos HTML
de forma eficaz para oferecer suporte a esse recurso.

## Usar cabeçalhos de forma eficaz

Primeiramente, vamos enfatizar um conceito que vimos antes: [*a ordem do DOM
é importante*](/web/fundamentals/accessibility/focus/dom-order-matters), não só para a
ordem do foco, mas também para a ordem do leitor de tela. Conforme você experimenta com leitores de tela
como o VoiceOver, o NVDA, o JAWS e o ChromeVox, você descobrirá que a lista de cabeçalhos segue
a ordem do DOM, não a ordem visual.

Isso é válidos para leitores de tela de uma forma geral. Como os leitores de tela interagem com
a árvore de acessibilidade e ela é baseada na árvore de DOM, a ordem
que o leitor identifica é baseada diretamente no DOM. Isso
significa que uma estrutura de cabeçalhos apropriada é mais importante do que nunca.

Na maioria das páginas bem estruturadas, os níveis dos cabeçalhos são aninhados para indicar relações
de pai-filho entre os blocos de conteúdo. A [lista de verificação
WebAIM](http://webaim.org/standards/wcag/checklist) menciona essa técnica
várias vezes.

 - [1.3.1](http://webaim.org/standards/wcag/checklist#sc1.3.1){: .external }
 indica que “a marcação semântica é usada para designar cabeçalhos”
 - [2.4.1](http://webaim.org/standards/wcag/checklist#sc2.4.1){: .external }
 menciona que a estrutura de cabeçalhos é uma técnica para ignorar
 blocos de conteúdo
 - [2.4.6](http://webaim.org/standards/wcag/checklist#sc2.4.6){: .external }
 discute alguns detalhes sobre como escrever cabeçalhos úteis
 - [2.4.10](http://webaim.org/standards/wcag/checklist#sc2.4.10){: .external }
 declara que “seções individuais de conteúdo são designadas usando cabeçalhos,
 quando apropriado”

Nem todos os cabeçalhos precisam estar visíveis na tela.
A [Wikipédia](https://www.wikipedia.org/), por exemplo, usa uma técnica que
propositalmente posiciona alguns cabeçalhos fora da tela para torná-los especificamente
acessíveis *apenas* para leitores de tela e outras tecnologias assistivas.

    <style>
      .sr-only {
        position:absolute;
        left:-10000px;
        top:auto;
        width:1px;
        height:1px;
        overflow:hidden;
      }
    </style>

    <h2 class="sr-only">This heading is offscreen.</h2>

Observação: o site WebAIM discute essa técnica extensivamente [neste
artigo sobre conteúdo fora da tela](http://webaim.org/techniques/css/invisiblecontent/).

Para aplicativos completos, essa pode ser uma boa forma de acomodar cabeçalhos quando
o design visual não exige ou tem espaço para um cabeçalho visível.

Warning: é importante ser comedido ao usar essa técnica. Lembre-se de que
usuários de tecnologias assistivas também podem conseguir enxergar a tela, então
exagerar ao tentar criar um conteúdo “apenas para leitores de tela” pode
acabar prejudicando a experiência de alguns usuários. Isso também pode criar
problemas de manutenção para você posteriormente.

## Outras opções de navegação

Apesar de páginas com bons cabeçalhos ajudarem usuários de leitores de tela a navegar, existem
outros elementos que podem ser usados para navegar por uma página, incluindo*links*, *controles
de forma* e *marcos*.

Os leitores podem usar o recurso de rotor do leitor de tela (uma maneira fácil de isolar e
analisar uma lista de cabeçalhos de página) para acessar uma *lista de links* na página.
Às vezes, um wiki contém muitos links, portanto, o leitor poderá procurar
por um termo dentro dos links. Isso limita os resultados a links que realmente contêm o
termo em vez de mostrar todas as ocorrências do termo na página.

Esse recurso é útil apenas se o leitor de tela puder encontrar os links e o texto dos
links for significativo. Por exemplo, existem alguns padrões comuns que tornam os links
difíceis de encontrar.

 - Tags de âncora sem atributos `href`. Frequentemente usadas em aplicativos de
 uma página, esses destinos de link causam problemas para leitores de tela. Você pode
 ler mais a respeito [neste artigo sobre aplicativos de uma página](http://neugierig.org/software/blog/2014/02/single-page-app-links.html).
 - Botões implementados com links. Eles fazem com que o leitor de tela
 interprete o conteúdo como um link e a funcionalidade de botão é perdida. Para
 esses casos, substitua a tag de âncora por um botão de verdade e escolha um estilo
 apropriado para ele.
 - Imagem usada como conteúdo de link. Às vezes necessárias, imagens com links podem
 ser inutilizáveis para leitores de tela. Para garantir que o link seja corretamente exposto à
 tecnologia assistiva, garanta que a imagem tenha o texto de atributo `alt`.

O texto de link inapropriado é outro problema. Expressões clicáveis como “saiba mais” ou “clique
aqui” não fornecem informações semânticas sobre o destino do link. Em vez disso, use
um texto descritivo como “saiba mais sobre o design responsivo” ou “consulte este tutorial
sobre canvas” para ajudar os leitores de tela a fornecer conteúdo significativo sobre os links.

O rotor também pode recuperar uma *lista de controles de forma*. Com essa lista, os leitores podem
pesquisar itens específicos e ir diretamente a eles.

Um erro comum cometido por leitores de tela é a pronúncia. Por exemplo, um leitor
de tela pode pronunciar "Udacity" como "oo-dacity", ou ler um número de telefone
como um número inteiro longo, ou mesmo ler texto em maiúsculas como se ele fosse um acrônimo.
O interessante é que os usuários de leitores de tela estão muito acostumados com essa peculiaridade e a levam em
consideração.

Alguns desenvolvedores tentam amenizar essa situação fornecendo textos exclusivos para leitores de tela
com ortografia fonética. Uma regra simples para a ortografia fonética:
**evite-a**! Ela apenas piora a situação. Se, por exemplo, um usuário estiver usando
um terminal braille, a palavra estará escrita incorretamente, causando mais
confusão. Leitores de tela permitem que as palavras sejam soletradas, então deixe que o
usuário controle sua experiência e decida quando isso é necessário.

Os leitores podem usar o rotor para ver uma *lista de marcos*. Essa lista os ajuda
a encontrar o conteúdo principal e definir um conjunto de marcos de navegação fornecidos pelos elementos de marcos
HTML.

O HTML5 introduziu alguns novos elementos para ajudar a definir a estrutura semântica da
página, incluindo `header`, `footer`, `nav`, `article`, `section`, `main` e
`aside`. Esses elementos especificamente fornecem indicações estruturais na página
sem forçar estilos incorporados (o que é obrigatório no CSS).

Elementos estruturais semânticos substituem o uso de vários blocos `div` repetitivos e oferecem
uma maneira mais clara e descritiva de expressar a estrutura da página
intuitivamente para autores e leitores.




{# wf_devsite_translation #}
