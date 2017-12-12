project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Element aria-* Attributes Have Valid Values" Lighthouse audit.

{# wf_updated_on: 2017-12-11 #}
{# wf_published_on: 2017-01-18 #}
{# wf_blink_components: N/A #}

# Element aria-* Attributes Have Valid Values  {: .page-title }

## Overview {: #overview }

Invalid ARIA attribute values may be preventing the screen reader
from properly understanding the current state of a widget. This could make the
page unusable to users who rely on screen readers.

See [Introduction to ARIA](/web/fundamentals/accessibility/semantics-aria/) for more information.

## Recommendations {: #recommendations }

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

More information {: #more-info }

This audit is powered by the aXe Accessibility Engine. See [ARIA attributes
must conform to valid values][axe] for more information.

[axe]: https://dequeuniversity.com/rules/axe/1.1/aria-valid-attr-value


{% include "web/tools/lighthouse/audits/_feedback/valid-aria-values.html" %}
