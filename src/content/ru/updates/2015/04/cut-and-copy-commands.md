project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Поддержка команд вырезания и копирования позволяет программно вырезать и скопировать выделенный текст в буфер обмена пользователя.

{# wf_updated_on: 2019-03-22 #} {# wf_published_on: 2015-04-14 #} {# wf_tags:
news,cutandcopy,execcommand #} {# wf_blink_components: N/A #}

# Команды вырезания и копирования {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

IE10 and above added support for the 'cut' and 'copy' commands through the
[Document.execCommand()](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)
method. As of Chrome version 43, these commands are also supported in Chrome.

Любой текст, выбранный в браузере при выполнении одной из этих команд, будет
вырезан или скопирован в буфер обмена пользователя. Это позволяет предложить
пользователю простой способ выделить часть текста и скопировать его в буфер
обмена.

This becomes extremely useful when you combine it with the [Selection
API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) to
programmatically select text to determine what is copied to the clipboard, which
we'll be looking at in more detail later on in this article.

## Простой пример

Для примера давайте добавим кнопку, которая копирует адрес электронной почты в
буфер обмена пользователя.

Мы добавляем адрес электронной почты в наш HTML с кнопкой, чтобы начать
копирование при нажатии:

```
<p>Email me at <a class="js-emaillink" href="mailto:matt@example.co.uk">matt@example.co.uk</a></p>

<p><button class="js-emailcopybtn"><img src="./images/copy-icon.png" /></button></p>
```

Затем в нашем JavaScript мы хотим добавить обработчик события click к нашей
кнопке, в котором мы выбираем текст адреса электронной почты из якоря
`js-emaillink` , выполняем команду copy, чтобы адрес электронной почты находился
в буфере обмена пользователя, и затем мы отменяем выбор адрес электронной почты,
чтобы пользователь не видел, что выбор произошел.

```
var copyEmailBtn = document.querySelector('.js-emailcopybtn');
copyEmailBtn.addEventListener('click', function(event) {
  // Select the email link anchor text
  var emailLink = document.querySelector('.js-emaillink');
  var range = document.createRange();
  range.selectNode(emailLink);
  window.getSelection().addRange(range);

  try {
    // Now that we've selected the anchor text, execute the copy command
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copy email command was ' + msg);
  } catch(err) {
    console.log('Oops, unable to copy');
  }

  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported
  window.getSelection().removeAllRanges();
});
```

What we are doing here is using a method of the [Selection
API](https://developer.mozilla.org/en-US/docs/Web/API/Selection),
[window.getSelection()](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection)
to programmatically set the 'selection' of text to the anchor, which is the text
we
want to copy to the user's clipboard. After calling document.execCommand() we
can remove the selection by calling
[window.getSelection().removeAllRanges()](https://developer.mozilla.org/en-US/docs/Web/API/Selection/removeAllRanges).
If you wanted to confirm everything worked as expected you can examine the
response of document.execCommand(); it returns false if the command is not
supported or enabled. We wrap execCommand() in a try and catch since the 'cut'
and 'copy' commands [can throw an
error](https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#the-copy-command)
in a few scenarios.

Команда «вырезать» может использоваться для текстовых полей, где вы хотите
удалить текстовое содержимое и сделать его доступным через буфер обмена.

Using a textarea and a button in our HTML:

```
<p><textarea class="js-cuttextarea">Hello I'm some text</textarea></p>

<p><button class="js-textareacutbtn" disable>Cut Textarea</button></p>
```

We can do the following to cut the content:

```
var cutTextareaBtn = document.querySelector('.js-textareacutbtn');

cutTextareaBtn.addEventListener('click', function(event) {
  var cutTextarea = document.querySelector('.js-cuttextarea');
  cutTextarea.select();

  try {
    var successful = document.execCommand('cut');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Cutting text command was ' + msg);
  } catch(err) {
    console.log('Oops, unable to cut');
  }
});
```

## queryCommandSupported и queryCommandEnabled

Ahead of calling document.execCommand(), you should ensure that this API is
supported using the
[document.queryCommandSupported()](https://developer.mozilla.org/en-US/docs/Web/API/Document/queryCommandSupported)
method. In our example above we could set the button disabled state based on
support like so:

```
copyEmailBtn.disabled = !document.queryCommandSupported('copy');
```

The difference between
[document.queryCommandSupported()](https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#querycommandsupported())
and
[document.queryCommandEnabled()](https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#querycommandenabled())
is that cut and copy could be supported by a browser, but if no text is
currently selected, they won't be enabled. This is useful in scenarios where you
aren't
setting the selection of text programmatically and want to ensure the command
will do as expected, otherwise present a message to the user.

## Поддержка браузера

IE 10+, Chrome 43+, Firefox 41+ и Opera 29+ поддерживают эти команды.

Safari не поддерживает эти команды.

## Известные ошибки

- [Вызов `queryCommandSupported()` из devtools всегда возвращает
false](https://bugs.chromium.org/p/chromium/issues/detail?id=475868) .
- На данный момент [обрезка работает только при программном выделении
текста](https://bugs.chromium.org/p/chromium/issues/detail?id=476848) .
