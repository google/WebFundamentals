---
layout: article
title: "Обнаружение запуска на главном экране"
description: "Иногда полезно знать, когда приложение запущено на главном экране, а не в веб-браузере"
introduction: "Иногда полезно знать, когда приложение запущено на главном экране, а не в веб-браузере"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 5
id: detect-when-launched
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

Иногда полезно знать, когда приложение запущено на главном экране, 
а не в веб-браузере. Например, вы можете показывать
баннер, предлагающий установить приложение на главном экране пользователя, когда он заходит в приложение
из браузера, но скрывать его, когда приложение установлено.

В браузере для мобильных устройств Mobile Safari запрос `window.navigator.standalone` показывает, запущено
ли приложение с помощью значка на главном экране или просто в браузере. В браузере Internet
Explorer можно достичь того же результата, выполнив запрос
[`window.external.msIsSiteMode()`](http://msdn.microsoft.com/en-us/library/ie/gg491733(v=vs.85).aspx). Ниже приведена объединенная проверка:

{% highlight js %}
var fromHomescreen = window.navigator.standalone || window.external.msIsSiteMode();
if(!fromHomescreen) {
    // show them a guide on how to install the web app
    ...
}
{% endhighlight %}

К сожалению, выяснить это в Chrome для Android невозможно.

{% include modules/nextarticle.liquid %}

{% endwrap %}
