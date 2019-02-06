project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Instead of only surfacing generalized advice, Stack Packs will extend Lighthouse to include additional messages for specific tools.

{# wf_updated_on: 2019-02-01 #}
{# wf_published_on: 2019-01-29 #}
{# wf_tags: lighthouse #}
{# wf_featured_image: /web/updates/images/2019/01/lighthouse-platform-packs/lighthouse.png #}
{# wf_featured_snippet: Instead of only surfacing generalized advice, Stack Packs will extend Lighthouse to include additional messages for specific tools. #}
{# wf_blink_components: N/A #}

# Prototyping Stack Packs for Lighthouse {: .page-title }

{% include "web/_shared/contributors/housseindjirdeh.html" %}

**TL;DR:** Stack Packs is a new Lighthouse feature that is currently under
development, and we would love to hear your feedback!


By auditing for performance, accessibility and other best practices,
[Lighthouse](/web/tools/lighthouse/) provides developers with important guidance
that they can use to improve their web pages. Many developers, however, use
different technologies to build their site (such as a CMS or JavaScript
framework) and may need more specific advice.

**Stack Packs** is a feature that will extend Lighthouse to also include
specific stack-based recommendations. Instead of only surfacing generalized
advice, additional messages will be provided that explain how to address certain
audits with tools that have been detected to be used on a website.

<img src="/web/updates/images/2019/01/lighthouse-platform-packs/audit.png"
alt="Prototype of the WordPress Stack Pack">

The community will get to decide what the recommendations for different
stacks should be. A separate
[repository](https://github.com/GoogleChrome/lighthouse-stack-packs) has been
created to consolidate ideas and a prototype of this feature can already be
viewed with [Lighthouse
Viewer](https://houssein.me/lighthouse/viewer-wordpress/?gist=9efc3fc22dc500620c884db995e3fb6c).

## Which stacks will Lighthouse support?

We are starting with WordPress and plan to expand the list in the future
to other popular CMS and JavaScript frameworks (React, Angular, etc...).
 
## How will this feature show up on my Lighthouse report?

There are two options that are being considered:

* Automatically detect which stacks are being used on a page (such as
  WordPress) and immediately surface additional stack-specific messages for
  applicable audits.
* Automatically detect which stacks are being used on a page (such
  as WordPress) and provide a toggle that allows the user to switch between a
  regular and an updated version of Lighthouse.

## How will stack-specific descriptions be modified by the community?

We’re exploring options to enable anyone to recommend stack-specific
recommendations in the near future. In the meantime, feel free to submit PRs
directly to the [Lighthouse Stack
Packs](https://github.com/GoogleChrome/lighthouse-stack-packs) repository or
leave suggestions in this [Google
Sheet](https://docs.google.com/spreadsheets/d/1D4sz4NmhTjekJR2HIFX6QvO76c9PU2LHKDBf19YLnrA/edit?usp=sharing)
for WordPress.

## Feedback

We would love to hear any feedback you may have:

* Which stacks should we prioritize in the future after WordPress?
* Do you have a preference for how this feature will show up on your Lighthouse
  report?
* Any other suggestions?

Leave a comment in this [discussion
issue](https://github.com/GoogleChrome/lighthouse-stack-packs/issues/3) if
you have any thoughts.

## Helpful Links

* [Stack Packs
  repository](https://github.com/GoogleChrome/lighthouse-stack-packs)
* [Feature RFC](https://github.com/GoogleChrome/lighthouse/issues/7021)

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
