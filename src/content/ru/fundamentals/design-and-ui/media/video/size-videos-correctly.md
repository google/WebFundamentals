project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Размер видеофайла имеет значение, поскольку влияет на восприятие контента.

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# Корректно определите размер видеофайлов {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Размер видеофайла имеет значение, поскольку влияет на восприятие контента.


## TL;DR {: .hide-from-toc }
{# wf_TODO #}
Warning: A tag here did NOT convert properly, please fix! ''



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

<!-- TODO: Verify note type! -->
Note: При изменении размеров элемента не нарушайте изначального соотношения ширины и высоты видео. Сплющенное или вытянутое изображение выглядит не лучшим образом.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

Сравните <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">образец видео, настроенного в соответствии с концепцией отзывчивого дизайна</a>, с <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">видео, не учитывающим этой концепции</a>.




