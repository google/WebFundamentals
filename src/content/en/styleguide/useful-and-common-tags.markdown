---
layout: shared/plain
title: "Useful and Common Tags"
description: "This is a list of tags that should be useful or are commonly used."
---

## Table of Contents

This publishes a table of contents for the current page

<pre>{% raw %}{% include shared/toc.liquid %}{% endraw %}</pre>

{% include shared/toc.liquid %}

## Highlight

The highlight tag will simply run the code inside the tag through Pygments, a
code highlighter.

### Example

<pre>{% raw %}
{% highlight javascript %}
if (navigator.onLine) {
  console.log('ONLINE!');
} else {
  console.log('Connection flaky');
}
{% endhighlight %}
{% endraw %}</pre>

{% highlight javascript %}
if (navigator.onLine) {
  console.log('ONLINE!');
} else {
  console.log('Connection flaky');
}
{% endhighlight %}

#### Supported Language Inputs

- text
- javascript
- html
- css
- http
- bash
