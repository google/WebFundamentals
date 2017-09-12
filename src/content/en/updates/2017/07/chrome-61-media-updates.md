project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the audio/video updates in Chrome 61.

{# wf_updated_on: 2017-09-12 #}
{# wf_published_on: 2017-07-28 #}
{# wf_tags: news,chrome61,media #}
{# wf_featured_image: /web/updates/images/generic/animations.png #}
{# wf_featured_snippet: Background video track optimizations and automatic video fullscreen when device is rotated are here! #}
{# wf_blink_components: Blink>Media #}

# Audio/Video Updates in Chrome 61 {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

- Chrome now [disables video tracks when a MSE video is played in the
  background](#background-video-track-optimizations) to optimize performance.
- Video will [go fullscreen when device is rotated](#auto-fullscreen-rotate).

## Background video track optimizations (MSE only) {: #background-video-track-optimizations}

Warning: This feature has been delayed until Chrome 62. See [http://crbug.com/752726](http://crbug.com/752726).

To improve battery life, Chrome now disables video tracks when the video is
played in the background if the video uses [Media Source Extensions (MSE)].

You can inspect these changes by going to the `chrome://media-internals` page,
and filter for the "info" property. When the tab containing a playing video
becomes inactive, you'll see a message like `Selected video track: []`
indicating that the video track has been disabled. When the tab becomes active
again, video track is re-enabled automatically.

<figure>
  <img src="/web/updates/images/2017/07/media-internals.png"
       alt="Log panel in the chrome://media-internals page">
  <figcaption>
    <b>Figure 1.</b>
    Log panel in the <i>chrome://media-internals</i> page
  </figcaption>
</figure>

For those who want to understand what is happening, here's a JavaScript code
snippet that shows you what Chrome is roughly doing behind the scenes.

    var video = document.querySelector('video');
    var selectedVideoTrackIndex;

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        // Disable video track when page is hidden.
        selectedVideoTrackIndex = video.videoTracks.selectedIndex;
        video.videoTracks[selectedVideoTrackIndex].selected = false;
      } else {
        // Re-enable video track when page is not hidden anymore.
        video.videoTracks[selectedVideoTrackIndex].selected = true;
      }
    });

You may want to reduce the quality of the video stream when video track is
disabled. It would be as simple as using the [Page Visibility API] as shown
above to detect when a page is hidden.

And here are some restrictions:

- This optimization only applies to videos with a [keyframe] distance < 5s.
- If the video doesn't contain any audio tracks, the video will be
  automatically paused when played in the background.

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=663999)

## Automatic video fullscreen when device is rotated {: #auto-fullscreen-rotate }

Warning: This feature has been delayed until Chrome 62. See [http://crbug.com/713233](https://bugs.chromium.org/p/chromium/issues/detail?id=713233#c30).

If you rotate a device to landscape while a video is playing in the viewport,
playback will automatically switch to fullscreen mode. Rotating the device to
portrait puts the video back to windowed mode.

Note that you can implement manually this behaviour yourself. (See the [Mobile Web Video
Playback] article).

<figure>
  <img src="/web/updates/images/2017/07/auto-fullscreen-rotate.png"
       alt="Automatic video fullscreen when device is rotated">
</figure>

This magic behaviour only happens when:

- device is an Android phone (not a tablet)
- user's screen orientation is set to "Auto-rotate"
- video size is at least 200x200px
- video uses native controls
- video is currently playing
- at least 75% of the video is visible (on-screen)
- orientation rotates by 90 degrees (not 180 degrees)
- there is no [fullscreen element] yet
- screen is not locked using the [Screen Orientation API]

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=713233)

{% include "comment-widget.html" %}

[Media Source Extensions (MSE)]: /web/fundamentals/media/mse/seamless-playback
[Page Visibility API]: https://www.w3.org/TR/page-visibility/
[keyframe]: https://en.wikipedia.org/wiki/Key_frame#Video_compression
[Mobile Web Video Playback]: /web/fundamentals/media/mobile-web-video-playback#fullscreen
[fullscreen element]: https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenElement
[Screen Orientation API]: https://w3c.github.io/screen-orientation/
