project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Much of the web isn't optimized for those multi-device experiences. Learn the fundamentals to get your site working on mobile, desktop or anything else with a screen.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2014-04-29 #}

# Responsive web design basics {: .page-title }

{% include "_shared/contributors/petelepage.html" %}

The use of mobile devices to surf the web is growing at an astronomical pace, but unfortunately much of the web isn't optimized for those mobile devices. Mobile devices are often constrained by display size and require a different approach to how content is laid out on screen.

There is a multitude of different screen sizes across phones, "phablets",
tablets, desktops, game consoles, TVs, even wearables.  Screen sizes will always
be changing, so it's important that your site can adapt to any screen size,
today or in the future.

{% comment %}
{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}
{% endcomment %}

Responsive web design, originally defined by [Ethan Marcotte in A List
Apart](http://alistapart.com/article/responsive-web-design/) responds to the
needs of the users and the devices they're using.  The layout changes based on
the size and capabilities of the device.  For example, on a phone, users would
see content shown in a single column view; a tablet might show the same content
in two columns.
