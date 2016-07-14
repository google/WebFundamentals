---
title: "Torne o site responsivo"
description: "A Web pode ser acessada por uma grande variedade de dispositivos, de celulares com telas minúsculas a TVs com telas enormes. Saiba como criar um site que funcione de maneira eficaz em todos esses dispositivos."
key-takeaways:
  make-responsive:
    - Sempre use uma janela de visualização.
    - Sempre comece com uma janela de visualização estreita e redimensione-a para dispositivos maiores.
    - Estabeleça os pontos de quebra de acordo com a necessidade de adaptar o conteúdo.
    - Crie uma visão de alto nível do layout nos principais pontos de quebra.
translators:
related-guides:
  responsive:
    -
      title: Como definir a janela de visualização
      href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
      section:
        title: "Web design responsivo"
        href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
    -
      title: Dimensione o conteúdo conforme a janela de visualização
      href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
      section:
        id: rwd-fundamentals
        title: "Web design responsivo"
        href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
  first-break-point:
    -
      title: Utilização das consultas de mídia
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "Web design responsivo"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
    -
      title: Padrões de layout
      href: fundamentals/layouts/rwd-patterns/
      section:
        id: rwd-patterns
        title: "Padrões de layout"
        href: fundamentals/layouts/rwd-patterns/
    -
      title: Layout mais fluido
      href: fundamentals/layouts/rwd-patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "Web design responsivo"
        href: fundamentals/layouts/rwd-patterns/mostly-fluid
  images:
    -
      title: "Aprimore as imagens com srcset para dispositivos com DPI alto"
      href: fundamentals/media/images/images-in-markup.html#enhance-imgs-with-srcset-for-high-dpi-devices
      section:
        id: images
        title: "Imagens"
        href: media/images/
    - 
      title: "Use as consultas de mídia para fornecer imagens de alta resolução ou direção de arte"
      href: fundamentals/media/images/images-in-css.html#use-media-queries-for-conditional-image-loading-or-art-direction
      section:
        id: images
        title: "Imagens"
        href: media/images/

notes:
  styling:
    - "Criamos um conjunto de estilos com cores, espaçamento e tipo de fonte que correspondem às diretrizes da marca."
  not-all-at-once:
    - "Não é preciso mover todos os elementos ao mesmo tempo, ou seja, é possível fazer ajustes menores quando necessário."
updated_on: 2014-04-23
---

<p class="intro">
  A Web pode ser acessada por uma grande variedade de dispositivos, de celulares com telas minúsculas a TVs com telas enormes. Cada dispositivo oferece benefícios e limitações específicos. Como desenvolvedor da Web, você precisa oferecer suporte a todos os tipos de dispositivos.
</p>

{% include shared/toc.liquid %}

Desenvolveremos um site que funcione em todos os tamanhos de tela e tipos de dispositivos. No [artigo anterior]({{page.previousPage.relative_url}}), projetamos a arquitetura de informações da página e definimos a estrutura básica.
Neste guia, aproveitaremos a estrutura básica e o conteúdo e os transformaremos em uma página incrível que será responsiva em um grande número de tamanhos de tela.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="Conteúdo">
    <figcaption>{% link_sample _code/content-without-styles.html %} Conteúdo e estrutura {% endlink_sample %} </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption>{% link_sample _code/content-with-styles.html %} Versão final do site {% endlink_sample %} </figcaption>
  </figure>
</div>

Ao seguir os princípios de desenvolver um site primeiramente para celulares, começamos com uma janela de visualização estreita, similar à tela de um celular, e fazemos todos os ajustes iniciais voltados para essa experiência.
Em um segundo momento, redimensionamos o projeto para dispositivos maiores.
Para fazer isso, ampliaremos a janela de visualização e decidiremos se o design e o layout estão visualmente adequados.

Anteriormente, criamos dois designs para apresentar nosso conteúdo. Agora, precisamos adaptar nossa página de acordo com esses layouts.
Para isso, precisamos decidir onde serão colocados os pontos de quebra, ou seja, pontos em que o layout e os estilos são alterados, com base na forma como o conteúdo é mostrado em diferentes tamanhos de tela.

{% include shared/takeaway.liquid list=page.key-takeaways.make-responsive %}

## Adicionar um janela de visualização

Mesmo no caso de uma página básica, sempre é **obrigatório** incluir uma metatag de janela de visualização.
A janela de visualização é o componente crucial da criação de experiências adequadas a múltiplos dispositivos.
Sem ela, o site não funcionará de forma eficaz em um dispositivo móvel.

A janela de visualização indica ao navegador que a página precisa ser redimensionada para se ajustar ao tamanho da tela.  Existem várias configurações de janela de visualização que podem ser especificadas para controlar a exibição da página. Por padrão, recomendamos:

{% include_code src=_code/viewport.html snippet=viewport %}

