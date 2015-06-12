---
layout: article
title: "Использование настраиваемых заголовков"
description: "Для браузеров Internet Explorer и Safari можно указывать настраиваемые заголовки, которые используются в качестве названия приложения, отображаемого над значком или рядом с ним"
introduction: "Для браузеров Internet Explorer и Safari можно указывать настраиваемые заголовки, которые используются в качестве названия приложения, отображаемого над значком или рядом с ним"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 4
id: use-a-custom-title
authors:
  - pbakaus
collection: stickyness
notes:
  undocumented:
    - Этот тег не описан в документации к версии Safari для мобильных устройств, и его можно в любое время изменить или удалить.
---

{% wrap content %}

Добавьте в раздел `<head>` следующий фрагмент кода:

{% highlight html %}
<meta name="application-name" content="Web Fundamentals">
<meta name="apple-mobile-web-app-title" content="Web Fundamentals">
{% endhighlight %}

Все три браузера используют стандартный атрибут `<title>`, если рядом нет дополнительных тегов.


{% include modules/remember.liquid title="Note" list=page.notes.undocumented %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
