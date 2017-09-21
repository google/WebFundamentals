project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Uma imagem vale 1.000 palavras e as imagens têm um papel essencial em todas as páginas. No entanto, elas frequentemente também representam a maior parte dos bytes baixados.  Com um Web design responsivo, não só seus layouts podem ser alterados com base nas características do dispositivo, mas as imagens também.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-29 #}

# Imagens {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


Um Web design responsivo significa que não só seus layouts podem ser alterados com base nas características
do dispositivo, mas o conteúdo também.  Por exemplo, em telas de alta resolução (2x),
gráficos de alta resolução garantem a nitidez. Uma imagem
com 50% de largura pode ficar boa em um navegador com 800 pixels de largura, mas
ocupará muito espaço em um celular mais estreito, utilizando a mesma
largura de banda quando reduzida para caber em uma tela menor.

## Direção de arte

<img src="img/art-direction.png" alt="Exemplo de direção de arte"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Outras imagens podem precisar de alterações mais significativas: alteração de
proporções, cortes e até mesmo a substituição de toda a imagem.  Nesse caso,
a alteração da imagem é normalmente chamada de direção de arte.  Consulte
[responsiveimages.org/demos/](https://responsiveimages.org/demos/){: .external } para obter mais
exemplos.

{% include "web/_shared/udacity/ud882.html" %}

## Imagens na marcação

<style>
  .side-by-side {
    display: inline-block;
    margin: 0 20px 0 0;
    width: 45%;
  }

  span#data_uri {
    background: url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2016.0.0%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%22396.74px%22%20height%3D%22560px%22%20viewBox%3D%22281.63%200%20396.74%20560%22%20enable-background%3D%22new%20281.63%200%20396.74%20560%22%20xml%3Aspace%3D%22preserve%22%0D%0A%09%3E%0D%0A%3Cg%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cg%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23E44D26%22%20points%3D%22409.737%2C242.502%20414.276%2C293.362%20479.828%2C293.362%20480%2C293.362%20480%2C242.502%20479.828%2C242.502%20%09%09%09%0D%0A%09%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23E44D26%22%20d%3D%22M281.63%2C110.053l36.106%2C404.968L479.757%2C560l162.47-45.042l36.144-404.905H281.63z%20M611.283%2C489.176%0D%0A%09%09%09%09L480%2C525.572V474.03l-0.229%2C0.063L378.031%2C445.85l-6.958-77.985h22.98h26.879l3.536%2C39.612l55.315%2C14.937l0.046-0.013v-0.004%0D%0A%09%09%09%09L480%2C422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283%2C489.176z%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23F16529%22%20points%3D%22480%2C192.833%20604.247%2C192.833%20603.059%2C206.159%20600.796%2C231.338%20599.8%2C242.502%20599.64%2C242.502%20%0D%0A%09%09%09%09480%2C242.502%20480%2C293.362%20581.896%2C293.362%20595.28%2C293.362%20594.068%2C306.699%20582.396%2C437.458%20581.649%2C445.85%20480%2C474.021%20%0D%0A%09%09%09%09480%2C474.03%20480%2C525.572%20611.283%2C489.176%20642.17%2C143.166%20480%2C143.166%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23F16529%22%20points%3D%22540.988%2C343.029%20480%2C343.029%20480%2C422.35%20535.224%2C407.445%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23EBEBEB%22%20points%3D%22414.276%2C293.362%20409.737%2C242.502%20479.828%2C242.502%20479.828%2C242.38%20479.828%2C223.682%20%0D%0A%09%09%09%09479.828%2C192.833%20355.457%2C192.833%20356.646%2C206.159%20368.853%2C343.029%20479.828%2C343.029%20479.828%2C293.362%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23EBEBEB%22%20points%3D%22479.828%2C474.069%20479.828%2C422.4%20479.782%2C422.413%20424.467%2C407.477%20420.931%2C367.864%20%0D%0A%09%09%09%09394.052%2C367.864%20371.072%2C367.864%20378.031%2C445.85%20479.771%2C474.094%20480%2C474.03%20480%2C474.021%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22343.784%2C50.229%20366.874%2C50.229%20366.874%2C75.517%20392.114%2C75.517%20392.114%2C0%20366.873%2C0%20366.873%2C24.938%20%0D%0A%09%09%09%09343.783%2C24.938%20343.783%2C0%20318.544%2C0%20318.544%2C75.517%20343.784%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22425.307%2C25.042%20425.307%2C75.517%20450.549%2C75.517%20450.549%2C25.042%20472.779%2C25.042%20472.779%2C0%20403.085%2C0%20%0D%0A%09%09%09%09403.085%2C25.042%20425.306%2C25.042%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22508.537%2C38.086%20525.914%2C64.937%20526.349%2C64.937%20543.714%2C38.086%20543.714%2C75.517%20568.851%2C75.517%20568.851%2C0%20%0D%0A%09%09%09%09542.522%2C0%20526.349%2C26.534%20510.159%2C0%20483.84%2C0%20483.84%2C75.517%20508.537%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22642.156%2C50.555%20606.66%2C50.555%20606.66%2C0%20581.412%2C0%20581.412%2C75.517%20642.156%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%22480%2C474.021%20581.649%2C445.85%20582.396%2C437.458%20594.068%2C306.699%20595.28%2C293.362%20581.896%2C293.362%20%0D%0A%09%09%09%09480%2C293.362%20479.828%2C293.362%20479.828%2C343.029%20480%2C343.029%20540.988%2C343.029%20535.224%2C407.445%20480%2C422.35%20479.828%2C422.396%20%0D%0A%09%09%09%09479.828%2C422.4%20479.828%2C474.069%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%22479.828%2C242.38%20479.828%2C242.502%20480%2C242.502%20599.64%2C242.502%20599.8%2C242.502%20600.796%2C231.338%20%0D%0A%09%09%09%09603.059%2C206.159%20604.247%2C192.833%20480%2C192.833%20479.828%2C192.833%20479.828%2C223.682%20%09%09%09%22%2F%3E%0D%0A%09%09%3C%2Fg%3E%0D%0A%09%3C%2Fg%3E%0D%0A%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E%0D%0A) no-repeat;
    background-size: cover;
    height: 484px;
  }

  span#svg {
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' width='50%' height='560px' viewBox='281.63 0 396.74 560' enable-background='new 281.63 0 396.74 560' xml:space='preserve'><g><g><g><polygon fill='#E44D26' points='409.7,242.5 414.3,293.4 479.8,293.4 480,293.4 480,242.5 479.8,242.5'/><path fill='#E44D26' d='M281.63 110.053l36.106 404.968L479.757 560l162.47-45.042l36.144-404.905H281.63z M611.283 489.2 L480 525.572V474.03l-0.229 0.063L378.031 445.85l-6.958-77.985h22.98h26.879l3.536 39.612l55.315 14.937l0.046-0.013v-0.004 L480 422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283 489.176z'/><polygon fill='#F16529' points='480,192.8 604.2,192.8 603.1,206.2 600.8,231.3 599.8,242.5 599.6,242.5 480,242.5 480,293.4 581.9,293.4 595.3,293.4 594.1,306.7 582.4,437.5 581.6,445.9 480,474 480,474 480,525.6 611.3,489.2 642.2,143.2 480,143.2'/><polygon fill='#F16529' points='541,343 480,343 480,422.4 535.2,407.4'/><polygon fill='#EBEBEB' points='414.3,293.4 409.7,242.5 479.8,242.5 479.8,242.4 479.8,223.7 479.8,192.8 355.5,192.8 356.6,206.2 368.9,343 479.8,343 479.8,293.4'/><polygon fill='#EBEBEB' points='479.8,474.1 479.8,422.4 479.8,422.4 424.5,407.5 420.9,367.9 394.1,367.9 371.1,367.9 378,445.9 479.8,474.1 480,474 480,474'/><polygon points='343.8,50.2 366.9,50.2 366.9,75.5 392.1,75.5 392.1,0 366.9,0 366.9,24.9 343.8,24.9 343.8,0 318.5,0 318.5,75.5 343.8,75.5'/><polygon points='425.3,25 425.3,75.5 450.5,75.5 450.5,25 472.8,25 472.8,0 403.1,0 403.1,25 425.3,25'/><polygon points='508.5,38.1 525.9,64.9 526.3,64.9 543.7,38.1 543.7,75.5 568.9,75.5 568.9,0 542.5,0 526.3,26.5 510.2,0 483.8,0 483.8,75.5 508.5,75.5'/><polygon points='642.2,50.6 606.7,50.6 606.7,0 581.4,0 581.4,75.5 642.2,75.5'/><polygon fill='#FFFFFF' points='480,474 581.6,445.9 582.4,437.5 594.1,306.7 595.3,293.4 581.9,293.4 480,293.4 479.8,293.4 479.8,343 480,343 541,343 535.2,407.4 480,422.4 479.8,422.4 479.8,422.4 479.8,474.1'/><polygon fill='#FFFFFF' points='479.8,242.4 479.8,242.5 480,242.5 599.6,242.5 599.8,242.5 600.8,231.3 603.1,206.2 604.2,192.8 480,192.8 479.8,192.8 479.8,223.7'/></g></g></g></svg>") no-repeat;
    background-size: cover;
    height: 484px;
  }
