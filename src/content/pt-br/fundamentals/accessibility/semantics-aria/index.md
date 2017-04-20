project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Introdução a ARIA e semântica HTML não-nativa


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Introdução a ARIA {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Até agora, incentivamos o uso de elementos HTML nativos, porque eles fornece foco,
 suporte a teclado e semântica incorporada, mas há momentos em que
 um simples layout e HTML nativo não dão conta do trabalho. Por exemplo, atualmente não há
nenhum elemento HTML padronizado para uma construção de IU muito comum, no menu pop-up. Nem
existe um elemento HTML que fornece uma característica semântica, como
"o usuário precisa saber sobre o mais rapidamente possível".

Portanto, nesta lição, vamos explorar a forma de expressar a semântica que o HTML não consegue
expressar por conta própria.

A [especificação dos Aplicativos Ricos Acessíveis de Internet da Iniciativa para
Acessibilidade da Web](https://www.w3.org/TR/wai-aria/){: .external } (WAI-ARIA, ou apenas
ARIA) é boa para áreas de transição com problemas de acessibilidade que não podem ser geridos
com HTML nativo. Ela funciona permitindo que você especifique atributos que modificam
a forma como um elemento se traduz na árvore de acessibilidade. Vejamos um
exemplo.

No snippet a seguir, usamos um item da lista como uma espécie de caixa personalizada. A classe
"caixa de seleção" de CSS fornece ao elemento as características visuais necessárias.


    <li tabindex="0" class="checkbox" checked>
      Receive promotional offers
    </li>
    

Embora isso funcione bem para usuários que enxergam, um leitor de tela não
 dará nenhuma indicação de que o elemento deve ser uma caixa de seleção,
portanto, usuários de baixa visão podem perder o elemento inteiramente.

Porém, usando atributos de ARIA, podemos dar ao elemento a informação que falta
para que o leitor de tela possa interpretá-la corretamente. Aqui, adicionamos os atributos `role` e
`aria-checked` para identificar explicitamente o elemento como uma caixa de seleção e
para especificar que ela é marcada por padrão. O item da lista agora será adicionado à árvore de
acessibilidade e um leitor de tela o reportará corretamente como uma caixa de seleção.


    <li tabindex="0" class="checkbox" role="checkbox" checked aria-checked="true">
      Receive promotional offers
    </li>
    

Observação: Trataremos da lista de atributos ARIA e quando usá-los [mais tarde](#what-can-aria-do).

ARIA funciona alterando e aumentando a árvore de acessibilidade padrão do DOM.

![a árvore de acessibilidade padrão do DOM](imgs/acctree1.jpg){: .attempt-right }

![a árvore de acessibilidade aumentada de ARIA](imgs/acctree2.jpg){: .attempt-right }

Embora ARIA nos permita sutilmente (ou mesmo radicalmente) modificar a
 árvore de acessibilidade para qualquer elemento na página, esta é a única coisa que ela muda. **ARIA
aumenta nenhum comportamento inerente do elemento**; ela não torna o elemento
focalizável nem lhe atribui ouvintes de eventos de teclado. Isso ainda faz parte de nossa
tarefa de desenvolvimento.

É importante compreender que não há necessidade de redefinir a
semântica padrão. Independentemente de seu uso, um elemento HTML padrão `<input type="checkbox">`
não precisa de um atributo ARIA adicional `role="checkbox"` para ser
 anunciado corretamente.

Também é importante notar que certos elementos HTML têm restrições sobre quais
funções e atributos de ARIA podem ser usados neles. Por exemplo, um elemento `<input
type="text">` padrão pode não ter nenhuma função/atributo adicional aplicado a ele.

>Veja [ARIA em espec HTML](https://www.w3.org/TR/html-aria/#sec-strong-native-semantics){: .external }
para mais informações.

Vejamos que outras capacidades ARIA tem para oferecer.

## O que ARIA pode fazer?

Como você viu no exemplo de caixa de seleção, ARIA pode modificar a semântica existente de elementos
ou adicionar semântica a elementos nos quais não existe semântica nativa. Ela também pode
expressar padrões semânticos que não existem em HTML, como um menu ou um
painel de guia. ARIA frequentemente nos permite criar elementos do tipo widget que não seriam
possíveis com HTML simples.

 - Por exemplo, ARIA pode adicionar rótulo extra e texto de descrição que
sejam expostos somente a APIs de tecnologia assistiva.<br>

<div class="clearfix"></div>
      
    <button aria-label="screen reader only label"></button>


 - ARIA pode expressar relações semânticas entre elementos que ampliam a
conexão padrão pai/filho, como uma barra de rolagem personalizada que controla
uma região específica.

<div class="clearfix"></div>

    <div role="scrollbar" aria-controls="main"></div>
    <div id="main">
    . . .
    </div>

    

 - E ARIA pode tornar partes da página "vivas", para que informem imediatamente
à tecnologia assistiva quando mudarem.

<div class="clearfix"></div>

    <div aria-live="true">
      <span>GOOG: $400</span>
    </div>

    
Um dos aspectos centrais do sistema ARIA é a sua coleção de *funções*. Uma função,
em termos de acessibilidade, equivale a um indicador de abreviação para
um padrão específico de IU. ARIA fornece um vocabulário de padrões que podem ser usados por meio do atributo `role`
em qualquer elemento de HTML.

Quando aplicamos `role="checkbox"` no exemplo anterior, estávamos informando
à tecnologia assistiva que o elemento deve seguir o padrão "caixa de seleção". Ou seja,
estamos garantindo que ele terá um estado selecionado (marcado ou não marcado),
e que o estado pode ser alternado usando o mouse ou a barra de espaço, exatamente
como um elemento de caixa de seleção HTML padrão.

Na verdade, como as interações por teclado são apresentadas de forma tão proeminente
ao se usar leitor de tela, é muito importante certificar que, ao se criar um widget personalizado, o atributo
`role`seja sempre aplicado no mesmo lugar que o atributo `tabindex`
; isso garante que os eventos de teclado vão para o lugar certo e que, quando
o foco é colocado em um elemento, sua função seja transmitida com precisão.

A [espec ARIA](https://www.w3.org/TR/wai-aria/){: .external } descreve uma
taxonomia de valores possíveis para o atributo `role` e atributos ARIA
associados que podem ser utilizados em conjunto com essas funções Esta é a melhor
fonte de informações definitivas sobre como os funções e atributos ARIA
funcionam em conjunto e como eles podem ser utilizados de uma forma que seja
suportada por navegadores e tecnologias assistivas.

![uma lista de todas as funções ARIA disponíveis](imgs/aria-roles.jpg)

No entanto, a especificação é muito densa; um lugar mais acessível para começar é
o [documento de Práticas de autoria ARIA](https://www.w3.org/TR/wai-aria-practices-1.1/){: .external }
, que explora as melhores práticas para usar as funções e propriedades ARIA
disponíveis.

ARIA também oferece funções que são marcos de referência e ampliam as opções disponíveis no HTML5. Consulte a especificação
[Padrões de Design de Funções que
são Marcos de Referência](https://www.w3.org/TR/wai-aria-practices-1.1#kbd_layout_landmark_XHTML){: .external }
 para obter mais informações.



{# wf_devsite_translation #}
