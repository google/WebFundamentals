project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ocultação de conteúdo contra tecnologia assistiva


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Ocultação e Atualização de Conteúdo {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

## aria-hidden

Outra técnica importante no ajuste fino da experiência para usuários de
tecnologia assistiva envolve garantir que apenas partes relevantes da página
sejam expostas à tecnologia assistiva. Existem várias maneiras de garantir que uma seção
do DOM não se exponha a APIs de acessibilidade.

Em primeiro lugar, qualquer coisa que seja explicitamente oculta do DOM
também não será incluída na árvore de acessibilidade. Então, qualquer coisa que tenha um estilo CSS com atributo `visibility:
hidden` ou `display: none` ou use HTML5 `hidden` também será oculta
para usuários de tecnologia assistiva.

No entanto, um elemento que não seja renderizado visualmente, mas não é explicitamente
oculto ainda é incluído na árvore de acessibilidade. Uma técnica comum é incluir
"texto somente para leitor de tela" em um elemento que é absoluto posicionado fora da tela.


    .sr-only {
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    

Além disso, como vimos, é possível fornecer texto somente para leitor de tela por meio de um atributo 
`aria-label`, `aria-labelledby`, ou `aria-describedby` referenciando um elemento
que, de outra forma, é oculto.

Veja este artigo WebAIM sobre [As técnicas para ocultar
texto](http://webaim.org/techniques/css/invisiblecontent/#techniques){: .external }
para mais informações sobre a criação de texto "somente para leitor de tela".

Por fim, ARIA fornece um mecanismo para excluir conteúdo de tecnologia
assistiva que não está visualmente oculto, usando o atributo `aria-hidden`.
Aplicar este atributo a um elemento efetivamente o remove *e todas seus
 descendentes* da árvore de acessibilidade. As únicas exceções são elementos
referidos por um atributo `aria-labelledby` ou `aria-describedby`.

    <div class="deck">
      <div class="slide" aria-hidden="true">
        Sales Targets
      </div>
      <div class="slide">
        Quarterly Sales
      </div>
      <div class="slide" aria-hidden="true">
        Action Items
      </div>
    </div>

Por exemplo, você pode usar `aria-hidden` se estiver criando alguma IU modal que
bloqueia o acesso à página principal. Neste caso, um usuário que enxerga pode ver algum tipo de
sobreposição de semitransparente, que indica que a maior parte da página não
pode ser usada atualmente, mas um usuário de leitor de tela ainda pode
conseguir explorar as outras partes da página. Neste caso, além de criar a armadilha de teclado [explicada
anteriormente](/web/fundamentals/accessibility/focus/using-tabindex#modals-and-keyboard-traps),
você precisa certificar que as partes da página que estão atualmente fora do
escopo também são `aria-hidden`.

Agora que você entende os conceitos básicos de ARIA, como ele joga com semântica de HTML
nativa, e como pode ser utilizado para realizar cirurgias bastante importantes na
árvore de acessibilidade, além de alterar a semântica de um único elemento, vejamos
como podemos usá-lo para transmitir informações que dependem do tempo.

## aria-live

`aria-live` permite que desenvolvedores marquem uma parte da página como "ativa"
no sentido de que atualizações devem ser comunicadas aos usuários imediatamente,
independentemente da posição na página, em vez de fazê-lo apenas se elas exploram essa parte da página. Quando
um elemento tem um atributo `aria-live`, a parte da página que o contém
e seus descendentes é chamada de *região ativa*.

![ARIA live estabelece uma região ativa](imgs/aria-live.jpg)

Por exemplo, uma região ativa pode ser uma mensagem de status que aparece como resultado de
uma ação do usuário. Se a mensagem for suficientemente importante para chamar a atenção
de um usuário que enxerga, ela é importante o suficiente para chamar para si a atenção
de um usuário de tecnologia assistiva, definindo seu atributo `aria-live`. Compare este `div` direto


    <div class="status">Your message has been sent.</div>
    

com seu equivalente "ativo".


    <div class="status" aria-live="polite">Your message has been sent.</div>
    

`aria-live` tem três valores permitidos: `polite`, `assertive` e `off`.

 - `aria-live="polite"` informa à tecnologia assistiva para alertar o usuário sobre esta
   mudança assim que tiver terminado o que quer que esteja fazendo atualmente. É ótimo para ser usado
   se algo é importante, mas não urgente, e é responsável pela maioria do
   uso de `aria-live`.
 - `aria-live="assertive"` informa à tecnologia assistiva para interromper o que quer que esteja
   fazendo e alertar o usuário sobre esta mudança imediatamente. Este é somente para
   atualizações importantes e urgentes, como uma mensagem de status como "Ocorreu um erro
   de servidor e as alterações não estão salvas; por favor, atualize a página", ou
   alterações de um campo de interação como resultado direto de uma ação do usuário, como
   botões em um widget de podômetro.
 - `aria-live="off"` informa à tecnologia assistiva para suspender temporariamente
   `aria-live` as interrupções.

Há alguns truques para ter certeza que suas regiões ativas funcionam corretamente.

Em primeiro lugar, a sua região `aria-live` provavelmente deve ser definida no carregamento
inicial da página. Esta não é uma regra rígida, mas se você tiver dificuldade com
uma região `aria-live`, este pode ser o problema.

Em segundo lugar, leitores de tela diferentes reagem de forma diferente a diferentes tipos
de mudança. Por exemplo, é possível disparar um alerta em alguns leitores de tela
alternando o estilo `hidden` de um elemento descendente de verdadeiro para falso.

Outros atributos que funcionam com `aria-live` te ajudam a ajustar o que
é comunicado ao usuário quando a região ativa muda.

`aria-atomic` indica se a região inteira deve ser considerada como um todo
ao comunicar atualizações. Por exemplo, se a data de um widget, consistindo de 
um dia, mês e ano tem `aria-live=true` e `aria-atomic=true`, e o usuário usa um
controle do podômetro para alterar o valor apenas do mês, todo o
conteúdo do widget de data seria lido novamente. O valor de `aria-atomic` pode ser `true`
ou `false` (o padrão).

`aria-relevant` indica que tipos de mudanças devem ser apresentadas ao usuário.
Existem algumas opções que podem ser utilizadas separadamente ou como uma lista de token.

 - *adições*, que significa que qualquer elemento que seja adicionado à região 
   ativa é significativo. Por exemplo, adicionar um span a um registro existente de mensagens
   de status significaria que o span seria anunciado para o usuário (supondo
   que `aria-atomic` fosse `false`).
 - *texto*, que significa que o conteúdo do texto sendo adicionado a qualquer nó
   descendente é relevante. Por exemplo, modificar a propriedade `textContent` de um campo de texto
   personalizado leria o texto modificado para o usuário.
 - *remoções*, que significa que a remoção de qualquer texto ou nós descendentes
   devem ser transmitidos para o usuário.
 - *todos*, que significa que todas as alterações são relevantes. No entanto, o valor padrão para
   `aria-relevant` é `additions text`, o que significa que se você não especificar
   `aria-relevant`, ele vai atualizar o usuário sobre qualquer adição ao elemento,
   que é o que você mais provavelmente deseja.

Finalmente, `aria-busy` permite notificar a tecnologia assistiva que ela deve
ignorar temporariamente mudanças em um elemento, como quando as coisas estão carregando. Quando
tudo estiver no lugar, `aria-busy` deve ser definido como falso para normalizar
a operação do leitor.
 


{# wf_devsite_translation #}
