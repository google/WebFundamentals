---
title: "Use SVG nos ícones"
description: "Ao adicionar ícones em sua página, use ícones vetoriais (SVG, na sigla em inglês) sempre que possível ou, em alguns casos, use caracteres unicode."
updated_on: 2014-06-10
key-takeaways:
  avoid-images:
    - "Use caracteres SVG ou unicode nos ícones, em vez de imagens de varredura."
---

<p class="intro">
  Ao adicionar ícones em sua página, use ícones vetoriais (SVG, na sigla em inglês) sempre que possível ou, em alguns casos, use caracteres unicode.
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Substitua os ícones de varredura por caracteres unicode

Muitas fontes incluem suporte para a grande variedade de caracteres unicode, que podem ser usados no lugar das imagens.  Ao contrário das imagens, as fontes unicode não apresentam problemas ao ser redimensionadas e mantêm uma boa aparência mesmo quando aparecem ampliadas ou diminuídas na tela.

Além do conjunto normal de caracteres, o formato unicode pode incluir símbolos para formas de números (&#8528;), setas (&#8592;), sinais matemáticos (&#8730;), formatos geométricos (&#9733;), imagens de controle (&#9654;), padrões de braile (&#10255;), notação musical (&#9836;), alfabeto grego (&#937;) e até mesmo peças de xadrez (&#9822;).

A inclusão de um caractere unicode é feita da mesma forma que as entidades nomeadas:`&#XXXX`, em que `XXXX` representa o número do caractere unicode.  Por exemplo:

{% highlight html %}
Você é uma &#9733;
{% endhighlight %}

Você é uma &#9733;

## Substitua os ícones complexos por SVG
Os ícones SVG geralmente são leves, fáceis de usar e podem ser usados em estilos com CSS, por isso, são mais indicados quando é necessário usar ícones mais complexos. Os caracteres SVG oferecem inúmeras vantagens sobre as imagens de varredura:

* São imagens vetoriais que podem ser redimensionadas infinitamente.
* Efeitos de CSS como cores, sombreamento, transparência e animações são simplificados.
* As imagens SVG podem ser inseridas in-line diretamente no documento.
* São semânticos.
* Fornecem melhor acessibilidade com os atributos apropriados.

&nbsp;

{% include_code src=_code/icon-svg.html snippet=iconsvg lang=html %}

## Use fontes de ícones com cuidado

As fontes de ícones são populares e de fácil utilização, mas apresentam algumas desvantagens em relação aos ícones SVG.

* São imagens vetoriais que podem ser redimensionadas infinitamente, mas também podem apresentar antisserrilhamento e gerar ícones que não têm a nitidez esperada.
* Possibilidades limitadas de uso em estilos CSS.
* O posicionamento perfeito dos pixels pode ser difícil, dependendo da altura da linha, do espaçamento entre as letras etc.
* Não são semânticos e podem ser difíceis de usar com leitores de tela ou outras formas de tecnologia de assistência.
* Quando não são configurados corretamente, o simples uso de um pequeno subconjunto dos ícones disponíveis pode gerar um grande arquivo. 


{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Exemplo de página que usa FontAwesome para os ícones de fontes.">
{% endlink_sample %}
{% include_code src=_code/icon-font.html snippet=iconfont lang=html %}

Existem centenas de fontes de ícones disponíveis, tanto gratuitos quanto pagos, incluindo [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [Pictos](http://pictos.cc/) e [Glyphicons](http://glyphicons.com/).

Não se esqueça de equilibrar a necessidade de usar os ícones com o peso da solicitação adicional de HTTP e o tamanho do arquivo.  Por exemplo, se você precisar apenas de alguns ícones, pode ser mais indicado usar uma imagem ou um painel de imagens.



