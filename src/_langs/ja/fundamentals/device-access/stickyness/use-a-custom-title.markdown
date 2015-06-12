---
layout: article
title: "Use a Custom Title"
description: "Internet Explorer と Safari では、ユーザーのアイコンの上または横にあるアプリ名に使用されるカスタム タイトルを指定することができます。"
introduction: "Internet Explorer と Safari では、ユーザーのアイコンの上または横にあるアプリ名に使用されるカスタム タイトルを指定することができます。"
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
    - このタグは、Mobile Safari で文書化されていないため、いつでも変更や削除が行えます。
---

{% wrap content %}

このコードをヘッドに追加 `<head>`:

{% highlight html %}
<meta name="application-name" content="Web Fundamentals">
<meta name="apple-mobile-web-app-title" content="Web Fundamentals">
{% endhighlight %}

3 つのすべてのブラウザでは、追加のタグがない場合、
デフォルトの `<title>` 属性を使用します。

{% include modules/remember.liquid title="Note" list=page.notes.undocumented %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
