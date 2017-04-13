project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Site Does Not Use Mutation Events In Its Own Scripts" Lighthouse audit.

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Site Does Not Use Mutation Events In Its Own Scripts  {: .page-title }

## Why the audit is important {: #why }

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

## How to pass the audit {: #how }

Under **URLs**, Lighthouse reports each mutation event listner that it found
in your code. Replace each of these mutation events with a `MutationObserver`.
See [`MutationObserver`][mdn] on MDN for more help.

[mdn]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse collects all of the event listeners on the page, and flags
any listener that uses one of the types listed in [Why the audit is
important](#why).


{% include "web/tools/lighthouse/audits/_feedback/mutation-events.html" %}
