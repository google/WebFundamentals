---
layout: article
title: "사용자 지정 이름 사용"
description: "Internet Explorer 및 Safari에서는 아이콘 옆이나 위에 사용자 지정 앱 이름을 지정할 수 있습니다."
introduction: "Internet Explorer 및 Safari에서는 아이콘 옆이나 위에 사용자 지정 앱 이름을 지정할 수 있습니다."
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
    - 이 태그는 Mobile Safari에서 문서화되어 있지 않으므로 언제든지 변경 및 제거할 수 있습니다.
---

{% wrap content %}

이 코드를 헤드 `<head>`에 추가합니다.

{% highlight html %}
<meta name="application-name" content="Web Fundamentals">
<meta name="apple-mobile-web-app-title" content="Web Fundamentals">
{% endhighlight %}

이 추가적인 태그가 없는 경우 세 브라우저는 모두 기본 `<title>` 
특성을 사용합니다.

{% include modules/remember.liquid title="Note" list=page.notes.undocumented %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
