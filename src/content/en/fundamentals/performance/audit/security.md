project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: You won't be able to build a PWA without HTTPS. Serving your site over HTTPS is fundamental for security, and many APIs won't work without it. If you need to justify implementation costs, find out why HTTPS matters.

{# wf_updated_on: 2017-07-25 #}
{# wf_published_on: 2015-03-20 #}
{# wf_blink_components: Blink>JavaScript #}

# Check site security {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}


You won't be able to build a PWA without HTTPS.

Serving your site over HTTPS is fundamental for security, and many APIs won't work without it. If you need to justify implementation costs, find out [why HTTPS matters](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).

If a site uses HTTP for any assets, users will be warned in the URL bar. Chrome displays a warning like the following.

<figure>
  <img src="images/not-secure.png" alt="Chrome 'not secure' warning">
  <figcaption><em>From Chrome 68, the omnibox warns if not all assets use HTTPS</em></figcaption>
</figure>

HTTPS should be implemented everywhere — not just, for example, on login or checkout pages. Any insecure page or asset can be a vector for attack, making your site a liability for your users and your business.

Site security is easy to check with [Chrome DevTools Security panel](https://developers.google.com/web/tools/chrome-devtools/security). Keep a record of any problems.

The site in the following example is not secure, since some assets are served over HTTP.

<figure>
  <img src="images/devtools-security-1000.png" srcset="images/devtools-security-500.png 500w, images/devtools-security-1000.png 1000w" alt="Chrome DevTools Security panel">
  <figcaption><em>Chrome DevTools Security panel</em></figcaption>
</figure>
<br>

