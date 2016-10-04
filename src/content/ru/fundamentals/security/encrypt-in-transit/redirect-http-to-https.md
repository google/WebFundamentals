project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2015-03-26 #}
{# wf_published_on: 2000-01-01 #}

# Перенаправление с HTTP на HTTPS {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}


### TL;DR {: .hide-from-toc }
- "В заголовок своей страницы необходимо вставить каноническую ссылку, чтобы указать поисковым системам, что наилучший способ перейти на ваш сайт\_– воспользоваться протоколом https."


Вставьте на свои страницы теги &lt;link rel="canonical" href="https://…"/&gt;. [Это 
позволит поисковым системам](https://support.google.com/webmasters/answer/139066) 
определить наилучший способ перейти на ваш сайт.

Большинство веб-серверов оснащены простой функцией перенаправления. Воспользуйтесь кодом состояния 301 (окончательно перемещено), 
чтобы указать поисковым системам и браузерам, что версия HTTPS является канонической, и перенаправить пользователей на версию HTTPS вашего сайта с версии HTTP.

