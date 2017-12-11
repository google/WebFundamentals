project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Grande parte da Web não é otimizada para experiências em vários dispositivos. Conheça os princípios básicos para que seu site funcione em dispositivos móveis, computadores ou qualquer aparelho que tenha uma tela.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2014-04-29 #}

# Princípios básicos do Web design responsivo {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

O uso de dispositivos móveis para navegar pela Internet está crescendo a um ritmo surpreendente, 
mas, infelizmente, grande parte da Web não é otimizada para esses dispositivos.
Dispositivos móveis frequentemente são limitados pelo tamanho de suas telas e exigem uma abordagem 
diferente para o layout do conteúdo.

Existem diversos tamanhos de tela entre celulares, "phablets" (mistura de celular e tablet),
tablets, desktops, consoles de jogos, TVs e até wearables.  Os tamanhos das telas estão sempre
mudando, então é importante que seu site possa se adaptar a qualquer tamanho de tela,
hoje ou no futuro.

<video autoplay muted loop controls>
  <source src="videos/resize.webm" type="video/webm">
  <source src="videos/resize.mp4" type="video/mp4">
</video>

O Web design responsivo, originalmente definido por [Ethan Marcotte em A List
Apart](http://alistapart.com/article/responsive-web-design/), reage às
necessidades dos usuários e seus dispositivos.  O layout muda de acordo com
o tamanho da tela e os recursos do dispositivo.  Por exemplo, em um celular, os usuários veriam
o conteúdo em uma só coluna, enquanto um tablet poderia mostrar o mesmo conteúdo
em duas colunas.

{% include "web/_shared/udacity/ud893.html" %}

## Defina a janela de visualização {: #set-the-viewport }

Páginas otimizadas para uma variedade de dispositivos devem incluir uma tag meta viewport no cabeçalho do documento.  Uma tag meta viewport instrui o navegador como controlar o tamanho e o dimensionamento da página.

### TL;DR {: .hide-from-toc }
- Use a tag meta viewport para controlar a largura e o dimensionamento da janela de visualização dos navegadores.
- Inclua `width=device-width` para corresponder à largura da tela em pixels independentes de dispositivo.
- Inclua `initial-scale=1` para estabelecer uma relação 1:1 entre pixels CSS e pixels independentes de dispositivo.
- Garanta que sua página seja acessível não desativando o dimensionamento do usuário.


Para tentar oferecer a melhor experiência, navegadores móveis renderizarão
a página à largura de uma tela de desktop (geralmente cerca de 980 pixels, mas isso varia
de acordo com os dispositivos) e tentarão melhorar a aparência do conteúdo aumentando
os tamanhos das fontes e dimensionando o conteúdo para que ele caiba na tela.  Isso significa que os tamanhos das fontes podem parecer inconsistentes para os usuários, que precisarão tocar duas vezes ou
controlar o zoom com gestos de pinça para ver e interagir com o conteúdo.


    <meta name="viewport" content="width=device-width, initial-scale=1">
    


Usar o valor meta viewport `width=device-width` instrui a página a acompanhar
a largura da tela em pixels independentes de dispositivos. Isso permite que a página ajuste o fluxo
do conteúdo para diferentes tamanhos de telas, seja para renderização em pequenos celulares
ou para um grande monitor de desktop.

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-no.html">
  <figure>
    <img src="imgs/no-vp.png" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Página sem uma definição de janela de visualização">
    <figcaption>
      Página sem uma definição de janela de visualização
     </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp.html">
  <figure>
    <img src="imgs/vp.png" srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Página com uma definição de janela de visualização">
    <figcaption>
      Página com uma definição de janela de visualização
     </figcaption>
  </figure>
  </a>
</div>

Alguns navegadores mantêm a largura da página constante ao girar para o modo paisagem
e ampliar o zoom em vez de ajustar o fluxo de acordo com a tela. Adicionar o atributo
`initial-scale=1` instrui os navegadores a estabelecer uma relação 1:1 entre pixels CSS
e pixels independentes de dispositivos independentemente da orientação do dispositivo, além de permitir
que a página tire total proveito da largura total do modo paisagem.


Observação: Use uma vírgula para separar atributos e garantir que navegadores mais antigos consigam analisá-los corretamente.

### Garanta uma janela de visualização acessível

Além de definir uma `initial-scale`, você também pode definir os seguintes atributos para a janela de visualização:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Quando definidos, eles podem impedir que o usuário ajuste o zoom da janela de visualização, potencialmente causando problemas de acessibilidade.


## Dimensione o conteúdo de acordo com a janela de visualização

Em computadores e dispositivos móveis, os usuários estão acostumados a navegar por sites verticalmente, mas não horizontalmente; forçar o usuário a navegar horizontalmente ou diminuir o zoom para ver toda a página resulta em uma experiência do usuário inadequada.

### TL;DR {: .hide-from-toc }
- Não use elementos grandes com larguras fixas.
- O conteúdo não deve depender de uma largura de janela de visualização específica para ser renderizado corretamente.
- Use consultas de mídia CSS para aplicar diferentes estilos para pequenas e grandes telas.

Ao desenvolver um site móvel com uma tag `meta viewport`, é fácil
criar por acidente um conteúdo de página que não cabe na porta de visualização
especificada. Por exemplo, uma imagem que é exibida em uma largura maior do que a
janela de visualização pode fazer com que a página seja rolada horizontalmente. Você deve ajustar esse conteúdo
para caber na largura da janela de visualização. Assim, o usuário não precisará
navegar horizontalmente.

Como as dimensões e as larguras das telas em pixels CSS variam significativamente entre dispositivos
(por exemplo, entre celulares e tablets e mesmo entre diferentes celulares), o conteúdo
não deve depender de uma largura de janela de visualização específica para ser renderizado corretamente.

Definir grandes larguras absolutas de CSS para elementos de página (como o exemplo abaixo),
fará com que `div` seja largo demais para a janela de visualização de um dispositivo mais estreito (por exemplo,
um dispositivo com uma largura de 320 pixels CSS, como um iPhone). Em vez disso, considere
usar valores de largura relativos, como `width: 100%`.  Da mesma forma, tenha cuidado ao usar
grandes valores de posicionamento absolutos que podem fazer com que o elemento fique fora
da janela de visualização em telas pequenas.  

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x" alt="Página com um elemento de largura fixa de 344 pixels em um iPhone.">
    <figcaption>
      Página com um elemento de largura fixa de 344 pixels em um iPhone.
    </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x" alt="Página com um elemento de largura fixa de 344 pixels em um Nexus 5.">
    <figcaption>
      Página com um elemento de largura fixa de 344 pixels em um Nexus 5.
    </figcaption>
  </figure>
  </a>
</div>
<div class="clearfix"></div>
         
## Use consultas de mídia do CSS para aumentar a capacidade de resposta {: #css-media-queries }  

Consultas de mídia são filtros simples que podem ser aplicados a estilos CSS. Eles facilitam 
a mudança de estilos com base nas características do dispositivo que está renderizando
o conteúdo, incluindo o tipo de exibição, a largura, a altura, a orientação e até mesmo a
resolução.


### TL;DR {: .hide-from-toc }
- Consultas de mídia podem ser usadas para aplicar estilos com base nas características do dispositivo.
- Use `min-width` em vez de `min-device-width` para garantir a experiência mais ampla.
- Use tamanhos relativos para elementos para evitar interrupções no layout.

Por exemplo, você pode colocar todos os estilos necessários para impressão
dentro de uma consulta de mídia de impressão:


    <link rel="stylesheet" href="print.css" media="print">
    

Além de usar o atributo `media` no link da folha de estilo, existem duas
outras maneiras de aplicar consultas de mídia que podem ser incorporadas em um arquivo CSS: `@media`
e `@import`.  Por motivos de desempenho, qualquer um dos dois primeiros métodos são
recomendados em vez da sintaxe `@import`
(consulte [Evite importações de CSS](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations)).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

A lógica que se aplica a consultas de mídia não é mutuamente exclusiva e qualquer filtro
que atenda a esses critérios. O bloco CSS resultante é aplicado usando as
regras padrão de precedência no CSS.

### Aplique consultas de mídia baseadas no tamanho da janela de visualização

Consultas de mídia nos permitem criar uma experiência responsiva, onde estilos específicos
são aplicados a telas pequenas, telas grades e qualquer tela intermediária.  A sintaxe da consulta
de mídia permite a criação de regras que podem ser aplicadas dependendo das
características do dispositivo.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

Embora existam vários itens para os quais possamos fazer consultas, os mais usados
para um Web design responsivo são `min-width`, `max-width`, `min-height` e
`max-height`.


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Parâmetros</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
      <td data-th="Result">Regras aplicadas para qualquer largura de navegador acima do valor definido na consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
      <td data-th="Result">Regras aplicadas para qualquer largura de navegador abaixo do valor definido na consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
      <td data-th="Result">Regras aplicadas para qualquer altura de navegador acima do valor definido na consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
      <td data-th="Result">Regras aplicadas para qualquer altura de navegador abaixo do valor definido na consulta.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=portrait</code></td>
      <td data-th="Result">Regras aplicadas a qualquer navegador cuja altura é maior ou igual à largura.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=landscape</code></td>
      <td data-th="Result">Regras aplicadas a qualquer navegador cuja largura é maior do que a altura.</td>
    </tr>
  </tbody>
</table>

Vejamos um exemplo:

<figure>
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media-queries.html">
    <img src="imgs/mq.png" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Visualização de uma página que usa consultas de mídia para alterar as propriedades conforme ela é redimensionada.">
    <figcaption>
      Visualização de uma página que usa consultas de mídia para alterar as propriedades conforme ela é redimensionada.
    </figcaption>
  </a>
</figure>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media-queries.html){: target="_blank" .external }

