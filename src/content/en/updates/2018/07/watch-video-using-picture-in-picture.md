project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Control Picture-in-Picture for video elements on your website.

{# wf_updated_on: 2018-07-27 #}
{# wf_published_on: 2018-07-27 #}
{# wf_tags: news,media #}
{# wf_featured_image: /web/updates/images/2018/07/watch-video-using-picture-in-picture/hero.png #}
{# wf_featured_snippet: Control Picture-in-Picture for video elements on your website. #}
{# wf_blink_components: Blink>Media>PictureInPicture #}

# Watch video using Picture-in-Picture {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

<video controls playsinline poster="https://storage.googleapis.com/webfundamentals-assets/videos/picture-in-picture-poster.png">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/picture-in-picture-screen-recording.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/picture-in-picture-screen-recording.mp4" type="video/mp4">
</video>

Picture-in-Picture (PiP) allows users to watch videos in a floating window
(always on top of other windows) so they can keep an eye on what they’re
watching while interacting with other sites, or applications.

With the new [Picture-in-Picture Web API], you can initiate and control
Picture-in-Picture for video elements on your website. Try it out on our
official [Picture-in-Picture sample].

Dogfood: The Picture-in-Picture Web API requires enabling `chrome://flags/#enable-surfaces-for-videos` experimental flag in Chrome 69 for desktop.

## Background {: #background }

In September 2016, Safari added Picture-in-Picture support through a [WebKit API]
in macOS Sierra. Six months later, Chrome automatically played
Picture-in-Picture video on mobile with the release of Android O using a
[native Android API]. Six months later, we [announced our intent] to build and
standardize a Web API, feature compatible with Safari’s, that would allow web
developers to create and control the full experience around Picture-in-Picture.
And here we are!

## Get into the code {: #code }

### Enter Picture-in-Picture {: enter-pip }

Let’s start simply with a video element and a way for the user to interact
with it, such as a button element.

    <video id="videoElement" src="https://example.com/file.mp4"></video>
    <button id="pipButtonElement"></button>

Caution: Never programmatically request Picture-in-Picture except in response
to a user’s request. Since promises do NOT propagate user gestures [yet],
patterns such as `videoElement.play().then(_ =>
videoElement.requestPictureInPicture())` won’t work in a button click event
listener.

In this example, we call `requestPictureInPicture()` on the video element
to enter Picture-in-Picture when the user clicks the button element. This
method returns a [promise]. It is your responsibility to handle what happens if
user clicks the button twice.

    pipButtonElement.addEventListener('click', async function() {
      pipButtonElement.disabled = true;

      await videoElement.requestPictureInPicture();

      pipButtonElement.disabled = false;
    });

When the promise resolves, Chrome shrinks the video into a small window that
user can move around and position over other windows. You’re done. Great job!
You can stop reading and go take your well-deserved vacation.

Sadly, that is not always the case. The promise [may reject] for any of the
following reasons:

- Picture-in-Picture is not supported by the system.
- Document is not allowed to use Picture-in-Picture due to a restrictive
  [feature policy].
- Video metadata have not been loaded yet.
- Video file is audio-only.
- The new disablePictureInPicture attribute is present on the video element.
- The call was not made in a user gesture event handler (e.g. a button click).

The [Feature support] section below shows how to enable/disable a button based on
these restrictions.

Let’s add a `try...catch` block to capture these potential errors and let the
user know what’s going on.

<pre class="prettyprint lang-js">
pipButtonElement.addEventListener('click', async function() {
  pipButtonElement.disabled = true;

  <strong>try {</strong>
    await videoElement.requestPictureInPicture();
  <strong>}
  catch(error) {
    // TODO: Show error message to user.
  }
  finally {</strong>
    pipButtonElement.disabled = false;
  <strong>}</strong>
})
</pre>

The video element behaves the same whether it is in Picture-in-Picture or
not: events are fired and calling methods work. It reflects change of states in
the Picture-in-Picture window (such as play, pause, seek, etc.) and it is also
possible to change state programmatically in JavaScript.

### Exit Picture-in-Picture {: #exit-pip }

But why stop there? Let's make our button toggle entering and exiting
Picture-in-Picture. We first have to check if the read-only object
`document.pictureInPictureElement` is our video element. If it isn’t, we
send a request to enter Picture-in-Picture as above. Otherwise, we ask to leave
by calling `document.exitPictureInPicture()`, which means the video will appear
back in the original tab. Note that this method also returns a promise.

    ...
    try {
      if (videoElement !== document.pictureInPictureElement) {
        await videoElement.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    }
    ...

### Listen to Picture-in-Picture events {: #listen-pip-events }

Operating systems usually restrict Picture-in-Picture to one window, so
Chrome's implementation follows this pattern. This means users can only play
one Picture-in-Picture video at a time. You should expect users to exit
Picture-in-Picture even when you didn't ask for it.

The new `enterpictureinpicture` and `leavepictureinpicture` event handlers let
us tailor the experience for users. It could be anything from browsing a
catalog of videos, to surfacing a livestream chat.

    videoElement.addEventListener('enterpictureinpicture', function(event) {
      // Video entered Picture-in-Picture.
    });

    videoElement.addEventListener('leavepictureinpicture', function(event) {
      // Video left Picture-in-Picture.
      // User may have played a Picture-in-Picture video from a different page.
    });

### Get Picture-in-Picture window size

If you want to adjust the video quality when the video enters and leaves
Picture-in-Picture, you need to know the Picture-in-Picture window size and be
notified if a user manually resizes the window.

The example below shows how to get the width and height of the
Picture-in-Picture window when it is created or resized.

    const pipWindow = await videoElement.requestPictureInPicture();
    updateVideoQuality(pipWindow);

    pipWindow.addEventListener('resize', function(event) {
      const pipWindow = event.target;
      updateVideoQuality(pipWindow);
    });

    function updateVideoQuality(pipWindow) {
      console.log('Picture-in-Picture window width is ' + pipWindow.width);
      console.log('Picture-in-Picture window height is ' + pipWindow.height);
      // TODO: Change video quality based on Picture-in-Picture window size.
    }

I’d suggest you don’t hook directly to the resize event as each small change
made to the Picture-in-Picture window size will fire a separate event that may
cause performance issues if you’re doing an expensive operation at each resize.
I’d recommend using common techniques such as [throttling and debouncing] to
address this problem.

### Feature support {: #feature-support }

The Picture-in-Picture Web API may not be supported, so you have to detect this
to provide a progressive enhancement to all your users visiting your website.
Even when it is supported, it may be turned off by the user or [disabled by a
feature policy]. Luckily, you can use the new boolean
`document.pictureInPictureEnabled` to determine this.

    if (!('pictureInPictureEnabled' in document)) {
      console.log('The Picture-in-Picture Web API is not available.');
    }
    else if (!document.pictureInPictureEnabled) {
      console.log('The Picture-in-Picture Web API is disabled.');
    }

Applied to a specific button element for a video, this is how you may want to
handle your Picture-in-Picture button visibility.

    if ('pictureInPictureEnabled' in document) {
      // Set button ability depending on whether Picture-in-Picture can be used.
      setPipButton();
      videoElement.addEventListener('loadedmetadata', setPipButton);
      videoElement.addEventListener('emptied', setPipButton);
    } else {
      // Hide button if Picture-in-Picture is not supported.
      pipButtonElement.hidden = true;
    }

    function setPipButton() {
      pipButtonElement.disabled = (videoElement.readyState === 0) ||
                                  !document.pictureInPictureEnabled ||
                                  videoElement.disablePictureInPicture;
    }

## Samples / demos / codelabs {: #samples-demos-codelabs }

Check out our official [Picture-in-Picture sample] to try the Picture-in-Picture
Web API.

Demos and codelabs will follow.

## What’s next {: #next }

First, check out the [implementation status page] to know which parts of the
API are currently implemented in Chrome and other browsers.

Here's what you can expect to see in a near future:

- Picture-in-Picture will be supported on Android O.
- MediaStreams (WebRTC) will work with Picture-in-Picture.
- Web developers will be able to [add custom Picture-in-Picture controls].

## Resources {: #resources }

- Chrome Feature Status: [https://www.chromestatus.com/feature/5729206566649856]
- Chrome Implementation Bugs: [https://crbug.com/?q=component:Blink>Media>PictureInPicture]
- Picture-in-Picture Web API Spec: [https://wicg.github.io/picture-in-picture]
- Spec Issues: [https://github.com/WICG/picture-in-picture/issues]
- Sample: [https://googlechrome.github.io/samples/picture-in-picture/]
- Unofficial Picture-in-Picture polyfill: [https://github.com/gbentaieb/pip-polyfill/]

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="5azRhKsSU_M"
          data-start="714" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Many thanks to Mounir Lamouri and [Jennifer Apacible] for their work on
Picture-in-Picture, and help with this article. And a huge thanks to everyone
involved in the [standardization effort].

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

[Picture-in-Picture Web API]: https://wicg.github.io/picture-in-picture/
[Picture-in-Picture sample]: https://googlechrome.github.io/samples/picture-in-picture/
[WebKit API]: https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_9_0.html
[native Android API]: https://developer.android.com/about/versions/oreo/android-8.0#opip
[announced our intent]: https://developers.google.com/web/updates/2017/09/picture-in-picture
[yet]: https://bugs.chromium.org/p/chromium/issues/detail?id=789591
[promise]: https://developers.google.com/web/fundamentals/primers/promises
[may reject]: https://wicg.github.io/picture-in-picture/#request-pip
[Feature support]: #feature-support
[feature policy]: https://github.com/WICG/feature-policy/blob/gh-pages/features.md#picture-in-picture
[throttling and debouncing]: https://css-tricks.com/debouncing-throttling-explained-examples/
[user may have turned it off]: https://support.google.com/youtube/answer/7552722
[disabled by a feature policy]: https://github.com/WICG/feature-policy/blob/gh-pages/features.md#picture-in-picture
[implementation status page]: https://github.com/WICG/picture-in-picture/blob/master/implementation-status.md
[add custom Picture-in-Picture controls]: https://github.com/WICG/picture-in-picture/pull/69
[https://www.chromestatus.com/feature/5729206566649856]: https://www.chromestatus.com/feature/5729206566649856
[https://crbug.com/?q=component:Blink>Media>PictureInPicture]: https://crbug.com/?q=component:Blink>Media>PictureInPicture
[https://wicg.github.io/picture-in-picture]: https://wicg.github.io/picture-in-picture
[https://github.com/WICG/picture-in-picture/issues]: https://github.com/WICG/picture-in-picture/issues
[https://googlechrome.github.io/samples/picture-in-picture/]: https://googlechrome.github.io/samples/picture-in-picture/
[https://github.com/gbentaieb/pip-polyfill/]: https://github.com/gbentaieb/pip-polyfill/
[standardization effort]: https://github.com/WICG/picture-in-picture/issues?utf8=%E2%9C%93&q=
[Jennifer Apacible]: https://twitter.com/japacible
