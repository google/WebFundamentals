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
collection: performance
key-takeaways:
  construct-object-model:
    - Bytes → characters → tokens → nodes → object model
    - HTML markup is transformed into a Document Object Model (DOM)
    - CSS markup is transformed into a CSS Object Model (CSSOM)
    - Both DOM and CSSOM are tree structures that capture the structure of the markup
    - DOM and CSSOM are independent data structures
    - DevTool Timeline allows us to capture and inspect the construction and processing costs of DOM and CSSOM
  render-tree-construction:
    - The DOM and CSSOM trees are combined to form the render tree
    - Render tree contains only the nodes required to render the page
    - Layout is a recursive process which computes the exact position and size of each node within the renderer
    - Paint is the last step, which takes in the render tree and position and size of each element and renders the    pixels to the screen
  render-blocking-css:
    - By default CSS is treated as a render blocking resource
    - Media types and media queries allow us to mark some CSS resources as non render blocking
    - All CSS resources, regardless of blocking or non-blocking behavior are downloaded by the browser
  adding-interactivity:
    - JavaScript can query and modify DOM and CSSOM
    - JavaScript execution blocks on CSSOM
    - JavaScript blocks DOM construction unless explicitly declared as async</td>
  measure-crp:
    - Navigation Timing provides high resolution timestamps for measuring CRP.
    - Browser emits series of consumable events which capture various stages of the CRP.

---
{% wrap content%}

{% include modules/toc.liquid %}

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

# Constructing the Object Model

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.construct-object-model %}

## Document Object Model (DOM)

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link href="style.css" rel="stylesheet">
      </head>
      <body>
        <p>
          Hello <span>web performance</span> students!
        </p>
        <div><img src="awesome-photo.jpg"/></div>
      </body>
    </html>

Let's start, with the simplest possible case: a plain HTML page with some text
and a single image. What does the browser need to do to process this simple
page?

<!-- No converter for: INLINE_DRAWING -->

[TODO Add inline drawing]

1. **Conversion:** the browser reads the raw bytes of the HTML off the disk or
   network and translates them to individual characters based on specified
   encoding of the file (e.g. UTF-8).
