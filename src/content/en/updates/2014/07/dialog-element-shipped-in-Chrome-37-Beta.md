project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome Beta has landed its native support for &lt;dialog&gt; element

{# wf_updated_on: 2019-03-15 #}
{# wf_published_on: 2014-07-23 #}
{# wf_tags: news,dialog,semantics #}
{# wf_blink_components: N/A #}

# dialog element shipped in Chrome 37 Beta {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}


Chrome Beta has landed its native support for &lt;dialog&gt; element without needing "Enable experimental Web Platform features." flag turned on.

Check out more sample codes and how it works in detail with [a live demo](https://demo.agektmr.com/dialog/){: .external }.

There are a few changes applied to the implementation since [the last announcement](/web/updates/2013/09/dialog-element-Modals-made-easy) but notable one is:

* Non-modal &lt;dialog&gt; is no longer vertically centered in the viewport. It has no special positioning behavior beyond its default CSS styling.

If you are curious about further details on the spec update, check out diffs [here](https://github.com/whatwg/html/commit/f4404b0652215d8301aec3eafde7f6e88713896d) and [here](https://github.com/whatwg/html/commit/df69e87c453671725e4f98b162c49923e957b7dd).


