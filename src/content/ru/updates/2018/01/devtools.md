project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Local Overrides, accessibility tools, performance and SEO audits, and more.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-17 #}
{# wf_tags: chrome65,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Local Overrides, accessibility tools, performance and SEO audits, and more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Что нового в DevTools (Chrome 65) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Новые функции, входящие в DevTools в Chrome 65, включают:

* [**Local Overrides**](#overrides)
* [New accessibility tools](#a11y)
* [The **Changes** tab](#changes)
* [New SEO and performance audits](#audits)
* [Multiple recordings in the **Performance** panel](#recordings)
* [Reliable code stepping with workers and asynchronous code](#stepping)

Читайте дальше или смотрите видео-версию этих примечаний к выпуску ниже.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="D1pV7ermy6w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Note: Проверьте, какая версия Chrome вы используете в `chrome://version` . Если вы используете более раннюю версию, эти функции не будут существовать. Если вы используете более позднюю версию, эти функции могут быть изменены. Chrome автоматически обновляет новую основную версию каждые 6 недель.

## Локальная переопределяет {: #overrides }

**Локальные перестановки** позволяют вносить изменения в DevTools и сохранять эти изменения при загрузке страниц. Раньше любые изменения, которые вы делали в DevTools, терялись при перезагрузке страницы.
**Локальные переопределения** работают для большинства типов файлов с несколькими исключениями. См. Раздел [Limitations](#overrides-limitations) .

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/overrides.gif"
       alt="Persisting a CSS change across page loads with Local Overrides."/>
  <figcaption>
    <b>Figure 1</b>. Persisting a CSS change across page loads with <b>Local Overrides</b>
  </figcaption>
</figure>

Как это устроено:

* Вы указываете каталог, в котором DevTools должен сохранять изменения.
* Когда вы вносите изменения в DevTools, DevTools сохраняет копию измененного файла в ваш каталог.
* Когда вы перезагружаете страницу, DevTools обслуживает локальный, измененный файл, а не сетевой ресурс.

Для настройки **Локальные переадресации**:

1. Откройте панель **Sources**. 1. Откройте вкладку **Переопределения**.

     <figure>
       <img src="/web/updates/images/2018/01/overrides.png"
            alt="The Overrides tab"/>
       <figcaption>
         <b>Figure 2</b>. The <b>Overrides</b> tab
       </figcaption>
     </figure>

1. Щелкните **Настройка переопределения**. 1. Выберите каталог, в который вы хотите сохранить изменения. 1. В верхней части окна просмотра щелкните **Разрешить**, чтобы дать DevTools доступ для чтения и записи в каталог. 1. Внесите свои изменения.

### Ограничение {: #overrides-limitations }

* DevTools не сохраняет изменения, внесенные в **DOM Tree** панели **Elements**. Измените HTML на панели **Sources**.
* Если вы редактируете CSS на панели **Styles**, а источником этого CSS является HTML-файл, DevTools не сохранит это изменение. Отредактируйте HTML-файл на панели **Sources**.

### Связанные функции {: #overrides-related }

* [Workspaces][WS] . DevTools автоматически отображает сетевые ресурсы в локальный репозиторий. Всякий раз, когда вы вносите изменения в DevTools, это изменение также сохраняется в вашем локальном репозитории.

[WS]: /web/updates/2017/10/devtools-release-notes#workspaces

## «Изменения» {: #changes }

Отслеживайте изменения, которые вы делаете локально в DevTools с помощью новой вкладки **Изменения**.

<figure>
  <img src="/web/updates/images/2018/01/changes.png"
       alt="The Changes tab"/>
  <figcaption>
    <b>Figure 3</b>. The <b>Changes</b> tab
  </figcaption>
</figure>

## Новые инструменты доступности {: #a11y }

Используйте новую панель **Доступность**, чтобы проверить свойства доступности элемента, и проверьте коэффициент контрастности текстовых элементов в **Color Picker**, чтобы убедиться, что они доступны для пользователей с нарушениями зрения или цветом недостатки.

### возможностей {: #a11y-pane }

Используйте панель **Доступность** на панели **Элементы**, чтобы исследовать свойства доступности выбранного в данный момент элемента.

<figure>
  <img src="/web/updates/images/2018/01/a11y-pane.png"
       alt="The Accessibility pane shows the ARIA attributes and computed
            properties for the element that's currently selected in the DOM Tree of
            the Elements panel, as well as its position in the accessibility tree."/>
  <figcaption>
    <b>Figure 4</b>. The <b>Accessibility</b> pane shows the ARIA attributes
    and computed properties for the element that's currently selected in the <b>DOM Tree</b> on
    the <b>Elements</b> panel, as well as its position in the accessibility tree
  </figcaption>
</figure>

Посмотрите на A11ycast от Rob Dodson по маркировке ниже, чтобы увидеть панель ** Доступность ** в действии.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="8dCUzOiMRy4"
          data-autohide="1" data-showinfo="0" frameborder="0"
          data-start="350" allowfullscreen>
  </iframe>
</div>

### Контрастность в {: #contrast } цветов {: #contrast }

В [Color Picker][CP] теперь отображается коэффициент контрастности текстовых элементов. Увеличение коэффициента контрастности текстовых элементов делает ваш сайт более доступным для пользователей с нарушениями зрения и недостатками цветового зрения. См. [Color and contrast][contrast] чтобы узнать больше о том, как коэффициент контрастности влияет на доступность.

Улучшение цветового контраста ваших текстовых элементов делает ваш сайт более удобным для <i>всех</i> пользователей. Другими словами, если ваш текст серый с белым фоном, это трудно для кого-то читать.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-collapsed.png"
       alt="Inspecting the contrast ratio of the highlighted H1 element."/>
  <figcaption>
    <b>Figure 5</b>. Inspecting the contrast ratio of the highlighted <code>h1</code> element
  </figcaption>
</figure>

В **Рисунок 5**, две галочки рядом с **4.61** означают, что этот элемент соответствует [enhanced recommended contrast ratio (AAA)][enhanced]{:.external} . Если бы у него была только одна галочка, это означало бы, что она встретила [minimum recommended contrast ratio (AA)][minimum]{:.external} .

[enhanced]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7
[minimum]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast

Нажмите **Показать больше**! [Show More][SM]{:.cdt-inl} чтобы расширить раздел **Контрастность**. Белая линия в поле **Цветной спектр** обозначает границу между цветами, которые соответствуют рекомендуемому коэффициенту контрастности, и тем, которые этого не делают. Например, поскольку серый цвет в
**Рисунок 6** соответствует рекомендациям, это означает, что все цвета под белой линией также соответствуют рекомендациям.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-expanded.png"
       alt="The expanded Contrast Ratio section."/>
  <figcaption>
    <b>Figure 6</b>. The expanded <b>Contrast Ratio</b> section
  </figcaption>
</figure>

[CP]: /web/tools/chrome-devtools/css/reference#color-picker
[contrast]: /web/fundamentals/accessibility/accessible-styles#color_and_contrast
[SM]: /web/updates/images/2018/01/show-more.png

#### Связанные функции {: #contrast-related }

Панель **Audits** имеет автоматизированный аудит доступности для обеспечения того, чтобы
*каждый* текстовый элемент на странице имеет достаточный коэффициент контрастности.

См. [Run Lighthouse in Chrome DevTools][audit] или смотрите A11ycast ниже, чтобы узнать, как использовать панель **Audits** для проверки доступности.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="b0Q5Zp_yKaU"
          data-autohide="1" data-showinfo="0" frameborder="0"
          allowfullscreen>
  </iframe>
</div>

[audit]: /web/tools/lighthouse/#devtools

## Новые проверки {: #audits }

Chrome 65 поставляется с совершенно новой категорией аудита SEO и многими новыми аудитами эффективности.

Note: Панель **Audits** работает от [Lighthouse][LH] . Chrome 64 запускает Lighthouse версии 2.5. Chrome 65 запускает Lighthouse версии 2.8. Таким образом, этот раздел представляет собой просто сводку обновлений Lighthouse от 2.6, 2.7 и 2.8.

### Новые аудит SEO {: #seo }

Обеспечение того, чтобы ваши страницы проходили каждый аудит в новой категории **SEO**, может помочь улучшить рейтинг вашей поисковой системы.

<figure>
  <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category of audits."/>
  <figcaption>
    <b>Figure 7</b>. The new <b>SEO</b> category of audits
  </figcaption>
</figure>

### Новые аудиты эффективности {: #performance }

Chrome 65 также обладает множеством новых аудитов эффективности:

* Время загрузки JavaScript высок
* Использует неэффективную политику кэша для статических активов
* Избегает перенаправления страниц
* Документ использует плагины
* Минимизировать CSS
* Минимизировать JavaScript

<aside class="key-point">
  <b>Perf matters!</b> After Mynet improved their page load speed by 4X, users spent 43% more time
  on the site, viewed 34% more pages, bounce rates dropped 24%, and revenue increased 25% per
  article pageview. <a href="/web/showcase/2017/mynet">Learn more</a>.
</aside>

<aside class="success">
  <b>Tip!</b> If you want to improve the load performance of your pages, but don't know where
  to start, try the <b>Audits</b> panel. You give it a URL, and it gives you a detailed report
  on many different ways you can improve that page. <a href="/web/tools/lighthouse/#devtools">Get
  started</a>.
</aside>

### Другие обновления {: #audits-other }

* [New, manual accessibility audits](/web/updates/2018/01/lighthouse#a11y)
* [Updates to the WebP audit][webp] чтобы сделать его более содержательным для других форматов изображений следующего поколения
* [A rehaul of the accessibility score][a11yscore]
* Если аудит доступности недоступен для страницы, этот аудит больше не учитывает оценку доступности
* Производительность теперь является верхней частью отчетов

[seoaudits]: /web/updates/2018/01/lighthouse#seo
[webp]: /web/updates/2018/01/lighthouse#webp
[a11yscore]: /web/updates/2017/12/lighthouse#a11y
[LH]: /web/tools/lighthouse
[2.6]: /web/updates/2017/12/lighthouse
[2.7]: /web/updates/2018/01/lighthouse

## Надежный кодовый шаг с рабочими и асинхронный код {: #stepping }

Chrome 65 добавляет обновления в **Step Into**! Кнопка [Step Into][into]{:.cdt-inl} при [Step Into][into]{:.cdt-inl} в код, который передает сообщения между потоками и асинхронный код. Если вы хотите предыдущее поведение при шаге, вы можете использовать новый **Шаг**! [Step][step]{:.cdt-inl} кнопки [Step][step]{:.cdt-inl} .

[into]: /web/tools/chrome-devtools/javascript/imgs/step-into.png
[step]: /web/tools/chrome-devtools/javascript/imgs/step.png

### кода, передающего сообщения между потоками. {: #workers }

Когда вы входите в код, который передает сообщения между потоками, DevTools теперь показывает вам, что происходит в каждом потоке.

Например, приложение в **Рисунок 8** передает сообщение между основным потоком и рабочим потоком. После `postMessage()` вызов `postMessage()` в основном потоке DevTools приостанавливается в обработчике `onmessage` в рабочем потоке. Обработчик `onmessage` сам `onmessage` сообщение обратно в основной поток. Вступая в * этот * вызов, паузы DevTools возвращаются в основной поток.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 65."/>
  <figcaption>
    <b>Figure 8</b>. Stepping into message-passing code in Chrome 65
  </figcaption>
</figure>

Когда вы вступили в такой код в более ранних версиях Chrome, Chrome показал вам основную часть кода, как вы можете видеть в **Рисунок 9**.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 63."/>
  <figcaption>
    <b>Figure 9</b>. Stepping into message-passing code in Chrome 63
  </figcaption>
</figure>

### в асинхронный код {: #async }

При вступлении в асинхронный код DevTools теперь предполагает, что вы хотите приостановить асинхронный код, который в конечном итоге будет работать.

Например, в **Рисунок 10** после `setTimeout()` в `setTimeout()` , DevTools запускает весь код, ведущий к этой точке за кулисами, а затем делает паузу в функции, переданной в `setTimeout()` .

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 65."/>
  <figcaption>
    <b>Figure 10</b>. Stepping into asynchronous code in Chrome 65
  </figcaption>
</figure>

Когда вы вступили в такой код в Chrome 63, DevTools приостановился в коде, поскольку он хронологически работал, как вы можете видеть в **Рисунок 11**.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 63."/>
  <figcaption>
    <b>Figure 11</b>. Stepping into asynchronous code in Chrome 63
  </figcaption>
</figure>

## Несколько записей в панели Performance {: #recordings }

Панель **Performance** теперь позволяет временно сохранить до 5 записей. Записи удаляются при закрытии окна DevTools. См. [Get Started with Analyzing Runtime Performance][runtime] чтобы получить [Get Started with Analyzing Runtime Performance][runtime] к панели **Performance**.

[runtime]: /web/tools/chrome-devtools/evaluate-performance/

<figure>
  <img src="/web/updates/images/2018/01/recordings.png"
       alt="Selecting between multiple recordings in the Performance panel."/>
  <figcaption>
    <b>Figure 12</b>. Selecting between multiple recordings in the <b>Performance</b> panel
  </figcaption>
</figure>

## : автоматизация действий DevTools с помощью Puppeteer 1.0 {: #puppeteer }

Note: Этот раздел не относится к Chrome 65.

Версия 1.0 Puppeteer, инструмент автоматизации браузера, поддерживаемый командой Chrome DevTools, теперь отсутствует. Вы можете использовать Puppeteer для автоматизации многих задач, которые ранее были доступны только через DevTools, например, для захвата скриншотов:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await page.screenshot({path: 'example.png'});
      await browser.close();
    })();

Он также имеет API-интерфейсы для множества обычно полезных задач автоматизации, таких как создание PDF-файлов:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
      await page.pdf({path: 'hn.pdf', format: 'A4'});
      await browser.close();
    })();

См. [Quick Start][quickstart] чтобы узнать больше.

[quickstart]: /web/tools/puppeteer/get-started

Вы также можете использовать Puppeteer для раскрытия функций DevTools во время просмотра без явного открытия DevTools. См. [Using DevTools Features Without Opening DevTools][without] .

[without]: /web/updates/2018/01/devtools-without-devtools

## Запрос от команды DevTools: рассмотрите Canary {: #canary }

Если вы находитесь на Mac или Windows, рассмотрите возможность использования [Chrome Canary][canary] качестве браузера по умолчанию. Если вы сообщаете об ошибке или изменениях, которые вам не нравятся, пока они все еще находятся в Канарее, команда DevTools может быстрее реагировать на ваши отзывы.

Note: Канарейка - это хронистая версия Chrome. Он выпущен сразу после его сборки, без тестирования. Это означает, что Канарейка прерывается время от времени, примерно раз в месяц, и обычно это фиксируется в течение дня. Вы можете вернуться к использованию Chrome Stable, когда Канарейский перерыв.

[canary]: https://www.google.com/chrome/browser/canary.html

## Обратная связь {: #feedback }

Лучшее место для обсуждения любых функций или изменений, которые вы видите здесь, - это [google-chrome-developer-tools@googlegroups.com mailing list][ML] . Вы также можете чирикать нас на [@ChromeDevTools](https://twitter.com/chromedevtools) если у вас короткое время. Если вы уверены, что столкнулись с ошибкой в ​​DevTools, пожалуйста, используйте [open an issue](https://crbug.com/new) .

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## Предыдущие заметки о выпуске {: #links }

См. Тег [devtools-whatsnew][tag] для ссылок на все предыдущие заметки о выпуске DevTools.

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}
