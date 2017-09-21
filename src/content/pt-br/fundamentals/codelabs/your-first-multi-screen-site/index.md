project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A Web pode ser acessada por diversos tipos de dispositivos, desde celulares com pequenas telas até televisores com grandes telas. Cada dispositivo inclui seus próprios benefícios e limitações. Como um desenvolvedor Web, você deve oferecer suporte a todos os tipos de dispositivos.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2013-12-31 #}

# Seu Primeiro Site para Vários Dispositivos {: .page-title }

Warning: Este artigo não é atualizado há algum tempo e pode não refletir a realidade. Confira o curso gratuito de [Web design responsivo](https://www.udacity.com/course/responsive-web-design-fundamentals--ud893) no Udacity.

{% include "web/_shared/contributors/paulkinlan.html" %}

<img src="images/finaloutput-2x.jpg" alt="muitos dispositivos mostrando o projeto final" class="attempt-right">

Criar experiências para vários dispositivos não é tão difícil quando parece.
Neste guia, criaremos uma página de destino de produto para o 
[CS256: Curso de desenvolvimento para Web móvel](https://www.udacity.com/course/mobile-web-development--cs256)
 que funciona bem em diferentes tipos de dispositivos.

O desenvolvimento para vários dispositivos com diferentes recursos, tamanhos de tela
e métodos de interação amplamente diferentes pode parecer assustador, se não impossível
de começar.

Criar um site totalmente responsivo não é tão difícil quanto você imagina e, para mostrar isso a
você, este guia orienta você pelas etapas que podem ser usadas para começar o trabalho.
Nós dividimos o guia em duas etapas simples:

1. Definir a arquitetura de informações (comumente conhecida como IA) e a estrutura da página,
2. Adicionar elementos de design para tornar a página responsiva e bonita em todos os dispositivos.


## Crie seu conteúdo e sua estrutura

O conteúdo é o aspecto mais importante de qualquer site. Então, vamos criar o design para o
conteúdo e não deixar que o design defina o conteúdo. Neste guia, identificaremos
o conteúdo de que precisamos primeiro, criaremos uma estrutura de página com
base nesse conteúdo e apresentaremos a página em um layout linear simples que
funciona bem em janelas de visualização estreitas e largas.


### Crie a estrutura da página

Nós identificamos que precisamos de:

1. Uma área que descreve com alto nível nosso produto "CS256: Curso de desenvolvimento para Web móvel"
2.  Um formulário para coletar informações de usuários interessados no nosso produto
3.  Uma descrição aprofundada e um vídeo
4.  Imagens do produto em ação
5.  Uma tabela de dados com informações para suportar as afirmações

#### TL;DR {: .hide-from-toc }
- Primeiro, identifique o conteúdo de que precisa.
- Esboce a Arquitetura de Informações (IA) para janelas de visualização largas e estreitas.
- Crie uma visualização básica da página com o conteúdo, mas sem o estilo.

Também criamos uma arquitetura de informações básica e um layout para
janelas de visualização estreitas e largas.

<div class="attempt-left">
  <figure>
    <img src="images/narrowviewport.png" alt="IA de janela de visualização estreita">
    <figcaption>
      IA de janela de visualização estreita
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/wideviewport.png" alt="IA de janela de visualização larga">
    <figcaption>
      IA de janela de visualização larga
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Isso pode ser facilmente convertido nas seções esboçadas de uma página básica que
usaremos para o restante deste projeto.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addstructure.html){: target="_blank" .external }

### Adicione conteúdo à página

A estrutura básica do site está completa. Sabemos de que seções precisamos, o
conteúdo que será exibido nessas seções e onde posicionar a
arquitetura de informações geral. Agora podemos começar a compilar o site.

Observação: Aplicaremos o estilo depois

### Crie o título e o formulário

O título e o formulário de notificação de solicitação são componentes essenciais da
nossa página. Eles devem ser apresentados ao usuário imediatamente.

No título, adicione um texto simples para descrever o curso:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addheadline.html){: target="_blank" .external }

Também precisamos preencher o formulário.
Ele será um formulário simples que coleta o nome dos usuários, seus endereços de e-mail
e números de telefone.

