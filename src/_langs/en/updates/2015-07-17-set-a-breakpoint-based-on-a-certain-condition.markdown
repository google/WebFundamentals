---
rss: false
layout: update
published: true
title: Set a breakpoint based on a certain condition
date: 2015-07-17
article:
  written_on: 2015-07-17
  updated_on: 2015-07-17
authors:
- umarhansa
collection: updates
type: tip
category: tools
product: chrome-devtools
description: When you set a breakpoint, you can make it conditional based on the result
  of an expression.
featured-image: /web/updates/images/2015-07-17-set-a-breakpoint-based-on-a-certain-condition/conditional-breakpoint.gif
source_name: DevTips
source_url: https://umaar.com/dev-tips/46-conditional-breakpoint
permalink: /updates/2015/07/17/set-a-breakpoint-based-on-a-certain-condition.html
---
<img src="/web/updates/images/2015-07-17-set-a-breakpoint-based-on-a-certain-condition/conditional-breakpoint.gif" alt="Set a breakpoint based on a certain condition">

When you set a breakpoint, you can make it conditional based on the result of an expression. Right click on the line gutter and select <em>Add Conditional Breakpoint</em> and enter your expression.


If you have a callback like:

<pre>
<code>function callback(result, err) {
    //set a conditional breakpoint based on the existence of err
}
</code>
</pre>

You could set a conditional breakpoint based on the existence of <code>err</code>.




		