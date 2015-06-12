---
layout: article
title: "Перенаправление с HTTP на HTTPS"
description: ""
introduction: ""
id: redirect-http-to-https
collection: security-with-tls
authors:
  - chrispalmer
article:
  written_on: 2015-03-27
  updated_on: 2015-03-27
  order: 5
priority: 0
key-takeaways:
  - В заголовок своей страницы необходимо вставить каноническую ссылку, чтобы указать поисковым системам, что наилучший способ перейти на ваш сайт – воспользоваться протоколом https.
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways %}

Вставьте на свои страницы теги &lt;link rel="canonical" href="https://…"/&gt;. [Это 
позволит поисковым системам](https://support.google.com/webmasters/answer/139066?hl=en) 
определить наилучший способ перейти на ваш сайт.

Большинство веб-серверов оснащены простой функцией перенаправления. Воспользуйтесь кодом состояния 301 (окончательно перемещено), 
чтобы указать поисковым системам и браузерам, что версия HTTPS является канонической, и перенаправить пользователей на версию HTTPS вашего сайта с версии HTTP.

{% endwrap %}
