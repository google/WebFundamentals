project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Learn best practices for good user experiences with the new autoplay policies in Chrome.

{# wf_updated_on: 2017-09-04 #}
{# wf_published_on: 2017-09-04 #}
{# wf_tags: news,media #}
{# wf_featured_image: /web/updates/images/generic/play-outline.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Blink>Media #}

# Autoplay Policy Changes {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

Chrome's autoplay policies are about to change in 2018 and I'm here to tell
you why and how this is going to affect video playback with sound. Spoiler
alert: Users are going to love it!

<figure>
  <img src="/web/updates/images/2017/09/autoplay-memes.png"
       alt="Internet memes tagged "autoplay">
  <figcaption>
    <b>Figure 1.</b>
    Internet memes tagged "autoplay"
  </figcaption>
</figure>

## New Behaviors {: #new-behaviors }

As you may have [noticed], web browsers are moving towards stricter autoplay
policies in order to improve the web experience for users, minimize the
incentives to install extensions that block ads, and reduce data consumption on
expensive and/or constrained network.

With these new autoplay policies, the Chrome team aims to provide a greater
control to users over content playing in their browser. It will also benefit
publishers who have legitimate autoplay use cases.

Chrome's autoplay policies are simple:

- Muted autoplay is always allowed.
- Autoplay with sound is allowed if any of the following conditions are met:
    - User interaction on origin (button click, document activation,
      navigation, etc.)
    - [Media Engagement Index](#mei) threshold is crossed (desktop only)
    - User has added a [PWA] to their homescreen (mobile only)
- Iframes will require autoplay [permission delegation](#iframe) from
  top-level origin.

### Media Engagement Index (MEI) {: #mei }

The MEI measures an individual's propensity to consume media on a site.
Chrome's current approach is a ratio of visits to significant media playback
events per origin:

- Consumption of the video must be greater than 7 seconds.
- Audio must be present and unmuted.
- Tab with video is active.
- Size of the largest dimension of the video must be greater than 256px.

From that, Chrome calculates a Media Engagement score which is highest on sites
where video is the primary content type. When it is high enough, media playback
is allowed to autoplay on desktop only.

Note that you can check out user's MEI at the <i>chrome://media-engagement/</i>
internal page in Chrome 62.

<figure>
  <img src="/web/updates/images/2017/09/media-engagement.png"
       alt="Screenshot of the chrome://media-engagement page">
  <figcaption>
    <b>Figure 2.</b>
    TODO: Screenshot of the <i>chrome://media-engagement</i> internal page
  </figcaption>
</figure>

### Iframe delegation {: #iframe }

Once an origin has received autoplay permission, it can delegate that
permission to iframes via a new HTML attribute:

    <iframe src="myvideo.html" gesture="media">

Without iframe delegation, videos will not be able to autoplay with sound.

### Example scenarios

<b>Example 1:</b> Every time a user visits <i>VideoSubscriptionSite.com</i> on their
laptop they watch a TV show or a movie. As their Media Engagement score is
high, autoplay is allowed.

<b>Example 2:</b> <i>GlobalNewsSite.com</i> has both text and video content.
Most users go to the site for text content and watch videos only occasionally.
Users' Media Engagement score is low, so autoplay wouldn't be allowed if a user
navigates directly from a social media page or search. 

<b>Example 3:</b> <i>LocalNewsSite.com</i> has both text and video content.
Most people enter the site through the homepage and then click on the news
articles. Autoplay on the news article pages would be allowed because of user
interaction with the domain. However, care should be taken to make sure users
aren't surprised by autoplaying content.

<b>Example 4:</b> <i>MyMovieReviewBlog.com</i> embeds an iframe with a movie
trailer to go along with their review. The user interacted with the domain to
get to the specific blog, so autoplay is allowed. However, the blog needs to
explicitly delegate that privilege to the iframe in order for the content to
autoplay.

## Best Practises for Web Developers {: #best-practises }

Here's the one thing to remember: Don't ever assume a video will play, and
don't show a pause button from the start. It is so important that I'm going
to write one more time below for those who simply skim through that post.

Key Point: Don't ever assume a video will play, and don't show a pause button
from the start.

You should always look at the [Promise] returned by the play function to see if
it was rejected:

    var promise = document.querySelector('video').play();
    
    if (promise !== undefined) {
      promise.then(_ => {
        // Autoplay started!
      }).catch(error => {
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
      });
    }

Warning: Don't play interstitial ads without showing any
media controls as they may not autoplay and user will have no way of
starting playback.

One cool way to engage users is about using muted autoplay and let them
self-select to autoplay (see code snippet below). Some websites already do
this effectively, including Facebook, Twitter, and Instagram.

    <video id="video" muted autoplay>
    <button id="unmuteButton"></button>

    <script>
      unmuteButton.addEventListener('click', function() {
        video.muted = false;
      });
    </script>

{% include "comment-widget.html" %}

[noticed]: https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/
[PWA]: https://developers.google.com/web/progressive-web-apps/
[Promise]: https://developers.google.com/web/fundamentals/getting-started/primers/promises
