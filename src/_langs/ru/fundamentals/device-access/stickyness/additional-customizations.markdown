---
layout: article
title: "Дополнительные настройки"
description: "Ниже приведены очень удобные настройки, но они работают не во всех браузерах. Все они не являются обязательными, но их использование настоятельно рекомендуется, поскольку они расширяют возможности приложения"
introduction: "Ниже приведены очень удобные настройки, но они работают не во всех браузерах. Все они не являются обязательными, но их использование настоятельно рекомендуется, поскольку они расширяют возможности приложения"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 6
id: additional-customizations
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

{% include modules/toc.liquid %}

## Цвет элементов браузера

Браузеры Chrome, Firefox OS, Safari, Internet Explorer и Opera Coast позволяют задавать цвет элементов браузера и/или платформы с помощью метатегов.

{% highlight html %}
<!-- Chrome & Firefox OS -->
<meta name="theme-color" content="#4285f4">
<!-- Windows Phone -->
<meta name="msapplication-navbutton-color" content="#4285f4">
<!-- iOS Safari -->
<meta name="apple-mobile-web-app-status-bar-style" content="#4285f4">
{% endhighlight %}


<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/theme-color.png" alt="Пример сайта, на котором используется метатег с цветом темы">

        <figcaption>Пример сайта, на котором используется метатег с цветом темы</figcaption>
    </figure>
</div>

## Safari: Изображения, появляющиеся на экране при запуске, внешний вид строки состояния

Safari позволяет оформлять строку состояния и указывать изображения, появляющиеся на экране при запуске.

### Выбор изображения, появляющегося на экране при запуске

В процессе загрузки Safari по умолчанию отображает пустой экран, а после нескольких
загрузок — снимок предыдущего состояния приложения. Такой режим можно изменить:
в настройках Safari укажите вывод на экран определенного начального изображения, добавив тег ссылки с отношением
`rel=apple-touch-startup-image`. Например:

{% highlight html %}
<link rel="apple-touch-startup-image" href="icon.png">
{% endhighlight %}

Изображение должно иметь размер, соответствующий размеру экрана целевого устройства, в противном случае оно
не будет использоваться. Более подробные сведения см. в руководстве
[Справочник по веб-содержимому Safari](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
.

Поскольку документация от Apple по этой теме встречается не часто, сообщество разработчиков
нашло способ, подходящий для всех устройств: сначала выполняются отработанные запросы,
чтобы выбрать соответствующее устройство, а затем указывается правильное изображение. Здесь приведено
работающее решение, которое предложил разработчик [tfausak's gist](//gist.github.com/tfausak/2222823):

{% highlight html %}
<!-- iOS 6 & 7 iPad (retina, portrait) -->
<link href="/static/images/apple-touch-startup-image-1536x2008.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: portrait)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPad (retina, landscape) -->
<link href="/static/images/apple-touch-startup-image-1496x2048.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: landscape)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPad (portrait) -->
<link href="/static/images/apple-touch-startup-image-768x1004.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: portrait)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPad (landscape) -->
<link href="/static/images/apple-touch-startup-image-748x1024.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: landscape)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone 5 -->
<link href="/static/images/apple-touch-startup-image-640x1096.png"
     media="(device-width: 320px) and (device-height: 568px)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone (retina) -->
<link href="/static/images/apple-touch-startup-image-640x920.png"
     media="(device-width: 320px) and (device-height: 480px)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPhone -->
<link href="/static/images/apple-touch-startup-image-320x460.png"
     media="(device-width: 320px) and (device-height: 480px)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">
{% endhighlight %}

### Изменение внешнего вида строки состояния

Стандартный внешний вид строки состояния можно заменить на `black` или
`black-translucent`. При использовании варианта `black-translucent` строка состояния находится сверху
от содержимого полного экрана, а не под ним. Это дает возможность увеличить высоту макета,
но загораживает верхнюю часть экрана.  Для этого требуется следующий код:

{% highlight html %}
<meta name="apple-mobile-web-app-status-bar-style" content="black">
{% endhighlight %}

А здесь показан внешний вид при использовании каждого из этих двух вариантов:

<div class="clear g-wide--pull-1">
  <div class="g--half">
    <figure class="fluid">
      <img src="images/status-bar-translucent.png" srcset="images/status-bar-translucent.png 1x, images/status-bar-translucent-2x.png 2x" alt="black-translucent">
      <figcaption>Вид экрана для варианта <code>black-translucent</code></figcaption>
    </figure>
  </div>
  <div class="g--half g--last">
    <figure class="fluid">
      <img src="images/status-bar-black.png" srcset="images/status-bar-black.png 1x, images/status-bar-black-2x.png 2x" alt="black-black">
      <figcaption>Вид экрана для варианта <code>black</code></figcaption>
      </figure>
  </div>
</div>

## Internet Explorer: Живые плитки, уведомления и закрепленные сайты

"Закрепленные сайты" и вращающиеся "Живые плитки" в интерфейсе Microsoft значительно опережают
другие реализации, и в этом руководстве недостаточно места для их описания. Если вы желаете
узнать больше,
[прочитайте, как создавать живые плитки на платформе MSDN](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx).

{% include modules/nextarticle.liquid %}

{% endwrap %}
