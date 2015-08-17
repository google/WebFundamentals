---
layout: shared/plain
title: "Custom Jekyll Variables"
description: "This is a list of custom variables injected into the Jekyll page that can be used to structure your page
and the links through Web Fundamentals"
order: 2
---

# page.context

The page context is essentially a representation of the file structure of
web fundamentals except it is a cut down version, meaning you can only
access the sibling pages, the parent index page and any subdirectories
from the current page down.

You can view the content of the object for a page with:

{% highlight text %}
    {% raw %}{{page.context}}{% endraw %}
{% endhighlight %}

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
    This is a list of subdirectories from the current directory. This is a
    hash map where the key is the directory name and the value is the same
    structure as page.context (i.e. a subdirectory has id, index, pages
    and subdirectories variables).

The current pages context is:

{% highlight text %}
    {{page.context}}
{% endhighlight %}

To display all the pages title you can use liquid like so:

{% highlight text %}
{% raw %}
<ol>
  {% for page in page.context.pages %}
    <li>
    {{page.title}}
    </li>
  {% endfor %}
</ol>
{% endraw %}
{% endhighlight %}


<ol>
  {% for page in page.context.pages %}
    <li>
    {{page.title}}
    </li>
  {% endfor %}
</ol>

To display titles for all the subdirectories you could do something
like the following, which iterates over each key, value pair ub the
subdirectories hash and use the value (hence the `subdirectory[1]`) to
get the index page for that directory and display the title.


{% highlight text %}
{% raw %}
<ol>
  {% for subdirectory in page.context.subdirectories %}
    <li>
    {{subdirectory[1].index.title}}
    </li>
  {% endfor %}
</ol>
{% endraw %}
{% endhighlight %}

# page.nextPage & page.previousPage

Some sections are written with a particular reading order in mind. If this is
the case you may want to reference the next and previous page which you can
do with the nextPage and previousPage variables.

This code:

{% highlight text %}
{% raw %}
{{page.nextPage}}
{% endraw %}
{% endhighlight %}

{% highlight text %}
{% raw %}
{{page.prevPage}}
{% endraw %}
{% endhighlight %}

Will output the following (Note: you may see 0, 1 or 2 snippets depending
  on whether or not this page has a next and / or previous page):

{% highlight text %}
{{page.nextPage}}
{% endhighlight %}


{% highlight text %}
{{page.prevPage}}
{% endhighlight %}

# URLs

Jekyll provides the good old fashioned `page.url` variable, however Web
Fundamentals does some funky stuff to the structure of pages and docs, so
for this reason you should use one of the following

For this page, the Jekyll URL is:

{% highlight text %}
{{page.url}}
{% endhighlight %}

## page.canonical_url

Canonical URL has some filtering done on it to become a canonical url and
will always be the full path.

{% highlight text %}
{% raw %}
{{page.canonical_url}}
{% endraw %}
{% endhighlight %}

{% highlight text %}
{{page.canonical_url}}
{% endhighlight %}

## page.relative_url

The relative url is the relative url for a page from the root of the domain

{% highlight text %}
{% raw %}
{{page.relative_url}}
{% endraw %}
{% endhighlight %}

{% highlight text %}
{{page.relative_url}}
{% endhighlight %}
