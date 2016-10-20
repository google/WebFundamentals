project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Os padrões de design da Web responsivos estão evoluindo rapidamente, mas há muitos padrões estabelecidos que funcionam bem em dispositivos móveis e desktop


{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Responsive Web Design Patterns {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



Padrões de design da Web responsivos estão evoluindo rapidamente, mas há muitos padrões estabelecidos que funcionam bem entre os dispositivos móveis e desktop.


A maioria dos layouts usados por páginas da Web responsivas pode ser categorizada em um dos cinco
padrões: mostly fluid, column drop, layout shifter, tiny tweaks e off canvas.
Em alguns casos, a página pode usar uma combinação de padrões, por exemplo, column drop
e off canvas.  Esses padrões, originalmente identificados por [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514), fornecem um ponto de início
sólido para qualquer página responsiva.

## Os padrões

Para criar amostras simples e fáceis de entender, cada amostra
abaixo foi criada com uma marcação real usando
[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes),
geralmente com três `div` de conteúdo contidos dentro de um `div` de contêiner primário.
 Cada amostra foi escrita começando com a menor visualização e pontos de interrupção
foram adicionados conforme necessário.  O [modo flexbox layout também é bem
suportado](http://caniuse.com/#search=flexbox) por navegadores modernos, embora ainda
possa exigir a prefixação do fabricante para obter melhor suporte.




## Mostly fluid 




O padrão mais fluido consiste principalmente em uma grade fluida.  Em telas grandes ou médias, geralmente permanece do mesmo tamanho, apenas ajustando as margens em telas maiores.

Em telas menores, a grade de fluido causa um refluxo do conteúdo principal,
enquanto as colunas são empilhadas verticalmente.  Uma grande vantagem desse padrão é
que geralmente exige apenas um ponto de interrupção entre telas pequenas e telas
grandes.


<img src="imgs/mostly-fluid.svg">



Na exibição menor, cada conteúdo `div` é empilhado verticalmente.  Quando a largura da
tela atinge 600px, o conteúdo principal `div` permanece em `width: 100%`, enquanto o 
`div` secundário é mostrado como duas colunas abaixo do `div` primário.  Acima de
800px, a largura do contêiner `div` torna-se fixa e ele é centralizado na tela.

Estes são alguns dos sites que usam esse padrão:

 * [A List Apart](http://mediaqueri.es/ala/){: .external }
 * [Media Queries](http://mediaqueri.es/){: .external }
 * [SimpleBits](http://simplebits.com/){: .external }


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/mostly-fluid.html" region_tag="mfluid"   adjust_indentation="auto" %}
</pre>




## Column Drop 




Para layouts de várias colunas de largura completa, a queda da coluna simplesmente empilha as colunas verticalmente conforme a largura da janela fica estreita demais para o conteúdo.  

Eventualmente
isso resultará em todas as colunas empilhadas verticalmente.  Selecionar
pontos de interrupção para este padrão de layout depende do conteúdo e é muda de acordo com
 o design.


<img src="imgs/column-drop.svg">




Como a amostra mais fluida, o conteúdo é empilhado verticalmente na menor
visualização, mas conforme a tela se expande além de 600px, o 
`div` do conteúdoprimário e secundário utiliza a largura total da tela.  A ordem do `div` é definida usando
a ordem da propriedade CSS.  Em 800px, todos os três conteúdos de `div` são mostrados, usando a
largura total da tela.

Estes são alguns dos sites que usam esse padrão:

 * [Modernizr](http://modernizr.com/){: .external }
 * [Wee Nudge](http://weenudge.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/column-drop.html" region_tag="cdrop"   adjust_indentation="auto" %}
</pre>




## Layout shifter 




O padrão de mudança de layout é o padrão mais responsivo, com vários pontos de interrupção em várias larguras de tela.

Para este layout, a forma que o conteúdo se move é fundamental, em vez de fluir e
cair abaixo de outras colunas.  Devido às diferenças significativas entre cada
ponto de interrupção principal, é mais complexo de se manter e provavelmente envolve mudanças
dentro dos elementos, não apenas no layout de conteúdo geral.


<img src="imgs/layout-shifter.svg">



Este exemplo simplificado mostra o padrão de mudança de layout, o conteúdo é empilhado verticalmente
em telas menores, mas muda significantemente conforme a tela 
aumenta, com um `div` à esquerda e dois `div` empilhados à direita.

Estes são alguns dos sites que usam esse padrão:

 * [Food Sense](http://foodsense.is/){: .external }
 * [Seminal Responsive Design
  Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/layout-shifter.html" region_tag="lshifter"   adjust_indentation="auto" %}
</pre>




## Tiny tweaks 




Pequenos ajustes simples fazem pequenas mudanças no layout, como ajustar o tamanho da fonte, redimensionar imagens ou mover conteúdo em espaços bem pequenos.

Funciona bem em layouts de coluna única como sites de uma página linear, artigos
de texto pesado.


<img src="imgs/tiny-tweaks.svg">



Como o nome já diz, pequenas mudanças nesta amostra pois o tamanho da tela muda.
Conforme a largura da tela fica maior, também aumenta o tamanho da fonte e o preenchimento.

Estes são alguns dos sites que usam esse padrão:

 * [Opera's Shiny Demos](http://shinydemos.com/){: .external }
 * [Ginger Whale](http://gingerwhale.com/){: .external }
 * [Future Friendly](http://futurefriendlyweb.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/tiny-tweaks.html" region_tag="ttweaks"   adjust_indentation="auto" %}
</pre>




## Off canvas 




Em vez de empilhar o conteúdo verticalmente, o padrão off canvas remove o conteúdo usado com menos frequência, como menus de navegação ou de aplicativo, mostrando-os apenas quando o tamanho da tela for suficiente. Em telas menores, o conteúdo pode ser visto com um clique apenas.


<img src="imgs/off-canvas.svg">



Em vez de empilhar conteúdo verticalmente, essa amostra oculta dois
`div` de conteúdo da tela usando um `transform: translate(-250px, 0)`.  O JavaScript é usado
para mostrar os divs adicionando uma classe aberta ao elemento para torná-lo visível.  Conforme a
tela fica maior, o posicionamento fora da tela é removido dos elementos e
eles são mostrados dentro da porta de visualização visível.

Observe nessa amostra, o Safari para iOS 6 e Android Browser não suportam o
recurso `flex-flow: row nowrap` do `flexbox`, portanto, tivemos que reverter para o
posicionamento absoluto.

Estes são alguns dos sites que usam esse padrão:

 * [HTML5Rocks
  Articles](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](http://www.google.com/nexus/){: .external }
 * [Facebook's Mobile Site](https://m.facebook.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/off-canvas.html" region_tag="ocanvas"   adjust_indentation="auto" %}
</pre>


