project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Os padrões de design da Web responsivos estão evoluindo rapidamente, mas há muitos padrões estabelecidos que funcionam bem em dispositivos móveis e desktop

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Layout shifter {: .page-title }

{% include "_shared/contributors/TODO.html" %}



O padrão de mudança de layout é o padrão mais responsivo, com vários pontos de interrupção em várias larguras de tela.

Para este layout, a forma que o conteúdo se move é fundamental, em vez de fluir e
cair abaixo de outras colunas.  Devido às diferenças significativas entre cada
ponto de interrupção principal, é mais complexo de se manter e provavelmente envolve mudanças
dentro dos elementos, não apenas no layout de conteúdo geral.

{% link_sample _code/layout-shifter.html %}
  <img src="imgs/layout-shifter.svg">
  Tente
{% endlink_sample %}

Este exemplo simplificado mostra o padrão de mudança de layout, o conteúdo é empilhado verticalmente
em telas menores, mas muda significantemente conforme a tela 
aumenta, com um `div` à esquerda e dois `div` empilhados à direita.

Estes são alguns dos sites que usam esse padrão:

 * [Food Sense](http://foodsense.is/)
 * [Seminal Responsive Design
  Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/)

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/layout-shifter.html" region_tag="lshifter" lang=css %}
</pre>