Todos os formulários devem ter rótulos e marcadores para permitir que os usuários
foquem em elementos, entendam as informações que devem ser preenchidas e para ajudar
ferramentas de acessibilidade a entender a estrutura do formulário.  O atributo name
não só envia o valor do formulário ao servidor, como também é usado para fornecer dicas importantes
ao navegador sobre como preencher o formulário automaticamente para o usuário.

Adicionaremos tipos semânticos para que os usuários possam inserir
conteúdo em dispositivos móveis de forma simples e rápida.  Por exemplo, ao inserir um número
de telefone, o usuário deve ver apenas um teclado numérico.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addform.html){: target="_blank" .external }

#### Crie a seção de vídeo e informações

A seção de vídeo e informações do conteúdo será um pouco mais aprofundada.
Ela conterá uma lista de recursos dos nossos produtos e um
marcador de vídeo que mostra o produto em funcionamento para o usuário.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html){: target="_blank" .external }

Vídeos são frequentemente usados para descrever conteúdo de forma mais interativa
e para demonstrar um produto ou conceito.

Ao seguir as práticas recomendadas, você pode integrar um vídeo em seu site com facilidade:

*  Adicione um atributo `controls` para facilitar a reprodução do vídeo.
*  Adicione uma imagem de `poster` para dar uma prévia do conteúdo.
*  Adicione vários elementos `<source>` de acordo com os formatos de vídeo suportados.
*  Adicione texto reserva para que as pessoas possam fazer download do vídeo se não conseguirem reproduzi-lo na janela.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html){: target="_blank" .external }

#### Crie a seção de imagens

Sites sem imagens podem ser um pouco chatos. Existem dois tipos de imagem:

*  Imagens de conteúdo &mdash; imagens em linha no documento e que são usadas
 para transmitir informações adicionais sobre o conteúdo.
*  Imagens estilísticas &mdash; imagens usadas para que o site
 pareça mais bonito; frequentemente, são imagens de fundo, padrões e gradientes.  Abordaremos
 esse tópico na [próxima seção](#make-it-responsive).

A seção de imagens da nossa página é um conjunto de imagens de conteúdo.

Imagens de conteúdo são essenciais para transmitir o significado da página. Considere-as
como as imagens usadas em artigos de jornais.  As imagens que estamos usando são
fotos dos instrutores do projeto:  Chris Wilson, Peter Lubbers e Sean
Bennet.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addimages.html){: target="_blank" .external }

As imagens estão configuradas para serem dimensionadas a 100% da largura da tela. Isso funciona
bem em dispositivos com uma janela de visualização estreita, mas não tão bem nos que têm uma
janela de visualização larga (como um computador).  Isso será administrado na seção de design
responsivo.

Muitas pessoas não têm a capacidade de visualizar imagens e frequentemente usam tecnologias
de assistência, como um leitor de telas, para analisar os dados na página e
transmitir essas informações ao usuário verbalmente.  Certifique-se de que todas as suas imagens
de conteúdo tenham uma tag `alt` descritiva que o leitor de tela possa ler para
o usuário.

Ao adicionar tags `alt`, mantenha o texto delas o mais conciso possível
para descrever a imagem por completo.  Por exemplo, na nossa demonstração, nós simplesmente
formatamos o atributo como "Nome: Função", pois isso apresenta informações suficientes
para que o usuário entenda que a seção é sobre os autores e seus
cargos.

#### Adicione a seção de dados tabulados

A última seção é uma tabela simples usada para mostrar estatísticas específicas
sobre o produto.

As tabelas só devem ser usadas para dados tabulares, como matrizes de informações.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addtable.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addtable.html){: target="_blank" .external }

#### Adicione um rodapé

A maioria dos sites precisa de um rodapé para exibir conteúdo como Termos e Condições,
avisos e outros conteúdos que não devem ser inseridos na navegação principal
ou na área principal de conteúdo da página.

No nosso site, criaremos um simples rodapé de marcador.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addcontent.html){: target="_blank" .external }

### Resumo

Nós criamos o esboço do site e identificamos todos os principais
elementos estruturais.  Também garantimos que todo o conteúdo
relevante esteja pronto e no local adequado para atender às nossas necessidades de negócios.

<div class="attempt-left">
  <figure>
    <img src="images/content.png" alt="Conteúdo">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Conteúdo e estrutura  </a>
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img  src="images/narrowsite.png" alt="Site projetado" style="max-width: 100%;">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Site final  </a>
    </figcaption>
  </figure>
