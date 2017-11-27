project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Element aria-* Attributes Have Valid Values" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2017-01-18 #}

# Element aria-* Attributes Have Valid Values  {: .page-title }

## Why the audit is important {: #why }

Invalid ARIA attribute values may be preventing the screen reader
from properly understanding the current state of a widget. This could make the
page unusable to users who rely on screen readers.

See [Introduction to ARIA](/web/fundamentals/accessibility/semantics-aria/) for more information.

## How to pass the audit {: #how }

<<_shared/query.md>>

To find each listed element's invalid attribute values:

1. Note the `aria-*` attributes of the element.

1. Go to [Definition of States and Properties][states].

1. For each `aria-*` attribute of the element, go the page for that attribute.

1. Make the value of the element's attribute match one of the supported
   values listed in **Value**.

[qs]: /web/tools/chrome-devtools/console/command-line-reference#queryselector
[qsa]: /web/tools/chrome-devtools/console/command-line-reference#queryselectorall
[xp]: /web/tools/chrome-devtools/console/command-line-reference#xpath
[states]: https://www.w3.org/TR/wai-aria/states_and_properties#state_prop_def

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

This audit is powered by the aXe Accessibility Engine. See [ARIA attributes
must conform to valid values][axe] for more information.

[axe]: https://dequeuniversity.com/rules/axe/1.1/aria-valid-attr-value


{% include "web/tools/lighthouse/audits/_feedback/valid-aria-values.html" %}
