---
layout: article
title: "홈 화면에서 시작된 경우 감지"
description: "앱이 홈 화면에서 시작되었는지 아니면 웹 브라우저에서 시작되었는지를 알면 유용한 경우가 있습니다."
introduction: "앱이 홈 화면에서 시작되었는지 아니면 웹 브라우저에서 시작되었는지를 알면 유용한 경우가 있습니다."
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

앱이 홈 화면에서 시작되었는지 아니면 웹 브라우저에서 시작되었는지를
알면 유용한 경우가 있습니다. 한 가지 활용 사례를 보여주자면, 브라우저를 통해 
액세스할 때 사용자의 홈 화면에 앱을 설치하는 것을 권장하는 배너를
표시하고, 앱이 설치된 후에는 이 배너를 숨기고자 할 수 있습니다.

Mobile Safari에서 `window.navigator.standalone`을 쿼리하면 앱이 홈 화면
아이콘으로 실행 중인지 아니면 브라우저에서 단순히 실행 중인 알려줍니다. Internet
Explorer에서는 [`window.external.msIsSiteMode()`](http://msdn.microsoft.com/en-us/library/ie/gg491733(v=vs.85).aspx)를
쿼리하여 이와 동일한 작업을 수행할 수 있습니다. 다음은 이 두 검사를 조합한 경우입니다.

{% highlight js %}
var fromHomescreen = window.navigator.standalone || window.external.msIsSiteMode();
if(!fromHomescreen) {
    // show them a guide on how to install the web app
    ...
}
{% endhighlight %}

안타깝게도, Android용 Chrome에서는 이와 동일한 사항을 감지할 수 없습니다.

{% include modules/nextarticle.liquid %}

{% endwrap %}