project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.

{# wf_published_on: 2017-04-03 #}
{# wf_updated_on: 2017-04-03 #}

# [WIP] Mobile Web Video Playback {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

How do you create the best mobile media experience on the Web? Easy! It all
depends on user engagement and the importance you give to the media on a web
page. I think we all agree that a web page where video is THE reason of user's
visit will have to feature an immersive and re-engaging user experience.

The goal here is to show you how to enhance in progressive way your media
experience and make it more immersive thanks to a plethora of Web APIs. That's
why we're going to build a complete mobile player experience with custom
controls, fullscreen, and background playback.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.


## Custom controls 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.


## Fullscreen

Here we're going to take advantage of the Fullscreen API, the Screen
Orientation API, and the Device Orientation API. Obviously, you don't have to
use all of them: Just pick the ones that make sense and create your own
features by combining these abilities.

Note: I'll use a [tiny shim] for the Fullscren API in code snippets below that
will take care of prefixes as the API is not unprefixed yet at that time.

### Do not automatically enter fullscreen mode when playback begins.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.

<pre class="prettyprint lang-html">
&lt;div id="videoContainer"&gt;
  &lt;div id="videoControls"&gt;
    &lt;button id="playButton">&lt;/button&gt;
    &lt;button id="fullscreenButton">&lt;/button&gt;
  &lt;/div&gt;
  &lt;video id="videoElement" <strong>playsinline</strong>&gt;&lt;/video&gt;
&lt;/div&gt;
</pre>

<div class="clearfix"></div>
<div class="attempt-left">
  <figure>
    <img src="http://placehold.it/660x440?text=iOS screenrecord without playsinline" alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.">
    <figcaption>Without <code>playsinline</code> on iOS</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="http://placehold.it/660x440?text=iOS screenrecord with playsinline" alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.">
    <figcaption>With <code>playsinline</code> on iOS</figcaption>
  </figure>
</div>
<div class="clearfix"></div>

### Toggle fullscreen on button click
 
<div class="attempt-right">
<figure>
  <img src="http://placehold.it/660x440?text=Android screenrecord" alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.">
  <figcaption>Toggle fullscreen on button click</figcaption>
</figure>
</div>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.

<div class="clearfix"></div>

    toggleFullscreenButton.addEventListener('click', function() {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        requestFullscreenVideo();
      }
    });
  
    function requestFullscreenVideo() {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else {
        video.webkitEnterFullscreen();
      }
    }

### Automatically fullscreen when device is in landscape mode

<div class="attempt-right">
<figure>
  <img src="http://placehold.it/660x440?text=Android screenrecord" alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.">
  <figcaption>Automatically fullscreen when device is in landscape mode</figcaption>
</figure>
</div>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.

<div class="clearfix"></div>

    if ('orientation' in screen) {
      screen.orientation.addEventListener('change', function() {
        // Let's request fullscreen if user switches device in landscape mode.
        if (screen.orientation.type.startsWith('landscape')) {
          // Note: It may silently fail in browsers that don't allow requesting
          // fullscreen from the orientation change event.
          // https://github.com/whatwg/fullscreen/commit/e5e96a9
          requestFullscreenVideo();
        } else if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      });
    }

### Lock screen in landscape when user presses fullscreen button

<div class="attempt-right">
<figure>
  <img src="http://placehold.it/660x440?text=Android screenrecord" alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.">
  <figcaption>Lock screen in landscape when user presses fullscreen button</figcaption>
</figure>
</div>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.

<div class="clearfix"></div>

<pre class="prettyprint">
toggleFullscreenButton.addEventListener('click', function() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    requestFullscreenVideo();
    <strong>lockScreenInLandscape();</strong>
  }
});
</pre>
<pre class="prettyprint">
function lockScreenInLandscape() {
  if (!('orientation' in screen)) {
    return;
  }
  // Let's force landscape mode only if device is in portrait mode and can be held in one hand.
  if (matchMedia('(orientation: portrait) and (max-device-width: 768px)').matches) {
    screen.orientation.lock('landscape');
  }
}
</pre>

