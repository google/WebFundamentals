project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: This is the page description placed in the head.

{# wf_updated_on: 2017-12-06 #}
{# wf_published_on: 2016-09-13 #}
{# wf_blink_components: N/A #}

# Writing an Article {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

This is the intro paragraph. It's the equivalent of the old `introduction`
yaml attribute, but instead of living in the YAML front matter, it now lives
in the document.

To write a brand new article, follow these steps. Or simply make a copy of
this markdown file, place it in the directory you want, and edit away.

## YAML Front Matter

All documents need to have a minimum set of YAML front matter including a link
to the `_project.yaml`, and one to the `_book.yaml`.

    project_path: /web/_project.yaml
    book_path: /web/section/_book.yaml

Note: If the path to the project or book cannot be found, the page will not
include the left nav and the upper tabs will not be properly highlighted.

### Description (optional)

You can provide a page description in the YAML front matter that is used as the
`meta` description for the page. The description should be short (<450 char),
and only provide a brief synopsis of the page.

    description: Lorem ipsum

Caution: Do not</span> include &lt;code&gt; blocks (or `) in the description field.

### Other YAML Attributes

See [YAML Front Matter and Attribute Reference](/web/resources/yaml-and-attr-reference)
for all of the YAML Front Matter and other attributes you can or should use.


## Page Title (required)

The page title is defined by the first H1-like tag with the `.page-title` class.
For example:

<pre class="prettyprint">
&num; Writing an Article &#123;: .page-title }
</pre>

Caution: Page titles should not include any markdown or HTML tags.


## Author and Translator Attribution

To include an author or translator attribution, use:

<pre class="prettyprint">
&#123;% include "web/_shared/contributors/petelepage.html" %}
</pre>

## Write Your Content

Next, it's time to add your content. Refer to the [writing style guide](/style/)
and [markdown syntax](markdown-syntax) guide for full details on the
styles you can use and how to go about making stuff look pretty.

## Add Article to the Book

To get your article to appear in the appropriate navigation, you need to update
the `_book.yaml` or `_toc.yaml` file. Each section (updates, shows, fundamentals),
has it's own `_book.yaml` and which links to individual `_toc.yaml` files.
You most likely want to add your article to one of the `_toc.yaml` files.

## Test and Submit Your PR

When you're ready, run `gulp test` to make sure that there are no issues with
your content, then submit your pull request.
