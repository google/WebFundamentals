project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The prefers-reduced-motion media query detects whether the user has requested that the system minimize the amount of animation or motion it uses. This is for users who either require or prefer minimized animations; for example people with vestibular disorders often desire animations to be kept to a minimum.

{# wf_updated_on: 2019-03-01 #}
{# wf_published_on: 2019-03-01 #}
{# wf_tags: media-queries #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: The prefers-reduced-motion media query detects whether the user has requested that the system minimize the amount of animation or motion it uses. #}
{# wf_blink_components: Blink>Animation #}

# Move Ya! Or maybe, don't, if the user `prefers-reduced-motion`! {: .page-title}

{% include "web/_shared/contributors/thomassteiner.html" %}

<div class="clearfix"></div>

The other day, I was ice skating with my kids. It was a lovely day, the sun was shining, and the ice
rink was crammed with people ⛸. The only issue with that: I don't cope with crowds well. With so
many moving targets, I fail to focus on anything, and end up lost and with a feeling of complete
visual overload, almost like staring at an anthill 🐜.

<img src="../../images/2019/03/prefers-reduced-motion/ice-skating.jpg" intrinsicsize="580×320" width="580" height="320" alt="Throng of feet of ice skating people">

Occasionally, the same can happen on the web: with flashing ads, fancy parallax effects, unexpected
reveal animations, autoplaying videos, etc., **the web sometimes can honestly be quite
overwhelming…** Happily, unlike in real life, there is a solution to that. The CSS media query
`prefers-reduced-motion` lets developers create a variant of a page for users who, well, prefer
reduced motion. This can comprise anything from refraining from having autoplaying videos to
disabling certain purely decorative effects, to completely redesigning a page for certain users.

## Animation on the web

## Vestibular Spectrum Disorder

## Related Links

- Latest Editor's Draft of the
[Media Queries Level&nbsp;5](https://drafts.csswg.org/mediaqueries-5/#prefers-reduced-motion) spec.
- `prefers-reduced-motion` on
[Chrome Platform Status](https://www.chromestatus.com/feature/5597964353404928).
- `prefers-reduced-motion` [Chromium bug](http://crbug.com/722548).
- Blink
[Intent to Implement posting](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/NZ3c9d4ivA8/BIHFbOj6DAAJ).

## Acknowledgements



{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
