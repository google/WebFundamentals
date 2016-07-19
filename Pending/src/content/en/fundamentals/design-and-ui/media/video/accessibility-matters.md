


<p class="intro">
  Accessibility isn't a feature. Users who can't hear or see won't be able to experience a video at all without captions or descriptions. The time it takes to add these to your video is much less than the bad experience you are delivering to users. Provide at least a base experience for all users.
</p>



## Include captions to improve accessibility

To make media more accessible on mobile, include captions or descriptions
using the track element.

{% include shared/remember.liquid title="Remember" list=page.notes.accessibility-matters %}

Using the track element, captions appear like this:

<img alt="Screenshot showing captions displayed using the track element in Chrome on Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Add track element

It's very easy to add captions to your video &ndash; simply add a track element as a child of the video element:

{% include_code src=_code/track.html snippet=track lang=html %}

The track element `src` attribute gives the location of the track file.

## Define captions in track file

A track file consists of timed 'cues' in WebVTT format:

    WEBVTT

    00:00.000 --> 00:04.000
    Man sitting on a tree branch, using a laptop.

    00:05.000 --> 00:08.000
    The branch breaks, and he starts to fall.

    ...





