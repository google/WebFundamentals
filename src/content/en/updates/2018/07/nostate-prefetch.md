project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome 63 shipped with NoState Prefetch. NoState Prefetch is a mechanism for fetching resources in advance that uses less memory than the deprecated prerendering process.

{# wf_updated_on: 2018-07-19 #}
{# wf_published_on: 2018-07-20 #}
{# wf_tags: performance, chrome63 #}
{# wf_blink_components: Blink>PerformanceAPIs #}
{# wf_featured_image: /web/updates/images/2018/07/nostate-prefetch.png #}
{# wf_featured_snippet: Chrome 63 shipped with NoState Prefetch. NoState Prefetch is a mechanism for fetching resources in advance that uses less memory than the deprecated prerendering process. #}

# Introducing NoState Prefetch {: .page-title }

{% include "web/_shared/contributors/katiehempenius.html" %}

## Intro {: #intro }

NoState Prefetch is a new mechanism in Chrome that is an alternative to the deprecated 
prerendering process. Like prerendering, it fetches resources in advance; but unlike prerendering 
it does not execute JavaScript or render any part of the page in advance. The goal of NoState 
Prefetch is to use less memory than prerendering, while still reducing page load times.

NoState Prefetch is not an API but rather a mechanism used by Chrome to implement various APIs 
and features. The [Resource Hints API](https://www.w3.org/TR/resource-hints/), as well as the 
prefetching of pages by the Chrome address bar, are both 
implemented using NoState Prefetch. If you’re using Chrome 63 or later, your browser is already 
using NoState Prefetch.

This article explains how NoStatePrefetch works, the motivations for introducing it, and 
instructions for using Chrome's histograms to view stats about its usage.

## Motivation {: #motivation }

There were two primary motivations for introducing NoState Prefetch:

**Reduce memory usage**

NoState Prefetch only uses ~45MiB of memory. Maintaining the preload scanner is the primary 
memory expense for NoState Prefetch and this cost remains relatively constant across different 
use cases. Increasing the size or volume of fetches does not have a significant effect on the 
amount of memory consumed by NoState Prefetch.

By contrast, prerendering typically consumes 100MiB of memory and memory consumption is capped at 
150MiB. This high memory consumption makes it unsuitable for low-end (i.e. <= 512MB of RAM) 
devices. As a result, Chrome does not do prerendering on low-end devices and instead will 
[preconnect](https://www.w3.org/TR/resource-hints/#dfn-preconnect).

**Facilitate support of new web platform features**

With prerendering, no user-facing (e.g., playing music or video) or stateful actions (e.g., 
mutating session or local storage) should occur. However, it can be difficult and complex to 
prevent these actions from occurring while rendering a page. NoState Prefetch only fetches 
resources in advance: it does not execute code or render the page. This makes it simpler to 
prevent user-facing and stateful actions from occurring.

## Implementation

The following steps explain how NoState Prefetch works.

 1. **NoStatePrefetch is triggered.**

      A prerender resource hint (i.e. `<link rel=”prerender”>`) and some Chrome features will 
      trigger NoState Prefetch provided that the following two conditions are met: a) the user is 
      not on a low-end device, and b) the user is not on a cellular network.

 2. **A new, dedicated renderer is created for the NoState Prefetch.**

      In Chrome, a 
      “[renderer](https://www.chromium.org/developers/design-documents/multi-process-architecture)” 
      is a process responsible for taking a HTML document, parsing it, 
      constructing its render tree, and painting the result to the screen. Each tab in Chrome, as 
      well as each NoState Prefetch process, has its own renderer to provide isolation. This 
      helps minimize the effects of something going wrong (e.g., a tab crashing) as well as 
      prevent malicious code from accessing other tabs or other parts of the system.
 
3. **The resource that is being loaded with NoState Prefetch is fetched. The HTMLPreloadScanner 
then scans this resource to discover any subresources that need to be fetched.**
   
      If the main resource or any of its subresources has a registered service worker, these requests will go through the appropriate service worker.
   
      NoState Prefetch only supports the GET HTTP method; it will not fetch any subresources that 
      require the use of other HTTP methods. Additionally, it will not fetch any resources that 
      require user actions (e.g., auth popups, SSL client certificate, or manual overrides).
   
4. **Subresources that are fetched will be fetched with an “IDLE” Net Priority.**
   
      The “IDLE” Net Priority is the lowest possible Net Priority in Chrome.
   
5. **All resources retrieved by the NoState Prefetch are cached according to their cache headers.**

      NoState Prefetch will cache all resources except those with the `no-store` Cache-Control 
      header. A resource will be revalidated before use if there is a `Vary` response header, 
      `no-cache` Cache-Control header, or if the resource is more than 5 minutes old.
   
6. **The renderer is killed after all subresources are loaded.**
   
      If subresources time out, the renderer will be killed after 30 seconds.
   
7. **The browser does not make any state modifications besides updating the cookie store and the 
local DNS cache.**
   
      It’s important to call this out because this is the “NoState” in “NoState Prefetch”.
   
      At this point in the “normal” page load process, the browser would probably do things that 
      would modify the browser state: for example, executing JavaScript, mutating sessionStorage 
      or localStorage, playing music or videos, using the History API, or prompting the user. The 
      only state modifications that occur in NoState Prefetch are the updating of the DNS cache 
      when responses arrive and the updating of the cookie store if a response contains the 
      `Set-Cookie` header.
   
8. **When the resource is needed, it is loaded into the browser window.**
   
      However, unlike a prerendered page, the page won't be immediately visible - it still needs 
      to be rendered by the browser. The browser will not reuse the renderer it used for the 
      NoState Prefetch and will instead use a new renderer. Not rendering the page in advance 
      reduces the memory consumption of NoStatePrefetch, but it also lessens the possible impact 
      it can have on page load times.
   
      If the page has a service worker, this page load will go through the service worker again.
   
      If NoState Prefetch has not finished fetching subresources by the time the page is needed, 
      the browser will continue with the page load process from where NoState Prefetch left off. 
      The browser will still need to fetch resources, but not as many as would be necessary if 
      NoState Prefetch had not been initiated.
   
## Impact on Web Analytics {: #web-analytics }

Pages loaded using NoState Prefetch are registered by web analytics tools at slightly different 
times depending on whether the tool collects data on the client-side or the server-side.

Client-side analytics scripts register a pageview when the page is shown to the user. These 
scripts rely on the execution of JavaScript and NoState Prefetch does not execute any JavaScript.

Server-side analytics tools register metrics when a request is handled. For resources loaded via 
NoState Prefetch, there can be a significant gap of time between when a request is handled and 
when the response is actually used by the client (if it is used at all). Currently, there is no 
server-side mechanism for determining whether a request was made via NoStatePrefetch.

## Check it out {: #check-it-out }

NoStatePrefetch shipped in December 2017 in Chrome 63. It's currently used to:

* Implement the `prerender` resource hint
* Fetch the first result in Google Search results
* Fetch pages that the Chrome address bar predicts are likely to be visited next

You can use the Chrome Internals to see how you’ve been using NoStatePrefetch.

To view the list of sites that have been loaded with NoState Prefetch, go to 
*chrome://net-internals/#prerender*.

To view stats on your NoState Prefetch usage, go to *chrome://histograms* and search for 
“NoStatePrefetch”. There are three different NoState Prefetch histograms - one for each use case 
of NoState Prefetch:

* “NoStatePrefetch” (stats for usage by prerender resource hints)
* “gws_NoStatePrefetch” (stats for usage by the Google search results page)
* “omnibox_NoStatePrefetch” (stats for usage by the Chrome address bar)


{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}