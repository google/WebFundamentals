project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: Widgets you can use to simplify your writing and development

{# wf_updated_on: 2018-02-05 #}
{# wf_published_on: 2016-09-13 #}
{# wf_blink_components: N/A #}

# Widgets {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Web**Fundamental** provides a wide variety of widgets to use in documentation.

## Common Links

Maintaining links can be a pain, to simplify this, you can
add common links to the [`_common-links.md`][common-links] file, add it as in include to your
markdown document then use the reference link syntax to reference it in your
document.

First, define the link, in [`_common-links.md`][common-links], using the
standard reference link markdown syntax:

    [id]: http://example.com/  "Optional Title Here"

Be sure to add links sorted alphabetically by id, check to ensure the link
you're adding doesn't already exist yet.

Next, include the [`_common-links.md`][common-links] file in your document.

    <<../_common-links.md>>

Note: The path to the [`_common-links.md`][common-links] file must be relative
from the current directory.

Finally, use the reference link in your document:

    This is [an example][id] reference-style link.

## Includes

The `include` tag includes another file or template at the location of the
tag. If the file contains Django template directives, those directives will be
interpolated.

{% include "web/_shared/sample.html" %}

<pre class="prettyprint">
&#123;% include "web/_shared/sample.html" %}
</pre>

Note: Included files using this syntax must be HTML. Markdown will not be processed.

## Article translation is out of date

If you update an article that has a localized version, please add the
`translation-out-of-date` widget. The widget has been translated into all
languages we support and recommends that developers check the English version
as the localized version may be out of date.

The widget looks like:

{% include "web/_shared/translation-out-of-date.html" %}


To include it, use:

<pre class="prettyprint">
&#123;% include "web/_shared/translation-out-of-date.html" %}
</pre>

## Including live JavaScript in pages (`framebox`)

The `framebox` tag lets you embed a live demo of JavaScript functionality in
a page, running the demo in a domain-sandboxed environment. The contents of the
`framebox` tag are moved to a separate file served from a non-google.com
domain, and automatically included in the documentation page using an `iframe`.
Frameboxes can contain HTML, CSS, and JavaScript. Text in frameboxes is
automatically submitted for translation with the rest of the document, and
served in the same locale as the page.

{% framebox height="80px" %}
<style>
.borderdemo { border: 1px solid red; }
</style>
<p id="demopara">Click the button to toggle the border.
  <button id="demobutton">Click Me</button>
</p>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script>
$(document).ready(function() {
  $('#demobutton').click(function(event) {
    if ($('#demopara').hasClass('borderdemo')) {
      $('#demopara').removeClass('borderdemo');
    } else {
      $('#demopara').addClass('borderdemo');
    }
  });
});
</script>
{% endframebox %}

The code for this example:

<pre class="prettyprint lang-html">&#123;% framebox height="80px" %}{% htmlescape %}
<style>
.borderdemo { border: 1px solid red; }
</style>
<p id="demopara">Click the button to toggle the border.
  <button id="demobutton">Click Me</button>
</p>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script>
$(document).ready(function() {
  $('#demobutton').click(function(event) {
    if ($('#demopara').hasClass('borderdemo')) {
      $('#demopara').removeClass('borderdemo');
    } else {
      $('#demopara').addClass('borderdemo');
    }
  });
});
</script>
{% endhtmlescape %}&#123;% endframebox %}</pre>

Supported parameters for framebox:

* `height`: Sets the height of the framebox
* `class`: Adds a class to the framebox’ `iframe`

## Including code from the local project (`includecode`)

Use `includecode` with a `content_path` argument to refer to a path to
a file in the content area, typically in a hidden subdirectory. The path is
relative to the locale root. If the file is not found in the page's locale, it
also checks for the file in the en locale before failing.

<pre class="prettyprint">
&lt;pre class="prettyprint">
&#123;% includecode content_path="web/fundamentals/resources/_code/file.js" %}
&lt;/pre>
</pre>

Includes can be limited by using `region_tag="region"` and including a
`[START region]` and `[END region]` within the code file.

By default `includecode` returns the specified section of the source code,
including whitespace, without modification. This may be undesired if the
specified region is deeply indented in the source file as it may appear out of
line with the rest of the documentation. You can adjust the indentation of the
included code with the `adjust_indentation="auto"` option.

<pre class="prettyprint">
&lt;pre class="prettyprint">
&#123;% includecode content_path="path/file.js" adjust_indentation="auto" %}
&lt;/pre>
</pre>



## Reusable related guides includes

Web**Fundamentals** made it easy to include related guides, unfortunately
DevSite doesn't have an equivalent. To make life easier and allow for simple
reuse, you can use a set of pre-created related guides.

<pre class="prettyprint">
&#123;% include "_shared/related-guides/heading.html" %}
&#123;% include "_shared/related-guides/service-workers.html" %}
</pre>

Will render as:

{% include "web/_shared/related-guides/heading.html" %}
{% include "web/_shared/related-guides/service-workers.html" %}


## User comments

To allow users to comment on your documentation, add a comment widget to the
bottom of the page. For example:

<pre class="prettyprint">
&#123;% include "comment-widget.html" %}
</pre>

Note: the comment widget does **not** render in the staging or development
environment, and will only be visible when the page is published on DevSite.


## Videos

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="yQhFmPExcbs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Wrap all YouTube videos in `<div class="video-wrapper">` or
`<div class="video-wrapper-full-width">`. `class="video-wrapper"`
automatically floats the video right on larger screens, keeping it at 50% of
the column width but forcing the video into vertical layout on smaller screens,
with the video at 100% of the column width. As the video's size changes, it
automatically maintains a 16:9 ratio. `class="video-wrapper-full-width"` keeps
the video at 100% of the column width at all sizes, and still scales it to
automatically maintain a 16:9 ratio.

    <div class="video-wrapper">
      <iframe class="devsite-embedded-youtube-video" data-video-id="yQhFmPExcbs"
              data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
      </iframe>
    </div>


[common-links]: https://github.com/google/WebFundamentals/blob/master/src/content/en/_common-links.md


## Inline Feedback {: #inline-feedback }

Gain more feedback on your doc by asking your readers yes / no questions.

### Example

See [Get Started Debugging JS][inline feedback example] for examples. Each of
the questions at the bottom of the sections use the Inline Feedback widget.

[inline feedback example]: /web/tools/chrome-devtools/javascript/

### Usage

1. Make a directory called `_feedback` near the doc that'll include the feedback.
2. If you want to include a question before your buttons, then copy
   `/src/content/en/tools/chrome-devtools/javascript/_feedback/7.html` into
   your `_feedback` directory. Else, copy `.../1.html`.
2. Copy `/src/content/en/tools/chrome-devtools/javascript/_feedback/1.html`
   into your `_feedback` directory.
3. Modify all of the variables to suit your question. All variables except
   `question` are required.
4. Include `_feedback/1.html` into your doc, like this:

<pre class="prettyprint">
&#123;% include "web/path/to/_feedback/1.html" %}
</pre>

Path must always start with relative reference to `web/`. This
is just how the `include` tag works.

Other stuff:

* The widget is hard-coded (and styled) to expect a success /
  fail scenario. It won't make sense in other contexts.
* Can be used more than once on a doc!
* Doesn't work on Web Fundamentals' local development
  server, because that server is just an approximation of
  DevSite's real capabilities. You'll see all of the variables
  printed on the page.

### Viewing data

Note: only relevant to users who have access to Web Fundamentals'
analytics data.

See Google Analytics > Behavior > Events. When the user clicks "fail",
a value of 0 is sent for this label. When user clicks "success", a value
of 1 is sent. So, a value of 1 means that users are always clicking your
"success" button.
