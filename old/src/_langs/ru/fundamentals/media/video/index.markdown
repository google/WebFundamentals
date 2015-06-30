---
layout: section
title: "Видео"
description: "Узнайте, как легко и просто добавить видео на свой сайт, чтобы пользователи на любом устройстве получили удовольствие от его просмотра."
introduction: "Пользователи любят видео, ведь они могут быть забавными и полезными. На мобильных устройствах видео может оказаться простейшим способом получить нужную информацию. Однако видеофайлы снижают пропускную способность. К тому же они по-разному работают на разных платформах. Пользователи не любят ждать, когда видео загрузится. Они также не любят, когда нажимают кнопку `Воспроизвести` - и ничего не происходит. Здесь вы найдете информацию о том, как легко и просто добавить видео на свой сайт, чтобы пользователи на любом устройстве получили удовольствие от его просмотра."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 2
collection: introduction-to-media
id: videos
authors:
  - samdutton
key-takeaways:
  add-a-video:
    - Используйте элемент video для загрузки, декодирования и воспроизведения видео на своем сайте.
    - Запишите видео в нескольких форматах, адаптированных под различные мобильные платформы.
    - Установите корректный размер видеофайлов; он не должен превышать максимальный размер контейнеров.
    - Контент должен быть доступен пользователям с ограниченными возможностями. Добавьте track как дочерний элемент video.
remember:
  media-fragments:
    - Media Fragments API поддерживается большинством платформ за исключением iOS.
    - Убедитесь, что ваш сервер поддерживает запросы с диапазонами. Запросы с диапазонами по умолчанию включены на большинстве серверов, однако некоторые хостинги отключают их.
  dont-overflow:
    - При изменении размеров элемента не нарушайте изначального соотношения ширины и высоты видео. Сплющенное или вытянутое изображение выглядит не лучшим образом.
  accessibility-matters:
    - Элементы track поддерживаются в Chrome для Android, iOS Safari и всех существующих в настоящее время браузерах для ПК за исключением Firefox (более подробную информацию вы найдете по адресу <a href="http://caniuse.com/track" title="Браузеры, поддерживающие элементы track">caniuse.com/track</a>). Вы также можете использовать полизаполнения. Мы рекомендуем <a href='//www.delphiki.com/html5/playr/' title='Полизаполнение Playr'>Playr</a> или <a href='//captionatorjs.com/' title='Полизаполнение Captionator'>Captionator</a>.
  construct-video-streams:
    - MSE поддерживаются в браузерах Chrome и Opera для Android, а также Internet Explorer 11 и Chrome для ПК. В будущем планируется добавить поддержку <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Сроки внедрения подержки Media Source Extensions в Firefox'>Firefox</a>.
  optimize:
    - <a href="../images/">Изображения</a>
    - <a href="../../performance/optimizing-content-efficiency/">Оптимизация контента</a>
---

{% wrap content%}

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/j5fYOYrsocs?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

{% include modules/nextarticle.liquid %}

{% endwrap %}

