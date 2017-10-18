project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 63 to help you plan. In this version, security improvements, further webkit deprecations, and more.

{# wf_updated_on: 2017-10-23 #}
{# wf_published_on: 2017-10-23 #}
{# wf_tags: deprecations,removals,chrome63 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 63 to help you plan. In this version, more restrictions on insecure origins and a change to the shadow-piercing descendant combinator. #}

# Deprecations and Removals in Chrome 63 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 63,
which is in beta as of September 14. This list is subject to change at any time.

## Security and privacy

## CSS

## JavaScript and APIs

### Remove getMatchedCSSRules()

The getMatchedCSSRules() method is a webkit-only API to get a list of all the
style rules applied to a particular element.

### Remove RTCRtcpMuxPolicy of "negotiate"

The `rtcpMuxPolicy` is used by Chrome to specify its preferred policy regarding
use of RTP/RTCP multiplexing. In Chrome 57, we changed the default
`rtcpMuxPolicy` to "require" and deprecated "negotiate" for following reasons:

* Non-muxed RTCP uses extra network resources.
* Removing "negotiate" will make the API surface simpler, since an
  "RtpSender"/"RtpReceiver" will then only ever have a single transport.

In Chrome 63, "negotiate" is removed.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/OP2SGSWF5lo/discussion) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=685727)


<<../../_deprecation-policy.md>>

{% include "comment-widget.html" %}
