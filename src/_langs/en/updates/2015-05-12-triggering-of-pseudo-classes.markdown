---

layout: update
published: true
title: Triggering of pseudo classes
date: 2015-05-12
article:
  written_on: 2015-05-12
  updated_on: 2015-05-19
authors:
- umarhansa
collection: updates
type: tip
category: tools
product: chrome-devtools
description: Learn how to trigger pseudo classes such as :active to properly debug
  your CSS.
featured-image: /web/updates/images/2015-05-12-devtools-triggering-of-pseudo-classes/pseudo-trigger.gif
source_name: DevTips
source_url: https://umaar.com/dev-tips/2-pseudo-trigger
permalink: /updates/2015/05/12/triggering-of-pseudo-classes.html
---
<img src="/web/updates/images/2015-05-12-devtools-triggering-of-pseudo-classes/pseudo-trigger.gif">

Pseudo classes on elements can be triggered to investigate how an element may react if it were to be hovered over for example. You can right click on a node in the Elements panel and select Force element state. Alternatively, the Toggle element state icon can be clicked on in the Styles sub-pane.

When an element has some sort of state applied, you'll get a little visual indicator to the left of the nodes' opening tag and in some cases the closing tag too (if they are far apart).

We can trigger: active, focus, hover &amp; visited pseudo classes.