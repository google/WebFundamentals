---
layout: updates/post
title: "Five tricks to use in the Console Panel"
published_on: 2015-08-10
updated_on: 2015-08-10
tags:
  - devtools
authors:
  - umarhansa
featured_image: /web/updates/images/2015-08-10-5-tricks-to-use-in-the-console-panel/five-console-tricks.gif
source_name: DevTips
source_url: https://umaar.com/dev-tips/29-five-console-tricks/
---
<img src="/web/updates/images/2015-08-10-5-tricks-to-use-in-the-console-panel/five-console-tricks.gif" alt="Five tricks to use in the Console Panel">

#### Use the inspect() command to jump straight to a passed-in DOM node

{% highlight javascript %}
inspect($('p'))
{% endhighlight %}

#### Use the copy() command to copy text to your clipboard

{% highlight javascript %}
copy(Object.keys(window))
// stores ["top", "window", "location", "external"... and so on
{% endhighlight %}

#### Style your console output

{% highlight javascript %}
console.log('%cHello world', 'font-size:40px;color:#fff;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');
{% endhighlight %}

#### Get the values of an object

{% highlight javascript %}
values({
    one: 1,
    two: 2,
    three: 3
})

// logs [1, 2, 3]
{% endhighlight %}

#### Clear the console

<kbd class="kbd">Cmd + K</kbd> (Ctrl + L on Windows)
