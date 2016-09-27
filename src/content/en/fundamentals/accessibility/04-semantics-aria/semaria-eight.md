project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Using the implicit semantics of ARIA roles

{# wf_review_required #}
{# wf_updated_on: 2016-02-29 #}
{# wf_published_on: 2016-02-29 #}

# Implicit Semantics {: .page-title }

{% include "_shared/contributors/megginkearney.html" %}
{% include "_shared/contributors/dgash.html" %}



As you've now seen, certain ARIA roles have implicit, or default, semantics.

`alert` is an example of a role that has implicit aria-live semantics. An `alert` is implicitly `aria-live=assertive` and `aria-atomic=true`, meaning that its presence should be immediately announced to the user when it is added to the page.

There are also special roles, `application` and `document`, that may affect the way assistive technologies interact with a region.

The `application` role indicates that the region within the element with that role should be treated as an application, and that the assistive technology should not try to treat it as a document. This may mean that the assistive technology no longer intercepts certain keystrokes, instead allowing the page to handle everything.

Conversely, the `document` role indicates that that region should be treated as a document, and that the screen reader should allow the user to use their normal document browsing shortcuts. 

As you can see, the roles attributes included with ARIA give you the flexibility to expose the intended semantics of your elements and element groups so they can be interpreted correctly by assistive technology and experienced appropriately by your users.
