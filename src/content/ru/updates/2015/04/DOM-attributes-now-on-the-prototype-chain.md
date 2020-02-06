project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome соответствует спецификации. Проверьте свои сайты, если вы используете логику WebKit для распространения атрибутов.

{# wf_updated_on: 2019-03-22 #} {# wf_published_on: 2015-04-13 #} {# wf_tags:
news,dom #} {# wf_blink_components: Blink>DOM #}

# Атрибуты DOM теперь в цепочке прототипов {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Команда Chrome недавно [объявила, что мы перемещаем свойства DOM в цепочку
прототипов](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/H0MGw0jkdn4)
. Это изменение, реализованное в [Chrome
43](https://www.chromestatus.com/feature/6052436003258368) (бета-версия на
середину апреля 2015 года), приводит Chrome в большее соответствие с [Web ID
Spec](https://heycam.github.io/webidl/#es-attributes) и реализациями других
браузеров, таких как IE и Firefox. *Изменено: уточнил* Старые браузеры на основе
WebKit, в настоящее время не совместимы со спецификацией, кроме Safari.

Примечание. Использование слова «атрибут» и «свойство» используются в этом посте
взаимозаменяемо, спецификация ECMA Script определяет «свойства», имеющие
«атрибуты». Свойство JS *является* «Атрибутом WebIDL». Атрибут в этой статье не
является атрибутом HTML, таким как `class` для элемента изображения.

Новое поведение положительно во многих отношениях. Оно:

- Улучшает совместимость через веб (IE и Firefox уже делают это) через
соответствие спецификации.
- Позволяет вам последовательно и эффективно создавать методы
получения/установки для каждого объекта DOM.
- Увеличивает возможность взлома DOM-программирования. Например, это позволит
вам реализовать полизаполнения, которые позволят вам эффективно эмулировать
функциональность, отсутствующую в некоторых браузерах и библиотеках JavaScript,
которые переопределяют поведение атрибутов DOM по умолчанию.

Например, гипотетическая спецификация W3C включает некоторую новую
функциональность, называемую `isSuperContentEditable` и браузер Chrome не
реализует ее, но можно «заполнить» или эмулировать функцию с помощью библиотеки.
Как разработчик библиотеки, вы, естественно, захотите использовать `prototype`
следующим образом для создания эффективного полифилла:

```
Object.defineProperty(HTMLDivElement.prototype, "isSuperContentEditable", {
  get: function() { return true; },
  set: function() { /* some logic to set it up */ },
});
```

До этого изменения - для согласованности с другими свойствами DOM в Chrome - вам
пришлось бы создавать новое свойство для каждого экземпляра, который для каждого
`HTMLDivElement` на странице был бы очень неэффективным.

Эти изменения важны для согласованности, производительности и стандартизации
веб-платформы, однако они могут вызвать некоторые проблемы для разработчиков.
Если вы полагались на это поведение из-за унаследованной совместимости между
Chrome и WebKit, мы рекомендуем вам проверить свой сайт и просмотреть сводку
изменений ниже.

## Сводка изменений

### Использование `hasOwnProperty` для экземпляра объекта DOM теперь возвращает `false`

Иногда разработчики используют `hasOwnProperty` для проверки наличия свойства
объекта. Это больше не будет работать в [соответствии со
спецификацией,](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2.4.5)
поскольку атрибуты DOM теперь являются частью цепочки прототипов, а
`hasOwnProperty` проверяет только текущие объекты, чтобы определить, определен
ли он в нем.

До и включая Chrome 42 следующее вернуло бы `true` .

```
> div = document.createElement("div");
> div.hasOwnProperty("isContentEditable");

true
```

В Chrome 43 и далее он вернет `false` .

```
> div = document.createElement("div");
> div.hasOwnProperty("isContentEditable");

false
```

Теперь это означает, что если вы хотите проверить, что `isContentEditable`
доступен для элемента, который вы хотите проверить, прототип объекта
HTMLElement. Например, `HTMLDivElement` наследуется от `HTMLElement` который
определяет свойство `isContentEditable` .

```
> HTMLElement.prototype.hasOwnProperty("isContentEditable");

true
```

Вы не ограничены в использовании `hasOwnProperty` . Мы рекомендуем использовать
более простой операнд  {code2}in{/code2}, так как он будет проверить свойство на
всей цепочке прототипов.

```
if("isContentEditable" in div) {
  // We have support!!
}
```

### Object.getOwnPropertyDescriptor в DOM Object Instance больше не будет возвращать дескриптор свойства для атрибутов.

Если вашему сайту необходимо получить дескриптор свойства для атрибута в объекте
DOM, теперь вам нужно следовать цепочке прототипов.

Если бы вы хотели получить описание свойства в Chrome 42 и ранее, вы бы сделали:

```
> Object.getOwnPropertyDescriptor(div, "isContentEditable");

Object {value: "", writable: true, enumerable: true, configurable: true}
```

Chrome 43 и выше вернет `undefined` в этом сценарии.

```
> Object.getOwnPropertyDescriptor(div, "isContentEditable");

undefined
```

Это означает, что теперь для получения дескриптора свойства для свойства
isContentEditable вам нужно следовать цепочке прототипов следующим образом:

```
> Object.getOwnPropertyDescriptor(HTMLElement.prototype, "isContentEditable");

Object {get: function, set: function, enumerable: false, configurable: false}
```

### JSON.stringify больше не будет сериализовать атрибуты DOM

JSON.stringify не сериализует свойства DOM, которые находятся на прототипе.
Например, это может повлиять на ваш сайт, если вы пытаетесь сериализовать
объект, такой как [PushSubscription
для](https://w3c.github.io/push-api/#pushsubscription-interface)
Push-уведомлений.

Chrome 42 и ранее работало бы следующее:

```
> JSON.stringify(subscription);

{
  "endpoint": "https://something",
  "subscriptionId": "SomeID"
}
```

Chrome 43 и далее не будет сериализовать свойства, определенные в прототипе, и
вам будет возвращен пустой объект.

```
> JSON.stringify(subscription);

{}
```

Вам нужно будет указать свой собственный метод сериализации, например, вы можете
сделать следующее:

```
function stringifyDOMObject(object)
{
    function deepCopy(src) {
        if (typeof src != "object")
            return src;
        var dst = Array.isArray(src) ? [] : {};
        for (var property in src) {
            dst[property] = deepCopy(src[property]);
        }
        return dst;
    }
    return JSON.stringify(deepCopy(object));
}
var s = stringifyDOMObject(domObject);
```

### Запись в свойства только для чтения в строгом режиме приведет к ошибке

Запись в свойства только для чтения должна вызывать исключение, когда вы
используете строгий режим. Например, возьмите следующее:

```
function foo() {
  "use strict";
  var d = document.createElement("div");
  console.log(d.isContentEditable);
  d.isContentEditable = 1;
  console.log(d.isContentEditable);
}
```

В Chrome 42 и более ранних `isContentEditable` функция продолжала бы и
продолжала молча выполнять ее, хотя {code1}isContentEditable{/code1} не
изменилась бы.

```
// Chrome 42 and earlier behavior
> foo();

false // isContentEditable
false // isContentEditable (after writing to read-only property)
```

Теперь в Chrome 43 и далее будет выброшено исключение.

```
// Chrome 43 and onwards behavior
> foo();

false
Uncaught TypeError: Cannot set property isContentEditable of #<HTMLElement> which has only a getter
```

## У меня проблема, что мне делать?

Следуйте инструкциям или оставьте комментарий ниже и давайте поговорим.

## Я видел сайт с проблемой, что мне делать?

Отличный вопрос. Большинство проблем с сайтами будет основано на том факте, что
сайт выбрал обнаружение атрибутов с `getOwnProperty` метода
{code1}getOwnProperty{/code1}, это в основном происходит, когда владелец сайта
использует только старые браузеры WebKit. Разработчик может сделать несколько
вещей:

- Зарегистрируйте проблему с уязвимым сайтом на нашем (Chrome) трекере
- Зарегистрируйте проблему на радаре WebKit и укажите ссылку
https://bugs.webkit.org/show_bug.cgi?id=49739.

## Я обычно заинтересован в том, чтобы следить за этим изменением

- Оригинальная ошибка 2010 года:
[https://bugs.chromium.org/p/chromium/issues/detail?id=43394](https://bugs.chromium.org/p/chromium/issues/detail?id=43394)
- примечание: на ней большая часть работы.
- [Проверка кода](https://codereview.chromium.org/984523003/) {: .external } для
коммита

{% include "web/_shared/helpful.html" %} {% include
"web/_shared/rss-widget-updates.html" %}
