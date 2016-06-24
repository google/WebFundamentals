---
layout: updates/post
title: "FormData methods for inspection and modification"
description: "In Chrome 50, you can now interact with your FormData instances before sending them on their journey."
published_on: 2016-03-15
updated_on: 2016-03-15
authors:
  - samthorogood
tags:
  - forms
  - formdata
  - input
  - chrome50
featured_image: /web/updates/images/2016/03/formdata-methods-for-inspection-and-modification/form.png
---

`FormData` is the XHR user's best friend, and it's getting an upgrade in Chrome 50.
We're adding methods allowing you to inspect your `FormData` objects or modify them after-the-fact.
You can now use `get()`, `delete()`, and iteration helpers like `entries`, `keys`, and more. ([Check out the full list](https://developer.mozilla.org/en/docs/Web/API/FormData).)

If you're not already using FormData, it's a simple, [well-supported](http://caniuse.com/#feat=xhr2) API that allows you to programmatically build a virtual form and send it to a far away place using `window.fetch()` or `XMLHttpRequest.send(formData)`.

For some examples, read on!

## Parse Real Forms Like a Pro

`FormData` can be constructed from a real HTML form, taking a snapshot of all its current values.
However, the object used to be entirely opaque. All you could do was send it on, unchanged, to a server.
Now, you can take it, modify it, bop it, observe it, shrink it, change it, and finally, upload it:

{% highlight javascript %}
function sendRequest(theFormElement) {
  var formData = new FormData(theFormElement);
  formData.delete("secret_user_data"); // don't include this one!
  if (formData.has("include_favorite_color")) {
    formData.set("color", userPrefs.getColor());
  }
  // log all values like <input name="widget">
  console.info("User selected widgets", formData.getAll("widget"));

  window.fetch(url, {method: 'POST', body: formData});
}
{% endhighlight %}

You can also send `FormData` via the older `XMLHttpRequest`:

{% highlight javascript %}
  var x = new XMLHttpRequest();
  x.open('POST', url);
  x.send(formData);
{% endhighlight %}

## Don't throw away your FormData

If you're building your own `FormData` from scratch, you might have found it frustrating that you couldn't reuse it - you've spent a lot of time on those fields!
As both the `window.fetch()` and `XMLHttpRequest.send()` methods takes a snapshot of the `FormData`, you can now safely reuse and modify your work!
Check this example out:

{% highlight javascript %}
  // append allows multiple values for the same key
  var formData = new FormData();
  formData.append("article", "id-123");
  formData.append("article", "id-42");

  // send like request
  formData.set("action", "like");
  window.fetch(url, {method: 'POST', body: formData});

  // send reshare request
  formData.set("action", "reshare");  // overrides previous "action"
  window.fetch(url, {method: 'POST', body: formData});
{% endhighlight %}
