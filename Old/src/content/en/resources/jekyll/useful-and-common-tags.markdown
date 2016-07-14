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
      href: fundamentals/design-and-ui/responsive/fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "Responsive Web design"
        href: fundamentals/design-and-ui/responsive/
    -
      title: Layout patterns
      href: fundamentals/design-and-ui/responsive/patterns/
      section:
        id: rwd-patterns
        title: "Layout Patterns"
        href: fundamentals/design-and-ui/responsive/patterns/
    -
      title: Mostly Fluid layout
      href: fundamentals/design-and-ui/responsive/patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "Responsive Web design"
        href: fundamentals/design-and-ui/responsive/patterns/mostly-fluid
---

## Table of Contents

This publishes a table of contents for the current page

<pre>&#123;% include shared/toc.liquid %&#125;</pre>

{% include shared/toc.liquid %}

## Takeaways

The takeaway include is used to highlight important parts of a doc

<pre>&#123;% include shared/takeaway.liquid list=page.key-takeaways.example %&#125;</pre>

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

<pre>&#123;% include shared/remember.liquid list=page.notes.example %&#125;</pre>

{% include shared/remember.liquid list=page.notes.example %}

or

<pre>&#123;% include shared/note.liquid list=page.notes.example %&#125;</pre>

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

<pre>&#123;% include shared/related_guides.liquid list=page.related-guides.example %&#125;</pre>

{% include shared/related_guides.liquid list=page.related-guides.example %}

{% comment %}
// This should be enabled but needs a different css file that contains these styles
## Subscribe List

<pre>&#123;% include shows/subscribe.liquid %&#125;</pre>

{% include shows/subscribe.liquid %}
{% endcomment %}

## Highlight

The highlight tag will simply run the code inside the tag through Pygments, a
code highlighter.

### Example

<pre>&#123;% highlight javascript %&#125;
if (navigator.onLine) {
  console.log('ONLINE!');
} else {
  console.log('Connection flaky');
}
&#123;% endhighlight %&#125;</pre>

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
