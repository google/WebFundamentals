---
title: "Корректно определите размер видеофайлов"
description: "Размер видеофайла имеет значение, поскольку влияет на восприятие контента."
updated_on: 2014-09-19
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
related-guides:
  media:
  -
      title: "Используйте медиазапросы CSS для повышения отзывчивости"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Основы отзывчивого веб-дизайна"
        href: layouts/rwd-fundamentals/
---

<p class="intro">
  Размер видеофайла имеет значение, поскольку влияет на восприятие контента.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.size-matters %}


## Проверьте размер видео

Реальный размер видеокадра может отличаться от размера элемента video (так же, как размеры демонстрируемого изображения могут отличаться от изначальных).

Чтобы проверить кодированный размер видео, используйте такие свойства элемента video, как videoWidth и videoHeight. Свойства width и height сообщают размеры элемента video, которые были определены с помощью атрибутов высоты и ширины CSS или встроенных атрибутов.

## Убедитесь, что видеофайлы не превышают максимальные размеры контейнеров

Когда элементы video слишком велики для области просмотра, они могут переполнить контейнер. В таком случае пользователь не сможет посмотреть видео или использовать
кнопки управления

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Скриншот Chrome для Android, вертикальная ориентация: немодифицированный элемент video превышает размеры области просмотра" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Скриншот Chrome для Android, горизонтальная ориентация: немодифицированный элемент video превышает размеры области просмотра" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Вы можете контролировать размеры видео с помощью JavaScript или CSS. Библиотеки и плагины JavaScript, такие как [FitVids](//fitvidsjs.com/), позволяют задать требуемый размер и соотношение сторон даже для Flash video с YouTube и других ресурсов.

Используйте [медиа-запросыCSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness), чтобы определить размер элементов в зависимости от размера области просмотра. `max-width: 100%` - отличный вариант!

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

Для медиаконтента в окнах iframe (в частности, видео на YouTube) попробуйте отзывчивый подход (например, [предложенный Джоном Сурдаковски](//avexdesigns.com/responsive-youtube-embed/)).

{% include shared/remember.liquid title="Remember" list=page.notes.dont-overflow %}

**CSS:**

{% include_code src=_code/responsive_embed.html snippet=styling lang=css %}

**HTML:**

{% include_code src=_code/responsive_embed.html snippet=markup lang=html %}

Сравните {% link_sample _code/responsive_embed.html %}образец видео, настроенного в соответствии с концепцией отзывчивого дизайна{% endlink_sample %}, с {% link_sample _code/unyt.html %}видео, не учитывающим этой концепции{% endlink_sample %}.




