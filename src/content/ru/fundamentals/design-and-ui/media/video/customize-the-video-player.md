project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Различные платформы по-разному отображают видео. Мобильные решения должны учитывать ориентацию устройства. Для управления полноэкранным воспроизведением видео используйте Fullscreen API.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Как настроить видеопроигрыватель {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Различные платформы по-разному отображают видео. Мобильные решения должны учитывать расположение устройства. Для управления полноэкранным воспроизведением видео используйте Fullscreen API.



Различные платформы по-разному отображают видео. Мобильные решения должны учитывать ориентацию устройства. Для управления полноэкранным воспроизведением видео используйте Fullscreen API.

## Изменение ориентации на различных устройствах

Ориентация не имеет никакого значения для настольных компьютеров и ноутбуков - ведь они всегда находятся в одном положении. Однако при разработке веб-страниц для смартфонов и планшетов учитывать ориентацию устройств чрезвычайно важно.

Safari для iPhone отлично справляется с задачей переключения между вертикальной и горизонтальной ориентацией:

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Скриншот видеопроигрывателя в Safati на iPhone, вертикальная ориентация" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Скриншот видеопроигрывателя в Safati на iPhone, горизонтальная ориентация" src="images/iPhone-video-playing-landscape.png">
</div>

На iPad, а также в браузере Chrome для Android изменение ориентации устройства может оказаться более проблематичным.
В частности, ненастроенный видеопроигрыватель на iPad в горизонтальном расположении выглядит так:

<img class="center" alt="Скриншот видеопроигрывателя в Safati на iPad Retina, горизонтальная ориентация"
src="images/iPad-Retina-landscape-video-playing.png">

Если вы установите настройки видео "width: 100%" или "max-width: 100%" с помощью CSS, это поможет решить многие проблемы, связанные с ориентацией устройства. Вы также можете использовать полноэкранный режим просмотра.

## Встроенное видео или полноэкранный режим

Различные платформы по-разному отображают видео. Safari для iPhone отображает элемент video как встроенный в веб-страницу, однако воспроизводит его в полноэкранном режиме:

<img class="center" alt="Скриншот видео на iPhone, вертикальная ориентация" src="images/iPhone-video-with-poster.png">

На устройствах Android пользователь может запустить полноэкранный режим, нажав на соответствующий значок. Однако по умолчанию видео будет воспроизводиться как встроенное:

<img class="center" alt="Скриншот видео в Chrome для Android, вертикальная ориентация" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Safari для iPad воспроизводит видео как встроенное:

<img class="center" alt="Скриншот видео в Safari для iPad Retina, горизонтальная ориентация" src="images/iPad-Retina-landscape-video-playing.png">

## Управление полноэкранным отображением контента

Платформы, которые не запускают автоматически полноэкранный режим, [в большинстве случаев поддерживают](//caniuse.com/fullscreen) Fullscreen API. Используйте этот API для управления полноэкранным отображением видео или страницы.

Полноэкранное отображение элемента, например video:

    elem.requestFullScreen();
    

Полноэкранное отображение всего документа:

    document.body.requestFullScreen();
    

Вы также можете установить прослушивание событий, связанных с изменением полноэкранного режима:

    video.addEventListener("fullscreenchange", handler);
    

Или проверить, отображается ли элемент в полноэкранном режиме:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Кроме того, вы можете использовать псевдо-класс CSS `fullscreen` для изменения способа отображения элементов в полноэкранном режиме.

На устройствах, поддерживающих Fullscreen API, вы можете использовать значки для обозначения места под видео:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
  <p>Этот браузер не поддерживает элемент video.</p>
</video>

Хотите посмотреть, как это работает? Тогда вам <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html">сюда</a>.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



