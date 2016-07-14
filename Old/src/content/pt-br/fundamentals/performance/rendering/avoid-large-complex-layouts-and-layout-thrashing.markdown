---
title: "Avoid large, complex layouts and layout thrashing"
description: "Layout é onde o navegador descobre a informação geométrica para os elementos: seu tamanho e localização na página. Cada elemento terá uma informação de dimensionamento explícita ou implícita com base no CSS que foi usado, o conteúdo do elemento ou um elemento principal. O processo é chamado Layout in Blink, navegadores WebKit e Internet Explorer. Em navegadores baseados em Gecko, como o Firefox, ele é chamado de Reflow, mas na realidade esses processos são iguais."
updated_on: 2015-03-20
notes:
  tree:
    - "Internamente no navegador há uma árvore de renderização, que é criada a partir do DOM e é uma representação de todos os itens que precisam ser desenhados na tela do dispositivo. Contém todas as informações visuais sobre os elementos: cores, dimensões, localização, etc. Se um elemento tiver um estilo de visualização: none, não estará na árvore de renderização. Igualmente, se um elemento tiver um pseudo elemento (:after, :before), eles não existirão no DOM, mas existirão na árvore de renderização."
  csstriggers:
    - "Deseja uma lista definitiva de quais propriedades CSS acionam o layout, pintura ou composição? Veja <a href='http://csstriggers.com/''>Acionadores CSS</a>."
key-takeaways:
  - O layout é normalmente delimitado para todo o documento.
  - O número de elementos DOM afetará o desempenho; você deve evitar acionar o layout sempre que possível.
  - Avalie o desempenho do modelo de layout; o novo Flexbox é geralmente mais rápido do que o Flexbox mais antigo ou modelos de layout baseados em flutuação.
  - Evite layouts sincronizados forçados e layout desnecessário; leia os valores de estilo e faça as mudanças de estilo.
---
<p class="intro">
  Layout é onde o navegador descobre a informação geométrica para os elementos: seu tamanho e localização na página. Cada elemento terá uma informação de dimensionamento explícita ou implícita com base no CSS que foi usado, o conteúdo do elemento ou um elemento principal. O processo é chamado Layout no Chrome, Opera, Safari e Internet Explorer. No Firefox, é chamado de Reflow, mas na realidade o processo é o mesmo.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

Da mesma forma que os cálculos de estilo, as preocupações imediatas para o custo do layout são:

1. O número de elementos que exigem layout.
2. A complexidade desses layouts.

## Evite o layout sempre que possível

Quando você muda de estilos, o navegador verifica se alguma mudança exige que o layout seja calculado e, para isso, a árvore de renderização deve ser atualizada. Mudanças nas “propriedades geométricas”, como larguras, alturas, esquerda ou topo, exigem layout.

{% highlight css %}
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
{% endhighlight %}

**O layout é quase sempre orientado para todo o documento.** Se você tiver muitos elementos, levará muito tempo para descobrir as localizações e dimensões de todos.

Se não for possível evitar o layout, então a solução é usar novamente o Chrome DevTools para ver quanto tempo está levando e determinar se o layout é a causa do estrangulamento. Primeiro, abra o DevTools, vá para a guia Linha cronológica, clique em registro e interaja com o seu site. Quando você parar de gravar, verá um detalhamento da execução do seu site:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/big-layout.jpg" class="g--centered" alt="DevTools mostrando um tempo longo no Layout" />

Ao detalhar o frame do exemplo acima, vemos que mais de 20 ms são gastos dentro do layout. Quando temos 16 ms para exibir um frame na tela em uma animação, esse valor é muito alto. Você também pode ver que o DevTools dirá o tamanho da árvore (1.618 elementos nesse caso) e quantos nós precisaram de layout.

{% include shared/remember.liquid title="Note" list=page.notes.csstriggers %}

## Use o flexbox em modelos de layout mais antigos
A Web tem uma variedade de modelos de layout, alguns suportados mais amplamente do que outros. O modelo de layout CSS mais antigo nos permite posicionar elementos na tela de forma relativa, absoluta e por elementos flutuantes.

A captura de tela abaixo mostra o custo de layout ao usar flutuações em 1.300 caixas. É realmente um elemento artificial, porque a maioria dos aplicativos usarão vários meios para posicionar elementos.

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-float.jpg" class="g--centered" alt="Usando flutuações como layout" />

