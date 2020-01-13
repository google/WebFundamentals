project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Use the Security Panel to make sure that a page is fully protected by HTTPS.

{# wf_updated_on: 2019-03-12 #}
{# wf_published_on: 2015-12-21 #}
{# wf_blink_components: Security #}

# Understand Security Issues With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

[why-https]: /web/fundamentals/security/encrypt-in-transit/why-https

Use the **Security** Panel in Chrome DevTools to make sure HTTPS is properly implemented
on a page. See [Why HTTPS Matters][why-https] to learn why every website should be protected
with HTTPS, even sites that don't handle sensitive user data.

## Open the Security panel {: #open }

The **Security** panel is the main place in DevTools for inspecting the security of a page.

1. [Open DevTools](/web/tools/chrome-devtools/open).
1. Click the **Security** tab to open the **Security** panel.

     <figure>
       <img src="/web/tools/chrome-devtools/security/imgs/panel.png"
            alt="The Security panel"/>
       <figcaption>
         <b>Figure 1</b>. The Security panel
       </figcaption>
     </figure>

## Common problems {: #problems }

### Non-secure main origins {: #main }

When the main origin of a page is not secure, the **Security Overview** says
**This page is not secure**.

<figure>
  <img src="/web/tools/chrome-devtools/security/imgs/nonsecuremain.png"
       alt="A non-secure page"/>
  <figcaption>
    <b>Figure 2</b>. A non-secure page
  </figcaption>
</figure>

This problem occurs when the URL that you visited was requested over HTTP. To make it secure
you need to request it over HTTPS. For example, if you look at the URL in your address bar,
it probably looks similar to `http://example.com`. To make it secure the URL should be
`https://example.com`.

If you've already got HTTPS set up on your server, all you need to do to fix this problem is configure
your server to redirect all HTTP requests to HTTPS.

If you don't have HTTPS set up on your server, [Let's Encrypt](https://letsencrypt.org/){: .external }
provides a free and relatively-easy way to start the process. Or, you might consider hosting your site
on a CDN. Most major CDNs host sites on HTTPS by default now.

<aside class="objective">
  <b>Tip</b> The <a href="/web/tools/lighthouse/audits/http-redirects-to-https">Redirect HTTP Traffic To HTTPS</a>
  audit in <a href="/web/tools/lighthouse/">Lighthouse</a> can help automate the process of making sure that
  all HTTP requests are redirected to HTTPS.
</aside>

### Mixed content {: #mixed }

[mixed]: /web/fundamentals/security/prevent-mixed-content/what-is-mixed-content

[Mixed content][mixed] means that the main origin of a page is secure, but the page requested resources
from non-secure origins. Mixed content pages are only partially protected because the HTTP content is
accessible to sniffers and vulnerable to man-in-the-middle attacks.

<figure>
  <img src="/web/tools/chrome-devtools/security/imgs/mixedoverview.png"
       alt="Mixed content"/>
  <figcaption>
    <b>Figure 3</b>. Mixed content
  </figcaption>
</figure>

In **Figure 3** above, clicking **View 1 request in Network panel** opens the **Network** panel
and applies the `mixed-content:displayed` filter so that the **Network Log** only shows non-secure
resources.

<figure>
  <img src="/web/tools/chrome-devtools/security/imgs/mixedresources.png"
       alt="Mixed resources in the Network Log"/>
  <figcaption>
    <b>Figure 4</b>. Mixed resources in the Network Log
  </figcaption>
</figure>

## View details {: #details }

### View main origin certificate {: #certificate }

From the **Security Overview** click **View certificate** to quickly inspect the main origin's certificate.

<figure>
  <img src="/web/tools/chrome-devtools/security/imgs/certificate.png"
       alt="A main origin certificate"/>
  <figcaption>
    <b>Figure 5</b>. A main origin certificate
  </figcaption>
</figure>

### View origin details {: #origindetails }

Click one of the entries in the left-hand nav to view the origin's details. From the details
page you can view connection and certificate information. Certificate transparency information
is also shown when available.

<figure>
  <img src="/web/tools/chrome-devtools/security/imgs/origindetails.png"
       alt="Main origin details"/>
  <figcaption>
    <b>Figure 6</b>. Main origin details
  </figcaption>
</figure>

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}