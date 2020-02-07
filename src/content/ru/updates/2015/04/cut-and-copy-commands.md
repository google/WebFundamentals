project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Поддержка команд вырезания и копирования позволяет программно вырезать и скопировать выделенный текст в буфер обмена пользователя.

{# wf_updated_on: 2019-03-22 #} {# wf_published_on: 2015-04-14 #} {# wf_tags:
news,cutandcopy,execcommand #} {# wf_blink_components: N/A #}

# Команды вырезания и копирования {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

В IE10 и более поздних версиях добавлена поддержка команд «вырезать» и
«копировать» с помощью метода
[Document.execCommand()](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)
. Начиная с версии 43 Chrome, эти команды также поддерживаются в Chrome.

Любой текст, выбранный в браузере при выполнении одной из этих команд, будет
вырезан или скопирован в буфер обмена пользователя. Это позволяет предложить
пользователю простой способ выделить часть текста и скопировать его в буфер
обмена.

Это становится чрезвычайно полезным, когда вы комбинируете его с [Selection
API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) для
программного выделения текста, чтобы определить, что копируется в буфер обмена,
что мы рассмотрим более подробно позже в этой статье.

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

Здесь мы используем метод [Selection
API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) ,
[window.getSelection()](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection),
чтобы программно установить «выделение» текста для привязки, то есть текста,
который мы хотим скопировать в буфер обмена пользователя. После вызова
document.execCommand() мы можем удалить выделение, вызвав
[window.getSelection().removeAllRanges()](https://developer.mozilla.org/en-US/docs/Web/API/Selection/removeAllRanges).
Если вы хотите подтвердить, что все работает как положено, вы можете проверить
ответ document.execCommand(); Он возвращает false, если команда не
поддерживается или не включена. Мы оборачиваем execCommand() в try/catch,
поскольку команды 'cut' и 'copy' [могут выдавать
ошибку](https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#the-copy-command)
в нескольких сценариях.

Команда «вырезать» может использоваться для текстовых полей, где вы хотите
удалить текстовое содержимое и сделать его доступным через буфер обмена.

Используя textarea и кнопку в нашем HTML:

```
<p><textarea class="js-cuttextarea">Hello I'm some text</textarea></p>

<p><button class="js-textareacutbtn" disable>Cut Textarea</button></p>
```

Мы можем сделать следующее, чтобы вырезать содержимое:

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

Перед вызовом document.execCommand() вы должны убедиться, что этот API
поддерживается с помощью метода
[document.queryCommandSupported()](https://developer.mozilla.org/en-US/docs/Web/API/Document/queryCommandSupported)
. В нашем примере выше мы могли бы установить состояние отключения кнопки на
основе поддержки следующим образом:

```
copyEmailBtn.disabled = !document.queryCommandSupported('copy');
```

Разница между
[document.queryCommandSupported()](https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#querycommandsupported())
и
[document.queryCommandEnabled()](https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#querycommandenabled())
заключается в том, что вырезка и копирование могут поддерживаться браузером, но
если текст в настоящее время не выбран, они не будут включены. Это полезно в тех
случаях, когда вы не настраиваете выделение текста программно и хотите
убедиться, что команда будет работать так, как ожидается, в противном случае вы
получите сообщение пользователю.

## Поддержка браузера

IE 10+, Chrome 43+, Firefox 41+ и Opera 29+ поддерживают эти команды.

Safari не поддерживает эти команды.

## Известные ошибки

- [Вызов `queryCommandSupported()` из devtools всегда возвращает
false](https://bugs.chromium.org/p/chromium/issues/detail?id=475868) .
- На данный момент [обрезка работает только при программном выделении
текста](https://bugs.chromium.org/p/chromium/issues/detail?id=476848) .