1. **Tokenizing:** the browser converts strings of characters into distinct
   tokens specified by the [W3C HTML5 standard](http://www.w3.org/TR/html5/) -
   e.g. "<html>", "<body>" and other strings within the "angle brackets". Each
   token has a special meaning and a set of rules.
1. **Lexing:** the emitted tokens are converted into "objects" which define
   their properties and rules.
1. **DOM construction:** Finally, because the HTML markup defines relationships
   between different tags (some tags are contained within tags) the created
   objects are linked in a tree data structure that also captures the
   parent-child relationships defined in the original markup: _HTML_ object is a
   parent of the _body_ object, the _body_ is a parent of the _paragraph_
   object, and so on.

<!-- No converter for: INLINE_DRAWING -->

[TODO Add inline drawing]

**The final output of this entire process is the Document Object Model, or the
"DOM" of our simple page, which the browser uses for all further processing of
the page****.**** **

Every time the browser has to process HTML markup it has to step through all of
the steps above: convert bytes to characters, identify tokens, convert tokens to
nodes, and build the DOM tree. This entire process can take some time,
especially if we have a large amount of HTML to process.

<img src="image00.png" width="624" height="146" />

> _Note: for the purposes of this course we'll assume that you have basic
> familiarity with Chrome DevTools - i.e. you know how to capture a network
> waterfall, or record a timeline. If you need a quick refresher, check out the
> __[Chrome Developer Tools
> documentation](https://developers.google.com/chrome-developer-tools/)__, or if
> you're new to DevTools, I recommend taking the Codeschool __[Discover
> DevTools](http://discover-devtools.codeschool.com/)__ course._

If you open up Chrome DevTools and record a timeline while the page is loaded,
you can see the actual time taken to perform this step -- in example above, it
took us ~5ms to convert a chunk of HTML bytes into a DOM tree. Of course, if the
page was larger, as most pages are, this process might take significantly
longer. You will see in our future sections on creating smooth animations that
this can easily become your bottleneck if the browser has to process large
amounts of HTML. That said, let's not get ahead of ourselves…

With the DOM tree ready, do we have enough information to render the page to the
screen? Not yet! The DOM tree captures the properties and relationships of the
document markup, but it does not tell us anything about how the element should
look when rendered. That's the responsibility of the CSSOM, which we turn to
next!

## CSS Object Model (CSSOM)

While the browser was constructing the DOM of our simple page it encountered a
link tag in the head section of the document referencing an external CSS
stylesheet: style.css. Anticipating that it will need this resource to render
the page, it immediately dispatches a request for this resource, which comes
back with the following content:

      body { font-size: 16px }
         p { font-weight: bold }
      span { color: red }
    p span { display: none }
       img { float: right }

Of course, we could have declared our styles directly within the HTML markup
(inline), but keeping our CSS independent of HTML allows us to treat content and
design as separate concerns: the designers can work on CSS, developers can focus
on HTML, and so on.

Just as with HTML, we need to convert the received CSS rules into something that
the browser can understand and work with. Hence, once again, we repeat a very
similar process as we did with HTML:

<!-- No converter for: INLINE_DRAWING -->

[TODO Add inline drawing]

The CSS bytes are converted into characters, then to tokens and nodes, and
finally are linked into a tree structure known as the "CSS Object Model", or
CSSOM for short:

<!-- No converter for: INLINE_DRAWING -->

[TODO Add inline drawing]

Why does the CSSOM have a tree structure? When computing the final set of styles
for any object on the page the browser starts with the most general rule
applicable to that node (e.g. if it is a child of body element then all body
styles apply) and then recursively refines the computed styles by applying more
specific rules - i.e. the rules "cascade down".

To make it more concrete, consider the CSSOM tree above. Any text contained
within the _span_ tag that is placed within the body element will have a font
size of 16 pixels and have red text - the font-size directive cascades down from
body to the span. However, if a span tag is child of a paragraph (p) tag, then
its contents are not displayed.

Also, note that the above tree is not the complete CSSOM tree and only shows the
styles we decided to override in our stylesheet. It turns out, every browser
provides a default set of styles also known as "user agent styles" -- that's
what we see when we don't provide any of our own -- and our styles simply
override these defaults. If you have ever inspected your "computed styles" in
Chrome DevTools and wondered where all the styles are coming from, now you know!

Curious to know how long the CSS processing took? Record a timeline in DevTools
and look for "Recalculate Style" event: unlike DOM parsing, the timeline doesn't
show a separate "Parse CSS" entry, and instead captures parsing and CSSOM tree
construction, plus the recursive calculation of computed styles under this one
event.

<img src="image01.png" width="624" height="146" />

Our trivial stylesheet takes ~0.6ms to process and affects 8 elements on the
page -- not much, but once again, not free. However, where did the 8 elements
come from? The CSSOM and DOM and are independent data structures! Turns out, the
browser is hiding an important step. Next, lets talk about the render tree that
links the DOM and CSSOM together.

# Render-tree construction, Layout, and Paint

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.render-tree-construction %}

In the previous section on constructing the object model we built the DOM and
the CSSOM trees based on the HTML and CSS input. However, both of these are
independent objects which capture different aspects of the document: one
describes the content and the other the style rules that need to applied to the
document. How do we merge the two and get the browser to render pixels on the
screen?

The first step is for the browser to combine the DOM and CSSOM into a "render
tree" that captures all the visible DOM content on the page, plus all the CSSOM
style information for each node.

<!-- No converter for: INLINE_DRAWING -->

[TODO Add inline drawing]

To construct the render tree, the browser roughly does the following:

1. Starting at the root of the DOM tree, traverse each visible node.
    * Some nodes are not visible at all (e.g. script tags, meta tags, and so
      on), and are omitted since they are not reflected in the rendered output.
    * Some nodes are hidden via CSS and are also omitted from the render tree -
      e.g. the _span_ node in example above is missing from the render tree
      because we have an explicit rule that sets "display: none" property on it.
1. For each visible node find the appropriate matching CSSOM rules and apply
   them.
1. Emit visible nodes with content and their computed styles.

> _As a brief aside, note that "visibility: hidden" is different from "display:
> none". The former makes the element invisible, but the element is still
> occupies space in the layout (i.e. it's rendered as an empty box), whereas the
> latter (display: none) removes the element entirely from the render tree such
> that the element is invisible and is not part of layout._

The final output is a render that contains both the content and the style
information of all the visible content on the screen - we're getting close!
**With the render tree in place, we can proceed to the "layout" stage.**

Up to this point we've calculated which nodes should be visible and their
computed styles, but we have not calculated their exact position and size within
the viewport of the device - that's the "layout" stage, also sometimes known as
"reflow".

To figure out the exact size and position of each object the browser begins at
the root of the render tree and computes the final geometry of each object on
the page. Layout is a recursive process, which means that it computes the
geometry of the parent element and then its children. Let's consider a simple
hands-on example:

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
      </head>
      <body>
        <div style="width: 50%">
          <div style="width: 50%">Hello world!</div>
        </div>
      </body>
    </html>

The body of the above page contains two nested div's: the first (parent) div
sets the display size of the node to 50% of the viewport width, and the second
div contained by the parent sets its width to be 50% of its parent - i.e. 25% of
the viewport width!

<!-- No converter for: INLINE_DRAWING -->

[TODO Add inline drawing]

The output of the layout process is a "box model" which precisely captures the
exact position and size of each element within the viewport: all of the relative
measures are converted to absolute pixels positions on the screen, and so on.

Finally, now that we know which nodes are visible, their computed styles, and
geometry, we can finally pass this information to our final stage which will
convert each node in the render tree to actual pixels on the screen - this step
is often referred to as "painting" or "rasterizing".

Did you follow all of that? Each of these steps requires a non-trivial amount of
work by the browser, which also means that it can often take quite a bit of
time. Thankfully, Chrome DevTools can help us get some insight into all three of
the stages we've described above:

<img src="image02.png" width="624" height="146" />

* The render tree construction and position and size calculation are captured
  with the "Layout" event in the Timeline.
* Once layout is complete the browser issues a "Paint Setup" and "Paint" events
  which converts the render tree to actual pixels on the screen.

The time required to perform render tree construction, layout and paint will
vary based on the size of the document, the applied styles, and of course, the
device it is running on: the larger the document the more work the browser will
have to do; the more complicated the styles are the more time will be consumed
for painting also (e.g. a white pixel is "cheap" to paint, and a drop shadow is
much more "expensive" to compute and render).

Once all is said and done, our page is finally visible in the viewport - woohoo!

<img src="image03.png" width="624" height="322" />

Let's do a quick recap of all the steps the browser went through:

1. Process HTML markup and build the DOM tree
1. Process CSS markup and build the CSSOM tree
1. Combine the DOM and CSSOM into a render tree
1. Run layout on the render tree to compute geometry of each node
1. Paint the individual nodes to the screen

Our demo page may look very simple, but it requires quite a bit of work! Care to
guess what would happen if the DOM, or CSSOM is modified? We would have to
repeat the same process once over to figure out which pixels need to be
re-rendered on the screen.

**Optimizing the critical rendering path is the process of minimizing the total
amount of time spent in steps 1 through 5 in the above sequence. **Doing so
enables us to render content to the screen as soon as possible and also to
reduces the amount of time between screen updates after the initial render -
i.e. achieve higher refresh rate for interactive content.

# Render Blocking CSS

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.render-blocking-css %}


In the previous section we saw that the critical rendering path requires that we
have both the DOM and the CSSOM to construct the render tree, which creates an
important performance implication: **both HTML and CSS are render blocking
resources. **The HTML is obvious, since without the DOM we would not have
anything to render, but the CSS requirement may be less so. What would happen if
we try to render a typical page without blocking rendering on CSS?

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>NYTimes with CSS</td>
<td>NYTimes without CSS (FOUC)</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
</table>

Above example with the NYTimes website illustrates the difference for a typical
website with and without the CSS: it's dramatic. In fact, the experience on the
right is often referred to as a "Flash of Unstyled Content" (FOUC), and for
obvious reasons is not a good one for the user. As a result, the browser will
block rendering until it has both the DOM and the CSSOM.

> **_"CSS is a render blocking resource, get it down to the client as soon and
> as quickly as possible to optimize the time to first render!"_**

However, what if we have some CSS styles that are only used under certain
conditions, for example, when the page is being printed, or being projected onto
a large monitor? It would be nice if we didn't have to block rendering on these
resources!

CSS "media types" and "media queries" allow us to address this very use case:

    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">


A media query consists of a media type and zero or more expressions that check
for the conditions of particular media features. For example, our first
stylesheet declaration does not provide any media type or query, hence it will
apply in all cases - that is to say, it is always render blocking. On the other
hand, the second stylesheet will only apply when the content is being printed -
perhaps you want to rearrange the layout, change the fonts, etc - and hence does
not need to block the rendering of the page when it is first loaded. Finally,
the last stylesheet declaration provides a "media query" which is executed by
the browser: if the conditions match, the browser will block rendering until the
stylesheet is downloaded and processed.

By using media queries our presentation can be tailored to specific use cases
such as display _vs._ print, and also to dynamic conditions such as changes in
screen orientation, resize events, and more. **When declaring your stylesheet
assets, pay close attention to the media type and queries, as they will have big
performance impact on the critical rendering path!**

Let's consider some hands-on examples:

    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="screen">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print"></td>


* First declaration is render blocking and matches in all conditions.
* Second declaration is also render blocking: "screen" is the default type and
  if you don't specify any type, it's implicitly set to "screen". Hence, first
  and second declarations are actually equivalent.
* Third declaration has a dynamic media query which will be evaluated when the
  page is being loaded. Depending on the orientation of the device when the page
  is being loaded portrait.css may or may not be render blocking.
* Last declaration is only applied when the page is being printed, hence it is
  not render blocking when the page is first loaded in the browser.

Finally, note that "render blocking" only refers to whether the browser will
have to hold the initial rendering of the page on that resource. In either case,
the CSS asset is still downloaded by the browser, albeit with a lower priority
for non-blocking resources.

# Adding interactivity with JavaScript

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.adding-interactivity %}

