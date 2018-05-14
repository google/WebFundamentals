project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: This is the page description placed in the head.

{# wf_updated_on: 2017-09-20 #}
{# wf_published_on: 2016-09-13 #}

# Markdown syntax {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Web**Fundamental** provides a wide variety of styled elements and CSS
classes to use in documentation. Although you may supplement these styles with
custom CSS, you should only use custom CSS when strictly necessary. If you
find that you need to create a new style that will apply to more than a
single page, please file an issue on GitHub so that other pages can use it 
as well. This ensures site-wide consistency.

Note: This document is meant to supplement the [Google's developer
documentation style guide](/style/). If there are differences, the
official style guide takes precedence unless otherwise specified. 

## Headings 

The top-most heading of the page is the page's title. The page body must not
contain another level 1 heading, to avoid confusing non-visual browsers.

**When should I capitalize headings?**

Use [sentence case](/style/capitalization#capitalization-in-titles-and-headings),
for **all** titles, and section headings.

Yes, we're inconsistent about this, but we're trying to fix it, please do your
best to adhere to these guidelines.

## Heading 2 {: #heading-what-what }

Caution: If you plan to link to specific headings
[&lt;`a href="#heading-what-what"`&gt;](#heading-what-what) within your document,
it is **strongly** recommended you define them yourself with the 
`{: #anchor-name }` syntax. This ensures that when documents are localized,
the anchor will still work, but also ensures that any difference between 
Markdown processors are a non-issue.

### Heading 3

DevSite will automatically add `<h2>` and `<h3>` elements
to the table of contents. To keep one from being added (like these two here,
which do not appear in the table of contents), apply `class="hide-from-toc"`.
You can also put an `<h2>` or `<h3>` inside a table header (`<th>`) to force
the table into the table of contents. Inside a table header, `<h2>` and `<h3>`
are styled like regular text, so readers won't be able to tell.

#### Heading 4

##### Heading 5

###### Heading 6

    ## Heading 2
    ### Heading 3
    #### Heading 4
    ##### Heading 5
    ###### Heading 6


## Sample code

If your contribution contains code, please make sure that it follows the 
[Google coding style guide for JavaScript](https://google.github.io/styleguide/javascriptguide.xml).
Otherwise, we will have to ask you to make changes, and that's no fun for anyone.

### Inline code

To indicate a span of code, wrap it with backtick quotes (\`). Unlike a
pre-formatted code block, a code span indicates code within a normal paragraph.
For example:

    Use the `printf()` function.
    
Will result in:

Use the `printf()` function.

### Code blocks

To produce a code block in Markdown, simply indent every line of the block by
at least 4 spaces or 1 tab. For example, given this input:

    Here is an example of AppleScript:

        tell application "Foo"
            beep
        end tell

will result in:

Here is an example of AppleScript:

    tell application "Foo"
        beep
    end tell

Within a code block, ampersands (`&`) and angle brackets (`<` and `>`) are
automatically converted into HTML entities. This makes it very easy to include
example HTML source code using Markdown -- just paste it and indent it, and
Markdown will handle the hassle of encoding the ampersands and angle brackets.

Warning: Wrapping code blocks in `&amp;&lt;&gt;` is not supported on
DevSite. DevSite will not automatically style these blocks and our integration
tests will fail.


### Highlighting

Use `<strong>` to call attention to content within a `<pre>` block. Doing so
will lighten the surrounding content to emphasize the section highlighted by
the `<strong>` block. For example:

<pre class="prettyprint">
// ...
// ...
// ...
for (i = 0; i < 10; i++) {
    printf("Counting %d\n", i);

    <strong>if (i % 3 == 0) {
        someFunc(i);
    }</strong>
}
// ...
// ...
// ...
</pre>

    <pre class="prettyprint">
    // ...
    // ...
    // ...
    for (i = 0; i < 10; i++) {
        printf("Counting %d\n", i);

        <strong>if (i % 3 == 0) {
            someFunc(i);
        }</strong>
    }
    // ...
    // ...
    // ...
    </pre>


### Click to copy

Click to copy is automatically enabled for all code blocks.



### Special Case: Templates -  &#123;&#123;}}

If you need to include templates in your code samples, be sure to escape them.

For example:
<pre class="prettyprint">
&lt;pre class="prettyprint">
&amp;lt;polymer-media-query query="max-width:640px" queryMatches="&amp;#123;{isPhone}}">
&lt;/pre>
</pre>

If it's inline, you'll need to wrap it in a `<code>` block instead of backticks.
<pre class="prettyprint">
* Declarative two-way data-binding: &lt;code>&lt;input id="input" value="&amp;#123;{foo}}">&lt;/code>
</pre>

## Images

When adding a caption, wrap images in `<figure>` blocks, and ideally, use
responsive images with the `scrset` attribute when possible. Be sure you
include `alt` attributes for your images as well.

<figure>
  <img src="https://placehold.it/350x150" alt="sample image">
  <figcaption>This caption should be used to describe the image.</figcaption>
</figure>

For example:

    <figure>
      <img src="https://placehold.it/350x150" alt="sample image">
      <figcaption>This caption should be used to describe the image.</figcaption>
    </figure>

Note: Optimized images are served automatically only for `index.yaml` pages, 
simply provide a 2x version, and the server will do the rest.

You can apply `class="screenshot"` to an image to give it a border that
offsets it from nearby text. This is typically used for screenshots that have
white backgrounds and otherwise get lost on the page. Don't use it for images
that don't need it.

### Floating images on the right

<div class="attempt-right">
  <figure>
    <img src="https://placehold.it/350x150" alt="Alert dialog">
    <figcaption><b>Figure 1</b>: Alert dialog</figcaption>
  </figure>
</div>

The image at right also has `class="attempt-right"`, which floats the image
right on larger screens, but forces the image into vertical layout on smaller
screens, tablets and smaller, where floating right would cause problems. Also
available is `class="attempt-left"`. To use `attempt-left` and `attempt-right`
together, make sure the `attempt-left` element comes first.

<div class="clearfix"></div>

    <div class="attempt-right">
      <figure>
        <img src="https://placehold.it/350x150" alt="Alert dialog">
        <figcaption><b>Figure 1</b>: Alert dialog</figcaption>
      </figure>
    </div>

Caution: When using `attempt-left` and `attempt-right`, it may be necessary to include a `<div class="clearfix"></div>` block.

### Do and do not images

Add the class `success` or `warning` to the figure caption
to indicate a good or bad example.


<div class="attempt-left">
  <figure>
    <img src="https://placehold.it/350x150" alt="Alert dialog">
    <figcaption class="success">
      <b>DO</b>: This is the right thing to do
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="https://placehold.it/350x150" alt="Alert dialog">
    <figcaption class="warning">
      <b>DON'T</b>: This is the wrong thing to do
     </figcaption>
  </figure>
</div>

<div class="clearfix"></div>

    <div class="attempt-left">
      <figure>
        <img src="https://placehold.it/350x150" alt="Alert dialog">
        <figcaption class="success">
          <b>DO</b>: This is the right thing to do
         </figcaption>
      </figure>
    </div>
    <div class="attempt-right">
      <figure>
        <img src="https://placehold.it/350x150" alt="Alert dialog">
        <figcaption class="warning">
          <b>DON'T</b>: This is the wrong thing to do
         </figcaption>
      </figure>
    </div>


## Callouts

Note: This type of callout is an ordinary note or tip.


Caution: This type of callout suggests proceeding with caution.


Warning: This type of callout is stronger than a Caution; it means "Don't do this."


Success: This type of callout describes a successful action or an error-free status. Used only in interactive or dynamic content; don't use in ordinary static pages.


Key Point: This type of callout defines an important concept.


Key Term: This type of callout defines important terminology.


Objective: This type of callout defines the goal of a procedure.


Dogfood: This type of callout is for notes that apply temporarily during internal dogfood testing. Remove all Dogfood callouts before making a document publicly visible.


## Comparisons

<p><span class="compare-worse">Not recommended</span> — indent with tabs</p>
<pre class="prettyprint">(bad sample code)</pre>

<p><span class="compare-better">Recommended</span> — indent with spaces</p>
<pre class="prettyprint">(good sample code)</pre>

<p><span class="compare-no">Not allowed</span> — indent with spaces</p>
<pre class="prettyprint">(very bad sample code)</pre>

## Lists

### Unordered

* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    * Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    * Lorem ipsum dolor sit amet, consectetur adipiscing elit.
* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    * Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        * Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        * Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    * Lorem ipsum dolor sit amet, consectetur adipiscing elit.
* Lorem ipsum dolor sit amet, consectetur adipiscing elit.


### Ordered

1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
4. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
5. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
6. Lorem ipsum dolor sit amet, consectetur adipiscing elit.


## Tables

Tables are supported with standard markup. Here's a typical table with a
heading row, several regular rows, and a row marked up as `<tr class="alt">`,
which produces a darker background that can be used as an alternate header.

<table>
  <tr><th>One</th><th>Two</th><th>Three</th></tr>
  <tr><td>1.0</td><td>2.0</td><td>3.0</td></tr>
  <tr><td>1.1</td><td>2.1</td><td>3.1</td></tr>
  <tr class="alt"><td colspan="3">Here come some numbers that end in .2!</td></tr>
  <tr><td>1.2</td><td>2.2</td><td>3.2</td></tr>
</table>

    <table>
      <tr><th>One</th><th>Two</th><th>Three</th></tr>
      <tr><td>1.0</td><td>2.0</td><td>3.0</td></tr>
      <tr><td>1.1</td><td>2.1</td><td>3.1</td></tr>
      <tr class="alt"><td colspan="3">Here come some numbers that end in .2!</td></tr>
      <tr><td>1.2</td><td>2.2</td><td>3.2</td></tr>
    </table>

### Responsive tables

To make a table responsive, add the `responsive` class to the table.

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2>Parameters</th>
    </tr>
    <tr>
      <td><code>value</code></td><td><code>String</code><br>the choice's value, which respondents see as a label when viewing the form</td>
    </tr>
    <tr>
      <td><code>navigationType</code></td><td><code><a href="#">PageNavigationType</a></code><br>the choice's navigation type</td>
    </tr>
  </tbody>
</table>

* There must be ***only two columns*** in the table: the first column for the things being defined (the key), and the second column for all information about that key, in multiple lines if necessary. This two-column restriction means that responsive tables cannot be used for truly two-dimensional tabular data, checkmark-based feature comparison, but they are well suited for reference information (or anything other data that could reasonably be expressed by a definition list instead of a table).
* If there are multiple lines of information about the key — say, a type and a description — wrap each line in `<p>` to force line breaks (instead of `<br>`).
* There must be only one cell in the header row. Use `<th colspan="2">` to force it to span both columns. To remind you of this behavior, we automatically hides any `<th>` after the first (which intentionally looks very broken).


<div class="clearfix"></div>


    <table class="responsive">
      <tbody>
        <tr>
          <th colspan=2>Parameters</th>
        </tr>
        <tr>
          <td>
            <code>value</code>
          </td>
          <td>
            <code>String</code><br>
            the choice's value, which respondents see as a label when viewing the form
          </td>
        </tr>
        <tr>
          <td>
            <code>navigationType</code>
          </td>
          <td>
            <code>
              <a href="#">PageNavigationType</a>
            </code>
            <br>the choice's navigation type
          </td>
        </tr>
      </tbody>
    </table>



### Invisible tables

You can arrange text in columns, or otherwise make a table invisible, using
`<table class="columns">...</table>`. This is typically used for arranging
long narrow lists.

<table class="columns">
  <tr>
    <td>
      <code>auto</code><br />
      <code>break</code><br />
      <code>case</code><br />
      <code>char</code>
    </td>
    <td>
      <code>const</code><br />
      <code>continue</code><br />
      <code>default</code><br />
      <code>do</code>
    </td>
    <td>
      <code>double</code><br />
      <code>else</code><br />
      <code>enum</code><br />
      <code>extern</code>
    </td>
  </tr>
</table>

    <table class="columns">
      <tr>
        <td>
          <code>auto</code><br />
          <code>break</code><br />
          <code>case</code><br />
          <code>char</code>
        </td>
        <td>
          <code>const</code><br />
          <code>continue</code><br />
          <code>default</code><br />
          <code>do</code>
        </td>
        <td>
          <code>double</code><br />
          <code>else</code><br />
          <code>enum</code><br />
          <code>extern</code>
        </td>
      </tr>
    </table>


## External links

To mark a link as external, use
`<a href="https://www.google.com/" class="external">External Link</a>` when
authoring in HTML, or append `{: .external}` to links when authoring in
Markdown.

<a href="https://www.google.com/" class="external">External Link</a>



## Custom attributes and named anchors 

Markdown supports custom markup attributes for block level HTML elements and
headers.

The format for this allows for a custom class, a custom ID, and/or custom
attribute/value pairs in the same statement:

    This is a paragraph.
    {: .customClass #custom_id attribute='value' }

This generates this HTML:

    <p class="customClass" id="custom_id" attribute="value">This is a paragraph.</p>

### Custom attributes on headers

As headers can only be defined in one line, the attributes list should be
defined at the end of the header definition:

    ## Header with custom ID {: #custom_id }

Generates:

    <h2 id="custom_id">Header with custom ID</h2>

## Block quote

    > Lorem ipsum dolor sit amet, consectetur adipiscing elit.


> Lorem ipsum dolor sit amet, consectetur adipiscing elit.






## Tooltips

Any element that has a `title` attribute will show a tooltip (with the value
of the attribute) on mouseover. For example: "...someday screen
<abbr title="pixels per inch">PPI</abbr> may increase further..."
(note that the dotted underline comes from the abbr element, not the tooltip).


    ...someday screen <abbr title="pixels per inch">PPI</abbr> may increase further...

Warning: Be sure to use tooltips only for supplemental information—not essential text or primary user-experience features—since the presence of tooltips is not obvious and users on mobile devices will not see them at all.


## Miscellaneous classes

Use `class="inline"`, `class="inline-block"`, and `class="block"` to force
inline, inline-block, or block layout, in the rare cases when it is necessary.

Use `class="clearfix"` to clear a floated element, for example after using
`attempt-left` or `attempt-right`.

## Comments

A one-line comment and a multi-line comment have different syntax. Both are
removed from the web pages that are produced when staging or publishing.

### One line comments
A one-line comment. Hash characters (#) used like this are reserved only for
one-line comments.

<pre class="prettyprint">
&#123;# Time travel is fun #}
</pre>

### Multi-line comments
A multi-line comment, with start and end tags surrounding the comment.

<pre class="prettyprint">
&#123;% comment %}
Time travel is fun.
I do it literally all the time.
&#123;% endcomment %}
</pre>
