project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-02-22 #}
{# wf_published_on: 2012-11-15 #}
{# wf_tags: news,content-security-policy,security #}
{# wf_blink_components: N/A #}

# Content Security Policy 1.0 is officially awesome. {: .page-title }

{% include "web/_shared/contributors/mikewest.html" %}


It's official! The W3C has advanced the [Content Security Policy 1.0 specification][csp10] from Working Draft to Candidate Recommendation, and [issued a call for implementations][impl]. Cross-site scripting attacks are one step closer to being (mostly) a thing of the past.

Chrome Canary and WebKit nightlies now support the unprefixed `Content-Security-Policy` header, and will be using the prefixed `X-WebKit-CSP` header to begin experimenting with some new behavior that's being specified as part of [Content Security Policy 1.1][csp11]. Instead of writing:


      X-WebKit-CSP: script-src 'self'; object-src 'none'



You'll write:


    Content-Security-Policy: script-src 'self'; object-src 'none'


We expect other browser vendors to follow suit within the next few revisions, so it's a great idea to start sending the canonical header today.

### Content Securawhat?

Content Security Policy! It helps you reduce the risk of cross-site scripting and other content injection attacks in your applications. It's a huge step forward in terms of the protection you can offer your users, and we highly recommend taking a hard look at implementing it. You can get all the details in the ever so cleverly named ["An Introduction to Content Security Policy"][h5r].

[csp10]: https://www.w3.org/TR/CSP/
[impl]: https://www.w3.org/News/2012#entry-9633
[csp11]: https://w3c.github.io/webappsec-csp/
[h5r]: https://www.html5rocks.com/en/tutorials/security/content-security-policy/

