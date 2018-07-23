project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Element aria-* Attributes Are Valid And Not Misspelled Or Non-Existent" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2017-01-18 #}
{# wf_blink_components: N/A #}

# Element ARIA Attributes Are Valid And Not Misspelled Or Non-Existent  {: .page-title }

## Overview {: #overview }

Misspelled or nonexistent ARIA attributes may be preventing the screen reader
from properly understanding the current state of a widget. This could make the
page unusable to users who rely on screen readers.

See [Introduction to ARIA](/web/fundamentals/accessibility/semantics-aria/) for more information.

## Recommendations {: #recommendations }

<<_shared/query.md>>

To find each listed element's invalid attribute names:

1. Note the `role` and `aria-*` attributes of the element.

1. Go to [Definition of Roles][roles].

1. Go to the page for this element's `role`.

1. Check the actual attributes on the element against the supported attributes,
   as listed in **Required States and Properties** and **Supported States
   and Properties**.

[qs]: /web/tools/chrome-devtools/console/command-line-reference#queryselector
[qsa]: /web/tools/chrome-devtools/console/command-line-reference#queryselectorall
[xp]: /web/tools/chrome-devtools/console/command-line-reference#xpath
[roles]: https://www.w3.org/TR/wai-aria/roles#role_definitions

## More information {: #more-info }

This audit is powered by the aXe Accessibility Engine. See [ARIA attributes
must conform to valid names][axe] for more information.

[axe]: https://dequeuniversity.com/rules/axe/1.1/aria-valid-attr


## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
