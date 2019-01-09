project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-01-08 #}
{# wf_published_on: 2011-06-27 #}
{# wf_tags: news,pagevisibility #}
{# wf_blink_components: N/A #}

# Page Visibility API: Have I got your attention?  {: .page-title }

{% include "web/_shared/contributors/mikemahemoff.html" %}


Multi-tab browsing is now the norm, so you can't assume the user is watching your app just because it's running. Fortunately, the new [Page Visibility API](https://www.w3.org/TR/page-visibility/?csw=1) lets your app discover if it's visible or not. You could use the API to cut down on unnecessary network activity and computation.

`document.webkitHidden` is a boolean value indicating if the current page is hidden (you can try it now in the console if you're using a recent build of Chromium). `document.webkitVisibilityState` will return a string indicating the current state, one of `visible`, `hidden`, and `prerendered`. And a new `webkitvisibilitychange` event will fire when any of these changes, e.g. when the user opens you app's tab, or moves away from it.

If you're interested in giving this a whirl, check out <a href="https://github.com/ai/visibilityjs">visibility.js</a> which adds a little bit of sugar on the API to make watching these interactions a bit more fun.


{% include "comment-widget.html" %}