</div>

Você perceberá que, no momento, a aparência da página está péssima; isso é intencional.
O conteúdo é o aspecto mais importante de qualquer site e precisamos garantir que
tenhamos uma arquitetura e densidade de informações robustas. Este guia nos proporcionou uma ótima
base para desenvolver. Definiremos o estilo do nosso conteúdo no próximo guia.



## Adote o design responsivo {: #make-it-responsive }

A Web pode ser acessada por diversos tipos de dispositivos, desde celulares com pequenas
telas até televisores com grandes telas. Cada dispositivo apresenta seus próprios
benefícios e limitações. Como um desenvolvedor Web, você deve oferecer
suporte a todos os tipos de dispositivos.


Estamos criando um site que funciona em diversos tamanhos de tela e tipos
de dispositivo. Nós criamos a arquitetura de informações da página e uma
estrutura básica. Nesta seção, transformaremos nossa estrutura básica com
conteúdo em uma bela página que é responsiva em uma grande quantidade
de tamanhos de tela.

Seguindo os princípios do desenvolvimento Web que prioriza os dispositivos móveis,
começamos com uma janela de visualização estreita &mdash; similar a um celular &mdash; e compilamos
primeiro para essa experiência. Em seguida, expandimos para classes de dispositivos maiores. Podemos fazer isso
tornando a janela de visualização mais larga e verificando se o design e o
layout estão adequados.

Anteriormente, nós criamos alguns designs de alto nível diferentes para como o conteúdo
deve ser exibido. Agora, precisamos fazer com que nossa página se adapte a esses diferentes layouts.
Para isso, devemos decidir onde posicionar nossos pontos de interrupção &mdash; pontos
onde o layout e os estilos mudam &mdash; com base em como o conteúdo se encaixa no
tamanho da tela.

### TL;DR {: .hide-from-toc }
- Sempre use uma janela de visualização.
- Sempre comece com uma janela de visualização estreita e vá ampliando.
- Baseie seus pontos de interrupção em quando precisar adaptar o conteúdo.
- Crie uma visão de alto nível do seu layout nos principais pontos de interrupção.


### Adicione uma janela de visualização

Mesmo para uma página básica, você **precisa** sempre incluir uma meta tag de janela de visualização.
A janela de visualização é o componente mais importante para criar experiências
para vários dispositivos. Sem ela, seu site não funcionará bem em um dispositivo móvel.

A janela de visualização indica para o navegador que a página precisa ser dimensionada para caber
na tela. Existem muitas configurações diferentes que podem ser especificadas para
a janela de visualização para controlar a exibição da página.  Como padrão, recomendamos:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/viewport.html){: target="_blank" .external }

A janela de visualização se encontra no cabeçalho do documento e só precisa ser declarada uma vez.

### Aplique um estilo simples

Nosso produto e nossa empresa já têm diretrizes de fonte e marca específicas apresentadas
em um guia de estilo.

#### Guia de estilo

Um guia de estilo é uma forma útil de obter uma compreensão de alto nível da representação visual
da página e ajuda você a garantir um design totalmente consistente.

#### Cores

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### Adicione imagens estilísticas

<img  src="images/narrowsite.png" alt="Site projetado"  class="attempt-right" />

No guia anterior, nós adicionamos imagens chamadas "imagens de conteúdo".  Essas eram
imagens que eram importantes para a narrativa do nosso produto.  Imagens estilísticas
são imagens que não são necessárias como parte do conteúdo principal, mas que agregam um impacto visual
ou ajudam a orientar a atenção do usuário para um conteúdo específico.

Um bom exemplo disso é uma imagem de título para o conteúdo "acima da dobra".  Esse
tipo de imagem é frequentemente usado para incentivar o usuário a ler mais sobre o produto.

Elas podem ser muito fáceis de incluir. No nosso caso, ela será o plano de fundo do
cabeçalho e a aplicaremos com um CSS simples.

<div style="clear:both;"></div>

    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

Nós escolhemos uma imagem de fundo simples que é desfocada e não desvia a atenção
do conteúdo. Nós a definimos como `cover` para todo o elemento, para que ela seja sempre
ampliada, mas mantenha a taxa de proporção correta.


