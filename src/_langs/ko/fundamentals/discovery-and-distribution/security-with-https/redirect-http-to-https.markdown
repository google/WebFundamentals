---
layout: article
title: "HTTP를 HTTPS로 리디렉션"
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
  - 기본 링크를 페이지 헤드에 추가하여 검색 엔진에 https가 사이트에 액세스할 수 있는 가장 좋은 방법임을 알려야 합니다.
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways %}

페이지에 &lt;link rel="canonical" href="https://…"/&gt; 태그를 설정합니다. [그러면
검색 엔진](https://support.google.com/webmasters/answer/139066?hl=en)이
사이트에 액세스할 수 있는 가장 좋은 방법을 파악하는 데 도움이 됩니다.

대부분의 웹 서버는 단순한 리디렉션 기능을 제공합니다. 301(영구적으로 이동됨)을 사용하여
검색 엔진 및 브라우저에 HTTPS 버전이 기본임을 알리고 사용자를 사이트의 HTTP 버전에서 HTTPS 버전으로 리디렉션하십시오.

{% endwrap %}
