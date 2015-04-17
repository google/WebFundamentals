---
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

## What causes these issues?

TBD.

## How do you track these issues down?

TBD.

## How do you fix these issues?

TBD.

{% include modules/remember.liquid title="Remember" list=page.remember.note-tbd %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
