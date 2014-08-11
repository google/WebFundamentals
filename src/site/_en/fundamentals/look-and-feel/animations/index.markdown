---
layout: section
title: "Animations"
description: "Get a better understanding of animations and their use in modern apps and sites."
introduction: "Animations are increasingly a required part of making compelling web applications and sites. Users have come to expect highly responsive and interactive user interfaces. Animating your interface, however, is not necessarily straight forward. What should be animated, when, and what kind of feel should the animation have?"
article:
  written_on: 2014-08-08
  updated_on: 2014-08-08
  order: 1
id: animations
collection: look-and-feel
key-takeaways:
  code:
    - Use animations as a way to add life to your projects.
    - Animations should be in support of user interaction.
    - Be careful which properties you animate; some are more expensive than others!

authors:
  - paullewis
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.code %}

## Choose the right things to animate

Great animations add a layer of enjoyment and engagement to your projects for your users. Care must also be taken to maintain performance as it will be very noticeable should they stutter or skip, and potentially be worse than no animation at all.

You can animate pretty much anything you like, whether that’s widths, heights, positions, colors, backgrounds, but there are two major considerations:

1. **Animations should be in support of user interaction.** Don’t just animate something because you can. That just annoys users and feels obstructive. Use strategically placed animations to reinforce the user interactions. So if they tap on the menu icon, shoot the menu out of the side of the page, or if they tap a button, have it glow or bounce to acknowledge their interaction. Do not, under any circumstances, animate the entirety of your page.
2. **Not all animations are equal.** Some properties are more expensive to change than others. So, for example, changing the box-shadow of an element will require a much more expensive paint operation than changing -- say -- the text color. You can read more on the performance considerations of animations below, but if you want the TL;DR stick to transforms and opacity.

If you want to know exactly which work is triggered by animating a given property check [CSS Triggers](http://csstriggers.com).

{% include modules/nextarticle.liquid %}

{% endwrap %}
