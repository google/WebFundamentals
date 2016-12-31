project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Site Does Not Use The Old CSS Flexbox" Lighthouse audit.

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# Site Does Not Use The Old CSS Flexbox  {: .page-title }

## Why the audit is important {: #why }

The old, 2009 specification for Flexbox is deprecated and is 2.3x slower
than the latest specification. See [Flexbox Layout Isn't Slow][slow] to learn
more.

[slow]: https://developers.google.com/web/updates/2013/10/Flexbox-layout-isn-t-slow

## How to pass the audit {: #how }

Under **URLs**, Lighthouse lists every instance of `display: box` that it found
on your page's stylesheets. Replace every instance with the new syntax,
`display: flex`.

If a stylesheet is using `display: box`, then it may be using other deprecated
Flexbox properties. In short, every property that begins with `box`,
such as `box-flex`, is deprecated and should be replaced. See
[CSS Flexbox 2009/2011 Spec Syntax Property Mapping][map] to see exactly how the
old properties map to the new ones.

[map]: https://wiki.csswg.org/spec/flexbox-2009-2011-spec-property-mapping

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse collects all of the stylesheets used on the page and checks if any of
them uses `display: box`. Lighthouse does not check if the stylesheets use any
other deprecated properties.