### Unlock screen automatically based on device orientation

<div class="attempt-right">
<figure>
  <img src="http://placehold.it/660x440?text=Android screenrecord" alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.">
  <figcaption>Unlock screen automatically based on device orientation</figcaption>
</figure>
</div>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.

<div class="clearfix"></div>

<pre class="prettyprint">
function lockScreenInLandscape() {
  if (!('orientation' in screen)) {
    return;
  }
  // Let's force landscape mode only if device is in portrait mode and can be held in one hand.
  if (matchMedia('(orientation: portrait) and (max-device-width: 768px)').matches) {
    screen.orientation.lock('landscape')<strong>.then(function() {
      // When screen is locked in landscape while user holds device in
      // portrait, let's use the Device Orientation API to unlock screen only
      // when it is appropriate to create a perfect and seamless experience.
      listenToDeviceOrientationChanges();
    })</strong>;
  }
}
</pre>
<pre class="prettyprint">
function listenToDeviceOrientationChanges() {
  if (!('DeviceOrientationEvent' in window)) {
    return;
  }
  var previousDeviceOrientation, currentDeviceOrientation;
  window.addEventListener('deviceorientation', function onDeviceOrientationChange(event) {
    // event.beta represents a front to back motion of the device and
    // event.gamma a left to right motion.
    if (Math.abs(event.gamma) > 10 || Math.abs(event.beta) < 10) {
      previousDeviceOrientation = currentDeviceOrientation;
      currentDeviceOrientation = 'landscape';
      return;
    }
    if (Math.abs(event.gamma) < 10 || Math.abs(event.beta) > 10) {
      previousDeviceOrientation = currentDeviceOrientation;
      // When device is rotated back to portrait, let's unlock screen orientation.
      if (previousDeviceOrientation == 'landscape') {
        screen.orientation.unlock();
        window.removeEventListener('deviceorientation', onDeviceOrientationChange);
      }
    }
  });
}
</pre>


## Background playback

When you detect a web page or a video in the web page is not visible anymore,
you may want to update your analytics to reflect this. This could also
affect the current playback as in picking a different track for instance.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.

### Pause video when page becomes hidden

With the Page Visibility API, we can determine the current visibility of a page
and be notified of visibility changes. Code below pauses video when page is
hidden. It happens when you switch tabs or screen lock is active for instance.

    document.addEventListener('visibilitychange', function() {
      // Pause video when page becomes hidden.
      if (document.hidden) {
        video.pause();
      }
    });

### Show/hide mute button based on video visibility in the page.

If you use the new IntersectionObserver API, you can be even more granular at
no cost. This API lets you know when an observed element enters or exits the
browser's viewport. Code snippet below will show/hide a mute button
based on the video visibility in the page. If video is playing but not
currently visible, we'll show a mini mute button in the bottom right
corner of the page to give user control over video sound.

    if ('IntersectionObserver' in window) {
      // Show/hide mute button based on video visibility in the page.
      var observer = new IntersectionObserver(function(entries) {
        muteButton.hidden = video.paused || entries[0].isIntersecting;
      });
      observer.observe(video);
    }
  
    muteButton.addEventListener('click', function() {
      // Mute/unmute when users clicks this button.
      video.muted = !video.muted;
    });

### Customize Media Notifications

When your web app is playing audio or video, you can already see a media
notification sitting in the notification tray. On Android, Chrome does its best
to show appropriate information by using the document's title and the largest
icon image it can find.

<div class="clearfix"></div>
<div class="attempt-left">
  <figure>
    <img src="/web/updates/images/2017/02/without-media-session.png" alt="Without media session">
    <figcaption>Without media session</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="/web/updates/images/2017/02/with-media-session.png" alt="With media session">
    <figcaption>With media session</figcaption>
  </figure>
</div>
<div class="clearfix"></div>

