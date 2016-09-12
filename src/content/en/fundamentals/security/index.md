project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Security is a big topic, learn about HTTPS, why it's important and how you can deploy it to your servers.

{# wf_updated_on: 2016-09-09 #}
{# wf_published_on: 2015-09-08 #}

# Security and Identity {: .page-title }

Security is a big topic, here are a few things to get you started. 

## Encrypting Data in Transit

<img src="/web/images/content-https-2x.jpg" class="attempt-right">

One of the most critical security features, one that is required for many modern APIs and [progressive web apps](/web/progressive-web-apps/) is [Secure HTTP also called HTTPS](encrypt-in-transit/why-https). A common misconception about HTTPS is that the only websites that need it are those that handle sensitive communications. If privacy and security weren't reason enough to protect your users, many new browser features such as service workers the Payment Request API require HTTPS.

[Enabling HTTPS on Your Servers](/web/fundamentals/security/encrypt-in-transit/enable-https)

<div class="attempt-left">
  <h2>Content Security Policy</h2>
  <p>
    Content Security Policy or CSP provides a rich set of directives that
    enable granular control over the resources a page is allowed to load and
    where they're loaded from.<br>
    <a href="csp/">Learn More</a>
  </p>
</div>
<div class="attempt-right">
  <h2>Prevent Mixed Content</h2>
  <p>
    One of the more time-consuming tasks in implementing HTTPS is finding and
    fixing content that mixes both HTTPS and HTTP. Fortunately there are tools
    to help you help you with this.<br>
    <a href="prevent-mixed-content/what-is-mixed-content">Get Started</a>
  </p>
</div>

<div style="clear:both"></div>

## Related Resources

### Chrome DevTools

* [Understand Security Issues](/web/tools/chrome-devtools/security/)