</style>

O elemento `img` é incrível &mdash; ele baixa, decodifica e renderiza conteúdo &mdash; e os navegadores modernos oferecem suporte a uma grande variedade de formatos de imagens.  Incluir imagens que se
adequam a diferentes dispositivos não é diferente do mesmo processo para desktop e exige apenas pequenos
ajustes para criar uma boa experiência.


### TL;DR {: .hide-from-toc }

- Use tamanhos relativos para imagens para evitar a sobreposição acidental do contêiner.
- Use o elemento `picture` quando quiser especificar diferentes imagens dependendo das características do dispositivo (também conhecido como direção de arte).
- Use `srcset` e o descritor `x` no elemento `img` para dar dicas ao navegador sobre a melhor imagem a ser usada ao escolher entre diferentes densidades.
- Considere o uso de imagens em linha para reduzir solicitações de arquivos se sua página tiver apenas uma ou duas imagens que não forem usadas em outras áreas do site.


### Use tamanhos relativos para imagens

Lembre-se de usar unidades relativas ao especificar larguras de imagens para impedir que elas
acidentalmente ultrapassem a janela de visualização.  Por exemplo, `width: 50%;` fará 
com que a largura da imagem seja 50% do contêiner (não 50% da janela de visualização ou do
tamanho real em pixels).

Como o CSS permite que o conteúdo ultrapasse o contêiner, pode ser necessário usar
max-width: 100% para impedir que imagens e outros conteúdos façam isso.  Por
exemplo:


    img, embed, object, video {
      max-width: 100%;
    }
    

Forneça descrições significativas pelo atributo `alt` em elementos `img`
; elas tornarão seu site mais acessível, fornecendo contexto para
leitores de tela e outras tecnologias de assistência.


### Aprimore `img`s com `srcset` para dispositivos de DPI alto

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

O atributo `srcset` aprimora o comportamento do elemento
`img`, facilitando o fornecimento de vários arquivos de imagem
para dispositivos com diferentes características. Semelhante à `image-set`
[função CSS](#use-image-set-to-provide-high-res-images)
nativa ao CSS, o `srcset` permite que o navegador escolha a melhor
qualidade de imagem dependendo das características do dispositivos, por exemplo, o uso
de uma imagem de 2x em uma tela de 2x e, potencialmente no futuro, uma imagem de 1x em
um dispositivo de 2x em uma rede de largura de banda limitada.


<div style="clear:both;"></div>


    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

Navegadores que não oferecem suporte a `srcset` simplesmente usam o arquivo de imagem
padrão especificado pelo atributo `src`.  Por esse motivo, é importante
sempre incluir uma imagem de 1x que pode ser exibida em qualquer dispositivo, independentemente dos
recursos.  Quando `srcset` é suportado, a lista separada por vírgulas de
imagem/condições é analisada antes da realização de qualquer solicitação e somente a imagem mais
apropriada é baixada e exibida.

Embora as condições podem incluir desde a densidade de pixels até a largura e
altura, somente a densidade de pixels é permitida no momento.  Para equilibrar o comportamento
atual com futuros recursos, forneça apenas a imagem de 2x no
atributo.

### Direção de arte em imagens responsivas com `picture`

<img class="attempt-right" src="img/art-direction.png" alt="Exemplo de direção de arte"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Para alterar imagens com base nas características do dispositivo, um processo também conhecido como direção
de arte, use o elemento `picture`.  O elemento
`picture` define uma solução declarativa para
fornecer diversas versões de uma imagem com base em diferentes
características, como o tamanho do dispositivo, a resolução do dispositivo, a orientação
e muito mais.

<div style="clear:both;"></div>

Dogfood: O elemento `picture` está começando a ser usado em navegadores. Apesar de ele ainda não estar disponível em todos os navegadores, recomendamos seu uso por causa de sua compatibilidade com versões anteriores e do possível uso do [polyfill Picturefill](http://picturefill.responsiveimages.org/){: .external }. Consulte o site [ResponsiveImages.org](http://responsiveimages.org/#implementation) para saber mais.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Use elemento  <code>picture</code> quando uma fonte de imagem
existir em várias densidades ou quando um design responsivo exigir
uma imagem um pouco diferente em alguns tipos de telas.  Semelhante ao elemento
<code>video</code>, vários elementos  <code>source</code> podem
ser incluídos, possibilitando a especificação de diferentes arquivos de imagem
dependendo das consultas de mídia ou do formato da imagem.

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/media.html){: target="_blank" .external }

No exemplo acima, se a largura do navegador for de pelo menos 800 pixels, será usado
`head.jpg` ou `head-2x.jpg`, dependendo da resolução do dispositivo.
Se o navegador tiver entre 450 e 800 pixels, será usado `head-small.jpg` ou
`head-small-2x.jpg`, novamente, dependendo da resolução do dispositivo.
Para larguras de tela inferiores a 450 pixels e para compatibilidade com versões anteriores nas quais não há suporte ao elemento
`picture`, o navegador renderizará o elemento `img`
e sempre deverá ser incluído.

#### Imagens com tamanho relativo

Quando tamanho final da imagem não é conhecido, pode ser difícil especificar um
descritor de densidade para as fontes de imagem.  Isso é especialmente válido para
imagens que ocupam uma largura proporcional do navegador e são fluídas, dependendo
do tamanho do navegador.

Em vez de fornecer tamanhos e densidades de imagem fixos, o tamanho de cada
imagem fornecida pode ser especificado ao adicionar um descritor de largura juntamente  com o
tamanho do elemento image, permitindo que o navegador calcule automaticamente
a densidade de pixels efetiva e escolha a melhor imagem a ser baixada.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/sizes.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/sizes.html){: target="_blank" .external }


