project*path: /web/*project.yaml
book*path: /web/resources/*book.yaml
description: Это описание страницы, расположенное в заголовке.

{# wf*updated*on: 2016-09-13 #}
{# wf*published*on: 2016-09-13 #}

# Руководство по стилю письма {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Web**Fundamental** предоставляет широкий спектр стилизованных элементов и CSS
классов для использования в документации. Хотя вы можете дополнить эти стили
своим CSS, вы должны использовать свой CSS только когда это необходимо. Если вы
решили, что вам нужно создать новый стиль, который будет применен более чем на
одной странице, пожалуйста, создайте issue на GitHub, за тем, чтобы другие
страницы также могли использовать его. Это обеспечивает согласованность всего
сайта.

## Заголовки

Самый верхний заголовок на странице это её название. Страница не должна
содержать другого тэга `<h1>`, чтобы не запутались невизуальные браузеры.

**Когда я должен писать заголовки в верхнем регистре?**

Заголовки страниц (`h1`)
: Пишите все Значимые Слова в верхнем регистре

Заголовки разделов (`h2`-`h6`)
: Используйте регистр предложений для всех заголовков

Да, мы не согласны с этим, но мы пробуем исправить это, пожалуйста, сделайте все
возможное, чтобы придерживаться этих рекомендаций.

## Заголовок второго уровня (Heading 2) {: #heading-what-what }

Обратите внимание: Если вы собираетесь ссылаться на определённые заголовки [<`a
href="#heading-what-what"`>](#heading-what-what) внутри вашего документа,
**настоятельно** рекомендуется  делать эти ссылки в `{: #anchor-name }`
синтаксисе. Это гарантирует, что когда документы локализованы, ссылки все ещё
работают, и также гарантирует, что любые различия между Markdown процессорами -
не проблема.

### Заголовок третьего уровня (Heading 3)

Material версия DevSite автоматически добавит `<h2>` и `<h3>` тэги к
оглавлениям. Чтобы избежать добавления (как эти два, которые здесь не
отображаются в оглавлении), используйте {code2}class="hide-from-toc"{/code2}.
Вы можете также поместить {code3}<h2>{/code3} или `<h3>` в заголовки таблиц
({code5}<th>{/code5}), чтобы таблица появилась в оглавлении. Внутри заголовка
таблицы, `<h2>` и `<h3>`
оформлены как обычный текст, так что читалки не будут их читать.

#### Заголовок четвертого уровня (Heading 4)

##### Заголовок пятого уровня (Heading 5)

###### Заголовок шестого уровня (Heading 6)

```
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

## Пример кода

Если ваша статья содержит код, пожалуйста убедитесь, что он соответствует
[Руководству по стилю JavaScript от
Google](https://google.github.io/styleguide/javascriptguide.xml).
Иначе, мы будем вынуждены просить вас поправить недочеты, а это никого не
радует.

### Встроенный код

Чтобы обозначить строку кода, оберните её в обратные кавычки (`). В отличие от
преформатированного блока кода, кодовая строка отображается внутри текста

Например:

```
Use the `printf()` function.
```

Результатом будет:

Use the `printf()` function.

### Блоки кода

Чтобы создать блок кода в Markdown, просто сделайте отступ какждой строки кода
не менее 4 пробелов или 1 таба. Например, дан такой код:

```
Here is an example of AppleScript:
    tell application "Foo"
        beep
    end tell
```

результатом будет:

Here is an example of AppleScript:

```
tell application "Foo"
    beep
end tell
```

Внутри блока кода, амперсанды (`&`) и угловые скобки (`<` и `>`) автоматически
конвертируются в  HTML коды. Это делает очень простым включение примеров HTML
кода используя Markdown -- просто вставьте их и сделайте отступ, и Markdown
возьмет на себя хлопоты по кодированию амперсандов и угловых скобок.

Предупреждение: Оборачивание блоков кода в {code0}&amp;&lt;&gt;{/code0} не
поддерживается DevSite. DevSite не стилизует эти блоки автоматически и наши
интеграционные тесты провалятся.

### Подсветка

Используйте `<strong>`, чтобы привлечь внимание к контенту внутри `<pre>` блока.
Это позволит осветить окружающий контент, чтобы подчеркнуть код внутри блока
{code2}<strong>{/code2}. Например:


<pre class="prettyprint">
// ...
// ...
// ...
for (i = 0; i if (i % 3 == 0) {
        someFunc(i);
    }
}
// ...
// ...
// ...
</pre>



```
<pre class="prettyprint">
// ...
// ...
// ...
for (i = 0; i < 10; i++) {
    printf("Counting %d\n", i);
    <strong>if (i % 3 == 0) {
        someFunc(i);
    }</strong>
}
// ...
// ...
// ...
</pre>
```

### Копирование по клику

Копирование по клику автоматически доступно для всех блоков с кодом.

### Особый случай: Шаблоны -  {{}}

Если вам нужно включить шаблоны в ваш пример кода, убедитесь, что он
экранирован.

Например:

<pre class="prettyprint"><pre class="prettyprint">&lt;polymer-media-query query="max-width:640px" queryMatches="&#123;{isPhone}}"></pre></pre>

Если он встроен, вам нужно обернуть его тэгом `<code>` вместо обратных кавычек.

<pre class="prettyprint"></pre>

- Declarative two-way data-binding: <code><input id="input"
value="&#123;{foo}}"></code>

## Изображения

Заключайте изображения в тэг `<figure>`, и, в идеале, используйте адаптивные
изображения с атрибутом `scrset` когда это возможно. Убедитесь, что указали
атрибут `alt` для ваших изображений.

Если это имеет смыл, используйте тэг `<figcaption>` для подписи изображения.


<figure>
  <img src="" alt="sample image">
<figcaption>Эта подпись должна использоваться, как описание
изображения.</figcaption>
</figure>



Например:

```
<figure>
  <img src="https://placehold.it/350x150" alt="sample image">
  <figcaption>This caption should be used to describe the image.</figcaption>
</figure>
```

Примечание: Оптимизированные изображения отображаются автоматически, просто
предоставьте 2х версию и сервер сделает остальное.

Вы можете добавить `class="screenshot"` к изображению, чтобы добавить ему
границу, которая отделит его от текста. Это обычно используется для скриншотов,
у которых белый фон и они теряются на странице. Не используйте этот класс, если
изображению это не нужно.

### Обтекание изображения справа


<div class="attempt-right">
  <figure>
    <img src="" alt="Alert dialog">
    <figcaption><b>Рисунок 1</b>: Оповещение</figcaption>
  </figure>
</div>



Изображение справа также имеет класс `class="attempt-right"`, которое заставляет
обтекать изображение справа на больших экранах, но размещает изображение по
вертикали на маленьких экранах, планшетах и меньше, где обтекание справа может
вызвать проблемы. Также доступен класс {code1}class="attempt-left"{/code1}.
Используя {code2}attempt-left{/code2} и {code3}attempt-right{/code3}
вместе, убедитесь, что `attempt-left` стоит первым.


<div class="clearfix"></div>



```
<div class="attempt-right">
  <figure>
    <img src="https://placehold.it/350x150" alt="Alert dialog">
    <figcaption><b>Figure 1</b>: Alert dialog</figcaption>
  </figure>
</div>
```

Внимание: Когда используете `attempt-left` и `attempt-right`, может
потребоваться добавить блок `<div class="clearfix"></div>`

### Изображения "ДА" и "НЕТ"

Добавьте класс `success` или `warning` к подписи рисунка, чтобы показать хороший
или плохой это пример.

<div class="attempt-left">
  <figure>
    <img src="" alt="Alert dialog">
    <figcaption class="success">
     <b>ДА</b>: Это правильно
     </figcaption>
  </figure>
</div>


<div class="attempt-right">
  <figure>
    <img src="" alt="Alert dialog">
    <figcaption class="warning">
      <b>НЕТ</b>: Это не правильно
     </figcaption>
  </figure>
</div>




<div class="clearfix"></div>



```
<div class="attempt-left">
  <figure>
    <img src="https://placehold.it/350x150" alt="Alert dialog">
    <figcaption class="success">
      <b>ДА</b>: Это правильно
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="https://placehold.it/350x150" alt="Alert dialog">
    <figcaption class="warning">
      <b>НЕТ</b>: Это не правильно
     </figcaption>
  </figure>
</div>
```

## Выноски

Примечание: Этот тип выноски - примечание или подсказка.

Внимание: Этот тип выноски предлагает действовать с осторожностью.

Предупреждение: Этот тип выноски строже чем "Внимание"; он говорит "Не делай
так."

Успех: Этот тип выноски означает успешное действие или безошибочный статус.
Используется только в интерактивном или динамическом контенте; не используйте на
обычных статических страницах.

Ключевой момент: Этот тип выноски определяет важную концепцию.

Ключевой термин: Этот тип выноски определяет важную терминологию.

Цель: Этот тип выноски определяет цель процедуры.

Dogfood: Этот тип выноски предназначен для заметок, которые применяются временно
во время внутреннего тестирования. Удалите все Dogfood выноски перед публикацией
документа.

## Сравнения

<p><span class="compare-worse">Не рекомендуется</span> — отступ табуляцией</p>


<pre class="prettyprint">(плохой пример кода)</pre>



<p><span class="compare-better">Рекомендуется</span> — отступ пробелами</p>


<pre class="prettyprint">(хороший пример кода)</pre>



<p><span class="compare-no">Не допускается</span> - отступ пробелами</p>


<pre class="prettyprint">(очень плохой пример кода)</pre>



## Списки

### Неупорядоченный

- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### Упорядоченный

1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
4. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
5. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
6. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Таблицы

Таблицы поддерживаются стандартной разметкой. Ниже типичная таблица со строкой
заголовка, несколько обычных строк и строка, помеченная как `<tr class="alt">` ,
которая имеет более темный фон, который можно использовать в качестве
альтернативного заголовка.


<table>
  <tr>
<th>One</th>
<th>Two</th>
<th>Three</th>
</tr>
  <tr>
<td>1.0</td>
<td>2.0</td>
<td>3.0</td>
</tr>
  <tr>
<td>1.1</td>
<td>2.1</td>
<td>3.1</td>
</tr>
<tr class="alt"><td colspan="3">Here come some numbers that end in
.2!</td></tr>
  <tr>
<td>1.2</td>
<td>2.2</td>
<td>3.2</td>
</tr>
</table>



```
<table>
  <tr><th>One</th><th>Two</th><th>Three</th></tr>
  <tr><td>1.0</td><td>2.0</td><td>3.0</td></tr>
  <tr><td>1.1</td><td>2.1</td><td>3.1</td></tr>
  <tr class="alt"><td colspan="3">Here come some numbers that end in .2!</td></tr>
  <tr><td>1.2</td><td>2.2</td><td>3.2</td></tr>
</table>
```

### Адаптивные таблицы

Чтобы сделать таблицу адаптивной, добавьте таблице класс `responsive`.


<table class="responsive">
  <tbody>
    <tr>
      <th colspan="2">Параметры</th>
    </tr>
    <tr>
      <td><code>value</code></td>
<td>
<code>String</code><br>выбранное значение, которое респондент видит как  метку,
когда просматривает форму</td>
    </tr>
    <tr>
      <td><code>navigationType</code></td>
<td>
<code><a href="#">PageNavigationType</a></code><br>the choice's navigation
type</td>
    </tr>
  </tbody>
</table>



- Должно быть ***три столбца*** в таблице: первый столбец для определения
(ключ), и второй столбец для всей информации о ключе, многострочной, если
необходимо. Это ограничение в два столбца означает, что адаптивные таблицы не
могут использоваться для двумерных табличных данных, сопоставления объектов на
основе контрольных отметок, но они хорошо подходят для справочной информации
(или любых других данных, которые могут быть разумно выражены списком
определений вместо таблицы).
- Если имеется несколько строк информации о ключе - например, тип и описание -
оберните каждую строку в `<p>` чтобы сделать между ними разрывы (вместо `<br>`).
- В строке заголовка должна быть только одна ячейка. Используйте `<th
colspan="2">`, чтобы заставить его охватить обе колонки. Чтобы напомнить вам об
этом поведении, мы автоматически скрываем любые `<th>` после первой (которая
преднамеренно выглядит сломанной).


<div class="clearfix"></div>



```
<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2>Parameters</th>
    </tr>
    <tr>
      <td>
        <code>value</code>
      </td>
      <td>
        <code>String</code><br>
        the choice's value, which respondents see as a label when viewing the form
      </td>
    </tr>
    <tr>
      <td>
        <code>navigationType</code>
      </td>
      <td>
        <code>
          <a href="#">PageNavigationType</a>
        </code>
        <br>the choice's navigation type
      </td>
    </tr>
  </tbody>
</table>
```

### Невидимые таблицы

Вы можете разместить текст в столбцах, или, иначе говоря, сделать таблицу
невидимой, используя
`<table class="columns">...</table>`. Это обычно используется для размещения
длинных узких списков.


<table class="columns">
  <tr>
    <td>
      <code>auto</code><br>
      <code>break</code><br>
      <code>case</code><br>
      <code>char</code>
    </td>
    <td>
      <code>const</code><br>
      <code>continue</code><br>
      <code>default</code><br>
      <code>do</code>
    </td>
    <td>
      <code>double</code><br>
      <code>else</code><br>
      <code>enum</code><br>
      <code>extern</code>
    </td>
  </tr>
</table>



```
<table class="columns">
  <tr>
    <td>
      <code>auto</code><br />
      <code>break</code><br />
      <code>case</code><br />
      <code>char</code>
    </td>
    <td>
      <code>const</code><br />
      <code>continue</code><br />
      <code>default</code><br />
      <code>do</code>
    </td>
    <td>
      <code>double</code><br />
      <code>else</code><br />
      <code>enum</code><br />
      <code>extern</code>
    </td>
  </tr>
</table>
```

## Внешние ссылки

Чтобы пометить ссылку как внешнюю, используйте
`<a href="https://www.google.com/" class="external">External Link</a>` при
создании в HTML, или добавьте {code1}{: .external}{/code1} к ссылке, когда
создаёте в Markdown.

<a href="https://www.google.com/" class="external">Внешняя ссылка</a>

## Пользовательские атрибуты и имена якорей

Markdown поддерживает пользовательские атрибуты в разметке для блоков уровня
HTML элементов и заголовков.

Формат разрешает пользовательский класс, пользовательский ID, и пользовательскую
пару атрибут/значение атрибута в одном и том же выражении:

```
This is a paragraph.
{: .customClass #custom_id attribute='value' }
```

Это генерирует такой HTML:

```
<p class="customClass" id="custom_id" attribute="value">This is a paragraph.</p>
```

### Пользовательские атрибуты в заголовках

Так как заголовок может быть записан только одной строкой, список атрибутов
должен размещаться в конце этой строки:

```
## Header with custom ID {: #custom_id }
```

Формирует:

```
<h2 id="custom_id">Header with custom ID</h2>
```

## Цитата

```
> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

> Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Всплывающие подсказки

Любой элемент с атрибутом `title` покажет всплывающую подсказку (со значением
атрибута) при наведении курсора мыши. Например: «... когда-нибудь экран <abbr
title="пикселей на дюйм">PPI</abbr> может еще больше увеличиться ...»
 (обратите внимание, что пунктиром подчеркнут элемент abbr, а не подсказка).

```
...someday screen <abbr title="pixels per inch">PPI</abbr> may increase further...
```

Предупреждение: Обязательно используйте всплывающие подсказки только для
дополнительной информации—не существенный текст или основной функционал—так как
наличие подсказок неочевидно, а пользователи мобильных устройств не увидят их
вовсе.

## Разные классы

Используйте `class="inline"`, `class="inline-block"`, и `class="block"` чтобы
заставить блок отображаться как inline, inline-block, или block, в редких
случаях, когда это необходимо.

Используйте `class="clearfix"` чтобы отменить действие float на элемент,
например после использования `attempt-left` или `attempt-right`.

## Комментарии

Однострочные и многострочные комментарии имеют разный синтаксис. Они оба будут
удалены из веб страницы при сохранении или публикации.

### Однострочные комментарии

Однострочный комментарий. Символ (#) используемый таким образом, зарезервирован
только для однострочных комментариев.


<pre class="prettyprint">
{# Time travel is fun #}
</pre>



### Многострочные комментарии

Многострочный комментарий, с открывающими и закрывающими тэгами, вокруг
комментария.

<pre class="prettyprint">
{% comment %}
Time travel is fun.
I do it literally all the time.
{% endcomment %}
</pre>
