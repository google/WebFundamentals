project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Eager evaluation, argument hints, function autocompletion, Lighthouse
  3.0, and more.

{# wf_updated_on: 2019-09-19 #}
{# wf_published_on: 2018-05-21 #}
{# wf_tags: chrome68,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Eager evaluation, argument hints, function
autocompletion, Lighthouse 3.0, and more. #}
{# wf_blink_components: Platform>DevTools #}

# Что нового в DevTools (Chrome 68) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Новое в DevTools в Chrome 68:

- [Eager Evaluation](#eagerevaluation). As you type expressions, the Console
previewsthe result.
- [Argument hints](#hints). As you type functions, the Console shows you the
expected argumentsfor that function.
- [Function autocompletion](#autocomplete). After typing a function call such
as`document.querySelector('p')`, the Console shows you the functions and
properties thatthe return value supports.
- [ES2017 keywords in the Console](#keywords). Keywords such as `await` are now
available in theConsole's autocomplete UI.
- [Lighthouse 3.0 in the Audits panel](#lh3). Faster, more consistent audits, a
new UI, andnew audits.
- [`BigInt` support](#bigint). Try out JavaScript's new arbitrary-precision
integer in theConsole.
- [Adding property paths to the Watch pane](#watch). Add properties from the
Scope pane tothe Watch pane.
- [«Показать метки времени» перенесено в «Настройки»](#timestamps) .

Note: Check what version of Chrome you're running at `chrome://version`. If
you're running
an earlier version, these features won't exist. If you're running a later
version, these features
may have changed. Chrome auto-updates to a new major version about every 6
weeks.

Читайте дальше или смотрите видео-версию заметок о выпуске ниже.

<div class="video-wrapper-full-width">
<iframe class="devsite-embedded-youtube-video" data-video-id="br4JZ5qz_20"
data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Вспомогательная консоль {: #console }

Chrome 68 поставляется с несколькими новыми функциями консоли, связанными с
автозаполнением и предварительным просмотром.

### Eager Evaluation {: #eagerevaluation }

When you type an expression in the Console, the Console can now show a preview
of the result of
that expression below your cursor.

<figure>
<img src="/web/updates/images/2018/05/eagereval.png" alt="The Console is
printing the result of the sort() operation before it has been
            explicitly executed.">
<figcaption><b>Рисунок 1</b> Консоль печатает результат операции
<code>sort()</code> до ее явного выполнения</figcaption>
</figure>

Чтобы включить Eager Evaluation:

1. Откройте **консоль** .
2. Open **Console Settings** ![Console
    Settings](/web/updates/images/2018/05/settings.png){:.inline-icon}.
3. Enable the **Eager evaluation** checkbox.

DevTools does not eager evaluate if the expression causes [side
effects](https://stackoverflow.com/a/8129277/1669860){:.external}.

### Argument hints {: #hints }

Когда вы печатаете функции, консоль теперь показывает аргументы, которые ожидает
функция.

<figure>
<img src="/web/updates/images/2018/05/arghints.png" alt="Argument hints in the
Console.">
<figcaption><b>Рисунок 2</b> Различные примеры подсказок аргументов в
консоли</figcaption>
</figure>

Примечания:

- Знак вопроса перед аргументом, например `?options` , представляет
[необязательный](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
аргумент {:.external}.
- Многоточие перед аргументом, например `...items` , представляет
[спред](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
{:.external}.
- Some functions, such as `CSS.supports()`, accept multiple argument signatures.

### Автозаполнение после выполнения функции {: #autocomplete }

Note: This feature depends on [Eager Evaluation](#eagerevaluation), which needs
to be enabled
from **Console Settings** ![Console
Settings](/web/updates/images/2018/05/settings.png){:.inline-icon}.

After enabling Eager Evaluation, the Console now also shows you which properties
and
functions are available after you type out a function.

<figure>
<img src="/web/updates/images/2018/05/autocomplete.png" alt="After running
document.querySelector('p'), the Console can now show you the available
            properties and functions for that element.">
<figcaption><b>Рисунок 3</b> Верхний снимок экрана представляет старое
поведение, а нижний снимок экрана представляет новое поведение, которое
поддерживает автозаполнение функции.</figcaption>
</figure>

### Ключевые слова ES2017 в автозаполнении {: #keywords }

Ключевые слова ES2017, такие как `await` , теперь доступны в интерфейсе
автозаполнения консоли.

<figure>
<img src="/web/updates/images/2018/05/await.png" alt="The Console now suggests
'await' in its autocomplete UI.">
<figcaption><b>Рисунок 4</b> Консоль теперь предлагает <code>await</code> в
своем автозаполнении пользовательского интерфейса</figcaption>
</figure>

## Более быстрые, надежные аудиты, новый пользовательский интерфейс и новые аудиты {: #lh3 }

Chrome 68 поставляется с Lighthouse 3.0. Следующие разделы представляют собой
сводку некоторых самых больших изменений. См. [Announcing Lighthouse
3.0](/web/updates/2018/05/lighthouse3) для полной истории.

### Более быстрые и надежные проверки {: #lantern }

Lighthouse 3.0 имеет новый механизм внутреннего аудита под кодовым названием
Lantern, который выполняет аудит быстрее и с меньшими различиями между
прогонами.

### Новый пользовательский интерфейс {: #ui }

Lighthouse 3.0 также предоставляет новый пользовательский интерфейс благодаря
сотрудничеству между командами Lighthouse и Chrome UX (Research & Design).

<figure>
<img src="/web/updates/images/2018/05/lighthouse3.png" alt="The new report UI
in Lighthouse 3.0.">
<figcaption><b>Рисунок 5</b> Новый интерфейс отчета в Lighthouse
3.0</figcaption>
</figure>

### New audits {: #audits }

Lighthouse 3.0 also ships with 4 new audits:

- First Contentful Paint
- robots.txt недействителен
- Используйте видео форматы для анимированного контента
- Avoid multiple, costly round trips to any origin

## Поддержка BigInt {: #bigint }

Note: This isn't a DevTools features per se, but it is a new JavaScript
capability that you
can try out in the Console.

Chrome 68 supports a new numeric primitive called
[`BigInt`](/web/updates/2018/05/bigint). `BigInt` lets you represent
integers with arbitrary precision. Try it out in the Console:

<figure>
<img src="/web/updates/images/2018/05/bigint.png" alt="An example of BigInt in
the Console.">
  <figcaption><b>Рисунок 6</b> Пример <code>BigInt</code> в консоли</figcaption>
</figure>

## Добавьте путь свойства для просмотра {: #watch }

While paused on a breakpoint, right-click a property in the Scope pane and
select
**Add property path to watch** to add that property to the Watch pane.

<figure>
<img src="/web/updates/images/2018/05/watch.png" alt="An example of Add
property path to watch.">
<figcaption><b>Рисунок 7</b> Пример <b>добавления пути свойства для
просмотра</b></figcaption>
</figure>

## «Показать метки времени» перенесено в настройки {: #timestamps }

Флажок **Show timestamps** ранее в **настройках консоли** ![Настройки
консоли](/web/updates/images/2018/05/settings.png) {:.inline-icon} перемещен в
[Настройки](/web/tools/chrome-devtools/ui#settings) .

## Обратная связь {: #feedback }

Чтобы обсудить новые функции и изменения в этом посте, или что-нибудь еще,
связанное с DevTools:

- File bug reports at [Chromium Bugs](https://crbug.com){:.external}.
- Discuss features and changes on the [Mailing
List](https://groups.google.com/forum/#!forum/google-chrome-developer-tools){:.external}.
Please don't use the mailinglist for support questions. Use Stack Overflow,
instead.
- Get help on how to use DevTools on [Stack
Overflow](https://stackoverflow.com/questions/tagged/google-chrome-devtools){:.external}.
Please don't file bugson Stack Overflow. Use Chromium Bugs, instead.
- Tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools).
- File bugs on this doc in the [Web
Fundamentals](https://github.com/google/webfundamentals/issues/new){:.external}
repository.

## Consider Canary {: #canary }

If you're on Mac or Windows, please consider using [Chrome
Canary](https://www.google.com/chrome/browser/canary.html) as your default
development browser. If you report a bug or a change that you don't like while
it's still in
Canary, the DevTools team can address your feedback significantly faster.

Note: Canary is the bleeding-edge version of Chrome. It's released as soon as
its built, without
testing. This means that Canary breaks from time-to-time, about once-a-month,
and it's usually
fixed within a day. You can go back to using Chrome Stable while Canary is
broken.

<< ../../_ общий / discover.md >>
