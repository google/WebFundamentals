project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Os padrões de design da Web responsivos estão evoluindo rapidamente, mas há muitos padrões estabelecidos que funcionam bem em dispositivos móveis e desktop.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Off canvas {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Em vez de empilhar o conteúdo verticalmente, o padrão off canvas remove o conteúdo usado com menos frequência, como menus de navegação ou de aplicativo, mostrando-os apenas quando o tamanho da tela for suficiente. Em telas menores, o conteúdo pode ser visto com um clique apenas.

{% link_sample _code/off-canvas.html %}
  <img src="imgs/off-canvas.svg">
  Tente
{% endlink_sample %}

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
 * [Google Nexus](http://www.google.com/nexus/)
 * [Facebook's Mobile Site](https://m.facebook.com/)

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/off-canvas.html" region_tag="ocanvas" lang=css %}
</pre>


