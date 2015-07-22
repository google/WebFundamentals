---
layout: default
title: "Markdown Guide"
description: "Markdown guide and syntax used for this site."
class: "page--styleguide"
learning-list:
  - Lorem ipsum dolor sit amet
  - Fugit itaque sapiente earum quo expedita
  - labore aliquam cupiditate veritatis nihil
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 3
collection: resources
key-takeaways:
  use-keytakeaway:
    - It is pretty simple to add in a key takeaway
remember:
  use-remember:
    - It is pretty simple to add in a remember
related:
  related-content:
    - <a href="index.html">Style Guide</a>
    - <a href="../example-article/">Example Article</a>
---
{% comment %}
NOTE: This is our styleguide
{% endcomment %}

{% wrap content %}

{% include modules/breadcrumbs.liquid %}

# {{ page.title }}

{% include modules/toc.liquid %}

## Headings

Styles for Headings

# #h1 heading

## ##h2 heading

### ###h3 heading

#### ####h4 heading

##### #####h5 heading

## Code

Styles for how to include code into the documents.

### Inline code with no sample

  {{ "&#123;% highlight html %&#125;" }}

    <html>
        <head>
          <title>Hello World</title>
        </head>
    </html>

  {{ "&#123;% endhighlight %&#125;" }}

{% highlight html %}
<html>
  <head>
    <title>Hello World</title>
  </head>
</html>
{% endhighlight %}

### Include Javascript

  {{ "&#123;% include_code _code/test.js testjs javascript %&#125;" }}

{% include_code _code/test.js somejs javascript %}


### Include HTML

  {{ "&#123;% include_code _code/test.html testhtml html %&#125;" }}

{% include_code _code/test.html somehtml html %}


### Include CSS

  {{ "&#123;% include_code _code/test.css testcss css %&#125;" }}

{% include_code _code/test.css somecss css %}

### Link to sample

  {{ "&#123;% link_sample _code/test.html %&#125;See sample&#123;% endlink_sample %&#125;" }}

{% link_sample _code/test.html %}See sample{% endlink_sample %}

## Callouts

Using Callouts in your doc is easy.

### Key takeaway

    {{ "{% include modules/takeaway.liquid" }}
    	list=page.key-takeaways.use-keytakeaway %}

In your Article YAML Preamble

    key-takeaways:
	  use-keytakeaway:
	    - It is pretty simple to add in a key takeaway

{% include modules/takeaway.liquid list=page.key-takeaways.use-keytakeaway %}

### Remember

    {{ "{% include modules/remember.liquid" }}
    	list=page.remember.use-remember %}

In your Article YAML Preamble

    remember:
	  use-remember:
	    - It is pretty simple to add in a remember

{% include modules/remember.liquid list=page.remember.use-remember %}


### Related Content

    {{ "{% include modules/related.liquid" }}
      list=page.related.related-content %}

In your Article YAML Preamble

{% highlight yaml %}
related:
  related-content:
    - <a href="index.html">Style Guide</a>
    - <a href="../example-article/">Example Article</a>
{% endhighlight %}

{% include modules/related.liquid list=page.related.related-content %}

{% endwrap %}
