project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 64 for developers?
{% include "web/_shared/machine-translation-start.html" %}

{# wf_published_on: 2018-01-23 #}
{# wf_updated_on: 2018-03-05 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome64,new-in-chrome,observers,ux,regex,media,modules,responsive #}
{# wf_featured_snippet: Chrome 64 adds support for ResizeObservers, which will notify you when an element’s content rectangle has changed its size. Modules can now access to host specific metadata with import.metadata The pop-up blocker gets strong and plenty more. Let’s dive in and see what’s new for developers in Chrome 64! #}
{# wf_blink_components: N/A #}

# Новое в Chrome 64 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">  <iframe class="devsite-embedded-youtube-video" data-video-id="y5sb-icqOyg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</DIV>

* Поддержка [`ResizeObservers` ](#resizeobserver) будет уведомлять вас, когда прямоугольник содержимого элемента изменил свой размер.
* Модули теперь могут обращаться к конкретным метаданным узла с помощью [import.meta](#import-meta).
* Блокировщик всплывающих окон (0) становится сильным.
* [`window.alert()` ](#window-alert) больше не изменяет фокус.

И есть [много больше](#more)!

Я Пит Лепаж. Давайте погрузимся и посмотрим, что нового для разработчиков в Chrome 64!

<div class="clearfix"></div>

Note: Хотите получить полный список изменений? Проверьте [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140).

## `ResizeObserver` {: #resizeobserver }

Отслеживание при изменении размера элемента может быть немного болью. Скорее всего, вы присоедините слушателя к событию `resize` документа, затем вызовите `getBoundingClientRect` или `getComputedStyle` . Но, оба из них могут вызвать разметку макета.

И что, если окно браузера не изменило размер, но новый элемент был добавлен в документ? Или вы добавили `display: none` в элемент? Оба они могут изменять размер других элементов на странице.

`ResizeObserver` уведомляет вас всякий раз, когда изменяется размер элемента, и обеспечивает новую высоту и ширину элемента, что снижает риск переполнения макета.

Как и другие наблюдатели, использование его довольно просто, создайте объект `ResizeObserver` и передайте обратный вызов конструктору. Обратный вызов будет предоставлен массив `ResizeOberverEntries` - одна запись для наблюдаемого элемента, которая содержит новые измерения для элемента.

```js
const ro = new ResizeObserver( entries => {
  for (const entry of entries) {
    const cr = entry.contentRect;
    console.log('Element:', entry.target);
    console.log(`Element size: ${cr.width}px × ${cr.height}px`);
    console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
  }
});

// Observe one or multiple elements
ro.observe(someElement);
```

Проверьте [`ResizeObserver` : Это похоже на `document.onresize` для Elements](/web/updates/2016/10/resizeobserver) для более подробной информации и примеров из реального мира.


## Улучшенный блокировщик всплывающих окон {: #popup-blocker }

Я ненавижу tab-unders. Вы знаете их, это когда страница открывает всплывающее окно для какого-либо пункта назначения и перемещает страницу. Обычно одним из них является объявление или что-то, чего вы не хотели.

Начиная с Chrome 64, эти типы навигаций будут заблокированы, а Chrome покажет собственный пользовательский интерфейс для пользователя, что позволит им выполнить перенаправление, если они захотят.


## `import.meta` {: #import-meta }

При написании модулей JavaScript часто требуется доступ к метаданным, относящимся к конкретному хосту, о текущем модуле. Chrome 64 теперь поддерживает свойство `import.meta` в модулях и предоставляет URL-адрес модуля как `import.meta.url` .

Это действительно полезно, если вы хотите разрешить ресурсы по сравнению с файлом модуля в отличие от текущего HTML-документа.


## И больше! {: #more }

Это лишь некоторые из изменений в Chrome 64 для разработчиков, конечно же, есть еще много.

* Chrome теперь поддерживает [named capture](/web/updates/2017/07/upcoming-regexp-features#named_captures) и [Unicode escapes свойства](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes) в регулярных выражениях.
* Значение `preload` по умолчанию для элементов `<audio>` и `<video>` теперь является `metadata` . Это приводит Chrome в соответствие с другими браузерами и помогает сократить пропускную способность и использование ресурсов, загружая только метаданные, а не сам носитель.
* Теперь вы можете использовать `Request.prototype.cache` для просмотра режима кэширования `Request` и определить, является ли запрос запросом перезагрузки.
* Используя API управления фокусом, вы можете теперь сфокусировать элемент без прокрутки к нему с помощью атрибута `preventScroll` .

## `window.alert()` {: #window-alert }

О, и еще один! Хотя это не является «особенностью разработчика», это делает меня счастливым. `window.alert()` больше не приносит вкладку фона на передний план! Вместо этого предупреждение будет отображаться, когда пользователь переключится на эту вкладку.

Не более случайное переключение табуляции, потому что что-то произвело на меня `window.alert` . Я смотрю на вас старый Календарь Google.


Не забудьте [подписаться](https://goo.gl/6FP1a5) на наш [канал YouTube](https://www.youtube.com/user/ChromeDevelopers/), и вы получите уведомление по электронной почте всякий раз, когда мы запускаем новое видео, или добавим наш [RSS-канал](/web/shows/rss.xml) к вашему читателю фида.


Я Pete LePage, и как только Chrome 65 будет выпущен, я буду здесь, чтобы рассказать вам, что нового в Chrome!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}