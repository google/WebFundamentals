project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Get a better understanding of animations and their use in modern apps and sites.

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# Animations {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Animations are a huge part of making compelling web applications and sites. Users have come to expect highly responsive and interactive user interfaces. Animating your interface, however, is not necessarily straightforward. What should be animated, when, and what kind of feel should the animation have?


### TL;DR {: .hide-from-toc }
* Use animations as a way to add life to your projects.
* Animations should be in support of user interaction.
* Be careful which properties you animate; some are more expensive than others.


## Choose the right things to animate

Great animations add a layer of enjoyment and engagement to your projects for your users. You can animate pretty much anything you like, whether that’s widths, heights, positions, colors, or backgrounds, but you need to be aware of potential performance bottlenecks and how animations affect the personality of your application. Stuttering or poorly chosen animations can negatively affect user experience, so animations need to be both performant and appropriate.

## Use animations to support interactions

Don’t just animate something because you can; it just annoys users and feels obstructive. Instead, use strategically placed animations to _reinforce_ the user interactions. If they tap the menu icon, swipe to reveal a navigation drawer, or tap a button, use perhaps a subtle glow or bounce to acknowledge the interaction. Avoid animations that interrupt or obstruct the user's activity unnecessarily.

## Avoid animating expensive properties

The only thing worse than animations that are poorly placed are those that cause the page to stutter. This type of animation leaves users feeling frustrated and unhappy, and likely wishing you didn't animate things at all.

Some properties are more expensive to change than others, and are therefore more likely to make things stutter. So, for example, changing the `box-shadow` of an element requires a much more expensive paint operation than changing, say, its text color. Similarly, changing the `width` of an element is likely to be more expensive than changing its `transform`.

You can read more about the performance considerations of animations in the [Animations and Performance](animations-and-performance) guide, but if you want the TL;DR, stick to transforms and opacity changes, and use `will-change`. If you want to know exactly which work is triggered by animating a given property, see [CSS Triggers](http://csstriggers.com).