* Quando o navegador tiver entre <b>0</b> e <b>640</b> pixels de largura, `max-640px.css` será aplicado.
* Quando o navegador tiver entre <b>500</b> e <b>600</b> de largura, os estilos em `@media` serão aplicados.
* Quando o navegador tiver <b>640 ou mais pixels de largura</b>, `min-640px.css` será aplicado.
* Quando a <b>largura do navegador for maior do que sua altura</b>, `landscape.css` será aplicado.
* Quando a <b>altura do navegador for maior do que sua largura</b>, `portrait.css` será aplicado.


### Uma observação sobre `min-device-width`

Também é possível criar consultas baseadas em
`min-device-width`, mas essa prática é **altamente desencorajada**.

A diferença é sutil, mas muito importante: `min-width` é baseado no
tamanho da janela do navegador, enquanto `min-device-width` é baseado no
tamanho da tela.  Infelizmente, alguns navegadores, incluindo o
navegador Android legado, não informam a largura do dispositivo corretamente, informando o tamanho da tela em pixels de dispositivo em vez da largura da janela de visualização esperada.

Além disso, o uso do `min-device-width` pode impedir que o conteúdo se adapte em
desktops ou outros dispositivos que permitam que as janelas sejam redimensionadas, pois a consulta
é baseada no tamanho do dispositivo, não no da janela do navegador.

