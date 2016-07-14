---
layout: shared/narrow
title: "Custom Jekyll Variables"
description: "This is a list of custom variables injected into the Jekyll page that can be used to structure your page and the links through Web Fundamentals"
order: 4
---

# page.context

The page context is essentially a representation of the file structure of
web fundamentals except it is a cut down version, meaning you can only
access the sibling pages, the parent index page and any subdirectories
from the current page down.

You can view the content of the object for a page with:

<pre>
&#123;&#123;page.context&#125;&#125;
</pre>

## Structure of page.context

The page.context is essentially a directory in web fundamentals, it has the
following variables:

- id
    This is the name of the directory
- index
    This is the index page for the directory
- pages
    This is the list of pages inside this directory (Excluding the index)
- subdirectories
    This is an array of subdirectories from the current directory. Each
    subdirectory has the same structure as page.context (i.e. a subdirectory
    has an id, index, pages and subdirectories variable).

The current pages context is:

{% highlight text %}
    {{page.context}}
{% endhighlight %}

To display all the pages title you can use liquid like so:

<pre>
&lt;ol&gt;
&#123;% for page in page.context.pages %&#125;
  &lt;li&gt;
    &#123;&#123;page.title&#125;&#125;
    &lt;/li&gt;
  &#123;% endfor %&#125;
&lt;/ol&gt;
</pre>

<ol>
  {% for page in page.context.pages %}
    <li>
    {{page.title}}
    </li>
  {% endfor %}
</ol>

To display titles for all the subdirectories you could do something
like the following:

<pre>
&lt;ol&gt;
  &#123;% for subdirectory in page.context.subdirectories %&#125;
    &lt;li&gt;
    &#123;&#123;subdirectory.index.title&#125;&#125;
    &lt;/li&gt;
  &#123;% endfor %&#125;
&lt;/ol&gt;
</pre>

# page.nextPage & page.previousPage

Some sections are written with a particular reading order in mind. If this is
the case you may want to reference the next and previous page which you can
do with the nextPage and previousPage variables.

This code:

&#123;&#123;page.nextPage&#125;&#125;

&#123;&#123;page.previousPage&#125;&#125;

Will output the following (Note: you may see 0, 1 or 2 snippets depending
  on whether or not this page has a next and / or previous page):

{% highlight text %}
{{page.nextPage}}
{% endhighlight %}


{% highlight text %}
{{page.previousPage}}
{% endhighlight %}

# URLs (DO NOT USE .url)

Jekyll provides the `page.url` variable, however this isn't useful for Web
Fundamentals due to the structure of pages and docs.

For example, this page has a Jekyll URL of:

{% highlight text %}
{{page.url}}
{% endhighlight %}

Notice how there is no /web/ at the beginning of it? Instead of `page.url`,
use `page.canonical_url` or `page.relative_url`. The big advantage of this
is that it will also account for language of the current page.

## page.canonical_url

Canonical URL has some filtering done on it to become a canonical url and
will always be the full path.

<pre>
&#123;&#123;page.canonical_url&#125;&#125;
</pre>

{% highlight text %}
{{page.canonical_url}}
{% endhighlight %}

## page.relative_url

The relative url is the relative url for a page from the root of the domain

<pre>
&#123;&#123;page.relative_url&#125;&#125;
</pre>

{% highlight text %}
{{page.relative_url}}
{% endhighlight %}

## page.outOfDate

This variable is defined for every page and will be true if a translation is
no longer up to date with the primary language version, otherwise its false.

<pre>
&#123;&#123;page.outOfDate&#125;&#125;
</pre>
