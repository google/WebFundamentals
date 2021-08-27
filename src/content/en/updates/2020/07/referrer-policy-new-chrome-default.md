project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A new default Referrer-Policy for Chrome: strict-origin-when-cross-origin

{# wf_published_on: 2020-07-30 #}
{# wf_updated_on: 2020-07-31 #}
{# wf_featured_image: /web/updates/images/generic/security.png #}
{# wf_tags: security #}
{# wf_featured_snippet: Starting in 85, Chrome plans to switch its default referrer policy from no-referrer-when-downgrade to the more privacy-preserving strict-origin-when-cross-origin. #}
{# wf_blink_components: N/A #}

# A new default Referrer-Policy for Chrome: strict-origin-when-cross-origin {: .page-title }

{% include "web/_shared/contributors/maudnalpas.html" %}

<div class="clearfix"></div>

Before we start:

- If you're unsure of the difference between "site" and "origin", check out [Understanding
  "same-site" and "same-origin"](https://web.dev/same-site-same-origin/).
- The `Referer` header is missing an R, due to an original misspelling in the spec. The
  `Referrer-Policy` header and `referrer` in JavaScript and the DOM are spelled correctly.

## Summary

- Browsers are evolving towards privacy-enhancing default referrer policies, to provide a good
  fallback when a website has no policy set.
- Chrome plans to gradually enable `strict-origin-when-cross-origin` as the default policy in 85;
  this may impact use cases relying on the referrer value from another origin.
- This is the new default, but websites can still pick a policy of their choice.
- To try out the change in Chrome, enable the flag at
  `chrome://flags/#reduced-referrer-granularity`. You can also check out this
  [demo](https://site-one-dot-referrer-demo-280711.ey.r.appspot.com/stuff/detail?tag=red&p=p0) to
  see the change in action.
- Beyond the referrer policy, the way browsers deal with referrers might change—so keep an eye on
  it.

## What's changing and why?

HTTP requests may include the optional [`Referer`
header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer), which indicates the
**origin or web page URL** the request was made from. The [`Referer-Policy`
header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) defines what data
is made available in the `Referer` header, and for navigation and iframes in the destination's
`document.referrer`.

Exactly what information is sent in the `Referer` header in a request from your site is determined
by the `Referrer-Policy` header you set.

<figure>
 <img src="/web/updates/images/2020/07/referrer-policy-default-01.png" alt="Diagram: Referer sent in
      a request."/>
 <figcaption>
   <em>Referrer-Policy and Referer.</em>
 </figcaption>
</figure>

**When no policy is set, the browser's default is used.** Websites often defer to the browser’s
default.

For navigations and iframes, the data present in the `Referer` header can also be accessed via
JavaScript using `document.referrer`.

Up until recently,
[`no-referrer-when-downgrade`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
has been a widespread default policy across browsers. But now many browsers are in some stage of
[moving to more privacy-enhancing
defaults](https://web.dev/referrer-best-practices/#default-referrer-policies-in-browsers).

Chrome plans to switch its default policy from `no-referrer-when-downgrade` to
`strict-origin-when-cross-origin`, [starting in version 85](https://blog.chromium.org/2020/07/chrome-85-upload-streaming-human.html).

This means that if no policy is set for your website, Chrome will use
`strict-origin-when-cross-origin` by default. Note that you can still set a policy of your choice;
this change will only have an effect on websites that have no policy set.

<div class="clearfix"></div>

Note: this step to help reduce silent cross-site user tracking is part of a larger initiative: the
Privacy Sandbox. Check [Digging into the Privacy
Sandbox](https://web.dev/digging-into-the-privacy-sandbox/) for more details.

### What does this change mean?

`strict-origin-when-cross-origin` offers more **privacy**. With this policy, only the
[origin](https://web.dev/same-site-same-origin/#origin) is sent in the `Referer` header of
cross-origin requests.

This prevents leaks of private data that may be accessible from other parts of the full URL such as
the path and query string.

<figure>
 <img src="/web/updates/images/2020/07/referrer-policy-default-02.png" alt="Diagram: Referer sent
      depending on the policy, for a cross-origin request."/>
 <figcaption>
   <em>Referer sent (and document.referrer) for a cross-origin request, depending on the
   policy.</em>
 </figcaption>
</figure>

For example:

Cross-origin request, sent from https://site-one.example/**stuff/detail?tag=red** to
https://site-two.example/…:

- With `no-referrer-when-downgrade`: Referer: https://site-one.example/**stuff/detail?tag=red**.
- With `strict-origin-when-cross-origin`: Referer: https://site-one.example/.

### What stays the same?

- Like `no-referrer-when-downgrade`, `strict-origin-when-cross-origin` is **secure**: no referrer
  (`Referer` header and `document.referrer`) is present when the request is made from an HTTPS
  origin (secure) to an HTTP one (insecure). This way, if your website uses HTTPS ([if not, make it
  a priority](https://web.dev/why-https-matters/)), your website's URLs won't leak in non-HTTPS
  requests—because anyone on the network can see these, so this would expose your users to
  man-in-the-middle-attacks.
- Within the same origin, the `Referer` header value is the full URL.

For example:
Same-origin request, sent from https://site-one.example/**stuff/detail?tag=red** to 
https://site-one.example/…:

 - With `strict-origin-when-cross-origin`: Referer: https://site-one.example/**stuff/detail?tag=red**

## What's the impact?

Based on [discussions with other
browsers](https://github.com/privacycg/proposals/issues/13#issuecomment-622029248) and Chrome's own
experimentation run in Chrome 84, **user-visible breakage is expected to be limited**.

Server-side logging or analytics that rely on the full referrer URL being available are likely to be
impacted by reduced granularity in that information.

## What do you need to do?

Chrome plans to start rolling out the new default referrer policy in 85 (July 2020 for beta, August
2020 for stable). See status in the [Chrome status
entry](https://www.chromestatus.com/feature/6251880185331712).

### Understand and detect the change

To understand what the new default changes in practice, you can check out this
[demo](https://site-one-dot-referrer-demo-280711.ey.r.appspot.com/stuff/detail?tag=red&p=p0).

You can also use this demo to detect what policy is applied in the Chrome instance you are running.

### Test the change, and figure out if this will impact your site

You can already try out the change starting from Chrome 81: visit
**`chrome://flags/#reduced-referrer-granularity`** in Chrome and enable the flag. When this flag is
enabled, all websites without a policy will use the new `strict-origin-when-cross-origin` default.

<figure>
 <img src="/web/updates/images/2020/07/referrer-policy-default-03.png" alt="Chrome screenshot: how
      to enable the flag chrome://flags/#reduced-referrer-granularity."/>
 <figcaption>
   <em>Enabling the flag.</em>
 </figcaption>
</figure>

You can now check how your website and backend behave.

Another thing to do to detect impact is to check if your website's codebase uses the referrer—either
via the `Referer` header of incoming requests on the server, or from `document.referrer` in
JavaScript.

Certain features on your site might break or behave differently if you're using the referrer of
requests from **another origin** to your site (more specifically the path and/or query string) AND
this origin uses the browser's default referrer policy (i.e. it has no policy set).

### If this impacts your site, consider alternatives

If you're using the referrer to access the full path or query string for requests to your site, you
have a few options:

- Use alternative techniques and headers such as `Origin` and `Sec-fetch-Site` for your CSRF
  protection, logging, and other use cases. Check out [Referer and Referrer-Policy: best
  practices](https://web.dev/referrer-best-practices).
- You can align with partners on a specific policy if this is needed and transparent to your users.
  Access control—when the referrer is used by websites to grant specific access to their resources
  to other origins—might be such a case although with Chrome's change, the origin will still be
  shared in the `Referer` Header (and in `document.referrer`).

Note that most browsers are moving in a similar direction when it comes to the referrer (see browser
defaults and their evolutions in [Referer and Referrer-Policy: best
practices](https://web.dev/referrer-best-practices/#default-referrer-policies-in-browsers).

### Implement an explicit, privacy-enhancing policy across your site

What `Referer` should be sent in requests **originated** by your website, i.e. what policy should
you set for your site?

Even with Chrome's change in mind, it's a good idea to set an **explicit, privacy-enhancing policy**
like `strict-origin-when-cross-origin` or stricter right now.

This protects your users and makes your website behave more predictably across browsers. Mostly, it
gives you control —rather than having your site depend on browser defaults.

Check [Referrer and Referrer-Policy: best practices](https://web.dev/referrer-best-practices) for
details on setting a policy.

### About Chrome enterprise

The Chrome enterprise policy
[`ForceLegacyDefaultReferrerPolicy`](https://cloud.google.com/docs/chrome-enterprise/policies/?policy=ForceLegacyDefaultReferrerPolicy)
is available to IT administrators who would like to force the previous default referrer policy of
`no-referrer-when-downgrade` in enterprise environments. This allows enterprises additional time to
test and update their applications. 

This policy will be removed in Chrome 88.


## Send feedback

Do you have feedback to share or something to report? Share feedback on [Chrome's intent to
ship](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/lqFuqwZDDR8), or tweet your
questions at [@maudnals](https://twitter.com/maudnals).

_With many thanks for contributions and feedback to all reviewers - especially Kaustubha Govind,
David Van Cleve, Mike West, Sam Dutton, Rowan Merewood, Jxck and Kayce Basques._

## Resources

- [Referer and Referrer-Policy: best practices](web.dev/referrer-best-practices)
- [Understanding "same-site" and "same-origin"](https://web.dev/same-site-same-origin/)
- [Chrome status entry](https://www.chromestatus.com/feature/6251880185331712)
- [Chrome 85 beta blogpost](https://blog.chromium.org/2020/07/chrome-85-upload-streaming-human.html)
- [Blink intent to
  implement](https://groups.google.com/a/chromium.org/d/msg/blink-dev/aBtuQUga1Tk/n4BLwof4DgAJ)
- [Blink intent to
  ship](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/lqFuqwZDDR8)

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
