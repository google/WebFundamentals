---
rss: false
layout: article
title: "Track Down Layout Issues"
description: "TBD description."
introduction: "TBD introduction."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 3
authors:
  - mkearney
priority: 0
collection: test-layout
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

TBD. Explain some of these problems in simple language: http://www.html5rocks.com/en/tutorials/developertools/revolutions2013/. Specifically cover: continuous painting mode, showing paint rectangles and layout borders, finding forced synchronous layouts.

TBD. Also capture layout-related ideas covered in these performance tooling responses doc: https://docs.google.com/document/d/1noGNhSOEoY3NVkVH6Eh01axr9ecTtlmk4RuHhimm__4/edit. One particular TL;DR: add height/width to images to make it feel faster to the user.

TBD. Might want to make sub-headings specifically reference layout issues.

{% include modules/takeaway.liquid list=page.key-takeaways.tldr-tbd %}

## What are the common layout issues?

TBD. Dive into specific demo on layout thrashing: https://developer.chrome.com/devtools/docs/demos/too-much-layout/index. This article will be helpful in helping to walk through the demo, as well (make sure to reference it): http://wilsonpage.co.uk/preventing-layout-thrashing/

From web/fundamentals/performance/rendering/: Layout - Once the browser knows which rules apply to an element it can begin to calculate how much space it takes up and where it is on screen. The web’s layout model means that one element can affect others, e.g. the width of the <body> element typically affects its children’s widths and so on all the way up and down the tree, so the process can be quite involved for the browser.

If you change a “layout” property, so that’s one that changes an element’s geometry, like its width, height, or its position with left or top, the browser will have to check all the other elements and “reflow” the page. Any affected areas will need to be repainted, and the final painted elements will need to be composited back together.

If you changed a “paint only” property, like a background image, text color, or shadows, i.e. one that does not affect the layout of the page, then the browser skips layout, but it will still do paint.

If you change a property that requires neither layout nor paint, and the browser jumps to just do compositing.
This final version is the cheapest and most desirable for high pressure points in an app’s lifecycle, like animations or scrolling.

This super cool site tells you css triggers: http://csstriggers.com/. Definitely reference this.

## Find and fix layout thrashing

TBD.

Long paint times

## Find and fix long paint times

http://updates.html5rocks.com/2013/02/Profiling-Long-Paint-Times-with-DevTools-Continuous-Painting-Mode

{% include modules/remember.liquid title="Remember" list=page.remember.note-tbd %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
