project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Введение в CSS свойство overscroll-поведения.

{# wf_updated_on: 2019-08-26 #} {# wf_published_on: 2017-11-14 #}

{# wf_tags: chrome63,css,overscroll,scroll #} {# wf_blink_components: Blink>CSS
#} {# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png
#} {# wf_featured_snippet: The CSS overscroll-behavior property allows
developers to override the browser's overflow scroll effects when reaching the
top/bottom of content. It can be used to customize or prevent the mobile
pull-to-refresh action. #}

# Возьмите под контроль прокрутку: настраивайте эффекты «перетаскивания» и «переполнения» {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %} {% include
"web/_shared/contributors/majidvp.html" %} {% include
"web/_shared/contributors/sunyunjia.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-size: 14px;
  font-style: italic;
}
.border {
  border: 1px solid #ccc;
}
.centered {
  display: flex;
  justify-content: center;
}
</style>

### TL; DR {: #tldr .hide-from-toc}

Свойство [CSS
`overscroll-behavior`](https://wicg.github.io/overscroll-behavior/) позволяет
разработчикам переопределять поведение прокрутки переполнения браузера по
умолчанию при достижении верха / низа контента. Варианты использования включают
в себя отключение функции «pull-to-refresh» на мобильном устройстве, устранение
эффектов свечения при избыточной прокрутке и резиновой полосы, а также
предотвращение прокрутки содержимого страницы, если оно находится ниже
модального / наложения.

`overscroll-behavior` требует Chrome 63+. Он находится в разработке или
рассматривается другими браузерами. Смотрите
[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) для
получения дополнительной информации. {: .caution }

## Фон

### Прокрутка границ и прокрутка цепочки {: #scrollchaining }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" autoplay
loop muted alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>Цепочка прокрутки на Chrome Android.</figcaption>
</figure>

Прокрутка является одним из наиболее фундаментальных способов взаимодействия со
страницей, но с некоторыми шаблонами UX может быть сложно справиться из-за
странного поведения браузера по умолчанию. В качестве примера возьмем ящик
приложения с большим количеством элементов, которые пользователю, возможно,
придется прокручивать. Когда они достигают дна, контейнер переполнения перестает
прокручиваться, потому что больше нет контента для потребления. Другими словами,
пользователь достигает «границы прокрутки». Но обратите внимание, что
произойдет, если пользователь продолжит прокрутку. **Содержимое *позади* ящика
начинает прокручиваться** ! Прокрутка переходит к родительскому контейнеру; Сама
главная страница в примере.

Оказывается, такое поведение называется **цепочкой прокрутки** ; поведение
браузера по умолчанию при прокрутке контента. Часто значение по умолчанию
довольно хорошее, но иногда оно нежелательно или даже неожиданно. Определенные
приложения могут захотеть предоставить другой пользовательский интерфейс, когда
пользователь переходит границу прокрутки.

### Эффект тяги к обновлению {: #p2r }

Pull-to-refresh - это интуитивно понятный жест, популярный в мобильных
приложениях, таких как Facebook и Twitter. Вытягивание социальной ленты и
освобождение создает новое пространство для загрузки более свежих сообщений.
Фактически, этот конкретный UX стал *настолько популярным,* что мобильные
браузеры, такие как Chrome на Android, приняли тот же эффект. Проведите внизу
вверху страницы, чтобы обновить всю страницу:

<div class="clearfix centered">
  <figure class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
autoplay muted loop height="350" class="border"></video>
    </a>
<figcaption>Обновление в Твиттере <br> при обновлении канала в их
PWA.</figcaption>
  </figure>
  <figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" autoplay
muted loop height="350" class="border"></video>
    </a>
<figcaption>Встроенная функция Chrome для Android с обновлением <br>
обновляет всю страницу.</figcaption>
  </figure>
</div>

В таких ситуациях, как Twitter [PWA](/web/progressive-web-apps/) , возможно,
имеет смысл отключить собственное действие «тянуть-обновить». Зачем? В этом
приложении вы, вероятно, не хотите, чтобы пользователь случайно обновлял
страницу. Также есть возможность увидеть двойную анимацию обновления! В качестве
альтернативы, может быть, лучше настроить действия браузера, выровняв их в
большей степени по отношению к брендингу сайта. К сожалению, этот тип настройки
сложно осуществить. Разработчики в конечном итоге писать ненужную JavaScript,
добавить [без пассивного](/web/tools/lighthouse/audits/passive-event-listeners)
прикосновения слушателей (которые блокируют прокруткой) или наклеить всю
страницу в 100vw / В.Х. `<div>` (чтобы предотвратить страницу от переполнения).
Эти обходные пути имеют [хорошо
документированные](https://wicg.github.io/overscroll-behavior/#intro) негативные
последствия для прокрутки.

Мы можем сделать лучше!

## Представляем `overscroll-behavior` {: #intro }

`overscroll-behavior` [свойство](https://wicg.github.io/overscroll-behavior/)
является новым CSS функцией , которая управляет поведением того , что происходит
, когда вы overscroll контейнера ( в том числе самой страницы). Вы можете
использовать его для отмены цепочки прокрутки, отключения / настройки действия
«тянуть-обновить», отключения эффектов `overscroll-behavior` на iOS (когда
Safari реализует `overscroll-behavior` ) и многое другое. Самое приятное, что
<strong data-md-type="double_emphasis">использование `overscroll-behavior` не
оказывает негативного влияния на производительность страницы,</strong> как
взломы, упомянутые во вступлении!

Свойство принимает три возможных значения:

1. **авто** - по умолчанию. Свитки, которые происходят на элементе, могут
распространяться на элементы-предки.

- **содержать** - предотвращает связывание прокрутки. Свитки не распространяются
на предков, но показаны локальные эффекты в узле. Например, эффект свечения при
прокрутке на Android или эффект резиновой ленты на iOS, который уведомляет
пользователя, когда он достиг границы прокрутки. **Примечание** : использование
`overscroll-behavior: contain` в элементе `html` предотвращает действия
навигации с избыточной прокруткой.
- **нет** - то же самое, что и `contain` но также предотвращает эффекты
перезаписи в самом узле (например, свечение перезаписи Android или резиновая
полоса iOS).

Примечание: `overscroll-behavior` также поддерживает сокращения для
`overscroll-behavior-x` и `overscroll-behavior-y` если вы хотите определить
поведение только для определенной оси.

Давайте рассмотрим несколько примеров, чтобы увидеть, как использовать
`overscroll-behavior` .

## Запретить свиткам выходить из элемента фиксированной позиции {: #fixedpos }

### Сценарий чата {: #chat }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
autoplay muted loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
  <figcaption>Контент под окном чата тоже прокручивается :(</figcaption>
</figure>

Рассмотрим фиксированную чат-коробку, которая находится внизу страницы.
Предполагается, что окно чата является автономным компонентом и прокручивается
отдельно от содержимого, находящегося за ним. Однако из-за цепочки прокрутки
документ начинает прокручиваться, как только пользователь нажимает последнее
сообщение в истории чата.

Для этого приложения более уместно, чтобы свитки, которые происходят из чата,
оставались внутри чата. Мы можем сделать это, добавив `overscroll-behavior:
contain` к элементу, который содержит сообщения чата

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

По сути, мы создаем логическое разделение между контекстом прокрутки чата и
главной страницей. Конечным результатом является то, что главная страница
остается на месте, когда пользователь достигает верхней / нижней части истории
чата. Свитки, которые начинаются в окне чата, не распространяются.

### Сценарий наложения страницы {: #overlay }

Еще один вариант сценария «недостаточной прокрутки» - это прокрутка контента за
**оверлеем** с **фиксированной позицией** . `overscroll-behavior` в порядке!
Браузер пытается быть полезным, но в итоге сайт выглядит глючно.

**Пример** - модальный с и без `overscroll-behavior: contain` :

<figure class="clearfix centered">
  <div class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>До</b> : содержимое страницы прокручивается под
наложением.</figcaption>
  </div>
  <div class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>После</b> : содержимое страницы не прокручивается под
наложением.</figcaption>
  </div>
</figure>

## Отключение функции pull-to-refresh {: #disablp2r }

**Отключение действия «тянуть-обновить» - это одна строка CSS** . Просто
предотвратите цепочку прокрутки всего элемента, определяющего область просмотра.
В большинстве случаев это `<html>` или `<body>` :

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

С помощью этого простого дополнения мы исправляем двойную анимацию
pull-to-refresh в
[демонстрационной](https://ebidel.github.io/demos/chatbox.html) версии
[chatbox](https://ebidel.github.io/demos/chatbox.html) и вместо этого можем
реализовать собственный эффект, который использует более аккуратную загрузочную
анимацию. Вся папка «Входящие» также размывается при обновлении папки
«Входящие»:

<figure class="clearfix centered">
  <div class="attempt-left">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4"
autoplay muted loop height="225"></video>
    <figcaption>До</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4"
autoplay muted loop height="225"></video>
    <figcaption>После</figcaption>
  </div>
</figure>

Вот фрагмент [полного
кода](https://github.com/ebidel/demos/blob/master/chatbox.html) :

```html
<style>
  body.refreshing #inbox {
    filter: blur(1px);
    touch-action: none; /* prevent scrolling */
  }
  body.refreshing .refresher {
    transform: translate3d(0,150%,0) scale(1);
    z-index: 1;
  }
  .refresher {
    --refresh-width: 55px;
    pointer-events: none;
    width: var(--refresh-width);
    height: var(--refresh-width);
    border-radius: 50%; 
    position: absolute;
    transition: all 300ms cubic-bezier(0,0,0.2,1);
    will-change: transform, opacity;
    ...
  }
</style>

<div class="refresher">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>

<section id="inbox"><!-- msgs --></section>

<script>
  let _startY;
  const inbox = document.querySelector('#inbox');

  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {passive: true});

  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top of the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
        !document.body.classList.contains('refreshing')) {
      // refresh inbox.
    }
  }, {passive: true});
</script>
```

## Отключение эффектов свечения и резиновой полосы при прокрутке {: #disableglow }

Чтобы отключить эффект отскока при достижении границы прокрутки, используйте
`overscroll-behavior-y: none` :

```css
body {
  /* Disables pull-to-refresh and overscroll glow effect.
     Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
```

<figure class="clearfix centered">
  <div class="attempt-left">
<video src="/web/updates/images/2017/11/overscroll-behavior/drawer-glow.mp4"
autoplay muted loop height="300" class="border"></video>
<figcaption><b>До</b> : удар по границе прокрутки показывает
свечение.</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4" autoplay
muted loop height="300" class="border"></video>
    <figcaption><b>После</b> : свечение отключено.</figcaption>
  </div>
</figure>

Примечание: это все равно сохранит навигацию влево / вправо. Чтобы предотвратить
навигацию, вы можете использовать `overscroll-behavior-x: none` . Тем не менее,
это [все еще реализуется](https://crbug.com/762023) в Chrome.

## Полная демонстрация {: #demo }

[Собирая](https://ebidel.github.io/demos/chatbox.html) все это вместе, полная
[демонстрация чата](https://ebidel.github.io/demos/chatbox.html) использует
`overscroll-behavior` для создания настраиваемой анимации при обновлении и
отключении прокрутки от выхода из виджета чата. Это обеспечивает оптимальный
пользовательский опыт, который было бы сложно достичь без CSS
`overscroll-behavior` .

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4" autoplay
muted loop alt="Chatbox demo" height="600"></video>
  </a>
<figcaption><a href="https://ebidel.github.io/demos/chatbox.html"
target="_blank">Посмотреть демо</a> | <a
href="https://github.com/ebidel/demos/blob/master/chatbox.html"
target="_blank">Источник</a></figcaption>
</figure>

<br>
