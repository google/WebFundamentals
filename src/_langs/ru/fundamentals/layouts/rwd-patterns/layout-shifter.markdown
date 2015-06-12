---
layout: article
title: "Layout shifter (Двигающийся макет)"
description: "Приемы отзывчивого веб-дизайна быстро эволюционируют, но есть много проверенных вариантов, которые хорошо работают при использовании как настольных компьютеров, так и мобильных устройств"
introduction: "Шаблон Layout shifter является наиболее отзывчивым, поскольку в нем предусмотрено наличие нескольких контрольных точек для экранов различной ширины"
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-10-21
  order: 3
priority: 1
collection: rwd-patterns
---

{% wrap content%}

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

{% include_code _code/layout-shifter.html lshifter css %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
