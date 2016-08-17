project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Responsive web design patterns are quickly evolving, but there are a handful of established patterns that work well across the desktop and mobile devices

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-04-29 #}

# Tiny tweaks {: .page-title }

{% include "_shared/contributors/petelepage.html" %}

Tiny tweaks simply makes small changes to the layout, such as adjusting font size, resizing images or moving content around in very minor ways.

It works well on single column layouts such as one page linear websites, text
heavy articles.

{% link_sample _code/tiny-tweaks.html %}
  <img src="imgs/tiny-tweaks.svg">
  Try it
{% endlink_sample %}

As its name implies, little changes with this sample as the screen size changes.
As the screen width gets larger, so do the font size and padding.

Sites using this pattern include:

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/patterns/_code/tiny-tweaks.html" region_tag="ttweaks" lang=css %}
</pre>


