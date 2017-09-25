project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Learn best practices for good user experiences with the new autoplay policies in Chrome.

{# wf_updated_on: 2017-09-21 #}
{# wf_published_on: 2017-09-13 #}
{# wf_tags: news,media #}
{# wf_featured_image: /web/updates/images/generic/play-outline.png #}
{# wf_featured_snippet: Learn best practices for good user experiences with the new autoplay policies in Chrome. #}
{# wf_blink_components: Blink>Media #}

# Autoplay Policy Changes {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

Chrome's autoplay policies are about to change in 2018 and I'm here to tell you
why and how this is going to affect video playback with sound. Spoiler alert:
Users are going to love it!

<figure>
  <a href="https://imgflip.com/i/ngd6c">
    <img height="335px" src="https://i.imgflip.com/ngd6c.jpg"
         title="I will find you and I will pause you"/>
  </a>
  <a href="https://imgur.com/a/p1ZjC">
    <img height="335px" src="https://i.imgur.com/aFO9wAml.jpg"
         title="One does not simply autoplay videos"/>
  </a>
  <figcaption>
    <b>Figure 1.</b>
    Internet memes tagged "autoplay" found on
    <a href="https://imgflip.com/i/ngd6c">Imgflip</a> and
    <a href="https://imgur.com/a/p1ZjC">Imgur</a>
  </figcaption>
</figure>

## New behaviors {: #new-behaviors }

As you may have [noticed], web browsers are moving towards stricter autoplay
policies in order to improve the web experience for users, minimize the
incentives to install extensions that block ads, and reduce data consumption on
expensive and/or constrained networks.

With these new autoplay policies, the Chrome team aims to provide a greater
control to users over content playing in their browser. Those will also benefit
publishers who have legitimate autoplay use cases.

Chrome's autoplay policies are simple:

- Muted autoplay is always allowed.
- Autoplay with sound is allowed if any of the following conditions are met:
    - User has interacted with the site (click, tap, etc.)
    - [Media Engagement Index](#mei) threshold is crossed (desktop only)
    - Site has been installed using the ["Add to Homescreen" flow] (mobile only)
- Top frame can [delegate autoplay permission](#iframe) to their iframes to
  allow autoplay with sound.

### Media Engagement Index (MEI) {: #mei }

The MEI measures an individual's propensity to consume media on a site.
Chrome's [current approach] is a ratio of visits to significant media playback
events per origin:

- Consumption of the media (audio/video) must be greater than 7 seconds.
- Audio must be present and unmuted.
- Tab with video is active.
- Size of the video (in px) must be greater than [200x140].

From that, Chrome calculates a media engagement score which is highest on sites
where media is played on a regular basis. When it is high enough, media playback
is allowed to autoplay on desktop only.

User's MEI is available at the <i>chrome://media-engagement</i> internal page.

<figure>
  <img src="/web/updates/images/2017/09/media-engagement.png"
       alt="Screenshot of the chrome://media-engagement page">
  <figcaption>
    <b>Figure 2.</b>
    Screenshot of the <i>chrome://media-engagement</i> internal page
  </figcaption>
</figure>

### Iframe delegation {: #iframe }

Once an origin has received autoplay permission, it can delegate that
permission to iframes via a new HTML attribute. Check out the [Gesture
Delegation API proposal] to learn more.

<pre class="prettyprint">
&lt;iframe src="myvideo.html" gesture="media">
</pre>

Without iframe delegation, videos will not be able to autoplay with sound.

### Example scenarios

<b>Example 1:</b> Every time a user visits <i>VideoSubscriptionSite.com</i> on their
laptop they watch a TV show or a movie. As their media engagement score is
high, autoplay is allowed.

<b>Example 2:</b> <i>GlobalNewsSite.com</i> has both text and video content.
Most users go to the site for text content and watch videos only occasionally.
Users' media engagement score is low, so autoplay wouldn't be allowed if a user
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

## Best practises for web developers {: #best-practises }

Here's the one thing to remember: Don't ever assume a video will play, and
don't show a pause button when the video is not actually playing. It is so
important that I'm going to write it one more time below for those who simply
skim through that post.

Key Point: Don't ever assume a video will play, and don't show a pause button
when the video is not actually playing.

You should always look at the [Promise] returned by the play function to see if
it was [rejected]:

    var promise = document.querySelector('video').play();
    
    if (promise !== undefined) {
      promise.then(_ => {
        // Autoplay started!
      }).catch(error => {
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
      });
    }

Warning: Don't play interstitial ads without showing any media controls as they
may not autoplay and users will have no way of starting playback.

One cool way to engage users is about using muted autoplay and let them chose
to unmute (see code snippet below). Some websites already do this effectively,
including Facebook, Instagram, Twitter, and YouTube.

    <video id="video" muted autoplay>
    <button id="unmuteButton"></button>

    <script>
      unmuteButton.addEventListener('click', function() {
        video.muted = false;
      });
    </script>

## Feedback

At the time of writing, Chrome's autoplay policies aren't carved in stone.
Please reach out to the Chrome team, [ChromiumDev on Twitter] to share your
thoughts.

{% include "comment-widget.html" %}

[noticed]: https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/
["Add to Homescreen" flow]: /web/updates/2017/02/improved-add-to-home-screen
[Promise]: /web/fundamentals/getting-started/primers/promises
[rejected]: /web/updates/2017/06/play-request-was-interrupted
[200x140]: https://chromium.googlesource.com/chromium/src/+/1c63b1b71d28851fc495fdee9a2c724ea148e827/chrome/browser/media/media_engagement_contents_observer.cc#38
[Gesture Delegation API proposal]: https://github.com/mounirlamouri/gesture-delegation/blob/master/explainer.md
[current approach]: https://docs.google.com/document/d/1_278v_plodvgtXSgnEJ0yjZJLg14Ogf-ekAFNymAJoU/edit
[ChromiumDev on Twitter]: https://twitter.com/chromiumdev
