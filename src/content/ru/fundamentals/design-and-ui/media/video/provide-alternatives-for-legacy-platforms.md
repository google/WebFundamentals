project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Некоторые форматы видео поддерживаются не всеми платформами. Уточните, какие форматы поддерживаются основными платформами, и убедитесь, что ваше видео воспроизводится на каждой из них.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Как настроить резервные варианты для устаревших платформ {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Некоторые форматы видео не поддерживаются всеми платформами. Уточните, какие форматы поддерживаются основными платформами, и убедитесь, что ваше видео воспроизводится на каждой из них.



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

Хотите посмотреть, как это работает? Вот <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">пример</a>. Chrome и Firefox используют chrome.webm (поскольку это первый пункт в списке поддерживаемых браузером форматов). В то же время Safari использует chrome.mp4.



