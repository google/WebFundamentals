project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Feature Policy allows developers to selectively enable, disable, and modify the behavior of certain APIs and features in the browser. It's like CSP, but for features! Shipped in Chrome 60.

{# wf_updated_on: 2018-06-25 #}
{# wf_published_on: 2018-06-25 #}
{# wf_tags: ux,feature,chrome60,feature-policy #}
{# wf_featured_image: /web/updates/images/generic/checklist.png #}
{# wf_featured_snippet: Feature Policy allows developers to selectively enable, disable, and modify the behavior of certain APIs and features in the browser. It's like CSP, but for features! Shipped in Chrome 60. #}
{# wf_blink_components: Blink>FeaturePolicy #}

# Introduction to Feature Policy {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-style: italic;
}
</style>

#### TL;DR {: #tldr .hide-from-toc}

[Feature Policy][spec] allows web developers to selectively enable, disable, and
modify the behavior of certain APIs and web features in the browser. __It's like
[CSP](/web/fundamentals/security/csp/) but instead of controlling security, it
controls features!__

The feature policies themselves are little opt-in aggreements between developer
and browser that can help foster our goals of building (and maintaining) high
quality web apps.

## Introduction {: #intro}

Building for the web is a rocky adventure. It's hard enough to build a top-notch
web app that nails performance and uses all the latest best practices. It's even
harder to keep that experience great over time. As your project evolves,
developers come on board, new features land, and the codebase grows. That
Great Experience &trade; you once achieved may begin to deteriorate and UX
starts to suffer! Feature Policy is designed to keep you on track.

With Feature Policy, you **opt-in to a set of "policies"** for the browser to
enforce on specific features used throughout your site. These policies restrict
what APIs the site can access or modify the browser's default behavior for
certain features.

Here are examples of things you can do with Feature Policy:

- Change the default behavior of `autoplay` on mobile and third party videos.
- Restrict a site from using sensitive APIs like `camera` or `microphone`.
- Allow iframes to use the `fullscreen` API.
- Block the use of outdated APIs like synchronous XHR and `document.write`.
- Ensure images are sized properly (e.g. prevent layout thrashing) and are not
too big for the viewport (e.g. waste user's bandwidth).

**Policies are a contract between developer and browser**. They inform the
browser about what the developer's intent is and thus, help keep us honest when
our app tries to go off the rails and do something bad. If the site or embedded third-party content attempts to violate any of the developer's preselected
rules, the browser overrides the behavior with better UX or blocks the API
altogether.

## Using Feature Policy {: #using }

Feature Policy provides two ways to control features:

1. Through the `Feature-Policy` HTTP header.
2. With the `allow` attribute on iframes.

### The `Feature-Policy` HTTP header {: #header }

The easiest way to use Feature Policy is by sending the `Feature-Policy` HTTP
header with the response of a page. It's value is the policy or set of
policies that you want the browser to respect for a given origin:

```
Feature-Policy: <feature> <allow list origin(s)>
```

The allow list can take several different values:

- `*`: The feature is allowed in top-level browsing contexts and in nested
browsing contexts (iframes).
- `'self'`: The feature is allowed in top-level browsing contexts and
same-origin nested browsing contexts. It is disallowed in cross-origin
documents in nested browsing contexts.
- `'none'`: The feature is disallowed in top-level browsing contexts and
disallowed in nested browsing contexts.
- `<url>`: a specific origin to enable the policy for (e.g. `https://example.com`).

**Example**

Let's say you wanted to block all content from using
the Geolocation API across your site. You can do that by sending a strict
allowlist of `'none'` for the `geolocation` feature:

```
Feature-Policy: geolocation 'none'
```

If a piece of code or iframe tries to use the Geolocation API, the browser
 blocks it. **This is true even if the user has previously given
permission to share their location**.

<figure>
  <img src="/web/updates/images/2018/06/featurepolicy/violation.png"
       class="screenshot" alt="Violating the set geolocation policy."
       title="Violating the set geolocation policy.">
  <figcaption>Violating the set geolocation policy.</figcaption>
</figure>

In other cases, it might make sense to relax this policy a bit. We can allow
our own origin to use the Geolocation API but prevent third-party content from
accessing it by setting `'self'` in the allow list:

```
Feature-Policy: geolocation 'self'
```


### The iframe `allow` attribute {: #iframe }

The second way to use Feature Policy is for controlling content within
an `iframe`. Use the `allow` attribute to specify a policy list for
embedded content:

```html
<!-- Allow all browsing contexts within this iframe to use full screen. -->
<iframe src="https://example.com..." allow="fullscreen"></iframe>

<!-- Equivalent to: -->
<iframe src="https://example.com..." allow="fullscreen *"></iframe>

<!-- Allow only iframe content on a particular origin to access the user's location. -->
<iframe src="https://google-developers.appspot.com/demos/..."
        allow="geolocation https://google-developers.appspot.com"></iframe>
```

Note: Frames inherit the policy settings of their parent page. If the page
and iframe both specify a policy list, the more restrictive allow list will
be used. See [Inheritance rules](#inheritancerules).

#### What about the existing iframe attributes? {: #legacy }

Some of the [features controlled by Feature Policy](#list) have an existing
 attribute to control their behavior. For example, `<iframe allowfullscreen>`
is an attribute that allows the iframe's content to use the
`HTMLElement.requestFullscreen()` API. There's also the `allowpaymentrequest` and
`allowusermedia` attributes for allowing the
[Payment Request API](/web/fundamentals/payments/) and `getUserMedia()`,
respectively.

Try to **use the `allow` attribute instead of these old
attributes** where possible. For cases where you need to support backwards
compatibility using the `allow` attribute with an equivalent legacy attribute
is perfectly fine (e.g. `<iframe allowfullscreen allow="fullscreen">`).
Just note that the more restrictive policy wins. For example, the following
iframe would not be allowed to enter full screen because
`allow="fullscreen 'none'"` is more restrictive than `allowfullscreen`:

```html
<!-- Blocks full screen access if the browser supports feature policy. -->
<iframe allowfullscreen allow="fullscreen 'none'" src="...">
```

## Controlling multiple policies at once {: .multiple }

Several features can be controlled at the same time by sending the HTTP header
with a `;` separated list of policies:

```
Feature-Policy: unsized-media 'none'; geolocation 'self', https://example.com; camera *;
```

or by sending a separate header for each policy:

```
Feature-Policy: unsized-media 'none'
Feature-Policy: geolocation 'self' https://example.com
Feature-Policy: camera *;
```

This example would do the following:

- Disallows the use of `unsized-media` for all browsing contexts.
- Disallows the use of `geolocation` for all browsing contexts except for the
page's own origin and `https://example.com`.
- Allows `camera` access for all browsing contexts.

**Example** - setting multiple policies on an iframe

```html
<!-- Blocks the iframe from using the camera and microphone
     (if the browser supports feature policy). -->
<iframe allow="camera 'none'; microphone 'none'">
```

## JavaScript API {: #js }

Heads up: While Chrome 60 added support for the `Feature-Policy` HTTP header
and the `allow` attribute on iframes, the [JavaScript API][jsapi] is still
being fleshed out and is likely to change as it goes through the standardization
process. You can enable the API using the
`--enable-experimental-web-platform-features` flag in `chrome:flags`.
{: .dogfood }

Feature Policy includes a small [JavaScript API][jsapi] to allow client-side
code to determine what features are allowed by a page or frame. You can access
its goodies under `document.policy` for the main document or `frame.policy` for
iframes.

### Example {: #jsexample }

The example below illustrates the results of sending a policy of
`Feature-Policy: geolocation 'self'` on the site `https://example.com`:

```js
/* @return {Array<string>} List of feature policies allowed by the page. */
document.policy.allowedFeatures();
// → ["geolocation", "midi",  "camera", "usb", "autoplay",...]

/* @return {boolean} True if the page allows the 'geolocation' feature. */
document.policy.allowsFeature('geolocation');
// → true

/* @return {boolean} True if the provided origin allows the 'geolocation' feature. */
document.policy.allowsFeature('geolocation', 'https://google-developers.appspot.com/');
// → false

/* @return {Array<string>} List of origins (used throughout the page) that are
   allowed to use the 'geolocation' feature. */
document.policy.getAllowlistForFeature('geolocation');
// → ["https://example.com"]
```

## List of policies {: #list }

So what features can be controlled through Feature Policy?

Right now, there's a lack of documentation on what policies are implemented
and how to use them. The list will also grow over time as different browsers
adopt the spec and implement various policies. Feature policy will be a moving
target and good reference docs will definitely be needed.

For now, there are a couple of ways to see what features are controllable.

- Check out our [Feature Policy Kitchen Sink][sink] of demos. It has examples
of each policy that's been implemented in Blink.
-  Check [Chrome's source](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/feature_policy/feature_policy.cc?g=0&l=138) for the list of feature names.
-  If you have the `--enable-experimental-web-platform-features` flag turned on
in `chrome:flags`, query `document.policy.allowedFeatures()` to find the list:

        ["geolocation",
         "midi",
         "camera",
         "usb",
         "magnetometer",
         "fullscreen",
         "animations",
         "payment",
         "picture-in-picture",
         "accelerometer",
         "vr",
        ...

- Check [chromestatus.com][chromestatusfilter] for the policies that have been
implemented or are being considered in Blink.

To determine _how_ to use some of these policies, check out the
[spec's Github repo](https://github.com/WICG/feature-policy/tree/master/policies).
It contains a few explainers on some of the policies.

## FAQ

#### When do I use Feature Policy? {: #whentouse }

Since all policies are opt-in, use enable policies when/where they makes sense.
For example, if your app is an image gallery, it would be logical to use
the `maximum-downscaling-image` policy to make sure you're not pushing
down images that are far too big on mobile.

Other policies like `document-write` and `sync-xhr` are generally good policies
to always enable. Since these APIs are considered harmful to web performance,
you can use Feature Policy as a gut check that your app never uses them!

#### Do I use Feature Policy in development or production?  {: #devorprod }

Both. We recommend turning policies on during development keeping the policies
active while in production.

Turning policies on during development can help you start off on the right
track. It'll help you catch any unexpected regressions before they happen.

Keeping policies on for production gives your users a guarantee that the UX
won't change under them.

#### What are the inheritance rules for iframe content? {: #inheritancerules }

- All feature policies are opt-in. You control what features to
enable/modify/disable in your app.
- Scripts (either first or third-party) inherit the policy of their browsing
context. That means that top-level scripts inherit the main document's policy.
- `iframe` content inherits the more strict policy between the embedding page
and the `allow` list on the frame itself.
See [the `allow` attribute on iframes](#iframe).

#### What browsers support Feature Policy? {: #support }

As of now, Chrome is the only browser to support feature policy. However,
since the entire API surface is opt-in or feature detectable, **Feature Policy
lends itself nicely to progressive enhancement**.

## Conclusion

Feature Policy can help provide a well-lit path towards better UX and
good performance. It's especially handy when developing or maintaining an app
since it can help avoid potential footguns before they sneak into your codebase.

**Additional resources**:

- [Feature Policy Explainer][explainer]
- [Feature Policy spec][spec]
- [Kitchen Sink Demos][sink]
- [chromestatus.com entries][chromestatusfilter]

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

[spec]: https://wicg.github.io/feature-policy/
[jsapi]: https://www.chromestatus.com/features/5190687460950016
[chromestatus]: https://www.chromestatus.com/features/5694225681219584
[chromestatusfilter]: https://www.chromestatus.com/features#component%3A%20Blink%3EFeaturePolicy
[sink]: https://feature-policy-demos.appspot.com/
[explainer]: https://docs.google.com/document/d/1k0Ua-ZWlM_PsFCFdLMa8kaVTo32PeNZ4G7FFHqpFx4E/