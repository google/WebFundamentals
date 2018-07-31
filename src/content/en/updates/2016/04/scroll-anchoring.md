project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Scroll anchoring stops a web page from moving once you've started reading the content.

{# wf_updated_on: 2018-07-31 #}
{# wf_published_on: 2016-04-07 #}
{# wf_tags: interventions,scroll-anchoring #}
{# wf_featured_image: /web/updates/images/2016/04/scroll-anchoring/scroll-anchoring-keyart.png #}
{# wf_blink_components: N/A #}

# Experiment Time: Scroll Anchoring {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}



Have you ever visited a web page, started reading some of the content and then the page sort of pops due to ad’s or images loading, making you lose your place on the page?

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="28ZsLMgjLl8"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Well it might be worth checking out the Scroll Anchoring flag in Chrome 51.

[Scroll Anchoring](https://groups.google.com/a/chromium.org/forum/#!msg/intervention-dev/THTySB4TdDE/Kk4R68HvDAAJ) keeps track of where you are on the page and prevents anything that causes a reflow from disrupting your position on the page.

To try this feature out for yourself do the following:

1. Go to chrome://flags/#enable-scroll-anchoring on *Chrome Dev / Canary*
1. Select “Enabled” from the dropdown
1. Click “*Relaunch Now*” at the bottom of the screen

With this you’ll have scroll anchoring enabled.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="i0iitEFArxA"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

We've been using this for a while and we believe that this drastically improves the experience for all users on the web but we want to make sure that it works well everywhere. If you spot any examples where scroll anchoring failed to handle reflows in the page or examples where it shouldn’t have intervened, *we desperately want to hear about it!*

Send us feedback / examples where you’ve seen unexpected behavior by filling out this form: [g.co/reportbadreflow](http://g.co/reportbadreflow)

## FAQ

### How does this change affect JavaScript scrolling?

In short - it doesn't.

This change alters the effect of scrolling caused by reflows. For
example, adding a class name to an element that causes it to
increase in height will cause a reflow and scroll anchoring will prevent the
page from jumping around.

Calling `window.scrollTo(0, 1)` (Yes the old school hack) wouldn't cause a reflow
and will behave normally. The same goes for touch events.

If you find an example where scroll anchoring is affecting your page, please
send feedback via this form: [g.co/reportbadreflow](http://g.co/reportbadreflow)


{% include "comment-widget.html" %}