A janela de visualização fica no título do documento e só precisa ser informada uma vez.

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

## Aplicar um estilo simples 

Nosso produto e nossa empresa já dispõem de diretrizes muito específicas em um guia de estilo para configurar fontes e a promoção da marca.

### Guia de estil

O guia de estilo é uma maneira útil de conseguir uma compreensão de alto nível da representação visual da página, além de ajudar a manter um trabalho consistente em todo o projeto de criação do design.

#### Cores 

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### Adicione imagens de estilo

No guia anterior, adicionamos imagens denominadas `imagens de conteúdo`.  Essas imagens eram importantes para descrever o produto.  As imagens de estilo não fazem parte do conteúdo fundamental do site, mas adicionam um elemento visual de destaque e ajudam a direcionar a atenção do usuário para uma parte específica do conteúdo.

Um bom exemplo disso é uma imagem para a seção do título no conteúdo `acima da dobra`. Ela é geralmente usada para convencer o usuário a ler mais detalhes sobre o produto.

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="Site projetado">
</div>

É muito simples incluir essa imagem. No nosso caso, ela será colocada em segundo plano no cabeçalho e será aplicada por meio de um simples código CSS.

{% highlight css %}
#headline {
  padding: 0.8em;
  color: white;
  font-family: Roboto, sans-serif;
  background-image: url(backgroundimage.jpg);
  background-size: cover;
}
{% endhighlight %}

Escolhemos uma imagem simples de segundo plano, levemente borrada para não retirar atenção do conteúdo e configurada para `cobrir` todo o elemento. Dessa forma, ela manterá a proporção correta sempre que for ampliada.

<br style="clear: both;">

## Defina o seu primeiro ponto de quebra

O design começa a apresentar um aspecto desagradável por volta de 600 px de largura.  Em nosso caso, o comprimento da linha está acima de dez palavras (o comprimento de leitura ideal), por isso queremos fazer uma modificação.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Lamentamos, seu navegador não é compatível com vídeo.
     <a href="videos/firstbreakpoint.mov">Fazer o download do vídeo</a>.
  </p>
</video>

Em 600 pixels, podemos criar nosso primeiro ponto de quebra para reposicionar os elementos a fim de adequá-los à tela de forma mais eficiente.  Para fazer isso, usamos uma tecnologia chamada [consultas de mídia]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness).

{% highlight css %}
@media (min-width: 600px) {

}
{% endhighlight %}

Existe mais espaço disponível em uma tela mais larga e, consequentemente, há uma maior flexibilidade quanto à forma como o conteúdo pode ser exibido.

{% include shared/remember.liquid title="Note" list=page.notes.not-all-at-once %}

No contexto da página do nosso produto, parece que precisaremos:

*  Limitar a largura máxima do layout.
*  Alterar o espaçamento dos elementos e reduzir o tamanho do texto.
*  Mover o formulário para flutuar in-line com o conteúdo do título.
*  Fazer o vídeo flutuar conforme o conteúdo.
*  Reduzir o tamanho das imagens e fazer com que elas sejam exibidas em uma grade mais agradável.

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## Limitar a largura máxima do layout

Optamos por manter apenas dois layouts: uma janela de visualização estreita e uma mais larga, simplificando o processo de desenvolvimento do site.

Também decidimos criar seções sem bordas na janela de visualização estreita que permanecerão sem bordas na janela de visualização larga.  Isso significa que devemos limitar a largura máxima da tela para que o texto e os parágrafos não se transformem em uma única linha em telas muito largas.  Esse ponto foi estabelecido em aproximadamente 800 px.

Para conseguir isso, precisamos limitar a largura e centralizar os elementos.  É preciso criar um recipiente para cada seção principal e aplicar uma instrução de `margem automática`. Isso permitirá que o conteúdo permaneça centralizado e com um tamanho máximo de 800 pixels, mesmo em telas maiores.

O recipiente será um `div` simples na seguinte forma:

{% highlight html %}<div class="container">...</div>{% endhighlight %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=containerhtml lang=html %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=container lang=css %}

## Altere o espaçamento e reduza o tamanho do texto

Não há muito espaço para exibir conteúdo na janela de visualização estreita, por isso, o tamanho e o padrão das fontes geralmente são bastante reduzidos para se adequar à tela.

Em uma janela de visualização maior, é preciso considerar que o usuário provavelmente estará diante de uma tela maior, mas também estará mais distante dessa tela.  Para aumentar a legibilidade do conteúdo, podemos aumentar o tamanho e o padrão da fonte e alterar o espaçamento para dar mais destaque a áreas específicas.

Na página do produto, aumentaremos o espaçamento dos elementos da seção. Para isso, manteremos o espaçamento em 5% da largura.  Também aumentaremos o tamanho dos cabeçalhos de cada uma das seções.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

