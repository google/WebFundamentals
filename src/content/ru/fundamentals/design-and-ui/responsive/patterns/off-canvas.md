project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Приемы отзывчивого веб-дизайна быстро эволюционируют, но есть много проверенных вариантов, которые хорошо работают при использовании как настольных компьютеров, так и мобильных устройств

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Off Canvas (Вне экрана) {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}



Вместо того чтобы размещать элементы контента вертикально друг под другом, шаблон размещает контент, который используется редко, скажем, элементы навигации или меню приложения за пределами экрана, показывая его только тогда, когда это позволяет сделать размер экрана. На небольших же экранах контент можно открыть одним щелчком

{% link_sample _code/off-canvas.html %}
  <img src="imgs/off-canvas.svg">
  Попробовать
{% endlink_sample %}

В этом образце элементы контента не размещены вертикально друг под другом, а два контейнера 
`div` контента вынесены за пределы экрана с помощью `transform: translate(-250px, 0)`.  Для отображения
этих div используется JavaScript: к элементу, который необходимо показать на экране, добавляется класс open.  По мере
увеличения ширины экрана размещение элементов за пределами экрана убирается,и
они отображаются в пределах видимости.

По поводу этого образца следует отметить, что Safari для iOS 6 и Android Browser не поддерживают функцию 
`flex-flow: row nowrap` элемента`flexbox`, поэтому пришлось вернуться к
абсолютному позиционированию.

Сайты, созданные с использованием этого шаблона:

 * [HTML5Rocks
  Articles](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](http://www.google.com/nexus/)
 * [Сайт Facebook для мобильных устройств](https://m.facebook.com/)

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/off-canvas.html" region_tag="ocanvas" lang=css %}
</pre>


