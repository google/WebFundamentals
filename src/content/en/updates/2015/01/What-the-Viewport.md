project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The virtual viewport seperates layout and viewing of the viewport.

{# wf_updated_on: 2015-01-19 #}
{# wf_published_on: 2015-01-19 #}
{# wf_tags: news,virtualviewport #}

# What the Virtual Viewport? {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}



In [Chrome M40](https://code.google.com/p/chromium/issues/detail?id=148816)
there is a change to the viewport that is pretty subtle, but should make a big
difference to users.

When mobile browsers started out, the lack of a viewport meta tag meant they would make the web page think it had
approximately 980px of screen real estate and render at this size. With a viewport meta
tag, developers could define the width, most common of which is "device-width", which sets the screen size to that of the device. You can [learn more on Web
Fundamentals](/web/fundamentals/design-and-ux/responsive/#set-the-viewport).

The way [Rick Byers](https://plus.google.com/+RickByers/about) describes the virtual viewport is
as follows: the idea of the virtual viewport is to split the notion of "the
viewport" into two, "the layout viewport" (where fixed position items are attached)
and "the visual viewport" (What the users actually see).

## **Super Simple Example**

The website videojs.com is a good example because it's appbar is fixed to the
top and has links on both the left and right side of the appbar.  

The image below shows what you would see if you zoomed in on a site and tried
panning left and right.  

The top devices are Chrome M39, which doesn't have a virtual viewport
and the bottom 3 are from Chrome M40, which has a virtual viewport.

<p style="text-align: center;">
  <img style="max-width: 100%; height: auto;" src="/web/updates/images/2015-01-19-virtual-viewport/image00.png" alt="pixelated rendering" />
</p>

<p style="text-align: center;">
  <img style="max-width: 100%; height: auto;" src="/web/updates/images/2015-01-19-virtual-viewport/image01.png" alt="pixelated rendering" />
</p>

In Chrome M39, you will see the appbar after you zoom in,
but scrolling to the right doesn't allow you to view the links on the right side
of the bar, you'll only ever see the logo.  

Compare this to Chrome M40 (which has a "virtual viewport") and you'll see that
the "visual viewport" scrolls everything inside the "layout viewport", allowing
you to view the links on the right.

Internet Explorer already has this behaviour and these changes bring us more
closely inline with them.

### html { overflow: hidden; }

The only major developer facing change that comes with this is that in M39, you could apply overflow: hidden to the html element and your page would still scroll, in M40, this is no longer supported, the page will simply not scroll.

### **More Solid Info**

You want to learn more huh?  

Well then, you can view the slide deck below OR check out [Rick's Google+
Post](https://plus.google.com/+RickByers/posts/bpxrWN4G3X5), which you really
should do since he's much better at this stuff than me ;)  

<p style="text-align: center;">
  <iframe src="https://docs.google.com/presentation/embed?id=1nJvJqL2dw5STi5FFpR6tP371vSpDWWs5Beksbfitpzc&amp;start=false&amp;loop=false&amp;" frameborder="0" style="max-width: 600px; width: 100%; height: 400px;"></iframe>
</p>


{% include "comment-widget.html" %}
