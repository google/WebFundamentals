---
layout: article
title: "Critical Path Rendering"
description: "Delivering a fast web experience requires a lot of work by the browser. 
  Most of this work is hidden from us as web developers: we write the markup, and a nice 
  looking page comes out on the screen. But how exactly does the browser go from 
  consuming our HTML, CSS, and JavaScript to rendered pixels on the screen?"
introduction: "Delivering a fast web experience requires a lot of work by the browser. 
  Most of this work is hidden from us as web developers: we write the markup, and a nice 
  looking page comes out on the screen. But how exactly does the browser go from 
  consuming our HTML, CSS, and JavaScript to rendered pixels on the screen?"
article:
  written_on: 2014-01-01
  updated_on: 2014-01-05
  order: 1
id: critical-path-rendering
collection: performance
---
{% wrap content%}
g
Optimizing for performance is all about understanding what happens in these 
intermediate steps between receiving the HTML, CSS, and JavaScript bytes and the 
required processing to turn them into rendered pixels - that's the **critical 
rendering path**.

Optimizing the critical rendering path is critical for improving performance of 
our pages: our goal is to prioritize and display the content that relates to the 
primary action the user wants to take on a page. Note that the time to first 
render is not necessarily the same as the "load time" of our page: some 
resources may still be loading (e.g. images) but we should still be able to 
display partial content.   

<!-- No converter for: INLINE_DRAWING -->

[TODO Add inline drawing]

Understanding the critical rendering path will also serve as a foundation for 
all of our future discussions on optimizing the performance of interactive 
pages: it turns out, the process for processing interactive updates is the same, 
just done in a continuous loop and ideally at 60 frames per second! However, 
let's not get ahead of ourselves just yet. First, let's take a quick, ground-up 
overview of how the browser goes about displaying a simple page.

## Guides

{% for guide in page.articles.critical-path-rendering %}
{% class %}
### [{{guide.title}}]({{site.baseurl}}{{guide.url}})
{{guide.description}}
{% endclass %}
{% endfor %}

{% endwrap%}
