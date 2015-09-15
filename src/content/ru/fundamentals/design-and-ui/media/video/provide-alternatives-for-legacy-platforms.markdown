---
title: "Как настроить резервные варианты для устаревших платформ"
description: "Некоторые форматы видео поддерживаются не всеми платформами. Уточните, какие форматы поддерживаются основными платформами, и убедитесь, что ваше видео воспроизводится на каждой из них."
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
  Некоторые форматы видео не поддерживаются всеми платформами. Уточните, какие форматы поддерживаются основными платформами, и убедитесь, что ваше видео воспроизводится на каждой из них.
</p>

{% include shared/toc.liquid %}


## Проверьте, какие форматы поддерживаются

Чтобы уточнить, какие форматы видео поддерживаются, используйте canPlayType(). При этом способе берется строка аргументов, состоящая из mime-type и дополнительных кодеков, и возвращается одно из следующих значений:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Возвращаемое значение</th>
      <th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Возвращаемое значение">(пустая строка)</td>
      <td data-th="Описание">Контейнер и/или кодек не поддерживаются.</td>
    </tr>
    <tr>
      <td data-th="Возвращаемое значение"><code>maybe</code></td>
      <td data-th="Описание">
        Контейнер и кодеки, возможно, поддерживаются, но браузеру
        необходимо загрузить какой-либо видеофайл для проверки.
      </td>
    </tr>
    <tr>
      <td data-th="Возвращаемое значение"><code>probably</code></td>
      <td data-th="Описание">Видимо, формат поддерживается.
      </td>
    </tr>
  </tbody>
</table>

Ниже приведены примеры аргументов canPlayType() и возвращаемых значений при работе в Chrome:


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Тип</th>
      <th>Ответ на запрос</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Тип"><code>video/xyz</code></td>
      <td data-th="Ответ на запрос">(пустая строка)</td>
    </tr>
    <tr>
      <td data-th="Тип"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Ответ на запрос">(пустая строка)</td>
    </tr>
    <tr>
      <td data-th="Тип"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Ответ на запрос">(пустая строка)</td>
    </tr>
    <tr>
      <td data-th="Тип"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Ответ на запрос"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Тип"><code>video/webm</code></td>
      <td data-th="Ответ на запрос"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Тип"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Ответ на запрос"><code>probably</code></td>
    </tr>
  </tbody>
</table>


## Запишите видео в нескольких форматах

Существует целый ряд инструментов, с помощью которых можно сохранить видео в различных форматах:

* Инструменты для ПК: [FFmpeg](//ffmpeg.org/)
* GUI-приложения: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Онлайн-сервисы для кодирования и транскодирования: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## Проверьте, какие форматы использовались

Хотите знать, какой формат видео был на самом деле выбран браузером?

Чтобы получить данные о том, какой источник использовался, укажите в JavaScript свойство видео currentSrc.

Хотите посмотреть, как это работает? Вот {% link_sample _code/video-main.html %}пример{% endlink_sample %}. Chrome и Firefox используют chrome.webm (поскольку это первый пункт в списке поддерживаемых браузером форматов). В то же время Safari использует chrome.mp4.



