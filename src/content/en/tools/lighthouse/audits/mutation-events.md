project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Avoids Mutation Events In Its Own Scripts" Lighthouse audit.

{# wf_updated_on: 2017-12-11 #}
{# wf_published_on: 2016-10-04 #}
{# wf_blink_components: N/A #}

# Avoids Mutation Events In Its Own Scripts  {: .page-title }

## Overview {: #overview }

The following mutation events harm performance and are deprecated in the
DOM events spec:

* `DOMAttrModified`
* `DOMAttributeNameChanged`
* `DOMCharacterDataModified`
* `DOMElementNameChanged`
* `DOMNodeInserted`
* `DOMNodeInsertedIntoDocument`
* `DOMNodeRemoved`
* `DOMNodeRemovedFromDocument`
* `DOMSubtreeModified`

## Recommendations {: #recommendations }

Under **URLs**, Lighthouse reports each mutation event listener that it found
in your code. Replace each of these mutation events with a `MutationObserver`.
See [`MutationObserver`][mdn] on MDN for more help.

[mdn]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

## More information {: #more-info }

Lighthouse collects all of the event listeners on the page, and flags
any listener that uses one of the types listed above.

{% include "web/tools/lighthouse/audits/_feedback/mutation-events.html" %}
