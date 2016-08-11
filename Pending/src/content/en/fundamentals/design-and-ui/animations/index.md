project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Get a better understanding of animations and their use in modern apps and sites.

{# wf_review_required #}
{# wf_updated_on: 2014-10-21 #}
{# wf_published_on: 2014-08-08 #}

# Animations {: .page-title }

{% include "_shared/contributors/paullewis.html" %}

Animations are a huge part of making compelling web applications and sites. Users have come to expect highly responsive and interactive user interfaces. Animating your interface, however, is not necessarily straightforward. What should be animated, when, and what kind of feel should the animation have?


## TL;DR
- Use animations as a way to add life to your projects.
- Animations should be in support of user interaction.
- Be careful which properties you animate; some are more expensive than others!


## Choose the right things to animate

Great animations add a layer of enjoyment and engagement to your projects for your users. You can animate pretty much anything you like, whether that’s widths, heights, positions, colors, backgrounds, but you'll need to be aware of potential performance bottlenecks and how animations will affect the personality of your application. Stuttering or poorly-chosen animations can negatively affect user experience, so they need to be both performant and appropriate.

## Use animations to support interactions

Don’t just animate something because you can; it just annoys users and feels obstructive. Instead, use strategically placed animations to _reinforce_ the user interactions. If they tap on the menu icon, shoot the menu out of the side of the page, or if they tap a button, use perhaps a subtle glow or bounce to acknowledge the interaction. Take care to avoid animations that interrupt or obstruct the user's activity unnecessarily.

## Avoid animating expensive properties

The only thing worse than animations that are ill-placed are those that cause the page to stutter. This will leave users feeling frustrated and unhappy, and likely wishing you hadn't bothered to animate things at all!

Some properties are more expensive to change than others, and are therefore more likely to make things stutter. So, for example, changing the `box-shadow` of an element will require a much more expensive paint operation than changing -- say -- its text color. Changing the `width` of an element is likely to be more expensive than changing its `transform`.

You can read more on the performance considerations of animations in the [Animations and Performance](animations-and-performance) guide, but if you want the TL;DR stick to transforms and opacity changes, and make use of `will-change`. If you want to know exactly which work is triggered by animating a given property check [CSS Triggers](http://csstriggers.com).
