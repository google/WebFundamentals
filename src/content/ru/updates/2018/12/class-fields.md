project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Several proposals expand the existing JavaScript class syntax with new functionality. This article explains the new public class fields syntax in V8 v7.2 and Chrome 72, as well as the upcoming private class fields syntax.

{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2019-02-07 #}
{# wf_published_on: 2018-12-13 #}
{# wf_tags: javascript,chrome72 #}
{# wf_featured_image: /web/updates/images/generic/js.png #}
{# wf_featured_snippet: Several proposals expand the existing JavaScript class syntax with new functionality. This article explains the new public class fields syntax in V8 v7.2 and Chrome 72, as well as the upcoming private class fields syntax. #}
{# wf_blink_components: Blink>JavaScript>Language #}

# Публичные и приватные поля классов {: .page-title }

{% include "web/_shared/contributors/mathiasbynens.html" %}

Несколько предложений расширяют существующий синтаксис классов в JavaScript новой функциональностью. Эта статья
объясняет новый синтаксис публичных полей классов в V8 v7.2 и Chrome 72, а также грядущих приватных полей.

Вот пример кода, который создает экземпляр класса `IncreasingCounter`:

```js
const counter = new IncreasingCounter();
counter.value;
// logs 'Getting the current value!'
// → 0
counter.increment();
counter.value;
// logs 'Getting the current value!'
// → 1
```

Отметим, что обращение к `value` выполняет некоторый код (вывод сообщения в лог) перед тем, как вернуть значение. Теперь
спросите себя: как бы Вы реализовали этот класс на JavaScript? 🤔

## Классы ES2015

Ниже пример того, как класс `IncreasingCounter` может быть реализован с помощью синтаксиса ES2015:

```js
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

Класс предоставляет геттер `value` и метод для инкремента значения в прототипе. Обратите внимание, что у класса есть
конструктор, который добавляет свойство `_count` и устанавливает его начальное значение в `0`. Сейчас мы используем
префикс подчеркивания, чтобы обозначить, что `_count` не должен использоваться напрямую вне класса, но это просто
соглашение; в действительности это не приватное свойство, а эта семантика не определена в самом языке.

```js
const counter = new IncreasingCounter();
counter.value;
// logs 'Getting the current value!'
// → 0

// Nothing stops people from reading or messing with the
// `_count` instance property. 😢
counter._count;
// → 0
counter._count = 42;
counter.value;
// logs 'Getting the current value!'
// → 42
```

## Публичные поля классов

Новый синтаксис для публичных полей позволяет упростить определение класса:

```js
class IncreasingCounter {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

Свойство `_count` теперь лаконично объявлено в начале класса. Нам больше не нужен конструктор только для того, чтобы
определить некоторые поля. Отлично!

Тем не менее, `_count` — все еще публичное свойство. А в этом конкретном примере мы хотим предотвратить обращение к
этому полю напрямую.

## Приватные поля классов

Именно здесь на помощь приходят приватные поля. Новый синтаксис для приватных полей схож с синтаксисом публичных полей,
за исключением того, что [Вы помечаете их как приватные, используя символ
`#`](https://github.com/tc39/proposal-class-fields/blob/master/PRIVATE_SYNTAX_FAQ.md).
Вы можете думать, что `#` — это просто часть имени поля:

```js
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}
```

Приватные поля недоступны вне тела класса:

```js
const counter = new IncreasingCounter();
counter.#count;
// → SyntaxError
counter.#count = 42;
// → SyntaxError
```

## Статические свойства

Синтаксис полей классов может быть использован для создания публичных и приватных статических свойств и методов, как
показано ниже:

```js
class FakeMath {
  // `PI` is a static public property.
  static PI = 22 / 7; // Close enough.

  // `#totallyRandomNumber` is a static private property.
  static #totallyRandomNumber = 4;

  // `#computeRandomNumber` is a static private method.
  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber;
  }

  // `random` is a static public method (ES2015 syntax)
  // that consumes `#computeRandomNumber`.
  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber();
  }
}

FakeMath.PI;
// → 3.142857142857143
FakeMath.random();
// logs 'I heard you like random numbers…'
// → 4
FakeMath.#totallyRandomNumber;
// → SyntaxError
FakeMath.#computeRandomNumber();
// → SyntaxError
```

## Упрощение работы с подклассами

Преимущества нового синтаксиса полей классов становятся более очевидны при работе с подклассами, которые вводят
дополнительные поля. Представим следующий базовый класс `Animal`:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}
```

Чтобы создать подкласс `Cat`, который добавляет новое свойство для экземпляра, ранее требовалось обратиться к `super()`,
чтобы вызвать конструктор базового класса `Animal` перед тем, как создать это свойство:

```js
class Cat extends Animal {
  constructor(name) {
    super(name);
    this.likesBaths = false;
  }
  meow() {
    console.log('Meow!');
  }
}
```

Здесь много шаблонного кода только для того, чтобы указать, что коты не очень любят принимать ванну. К счастью, новый
синтаксис полей классов избавляет от необходимости определения этого конструктора с неуклюжим вызовом `super()`:

```js
class Cat extends Animal {
  likesBaths = false;
  meow() {
    console.log('Meow!');
  }
}
```

## Итого

Публичные поля классов доступны, начиная с V8 v7.2 и Chrome 72. Скоро планируется релиз и приватных полей классов.

У Вас есть вопросы о новых возможностях языка? Комментарии к этой статье? Не стесняйтесь писать мне в Твиттер [@mathias](https://twitter.com/mathias)!

## Обратная связь

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}
