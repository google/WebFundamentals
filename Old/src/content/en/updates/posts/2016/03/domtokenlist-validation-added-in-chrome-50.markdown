---
layout: updates/post
title: "DOMTokenList Validation Added in Chrome 50"
description: "Check support for various features directly in code, coming in Chrome 50."
published_on: 2016-03-15
updated_on: 2016-03-15
authors:
  - samthorogood
tags:
  - domtokenlist
  - validation
  - chrome50
---

In Chrome 50, you'll be able to check the support of options for some HTML attributes that are backed by `DOMTokenList` instances in JavaScript.
Right now, these places are:

+ iframe sandbox options
+ link relations (the rel attribute, or relLink in JavaScript)

Let's show a quick example:

{% highlight javascript %}
  var iframe = document.getElementById(...);
  if (iframe.sandbox.supports('an-upcoming-feature')) {
    // support code for mystery future feature
  } else {
    // fallback code
  }
  if (iframe.sandbox.supports('allow-scripts')) {
    // instruct frame to run JavaScript
    // NOTE: this is well-supported, and just an example!
  }
{% endhighlight %}

As the list of supported options grows and changes, you can use feature detection to perform the correct actions for your web applications.
