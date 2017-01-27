project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Element ARIA Attributes Are Allowed For This Role" Lighthouse audit.

{# wf_updated_on: 2017-01-13 #}
{# wf_published_on: 2017-01-13 #}

# Element ARIA Attributes Are Allowed For This Role  {: .page-title }

## Why the audit is important {: #why }

Invalid role-attribute combinations can disable the accessibility of your
page.

## How to pass the audit {: #how }

Below the audit, Lighthouse displays something like `1 element fails
this test`. The number varies depending on how many elements are failing.
Click this label to expand the list.

To find each listed element's invalid combination:

1. Find the element in your DOM. The [`$()`][qs], [`$$()`][qsa], and
   [`$x()`][xp] functions can help you programmatically select the element
   from the Chrome DevTools Console.

1. Find the `role` attribute of the element, as well as its `aria-*`
   attributes. This role is incompatible with one or more of these `aria-*`
   attributes. The HTML below is an example of an invalid combination.

       `<input role="input" aria-autocomplete="inline"/>`

1. Go to [Definition of Roles][roles] and go to the page for this element's
   role.

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

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

This audit is powered by the aXe Accessibility Engine. See [Elements must only
use allowed ARIA attributes][axe] for more information.

[axe]: https://dequeuniversity.com/rules/axe/1.1/aria-allowed-attr
