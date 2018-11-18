project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 63 to help you plan. In this version, new behavior on interface properties, removal of a webkit function, and a change to RTCRtcpMuxPolicy.

{# wf_updated_on: 2017-12-14 #}
{# wf_published_on: 2017-10-23 #}
{# wf_tags: deprecations,removals,chrome63 #}
{# wf_blink_components: Blink>Bindings,Blink>CSS,Blink>WebRTC>Network #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 63 to help you plan. In this version, new behavior on interface properties, removal of a webkit function, and a change to <code>RTCRtcpMuxPolicy</code>. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 63 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes some of the deprecations and removals in
Chrome 63, which is in beta as of October 26. Visit the
[deprecations page](/web/updates/tags/deprecations)
for more deprecations and removals from this and previous versions of Chrome.
This list is subject to change at any time.

## Interface properties with a Promise type no longer throw exceptions

Interface properties and functions that return a promise have been inconsistent
about whether error conditions throw exceptions or reject, which would invoke a
promise's `catch()` block. The current version of the [IDL
spec](https://heycam.github.io/webidl/)
calls for all promise-returning properties and functions to reject rather than
throw an exception.

For example, previously, a call to `MediaKeySession.closed` would throw a
`TypeError` for illegal invocation if called at the wrong time. With this change
such calls must now implement a `catch()` block.

This change brings Chrome inline with the specification. This change has already
been made for functions.

[Chromestatus Tracker](https://www.chromestatus.com/features/5654995223445504) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=758023)

## Remove getMatchedCSSRules()

The getMatchedCSSRules() method is a webkit-only API to get a list of all the
style rules applied to a particular element. Webkit has an [open bug to remove
it](https://bugs.webkit.org/show_bug.cgi?id=79653). For these reasons it is
removed from Chrome in version 63. Developers who need this functionality can
look at [this Stackoverflow post](https://stackoverflow.com/questions/2952667/find-all-css-rules-that-apply-to-an-element)

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/-_Al0I5Rm9Q/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4606972603138048) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=437569&desc=2)

## Remove RTCRtcpMuxPolicy of "negotiate"

The `rtcpMuxPolicy` is used by Chrome to specify its preferred policy regarding
use of RTP/RTCP multiplexing. In Chrome 57, we changed the default
`rtcpMuxPolicy` to "require" and deprecated "negotiate" for following reasons:

* Non-muxed RTCP uses extra network resources.
* Removing "negotiate" will make the API surface simpler, since an
  "RtpSender"/"RtpReceiver" will then only ever have a single transport.

In Chrome 63, "negotiate" is removed.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/OP2SGSWF5lo/discussion) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=685727)


{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "comment-widget.html" %}