O exemplo acima renderiza uma imagem que tem metade da largura da janela de visualização
(`sizes="50vw"`) e, dependendo da largura do navegador e da
proporção de pixels do dispositivo, permite que o navegador escolha a imagem correta independentemente
do tamanho da janela do navegador. Por exemplo, a tabela abaixo mostra qual
imagem o navegador escolheria:

<table class="">
  <thead>
    <tr>
      <th data-th="Browser width">Largura do navegador</th>
      <th data-th="Device pixel ratio">Proporção de pixels do dispositivo</th>
      <th data-th="Image used">Imagem usada</th>
      <th data-th="Effective resolution">Resolução efetiva</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser width">400 pixels</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>200.png</code></td>
      <td data-th="Effective resolution">1x</td>
    </tr>
    <tr>
      <td data-th="Browser width">400 pixels</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2x</td>
    </tr>
    <tr>
      <td data-th="Browser width">320 pixels</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2.5x</td>
    </tr>
    <tr>
      <td data-th="Browser width">600 pixels</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>800.png</code></td>
      <td data-th="Effective resolution">2.67x</td>
    </tr>
    <tr>
      <td data-th="Browser width">640 pixels</td>
      <td data-th="Device pixel ratio">3</td>
      <td data-th="Image used"><code>1000.png</code></td>
      <td data-th="Effective resolution">3.125x</td>
    </tr>
    <tr>
      <td data-th="Browser width">1100 pixels</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>1400.png</code></td>
      <td data-th="Effective resolution">1.27x</td>
    </tr>
  </tbody>
</table>


#### Considere pontos de interrupção em imagens responsivas

Em muitos casos, o tamanho da imagem pode ser alterado dependendo dos pontos de interrupção
do layout do site.  Por exemplo, em uma tela pequena, você pode querer que a imagem
ocupe toda a largura da janela de visualização enquanto, em telas maiores, ela deve
ocupar apenas uma pequena parcela.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/breakpoints.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/breakpoints.html){: target="_blank" .external }

O atributo `sizes` no exemplo acima usa várias consultas de mídia para
especificar o tamanho da imagem. Quando a largura do navegador é superior a
600 pixels, a imagem ocupará cerca de 25% da largura da janela de visualização. Quando o navegador tem entre 500
e 600 pixels, a imagem ocupará 50% da largura da janela de visualização. Para navegadores com menos de 500 pixels, a
imagem ocupará toda a largura.


### Permita que imagens de produtos possam ser ampliadas

<figure class="attempt-right">
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Site da J. Crews com imagem de produto ampliável">
  <figcaption class="success">
    Site da J. Crews com imagem de produto ampliável.
  </figcaption>
</figure>

Os clientes querem ver o que estão comprando.  Em sites de varejo, os usuários esperam poder
visualizar closes de alta resolução dos produtos para conferir os
detalhes. Os [participantes deste estudo](/web/fundamentals/getting-started/principles/#make-product-images-expandable) ficaram frustrados quando isso não era possível.

Um bom exemplo de imagens que podem ser tocadas e ampliadas é fornecido pelo site da J. Crew.
Uma sobreposição que desaparece indica que uma imagem pode ser tocada, fornecendo uma
versão ampliada da imagem com todos os detalhes visíveis.

<div style="clear:both;"></div>

### Outras técnicas de imagem

#### Imagens compactáveis

A [técnica de imagem compactável](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview)
apresenta uma imagem de 2x altamente compactada para todos os dispositivos, independentemente dos recurso reais
do dispositivo em questão.  Dependendo do tipo de imagem e do nível de
compactação, a qualidade pode não ser visivelmente alterada, mas o tamanho do arquivo é
significativamente reduzido.

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/compressive.html){: target="_blank" .external }

Warning: Tenha cautela ao usar a técnica de compactação devido aos maiores custos de memória e decodificação que ela exige. O redimensionamento de grandes imagens para caber em telas menores é caro e pode ser particularmente difícil em dispositivos mais acessíveis cuja memória e o processamento são limitados.

#### Substituição de imagem JavaScript

A substituição de imagem JavaScript verifica os recursos do dispositivo e "faz a escolha
certa". Você pode determinar a proporção de pixels do dispositivo via
`window.devicePixelRatio`, obter a largura e a altura da tela e até possivelmente
executar o sniffing da conexão de rede via `navigator.connection` ou emitindo uma
solicitação falsa. Após coletar todas essas informações, você pode decidir qual
imagem carregar.

Uma grande desvantagem dessa abordagem é que o uso do JavaScript significa que você
atrasará o carregamento da imagem até que pelo menos o analisador look-ahead tenha terminado. Isso
significa que o download das imagens não será iniciado até que o evento `pageload` seja
acionado. Além disso, o navegador provavelmente fará o download das imagens de 1x e 2x,
resultando no aumento do peso da página.


#### Imagens em linha: de raster e vetoriais

Existem duas maneiras fundamentalmente diferentes de criar e armazenar imagens &mdash; e isso afeta a maneira com a qual você implanta imagens de forma responsiva.

**Imagens rasterizadas** &mdash; como fotografias e outras imagens &mdash; são representadas como uma grade de pontos de cor individuais. Imagens rasterizadas podem ser originadas em uma câmera ou um scanner ou ser criadas com o elemento de canvas HTML. Formatos como PNG, JPEG e WebP são usados para armazenar imagens rasterizadas.

**Imagens vetoriais** &mdash; como logotipos e desenhos &mdash; são definidas como um conjunto de curvas, linhas, formas, cores de preenchimento e gradientes. Imagens vetoriais são criadas com programas como o Adobe Illustrator ou o Inkscape ou programadas em código usando um formato vetorial como o SVG.

##### SVG

O SVG permite a inclusão de gráficos vetoriais responsivos em uma página da Web. A vantagem de formatos de arquivo vetoriais em relação aos rasterizados é que o navegador pode renderizar uma imagem vetorial em qualquer tamanho. Formatos vetoriais descrevem a geometria da imagem &mdash; como ela é criada a partir de linhas, curvas, cores etc. Por outro lado, formatos rasterizados só têm informações sobre pontos de cor individuais, portanto, ele precisa estimar como preencher os espaços em branco durante o dimensionamento.

Abaixo apresentamos duas versões da mesma imagem: à esquerda, uma imagem PNG e, à direita, uma imagem SVG. O formato SVG fica ótimo em qualquer tamanho, enquanto o PNG começa a ficar desfocado em tamanhos de exibição maiores.

<img class="side-by-side" src="img/html5.png" alt="Logotipo HTML5, formato PNG" />
<img class="side-by-side" src="img/html5.svg" alt="Logotipo HTML5, formato SVG" />

