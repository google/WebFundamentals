---
title: "Imagens na marcação"
description: "O elemento `img` tem grande utilidade: ele faz o download, decodifica e processa conteúdo. Além disso, os navegadores modernos são compatíveis com inúmeros formatos de imagem."
updated_on: 2014-09-30
key-takeaways:
  img-in-markup:
    - "Use imagens com tamanhos relativos para impedir que elas transbordem o recipiente."
    - "Use o elemento <code>picture</code> para especificar diferentes imagens que respeitem as características do dispositivo (algo também conhecido como direção de arte)."
    - "Use <code>srcset</code> e o descriptor <code>x</code> no elemento <code>img</code> para indicar ao navegador a imagem mais apropriada para uso quando for necessário escolher entre diferentes densidades."
notes:
  picture-support:
    - "O elemento <code>picture</code> começou recentemente a ser usado nos navegadores. Embora ele ainda não esteja disponível em todos os navegadores, recomendamos seu uso por causa da eficiente compatibilidade com versões anteriores e o possível uso do <a href='http://picturefill.responsiveimages.org/'>preenchimento Picturefill</a>. Consulte o site <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a> para saber mais detalhes."
  compressive:
    - "Tenha cuidado com a técnica de compactação por causa dos altos custos associados de memória e decodificação.  O redimensionamento de grandes imagens para adequação a telas menores custa caro e pode se tornar uma tarefa difícil em dispositivos mais antigos, cuja memória e capacidade de processamento são reduzidas."
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple21
---

<p class="intro">
  O elemento <code>img</code> tem grande utilidade: ele faz o download, decodifica e processa conteúdo. Além disso, os navegadores modernos são compatíveis com inúmeros formatos de imagem. A inclusão de imagens que funcionam em diversos dispositivos não é diferente da inclusão de imagens em computadores e requer apenas alguns ajustes para proporcionar uma experiência proveitosa.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.img-in-markup %}


## Use imagens com tamanhos relativos

Lembre-se de usar unidades relativas ao especificar a largura das imagens para impedir que elas transbordem da janela de visualização.  Por exemplo, a opção `width: 50%;` fará com que a largura da imagem seja definida em 50% do elemento que a contém (não especificamente a janela de visualização, nem o tamanho real do pixel).

Como o código CSS permite que o conteúdo transborde do recipiente, talvez seja necessário usar a função `max-width: 100%` para impedir que isso aconteça com imagens e outros conteúdos.  Por exemplo:

{% highlight css %}
img, embed, object, video {
  max-width: 100%;
}
{% endhighlight %}

Forneça descrições relevantes usando o atributo `alt` em elementos `img`, já que elas ajudam a tornar seu site mais acessível ao fornecer contexto aos leitores de tela e a outras formas de tecnologia de assistência.

## Aprimore as imagens com `srcset` para dispositivos com DPI alto

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      O atributo <code>srcset</code> melhora o comportamento do elemento <code>img</code>, facilitando o fornecimento de diversos arquivos de imagem para dispositivos com características diferentes. Assim como a função <code>image-set</code> nativa do <a href="images-in-css.html#use-image-set-to-provide-high-res-images">código CSS</a>, o <code>srcset</code> permite ao navegador escolher a melhor imagem conforme as características do dispositivo, por exemplo, usando uma imagem 2x em uma tela 2x e, possivelmente no futuro, uma imagem 1x em um dispositivo 2x quando estiver em uma rede com largura de banda limitada.
    </p>
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo Pzc5Dly_jEM %}
  </div>
</div>

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
{% endhighlight %}

Os navegadores incompatíveis com o `srcset` usam o arquivo de imagem padrão especificado pelo atributo `src`.  Por isso é importante sempre incluir uma imagem 1x que possa ser exibida em qualquer dispositivo, independentemente das funcionalidades.  Quando há suporte ao `srcset`, a lista separada por vírgulas de imagens/condições é analisada antes de qualquer solicitação, e somente a imagem mais apropriada é exibida após o download.

Embora as condições possam incluir informações como densidade dos pixels e largura e altura, somente a densidade dos pixels é amplamente aceita hoje.  Para equilibrar o comportamento atual com recursos futuros, continue fornecendo a imagem 2x no atributo.

## Direção de arte em imagens responsivas com o elemento `picture`

A mudança de imagens a partir das características do dispositivo, um recurso também conhecido como direção de arte, pode ser alcançada pelo uso do elemento `picture`.  O elemento <code>picture</code> define uma solução informativa para fornecer diversas versões de uma imagem com base em diferentes características, como tamanho e resolução do dispositivo, orientação e outras.

<img class="center" src="img/art-direction.png" alt="Exemplo de direção de arte"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include shared/remember.liquid title="Important" list=page.notes.picture-support %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      O elemento <code>picture</code> deve ser usado quando a fonte de uma imagem existe em diversas densidades, ou quando um design ágil orienta a aplicação de uma imagem levemente diferente em alguns tipos de telas.  Assim como o elemento <code>video</code>, diversos elementos<code>source</code> podem ser incluídos, possibilitando a especificação de diferentes arquivos de imagem conforme as consultas de mídia ou o formato da imagem.
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo QINlm3vjnaY %}
  </div>
