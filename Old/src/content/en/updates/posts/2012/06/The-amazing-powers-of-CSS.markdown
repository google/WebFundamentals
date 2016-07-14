---
layout: updates/post
title: "The amazing powers of CSS"
published_on: 2012-06-20
updated_on: 2012-06-20
authors:
  - ilmariheikkinen
tags:
  - news
  - css
---
Yesterday at the office, we were coming up with strange and magical CSS tricks. Take this one for instance, it makes empty links very visible:

{% highlight CSS %}
a[href = ""] {
  background: red;
  color: white;
  font-size: x-large;
}
{% endhighlight %}
Check out the [live example at jsFiddle](http://jsfiddle.net/VWYsk/)

You can also style absolute links differently from relative links:

{% highlight CSS %}
a[href ^= http] {
  display: inline-block;
  color: red;
  transform: rotate(180deg);
}
{% endhighlight %}
Check out the [live example at jsFiddle](:http://jsfiddle.net/RShhf/1/)

If you want to have a different style for links pointing out of your domain, you can use the :not() selector. This is actually how we do the little arrows next to external links at HTML5Rocks.

{% highlight CSS %}
a[href ^= 'http']:not([href *= 'html5rocks.']) {
  background: transparent url(arrow.png) no-repeat center right;
  padding-right: 16px;
}
{% endhighlight %}
Check out the [live example at jsFiddle](:http://jsfiddle.net/Sts9H/1/)

Just to remind you that you're not limited to styling links, here's how to make all PNG images inverted:

{% highlight CSS %}
img[src $= .png] {
  filter: invert(100%);
}
{% endhighlight %}

Moving on from attribute selectors, did you know that you can make the document head visible, along with the other elements there?

{% highlight CSS %}
head {
  display: block;
  border-bottom: 5px solid red;
}
script, style, link {
  display: block;
  white-space: pre;
  font-family: monospace;
}
{% endhighlight %}

Or that you can use the awesome power of CSS attr-function to fill in the :after and :before content?

{% highlight CSS %}
script:before {
  content: "<script src=\"" attr(src) "\" type=\"" attr(type) "\">";
}
script:after {
  content: "</script>";
}

style:before {
  content: "<style type=\"" attr(type) "\">";
}
style:after {
  content: "< /style>";
}

/* And for a finish, <link> */
link:before {
  content: "<link rel=\"" attr(rel) "\" type=\"" attr(type) "\" href=\"" attr(href) "\" />";
}
{% endhighlight %}

Check out the [live example at jsFiddle](http://jsfiddle.net/Wedjf/1/)

Note that attr() reads in the attribute values of the matching element, so if you use it for #foo:before, it reads the attributes from #foo.
