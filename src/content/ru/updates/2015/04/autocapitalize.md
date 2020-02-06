project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Another text entry frustration for users is being removed.

{# wf_updated_on: 2019-03-22 #} {# wf_published_on: 2015-04-15 #} {# wf_tags:
news,autocapitalize,mobile #} {# wf_blink_components: N/A #}

# Автокапитализация для мобильных устройств {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Это может выглядеть как самая не впечатляющая особенность из существующих, но я
думаю, что это важно, потому что всем не нравится печатать на мобильном
телефоне: ты ненавидишь это, я ненавижу это. В Chrome для Android (до Chrome 43
- бета-версия на апрель 2015 г.) разработчик практически не контролирует то, как
браузер может помочь пользователю вводить текст. Если вы печатаете на устройстве
сегодня, это может выглядеть так:

Обратите внимание, что все в нижнем регистре, кроме некоторых значений, которые
Android распознал как имя.

Apple introduced an attribute on `HTMLInputElement` and
`HTMLTextAreaElement` called
[autocapitalize](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-autocapitalize)
[in iOS
5](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-autocapitalize)
and it allows the page author to hint at how the browser should present the
virtual keyboard for a user to optimize text entry for the user.  In its
simplest form, you could indicate that a text box should automatically
capitalize the first letter of every new sentence.

From Chrome 43, Chrome will support the *autocapitalize* attribute on both
`HTMLInputElement` and `HTMLTextAreaElement`, which will allow you to control
the autocapitalization behavior of the virtual keyboard and bring it inline
with Safari on iOS.

*autocapitalize* will only apply to `HTMLInputElement`s that have
the *type* attribute set to: `type="text"`, `type="search"`, `type="url"`,
`type="tel"`,
`type="email"` or `type="password"`. The default is to **not** autocapitalize.

Вот простой пример, позволяющий автокапитализировать предложения в текстовой
области:

`<textarea autocapitalize="sentences">`

## Какие значения может принимать автокапитализация?

В следующей таблице показаны различные состояния, в которых может находиться
элемент ввода:

<table class="">
<thead>
<tr>
<th></th>
<th>State</th>
<th>Ключевые слова</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code><input></code><br>
<code><input autocapitalize = off></code>
</td>
<td>No Capitalization</td>
<td>нет [по умолчанию]</td>
</tr>
<tr>
<td></td>
<td></td>
<td>off</td>
</tr>
<tr>
<td><code><input autocapitalize=characters></code></td>
<td>Капитализация символов</td>
<td>characters</td>
</tr>
<tr>
<td><code><input autocapitalize=words></code></td>
<td>Words Capitalization</td>
<td>слова</td>
</tr>
<tr>
<td><code><input autocapitalize=sentences></code></td>
<td>Sentences Capitalization</td>
<td>sentences</td>
</tr>
</tbody>
</table>

For `HTMLInputElement`, the invalid value default is *Sentences Capitalization*
if the type of the element is type=`text` or type=`search`. Otherwise, it is *No
Capitalization*.

- ` <input autocapitalize="simon"&gt`; would be a text field with* Sentences
Capitalizatio*n
- ` <input type="email" autocapitalize="simon"&gt`; would be a text field with*
No Capitalizatio*n.
- ` <input&gt`; would be a text field with* No Capitalizatio*n.

For `HTMLTextAreaElement`, the invalid value default is *Sentences
Capitalization*. This is a change from the default behavior.

- ` <textarea autocapitalize="terry"></textarea&gt`; would be a text area with*
Sentences Capitalizatio*n
- ` <textarea></textarea&gt`; would be a text area with* Sentence
Capitalizatio*n.
- `<textarea autocapitalize="none"></textarea>` would be a text area with *No
Capitalization*.

Для `HTMLFormElement` мы решили не реализовывать атрибут, потому что мы
обнаружили, что сегодня он редко используется на страницах, и когда он
используется, он в основном используется для полного отключения
автокапитализации в форме:

`<form autocapitalize=off><input></form>`

The above is odd, as the default state for `HTMLInputElement` is *No
Capitalization*.

## Why are you using this over `inputmode`?

`inputmode` предназначен для решения того же типа проблемы, между прочим. Тем не
менее, ему не хватает реализации браузера - насколько нам известно, только
Firefox OS имеет реализацию и имеет префикс (x-inputmode) - но он также очень
мало используется в Интернете. С другой стороны, `autocapitalize` уже
используется на миллионах страниц на сотнях тысяч веб-сайтов.

## Когда я должен использовать это?

Это не исчерпывающий список того, когда следует использовать `autocapitalize` ;
однако есть ряд мест, где помощь пользователю при вводе текста имеет большое
значение:

- Используйте `autocapitalization=words` если вы
-  Ожидание имен людей (примечание: не все имена следуют этому правилу, но
большинство западных имен будут заглавными автоматически, как и ожидалось)
    -  Названия компаний
    -  Адреса
- Используйте `autocapitalization=characters` если вы ожидаете:
    -  Штаты США
    -  Почтовые индексы Великобритании
- Используйте `sentences` для элементов ввода, если вы ожидаете, что контент
будет введен в обычной форме абзаца - например, в блоге.
- Не используйте `none` в TextAreas, если вы ожидаете, что контент не должен
быть затронут, например, при вводе кода.
- If you don't want hinting, don't add autocapitalize.

## Другие интересные ссылки

- [Первоначальное предложение по реализации от Мунира
Ламури](https://github.com/mounirlamouri/html-autocapitalize/blob/master/proposal.md)