## Adapte os elementos à janela de visualização mais larga

A janela de visualização estreita apresentava uma exibição com empilhamento linear.  As seções principais e o conteúdo delas eram exibidos em ordem, de cima para baixo.

Uma janela de visualização larga oferece espaço adicional que podemos usar para exibir o conteúdo de forma otimizada de acordo com o tamanho da tela.  Para a página do produto, e ainda de acordo com a arquitetura de informações, isso significa que podemos:

*  Mover o formulário de acordo com as informações do cabeçalho.
*  Posicionar o vídeo à direita dos recursos mais importantes.
*  Dividir as imagens em blocos.
*  Expandir a tabela.

### Faça o formulário flutuar

A janela de visualização estreita significa que temos menos espaço horizontal disponível para posicionar de maneira espaçada os elementos na tela.

Para fazer um uso mais efetivo do espaço horizontal disponível, precisamos quebrar o fluxo linear do cabeçalho e mover o formulário e a lista para que fiquem lado a lado.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=formfloat lang=css %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Lamentamos, seu navegador não é compatível com vídeo.
     <a href="videos/floatingform.mov">Fazer o download do vídeo</a>.
  </p>
</video>

### Faça o vídeo flutuar

O vídeo na interface da janela de visualização estreita foi projetado para ocupar toda a largura da tela e ficar posicionado após a lista dos principais recursos. Em uma janela de visualização larga, o vídeo será dimensionado para um tamanho demasiado grande, assumindo um aspecto desagradável quando estiver colocado ao lado da lista de recursos.

O elemento de vídeo precisa sair do fluxo vertical da janela de visualização estreita e ser exibido lado a lado com a lista do conteúdo em uma janela de visualização larga.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=floatvideo lang=css %}

### Divida as imagens em blocos

As imagens na interface da janela de visualização estreita (na maioria, dispositivos móveis) estão definidas para ocupar toda a largura da tela e ser empilhadas verticalmente.  O redimensionamento dessas imagens para uma janela de visualização larga não funciona de forma eficiente.

Para fazer com que as imagens sejam exibidas de forma correta em uma janela de visualização larga, as imagens devem ser redimensionadas em 30% da largura do recipiente e dispostas horizontalmente (não verticalmente, como na visualização estreita). Também adicionamos bordas arredondadas e sombreamento para dar maior destaque às imagens.

<img src="images/imageswide.png" style="width:100%">

{% include_code src=_code/fixingfirstbreakpoint.html snippet=tileimages lang=css %}

### Torne as imagens mais responsivas ao DPI

Ao usar imagens, leve em consideração o tamanho da janela de visualização e a densidade da exibição.

A Web foi criada para o uso de telas com 96 dpi.  Com a introdução dos dispositivos móveis, ocorreu um grande aumento na densidade de pixels das telas, sem mencionar as telas tipo Retina de alguns laptops.  Dessa forma, as imagens que são codificadas para telas com 96 dpi acabam apresentando uma exibição horrível em dispositivos com alto dpi.

Temos uma solução que ainda não foi amplamente adotada.
Para os navegadores que oferecem esse tipo de suporte, é possível exibir uma imagem de alta densidade em uma tela de alta densidade.

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x">
{% endhighlight %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

### Tabelas

É difícil configurar tabelas em dispositivos com uma janela de visualização estreita, por isso, é preciso tomar cuidado com esse tipo de recurso.

Em janelas de visualização estreitas, recomendamos criar as tabelas em duas linhas, transpondo o título e as células em uma linha para criar as colunas.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Lamentamos, seu navegador não é compatível com vídeo.
     <a href="videos/responsivetable.mov">Fazer o download do vídeo</a>.
  </p>
</video>

Em nosso site, tivemos que criar um ponto de quebra adicional somente para o conteúdo da tabela.
Ao criar conteúdo primeiramente para dispositivos móveis, é mais difícil remover os estilos aplicados, por isso, precisamos separar o código CSS da tabela de uma janela estreita e o código CSS da janela larga.
Dessa forma, temos uma quebra limpa e consistente.

{% include_code src=_code/content-with-styles.html snippet=table-css lang=css %}

## Finalização

**PARABÉNS.** Se estiver lendo isto, você já criou sua primeira página de destino do produto que funciona em diversos dispositivos, formatos e tamanhos de tela.

Se seguir estas diretrizes, você desenvolverá um excelente projeto:

1. Crie uma arquitetura básica de informações e entenda o conteúdo antes de criar o código.
2. Sempre defina uma janela de visualização.
3. Crie uma experiência com base na abordagem inicial dos dispositivos móveis.
4. Depois de criar a experiência para dispositivos móveis, amplie a largura da tela até que a exibição apresente problemas. Nesse momento, crie um ponto de quebra.
5. Continue repetindo.



