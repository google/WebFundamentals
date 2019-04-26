project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Houdini’s CSS Paint API allows you to programmatically draw CSS images.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-05-21 #}
{# wf_published_on: 2018-01-18 #}
{# wf_tags: css,style,houdini,javascript,chrome65 #}
{# wf_featured_image: /web/updates/images/2018/01/paintapi/houdinidiamond.png #}
{# wf_featured_snippet: Houdini’s CSS Paint API allows you to programmatically draw CSS images. #}
{# wf_blink_components: Blink>CSS #}


# CSS Paint API {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

## Новые возможности в Chrome 65 API CSS Paint (также известный как «CSS Custom Paint» или «Hoodini&#39;s paint worklet») по умолчанию будет включен в Chrome Stable. Что это? Что ты можешь сделать с этим? И как это работает? Ну, читайте дальше, я ...


CSS Paint API позволяет вам программно генерировать изображение всякий раз, когда свойство CSS ожидает изображение. Свойства, такие как `background-image` или `border-image` , обычно используются с `url()` для загрузки файла изображения или с помощью встроенных функций CSS, таких как `linear-gradient()` . Вместо использования этих методов теперь вы можете использовать `paint(myPainter)` для ссылки на _paint worklet_.

### Написание красок

Чтобы определить рабочую графу под названием `myPainter` , нам нужно загрузить файл с краской CSS, используя `CSS.paintWorklet.addModule('my-paint-worklet.js')` . В этом файле мы можем использовать функцию `registerPaint` для регистрации класса рабочей краски:

    class MyPainter {
      paint(ctx, geometry, properties) {
        // ...
      }
    }

    registerPaint('myPainter', MyPainter);

В `paint()` мы можем использовать `ctx` же, как и мы, `CanvasRenderingContext2D` как мы знаем из `<canvas>` . Если вы знаете, как рисовать в `<canvas>` , вы можете рисовать краску! `geometry` указывается ширина и высота холста, которые находятся в нашем распоряжении. `properties` Я объясню позже в этой статье.

Note: Контекст краски не на 100% совпадает с контекстом `<canvas>` . На данный момент методы текстового рендеринга отсутствуют, и по соображениям безопасности вы не можете считывать пиксели с холста.

В качестве вводного примера, давайте напишем шаблонную маску для шахматной доски и используем ее в качестве фонового изображения `<textarea>` . (Я использую textarea, потому что он по умолчанию изменен.):

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      paint(ctx, geom, properties) {
        // Use `ctx` as if it was a normal canvas
        const colors = ['red', 'green', 'blue'];
        const size = 32;
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            const color = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.rect(x * size, y * size, size, size);
            ctx.fill();
          }
        }
      }
    }

    // Register our class under a specific name
    registerPaint('checkerboard', CheckerboardPainter);

Если вы использовали ранее `<canvas>` , этот код должен выглядеть знакомым. Посмотрите живое [demo](https://googlechromelabs.github.io/houdini-samples/paint-worklet/checkerboard/) здесь.

Note: Как и почти все новые API, API CSS Paint доступен только через HTTPS (или `localhost` ).

<img src="/web/updates/images/2018/01/paintapi/checkerboard1.png" alt="
  Textarea with a checkerboard pattern as a background image.">

Отличие от использования общего фонового изображения здесь в том, что шаблон будет повторно нарисован по требованию, когда пользователь изменяет размер текстового поля. Это означает, что фоновое изображение всегда точно такое же большое, как и должно быть, включая компенсацию для дисплеев с высокой плотностью.

Это довольно круто, но это тоже довольно статично. Хотим ли мы писать новую работу каждый раз, когда нам нужен один и тот же шаблон, но с квадратами разного размера? Ответ - нет!

### Параметрирование вашей работы

К счастью, рабочая марка может получить доступ к другим свойствам CSS, в которые входит дополнительный параметр `properties` . Предоставляя классу статический атрибут `inputProperties` , вы можете подписаться на изменения в любом свойстве CSS, включая настраиваемые свойства. Значения будут предоставлены вам через параметр `properties` .

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        /* The paint worklet subscribes to changes of these custom properties. */
        --checkerboard-spacing: 10;
        --checkerboard-size: 32;
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      // inputProperties returns a list of CSS properties that this paint function gets access to
      static get inputProperties() { return ['--checkerboard-spacing', '--checkerboard-size']; }

      paint(ctx, geom, properties) {
        // Paint worklet uses CSS Typed OM to model the input values.
        // As of now, they are mostly wrappers around strings,
        // but will be augmented to hold more accessible data over time.
        const size = parseInt(properties.get('--checkerboard-size').toString());
        const spacing = parseInt(properties.get('--checkerboard-spacing').toString());
        const colors = ['red', 'green', 'blue'];
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            ctx.fillStyle = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.rect(x*(size + spacing), y*(size + spacing), size, size);
            ctx.fill();
          }
        }
      }
    }

    registerPaint('checkerboard', CheckerboardPainter);

