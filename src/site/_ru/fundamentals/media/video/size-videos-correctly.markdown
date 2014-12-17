---
layout: article
title: "Корректно определите размер видеофайлов"
description: "Размер видеофайла имеет значение, поскольку влияет на восприятие контента."
introduction: "Размер видеофайла имеет значение, поскольку влияет на восприятие контента."
article:
  written_on: 2014-04-16
  updated_on: 2014-09-19
  order: 3
collection: videos
authors:
  - samdutton
key-takeaways:
  размер имеет значение:
    - Не используйте видео с размером кадра или разрешением больше, чем может обработать платформа.
    - Не делайте видео длиннее необходимого.
    - Излишняя длина видео может стать причиной задержек при загрузке и навигации по файлу. Некоторые браузеры не начинают воспроизведение видео до тех пор, пока не загрузят его.
remember:
  media-fragments:
    - Media Fragments API поддерживается большинством платформ за исключением iOS.
    - Убедитесь, что ваш сервер поддерживает запросы с диапазонами. Запросы с диапазонами по умолчанию включены на большинстве серверов, однако некоторые хостинги отключают их.
  dont-overflow:
    - При изменении размеров элемента не нарушайте изначального соотношения ширины и высоты видео. Сплющенное или вытянутое изображение выглядит не лучшим образом.
  accessibility-matters:
    - Элементы track поддерживаются в Chrome для Android, iOS Safari и всех существующих в настоящее время браузерах для ПК за исключением Firefox (более подробную информацию вы найдете по адресу <a href="http://caniuse.com/track" title="Браузеры, поддерживающие элементы track">caniuse.com/track</a>). Вы также можете использовать полизаполнения. Мы рекомендуем <a href='//www.delphiki.com/html5/playr/' title='Полизаполнение Playr'>Playr</a> или <a href='//captionatorjs.com/' title='Полизаполнение Captionator'>Captionator</a>.
  construct-video-streams:
    - MSE поддерживаются в браузерах Chrome и Opera для Android, а также в Internet Explorer 11 и Chrome для ПК. В будущем планируется добавить поддержку <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Сроки внедрения поддержки Media Source Extensions в Firefox'>Firefox</a>.
  optimize:
    - <a href="../images/">Изображения</a>
    - <a href="../../performance/optimizing-content-efficiency/">Оптимизация контента</a>
related:
  media:
  -
      title: "Используйте медиазапросы CSS для повышения отзывчивости"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Основы отзывчивого веб-дизайна"
        href: layouts/rwd-fundamentals/
---

{% wrap content%}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.size-matters %}

<style>

  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

</style>

## Проверьте размер видео

Реальный размер видеокадра может отличаться от размера элемента video (так же, как размеры демонстрируемого изображения могут отличаться от изначальных).

Чтобы проверить кодированный размер видео, используйте такие свойства элемента video, как videoWidth и videoHeight. Свойства width и height сообщают размеры элемента video, которые были определены с помощью атрибутов высоты и ширины CSS или встроенных атрибутов.

## Убедитесь, что видеофайлы не превышают максимальные размеры контейнеров

Когда элементы video слишком велики для области просмотра, они могут переполнить контейнер. В таком случае пользователь не сможет посмотреть видео или использовать
кнопки управления

<div class="clear">
    <img class="g-wide--1 g-medium--half" alt="Скриншот Chrome для Android, вертикальная ориентация: немодифицированный элемент video превышает размеры области просмотра" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="g-wide--2 g-wide--last g-medium--half g--last" alt="Скриншот Chrome для Android, горизонтальная ориентация: немодифицированный элемент video превышает размеры области просмотра" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Вы можете контролировать размеры видео с помощью JavaScript или CSS. Библиотеки и плагины JavaScript, такие как [FitVids](//fitvidsjs.com/), позволяют задать требуемый размер и соотношение сторон даже для Flash video с YouTube и других ресурсов.

Используйте [медиа-запросыCSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness), чтобы определить размер элементов в зависимости от размера области просмотра. `max-width: 100%` - отличный вариант!

{% include modules/related_guides.liquid inline=true list=page.related.media %}

Для медиаконтента в окнах iframe (в частности, видео на YouTube) попробуйте отзывчивый подход (например, [предложенный Джоном Сурдаковски](//avexdesigns.com/responsive-youtube-embed/)).

{% include modules/remember.liquid title="Remember" list=page.remember.dont-overflow %}

**CSS:**

{% include_code _code/responsive_embed.html styling css %}

**HTML:**

{% include_code _code/responsive_embed.html markup html %}

Сравните {% link_sample _code/responsive_embed.html %}образец видео, настроенного в соответствии с концепцией отзывчивого дизайна{% endlink_sample %}, с {% link_sample _code/unyt.html %}видео, не учитывающим этой концепции{% endlink_sample %}.


{% include modules/nextarticle.liquid %}

{% endwrap %}

