---
layout: shared/narrow
title: "Design content to work well across different viewport sizes"
description: "Great designers don't 'optimize for mobile' — they think responsively to build sites that work across a range of devices. The structure of text and other page content is critical to cross-device success."
published_on: 2014-04-26
updated_on: 2015-04-26
authors:
  - samdutton
translation_priority: 1
---

<p class="intro">"Create a product, don't re-imagine one for small screens. Great mobile products are created, never ported."
— [Mobile Design and Development](https://goo.gl/KBAXj0), Brian Fling</p>

{% include shared/toc.liquid %}

Great designers don't "optimize for mobile" — they think responsively to build sites that work across a range of devices. The structure of text and other page content is critical to cross-device success.

Many of the next billion users coming online will use low-cost devices with small viewports. Reading on a low resolution 3.5" or 4" screen can be hard work. Here is an actual-size screenshot from a typical low cost mobile phone.

![image](images/screenshot-low-cost.png)

Compare that with a high end phone.

![image](images/screenshot-high-end.png)

Here is a photograph of the two together.

![Photo comparing display of blog post on high end and low-cost smartphones](images/devices-photo.jpg)

On the smaller screen the browser renders the layout correctly, but the text is unreadable, even when zoomed in. The display is blurry and has a 'color cast' — white doesn't look white — making content less legible.

When building a site or app for a range of viewports, consider content as well as layout and graphic design:

* [Embrace minimalist writing](#heading=h.9bm8zap1h8zu).
* [Design with real text and images, not dummy content](http://uxmyths.com/post/718187422/myth-you-dont-need-the-content-to-design-a-website).

   * "Content precedes design. Design in the absence of content is not design, it’s decoration."
      — Jeffrey Zeldman
   * "Text is a UI."
      — Jakob Nielsen

* [Eliminate unnecessary images](#heading=h.ugdjynu1mx) and other redundant content.
* [Users tend to read web pages in an F-shaped pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/), so put your most important content at the top.
* Users visit your site to achieve a goal. Ask yourself what they need to achieve that goal and get rid of everything else. Get tough on visual and textual embellishments, legacy content, excessive links, and other clutter.
* Be careful with social sharing icons; they clutter layouts and the code for them can slow down page loading.
* Design [responsive layouts](https://developers.google.com/web/fundamentals/design-and-ui/responsive/?hl=en) for content, not fixed device sizes.

Above all — **test**!

* Use Chrome DevTools and other emulation tools to check readability on smaller viewports.
* [Test with low bandwidth and high latency](https://docs.google.com/document/d/1IoethlCWzjTKY1A1JIMNl7KI8mBtOvpQ4TkhU9FhDUU/edit#heading=h.kdb8454jukab); try out content in a variety of connectivity scenarios.
* Try out your site or app on a low-cost phone.
* Ask friends and colleagues to try out your work.
* Build a simple device test lab. The [GitHub repo](https://github.com/GoogleChrome/MiniMobileDeviceLab) for Google's Mini Mobile Device Lab has instructions on how to build your own. [OpenSTF](https://github.com/openstf/stf) is a simple web application for testing websites on multiple Android devices.

![OpenSTF interface](images/stf.png)