Se quiser reduzir o número de solicitações de arquivos realizadas pela sua página, codifique imagens em linha usando o formato SVG ou de URI de dados. Ao visualizar o código-fonte desta página, você verá que os dois logotipos abaixo são declarados em linha: um URI de dados e um SVG.

<img class="side-by-side" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB
      BZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW
      9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RUR
      CBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2
      ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8
      vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OT
      kveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzk2Ljc0cHgiIGhlaWdodD0iNTYwc
      HgiIHZpZXdCb3g9IjI4MS42MyAwIDM5Ni43NCA1NjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcg
      MjgxLjYzIDAgMzk2Ljc0IDU2MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSINCgk+DQo8Zz4NCgk8Zz4
      NCgkJPGc+DQoJCQk8cG9seWdvbiBmaWxsPSIjRTQ0RDI2IiBwb2ludHM9IjQwOS43MzcsMjQyLj
      UwMiA0MTQuMjc2LDI5My4zNjIgNDc5LjgyOCwyOTMuMzYyIDQ4MCwyOTMuMzYyIDQ4MCwyNDIuN
      TAyIDQ3OS44MjgsMjQyLjUwMiAJCQkNCgkJCQkiLz4NCgkJCTxwYXRoIGZpbGw9IiNFNDREMjYi
      IGQ9Ik0yODEuNjMsMTEwLjA1M2wzNi4xMDYsNDA0Ljk2OEw0NzkuNzU3LDU2MGwxNjIuNDctNDU
    uMDQybDM2LjE0NC00MDQuOTA1SDI4MS42M3ogTTYxMS4yODMsNDg5LjE3Ng0KCQkJCUw0ODAsNT
    I1LjU3MlY0NzQuMDNsLTAuMjI5LDAuMDYzTDM3OC4wMzEsNDQ1Ljg1bC02Ljk1OC03Ny45ODVoM
    jIuOThoMjYuODc5bDMuNTM2LDM5LjYxMmw1NS4zMTUsMTQuOTM3bDAuMDQ2LTAuMDEzdi0wLjAw
    NA0KCQkJCUw0ODAsNDIyLjM1di03OS4zMmgtMC4xNzJIMzY4Ljg1M2wtMTIuMjA3LTEzNi44NzF
    sLTEuMTg5LTEzLjMyNWgxMjQuMzcxSDQ4MHYtNDkuNjY4aDE2Mi4xN0w2MTEuMjgzLDQ4OS4xNz
    Z6Ii8+DQoJCQk8cG9seWdvbiBmaWxsPSIjRjE2NTI5IiBwb2ludHM9IjQ4MCwxOTIuODMzIDYwN
    C4yNDcsMTkyLjgzMyA2MDMuMDU5LDIwNi4xNTkgNjAwLjc5NiwyMzEuMzM4IDU5OS44LDI0Mi41
    MDIgNTk5LjY0LDI0Mi41MDIgDQoJCQkJNDgwLDI0Mi41MDIgNDgwLDI5My4zNjIgNTgxLjg5Niw
    yOTMuMzYyIDU5NS4yOCwyOTMuMzYyIDU5NC4wNjgsMzA2LjY5OSA1ODIuMzk2LDQzNy40NTggNT
    gxLjY0OSw0NDUuODUgNDgwLDQ3NC4wMjEgDQoJCQkJNDgwLDQ3NC4wMyA0ODAsNTI1LjU3MiA2M
    TEuMjgzLDQ4OS4xNzYgNjQyLjE3LDE0My4xNjYgNDgwLDE0My4xNjYgCQkJIi8+DQoJCQk8cG9s
    eWdvbiBmaWxsPSIjRjE2NTI5IiBwb2ludHM9IjU0MC45ODgsMzQzLjAyOSA0ODAsMzQzLjAyOSA
    0ODAsNDIyLjM1IDUzNS4yMjQsNDA3LjQ0NSAJCQkiLz4NCgkJCTxwb2x5Z29uIGZpbGw9IiNFQk
    VCRUIiIHBvaW50cz0iNDE0LjI3NiwyOTMuMzYyIDQwOS43MzcsMjQyLjUwMiA0NzkuODI4LDI0M
    i41MDIgNDc5LjgyOCwyNDIuMzggNDc5LjgyOCwyMjMuNjgyIA0KCQkJCTQ3OS44MjgsMTkyLjgz
    MyAzNTUuNDU3LDE5Mi44MzMgMzU2LjY0NiwyMDYuMTU5IDM2OC44NTMsMzQzLjAyOSA0NzkuODI
    4LDM0My4wMjkgNDc5LjgyOCwyOTMuMzYyIAkJCSIvPg0KCQkJPHBvbHlnb24gZmlsbD0iI0VCRU
    JFQiIgcG9pbnRzPSI0NzkuODI4LDQ3NC4wNjkgNDc5LjgyOCw0MjIuNCA0NzkuNzgyLDQyMi40M
    TMgNDI0LjQ2Nyw0MDcuNDc3IDQyMC45MzEsMzY3Ljg2NCANCgkJCQkzOTQuMDUyLDM2Ny44NjQg
    MzcxLjA3MiwzNjcuODY0IDM3OC4wMzEsNDQ1Ljg1IDQ3OS43NzEsNDc0LjA5NCA0ODAsNDc0LjA
    zIDQ4MCw0NzQuMDIxIAkJCSIvPg0KCQkJPHBvbHlnb24gcG9pbnRzPSIzNDMuNzg0LDUwLjIyOS
    AzNjYuODc0LDUwLjIyOSAzNjYuODc0LDc1LjUxNyAzOTIuMTE0LDc1LjUxNyAzOTIuMTE0LDAgM
    zY2Ljg3MywwIDM2Ni44NzMsMjQuOTM4IA0KCQkJCTM0My43ODMsMjQuOTM4IDM0My43ODMsMCAz
    MTguNTQ0LDAgMzE4LjU0NCw3NS41MTcgMzQzLjc4NCw3NS41MTcgCQkJIi8+DQoJCQk8cG9seWd
    vbiBwb2ludHM9IjQyNS4zMDcsMjUuMDQyIDQyNS4zMDcsNzUuNTE3IDQ1MC41NDksNzUuNTE3ID
    Q1MC41NDksMjUuMDQyIDQ3Mi43NzksMjUuMDQyIDQ3Mi43NzksMCA0MDMuMDg1LDAgDQoJCQkJN
    DAzLjA4NSwyNS4wNDIgNDI1LjMwNiwyNS4wNDIgCQkJIi8+DQoJCQk8cG9seWdvbiBwb2ludHM9
    IjUwOC41MzcsMzguMDg2IDUyNS45MTQsNjQuOTM3IDUyNi4zNDksNjQuOTM3IDU0My43MTQsMzg
    uMDg2IDU0My43MTQsNzUuNTE3IDU2OC44NTEsNzUuNTE3IDU2OC44NTEsMCANCgkJCQk1NDIuNT
    IyLDAgNTI2LjM0OSwyNi41MzQgNTEwLjE1OSwwIDQ4My44NCwwIDQ4My44NCw3NS41MTcgNTA4L
    jUzNyw3NS41MTcgCQkJIi8+DQoJCQk8cG9seWdvbiBwb2ludHM9IjY0Mi4xNTYsNTAuNTU1IDYw
    Ni42Niw1MC41NTUgNjA2LjY2LDAgNTgxLjQxMiwwIDU4MS40MTIsNzUuNTE3IDY0Mi4xNTYsNzU
    uNTE3IAkJCSIvPg0KCQkJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI0ODAsNDc0Lj
    AyMSA1ODEuNjQ5LDQ0NS44NSA1ODIuMzk2LDQzNy40NTggNTk0LjA2OCwzMDYuNjk5IDU5NS4yO
    CwyOTMuMzYyIDU4MS44OTYsMjkzLjM2MiANCgkJCQk0ODAsMjkzLjM2MiA0NzkuODI4LDI5My4z
    NjIgNDc5LjgyOCwzNDMuMDI5IDQ4MCwzNDMuMDI5IDU0MC45ODgsMzQzLjAyOSA1MzUuMjI0LDQ
    wNy40NDUgNDgwLDQyMi4zNSA0NzkuODI4LDQyMi4zOTYgDQoJCQkJNDc5LjgyOCw0MjIuNCA0Nz
    kuODI4LDQ3NC4wNjkgCQkJIi8+DQoJCQk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9I
    jQ3OS44MjgsMjQyLjM4IDQ3OS44MjgsMjQyLjUwMiA0ODAsMjQyLjUwMiA1OTkuNjQsMjQyLjUw
    MiA1OTkuOCwyNDIuNTAyIDYwMC43OTYsMjMxLjMzOCANCgkJCQk2MDMuMDU5LDIwNi4xNTkgNjA
    0LjI0NywxOTIuODMzIDQ4MCwxOTIuODMzIDQ3OS44MjgsMTkyLjgzMyA0NzkuODI4LDIyMy42OD
    IgCQkJIi8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==">
