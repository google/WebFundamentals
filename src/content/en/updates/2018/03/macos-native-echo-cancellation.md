project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Using the native macOS echo canceller in Chrome

{# wf_updated_on: 2018-03-23 #}
{# wf_published_on: 2018-03-23 #}
{# wf_featured_image: /web/updates/images/generic/audio.png #}
{# wf_tags: chrome66,webrtc,getusermedia #}
{# wf_featured_snippet:  Since version 10.12 (Sierra), macOS includes a native echo canceller. Here's how you can try it out in Chrome! #}
{# wf_blink_components: Blink>WebRTC>Audio #}

# macOS native echo cancellation {: .page-title }

{% include "web/_shared/contributors/ossu.html" %}

Since version 10.12 (Sierra), macOS includes a native echo canceller. Usage of
it can be experimentally enabled in Chrome M66 by opting in to an [Origin
Trial](https://bit.ly/OriginTrials) or by supplying a command line flag when
starting Chrome; [see below](#heading-experiment).

With the experiment enabled, the macOS native echo canceller will be used for
getUserMedia streams with the `echoCancellation` constraint enabled. On other
platforms, and on earlier versions of macOS, enabling the experiment will
effectively do nothing; the same echo canceller will be used as before (usually
the software one from WebRTC).

## Why are we doing this?

We want to evaluate the performance of the macOS native echo canceller. Being an
Apple developed component, it has the opportunity to be specifically tuned for
their hardware. Its placement in the audio pipeline should also make it less
sensitive to certain audio glitches that can happen in Chrome.

## What is an echo canceller?

An echo canceller tries to remove from the microphone signal any sound played
out on the speakers. Without this, what you're saying as one party of a call,
will be picked up by the microphone of the other parties and then sent back to
you. You'll hear an echo of yourself!

## How to enable the experiment {: #heading-experiment }

To get this new behavior on your site, your need to be [signed
up](http://bit.ly/OriginTrialSignup){: .external} for the "macOS native echo
cancellation" Origin Trial. If you just want to try it out locally, the
experiment can be enabled on the command line:

    chrome --enable-blink-features=ExperimentalHardwareEchoCancellation

Passing this flag on the command line enables the feature globally in Chrome for
the current session.

With this experiment, we want to evaluate any qualitative differences when using
the macOS native echo canceller, like:

* How well does it cancel echo?
* How well does it handle double talk scenarios - i.e. when both sides are
  talking at the same time?
* Does it negatively affect audio quality when there is no echo to cancel?
* Do certain audio devices (like headsets) cause problems?
* etc.

We're also interested in how Chrome interacts with other applications when using
the native echo canceller on macOS, as well as any stability issues or other
problems with the implementation.

If you're trying this out, please file your feedback in [this
bug](https://bugs.chromium.org/p/chromium/issues/detail?id=822667){: .external}.
If possible, include what hardware was used (macOS version, hardware model,
microphone / headset / etc.). If doing more large-scale experiments, links to
comparative statistics on audio call quality are appreciated; whether objective
or subjective.

{% include "comment-widget.html" %}
