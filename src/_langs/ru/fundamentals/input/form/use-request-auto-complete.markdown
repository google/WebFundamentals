---
layout: article
title: "Упрощение заполнения форм с помощью API-интерфейса requestAutocomplete"
description: "Функция <code>requestAutocomplete</code> была создана, чтобы помочь пользователям заполнять формы. Сегодня она чаще всего используется в электронной торговле, где процент незавершенных операций оформления заказов с мобильных устройств <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>может достигать 97 %</a>"
introduction: "Функция <code>requestAutocomplete</code> была создана, чтобы помочь пользователям заполнять формы. Сегодня она чаще всего используется в электронной торговле, где процент незавершенных операций оформления заказов с мобильных устройств <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>может достигать 97 %</a>. Представьте себе, что 97 % людей в супермаркете, тележки которых полны нужными им вещами, бросают их, не дойдя до кассы, и уходят"
article:
  written_on: 2014-04-30
  updated_on: 2014-10-21
  order: 5
authors:
  - petelepage
priority: 0
collection: form-input
key-takeaways:
  request-auto-complete-flow:
    - Функция <code>requestAutocomplete</code> может значительно упростить процесс оформления заказов и
      облегчить работу пользователей.
    - Если имеется функция <code>requestAutocomplete</code>, не выводите на экран форму оформления заказа – пусть люди сразу попадают
      на страницу подтверждения заказа.
    - Поля ввода должны иметь соответствующий атрибут автозаполнения.
remember:
  use-placeholders:
    - Заполнители исчезают сразу после перевода фокуса на элемент, поэтому
      они не являются заменой обозначений.  Их следует использовать как вспомогательное средство,
      чтобы помочь пользователю выбрать требуемый формат или контент.
  recommend-input:
    - Автозаполнение работает только в том случае, если в форме используется метод post.
  use-datalist:
    - Значения <code>datalist</code> выдаются в качестве подсказки, пользователи при этом
      не ограничены предоставленными подсказками.
  provide-real-time-validation:
    - Даже при наличии проверки ввода на стороне клиента всегда важно
      проверять данные на сервере для обеспечения их согласованности и безопасности.
  show-all-errors:
    - Пользователю сразу же следует показывать все имеющиеся в форме неполадки, а не по одной за раз.
  request-auto-complete-flow:
    - Если запрашиваются какая-либо личная информация или данные кредитной
      карты, страница должна выдаваться через SSL.  В противном случае в диалоговом окне должно
      выдаваться сообщение, предупреждающее пользователя о том, что его информация не защищена.
---
{% wrap content %}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  table.inputtypes th:nth-of-type(2) {
    min-width: 270px;
  }

  table.tc-heavyright th:first-of-type {
    width: 30%;
  }
</style>

{% include modules/takeaway.liquid list=page.key-takeaways.use-request-auto-complete %}

Вместо того чтобы сайт использовал данные от определенного провайдера платежного сервиса,
функция `requestAutocomplete` запрашивает у браузера реквизиты платежа (такие как имя, адрес и данные кредитной
карты), которые он может хранить
так же, как и другие заполняемые автоматически данные.

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/ljYeHwGgzQk?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

### Поток операций `requestAutocomplete`

В идеале сайт должен отображать диалоговое окно `requestAutocomplete`, вместо того чтобы загружать
страницу с формой оформления заказа. Если все идет хорошо, пользователь вообще не должен видеть
форму.  Функцию `requestAutocomplete` можно без труда добавить в существующие формы,
при этом не требуется изменять имеющиеся имена полей.  Просто добавьте к каждому элементу формы с соответствующим значением атрибут `autocomplete`
, после чего добавьте к элементу формы функцию
`requestAutocomplete()`. Об остальном позаботится
браузер.

<img src="imgs/rac_flow.png" class="center" alt="Поток операций запроса автозаполнения">

{% include_code _code/rac.html rac javascript %}

Наличие функции `requestAutocomplete` в элементе `form` указывает браузеру,
что он должен заполнить форму.  Для обеспечения безопасности эту функцию
необходимо вызывать с помощью такого жеста пользователя, как касание или щелчок мышью. После этого открывается
диалоговое окно с запросом разрешения пользователя на заполнение полей, а также данных,
которые он хочет указать.

{% include_code _code/rac.html handlerac javascript %}

По завершении функция `requestAutocomplete` вызовет событие
`autocomplete`, если она была выполнена успешно, либо `autocompleteerror`, если
ей не удалось заполнить форму.  Если функция завершилась успешно и форма
прошла проверку, просто отправьте форму и перейдите к подтверждению
заказа.

{% include modules/remember.liquid title="Remember" list=page.remember.request-auto-complete-flow %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