Let's see how to customize this media notification by setting some media
session metadata such as the title, artist, album name, and artwork with the
Media Session API.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.

    playButton.addEventListener('click', function() {
      video.play()
      .then(_ => { setMediaSession(); })
      .catch(error => { console.log(error); });
    });

    function setMediaSession() {
      if (!('mediaSession' in navigator)) {
        return;
      }
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Never Gonna Give You Up',
        artist: 'Rick Astley',
        album: 'Whenever You Need Somebody',
        artwork: [
          { src: 'https://dummyimage.com/96x96',   sizes: '96x96',   type: 'image/png' },
          { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
          { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
          { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
          { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
          { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
        ]
      });
    }

Once playback is done, you don't have to "release" the media session as the
notification will automatically disappear. Keep in mind that current
`navigator.mediaSession.metadata` will be used when any playback starts. This
is why you need to update it to make sure you're always showing relevant
information in the media notification.

### Handle playlists

If your web app provides a playlist, you may want to allow the user to navigate
through your playlist directly from the media notification with some "Previous
Track" and "Next Track" icons.

    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('previoustrack', function() {
        // User clicked "Previous Track" media notification icon.
        playPreviousVideo(); // load and play previous video
      });
      navigator.mediaSession.setActionHandler('nexttrack', function() {
        // User clicked "Next Track" media notification icon.
        playNextVideo(); // load and play next video
      });
    }
    
Note that media action handlers will persist. This is very similar to the event
listener pattern except that handling an event means that the browser stops
doing any default behaviour and uses this as a signal that your web app
supports the media action. Hence, media action controls won't be shown unless
you set the proper action handler.

By the way, unsetting a media action handler is as easy as assigning it to `null`.

The Media Session API allows you to show "Seek Backward" and "Seek Forward"
media notification icons if you want to control the amount of time skipped.

    if ('mediaSession' in navigator) {
      let skipTime = 10; // Time to skip in seconds
      
      navigator.mediaSession.setActionHandler('seekbackward', function() {
        // User clicked "Seek Backward" media notification icon.
        video.currentTime = Math.max(video.currentTime - skipTime, 0);
      });
      navigator.mediaSession.setActionHandler('seekforward', function() {
        // User clicked "Seek Forward" media notification icon.
        video.currentTime = Math.min(video.currentTime + skipTime, video.duration);
      });
    }

The "Play/Pause" icon is always shown in the media notification and the related
events are handled automatically by the browser. If for some reason the default
behaviour doesn't work out, you can still [handle "Play" and "Pause" media
events].

The cool thing about the Media Session API is that the notification tray is not
the only place where media metadata and controls are visible. The media
notification is synced automagically to any paired wearable device. And it also
shows up on lock screens.

<div class="clearfix"></div>
<div class="attempt-left">
  <figure>
    <img src="/web/updates/images/2017/02/lock-screen.png" alt="Lock Screen">
    <figcaption>
      Lock Screen - 
      <a href="https://wikipedia.org/wiki/Rick_Astley#/media/File:Rick_Astley_Tivoli_Gardens.jpg">
        Photo
      </a>
      by Michael Alø-Nielsen / 
      <a href="https://creativecommons.org/licenses/by/2.0/">
        CC BY 2.0
      </a>
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="/web/updates/images/2017/02/wear.png" alt="Wear Notification">
    <figcaption style="text-align: center">Wear Notification</figcaption>
  </figure>
</div>
<div class="clearfix"></div>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut tellus sit amet elit ultricies malesuada. Vestibulum consequat et ex ut mollis. Aliquam et malesuada ante. Phasellus ac tincidunt elit, at cursus mi. Aenean orci nulla, dictum non dapibus sed, ultricies sit amet purus. Sed quis turpis velit. Phasellus mollis ultrices iaculis.

[tiny shim]: https://github.com/beaufortfrancois/sandbox/blob/gh-pages/media/tiny-fullscreen-shim.js
[handle "Play" and "Pause" media events]: /web/updates/2017/02/media-session#play_pause
