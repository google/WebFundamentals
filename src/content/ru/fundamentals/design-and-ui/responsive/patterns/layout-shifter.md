project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Приемы отзывчивого веб-дизайна быстро эволюционируют, но есть много проверенных вариантов, которые хорошо работают при использовании как настольных компьютеров, так и мобильных устройств

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Layout shifter (Двигающийся макет) {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Шаблон Layout shifter является наиболее отзывчивым, поскольку в нем предусмотрено наличие нескольких контрольных точек для экранов различной ширины

Основным отличием этого макета является то, что вместо перерасчета дерева отрисовки и
размещения столбцов друг под другом перемещается контент.  Из-за значительных различий между
основными контрольными точками, поддержка этого макета является более сложной задачей, кроме того, вероятно, придется менять
не только общий макет контента, но и его элементы.

{% link_sample _code/layout-shifter.html %}
  <img src="imgs/layout-shifter.svg">
  Попробовать
{% endlink_sample %}

В этом упрощенном образце показан шаблон Layout shifter: на небольших экранах
контент размещается вертикально, но он значительно меняется, когда экран становится
больше, с одним контейнером `div` слева и двумя расположенными друг под другом контейнерами `div` справа.

Сайты, созданные с использованием этого шаблона:

 * [Food Sense](http://foodsense.is/)
 * [Seminal Responsive Design
  Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/)

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/layout-shifter.html" region_tag="lshifter" lang=css %}
</pre>