JavaScript is a dynamic language that runs in the browser and allows us to alter
just about every aspect of how the page behaves: we can modify content on the
page by adding or removing elements from the DOM tree, we can modify the CSSOM
properties of each element, we can handle user input, and much more. To
illustrate this in action let's augment our previous "Hello World" example with
a simple inline script:

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link href="style.css" rel="stylesheet">
      </head>
      <body>
        <p>
          Hello <span>web performance</span> students!
        </p>
        <div><img src="awesome-photo.jpg"/></div>
        <script>
          var span = document.getElementsByTagName('span')[0];
          span.innerText = 'interactive'; // change DOM text content
          span.style.display = 'inline';  // change CSSOM property
          // create a new element, style it, and append it to the DOM
          var loadTime = document.createElement('div');
          loadTime.innerText = 'You loaded this page on: ' + new Date();
          loadTime.style.color = 'blue';
          document.body.appendChild(loadTime);
        </script>
      </body>
    </html>

* JavaScript allows us to reach into the DOM and pull out the reference to the
  hidden span node - the node may not be visible in the render tree, but it's
  still there in the DOM! Then, once we have the reference, we can change its
  text (via .innerText), and even override its calculated display style property
  from 'none' to 'inline'. Once all is said and done, our page will now display
  "**Hello ****interactive**** students!**".

* JavaScript also allows us to create, style, and append and remove new elements
  to the DOM. In fact, technically our entire page could be just one big
  JavaScript file which creates and styles the elements one by one - that would
  work, but in practice working with HTML and CSS is much easier. In any case,
  in the second part of our JavaScript function we create a new "div" element,
  set its text content, style it, and append it to the body.

<img src="image04.png" width="624" height="322" />

