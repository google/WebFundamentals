project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Accessibility isn't a feature.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2014-04-15 #}

# Accessibility matters {: .page-title }

{% include "_shared/contributors/samdutton.html" %}

Accessibility isn't a feature. Users who can't hear or see won't be able to experience a video at all without captions or descriptions. The time it takes to add these to your video is much less than the bad experience you are delivering to users. Provide at least a base experience for all users.


## Include captions to improve accessibility

To make media more accessible on mobile, include captions or descriptions
using the track element.

<!-- TODO: Verify note type! -->
Note: The track element is supported on Chrome for Android, iOS Safari, and all current browsers on desktop except Firefox (see <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>). There are several polyfills available too. We recommend <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> or <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.

Using the track element, captions appear like this:

<img alt="Screenshot showing captions displayed using the track element in Chrome on Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Add track element

It's very easy to add captions to your video &ndash; simply add a track element as a child of the video element:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

The track element `src` attribute gives the location of the track file.

## Define captions in track file

A track file consists of timed 'cues' in WebVTT format:

    WEBVTT

    00:00.000 --> 00:04.000
    Man sitting on a tree branch, using a laptop.

    00:05.000 --> 00:08.000
    The branch breaks, and he starts to fall.

    ...


