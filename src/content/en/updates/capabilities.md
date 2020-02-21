project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Web apps should be able to do anything native apps can. Through Project Fugu, we want to make it possible to build and deliver any kind of app on the open web.

{# wf_updated_on: 2020-02-24 #}
{# wf_published_on: 2018-11-12 #}
{# wf_tags: capabilities #}
{# wf_featured_image: /web/updates/images/generic/thumbs-up.png #}
{# wf_featured_snippet: We strongly believe that every developer should have access to the capabilities they need to make a great web experience, and we are committed to a more capable web. Learn about some of the new APIs we're considering and how you can get involved. #}
{# wf_blink_components: N/A #}

# Unlocking new capabilities for the web {: .page-title }

<style>
  .proj-goal {
    font-size: inherit;
    font-family: Google Sans, sans-serif;
  }
</style>

<aside class="success proj-goal">
  Web apps should be able to do anything native apps can.
  We want to make it possible for you to build and deliver apps on the open
  web that have never been possible before.
</aside>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="GSiUzuB-PoI"
          data-autohide="1" data-showinfo="1" frameborder="1" allowfullscreen>
  </iframe>
</div>

The web is an amazing platform, it reaches users all around the world - on
essentially any device. It’s easy to use, and easy to share. There’s nothing
to install. But most importantly, it’s an open-ecosystem that anyone can use
or build on.

There are some apps that are not possible to build and deliver on the open
web today. We call this, the *app gap*. The gap between what’s possible on the
web and what’s possible on native. We want to close that gap. We believe web
apps should be able to do anything native apps can.

> Through our capabilities project, we want to make it possible for web apps
> to do anything native apps can, by exposing the capabilities of native
> platforms to the web platform, while maintaining user security, privacy,
> trust, and other core tenets of the web.

<aside class="note">
  To see a list of all the APIs that are currently in development, check
  out <a href="https://web.dev/fugu-status/">https://web.dev/fugu-status/</a>
</aside>

## How will we design & implement these new capabilities? {: #process }

<img src="/web/updates/images/misc/capabilities-process.jpg">

We developed this process to make it possible to design and develop new web
platform capabilities that meet the needs of developers quickly, in the open,
and most importantly, work within the existing standards process. It’s no
different than how we develop every other web platform feature, but it puts an
emphasis on developer feedback.

Developer feedback is critical to help us ensure we’re shipping the right
features, but when it comes in late in the process, it can be hard to change
course. That’s why we’re starting to ask for feedback earlier. When actionable
technical and use-case feedback comes in early, it’s easier to course correct or
even stop development, without having shipped poorly thought out or badly
implemented features. Features being developed at WICG are not set in stone, and
[your input](https://discourse.wicg.io/) can make a big difference in how they
evolve.

It’s worth noting that many ideas never make it past the explainer or [origin
trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
stage. The goal of the process is to ship the right feature. That
means we need to learn and iterate quickly. Not shipping a feature because it
doesn’t solve the developer need is OK. To enable this learning, we have come to
employ the following process (although there is frequently some re-ordering of
later steps due to feedback):

### Identify the developer need

The first step is to identify and understand the developer need. What is the
developer trying to accomplish? Who would use it? How are they doing it today?
And what problems or frustrations are fixed by this new capability. Typically,
these come in as feature request from developers, frequently through [bugs filed
on bugs.chromium.org](https://bugs.chromium.org/p/chromium/issues/list?can=2&q=Type%3DFeature).

<aside class="note">
  <b>Have a suggestion for a capability you think we should consider?</b>
  Tell us about it by filing a <a href="https://goo.gl/qWhHXU">new feature
  request</a>. Please be sure to include as much detail as you can, such as
  the problem you're trying to solve, suggested use cases, and anything else
  that might be helpful.
</aside>

<div class="clearfix"></div>

### Create an explainer

After identifying the need for a new capability, create an
[explainer](https://github.com/w3ctag/w3ctag.github.io/blob/master/explainers.md),
essentially a design doc that is meant to explain the problem, along with some
sample code showing how the API might work. The explainer is a living design
document that will go through heavy iteration as the new capability evolves.

### Get feedback and iterate on the explainer

Once the explainer has a reasonable level of clarity, it’s time to publicize it,
to solicit feedback, and iterate on the design. This is an opportunity to verify
the new capability meets the needs of developers and works in a way that they
expect. This is also an opportunity to gather public support and verify that
there really is a need for this capability.

### Move the design to a specification & iterate

Once the explainer is in a good state, the design work transitions into a
formal specification, working with developers and other browser vendors to
iterate and improve on the design.

Then, once the design starts to stabilize, we typically use an
[origin trial](https://github.com/GoogleChrome/OriginTrials) to experiment
with the implementation. Origin trials allow you to try new features with
real users, and give feedback on the implementation. This real world feedback
helps shape and validate the design, ensuring we get it right, before it
becomes a standard.

### Ship it

Finally, once the origin trial is complete, the spec has been finalized, and
all of the other launch steps have been completed, it’s time to ship it to
stable.

## Design for user security, privacy, and trust

Some of these features may seem scary at first, especially in light of how
they’re implemented on native. But the web is inherently safer than native,
opening a web page shouldn’t be scary.

Nothing should ever be granted access by default, but instead rely on a
permission model that puts the user in total control, and is easily
revoke-able. It needs to be crystal clear when, and how these APIs are being
used. We've outlined some of our thought process in
[Controlling Access to Powerful Web Platform Features](https://bit.ly/powerful-apis).


<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}
