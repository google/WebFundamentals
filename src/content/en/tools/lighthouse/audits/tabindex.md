project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "No Element Has a tabindex Attribute Greater Than 0" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2017-01-23 #}
{# wf_blink_components: N/A #}

# No Element Has a tabindex Attribute Greater Than 0  {: .page-title }

## Overview {: #overview }

The `tabindex` attribute makes elements keyboard navigable.
Positive values indicate an explicit navigation ordering of elements.
Although this is valid, in practice it is extremely hard to do correctly and
creates unusable experiences for users who rely on assistive technologies.

See [Using tabindex](/web/fundamentals/accessibility/focus/using-tabindex)
for more information.

## Recommendations {: #recommendations }

<<_shared/query.md>>

Set the `tabindex` of each of these elements to either `-1`, for elements
that should not be keyboard navigable, or `0`, for elements that should. If
you need an element to appear earlier in the tab order, consider moving
it earlier in the DOM.

## More information {: #more-info }

This audit is powered by the aXe Accessibility Engine. See [Elements should not
have tabindex greater than zero][axe] for more information.

[axe]: https://dequeuniversity.com/rules/axe/1.1/tabindex


## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
