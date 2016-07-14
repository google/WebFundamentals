---
title: "Обозначайте пола полЯ надлежащим образом"
description: "На мобильных устройствах заполнять формы непросто. Лучшими являются те формы, в которых как можно меньше полей"
updated_on: 2015-03-27
key-takeaways:
  label-and-name:
    - "Всегда используйте элементы <code>label</code> для полей форм, причем эти обозначения должны быть видны, когда фокус переводится на данное поле."
    - "Используйте элементы <code>placeholder</code>, с помощью которых подсказывайте пользователям, что именно они должны ввести."
    - "Чтобы помочь браузеру в автоматическом заполнении форм, используйте стандартные элементы <code>name</code> для полей ввода и указывайте атрибут <code>autocomplete</code>."
notes:
  use-placeholders:
    - "Заполнители исчезают, как только пользователь начинает ввод информации в элемент, поэтому они не являются заменой обозначений.  Их следует использовать как вспомогательное средство, чтобы помочь пользователю выбрать требуемый формат или контент."
  recommend-input:
    - "Используйте либо только <code>street-address</code>, либо и <code>address-line1</code>, и <code>address-line2</code>"
    - "<code>address-level1</code> и <code>address-level2</code> нужны, только если эти поля требуются для вашего формата адреса."
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
  - g.co/mobilesiteprinciple17a
---
<p class="intro">
  На мобильных устройствах заполнять формы непросто. Лучшими являются те формы, в которых как можно меньше полей. Хорошие формы предусматривают наличие семантического ввода. Клавиши должны меняться в соответствии с тем, какие данные вводит пользователь, например, при выборе даты на календаре. Информируйте об этом своих пользователей. Средства проверки должны сообщать пользователям, что именно им нужно сделать до того, как форма будет отправлена
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.label-and-name %}

### Важность обозначений

Элемент `label` сообщает пользователю, какую
информацию необходимо ввести в элемент формы.  Каждый элемент `label` связывается с
элементом поля ввода путем его размещения внутри элемента `label` либо с помощью атрибута "`for`"
.  Применение обозначений к элементам форм также позволяет улучшить целевой
размер зоны касания: для перевода фокуса на элемент ввода пользователь может коснуться как обозначения, так и поля ввода.


{% include_code src=_code/order.html snippet=labels %}

### Размер и местоположение обозначения

Обозначения и поля ввода должны быть достаточно большими, чтобы их было легко нажимать.  При книжной
ориентации обозначения полей следует размещать их над элементами ввода, а при альбомной – сбоку
от них.  И обозначения полей, и соответствующие поля ввода должны быть видны на экране
одновременно.  Будьте осторожны с нестандартными обработчиками прокрутки, которые могут прокрутить элемент
ввода вверх страницы, скрыв обозначение, либо обозначения, расположенные ниже элементов
ввода, могут оказаться под виртуальной клавиатурой.

### Используйте заполнители

Атрибут placeholder подсказывает пользователю, что именно следует
указать в поле ввода, обычно отображая значение в виде текста светлого тона, пока пользователь
не начнет вводить информацию в элемент.

<input type="text" placeholder="MM-YYYY">

{% highlight html%}
<input type="text" placeholder="MM-YYYY" ...>
{% endhighlight %}


{% include shared/remember.liquid title="Remember" list=page.notes.use-placeholders %}

### Используйте метаданные для обеспечения автозаполнения

Пользователям нравится, когда веб-сайты экономят их время, автоматически заполняя такие стандартные
поля, как имена, адреса электронной почты и другие часто используемые поля. Кроме того, это
позволяет снизить вероятность ошибки при вводе – особенно на виртуальных клавиатурах и
небольших устройствах.