<svg class="side-by-side" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  width="396.74px" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.737,242.502 414.276,293.362 479.828,293.362 480,293.362 480,242.502 479.828,242.502"/><path fill="#E44D26" d="M281.63,110.053l36.106,404.968L479.757,560l162.47-45.042l36.144-404.905H281.63z M611.283,489.176 L480,525.572V474.03l-0.229,0.063L378.031,445.85l-6.958-77.985h22.98h26.879l3.536,39.612l55.315,14.937l0.046-0.013v-0.004 L480,422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283,489.176z"/><polygon fill="#F16529" points="480,192.833 604.247,192.833 603.059,206.159 600.796,231.338 599.8,242.502 599.64,242.502 480,242.502 480,293.362 581.896,293.362 595.28,293.362 594.068,306.699 582.396,437.458 581.649,445.85 480,474.021 480,474.03 480,525.572 611.283,489.176 642.17,143.166 480,143.166       "/><polygon fill="#F16529" points="540.988,343.029 480,343.029 480,422.35 535.224,407.445      "/><polygon fill="#EBEBEB" points="414.276,293.362 409.737,242.502 479.828,242.502 479.828,242.38 479.828,223.682 479.828,192.833 355.457,192.833 356.646,206.159 368.853,343.029 479.828,343.029 479.828,293.362       "/><polygon fill="#EBEBEB" points="479.828,474.069 479.828,422.4 479.782,422.413 424.467,407.477 420.931,367.864 394.052,367.864 371.072,367.864 378.031,445.85 479.771,474.094 480,474.03 480,474.021       "/><polygon points="343.784,50.229 366.874,50.229 366.874,75.517 392.114,75.517 392.114,0 366.873,0 366.873,24.938 343.783,24.938 343.783,0 318.544,0 318.544,75.517 343.784,75.517      "/><polygon points="425.307,25.042 425.307,75.517 450.549,75.517 450.549,25.042 472.779,25.042 472.779,0 403.085,0 403.085,25.042 425.306,25.042       "/><polygon points="508.537,38.086 525.914,64.937 526.349,64.937 543.714,38.086 543.714,75.517 568.851,75.517 568.851,0 542.522,0 526.349,26.534 510.159,0 483.84,0 483.84,75.517 508.537,75.517      "/><polygon points="642.156,50.555 606.66,50.555 606.66,0 581.412,0 581.412,75.517 642.156,75.517      "/><polygon fill="#FFFFFF" points="480,474.021 581.649,445.85 582.396,437.458 594.068,306.699 595.28,293.362 581.896,293.362 480,293.362 479.828,293.362 479.828,343.029 480,343.029 540.988,343.029 535.224,407.445 480,422.35 479.828,422.396 479.828,422.4 479.828,474.069       "/><polygon fill="#FFFFFF" points="479.828,242.38 479.828,242.502 480,242.502 599.64,242.502 599.8,242.502 600.796,231.338 603.059,206.159 604.247,192.833 480,192.833 479.828,192.833 479.828,223.682       "/></g></g></g></svg>

