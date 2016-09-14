project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Приемы отзывчивого веб-дизайна быстро эволюционируют, но есть много проверенных вариантов, которые хорошо работают при использовании как настольных компьютеров, так и мобильных устройств

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Tiny Tweaks (Крошечные изменения) {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}



Шаблон Tiny Tweaks (Крошечные изменения) просто вносит небольшие изменения в макет, например, регулирует размер шрифта, меняет размер изображений или перемещает контент.

Он хорошо работает на таких макетах, состоящих из одного столбца, как одностраничные линейные веб-сайты и статьи
с большим количеством текста.

{% link_sample _code/tiny-tweaks.html %}
  <img src="imgs/tiny-tweaks.svg">
  Попробовать
{% endlink_sample %}

Как можно понять из названия шаблона, при изменении размера экрана в этот образец вносятся незначительные модификации.
По мере увеличения ширины экрана, больше становятся размер шрифта и поля вокруг текста.

Сайты, созданные с использованием этого шаблона:

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/patterns/_code/tiny-tweaks.html" region_tag="ttweaks"   adjust_indentation="auto" %}
</pre>