With that, we've modified the content and the CSS style of an existing DOM node,
and added an entirely new node to the document. Our page won't win any design
awards, but it illustrates the power and flexibility that JavaScript affords us.

However, there is a big performance caveat lurking underneath. JavaScript
affords us a lot of power, but it also creates a lot of additional limitations
on how and when the page is rendered.

First, notice that in the above example our inline script is near the bottom of
the page. Why? Well, you should try it yourself, but if we move the script above
the _span_ element, you'll notice that the script will fail and complain that it
cannot find a reference to any _span_ elements in the document - i.e.
_getElementsByTagName('span')_ will return _null_. This demonstrates an
important property: our script is executed at the exact point where it is
inserted in the document. When the HTML parser encounters a script tag it pauses
its process of constructing the DOM and yields control over to the JavaScript
engine; once the JavaScript engine has finished running, the browser then picks
up from where it left off and resumes the DOM construction.

In other words, our script can't find any elements below it because they haven't
been processed yet! Or, put slightly differently: **executing our inline script
blocks DOM construction, which will also delay the initial render.**

Another subtle property of introducing scripts into our page is that they can
read and modify not just the DOM, but also the CSSOM properties. In fact, that's
exactly what we're doing in our example when we change the display property of
the span element from "none" to "inline". The end result? We now have a race
condition.

What if the browser hasn't finished downloading and building the CSSOM when we
want to run our script? The answer is simple and not very good for performance:
**the browser will delay script execution until it has finished downloading and
constructing the CSSOM, and while we're waiting the DOM construction is also
blocked! **

In short, JavaScript introduces a lot of new dependencies between the DOM,
CSSOM, and JavaScript execution and can lead to significant delays in how
quickly the browser can process and render our page on the screen:

1. The location of the script in the document is significant
1. DOM construction is paused when a script tag is encountered and until the
   script has finished executing
1. JavaScript can query and modify the DOM and CSSOM
1. JavaScript execution is delayed until the CSSOM is ready

When we talk about "optimizing the critical rendering path," to a large degree
we're talking about understanding and optimizing the dependency graph between
HTML, CSS, and JavaScript.

## Parser Blocking vs. Asynchronous JavaScript

By default, JavaScript execution is "parser blocking": when the browser
encounters a script in the document it must pause DOM construction, hand over
the control to the JavaScript runtime and let the script execute before
proceeding with DOM construction. We already saw this in action with an inline
script in our earlier example. In fact, inline scripts are always parser
blocking unless you take special care and write additional code to defer their
execution.

What about scripts included via a script tag? Let's take our previous example
and extract our code into a separate file:

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link href="style.css" rel="stylesheet">
      </head>
      <body>
        <p>
          Hello <span>web performance</span> students!
        </p>
        <div><img src="awesome-photo.jpg"/></div>
        <script src="app.js"></script>
      </body>
    </html>

**app.js**

    var span = document.getElementsByTagName('span')[0];
    span.innerText = 'interactive'; // change DOM text content
    span.style.display = 'inline';  // change CSSOM property
    // create a new element, style it, and append it to the DOM
    var loadTime = document.createElement('div');
    loadTime.innerText = 'You loaded this page on: ' + new Date();
    loadTime.style.color = 'blue';
    document.body.appendChild(loadTime);

Would you expect the execution order to be any different when we use a `<script>`
tag instead of using an inline JavaScript snippet? Of course, the answer is "no"
as they are identical and should behave in the same way. In both cases the
browser will have to pause and execute the script before it can process the
remainder of the document. However, **in the case of an external JavaScript file
the browser will also have to pause and wait for the script to be fetched from
disk, cache, or a remote server,** **which can add tens to thousands of
milliseconds of delay to the critical rendering path.**

That said, good news, we do have an escape hatch! By default all JavaScript is
blocking: the browser doesn't know what the script is planning to do to the
page, hence it has to assume the worst case scenario and block the parser, but
what if we could signal to the browser and tell it that we promise not to change
the document content from under its feet? Doing so would allow the browser to
continue processing the DOM and let the script execute once its ready - e.g.
once the file has been downloaded from the network.

So, how do we achieve this trick? It's pretty simple, we can mark our script as
**"async"**:

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link href="style.css" rel="stylesheet">
      </head>
      <body>
        <p>
          Hello <span>web performance</span> students!
        </p>
        <div><img src="awesome-photo.jpg"/></div>
        <script src="app.js" async></script>
      </body>
    </html>

Adding the **async **keyword to the script tag tells the browser that it should
not block the DOM construction while it waits for the script to become available
- this is a huge performance win!

Alternatively, you will also often see the following pattern for inserting an
"async script":

    <script>
      var script = document.createElement('script');
      script.src = "...";
      document.getElementsByTagName('head')[0].appendChild(script);
    </script>

This one is a bit tricky. First, obviously the snippet itself is an inline
script, and we know that it will block DOM construction while it is being
executed. However, now consider at what it does: the snippet creates a new
script element, sets its source attribute (URL), and appends it to the document
-- it's an inline script which inserts an external script! What's the point?

Turns out, scripts which are injected via JavaScript are considered async by
default. As a result, inserting the script in this fashion is identical to
adding the "async" keyword - the browser will pause to execute the inline script
to schedule the external resource, but it won't block on fetching the resource
before proceeding with DOM construction.

