project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Os padrões de Web design responsivo estão evoluindo rapidamente, mas há muitos padrões estabelecidos que funcionam bem em dispositivos móveis e computadores.

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-04-29 #}

# Padrões de Web design responsivo {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Os padrões de Web design responsivo estão evoluindo rapidamente, mas há muitos padrões estabelecidos que funcionam bem em dispositivos móveis e computadores.

A maioria dos layouts usados por páginas da Web responsivas pode ser categorizada em um de cinco
padrões: mostly fluid, column drop, layout shifter, tiny tweaks e off canvas.
Em alguns casos, uma página pode usar uma combinação de padrões, como column drop
e off canvas.  Esses padrões, originalmente identificados por [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514), fornecem um ponto de início
sólido para qualquer página responsiva.

### Os padrões

Para simplificar e facilitar a compreensão, cada exemplo abaixo foi criado com uma marcação real usando
[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes),
geralmente com três `div` de conteúdo contidos em um `div` de contêiner primário.
 Cada exemplo foi programado começando com a menor visualização e pontos de interrupção
foram adicionados conforme a necessidade.  O [modo flexbox layout também é bem
suportado](http://caniuse.com/#search=flexbox) por navegadores modernos, embora ainda
possa exigir a prefixação do fabricante para obter melhor suporte.

## Mostly fluid

O padrão mostly fluid consiste principalmente em uma grade fluida.  Em telas grandes ou
médias, ele geralmente permanece do mesmo tamanho, apenas ajustando as margens
em telas maiores.

Em telas menores, a grade fluida causa um refluxo do conteúdo principal,
enquanto as colunas são empilhadas verticalmente.  Uma grande vantagem desse padrão é
que geralmente exige apenas um ponto de interrupção entre telas pequenas e telas
grandes.

<img src="imgs/mostly-fluid.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/mostly-fluid.html" class="button button-primary">Experimente</a>

Na visualização menor, cada conteúdo `div` é empilhado verticalmente.  Quando a largura da
tela atinge 600 pixels, o conteúdo principal `div` permanece em `width: 100%`, enquanto o
`div` secundário é mostrado como duas colunas abaixo do `div` principal.  Acima de
800 pixels, a largura do contêiner `div` torna-se fixa e ele é centralizado na tela.

Estes são alguns dos sites que usam esse padrão:

 * [A List Apart](http://mediaqueri.es/ala/){: .external }
 * [Media Queries](http://mediaqueri.es/){: .external }
 * [SimpleBits](http://simplebits.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/mostly-fluid.html" region_tag="mfluid" adjust_indentation="auto" %}
</pre>

## Column drop 

Para layouts de várias colunas de largura completa, o column drop simplesmente empilha as colunas
verticalmente conforme a largura da janela fica estreita demais para o conteúdo.

Em algum momento, isso resultará em todas as colunas empilhadas verticalmente.  Selecionar
pontos de interrupção para esse padrão de layout depende do conteúdo e varia de acordo com
o design.

<img src="imgs/column-drop.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/column-drop.html" class="button button-primary">Experimente</a>

Como no exemplo do padrão mostly fluid, o conteúdo é empilhado verticalmente na menor
visualização, mas, conforme a tela se expande além de 600 pixels, o 
`div` do conteúdo primário e secundário utiliza a largura total da tela.  A ordem do `div` é definida usando
a ordem da propriedade CSS.  Em 800 pixels, todos os três conteúdos de `div` são mostrados, usando a
largura total da tela.

Estes são alguns dos sites que usam esse padrão:

 * [Modernizr](https://modernizr.com/){: .external }
 * [Wee Nudge](http://weenudge.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/column-drop.html" region_tag="cdrop" adjust_indentation="auto" %}
</pre>

## Layout shifter

O padrão layout shifter é o padrão mais responsivo, com vários
pontos de interrupção em várias larguras de tela.

O segredo desse layout é a forma com a qual o conteúdo se move, em vez de fluir e
cair abaixo de outras colunas.  Devido às diferenças significativas entre cada
ponto de interrupção principal, é mais complexo de se manter e provavelmente envolve mudanças
dentro dos elementos, não apenas no layout de conteúdo geral.

<img src="imgs/layout-shifter.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/layout-shifter.html" class="button button-primary">Experimente</a>

Este exemplo simplificado mostra o padrão layout shifter. O conteúdo é empilhado verticalmente
em telas menores, mas muda significantemente conforme a tela 
aumenta, com um `div` à esquerda e dois `div` empilhados à direita.

Estes são alguns dos sites que usam esse padrão:

 * [Food Sense](http://foodsense.is/){: .external }
 * [Exemplo de design responsivo
  seminal](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/layout-shifter.html" region_tag="lshifter" adjust_indentation="auto" %}
</pre>

## Tiny tweaks

O tiny tweaks simplesmente faz pequenas mudanças no layout, como ajustar o tamanho
da fonte, redimensionar imagens ou mover ligeiramente o conteúdo.

Isso funciona bem em layouts de coluna única, como sites de uma página linear e artigos com muito texto.

<img src="imgs/tiny-tweaks.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/tiny-tweaks.html" class="button button-primary">Experimente</a>

Como o nome em inglês implica, pouco muda no exemplo conforme o tamanho da tela muda.
Enquanto a largura da tela aumenta, o tamanho da fonte e o preenchimento a acompanham.

Estes são alguns dos sites que usam esse padrão:

 * [Ginger Whale](http://gingerwhale.com/){: .external }
 * [Future Friendly](http://futurefriendlyweb.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/tiny-tweaks.html" region_tag="ttweaks" adjust_indentation="auto" %}
</pre>


## Off canvas

Em vez de empilhar o conteúdo verticalmente, o padrão off canvas remove o conteúdo usado com menos
frequência &mdash; como menus de navegação ou de aplicativo &mdash; mostrando-os apenas
quando o tamanho da tela for suficiente. Em telas menores,
o conteúdo pode ser visto com apenas um clique.

<img src="imgs/off-canvas.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/off-canvas.html" class="button button-primary">Experimente</a>

Em vez de empilhar conteúdo verticalmente, este exemplo usa uma declaração `transform: translate(-250px, 0)` para ocultar dois `div` de conteúdo da tela.  O JavaScript é usado
para mostrar os divs adicionando uma classe aberta ao elemento para torná-lo visível.  Conforme a
tela fica maior, o posicionamento fora da tela é removido dos elementos e
eles são mostrados dentro da janela de visualização visível.

Observe nessa amostra, o Safari para iOS 6 e Android Browser não suportam o
recurso `flex-flow: row nowrap` do `flexbox`, portanto, tivemos que reverter para o
posicionamento absoluto.

Estes são alguns dos sites que usam esse padrão:

 * [Artigos do HTML5Rocks](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](https://www.google.com/nexus/){: .external }
 * [O site do Facebook para dispositivos móveis](https://m.facebook.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/off-canvas.html" region_tag="ocanvas" adjust_indentation="auto" %}
</pre>


{# wf_devsite_translation #}