### Use `any-pointer` e `any-hover` para interações flexíveis

Começando com o Chrome 39, suas folhas de estilo podem programar seletores que cobrem
vários tipos de ponteiro e comportamentos de passar o cursor. Os recursos de mídia `any-pointer` e `any-hover`
são semelhantes a `pointer` e `hover` em termos de permitir que você consulte os
recursos do ponteiro do usuário. Entretanto, `any-pointer` e
`any-hover` operam em conjunto com todos os dispositivos ponteiro em vez de apenas com o
dispositivo ponteiro principal.

### Use unidades relativas

Um conceito essencial por trás do design responsivo é a fluidez e a proporcionalidade
em oposição a layouts com largura fixa.  Usar unidades relativas para medição pode ajudar a
simplificar os layouts e impedir a criação acidental de componentes grandes demais
para a janela de visualização.

Por exemplo, definir width: 100% em um `div` de nível superior garante que ele abranja a
largura a janela de visualização e nunca seja grande ou pequeno demais para a janela de visualização.  O 
`div` será encaixado, independentemente de ser um iPhone de 320 pixels de largura, um Blackberry Z10 de 342 pixels de largura
ou um Nexus 5 de 360 pixels de largura.

Além disso, o uso de unidades relativas permite que os navegadores renderizem o conteúdo com base no
nível de zoom dos usuários sem a necessidade de adicionar barras de rolagem horizontais na
página.

