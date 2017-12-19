project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-12-18 #}
{# wf_published_on: 2017-12-18 #}
{# wf_blink_components: N/A #}

# Introduction {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

Modern web applications often use a bundling tool to create a production "bundle" of files (scripts,
stylesheets, etc.) that is optimized, minified and can be downloaded in less time by your users. In
this article, we will walk through how to effectively optimize site resources using webpack. This
can help users load and interact with your sites more quickly.

webpack is one of the most popular bundling tools in use today. Taking advantage of its features for
optimizing modern code, code-splitting scripts into critical and non-critical pieces and stripping
out unused code (to name but a few optimizations) can ensure your app has a minimal network and
processing cost.

Let's get started by looking at optimizing one of the costliest resources in a modern app –
JavaScript.

Note: We created a training app to play with optimizations described in this article. Try squeezing
the most out of it to practice the tips **TODO: link**