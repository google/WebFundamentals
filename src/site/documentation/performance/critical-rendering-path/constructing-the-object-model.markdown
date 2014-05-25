---
layout: article
title: "Constructing the Object Model"
description: "Before the browser can render content to the screen it needs to construct the DOM and CSSOM trees. As a result, we need to ensure that we deliver both the HTML and CSS to the browser as quickly as possible."
introduction: "Before the browser can render the page it needs to construct the DOM and CSSOM trees. As a result, we need to ensure that we deliver both the HTML and CSS to the browser as quickly as possible."
article:
  written_on: 2014-04-01
  updated_on: 2014-04-28
  order: 1
collection: critical-rendering-path
key-takeaways:
  construct-object-model:
    - Bytes → characters → tokens → nodes → object model
    - HTML markup is transformed into a Document Object Model (DOM), CSS markup is transformed into a CSS Object Model (CSSOM)
    - DOM and CSSOM are independent data structures
    - Chrome DevTools Timeline allows us to capture and inspect the construction and processing costs of DOM and CSSOM
notes:
  devtools:
    - We'll assume that you have basic familiarity with Chrome DevTools - i.e. you know how to capture a network waterfall, or record a timeline. If you need a quick refresher, check out the <a href="https://developers.google.com/chrome-developer-tools/">Chrome Developer Tools documentation</a>, or if you're new to DevTools, I recommend taking the Codeschool <a href="http://discover-devtools.codeschool.com/">Discover DevTools</a> course.
---
{% wrap content%}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.construct-object-model %}

## Document Object Model (DOM)

{% include_code _code/basic_dom.html full %}

Let’s start, with the simplest possible case: a plain HTML page with some text and a single image. What does the browser need to do to process this simple page?

<img src="images/full-process.png" alt="DOM construction process">

1. **Conversion:** the browser reads the raw bytes of the HTML off the disk or network and translates them to individual characters based on specified encoding of the file (e.g. UTF-8).
1. **Tokenizing:** the browser converts strings of characters into distinct tokens specified by the [W3C HTML5 standard](http://www.w3.org/TR/html5/) - e.g. "<html>", "<body>" and other strings within the "angle brackets". Each token has a special meaning and a set of rules.
1. **Lexing:** the emitted tokens are converted into "objects" which define their properties and rules.
1. **DOM construction:** Finally, because the HTML markup defines relationships between different tags (some tags are contained within tags) the created objects are linked in a tree data structure that also captures the parent-child relationships defined in the original markup: _HTML_ object is a parent of the _body_ object, the _body_ is a parent of the _paragraph_ object, and so on.

<img src="images/dom-tree.png" class="center" alt="DOM tree">

**The final output of this entire process is the Document Object Model, or the "DOM" of our simple page, which the browser uses for all further processing of the page.**

Every time the browser has to process HTML markup it has to step through all of the steps above: convert bytes to characters, identify tokens, convert tokens to nodes, and build the DOM tree. This entire process can take some time, especially if we have a large amount of HTML to process.

<img src="images/dom-timeline.png" class="center" alt="Tracing DOM construction in DevTools">

{% include modules/remember.liquid title="Note" list=page.notes.devtools %}

If you open up Chrome DevTools and record a timeline while the page is loaded, you can see the actual time taken to perform this step &mdash; in example above, it took us ~5ms to convert a chunk of HTML bytes into a DOM tree. Of course, if the page was larger, as most pages are, this process might take significantly longer. You will see in our future sections on creating smooth animations that this can easily become your bottleneck if the browser has to process large amounts of HTML. That said, let’s not get ahead of ourselves…

With the DOM tree ready, do we have enough information to render the page to the screen? Not yet! The DOM tree captures the properties and relationships of the document markup, but it does not tell us anything about how the element should look when rendered. That’s the responsibility of the CSSOM, which we turn to next!

## CSS Object Model (CSSOM)

While the browser was constructing the DOM of our simple page, it encountered a link tag in the head section of the document referencing an external CSS stylesheet: style.css. Anticipating that it will need this resource to render the page, it immediately dispatches a request for this resource, which comes back with the following content:

{% include_code _code/style.css full css %}

Of course, we could have declared our styles directly within the HTML markup (inline), but keeping our CSS independent of HTML allows us to treat content and design as separate concerns: the designers can work on CSS, developers can focus on HTML, and so on.

Just as with HTML, we need to convert the received CSS rules into something that the browser can understand and work with. Hence, once again, we repeat a very similar process as we did with HTML:

<img src="images/cssom-construction.png" class="center" alt="CSSOM construction steps">

The CSS bytes are converted into characters, then to tokens and nodes, and finally are linked into a tree structure known as the "CSS Object Model", or CSSOM for short:

<img src="images/cssom-tree.png" class="center" alt="CSSOM tree">

Why does the CSSOM have a tree structure? When computing the final set of styles for any object on the page, the browser starts with the most general rule applicable to that node (e.g. if it is a child of body element, then all body styles apply) and then recursively refines the computed styles by applying more specific rules - i.e. the rules "cascade down".

To make it more concrete, consider the CSSOM tree above. Any text contained within the _span_ tag that is placed within the body element will have a font size of 16 pixels and have red text - the font-size directive cascades down from body to the span. However, if a span tag is child of a paragraph (p) tag, then its contents are not displayed.

Also, note that the above tree is not the complete CSSOM tree and only shows the styles we decided to override in our stylesheet. Every browser provides a default set of styles also known as "user agent styles" -- that’s what we see when we don’t provide any of our own -- and our styles simply override these defaults (e.g. [default IE styles](http://www.iecss.com/)). If you have ever inspected your "computed styles" in Chrome DevTools and wondered where all the styles are coming from, now you know!

Curious to know how long the CSS processing took? Record a timeline in DevTools and look for "Recalculate Style" event: unlike DOM parsing, the timeline doesn’t show a separate "Parse CSS" entry, and instead captures parsing and CSSOM tree construction, plus the recursive calculation of computed styles under this one event.

<img src="images/cssom-timeline.png" class="center" alt="Tracing CSSOM construction in DevTools">

Our trivial stylesheet takes ~0.6ms to process and affects 8 elements on the page -- not much, but once again, not free. However, where did the 8 elements come from? The CSSOM and DOM and are independent data structures! Turns out, the browser is hiding an important step. Next, lets talk about the render tree that links the DOM and CSSOM together.

{% include modules/nextarticle.liquid %}

{% endwrap %}
