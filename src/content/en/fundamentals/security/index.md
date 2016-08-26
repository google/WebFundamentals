project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ecurity is a big topic, bigger than we can conver in this section. We've provided a few things to get you started. 

{# wf_review_required #}
{# wf_updated_on: 2015-09-08 #}
{# wf_published_on: 2015-09-08 #}

# Security and Identity {: .page-title }

Security is a big topic, bigger than we can conver in this section. We've provided a few things to get you started. 

## Encrypting Data in Transit

One of the most critical security features, one that is required for many modern APIs and [progressive web apps](/web/progressive-web-apps/) is [Secure HTTP also called HTTPS](encrypt-in-transit/why-https). A common misconception about HTTPS is that the only websites that need it are those that handle sensitive communications. If privacy and security weren't reason enough to protect your users, many new browser features such as service workers the Payment Request API require HTTPS.


<div class="attempt-left">
  <h2>Content Security Policy</h2>
  <a href="csp/">
    <img src="https://placehold.it/321x213">
  </a>
  <p>
    Content Security Policy or CSP provides a rich set of directives that enable granular control over the resources a page is allowed to load and where they're loaded from. 
    <a href="csp/">Learn More</a>
  </p>
</div>
<div class="attempt-right">
  <h2>Prevent Mixed Content</h2>
  <a href="prevent-mixed-content/what-is-mixed-content">
    <img src="https://placehold.it/321x213">
  </a>
  <p>
    One of the more time-consuming tasks in implementing HTTPS is finding and fixing content that mixes both HTTPS and HTTP. Fortunately there are tools to help you help you with this.
    <a href="prevent-mixed-content/what-is-mixed-content">Get Started</a>
  </p>
</div>
