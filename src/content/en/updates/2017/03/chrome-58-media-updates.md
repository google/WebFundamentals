project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the media (audio/video) updates in Chrome 58.

{# wf_updated_on: 2017-09-12 #}
{# wf_published_on: 2017-03-21 #}
{# wf_tags: news,chrome58,media #}
{# wf_featured_image: /web/updates/images/generic/animations.png #}
{# wf_featured_snippet: Media controls customization, Autoplay for Progressive Web Apps added to the home screen, pause the autoplaying of muted video when invisible, and color-gamut media query are there! #}
{# wf_blink_components: Blink>Media #}

# Media (Audio/Video) Updates in Chrome 58 {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

- Developers can now [customize media controls](#controlslist) such as the
  download, fullscreen and remoteplayback buttons.
- Sites installed using the "Add to Homescreen" flow can [autoplay audio
  and video in the manifest's scope](#autoplay).
- Chrome on Android now [pauses autoplaying a muted video when it is invisible](#offscreen).
- Developers can now access the approximate range of colors supported by Chrome and
  output devices using the [`color-gamut` Media Query](#colorgamut).
- When using Media Source Extensions, it's now possible to
  [switch between encrypted and clear streams].

## Media controls customization {: #controlslist}

Developers can now customize Chrome's native media controls such as the
download, fullscreen and [remoteplayback] buttons using the new [ControlsList API].

<div class="attempt-right">
<figure>
  <img src="/web/updates/images/2017/03/media-controls.png"
       alt="Native media controls in Chrome 58">
  <figcaption>
    <b>Figure 1.</b>
    Native media controls in Chrome 58
  </figcaption>
</figure>
</div>

This API offers a way to show or hide native media controls that do not make
sense or are not part of the expected user experience, or only whitelist a
limited set of features.

The current implementation for now is a blacklist mechanism on native controls
with the ability to set them directly from HTML content using the new 
attribute `controlsList`. Check out the [official
sample](https://googlechrome.github.io/samples/media/controlslist.html).

<div class="clearfix"></div>

Usage in HTML:

<pre class="prettyprint lang-html">
&lt;video controls <b>controlsList="nofullscreen nodownload noremote foobar"</b>>&lt;/video>
</pre>

Usage in JavaScript:

    var video = document.querySelector('video');
    video.controls; // true
    video.controlsList; // "nofullscreen nodownload noremote" - "foobar" not present
    video.controlsList.remove('noremote');
    video.controlsList; // "nofullscreen nodownload" - "noremote" not present
    video.getAttribute('controlsList'); // "nofullscreen nodownload"

[Intent to Ship](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/tFuQd3AcsIQ/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5737006365671424) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=685018)

## Autoplay for Progressive Web Apps added to home screen {: #autoplay }

Previously, Chrome used to block all `autoplay` with sound on Android without
exception. This is no longer true. From now on, sites installed using the
[improved Add to Home Screen] flow are allowed to autoplay audio and video
served from origins included in the [web app manifest]'s scope without
restrictions.

<pre class="prettyprint lang-json">
{
  "name": "My Web App",
  "description": "An awesome app",
  <b>"scope": "/foo",</b>
  ...
}
</pre>

<pre class="prettyprint lang-html">
&lt;html>
  &lt;link rel="canonical" href="https://example.com/foo">
  &lt;audio autoplay src="https://cdn.com/file.mp4">&lt;/audio>
&lt;/html>
</pre>
<div class="success">
  Audio will autoplay as <code>/foo</code> is in the scope.
</div>

<pre class="prettyprint lang-html">
&lt;html>
  &lt;link rel="canonical" href="https://example.com/bar">
  &lt;audio autoplay src="https://cdn.com/file.mp4">&lt;/audio>
&lt;/html>
</pre>
<div class="warning">
  Audio fails to autoplay as <code>/bar</code> is NOT in the scope.
</div>

[Intent to Ship](https://groups.google.com/a/chromium.org/d/topic/blink-dev/DW7_yxL_HjE/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5715456904134656) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=676312)

## Pause autoplaying muted video when invisible {: #offscreen }

As you may already know, Chrome on Android allows `muted` videos to begin playing
without user interaction. If a video is marked as `muted` and has the
`autoplay` attribute, Chrome starts playing the video when it becomes visible
to the user.

From Chrome 58, in order to reduce power usage, playback of videos with
the `autoplay` attribute will be paused when offscreen and resumed when back in
view, following Safari iOS behavior.'

Note: This only applies to videos that are declared as `autoplay` but not videos
that start playing with `play()`.

[Intent to Ship](https://groups.google.com/a/chromium.org/d/topic/blink-dev/UtFM-kndhaI/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5651339115757568) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=690468)

## color-gamut media query {: #colorgamut }

As wide color gamut screens are more and more popular, sites can now access the
approximate range of colors supported by Chrome and output devices using the
`color-gamut` media query.

If you're not familiar yet with the definitions of color space, color profile,
gamut, wide-gamut and color depth, I highly recommend you read the 
[Improving Color on the Web] WebKit blog post. It goes into much detail on how
to use the `color-gamut` media query to serve wide-gamut images when the user
is on wide-gamut displays and fallback to sRGB images otherwise.
 
The current implementation in Chrome accepts the `srgb`, `p3` (gamut specified
by the DCI P3 Color Space), and `rec2020` (gamut specified by the ITU-R
Recommendation BT.2020 Color Space) keywords. Check out the [official
sample](https://googlechrome.github.io/samples/media/color-gamut-media-query.html).

Usage in HTML:

<pre class="prettyprint lang-html">
&lt;picture>
  &lt;source media="(color-gamut: p3)" srcset="photo-p3.jpg">
  &lt;source media="(color-gamut: rec2020)" srcset="photo-rec2020.jpg">
  &lt;img src="photo-srgb.jpg">
&lt;/picture>
</pre>

Usage in CSS:

    main {
      background-image: url("photo-srgb.jpg");
    }
    
    @media (color-gamut: p3) {
      main {
        background-image: url("photo-p3.jpg");
      }
    }
    
    @media (color-gamut: rec2020) {
      main {
        background-image: url("photo-rec2020.jpg");
      }
    }

Usage in JavaScript:

    // It is expected that the majority of color displays will return true.
    if (window.matchMedia("(color-gamut: srgb)").matches) {
      document.querySelector('main').style.backgroundImage = 'url("photo-srgb.jpg")';
    }
    
    if (window.matchMedia("(color-gamut: p3)").matches) {
      document.querySelector('main').style.backgroundImage = 'url("photo-p3.jpg")';
    }

    if (window.matchMedia("(color-gamut: rec2020)").matches) {
      document.querySelector('main').style.backgroundImage = 'url("photo-rec2020.jpg")';
    }

<p>For info, this screen currently supports approximately:</p>
{% framebox height="100%" %}
<style>
  ul {
    padding: 0;
  }
  li {
    list-style-type: none
  }
</style>
<ul>
  <li>
    <span id="srgb"></span>
    the sRGB gamut or more.
  </li>
  <li>
    <span id="p3"></span>
    the gamut specified by the DCI P3 Color Space or more.
  </li>
  <li>
    <span id="rec2020"></span>
    the gamut specified by the ITU-R Recommendation BT.2020 Color Space or more.
  </li>
</ul>
<script>
  document.querySelector('#srgb').innerHTML = 
      (window.matchMedia("(color-gamut: srgb)").matches) ? '&#x2714;' : '&#x274C;';
  document.querySelector('#p3').innerHTML =
      (window.matchMedia("(color-gamut: p3)").matches) ? '&#x2714;' : '&#x274C;';
  document.querySelector('#rec2020').innerHTML =
      (window.matchMedia("(color-gamut: rec2020)").matches) ? '&#x2714;' : '&#x274C;';
</script>
{% endframebox %}

[Intent to Ship](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/36CcloDrB3E/1wMSNMl9BQAJ) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5354410980933632) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=685456)

{% include "comment-widget.html" %}

[remoteplayback]: https://w3c.github.io/remote-playback/
[ControlsList API]: https://github.com/WICG/controls-list/blob/gh-pages/explainer.md
[improved Add to Home screen]: https://blog.chromium.org/2017/02/integrating-progressive-web-apps-deeply.html
[web app manifest]: /web/fundamentals/engage-and-retain/web-app-manifest/
[Improving Color on the Web]: https://webkit.org/blog/6682/improving-color-on-the-web/
[switch between encrypted and clear streams]: /web/updates/2017/03/mixing-streams
