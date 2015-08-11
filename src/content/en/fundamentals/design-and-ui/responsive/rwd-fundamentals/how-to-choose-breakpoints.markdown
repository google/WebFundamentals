---
layout: shared/plain
title: "How to choose breakpoints"
description: "Much of the web isn't optimized for those multi-device experiences. Learn the fundamentals to get your site working on mobile, desktop or anything else with a screen."
introduction: "While it may be helpful to think about defining breakpoints based on device classes, use caution. Defining brand names, or operating systems that are in use today can result in a maintenance nightmare. Instead, the content itself should determine how the layout adjusts to its container."
article:
  written_on: 2014-04-30
  updated_on: 2014-09-12
  order: 4
priority: 0
authors:
  - petelepage
collection: rwd-fundamentals
key-takeaways:
  choose-breakpoints:
    - "Create breakpoints based on content, never on specific devices, products or brands."
    - "Design for the smallest mobile device first, then progressively enhance the experience as more screen real estate becomes available."
    - "Keep lines of text to a maximum of around 70 or 80 characters."
remember:
  use-commas:
    - "Use a comma to separate attributes to ensure older browsers can properly parse the attributes."
---

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.choose-breakpoints %}

## Pick major breakpoints by starting small, then working up

Design the content to fit on a small screen size first, then expand the screen
until a breakpoint becomes necessary.  This will allow you to optimize
breakpoints based on content and maintain the fewest number of breakpoints
possible.

Let's work through the example we saw at the beginning,
the [weather forecast]({{site.fundamentals}}/layouts/rwd-fundamentals/index.html).
The first step is to make the forecast look good on a small screen.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Preview of the weather forecast displayed on a small screen.">
  {% endlink_sample %}
</figure>

Next, resize the browser until there is too much white space between the
elements and the forecast simply doesn't look as good.  The decision is somewhat
subjective, but above 600px is certainly too wide.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Preview of the weather forecast as the page gets wider.">
  {% endlink_sample %}
</figure>

To insert a breakpoint at 600px, create two new stylesheets, one to use when the
browser is 600px and below, and one for when it is wider than 600px.

{% include_code src=_code/weather-2.html snippet=mqweather2 %}

Finally, refactor the CSS.  In this example, we've placed the common styles such
as fonts, icons, basic positioning, colors in `weather.css`.  Specific layouts
for the small screen are then placed in `weather-small.css` and large screen
styles are placed in `weather-large.css`.

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

## Pick minor breakpoints when necessary

In addition to choosing major breakpoints when layout changes significantly, it
is also helpful to adjust for minor changes.  For example between major
breakpoints, it may be helpful to adjust the margins or padding on an element,
or increase the font size to make it feel more natural in the layout.

Let's start by optimizing the small screen layout.  In this case, let's boost
the font when the viewport width is greater than 360px.  Second, when there is
enough space, we can separate the high and low temperature so they're on the
same line, instead of on top of each other.  And let's also make the weather
icons a bit larger.

{% include_code src=_code/weather-small.css snippet=mqsmallbpsm lang=css %}

<div class="clear">
  <div class="g--half">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="g--half g--last">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

Similarly, for the large screens, it's best to limit to maximum width of the
forecast panel so it doesn't consume the whole screen width.

{% include_code src=_code/weather-large.css snippet=mqsmallbplg lang=css %}

## Optimize text for reading

Classic readability theory suggests that an ideal column should contain 70 to 80
characters per line (about  8 to 10 words in English), thus each time the width
of a text block grows past about 10 words, a breakpoint should be considered.

<div class="clear">
  <div class="g-wide--1 g-medium--half">
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="g-wide--3 g-wide--last g-medium--half g--last">
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

Let's take a deeper look at the above blog post example.  On smaller screens,
the Roboto font at 1em works perfectly giving 10 words per line, but larger
screens will require a breakpoint. In this case, if the browser width is greater
than 575px, the ideal content width is 550px.

{% include_code src=_code/reading.html snippet=mqreading lang=css %}

## Never completely hide content

Be careful when choosing what content to hide or show depending on screen size.
Don't simply hide content just because you can't fit it on screen.  Screen size
is not a definitive indication of what a user may want.  For example,
eliminating the pollen count from the weather forecast could be a serious issue
for spring time allergy sufferers who need the information to determine if they
can go outside or not.


{% include shared/nextarticle.liquid %}