Why should you use one or the other method? The **"async" **keyword does not
work in a [few older browsers](http://caniuse.com/script-async), whereas the
JavaScript snippet works across all browsers - other than that they are
identical.

> _Note: all modern mobile browsers support the "async" keyword, so unless you
> have to target older desktop browsers, you can use "async". _

# Measuring the Critical Rendering Path with Navigation Timing

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.measure-crp %}

We've now covered all the necessary background to understand the major steps
that the browser has to go through to construct the page: converting HTML and
CSS bytes to DOM and CSSOM trees, combining them into a render tree, performing
layout, and executing JavaScript. However, before we dive into hands-on
examples, we need one more thing: metrics!

The foundation of every solid performance strategy is good measurement and
instrumentation.
Turns out, that is exactly what the Navigation Timing API provides.

Each of the labels in the diagram corresponds to a high resolution timestamp
that the browser tracks for each and every page it loads. In fact, in this
specific case we're only showing a fraction of all the different timestamps --
for now we're skipping all network related timestamps, but we'll come back to
them in a future lesson.

So, what do these timestamps mean?

* **domLoading:** this is the starting timestamp of the entire process, the
  browser is about to start parsing the first received bytes of the HTML
  document.
* **domInteractive:** marks the point when the browser has finished parsing all
  of the HTML and DOM construction is complete.
* **domContentLoaded:** marks the point when both the DOM is ready and there are
  no stylesheets that are blocking JavaScript execution - meaning we can now
  (potentially) construct the render tree.
    * Many JavaScript frameworks wait for this event before they start executing
      their own logic. For this reason the browser captures the "EventStart" and
      "EventEnd" timestamps to allow us to track how long this execution took.
* **domComplete: **as the name implies, all of the processing is complete and
  all of the resources on the page (images, etc.) have finished downloading -
  i.e. the loading spinner has stopped spinning.
* **loadEvent:** as a final step in every page load the browser fires an
  "onload" event which can trigger additional application logic.

The HTML specification dictates specific conditions for each and every event:
when it should be fired, which conditions should be met, and so on. For our
purposes, we'll focus on a few key milestones related to the critical rendering
path:

1. **domInteractive **marks when DOM is ready.
1. **domContentLoaded** typically marks when [both the
   ](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/)[DOM
   and CSSOM are
   ready](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/).
    1. If there is no parser blocking JavaScript than documentContentLoaded will
       fire immediately after domInteractive.
1. **domComplete** marks when the page and all of its subresources are ready.

As follows:

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link href="style.css" rel="stylesheet">
        <script>
          function measureCRP() {
            var t = window.performance.timing,
              interactive = t.domInteractive - t.domLoading,
              dcl = t.domContentLoadedEventStart - t.domLoading,
              complete = t.domComplete - t.domLoading;
            var stats = document.createElement('p');
            stats.innerText = 'interactive: ' + interactive + 'ms, ' +
                'dcl: ' + dcl + 'ms, complete: ' + complete + 'ms';
            document.body.appendChild(stats);
          }
        </script>
      </head>
      <body onload="measureCRP()">
        <p>
          Hello <span>web performance</span> students!
        </p>
        <div><img src="awesome-photo.jpg"/></div>
      </body>
    </html>

The above example may seem a little daunting on first sight, but in reality it
is actually pretty simple. The Navigation Timing API captures all the relevant
timestamps and our code simply waits for the "onload" event to fire -- recall
that onload event fires after domInteractive, domContentLoaded and domComplete
-- and computes the difference between the various timestamps.

<img src="image05.png" width="624" height="322" />

