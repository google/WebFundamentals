project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A propriedade `background` do CSS é uma ferramenta muito utilizada para adicionar imagens complexas aos elementos, permitindo adicionar múltiplas imagens, fazer com que elas sejam repetidas e muito mais.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Imagens no código CSS {: .page-title }

{% include "_shared/contributors/TODO.html" %}



A propriedade `background` do CSS é uma ferramenta muito utilizada para adicionar imagens complexas aos elementos, permitindo adicionar múltiplas imagens, fazer com que elas sejam repetidas e muito mais.  Quando usada em combinação com as consultas de mídia, a propriedade `background` se torna ainda mais útil, permitindo o carregamento condicional de imagens baseado em resolução da tela, tamanho da janela de visualização e outros.



## TL;DR {: .hide-from-toc }
- 'Use a imagem mais indicada de acordo com as características de exibição, considerando o tamanho da tela, a resolução do dispositivo e o layout da página.'
- Altere a propriedade <code>background-image</code> no CSS para telas com alto DPI usando consultas de mídia com <code>min-resolution</code> e <code>-webkit-min-device-pixel-ratio</code>.
- Use <code>srcset</code> para fornecer imagens de alta resolução junto com a imagem de 1x na marcação.
- Considere os custos de desempenho ao usar técnicas de substituição de imagem JavaScript ou ao veicular imagens de alta resolução fortemente compactadas em dispositivos com resoluções inferiores.


## Use as consultas de mídia no carregamento condicional de imagens ou na direção de arte

As consultas de mídia não apenas afetam o layout da página, como também podem ser usadas para carregar imagens de forma condicional e fornecer direção de arte, dependendo da largura da janela de visualização.

No exemplo abaixo, foi feito o download de `small.png` e foi aplicado o `div` de conteúdo nas telas menores, enquanto nas telas maiores, `background-image: url(body.png)` foi aplicado ao corpo da página e `background-image: url(large.png)` foi aplicado ao `div` de conteúdo.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/conditional-mq.html" region_tag="conditional" lang=css %}
</pre>

## Use a função `image-set` para fornecer imagens de alta resolução

A função `image-set()` no código CSS aprimora a propriedade de comportamento `background`, facilitando o fornecimento de diversos arquivos de imagem para as diferentes características dos dispositivos.  Com isso, o navegador pode escolher a imagem mais apropriada conforme as características do dispositivo, por exemplo, ao usar uma imagem 2x em uma tela 2x ou uma imagem 1x em uma tela 2x quando estiver em uma rede com largura de banda limitada.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

Além de carregar a imagem correta, o navegador também pode redimensioná-la
corretamente. Em outras palavras, o navegador considera que as imagens 2x são duas vezes maiores que as imagens 1x e, portanto, diminuirá o tamanho da imagem 2x em um fator dois para que essa imagem tenha o mesmo tamanho na página.

O suporte à função `image-set()` ainda é recente, sendo oferecido apenas no Google Chrome e no Safari com o prefixo de fornecedor `-webkit`.  Também é necessário ter cuidado ao incluir uma imagem de substituição para quando o recurso `image-set()` não for compatível, por exemplo:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/image-set.html" region_tag="imageset" lang=css %}
</pre>

No exemplo acima, o recurso apropriado será carregado nos navegadores que oferecem suporte ao `image-set`. Nos outros, a imagem 1x substituta será usada. A limitação óbvia é que enquanto a função `image-set()` não for amplamente aceita pelos navegadores, a maioria deles usará a imagem 1x.

## Use as consultas de mídia para fornecer imagens de alta resolução ou direção de arte

As consultas de mídia podem criar regras com base na [proporção de pixels do dispositivo](http://www.html5rocks.com/pt-BR/mobile/high-dpi/#toc-bg), possibilitando a especificação de diferentes imagens em telas 2x e 1x.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Google Chrome, Firefox e Opera oferecem suporte ao padrão `(min-resolution: 2dppx)`, mas o Safari e o Android exigem a sintaxe antiga com prefixo do fornecedor sem a unidade `dppx`.  Lembre-se, esses estilos só serão carregados se o dispositivo corresponder à consulta de mídia, sendo necessário especificar os estilos básicos.  Com isso, também existe o benefício de garantir que haverá uma imagem para ser processada no caso de o navegador não fornecer suporte a consultas de mídia para resoluções específicas.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/media-query-dppx.html" region_tag="mqdppx" lang=css %}
</pre>

Também é possível usar a sintaxe `min-width` para exibir imagens alternativas, dependendo do tamanho da janela de visualização.  Essa técnica apresenta a vantagem de que o download da imagem só será feito se a consulta de mídia for correspondida.  Por exemplo, o download e a aplicação de `bg.png` ao corpo da página só serão realizados se a largura do navegador tiver 500 px ou mais:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    	



