project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 65 for developers?

{# wf_published_on: 2018-03-06 #}
{# wf_updated_on: 2018-03-06 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome65,new-in-chrome,css,layout,performance #}
{# wf_featured_snippet: Chrome 65 adds support for the new CSS Paint API, which allows you to programmatically generate an image. You can use the Server Timing API to provide server performance timing information via HTTP headers, and the new CSS display: contents property can make boxes disappear! Let’s dive in and see what’s new for developers in Chrome 65! #}
{# wf_blink_components: N/A #}

# New in Chrome 65 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="_W4GSpoSOZI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* The [CSS Paint API](#css-paint) allows you to programmatically generate
  an image.
* The [Server Timing API](#server-timing) allows web servers to provide
  performance timing information via HTTP headers.
* the new [CSS `display: contents` property](#display-contents) can make
  boxes disappear!

And there’s [plenty more](#more)!

I’m Pete LePage. Let’s dive in and see what’s new for developers in Chrome 65!

<div class="clearfix"></div>

Note: Want the full list of changes? Check out the
[Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/64.0.3282.140..65.0.3325.146).

## CSS Paint API {: #css-paint }

The [CSS Paint API](https://www.w3.org/TR/css-paint-api-1/) allows you to
programmatically generate an image for CSS properties like `background-image`
or `border-image`.

Instead of referencing an image, you can use the new paint function to
draw the image - much like a canvas element.

<pre class="prettyprint">
&lt;style>
  .myElem { background-image: <b>paint(checkerboard);</b> }
&lt;/style>
&lt;script>
  <b>CSS.paintWorklet.addModule('checkerboard.js');</b>
&lt;/script>
</pre>

For example, instead of adding extra DOM elements to
[create the ripple effect](/web/updates/2018/01/paintapi#use_cases)
on a material styled button, you could use the paint API.

It’s also a powerful method of polyfilling CSS features that aren’t supported
in a browser yet.

Surma has a great post with several
[demos](https://googlechromelabs.github.io/houdini-samples/paint-worklet/checkerboard/)
in his [explainer](/web/updates/2018/01/paintapi).


## Server Timing API {: #server-timing }

Hopefully you’re using the navigation and resource timing APIs to track the
performance of your site for real users. Until now, there hasn’t been an easy
way for the server to report it’s performance timing.

The new [Server Timing API](https://w3c.github.io/server-timing/) allows your
server to pass timing information to the browser; giving you a better picture
of your overall performance.

You can track as many metrics as you want: database read times, start-up time,
or whatever is important to you, by adding a `Server-Timing` header to your
response:

```
'Server-Timing': 'su=42;"Start-up",db-read=142;"Database Read"'
```

<img src="/web/updates/images/2018/03/nic65-server-timing-devtools.png" class="attempt-right">

They’re shown in Chrome DevTools, or you can pull them out of the response
header and save them with your other performance analytics.


<div class="clearfix"></div>

## `display: contents` {: #display-contents }

The new CSS `display: contents` property is pretty slick!

When added to a container element, any children take its place in the DOM,
and it essentially disappears. Let’s say I’ve got two `div`’s, one inside the
other. My outer `div` has a red border, a gray background and I’ve set a width
of 200 pixels. The inner `div` has a blue border, and a light blue background.

```
.disp-contents-outer {
  border: 2px solid red;
  background-color: #ccc;
  padding: 10px;
  width: 200px;
}
.disp-contents-inner {
  border: 2px solid blue;
  background-color: lightblue;
  padding: 10px;
}
```

By default, the inner `div` is contained in the outer `div`.

<style>
.disp-contents-outer {
  border: 2px solid red;
  background-color: #ccc;
  padding: 10px;
  width: 200px;
}
.disp-contents-inner {
  border: 2px solid blue;
  background-color: lightblue;
  padding: 10px;
}
.disp-contents {
  display: contents;
}
</style>

<div class='disp-contents-outer'>
  <div class='disp-contents-inner'>
    I'm the inner &lt;div&gt;
  </div>
</div>

Adding `display: contents` to the outer div, makes the outer `div` disappear
and it’s constraints are no longer applied to the inner `div`. The inner
`div` is now 100% width.

<div class='disp-contents-outer disp-contents'>
  <div class='disp-contents-inner'>
    Use DevTools to inspect the DOM, and notice the outer <code>div</code> still exists.
  </div>
</div>

There are plenty of cases where this might be helpful, but the most common one
is with flexbox. With flexbox, only the immediate children of a flex container
become flex items.

But, once you apply `display: contents` to a child, it’s children become flex
items and are laid out using the same rules that would have been applied to
their parent.

Check out [Rachel Andrew](https://twitter.com/rachelandrew)’s excellent post
[Vanishing boxes with display contents](https://rachelandrew.co.uk/archives/2016/01/29/vanishing-boxes-with-display-contents/)
for more details and other examples.


## And more! {: #more }

These are just a few of the changes in Chrome 65 for developers, of course,
there’s plenty more.

* The syntax for specifying `HSL` and `HSLA`, and `RGB` and `RGBA` coordinates
  for the color property now
  [match](https://drafts.csswg.org/css-color/#the-hsl-notation) the
  [CSS Color 4 spec](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
* There’s a new [feature policy](http://xhr.featurepolicy.rocks/) that allows
  you to control synchronous XHRs through an HTTP header or the
  iframe `allow` attribute.

Be sure to check out [New in Chrome DevTools](/web/updates/01/devtools), to
learn what’s new in for DevTools in Chrome 65. And, if you’re interested in
Progressive Web Apps, check out the new
[PWA Roadshow video series](https://www.youtube.com/playlist?list=PLNYkxOF6rcICnIOm4cfylT0-cEfytBtYt).
Then, click the [subscribe](https://goo.gl/6FP1a5) button on our
[YouTube channel](https://www.youtube.com/user/ChromeDevelopers/), and
you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.


I’m Pete LePage, and as soon as Chrome 66 is released, I’ll be right
here to tell you -- what’s new in Chrome!

{% include "comment-widget.html" %}