### Defina seu primeiro ponto de interrupção

O design começa a ficar inadequado em cerca de 600 pixels de largura.  No nosso caso, o comprimento da
linha ficará acima de 10 palavras (o comprimento ideal de leitura) e é isso
que queremos alterar.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Seu navegador não oferece suporte a vídeos.
     <a href="videos/firstbreakpoint.mov">Faça download do vídeo</a>.
  </p>
</video>

600 pixels parece ser um bom local para criar nosso primeiro ponto de interrupção,
pois ele nos dará o escopo para reposicionar elementos para que eles caibam na tela.
Podemos fazer isso usando uma tecnologia chamada [consultas de mídia](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries).

    @media (min-width: 600px) {
    
    }
    
Uma tela maior tem mais espaço, portanto, há mais flexibilidade para a exibição
do conteúdo.

Observação: Não é preciso mover todos os elementos de uma fez. Você pode fazer ajustes menores se necessário.

No contexto da nossa página de produto, parece que
precisaremos:

*  Limitar a largura máxima do design.
*  Alterar o preenchimento dos elementos e reduzir o tamanho do texto.
*  Mover o formulário para flutuar em linha com o conteúdo do cabeçalho.
*  Fazer o vídeo flutuar em torno do conteúdo.
*  Reduzir o tamanho das imagens e fazê-las aparecer em uma grade melhor.


### Limitar a largura máxima do design

Nós escolhemos ter apenas dois layouts principais: uma janela de visualização estreita e uma larga,
o que simplifica nosso processo de compilação de forma significativa.

Também decidimos criar seções com sangria total na janela de visualização estreita que
permanecem com a sangria total na janela de visualização larga.  Isso significa que devemos limitar a
largura máxima da tela para que o texto e os parágrafos não se estendam em uma só
longa linha em telas muito largas.  Nós escolhemos posicionar esse ponto
a cerca de 800 pixels.

Para isso, precisamos limitar a largura e centralizar os elementos.  Precisamos
criar um contêiner em torno de cada seção principal e aplicar um `margin:
auto`.  Isso permitirá que a tela seja expandida, mas o conteúdo permanecerá centralizado
e terá um tamanho máximo de 800 pixels.

O contêiner será um simples `div` no seguinte formulário:

    <div class="container">...</div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="containerhtml" adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="container" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/constrainwidth.html){: target="_blank" .external }

### Alterar o preenchimento e reduzir o tamanho do texto

Na janela de visualização estreita, não temos muito espaço para exibir conteúdo, portanto,
o tamanho e o peso da tipografia frequentemente são muito reduzidos para caber na
tela.

Com uma janela de visualização maior, precisamos considerar que o usuário tem mais probabilidade de estar usando
uma tela maior, mas a uma distância maior.  Para aumentar a legibilidade do
conteúdo, podemos aumentar o tamanho e o peso da tipografia, além de
alterar o preenchimento para destacar mais áreas distintas.

Na nossa página de produto, aumentaremos o preenchimento dos elementos de seção ao
defini-lo para permanecer em 5% da largura.  Também aumentaremos o tamanho dos
cabeçalhos para cada seção.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/alterpadding.html" region_tag="padding" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/alterpadding.html){: target="_blank" .external }

### Adaptar elementos a uma janela de visualização larga

Nossa janela de visualização estreita era uma exibição linear empilhada.  Cada seção principal e seu respectivo conteúdo
foi exibida, em ordem, da parte superior à inferior.

Uma janela de visualização larga nos proporciona espaço adicional para exibir o conteúdo da maneira ideal
para a tela em questão.  Para nossa página de produto, isso significa que, de acordo com nossa IA, podemos:

*  Mover o formulário em volta das informações de cabeçalho.
*  Posicionar o vídeo à direita dos pontos principais.
*  Organizar as imagens em blocos.
*  Expandir a tabela.

#### Flutuar o elemento form

A janela de visualização estreita significa que temos muito menos espaço horizontal disponível para
posicionar os elementos de forma confortável na tela.

Para fazer um uso mais eficaz do espaço em tela horizontal, precisamos romper
p fluxo linear do cabeçalho e mover o formulário e a lista para que eles fiquem
lado a lado.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/floattheform.html" region_tag="formfloat" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/floattheform.html){: target="_blank" .external }

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Seu navegador não oferece suporte a vídeos.
     <a href="videos/floatingform.mov">Faça download do vídeo</a>.
  </p>
