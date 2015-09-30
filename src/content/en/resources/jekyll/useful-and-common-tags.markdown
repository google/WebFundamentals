---
layout: shared/narrow
title: "Useful and Common Tags"
description: "This is a list of tags that should be useful or are commonly used."
order: 3
key-takeaways:
  example:
    - "Always use a viewport."
    - "Always start with a narrow viewport first and scale out."
    - "Base your breakpoints off when you need to adapt the content."
    - "Create a high-level vision of your layout across major breakpoints."
notes:
  example:
    - "Oh look, there's an example of a note here."
related-guides:
  example:
    -
      title: Using Media Queries
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "Responsive Web design"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
    -
      title: Layout patterns
      href: fundamentals/layouts/rwd-patterns/
      section:
        id: rwd-patterns
        title: "Layout Patterns"
        href: fundamentals/layouts/rwd-patterns/
    -
      title: Mostly Fluid layout
      href: fundamentals/layouts/rwd-patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "Responsive Web design"
        href: fundamentals/layouts/rwd-patterns/mostly-fluid
---

## Table of Contents

This publishes a table of contents for the current page

<pre>{% raw %}{% include shared/toc.liquid %}{% endraw %}</pre>

{% include shared/toc.liquid %}

## Takeaways

The takeaway include is used to highlight important parts of a doc

<pre>{% raw %}{% include shared/takeaway.liquid list=page.key-takeaways.example %}{% endraw %}</pre>

{% include shared/takeaway.liquid list=page.key-takeaways.example %}

You can define what is printed by adding varaibles to the YAML of the page like so:

{% highlight text %}
key-takeaways:
  example:
    - "Always use a viewport."
    - "Always start with a narrow viewport first and scale out."
    - "Base your breakpoints off when you need to adapt the content."
    - "Create a high-level vision of your layout across major breakpoints."
{% endhighlight %}

## Notes and Remembers

<pre>{% raw %}{% include shared/remember.liquid list=page.notes.example %}{% endraw %}</pre>

{% include shared/remember.liquid list=page.notes.example %}

or

<pre>{% raw %}{% include shared/note.liquid list=page.notes.example %}{% endraw %}</pre>

{% include shared/note.liquid list=page.notes.example %}

You can define what is printed by adding varaibles to the YAML of the page like so:

{% highlight text %}
notes:
  example:
    - "Always use a viewport."
    - "Always start with a narrow viewport first and scale out."
    - "Base your breakpoints off when you need to adapt the content."
    - "Create a high-level vision of your layout across major breakpoints."
{% endhighlight %}


## Related Guides

<pre>{% raw %}{% include shared/related_guides.liquid list=page.related-guides.example %}{% endraw %}</pre>

{% include shared/related_guides.liquid list=page.related-guides.example %}

## Highlight

The highlight tag will simply run the code inside the tag through Pygments, a
code highlighter.

### Example

<pre>{% raw %}
{% highlight javascript %}
if (navigator.onLine) {
  console.log('ONLINE!');
} else {
  console.log('Connection flaky');
}
{% endhighlight %}
{% endraw %}</pre>

{% highlight javascript %}
if (navigator.onLine) {
  console.log('ONLINE!');
} else {
  console.log('Connection flaky');
}
{% endhighlight %}

#### Supported Language Inputs

- text
- javascript
- html
- css
- http
- bash