Se atualizarmos a amostra para usar o Flexbox, uma adição mais recente à plataforma da Web, veremos uma imagem diferente:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-flex.jpg" class="g--centered" alt="Usando o flexbox como layout" />

Agora gastamos muito menos tempo (3,5 ms vs 14 ms nesse caso) no layout para o _mesmo número de elementos_ e o mesmo visual. É importante lembrar que para alguns contextos, você talvez não poderá selecionar o Flexbox, porque ele é [menos suportado do que as flutuações](http://caniuse.com/#search=flexbox), mas onde puder, deve pelo menos investigar o impacto do modelo de layout no seu desempenho e escolher aquele que reduz o custo de execução.

Em qualquer caso, selecionando o Flexbox ou não, você ainda deve **testar e evitar acionar o layout** durante pontos de alta pressão do seu aplicativo!

## Evite layouts sincronizados forçados
Enviar um frame para a tela tem a seguinte ordem:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/frame.jpg" class="g--centered" alt="Usando o flexbox como layout" />

Primeiro, o JavaScript é executado, _em seguida_ os cálculos de estilo _e depois_ o layout. No entanto, é possível forçar um navegador a realizar o layout antes com o JavaScript. É chamado de**layout sincronizado forçado**.

A primeira coisa a se lembrar é que, como o JavaScript executa todo o layout antigo, os valores do frame anterior são conhecidos e estão disponíveis para consulta. Portanto se, por exemplo você deseja escrever a altura de um elemento (vamos chamá-lo de “caixa”) no início do frame, você pode criar um código como o seguinte:

{% highlight javascript %}
// Schedule our function to run at the start of the frame.
requestAnimationFrame(logBoxHeight);

function logBoxHeight() {
  // Gets the height of the box in pixels and logs it out.
  console.log(box.offsetHeight);
}
{% endhighlight %}

Você terá problemas se tiver alterado os estilos da caixa _antes_ de perguntar sua altura:

{% highlight javascript %}
function logBoxHeight() {

  box.classList.add('super-big');

  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);
}
{% endhighlight %}

Agora, para poder responder a pergunta de altura, o navegador deve _primeiro_ aplicar a mudança de estilo (por causa da adição da classe `super-big`) e _em seguida_ executar o layout. Somente então poderá retornar a altura correta. É um trabalho desnecessário e possivelmente caro.

Por causa disso, você sempre deve agrupar suas leituras de estilo e executá-las primeiro (onde o navegador pode usar os valores de layout do frame anterior) e, em seguida, fazer as criações:

Realizada corretamente, a função acima seria:

{% highlight javascript %}
function logBoxHeight() {
  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);

  box.classList.add('super-big');
}
{% endhighlight %}

No geral, você não precisará aplicar estilos e consultar valores; usar os valores do último frame é suficiente. Executar os cálculos de estilo e layout de forma sincronizada e antes do que o navegador gostaria são possíveis estrangulamentos, o que não é recomendável.

## Evite avalanches de layout 
Há uma forma de piorar layouts sincronizados forçadamente: _criando muitos deles em sucessão_. Vamos dar uma olhada neste código:

{% highlight javascript %}
function resizeAllParagraphsToMatchBlockWidth() {

  // Puts the browser into a read-write-read-write cycle.
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + 'px';
  }
}
{% endhighlight %}

Este código faz um loop sobre um grupo de parágrafos e define cada largura de parágrafo para corresponder com a largura de um elemento chamado “caixa”. Parece inofensivo, mas o problema é que cada iteração do loop lê um valor de estilo (`box.offsetWidth`) e o usa imediatamente para atualizar a largura de um parágrafo (`paragraphs[i].style.width`). Na próxima iteração do loop, o navegador deverá levar em conta que os estilos mudaram desde que o `offsetWidth` foi solicitado pela última vez (na iteração anterior) e, portanto, aplicar mudanças de estilo e executar o layout. Isso acontecerá a _cada iteração!_.

A correção para essa amostra é apenas _ler _ e _criar_ valores novamente:

{% highlight javascript %}
// Read.
var width = box.offsetWidth;

function resizeAllParagraphsToMatchBlockWidth() {
  for (var i = 0; i < paragraphs.length; i++) {
    // Now write.
    paragraphs[i].style.width = width + 'px';
  }
}
{% endhighlight %}

Se você deseja garantir a segurança, verifique o [FastDOM](https://github.com/wilsonpage/fastdom), que agrupa automaticamente suas leituras e gravações e evita que você acione layouts sincronizados forçados ou avalanches de layouts automaticamente.