All said and done, we now have some specific milestones to track and a simple
function to output these measurements. Note that instead of printing these
metrics on the page you can also modify the code to send these metrics to an
analytics server ([Google Analytics does this
automatically](https://support.google.com/analytics/answer/1205784?hl=en)),
which is a great way to keep tabs on performance of your pages and identify
candidate pages that can benefit from some optimization work.

# Analyzing Critical Rendering Path Performance

The goal of optimizing the critical rendering path is to allow the browser to
paint the page as quickly as possible: faster pages translate to higher
engagement, number of pages viewed, and [improved
conversion](http://www.google.com/think/multiscreen/success.html). As a result,
we want to minimize the amount of time the visitor has to spend staring at a
blank screen by optimizing which resources are loaded and in which order.

To help illustrate this process, let's start with the simplest possible case and
incrementally build up our page to include additional resources, styles, and
application logic - in the process, we'll also see where things can go wrong,
and how to optimize each of these cases.

Finally, one more thing before we start... So far we've focused exclusively on
what happens in the browser once the resource (CSS, JS, or HTML file) is
available to process and have ignored the time to fetch it either from cache or
from the network. We'll dive into how to optimize the networking aspects of our
application in great detail in the next lesson but in the meantime (to make
things more realistic) we'll assume the following:

* A network roundtrip (propagation latency) to the server will cost 100ms
* Server response time will be 100ms for HTML document and 10ms for all other
  files

## The Hello World experience

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
      </head>
      <body>
        <p>
          Hello <span>web performance</span> students!
        </p>
        <div><img src="awesome-photo.jpg"/></div>
      </body>
    </html>

We'll start with basic HTML markup and a single image - no CSS or JavaScript -
which is about as simple as it gets. Now let's open up our Network timeline in
Chrome DevTools and inspect the resulting resource waterfall:

<img src="image06.png" width="624" height="64" />

As expected, the HTML file took ~200ms to download. Note that the opaque portion
of the blue line indicates the time the browser is waiting on the network - i.e.
no response bytes have yet been received - whereas the solid portion shows the
time to finish the download after the first response bytes have been received.
In our example above, the HTML download is tiny (<4K), so all we need is a
single roundtrip to fetch the full file. As a result, the HTML document takes
~200ms to fetch, with half the time spent waiting on the network and other half
on the server response.

Once the HTML content becomes available, the browser has to parse the bytes,
convert them into tokens, and build the DOM tree. Notice that DevTools
conveniently reports the time for DOMContentLoaded event at the bottom (216ms),
which also corresponds to the blue vertical line. The gap between the end of the
HTML download and the blue vertical line (DOMContentLoaded) is the time it took
the browser to build the DOM tree - in this case,  just a few milliseconds.

Finally, notice something interesting: our "awesome photo" did not block the
domContentLoaded event! Turns out, we can construct the render tree and even
paint the page without waiting for each and every asset on the page: **not all
resources are critical to deliver the fast first paint.** In fact, as we will
see, when we talk about the critical rendering path we are typically talking
about the HTML markup, CSS, and JavaScript. Images do not block the initial
render of the page - although, of course, we should try to make sure that we get
the images painted as soon as possible also!

That said, the "load" event (also commonly known as "onload"), is blocked on the
image: DevTools reports the onload event at 216ms. Recall that the onload event
marks the point when **all** **resources **required by the page have been
downloaded and processed - this is the point when the loading spinner can stop
spinning in the browser and this point is marked by the red vertical line in the
waterfall.

## Adding JavaScript and CSS into the mix

Our "Hello World experience" page may seem simple on the surface, but there is a
lot going on under the hood to make it all happen! That said, in practice we'll
also need more than just the HTML: chances are, we'll have a CSS stylesheet and
one or more scripts to add some interactivity to our page. Let's add both to the
mix and see what happens:

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link href="style.css" rel="stylesheet">
      </head>
      <body onload="measureCRP()">
        <p>
          Hello <span>web performance</span> students!
        </p>
        <div><img src="awesome-photo.jpg"/></div>
        <script src="timing.js"></script>
      </body>
    </html>

Before adding JavaScript and CSS:
<img src="image06.png" width="624" height="64" />

With JavaScript and CSS:
<img src="image07.png" width="624" height="92" />

Adding external CSS and JavaScript files added two extra requests to our
waterfall, all of which are dispatched at about the same time by the browser -
so far so good. However, **note that there is now a much smaller timing
difference between the ****_domContentLoaded_**** and ****_onload_**** events.**
What happened?

* Unlike our plain HTML example, we now also need to fetch and parse the CSS
  file to construct the CSSOM, and we know that we need both the DOM and CSSOM
  to build the render tree.
* Because we also have a parser blocking JavaScript file on our page, the
  domContentLoaded event is blocked until the CSS file is downloaded and parsed:
  the JavaScript may query the CSSOM, hence we must block and wait for CSS
  before we can execute JavaScript.

**What if we replace our external script with an inline script? **A trivial
question on the surface but actually its very tricky. Turns out, even if the
script is inlined directly into the page the only reliably way for the browser
to know what that script is intending to do is, well, to execute it, and as we
already know, we can't do that until the CSSOM is constructed.  In short,
inlined JavaScript is also (and always) parser blocking.

That said, despite blocking on CSS, will inlining the script make the page
render faster?** **If the last scenario was tricky, then this one is even more
so! Let's try it and see what happens...

_External JavaScript:_
<img src="image07.png" width="624" height="92" />
_Inlined JavaScript:_
<img src="image08.png" width="624" height="73" />

We are making one less request, but our _onload_ and _domContentLoaded_ times
are effectively the same, why? Well, we know that it doesn't matter if the
JavaScript is inlined or external, because as soon as the browser hits the
script tag it will block on CSSOM. Further, in our first example both CSS and
JavaScript are being downloaded in parallel by the browser and finish at about
the same time. As a result, in this particular instance, inlining the JavaScript
code doesn't help us much! Hmm, so are we stuck and is there nothing that we can
do to make our page render faster? Actually, we have several different
strategies.

First, recall that all inline scripts are "parser blocking", but for external
scripts we can add the "async" keyword on the script tag or inject them via the
special JavaScript snippet we saw earlier. Let's undo our inlining and give that
a try:

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link href="style.css" rel="stylesheet">
      </head>
      <body onload="timing()">
        <p>
          Hello <span>web performance</span> students!
        </p>
        <div><img src="awesome-photo.jpg"/></div>
        <script async src="timing.js"></script>
      </body>
    </html>

_Parser-blocking (external) JavaScript:_
<img src="image07.png" width="624" height="92" />
_Async (external) JavaScript:_
<img src="image09.png" width="624" height="94" />

Much better! The domContentLoaded event fires shortly after the HTML is parsed:
the browser knows not to block on JavaScript and since there are no other parser
blocking scripts the CSSOM construction can also proceed in parallel.

Alternatively, we could have tried a different approach and inlined both the CSS
and JavaScript:

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <style>
          p { font-weight: bold }
          span { color: red }
          p span { display: none }
          img { float: right }
        </style>
      </head>
      <body>
        <p>
          Hello <span>web performance</span> students!
        </p>
        <div><img src="awesome-photo.jpg"/></div>
        <script>
          var span = document.getElementsByTagName('span')[0];
          span.innerText = 'interactive'; // change DOM text content
          span.style.display = 'inline';  // change CSSOM property
          // create a new element, style it, and append it to the DOM
          var loadTime = document.createElement('div');
          loadTime.innerText = 'You loaded this page on: ' + new Date();
          loadTime.style.color = 'blue';
          document.body.appendChild(loadTime);
        </script>
      </body>
    </html>


<img src="image10.png" width="624" height="62" />

Notice that the _domContentLoaded_ time is effectively the same as in the
previous example: instead of marking our JavaScript as async we've inlined both
the CSS and JS into the page itself. This made our HTML page much larger, but
the upside is that the browser doesn't have to wait to fetch any external
resources - everything is right there in the page.

As you can see, even with a very simple page, optimizing the critical rendering
path is a non-trivial exercise: we need to understand the dependency graph
between different resources, we need to identify which resources are "critical",
and we have different strategies for how to include those resources on the page.
There is no one solution to this problem - each page is different, and you'll
have to follow a similar process on your own to figure out the optimal strategy.

That said, let's see if we can step back and identify some general performance
patterns…

## Performance Patterns

The simplest possible page consists of just the HTML markup: no CSS, no
JavaScript, or other types of resources. To render this page the browser has to
initiate the request, wait for the HTML document to arrive, parse it, build the
DOM, and then finally render it on the screen:

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
      </head>
      <body>
        <p>
          Hello <span>web performance</span> students!
        </p>
      </body>
    </html>

<!-- No converter for: INLINE_DRAWING -->

[TODO Add inline drawing]

**The time between T****0**** and T****1 ****captures the network and server
processing times.** In the best case (if the HTML file is small), all we will
need is just one network roundtrip to fetch the entire document - due to how the
TCP transports protocols work, larger files may require more roundtrips, this is
a topic we'll come back to in a future lesson. As a result, we can say that the
above page, in the best case, has a **one roundtrip** (**minimum) critical
rendering path.**

Now, let's consider the same page but with an external CSS file:

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link href="style.css" rel="stylesheet">
      </head>
      <body>
        <p>
          Hello <span>web performance</span> students!
        </p>
      </body>
    </html>

<!-- No converter for: INLINE_DRAWING -->
[todo: add image]

Once again, we incur a network roundtrip to fetch the HTML document and then the
retrieved markup tells us that we will also need the CSS file: this means that
the browser has to go back to the server and get the CSS before it can render
the page on the screen. **As a result, this page will incur a minimum of two
roundtrips before the page can be displayed **- once again, the CSS file may
take multiple roundtrips, hence the emphasis on "minimum".

Let's define the vocabulary we'll be using to describe the critical rendering
path:

* **Critical Resource:** resource that may block initial rendering of the page.
* **Critical Path Length:** number of roundtrips, or the total time required to
  fetch all of the critical resources.
* **Critical Bytes:** total amount of bytes required to get to first render of
  the page, which is the sum of the transfer filesizes of all critical
  resources.

Our first example with a single HTML page contained a single critical resource
(the HTML document), the critical path length was also equal to 1 network
roundtrip (assuming file is small), and the total critical bytes was just the
transfer size of the HTML document itself.

Now let's compare that to the critical path characteristics of the HTML + CSS
example above:
<!-- No converter for: INLINE_DRAWING -->

[TODO Add inline drawing]

* [   **2**   ] critical resources
* [   **2**   ] or more roundtrips for the minimum critical path length
* [   **9**   ] KB of critical bytes

We need both the HTML and CSS to construct the render tree, as a result both
HTML and CSS are critical resources: the CSS is fetched only after the browser
gets the HTML document, hence the critical path length is at minimum two
roundtrips; both resources add up to a total of 9KB of critical bytes.

Ok, now let's add an extra JavaScript file into the mix!

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link href="style.css" rel="stylesheet">
      </head>
      <body>
        <p>
          Hello <span>web performance</span> students!
        </p>
        <div><img src="awesome-photo.jpg"/></div>
        <script src="app.js"></script>
      </body>
    </html>

We added app.js, which is an external JavaScript asset on the page, and as we
know by now, it is a parser blocking (i.e. critical) resource. Worse, in order
to execute the JavaScript file we will also have to block and wait for CSSOM -
recall that JavaScript can query the CSSOM and hence the browser will pause
until "style.css" is downloaded and CSSOM is constructed.
<!-- No converter for: INLINE_DRAWING -->

[TODO Add inline drawing]

That said, in practice if we look at the "network waterfall" of this page you'll
notice that both the CSS and JavaScript requests will be initiated at about the
same time: the browser gets the HTML, discovers both resources and initiates
both requests. As a result, the above page has the following critical path
characteristics:

* [   **3**   ] critical resources
* [   **2**   ] or more roundtrips for the minimum critical path length
* [  **11**  ] KB of critical bytes

We now have three critical resources that add up to 11KB of critical bytes, but
our critical path length is still two roundtrips because we can transfer the CSS
and JavaScript simultaneously! **Figuring out the characteristics of your
critical rendering path means being able to identify which are the critical
resources, and also understanding how the browser will schedule their fetches.
**Let's continue with our example…

After chatting with our site developers we realized that the JavaScript we
included on our page doesn't need to be blocking: we have some analytics and
other code in there that doesn't need to block the rendering of our page.
Knowing that we can add the "async" attribute to the script tag to unblock the
parser:

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link href="style.css" rel="stylesheet">
      </head>
      <body>
        <p>
          Hello <span>web performance</span> students!
        </p>
        <div><img src="awesome-photo.jpg"/></div>
        <script src="app.js" async></script>
      </body>
    </html>

<!-- No converter for: INLINE_DRAWING -->

[TODO Add inline drawing]

Making the script asynchronous has several advantages:

* The script is no longer parser blocking and does not part of the critical
  rendering path
* Because there are no other critical scripts the CSS also does not need to
  block the domContentLoaded event
* The sooner the domContentLoaded event fires, the sooner other application
  logic can begin executing

As a result, our optimized page is now back to two critical resources (HTML and
CSS), with a minimum critical path length of two roundtrips, and a total of 9KB
of critical bytes.

Finally, let's say the CSS stylesheet was only needed for print? How would that
look?

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link href="style.css" rel="stylesheet" media="print">
      </head>
      <body>
        <p>
          Hello <span>web performance</span> students!
        </p>
        <div><img src="awesome-photo.jpg"/></div>
        <script src="app.js" async></script>
      </body>
    </html>

<!-- No converter for: INLINE_DRAWING -->

[TODO Add inline drawing]

Because the style.css resource is only used for print, the browser does not need
to block on it to render the page. Hence, as soon as DOM construction is
complete, the browser has enough information to render the page! As a result,
this page has only a single critical resource (the HTML document), and the
minimum critical rendering path length is one roundtrip.

# Optimizing the Critical Rendering Path

In order to deliver the fastest possible time to first render, we need to
optimize three variables:

1. **Minimize the number of critical resources.**
1. **Minimize the number of critical bytes.**
1. **Minimize the critical path length. **

A critical resource is any resource that may block initial rendering of the
page. The fewer of these resources there are on the page, the less work the
browser has to do to get content on the screen, and the less contention there is
for CPU and other resources.

Similarly, the fewer critical bytes the browser has to download, the faster it
can get to processing the content and get it visible on the screen. To reduce
the number of bytes we can reduce the number of resources (eliminate them or
make them non-critical), and also ensure that we minimize the transfer size by
compressing and optimizing each resource.

Finally, the critical path length is a function of the dependency graph between
all the critical resources required by the page and their bytesize: some
resource downloads can only be initiated once a previous resource has been
processed, and the larger the resource the more roundtrips it will take us to
download it.

In other words, the number of resources, their bytesize, and the critical path
length are related to each other, but they are not exactly the same. For
example, you may not be able to reduce the number of critical resources, or
shorten the critical path length, but reducing the number of critical bytes is
still an important optimization -- and vice versa.

**The general sequence of steps to optimize the critical rendering path is:**

1. Analyze and characterize your critical path: number of resources, bytes,
   length.
1. Eliminate any critical resources which do not need to critical: eliminate
   them, defer their download, mark them as async, etc.
1. Optimize the order in which the remaining critical resources are loaded: you
   want to download all critical assets as early as possible to shorten the
   critical path length.
1. Optimize the number of critical bytes to reduce the download time (number of
   roundtrips).

# PageSpeed Rules and Recommendations

### Eliminate render-blocking JavaScript and CSS in above-the-fold content

To deliver the fastest time to first render you want to minimize and (where
possible) eliminate the number of critical resources on the page, minimize the
number of downloaded critical bytes, and optimize the critical path length.

### Optimize JavaScript Use

JavaScript resources are 'parser-blocking' by default unless marked as 'async'
or added via a special JavaScript snippet. Parser blocking JavaScript forces the
browser to wait for the CSSOM and pauses construction of the DOM, which in turn
can significantly delay the time to first render.

#### **Prefer async JavaScript resources**

Async resources unblock the document parser and allow the browser to avoid
blocking on CSSOM prior to executing the script. Often, if the script can be
made async, it also means it is not essential for the first render - consider
deferring async scripts.

#### **Defer parsing JavaScript**

Any non-essential scripts that are not critical to constructing the visible
content for the initial render should be deferred to minimize the amount of work
the browser has to perform to render the page.

#### **Avoid long running JavaScript**

Long running JavaScript blocks the browser from constructing the DOM, CSSOM, and
rendering the page. As a result, any initialization logic and functionality that
is non-essential for the first render should be deferred until later. If a long
initialization sequence needs to be run, consider splitting it into several
stages to allow the browser to process other events in between.

### Optimize CSS Use

CSS is required to construct the render tree and JavaScript will often block on
CSS during initial construction of the page. You should ensure that any
non-essential CSS is marked as non-critical (e.g. print and other media
queries), and that the amount of critical CSS and the time to deliver it is as
small as possible.

#### **Put CSS in the document head**

All CSS resources should be specified as early as possible within the HTML
document such that the browser can dispatch the request for the CSS as soon as
possible.

#### **Avoid CSS imports**

CSS imports (@import) introduce additional roundtrips into the critical path:
the imported CSS resources are discovered only after the CSS stylesheet with the
@import rule itself has been received and parsed.

#### **Inline render-blocking CSS**

For best performance you may want to consider inlining the critical CSS directly
into the HTML document, and loading the remainder of the CSS styles in an
asynchronous fashion. This eliminates additional roundtrips in the critical path
and if done correctly can be used to deliver a "one roundtrip" critical path
length where only the HTML is a blocking resource.

{% endwrap%}
