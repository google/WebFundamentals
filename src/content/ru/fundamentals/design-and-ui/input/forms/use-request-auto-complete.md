project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Функция <code>requestAutocomplete</code> была создана, чтобы помочь пользователям заполнять формы. Сегодня она чаще всего используется в электронной торговле, где процент незавершенных операций оформления заказов с мобильных устройств <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>может достигать 97 %</a>

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Упрощение заполнения форм с помощью API-интерфейса requestAutocomplete {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Функция <code>requestAutocomplete</code> была создана, чтобы помочь пользователям заполнять формы. Сегодня она чаще всего используется в электронной торговле, где процент незавершенных операций оформления заказов с мобильных устройств <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>может достигать 97 %</a>. Представьте себе, что 97 % людей в супермаркете, тележки которых полны нужными им вещами, бросают их, не дойдя до кассы, и уходят


## TL;DR {: .hide-from-toc }
{# wf_TODO #}
Warning: A tag here did NOT convert properly, please fix! ''


Вместо того чтобы сайт использовал данные от определенного провайдера платежного сервиса,
функция `requestAutocomplete` запрашивает у браузера реквизиты платежа (такие как имя, адрес и данные кредитной
карты), которые он может хранить
так же, как и другие заполняемые автоматически данные.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="ljYeHwGgzQk"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
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

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/input/forms/_code/rac.html" region_tag="rac" lang=javascript %}
</pre>

Наличие функции `requestAutocomplete` в элементе `form` указывает браузеру,
что он должен заполнить форму.  Для обеспечения безопасности эту функцию
необходимо вызывать с помощью такого жеста пользователя, как касание или щелчок мышью. После этого открывается
диалоговое окно с запросом разрешения пользователя на заполнение полей, а также данных,
которые он хочет указать.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/input/forms/_code/rac.html" region_tag="handlerac" lang=javascript %}
</pre>

По завершении функция `requestAutocomplete` вызовет событие
`autocomplete`, если она была выполнена успешно, либо `autocompleteerror`, если
ей не удалось заполнить форму.  Если функция завершилась успешно и форма
прошла проверку, просто отправьте форму и перейдите к подтверждению
заказа.

<!-- TODO: Verify note type! -->
Note: Если запрашиваются какая-либо личная информация или данные кредитной карты, страница должна выдаваться через SSL.  В противном случае в диалоговом окне должно выдаваться сообщение, предупреждающее пользователя о том, что его информация не защищена.