</div>

{% include_code src=_code/media.html snippet=picture lang=html %}

No exemplo acima, se a largura do navegador for pelo menos 800 px, tanto a imagem `head.jpg` quanto a imagem `head-2x.jpg` podem ser usadas, dependendo da resolução do dispositivo. Se a largura do navegador tiver entre 450 e 800 px, as imagens `head-small.jpg` ou `head-small-2x.jpg` poderão ser usadas, novamente dependendo da resolução do dispositivo. Para larguras de tela com menos de 450 px e em caso de compatibilidade com versões anteriores em que o elemento `picture` não é aceito, o navegador processará o elemento `img`, que sempre deve ser incluído.

### Imagens com tamanhos relativos

Quando o tamanho final da imagem não é conhecido, pode ser difícil especificar um descriptor de densidade para as fontes de imagem.  Isso ocorre especialmente com imagens que ocupam uma largura proporcional do navegador e são fluidas, dependendo do tamanho do navegador.

Em vez de fornecer imagens com tamanhos e densidades fixos, o tamanho de cada imagem fornecida deve ser especificado. Para isso, é necessário adicionar um descriptor de largura junto com o tamanho do elemento de imagem, permitindo ao navegador calcular automaticamente a densidade efetiva de pixels e escolher a imagem mais adequada para fazer o download.

{% include_code src=_code/sizes.html snippet=picture lang=html %}

No exemplo acima, é processada uma imagem com metade da largura da janela de visualização (sizes=`50vw`) e, dependendo da largura do navegador e da proporção de pixels do dispositivo, o navegador poderá escolher a imagem mais adequada sem levar em consideração o tamanho da janela do navegador.  Por exemplo, a tabela abaixo mostra qual imagem o navegador escolherá:

<table class="mdl-data-table mdl-js-data-table">
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


### Uso de pontos de quebra em imagens responsivas

Em muitos casos, o tamanho da imagem pode ser modificado, dependendo dos pontos de quebra do layout do site.  Por exemplo, em uma tela pequena, a imagem pode ocupar toda a largura da janela de visualização, enquanto em telas maiores ela ocupará somente uma parte.  

{% include_code src=_code/breakpoints.html snippet=picture lang=html %}

O atributo `sizes` no exemplo acima usa diversas consultas de mídia para especificar o tamanho da imagem.  Quando a largura do navegador for maior que 600 px, a imagem terá 25% da largura da janela de visualização. Quando a largura tiver entre 550 e 600 px, a imagem terá 50% da janela, e, para navegadores com menos de 500 px, a imagem ocupará toda a janela.


## Torne as imagens de produtos expansíveis

Os clientes querem ver o que estão comprando.  Nos sites de varejo, os usuários esperam ver imagens em alta resolução dos produtos para poder analisar os detalhes. Quando isso não foi possível, os [participantes de um estudo](/web/fundamentals/principles/research-study.html) ficaram frustrados.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Site da J. Crew com imagem expansível de produto">
  <figcaption>Site da J. Crew com imagem expansível de produto.</figcaption>
</figure>

Um bom exemplo de imagens que podem ser tocadas e expandidas é fornecido pelo site da J. Crew. Uma sobreposição transparente indica que uma imagem pode ser tocada, fornecendo uma imagem em zoom com detalhes visíveis do produto.


## Outras técnicas de manuseio de imagens

### Imagens compactadas

A [técnica de compactação
de imagens](http://www.html5rocks.com/pt-BR/mobile/high-dpi/#toc-tech-overview) veicula uma imagem 2x altamente compactada em todos os dispositivos, independentemente dos recursos que eles oferecem.  Dependendo do tipo de imagem e nível de compactação, a qualidade da imagem pode não mudar, mas o tamanho do arquivo diminui sensivelmente.

{% link_sample _code/compressive.html %}
Ver o exemplo
{% endlink_sample %}

{% include shared/remember.liquid title="Important" list=page.remember.compressive %}

###Substituição de imagem JavaScript

A substituição de imagens JavaScript analisa as funcionalidades do dispositivo e `toma a medida correta`. É possível determinar a proporção de pixels do dispositivo por meio da função `window.devicePixelRatio`, descobrir a largura e a altura da tela e até mesmo resolver problemas de conexão de rede por meio do atributo `navigator.connection` ou emitir uma solicitação falsa. Depois de coletar todas essas informações, você decide que imagem deve ser carregada.

Uma desvantagem dessa abordagem é que o uso de JavaScript indica que você retardará o carregamento da imagem até que o analisador antecipado conclua seu trabalho. Com isso, não será feito o download das imagens até que o evento `pageload` seja acionado. Além disso, o navegador provavelmente fará o download das imagens 1x e 2x, resultando em uma página mais pesada.