Браузеры используют различные эвристические методы для определения того, какие поля они могут
[заполнять автоматически](https://support.google.com/chrome/answer/142893) [данными, 
указанными пользователем
ранее](https://support.google.com/chrome/answer/142893), а вы можете давать подсказки
браузеру, задавая каждому полю ввода атрибуты name и autocomplete
.

Например, чтобы подсказать браузеру, что он может автоматически ввести в форму
имя пользователя, его адрес электронной почты и номер телефона, следует использовать:

{% include_code src=_code/order.html snippet=autocomplete %}


### Рекомендуемые значения атрибутов полей ввода `name` и `autocomplete`


Значения атрибута `autocomplete` являются частью текущего [стандарта WHATWG HTML](https://html.spec.whatwg.org/multipage/forms.html#autofill). Далее приведены наиболее часто используемые атрибуты `autocomplete`.

Атрибуты `autocomplete` можно сопровождать именем раздела, например **`shipping `**`given-name` или **`billing `**`street-address`. Браузер будет заполнять разные разделы по отдельности, а не как непрерывную форму.

<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="Content type">Тип контента</th>
      Атрибут <th data-th="name attribute"><code>name</code></th>
      Атрибут <th data-th="autocomplete attribute"><code>autocomplete</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Content type">Имя</td>
      <td data-th="name attribute">
        <code>name</code>
        <code>fname</code>
        <code>mname</code>
        <code>lname</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>name</code> (полное имя)</li>
          <li><code>given-name</code> (имя)</li>
          <li><code>additional-name</code> (отчество)</li>
          <li><code>family-name</code> (фамилия)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Адрес эл. почты</td>
      <td data-th="name attribute"><code>email</code></td>
      <td data-th="autocomplete attribute"><code>email</code></td>
    </tr>
    <tr>
      <td data-th="Content type">Адрес</td>
      <td data-th="name attribute">
        <code>address</code>
        <code>city</code>
        <code>region</code>
        <code>province</code>
        <code>state</code>
        <code>zip</code>
        <code>zip2</code>
        <code>postal</code>
        <code>country</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li>Для ввода одного адреса:
            <ul>
              <li><code>street-address</code></li>
            </ul>
          </li>
          <li>Для ввода двух адресов:
            <ul>
              <li><code>address-line1</code></li>
              <li><code>address-line2</code></li>
            </ul>
          </li>
          <li><code>address-level1</code> (область или республика)</li>
          <li><code>address-level2</code> (город)</li>
          <li><code>postal-code</code> (почтовый индекс)</li>
          <li><code>country</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Телефон</td>
      <td data-th="name attribute">
        <code>phone</code>
        <code>mobile</code>
        <code>country-code</code>
        <code>area-code</code>
        <code>exchange</code>
        <code>suffix</code>
        <code>ext</code>
      </td>
      <td data-th="autocomplete attribute"><code>tel</code></td>
    </tr>
    <tr>
      <td data-th="Content type">Кредитная карта</td>
      <td data-th="name attribute">
        <code>ccname</code>
        <code>cardnumber</code>
        <code>cvc</code>
        <code>ccmonth</code>
        <code>ccyear</code>
        <code>exp-date</code>
        <code>card-type</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>cc-name</code></li>
          <li><code>cc-number</code></li>
          <li><code>cc-csc</code></li>
          <li><code>cc-exp-month</code></li>
          <li><code>cc-exp-year</code></li>
          <li><code>cc-exp</code></li>
          <li><code>cc-type</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

{% include shared/remember.liquid title="Remember" list=page.remember.recommend-input %}

### Атрибут `autofocus`

В некоторые формы, например, на главной странице Google, где единственное, что требуется от пользователя, –
это заполнить одно поле, можно добавить атрибут `autofocus`
.  Когда этот атрибут задан, настольные браузеры сразу же переводят фокус на это поле
ввода, после чего пользователи могут немедленно начать использовать форму.  Мобильные
браузеры игнорируют атрибут `autofocus`, чтобы не вызвать произвольного отображения клавиатуры
.

Атрибут autofocus следует использовать с осторожностью, поскольку он убирает фокус с клавиатуры,
что потенциально может не дать использовать для
навигации клавишу возврата на один символ.

{% highlight html %}
<input type="text" autofocus ...>
{% endhighlight %}