Теперь мы можем использовать один и тот же код для всех типов шахматных досок. Но еще лучше, теперь мы можем перейти в DevTools и [fiddle with the values](https://googlechromelabs.github.io/houdini-samples/paint-worklet/parameter-checkerboard/) пока не найдем правильный взгляд.

<div style="display: flex; justify-content: center">
  <video loop muted controls>
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_vp8.webm"
      type="video/webm; codecs=vp8">
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_x264.mp4"
      type="video/mp4; codecs=h264">
  </video>
</div>

Note: Было бы здорово также параметризовать цвета, не так ли? Спецификация позволяет функции `paint()` принимать список аргументов. Эта функция еще не реализована в Chrome, так как она в значительной степени зависит от API свойств и значений Houdini, который по-прежнему нуждается в некоторой работе, прежде чем он сможет отправить.

## Браузеры, которые не поддерживают рисование на момент написания, только Chrome имеет краску. Хотя есть положительные сигналы от всех других поставщиков браузеров, прогресс в нем невелик. Чтобы быть в курсе [Is Houdini Ready Yet?](https://ishoudinireadyyet.com) регулярно проверяйте [Is Houdini Ready Yet?](https://ishoudinireadyyet.com) . В то же время обязательно используйте прогрессивное усовершенствование, чтобы поддерживать работу вашего кода, даже если нет поддержки для работы с краской. Чтобы убедиться, что все работает должным образом, вы должны настроить свой код в двух местах: CSS и JS.

Обнаружение поддержки рисования в JS можно выполнить, проверив объект `CSS` :

    if ('paintWorklet' in CSS) {
      CSS.paintWorklet.addModule('mystuff.js');
    }

Для стороны CSS у вас есть два варианта. Вы можете использовать `@supports` :

    @supports (background: paint(id)) {
      /* ... */
    }

Более компактный трюк заключается в том, что CSS недействителен и впоследствии игнорирует объявление целого свойства, если в нем есть неизвестная функция. Если вы указываете свойство дважды - сначала без рисования, а затем с помощью рабочей краски - вы получаете прогрессивное улучшение:

    textarea {
      background-image: linear-gradient(0, red, blue);
      background-image: paint(myGradient, red, blue);
    }

В браузерах _with_ поддержка красок, второе объявление `background-image` перезапишет первое. В браузерах _without_ поддержки красок, вторая декларация недействительна и будет отброшена, оставив первое объявление в действии.

### CSS WORSS0

Для многих применений также можно использовать [CSS Paint Polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) , который добавляет поддержку CSS Custom Paint и Paint Worklets для современных браузеров.

## использования Существует много случаев использования красок, некоторые из них более очевидны, чем другие. Один из наиболее очевидных - использование красок для уменьшения размера вашей DOM. Зачастую элементы добавляются исключительно для создания украшений с использованием CSS. Например, в [Material Design Lite](https://getmdl.io) кнопка с эффектом пульсации содержит 2 дополнительных элемента `<span>` для реализации самой пульсации. Если у вас много кнопок, это может привести к множеству элементов DOM и может привести к снижению производительности на мобильных устройствах. Если вместо этого вы используете [implement the ripple effect using paint worklet](https://googlechromelabs.github.io/houdini-samples/paint-worklet/ripple/) , вы получите 0 дополнительных элементов и только одну краску. Кроме того, у вас есть что-то, что намного проще настроить и параметризовать.

Еще одним преимуществом использования красок является то, что - в большинстве сценариев - решение с использованием малярной мазки является небольшим по количеству байтов. Конечно, есть компромисс: ваш код краски будет работать всякий раз, когда размер холста или любой из параметров изменится. Поэтому, если ваш код сложный и занимает много времени, он может ввести jank. Chrome работает с движущимися красками с основной резьбы, так что даже длительные рабочие краски не влияют на отзывчивость основной нити.

Для меня самая захватывающая перспектива заключается в том, что красящая метка позволяет эффективно полировать функции CSS, которых браузер пока не имеет. Одним из примеров может быть полифония [conic gradients](https://lab.iamvdo.me/houdini/conic-gradient) пока они не приземлятся в Chrome изначально. Другой пример: на собрании CSS было решено, что теперь вы можете иметь несколько цветов границ. Пока эта встреча продолжалась, мой коллега Ян Килпатрик [wrote a polyfill](https://twitter.com/malyw/status/934737334494429184) за это новое поведение CSS, используя краску.

## Мышление вне рамки. Большинство людей начинают думать о фоновых изображениях и изображениях границ, когда они узнают о краской. Один менее интуитивно понятный случай использования для краски - `mask-image` чтобы элементы DOM имели произвольные формы. Например, [diamond](https://googlechromelabs.github.io/houdini-samples/paint-worklet/diamond-shape/) :

<img src="/web/updates/images/2018/01/paintapi/houdinidiamond.png" alt="
  A DOM element in the shape of a diamond.">

`mask-image` принимает изображение, которое является размером элемента. Области, где изображение маски прозрачно, элемент прозрачен. Области, где изображение маски непрозрачно, элемент непрозрачен.

## Теперь в Chrome

Некоторое время в Chrome Canary работала краска. С Chrome 65 он включен по умолчанию. Идите вперед и попробуйте новые возможности, которые раскрывают работу, и покажите нам, что вы построили! Для большего вдохновения взгляните на [Vincent De Oliveira’s collection](https://lab.iamvdo.me/houdini/) .

Note: В настоящее время точки останова не поддерживаются в CSS Paint API, но будут включены в более поздней версии Chrome.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}