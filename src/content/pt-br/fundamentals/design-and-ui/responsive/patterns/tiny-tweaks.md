project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Os padrões de design da Web responsivos estão evoluindo rapidamente, mas há muitos padrões estabelecidos que funcionam bem em dispositivos móveis e desktop

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Tiny tweaks {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Pequenos ajustes simples fazem pequenas mudanças no layout, como ajustar o tamanho da fonte, redimensionar imagens ou mover conteúdo em espaços bem pequenos.

Funciona bem em layouts de coluna única como sites de uma página linear, artigos
de texto pesado.

{% link_sample _code/tiny-tweaks.html %}
  <img src="imgs/tiny-tweaks.svg">
  Tente
{% endlink_sample %}

Como o nome já diz, pequenas mudanças nesta amostra pois o tamanho da tela muda.
Conforme a largura da tela fica maior, também aumenta o tamanho da fonte e o preenchimento.

Estes são alguns dos sites que usam esse padrão:

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/tiny-tweaks.html" region_tag="ttweaks" lang=css %}
</pre>


