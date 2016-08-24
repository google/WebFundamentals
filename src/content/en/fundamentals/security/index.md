project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: TODO

{# wf_review_required #}
{# wf_updated_on: 2015-09-08 #}
{# wf_published_on: 2015-09-08 #}

# Security {: .page-title }

The web's security model is rooted in the
[_same origin policy_](http://en.wikipedia.org/wiki/Same_origin_policy). Code
from `https://mybank.com` should only have access to `https://mybank.com`'s
data, and `https://evil.example.com` should certainly never be allowed access.
Each origin is kept isolated from the rest of the web, giving developers a safe
sandbox in which to build and play. In theory, this is brilliant. In practice,
attackers have found clever ways to subvert the system.

## Content Security Policy

<img src="https://placehold.it/300x200" class="attempt-right">

CSP provides a rich set of policy directives that enable granular control over the resources a page is allowed to load. 

[Get Started](csp/)

<div style="clear:both;"></div>

## Encrypt in Transit

<img src="https://placehold.it/300x200" class="attempt-right">

Always protect your websites with HTTPS, even if they don’t handle sensitive communications. HTTPS provides critical security and data integrity both for your websites and for the people that entrust your websites with their personal information.

[Get Started](encrypt-in-transit/why-https)

<div style="clear:both;"></div>

## Prevent Mixed Content

<img src="https://placehold.it/300x200" class="attempt-right">

This section discusses some tools that are available to help with the sometimes time-consuming process of finding and fixing mixed content. Mixed content occurs when initial HTML is loaded over a secure HTTPS connection, but other resources are loaded over an insecure HTTP connection.

[Get Started](prevent-mixed-content/what-is-mixed-content)

<div style="clear:both;"></div>