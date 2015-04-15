---
layout: article
title: "Test Different Layouts"
description: "TBD description."
introduction: "TBD introduction."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 1
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

{% include modules/takeaway.liquid list=page.key-takeaways.tldr-tbd %}

### TBD

TBD.

{% include modules/remember.liquid title="Remember" list=page.remember.note-tbd %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
