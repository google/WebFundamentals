project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: В ответ на отзывы разработчиков некоторые новые функции веб-анимации переименовываются.

{# wf_updated_on: 2019-03-22 #} {# wf_published_on: 2015-04-01 #} {# wf_tags:
news,webanimations #} {# wf_blink_components: N/A #}

# Упрощенные понятия в именовании веб-анимации {: .page-title }

{% include "web/_shared/contributors/samthorogood.html" %}

Native support for Web Animations first shipped [in Chrome
36](/web/updates/2014/05/Web-Animations-element-animate-is-now-in-Chrome-36),
and was updated with playback control [in Chrome
39](/web/updates/2014/12/web-animation-playback). The `Element.animate()` method
can be used to trigger imperative animations directly from JavaScript, and its
returned object can be leveraged to control the playback of these animations.
These methods are detailed in the current draft of the [Web Animations W3C
spec](https://w3c.github.io/web-animations/).

There's a [shipped
polyfill](https://github.com/web-animations/web-animations-js) under active
development that tracks all Web Animations features implemented natively, and
which is supported in all modern browsers. These core methods are ready for use
right now, and deserve to be part of your toolbox for building rich experiences
that benefit from animations (such as for the [Google I/O 2015 web
app](https://events.google.com/io2015/){: .external }).

## Изменения в конструкторе и группах

Спецификация веб-анимации также описывает *группы и последовательности* , а
также конструкторы для анимации и проигрывателей. Они были доступны в полифилле
[web-animations-next](https://github.com/web-animations/web-animations-js#web-animations-nextminjs)
, который был разработан для демонстрации функций, которые еще обсуждаются и еще
должны быть реализованы изначально. В ответ на отзывы разработчиков, команда
разработчиков веб-анимации переименовывает эти функции, чтобы сделать их более
понятными.

The [FXTF](https://www.w3.org/Graphics/fx/){: .external } recently met in
Sydney, Australia, and
[discussed](https://www.mail-archive.com/public-fx@w3.org/msg00151.html)
[naming](https://www.mail-archive.com/public-fx@w3.org/msg00158.html), as a
number of developers raised valid points about some of the naming being
confusing. As a result, the following naming changes were agreed on:

- **Animation** becomes **KeyframeEffect**
- **AnimationSequence** становится **SequenceEffect**
- **AnimationGroup** становится **GroupEffect**
- **AnimationPlayer** becomes **Animation**

Remember that while animations and their players are available natively in
Chrome and as part of the polyfill, they are currently created directly via the
`Element.animate()` method. Existing code that uses the `Element.animate()`
method will require no changes.

Новые имена более точно отражают поведение каждого объекта. Например,
`KeyframeEffect` описывает эффекты на основе ключевых кадров, которые могут быть
нацелены на элементы HTML. Напротив, новый объект `Animation` представляет
анимацию в одном из многих состояний (например, воспроизведение, пауза и т. Д.).

## SourceCodeEffect

If you're using parts of the draft spec via the web-animations-next polyfill,
you'll have to update your code within the deprecation period to reflect these
new names. As per the [polyfill changes
policy](https://github.com/web-animations/web-animations-js#breaking-changes),
we aim to support an old version for three months and provide console warning
statements if your site use deprecated features or names.

Если вы хотите опробовать эти функции, следите за
[выпуском](https://github.com/web-animations/web-animations-js/releases)
полифилла v2, чтобы воспользоваться этими новыми именами. Наконец, обязательно
подпишитесь на группу
[web-animations-changes,](https://groups.google.com/forum/#!forum/web-animations-changes)
чтобы услышать о любых других изменениях.