O SVG tem um [bom suporte](http://caniuse.com/svg-html5) em navegadores de computadores e dispositivos móveis e [ferramentas de otimização](https://sarasoueidan.com/blog/svgo-tools/) podem reduzir o tamanho do SVG de forma significativa. As duas linhas a seguir de logotipos SVG parecem idênticas, mas uma tem cerca de 3 KB e a outra apenas 2 KB:

<svg class="side-by-side" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="396.74px" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.737,242.502 414.276,293.362 479.828,293.362 480,293.362 480,242.502 479.828,242.502"/><path fill="#E44D26" d="M281.63,110.053l36.106,404.968L479.757,560l162.47-45.042l36.144-404.905H281.63z M611.283,489.176 L480,525.572V474.03l-0.229,0.063L378.031,445.85l-6.958-77.985h22.98h26.879l3.536,39.612l55.315,14.937l0.046-0.013v-0.004 L480,422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283,489.176z"/><polygon fill="#F16529" points="480,192.833 604.247,192.833 603.059,206.159 600.796,231.338 599.8,242.502 599.64,242.502 480,242.502 480,293.362 581.896,293.362 595.28,293.362 594.068,306.699 582.396,437.458 581.649,445.85 480,474.021 480,474.03 480,525.572 611.283,489.176 642.17,143.166 480,143.166       "/><polygon fill="#F16529" points="540.988,343.029 480,343.029 480,422.35 535.224,407.445      "/><polygon fill="#EBEBEB" points="414.276,293.362 409.737,242.502 479.828,242.502 479.828,242.38 479.828,223.682 479.828,192.833 355.457,192.833 356.646,206.159 368.853,343.029 479.828,343.029 479.828,293.362       "/><polygon fill="#EBEBEB" points="479.828,474.069 479.828,422.4 479.782,422.413 424.467,407.477 420.931,367.864 394.052,367.864 371.072,367.864 378.031,445.85 479.771,474.094 480,474.03 480,474.021       "/><polygon points="343.784,50.229 366.874,50.229 366.874,75.517 392.114,75.517 392.114,0 366.873,0 366.873,24.938 343.783,24.938 343.783,0 318.544,0 318.544,75.517 343.784,75.517      "/><polygon points="425.307,25.042 425.307,75.517 450.549,75.517 450.549,25.042 472.779,25.042 472.779,0 403.085,0 403.085,25.042 425.306,25.042       "/><polygon points="508.537,38.086 525.914,64.937 526.349,64.937 543.714,38.086 543.714,75.517 568.851,75.517 568.851,0 542.522,0 526.349,26.534 510.159,0 483.84,0 483.84,75.517 508.537,75.517      "/><polygon points="642.156,50.555 606.66,50.555 606.66,0 581.412,0 581.412,75.517 642.156,75.517      "/><polygon fill="#FFFFFF" points="480,474.021 581.649,445.85 582.396,437.458 594.068,306.699 595.28,293.362 581.896,293.362 480,293.362 479.828,293.362 479.828,343.029 480,343.029 540.988,343.029 535.224,407.445 480,422.35 479.828,422.396 479.828,422.4 479.828,474.069       "/><polygon fill="#FFFFFF" points="479.828,242.38 479.828,242.502 480,242.502 599.64,242.502 599.8,242.502 600.796,231.338 603.059,206.159 604.247,192.833 480,192.833 479.828,192.833 479.828,223.682       "/></g></g></g></svg><svg class="side-by-side" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50%" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.7,242.5 414.3,293.4 479.8,293.4 480,293.4 480,242.5 479.8,242.5"/><path fill="#E44D26" d="M281.63 110.053l36.106 404.968L479.757 560l162.47-45.042l36.144-404.905H281.63z M611.283 489.2 L480 525.572V474.03l-0.229 0.063L378.031 445.85l-6.958-77.985h22.98h26.879l3.536 39.612l55.315 14.937l0.046-0.013v-0.004 L480 422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283 489.176z"/><polygon fill="#F16529" points="480,192.8 604.2,192.8 603.1,206.2 600.8,231.3 599.8,242.5 599.6,242.5 480,242.5 480,293.4 581.9,293.4 595.3,293.4 594.1,306.7 582.4,437.5 581.6,445.9 480,474 480,474 480,525.6 611.3,489.2 642.2,143.2 480,143.2"/><polygon fill="#F16529" points="541,343 480,343 480,422.4 535.2,407.4"/><polygon fill="#EBEBEB" points="414.3,293.4 409.7,242.5 479.8,242.5 479.8,242.4 479.8,223.7 479.8,192.8 355.5,192.8 356.6,206.2 368.9,343 479.8,343 479.8,293.4"/><polygon fill="#EBEBEB" points="479.8,474.1 479.8,422.4 479.8,422.4 424.5,407.5 420.9,367.9 394.1,367.9 371.1,367.9 378,445.9 479.8,474.1 480,474 480,474"/><polygon points="343.8,50.2 366.9,50.2 366.9,75.5 392.1,75.5 392.1,0 366.9,0 366.9,24.9 343.8,24.9 343.8,0 318.5,0 318.5,75.5 343.8,75.5"/><polygon points="425.3,25 425.3,75.5 450.5,75.5 450.5,25 472.8,25 472.8,0 403.1,0 403.1,25 425.3,25"/><polygon points="508.5,38.1 525.9,64.9 526.3,64.9 543.7,38.1 543.7,75.5 568.9,75.5 568.9,0 542.5,0 526.3,26.5 510.2,0 483.8,0 483.8,75.5 508.5,75.5"/><polygon points="642.2,50.6 606.7,50.6 606.7,0 581.4,0 581.4,75.5 642.2,75.5"/><polygon fill="#FFFFFF" points="480,474 581.6,445.9 582.4,437.5 594.1,306.7 595.3,293.4 581.9,293.4 480,293.4 479.8,293.4 479.8,343 480,343 541,343 535.2,407.4 480,422.4 479.8,422.4 479.8,422.4 479.8,474.1"/><polygon fill="#FFFFFF" points="479.8,242.4 479.8,242.5 480,242.5 599.6,242.5 599.8,242.5 600.8,231.3 603.1,206.2 604.2,192.8 480,192.8 479.8,192.8 479.8,223.7"/></g></g></g></svg>

##### URI de dados

URIs de dados oferecem uma maneira de incluir um arquivo em linha, como uma imagem, ao definir o src de um elemento  <code>img</code> como uma string com codificação Base64 usando o seguinte formato:


    <img src="data:image/svg+xml;base64,[data]">
    

O início do código para o logotipo HTML5 acima tem a seguinte aparência:


    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB
    BZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW ...">
    

(A versão completa tem mais de 5000 caracteres!)

Ferramentas com recurso arrastar e soltar, como o [jpillora.com/base64-encoder](https://jpillora.com/base64-encoder), estão disponíveis para converter arquivos binários como imagens em URIs de dados. Assim como SVGs, URIs de dados tem um [bom suporte](http://caniuse.com/datauri) em navegadores para dispositivos móveis e computadores.

##### Elementos em linha no CSS

URIs de dados e SVGs também podem ser incluídos em linha no CSS &mdash; e isso é permitido para dispositivos móveis e computadores. Veja duas imagens aparentemente idênticas implementadas como imagens de fundo no CSS; um URI de dados e um SVG:

<span class="side-by-side" id="data_uri"></span>
<span class="side-by-side" id="svg"></span>

##### Vantagens e desvantagens do código em linha

O código de inclusão em linha para imagens pode ser longo &mdash; especialmente para URIs de dados &mdash; então por que usá-lo? Para reduzir as solicitações HTTP! SVGs e URIs de dados podem permitir que uma página da Web inteira, incluindo imagens, CSS e JavaScript, seja recuperada com uma só solicitação.

A desvantagem:

* Em dispositivos móveis, URIs de dados podem ter uma exibição [significativamente mais lenta](https://www.mobify.com/blog/data-uris-are-slow-on-mobile/) do que imagens de um  <code>src</code> externo.
* URIs de dados podem aumentar consideravelmente o tamanho de uma solicitação de HTTP.
* Eles adicionam complexidade à sua marcação e ao seu fluxo de trabalho.
* O formato de URI de dados é muito maior do que o binário (até 30%) e, portanto, não reduz o tamanho total do download.
* URIs de dados não podem ser armazenados em cache, devendo ser baixados para cada página na qual são usados.
* Eles não são permitidos no IE 6 e 7 e o suporte é incompleto no IE 8.
* Com o HTTP/2, a redução do número de solicitações de ativos se tornará menos prioritária.

Assim como com todos os elementos responsivos, é preciso testar o que funciona melhor. Use ferramentas de desenvolvedor para verificar o tamanho do arquivo de download, o número de solicitações e a latência total. Às vezes, URIs de dados podem ser úteis para imagens rasterizadas &mdash; por exemplo, em uma página inicial que só inclui uma ou duas fotos que não são usadas em outras áreas. Se precisar incluir imagens vetoriais em linha, o formato SVG é uma opção muito melhor.



## Imagens em CSS

A propriedade do CSS `background` é uma ferramenta eficaz para adicionar imagens
complexas a elementos, facilitando a inclusão de várias imagens,
sua repetição e muito mais.  Ao ser combinada com consultas de mídia, a propriedade background se torna ainda
mais eficaz, permitindo o carregamento condicional de imagens com base na resolução
da tela, no tamanho da janela de visualização e muito mais.


### TL;DR {: .hide-from-toc }
- Use a melhor imagem de acordo com as características de exibição, considerando o tamanho da tela, a resolução do dispositivo e o layout da página.
- Altere a propriedade `background-image` no CSS para telas de alto DPI usando consultas de mídia com `min-resolution` e `-webkit-min-device-pixel-ratio`.
- Use srcset para fornecer imagens de alta resolução além da imagem de 1x na marcação.
- Considere os custos de desempenho ao usar técnicas de substituição de imagens em JavaScript ou ao exibir imagens de alta resolução altamente compactadas para reduzir os dispositivos de resolução.


### Use consultas de mídia para o carregamento condicional de imagens ou direção de arte

Consultas de mídia não só afetam o layout da página, mas também podem ser usadas para
carregar imagens condicionalmente ou para fornecer direção de arte dependendo da largura da
janela de visualização.

No exemplo abaixo, em telas menores, somente `small.png` é
baixada e aplicada ao `div` de conteúdo, enquanto em telas maiores,
`background-image: url(body.png)` é aplicado ao corpo e a `background-image:
url(large.png)` is applied to the content `div`.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/conditional-mq.html" region_tag="conditional" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/conditional-mq.html){: target="_blank" .external }

### Use image-set para fornecer imagens de alta resolução

A função `image-set()` no CSS aprimora a propriedade `background` de comportamento,
facilitando o fornecimento de vários arquivos de imagens para diferentes características
de dispositivos.  Isso permite que o navegador escolha a melhor qualidade de imagem dependendo das
características do dispositivos, por exemplo, o uso de uma imagem de 2x em uma tela de 2x
ou de uma imagem de 1x em um dispositivo de 2x em uma rede de largura de banda limitada.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

Além de carregar a imagem correta, o navegador também a dimensionará
da forma adequada. Em outras palavras, o navegador presume que imagens de 2x são duas vezes
maiores do que imagens de 1x e, dessa forma, reduzirá a imagem de 2x a um fator de 2 para
que a imagem pareça ter o mesmo tamanho na página.

O suporte a `image-set()` ainda é novo e só é permitido nos navegadores Chrome e
Safari com o prefixo de fornecedor `-webkit`.  Tenha cuidado ao incluir uma
imagem de fallback quando `image-set()` não tiver suporte. Por exemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-set.html" region_tag="imageset" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/image-set.html){: target="_blank" .external }

O exemplo acima carregará o ativo apropriado em navegadores que oferecem suporte a image-set e, caso contrário,
utilizam o ativo de 1x. A ressalva óbvia é que, embora o suporte a
`image-set()` seja baixo, a maioria dos navegadores receberá um ativo de 1x.

### Use consultas de mídia para fornecer imagens de alta resolução ou direção de arte

Consultas de mídia podem criar regras baseadas na 
[proporção de pixels do dispositivo](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg), 
possibilitando a especificação de diferentes imagens para exibições de 2x vs. 1x.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

O Chrome, o Firefox e o Opera oferecem suporte ao `(min-resolution: 2dppx)` padrão,
enquanto os navegadores Safari e Android exigem a sintaxe prefixada de fornecedor mais antiga
sem a unidade `dppx`.  Lembre-se de que esses estilos são carregados somente se o dispositivo
corresponder a consulta de mídia e você deve especificar estilos para o caso base.  Isso
também oferece o benefício de garantir que algo seja renderizado se o navegador
não oferecer suporte a consultas de mídia de resoluções específicas.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-query-dppx.html" region_tag="mqdppx" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/media-query-dppx.html){: target="_blank" .external }

Você também pode usar a sintaxe min-width para exibir imagens alternativas dependendo do
tamanho da janela de visualização.  Essa técnica tem a vantagem de a imagem não ser
baixada se a consulta de mídia não corresponder.  Por exemplo, `bg.png` só é
baixado e aplicado ao `body` se a largura do navegador por de 500 pixels ou mais:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    


## Use SVG para ícones 

Ao adicionar ícones à sua página, use ícones SVG quando possível ou, em alguns
casos, caracteres Unicode.


### TL;DR {: .hide-from-toc }
- Use SVG ou Unicode para ícones em vez de imagens rasterizadas.


### Substitua ícones simples por Unicode

Muitas fontes incluem suporte para uma variedade de glifos Unicode, que podem ser usados
no lugar de imagens. Diferentemente de imagens, fontes Unicode podem ser dimensionadas e manter uma aparência boa
aparecendo grandes ou pequenas na tela.

Além do conjunto de caracteres normal, o Unicode pode incluir símbolos para 
setas (&#8592;), operadores matemáticos (&#8730;), formas geométricas
(&#9733;), imagens de controle (&#9654;), notação musical (&#9836;),
letras gregas (&#937;) e até peças de xadrez (&#9822;).

Você pode incluir um caractere Unicode da mesma maneira que faz com entidades nomeadas:
`&#XXXX`, onde `XXXX` representa o número do caractere Unicode. Por exemplo:


    You're a super &#9733;
    

You're a super &#9733;

### Substitua ícones complexos por SVG

Para requisitos de ícone mais complexos, os ícones SVG geralmente são leves, 
fáceis de usar e podem estilizados com CSS. O SVG tem diversas vantagens sobre
imagens de raster:

* Imagens SVG são gráficos vetoriais que podem ser infinitamente dimensionados.
* Efeitos CSS como cor, sombreamento, transparência e animações são 
  simples.
* Imagens SVG podem ser incorporadas diretamente no documento.
* Elas são semânticas.
* Elas proporcionam uma acessibilidade melhor com os atributos apropriados.



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-svg.html" region_tag="iconsvg" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-svg.html){: target="_blank" .external }

### Use fontes de ícone com cautela

<figure class="attempt-right">
  <img src="img/icon-fonts.png" class="center" srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x" alt="Exemplo de uma página que usa FontAwesome para seus ícones de fonte.">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-font.html" target="_blank" class="external">
      Exemplo de uma página que usa FontAwesome para seus ícones de fonte.
    </a>
  </figcaption>
</figure>

Fontes de ícone são populares e podem ser fáceis de usar, mas têm algumas desvantagens 
em comparação com ícones SVG:

* Elas são gráficos vetoriais que podem ser infinitamente dimensionadas, mas elas podem sofrer 
 suavização, resultando em ícones que não têm a nitidez esperada.
* Estilização limitada com CSS.
* Pode ser difícil posicionar pixels perfeitamente, dependendo da altura da linha, 
 do espaçamento entre as letras etc.
* Não são semânticas e podem ser difíceis de usar com leitores de tela ou 
  outras tecnologias assistenciais.
* A não ser que o escopo seja definido corretamente, podem resultar em um tamanho de arquivo grande que usa 
  apenas um pequeno subconjunto dos ícones disponíveis. 

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-font.html" region_tag="iconfont" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-font.html){: target="_blank" .external }

Existem centenas de fontes de ícone gratuitas e pagas, incluindo [Font
Awesome](https://fortawesome.github.io/Font-Awesome/),
[Pictos](http://pictos.cc/){: .external } e [Glyphicons](https://glyphicons.com/).

Equilibre o peso da solicitação HTTP adicional e do tamanho do arquivo com
a necessidade dos ícones. Por exemplo, se você precisar apenas de alguns ícones, pode
ser melhor usar uma imagem ou um sprite de imagens.


## Otimize imagens para o desempenho

As imagens frequentemente representam a maior parte dos bytes baixados e também ocupam
uma parte significativa do espaço visual de uma página. Consequentemente, a otimização
das imagens pode gerar algumas das maiores economias de bytes e melhorias de
desempenho para seu site: quanto menos bytes o navegador precisar baixar,
menor será a concorrência pela largura de banda do cliente e mais rápido o
navegador poderá baixar e exibir todos os ativos.


### TL;DR {: .hide-from-toc }
- Não escolha um formato de imagem aleatório &mdash; entenda os diferentes formatos disponíveis e use o mais adequado.
- Inclua ferramentas de otimização e compactação de imagens no seu fluxo de trabalho para reduzir os tamanhos dos arquivos.
- Reduza o número de solicitações HTTP colocando imagens usadas com frequência em image sprites.
- Considere carregar imagens somente após elas entrarem na visualização para melhorar o tempo inicial de carregamento da página e reduzir o peso inicial da página.


### Escolha o formato certo

Existem dois tipos de imagens a serem considerados: [imagens vetoriais](https://en.wikipedia.org/wiki/Vector_graphics)
e [imagens rasterizadas](https://en.wikipedia.org/wiki/Raster_graphics).
Para imagens rasterizadas, também é necessário escolher o formato de compactação correto,
por exemplo: `GIF`, `PNG`, `JPG`.

**Imagens rasterizadas**, como fotografias e outras imagens representadas como uma
grade de pontos ou pixels individuais. Imagens de raster geralmente são produzidas por uma câmera ou
um scanner, ou podem ser criadas no navegador com o elemento `canvas`.  Conforme o
tamanho da imagem aumenta, o tamanho do arquivo também cresce.  Quando dimensionadas acima
do tamanho original, imagens rasterizadas podem ficar desfocadas, pois os navegadores precisam adivinhar como
preencher os pixels ausentes.

**Imagens vetoriais**, como logotipos e desenhos, são definidos por um conjunto de curvas,
linhas, formas e cores de preenchimento. Imagens vetoriais são criadas com programas como o
Adobe Illustrator ou o Inkscape e salvas em um formato vetorial como o
[`SVG`](https://css-tricks.com/using-svg/).  Como imagens vetoriais são baseadas em
primitivos simples, elas podem ser dimensionadas sem perda de qualidade ou
alteração no tamanho do arquivo.

Ao escolher o formato certo, é importante considerar a origem da
imagem (rasterizada ou vetorial) e seu conteúdo (cores, animação, texto etc.).
Nenhum formato individual se adequa a todos os tipos e cada um tem seus pontos positivos e
negativos.

Comece com estas diretrizes para escolher o formato certo:

* Use `JPG` para imagens fotográficas.
* Use `SVG` para imagens vetoriais e gráficos de cores sólidas, como logotipos e desenhos.
  Se uma imagem vetorial estiver indisponível, experimente os formatos `WebP` ou `PNG`.
* Use `PNG` em vez de `GIF`, pois esse formato permite mais cores e oferece
 taxas de compactação melhores.
* Para animações mais longas, considere o uso de `<video>`, que oferece uma qualidade de imagem melhor
   e dá ao usuário controle sobre a reprodução.

### Reduza o tamanho do arquivo

É possível reduzir o tamanho do arquivo consideravelmente ao realizar o “pós-processamento” das imagens após
salvá-las. Existem diversas ferramentas de compactação de imagens &mdash; com e sem perda,
on-line, de GUI e linha de comando.  Quando possível, é recomendável automatizar a otimização
da imagem para que ela seja uma prioridade no seu fluxo de trabalho.

Há várias ferramentas disponíveis para realizar uma compactação maior sem perdas em arquivos `JPG`
e `PNG` que não afetam a qualidade da imagem. Para o formato `JPG`, experimente
[jpegtran](http://jpegclub.org/){: .external } ou
[jpegoptim](http://freshmeat.net/projects/jpegoptim/){: .external } (disponível apenas para Linux;
executado com a opção --strip-all). Para o formato `PNG`, experimente
[OptiPNG](http://optipng.sourceforge.net/){: .external } ou
[PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

### Use image sprites

<img src="img/sprite-sheet.png" class="attempt-right" alt="Folha de sprites de imagens usada no exemplo">

Os sprites CSS são uma técnica na qual um grupo de imagens é combinado em uma só
imagem de "folha de sprites". Você pode, então, usar imagens individuais ao especificar a
imagem de fundo de um elemento (a folha de sprites) e um offset para exibir a
parte correta.

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-sprite.html" region_tag="sprite" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media//image-sprite.html){: target="_blank" .external }

A criação de sprites tem a vantagem de reduzir o número de downloads necessários para obter
várias imagens, ainda permitindo o armazenamento em cache.

### Considere um carregamento lento

O carregamento lento pode agilizar significativamente o carregamento de páginas longas que incluem muitas imagens
abaixo da dobra ao carregá-las conforme a necessidade ou depois que o conteúdo
principal terminar de ser carregado e renderizado.  Além de melhorias de
desempenho, o uso do carregamento lento pode criar experiências de rolagem infinita.

Tenha cuidado ao criar páginas com rolagem infinita &mdash; pois o conteúdo é carregado conforme
ele se torna visível, então mecanismos de pesquisa poderão nunca ver o conteúdo.  Além disso,
usuários que procuram informações no rodapé nunca 
verão o rodapé, pois há sempre um novo conteúdo a ser carregado.



## Evite imagens por completo

Às vezes, a melhor imagem é a que não existe. Sempre que possível,
use os recursos nativos do navegador para fornecer funções iguais ou
semelhantes.  Navegadores geram elementos visuais que anteriormente
exigiriam imagens.   Isso significa que os navegadores não precisam mais fazer o download de arquivos de imagem
separados, evitando o uso de imagens dimensionadas de forma inadequada.  Você pode usar Unicode ou fontes especiais de ícone para renderizar ícones.

### Coloque texto em marcações em vez de incorporá-los em imagens

Sempre que possível, o texto deve ser texto, não incorporado em imagens. Por
exemplo, usar imagens como títulos ou colocar informações de contato &mdash; como números
de telefone ou endereços &mdash; diretamente em imagens impede os usuários de 
copiar e colar essas informações, além de torná-las inacessíveis para leitores de tela e criar um design
não responsivo.  O texto deve ser colocado na sua marcação e, se necessário,
use fontes da Web para criar o estilo desejado.

### Use CSS para substituir imagens

Navegadores modernos podem usar recursos CSS para criar estilos que anteriormente
exigiam imagens.  Por exemplo: gradientes complexos podem ser usados usando a propriedade
`background`, sombras podem ser criadas usando `box-shadow` e bordas 
arredondadas podem ser adicionadas com a propriedade `border-radius`.

<style>
  p#noImage {
    margin-top: 2em;
    padding: 1em;
    padding-bottom: 2em;
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }

  p#noImage code {
    color: rgb(64, 64, 64);
  }
</style>

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
    

Lembre-se de que o uso dessas técnicas exige ciclos de renderização, que
podem ser significativos em dispositivos móveis.  Se elas forem utilizadas excessivamente, você perderá
qualquer benefício ganho e poderá reduzir o desempenho.


{# wf_devsite_translation #}