<span class="compare-worse">Não recomendado</span>&mdash;largura fixa

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">Recommended</span>&mdash;responsive width

    div.fullWidth {
      width: 100%;
    }


## Como escolher pontos de interrupção 

Não defina pontos de interrupção com base em classes de dispositivos. Definir pontos de interrupção com base em dispositivos,
produtos, nomes de marcas ou sistemas operacionais específicos disponíveis atualmente pode tornar a
manutenção um pesadelo. Em vez disso, o próprio conteúdo deve determinar como o
layout se ajusta ao contêiner.


### TL;DR {: .hide-from-toc }
- Crie pontos de interrupção com base no conteúdo, nunca em dispositivos, produtos ou marcas específicas.
- Crie um design para o menor dispositivo móvel primeiro e aprimore a experiência progressivamente conforme mais espaço ficar disponível na tela.
- Mantenha as linhas de texto em um limite máximo de 70 ou 80 caracteres.


### Selecione os principais pontos de interrupção começando pequeno e progredindo

<figure class="attempt-right">
  <img src="imgs/weather-1.png" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-1.html">
      Visualização da previsão do tempo em uma tela pequena.
    </a>
  </figcaption>
</figure>

Projete o conteúdo para que ele caiba primeiro em uma tela pequena e expanda a tela
até que um ponto de interrupção se torne necessário.  Isso permite que você otimize
pontos de interrupção com base no conteúdo e mantenha o menor número possível de
pontos de interrupção.

Vamos examinar o exemplo que vimos no início:
a previsão do tempo. A primeira etapa é fazer com que a previsão seja exibida de forma adequada em uma
tela pequena.

<div style="clear:both;"></div>

<figure class="attempt-right">
  <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Visualização da previsão do tempo conforme a página fica mais larga.">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-1.html">
      Visualização da previsão do tempo conforme a página fica mais larga.
    </a>
  </figcaption>
</figure>

Em seguida, redimensione o navegador até que haja muito espaço branco entre os
elementos e a previsão não esteja tão bonita.  Essa decisão é relativamente
subjetiva, mas mais de 600 pixels é largo demais.

<div style="clear:both;"></div>

Para inserir um ponto de interrupção em 600 pixels, crie duas novas folhas de estilo, uma a ser usada quando o
navegador tiver até 600 pixels de largura e uma para quando ele tiver mais de 600 pixels.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-2.html){: target="_blank" .external }

<figure class="attempt-right">
  <img src="imgs/weather-3.png"  srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Visualização da previsão do tempo projetada para uma tela mais larga.">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-2.html">
      Visualização da previsão do tempo projetada para uma tela mais larga.
    </a>
  </figcaption>
</figure>

Por fim, refatore o CSS.  Neste exemplo, inserimos os estilos mais comuns,
como fontes, ícones, posicionamento básico e cores, em `weather.css`.  Layouts específicos
para a tela pequena devem, então, ser colocados em `weather-small.css` e estilos
para telas grandes em `weather-large.css`.

<div style="clear:both"></div>


### Selecione pontos de interrupção secundários quando necessário

Além de escolher os principais pontos de interrupção para quando o layout for significativamente alterado, também
é útil ajustar para alterações pequenas.  Por exemplo, entre os principais
pontos de interrupção, pode ser interessante ajustar as margens ou o preenchimento de um elemento
ou aumentar o tamanho da fonte para que ela pareça mais natural no layout.

