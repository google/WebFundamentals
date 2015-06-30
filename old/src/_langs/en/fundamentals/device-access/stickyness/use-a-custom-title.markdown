---
layout: article
title: "Use a Custom Title"
description: "Internet Explorer and Safari allow you to specify a custom title that is used as app name next to or on top of your icon."
introduction: "Internet Explorer and Safari allow you to specify a custom title that is used as app name next to or on top of your icon."
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
    - This tag is undocumented in Mobile Safari and could be changed and removed at any time.
---

{% wrap content %}

Add this code to your head `<head>`:

{% highlight html %}
<meta name="application-name" content="Web Fundamentals">
<meta name="apple-mobile-web-app-title" content="Web Fundamentals">
{% endhighlight %}

All three browsers use the default `<title>` attribute if the additional tags 
are not around.

{% include modules/remember.liquid title="Note" list=page.notes.undocumented %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
