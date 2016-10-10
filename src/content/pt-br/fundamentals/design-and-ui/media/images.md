project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Uma imagem vale por mil palavras, e as imagens desempenham uma função importante em todas as páginas. Mas elas muitas vezes também representam quase todos os bytes no carregamento da página.  Com o Web design responsivo, não só os layouts podem ser modificados com base nas características do dispositivo, como também as imagens.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Imagens {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Uma imagem vale por mil palavras, e as imagens desempenham uma função importante em todas as páginas. Mas elas muitas vezes também representam quase todos os bytes no carregamento da página.  Com o Web design responsivo, não só os layouts podem ser modificados com base nas características do dispositivo, como também as imagens.



### Imagens responsivas

O Web design responsivo significa que não somente os layouts podem ser modificados com base nas características do dispositivo, mas as imagens também.  Por exemplo, em telas de alta resolução (2x), é necessário usar imagens de alta resolução para garantir a nitidez.  Uma imagem com 50% de largura pode funcionar com eficácia quando o navegador tem 800 px de largura, mas usará um espaço excessivo em um telefone com tela estreita. Além disso, ela usará a mesma largura de banda quando for diminuída para caber em uma tela menor.

### Direção de arte

<img class="center" src="img/art-direction.png" alt="Exemplo de direção de arte"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Outras vezes, talvez seja necessário alterar a imagem de forma mais drástica: mudando as proporções, fazendo cortes e até mesmo substituindo toda a imagem.  Nesse caso, a alteração da imagem geralmente é denominada direção de arte.  Acesse [responsiveimages.org/demos/](http://responsiveimages.org/demos/){: .external } para ver mais exemplos.


{% include "web/_shared/udacity/ud882.html" %}

## Imagens na marcação


O elemento <code>img</code> tem grande utilidade: ele faz o download, decodifica e processa conteúdo. Além disso, os navegadores modernos são compatíveis com inúmeros formatos de imagem. A inclusão de imagens que funcionam em diversos dispositivos não é diferente da inclusão de imagens em computadores e requer apenas alguns ajustes para proporcionar uma experiência proveitosa.

### TL;DR {: .hide-from-toc }
- Use imagens com tamanhos relativos para impedir que elas transbordem o recipiente.
- Use o elemento <code>picture</code> para especificar diferentes imagens que respeitem as características do dispositivo (algo também conhecido como direção de arte).
- Use <code>srcset</code> e o descriptor <code>x</code> no elemento <code>img</code> para indicar ao navegador a imagem mais apropriada para uso quando for necessário escolher entre diferentes densidades.



### Use imagens com tamanhos relativos

Lembre-se de usar unidades relativas ao especificar a largura das imagens para impedir que elas transbordem da janela de visualização.  Por exemplo, a opção `width: 50%;` fará com que a largura da imagem seja definida em 50% do elemento que a contém (não especificamente a janela de visualização, nem o tamanho real do pixel).

Como o código CSS permite que o conteúdo transborde do recipiente, talvez seja necessário usar a função `max-width: 100%` para impedir que isso aconteça com imagens e outros conteúdos.  Por exemplo:


    img, embed, object, video {
      max-width: 100%;
    }
    

Forneça descrições relevantes usando o atributo `alt` em elementos `img`, já que elas ajudam a tornar seu site mais acessível ao fornecer contexto aos leitores de tela e a outras formas de tecnologia de assistência.

### Aprimore as imagens com `srcset` para dispositivos com DPI alto

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

O atributo <code>srcset</code> melhora o comportamento do elemento <code>img</code>, facilitando o fornecimento de diversos arquivos de imagem para dispositivos com características diferentes. Assim como a função <code>image-set</code> nativa do <a href="images-in-css.html#use-image-set-to-provide-high-res-images">código CSS</a>, o <code>srcset</code> permite ao navegador escolher a melhor imagem conforme as características do dispositivo, por exemplo, usando uma imagem 2x em uma tela 2x e, possivelmente no futuro, uma imagem 1x em um dispositivo 2x quando estiver em uma rede com largura de banda limitada.

<div class="clearfix"></div>

    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

Os navegadores incompatíveis com o `srcset` usam o arquivo de imagem padrão especificado pelo atributo `src`.  Por isso é importante sempre incluir uma imagem 1x que possa ser exibida em qualquer dispositivo, independentemente das funcionalidades.  Quando há suporte ao `srcset`, a lista separada por vírgulas de imagens/condições é analisada antes de qualquer solicitação, e somente a imagem mais apropriada é exibida após o download.

Embora as condições possam incluir informações como densidade dos pixels e largura e altura, somente a densidade dos pixels é amplamente aceita hoje.  Para equilibrar o comportamento atual com recursos futuros, continue fornecendo a imagem 2x no atributo.

### Direção de arte em imagens responsivas com o elemento `picture`

A mudança de imagens a partir das características do dispositivo, um recurso também conhecido como direção de arte, pode ser alcançada pelo uso do elemento `picture`.  O elemento <code>picture</code> define uma solução informativa para fornecer diversas versões de uma imagem com base em diferentes características, como tamanho e resolução do dispositivo, orientação e outras.

<img class="center" src="img/art-direction.png" alt="Exemplo de direção de arte"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Note: O elemento <code>picture</code> começou recentemente a ser usado nos navegadores. Embora ele ainda não esteja disponível em todos os navegadores, recomendamos seu uso por causa da eficiente compatibilidade com versões anteriores e o possível uso do <a href='http://picturefill.responsiveimages.org/'>preenchimento Picturefill</a>. Consulte o site <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a> para saber mais detalhes.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

O elemento <code>picture</code> deve ser usado quando a fonte de uma imagem existe em diversas densidades, ou quando um design ágil orienta a aplicação de uma imagem levemente diferente em alguns tipos de telas.  Assim como o elemento <code>video</code>, diversos elementos<code>source</code> podem ser incluídos, possibilitando a especificação de diferentes arquivos de imagem conforme as consultas de mídia ou o formato da imagem.
<div class="clearfix"></div>


<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ui/media/_code/media.html" region_tag="picture" %}
</pre>

No exemplo acima, se a largura do navegador for pelo menos 800 px, tanto a imagem `head.jpg` quanto a imagem `head-2x.jpg` podem ser usadas, dependendo da resolução do dispositivo. Se a largura do navegador tiver entre 450 e 800 px, as imagens `head-small.jpg` ou `head-small-2x.jpg` poderão ser usadas, novamente dependendo da resolução do dispositivo. Para larguras de tela com menos de 450 px e em caso de compatibilidade com versões anteriores em que o elemento `picture` não é aceito, o navegador processará o elemento `img`, que sempre deve ser incluído.

#### Imagens com tamanhos relativos

Quando o tamanho final da imagem não é conhecido, pode ser difícil especificar um descriptor de densidade para as fontes de imagem.  Isso ocorre especialmente com imagens que ocupam uma largura proporcional do navegador e são fluidas, dependendo do tamanho do navegador.

Em vez de fornecer imagens com tamanhos e densidades fixos, o tamanho de cada imagem fornecida deve ser especificado. Para isso, é necessário adicionar um descriptor de largura junto com o tamanho do elemento de imagem, permitindo ao navegador calcular automaticamente a densidade efetiva de pixels e escolher a imagem mais adequada para fazer o download.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ui/media/_code/sizes.html" region_tag="picture" %}
</pre>

No exemplo acima, é processada uma imagem com metade da largura da janela de visualização (sizes=`50vw`) e, dependendo da largura do navegador e da proporção de pixels do dispositivo, o navegador poderá escolher a imagem mais adequada sem levar em consideração o tamanho da janela do navegador.  Por exemplo, a tabela abaixo mostra qual imagem o navegador escolherá:

<table>
    <thead>
    <tr>
      <th data-th="Largura do navegador">Largura do navegador</th>
      <th data-th="Proporção de pixels do dispositivo">Proporção de pixels do dispositivo</th>
      <th data-th="Imagem usada">Imagem usada</th>
      <th data-th="Resolução efetiva">Resolução efetiva</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Largura do navegador">400 px</td>
      <td data-th="Proporção de pixels do dispositivo">1</td>
      <td data-th="Imagem usada"><code>200.png</code></td>
      <td data-th="Resolução efetiva">1x</td>
    </tr>
    <tr>
      <td data-th="Largura do navegador">400 px</td>
      <td data-th="Proporção de pixels do dispositivo">2</td>
      <td data-th="Imagem usada"><code>400.png</code></td>
      <td data-th="Resolução efetiva">2x</td>
    </tr>
    <tr>
      <td data-th="Largura do navegador">320 px</td>
      <td data-th="Proporção de pixels do dispositivo">2</td>
      <td data-th="Imagem usada"><code>400.png</code></td>
      <td data-th="Resolução efetiva">2,5x</td>
    </tr>
    <tr>
      <td data-th="Largura do navegador">600 px</td>
      <td data-th="Proporção de pixels do dispositivo">2</td>
      <td data-th="Imagem usada"><code>800.png</code></td>
      <td data-th="Resolução efetiva">2,67x</td>
    </tr>
    <tr>
      <td data-th="Largura do navegador">640 px</td>
      <td data-th="Proporção de pixels do dispositivo">3</td>
      <td data-th="Imagem usada"><code>1000.png</code></td>
      <td data-th="Resolução efetiva">3,125x</td>
    </tr>
    <tr>
      <td data-th="Largura do navegador">1100 px</td>
      <td data-th="Proporção de pixels do dispositivo">1</td>
      <td data-th="Imagem usada"><code>1400.png</code></td>
      <td data-th="Resolução efetiva">1,27x</td>
    </tr>
  </tbody>
</table>


#### Uso de pontos de quebra em imagens responsivas

Em muitos casos, o tamanho da imagem pode ser modificado, dependendo dos pontos de quebra do layout do site.  Por exemplo, em uma tela pequena, a imagem pode ocupar toda a largura da janela de visualização, enquanto em telas maiores ela ocupará somente uma parte.  

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ui/media/_code/breakpoints.html" region_tag="picture" %}
</pre>

O atributo `sizes` no exemplo acima usa diversas consultas de mídia para especificar o tamanho da imagem.  Quando a largura do navegador for maior que 600 px, a imagem terá 25% da largura da janela de visualização. Quando a largura tiver entre 550 e 600 px, a imagem terá 50% da janela, e, para navegadores com menos de 500 px, a imagem ocupará toda a janela.


### Torne as imagens de produtos expansíveis

Os clientes querem ver o que estão comprando.  Nos sites de varejo, os usuários esperam ver imagens em alta resolução dos produtos para poder analisar os detalhes. Quando isso não foi possível, os [participantes de um estudo](/web/fundamentals/principles/research-study.html) ficaram frustrados.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Site da J. Crew com imagem expansível de produto">
  <figcaption>Site da J. Crew com imagem expansível de produto.</figcaption>
</figure>

Um bom exemplo de imagens que podem ser tocadas e expandidas é fornecido pelo site da J. Crew. Uma sobreposição transparente indica que uma imagem pode ser tocada, fornecendo uma imagem em zoom com detalhes visíveis do produto.


### Outras técnicas de manuseio de imagens

#### Imagens compactadas

A [técnica de compactação
de imagens](http://www.html5rocks.com/pt-BR/mobile/high-dpi/#toc-tech-overview) veicula uma imagem 2x altamente compactada em todos os dispositivos, independentemente dos recursos que eles oferecem.  Dependendo do tipo de imagem e nível de compactação, a qualidade da imagem pode não mudar, mas o tamanho do arquivo diminui sensivelmente.

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/images/compressive.html">Ver o exemplo</a>

Note: Tenha cuidado com a técnica de compactação por causa dos altos custos associados de memória e decodificação.  O redimensionamento de grandes imagens para adequação a telas menores custa caro e pode se tornar uma tarefa difícil em dispositivos mais antigos, cuja memória e capacidade de processamento são reduzidas.

#### Substituição de imagem JavaScript

A substituição de imagens JavaScript analisa as funcionalidades do dispositivo e `toma a medida correta`. É possível determinar a proporção de pixels do dispositivo por meio da função `window.devicePixelRatio`, descobrir a largura e a altura da tela e até mesmo resolver problemas de conexão de rede por meio do atributo `navigator.connection` ou emitir uma solicitação falsa. Depois de coletar todas essas informações, você decide que imagem deve ser carregada.

Uma desvantagem dessa abordagem é que o uso de JavaScript indica que você retardará o carregamento da imagem até que o analisador antecipado conclua seu trabalho. Com isso, não será feito o download das imagens até que o evento `pageload` seja acionado. Além disso, o navegador provavelmente fará o download das imagens 1x e 2x, resultando em uma página mais pesada.


## Imagens no código CSS

A propriedade `background` do CSS é uma ferramenta muito utilizada para adicionar imagens complexas aos elementos, permitindo adicionar múltiplas imagens, fazer com que elas sejam repetidas e muito mais.  Quando usada em combinação com as consultas de mídia, a propriedade `background` se torna ainda mais útil, permitindo o carregamento condicional de imagens baseado em resolução da tela, tamanho da janela de visualização e outros.


### TL;DR {: .hide-from-toc }
- Use a imagem mais indicada de acordo com as características de exibição, considerando o tamanho da tela, a resolução do dispositivo e o layout da página.
- Altere a propriedade <code>background-image</code> no CSS para telas com alto DPI usando consultas de mídia com <code>min-resolution</code> e <code>-webkit-min-device-pixel-ratio</code>.
- Use <code>srcset</code> para fornecer imagens de alta resolução junto com a imagem de 1x na marcação.
- Considere os custos de desempenho ao usar técnicas de substituição de imagem JavaScript ou ao veicular imagens de alta resolução fortemente compactadas em dispositivos com resoluções inferiores.


### Use as consultas de mídia no carregamento condicional de imagens ou na direção de arte

As consultas de mídia não apenas afetam o layout da página, como também podem ser usadas para carregar imagens de forma condicional e fornecer direção de arte, dependendo da largura da janela de visualização.

No exemplo abaixo, foi feito o download de `small.png` e foi aplicado o `div` de conteúdo nas telas menores, enquanto nas telas maiores, `background-image: url(body.png)` foi aplicado ao corpo da página e `background-image: url(large.png)` foi aplicado ao `div` de conteúdo.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ui/media/_code/conditional-mq.html" region_tag="conditional" %}
</pre>

### Use a função `image-set` para fornecer imagens de alta resolução

A função `image-set()` no código CSS aprimora a propriedade de comportamento `background`, facilitando o fornecimento de diversos arquivos de imagem para as diferentes características dos dispositivos.  Com isso, o navegador pode escolher a imagem mais apropriada conforme as características do dispositivo, por exemplo, ao usar uma imagem 2x em uma tela 2x ou uma imagem 1x em uma tela 2x quando estiver em uma rede com largura de banda limitada.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

Além de carregar a imagem correta, o navegador também pode redimensioná-la
corretamente. Em outras palavras, o navegador considera que as imagens 2x são duas vezes maiores que as imagens 1x e, portanto, diminuirá o tamanho da imagem 2x em um fator dois para que essa imagem tenha o mesmo tamanho na página.

O suporte à função `image-set()` ainda é recente, sendo oferecido apenas no Google Chrome e no Safari com o prefixo de fornecedor `-webkit`.  Também é necessário ter cuidado ao incluir uma imagem de substituição para quando o recurso `image-set()` não for compatível, por exemplo:

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ui/media/_code/image-set.html" region_tag="imageset" %}
</pre>

No exemplo acima, o recurso apropriado será carregado nos navegadores que oferecem suporte ao `image-set`. Nos outros, a imagem 1x substituta será usada. A limitação óbvia é que enquanto a função `image-set()` não for amplamente aceita pelos navegadores, a maioria deles usará a imagem 1x.

### Use as consultas de mídia para fornecer imagens de alta resolução ou direção de arte

As consultas de mídia podem criar regras com base na [proporção de pixels do dispositivo](http://www.html5rocks.com/pt-BR/mobile/high-dpi/#toc-bg), possibilitando a especificação de diferentes imagens em telas 2x e 1x.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Google Chrome, Firefox e Opera oferecem suporte ao padrão `(min-resolution: 2dppx)`, mas o Safari e o Android exigem a sintaxe antiga com prefixo do fornecedor sem a unidade `dppx`.  Lembre-se, esses estilos só serão carregados se o dispositivo corresponder à consulta de mídia, sendo necessário especificar os estilos básicos.  Com isso, também existe o benefício de garantir que haverá uma imagem para ser processada no caso de o navegador não fornecer suporte a consultas de mídia para resoluções específicas.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ui/media/_code/media-query-dppx.html" region_tag="mqdppx" %}
</pre>

Também é possível usar a sintaxe `min-width` para exibir imagens alternativas, dependendo do tamanho da janela de visualização.  Essa técnica apresenta a vantagem de que o download da imagem só será feito se a consulta de mídia for correspondida.  Por exemplo, o download e a aplicação de `bg.png` ao corpo da página só serão realizados se a largura do navegador tiver 500 px ou mais:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
      

## Use SVG nos ícones

Ao adicionar ícones em sua página, use ícones vetoriais (SVG, na sigla em inglês) sempre que possível ou, em alguns casos, use caracteres unicode.




### TL;DR {: .hide-from-toc }
- Use caracteres SVG ou unicode nos ícones, em vez de imagens de varredura.


### Substitua os ícones de varredura por caracteres unicode

Muitas fontes incluem suporte para a grande variedade de caracteres unicode, que podem ser usados no lugar das imagens.  Ao contrário das imagens, as fontes unicode não apresentam problemas ao ser redimensionadas e mantêm uma boa aparência mesmo quando aparecem ampliadas ou diminuídas na tela.

Além do conjunto normal de caracteres, o formato unicode pode incluir símbolos para formas de números (&#8528;), setas (&#8592;), sinais matemáticos (&#8730;), formatos geométricos (&#9733;), imagens de controle (&#9654;), padrões de braile (&#10255;), notação musical (&#9836;), alfabeto grego (&#937;) e até mesmo peças de xadrez (&#9822;).

A inclusão de um caractere unicode é feita da mesma forma que as entidades nomeadas:`&#XXXX`, em que `XXXX` representa o número do caractere unicode.  Por exemplo:


    Você é uma &#9733;
    

Você é uma &#9733;

### Substitua os ícones complexos por SVG
Os ícones SVG geralmente são leves, fáceis de usar e podem ser usados em estilos com CSS, por isso, são mais indicados quando é necessário usar ícones mais complexos. Os caracteres SVG oferecem inúmeras vantagens sobre as imagens de varredura:

* São imagens vetoriais que podem ser redimensionadas infinitamente.
* Efeitos de CSS como cores, sombreamento, transparência e animações são simplificados.
* As imagens SVG podem ser inseridas in-line diretamente no documento.
* São semânticos.
* Fornecem melhor acessibilidade com os atributos apropriados.



<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ui/media/_code/icon-svg.html" region_tag="iconsvg" %}
</pre>

### Use fontes de ícones com cuidado

As fontes de ícones são populares e de fácil utilização, mas apresentam algumas desvantagens em relação aos ícones SVG.

* São imagens vetoriais que podem ser redimensionadas infinitamente, mas também podem apresentar antisserrilhamento e gerar ícones que não têm a nitidez esperada.
* Possibilidades limitadas de uso em estilos CSS.
* O posicionamento perfeito dos pixels pode ser difícil, dependendo da altura da linha, do espaçamento entre as letras etc.
* Não são semânticos e podem ser difíceis de usar com leitores de tela ou outras formas de tecnologia de assistência.
* Quando não são configurados corretamente, o simples uso de um pequeno subconjunto dos ícones disponíveis pode gerar um grande arquivo. 



<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Exemplo de página que usa FontAwesome para os ícones de fontes.">

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ui/media/_code/icon-font.html" region_tag="iconfont" %}
</pre>

Existem centenas de fontes de ícones disponíveis, tanto gratuitos quanto pagos, incluindo [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [Pictos](http://pictos.cc/){: .external } e [Glyphicons](http://glyphicons.com/).

Não se esqueça de equilibrar a necessidade de usar os ícones com o peso da solicitação adicional de HTTP e o tamanho do arquivo.  Por exemplo, se você precisar apenas de alguns ícones, pode ser mais indicado usar uma imagem ou um painel de imagens.


## Otimizar imagens para aprimorar o desempenho

As imagens geralmente representam a maioria dos bytes do download de uma página e com frequência ocupam uma parte significativa do espaço visualizado nela. Com isso, a otimização das imagens pode proporcionar uma das melhores formas de economia de bytes e aprimoramento de desempenho para os sites: quanto menor o número de bytes no download do navegador, menos concorrência haverá pela largura de banda do cliente e mais rápido será feito o download pelo navegador para exibir todo o conteúdo da página.


### TL;DR {: .hide-from-toc }
- Não escolha um formato de imagem de forma aleatória, procure conhecer os diferentes formatos disponíveis e use o mais indicado para seu caso.
- Inclua ferramentas de otimização e compactação de imagem no fluxo de trabalho para reduzir o tamanho dos arquivos.
- Coloque as imagens usadas com maior frequência em conjuntos de imagens (sprites) para reduzir o número de solicitações http.
- Considere carregar as imagens somente quando o local da página em que elas se encontram for visualizado, reduzindo assim o tempo de carregamento inicial da página.


### Escolha o formato apropriado

Existem dois tipos de imagem a ser considerados: [imagens vetoriais](http://pt.wikipedia.org/wiki/Desenho_vetorial) e [imagens de varredura](http://pt.wikipedia.org/wiki/Raster). Para as imagens de varredura, talvez seja necessário escolher também o formato adequado de compactação, por exemplo, GIF, PNG e JPG.

As **imagens de varredura**, como fotografias e outras imagens, são representadas como uma grade de pontos ou pixels individuais. As imagens de varredura geralmente são originadas em câmeras ou digitalizadores (scanners) e também podem ser criadas no navegador com o elemento `canvas`.  À medida que o tamanho da imagem é ampliado, o tamanho do arquivo também é.  Quando dimensionadas para um tamanho maior que o original, as imagens de varredura ficam borradas porque o navegador não sabe como preencher os pixels ausentes.

As **imagens vetoriais`, como logotipos e desenhos lineares, são definidas por um conjunto de curvas, linhas, formas e cores de preenchimento. Essas imagens são criadas com programas como o Adobe Illustrator ou o Inkscape e salvas em formato vetorial, como [`SVG`](http://css-tricks.com/using-svg/).  Como as imagens vetoriais são criadas em arquivos primitivos simples, elas podem ser redimensionadas sem qualquer perda de qualidade e sem mudança no tamanho do arquivo.

Ao escolher o formato mais indicado, é importante considerar a origem da imagem (de varredura ou vetorial) e o conteúdo (cores, animação, texto etc.). Nenhum formato se ajustará a todos os tipos de imagem, e cada um tem suas próprias vantagens e desvantagens.

Siga estas diretrizes ao escolher o formato mais apropriado:

* Use JPG para imagens fotográficas.
* Use SVG para desenhos vetoriais e imagens com cores sólidas, como logotipos e desenhos lineares.
  Se o formato vetorial não estiver disponível, use WebP ou PNG.
* Use PNG em vez de GIF, já que o formato PNG permite mais cores e oferece taxas de compactação melhores.
* Para animações mais longas, considere o uso do atributo `<video>`, que fornece uma qualidade de imagem superior e permite ao usuário controlar a reprodução.

### Reduza o tamanho do arquivo

O tamanho do arquivo de imagem pode ser reduzido consideravelmente. Para isso, é necessário realizar um processo de `pós-processamento` após salvar o arquivo. Existem inúmeras ferramentas que comprimem imagens: compactação com e sem perdas, on-line, GUI, linha de comando etc.  Sempre que possível, é mais indicado tentar automatizar a otimização de imagens para garantir a qualidade desse processo no fluxo de trabalho.

Diversas ferramentas estão disponíveis para realizar uma compactação mais detalhada e sem perdas em arquivos JPG e PNG que não prejudicará a qualidade da imagem. Para imagens JPG, use [jpegtran](http://jpegclub.org/){: .external } ou [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (disponível somente para Linux, deve ser executado com a opção `strip-all`). Para arquivos PNG, use [OptiPNG](http://optipng.sourceforge.net/) ou [PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

### Use painéis de imagens (sprites)

O código CSS oferece uma técnica pela qual diversas imagens são combinadas em uma única imagem, formando um `painel de imagens`, também chamado de `sprite sheet`. Em seguida, as imagens individuais podem ser usadas. Para isso, é especificada a imagem de segundo plano de um elemento (o painel de imagens) e um ajuste é feito para exibir a parte correta da imagem.

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/images/image-sprite.html"><img src="img/sprite-sheet.png" class="center" alt=" Painel de imagens usado no exemplo"></a>

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ui/media/_code/image-sprite.html" region_tag="sprite" %}
</pre>

O uso do painel de imagens (`spriting`) oferece a vantagem de reduzir o número de downloads necessários para exibir diversas imagens enquanto mantém o armazenamento em cache.

### Considere o carregamento ocioso

O carregamento ocioso exibe as imagens abaixo da dobra conforme o necessário ou após o carregamento e o processamento do conteúdo principal, podendo acelerar consideravelmente a exibição de páginas longas. Além das melhorias de desempenho, o uso do carregamento ocioso pode criar experiências de rolagem de página infinitas.

Tenha cuidado ao criar páginas com rolagem infinita. Como o conteúdo é carregado à medida que se torna visível, os mecanismos de pesquisa podem não localizar esse conteúdo.  Além disso, os usuários que procuram informações localizadas no rodapé da página nunca as encontrarão, pois sempre haverá novos conteúdos sendo carregados.


## Evite imagens de todas as formas


Às vezes, a melhor imagem é a ausência de imagens. Sempre que possível, use as funcionalidades nativas do navegador para fornecer uma funcionalidade igual ou similar.  Os navegadores geram informações visuais que antigamente exigiam imagens. Isso significa que os navegadores não precisam mais fazer o download separado dos arquivos de imagem, evitando o redimensionamento incorreto das imagens.  Os ícones podem ser processados usando unicode ou fontes especiais para ícones.





### Coloque o texto na marcação em vez de incorporá-lo às imagens

Sempre que possível, o texto deve ser formatado como texto, não devendo ser incorporado nas imagens, como ao usar imagens em cabeçalhos ou colocar informações de contato (como números de telefone ou endereços) diretamente em uma imagem.  Com isso, as pessoas não conseguem copiar e colar as informações, tornando-as inacessíveis aos leitores de tela, e o site deixa de ser responsivo.  Em vez disso, coloque o texto na marcação e, se necessário, use fontes da Web para conseguir o estilo que você busca.

### Use CSS para substituir imagens

Os navegadores modernos podem usar recursos de CSS para criar estilos que anteriormente exigiam imagens.  Por exemplo, gradientes complexos podem ser criados usando a propriedade <code>background</code>, sombras podem ser criadas usando <code>box-shadow</code> e cantos arredondados podem ser adicionados com a propriedade <code>border-radius</code>.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

Lembre-se de que o uso dessas técnicas não requer ciclos de processamento, algo que pode ser importante em dispositivos móveis.  Se houver uso excessivo desses recursos, você perderá os benefícios conquistados e poderá prejudicar o desempenho do site.



