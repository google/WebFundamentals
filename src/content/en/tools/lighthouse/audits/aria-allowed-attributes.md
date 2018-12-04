project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Element aria-* Attributes Are Allowed For This Role" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2017-01-13 #}
{# wf_blink_components: N/A #}

# Element aria-* Attributes Are Allowed For This Role  {: .page-title }

## Overview {: #overview }

Invalid role-attribute combinations can disable the accessibility of your
page.

See [Introduction to ARIA](/web/fundamentals/accessibility/semantics-aria/) for more information.

## Recommendations {: #recommendations }

<<_shared/query.md>>

To find each element's invalid combination(s):

1. Note the `role` and `aria-*` attributes of the element.

1. Go to [Definition of Roles][roles].

1. Go to the page for this element's `role`.

1. Check the `aria-*` attributes of the element against the **Required
   States and Properties** or **Supported States and Properties** lists. Any
   attribute that is not in one of these two lists is invalid.

To fix the invalid combo, you can either remove the invalid attributes from
the element, or change the role of the element to one that supports the
attributes.

[qs]: /web/tools/chrome-devtools/console/command-line-reference#queryselector
[qsa]: /web/tools/chrome-devtools/console/command-line-reference#queryselectorall
[xp]: /web/tools/chrome-devtools/console/command-line-reference#xpath
[roles]: https://www.w3.org/TR/wai-aria/roles#role_definitions

## More information {: #more-info }

This audit is powered by the aXe Accessibility Engine. See [Elements must only
use allowed ARIA attributes][axe] for more information.

[axe]: https://dequeuniversity.com/rules/axe/1.1/aria-allowed-attr

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
