---
title: "Выбор лучшего типа ввода"
description: "Оптимизируйте ввод информации путем выбора правильного типа ввода. Пользователям нравятся веб-сайты, которые автоматически выводят на экран цифровые клавиатуры для ввода номеров телефонов или автоматически выполняют переход к следующему полю после заполнения предыдущего. При разработке форм старайтесь, чтобы пользователю не нужно было лишний раз делать нажатия"
updated_on: 2014-10-21
key-takeaways:
  choose-best-input-type:
    - Выбирайте наиболее подходящий тип ввода для своих данных.
    - По мере ввода данных выдавайте подсказки с помощью элемента <code>datalist</code>.
notes:
  use-placeholders:
    - "Заполнители исчезают сразу после перевода фокуса на элемент, поэтому они не являются заменой обозначений.  Их следует использовать как вспомогательное средство, чтобы помочь пользователю выбрать требуемый формат или контент."
  recommend-input:
    - "Автозаполнение работает только в том случае, если в форме используется метод post."
  use-datalist:
    - "Значения <code>datalist</code> выдаются в качестве подсказки, пользователи при этом не ограничены предоставленными подсказками."
  provide-real-time-validation:
    - "Даже при наличии проверки ввода на стороне клиента всегда важно проверять данные на сервере для обеспечения их согласованности и безопасности."
  show-all-errors:
    - "Пользователю сразу же следует показывать все имеющиеся в форме неполадки, а не по одной за раз."
  request-auto-complete-flow:
    - "Если запрашиваются какая-либо личная информация или данные кредитной карты, страница должна выдаваться через SSL.  В противном случае в диалоговом окне должно выдаваться сообщение, предупреждающее пользователя о том, что его информация не защищена."
comments:
  # ПРИМЕЧАНИЕ. Если изменяется заголовок или URL-адрес раздела, необходимо обновить ссылки
  - g.co/mobilesiteprinciple14
  - g.co/mobilesiteprinciple15
---
<p class="intro">
  Оптимизируйте ввод информации путем выбора правильного типа ввода. Пользователям нравятся веб-сайты, которые автоматически выводят на экран цифровые клавиатуры для ввода номеров телефонов или автоматически выполняют переход к следующему полю после заполнения предыдущего. При разработке форм старайтесь, чтобы пользователю не нужно было лишний раз делать нажатия
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.choose-best-input-type %}

### Типы ввода HTML5

В HTML5 появилось несколько новых типов ввода. Эти новые типы ввода выдают подсказки
браузеру о том, клавиатуру какого вида следует отобразить в качестве экранной
клавиатуры.  Пользователям проще вводить нужную информацию без
необходимости переключать свою клавиатуру, когда они видят только те клавиши, которые нужны для ввода данного
типа.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th data-th="Input type">Тип <code>ввода</code></th>
      <th data-th="Typical keyboard">Стандартная клавиатура</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> Для ввода URL-адреса. Ввод должен начинаться с соответствующей схемы URI,
        например<code>http://</code>, <code>ftp://</code> или <code>mailto:</code>.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>Для ввода номеров телефонов. Этот тип <b>не</b>
        принуждает использовать определенный синтаксис для проверки, поэтому, если требуется обеспечить
        конкретный формат, можно использовать шаблон.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>Для ввода адресов электронной почты. Выдает подсказки о том, что
        по умолчанию на клавиатуре должна быть клавиша с символом @. Можно добавить
        атрибут multiple, если должно быть указано несколько адресов электронной почты.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>Поле для ввода текста в стиле,
        согласованном со стилем поля поиска, реализованного в данной платформе.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>Для ввода цифр. Это может быть любое рациональное
        целое число или число с плавающей запятой.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>Для ввода цифр, однако, в отличие от типа числового
        ввода, значение здесь менее важно. Отображается на экране в виде
        ползунка.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>Для ввода значений даты и времени
        в местном часовом поясе.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>Для ввода даты (только), без часового пояса
.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>Для ввода времени (только), без часового пояса
.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>Для ввода недели (только), без часового пояса
.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>Для ввода месяца (только), без часового пояса
.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/month-ios.png" srcset="imgs/month-ios.png 1x, imgs/month-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>color</code><br>Для выбора цвета.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/color-android.png" srcset="imgs/color-android.png 1x, imgs/color-android-2x.png 2x">
      </td>
    </tr>
  </tbody>
</table>

### Выдавайте подсказки во время ввода с помощью datalist

Элемент `datalist` не является типом ввода. Это список предлагаемых значений ввода,
который связывается с полем формы. Он позволяет браузеру предлагать варианты
автоматического заполнения по мере того, как пользователь вводит значения. В отличие от элементов select, когда пользователям приходится просматривать длинные
списки, чтобы найти требуемое значение, при этом они могут выбрать только значение из этого
списка, элемент `datalist` выдает подсказки по мере того, как пользователь выполняет ввод.

{% include_code src=_code/order.html snippet=datalist %}

{% include shared/remember.liquid title="Remember" list=page.notes.use-datalist %}


