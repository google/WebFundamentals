project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Tired of jittery scrolling? Great, because Chrome 49 is shipping with a new smooth scroll right out of the box!

{# wf_updated_on: 2019-09-03 #}
{# wf_published_on: 2016-02-01 #}
{# wf_tags: scroll,chrome49 #}
{# wf_blink_components: Blink>Scroll #}
{# wf_featured_image:
/web/updates/images/2016/02/smooth-scrolling-in-chrome-49/smooth-scroll.png #}

# Плавная прокрутка в Chrome 49 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

If there’s one thing that people really want from scrolling, it’s for it to be
smooth. Historically Chrome has had smooth scrolling in some places, like -- say
-- when users scroll with their trackpads, or fling a page on mobile. But if the
user has a mouse plugged in then they’d get a more jittery “stepped” scrolling
behavior, which is way less aesthetically pleasing. That's all about to change
in Chrome 49.

<div class="video-wrapper">
<iframe class="devsite-embedded-youtube-video" data-video-id="QtpEpXYEbao"
data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

The solution to the stepped native, input-driven scroll behavior for many
developers has been to use libraries, the goal of which being to remap it to
something smoother and nicer on the eyes. Users also do this, too, through
extensions. There are downsides to both libraries and extensions that change
scrolling, though:

- **An uncanny valley feel.** This manifests itself in two ways: firstly, one
site may have a smooth scroll behavior, but another may not, so the user can end
up feeling disoriented by the inconsistency. Secondly, the library’s smoothness
physics won’t necessarily match those of the platform’s. So while the motion may
be smooth it can feel wrong or uncanny.
- **Increased propensity for main thread contention and jank.** As with any
JavaScript added to the page, there will be an increased CPU load. That’s not
necessarily a disaster, depending on what else the page is doing, but if there
is some long-running work on the main thread, and scrolling has been coupled to
the main thread, the net result can be stuttering scrolls and jank.
- **Больше обслуживания для разработчиков, больше кода для загрузки
пользователями.** Наличие библиотеки для плавной прокрутки - это то, что нужно
постоянно обновлять и поддерживать, и это увеличит общий вес страницы сайта.

Эти недостатки часто также характерны для многих библиотек, которые имеют дело с
режимами прокрутки, будь то эффекты параллакса или другие анимации с прокруткой.
Они слишком часто вызывают рывки, мешают доступу и, как правило, портят
пользовательский опыт. Прокрутка - это основное взаимодействие в Интернете, и
изменение его с библиотеками должно выполняться с большой осторожностью.

В Chrome 49 поведение прокрутки по умолчанию будет меняться в Windows, Linux и
Chrome OS. Старый пошаговый режим прокрутки исчезает, и по умолчанию прокрутка
будет плавной! Никаких изменений в вашем коде не требуется, за исключением,
возможно, удаления любых библиотек с плавной прокруткой, если вы их
использовали.

## More scrolling goodies

There are other scroll-related goodies in the works that are also worth
mentioning. Many of us want scroll-coupled effects, like parallaxing, smooth
scrolling to a document fragment (like example.com/**#somesection**). As I
mentioned earlier, the approaches that are used today can often be detrimental
to both developers and users. There are two platform standards that are being
worked on that could help: Compositor Worklets and the `scroll-behavior` CSS
property.

### Houdini

Композитор Worklets являются частью [Houdini](https://wiki.css-houdini.org/) , и
его еще предстоит полностью определить и внедрить. Тем не менее, [когда
патчи](http://crbug.com/436952) появятся, они позволят вам написать JavaScript,
который выполняется как часть конвейера композитора, что в целом означает, что
эффекты, связанные с прокруткой, такие как параллаксинг, будут идеально
синхронизированы с текущей позицией прокрутки. Учитывая способ, которым
прокрутка обрабатывается сегодня, когда события прокрутки только периодически
отправляются в основной поток (и могут быть заблокированы другой работой
основного потока), это будет представлять собой огромный скачок вперед. Если вас
интересуют Compositor Worklets или какие-либо другие интересные новые функции,
которые предлагает Houdini, просмотрите сообщение [Intro to Houdini от
Surma](https://dassur.ma/things/houdini-intro/) , [спецификации
Houdini](https://drafts.css-houdini.org/) и поделитесь своими мыслями в [списке
рассылки Houdini](https://lists.w3.org/Archives/Public/public-houdini/) !

### scroll-behavior

When it comes to fragment-based scrolling, the [`scroll-behavior` CSS
property](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) is
something else that could help. If you want to try it out you’ll be pleased to
know it’s shipped in Firefox already, and you can enable it in Chrome Canary
using the **“Enable experimental Web Platform features”** flag. If you set --
say -- the `<body>` element to `scroll-behavior: smooth`, all scrolls that are
triggered either by fragment changes or by `window.scrollTo` will be animated
smoothly! That’s way better than having to use and maintain code from a library
that tries to do the same thing. With something as fundamental as scrolling,
it’s really important to avoid breaking user expectation, so while these
features are in flux it’s still worth adopting a Progressive Enhancement
approach, and removing any libraries that attempt to polyfill these behaviors.

## Go forth and scroll

Начиная с Chrome 49, прокрутка становится более плавной. Но это еще не все: есть
и другие потенциальные улучшения, которые могут появиться благодаря свойствам
Houdini и CSS, таким как `smooth-scroll` . Попробуйте Chrome 49, дайте нам
знать, что вы думаете, и, прежде всего, **дайте браузеру прокрутить, где вы
можете!**
