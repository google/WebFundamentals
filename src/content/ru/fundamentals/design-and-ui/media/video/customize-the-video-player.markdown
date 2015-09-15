---
title: "Как настроить видеопроигрыватель"
description: "Различные платформы по-разному отображают видео. Мобильные решения должны учитывать ориентацию устройства. Для управления полноэкранным воспроизведением видео используйте Fullscreen API."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Используйте элемент video для загрузки, декодирования и воспроизведения видео на своем сайте."
    - "Запишите видео в нескольких форматах, адаптированных под различные мобильные платформы."
    - "Установите корректный размер видеофайлов; он не должен превышать максимальный размер контейнеров."
    - "Контент должен быть доступен пользователям с ограниченными возможностями. Добавьте track как дочерний элемент video."
notes:
  media-fragments:
    - "Media Fragments API поддерживается большинством платформ за исключением iOS."
    - "Убедитесь, что ваш сервер поддерживает запросы с диапазонами. Запросы с диапазонами по умолчанию включены на большинстве серверов, однако некоторые хостинги отключают их."
  dont-overflow:
    - "При изменении размеров элемента не нарушайте изначального соотношения ширины и высоты видео. Сплющенное или вытянутое изображение выглядит не лучшим образом."
  accessibility-matters:
    - "Элементы track поддерживаются в Chrome для Android, iOS Safari и всех существующих в настоящее время браузерах для ПК за исключением Firefox (более подробную информацию вы найдете по адресу <a href='http://caniuse.com/track' title='Браузеры, поддерживающие элементы track'>caniuse.com/track</a>). Вы также можете использовать полизаполнения. Мы рекомендуем <a href='//www.delphiki.com/html5/playr/' title='Полизаполнение Playr'>Playr</a> или <a href='//captionatorjs.com/' title='Полизаполнение Captionator'>Captionator</a>."
  construct-video-streams:
    - "MSE поддерживаются в браузерах Chrome и Opera для Android, а также в Internet Explorer 11 и Chrome для ПК. В будущем планируется добавить поддержку <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Сроки внедрения поддержки Media Source Extensions в Firefox'>Firefox</a>."
  optimize:
    - "<a href='../images/'>Изображения</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>Оптимизация контента</a>"
---

<p class="intro">
  Различные платформы по-разному отображают видео. Мобильные решения должны учитывать расположение устройства. Для управления полноэкранным воспроизведением видео используйте Fullscreen API.
</p>

{% include shared/toc.liquid %}


Различные платформы по-разному отображают видео. Мобильные решения должны учитывать ориентацию устройства. Для управления полноэкранным воспроизведением видео используйте Fullscreen API.

## Изменение ориентации на различных устройствах

Ориентация не имеет никакого значения для настольных компьютеров и ноутбуков - ведь они всегда находятся в одном положении. Однако при разработке веб-страниц для смартфонов и планшетов учитывать ориентацию устройств чрезвычайно важно.

Safari для iPhone отлично справляется с задачей переключения между вертикальной и горизонтальной ориентацией:

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Скриншот видеопроигрывателя в Safati на iPhone, вертикальная ориентация" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Скриншот видеопроигрывателя в Safati на iPhone, горизонтальная ориентация" src="images/iPhone-video-playing-landscape.png">
</div>

На iPad, а также в браузере Chrome для Android изменение ориентации устройства может оказаться более проблематичным.
В частности, ненастроенный видеопроигрыватель на iPad в горизонтальном расположении выглядит так:

<img class="center" alt="Скриншот видеопроигрывателя в Safati на iPad Retina, горизонтальная ориентация"
src="images/iPad-Retina-landscape-video-playing.png">

Если вы установите настройки видео "width: 100%" или "max-width: 100%" с помощью CSS, это поможет решить многие проблемы, связанные с ориентацией устройства. Вы также можете использовать полноэкранный режим просмотра.

## Встроенное видео или полноэкранный режим

Различные платформы по-разному отображают видео. Safari для iPhone отображает элемент video как встроенный в веб-страницу, однако воспроизводит его в полноэкранном режиме:

<img class="center" alt="Скриншот видео на iPhone, вертикальная ориентация" src="images/iPhone-video-with-poster.png">

На устройствах Android пользователь может запустить полноэкранный режим, нажав на соответствующий значок. Однако по умолчанию видео будет воспроизводиться как встроенное:

<img class="center" alt="Скриншот видео в Chrome для Android, вертикальная ориентация" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Safari для iPad воспроизводит видео как встроенное:

<img class="center" alt="Скриншот видео в Safari для iPad Retina, горизонтальная ориентация" src="images/iPad-Retina-landscape-video-playing.png">

## Управление полноэкранным отображением контента

Платформы, которые не запускают автоматически полноэкранный режим, [в большинстве случаев поддерживают](//caniuse.com/fullscreen) Fullscreen API. Используйте этот API для управления полноэкранным отображением видео или страницы.

Полноэкранное отображение элемента, например video:
{% highlight javascript %}
elem.requestFullScreen();
{% endhighlight %}

Полноэкранное отображение всего документа:
{% highlight javascript %}
document.body.requestFullScreen();
{% endhighlight %}

Вы также можете установить прослушивание событий, связанных с изменением полноэкранного режима:
{% highlight javascript %}
video.addEventListener("fullscreenchange", handler);
{% endhighlight %}

Или проверить, отображается ли элемент в полноэкранном режиме:
{% highlight javascript %}
console.log("In full screen mode: ", video.displayingFullscreen);
{% endhighlight %}

Кроме того, вы можете использовать псевдо-класс CSS `fullscreen` для изменения способа отображения элементов в полноэкранном режиме.

На устройствах, поддерживающих Fullscreen API, вы можете использовать значки для обозначения места под видео:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
  <p>Этот браузер не поддерживает элемент video.</p>
</video>

Хотите посмотреть, как это работает? Тогда вам {% link_sample _code/fullscreen.html %}сюда{% endlink_sample %}.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



