project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Learn best practices for good user experiences with the new autoplay policies in Chrome, coming April 2018.

{# wf_updated_on: 2018-05-24 #}
{# wf_published_on: 2017-09-13 #}
{# wf_tags: autoplay,news,media #}
{# wf_featured_image: /web/updates/images/generic/play-outline.png #}
{# wf_featured_snippet: Learn best practices for good user experiences with the new autoplay policies in Chrome, coming April 2018. #}
{# wf_blink_components: Blink>Media #}

# Autoplay Policy Changes {: .page-title }

Note: The Autoplay Policy launched in M66 Stable for audio and video
elements and is effectively blocking roughly half of unwanted media autoplays
in Chrome. For the Web Audio API, the autoplay policy will launch in M70. This
affects web games, some WebRTC applications, and other web pages using audio
features.  Developers will need to update their code to take advantage of the
policy. More details can be found in the <a href="#webaudio">Web Audio API
section</a> below.

{% include "web/_shared/contributors/beaufortfrancois.html" %}

Chrome's autoplay policies will change in April of 2018 and I'm here to tell
you why and how this is going to affect video playback with sound. Spoiler
alert: users are going to love it!

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
policies in order to improve the user experience, minimize incentives to install
ad blockers, and reduce data consumption on expensive and/or constrained
networks. These changes are intended to give greater control of playback to
users and to benefit publishers with legitimate use cases.

Chrome's autoplay policies are simple:

- Muted autoplay is always allowed.
- Autoplay with sound is allowed if:
    - User has interacted with the domain (click, tap, etc.).
    - On desktop, the user's [Media Engagement Index](#mei) threshold has been crossed,
      meaning the user has previously play video with sound.
    - On mobile, the user has [added the site to his or her home screen].
- Top frames can [delegate autoplay permission](#iframe) to their iframes to
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

### Developer switches {: #developer-switches }

As a developer, you may want to change Chrome autoplay policy behaviour locally
to test your website depending on user engagement.

- You can decide to disable entirely the autoplay policy by setting the Chrome
  flag "Autoplay Policy" to "No user gesture is required" at
  `chrome://flags/#autoplay-policy`. This allows you to test your website as if
  user were strongly engaged with your site and playback autoplay would be
  always allowed.

- You can also decide to make sure playback autoplay is never allowed by
  disabling use of MEI, applying autoplay policy to Web Audio, and whether
  sites with the highest overall MEI get playback autoplay by default for new
  users. This can be done with three [internal switches] with `chrome.exe
  --disable-features=PreloadMediaEngagementData,AutoplayIgnoreWebAudio,
  MediaEngagementBypassAutoplayPolicies`.

### Iframe delegation {: #iframe }

A [feature policy] allows developers to selectively enable and disable use of
various browser features and APIs. Once an origin has received autoplay
permission, it can delegate that permission to cross-origin iframes with a new
[feature policy for autoplay]. Note that autoplay is allowed by default on
same-origin iframes.

<pre class="prettyprint">
&lt;!-- Autoplay is allowed. -->
&lt;iframe src="https://cross-origin.com/myvideo.html" allow="autoplay">

&lt;!-- Autoplay and Fullscreen are allowed. -->
&lt;iframe src="https://cross-origin.com/myvideo.html" allow="autoplay; fullscreen">
</pre>

When the feature policy for autoplay is disabled, calls to `play()` without a
user gesture will reject the promise with a `NotAllowedError` DOMException. And
the autoplay attribute will also be ignored.

Warning: Older articles incorrectly recommend using the attribute
`gesture=media` which is not supported.

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

### Chrome enterprise policies

It is possible to change this new autoplay behaviour with Chrome enterprise
policies for use cases such as kiosks or unattended systems. Check out the
[Policy List] help page to learn how to set these new autoplay related
enterprise policies:

- The ["AutoplayAllowed"] policy controls whether autoplay is allowed or not.
- The ["AutoplayWhitelist"] policy allows you to specify a whitelist of URL
  patterns where autoplay will always be enabled.

## Best practices for web developers {: #best-practices }

### Audio/Video elements

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

### Web Audio {: #webaudio }

Note: The Web Audio API will be included in the Chrome autoplay policy with M70
(October 2018).

First, be reminded that it is good practice to wait for a user interaction
before starting audio playback as user is aware of something happening. Think
of a "play" button or "on/off" switch for instance. You can also simply add an
"unmute" button depending on the flow of the app.

Key Point: If an <code>AudioContext</code> is created prior to the document
receiving a user gesture, it will be created in the "suspended" state, and you
will need to call <code>resume()</code> after a user gesture is received.

If you create your <code>AudioContext</code> on page load, you’ll have to call
<code>resume()</code> at some time after the user interacted with the page
(e.g., user clicked a button).

    // Existing code unchanged.
    window.onload = function() {
      var context = new AudioContext();
      // Setup all nodes
      ...
    }

    // One-liner to resume playback when user interacted with the page.
    document.querySelector('button').addEventListener('click', function() {
      context.resume().then(() => {
        console.log('Playback resumed successfully');
      });
    });

You may also create the <code>AudioContext</code> only when user interacts wit
the page.

    document.querySelector('button').addEventListener('click', function() {
      var context = new AudioContext();
      // Setup all nodes
      ...
    });

To detect whether browser will require user interaction to play audio, you can
check the `state` of the `AudioContext` after you've created it. If you are
allowed to play, it should immediately switch to `running`. Otherwise it will
be `suspended`. If you listen to the `statechange` event, you can detect changes
asynchronously.

For info, checkout the small [Pull Request] that fixes Web Audio playback due to
these autoplay policy changes for [https://airhorner.com].

By default, the Web Audio API is not currently affected by the autoplay policy.
To enable the autoplay policy for Web Audio, launch Chrome with the following
[internal switch]: `chrome.exe --disable-features=AutoplayIgnoreWebAudio`.

Note: Web Audio FAQs can be found [here].

{% include "comment-widget.html" %}

[Policy List]: https://dev.chromium.org/administrators/policy-list-3
["AutoplayAllowed"]: http://dev.chromium.org/administrators/policy-list-3#AutoplayAllowed
["AutoplayWhitelist"]: http://dev.chromium.org/administrators/policy-list-3#AutoplayWhitelist
[noticed]: https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/
[added the site to his or her home screen]: /web/updates/2017/02/improved-add-to-home-screen
[Promise]: /web/fundamentals/getting-started/primers/promises
[rejected]: /web/updates/2017/06/play-request-was-interrupted
[200x140]: https://chromium.googlesource.com/chromium/src/+/1c63b1b71d28851fc495fdee9a2c724ea148e827/chrome/browser/media/media_engagement_contents_observer.cc#38
[feature policy for autoplay]: https://github.com/WICG/feature-policy/blob/gh-pages/features.md
[feature policy]: https://wicg.github.io/feature-policy/
[current approach]: https://docs.google.com/document/d/1_278v_plodvgtXSgnEJ0yjZJLg14Ogf-ekAFNymAJoU/edit
[enable MEI]: https://www.chromium.org/developers/how-tos/run-chromium-with-flags
[internal switches]: https://www.chromium.org/developers/how-tos/run-chromium-with-flags
[Pull Request]: https://github.com/GoogleChromeLabs/airhorn/pull/37
[https://airhorner.com]: https://airhorner.com
[internal switch]: https://www.chromium.org/developers/how-tos/run-chromium-with-flags
[here]: https://sites.google.com/a/chromium.org/dev/audio-video/autoplay
