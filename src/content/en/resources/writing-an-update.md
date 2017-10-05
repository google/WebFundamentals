project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: This is the page description placed in the head.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-13 #}

# Writing an Update or Case Study {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Updates and Case Studies use the same [styles and markdown](markdown-syntax) as
[articles](writing-an-article), but have a few extra attributes that you can
use to change how they're shown in different places across the site. You'll
also need to [build the related](#build-related) files, like the listing
page, feeds, `book.yaml` and the tags pages using `gulp`.

## Quick Start

To get started quickly, copy the template and start there.

1. Make a copy of the template ([showcase](https://github.com/google/WebFundamentals/blob/master/src/templates/showcase/_template.md) or [update](https://github.com/google/WebFundamentals/blob/master/src/templates/updates/_template.md)), and place it in the appropriate directory.
1. Update the key fields:
    * `book_path`
    * `description`
    * `wf_updated_on` & `wf_published_on` use the format YYYY-MM-DD (2016-12-31)
    * `wf_featured_image` & `wf_featured_snippet`
    * Update the contributor include
1. Run `gulp build` to get it listed in the listing pages and table of contents
1. Write/iterate on the update or showcase
1. Before submitting the pull request, run `gulp test` to verify everything is happy
1. Submit your PR with the appropriate changes.

## YAML Front Matter & Special Attributes

Refer to the [YAML Front Matter](writing-an-article#yaml_front_matter) section for
full details on the required YAML front matter.

Note: You cannot include HTML in the description attribute. If you'd like to
include HTML in the snippet, also provide a `wf_featured_snippet`.

### Tags

To make it easier to find or group posts, [/web/updates/](/web/updates/)
supports tagging posts. Simply add a wf_tags block with a comma separated list
of tags.

<pre class="prettyprint">
&#123;# wf_tags: devtools,geolocation,gulp,getusermedia #}
</pre>

Note: Check the list of [common
tags](https://github.com/google/WebFundamentals/blob/master/src/data/commonTags.json)
and use whenever possible. If you use a tag that's not in that list, the build
process will throw a warning.

### Featured Image

To specify a featured image used on listing pages and within the feeds, add a
`wf_featured_image` tag. To ensure this works in feeds, the URL provided should
be an absolute page on DevSite.

<pre class="prettyprint">
&#123;# wf_featured_image: /web/updates/images/weird.jpg #}
</pre>

Images should be 2x1, ideally 1000px by 500px.

**Looking for a generic image?** Check out the [generic images](https://github.com/google/WebFundamentals/tree/master/src/content/en/updates/images/generic) folder.

### Featured Snippet

The featured snippet is used as the snippet for listing pages. If it is not
provided, we'll try to use the description. The snippet is not limited by
length, and **can** include HTML.

<pre class="prettyprint">
&#123;# wf_featured_snippet: Use &lt;kbd class='kbd'>Cmd + ]&lt;/kbd>... #}
</pre>

### Comment Blocks

Comment blocks are not automatically added to update pages. To allow users to
comment on your documentation, you must the comment widget to the bottom of the
page. For example:

<pre class="prettyprint">
&#123;% include "comment-widget.html" %}
</pre>

Note: the comment widget does **not** render in the staging or development
environment, and will only be visible when the page is published on DevSite.

## Generating related files {: #build-related }

Once you've created your update, you'll need to generate the related files,
like the listing page, update the `_book.yaml`, etc. To do that, run:

    gulp build
