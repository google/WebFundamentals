project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-12-18 #}
{# wf_published_on: 2017-12-18 #}
{# wf_blink_components: N/A #}

# Introduction {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

Modern web applications often use a **bundling tool** to create a production
“bundle” of files (scripts, stylesheets, etc.) that is
[optimized](/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization),
[minified](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer)
and can be downloaded in less time by your users. In **Web Performance
Optimization with webpack**, we will walk through how to effectively optimize
site resources using [webpack](https://webpack.js.org/). This can help users
load and interact with your sites more quickly.

<figure>
  <img src="./webpack-logo.png" alt="webpack logo">
</figure>

webpack is one of the most popular bundling tools in use today. Taking advantage
of its features for optimizing modern code,
[code-splitting](/web/fundamentals/performance/webpack/use-long-term-caching#lazy-loading)
scripts into critical and non-critical pieces and stripping out unused code (to
name but a few optimizations) can ensure your app has a minimal network and
processing cost.

<figure>
  <img src="./code-splitting.png" alt="Before and after applying JavaScript
  optimizations. Time-to-Interactive is improved">
</figure>

Note: We created a training app to play with optimizations described in this
article. Try squeezing the most out of it to practice the tips:
[`webpack-training-project`](https://github.com/GoogleChromeLabs/webpack-training-project)


Let’s get started by looking at optimizing one of the costliest resources in a
modern app – JavaScript.

* [Decrease Front-end
  Size](/web/fundamentals/performance/webpack/decrease-frontend-size)
* [Make Use of Long-term
  Caching](/web/fundamentals/performance/webpack/use-long-term-caching)
* [Monitor and analyze the
  app](/web/fundamentals/performance/webpack/monitor-and-analyze)
* [Conclusions](/web/fundamentals/performance/webpack/conclusion)