</video>

#### Flutue o elemento video

O vídeo na janela de visualização estreita foi projetado para ocupar toda a largura da
tela e ser posicionado após a lista de principais recursos. Em uma janela de visualização larga,
o vídeo será ampliado demais e parecerá incorreto ao lado
da nossa lista de recursos.

O elemento video precisa ser removido do fluxo vertical da janela de visualização
estreita e deve ser exibido ao lado da lista de tópicos de conteúdo em uma janela de visualização larga.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/floatthevideo.html" region_tag="floatvideo" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/floatthevideo.html){: target="_blank" .external }

#### Organizar as imagens em blocos

<img src="images/imageswide.png" class="attempt-right">

As imagens na interface de janela de visualização estreita (dispositivos móveis, em sua maioria) são definidas para
ocupar toda a largura da tela e empilhadas verticalmente.  Essas imagens não são
dimensionadas corretamente em uma janela de visualização larga.

Para que as imagens fiquem adequadas em uma janela de visualização larga, elas são dimensionadas a 30%
da largura do contêiner e dispostas horizontalmente (em vez de verticalmente, como na
visualização estreita). Também adicionaremos raio de borda e box-shadow para que
as imagens fiquem mais atraentes.

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/tiletheimages.html" region_tag="tileimages" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/tiletheimages.html){: target="_blank" .external }

#### Tornar as imagens responsivas ao DPI

Ao usar imagens, leve em consideração o tamanho da janela de visualização
e a densidade da tela.

A Web foi feita para telas de 96 dpi.  Com a introdução dos dispositivos móveis,
observamos um aumento incrível da densidade de pixels das telas, sem falar nas
telas de classe Retina em laptops.  Dessa forma, imagens codificadas para 96 dpi
frequentemente ficam péssimas em um dispositivo de alto dpi.

Temos uma solução que ainda não foi amplamente adotada. Para navegadores compatíveis,
você pode exibir uma imagem de alta densidade em uma tela de alta densidade.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

#### Tabelas

É muito difícil de exibir tabelas corretamente em dispositivos que têm uma janela de visualização estreita e precisam de
consideração especial.

Para uma janela de visualização estreita, recomendamos que você transforme
cada linha da sua tabela em um bloco de pares de chave-valor (onde a chave é o elemento que
era o cabeçalho da coluna e o valor continua sendo o valor da célula).
Felizmente, essa não é uma tarefa difícil. Primeiro, anote cada elemento `td` com
o cabeçalho correspondente como um atributo de dados. (Isso não terá efeitos
visíveis até que adicionemos mais CSS.)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/updatingtablehtml.html" region_tag="table-tbody" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/updatingtablehtml.html){: target="_blank" .external }

Agora, basta adicionar o CSS para ocultar o `thead` original e
mostrar os rótulos `data-th` usando um pseudoelemento `:before`. Isso resultará na
experiência de vários dispositivos vista no vídeo a seguir.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Seu navegador não oferece suporte a vídeos.
     <a href="videos/responsivetable.mov">Faça download do vídeo</a>.
  </p>
</video>

No nosso site, precisamos criar um ponto de interrupção adicional apenas para o conteúdo da tabela.
Ao compilar para um dispositivo móvel primeiro, é mais difícil desfazer estilos aplicativos,
portanto, precisamos separar o CSS da tabela da janela de visualização estreita do CSS da janela de visualização larga.
Isso proporciona uma interrupção clara e consistente.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html){: target="_blank" .external }

## Conclusão

Success: Ao ler isto, você terá criado sua
primeira página de destino de produto simples que funciona em diversos tipos de dispositivos,
formatos e tamanhos de tela.

Se seguir essas diretrizes, você começará bem:

1. Crie a IA básica e entenda seu conceito antes de criar o código.
2. Sempre defina uma janela de visualização.
3. Cria sua experiência básica com uma abordagem que prioriza os dispositivos móveis.
4. Quando criar sua experiência de dispositivos móveis, aumente a largura da tela até que a aparência se degrade e defina seu ponto de interrupção nesse momento.
5. Continue iterando.


{# wf_devsite_translation #}
