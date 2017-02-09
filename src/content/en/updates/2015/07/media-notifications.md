project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: When audio or video is playing on a web page, a notification showing the page title and a play/pause button is displayed in the notification tray and on the lock screen. The notification can be used to pause/resume play or return to the page playing the media.

{# wf_updated_on: 2017-07-09 #}
{# wf_published_on: 2015-07-20 #}
{# wf_tags: news,audio,video,android,media,notifications #}

# Media playback notifications for Chrome on Android {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

Chrome 45 Beta introduces a handy new feature for controlling audio and video playback.

When an audio or video element is playing on a web page, a notification showing the page title and a play/pause button is displayed in the notification tray and on the lock screen. The notification can be used to pause or resume play, and to quickly return to the page that is playing the media.

Great for controlling music apps and for many other audio and video use cases.

<div class="clearfix"></div>
<div class="attempt-left">
  <figure>
    <img src="/web/updates/images/2015-07-21-media-notifications/notification-over-web-page.gif" alt="Notification displayed over a web page">
    <figcaption>Notification displayed over a web page</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="/web/updates/images/2015-07-21-media-notifications/notification-over-lock-screen.gif" alt="Notification displayed over the Android lock screen">
    <figcaption>Notification displayed over the Android lock screen</figcaption>
  </figure>
</div>
<div class="clearfix"></div>

The screencast below shows the process of displaying a notification and controlling video playback on a web page:

<p style="text-align: center;">
  <video controls poster="/web/updates/videos/2015-07-21-media-notifications/poster.jpg">
    <source src="/web/updates/videos/2015-07-21-media-notifications/media-notifications.webm" type="video/webm" />
    <source src="/web/updates/videos/2015-07-21-media-notifications/media-notifications.mp4" type="video/mp4" />
  </video>
</p>

Note that:

* Notifications are only shown for media over five seconds in length.
* There is no notification for audio from the Web Audio API unless it is played back via an audio element.

With the [Media Session API](/web/updates/2017/02/media-session), you can
customize media notifications by providing metadata for the media your web app
is playing. This API also allows you to handle media related events such as
seeking or track changing which may come from notifications or media keys.

{% include "comment-widget.html" %}
