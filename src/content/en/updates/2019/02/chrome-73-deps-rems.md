project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 73 to help you plan.

{# wf_updated_on: 2019-10-23 #}
{# wf_published_on: 2019-02-07 #}
{# wf_tags: deprecations,removals,chrome73 #}
{# wf_blink_components: Blink>Storage>WebSQL,Blink>HTML,Blink #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 73 to help you plan.#}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 73 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Removals

### Remove EXPLAIN and REINDEX support in WebSQL

EXPLAIN's output is not guaranteed to be stable over SQLite versions, so
developers cannot rely on it. REINDEX is only useful when collation sequence
definitions change, and Chrome only uses the built-in collation sequences. Both
features are now removed.

[Chrome Platform Status](https://www.chromestatus.com/feature/5874817249050624) &#124;

### Remove isomorphic decoding of URL fragment identifier

When Chrome opens a URL with a fragment id, it decodes %xx and applies
[isomorphic-decode](https://infra.spec.whatwg.org/#isomorphic-decode) to it,
then tries to find an element with the decoding result as an ID in some cases.
For example, if a user opens example.com/#%F8%C0, Chrome does the following:

1. It searches the page for an element with id="%F8%C0".
1. If it’s not found, it searches the page for an element with id="&amp;#xF8;&amp;#xC0;".
No other browsers do this, and it's not defined by the standard. Starting in
version 73, Chrome no longer does this either.

[Chrome Platform Status](https://www.chromestatus.com/feature/4885685374812160) &#124;
[Chromium Bug](http://crbug.com/845824)


## Deprecations

{% include "web/updates/_shared/deprecations.html" %}

### Deprecate 'drive-by downloads' in sandboxed iframes

Chrome has deprecated downloads in sandboxed iframes that lack a user gesture
('drive-by downloads'), though this restriction could be lifted via an
allow-downloads-without-user-activation keyword in the sandbox attribute list.
This allows content providers to restrict malicious or abusive downloads.


Downloads can bring security vulnerabilities to a system. Even though
additional security checks are done in Chrome and the operating system, we feel
blocking downloads in sandboxed iframes also fits the general thought behind
the sandbox. Apart from security concerns, it would be a more pleasant user
experience for a click to trigger a download on the same page, compared with
downloads started automatically when landing at a new page, or started non
spontaneously after the click.

Removal is expected in Chrome 81.

[Chrome Platform Status](https://www.chromestatus.com/feature/5706745674465280) &#124;

{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
