project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Что нового в Chrome 77 для разработчиков?

{# wf_published_on: 2019-09-16 #} {# wf_updated_on: 2019-09-17 #} {#
wf_featured_image: /web/updates/images/2019/09/new-77.jpg #} {# wf_tags:
chrome77,new-in-chrome,chromedevsummit,forms,formdata,lazy-loading,performance
#} {# wf_featured_snippet: Chrome 77 is rolling out now! There’s a better way to
track the performance of your site with Largest Contentful Paint. Forms get some
new capabilities. Native lazy loading is here. The Chrome DevSummit is happening
November 11-12 2019. And plenty more. Let’s dive in and see what’s new for
developers in Chrome 77! #} {# wf_blink_components: N/A #}

# Новое в Chrome 77 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

Chrome 77 уже выпущен!

<div class="video-wrapper">
<iframe class="devsite-embedded-youtube-video" data-video-id="S8aVB3IfOR4"
data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

- Новый лучший способ отслеживать производительность вашего сайта с помощью
[Largest Contentful Paint](#lcp).
- Формы получают [новые возможности](#new-forms-capabilities).
- [Нативная ленивая загрузка](#lazy-loading).
- [Chrome DevSummit 2019](#cds2019) пройдёт 11-12 ноября 2019 года.
- И многое [другое](#more) .

Я [Пит Лепейдж](https://twitter.com/petele), давайте погрузимся и посмотрим, что
нового для разработчиков в Chrome 77!

<div class="clearfix"></div>

## Отрисовка самого большого содержимого (Largest Contentful Paint) {: #lcp }

Понять и оценить реальную производительность вашего сайта может быть сложно.
Такие метрики, как `load` или `DOMContentLoaded`, не сообщают вам, что видит
пользователь на экране. Первичная отрисовка (First Paint) и Первичная отрисовка
содержимого (First Contentful Paint) - это только начало опыта. Первичная
значимая отрисовка (First Meaningful Paint) лучше, но она сложная, а иногда и
неправильная.

<img src="/web/updates/images/2019/09/perf-metrics-load-timeline.png">

**Largest Contentful Paint API**, доступный начиная с Chrome 77, сообщает время
рендеринга самого большого элемента контента, видимого в области просмотра, и
позволяет измерять, когда загружается основное содержимое страницы.

<img src="/web/updates/images/2019/09/lcp-google-filmstrip.png">

Чтобы измерить Largest Contentful Paint, вам нужно использовать Performance
Observer и искать события с `largest-contentful-paint` .

```js
let lcp;
const po = new PerformanceObserver((eList) => {
  const e = eList.getEntries();
  const last = e[e.length - 1];
  lcp = last.renderTime || last.loadTime;
});

const poOpts = {
  type: 'largest-contentful-paint',
  buffered: true
}
po.observe(poOpts);
```

Поскольку страница часто загружается поэтапно, возможно, что самый большой
элемент на странице изменится, поэтому вы должны сообщать в службу аналитики
только о последнем событии с самым `largest-contentful-paint` .

```js
addEventListener('visibilitychange', function fn() {
  const visState = document.visibilityState;
  if (lcp && visState === 'hidden') {
    sendToAnalytics({'lcp': lcp});
    removeEventListener('visibilitychange', fn, true);
  }
}, true);
```

У Фила отличный пост о самой [Largest Contentful
Paint](https://web.dev/largest-contentful-paint/) на web.dev.

<div class="clearfix"></div>

## Новые возможности форм {: #new-forms-capabilities }

Многие разработчики создают собственные элементы управления формой, либо для
настройки внешнего вида существующих элементов, либо для создания новых
элементов управления, которые не встроены в браузер. Обычно это подразумевает
использование JavaScript и скрытых элементов `<input>` , но это не идеальное
решение.

Две новые веб-функции, добавленные в Chrome 77, упрощают создание
пользовательских элементов управления формы и устраняют многие из существующих
ограничений.

### Событие `formdata`

Событие `formdata` - это низкоуровневый API, который позволяет любому коду
JavaScript участвовать в отправке формы. Чтобы использовать его, добавьте
слушатель события `formdata` к форме, с которой вы хотите взаимодействовать.

```js
const form = document.querySelector('form');
form.addEventListener('formdata', ({formData}) => {
  formData.append('my-input', myInputValue);
});
```

Когда пользователь нажимает кнопку отправки, форма бросает событие `formdata`,
которое включает объект `FormData` который содержит все отправляемые данные.
Затем в вашем обработчике события `formdata` вы можете обновить или изменить
данные {code5}formdata{/code5} перед их отправкой.

### Пользовательские элементы (custom elements), связанные с формой

Пользовательские элементы, связанные с формой, помогают устранить разрыв между
пользовательскими элементами и собственными элементами управления. Добавление
статического свойства `formAssociated` говорит браузеру обрабатывать
пользовательский элемент как все остальные элементы формы. Вы также должны
добавить общие свойства, найденные в элементах ввода, такие как `name` , `value`
и `validity` чтобы обеспечить согласованность с нативными элементами управления.

<pre class="prettyprint lang-js">класс MyCounter extends HTMLElement {
<strong>статические formAssociated = true;</strong> constructor () {super ();
this._internals = this.attachInternals (); this._value = 0; } ...}</pre>

Посмотрите на [более мощные элементы управления
формой](https://web.dev/more-capable-form-controls/) на web.dev!

<div class="clearfix"></div>

## Нативная ленивая загрузка {: #lazy-loading }

<video autoplay loop muted class="attempt-right">
<source src="https://web.dev/native-lazy-loading/lazyload.webm"
type="video/webm">
<source src="https://web.dev/native-lazy-loading/lazyload.mp4"
type="video/mp4">
  </source></source></video>

Я не уверен, как я пропустил нативную ленивую загрузку в моем последнем видео!
Это довольно удивительно, поэтому я включаю это сейчас. Ленивая загрузка - это
метод, который позволяет вам откладывать загрузку некритических ресурсов, таких
как закадровые `<img>` или `<iframe>`, до тех пор, пока они не понадобятся, что
повысит производительность вашей страницы.

Начиная с Chrome 76, браузер обрабатывает ленивую загрузку за вас, без
необходимости писать пользовательский ленивый загрузочный код или использовать
отдельную библиотеку JavaScript.

<div class="clearfix"></div>

Чтобы сообщить браузеру, что вы хотите, чтобы изображение или iframe загружались
лениво, используйте атрибут `loading=”lazy”` . Изображения и фреймы,
расположенные «выше сгиба», загружаются нормально. А те, что ниже, выбираются
только тогда, когда пользователь прокручивает рядом с ними.

<pre class="prettyprint lang-html"><img src = "image.jpg" <strong>loading =
"lazy"</strong> width = "400" height = "250" alt = "..."></pre>

Посетите [ленивую загрузку для сети](https://web.dev/native-lazy-loading/) на
web.dev для более подробной информацией.

## Chrome Dev Summit 2019 {: #cds2019 }

<img src="/web/updates/images/2019/09/cds2019.png" class="attempt-right">

**Chrome Dev Summit пройдет 11 и 12 ноября.**

Это прекрасная возможность узнать о новейших инструментах и обновлениях,
поступающих на веб-платформу, и напрямую узнать мнение команды разработчиков
Chrome.

Он будет транслироваться в прямом эфире на нашем [YouTube
канале](https://youtube.com/user/ChromeDevelopers/), или, если вы захотите
принять участие лично, вы можете запросить приглашение на веб-сайте [Chrome Dev
Summit 2019](https://developer.chrome.com/devsummit/) .

## И более! {: #more }

Это лишь некоторые из изменений в Chrome 77 для разработчиков, конечно же, их
гораздо больше.

[API Contact Picker](/web/updates/2019/08/contact-picker) , доступный в качестве
пробной версии, является новым средством выбора по требованию, которое позволяет
пользователям выбирать запись или записи из своего списка контактов и
обмениваться ограниченными сведениями о выбранных контактах с веб-сайтом.

А в [API `intl.NumberFormat`](https://v8.dev/features/intl-numberformat)
появились новые единицы измерения.

## Дальнейшее чтение

Это охватывает только некоторые ключевые моменты. Посетите ссылки ниже для
дополнительной информации об изменениях в Chrome 77.

- [Что нового в Chrome DevTools (77)](/web/updates/2019/07/devtools)
- [Chrome 77 амортизации и удаления](/web/updates/2019/08/chrome-77-deps-rems)
- [Обновления ChromeStatus.com для Chrome
77](https://www.chromestatus.com/features#milestone%3D77)
- [Что нового в JavaScript в Chrome 77](https://v8.dev/blog/v8-release-77)
- [Список изменений репозитория исходного кода
Chromium](https://chromium.googlesource.com/chromium/src/+log/76.0.3809.88..77.0.3865.75)

## Подписаться {: .hide-from-toc }

Хотите быть в курсе наших видео, тогда [подпишитесь](https://goo.gl/6FP1a5) на
наш [канал Chrome Developers на
YouTube](https://www.youtube.com/user/ChromeDevelopers/), и вы получите
уведомление по электронной почте всякий раз, когда мы запускаем новое видео, или
добавьте наш [RSS-канал](/web/shows/rss.xml) в вашу программу чтения каналов.

Я Пит Лепейдж, и как только Chrome 78 будет выпущен, я буду здесь, чтобы
рассказать вам - что нового в Chrome!

## Обратная связь {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