Vamos começar otimizando o layout para telas pequenas.  Neste caso, vamos aumentar
a fonte quando a largura da janela de visualização for maior do que 360 pixels.  Em seguida, quando houver
espaço suficiente, podemos separar as temperaturas máximas e mínimas para que elas fiquem na
mesma linha em vez de uma em cima da outra.  Vamos também ampliar um pouco
os ícones de clima.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-small.css" region_tag="mqsmallbpsm" adjust_indentation="auto" %}
</pre>

<div class="attempt-left">
  <figure>
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Antes de adicionar pontos de interrupção secundários.">
    <figcaption>
      Antes de adicionar pontos de interrupção secundários.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="Após adicionar pontos de interrupção secundários.">
    <figcaption>
      Após adicionar pontos de interrupção secundários.
     </figcaption>
  </figure>
</div>


<div style="clear:both;"></div>


Da mesma forma, para telas grandes, é ideal se limitar à largura máxima do
painel de previsão para que ele não consuma toda a largura da tela.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-large.css" region_tag="mqsmallbplg" adjust_indentation="auto" %}
</pre>

### Otimize o texto para leitura

A teoria de legibilidade clássica sugere que uma coluna ideal deve conter entre 70 e 80
caracteres por linha (cerca de 8 a 10 palavras em inglês). Dessa forma, sempre que a largura
de um bloco de texto ultrapassar 10 palavras, considere adicionar um ponto de interrupção.

<div class="attempt-left">
  <figure>
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Antes de adicionar pontos de interrupção secundários.">
    <figcaption>Antes de adicionar pontos de interrupção secundários.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Após adicionar pontos de interrupção secundários.">
    <figcaption>Após adicionar pontos de interrupção secundários.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Vamos examinar o exemplo de postagem do blog acima em mais detalhes.  Em telas menores,
a fonte Roboto a 1em funciona perfeitamente com 10 palavras por linha, mas telas
maiores exigirão um ponto de interrupção. Nesse caso, se a largura do navegador for superior
a 575 pixels, o conteúdo ideal terá 550 pixels.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/reading.html" region_tag="mqreading" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/reading.html){: target="_blank" .external }

### Nunca oculte o conteúdo por completo

Tenha cuidado ao escolher qual conteúdo ocultar ou mostrar dependendo do tamanho da tela.
Não oculte conteúdo simplesmente porque ele não cabe na tela.  O tamanho da tela
não é um indicativo definitivo do desejo de um usuário.  Por exemplo,
eliminar a contagem de pólen da previsão do tempo pode ser um problema sério
para pessoas que sofrem com alergia na primavera e que precisam determinar
se podem sair ou não.

## Visualize pontos de interrupção de consultas de mídia no Chrome DevTools {: #devtools }

Quando terminar de configurar seus pontos de interrupção de consultas de mídia, é recomendável verificar como
seu site ficará com eles. É possível redimensionar a janela do navegador para acionar
os pontos de interrupção, mas há uma maneira melhor: o Chrome DevTools. As duas
capturas de tela abaixo demonstram o uso do DevTools para visualizar a aparência de uma página em
diferentes pontos de interrupção.

![Exemplo do recurso de consultas de mídia do DevTools](imgs/devtools-media-queries-example.png)

Para visualizar sua página em diferentes pontos de interrupção:

[Abra o DevTools](/web/tools/chrome-devtools/#open) e ative o [Device
Mode](/web/tools/chrome-devtools/device-mode/#toggle).

Use os
[controles de janela de visualização](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#viewport-controls)
para selecionar **Responsive**, colocando o DevTools no Responsive Mode.

Por fim, abra o menu Device Mode e selecione
[**Show media queries**](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#media-queries)
para exibir os pontos de interrupção como barras coloridas acima da página.

Clique em uma das barras para visualizar a página enquanto a consulta de
mídia está ativa. Clique com o botão direito em uma barra para passar para a definição da
consulta de mídia. Consulte 
[Consultas de mídia](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#media-queries)
para obter mais ajuda.


{# wf_devsite_translation #}
