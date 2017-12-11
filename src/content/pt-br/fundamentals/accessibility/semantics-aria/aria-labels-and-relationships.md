project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Uso de rótulos ARIA para criar descrições acessíveis de elementos


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Rótulos e Relações de ARIA {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

## Rótulos

ARIA fornece vários mecanismos para adicionar rótulos e descrições a elementos.
Na verdade, ARIA é a única maneira de adicionar texto acessível de ajuda ou descrição. Vejamos
as propriedades que ARIA usa para criar rótulos acessíveis.

### aria-label

`aria-label` nos permite especificar uma string para ser usado como o rótulo acessível.
Este substitui qualquer outro mecanismo de rotulagem nativo, como um elemento `label`
&mdash; por exemplo, se um `button` tem um conteúdo de texto e um `aria-label`,
somente o valor `aria-label` será usado.

Você pode usar um atributo `aria-label` quando tem algum tipo de indicação
visual da finalidade de um elemento, como um botão que utiliza um gráfico, em vez
de texto, mas ainda precisa esclarecer essa finalidade para quem não consegue acessar
a indicação visual, como um botão que usa apenas uma imagem para indicar
sua finalidade.

![usando aria-label para identificar um botão sinalizado apenas por imagem ](imgs/aria-label.jpg)

### aria-labelledby

`aria-labelledby` nos permite especificar o ID de outro elemento no DOM como
o rótulo de um elemento.

![usando aria-labelledby para identificar um grupo de opção](imgs/aria-labelledby.jpg)

Isso é muito parecido com usar um elemento `label`, com algumas diferenças fundamentais.

 1. `aria-labelledby` pode ser usado em qualquer elemento, não apenas em elementos rotuláveis.
 1. Enquanto um elemento `label` refere-se àquilo que ele rotula, a relação é
revertida caso a `aria-labelledby` &mdash; coisa  a ser rotulada
refira-se àquilo que ela rotula.
 1. Somente um elemento de rótulo pode estar associado a um elemento rotulável, mas
`aria-labelledby` pode tomar uma lista de IDREFS para compor
um rótulo de múltiplos elementos. O rótulo será concatenado na ordem em que os IDREFS são
    fornecidos.
 1. Você pode usar `aria-labelledby` para se referir a elementos que estão ocultos e que
    de outra forma, não estariam na árvore de acessibilidade. Por exemplo, você pode adicionar um
    `span` oculto  ao lado de um elemento que deseja rotular, e referir-se a ele com
    `aria-labelledby`.
 1. No entanto, como ARIA só afeta a árvore de acessibilidade, `aria-labelledby`
    não proporciona o comportamento familiar de clicar no rótulo obtido ao se usar um
elemento    `label`.

É importante notar que, `aria-labelledby` modifica **todas** as outras fontes de nome para um
elemento. Assim, por exemplo, se um elemento tem um `aria-labelledby` e um
`aria-label`, ou um `aria-labelledby` e um `label` HTML nativo, o
rótulo `aria-labelledby` sempre tem precedência.

## Relações

`aria-labelledby` é um exemplo de um *atributo de relação*. Um atributo de relação
cria uma relação semântica entre elementos na página,
independentemente de sua relação DOM. No caso de `aria-labelledby`, essa
relação é "este elemento é rotulado por aquele elemento".

A especificação ARIA lista [oito atributos de
relação](https://www.w3.org/TR/wai-aria/states_and_properties#attrs_relationships){: .external }.
Seis deles, `aria-activedescendant`, `aria-controls`, `aria-describedby`,
`aria-labelledby`, e `aria-owns`, fazem referência a um ou mais elementos para
criar uma nova ligação entre elementos da página. A diferença, em cada caso, é
o que essa ligação significa e como ela é apresentada aos usuários.

### aria-owns

`aria-owns` é uma das relações ARIA mais amplamente utilizadas. Este atributo
nos permite informar à tecnologia assistiva que um elemento que está separado no
DOM deve ser tratado como um filho do elemento atual, ou para reorganizar
os elementos filhos existentes em uma ordem diferente. Por exemplo, se um sub-menu
de pop-up está posicionado visualmente perto de seu menu pai, mas não pode
ser um filho DOM de seu pai, porque isso afetaria a apresentação visual,
você pode usar `aria-owns` para apresentar o sub-menu como um filho do menu pai a um
leitor de tela.

![usando aria-owns para estabelecer uma relação entre um menu e um sub-menu](imgs/aria-owns.jpg)

### aria-activedescendant

`aria-activedescendant` desempenha um papel relacionado. Assim como o elemento ativo de uma
página é aquele que tem o foco, definir o descendente ativo de um elemento
nos permite informar à tecnologia assistiva que um elemento deve ser apresentado
ao usuário como o elemento em foco quando o seu pai, na verdade, tem o foco. Por
exemplo, em uma caixa de listagem, você pode querer deixar a página focar no
recipiente da caixa de listagem, mas manter seu atributo `aria-activedescendant` atualizado para o item da lista
selecionado no momento. Isso faz com que o item selecionado no momento apareça para a
tecnologia assistiva como se fosse o item em foco.

![usando aria-activedescendant para estabelecer uma relação em uma caixa de listagem](imgs/aria-activedescendant.jpg)

### aria-describedby

`aria-describedby` fornece uma descrição acessível da mesma forma que
`aria-labelledby` fornece um rótulo. Como `aria-labelledby`, `aria-describedby`
pode fazer referência a elementos que de outro modo não são visíveis, estejam eles ocultos do
DOM, ou ocultos para usuários de tecnologia assistiva. Esta é uma técnica útil quando existe
algum texto explicativo extra que um usuário pode precisar, quer aplique-se apenas
a usuários de tecnologia assistiva ou a todos os usuários.

Um exemplo comum é um campo de entrada de senha que é acompanhado por
algum texto descritivo que explica os requisitos mínimos da senha. Ao contrário de um rótulo,
esta descrição pode ou não ser apresentada ao usuário; ele pode ter a
escolha de se acessá-la, ou ela pode vir depois de todas as outras informações,
ou pode ser influenciada por outra coisa. Por exemplo, se o usuário estiver inserindo
informações, essa interação será ecoada de volta e pode interromper a descrição 
do elemento. Portanto, uma descrição é uma ótima maneira de comunicar informações
suplementares, mas não essenciais; ela não fica no caminho de informações
 mais críticas, como o papel do elemento.

![usando aria-describedby para estabelecer uma relação com um campo de senha](imgs/aria-describedby.jpg)

### aria-posinset & aria-setsize

Os atributos de relação restantes são um pouco diferentes, e trabalhar em conjunto.
`aria-posinset` ("posição no conjunto") e `aria-setsize` ("tamanho do conjunto")
definem uma relação entre elementos irmãos em um conjunto, como uma lista.

Quando o tamanho de um conjunto não pode ser determinado pelos elementos presentes no DOM
&mdash; como quando renderização lenta é usada para evitar ter toda uma grande lista
no DOM de uma só vez, &mdash; `aria-setsize` pode especificar o tamanho real do conjunto, e
`aria-posinset`pode especificar a posição do elemento no conjunto. Por exemplo, em um
conjunto que pode conter 1.000 elementos, você pode dizer que determinado
elemento tem um `aria-posinset` de 857, embora ele apareça em primeiro no DOM,
e depois usar técnicas de HTML dinâmico para garantir que o usuário possa explorar a lista completa
 sob demanda.

![usando aria-posinset e aria-setsize para estabelecer uma relação em uma lista](imgs/aria-posinset.jpg)


{# wf_devsite_translation #}
