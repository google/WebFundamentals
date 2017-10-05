project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "No Element Has a tabindex Attribute Greater Than 0" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2017-01-23 #}

# No Element Has a tabindex Attribute Greater Than 0  {: .page-title }

## Why the audit is important {: #why }

The `tabindex` attribute makes elements keyboard navigable.
Positive values indicate an explicit navigation ordering of elements.
Although this is valid, in practice it is extremely hard to do correctly and
creates unusable experiences for users who rely on assistive technologies.

See [Using tabindex](/web/fundamentals/accessibility/focus/using-tabindex)
for more information.

## How to pass the audit {: #how }

<<_shared/query.md>>

Set the `tabindex` of each of these elements to either `-1`, for elements
that should not be keyboard navigable, or `0`, for elements that should. If
you need an element to appear earlier in the tab order, consider moving
it earlier in the DOM.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

This audit is powered by the aXe Accessibility Engine. See [Elements should not
have tabindex greater than zero][axe] for more information.

[axe]: https://dequeuniversity.com/rules/axe/1.1/tabindex


{% include "web/tools/lighthouse/audits/_feedback/tabindex.html" %}
