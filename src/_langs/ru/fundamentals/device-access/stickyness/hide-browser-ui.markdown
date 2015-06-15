---
layout: article
title: "Скрытие пользовательского интерфейса браузера"
description: "Ваши пользователи могут добавить ваш сайт на начальный экран без использования специального кода, однако рекомендуется, чтобы при запуске с начального экрана ваше веб-приложение отображалось без пользовательского интерфейса браузера (то есть в полноэкранном режиме)"
introduction: "Ваши пользователи могут добавить ваш сайт на начальный экран без использования специального кода, однако рекомендуется, чтобы при запуске с начального экрана ваше веб-приложение отображалось без пользовательского интерфейса браузера (то есть в полноэкранном режиме)"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 2
id: hide-browser-ui
collection: stickyness
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

Добавьте следующий код в `<head>` вашей страницы:

{% highlight html %}
<meta name="apple-mobile-web-app-capable" content="yes">
{% endhighlight %}


Таким образом мобильная версия браузера Safari получит информацию о том, что открывается 
веб-приложение.

Браузеру Internet Explorer не нужны подобные инструкции, поскольку 
он открывает сайты в полноэкранном режиме по умолчанию.

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/web-app-capable.png" alt="web-app-capable">
        
        <figcaption>Запуск сайта с метатегом веб-приложения</figcaption>
    </figure>
</div>

<div class="clear"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
