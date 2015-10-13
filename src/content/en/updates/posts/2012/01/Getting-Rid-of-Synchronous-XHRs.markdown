---
layout: updates/post
title: "Getting Rid of Synchronous XHRs"
published_on: 2012-01-26
updated_on: 2012-01-26
authors:
  - ericbidelman
tags:
  - news
  - xhr2
  - binary
---
Heads up! The [XMLHttpRequest2 spec](http://www.w3.org/TR/2012/WD-XMLHttpRequest-20120117/#the-open-method) was recently changed to prohibit sending a synchronous request when `xhr.responseType` is set.
The idea behind the change is to help mitigate further usage of synchronous xhrs wherever possible.

For example, the following code will now throw an `INVALID_ACCESS_ERR` in developer channel builds of Chrome and FF:

{% highlight javascript %}
var xhr = new XMLHttpRequest();
xhr.responseType = 'arraybuffer';
xhr.open('GET', '/', false); // sync request
xhr.send();
{% endhighlight %}

See [WebKit Bug](https://bugs.webkit.org/show_bug.cgi?id=72154), [Buzilla Bug](https://bugzilla.mozilla.org/show_bug.cgi?id=701787)

Note: the ability to parse HTML has also been added to `XMLHttpRequest` but the caveat is that you can't use it unless you're sending an asynchronous request! See [HTML in XMLHttpRequest](https://developer.mozilla.org/en/HTML_in_XMLHttpRequest).

Synchronous XHRs are bad for a number of reasons, but MSDN's blog post, "[Why You Should Use XMLHttpRequest Asynchronously](http://blogs.msdn.com/b/wer/archive/2011/08/03/why-you-should-use-xmlhttprequest-asynchronously.aspx)" has a great explanation of the issues.

This is a generally a great change for the web, but it has the potential to break some existing apps that were relying on synchronous behavior. Please look over your XHR code and update it ASAP to use asynchronous requests.
