project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Signed Exchanges allow websites to sign web content in the way that the content can be safely redistributed and verified where it was originally from. Chrome is experimenting with this starting in Chrome 71.

{# wf_updated_on: 2018-11-01 #}
{# wf_published_on: 2018-11-01 #}
{# wf_tags: chrome71,webpackage,signed-exchange,loading #}
{# wf_featured_image: /web/updates/images/2018/11/signed-exchanges.svg #}
{# wf_featured_snippet: Signed Exchanges allow websites to sign web content in the way that the content can be safely redistributed and verified where it was originally from. Chrome is experimenting with this starting in Chrome 71. #}
{# wf_blink_components: Blink>Loader #}

# Signed HTTP Exchanges {: .page-title }

{% include "web/_shared/contributors/kinukoyasuda.html" %}

[Signed HTTP Exchange](https://wicg.github.io/webpackage/draft-yasskin-http-origin-signed-responses.html) (or "SXG") is a subset of the emerging technology called [Web Packages](https://github.com/WICG/webpackage), which enables publishers to safely make their content portable, i.e. available for redistribution by other parties, while still keeping the content’s integrity and attribution. Portable content has many benefits, from enabling faster content delivery to facilitating content sharing between users, and simpler offline experiences.

So, how do Signed HTTP Exchanges work?  This technology allows a publisher to [sign a single HTTP exchange](https://wicg.github.io/webpackage/draft-yasskin-http-origin-signed-responses.html#rfc.section.3) (i.e., a request/response pair), in the way that the signed exchange can be served from any caching server. When the browser loads this Signed Exchange, it can safely show the publisher’s URL in the address bar because the signature in the exchange is sufficient proof that the content originally came from the publisher’s origin.

<img src="/web/updates/images/2018/11/signed-exchanges.svg"
     alt="Signed Exchange: The essence">

This decouples the origin of the content from who distributes it. Your content can be published on the web, without relying on a specific server, connection, or hosting service!  We're excited about possible uses of SXG such as:

+ **Privacy-preserving prefetching:** While prefetching resources (e.g., [by link rel=prefetch](https://w3c.github.io/resource-hints/#dfn-prefetch)) for a subsequent navigation can make the navigation feel a lot faster, it also has privacy downsides.  For instance, prefetching resources for cross-origin navigations will disclose to the destination site that the user is potentially interested in a piece of information even if the user ultimately didn’t visit the site.  On the other hand, SXG allows for prefetching cross-origin resources from a fast cache without ever reaching out to the destination site, thereby only communicating user interest if and when the navigation occurs. We believe that this can be useful for sites whose goal is to send their users to other websites. In particular, Google plans to use this on Google search result pages to [improve AMP URLs](https://www.ampproject.org/latest/blog/a-first-look-at-using-web-packaging-to-improve-amp-urls/) and speed up clicks on search results.

+ **Benefits of a CDN without ceding control of your certificate private key:** Content that has suddenly become popular (e.g. linked from [reddit.com](https://www.reddit.com/)'s first page) often overloads the site where the content is served, and if the site is relatively small, it tends to slow down or even temporarily become unavailable. This situation can be avoided if the content is shared using fast, powerful cache servers, and SXG makes this possible without sharing your TLS keys.

## Trying out Signed Exchanges

Chrome is [experimenting with SXG](https://groups.google.com/a/chromium.org/d/msg/blink-dev/MKHe54W996c/1E51GLbvAQAJ) and it is going to be available as an [origin trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md) starting in Chrome 71. The origin trial will allow you to temporarily enable the feature for the users on your website. The experiment process is temporary and iterative, and the feature may be changed before it becomes shippable.

There will be two types of participants for this experiment:

+ **Content publishers:** If you want to create SXGs for your content to share them with aggregators and cache operators (who can collect and serve SXGs), you do NOT need to participate in the origin trial.  Instead you will need your origin’s certificate to sign the SXGs. If you belong to this group skip over to the [Creating your SXG](#creating-your-sxg) section below.

+ **Content servers:** If you want to host SXGs created by publishers on their behalf, you can participate in the origin trial to have the SXGs processed by Chrome without requiring your users turn on a flag. If you belong to this group keep on reading the [Participate in the Origin Trial](#particiate-in-the-origin-trial) section below.

### Participate in the Origin Trial 

If you want to serve SXGs on your own site, please follow these instructions:

+ **To serve SXGs on your site and have them processed by Chrome:** Request a token for your origin via [this form](https://bit.ly/OriginTrialSignup) and [configure your site](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin) to send the provided token as an `Origin-Trial` HTTP header. Note that you need to send the token via HTTP headers, i.e. using `<meta http-equiv>` will not work for the SXG origin trial.

+ **If you'd like Chrome to advertise support for the trial via `Accept: application/signed-exchange` HTTP header:** Send an email with the subject "SXG Accept Header Sign-up: <your origin>" to webpackage-ot-application@chromium.org. Please also indicate if you want all subdomains of the origin included. We will get back to you with the necessary procedure, and process your request within 5 business days. Note that this process requires that you have permission to modify the DNS entry of the requested origin for validation.

You do not need to sign-up for both, but if your site wants to rely on Accept header for feature detection consider applying for the latter too.

Please note that origin trials will be globally shut off if its usage exceeds 0.5% of all Chrome page loads, large sites should target a small fraction of users.

### Creating your SXG

In order to create SXGs for your origin (as a publisher), you need a certificate key to sign the signature, and the certificate must have a special ["CanSignHttpExchanges" extension](https://wicg.github.io/webpackage/draft-yasskin-http-origin-signed-responses.html#cross-origin-cert-req) to be processed as a valid SXG.  As of November 2018, [digicert](https://www.digicert.com/) is the only CA that supports this extension, and you can request the certificate that works for SXG from [this page](https://www.digicert.com/account/ietf/http-signed-exchange.php).

Once you get a certificate for SXG you can create your own SXGs by using the [reference generator tools](https://github.com/WICG/webpackage/tree/master/go/signedexchange) published on github.

You can also take a look at the actual SXG example files in the [Chrome’s code repository](https://cs.chromium.org/chromium/src/content/test/data/sxg/) (e.g. [this one](https://cs.chromium.org/chromium/src/content/test/data/sxg/test.example.org_hello.txt.sxg) is the simplest one created for [a simple text file](https://cs.chromium.org/chromium/src/content/test/data/sxg/hello.txt)).  Note that they are generated primarily for local testing, please do not expect that they have valid certificates and timestamps in the signature.

## Testing the Feature Locally

For development purposes, you can also enable the feature locally by enabling the **Signed HTTP Exchange** feature via `chrome://flags/#enable-signed-http-exchange`.

For creating SXGs for testing purposes, you can create [a self-signed certificate](https://github.com/WICG/webpackage/tree/master/go/signedexchange#creating-our-first-signed-exchange) and enable `chrome://flags/#allow-sxg-certs-without-extension` to have your Chrome process the SXGs created with the certificate without the special extension.

Code like the following should work if your server, certificate, and SXGs are correctly set up:

```html
<!-- prefetch the sample.sxg -->
<link rel="prefetch" href="https://your-site.com/sample.sxg">

<!-- clicking the link below should make Chrome navigate to the inner
     response of sample.sxg (and the prefetched SXG is used) -->
<a href="https://your-site.com/sample.sxg">Sample</a>
```

Note that SXG is only supported by the anchor tag (`<a>`) and `link rel=prefetch` in Chrome M71. Also note that the signature’s validity is capped to 7 days per spec, so your signed contents will expire relatively quickly.

## Providing Feedback

We are keen to hear your feedback on this experiment at webpackage-dev@chromium.org. You can also join [the spec discussion](https://github.com/WICG/webpackage/issues), or report [a chrome bug](https://bugs.chromium.org/p/chromium/issues/entry?status=untriaged&components=Blink%3ELoader&labels=Type-Bug,Hotlist-SignedExchange) to the team.  Your feedback will greatly help the standardization process and also help us address implementation issues.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
