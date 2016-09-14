project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A Web pode ser acessada por uma grande variedade de dispositivos, de celulares com telas minúsculas a TVs com telas enormes. Saiba como criar um site que funcione de maneira eficaz em todos esses dispositivos.

{# wf_review_required #}
{# wf_updated_on: 2014-01-05 #}
{# wf_published_on: 2013-12-31 #}

# Seu primeiro site para múltiplos dispositivos {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}



O desenvolvimento de experiências para diversos dispositivos não é tão difícil quanto parece. Ao seguir as instruções deste guia, criaremos um exemplo de página de destino do produto para nosso <a href='https://www.udacity.com/course/cs256'>curso CS256 Desenvolvimento da Web para dispositivos móveis</a> que funcionará de maneira eficiente em diferentes tipos de dispositivos.

<img src="images/finaloutput-2x.jpg" alt="muitos dispositivos que exibem o projeto final">

Criar um site para múltiplos dispositivos com funcionalidades, tamanhos de telas e métodos de interação completamente distintos pode parecer uma tarefa assustadora e até impossível.

Na verdade, criar sites totalmente responsivos não é tão difícil assim e, para comprovar, este guia orientará você ao longo das etapas necessárias para desenvolver esse projeto.  Dividimos a tarefa em duas etapas simples:

1. Definir a arquitetura de informações e a estrutura da página, 2. Adicionar elementos de design para tornar o site responsivo e eficaz em todos os dispositivos.




## Crie seu conteúdo e uma estrutura 




O conteúdo é o elemento mais importante de qualquer site. Então vamos criar um design a partir do conteúdo, evitando que o conteúdo seja limitado pelo design. Neste guia, identificaremos o conteúdo necessário, criaremos uma estrutura de páginas a partir desse conteúdo e apresentaremos a página em um layout simples e linear que funciona de maneira eficaz em janelas de visualização de tamanhos variados.


### Crie a estrutura da página

Identificamos o que é necessário:

1.  Uma área que descreva em alto nível nosso produto, o curso `CS256: desenvolvimento da Web para dispositivos móveis`
2.  Um formulário para coletar informações dos usuários que estão interessados no nosso produto
3.  Uma descrição detalhada e um vídeo
4. Imagens do produto em ação
5. Uma tabela de dados com informações que comprovem o que foi dito

### TL;DR {: .hide-from-toc }
- 'Primeiramente, identifique o conteúdo de que você precisa.'
- Faça um esboço da arquitetura de informações para janelas de visualização largas e estreitas.
- Crie uma visualização básica da página que inclua o conteúdo sem detalhes de estilo.


Também criamos uma arquitetura básica de informações e um layout para janelas de visualização largas e estreitas.

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="Janela estreita IA">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="Janela larga IA">
</div>

Isso pode ser facilmente convertido nas seções básicas da estrutura de uma página que usaremos em todo este projeto.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" %}
</pre>

### Adicione conteúdo à página

A estrutura básica do site está completa. Sabemos quais seções são necessárias, o conteúdo que será exibido nessas seções e onde ele deve ser posicionado na arquitetura geral de informações. Agora podemos desenvolver nosso site.

Note: Estilo virá mais tarde

#### Crie o título e o formulário

O título e o formulário de notificação de solicitação são os componentes fundamentais da nossa página. Eles devem ser apresentados imediatamente ao usuário.

No título, adicione texto simples para descrever o curso:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" %}
</pre>

Também é necessário preencher o formulário.
O formulário é simplificado e será usado para coletar o nome e o número de telefone dos usuários, além de uma indicação de horário para que possamos entrar em contato com eles.

Todos os formulários devem ter rótulos e marcadores de posição para que os usuários possam identificar facilmente os elementos, entender quais informações serão inseridas em cada campo e também ajudar as ferramentas de acessibilidade a compreender a estrutura do formulário.  O atributo de nome não apenas envia os dados do formulário ao servidor, mas também é usado para fornecer dicas importantes ao navegador sobre como preencher automaticamente o formulário para o usuário.

Adicionaremos tipos de semântica para agilizar e simplificar a inserção de dados pelos usuários em dispositivos móveis.  Por exemplo, ao inserir o número de telefone, o usuário verá apenas o teclado numérico.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addform.html" region_tag="form" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms #}

#### Crie a seção `Vídeo e informações`

A seção `Vídeo e informações` incluirá um conteúdo mais detalhado.
Ela oferecerá uma lista de recursos do nosso produto e um marcador de posição de vídeo que mostra aos usuários a utilização do produto.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" %}
</pre>

Os vídeos são muito usados para descrever conteúdo de forma mais interativa e também para demonstrar um produto ou conceito.

Ao seguir as práticas recomendadas, você conseguirá integrar vídeos ao seu site de forma facilitada:

* Adicione um atributo `controles` para facilitar a reprodução do vídeo.
* Adicione uma imagem em formato pôster para oferecer uma visualização do conteúdo.
* Adicione diversos elementos `<source>` com base nos formatos de vídeo compatíveis.
* Adicione um texto substituto para permitir que os visitantes façam o download do vídeo se não conseguirem visualizá-lo na janela.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addvideo.html" region_tag="video"   adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.video #}

#### Crie a seção `Imagens`

Os sites sem imagem geralmente são mais entediantes. Existem dois tipos de imagens:

*  Imagens de conteúdo &mdash; são adicionadas de forma in-line ao documento e usadas para fornecer informações adicionais sobre o conteúdo.
*  Imagens de estilo &mdash; em sua maioria, são posicionadas em segundo plano, com padrões e gradientes, e usadas para deixar o site mais atraente.  Essas imagens serão abordadas no [próximo artigo]({{page.nextPage.relative_url}}).

A seção `Imagens` da nossa página é um conjunto de imagens de conteúdo.

As imagens de conteúdo são importantes para transmitir o significado da página. Pense nelas como as imagens usadas em artigos de jornais. As imagens usadas são fotos dos tutores do projeto: Chris Wilson, Peter Lubbers e Sean Bennet.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addimages.html" region_tag="images"   adjust_indentation="auto" %}
</pre>

As imagens são dimensionadas em 100% da largura da tela. Essa formatação funciona com eficiência em dispositivos com tela estreita e não apresenta a mesma eficácia em janelas de visualização largas (como computadores).  Essa questão será abordada na seção de design ágil.

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

Muitas pessoas não conseguem visualizar as imagens e precisam fazer uso de tecnologias de assistência, como leitores de tela, que analisam os dados na página e transmitem verbalmente essas informações ao usuário.  É preciso incluir uma tag `alt` de descrição das imagens de conteúdo que possa ser informada pelo leitor de tela ao usuário.

Quando adicionar tags `alt`, procure manter o texto alternativo o mais breve possível ao descrever a imagem por completo.  Por exemplo, em nossa demonstração, esse atributo foi formatado para `Nome: função`. Assim, fornecemos informações suficientes para que o usuário entenda que a seção aborda os criadores e as funções deles.

#### Adicione a seção de dados tabulados

A última seção é uma tabela simples que usamos para mostrar dados estatísticos específicos sobre o produto.

As tabelas devem ser usadas unicamente para apresentar dados, por exemplo, em matrizes de informações.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" %}
</pre>

#### Adicione um rodapé

A maioria dos sites precisa de um rodapé para exibir informações como Termos e Condições, isenções de responsabilidade e outros tipos de conteúdo que não precisam ser exibidos na área principal de navegação nem junto ao conteúdo principal da página.

Em nosso site, incluiremos links para os Termos e Condições, uma página com informações de contato e nossos perfis nas mídias sociais.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" %}
</pre>

### Índice

Criamos o esboço do site e identificamos todos os principais elementos estruturais.  Também verificamos se todo o conteúdo relevante está pronto e adequado para atender às nossas necessidades comerciais.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="Content">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

Você perceberá que a página ainda não está visualmente agradável, mas isso é algo intencional. 
O conteúdo é o aspecto mais importante de qualquer site, e precisamos garantir que a densidade e a arquitetura de informações estejam solidificadas. Este guia nos forneceu uma excelente base a partir da qual poderemos evoluir. No próximo guia, adicionaremos elementos de estilo ao conteúdo.





## Torne o site responsivo 




A Web pode ser acessada por uma grande variedade de dispositivos, de celulares com telas minúsculas a TVs com telas enormes. Cada dispositivo oferece benefícios e limitações específicos. Como desenvolvedor da Web, você precisa oferecer suporte a todos os tipos de dispositivos.


Desenvolveremos um site que funcione em todos os tamanhos de tela e tipos de dispositivos. No [artigo anterior]({{page.previousPage.relative_url}}), projetamos a arquitetura de informações da página e definimos a estrutura básica.
Neste guia, aproveitaremos a estrutura básica e o conteúdo e os transformaremos em uma página incrível que será responsiva em um grande número de tamanhos de tela.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="Conteúdo">
    <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Conteúdo e estrutura </a> </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Versão final do site </a> </figcaption>
  </figure>
</div>

Ao seguir os princípios de desenvolver um site primeiramente para celulares, começamos com uma janela de visualização estreita, similar à tela de um celular, e fazemos todos os ajustes iniciais voltados para essa experiência.
Em um segundo momento, redimensionamos o projeto para dispositivos maiores.
Para fazer isso, ampliaremos a janela de visualização e decidiremos se o design e o layout estão visualmente adequados.

Anteriormente, criamos dois designs para apresentar nosso conteúdo. Agora, precisamos adaptar nossa página de acordo com esses layouts.
Para isso, precisamos decidir onde serão colocados os pontos de quebra, ou seja, pontos em que o layout e os estilos são alterados, com base na forma como o conteúdo é mostrado em diferentes tamanhos de tela.

### TL;DR {: .hide-from-toc }
- Sempre use uma janela de visualização.
- Sempre comece com uma janela de visualização estreita e redimensione-a para dispositivos maiores.
- Estabeleça os pontos de quebra de acordo com a necessidade de adaptar o conteúdo.
- Crie uma visão de alto nível do layout nos principais pontos de quebra.


### Adicionar um janela de visualização

Mesmo no caso de uma página básica, sempre é **obrigatório** incluir uma metatag de janela de visualização.
A janela de visualização é o componente crucial da criação de experiências adequadas a múltiplos dispositivos.
Sem ela, o site não funcionará de forma eficaz em um dispositivo móvel.

A janela de visualização indica ao navegador que a página precisa ser redimensionada para se ajustar ao tamanho da tela.  Existem várias configurações de janela de visualização que podem ser especificadas para controlar a exibição da página. Por padrão, recomendamos:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" %}
</pre>

A janela de visualização fica no título do documento e só precisa ser informada uma vez.

{# include shared/related_guides.liquid inline=true list=page.related-guides.responsive #}

### Aplicar um estilo simples 

Nosso produto e nossa empresa já dispõem de diretrizes muito específicas em um guia de estilo para configurar fontes e a promoção da marca.

#### Guia de estil

O guia de estilo é uma maneira útil de conseguir uma compreensão de alto nível da representação visual da página, além de ajudar a manter um trabalho consistente em todo o projeto de criação do design.

##### Cores 

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### Adicione imagens de estilo

No guia anterior, adicionamos imagens denominadas `imagens de conteúdo`.  Essas imagens eram importantes para descrever o produto.  As imagens de estilo não fazem parte do conteúdo fundamental do site, mas adicionam um elemento visual de destaque e ajudam a direcionar a atenção do usuário para uma parte específica do conteúdo.

Um bom exemplo disso é uma imagem para a seção do título no conteúdo `acima da dobra`. Ela é geralmente usada para convencer o usuário a ler mais detalhes sobre o produto.

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="Site projetado">
</div>

É muito simples incluir essa imagem. No nosso caso, ela será colocada em segundo plano no cabeçalho e será aplicada por meio de um simples código CSS.


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

Escolhemos uma imagem simples de segundo plano, levemente borrada para não retirar atenção do conteúdo e configurada para `cobrir` todo o elemento. Dessa forma, ela manterá a proporção correta sempre que for ampliada.

<br style="clear: both;">

### Defina o seu primeiro ponto de quebra

O design começa a apresentar um aspecto desagradável por volta de 600 px de largura.  Em nosso caso, o comprimento da linha está acima de dez palavras (o comprimento de leitura ideal), por isso queremos fazer uma modificação.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Lamentamos, seu navegador não é compatível com vídeo.
     <a href="videos/firstbreakpoint.mov">Fazer o download do vídeo</a>.
  </p>
</video>

Em 600 pixels, podemos criar nosso primeiro ponto de quebra para reposicionar os elementos a fim de adequá-los à tela de forma mais eficiente.  Para fazer isso, usamos uma tecnologia chamada [consultas de mídia]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness).


    @media (min-width: 600px) {
    
    }
    

Existe mais espaço disponível em uma tela mais larga e, consequentemente, há uma maior flexibilidade quanto à forma como o conteúdo pode ser exibido.

Note: Não é preciso mover todos os elementos ao mesmo tempo, ou seja, é possível fazer ajustes menores quando necessário.

No contexto da página do nosso produto, parece que precisaremos:

*  Limitar a largura máxima do layout.
*  Alterar o espaçamento dos elementos e reduzir o tamanho do texto.
*  Mover o formulário para flutuar in-line com o conteúdo do título.
*  Fazer o vídeo flutuar conforme o conteúdo.
*  Reduzir o tamanho das imagens e fazer com que elas sejam exibidas em uma grade mais agradável.

{# include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point #}

### Limitar a largura máxima do layout

Optamos por manter apenas dois layouts: uma janela de visualização estreita e uma mais larga, simplificando o processo de desenvolvimento do site.

Também decidimos criar seções sem bordas na janela de visualização estreita que permanecerão sem bordas na janela de visualização larga.  Isso significa que devemos limitar a largura máxima da tela para que o texto e os parágrafos não se transformem em uma única linha em telas muito largas.  Esse ponto foi estabelecido em aproximadamente 800 px.

Para conseguir isso, precisamos limitar a largura e centralizar os elementos.  É preciso criar um recipiente para cada seção principal e aplicar uma instrução de `margem automática`. Isso permitirá que o conteúdo permaneça centralizado e com um tamanho máximo de 800 pixels, mesmo em telas maiores.

O recipiente será um `div` simples na seguinte forma:

{% highlight html %}<div class="container">...</div>{% endhighlight %}

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container"   adjust_indentation="auto" %}
</pre>

### Altere o espaçamento e reduza o tamanho do texto

Não há muito espaço para exibir conteúdo na janela de visualização estreita, por isso, o tamanho e o padrão das fontes geralmente são bastante reduzidos para se adequar à tela.

Em uma janela de visualização maior, é preciso considerar que o usuário provavelmente estará diante de uma tela maior, mas também estará mais distante dessa tela.  Para aumentar a legibilidade do conteúdo, podemos aumentar o tamanho e o padrão da fonte e alterar o espaçamento para dar mais destaque a áreas específicas.

Na página do produto, aumentaremos o espaçamento dos elementos da seção. Para isso, manteremos o espaçamento em 5% da largura.  Também aumentaremos o tamanho dos cabeçalhos de cada uma das seções.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

### Adapte os elementos à janela de visualização mais larga

A janela de visualização estreita apresentava uma exibição com empilhamento linear.  As seções principais e o conteúdo delas eram exibidos em ordem, de cima para baixo.

Uma janela de visualização larga oferece espaço adicional que podemos usar para exibir o conteúdo de forma otimizada de acordo com o tamanho da tela.  Para a página do produto, e ainda de acordo com a arquitetura de informações, isso significa que podemos:

*  Mover o formulário de acordo com as informações do cabeçalho.
*  Posicionar o vídeo à direita dos recursos mais importantes.
*  Dividir as imagens em blocos.
*  Expandir a tabela.

#### Faça o formulário flutuar

A janela de visualização estreita significa que temos menos espaço horizontal disponível para posicionar de maneira espaçada os elementos na tela.

Para fazer um uso mais efetivo do espaço horizontal disponível, precisamos quebrar o fluxo linear do cabeçalho e mover o formulário e a lista para que fiquem lado a lado.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Lamentamos, seu navegador não é compatível com vídeo.
     <a href="videos/floatingform.mov">Fazer o download do vídeo</a>.
  </p>
</video>

#### Faça o vídeo flutuar

O vídeo na interface da janela de visualização estreita foi projetado para ocupar toda a largura da tela e ficar posicionado após a lista dos principais recursos. Em uma janela de visualização larga, o vídeo será dimensionado para um tamanho demasiado grande, assumindo um aspecto desagradável quando estiver colocado ao lado da lista de recursos.

O elemento de vídeo precisa sair do fluxo vertical da janela de visualização estreita e ser exibido lado a lado com a lista do conteúdo em uma janela de visualização larga.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo"   adjust_indentation="auto" %}
</pre>

#### Divida as imagens em blocos

As imagens na interface da janela de visualização estreita (na maioria, dispositivos móveis) estão definidas para ocupar toda a largura da tela e ser empilhadas verticalmente.  O redimensionamento dessas imagens para uma janela de visualização larga não funciona de forma eficiente.

Para fazer com que as imagens sejam exibidas de forma correta em uma janela de visualização larga, as imagens devem ser redimensionadas em 30% da largura do recipiente e dispostas horizontalmente (não verticalmente, como na visualização estreita). Também adicionamos bordas arredondadas e sombreamento para dar maior destaque às imagens.

<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages"   adjust_indentation="auto" %}
</pre>

#### Torne as imagens mais responsivas ao DPI

Ao usar imagens, leve em consideração o tamanho da janela de visualização e a densidade da exibição.

A Web foi criada para o uso de telas com 96 dpi.  Com a introdução dos dispositivos móveis, ocorreu um grande aumento na densidade de pixels das telas, sem mencionar as telas tipo Retina de alguns laptops.  Dessa forma, as imagens que são codificadas para telas com 96 dpi acabam apresentando uma exibição horrível em dispositivos com alto dpi.

Temos uma solução que ainda não foi amplamente adotada.
Para os navegadores que oferecem esse tipo de suporte, é possível exibir uma imagem de alta densidade em uma tela de alta densidade.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

#### Tabelas

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

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/getting-started/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css"   adjust_indentation="auto" %}
</pre>

### Finalização

**PARABÉNS.** Se estiver lendo isto, você já criou sua primeira página de destino do produto que funciona em diversos dispositivos, formatos e tamanhos de tela.

Se seguir estas diretrizes, você desenvolverá um excelente projeto:

1. Crie uma arquitetura básica de informações e entenda o conteúdo antes de criar o código.
2. Sempre defina uma janela de visualização.
3. Crie uma experiência com base na abordagem inicial dos dispositivos móveis.
4. Depois de criar a experiência para dispositivos móveis, amplie a largura da tela até que a exibição apresente problemas. Nesse momento, crie um ponto de quebra.
5. Continue repetindo.



