---
layout: article
title: "Добавление значка"
description: "Чтобы придать сайту уникальный внешний вид, обязательно добавьте на него привлекательный полноразмерный значок, иначе будет использован значок избранного или снимок экрана в низком разрешении"
introduction: "Чтобы придать сайту уникальный внешний вид, обязательно добавьте на него привлекательный полноразмерный значок, иначе будет использован значок избранного или снимок экрана в низком разрешении"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 3
id: specify-an-icon
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

<figure>
  <img src="images/icons.png" alt="Настройка значков отдельно для каждой платформы" />
  <figcaption>Добавление настраиваемых значков – простой способ придать уникальный внешний вид.</figcaption>
</figure>


Дополните раздел `<head>` своего сайта следующим фрагментом кода, чтобы добавить настраиваемый значок для браузеров Safari, 
Opera и Internet Explorer:

{% highlight html %}
<!-- icon in the highest resolution we need it for -->
<link rel="icon" sizes="228x228" href="icon.png">
<!-- reuse same icon for Safari -->
<link rel="apple-touch-icon" href="ios-icon.png">
<!-- multiple icons for IE -->
<meta name="msapplication-square70x70logo" content="icon\_smalltile.png">
<meta name="msapplication-square150x150logo" content="icon\_mediumtile.png">
<meta name="msapplication-wide310x150logo" content="icon\_widetile.png">
<meta name="msapplication-square310x310logo" content="icon\_largetile.png">
{% endhighlight %}

В этом примере для браузера Opera используется файл icon.png, который масштабируется 
устройством до необходимого размера. Для Safari используется 
тег `<link>` с атрибутом `rel`: `apple-touch-icon`.

В новом интерфейсе главной страницы Windows 8 поддерживается четыре различных варианта макета для 
закрепленных сайтов, поэтому и значков требуется четыре. Если вы не желаете добавлять поддержку значка определенного размера, можно не указывать атрибуты для соответствующих метатегов.
.

Можно [явным образом указать размеры значков](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27), указав для каждого из них отдельный тег "link", 
тем самым вы избавите операционную систему от необходимости изменять размеры значка:

{% highlight html %}
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
{% endhighlight %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
