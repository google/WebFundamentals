project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Упреждающее вычисление, подсказки аргументов, функция автозаполнения, Lighthouse 3.0 и многое другое.

{# wf_updated_on: 2019-09-19 #} {# wf_published_on: 2018-05-21 #} {# wf_tags:
chrome68,devtools,devtools-whatsnew #} {# wf_featured_image:
/web/updates/images/generic/chrome-devtools.png #} {# wf_featured_snippet:
Упреждающее вычисление, подсказки аргументов, автозавершение функций, Lighthouse
3.0 и многое другое. #} {# wf_blink_components: Platform>DevTools #}

# Что нового в DevTools (Chrome 68) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Новое в DevTools в Chrome 68:

- [Упреждающее вычисление](#eagerevaluation). По мере ввода выражений Консоль
предварительно показывает результат.
- [Подсказки аргументов](#hints). По мере ввода функций, Консоль показывает
ожидаемые аргументы для этой функции.
- [Функция автозаполнения](#autocomplete) . После ввода вызова функции, такого
как `document.querySelector('p')`, Консоль показывает вам функции и свойства,
которые поддерживает возвращаемое значение.
- [Ключевые слова ES2017 в консоли](#keywords). Ключевые слова, такие как
`await` , теперь доступны в интерфейсе автозаполнения консоли.
- [Lighthouse 3.0 в панели Аудит](#lh3). Более быстрые и последовательные
аудиты, новый пользовательский интерфейс и новые аудиты.
- [Поддержка `BigInt`](#bigint). Попробуйте новое целое число JavaScript
произвольной точности в Консоли.
- [Добавление путей к свойствам на панель Watch](#watch). Добавьте свойства из
панели «Область» в панель «Просмотр».
- [«Показать метки времени» перенесено в «Настройки»](#timestamps) .

Примечание. Проверьте, какую версию Chrome вы используете в `chrome://version`.
Если вы используете более раннюю версию, эти функции не будут работать. Если вы
используете более позднюю версию, эти функции могут быть изменены. Chrome
автоматически обновляется до новой основной версии примерно каждые 6 недель.

Читайте дальше или смотрите видео-версию заметок о выпуске ниже.

<div class="video-wrapper-full-width">
<iframe class="devsite-embedded-youtube-video" data-video-id="br4JZ5qz_20"
data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Вспомогательная консоль {: #console }

Chrome 68 поставляется с несколькими новыми функциями консоли, связанными с
автозаполнением и предварительным просмотром.

### Упреждающее вычисление {: #eagerevaluation }

Когда вы вводите выражение в Консоли, Консоль теперь может отображать
предварительный результат выражения под курсором.

<figure>
<img src="/web/updates/images/2018/05/eagereval.png" alt="The Console is
printing the result of the sort() operation before it has been
            explicitly executed.">
<figcaption><b>Рисунок 1</b> Консоль печатает результат операции
<code>sort()</code> до ее явного выполнения</figcaption>
</figure>

Чтобы включить Eager Evaluation:

1. Откройте **консоль** .
2. Откройте **Настройки Консоли** ![Console
    Settings](/web/updates/images/2018/05/settings.png) {:.inline-icon}.
3. Включите флажок **Упреждающее вычисление** .

DevTools не делает упреждающего вычисления, если выражение вызывает [побочные
эффекты](https://stackoverflow.com/a/8129277/1669860) {:.external}.

### Подсказки аргументов {: #hints }

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
- Некоторые функции, такие как `CSS.supports()` , принимают несколько сигнатур
аргументов.

### Автозаполнение после выполнения функции {: #autocomplete }

Примечание. Эта функция зависит от [Упреждающего вычисления](#eagerevaluation),
которое необходимо включить в **Настройках Консоли** ![Console
Settings](/web/updates/images/2018/05/settings.png) {:.inline-icon}.

После включения Упреждающего вычисления консоль теперь также показывает, какие
свойства и функции доступны после ввода функции.

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

### Новые проверки {: #audits }

Lighthouse 3.0 также поставляется с 4 новыми проверками:

- Первое существенное отображение (First Contentful Paint)
- robots.txt недействителен
- Используйте видео форматы для анимированного контента
- Избегайте многократных дорогостоящих круговых задержек запросов (Round-Trips)

## Поддержка BigInt {: #bigint }

Примечание. По сути, это не DevTools, а новая функция JavaScript, которую вы
можете попробовать в Консоли.

Chrome 68 поддерживает новый числовой примитив под названием
[`BigInt`](/web/updates/2018/05/bigint). `BigInt` позволяет вам представлять
целые числа с произвольной точностью. Попробуйте это в консоли:

<figure>
<img src="/web/updates/images/2018/05/bigint.png" alt="An example of BigInt in
the Console.">
  <figcaption><b>Рисунок 6</b> Пример <code>BigInt</code> в консоли</figcaption>
</figure>

## Добавьте путь свойства для просмотра {: #watch }

Во время паузы в точке останова щелкните правой кнопкой мыши свойство на панели
«Область» и выберите **Добавить путь свойства, чтобы просмотреть его,** чтобы
добавить это свойство на панель «Просмотр».

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

- Сообщите об ошибках в [Chromium Bugs](https://crbug.com) {:.external}.
- Обсудите особенности и изменения в [списке
рассылки](https://groups.google.com/forum/#!forum/google-chrome-developer-tools)
{:.external}. Пожалуйста, не используйте список рассылки для вопросов поддержки.
Вместо этого используйте Stack Overflow.
- Получите помощь в использовании DevTools на [Stack
Overflow](https://stackoverflow.com/questions/tagged/google-chrome-devtools)
{:.external}. Пожалуйста, не регистрируйте ошибки на Stack Overflow. Вместо
этого используйте Chromium Bugs.
- Упомяните нас в Твиттере [@ChromeDevTools](https://twitter.com/chromedevtools)
.
- Ошибки в этом документе размещайте в репозитории [Web
Fundamentals](https://github.com/google/webfundamentals/issues/new)
{:.external}.

## Обратите внимание на Canary {: #canary }

Если вы используете Mac или Windows, рассмотрите возможность использования
[Chrome Canary](https://www.google.com/chrome/browser/canary.html) в качестве
браузера по умолчанию для разработки. Если вы сообщаете об ошибке или изменении,
которое вам не нравится, пока оно находится в Canary, команда DevTools может
значительно быстрее отреагировать на ваши отзывы.

Примечание: Canary - новейшая версия Chrome. Она выпущено, как только собрана,
без тестирования. Это означает, что Canary ломается время от времени, примерно
раз в месяц, и это обычно исправляется в течение дня. Вы можете вернуться к
использованию Chrome Stable, пока Canary не работает.

-
