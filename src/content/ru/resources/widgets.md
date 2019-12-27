project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: Виджеты вы можете использовать, чтобы упростить написание и
разработку

{# wf_updated_on: 2017-05-21 #}
{# wf_published_on: 2016-09-13 #}

# Виджеты {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Web**Fundamental** предоставляет широкий спектр виджетов для использования в
документации.

## Общие ссылки

Поддержание связей может быть болью, чтобы уменьшить её, вы можете добавить
общие ссылки в файл
[`_common-links.md`](https://github.com/google/WebFundamentals/blob/master/src/content/en/_common-links.md),
затем включить этот блок в ваш markdown документ и использовать ссылочный
синтаксис, чтобы ссылаться на него в вашем документе.

Во-первых, определим ссылку в
[`_common-links.md`](https://github.com/google/WebFundamentals/blob/master/src/content/en/_common-links.md),
используя стандартный markdown синтаксис для ссылок:

```
[id]: http://example.com/  "Optional Title Here"
```

Не забудьте добавить ссылки, отсортированные по id, проверьте, что ссылка,
которую вы добавляете, еще не существует.

Затем включите
[`_common-links.md`](https://github.com/google/WebFundamentals/blob/master/src/content/en/_common-links.md)
файл в ваш документ.

```
<<../_common-links.md>>
```

Примечание: Путь до файла
[`_common-links.md`](https://github.com/google/WebFundamentals/blob/master/src/content/en/_common-links.md)
должен быть относительным текущей директории.

Наконец, используйте ссылку в вашем документе:

```
This is [an example][id] reference-style link.
```

## Включения

Тэг `include` включает другой файл или шаблон в месте расположения тэга. Если
файл содержит директивы Django шаблона, эти директивы будут интерполированы.

{% include "web/_shared/sample.html" %}

<pre class="prettyprint">
&#123;% include "web/_shared/sample.html" %}
</pre>

Примечание: Включаемые файлы, использующие такой синтаксис должны быть HTML.
Markdown не будет обработан.

## Включение исполняемого JavaScript на страницы (`framebox`)

Тэг `framebox` позволяет вам встроить исполняемый JavaScript код на страницу и
запустить этот код в изолированной песочнице. Содержимое тэга `framebox`
помещается в отдельный файл, хранящийся на не-google.com домене, и автоматически
включается в страницу документации через `iframe`. Framebox могут содержать
HTML, CSS, и JavaScript. Текст внутри framebox автоматически добавляется для
перевода вместе с остальным документом, и располагается в том же месте, что и
страница.

{% framebox height="80px" %}

<style>
.borderdemo { border: 1px solid red; }
</style>

<p id="demopara">Кликните на кнопку, для переключения border.
  <button id="demobutton">Click Me</button>
</p>
#cdata-section>#cdata-section>#cdata-section><script
src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"><#cdata-section></div></script>

Код этого примера:

<pre class="prettyprint lang-html">&#123;% framebox height="80px" %}{% htmlescape %}
#cdata-section>#cdata-section><style><#cdata-section></div></style></pre>

<p id="demopara">Кликните на кнопку, для переключения border.
  <button id="demobutton">Click Me</button>
</p>
#cdata-section>#cdata-section><script
src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"><#cdata-section><script><#cdata-section></div></script>

Поддерживаемые параметры framebox:

- `height`: устанавливает высоту framebox
- `class`: Добавляет класс к framebox’ `iframe`

## Включение кода из локального проекта (`includecode`)

Используйте `includecode` с аргументом `content_path` для ссылки на путь к файлу
в content area, обычно в скрытой поддиректории. Путь относительно локального
корня. Если файл не найден в локали страницы, система проверит наличие файла в
en локали, прежде чем упасть.

<pre class="prettyprint">
&lt;pre class="prettyprint">
&#123;% includecode content_path="web/fundamentals/resources/_code/file.js" %}
</pre>
</pre>

Включения можно ограничить, используя `region_tag="region"` и добавив в файл
`[START region]` и `[END region]`.

По умолчанию `includecode` возвращает указанный раздел исходного кода, включая
пробелы. Это может быть нежелательным, если указанная область имеет глубокий
отступ. Так как может выглядеть плохо относительно других частей документа. Вы
можете настраивать отступы включаемого кода, используя
`adjust_indentation="auto"`.

<pre class="prettyprint">
&lt;pre class="prettyprint">
&#123;% includecode content_path="path/file.js" adjust_indentation="auto" %}
</pre>
</pre>

## Многоразовое включение связанных руководств

Web**Fundamentals** сделало простым включение связанных руководств, к сожалению
DevSite не имеет такой функции. Чтобы упростить себе жизнь и позволить простое
повторное использование, вы можете использовать набор предварительно созданных
связанных руководств.

<pre class="prettyprint">
&#123;% include "_shared/related-guides/heading.html" %}
&#123;% include "_shared/related-guides/service-workers.html" %}
</pre>

Будет отображено как:

{% include "web/_shared/related-guides/heading.html" %}
{% include "web/_shared/related-guides/service-workers.html" %}

## Комментарии пользователей

Чтобы разрешить пользователям комментировать вашу документацию - добавьте виджет
комментариев на страницу снизу. Например:

<pre class="prettyprint">
&#123;% include "comment-widget.html" %}
</pre>

Примечение: виджет комментариев **не** отображается в  staging или development
окружении, и будут видны, только когда страница будет опубликована на DevSite.

## Видео

<div class="video-wrapper">
<iframe class="devsite-embedded-youtube-video" data-video-id="yQhFmPExcbs"
data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Оберните все YouTube видео в `<div class="video-wrapper">` или
`<div class="video-wrapper-full-width">`. `class="video-wrapper"`
автоматически делает видео обтекаемым справа на больших экранах, устанавливая
его ширину в 50% от ширины столбца, но сдвигает его в вертикальную раскладку на
маленьких экранах, увеличивая до 100% по ширине. По мере изменения размеров
видео, класс автоматически поддерживает соотношение сторон 16:9.
`class="video-wrapper-full-width"` сохраняет ширину видео в 100% от ширины
столбца на всех размерах экрана, но по прежнему поддерживает соотношение сторон
16:9.

```
<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="yQhFmPExcbs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>
```

## Обратная связь {: #inline-feedback }

Получите больше отзывов о своем документе, задав своим читателям вопросы «да /
нет».

### Пример

Посмотрите [Начало работы с отладкой
JS](/web/tools/chrome-devtools/javascript/). В каждом из вопросов в нижней части
разделов используется виджет обратной связи.

### Использование

1. Создайте директорию `_feedback` рядом с документом, коорый будет включать в
себя обратную связь.
2. Если вы хотите добавить вопрос перед вашими кнопками, тогда скопируте
`/src/content/en/tools/chrome-devtools/javascript/_feedback/7.html` в
вашу`_feedback` директорию. Если нет, то скопируйте `.../1.html`.
3. Скопируйте
`/src/content/en/tools/chrome-devtools/javascript/_feedback/1.html`в вашу
директорию `_feedback`.
4. Измените все переменные в соответствие с вашим вопросом. Все переменные, за
исключением `question`, обязательны.
5. Добавьте `_feedback/1.html` в ваш документ, типа того:

<pre class="prettyprint">
&#123;% include "web/path/to/_feedback/1.html" %}
</pre>

Путь должен всегда начинаться с относительной ссылки на `web/`. Именно так
работает тэг `include`.

Другое:

- Виджет жестко закодирован (и стилизован), для ожидания сценариев "успех /
неудача". Это не имеет смысла в других контекстах.
- Может быть использовано несколько в документе!
- Не работает на локальном development сервере Web Fundamentals, так как этот
сервер просто приближение к реальным возможностям DevSite. Вы увидите все
переменные, напечатанные на странице.

### Просмотр данных

Примечание: только для пользователей, которые имеют доступ к аналитике Web
Fundamentals.

Смотри Google Analytics > Behavior > Events. Когда пользователь кликает
"неудача", значение 0 посылается для этой метки. Когда пользователь кликает
"успешно", значение 1 посылается. Так что значение 1 означает, что пользователь
всегда кликает вашу кнопку "успешно".


Translated by
{% include "web/_shared/contributors/dmitryskripunov.html" %}
