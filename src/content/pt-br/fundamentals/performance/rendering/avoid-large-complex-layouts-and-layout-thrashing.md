project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: É pelo layout que o navegador computa informações geométricas dos elementos: seu tamanho e localização na página. Cada elemento terá informações de dimensionamento explícitas ou implícitas de acordo com o CSS usado, o conteúdo do elemento ou um elemento principal. O processo é chamado de Layout no Chrome.

# Evitar layouts grandes e complexos e paginação constante de layouts {: .page-title }

{# wf_updated_on: 2015-03-20 #}
{# wf_published_on: 2015-03-20 #}

{% include "web/_shared/contributors/paullewis.html" %}

É pelo layout que o navegador computa informações geométricas dos 
elementos: seu tamanho e localização na página. Cada elemento terá 
informações de tamanho implícitas ou explícitas de acordo com o CSS usado, 
o conteúdo do elemento ou um elemento primário. O processo é chamado de Layout 
no Chrome, no Opera, no Safari e no Internet Explorer. No Firefox, o nome é 
Reflow, mas, na prática, o processo é o mesmo.

Da mesma forma que os cálculos de estilo, as preocupações imediatas para o custo do layout são:

1. O número de elementos que exigem layout.
2. A complexidade desses layouts.

### TL;DR {: .hide-from-toc }

* Normalmente o escopo do layout é o documento todo.
* O número de elementos DOM afeta o desempenho: você deve evitar acionar o layout sempre que possível.
* "Avalie o desempenho do modelo de layout: o novo Flexbox geralmente é mais rápido do que Flexbox antigos ou modelos de layout baseados em flutuação."
* Evite layouts síncronos forçados e a troca frequente de layouts: leia os valores de estilo e depois faça as mudanças.

## Evite o layout sempre que possível

Quando você muda de estilos, o navegador verifica se alguma mudança exige que o layout seja calculado e que a árvore de renderização seja atualizada. Mudanças nas "propriedades geométricas", como larguras, alturas, esquerda ou topo, exigem layout.


    .box {
      width: 20px;
      height: 20px;
    }

    /**
     * Changing width and height
     * triggers layout.
     */
    .box--expanded {
      width: 200px;
      height: 350px;
    }


**Quase sempre, o escopo do layout é todo o documento.** Se você tiver muitos elementos, levará muito tempo para descobrir as localizações e as dimensões de todos.

Se não for possível evitar o layout, então a solução é usar novamente o Chrome DevTools para analisar o tempo necessário e determinar se o layout é a causa do gargalo. Primeiro, abra o DevTools, vá para a guia Timeline, clique em Record e interaja com o site. Quando interromper a gravação, você verá o detalhamento do desempenho do site:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/big-layout.jpg" alt="DevTools mostrando um tempo longo no Layout" />

Detalhando o quadro do exemplo acima, vemos que mais de 20 ms são gastos dentro do layout. Quando temos 16 ms para exibir quadro de uma animação na tela, 20 ms é tempo demais. Também podemos ver que o DevTools informa o tamanho da árvore (neste caso, 1.618 elementos) e quantos nós precisaram de layout.

Observação: Quer uma lista definitiva das propriedades CSS que acionam layout, gravação ou composição? Confira [CSS Triggers](https://csstriggers.com).

## Use o flexbox em vez dos modelos de layout mais antigos

A Web tem uma variedade de modelos de layout, alguns com compatibilidade mais ampla que os demais. O modelo de layout CSS mais antigo permite posicionar elementos na tela de forma relativa, absoluta e por elementos flutuantes.

A captura de tela abaixo mostra o custo de layout ao usar flutuações em 1.300 caixas. É realmente um exemplo artificial, porque a maioria dos aplicativos usam vários meios para posicionar elementos.

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-float.jpg" alt="Usar flutuações como layout" />

Se atualizarmos o exemplo para usar o Flexbox, uma adição mais recente à plataforma da Web, teremos uma situação diferente:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-flex.jpg" alt="Usar flexbox como layout" />

Agora, gastamos muito menos tempo (3,5 ms vs. 14 ms nesse caso) no layout para o _mesmo número de elementos_ e a mesma aparência visual. É importante lembrar que, para alguns contextos, pode não ser possível escolher o Flexbox, porque ele tem [compatibilidade menos abrangente do que as flutuações](http://caniuse.com/#search=flexbox). No entanto, onde possível, pelo menos investigue o impacto do modelo de layout no desempenho e escolha o que reduz o custo de execução.

De qualquer maneira, escolhendo o Flexbox ou não, você ainda deve **tentar evitar totalmente o acionamento do layout** durante os pontos mais intensos do aplicativo.

## Evitar layouts síncronos forçados

O envio de um quadro à tela é feito nesta ordem:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/frame.jpg" alt="Usar flexbox como layout" />

Primeiro, o JavaScript é executado. _Em seguida_, os cálculos de estilo _e depois_ o layout. No entanto, é possível forçar o navegador a executar antecipadamente o layout com o JavaScript. Esse recurso é denominado **layout síncrono forçado**.

A primeira coisa a se lembrar é que, à medida que o JavaScript é executado, todos os valores de layout antigos do quadro anterior são conhecidos e estão disponíveis para consulta. Portanto, se por exemplo você quiser exibir a altura de um elemento (vamos chamá-lo de "caixa") no início do quadro, poderá criar um código semelhante a este:


    // Schedule our function to run at the start of the frame.
    requestAnimationFrame(logBoxHeight);

    function logBoxHeight() {
      // Gets the height of the box in pixels and logs it out.
      console.log(box.offsetHeight);
    }


As coisas ficam mais complicadas se você alterou os estilos da caixa _antes_ de consultar sua altura:


    function logBoxHeight() {

      box.classList.add('super-big');

      // Gets the height of the box in pixels
      // and logs it out.
      console.log(box.offsetHeight);
    }


Agora, para poder responder à consulta de altura, o navegador deve _primeiro_ aplicar a mudança de estilo (por causa da adição da classe `super-big`) e, _em seguida_, executar o layout. Somente então será possível retornar a altura correta. Esse trabalho é desnecessário e possivelmente caro.

É por isso que você deve sempre agrupar suas leituras de estilo e executá-las primeiro (enquanto o navegador pode usar os valores de layout do quadro anterior) e somente depois executar as alterações:

Realizada corretamente, a função acima seria:


    function logBoxHeight() {
      // Gets the height of the box in pixels
      // and logs it out.
      console.log(box.offsetHeight);

      box.classList.add('super-big');
    }


Na maioria das vezes, não será necessário aplicar estilos e consultar valores. O uso dos valores do último quadro deverá ser suficiente. A execução dos cálculos de estilo e layout de forma síncrona e antes do momento escolhido pelo navegador é um possível gargalo e, normalmente, deve ser evitada.

## Evitar a troca frequente de layouts
Há uma forma de piorar ainda mais os layouts síncronos forçados: _executar vários deles em rápida sucessão_. Vamos dar uma olhada neste código:


    function resizeAllParagraphsToMatchBlockWidth() {

      // Puts the browser into a read-write-read-write cycle.
      for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.width = box.offsetWidth + 'px';
      }
    }


Este código faz um loop sobre um grupo de parágrafos e define cada largura de parágrafo para corresponder com a largura de um elemento chamado “caixa”. Parece inofensivo, mas o problema é que cada iteração do loop lê um valor de estilo (`box.offsetWidth`) e o usa imediatamente para atualizar a largura de um parágrafo (`paragraphs[i].style.width`). Na próxima iteração do loop, o navegador deverá considerar que os estilos mudaram desde que o `offsetWidth` foi solicitado pela última vez (na iteração anterior) e, portanto, terá de aplicar mudanças de estilo e executar o layout. Isso acontecerá em _todas as iterações_!

Novamente, a correção para exemplo é _ler _ e depois _alterar_ os valores:


    // Read.
    var width = box.offsetWidth;

    function resizeAllParagraphsToMatchBlockWidth() {
      for (var i = 0; i < paragraphs.length; i++) {
        // Now write.
        paragraphs[i].style.width = width + 'px';
      }
    }


Se você deseja garantir a segurança, verifique o [FastDOM](https://github.com/wilsonpage/fastdom), que agrupa automaticamente suas leituras e gravações em lotes e evita que você acione acidentalmente layouts síncronos forçados ou troca frequente de layouts.


{# wf_devsite_translation #}
