project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Большинство интернет-ресурсов не оптимизировано для просмотра на разных типах устройств. Изучив основы, вы узнаете, как обеспечить одинаково хорошую работу сайта на телефонах, планшетах, домашних компьютерах... в общем, на любых устройствах, у которых есть экран.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Основы отзывчивого веб-дизайна {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Число пользователей, выходящих в Интернет с мобильных устройств, стремительно растет, но, к сожалению, большинство сетевых ресурсов не приспособлено для этого. Для каждого мобильного устройства необходим особый подход к расположению контента на экране из-за ограниченного размера дисплея.


{% comment %}
<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="oK09n_PGhTo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>
{% endcomment %}


## Responsive Web Design Fundamentals
<!-- TODO: Verify Udacity course fits here -->
<div class="attempt-right">
  <figure>
    <img src="imgs/udacity-rwd.png">
  </figure>
</div>

Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more.

[View Course](https://udacity.com/ud893){: .external }




Существует множество различных устройств с экранами всевозможных размеров: телефоны, `фаблеты`, планшетные и домашние ПК, игровые консоли, телевизоры и даже электронные аксессуары, которые можно носить прямо на себе.  Размеры экранов постоянно меняются, поэтому важно, чтобы сайт мог адаптироваться к любому из них - не только сейчас, но и в будущем.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Об отзывчивом веб-дизайне впервые написал [Итан Маркотт в статье журнала A List Apart](http://alistapart.com/article/responsive-web-design/). Это именно то, чего так не хватало устройствам и их пользователям.  Макет подстраивается под устройство, исходя из его возможностей и размера.  К примеру, определенный контент на телефоне располагается в одной колонке, а на планшете - в двух.



