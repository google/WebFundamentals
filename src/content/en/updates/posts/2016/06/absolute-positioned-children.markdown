---
layout: updates/post
title: "Flexbox gets new behavior for absolute-positioned children"
description: ""
published_on: 2016-06-17
updated_on: 2016-06-17
authors:
  - josephmedley
tags:
  - css
  - flexbox
  - chrome52
  - absolute-positioned
---

A previous version of the 
[CSS Flexible Box](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_flexbox_to_lay_out_web_applications) 
Layout specification set the static position of absolute-positioned children as 
though they were a 0x0 flex item. The [latest version of the spec](https://drafts.csswg.org/css-flexbox/#abspos-items)
takes them fully out  of flow and sets the static position based on align and
justify properties. At  the time of this writing, Edge and Opera 39 for desktop
and Android already  support this.

For an example, let's apply some positioning behaviors to the following HTML.

{% highlight HTML %}
<div class="container">
  <div>
    <p>In Chrome 52 and later, the green box should be centered vertically and horizontally in the red box.</p>
  </div>
</div>
{% endhighlight %}

We'll add something like this:

{% highlight css %}
.container {  
  display: flex;  
  align-items: center;  
  justify-content: center;   
}  
.container > * {  
  position: absolute;  
}
{% endhighlight %}

In Chrome 52 or later, the nested `<div>` will be perfectly centered in the 
container `<div>`. 

<img src="/web/updates/images/2016/06/absolute-positioned-children/chrome52-behavior.png"/>

In non-conforming browsers, the top left corner of the green box will be in the 
top center of the red box. 

<img src="/web/updates/images/2016/06/absolute-positioned-children/legacy-behavior.png"/>
