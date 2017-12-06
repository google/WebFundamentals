project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Uses An Excessive DOM Size" Lighthouse audit.

{# wf_updated_on: 2017-11-06 #}
{# wf_published_on: 2017-11-06 #}

# Uses An Excessive DOM Size  {: .page-title }

## Why the audit is important {: #why }

A large DOM tree can harm your page performance in multiple ways.

* Network efficiency and load performance. If you server ships a large DOM tree, you may be
  shipping lots of unnecessary bytes. This can also slow down page load time, because the
  browser may be parsing lots of nodes that aren't even displayed above-the-fold.
* Runtime performance. As users and scripts interact with your page, the browser must constantly
  re-compute the position and styling of nodes. A large DOM tree in combination with complicated
  style rules can severely slow down rendering.
* Memory performance. If you use general query selectors such as `document.querySelectorAll('li')`
  you may be unknowingly storing references to a very large number of nodes, which can overwhelm
  the memory capabilities of your users' devices.

## How to pass the audit {: #how }

An optimal DOM tree:

* Has less than 1500 nodes total.
* Has a maximum depth of 32 nodes.
* Has no parent node with more than 60 child nodes.

In general, look for ways to create DOM nodes only when needed, and destroy them when no
longer needed. 

If your server ships a large DOM tree, try loading your page and manually
noting which nodes are displayed. Perhaps you can remove the undisplayed nodes from the loaded
document, and only create them after a user gesture, such as a scroll or a button click.

If you create DOM nodes at runtime, [Subtree Modification DOM Change Breakpoints][Breakpoints]
can help you pinpoint when nodes get created.

[Breakpoints]: /web/tools/chrome-devtools/javascript/breakpoints#dom

If you can't avoid a large DOM tree, another approach for improving rendering performance is
simplifying your CSS selectors. See [Reduce The Scope And Complexity Of Style
Calculations][Style].

[Style]: /web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/dobetterweb/dom-size.js

## Feedback {: #feedback }

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'DOM Size / Helpful';
var url = 'https://github.com/google/webfundamentals/issues/new?title=[' +
      label + ']';
var feedback = {
  "category": "Lighthouse",
  "choices": [
    {
      "button": {
        "text": "This Doc Was Helpful"
      },
      "response": "Thanks for the feedback.",
      "analytics": {
        "label": label
      }
    },
    {
      "button": {
        "text": "This Doc Was Not Helpful"
      },
      "response": 'Sorry to hear that. Please <a href="' + url +
          '" target="_blank">open a GitHub issue</a> and tell us how to ' +
          'make it better.',
      "analytics": {
        "label": label,
        "value": 0
      }
    }
  ]
};
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}
