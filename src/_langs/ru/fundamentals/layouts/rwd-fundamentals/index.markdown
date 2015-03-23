---
layout: section
title: "Основы отзывчивого веб-дизайна"
description: "Большинство интернет-ресурсов не оптимизировано для просмотра на разных типах устройств. Изучив основы, вы узнаете, как обеспечить одинаково хорошую работу сайта на телефонах, планшетах, домашних компьютерах... в общем, на любых устройствах, у которых есть экран."
introduction: "Число пользователей, выходящих в Интернет с мобильных устройств, стремительно растет, но, к сожалению, большинство сетевых ресурсов не приспособлено для этого. Для каждого мобильного устройства необходим особый подход к расположению контента на экране из-за ограниченного размера дисплея."
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
authors:
  - petelepage
id: rwd-fundamentals
collection: multi-device-layouts
key-takeaways:
  set-viewport:
    - Чтобы контролировать масштабирование окна просмотра в браузере, используйте метатег viewport.
    - Добавьте <code>width=device-width</code>, чтобы адаптировать ширину окна просмотра к экрану устройства.
    - Вставьте <code>initial-scale=1</code>, чтобы обеспечить соотношение 1:1 между пикселями CSS и независимыми пикселями устройства.
    - Чтобы страница была доступна, проверьте, не отключено ли пользовательское масштабирование.
  size-content-to-vp:
    - Не используйте крупные элементы с фиксированной шириной.
    - Для корректного отображения контента не ограничивайте его определенной шириной области просмотра.
    - Используйте медиазапросы CSS, чтобы указать разные стили для больших и маленьких экранов.
  media-queries:
    - Медиазапросы также позволяют выбрать стиль на основе характеристик устройства.
    - Добавьте <code>min-width</code> вместо <code>min-device-width</code> для корректного отображения сайта на большинстве устройств.
    - Чтобы не нарушать структуру макета, используйте элементы относительных размеров.
  choose-breakpoints:
    - Создавайте контрольные точки на основе контента, а не для отдельных устройств, продуктов или брендов.
    - Сначала разработайте дизайн для самого маленького мобильного устройства, а затем переходите к версиям для больших экранов.
    - Ограничьте длину строк 70-80 символами.
remember:
  use-commas:
    - Разделяйте атрибуты запятыми, чтобы устаревшие версии браузеров могли их правильно интерпретировать.
shortlinks: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple19
udacity:
  id: ud893
  title: Responsive Web Design Fundamentals
  description: "Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more."
  image: imgs/udacity-rwd.png
---
{% wrap content %}

<style>
  .smaller-img {
    width: 60%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  video.responsiveVideo {
    width: 100%;
  }
</style>

{% comment %}
<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/oK09n_PGhTo?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>
{% endcomment %}

{% include modules/udacity.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}


Существует множество различных устройств с экранами всевозможных размеров: телефоны, `фаблеты`, планшетные и домашние ПК, игровые консоли, телевизоры и даже электронные аксессуары, которые можно носить прямо на себе.  Размеры экранов постоянно меняются, поэтому важно, чтобы сайт мог адаптироваться к любому из них - не только сейчас, но и в будущем.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Об отзывчивом веб-дизайне впервые написал [Итан Маркотт в статье журнала A List Apart](http://alistapart.com/article/responsive-web-design/). Это именно то, чего так не хватало устройствам и их пользователям.  Макет подстраивается под устройство, исходя из его возможностей и размера.  К примеру, определенный контент на телефоне располагается в одной колонке, а на планшете - в двух.

{% include modules/nextarticle.liquid %}

{% endwrap %}

