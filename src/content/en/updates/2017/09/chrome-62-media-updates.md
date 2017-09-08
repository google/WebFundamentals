project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the media updates in Chrome 62.

{# wf_updated_on: 2017-09-08 #}
{# wf_published_on: 2017-09-08 #}
{# wf_tags: news,chrome62,media #}
{# wf_featured_image: /web/updates/images/generic/play-outline.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Blink>Media #}

# Media Updates in Chrome 62 {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

- TODO: Media preload defaults to metadata
- TODO: Support for Offline DRM Licenses on Android
- [Videos played in the background](#background-video-optimizations) get a
  special treatment.
- Web developers can [customize seekable range](#seekable)
  on live MSE streams.
- Chrome now supports [FLAC in MP4 with MSE](#flac-in-mp4-with-mse).

## Background video optimizations {: #background-video-optimizations }

The chrome team is always trying to find new ways to improve battery life and
Chrome 62 is no exception:

1. Chrome now disables video tracks when the video is played in the background
if the video uses [Media Source Extensions (MSE)]. Check out our past
[Background video track optimizations (MSE only)] article to learn more.
2. If the video doesn't use MSE and has no audio tracks, the video will now be
automatically paused when played in the background on desktop. It has been the
case on mobile since Chrome 57 (January 2017).

## Customize seekable range on live MSE streams {: #seeakble }

As you may already know, the <code>seekable</code> attribute contains the ranges
of the media resource to which browser can seek. Typically, it contains a single
time range which starts at 0 and ends at the media resource duration. If the
duration is not available though, such as a live stream, the time range may
continuously change.

The good news is that we can now more effectively customize the
<code>seekable</code> range logic with [Media Source Extensions (MSE)] by
providing or removing a single seekable range that is union'ed with the current
buffered ranges. It results in a single seekable range which fits both, when
the media source duration is <code>+Infinity</code>.

In this code below, the media source has already been attached to a media
element and contains only its init segment:

    const mediaSource = new MediaSource();
    ...

    mediaSource.duration = +Infinity;
    // Seekable time ranges: { }
    // Buffered time ranges: { }

    mediaSource.setLiveSeekableRange(1 /* start */, 4 /* end */);
    // Seekable time ranges: { [1.000, 4.000) }
    // Buffered time ranges: { }
    
    // Let's append a media segment that starts at 3 seconds and ends at 6.
    mediaSource.sourceBuffers[0].appendBuffer(someData);
    // Seekable time ranges: { [1.000, 6.000) }
    // Buffered time ranges: { [3.000, 6.000) }

    mediaSource.clearLiveSeekableRange();
    // Seekable time ranges: { [0.000, 6.000) }
    // Buffered time ranges: { [3.000, 6.000) }

There are many cases that I  didn't cover above so I'd suggest you give a try
to [the official sample] to see how buffered and seekable time ranges react to different
MSE events.

[Intent to Ship](https://groups.google.com/a/chromium.org/d/msg/blink-dev/-LTXhyDzS_E/LfjqN71kAAAJ) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5671401352593408) &#124;
[Chromium Bug](https://crbug.com/623698)

## FLAC in MP4 for MSE {: #flac-in-mp4-with-mse }

The lossless audio coding format [FLAC] has been supported in regular media
playback since Chrome 56. FLAC in ISO-BMFF support (aka FLAC in MP4) has been
added shortly after. And now FLAC in MP4 is available in Chrome 62 for 
[Media Source Extensions (MSE)].

For info, Firefox folks are the ones who developed and implemented support for
a [FLAC in MP4 encapsulation spec], and the BBC has been experimenting with
using that with MSE. You can read the BBC's ["Delivering Radio 3 Concert
Sound"] post to learn more.

So, here's one way to detect if FLAC in MP4 is supported for MSE:

    if (MediaSource.isTypeSupported('audio/mp4; codecs="flac"')) {
      // TODO: Fetch data and feed it to a media source.
    }

If you want to see a full example, check out [our official sample].

[Intent to Ship](https://groups.google.com/a/chromium.org/d/msg/blink-dev/ntoLfR7rbmE/3R1DQoBSAAAJ) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5713014258925568) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=666000)

{% include "comment-widget.html" %}

[Background video track optimizations (MSE only)]: /web/updates/2017/07/chrome-61-media-updates#background-video-track-optimizations
[the official sample]: https://googlechrome.github.io/samples/media/live-seekable-range.html
[FLAC]: https://xiph.org/flac/
[Media Source Extensions (MSE)]: /web/fundamentals/media/mse/seamless-playback
[FLAC in MP4 encapsulation spec]: https://github.com/xiph/flac/blob/master/doc/isoflac.txt
["Delivering Radio 3 Concert Sound"]: http://www.bbc.co.uk/rd/blog/2017-04-radio-3-high-quality-flac-dash
[our official sample]: https://googlechrome.github.io/samples/media/flac-in-mp4-for-mse.html
